import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import type { DirectoryUser } from './add-user-modal';
import { GLOBAL_DIRECTORY } from './add-user-modal';
import { useToast } from './toast';

// ─── Constants ────────────────────────────────────────────────────────────────
const PERMISSION_OPTIONS = [
  'Project Member',
  'Project Admin',
];

const DEFAULT_ROLE = 'Default [Home - Read only]';

// ─── Cleveland Hospital Roles — 2-tier data (mirrors roles-table.tsx) ─────────
interface RoleChild { id: string; name: string; }
interface RoleGroup  { id: string; name: string; children: RoleChild[]; }

const ROLE_GROUPS: RoleGroup[] = [
  { id: 'construction', name: 'Construction', children: [
    { id: 'cm',    name: 'Construction Manager' },
    { id: 'sm',    name: 'Site Manager' },
    { id: 'supt',  name: 'Superintendent' },
    { id: 'gsupt', name: 'General Superintendent' },
    { id: 'fe',    name: 'Field Engineer' },
    { id: 'dsupt', name: 'Discipline Superintendent' },
  ]},
  { id: 'owner', name: 'Owner', children: [
    { id: 'or',  name: 'Owner Representative' },
    { id: 'cr',  name: 'Client Representative' },
    { id: 'dev', name: 'Developer' },
    { id: 'am',  name: 'Asset Manager' },
  ]},
  { id: 'management', name: 'Management', children: [
    { id: 'pm',  name: 'Project Manager' },
    { id: 'dpm', name: 'Deputy Project Manager' },
    { id: 'apm', name: 'Assistant Project Manager' },
    { id: 'pe',  name: 'Project Engineer' },
    { id: 'pc',  name: 'Project Coordinator' },
  ]},
  { id: 'design', name: 'Design', children: [
    { id: 'arch', name: 'Architect' },
    { id: 'id',   name: 'Interior Designer' },
    { id: 'dm',   name: 'Design Manager' },
    { id: 'dc',   name: 'Design Coordinator' },
  ]},
  { id: 'engineering', name: 'Engineering', children: [
    { id: 'se',  name: 'Structural Engineer' },
    { id: 'ce',  name: 'Civil Engineer' },
    { id: 'me',  name: 'Mechanical Engineer' },
    { id: 'ee',  name: 'Electrical Engineer' },
    { id: 'ple', name: 'Plumbing Engineer' },
    { id: 'fpe', name: 'Fire Protection Engineer' },
  ]},
  { id: 'bim', name: 'BIM', children: [
    { id: 'bimm',  name: 'BIM Manager' },
    { id: 'bimc',  name: 'BIM Coordinator' },
    { id: 'bimmd', name: 'BIM Modeler' },
    { id: 'vdc',   name: 'VDC Manager' },
    { id: 'ddl',   name: 'Digital Delivery Lead' },
  ]},
  { id: 'estimating', name: 'Estimating', children: [
    { id: 'est',  name: 'Estimator' },
    { id: 'sest', name: 'Senior Estimator' },
    { id: 'qs',   name: 'Quantity Surveyor' },
    { id: 'ceng', name: 'Cost Engineer' },
  ]},
  { id: 'planning', name: 'Planning', children: [
    { id: 'sch',    name: 'Scheduler' },
    { id: 'plneng', name: 'Planning Engineer' },
    { id: 'sa',     name: 'Schedule Analyst' },
    { id: 'ctrl',   name: 'Controls Engineer' },
  ]},
  { id: 'commercial', name: 'Commercial', children: [
    { id: 'comm', name: 'Commercial Manager' },
    { id: 'conm', name: 'Contracts Manager' },
    { id: 'proc', name: 'Procurement Manager' },
    { id: 'cmg',  name: 'Cost Manager' },
    { id: 'scm',  name: 'Supply Chain Manager' },
  ]},
  { id: 'safety', name: 'Safety', children: [
    { id: 'hsm',  name: 'Safety Manager' },
    { id: 'hsem', name: 'HSE Manager' },
    { id: 'so',   name: 'Safety Officer' },
    { id: 'ehsc', name: 'EHS Coordinator' },
  ]},
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function CloseIco() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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

function LockIco() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2.5" y="7.5" width="11" height="7" rx="1.5" stroke="#C4C8CC" strokeWidth="1.3" />
      <path d="M5 7.5V5.5a3 3 0 016 0v2" stroke="#C4C8CC" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClearIco() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 4L12 12M12 4L4 12" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIco() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="7" stroke="#DB0000" strokeWidth="1.3" />
      <path d="M8 5v3.5" stroke="#DB0000" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.7" fill="#DB0000" />
    </svg>
  );
}

