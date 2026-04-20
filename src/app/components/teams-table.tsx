import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { INITIAL_USERS } from './users-table';
import { AddParticipantModal } from './add-participant-modal';
import { TRADE_ITEMS } from './reference-data-table';
import svgPaths from '../../imports/svg-g9006cz7g5';
import trashPaths from '../../imports/svg-fjqvq36uqo';
import memberSvg from '../../imports/svg-kxdakwz0vq';
import companySvg from '../../imports/svg-c3qmohccmn';
import roleSvg from '../../imports/svg-peu7na2q36';
import checkboxPaths from '../../imports/svg-k8hgzstpgn';
import toolbarPaths from '../../imports/svg-2txu3l5luk';
import checkIconPaths from '../../imports/svg-1q1eitm85y';
import figmaSvg from '../../imports/svg-asgatr96e1';
import { imgGroup } from '../../imports/svg-71u6a';
import memberIconPaths from '../../imports/svg-5uwtku9fcb';

// ─── Types ────────────────────────────────────────────────────────────────────
export type MemberType = 'member' | 'role' | 'company' | 'team';

export interface TeamMember {
  id: string;
  type: MemberType;
  name: string;
  /** job title (member) | role code (role) | industry (company) | "N members" (team) */
  subtitle: string;
  /** extra contextual description shown in Description column */
  description: string;
  avatarBg?: string;
  avatarText?: string;
  userId?: number;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  group: string;           // section header for left-panel grouping
  trade: string;           // Trade from Reference Data
  accentBg: string;
  accentText: string;
  description: string;
  active: boolean;
  members: TeamMember[];
}

// ─── ID generator ─────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `team_${Date.now()}_${++_uid}`; }

// ─── Colour helpers ────────────────────────────────────────────────────────────
const USER_COLORS = ['#3B5998','#E4405F','#2D8653','#9B59B6','#E67E22','#1ABC9C','#E74C3C','#34495E','#16A085','#8E44AD'];

const COMPANY_COLORS: Record<string, [string,string]> = {
  'Henrich Advisory': ['#DDE9FF','#465FFF'],
  'Apex Engineering':  ['#E6F4EA','#1E7E34'],
  'TechCorp':          ['#FFF3E0','#E65100'],
  'BuildSmart':        ['#FCE4EC','#C62828'],
  'CityWorks':         ['#E8EAF6','#3949AB'],
  'Meridian Group':    ['#FFF8E1','#F9A825'],
  'Turner & Co':       ['#E3F2FD','#1565C0'],
  'Skanska':           ['#E8F5E9','#2E7D32'],
  'Bechtel':           ['#FBE9E7','#BF360C'],
  'AECOM':             ['#F3E5F5','#7B1FA2'],
  'Arup':              ['#E0F7FA','#006064'],
  'Jacobs':            ['#F1F8E9','#558B2F'],
};

// ─── Data helpers ─────────────────────────────────────────────────────────────
function memberFromUser(userId: number): TeamMember {
  const user = INITIAL_USERS.find(x => x.id === userId)!;
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  return {
    id: `m-${userId}`,
    type: 'member',
    name: user.name,
    subtitle: user.jobTitle,
    description: user.jobTitle,
    avatarBg: USER_COLORS[userId % USER_COLORS.length],
    avatarText: initials,
    userId,
  };
}

function roleEntry(id: string, name: string, code: string, group: string): TeamMember {
  return { id: `r-${id}`, type: 'role', name, subtitle: code, description: group, avatarBg: '#F2F3F4', avatarText: code.slice(0,3) };
}

function companyEntry(id: string, name: string, industry: string): TeamMember {
  const [bg, text] = COMPANY_COLORS[name] ?? ['#F5F5F5','#616D79'];
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return { id: `c-${id}`, type: 'company', name, subtitle: industry, description: industry, avatarBg: bg, avatarText: initials };
}

function teamRef(id: string, name: string, count: number, group: string): TeamMember {
  return { id: `t-${id}`, type: 'team', name, subtitle: `${count} members`, description: group, avatarBg: '#E6F7FF', avatarText: '⊕' };
}

// ─── Seed data ────────────────────────────────────────────────────────────────
export const INITIAL_TEAMS: Team[] = [
  {
    id: 'core-construction',
    name: 'Core Construction Team', code: 'CCT',
    group: 'FIELD OPERATIONS', trade: 'Construction Management',
    accentBg: '#DDE9FF', accentText: '#465FFF',
    description: 'The main group responsible for executing and managing the construction work on the project.',
    active: true,
    members: [
      memberFromUser(1),   // Captain Levi — VDC Manager
      memberFromUser(25),  // Aaron Fletcher — Construction Manager
      memberFromUser(26),  // Brianna Walsh — Construction Manager
      memberFromUser(45),  // Ulrich Baumann — Site Manager
      memberFromUser(55),  // Eduardo Ferreira — Superintendent
      roleEntry('cm', 'Construction Manager', 'CM', 'Construction'),
      roleEntry('sm', 'Site Manager', 'SM', 'Construction'),
      companyEntry('turner', 'Turner & Co', 'General Contractor'),
    ],
  },
  {
    id: 'site-supervisors',
    name: 'Site Supervisors', code: 'SITE-S',
    group: 'FIELD OPERATIONS', trade: 'General Contractor',
    accentBg: '#E0F7FA', accentText: '#006064',
    description: 'On-ground supervisors coordinating day-to-day field activities across all zones.',
    active: true,
    members: [
      memberFromUser(3),   // Marcus Reed
      memberFromUser(47),  // Weston Clarke
      memberFromUser(61),  // Klaus Richter
      roleEntry('supt', 'Superintendent', 'SUPT', 'Construction'),
      roleEntry('gsupt', 'General Superintendent', 'GSUPT', 'Construction'),
      companyEntry('skanska', 'Skanska', 'General Contractor'),
    ],
  },
  {
    id: 'safety-compliance',
    name: 'Safety & Compliance', code: 'S&C',
    group: 'FIELD OPERATIONS', trade: '',
    accentBg: '#FCE4EC', accentText: '#C62828',
    description: 'Health, safety and environment management across all site operations and activities.',
    active: true,
    members: [
      memberFromUser(7),   // Liam Foster — Safety Officer
      memberFromUser(50),  // Zara Ahmed — Safety Manager
      memberFromUser(57),  // Grant Whitmore — HSE Manager
      roleEntry('hse', 'HSE Manager', 'HSE', 'Construction'),
      companyEntry('bechtel', 'Bechtel', 'Engineering & Construction'),
    ],
  },
  {
    id: 'owners-panel',
    name: "Owner's Representative Panel", code: 'ORP',
    group: 'MANAGEMENT & ADMIN', trade: 'Construction Management',
    accentBg: '#FFF3E0', accentText: '#E65100',
    description: 'Client-side ownership roles responsible for project decisions, approvals, and sign-off.',
    active: true,
    members: [
      memberFromUser(19),  // Owen Burke — Contracts Manager
      memberFromUser(72),  // Wendy Nakagawa — Owner Representative
      companyEntry('meridian', 'Meridian Group', 'Project Advisory'),
      companyEntry('henrich', 'Henrich Advisory', 'Construction Management'),
      roleEntry('or', 'Owner Representative', 'OR', 'Owner'),
    ],
  },
  {
    id: 'project-management',
    name: 'Project Management Office', code: 'PMO',
    group: 'MANAGEMENT & ADMIN', trade: 'Construction Management',
    accentBg: '#E3F2FD', accentText: '#1565C0',
    description: 'Executive project management, scheduling, risk, and coordination hub for the project.',
    active: true,
    members: [
      memberFromUser(9),   // Rafael Cruz — Project Manager
      memberFromUser(17),  // Ben Harlow — Infrastructure PM
      memberFromUser(46),  // Victoria Lam — Project Engineer
      memberFromUser(65),  // Orlando Mwangi — Assistant PM
      roleEntry('pm', 'Project Manager', 'PM', 'Management'),
      roleEntry('dpm', 'Deputy Project Manager', 'DPM', 'Management'),
      teamRef('owners-panel', "Owner's Representative Panel", 5, 'Management & Admin'),
    ],
  },
  {
    id: 'design-cluster',
    name: 'Design Cluster', code: 'DSN-CL',
    group: 'ENGINEERING & DESIGN', trade: 'Design / Architecture',
    accentBg: '#FDF2FA', accentText: '#DD2590',
    description: 'Architectural, interior and design coordination across all disciplines on the project.',
    active: true,
    members: [
      memberFromUser(4),   // Dana Whitfield — Project Architect
      memberFromUser(12),  // Chiara Bianchi — Design Lead
      memberFromUser(64),  // Noelle Tremblay — Design Coordinator
      memberFromUser(71),  // Vincent Lagarde — Design Manager
      roleEntry('arch', 'Architect', 'ARCH', 'Design'),
      roleEntry('dm', 'Design Manager', 'DM', 'Design'),
    ],
  },
  {
    id: 'structural-engineering',
    name: 'Structural Engineering Group', code: 'SEG',
    group: 'ENGINEERING & DESIGN', trade: 'Structural Engineering',
    accentBg: '#FFF8E1', accentText: '#F9A825',
    description: 'Structural design review, load path verification, and field RFI resolution.',
    active: true,
    members: [
      memberFromUser(5),   // James Obi — Structural Engineer
      memberFromUser(48),  // Xenia Papadopoulos
      roleEntry('se', 'Structural Engineer', 'SE', 'Engineering'),
      companyEntry('apex', 'Apex Engineering', 'Engineering'),
      teamRef('bim-coordination', 'BIM Coordination', 7, 'Digital'),
    ],
  },
  {
    id: 'mep-working-group',
    name: 'MEP Working Group', code: 'MEP',
    group: 'ENGINEERING & DESIGN', trade: 'MEP Engineering',
    accentBg: '#E8F5E9', accentText: '#2E7D32',
    description: 'Mechanical, electrical and plumbing coordination across all building services packages.',
    active: true,
    members: [
      memberFromUser(6),   // Priya Mehta — MEP Designer
      memberFromUser(53),  // Christopher Eze — Electrical Engineer
      memberFromUser(59),  // Ian Beaumont — Mechanical Engineer
      memberFromUser(62),  // Lydia Nguyen — Fire Protection Engineer
      memberFromUser(68),  // Samantha Osei — Plumbing Engineer
      roleEntry('me', 'Mechanical Engineer', 'ME', 'Engineering'),
      roleEntry('ee', 'Electrical Engineer', 'EE', 'Engineering'),
      companyEntry('techcorp', 'TechCorp', 'Engineering Services'),
    ],
  },
  {
    id: 'bim-coordination',
    name: 'BIM Coordination', code: 'BIM-C',
    group: 'DIGITAL', trade: 'BIM / VDC',
    accentBg: '#E6F4EA', accentText: '#1E7E34',
    description: 'Digital delivery, model coordination, clash detection, and BIM standards compliance.',
    active: true,
    members: [
      memberFromUser(2),   // Anna Kovacs — BIM Coordinator
      memberFromUser(22),  // Elena Vasquez — BIM Manager
      memberFromUser(52),  // Beatrice Morin — BIM Manager
      memberFromUser(66),  // Penelope Kowalski — BIM Coordinator
      roleEntry('bimm', 'BIM Manager', 'BIMM', 'BIM'),
      roleEntry('bimc', 'BIM Coordinator', 'BIMC', 'BIM'),
      teamRef('core-construction', 'Core Construction Team', 8, 'Field Operations'),
    ],
  },
  {
    id: 'digital-delivery',
    name: 'Digital Delivery Task Force', code: 'DDL',
    group: 'DIGITAL', trade: '',
    accentBg: '#E8EAF6', accentText: '#3949AB',
    description: 'VDC workflows, digital handover, CDE management, and information requirements.',
    active: false,
    members: [
      memberFromUser(1),   // Captain Levi — VDC Manager
      memberFromUser(63),  // Martin Gallego — VDC Manager
      roleEntry('vdc', 'VDC Manager', 'VDC', 'BIM'),
      teamRef('bim-coordination', 'BIM Coordination', 7, 'Digital'),
      companyEntry('arup', 'Arup', 'Engineering & Design'),
    ],
  },
];

