import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DevDocument } from './types';

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'rule' }
  | { type: 'table'; rows: string[][] };

type DocumentView = 'preview' | 'markdown' | 'code';

interface MermaidNode {
  id: string;
  label: string;
  shape: 'rect' | 'decision';
  level: number;
}

interface MermaidEdge {
  from: string;
  to: string;
  label?: string;
}

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 440;
const SIDEBAR_DEFAULT_WIDTH = 306;
const DIAGRAM_MIN_WIDTH = 720;
const DIAGRAM_MAX_WIDTH = 1400;
const DIAGRAM_DEFAULT_WIDTH = 860;

function clampSidebarWidth(width: number) {
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, width));
}

function clampDiagramWidth(width: number) {
  return Math.min(DIAGRAM_MAX_WIDTH, Math.max(DIAGRAM_MIN_WIDTH, width));
}

function inlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i += 1; continue; }

    if (trimmed.startsWith('```')) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i += 1;
      }
      blocks.push({ type: 'code', text: code.join('\n') });
      i += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: 'rule' });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim();
        if (!/^\|\s*-+\s*\|/.test(row)) {
          rows.push(row.split('|').slice(1, -1).map(cell => cell.trim()));
        }
        i += 1;
      }
      blocks.push({ type: 'table', rows });
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      blocks.push({ type: 'quote', text: trimmed.replace(/^>\s?/, '') });
      i += 1;
      continue;
    }

    if (/^- /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^- /, ''));
        i += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^- /.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const size = block.level === 1 ? 22 : block.level === 2 ? 18 : 15;
          return <div key={index} style={{ fontFamily: 'Inter, sans-serif', fontSize: size, fontWeight: 700, color: '#1D2C38', marginTop: block.level === 1 ? 0 : 8 }}>{inlineMarkdown(block.text)}</div>;
        }
        if (block.type === 'paragraph') {
          return <p key={index} style={{ margin: 0, fontFamily: 'Open Sans, sans-serif', fontSize: 13, lineHeight: '21px', color: '#384857' }}>{inlineMarkdown(block.text)}</p>;
        }
        if (block.type === 'list') {
          return (
            <ul key={index} style={{ margin: 0, paddingLeft: 22, fontFamily: 'Open Sans, sans-serif', fontSize: 13, lineHeight: '21px', color: '#384857' }}>
              {block.items.map((item, itemIndex) => <li key={itemIndex}>{inlineMarkdown(item)}</li>)}
            </ul>
          );
        }
        if (block.type === 'code') {
          return <pre key={index} style={{ margin: 0, padding: 12, borderRadius: 8, background: '#F5F6F7', border: '1px solid #E5E7E9', overflowX: 'auto', fontFamily: 'Consolas, monospace', fontSize: 12, lineHeight: '18px', color: '#243746' }}>{block.text}</pre>;
        }
        if (block.type === 'quote') {
          return <blockquote key={index} style={{ margin: 0, padding: '8px 12px', borderLeft: '3px solid #1890FF', background: '#E6F7FF', fontFamily: 'Open Sans, sans-serif', fontSize: 13, lineHeight: '21px', color: '#243746' }}>{inlineMarkdown(block.text)}</blockquote>;
        }
        if (block.type === 'rule') {
          return <div key={index} style={{ height: 1, background: '#E5E7E9', margin: '4px 0' }} />;
        }
        return (
          <div key={index} style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#384857' }}>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const Cell = rowIndex === 0 ? 'th' : 'td';
                      return (
                        <Cell key={cellIndex} style={{ textAlign: 'left', padding: '8px 10px', border: '1px solid #E5E7E9', background: rowIndex === 0 ? '#F5F6F7' : '#FFFFFF', fontWeight: rowIndex === 0 ? 700 : 400 }}>
                          {inlineMarkdown(cell)}
                        </Cell>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

function parseMermaidEndpoint(input: string, nodes: Map<string, MermaidNode>) {
  const endpoint = input.trim().match(/^([A-Za-z][\w-]*)(?:\["([^"]+)"\]|\{"([^"]+)"\})?/);
  if (!endpoint) return null;

  const [, id, rectLabel, decisionLabel] = endpoint;
  const existing = nodes.get(id);
  const label = rectLabel ?? decisionLabel ?? existing?.label ?? id;
  const shape = decisionLabel ? 'decision' : existing?.shape ?? 'rect';
  nodes.set(id, { id, label, shape, level: existing?.level ?? 0 });
  return id;
}

function parseMermaidFlow(source: string) {
  const nodes = new Map<string, MermaidNode>();
  const edges: MermaidEdge[] = [];

  source.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('flowchart')) return;

    const edge = trimmed.match(/^(.*?)\s*-->\s*(?:\|"([^"]+)"\|\s*)?(.*)$/);
    if (!edge) return;

    const from = parseMermaidEndpoint(edge[1], nodes);
    const to = parseMermaidEndpoint(edge[3], nodes);
    if (from && to) edges.push({ from, to, label: edge[2] });
  });

  const incoming = new Map<string, number>();
  const outgoing = new Map<string, string[]>();
  nodes.forEach((_, id) => {
    incoming.set(id, 0);
    outgoing.set(id, []);
  });
  edges.forEach(edge => {
    incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
    outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge.to]);
  });

  const queue = [...nodes.keys()].filter(id => (incoming.get(id) ?? 0) === 0);
  const visited = new Set<string>();
  while (queue.length > 0) {
    const id = queue.shift();
    if (!id || visited.has(id)) continue;
    visited.add(id);
    const node = nodes.get(id);
    if (!node) continue;
    (outgoing.get(id) ?? []).forEach(nextId => {
      const next = nodes.get(nextId);
      if (next) {
        next.level = Math.max(next.level, node.level + 1);
        incoming.set(nextId, Math.max(0, (incoming.get(nextId) ?? 1) - 1));
        if ((incoming.get(nextId) ?? 0) === 0) queue.push(nextId);
      }
    });
  }

  return { nodes: [...nodes.values()], edges };
}

