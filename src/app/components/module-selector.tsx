import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import svgPaths from '../../imports/svg-4n56u6vlml';
import Component24PxAppDrawings from '../../imports/24PxAppDrawings';
import Component24PxAppDailyReport from '../../imports/24PxAppDailyReport-2042-3308';

// ─── Waffle / Apps grid icon ──────────────────────────────────────────────────
export function AppsGridIcon({ size = 22, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p2d448e00} fill={color} />
    </svg>
  );
}

// ─── Inline app icons ─────────────────────────────────────────────────────────
function IcoHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11.5L12 4l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V11.5z"
        fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 22v-7h6v7" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IcoFiles() {
  return (
    <svg width="22" height="22" viewBox="0 0 18 17.75" fill="none">
      <path clipRule="evenodd" fillRule="evenodd" d="M12.3752 1.5H5.62518V0H12.3752V1.5Z" fill="white" />
      <path clipRule="evenodd" fillRule="evenodd" d="M16.5 7.10714H1.5V16.25H16.5V7.10714ZM0 5.60714V17.75H18V5.60714H0Z" fill="white" />
      <path clipRule="evenodd" fillRule="evenodd" d="M15.75 4.41427H2.25V2.91427H15.75V4.41427Z" fill="white" />
      <path clipRule="evenodd" fillRule="evenodd" d="M4.875 12.8929V10.4643H6.375V12.1429H11.625V10.4643H13.125V12.8929C13.125 13.3071 12.7892 13.6429 12.375 13.6429H5.625C5.21079 13.6429 4.875 13.3071 4.875 12.8929Z" fill="white" />
    </svg>
  );
}
function IcoSpecifications() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IcoDrawings() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M7 17l3-5 3 3 2-3.5 2 5.5"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoModels() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 4.5v9L12 21 3 16.5v-9L12 3z"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 3v18M3 7.5l9 4.5 9-4.5"
        stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function IcoDailyLogs() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M3 9h18" stroke="white" strokeWidth="1.5" />
      <path d="M8 4V2M16 4V2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14h4M7 17h6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IcoInspections() {
  return (
    <svg width="22" height="22" viewBox="0 0 18.8205 21.5" fill="none">
      <path d="M15.4724 17.25L18.0705 15.75V5.75L9.41025 0.75L0.75 5.75V15.75L9.41025 20.75L12.0849 19.2058" stroke="white" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12.542 14.7207C12.3187 14.3718 11.8548 14.27 11.506 14.4933C11.1571 14.7166 11.0553 15.1804 11.2786 15.5293L11.9103 15.125L12.542 14.7207ZM13.2786 18.6543L13.6828 19.286L14.9462 18.4774L14.542 17.8457L13.9103 18.25L13.2786 18.6543ZM11.9103 15.125L11.2786 15.5293L13.2786 18.6543L13.9103 18.25L14.542 17.8457L12.542 14.7207L11.9103 15.125Z" fill="white" />
      <path d="M14.4002 11.0663C14.332 12.1423 13.9178 13.1675 13.2194 13.9889C12.5209 14.8103 11.5757 15.384 10.5246 15.6243C9.47349 15.8646 8.37288 15.7587 7.3869 15.3223C6.40091 14.886 5.58238 14.1427 5.05339 13.2031C4.52439 12.2636 4.31327 11.1783 4.45151 10.109C4.58975 9.03965 5.06994 8.04367 5.82047 7.26957C6.57101 6.49546 7.55166 5.98471 8.61619 5.81348C9.68072 5.64225 10.7721 5.81972 11.7275 6.31942" stroke="white" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.41025 9.75L9.41025 12.25L14.4103 7.625" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}
function IcoObservations() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="5.5"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.5" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}
function IcoIssues() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L21.5 19.5H2.5L12 3z"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="white" />
    </svg>
  );
}
function IcoChecklists() {
  return (
    <svg width="22" height="22" viewBox="0 0 18.6039 18.2538" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.55946 1.00751L1.88772 6.16037L0 3.59779L1.2077 2.70814L2.00797 3.79451L5.44819 0L6.55946 1.00751Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.55946 7.27064L1.88772 12.4235L0 9.86091L1.2077 8.97127L2.00797 10.0576L5.44819 6.26313L6.55946 7.27064Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.6039 3.93795H7.80392V2.43795L18.6039 2.43795V3.93795ZM18.6039 10.2011H7.80392V8.70111H18.6039V10.2011ZM18.6039 16.4643H7.80392V14.9643H18.6039V16.4643Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.753995 13.9248C0.753995 13.5106 1.08978 13.1748 1.50399 13.1748H5.10398C5.51819 13.1748 5.85398 13.5106 5.85398 13.9248V17.5038C5.85398 17.918 5.51819 18.2538 5.10398 18.2538H1.50399C1.08978 18.2538 0.753995 17.918 0.753995 17.5038V13.9248ZM2.25399 14.6748V16.7538H4.35398V14.6748H2.25399Z" fill="white" />
    </svg>
  );
}
function IcoSafety() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 6.5v5.5c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L12 3z"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoRFIs() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="white" />
    </svg>
  );
}
function IcoSubmittals() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M12 8v8M8.5 13.5L12 17l3.5-3.5"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoMeetings() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="14" height="11" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M16 10l5-3v10l-5-3V10z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IcoReports() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3v6h6" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 17v-3M12 17v-5M16 17v-7"
        stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IcoAnalytics() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 3v18h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 16l4-5 3 3 4-6"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoProjSettings() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21 5H18M13.75 3V7M13 5H3M7 12H3M10.75 10V14M21 12H11M21 19H18M13.75 17V21M13 19H3"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoTemplates() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2"
        fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.6" />
      <path d="M3 9h18M9 21V9" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}
