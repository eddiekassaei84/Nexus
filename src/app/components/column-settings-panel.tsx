import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import figmaPaths from '../../imports/svg-grylsakuwi';
import densityPaths from '../../imports/svg-j427e4to4h';
import { imgGroup, imgGroup1 } from '../../imports/svg-vt0c0';
import plusMinusPaths from '../../imports/svg-y32z3ysqpz';

const DRAG_TYPE = 'COL_SETTING_ITEM';
const CB_BLUE   = '#0E70CB';

// ─── Types ─────────────────────────────────────────────────────────────────────
export type TableDensity = 'compact' | 'normal' | 'expanded';

export interface ColSetting {
  key:       string;
  label:     string;
  required?: boolean;
  visible:   boolean;
}

export const DEFAULT_COL_SETTINGS: ColSetting[] = [
  { key: 'user',        label: 'Name',             required: true, visible: true  },
  { key: 'jobTitle',    label: 'Job Title',                        visible: true  },
  { key: 'email',       label: 'Email',            required: true, visible: true  },
  { key: 'company',     label: 'Company',                          visible: true  },
  { key: 'office',      label: 'Office',                           visible: true  },
  { key: 'accessLevel', label: 'Project Role',                     visible: true  },
  { key: 'userType',          label: 'User Type',              visible: true  },
  { key: 'status',            label: 'User Account Status',    visible: true  },
  { key: 'membershipStatus',  label: 'Membership Status',      visible: true  },
  { key: 'emailDomain',       label: 'Domain',                 visible: false },
  { key: 'address',     label: 'Address',                          visible: false },
];

// ─── Density mode config ────────────────────────────────────────────────────────
// Figma density order: Compact | Normal | Expanded  (matches screenshot)
const DENSITY_MODES: { id: TableDensity; label: string; path: string; mask: string }[] = [
  { id: 'compact',  label: 'Compact',  path: densityPaths.p20882ef0, mask: imgGroup  },
  { id: 'normal',   label: 'Normal',   path: densityPaths.p32f8f9f0, mask: imgGroup1 },
  { id: 'expanded', label: 'Expanded', path: densityPaths.p19b84f80, mask: imgGroup  },
];

