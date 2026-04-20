import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { INITIAL_USERS, User } from './users-table';
import { ROLES_DATA, RoleGroup, RoleChild } from './roles-table';
import type { TeamMember, MemberType } from './teams-table';

// ─── DnD type tokens ──────────────────────────────────────────────────────────
const DRAG_AVAIL = 'AP_AVAIL';
const DRAG_CART  = 'AP_CART';

// ─── Participant item ─────────────────────────────────────────────────────────
export interface ParticipantItem {
  id:          string;
  type:        MemberType;
  name:        string;
  col2:        string;   // email / trade / offices
  description: string;   // for cart "Description" column (company / group / offices)
  avatarBg?:   string;
  avatarText?: string;
  userId?:     number;
}

type DragPayload = { items: ParticipantItem[] };

// ─── Trade code → readable label ──────────────────────────────────────────────
const TRADE_LABELS: Record<string, string> = {
  't-cm':     'Construction Management',
  't-gc':     'General Contractor',
  't-fac':    'Facilities',
  't-arch':   'Architecture',
  't-seng':   'Structural Engineering',
  't-civil':  'Civil Engineering',
  't-mepeng': 'MEP Engineering',
  't-plmb':   'Plumbing',
  't-fire':   'Fire Protection',
  't-bim':    'BIM / Digital',
  't-safe':   'Health & Safety',
};

// ─── Colour helpers ────────────────────────────────────────────────────────────
const USER_COLORS = ['#3B5998','#E4405F','#2D8653','#9B59B6','#E67E22','#1ABC9C','#E74C3C','#34495E','#16A085','#8E44AD'];

const COMPANY_COLORS: Record<string, [string, string]> = {
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

// ─── Build catalog lists ───────────────────────────────────────────────────────
function buildMemberItems(): ParticipantItem[] {
  return INITIAL_USERS.map((u: User) => {
    const initials = u.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
    return {
      id:          `m-${u.id}`,
      type:        'member' as MemberType,
      name:        u.name,
      col2:        u.email,
      description: u.company,
      avatarBg:    USER_COLORS[u.id % USER_COLORS.length],
      avatarText:  initials,
      userId:      u.id,
    };
  });
}

function buildRoleItems(): ParticipantItem[] {
  const items: ParticipantItem[] = [];
  ROLES_DATA.forEach((group: RoleGroup) => {
    group.children.forEach((child: RoleChild) => {
      const tradeLabel = TRADE_LABELS[child.trade ?? ''] ?? child.trade ?? '—';
      items.push({
        id:          `r-${child.id}`,
        type:        'role' as MemberType,
        name:        child.name,
        col2:        tradeLabel,
        description: group.name,
      });
    });
  });
  return items;
}

function buildCompanyItems(): ParticipantItem[] {
  // Derive distinct companies from INITIAL_USERS, collect unique offices per company
  const companyOffices = new Map<string, Set<string>>();
  INITIAL_USERS.forEach((u: User) => {
    if (!companyOffices.has(u.company)) companyOffices.set(u.company, new Set());
    companyOffices.get(u.company)!.add(u.office);
  });

  // Also include companies from COMPANY_COLORS that might not appear in INITIAL_USERS
  Object.keys(COMPANY_COLORS).forEach(name => {
    if (!companyOffices.has(name)) companyOffices.set(name, new Set());
  });

  const items: ParticipantItem[] = [];
  companyOffices.forEach((offices, name) => {
    const [bg] = COMPANY_COLORS[name] ?? ['#F5F5F5', '#616D79'];
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const officeList = [...offices].sort();

    if (officeList.length === 0) {
      // Company with no known offices — show as single row
      items.push({
        id:          `c-${name.replace(/\s+/g, '-').toLowerCase()}`,
        type:        'company' as MemberType,
        name,
        col2:        '—',
        description: '—',
        avatarBg:    bg,
        avatarText:  initials,
      });
    } else {
      // One row per office location
      officeList.forEach(office => {
        items.push({
          id:          `c-${name.replace(/\s+/g, '-').toLowerCase()}-${office.replace(/\s+/g, '-').toLowerCase()}`,
          type:        'company' as MemberType,
          name,
          col2:        office,
          description: office,
          avatarBg:    bg,
          avatarText:  initials,
        });
      });
    }
  });
  return items.sort((a, b) => a.name.localeCompare(b.name) || a.col2.localeCompare(b.col2));
}

const ALL_MEMBERS   = buildMemberItems();
const ALL_ROLES     = buildRoleItems();
const ALL_COMPANIES = buildCompanyItems();

// ─── Highlight helper ─────────────────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q   = query.trim().toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ background: '#FCFE58' }}>{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function PanelCheckbox({ checked, indeterminate, onChange, disabled }: {
  checked: boolean; indeterminate?: boolean; onChange: () => void; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={e => { if (disabled) return; e.stopPropagation(); onChange(); }}
      style={{
        width: 15, height: 15, borderRadius: 3, flexShrink: 0,
        border: `1px solid ${disabled ? '#D9D9D9' : checked || indeterminate ? '#FF4D00' : '#9EA2A8'}`,
        background: disabled ? '#F5F5F5' : checked || indeterminate ? '#FF4D00' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.12s',
      }}
    >
      {!disabled && indeterminate && !checked && (
        <svg width="7" height="2" viewBox="0 0 7 2" fill="none">
          <path d="M0.5 1H6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {!disabled && checked && (
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M1 3L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ─── Member avatar (circle with initials) ────────────────────────────────────
function MemberAvatar({ item, isDisabled }: { item: ParticipantItem; isDisabled: boolean }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
      background: isDisabled ? '#D9D9D9' : (item.avatarBg ?? '#9B59B6'),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'Open Sans, sans-serif', fontSize: 10, fontWeight: 700,
        color: isDisabled ? '#9CA4AE' : 'white',
      }}>
        {item.avatarText}
      </span>
    </div>
  );
}

