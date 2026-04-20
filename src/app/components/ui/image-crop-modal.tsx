/**
 * ImageCropModal — shared, reusable image-crop dialog
 *
 * Design spec: Guidelines §25 (Image Crop Modal)
 *
 * Interaction model
 * ─────────────────
 * • The image is displayed scaled-to-contain inside a dark preview canvas.
 * • A crop frame (locked to the supplied aspect ratio) overlays it.
 * • Dragging any of the 4 corner L-bracket handles resizes the frame while keeping
 *   the AR perfectly locked via a diagonal-projection formula.
 * • Dragging the frame interior pans it across the image.
 * • The crop is clamped to always stay within the image bounds.
 * • "Upload a file" in the footer lets the user swap to a new file at any time.
 *
 * Usage
 * ─────
 * ```tsx
 * import { ImageCropModal } from '../ui/image-crop-modal';
 *
 * // Open with an existing URL for re-crop (Edit button flow):
 * <ImageCropModal
 *   imageUrl={currentImageUrl}
 *   targetWidth={416}
 *   targetHeight={260}
 *   label="Project Image"
 *   onSave={dataUrl => { setImageUrl(dataUrl); setOpen(false); }}
 *   onClose={() => setOpen(false)}
 * />
 *
 * // Open with a freshly picked File:
 * <ImageCropModal
 *   file={pendingFile}
 *   targetWidth={96}
 *   targetHeight={96}
 *   label="Profile Photo"
 *   onSave={dataUrl => { setAvatarUrl(dataUrl); setFile(null); }}
 *   onClose={() => setFile(null)}
 * />
 * ```
 *
 * Props
 * ─────
 * • `file`          — (optional) raw File object from a file-input or drag-drop event
 * • `imageUrl`      — (optional) existing image URL to pre-load for re-cropping
 * • `targetWidth`   — output canvas width in natural pixels
 * • `targetHeight`  — output canvas height in natural pixels
 * • `label`         — appears in the modal title as "Edit {label}" / "Add {label}"
 * • `onSave`        — called with a `image/jpeg` data URL at quality 0.92
 * • `onClose`       — called when the user cancels or clicks the backdrop
 * • `onRemove`      — (optional) when provided, shows a "Remove photo" destructive button in the footer
 *
 * Source priority: `file` > `imageUrl`. When the user uploads a new file inside
 * the modal, that new file becomes the active source and overrides both.
 */

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

// ── Internal button primitives ────────────────────────────────────────────────