function GreenCheckSmIco() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="7" fill="#52C41A" />
      <path d="M5 8l2.5 2.5L11 5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoSmIco() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M8 7v4" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5.2" r="0.7" fill="#9CA3AF" />
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

function AddBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 36,
        padding: '0 16px',
        borderRadius: 4,
        border: 'none',
        backgroundColor: '#FF4D00',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '20px',
        color: '#FFFFFF',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}
      onMouseDown={e => (e.currentTarget.style.backgroundColor = '#D4380D')}
      onMouseUp={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
    >
      Add
    </button>
  );
}

// ─── ProjectRoleDropdown — 2-tier grouped list per Figma spec ─────────────────
function ProjectRoleDropdown({ value, onChange }: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-role-dropdown-menu]')
      ) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Position menu to match trigger width exactly
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // Flatten all roles for search
  const allRoles = ROLE_GROUPS.flatMap(g => g.children.map(c => ({ groupName: g.name, roleName: c.name, id: c.id })));

  const isSearching = search.length >= 2;
  const filteredRoles = isSearching
    ? allRoles.filter(r => r.roleName.toLowerCase().includes(search.toLowerCase()))
    : [];

  const defaultMatches = !isSearching || DEFAULT_ROLE.toLowerCase().includes(search.toLowerCase());

  // Render a role item (shared between grouped and flat views)
  const renderRoleItem = (roleName: string, key: string, indent = true) => {
    const isSelected = value === roleName;
    return (
      <div
        key={key}
        onMouseDown={() => { onChange(roleName); setOpen(false); setSearch(''); }}
        style={{
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: indent ? 24 : 12,
          paddingRight: 12,
          cursor: 'pointer',
          background: isSelected ? '#E6F7FF' : 'transparent',
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#F5F5F5'; }}
        onMouseLeave={e => { e.currentTarget.style.background = isSelected ? '#E6F7FF' : 'transparent'; }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: isSelected ? 600 : 400,
          lineHeight: '20px',
          color: '#262626',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {roleName}
        </span>
        {isSelected && <BluecheckIco />}
      </div>
    );
  };

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          height: 40,
          width: '100%',
          background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#344054',
              minWidth: 0,
            }}
          />
        ) : (
          <span style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: value ? '#344054' : '#9EA3A9',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {value || 'Select...'}
          </span>
        )}
        <ChevronIco open={open} />
      </div>

      {/* Portal menu */}
      {open && ReactDOM.createPortal(
        <div
          data-role-dropdown-menu
          style={{
            ...menuStyle,
            background: '#FFFFFF',
            borderRadius: 4,
            boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            maxHeight: 240,
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {isSearching ? (
            /* ── Search mode: flat filtered results ── */
            <>
              {defaultMatches && renderRoleItem(DEFAULT_ROLE, 'default-search', false)}
              {filteredRoles.length === 0 && !defaultMatches ? (
                <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>
                  No results found
                </div>
              ) : (
                filteredRoles.map(r => renderRoleItem(r.roleName, r.id, false))
              )}
            </>
          ) : (
            /* ── Normal mode: Default first → separator → grouped roles ── */
            <>
              {/* Default [Home - Read only] — always first */}
              {renderRoleItem(DEFAULT_ROLE, 'default', false)}

              {/* Separator */}
              <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '4px 0' }} />

              {/* Grouped roles */}
              {ROLE_GROUPS.map(group => (
                <React.Fragment key={group.id}>
                  {/* Group header */}
                  <div style={{
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    background: '#F5F5F5',
                    borderBottom: '0.5px solid rgba(60,60,67,0.20)',
                  }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: '20px',
                      color: '#262626',
                    }}>
                      {group.name}
                    </span>
                  </div>
                  {/* Role items — indented */}
                  {group.children.map(child => renderRoleItem(child.name, child.id, true))}
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

// ─── FormDropdown — §16.8 spec ─────────────────────────────────────────────
function FormDropdown({ value, options, onChange }: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-invite-dropdown-menu]')
      ) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Position menu
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        minWidth: 180,
        zIndex: 9999,
      });
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const filtered = search.length >= 2
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          height: 40,
          width: '100%',
          background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#344054',
              minWidth: 0,
            }}
          />
        ) : (
          <span style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: value ? '#344054' : '#9EA3A9',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {value || 'Select...'}
          </span>
        )}
        <ChevronIco open={open} />
      </div>

      {/* Portal menu */}
      {open && ReactDOM.createPortal(
        <div
          data-invite-dropdown-menu
          style={{
            ...menuStyle,
            background: '#FFFFFF',
            borderRadius: 4,
            boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            padding: '4px 0',
            maxHeight: 320,
            overflowY: 'auto',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>
              No results found
            </div>
          ) : (
            filtered.map(opt => (
              <div
                key={opt}
                onMouseDown={() => { onChange(opt); setOpen(false); setSearch(''); }}
                style={{
                  height: 32,
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: value === opt ? '#E6F7FF' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: value === opt ? 600 : 400,
                  color: '#384857',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = '#F5F5F5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = value === opt ? '#E6F7FF' : 'transparent'; }}
              >
                <span>{opt}</span>
                {value === opt && <BluecheckIco />}
              </div>
            ))
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function AddAnotherCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        flexShrink: 0,
        width: 18,
        height: 18,
        borderRadius: 3,
        border: `1.5px solid ${checked ? '#0E70CB' : '#D0D5DD'}`,
        backgroundColor: checked ? '#0E70CB' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────
function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#344054' }}>
        {text}
      </span>
      {required && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#DB0000' }}>*</span>
      )}
    </div>
  );
}

// ─── Text Input ───────────────────────────────────────────────────────────────
function TextInput({
  value, onChange, placeholder, readOnly, autoFilled, onClear, hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  autoFilled?: boolean;
  onClear?: () => void;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = hasError
    ? '#FFA39E'
    : autoFilled
      ? '#E0E4E8'
      : focused
        ? '#91D5FF'
        : hovered
          ? '#A8B0BB'
          : '#D0D5DD';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 40,
        background: autoFilled ? '#F5F5F5' : '#FFFFFF',
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        padding: '0 10px',
        gap: 8,
        transition: 'border-color 0.15s',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: autoFilled ? '#5B6570' : '#344054',
          cursor: readOnly ? 'default' : 'text',
        }}
        placeholder-color="#667085"
      />
      {onClear && value && !readOnly && (
        <button
          onClick={onClear}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <ClearIco />
        </button>
      )}
      {autoFilled && <LockIco />}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUserEmails?: Set<string>;
  onAddUserDirectly?: (user: DirectoryUser) => void;
}

export function InviteUserModal({
  isOpen,
  onClose,
  projectUserEmails = new Set(),
  onAddUserDirectly,
}: InviteUserModalProps) {
  const { showToast } = useToast();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [email, setEmail]               = useState('');
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [company, setCompany]           = useState('');
  const [permissionType, setPermission] = useState('Project Member');
  const [roleLevel, setRoleLevel]       = useState(DEFAULT_ROLE);
  const [addAnother, setAddAnother]     = useState(false);

  // ── Lookup / feedback state ─────────────────────────────────────────────────
  const [lookupUser, setLookupUser]     = useState<DirectoryUser | null>(null);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const autoFilledRef                   = useRef(false);
  const [emailError, setEmailError]     = useState('');
  const [sessionInvites, setSessionInvites] = useState<Set<string>>(new Set());

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // ── Reset all state when modal opens ────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setEmail(''); setFirstName(''); setLastName(''); setCompany('');
      setPermission('Project Member');
      setRoleLevel(DEFAULT_ROLE);
      setAddAnother(false);
      setLookupUser(null); setIsAutoFilled(false);
      autoFilledRef.current = false;
      setEmailError('');
      setSessionInvites(new Set());
    }
  }, [isOpen]);

  // ── Live email → directory lookup ───────────────────────────────────────────
  useEffect(() => {
    const q = email.trim().toLowerCase();

    if (!q) {
      if (autoFilledRef.current) {
        setFirstName(''); setLastName(''); setCompany('');
        autoFilledRef.current = false;
        setIsAutoFilled(false);
      }
      setLookupUser(null);
      return;
    }

    const match = GLOBAL_DIRECTORY.find(u => u.email.toLowerCase() === q) ?? null;
    setLookupUser(match);

    if (match) {
      const parts = match.name.trim().split(/\s+/);
      setFirstName(parts[0] ?? '');
      setLastName(parts.slice(1).join(' '));
      setCompany(match.company);
      autoFilledRef.current = true;
      setIsAutoFilled(true);
    } else if (autoFilledRef.current) {
      setFirstName(''); setLastName(''); setCompany('');
      autoFilledRef.current = false;
      setIsAutoFilled(false);
    }
  }, [email]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleEmailChange = (val: string) => {
    setEmail(val);
    setEmailError('');
  };

  const handleReset = useCallback(() => {
    setEmail(''); setFirstName(''); setLastName(''); setCompany('');
    setPermission('Project Member');
    setRoleLevel(DEFAULT_ROLE);
    setLookupUser(null); setIsAutoFilled(false);
    autoFilledRef.current = false;
    setEmailError('');
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError('Email address is required.');
      return;
    }
    if (!isValidEmail(trimmed)) {
      setEmailError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }
    const lc = trimmed.toLowerCase();
    if ([...projectUserEmails].some(e => e.toLowerCase() === lc)) {
      setEmailError('This user is already a member of this project.');
      return;
    }
    if (sessionInvites.has(lc)) {
      setEmailError('An invitation has already been sent to this address in this session.');
      return;
    }

    setSessionInvites(prev => new Set([...prev, lc]));

    showToast({
      type: 'success',
      title: 'Invitation Sent',
      message: `An invitation was sent to ${trimmed}. If they don't have an Inertia account yet, they'll be prompted to sign up.`,
    });

    if (addAnother) {
      setEmail(''); setFirstName(''); setLastName(''); setCompany('');
      setPermission('Project Member');
      setRoleLevel(DEFAULT_ROLE);
      setLookupUser(null); setIsAutoFilled(false);
      autoFilledRef.current = false;
      setEmailError('');
    } else {
      onClose();
    }
  }, [email, addAnother, projectUserEmails, sessionInvites, showToast, onClose]);

  // ── handleAddDirectly ───────────────────────────────────────────────────────
  const handleAddDirectly = useCallback(() => {
    if (!lookupUser) return;
    onAddUserDirectly?.(lookupUser);
    showToast({
      type: 'success',
      title: 'User Added',
      message: `${lookupUser.name} has been added to the project.`,
    });
    if (addAnother) {
      setEmail(''); setFirstName(''); setLastName(''); setCompany('');
      setPermission('Project Member');
      setRoleLevel(DEFAULT_ROLE);
      setLookupUser(null); setIsAutoFilled(false);
      autoFilledRef.current = false;
      setEmailError('');
    } else {
      onClose();
    }
  }, [lookupUser, addAnother, onAddUserDirectly, showToast, onClose]);

  if (!isOpen) return null;

  const emailIsValid = isValidEmail(email.trim());
  const emailLc = email.trim().toLowerCase();
  const isAlreadyInProject = emailIsValid && [...projectUserEmails].some(e => e.toLowerCase() === emailLc);
  const inPoolNotInProject = emailIsValid && !!lookupUser && !isAlreadyInProject;
  const lookupStatus: 'idle' | 'found' | 'not-found' = emailIsValid
    ? lookupUser ? 'found' : 'not-found'
    : 'idle';

  return (
    <>
      {/* ── Overlay ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          backgroundColor: 'rgba(0,0,0,0.20)',
        }}
        onClick={onClose}
      />

      {/* ── Modal ── */}
      <div
        style={{
          position: 'fixed',
          zIndex: 501,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 582,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ═══ HEADER ═══ */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            padding: '0 24px',
          }}>
            <p style={{
              fontFamily: "'Actor', sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: '28.8px',
              color: '#1B2736',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              Invite a New User
            </p>
            <button
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                borderRadius: 40, transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <CloseIco />
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ═══ BODY ═══ */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Email Address * ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <FieldLabel text="Email Address" required />
              {/* Input row: field + conditional Add button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <TextInput
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Type here"
                    onClear={() => handleEmailChange('')}
                    hasError={!!emailError}
                  />
                </div>
                {/* Add button — Primary Small, visible only when user is in pool but not in project */}
                {inPoolNotInProject && (
                  <AddBtn onClick={handleAddDirectly} />
                )}
              </div>
              {emailError && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 2 }}>
                  <ErrorIco />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#DB0000', lineHeight: '18px' }}>
                    {emailError}
                  </span>
                </div>
              )}
              {!emailError && lookupStatus === 'found' && !inPoolNotInProject && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 2 }}>
                  <GreenCheckSmIco />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#389E0D', lineHeight: '18px' }}>
                    Found in Inertia Global Directory — Name &amp; Company auto-filled
                  </span>
                </div>
              )}
              {!emailError && inPoolNotInProject && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 2 }}>
                  <InfoSmIco />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#D46B08', lineHeight: '18px' }}>
                    This user exists in the Inertia Nexus pool but hasn't been added to this project yet. Use <strong style={{ fontWeight: 600 }}>Add</strong> to add them directly, or modify the email to send an invitation.
                  </span>
                </div>
              )}
              {!emailError && lookupStatus === 'not-found' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 2 }}>
                  <InfoSmIco />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', lineHeight: '18px' }}>
                    An invitation will be sent to{' '}
                    <strong style={{ fontWeight: 600, color: '#027A48' }}>{email.trim()}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* ── User Type * ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <FieldLabel text="User Type" required />
              <FormDropdown value={permissionType} options={PERMISSION_OPTIONS} onChange={setPermission} />
            </div>

            {/* ── Project Role ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <FieldLabel text="Project Role" />
              <ProjectRoleDropdown value={roleLevel} onChange={setRoleLevel} />
            </div>

            {/* ── First Name + Last Name ── */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <FieldLabel text="First Name" />
                <TextInput
                  value={firstName}
                  onChange={v => { if (!isAutoFilled) setFirstName(v); }}
                  placeholder="Optional"
                  readOnly={isAutoFilled}
                  autoFilled={isAutoFilled}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <FieldLabel text="Last Name" />
                <TextInput
                  value={lastName}
                  onChange={v => { if (!isAutoFilled) setLastName(v); }}
                  placeholder="Optional"
                  readOnly={isAutoFilled}
                  autoFilled={isAutoFilled}
                />
              </div>
            </div>
            {isAutoFilled && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9EA2A8', marginTop: -12 }}>
                Auto-filled from Inertia Global Directory
              </span>
            )}

            {/* ── Company ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <FieldLabel text="Company" />
              <TextInput
                value={company}
                onChange={v => { if (!isAutoFilled) setCompany(v); }}
                placeholder="Optional"
                readOnly={isAutoFilled}
                autoFilled={isAutoFilled}
              />
              {isAutoFilled && (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9EA2A8' }}>
                  Auto-filled from Inertia Global Directory
                </span>
              )}
            </div>

          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            flexShrink: 0,
            height: 72,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #C3C7CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
          }}
        >
          {/* Left: Add Another + Reset All */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
              <AddAnotherCheckbox checked={addAnother} onChange={() => setAddAnother(v => !v)} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                color: '#616D79',
              }}>
                Add Another
              </span>
            </label>
            <button
              onClick={handleReset}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                color: '#616D79',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#384857')}
              onMouseLeave={e => (e.currentTarget.style.color = '#616D79')}
            >
              Reset All
            </button>
          </div>

          {/* Right: Cancel + Send Invitation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Cancel — Secondary Medium */}
            <button
              onClick={onClose}
              style={{
                height: 36,
                padding: '0 16px',
                borderRadius: 4,
                border: '1px solid #C3C7CC',
                backgroundColor: '#F2F3F4',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                color: '#616D79',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#E5E7E9';
                e.currentTarget.style.borderColor = '#616D79';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#F2F3F4';
                e.currentTarget.style.borderColor = '#C3C7CC';
              }}
            >
              Cancel
            </button>

            {/* Send Invitation — Primary Medium */}
            <button
              onClick={inPoolNotInProject ? undefined : handleSend}
              disabled={inPoolNotInProject}
              style={{
                height: 36,
                padding: '0 16px',
                borderRadius: 4,
                border: 'none',
                backgroundColor: inPoolNotInProject ? '#FFBD9C' : '#FF4D00',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                color: '#FFFFFF',
                cursor: inPoolNotInProject ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => { if (!inPoolNotInProject) e.currentTarget.style.backgroundColor = '#FF773E'; }}
              onMouseLeave={e => { if (!inPoolNotInProject) e.currentTarget.style.backgroundColor = '#FF4D00'; }}
              onMouseDown={e => { if (!inPoolNotInProject) e.currentTarget.style.backgroundColor = '#D4380D'; }}
              onMouseUp={e => { if (!inPoolNotInProject) e.currentTarget.style.backgroundColor = '#FF773E'; }}
            >
              Send Invitation
            </button>


          </div>
        </div>
      </div>
    </>
  );
}