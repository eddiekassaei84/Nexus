import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DevAnnotationCard } from './dev-annotation';
import { DevDocumentModal } from './dev-document-modal';
import { useDevMode } from './dev-mode-context';
import type { DevAnnotation, DevDocument, DevModeRegistry, DevPageMode } from './types';

interface AnchorPosition {
  annotation: DevAnnotation;
  rect: DOMRect;
}

function getMarkerPosition(rect: DOMRect) {
  const size = 24;
  const gap = 6;
  return {
    left: Math.max(12, Math.min(window.innerWidth - size - 12, rect.right + gap)),
    top: Math.max(12, Math.min(window.innerHeight - size - 12, rect.top + rect.height / 2 - size / 2)),
  };
}

interface CardPosition {
  left: number;
  top: number;
  width: number;
  height: number;
  markerCenter: { x: number; y: number };
}

interface MarkerPosition {
  left: number;
  top: number;
}

interface Point {
  x: number;
  y: number;
}

interface ConnectorGeometry {
  id: string;
  path: string;
  start: Point;
  end: Point;
}

type Placement = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 180;
const CARD_GAP = 14;
const VIEWPORT_PAD = 12;
const TOOLTIP_SPACING = 14;

function rectsOverlap(a: CardPosition, b: CardPosition, spacing = TOOLTIP_SPACING) {
  return (
    a.left < b.left + b.width + spacing &&
    a.left + a.width + spacing > b.left &&
    a.top < b.top + b.height + spacing &&
    a.top + a.height + spacing > b.top
  );
}

function isInsideViewport(position: CardPosition) {
  return (
    position.left >= VIEWPORT_PAD &&
    position.top >= VIEWPORT_PAD &&
    position.left + position.width <= window.innerWidth - VIEWPORT_PAD &&
    position.top + position.height <= window.innerHeight - VIEWPORT_PAD
  );
}

function clampToViewport(position: CardPosition): CardPosition {
  return {
    ...position,
    left: Math.max(VIEWPORT_PAD, Math.min(window.innerWidth - position.width - VIEWPORT_PAD, position.left)),
    top: Math.max(VIEWPORT_PAD, Math.min(window.innerHeight - position.height - VIEWPORT_PAD, position.top)),
  };
}

function makeCardPosition(marker: MarkerPosition, placement: Placement): CardPosition {
  const markerCenter = { x: marker.left + 12, y: marker.top + 12 };
  const markerRight = marker.left + 24;
  const markerBottom = marker.top + 24;

  const horizontal = placement.endsWith('right')
    ? markerRight + CARD_GAP
    : marker.left - CARD_WIDTH - CARD_GAP;
  const vertical = placement.startsWith('bottom')
    ? markerBottom + CARD_GAP
    : marker.top - CARD_HEIGHT - CARD_GAP;

  return {
    left: horizontal,
    top: vertical,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    markerCenter,
  };
}

function scorePosition(position: CardPosition, placed: CardPosition[]) {
  const overflowLeft = Math.max(0, VIEWPORT_PAD - position.left);
  const overflowTop = Math.max(0, VIEWPORT_PAD - position.top);
  const overflowRight = Math.max(0, position.left + position.width - (window.innerWidth - VIEWPORT_PAD));
  const overflowBottom = Math.max(0, position.top + position.height - (window.innerHeight - VIEWPORT_PAD));
  const overlapPenalty = placed.filter(card => rectsOverlap(position, card)).length * 1000;
  return overflowLeft + overflowTop + overflowRight + overflowBottom + overlapPenalty;
}

