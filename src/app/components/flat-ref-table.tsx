/**
 * FlatRefTable — shared 2-level flat reference table component.
 *
 * Controlled component: toolbar lives ENTIRELY in the parent (ReferenceDataTable).
 * This component only renders the table body.
 *
 * Ref-exposed methods: expandAll(), collapseAll(), startEdit(), saveEdit(), cancelEdit()
 */

import React, { useState, useMemo, useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import trashPaths from '../../imports/svg-fjqvq36uqo';
import chevronDownPaths  from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';

// ─── Shared types ─────────────────────────────────────────────────────────────
export interface FlatGroup {
  id: string; name: string; code: string; description: string; active: boolean;
  children: FlatItem[];
}
export interface FlatItem {
  id: string; name: string; code: string; description: string; active: boolean;
  groupId: string | null;
}

// Methods exposed to parent via ref
export interface FlatRefTableHandle {
  expandAll:   () => void;
  collapseAll: () => void;
  startEdit:   () => void;
  saveEdit:    () => void;
  cancelEdit:  () => void;
  hasErrors:   () => boolean;
  addGroup:    () => void;
}

export interface FlatRefTableProps {
  initialData: FlatGroup[];
  groupLabel:  string;
  itemLabel:   string;
  groupPillBg?:    string;
  groupPillColor?: string;
  itemPillBg?:     string;
  itemPillColor?:  string;
  // Controlled from outer toolbar
  search?:   string;
  grouped?:  boolean;
  editMode?: boolean;
  onDataChange?:  (data: FlatGroup[]) => void;
  onEditSave?:    (data: FlatGroup[]) => void;
  onEditCancel?:  () => void;
  onValidationError?: (count: number) => void;
}

// ─── Drag types ───────────────────────────────────────────────────────────────
type DragItem =
  | { type: 'group'; groupId: string; label: string }
  | { type: 'child'; groupId: string; childId: string; label: string };
type DropTarget =
  | { type: 'group';     groupId: string; pos: 'before' | 'after' }
  | { type: 'child';     groupId: string; childId: string; pos: 'before' | 'after' }
  | { type: 'group-end'; groupId: string };

// ─── Sort ─────────────────────────────────────────────────────────────────────
type SortKey = 'groupName' | 'groupCode' | 'itemName' | 'itemCode';
type SortDir = 'asc' | 'desc';
interface SortState { key: SortKey; dir: SortDir }

// ─── ID generator ─────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `frt_${Date.now()}_${++_uid}`; }

// ─── Validation ───────────────────────────────────────────────────────────────
function computeErrors(groups: FlatGroup[]): Map<string, string> {
  const m = new Map<string, string>();
  groups.forEach(g => {
    if (!g.name.trim()) m.set(`${g.id}_name`, 'Name required');
    if (!g.code.trim()) m.set(`${g.id}_code`, 'Code required');
    g.children.forEach(c => {
      if (!c.name.trim()) m.set(`${c.id}_name`, 'Name required');
      if (!c.code.trim()) m.set(`${c.id}_code`, 'Code required');
    });
  });
  return m;
}

// ─── Drag handle — identical to DisciplineTable's DragHandle ─────────────────
function DragHandleEdit({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseDown={onMouseDown} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 28, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', userSelect: 'none', opacity: hov ? 1 : 0.35, transition: 'opacity 0.15s' }}>
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
        {[2, 6, 10, 14].flatMap(cy => [3, 7].map(cx => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill={hov ? '#384857' : '#9CA4AE'} />
        )))}
      </svg>
    </div>
  );
}

// ─── Chevron icon — identical to DisciplineTable's ChevronIcon ────────────────
function ChevronEditIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      {expanded
        ? <path d={chevronDownPaths.p1d4b7280}  fill="#384857" transform="rotate(180 9 9)" />
        : <path d={chevronRightPaths.p1d644480} fill="#384857" transform="rotate(180 9 9)" />
      }
    </svg>
  );
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

// ─── Column header with sort ──────────────────────────────────────────────────
function ColHeader({ label, sortKey, sortState, onSort, style }: {
  label: string; sortKey: SortKey; sortState: SortState | null; onSort: () => void;
  style?: React.CSSProperties;
}) {
  const [hov, setHov] = useState(false);
  const active = sortState?.key === sortKey;
  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 10, paddingRight: 6, cursor: 'pointer', userSelect: 'none', background: hov ? '#EEEFF1' : '#FAFAFA', transition: 'background 0.1s' }}
      onClick={onSort} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ opacity: active || hov ? 1 : 0, transition: 'opacity 0.15s', marginLeft: 4 }}>
        <SortArrows dir={active ? sortState!.dir : null} />
      </span>
    </div>
  );
}

