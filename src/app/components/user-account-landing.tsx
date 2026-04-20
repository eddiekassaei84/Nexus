import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProjectsMapView, PROJECT_COORDINATES } from './projects-map-view';
import { CreateProjectModal } from './create-project-modal';
import svgPaths from '../../imports/svg-loqgqlds0m';
import svgColPaths from '../../imports/svg-0ey0n29ml8';
import imgAddProjectIcon from 'figma:asset/a873c1c375caa7b95b4c8eab9deb8cd0385b7857.png';
import svgEmpty from '../../imports/svg-01ga0z05le';
import EmptyGraphic from '../../imports/EmptyGraphic';
import AutodeskIntegration from '../../imports/Autodesk-2025-680';
import AutodeskNew from '../../imports/Autodesk-2026-1054';
import imgImage from 'figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png';
import imgAutodeskLogo from 'figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png';
import imgInertiaIcon from 'figma:asset/1347207f59fbc71bd42a8237de662b6bec7350bc.png';
import imgImage16 from 'figma:asset/53682e1811779057bb44f23138e859ff4a897918.png';

// ─── Text highlight helper ────────────────────────────────────────────────────
// Wraps each occurrence of `query` inside `text` with a gold-1 (#FFFBE6) bg span.
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

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ color = '#344054' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5L7 9L11 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListViewIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 4h14M2 9h14M2 14h14" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GridViewIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" />
      <rect x="10" y="2" width="6" height="6" rx="1" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" />
      <rect x="2" y="10" width="6" height="6" rx="1" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" />
      <rect x="10" y="10" width="6" height="6" rx="1" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" />
    </svg>
  );
}

function MapViewIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1 4l5-2 6 3 5-2v11l-5 2-6-3-5 2V4z" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 2v11M12 5v11" stroke={active ? '#FFFFFF' : '#616D79'} strokeWidth="1.5" />
    </svg>
  );
}

// Ellipsis icon (exact from Figma svg-loqgqlds0m)
function EllipsisMenuIcon() {
  return (
    <svg width="20" height="4" viewBox="0 0 20 3.33333" fill="none">
      <path d={svgPaths.p2fca5e70} fill="#616D79" />
    </svg>
  );
}

// ─── Company logo circle components ──────────────────────────────────────────
function AutodeskLogoCircle() {
  return (
    // 48×48px circle, bg #f0f0f3, rounded full
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f3',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Logo positioned at left:7, top:13, width:34, height:22 — matching Figma exactly */}
      <div
        style={{
          position: 'absolute',
          left: 7,
          top: 13,
          width: 34,
          height: 22,
          overflow: 'hidden',
        }}
      >
        <img
          alt="Autodesk"
          src={imgAutodeskLogo}
          style={{
            position: 'absolute',
            height: '100%',
            left: 0,
            top: 0,
            // 588.24% of 34px container width → show the leftmost 34px slice of the ~200px wide image
            width: '588.24%',
            maxWidth: 'none',
            objectFit: 'none',
            objectPosition: 'left center',
          }}
        />
      </div>
    </div>
  );
}

