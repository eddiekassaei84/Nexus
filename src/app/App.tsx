import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import svgPaths1 from '../imports/svg-fynbzyrtwq';
import svgPaths2 from '../imports/svg-o83jhbud1k';
import projSettingsIconPaths from '../imports/svg-5mk1ed4ms1';
import svgPathsBlade from '../imports/svg-0vjjjbc447';
import svgPathsBladeLabel from '../imports/svg-l6fn2d072u';
import FullBladeLogo from '../imports/FullBladeLogo';
import Frame2253291 from '../imports/Frame2253291-2038-6';
import Bladefulllogo40 from '../imports/Bladefulllogo40';
import img24PxAppList from 'figma:asset/d14f9ba8efd893f2270331bb82f967c250647133.png';
import imgSatpon1 from 'figma:asset/31f8f844c85bcb0a258ba9cd606404673764a826.png';
import imgAvatar from 'figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png';
import { imgShutterstock6856549541 } from '../imports/svg-jizvb';
import { UsersTable } from './components/users-table';
import { RolesTable } from './components/roles-table';
import { DisciplineTable } from './components/discipline-table';
import { ReferenceDataTable } from './components/reference-data-table';
import { RoleAccessLevel } from './components/role-access-level';
import { InspectionsList } from './components/inspections-list';
import { INSPECTION_REF_DATA_TABS, INSPECTION_REF_DATA_EXPANDED } from './components/inspection-reference-data';
import { LocationBreakdownStructure } from './components/lbs-table';
import { TeamsTable } from './components/teams-table';
import Component24PxAppUserCompany from '../imports/24PxAppUserCompany';
import { AddUserModal, type DirectoryUser } from './components/add-user-modal';
import { BASE_USER_EMAILS } from './components/users-table';
import { ToastProvider } from './components/toast';
import { AppsGridIcon, ModuleSelector } from './components/module-selector';
import packageIconPaths from '../imports/svg-iy01c7yfrx';
import { UserAccountLandingPage, LANDING_PROJECTS, LandingProject as NavProject } from './components/user-account-landing';
import { ProfileDropdown } from './components/profile-dropdown';
import ReactDOM from 'react-dom';
import { GeneralInformationPage } from './components/general-information';
import { FilesTable } from './components/files-table';
import { ElevationInputShowcase } from './components/elevation-input';
import { LoginPage } from './components/login-page';
import { SignUpEmailPage } from './components/signup-email-page';
import { CreateAccountPage } from './components/create-account-page';
import { DevModal } from './components/dev-modal';
import { RegisterCompanyPage } from './components/register-company-page';
import { ProjectHomePage } from './components/project-home-page';
import { ClassificationCrosswalk } from './components/classification-crosswalk';

const svgPaths = { ...svgPaths1, ...svgPaths2 };

// ─── Icon Components ─────────────────────────────────────────────────────────

function InertiaAiIcon() {
  return (
    <svg width="28" height="35" viewBox="0 0 27.7697 35" fill="none">
      <path d={svgPaths.p3a58b200} fill="#FF4D00" />
      <path d={svgPaths.pa17be00} fill="#FF4D00" />
      <path d={svgPaths.p2ba2fc00} fill="#BFBFBF" />
      <path d={svgPaths.pa4fe3c0} fill="#BFBFBF" />
      <path d={svgPaths.pf332b72} fill="#BFBFBF" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 21.9224 23.6853" fill="none">
      <path d={svgPaths.p10fb2100} fill="white" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 23.3463 23.3463" fill="none">
      <path d={svgPaths.p32e50f00} fill="white" />
    </svg>
  );
}

function UserSingleIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path d={svgPaths.p324c6880} stroke={color} strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p43b5d80} stroke={color} strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function UserKeyIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 21.2739 21.0652" fill="none">
      <path d={svgPaths.p6e2fe00} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p3e8a3d00} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p26980980} stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function UserCompanyIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p339a9c00} fill={color} />
      <path d={svgPaths.p169fb580} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p1ea89980} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p1260fa80} stroke={color} strokeWidth="1.5" />
      <path d={svgPaths.pe91d900} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p1881e080} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function UserGroupIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="16" height="19" viewBox="0 0 15.5 18.75" fill="none">
      <path d={svgPaths.p3bc86f80} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p19176380} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function LayersIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p1cccd200} fill={color} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20.5302 20.5303" fill="none">
      <circle cx="8.315" cy="8.315" r="7.565" stroke="#616D79" strokeWidth="1.5" />
      <path d="M14.1303 14.1304L19.9999 20" stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 19.5 21.5" fill="none">
      <path d={svgPaths.p55f5a00} stroke="#616D79" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ImportIcon() {
  return (
    <svg width="21" height="22" viewBox="0 0 20.75 21.5" fill="none">
      <path d={svgPaths.p39b25880} stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d={svgPaths.p3c64cd90} stroke="#616D79" strokeWidth="1.5" />
      <path d={svgPaths.p32883150} stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 21.8107 21.2803" fill="none">
      <path d={svgPaths.p34ec8300} stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d={svgPaths.p9c65f00} stroke="#616D79" strokeWidth="1.5" />
      <path d={svgPaths.p2702c480} stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12.611 12.611" fill="none">
      <path d={svgPaths.p28c07a00} fill="white" />
    </svg>
  );
}

function ChevronIcon({ direction = 'down', color = 'white', size = 12 }: { direction?: string; color?: string; size?: number }) {
  const rotation = direction === 'right' ? 0 : direction === 'down' ? 90 : direction === 'left' ? 180 : 270;
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 8.12132 14.1213" fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}>
      <path d={svgPaths.p5cbda00} stroke={color} strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p1f77ff0} fill="#384857" />
      <path d={svgPaths.p2419c080} fill="#384857" />
    </svg>
  );
}

function CollapseRightIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg width="19" height="18" viewBox="0 0 18.75 18" fill="none">
      <path d="M7.86805e-07 9L14.625 9" stroke={color} strokeWidth="1.5" />
      <path d={svgPaths.p2fe9d080} stroke={color} strokeWidth="1.5" />
      <path d="M18 0V18" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function SettingsIcon({ color = '#FF4D00' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Inner circle */}
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Outer gear ring */}
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function EllipsisIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="20" height="4" viewBox="0 0 20 3.33333" fill="none">
      <path d={svgPaths.p2fca5e70} fill={color} />
    </svg>
  );
}

function InfoIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" stroke={color} />
      <circle cx="9.5" cy="5.5" r="1" fill={color} stroke={color} />
      <path d="M8 9H10V15M10 15H8M10 15H12" stroke={color} strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 14.8345 11.5" fill="none">
      <path d={svgPaths.p2d0593c0} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 14.8345 11.5" fill="none">
      <path d={svgPaths.p36164580} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function TableColumnsIcon() {
  return (
    <div className="flex gap-[4px] items-center">
      {[0, 1].map((col) => (
        <div key={col} className="flex flex-col gap-[3px]">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="bg-[#616d79] h-[3px] w-[13px]" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Sidebar Chevron (24×24, right by default → rotates down when open) ──────
function SidebarChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
    >
      <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Project Config Icon (3-slider control, orange) ──────────────────────────
function ProjectConfigIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Top slider track */}
      <line x1="3" y1="6" x2="21" y2="6" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Top slider handle */}
      <circle cx="8" cy="6" r="2.25" fill="#243746" stroke="#FF4D00" strokeWidth="1.5" />
      {/* Middle slider track */}
      <line x1="3" y1="12" x2="21" y2="12" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Middle slider handle */}
      <circle cx="16" cy="12" r="2.25" fill="#243746" stroke="#FF4D00" strokeWidth="1.5" />
      {/* Bottom slider track */}
      <line x1="3" y1="18" x2="21" y2="18" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bottom slider handle */}
      <circle cx="10" cy="18" r="2.25" fill="#243746" stroke="#FF4D00" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Companies icon — wraps the Figma 24px asset at a fixed 24×24 container ──
// The asset uses var(--stroke-0, white) which defaults to white on the dark sidebar.
function CompaniesIcon() {
  return (
    <div className="w-[24px] h-[24px] relative shrink-0">
      <Component24PxAppUserCompany />
    </div>
  );
}

// ─── Project Switcher uses LANDING_PROJECTS from user-account-landing ─────────
type Project = NavProject;

// ─── Project Switcher Dropdown (portal) ──────────────────────────────────────
function ProjectSwitcherDropdown({
  isOpen,
  anchorEl,
  activeProjectId,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  activeProjectId: string;
  onSelect: (project: Project) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search + reset query when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        anchorEl && !anchorEl.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, anchorEl, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();
  const filtered = LANDING_PROJECTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ReactDOM.createPortal(
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: rect.bottom + 6,
        left: rect.left,
        zIndex: 9999,
        background: '#FFFFFF',
        borderRadius: 8,
        border: '1px solid #E0E4E8',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
        width: 320,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Search — Medium (36px), consistent with landing page search style */}
      <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #E0E4E8', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 36,
            paddingLeft: 10,
            paddingRight: 10,
            border: '1px solid #D0D5DD',
            borderRadius: 4,
            background: '#FFFFFF',
            transition: 'border-color 0.15s',
          }}
          onFocusCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = '#91D5FF'; }}
          onBlurCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D0D5DD'; }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
            <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '20px',
              color: '#344054',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 16, height: 16, border: 'none', background: 'none',
                cursor: 'pointer', padding: 0, flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Project list */}
      <div style={{ maxHeight: 340, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 13,
            color: '#616D79',
            textAlign: 'center',
          }}>
            No projects match &ldquo;{searchQuery}&rdquo;
          </div>
        ) : filtered.map((project) => {
          const isActive = project.id === activeProjectId;
          return (
            <button
              key={project.id}
              onClick={() => { onSelect(project); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '10px 16px',
                gap: 12,
                background: isActive ? '#E6F7FF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.12s',
                borderLeft: isActive ? '3px solid #1890FF' : '3px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = '#F5F6F7';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = isActive ? '#E6F7FF' : 'transparent';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: 44, height: 44, borderRadius: 6,
                overflow: 'hidden', flexShrink: 0, border: '1px solid #E0E4E8',
              }}>
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: '#1D2C38',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '18px',
                }}>
                  {project.name}
                </div>
                <div style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: 400,
                  color: '#616D79',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '16px',
                  marginTop: 1,
                }}>
                  {project.account}
                </div>
              </div>

              {/* Active checkmark */}
              {isActive && (
                <div style={{ flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7.5" fill="#1890FF" />
                    <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
}

// ─── BLADE Wordmark (162×40 — current Blade logo, used on the landing-page header) ──
function BladeWordmark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 24, paddingRight: 24, flexShrink: 0 }}>
      <div style={{ width: 155, height: 40, flexShrink: 0, position: 'relative' }}>
        <Bladefulllogo40 />
      </div>
    </div>
  );
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────
function TopNav({
  sidebarExpanded,
  onToggle,
  onNavigateHome,
  onNavigateToProject,
  onSelectModule,
  isLandingPage = false,
  onSignOut,
}: {
  sidebarExpanded: boolean;
  onToggle: () => void;
  onNavigateHome: () => void;
  onNavigateToProject: () => void;
  onSelectModule: (id: string) => void;
  isLandingPage?: boolean;
  onSignOut?: () => void;
}) {
  const [moduleSelectorOpen, setModuleSelectorOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(LANDING_PROJECTS[0]);
  const projectTriggerRef = useRef<HTMLButtonElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const handleSelectProject = useCallback((project: Project) => {
    setActiveProject(project);
    // Selecting a project from the dropdown navigates directly to the project view
    onNavigateToProject();
  }, [onNavigateToProject]);

  return (
    <div
      className="bg-[#243746] flex h-[56px] items-center justify-between pr-[12px] shrink-0 w-full z-10 overflow-visible shadow-none border-0 outline-none"
      style={{ boxShadow: 'none', borderBottom: 'none', outline: 'none' }}
    >
      {/* Left Section */}
      <div className="flex items-center overflow-visible">

        {/* Module Selector panel — rendered via portal, anchored to right side */}
        <ModuleSelector
          isOpen={moduleSelectorOpen}
          onClose={() => setModuleSelectorOpen(false)}
          onSelectModule={(id) => { setModuleSelectorOpen(false); onSelectModule(id); }}
          anchorTop={60}
          anchorRight={12}
          triggerRef={launcherRef}
        />

        {/* Project Switcher Dropdown */}
        <ProjectSwitcherDropdown
          isOpen={projectDropdownOpen}
          anchorEl={projectTriggerRef.current}
          activeProjectId={activeProject.id}
          onSelect={handleSelectProject}
          onClose={() => setProjectDropdownOpen(false)}
        />

        {/* ── Landing page: BLADE wordmark only ── */}
        {isLandingPage ? (
          <button
            onClick={onNavigateHome}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', opacity: 1, transition: 'opacity 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <BladeWordmark />
          </button>
        ) : (
          /* ── Project view: Thumbnail + two-line label ── */
          <div className="flex items-center h-[56px] shrink-0" style={{ gap: 4 }}>
            {/* Thumbnail — reflects active project */}
            <div className="w-[56px] h-[56px] shrink-0 overflow-hidden">
              <img src={activeProject.thumbnail} alt={activeProject.name} className="w-full h-full object-cover" style={{ borderRadius: 0 }} />
            </div>

            {/* Two-line label: BLADE wordmark (→ home) + project name button (dropdown) */}
            <div className="flex flex-col justify-center h-[56px]" style={{ gap: 0, marginTop: 2 }}>
              {/* BLADE wordmark */}
              <button
                onClick={onNavigateHome}
                className="flex items-center group cursor-pointer"
                style={{ background: 'none', border: 'none', padding: '0 0 0 16px', outline: 'none' }}
              >
                <div style={{ width: 87, height: 20, flexShrink: 0, overflow: 'hidden', position: 'relative', transition: 'opacity 0.15s' }} className="group-hover:opacity-70">
                  <div style={{ width: 155, height: 40, transform: 'scale(0.56)', transformOrigin: 'top left' }}>
                    <Bladefulllogo40 />
                  </div>
                </div>
              </button>

              {/* Project name — Small Primary Dark Mode button (§15.1.1) */}
              <button
                ref={projectTriggerRef}
                onClick={() => setProjectDropdownOpen(o => !o)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 32,
                  padding: '0 8px 0 16px',
                  borderRadius: 4,
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  outline: 'none',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                  marginTop: 2,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4C5A67'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.background = '#75808B'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4C5A67'; }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                  {activeProject.name}
                </span>
                {/* 16×16 chevron icon — Small size */}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                    transform: projectDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Right Icons — vertically centered within the 56px header */}
      <div className="flex items-center gap-[8px] h-[56px]">

        {/* Help / Question icon — Primary dark surface, 40×40 */}
        <button
          className="flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            borderRadius: 4,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4C5A67'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
          onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#75808B'; }}
          onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4C5A67'; }}
        >
          <QuestionIcon />
        </button>

        {/* Settings icon — only shown on the User Account Landing Page (Account Admin Setting) */}
        {isLandingPage && (
          <button
            className="flex items-center justify-center shrink-0 cursor-pointer transition-colors"
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'transparent',
              outline: 'none',
              border: 'none',
              borderRadius: 4,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4C5A67'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#75808B'; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4C5A67'; }}
          >
            <SettingsIcon color="white" />
          </button>
        )}

        {/* App Launcher — only shown when inside a project, not on the landing page */}
        {!isLandingPage && (
          <button
            ref={launcherRef}
            className="flex items-center justify-center shrink-0 cursor-pointer transition-colors"
            style={{
              width: 40,
              height: 40,
              backgroundColor: moduleSelectorOpen ? '#384857' : 'transparent',
              outline: 'none',
              border: 'none',
              borderRadius: 4,
            }}
            onMouseEnter={e => { if (!moduleSelectorOpen) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4C5A67'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = moduleSelectorOpen ? '#384857' : 'transparent'; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#75808B'; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = moduleSelectorOpen ? '#384857' : '#4C5A67'; }}
            onClick={() => setModuleSelectorOpen(o => !o)}
          >
            <AppsGridIcon size={24} color={moduleSelectorOpen ? '#FF4D00' : 'white'} />
          </button>
        )}

        {/* Avatar block — click to toggle ProfileDropdown */}
        <button
          ref={avatarRef}
          onClick={() => setProfileDropdownOpen(o => !o)}
          className="flex items-center gap-[12px] bg-black rounded px-[6px] h-[44px] w-[200px] cursor-pointer outline-none"
          style={{
            border: profileDropdownOpen ? '1px solid #40A9FF' : '1px solid #75808B',
            boxShadow: profileDropdownOpen ? '0 0 0 3px rgba(64,169,255,0.25)' : 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            if (!profileDropdownOpen) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#40A9FF';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 3px rgba(64,169,255,0.25)';
            }
          }}
          onMouseLeave={e => {
            if (!profileDropdownOpen) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#75808B';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }
          }}
        >
          <div className="opacity-[0.44] flex-1 h-[44px] flex items-center justify-center overflow-hidden">
            <img src={imgSatpon1} alt="Inertia Logo" className="h-[26px] w-[150px] object-cover" />
          </div>
          <div className="shrink-0 size-[38px] rounded-full overflow-hidden"
            style={{ maskImage: `url('${imgShutterstock6856549541}')`, maskSize: '72px 72px', maskPosition: '-15px -8px' }}>
            <img src={imgAvatar} alt="" className="size-full object-cover" />
          </div>
        </button>

        {/* Profile dropdown portal */}
        <ProfileDropdown
          isOpen={profileDropdownOpen}
          onClose={() => setProfileDropdownOpen(false)}
          anchorRef={avatarRef}
          triggerRef={avatarRef}
          onSignOut={onSignOut}
        />
      </div>
    </div>
  );
}

// ─── Reusable Full Nav Sidebar ���───────────────────────────────────────────────
interface NavItem { id: string; label: string; icon: (color: string) => React.ReactNode; }

function FullNavSidebar({ expanded, onToggle, headerIcon, headerLabel, navItems, activeNav, onNavChange, onSettings, headerBreadcrumb }: {
  expanded: boolean; onToggle: () => void; headerIcon: React.ReactNode; headerLabel: string;
  navItems: NavItem[]; activeNav: string; onNavChange: (id: string) => void;
  onSettings?: () => void;
  headerBreadcrumb?: { backLabel: string; onBack: () => void };
}) {
  const renderItem = (item: NavItem) => {
    const isActive = activeNav === item.id;
    const iconColor = isActive ? '#FF4D00' : 'white';
    if (expanded) {
      return (
        <div key={item.id}
          className={`relative flex items-center h-[48px] px-[16px] cursor-pointer transition-colors ${isActive ? 'bg-[#384857]' : 'hover:bg-[#2d4255]'}`}
          onClick={() => onNavChange(item.id)}>
          {isActive && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF4D00]" />}
          <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0">{item.icon(iconColor)}</div>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: isActive ? 700 : 400, lineHeight: '20px', letterSpacing: '-0.28px', color: isActive ? '#F0F0F0' : 'white', marginLeft: 12, whiteSpace: 'nowrap' }}>{item.label}</span>
        </div>
      );
    }
    return (
      <div key={item.id} title={item.label}
        className={`relative w-[56px] h-[48px] flex items-center justify-center cursor-pointer transition-colors ${isActive ? 'bg-[#384857]' : 'hover:bg-[#2d4255]'}`}
        onClick={() => onNavChange(item.id)}>
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF4D00]" />}
        <div className="w-[24px] h-[24px] flex items-center justify-center">{item.icon(iconColor)}</div>
      </div>
    );
  };
  return (
    <div className="relative flex-shrink-0 h-full" style={{ width: expanded ? 280 : 56 }}>
      <div className="bg-[#243746] h-full flex flex-col" style={{ width: expanded ? 280 : 56 }}>
        <SidebarHeader expanded={expanded} onToggle={onToggle} icon={headerIcon} label={headerLabel}
          titleAttr={expanded ? 'Collapse sidebar' : `Expand sidebar — ${headerLabel}`}
          breadcrumb={headerBreadcrumb} />
        {navItems.map(renderItem)}
        <div className="flex-1" />
        {/* Settings item — rendered above collapse button when onSettings is provided */}
        {onSettings && (expanded ? (
          <div
            className={`relative flex items-center h-[48px] px-[16px] cursor-pointer transition-colors ${activeNav.startsWith('insp-settings-') ? 'bg-[#384857]' : 'hover:bg-[#2d4255]'}`}
            onClick={onSettings}
          >
            {activeNav.startsWith('insp-settings-') && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF4D00]" />}
            <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke={activeNav.startsWith('insp-settings-') ? '#FF4D00' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                  stroke={activeNav.startsWith('insp-settings-') ? '#FF4D00' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: activeNav.startsWith('insp-settings-') ? 700 : 400, lineHeight: '20px', letterSpacing: '-0.28px', color: activeNav.startsWith('insp-settings-') ? '#F0F0F0' : 'white', marginLeft: 12, whiteSpace: 'nowrap' }}>Settings</span>
          </div>
        ) : (
          <div
            title="Settings"
            className={`relative w-[56px] h-[48px] flex items-center justify-center cursor-pointer transition-colors ${activeNav.startsWith('insp-settings-') ? 'bg-[#384857]' : 'hover:bg-[#2d4255]'}`}
            onClick={onSettings}
          >
            {activeNav.startsWith('insp-settings-') && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF4D00]" />}
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke={activeNav.startsWith('insp-settings-') ? '#FF4D00' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                  stroke={activeNav.startsWith('insp-settings-') ? '#FF4D00' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
        {expanded ? (
          <div className="flex items-center h-[48px] px-[16px] cursor-pointer hover:bg-[#2d4255] transition-colors bg-[#384857]" onClick={onToggle}>
            <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0 rotate-180"><CollapseRightIcon /></div>
          </div>
        ) : (
          <div className="w-[56px] h-[48px] flex items-center justify-center cursor-pointer hover:bg-[#2d4255] transition-colors bg-[#384857]" onClick={onToggle}>
            <div className="w-[24px] h-[24px] flex items-center justify-center"><CollapseRightIcon /></div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Nav icons (color-aware, for sidebar items) ───────────────────────────────
const NavIco: Record<string, (c: string) => React.ReactNode> = {
  general:       (c) => <svg width="24" height="24" viewBox="0 0 27.3333 27.3333" fill="none"><path d="M13.6667 19V13M1 13.6667C1 7.696 1 4.70933 2.85467 2.85467C4.70933 1 7.69467 1 13.6667 1C19.6373 1 22.624 1 24.4787 2.85467C26.3333 4.70933 26.3333 7.69467 26.3333 13.6667C26.3333 19.6373 26.3333 22.624 24.4787 24.4787C22.624 26.3333 19.6387 26.3333 13.6667 26.3333C7.696 26.3333 4.70933 26.3333 2.85467 24.4787C1 22.624 1 19.6387 1 13.6667Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.6667 8.34933V8.336" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  members:       (c) => <svg width="24" height="24" viewBox="0 0 20.6667 24.6667" fill="none"><path d="M17 7.66667C17 5.89856 16.2976 4.20286 15.0474 2.95262C13.7971 1.70238 12.1014 1 10.3333 1C8.56522 1 6.86953 1.70238 5.61929 2.95262C4.36905 4.20286 3.66667 5.89856 3.66667 7.66667C3.66667 9.43478 4.36905 11.1305 5.61929 12.3807C6.86953 13.631 8.56522 14.3333 10.3333 14.3333C12.1014 14.3333 13.7971 13.631 15.0474 12.3807C16.2976 11.1305 17 9.43478 17 7.66667Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.6667 23.6667C19.6667 22.441 19.4253 21.2273 18.9562 20.095C18.4872 18.9626 17.7997 17.9337 16.933 17.067C16.0663 16.2003 15.0374 15.5128 13.905 15.0438C12.7727 14.5747 11.559 14.3333 10.3333 14.3333C9.10766 14.3333 7.89399 14.5747 6.76162 15.0438C5.62925 15.5128 4.60035 16.2003 3.73367 17.067C2.86699 17.9337 2.1795 18.9626 1.71046 20.095C1.24141 21.2273 1 22.441 1 23.6667" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  teams:         (c) => <svg width="24" height="24" viewBox="0 0 26 25.9985" fill="none"><path d="M14.3333 11.6651C14.3333 10.2507 13.7714 8.8941 12.7712 7.8939C11.771 6.89371 10.4145 6.3318 9 6.3318C7.58551 6.3318 6.22896 6.89371 5.22876 7.8939C4.22857 8.8941 3.66667 10.2507 3.66667 11.6651C3.66667 13.0796 4.22857 14.4362 5.22876 15.4364C6.22896 16.4366 7.58551 16.9985 9 16.9985C10.4145 16.9985 11.771 16.4366 12.7712 15.4364C13.7714 14.4362 14.3333 13.0796 14.3333 11.6651Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.7187 7.0758C11.5504 5.8791 11.7936 4.66073 12.4083 3.6203C13.0231 2.57987 13.973 1.77905 15.1023 1.34905C16.2317 0.919046 17.4737 0.885347 18.6247 1.25347C19.7757 1.6216 20.7676 2.36972 21.4379 3.37529C22.1082 4.38085 22.4171 5.58424 22.314 6.78831C22.2109 7.99238 21.7019 9.12574 20.8705 10.0027C20.039 10.8797 18.9344 11.4483 17.7375 11.6154C16.5406 11.7825 15.3225 11.5382 14.2827 10.9225M17 24.9985C17 22.8767 16.1571 20.8419 14.6569 19.3416C13.1566 17.8413 11.1217 16.9985 9 16.9985C6.87827 16.9985 4.84344 17.8413 3.34315 19.3416C1.84286 20.8419 1 22.8767 1 24.9985" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 19.6651C25 17.5434 24.1571 15.5086 22.6569 14.0083C21.1566 12.508 19.1217 11.6651 17 11.6651" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  locations:     (c) => <svg width="24" height="24" viewBox="0 0 15.3333 26" fill="none"><path d="M7.66667 11.6667C10.6122 11.6667 13 9.27885 13 6.33333C13 3.38781 10.6122 1 7.66667 1C4.72115 1 2.33333 3.38781 2.33333 6.33333C2.33333 9.27885 4.72115 11.6667 7.66667 11.6667Z" stroke={c} strokeWidth="2"/><path d="M7.66667 11.6667V21M14.3333 22.3333C14.3333 23.8067 11.348 25 7.66667 25C3.98533 25 1 23.8067 1 22.3333" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  refdata:       (c) => <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M4 20V22H8.586L2 28.586L3.414 30L10 23.414V28H12V20H4ZM20 22H24V24H20V22ZM16 18H20V20H16V18ZM20 14H24V16H20V14ZM8 14H12V16H8V14Z" fill={c}/><path d="M27 3H5C4.46981 3.00079 3.96156 3.21176 3.58666 3.58666C3.21176 3.96156 3.00079 4.46981 3 5V16H5V11H27V27H16V29H27C27.5302 28.9992 28.0384 28.7882 28.4133 28.4133C28.7882 28.0384 28.9992 27.5302 29 27V5C28.9992 4.46981 28.7882 3.96156 28.4133 3.58666C28.0384 3.21176 27.5302 3.00079 27 3ZM27 9H5V5H27V9Z" fill={c}/></svg>,
  workPackages:  (c) => <svg width="24" height="24" viewBox="0 0 19.5 21.5" fill="none"><path d={packageIconPaths.p1da5cb70} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>,
  notifications: (c) => <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M20.6667 24C20.6667 24.6128 20.546 25.2197 20.3114 25.7859C20.0769 26.352 19.7332 26.8665 19.2998 27.2998C18.8665 27.7332 18.352 28.0769 17.7859 28.3114C17.2197 28.546 16.6128 28.6667 16 28.6667C15.3872 28.6667 14.7803 28.546 14.2141 28.3114C13.648 28.0769 13.1335 27.7332 12.7002 27.2998C12.2668 26.8665 11.9231 26.352 11.6886 25.7859C11.454 25.2197 11.3333 24.6128 11.3333 24M25.6413 24H6.36C5.89356 23.9998 5.43766 23.8613 5.04992 23.602C4.66218 23.3428 4.36002 22.9744 4.18163 22.5434C4.00325 22.1124 3.95665 21.6382 4.04773 21.1808C4.13881 20.7233 4.36348 20.3031 4.69333 19.9733L5.496 19.1693C6.24571 18.4191 6.66679 17.4019 6.66667 16.3413V12.6667C6.66667 10.1913 7.65 7.81734 9.40034 6.067C11.1507 4.31666 13.5246 3.33333 16 3.33333C18.4754 3.33333 20.8493 4.31666 22.5997 6.067C24.35 7.81734 25.3333 10.1913 25.3333 12.6667V16.3413C25.3336 17.4021 25.7551 18.4194 26.5053 19.1693L27.3093 19.9733C27.6385 20.3034 27.8626 20.7235 27.9533 21.1807C28.0441 21.638 27.9973 22.1119 27.8191 22.5426C27.6408 22.9733 27.3389 23.3416 26.9516 23.6009C26.5643 23.8603 26.1075 23.9992 25.6413 24Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  workflows:     (c) => <svg width="24" height="24" viewBox="0 0 28.6665 28.6667" fill="none"><path d="M6.33314 5.66667C6.33314 4.42 6.33314 3.79733 6.60114 3.33333C6.77667 3.02932 7.02913 2.77686 7.33314 2.60133C7.79714 2.33333 8.41981 2.33333 9.66648 2.33333H13.6665C14.9131 2.33333 15.5358 2.33333 15.9998 2.60133C16.3038 2.77686 16.5563 3.02932 16.7318 3.33333C16.9998 3.79733 16.9998 4.42 16.9998 5.66667C16.9998 6.91333 16.9998 7.536 16.7318 8C16.5563 8.30401 16.3038 8.55647 15.9998 8.732C15.5358 9 14.9131 9 13.6665 9H9.66648C8.41981 9 7.79714 9 7.33314 8.732C7.02913 8.55647 6.77667 8.30401 6.60114 8C6.33314 7.536 6.33314 6.91333 6.33314 5.66667ZM6.33314 19C6.33314 17.7533 6.33314 17.1307 6.60114 16.6667C6.77667 16.3627 7.02913 16.1102 7.33314 15.9347C7.79714 15.6667 8.41981 15.6667 9.66648 15.6667H13.6665C14.9131 15.6667 15.5358 15.6667 15.9998 15.9347C16.3038 16.1102 16.5563 16.3627 16.7318 16.6667C16.9998 17.1307 16.9998 17.7533 16.9998 19C16.9998 20.2467 16.9998 20.8693 16.7318 21.3333C16.5563 21.6373 16.3038 21.8898 15.9998 22.0653C15.5358 22.3333 14.9131 22.3333 13.6665 22.3333H9.66648C8.41981 22.3333 7.79714 22.3333 7.33314 22.0653C7.02913 21.8898 6.77667 21.6373 6.60114 21.3333C6.33314 20.8693 6.33314 20.2467 6.33314 19ZM26.1198 21.1867C27.1505 20.156 27.6665 19.64 27.6665 19C27.6665 18.36 27.1505 17.844 26.1198 16.8133L25.8531 16.5467C24.8225 15.516 24.3065 15 23.6665 15C23.0265 15 22.5105 15.516 21.4798 16.5467L21.2131 16.8133C20.1825 17.844 19.6665 18.36 19.6665 19C19.6665 19.64 20.1825 20.156 21.2131 21.1867L21.4798 21.4533C22.5105 22.484 23.0265 23 23.6665 23C24.3065 23 24.8225 22.484 25.8531 21.4533L26.1198 21.1867Z" stroke={c} strokeWidth="2"/><path d="M6.34114 5.66667H1.01048M1.01048 5.66667V1M1.01048 5.66667V14.3333C1.01048 15.8053 0.809142 17.624 2.19448 18.5507C2.86648 19 3.80248 19 5.67448 19M17.0025 19H19.6691M23.6665 15V11C23.6665 8.48533 23.6665 7.22933 22.8865 6.448C22.1051 5.66667 20.8491 5.66667 18.3358 5.66667H17.0025M27.6665 27.6667C26.4238 27.6667 25.8025 27.6667 25.3131 27.4933C24.6598 27.26 24.1398 26.816 23.8691 26.256C23.6665 25.836 23.6665 25.3027 23.6665 24.2387V23.6667" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  roles:         (c) => <svg width="24" height="24" viewBox="0 0 26.8926 24.6667" fill="none"><path d="M17 7.66667C17 5.89856 16.2976 4.20286 15.0474 2.95262C13.7971 1.70238 12.1014 1 10.3333 1C8.56522 1 6.86953 1.70238 5.61929 2.95262C4.36905 4.20286 3.66667 5.89856 3.66667 7.66667C3.66667 9.43478 4.36905 11.1305 5.61929 12.3807C6.86953 13.631 8.56522 14.3333 10.3333 14.3333C12.1014 14.3333 13.7971 13.631 15.0474 12.3807C16.2976 11.1305 17 9.43478 17 7.66667Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.6667 23.6667C19.6667 22.441 19.4253 21.2273 18.9562 20.095C18.4872 18.9626 17.7997 17.9337 16.933 17.067C16.0663 16.2003 15.0374 15.5128 13.905 15.0438C12.7727 14.5747 11.559 14.3333 10.3333 14.3333C9.10766 14.3333 7.89399 14.5747 6.76162 15.0438C5.62925 15.5128 4.60035 16.2003 3.73367 17.067C2.86699 17.9337 2.1795 18.9626 1.71046 20.095C1.24141 21.2273 1 22.441 1 23.6667" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M25.8926 14.334C25.8926 14.334 20.6367 10.463 20.6367 9.07812C20.6367 7.69321 25.8926 3.82227 25.8926 3.82227" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  discTrade:     (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6"/><rect x="14" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6"/><rect x="2" y="14" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6"/><path d="M14 18h8M18 14v8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/><path d="M10 7h4M12 5v4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  roleAccess:    (c) => <svg width="24" height="24" viewBox="0 0 27.328 26" fill="none"><path d="M19.3133 17.8987V16.0027C19.3133 15.3829 19.5595 14.7886 19.9977 14.3504C20.4359 13.9122 21.0303 13.666 21.65 13.666C22.2697 13.666 22.8641 13.9122 23.3023 14.3504C23.7405 14.7886 23.9867 15.3829 23.9867 16.0027V17.8987M17 7.66667C17 5.89856 16.2976 4.20286 15.0474 2.95262C13.7971 1.70238 12.1014 1 10.3333 1C8.56522 1 6.86953 1.70238 5.61929 2.95262C4.36905 4.20286 3.66667 5.89856 3.66667 7.66667C3.66667 9.43478 4.36905 11.1305 5.61929 12.3807C6.86953 13.631 8.56522 14.3333 10.3333 14.3333C12.1014 14.3333 13.7971 13.631 15.0474 12.3807C16.2976 11.1305 17 9.43478 17 7.66667ZM19.4067 25H23.9213C25.2507 25 26.328 23.924 26.328 22.5973V20.592C26.328 19.2653 25.2507 18.1907 23.9213 18.1907H19.4067C18.0773 18.1907 17 19.2653 17 20.592V22.5973C17 23.924 18.0773 25 19.4067 25Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 23.6667C0.999893 21.9612 1.46706 20.2884 2.35076 18.8298C3.23446 17.3712 4.50092 16.1826 6.01258 15.3931C7.52425 14.6036 9.22333 14.2434 10.9253 14.3515C12.6273 14.4597 14.2671 15.0321 15.6667 16.0067" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  inspTpl:       (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill={c === '#FF4D00' ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.1)'} stroke={c} strokeWidth="1.5"/><circle cx="15" cy="9" r="3" stroke={c} strokeWidth="1.3"/><path d="M17.2 11.2L20 14" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M7 15h5M7 18h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  checkTpl:      (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill={c === '#FF4D00' ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.1)'} stroke={c} strokeWidth="1.5"/><path d="M8 8l1.5 1.5L13 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 13l1.5 1.5L13 11" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18h6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  obsTpl:        (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill={c === '#FF4D00' ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.1)'} stroke={c} strokeWidth="1.5"/><ellipse cx="12" cy="11" rx="4" ry="2.5" stroke={c} strokeWidth="1.3"/><circle cx="12" cy="11" r="1.2" fill={c}/><path d="M7 16h5M7 14h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  rptTpl:        (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill={c === '#FF4D00' ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.1)'} stroke={c} strokeWidth="1.5"/><path d="M8 17v-3M11 17v-5M14 17v-7" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M7 7h6" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

const PROJECT_SETTINGS_NAV: NavItem[] = [
  { id: 'general',           label: 'Information',                 icon: NavIco.general },
  { id: 'project-members',   label: 'Members',                     icon: NavIco.members },
  { id: 'teams',             label: 'Teams',                       icon: NavIco.teams },
  { id: 'locations',         label: 'Location Breakdown Structure', icon: NavIco.locations },
  { id: 'discipline-trade',  label: 'Discipline & Trade',          icon: NavIco.discTrade },
  { id: 'reference-data',    label: 'Reference Data',              icon: NavIco.refdata },
  { id: 'work-packages',     label: 'Classification Crosswalk',    icon: NavIco.workPackages },
  { id: 'notifications',     label: 'Notifications',               icon: NavIco.notifications },
  { id: 'workflows',         label: 'Workflows',                   icon: NavIco.workflows },
  { id: 'roles',             label: 'Roles',                       icon: NavIco.roles },
  { id: 'role-access-level', label: 'Role Permission',             icon: NavIco.roleAccess },
];

const TEMPLATE_LIBRARIES_NAV: NavItem[] = [
  { id: 'inspection-templates',  label: 'Inspection Templates',  icon: NavIco.inspTpl },
  { id: 'checklist-templates',   label: 'Checklist Templates',   icon: NavIco.checkTpl },
  { id: 'observation-templates', label: 'Observation Templates', icon: NavIco.obsTpl },
  { id: 'report-templates',      label: 'Report Templates',      icon: NavIco.rptTpl },
];

const INSPECTION_TOOL_NAV: NavItem[] = [
  {
    id: 'inspection-list',
    label: 'List',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 6h13M8 12h13M8 18h13" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="6"  r="1.5" fill={c} />
        <circle cx="4" cy="12" r="1.5" fill={c} />
        <circle cx="4" cy="18" r="1.5" fill={c} />
      </svg>
    ),
  },
  {
    id: 'inspection-schedule',
    label: 'Schedule',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke={c} strokeWidth="1.5" />
        <path d="M3 9h18" stroke={c} strokeWidth="1.5" />
        <path d="M8 4V2M16 4V2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 14h3M7 17h5M14 14h3" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const INSPECTION_SETTINGS_NAV: NavItem[] = [
  {
    id: 'insp-settings-refdata',
    label: 'Reference Data',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" />
        <path d="M3 9h18M3 15h18" stroke={c} strokeWidth="1.5" />
        <path d="M9 9v9M15 9v9" stroke={c} strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'insp-settings-workflow',
    label: 'Workflow',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5" />
        <rect x="16" y="5" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5" />
        <rect x="9" y="15" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5" />
        <path d="M5 9v3a1 1 0 001 1h5M19 9v3a1 1 0 01-1 1h-5M12 13v2" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'insp-settings-governance',
    label: 'Data Governance',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 6.5v5.5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L12 3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'insp-settings-automation',
    label: 'Automation',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'insp-settings-integrations',
    label: 'Integrations',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5"  cy="12" r="2.5" stroke={c} strokeWidth="1.5" />
        <circle cx="19" cy="6"  r="2.5" stroke={c} strokeWidth="1.5" />
        <circle cx="19" cy="18" r="2.5" stroke={c} strokeWidth="1.5" />
        <path d="M7.5 11L16.5 7M7.5 13L16.5 17" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ProjSettingsHeaderIcon = (
  <svg width="24" height="24" viewBox="0 0 26 23.3333" fill="none">
    <path d={projSettingsIconPaths.p1d843180} stroke="#FF4D00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d={projSettingsIconPaths.p2ee9cd80} stroke="#FF4D00" strokeWidth="2" />
  </svg>
);
const TemplateLibHeaderIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5"/>
    <path d="M3 9h18M9 21V9" stroke="#FF4D00" strokeWidth="1.5"/>
  </svg>
);

const InspectionToolHeaderIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 11l2 2 4-4" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InspectionSettingsHeaderIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Sidebar App Config (icon + label per module, orange on navy) ─────────────
const SIDEBAR_APP_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  files: { label: 'Files', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3v6h6" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13h6M9 17h4" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  specifications: { label: 'Specifications', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M8 8h8M8 12h8M8 16h5" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  drawings: { label: 'Drawings', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M7 17l3-5 3 3 2-3.5 2 5.5" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  models: { label: 'Models', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 4.5v9L12 21 3 16.5v-9L12 3z" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 3v18M3 7.5l9 4.5 9-4.5" stroke="#FF4D00" strokeWidth="1.4" strokeLinejoin="round" /></svg> },
  'daily-logs': { label: 'Daily Logs', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M3 9h18" stroke="#FF4D00" strokeWidth="1.5" /><path d="M8 4V2M16 4V2" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 14h4M7 17h6" stroke="#FF4D00" strokeWidth="1.4" strokeLinecap="round" /></svg> },
  inspections: { label: 'Inspections', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M16.5 16.5L21 21" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 11l2 2 4-4" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  observations: { label: 'Observations', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="9" ry="5.5" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.5" fill="rgba(255,77,0,0.25)" stroke="#FF4D00" strokeWidth="1.5" /></svg> },
  issues: { label: 'Issues', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L21.5 19.5H2.5L12 3z" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 10v4" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="17" r="1" fill="#FF4D00" /></svg> },
  checklists: { label: 'Checklists', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M9 8l1.5 1.5L14 6" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 13l1.5 1.5L14 11" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 18h6" stroke="#FF4D00" strokeWidth="1.4" strokeLinecap="round" /></svg> },
  safety: { label: 'Safety', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3L4 6.5v5.5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L12 3z" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  rfis: { label: 'RFIs', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="17" r="1" fill="#FF4D00" /></svg> },
  submittals: { label: 'Submittals', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M12 8v8M8.5 13.5L12 17l3.5-3.5" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  meetings: { label: 'Meetings', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="14" height="11" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M16 10l5-3v10l-5-3V10z" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /></svg> },
  reports: { label: 'Reports', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3v6h6" stroke="#FF4D00" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 17v-3M12 17v-5M16 17v-7" stroke="#FF4D00" strokeWidth="1.4" strokeLinecap="round" /></svg> },
  analytics: { label: 'Analytics', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 16l4-5 3 3 4-6" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  'project-settings': { label: 'Project Settings', icon: <svg width="24" height="24" viewBox="0 0 26 23.3333" fill="none"><path d={projSettingsIconPaths.p1d843180} stroke="#FF4D00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d={projSettingsIconPaths.p2ee9cd80} stroke="#FF4D00" strokeWidth="2" /></svg> },
  'template-libraries': { label: 'Template Libraries', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,77,0,0.15)" stroke="#FF4D00" strokeWidth="1.5" /><path d="M3 9h18M9 21V9" stroke="#FF4D00" strokeWidth="1.5" /></svg> },
};

// Shared sidebar header layout (used for both project-setting and other apps)
function SidebarHeader({
  expanded,
  onToggle,
  icon,
  label,
  titleAttr,
  breadcrumb,
}: {
  expanded: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  label: string;
  titleAttr: string;
  /** When provided, renders "backLabel › label" breadcrumb in expanded mode */
  breadcrumb?: { backLabel: string; onBack: () => void };
}) {
  if (expanded) {
    return (
      <div
        className="flex items-center shrink-0 cursor-pointer hover:bg-[#2d4255] transition-colors bg-[#384857]"
        onClick={onToggle}
        title={titleAttr}
        style={{ height: 56, padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 12 }}
      >
        <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {breadcrumb ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <button
              onClick={e => { e.stopPropagation(); breadcrumb.onBack(); }}
              style={{
                background: 'none', border: 'none', padding: '2px 4px',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                lineHeight: '24px', color: 'rgba(255,255,255,0.55)',
                cursor: 'pointer', borderRadius: 4,
                transition: 'color 0.15s, background-color 0.15s',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {breadcrumb.backLabel}
            </button>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 400, flexShrink: 0, lineHeight: '24px' }}>›</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '24px', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {label}
            </span>
          </div>
        ) : (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: 0, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
            {label}
          </span>
        )}
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#2d4255] transition-colors bg-[#384857]"
      onClick={onToggle}
      title={titleAttr}
      style={{ width: 56, height: 56, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
    </div>
  );
}

// ─── Sidebar Navigation ───────────────────────────────────────────────────────
interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
  currentView: string;
}

function Sidebar({ expanded, onToggle, activeNav, onNavChange, currentView }: SidebarProps) {

  // ── Project Settings → full sidebar with 9 nav items ──
  if (currentView === 'project-settings') {
    return (
      <FullNavSidebar
        expanded={expanded} onToggle={onToggle}
        headerIcon={ProjSettingsHeaderIcon} headerLabel="Project Settings"
        navItems={PROJECT_SETTINGS_NAV} activeNav={activeNav} onNavChange={onNavChange}
      />
    );
  }

  // ── Template Libraries → full sidebar with 4 nav items ──
  if (currentView === 'template-libraries') {
    return (
      <FullNavSidebar
        expanded={expanded} onToggle={onToggle}
        headerIcon={TemplateLibHeaderIcon} headerLabel="Template Libraries"
        navItems={TEMPLATE_LIBRARIES_NAV} activeNav={activeNav} onNavChange={onNavChange}
      />
    );
  }

  // ── Inspections (Inspection Tool) → sidebar with List + Schedule + Settings ──
  if (currentView === 'inspections') {
    const isSettings = activeNav.startsWith('insp-settings-');
    return (
      <FullNavSidebar
        expanded={expanded} onToggle={onToggle}
        headerIcon={isSettings ? InspectionSettingsHeaderIcon : InspectionToolHeaderIcon}
        headerLabel={isSettings ? 'Settings' : 'Inspections'}
        headerBreadcrumb={isSettings ? {
          backLabel: 'Inspection',
          onBack: () => onNavChange('inspection-list'),
        } : undefined}
        navItems={isSettings ? INSPECTION_SETTINGS_NAV : INSPECTION_TOOL_NAV}
        activeNav={activeNav}
        onNavChange={onNavChange}
        onSettings={isSettings ? undefined : () => onNavChange('insp-settings-refdata')}
      />
    );
  }

  // ── All other apps → minimal sidebar (header only) ──
  const appConfig = SIDEBAR_APP_CONFIG[currentView];
  if (!appConfig) return null;
  return (
    <div className="relative flex-shrink-0 h-full" style={{ width: expanded ? 280 : 56 }}>
      <div className="bg-[#243746] h-full flex flex-col" style={{ width: expanded ? 280 : 56 }}>
        <SidebarHeader
          expanded={expanded} onToggle={onToggle}
          icon={appConfig.icon} label={appConfig.label}
          titleAttr={expanded ? 'Collapse sidebar' : `Expand sidebar — ${appConfig.label}`}
        />
        {/* Nothing below — reserved for future work on this module */}
      </div>
    </div>
  );
}

// ─── Empty Module Canvas ─────────────────────────────────────────────────────
function EmptyCanvas({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
      {/* Section subheader — DisplayMedium · 72px · 24px edge gap */}
      <div
        className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
        style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
      >
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>{title}</h1>
      </div>
      {/* Empty body */}
      <div className="flex-1 flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-[12px]" style={{ opacity: 0.3 }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#243746" strokeWidth="1.5" />
            <path d="M3 9H21" stroke="#243746" strokeWidth="1.5" />
            <path d="M9 21V9" stroke="#243746" strokeWidth="1.5" />
          </svg>
          <span className="text-[#243746] text-[14px]">No data yet — more details coming soon</span>
        </div>
      </div>
    </div>
  );
}

// ─── All module view titles (project-setting sub-pages + app-launcher modules) ─
const MODULE_TITLES: Record<string, string> = {
  // Project Settings sub-pages
  'general':           'Information',
  'project-members':   'Members',
  'teams':             'Teams',
  'locations':         'Location Breakdown Structure',
  'reference-data':    'Reference Data',
  'work-packages':     'Classification Crosswalk',
  'notifications':     'Notifications',
  'workflows':         'Workflows',
  'roles':             'Roles',
  'role-access-level': 'Role Permission',
  // Template Libraries sub-pages
  'inspection-templates':  'Inspection Templates',
  'checklist-templates':   'Checklist Templates',
  'observation-templates': 'Observation Templates',
  'report-templates':      'Report Templates',
  // Inspection Tool sub-pages
  'inspection-list':            'List',
  'inspection-schedule':        'Schedule',
  // Inspection Settings sub-pages
  'insp-settings-refdata':      'Reference Data',
  'insp-settings-workflow':     'Workflow',
  'insp-settings-governance':   'Data Governance',
  'insp-settings-automation':   'Automation',
  'insp-settings-integrations': 'Integrations',
  // App-launcher modules
  home:                 'Home',
  files:                'Files',
  specifications:       'Specifications',
  drawings:             'Drawings',
  models:               'Models',
  'daily-logs':         'Daily Logs',
  inspections:          'Inspections',
  observations:         'Observations',
  issues:               'Issues',
  checklists:           'Checklists',
  safety:               'Safety',
  rfis:                 'RFIs',
  submittals:           'Submittals',
  meetings:             'Meetings',
  reports:              'Reports',
  analytics:            'Analytics',
  'project-settings':   'Project Settings',
  'template-libraries': 'Template Libraries',
  'project-connectors': 'Project Connectors',
  'connectors':         'Connectors',
};

function MainContent({
  activeNav,
  currentView,
  extraUsers,
  onAddUser,
  onOpenProject,
}: {
  activeNav: string;
  currentView: string;
  extraUsers: DirectoryUser[];
  onAddUser: () => void;
  onOpenProject: (projectId: string) => void;
}) {
  // ── User Account Landing Page ──
  if (currentView === 'user-account-landing') {
    return <UserAccountLandingPage onOpenProject={onOpenProject} />;
  }

  // ── Project Settings → Project Members = Users table ──
  if (currentView === 'project-settings' && activeNav === 'project-members') {
    const mappedExtras = extraUsers.map((du, i) => ({
      id: 10000 + i,
      name: du.name,
      email: du.email,
      jobTitle: du.jobTitle,
      company: du.company,
      office: du.office,
      accessLevel: 'Viewer',
      permissionType: 'Read-Only',
      userType: 'Project Member',
      teams: [] as { initials: string; bg: string; text: string }[],
      status: 'Pending Invitation' as const,
    }));

    return (
      <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <UsersTable extraUsers={mappedExtras} onAddUser={onAddUser} />
      </div>
    );
  }

  // ── Project Settings / Template Libraries → any other sub-page ──
  if (currentView === 'project-settings' || currentView === 'template-libraries') {
    // ── General Information sub-page ──
    if (currentView === 'project-settings' && activeNav === 'general') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
          {/* Section Header */}
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Information
            </h1>
          </div>
          {/* Page content */}
          <GeneralInformationPage />
        </div>
      );
    }

    // ── Roles sub-page ──
    if (currentView === 'project-settings' && activeNav === 'roles') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Roles
            </h1>
          </div>
          <div className="flex-1 flex min-h-0 p-[12px]">
            <RolesTable />
          </div>
        </div>
      );
    }
    // ── Discipline & Trade sub-page ──
    if (currentView === 'project-settings' && activeNav === 'discipline-trade') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Discipline &amp; Trade
            </h1>
          </div>
          <div className="flex-1 flex min-h-0 p-[12px]">
            <DisciplineTable />
          </div>
        </div>
      );
    }

    // ── Reference Data sub-page ──
    if (currentView === 'project-settings' && activeNav === 'reference-data') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0" style={{ background: '#FFFFFF' }}>
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Reference Data
            </h1>
          </div>
          <div className="flex-1 flex min-h-0 min-w-0" style={{ padding: '0 12px 12px 12px', overflow: 'hidden' }}>
            <ReferenceDataTable />
          </div>
        </div>
      );
    }

    // ── Location Breakdown Structure sub-page ──
    if (currentView === 'project-settings' && activeNav === 'locations') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0" style={{ background: '#FFFFFF' }}>
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Location Breakdown Structure
            </h1>
          </div>
          <div className="flex-1 flex min-h-0" style={{ padding: '0 12px 12px 12px' }}>
            <LocationBreakdownStructure />
          </div>
        </div>
      );
    }

    // ── Teams sub-page ──
    if (currentView === 'project-settings' && activeNav === 'teams') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Teams
            </h1>
          </div>
          <div className="flex-1 flex min-h-0">
            <TeamsTable />
          </div>
        </div>
      );
    }

    // ── Role Access Level sub-page ──
    if (currentView === 'project-settings' && activeNav === 'role-access-level') {
      return (
        <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
          <RoleAccessLevel />
        </div>
      );
    }

    // ── Classification Crosswalk sub-page ──
    if (currentView === 'project-settings' && activeNav === 'work-packages') {
      return (
        <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
          <ClassificationCrosswalk />
        </div>
      );
    }

    return <EmptyCanvas title={MODULE_TITLES[activeNav] ?? activeNav} />;
  }

  // ── Inspections module sub-pages ──
  if (currentView === 'inspections') {
    // List
    if (activeNav === 'inspection-list') {
      return (
        <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
          <InspectionsList />
        </div>
      );
    }

    // Inspection Settings → Reference Data
    if (activeNav === 'insp-settings-refdata') {
      return (
        <div className="flex-1 flex flex-col min-h-0 min-w-0" style={{ background: '#FFFFFF' }}>
          <div
            className="bg-white shrink-0 flex items-center border-b border-[#d9d9d9]"
            style={{ height: 72, paddingLeft: 24, paddingRight: 24 }}
          >
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
              Reference Data
            </h1>
          </div>
          <div className="flex-1 flex min-h-0 min-w-0" style={{ padding: '0 12px 12px 12px', overflow: 'hidden' }}>
            <ReferenceDataTable
              initialTabs={INSPECTION_REF_DATA_TABS}
              initialExpanded={INSPECTION_REF_DATA_EXPANDED}
            />
          </div>
        </div>
      );
    }

    const title = MODULE_TITLES[activeNav] ?? MODULE_TITLES[currentView] ?? 'Inspections';
    return <EmptyCanvas title={title} />;
  }

  // ── Elevation Input Showcase ──
  if (currentView === 'specifications') {
    return (
      <div className="flex-1 flex min-h-0 min-w-0 flex-col overflow-hidden">
        <ElevationInputShowcase />
      </div>
    );
  }

  // ── Files module ──
  if (currentView === 'files') {
    return (
      <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <FilesTable />
      </div>
    );
  }

  // ── Project Home ──
  if (currentView === 'home') {
    return (
      <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <ProjectHomePage />
      </div>
    );
  }

  // ── Any other app-launcher module ──
  return <EmptyCanvas title={MODULE_TITLES[currentView] ?? currentView} />;
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn]           = useState(true);
  const [showSignUp, setShowSignUp]           = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showDevModal, setShowDevModal]           = useState(false);
  const [showRegisterCompany, setShowRegisterCompany] = useState(false);
  const [lockedOfficeName, setLockedOfficeName]   = useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav]             = useState('reference-data');
  const [currentView, setCurrentView]         = useState('project-settings');
  const [modalOpen, setModalOpen]             = useState(false);
  const [addedUsers, setAddedUsers]           = useState<DirectoryUser[]>([]);

  const handleAddToProject = (newUsers: DirectoryUser[]) => {
    setAddedUsers(prev => {
      const existingIds = new Set(prev.map(u => u.id));
      return [...prev, ...newUsers.filter(u => !existingIds.has(u.id))];
    });
  };

  const projectUserEmails = useMemo(() => {
    const s = new Set(BASE_USER_EMAILS);
    addedUsers.forEach(u => s.add(u.email));
    return s;
  }, [addedUsers]);

  // Module selector navigation (unused – routing via TopNav onSelectModule)
  const handleModuleSelect = (id: string) => { setCurrentView(id); };

  return (
    <ToastProvider>
      {!isLoggedIn && (
        <LoginPage
          onLogin={() => { setIsLoggedIn(true); setCurrentView('user-account-landing'); }}
          onSignUp={() => setShowSignUp(true)}
          onLogoClick={() => { setIsLoggedIn(true); setCurrentView('user-account-landing'); }}
        />
      )}
      {!isLoggedIn && showSignUp && (
        <SignUpEmailPage
          onBack={() => setShowSignUp(false)}
          onCreateAccount={() => setShowDevModal(true)}
        />
      )}
      {/* "For Inertia Developers Only" gate modal */}
      {showDevModal && (
        <DevModal
          onClose={() => setShowDevModal(false)}
          onYes={() => { setShowDevModal(false); setShowCreateAccount(true); }}
          onNo={() => { setShowDevModal(false); setShowRegisterCompany(true); }}
        />
      )}
      {/* Register Company — "No" path */}
      {!isLoggedIn && showRegisterCompany && (
        <RegisterCompanyPage
          onBack={() => setShowRegisterCompany(false)}
          onNext={(officeName) => { setLockedOfficeName(officeName); setShowRegisterCompany(false); setShowCreateAccount(true); }}
          onLogoClick={() => {
            setShowRegisterCompany(false); setShowSignUp(false);
            setIsLoggedIn(true); setCurrentView('user-account-landing');
          }}
        />
      )}
      {!isLoggedIn && showCreateAccount && (
        <CreateAccountPage
          onBack={() => setShowCreateAccount(false)}
          lockedOfficeName={lockedOfficeName ?? undefined}
          onLogoClick={() => {
            setShowCreateAccount(false); setShowSignUp(false); setShowRegisterCompany(false);
            setIsLoggedIn(true); setCurrentView('user-account-landing');
          }}
          onSuccess={() => {
            setShowCreateAccount(false);
            setShowSignUp(false);
            setIsLoggedIn(true);
            setCurrentView('user-account-landing');
          }}
        />
      )}
      {isLoggedIn && (
      <div className="flex flex-col h-screen bg-[#f5f5f5] overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          sidebarExpanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded(!sidebarExpanded)}
          onNavigateHome={() => { setCurrentView('user-account-landing'); }}
          onNavigateToProject={() => { setCurrentView('home'); }}
          isLandingPage={currentView === 'user-account-landing'}
          onSelectModule={(id) => {
            setCurrentView(id);
            if (id === 'project-settings') setActiveNav('reference-data');
            if (id === 'template-libraries') setActiveNav('inspection-templates');
            if (id === 'inspections') setActiveNav('inspection-list');
          }}
          onSignOut={() => setIsLoggedIn(false)}
        />

        {/* Main Body */}
        <div className="flex flex-1 min-h-0 bg-[#f2f3f4] relative">
          {/* Sidebar — hidden for User Account Landing, Home, Project Connectors, and Files */}
          {currentView !== 'user-account-landing' && currentView !== 'home' && currentView !== 'connectors' && currentView !== 'files' && (
            <Sidebar
              expanded={sidebarExpanded}
              onToggle={() => setSidebarExpanded(!sidebarExpanded)}
              activeNav={activeNav}
              currentView={currentView}
              onNavChange={(nav) => setActiveNav(nav)}
            />
          )}

          {/* Main Content */}
          <MainContent
            activeNav={activeNav}
            currentView={currentView}
            extraUsers={addedUsers}
            onAddUser={() => setModalOpen(true)}
            onOpenProject={(projectId) => {
              // Clicking a project card navigates to the Project Home page
              setCurrentView('home');
            }}
          />
        </div>

        {/* Add User Modal */}
        <AddUserModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddToProject={handleAddToProject}
          projectUserEmails={projectUserEmails}
        />
      </div>
      )}
    </ToastProvider>
  );
}