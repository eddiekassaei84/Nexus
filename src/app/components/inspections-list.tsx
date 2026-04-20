/**
 * InspectionsList
 *
 * Implements the "MainCanvas Layout" — the same structural pattern used in the
 * Members module (UsersTable). Naming this layout for future reference:
 *
 *  ┌──────────────────────────── flex-row (outer, flex-1) ─────────────────────────┐
 *  │ MainCanvas (flex-1, flex-col)                  SidePanel (flex-shrink-0,      │
 *  │  ├─ Section Header (72px, white, border-bottom) animated 0 → 370px)           │
 *  │  └─ Table zone (flex-1, p-12)                  └─ InspectionDetailPanel       │
 *  │       └─ Table box (rounded-8, border #D9D9D9)                                │
 *  └────────────────────────────────────────────────────────────────────────────────┘
 */

import React, { useState, useCallback, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type InspStatus = 'Open' | 'In Progress' | 'Completed' | 'Overdue' | 'Closed';

export interface Inspection {
  id: number;
  number: string;
  title: string;
  type: string;
  status: InspStatus;
  location: string;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  description: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_INSPECTIONS: Inspection[] = [
  { id: 1,  number: 'INS-001', title: 'Foundation Concrete Pour Inspection',    type: 'Structural',    status: 'Completed', location: 'Zone A – Level B1',  assignedTo: 'Carlos Rivera',   dueDate: '2026-02-10', createdAt: '2026-01-28', description: 'Verify concrete mix, slump, and placement for foundation pour.' },
  { id: 2,  number: 'INS-002', title: 'Electrical Panel Installation Review',  type: 'Electrical',    status: 'Open',      location: 'Zone C – Level 01',  assignedTo: 'Priya Nair',      dueDate: '2026-03-18', createdAt: '2026-02-14', description: 'Check panel labelling, breaker sizing, and grounding connections.' },
  { id: 3,  number: 'INS-003', title: 'Fire Suppression System Test',          type: 'Fire & Safety', status: 'In Progress',location: 'Zone B – Level 03', assignedTo: 'James Liu',       dueDate: '2026-03-20', createdAt: '2026-03-01', description: 'Functional test of sprinkler heads, flow switches, and alarm triggers.' },
  { id: 4,  number: 'INS-004', title: 'Waterproofing Membrane – Roof Deck',    type: 'Building Envelope', status: 'Overdue', location: 'Roof – Level 12', assignedTo: 'Amara Osei',      dueDate: '2026-03-05', createdAt: '2026-02-20', description: 'Inspect membrane laps, drains, and termination details.' },
  { id: 5,  number: 'INS-005', title: 'Structural Steel Connections – Grid F', type: 'Structural',    status: 'Open',      location: 'Zone F – Level 05',  assignedTo: 'Carlos Rivera',   dueDate: '2026-03-25', createdAt: '2026-03-08', description: 'Review bolt torque, weld quality, and connection plates.' },
  { id: 6,  number: 'INS-006', title: 'HVAC Ductwork Pressure Test',           type: 'Mechanical',    status: 'In Progress',location: 'Zone D – Level 04', assignedTo: 'Sophie Chen',     dueDate: '2026-03-22', createdAt: '2026-03-10', description: 'Pressure-test supply and return ducts for leakage compliance.' },
  { id: 7,  number: 'INS-007', title: 'Plumbing Rough-In Inspection',          type: 'Plumbing',      status: 'Open',      location: 'Zone A – Level 02',  assignedTo: 'Marcus Webb',     dueDate: '2026-03-28', createdAt: '2026-03-12', description: 'Inspect rough-in pipe routes, hangers, and sleeves before close-in.' },
  { id: 8,  number: 'INS-008', title: 'Curtain Wall Glazing Units',            type: 'Building Envelope', status: 'Completed', location: 'Facade – East', assignedTo: 'Priya Nair',   dueDate: '2026-02-28', createdAt: '2026-02-15', description: 'Confirm glass unit placement, gaskets, and weep hole alignment.' },
  { id: 9,  number: 'INS-009', title: 'Elevator Pit Inspection',               type: 'Vertical Transport', status: 'Closed', location: 'Core – Level B2', assignedTo: 'James Liu',    dueDate: '2026-01-30', createdAt: '2026-01-18', description: 'Verify pit depth, ladder, sump pump, and safety switch.' },
  { id: 10, number: 'INS-010', title: 'Staircase Handrail Compliance Check',   type: 'Life Safety',   status: 'Open',      location: 'Zone B – All Levels', assignedTo: 'Amara Osei',   dueDate: '2026-04-02', createdAt: '2026-03-14', description: 'Handrail heights, graspability, and continuity per IBC §1014.' },
  { id: 11, number: 'INS-011', title: 'Acoustic Insulation – Partition Walls', type: 'Interior',      status: 'In Progress',location: 'Zone E – Level 07', assignedTo: 'Sophie Chen',    dueDate: '2026-04-05', createdAt: '2026-03-18', description: 'Check batt insulation density and full-height installation before drywall.' },
  { id: 12, number: 'INS-012', title: 'Suspended Ceiling Grid Installation',   type: 'Interior',      status: 'Open',      location: 'Zone C – Level 06',  assignedTo: 'Marcus Webb',    dueDate: '2026-04-08', createdAt: '2026-03-20', description: 'Grid level, main runner spacing, and hanger wire gauge inspection.' },
  { id: 13, number: 'INS-013', title: 'Concrete Slab – Level 08 Post-Pour',   type: 'Structural',    status: 'Overdue',   location: 'Zone A – Level 08',  assignedTo: 'Carlos Rivera',  dueDate: '2026-03-10', createdAt: '2026-02-28', description: 'Core samples and flatness/levelness F-number review.' },
  { id: 14, number: 'INS-014', title: 'Emergency Lighting & Exit Signs',       type: 'Electrical',    status: 'Open',      location: 'All Zones – Level 01', assignedTo: 'Priya Nair',  dueDate: '2026-04-10', createdAt: '2026-03-22', description: '90-minute battery test and photometric verification.' },
  { id: 15, number: 'INS-015', title: 'Gas Piping Pressure Test – Kitchen',    type: 'Plumbing',      status: 'Completed', location: 'Zone B – Level 01',  assignedTo: 'James Liu',      dueDate: '2026-03-15', createdAt: '2026-03-05', description: 'Gas pipe pressure hold test per NFPA 54 and local code.' },
  { id: 16, number: 'INS-016', title: 'Rainwater Harvesting Tank Install',     type: 'Civil',         status: 'Closed',    location: 'Site – South',        assignedTo: 'Amara Osei',    dueDate: '2026-02-20', createdAt: '2026-02-08', description: 'Tank capacity, inlet filtration, and overflow routing inspection.' },
  { id: 17, number: 'INS-017', title: 'Rebar Placement – Retaining Wall',      type: 'Structural',    status: 'Completed', location: 'Site – North Perimeter', assignedTo: 'Carlos Rivera', dueDate: '2026-02-14', createdAt: '2026-02-05', description: 'Rebar size, spacing, cover depth, and splices against approved drawings.' },
  { id: 18, number: 'INS-018', title: 'Window Sill Flashing Details',          type: 'Building Envelope', status: 'Open', location: 'Zone D – Level 09', assignedTo: 'Sophie Chen',    dueDate: '2026-04-15', createdAt: '2026-03-28', description: 'Check sill pan flashing, end dams, and integration with air barrier.' },
  { id: 19, number: 'INS-019', title: 'ADA Accessibility – Restroom Units',    type: 'Life Safety',   status: 'In Progress',location: 'Zone F – Level 01', assignedTo: 'Marcus Webb',    dueDate: '2026-04-03', createdAt: '2026-03-25', description: 'Grab bar heights, turning radius, door clear width, and signage.' },
  { id: 20, number: 'INS-020', title: 'Thermal Insulation – Exterior Walls',   type: 'Building Envelope', status: 'Open', location: 'All Zones – Facade', assignedTo: 'Priya Nair',     dueDate: '2026-04-18', createdAt: '2026-03-30', description: 'Continuous insulation R-value, joints, and attachment verification.' },
  { id: 21, number: 'INS-021', title: 'Structural Slab – Level 10',            type: 'Structural',    status: 'Open',      location: 'Zone B – Level 10',  assignedTo: 'Carlos Rivera',  dueDate: '2026-04-20', createdAt: '2026-04-01', description: 'Rebar, PT cables, edge forms, and blockout details.' },
  { id: 22, number: 'INS-022', title: 'Data Cabling – Server Room',            type: 'Electrical',    status: 'Open',      location: 'Zone C – Level 02',  assignedTo: 'James Liu',      dueDate: '2026-04-22', createdAt: '2026-04-02', description: 'Cable routing, bend radius, labelling, and patch panel connections.' },
  { id: 23, number: 'INS-023', title: 'Mechanical Equipment Pad',              type: 'Mechanical',    status: 'Open',      location: 'Roof – Level 12',    assignedTo: 'Sophie Chen',    dueDate: '2026-04-25', createdAt: '2026-04-03', description: 'Inertia pad dimensions, anchor bolts, and vibration isolators.' },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<InspStatus, { bg: string; text: string; dot: string }> = {
  'Open':        { bg: '#EFF8FF', text: '#175CD3', dot: '#6172F3' },
  'In Progress': { bg: '#FFF7ED', text: '#C4320A', dot: '#EF6820' },
  'Completed':   { bg: '#ECFDF3', text: '#027A48', dot: '#12B76A' },
  'Overdue':     { bg: '#FEF2F2', text: '#B91C1C', dot: '#EF4444' },
  'Closed':      { bg: '#F5F5F5', text: '#616D79', dot: '#8C8C8C' },
};

// ─── Avatar colours (cycle by id % 10) ───────────────────────────────────────
const AVATAR_COLORS = [
  '#3B5998','#E4405F','#2D8653','#9B59B6','#E67E22',
  '#1ABC9C','#E74C3C','#34495E','#16A085','#8E44AD',
];
function initials(name: string) {
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}
function avatarBg(id: number) { return AVATAR_COLORS[id % AVATAR_COLORS.length]; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return iso; }
}

function StatusBadge({ status }: { status: InspStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: cfg.bg, color: cfg.text,
      borderRadius: 9999, padding: '2px 7px',
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, lineHeight: '16px',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function pageNums(total: number, cur: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  if (cur > 3) pages.push('…');
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
  if (cur < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ClearIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 1l8 8M9 1L1 9" fill="#8C8C8C" stroke="#8C8C8C" strokeWidth="0" />
      <path fillRule="evenodd" clipRule="evenodd"
        d="M1.354.646a.5.5 0 00-.708.708L4.293 5 .646 8.646a.5.5 0 00.708.708L5 5.707l3.646 3.647a.5.5 0 00.708-.708L5.707 5l3.647-3.646a.5.5 0 00-.708-.708L5 4.293 1.354.646z"
        fill="#8C8C8C"/>
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#616D79" strokeWidth="1.3"/>
      <path d="M8 7.5V11M8 5.5v.5" stroke="#616D79" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function EllipsisIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="4" cy="8" r="1.2" fill="#616D79"/>
      <circle cx="8" cy="8" r="1.2" fill="#616D79"/>
      <circle cx="12" cy="8" r="1.2" fill="#616D79"/>
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 4h14M5 9h8M8 14h2" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v9M5.5 7.5L9 11l3.5-3.5" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 13v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function PlusIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3v12M3 9h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ search, onSearch, onAdd }: { search: string; onSearch: (v: string) => void; onAdd: () => void; }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
      padding: '0 12px', height: 54, background: '#FFFFFF',
      borderBottom: '1px solid #F0F0F0',
    }}>
      {/* Search */}
      <div style={{ position: 'relative', width: 276, flexShrink: 0 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <SearchIcon />
        </span>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search inspections…"
          style={{
            width: '100%', height: 36, border: '1px solid #D0D5DD', borderRadius: 4,
            background: '#FFFFFF', paddingLeft: 34, paddingRight: search ? 34 : 10,
            fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
            lineHeight: '20px', color: '#344054', outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#91D5FF'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#D0D5DD'; }}
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: '#E0E4E8', flexShrink: 0 }} />

      {/* Filter */}
      <TBtn icon={<FilterIcon />} label="Filter" />
      {/* Export */}
      <TBtn icon={<ExportIcon />} label="Export" />

      <div style={{ flex: 1 }} />

      {/* Add Inspection CTA */}
      <button
        onClick={onAdd}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, height: 36,
          padding: '0 14px', background: '#FF4D00', border: 'none',
          borderRadius: 4, cursor: 'pointer', flexShrink: 0,
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
          lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#FF773E'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FF4D00'; }}
      >
        <PlusIcon />
        Add Inspection
      </button>
    </div>
  );
}

function TBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 6, height: 36,
      padding: '0 10px', background: '#FFFFFF', border: '1px solid #D0D5DD',
      borderRadius: 4, cursor: 'pointer', flexShrink: 0,
      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400,
      color: '#616D79', transition: 'background 0.15s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
    onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Table Header ─────────────────────────────────────────────────────────────

const COL_CHECKBOX = 48;
const COL_NUMBER   = 88;
const COL_TYPE     = 148;
const COL_STATUS   = 138;
const COL_LOCATION = 160;
const COL_ASSIGNED = 160;
const COL_DUE      = 112;
const COL_ACTIONS  = 60;

const thStyle: React.CSSProperties = {
  fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600,
  color: '#384857', background: '#FAFAFA', userSelect: 'none',
  display: 'flex', alignItems: 'center', height: '100%',
  padding: '0 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
};

function TableHeader({ allChecked, someChecked, onToggleAll }: {
  allChecked: boolean; someChecked: boolean; onToggleAll: () => void;
}) {
  return (
    <div style={{
      display: 'flex', height: 40, background: '#FAFAFA',
      borderBottom: '1px solid #F0F0F0', flexShrink: 0,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      {/* Checkbox */}
      <div style={{ width: COL_CHECKBOX, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckboxEl checked={allChecked} indeterminate={someChecked && !allChecked} onChange={onToggleAll} />
      </div>
      {/* # */}
      <div style={{ width: COL_NUMBER, flexShrink: 0, ...thStyle }}>#</div>
      {/* Title */}
      <div style={{ flex: 1, minWidth: 180, ...thStyle }}>Title</div>
      {/* Type */}
      <div style={{ width: COL_TYPE, flexShrink: 0, ...thStyle }}>Type</div>
      {/* Status */}
      <div style={{ width: COL_STATUS, flexShrink: 0, ...thStyle }}>Status</div>
      {/* Location */}
      <div style={{ width: COL_LOCATION, flexShrink: 0, ...thStyle }}>Location</div>
      {/* Assigned To */}
      <div style={{ width: COL_ASSIGNED, flexShrink: 0, ...thStyle }}>Assigned To</div>
      {/* Due Date */}
      <div style={{ width: COL_DUE, flexShrink: 0, ...thStyle }}>Due Date</div>
      {/* Actions */}
      <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
        {/* empty */}
      </div>
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function CheckboxEl({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void; }) {
  const [hovered, setHovered] = useState(false);
  const isChecked = checked || (indeterminate ?? false);
  return (
    <div
      onClick={e => { e.stopPropagation(); onChange(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 16, height: 16, borderRadius: 3, cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isChecked ? '#0E70CB' : hovered ? '#F0F7FF' : '#FFFFFF',
        border: `1.5px solid ${isChecked ? '#0E70CB' : hovered ? '#0E70CB' : '#D0D5DD'}`,
        transition: 'background 0.1s, border-color 0.1s',
      }}
    >
      {checked && !indeterminate && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {indeterminate && (
        <div style={{ width: 8, height: 2, background: 'white', borderRadius: 1 }} />
      )}
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function InspectionRow({ insp, checked, onCheck, onInfo, rowIndex }: {
  insp: Inspection; checked: boolean; onCheck: () => void;
  onInfo: (insp: Inspection) => void; rowIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isEven = rowIndex % 2 === 0;
  const bg = checked ? '#FFF3EE' : hovered ? '#F5F6F7' : isEven ? '#FFFFFF' : '#FAFAFA';

  const tdStyle: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
    color: '#1D2C38', display: 'flex', alignItems: 'center', height: '100%',
    padding: '0 8px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  };

  return (
    <div
      style={{ display: 'flex', height: 48, background: bg, borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <div style={{ width: COL_CHECKBOX, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckboxEl checked={checked} onChange={onCheck} />
      </div>
      {/* Number */}
      <div style={{ width: COL_NUMBER, flexShrink: 0, ...tdStyle, color: '#616D79' }}>
        {insp.number}
      </div>
      {/* Title */}
      <div style={{ flex: 1, minWidth: 180, ...tdStyle, fontWeight: 500, color: '#1D2C38' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{insp.title}</span>
      </div>
      {/* Type */}
      <div style={{ width: COL_TYPE, flexShrink: 0, ...tdStyle, color: '#384857' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{insp.type}</span>
      </div>
      {/* Status */}
      <div style={{ width: COL_STATUS, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
        <StatusBadge status={insp.status} />
      </div>
      {/* Location */}
      <div style={{ width: COL_LOCATION, flexShrink: 0, ...tdStyle, color: '#384857' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{insp.location}</span>
      </div>
      {/* Assigned To — avatar + name */}
      <div style={{ width: COL_ASSIGNED, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px' }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
          background: avatarBg(insp.id), display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, color: '#FFFFFF',
        }}>
          {initials(insp.assignedTo)}
        </div>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {insp.assignedTo}
        </span>
      </div>
      {/* Due Date */}
      <div style={{ width: COL_DUE, flexShrink: 0, ...tdStyle, color: '#384857' }}>
        {fmtDate(insp.dueDate)}
      </div>
      {/* Actions */}
      <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <ActionBtn title="View details" onClick={() => onInfo(insp)}><InfoIcon /></ActionBtn>
        <ActionBtn title="More options"><EllipsisIcon /></ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string; }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? '#F5F6F7' : 'transparent', border: 'none', borderRadius: 4,
        cursor: 'pointer', padding: 0, transition: 'background 0.1s',
      }}
    >
      {children}
    </button>
  );
}

// ─── Detail Side Panel ────────────────────────────────────────────────────────

function InspectionDetailPanel({ insp, onClose }: { insp: Inspection; onClose: () => void; }) {
  const cfg = STATUS_CONFIG[insp.status];
  return (
    <div style={{ width: 370, height: '100%', background: '#FFFFFF', borderLeft: '1px solid #D9D9D9', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Panel header */}
      <div style={{ flexShrink: 0, padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 400, color: '#9CA4AE' }}>{insp.number}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Inspection Details</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F5F6F7'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 0' }}>

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', margin: 0, lineHeight: '20px' }}>{insp.title}</p>
        </div>

        {/* Status + Type row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</p>
            <StatusBadge status={insp.status} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</p>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857' }}>{insp.type}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F0F0F0', margin: '0 0 20px' }} />

        {/* Location */}
        <Row label="Location" value={insp.location} />

        {/* Assigned To */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned To</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: avatarBg(insp.id), display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#FFFFFF',
            }}>
              {initials(insp.assignedTo)}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857' }}>{insp.assignedTo}</span>
          </div>
        </div>

        {/* Dates */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</p>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857' }}>{fmtDate(insp.dueDate)}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Created</p>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857' }}>{fmtDate(insp.createdAt)}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F0F0F0', margin: '0 0 20px' }} />

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857', margin: 0, lineHeight: '20px' }}>{insp.description}</p>
        </div>
      </div>

      {/* Panel footer */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #C3C7CC', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, padding: '0 20px' }}>
        <button
          onClick={onClose}
          style={{
            height: 32, padding: '0 14px', background: '#F2F3F4', border: '1px solid #C3C7CC',
            borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; }}
        >
          Close
        </button>
        <button
          style={{
            height: 32, padding: '0 14px', background: '#FF4D00', border: 'none',
            borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FF773E'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FF4D00'; }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857' }}>{value}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
// This is the "MainCanvas Layout" — reusable structural template for all
// tabular module pages. Name it "MainCanvas Layout" when requesting this structure.

const PAGE_SIZE = 20;

export function InspectionsList() {
  const [search, setSearch]           = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [detailInsp, setDetailInsp]   = useState<Inspection | null>(null);
  const [page, setPage]               = useState(1);

  // Filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return MOCK_INSPECTIONS;
    return MOCK_INSPECTIONS.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.number.toLowerCase().includes(q) ||
      i.type.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.assignedTo.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const pageItems  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const start1     = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const end1       = Math.min(safePage * PAGE_SIZE, filtered.length);

  const toggleRow = useCallback((id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const allChecked  = pageItems.length > 0 && pageItems.every(i => selectedIds.has(i.id));
  const someChecked = pageItems.some(i => selectedIds.has(i.id));
  const toggleAll   = () => {
    if (allChecked) setSelectedIds(prev => { const n = new Set(prev); pageItems.forEach(i => n.delete(i.id)); return n; });
    else setSelectedIds(prev => { const n = new Set(prev); pageItems.forEach(i => n.add(i.id)); return n; });
  };

  const panelOpen = !!detailInsp;

  return (
    /* MainCanvas Layout — outer flex-row */
    <div style={{ display: 'flex', flex: 1, minWidth: 0, minHeight: 0, overflow: 'hidden', background: '#FFFFFF' }}>

      {/* ── MainCanvas: flex-col — Section Header (72px) + Table zone ── */}
      <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>

        {/* Section Header — DisplayMedium · 72px · 24px edge gap */}
        <div style={{
          height: 72, flexShrink: 0, background: '#FFFFFF',
          borderBottom: '1px solid #D9D9D9',
          display: 'flex', alignItems: 'center',
          paddingLeft: 24, paddingRight: 24,
        }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
            List
          </h1>
        </div>

        {/* Table zone — p-12 all sides */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden', padding: 12 }}>
          {/* Table box — rounded-8, border #D9D9D9, fills zone */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, borderRadius: 8, overflow: 'hidden', background: '#FAFAFA', border: '1px solid #D9D9D9' }}>

            <Toolbar search={search} onSearch={q => { setSearch(q); setPage(1); }} onAdd={() => {}} />

            {/* Scrollable table area */}
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'auto', scrollbarGutter: 'stable' }}
              className="insp-scroll"
            >
              <style>{`
                .insp-scroll::-webkit-scrollbar { width: 7px; }
                .insp-scroll::-webkit-scrollbar-track { background: #f0f2f4; border-left: 1px solid #F0F0F0; }
                .insp-scroll::-webkit-scrollbar-thumb { border-radius: 10px; background: #dde0e4; }
                .insp-scroll::-webkit-scrollbar-thumb:hover { background: #a0aab4; }
                .insp-scroll { scrollbar-width: thin; scrollbar-color: #dde0e4 #f0f2f4; }
              `}</style>
              <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <TableHeader allChecked={allChecked} someChecked={someChecked} onToggleAll={toggleAll} />
              </div>
              {pageItems.map((insp, idx) => (
                <InspectionRow
                  key={insp.id}
                  insp={insp}
                  rowIndex={idx}
                  checked={selectedIds.has(insp.id)}
                  onCheck={() => toggleRow(insp.id)}
                  onInfo={i => { setDetailInsp(i); }}
                />
              ))}
              {pageItems.length === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA4AE' }}>
                  No inspections found.
                </div>
              )}
            </div>

            {/* Pagination footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#FAFAFA', borderTop: '1px solid #F0F0F0', height: 48, padding: '0 16px' }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#667085' }}>
                {filtered.length === 0 ? 'No results' : `Showing ${start1}–${end1} of ${filtered.length} inspections`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <button disabled={safePage <= 1} onClick={() => setPage(p => p - 1)}
                  style={{ background: '#FFF', width: 32, height: 32, border: '1px solid #F0F0F0', borderRadius: 6, cursor: safePage <= 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: safePage <= 1 ? 0.35 : 1 }}>
                  <ChevronLeftIcon />
                </button>
                {pageNums(totalPages, safePage).map((n, i) => (
                  <button key={i}
                    disabled={n === '…'}
                    onClick={() => typeof n === 'number' && setPage(n)}
                    style={{
                      width: 32, height: 32, borderRadius: 6, border: 'none', cursor: n === '…' ? 'default' : 'pointer',
                      background: n === safePage ? '#FF4D00' : 'transparent',
                      color: n === safePage ? '#FFFFFF' : n === '…' ? '#667085' : '#243746',
                      fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button disabled={safePage >= totalPages} onClick={() => setPage(p => p + 1)}
                  style={{ background: '#FFF', width: 32, height: 32, border: '1px solid #F0F0F0', borderRadius: 6, cursor: safePage >= totalPages ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: safePage >= totalPages ? 0.35 : 1 }}>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>{/* end MainCanvas */}

      {/* ── SidePanel: full-height sibling of MainCanvas, flush right, animated width ── */}
      <div style={{
        flexShrink: 0,
        width: panelOpen ? 370 : 0,
        minHeight: 0,
        overflow: 'hidden',
        transition: 'width 0.26s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        {detailInsp && (
          <InspectionDetailPanel insp={detailInsp} onClose={() => setDetailInsp(null)} />
        )}
      </div>

    </div>
  );
}