import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import trashPaths   from '../../imports/svg-fjqvq36uqo';
import siblingPaths from '../../imports/svg-dwr8dix3rb';
import chevronDownPaths  from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';
import { ImportDisciplineModal, downloadDisciplineTemplate } from './import-discipline-modal';
import { ExportDisciplineModal } from './export-discipline-modal';
// Shared backend types — DisciplineGroup and Phases use the same flat-list data model
import type { FlatGroup, FlatItem } from './flat-ref-table';

// ─── Types ────────────────────────────────────────────────────────────────────
type DtSortKey = 'name' | 'code' | 'discName' | 'discCode' | 'tradeName' | 'tradeCode';
type DtSortDir = 'asc' | 'desc';
interface DtSortState { key: DtSortKey; dir: DtSortDir; }

/** @alias FlatItem — shared backend type */
export interface TradeEntry extends FlatItem {
  disciplineId: string | null;  // alias for groupId
}
/** @alias FlatGroup — shared backend type */
export interface DisciplineGroup extends FlatGroup {
  children: TradeEntry[];
}

type DragItem =
  | { type: 'group'; groupId: string; label: string }
  | { type: 'child'; groupId: string; childId: string; label: string };

type DropTarget =
  | { type: 'group';      groupId: string; pos: 'before' | 'after' }
  | { type: 'child';      groupId: string; childId: string; pos: 'before' | 'after' }
  | { type: 'group-end';  groupId: string }
  | { type: 'disc-group-end'; discId: string };

// ─── ID generator ─────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `dt_${Date.now()}_${++_uid}`; }

// ─── Seed data ────────────────────────────────────────────────────────────────
function mkT(id: string, code: string, name: string): TradeEntry {
  return { id, code, name, description: '', active: true, disciplineId: null };
}

export const DISCIPLINE_DATA: DisciplineGroup[] = [
  {
    id: 'civil-site', name: 'Civil & Site Works', code: 'CIVIL',
    description: '',
    active: true,
    children: [
      mkT('t-gc',   'GC',    'General Contractor'),
      mkT('t-cm',   'CM',    'Construction Management'),
      mkT('t-civil','CIVIL', 'Civil'),
      mkT('t-site', 'SITE',  'Sitework'),
      mkT('t-erth', 'EARTH', 'Earthworks'),
      mkT('t-excv', 'EXCAV', 'Excavation'),
      mkT('t-util', 'UTIL',  'Utilities'),
      mkT('t-drn',  'DRAIN', 'Drainage'),
      mkT('t-road', 'ROAD',  'Roadwork / Paving'),
      mkT('t-land', 'LAND',  'Landscaping'),
      mkT('t-demo', 'DEMO',  'Demolition'),
      mkT('t-surv', 'SURV',  'Surveying'),
    ],
  },
  {
    id: 'structural', name: 'Structural', code: 'STRUCT',
    description: '',
    active: true,
    children: [
      mkT('t-steel','STEEL', 'Structural Steel'),
      mkT('t-conc', 'CONC',  'Concrete'),
      mkT('t-prec', 'PREC',  'Precast Concrete'),
      mkT('t-rebr', 'REBAR', 'Reinforcing Steel'),
      mkT('t-msry', 'MSRY',  'Masonry'),
      mkT('t-fram', 'FRAM',  'Framing'),
      mkT('t-carp', 'CARP',  'Carpentry'),
    ],
  },
  {
    id: 'envelope', name: 'Building Envelope', code: 'ENVLP',
    description: '',
    active: true,
    children: [
      mkT('t-roof', 'ROOF',  'Roofing'),
      mkT('t-wtpf', 'WTPF',  'Waterproofing'),
      mkT('t-clad', 'CLAD',  'Facade / Cladding'),
      mkT('t-curt', 'CURT',  'Curtain Wall'),
      mkT('t-glaz', 'GLAZ',  'Windows & Glazing'),
      mkT('t-door', 'DOOR',  'Doors & Hardware'),
      mkT('t-insl', 'INSUL', 'Insulation'),
    ],
  },
  {
    id: 'interior-finishes', name: 'Interior Finishes', code: 'INTFN',
    description: '',
    active: true,
    children: [
      mkT('t-dryw', 'DRYW',  'Drywall / Partitions'),
      mkT('t-ceil', 'CEIL',  'Ceiling Systems'),
      mkT('t-flor', 'FLOOR', 'Flooring'),
      mkT('t-pnt',  'PAINT', 'Painting & Coatings'),
      mkT('t-fin',  'FINSH', 'Finishes'),
      mkT('t-mill', 'MILL',  'Millwork / Casework'),
    ],
  },
  {
    id: 'mechanical', name: 'Mechanical & HVAC', code: 'MECH',
    description: '',
    active: true,
    children: [
      mkT('t-hvac', 'HVAC', 'HVAC'),
      mkT('t-mech', 'MECH', 'Mechanical'),
      mkT('t-refr', 'REFR', 'Refrigeration'),
      mkT('t-duct', 'DUCT', 'Ductwork'),
      mkT('t-bas',  'BAS',  'Building Automation'),
    ],
  },
  {
    id: 'electrical', name: 'Electrical', code: 'ELEC',
    description: '',
    active: true,
    children: [
      mkT('t-elec', 'ELEC',  'Electrical'),
      mkT('t-powr', 'POWR',  'Power Distribution'),
      mkT('t-lght', 'LIGHT', 'Lighting'),
      mkT('t-lvlt', 'LVLT',  'Low Voltage'),
      mkT('t-falm', 'FALM',  'Fire Alarm'),
      mkT('t-sec',  'SEC',   'Security Systems'),
      mkT('t-comm', 'COMM',  'Communications / Data'),
    ],
  },
  {
    id: 'plumbing-fire', name: 'Plumbing & Fire Protection', code: 'PLBFR',
    description: '',
    active: true,
    children: [
      mkT('t-plmb', 'PLMB', 'Plumbing'),
      mkT('t-pipe', 'PIPE', 'Piping'),
      mkT('t-gas',  'GAS',  'Gas Systems'),
      mkT('t-fire', 'FIRE', 'Fire Protection / Sprinklers'),
    ],
  },
  {
    id: 'vertical-transport', name: 'Vertical Transport', code: 'VTRAN',
    description: '',
    active: true,
    children: [
      mkT('t-elev', 'ELEV', 'Elevators & Escalators'),
    ],
  },
  {
    id: 'specialty', name: 'Specialty Systems', code: 'SPEC',
    description: '',
    active: true,
    children: [
      mkT('t-ktch', 'KITCH', 'Kitchen Equipment'),
      mkT('t-med',  'MED',   'Medical Equipment'),
      mkT('t-lab',  'LAB',   'Laboratory Equipment'),
      mkT('t-acst', 'ACST',  'Acoustics'),
      mkT('t-sign', 'SIGN',  'Signage'),
      mkT('t-wste', 'WASTE', 'Waste Management'),
    ],
  },
  {
    id: 'hsq', name: 'Health, Safety & Quality', code: 'HSQ',
    description: '',
    active: true,
    children: [
      mkT('t-safe', 'SAFE', 'Safety'),
      mkT('t-qa',   'QAQC', 'Quality / QAQC'),
      mkT('t-insp', 'INSP', 'Inspection'),
      mkT('t-cmsn', 'CMSN', 'Commissioning'),
    ],
  },
  {
    id: 'professional', name: 'Professional Services', code: 'PROF',
    description: '',
    active: true,
    children: [
      mkT('t-bim',    'BIM',    'BIM / VDC'),
      mkT('t-arch',   'ARCH',   'Design / Architecture'),
      mkT('t-seng',   'SENG',   'Structural Engineering'),
      mkT('t-mepeng', 'MEPENG', 'MEP Engineering'),
      mkT('t-env',    'ENV',    'Environmental'),
      mkT('t-sust',   'SUST',   'Sustainability / LEED'),
      mkT('t-fac',    'FAC',    'Facilities / Operations'),
    ],
  },
];