function IcoConnectors() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="5"  cy="12" r="2.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
      <circle cx="19" cy="6"  r="2.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
      <circle cx="19" cy="18" r="2.5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
      <path d="M7.5 11L16.5 7M7.5 13L16.5 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export { IcoFiles, IcoSpecifications, IcoDrawings, IcoModels, IcoDailyLogs,
  IcoInspections, IcoObservations, IcoIssues, IcoChecklists, IcoSafety,
  IcoRFIs, IcoSubmittals, IcoMeetings, IcoReports, IcoAnalytics,
  IcoProjSettings, IcoTemplates, IcoConnectors };

// ─── App definitions ──────────────────────────────────────────────────────────
interface AppDef {
  id: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

interface AppGroup {
  label: string;
  apps: AppDef[];
}

const APP_GROUPS: AppGroup[] = [
  {
    label: 'Home',
    apps: [
      { id: 'home',  label: 'Home',  color: '#FF4D00', icon: <IcoHome /> },
      { id: 'files', label: 'Files', color: '#1A73E8', icon: (
        <svg width="22" height="22" viewBox="0 0 18 17.75" fill="none">
          <path clipRule="evenodd" fillRule="evenodd" d="M12.3752 1.5H5.62518V0H12.3752V1.5Z" fill="white" />
          <path clipRule="evenodd" fillRule="evenodd" d="M16.5 7.10714H1.5V16.25H16.5V7.10714ZM0 5.60714V17.75H18V5.60714H0Z" fill="white" />
          <path clipRule="evenodd" fillRule="evenodd" d="M15.75 4.41427H2.25V2.91427H15.75V4.41427Z" fill="white" />
          <path clipRule="evenodd" fillRule="evenodd" d="M4.875 12.8929V10.4643H6.375V12.1429H11.625V10.4643H13.125V12.8929C13.125 13.3071 12.7892 13.6429 12.375 13.6429H5.625C5.21079 13.6429 4.875 13.3071 4.875 12.8929Z" fill="white" />
        </svg>
      ) },
    ],
  },
  {
    label: 'Project',
    apps: [
      { id: 'specifications', label: 'Specifications', color: '#34A853', icon: <IcoSpecifications /> },
      { id: 'drawings',       label: 'Drawings',       color: '#EA4335', icon: <Component24PxAppDrawings /> },
      { id: 'models',         label: 'Models',         color: '#9C27B0', icon: <IcoModels /> },
    ],
  },
  {
    label: 'Field',
    apps: [
      { id: 'daily-logs',   label: 'Daily Logs',   color: '#FB8C00', icon: <IcoDailyLogs /> },
      { id: 'inspections',  label: 'Inspections',  color: '#00897B', icon: <IcoInspections /> },
      { id: 'observations', label: 'Observations', color: '#5C6BC0', icon: <IcoObservations /> },
    ],
  },
  {
    label: 'Quality & Safety',
    apps: [
      { id: 'issues',     label: 'Issues',     color: '#C62828', icon: <IcoIssues /> },
      { id: 'checklists', label: 'Checklists', color: '#2E7D32', icon: <IcoChecklists /> },
      { id: 'safety',     label: 'Safety',     color: '#E64A19', icon: <IcoSafety /> },
    ],
  },
  {
    label: 'Coordination',
    apps: [
      { id: 'rfis',       label: 'RFIs',       color: '#283593', icon: <IcoRFIs /> },
      { id: 'submittals', label: 'Submittals', color: '#00695C', icon: <IcoSubmittals /> },
      { id: 'meetings',   label: 'Meetings',   color: '#6A1B9A', icon: <IcoMeetings /> },
    ],
  },
  {
    label: 'Reporting',
    apps: [
      { id: 'reports', label: 'Daily Log', color: '#455A64', icon: <Component24PxAppDailyReport /> },
      { id: 'analytics', label: 'Analytics', color: '#00838F', icon: <IcoAnalytics /> },
    ],
  },
  {
    label: 'Settings',
    apps: [
      { id: 'project-settings',   label: 'Project Settings',  color: '#546E7A', icon: <IcoProjSettings /> },
      { id: 'template-libraries', label: 'Template Libraries', color: '#33691E', icon: <IcoTemplates /> },
      { id: 'connectors',         label: 'Connectors',         color: '#FF9800', icon: <IcoConnectors /> },
    ],
  },
];

// ─── Toggle Switch (Chrome extension style) ───────────────────────────────────
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 40,
        height: 22,
        borderRadius: 11,
        backgroundColor: checked ? '#0E70CB' : '#D0D5DD',
        border: 'none',
        cursor: 'pointer',
        padding: 2,
        transition: 'background-color 0.2s',
        outline: 'none',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s',
          transform: checked ? 'translateX(18px)' : 'translateX(0px)',
          display: 'block',
        }}
      />
    </button>
  );
}

