import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ─── Field definitions — permissionType deliberately excluded ─────────────────
export const FILTER_FIELDS: Array<{ key: string; label: string }> = [
  { key: 'company',          label: 'Company'              },
  { key: 'office',           label: 'Office'               },
  { key: 'emailDomain',      label: 'Email Domain'         },
  { key: 'status',           label: 'User Account Status'  },
  { key: 'membershipStatus', label: 'Membership Status'    },
  { key: 'userType',         label: 'User Type'            },
  { key: 'accessLevel',      label: 'Project Role'         },
];

export type FieldVisibility = 'show' | 'hide';

export interface FilterConfig {
  filters:    Record<string, string[]>;
  visibility: Record<string, FieldVisibility>;
}

export const EMPTY_CONFIG: FilterConfig = {
  filters:    Object.fromEntries(FILTER_FIELDS.map(f => [f.key, [] as string[]])),
  visibility: Object.fromEntries(FILTER_FIELDS.map(f => [f.key, 'show' as FieldVisibility])),
};

// ─── Chevron icon (§16.8 spec) ────────────────────────────────────────────────
function ChevronIco({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 20 20" fill="none"
      style={{ flexShrink: 0, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={open ? '#91D5FF' : '#9EA3A9'}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Blue checkmark (§16.8.4 selected item) ──────────────────────────────────
function BlueCheckIco() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Multi-select chip component ──────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: 20, padding: '0 6px',
      background: '#E6F7FF', border: '1px solid #BAE7FF',
      borderRadius: 3,
      fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400,
      color: '#096DD9', whiteSpace: 'nowrap', lineHeight: '18px',
    }}>
      {label}
      <button
        onClick={e => { e.stopPropagation(); onRemove(); }}
        style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1890FF', flexShrink: 0 }}
      >
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}

// ─── Multi-select dropdown following §16.8 ───────────────────────────────────
interface MultiSelectProps {
  value:    string[];
  options:  string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({ value, options, onChange, placeholder = 'Select values…' }: MultiSelectProps) {
  const [open,    setOpen]    = useState(false);
  const [search,  setSearch]  = useState('');
  const [dropPos, setDropPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [trigHov, setTrigHov] = useState(false);

  const triggerRef  = useRef<HTMLDivElement>(null);
  const dropRef     = useRef<HTMLDivElement>(null);
  const searchRef   = useRef<HTMLInputElement>(null);

  // §16.8.2 — filter from 2nd character onward
  const visibleOptions = search.length >= 1
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const openDropdown = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const listH      = Math.min(options.length * 32 + 56, 320);
    const spaceBelow = window.innerHeight - r.bottom - 6;
    const flipUp     = spaceBelow < listH && r.top > listH;
    setDropPos({
      top:   flipUp ? r.top + window.scrollY - listH - 4 : r.bottom + window.scrollY + 4,
      left:  r.left + window.scrollX,
      width: r.width,
    });
    setSearch('');
    setOpen(true);
    setTimeout(() => searchRef.current?.focus(), 30);
  }, [options.length]);

  const closeDropdown = useCallback(() => { setOpen(false); setSearch(''); }, []);

  // Outside click
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) &&
          !dropRef.current?.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open, closeDropdown]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const h = () => closeDropdown();
    window.addEventListener('scroll', h, true);
    return () => window.removeEventListener('scroll', h, true);
  }, [open, closeDropdown]);

  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);

  const clearAll = (e: React.MouseEvent) => { e.stopPropagation(); onChange([]); };

  // ── Trigger border colour per §16.8.1
  const borderColor = open ? '#91D5FF' : trigHov ? '#A8B0BB' : '#D0D5DD';

  // ── Portal menu
  const menu = open && dropPos ? createPortal(
    <div
      ref={dropRef}
      style={{
        position: 'fixed',
        top:    dropPos.top,
        left:   dropPos.left,
        width:  dropPos.width,
        zIndex: 9999,
        background: '#FFFFFF',
        borderRadius: 4,
        boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
        border: '1px solid #E0E4E8',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 320,
      }}
    >
      {/* Inline search — §16.8.2 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 12px 6px',
        borderBottom: '1px solid #F0F0F0',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
          <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={searchRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search…"
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054',
          }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9CA4AE', lineHeight: 1, display: 'flex' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Options list — §16.8.4 */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {visibleOptions.length === 0 ? (
          /* §16.8.5 empty state */
          <div style={{ padding: '8px 12px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</span>
          </div>
        ) : (
          visibleOptions.map(opt => {
            const selected = value.includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggle(opt)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  height: 32, padding: '0 12px',
                  cursor: 'pointer',
                  background: selected ? '#E6F7FF' : 'transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (!selected) e.currentTarget.style.background = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = selected ? '#E6F7FF' : 'transparent'; }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 14,
                  fontWeight: selected ? 600 : 400,
                  color: '#384857',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                }}>
                  {opt}
                </span>
                {selected && <BlueCheckIco />}
              </div>
            );
          })
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Trigger §16.8.1 ── */}
      <div
        ref={triggerRef}
        onClick={open ? closeDropdown : openDropdown}
        onMouseEnter={() => setTrigHov(true)}
        onMouseLeave={() => setTrigHov(false)}
        style={{
          minHeight: 40,
          display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4,
          padding: '5px 10px',
          paddingRight: 36,
          background: '#FFFFFF',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          cursor: 'pointer',
          userSelect: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
          position: 'relative',
        }}
      >
        {value.length === 0 ? (
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#667085', lineHeight: '20px' }}>
            {placeholder}
          </span>
        ) : (
          value.map(v => (
            <Chip
              key={v}
              label={v}
              onRemove={() => onChange(value.filter(x => x !== v))}
            />
          ))
        )}

        {/* Right controls — clear + chevron */}
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          {value.length > 0 && (
            <button
              onClick={clearAll}
              style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#9CA4AE' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#595959')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA4AE')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <ChevronIco open={open} />
        </div>
      </div>

      {menu}
    </div>
  );
}

// ─── FormField wrapper (matches Bulk Edit style) ──────────────────────────────
export function FormField({ label, children, badge }: { label: string; children: React.ReactNode; badge?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <label style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          color: '#344054', lineHeight: '20px',
        }}>
          {label}
        </label>
        {badge != null && badge > 0 && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9999,
            background: '#1890FF', color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, lineHeight: 1,
          }}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />;
}