function PrimaryBtn({
  label, onClick, disabled = false,
}: { label: string; onClick: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 36, padding: '0 16px',
        background: disabled ? '#FFBD9C' : hov ? '#FF773E' : '#FF4D00',
        border: 'none', borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        lineHeight: '20px', color: '#FFFFFF',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// §15.2 Secondary button
function SecondaryBtn({
  label, icon, onClick,
}: { label: string; icon?: React.ReactNode; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 36, padding: '0 16px',
        background: hov ? '#E5E7E9' : '#F2F3F4',
        border: `1px solid ${hov ? '#616D79' : '#C3C7CC'}`,
        borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        lineHeight: '20px', color: '#616D79',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s',
        flexShrink: 0,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// §15.3 Tertiary button — transparent bg, NO border in any state
function TertiaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        height: 36, padding: '0 16px',
        background: pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent',
        border: 'none',
        borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        lineHeight: '20px', color: pressed ? '#FFFFFF' : '#616D79',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        whiteSpace: 'nowrap', transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ImageCropModalProps {
  file?: File | null;    // optional — newly picked file
  imageUrl?: string;     // optional — existing image URL to pre-load for re-crop
  targetWidth: number;
  targetHeight: number;
  label: string;
  /**
   * Called with the exported JPEG data URL + the original source that was
   * cropped (File or URL string). Callers should store the source so that
   * subsequent Edit sessions re-open with the full original image, not the
   * previously-cropped output.
   */
  onSave: (dataUrl: string, source: File | string) => void;
  onClose: () => void;
  /** Optional — when provided, shows a "Remove photo" destructive button in the footer */
  onRemove?: () => void;
}

type DragMode = 'none' | 'move' | 'tl' | 'tr' | 'bl' | 'br';

export function ImageCropModal({
  file: initialFile,
  imageUrl: initialImageUrl,
  targetWidth, targetHeight, label, onSave, onClose, onRemove,
}: ImageCropModalProps) {
  const PREVIEW_W = 572;
  const PREVIEW_H = 320;
  const MIN_CROP  = 60;
  const HANDLE    = 18;
  const HIT       = 22;
  const ar        = targetWidth / targetHeight;
  const s2        = ar * ar + 1;

  const imgRef        = useRef<HTMLImageElement | null>(null);
  const [srcUrl,      setSrcUrl]      = useState('');
  const [natW,        setNatW]        = useState(0);
  const imgDisplayRef = useRef({ left: 0, top: 0, w: 0, h: 0 });
  const [imgDisplay,  setImgDisplay]  = useState({ left: 0, top: 0, w: 0, h: 0 });
  const [crop,        setCrop]        = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [initialCrop, setInitialCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [interacting, setInteracting] = useState<DragMode>('none');
  const [corsError,   setCorsError]   = useState(false);

  // Active source: initially from props; updated when user uploads inside modal.
  // A File takes priority over a URL string.
  const [activeSource, setActiveSource] = useState<File | string | null>(
    initialFile || initialImageUrl || null
  );

  // Hidden file input inside the modal for "Upload a file" button
  const internalFileRef = useRef<HTMLInputElement>(null);

  // ── Load + layout image whenever activeSource changes ─────────────────────
  useEffect(() => {
    if (!activeSource) return;

    let url: string;
    let isBlobUrl = false;

    if (activeSource instanceof File) {
      url = URL.createObjectURL(activeSource);
      isBlobUrl = true;
    } else {
      url = activeSource;
    }

    setSrcUrl('');
    setCorsError(false);
    imgRef.current = null;

    const loadImg = (src: string, withCors: boolean, onLoaded: (img: HTMLImageElement) => void, onFail?: () => void) => {
      const img = new Image();
      if (withCors) img.crossOrigin = 'anonymous';
      img.onload = () => onLoaded(img);
      img.onerror = () => onFail?.();
      img.src = src;
    };

    const applyLayout = (img: HTMLImageElement, canExport: boolean) => {
      imgRef.current = canExport ? img : null;
      setSrcUrl(url);
      setNatW(img.naturalWidth);
      const scale = Math.min(PREVIEW_W / img.naturalWidth, PREVIEW_H / img.naturalHeight);
      const dW = img.naturalWidth  * scale;
      const dH = img.naturalHeight * scale;
      const left = (PREVIEW_W - dW) / 2;
      const top  = (PREVIEW_H - dH) / 2;
      const imgD = { left, top, w: dW, h: dH };
      imgDisplayRef.current = imgD;
      setImgDisplay(imgD);
      let cW = dW; let cH = cW / ar;
      if (cH > dH) { cH = dH; cW = cH * ar; }
      const init = { x: left + (dW - cW) / 2, y: top + (dH - cH) / 2, w: cW, h: cH };
      setCrop(init);
      setInitialCrop(init);
      if (!canExport) setCorsError(true);
    };

    if (activeSource instanceof File) {
      // Files always work — load normally
      loadImg(url, false, img => applyLayout(img, true));
    } else {
      // URL — try with CORS first so we can export; fall back to no-CORS for display only
      loadImg(url, true,
        img => applyLayout(img, true),
        () => loadImg(url, false, img => applyLayout(img, false)),
      );
    }

    return () => { if (isBlobUrl) URL.revokeObjectURL(url); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSource, ar]);

  // ── Handle new file picked inside the modal ───────────────────────────────
  const handleInternalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setActiveSource(f); setCorsError(false); }
    e.target.value = '';
  };

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // ── Drag state ────────────────────────────────────────────────────────────
  const dragRef = useRef<{
    mode: DragMode; startX: number; startY: number;
    startCrop: { x: number; y: number; w: number; h: number };
  }>({ mode: 'none', startX: 0, startY: 0, startCrop: { x: 0, y: 0, w: 0, h: 0 } });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const d    = dragRef.current;
      if (d.mode === 'none') return;
      const imgD = imgDisplayRef.current;
      const dx   = e.clientX - d.startX;
      const dy   = e.clientY - d.startY;
      const sc   = d.startCrop;

      if (d.mode === 'move') {
        setCrop(prev => ({
          x: Math.max(imgD.left, Math.min(imgD.left + imgD.w - prev.w, sc.x + dx)),
          y: Math.max(imgD.top,  Math.min(imgD.top  + imgD.h - prev.h, sc.y + dy)),
          w: prev.w, h: prev.h,
        }));
        return;
      }

      let proj = 0, anchorX = 0, anchorY = 0;
      if (d.mode === 'br') { proj = ( dx * ar + dy) / s2; anchorX = sc.x;        anchorY = sc.y; }
      if (d.mode === 'tl') { proj = (-dx * ar - dy) / s2; anchorX = sc.x + sc.w; anchorY = sc.y + sc.h; }
      if (d.mode === 'tr') { proj = ( dx * ar - dy) / s2; anchorX = sc.x;        anchorY = sc.y + sc.h; }
      if (d.mode === 'bl') { proj = (-dx * ar + dy) / s2; anchorX = sc.x + sc.w; anchorY = sc.y; }

      let newW = sc.w + proj * ar;
      let newH = newW / ar;

      newW = Math.max(MIN_CROP, Math.min(imgD.w, newW));
      newH = newW / ar;
      if (newH > imgD.h) { newH = imgD.h; newW = newH * ar; }

      let nx = anchorX, ny = anchorY;
      if (d.mode === 'tl' || d.mode === 'bl') nx = anchorX - newW;
      if (d.mode === 'tl' || d.mode === 'tr') ny = anchorY - newH;

      nx = Math.max(imgD.left, Math.min(imgD.left + imgD.w - newW, nx));
      ny = Math.max(imgD.top,  Math.min(imgD.top  + imgD.h - newH, ny));

      setCrop({ x: nx, y: ny, w: newW, h: newH });
    };

    const onUp = () => { dragRef.current.mode = 'none'; setInteracting('none'); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [ar, s2]);

  const startDrag = (mode: DragMode, e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault();
    dragRef.current = { mode, startX: e.clientX, startY: e.clientY, startCrop: { ...crop } };
    setInteracting(mode);
  };

  const handleReset = () => setCrop(initialCrop);
  const isDirty = JSON.stringify(crop) !== JSON.stringify(initialCrop);

  // ── Export ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    const img = imgRef.current;
    if (!img) { setCorsError(true); return; }
    const scale = imgDisplay.w / natW;
    const canvas = document.createElement('canvas');
    canvas.width  = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d')!;
    try {
      ctx.drawImage(
        img,
        (crop.x - imgDisplay.left) / scale,
        (crop.y - imgDisplay.top)  / scale,
        crop.w / scale,
        crop.h / scale,
        0, 0, targetWidth, targetHeight,
      );
      onSave(canvas.toDataURL('image/jpeg', 0.92), activeSource!);
    } catch {
      setCorsError(true);
    }
  };

  const hasImage = !!srcUrl;
  const canSave  = hasImage && !corsError;

  const CORNERS: Array<{
    id: DragMode; cursor: string;
    pos: React.CSSProperties; bracket: React.CSSProperties;
  }> = [
    { id: 'tl', cursor: 'nwse-resize', pos: { top: -HIT/2, left: -HIT/2 },     bracket: { borderTop:    '3px solid #fff', borderLeft:   '3px solid #fff' } },
    { id: 'tr', cursor: 'nesw-resize', pos: { top: -HIT/2, right: -HIT/2 },    bracket: { borderTop:    '3px solid #fff', borderRight:  '3px solid #fff' } },
    { id: 'bl', cursor: 'nesw-resize', pos: { bottom: -HIT/2, left: -HIT/2 },  bracket: { borderBottom: '3px solid #fff', borderLeft:   '3px solid #fff' } },
    { id: 'br', cursor: 'nwse-resize', pos: { bottom: -HIT/2, right: -HIT/2 }, bracket: { borderBottom: '3px solid #fff', borderRight:  '3px solid #fff' } },
  ];

  const moveCursor = interacting === 'move' ? 'grabbing' : 'grab';

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(0,0,0,0.50)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF', borderRadius: 8, overflow: 'hidden',
          width: 620, boxShadow: '0 8px 40px rgba(0,0,0,0.28)',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>
              {hasImage ? `Edit ${label}` : `Add ${label}`}
            </p>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0' }} />
        </div>

        {/* ── Preview canvas ── */}
        <div style={{ padding: '20px 24px 0' }}>
          <div
            style={{
              position: 'relative', width: PREVIEW_W, height: PREVIEW_H,
              background: '#F0F2F5', borderRadius: 6, overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {/* Empty state — no image loaded yet */}
            {!hasImage && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 12,
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.06)',
                  border: '1.5px dashed rgba(0,0,0,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 18H20" stroke="rgba(0,0,0,0.20)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#3B4A56', margin: '0 0 4px', lineHeight: '18px' }}>
                    No image selected
                  </p>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE', margin: 0, lineHeight: '16px' }}>
                    Click "Upload a file" below to get started
                  </p>
                </div>
              </div>
            )}

            {/* CORS warning — image visible but can't be exported */}
            {corsError && hasImage && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                background: 'rgba(217,45,32,0.82)',
                padding: '7px 12px', zIndex: 10,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M10 3L18 17H2L10 3Z" stroke="#FFF" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v4M10 14v.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#FFFFFF', margin: 0, lineHeight: '16px' }}>
                  This image can't be re-exported due to cross-origin restrictions — please upload a new file.
                </p>
              </div>
            )}

            {/* Full image, scaled to contain */}
            {srcUrl && (
              <img
                src={srcUrl} alt="" draggable={false}
                style={{
                  position: 'absolute',
                  left: imgDisplay.left, top: imgDisplay.top,
                  width: imgDisplay.w, height: imgDisplay.h,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Dimmed overlay — 4 rects framing the live crop window */}
            {crop.w > 0 && !corsError && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: crop.y, background: 'rgba(0,0,0,0.60)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: crop.y + crop.h, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.60)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: crop.y, left: 0, width: crop.x, height: crop.h, background: 'rgba(0,0,0,0.60)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: crop.y, left: crop.x + crop.w, right: 0, height: crop.h, background: 'rgba(0,0,0,0.60)', pointerEvents: 'none' }} />
              </div>
            )}

            {/* Crop frame: border + rule-of-thirds + corner handles */}
            {crop.w > 0 && !corsError && (
              <div
                onMouseDown={e => startDrag('move', e)}
                style={{
                  position: 'absolute',
                  left: crop.x, top: crop.y, width: crop.w, height: crop.h,
                  boxSizing: 'border-box',
                  border: '1.5px solid rgba(255,255,255,0.80)',
                  cursor: moveCursor,
                }}
              >
                {/* Rule-of-thirds guide lines */}
                {(['33.33%', '66.66%'] as const).map(pos => (
                  <div key={pos} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: pos, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.22)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', left: pos, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.22)', pointerEvents: 'none' }} />
                  </div>
                ))}

                {/* Corner handles: transparent hit zone + L-bracket visual */}
                {CORNERS.map(({ id, cursor, pos, bracket }) => (
                  <div
                    key={id}
                    onMouseDown={e => startDrag(id, e)}
                    style={{
                      position: 'absolute', width: HIT, height: HIT,
                      cursor, zIndex: 3, boxSizing: 'border-box',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      ...pos,
                    }}
                  >
                    <div style={{
                      width: HANDLE, height: HANDLE,
                      boxSizing: 'border-box',
                      ...bracket,
                      pointerEvents: 'none',
                    }} />
                  </div>
                ))}
              </div>
            )}

            {/* Output-size chip — bottom-right corner */}
            <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.48)', borderRadius: 4, padding: '2px 8px', pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.78)' }}>
                {targetWidth} × {targetHeight} px
              </span>
            </div>

            {/* Remove button — top-left, shown when onRemove is provided and image is loaded */}
            {onRemove && hasImage && !corsError && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  // Clear the canvas → shows empty state; modal stays open
                  setActiveSource(null);
                  setSrcUrl('');
                  imgRef.current = null;
                  setCrop({ x: 0, y: 0, w: 0, h: 0 });
                  setInitialCrop({ x: 0, y: 0, w: 0, h: 0 });
                  setCorsError(false);
                  onRemove();
                }}
                style={{
                  position: 'absolute', top: 8, left: 11,
                  background: 'rgba(0,0,0,0.48)', border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 4, padding: '5px 12px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, color: 'rgba(255,255,255,0.85)',
                  transition: 'background 0.15s', zIndex: 10, whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.72)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.48)')}
              >
                Remove
              </button>
            )}

            {/* Reset button — top-right, appears only after user has changed the initial crop */}
            {isDirty && hasImage && !corsError && (
              <button
                onClick={e => { e.stopPropagation(); handleReset(); }}
                style={{
                  position: 'absolute', top: 8, right: 8,
                  background: 'rgba(0,0,0,0.48)', border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 4, padding: '5px 12px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, color: 'rgba(255,255,255,0.85)',
                  transition: 'background 0.15s', zIndex: 10,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.72)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.48)')}
              >
                Reset
              </button>
            )}
          </div>

          {/* Hint text below preview */}
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE', margin: '10px 0 0', textAlign: 'center' }}>
            {hasImage && !corsError
              ? 'Drag corners to resize · Drag inside the frame to reposition'
              : 'Upload a file to start cropping'}
          </p>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        {/* Layout: [Tertiary Cancel]  ←→  [Secondary Upload a file] [Primary Apply crop] */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ height: 1, background: '#C3C7CC', margin: '16px 0 0' }} />
          <div style={{
            height: 72,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px',
          }}>
            {/* Left: Cancel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <TertiaryBtn label="Cancel" onClick={onClose} />
            </div>

            {/* Right: Upload (Secondary) + Apply crop (Primary) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SecondaryBtn
                label="Upload a file"
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 11V3M8 3L5 6M8 3L11 6" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 13H14" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
                onClick={() => internalFileRef.current?.click()}
              />
              <PrimaryBtn
                label="Apply crop"
                onClick={handleSave}
                disabled={!canSave}
              />
            </div>
          </div>
        </div>

        {/* Hidden file input — powers "Upload a file" button in footer */}
        <input
          ref={internalFileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleInternalFileChange}
        />
      </div>
    </div>,
    document.body,
  );
}