function DensityIcon({ path, mask, active }: { path: string; mask: string; active: boolean }) {
  const fill = active ? '#FFFFFF' : '#616D79';
  return (
    // 22×22px container with mask-image clip (matches Figma Group clip path)
    <div
      style={{
        position: 'relative',
        width: 22,
        height: 22,
        flexShrink: 0,
        overflow: 'hidden',
        maskImage: `url('${mask}')`,
        WebkitMaskImage: `url('${mask}')`,
        maskSize: '22px 22px',
        WebkitMaskSize: '22px 22px',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: '0px 0px',
        WebkitMaskPosition: '0px 0px',
      }}
    >
      <svg
        style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}

// ─── Figma-style checkbox ───────────────────────────────────────────────────────
function SettingCheckbox({
  checked, disabled, onChange,
}: { checked: boolean; disabled?: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={() => { if (!disabled) onChange(); }}
      className="flex items-center justify-center size-[24px] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E70CB]"
      title={disabled ? 'Required field — cannot be hidden' : undefined}
    >
      {checked || disabled ? (
        /* Filled checkbox — blue when checked, grey when required/disabled */
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={figmaPaths.pae529f2} fill={disabled ? '#D1D5DB' : '#0E70CB'} />
        </svg>
      ) : (
        /* Outline only — unchecked */
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={figmaPaths.p3370a680} fill="#D1D5DB" />
        </svg>
      )}
    </button>
  );
}

// ─── Drag handle ───────────────────────────────────────────────────────────────
function DragHandle() {
  return (
    /* 26px-wide left column, handle centred vertically in 48px row */
    <div style={{ position: 'relative', width: 26, height: '100%', flexShrink: 0 }}>
      {/* dots positioned at left:10.66px, top:16.83px, size 7.125×13.344px */}
      <div style={{
        position: 'absolute',
        left: 10.66, top: 16.83,
        width: 7.125, height: 13.344,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        overflow: 'hidden',
      }}>
        {/* Two-column dot grid: left column */}
        <div style={{ position: 'relative', width: '100%', height: 13.344, flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: '68.75%' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
              <path d={figmaPaths.p10bef880} fill="#616D79" />
            </svg>
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '68.75%', right: 0 }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
              <path d={figmaPaths.p2cd4e580} fill="#616D79" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Draggable / droppable row ──────────────────────────────────────────────────
interface SettingRowProps {
  setting:  ColSetting;
  index:    number;
  onToggle: (key: string) => void;
  onMove:   (dragIdx: number, hoverIdx: number) => void;
}

function SettingRow({ setting, index, onToggle, onMove }: SettingRowProps) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
    collect: m => ({ isDragging: m.isDragging() }),
  });

  const [, drop] = useDrop<{ index: number }>({
    accept: DRAG_TYPE,
    hover(item, monitor) {
      if (!rowRef.current) return;
      const dragIdx  = item.index;
      const hoverIdx = index;
      if (dragIdx === hoverIdx) return;
      const rect    = rowRef.current.getBoundingClientRect();
      const midY    = (rect.bottom - rect.top) / 2;
      const offset  = monitor.getClientOffset();
      if (!offset) return;
      const clientY = offset.y - rect.top;
      if (dragIdx < hoverIdx && clientY < midY) return;
      if (dragIdx > hoverIdx && clientY > midY) return;
      onMove(dragIdx, hoverIdx);
      item.index = hoverIdx;
    },
  });

  drag(gripRef);
  drop(rowRef);

  return (
    <div
      ref={rowRef}
      role="listitem"
      aria-label={`${setting.label}${setting.required ? ' (required)' : ''}`}
      className="flex flex-row items-center w-full border-b border-[#f3f4f6] last:border-0 transition-colors"
      style={{ opacity: isDragging ? 0.4 : 1, backgroundColor: 'white', height: 48 }}
      onMouseEnter={e => { if (!isDragging) (e.currentTarget as HTMLDivElement).style.backgroundColor = '#fafafa'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white'; }}
    >
      {/* Grip */}
      <div
        ref={gripRef}
        className="flex items-center justify-center pl-[6px] pr-[4px] self-stretch cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      >
        <DragHandle />
      </div>

      {/* Checkbox + label */}
      <div className="flex items-center gap-[8px] flex-1 pr-[16px] py-[12px]">
        <SettingCheckbox
          checked={setting.visible}
          disabled={setting.required}
          onChange={() => onToggle(setting.key)}
        />
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 14, color: '#262626', lineHeight: '20px',
          opacity: setting.required ? 0.7 : 1,
        }}>
          {setting.label}
        </span>
      </div>
    </div>
  );
}

// ─── Panel ──────────────────────────────────────────────────────────────────────
export interface ColumnSettingsPanelProps {
  colSettings:          ColSetting[];
  onChange:             (settings: ColSetting[]) => void;
  onClose:              () => void;
  anchorRef:            React.RefObject<HTMLButtonElement | null>;
  tableDensity:         TableDensity;
  onDensityChange:      (d: TableDensity) => void;
  freezeCount:          number;
  onFreezeCountChange:  (n: number) => void;
}

export function ColumnSettingsPanel({
  colSettings, onChange, onClose, anchorRef, tableDensity, onDensityChange,
  freezeCount, onFreezeCountChange,
}: ColumnSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos,    setPos]    = useState({ top: 56, right: 0 });

  /* Position: snap below the anchor button */
  useEffect(() => {
    const update = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [anchorRef]);

  /* Close on click outside */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (
        panelRef.current   && !panelRef.current.contains(e.target as Node) &&
        anchorRef.current  && !anchorRef.current.contains(e.target as Node)
      ) onClose();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose, anchorRef]);

  /* Close on Escape */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const handleToggle = useCallback((key: string) => {
    onChange(colSettings.map(s => s.key === key ? { ...s, visible: !s.visible } : s));
  }, [colSettings, onChange]);

  const handleMove = useCallback((dragIdx: number, hoverIdx: number) => {
    const dragKey  = colSettings[dragIdx]?.key;
    const hoverKey = colSettings[hoverIdx]?.key;
    if (!dragKey || !hoverKey) return;
    const fi = colSettings.findIndex(s => s.key === dragKey);
    const ti = colSettings.findIndex(s => s.key === hoverKey);
    const next = [...colSettings];
    const [removed] = next.splice(fi, 1);
    next.splice(ti, 0, removed);
    onChange(next);
  }, [colSettings, onChange]);

  const handleReset = () => onChange(DEFAULT_COL_SETTINGS.map(s => ({ ...s })));

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Column Visibility"
      className="fixed z-[500] bg-white rounded-[8px] overflow-hidden"
      style={{
        top:       pos.top,
        right:     pos.right,
        width:     300,
        boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.18)',
        border:    '1px solid #e5e7eb',
      }}
    >
      {/* ── Rows list ── */}
      <DndProvider backend={HTML5Backend}>
        <div role="list" style={{ maxHeight: 420, overflowY: 'auto' }}>
          {colSettings.length > 0 ? (
            colSettings.map((s, i) => (
              <SettingRow
                key={s.key}
                setting={s}
                index={i}
                onToggle={handleToggle}
                onMove={handleMove}
              />
            ))
          ) : (
            <div
              className="flex items-center justify-center h-[48px]"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF' }}
            >
              No properties
            </div>
          )}
        </div>
      </DndProvider>

      {/* ── Table Density row ── */}
      <div
        className="flex items-center justify-between border-t border-[#f3f4f6]"
        style={{ height: 48, backgroundColor: 'white', paddingLeft: 17, paddingRight: 8 }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '20px', color: '#262626',
          opacity: 0.7, whiteSpace: 'nowrap',
        }}>
          Table Density
        </span>
        <div className="flex items-center">
          {DENSITY_MODES.map(mode => {
            const isActive = tableDensity === mode.id;
            return (
              <button
                key={mode.id}
                title={mode.label}
                onClick={() => onDensityChange(mode.id)}
                className="flex items-center justify-center rounded-[4px] transition-colors"
                style={{
                  height: 36,
                  width: 36,
                  padding: 0,
                  border: 'none',
                  background: isActive ? '#616D79' : 'transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#E5E7E9'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                onMouseDown={e => { e.currentTarget.style.background = isActive ? '#616D79' : '#E5E7E9'; }}
                aria-pressed={isActive}
                aria-label={`${mode.label} density`}
              >
                <DensityIcon path={mode.path} mask={mode.mask} active={isActive} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Freeze up to column row ── */}
      <div
        className="flex items-center justify-between border-t border-[#f3f4f6]"
        style={{ height: 48, backgroundColor: 'white', paddingLeft: 17, paddingRight: 12 }}
      >
        {/* Label + value */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: '#262626',
            opacity: 0.7, whiteSpace: 'nowrap',
          }}>
            Freeze up to column:
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 14, lineHeight: '20px', color: '#262626',
            minWidth: 16, textAlign: 'center',
          }}>
            {freezeCount}
          </span>
        </div>

        {/* − and + icon buttons — Figma: Container-2197-6246 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Minus button — fixed 28×28px, icon 14×14 viewBox 0 0 14 14 (p17c7d700) */}
          <button
            onClick={() => onFreezeCountChange(Math.max(0, freezeCount - 1))}
            disabled={freezeCount === 0}
            aria-label="Decrease frozen columns"
            style={{
              width: 28, height: 28, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              cursor: freezeCount === 0 ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              padding: '1px 7px',
              boxSizing: 'border-box',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (freezeCount > 0) e.currentTarget.style.background = '#F2F3F4'; }}
            onMouseLeave={e => { if (freezeCount > 0) e.currentTarget.style.background = '#FFFFFF'; }}
            onMouseDown={e => { if (freezeCount > 0) e.currentTarget.style.background = '#E5E7E9'; }}
            onMouseUp={e => { if (freezeCount > 0) e.currentTarget.style.background = '#F2F3F4'; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d={plusMinusPaths.p17c7d700} fill={freezeCount === 0 ? '#BFBFBF' : '#616D79'} />
            </svg>
          </button>

          {/* Plus button — flex-[1_0_0] h-[28px], icon 10×10 viewBox 0 0 10 10 (p14468300) */}
          <button
            onClick={() => onFreezeCountChange(Math.min(5, freezeCount + 1))}
            disabled={freezeCount === 5}
            aria-label="Increase frozen columns"
            style={{
              flex: '1 0 0', height: 28, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              cursor: freezeCount === 5 ? 'not-allowed' : 'pointer',
              padding: '1px 7px',
              boxSizing: 'border-box',
              minWidth: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (freezeCount < 5) e.currentTarget.style.background = '#F2F3F4'; }}
            onMouseLeave={e => { if (freezeCount < 5) e.currentTarget.style.background = '#FFFFFF'; }}
            onMouseDown={e => { if (freezeCount < 5) e.currentTarget.style.background = '#E5E7E9'; }}
            onMouseUp={e => { if (freezeCount < 5) e.currentTarget.style.background = '#F2F3F4'; }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
              <clipPath id="plus-clip">
                <rect fill="white" height="10" width="10" />
              </clipPath>
              <g clipPath="url(#plus-clip)">
                <path d={plusMinusPaths.p14468300} fill={freezeCount === 5 ? '#BFBFBF' : '#616D79'} />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Footer — Reset ── */}
      <div
        className="flex items-center justify-end px-[12px] border-t border-[#e5e7eb]"
        style={{ height: 40, backgroundColor: '#fafafa' }}
      >
        <button
          onClick={handleReset}
          className="transition-colors hover:text-[#384857]"
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: '#616D79', textDecoration: 'underline', textUnderlineOffset: 3,
          }}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}