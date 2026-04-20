import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useToast } from './toast';
import { ImageCropModal } from './ui/image-crop-modal';

// ─── Data types ────────────────────────────────────────────────────────────────
export interface PanelUser {
  id:             number;
  name:           string;
  email:          string;
  jobTitle:       string;
  company:        string;
  office:         string;
  permissionType: string;
  accessLevel:    string;
  userType:       string;
  status:         'Registered' | 'Pending Invitation' | 'Expired Invitation';
  membershipStatus?: 'Active' | 'Suspended';
  invitedAt?:     string;
}

// ─── Options ──────────────────────────────────────────────────────────────────
const USER_TYPE_OPTIONS         = ['Project Admin', 'Project Member'];
const OFFICE_OPTIONS            = ['Boston', 'New York', 'Chicago', 'Houston', 'Seattle', 'Austin'];
const MEMBERSHIP_STATUS_OPTIONS = ['Active', 'Suspended'];

const DEFAULT_ROLE = 'Default [Home - Read only]';

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

// ─── Avatar palette ───────────────────────────────────────────────────────────
const AVATAR_PALETTE = [
  { bg: '#dde9ff', text: '#465fff' },
  { bg: '#e6f4ea', text: '#1e7e34' },
  { bg: '#fff3e0', text: '#e65100' },
  { bg: '#fce4ec', text: '#c62828' },
  { bg: '#e8eaf6', text: '#3949ab' },
  { bg: '#e0f7fa', text: '#006064' },
  { bg: '#f3e5f5', text: '#8e24aa' },
  { bg: '#fff8e1', text: '#f9a825' },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ─── Timestamp formatter ──────────────────────────────────────────────────────
function formatInvitedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { bg: string; dot: string; color: string }> = {
  'Active':             { bg: '#ECFDF3', dot: '#12B76A', color: '#027A48' },
  'Suspended':          { bg: '#FEF2F2', dot: '#EF4444', color: '#B91C1C' },
  'Pending Invitation': { bg: '#EFF8FF', dot: '#6172F3', color: '#175CD3' },
  'Expired Invitation': { bg: '#FFF7ED', dot: '#EF6820', color: '#C4320A' },
};

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

// ─── StatusPill ───────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG['Active'];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '2px 10px', borderRadius: 9999,
      backgroundColor: cfg.bg, width: 'fit-content',
    }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: cfg.dot, flexShrink: 0 }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: cfg.color, whiteSpace: 'nowrap', lineHeight: '18px' }}>
        {status}
      </span>
    </div>
  );
}

