import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ImportRolesModal, downloadRolesTemplate } from './import-roles-modal';
import { ExportRolesModal } from './export-roles-modal';
import { INITIAL_USERS } from './users-table';
import { TRADE_ITEMS } from './reference-data-table';
import svgPaths from '../../imports/svg-hvnufn483u';
import plusPaths from '../../imports/svg-y2rd7nmj2z';
import trashPaths from '../../imports/svg-fjqvq36uqo';
// siblingPaths import removed — AddSibling button removed from UI
import childPaths from '../../imports/svg-p3h938sv9m';
import chevronDownPaths from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';

// ─── Types ────────────────────────────────────────────────────────────────────
type RoleSortKey = 'name' | 'code' | 'description' | 'active';
type RoleSortDir = 'asc' | 'desc';
interface RoleSortState { key: RoleSortKey; dir: RoleSortDir }

interface RoleChild {
  id: string; name: string; code: string; description: string; active: boolean;
  trade: string | null; // trade ID from TRADE_ITEMS (e.g. 't-gc'), null = unassigned
}
interface RoleGroup {
  id: string; name: string; code: string; description: string; active: boolean; children: RoleChild[];
}

// DragItem carries the label for the floating preview
type DragItem =
  | { type: 'group'; groupId: string; label: string }
  | { type: 'child'; groupId: string; childId: string; label: string };

type DropTarget =
  | { type: 'group';           groupId: string; pos: 'before' | 'after' }
  | { type: 'child';           groupId: string; childId: string; pos: 'before' | 'after' }
  | { type: 'group-end';       groupId: string }
  | { type: 'trade-group-end'; tradeId: string };

// ─── ID generator ─────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `new_${Date.now()}_${++_uid}`; }

// ─── Seed data ────────────────────────────────────────────────────────────────
const ROLES_DATA: RoleGroup[] = [
  { id: 'construction', name: 'Construction', code: 'CONST', description: 'Oversees all on-site construction activities and field operations.', active: true, children: [
    { id: 'cm',    name: 'Construction Manager',      code: 'CM',    description: 'Manages overall construction project delivery.',             active: true,  trade: 't-cm'   },
    { id: 'sm',    name: 'Site Manager',              code: 'SM',    description: 'Runs daily site operations and subcontractor coordination.', active: true,  trade: 't-gc'   },
    { id: 'supt',  name: 'Superintendent',            code: 'SUPT',  description: 'Coordinates day-to-day field activities and crew scheduling.',active: true, trade: 't-gc'   },
    { id: 'gsupt', name: 'General Superintendent',    code: 'GSUPT', description: 'Senior oversight of multiple superintendents on large sites.',active: true, trade: 't-gc'   },
    { id: 'fe',    name: 'Field Engineer',            code: 'FE',    description: 'Provides engineering support directly on site.',            active: true,  trade: 't-gc'   },
    { id: 'dsupt', name: 'Discipline Superintendent', code: 'DSUPT', description: 'Leads a specific trade or discipline team on site.',        active: true,  trade: 't-gc'   },
  ]},
  { id: 'owner', name: 'Owner', code: 'OWN', description: 'Client-side ownership roles responsible for project decisions and representation.', active: true, children: [
    { id: 'or',  name: 'Owner Representative',  code: 'OR',  description: 'Represents the owner on-site for day-to-day decisions.',      active: true,  trade: 't-cm'   },
    { id: 'cr',  name: 'Client Representative', code: 'CR',  description: 'Acts on behalf of the client at key project milestones.',      active: true,  trade: 't-cm'   },
    { id: 'dev', name: 'Developer',              code: 'DEV', description: 'Oversees property development from brief to handover.',        active: true,  trade: 't-cm'   },
    { id: 'am',  name: 'Asset Manager',          code: 'AM',  description: 'Manages long-term performance and value of project assets.',   active: true,  trade: 't-fac'  },
  ]},
  { id: 'management', name: 'Management', code: 'MGMT', description: 'Executive and senior leadership responsible for strategic project decisions.', active: true, children: [
    { id: 'pm',  name: 'Project Manager',           code: 'PM',  description: 'Leads overall project delivery across all disciplines.',       active: true,  trade: 't-cm'   },
    { id: 'dpm', name: 'Deputy Project Manager',    code: 'DPM', description: 'Supports the PM and steps in during absence.',                active: true,  trade: 't-cm'   },
    { id: 'apm', name: 'Assistant Project Manager', code: 'APM', description: 'Assists the PM with scheduling, reporting and coordination.', active: true,  trade: 't-cm'   },
    { id: 'pe',  name: 'Project Engineer',           code: 'PE',  description: 'Provides technical engineering oversight across packages.',    active: true,  trade: 't-cm'   },
    { id: 'pc',  name: 'Project Coordinator',        code: 'PC',  description: 'Coordinates administrative and logistical project activities.',active: true, trade: 't-cm'   },
  ]},
  { id: 'design', name: 'Design', code: 'DSN', description: 'Responsible for architectural and design documentation.', active: true, children: [
    { id: 'arch', name: 'Architect',          code: 'ARCH', description: 'Leads architectural design and drawing production.',             active: true,  trade: 't-arch' },
    { id: 'id',   name: 'Interior Designer',  code: 'ID',   description: 'Develops interior layouts, finishes and spatial design.',        active: true,  trade: 't-arch' },
    { id: 'dm',   name: 'Design Manager',     code: 'DM',   description: 'Coordinates design outputs across all consultants.',             active: true,  trade: 't-arch' },
    { id: 'dc',   name: 'Design Coordinator', code: 'DC',   description: 'Manages design deliverables, reviews and issue registers.',       active: false, trade: 't-arch' },
  ]},
  { id: 'engineering', name: 'Engineering', code: 'ENG', description: 'Provides technical engineering support, design review, and field queries.', active: true, children: [
    { id: 'se',  name: 'Structural Engineer',      code: 'SE',  description: 'Designs and reviews structural systems and load paths.',       active: true,  trade: 't-seng'   },
    { id: 'ce',  name: 'Civil Engineer',           code: 'CE',  description: 'Manages civil works including roads, drainage and earthworks.',active: true,  trade: 't-civil'  },
    { id: 'me',  name: 'Mechanical Engineer',      code: 'ME',  description: 'Designs HVAC, hydraulics and mechanical services.',            active: true,  trade: 't-mepeng' },
    { id: 'ee',  name: 'Electrical Engineer',      code: 'EE',  description: 'Oversees electrical systems, power distribution and lighting.',active: true,  trade: 't-mepeng' },
    { id: 'ple', name: 'Plumbing Engineer',        code: 'PLE', description: 'Designs and reviews plumbing and sanitary systems.',           active: true,  trade: 't-plmb'   },
    { id: 'fpe', name: 'Fire Protection Engineer', code: 'FPE', description: 'Designs fire suppression, detection and life-safety systems.', active: false, trade: 't-fire'   },
  ]},
  { id: 'bim', name: 'BIM', code: 'BIM', description: 'Manages digital delivery, model coordination, and BIM standards compliance.', active: true, children: [
    { id: 'bimm',  name: 'BIM Manager',          code: 'BIMM',  description: 'Sets BIM strategy, standards and execution plan.',             active: true,  trade: 't-bim' },
    { id: 'bimc',  name: 'BIM Coordinator',       code: 'BIMC',  description: 'Coordinates model federation and clash detection.',            active: true,  trade: 't-bim' },
    { id: 'bimmd', name: 'BIM Modeler',           code: 'BIMMD', description: 'Produces and maintains discipline-specific BIM models.',       active: true,  trade: 't-bim' },
    { id: 'vdc',   name: 'VDC Manager',           code: 'VDC',   description: 'Leads virtual design and construction workflows.',             active: true,  trade: 't-bim' },
    { id: 'ddl',   name: 'Digital Delivery Lead', code: 'DDL',   description: 'Manages digital handover, CDE and information requirements.',  active: false, trade: 't-bim' },
  ]},
  { id: 'estimating', name: 'Estimating', code: 'EST', description: 'Prepares cost estimates, bid packages, and quantity take-offs.', active: true, children: [
    { id: 'est',  name: 'Estimator',         code: 'EST',  description: 'Prepares detailed cost estimates and pricing submissions.',    active: true,  trade: 't-cm' },
    { id: 'sest', name: 'Senior Estimator',  code: 'SEST', description: 'Leads estimation team and reviews complex bid packages.',      active: true,  trade: 't-cm' },
    { id: 'qs',   name: 'Quantity Surveyor', code: 'QS',   description: 'Manages contract quantities, variations and valuations.',     active: true,  trade: 't-cm' },
    { id: 'ceng', name: 'Cost Engineer',     code: 'CENG', description: 'Tracks project cost performance and forecasting.',            active: false, trade: 't-cm' },
  ]},
  { id: 'planning', name: 'Planning', code: 'PLAN', description: 'Responsible for project scheduling, look-ahead planning, and progress tracking.', active: true, children: [
    { id: 'sch',    name: 'Scheduler',         code: 'SCH',    description: 'Builds and maintains the project master schedule.',          active: true,  trade: 't-cm' },
    { id: 'plneng', name: 'Planning Engineer', code: 'PLNENG', description: 'Develops short-interval schedules and look-ahead plans.',    active: true,  trade: 't-cm' },
    { id: 'sa',     name: 'Schedule Analyst',  code: 'SA',     description: 'Analyses schedule performance and delay impacts.',          active: true,  trade: 't-cm' },
    { id: 'ctrl',   name: 'Controls Engineer', code: 'CTRL',   description: 'Integrates cost and schedule for earned value reporting.',   active: false, trade: 't-cm' },
  ]},
  { id: 'commercial', name: 'Commercial', code: 'COM', description: 'Manages contracts, procurement, cost control and supply chain.', active: true, children: [
    { id: 'comm', name: 'Commercial Manager',   code: 'COM',  description: 'Oversees all commercial, contractual and financial activities.',active: true,  trade: 't-cm' },
    { id: 'conm', name: 'Contracts Manager',    code: 'CONM', description: 'Manages contract administration and dispute resolution.',      active: true,  trade: 't-cm' },
    { id: 'proc', name: 'Procurement Manager',  code: 'PROC', description: 'Leads procurement strategy and vendor selection.',             active: true,  trade: 't-cm' },
    { id: 'cmg',  name: 'Cost Manager',         code: 'CMG',  description: 'Tracks budgets, forecasts and cost-to-complete.',              active: true,  trade: 't-cm' },
    { id: 'scm',  name: 'Supply Chain Manager', code: 'SCM',  description: 'Manages supplier relationships and logistics coordination.',   active: false, trade: 't-cm' },
  ]},
  { id: 'safety', name: 'Safety', code: 'SAFE', description: 'Ensures compliance with health, safety, and environmental standards.', active: true, children: [
    { id: 'hsm',  name: 'Safety Manager',  code: 'HSM',  description: 'Leads the site health and safety management system.',          active: true,  trade: 't-safe' },
    { id: 'hsem', name: 'HSE Manager',     code: 'HSEM', description: 'Manages health, safety and environmental compliance.',         active: true,  trade: 't-safe' },
    { id: 'so',   name: 'Safety Officer',  code: 'SO',   description: 'Conducts inspections, toolbox talks and incident reporting.',  active: true,  trade: 't-safe' },
    { id: 'ehsc', name: 'EHS Coordinator', code: 'EHSC', description: 'Coordinates environmental, health and safety documentation.',  active: false, trade: 't-safe' },
  ]},
];

