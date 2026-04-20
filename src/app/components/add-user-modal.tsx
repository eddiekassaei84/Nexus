import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { InviteUserModal } from './invite-user-modal';

// ─── Drag-and-drop type tokens ────────────────────────────────────────────────
const DRAG_FROM_AVAIL = 'ADD_MODAL_AVAIL_USER';
const DRAG_FROM_CART  = 'ADD_MODAL_CART_USER';
type DragPayload = { users: DirectoryUser[] };

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  company: string;
  office: string;
  jobTitle: string;
}

// ─── Inertia Global Directory (mock) ─────────────────────────────────────────
export const GLOBAL_DIRECTORY: DirectoryUser[] = [
  { id: 'gd-01', name: 'Alice Brennan',     email: 'alice.b@inertia.global',       company: 'Inertia Global',    office: 'Dubai',       jobTitle: 'Solutions Architect'   },
  { id: 'gd-02', name: 'Bob Nakamura',      email: 'b.nakamura@inertia.global',    company: 'Inertia Global',    office: 'Tokyo',       jobTitle: 'Digital Delivery Lead' },
  { id: 'gd-03', name: 'Chloe Dupont',      email: 'c.dupont@inertia.global',      company: 'Inertia Global',    office: 'Paris',       jobTitle: 'Project Consultant'    },
  { id: 'gd-04', name: 'Diego Salinas',     email: 'd.salinas@inertia.global',     company: 'Inertia Global',    office: 'Madrid',      jobTitle: 'BIM Specialist'        },
  { id: 'gd-05', name: 'Eva Lindström',     email: 'e.lindstrom@inertia.global',   company: 'Inertia Global',    office: 'Stockholm',   jobTitle: 'Senior Engineer'       },
  { id: 'gd-06', name: 'Farouk Hassan',     email: 'f.hassan@inertia.global',      company: 'Inertia Global',    office: 'Cairo',       jobTitle: 'Project Director'      },
  { id: 'gd-07', name: 'Grace Osei',        email: 'g.osei@inertia.global',        company: 'Inertia Global',    office: 'Accra',       jobTitle: 'Design Manager'        },
  { id: 'gd-08', name: 'Hugo Ferreira',     email: 'h.ferreira@inertia.global',    company: 'Inertia Global',    office: 'Lisbon',      jobTitle: 'Civil Engineer'        },
  { id: 'gd-09', name: 'Isabelle Moreau',   email: 'i.moreau@nexusarch.com',       company: 'Nexus Architects',  office: 'London',      jobTitle: 'Lead Architect'        },
  { id: 'gd-10', name: 'James Okonkwo',     email: 'j.okonkwo@nexusarch.com',      company: 'Nexus Architects',  office: 'Lagos',       jobTitle: 'Urban Designer'        },
  { id: 'gd-11', name: 'Kaito Yamamoto',    email: 'k.yamamoto@nexusarch.com',     company: 'Nexus Architects',  office: 'Osaka',       jobTitle: 'Structural Consultant' },
  { id: 'gd-12', name: 'Layla Al-Farsi',    email: 'l.alfarsi@nexusarch.com',      company: 'Nexus Architects',  office: 'Abu Dhabi',   jobTitle: 'Project Architect'     },
  { id: 'gd-13', name: 'Marco Ricci',       email: 'm.ricci@structodyn.io',        company: 'StructoDyn',        office: 'Milan',       jobTitle: 'Structural Engineer'   },
  { id: 'gd-14', name: 'Nadia Kozlov',      email: 'n.kozlov@structodyn.io',       company: 'StructoDyn',        office: 'Moscow',      jobTitle: 'Analysis Lead'         },
  { id: 'gd-15', name: 'Oliver Tang',       email: 'o.tang@structodyn.io',         company: 'StructoDyn',        office: 'Singapore',   jobTitle: 'MEP Engineer'          },
  { id: 'gd-16', name: 'Priya Nair',        email: 'p.nair@structodyn.io',         company: 'StructoDyn',        office: 'Mumbai',      jobTitle: 'BIM Coordinator'       },
  { id: 'gd-17', name: 'Quinn McCarthy',    email: 'q.mccarthy@buildright.co',     company: 'BuildRight Co.',    office: 'Dublin',      jobTitle: 'Site Manager'          },
  { id: 'gd-18', name: 'Rosa Cavalcanti',   email: 'r.cavalcanti@buildright.co',   company: 'BuildRight Co.',    office: 'São Paulo',   jobTitle: 'Construction PM'       },
  { id: 'gd-19', name: 'Samuel Park',       email: 's.park@buildright.co',         company: 'BuildRight Co.',    office: 'Seoul',       jobTitle: 'Cost Engineer'         },
  { id: 'gd-20', name: 'Tariq Ahmed',       email: 't.ahmed@buildright.co',        company: 'BuildRight Co.',    office: 'Riyadh',      jobTitle: 'HSE Manager'           },
  { id: 'gd-21', name: 'Uma Krishnan',      email: 'u.krishnan@vistacivil.com',    company: 'Vista Civil',       office: 'Chennai',     jobTitle: 'Geotech Engineer'      },
  { id: 'gd-22', name: 'Victor Bondarev',   email: 'v.bondarev@vistacivil.com',    company: 'Vista Civil',       office: 'Kyiv',        jobTitle: 'Infrastructure Lead'   },
  { id: 'gd-23', name: 'Wendy Johansson',   email: 'w.johansson@vistacivil.com',   company: 'Vista Civil',       office: 'Gothenburg',  jobTitle: 'Transport Engineer'    },
  { id: 'gd-24', name: 'Xander Petrov',     email: 'x.petrov@vistacivil.com',      company: 'Vista Civil',       office: 'Sofia',       jobTitle: 'Survey Specialist'     },
  { id: 'gd-25', name: 'Yara Khalil',       email: 'y.khalil@omegapm.net',         company: 'Omega PM',          office: 'Beirut',      jobTitle: 'Risk Manager'          },
  { id: 'gd-26', name: 'Zain Chaudhry',     email: 'z.chaudhry@omegapm.net',       company: 'Omega PM',          office: 'Karachi',     jobTitle: 'Scheduler'             },
  { id: 'gd-27', name: 'Amara Diallo',      email: 'a.diallo@omegapm.net',         company: 'Omega PM',          office: 'Dakar',       jobTitle: 'Contracts Lead'        },
  { id: 'gd-28', name: 'Bruno Schultz',     email: 'b.schultz@omegapm.net',        company: 'Omega PM',          office: 'Berlin',      jobTitle: 'Document Controller'   },
  { id: 'gd-29', name: 'Camille Laurent',   email: 'c.laurent@helix-design.fr',    company: 'Helix Design',      office: 'Lyon',        jobTitle: 'Interior Designer'     },
  { id: 'gd-30', name: 'David Ndlovu',      email: 'd.ndlovu@helix-design.fr',     company: 'Helix Design',      office: 'Johannesburg',jobTitle: 'Facade Engineer'       },
  { id: 'gd-31', name: 'Emre Yildiz',       email: 'e.yildiz@helix-design.fr',     company: 'Helix Design',      office: 'Istanbul',    jobTitle: 'Lighting Designer'     },
  { id: 'gd-32', name: 'Fatou Sow',         email: 'f.sow@helix-design.fr',        company: 'Helix Design',      office: 'Abidjan',     jobTitle: 'Landscape Architect'   },
];