// ─── FormDropdown §16.8 ───────────────────────────────────────────────────────
function FormDropdown({
  value, options, onChange, placeholder = 'Select...',
  menuAttr = 'data-panel-dd',
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
  menuAttr?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

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

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          height: 40, width: '100%', background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
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
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054', minWidth: 0 }}
          />
        ) : (
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: value ? '#344054' : '#9EA3A9', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value || placeholder}
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
            const sel = value === opt;
            return (
              <div
                key={opt}
                onMouseDown={() => { onChange(opt); setOpen(false); setSearch(''); }}
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

// ─── ProjectRoleDropdown — 2-tier grouped ─────────────────────────────────────
function ProjectRoleDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-panel-role-dd]')
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

  const allRoles = ROLE_GROUPS.flatMap(g => g.children.map(c => ({ groupName: g.name, roleName: c.name, id: c.id })));
  const isSearching = search.length >= 2;
  const filteredRoles = isSearching ? allRoles.filter(r => r.roleName.toLowerCase().includes(search.toLowerCase())) : [];
  const defaultMatches = !isSearching || DEFAULT_ROLE.toLowerCase().includes(search.toLowerCase());

  const renderItem = (roleName: string, key: string, indent = false) => {
    const sel = value === roleName;
    return (
      <div
        key={key}
        onMouseDown={() => { onChange(roleName); setOpen(false); setSearch(''); }}
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
        style={{ height: 40, width: '100%', background: '#FFFFFF', border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', cursor: 'pointer', transition: 'border-color 0.15s', boxSizing: 'border-box' }}
      >
        {open ? (
          <input ref={inputRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." onClick={e => e.stopPropagation()} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054', minWidth: 0 }} />
        ) : (
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: value ? '#344054' : '#9EA3A9', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || 'Select a role...'}</span>
        )}
        <ChevronIco open={open} />
      </div>

      {open && ReactDOM.createPortal(
        <div
          data-panel-role-dd
          style={{ ...menuStyle, background: '#FFFFFF', borderRadius: 4, boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)', maxHeight: 320, overflowY: 'auto', padding: '4px 0' }}
        >
          {isSearching ? (
            <>
              {defaultMatches && renderItem(DEFAULT_ROLE, 'default-s', false)}
              {filteredRoles.length === 0 && !defaultMatches ? (
                <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</div>
              ) : filteredRoles.map(r => renderItem(r.roleName, r.id, false))}
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

// ─── UploadPhotoModal (exported for use in profile-dropdown) ─────────────────
export function UploadPhotoModal({ onClose, onSave }: { onClose: () => void; onSave: (url: string) => void }) {
  const [dragOver, setDragOver]   = React.useState(false);
  const [preview, setPreview]     = React.useState<string | null>(null);
  const [fileName, setFileName]   = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSave = () => {
    if (!preview) return;
    setUploading(true);
    setTimeout(() => { setUploading(false); onSave(preview); onClose(); }, 700);
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 480, background: '#FFFFFF', borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 52, padding: '0 20px', backgroundColor: '#243746', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 18, fontWeight: 400, color: '#F2F3F4', flex: 1 }}>Upload Profile Photo</span>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 4, background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ width: 192, height: 192, borderRadius: 8, border: `2px dashed ${dragOver ? '#FF4D00' : '#D1D5DB'}`, backgroundColor: dragOver ? '#fff5f0' : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'border-color 0.15s' }}
            >
              {preview ? (
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 16px', textAlign: 'center' }}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <polyline points="16 16 12 12 8 16" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="12" x2="12" y2="21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#374151', lineHeight: '18px' }}>Drag & drop or <span style={{ color: '#FF4D00' }}>browse</span></span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', lineHeight: '16px' }}>PNG, JPG — max 5 MB</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
            </div>
            {fileName && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>{fileName}</span>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={onClose} style={{ height: 36, padding: '0 16px', borderRadius: 4, border: '1px solid #C3C7CC', backgroundColor: '#F2F3F4', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSave} disabled={!preview || uploading} style={{ height: 36, padding: '0 16px', borderRadius: 4, border: 'none', backgroundColor: '#FF4D00', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'white', cursor: preview && !uploading ? 'pointer' : 'not-allowed', opacity: preview && !uploading ? 1 : 0.45 }}>
              {uploading ? 'Uploading…' : 'Save Photo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FormField wrapper ────────────────────────────────────────────────────────
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

// ─── Props ────────────────────────────────────────────────────────────────────
export interface PersonalInfoPanelProps {
  user:            PanelUser | null;
  onClose:         () => void;
  isProjectAdmin?: boolean;
  onStatusChange?: (userId: number, next: 'Registered' | 'Pending Invitation' | 'Expired Invitation') => void;
  onReinvite?:     (userId: number, newStatus: 'Pending Invitation', newInvitedAt: string) => void;
  onFieldUpdate?:  (userId: number, field: string, value: string) => void;
  onRemove?:       (userId: number) => void;
}

const NAV_H = 56; // main header height — panel must sit below this

// ─── Panel ───────────────────────────────────────────────────────────────────
export function PersonalInfoPanel({
  user,
  onClose,
  isProjectAdmin = true,
  onStatusChange,
  onReinvite,
  onFieldUpdate,
  onRemove,
}: PersonalInfoPanelProps) {
  const { showToast } = useToast();
  const isOpen = user !== null;

  // Editable field state
  const [projectRole,      setProjectRole]     = useState('');
  const [userType,         setUserType]         = useState('');
  const [office,           setOffice]           = useState('');
  const [status,           setStatus]           = useState<'Registered' | 'Pending Invitation' | 'Expired Invitation'>('Registered');
  const [membershipStatus, setMembershipStatus] = useState<'Active' | 'Suspended' | ''>('');
  const [invitedAt,        setInvitedAt]        = useState<string | undefined>(undefined);

  // Reset when user changes
  useEffect(() => {
    if (!user) return;
    setProjectRole(user.accessLevel ?? '');
    setUserType(user.userType ?? '');
    setOffice(user.office ?? '');
    setStatus(user.status ?? 'Registered');
    setMembershipStatus(user.membershipStatus ?? '');
    setInvitedAt(user.invitedAt);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  const handleSave = (field: string, value: string) => {
    if (user) onFieldUpdate?.(user.id, field, value);
  };

  const handleRemove = () => {
    if (!user) return;
    showToast({ type: 'success', title: `${user.name} removed from project` });
    onRemove?.(user.id);
    onClose();
  };

  const palette  = AVATAR_PALETTE[(user?.id ?? 0) % AVATAR_PALETTE.length];
  const initials = user ? getInitials(user.name) : '';

  // ── Avatar edit state ────────────────────────────────────────────────────
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);
  const [originalAvatarSource, setOriginalAvatarSource] = useState<File | string | null>(null);
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);
  const [showRemoveAvatarModal, setShowRemoveAvatarModal] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);

  // Reset avatar state when the active user changes
  useEffect(() => {
    setCustomAvatarUrl(null);
    setOriginalAvatarSource(null);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // When the photo is removed, clear the original source too
  useEffect(() => {
    if (!customAvatarUrl) setOriginalAvatarSource(null);
  }, [customAvatarUrl]);

  return (
    <div
      role="complementary"
      aria-label="Personal Info"
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
      {/* ══ PROFILE SECTION ══ */}
      <div style={{ flexShrink: 0, padding: '20px 20px 18px', position: 'relative' }}>

        {/* Close × button — top right */}
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4, transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Row: Avatar circle + info */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16, paddingRight: 40 }}>

          {/* Avatar circle — hover shows Edit / Remove overlay */}
          <div
            style={{ position: 'relative', flexShrink: 0, width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '1px solid #E5E7EB', cursor: 'pointer' }}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
          >
            {/* Base: custom photo or initials */}
            {customAvatarUrl ? (
              <img src={customAvatarUrl} alt={user?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: palette.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 26, color: palette.text, userSelect: 'none', lineHeight: 1 }}>
                  {initials}
                </span>
              </div>
            )}

            {/* Hover overlay — split left (Edit) / right (Remove) */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(0,0,0,0.48)',
              display: 'flex',
              opacity: avatarHovered ? 1 : 0,
              transition: 'opacity 0.15s',
            }}>
              {/* Left half — Edit */}
              <div
                onClick={() => setShowAvatarEditModal(true)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 2,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                title="Edit photo"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* 1px vertical divider */}
              <div style={{ width: 1, background: 'rgba(255,255,255,0.25)', flexShrink: 0, alignSelf: 'stretch' }} />

              {/* Right half — Remove (greyed out when no custom photo) */}
              <div
                onClick={() => customAvatarUrl && setShowRemoveAvatarModal(true)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 2,
                  cursor: customAvatarUrl ? 'pointer' : 'default',
                  opacity: customAvatarUrl ? 1 : 0.35,
                }}
                onMouseEnter={e => { if (customAvatarUrl) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                title={customAvatarUrl ? 'Remove photo' : 'No photo to remove'}
              >
                <svg width="16" height="17" viewBox="0 0 14.6239 16.875" fill="none">
                  <path d="M1.125 4.21875H13.5M5.625 1.125H9M2.25 4.21875L3.09375 14.625C3.09375 15.2463 3.5975 15.75 4.21875 15.75H10.4062C11.0275 15.75 11.5312 15.2463 11.5312 14.625L12.375 4.21875" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Name / subtitle / email / status */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 2 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: 'rgba(0,0,0,0.88)', lineHeight: '22px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name ?? ''}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: '18px', whiteSpace: 'nowrap' }}>
              {user?.jobTitle || '—'}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 13, color: '#1890FF', lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {user?.email ?? ''}
            </span>
            <div style={{ marginTop: 4 }}>
              {/* Show membershipStatus pill for Registered users, account status pill for invitation states */}
              <StatusPill status={
                status === 'Registered'
                  ? (membershipStatus || 'Active')
                  : status
              } />
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: '#E5E7EB', flexShrink: 0 }} />

      {/* ══ SCROLLABLE FORM BODY ══ */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Project Role */}
          <FormField label="Project Role">
            <ProjectRoleDropdown
              value={projectRole}
              onChange={v => { setProjectRole(v); handleSave('accessLevel', v); }}
            />
          </FormField>

          {/* User Type */}
          <FormField label="User Type">
            <FormDropdown
              value={userType}
              options={USER_TYPE_OPTIONS}
              placeholder="Select user type..."
              onChange={v => { setUserType(v); handleSave('userType', v); }}
              menuAttr="data-panel-usertype-dd"
            />
          </FormField>

          {/* Office */}
          <FormField label="Office">
            <FormDropdown
              value={office}
              options={OFFICE_OPTIONS}
              placeholder="Select office..."
              onChange={v => { setOffice(v); handleSave('office', v); }}
              menuAttr="data-panel-office-dd"
            />
          </FormField>

          {/* ── User Account Status — ONLY shown for Pending / Expired Invitation ── */}
          {(status === 'Pending Invitation' || status === 'Expired Invitation') && (
            <FormField label="User Account Status">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

                {/* Row: status label left + Re-invite button right */}
                <div style={{
                  height: 40,
                  background: '#FFFFFF',
                  border: '1px solid #D0D5DD',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  gap: 8,
                  boxSizing: 'border-box',
                }}>
                  {/* Status pill — read-only */}
                  <StatusPill status={status} />

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* Re-invite button — Primary CTA §15.1 Medium */}
                  <button
                    onClick={() => {
                      if (!user) return;
                      const now = new Date().toISOString();
                      setStatus('Pending Invitation');
                      setInvitedAt(now);
                      onReinvite?.(user.id, 'Pending Invitation', now);
                      showToast({
                        type: 'success',
                        title: 'Invitation re-sent',
                        message: `A new invitation has been sent to ${user.email}.`,
                      });
                    }}
                    style={{
                      flexShrink: 0,
                      height: 30,
                      padding: '0 12px',
                      borderRadius: 4,
                      border: 'none',
                      backgroundColor: '#FF4D00',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: 13,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      transition: 'background 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}
                    onMouseDown={e => (e.currentTarget.style.backgroundColor = '#D4380D')}
                    onMouseUp={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1" stroke="white" strokeWidth="1.5" />
                      <path d="M1 3.5L7.32 7.97C7.73 8.25 8.27 8.25 8.68 7.97L15 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Re-invite
                  </button>
                </div>

                {/* Timestamp — invitation sent / updated at */}
                {invitedAt && (
                  <span style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 11,
                    lineHeight: '16px',
                    color: '#8C8C8C',
                  }}>
                    Invited: {formatInvitedAt(invitedAt)}
                  </span>
                )}
              </div>
            </FormField>
          )}

          {/* ── Membership Status — ALWAYS shown ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13,
              color: status === 'Registered' ? 'rgba(0,0,0,0.65)' : '#BFBFBF',
              lineHeight: '18px',
            }}>
              Membership Status
            </label>

            {status === 'Registered' ? (
              /* ── Registered: active dropdown — Active / Suspended ── */
              <FormDropdown
                value={membershipStatus}
                options={MEMBERSHIP_STATUS_OPTIONS}
                placeholder="Select membership status..."
                onChange={v => {
                  setMembershipStatus(v as 'Active' | 'Suspended');
                  handleSave('membershipStatus', v);
                }}
                menuAttr="data-panel-mstatus-dd"
              />
            ) : (
              /* ── Pending / Expired: grayed-out display, not interactive ── */
              <div style={{
                height: 40,
                background: '#F5F5F5',
                border: '1px solid #E0E4E8',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: 8,
                boxSizing: 'border-box',
                cursor: 'not-allowed',
              }}>
                <span style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#BFBFBF',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  Not applicable
                </span>
                {/* Disabled chevron */}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#BFBFBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {/* Helper text — explains why it's grayed out for non-registered */}
            {status !== 'Registered' && (
              <span style={{
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 400,
                fontSize: 11,
                lineHeight: '15px',
                color: '#BFBFBF',
              }}>
                Available only for registered users
              </span>
            )}
          </div>

        </div>
      </div>

      {/* ══ FOOTER — Remove user from project ══ */}
      <div style={{
        flexShrink: 0, padding: '16px 20px', borderTop: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}>
        <button
          onClick={handleRemove}
          style={{
            height: 36, padding: '0 16px', borderRadius: 4,
            border: '1px solid #C3C7CC', backgroundColor: '#F2F3F4',
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="#616D79" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Remove
        </button>
      </div>

      {/* ── Avatar crop modal — always opens with originalAvatarSource, never the cropped output ── */}
      {showAvatarEditModal && (
        <ImageCropModal
          file={originalAvatarSource instanceof File ? originalAvatarSource : undefined}
          imageUrl={typeof originalAvatarSource === 'string' ? originalAvatarSource : undefined}
          targetWidth={96}
          targetHeight={96}
          label="Profile Photo"
          onSave={(dataUrl, src) => {
            setOriginalAvatarSource(src);
            setCustomAvatarUrl(dataUrl);
            setShowAvatarEditModal(false);
          }}
          onClose={() => setShowAvatarEditModal(false)}
          onRemove={customAvatarUrl ? () => {
            // Clear avatar — modal stays open and shows empty state
            setCustomAvatarUrl(null);
            setOriginalAvatarSource(null);
          } : undefined}
        />
      )}

      {/* ── Remove photo confirmation modal ── */}
      {showRemoveAvatarModal && ReactDOM.createPortal(
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowRemoveAvatarModal(false)}
        >
          <div
            style={{ background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', width: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
                <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>Remove photo</p>
                <button onClick={() => setShowRemoveAvatarModal(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <div style={{ padding: 8 }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
                </button>
              </div>
              <div style={{ height: 1, backgroundColor: '#F0F0F0' }} />
            </div>
            {/* Body */}
            <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3L18 17H2L10 3Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8v4M10 14v.5" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', margin: '0 0 4px' }}>Remove profile photo?</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79', margin: 0, lineHeight: '20px' }}>
                    The photo will be removed and the avatar will revert to the initials placeholder.
                  </p>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ height: 1, background: '#C3C7CC', margin: '24px 0 0' }} />
              <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 10 }}>
                <button
                  onClick={() => setShowRemoveAvatarModal(false)}
                  style={{ height: 36, padding: '0 16px', background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
                >Cancel</button>
                <button
                  onClick={() => { setCustomAvatarUrl(null); setOriginalAvatarSource(null); setShowRemoveAvatarModal(false); }}
                  style={{ height: 36, padding: '0 16px', background: '#D92D20', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', cursor: 'pointer', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#B42318')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#D92D20')}
                >Remove photo</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}