// ─── Draggable row ────────────────────────────────────────────────────────────
interface DraggableRowProps {
  item:          ParticipantItem;
  isDisabled:    boolean;
  isSelected:    boolean;
  rowIndex:      number;
  dragType:      string;
  onClick:       () => void;
  query?:        string;
  selectedItems: ParticipantItem[];
  showAvatar:    boolean;
  col1Label:     string;
  col2Label:     string;
  col2Getter?:   (item: ParticipantItem) => string;
}

function DraggableRow({
  item, isDisabled, isSelected, rowIndex, dragType,
  onClick, query, selectedItems, showAvatar, col2Getter,
}: DraggableRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const getPayload = (): ParticipantItem[] =>
    isSelected && selectedItems.length > 0 ? selectedItems : [item];

  const [{ isDragging }, drag] = useDrag<DragPayload, void, { isDragging: boolean }>({
    type: dragType,
    item: () => ({ items: getPayload() }),
    canDrag: !isDisabled,
    collect: m => ({ isDragging: m.isDragging() }),
  });
  drag(rowRef);

  const bg = isDisabled ? '#F7F8FA' : isSelected ? '#FFF3EE' : rowIndex % 2 === 0 ? '#FFFFFF' : '#FAFAFA';

  const nameColor   = isDisabled ? '#B0B8C1' : '#1B2736';
  const col2Color   = isDisabled ? '#C4C8CC' : '#616D79';

  return (
    <div
      ref={rowRef}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', height: 40,
        padding: '0 8px', gap: 0,
        borderBottom: '1px solid #F0F0F0',
        background: bg,
        opacity: isDragging ? 0.35 : 1,
        cursor: isDisabled ? 'not-allowed' : isDragging ? 'grabbing' : 'pointer',
        transition: 'background 0.1s',
      }}
    >
      {/* Grip dots */}
      <div style={{ width: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isDisabled ? 0 : 0.3 }}>
        {!isDisabled && (
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            {[1.5, 5, 8.5].flatMap(cy => [1.5, 4.5].map(cx => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" fill="#9CA4AE" />
            )))}
          </svg>
        )}
      </div>

      {/* Checkbox */}
      <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PanelCheckbox
          checked={isDisabled || isSelected}
          onChange={() => { if (!isDisabled) onClick(); }}
          disabled={isDisabled}
        />
      </div>

      {/* Col 1: Avatar (members only) + Name */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, paddingRight: 12 }}>
        {showAvatar && <MemberAvatar item={item} isDisabled={isDisabled} />}
        <span style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: showAvatar ? 500 : 400,
          color: nameColor,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {query && !isDisabled ? <Highlight text={item.name} query={query} /> : item.name}
        </span>
      </div>

      {/* Col 2: email / trade / offices */}
      <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
        <span style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: 12,
          color: col2Color,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block',
        }}>
          {col2Getter
            ? col2Getter(item)
            : query && !isDisabled
              ? <Highlight text={item.col2} query={query} />
              : item.col2}
        </span>
      </div>
    </div>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────
