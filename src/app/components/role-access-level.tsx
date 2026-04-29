import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ROLES_DATA } from './roles-table';
import { TRADE_ITEMS } from './reference-data-table';
import { INITIAL_USERS } from './users-table';
import checkIconPaths from '../../imports/svg-1q1eitm85y';

// ─── Types ─────────────────────────────────────────────────────────────────────
type AccessLevel = 'none' | 'read-only' | 'review' | 'edit' | 'admin';
type RolePermissions = Record<string, AccessLevel>;
type AllPermissions  = Record<string, RolePermissions>;

// ─── Not-Applicable config ────────────────────────────────────────────────────
// Maps appId → set of AccessLevel IDs that are Not Applicable for that app.
// These cells cannot be selected and render a "—" dash instead of a radio.
// The first ACCESS_LEVELS entry NOT in the set is the minimum valid level.
const NOT_APPLICABLE_MAP: Record<string, Set<string>> = {
  home:     new Set(['none']),    // Home minimum is Read Only — None is Not Applicable for all roles
  settings: new Set(['review']),  // Settings — Review is Not Applicable
};

interface AccessLevelDef {
  id: AccessLevel;
  label: string;
  color: string;
  bg: string;
  dot: string;
}

interface AppDef {
  id: string;
  name: string;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCESS_LEVELS: AccessLevelDef[] = [
  { id: 'none',      label: 'None',      color: '#595959', bg: '#F5F5F5', dot: '#BFBFBF' },
  { id: 'read-only', label: 'Read Only', color: '#096DD9', bg: '#E6F7FF', dot: '#40A9FF' },
  { id: 'review',    label: 'Review',    color: '#531DAB', bg: '#F9F0FF', dot: '#9254DE' },
  { id: 'edit',      label: 'Edit',      color: '#237804', bg: '#F6FFED', dot: '#52C41A' },
  { id: 'admin',     label: 'Admin',     color: '#D4380D', bg: '#FFF2E8', dot: '#FF4D00' },
];

const APPS: AppDef[] = [
  { id: 'home',     name: 'Home'     },
  { id: 'files',    name: 'Files'    },
  { id: 'settings', name: 'Settings' },
];

// ─── App icons — same paths as App Launcher (IcoHome/IcoFiles/etc.), dark-on-light ──
function IcoHome({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 11.5L12 4l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V11.5z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 22v-7h6v7" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IcoFiles({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 17.75" fill="none" style={{ flexShrink: 0 }}>
      <path clipRule="evenodd" fillRule="evenodd" d="M12.3752 1.5H5.62518V0H12.3752V1.5Z" fill={color} />
      <path clipRule="evenodd" fillRule="evenodd" d="M16.5 7.10714H1.5V16.25H16.5V7.10714ZM0 5.60714V17.75H18V5.60714H0Z" fill={color} />
      <path clipRule="evenodd" fillRule="evenodd" d="M15.75 4.41427H2.25V2.91427H15.75V4.41427Z" fill={color} />
      <path clipRule="evenodd" fillRule="evenodd" d="M4.875 12.8929V10.4643H6.375V12.1429H11.625V10.4643H13.125V12.8929C13.125 13.3071 12.7892 13.6429 12.375 13.6429H5.625C5.21079 13.6429 4.875 13.3071 4.875 12.8929Z" fill={color} />
    </svg>
  );
}
function IcoInspections({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18.8205 21.5" fill="none" style={{ flexShrink: 0 }}>
      <path d="M15.4724 17.25L18.0705 15.75V5.75L9.41025 0.75L0.75 5.75V15.75L9.41025 20.75L12.0849 19.2058" stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M12.542 14.7207C12.3187 14.3718 11.8548 14.27 11.506 14.4933C11.1571 14.7166 11.0553 15.1804 11.2786 15.5293L11.9103 15.125L12.542 14.7207ZM13.2786 18.6543L13.6828 19.286L14.9462 18.4774L14.542 17.8457L13.9103 18.25L13.2786 18.6543ZM11.9103 15.125L11.2786 15.5293L13.2786 18.6543L13.9103 18.25L14.542 17.8457L12.542 14.7207L11.9103 15.125Z" fill={color} />
      <path d="M14.4002 11.0663C14.332 12.1423 13.9178 13.1675 13.2194 13.9889C12.5209 14.8103 11.5757 15.384 10.5246 15.6243C9.47349 15.8646 8.37288 15.7587 7.3869 15.3223C6.40091 14.886 5.58238 14.1427 5.05339 13.2031C4.52439 12.2636 4.31327 11.1783 4.45151 10.109C4.58975 9.03965 5.06994 8.04367 5.82047 7.26957C6.57101 6.49546 7.55166 5.98471 8.61619 5.81348C9.68072 5.64225 10.7721 5.81972 11.7275 6.31942" stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7.41025 9.75L9.41025 12.25L14.4103 7.625" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
function IcoChecklists({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18.6039 18.2538" fill="none" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.55946 1.00751L1.88772 6.16037L0 3.59779L1.2077 2.70814L2.00797 3.79451L5.44819 0L6.55946 1.00751Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.55946 7.27064L1.88772 12.4235L0 9.86091L1.2077 8.97127L2.00797 10.0576L5.44819 6.26313L6.55946 7.27064Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.6039 3.93795H7.80392V2.43795L18.6039 2.43795V3.93795ZM18.6039 10.2011H7.80392V8.70111H18.6039V10.2011ZM18.6039 16.4643H7.80392V14.9643H18.6039V16.4643Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.753995 13.9248C0.753995 13.5106 1.08978 13.1748 1.50399 13.1748H5.10398C5.51819 13.1748 5.85398 13.5106 5.85398 13.9248V17.5038C5.85398 17.918 5.51819 18.2538 5.10398 18.2538H1.50399C1.08978 18.2538 0.753995 17.918 0.753995 17.5038V13.9248ZM2.25399 14.6748V16.7538H4.35398V14.6748H2.25399Z" fill={color} />
    </svg>
  );
}
function IcoSettings({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M21 5H18M13.75 3V7M13 5H3M7 12H3M10.75 10V14M21 12H11M21 19H18M13.75 17V21M13 19H3"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const APP_ICON_MAP: Record<string, (color: string) => React.ReactNode> = {
  home:        c => <IcoHome color={c} />,
  files:       c => <IcoFiles color={c} />,
  inspections: c => <IcoInspections color={c} />,
  checklist:   c => <IcoChecklists color={c} />,
  settings:    c => <IcoSettings color={c} />,
};

// ─── Flatten roles from ROLES_DATA ────────────────────────────────────────────
// Build a flat list of { groupId, groupName, roleId, roleName } for easy rendering
interface FlatRole { groupId: string; groupName: string; roleId: string; roleName: string; trade: string | null; }

function buildFlatRoles(): FlatRole[] {
  const result: FlatRole[] = [];
  for (const group of ROLES_DATA) {
    for (const child of group.children) {
      result.push({ groupId: group.id, groupName: group.name, roleId: child.id, roleName: child.name, trade: child.trade });
    }
  }
  return result;
}

const FLAT_ROLES = buildFlatRoles();

function buildDefaultRolePermissions(): RolePermissions {
  const perms: RolePermissions = {};
  for (const app of APPS) {
    const naSet = NOT_APPLICABLE_MAP[app.id];
    perms[app.id] = (naSet?.has('none') ? 'read-only' : 'none') as AccessLevel;
  }
  return perms;
}

// Build initial permissions: all roles start as 'none' for all apps,
// except where 'none' is Not Applicable — those use the minimum valid level.
function buildInitialPermissions(): AllPermissions {
  const perms: AllPermissions = {};
  for (const role of FLAT_ROLES) {
    perms[role.roleId] = buildDefaultRolePermissions();
  }
  return perms;
}

// ─── Shared button helpers ─────────────────────────────────────────────────────
function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 16, paddingRight: 16, background: hov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0 }}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 16, paddingRight: 16, background: hov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', flexShrink: 0 }}
    >
      {children}
    </button>
  );
}

