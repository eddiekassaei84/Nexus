import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { User } from './users-table';

// ─── Constants ────────────────────────────────────────────────────────────────
const MULTI  = '[Multiple Values]';

const USER_TYPE_OPTIONS = ['Project Admin', 'Project Member'];
const USER_ACCOUNT_STATUS_OPTIONS = ['Registered', 'Pending Invitation', 'Expired Invitation'];
const MEMBERSHIP_STATUS_OPTIONS   = ['Active', 'Suspended'];
const OFFICE_OPTIONS    = ['Boston', 'New York', 'Chicago', 'Houston', 'Seattle', 'Austin'];

const DEFAULT_ROLE = 'Default [Home - Read only]';

interface RoleChild { id: string; name: string; }
interface RoleGroup  { id: string; name: string; children: RoleChild[]; }

const ROLE_GROUPS: RoleGroup[] = [
  { id: 'construction', name: 'Construction', children: [
    { id: 'cm', name: 'Construction Manager' }, { id: 'sm', name: 'Site Manager' },
    { id: 'supt', name: 'Superintendent' }, { id: 'gsupt', name: 'General Superintendent' },
    { id: 'fe', name: 'Field Engineer' }, { id: 'dsupt', name: 'Discipline Superintendent' },
  ]},
  { id: 'owner', name: 'Owner', children: [
    { id: 'or', name: 'Owner Representative' }, { id: 'cr', name: 'Client Representative' },
    { id: 'dev', name: 'Developer' }, { id: 'am', name: 'Asset Manager' },
  ]},
  { id: 'management', name: 'Management', children: [
    { id: 'pm', name: 'Project Manager' }, { id: 'dpm', name: 'Deputy Project Manager' },
    { id: 'apm', name: 'Assistant Project Manager' }, { id: 'pe', name: 'Project Engineer' },
    { id: 'pc', name: 'Project Coordinator' },
  ]},
  { id: 'design', name: 'Design', children: [
    { id: 'arch', name: 'Architect' }, { id: 'id', name: 'Interior Designer' },
    { id: 'dm', name: 'Design Manager' }, { id: 'dc', name: 'Design Coordinator' },
  ]},
  { id: 'engineering', name: 'Engineering', children: [
    { id: 'se', name: 'Structural Engineer' }, { id: 'ce', name: 'Civil Engineer' },
    { id: 'me', name: 'Mechanical Engineer' }, { id: 'ee', name: 'Electrical Engineer' },
    { id: 'ple', name: 'Plumbing Engineer' }, { id: 'fpe', name: 'Fire Protection Engineer' },
  ]},
  { id: 'bim', name: 'BIM', children: [
    { id: 'bimm', name: 'BIM Manager' }, { id: 'bimc', name: 'BIM Coordinator' },
    { id: 'bimmd', name: 'BIM Modeler' }, { id: 'vdc', name: 'VDC Manager' },
    { id: 'ddl', name: 'Digital Delivery Lead' },
  ]},
  { id: 'estimating', name: 'Estimating', children: [
    { id: 'est', name: 'Estimator' }, { id: 'sest', name: 'Senior Estimator' },
    { id: 'qs', name: 'Quantity Surveyor' }, { id: 'ceng', name: 'Cost Engineer' },
  ]},
  { id: 'planning', name: 'Planning', children: [
    { id: 'sch', name: 'Scheduler' }, { id: 'plneng', name: 'Planning Engineer' },
    { id: 'sa', name: 'Schedule Analyst' }, { id: 'ctrl', name: 'Controls Engineer' },
  ]},
  { id: 'commercial', name: 'Commercial', children: [
    { id: 'comm', name: 'Commercial Manager' }, { id: 'conm', name: 'Contracts Manager' },
    { id: 'proc', name: 'Procurement Manager' }, { id: 'cmg', name: 'Cost Manager' },
    { id: 'scm', name: 'Supply Chain Manager' },
  ]},
  { id: 'safety', name: 'Safety', children: [
    { id: 'hsm', name: 'Safety Manager' }, { id: 'hsem', name: 'HSE Manager' },
    { id: 'so', name: 'Safety Officer' }, { id: 'ehsc', name: 'EHS Coordinator' },
  ]},
];

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { bg: string; dot: string; color: string }> = {
  'Registered':         { bg: '#ECFDF3', dot: '#12B76A', color: '#027A48' },
  'Active':             { bg: '#ECFDF3', dot: '#12B76A', color: '#027A48' },
  'Suspended':          { bg: '#FEF2F2', dot: '#EF4444', color: '#B91C1C' },
  'Pending Invitation': { bg: '#EFF8FF', dot: '#6172F3', color: '#175CD3' },
  'Expired Invitation': { bg: '#FFF7ED', dot: '#EF6820', color: '#C4320A' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getSharedValue(users: User[], key: keyof User): string {
  const vals = [...new Set(users.map(u => String(u[key] ?? '')))];
  return vals.length === 1 ? vals[0] : MULTI;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronIco({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
      style={{ flexShrink: 0, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BluecheckIco() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Confirm-to-apply inline block ───────────────────────────────────────────
interface ConfirmBlockProps {
  count:    number;
  onApply:  () => void;
  onCancel: () => void;
}
function ConfirmBlock({ count, onApply, onCancel }: ConfirmBlockProps) {
  const [typed, setTyped] = useState('');
  const inputRef          = useRef<HTMLInputElement>(null);
  const ok                = typed.toLowerCase() === 'edit';

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 30); }, []);

  return (
    <div style={{
      marginTop: 8, padding: '12px 14px', borderRadius: 6,
      background: '#FFFBE6', border: '1px solid #FFD666',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#613400', margin: 0, lineHeight: '16px' }}>
        This will apply to <strong>{count}</strong> user{count !== 1 ? 's' : ''}. Type{' '}
        <strong style={{ color: '#D48806' }}>edit</strong> below to confirm.
      </p>
      <input
        ref={inputRef}
        value={typed}
        onChange={e => setTyped(e.target.value)}
        placeholder="Type 'edit' to confirm"
        onKeyDown={e => { if (e.key === 'Enter' && ok) onApply(); if (e.key === 'Escape') onCancel(); }}
        style={{
          height: 32, borderRadius: 4, padding: '0 10px',
          border: `1.5px solid ${ok ? '#D48806' : '#D0D5DD'}`,
          fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#344054',
          background: ok ? '#FFFBE6' : '#FFFFFF', outline: 'none',
          transition: 'border-color 0.15s',
        }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{ height: 28, padding: '0 12px', borderRadius: 4, border: '1px solid #C3C7CC', background: '#F2F3F4', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#616D79', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; }}
        >Cancel</button>
        <button
          onClick={onApply}
          disabled={!ok}
          style={{ height: 28, padding: '0 12px', borderRadius: 4, border: 'none', background: ok ? '#FF4D00' : '#FFBD9C', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFFFFF', cursor: ok ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}
        >Apply</button>
      </div>
    </div>
  );
}

// ─── Remove confirmation modal ────────────────────────────────────────────────
function RemoveConfirmModal({ count, onClose, onConfirm }: { count: number; onClose: () => void; onConfirm: () => void }) {
  const [typed, setTyped] = useState('');
  const inputRef          = useRef<HTMLInputElement>(null);
  const ok                = typed.toLowerCase() === 'remove';

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 420, background: '#FFFFFF', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }} onMouseDown={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '24px 24px 16px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18.66 17H1.34L10 2Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M10 8V11" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="14" r="1" fill="#D92D20"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#101828', marginBottom: 4, lineHeight: '24px' }}>
              Remove {count} {count === 1 ? 'user' : 'users'}?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 13, color: '#667085', lineHeight: '20px', margin: 0 }}>
              This action cannot be undone. The selected {count === 1 ? 'user' : 'users'} will be permanently removed from this project.
            </p>
          </div>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginTop: -2, transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F2F4F7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1L10 10M10 1L1 10" stroke="#667085" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div style={{ padding: '0 24px 24px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#344054', marginBottom: 8, fontWeight: 500 }}>
            To confirm, type <span style={{ color: '#D92D20', fontWeight: 600 }}>remove</span> in the field below:
          </p>
          <input
            ref={inputRef}
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder="Type remove to confirm"
            onKeyDown={e => { if (e.key === 'Enter' && ok) onConfirm(); }}
            style={{
              width: '100%', height: 38, padding: '0 12px', borderRadius: 6, outline: 'none',
              border: `1.5px solid ${ok ? '#D92D20' : '#D0D5DD'}`,
              fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#101828',
              background: ok ? '#FFF5F5' : '#FFFFFF', boxSizing: 'border-box', transition: 'border-color 0.15s',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button onClick={onClose} style={{ height: 36, padding: '0 16px', borderRadius: 4, border: '1px solid #C3C7CC', background: '#F2F3F4', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; }}
            >Cancel</button>
            <button onClick={onConfirm} disabled={!ok} style={{ height: 36, padding: '0 16px', borderRadius: 4, border: ok ? '1px solid #B42318' : '1px solid #D0D5DD', background: ok ? '#D92D20' : '#F2F4F7', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: ok ? 'white' : '#A0ADB8', cursor: ok ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Generic FormDropdown §16.8 ───────────────────────────────────────────────
interface FormDropdownProps {
  displayValue:   string;         // current shared value or MULTI
  options:        string[];
  pendingValue:   string | null;  // value selected but not yet confirmed
  onSelect:       (v: string) => void;
  disabled?:      boolean;
  menuAttr?:      string;
}

function FormDropdown({ displayValue, options, pendingValue, onSelect, disabled = false, menuAttr = 'data-be-dd' }: FormDropdownProps) {
  const [open, setOpen]         = useState(false);
  const [search, setSearch]     = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const isMulti = displayValue === MULTI;
  const shownValue = pendingValue ?? displayValue;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(`[${menuAttr}]`)
      ) { setOpen(false); setSearch(''); }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuAttr]);

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setMenuStyle({ position: 'fixed', top: r.bottom + 4, left: r.left, width: r.width, minWidth: 180, zIndex: 9999 });
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const filtered = search.length >= 2
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelect = (v: string) => {
    onSelect(v);
    setOpen(false);
    setSearch('');
  };

  if (disabled) {
    return (
      <div style={{
        height: 40, borderRadius: 4, border: '1px solid #E0E4E8',
        background: '#F5F5F5', display: 'flex', alignItems: 'center',
        padding: '0 10px', boxSizing: 'border-box', gap: 8,
        cursor: 'not-allowed',
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="2.5" y="7.5" width="11" height="7" rx="1.5" stroke="#BFBFBF" strokeWidth="1.3"/>
          <path d="M5 7.5V5.5a3 3 0 016 0v2" stroke="#BFBFBF" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#BFBFBF', fontWeight: 400 }}>
          {displayValue}
        </span>
      </div>
    );
  }

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          height: 40, width: '100%', background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : pendingValue ? '#FAAD14' : '#D0D5DD'}`,
          borderRadius: 4, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 10px',
          cursor: 'pointer', transition: 'border-color 0.15s', boxSizing: 'border-box',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            onClick={e => e.stopPropagation()}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', minWidth: 0 }}
          />
        ) : (
          <span style={{
            fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
            color: isMulti && !pendingValue ? '#9EA3A9' : pendingValue ? '#D48806' : '#344054',
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontStyle: isMulti && !pendingValue ? 'italic' : 'normal',
          }}>
            {isMulti && !pendingValue ? MULTI : shownValue}
          </span>
        )}
        <ChevronIco open={open} />
      </div>

      {open && ReactDOM.createPortal(
        <div
          {...{ [menuAttr]: '' }}
          style={{
            ...menuStyle,
            background: '#FFFFFF', borderRadius: 4,
            boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            maxHeight: 320, overflowY: 'auto', padding: '4px 0',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</div>
          ) : filtered.map(opt => {
            const sel = shownValue === opt;
            return (
              <div key={opt} onMouseDown={() => handleSelect(opt)}
                style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', cursor: 'pointer', background: sel ? '#E6F7FF' : 'transparent', transition: 'background 0.1s' }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = sel ? '#E6F7FF' : 'transparent'; }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: sel ? 600 : 400, color: '#384857' }}>{opt}</span>
                {sel && <BluecheckIco />}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── ProjectRoleDropdown (2-tier, for bulk edit) ──────────────────────────────
interface RoleDropdownProps {
  displayValue: string;
  pendingValue: string | null;
  onSelect:     (v: string) => void;
}
function ProjectRoleDropdown({ displayValue, pendingValue, onSelect }: RoleDropdownProps) {
  const [open, setOpen]         = useState(false);
  const [search, setSearch]     = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const isMulti    = displayValue === MULTI;
  const shownValue = pendingValue ?? displayValue;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-be-role-dd]')
      ) { setOpen(false); setSearch(''); }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setMenuStyle({ position: 'fixed', top: r.bottom + 4, left: r.left, width: r.width, zIndex: 9999 });
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const allRoles      = ROLE_GROUPS.flatMap(g => g.children.map(c => ({ roleName: c.name, id: c.id })));
  const isSearching   = search.length >= 2;
  const filteredRoles = isSearching ? allRoles.filter(r => r.roleName.toLowerCase().includes(search.toLowerCase())) : [];
  const defaultMatches = !isSearching || DEFAULT_ROLE.toLowerCase().includes(search.toLowerCase());

  const renderItem = (roleName: string, key: string, indent = false) => {
    const sel = shownValue === roleName;
    return (
      <div key={key} onMouseDown={() => { onSelect(roleName); setOpen(false); setSearch(''); }}
        style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: indent ? 24 : 12, paddingRight: 12, cursor: 'pointer', background: sel ? '#E6F7FF' : 'transparent', transition: 'background 0.1s' }}
        onMouseEnter={e => { if (!sel) e.currentTarget.style.background = '#F5F5F5'; }}
        onMouseLeave={e => { e.currentTarget.style.background = sel ? '#E6F7FF' : 'transparent'; }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: sel ? 600 : 400, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{roleName}</span>
        {sel && <BluecheckIco />}
      </div>
    );
  };

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          height: 40, width: '100%', background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : pendingValue ? '#FAAD14' : '#D0D5DD'}`,
          borderRadius: 4, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 10px',
          cursor: 'pointer', transition: 'border-color 0.15s', boxSizing: 'border-box',
        }}
      >
        {open ? (
          <input ref={inputRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." onClick={e => e.stopPropagation()} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', minWidth: 0 }} />
        ) : (
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: isMulti && !pendingValue ? '#9EA3A9' : pendingValue ? '#D48806' : '#344054', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: isMulti && !pendingValue ? 'italic' : 'normal' }}>
            {isMulti && !pendingValue ? MULTI : shownValue}
          </span>
        )}
        <ChevronIco open={open} />
      </div>

      {open && ReactDOM.createPortal(
        <div data-be-role-dd style={{ ...menuStyle, background: '#FFFFFF', borderRadius: 4, boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)', maxHeight: 320, overflowY: 'auto', padding: '4px 0' }}>
          {isSearching ? (
            <>
              {defaultMatches && renderItem(DEFAULT_ROLE, 'default-s', false)}
              {filteredRoles.length === 0 && !defaultMatches
                ? <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</div>
                : filteredRoles.map(r => renderItem(r.roleName, r.id, false))}
            </>
          ) : (
            <>
              {renderItem(DEFAULT_ROLE, 'default', false)}
              <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '4px 0' }} />
              {ROLE_GROUPS.map(group => (
                <React.Fragment key={group.id}>
                  <div style={{ height: 30, display: 'flex', alignItems: 'center', padding: '0 12px', background: '#F5F5F5', borderBottom: '0.5px solid rgba(60,60,67,0.20)' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#262626' }}>{group.name}</span>
                  </div>
                  {group.children.map(c => renderItem(c.name, c.id, true))}
                </React.Fragment>
              ))}
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: 'rgba(0,0,0,0.65)', lineHeight: '18px' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── StatusPill ───────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG['Active'];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 10px', borderRadius: 9999, backgroundColor: cfg.bg, width: 'fit-content' }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: cfg.dot, flexShrink: 0 }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: cfg.color, whiteSpace: 'nowrap', lineHeight: '18px' }}>{status}</span>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface BulkEditPanelProps {
  selectedIds:    Set<number>;
  allUsers:       User[];
  isOpen:         boolean;
  onClose:        () => void;
  onApplyField:   (field: keyof User, value: string, ids: Set<number>) => void;
  onRemove:       (ids: Set<number>) => void;
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export function BulkEditPanel({ selectedIds, allUsers, isOpen, onClose, onApplyField, onRemove }: BulkEditPanelProps) {
  const selected = allUsers.filter(u => selectedIds.has(u.id));
  const count    = selected.length;

  // Shared values
  const sharedRole    = getSharedValue(selected, 'accessLevel');
  const sharedType    = getSharedValue(selected, 'userType');
  const sharedStatus     = getSharedValue(selected, 'status');
  const sharedMembership = getSharedValue(selected, 'membershipStatus');

  // Office: only editable if all selected users share the same company
  const companies     = [...new Set(selected.map(u => u.company))];
  const sameCompany   = companies.length === 1;
  const sharedOffice  = sameCompany ? getSharedValue(selected, 'office') : MULTI;
  const officeDisabled = !sameCompany;

  // User Account Status groups
  // Group A: Registered  |  Group B: Pending Invitation / Expired Invitation
  const STATUS_GROUP_B = new Set(['Pending Invitation', 'Expired Invitation']);
  const hasGroupA = selected.some(u => u.status === 'Registered');
  const hasGroupB = selected.some(u => STATUS_GROUP_B.has(u.status));
  const mixedStatusGroups = hasGroupA && hasGroupB;
  const statusOptions = hasGroupB && !hasGroupA
    ? ['Pending Invitation', 'Expired Invitation']
    : USER_ACCOUNT_STATUS_OPTIONS;
  const statusDisabled = mixedStatusGroups;
  const membershipDisabled = hasGroupB; // Membership Status only applies to Registered users

  // Pending (staged but not yet confirmed) changes — only ONE field at a time
  type FieldKey = 'role' | 'userType' | 'status' | 'membershipStatus' | 'office';
  const [pendingField, setPendingField] = useState<FieldKey | null>(null);
  const [pendingValue, setPendingValue] = useState<string>('');

  // Remove modal
  const [showRemove, setShowRemove] = useState(false);

  // Reset pending when panel closes or selection changes
  useEffect(() => {
    if (!isOpen) { setPendingField(null); setPendingValue(''); }
  }, [isOpen]);
  useEffect(() => { setPendingField(null); setPendingValue(''); }, [selectedIds]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && !showRemove) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose, showRemove]);

  const handleSelect = (field: FieldKey, value: string) => {
    setPendingField(field);
    setPendingValue(value);
  };

  const handleApply = () => {
    if (!pendingField) return;
    const fieldMap: Record<FieldKey, keyof User> = {
      role:             'accessLevel',
      userType:         'userType',
      status:           'status',
      membershipStatus: 'membershipStatus',
      office:           'office',
    };
    onApplyField(fieldMap[pendingField], pendingValue, selectedIds);
    setPendingField(null);
    setPendingValue('');
  };

  const handleCancelPending = () => { setPendingField(null); setPendingValue(''); };

  const handleRemoveConfirm = () => {
    onRemove(selectedIds);
    setShowRemove(false);
    onClose();
  };

  return (
    <>
      <div
        aria-label="Bulk Edit"
        style={{
          width:           370,
          height:          '100%',
          backgroundColor: '#FFFFFF',
          boxShadow:       '-3px 0 12px rgba(0,0,0,0.08)',
          display:         'flex',
          flexDirection:   'column',
          borderLeft:      '1px solid #D9D9D9',
          overflow:        'hidden',
        }}
      >
        {/* ══ HEADER — §10.3 Standard Modal Header Style ══ */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Bulk Edit
            </p>
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

        {/* ══ SELECTED USERS SUMMARY ══ */}
        <div style={{ flexShrink: 0, padding: '12px 20px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF4D00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#FFFFFF', lineHeight: 1 }}>{count}</span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#384857', lineHeight: '18px' }}>
            <strong>{count}</strong> user{count !== 1 ? 's' : ''} selected for bulk edit
          </span>
        </div>

        {/* ══ SCROLLABLE FORM BODY ══ */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* ── Project Role ── */}
            <div style={{ paddingBottom: pendingField === 'role' ? 4 : 16 }}>
              <FormField label="Project Role">
                <ProjectRoleDropdown
                  displayValue={sharedRole}
                  pendingValue={pendingField === 'role' ? pendingValue : null}
                  onSelect={v => handleSelect('role', v)}
                />
              </FormField>
              {pendingField === 'role' && (
                <ConfirmBlock count={count} onApply={handleApply} onCancel={handleCancelPending} />
              )}
            </div>

            <div style={{ marginBottom: 12 }} />

            {/* ── User Type ── */}
            <div style={{ paddingBottom: pendingField === 'userType' ? 4 : 16 }}>
              <FormField label="User Type">
                <FormDropdown
                  displayValue={sharedType}
                  options={USER_TYPE_OPTIONS}
                  pendingValue={pendingField === 'userType' ? pendingValue : null}
                  onSelect={v => handleSelect('userType', v)}
                  menuAttr="data-be-type-dd"
                />
              </FormField>
              {pendingField === 'userType' && (
                <ConfirmBlock count={count} onApply={handleApply} onCancel={handleCancelPending} />
              )}
            </div>

            <div style={{ marginBottom: 12 }} />

            {/* ── User Account Status ── */}
            <div style={{ paddingBottom: pendingField === 'status' ? 4 : 0 }}>
              <FormField label="User Account Status">
                {statusDisabled ? (
                  <div>
                    <FormDropdown
                      displayValue={MULTI}
                      options={[]}
                      pendingValue={null}
                      onSelect={() => {}}
                      disabled={true}
                      menuAttr="data-be-status-dd"
                    />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', margin: '5px 0 0', lineHeight: '15px' }}>
                      Selected users have mixed account status types. User Account Status cannot be bulk-edited across Registered and invitation-state users.
                    </p>
                  </div>
                ) : (
                  <FormDropdown
                    displayValue={sharedStatus}
                    options={statusOptions}
                    pendingValue={pendingField === 'status' ? pendingValue : null}
                    onSelect={v => handleSelect('status', v)}
                    menuAttr="data-be-status-dd"
                  />
                )}
              </FormField>
              {pendingField === 'status' && !statusDisabled && (
                <ConfirmBlock count={count} onApply={handleApply} onCancel={handleCancelPending} />
              )}
            </div>

            <div style={{ marginBottom: 12 }} />

            {/* ── Membership Status ── */}
            <div style={{ paddingBottom: pendingField === 'membershipStatus' ? 4 : 0 }}>
              <FormField label="Membership Status">
                {membershipDisabled ? (
                  <div>
                    <FormDropdown
                      displayValue={MULTI}
                      options={[]}
                      pendingValue={null}
                      onSelect={() => {}}
                      disabled={true}
                      menuAttr="data-be-mstatus-dd"
                    />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', margin: '5px 0 0', lineHeight: '15px' }}>
                      Membership Status only applies to Registered users. Deselect users with Pending or Expired Invitation status to enable this field.
                    </p>
                  </div>
                ) : (
                  <FormDropdown
                    displayValue={sharedMembership ?? ''}
                    options={MEMBERSHIP_STATUS_OPTIONS}
                    pendingValue={pendingField === 'membershipStatus' ? pendingValue : null}
                    onSelect={v => handleSelect('membershipStatus', v)}
                    menuAttr="data-be-mstatus-dd"
                  />
                )}
              </FormField>
              {pendingField === 'membershipStatus' && !membershipDisabled && (
                <ConfirmBlock count={count} onApply={handleApply} onCancel={handleCancelPending} />
              )}
            </div>

            <div style={{ marginBottom: 12 }} />

            {/* ── Office ── */}
            <div style={{ paddingBottom: pendingField === 'office' ? 4 : 0 }}>
              <FormField label={officeDisabled ? 'Office (same company only)' : 'Office'}>
                {officeDisabled ? (
                  <div>
                    <FormDropdown
                      displayValue={MULTI}
                      options={OFFICE_OPTIONS}
                      pendingValue={null}
                      onSelect={() => {}}
                      disabled={true}
                      menuAttr="data-be-office-dd"
                    />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', margin: '5px 0 0', lineHeight: '15px' }}>
                      Selected users belong to different companies. Office cannot be bulk-edited.
                    </p>
                  </div>
                ) : (
                  <FormDropdown
                    displayValue={sharedOffice}
                    options={OFFICE_OPTIONS}
                    pendingValue={pendingField === 'office' ? pendingValue : null}
                    onSelect={v => handleSelect('office', v)}
                    menuAttr="data-be-office-dd"
                  />
                )}
              </FormField>
              {pendingField === 'office' && (
                <ConfirmBlock count={count} onApply={handleApply} onCancel={handleCancelPending} />
              )}
            </div>

            {/* Status preview strip — shows all distinct user account statuses */}
            {selected.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                  Current account statuses
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {Object.entries(
                    selected.reduce<Record<string, number>>((acc, u) => {
                      acc[u.status] = (acc[u.status] ?? 0) + 1;
                      return acc;
                    }, {})
                  ).map(([s, n]) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <StatusPill status={s} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>×{n}</span>
                    </div>
                  ))}
                </div>
                {selected.some(u => u.membershipStatus) && (
                  <>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                      Current membership statuses
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {Object.entries(
                        selected.reduce<Record<string, number>>((acc, u) => {
                          if (u.membershipStatus) acc[u.membershipStatus] = (acc[u.membershipStatus] ?? 0) + 1;
                          return acc;
                        }, {})
                      ).map(([s, n]) => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <StatusPill status={s} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>×{n}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div style={{ height: 20 }} />
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <div style={{ flexShrink: 0, padding: '16px 20px', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setShowRemove(true)}
            style={{ height: 36, padding: '0 16px', borderRadius: 4, border: '1px solid #C3C7CC', backgroundColor: '#F2F3F4', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="#616D79" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Remove {count} {count === 1 ? 'user' : 'users'}
          </button>
        </div>
      </div>

      {showRemove && (
        <RemoveConfirmModal
          count={count}
          onClose={() => setShowRemove(false)}
          onConfirm={handleRemoveConfirm}
        />
      )}
    </>
  );
}