// ─── Team groups ordering ─────────────────────────────────────────────────────
const GROUP_ORDER = ['FIELD OPERATIONS', 'MANAGEMENT & ADMIN', 'ENGINEERING & DESIGN', 'DIGITAL'];

// ─── SVG icon imports (from Figma) ───────────────────────────────────────────
// svgPaths.p33437200 = plus icon  |  svgPaths.pda9fb80 = search circle  |  svgPaths.p26ac7040 = search tail

// ─── Inline icon components ───────────────────────────────────────────────────
function SearchIconSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="6.5" cy="6.5" r="5" stroke="#9CA4AE" strokeWidth="1.2" />
      <path d="M10.5 10.5L14 14" stroke="#9CA4AE" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIconSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d={svgPaths.p33437200} fill="white" />
    </svg>
  );
}

function EditIconSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 1.5L12.5 4.5L5 12H2V9L9.5 1.5Z"
        stroke="#616D79" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Remove icon button — canonical TrashIcon from svg-fjqvq36uqo (§23) ─────
function RemoveIconBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onClick={e => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      title="Remove from team"
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov || pressed ? '#FFF1F0' : 'transparent',
        border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.15s', padding: 0,
      }}
    >
      {/* Figma trash icon — svg-asgatr96e1 p7115580, viewBox matches Figma 16×16 */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clipPath="url(#clip_trash_btn)">
          <path d={figmaSvg.p7115580} fill={hov || pressed ? '#D92D20' : '#616D79'} />
        </g>
        <defs><clipPath id="clip_trash_btn"><rect fill="white" width="16" height="16" /></clipPath></defs>
      </svg>
    </button>
  );
}

// ─── Checkbox constants — exact same as Members table (users-table.tsx) ────────
const CB_BLUE = '#0E70CB';
const CB_RECT = 'M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0Z';

function CheckboxIcon({ checked, indeterminate = false, onClick }: {
  checked: boolean; indeterminate?: boolean; onClick?: (e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={e => { e.stopPropagation(); onClick?.(e); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
        borderRadius: 4,
      }}
    >
      {checked ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={checkboxPaths.pae529f2} fill={CB_BLUE} />
        </svg>
      ) : indeterminate ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={CB_RECT} fill={CB_BLUE} />
          <path d="M4.5 9H13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={CB_RECT} fill={hovered ? '#F0F7FF' : 'white'} style={{ transition: 'fill 0.1s' }} />
          <path d={CB_RECT} fill="none" stroke={hovered ? CB_BLUE : '#D0D5DD'}
            style={{ strokeWidth: 1.5, transition: 'stroke 0.1s' }} />
        </svg>
      )}
    </button>
  );
}