function InertiaLogoCircle() {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1D2C38',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="22" height="28" viewBox="0 0 27.7697 35" fill="none">
        <path d="M13.8848 0L0 7.5v15L13.8848 30 27.7697 22.5v-15L13.8848 0z" fill="#FF4D00" />
        <path d="M9 12l4.88 8L19 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Dropdown (reusable) ──────────────────────────────────────────────────────
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 36,
          padding: '0 16px',
          borderRadius: 4,
          border: '1px solid #C3C7CC',
          background: '#F2F3F4',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          color: '#616D79',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          outline: 'none',
          transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
      >
        <span style={{ color: '#616D79' }}>{label}:</span>
        <span style={{ fontWeight: 400, color: '#616D79' }}>{value}</span>
        <ChevronDownIcon color="#616D79" />
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            background: 'white',
            border: '1px solid #E0E4E8',
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            zIndex: 200,
            minWidth: 140,
            overflow: 'hidden',
          }}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 14px',
                  background: opt === value ? '#FFF5F0' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: opt === value ? 500 : 400,
                  color: opt === value ? '#FF4D00' : '#344054',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = '#F5F6F7'; }}
                onMouseLeave={e => { e.currentTarget.style.background = opt === value ? '#FFF5F0' : 'transparent'; }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Group By Dropdown — Figma spec style ─────────────────────────────────────
// Hover: gray-3 (#F5F5F5) · Selected: blue-1 (#E6F7FF) + checkmark
function GroupByDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 36,
          padding: '0 16px',
          borderRadius: 4,
          border: '1px solid #C3C7CC',
          background: '#F2F3F4',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          color: '#616D79',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          outline: 'none',
          transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
      >
        <span style={{ color: '#616D79' }}>{label}:</span>
        <span style={{ fontWeight: 600, color: '#384857' }}>{value}</span>
        <ChevronDownIcon color="#616D79" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />

          {/* Menu panel — same width as trigger button */}
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: wrapperRef.current ? wrapperRef.current.offsetWidth : 'auto',
            background: '#FFFFFF',
            borderRadius: 4,
            boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            zIndex: 200,
            paddingTop: 4,
            paddingBottom: 4,
            overflow: 'hidden',
          }}>
            {options.map(opt => {
              const isSelected = opt === value;
              return (
                <GroupByMenuItem
                  key={opt}
                  label={opt}
                  selected={isSelected}
                  onSelect={() => { onChange(opt); setOpen(false); }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function GroupByMenuItem({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Background priority: selected (#E6F7FF) > hover (#F5F5F5) > transparent
  const bg = selected ? '#E6F7FF' : hovered ? '#F5F5F5' : 'transparent';

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 12px',
        background: bg,
        cursor: 'pointer',
        transition: 'background 0.1s',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: selected ? 600 : 400,
        fontSize: 14,
        lineHeight: '20px',
        color: '#384857',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>

      {/* Checkmark — only visible when selected */}
      {selected && (
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0, marginLeft: 8 }}>
          <path
            d="M11.6667 1L4.33333 8.33333L1 5"
            stroke="#1890FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

// ─── Context Menu ────────────────────────────────────────────────────────────
function ContextMenu({ onClose }: { onClose: () => void }) {
  const actions = ['Open', 'Edit details', 'Archive', 'Delete'];
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 300 }} onClick={onClose} />
      <div style={{
        position: 'absolute',
        bottom: 'calc(100% + 4px)',
        right: 0,
        background: 'white',
        border: '1px solid #E0E4E8',
        borderRadius: 6,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        zIndex: 400,
        minWidth: 160,
        overflow: 'hidden',
      }}>
        {actions.map(action => (
          <button
            key={action}
            onClick={onClose}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 14px',
              background: 'transparent',
              border: 'none',
              textAlign: 'left',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 13,
              fontWeight: 400,
              color: action === 'Delete' ? '#D92D20' : '#344054',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {action}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Project data ─────────────────────────────────────────────────────────────
export interface LandingProject {
  id: string;
  name: string;
  projectNumber: string;
  updatedAt: string;
  createdAt: string;
  account: string;
  status?: 'Updated' | 'Requires Update' | 'Disconnected';
  thumbnail: string;
  integrations: ('autodesk' | 'inertia')[];
  projectScope?: string;
  projectType?: string;
  projectStage?: string;
  jobSite?: string;
}

export const LANDING_PROJECTS: LandingProject[] = [
  {
    id: 'cleveland-hospital',
    name: 'Cleveland Hospital',
    projectNumber: 'PRJ-2024-001',
    updatedAt: '8/4/2024, 6:15 PM',
    createdAt: '1/12/2024',
    account: 'Henrich Advisory',
    status: 'Updated',
    thumbnail: imgImage,
    integrations: ['autodesk'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Construction',
    jobSite: 'Cleveland Main Campus',
  },
  {
    id: 'inertia-demo',
    name: 'Inertia Demo',
    projectNumber: 'PRJ-2024-002',
    updatedAt: '8/4/2024, 6:15 PM',
    createdAt: '3/5/2024',
    account: 'Inertia Inc.',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['inertia'],
    projectScope: 'Demonstration',
    projectType: 'Demonstration Project',
    projectStage: 'Design',
    jobSite: 'Inertia HQ',
  },
  {
    id: 'westfield-tower',
    name: 'Westfield Tower',
    projectNumber: 'PRJ-2024-003',
    updatedAt: '',
    createdAt: '2/20/2024',
    account: 'Henrich Advisory',
    status: 'Requires Update',
    thumbnail: imgImage,
    integrations: ['autodesk'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Preconstruction',
    jobSite: 'Westfield District',
  },
  {
    id: 'harbor-bridge',
    name: 'Harbor Bridge Rehabilitation',
    projectNumber: 'PRJ-2024-004',
    updatedAt: '7/22/2024, 3:45 PM',
    createdAt: '4/1/2024',
    account: 'Inertia Inc.',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['inertia'],
    projectScope: 'Renovation',
    projectType: 'Renovation/Alteration',
    projectStage: 'Construction',
    jobSite: 'Harbor District',
  },
  {
    id: 'metro-station',
    name: 'Metro Station Expansion',
    projectNumber: 'PRJ-2024-005',
    updatedAt: '',
    createdAt: '5/15/2024',
    account: 'Meridian Group',
    thumbnail: imgImage,
    integrations: [],
    projectScope: 'Expansion',
    projectType: 'New Construction',
    projectStage: 'Design',
    jobSite: 'Metro Central Line',
  },
  {
    id: 'sunridge-residential',
    name: 'Sunridge Residential Complex',
    projectNumber: 'PRJ-2024-006',
    updatedAt: '10/3/2024, 9:00 AM',
    createdAt: '3/18/2024',
    account: 'Henrich Advisory',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['autodesk'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Commissioning',
    jobSite: 'Sunridge Estate',
  },
  {
    id: 'lakeview-plaza',
    name: 'Lakeview Plaza',
    projectNumber: 'PRJ-2024-007',
    updatedAt: '',
    createdAt: '6/7/2024',
    account: 'Meridian Group',
    status: 'Requires Update',
    thumbnail: imgImage,
    integrations: ['autodesk'],
    projectScope: 'Renovation',
    projectType: 'Renovation/Alteration',
    projectStage: 'Preconstruction',
    jobSite: 'Lakeview Waterfront',
  },
  {
    id: 'northgate-campus',
    name: 'Northgate Campus Development',
    projectNumber: 'PRJ-2024-008',
    updatedAt: '11/5/2024, 2:15 PM',
    createdAt: '1/30/2024',
    account: 'Inertia Inc.',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['inertia'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Construction',
    jobSite: 'Northgate Innovation Park',
  },
  {
    id: 'riverside-park',
    name: 'Riverside Park Renovation',
    projectNumber: 'PRJ-2024-009',
    updatedAt: '',
    createdAt: '7/11/2024',
    account: 'Henrich Advisory',
    thumbnail: imgImage,
    integrations: [],
    projectScope: 'Renovation',
    projectType: 'Renovation/Alteration',
    projectStage: 'Design',
    jobSite: 'Riverside Green',
  },
  {
    id: 'central-library',
    name: 'Central Library Retrofit',
    projectNumber: 'PRJ-2024-010',
    updatedAt: '8/28/2024, 11:45 AM',
    createdAt: '2/14/2024',
    account: 'Meridian Group',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['autodesk'],
    projectScope: 'Retrofit',
    projectType: 'Renovation/Alteration',
    projectStage: 'Handover',
    jobSite: 'City Centre Campus',
  },
  {
    id: 'pearson-airport',
    name: 'Pearson Airport Terminal C',
    projectNumber: 'PRJ-2024-011',
    updatedAt: '',
    createdAt: '4/22/2024',
    account: 'Inertia Inc.',
    status: 'Requires Update',
    thumbnail: imgImage,
    integrations: ['inertia'],
    projectScope: 'Expansion',
    projectType: 'New Construction',
    projectStage: 'Preconstruction',
    jobSite: 'Pearson International Airport',
  },
  {
    id: 'downtown-transit',
    name: 'Downtown Transit Hub',
    projectNumber: 'PRJ-2024-012',
    updatedAt: '9/17/2024, 4:00 PM',
    createdAt: '5/3/2024',
    account: 'Henrich Advisory',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['autodesk'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Construction',
    jobSite: 'Downtown Core',
  },
  {
    id: 'bayfront-hotel',
    name: 'Bayfront Hotel & Convention Centre',
    projectNumber: 'PRJ-2024-013',
    updatedAt: '',
    createdAt: '6/29/2024',
    account: 'Meridian Group',
    thumbnail: imgImage,
    integrations: [],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Design',
    jobSite: 'Bayfront Marina',
  },
  {
    id: 'innovation-hub',
    name: 'Innovation Hub Tower',
    projectNumber: 'PRJ-2024-014',
    updatedAt: '10/14/2024, 8:30 AM',
    createdAt: '3/9/2024',
    account: 'Henrich Advisory',
    status: 'Updated',
    thumbnail: imgImage16,
    integrations: ['autodesk', 'inertia'],
    projectScope: 'New Build',
    projectType: 'New Construction',
    projectStage: 'Preconstruction',
    jobSite: 'Tech Quarter',
  },
];

// Status pill colour map
const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  Updated:          { bg: '#52C41A', text: '#FFFFFF' },
  'Requires Update': { bg: '#FAAD14', text: '#FFFFFF' },
  Disconnected:     { bg: '#EF4444', text: '#FFFFFF' },
};

// ─── Integration icon — 36×36, borderRadius 18 ───────────────────────────────
function IntegrationIcon({ type, disconnected }: { type: 'autodesk' | 'inertia'; disconnected?: boolean }) {
  return (
    <div
      title={disconnected ? 'Disconnected' : undefined}
      style={{
        position: 'relative',
        width: 36, height: 36,
        borderRadius: type === 'autodesk' ? 18 : 8,
        overflow: 'hidden', flexShrink: 0,
        opacity: disconnected ? 0.7 : 1,
      }}
    >
      {type === 'autodesk' ? <AutodeskIntegration /> : <AutodeskNew />}
      {disconnected && (
        <svg viewBox="0 0 36 36" style={{ position: 'absolute', inset: 0, width: 36, height: 36, pointerEvents: 'none' }}>
          <line x1="6" y1="6" x2="30" y2="30" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// ─── Grid Project Card (horizontal: image left + content right) ───────────────
function GridProjectCard({
  project,
  onOpen,
  searchQuery = '',
}: {
  project: LandingProject;
  onOpen: (id: string) => void;
  searchQuery?: string;
}) {
  return (
    <div
      onClick={() => onOpen(project.id)}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        cursor: 'pointer',
        /* Clean drop shadow — no stroke/outline artifact */
        boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%',
        height: 204,
        backgroundColor: 'white',
        gap: 8,
      }}
    >
      {/* ── Left: Thumbnail — 192px, full card height, no individual borderRadius ── */}
      <div style={{
        width: 192,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#C4C4C4',
        /* borderRadius intentionally omitted — parent overflow:hidden clips it cleanly */
      }}>
        <img
          alt={project.name}
          src={project.thumbnail}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── Right: Info panel ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: 'white',
          padding: '12px 12px 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Project name — fills all remaining space, can wrap to 2 lines */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 24,
            fontWeight: 600,
            lineHeight: '32px',
            letterSpacing: '0px',
            color: '#262626',
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {highlightText(project.name, searchQuery)}
          </p>
        </div>

        {/* Project number — BodyLarge: Inter 16px 400 20px #595959 */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: '0px',
          color: '#595959',
          margin: 0,
          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {highlightText(project.projectNumber, searchQuery)}
        </p>
      </div>
    </div>
  );
}

// ─── Grid Add New Project Card — horizontal, Figma EmptyGraphic + text ───────
function GridAddNewProjectCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%',
        height: 204,
        backgroundColor: 'white',
        gap: 36,
      }}
    >
      {/* Empty graphic */}
      <div style={{ position: 'relative', width: 130, height: 107, flexShrink: 0 }}>
        <EmptyGraphic />
      </div>

      {/* DisplayMedium: Inter 24px / 600 / 32px, Subdued (#595959) */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: '0px',
        color: '#595959',
        margin: 0,
        whiteSpace: 'nowrap',
      }}>
        Add a new project
      </p>
    </div>
  );
}

// ─── Project Card — exact Figma spec ─────────────────────────────────────────
// Total: 576×200px  |  Image: 230×200  |  Content: 346×200
function ProjectCard({
  project,
  onOpen,
}: {
  project: LandingProject;
  onOpen: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const statusStyle = STATUS_STYLE[project.status ?? ''] ?? STATUS_STYLE.Updated;

  return (
    <div
      onClick={() => onOpen(project.id)}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        width: 576,
        height: 200,
        flexShrink: 0,
        cursor: 'pointer',
        boxShadow: '0px 1px 1px 0px rgba(9,30,66,0.25), 0px 0px 1px 0px rgba(9,30,66,0.31)',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      {/* ── Left: Image (230×200) ── */}
      <div
        style={{
          width: 230,
          height: 200,
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px 0 0 24px',
          backgroundColor: '#C4C4C4',
        }}
      >
        <img
          alt={project.name}
          src={project.thumbnail}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* ── Right: Content (346×200) ── */}
      <div
        style={{
          width: 346,
          height: 200,
          flexShrink: 0,
          backgroundColor: 'white',
          borderRadius: '0 24px 24px 0',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Row 1: Status pill + timestamp */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Status pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            height: 32,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 32,
            backgroundColor: statusStyle.bg,
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              color: statusStyle.text,
              whiteSpace: 'nowrap',
            }}>
              {project.status}
            </span>
          </div>

          {/* Timestamp */}
          <span style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '1.2',
            color: '#434343',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {project.updatedAt}
          </span>
        </div>

        {/* Row 2: Project name */}
        <div style={{ width: '100%' }}>
          <p style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            color: '#081F32',
            lineHeight: 'normal',
            margin: 0,
          }}>
            {project.name}
          </p>
        </div>

        {/* Row 3: Integration logos */}
        <div
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Integration logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {project.integrations.map((type, i) => (
              <div key={i} style={{ position: 'relative', opacity: project.status === 'Disconnected' ? 0.7 : 1 }} title={project.status === 'Disconnected' ? 'Disconnected' : undefined}>
                {type === 'autodesk' ? <AutodeskLogoCircle /> : (
                  <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <AutodeskNew />
                  </div>
                )}
                {project.status === 'Disconnected' && (
                  <svg viewBox="0 0 48 48" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <line x1="8" y1="8" x2="40" y2="40" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add New Project Card ─────────────────────────────────────────────────────
// Matches the card height (200px) and uses the same shadow + border-radius
function AddNewProjectCard({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        width: 576,
        height: 200,
        flexShrink: 0,
        background: hovered ? '#F9FAFB' : 'white',
        borderRadius: 24,
        boxShadow: '0px 1px 1px 0px rgba(9,30,66,0.25), 0px 0px 1px 0px rgba(9,30,66,0.31)',
        cursor: 'pointer',
        transition: 'background 0.15s',
        border: `2px dashed ${hovered ? '#FF4D00' : '#D0D5DD'}`,
        boxSizing: 'border-box',
      }}
    >
      {/* Plus circle */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        border: `2px dashed ${hovered ? '#FF4D00' : '#D0D5DD'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.15s',
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 4v14M4 11h14" stroke={hovered ? '#FF4D00' : '#9CA4AE'} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        fontWeight: 500,
        color: hovered ? '#FF4D00' : '#8A9098',
        transition: 'color 0.15s',
      }}>
        Add a new Project
      </span>
    </div>
  );
}

// ─── Projects List Table ──────────────────────────────────────────────────────
// Mirrors the UsersTable structure, adapted for projects:
//   Col 1 (fixed): Project Name — thumbnail 36×36 (4px radius) + name
//   Col 2–5 (flex): Project Number · Account · Created On · Integrations
//   Col 6 (sticky right 60px): Actions

// ─── Projects List Table — column widths exactly from Figma ───────────────────
// Thumbnail(48) | ProjectName(420) | ProjectNumber(240) | AccountName(240)
// Status(300)   | ConnectedTo(240) | CreatedDate(241)   | ColSettings(62)
const PROJ_TBL_COLS = {
  thumb:      { w: 56  },
  name:       { w: 420 },
  number:     { w: 240 },
  account:    { w: 240 },
  status:     { w: 300 },
  connected:  { w: 240 },
  created:    { w: 241 },
  settings:   { w: 62  },
} as const;

const PROJ_TBL_MIN_W =
  PROJ_TBL_COLS.thumb.w + PROJ_TBL_COLS.name.w + PROJ_TBL_COLS.number.w +
  PROJ_TBL_COLS.account.w + PROJ_TBL_COLS.status.w + PROJ_TBL_COLS.connected.w +
  PROJ_TBL_COLS.created.w + PROJ_TBL_COLS.settings.w; // 1731px

const TBL_PAGE = 20;

// ─── Column settings icon ─────────────────────────────────────────────────────
function ColSettingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d={svgColPaths.p1b88edf0} fill="#616D79" />
    </svg>
  );
}

// ─── Status pill for projects (solid green/red/amber fill) ───────────────────
function ProjectStatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Updated;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: 28, paddingLeft: 10, paddingRight: 10,
      borderRadius: 9999, backgroundColor: s.bg, flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 400,
        fontSize: 13, lineHeight: '18px', color: s.text, whiteSpace: 'nowrap',
      }}>{status}</span>
    </div>
  );
}

// ─── Connected-to cell (integration icon in #f0f0f3 rounded-24 pill) ─────────
function ConnectedToCell({ integrations, disconnected }: { integrations: ('autodesk' | 'inertia')[]; disconnected?: boolean }) {
  if (!integrations.length) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {integrations.map((type, i) => (
        <div key={i} style={{
          position: 'relative',
          width: 36, height: 36, borderRadius: 24,
          background: disconnected ? '#FFF1F0' : '#f0f0f3',
          overflow: 'hidden', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: disconnected ? 0.7 : 1,
          title: disconnected ? 'Disconnected' : undefined,
        }}
          title={disconnected ? 'Disconnected' : undefined}
        >
          {type === 'autodesk' ? <AutodeskIntegration /> : <AutodeskNew />}
          {/* Disconnected overlay — diagonal slash */}
          {disconnected && (
            <svg
              viewBox="0 0 36 36"
              style={{ position: 'absolute', inset: 0, width: 36, height: 36, pointerEvents: 'none' }}
            >
              <line x1="6" y1="6" x2="30" y2="30" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}



type ProjSortDir = 'asc' | 'desc';
type ProjSortState = { key: string; dir: ProjSortDir } | null;

function ProjSortArrows({ dir }: { dir: ProjSortDir | null }) {
  const up   = dir === 'asc'  ? '#4d7cfe' : '#c4cad1';
  const down = dir === 'desc' ? '#4d7cfe' : '#c4cad1';
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
      <path d="M5.5 7V1" stroke={up} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 4L5.5 1L9 4" stroke={up} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 7V13" stroke={down} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 10L5.5 13L9 10" stroke={down} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}



function ProjArrowLeft() { return <svg width="13" height="11" viewBox="0 0 14 11" fill="none"><path d="M13 5.5H1M1 5.5L5.5 1M1 5.5L5.5 10" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ProjArrowRight() { return <svg width="13" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5H13M13 5.5L8.5 1M13 5.5L8.5 10" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

// ─── Projects List Table — Figma-accurate layout ─────────────────────────────
function ProjectsListTable({ projects, onOpen, groupBy = 'None', showAddCard = true, searchQuery = '' }: { projects: LandingProject[]; onOpen: (id: string) => void; groupBy?: string; showAddCard?: boolean; searchQuery?: string }) {
  const [sortState, setSortState] = useState<ProjSortState>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Column widths — name is 480px fixed; remaining columns share the rest
  const [colWidths, setColWidths] = useState({
    thumb: 56,
    name: 480,
    number: 240,
    account: 240,
    created: 100,
  });

  const handleColResize = useCallback((col: keyof typeof colWidths, delta: number) => {
    setColWidths(prev => ({ ...prev, [col]: Math.max(60, prev[col] + delta) }));
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    if (!sortState) return 0;
    const { key, dir } = sortState;
    const va = key === 'name' ? a.name : key === 'number' ? a.projectNumber : key === 'account' ? a.account : a.createdAt;
    const vb = key === 'name' ? b.name : key === 'number' ? b.projectNumber : key === 'account' ? b.account : b.createdAt;
    return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });
  // Show all rows — parent container owns the single footer/pagination bar
  const pageItems = sortedProjects;

  const handleSort = (key: string) => setSortState(prev => {
    if (!prev || prev.key !== key) return { key, dir: 'asc' };
    if (prev.dir === 'asc') return { key, dir: 'desc' };
    return null;
  });

  // Header cell builder
  const HdrCell = ({ col, label, w, sortKey }: { col: keyof typeof colWidths; label: string; w: number; sortKey?: string }) => {
    const isActive = !!sortKey && sortState?.key === sortKey;
    const dir: ProjSortDir | null = isActive ? sortState!.dir : null;
    return (
      <div
        style={{ width: w, minWidth: w, flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: 17, paddingRight: 8, height: '100%', cursor: sortKey ? 'pointer' : 'default', boxSizing: 'border-box' }}
        onClick={() => sortKey && handleSort(sortKey)}
        onMouseEnter={e => { const b = e.currentTarget.querySelector('.plst-sort') as HTMLElement | null; if (b) b.style.opacity = '1'; }}
        onMouseLeave={e => { const b = e.currentTarget.querySelector('.plst-sort') as HTMLElement | null; if (b && !isActive) b.style.opacity = '0'; }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: 0, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{label}</span>
        {sortKey && (
          <span className="plst-sort" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0, opacity: isActive ? 1 : 0, transition: 'opacity 0.15s' }}>
            <ProjSortArrows dir={dir} />
          </span>
        )}
        {/* Resize handle */}
        <ColResizeHandle colKey={col} onDelta={handleColResize} />
      </div>
    );
  };

  // Shared row style: display:flex, width:100%
  const ROW = { display: 'flex', width: '100%', alignItems: 'center' } as const;
  const fixedCell = (w: number, extra?: React.CSSProperties): React.CSSProperties =>
    ({ flex: `0 0 ${w}px`, width: w, minWidth: w, overflow: 'hidden', boxSizing: 'border-box', ...extra });
  // name column is fixed 480px, last column (created) gets flex:1 to fill any remaining space
  const lastCell: React.CSSProperties =
    { flex: '1 1 0', minWidth: colWidths.created, overflow: 'hidden', boxSizing: 'border-box' };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: 'white' }}>

      {/* ── Scrollable body (no horizontal overflow) ── */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* ── Sticky header ── */}
        <div style={{ ...ROW, position: 'sticky', top: 0, zIndex: 20, height: 47, background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
          {/* Thumbnail slot */}
          <div style={fixedCell(colWidths.thumb)} />

          {/* Project Name */}
          <ListHeaderCell
            colStyle={fixedCell(colWidths.name)}
            label="Project Name"
            sortKey="name"
            sortState={sortState}
            onSort={() => handleSort('name')}
            showResize
            resizeKey="name"
            onDelta={handleColResize}
          />

          {/* Remaining columns — last one (created) uses flex:1 via lastCell */}
          {([
            ['number',  'Project Number', 'number',  false],
            ['account', 'Account Owner',  'account', false],
            ['created', 'Created Date',   'created', true],
          ] as [keyof typeof colWidths, string, string | null, boolean][]).map(([col, label, sortKey, isLast]) => (
            <ListHeaderCell
              key={col}
              colStyle={isLast ? lastCell : fixedCell(colWidths[col])}
              label={label}
              sortKey={sortKey}
              sortState={sortState}
              onSort={() => sortKey && handleSort(sortKey)}
              showResize={!isLast}
              resizeKey={col}
              onDelta={handleColResize}
            />
          ))}
        </div>

        {/* ── Data rows (flat or grouped) ── */}
        {(() => {
          const renderRow = (project: LandingProject) => (
            <div key={project.id} className="bg-white hover:bg-[#f9f9fb] transition-colors"
              style={{ ...ROW, height: 60, borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
              onClick={() => onOpen(project.id)}
            >
              {/* Thumbnail */}
              <div style={{ ...fixedCell(colWidths.thumb), display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, height: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: 4, overflow: 'hidden', background: '#c4c4c4', flexShrink: 0 }}>
                  <img src={project.thumbnail} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* Project Name — 480px fixed */}
              <div style={{ ...fixedCell(colWidths.name), display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, height: '100%' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlightText(project.name, searchQuery)}</span>
              </div>

              {/* Project Number */}
              <div style={{ ...fixedCell(colWidths.number), display: 'flex', alignItems: 'center', paddingLeft: 12, height: '100%' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlightText(project.projectNumber, searchQuery)}</span>
              </div>

              {/* Account Owner */}
              <div style={{ ...fixedCell(colWidths.account), display: 'flex', alignItems: 'center', paddingLeft: 12, height: '100%' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.account}</span>
              </div>

              {/* Created Date — flex:1, fills remaining space */}
              <div style={{ ...lastCell, display: 'flex', alignItems: 'center', paddingLeft: 12, height: '100%' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.createdAt}</span>
              </div>
            </div>
          );

          if (groupBy === 'None') {
            return pageItems.map(renderRow);
          }

          // Build ordered groups
          const getGroupKey = (p: LandingProject) => {
            if (groupBy === 'Account Owner') return p.account;
            if (groupBy === 'Project Scope') return p.projectScope ?? 'Unspecified';
            if (groupBy === 'Project Type') return p.projectType ?? 'Unspecified';
            if (groupBy === 'Project Stage') return p.projectStage ?? 'Unspecified';
            if (groupBy === 'Job Site') return p.jobSite ?? 'No Job Site';
            return 'Other';
          };
          const groupOrder: string[] = [];
          const groupMap: Record<string, LandingProject[]> = {};
          pageItems.forEach(p => {
            const key = getGroupKey(p);
            if (!groupMap[key]) { groupMap[key] = []; groupOrder.push(key); }
            groupMap[key].push(p);
          });

          const toggleGroup = (groupKey: string) => {
            setCollapsedGroups(prev => {
              const next = new Set(prev);
              next.has(groupKey) ? next.delete(groupKey) : next.add(groupKey);
              return next;
            });
          };

          return groupOrder.map(groupKey => {
            const isCollapsed = collapsedGroups.has(groupKey);
            return (
              <React.Fragment key={groupKey}>
                {/* Group header row — clickable to expand/collapse */}
                <div
                  onClick={() => toggleGroup(groupKey)}
                  style={{ ...ROW, height: 36, background: '#F9FAFB', borderBottom: '1px solid #f0f0f0', paddingLeft: 12, paddingRight: 16, boxSizing: 'border-box', gap: 8, flexShrink: 0, cursor: 'pointer', userSelect: 'none' }}
                >
                  {/* Chevron */}
                  <div style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg
                      width="10" height="10" viewBox="0 0 12 8" fill="none"
                      style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
                    >
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                    lineHeight: '20px', letterSpacing: 0, color: '#616D79', whiteSpace: 'nowrap',
                  }}>
                    {groupKey}
                  </span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    height: 20, minWidth: 20, paddingLeft: 6, paddingRight: 6,
                    borderRadius: 9999, background: '#E5E7E9',
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                    color: '#616D79', flexShrink: 0,
                  }}>
                    {groupMap[groupKey].length}
                  </span>
                </div>

                {/* Group rows — hidden when collapsed */}
                {!isCollapsed && groupMap[groupKey].map(renderRow)}
              </React.Fragment>
            );
          });
        })()}

        {/* ── "Add a new project" row ── */}
        {showAddCard && <div className="bg-white hover:bg-[#f9f9fb] transition-colors" style={{ ...ROW, height: 60, borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
        >
          <div style={{ ...fixedCell(colWidths.thumb), display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, height: '100%' }}>
            <div style={{ width: 40, height: 40, borderRadius: 4, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={imgAddProjectIcon} alt="Add project" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ ...fixedCell(colWidths.name), display: 'flex', alignItems: 'center', paddingLeft: 8, height: '100%' }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#595959', whiteSpace: 'nowrap' }}>Add a new project</span>
          </div>
        </div>}

        {pageItems.length === 0 && projects.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120, color: '#9ca3af', fontSize: 13, fontFamily: 'Open Sans, sans-serif' }}>
            No projects found.
          </div>
        )}
      </div>
      {/* No footer here — parent container renders the single shared footer */}
    </div>
  );
}

// ─── Column resize handle (delta-based) ──────────────────────────────────────
// Mirrors the Members table ResizeHandle: 3-state line color —
//   active drag / handle hovered → blue #4d7cfe
//   parent cell hovered           → gray #9CA4AE  (the visible border on hover)
//   idle                          → transparent
function ColResizeHandle({ colKey, onDelta, cellHovered = false }: {
  colKey: string;
  onDelta: (key: string, delta: number) => void;
  cellHovered?: boolean;
}) {
  const [active, setActive] = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX;
    let lastX = startX;
    setActive(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - lastX;
      if (Math.abs(delta) >= 1) { onDelta(colKey, delta); lastX = ev.clientX; }
    };
    const onUp = () => {
      setActive(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [colKey, onDelta]);

  const lineColor = active || handleHovered ? '#4d7cfe' : cellHovered ? '#9CA4AE' : 'transparent';

  return (
    <div
      style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 7, cursor: 'col-resize', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false} onDragStart={e => e.preventDefault()}
    >
      {/* Full-height 2px line — same spec as Members table ResizeHandle */}
      <div style={{ height: 47, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── List View header cell ────────────────────────────────────────────────────
// Uses React state for hover so cellHovered propagates into ColResizeHandle,
// enabling the 3-state resize-border (transparent → gray on cell hover → blue on handle hover/drag).
function ListHeaderCell({
  colStyle, label, sortKey, sortState, onSort, showResize, resizeKey, onDelta,
}: {
  colStyle: React.CSSProperties;
  label: string;
  sortKey: string | null;
  sortState: { key: string; dir: ProjSortDir } | null;
  onSort: () => void;
  showResize: boolean;
  resizeKey: string;
  onDelta: (key: string, delta: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = !!sortKey && sortState?.key === sortKey;
  const dir: ProjSortDir | null = isActive ? sortState!.dir : null;

  return (
    <div
      style={{
        ...colStyle,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 8,
        paddingRight: 10,
        cursor: sortKey ? 'pointer' : 'default',
        userSelect: 'none',
        background: isHovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onClick={onSort}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {sortKey && (
        <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, opacity: isActive || isHovered ? 1 : 0, transition: 'opacity 0.15s' }}>
          <ProjSortArrows dir={dir} />
        </span>
      )}
      {showResize && (
        <ColResizeHandle colKey={resizeKey} onDelta={onDelta} cellHovered={isHovered} />
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface UserAccountLandingPageProps {
  onOpenProject: (projectId: string) => void;
}

export function UserAccountLandingPage({ onOpenProject }: UserAccountLandingPageProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'archived'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('None');
  const [sortBy, setSortBy] = useState('Recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = LANDING_PROJECTS.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.projectNumber.toLowerCase().includes(q)
    );
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'Name (A–Z)') return a.name.localeCompare(b.name);
    if (sortBy === 'Name (Z–A)') return b.name.localeCompare(a.name);
    if (sortBy === 'Newest First') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'Oldest First') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const tabs: { id: 'projects' | 'archived'; label: string }[] = [
    { id: 'projects',  label: 'Projects' },
    { id: 'archived',  label: 'Archived' },
  ];

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      backgroundColor: '#F2F3F4',
    }}>
      {/* ── White header band ── */}
      <div style={{ backgroundColor: 'white', flexShrink: 0 }}>

        {/* ── Row 1: Tabs + Add new project button ── */}
        {/* Primary XL Tab Group: h=48px, px=16, gap=8, Inter 18px/26px, 2px #FF4D00 highlight */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '24px 24px 0 72px',
          borderBottom: '1px solid #D9D9D9',
        }}>
          {/* Primary Tab Group — XL */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 48,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  {/* Tab Name row — flex-1 fills remaining height above the 2px bar */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                  }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 18,
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: '26px',
                      color: '#243746',
                      whiteSpace: 'nowrap',
                    }}>
                      {tab.label}
                    </span>
                  </div>
                  {/* Highlight bar — Primary XL: 2px #FF4D00 active, transparent inactive */}
                  <div style={{
                    height: 2,
                    width: '100%',
                    background: isActive ? '#FF4D00' : 'transparent',
                    flexShrink: 0,
                  }} />
                </button>
              );
            })}
          </div>

          {/* View mode — icon-only segmented button group (no text labels) */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            {(['list', 'grid', 'map'] as const).map((mode, index) => {
              const isActive = viewMode === mode;
              const isFirst = index === 0;
              const isLast = index === 2;
              const borderRadius = isFirst ? '4px 0 0 4px' : isLast ? '0 4px 4px 0' : '0';
              const borderStyle = isActive
                ? { borderTop: '1px solid #616D79', borderBottom: '1px solid #616D79', borderLeft: '1px solid #616D79', borderRight: isLast ? '1px solid #616D79' : 'none' }
                : { borderTop: '1px solid #C3C7CC', borderBottom: '1px solid #C3C7CC', borderLeft: '1px solid #C3C7CC', borderRight: isLast ? '1px solid #C3C7CC' : 'none' };
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  title={mode === 'list' ? 'List View' : mode === 'grid' ? 'Card View' : 'Map View'}
                  style={{
                    height: 36,
                    width: 36,
                    padding: 0,
                    borderRadius,
                    ...borderStyle,
                    background: isActive ? '#616D79' : '#F2F3F4',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#E8EAEC'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isActive ? '#616D79' : '#F2F3F4'; }}
                >
                  {mode === 'list' && <ListViewIcon active={isActive} />}
                  {mode === 'grid' && <GridViewIcon active={isActive} />}
                  {mode === 'map' && <MapViewIcon active={isActive} />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Content area: white page bg, 12px padding, one rounded #fafafa container ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: viewMode === 'map' ? 'hidden' : 'auto', background: 'white', padding: activeTab === 'projects' ? (viewMode === 'map' ? 0 : 12) : 0 }}>

        {/* Grid / List: single rounded-[8px] bg-[#fafafa] border-[#f0f0f0] container */}
        {activeTab === 'projects' && (viewMode === 'grid' || viewMode === 'list') && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0', overflow: 'hidden' }}>

            {/* ── Toolbar — h-[48px] bg-[#fafafa] border-bottom: 1px #f0f0f0 ── */}
            <div style={{ flexShrink: 0, height: 48, background: '#fafafa', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Search — bg-white, border-[#d0d5dd], h-36, w-380, rounded-4 */}
                <div style={{ position: 'relative', width: 380, height: 36, flexShrink: 0 }}>
                  <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                    <SearchIcon />
                  </div>
                  <input type="text" placeholder="Search projects by name or number" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: searchQuery.length > 0 ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054', outline: 'none', background: 'white', transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#D0D5DD')}
                    onMouseEnter={e => { if (document.activeElement !== e.currentTarget) e.currentTarget.style.borderColor = '#A8B0BB'; }}
                    onMouseLeave={e => { if (document.activeElement !== e.currentTarget) e.currentTarget.style.borderColor = '#D0D5DD'; }}
                  />
                  {searchQuery.length > 0 && (
                    <button onClick={() => setSearchQuery('')} tabIndex={-1}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#8C8C8C' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#595959')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8C8C8C')}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                  )}
                </div>
                <GroupByDropdown label="Grouped by" value={groupBy} options={['None', 'Account Owner', 'Project Scope', 'Project Type', 'Project Stage', 'Job Site']} onChange={setGroupBy} />
                <GroupByDropdown label="Sort by" value={sortBy} options={['Recent', 'Name (A–Z)', 'Name (Z–A)', 'Newest First', 'Oldest First']} onChange={setSortBy} />
              </div>
              {/* Add new project — #FF4D00, white, Inter 14, h-36 */}
              <button
                onClick={() => setShowCreateModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 4, height: 36, padding: '0 16px', borderRadius: 4, border: 'none', background: '#FF4D00', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'white', cursor: 'pointer', whiteSpace: 'nowrap', outline: 'none', transition: 'background 0.15s', flexShrink: 0 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FF773E')}
                onMouseLeave={e => (e.currentTarget.style.background = '#FF4D00')}
                onMouseDown={e => (e.currentTarget.style.background = '#D4380D')}
                onMouseUp={e => (e.currentTarget.style.background = '#FF773E')}
              >
                <PlusIcon />
                Add new project
              </button>
            </div>

            {/* ── Cards canvas — bg-[#fafafa] pt-24 px-24 ── */}
            {viewMode === 'grid' && (
              <div style={{ flex: 1, padding: 24, overflow: 'auto', background: '#fafafa' }}>
                {groupBy === 'None' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {sortedProjects.map(project => (
                      <GridProjectCard key={project.id} project={project} onOpen={onOpenProject} searchQuery={searchQuery} />
                    ))}
                    {!searchQuery && <GridAddNewProjectCard onClick={() => setShowCreateModal(true)} />}
                  </div>
                ) : (() => {
                  // Build ordered groups
                  const getGroupKey = (p: LandingProject) => {
                    if (groupBy === 'Account Owner') return p.account;
                    if (groupBy === 'Project Scope') return p.projectScope ?? 'Unspecified';
                    if (groupBy === 'Project Type') return p.projectType ?? 'Unspecified';
                    if (groupBy === 'Project Stage') return p.projectStage ?? 'Unspecified';
                    if (groupBy === 'Job Site') return p.jobSite ?? 'No Job Site';
                    return 'Other';
                  };

                  // Preserve a stable group order
                  const groupOrder: string[] = [];
                  const groupMap: Record<string, LandingProject[]> = {};
                  sortedProjects.forEach(p => {
                    const key = getGroupKey(p);
                    if (!groupMap[key]) { groupMap[key] = []; groupOrder.push(key); }
                    groupMap[key].push(p);
                  });

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                      {groupOrder.map(groupKey => (
                        <div key={groupKey}>
                          {/* Group header */}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
                          }}>
                            <span style={{
                              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                              lineHeight: '20px', letterSpacing: 0, color: '#616D79', whiteSpace: 'nowrap',
                            }}>
                              {groupKey}
                            </span>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              height: 20, minWidth: 20, paddingLeft: 6, paddingRight: 6,
                              borderRadius: 9999, background: '#E5E7E9',
                              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                              color: '#616D79', flexShrink: 0,
                            }}>
                              {groupMap[groupKey].length}
                            </span>
                            <div style={{ flex: 1, height: 1, background: '#E5E7E9' }} />
                          </div>
                          {/* Cards in group */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                            {groupMap[groupKey].map(project => (
                              <GridProjectCard key={project.id} project={project} onOpen={onOpenProject} searchQuery={searchQuery} />
                            ))}
                          </div>
                        </div>
                      ))}
                      {/* Add new card always at the end, hidden when searching */}
                      {!searchQuery && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                          <GridAddNewProjectCard onClick={() => setShowCreateModal(true)} />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ── List table canvas ── */}
            {viewMode === 'list' && (
              <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <ProjectsListTable projects={sortedProjects} onOpen={onOpenProject} groupBy={groupBy} showAddCard={!searchQuery} searchQuery={searchQuery} />
              </div>
            )}

            {/* ── Footer — bg-[#fafafa] h-[48px] border-top: 1px #f0f0f0 px-16 ── */}
            <div style={{ flexShrink: 0, height: 48, background: '#fafafa', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: '#667085', whiteSpace: 'nowrap' }}>
                Showing 1–{filteredProjects.length} of {filteredProjects.length} projects
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <button disabled style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #e5e7eb', background: 'white', cursor: 'not-allowed', opacity: 0.35 }}>
                  <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><path d="M12 5.5H1M1 5.5L5.5 1M1 5.5L5.5 10" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#FF4D00' }}>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: 'white' }}>1</span>
                </div>
                <button disabled style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #e5e7eb', background: 'white', cursor: 'not-allowed', opacity: 0.35 }}>
                  <svg width="13" height="11" viewBox="0 0 13 11" fill="none"><path d="M1 5.5H12M12 5.5L7.5 1M12 5.5L7.5 10" stroke="#344054" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && viewMode === 'map' && (
          <ProjectsMapView
            projects={filteredProjects.map(p => ({
              ...p,
              coordinates: PROJECT_COORDINATES[p.id] ?? [0, 0],
            }))}
            onOpen={onOpenProject}
          />
        )}

        {activeTab === 'archived' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <div style={{ textAlign: 'center', opacity: 0.35, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#243746" strokeWidth="1.5" />
                <path d="M3 9H21" stroke="#243746" strokeWidth="1.5" />
                <path d="M9 21V9" stroke="#243746" strokeWidth="1.5" />
              </svg>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#243746' }}>No archived projects</span>
            </div>
          </div>
        )}

      </div>

      {/* ── Create Project Modal ── */}
      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}

    </div>
  );
}