const COMPANIES = [...new Set(GLOBAL_DIRECTORY.map(u => u.company))].sort();

// ─── Derive the primary @domain for each company from its users' emails ───────
const COMPANY_DOMAINS: Record<string, string> = {};
GLOBAL_DIRECTORY.forEach(u => {
  if (!COMPANY_DOMAINS[u.company]) {
    const at = u.email.indexOf('@');
    if (at >= 0) COMPANY_DOMAINS[u.company] = u.email.slice(at); // e.g. "@inertia.global"
  }
});

// ─── Icon helpers ─────────────────────────────────────────────────────────────
function SearchIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="7.5" stroke={color} strokeWidth="1.5" />
      <path d="M14 14L19 19" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
function SortIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 2v12M2 11l3 3 3-3" stroke="#9EA2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14V2M8 5l3-3 3 3" stroke="#9EA2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XSmallIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 2L10 10M10 2L2 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ArrowTransferIcon({ direction, color }: { direction: 'right' | 'left'; color?: string }) {
  return direction === 'right' ? (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8H13M9 4l4 4-4 4" stroke={color ?? 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M13 8H3M7 4L3 8l4 4" stroke={color ?? '#616D79'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronDownIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 5L7 9L11 5" stroke={disabled ? '#C4C8CC' : '#616D79'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BuildingIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16M9 21V12h6v9M3 21h18"
        stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="7" width="2" height="2" rx="0.3" stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" />
      <rect x="11" y="7" width="2" height="2" rx="0.3" stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" />
      <rect x="15" y="7" width="2" height="2" rx="0.3" stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" />
    </svg>
  );
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#1B2736' : '#6B7280'} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6.5 1V12M1 6.5H12" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Drag grip icon (6-dot grid) ─────────────────────────────────────────────
function DragGripIcon({ color = '#B0BAC4' }: { color?: string }) {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
      {([[ 1.5,1.5],[6.5,1.5],[1.5,6.5],[6.5,6.5],[1.5,11.5],[6.5,11.5]] as [number,number][]).map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="1.4" fill={color} />
      ))}
    </svg>
  );
}

