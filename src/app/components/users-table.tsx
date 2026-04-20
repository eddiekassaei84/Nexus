import React, {
  useState, useEffect, useMemo, useCallback,
  useContext, createContext, useRef,
} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import svgPaths1 from '../../imports/svg-fynbzyrtwq';
import svgPaths2 from '../../imports/svg-o83jhbud1k';
import svgTableList from '../../imports/svg-2six7ebrf6';
import checkboxPaths from '../../imports/svg-k8hgzstpgn';
import svgDownload from '../../imports/svg-yjrzoufxgw';
import svgColSetting from '../../imports/svg-2lc95mvujv';
import svgArrows from '../../imports/svg-1sdg7j51wm';
import imgAvatar from 'figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png';
import { ImportCSVModal } from './import-csv-modal';
import { ExportCSVModal } from './export-csv-modal';
import { PersonalInfoPanel } from './personal-info-panel';
import type { PanelUser } from './personal-info-panel';
import { FilterPanel, EMPTY_CONFIG } from './filter-panel';
import type { FilterConfig } from './filter-panel';
import { ColumnSettingsPanel, DEFAULT_COL_SETTINGS } from './column-settings-panel';
import type { ColSetting, TableDensity } from './column-settings-panel';
import { SelectionActionBar } from './selection-action-bar';
import { BulkEditPanel } from './bulk-edit-panel';

const sp = { ...svgPaths1, ...svgPaths2 };

// ─── Layout constants ─────────────────────────────────────────────────────────
const CHECKBOX_W = 48;
const ACTIONS_W  = 60;
const PAGE_SIZE  = 20;  // 20 rows per page with scroll
const DRAG_TYPE  = 'GROUPBY_COL';
const STORAGE_KEY_PREFIX = 'inertia-nexus-groupby';