// ─── Figma-sourced member person icon (FigmaMemberIcon frame) ─────────────────
function FigmaMemberIcon() {
  return (
    <div style={{ width: 28, height: 28, background: '#F0F2F5', borderRadius: 6, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
      {/* Container: absolute left 5px, top 5px, 18×18, px 1.219px */}
      <div style={{ position: 'absolute', left: 5, top: 5, width: 18, height: 18, paddingLeft: 1.219, paddingRight: 1.219, paddingTop: 0, boxSizing: 'border-box' }}>
        {/* Icon: 18.5px tall, overflow clip */}
        <div style={{ position: 'relative', width: '100%', height: 18.5, overflow: 'hidden' }}>
          {/* Group: inset 5.26% 6.25% */}
          <div style={{ position: 'absolute', top: '5.26%', right: '6.25%', bottom: '5.26%', left: '6.25%' }}>
            {/* Vector 1 — head: inset 5.26% 18.75% 42.11% 18.75% */}
            <div style={{ position: 'absolute', top: '5.26%', right: '18.75%', bottom: '42.11%', left: '18.75%' }}>
              <div style={{ position: 'absolute', top: '-9.99%', right: '-10%', bottom: '-9.99%', left: '-10%' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 11.6727 11.6829">
                  <path d={memberIconPaths.p16a82700} stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94584" />
                </svg>
              </div>
            </div>
            {/* Vector 2 — body: inset 57.89% 6.25% 5.26% 6.25% */}
            <div style={{ position: 'absolute', top: '57.89%', right: '6.25%', bottom: '5.26%', left: '6.25%' }}>
              <div style={{ position: 'absolute', top: '-14.27%', right: '-7.14%', bottom: '-14.27%', left: '-7.14%' }}>
                <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 15.5635 8.76189">
                  <path d={memberIconPaths.p2e749380} stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94584" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Figma-sourced role icon (person with role lines) ───────────���─────────────
function FigmaRoleIcon() {
  return (
    <div style={{ width: 28, height: 28, background: '#F0F2F5', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g clipPath="url(#clip_role_figma)">
          <path d={roleSvg.p3db7b080} stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={roleSvg.p3e81e900} stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={roleSvg.p3fee0600} stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
        </g>
        <defs><clipPath id="clip_role_figma"><rect fill="white" width="18" height="18" /></clipPath></defs>
      </svg>
    </div>
  );
}

// ─── Figma-sourced company icon ────────────────────────────────────────────────
function FigmaCompanyIcon() {
  return (
    <div style={{ width: 28, height: 28, background: '#F0F2F5', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="15" height="16.5" viewBox="0 0 15 16.5" fill="none">
        <path d={figmaSvg.p1c17b000} stroke="#384857" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M0.75 15.75H14.25" stroke="#384857" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={figmaSvg.p3ac94a00} stroke="#384857" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={figmaSvg.p108bc880} stroke="#384857" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Figma-sourced team icon ───────────────────────────────────────────────────
function FigmaTeamIcon() {
  return (
    <div style={{ width: 28, height: 28, background: '#F0F2F5', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="7" r="3" stroke="#384857" strokeWidth="1.5" />
        <path d="M1 18c0-3 2.7-5 6-5" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="7" r="3" stroke="#384857" strokeWidth="1.5" />
        <path d="M13 13c3.3 0 6 2 6 5" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ─── Type icons (per member type) — Figma Container-2181-17845 ───────────────
function MemberTypeDisplay({ type }: { type: MemberType }) {
  const label = type === 'member' ? 'Member' : type === 'role' ? 'Role' : type === 'company' ? 'Company' : 'Team';
  const icon = type === 'member' ? <FigmaMemberIcon /> : type === 'role' ? <FigmaRoleIcon /> : type === 'company' ? <FigmaCompanyIcon /> : <FigmaTeamIcon />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28, flexShrink: 0 }}>
      {icon}
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function MemberAvatar({ member }: { member: TeamMember }) {
  const size = 32;
  if (member.type === 'team') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 6, flexShrink: 0,
        background: '#E6F7FF', border: '1px solid #91D5FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="7" cy="7" r="3" stroke="#1890FF" strokeWidth="1.5" />
          <path d="M1 18c0-3 2.7-5 6-5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="13" cy="7" r="3" stroke="#1890FF" strokeWidth="1.5" />
          <path d="M13 13c3.3 0 6 2 6 5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (member.type === 'company') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 6, flexShrink: 0,
        background: member.avatarBg ?? '#F2F3F4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 700, color: member.avatarText ?? '#384857', letterSpacing: '-0.3px' }}>
          {member.avatarText?.slice(0,2)}
        </span>
      </div>
    );
  }
  if (member.type === 'role') {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        background: '#F2F3F4', border: '1px solid #C3C7CC',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 9, fontWeight: 700, color: '#384857', letterSpacing: '-0.5px' }}>
          {member.subtitle.slice(0,4)}
        </span>
      </div>
    );
  }
  // member — Figma: bg-[color] rounded-[16px] size-[32px], initials Open Sans SemiBold 12px white
  return (
    <div style={{
      width: size, height: size, borderRadius: 16, flexShrink: 0,
      background: member.avatarBg ?? '#3B5998',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: 'white' }}>
        {member.avatarText ?? '?'}
      </span>
    </div>
  );
}

// ─── Accent badge (left panel) ────────────────────────────────────────────────
function TeamCodeBadge({ team }: { team: Team }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: team.accentBg, borderRadius: 3, padding: '1px 6px', flexShrink: 0,
    }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: team.accentText }} />
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 10, fontWeight: 700, color: team.accentText }}>
        {team.code}
      </span>
    </div>
  );
}

// ─── Create / Edit Team Modal ─────────────────────────────────────────────────
const ACCENT_OPTIONS: { bg: string; text: string; label: string }[] = [
  { bg: '#DDE9FF', text: '#465FFF', label: 'Indigo' },
  { bg: '#FDF2FA', text: '#DD2590', label: 'Pink' },
  { bg: '#E6F4EA', text: '#1E7E34', label: 'Green' },
  { bg: '#FFF3E0', text: '#E65100', label: 'Orange' },
  { bg: '#E8F5E9', text: '#2E7D32', label: 'Forest' },
  { bg: '#FCE4EC', text: '#C62828', label: 'Red' },
  { bg: '#E3F2FD', text: '#1565C0', label: 'Blue' },
  { bg: '#E8EAF6', text: '#3949AB', label: 'Purple' },
  { bg: '#FFF8E1', text: '#F9A825', label: 'Gold' },
  { bg: '#E0F7FA', text: '#006064', label: 'Teal' },
];

interface TeamFormData {
  name: string; code: string; description: string; group: string; trade: string;
  accentBg: string; accentText: string;
}

const GROUP_NAMES = ['FIELD OPERATIONS', 'MANAGEMENT & ADMIN', 'ENGINEERING & DESIGN', 'DIGITAL'];

// ─── Design-system SelectInput §16.8 ─────────────────────────────────────────
interface SelectOption { value: string; label: string; }

function ModalSelectInput({
  value, onChange, options, placeholder = 'Select…', allowNone = true,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  allowNone?: boolean;
}) {
  const [open, setOpen]           = useState(false);
  const [query, setQuery]         = useState('');
  const triggerRef                = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const menuRef                   = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // Position menu under trigger
  const openMenu = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
      zIndex: 9999,
    });
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        menuRef.current    && !menuRef.current.contains(e.target as Node)
      ) { setOpen(false); setQuery(''); }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const noneOption: SelectOption = { value: '', label: '— None —' };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q.length >= 2 ? options.filter(o => o.label.toLowerCase().includes(q)) : options;
    // Only show None option when not searching (so search results are clean)
    return (allowNone && q.length < 2) ? [noneOption, ...base] : base;
  }, [options, query, allowNone]);

  const selectedLabel = value === '' ? (allowNone ? '— None —' : '') : (options.find(o => o.value === value)?.label ?? '');

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => open ? (setOpen(false), setQuery('')) : openMenu()}
        style={{
          width: '100%', height: 40, borderRadius: 4,
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          background: '#FFFFFF', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', padding: '0 10px',
          cursor: 'pointer', transition: 'border-color 0.15s',
          gap: 6,
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.borderColor = '#A8B0BB'; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.borderColor = '#D0D5DD'; }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onClick={e => e.stopPropagation()}
            placeholder="Search…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054',
            }}
          />
        ) : (
          <span style={{
            flex: 1, fontFamily: 'Open Sans, sans-serif', fontSize: 14,
            color: selectedLabel ? '#344054' : '#9EA3A9',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {selectedLabel || placeholder}
          </span>
        )}
        {/* Chevron */}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="M2 4L6 8L10 4" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Portalled dropdown */}
      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
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
          ) : filtered.map(opt => {
            const isSelected = opt.value === value;
            const isNoneOpt  = opt.value === '' && opt.label === '— None —';
            return (
              <ModalSelectItem
                key={opt.value === '' ? '__none__' : opt.value}
                label={opt.label}
                selected={isSelected}
                isNone={isNoneOpt}
                onSelect={() => { onChange(opt.value); setOpen(false); setQuery(''); }}
              />
            );
          })}
        </div>,
        document.body,
      )}
    </>
  );
}

