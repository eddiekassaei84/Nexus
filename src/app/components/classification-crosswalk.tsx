import React, { useState, useMemo, useCallback } from 'react';
import svgPaths from '../../imports/Container/svg-8wfr5s0vsl';
import panelSvgPaths from '../../imports/InertiaBladeFiles/svg-o3x5ytv1o2';
import editSvgPaths from '../../imports/Container-1/svg-gf151a2usf';
import { SEED_DATA } from './classification-crosswalk-data';
import type { CrosswalkRow } from './classification-crosswalk-data';

export type { CrosswalkRow };

// ─── Column definitions (single source of truth for table + settings panel) ──
const ALL_COLUMNS = [
  { key: 'wbsT1', label: 'Bid Package',          defaultWidth: 240, required: true  },
  { key: 'wbsT2', label: 'Work Package',          defaultWidth: 220, required: false },
  { key: 'wbsT3', label: 'Scope',                 defaultWidth: 260, required: false },
  { key: 'ufT1',  label: 'Uni Format Tier 01',    defaultWidth: 180, required: false },
  { key: 'ufT2',  label: 'Uni Format Tier 02',    defaultWidth: 220, required: false },
  { key: 'ufT3',  label: 'Uni Format Tier 03',    defaultWidth: 260, required: false },
  { key: 'ufT4',  label: 'Uni Format Tier 04',    defaultWidth: 240, required: false },
  { key: 'mfT1',  label: 'Master Format Tier 01', defaultWidth: 200, required: false },
  { key: 'mfT2',  label: 'Master Format Tier 02', defaultWidth: 240, required: false },
  { key: 'mfT3',  label: 'Master Format Tier 03', defaultWidth: 260, required: false },
  { key: 'mfT4',  label: 'Master Format Tier 04', defaultWidth: 260, required: false },
] as const;

type ColKey = typeof ALL_COLUMNS[number]['key'];
type SortDir = 'asc' | 'desc';
interface SortState { key: ColKey; dir: SortDir }

// ─── Default visibility: WBS T1-T3 + UF T1-T2 + MF T1-T2 on, rest off ───────
function defaultVisibility(): Record<string, boolean> {
  const v: Record<string, boolean> = {};
  ALL_COLUMNS.forEach(c => { v[c.key] = true; });
  return v;
}

function defaultWidths(): Record<string, number> {
  const w: Record<string, number> = {};
  ALL_COLUMNS.forEach(c => { w[c.key] = c.defaultWidth; });
  return w;
}