interface PanelProps {
  title:         string;
  items:         ParticipantItem[];
  selectedIds:   Set<string>;
  onToggleRow:   (id: string) => void;
  onToggleAll:   () => void;
  filterValue:   string;
  onFilterChange:(v: string) => void;
  disabledIds:   Set<string>;
  emptyMessage?: string;
  query?:        string;
  dragType:      string;
  dropType:      string;
  onDrop:        (items: ParticipantItem[]) => void;
  showAvatar:    boolean;
  col1Label:     string;
  col2Label:     string;
  col2Getter?:   (item: ParticipantItem) => string;
}

function ParticipantPanel({
  title, items, selectedIds, onToggleRow, onToggleAll,
  filterValue, onFilterChange, disabledIds, emptyMessage,
  query, dragType, dropType, onDrop,
  showAvatar, col1Label, col2Label, col2Getter,
}: PanelProps) {
  const selectable   = useMemo(() => items.filter(i => !disabledIds.has(i.id)), [items, disabledIds]);
  const allSelected  = selectable.length > 0 && selectable.every(i => selectedIds.has(i.id));
  const someSelected = !allSelected && selectable.some(i => selectedIds.has(i.id));
  const selectedList = useMemo(() => items.filter(i => selectedIds.has(i.id) && !disabledIds.has(i.id)), [items, selectedIds, disabledIds]);

  const filtered = useMemo(() => {
    const q = filterValue.trim().toLowerCase();
    return q
      ? items.filter(i =>
          i.name.toLowerCase().includes(q) ||
          i.col2.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
        )
      : items;
  }, [items, filterValue]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop, dragCount }, drop] = useDrop<DragPayload, void, { isOver: boolean; canDrop: boolean; dragCount: number }>({
    accept: dropType,
    canDrop: () => true,
    drop: payload => onDrop(payload.items),
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop(), dragCount: (m.getItem() as DragPayload | null)?.items.length ?? 0 }),
  });
  drop(scrollRef);

  const dropActive = isOver && canDrop;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, minHeight: 0 }}>
      {/* Panel title */}
      <p style={{
        fontFamily: 'Actor, sans-serif', fontSize: 17, color: '#1B2736',
        marginBottom: 8, flexShrink: 0,
      }}>
        {title}
        {selectable.length > 0 && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9EA2A8', marginLeft: 8 }}>
            ({selectable.length} available)
          </span>
        )}
      </p>

      {/* Card */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, background: 'white',
        borderRadius: 4, overflow: 'hidden',
        border: dropActive ? '2px solid #FF4D00' : '1px solid #D9D9D9',
        boxShadow: dropActive ? '0 0 0 3px rgba(255,77,0,0.12)' : 'none',
        transition: 'border 0.15s, box-shadow 0.15s',
      }}>

        {/* Search filter */}
        <div style={{ padding: '7px 10px', background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'white', border: '1px solid #D9D9D9',
            borderRadius: 4, padding: '0 8px', height: 32,
          }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="8.5" cy="8.5" r="7.5" stroke="#9CA4AE" strokeWidth="1.5" />
              <path d="M14 14L19 19" stroke="#9CA4AE" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder="Search filter"
              value={filterValue}
              onChange={e => onFilterChange(e.target.value)}
              style={{
                flex: 1, fontSize: 13, color: '#1B2736', outline: 'none',
                border: 'none', background: 'transparent',
                fontFamily: 'Open Sans, sans-serif',
              }}
            />
            {filterValue && (
              <button
                onClick={() => onFilterChange('')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2L10 10M10 2L2 10" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'flex', alignItems: 'center', height: 34,
          padding: '0 8px', gap: 0,
          background: '#FAFAFA', borderBottom: '1px solid #9EA3A9', flexShrink: 0,
        }}>
          {/* Grip spacer */}
          <div style={{ width: 12, flexShrink: 0 }} />
          {/* Checkbox */}
          <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PanelCheckbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onToggleAll}
              disabled={selectable.length === 0}
            />
          </div>
          {/* Avatar spacer for header alignment */}
          {showAvatar && <div style={{ width: 36, flexShrink: 0 }} />}
          {/* Col 1 label */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857' }}>
              {col1Label}
            </span>
          </div>
          {/* Col 2 label + selection badge */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', paddingRight: 8 }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857' }}>
              {col2Label}
            </span>
            {selectedList.length > 0 && (
              <span style={{
                marginLeft: 'auto', background: '#FF4D00', color: 'white',
                borderRadius: 10, fontSize: 10, fontWeight: 700,
                fontFamily: 'Inter, sans-serif', padding: '1px 7px', lineHeight: '16px',
              }}>
                {selectedList.length} selected
              </span>
            )}
          </div>
        </div>

        {/* Rows */}
        <div
          ref={scrollRef}
          style={{
            flex: 1, minHeight: 0, overflowY: 'auto',
            background: dropActive ? 'rgba(255,77,0,0.03)' : 'transparent',
            transition: 'background 0.15s',
          }}
        >
          {dropActive && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              height: 32, background: 'rgba(255,77,0,0.10)', borderBottom: '1px dashed #FF4D00',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="#FF4D00" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#FF4D00', fontWeight: 500 }}>
                Drop {dragCount > 1 ? `${dragCount} items` : '1 item'} here
              </span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', padding: 24, gap: 8,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity={0.35}>
                <circle cx="11" cy="11" r="8" stroke="#9CA4AE" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#9CA4AE', textAlign: 'center' }}>
                {emptyMessage ?? (items.length === 0 ? 'No items to display' : 'No results match your filter')}
              </span>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <DraggableRow
                key={item.id}
                item={item}
                isDisabled={disabledIds.has(item.id)}
                isSelected={selectedIds.has(item.id)}
                rowIndex={idx}
                dragType={dragType}
                onClick={() => { if (!disabledIds.has(item.id)) onToggleRow(item.id); }}
                query={query}
                selectedItems={selectedList}
                showAvatar={showAvatar}
                col1Label={col1Label}
                col2Label={col2Label}
                col2Getter={col2Getter}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tab type ─────────────────────────────────────────────────────────────────
type TabKey = 'member' | 'role' | 'company';

// ─── Tab icons ────────────────────────────────────────────────────────────────
function TabMemberIcon({ active }: { active: boolean }) {
  const c = active ? '#1B2736' : '#6B7280';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.2" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function TabRoleIcon({ active }: { active: boolean }) {
  const c = active ? '#1B2736' : '#6B7280';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.2" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function TabCompanyIcon({ active }: { active: boolean }) {
  const c = active ? '#1B2736' : '#6B7280';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M9 21V12h6v9M3 21h18" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="7" width="2" height="2" rx="0.3" stroke={c} strokeWidth="1.2" />
      <rect x="11" y="7" width="2" height="2" rx="0.3" stroke={c} strokeWidth="1.2" />
      <rect x="15" y="7" width="2" height="2" rx="0.3" stroke={c} strokeWidth="1.2" />
    </svg>
  );
}

// ─── Arrow icons ──────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8H13M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────
const TAB_CONFIG: Record<TabKey, { col1: string; col2: string }> = {
  member:  { col1: 'Name',         col2: 'Email'  },
  role:    { col1: 'Role Name',    col2: 'Trade'  },
  company: { col1: 'Company Name', col2: 'Office' },
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface AddParticipantModalProps {
  isOpen:             boolean;
  onClose:            () => void;
  onAddParticipants:  (members: TeamMember[]) => void;
  existingMemberIds?: Set<string>;
  teamName?:          string;
}

export function AddParticipantModal({
  isOpen, onClose, onAddParticipants,
  existingMemberIds = new Set(),
  teamName,
}: AddParticipantModalProps) {
  const [tab, setTab]                     = useState<TabKey>('member');
  const [availFilter, setAvailFilter]     = useState('');
  const [cartFilter, setCartFilter]       = useState('');
  const [selectedAvail, setSelectedAvail] = useState<Set<string>>(new Set());
  const [selectedCart, setSelectedCart]   = useState<Set<string>>(new Set());
  const [cart, setCart]                   = useState<ParticipantItem[]>([]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  const catalog = useMemo(() => {
    if (tab === 'member')  return ALL_MEMBERS;
    if (tab === 'role')    return ALL_ROLES;
    return ALL_COMPANIES;
  }, [tab]);

  const { col1, col2 } = TAB_CONFIG[tab];

  // Disabled IDs = already in team OR already in cart
  const disabledIds = useMemo(() => {
    const ids = new Set<string>(existingMemberIds);
    cart.forEach(i => ids.add(i.id));
    return ids;
  }, [existingMemberIds, cart]);

  const toggleAvail = useCallback((id: string) => {
    if (disabledIds.has(id)) return;
    setSelectedAvail(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, [disabledIds]);

  const toggleAllAvail = useCallback(() => {
    const eligible = catalog.filter(i => !disabledIds.has(i.id));
    const all = eligible.length > 0 && eligible.every(i => selectedAvail.has(i.id));
    setSelectedAvail(all ? new Set() : new Set(eligible.map(i => i.id)));
  }, [catalog, disabledIds, selectedAvail]);

  const toggleCartRow = useCallback((id: string) =>
    setSelectedCart(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);

  const toggleAllCart = useCallback(() => {
    const all = cart.every(i => selectedCart.has(i.id));
    setSelectedCart(all ? new Set() : new Set(cart.map(i => i.id)));
  }, [cart, selectedCart]);

  const selectableSelected = [...selectedAvail].filter(id => !disabledIds.has(id)).length;

  const handleAdd = () => {
    const toAdd = catalog.filter(i => selectedAvail.has(i.id) && !disabledIds.has(i.id));
    if (!toAdd.length) return;
    setCart(prev => {
      const existing = new Set(prev.map(i => i.id));
      return [...prev, ...toAdd.filter(i => !existing.has(i.id))];
    });
    setSelectedAvail(new Set());
  };

  const handleRemove = () => {
    setCart(prev => prev.filter(i => !selectedCart.has(i.id)));
    setSelectedCart(new Set());
  };

  const handleConfirm = () => {
    if (!cart.length) return;
    const members: TeamMember[] = cart.map(i => ({
      id:          i.id,
      type:        i.type,
      name:        i.name,
      subtitle:    i.col2,
      description: i.description,
      avatarBg:    i.avatarBg,
      avatarText:  i.avatarText,
      userId:      i.userId,
    }));
    onAddParticipants(members);
    setCart([]); setSelectedAvail(new Set()); setSelectedCart(new Set());
    setAvailFilter(''); setCartFilter('');
    onClose();
  };

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    setSelectedAvail(new Set());
    setAvailFilter('');
  };

  if (!isOpen) return null;

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'member',  label: 'Members', icon: <TabMemberIcon  active={tab === 'member'}  /> },
    { key: 'role',    label: 'Roles',   icon: <TabRoleIcon    active={tab === 'role'}    /> },
    { key: 'company', label: 'Company', icon: <TabCompanyIcon active={tab === 'company'} /> },
  ];

  return ReactDOM.createPortal(
    <DndProvider backend={HTML5Backend}>
      {/* Overlay */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.20)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed', zIndex: 501,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 980, height: 730,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          background: '#FFFFFF', borderRadius: 8,
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header §10.3 ── */}
        <div style={{ flexShrink: 0, background: '#FFFFFF' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 72, padding: '0 24px',
          }}>
            <p style={{
              fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24,
              lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap',
            }}>
              Add to Team
            </p>
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
          <div style={{ height: 1, background: '#F0F0F0' }} />
        </div>

        {/* ── Body ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0,
          padding: '16px 28px 0', gap: 12, background: '#FFFFFF',
        }}>

          {/* Tabs */}
          <div style={{
            display: 'flex', alignItems: 'center',
            borderBottom: '1px solid #D9D9D9', flexShrink: 0,
          }}>
            <div style={{
              fontFamily: 'Actor, sans-serif', fontSize: 16, color: '#1B2736',
              marginRight: 12, paddingBottom: 8, flexShrink: 0,
            }}>
              Search By
            </div>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px 10px' }}>
                  {t.icon}
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 15,
                    fontWeight: tab === t.key ? 600 : 400,
                    color: tab === t.key ? '#1B2736' : '#6B7280',
                  }}>
                    {t.label}
                  </span>
                </div>
                <div style={{
                  height: 3, width: '100%', borderRadius: '2px 2px 0 0',
                  background: tab === t.key ? '#FF4D00' : 'transparent',
                }} />
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1.5, background: '#D9D9D9', flexShrink: 0 }} />

          {/* Two panels + Transfer buttons */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0, paddingBottom: 12 }}>

            {/* Available panel */}
            <ParticipantPanel
              title="Available"
              items={catalog}
              selectedIds={selectedAvail}
              onToggleRow={toggleAvail}
              onToggleAll={toggleAllAvail}
              filterValue={availFilter}
              onFilterChange={setAvailFilter}
              disabledIds={disabledIds}
              emptyMessage="No items available"
              dragType={DRAG_AVAIL}
              dropType={DRAG_CART}
              showAvatar={false}
              col1Label={col1}
              col2Label={col2}
              onDrop={dropped => {
                const ids = new Set(dropped.map(i => i.id));
                setCart(prev => prev.filter(i => !ids.has(i.id)));
                setSelectedCart(new Set());
              }}
            />

            {/* Add / Remove buttons */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 10, padding: '0 18px', flexShrink: 0,
            }}>
              <button
                onClick={handleAdd}
                disabled={selectableSelected === 0}
                style={{
                  height: 36, padding: '0 16px', borderRadius: 4, border: 'none',
                  background: selectableSelected > 0 ? '#FF4D00' : '#FFBD9C',
                  color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
                  cursor: selectableSelected > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  flexShrink: 0, transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
                onMouseLeave={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
                onMouseDown={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4380D'; }}
                onMouseUp={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
              >
                Add <ArrowRight />
              </button>
              <button
                onClick={handleRemove}
                disabled={selectedCart.size === 0}
                style={{
                  height: 36, padding: '0 16px', borderRadius: 4,
                  background: selectedCart.size === 0 ? '#F5F5F5' : '#F2F3F4',
                  border: `1px solid ${selectedCart.size === 0 ? '#BFBFBF' : '#C3C7CC'}`,
                  color: selectedCart.size === 0 ? '#BFBFBF' : '#616D79',
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
                  cursor: selectedCart.size === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  flexShrink: 0, transition: 'background-color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { if (selectedCart.size > 0) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; } }}
                onMouseLeave={e => { if (selectedCart.size > 0) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; } }}
                onMouseDown={e => { if (selectedCart.size > 0) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#616D79'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; } }}
                onMouseUp={e => { if (selectedCart.size > 0) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; (e.currentTarget as HTMLButtonElement).style.color = '#616D79'; } }}
              >
                <ArrowLeft /> Remove
              </button>
            </div>

            {/* Cart panel — always "Name" + "Type" cols regardless of active tab */}
            <ParticipantPanel
              title="Added Participants"
              items={cart}
              selectedIds={selectedCart}
              onToggleRow={toggleCartRow}
              onToggleAll={toggleAllCart}
              filterValue={cartFilter}
              onFilterChange={setCartFilter}
              disabledIds={new Set()}
              emptyMessage="No participants added yet — select items and click Add, or drag them here"
              dragType={DRAG_CART}
              dropType={DRAG_AVAIL}
              showAvatar={false}
              col1Label="Name"
              col2Label="Type"
              col2Getter={(item) => capitalize(item.type)}
              onDrop={dropped => {
                const toAdd = dropped.filter(i => !disabledIds.has(i.id));
                if (!toAdd.length) return;
                setCart(prev => {
                  const existing = new Set(prev.map(i => i.id));
                  return [...prev, ...toAdd.filter(i => !existing.has(i.id))];
                });
                setSelectedAvail(new Set());
              }}
            />
          </div>
        </div>

        {/* ── Footer §10.4 ── */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'flex-end', gap: 10, padding: '0 28px', height: 72,
          borderTop: '1px solid #C3C7CC', background: '#FFFFFF',
        }}>
          {cart.length > 0 && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9EA2A8', marginRight: 4 }}>
              {cart.length} participant{cart.length > 1 ? 's' : ''} ready to add
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              height: 36, padding: '0 16px', borderRadius: 4,
              background: '#F2F3F4', border: '1px solid #C3C7CC',
              color: '#616D79', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.background = '#616D79'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; (e.currentTarget as HTMLButtonElement).style.color = '#616D79'; }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={cart.length === 0}
            style={{
              height: 36, padding: '0 16px', borderRadius: 4, border: 'none',
              background: cart.length > 0 ? '#FF4D00' : '#FFBD9C',
              color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              cursor: cart.length > 0 ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
            onMouseLeave={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
            onMouseDown={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4380D'; }}
            onMouseUp={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
          >
            Add to Team
          </button>
        </div>
      </div>
    </DndProvider>,
    document.body,
  );
}