// ─── Custom Checkbox ──────────────────────────────────────────────────────────
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 13,
        fontWeight: 400,
        color: '#344054',
      }}
    >
      <span
        onClick={() => onChange(!checked)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: `2px solid ${checked ? '#0E70CB' : '#D0D5DD'}`,
          backgroundColor: checked ? '#0E70CB' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

// ─── More Apps Modal ──────────────────────────────────────────────────────────
interface MoreAppsModalProps {
  hiddenApps: Set<string>;
  onToggleApp: (id: string) => void;
  showHeaders: boolean;
  onToggleHeaders: (v: boolean) => void;
  onClose: () => void;
}

function MoreAppsModal({ hiddenApps, onToggleApp, showHeaders, onToggleHeaders, onClose }: MoreAppsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // All apps flattened with their group label
  const allApps = APP_GROUPS.flatMap(g => g.apps.map(a => ({ ...a, group: g.label })));

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.35)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          width: 560,
          maxHeight: '80vh',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid #E0E4E8',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#101828',
              lineHeight: '24px',
            }}>
              Manage Apps
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 400,
              color: '#667085',
              marginTop: 2,
            }}>
              Toggle apps on or off to customize your launcher menu.
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667085',
              flexShrink: 0,
              marginTop: -2,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Display Options ── */}
        <div style={{
          padding: '14px 24px',
          borderBottom: '1px solid #E0E4E8',
          backgroundColor: '#FAFAFA',
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: '#667085',
            marginBottom: 10,
          }}>
            Display Options
          </div>
          <Checkbox
            checked={showHeaders}
            onChange={onToggleHeaders}
            label="Show section headers in launcher menu"
          />
        </div>

        {/* ── App List ── */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {APP_GROUPS.map((group, gi) => (
            <div key={group.label}>
              {/* Group header */}
              <div style={{
                padding: '12px 24px 6px',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: '#667085',
                backgroundColor: gi > 0 ? '#FAFAFA' : '#FAFAFA',
                borderTop: gi > 0 ? '1px solid #E0E4E8' : 'none',
              }}>
                {group.label}
              </div>
              {/* App rows */}
              {group.apps.map(app => {
                const isVisible = !hiddenApps.has(app.id);
                return (
                  <div
                    key={app.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 24px',
                      gap: 14,
                      backgroundColor: 'white',
                      borderBottom: '1px solid #F2F3F4',
                    }}
                  >
                    {/* Colored icon tile (smaller, 36px) */}
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      backgroundColor: isVisible ? app.color : '#C4C9CE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background-color 0.2s',
                      opacity: isVisible ? 1 : 0.6,
                    }}>
                      {app.icon}
                    </div>

                    {/* App name + group */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: 14,
                        fontWeight: isVisible ? 500 : 400,
                        color: isVisible ? '#1D2C38' : '#8A9098',
                        transition: 'color 0.2s',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {app.label}
                      </div>
                      <div style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: 11,
                        fontWeight: 400,
                        color: '#9CA4AE',
                        marginTop: 1,
                      }}>
                        {group.label}
                      </div>
                    </div>

                    {/* Status label */}
                    <span style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: 11,
                      fontWeight: 500,
                      color: isVisible ? '#027A48' : '#8A9098',
                      minWidth: 34,
                      textAlign: 'right',
                      transition: 'color 0.2s',
                    }}>
                      {isVisible ? 'On' : 'Off'}
                    </span>

                    {/* Toggle */}
                    <ToggleSwitch
                      checked={isVisible}
                      onChange={() => onToggleApp(app.id)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #E0E4E8',
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              height: 36,
              padding: '0 20px',
              borderRadius: 4,
              border: '1px solid #C3C7CC',
              backgroundColor: '#F2F3F4',
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: '22px',
              fontWeight: 400,
              color: '#616D79',
              cursor: 'pointer',
              transition: 'background-color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Single app tile ──────────────────────────────────────────────────────────
function AppTile({ app, onSelect }: { app: AppDef; onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onSelect(app.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={app.label}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        padding: '12px 6px 10px',
        borderRadius: 12,
        backgroundColor: hovered ? '#F1F3F4' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        outline: 'none',
        width: '100%',
      }}
    >
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: app.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered ? `0 4px 14px ${app.color}60` : `0 2px 6px ${app.color}40`,
        transition: 'box-shadow 0.15s',
        flexShrink: 0,
      }}>
        {app.icon}
      </div>
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 11,
        fontWeight: 500,
        color: '#202124',
        lineHeight: '15px',
        textAlign: 'center',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        wordBreak: 'break-word',
        width: '100%',
      }}>
        {app.label}
      </span>
    </button>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