// ─── Editable input — matches DisciplineTable's EditInput exactly ────────────
function EditInput({ value, onChange, placeholder, hasError }: {
  value: string; onChange: (v: string) => void; placeholder?: string; hasError?: boolean;
}) {
  const [focused,  setFocused]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const borderColor = hasError
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');
  return (
    <div style={{ flex: 1, minWidth: 0, position: 'relative', height: 32 }}
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <input type="text" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', height: 32, paddingLeft: 8, paddingRight: hasError ? 28 : 8,
          border: `1px solid ${borderColor}`, borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
          color: '#344054', background: hasError ? '#FFF1F0' : '#FFFFFF',
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }} />
      {hasError && (
        <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Active toggle ────────────────────────────────────────────────────────────
function ActiveToggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!active)} style={{ width: 36, height: 20, borderRadius: 10, background: active ? '#243746' : '#D9D9D9', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', top: 2, left: active ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
    </div>
  );
}

// ─── Icon button ─────────────────────────────────────────────────────────────
function IconBtn({ onClick, title, hoverBg = '#F2F3F4', children }: {
  onClick: () => void; title?: string; hoverBg?: string; children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button title={title} onClick={e => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hov ? hoverBg : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, flexShrink: 0 }}>
      {children}
    </button>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3V13M3 8H13" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 15.2779 14.065" fill="none">
      <path d={trashPaths.p8e10b00}  fill="#616D79" />
      <path d={trashPaths.p2f8a3c00} fill="#616D79" />
    </svg>
  );
}

// ─── Type pill ────────────────────────────────────────────────────────────────
function TypePill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: bg, color, borderRadius: 4, padding: '2px 8px', fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', lineHeight: '16px' }}>
      {label}
    </span>
  );
}