// ─── Draggable user row ───────────────────────────────────────────────────────
interface DraggableRowProps {
  user:            DirectoryUser;
  isDisabled:      boolean;
  isSelected:      boolean;
  rowIndex:        number;
  dragType:        string;
  onClick:         () => void;
  highlightQuery?: string;
  splitDomain?:    boolean;
  /** All currently-selected non-disabled users in this panel (for multi-drag) */
  selectedUsers:   DirectoryUser[];
}
function DraggableUserRow({
  user, isDisabled, isSelected, rowIndex, dragType,
  onClick, highlightQuery, splitDomain, selectedUsers,
}: DraggableRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // When dragging a selected row → carry all selected users.
  // When dragging an unselected row → carry just this one.
  const getDragUsers = (): DirectoryUser[] =>
    isSelected && selectedUsers.length > 0 ? selectedUsers : [user];

  const [{ isDragging }, drag] = useDrag<DragPayload, void, { isDragging: boolean }>({
    type:    dragType,
    item:    () => ({ users: getDragUsers() }),
    canDrag: !isDisabled,
    collect: m => ({ isDragging: m.isDragging() }),
  });
  drag(rowRef);

  const bgColor = isDisabled
    ? '#F7F8FA'
    : isSelected
      ? '#EBF5FF'
      : rowIndex % 2 === 0 ? 'white' : '#FAFAFA';

  return (
    <div
      ref={rowRef}
      title={isDisabled ? 'Already Added to the project' : isDragging ? undefined : 'Drag to transfer'}
      onClick={onClick}
      className="flex items-center h-[36px] px-[8px] gap-[8px] border-b border-[#F0F0F0] transition-colors group/row"
      style={{
        backgroundColor: bgColor,
        opacity:         isDragging ? 0.35 : 1,
        cursor:          isDisabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
        position:        'relative',
      }}
    >
      {/* Grip handle — visible on hover */}
      <div
        className="shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity"
        style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {!isDisabled && <DragGripIcon />}
      </div>

      {/* Checkbox — disabled rows show a gray checked tick to signal "already added" */}
      <div className="w-[15px] shrink-0 flex items-center justify-center">
        <ModalCheckbox
          checked={isDisabled || isSelected}
          onChange={() => { if (!isDisabled) onClick(); }}
          disabled={isDisabled}
        />
      </div>

      {/* Name */}
      <span
        className="flex-1 min-w-0 text-[13px] truncate"
        style={{ color: isDisabled ? '#B0B8C1' : '#1B2736' }}
      >
        {highlightQuery && !isDisabled
          ? <HighlightText text={user.name} query={highlightQuery} />
          : user.name
        }
      </span>

      {/* Email — always show real address; disabled color conveys the locked state */}
      <span
        className="flex-1 min-w-0 text-[12px] truncate"
        style={{ color: isDisabled ? '#C4C8CC' : '#616D79' }}
      >
        {!isDisabled && highlightQuery ? (
          <HighlightText text={user.email} query={highlightQuery} />
        ) : splitDomain && !isDisabled ? (() => {
          const atIdx  = user.email.indexOf('@');
          const local  = atIdx >= 0 ? user.email.slice(0, atIdx)  : user.email;
          const domain = atIdx >= 0 ? user.email.slice(atIdx) : '';
          return (
            <>
              <span style={{ color: '#616D79' }}>{local}</span>
              {domain && <span style={{ color: '#C4C8CC' }}>{domain}</span>}
            </>
          );
        })() : (
          user.email
        )}
      </span>
    </div>
  );
}

// ─── Highlight helper — wraps the matched segment in orange ──────────────────
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q   = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#096DD9', fontWeight: 600 }}>{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// ─── Custom Checkbox ──────────────────────────────────────────────────────────
function ModalCheckbox({ checked, indeterminate, onChange, disabled }: {
  checked: boolean; indeterminate?: boolean; onChange: () => void; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { if (disabled) return; e.stopPropagation(); onChange(); }}
      className="shrink-0 w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center transition-colors"
      style={{
        backgroundColor: disabled && checked ? '#DDE1E6' : disabled ? '#F5F5F5' : checked || indeterminate ? '#0E70CB' : 'white',
        borderColor:     disabled && checked ? '#B0BAC4' : disabled ? '#D9D9D9' : checked || indeterminate ? '#0E70CB' : '#9EA2A8',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* Disabled + checked → gray tick (already-added indicator) */}
      {disabled && checked
        ? <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5.5L7 1" stroke="#8B95A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : !disabled && indeterminate && !checked
          ? <svg width="7" height="2" viewBox="0 0 7 2" fill="none"><path d="M0.5 1H6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
          : !disabled && checked
            ? <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            : null
      }
    </button>
  );
}