// ─── Drop-target finder ───────────────────────────────────────────────────────
function findDropTarget(x: number, y: number, dragItem: DragItem): DropTarget | null {
  const els = document.elementsFromPoint(x, y);
  for (const el of els) {
    let rowEl: Element | null = el;
    while (rowEl && !rowEl.hasAttribute('data-dt-row-type')) rowEl = rowEl.parentElement;
    if (!rowEl) continue;
    const rowType = rowEl.getAttribute('data-dt-row-type') as 'group' | 'child' | 'disc-group' | null;
    const rowId   = rowEl.getAttribute('data-dt-row-id');
    const gId     = rowEl.getAttribute('data-dt-group-id') || rowId;
    if (!rowType || !rowId || !gId) continue;
    const rect = rowEl.getBoundingClientRect();
    const pos: 'before' | 'after' = y < rect.top + rect.height / 2 ? 'before' : 'after';

    if (dragItem.type === 'group') {
      if (rowType !== 'group') return null;
      if (rowId === dragItem.groupId) return null;
      return { type: 'group', groupId: rowId, pos };
    }
    if (dragItem.type === 'child') {
      if (rowType === 'disc-group') return { type: 'disc-group-end', discId: rowId };
      if (rowType === 'group')      return { type: 'group-end', groupId: rowId };
      if (rowType === 'child') {
        if (rowId === dragItem.childId) return null;
        return { type: 'child', groupId: gId, childId: rowId, pos };
      }
    }
    return null;
  }
  return null;
}

// ─── Search highlight ─────────────────────────────────────────────────────────
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lo = text.toLowerCase(), lq = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let last = 0, idx = lo.indexOf(lq, last);
  while (idx !== -1) {
    if (idx > last) parts.push(text.slice(last, idx));
    parts.push(<span key={idx} style={{ background: '#FCFE58' }}>{text.slice(idx, idx + query.length)}</span>);
    last = idx + query.length;
    idx = lo.indexOf(lq, last);
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function computeEditErrors(groups: DisciplineGroup[]): Map<string, string> {
  const errors = new Map<string, string>();
  const allNames = new Map<string, string[]>();
  const allCodes = new Map<string, string[]>();

  for (const g of groups) {
    const gn = g.name.trim().toLowerCase(), gc = g.code.trim().toLowerCase();
    if (gn) allNames.set(gn, [...(allNames.get(gn) ?? []), g.id]);
    if (gc) allCodes.set(gc, [...(allCodes.get(gc) ?? []), g.id]);
    for (const c of g.children) {
      const cn = c.name.trim().toLowerCase(), cc = c.code.trim().toLowerCase();
      const k = `c_${g.id}_${c.id}`;
      if (cn) allNames.set(cn, [...(allNames.get(cn) ?? []), k]);
      if (cc) allCodes.set(cc, [...(allCodes.get(cc) ?? []), k]);
    }
  }

  for (const g of groups) {
    if (!g.name.trim()) errors.set(`g_${g.id}_name`, 'Name is required');
    else if ((allNames.get(g.name.trim().toLowerCase()) ?? []).length > 1)
      errors.set(`g_${g.id}_name`, `"${g.name.trim()}" is already used`);
    if (!g.code.trim()) errors.set(`g_${g.id}_code`, 'Code is required');
    else if ((allCodes.get(g.code.trim().toLowerCase()) ?? []).length > 1)
      errors.set(`g_${g.id}_code`, `"${g.code.trim()}" is already used`);

    for (const c of g.children) {
      const nt = c.name.trim(), ct = c.code.trim();
      if (!nt) errors.set(`c_${g.id}_${c.id}_name`, 'Name is required');
      else if (nt.length < 2) errors.set(`c_${g.id}_${c.id}_name`, 'Must be at least 2 characters');
      else if ((allNames.get(nt.toLowerCase()) ?? []).length > 1)
        errors.set(`c_${g.id}_${c.id}_name`, `"${c.name.trim()}" is already used`);
      if (!ct) errors.set(`c_${g.id}_${c.id}_code`, 'Code is required');
      else if ((allCodes.get(ct.toLowerCase()) ?? []).length > 1)
        errors.set(`c_${g.id}_${c.id}_code`, `"${c.code.trim()}" is already used`);
    }
  }
  return errors;
}

// ─── Column constants ─────────────────────────────────────────────────────────
const COL_DRAG       = 28;
const COL_NAME       = 480;
const COL_CODE       = 120;
const COL_TYPE       = 110;
const COL_NOTE       = 220;
const COL_ACTIONS    = 44;
const HEADER_H       = 44;
const ROW_H          = 48;
const EDIT_ROW_H_BASE  = 48;
const EDIT_ROW_H_ERROR = 62;
const CHILD_INDENT   = 48;

// ─── Icons ────────────────────────────────────────────────────────────────────
function GripDotsIcon({ color = '#9CA4AE' }: { color?: string }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      {[2, 6, 10, 14].flatMap(cy => [3, 7].map(cx => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill={color} />))}
    </svg>
  );
}
function SortArrows({ dir }: { dir: DtSortDir | null }) {
  const up = dir === 'asc' ? '#4D7CFE' : '#C4CAD1';
  const dn = dir === 'desc' ? '#4D7CFE' : '#C4CAD1';
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
      <path d="M5.5 7V1"          stroke={up} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 4L5.5 1L9 4"    stroke={up} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 7V13"         stroke={dn} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 10L5.5 13L9 10" stroke={dn} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ImportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6.75 2.75H0.75V20.75H18.75V9.75" stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M9.75 12.75L9.75 8.75C9.75 4.33172 13.3317 0.750001 17.75 0.75L20.75 0.75" stroke="#616D79" strokeWidth="1.5" />
      <path d="M13.75 9.75L9.75 13.75L5.75 9.75" stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9.75 2.53H0.75V20.53H18.75V11.53" stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M16.75 8.53L20.75 4.53L16.75 0.53" stroke="#616D79" strokeWidth="1.5" />
      <path d="M19.75 4.53H15.75C11.33 4.53 7.75 8.11 7.75 12.53V15.53" stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}
function TrashIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14.6239 16.875" fill="none">
      <path d={trashPaths.pc0b2e00} fill={color} />
    </svg>
  );
}
function AddSiblingIcon() {
  return (
    null
  );
}
function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      {expanded
        ? <path d={chevronDownPaths.p1d4b7280}  fill="#384857" transform="rotate(180 9 9)" />
        : <path d={chevronRightPaths.p1d644480} fill="#384857" transform="rotate(180 9 9)" />
      }
    </svg>
  );
}