export { ROLES_DATA };
export type { RoleGroup, RoleChild };

// ─── Find drop target from cursor position (DOM-based, no stale closures) ────
function findDropTarget(x: number, y: number, dragItem: DragItem): DropTarget | null {
  const els = document.elementsFromPoint(x, y);
  for (const el of els) {
    // Walk up from any inner element to find the row wrapper
    let rowEl: Element | null = el;
    while (rowEl && !rowEl.hasAttribute('data-row-type')) {
      rowEl = rowEl.parentElement;
    }
    if (!rowEl) continue;

    const rowType = rowEl.getAttribute('data-row-type') as 'group' | 'child' | 'trade-group' | null;
    const rowId   = rowEl.getAttribute('data-row-id');
    const gId     = rowEl.getAttribute('data-group-id') || rowId;
    if (!rowType || !rowId || !gId) continue;

    const rect = rowEl.getBoundingClientRect();
    const pos: 'before' | 'after' = y < rect.top + rect.height / 2 ? 'before' : 'after';

    if (dragItem.type === 'group') {
      if (rowType !== 'group') return null;
      if (rowId === dragItem.groupId) return null;
      return { type: 'group', groupId: rowId, pos };
    }

    if (dragItem.type === 'child') {
      // Dropping onto a trade group header → change trade assignment
      if (rowType === 'trade-group') {
        return { type: 'trade-group-end', tradeId: rowId };
      }
      if (rowType === 'group') {
        return { type: 'group-end', groupId: rowId };
      }
      if (rowType === 'child') {
        if (rowId === dragItem.childId) return null;
        return { type: 'child', groupId: gId, childId: rowId, pos };
      }
    }
    return null;
  }
  return null;
}

// ─── Highlight ────────────────────────────────────────────────────────────────
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

// ─── Icons ────────────────────────────────────────────────────────────────────
function GripDotsIcon({ color = '#9CA4AE' }: { color?: string }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <circle cx="3" cy="2"  r="1.5" fill={color} />
      <circle cx="7" cy="2"  r="1.5" fill={color} />
      <circle cx="3" cy="6"  r="1.5" fill={color} />
      <circle cx="7" cy="6"  r="1.5" fill={color} />
      <circle cx="3" cy="10" r="1.5" fill={color} />
      <circle cx="7" cy="10" r="1.5" fill={color} />
      <circle cx="3" cy="14" r="1.5" fill={color} />
      <circle cx="7" cy="14" r="1.5" fill={color} />
    </svg>
  );
}

function SortArrows({ dir }: { dir: RoleSortDir | null }) {
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
function EditPencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function AddChildIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'rotate(90deg)' }}>
      <path clipRule="evenodd" d={childPaths.p247db800} fill="#384857" fillRule="evenodd" />
      <path d={childPaths.pbf71000} fill="#FF6425" />
    </svg>
  );
}
function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      style={{ flexShrink: 0 }}
    >
      {expanded ? (
        /* Chevron-down frame — SVG path apex sits at top (▲ natively), rotate 180° around centre → ▼ */
        <path d={chevronDownPaths.p1d4b7280} fill="#384857" transform="rotate(180 9 9)" />
      ) : (
        /* Chevron-right frame — SVG path apex sits at left (◄ natively), rotate 180° around centre → ► */
        <path d={chevronRightPaths.p1d644480} fill="#384857" transform="rotate(180 9 9)" />
      )}
    </svg>
  );
}

// ─── Edit validation ──────────────────────────────────────────────────────────
function computeEditErrors(groups: RoleGroup[]): Map<string, string> {
  const errors = new Map<string, string>();

  // ── Build flat lists for uniqueness checks ────────────────────────────────
  // Collect every child role across all groups with its location key
  const allChildren: { groupId: string; childId: string; name: string; code: string }[] = [];
  for (const g of groups) {
    for (const c of g.children) {
      allChildren.push({ groupId: g.id, childId: c.id, name: c.name.trim().toLowerCase(), code: c.code.trim().toLowerCase() });
    }
  }

  // Build occurrence maps: normalized value → array of "groupId|childId" keys
  const nameCount = new Map<string, string[]>();
  const codeCount = new Map<string, string[]>();
  for (const { groupId, childId, name, code } of allChildren) {
    if (name) {
      const k = `${groupId}|${childId}`;
      nameCount.set(name, [...(nameCount.get(name) ?? []), k]);
    }
    if (code) {
      const k = `${groupId}|${childId}`;
      codeCount.set(code, [...(codeCount.get(code) ?? []), k]);
    }
  }

  // ── Validate ──────────────────────────────────────────────────────────────
  for (const g of groups) {
    if (!g.name.trim()) {
      errors.set(`g_${g.id}_name`, 'Group Name is required');
    }

    for (const c of g.children) {
      const nameTrimmed = c.name.trim();
      const codeTrimmed = c.code.trim();

      // Required
      if (!nameTrimmed) {
        errors.set(`c_${g.id}_${c.id}_name`, 'Role Name is required');
      } else if (nameTrimmed.length < 3) {
        errors.set(`c_${g.id}_${c.id}_name`, 'Role Name must be at least 3 characters');
      } else {
        // Same as parent group name
        if (g.name.trim() && nameTrimmed.toLowerCase() === g.name.trim().toLowerCase()) {
          errors.set(`c_${g.id}_${c.id}_name`, `Role Name cannot be the same as its Group Name ("${g.name}")`);
        }
        // Duplicate across all roles
        else {
          const dupes = nameCount.get(nameTrimmed.toLowerCase()) ?? [];
          if (dupes.length > 1) {
            errors.set(`c_${g.id}_${c.id}_name`, `Role Name "${c.name.trim()}" is already used by another role, names must be unique`);
          }
        }
      }

      // Code uniqueness (only when code is non-empty)
      if (codeTrimmed) {
        const dupes = codeCount.get(codeTrimmed.toLowerCase()) ?? [];
        if (dupes.length > 1) {
          errors.set(`c_${g.id}_${c.id}_code`, `Role Code "${c.code.trim()}" is already used by another role, codes must be unique`);
        }
      }
    }
  }

  return errors;
}

function ValidationBanner({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 16px', height: 36, flexShrink: 0,
      background: '#FFF1F0', borderBottom: '1px solid #FFA39E',
    }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#B91C1C' }}>
        {count} validation {count === 1 ? 'error' : 'errors'}, hover the highlighted fields for details. Fix all errors before saving.
      </span>
    </div>
  );
}

// ─── Floating drag preview (portal) ───────────────────────────────────────────
function DragPreview({ x, y, item }: { x: number; y: number; item: DragItem }) {
  const isGroup = item.type === 'group';
  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed', left: 0, top: 0,
      transform: `translate(${x + 18}px, ${y - 22}px)`,
      pointerEvents: 'none', zIndex: 9999,
      background: 'white',
      border: '1px solid #D0D5DD',
      borderLeft: `4px solid ${isGroup ? '#FF4D00' : '#243746'}`,
      borderRadius: 4,
      padding: '0 12px',
      height: 44,
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      display: 'flex', alignItems: 'center', gap: 8,
      maxWidth: 320, overflow: 'hidden',
      opacity: 0.96,
      userSelect: 'none',
    }}>
      <GripDotsIcon color="#9CA4AE" />
      <span style={{
        fontFamily: 'Open Sans, sans-serif', fontSize: 13,
        color: '#1D2939',
        fontWeight: isGroup ? 600 : 400,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {item.label}
      </span>
      <span style={{
        fontFamily: 'Open Sans, sans-serif', fontSize: 11,
        background: isGroup ? '#FFEDE4' : '#F0F2F5',
        color: isGroup ? '#FF4D00' : '#384857',
        borderRadius: 2, padding: '1px 5px', flexShrink: 0,
        fontWeight: 500,
      }}>
        {isGroup ? 'Group' : 'Role'}
      </span>
    </div>,
    document.body
  );
}