function MermaidPreview({ source }: { source: string }) {
  const [diagramWidth, setDiagramWidth] = useState(DIAGRAM_DEFAULT_WIDTH);
  const [resizeHovered, setResizeHovered] = useState(false);
  const [resizing, setResizing] = useState(false);
  const resizeStartRef = useRef({ x: 0, width: DIAGRAM_DEFAULT_WIDTH });
  const { nodes, edges } = useMemo(() => parseMermaidFlow(source), [source]);
  const byLevel = nodes.reduce((map, node) => {
    const items = map.get(node.level) ?? [];
    map.set(node.level, [...items, node]);
    return map;
  }, new Map<number, MermaidNode[]>());
  const defaultNodeWidth = 220;
  const nodeHeight = 58;
  const levelGap = 104;
  const positions = new Map<string, { x: number; y: number; width: number }>();
  const levels = [...byLevel.keys()].sort((a, b) => a - b);
  const getNodeWidth = (node: MermaidNode) => node.level === 0 ? Math.min(diagramWidth - 72, 760) : defaultNodeWidth;
  levels.forEach(level => {
    const items = byLevel.get(level) ?? [];
    const itemWidths = items.map(getNodeWidth);
    const totalWidth = itemWidths.reduce((sum, width) => sum + width, 0);
    const gap = Math.max(34, (diagramWidth - 72 - totalWidth) / Math.max(1, items.length + 1));
    let cursorX = 36 + gap;
    items.forEach((node, index) => {
      const width = itemWidths[index];
      positions.set(node.id, {
        x: cursorX,
        y: 36 + level * levelGap,
        width,
      });
      cursorX += width + gap;
    });
  });
  const height = Math.max(420, 118 + (Math.max(0, ...levels) + 1) * levelGap);

  useEffect(() => {
    if (!resizing) return undefined;

    const previousCursor = window.document.body.style.cursor;
    const previousUserSelect = window.document.body.style.userSelect;

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const delta = event.clientX - resizeStartRef.current.x;
      setDiagramWidth(clampDiagramWidth(resizeStartRef.current.width + delta));
    };

    const onMouseUp = () => setResizing(false);

    window.document.body.style.cursor = 'col-resize';
    window.document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.document.body.style.cursor = previousCursor;
      window.document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [resizing]);

  if (nodes.length === 0) {
    return <pre style={{ margin: 0, padding: 16, borderRadius: 8, background: '#FFFBE6', border: '1px solid #FFE58F', whiteSpace: 'pre-wrap', fontFamily: 'Consolas, monospace', fontSize: 12, lineHeight: '19px', color: '#614700' }}>{source}</pre>;
  }

  return (
    <div style={{ overflow: 'auto', border: '1px solid #E5E7E9', borderRadius: 10, background: '#FAFBFC', padding: 16 }}>
      <div style={{ width: diagramWidth, position: 'relative', paddingRight: 10 }}>
        <svg width={diagramWidth} height={height} role="img" aria-label="Location Breakdown Structure diagram explanation" data-dev-diagram-preview="true">
          <defs>
            <marker id="devMermaidArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#13A8C8" />
            </marker>
          </defs>
          {edges.map((edge, index) => {
            const start = positions.get(edge.from);
            const end = positions.get(edge.to);
            if (!start || !end) return null;
            const x1 = start.x + start.width / 2;
            const y1 = start.y + nodeHeight;
            const x2 = end.x + end.width / 2;
            const y2 = end.y;
            const midY = y1 + Math.max(18, (y2 - y1) / 2);
            const path = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2 - 8}`;
            return (
              <g key={`${edge.from}-${edge.to}-${index}`}>
                <path d={path} fill="none" stroke="#D9D9D9" strokeWidth="1.25" markerEnd="url(#devMermaidArrow)" />
                {edge.label && (
                  <text x={(x1 + x2) / 2} y={midY - 8} textAnchor="middle" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#5E6C84' }}>
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map(node => {
            const point = positions.get(node.id);
            if (!point) return null;
            const rectProps = node.shape === 'decision'
              ? { rx: 18, fill: '#FFF7E6', stroke: '#FA8C16' }
              : { rx: 0, fill: '#F5F5F5', stroke: '#D9D9D9' };
            return (
              <g key={node.id}>
                <rect x={point.x} y={point.y} width={point.width} height={nodeHeight} {...rectProps} />
                <foreignObject x={point.x + 12} y={point.y + 9} width={point.width - 24} height={nodeHeight - 18}>
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: '16px', color: '#172B4D' }}>
                    {node.label}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
        <div
          role="separator"
          aria-label="Resize diagram canvas"
          aria-orientation="vertical"
          data-dev-diagram-resize-handle="true"
          onMouseDown={(event) => {
            event.preventDefault();
            resizeStartRef.current = { x: event.clientX, width: diagramWidth };
            setResizing(true);
          }}
          onMouseEnter={() => setResizeHovered(true)}
          onMouseLeave={() => setResizeHovered(false)}
          style={{
            position: 'absolute',
            top: 0,
            right: -5,
            width: 16,
            height,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            cursor: 'col-resize',
            background: resizing ? '#E6F7FF' : 'transparent',
            transition: 'background 120ms ease',
            zIndex: 3,
            pointerEvents: 'auto',
          }}
        >
          <div style={{ width: 1, background: resizeHovered || resizing ? '#1890FF' : '#D9D9D9', boxShadow: resizeHovered || resizing ? '0 0 0 1px rgba(24,144,255,0.18)' : 'none' }} />
        </div>
      </div>
    </div>
  );
}

function flattenDocuments(documents: DevDocument[] = [], depth = 0): Array<{ document: DevDocument; depth: number }> {
  return documents.flatMap(document => [
    { document, depth },
    ...flattenDocuments(document.children, depth + 1),
  ]);
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5E6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TextNoteIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#0C66E4' : '#5E6C84'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function getDocumentSource(document: DevDocument) {
  return document.contentType === 'mermaid' ? document.diagram ?? document.markdown : document.markdown;
}

function slugifyFileName(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'document';
}

export function DevDocumentModal({
  document,
  documents = [],
  onDocumentChange,
  onClose,
}: {
  document: DevDocument;
  documents?: DevDocument[];
  onDocumentChange?: (document: DevDocument) => void;
  onClose: () => void;
}) {
  const [view, setView] = useState<DocumentView>('preview');
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [sidebarHandleHovered, setSidebarHandleHovered] = useState(false);
  const [sidebarDragging, setSidebarDragging] = useState(false);
  const sidebarDragStartRef = useRef({ x: 0, width: SIDEBAR_DEFAULT_WIDTH });
  const navItems = useMemo(() => flattenDocuments(documents), [documents]);
  const isMermaidDocument = document.contentType === 'mermaid';
  const rawSource = getDocumentSource(document);
  const rawView: DocumentView = isMermaidDocument ? 'code' : 'markdown';

  useEffect(() => {
    setView('preview');
  }, [document.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!sidebarDragging) return undefined;

    const previousCursor = window.document.body.style.cursor;
    const previousUserSelect = window.document.body.style.userSelect;

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const delta = event.clientX - sidebarDragStartRef.current.x;
      setSidebarWidth(clampSidebarWidth(sidebarDragStartRef.current.width + delta));
    };

    const onMouseUp = () => setSidebarDragging(false);

    window.document.body.style.cursor = 'col-resize';
    window.document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.document.body.style.cursor = previousCursor;
      window.document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [sidebarDragging]);

  function downloadRawSource() {
    const extension = isMermaidDocument ? 'mmd' : 'md';
    const blob = new Blob([rawSource], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${slugifyFileName(document.title)}.${extension}`;
    window.document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={document.title}
      style={{ position: 'fixed', inset: 0, zIndex: 9500, background: 'rgba(29,44,56,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, pointerEvents: 'auto' }}
      onClick={onClose}
    >
      <div
        style={{ width: 'min(1180px, calc(100vw - 80px))', height: 'min(800px, calc(100vh - 80px))', background: '#FFFFFF', borderRadius: 12, boxShadow: '0 18px 60px rgba(29,44,56,0.28)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        onClick={event => event.stopPropagation()}
      >
        <div style={{ height: 62, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px 0 22px', borderBottom: '1px solid #E5E7E9', background: '#FAFAFA' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{document.title}</div>
            <a href={document.sourceUrl} target="_blank" rel="noreferrer" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#1890FF', textDecoration: 'underline' }}>Open source in Confluence</a>
          </div>
          <button type="button" onClick={onClose} aria-label="Close document preview" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #D9D9D9', background: '#FFFFFF', cursor: 'pointer', fontSize: 20, color: '#384857' }}>×</button>
        </div>

        <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: '0 22px', borderBottom: '1px solid #EEEFF1' }}>
          <button
            type="button"
            aria-label={`Download ${isMermaidDocument ? 'Mermaid source' : 'Markdown source'}`}
            onClick={downloadRawSource}
            style={{ height: 32, width: 34, borderRadius: 6, border: '1px solid #D9D9D9', background: '#FFFFFF', color: '#384857', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <DownloadIcon />
          </button>
          <div role="group" aria-label={isMermaidDocument ? 'Diagram view mode' : 'Document view mode'} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {(['preview', rawView] as const).map((item, index) => {
              const active = view === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-label={item === 'preview' ? 'Show preview' : 'Show source code'}
                  aria-pressed={active}
                  title={item === 'preview' ? 'Preview' : 'Code'}
                  onClick={() => setView(item)}
                  style={{
                    width: 34,
                    height: 32,
                    borderRadius: index === 0 ? '6px 0 0 6px' : '0 6px 6px 0',
                    border: active ? '1px solid #1890FF' : '1px solid #D9D9D9',
                    marginLeft: index === 0 ? 0 : -1,
                    background: active ? '#E6F7FF' : '#FFFFFF',
                    color: active ? '#096DD9' : '#384857',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    position: 'relative',
                    zIndex: active ? 1 : 0,
                  }}
                >
                  {item === 'preview' ? <EyeIcon /> : <CodeIcon />}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
          {navItems.length > 0 && (
            <>
              <aside style={{ width: sidebarWidth, minWidth: SIDEBAR_MIN_WIDTH, maxWidth: SIDEBAR_MAX_WIDTH, flexShrink: 0, background: '#FAFBFC', overflow: 'auto', padding: '14px 10px' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#5E6C84', margin: '0 8px 10px' }}>Documentation</div>
                {navItems.map(({ document: item, depth }) => {
                  const active = item.id === document.id;
                  const hasChildren = !!item.children?.length;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onDocumentChange?.(item);
                        setView('preview');
                      }}
                      style={{
                        width: '100%',
                        minHeight: 36,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        border: 'none',
                        borderRadius: 6,
                        background: active ? '#E9F2FF' : 'transparent',
                        color: active ? '#0C66E4' : '#243746',
                        cursor: 'pointer',
                        padding: `6px 8px 6px ${8 + depth * 16}px`,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 12,
                        fontWeight: active ? 700 : 500,
                        textAlign: 'left',
                        minWidth: 0,
                      }}
                      title={item.title}
                    >
                      <span style={{ width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {hasChildren ? <ChevronDownIcon /> : depth > 0 ? <span style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#0C66E4' : '#5E6C84' }} /> : null}
                      </span>
                      <span style={{ width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <TextNoteIcon active={active} />
                      </span>
                      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                    </button>
                  );
                })}
              </aside>
              <div
                role="separator"
                aria-label="Resize documentation sidebar"
                aria-orientation="vertical"
                data-dev-document-resize-handle="true"
                onMouseDown={(event) => {
                  event.preventDefault();
                  sidebarDragStartRef.current = { x: event.clientX, width: sidebarWidth };
                  setSidebarDragging(true);
                }}
                onMouseEnter={() => setSidebarHandleHovered(true)}
                onMouseLeave={() => setSidebarHandleHovered(false)}
                style={{
                  width: 10,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  cursor: 'col-resize',
                  background: sidebarDragging ? '#E6F7FF' : 'transparent',
                  transition: 'background 120ms ease',
                }}
              >
                <div
                  style={{
                    width: 1,
                    background: sidebarHandleHovered || sidebarDragging ? '#1890FF' : '#E5E7E9',
                    boxShadow: sidebarHandleHovered || sidebarDragging ? '0 0 0 1px rgba(24,144,255,0.18)' : 'none',
                    transition: 'background 120ms ease, box-shadow 120ms ease',
                  }}
                />
              </div>
            </>
          )}
          <div style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: 24 }}>
            {view === 'preview' ? (
              isMermaidDocument ? <MermaidPreview source={rawSource} /> : <MarkdownPreview markdown={document.markdown} />
            ) : (
              <pre style={{ margin: 0, minHeight: '100%', padding: 16, borderRadius: 8, background: '#F5F6F7', border: '1px solid #E5E7E9', whiteSpace: 'pre-wrap', fontFamily: 'Consolas, monospace', fontSize: 12, lineHeight: '19px', color: '#243746' }}>{rawSource}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