// ─── Main FilterPanel — white modern style matching Bulk Edit ─────────────────
export interface FilterPanelProps {
  onClose:  () => void;
  options:  Record<string, string[]>;
  config:   FilterConfig;
  onApply:  (config: FilterConfig) => void;
  onReset:  () => void;
}

export function FilterPanel({ onClose, options, config, onApply, onReset }: FilterPanelProps) {

  const [draftFilters, setDraftFilters] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(FILTER_FIELDS.map(f => [f.key, config.filters[f.key] ?? []]))
  );

  // Sync draft whenever config changes (external reset)
  useEffect(() => {
    setDraftFilters(Object.fromEntries(FILTER_FIELDS.map(f => [f.key, config.filters[f.key] ?? []])));
  }, [config]);

  const activeCount = Object.values(draftFilters).filter(v => Array.isArray(v) && v.length > 0).length;
  const totalSelected = Object.values(draftFilters).reduce((acc, v) => acc + (Array.isArray(v) ? v.length : 0), 0);

  const handleApply = () => {
    onApply({
      filters:    { ...draftFilters },
      visibility: Object.fromEntries(FILTER_FIELDS.map(f => [f.key, 'show' as FieldVisibility])),
    });
    onClose();
  };

  const handleReset = () => {
    const empty = Object.fromEntries(FILTER_FIELDS.map(f => [f.key, [] as string[]]));
    setDraftFilters(empty);
    onReset();
  };

  const setField = (key: string, val: string[]) =>
    setDraftFilters(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      boxShadow: '-3px 0 12px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #D9D9D9',
      overflow: 'hidden',
    }}>

      {/* ══ HEADER — §10.3 Standard Modal Header Style ══ */}
      <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72, padding: '0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <p style={{
              fontFamily: "'Actor', sans-serif",
              fontWeight: 400, fontSize: 24, lineHeight: '28.8px',
              color: '#1B2736', margin: 0, whiteSpace: 'nowrap',
            }}>
              Filter
            </p>
            {activeCount > 0 && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 22, height: 22, padding: '0 6px', borderRadius: 9999,
                background: '#1890FF', color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              }}>
                {totalSelected}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
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
        {/* §10.3 header bottom divider */}
        <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
      </div>

      {/* ══ SCROLLABLE FORM BODY ══ */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {FILTER_FIELDS.map((field, idx) => (
            <React.Fragment key={field.key}>
              <div style={{ paddingBottom: 16 }}>
                <FormField label={field.label} badge={draftFilters[field.key]?.length}>
                  <MultiSelectDropdown
                    value={draftFilters[field.key] ?? []}
                    options={options[field.key] ?? []}
                    onChange={v => setField(field.key, v)}
                    placeholder={`Select ${field.label.toLowerCase()}…`}
                  />
                </FormField>
              </div>
              {idx < FILTER_FIELDS.length - 1 && <Divider />}
              {idx < FILTER_FIELDS.length - 1 && <div style={{ height: 4 }} />}
            </React.Fragment>
          ))}

          {/* bottom breathing room */}
          <div style={{ height: 20 }} />
        </div>
      </div>

      {/* ══ FOOTER — §10.4 ══ */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: 1, backgroundColor: '#C3C7CC' }} />
        <div style={{
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 24, paddingRight: 24,
        }}>
          {/* Reset All — Tertiary §15.3 */}
          <button
            onClick={handleReset}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              color: activeCount > 0 ? '#616D79' : '#BFBFBF',
              background: 'none', border: 'none',
              cursor: activeCount > 0 ? 'pointer' : 'default',
              padding: '4px 8px', borderRadius: 4,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (activeCount > 0) e.currentTarget.style.backgroundColor = '#E5E7E9'; }}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Reset All
          </button>

          {/* Apply — Primary §15.1 */}
          <button
            onClick={handleApply}
            style={{
              height: 36, padding: '0 20px',
              background: '#FF4D00', border: 'none', borderRadius: 4,
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#FFFFFF', cursor: 'pointer',
              transition: 'background 0.15s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FF773E')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FF4D00')}
          >
            Apply{totalSelected > 0 ? ` (${totalSelected})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}