// ─── Highlight search matches ─────────────────────────────────────────────────
function highlightText(text: string, query: string): React.ReactNode {
  if (!query || query.length < 2) return text;
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

// ─── Sort arrows ──────────────────────────────────────────────────────────────
function SortArrows({ dir }: { dir: SortDir | null }) {
  const up = dir === 'asc'  ? '#4D7CFE' : '#C4CAD1';
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

// ─── Column resize handle ─────────────────────────────────────────────────────
const HEADER_H = 47;
function ColResizeHandle({ colKey, onDelta, cellHovered }: {
  colKey: string; onDelta: (k: string, d: number) => void; cellHovered: boolean;
}) {
  const [active, setActive] = useState(false);
  const [handleHov, setHandleHov] = useState(false);
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation(); setActive(true);
    let lastX = e.clientX;
    const onMove = (me: MouseEvent) => { onDelta(colKey, me.clientX - lastX); lastX = me.clientX; };
    const onUp   = () => { setActive(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  };
  const lineColor = active || handleHov ? '#4D7CFE' : cellHovered ? '#9CA4AE' : 'transparent';
  return (
    <div
      style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 7, cursor: 'col-resize', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHov(true)}
      onMouseLeave={() => setHandleHov(false)}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ height: HEADER_H, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── Header cell ─────────────────────────────────────────────────────────────
function HeaderCell({ label, colKey, sortState, onSort, style, onDelta }: {
  label: string; colKey: ColKey; sortState: SortState | null;
  onSort: () => void; style?: React.CSSProperties;
  onDelta?: (k: string, d: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive   = sortState?.key === colKey;
  return (
    <div
      style={{ ...style, position: 'relative', display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 8, paddingRight: onDelta ? 10 : 8, overflow: 'clip', cursor: 'pointer', userSelect: 'none', background: hovered ? '#EEEFF1' : '#FAFAFA', transition: 'background 0.1s' }}
      onClick={onSort}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, marginLeft: 4, opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>
        <SortArrows dir={isActive ? sortState!.dir : null} />
      </span>
      {onDelta && <ColResizeHandle colKey={colKey} onDelta={onDelta} cellHovered={hovered} />}
    </div>
  );
}

// ─── Checkbox SVG ─────────────────────────────────────────────────────────────
function CheckboxSVG({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  const fill = disabled ? '#D1D5DB' : checked ? '#0E70CB' : '#FFFFFF';
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 18, height: 18 }}>
      <svg style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} fill="none" viewBox="0 0 18 18">
        {(checked || disabled) ? (
          <path d={panelSvgPaths.pae529f2} fill={fill} />
        ) : (
          <rect x="1" y="1" width="16" height="16" rx="2" fill="#FFFFFF" stroke="#D0D5DD" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  );
}

// ─── Drag handle dots ─────────────────────────────────────────────────────────
function DragHandle() {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center', opacity: 0.4, flexShrink: 0 }}>
      <svg width="4" height="13" viewBox="0 0 4 13" fill="none"><path d={panelSvgPaths.p230df800} fill="#616D79" /></svg>
      <svg width="4" height="13" viewBox="0 0 4 13" fill="none"><path d={panelSvgPaths.p1843a900} fill="#616D79" /></svg>
    </div>
  );
}

// ─── Column Settings Panel ───────────────────────────────────────────────────
// Props-based: visibility state lives in ClassificationCrosswalk (single source of truth)
function ColumnSettingsPanel({
  onClose,
  colVisibility,
  onToggleCol,
  onToggleAll,
}: {
  onClose: () => void;
  colVisibility: Record<string, boolean>;
  onToggleCol: (key: string) => void;
  onToggleAll: () => void;
}) {
  const [colSearch, setColSearch] = useState('');
  const [freezeCol, setFreezeCol] = useState(0);

  const filteredCols = useMemo(() => {
    const q = colSearch.trim().toLowerCase();
    return q ? ALL_COLUMNS.filter(c => c.label.toLowerCase().includes(q)) : [...ALL_COLUMNS];
  }, [colSearch]);

  const visibleCount = ALL_COLUMNS.filter(c => colVisibility[c.key]).length;
  const allVisible   = visibleCount === ALL_COLUMNS.length;

  return (
    <div style={{ width: 390, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderLeft: '1px solid #D9D9D9', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736', whiteSpace: 'nowrap' }}>Column Settings</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>

      {/* Search */}
      <div style={{ height: 57, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 16px 10px', borderBottom: '1px solid #F0F0F0', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#9CA4AE" strokeWidth="1.2" /><path d="M10.5 10.5L14 14" stroke="#9CA4AE" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <input
            type="text" placeholder="Search columns..." value={colSearch}
            onChange={e => setColSearch(e.target.value)}
            style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: colSearch ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
            onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')}
          />
          {colSearch && (
            <button onClick={() => setColSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: '#8C8C8C' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* Select all row */}
      <div style={{ height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', borderBottom: '1px solid #F0F0F0', position: 'relative', cursor: 'pointer' }} onClick={onToggleAll}>
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
          <CheckboxSVG checked={allVisible} />
        </div>
        <span style={{ position: 'absolute', left: 42, fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, color: '#262626' }}>Select all</span>
        <span style={{ position: 'absolute', right: 16, fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA4AE' }}>{visibleCount} of {ALL_COLUMNS.length} visible</span>
      </div>

      {/* Column list */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {filteredCols.map(col => {
          const isChecked  = colVisibility[col.key] ?? true;
          const isDisabled = col.required;
          return (
            <div key={col.key}
              onClick={() => !isDisabled && onToggleCol(col.key)}
              style={{ height: 48, background: '#FFFFFF', position: 'relative', cursor: isDisabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => { if (!isDisabled) (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF'; }}
            >
              <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}><DragHandle /></div>
              <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)' }}>
                <CheckboxSVG checked={isChecked} disabled={isDisabled} />
              </div>
              <span style={{ position: 'absolute', left: 58, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#262626', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: isDisabled ? 240 : 290 }}>
                {col.label}
              </span>
              {isDisabled && <span style={{ position: 'absolute', right: 16, fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 12, color: '#9CA4AE' }}>required</span>}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#F3F4F6' }} />
            </div>
          );
        })}
        {filteredCols.length === 0 && (
          <div style={{ padding: '16px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9CA4AE' }}>No columns found</div>
        )}
      </div>

      {/* Footer — freeze stepper */}
      <div style={{ height: 49, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderTop: '1px solid #F0F0F0', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#262626', whiteSpace: 'nowrap' }}>Freeze up to column:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#243746', minWidth: 16, textAlign: 'center' }}>{freezeCol}</span>
          <button onClick={() => setFreezeCol(p => Math.max(0, p - 1))} disabled={freezeCol === 0}
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: freezeCol === 0 ? 'not-allowed' : 'pointer', opacity: freezeCol === 0 ? 0.4 : 1, padding: 0 }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d={panelSvgPaths.p3f21e700} fill="#384857" /></svg>
          </button>
          <button onClick={() => setFreezeCol(p => Math.min(ALL_COLUMNS.length - 1, p + 1))}
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: 'pointer', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={panelSvgPaths.p14468300} fill="#384857" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Edit Mapping view (tree preview cards)
// =============================================================================
interface TreeNode { id: string; label: string; children?: TreeNode[] }

const WBS_DATA: TreeNode[] = [
  { id: 'bp1',  label: 'BP-1 General Requirements', children: [{ id: 'bp1a', label: 'A Owner Allowances', children: [{ id: 'bp1a1', label: '1 Contingency Allowances' }] }] },
  { id: 'bp2',  label: 'BP-2 Existing Conditions', children: [{ id: 'bp2a', label: 'A Existing Conditions' }] },
  { id: 'bp3',  label: 'BP-3 Concrete', children: [{ id: 'bp3a', label: 'A Cast-in-Place Concrete' }] },
  { id: 'bp4',  label: 'BP-4 Masonry', children: [{ id: 'bp4a', label: 'A Unit Masonry' }] },
  { id: 'bp5',  label: 'BP-5 Metals', children: [{ id: 'bp5a', label: 'A Structural Steel' }] },
];
const UNI_FORMAT_DATA: TreeNode[] = [
  { id: 'uf-a', label: 'A SUBSTRUCTURE', children: [{ id: 'uf-a10', label: 'A-10 FOUNDATIONS', children: [{ id: 'uf-a1010', label: 'A-10-10 Standard Foundations' }] }] },
  { id: 'uf-b', label: 'B SHELL', children: [{ id: 'uf-b10', label: 'B-10 SUPERSTRUCTURE' }] },
  { id: 'uf-z', label: 'Z GENERAL', children: [{ id: 'uf-z10', label: 'Z-10 GENERAL REQUIREMENTS' }] },
];
const MASTER_FORMAT_DATA: TreeNode[] = [
  { id: 'mf-00', label: '00 Procurement & Contracting', children: [{ id: 'mf-0070', label: '00-70 Conditions of the Contract' }] },
  { id: 'mf-01', label: '01 General Requirements', children: [{ id: 'mf-0120', label: '01-20 Price and Payment Procedures' }] },
  { id: 'mf-03', label: '03 Concrete', children: [{ id: 'mf-0330', label: '03-30 Cast-in-Place Concrete' }] },
];

function TreeRows({ nodes, depth, expanded, onToggle, search }: {
  nodes: TreeNode[]; depth: number; expanded: Record<string, boolean>; onToggle: (id: string) => void; search: string;
}): React.ReactElement {
  const q = search.trim().toLowerCase();
  function visible(node: TreeNode): boolean {
    if (!q) return true;
    if (node.label.toLowerCase().includes(q)) return true;
    return !!node.children?.some(c => visible(c));
  }
  return (
    <>
      {nodes.map(node => {
        if (!visible(node)) return null;
        const pl = 8 + depth * 20;
        const isExp = expanded[node.id] ?? true;
        const hasKids = !!node.children?.length;
        return (
          <React.Fragment key={node.id}>
            <div style={{ height: 32, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: pl, gap: 4, background: '#FFFFFF', borderBottom: '1px solid #F0F0F0' }}>
              <button onClick={() => hasKids && onToggle(node.id)} style={{ width: 18, height: 18, flexShrink: 0, background: 'none', border: 'none', padding: 0, cursor: hasKids ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hasKids ? 1 : 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: isExp ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s' }}>
                  <path d={editSvgPaths.p1f381080} fill="#384857" />
                </svg>
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</span>
            </div>
            {hasKids && isExp && <TreeRows nodes={node.children!} depth={depth + 1} expanded={expanded} onToggle={onToggle} search={search} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

function MappingCard({ title, data }: { title: string; data: TreeNode[] }) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    function walk(nodes: TreeNode[]) { nodes.forEach(n => { init[n.id] = true; if (n.children) walk(n.children); }); }
    walk(data);
    return init;
  });
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#FAFAFA', border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ height: 47, flexShrink: 0, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
      </div>
      <div style={{ height: 32, flexShrink: 0, borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, background: '#FFFFFF', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.36" cy="6.36" r="5.7" stroke="#9CA4AE" strokeWidth="1.3" /><path d="M10.7 10.7L13.7 13.7" stroke="#9CA4AE" strokeWidth="1.3" strokeLinecap="round" /></svg>
        </div>
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', height: '100%', paddingLeft: 26, paddingRight: search ? 22 : 4, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054' }} />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: '#8C8C8C' }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>}
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', background: '#FFFFFF' }}>
        <TreeRows nodes={data} depth={0} expanded={expanded} onToggle={id => setExpanded(p => ({ ...p, [id]: !p[id] }))} search={search} />
      </div>
      <div style={{ height: 48, flexShrink: 0, background: '#FFFFFF', borderTop: '1px solid #F0F0F0' }} />
    </div>
  );
}

function EditMappingView({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 12, gap: 12, background: '#FFFFFF', overflow: 'hidden' }}>
      <div style={{ height: 50, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, padding: '0 13px', background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#616D79' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; }}>
          <svg width="18" height="18" viewBox="0 0 18.5 18.5" fill="none"><path d="M9.25 4V14.5" stroke="#616D79" strokeWidth="2" strokeLinecap="round" /><path d="M4 9.25H14.5" stroke="#616D79" strokeWidth="2" strokeLinecap="round" /></svg>
          Add Crosswalk
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onClose} style={{ height: 36, padding: '0 10px', background: 'none', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>Cancel</button>
          <button style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, padding: '0 13px', background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#616D79' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d={editSvgPaths.p1b13ba98} stroke="#616D79" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.125" /><path d={editSvgPaths.p28f7fe80} stroke="#616D79" strokeWidth="1.125" /><path d={editSvgPaths.p70c2c00} stroke="#616D79" strokeWidth="1.125" /></svg>
            Import
          </button>
          <button onClick={onClose} style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 16px', background: '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}>Save Crosswalk</button>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', gap: 12 }}>
        <MappingCard title="Work Breakdown Structure" data={WBS_DATA} />
        <MappingCard title="Uni Format"               data={UNI_FORMAT_DATA} />
        <MappingCard title="Master Format"            data={MASTER_FORMAT_DATA} />
      </div>
    </div>
  );
}

// =============================================================================
// Main component
// =============================================================================
export function ClassificationCrosswalk() {
  const [search, setSearch]               = useState('');
  const [sortState, setSortState]         = useState<SortState | null>(null);
  const [clearHov, setClearHov]           = useState(false);
  const [showColumns, setShowColumns]     = useState(false);
  const [showEditMapping, setShowEditMapping] = useState(false);

  // ── Column visibility — single source of truth, shared with panel ──────────
  const [colVisibility, setColVisibility] = useState<Record<string, boolean>>(defaultVisibility);
  const [colWidths, setColWidths]         = useState<Record<string, number>>(defaultWidths);

  const onToggleCol = useCallback((key: string) => {
    setColVisibility(p => ({ ...p, [key]: !p[key] }));
  }, []);

  const onToggleAll = useCallback(() => {
    const allVis = ALL_COLUMNS.every(c => colVisibility[c.key]);
    setColVisibility(() => {
      const next: Record<string, boolean> = {};
      ALL_COLUMNS.forEach(c => { next[c.key] = allVis ? c.required : true; });
      return next;
    });
  }, [colVisibility]);

  const onDelta = useCallback((key: string, delta: number) => {
    setColWidths(p => ({ ...p, [key]: Math.max(100, (p[key] ?? 200) + delta) }));
  }, []);

  // ── Columns actually shown in the table ────────────────────────────────────
  const visibleCols = useMemo(() => ALL_COLUMNS.filter(c => colVisibility[c.key]), [colVisibility]);

  function handleSort(key: ColKey) {
    setSortState(p => (!p || p.key !== key) ? { key, dir: 'asc' } : p.dir === 'asc' ? { key, dir: 'desc' } : null);
  }

  const q = search.trim().length >= 2 ? search.trim().toLowerCase() : '';

  const filtered = useMemo(() => {
    let rows = SEED_DATA;
    if (q) {
      rows = rows.filter(r =>
        ALL_COLUMNS.some(c => String(r[c.key as keyof CrosswalkRow] ?? '').toLowerCase().includes(q))
      );
    }
    if (sortState) {
      const { key, dir } = sortState;
      const mul = dir === 'asc' ? 1 : -1;
      rows = [...rows].sort((a, b) =>
        String(a[key as keyof CrosswalkRow] ?? '').localeCompare(String(b[key as keyof CrosswalkRow] ?? '')) * mul
      );
    }
    return rows;
  }, [q, sortState]);

  const tableMinWidth = 72 + visibleCols.reduce((sum, c) => sum + (colWidths[c.key] ?? 200), 0);

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden', background: '#FFFFFF' }}>

      {/* MainCanvas */}
      <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>

        {/* Section header */}
        <div style={{ height: 72, flexShrink: 0, background: '#FFFFFF', borderBottom: '1px solid #D9D9D9', display: 'flex', alignItems: 'center', paddingLeft: 24, paddingRight: 24 }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', color: '#1D2C38', margin: 0 }}>
            Classification Crosswalk
          </h1>
        </div>

        {showEditMapping ? (
          <EditMappingView onClose={() => setShowEditMapping(false)} />
        ) : (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 12, gap: 8, background: '#FFFFFF' }}>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              {/* Search */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 276, flexShrink: 0 }}>
                <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" /><path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <input type="text" placeholder="Search crosswalk…" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: search ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                  onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')} />
                {search && (
                  <button onClick={() => setSearch('')} onMouseEnter={() => setClearHov(true)} onMouseLeave={() => setClearHov(false)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: clearHov ? '#595959' : '#8C8C8C' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                )}
              </div>

              {/* Right buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => setShowColumns(v => !v)}
                  style={{ height: 36, display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', border: showColumns ? '1px solid #616D79' : '1px solid #C3C7CC', borderRadius: 4, background: showColumns ? '#616D79' : '#F2F3F4', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: showColumns ? '#FFFFFF' : '#616D79' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p27e42d00} fill={showColumns ? '#FFFFFF' : '#616D79'} />
                    <path d={svgPaths.p75a9500}  fill={showColumns ? '#FFFFFF' : '#616D79'} />
                    <path d={svgPaths.p34fe9000} fill={showColumns ? '#FFFFFF' : '#616D79'} />
                  </svg>
                  Columns
                  {/* Live badge showing how many columns are visible */}
                  <span style={{ background: showColumns ? 'rgba(255,255,255,0.25)' : '#D9D9D9', borderRadius: 9999, padding: '0 6px', fontSize: 11, fontWeight: 600, lineHeight: '18px' }}>
                    {visibleCols.length}/{ALL_COLUMNS.length}
                  </span>
                </button>
                <button onClick={() => setShowEditMapping(true)}
                  style={{ height: 36, display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', border: 'none', borderRadius: 4, background: '#FF4D00', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d={svgPaths.p5d7ae40} fill="white" /></svg>
                  Edit XWalk
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ flex: 1, minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden', background: '#FAFAFA', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, minHeight: 0, overflowX: 'auto', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: tableMinWidth }}>

                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20, flexShrink: 0 }}>
                    <div style={{ width: 72, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, background: '#FAFAFA', userSelect: 'none' }}>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', whiteSpace: 'nowrap' }}>XWalk ID</span>
                    </div>
                    {visibleCols.map(col => (
                      <HeaderCell
                        key={col.key}
                        label={col.label}
                        colKey={col.key}
                        sortState={sortState}
                        onSort={() => handleSort(col.key)}
                        style={{ width: colWidths[col.key] ?? 200, flexShrink: 0 }}
                        onDelta={onDelta}
                      />
                    ))}
                  </div>

                  {/* Data rows */}
                  {filtered.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                      No results match your search.
                    </div>
                  ) : filtered.map(row => (
                    <div key={row.id}
                      style={{ display: 'flex', alignItems: 'stretch', height: 44, background: '#FFFFFF', borderBottom: '1px solid #F0F0F0', flexShrink: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
                    >
                      {/* XWalk ID pill */}
                      <div style={{ width: 72, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingRight: 8 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, height: 20, padding: '0 8px', background: '#F0F0F0', borderRadius: 9999, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#595959', whiteSpace: 'nowrap' }}>
                          {row.xwalkId}
                        </span>
                      </div>
                      {/* Dynamic columns */}
                      {visibleCols.map(col => (
                        <div key={col.key} style={{ width: colWidths[col.key] ?? 200, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {highlightText(String(row[col.key as keyof CrosswalkRow] ?? ''), search)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row count footer */}
              <div style={{ height: 36, flexShrink: 0, borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', paddingLeft: 16, background: '#FAFAFA' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C' }}>
                  {filtered.length.toLocaleString()} of {SEED_DATA.length.toLocaleString()} rows
                  {q ? ` matching "${search}"` : ''}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>{/* end MainCanvas */}

      {/* Column Settings panel — wired to shared colVisibility state */}
      {!showEditMapping && showColumns && (
        <ColumnSettingsPanel
          onClose={() => setShowColumns(false)}
          colVisibility={colVisibility}
          onToggleCol={onToggleCol}
          onToggleAll={onToggleAll}
        />
      )}
    </div>
  );
}