// ─── Text measurement ─────────────────────────────────────────────────────────
let _cvs: HTMLCanvasElement | null = null;
function measureLabel(text: string): number {
  try {
    if (typeof document === 'undefined') return text.length * 8;
    if (!_cvs) _cvs = document.createElement('canvas');
    const ctx = _cvs.getContext('2d')!;
    ctx.font = '600 13px "Open Sans", sans-serif';
    return Math.ceil(ctx.measureText(text).width);
  } catch { return text.length * 8; }
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface User {
  id: number; name: string; email: string; jobTitle: string;
  company: string; office: string; accessLevel: string; permissionType: string; userType: string;
  teams: { initials: string; bg: string; text: string }[];
  /** User Account Status — registration/invitation state */
  status: 'Registered' | 'Pending Invitation' | 'Expired Invitation';
  /** Membership Status — only set when status === 'Registered' */
  membershipStatus?: 'Active' | 'Suspended';
  invitedAt?: string;
}
interface ColDef {
  key: string; label: string; groupable: boolean; getValue: (u: User) => string;
}
interface GroupNode {
  id: string; columnKey: string; columnLabel: string; value: string;
  users: User[]; children: GroupNode[] | null;
}
type DragItem   = { key: string; label: string; groupable: boolean };
type SortDir    = 'asc' | 'desc';
type SortState  = { key: string; dir: SortDir } | null;

// ─── Table context (widths + sort + selection) ────────────────────────────────
interface TableCtxType {
  resizedWidths: Record<string, number>;
  onResize: (key: string, w: number) => void;
  onResizeAll: (widths: Record<string, number>) => void;
  sortState: SortState;
  onSort: (key: string) => void;
  selectedIds: Set<number>;
  toggleRow: (id: number) => void;
  allVisibleSelected: boolean;
  someVisibleSelected: boolean;
  toggleSelectAll: () => void;
  onAddUser: () => void;
  onInfoClick: (user: User) => void;
  hiddenCols:          Set<string>;
  colOrder:            string[];
  onFilterClick:       () => void;
  filterCount:         number;
  onResetFilter:       () => void;
  showColSettings:     boolean;
  onColSettingsClick:  () => void;
  colSettingsBtnRef:   React.RefObject<HTMLButtonElement | null>;
  searchQuery:         string;
  onSearchChange:      (q: string) => void;
  rowHeight:           number;
  groupRowHeight:      number;
  freezeCount:         number;
  frozenMap:           Map<string, { left: number; width: number }>;
}
const _defaultBtnRef = React.createRef<HTMLButtonElement | null>();
const TableCtx = createContext<TableCtxType>({
  resizedWidths: {}, onResize: () => {}, onResizeAll: () => {}, sortState: null, onSort: () => {},
  selectedIds: new Set(), toggleRow: () => {},
  allVisibleSelected: false, someVisibleSelected: false, toggleSelectAll: () => {},
  onAddUser: () => {},
  onInfoClick: () => {},
  hiddenCols:         new Set(),
  colOrder:           DEFAULT_COL_SETTINGS.filter(s => s.key !== 'user').map(s => s.key),
  onFilterClick:      () => {},
  filterCount:        0,
  onResetFilter:      () => {},
  showColSettings:    false,
  onColSettingsClick: () => {},
  colSettingsBtnRef:  _defaultBtnRef,
  searchQuery:        '',
  onSearchChange:     () => {},
  rowHeight:          48,
  groupRowHeight:     32,
  freezeCount:        0,
  frozenMap:          new Map(),
});

// ─── Mock data ────────────────────────────────────────────────────────────────
export const INITIAL_USERS: User[] = [
  { id:  1, name: 'Captain Levi',    email: 'levi@henrichadvisory.com',   jobTitle: 'VDC Manager',         company: 'Henrich Advisory', office: 'Boston',   accessLevel: 'VDC Manager',               permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'AR',bg:'#dde9ff',text:'#465fff'},{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}], status:'Registered', membershipStatus:'Active'    },
  { id:  2, name: 'Anna Kovacs',      email: 'anna.k@henrichadvisory.com', jobTitle: 'BIM Coordinator',     company: 'Henrich Advisory', office: 'Boston',   accessLevel: 'BIM Coordinator',           permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'AR',bg:'#dde9ff',text:'#465fff'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id:  3, name: 'Marcus Reed',      email: 'mreed@henrichadvisory.com',  jobTitle: 'Site Supervisor',     company: 'Henrich Advisory', office: 'New York', accessLevel: 'Superintendent',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}],                                          status:'Registered', membershipStatus:'Suspended' },
  { id:  4, name: 'Dana Whitfield',   email: 'dana@henrichadvisory.com',   jobTitle: 'Project Architect',   company: 'Henrich Advisory', office: 'New York', accessLevel: 'Architect',                 permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'BM',bg:'#e6f4ea',text:'#1e7e34'},{initials:'AR',bg:'#dde9ff',text:'#465fff'}], status:'Registered', membershipStatus:'Active'    },
  { id:  5, name: 'James Obi',        email: 'james.obi@techcorp.com',     jobTitle: 'Structural Engineer', company: 'TechCorp',         office: 'Chicago',  accessLevel: 'Structural Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SE',bg:'#fff3e0',text:'#e65100'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id:  6, name: 'Priya Mehta',      email: 'priya@techcorp.com',         jobTitle: 'MEP Designer',        company: 'TechCorp',         office: 'Chicago',  accessLevel: 'Mechanical Engineer',       permissionType: 'Manager',     userType: 'Project Member', teams:[{initials:'ME',bg:'#e8f5e9',text:'#2e7d32'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id:  7, name: 'Liam Foster',      email: 'liam.f@techcorp.com',        jobTitle: 'Safety Officer',      company: 'TechCorp',         office: 'Houston',  accessLevel: 'Safety Officer',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'SA',bg:'#fff8e1',text:'#f9a825'}],                                          status:'Pending Invitation',  invitedAt:'2026-02-20T14:30:00' },
  { id:  8, name: 'Sophie Lang',      email: 'sophie@techcorp.com',        jobTitle: 'Cost Estimator',      company: 'TechCorp',         office: 'Houston',  accessLevel: 'Estimator',                 permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'FN',bg:'#f3e5f5',text:'#8e24aa'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id:  9, name: 'Rafael Cruz',      email: 'rcruz@buildsmart.io',        jobTitle: 'Project Manager',     company: 'BuildSmart',       office: 'Boston',   accessLevel: 'Project Manager',           permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'PM',bg:'#e3f2fd',text:'#1565c0'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 10, name: 'Nina Okafor',      email: 'nina.o@buildsmart.io',       jobTitle: 'Document Controller', company: 'BuildSmart',       office: 'Seattle',  accessLevel: 'Default [Home - Read only]', permissionType: 'Full',       userType: 'Project Admin',  teams:[{initials:'DC',bg:'#fce4ec',text:'#c62828'},{initials:'PM',bg:'#e3f2fd',text:'#1565c0'}], status:'Registered', membershipStatus:'Active'    },
  { id: 11, name: 'Tom Brecker',      email: 'tom.b@buildsmart.io',        jobTitle: 'QA Engineer',         company: 'BuildSmart',       office: 'Seattle',  accessLevel: 'Default [Home - Read only]', permissionType: 'Read-Only',  userType: 'Project Member', teams:[{initials:'QA',bg:'#e8eaf6',text:'#3949ab'}],                                          status:'Registered', membershipStatus:'Suspended' },
  { id: 12, name: 'Chiara Bianchi',   email: 'cbianchi@buildsmart.io',     jobTitle: 'Design Lead',         company: 'BuildSmart',       office: 'Austin',   accessLevel: 'Design Manager',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'DL',bg:'#e0f7fa',text:'#006064'}],                                          status:'Expired Invitation',  invitedAt:'2026-01-15T09:00:00' },
  { id: 13, name: 'Devon Marsh',      email: 'dmarsh@apexeng.com',         jobTitle: 'Civil Engineer',      company: 'Apex Engineering', office: 'Austin',   accessLevel: 'Civil Engineer',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CE',bg:'#fff3e0',text:'#e65100'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 14, name: 'Yuki Tanaka',      email: 'ytanaka@apexeng.com',        jobTitle: 'Geotech Specialist',  company: 'Apex Engineering', office: 'Chicago',  accessLevel: 'Field Engineer',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'GS',bg:'#f1f8e9',text:'#558b2f'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 15, name: 'Carlos Silva',     email: 'carlos@apexeng.com',         jobTitle: 'Site Inspector',      company: 'Apex Engineering', office: 'New York', accessLevel: 'Discipline Superintendent',  permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SI',bg:'#fbe9e7',text:'#bf360c'}],                                          status:'Registered', membershipStatus:'Suspended' },
  { id: 16, name: 'Maya Patel',       email: 'mpatel@cityworks.net',       jobTitle: 'Urban Planner',       company: 'CityWorks',        office: 'Boston',   accessLevel: 'Planning Engineer',         permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'UP',bg:'#e8f4f8',text:'#1a73e8'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 17, name: 'Ben Harlow',       email: 'ben.h@cityworks.net',        jobTitle: 'Infrastructure PM',   company: 'CityWorks',        office: 'Houston',  accessLevel: 'Deputy Project Manager',    permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'IP',bg:'#ede7f6',text:'#6a1b9a'}],                                          status:'Pending Invitation',  invitedAt:'2026-02-28T11:00:00' },
  { id: 18, name: 'Iris Vance',       email: 'ivance@cityworks.net',       jobTitle: 'Drainage Engineer',   company: 'CityWorks',        office: 'Seattle',  accessLevel: 'Civil Engineer',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'DE',bg:'#e0f2f1',text:'#00695c'}],                                          status:'Registered', membershipStatus:'Suspended' },
  { id: 19, name: 'Owen Burke',       email: 'oburke@meridiangrp.com',     jobTitle: 'Contracts Manager',   company: 'Meridian Group',   office: 'New York', accessLevel: 'Contracts Manager',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#f9fbe7',text:'#827717'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 20, name: 'Fatima Al-Rashid', email: 'fatima@meridiangrp.com',     jobTitle: 'Risk Analyst',        company: 'Meridian Group',   office: 'Chicago',  accessLevel: 'Cost Engineer',             permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'RA',bg:'#fff8e1',text:'#ff8f00'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 21, name: 'Noah Steele',      email: 'nsteele@meridiangrp.com',    jobTitle: 'Procurement Lead',    company: 'Meridian Group',   office: 'Austin',   accessLevel: 'Procurement Manager',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'PL',bg:'#e8f5e9',text:'#1b5e20'}],                                          status:'Expired Invitation',  invitedAt:'2026-01-10T16:00:00' },
  { id: 22, name: 'Elena Vasquez',    email: 'evasquez@techcorp.com',      jobTitle: 'BIM Manager',         company: 'TechCorp',         office: 'Austin',   accessLevel: 'BIM Manager',               permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'BM',bg:'#e3f2fd',text:'#1565c0'},{initials:'SE',bg:'#fff3e0',text:'#e65100'}], status:'Registered', membershipStatus:'Active'    },
  { id: 23, name: 'Patrick Okoro',    email: 'pokoro@apexeng.com',         jobTitle: 'Hydraulic Engineer',  company: 'Apex Engineering', office: 'Houston',  accessLevel: 'Civil Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'HE',bg:'#e8f5e9',text:'#2e7d32'}],                                          status:'Registered', membershipStatus:'Active'    },
  { id: 24, name: 'Sandra Müller',    email: 'smuller@cityworks.net',      jobTitle: 'Transport Planner',   company: 'CityWorks',        office: 'New York', accessLevel: 'Planning Engineer',         permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'TP',bg:'#fff8e1',text:'#f9a825'}],                                          status:'Registered', membershipStatus:'Suspended' },

  // ── 50 new members — 20 Construction Managers ──────────────────────────────
  // Construction Managers (×20)
  { id: 25, name: 'Aaron Fletcher',    email: 'a.fletcher@turner-co.com',    jobTitle: 'Construction Manager',      company: 'Turner & Co',    office: 'New York', accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 26, name: 'Brianna Walsh',     email: 'bwalsh@turner-co.com',        jobTitle: 'Construction Manager',      company: 'Turner & Co',    office: 'Boston',   accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'PM',bg:'#e3f2fd',text:'#1565c0'}],status:'Registered', membershipStatus:'Active'    },
  { id: 27, name: 'Cole Nakamura',     email: 'cnakamura@skanska.com',       jobTitle: 'Construction Manager',      company: 'Skanska',        office: 'Chicago',  accessLevel: 'Construction Manager',      permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 28, name: 'Diana Petrov',      email: 'd.petrov@skanska.com',        jobTitle: 'Construction Manager',      company: 'Skanska',        office: 'Seattle',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}],status:'Registered', membershipStatus:'Active'    },
  { id: 29, name: 'Ethan Burkhardt',   email: 'eburkhardt@bechtel.com',      jobTitle: 'Construction Manager',      company: 'Bechtel',        office: 'Houston',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 30, name: 'Fiona Delacroix',   email: 'fdelacroix@bechtel.com',      jobTitle: 'Construction Manager',      company: 'Bechtel',        office: 'Austin',   accessLevel: 'Construction Manager',      permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'BM',bg:'#e6f4ea',text:'#1e7e34'}],status:'Registered', membershipStatus:'Active'    },
  { id: 31, name: 'George Inoue',      email: 'g.inoue@aecom.com',           jobTitle: 'Construction Manager',      company: 'AECOM',          office: 'New York', accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Pending Invitation',  invitedAt:'2026-03-01T09:00:00' },
  { id: 32, name: 'Helena Roark',      email: 'hroark@aecom.com',            jobTitle: 'Construction Manager',      company: 'AECOM',          office: 'Chicago',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'SE',bg:'#fff3e0',text:'#e65100'}],status:'Registered', membershipStatus:'Active'    },
  { id: 33, name: 'Ivan Sorokin',      email: 'isorokin@jacobs.com',         jobTitle: 'Construction Manager',      company: 'Jacobs',         office: 'Boston',   accessLevel: 'Construction Manager',      permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 34, name: 'Julia Hartmann',    email: 'jhartmann@jacobs.com',        jobTitle: 'Construction Manager',      company: 'Jacobs',         office: 'Houston',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'QA',bg:'#e8eaf6',text:'#3949ab'}],status:'Registered', membershipStatus:'Active'    },
  { id: 35, name: 'Kevin Osei',        email: 'kosei@parsons.com',           jobTitle: 'Construction Manager',      company: 'Parsons',        office: 'Seattle',  accessLevel: 'Construction Manager',      permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Suspended' },
  { id: 36, name: 'Laura Hendricks',   email: 'lhendricks@parsons.com',      jobTitle: 'Construction Manager',      company: 'Parsons',        office: 'Austin',   accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'DC',bg:'#fce4ec',text:'#c62828'}],status:'Registered', membershipStatus:'Active'    },
  { id: 37, name: 'Marco Esposito',    email: 'm.esposito@wsp.com',          jobTitle: 'Construction Manager',      company: 'WSP',            office: 'New York', accessLevel: 'Construction Manager',      permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 38, name: 'Nadia Okonkwo',     email: 'nokonkwo@wsp.com',            jobTitle: 'Construction Manager',      company: 'WSP',            office: 'Chicago',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'ME',bg:'#e8f5e9',text:'#2e7d32'}],status:'Registered', membershipStatus:'Active'    },
  { id: 39, name: 'Oscar Lindqvist',   email: 'olindqvist@arup.com',         jobTitle: 'Construction Manager',      company: 'Arup',           office: 'Boston',   accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 40, name: 'Paula Brennan',     email: 'pbrennan@arup.com',           jobTitle: 'Construction Manager',      company: 'Arup',           office: 'Houston',  accessLevel: 'Construction Manager',      permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Expired Invitation',  invitedAt:'2026-01-20T10:00:00' },
  { id: 41, name: 'Quinn Blackwood',   email: 'qblackwood@stantec.com',      jobTitle: 'Construction Manager',      company: 'Stantec',        office: 'Seattle',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'AR',bg:'#dde9ff',text:'#465fff'}],status:'Registered', membershipStatus:'Active'    },
  { id: 42, name: 'Rachel Fontaine',   email: 'rfontaine@stantec.com',       jobTitle: 'Construction Manager',      company: 'Stantec',        office: 'Austin',   accessLevel: 'Construction Manager',      permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 43, name: 'Samuel Adeyemi',    email: 's.adeyemi@mottmac.com',       jobTitle: 'Construction Manager',      company: 'Mott MacDonald', office: 'New York', accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'},{initials:'IP',bg:'#ede7f6',text:'#6a1b9a'}],status:'Registered', membershipStatus:'Active'    },
  { id: 44, name: 'Teresa Kimani',     email: 'tkimani@mottmac.com',         jobTitle: 'Construction Manager',      company: 'Mott MacDonald', office: 'Chicago',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                           status:'Pending Invitation',  invitedAt:'2026-02-15T08:30:00' },

  // Mixed roles (×30)
  { id: 45, name: 'Ulrich Baumann',    email: 'ubaumann@turner-co.com',      jobTitle: 'Site Manager',              company: 'Turner & Co',    office: 'Boston',   accessLevel: 'Site Manager',              permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 46, name: 'Victoria Lam',      email: 'vlam@skanska.com',            jobTitle: 'Project Engineer',          company: 'Skanska',        office: 'Houston',  accessLevel: 'Project Engineer',          permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'PE',bg:'#e8f5e9',text:'#2e7d32'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 47, name: 'Weston Clarke',     email: 'wclarke@bechtel.com',         jobTitle: 'Field Engineer',            company: 'Bechtel',        office: 'New York', accessLevel: 'Field Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'FE',bg:'#e3f2fd',text:'#1565c0'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 48, name: 'Xenia Papadopoulos',email: 'xpapadopoulos@aecom.com',     jobTitle: 'Structural Engineer',       company: 'AECOM',          office: 'Seattle',  accessLevel: 'Structural Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SE',bg:'#fff3e0',text:'#e65100'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 49, name: 'Yusuf Kamara',      email: 'ykamara@jacobs.com',          jobTitle: 'Quantity Surveyor',         company: 'Jacobs',         office: 'Austin',   accessLevel: 'Quantity Surveyor',         permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'QS',bg:'#fff8e1',text:'#f9a825'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 50, name: 'Zara Ahmed',        email: 'zahmed@parsons.com',          jobTitle: 'Safety Manager',            company: 'Parsons',        office: 'Chicago',  accessLevel: 'Safety Manager',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'SA',bg:'#fff8e1',text:'#f9a825'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 51, name: 'Adrian Cross',      email: 'across@wsp.com',              jobTitle: 'Planning Engineer',         company: 'WSP',            office: 'Boston',   accessLevel: 'Planning Engineer',         permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'PE',bg:'#e8eaf6',text:'#3949ab'}],                                           status:'Registered', membershipStatus:'Suspended' },
  { id: 52, name: 'Beatrice Morin',    email: 'bmorin@arup.com',             jobTitle: 'BIM Manager',               company: 'Arup',           office: 'New York', accessLevel: 'BIM Manager',               permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'BM',bg:'#e6f4ea',text:'#1e7e34'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 53, name: 'Christopher Eze',   email: 'ceze@stantec.com',            jobTitle: 'Electrical Engineer',       company: 'Stantec',        office: 'Houston',  accessLevel: 'Electrical Engineer',       permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'EE',bg:'#fffde7',text:'#f57f17'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 54, name: 'Danielle Pruitt',   email: 'dpruitt@mottmac.com',         jobTitle: 'Cost Manager',              company: 'Mott MacDonald', office: 'Seattle',  accessLevel: 'Cost Manager',              permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#f9fbe7',text:'#827717'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 55, name: 'Eduardo Ferreira',  email: 'eferreira@turner-co.com',     jobTitle: 'Superintendent',            company: 'Turner & Co',    office: 'Austin',   accessLevel: 'Superintendent',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 56, name: 'Faith Oduya',       email: 'foduya@skanska.com',          jobTitle: 'Senior Estimator',          company: 'Skanska',        office: 'Chicago',  accessLevel: 'Senior Estimator',          permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'ES',bg:'#e8f4f8',text:'#1a73e8'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 57, name: 'Grant Whitmore',    email: 'gwhitmore@bechtel.com',       jobTitle: 'HSE Manager',               company: 'Bechtel',        office: 'New York', accessLevel: 'HSE Manager',               permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'HS',bg:'#fce4ec',text:'#c62828'}],                                           status:'Pending Invitation',  invitedAt:'2026-03-05T14:00:00' },
  { id: 58, name: 'Hannah Johansson',  email: 'hjohansson@aecom.com',        jobTitle: 'Document Controller',       company: 'AECOM',          office: 'Houston',  accessLevel: 'Site Manager',              permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'DC',bg:'#fce4ec',text:'#c62828'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 59, name: 'Ian Beaumont',      email: 'ibeaumont@jacobs.com',        jobTitle: 'Mechanical Engineer',       company: 'Jacobs',         office: 'Seattle',  accessLevel: 'Mechanical Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'ME',bg:'#e8f5e9',text:'#2e7d32'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 60, name: 'Jasmine Torres',    email: 'jtorres@parsons.com',         jobTitle: 'Procurement Manager',       company: 'Parsons',        office: 'Boston',   accessLevel: 'Procurement Manager',       permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'PL',bg:'#e8f5e9',text:'#1b5e20'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 61, name: 'Klaus Richter',     email: 'krichter@wsp.com',            jobTitle: 'General Superintendent',    company: 'WSP',            office: 'Austin',   accessLevel: 'General Superintendent',    permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'GS',bg:'#f1f8e9',text:'#558b2f'},{initials:'SC',bg:'#fdf2fa',text:'#dd2590'}],status:'Registered', membershipStatus:'Active'    },
  { id: 62, name: 'Lydia Nguyen',      email: 'lnguyen@arup.com',            jobTitle: 'Fire Protection Engineer',  company: 'Arup',           office: 'Chicago',  accessLevel: 'Fire Protection Engineer',  permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'FP',bg:'#fbe9e7',text:'#bf360c'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 63, name: 'Martin Gallego',    email: 'mgallego@stantec.com',        jobTitle: 'VDC Manager',               company: 'Stantec',        office: 'New York', accessLevel: 'VDC Manager',               permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'AR',bg:'#dde9ff',text:'#465fff'}],                                           status:'Registered', membershipStatus:'Suspended' },
  { id: 64, name: 'Noelle Tremblay',   email: 'ntremblay@mottmac.com',       jobTitle: 'Design Coordinator',        company: 'Mott MacDonald', office: 'Houston',  accessLevel: 'Design Coordinator',        permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'DL',bg:'#e0f7fa',text:'#006064'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 65, name: 'Orlando Mwangi',    email: 'omwangi@turner-co.com',       jobTitle: 'Assistant Project Manager', company: 'Turner & Co',    office: 'Seattle',  accessLevel: 'Assistant Project Manager', permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'PM',bg:'#e3f2fd',text:'#1565c0'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 66, name: 'Penelope Kowalski', email: 'pkowalski@skanska.com',       jobTitle: 'BIM Coordinator',           company: 'Skanska',        office: 'Austin',   accessLevel: 'BIM Coordinator',           permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'BM',bg:'#e6f4ea',text:'#1e7e34'},{initials:'AR',bg:'#dde9ff',text:'#465fff'}],status:'Registered', membershipStatus:'Active'    },
  { id: 67, name: 'Robert Adkins',     email: 'radkins@bechtel.com',         jobTitle: 'Scheduler',                 company: 'Bechtel',        office: 'Boston',   accessLevel: 'Scheduler',                 permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'SC',bg:'#e8eaf6',text:'#3949ab'}],                                           status:'Expired Invitation',  invitedAt:'2026-02-01T11:00:00' },
  { id: 68, name: 'Samantha Osei',     email: 'sosei@aecom.com',             jobTitle: 'Plumbing Engineer',         company: 'AECOM',          office: 'Chicago',  accessLevel: 'Plumbing Engineer',         permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'PE',bg:'#e3f2fd',text:'#1565c0'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 69, name: 'Tobias Engel',      email: 'tengel@jacobs.com',           jobTitle: 'Controls Engineer',         company: 'Jacobs',         office: 'New York', accessLevel: 'Controls Engineer',         permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CE',bg:'#fff3e0',text:'#e65100'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 70, name: 'Uma Krishnamurthy', email: 'ukrishn@parsons.com',         jobTitle: 'Asset Manager',             company: 'Parsons',        office: 'Houston',  accessLevel: 'Asset Manager',             permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'AM',bg:'#fff8e1',text:'#ff8f00'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 71, name: 'Vincent Lagarde',   email: 'vlagarde@wsp.com',            jobTitle: 'Design Manager',            company: 'WSP',            office: 'Seattle',  accessLevel: 'Design Manager',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'DL',bg:'#e0f7fa',text:'#006064'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 72, name: 'Wendy Nakagawa',    email: 'wnakagawa@arup.com',          jobTitle: 'Owner Representative',      company: 'Arup',           office: 'Austin',   accessLevel: 'Owner Representative',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'OR',bg:'#e8f5e9',text:'#1b5e20'}],                                           status:'Registered', membershipStatus:'Active'    },
  { id: 73, name: 'Xavier Dufour',     email: 'xdufour@stantec.com',         jobTitle: 'Schedule Analyst',          company: 'Stantec',        office: 'Chicago',  accessLevel: 'Schedule Analyst',          permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'SA',bg:'#f1f8e9',text:'#558b2f'}],                                           status:'Pending Invitation',  invitedAt:'2026-03-10T09:30:00' },
  { id: 74, name: 'Yara El-Masri',     email: 'yelmasri@mottmac.com',        jobTitle: 'Contracts Manager',         company: 'Mott MacDonald', office: 'New York', accessLevel: 'Contracts Manager',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CM',bg:'#f9fbe7',text:'#827717'},{initials:'PM',bg:'#e3f2fd',text:'#1565c0'}],status:'Registered', membershipStatus:'Active'    },

  // ── Additional 70 users (IDs 75–144) ─────────────────────────────────────
  { id: 75,  name: 'Abigail Stone',      email: 'astone@kpf.com',              jobTitle: 'Senior Architect',          company: 'KPF',            office: 'New York', accessLevel: 'Architect',                 permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'AR',bg:'#dde9ff',text:'#465fff'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 76,  name: 'Bruno Carvalho',     email: 'bcarvalho@kpf.com',           jobTitle: 'Interior Designer',         company: 'KPF',            office: 'Chicago',  accessLevel: 'Interior Designer',         permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'ID',bg:'#fdf2fa',text:'#dd2590'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 77,  name: 'Celine Marchand',    email: 'cmarchand@hok.com',           jobTitle: 'Project Coordinator',       company: 'HOK',            office: 'Boston',   accessLevel: 'Project Coordinator',       permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'PC',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 78,  name: 'Derek Mwamba',       email: 'dmwamba@hok.com',             jobTitle: 'Design Manager',            company: 'HOK',            office: 'Houston',  accessLevel: 'Design Manager',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'DM',bg:'#e0f7fa',text:'#006064'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 79,  name: 'Elsa Bergstrom',     email: 'ebergstrom@gensler.com',      jobTitle: 'Urban Planner',             company: 'Gensler',        office: 'Seattle',  accessLevel: 'Planning Engineer',         permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'UP',bg:'#e8f4f8',text:'#1a73e8'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 80,  name: 'Felix Nguema',       email: 'fnguema@gensler.com',         jobTitle: 'Structural Engineer',       company: 'Gensler',        office: 'Austin',   accessLevel: 'Structural Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 81,  name: 'Gloria Ramos',       email: 'gramos@perkins-will.com',     jobTitle: 'BIM Specialist',            company: 'Perkins&Will',   office: 'New York', accessLevel: 'BIM Coordinator',           permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'BM',bg:'#e6f4ea',text:'#1e7e34'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 82,  name: 'Hamid Rezaei',       email: 'hrezaei@perkins-will.com',    jobTitle: 'MEP Engineer',              company: 'Perkins&Will',   office: 'Chicago',  accessLevel: 'Mechanical Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'ME',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Pending Invitation',  invitedAt:'2026-03-01T10:00:00' },
  { id: 83,  name: 'Ingrid Sorensen',    email: 'isorensen@hdrinc.com',        jobTitle: 'Civil Engineer',            company: 'HDR',            office: 'Boston',   accessLevel: 'Civil Engineer',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 84,  name: 'Jerome Dubois',      email: 'jdubois@hdrinc.com',          jobTitle: 'Transportation Planner',    company: 'HDR',            office: 'Houston',  accessLevel: 'Planning Engineer',         permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'TP',bg:'#fff8e1',text:'#f9a825'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 85,  name: 'Karin Lindberg',     email: 'klindberg@thornton.com',      jobTitle: 'Structural Analyst',        company: 'Thornton T.',    office: 'New York', accessLevel: 'Structural Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 86,  name: 'Leandro Vega',       email: 'lvega@thornton.com',          jobTitle: 'Wind Engineer',             company: 'Thornton T.',    office: 'Chicago',  accessLevel: 'Structural Engineer',       permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'SE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 87,  name: 'Monica Bakker',      email: 'mbakker@atelierien.com',      jobTitle: 'Sustainability Lead',       company: 'Atelier Ten',    office: 'Seattle',  accessLevel: 'Project Engineer',          permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'SL',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 88,  name: 'Nathaniel Owusu',    email: 'nowusu@atelierien.com',       jobTitle: 'Facade Engineer',           company: 'Atelier Ten',    office: 'Austin',   accessLevel: 'Project Engineer',          permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'FE',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 89,  name: 'Olivia Svensson',    email: 'osvensson@burohappold.com',   jobTitle: 'Acoustics Engineer',        company: 'Buro Happold',   office: 'Boston',   accessLevel: 'Project Engineer',          permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'AE',bg:'#ede7f6',text:'#6a1b9a'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 90,  name: 'Pierre Aumont',      email: 'paumont@burohappold.com',     jobTitle: 'Lighting Designer',         company: 'Buro Happold',   office: 'New York', accessLevel: 'Design Coordinator',        permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'LD',bg:'#fffde7',text:'#f57f17'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 91,  name: 'Quin Abara',         email: 'qabara@arup-group.com',       jobTitle: 'Fire Safety Engineer',      company: 'Arup Group',     office: 'Chicago',  accessLevel: 'Fire Protection Engineer',  permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'FS',bg:'#fbe9e7',text:'#bf360c'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 92,  name: 'Rima Chakraborty',   email: 'rchakraborty@arup-group.com', jobTitle: 'Geotechnical Engineer',     company: 'Arup Group',     office: 'Houston',  accessLevel: 'Field Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'GE',bg:'#f1f8e9',text:'#558b2f'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 93,  name: 'Sebastian Gruber',   email: 'sgruber@db-bauplan.com',      jobTitle: 'Railway Engineer',          company: 'DB Bauplan',     office: 'Seattle',  accessLevel: 'Civil Engineer',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'RE',bg:'#e0f7fa',text:'#006064'}],                                            status:'Expired Invitation',  invitedAt:'2026-02-10T09:00:00' },
  { id: 94,  name: 'Tamika Jordan',      email: 'tjordan@db-bauplan.com',      jobTitle: 'Cost Analyst',              company: 'DB Bauplan',     office: 'Austin',   accessLevel: 'Cost Engineer',             permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'CA',bg:'#fff8e1',text:'#ff8f00'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 95,  name: 'Ugo Ferraro',        email: 'uferraro@italconsult.it',     jobTitle: 'Airport Planner',           company: 'Italconsult',    office: 'New York', accessLevel: 'Planning Engineer',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'AP',bg:'#e8f4f8',text:'#1a73e8'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 96,  name: 'Vera Morozova',      email: 'vmorozova@italconsult.it',    jobTitle: 'Environmental Engineer',    company: 'Italconsult',    office: 'Chicago',  accessLevel: 'Civil Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'EE',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 97,  name: 'William Osei-Bonsu', email: 'wosei@smec.com',              jobTitle: 'Road Designer',             company: 'SMEC',           office: 'Boston',   accessLevel: 'Civil Engineer',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'RD',bg:'#fdf2fa',text:'#dd2590'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 98,  name: 'Xiomara Varela',     email: 'xvarela@smec.com',            jobTitle: 'Bridge Engineer',           company: 'SMEC',           office: 'Houston',  accessLevel: 'Structural Engineer',       permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'BE',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Pending Invitation',  invitedAt:'2026-03-08T14:00:00' },
  { id: 99,  name: 'Yohannes Tesfaye',   email: 'ytesfaye@ramboll.com',        jobTitle: 'Foundation Engineer',       company: 'Ramboll',        office: 'Seattle',  accessLevel: 'Structural Engineer',       permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'FE',bg:'#e6f4ea',text:'#1e7e34'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 100, name: 'Zoe Papadimitriou',  email: 'zpapadimitriou@ramboll.com',  jobTitle: 'Energy Consultant',         company: 'Ramboll',        office: 'Austin',   accessLevel: 'Project Engineer',          permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'EC',bg:'#fffde7',text:'#f57f17'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 101, name: 'Aaron Ngozi',        email: 'angozi@ghd.com',              jobTitle: 'Water Resources Eng',       company: 'GHD',            office: 'New York', accessLevel: 'Civil Engineer',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'WR',bg:'#e0f7fa',text:'#006064'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 102, name: 'Bella Kovachevska',  email: 'bkovachevska@ghd.com',        jobTitle: 'Environmental Planner',     company: 'GHD',            office: 'Chicago',  accessLevel: 'Planning Engineer',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'EP',bg:'#f1f8e9',text:'#558b2f'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 103, name: 'Carlo Marini',       email: 'cmarini@meinhardt.com',       jobTitle: 'Highway Engineer',          company: 'Meinhardt',      office: 'Boston',   accessLevel: 'Civil Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'HW',bg:'#e8f4f8',text:'#1a73e8'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 104, name: 'Dora Stavros',       email: 'dstavros@meinhardt.com',      jobTitle: 'Building Services Eng',     company: 'Meinhardt',      office: 'Houston',  accessLevel: 'Mechanical Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'BS',bg:'#ede7f6',text:'#6a1b9a'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 105, name: 'Emeka Nwosu',        email: 'enwosu@surbana.com',          jobTitle: 'Urban Designer',            company: 'Surbana Jurong', office: 'Seattle',  accessLevel: 'Design Coordinator',        permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'UD',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 106, name: 'Freya Andersen',     email: 'fandersen@surbana.com',       jobTitle: 'Landscape Architect',       company: 'Surbana Jurong', office: 'Austin',   accessLevel: 'Architect',                 permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'LA',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 107, name: 'Giovanni Russo',     email: 'grosso@technip.com',          jobTitle: 'Process Engineer',          company: 'Technip',        office: 'New York', accessLevel: 'Project Engineer',          permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'PE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 108, name: 'Hana Watanabe',      email: 'hwatanabe@technip.com',       jobTitle: 'Instrumentation Eng',       company: 'Technip',        office: 'Chicago',  accessLevel: 'Field Engineer',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'IE',bg:'#fce4ec',text:'#c62828'}],                                            status:'Expired Invitation',  invitedAt:'2026-01-25T09:00:00' },
  { id: 109, name: 'Ibrahim Hassan',     email: 'ihassan@mace-group.com',      jobTitle: 'Programme Director',        company: 'Mace Group',     office: 'Boston',   accessLevel: 'Project Manager',           permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'PD',bg:'#e8f4f8',text:'#1a73e8'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 110, name: 'Jolanta Wisniewska', email: 'jwisniewska@mace-group.com',  jobTitle: 'Risk Manager',              company: 'Mace Group',     office: 'Houston',  accessLevel: 'Cost Manager',              permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'RM',bg:'#fff8e1',text:'#ff8f00'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 111, name: 'Kweku Mensah',       email: 'kmensah@laing-orourke.com',   jobTitle: 'Site Engineer',             company: 'Laing ORourke',  office: 'Seattle',  accessLevel: 'Field Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'SE',bg:'#e6f4ea',text:'#1e7e34'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 112, name: 'Laura Conti',        email: 'lconti@laing-orourke.com',    jobTitle: 'Commercial Manager',        company: 'Laing ORourke',  office: 'Austin',   accessLevel: 'Commercial Manager',        permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#f9fbe7',text:'#827717'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 113, name: 'Miguel Herrero',     email: 'mherrero@ferrovial.com',      jobTitle: 'Tunneling Engineer',        company: 'Ferrovial',      office: 'New York', accessLevel: 'Civil Engineer',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'TE',bg:'#e0f7fa',text:'#006064'}],                                            status:'Pending Invitation',  invitedAt:'2026-03-11T11:30:00' },
  { id: 114, name: 'Nkechi Obi',         email: 'nobi@ferrovial.com',          jobTitle: 'Concession Manager',        company: 'Ferrovial',      office: 'Chicago',  accessLevel: 'Procurement Manager',       permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'CO',bg:'#fdf2fa',text:'#dd2590'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 115, name: 'Olaf Petersson',     email: 'opetersson@vinci.com',        jobTitle: 'Earthworks Manager',        company: 'Vinci',          office: 'Boston',   accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'EM',bg:'#dde9ff',text:'#465fff'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 116, name: 'Paola Rinaldi',      email: 'prinaldi@vinci.com',          jobTitle: 'Document Controller',       company: 'Vinci',          office: 'Houston',  accessLevel: 'Default [Home - Read only]', permissionType: 'Read-Only',  userType: 'Project Member', teams:[{initials:'DC',bg:'#fce4ec',text:'#c62828'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 117, name: 'Quentin Bouchard',   email: 'qbouchard@bouygues.com',      jobTitle: 'Finishing Manager',         company: 'Bouygues',       office: 'Seattle',  accessLevel: 'Site Manager',              permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'FM',bg:'#ede7f6',text:'#6a1b9a'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 118, name: 'Rosa Fernandez',     email: 'rfernandez@bouygues.com',     jobTitle: 'Quality Engineer',          company: 'Bouygues',       office: 'Austin',   accessLevel: 'Default [Home - Read only]', permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'QE',bg:'#e8eaf6',text:'#3949ab'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 119, name: 'Samuel Dankwa',      email: 'sdankwa@balfour-beatty.com',  jobTitle: 'Electrical Supervisor',     company: 'Balfour Beatty', office: 'New York', accessLevel: 'Electrical Engineer',       permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'EL',bg:'#fffde7',text:'#f57f17'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 120, name: 'Tania Hristova',     email: 'thristova@balfour-beatty.com',jobTitle: 'Planner',                   company: 'Balfour Beatty', office: 'Chicago',  accessLevel: 'Scheduler',                 permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'PL',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 121, name: 'Umberto Basso',      email: 'ubasso@webuild.com',          jobTitle: 'Dam Engineer',               company: 'Webuild',        office: 'Boston',   accessLevel: 'Civil Engineer',            permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'DE',bg:'#e0f2f1',text:'#00695c'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 122, name: 'Valentina Greco',    email: 'vgreco@webuild.com',          jobTitle: 'Hydraulics Engineer',       company: 'Webuild',        office: 'Houston',  accessLevel: 'Civil Engineer',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'HY',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 123, name: 'Wilson Nakagomi',    email: 'wnakagomi@obayashi.com',      jobTitle: 'Construction Director',     company: 'Obayashi',       office: 'Seattle',  accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'CM',bg:'#dde9ff',text:'#465fff'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 124, name: 'Xia Ling',           email: 'xling@obayashi.com',          jobTitle: 'Materials Engineer',        company: 'Obayashi',       office: 'Austin',   accessLevel: 'Field Engineer',            permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'ME',bg:'#fff8e1',text:'#f9a825'}],                                            status:'Expired Invitation',  invitedAt:'2026-02-05T08:00:00' },
  { id: 125, name: 'Yemi Adisa',         email: 'yadisa@kajima.com',           jobTitle: 'Estimating Manager',        company: 'Kajima',         office: 'New York', accessLevel: 'Senior Estimator',          permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'EM',bg:'#f1f8e9',text:'#558b2f'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 126, name: 'Zuzanna Wislocka',   email: 'zwislocka@kajima.com',        jobTitle: 'Procurement Coordinator',   company: 'Kajima',         office: 'Chicago',  accessLevel: 'Procurement Manager',       permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'PC',bg:'#fdf2fa',text:'#dd2590'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 127, name: 'Alex Thornton',      email: 'athornton@costain.com',       jobTitle: 'Site Safety Officer',       company: 'Costain',        office: 'Boston',   accessLevel: 'Safety Officer',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SS',bg:'#fbe9e7',text:'#bf360c'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 128, name: 'Bianca Moretti',     email: 'bmoretti@costain.com',        jobTitle: 'Construction Engineer',     company: 'Costain',        office: 'Houston',  accessLevel: 'Field Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'CE',bg:'#e3f2fd',text:'#1565c0'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 129, name: 'Colm Driscoll',      email: 'cdriscoll@sisk.ie',           jobTitle: 'Project Director',          company: 'Sisk Group',     office: 'Seattle',  accessLevel: 'Project Manager',           permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'PD',bg:'#e8f4f8',text:'#1a73e8'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 130, name: 'Daria Shevchenko',   email: 'dshevchenko@sisk.ie',         jobTitle: 'Contracts Advisor',         company: 'Sisk Group',     office: 'Austin',   accessLevel: 'Contracts Manager',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'CA',bg:'#f9fbe7',text:'#827717'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 131, name: 'Ethan Park',         email: 'epark@samsung-cts.com',       jobTitle: 'Digital Lead',              company: 'Samsung C&T',    office: 'New York', accessLevel: 'BIM Manager',               permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'DL',bg:'#dde9ff',text:'#465fff'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 132, name: 'Fumiko Hayashi',     email: 'fhayashi@samsung-cts.com',    jobTitle: 'Specialist Engineer',       company: 'Samsung C&T',    office: 'Chicago',  accessLevel: 'Project Engineer',          permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'SP',bg:'#ede7f6',text:'#6a1b9a'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 133, name: 'Gareth Williams',    email: 'gwilliams@galliford.com',     jobTitle: 'Lifecycle Manager',         company: 'Galliford Try',  office: 'Boston',   accessLevel: 'Project Manager',           permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'LM',bg:'#e8f5e9',text:'#2e7d32'}],                                            status:'Pending Invitation',  invitedAt:'2026-03-12T10:00:00' },
  { id: 134, name: 'Hiba Alaoui',        email: 'halaoui@galliford.com',       jobTitle: 'Lean Practitioner',         company: 'Galliford Try',  office: 'Houston',  accessLevel: 'Project Coordinator',       permissionType: 'Read-Only',   userType: 'Project Member', teams:[{initials:'LP',bg:'#fff8e1',text:'#f9a825'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 135, name: 'Isak Lindqvist',     email: 'ilindqvist@ncc.se',           jobTitle: 'Structural Supervisor',     company: 'NCC Group',      office: 'Seattle',  accessLevel: 'Superintendent',            permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'SS',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 136, name: 'Joana Teixeira',     email: 'jteixeira@ncc.se',            jobTitle: 'Tender Manager',            company: 'NCC Group',      office: 'Austin',   accessLevel: 'Senior Estimator',          permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'TM',bg:'#fdf2fa',text:'#dd2590'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 137, name: 'Kofi Boateng',       email: 'kboateng@daiwa-house.com',    jobTitle: 'Asset Manager',             company: 'Daiwa House',    office: 'New York', accessLevel: 'Asset Manager',             permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'AM',bg:'#fff8e1',text:'#ff8f00'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 138, name: 'Lena Fischer',       email: 'lfischer@daiwa-house.com',    jobTitle: 'Property Manager',          company: 'Daiwa House',    office: 'Chicago',  accessLevel: 'Default [Home - Read only]', permissionType: 'Read-Only',  userType: 'Project Member', teams:[{initials:'PM',bg:'#e8eaf6',text:'#3949ab'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 139, name: 'Marcos Aliaga',      email: 'maliaga@acciona.com',         jobTitle: 'Infrastructure Director',   company: 'Acciona',        office: 'Boston',   accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'ID',bg:'#e0f7fa',text:'#006064'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 140, name: 'Nadia Popovic',      email: 'npopovic@acciona.com',        jobTitle: 'Concession Engineer',       company: 'Acciona',        office: 'Houston',  accessLevel: 'Civil Engineer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'CE',bg:'#fff3e0',text:'#e65100'}],                                            status:'Registered', membershipStatus:'Suspended' },
  { id: 141, name: 'Oscar Mendez',       email: 'omendez@acs-group.com',       jobTitle: 'Project Controls Lead',     company: 'ACS Group',      office: 'Seattle',  accessLevel: 'Controls Engineer',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'PC',bg:'#e8eaf6',text:'#3949ab'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 142, name: 'Priya Sundaram',     email: 'psundaram@acs-group.com',     jobTitle: 'Health & Safety Advisor',   company: 'ACS Group',      office: 'Austin',   accessLevel: 'Safety Officer',            permissionType: 'Contributor', userType: 'Project Member', teams:[{initials:'HS',bg:'#fce4ec',text:'#c62828'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 143, name: 'Ricardo Gomez',      email: 'rgomez@fluor.com',            jobTitle: 'Module Manager',            company: 'Fluor',          office: 'New York', accessLevel: 'Construction Manager',      permissionType: 'Full',        userType: 'Project Admin',  teams:[{initials:'MM',bg:'#dde9ff',text:'#465fff'}],                                            status:'Registered', membershipStatus:'Active'    },
  { id: 144, name: 'Stephanie Lawson',   email: 'slawson@fluor.com',           jobTitle: 'Project Controls Eng',      company: 'Fluor',          office: 'Chicago',  accessLevel: 'Controls Engineer',         permissionType: 'Manager',     userType: 'Project Admin',  teams:[{initials:'PC',bg:'#e8eaf6',text:'#3949ab'}],                                            status:'Registered', membershipStatus:'Active'    },
];

// Exported so the Add User modal can gray-out users already in the project
export const BASE_USER_EMAILS: Set<string> = new Set(INITIAL_USERS.map(u => u.email));

// ─── Office address lookup ─────────────────────────────────────────────────────
const OFFICE_ADDRESS_SHORT: Record<string, string> = {
  Boston:     '100 Federal St, Boston, MA 02110',
  'New York': '350 5th Ave, New York, NY 10118',
  Chicago:    '233 S Wacker Dr, Chicago, IL 60606',
  Houston:    '1600 Smith St, Houston, TX 77002',
  Seattle:    '1201 3rd Ave, Seattle, WA 98101',
  Austin:     '1705 Cedar Bend Dr, Austin, TX 78758',
};

// ─── Column definitions ───────────────────────────────────────────────────────
const COLS: ColDef[] = [
  { key:'jobTitle',          label:'Job Title',              groupable:false, getValue:u=>u.jobTitle },
  { key:'email',             label:'Email',                  groupable:false, getValue:u=>u.email },
  { key:'company',           label:'Company',                groupable:true,  getValue:u=>u.company },
  { key:'office',            label:'Office',                 groupable:true,  getValue:u=>u.office },
  { key:'accessLevel',       label:'Project Role',           groupable:true,  getValue:u=>u.accessLevel },
  { key:'userType',          label:'User Type',              groupable:true,  getValue:u=>u.userType },
  { key:'status',            label:'User Account Status',    groupable:true,  getValue:u=>u.status },
  { key:'membershipStatus',  label:'Membership Status',      groupable:true,  getValue:u=>u.membershipStatus??'' },
  { key:'emailDomain',       label:'Domain',                 groupable:true,  getValue:u=>u.email.split('@')[1]??'' },
  { key:'address',           label:'Address',                groupable:false, getValue:u=>OFFICE_ADDRESS_SHORT[u.office]??u.office },
];
function getCol(k: string) { return COLS.find(c => c.key === k); }

// ─── Filter helper ────────────────────────────────────────────────────────────
function applyFilters(users: User[], filters: Record<string, string[]>): User[] {
  const active = Object.entries(filters).filter(([, v]) => Array.isArray(v) ? v.length > 0 : Boolean(v));
  if (!active.length) return users;
  return users.filter(u => active.every(([key, vals]) => {
    const selected = Array.isArray(vals) ? vals : [vals as string];
    if (selected.length === 0) return true;
    switch (key) {
      case 'company':        return selected.includes(u.company);
      case 'office':         return selected.includes(u.office);
      case 'emailDomain':    return selected.includes(u.email.split('@')[1] ?? '');
      case 'status':          return selected.includes(u.status);
      case 'membershipStatus': return selected.includes(u.membershipStatus ?? '');
      case 'permissionType': return selected.includes(u.permissionType);
      case 'userType':       return selected.includes(u.userType);
      case 'accessLevel':    return selected.includes(u.accessLevel);
      default: return true;
    }
  }));
}

// Label lookup includes the special "user" header
const COL_LABELS: Record<string,string> = {
  user: 'User',
  ...Object.fromEntries(COLS.map(c => [c.key, c.label])),
};

// ─── Min-width (6 + 6 padding + grip icon budget of 20px) ────────────────────
let _minW: Record<string,number>|null = null;
function minWidthOf(key: string): number {
  // Design spec: User column has a fixed minimum of 240px
  if (key === 'user') return 240;
  if (!_minW) {
    _minW = {};
    for (const [k,label] of Object.entries(COL_LABELS))
      _minW[k] = measureLabel(label) + 12 + 20; // 6L + 6R padding + icons budget
  }
  return _minW[key] ?? 70;
}

// Returns flex CSS for a middle column cell.
// If user has manually resized → fixed; otherwise → Fill (flex:1).
function colFlex(key: string, resizedWidth?: number): React.CSSProperties {
  const minW = minWidthOf(key);
  if (resizedWidth !== undefined)
    return { flex:`0 0 ${resizedWidth}px`, width:resizedWidth, minWidth:minW, overflow:'hidden' };
  return { flex:'1 1 0', minWidth:minW, overflow:'hidden' };
}

// ─── Shared cell style constants ──────────────────────────────────────────────
// Rows expand to at least the viewport width; overflow → horizontal scroll.
const ROW_BASE: React.CSSProperties = { display:'flex', minWidth:'100%' };

// Separator removed — no vertical cell grid lines
const SEP: React.CSSProperties = {};

// Checkbox — first column, fixed
const CB_STYLE: React.CSSProperties = { flex:`0 0 ${CHECKBOX_W}px`, width:CHECKBOX_W, ...SEP };

// Default width for the Name column when frozen (flex-fill doesn't work with sticky-left)
const USER_COL_DEFAULT_W = 200;

// Compute sticky-left info for frozen columns (freezeCount = 0 → empty map)
// Returns map: colKey → { left (px offset), width (px) }
function computeFrozenMap(
  freezeCount: number,
  visibleDynCols: string[],
  resizedWidths: Record<string, number>,
): Map<string, { left: number; width: number }> {
  const map = new Map<string, { left: number; width: number }>();
  if (freezeCount === 0) return map;
  let left = CHECKBOX_W;
  const nameW = resizedWidths['user'] ?? USER_COL_DEFAULT_W;
  map.set('user', { left, width: nameW });
  left += nameW;
  for (let i = 0; i < Math.min(freezeCount - 1, visibleDynCols.length); i++) {
    const k = visibleDynCols[i];
    const w = resizedWidths[k] ?? minWidthOf(k);
    map.set(k, { left, width: w });
    left += w;
  }
  return map;
}

// Actions — last column: fixed 60px, sticky-right
const ACTIONS_CELL: React.CSSProperties = {
  flex:`0 0 ${ACTIONS_W}px`, width:ACTIONS_W,
  position:'sticky', right:0, zIndex:4,
  background:'inherit',
  boxShadow:'-1px 0 0 0 #F0F0F0, -4px 0 10px rgba(0,0,0,0.06)',
};
const ACTIONS_HDR: React.CSSProperties = { ...ACTIONS_CELL, zIndex:16 };

// ─── Grouping helpers ─────────────────────────────────────────────────────────
function buildGroupTree(users: User[], keys: string[], depth=0): GroupNode[] {
  if (!users.length || depth >= keys.length) return [];
  const col = getCol(keys[depth]); if (!col) return [];
  const map = new Map<string,User[]>();
  for (const u of users) { const v=col.getValue(u); if (!map.has(v)) map.set(v,[]); map.get(v)!.push(u); }
  return Array.from(map.entries()).sort(([a],[b])=>a.localeCompare(b)).map(([value,gu])=>({
    id:`g${depth}-${keys[depth]}-${value}`, columnKey:keys[depth], columnLabel:col.label, value, users:gu,
    children: depth+1<keys.length ? buildGroupTree(gu,keys,depth+1) : null,
  }));
}
function collectAllIds(nodes: GroupNode[]): string[] {
  return nodes.flatMap(n=>[n.id,...(n.children?collectAllIds(n.children):[])]);
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function paginateFlat(users: User[], page: number) {
  const total=users.length, totalPages=Math.max(1,Math.ceil(total/PAGE_SIZE));
  const p=Math.min(page,totalPages), start=(p-1)*PAGE_SIZE;
  return { items:users.slice(start,start+PAGE_SIZE), total, totalPages, p, start1:start+1, end1:Math.min(start+PAGE_SIZE,total) };
}
function paginateGrouped(topGroups: GroupNode[], page: number) {
  const pages:GroupNode[][]=[[]], cnt={v:0};
  for (const g of topGroups) {
    if (cnt.v>0 && cnt.v+g.users.length>PAGE_SIZE) { pages.push([]); cnt.v=0; }
    pages[pages.length-1].push(g); cnt.v+=g.users.length;
  }
  const totalPages=pages.length, p=Math.min(page,totalPages), current=pages[p-1]??[];
  let start1=1; for (let i=0;i<p-1;i++) start1+=pages[i].reduce((s,g)=>s+g.users.length,0);
  const end1=start1+current.reduce((s,g)=>s+g.users.length,0)-1;
  const total=topGroups.reduce((s,g)=>s+g.users.length,0);
  return { current, total, totalPages, p, start1:current.length?start1:0, end1:current.length?end1:0 };
}
// ── Fixed 7-slot pagination algorithm ────────────────────────────────────────
// ≤ 7 pages  → show all pages, no ellipsis
// > 7 pages  → always exactly 7 slots:
//   near start (cur ≤ 4)    → [1, 2, 3, 4, 5, …, N]
//   near end   (cur ≥ N-3)  → [1, …, N-4, N-3, N-2, N-1, N]
//   middle                  → [1, …, cur-1, cur, cur+1, …, N]
function pageNums(total: number, cur: number): (number|'…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4)         return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total-4, total-3, total-2, total-1, total];
  return [1, '…', cur - 1, cur, cur + 1, '…', total];
}

// ─── Sort helper ──────────────────────────────────────────────────────────────
function applySortToUsers(users: User[], sortState: SortState): User[] {
  if (!sortState) return users;
  const { key, dir } = sortState;
  const getter: (u:User)=>string = key==='user' ? u=>u.name : (getCol(key)?.getValue ?? (u=>u.name));
  return [...users].sort((a,b)=>{
    const cmp = getter(a).localeCompare(getter(b));
    return dir==='asc' ? cmp : -cmp;
  });
}

// ─── Icons ────────────────────────────────────────────────────────────────────
// ─── highlightText — §22.7 ────────────────────────────────────────────────────
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lowerText.indexOf(lowerQuery, lastIndex);
  while (idx !== -1) {
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(
      <span key={idx} style={{ background: '#FCFE58' }}>
        {text.slice(idx, idx + query.length)}
      </span>
    );
    lastIndex = idx + query.length;
    idx = lowerText.indexOf(lowerQuery, lastIndex);
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function SearchIcon()     { return <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5"/><path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function FilterIcon()     { return <svg width="18" height="18" viewBox="0 0 19.5 21.5" fill="none"><path d={sp.p55f5a00} stroke="#616D79" strokeLinejoin="round" strokeWidth="1.5"/></svg>; }
function ImportIcon()     { return <svg width="18" height="18" viewBox="0 0 20.75 21.5" fill="none"><path d={sp.p39b25880} stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/><path d={sp.p3c64cd90} stroke="#616D79" strokeWidth="1.5"/><path d={sp.p32883150} stroke="#616D79" strokeWidth="1.5"/></svg>; }
function ExportIcon()     { return <svg width="18" height="18" viewBox="0 0 21.8107 21.2803" fill="none"><path d={sp.p34ec8300} stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/><path d={sp.p9c65f00} stroke="#616D79" strokeWidth="1.5"/><path d={sp.p2702c480} stroke="#616D79" strokeWidth="1.5"/></svg>; }
function PlusIcon()       { return <svg width="12" height="12" viewBox="0 0 12.611 12.611" fill="none"><path d={sp.p28c07a00} fill="white"/></svg>; }
function ArrowLeftIcon()  { return <svg width="13" height="11" viewBox="0 0 14.8345 11.5" fill="none"><path d={sp.p2d0593c0} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>; }
function ArrowRightIcon() { return <svg width="13" height="11" viewBox="0 0 14.8345 11.5" fill="none"><path d={sp.p36164580} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>; }
function InfoIcon()       { return <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.5" stroke="#616D79"/><circle cx="9.5" cy="5.5" r="1" fill="#616D79" stroke="#616D79"/><path d="M8 9H10V15M10 15H8M10 15H12" stroke="#616D79" strokeLinejoin="round"/></svg>; }
function ChevronTiny({ open, color='#243746' }: { open:boolean; color?:string }) {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform:open?'rotate(90deg)':'rotate(0deg)', transition:'transform 0.15s ease', flexShrink:0 }}><path d="M3 2L7 5L3 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function ChevronDown() { return <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 3L4.5 6.5L7.5 3" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function GripDots() {
  return <svg width="7" height="12" viewBox="0 0 7 12" fill="none">{([[2,2],[5,2],[2,6],[5,6],[2,10],[5,10]] as [number,number][]).map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="1.2" fill="#b0bac4"/>)}</svg>;
}
function XIcon() { return <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
/** IconRegularTableList — Figma Icon/Regular/table-list (imported SVG path) */
function IconRegularTableList({ active = false }: { active?: boolean }) {
  const color = active ? '#ff4d00' : '#616d79';
  return (
    <svg width="24" height="24" viewBox="0 0 36 35" fill="none" style={{ flexShrink: 0 }}>
      <path d={svgTableList.p2d13e180} fill={color} />
    </svg>
  );
}

// ─── Figma-style custom checkbox ──────────────────────────────────────────────
// Three visual states match the Figma design exactly:
//   checked      → blue square + white checkmark (uses SVG path winding rule)
//   indeterminate → blue square + white dash
//   unchecked    → white square + #D0D5DD border, blue border on hover
const CB_BLUE = '#0E70CB';
// The rect subpath from the Figma asset (rounded square, CCW winding)
const CB_RECT = 'M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0Z';

function TableCheckbox({
  checked, indeterminate = false, onChange,
}: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={e => { e.stopPropagation(); onChange(); }}
      className="shrink-0 flex items-center justify-center size-[32px] rounded cursor-pointer
        group/cb focus:outline-none"
      aria-checked={indeterminate ? 'mixed' : checked}
    >
      {checked ? (
        // Blue rounded square with white checkmark (pae529f2 path, dual-subpath winding trick)
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={checkboxPaths.pae529f2} fill={CB_BLUE}/>
        </svg>
      ) : indeterminate ? (
        // Blue square + white dash
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={CB_RECT} fill={CB_BLUE}/>
          <path d="M4.5 9H13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        // Unchecked — white with grey border, blue border on hover
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={CB_RECT} fill="white" className="group-hover/cb:fill-[#f0f7ff]"
            style={{ transition: 'fill 0.1s' }}/>
          <path d={CB_RECT} fill="none" stroke="#D0D5DD"
            className="group-hover/cb:stroke-[#0E70CB]"
            style={{ strokeWidth: 1.5, transition: 'stroke 0.1s' }}/>
        </svg>
      )}
    </button>
  );
}

// Header checkbox — three-state: all / some (indeterminate) / none
function HeaderCheckbox() {
  const { allVisibleSelected, someVisibleSelected, toggleSelectAll } = useContext(TableCtx);
  return (
    <TableCheckbox
      checked={allVisibleSelected}
      indeterminate={someVisibleSelected}
      onChange={toggleSelectAll}
    />
  );
}

// Sort arrows icon — active direction highlighted in Blue/blue-6 (#1890FF)
function SortArrows({ dir }: { dir: SortDir|null }) {
  const up   = dir==='asc'  ? '#1890FF' : '#c4cad1';
  const down = dir==='desc' ? '#1890FF' : '#c4cad1';
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
      {/* up arrow */}
      <path d="M5.5 7V1" stroke={up} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 4L5.5 1L9 4" stroke={up} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* down arrow */}
      <path d="M5.5 7V13" stroke={down} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 10L5.5 13L9 10" stroke={down} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Status badges ────────────────────────────────────────────────────────────
// User Account Status colours
const STATUS: Record<string,{bg:string;text:string;dot:string}> = {
  'Registered':          {bg:'#ecfdf3',text:'#027a48',dot:'#12b76a'},
  'Pending Invitation':  {bg:'#eff8ff',text:'#175cd3',dot:'#6172f3'},
  'Expired Invitation':  {bg:'#fff7ed',text:'#c4320a',dot:'#ef6820'},
};
// Membership Status colours
const MEMBERSHIP_STATUS: Record<string,{bg:string;text:string;dot:string}> = {
  'Active':    {bg:'#ecfdf3',text:'#027a48',dot:'#12b76a'},
  'Suspended': {bg:'#fef2f2',text:'#b91c1c',dot:'#ef4444'},
};
function StatusBadge({ val, colorMap, onClick }: { val:string; colorMap?: Record<string,{bg:string;text:string;dot:string}>; onClick?: () => void }) {
  const map = colorMap ?? STATUS;
  const s = map[val]??{bg:'#f3f4f6',text:'#6b7280',dot:'#9ca3af'};
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-[5px] px-[7px] py-[2px] rounded-full text-[11px] font-medium whitespace-nowrap transition-opacity hover:opacity-75 cursor-pointer"
      style={{background:s.bg, color:s.text}}
    >
      <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{background:s.dot}}/>
      {val}
    </button>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
const AV_BG=['#3b5998','#e4405f','#2d8653','#9b59b6','#e67e22','#1abc9c','#e74c3c','#34495e','#16a085','#8e44ad'];
function Avatar({ user }: { user:User }) {
  const init = user.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  if (user.id===1) return <img src={imgAvatar} alt={user.name} className="size-full object-cover"/>;
  return <div className="size-full flex items-center justify-center" style={{background:AV_BG[user.id%AV_BG.length]}}><span className="text-white text-[11px] font-semibold">{init}</span></div>;
}

// ─── Resize handle ────────────────────────────────────────────────────────────
function ResizeHandle({ colKey, cellHovered = false }: { colKey:string; cellHovered?: boolean }) {
  const { onResize, onResizeAll } = useContext(TableCtx);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();

    // ── Snapshot ALL column widths from the DOM before dragging ──────────────
    // Walk up: resizeHandle → ColumnHeader → header row
    const headerRow = ref.current?.parentElement?.parentElement as HTMLElement | null;
    if (headerRow) {
      const snapshot: Record<string, number> = {};
      headerRow.querySelectorAll<HTMLElement>('[data-col-key]').forEach(el => {
        const key = el.dataset.colKey;
        if (key) snapshot[key] = el.getBoundingClientRect().width;
      });
      // Freeze every column at its current rendered width so they won't flex
      if (Object.keys(snapshot).length > 0) onResizeAll(snapshot);
    }

    // Measure target cell width AFTER snapshot so we use the locked value
    const cell = ref.current?.parentElement as HTMLElement | null;
    const startW = cell ? cell.getBoundingClientRect().width : minWidthOf(colKey);
    const startX = e.clientX;
    const minW   = minWidthOf(colKey);
    setActive(true);
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';
    const onMove = (ev: MouseEvent) => onResize(colKey, Math.max(minW, startW + (ev.clientX - startX)));
    const onUp   = () => {
      setActive(false);
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [colKey, onResize, onResizeAll]);

  // active drag or handle hover → blue  |  rest → hidden (no cell-hover gray line in header)
  const lineColor = active || handleHovered ? '#4d7cfe' : 'transparent';

  return (
    // Positioned strictly at the RIGHT edge only — left border of each cell is never draggable.
    // The 6px hit zone sits entirely inside the column; overflow:clip on parent prevents bleed.
    <div ref={ref}
      className="absolute right-0 top-0 h-full w-[6px] cursor-col-resize z-20 flex items-center justify-end"
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false} onDragStart={e => e.preventDefault()}>
      {/* 48px tall (full header height) × 2px wide border line */}
      <div
        style={{ height: 48, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }}
      />
    </div>
  );
}

// ─── Grip visual handle (pure visual — DnD is on the whole ColumnHeader) ──────
function GripDragHandle({ col, isDragging }: { col: ColDef; isDragging?: boolean }) {
  return (
    <span
      className={`shrink-0 transition-opacity pointer-events-none ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
      title={col.groupable ? `Drag column header to group by "${col.label}"` : `"${col.label}" cannot be grouped`}
    >
      <GripDots/>
    </span>
  );
}

// ─── ColumnHeader — clickable + draggable header cell ─────────────────────────
// • Click      → sort asc → desc → clear (HTML5 drag suppresses click natively)
// • Drag header (or grip) to the Group By lane → group rows by this column
// • Sort arrows visible (blue-6 #1890FF) while sorted; fade-in on hover.
// • Hover: cell bg → #EEEFF1; resize border → #9CA4AE.
// • Last frozen column gets a 2px right-border separator (Google Sheets style).
function ColumnHeader({
  colKey, children, showGrip, col,
}: {
  colKey: string;
  children: React.ReactNode;
  showGrip?: boolean;
  col?: ColDef;
}) {
  const { onSort, sortState, resizedWidths, frozenMap } = useContext(TableCtx);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = sortState?.key === colKey;
  const dir: SortDir | null = isActive ? sortState!.dir : null;
  const frozenInfo = frozenMap.get(colKey);

  // Last frozen column gets a visible right-border separator
  const lastFrozenKey = frozenMap.size > 0 ? [...frozenMap.keys()].at(-1) : null;
  const isLastFrozen = colKey === lastFrozenKey;

  const w = frozenInfo
    ? { flex: `0 0 ${frozenInfo.width}px`, width: frozenInfo.width, minWidth: frozenInfo.width, overflow: 'hidden' as const }
    : colFlex(colKey, resizedWidths[colKey]);

  // DnD: drag the entire column header to the Group By lane
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: col ? { key: col.key, label: col.label, groupable: col.groupable } : { key: '', label: '', groupable: false },
    canDrag: () => !!col,
    collect: m => ({ isDragging: m.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      data-col-key={colKey}
      className="group relative flex items-center gap-[4px] pl-[6px] pr-[10px]"
      style={{
        ...w,
        ...SEP,
        overflow: 'clip',
        cursor: isDragging ? 'grabbing' : 'pointer',
        background: isDragging ? '#E8EDF5' : isHovered ? '#EEEFF1' : '#FAFAFA',
        opacity: isDragging ? 0.7 : 1,
        transition: 'background 0.1s, opacity 0.1s',
        userSelect: 'none',
        ...(frozenInfo ? { position: 'sticky' as const, left: frozenInfo.left, zIndex: 8 } : {}),
        ...(isLastFrozen ? { borderRight: '2px solid #F0F0F0' } : {}),
      }}
      onClick={() => { if (!isDragging) onSort(colKey); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showGrip && col && <GripDragHandle col={col} isDragging={isDragging} />}
      {children}
      {/* Sort indicator — always visible when column is sorted; fades in on hover */}
      <span
        className="shrink-0 flex items-center"
        style={{
          opacity: isActive || isHovered ? 1 : 0,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
        }}
      >
        <SortArrows dir={dir} />
      </span>
      <ResizeHandle colKey={colKey} cellHovered={isHovered} />
    </div>
  );
}

// ─── GroupBy lane ─────────────────────────────────────────────────────────────
interface LaneProps {
  groupByKeys:string[]; onAdd:(k:string)=>void; onRemove:(k:string)=>void;
  onClear:()=>void; allExpanded:boolean; onToggleAll:()=>void;
}
function GroupByLane({ groupByKeys,onAdd,onRemove,onClear,allExpanded,onToggleAll }:LaneProps) {
  const [{isOver,canDrop,dragItem},drop] = useDrop<DragItem,void,{isOver:boolean;canDrop:boolean;dragItem:DragItem|null}>({
    accept:DRAG_TYPE,
    canDrop: item=>item.groupable && !groupByKeys.includes(item.key),
    drop:    item=>{ if(item.groupable&&!groupByKeys.includes(item.key)) onAdd(item.key); },
    collect: m=>({ isOver:m.isOver(), canDrop:m.canDrop(), dragItem:m.getItem() }),
  });
  const dragging=!!dragItem;
  const inv  = isOver&&!!dragItem&&!dragItem.groupable;
  const dup  = isOver&&dragItem?.groupable===true&&groupByKeys.includes(dragItem.key);
  const good = isOver&&canDrop;
  const zoneBg = inv?'#fff0f0':dup?'#fffbeb':good?'#eef5ff':dragging?'#f5f8ff':'#FAFAFA';
  const zoneBd = inv?'#fca5a5':dup?'#fcd34d':good?'#6b9fff':'#F0F0F0';
  const chips  = groupByKeys.map(k=>getCol(k)).filter(Boolean) as ColDef[];
  const tip    = inv?`"${dragItem!.label}" grouping is not supported.`:dup?`Already grouped by "${dragItem!.label}".`:'';

  return (
    <div ref={drop as any}
      className="relative flex items-center flex-wrap gap-[6px] min-h-[40px] px-[12px] py-[5px] shrink-0 transition-colors duration-100"
      style={{ background: zoneBg, borderBottom: `1px solid ${zoneBd}` }}>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600, lineHeight: '24px', color: '#384857', whiteSpace: 'nowrap', userSelect: 'none', verticalAlign: 'middle' }}>Group by:</span>
      {chips.length===0 ? (
        <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:400, lineHeight:'20px', color:'#9CA3AF', userSelect:'none', verticalAlign: 'middle' }}>
          {good?`Drop here → group by "${dragItem?.label}"`:dragging?'Drop a groupable column here…':'Drag a column header (or grip) into this lane to group rows'}
        </span>
      ):(
        <>
          {chips.map((col,i)=>{
            // Left stroke colour matches the group-row depth colour for this chip's level
            const accentColor = DEPTH_STYLES[i % DEPTH_STYLES.length].border;
            return (
              <div key={col.key} style={{display:'contents'}}>
                {i>0&&<svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="shrink-0"><path d="M1 1L5.5 5.5L1 10" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                <div
                  className="flex items-center gap-[5px] rounded-[4px] h-[24px] text-[12px] font-medium select-none shrink-0"
                  style={{ background: '#E5E7E9', color: '#384857', borderLeft: `4px solid ${accentColor}`, paddingLeft: 6, paddingRight: 8 }}
                >
                  <span>{col.label}</span>
                  <button className="hover:bg-[#C3C7CC]/60 rounded p-[1px]" style={{ color: '#384857' }} onClick={()=>onRemove(col.key)}><XIcon/></button>
                </div>
              </div>
            );
          })}
          <button className="text-[#ef4444] text-[11px] hover:underline ml-[2px] shrink-0" onClick={onClear}>Clear</button>
          <button className="flex items-center gap-[3px] text-[#384857] text-[11px] hover:underline ml-[2px] shrink-0" onClick={onToggleAll}>
            <ChevronTiny open={allExpanded} color="#384857"/>{allExpanded?'Collapse All':'Expand All'}
          </button>
        </>
      )}
      {(inv||dup)&&tip&&(
        <div className="absolute left-1/2 -translate-x-1/2 -top-[36px] z-50 bg-[#1e293b] text-white text-[11px] px-[10px] py-[5px] rounded-[5px] shadow-lg whitespace-nowrap pointer-events-none">
          {tip}<div className="absolute left-1/2 -translate-x-1/2 top-full border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#1e293b]"/>
        </div>
      )}
    </div>
  );
}

// ─── Group header row ─────────────────────────────────────────────────────────
const DEPTH_STYLES=[
  {bg:'#ebf0ff',border:'#4d7cfe',text:'#1e3a8a'},
  {bg:'#e8f4ee',border:'#34a660',text:'#14532d'},
  {bg:'#fef9ec',border:'#f59e0b',text:'#78350f'},
  {bg:'#fdf2ff',border:'#c084fc',text:'#581c87'},
];
function GroupHeaderRow({ group,depth,expanded,onToggle }:{ group:GroupNode;depth:number;expanded:boolean;onToggle:()=>void }) {
  const ds=DEPTH_STYLES[depth%DEPTH_STYLES.length];
  const { groupRowHeight, freezeCount, frozenMap } = useContext(TableCtx);
  const stickyStyle: React.CSSProperties = freezeCount > 0
    ? { position: 'sticky', left: 0, zIndex: 4, width: '100%', minWidth: '100%' }
    : {};

  const lastFrozenEntry = frozenMap.size > 0 ? [...frozenMap.values()].at(-1) : null;
  const separatorLeft   = lastFrozenEntry ? lastFrozenEntry.left + lastFrozenEntry.width : null;

  const label = (
    <>
      <ChevronTiny open={expanded} color={ds.border}/>
      <span className="font-semibold text-[12px] shrink-0" style={{color:ds.text}}>{group.columnLabel}:</span>
      <span className="text-[12px] truncate" style={{color:ds.text}}>{group.value}</span>
      <span className="text-[11px] text-[#6b7280] shrink-0 ml-[3px]">({group.users.length})</span>
    </>
  );

  return (
    <div className="flex cursor-pointer select-none border-b border-[#F0F0F0] hover:brightness-[0.97] transition-all"
      style={{...ROW_BASE, height:groupRowHeight, background:ds.bg, ...stickyStyle}} onClick={onToggle}>

      {separatorLeft !== null ? (
        // Frozen: fixed-width div with borderRight using the EXACT same CSS property as
        // data-row cells → guaranteed pixel-identical rendering (no background div trick).
        // width: separatorLeft (border-box) places the borderRight right-edge at viewport
        // x = separatorLeft, matching the data-row Name cell borderRight exactly. ✓
        <>
          <div style={{
            width: separatorLeft,
            flexShrink: 0,
            height: '100%',
            background: ds.bg,
            borderLeft: `4px solid ${ds.border}`,
            borderRight: '2px solid #F0F0F0',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            paddingLeft: 12 + depth * 20,
            paddingRight: 8,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            {label}
          </div>
          <div style={{ flex: 1, height: '100%', background: ds.bg }} />
        </>
      ) : (
        // No freeze: single full-width content area
        <div className="flex items-center gap-[5px] flex-1 overflow-hidden"
          style={{borderLeft:`4px solid ${ds.border}`, paddingLeft:12+depth*20, paddingRight:8}}>
          {label}
        </div>
      )}

      <div style={{...ACTIONS_CELL,background:ds.bg,height:'100%',zIndex:3}}/>
    </div>
  );
}

// ─── Team pills with smart overflow detection ─────────────────────────────────
// Replaces circle avatars. Uses ResizeObserver to know how many pills fit in the
// available cell width, then shows "+N" for the rest.
type TeamEntry = { initials: string; bg: string; text: string };

// Estimated pill widths (px): 2-char abbr @ 11px ≈ 14px + 12px H-padding + 4px gap
const PILL_W = 30;  // single pill (no gap prefix)
const PILL_W_WITH_GAP = 34;  // subsequent pills (pill + 4px gap)
const BADGE_W_WITH_GAP = 32; // "+N" badge + 4px gap

function TeamCell({ teams }: { teams: TeamEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [maxVisible, setMaxVisible] = useState(teams.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calc = () => {
      const available = el.clientWidth;
      if (!available) return;
      let count = 0;
      let used = 0;
      for (let i = 0; i < teams.length; i++) {
        const w = i === 0 ? PILL_W : PILL_W_WITH_GAP;
        // Would we need a "+N" badge after this pill?
        const remaining = teams.length - (i + 1);
        const badgeSpace = remaining > 0 ? BADGE_W_WITH_GAP : 0;
        if (used + w + badgeSpace > available) break;
        count = i + 1;
        used += w;
      }
      setMaxVisible(Math.max(1, count));
    };

    const ro = new ResizeObserver(calc);
    ro.observe(el);
    calc();
    return () => ro.disconnect();
  }, [teams]);

  const visible  = teams.slice(0, maxVisible);
  const overflow = teams.length - maxVisible;

  return (
    <div ref={ref} className="flex items-center gap-[4px] overflow-hidden w-full">
      {visible.map((t, i) => (
        <span key={i}
          className="inline-flex items-center justify-center px-[6px] py-[2px] rounded-[4px]
            text-[11px] font-semibold whitespace-nowrap shrink-0"
          style={{ background: t.bg, color: t.text }}>
          {t.initials}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center justify-center px-[6px] py-[2px] rounded-[4px]
          text-[11px] font-medium whitespace-nowrap shrink-0"
          style={{ background: '#eef0f2', color: '#5a6472' }}>
          +{overflow}
        </span>
      )}
    </div>
  );
}

// ─── User data row ────────────────────────────────────────────────────────────
const UserRow = React.memo(function UserRow({ user }:{ user:User }) {
  const { resizedWidths, selectedIds, toggleRow, onInfoClick, hiddenCols, colOrder, searchQuery, rowHeight, frozenMap, freezeCount } = useContext(TableCtx);
  const w=(k:string)=>colFlex(k,resizedWidths[k]);
  const px='0 6px 0 17px';

  const visibleCols = colOrder
    .filter(k => !hiddenCols.has(k))
    .map(k => COLS.find(c => c.key === k))
    .filter((c): c is ColDef => c !== undefined);

  // Last frozen column key — gets the Google-Sheets-style right border separator
  const lastFrozenKey = frozenMap.size > 0 ? [...frozenMap.keys()].at(-1) : null;
  const frozenSep: React.CSSProperties = { borderRight: '2px solid #F0F0F0' };

  // Frozen sticky helpers for data rows
  const cbFrozen: React.CSSProperties = freezeCount > 0
    ? { ...CB_STYLE, position: 'sticky', left: 0, zIndex: 3, background: 'inherit' }
    : CB_STYLE;

  const nameFrozenInfo = frozenMap.get('user');
  const nameStyle: React.CSSProperties = {
    ...(nameFrozenInfo
      ? { flex: `0 0 ${nameFrozenInfo.width}px`, width: nameFrozenInfo.width, minWidth: nameFrozenInfo.width, overflow: 'hidden', position: 'sticky' as const, left: nameFrozenInfo.left, zIndex: 3, background: 'inherit' }
      : { ...w('user'), ...SEP }),
    ...('user' === lastFrozenKey ? frozenSep : {}),
  };

  const isRowSelected = selectedIds.has(user.id);
  return (
    <div className="transition-colors border-b border-[#F0F0F0]"
      style={{ ...ROW_BASE, height: rowHeight, background: isRowSelected ? '#E6F7FF' : '#FFFFFF' }}
      onMouseEnter={e => { if (!isRowSelected) (e.currentTarget as HTMLElement).style.background = '#f9f9fb'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isRowSelected ? '#E6F7FF' : '#FFFFFF'; }}
    >
      {/* Checkbox */}
      <div className="flex items-center justify-center shrink-0" style={cbFrozen}>
        <TableCheckbox
          checked={selectedIds.has(user.id)}
          onChange={() => toggleRow(user.id)}
        />
      </div>
      {/* User cell — avatar + name (always visible, clickable = same as "i") */}
      <div
        className="flex items-center gap-[8px]"
        style={{ ...nameStyle, padding: '0 6px', cursor: 'pointer' }}
        onClick={() => onInfoClick(user)}
        title={`View ${user.name}'s info`}
      >
        <div className="size-[30px] rounded-full overflow-hidden shrink-0"><Avatar user={user}/></div>
        <span className="text-[#1d2939] text-[13px] truncate min-w-0 hover:underline" style={{fontWeight:500}}>{highlightText(user.name, searchQuery)}</span>
      </div>
      {/* Dynamic data columns — ordered and filtered by colSettings */}
      {visibleCols.map(col => {
        const frozenInfo = frozenMap.get(col.key);
        const isLastFrz = col.key === lastFrozenKey;
        const base: React.CSSProperties = frozenInfo
          ? { flex: `0 0 ${frozenInfo.width}px`, width: frozenInfo.width, minWidth: frozenInfo.width, overflow: 'hidden', padding: px, position: 'sticky', left: frozenInfo.left, zIndex: 3, background: 'inherit', ...(isLastFrz ? frozenSep : {}) }
          : { ...w(col.key), ...SEP, padding: px };
        switch (col.key) {
          case 'status':
            return <div key={col.key} className="flex items-center" style={base}><StatusBadge val={user.status} colorMap={STATUS} onClick={() => onInfoClick(user)}/></div>;
          case 'membershipStatus':
            return <div key={col.key} className="flex items-center" style={base}>{user.membershipStatus ? <StatusBadge val={user.membershipStatus} colorMap={MEMBERSHIP_STATUS} onClick={() => onInfoClick(user)}/> : <span style={{color:'#9CA4AE',fontSize:13}}>N/A</span>}</div>;
          case 'emailDomain':
            return <div key={col.key} className="flex items-center" style={base}><span className="text-[#262626] text-[13px] truncate">{user.email.split('@')[1]}</span></div>;
          case 'email':
            return <div key={col.key} className="flex items-center" style={base}><span className="text-[#262626] text-[13px] truncate">{user.email}</span></div>;
          case 'address':
            return <div key={col.key} className="flex items-center" style={base}><span className="text-[#262626] text-[13px] truncate">{OFFICE_ADDRESS_SHORT[user.office]??user.office}</span></div>;
          default:
            return <div key={col.key} className="flex items-center" style={base}><span className="text-[#262626] text-[13px] truncate">{col.getValue(user)}</span></div>;
        }
      })}
      {/* Actions — sticky right */}
      <div className="flex items-center justify-center" style={ACTIONS_CELL}>
        <button
          className="size-[26px] flex items-center justify-center rounded hover:bg-[#eff0f1] transition-colors"
          aria-label={`View personal info for ${user.name}`}
          onClick={() => onInfoClick(user)}
        ><InfoIcon/></button>
      </div>
    </div>
  );
});

// ─── Recursive group rows ─────────────────────────────────────────────────────
function GroupRows({ groups,depth,expanded:exp,onToggle }:{ groups:GroupNode[];depth:number;expanded:Set<string>;onToggle:(id:string)=>void }) {
  return <>{groups.map(g=>{
    const isOpen=exp.has(g.id);
    return (
      <div key={g.id} style={{display:'contents'}}>
        <GroupHeaderRow group={g} depth={depth} expanded={isOpen} onToggle={()=>onToggle(g.id)}/>
        {isOpen&&(g.children
          ?<GroupRows groups={g.children} depth={depth+1} expanded={exp} onToggle={onToggle}/>
          :g.users.map(u=><UserRow key={u.id} user={u}/>)
        )}
      </div>
    );
  })}</>;
}

// ─── Table header row ─────────────────────────────────────────────────────────
// Each data column uses ColumnHeader — the entire cell is the sort click target.
// The Actions column is frozen (sticky right) by default.
function TableHeader() {
  const { hiddenCols, colOrder, showColSettings, onColSettingsClick, colSettingsBtnRef, freezeCount } = useContext(TableCtx);
  const visibleCols = colOrder
    .filter(k => !hiddenCols.has(k))
    .map(k => COLS.find(c => c.key === k))
    .filter((c): c is ColDef => c !== undefined);

  const cbStyle: React.CSSProperties = freezeCount > 0
    ? { ...CB_STYLE, position: 'sticky', left: 0, zIndex: 9, background: '#FAFAFA' }
    : CB_STYLE;

  return (
    <div className="border-b border-[#F0F0F0]" style={{...ROW_BASE, height:48, background:'#FAFAFA'}}>
      {/* Checkbox — not sortable */}
      <div className="flex items-center justify-center shrink-0" style={cbStyle}>
        <HeaderCheckbox/>
      </div>

      {/* User column — sortable, no grip */}
      <ColumnHeader colKey="user">
        <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:600, lineHeight:'20px', color:'#384857', flex:1, minWidth:0 }}>Name</span>
      </ColumnHeader>

      {/* All other data columns — ordered by colOrder, each sortable with grip */}
      {visibleCols.map(col=>(
        <div key={col.key} style={{display:'contents'}}>
          <ColumnHeader colKey={col.key} showGrip col={col}>
            <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:600, lineHeight:'20px', color:'#384857', flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{col.label}</span>
          </ColumnHeader>
        </div>
      ))}

      {/* Actions header — frozen (sticky right) by default via ACTIONS_HDR */}
      <div className="flex items-center justify-center" style={{...ACTIONS_HDR, background:'#FAFAFA'}}>
        <button
          ref={colSettingsBtnRef}
          onClick={onColSettingsClick}
          className="flex items-center justify-center w-[34px] h-[34px] rounded transition-colors hover:bg-[#e8eaec]"
          style={{ backgroundColor: showColSettings ? '#e8eaec' : 'transparent' }}
          aria-label="Column settings"
          aria-expanded={showColSettings}
          aria-haspopup="dialog"
          title="Column Settings"
        >
          {/* ColumnVisibility icon — svg-cb8pbl913g */}
          <svg width="15" height="18" viewBox="0 0 17.9861 22" fill="none">
            <g clipPath="url(#colvis-clip)">
              <path
                d="M2.00278 19C1.45202 19 0.98069 18.7763 0.58882 18.3291C0.19694 17.8819 0.00067 17.3437 0 16.7143V5.28571C0 4.65714 0.19627 4.1192 0.58882 3.672C0.98136 3.2248 1.45272 3.0008 2.00278 3H3.32962C3.88039 3 4.35204 3.224 4.74459 3.672C5.13713 4.12 5.33311 4.65794 5.33241 5.28571V16.7143C5.33241 17.3429 5.13643 17.8811 4.74459 18.3291C4.35275 18.7771 3.88109 19.0008 3.32962 19H2.00278ZM8.3366 19C7.7858 19 7.3145 18.7763 6.92261 18.3291C6.53077 17.8819 6.3345 17.3437 6.3338 16.7143V5.28571C6.3338 4.65714 6.53007 4.1192 6.92261 3.672C7.3152 3.2248 7.7865 3.0008 8.3366 3H9.6634C10.2142 3 10.6858 3.224 11.0784 3.672C11.4709 4.12 11.6669 4.65794 11.6662 5.28571V16.7143C11.6662 17.3429 11.4702 17.8811 11.0784 18.3291C10.6865 18.7771 10.2149 19.0008 9.6634 19H8.3366ZM14.6704 19C14.1196 19 13.6483 18.7763 13.2564 18.3291C12.8646 17.8819 12.6683 17.3437 12.6676 16.7143V5.28571C12.6676 4.65714 12.8639 4.1192 13.2564 3.672C13.649 3.2248 14.1203 3.0008 14.6704 3H15.9972C16.548 3 17.0196 3.224 17.4122 3.672C17.8047 4.12 18.0007 4.65794 18 5.28571V16.7143C18 17.3429 17.804 17.8811 17.4122 18.3291C17.0203 18.7771 16.5487 19.0008 15.9972 19H14.6704Z"
                fill={showColSettings ? '#FF4D00' : '#616D79'}
              />
            </g>
            <defs>
              <clipPath id="colvis-clip">
                <rect width="17.9861" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Download Import Template button ─────────────────────────────────────────
// Blue-6 (#1890FF) icon + underlined label — exact Figma structure from Content.tsx
function DownloadTemplateButton() {
  const BLUE6 = '#1890FF';
  const BLUE7 = '#096DD9';

  const handleClick = () => {
    const csv = 'Name,Email,Job Title,Company,Office,Permission,Permission Type\nJohn Smith,john@example.com,Engineer,Acme Corp,New York,Editor,Contributor\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'inertia-users-template.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        height: 36, padding: '0 12px', borderRadius: 4,
        background: 'transparent', border: 'none',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        lineHeight: '20px', color: BLUE6, cursor: 'pointer',
        transition: 'color 0.15s', whiteSpace: 'nowrap', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.color = BLUE7; }}
      onMouseLeave={e => { e.currentTarget.style.color = BLUE6; }}
      aria-label="Download Import Template"
    >
      {/* 18×18 clip container → inner absolute fill → rotate-90 20×20 div → SVG (exact Figma Content.tsx) */}
      <div style={{ width: 18, height: 18, position: 'relative', overflow: 'clip', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: '8.33%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 20, height: 20, transform: 'rotate(90deg)', flexShrink: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 15.75 16.5" fill="none" preserveAspectRatio="none">
              <path d={svgDownload.p18c7ece0} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M1.31134e-07 8.25L12 8.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 11.25L12 8.25L9 5.25" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Download Import Template</span>
    </button>
  );
}

// ─── Import button — Secondary Medium §15.2 (no chevron, no dropdown) ────────
function ImportSplitButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px',
          color: pressed ? '#FFFFFF' : '#616D79',
          background: pressed ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4',
          border: `1px solid ${pressed ? '#616D79' : hov ? '#616D79' : '#C3C7CC'}`,
          borderRadius: 4, height: 36,
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '0 16px', cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s', whiteSpace: 'nowrap',
        }}
      >
        <ImportIcon /><span>Import</span>
      </button>

      <ImportCSVModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectName="Cleveland Hospital"
      />
    </>
  );
}

// ─── Export button — Secondary Medium §15.2 (no chevron, no dropdown) ────────
function ExportSplitButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px',
          color: pressed ? '#FFFFFF' : '#616D79',
          background: pressed ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4',
          border: `1px solid ${pressed ? '#616D79' : hov ? '#616D79' : '#C3C7CC'}`,
          borderRadius: 4, height: 36,
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '0 16px', cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s', whiteSpace: 'nowrap',
        }}
      >
        <ExportIcon /><span>Export</span>
      </button>

      <ExportCSVModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectName="Cleveland Hospital"
      />
    </>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────
function Toolbar() {
  const { onAddUser, onFilterClick, filterCount, onResetFilter, searchQuery, onSearchChange } = useContext(TableCtx);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = focused ? '#91D5FF' : hovered ? '#A8B0BB' : '#D0D5DD';

  return (
    <div style={{ background:'#FAFAFA', height:50, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px', borderBottom:'1px solid #F0F0F0', flexShrink:0 }}>
      <div className="flex items-center gap-[8px]">
        {/* ── Search input §22.2 ── */}
        <div
          style={{ position:'relative', width:276, height:36, display:'flex', alignItems:'center', flexShrink:0 }}
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
        >
          {/* Leading search icon */}
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', display:'flex', alignItems:'center' }}>
            <SearchIcon/>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search users…"
            style={{
              width:'100%', height:36, paddingLeft:34,
              paddingRight: searchQuery ? 34 : 10,
              border:`1px solid ${borderColor}`,
              borderRadius:4, background:'#FFFFFF',
              fontFamily:'Open Sans, sans-serif', fontSize:14, fontWeight:400,
              lineHeight:'20px', color:'#344054', outline:'none',
              transition:'border-color 0.15s', boxSizing:'border-box',
            }}
          />
          {/* Clear × icon — only when value.length > 0 */}
          {searchQuery && (
            <button
              onClick={() => { onSearchChange(''); inputRef.current?.focus(); }}
              style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', color:'#8C8C8C', transition:'color 0.1s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='#595959')}
              onMouseLeave={e=>(e.currentTarget.style.color='#8C8C8C')}
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Filter button — Secondary Pressed when active (§15.2) ── */}
        <button
          onClick={onFilterClick}
          style={{
            position:'relative', display:'flex', alignItems:'center', gap:4,
            height:36, padding:'0 16px', borderRadius:4,
            border: filterCount > 0 ? '1px solid #616D79' : '1px solid #C3C7CC',
            background: filterCount > 0 ? '#616D79' : '#F2F3F4',
            fontFamily:'Inter,sans-serif', fontSize:14, fontWeight:400,
            color: filterCount > 0 ? '#FFFFFF' : '#616D79',
            cursor:'pointer', transition:'background 0.15s, border-color 0.15s', whiteSpace:'nowrap',
          }}
          onMouseEnter={e => { if (filterCount === 0) { e.currentTarget.style.background = '#E8EAEC'; e.currentTarget.style.borderColor = '#616D79'; } }}
          onMouseLeave={e => { if (filterCount === 0) { e.currentTarget.style.background = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; } }}
        >
          <svg width="18" height="18" viewBox="0 0 19.5 21.5" fill="none">
            <path d={sp.p55f5a00} stroke={filterCount > 0 ? '#FFFFFF' : '#616D79'} strokeLinejoin="round" strokeWidth="1.5"/>
          </svg>
          <span>Filter</span>
          {filterCount > 0 && (
            <span style={{ position:'absolute', top:-7, right:-7, background:'#FF4D00', color:'white', width:18, height:18, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:600 }}>
              {filterCount}
            </span>
          )}
        </button>

        {filterCount > 0 && (
          <button
            onClick={onResetFilter}
            style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#616d79', background:'none', border:'none', cursor:'pointer', padding:'4px 2px', whiteSpace:'nowrap', textDecoration:'underline', textUnderlineOffset:3 }}
            onMouseEnter={e=>(e.currentTarget.style.color='#384857')}
            onMouseLeave={e=>(e.currentTarget.style.color='#616d79')}
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-[8px]">
        <DownloadTemplateButton />
        <ImportSplitButton />
        <ExportSplitButton />
        {/* ── Add User — Primary CTA §15.1 Medium ── */}
        <button
          onClick={onAddUser}
          style={{ display:'flex', alignItems:'center', gap:4, height:36, padding:'0 16px', borderRadius:4, border:'none', background:'#FF4D00', fontFamily:'Inter,sans-serif', fontSize:14, fontWeight:400, lineHeight:'20px', color:'white', cursor:'pointer', transition:'background 0.15s', whiteSpace:'nowrap' }}
          onMouseEnter={e=>(e.currentTarget.style.background='#FF773E')}
          onMouseLeave={e=>(e.currentTarget.style.background='#FF4D00')}
          onMouseDown={e=>(e.currentTarget.style.background='#D4380D')}
          onMouseUp={e=>(e.currentTarget.style.background='#FF773E')}
        >
          <PlusIcon/><span>Add User</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main UsersTable ──────────────────────────────────────────────────────────
export function UsersTable({
  projectId = 'cleveland-hospital',
  extraUsers = [],
  onAddUser = () => {},
}: {
  projectId?: string;
  extraUsers?: User[];
  onAddUser?: () => void;
}) {
  const storageKey = `${STORAGE_KEY_PREFIX}-${projectId}`;

  const [groupByKeys,    setGroupByKeys]    = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [page,           setPage]           = useState(1);
  const [resizedWidths,  setResizedWidths]  = useState<Record<string,number>>({});
  const [sortState,      setSortState]      = useState<SortState>(null);
  const [selectedIds,    setSelectedIds]    = useState<Set<number>>(new Set());
  const [infoUser,       setInfoUser]       = useState<PanelUser | null>(null);
  const [bulkEditOpen,   setBulkEditOpen]   = useState(false);
  const [baseUsers,      setBaseUsers]      = useState<User[]>(INITIAL_USERS);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [showFilterPanel,  setShowFilterPanel]  = useState(false);
  const [appliedConfig,    setAppliedConfig]    = useState<FilterConfig>(EMPTY_CONFIG);
  const [colSettings,      setColSettings]      = useState<ColSetting[]>(() => DEFAULT_COL_SETTINGS.map(s => ({ ...s })));
  const [showColSettings,  setShowColSettings]  = useState(false);
  const [tableDensity,     setTableDensity]     = useState<TableDensity>('normal');
  const [freezeCount,      setFreezeCount]      = useState(1);
  const colSettingsBtnRef = useRef<HTMLButtonElement | null>(null);

  // Density → row heights
  const DENSITY_HEIGHTS: Record<TableDensity, { row: number; group: number }> = {
    compact:  { row: 36, group: 22 },
    normal:   { row: 48, group: 32 },
    expanded: { row: 60, group: 40 },
  };
  const { row: rowHeight, group: groupRowHeight } = DENSITY_HEIGHTS[tableDensity];

  // ── Scrollbar: always-visible, grayed when not needed, active when needed ──
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setCanScroll(el.scrollHeight > el.clientHeight + 1);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();
    return () => ro.disconnect();
  }, []);

  // Persist GroupBy — restore saved keys; if nothing saved, keep default []
  useEffect(()=>{ try { const r=localStorage.getItem(storageKey); if(r){ const {keys}=JSON.parse(r); if(Array.isArray(keys)) setGroupByKeys(keys); } } catch{} },[storageKey]);
  useEffect(()=>{ localStorage.setItem(storageKey,JSON.stringify({keys:groupByKeys})); },[groupByKeys,storageKey]);

  // Sort: one column at a time, toggle asc → desc → off
  const handleSort = useCallback((key:string)=>{
    setSortState(prev=>{
      if (!prev||prev.key!==key) return {key,dir:'asc'};
      if (prev.dir==='asc')      return {key,dir:'desc'};
      return null;
    });
  },[]);

  // Status change handler — updates local state + syncs open panel
  const handleStatusChange = useCallback((userId: number, next: 'Registered' | 'Pending Invitation' | 'Expired Invitation') => {
    setBaseUsers(prev => prev.map(u => u.id === userId ? { ...u, status: next } : u));
    setInfoUser(prev => prev && prev.id === userId ? { ...prev, status: next } : prev);
  }, []);

  // Re-invite handler — flips Expired → Pending and updates the timestamp
  const handleReinvite = useCallback((userId: number, newStatus: 'Pending Invitation', newInvitedAt: string) => {
    setBaseUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus, invitedAt: newInvitedAt } : u));
    setInfoUser(prev => prev && prev.id === userId ? { ...prev, status: newStatus, invitedAt: newInvitedAt } : prev);
  }, []);

  // ── Bulk actions ─────────────────────────────────────────────────────────────
  const handleBulkRemove = useCallback((ids: Set<number>) => {
    setBaseUsers(prev => prev.filter(u => !ids.has(u.id)));
    setSelectedIds(new Set());
  }, []);

  const handleBulkSuspend = useCallback((ids: Set<number>) => {
    setBaseUsers(prev => prev.map(u => ids.has(u.id) ? { ...u, membershipStatus: 'Suspended' as const } : u));
    setSelectedIds(new Set());
  }, []);

  const handleBulkActivate = useCallback((ids: Set<number>) => {
    setBaseUsers(prev => prev.map(u => ids.has(u.id) ? { ...u, membershipStatus: 'Active' as const } : u));
    setSelectedIds(new Set());
  }, []);

  const handleBulkReinvite = useCallback((ids: Set<number>) => {
    const now = new Date().toISOString();
    setBaseUsers(prev => prev.map(u => ids.has(u.id) ? { ...u, status: 'Pending Invitation' as const, invitedAt: now } : u));
    setSelectedIds(new Set());
  }, []);

  // Sorted flat user list — merge base users with any newly added ones
  const allUsers    = useMemo(() => [...baseUsers, ...extraUsers], [baseUsers, extraUsers]);
  const sortedUsers = useMemo(() => applySortToUsers(allUsers, sortState), [allUsers, sortState]);

  // Dynamic filter options — unique sorted values per filterable column
  const filterOptions = useMemo(() => {
    const u = (arr: string[]) => [...new Set(arr)].filter(Boolean).sort();
    return {
      company:        u(allUsers.map(x => x.company)),
      office:         u(allUsers.map(x => x.office)),
      emailDomain:    u(allUsers.map(x => x.email.split('@')[1] ?? '')),
      status:           u(allUsers.map(x => x.status)),
      membershipStatus: u(allUsers.map(x => x.membershipStatus).filter(Boolean) as string[]),
      permissionType:   u(allUsers.map(x => x.permissionType)),
      userType:       u(allUsers.map(x => x.userType)),
      accessLevel:    u(allUsers.map(x => x.accessLevel)),
    };
  }, [allUsers]);

  // Filtered users — apply active filter criteria then search query
  const filterPassedUsers = useMemo(() => applyFilters(sortedUsers, appliedConfig.filters), [sortedUsers, appliedConfig.filters]);
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filterPassedUsers;
    return filterPassedUsers.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [filterPassedUsers, searchQuery]);

  // Reset to page 1 whenever filters or search change
  useEffect(() => { setPage(1); }, [appliedConfig, searchQuery]);

  // Build groups from the FILTERED list
  const groups = useMemo(()=>buildGroupTree(filteredUsers,groupByKeys),[filteredUsers,groupByKeys]);
  useEffect(()=>{ if(groupByKeys.length>0) setExpandedGroups(new Set(collectAllIds(groups))); setPage(1); },[groupByKeys]);// eslint-disable-line

  const allIds      = useMemo(()=>collectAllIds(groups),[groups]);
  const allExpanded = allIds.length>0&&allIds.every(id=>expandedGroups.has(id));

  const toggleGroup   = useCallback((id:string)=>setExpandedGroups(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; }),[]);
  const toggleAll     = useCallback(()=>setExpandedGroups(allExpanded?new Set():new Set(allIds)),[allExpanded,allIds]);
  const addGroupBy    = useCallback((k:string)=>setGroupByKeys(p=>p.includes(k)?p:[...p,k]),[]);
  const removeGroupBy = useCallback((k:string)=>setGroupByKeys(p=>p.filter(x=>x!==k)),[]);
  const clearGroupBy  = useCallback(()=>setGroupByKeys([]),[]);
  const handleResize    = useCallback((key: string, w: number) => setResizedWidths(p => ({ ...p, [key]: w })), []);
  const handleResizeAll = useCallback((widths: Record<string, number>) => setResizedWidths(p => ({ ...p, ...widths })), []);

  // Filter panel handlers
  const handleApplyFilter = useCallback((cfg: FilterConfig) => {
    setAppliedConfig(cfg);
  }, []);
  const handleResetFilter = useCallback(() => {
    setAppliedConfig(EMPTY_CONFIG);
  }, []);

  const filterCount = useMemo(() =>
    Object.values(appliedConfig.filters).filter(v => Array.isArray(v) ? v.length > 0 : Boolean(v)).length,
    [appliedConfig.filters]
  );

  // Derived: hidden cols from BOTH filter visibility and column settings
  const filterHiddenCols = useMemo(() =>
    new Set(Object.entries(appliedConfig.visibility ?? {}).filter(([,v]) => v === 'hide').map(([k]) => k)),
    [appliedConfig]
  );
  const settingsHiddenCols = useMemo(() =>
    new Set(colSettings.filter(s => !s.visible).map(s => s.key)),
    [colSettings]
  );
  const hiddenCols = useMemo(() =>
    new Set([...filterHiddenCols, ...settingsHiddenCols]),
    [filterHiddenCols, settingsHiddenCols]
  );
  // Derived: ordered col keys (all keys, including hidden; drives column order in header+rows)
  const colOrder = useMemo(() =>
    colSettings.filter(s => s.key !== 'user').map(s => s.key),
    [colSettings]
  );

  // Visible dynamic col keys (excluding hidden) — used for frozen map
  const visibleDynColKeys = useMemo(() =>
    colOrder.filter(k => !hiddenCols.has(k)),
    [colOrder, hiddenCols]
  );

  // Frozen column map — recomputed when freezeCount, visible cols or resized widths change
  const frozenMap = useMemo(() =>
    computeFrozenMap(freezeCount, visibleDynColKeys, resizedWidths),
    [freezeCount, visibleDynColKeys, resizedWidths]
  );

  // ── Pagination (must be declared before selection so visibleUsers can reference them) ──
  const isGrouped = groupByKeys.length > 0;
  const flatPag   = useMemo(()=>paginateFlat(filteredUsers,page),[filteredUsers,page]);
  const grpPag    = useMemo(()=>paginateGrouped(groups,page),[groups,page]);
  const { total,totalPages,p:safePage,start1,end1 } = isGrouped ? grpPag : flatPag;

  // ── Selection ──────────────────────────────────────────────────────────────
  // "Visible users" = the users rendered on the current page only
  const visibleUsers = useMemo(()=>{
    if (!isGrouped) return flatPag.items;
    return grpPag.current.flatMap(g => g.users);
  },[isGrouped, flatPag, grpPag]);

  const visibleIds = useMemo(()=>visibleUsers.map(u=>u.id),[visibleUsers]);

  const allVisibleSelected  = visibleIds.length > 0 && visibleIds.every(id => selectedIds.has(id));
  const someVisibleSelected = !allVisibleSelected && visibleIds.some(id => selectedIds.has(id));

  const toggleRow = useCallback((id:number)=>
    setSelectedIds(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; })
  ,[]);

  const toggleSelectAll = useCallback(()=>{
    setSelectedIds(prev=>{
      const next = new Set(prev);
      if (allVisibleSelected) { visibleIds.forEach(id=>next.delete(id)); }
      else                    { visibleIds.forEach(id=>next.add(id));    }
      return next;
    });
  },[allVisibleSelected, visibleIds]);

  // Table context value
  const ctxVal = useMemo<TableCtxType>(()=>({
    resizedWidths, onResize:handleResize, onResizeAll:handleResizeAll, sortState, onSort:handleSort,
    selectedIds, toggleRow, allVisibleSelected, someVisibleSelected, toggleSelectAll,
    onAddUser,
    onInfoClick: (u: User) => { setBulkEditOpen(false); setShowFilterPanel(false); setInfoUser({ id:u.id, name:u.name, email:u.email, jobTitle:u.jobTitle, company:u.company, office:u.office, permissionType:u.permissionType, accessLevel:u.accessLevel, userType:u.userType, status:u.status, membershipStatus:u.membershipStatus, invitedAt:u.invitedAt }); },
    hiddenCols,
    colOrder,
    onFilterClick: () => {
      setShowFilterPanel(p => {
        if (!p) { setBulkEditOpen(false); setInfoUser(null); }
        return !p;
      });
    },
    filterCount,
    onResetFilter: handleResetFilter,
    showColSettings,
    onColSettingsClick: () => setShowColSettings(p => !p),
    colSettingsBtnRef,
    searchQuery,
    onSearchChange: setSearchQuery,
    rowHeight,
    groupRowHeight,
    freezeCount,
    frozenMap,
  }),[resizedWidths,handleResize,handleResizeAll,sortState,handleSort,selectedIds,toggleRow,allVisibleSelected,someVisibleSelected,toggleSelectAll,onAddUser,hiddenCols,colOrder,filterCount,handleResetFilter,showColSettings,colSettingsBtnRef,searchQuery,rowHeight,groupRowHeight,freezeCount,frozenMap]);

  return (
    <TableCtx.Provider value={ctxVal}>
      {/* ── Outer flex-row: [MainCanvas flex-col] + [SidePanel full-height] ── */}
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
            Members
          </h1>
        </div>

        {/* Table zone — padding top + left only (no right/bottom per Figma) */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden', padding: 12 }}>
        <DndProvider backend={HTML5Backend}>
        <div className="flex-1 flex flex-col min-w-0 min-h-0 rounded-[8px] overflow-hidden" style={{ background:'#FAFAFA', border:'1px solid #D9D9D9' }}>

          <Toolbar/>

          <GroupByLane groupByKeys={groupByKeys} onAdd={addGroupBy} onRemove={removeGroupBy}
            onClear={clearGroupBy} allExpanded={allExpanded} onToggleAll={toggleAll}/>

          {/* Scrollable table — vertical scrollbar always reserved (scrollbar-gutter:stable).
              Horizontal scroll appears at the BOTTOM of this flex-1 area (above the pagination
              footer) whenever column widths exceed the viewport width — requirement §5. */}
          <div ref={scrollRef}
            className={`flex-1 min-h-0 overflow-x-auto ux-tbl-scroll${canScroll?' can-scroll':''}`}
            style={{ overflowY:'scroll', scrollbarGutter:'stable' }}>
            <style>{`
              .ux-tbl-scroll::-webkit-scrollbar { width: 7px; }
              .ux-tbl-scroll::-webkit-scrollbar-track {
                background: #f0f2f4;
                border-left: 1px solid #F0F0F0;
              }
              .ux-tbl-scroll::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: #dde0e4;
              }
              .ux-tbl-scroll.can-scroll::-webkit-scrollbar-thumb {
                background: #a0aab4;
              }
              .ux-tbl-scroll.can-scroll::-webkit-scrollbar-thumb:hover {
                background: #6b7886;
              }
              /* Firefox */
              .ux-tbl-scroll { scrollbar-width: thin; scrollbar-color: #dde0e4 #f0f2f4; }
              .ux-tbl-scroll.can-scroll { scrollbar-color: #a0aab4 #f0f2f4; }
            `}</style>
            <div className="sticky top-0 z-10"><TableHeader/></div>
            {isGrouped
              ?<GroupRows groups={grpPag.current} depth={0} expanded={expandedGroups} onToggle={toggleGroup}/>
              :flatPag.items.map(u=><UserRow key={u.id} user={u}/>)
            }
            {!isGrouped&&flatPag.items.length===0&&(
              <div className="flex items-center justify-center h-[160px] text-[#9ca3af] text-[13px]">No users found.</div>
            )}
          </div>

          {/* Pagination footer — Figma spec: 40×40 chips, 8px radius, Outfit Medium */}
          <div className="relative flex items-center justify-between shrink-0" style={{ background:'#FAFAFA', borderTop:'1px solid #F0F0F0', height:64, padding:'0 16px' }}>
            <span style={{ fontFamily:'Open Sans,sans-serif', fontSize:12, color:'#667085' }}>Showing {start1}–{end1} of {total} users</span>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              {/* Prev arrow button — Tertiary Medium (§15.3) */}
              <button
                disabled={safePage<=1}
                onClick={()=>setPage(p=>p-1)}
                style={{
                  width:36, height:36, borderRadius:4,
                  background:'transparent', border:'none',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor: safePage<=1 ? 'not-allowed' : 'pointer',
                  flexShrink:0, padding:0, transition:'background 0.15s',
                }}
                onMouseEnter={e=>{ if(safePage>1)(e.currentTarget as HTMLButtonElement).style.background='#E5E7E9'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background='transparent'; }}
                onMouseDown={e=>{ if(safePage>1)(e.currentTarget as HTMLButtonElement).style.background='#616D79'; }}
                onMouseUp={e=>{ if(safePage>1)(e.currentTarget as HTMLButtonElement).style.background='#E5E7E9'; }}
              >
                <svg width="20" height="20" viewBox="0 0 14.8345 11.5" fill="none" style={{ flexShrink:0 }}>
                  <path d={svgArrows.p2d0593c0} stroke={safePage<=1 ? '#BFBFBF' : '#616D79'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
              </button>

              {/* Page number chips — gap 2px between them */}
              <div style={{ display:'flex', alignItems:'center', gap:2 }}>
                {pageNums(totalPages,safePage).map((n,i)=>(
                  <button key={i}
                    onClick={()=>typeof n==='number'&&setPage(n)}
                    disabled={n==='…'}
                    style={{
                      width:40, height:40, borderRadius:8,
                      background: n===safePage ? '#FF4D00' : 'transparent',
                      border:'none', cursor: n==='…' ? 'default' : 'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, padding:12, transition:'background 0.15s',
                    }}
                    onMouseEnter={e=>{ if(n!==safePage && n!=='…')(e.currentTarget as HTMLButtonElement).style.background='#F0F0F0'; }}
                    onMouseLeave={e=>{ if(n!==safePage)(e.currentTarget as HTMLButtonElement).style.background='transparent'; }}
                  >
                    <span style={{
                      fontFamily:"'Outfit', sans-serif", fontWeight:500, fontSize:14, lineHeight:'20px',
                      color: n===safePage ? '#FFFFFF' : '#243746',
                      whiteSpace:'nowrap',
                    }}>{n}</span>
                  </button>
                ))}
              </div>

              {/* Next arrow button — Tertiary Medium (§15.3) */}
              <button
                disabled={safePage>=totalPages}
                onClick={()=>setPage(p=>p+1)}
                style={{
                  width:36, height:36, borderRadius:4,
                  background:'transparent', border:'none',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor: safePage>=totalPages ? 'not-allowed' : 'pointer',
                  flexShrink:0, padding:0, transition:'background 0.15s',
                }}
                onMouseEnter={e=>{ if(safePage<totalPages)(e.currentTarget as HTMLButtonElement).style.background='#E5E7E9'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background='transparent'; }}
                onMouseDown={e=>{ if(safePage<totalPages)(e.currentTarget as HTMLButtonElement).style.background='#616D79'; }}
                onMouseUp={e=>{ if(safePage<totalPages)(e.currentTarget as HTMLButtonElement).style.background='#E5E7E9'; }}
              >
                <svg width="20" height="20" viewBox="0 0 14.8345 11.5" fill="none" style={{ flexShrink:0 }}>
                  <path d={svgArrows.p36164580} stroke={safePage>=totalPages ? '#BFBFBF' : '#616D79'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            {/* ── Floating selection action bar — centered in the footer strip ── */}
            {selectedIds.size > 0 && (
              <SelectionActionBar
                selectedIds={selectedIds}
                allUsers={[...baseUsers, ...extraUsers]}
                onRemove={handleBulkRemove}
                onSuspend={handleBulkSuspend}
                onActivate={handleBulkActivate}
                onReinvite={handleBulkReinvite}
                onClearSelection={() => setSelectedIds(new Set())}
                onBulkEdit={() => { setInfoUser(null); setBulkEditOpen(true); }}
                onEditOne={(u) => { setBulkEditOpen(false); setInfoUser({ id:u.id, name:u.name, email:u.email, jobTitle:u.jobTitle, company:u.company, office:u.office, permissionType:u.permissionType, accessLevel:u.accessLevel, userType:u.userType, status:u.status, membershipStatus:u.membershipStatus, invitedAt:u.invitedAt }); }}
              />
            )}
          </div>
        </div>
      </DndProvider>
        </div>{/* end table zone */}
      </div>{/* end MainCanvas */}

      {/* ── SidePanel: full-height sibling of MainCanvas, flush right, animated width ── */}
      <div style={{
        flexShrink: 0,
        width: (bulkEditOpen || !!infoUser || showFilterPanel) ? 370 : 0,
        minHeight: 0,
        overflow: 'hidden',
        transition: 'width 0.26s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        {showFilterPanel && (
          <FilterPanel
            onClose={() => setShowFilterPanel(false)}
            options={filterOptions}
            config={appliedConfig}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          />
        )}
        {!showFilterPanel && bulkEditOpen && (
          <BulkEditPanel
            selectedIds={selectedIds}
            allUsers={[...baseUsers, ...extraUsers]}
            isOpen={bulkEditOpen}
            onClose={() => setBulkEditOpen(false)}
            onApplyField={(field, value, ids) => {
              setBaseUsers(prev => prev.map(u =>
                ids.has(u.id) ? { ...u, [field]: value } : u
              ));
            }}
            onRemove={(ids) => {
              setBaseUsers(prev => prev.filter(u => !ids.has(u.id)));
              setSelectedIds(new Set());
              setBulkEditOpen(false);
            }}
          />
        )}
        {!showFilterPanel && !!infoUser && (
          <PersonalInfoPanel
            user={infoUser}
            onClose={() => setInfoUser(null)}
            isProjectAdmin={true}
            onStatusChange={handleStatusChange}
            onReinvite={handleReinvite}
            onRemove={(userId) => {
              setBaseUsers(prev => prev.filter(u => u.id !== userId));
              setInfoUser(null);
            }}
          />
        )}
      </div>

      </div>{/* end outer flex-row */}

      {/* ── Column Settings panel (floating flyout) ── */}
      {showColSettings && (
        <ColumnSettingsPanel
          colSettings={colSettings}
          onChange={setColSettings}
          onClose={() => setShowColSettings(false)}
          anchorRef={colSettingsBtnRef}
          tableDensity={tableDensity}
          onDensityChange={setTableDensity}
          freezeCount={freezeCount}
          onFreezeCountChange={setFreezeCount}
        />
      )}

    </TableCtx.Provider>
  );
}