// ─── Not-Applicable cell ──────────────────────────────────────────────────────
// View mode: #F5F5F5 bg + #BFBFBF dash
// Edit mode: #FFEDE4 (Orange-1) bg + #FF9B6D dash
// Both modes: portal tooltip "Not Applicable" (tooltip-bg rgba(36,55,70,0.9))
function NaCell({ editMode, width }: { editMode: boolean; width: number }) {
  const [hov, setHov] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTipPos({ x: r.left + r.width / 2, y: r.top - 6 });
    setHov(true);
  };

  return (
    <>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width, flexShrink: 0, height: '100%',
          background: editMode ? '#FFEDE4' : '#F5F5F5',
          transition: 'background 0.15s',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          lineHeight: 1,
          color: editMode ? '#FF9B6D' : '#BFBFBF',
          userSelect: 'none',
        }}>—</span>
      </div>

      {hov && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          left: tipPos.x,
          top: tipPos.y,
          transform: 'translate(-50%, -100%)',
          background: 'rgba(36,55,70,0.9)',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12, fontWeight: 400, lineHeight: '16px',
          padding: '4px 8px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          zIndex: 9999,
          pointerEvents: 'none',
        }}>
          Not Applicable
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid rgba(36,55,70,0.9)',
          }} />
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Radio cell ────────────────────────────────────────────────────────────────

/** Figma Radio Button — exact SVG match from /src/imports/Selected|Default|Hover|Disabled.tsx
 *
 *  States:
 *  - default  → white plate, #D9D9D9 stroke, no dot
 *  - hover    → white plate, #616D79 stroke, no dot
 *  - selected → white plate, #616D79 stroke + #616D79 inner dot (r=4 on 16×16 viewBox)
 *  - disabled → #F5F5F5 plate, #BFBFBF stroke, no dot
 */