// ─── Column resize handle (§7.A.7) ────────────────────────────────────────────
function ColResizeHandle({ colKey, onDelta, cellHovered }: {
  colKey: string;
  onDelta: (key: string, delta: number) => void;
  cellHovered: boolean;
}) {
  const [active,        setActive]        = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
    let lastX = e.clientX;
    const onMove = (me: MouseEvent) => {
      onDelta(colKey, me.clientX - lastX);
      lastX = me.clientX;
    };
    const onUp = () => {
      setActive(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const lineColor = active || handleHovered ? '#4D7CFE'
                  : cellHovered             ? '#9CA4AE'
                  : 'transparent';

  return (
    <div
      style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 7, cursor: 'col-resize', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false}
      onDragStart={e => e.preventDefault()}
    >
      <div style={{ height: HEADER_H, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── Header cell ──────────────────────────────────────────────────────────────
function RoleHeaderCell({
  label, sortKey, sortState, onSort, style, align = 'left', editMode = false,
  colKey, onDelta,
}: {
  label: React.ReactNode; sortKey: RoleSortKey | null; sortState: RoleSortState | null;
  onSort: () => void; style?: React.CSSProperties; align?: 'left' | 'center'; editMode?: boolean;
  colKey?: string; onDelta?: (key: string, delta: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive  = !editMode && !!sortKey && sortState?.key === sortKey;
  const dir = isActive ? sortState!.dir : null;
  const clickable = !editMode && !!sortKey;
  const showResize = !!colKey && !!onDelta;
  return (
    <div
      style={{
        ...style,
        position: 'relative',
        display: 'flex', alignItems: 'center', height: '100%',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        paddingLeft: 8, paddingRight: showResize ? 10 : 8, overflow: 'clip',
        cursor: clickable ? 'pointer' : 'default', userSelect: 'none', flexShrink: 0,
        background: hovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onClick={clickable ? onSort : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: align === 'left' ? 1 : undefined }}>
        {label}
      </span>
      {!editMode && sortKey && (
        <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, marginLeft: 4, opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>
          <SortArrows dir={dir} />
        </span>
      )}
      {showResize && <ColResizeHandle colKey={colKey!} onDelta={onDelta!} cellHovered={hovered} />}
    </div>
  );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────
function ToggleSwitch({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!active)} style={{ width: 40, height: 20, borderRadius: 10, background: active ? '#FF4D00' : '#D9D9D9', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: active ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
    </div>
  );
}

// ─── Inline edit input — §26 Inline Error Expansion ──────────────────────────
function EditInput({ value, onChange, placeholder, error, errorMessage }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  error?: boolean; errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const borderColor = error
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');
  return (
    <div
      style={{ flex: 1, minWidth: 0, position: 'relative', height: 32 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', height: 32,
          paddingLeft: 8, paddingRight: error ? 28 : 8,
          border: `1px solid ${borderColor}`, borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
          lineHeight: '20px', color: '#344054',
          background: error ? '#FFF1F0' : '#FFFFFF',
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.15s, background 0.15s',
        }}
      />
      {/* Error icon — always visible when field has an error */}
      {error && (
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
      {/* Error message — always visible; row has expanded downward to make room */}
      {error && errorMessage && (
        <div style={{
          position: 'absolute', top: 34, left: 0, right: 0, zIndex: 10,
          fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#FF4D4F',
          lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis', pointerEvents: 'none',
        }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

// ─── Tertiary icon button ─────────────────────────────────────────────────────
function IconBtn({ onClick, title, children }: { onClick: () => void; title?: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pressed ? '#616D79' : hovered ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s', padding: 0 }}
    >
      {children}
    </button>
  );
}

// ─── Drag handle cell (edit-mode only) ───────────────────────────────────────
function DragHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 28, flexShrink: 0, height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'grab', userSelect: 'none',
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.15s',
      }}
    >
      <GripDotsIcon color={hovered ? '#384857' : '#9CA4AE'} />
    </div>
  );
}

// ─── Column constants ─────────────────────────────────────────────────────────
const COL_DRAG      = 28;
const COL_ROLE_NAME = 240; // slightly narrower in edit to accommodate Trade col
const COL_ROLE_NAME_VIEW = 300; // full width in view mode
const COL_CODE      = 100;
const COL_TRADE     = 210; // trade dropdown column (edit mode only)
const COL_ACTIONS   = 160;
const HEADER_H         = 44;
const ROW_H            = 48;
const EDIT_ROW_H_BASE  = 48;  // edit-mode default row height (matches view mode)
const EDIT_ROW_H_ERROR = 62;  // edit-mode row height when any field has a validation error — expands downward only
const CHILD_INDENT     = 28;

// ─── Trade lookup helpers ───���──────────────────────────────────────────────────
function tradeById(id: string | null) {
  return id ? TRADE_ITEMS.find(t => t.id === id) ?? null : null;
}

// ─── Trade Dropdown — §16.8 inline searchable dropdown for edit mode ──────────
function TradeDropdown({ value, onChange }: {
  value: string | null;
  onChange: (id: string | null) => void;
}) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const triggerRef          = useRef<HTMLDivElement>(null);
  const menuRef             = useRef<HTMLDivElement>(null);
  const inputRef            = useRef<HTMLInputElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  const selectedTrade = tradeById(value);

  const filteredTrades = useMemo(() => {
    if (!query || query.length < 2) return TRADE_ITEMS;
    const q = query.toLowerCase();
    return TRADE_ITEMS.filter(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q));
  }, [query]);

  function openDropdown() {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  }
  function closeDropdown() { setOpen(false); setQuery(''); }

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        menuRef.current   && !menuRef.current.contains(e.target as Node)
      ) closeDropdown();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <>
      <div
        ref={triggerRef}
        onClick={open ? closeDropdown : openDropdown}
        style={{
          flex: 1, minWidth: 0, height: 32,
          display: 'flex', alignItems: 'center', gap: 6,
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4, background: '#FFFFFF', cursor: 'pointer',
          padding: '0 8px', overflow: 'hidden',
          transition: 'border-color 0.15s',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onClick={e => e.stopPropagation()}
            placeholder="Search trades…"
            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#344054', background: 'transparent', minWidth: 0 }}
          />
        ) : (
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: selectedTrade ? '#344054' : '#9EA3A9' }}>
            {selectedTrade ? selectedTrade.name : 'Select trade…'}
          </span>
        )}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M1 1l4 4 4-4" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'absolute', top: menuPos.top, left: menuPos.left,
            width: Math.max(menuPos.width, 260), maxHeight: 320, overflowY: 'auto',
            background: '#FFFFFF', borderRadius: 4, zIndex: 9999,
            boxShadow: '0 9px 28px 8px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12)',
            padding: '4px 0',
          }}>
          {/* — None — option: always visible, highlighted when no trade assigned */}
          {(() => {
            const isNoneSelected = value === null;
            return (
              <div
                onClick={() => { onChange(null); closeDropdown(); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', gap: 8,
                  paddingLeft: isNoneSelected ? 9 : 12, paddingRight: 12,
                  cursor: 'pointer',
                  background: isNoneSelected ? '#E6F7FF' : 'transparent',
                  borderLeft: isNoneSelected ? '3px solid #1890FF' : '3px solid transparent',
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: isNoneSelected ? 600 : 400,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (!isNoneSelected) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { if (!isNoneSelected) (e.currentTarget as HTMLElement).style.background = isNoneSelected ? '#E6F7FF' : 'transparent'; }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: isNoneSelected ? '#1D2939' : '#8C8C8C', fontStyle: 'italic' }}>— None —</span>
                {isNoneSelected && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5l4 4L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })()}
          {/* Divider after None */}
          <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
          {filteredTrades.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</div>
          ) : filteredTrades.map(trade => {
            const isSelected = value === trade.id;
            return (
              <div key={trade.id}
                onClick={() => { onChange(trade.id); closeDropdown(); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', gap: 8,
                  paddingLeft: isSelected ? 9 : 12, paddingRight: 12,
                  cursor: 'pointer',
                  background: isSelected ? '#E6F7FF' : 'transparent',
                  borderLeft: isSelected ? '3px solid #1890FF' : '3px solid transparent',
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'background 0.1s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: isSelected ? '#1D2939' : '#384857' }}>{trade.name}</span>
                {isSelected && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5l4 4L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Role In Use — blocking modal ────────────────────────────────────────────
function RoleInUseModal({
  roleName,
  memberCount,
  onClose,
}: {
  roleName: string;
  memberCount: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 460, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>
              Cannot Delete Role
            </p>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
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
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Warning icon row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L18.5 18H1.5L10 3Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 9V12" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="15" r="0.75" fill="#D92D20" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1D2C38' }}>
                <span style={{ fontStyle: 'italic', color: '#384857' }}>"{roleName}"</span> is assigned to{' '}
                <span style={{ color: '#D92D20' }}>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
              </p>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                This role cannot be deleted while it is still assigned to project members. Please reassign{' '}
                {memberCount === 1 ? 'that member' : 'those members'} to a different role before attempting to remove it.
              </p>
            </div>
          </div>

          {/* Tip box */}
          <div style={{ background: '#FFF7ED', border: '1px solid #FDDCB5', borderRadius: 6, padding: '10px 14px' }}>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#C4320A' }}>
              <span style={{ fontWeight: 600 }}>Tip:</span> Go to the <span style={{ fontWeight: 600 }}>Members</span> page, filter by the role <span style={{ fontStyle: 'italic' }}>"{roleName}"</span>, and update the Permission for each affected member.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ height: 64, borderTop: '1px solid #C3C7CC', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0, background: '#FFFFFF' }}>
          <button
            onClick={onClose}
            style={{ height: 36, padding: '0 20px', background: '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FF773E')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FF4D00')}
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Helper: count members assigned to a set of role names ───────────────────
function countAssignedMembers(roleNames: string[]): number {
  const lower = roleNames.map(n => n.toLowerCase());
  return INITIAL_USERS.filter(u => lower.includes(u.accessLevel.toLowerCase())).length;
}

// ─── Main component ─────────��─────────────────────────────────────────────────
export function RolesTable() {
  // ── Data ──────────────────────────────────────────────────────────────────
  const [liveData,   setLiveData]   = useState<RoleGroup[]>(ROLES_DATA);

  // ── View state ────────────────────────────────────────────────────────────
  const [search,     setSearch]     = useState('');
  const [sortState,  setSortState]  = useState<RoleSortState | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Default: expand all trade groups visible in view mode
    const keys = new Set<string>();
    ROLES_DATA.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
    return keys;
  });
  const [activeMap,  setActiveMap]  = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    ROLES_DATA.forEach(g => { m[g.id] = g.active; g.children.forEach(c => { m[c.id] = c.active; }); });
    return m;
  });
  const [clearHover, setClearHover] = useState(false);
  const [colWidths, setColWidths]   = useState({
    nameView: COL_ROLE_NAME_VIEW,
    name:     COL_ROLE_NAME,
    code:     COL_CODE,
    trade:    COL_TRADE,
  });
  function onColDelta(key: string, delta: number) {
    setColWidths(prev => {
      const minW = key === 'code' ? 72 : key === 'trade' ? 100 : 120;
      return { ...prev, [key]: Math.max(minW, (prev as Record<string, number>)[key] + delta) };
    });
  }

  // ── Import / Export modal state ───────────────────────────────────────────
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  // ── Role-in-use blocking modal ────────────────────────────────────────────
  const [roleInUseModal, setRoleInUseModal] = useState<{ roleName: string; memberCount: number } | null>(null);

  // ── Edit state ────────────────────────────────────────────────────────────
  const [editMode,    setEditMode]    = useState(false);
  const [editGroups,  setEditGroups]  = useState<RoleGroup[]>([]);
  const [groupByTrade, setGroupByTrade] = useState(true);
  const [validationAttempted, setValidationAttempted] = useState(false);

  // ── Scroll ref for the table body ────────────────────────────────────────
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // ── Drag state ─────────────────────────────────────────────────────────────
  // Refs: stable values read inside mouse-event closures (no stale closure risk)
  const dragItemRef    = useRef<DragItem | null>(null);
  const dropTargetRef  = useRef<DropTarget | null>(null);
  const editGroupsRef  = useRef(editGroups);
  const liveDataRef    = useRef(liveData);
  const editModeRef    = useRef(editMode);
  const expandedRef    = useRef(expanded);
  const prevExpandedRef = useRef<Set<string> | null>(null); // saved before group collapse
  const rafRef         = useRef<number | null>(null);

  // Keep refs in sync with state
  useEffect(() => { editGroupsRef.current = editGroups; }, [editGroups]);
  useEffect(() => { liveDataRef.current   = liveData;   }, [liveData]);
  useEffect(() => { editModeRef.current   = editMode;   }, [editMode]);
  useEffect(() => { expandedRef.current   = expanded;   }, [expanded]);

  // State: triggers re-renders for visual feedback
  const [isDragging,  setIsDragging]  = useState(false);
  const [draggingId,  setDraggingId]  = useState<string | null>(null);
  const [previewPos,  setPreviewPos]  = useState({ x: 0, y: 0 });
  const [dropTarget,  setDropTarget]  = useState<DropTarget | null>(null);
  // Row hover — shared state drives row background when handle or action is hovered
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Grabbing cursor on body while dragging
  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : '';
    return () => { document.body.style.cursor = ''; };
  }, [isDragging]);

  // ── Perform drop ──────────────────────────────────────────────────────────
  function performDrop(target: DropTarget) {
    const item   = dragItemRef.current!;
    const isEdit = editModeRef.current;
    const data: RoleGroup[] = JSON.parse(JSON.stringify(isEdit ? editGroupsRef.current : liveDataRef.current));

    if (item.type === 'group' && target.type === 'group') {
      const fromIdx = data.findIndex(g => g.id === item.groupId);
      const [removed] = data.splice(fromIdx, 1);
      const toIdx = data.findIndex(g => g.id === target.groupId);
      data.splice(target.pos === 'before' ? toIdx : toIdx + 1, 0, removed);
      prevExpandedRef.current = null; // keep collapsed after reorder
      if (isEdit) setEditGroups(data); else setLiveData(data);

    } else if (item.type === 'child') {
      if (target.type === 'trade-group-end') {
        // Edit-mode: update trade field in-place; role stays in its role group
        for (const g of data) {
          const child = g.children.find(c => c.id === item.childId);
          if (child) {
            child.trade = target.tradeId === '__unassigned__' ? null : target.tradeId;
            break;
          }
        }
        // Auto-expand the target trade group so user sees the result
        setExpanded(prev => new Set([...prev, target.tradeId]));
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }

      // In edit mode, dropping a child onto another child = change trade to match target child's trade
      if (isEdit && target.type === 'child') {
        let targetTrade: string | null = null;
        for (const g of data) {
          const tc = g.children.find(c => c.id === target.childId);
          if (tc) { targetTrade = tc.trade; break; }
        }
        for (const g of data) {
          const src = g.children.find(c => c.id === item.childId);
          if (src) { src.trade = targetTrade; break; }
        }
        if (targetTrade) setExpanded(prev => new Set([...prev, targetTrade!]));
        setEditGroups(data);
        return;
      }

      // View mode: physically reorder child across role groups
      let removed: RoleChild | null = null;
      for (const g of data) {
        if (g.id === item.groupId) {
          const idx = g.children.findIndex(c => c.id === item.childId);
          if (idx >= 0) { [removed] = g.children.splice(idx, 1); break; }
        }
      }
      if (!removed) return;

      if (target.type === 'child') {
        for (const g of data) {
          if (g.id === target.groupId) {
            const toIdx = g.children.findIndex(c => c.id === target.childId);
            g.children.splice(target.pos === 'before' ? toIdx : toIdx + 1, 0, removed);
            break;
          }
        }
      } else if (target.type === 'group-end') {
        for (const g of data) {
          if (g.id === target.groupId) { g.children.push(removed); break; }
        }
        setExpanded(prev => new Set([...prev, target.groupId]));
      }
      if (isEdit) setEditGroups(data); else setLiveData(data);
    }
  }

  // ── Mouse down on drag handle ─────────────────────────────────────────────
  function onHandleMouseDown(e: React.MouseEvent, item: DragItem) {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    let started  = false;

    const onMove = (me: MouseEvent) => {
      // Threshold: 5px before activating drag
      if (!started) {
        const d = Math.hypot(me.clientX - startX, me.clientY - startY);
        if (d < 5) return;
        started = true;
        setIsDragging(true);
        setDraggingId(item.type === 'group' ? item.groupId : item.childId);

        // Tier 1: collapse all so user sees the group order clearly
        if (item.type === 'group') {
          prevExpandedRef.current = new Set(expandedRef.current);
          setExpanded(new Set());
        }
      }

      // Throttle state updates with RAF for smooth preview
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

      if (started && dropTargetRef.current) {
        performDrop(dropTargetRef.current);
      } else if (started && item.type === 'group' && prevExpandedRef.current) {
        // Cancelled group drag → restore expanded state
        setExpanded(prevExpandedRef.current);
        prevExpandedRef.current = null;
      }

      dragItemRef.current  = null;
      dropTargetRef.current = null;
      setIsDragging(false);
      setDraggingId(null);
      setDropTarget(null);
    };

    dragItemRef.current = item;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  // ── Drop indicator helpers ────────────────────────────────────────────────
  function groupIndicator(groupId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'group' && dropTarget.groupId === groupId) {
      return { boxShadow: dropTarget.pos === 'before' ? 'inset 0 2px 0 0 #4D7CFE' : 'inset 0 -2px 0 0 #4D7CFE' };
    }
    if (dropTarget.type === 'group-end' && dropTarget.groupId === groupId) {
      // Highlight whole group header to show "drop here to add"
      return { boxShadow: 'inset 0 0 0 2px #4D7CFE', background: '#EBF3FF' };
    }
    return {};
  }

  function tradeGroupIndicator(tradeId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'trade-group-end' && dropTarget.tradeId === tradeId) {
      return { boxShadow: 'inset 0 0 0 2px #1890FF', background: '#E6F7FF' };
    }
    return {};
  }

  function childIndicator(childId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'child' && dropTarget.childId === childId) {
      return { boxShadow: dropTarget.pos === 'before' ? 'inset 0 2px 0 0 #4D7CFE' : 'inset 0 -2px 0 0 #4D7CFE' };
    }
    return {};
  }

  // ── Enter / exit edit mode ────────────────────────────────────────────────
  function enterEditMode() {
    setEditGroups(JSON.parse(JSON.stringify(liveData)));
    setValidationAttempted(false);
    // Expand all keys matching current groupByTrade mode
    const keys = new Set<string>();
    if (groupByTrade) {
      liveData.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
    } else {
      liveData.forEach(g => keys.add(g.id));
    }
    setExpanded(keys);
    setEditMode(true);
  }
  function cancelEdit() {
    setValidationAttempted(false);
    setEditMode(false); setEditGroups([]);
    // Reset expanded keys to match current groupByTrade mode
    const keys = new Set<string>();
    if (groupByTrade) {
      liveData.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
    } else {
      liveData.forEach(g => keys.add(g.id));
    }
    setExpanded(keys);
  }
  function restoreToDefault() {
    setEditGroups(JSON.parse(JSON.stringify(ROLES_DATA)));
    setExpanded(new Set(ROLES_DATA.map(g => g.id)));
    setShowRestoreConfirm(false);
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
    // Reset expanded keys to match current groupByTrade mode
    const keys = new Set<string>();
    if (groupByTrade) {
      editGroups.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
    } else {
      editGroups.forEach(g => keys.add(g.id));
    }
    setExpanded(keys);
    setEditMode(false); setEditGroups([]);
  }

  // ── Edit helpers ──────────────────────────────────────────────────────────
  function updG(gId: string, f: keyof Pick<RoleGroup,'name'|'code'|'description'>, v: string) {
    setEditGroups(p => p.map(g => g.id === gId ? { ...g, [f]: v } : g));
  }
  function updC(gId: string, cId: string, f: keyof Pick<RoleChild,'name'|'code'|'description'>, v: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.map(c => c.id === cId ? { ...c, [f]: v } : c) }));
  }
  function updCTrade(gId: string, cId: string, trade: string | null) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.map(c => c.id === cId ? { ...c, trade } : c) }));
    // Auto-expand the target trade group (or Unassigned) so the role is immediately visible after moving
    const targetKey = trade ?? '__unassigned__';
    setExpanded(prev => new Set([...prev, targetKey]));
  }
  function delGroup(gId: string) {
    const group = editGroups.find(g => g.id === gId);
    if (!group) return;
    // Check group name + all children names
    const roleNames = [group.name, ...group.children.map(c => c.name)].filter(Boolean);
    const count = countAssignedMembers(roleNames);
    if (count > 0) {
      setRoleInUseModal({ roleName: group.name, memberCount: count });
      return;
    }
    setEditGroups(p => p.filter(g => g.id !== gId));
  }
  function delChild(gId: string, cId: string) {
    const group  = editGroups.find(g => g.id === gId);
    const child  = group?.children.find(c => c.id === cId);
    if (!child) return;
    const count = countAssignedMembers([child.name]);
    if (count > 0) {
      setRoleInUseModal({ roleName: child.name, memberCount: count });
      return;
    }
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.filter(c => c.id !== cId) }));
  }

  function addSiblingGroup(gId: string) {
    const newId = uid();
    setEditGroups(p => { const a = [...p]; a.splice(a.findIndex(g => g.id === gId) + 1, 0, { id: newId, name: '', code: '', description: '', active: true, children: [] }); return a; });
    setExpanded(p => new Set([...p, newId]));
  }
  function addChildToGroup(gId: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: [...g.children, { id: uid(), name: '', code: '', description: '', active: true, trade: null }] }));
    setExpanded(p => new Set([...p, gId]));
  }
  function addSiblingChild(gId: string, cId: string, inheritTrade: string | null = null) {
    setEditGroups(p => p.map(g => {
      if (g.id !== gId) return g;
      const ch = [...g.children]; ch.splice(ch.findIndex(c => c.id === cId) + 1, 0, { id: uid(), name: '', code: '', description: '', active: true, trade: inheritTrade });
      return { ...g, children: ch };
    }));
  }
  function addRoleToTradeGroup(tradeKey: string) {
    const trade = tradeKey === '__unassigned__' ? null : tradeKey;
    setEditGroups(p => {
      const arr = JSON.parse(JSON.stringify(p)) as RoleGroup[];
      const targetGroup = arr.find(g => g.children.some(c => (c.trade ?? '__unassigned__') === tradeKey)) ?? arr[0];
      if (!targetGroup) return arr;
      targetGroup.children.push({ id: uid(), name: '', code: '', description: '', active: true, trade });
      return arr;
    });
    setExpanded(prev => new Set([...prev, tradeKey]));
  }

  function addNewRole() {
    const scrollToBottom = () => {
      setTimeout(() => {
        const el = tableScrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      }, 50);
    };

    if (groupByTrade) {
      // Add a new role with null trade → will appear in Unassigned section
      setEditGroups(p => {
        const arr = JSON.parse(JSON.stringify(p)) as RoleGroup[];
        if (arr.length === 0) {
          arr.push({ id: uid(), name: 'New Group', code: '', description: '', active: true, children: [] });
        }
        arr[arr.length - 1].children.push({ id: uid(), name: '', code: '', description: '', active: true, trade: null });
        return arr;
      });
      // Ensure Unassigned trade group is expanded so the new row is visible
      setExpanded(prev => new Set([...prev, '__unassigned__']));
      scrollToBottom();
    } else {
      // Flat list: add to the last group's children
      setEditGroups(p => {
        const arr = JSON.parse(JSON.stringify(p)) as RoleGroup[];
        if (arr.length === 0) {
          arr.push({ id: uid(), name: 'New Group', code: '', description: '', active: true, children: [] });
        }
        arr[arr.length - 1].children.push({ id: uid(), name: '', code: '', description: '', active: true, trade: null });
        return arr;
      });
      scrollToBottom();
    }
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  function handleSort(key: RoleSortKey) {
    setSortState(p => !p || p.key !== key ? { key, dir: 'asc' } : p.dir === 'asc' ? { key, dir: 'desc' } : null);
  }

  // ── Expand ────────────────────────────────────────────────────────────────
  function toggleExpanded(id: string) { setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function expandAll() {
    const keys = new Set<string>();
    if (editMode && !groupByTrade) {
      editGroups.forEach(g => keys.add(g.id));
    } else {
      const data = editMode ? editGroups : liveData;
      data.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
    }
    setExpanded(keys);
  }
  function collapseAll() { setExpanded(new Set()); }

  // ── Toggle active ─────────────────────────────────────────────────────────
  function toggleActive(id: string) {
    const group = liveData.find(g => g.id === id);
    setActiveMap(p => {
      const n = { ...p, [id]: !p[id] };
      if (group) {
        // Toggling a group → all children follow
        const s = n[id];
        group.children.forEach(c => { n[c.id] = s; });
      } else {
        // Toggling a child → derive group state from all siblings
        const parentGroup = liveData.find(g => g.children.some(c => c.id === id));
        if (parentGroup) {
          const anyActive = parentGroup.children.some(c => (c.id === id ? n[id] : (n[c.id] ?? c.active)));
          n[parentGroup.id] = anyActive;
        }
      }
      return n;
    });
  }

  // ── Filtered + sorted ─────────────────────────────────────────────────────
  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';
  const viewGroups = useMemo(() => {
    let groups = liveData.map(g => {
      const gM = g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
      const mc  = q ? g.children.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) : g.children;
      if (!q) return { ...g, matchedChildren: mc };
      if (gM || mc.length > 0) return { ...g, matchedChildren: mc };
      return null;
    }).filter(Boolean) as (RoleGroup & { matchedChildren: RoleChild[] })[];

    if (sortState) {
      const { key, dir } = sortState; const mul = dir === 'asc' ? 1 : -1;
      groups = [...groups].sort((a, b) => {
        let av: string | boolean = '', bv: string | boolean = '';
        if      (key === 'name')        { av = a.name;        bv = b.name; }
        else if (key === 'code')        { av = a.code;        bv = b.code; }
        else if (key === 'description') { av = a.description; bv = b.description; }
        else if (key === 'active')      { av = activeMap[a.id] ?? a.active; bv = activeMap[b.id] ?? b.active; }
        if (typeof av === 'boolean') return ((bv ? 1 : 0) - (av ? 1 : 0)) * mul;
        return av.localeCompare(bv as string) * mul;
      });
    }
    return groups;
  }, [q, sortState, activeMap, liveData]);

  // ── Trade-based view groups (view mode only) ──────────────────────────────
  const tradeViewGroups = useMemo(() => {
    // Flatten all roles from all groups, preserving groupId for DnD continuity
    const allRoles: (RoleChild & { groupId: string })[] = [];
    liveData.forEach(g => g.children.forEach(c => allRoles.push({ ...c, groupId: g.id })));

    // Apply search filter
    const filtered = q
      ? allRoles.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.code.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (tradeById(r.trade)?.name.toLowerCase().includes(q) ?? false)
        )
      : allRoles;

    // Group by trade
    const tradeMap = new Map<string, (RoleChild & { groupId: string })[]>();
    filtered.forEach(role => {
      const key = role.trade ?? '__unassigned__';
      if (!tradeMap.has(key)) tradeMap.set(key, []);
      tradeMap.get(key)!.push(role);
    });

    // Build sorted list — assigned trades alphabetically, unassigned last
    const groups: { key: string; tradeName: string; tradeCode: string; roles: (RoleChild & { groupId: string })[] }[] = [];
    for (const [key, roles] of tradeMap) {
      if (key === '__unassigned__') continue;
      const t = tradeById(key);
      groups.push({ key, tradeName: t?.name ?? key, tradeCode: t?.code ?? '', roles });
    }
    groups.sort((a, b) => a.tradeName.localeCompare(b.tradeName));

    // Apply sort within each group
    if (sortState) {
      const { key: sk, dir } = sortState; const mul = dir === 'asc' ? 1 : -1;
      groups.forEach(g => {
        g.roles.sort((a, b) => {
          const av = sk === 'name' ? a.name : sk === 'code' ? a.code : a.description;
          const bv = sk === 'name' ? b.name : sk === 'code' ? b.code : b.description;
          return av.localeCompare(bv) * mul;
        });
      });
    }

    // Unassigned group at end
    const unassigned = tradeMap.get('__unassigned__') ?? [];
    if (unassigned.length > 0) {
      groups.push({ key: '__unassigned__', tradeName: 'Unassigned', tradeCode: '—', roles: unassigned });
    }

    return groups;
  }, [liveData, q, sortState]);

  const displayGroups = editMode
    ? editGroups.map(g => ({ ...g, matchedChildren: g.children }))
    : viewGroups;

  // ── Edit-mode trade-based groups (mirrors tradeViewGroups but from editGroups) ─
  const editTradeGroups = useMemo(() => {
    if (!editMode) return [] as typeof tradeViewGroups;
    const allRoles: (RoleChild & { groupId: string })[] = [];
    editGroups.forEach(g => g.children.forEach(c => allRoles.push({ ...c, groupId: g.id })));
    const tradeMap = new Map<string, (RoleChild & { groupId: string })[]>();
    allRoles.forEach(role => {
      const key = role.trade ?? '__unassigned__';
      if (!tradeMap.has(key)) tradeMap.set(key, []);
      tradeMap.get(key)!.push(role);
    });
    const groups: { key: string; tradeName: string; tradeCode: string; roles: (RoleChild & { groupId: string })[] }[] = [];
    for (const [key, roles] of tradeMap) {
      if (key === '__unassigned__') continue;
      const t = tradeById(key);
      groups.push({ key, tradeName: t?.name ?? key, tradeCode: t?.code ?? '', roles });
    }
    groups.sort((a, b) => a.tradeName.localeCompare(b.tradeName));
    const unassigned = tradeMap.get('__unassigned__') ?? [];
    if (unassigned.length > 0) {
      groups.push({ key: '__unassigned__', tradeName: 'Unassigned', tradeCode: '—', roles: unassigned });
    }
    return groups;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editGroups, editMode]);

  const editErrors = (editMode && validationAttempted) ? computeEditErrors(editGroups) : new Map<string, string>();

  const showClear = search.length > 0;
  const cellBase = (w: number | string): React.CSSProperties => ({
    ...(typeof w === 'number' ? { width: w, flexShrink: 0 } : { flex: 1, minWidth: 0 }),
    display: 'flex', alignItems: 'center', height: '100%', overflow: 'hidden',
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', background: 'white', overflow: 'hidden', minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8, userSelect: isDragging ? 'none' : undefined }}>

      {/* Drag preview portal */}
      {isDragging && dragItemRef.current && (
        <DragPreview x={previewPos.x} y={previewPos.y} item={dragItemRef.current} />
      )}

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>

        {/* ── LEFT: view mode ── */}
        {!editMode && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 276, flexShrink: 0 }}>
              <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}><SearchIcon /></div>
              <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')}
              />
              {showClear && (
                <button onClick={() => setSearch('')} onMouseEnter={() => setClearHover(true)} onMouseLeave={() => setClearHover(false)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHover ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>
            {/* Vertical divider */}
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />

            {/* Group by Trade toggle — view mode */}
            <GroupByTradeToggle value={groupByTrade} onChange={v => {
              setGroupByTrade(v);
              const keys = new Set<string>();
              if (v) {
                liveData.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
              } else {
                liveData.forEach(g => keys.add(g.id));
              }
              setExpanded(keys);
            }} />

            {/* Vertical divider */}
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />

            <ToolbarButton onClick={expandAll} disabled={!groupByTrade}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor" /></svg><span>Expand All</span></ToolbarButton>
            <ToolbarButton onClick={collapseAll} disabled={!groupByTrade}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor" /></svg><span>Collapse All</span></ToolbarButton>
          </div>
        )}

        {/* ── LEFT: edit mode ── */}
        {editMode && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* + Add Role button — Secondary Medium §15.2 */}
            <AddRoleButton onClick={addNewRole} />

            {/* Vertical divider */}
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />

            {/* Group by Trade toggle */}
            <GroupByTradeToggle value={groupByTrade} onChange={v => {
              setGroupByTrade(v);
              // Update expanded keys to match the new grouping mode
              const keys = new Set<string>();
              if (v) {
                editGroups.forEach(g => g.children.forEach(c => keys.add(c.trade ?? '__unassigned__')));
              } else {
                editGroups.forEach(g => keys.add(g.id));
              }
              setExpanded(keys);
            }} />

            {/* Expand All / Collapse All — always visible; disabled when groupByTrade is OFF */}
            <ToolbarButton onClick={expandAll} disabled={!groupByTrade}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor" /></svg>
              <span>Expand All</span>
            </ToolbarButton>
            <ToolbarButton onClick={collapseAll} disabled={!groupByTrade}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor" /></svg>
              <span>Collapse All</span>
            </ToolbarButton>
          </div>
        )}

        {/* ── RIGHT ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editMode ? (
            <>
              <RestoreDefaultButton onClick={() => setShowRestoreConfirm(true)} />
              <CancelButton onClick={cancelEdit} />
              <SaveButton onClick={saveEdit} />
            </>
          ) : (
            <>
              <button onClick={downloadRolesTemplate} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#1890FF', textDecoration: 'underline', whiteSpace: 'nowrap' }}>Download Import Template</button>
              <SecondaryButton onClick={() => setImportOpen(true)}><ImportIcon /><span>Import</span></SecondaryButton>
              <SecondaryButton onClick={() => setExportOpen(true)}><ExportIcon /><span>Export</span></SecondaryButton>
              <PrimaryEditButton onClick={enterEditMode} />
            </>
          )}
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div ref={tableScrollRef} style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <div style={{ minWidth: editMode
          ? COL_DRAG + colWidths.name + colWidths.code + colWidths.trade + 200 + COL_ACTIONS
          : colWidths.nameView + colWidths.code + (groupByTrade ? 0 : colWidths.trade) + 200
        }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
            {/* drag col placeholder in header */}
            {editMode && <div style={{ width: COL_DRAG, flexShrink: 0, background: '#FAFAFA' }} />}
            <RoleHeaderCell label={editMode ? <><span>Name</span><span style={{ color: '#FF4D4F', marginLeft: 2 }}>*</span></> : 'Name'} sortKey="name" sortState={sortState} onSort={() => handleSort('name')} style={{ width: editMode ? colWidths.name : colWidths.nameView }} editMode={editMode} colKey={editMode ? 'name' : 'nameView'} onDelta={onColDelta} />
            <RoleHeaderCell label="Code"        sortKey="code" sortState={sortState} onSort={() => handleSort('code')} style={{ width: colWidths.code }} editMode={editMode} colKey="code" onDelta={onColDelta} />
            {editMode && (
              <RoleHeaderCell label="Trade" sortKey={null} sortState={sortState} onSort={() => {}} style={{ width: colWidths.trade }} editMode colKey="trade" onDelta={onColDelta} />
            )}
            {!editMode && !groupByTrade && (
              <RoleHeaderCell label="Trade" sortKey={null} sortState={sortState} onSort={() => {}} style={{ width: colWidths.trade }} editMode={false} colKey="trade" onDelta={onColDelta} />
            )}
            <RoleHeaderCell label="Role description" sortKey={null} sortState={sortState} onSort={() => {}} style={{ flex: 1, minWidth: 0 }} editMode={editMode} />
            {editMode && (
              <RoleHeaderCell label="Actions" sortKey={null} sortState={sortState} onSort={() => {}} style={{ width: COL_ACTIONS }} align="center" editMode />
            )}
          </div>

          {/* ── Validation banner (edit mode) ──────────────────────── */}
          {editMode && <ValidationBanner count={editErrors.size} />}

          {/* ── VIEW MODE (groupByTrade OFF): Flat list — all roles without trade headers ── */}
          {!editMode && !groupByTrade && (() => {
            const flatRoles: (RoleChild & { groupId: string })[] = [];
            liveData.forEach(g => g.children.forEach(c => flatRoles.push({ ...c, groupId: g.id })));
            const filtered = q
              ? flatRoles.filter(r =>
                  r.name.toLowerCase().includes(q) ||
                  r.code.toLowerCase().includes(q) ||
                  r.description.toLowerCase().includes(q)
                )
              : flatRoles;
            if (filtered.length === 0) return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                No roles match your search.
              </div>
            );
            return filtered.map((role, idx) => {
              const childActive = activeMap[role.id] ?? role.active;
              return (
                <div key={role.id}
                  style={{
                    display: 'flex', alignItems: 'stretch', height: ROW_H,
                    background: 'white',
                    borderBottom: '1px solid #D9D9D9',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >
                  <div style={{ width: colWidths.nameView, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(role.name, search)}
                    </span>
                  </div>
                  <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#262626' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                      {highlightText(role.code, search)}
                    </span>
                  </div>
                  {/* Trade column — visible in view mode when groupByTrade is OFF */}
                  <div style={{ width: colWidths.trade, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                    {role.trade ? (() => {
                      const t = tradeById(role.trade);
                      return (
                        <>
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {highlightText(t?.name ?? role.trade, search)}
                          </span>
                        </>
                      );
                    })() : (
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#262626' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(role.description, search)}
                    </span>
                  </div>
                </div>
              );
            });
          })()}

          {/* ── VIEW MODE (groupByTrade ON): Trade-based group rows ──────────────────────── */}
          {!editMode && groupByTrade && tradeViewGroups.map(tradeGroup => {
            const isExpanded = expanded.has(tradeGroup.key);
            return (
              <div key={tradeGroup.key}>
                {/* Trade group header row — Gray/3 bg, 32px height */}
                <div
                  onClick={() => toggleExpanded(tradeGroup.key)}
                  style={{
                    display: 'flex', alignItems: 'stretch', height: 32,
                    background: '#F5F5F5', borderBottom: '1px solid #D9D9D9',
                    cursor: 'pointer',
                  }}
                >
                  {/* Chevron + Trade Name + Count pill */}
                  <div style={{ width: colWidths.nameView, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 8 }}>
                    <button onClick={e => { e.stopPropagation(); toggleExpanded(tradeGroup.key); }}
                      style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: 'pointer' }}>
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    {/* Trade name first */}
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, lineHeight: '20px', color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {highlightText(tradeGroup.tradeName, search)}
                    </span>
                    {/* Count pill after the name */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: '#D9D9D9', borderRadius: 9999,
                      padding: '1px 8px', flexShrink: 0,
                      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                      color: '#595959', whiteSpace: 'nowrap', lineHeight: '16px', gap: 3,
                    }}>
                      <span style={{ fontWeight: 600 }}>{tradeGroup.roles.length}</span>
                      <span>Roles</span>
                    </span>
                  </div>
                  {/* Trade Code pill */}
                  <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    {tradeGroup.tradeCode !== '—' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: '#E8E8E8', borderRadius: 4, padding: '2px 7px', fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#595959', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                        {tradeGroup.tradeCode}
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                    )}
                  </div>
                  {/* Description col — empty for trade header */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }} />
                </div>

                {/* Child role rows under this trade */}
                {isExpanded && tradeGroup.roles.map(role => {
                  const childActive = activeMap[role.id] ?? role.active;
                  return (
                    <div key={role.id}
                      style={{
                        display: 'flex', alignItems: 'stretch', height: ROW_H,
                        background: 'white', borderBottom: '1px solid #D9D9D9',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                    >
                      {/* Name — indented */}
                      <div style={{ width: colWidths.nameView, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12 + CHILD_INDENT, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#1D2C38' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {highlightText(role.name, search)}
                        </span>
                      </div>
                      {/* Code */}
                      <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#262626' : '#BFBFBF', whiteSpace: 'nowrap' }}>
                          {highlightText(role.code, search)}
                        </span>
                      </div>
                      {/* Description */}
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: childActive ? '#262626' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {highlightText(role.description, search)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {!editMode && groupByTrade && tradeViewGroups.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
              No roles match your search.
            </div>
          )}

          {/* ── EDIT MODE (group by trade OFF): Flat list — all roles from all groups ── */}
          {editMode && !groupByTrade && (() => {
            const flatRoles: (RoleChild & { groupId: string })[] = [];
            editGroups.forEach(g => g.children.forEach(c => flatRoles.push({ ...c, groupId: g.id })));
            if (flatRoles.length === 0) return null;
            return flatRoles.map((child, idx) => {
              const isChildHovered = !isDragging && hoveredRowId === child.id;
              // ── Inline Error Expansion §26 ─────────────────────────────────
              const rowHasError = editErrors.has(`c_${child.groupId}_${child.id}_name`) ||
                                  editErrors.has(`c_${child.groupId}_${child.id}_code`);
              const currentRowH = rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
              const cellAlign   = rowHasError ? 'flex-start' as const : 'center' as const;
              const cellPadTop  = rowHasError ? 8 : 0;
              return (
                <div key={child.id}
                  onMouseEnter={() => setHoveredRowId(child.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  style={{ display: 'flex', alignItems: 'stretch', height: currentRowH, background: isChildHovered ? '#F9FAFB' : idx % 2 === 0 ? 'white' : '#FAFAFA', borderBottom: '1px solid #D9D9D9', transition: 'background 0.1s' }}
                >
                  <DragHandle onMouseDown={e => onHandleMouseDown(e, { type: 'child', groupId: child.groupId, childId: child.id, label: child.name || 'Untitled Role' })} />
                  <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, gap: 6, paddingLeft: 12, paddingRight: 8, overflow: rowHasError ? 'visible' : 'hidden', position: 'relative', zIndex: rowHasError ? 2 : undefined }}>
                    <span title="Required" style={{ color: '#FF4D4F', fontSize: 13, lineHeight: 1, flexShrink: 0, alignSelf: 'center' }}>*</span>
                    <EditInput value={child.name} onChange={v => updC(child.groupId, child.id, 'name', v)} placeholder="Role name"
                      error={editErrors.has(`c_${child.groupId}_${child.id}_name`)}
                      errorMessage={editErrors.get(`c_${child.groupId}_${child.id}_name`)} />
                  </div>
                  <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: rowHasError ? 'visible' : 'hidden', position: 'relative', zIndex: rowHasError ? 2 : undefined }}>
                    <EditInput value={child.code} onChange={v => updC(child.groupId, child.id, 'code', v)} placeholder="Code"
                      error={editErrors.has(`c_${child.groupId}_${child.id}_code`)}
                      errorMessage={editErrors.get(`c_${child.groupId}_${child.id}_code`)} />
                  </div>
                  <div style={{ width: colWidths.trade, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8 }}>
                    <TradeDropdown value={child.trade} onChange={tradeId => updCTrade(child.groupId, child.id, tradeId)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                    <EditInput value={child.description} onChange={v => updC(child.groupId, child.id, 'description', v)} placeholder="Role description" />
                  </div>
                  <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, justifyContent: 'center', gap: 4, height: '100%', paddingLeft: 8, paddingRight: 8 }}>
                    <IconBtn onClick={() => delChild(child.groupId, child.id)} title="Delete role"><TrashIcon /></IconBtn>
                  </div>
                </div>
              );
            });
          })()}

          {/* ── EDIT MODE (group by trade ON): Trade-based group rows (trade headers non-editable, children editable) ── */}
          {editMode && groupByTrade && editTradeGroups.map(tradeGroup => {
            const isExpanded = expanded.has(tradeGroup.key);
            return (
              <div key={tradeGroup.key}>
                {/* ── Trade group header row — 32px, drop target for trade reassignment ── */}
                <div
                  data-row-type="trade-group"
                  data-row-id={tradeGroup.key}
                  onClick={() => toggleExpanded(tradeGroup.key)}
                  style={{
                    display: 'flex', alignItems: 'stretch', height: 32,
                    background: '#F5F5F5', borderBottom: '1px solid #D9D9D9',
                    cursor: 'pointer',
                    transition: 'background 0.1s, box-shadow 0.1s',
                    ...tradeGroupIndicator(tradeGroup.key),
                  }}
                >
                  {/* Drag placeholder (keeps columns aligned with child rows) */}
                  <div style={{ width: COL_DRAG, flexShrink: 0 }} />

                  {/* Chevron + Trade Name + Count pill */}
                  <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4, paddingRight: 8 }}>
                    <button onClick={e => { e.stopPropagation(); toggleExpanded(tradeGroup.key); }}
                      style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: 'pointer' }}>
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    {/* Trade name first */}
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, lineHeight: '20px', color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {tradeGroup.tradeName}
                    </span>
                    {/* Count pill after the name */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: '#D9D9D9', borderRadius: 9999,
                      padding: '1px 8px', flexShrink: 0,
                      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                      color: '#595959', whiteSpace: 'nowrap', lineHeight: '16px', gap: 3,
                    }}>
                      <span style={{ fontWeight: 600 }}>{tradeGroup.roles.length}</span>
                      <span>Roles</span>
                    </span>
                  </div>

                  {/* Trade Code pill */}
                  <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    {tradeGroup.tradeCode !== '—' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: '#E8E8E8', borderRadius: 4, padding: '2px 7px', fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#595959', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                        {tradeGroup.tradeCode}
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                    )}
                  </div>

                  {/* Trade column placeholder — empty */}
                  <div style={{ width: colWidths.trade, flexShrink: 0 }} />

                  {/* Description col — empty */}
                  <div style={{ flex: 1, minWidth: 0 }} />

                  {/* Actions col placeholder */}
                  <div style={{ width: COL_ACTIONS, flexShrink: 0 }} />
                </div>

                {/* ── Child role rows (Tier 2) — fully editable ─────────── */}
                {isExpanded && tradeGroup.roles.map(child => {
                  const isChildSrc     = draggingId === child.id;
                  const isChildHovered = !isDragging && hoveredRowId === child.id;
                  // ── Inline Error Expansion §26 ──────────────────────────
                  const rowHasError = editErrors.has(`c_${child.groupId}_${child.id}_name`) ||
                                      editErrors.has(`c_${child.groupId}_${child.id}_code`);
                  const currentRowH = rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
                  const cellAlign   = rowHasError ? 'flex-start' as const : 'center' as const;
                  const cellPadTop  = rowHasError ? 8 : 0;

                  return (
                    <div key={child.id}
                      data-row-type="child"
                      data-row-id={child.id}
                      data-group-id={child.groupId}
                      onMouseEnter={() => setHoveredRowId(child.id)}
                      onMouseLeave={() => setHoveredRowId(null)}
                      style={{
                        display: 'flex', alignItems: 'stretch', height: currentRowH,
                        background: isChildSrc ? '#F0F2F5' : isChildHovered ? '#F9FAFB' : 'white',
                        borderBottom: '1px solid #D9D9D9',
                        opacity: isChildSrc ? 0.4 : 1,
                        transition: 'background 0.1s, opacity 0.15s',
                        ...childIndicator(child.id),
                      }}
                    >
                      {/* Drag handle */}
                      <DragHandle onMouseDown={e => onHandleMouseDown(e, { type: 'child', groupId: child.groupId, childId: child.id, label: child.name || 'Untitled Role' })} />

                      {/* Role Name */}
                      <div style={{ ...cellBase(colWidths.name), alignItems: cellAlign, paddingTop: cellPadTop, gap: 6, paddingLeft: 4 + CHILD_INDENT, paddingRight: 8, overflow: rowHasError ? 'visible' : 'hidden', position: 'relative', zIndex: rowHasError ? 2 : undefined }}>
                        <span title="Required" style={{ color: '#FF4D4F', fontSize: 13, lineHeight: 1, flexShrink: 0, alignSelf: 'center' }}>*</span>
                        <EditInput
                          value={child.name}
                          onChange={v => updC(child.groupId, child.id, 'name', v)}
                          placeholder="Role name"
                          error={editErrors.has(`c_${child.groupId}_${child.id}_name`)}
                          errorMessage={editErrors.get(`c_${child.groupId}_${child.id}_name`)}
                        />
                      </div>

                      {/* Code */}
                      <div style={{ ...cellBase(colWidths.code), alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: rowHasError ? 'visible' : 'hidden', position: 'relative', zIndex: rowHasError ? 2 : undefined }}>
                        <EditInput value={child.code} onChange={v => updC(child.groupId, child.id, 'code', v)} placeholder="Code"
                          error={editErrors.has(`c_${child.groupId}_${child.id}_code`)}
                          errorMessage={editErrors.get(`c_${child.groupId}_${child.id}_code`)} />
                      </div>

                      {/* Trade dropdown */}
                      <div style={{ ...cellBase(colWidths.trade), alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8 }}>
                        <TradeDropdown
                          value={child.trade}
                          onChange={tradeId => updCTrade(child.groupId, child.id, tradeId)}
                        />
                      </div>

                      {/* Description */}
                      <div style={{ ...cellBase('flex'), alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8 }}>
                        <EditInput value={child.description} onChange={v => updC(child.groupId, child.id, 'description', v)} placeholder="Role description" />
                      </div>

                      {/* Actions */}
                      <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, justifyContent: 'center', gap: 4, height: '100%', paddingLeft: 8, paddingRight: 8 }}>
                        <IconBtn onClick={() => delChild(child.groupId, child.id)} title="Delete role"><TrashIcon /></IconBtn>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {editMode && (groupByTrade ? editTradeGroups.length === 0 : editGroups.flatMap(g => g.children).length === 0) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
              All roles have been removed.
            </div>
          )}
        </div>
      </div>

      {/* ── Import Roles Modal ────────────────────────────────────────────── */}
      <ImportRolesModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={(groups) => {
          // Replace all roles — modal stays open to show the summary,
          // user clicks "Close" on the summary screen to dismiss.
          setLiveData(groups);
        }}
      />

      {/* ── Export Roles Modal ────────────────────────────────────────────── */}
      <ExportRolesModal isOpen={exportOpen} onClose={() => setExportOpen(false)} roles={liveData} tradeItems={TRADE_ITEMS} />

      {/* ── Restore to Default Confirmation ───────────────────────────────── */}
      {showRestoreConfirm && (
        <RestoreConfirmModal
          onConfirm={restoreToDefault}
          onCancel={() => setShowRestoreConfirm(false)}
        />
      )}

      {/* ── Role In Use — blocking modal ───────────────────────────────────── */}
      {roleInUseModal && (
        <RoleInUseModal
          roleName={roleInUseModal.roleName}
          memberCount={roleInUseModal.memberCount}
          onClose={() => setRoleInUseModal(null)}
        />
      )}
    </div>
  );
}

// ─── Toolbar helpers ──────────────────────────────────���───────────────────────
function ToolbarButton({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        height: 36, display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 12, paddingRight: 12,
        background: (!disabled && hovered) ? '#F5F6F7' : 'transparent',
        border: 'none', borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        color: disabled ? '#BFBFBF' : '#384857',
        whiteSpace: 'nowrap', transition: 'background 0.15s',
        opacity: disabled ? 0.5 : 1,
      }}>
      {children}
    </button>
  );
}
function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 12, paddingRight: 12, background: hovered ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hovered ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
      {children}
    </button>
  );
}
// ─── Add Role Button — Secondary Medium (§15.2) ────────────────────────────
function AddRoleButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: hovered ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hovered ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', flexShrink: 0 }}>
      <svg width="14" height="14" viewBox="0 0 12.46 12.46" fill="none">
        <path d={plusPaths.p23895d90} stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span>Add Role</span>
    </button>
  );
}

// ─── Group by Trade Toggle ─────────────────────────────────────────────────
function GroupByTradeToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => onChange(!value)}>
      {/* Toggle track */}
      <div style={{ width: 40, height: 20, borderRadius: 10, background: value ? '#243746' : '#D9D9D9', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 2, left: value ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
      </div>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', userSelect: 'none' }}>Group by Trade</span>
    </div>
  );
}

function PrimaryEditButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: hovered ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: 'white', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      <EditPencilIcon /><span>Edit</span>
    </button>
  );
}
function CancelButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: hovered ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hovered ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
      Cancel
    </button>
  );
}
function SaveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={disabled ? 'Fix all validation errors before saving' : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: disabled ? '#FFBD9C' : hovered ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: 'white', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      Save changes
    </button>
  );
}

// ─── Restore to Default — Tertiary button (§15.3) ─────────────────────────────
function RestoreDefaultButton({ onClick }: { onClick: () => void }) {
  const [hovered,  setHovered]  = useState(false);
  const [pressed,  setPressed]  = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        height: 36,
        display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 16, paddingRight: 16,
        background: pressed ? '#616D79' : hovered ? '#E5E7E9' : 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        color: pressed ? '#FFFFFF' : '#616D79',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      {/* Rotate-left / restore icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2.5 4.5A6 6 0 1 1 2 8" stroke={pressed ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.15s' }} />
        <path d="M2.5 1.5v3h3" stroke={pressed ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.15s' }} />
      </svg>
      Restore to default
    </button>
  );
}

// ─── Restore Confirm Modal ────────────────────────────────────────────────────
function RestoreConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [typed,          setTyped]          = useState('');
  const [inputFocused,   setInputFocused]   = useState(false);
  const [confirmHovered, setConfirmHovered] = useState(false);
  const [cancelHovered,  setCancelHovered]  = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMatch = typed.toLowerCase() === 'restore';

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.35)' }}
        onClick={onCancel}
      />

      {/* Modal shell */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', zIndex: 501,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 420,
          maxWidth: 'calc(100vw - 32px)',
          backgroundColor: '#F5F5F5',
          borderRadius: 10,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* White content area */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '12px 24px 24px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              lineHeight: '26px',
              color: '#1D2C38',
            }}>
              Restore to default?
            </span>
            <button
              onClick={onCancel}
              aria-label="Close"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#F0F0F0', marginBottom: 20 }} />

          {/* Warning icon + body */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            {/* Warning icon */}
            <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 0 0 2.908 18h14.184a1.75 1.75 0 0 0 1.515-2.5L11.515 2.929a1.75 1.75 0 0 0-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#384857', margin: 0 }}>
                This will <strong style={{ fontWeight: 600, color: '#1D2C38' }}>replace all your current edits</strong> with the original default roles. Any custom groups, roles, codes, or descriptions you've added will be permanently lost.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#8C8C8C', margin: '8px 0 0' }}>
                This action <strong style={{ fontWeight: 600 }}>cannot be undone.</strong>
              </p>
            </div>
          </div>

          {/* Typed confirmation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
              Type <strong style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1D2C38' }}>restore</strong> to confirm
            </label>
            <input
              ref={inputRef}
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder="restore"
              autoComplete="off"
              spellCheck={false}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                height: 36,
                paddingLeft: 10, paddingRight: 10,
                border: `1px solid ${isMatch ? '#B7EB8F' : inputFocused ? '#91D5FF' : '#D0D5DD'}`,
                borderRadius: 4,
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 14, fontWeight: 400, lineHeight: '20px',
                color: '#344054',
                background: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box',
                width: '100%',
                transition: 'border-color 0.15s',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#F5F5F5', height: 72, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, paddingRight: 24, borderTop: '1px solid #C3C7CC' }}>
          <button
            onClick={onCancel}
            onMouseEnter={() => setCancelHovered(true)}
            onMouseLeave={() => setCancelHovered(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: cancelHovered ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${cancelHovered ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}
          >
            Keep editing
          </button>

          <button
            onClick={isMatch ? onConfirm : undefined}
            disabled={!isMatch}
            onMouseEnter={() => setConfirmHovered(true)}
            onMouseLeave={() => setConfirmHovered(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: !isMatch ? '#BFBFBF' : confirmHovered ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: isMatch ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
          >
            Yes, restore default
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}