// ─── Company Typeahead (Change 1, 2, 3) ──────────────────────────────────────
// Predictive text-input — dropdown only appears while typing; no chevron.
// Once a suggestion is selected the input locks to that company name.
function CompanyTypeahead({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [inputVal, setInputVal] = useState(value);
  const [open, setOpen]         = useState(false);
  const [focused, setFocused]   = useState(false);
  const ref     = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep inputVal in sync when value changes externally (e.g. clear)
  useEffect(() => { setInputVal(value); }, [value]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        // If nothing was committed but user typed, revert to committed value
        if (!value) setInputVal('');
        else setInputVal(value);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [value]);

  // Filtered suggestions — only when there's input AND no company is committed yet
  const suggestions = useMemo(() => {
    const q = inputVal.toLowerCase().trim();
    if (!q || q.length < 3 || value) return [];
    return COMPANIES.filter(c => c.toLowerCase().includes(q));
  }, [inputVal, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputVal(v);
    // If user edits text after a selection, clear the selection
    if (value && v !== value) onChange('');
    setOpen(true);
  };

  const handleSelect = (company: string) => {
    onChange(company);
    setInputVal(company);
    setOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setInputVal('');
    setOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const showDropdown = open && suggestions.length > 0 && !value;

  return (
    <div className="relative w-full" ref={ref}>
      {/* Input row */}
      <div
        className="w-full h-[40px] bg-white border rounded-[4px] flex items-center px-[12px] gap-[8px] transition-colors"
        style={{ borderColor: focused ? '#384857' : '#9EA2A8' }}
      >
        <SearchIcon color={focused ? '#384857' : '#9EA2A8'} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Type to search company…"
          value={inputVal}
          onChange={handleInputChange}
          onFocus={() => { setFocused(true); if (!value && inputVal) setOpen(true); }}
          onBlur={() => setFocused(false)}
          className="flex-1 text-[14px] text-[#1B2736] placeholder-[#C4C8CC] outline-none bg-transparent"
          style={{ cursor: value ? 'default' : 'text' }}
          readOnly={!!value}
        />
        {/* Clear button — only when a company is committed */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#E0E4E8] hover:bg-[#CDD2D8] transition-colors"
          >
            <XSmallIcon color="#616D79" />
          </button>
        )}
      </div>

      {/* Suggestion dropdown — only visible while typing */}
      {showDropdown && (
        <div className="absolute z-[200] top-[42px] left-0 w-full bg-white border border-[#D9D9D9] rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto">
          {suggestions.map(opt => {
            // Highlight matched portion
            const q = inputVal.toLowerCase();
            const idx = opt.toLowerCase().indexOf(q);
            const domain = COMPANY_DOMAINS[opt] ?? '';
            return (
              <div
                key={opt}
                onMouseDown={() => handleSelect(opt)}
                className="px-[12px] py-[9px] text-[14px] text-[#1B2736] cursor-pointer hover:bg-[#E6F7FF] flex items-center gap-[6px]"
              >
                <BuildingIcon active={false} />
                {/* Company name with match highlight, pushes domain to the right */}
                <span className="flex-1 min-w-0 truncate">
                  {idx >= 0 ? (
                    <>
                      {opt.slice(0, idx)}
                      <span style={{ color: '#096DD9', fontWeight: 600 }}>{opt.slice(idx, idx + q.length)}</span>
                      {opt.slice(idx + q.length)}
                    </>
                  ) : opt}
                </span>
                {/* Domain in light gray, right-aligned */}
                {domain && (
                  <span
                    className="shrink-0 text-[12px] tabular-nums"
                    style={{ color: '#B8BEC5', fontFamily: 'Inter, sans-serif' }}
                  >
                    {domain}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Selected company chip display */}
      {value && (
        <div className="absolute inset-y-0 left-[38px] right-[38px] flex items-center pointer-events-none">
          <span className="text-[14px] text-[#1B2736] truncate">{value}</span>
        </div>
      )}
    </div>
  );
}

// ─── Office Dropdown (Change 6: disabled until company selected) ──────────────
function OfficeDropdown({
  value, onChange, options, disabled,
}: {
  value: string; onChange: (v: string) => void; options: string[]; disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close if disabled
  useEffect(() => { if (disabled) setOpen(false); }, [disabled]);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className="w-full h-[40px] border rounded-[4px] flex items-center justify-between px-[12px] text-[14px] text-left transition-colors"
        style={{
          backgroundColor: disabled ? '#F5F5F5' : 'white',
          borderColor: disabled ? '#E0E4E8' : '#9EA2A8',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span style={{ color: disabled ? '#C4C8CC' : value ? '#1B2736' : '#C4C8CC' }}>
          {disabled ? 'Select a company first' : value || 'Select office (optional)'}
        </span>
        <ChevronDownIcon disabled={disabled} />
      </button>
      {open && !disabled && (
        <div className="absolute z-[200] top-[42px] left-0 w-full bg-white border border-[#D9D9D9] rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto">
          {value && (
            <div
              className="px-[12px] py-[8px] text-[13px] text-[#9CA3AF] hover:bg-[#F5F5F5] cursor-pointer"
              onMouseDown={() => { onChange(''); setOpen(false); }}
            >
              — All offices —
            </div>
          )}
          {options.map(opt => (
            <div
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className={`px-[12px] py-[9px] text-[14px] cursor-pointer hover:bg-[#E6F7FF] ${value === opt ? 'bg-[#E6F7FF] text-[#096DD9]' : 'text-[#1B2736]'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── User Panel ───────────────────────────────────────────────────────────────
// Change 4: rows that are disabled (already in project / cart) are grayed out,
// non-selectable, and show a tooltip on hover.
function UserPanel({
  title, users, selectedIds, onToggleRow, onToggleAll,
  filterValue, onFilterChange, disabledIds, emptyMessage, highlightQuery, splitDomain,
  dragType, dropType, onDrop, hideFilter,
}: {
  title: string;
  users: DirectoryUser[];
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  filterValue: string;
  onFilterChange: (v: string) => void;
  disabledIds?: Set<string>;
  emptyMessage?: string;
  highlightQuery?: string;
  /** When true, the email column splits username and @domain — domain rendered in lighter gray */
  splitDomain?: boolean;
  /** DnD: what drag type the rows in this panel emit */
  dragType: string;
  /** DnD: what drag type this panel's scroll area accepts */
  dropType: string;
  /** DnD: called when a user is dropped here */
  onDrop: (users: DirectoryUser[]) => void;
  /** When true, hides the internal search-filter input */
  hideFilter?: boolean;
}) {
  const disabled = disabledIds ?? new Set<string>();

  // For header checkbox, only consider selectable (non-disabled) users
  const selectableUsers = useMemo(() => users.filter(u => !disabled.has(u.id)), [users, disabled]);
  const allSelected  = selectableUsers.length > 0 && selectableUsers.every(u => selectedIds.has(u.id));
  const someSelected = !allSelected && selectableUsers.some(u => selectedIds.has(u.id));

  const filtered = useMemo(() => {
    const q = filterValue.trim().toLowerCase();
    return q
      ? users.filter(u =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        )
      : users;
  }, [users, filterValue]);

  // ── Build the list of selected+draggable users for multi-drag ────────────
  const selectedUsersList = useMemo(
    () => users.filter(u => selectedIds.has(u.id) && !disabled.has(u.id)),
    [users, selectedIds, disabled],
  );

  // ── Drop zone on the scroll area ────────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop, dragCount }, drop] = useDrop<DragPayload, void, { isOver: boolean; canDrop: boolean; dragCount: number }>({
    accept:  dropType,
    // ⚠️  Do NOT filter by `disabled` here — the Available panel's disabled set
    //     contains cart users, so filtering would silently block the reverse drag.
    //     Each onDrop callback is responsible for its own business logic.
    canDrop: () => true,
    drop:    item => onDrop(item.users),
    collect: m => ({ isOver: m.isOver(), canDrop: m.canDrop(), dragCount: (m.getItem() as DragPayload | null)?.users.length ?? 0 }),
  });
  drop(scrollRef);

  const dropActive = isOver && canDrop;

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0">
      {/* Panel title */}
      <p className="text-[#1B2736] text-[17px] mb-[8px] shrink-0" style={{ fontFamily: 'Actor, sans-serif' }}>
        {title}
        {selectableUsers.length > 0 && (
          <span className="ml-[8px] text-[13px] text-[#9EA2A8]">({selectableUsers.length} available)</span>
        )}
      </p>
      {/* Card — border pulses orange when a valid drag is over */}
      <div
        className="flex flex-col flex-1 bg-white rounded-[4px] overflow-hidden min-h-0 transition-all"
        style={{
          border:     dropActive ? '2px solid #1890FF' : '1px solid #D9D9D9',
          boxShadow:  dropActive ? '0 0 0 3px rgba(24,144,255,0.12)' : 'none',
        }}
      >
        {/* Search filter row */}
        {!hideFilter && (
        <div className="px-[10px] py-[7px] bg-[#FAFAFA] border-b border-[#D9D9D9] shrink-0">
          <div className="flex items-center gap-[7px] bg-white border border-[#D9D9D9] rounded-[4px] px-[8px] h-[30px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search filter"
              value={filterValue}
              onChange={e => onFilterChange(e.target.value)}
              className="flex-1 text-[13px] text-[#1B2736] placeholder-[#C4C8CC] outline-none bg-transparent"
            />
            {filterValue && (
              <button onClick={() => onFilterChange('')} className="shrink-0">
                <XSmallIcon />
              </button>
            )}
          </div>
        </div>
        )}
        {/* Column headers */}
        <div className="bg-[#FAFAFA] border-b border-[#9EA3A9] flex items-center h-[34px] px-[8px] gap-[8px] shrink-0">
          {/* grip spacer */}
          <div style={{ width: 14, flexShrink: 0 }} />
          <div className="w-[18px] shrink-0 flex items-center justify-center">
            <ModalCheckbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onToggleAll}
              disabled={selectableUsers.length === 0}
            />
          </div>
          <div className="flex items-center gap-[4px] flex-1 min-w-0">
            <span className="text-[#384857] text-[12px]" style={{ fontWeight: 600 }}>Name</span>
            <SortIcon />
          </div>
          {/* Email header — count pill sits at the far-right of this cell */}
          <div className="flex items-center gap-[4px] flex-1 min-w-0">
            <span className="text-[#384857] text-[12px]" style={{ fontWeight: 600 }}>Email</span>
            <SortIcon />
            <div className="flex-1" />
            {selectedUsersList.length > 0 && (
              <span
                className="shrink-0 flex items-center justify-center transition-all"
                style={{
                  backgroundColor: '#1890FF',
                  color: 'white',
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  padding: '1px 7px',
                  lineHeight: '16px',
                  minWidth: 20,
                  textAlign: 'center',
                }}
              >
                {selectedUsersList.length} selected
              </span>
            )}
          </div>
        </div>
        {/* Rows — this div is the drop zone */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto min-h-0 transition-colors"
          style={{ backgroundColor: dropActive ? 'rgba(24,144,255,0.04)' : 'transparent' }}
        >
          {/* Drop hint banner shown while dragging over */}
          {isOver && canDrop && (
            <div
              className="flex items-center justify-center gap-[6px] h-[32px] shrink-0"
              style={{
                background:   'rgba(24,144,255,0.10)',
                borderBottom: '1px dashed #1890FF',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#1890FF', fontWeight:500 }}>
                Drop {dragCount > 1 ? `${dragCount} users` : '1 user'} here to {dropType === DRAG_FROM_AVAIL ? 'add to cart' : 'remove from cart'}
              </span>
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#9CA3AF] text-[13px] p-[24px] text-center gap-[8px]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.4">
                <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {emptyMessage ?? (users.length === 0 ? 'No users to display' : 'No results match your filter')}
            </div>
          ) : (
            filtered.map((u, i) => {
              const isDisabledRow = disabled.has(u.id);
              const isSelected    = selectedIds.has(u.id);
              return (
                <DraggableUserRow
                  key={u.id}
                  user={u}
                  isDisabled={isDisabledRow}
                  isSelected={isSelected}
                  rowIndex={i}
                  dragType={dragType}
                  onClick={() => { if (!isDisabledRow) onToggleRow(u.id); }}
                  highlightQuery={highlightQuery}
                  splitDomain={splitDomain}
                  selectedUsers={selectedUsersList}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToProject: (users: DirectoryUser[]) => void;
  /** Emails of users already in the project (base table) */
  projectUserEmails?: Set<string>;
}

export function AddUserModal({
  isOpen,
  onClose,
  onAddToProject,
  projectUserEmails = new Set(),
}: AddUserModalProps) {
  const [tab, setTab]                     = useState<'company' | 'email'>('company');

  // Company tab state
  const [company, setCompany]             = useState('');   // committed selection
  const [office, setOffice]               = useState('');

  // Email tab state
  const [emailQuery, setEmailQuery]       = useState('');

  // Panel filters
  const [availFilter, setAvailFilter]     = useState('');
  const [cartFilter, setCartFilter]       = useState('');

  // Selection & cart
  const [selectedAvail, setSelectedAvail] = useState<Set<string>>(new Set());
  const [selectedCart, setSelectedCart]   = useState<Set<string>>(new Set());
  const [cart, setCart]                   = useState<DirectoryUser[]>([]);

  // Invite sub-modal
  const [showInvite, setShowInvite]       = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // ── Offices for selected company (Change 6) ─────────────────────────────
  const filteredOffices = useMemo(() => {
    if (!company) return [];
    return [...new Set(
      GLOBAL_DIRECTORY.filter(u => u.company === company).map(u => u.office)
    )].sort();
  }, [company]);

  // When company changes, clear office selection
  const handleCompanyChange = useCallback((v: string) => {
    setCompany(v);
    setOffice('');
    setSelectedAvail(new Set());
    setAvailFilter('');
  }, []);

  // ── Disabled IDs (Change 4) ──────────────────────────────────────────────
  // Gray-out any user already in the project table OR already in the cart
  const disabledIds = useMemo(() => {
    const ids = new Set<string>();
    const cartIds = new Set(cart.map(u => u.id));
    GLOBAL_DIRECTORY.forEach(u => {
      if (projectUserEmails.has(u.email) || cartIds.has(u.id)) ids.add(u.id);
    });
    return ids;
  }, [projectUserEmails, cart]);

  // ── Available users (Change 3) ───────────────────────────────────────────
  // In company tab: show all users for the selected company (no filtering out cart/project —
  // those are shown grayed; disabled = not selectable).
  // Without a committed company selection → empty.
  const availableUsers = useMemo<DirectoryUser[]>(() => {
    if (tab === 'company') {
      if (!company) return [];
      let pool = GLOBAL_DIRECTORY.filter(u => u.company === company);
      if (office) pool = pool.filter(u => u.office === office);
      return pool;
    } else {
      const q = emailQuery.trim().toLowerCase();
      if (q.length < 3) return [];
      return GLOBAL_DIRECTORY.filter(u =>
        u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
      );
    }
  }, [tab, company, office, emailQuery]);

  // ── Toggle helpers ────────────────────────────────────────────────────────
  const toggleAvail = useCallback((id: string) => {
    if (disabledIds.has(id)) return;
    setSelectedAvail(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, [disabledIds]);

  const toggleAllAvail = useCallback(() => {
    const eligible = availableUsers.filter(u => !disabledIds.has(u.id));
    const all = eligible.length > 0 && eligible.every(u => selectedAvail.has(u.id));
    setSelectedAvail(all ? new Set() : new Set(eligible.map(u => u.id)));
  }, [availableUsers, disabledIds, selectedAvail]);

  const toggleCartRow = useCallback((id: string) =>
    setSelectedCart(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);

  const toggleAllCart = useCallback(() => {
    const all = cart.every(u => selectedCart.has(u.id));
    setSelectedCart(all ? new Set() : new Set(cart.map(u => u.id)));
  }, [cart, selectedCart]);

  // ── Transfer actions ──────────────────────────────────────────────────────
  const handleAdd = () => {
    const toAdd = availableUsers.filter(u => selectedAvail.has(u.id) && !disabledIds.has(u.id));
    if (!toAdd.length) return;
    setCart(prev => {
      const existing = new Set(prev.map(u => u.id));
      return [...prev, ...toAdd.filter(u => !existing.has(u.id))];
    });
    setSelectedAvail(new Set());
  };

  const handleRemove = () => {
    setCart(prev => prev.filter(u => !selectedCart.has(u.id)));
    setSelectedCart(new Set());
  };

  const handleAddToProject = () => {
    if (!cart.length) return;
    onAddToProject(cart);
    // Reset all state
    setCart([]); setSelectedAvail(new Set()); setSelectedCart(new Set());
    setCompany(''); setOffice(''); setEmailQuery('');
    setAvailFilter(''); setCartFilter('');
    onClose();
  };

  const handleTabChange = (t: 'company' | 'email') => {
    setTab(t);
    setSelectedAvail(new Set());
    setAvailFilter('');
    if (t === 'email') { setCompany(''); setOffice(''); }
    else { setEmailQuery(''); }
  };

  // Derived: how many selectable users are selected
  const selectableSelected = [...selectedAvail].filter(id => !disabledIds.has(id)).length;

  if (!isOpen) return null;

  // ── Empty message for Available panel based on state ────────────────────
  const availEmptyMsg = (() => {
    if (tab === 'company') {
      if (!company) return 'Select a company above to see available users';
      return office
        ? `No users found in "${office}" office for ${company}`
        : `No users found for ${company}`;
    }
    return emailQuery.trim().length === 0
      ? 'Type an email or name to search'
      : emailQuery.trim().length < 3
        ? 'Keep typing — search starts after 3 characters'
        : 'No users match your search';
  })();

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100]"
        style={{ backgroundColor: 'rgba(0,0,0,0.20)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-[101] rounded-[8px] shadow-[0_8px_40px_rgba(0,0,0,0.24)] flex flex-col overflow-hidden"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '980px', height: '730px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          backgroundColor: '#FFFFFF',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── (matches Import / Export modal header style) */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{
              fontFamily: "'Actor', sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: '28.8px',
              color: '#1B2736',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              Add User
            </p>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
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
          {/* Divider */}
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 min-h-0 px-[28px] pt-[16px] pb-[0px] gap-[12px]" style={{ backgroundColor: '#FFFFFF' }}>

          {/* Tabs row */}
          <div className="flex items-center gap-0 border-b border-[#D9D9D9] shrink-0">
            <div
              className="text-[#1B2736] text-[16px] mr-[12px] pb-[8px] shrink-0"
              style={{ fontFamily: 'Actor, sans-serif' }}
            >
              Search By
            </div>

            {/* Company tab */}
            <button onClick={() => handleTabChange('company')} className="flex flex-col items-center shrink-0">
              <div className="flex items-center gap-[8px] px-[14px] pb-[10px]">
                <BuildingIcon active={tab === 'company'} />
                <span className="text-[15px]" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: tab === 'company' ? 600 : 400,
                  color: tab === 'company' ? '#1B2736' : '#6B7280',
                }}>
                  Company
                </span>
              </div>
              <div className="h-[3px] w-full rounded-t-[2px]"
                style={{ backgroundColor: tab === 'company' ? '#E64A19' : 'transparent' }} />
            </button>

            {/* Email tab */}
            <button onClick={() => handleTabChange('email')} className="flex flex-col items-center shrink-0">
              <div className="flex items-center gap-[8px] px-[14px] pb-[10px]">
                <UserIcon active={tab === 'email'} />
                <span className="text-[15px]" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: tab === 'email' ? 600 : 400,
                  color: tab === 'email' ? '#1B2736' : '#6B7280',
                }}>
                  E-mail
                </span>
              </div>
              <div className="h-[3px] w-full rounded-t-[2px]"
                style={{ backgroundColor: tab === 'email' ? '#E64A19' : 'transparent' }} />
            </button>
          </div>

          {/* Search fields — mirror the same flex layout as the panels row below:
              [Available panel = flex-1] [buttons col = 148px] [Cart panel = flex-1]
              so Company aligns with Available Users and Filter by Office with Added Users Cart */}
          <div className="flex shrink-0 items-end">
            {tab === 'company' ? (
              <>
                {/* Company field — aligns with Available Users panel */}
                <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                  <label className="text-[12px] text-[#1B2736]" style={{ fontFamily: 'Actor, sans-serif' }}>
                    Company
                  </label>
                  <CompanyTypeahead value={company} onChange={handleCompanyChange} />
                </div>
                {/* Spacer — same width as the Add/Remove buttons column (18+112+18 = 148px) */}
                <div className="shrink-0" style={{ width: '148px' }} />
                {/* Filter by Office — aligns with Added Users Cart panel */}
                <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                  <label
                    className="text-[12px]"
                    style={{ fontFamily: 'Actor, sans-serif', color: !company ? '#C4C8CC' : '#1B2736' }}
                  >
                    Filter by Office
                    <span className="ml-[6px] text-[11px]" style={{ color: !company ? '#D1D5DB' : '#9CA3AF' }}>
                      (optional)
                    </span>
                  </label>
                  <OfficeDropdown
                    value={office}
                    onChange={v => { setOffice(v); setSelectedAvail(new Set()); }}
                    options={filteredOffices}
                    disabled={!company}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Email field — aligns with Available Users panel only */}
                <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                  <label className="text-[12px] text-[#1B2736]" style={{ fontFamily: 'Actor, sans-serif' }}>
                    Email
                  </label>
                  <div
                    className="flex items-center h-[40px] bg-white border rounded-[4px] px-[12px] gap-[8px] transition-colors"
                    style={{ borderColor: '#9EA2A8' }}
                  >
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Type email or name to search…"
                      value={emailQuery}
                      onChange={e => { setEmailQuery(e.target.value); setSelectedAvail(new Set()); }}
                      className="flex-1 text-[14px] text-[#1B2736] placeholder-[#C4C8CC] outline-none bg-transparent"
                    />
                    {emailQuery && (
                      <button onClick={() => setEmailQuery('')} className="shrink-0">
                        <XSmallIcon />
                      </button>
                    )}
                  </div>
                </div>
                {/* Right side is intentionally empty — no field for email tab */}
                <div className="shrink-0" style={{ width: '148px' }} />
                <div className="flex-1 min-w-0" />
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-[1.5px] bg-[#D9D9D9] shrink-0" />

          {/* Two panels + Transfer buttons */}
          <div className="flex flex-1 min-h-0 gap-0 pb-[12px]">
            {/* Available Users — accepts drops FROM cart (removes from cart) */}
            <UserPanel
              title="Available Users"
              users={availableUsers}
              selectedIds={selectedAvail}
              onToggleRow={toggleAvail}
              onToggleAll={toggleAllAvail}
              filterValue={availFilter}
              onFilterChange={setAvailFilter}
              disabledIds={disabledIds}
              emptyMessage={availEmptyMsg}
              highlightQuery={tab === 'email' ? emailQuery : ''}
              splitDomain={tab === 'email'}
              dragType={DRAG_FROM_AVAIL}
              dropType={DRAG_FROM_CART}
              hideFilter={tab === 'email'}
              onDrop={dropped => {
                // Cart rows dragged back to Available → remove all from cart
                const ids = new Set(dropped.map(u => u.id));
                setCart(prev => prev.filter(u => !ids.has(u.id)));
                setSelectedCart(new Set());
              }}
            />

            {/* ── Add / Remove buttons ── */}
            <div className="flex flex-col items-center justify-center gap-[10px] px-[18px] shrink-0">
              {/* ADD → Primary Medium */}
              <button
                onClick={handleAdd}
                disabled={selectableSelected === 0}
                className="flex items-center justify-center gap-[4px] rounded-[4px]"
                style={{
                  height: 36,
                  padding: '0 16px',
                  backgroundColor: selectableSelected > 0 ? '#FF4D00' : '#FFBD9C',
                  border: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '20px',
                  cursor: selectableSelected > 0 ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
                onMouseLeave={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
                onMouseDown={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4380D'; }}
                onMouseUp={e => { if (selectableSelected > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
                title={selectableSelected > 0 ? `Add ${selectableSelected} user(s) to cart` : 'Select users to add'}
              >
                Add <ArrowTransferIcon direction="right" />
              </button>
              {/* ← REMOVE — Secondary Medium */}
              <button
                onClick={handleRemove}
                disabled={selectedCart.size === 0}
                className="flex items-center justify-center gap-[4px] rounded-[4px]"
                style={{
                  height: 36,
                  padding: '0 16px',
                  backgroundColor: selectedCart.size === 0 ? '#F5F5F5' : '#F2F3F4',
                  border: `1px solid ${selectedCart.size === 0 ? '#BFBFBF' : '#C3C7CC'}`,
                  color: selectedCart.size === 0 ? '#BFBFBF' : '#616D79',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '20px',
                  cursor: selectedCart.size === 0 ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'background-color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  if (selectedCart.size > 0) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedCart.size > 0) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
                  }
                }}
                onMouseDown={e => {
                  if (selectedCart.size > 0) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#616D79';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                    (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
                  }
                }}
                onMouseUp={e => {
                  if (selectedCart.size > 0) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                    (e.currentTarget as HTMLButtonElement).style.color = '#616D79';
                  }
                }}
                title={selectedCart.size > 0 ? `Remove ${selectedCart.size} user(s) from cart` : 'Select cart items to remove'}
              >
                <ArrowTransferIcon direction="left" /> Remove
              </button>
            </div>

            {/* Added Users Cart — accepts drops FROM available (adds to cart) */}
            <UserPanel
              title="Added Users Cart"
              users={cart}
              selectedIds={selectedCart}
              onToggleRow={toggleCartRow}
              onToggleAll={toggleAllCart}
              filterValue={cartFilter}
              onFilterChange={setCartFilter}
              emptyMessage="No users added yet — drag a user here or use the Add button"
              dragType={DRAG_FROM_CART}
              dropType={DRAG_FROM_AVAIL}
              onDrop={dropped => {
                // Available rows dragged onto Cart → add all to cart
                const toAdd = dropped.filter(u => !disabledIds.has(u.id));
                if (!toAdd.length) return;
                setCart(prev => {
                  const existing = new Set(prev.map(u => u.id));
                  return [...prev, ...toAdd.filter(u => !existing.has(u.id))];
                });
                setSelectedAvail(new Set());
              }}
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex items-center justify-between px-[28px]"
          style={{
            height: 72,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #C3C7CC',
            flexShrink: 0,
          }}
        >
          {/* Invite New User — Secondary Medium */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-[4px] rounded-[4px]"
            style={{
              height: 36,
              padding: '0 16px',
              backgroundColor: '#F2F3F4',
              border: '1px solid #C3C7CC',
              color: '#616D79',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background-color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#616D79';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
              (e.currentTarget as HTMLButtonElement).style.color = '#616D79';
            }}
          >
            <PlusIcon />
            Invite New User
          </button>
          <div className="flex items-center gap-[10px]">
            {cart.length > 0 && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9EA2A8' }}>
                {cart.length} user{cart.length > 1 ? 's' : ''} ready to add
              </span>
            )}
            {/* Cancel — Secondary Medium */}
            <button
              onClick={onClose}
              style={{
                height: 36,
                padding: '0 16px',
                backgroundColor: '#F2F3F4',
                border: '1px solid #C3C7CC',
                borderRadius: 4,
                color: '#616D79',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background-color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
              }}
              onMouseDown={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#616D79';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
              }}
              onMouseUp={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                (e.currentTarget as HTMLButtonElement).style.color = '#616D79';
              }}
            >
              Cancel
            </button>
            {/* Add to Project — Primary Medium */}
            <button
              onClick={handleAddToProject}
              disabled={cart.length === 0}
              style={{
                height: 36,
                padding: '0 16px',
                backgroundColor: cart.length > 0 ? '#FF4D00' : '#FFBD9C',
                border: 'none',
                borderRadius: 4,
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '20px',
                cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
              onMouseLeave={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
              onMouseDown={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4380D'; }}
              onMouseUp={e => { if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
            >
              {cart.length > 0 ? `Add ${cart.length} user${cart.length > 1 ? 's' : ''} to project` : 'Add to Project'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Invite New User sub-modal (z-200/z-201, above this modal) ── */}
      <InviteUserModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        projectUserEmails={projectUserEmails}
      />
    </DndProvider>
  );
}
// keep the InviteUserModal rendered outside the Add User modal's z-stack
// (it renders its own overlay + modal at z-200/z-201 via the component itself)