type RadioState = 'default' | 'hover' | 'selected' | 'disabled';

/** editColors: when true uses Primary orange range; when false uses navy #616D79 */
function RadioSVG({ state, editColors = false }: { state: RadioState; editColors?: boolean }) {
  const plateFill = state === 'disabled' ? '#F5F5F5' : 'white';
  const stroke    = state === 'default'  ? '#D9D9D9'
                  : state === 'disabled' ? '#BFBFBF'
                  : state === 'hover'
                    ? (editColors ? '#FF773E' : '#616D79')
                    : (editColors ? '#FF4D00' : '#616D79'); // selected
  const showDot   = state === 'selected';
  const dotColor  = editColors ? '#FF4D00' : '#616D79';

  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 16, height: 16 }}>
      <svg
        style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" fill={plateFill} r="7.5" stroke={stroke} />
        {showDot && <circle cx="8" cy="8" fill={dotColor} r="4" />}
      </svg>
    </div>
  );
}

function RadioCell({ selected, editMode, levelId, onChange, width }: {
  selected: boolean; editMode: boolean; levelId: AccessLevel; onChange: () => void;
  width: number;
}) {
  const [hov, setHov] = useState(false);

  const radioState: RadioState = !editMode
    ? (selected ? 'selected' : 'default')
    : selected
    ? 'selected'
    : hov
    ? 'hover'
    : 'default';

  return (
    <div
      onClick={editMode ? onChange : undefined}
      onMouseEnter={() => editMode && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width, flexShrink: 0, height: '100%',
        cursor: editMode ? 'pointer' : 'default',
        background: 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <RadioSVG state={radioState} editColors={editMode} />
    </div>
  );
}

// ─── Level badge (view mode summary) ─────────────────────────────────────────
function LevelBadge({ levelId }: { levelId: AccessLevel }) {
  const lvl = ACCESS_LEVELS.find(l => l.id === levelId)!;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 9999, background: lvl.bg, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: lvl.color, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: lvl.dot, flexShrink: 0 }} />
      {lvl.label}
    </span>
  );
}

// ─── Column width constants ────────────────────────────────────────────────────
const PERM_HEADER_H = 48;
const DEFAULT_COL_WIDTHS: Record<string, number> = {
  app:         220,
  none:        110,
  'read-only': 110,
  review:      110,
  edit:        110,
  admin:       110,
};
const MIN_COL_W: Record<string, number> = { app: 120, _default: 72 };