function nudgeAwayFromOverlaps(position: CardPosition, placed: CardPosition[]) {
  let adjusted = clampToViewport(position);

  for (let i = 0; i < 8; i += 1) {
    const overlap = placed.find(card => rectsOverlap(adjusted, card));
    if (!overlap) return adjusted;

    const spaceBelow = window.innerHeight - VIEWPORT_PAD - (overlap.top + overlap.height + TOOLTIP_SPACING + adjusted.height);
    const spaceAbove = overlap.top - TOOLTIP_SPACING - adjusted.height - VIEWPORT_PAD;
    if (spaceBelow >= 0 || spaceBelow >= spaceAbove) {
      adjusted = clampToViewport({ ...adjusted, top: overlap.top + overlap.height + TOOLTIP_SPACING });
    } else {
      adjusted = clampToViewport({ ...adjusted, top: overlap.top - adjusted.height - TOOLTIP_SPACING });
    }
  }

  return adjusted;
}

function getTooltipPosition(marker: MarkerPosition, placed: CardPosition[]) {
  const placements: Placement[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
  const candidates = placements.map(placement => makeCardPosition(marker, placement));
  const directFit = candidates.find(candidate =>
    isInsideViewport(candidate) && !placed.some(card => rectsOverlap(candidate, card)),
  );

  if (directFit) return directFit;

  const best = candidates
    .map(candidate => clampToViewport(candidate))
    .sort((a, b) => scorePosition(a, placed) - scorePosition(b, placed))[0];

  return nudgeAwayFromOverlaps(best, placed);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pointToward(from: Point, to: Point, amount: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.max(1, Math.hypot(dx, dy));
  return {
    x: from.x + (dx / distance) * amount,
    y: from.y + (dy / distance) * amount,
  };
}

function getRectCenter(rect: DOMRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function getTooltipPerimeterPoint(markerCenter: Point, tooltipRect: DOMRect): Point {
  const tooltipCenter = getRectCenter(tooltipRect);
  const halfWidth = tooltipRect.width / 2;
  const halfHeight = tooltipRect.height / 2;
  const dx = markerCenter.x - tooltipCenter.x;
  const dy = markerCenter.y - tooltipCenter.y;

  if (Math.abs(dx) / halfWidth > Math.abs(dy) / halfHeight) {
    return {
      x: dx < 0 ? tooltipRect.left : tooltipRect.right,
      y: clamp(markerCenter.y, tooltipRect.top + 8, tooltipRect.bottom - 8),
    };
  }

  return {
    x: clamp(markerCenter.x, tooltipRect.left + 8, tooltipRect.right - 8),
    y: dy < 0 ? tooltipRect.top : tooltipRect.bottom,
  };
}

function getRoundedElbowPath(points: Point[], radius = 10) {
  if (points.length < 2) return '';

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const current = points[i];
    const next = points[i + 1];
    const cornerRadius = Math.min(radius, distance(prev, current) / 2, distance(current, next) / 2);
    const before = pointToward(current, prev, cornerRadius);
    const after = pointToward(current, next, cornerRadius);
    d += ` L ${before.x} ${before.y} Q ${current.x} ${current.y} ${after.x} ${after.y}`;
  }

  const last = points[points.length - 1];
  return `${d} L ${last.x} ${last.y}`;
}

function getMeasuredConnectorGeometry(id: string, markerRect: DOMRect, tooltipRect: DOMRect): ConnectorGeometry {
  const markerCenter = getRectCenter(markerRect);
  const end = getTooltipPerimeterPoint(markerCenter, tooltipRect);
  const markerRadius = markerRect.width / 2;
  const start = pointToward(markerCenter, end, markerRadius);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const horizontalFirst = Math.abs(dx) >= Math.abs(dy);
  const elbow = horizontalFirst
    ? { x: start.x + dx / 2, y: start.y }
    : { x: start.x, y: start.y + dy / 2 };
  const elbow2 = horizontalFirst
    ? { x: start.x + dx / 2, y: end.y }
    : { x: end.x, y: start.y + dy / 2 };
  const path = getRoundedElbowPath([start, elbow, elbow2, end]);

  return { id, start, end, path };
}

function layerIsVisible(layerId: string | undefined, activeLayers: Set<string>) {
  return activeLayers.size === 0 || !layerId || activeLayers.has(layerId);
}

function modeIsVisible(mode: DevAnnotation['mode'], pageMode: DevPageMode) {
  return !mode || mode === 'all' || mode === pageMode;
}

function flattenDocuments(documents: DevDocument[] = [], depth = 0): Array<{ document: DevDocument; depth: number; isLast: boolean }> {
  return documents.flatMap((document, index) => [
    { document, depth, isLast: index === documents.length - 1 },
    ...flattenDocuments(document.children, depth + 1),
  ]);
}

function ChevronDownIcon({ color = '#5E6C84' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TextNoteIcon({ color = '#5E6C84' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function DownloadIcon({ color = '#5E6C84' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

export function DevOverlayHost({
  pageKey,
  registry,
}: {
  pageKey: string;
  registry: DevModeRegistry;
}) {
  const { enabled, activeLayers } = useDevMode();
  const pageContent = registry[pageKey];
  const [pageMode, setPageMode] = useState<DevPageMode>('view');
  const annotations = useMemo(
    () => (pageContent?.annotations ?? []).filter(item =>
      layerIsVisible(item.layerId, activeLayers) && modeIsVisible(item.mode, pageMode),
    ),
    [activeLayers, pageContent, pageMode],
  );
  const [anchorPositions, setAnchorPositions] = useState<AnchorPosition[]>([]);
  const [activeAnnotationIds, setActiveAnnotationIds] = useState<string[]>([]);
  const [suppressed, setSuppressed] = useState(false);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DevDocument | null>(null);
  const [connectors, setConnectors] = useState<ConnectorGeometry[]>([]);
  const markerRefs = useRef(new Map<string, HTMLButtonElement>());
  const cardRefs = useRef(new Map<string, HTMLDivElement>());
  const connectorFrameRef = useRef<number | null>(null);

  const scheduleConnectorUpdate = useCallback(() => {
    if (connectorFrameRef.current !== null) {
      window.cancelAnimationFrame(connectorFrameRef.current);
    }

    connectorFrameRef.current = window.requestAnimationFrame(() => {
      connectorFrameRef.current = null;
      const next = activeAnnotationIds.flatMap((id) => {
        const marker = markerRefs.current.get(id);
        const card = cardRefs.current.get(id);
        if (!marker || !card) return [];
        return [getMeasuredConnectorGeometry(id, marker.getBoundingClientRect(), card.getBoundingClientRect())];
      });
      setConnectors(next);
    });
  }, [activeAnnotationIds]);

  const scheduleConnectorTransitionFollow = useCallback(() => {
    scheduleConnectorUpdate();
    return [80, 180, 320].map(delay => window.setTimeout(scheduleConnectorUpdate, delay));
  }, [scheduleConnectorUpdate]);

  useEffect(() => {
    if (!enabled || !pageContent) {
      setAnchorPositions([]);
      setActiveAnnotationIds([]);
      setConnectors([]);
      setFlyoutOpen(false);
      setSelectedDocument(null);
      return;
    }

    const updatePositions = () => {
      const modeElement = document.querySelector('[data-dev-page-mode]');
      const nextMode = modeElement?.getAttribute('data-dev-page-mode') === 'edit' ? 'edit' : 'view';
      setPageMode(nextMode);

      const shouldSuppress = !!document.querySelector('[data-dev-overlay-suppressed="true"]');
      setSuppressed(shouldSuppress);
      if (shouldSuppress) {
        setAnchorPositions([]);
        setActiveAnnotationIds([]);
        setConnectors([]);
        setFlyoutOpen(false);
        setSelectedDocument(null);
        return;
      }

      const next = annotations.flatMap((annotation) => {
        const anchor = document.querySelector(`[data-dev-anchor="${annotation.anchor}"]`);
        if (!anchor) return [];
        return [{ annotation, rect: anchor.getBoundingClientRect() }];
      });
      setAnchorPositions(next);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, true);
    const id = window.setInterval(updatePositions, 750);
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions, true);
      window.clearInterval(id);
    };
  }, [annotations, enabled, pageContent]);

  useEffect(() => {
    setActiveAnnotationIds([]);
    setConnectors([]);
    setFlyoutOpen(false);
    setSelectedDocument(null);
  }, [pageKey]);

  useEffect(() => {
    if (!enabled || !pageContent || suppressed || activeAnnotationIds.length === 0) {
      setConnectors([]);
      return;
    }

    const followTransitionIds = scheduleConnectorTransitionFollow();
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(scheduleConnectorTransitionFollow)
      : null;

    activeAnnotationIds.forEach((id) => {
      const marker = markerRefs.current.get(id);
      const card = cardRefs.current.get(id);
      if (marker) observer?.observe(marker);
      if (card) observer?.observe(card);
    });

    const handleMove = () => { scheduleConnectorTransitionFollow(); };
    window.addEventListener('resize', handleMove);
    window.addEventListener('scroll', handleMove, true);

    return () => {
      followTransitionIds.forEach(id => window.clearTimeout(id));
      observer?.disconnect();
      window.removeEventListener('resize', handleMove);
      window.removeEventListener('scroll', handleMove, true);
    };
  }, [activeAnnotationIds, enabled, pageContent, scheduleConnectorTransitionFollow, suppressed]);

  useEffect(() => {
    if (!enabled || !pageContent || suppressed || activeAnnotationIds.length === 0) return;
    const followTransitionIds = scheduleConnectorTransitionFollow();
    return () => { followTransitionIds.forEach(id => window.clearTimeout(id)); };
  }, [activeAnnotationIds.length, anchorPositions, enabled, pageContent, scheduleConnectorTransitionFollow, suppressed]);

  useEffect(() => {
    return () => {
      if (connectorFrameRef.current !== null) {
        window.cancelAnimationFrame(connectorFrameRef.current);
      }
    };
  }, []);

  if (!enabled || !pageContent || suppressed) return null;

  const activeItems = anchorPositions.filter(item => activeAnnotationIds.includes(item.annotation.id));
  const documentItems = flattenDocuments(pageContent.documents);
  const githubDownloadUrl = 'https://github.com/eddiekassaei84/Nexus/archive/refs/heads/master.zip';
  const placedCards: CardPosition[] = [];
  const positionedCards = activeItems.map(activeItem => {
    const marker = getMarkerPosition(activeItem.rect);
    const position = getTooltipPosition(marker, placedCards);
    placedCards.push(position);
    return { activeItem, position };
  });

  return (
    <div
      aria-label="Dev Mode overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8500,
        pointerEvents: 'none',
        background: 'rgba(24, 144, 255, 0.035)',
      }}
    >
      {anchorPositions.map((item, index) => {
        const position = getMarkerPosition(item.rect);
        const active = activeAnnotationIds.includes(item.annotation.id);
        return (
          <button
            type="button"
            key={item.annotation.id}
            ref={node => {
              if (node) markerRefs.current.set(item.annotation.id, node);
              else markerRefs.current.delete(item.annotation.id);
            }}
            aria-label={`Show Dev Mode note ${index + 1}: ${item.annotation.title}`}
            aria-pressed={active}
            onClick={() => setActiveAnnotationIds(current =>
              current.includes(item.annotation.id)
                ? current.filter(id => id !== item.annotation.id)
                : [...current, item.annotation.id],
            )}
            style={{
              position: 'fixed',
              left: position.left,
              top: position.top,
              width: 24,
              height: 24,
              borderRadius: 999,
              border: active ? '2px solid #FFFFFF' : '1px solid #FFFFFF',
              background: '#1890FF',
              color: '#FFFFFF',
              boxShadow: active ? '0 0 0 3px rgba(24,144,255,0.28), 0 4px 12px rgba(29,44,56,0.22)' : '0 3px 10px rgba(29,44,56,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              pointerEvents: 'auto',
              padding: 0,
            }}
          >
            {index + 1}
          </button>
        );
      })}

      {positionedCards.map(({ activeItem, position }) => {
        return (
          <div
            key={`card-${activeItem.annotation.id}`}
            ref={node => {
              if (node) cardRefs.current.set(activeItem.annotation.id, node);
              else cardRefs.current.delete(activeItem.annotation.id);
            }}
            data-dev-tooltip-card="true"
            style={{
              position: 'fixed',
              left: position.left,
              top: position.top,
              pointerEvents: 'auto',
              transition: 'left 160ms ease, top 160ms ease',
            }}
          >
            <DevAnnotationCard title={activeItem.annotation.title}>
              {activeItem.annotation.body}
            </DevAnnotationCard>
          </div>
        );
      })}

      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
      >
        {connectors.map(connector => {
          return (
            <g key={`connector-${connector.id}`} data-dev-connector="true">
              <path
                d={connector.path}
                fill="none"
                stroke="rgba(24, 144, 255, 0.78)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={connector.start.x}
                cy={connector.start.y}
                r="4"
                fill="#FFFFFF"
                stroke="#1890FF"
                strokeWidth="1"
              />
              <circle
                cx={connector.end.x}
                cy={connector.end.y}
                r="4"
                fill="#FFFFFF"
                stroke="#1890FF"
                strokeWidth="1"
              />
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: 'fixed',
          right: 60,
          bottom: 60,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {flyoutOpen && (
          <div
            data-dev-help-center="true"
            style={{
              width: 396,
              maxHeight: 432,
              borderRadius: 14,
              border: '1px solid rgba(9, 30, 66, 0.10)',
              background: 'rgba(255,255,255,0.98)',
              boxShadow: '0 18px 46px rgba(9,30,66,0.18)',
              overflow: 'auto',
              transformOrigin: 'bottom right',
              animation: 'devModeFlyoutIn 120ms ease-out',
            }}
          >
            <div style={{ height: 54, padding: '0 12px 0 16px', borderBottom: '1px solid #E5E7E9', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: '#243746' }}>Development Help Center</div>
              <button
                type="button"
                aria-label="Close Development Help Center"
                onClick={() => setFlyoutOpen(false)}
                style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', color: '#5E6C84', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <a
              href={githubDownloadUrl}
              target="_blank"
              rel="noreferrer"
              data-dev-github-download="true"
              style={{
                width: '100%',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px 6px 10px',
                borderBottom: '1px solid #D6E4FF',
                background: '#F0F7FF',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#243746',
                textAlign: 'left',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
              <span style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <DownloadIcon color="#0C66E4" />
              </span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Download from GitHub</span>
            </a>
            {documentItems.length > 0 ? documentItems.map(({ document, depth, isLast }) => {
              const hasChildren = !!document.children?.length;
              const active = selectedDocument?.id === document.id;
              return (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => {
                    setSelectedDocument(document);
                  }}
                  style={{
                    width: '100%',
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: `6px 12px 6px ${10 + depth * 16}px`,
                    border: 'none',
                    borderBottom: isLast && depth === 0 ? 'none' : '1px solid #EEEFF1',
                    background: active ? '#E9F2FF' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: active || depth === 0 ? 700 : 500,
                    color: active ? '#0C66E4' : '#243746',
                    textAlign: 'left',
                    position: 'relative',
                  }}
                >
                  {active && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#0C66E4', borderRadius: '0 3px 3px 0' }} />}
                  <span style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {hasChildren ? <ChevronDownIcon color={active ? '#0C66E4' : '#5E6C84'} /> : depth > 0 ? <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5E6C84' }} /> : null}
                  </span>
                  <span style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <TextNoteIcon color={active ? '#0C66E4' : '#5E6C84'} />
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{document.title}</span>
                </button>
              );
            }) : (
              <div style={{ padding: 12, fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#616D79' }}>
                No help documents configured for this page.
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          aria-label="Open Dev Mode links"
          aria-expanded={flyoutOpen}
          onClick={() => setFlyoutOpen(open => !open)}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.75)',
            background: '#1890FF',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(24,144,255,0.34), 0 3px 8px rgba(29,44,56,0.18)',
            padding: 0,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>
        </button>
      </div>
      {selectedDocument && (
        <DevDocumentModal
          document={selectedDocument}
          documents={pageContent.documents}
          onDocumentChange={setSelectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}