// ─── Drop line ────────────────────────────────────────────────────────────────
function DropLine({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <div style={{ height: 2, background: '#4D7CFE', borderRadius: 1, margin: '0 8px' }} />;
}

// =============================================================================
// Main component (forwardRef so parent can call expandAll / collapseAll / edit)
// =============================================================================
export const FlatRefTable = forwardRef<FlatRefTableHandle, FlatRefTableProps>(function FlatRefTable({
  initialData,
  groupLabel,
  itemLabel,
  groupPillBg    = '#EFF8FF',
  groupPillColor = '#175CD3',
  itemPillBg     = '#F0F2F5',
  itemPillColor  = '#616D79',
  search         = '',
  grouped        = true,
  editMode       = false,
  onDataChange,
  onEditSave,
  onEditCancel,
  onValidationError,
}, ref) {

  const [liveData,   setLiveData]   = useState<FlatGroup[]>(initialData);
  const [sortState,  setSortState]  = useState<SortState | null>(null);
  const [expanded,   setExpanded]   = useState<Set<string>>(() => new Set(initialData.map(g => g.id)));
  const [editGroups, setEditGroups] = useState<FlatGroup[]>([]);
  const [validated,  setValidated]  = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);

  // ── Drag state ────────────────────────────────────────────────────────────
  const dragItemRef    = useRef<DragItem | null>(null);
  const dropTargetRef  = useRef<DropTarget | null>(null);
  const editGroupsRef  = useRef(editGroups);
  const liveDataRef    = useRef(liveData);
  const editModeRef    = useRef(editMode);
  const expandedRef    = useRef(expanded);
  const rafRef         = useRef<number | null>(null);

  useEffect(() => { editGroupsRef.current = editGroups; }, [editGroups]);
  useEffect(() => { liveDataRef.current   = liveData;   }, [liveData]);
  useEffect(() => { editModeRef.current   = editMode;   }, [editMode]);
  useEffect(() => { expandedRef.current   = expanded;   }, [expanded]);

  const [isDragging, setIsDragging] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  useEffect(() => { document.body.style.cursor = isDragging ? 'grabbing' : ''; return () => { document.body.style.cursor = ''; }; }, [isDragging]);
  useEffect(() => { onDataChange?.(liveData); }, [liveData]);

  // When editMode flips to true from outside, initialise editGroups
  useEffect(() => {
    if (editMode) {
      setEditGroups(JSON.parse(JSON.stringify(liveData)));
      setValidated(false);
    }
  }, [editMode]);

  // ── Expose methods to parent ──────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    expandAll:   () => setExpanded(new Set((editMode ? editGroupsRef.current : liveDataRef.current).map(g => g.id))),
    collapseAll: () => setExpanded(new Set()),
    startEdit:   () => { setEditGroups(JSON.parse(JSON.stringify(liveData))); setValidated(false); },
    saveEdit:    () => {
      setValidated(true);
      const errors = computeErrors(editGroupsRef.current);
      if (errors.size > 0) { onValidationError?.(errors.size); return; }
      const saved = editGroupsRef.current;
      setLiveData(saved);
      setEditGroups([]);
      setValidated(false);
      onEditSave?.(saved);
    },
    cancelEdit:  () => { setEditGroups([]); setValidated(false); onEditCancel?.(); },
    hasErrors:   () => computeErrors(editGroupsRef.current).size > 0,
    addGroup:    () => addGroup(),
  }));

  // ── Drop logic ────────────────────────────────────────────────────────────
  function performDrop(target: DropTarget) {
    const item   = dragItemRef.current!;
    const isEdit = editModeRef.current;
    const data: FlatGroup[] = JSON.parse(JSON.stringify(isEdit ? editGroupsRef.current : liveDataRef.current));

    if (item.type === 'group' && target.type === 'group') {
      const fi = data.findIndex(g => g.id === item.groupId);
      const [removed] = data.splice(fi, 1);
      const ti = data.findIndex(g => g.id === target.groupId);
      data.splice(target.pos === 'before' ? ti : ti + 1, 0, removed);
      if (isEdit) setEditGroups(data); else setLiveData(data);
      return;
    }
    if (item.type === 'child') {
      if (target.type === 'group-end') {
        let removed: FlatItem | null = null;
        for (const g of data) { const i = g.children.findIndex(c => c.id === item.childId); if (i >= 0) { [removed] = g.children.splice(i, 1); break; } }
        if (!removed) return;
        const tg = data.find(g => g.id === target.groupId);
        if (tg) { removed.groupId = tg.id; tg.children.push(removed); }
        setExpanded(p => new Set([...p, target.groupId]));
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }
      if (target.type === 'child') {
        let removed: FlatItem | null = null;
        for (const g of data) { const i = g.children.findIndex(c => c.id === item.childId); if (i >= 0) { [removed] = g.children.splice(i, 1); break; } }
        if (!removed) return;
        for (const g of data) {
          if (g.id === target.groupId) {
            const ti = g.children.findIndex(c => c.id === target.childId);
            removed.groupId = g.id;
            g.children.splice(target.pos === 'before' ? ti : ti + 1, 0, removed);
            break;
          }
        }
        if (isEdit) setEditGroups(data); else setLiveData(data);
        return;
      }
    }
  }

  function findDropTarget(x: number, y: number, dragId: string): DropTarget | null {
    for (const el of document.elementsFromPoint(x, y)) {
      let rowEl: Element | null = el;
      while (rowEl && !rowEl.hasAttribute('data-frt-id')) rowEl = rowEl.parentElement;
      if (!rowEl) continue;
      const id       = rowEl.getAttribute('data-frt-id')!;
      const parentId = rowEl.getAttribute('data-frt-parent');
      const isGroupEnd = rowEl.getAttribute('data-frt-group-end') === 'true';
      if (id === dragId) return null;
      if (isGroupEnd) return { type: 'group-end', groupId: id };
      const rect = rowEl.getBoundingClientRect();
      const relY = y - rect.top;
      if (parentId) {
        return relY < rect.height * 0.5
          ? { type: 'child', groupId: parentId, childId: id, pos: 'before' }
          : { type: 'child', groupId: parentId, childId: id, pos: 'after' };
      } else {
        return relY < rect.height * 0.5
          ? { type: 'group', groupId: id, pos: 'before' }
          : { type: 'group', groupId: id, pos: 'after' };
      }
    }
    return null;
  }

  function onHandleMouseDown(e: React.MouseEvent, item: DragItem) {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startY = e.clientY;
    let moved = false;
    const onMove = (me: MouseEvent) => {
      if (!moved && Math.hypot(me.clientX - startX, me.clientY - startY) < 4) return;
      if (!moved) {
        moved = true;
        dragItemRef.current = item;
        setIsDragging(true);
        setDraggingId(item.type === 'group' ? item.groupId : item.childId);
        if (!editModeRef.current) {
          const cur = expandedRef.current;
          if (item.type === 'group' && cur.has(item.groupId)) setExpanded(p => { const n = new Set(p); n.delete(item.groupId); return n; });
        }
      }
      setPreviewPos({ x: me.clientX + 14, y: me.clientY + 8 });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const id = item.type === 'group' ? item.groupId : item.childId;
        const t = findDropTarget(me.clientX, me.clientY, id);
        dropTargetRef.current = t;
        setDropTarget(t);
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (moved && dropTargetRef.current) performDrop(dropTargetRef.current);
      dragItemRef.current = null; dropTargetRef.current = null;
      setIsDragging(false); setDraggingId(null); setDropTarget(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ── Edit CRUD ─────────────────────────────────────────────────────────────
  function patchGroup(gId: string, patch: Partial<FlatGroup>) {
    setEditGroups(p => p.map(g => g.id === gId ? { ...g, ...patch } : g));
  }
  function patchItem(gId: string, cId: string, patch: Partial<FlatItem>) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.map(c => c.id === cId ? { ...c, ...patch } : c) }));
  }
  function addGroup() {
    const id = uid();
    setEditGroups(p => [...p, { id, name: '', code: '', description: '', active: true, children: [] }]);
    setExpanded(p => new Set([...p, id]));
    setTimeout(() => { if (tableRef.current) tableRef.current.scrollTop = tableRef.current.scrollHeight; }, 50);
  }
  function addGroupSiblingAfter(gId: string) {
    const id = uid();
    setEditGroups(p => { const i = p.findIndex(g => g.id === gId); const n = [...p]; n.splice(i < 0 ? n.length : i + 1, 0, { id, name: '', code: '', description: '', active: true, children: [] }); return n; });
    setExpanded(p => new Set([...p, id]));
  }
  function deleteGroup(gId: string) { setEditGroups(p => p.filter(g => g.id !== gId)); }
  function addItem(gId: string) {
    const id = uid();
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: [...g.children, { id, name: '', code: '', description: '', active: true, groupId: gId }] }));
    setExpanded(p => new Set([...p, gId]));
    setTimeout(() => {
      if (tableRef.current) { const rows = tableRef.current.querySelectorAll('[data-frt-type="child"]'); rows[rows.length - 1]?.scrollIntoView({ block: 'nearest' }); }
    }, 50);
  }
  function addItemSiblingAfter(gId: string, cId: string) {
    const id = uid();
    setEditGroups(p => p.map(g => { if (g.id !== gId) return g; const i = g.children.findIndex(c => c.id === cId); const n = [...g.children]; n.splice(i < 0 ? n.length : i + 1, 0, { id, name: '', code: '', description: '', active: true, groupId: gId }); return { ...g, children: n }; }));
    setExpanded(p => new Set([...p, gId]));
  }
  function deleteItem(gId: string, cId: string) {
    setEditGroups(p => p.map(g => g.id !== gId ? g : { ...g, children: g.children.filter(c => c.id !== cId) }));
  }

  const toggleExpand = useCallback((id: string) => {
    setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  function handleSort(key: SortKey) {
    setSortState(p => (!p || p.key !== key) ? { key, dir: 'asc' } : p.dir === 'asc' ? { key, dir: 'desc' } : null);
  }

  // ── Filtered / sorted data ────────────────────────────────────────────────
  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';

  const viewGroups = useMemo(() => {
    let groups = liveData.map(g => {
      const gMatch = !q || g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q);
      const mc = q ? g.children.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || gMatch) : g.children;
      if (q && !gMatch && mc.length === 0) return null;
      return { ...g, matchedChildren: mc };
    }).filter(Boolean) as (FlatGroup & { matchedChildren: FlatItem[] })[];
    return groups;
  }, [liveData, q]);

  type FlatRow = { g: FlatGroup; c: FlatItem };
  const flatView = useMemo((): FlatRow[] => {
    const rows: FlatRow[] = [];
    for (const g of liveData) {
      const gMatch = !q || g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q);
      const children = q ? g.children.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || gMatch) : g.children;
      for (const c of children) rows.push({ g, c });
    }
    if (!sortState) return rows;
    const { key, dir } = sortState; const mul = dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = key === 'groupName' ? a.g.name : key === 'groupCode' ? a.g.code : key === 'itemName' ? a.c.name : a.c.code;
      const bv = key === 'groupName' ? b.g.name : key === 'groupCode' ? b.g.code : key === 'itemName' ? b.c.name : b.c.code;
      return av.localeCompare(bv) * mul;
    });
  }, [liveData, q, sortState]);

  const editErrors = (editMode && validated) ? computeErrors(editGroups) : new Map<string, string>();
  const displayGroups = editMode
    ? editGroups.map(g => ({ ...g, matchedChildren: g.children }))
    : viewGroups;

  const ROW_H = 48, HEADER_H = 44;
  // ── Shared column constants — SAME widths in view + edit so nothing jumps ──
  const C_NAME = 480, C_CODE = 120, C_TYPE = 110, C_ACT = 44;
  const C_DRAG = 28, C_CHILD_INDENT = 48;
  // ── Flat list view has its own layout (different number of columns) ────────
  const COL_CODE_FLAT = 130, COL_NOTE = 220;
  const COL_CODE_FLAT_G = 100, COL_NAME_FLAT_G = 180;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div ref={tableRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'auto' }}>

      {/* ── EDIT MODE — same fixed column widths as DisciplineTable ──────────── */}
      {editMode && (
        <div style={{ minWidth: C_DRAG + C_NAME + C_CODE + C_TYPE + C_ACT }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
            <div style={{ width: C_DRAG, flexShrink: 0 }} />
            <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>
              {groupLabel} / {itemLabel} Title <span style={{ color: '#FF4D4F', marginLeft: 2 }}>*</span>
            </div>
            <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>
              Code <span style={{ color: '#FF4D4F', marginLeft: 2 }}>*</span>
            </div>
            <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>
              Type
            </div>
            <div style={{ width: C_ACT, flexShrink: 0, background: '#FAFAFA', position: 'sticky', right: 0, zIndex: 21 }} />
          </div>

          {editGroups.map(g => {
            const isExpanded     = expanded.has(g.id);
            const isDraggingThis = draggingId === g.id;
            const dropBefore = dropTarget?.type === 'group' && dropTarget.groupId === g.id && dropTarget.pos === 'before';
            const dropAfter  = dropTarget?.type === 'group' && dropTarget.groupId === g.id && dropTarget.pos === 'after';
            return (
              <React.Fragment key={g.id}>
                <DropLine visible={dropBefore} />

                {/* Group row — D&T-identical structure */}
                <div data-frt-id={g.id} data-frt-type="group"
                  style={{ display: 'flex', alignItems: 'stretch', height: ROW_H, background: isDraggingThis ? '#F0F7FF' : '#F5F6F7', borderBottom: '1px solid #EEEFF1', transition: 'background 0.1s', opacity: isDraggingThis ? 0.5 : 1 }}>

                  <DragHandleEdit onMouseDown={e => onHandleMouseDown(e, { type: 'group', groupId: g.id, label: g.name || `New ${groupLabel}` })} />

                  {/* Name: FIXED 480px, paddingLeft:4, gap:6, chevron+input — same as D&T */}
                  <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 4, paddingRight: 8, gap: 6, overflow: 'hidden' }}>
                    <button onClick={() => toggleExpand(g.id)} style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                      <ChevronEditIcon expanded={isExpanded} />
                    </button>
                    <EditInput value={g.name} onChange={v => patchGroup(g.id, { name: v })} placeholder={`${groupLabel} name`} hasError={!!editErrors.get(`${g.id}_name`)} />
                  </div>

                  {/* Code: FIXED 120px */}
                  <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                    <EditInput value={g.code} onChange={v => patchGroup(g.id, { code: v })} placeholder="CODE" hasError={!!editErrors.get(`${g.id}_code`)} />
                  </div>

                  {/* Type: FIXED 110px */}
                  <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TypePill label={groupLabel} bg={groupPillBg} color={groupPillColor} />
                  </div>

                  {/* Trash — sticky-right */}
                  <div style={{ width: C_ACT, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', right: 0, zIndex: 4, background: 'inherit' }}>
                    <IconBtn title={`Delete ${groupLabel}`} onClick={() => deleteGroup(g.id)} hoverBg="#FFF1F0"><TrashIcon /></IconBtn>
                  </div>
                </div>

                <DropLine visible={dropAfter && g.children.length === 0} />

                {/* Child rows — D&T-identical: FIXED 480px name, paddingLeft:48px, no chevron */}
                {isExpanded && g.children.map(c => {
                  const isDragChild = draggingId === c.id;
                  const dropCB = dropTarget?.type === 'child' && dropTarget.groupId === g.id && dropTarget.childId === c.id && dropTarget.pos === 'before';
                  const dropCA = dropTarget?.type === 'child' && dropTarget.groupId === g.id && dropTarget.childId === c.id && dropTarget.pos === 'after';
                  return (
                    <React.Fragment key={c.id}>
                      <DropLine visible={dropCB} />
                      <div data-frt-id={c.id} data-frt-parent={g.id} data-frt-type="child"
                        style={{ display: 'flex', alignItems: 'stretch', height: ROW_H, background: isDragChild ? '#F0F7FF' : 'white', borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s', opacity: isDragChild ? 0.5 : 1 }}
                        onMouseEnter={e => { if (!isDragChild) e.currentTarget.style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { if (!isDragChild) e.currentTarget.style.background = 'white'; }}>

                        <DragHandleEdit onMouseDown={e => onHandleMouseDown(e, { type: 'child', groupId: g.id, childId: c.id, label: c.name || `New ${itemLabel}` })} />

                        {/* Name: FIXED 480px, paddingLeft:48px, no chevron — same as D&T trades */}
                        <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: C_CHILD_INDENT, paddingRight: 8, overflow: 'hidden' }}>
                          <EditInput value={c.name} onChange={v => patchItem(g.id, c.id, { name: v })} placeholder={`${itemLabel} name`} hasError={!!editErrors.get(`${c.id}_name`)} />
                        </div>

                        {/* Code: FIXED 120px */}
                        <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
                          <EditInput value={c.code} onChange={v => patchItem(g.id, c.id, { code: v })} placeholder="CODE" hasError={!!editErrors.get(`${c.id}_code`)} />
                        </div>

                        {/* Type: FIXED 110px */}
                        <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TypePill label={itemLabel} bg={itemPillBg} color={itemPillColor} />
                        </div>

                        {/* Trash — sticky-right */}
                        <div style={{ width: C_ACT, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', right: 0, zIndex: 4, background: 'inherit' }}>
                          <IconBtn title={`Delete ${itemLabel}`} onClick={() => deleteItem(g.id, c.id)} hoverBg="#FFF1F0"><TrashIcon /></IconBtn>
                        </div>
                      </div>
                      <DropLine visible={dropCA} />
                    </React.Fragment>
                  );
                })}

                {/* Ghost row — "Add [itemLabel] to [groupLabel]", same as D&T "Add trade to [group]" */}
                {isExpanded && (
                  <div style={{ display: 'flex', alignItems: 'center', height: 32, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', cursor: 'pointer', paddingLeft: C_DRAG + C_CHILD_INDENT, gap: 6 }}
                    onClick={() => addItem(g.id)}
                    onMouseEnter={e => (e.currentTarget.style.background = '#E6F7FF')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#FAFAFA')}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#1890FF', fontWeight: 400 }}>
                      Add {itemLabel} to {g.name || groupLabel}
                    </span>
                  </div>
                )}

                {isExpanded && isDragging && (
                  <div data-frt-id={g.id} data-frt-group-end="true"
                    style={{ height: 4, background: dropTarget?.type === 'group-end' && dropTarget.groupId === g.id ? '#EBF3FF' : 'transparent' }} />
                )}
                <DropLine visible={dropAfter && g.children.length > 0} />
              </React.Fragment>
            );
          })}

          {editGroups.length === 0 && (
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8C8C8C', fontFamily: 'Open Sans, sans-serif', fontSize: 14 }}>
              No {groupLabel}s yet.
            </div>
          )}
        </div>
      )}

      {/* ── VIEW: FLAT LIST ────────────────────────────────────────────────── */}
      {!editMode && !grouped && (
        <div style={{ minWidth: 600 }}>
          <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #E8EAED', position: 'sticky', top: 0, zIndex: 10 }}>
            <ColHeader label={groupLabel}          sortKey="groupName" sortState={sortState} onSort={() => handleSort('groupName')} style={{ width: COL_NAME_FLAT_G, flexShrink: 0 }} />
            <ColHeader label={`${groupLabel} Code`} sortKey="groupCode" sortState={sortState} onSort={() => handleSort('groupCode')} style={{ width: COL_CODE_FLAT_G, flexShrink: 0 }} />
            <ColHeader label={itemLabel}            sortKey="itemName"  sortState={sortState} onSort={() => handleSort('itemName')}  style={{ flex: 1 }} />
            <ColHeader label={`${itemLabel} Code`}  sortKey="itemCode"  sortState={sortState} onSort={() => handleSort('itemCode')}  style={{ width: COL_CODE_FLAT, flexShrink: 0 }} />
            <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Type</div>
            <div style={{ width: COL_NOTE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 10, background: '#FAFAFA', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Note</div>
          </div>
          {flatView.length === 0
            ? <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8C8C8C', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>No results</div>
            : flatView.map(({ g, c }) => (
              <div key={`${g.id}-${c.id}`}
                style={{ display: 'flex', alignItems: 'center', height: ROW_H, background: '#FFFFFF', borderBottom: '1px solid #F0F0F0' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}>
                <div style={{ width: COL_NAME_FLAT_G, flexShrink: 0, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{g.name}</span>
                </div>
                <div style={{ width: COL_CODE_FLAT_G, flexShrink: 0, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{g.code}</span>
                </div>
                <div style={{ flex: 1, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.name}</span>
                </div>
                <div style={{ width: COL_CODE_FLAT, flexShrink: 0, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.code}</span>
                </div>
                <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TypePill label={itemLabel} bg={itemPillBg} color={itemPillColor} />
                </div>
                <div style={{ width: COL_NOTE, flexShrink: 0, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.description}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ── VIEW: GROUPED TREE ─────────────────────────────────────────────── */}
      {!editMode && grouped && (
        <div style={{ minWidth: C_NAME + C_CODE + C_TYPE + COL_NOTE + 36 }}>
          <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #E8EAED', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 10, fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Title</div>
            <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 10, fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Code</div>
            <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Type</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 10, fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Note</div>
          </div>

          {displayGroups.length === 0
            ? <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8C8C8C', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>No results</div>
            : displayGroups.map(g => {
              const isExpanded = expanded.has(g.id);
              return (
                <React.Fragment key={g.id}>
                  <div data-frt-id={g.id} data-frt-type="group"
                    style={{ display: 'flex', alignItems: 'center', height: ROW_H, background: '#F9FAFB', borderBottom: '1px solid #E8EAED', cursor: 'pointer' }}
                    onClick={() => toggleExpand(g.id)}>
                    <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                      <ChevronEditIcon expanded={isExpanded} />
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</span>
                    </div>
                    <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, overflow: 'hidden' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.code}</span>
                    </div>
                    <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TypePill label={groupLabel} bg={groupPillBg} color={groupPillColor} />
                    </div>
                    <div style={{ flex: 1, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{g.description}</span>
                    </div>
                  </div>

                  {isExpanded && g.matchedChildren.map(c => (
                    <div key={c.id}
                      style={{ display: 'flex', alignItems: 'center', height: ROW_H, background: '#FFFFFF', borderBottom: '1px solid #F0F0F0' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}>
                      <div style={{ width: C_NAME, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 12 + C_CHILD_INDENT, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                      </div>
                      <div style={{ width: C_CODE, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#595959', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.code}</span>
                      </div>
                      <div style={{ width: C_TYPE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TypePill label={itemLabel} bg={itemPillBg} color={itemPillColor} />
                      </div>
                      <div style={{ flex: 1, paddingLeft: 10, paddingRight: 8, overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{c.description}</span>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
        </div>
      )}

      {/* Drag preview */}
      {isDragging && dragItemRef.current && (
        <div style={{ position: 'fixed', left: previewPos.x, top: previewPos.y, background: '#243746', color: '#FFFFFF', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontFamily: 'Inter, sans-serif', pointerEvents: 'none', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
          {dragItemRef.current.label || (dragItemRef.current.type === 'group' ? `New ${groupLabel}` : `New ${itemLabel}`)}
        </div>
      )}
    </div>
  );
});

// ─── Utility: convert 2-level RefItem[] → FlatGroup[] ────────────────────────
export function refItemsToFlatGroups(items: { id: string; name: string; code: string; description: string; children: { id: string; name: string; code: string; description: string; children: unknown[] }[] }[]): FlatGroup[] {
  return items.map(item => ({
    id: item.id, name: item.name, code: item.code, description: item.description, active: true,
    children: item.children.map(c => ({ id: c.id, name: c.name, code: c.code, description: c.description, active: true, groupId: item.id })),
  }));
}