interface ModuleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (id: string) => void;
  anchorTop?: number;
  anchorRight?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ModuleSelector({
  isOpen,
  onClose,
  onSelectModule,
  anchorTop = 60,
  anchorRight = 12,
  triggerRef,
}: ModuleSelectorProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ── Preferences state (persist across open/close) ──
  const [hiddenApps, setHiddenApps] = useState<Set<string>>(new Set([
    'daily-logs', 'observations',
    'issues', 'safety', 'rfis', 'submittals', 'meetings',
  ]));
  const [showHeaders, setShowHeaders] = useState(false);
  const [moreAppsOpen, setMoreAppsOpen] = useState(false);

  // Ref that mirrors moreAppsOpen so the mousedown handler always
  // sees the latest value without re-registering the listener.
  const moreAppsOpenRef = useRef(false);
  useEffect(() => {
    moreAppsOpenRef.current = moreAppsOpen;
  }, [moreAppsOpen]);

  const toggleApp = (id: string) => {
    setHiddenApps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Close panel on outside click (exclude trigger button)
  useEffect(() => {
    if (!isOpen) return;
    function handler(e: MouseEvent) {
      // ⛔ Never close the launcher while the More Apps modal is open.
      // The modal is portalled to document.body so it lives outside panelRef,
      // and any click inside it would otherwise look like an "outside" click.
      if (moreAppsOpenRef.current) return;

      const target = e.target as Node;
      const clickedInsidePanel = panelRef.current?.contains(target);
      const clickedTrigger = triggerRef?.current?.contains(target);
      if (!clickedInsidePanel && !clickedTrigger) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler, true);
    return () => document.removeEventListener('mousedown', handler, true);
  }, [isOpen, onClose, triggerRef]);

  // Close on Escape (but not if More Apps modal is open)
  useEffect(() => {
    if (!isOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape' && !moreAppsOpen) onClose();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose, moreAppsOpen]);

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    onSelectModule(id);
    onClose();
  };

  // Filter groups to only visible apps
  const visibleGroups = APP_GROUPS.map(g => ({
    ...g,
    apps: g.apps.filter(a => !hiddenApps.has(a.id)),
  })).filter(g => g.apps.length > 0);

  // Separate Settings group from the rest
  const nonSettingsGroups = visibleGroups.filter(g => g.label !== 'Settings');
  const settingsGroup = visibleGroups.find(g => g.label === 'Settings');

  // All visible non-settings apps flattened (for no-headers mode)
  const allVisibleApps = nonSettingsGroups.flatMap(g => g.apps);

  // Shared header style for the always-visible Settings label
  const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    color: '#80868B',
    padding: '6px 12px 2px',
    userSelect: 'none',
  };

  return (
    <>
      {createPortal(
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: anchorTop,
            right: anchorRight,
            width: 360,
            maxHeight: 'calc(100vh - 72px)',
            zIndex: 9999,
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(32,33,36,0.28), 0 1px 3px rgba(32,33,36,0.16)',
            border: '1px solid #E0E0E0',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Body ── */}
          <div style={{ padding: '8px 8px 4px' }}>
            {showHeaders ? (
              // ── Grouped view (with section headers) ──
              nonSettingsGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && (
                    <div style={{ height: 1, backgroundColor: '#E8EAED', margin: '4px 8px 8px' }} />
                  )}
                  {group.label !== 'Home' && (
                    <div style={sectionHeaderStyle}>{group.label}</div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 12, rowGap: 0 }}>
                    {group.apps.map(app => (
                      <AppTile key={app.id} app={app} onSelect={handleSelect} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // ── Flat view (no headers, Google Workspace style) ──
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 12, rowGap: 0 }}>
                {allVisibleApps.map(app => (
                  <AppTile key={app.id} app={app} onSelect={handleSelect} />
                ))}
              </div>
            )}

            {/* ── Settings group — always shown with its header ── */}
            {settingsGroup && settingsGroup.apps.length > 0 && (
              <div>
                <div style={{ height: 1, backgroundColor: '#E8EAED', margin: '4px 8px 8px' }} />
                <div style={sectionHeaderStyle}>Settings</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 12, rowGap: 0 }}>
                  {settingsGroup.apps.map(app => (
                    <AppTile key={app.id} app={app} onSelect={handleSelect} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── More apps pill button ── */}
          <div style={{
            padding: '8px 16px 14px',
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid #E8EAED',
            marginTop: 4,
          }}>
            <button
              onClick={() => setMoreAppsOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                height: 28,
                padding: '0 14px',
                borderRadius: 14,
                border: '1px solid #D0D5DD',
                backgroundColor: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: '#3B4A56',
                cursor: 'pointer',
                transition: 'all 0.15s',
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
                e.currentTarget.style.borderColor = '#B0B8C4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#D0D5DD';
              }}
            >
              {/* Grid icon */}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="#3B4A56" />
                <rect x="8.5" y="1" width="4.5" height="4.5" rx="1" fill="#3B4A56" />
                <rect x="1" y="8.5" width="4.5" height="4.5" rx="1" fill="#3B4A56" />
                <rect x="8.5" y="8.5" width="4.5" height="4.5" rx="1" fill="#3B4A56" />
              </svg>
              Manage Apps
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ── More Apps Modal ── */}
      {moreAppsOpen && (
        <MoreAppsModal
          hiddenApps={hiddenApps}
          onToggleApp={toggleApp}
          showHeaders={showHeaders}
          onToggleHeaders={setShowHeaders}
          onClose={() => setMoreAppsOpen(false)}
        />
      )}
    </>
  );
}