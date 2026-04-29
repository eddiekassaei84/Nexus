import React, { useState, useEffect } from 'react';
import svgPathsClose from '../../imports/svg-uayoveoicl';

// ─── Types ────────────────────────────────────────────────────────────────────
interface RoleChild {
  id: string; name: string; code: string; description: string; active: boolean;
  trade: string | null;
}
interface RoleGroup {
  id: string; name: string; code: string; description: string; active: boolean; children: RoleChild[];
}
// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.1336 12.1336" fill="none">
      <path d={svgPathsClose.p41af6c0} fill="#384857" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function makeTimestamp() {
  const d = new Date();
  const pad = (n: number, l = 2) => String(n).padStart(l, '0');
  return (
    String(d.getFullYear()) +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes())
  );
}

// Export column order mirrors the flat import template exactly.
const EXPORT_HEADERS = ['Name', 'Code', 'Note'];

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ExportRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  roles?: RoleGroup[];
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ExportRolesModal({
  isOpen,
  onClose,
  projectName = 'Cleveland Hospital',
  roles = [],
}: ExportRolesModalProps) {
  const makeDefault = () => `${projectName.replace(/\s+/g, '')}-Roles-${makeTimestamp()}`;
  const [filename,     setFilename]     = useState(makeDefault);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (isOpen) setFilename(makeDefault());
  }, [isOpen, projectName]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  function handleExport() {
    const escape = (v: string) =>
      v.includes(',') || v.includes('"') || v.includes('\n')
        ? `"${v.replace(/"/g, '""')}"`
        : v;

    // Flat list: one row per role, in the current visible order.
    const rows: string[][] = [];
    for (const group of roles) {
      for (const child of group.children) {
        rows.push([
          child.name,        // Name
          child.code,        // Code
          child.description, // Note
        ]);
      }
    }

    const csvContent = [
      EXPORT_HEADERS.map(escape).join(','),
      ...rows.map(r => r.map(escape).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${filename || 'roles-export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  }

  if (!isOpen) return null;

  const totalRows = roles.reduce((n, g) => n + g.children.length, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(0,0,0,0.20)' }}
        onClick={onClose}
      />

      {/* Modal shell */}
      <div
        style={{
          position: 'fixed', zIndex: 301,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 48px)',
          backgroundColor: '#F5F5F5',
          borderRadius: 8,
          boxShadow: '20px 20px 25px -5px rgba(0,0,0,0.10), 8px 8px 10px -6px rgba(0,0,0,0.10)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ═══ WHITE CONTENT AREA ═══ */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', backgroundColor: '#FFFFFF', borderRadius: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, padding: '9px 24px 24px' }}>

            {/* ── Heading row ── */}
            <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                <p style={{
                  fontFamily: "'Actor', sans-serif",
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: '28.8px',
                  color: '#1B2736',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}>
                  Export roles to CSV
                </p>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
                    borderRadius: 40, transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ padding: 8 }}>
                    <CloseIcon />
                  </div>
                </button>
              </div>
              {/* Divider */}
              <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%', flexShrink: 0 }} />
            </div>

            {/* ── Body ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Description */}
              <p style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
                lineHeight: '20px', color: '#595959', margin: 0,
              }}>
                Export your project roles to CSV for review, editing, or sharing.{' '}
                {totalRows > 0 && (
                  <><strong style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, color: '#384857' }}>{totalRows}</strong>{' '}
                  row{totalRows !== 1 ? 's' : ''} will be exported.</>
                )}
              </p>

              {/* File name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12,
                  lineHeight: '16px', color: '#384857',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  File name
                </span>
                <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
                  {/* Text input */}
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      minHeight: 40,
                      borderRadius: '4px 0 0 4px',
                      border: `1px solid ${inputFocused ? '#91D5FF' : '#9EA2A8'}`,
                      borderRight: 'none',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <input
                      type="text"
                      value={filename}
                      onChange={e => setFilename(e.target.value)}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      style={{
                        width: '100%',
                        outline: 'none',
                        background: 'transparent',
                        fontFamily: "'Actor', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: '1.2',
                        color: '#243746',
                        border: 'none',
                        padding: 0,
                      }}
                      spellCheck={false}
                    />
                  </div>
                  {/* .csv suffix badge */}
                  <div
                    style={{
                      backgroundColor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 12px',
                      minHeight: 40,
                      borderRadius: '0 4px 4px 0',
                      flexShrink: 0,
                      width: 60,
                      border: '1px solid #9EA2A8',
                      borderLeft: 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Actor', sans-serif", fontWeight: 400,
                      fontSize: 14, lineHeight: '1.2',
                      color: '#9EA3A9', userSelect: 'none',
                    }}>
                      .csv
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            backgroundColor: '#F5F5F5',
            height: 72,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
            paddingRight: 24,
            borderTop: '1.111px solid #C3C7CC',
          }}
        >
          {/* Export — Primary CTA (§15.1 Medium: h-36, px-16, #FF4D00) */}
          <button
            onClick={handleExport}
            style={{
              height: 36,
              paddingLeft: 16,
              paddingRight: 16,
              backgroundColor: '#FF4D00',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}
          >
            Export
          </button>
        </div>
      </div>
    </>
  );
}