function ModalSelectItem({ label, selected, onSelect, isNone = false }: { label: string; selected: boolean; onSelect: () => void; isNone?: boolean; }) {
  const [hov, setHov] = useState(false);
  return (
    <>
      <div
        onClick={onSelect}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px', cursor: 'pointer',
          background: selected ? '#E6F7FF' : hov ? '#F5F5F5' : 'transparent',
          transition: 'background 0.1s',
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          fontWeight: selected ? 600 : 400,
          color: isNone ? '#9EA3A9' : '#384857',
          fontStyle: isNone ? 'italic' : 'normal',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
        {selected && !isNone && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
            <path d="M1 5L4.5 8.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {/* Divider after None option */}
      {isNone && <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />}
    </>
  );
}

function CreateTeamModal({ onClose, onSave, editTeam }: {
  onClose: () => void;
  onSave: (data: TeamFormData) => void;
  editTeam?: Team;
}) {
  const randomAccent = useMemo(() => ACCENT_OPTIONS[Math.floor(Math.random() * ACCENT_OPTIONS.length)], []);

  // Build trade options from TRADE_ITEMS
  const tradeOptions: SelectOption[] = useMemo(
    () => TRADE_ITEMS.map(t => ({ value: t.name, label: t.name })),
    [],
  );

  const [form, setForm] = useState<TeamFormData>({
    name:       editTeam?.name        ?? '',
    code:       editTeam?.code        ?? '',
    description:editTeam?.description ?? '',
    group:      editTeam?.group       ?? GROUP_NAMES[0],
    trade:      editTeam?.trade       ?? '',
    accentBg:   editTeam?.accentBg    ?? randomAccent.bg,
    accentText: editTeam?.accentText  ?? randomAccent.text,
  });
  const [nameFocused, setNameFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);
  const valid = form.name.trim().length > 0;

  // §16 input style
  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%', height: 40, borderRadius: 4,
    border: `1px solid ${focused ? '#91D5FF' : '#D0D5DD'}`,
    background: '#FFFFFF', outline: 'none',
    padding: '0 10px',
    fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  });

  // §3.4 Label style — Inter 14px/600
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
    lineHeight: '20px', color: '#1D2C38',
    display: 'block', marginBottom: 6,
  };

  return ReactDOM.createPortal(
    <div
      style={{ position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,0.20)',display:'flex',alignItems:'center',justifyContent:'center' }}
      onClick={onClose}
    >
      <div
        style={{ width:520,background:'#FFFFFF',borderRadius:8,boxShadow:'0 8px 40px rgba(0,0,0,0.24)',overflow:'visible',display:'flex',flexDirection:'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header §10.3 ── */}
        <div style={{ flexShrink:0, borderRadius:'8px 8px 0 0', overflow:'hidden' }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',height:72,padding:'0 24px',background:'#FFFFFF' }}>
            <p style={{ fontFamily:"'Actor', sans-serif",fontWeight:400,fontSize:24,lineHeight:'28.8px',color:'#1B2736',margin:0 }}>
              {editTeam ? 'Edit Team' : 'Create Team'}
            </p>
            <button
              onClick={onClose}
              style={{ display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'none',cursor:'pointer',borderRadius:40,transition:'background-color 0.15s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='#F5F6F7';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='transparent';}}
            >
              <div style={{ padding:8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height:1,background:'#F0F0F0' }} />
        </div>

        {/* ── Body ── */}
        <div style={{ padding:'24px 24px 20px',display:'flex',flexDirection:'column',gap:20 }}>

          {/* Team Name */}
          <div>
            <label style={labelStyle}>
              Team Name <span style={{ color:'#FFA39E',fontWeight:400 }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Core Construction Team"
              value={form.name}
              onChange={e => setForm(f => ({...f, name: e.target.value}))}
              onFocus={() => setNameFocused(true)}
              onBlur={()  => setNameFocused(false)}
              style={inputStyle(nameFocused)}
            />
          </div>

          {/* Code + Trade row */}
          <div style={{ display:'flex', gap:12 }}>
            {/* Code */}
            <div style={{ flex:1 }}>
              <label style={labelStyle}>Code</label>
              <input
                type="text"
                placeholder="e.g. CCT"
                value={form.code}
                onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))}
                onFocus={() => setCodeFocused(true)}
                onBlur={()  => setCodeFocused(false)}
                style={{ ...inputStyle(codeFocused), textTransform:'uppercase' }}
                maxLength={10}
              />
            </div>

            {/* Trade — §16.8 SelectInput with TRADE_ITEMS */}
            <div style={{ flex:1 }}>
              <label style={labelStyle}>Trade</label>
              <ModalSelectInput
                value={form.trade}
                onChange={v => setForm(f => ({...f, trade: v}))}
                options={tradeOptions}
                placeholder="— None —"
                allowNone={true}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Brief description of this team's purpose…"
              value={form.description}
              onChange={e => setForm(f => ({...f, description: e.target.value}))}
              onFocus={() => setDescFocused(true)}
              onBlur={()  => setDescFocused(false)}
              rows={3}
              style={{
                width:'100%', borderRadius:4,
                border:`1px solid ${descFocused ? '#91D5FF' : '#D0D5DD'}`,
                background:'#FFFFFF', outline:'none', padding:'8px 10px',
                fontFamily:'Open Sans, sans-serif', fontSize:14, fontWeight:400, color:'#344054',
                boxSizing:'border-box', transition:'border-color 0.15s',
                resize:'vertical', minHeight:72,
              }}
            />
          </div>
        </div>

        {/* ── Footer §10.4 ── */}
        <div style={{ flexShrink:0, borderRadius:'0 0 8px 8px', overflow:'hidden' }}>
          <div style={{ height:1,background:'#C3C7CC' }} />
          <div style={{ height:72,display:'flex',alignItems:'center',justifyContent:'flex-end',gap:10,padding:'0 28px',background:'#FFFFFF' }}>
            <button
              onClick={onClose}
              style={{ height:36,padding:'0 16px',borderRadius:4,background:'#F2F3F4',border:'1px solid #C3C7CC',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#616D79',cursor:'pointer',transition:'background 0.15s, border-color 0.15s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9'; (e.currentTarget as HTMLElement).style.borderColor='#616D79';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#F2F3F4'; (e.currentTarget as HTMLElement).style.borderColor='#C3C7CC';}}
            >
              Cancel
            </button>
            <button
              onClick={() => { if (valid) { onSave(form); onClose(); } }}
              disabled={!valid}
              style={{ height:36,padding:'0 16px',borderRadius:4,background:valid?'#FF4D00':'#FFBD9C',border:'none',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#FFFFFF',cursor:valid?'pointer':'not-allowed',transition:'background 0.15s' }}
              onMouseEnter={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#FF773E';}}
              onMouseLeave={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#FF4D00';}}
              onMouseDown={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#D4380D';}}
              onMouseUp={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#FF773E';}}
            >
              {editTeam ? 'Save Changes' : 'Create Team'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Delete confirmation ───────────────────────────────────────────────────────
function DeleteTeamModal({ team, onClose, onConfirm }: { team: Team; onClose: () => void; onConfirm: () => void }) {
  return ReactDOM.createPortal(
    <div style={{ position:'fixed',inset:0,zIndex:600,background:'rgba(0,0,0,0.20)',display:'flex',alignItems:'center',justifyContent:'center' }} onClick={onClose}>
      <div style={{ width:420,background:'#FFFFFF',borderRadius:8,boxShadow:'0 8px 40px rgba(0,0,0,0.24)',padding:24,display:'flex',flexDirection:'column' }} onClick={e=>e.stopPropagation()}>
        <div style={{ width:40,height:40,borderRadius:'50%',background:'#FEF3F2',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 6V10M10 14H10.01M19 10A9 9 0 1 1 1 10a9 9 0 0 1 18 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h2 style={{ fontFamily:'Inter, sans-serif',fontSize:18,fontWeight:600,color:'#1D2C38',margin:'0 0 8px 0' }}>Delete Team</h2>
        <p style={{ fontFamily:'Open Sans, sans-serif',fontSize:14,color:'#616D79',margin:'0 0 24px 0',lineHeight:'20px' }}>
          Are you sure you want to delete <strong style={{ color:'#1D2C38' }}>{team.name}</strong>?{' '}
          This will remove all {team.members.length} member assignments.
        </p>
        <div style={{ display:'flex',gap:10,justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ height:36,padding:'0 16px',borderRadius:4,background:'#F2F3F4',border:'1px solid #C3C7CC',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#616D79',cursor:'pointer' }}>Cancel</button>
          <button onClick={()=>{onConfirm();onClose();}} style={{ height:36,padding:'0 16px',borderRadius:4,background:'#D92D20',border:'none',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#FFFFFF',cursor:'pointer' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#B42318';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#D92D20';}}>Delete Team</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Remove Member confirmation (type "remove" to confirm) ───────────────────
function RemoveMemberModal({ member, onClose, onConfirm }: {
  member: TeamMember; onClose: () => void; onConfirm: () => void;
}) {
  const [typed, setTyped] = useState('');
  const valid = typed.toLowerCase() === 'remove';
  return ReactDOM.createPortal(
    <div style={{ position:'fixed',inset:0,zIndex:600,background:'rgba(0,0,0,0.20)',display:'flex',alignItems:'center',justifyContent:'center' }} onClick={onClose}>
      <div style={{ width:420,background:'#FFFFFF',borderRadius:8,boxShadow:'0 8px 40px rgba(0,0,0,0.24)',overflow:'hidden',display:'flex',flexDirection:'column' }} onClick={e=>e.stopPropagation()}>
        {/* Header §10.3 */}
        <div style={{ flexShrink:0 }}>
          <div style={{ height:72,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <p style={{ fontFamily:"'Actor', sans-serif",fontWeight:400,fontSize:24,lineHeight:'28.8px',color:'#1B2736',margin:0,whiteSpace:'nowrap' }}>
              Remove Member
            </p>
            <button onClick={onClose} style={{ display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'none',cursor:'pointer',borderRadius:40,transition:'background-color 0.15s',padding:8 }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor='#F5F6F7')}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor='transparent')}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div style={{ height:1,background:'#F0F0F0',width:'100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding:'24px 24px 0',display:'flex',flexDirection:'column',gap:16 }}>
          {/* Warning icon */}
          <div style={{ width:40,height:40,borderRadius:'50%',background:'#FEF3F2',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6V10M10 14H10.01M19 10A9 9 0 1 1 1 10a9 9 0 0 1 18 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ fontFamily:'Inter, sans-serif',fontSize:13,fontWeight:400,color:'#616D79',margin:0,lineHeight:'20px' }}>
            This will remove <strong style={{ color:'#1D2C38',fontWeight:600 }}>{member.name}</strong> from the team.
            Type <strong style={{ color:'#1D2C38',fontWeight:600 }}>remove</strong> to confirm.
          </p>
          <input
            type="text"
            value={typed}
            onChange={e=>setTyped(e.target.value)}
            placeholder="Type &quot;remove&quot; to confirm"
            style={{
              height:36,width:'100%',borderRadius:4,boxSizing:'border-box',
              border:`1px solid ${typed.length>0&&!valid?'#FFA39E':'#D0D5DD'}`,
              background:typed.length>0&&!valid?'#FFF1F0':'#FFFFFF',
              padding:'0 10px',outline:'none',
              fontFamily:'Open Sans, sans-serif',fontSize:14,fontWeight:400,color:'#344054',
              transition:'border-color 0.15s',
            }}
            onFocus={e=>{if(!(!valid&&typed.length>0))e.currentTarget.style.borderColor='#91D5FF';}}
            onBlur={e=>{e.currentTarget.style.borderColor=typed.length>0&&!valid?'#FFA39E':'#D0D5DD';}}
          />
        </div>
        {/* Footer §10.4 */}
        <div style={{ flexShrink:0 }}>
          <div style={{ height:1,background:'#C3C7CC',marginTop:24 }} />
          <div style={{ height:72,display:'flex',alignItems:'center',justifyContent:'flex-end',gap:10,padding:'0 28px' }}>
            <button onClick={onClose} style={{ height:36,padding:'0 16px',borderRadius:4,background:'#F2F3F4',border:'1px solid #C3C7CC',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#616D79',cursor:'pointer',transition:'background 0.15s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#F2F3F4';}}>
              Cancel
            </button>
            <button onClick={()=>{ if(valid){onConfirm();onClose();}}} disabled={!valid}
              style={{ height:36,padding:'0 16px',borderRadius:4,background:valid?'#D92D20':'#FFBD9C',border:'none',fontFamily:'Inter, sans-serif',fontSize:14,fontWeight:400,color:'#FFFFFF',cursor:valid?'pointer':'not-allowed',transition:'background 0.15s' }}
              onMouseEnter={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#B42318';}}
              onMouseLeave={e=>{if(valid)(e.currentTarget as HTMLElement).style.background='#D92D20';}}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Footer Context Menu ───────────────────────────────────────────────────────
function FooterContextMenu({
  count,
  onRemove,
}: {
  count: number;
  onRemove: () => void;
}) {
  const [removeHov, setRemoveHov] = useState(false);

  // Pill is position:absolute centered inside the 48px pagination row
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'inline-flex',
      alignItems: 'stretch',
      height: 36,
      background: '#FFFFFF',
      border: '1px solid #D0D5DD',
      borderRadius: 8,
      boxShadow: '0px 2px 12px 0px rgba(0,0,0,0.10)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      zIndex: 5,
    }}>
      {/* ── N Selected ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 17px 0 16px',
        borderRight: '1px solid #E0E4E8',
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path d="M2 4h12M2 8h12M2 12h8" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38' }}>
          {count} Selected
        </span>
      </div>

      {/* ── Remove — Figma trash icon (same as row RemoveIconBtn) ── */}
      <button
        onClick={onRemove}
        onMouseEnter={() => setRemoveHov(true)}
        onMouseLeave={() => setRemoveHov(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 16px',
          border: 'none',
          background: removeHov ? '#FFF1F0' : 'transparent',
          cursor: 'pointer',
          transition: 'background 0.12s',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 14.6239 16.875" fill="none" style={{ flexShrink: 0 }}>
          <path d={trashPaths.pc0b2e00} fill={removeHov ? '#D92D20' : '#616D79'} />
        </svg>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400,
          color: removeHov ? '#D92D20' : '#384857',
          transition: 'color 0.12s',
        }}>
          Remove
        </span>
      </button>
    </div>
  );
}

// ─── Bulk Remove Confirmation Modal — type "remove" to confirm ─────────────────
function BulkRemoveConfirmModal({
  count,
  onConfirm,
  onCancel,
}: {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [typed, setTyped] = React.useState('');
  const confirmed = typed.toLowerCase() === 'remove';

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onCancel}
    >
      <div
        style={{ width: 420, background: '#FFFFFF', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.24)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Body */}
        <div style={{ padding: '32px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#FEF3F2', border: '1px solid #FEE4E2',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="#D92D20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#D92D20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#1D2C38', margin: '0 0 8px' }}>
              Remove {count} member{count !== 1 ? 's' : ''}?
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79', margin: 0 }}>
              {count} member{count !== 1 ? 's' : ''} will be removed from the team. This action cannot be undone.
            </p>
          </div>
          {/* Type-to-confirm input */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79' }}>
              Type <strong style={{ color: '#1D2C38', fontWeight: 600 }}>remove</strong> to confirm
            </label>
            <input
              autoFocus
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder="remove"
              style={{
                height: 36,
                padding: '0 12px',
                borderRadius: 4,
                border: `1px solid ${confirmed ? '#B7EB8F' : '#D0D5DD'}`,
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: '#344054',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
                background: confirmed ? '#F6FFED' : '#FFFFFF',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onFocus={e => { if (!confirmed) e.currentTarget.style.borderColor = '#91D5FF'; }}
              onBlur={e => { e.currentTarget.style.borderColor = confirmed ? '#B7EB8F' : '#D0D5DD'; }}
            />
          </div>
        </div>
        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, padding: '0 24px', height: 64, borderTop: '1px solid #C3C7CC' }}>
          <button
            onClick={onCancel}
            style={{ height: 36, padding: '0 16px', borderRadius: 4, background: '#F2F3F4', border: '1px solid #C3C7CC', color: '#616D79', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#E5E7E9'; (e.currentTarget as HTMLElement).style.borderColor='#616D79'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#F2F3F4'; (e.currentTarget as HTMLElement).style.borderColor='#C3C7CC'; }}
          >
            Cancel
          </button>
          <button
            onClick={confirmed ? onConfirm : undefined}
            disabled={!confirmed}
            style={{
              height: 36, padding: '0 16px', borderRadius: 4,
              background: confirmed ? '#D92D20' : '#FFBD9C',
              border: 'none', color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              cursor: confirmed ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (confirmed) (e.currentTarget as HTMLElement).style.background='#B42318'; }}
            onMouseLeave={e => { if (confirmed) (e.currentTarget as HTMLElement).style.background='#D92D20'; }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Main TeamsTable ───────────────────────────────────────────────────────────
export function TeamsTable() {
  const [teams, setTeams]               = useState<Team[]>(INITIAL_TEAMS);
  const [selectedId, setSelectedId]     = useState<string>(INITIAL_TEAMS[0].id);
  const [searchQuery, setSearchQuery]   = useState('');
  const [showCreate, setShowCreate]     = useState(false);
  const [editTeam, setEditTeam]         = useState<Team | undefined>(undefined);
  const [deleteTeam, setDeleteTeam]     = useState<Team | undefined>(undefined);
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(new Set());
  const [removingMember, setRemovingMember] = useState<TeamMember | undefined>(undefined);
  const [showBulkRemoveConfirm, setShowBulkRemoveConfirm] = useState(false);
  const [page, setPage]                 = useState(1);
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [groupedByTrade, setGroupedByTrade] = useState(true);
  const [memberSearch, setMemberSearch] = useState('');
  const PAGE_SIZE = 20;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const memberSearchRef = useRef<HTMLInputElement>(null);

  const selectedTeam = useMemo(() => teams.find(t => t.id === selectedId) ?? teams[0], [teams, selectedId]);

  // left panel filtered list
  const filteredTeams = useMemo(() => {
    if (!searchQuery) return teams;
    const q = searchQuery.toLowerCase();
    return teams.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.code.toLowerCase().includes(q) ||
      t.trade.toLowerCase().includes(q)
    );
  }, [teams, searchQuery]);

  // group filtered teams by trade — unassigned always last
  const groupedTeams = useMemo(() => {
    const map = new Map<string, Team[]>();
    filteredTeams.forEach(t => {
      const key = t.trade.trim() || '__UNASSIGNED__';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });
    // Sort: assigned trades alphabetically, UNASSIGNED always last
    const sorted = new Map<string, Team[]>(
      [...map.entries()]
        .sort(([a], [b]) => {
          if (a === '__UNASSIGNED__') return 1;
          if (b === '__UNASSIGNED__') return -1;
          return a.localeCompare(b);
        })
    );
    return sorted;
  }, [filteredTeams]);

  // right panel members
  const members = useMemo(() => selectedTeam?.members ?? [], [selectedTeam]);
  const filteredMembers = useMemo(() => {
    if (!memberSearch) return members;
    const q = memberSearch.toLowerCase();
    return members.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  }, [members, memberSearch]);
  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const pagedMembers = filteredMembers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allSelected   = pagedMembers.length > 0 && pagedMembers.every(m => selectedMemberIds.has(m.id));
  const someSelected  = pagedMembers.some(m => selectedMemberIds.has(m.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedMemberIds(prev => { const n = new Set(prev); pagedMembers.forEach(m => n.delete(m.id)); return n; });
    } else {
      setSelectedMemberIds(prev => { const n = new Set(prev); pagedMembers.forEach(m => n.add(m.id)); return n; });
    }
  };

  const toggleMember = (id: string) => {
    setSelectedMemberIds(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  // when team changes, reset page + selection + member search
  const handleSelectTeam = (id: string) => {
    setSelectedId(id);
    setPage(1);
    setSelectedMemberIds(new Set());
    setMemberSearch('');
  };

  const handleSave = (data: TeamFormData) => {
    if (editTeam) {
      setTeams(prev => prev.map(t => t.id === editTeam.id ? { ...t, ...data } : t));
    } else {
      const nt: Team = { id: uid(), ...data, trade: data.trade, active: true, members: [] };
      setTeams(prev => [...prev, nt]);
      setSelectedId(nt.id);
    }
    setEditTeam(undefined);
  };

  const handleDelete = (id: string) => {
    const remaining = teams.filter(t => t.id !== id);
    setTeams(remaining);
    if (selectedId === id) setSelectedId(remaining[0]?.id ?? '');
  };

  const handleRemoveMember = (memberId: string) => {
    setTeams(prev => prev.map(t =>
      t.id === selectedId
        ? { ...t, members: t.members.filter(m => m.id !== memberId) }
        : t
    ));
    setSelectedMemberIds(prev => { const n = new Set(prev); n.delete(memberId); return n; });
  };

  const handleBulkRemove = () => {
    setTeams(prev => prev.map(t =>
      t.id === selectedId
        ? { ...t, members: t.members.filter(m => !selectedMemberIds.has(m.id)) }
        : t
    ));
    setSelectedMemberIds(new Set());
    setShowBulkRemoveConfirm(false);
  };

  const handleAddParticipants = (newMembers: TeamMember[]) => {
    setTeams(prev => prev.map(t =>
      t.id === selectedId
        ? { ...t, members: [...t.members, ...newMembers.filter(nm => !t.members.find(m => m.id === nm.id))] }
        : t
    ));
  };

  const showingFrom = filteredMembers.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingTo   = Math.min(page * PAGE_SIZE, filteredMembers.length);

  // Figma-spec page numbers
  const pageNums = useMemo((): (number|'...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number|'...')[] = [1];
    if (page > 3) result.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) result.push(i);
    if (page < totalPages - 2) result.push('...');
    result.push(totalPages);
    return result;
  }, [totalPages, page]);

  return (
    <div style={{ display:'flex', flex:1, minHeight:0, minWidth:0, overflow:'hidden', padding:12, gap:12, background:'#FFFFFF' }}>

      {/* ── LEFT PANEL — §25.3 Split Navigator Shell ─────────────────────────── */}
      <div style={{
        width: 360, flexShrink: 0, display:'flex', flexDirection:'column',
        border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF',
      }}>
        {/* ── Header row 1: Title ── */}
        <div style={{
          height: 48, display:'flex', alignItems:'center',
          padding:'0 12px', background:'#FAFAFA', borderBottom:'1px solid #F0F0F0', flexShrink:0,
        }}>
          <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:16, fontWeight:600, color:'#384857' }}>
            Teams
          </span>
        </div>

        {/* ── Header row 2: Group by Trade toggle + Add Team ── */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'6px 8px', background:'#FFFFFF', borderBottom:'1px solid #E5E7EB', flexShrink:0,
        }}>
          {/* Secondary Toggle + Label — §15.6 Secondary Toggle Style
              Track active: #243746 (Inertia Navy) · inactive: #D9D9D9
              Label: Inter 14px/600/20px #262626 (§3.4 Label token) */}
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 4px' }}>
            {/* Track */}
            <div
              onClick={() => setGroupedByTrade(v => !v)}
              style={{
                width:40, height:20, borderRadius:10, flexShrink:0, cursor:'pointer',
                background: groupedByTrade ? '#243746' : '#D9D9D9',
                position:'relative', transition:'background 0.2s',
              }}
            >
              {/* Thumb */}
              <div style={{
                position:'absolute', top:2,
                left: groupedByTrade ? 22 : 2,
                width:16, height:16, borderRadius:'50%', background:'#FFFFFF',
                boxShadow:'0 1px 3px rgba(0,0,0,0.25)',
                transition:'left 0.2s',
              }} />
            </div>
            {/* Label — Inter 14px / SemiBold 600 / 20px / #262626 */}
            <span
              onClick={() => setGroupedByTrade(v => !v)}
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                lineHeight: '20px',
                color: '#384857',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              Group by Trade
            </span>
          </div>

          {/* Add Team — Primary Small §15.1 */}
          <button
            onClick={() => { setEditTeam(undefined); setShowCreate(true); }}
            style={{
              height:32, display:'flex', alignItems:'center', gap:4,
              background:'#F2F3F4', border:'1px solid #C3C7CC', borderRadius:4,
              fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:400, color:'#616D79',
              cursor:'pointer', padding:'0 12px', flexShrink:0,
              transition:'background 0.15s, border-color 0.15s', whiteSpace:'nowrap',
            }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='#E5E7E9'; (e.currentTarget as HTMLElement).style.borderColor='#616D79'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='#F2F3F4'; (e.currentTarget as HTMLElement).style.borderColor='#C3C7CC'; }}
            onMouseDown={e=>{ (e.currentTarget as HTMLElement).style.background='#616D79'; (e.currentTarget as HTMLElement).style.borderColor='#616D79'; const s=(e.currentTarget as HTMLElement).querySelector('span'); if(s)(s as HTMLElement).style.color='#FFFFFF'; }}
            onMouseUp={e=>{ (e.currentTarget as HTMLElement).style.background='#E5E7E9'; (e.currentTarget as HTMLElement).style.borderColor='#616D79'; const s=(e.currentTarget as HTMLElement).querySelector('span'); if(s)(s as HTMLElement).style.color='#616D79'; }}
          >
            <svg width="12" height="12" viewBox="0 0 11.9965 11.9965" fill="none" style={{ flexShrink:0 }}>
              <path d="M0 5.99828C0 6.44261 0.365487 6.80092 0.802638 6.80092H5.19565V11.1939C5.19565 11.631 5.56113 11.9965 5.99828 11.9965C6.43544 11.9965 6.80092 11.631 6.80092 11.1939V6.80092H11.1939C11.631 6.80092 11.9965 6.44261 11.9965 5.99828C11.9965 5.56113 11.631 5.19565 11.1939 5.19565H6.80092V0.802638C6.80092 0.365487 6.43544 0 5.99828 0C5.56113 0 5.19565 0.365487 5.19565 0.802638V5.19565H0.802638C0.365487 5.19565 0 5.56113 0 5.99828Z" fill="#616D79" />
            </svg>
            <span>Add Team</span>
          </button>
        </div>

        {/* ── Header row 3: Search ── */}
        <div style={{
          padding:'7px 8px', background:'#FFFFFF', borderBottom:'1px solid #E5E7EB', flexShrink:0,
        }}>
          <div style={{ position:'relative', height:32, width:'100%' }}>
            <div style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
              <SearchIconSvg />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search teams…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width:'100%', height:'100%', borderRadius:4, border:'1px solid #D0D5DD',
                background:'#FFFFFF', outline:'none', paddingLeft:30, paddingRight: searchQuery ? 26 : 8,
                fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:400, color:'#344054',
                boxSizing:'border-box', transition:'border-color 0.15s',
              }}
              onFocus={e=>{(e.currentTarget as HTMLElement).style.borderColor='#91D5FF';}}
              onBlur={e=>{(e.currentTarget as HTMLElement).style.borderColor='#D0D5DD';}}
            />
            {searchQuery && (
              <button onClick={()=>setSearchQuery('')}
                style={{ position:'absolute',right:7,top:'50%',transform:'translateY(-50%)',width:14,height:14,border:'none',background:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable team list */}
        <div style={{ flex:1, minHeight:0, overflowY:'auto', overflowX:'hidden' }}>
          {groupedByTrade ? (
            /* ── Grouped by trade ── */
            Array.from(groupedTeams.entries()).map(([tradeKey, groupTeams]) => {
              if (groupTeams.length === 0) return null;
              const isUnassigned = tradeKey === '__UNASSIGNED__';
              const headerLabel = isUnassigned ? 'UNASSIGNED' : tradeKey.toUpperCase();
              return (
                <div key={tradeKey}>
                  <div style={{
                    height: 28, display:'flex', alignItems:'center', padding:'0 16px',
                    background: '#F5F6F7',
                    borderBottom:'1px solid #EEEFF1',
                    position:'sticky', top:0, zIndex:1,
                  }}>
                    <span style={{
                      fontFamily:'Open Sans, sans-serif', fontSize:11, fontWeight:600,
                      color: isUnassigned ? '#C4320A' : '#8C8C8C',
                      textTransform:'uppercase', letterSpacing:'0.04em',
                    }}>
                      {headerLabel}
                    </span>
                  </div>
                  {groupTeams.map(team => {
                    const isActive  = team.id === selectedId;
                    const isHovered = hoveredTeamId === team.id;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleSelectTeam(team.id)}
                        onMouseEnter={() => setHoveredTeamId(team.id)}
                        onMouseLeave={() => setHoveredTeamId(null)}
                        style={{
                          height: 40, display:'flex', alignItems:'center',
                          paddingLeft: 16, paddingRight: 8,
                          background: isActive ? '#E6F7FF' : isHovered ? '#F9FAFB' : '#FFFFFF',
                          borderLeft: `3px solid ${isActive ? '#1890FF' : 'transparent'}`,
                          borderBottom: '1px solid #F0F0F0',
                          cursor: 'pointer', transition: 'background 0.1s', position: 'relative',
                        }}
                      >
                        <span style={{
                          fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight: isActive ? 500 : 400,
                          color: '#1D2939', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', flex:1, minWidth:0,
                        }}>
                          {team.name}
                        </span>
                        {isActive && !isHovered && (
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginLeft:4 }}>
                            <path d={checkIconPaths.p3c788b00} stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {isHovered && (
                          <button
                            onClick={e => { e.stopPropagation(); setEditTeam(team); setShowCreate(true); }}
                            style={{
                              flexShrink:0, height:26, display:'flex', alignItems:'center', gap:4,
                              background:'transparent', border:'none', borderRadius:4,
                              fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:400, color:'#616D79',
                              cursor:'pointer', padding:'0 8px', transition:'background 0.15s',
                            }}
                            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9';}}
                            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';}}
                            onMouseDown={e=>{(e.currentTarget as HTMLElement).style.background='#616D79';(e.currentTarget as HTMLElement).style.color='#FFFFFF';}}
                            onMouseUp={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9';(e.currentTarget as HTMLElement).style.color='#616D79';}}
                          >
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}>
                              <path d={toolbarPaths.p13c7f900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                            </svg>
                            Edit
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            /* ── Flat list (ungrouped) — alphabetical ── */
            [...filteredTeams].sort((a, b) => a.name.localeCompare(b.name)).map(team => {
              const isActive  = team.id === selectedId;
              const isHovered = hoveredTeamId === team.id;
              return (
                <div
                  key={team.id}
                  onClick={() => handleSelectTeam(team.id)}
                  onMouseEnter={() => setHoveredTeamId(team.id)}
                  onMouseLeave={() => setHoveredTeamId(null)}
                  style={{
                    height: 40, display:'flex', alignItems:'center',
                    paddingLeft: 16, paddingRight: 8,
                    background: isActive ? '#E6F7FF' : isHovered ? '#F9FAFB' : '#FFFFFF',
                    borderLeft: `3px solid ${isActive ? '#1890FF' : 'transparent'}`,
                    borderBottom: '1px solid #F0F0F0',
                    cursor: 'pointer', transition: 'background 0.1s',
                  }}
                >
                  <span style={{
                    fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight: isActive ? 500 : 400,
                    color: '#1D2939', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', flex:1, minWidth:0,
                  }}>
                    {team.name}
                  </span>
                  {isActive && !isHovered && (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginLeft:4 }}>
                      <path d={checkIconPaths.p3c788b00} stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {isHovered && (
                    <button
                      onClick={e => { e.stopPropagation(); setEditTeam(team); setShowCreate(true); }}
                      style={{
                        flexShrink:0, height:26, display:'flex', alignItems:'center', gap:4,
                        background:'transparent', border:'none', borderRadius:4,
                        fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:400, color:'#616D79',
                        cursor:'pointer', padding:'0 8px', transition:'background 0.15s',
                      }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';}}
                      onMouseDown={e=>{(e.currentTarget as HTMLElement).style.background='#616D79';(e.currentTarget as HTMLElement).style.color='#FFFFFF';}}
                      onMouseUp={e=>{(e.currentTarget as HTMLElement).style.background='#E5E7E9';(e.currentTarget as HTMLElement).style.color='#616D79';}}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}>
                        <path d={toolbarPaths.p13c7f900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
              );
            })
          )}
          {filteredTeams.length === 0 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:120, fontFamily:'Open Sans, sans-serif', fontSize:13, color:'#9CA4AE' }}>
              No teams found
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL — §25.4 Split Navigator Shell ────────────────────────── */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {selectedTeam ? (
          <>
            {/* ── Team Composition Row — Figma Container-2178-6460 ─────────────── */}
            <div style={{
              flexShrink: 0,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px 0 0',
              background: '#FFFFFF',
            }}>
              {/* Title block + divider + description */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, flex: 1 }}>

                {/* Title block */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                    lineHeight: '20px', color: '#1D2C38', whiteSpace: 'nowrap', margin: 0,
                  }}>
                    Team Composition
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12,
                    lineHeight: '16px', color: '#616D79', margin: 0, whiteSpace: 'nowrap',
                  }}>
                    {selectedTeam.name}
                  </p>
                </div>

                {/* Vertical divider */}
                <div style={{ width: 1, height: 32, background: '#E0E4E8', flexShrink: 0 }} />

                {/* Info icon + description */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <clipPath id="tc_clip">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                    <g clipPath="url(#tc_clip)">
                      <path d={toolbarPaths.p18fc8d80} stroke="#9CA4AE" strokeWidth="1.2" />
                      <path d="M8 7V12M8 5V5.5" stroke="#9CA4AE" strokeLinecap="round" strokeWidth="1.3" />
                    </g>
                  </svg>
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <p style={{
                      fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13,
                      lineHeight: '19.5px', color: '#616D79', margin: 0,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {selectedTeam.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table container card — Figma Container-2181-17845: border + radius */}
            <div style={{ flex:1, minHeight:0, display:'flex', flexDirection:'column', border:'1px solid #D9D9D9', borderRadius:8, overflow:'hidden', background:'#FFFFFF' }}>

            {/* ── Figma Toolbar — bg #FAFAFA, h-50px, border-bottom #F0F0F0, px-12px ── */}
            <div style={{
              height:50, background:'#FAFAFA', borderBottom:'1px solid #F0F0F0',
              flexShrink:0, display:'flex', alignItems:'center',
              justifyContent:'space-between', padding:'0 12px',
            }}>
              {/* Search input — Figma spec: bg white, h-36px, w-320px, border #D0D5DD, radius 4px */}
              <div style={{ position:'relative', height:36, width:320 }}>
                {/* Search icon — Figma: positioned left-[10%] of 16px container = left ~10px */}
                <div style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', width:16, height:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg style={{ display:'block', width:'100%', height:'100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 11.6 11.6">
                    <path d={figmaSvg.p6a0e00} stroke="#9CA4AE" strokeWidth="1.2" />
                  </svg>
                </div>
                <input
                  ref={memberSearchRef}
                  type="text"
                  placeholder="Search users…"
                  value={memberSearch}
                  onChange={e => { setMemberSearch(e.target.value); setPage(1); }}
                  style={{
                    width:'100%', height:'100%', borderRadius:4, border:'1px solid #D0D5DD',
                    background:'#FFFFFF', outline:'none', paddingLeft:34, paddingRight: memberSearch ? 30 : 10,
                    fontFamily:'Open Sans, sans-serif', fontSize:14, fontWeight:400,
                    color:'#344054', boxSizing:'border-box', transition:'border-color 0.15s',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor='#91D5FF'; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor='#D0D5DD'; }}
                />
                {memberSearch && (
                  <button onClick={() => { setMemberSearch(''); setPage(1); }}
                    style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', width:16, height:16, border:'none', background:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 9M9 1L1 9" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Add to Team button — Figma: bg #FF4D00, h-36px, radius 4px, Inter Regular 14px white */}
              <button
                onClick={() => setShowAddParticipant(true)}
                style={{
                  height:36, display:'flex', alignItems:'center', gap:6,
                  background:'#FF4D00', border:'none', borderRadius:4,
                  fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:400, color:'#FFFFFF',
                  cursor:'pointer', padding:'0 16px 0 42px', flexShrink:0,
                  transition:'background 0.15s', whiteSpace:'nowrap', position:'relative',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#FF773E'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#FF4D00'; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.background='#D4380D'; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.background='#FF773E'; }}
              >
                {/* Plus icon — Figma: p-dd75d00, 14×14, positioned left-[16px] */}
                <div style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', width:14, height:14 }}>
                  <svg style={{ display:'block', width:'100%', height:'100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g clipPath="url(#clip_plus_btn)">
                      <path d={figmaSvg.pdd75d00} fill="white" />
                    </g>
                    <defs><clipPath id="clip_plus_btn"><rect fill="white" width="14" height="14" /></clipPath></defs>
                  </svg>
                </div>
                Add to Team
              </button>
            </div>

            {/* ── Figma header row — bg #FAFAFA, h-48px, border-bottom #F0F0F0 ── */}
            <div style={{
              display:'flex', height:48, background:'#FAFAFA',
              borderBottom:'1px solid #F0F0F0', flexShrink:0,
              position:'sticky', top:0, zIndex:20,
            }}>
              {/* Checkbox col — 48px */}
              <div style={{ width:48, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <CheckboxIcon
                  checked={allSelected}
                  indeterminate={!allSelected && someSelected}
                  onClick={e => { e.stopPropagation(); toggleAll(); }}
                />
              </div>
              {/* Name — 360px, Open Sans SemiBold 13px #384857 */}
              <HeaderCell label="Name" width={360} />
              {/* Type — 120px */}
              <HeaderCell label="Type" width={120} />
              {/* Description — flex */}
              <HeaderCell label="Description" flex={1} />
              {/* Actions — 60px spacer */}
              <div style={{ width:60, flexShrink:0 }} />
            </div>

            {/* Scrollable rows */}
            <div style={{ flex:1, minHeight:0, overflowY:'auto', background:'#FFFFFF' }}>
              {pagedMembers.length === 0 ? (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:200, gap:12, opacity:0.4 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#243746" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="#243746" strokeWidth="1.5" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#243746" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:14, color:'#243746' }}>No members in this team</span>
                </div>
              ) : pagedMembers.map((member, idx) => {
                const isChecked = selectedMemberIds.has(member.id);
                return (
                  <div key={member.id}
                    style={{
                      display:'flex', height:48, alignItems:'center',
                      background: isChecked ? '#E6F7FF' : '#FFFFFF',
                      borderBottom:'1px solid #F0F0F0',
                      transition:'background 0.1s',
                    }}
                    onMouseEnter={e=>{ if(!isChecked)(e.currentTarget as HTMLElement).style.background='#F9FAFB'; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background = isChecked ? '#E6F7FF' : '#FFFFFF'; }}
                  >
                    {/* Checkbox — functional, Figma paths from checkboxPaths.pae529f2 */}
                    <div style={{ width:48, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <CheckboxIcon checked={isChecked} onClick={() => toggleMember(member.id)} />
                    </div>
                    {/* Name — single line only, no subtitle */}
                    <div style={{ width:360, flexShrink:0, display:'flex', alignItems:'center', gap:10, paddingRight:12 }}>
                      <MemberAvatar member={member} />
                      <span style={{
                        fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:600, color:'#1D2C38',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                      }}>
                        {member.name}
                      </span>
                    </div>
                    {/* Type */}
                    <div style={{ width:120, flexShrink:0, display:'flex', alignItems:'center' }}>
                      <MemberTypeDisplay type={member.type} />
                    </div>
                    {/* Description */}
                    <div style={{ flex:1, minWidth:0, paddingLeft:8, paddingRight:16 }}>
                      <span style={{
                        fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:400, color:'#384857',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', display:'block',
                      }}>
                        {member.description}
                      </span>
                    </div>
                    {/* Actions — remove icon */}
                    <div style={{ width:60, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <RemoveIconBtn onClick={() => setRemovingMember(member)} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination — bottom strip inside table container */}
            {/* position:relative so FooterContextMenu pill can be centered inside it */}
            <div style={{
              height:48, display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0 16px', borderTop:'1px solid #F0F0F0', background:'#FFFFFF', flexShrink:0,
              position:'relative',
            }}>
              {selectedMemberIds.size > 0 && (
                <FooterContextMenu
                  count={selectedMemberIds.size}
                  onRemove={() => setShowBulkRemoveConfirm(true)}
                />
              )}
              <span style={{ fontFamily:'Open Sans, sans-serif', fontSize:13, fontWeight:400, color:'#616D79' }}>
                {filteredMembers.length === 0
                  ? (memberSearch ? 'No results found' : 'No members')
                  : `Showing ${showingFrom}–${showingTo} of ${filteredMembers.length} member${filteredMembers.length!==1?'s':''}`
                }
              </span>
              {totalPages > 1 && (
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  {/* Prev */}
                  <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}
                    style={{ width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #D0D5DD',borderRadius:4,background:'#FFFFFF',cursor:page<=1?'not-allowed':'pointer',opacity:page<=1?0.4:1 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M5 1.5L2.5 4L5 6.5" stroke="#344054" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  {pageNums.map((n,i) => n==='...' ? (
                    <span key={`e${i}`} style={{ fontFamily:'Outfit, sans-serif',fontSize:13,color:'#616D79',padding:'0 2px' }}>…</span>
                  ) : (
                    <button key={n} onClick={()=>setPage(n as number)}
                      style={{ minWidth:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',border:n===page?'none':'1px solid #D0D5DD',borderRadius:4,background:n===page?'#FF4D00':'#FFFFFF',fontFamily:'Outfit, sans-serif',fontSize:13,fontWeight:400,color:n===page?'#FFFFFF':'#344054',cursor:'pointer',padding:'0 4px',transition:'background 0.15s' }}>
                      {n}
                    </button>
                  ))}
                  {/* Next */}
                  <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
                    style={{ width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #D0D5DD',borderRadius:4,background:'#FFFFFF',cursor:page>=totalPages?'not-allowed':'pointer',opacity:page>=totalPages?0.4:1 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M3 1.5L5.5 4L3 6.5" stroke="#344054" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            </div>{/* /table wrapper */}
          </>
        ) : (
          <div style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'center',opacity:0.3 }}>
            <span style={{ fontFamily:'Open Sans, sans-serif',fontSize:14,color:'#243746' }}>Select a team</span>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateTeamModal
          onClose={()=>{ setShowCreate(false); setEditTeam(undefined); }}
          onSave={handleSave}
          editTeam={editTeam}
        />
      )}
      {showBulkRemoveConfirm && (
        <BulkRemoveConfirmModal
          count={selectedMemberIds.size}
          onConfirm={handleBulkRemove}
          onCancel={() => setShowBulkRemoveConfirm(false)}
        />
      )}
      {deleteTeam && (
        <DeleteTeamModal
          team={deleteTeam}
          onClose={()=>setDeleteTeam(undefined)}
          onConfirm={()=>handleDelete(deleteTeam.id)}
        />
      )}
      {removingMember && (
        <RemoveMemberModal
          member={removingMember}
          onClose={()=>setRemovingMember(undefined)}
          onConfirm={()=>handleRemoveMember(removingMember.id)}
        />
      )}
      <AddParticipantModal
        isOpen={showAddParticipant}
        onClose={() => setShowAddParticipant(false)}
        onAddParticipants={handleAddParticipants}
        existingMemberIds={new Set(selectedTeam?.members.map(m => m.id) ?? [])}
        teamName={selectedTeam?.name}
      />
    </div>
  );
}

// ─── HeaderCell — §7.A.6 spec ─────────────────────────────────────────────────
function HeaderCell({ label, width, flex }: { label: string; width?: number; flex?: number }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        ...(flex !== undefined ? { flex, minWidth: 0 } : { width, flexShrink: 0 }),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        position: 'relative',
        overflow: 'clip',
        cursor: 'default',
        userSelect: 'none',
        background: hovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 600,
        fontSize: 13,
        color: '#384857',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}