// ─── Resize handle (§7.A.7) ───────────────────────────────────────────────────
function ResizeHandle({ colKey, onDelta, cellHovered = false }: {
  colKey: string;
  onDelta: (key: string, delta: number) => void;
  cellHovered?: boolean;
}) {
  const [active,        setActive]        = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
    let lastX = e.clientX;
    const onMove = (me: MouseEvent) => {
      const delta = me.clientX - lastX;
      lastX = me.clientX;
      onDelta(colKey, delta);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
      setActive(false);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  }

  const lineColor = active || handleHovered ? '#4D7CFE'
                  : cellHovered             ? '#9CA4AE'
                  : 'transparent';

  return (
    <div
      style={{
        position: 'absolute', right: 0, top: 0,
        height: '100%', width: 7,
        cursor: 'col-resize', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false}
      onDragStart={e => e.preventDefault()}
    >
      <div style={{
        height: PERM_HEADER_H, width: 2,
        background: lineColor, transition: 'background 0.1s', flexShrink: 0,
      }} />
    </div>
  );
}

// ─── Application column header (resizable) ────────────────────────────────────
function AppColHeader({ width, onDelta }: {
  width: number;
  onDelta: (key: string, delta: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        width, flexShrink: 0,
        position: 'relative',
        display: 'flex', alignItems: 'center',
        height: '100%',
        paddingLeft: 8, paddingRight: 10,
        overflow: 'clip',
        background: hovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
        borderRight: '1px solid #F0F0F0',
        userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#384857', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Application
      </span>
      <ResizeHandle colKey="app" onDelta={onDelta} cellHovered={hovered} />
    </div>
  );
}

// ─── Column header cell ────────────────────────────────────────────────────────
function LevelHeaderCell({ lvl, editMode = false, onDoubleClick, width, colKey, onDelta }: {
  lvl: AccessLevelDef;
  editMode?: boolean;
  onDoubleClick?: () => void;
  width: number;
  colKey: string;
  onDelta: (key: string, delta: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [flashed, setFlashed] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleDoubleClick() {
    if (!editMode || !onDoubleClick) return;
    onDoubleClick();
    setFlashed(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlashed(false), 500);
  }

  useEffect(() => () => { if (flashTimerRef.current) clearTimeout(flashTimerRef.current); }, []);

  const bg = flashed
    ? lvl.bg
    : hovered
    ? '#EEEFF1'
    : '#FAFAFA';

  return (
    <div
      style={{
        width, flexShrink: 0,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', paddingLeft: 6, paddingRight: 10,
        overflow: 'clip',
        background: bg,
        transition: 'background 0.15s',
        cursor: editMode ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handleDoubleClick}
      title={editMode ? `Double-click to set all apps to "${lvl.label}"` : undefined}
    >
      <span style={{
        fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600,
        color: flashed ? lvl.color : '#384857',
        whiteSpace: 'nowrap', transition: 'color 0.15s',
      }}>
        {lvl.label}
      </span>
      <ResizeHandle colKey={colKey} onDelta={onDelta} cellHovered={hovered} />
    </div>
  );
}

// ─── App row ───────────────────────────────────────────────────────────────────
function AppRow({ app, currentLevel, editMode, onLevelChange, isLast, colWidths }: {
  app: AppDef; currentLevel: AccessLevel; editMode: boolean;
  onLevelChange: (level: AccessLevel) => void; isLast: boolean;
  colWidths: Record<string, number>;
}) {
  const [hov, setHov] = useState(false);
  const naSet = NOT_APPLICABLE_MAP[app.id];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'stretch', height: 48,
        background: hov ? '#f9f9fb' : '#FFFFFF',
        borderBottom: isLast ? 'none' : '1px solid #F0F0F0',
        transition: 'background 0.1s',
      }}
    >
      {/* App column */}
      <div style={{ width: colWidths.app, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 20, paddingRight: 12, borderRight: '1px solid #F0F0F0', overflow: 'hidden' }}>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {APP_ICON_MAP[app.id]?.('#384857')}
        </div>
        {/* Label font style — Inter 14px/600 #262626 (§3.4 Label token) */}
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#262626', lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {app.name}
        </span>
      </div>

      {/* Radio / N/A columns — fixed width mirrors header */}
      {ACCESS_LEVELS.map(level => {
        const w = colWidths[level.id] ?? DEFAULT_COL_WIDTHS[level.id];
        // Render Not-Applicable dash cell when this (app, level) combo is N/A
        if (naSet?.has(level.id)) {
          return <NaCell key={level.id} editMode={editMode} width={w} />;
        }
        return (
          <RadioCell
            key={level.id}
            selected={currentLevel === level.id}
            editMode={editMode}
            levelId={level.id}
            onChange={() => onLevelChange(level.id)}
            width={w}
          />
        );
      })}
    </div>
  );
}

// ─── Roles List ────────────────────────────────────────────────────────────────

// §22.7 — highlightText: wraps matched chars in #FCFE58 span, case-insensitive,
// activates from 2nd character onward (caller passes empty string when < 2 chars)
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lowerText  = text.toLowerCase();
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

// §22 — Search icon (circle + diagonal line, stroke #9CA4AE)
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, pointerEvents: 'none' }}>
      <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// §22.4 — Clear × icon, colour changes on hover
function ClearIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M12 4L4 12M4 4l8 8" stroke={hovered ? '#595959' : '#8C8C8C'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// §22 — Roles search input following all guidelines
function RolesSearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused,      setFocused]      = useState(false);
  const [hovered,      setHovered]      = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const borderColor = focused  ? '#91D5FF'
                    : hovered  ? '#A8B0BB'
                    : '#D0D5DD';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Search icon — left */}
      <div style={{
        position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', pointerEvents: 'none',
      }}>
        <SearchIcon />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder="Search roles…"
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          height: 36,
          paddingLeft: 34,
          paddingRight: value.length > 0 ? 34 : 10,
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          background: '#FFFFFF',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: '#344054',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
      />

      {/* Clear × icon — right, only when value present */}
      {value.length > 0 && (
        <div
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          onMouseEnter={() => setClearHovered(true)}
          onMouseLeave={() => setClearHovered(false)}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', cursor: 'pointer',
            opacity: 1, transition: 'opacity 0.1s',
          }}
        >
          <ClearIcon hovered={clearHovered} />
        </div>
      )}
    </div>
  );
}

function RoleListItem({ name, selected, onSelect, query }: {
  name: string; selected: boolean; onSelect: () => void; query: string;
}) {
  const [hov, setHov] = useState(false);
  // highlight only when query has 2+ chars (§22.6 — filter activates from 2nd character)
  const activeQuery = query.length >= 2 ? query : '';
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 40, display: 'flex', alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 12,
        cursor: 'pointer',
        borderLeft: selected ? '3px solid #1890FF' : '3px solid transparent',
        background: selected ? '#E6F7FF' : hov ? '#F9FAFB' : '#FFFFFF',
        borderBottom: '1px solid #F0F0F0',
        transition: 'background 0.1s, border-left-color 0.15s',
      }}
    >
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 13,
        fontWeight: selected ? 500 : 400,
        color: '#1D2939',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
      }}>
        {highlightText(name, activeQuery)}
      </span>
      {selected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginLeft: 4 }}>
          <path d={checkIconPaths.p3c788b00} stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function GroupHeader({ name }: { name: string }) {
  return (
    <div style={{
      height: 28, display: 'flex', alignItems: 'center',
      paddingLeft: 16, paddingRight: 16,
      background: '#F5F6F7',
      borderBottom: '1px solid #EEEFF1',
      position: 'sticky', top: 0, zIndex: 1,
    }}>
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 11,
        fontWeight: 600,
        color: '#8C8C8C',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {name}
      </span>
    </div>
  );
}