// ─── Resize handle ────────────────────────────────────────────────────────────
function ColResizeHandle({ colKey, onDelta, cellHovered }: { colKey: string; onDelta: (k: string, d: number) => void; cellHovered: boolean }) {
  const [active, setActive] = useState(false);
  const [handleHov, setHandleHov] = useState(false);
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation(); setActive(true);
    let lastX = e.clientX;
    const onMove = (me: MouseEvent) => { onDelta(colKey, me.clientX - lastX); lastX = me.clientX; };
    const onUp = () => { setActive(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  };
  const lineColor = active || handleHov ? '#4D7CFE' : cellHovered ? '#9CA4AE' : 'transparent';
  return (
    <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 7, cursor: 'col-resize', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onMouseDown={onMouseDown} onMouseEnter={() => setHandleHov(true)} onMouseLeave={() => setHandleHov(false)}
      onClick={e => e.stopPropagation()} draggable={false} onDragStart={e => e.preventDefault()}>
      <div style={{ height: HEADER_H, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── Header cell ──────────────────────────────────────────────────────────────
function DtHeaderCell({ label, sortKey, sortState, onSort, style, align = 'left', editMode = false, colKey, onDelta }: {
  label: React.ReactNode; sortKey: DtSortKey | null; sortState: DtSortState | null;
  onSort: () => void; style?: React.CSSProperties; align?: 'left' | 'center'; editMode?: boolean;
  colKey?: string; onDelta?: (k: string, d: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = !editMode && !!sortKey && sortState?.key === sortKey;
  const clickable = !editMode && !!sortKey;
  const showResize = !!colKey && !!onDelta;
  return (
    <div
      style={{ ...style, position: 'relative', display: 'flex', alignItems: 'center', height: '100%', justifyContent: align === 'center' ? 'center' : 'flex-start',
        paddingLeft: 8, paddingRight: showResize ? 10 : 8, overflow: 'clip',
        cursor: clickable ? 'pointer' : 'default', userSelect: 'none', flexShrink: 0,
        background: hovered ? '#EEEFF1' : '#FAFAFA', transition: 'background 0.1s' }}
      onClick={clickable ? onSort : undefined}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: align === 'left' ? 1 : undefined }}>
        {label}
      </span>
      {!editMode && sortKey && (
        <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, marginLeft: 4, opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>
          <SortArrows dir={isActive ? sortState!.dir : null} />
        </span>
      )}
      {showResize && <ColResizeHandle colKey={colKey!} onDelta={onDelta!} cellHovered={hovered} />}
    </div>
  );
}

// ─── EditInput ────────────────────────────────────────────────────────────────
function EditInput({ value, onChange, placeholder, error, errorMessage }: {
  value: string; onChange: (v: string) => void; placeholder?: string; error?: boolean; errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const borderColor = error ? (focused ? '#FF4D4F' : '#FFA39E') : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');
  return (
    <div style={{ flex: 1, minWidth: 0, position: 'relative', height: 32 }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <input type="text" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', height: 32, paddingLeft: 8, paddingRight: error ? 28 : 8, border: `1px solid ${borderColor}`, borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#344054',
          background: error ? '#FFF1F0' : '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s, background 0.15s' }} />
      {error && (
        <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
      {error && errorMessage && (
        <div style={{ position: 'absolute', top: 34, left: 0, right: 0, zIndex: 10, fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#FF4D4F', lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pointerEvents: 'none' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

// ─── Discipline Dropdown (edit mode — reassign trade to a different discipline) ──
function DisciplineDropdown({ value, allGroups, onChange }: { value: string | null; allGroups: DisciplineGroup[]; onChange: (id: string | null) => void }) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  const selected = allGroups.find(g => g.id === value) ?? null;
  const filtered = useMemo(() => {
    if (!query || query.length < 2) return allGroups;
    const q = query.toLowerCase();
    return allGroups.filter(g => g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q));
  }, [query, allGroups]);

  function openDropdown() {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setMenuPos({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: r.width });
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  }
  function close() { setOpen(false); setQuery(''); }

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
          !(e.target as HTMLElement).closest('[data-dt-disc-dd]')) close();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <>
      <div ref={triggerRef} onClick={open ? close : openDropdown}
        style={{ flex: 1, minWidth: 0, height: 32, display: 'flex', alignItems: 'center', gap: 6,
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`, borderRadius: 4, background: '#FFFFFF',
          cursor: 'pointer', padding: '0 8px', overflow: 'hidden', transition: 'border-color 0.15s' }}>
        {open ? (
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            onClick={e => e.stopPropagation()} placeholder="Search disciplines…"
            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#344054', background: 'transparent', minWidth: 0 }} />
        ) : (
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: selected ? '#344054' : '#9EA3A9' }}>
            {selected ? selected.name : 'Select discipline…'}
          </span>
        )}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M1 1l4 4 4-4" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && ReactDOM.createPortal(
        <div data-dt-disc-dd
          style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, width: Math.max(menuPos.width, 200), maxHeight: 320, overflowY: 'auto',
            background: '#FFFFFF', borderRadius: 4, zIndex: 9999,
            boxShadow: '0 9px 28px 8px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12)', padding: '4px 0' }}>
          {filtered.map(g => {
            const isSel = value === g.id;
            return (
              <div key={g.id} onClick={() => { onChange(g.id); close(); }}
                style={{ height: 36, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: isSel ? 9 : 12, paddingRight: 12, cursor: 'pointer',
                  background: isSel ? '#E6F7FF' : 'transparent', borderLeft: isSel ? '3px solid #1890FF' : '3px solid transparent', transition: 'background 0.1s' }}
                onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: isSel ? 600 : 400, color: isSel ? '#1D2939' : '#384857' }}>
                  {g.name}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#8C8C8C', background: '#F0F0F0', borderRadius: 2, padding: '1px 5px', flexShrink: 0 }}>{g.code}</span>
                {isSel && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5l4 4L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9EA3A9' }}>No results</div>}
        </div>,
        document.body
      )}
    </>
  );
}

// ─── IconBtn ──────────────────────────────────────────────────────────────────
function IconBtn({ onClick, title, children }: { onClick: () => void; title?: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s', padding: 0 }}>
      {children}
    </button>
  );
}

// ─── Add Trade inline button (inside discipline row actions) ──────────────────
function AddTradeBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} title="Add trade to this discipline"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 28, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 8, paddingRight: 8,
        background: hov ? '#FFF0EB' : 'transparent', border: `1px solid ${hov ? '#FF4D00' : '#D0D5DD'}`,
        borderRadius: 4, cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s', flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v10M1 6h10" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: '#FF4D00', whiteSpace: 'nowrap' }}>Add Trade</span>
    </button>
  );
}

// ─── DragHandle ───────────────────────────────────────────────────────────────
function DragHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseDown={onMouseDown} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: COL_DRAG, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', userSelect: 'none', opacity: hov ? 1 : 0.35, transition: 'opacity 0.15s' }}>
      <GripDotsIcon color={hov ? '#384857' : '#9CA4AE'} />
    </div>
  );
}

// ─── Drag preview ─────────────────────────────────────────────────────────────
function DragPreview({ x, y, item }: { x: number; y: number; item: DragItem }) {
  const isGroup = item.type === 'group';
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', left: 0, top: 0, transform: `translate(${x + 18}px, ${y - 22}px)`, pointerEvents: 'none', zIndex: 9999, background: 'white', border: '1px solid #D0D5DD', borderLeft: `4px solid ${isGroup ? '#FF4D00' : '#243746'}`, borderRadius: 4, padding: '0 12px', height: 44, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 8, maxWidth: 320, overflow: 'hidden', opacity: 0.96, userSelect: 'none' }}>
      <GripDotsIcon color="#9CA4AE" />
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#1D2939', fontWeight: isGroup ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, background: isGroup ? '#FFEDE4' : '#F0F2F5', color: isGroup ? '#FF4D00' : '#384857', borderRadius: 2, padding: '1px 5px', flexShrink: 0, fontWeight: 500 }}>
        {isGroup ? 'Discipline' : 'Trade'}
      </span>
    </div>,
    document.body
  );
}

// ─── Validation banner ────────────────────────────────────────────────────────
function ValidationBanner({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 36, flexShrink: 0, background: '#FFF1F0', borderBottom: '1px solid #FFA39E' }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#B91C1C' }}>
        {count} validation {count === 1 ? 'error' : 'errors'} — hover highlighted fields for details. Fix all errors before saving.
      </span>
    </div>
  );
}

// ─── Toolbar button helpers ───────────────────────────────────────────────────
function SecBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${hov && !disabled ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, background: hov && !disabled ? '#E5E7E9' : '#F2F3F4', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: disabled ? '#BFBFBF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
}
function PriBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 6, border: 'none', borderRadius: 4, background: hov ? '#FF773E' : '#FF4D00', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      {children}
    </button>
  );
}
// ─── Secondary XS button (28px height — §15.2 Secondary, XS size) ────────────
function SecBtnXS({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 28, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 4, border: `1px solid ${hov && !disabled ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, background: hov && !disabled ? '#E5E7E9' : '#F2F3F4', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: disabled ? '#BFBFBF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', flexShrink: 0 }}>
      {children}
    </button>
  );
}
function ToolbarBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={disabled ? undefined : onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5, border: '1px solid transparent', borderRadius: 4, background: hov && !disabled ? '#F0F0F0' : 'transparent', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: disabled ? '#BFBFBF' : '#384857', whiteSpace: 'nowrap', transition: 'background 0.15s', opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}
function TerBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{ height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, border: 'none', borderRadius: 4, background: pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: pressed ? '#FFFFFF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s' }}>
      {children}
    </button>
  );
}
function RestoreDefaultLink({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: 'none', border: 'none', padding: '0 4px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', textDecoration: hov ? 'underline' : 'none', whiteSpace: 'nowrap', transition: 'text-decoration 0.15s' }}>
      Restore Defaults
    </button>
  );
}

// ─── Restore confirm modal ────────────────────────────────────────────────────
function RestoreConfirmModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 420, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>Restore Defaults</p>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, padding: 8 }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div style={{ height: 1, background: '#F0F0F0' }} />
        </div>
        <div style={{ padding: '24px 28px 0', display: 'flex', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3L18.5 18H1.5L10 3Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 9V12" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="15" r="0.75" fill="#D92D20" /></svg>
          </div>
          <div>
            <p style={{ margin: '0 0 6px', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38' }}>Reset all disciplines and trades?</p>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#616D79', lineHeight: '20px' }}>This will replace your current data with the default disciplines and trades. Custom changes will be lost.</p>
          </div>
        </div>
        <div style={{ flexShrink: 0, marginTop: 24 }}>
          <div style={{ height: 1, background: '#C3C7CC' }} />
          <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 10 }}>
            <SecBtn onClick={onClose}>Cancel</SecBtn>
            <button onClick={onConfirm} style={{ height: 36, padding: '0 16px', background: '#D92D20', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#B42318')} onMouseLeave={e => (e.currentTarget.style.background = '#D92D20')}>
              Restore defaults
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function DisciplineTable() {
  // ── Data ──────────────────────────────────────────────────────────────────
  const [liveData,  setLiveData]  = useState<DisciplineGroup[]>(DISCIPLINE_DATA);

  // ── View state ────────────────────────────────────────────────────────────
  const [search,    setSearch]    = useState('');
  const [sortState, setSortState] = useState<DtSortState | null>(null);
  const [expanded,  setExpanded]  = useState<Set<string>>(() => new Set(DISCIPLINE_DATA.map(g => g.id)));
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    DISCIPLINE_DATA.forEach(g => { m[g.id] = g.active; g.children.forEach(c => { m[c.id] = c.active; }); });
    return m;
  });
  const [groupByDisc, setGroupByDisc] = useState(true);
  const [clearHover, setClearHover] = useState(false);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  // ── Edit state ────────────────────────────────────────────────────────────
  const [editMode,   setEditMode]   = useState(false);
  const [editGroups, setEditGroups] = useState<DisciplineGroup[]>([]);
  const [validationAttempted, setValidationAttempted] = useState(false);

  // ── Scroll ref ────────────────────────────────────────────────────────────
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // ── Drag state ─────────────────────────────────────────────────────────────
  const dragItemRef    = useRef<DragItem | null>(null);
  const dropTargetRef  = useRef<DropTarget | null>(null);
  const editGroupsRef  = useRef(editGroups);
  const liveDataRef    = useRef(liveData);
  const editModeRef    = useRef(editMode);
  const expandedRef    = useRef(expanded);
  const prevExpandedRef = useRef<Set<string> | null>(null);
  const rafRef         = useRef<number | null>(null);

  useEffect(() => { editGroupsRef.current = editGroups; }, [editGroups]);
  useEffect(() => { liveDataRef.current   = liveData;   }, [liveData]);
  useEffect(() => { editModeRef.current   = editMode;   }, [editMode]);
  useEffect(() => { expandedRef.current   = expanded;   }, [expanded]);

  const [isDragging,   setIsDragging]   = useState(false);
  const [draggingId,   setDraggingId]   = useState<string | null>(null);
  const [previewPos,   setPreviewPos]   = useState({ x: 0, y: 0 });
  const [dropTarget,   setDropTarget]   = useState<DropTarget | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : '';
    return () => { document.body.style.cursor = ''; };
  }, [isDragging]);

  // ── Perform drop ──────────────────────────────────────────────────────────
  function performDrop(target: DropTarget) {
    const item   = dragItemRef.current!;
    const isEdit = editModeRef.current;
    const data: DisciplineGroup[] = JSON.parse(JSON.stringify(isEdit ? editGroupsRef.current : liveDataRef.current));

    if (item.type === 'group' && target.type === 'group') {
      const fromIdx = data.findIndex(g => g.id === item.groupId);
      const [removed] = data.splice(fromIdx, 1);
      const toIdx = data.findIndex(g => g.id === target.groupId);
      data.splice(target.pos === 'before' ? toIdx : toIdx + 1, 0, removed);
      prevExpandedRef.current = null;
      if (isEdit) setEditGroups(data); else setLiveData(data);
      return;
    }

    if (item.type === 'child') {
      if (target.type === 'disc-group-end') {
        let removed: TradeEntry | null = null;
        for (const g of data) {
          const idx = g.children.findIndex(c => c.id === item.childId);
          if (idx >= 0) { [removed] = g.children.splice(idx, 1); break; }
        }
        if (!removed) return;
        const targetGroup = data.find(g => g.id === target.discId);
        if (targetGroup) targetGroup.children.push(removed);
        setExpanded(prev => new Set([...prev, target.discId]));
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }
      if (target.type === 'group-end') {
        let removed: TradeEntry | null = null;
        for (const g of data) {
          const idx = g.children.findIndex(c => c.id === item.childId);
          if (idx >= 0) { [removed] = g.children.splice(idx, 1); break; }
        }
        if (!removed) return;
        const tg = data.find(g => g.id === target.groupId);
        if (tg) tg.children.push(removed);
        setExpanded(prev => new Set([...prev, target.groupId]));
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }
      if (target.type === 'child') {
        let removed: TradeEntry | null = null;
        for (const g of data) {
          const idx = g.children.findIndex(c => c.id === item.childId);
          if (idx >= 0) { [removed] = g.children.splice(idx, 1); break; }
        }
        if (!removed) return;
        for (const g of data) {
          if (g.id === target.groupId) {
            const toIdx = g.children.findIndex(c => c.id === target.childId);
            g.children.splice(target.pos === 'before' ? toIdx : toIdx + 1, 0, removed);
            break;
          }
        }
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }
    }
  }

  // ── Mouse down on drag handle ─────────────────────────────────────────────
  function onHandleMouseDown(e: React.MouseEvent, item: DragItem) {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startY = e.clientY;
    let started = false;

    const onMove = (me: MouseEvent) => {
      if (!started) {
        const d = Math.hypot(me.clientX - startX, me.clientY - startY);
        if (d < 5) return;
        started = true;
        setIsDragging(true);
        setDraggingId(item.type === 'group' ? item.groupId : item.childId);
        if (item.type === 'group') { prevExpandedRef.current = new Set(expandedRef.current); setExpanded(new Set()); }
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPreviewPos({ x: me.clientX, y: me.clientY });
        const target = findDropTarget(me.clientX, me.clientY, item);
        dropTargetRef.current = target;
        setDropTarget(target);
      });
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (started && dropTargetRef.current) performDrop(dropTargetRef.current);
      else if (started && item.type === 'group' && prevExpandedRef.current) {
        setExpanded(prevExpandedRef.current); prevExpandedRef.current = null;
      }
      dragItemRef.current = null; dropTargetRef.current = null;
      setIsDragging(false); setDraggingId(null); setDropTarget(null);
    };

    dragItemRef.current = item;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  // ── Drop indicators ───────────────────────────────────────────────────────
  function groupIndicator(groupId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'group' && dropTarget.groupId === groupId)
      return { boxShadow: dropTarget.pos === 'before' ? 'inset 0 2px 0 0 #4D7CFE' : 'inset 0 -2px 0 0 #4D7CFE' };
    if (dropTarget.type === 'group-end' && dropTarget.groupId === groupId)
      return { boxShadow: 'inset 0 0 0 2px #4D7CFE', background: '#EBF3FF' };
    if (dropTarget.type === 'disc-group-end' && dropTarget.discId === groupId)
      return { boxShadow: 'inset 0 0 0 2px #1890FF', background: '#E6F7FF' };
    return {};
  }
  function childIndicator(childId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'child' && dropTarget.childId === childId)
      return { boxShadow: dropTarget.pos === 'before' ? 'inset 0 2px 0 0 #4D7CFE' : 'inset 0 -2px 0 0 #4D7CFE' };
    return {};
  }

  // ── Enter / exit edit mode ────────────────────────────────────────────────
  function enterEditMode() {
    setEditGroups(JSON.parse(JSON.stringify(liveData)));
    setValidationAttempted(false);
    setExpanded(new Set(liveData.map(g => g.id)));
    setEditMode(true);
  }
  function cancelEdit() {
    setValidationAttempted(false);
    setEditMode(false); setEditGroups([]);
    setExpanded(new Set(liveData.map(g => g.id)));
  }
  function restoreDefaults() {
    setEditGroups(JSON.parse(JSON.stringify(DISCIPLINE_DATA)));
    setExpanded(new Set(DISCIPLINE_DATA.map(g => g.id)));
    setRestoreOpen(false);
  }
  function saveEdit() {
    setValidationAttempted(true);
    if (computeEditErrors(editGroups).size > 0) return;
    setLiveData(editGroups);
    setActiveMap(prev => {
      const next = { ...prev };
      editGroups.forEach(g => {
        if (!(g.id in next)) next[g.id] = true;
        g.children.forEach(c => { if (!(c.id in next)) next[c.id] = true; });
      });
      return next;
    });
    setExpanded(new Set(editGroups.map(g => g.id)));
    setEditMode(false); setEditGroups([]);
  }

  // ── Edit helpers ──────────────────────────────────────────────────────────
  function updG(gId: string, f: 'name' | 'code' | 'description', v: string) {
    setEditGroups(p => p.map(g => g.id === gId ? { ...g, [f]: v } : g));
  }
  function updC(gId: string, cId: string, f: 'name' | 'code' | 'description', v: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.map(c => c.id === cId ? { ...c, [f]: v } : c) }));
  }
  function updCDisc(fromGId: string, cId: string, toGId: string) {
    setEditGroups(p => {
      const next = JSON.parse(JSON.stringify(p)) as DisciplineGroup[];
      let child: TradeEntry | null = null;
      for (const g of next) {
        if (g.id !== fromGId) continue;
        const idx = g.children.findIndex(c => c.id === cId);
        if (idx < 0) continue;
        [child] = g.children.splice(idx, 1);
        break;
      }
      if (!child) return next;
      const tg = next.find(g => g.id === toGId);
      if (tg) tg.children.push(child);
      return next;
    });
    setExpanded(prev => new Set([...prev, toGId]));
  }
  function delGroup(gId: string) {
    setEditGroups(p => p.filter(g => g.id !== gId));
  }
  function delChild(gId: string, cId: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.filter(c => c.id !== cId) }));
  }
  function addChildToGroup(gId: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: [...g.children, { id: uid(), name: '', code: '', description: '', active: true, disciplineId: gId }] }));
    setExpanded(p => new Set([...p, gId]));
    setTimeout(() => {
      if (tableScrollRef.current) {
        const rows = tableScrollRef.current.querySelectorAll('[data-dt-row-type="child"]');
        if (rows.length) rows[rows.length - 1].scrollIntoView({ block: 'nearest' });
      }
    }, 50);
  }
  function addNewDiscipline() {
    const newId = uid();
    setEditGroups(p => [...p, { id: newId, name: '', code: '', description: '', active: true, children: [] }]);
    setExpanded(p => new Set([...p, newId]));
    setTimeout(() => { if (tableScrollRef.current) tableScrollRef.current.scrollTop = tableScrollRef.current.scrollHeight; }, 50);
  }
  function addDisciplineSiblingAfter(gId: string) {
    const newId = uid();
    setEditGroups(p => {
      const idx = p.findIndex(g => g.id === gId);
      if (idx < 0) return [...p, { id: newId, name: '', code: '', description: '', active: true, children: [] }];
      const next = [...p];
      next.splice(idx + 1, 0, { id: newId, name: '', code: '', description: '', active: true, children: [] });
      return next;
    });
    setExpanded(p => new Set([...p, newId]));
  }
  function addTradeSiblingAfter(gId: string, cId: string) {
    const newId = uid();
    setEditGroups(p => p.map(g => {
      if (g.id !== gId) return g;
      const idx = g.children.findIndex(c => c.id === cId);
      const next = [...g.children];
      next.splice(idx < 0 ? next.length : idx + 1, 0, { id: newId, name: '', code: '', description: '', active: true, disciplineId: gId });
      return { ...g, children: next };
    }));
    setExpanded(p => new Set([...p, gId]));
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  function handleSort(key: DtSortKey) {
    setSortState(p => (!p || p.key !== key) ? { key, dir: 'asc' } : p.dir === 'asc' ? { key, dir: 'desc' } : null);
  }

  // ── Expand / Collapse ─────────────────────────────────────────────────────
  function toggleExpanded(id: string) { setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function expandAll()   { setExpanded(new Set((editMode ? editGroups : liveData).map(g => g.id))); }
  function collapseAll() { setExpanded(new Set()); }

  // ── Filtered + sorted data ────────────────────────────────────────────────
  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';

  const viewGroups = useMemo(() => {
    let groups = liveData.map(g => {
      const gM = g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q);
      const mc = q ? g.children.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) : g.children;
      if (!q) return { ...g, matchedChildren: mc };
      if (gM || mc.length > 0) return { ...g, matchedChildren: mc };
      return null;
    }).filter(Boolean) as (DisciplineGroup & { matchedChildren: TradeEntry[] })[];

    if (sortState) {
      const { key, dir } = sortState; const mul = dir === 'asc' ? 1 : -1;
      groups = [...groups].sort((a, b) => {
        const av = key === 'name' ? a.name : a.code;
        const bv = key === 'name' ? b.name : b.code;
        return av.localeCompare(bv) * mul;
      });
    }
    return groups;
  }, [q, sortState, activeMap, liveData]);

  // Flat view (groupByDisc=OFF): one row per trade, each carrying its parent discipline
  type FlatRow = { kind: 'trade'; c: TradeEntry; g: DisciplineGroup };

  const flatView = useMemo((): FlatRow[] => {
    const rows: FlatRow[] = [];
    for (const g of liveData) {
      const gMatch = !q || g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q);
      const cMatches = q
        ? g.children.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q) ||
            gMatch
          )
        : g.children;
      for (const c of cMatches) rows.push({ kind: 'trade', c, g });
    }
    if (!sortState) return rows;
    const { key, dir } = sortState;
    const mul = dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av =
        key === 'discName'  ? a.g.name :
        key === 'discCode'  ? a.g.code :
        key === 'tradeName' ? a.c.name :
        key === 'tradeCode' ? a.c.code :
        a.c.name;
      const bv =
        key === 'discName'  ? b.g.name :
        key === 'discCode'  ? b.g.code :
        key === 'tradeName' ? b.c.name :
        key === 'tradeCode' ? b.c.code :
        b.c.name;
      return av.localeCompare(bv) * mul;
    });
  }, [liveData, q, sortState]);

  const displayGroups = editMode ? editGroups.map(g => ({ ...g, matchedChildren: g.children })) : viewGroups;
  const editErrors = editMode && validationAttempted ? computeEditErrors(editGroups) : new Map<string, string>();
  const showClear = search.length > 0;

  // ── Render ────────────────────────────────────────────────────────────────
  // Column layout (LBS-style flat tree):
  // VIEW:  [Name: flex-1] [Code: 120px] [Type: 110px]
  // EDIT:  [drag: 28px] [Name: flex-1] [Code: 120px] [Type: 110px] [Actions: 100px]

  // ── Type pill helper ─────────────────────────────────────────────────────
  function TypePill({ type }: { type: 'Discipline' | 'Trade' }) {
    const isDisc = type === 'Discipline';
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        background: isDisc ? '#FFEDE4' : '#F0F2F5',
        color: isDisc ? '#D4380D' : '#616D79',
        borderRadius: 4,
        padding: '2px 8px',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 11, fontWeight: 600,
        whiteSpace: 'nowrap', lineHeight: '16px',
      }}>
        {type}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', background: 'white', overflow: 'hidden', minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8, userSelect: isDragging ? 'none' : undefined }}>

      {isDragging && dragItemRef.current && <DragPreview x={previewPos.x} y={previewPos.y} item={dragItemRef.current} />}

      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>

        {/* LEFT */}
        {!editMode ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 276, flexShrink: 0 }}>
              <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}><SearchIcon /></div>
              <input type="text" placeholder="Search disciplines & trades" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')} />
              {showClear && (
                <button onClick={() => setSearch('')} onMouseEnter={() => setClearHover(true)} onMouseLeave={() => setClearHover(false)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHover ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            {/* Group by Discipline toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer' }}
              onClick={() => { setGroupByDisc(prev => !prev); setExpanded(new Set(liveData.map(g => g.id))); setSortState(null); }}>
              <div style={{ width: 40, height: 20, borderRadius: 10, background: groupByDisc ? '#243746' : '#D9D9D9', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 2, left: groupByDisc ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
              </div>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', userSelect: 'none' }}>Group by Discipline</span>
            </div>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            <ToolbarBtn onClick={expandAll} disabled={!groupByDisc}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor"/></svg>
              <span>Expand All</span>
            </ToolbarBtn>
            <ToolbarBtn onClick={collapseAll} disabled={!groupByDisc}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor"/></svg>
              <span>Collapse All</span>
            </ToolbarBtn>
          </div>
        ) : (
          /* Edit mode LEFT — Add Discipline + Expand/Collapse */
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SecBtn onClick={addNewDiscipline}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" /></svg>
              <span>Add Discipline</span>
            </SecBtn>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            <ToolbarBtn onClick={expandAll}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor"/></svg><span>Expand All</span></ToolbarBtn>
            <ToolbarBtn onClick={collapseAll}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor"/></svg><span>Collapse All</span></ToolbarBtn>
          </div>
        )}

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editMode ? (
            <>
              <RestoreDefaultLink onClick={() => setRestoreOpen(true)} />
              <TerBtn onClick={cancelEdit}>Cancel</TerBtn>
              <SecBtn onClick={() => setImportOpen(true)}><ImportIcon /><span>Import</span></SecBtn>
              <PriBtn onClick={saveEdit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17 21 17 13 7 13 7 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="7 3 7 8 15 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Save Changes</span>
              </PriBtn>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M7.5 1.875v7.5M4.375 6.25L7.5 9.375l3.125-3.125" stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
                  <path d="M1.875 11.25H13.125" stroke="#1890FF" strokeLinecap="round" strokeWidth="1.40625" />
                </svg>
                <button
                  onClick={() => downloadDisciplineTemplate('disciplines')}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 13, color: '#1890FF', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Download Import Template
                </button>
              </div>
              <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
              <SecBtn onClick={() => setExportOpen(true)}><ExportIcon /><span>Export</span></SecBtn>
              <PriBtn onClick={enterEditMode}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Edit</span>
              </PriBtn>
            </>
          )}
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div ref={tableScrollRef} style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          {/* ── Header ─────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
            {editMode && <div style={{ width: COL_DRAG, flexShrink: 0, background: '#FAFAFA' }} />}

            {/* ── Flat-view header (groupByDisc=OFF, view mode only) ── */}
            {!groupByDisc && !editMode ? (
              <>
                <DtHeaderCell
                  label="Discipline Name"
                  sortKey="discName" sortState={sortState} onSort={() => handleSort('discName')}
                  style={{ width: 360, flexShrink: 0 }} editMode={false} />
                <DtHeaderCell
                  label="Trade Name"
                  sortKey="tradeName" sortState={sortState} onSort={() => handleSort('tradeName')}
                  style={{ width: 360, flexShrink: 0 }} editMode={false} />
                <DtHeaderCell
                  label="Discipline Code"
                  sortKey="discCode" sortState={sortState} onSort={() => handleSort('discCode')}
                  style={{ width: 180, flexShrink: 0 }} editMode={false} />
                <DtHeaderCell
                  label="Trade Code"
                  sortKey="tradeCode" sortState={sortState} onSort={() => handleSort('tradeCode')}
                  style={{ width: 180, flexShrink: 0 }} editMode={false} />
                <DtHeaderCell label="Note" sortKey={null} sortState={sortState} onSort={() => {}}
                  style={{ flex: 1, minWidth: COL_NOTE }} editMode={false} />
              </>
            ) : (
              <>
                {/* Name column */}
                <DtHeaderCell
                  label={editMode ? <><span>Discipline / Trade Name</span><span style={{ color: '#FF4D4F', marginLeft: 2 }}>*</span></> : 'Discipline / Trade Name'}
                  sortKey="name" sortState={sortState} onSort={() => handleSort('name')}
                  style={{ width: COL_NAME, flexShrink: 0 }} editMode={editMode} />

                {/* Code column */}
                <DtHeaderCell
                  label={editMode ? <><span>Code</span><span style={{ color: '#FF4D4F', marginLeft: 2 }}>*</span></> : 'Code'}
                  sortKey="code" sortState={sortState} onSort={() => handleSort('code')}
                  style={{ width: COL_CODE, flexShrink: 0 }} editMode={editMode} />

                {/* Type column */}
                <DtHeaderCell label="Type" sortKey={null} sortState={sortState} onSort={() => {}}
                  style={{ width: COL_TYPE, flexShrink: 0 }} align="center" editMode={editMode} />

                {/* Note column — view mode only */}
                {!editMode && (
                  <DtHeaderCell label="Note" sortKey={null} sortState={sortState} onSort={() => {}}
                    style={{ flex: 1, minWidth: COL_NOTE }} editMode={false} />
                )}

                {/* Actions (edit only) — no label, sticky-right */}
                {editMode && (
                  <>
                    <div style={{ flex: 1 }} />
                    <div style={{
                      width: COL_ACTIONS, flexShrink: 0,
                      position: 'sticky', right: 0, zIndex: 21,
                      background: '#FAFAFA',
                    }} />
                  </>
                )}
              </>
            )}
          </div>

          {/* ── Validation banner ───────────────────────────────────── */}
          {editMode && <ValidationBanner count={editErrors.size} />}

          {/* ── VIEW: FLAT LIST (groupByDisc=OFF) ───────────────────── */}
          {!editMode && !groupByDisc && (() => {
            if (flatView.length === 0) return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                No trades match your search.
              </div>
            );
            return flatView.map((row) => {
              const { c, g } = row;
              const discActive  = activeMap[g.id]  ?? g.active;
              const tradeActive = activeMap[c.id]  ?? c.active;
              const isActive = discActive && tradeActive;
              return (
                <div key={`trade-${c.id}`} data-dt-row-type="child" data-dt-row-id={c.id} data-dt-group-id={g.id}
                  style={{ display: 'flex', alignItems: 'stretch', height: ROW_H, background: 'white', borderBottom: '1px solid #D9D9D9', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}>

                  {/* Discipline Name */}
                  <div style={{ width: 360, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: isActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(g.name, search)}
                    </span>
                  </div>

                  {/* Trade Name */}
                  <div style={{ width: 360, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: isActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(c.name, search)}
                    </span>
                  </div>

                  {/* Discipline Code */}
                  <div style={{ width: 180, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, color: isActive ? '#595959' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                      {highlightText(g.code, search)}
                    </span>
                  </div>

                  {/* Trade Code */}
                  <div style={{ width: 180, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: isActive ? '#262626' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                      {highlightText(c.code, search)}
                    </span>
                  </div>

                  {/* Note */}
                  <div style={{ flex: 1, minWidth: COL_NOTE, display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.description ?? ''}
                    </span>
                  </div>
                </div>
              );
            });
          })()}

          {/* ── VIEW: GROUPED TREE (groupByDisc=ON) ─────────────────── */}
          {!editMode && groupByDisc && displayGroups.map(group => {
            const isExpanded  = expanded.has(group.id);
            const groupActive = activeMap[group.id] ?? group.active;
            const matchedChildren = ('matchedChildren' in group ? (group as any).matchedChildren : group.children) as TradeEntry[];
            return (
              <div key={group.id}>
                {/* ── Discipline row ── */}
                <div data-dt-row-type="group" data-dt-row-id={group.id}
                  onClick={() => toggleExpanded(group.id)}
                  style={{ display: 'flex', alignItems: 'stretch', height: ROW_H, background: '#F5F5F5', borderBottom: '1px solid #D9D9D9', cursor: 'pointer', transition: 'background 0.1s', ...groupIndicator(group.id) }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#EEEFF1')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F5F5F5')}>

                  {/* Name — chevron + discipline name + trade count badge */}
                  <div style={{ width: COL_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                    <button onClick={e => { e.stopPropagation(); toggleExpanded(group.id); }}
                      style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: 'pointer' }}>
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, lineHeight: '20px', color: groupActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {highlightText(group.name, search)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#E5E7E9', borderRadius: 9999, padding: '1px 8px', flexShrink: 0, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79', whiteSpace: 'nowrap', lineHeight: '16px' }}>
                      <span style={{ fontWeight: 600 }}>{matchedChildren.length}</span>
                      <span>Trades</span>
                    </span>
                  </div>

                  {/* Code */}
                  <div style={{ width: COL_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, color: groupActive ? '#595959' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                      {highlightText(group.code, search)}
                    </span>
                  </div>

                  {/* Type */}
                  <div style={{ width: COL_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TypePill type="Discipline" />
                  </div>
                  {/* Note */}
                  <div style={{ flex: 1, minWidth: COL_NOTE, display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {group.description ?? ''}
                    </span>
                  </div>
                </div>

                {/* ── Trade child rows ── */}
                {isExpanded && matchedChildren.map((trade: TradeEntry) => {
                  const isActive = activeMap[trade.id] ?? trade.active;
                  return (
                    <div key={trade.id} data-dt-row-type="child" data-dt-row-id={trade.id} data-dt-group-id={group.id}
                      style={{ display: 'flex', alignItems: 'stretch', height: ROW_H, background: 'white', borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s', ...childIndicator(trade.id) }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
                      {/* Name — indented */}
                      <div style={{ width: COL_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12 + CHILD_INDENT, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: isActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {highlightText(trade.name, search)}
                        </span>
                      </div>
                      {/* Code */}
                      <div style={{ width: COL_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: isActive ? '#384857' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                          {highlightText(trade.code, search)}
                        </span>
                      </div>
                      {/* Type */}
                      <div style={{ width: COL_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TypePill type="Trade" />
                      </div>
                      {/* Note */}
                      <div style={{ flex: 1, minWidth: COL_NOTE, display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {trade.description ?? ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {!editMode && groupByDisc && displayGroups.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
              No disciplines or trades match your search.
            </div>
          )}

          {/* ── EDIT MODE ─────────────────────────────────────────────── */}
          {editMode && editGroups.map(group => {
            const isExpanded = expanded.has(group.id);
            const gNameErr = editErrors.get(`g_${group.id}_name`);
            const gCodeErr = editErrors.get(`g_${group.id}_code`);
            const gHasErr = !!gNameErr || !!gCodeErr;
            const gRowH = gHasErr ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
            const gAlign = gHasErr ? 'flex-start' as const : 'center' as const;
            const gPadTop = gHasErr ? 8 : 0;
            return (
              <div key={group.id}>
                {/* ── Discipline row ── */}
                <div data-dt-row-type="group" data-dt-row-id={group.id}
                  style={{ display: 'flex', alignItems: 'stretch', height: gRowH, background: draggingId === group.id ? '#F0F7FF' : '#F5F6F7', borderBottom: '1px solid #EEEFF1', transition: 'background 0.1s', ...groupIndicator(group.id) }}
                  onMouseEnter={() => setHoveredRowId(group.id)} onMouseLeave={() => setHoveredRowId(null)}>
                  <DragHandle onMouseDown={e => onHandleMouseDown(e, { type: 'group', groupId: group.id, label: group.name || 'Untitled Discipline' })} />

                  {/* Name input */}
                  <div style={{ width: COL_NAME, flexShrink: 0, display: 'flex', alignItems: gAlign, paddingTop: gPadTop, paddingLeft: 4, paddingRight: 8, gap: 6, overflow: gNameErr ? 'visible' : 'hidden', position: 'relative', zIndex: gNameErr ? 2 : undefined }}>
                    <button onClick={e => { e.stopPropagation(); toggleExpanded(group.id); }}
                      style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    <EditInput value={group.name} onChange={v => updG(group.id, 'name', v)} placeholder="Discipline name"
                      error={!!gNameErr} errorMessage={gNameErr} />
                  </div>

                  {/* Code input */}
                  <div style={{ width: COL_CODE, flexShrink: 0, display: 'flex', alignItems: gAlign, paddingTop: gPadTop, paddingLeft: 8, paddingRight: 8, overflow: gCodeErr ? 'visible' : 'hidden', position: 'relative', zIndex: gCodeErr ? 2 : undefined }}>
                    <EditInput value={group.code} onChange={v => updG(group.id, 'code', v)} placeholder="DISC"
                      error={!!gCodeErr} errorMessage={gCodeErr} />
                  </div>

                  {/* Type pill — fixed, not editable */}
                  <div style={{ width: COL_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TypePill type="Discipline" />
                  </div>

                  {/* Actions — Trash only, sticky-right */}
                  <div style={{ flex: 1 }} />
                  <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 4, paddingRight: 4, position: 'sticky', right: 0, zIndex: 4, background: 'inherit' }}>
                    <IconBtn onClick={() => delGroup(group.id)} title="Delete discipline"><TrashIcon /></IconBtn>
                  </div>
                </div>

                {/* ── Trade child rows ── */}
                {isExpanded && group.children.map(child => {
                  const isChildHov = !isDragging && hoveredRowId === child.id;
                  const nameErr = editErrors.get(`c_${group.id}_${child.id}_name`);
                  const codeErr = editErrors.get(`c_${group.id}_${child.id}_code`);
                  const rowHasError = !!nameErr || !!codeErr;
                  const rowH = rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
                  const cellAlign = rowHasError ? 'flex-start' as const : 'center' as const;
                  const cellPadTop = rowHasError ? 8 : 0;
                  return (
                    <div key={child.id} data-dt-row-type="child" data-dt-row-id={child.id} data-dt-group-id={group.id}
                      onMouseEnter={() => setHoveredRowId(child.id)} onMouseLeave={() => setHoveredRowId(null)}
                      style={{ display: 'flex', alignItems: 'stretch', height: rowH, background: draggingId === child.id ? '#F0F7FF' : isChildHov ? '#F9FAFB' : 'white', borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s', ...childIndicator(child.id) }}>
                      <DragHandle onMouseDown={e => onHandleMouseDown(e, { type: 'child', groupId: group.id, childId: child.id, label: child.name || 'Untitled Trade' })} />

                      {/* Name input — indented */}
                      <div style={{ width: COL_NAME, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: CHILD_INDENT, paddingRight: 8, overflow: nameErr ? 'visible' : 'hidden', position: 'relative', zIndex: nameErr ? 2 : undefined }}>
                        <EditInput value={child.name} onChange={v => updC(group.id, child.id, 'name', v)} placeholder="Trade name"
                          error={!!nameErr} errorMessage={nameErr} />
                      </div>

                      {/* Code input */}
                      <div style={{ width: COL_CODE, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: codeErr ? 'visible' : 'hidden', position: 'relative', zIndex: codeErr ? 2 : undefined }}>
                        <EditInput value={child.code} onChange={v => updC(group.id, child.id, 'code', v)} placeholder="CODE"
                          error={!!codeErr} errorMessage={codeErr} />
                      </div>

                      {/* Type pill — fixed */}
                      <div style={{ width: COL_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TypePill type="Trade" />
                      </div>

                      {/* Actions — Trash only, sticky-right */}
                      <div style={{ flex: 1 }} />
                      <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 4, paddingRight: 4, position: 'sticky', right: 0, zIndex: 4, background: 'inherit' }}>
                        <IconBtn onClick={() => delChild(group.id, child.id)} title="Delete trade"><TrashIcon /></IconBtn>
                      </div>
                    </div>
                  );
                })}

                {/* Inline "Add trade" ghost row */}
                {isExpanded && editMode && (
                  <div style={{ display: 'flex', alignItems: 'center', height: 32, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', cursor: 'pointer', paddingLeft: COL_DRAG + CHILD_INDENT, gap: 6 }}
                    onClick={() => addChildToGroup(group.id)}
                    onMouseEnter={e => (e.currentTarget.style.background = '#E6F7FF')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#FAFAFA')}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#1890FF', fontWeight: 400 }}>Add trade to {group.name || 'discipline'}</span>
                  </div>
                )}
              </div>
            );
          })}

          {editMode && editGroups.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 160, gap: 12 }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>No disciplines yet.</span>
              <SecBtn onClick={addNewDiscipline}>+ Add Discipline</SecBtn>
            </div>
          )}

        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <ImportDisciplineModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={(imported) => {
          setLiveData(imported as DisciplineGroup[]);
          setImportOpen(false);
        }}
      />
      <ExportDisciplineModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        groups={liveData}
      />
      {restoreOpen && <RestoreConfirmModal onConfirm={restoreDefaults} onClose={() => setRestoreOpen(false)} />}
    </div>
  );
}