// ─── Avatar colours (user.id % 10) — §9 ──────────────────────────────────────
const AVATAR_COLORS = [
  '#3B5998', '#E4405F', '#2D8653', '#9B59B6', '#E67E22',
  '#1ABC9C', '#E74C3C', '#34495E', '#16A085', '#8E44AD',
];

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

// ─── Status badge — §8 ────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  'Active':             { bg: '#ECFDF3', text: '#027A48', dot: '#12B76A' },
  'Suspended':          { bg: '#FEF2F2', text: '#B91C1C', dot: '#EF4444' },
  'Pending Invitation': { bg: '#EFF8FF', text: '#175CD3', dot: '#6172F3' },
  'Expired Invitation': { bg: '#FFF7ED', text: '#C4320A', dot: '#EF6820' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? { bg: '#F5F5F5', text: '#595959', dot: '#BFBFBF' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 7px', borderRadius: 9999,
      background: s.bg, fontFamily: 'Inter, sans-serif',
      fontSize: 11, fontWeight: 500, color: s.text, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── Tertiary button — §15.3 Medium ──────────────────────────────────────────
function TertiaryBtn({ onClick, children, disabled }: {
  onClick: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  const [hov,     setHov]     = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        height: 36,
        display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 12, paddingRight: 12,
        background: disabled ? 'transparent' : pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14, fontWeight: 400,
        color: disabled ? '#BFBFBF' : pressed ? '#FFFFFF' : '#616D79',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── View Members Modal ────────────────────────────────────────────────────────
function ViewMembersModal({ roleName, onClose }: { roleName: string; onClose: () => void }) {
  const allMembers = INITIAL_USERS.filter(u => u.accessLevel === roleName);
  const [searchQuery, setSearchQuery] = React.useState('');

  const members = searchQuery.trim()
    ? allMembers.filter(u => {
        const q = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.company.toLowerCase().includes(q)
        );
      })
    : allMembers;

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 560,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 48px)',
          background: '#FFFFFF',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── Header — §10.3 ──────────────────────────────────────────────── */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 72, padding: '0 24px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <p style={{
                fontFamily: "'Actor', sans-serif",
                fontWeight: 400, fontSize: 24, lineHeight: '28.8px',
                color: '#1B2736', margin: 0, whiteSpace: 'nowrap',
              }}>
                Members — {roleName}
              </p>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400,
                color: '#9CA4AE', lineHeight: '16px',
              }}>
                {allMembers.length} member{allMembers.length !== 1 ? 's' : ''} assigned to this role
              </span>
            </div>
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
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── Search bar ──────────────────────────────────────────────────── */}
        {allMembers.length > 0 && (
          <div style={{
            flexShrink: 0,
            padding: '10px 16px',
            background: '#FFFFFF',
            borderBottom: '1px solid #F0F0F0',
          }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {/* Search icon */}
              <div style={{ position: 'absolute', left: 10, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
                  <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                placeholder="Search by name, email or company…"
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: 36,
                  paddingLeft: 34,
                  paddingRight: searchQuery.length > 0 ? 34 : 10,
                  border: '1px solid #D0D5DD',
                  borderRadius: 4,
                  background: '#FFFFFF',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#344054',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D0D5DD')}
              />
              {/* Clear × button */}
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4l8 8" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            {/* Result count while filtering */}
            {searchQuery.trim() && (
              <div style={{ marginTop: 6 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: '#9CA4AE' }}>
                  {members.length === 0
                    ? 'No results found'
                    : `${members.length} of ${allMembers.length} member${allMembers.length !== 1 ? 's' : ''}`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {allMembers.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 10, padding: '40px 24px',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#D9D9D9" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
                color: '#9EA3A9', textAlign: 'center',
              }}>
                No members are assigned to this role yet.
              </span>
            </div>
          ) : members.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 10, padding: '40px 24px',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="7" stroke="#D9D9D9" strokeWidth="1.5" />
                <path d="M16 16L21 21" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
                color: '#9EA3A9', textAlign: 'center',
              }}>
                No members match your search.
              </span>
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div style={{
                display: 'flex', alignItems: 'center', height: 36,
                background: '#FAFAFA', borderBottom: '1px solid #E5E7EB',
                paddingLeft: 16, paddingRight: 16,
                position: 'sticky', top: 0, zIndex: 2,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857' }}>Member</span>
                </div>
                <div style={{ width: 140, flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857' }}>Company</span>
                </div>
                <div style={{ width: 120, flexShrink: 0, textAlign: 'right' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857' }}>Status</span>
                </div>
              </div>

              {/* Member rows */}
              {members.map((user, i) => {
                const avatarColor = AVATAR_COLORS[user.id % 10];
                const initials    = getInitials(user.name);
                const isEven      = i % 2 === 0;
                return (
                  <div
                    key={user.id}
                    style={{
                      display: 'flex', alignItems: 'center', height: 52,
                      paddingLeft: 16, paddingRight: 16,
                      background: isEven ? '#FFFFFF' : '#FAFAFA',
                      borderBottom: i === members.length - 1 ? 'none' : '1px solid #F0F0F0',
                    }}
                  >
                    {/* Avatar + name + email */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: avatarColor, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: 11, fontWeight: 600, color: '#FFFFFF',
                          userSelect: 'none',
                        }}>
                          {initials}
                        </span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600,
                          color: '#1D2C38', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {user.name}
                        </div>
                        <div style={{
                          fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 400,
                          color: '#616D79', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {user.email}
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div style={{ width: 140, flexShrink: 0, paddingRight: 8 }}>
                      <span style={{
                        fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
                        color: '#384857', whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: 'ellipsis', display: 'block',
                      }}>
                        {user.company}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div style={{ width: 120, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
                      <StatusBadge status={user.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer — §10.4 ──────────────────────────────────────────────── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ height: 1, backgroundColor: '#C3C7CC' }} />
          <div style={{
            height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            paddingLeft: 28, paddingRight: 28,
          }}>
            <button
              onClick={onClose}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
              }}
              style={{
                height: 36, paddingLeft: 16, paddingRight: 16,
                background: '#F2F3F4', border: '1px solid #C3C7CC',
                borderRadius: 4, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
                color: '#616D79', whiteSpace: 'nowrap',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function RoleAccessLevel() {
  const [permissions, setPermissions]       = useState<AllPermissions>(() => buildInitialPermissions());
  const [selectedRoleId, setSelectedRoleId] = useState<string>(FLAT_ROLES[0]?.roleId ?? '');
  const [editMode, setEditMode]             = useState(false);
  const [draftPerms, setDraftPerms]         = useState<RolePermissions>({});
  const [searchQuery, setSearchQuery]       = useState('');
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [groupByTrade, setGroupByTrade]         = useState(false);
  const [colWidths, setColWidths]               = useState<Record<string, number>>({ ...DEFAULT_COL_WIDTHS });

  function handleColDelta(key: string, delta: number) {
    setColWidths(prev => {
      const min = key === 'app' ? (MIN_COL_W.app) : (MIN_COL_W._default);
      return { ...prev, [key]: Math.max(min, (prev[key] ?? DEFAULT_COL_WIDTHS[key] ?? 110) + delta) };
    });
  }

  // §22.6 — filter activates from 2nd character onward
  const activeQuery = searchQuery.length >= 2 ? searchQuery.toLowerCase() : '';

  // Filter ROLES_DATA groups/children by the active query
  const filteredRoles = activeQuery
    ? ROLES_DATA
        .map(group => ({
          ...group,
          children: group.children.filter(c =>
            c.name.toLowerCase().includes(activeQuery)
          ),
        }))
        .filter(group => group.children.length > 0)
    : ROLES_DATA;

  const totalMatches = filteredRoles.reduce((acc, g) => acc + g.children.length, 0);

  // Build trade-grouped structure from filteredRoles
  // Preserves first-appearance order of trades as they occur in ROLES_DATA
  const tradeNameMap = new Map(TRADE_ITEMS.map(t => [t.id, t.name]));
  const tradeGroupsMap = new Map<string, { tradeName: string; children: { id: string; name: string }[] }>();
  for (const group of filteredRoles) {
    for (const child of group.children) {
      const tradeKey  = child.trade ?? '__unassigned__';
      const tradeName = child.trade ? (tradeNameMap.get(child.trade) ?? child.trade) : 'Unassigned';
      if (!tradeGroupsMap.has(tradeKey)) {
        tradeGroupsMap.set(tradeKey, { tradeName, children: [] });
      }
      tradeGroupsMap.get(tradeKey)!.children.push({ id: child.id, name: child.name });
    }
  }
  const tradeGroups = Array.from(tradeGroupsMap.entries());

  const selectedFlat  = FLAT_ROLES.find(r => r.roleId === selectedRoleId);
  const livePerms     = permissions[selectedRoleId] ?? buildDefaultRolePermissions();
  const displayPerms  = editMode ? draftPerms : livePerms;
  const hasChanges    = editMode && JSON.stringify(draftPerms) !== JSON.stringify(livePerms);

  // Member count for the selected role
  const roleMemberCount = selectedFlat
    ? INITIAL_USERS.filter(u => u.accessLevel === selectedFlat.roleName).length
    : 0;

  function selectRole(roleId: string) {
    setSelectedRoleId(roleId);
    setEditMode(false);
    setDraftPerms({});
  }

  function enterEditMode() {
    setDraftPerms({ ...livePerms });
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
    setDraftPerms({});
  }

  function saveEdit() {
    setPermissions(p => ({ ...p, [selectedRoleId]: { ...draftPerms } }));
    setEditMode(false);
    setDraftPerms({});
  }

  function setLevel(appId: string, level: AccessLevel) {
    setDraftPerms(p => ({ ...p, [appId]: level }));
  }

  function applyLevelToAll(level: AccessLevel) {
    const next: RolePermissions = {};
    for (const app of APPS) {
      const naSet = NOT_APPLICABLE_MAP[app.id];
      if (naSet?.has(level)) {
        // This level is N/A for the app — fall back to first valid level
        const firstValid = ACCESS_LEVELS.find(l => !naSet.has(l.id));
        next[app.id] = (firstValid?.id ?? 'read-only') as AccessLevel;
      } else {
        next[app.id] = level;
      }
    }
    setDraftPerms(next);
  }

  return (
    <div data-dev-anchor="permissions-fallback-root" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minWidth: 0, background: '#FFFFFF' }}>

      {/* ── Section Header ───────────────────────────────────────────────── */}
      <div style={{ height: 72, paddingLeft: 24, paddingRight: 24, background: '#FFFFFF', borderBottom: '1px solid #D9D9D9', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#1D2C38', margin: 0 }}>
          Role Permission
        </h1>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minHeight: 0, padding: 12, display: 'flex', gap: 12, overflow: 'hidden' }}>

        {/* ── LEFT: Roles Panel ────────────────────────────────────────── */}
        <div data-dev-anchor="permissions-role-list" style={{
          width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column',
          border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden',
          background: '#FFFFFF',
        }}>
          {/* Panel header — same style as Teams Table §25.3 */}
          <div style={{
            flexShrink: 0, display: 'flex', alignItems: 'center',
            paddingLeft: 12, paddingRight: 8,
            height: 48,
            background: '#FAFAFA', borderBottom: '1px solid #F0F0F0',
          }}>
            <span style={{
              fontFamily: 'Open Sans, sans-serif', fontSize: 16, fontWeight: 600,
              color: '#384857',
            }}>
              Roles
            </span>
          </div>

          {/* Group by Trade toggle */}
          <div style={{
            display: 'flex', alignItems: 'center',
            padding: '6px 8px',
            background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 4px' }}>
              {/* Toggle track — active: Inertia Navy #243746, inactive: #D9D9D9 */}
              <div
                onClick={() => setGroupByTrade(v => !v)}
                style={{
                  width: 40, height: 20, borderRadius: 10, flexShrink: 0, cursor: 'pointer',
                  background: groupByTrade ? '#243746' : '#D9D9D9',
                  position: 'relative', transition: 'background 0.2s',
                }}
              >
                <div style={{
                  position: 'absolute', top: 2,
                  left: groupByTrade ? 22 : 2,
                  width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                  transition: 'left 0.2s',
                }} />
              </div>
              {/* Label — Inter 14px/400 #616D79 */}
              <span
                onClick={() => setGroupByTrade(v => !v)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#616D79',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Group by Trade
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            padding: '8px 10px',
            borderBottom: '1px solid #E5E7EB',
            background: '#FFFFFF',
            flexShrink: 0,
          }}>
            <RolesSearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Result count — shown only when search is active */}
          {activeQuery && (
            <div style={{
              padding: '4px 12px',
              background: '#FAFAFA',
              borderBottom: '1px solid #EEEFF1',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: 11,
                fontWeight: 400,
                color: '#9CA4AE',
              }}>
                {totalMatches === 0
                  ? 'No results found'
                  : `${totalMatches} result${totalMatches !== 1 ? 's' : ''}`}
              </span>
            </div>
          )}

          {/* Grouped role list */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {filteredRoles.length === 0 ? (
              /* §16.8.5 — Empty state */
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px 12px',
                flexDirection: 'column', gap: 6,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="10.5" cy="10.5" r="7" stroke="#D9D9D9" strokeWidth="1.5" />
                  <path d="M16 16L21 21" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#9EA3A9',
                  textAlign: 'center',
                }}>
                  No results found
                </span>
              </div>
            ) : groupByTrade ? (
              tradeGroups.map(([tradeKey, { tradeName, children }]) => (
                <div key={tradeKey}>
                  <GroupHeader name={tradeName} />
                  {children.map(child => (
                    <RoleListItem
                      key={child.id}
                      name={child.name}
                      selected={selectedRoleId === child.id}
                      onSelect={() => selectRole(child.id)}
                      query={searchQuery}
                    />
                  ))}
                </div>
              ))
            ) : (
              filteredRoles.flatMap(group => group.children).map(child => (
                <RoleListItem
                  key={child.id}
                  name={child.name}
                  selected={selectedRoleId === child.id}
                  onSelect={() => selectRole(child.id)}
                  query={searchQuery}
                />
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT: Matrix Panel ──────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Toolbar: selected role + edit controls */}
          <div style={{
            height: 52, flexShrink: 0,
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 4, paddingRight: 0, marginBottom: 8,
          }}>
            {/* Selected role identity + member count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                {selectedFlat ? (
                  <>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: '#1D2C38', lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {selectedFlat.roleName}
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#9CA4AE', lineHeight: '16px' }}>
                      {selectedFlat.groupName}
                    </span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9CA4AE' }}>No role selected</span>
                )}
              </div>

              {/* Divider + member count + View Members button */}
              {selectedFlat && (
                <>
                  <div style={{ width: 1, height: 28, background: '#E5E7EB', flexShrink: 0 }} />
                  {/* Member count chip */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="9" cy="7" r="4" stroke="#9CA4AE" strokeWidth="1.5" />
                      <path d="M2 21c0-4 3.134-7 7-7s7 3 7 7" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M19 8v6M22 11h-6" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                      color: roleMemberCount > 0 ? '#384857' : '#9CA4AE',
                      whiteSpace: 'nowrap',
                    }}>
                      {roleMemberCount} {roleMemberCount === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  {/* View Members tertiary button */}
                  <TertiaryBtn
                    onClick={() => setShowMembersModal(true)}
                    disabled={roleMemberCount === 0}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 21c0-4 3.134-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="19" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    View Members
                  </TertiaryBtn>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {editMode ? (
                <>
                  {hasChanges && (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#9CA4AE', marginRight: 4 }}>
                      Unsaved changes
                    </span>
                  )}
                  <SecondaryBtn onClick={cancelEdit}>Cancel</SecondaryBtn>
                  <PrimaryBtn onClick={saveEdit}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8l4 4 8-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save Changes
                  </PrimaryBtn>
                </>
              ) : (
                <PrimaryBtn onClick={enterEditMode}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M11 2.5a2.121 2.121 0 013 3L5 14.5l-4 1 1-4L11 2.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Edit Access
                </PrimaryBtn>
              )}
            </div>
          </div>

          {/* Edit mode notice */}
          {editMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#FFF7E6', border: '1px solid #FFE7BA', borderRadius: 6, marginBottom: 8, flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="8.25" stroke="#FA8C16" strokeWidth="1.5" />
                <path d="M10 6.5v4" stroke="#FA8C16" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13.25" r="0.875" fill="#FA8C16" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#7C4A00' }}>
                Select access per app, or double-click a column header to apply it to all.
              </span>
            </div>
          )}

          {/* Table container — header lives inside the scroll area so the
              separator always lines up with data rows exactly */}
          <div data-dev-anchor="permissions-matrix" style={{ flex: 1, minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF' }}>
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'auto' }}>
              {/* min-width tracks the sum of all column widths so the table scrolls horizontally when columns are expanded */}
              <div style={{ minWidth: colWidths.app + ACCESS_LEVELS.reduce((s, l) => s + (colWidths[l.id] ?? DEFAULT_COL_WIDTHS[l.id]), 0) }}>

                {/* Sticky header */}
                <div style={{ display: 'flex', alignItems: 'stretch', height: PERM_HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>

                  {/* Application column header — resizable */}
                  <AppColHeader width={colWidths.app} onDelta={handleColDelta} />

                  {/* Level column headers */}
                  {ACCESS_LEVELS.map(lvl => (
                    <LevelHeaderCell
                      key={lvl.id}
                      lvl={lvl}
                      editMode={editMode}
                      onDoubleClick={() => applyLevelToAll(lvl.id)}
                      width={colWidths[lvl.id] ?? DEFAULT_COL_WIDTHS[lvl.id]}
                      colKey={lvl.id}
                      onDelta={handleColDelta}
                    />
                  ))}
                </div>

                {/* App rows */}
                {APPS.map((app, i) => (
                  <AppRow
                    key={app.id}
                    app={app}
                    currentLevel={(displayPerms[app.id] as AccessLevel) ?? 'none'}
                    editMode={editMode}
                    onLevelChange={level => setLevel(app.id, level)}
                    isLast={i === APPS.length - 1}
                    colWidths={colWidths}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── View Members Modal ─────────────────────────────────────────── */}
      {showMembersModal && selectedFlat && (
        <ViewMembersModal
          roleName={selectedFlat.roleName}
          onClose={() => setShowMembersModal(false)}
        />
      )}
    </div>
  );
}