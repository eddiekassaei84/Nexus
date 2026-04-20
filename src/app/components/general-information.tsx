// General Information — Project Configuration Module (ImageCropModal now shared)
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ImageCropModal } from './ui/image-crop-modal';
import trashPaths from '../../imports/svg-fjqvq36uqo';
import chevronDownPaths from '../../imports/svg-xtqju8nupv';


// ─── SVG path constants ───────────────────────────────────────────────────────
const INFO_CIRCLE_PATH = "M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM8 8.25V9.75H9.25V14.25H8V15.75H12V14.25H10.75V9C10.75 8.58579 10.4142 8.25 10 8.25H8ZM9.5 4C8.67157 4 8 4.67157 8 5.5C8 6.32843 8.67157 7 9.5 7C10.3284 7 11 6.32843 11 5.5C11 4.67157 10.3284 4 9.5 4Z";
const ARCHIVE_BOX_PATH = "M3.5106 14.065H11.7748C13.3192 14.065 14.1705 13.2363 14.1705 11.692V4.38449C14.8786 4.19615 15.2779 3.60854 15.2779 2.77232V1.67243C15.2779 0.655413 14.6903 0 13.6733 0H1.61217C0.632813 0 0 0.655413 0 1.67243V2.77232C0 3.60854 0.399275 4.19615 1.11496 4.37695V11.692C1.11496 13.2439 1.95871 14.065 3.5106 14.065ZM1.90597 3.08119C1.5519 3.08119 1.40876 2.92299 1.40876 2.57645V1.86077C1.40876 1.51423 1.5519 1.35603 1.90597 1.35603H13.387C13.7335 1.35603 13.8767 1.51423 13.8767 1.86077V2.57645C13.8767 2.92299 13.7335 3.08119 13.387 3.08119H1.90597ZM3.57087 12.6487C2.93806 12.6487 2.59152 12.3097 2.59152 11.6694V4.43722H12.6939V11.6694C12.6939 12.3097 12.3398 12.6487 11.707 12.6487H3.57087ZM5.21317 7.51088H10.0798C10.4339 7.51088 10.69 7.26228 10.69 6.89314V6.65206C10.69 6.28292 10.4339 6.03432 10.0798 6.03432H5.21317C4.8591 6.03432 4.60296 6.28292 4.60296 6.65206V6.89314C4.60296 7.26228 4.8591 7.51088 5.21317 7.51088Z";

// ─── Figma chevron.down — used for all dropdown / select fields ───────────────
// Source: Frame17357.tsx · svg-xtqju8nupv · viewBox 0 0 8.89453 5.1077
// Rendered inside a 16×16 container; colour default #9EA3A9
function ChevronDownIcon({ color = '#9EA3A9', rotated = false }: { color?: string; rotated?: boolean }) {
  return (
    <div style={{
      width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.15s',
    }}>
      <svg width="8.89453" height="5.1077" viewBox="0 0 8.89453 5.1077" fill="none" style={{ display: 'block' }}>
        <path d={chevronDownPaths.p239bdd00} fill={color} />
      </svg>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProjectData {
  projectName: string;
  projectNumber: string;
  projectType: string;
  projectStage: string;
  deliveryMethod: string;
  projectDescription: string;
  squareFootage: string;
  totalValue: string;
  code: string;
  buildingType: string;
  startDate: string;
  endDate: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  coordFormat: 'decimal' | 'dms';
  latitude: string;
  latDirection: 'N' | 'S';
  longitude: string;
  lonDirection: 'E' | 'W';
  timezone: string;
  jobSite: string;
  projectImageUrl: string;
  projectLogoUrl: string;
}

export const INITIAL_DATA: ProjectData = {
  projectName: 'Cleveland Hospital',
  projectNumber: 'CLV-HSP-2026-01',
  projectType: 'New Construction',
  projectStage: 'Construction',
  deliveryMethod: 'Construction Manager at Risk',
  projectDescription: 'Expansion and modernization of Cleveland Hospital including new patient tower, surgical suites, and upgraded critical care units.',
  squareFootage: '420,000',
  totalValue: '185,000,000',
  code: 'CLV-HSP',
  buildingType: 'Hospital',
  startDate: '03/01/2026',
  endDate: '11/30/2029',
  country: 'United States',
  address: '9500 Euclid Avenue',
  address2: '',
  city: 'Cleveland',
  state: 'Ohio',
  zip: '44195',
  coordFormat: 'decimal',
  latitude: '41.5036',
  latDirection: 'N',
  longitude: '81.6200',
  lonDirection: 'W',
  timezone: '(UTC -05:00) Eastern Time',
  jobSite: '',
  projectImageUrl: 'https://images.unsplash.com/photo-1592925037394-b362acf14512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGV2ZWxhbmQlMjBob3NwaXRhbCUyMG1vZGVybiUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzczMjY0MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  projectLogoUrl: 'https://images.unsplash.com/photo-1647527936248-fab25d0ce690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBsb2dvJTIwYmx1ZSUyMGNyb3NzfGVufDF8fHx8MTc3MzI2NDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
};

// ─── Shared Primitives ────────────────────────────────────────────────────────

function ChevronIcon({ expanded }: { expanded: boolean }) {
  // Figma path from svg-veesptlzb4 — base shape points LEFT (<)
  // Expanded  → rotate -90° → points DOWN  (∨)
  // Collapsed → rotate 180° → points RIGHT (>)
  return (
    <div style={{ width: 16, height: 16, position: 'relative', flexShrink: 0 }}>
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 6, height: 12,
          transform: expanded
            ? 'translate(-50%, -50%) rotate(-90deg)'
            : 'translate(-50%, -50%) rotate(180deg)',
          transition: 'transform 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="8.12132" height="14.1213" viewBox="0 0 8.12132 14.1213" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path
            d="M7.06066 1.06066L1.06066 7.06066L7.06066 13.0607"
            stroke="#616D79"
            strokeLinecap="square"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1B2736' }}>
        {children}
      </span>
      {required && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#DB0000', lineHeight: '20px' }}>*</span>
      )}
    </div>
  );
}

// View-mode value — no border, transparent bg
function ViewValue({ value }: { value: string }) {
  const isEmpty = !value || value.trim() === '';
  return (
    <div style={{ minHeight: 24, display: 'flex', alignItems: 'center' }}>
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        color: isEmpty ? '#BFBFBF' : '#384857',
        background: 'transparent',
      }}>
        {isEmpty ? '—' : value}
      </span>
    </div>
  );
}

// Edit-mode text input
function TextInput({ value, onChange, placeholder, error, onBlur: onBlurProp }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  onBlur?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? '#FFA39E' : focused ? '#91D5FF' : '#9EA2A8';
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Type here'}
        style={{
          width: '100%',
          height: 40,
          padding: value ? '0 36px 0 12px' : '0 12px',
          background: '#FFFFFF',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 14,
          color: '#344054',
          outline: 'none',
          boxSizing: 'border-box' as const,
          transition: 'border-color 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlurProp?.(); }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ position: 'absolute', right: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M9.13281 9.83906C9.32656 10.0328 9.64531 10.0328 9.83906 9.83906C10.0328 9.64531 10.0328 9.32656 9.83906 9.13281L5.69844 4.99219L9.83906 0.851562C10.0328 0.657812 10.0328 0.339062 9.83906 0.145312C9.64531 -0.0484375 9.32656 -0.0484375 9.13281 0.145312L4.99219 4.28594L0.851562 0.145312C0.657812 -0.0484375 0.339062 -0.0484375 0.145312 0.145312C-0.0484375 0.339062 -0.0484375 0.657812 0.145312 0.851562L4.28594 4.99219L0.145312 9.13281C-0.0484375 9.32656 -0.0484375 9.64531 0.145312 9.83906C0.339062 10.0328 0.657812 10.0328 0.851562 9.83906L4.99219 5.69844L9.13281 9.83906Z" fill="#8C8C8C" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Edit-mode textarea
function TextAreaInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Type here'}
        rows={4}
        style={{
          width: '100%',
          minHeight: 96,
          padding: '10px 36px 10px 12px',
          background: '#FFFFFF',
          border: `1px solid ${focused ? '#91D5FF' : '#9EA2A8'}`,
          borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 14,
          color: '#344054',
          outline: 'none',
          resize: 'vertical' as const,
          boxSizing: 'border-box' as const,
          transition: 'border-color 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ position: 'absolute', right: 10, top: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M9.13281 9.83906C9.32656 10.0328 9.64531 10.0328 9.83906 9.83906C10.0328 9.64531 10.0328 9.32656 9.83906 9.13281L5.69844 4.99219L9.83906 0.851562C10.0328 0.657812 10.0328 0.339062 9.83906 0.145312C9.64531 -0.0484375 9.32656 -0.0484375 9.13281 0.145312L4.99219 4.28594L0.851562 0.145312C0.657812 -0.0484375 0.339062 -0.0484375 0.145312 0.145312C-0.0484375 0.339062 -0.0484375 0.657812 0.145312 0.851562L4.28594 4.99219L0.145312 9.13281C-0.0484375 9.32656 -0.0484375 9.64531 0.145312 9.83906C0.339062 10.0328 0.657812 10.0328 0.851562 9.83906L4.99219 5.69844L9.13281 9.83906Z" fill="#8C8C8C" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Edit-mode select — matches GroupByDropdown / account landing page style
function SelectInput({ value, onChange, options, placeholder, dividerAfter }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  dividerAfter?: string;
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const [searchText, setSearchText] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const openMenu = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
    }
    setSearchText('');
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
    setSearchText('');
  };

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => searchRef.current?.focus(), 30);
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [open]);

  // Show all options when query < 2 chars; filter from 2nd character onward
  const filteredOptions = searchText.length >= 2
    ? options.filter(opt => opt.toLowerCase().includes(searchText.toLowerCase()))
    : options;

  const displayValue = value || placeholder || 'Select…';

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger: shows selected value when closed, becomes search input when open */}
      <div
        onClick={!open ? openMenu : undefined}
        style={{
          width: '100%', height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px',
          background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4, cursor: open ? 'default' : 'pointer',
          boxSizing: 'border-box', transition: 'border-color 0.15s',
          userSelect: 'none', gap: 6,
        }}
      >
        {open ? (
          <input
            ref={searchRef}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search..."
            onMouseDown={e => e.stopPropagation()}
            style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px',
              color: '#344054',
            }}
          />
        ) : (
          <span style={{
            fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px',
            color: value ? '#344054' : '#9EA3A9',
            flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {displayValue}
          </span>
        )}
        <ChevronDownIcon color={open ? '#91D5FF' : '#9EA3A9'} rotated={open} />
      </div>

      {open && ReactDOM.createPortal(
        <div
          onMouseDown={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: menuPos.top, left: menuPos.left,
            width: menuPos.width, minWidth: 180,
            background: '#FFFFFF', borderRadius: 4,
            boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
            zIndex: 9999, paddingTop: 4, paddingBottom: 4,
            maxHeight: 320, overflowY: 'auto',
          }}
        >
          {filteredOptions.length === 0 ? (
            <div style={{
              padding: '8px 12px',
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9',
            }}>
              No results found
            </div>
          ) : (
            filteredOptions.map(opt => (
              <SelectMenuItem
                key={opt}
                label={opt}
                selected={opt === value}
                onSelect={() => { onChange(opt); closeMenu(); }}
                showDividerAfter={!!(opt === dividerAfter && filteredOptions.includes(dividerAfter as string))}
              />
            ))
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

const NONE_OPTION = '-- None --';

function SelectMenuItem({ label, selected, onSelect, showDividerAfter }: {
  label: string; selected: boolean; onSelect: () => void; showDividerAfter?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isNone = label === NONE_OPTION;
  const bg = selected ? '#E6F7FF' : hovered ? '#F5F5F5' : 'transparent';

  return (
    <>
      <div
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '5px 12px', background: bg, cursor: 'pointer',
          transition: 'background 0.1s', boxSizing: 'border-box', width: '100%',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: selected ? 600 : 400,
          fontSize: 14, lineHeight: '20px',
          color: isNone ? '#9CA4AE' : '#384857',
          fontStyle: isNone ? 'italic' : 'normal',
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
        {selected && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0, marginLeft: 8 }}>
            <path d="M11.6667 1L4.33333 8.33333L1 5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {showDividerAfter && (
        <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
      )}
    </>
  );
}

// Toggle switch — §15.6
function ToggleSwitch({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!active)}
      style={{ width: 40, height: 20, borderRadius: 10, background: active ? '#FF4D00' : '#D9D9D9', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
    >
      <div style={{ position: 'absolute', top: 2, left: active ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
    </div>
  );
}

// Radio button
function RadioButton({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }} onClick={onChange}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1px solid ${checked ? '#616D79' : '#D9D9D9'}`, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#616D79' }} />}
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#262626' }}>{label}</span>
    </label>
  );
}

// ─── DatePicker — orange-themed calendar popup ────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DP_ORANGE6 = '#FF4D00';
const DP_ORANGE1 = '#FFEDE4';
const DP_ORANGE3 = '#FFBD9C';

function DatePicker({ value, onChange, placeholder = 'MM/DD/YYYY' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Sub-dropdown state
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const monthBtnRef = useRef<HTMLButtonElement>(null);
  const yearBtnRef = useRef<HTMLButtonElement>(null);
  const monthPanelRef = useRef<HTMLDivElement>(null);
  const yearPanelRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);
  const monthListRef = useRef<HTMLDivElement>(null);
  const [monthDropPos, setMonthDropPos] = useState({ top: 0, left: 0 });
  const [yearDropPos, setYearDropPos] = useState({ top: 0, left: 0 });
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const parseDate = (str: string): Date | null => {
    if (!str) return null;
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    const [m, d, y] = parts.map(Number);
    if (isNaN(m) || isNaN(d) || isNaN(y) || y < 100) return null;
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? null : date;
  };

  const today = new Date();
  const selectedDate = parseDate(value);

  const [viewMonth, setViewMonth] = useState(() => selectedDate?.getMonth() ?? today.getMonth());
  const [viewYear, setViewYear]   = useState(() => selectedDate?.getFullYear() ?? today.getFullYear());

  const formatDate = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

  const openCalendar = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    }
    const d = parseDate(value);
    setViewMonth(d?.getMonth() ?? today.getMonth());
    setViewYear(d?.getFullYear() ?? today.getFullYear());
    setMonthOpen(false);
    setYearOpen(false);
    setOpen(true);
  };

  // Main popup close handler — exempt sub-dropdown panels so clicking inside them doesn't close calendar
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popupRef.current?.contains(target)) return;
      if (yearPanelRef.current?.contains(target)) return;
      if (monthPanelRef.current?.contains(target)) return;
      setOpen(false);
      setYearOpen(false);
      setMonthOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Sub-dropdown close handler
  useEffect(() => {
    if (!monthOpen && !yearOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (monthOpen) {
        if (monthBtnRef.current?.contains(target)) return;
        if (monthPanelRef.current?.contains(target)) return;
        setMonthOpen(false);
      }
      if (yearOpen) {
        if (yearBtnRef.current?.contains(target)) return;
        if (yearPanelRef.current?.contains(target)) return;
        setYearOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [monthOpen, yearOpen]);

  // Auto-scroll year list to selected year on open
  useEffect(() => {
    if (yearOpen && yearListRef.current) {
      const idx = years.indexOf(viewYear);
      if (idx >= 0) yearListRef.current.scrollTop = Math.max(0, (idx - 3) * 32);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearOpen]);

  // Auto-scroll month list to selected month on open
  useEffect(() => {
    if (monthOpen && monthListRef.current) {
      monthListRef.current.scrollTop = Math.max(0, (viewMonth - 3) * 32);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthOpen]);

  const openMonthDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (monthBtnRef.current) {
      const rect = monthBtnRef.current.getBoundingClientRect();
      setMonthDropPos({ top: rect.bottom + 2, left: rect.left });
    }
    setMonthOpen(v => !v);
    setYearOpen(false);
  };

  const openYearDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (yearBtnRef.current) {
      const rect = yearBtnRef.current.getBoundingClientRect();
      setYearDropPos({ top: rect.bottom + 2, left: rect.left });
    }
    setYearOpen(v => !v);
    setMonthOpen(false);
  };

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else { setViewMonth(m => m - 1); } };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else { setViewMonth(m => m + 1); } };

  const getDays = (): (number | null)[] => {
    const first = new Date(viewYear, viewMonth, 1).getDay();
    const total = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  };

  const isSelected = (day: number) =>
    !!selectedDate &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;

  const selectDay = (day: number) => { onChange(formatDate(new Date(viewYear, viewMonth, day))); setOpen(false); };

  const goToday = () => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    onChange(formatDate(today));
    setOpen(false);
  };

  const currentYear = today.getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 5 + i);
  const days = getDays();

  const dropPanelStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10000,
    background: '#FFFFFF',
    border: '1px solid #D9D9D9',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const scrollArrowBtnStyle: React.CSSProperties = {
    width: '100%', height: 22,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
  };

  return (
    <>
      {/* ── Trigger input ── */}
      <div
        ref={triggerRef}
        onClick={openCalendar}
        style={{
          position: 'relative',
          height: 40, display: 'flex', alignItems: 'center', gap: 8,
          border: `1px solid ${open ? DP_ORANGE3 : '#D0D5DD'}`,
          borderRadius: 4, background: '#FFFFFF', cursor: 'pointer',
          paddingLeft: 10, paddingRight: value ? 30 : 10,
          userSelect: 'none', transition: 'border-color 0.15s',
        }}
      >
        {/* Calendar icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1.5" y="3.5" width="13" height="11" rx="1.5" stroke="#9CA4AE" strokeWidth="1.4" />
          <path d="M5 1.5v3M11 1.5v3" stroke="#9CA4AE" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M1.5 7h13" stroke="#9CA4AE" strokeWidth="1.4" />
        </svg>
        {/* Value */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {value ? (
            <span style={{
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
              lineHeight: '20px', color: '#344054',
              background: open ? DP_ORANGE1 : 'transparent',
              padding: open ? '1px 4px' : '0',
              borderRadius: open ? 2 : 0,
              border: open ? `1px solid ${DP_ORANGE3}` : 'none',
              transition: 'background 0.15s',
            }}>
              {value}
            </span>
          ) : (
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#667085' }}>{placeholder}</span>
          )}
        </div>
        {/* Clear × — identical pattern to NumericInput: absolute-positioned filled 10×10 SVG */}
        {value && (
          <button
            onMouseDown={e => e.preventDefault()}
            onClick={e => { e.stopPropagation(); onChange(''); }}
            style={{ position: 'absolute', right: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', zIndex: 2 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.13281 9.83906C9.32656 10.0328 9.64531 10.0328 9.83906 9.83906C10.0328 9.64531 10.0328 9.32656 9.83906 9.13281L5.69844 4.99219L9.83906 0.851562C10.0328 0.657812 10.0328 0.339062 9.83906 0.145312C9.64531 -0.0484375 9.32656 -0.0484375 9.13281 0.145312L4.99219 4.28594L0.851562 0.145312C0.657812 -0.0484375 0.339062 -0.0484375 0.145312 0.145312C-0.0484375 0.339062 -0.0484375 0.657812 0.145312 0.851562L4.28594 4.99219L0.145312 9.13281C-0.0484375 9.32656 -0.0484375 9.64531 0.145312 9.83906C0.339062 10.0328 0.657812 10.0328 0.851562 9.83906L4.99219 5.69844L9.13281 9.83906Z" fill="#8C8C8C" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Calendar popup (portalled) ── */}
      {open && ReactDOM.createPortal(
        <div
          ref={popupRef}
          style={{
            position: 'absolute', top: popupPos.top, left: popupPos.left,
            zIndex: 9999, background: '#FFFFFF', borderRadius: 8,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
            border: '1px solid #E0E4E8',
            // Fixed width: 2×12px padding + 7×36px cells + 6×2px gaps = 288px — hugs content, independent of trigger width
            width: 288,
            overflow: 'hidden',
          }}
        >
          {/* ── Month / Year navigation ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid #F0F0F0' }}>
            {/* Prev month */}
            <button
              onClick={prevMonth}
              style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 4, cursor: 'pointer', flexShrink: 0 }}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Month + Year custom buttons */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {/* Month — plain text + chevron */}
              <button
                ref={monthBtnRef}
                onClick={openMonthDrop}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 600,
                  color: '#1D2C38', padding: '2px 2px', borderRadius: 3, outline: 'none',
                }}
              >
                {MONTHS[viewMonth]}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{ transform: monthOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
                >
                  <path d="M1 1L5 5L9 1" stroke="#1D2C38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Year — grey pill + chevron */}
              <button
                ref={yearBtnRef}
                onClick={openYearDrop}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: '#EEF0F2', border: 'none', cursor: 'pointer',
                  fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 600,
                  color: '#1D2C38', padding: '3px 8px', borderRadius: 4, outline: 'none',
                }}
              >
                {viewYear}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{ transform: yearOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
                >
                  <path d="M1 1L5 5L9 1" stroke="#1D2C38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Next month */}
            <button
              onClick={nextMonth}
              style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 4, cursor: 'pointer', flexShrink: 0 }}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Day grid — cells are 36×36px squares */}
          <div style={{ padding: '8px 12px 4px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', marginBottom: 2 }}>
              {DAY_HEADERS.map(h => (
                <div key={h} style={{ width: 36, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#616D79' }}>{h}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 2 }}>
              {days.map((day, idx) => {
                if (!day) return <div key={idx} style={{ width: 36, height: 36 }} />;
                const sel = isSelected(day);
                const tod = isToday(day);
                const hov = hoveredDay === day;
                return (
                  <div
                    key={idx}
                    onClick={() => selectDay(day)}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    style={{
                      width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, cursor: 'pointer', boxSizing: 'border-box',
                      background: sel ? DP_ORANGE6 : hov ? DP_ORANGE1 : 'transparent',
                      border: tod && !sel ? `1.5px solid ${DP_ORANGE3}` : 'none',
                      fontFamily: 'Open Sans, sans-serif', fontSize: 13,
                      fontWeight: sel ? 600 : 400,
                      color: sel ? '#FFFFFF' : '#1D2C38',
                      transition: 'background 0.1s',
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #F0F0F0', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={goToday}
              style={{ height: 28, padding: '0 12px', background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#FF4D00', cursor: 'pointer' }}
            >
              Today
            </button>
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              style={{ background: 'none', border: 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: DP_ORANGE6, cursor: 'pointer', padding: 0 }}
            >
              Reset selection
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ── Year dropdown panel (portalled, position:fixed) ── */}
      {open && yearOpen && ReactDOM.createPortal(
        <div
          ref={yearPanelRef}
          style={{ ...dropPanelStyle, top: yearDropPos.top, left: yearDropPos.left, width: 110 }}
          onMouseDown={e => e.stopPropagation()}
        >
          {/* ▲ scroll up */}
          <button style={scrollArrowBtnStyle} onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); yearListRef.current?.scrollBy({ top: -32, behavior: 'smooth' }); }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 5L5 1L9 5" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Year list */}
          <div ref={yearListRef} style={{ overflowY: 'auto', maxHeight: 224 }}>
            {years.map(yr => {
              const isSel = yr === viewYear;
              const isHov = hoveredYear === yr;
              return (
                <div key={yr}
                  onMouseEnter={() => setHoveredYear(yr)}
                  onMouseLeave={() => setHoveredYear(null)}
                  onClick={e => { e.stopPropagation(); setViewYear(yr); setYearOpen(false); }}
                  style={{
                    height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 12px', boxSizing: 'border-box', cursor: 'pointer',
                    fontFamily: 'Open Sans, sans-serif', fontSize: 14,
                    fontWeight: isSel ? 700 : 400, color: '#1D2C38',
                    background: isSel ? '#F0F7FF' : isHov ? '#F5F5F5' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  {yr}
                  {isSel && (
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 5L4.5 8.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
          {/* ▼ scroll down */}
          <button style={scrollArrowBtnStyle} onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); yearListRef.current?.scrollBy({ top: 32, behavior: 'smooth' }); }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>,
        document.body
      )}

      {/* ── Month dropdown panel (portalled, position:fixed) ── */}
      {open && monthOpen && ReactDOM.createPortal(
        <div
          ref={monthPanelRef}
          style={{ ...dropPanelStyle, top: monthDropPos.top, left: monthDropPos.left, width: 148 }}
          onMouseDown={e => e.stopPropagation()}
        >
          {/* ▲ scroll up */}
          <button style={scrollArrowBtnStyle} onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); monthListRef.current?.scrollBy({ top: -32, behavior: 'smooth' }); }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 5L5 1L9 5" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Month list */}
          <div ref={monthListRef} style={{ overflowY: 'auto', maxHeight: 224 }}>
            {MONTHS.map((mName, mIdx) => {
              const isSel = mIdx === viewMonth;
              const isHov = hoveredMonth === mIdx;
              return (
                <div key={mName}
                  onMouseEnter={() => setHoveredMonth(mIdx)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  onClick={e => { e.stopPropagation(); setViewMonth(mIdx); setMonthOpen(false); }}
                  style={{
                    height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 12px', boxSizing: 'border-box', cursor: 'pointer',
                    fontFamily: 'Open Sans, sans-serif', fontSize: 14,
                    fontWeight: isSel ? 700 : 400, color: '#1D2C38',
                    background: isSel ? '#F0F7FF' : isHov ? '#F5F5F5' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                >
                  {mName}
                  {isSel && (
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 5L4.5 8.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
          {/* ▼ scroll down */}
          <button style={scrollArrowBtnStyle} onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); monthListRef.current?.scrollBy({ top: 32, behavior: 'smooth' }); }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#8C8C8C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

// Primary button — §15.1 Medium
function PrimaryBtn({ label, icon, onClick }: { label: string; icon?: React.ReactNode; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 16px', background: hov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0 }}
    >
      {icon}
      {label}
    </button>
  );
}

// Secondary button — §15.2 Medium
function SecondaryBtn({ label, icon, onClick }: { label: string; icon?: React.ReactNode; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 16px', background: hov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#616D79', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', flexShrink: 0 }}
    >
      {icon}
      {label}
    </button>
  );
}

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2z" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 11V3M8 3L5 6M8 3L11 6" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 13H14" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, expanded, onToggle, showEdit, isEditing, onEdit, onSave, onCancel }: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  showEdit?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', height: 48, background: '#F9FAFB', borderBottom: '1px solid #F0F0F0', padding: '0 16px 0 12px', flexShrink: 0, cursor: 'pointer', userSelect: 'none' }}
    >
      {/* Chevron + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0 }}
        >
          <ChevronIcon expanded={expanded} />
        </button>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#384857', letterSpacing: 0, whiteSpace: 'nowrap' }}>
          {title}
        </span>
      </div>
      {/* Edit / Save-Cancel buttons */}
      {showEdit && (
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
          onClick={e => e.stopPropagation()}
        >
          {isEditing ? (
            <>
              <SecondaryBtn label="Cancel" onClick={onCancel!} />
              <PrimaryBtn label="Save" onClick={onSave!} />
            </>
          ) : (
            <SecondaryBtn label="Edit" icon={<EditIcon />} onClick={onEdit!} />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Numeric input with formatting + validation ───────────────────────────────
function NumericInput({
  value, onChange, prefix, suffix, allowDecimal = false, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  allowDecimal?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState(() => value.replace(/,/g, ''));

  // Keep raw in sync when the parent value changes externally (e.g. cancel/reset)
  useEffect(() => {
    if (!focused) setRaw(value.replace(/,/g, ''));
  }, [value, focused]);

  const formatWithCommas = (s: string): string => {
    if (!s) return '';
    const [intPart, decPart] = s.split('.');
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
  };

  const isValid = (s: string): boolean => {
    if (!s || s === '' || s === '.') return true; // empty = no error yet
    const n = Number(s.replace(/,/g, ''));
    return !isNaN(n) && n > 0;
  };

  const hasError    = raw !== '' && !isValid(raw);
  const borderColor = hasError ? '#FFA39E' : focused ? '#91D5FF' : '#9EA2A8';
  const bgColor     = hasError ? '#FFF1F0' : '#FFFFFF';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = allowDecimal
      ? e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\..*/g, '$1')
      : e.target.value.replace(/\D/g, '');
    setRaw(cleaned);
  };

  const handleBlur = () => {
    setFocused(false);
    if (raw === '' || raw === '.') { onChange(''); return; }
    const num = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(num) || num <= 0) return; // keep raw, show error
    const formatted = allowDecimal
      ? formatWithCommas(num.toString())
      : formatWithCommas(Math.round(num).toString());
    onChange(formatted);
    setRaw(formatted.replace(/,/g, ''));
  };

  const handleFocus = () => {
    setFocused(true);
    setRaw(raw.replace(/,/g, '')); // strip commas for editing
  };

  const handleClear = () => { setRaw(''); onChange(''); };

  const displayValue = focused ? raw : formatWithCommas(raw);
  const paddingLeft  = prefix ? 28 : 12;
  const paddingRight = raw    ? 36 : (suffix ? 36 : 12);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Prefix adornment (e.g. "$") */}
        {prefix && (
          <span style={{
            position: 'absolute', left: 10, zIndex: 1,
            fontFamily: 'Open Sans, sans-serif', fontSize: 14,
            color: hasError ? '#D92D20' : '#616D79',
            pointerEvents: 'none', userSelect: 'none', lineHeight: '20px',
          }}>
            {prefix}
          </span>
        )}

        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder ?? (allowDecimal ? '0.00' : '0')}
          style={{
            width: '100%', height: 40,
            paddingLeft, paddingRight,
            background: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14, color: '#344054',
            outline: 'none', boxSizing: 'border-box' as const,
            transition: 'border-color 0.15s, background 0.15s',
          }}
        />

        {/* Suffix adornment (e.g. "ft²") — only shown when field is empty */}
        {suffix && !raw && (
          <span style={{
            position: 'absolute', right: 10, zIndex: 1,
            fontFamily: 'Open Sans, sans-serif', fontSize: 13,
            color: '#9CA4AE', pointerEvents: 'none', userSelect: 'none',
          }}>
            {suffix}
          </span>
        )}

        {/* Clear × button */}
        {raw && (
          <button
            onMouseDown={e => e.preventDefault()} // keep focus on input until click fires
            onClick={handleClear}
            style={{ position: 'absolute', right: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', zIndex: 2 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.13281 9.83906C9.32656 10.0328 9.64531 10.0328 9.83906 9.83906C10.0328 9.64531 10.0328 9.32656 9.83906 9.13281L5.69844 4.99219L9.83906 0.851562C10.0328 0.657812 10.0328 0.339062 9.83906 0.145312C9.64531 -0.0484375 9.32656 -0.0484375 9.13281 0.145312L4.99219 4.28594L0.851562 0.145312C0.657812 -0.0484375 0.339062 -0.0484375 0.145312 0.145312C-0.0484375 0.339062 -0.0484375 0.657812 0.145312 0.851562L4.28594 4.99219L0.145312 9.13281C-0.0484375 9.32656 -0.0484375 9.64531 0.145312 9.83906C0.339062 10.0328 0.657812 10.0328 0.851562 9.83906L4.99219 5.69844L9.13281 9.83906Z" fill="#8C8C8C" />
            </svg>
          </button>
        )}
      </div>

      {/* Inline validation error */}
      {hasError && (
        <span style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400,
          color: '#FF4D4F', lineHeight: '16px',
        }}>
          {allowDecimal
            ? 'Enter a valid positive number (e.g. 1,500,000 or 1500000.00)'
            : 'Enter a valid positive whole number (e.g. 420,000)'}
        </span>
      )}
    </div>
  );
}

// ─── Form field wrapper ───────────────────────────────────────────────────────
function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </div>
  );
}

// ─── ImageCropModal is imported from './ui/image-crop-modal' — see §25. ────────
// The previous 300-line inline definition has been extracted to that shared file.
// Keeping this comment as a navigation aid for future developers.


// ─── Remove Image Confirmation Modal ─────────────────────────────────────────
function RemoveImageModal({ label, onConfirm, onClose }: { label: string; onConfirm: () => void; onClose: () => void }) {
  const [typedValue, setTypedValue] = useState('');
  const canConfirm = typedValue.toLowerCase() === 'remove';

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', width: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>Remove image</p>
            <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ padding: 8 }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3L18 17H2L10 3Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8v4M10 14v.5" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', margin: '0 0 4px' }}>Remove {label}?</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79', margin: 0, lineHeight: '20px' }}>
                This action will permanently remove the image. Type <strong style={{ color: '#1D2C38' }}>remove</strong> below to confirm.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38' }}>Type "remove" to confirm</label>
            <input autoFocus value={typedValue} onChange={e => setTypedValue(e.target.value)} placeholder="remove"
              onKeyDown={e => { if (e.key === 'Enter' && canConfirm) onConfirm(); }}
              style={{ height: 40, padding: '0 12px', border: `1px solid ${canConfirm ? '#FFA39E' : '#D0D5DD'}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', outline: 'none', background: canConfirm ? '#FFF1F0' : '#FFFFFF', transition: 'border-color 0.15s, background 0.15s', boxSizing: 'border-box', width: '100%' }} />
          </div>
        </div>
        {/* Footer */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ height: 1, background: '#C3C7CC', margin: '24px 0 0' }} />
          <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 10 }}>
            <SecondaryBtn label="Cancel" onClick={onClose} />
            <button disabled={!canConfirm} onClick={() => canConfirm && onConfirm()}
              style={{ height: 36, padding: '0 16px', background: canConfirm ? '#D92D20' : '#F5F5F5', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: canConfirm ? '#FFFFFF' : '#BFBFBF', cursor: canConfirm ? 'pointer' : 'not-allowed', transition: 'background 0.15s', whiteSpace: 'nowrap' }}>
              Remove image
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Image empty-state placeholders ──────────────────────────────────────────
function ProjectImagePlaceholder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Photo / landscape icon */}
      <svg width="64" height="52" viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Frame */}
        <rect x="1" y="1" width="62" height="50" rx="5" fill="#F0F2F5" stroke="#D9D9D9" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Horizon line */}
        <path d="M1 36H63" stroke="#D9D9D9" strokeWidth="1" />
        {/* Mountains */}
        <path d="M10 36L22 20L31 30L41 14L54 36H10Z" fill="#E0E4E8" />
        {/* Sun */}
        <circle cx="50" cy="11" r="5.5" fill="#E0E4E8" />
        {/* Tiny cloud */}
        <ellipse cx="16" cy="10" rx="5" ry="3" fill="#E0E4E8" />
        <ellipse cx="20" cy="9" rx="4" ry="3" fill="#E0E4E8" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA4AE', letterSpacing: 0 }}>
        No project image
      </span>
    </div>
  );
}

function ProjectLogoPlaceholder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Abstract logo frame — overlapping squares motif */}
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="50" height="50" rx="6" fill="#F0F2F5" stroke="#D9D9D9" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Outer diamond */}
        <path d="M26 10L42 26L26 42L10 26L26 10Z" fill="#E0E4E8" />
        {/* Inner diamond */}
        <path d="M26 18L34 26L26 34L18 26L26 18Z" fill="#F0F2F5" />
        {/* Centre dot */}
        <circle cx="26" cy="26" r="3" fill="#C4CAD1" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA4AE', letterSpacing: 0 }}>
        No logo uploaded
      </span>
    </div>
  );
}

// ─── Image area ───────────────────────────────────────────────────────────────
function ImageField({ label, targetWidth, targetHeight, editing, imageUrl, onImageChange }: {
  label: string; targetWidth: number; targetHeight: number;
  editing: boolean; imageUrl?: string; onImageChange?: (url: string) => void;
}) {
  // Display height proportional to target aspect ratio
  const displayH = Math.round(targetHeight * (300 / targetWidth));
  const Placeholder = label === 'Project Logo' ? ProjectLogoPlaceholder : ProjectImagePlaceholder;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // originalSource holds the PRE-CROP image (File object or initial URL string).
  // It is always passed to the modal — never the cropped JPEG output — so the
  // user can zoom out and re-crop the full original on every subsequent Edit.
  const [originalSource, setOriginalSource] = useState<File | string | null>(
    imageUrl || null
  );

  // When the image is removed, reset so the modal opens in empty-upload state
  useEffect(() => {
    if (!imageUrl) setOriginalSource(null);
  }, [imageUrl]);

  return (
    <FormField label={label}>
      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Preview or empty state */}
          <div style={{ height: displayH, borderRadius: 8, border: '1px solid #D9D9D9', background: '#F5F5F5', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {imageUrl
              ? <img alt={label} src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <Placeholder />}
          </div>
          {/* Action buttons — 50/50 split */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Edit button — opens the crop modal with the current image pre-loaded */}
            <button
              onClick={() => setShowEditModal(true)}
              style={{ flex: 1, height: 36, background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2z" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit
            </button>
            {/* Remove button */}
            <button
              onClick={() => imageUrl && setShowRemoveModal(true)}
              disabled={!imageUrl}
              style={{ flex: 1, height: 36, background: imageUrl ? '#FFF1F0' : '#F5F5F5', border: `1px solid ${imageUrl ? '#FFA39E' : '#E0E4E8'}`, borderRadius: 4, cursor: imageUrl ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: imageUrl ? '#D92D20' : '#BFBFBF', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (imageUrl) (e.currentTarget as HTMLButtonElement).style.background = '#FFE4E3'; }}
              onMouseLeave={e => { if (imageUrl) (e.currentTarget as HTMLButtonElement).style.background = '#FFF1F0'; }}
            >
              <svg width="14" height="15" viewBox="0 0 14.6239 16.875" fill="none" style={{ flexShrink: 0 }}><path d={trashPaths.pc0b2e00} fill={imageUrl ? '#D92D20' : '#BFBFBF'} /></svg>
              Remove image
            </button>
          </div>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE' }}>
            Recommended: {targetWidth} × {targetHeight} px · JPG, PNG, WEBP
          </span>
        </div>
      ) : (
        imageUrl ? (
          <div style={{ height: displayH, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <ImageWithFallback src={imageUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ height: displayH, borderRadius: 8, border: '1px solid #E5E7E9', background: '#F5F5F5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Placeholder />
          </div>
        )
      )}

      {/* Edit / crop modal — always passes originalSource (not the cropped output) */}
      {showEditModal && (
        <ImageCropModal
          file={originalSource instanceof File ? originalSource : undefined}
          imageUrl={typeof originalSource === 'string' ? originalSource : undefined}
          targetWidth={targetWidth}
          targetHeight={targetHeight}
          label={label}
          onSave={(url, src) => {
            // Store the source used for THIS crop so the next Edit reopens the full original
            setOriginalSource(src);
            setShowEditModal(false);
            onImageChange?.(url);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showRemoveModal && (
        <RemoveImageModal label={label}
          onConfirm={() => { setShowRemoveModal(false); onImageChange?.(''); }}
          onClose={() => setShowRemoveModal(false)} />
      )}
    </FormField>
  );
}

// ─── Project Information fields ───────────────────────────────────────────────
function ProjectInformationFields({ data, editing, onChange, nameError, onNameChange }: {
  data: ProjectData;
  editing: boolean;
  onChange: (u: Partial<ProjectData>) => void;
  nameError?: boolean;
  onNameChange?: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 32, padding: 24, background: '#FFFFFF' }}>
      {/* Column 1 */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FormField label="Project Name" required>
          {editing ? (
            <div>
              <TextInput
                value={data.projectName}
                onChange={v => {
                  onChange({ projectName: v });
                  onNameChange?.(v);
                }}
                error={nameError}
              />
              {nameError && (
                <span style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: '16px',
                  color: '#FF4D4F',
                  marginTop: 4,
                  display: 'block',
                }}>
                  Project Name is required and cannot be empty.
                </span>
              )}
            </div>
          ) : (
            <ViewValue value={data.projectName} />
          )}
        </FormField>
        <FormField label="Project Number">
          {editing
            ? <TextInput value={data.projectNumber} onChange={v => onChange({ projectNumber: v })} />
            : <ViewValue value={data.projectNumber} />}
        </FormField>
        <FormField label="Project Scope">
          {editing
            ? <SelectInput value={data.projectType} onChange={v => onChange({ projectType: v === NONE_OPTION ? '' : v })} options={[NONE_OPTION,'New Construction','Renovation/Alteration','Maintenance/Service','Training Project','Demonstration Project']} placeholder="Select ..." dividerAfter={NONE_OPTION} />
            : <ViewValue value={data.projectType} />}
        </FormField>
        <FormField label="Project Type">
          {editing
            ? <SelectInput value={data.buildingType} onChange={v => onChange({ buildingType: v === NONE_OPTION ? '' : v })} options={[NONE_OPTION,'Office','Residential','Single Family','Multifamily','Retail','Healthcare','Industrial','Warehouse','Hospitality','Education','Infrastructure','Parking','Mixed Use','Government','Data Center','Renovation','Commercial','Institutional','Public Works']} placeholder="Select ..." dividerAfter={NONE_OPTION} />
            : <ViewValue value={data.buildingType} />}
        </FormField>
        <FormField label="Project Stage">
          {editing
            ? <SelectInput value={data.projectStage} onChange={v => onChange({ projectStage: v === NONE_OPTION ? '' : v })} options={[NONE_OPTION,'Design','Preconstruction','Construction','Commissioning','Handover','Closeout','Operations']} placeholder="Select ..." dividerAfter={NONE_OPTION} />
            : <ViewValue value={data.projectStage} />}
        </FormField>
        <FormField label="Delivery Method">
          {editing
            ? <SelectInput value={data.deliveryMethod} onChange={v => onChange({ deliveryMethod: v === NONE_OPTION ? '' : v })} options={[NONE_OPTION,'Design–Bid–Build','Design–Build','Construction Manager at Risk','Construction Management Agency','Integrated Project Delivery','Public–Private Partnership','EPC (Engineering, Procurement, Construction)','EPCM (Engineering, Procurement, Construction Management)','Turnkey','Design–Build–Operate','Design–Build–Finance','Multiple Prime Contracts','Job Order Contracting','Alliance Contracting']} placeholder="Select ..." dividerAfter={NONE_OPTION} />
            : <ViewValue value={data.deliveryMethod} />}
        </FormField>
      </div>

      {/* Column 2 */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FormField label="Project Code">
          {editing
            ? <TextInput value={data.code} onChange={v => onChange({ code: v })} />
            : <ViewValue value={data.code} />}
        </FormField>
        <FormField label="Square Footage">
          {editing
            ? <NumericInput value={data.squareFootage} onChange={v => onChange({ squareFootage: v })} suffix="ft²" allowDecimal={false} placeholder="e.g. 420,000" />
            : <ViewValue value={data.squareFootage ? `${data.squareFootage} ft²` : ''} />}
        </FormField>
        <FormField label="Total Value">
          {editing
            ? <NumericInput value={data.totalValue} onChange={v => onChange({ totalValue: v })} prefix="$" allowDecimal={true} placeholder="e.g. 1,500,000" />
            : <ViewValue value={data.totalValue ? `$${data.totalValue}` : ''} />}
        </FormField>
        <FormField label="Start date">
          {editing
            ? <DatePicker value={data.startDate} onChange={v => onChange({ startDate: v })} />
            : <ViewValue value={data.startDate} />}
        </FormField>
        <FormField label="End date">
          {editing
            ? <DatePicker value={data.endDate} onChange={v => onChange({ endDate: v })} />
            : <ViewValue value={data.endDate} />}
        </FormField>
        <FormField label="Project Description">
          {editing
            ? <TextAreaInput value={data.projectDescription} onChange={v => onChange({ projectDescription: v })} />
            : <ViewValue value={data.projectDescription} />}
        </FormField>
      </div>

      {/* Column 3 — Images */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ImageField label="Project Image" targetWidth={416} targetHeight={260} editing={editing} imageUrl={data.projectImageUrl} onImageChange={v => onChange({ projectImageUrl: v })} />
        <ImageField label="Project Logo" targetWidth={416} targetHeight={178} editing={editing} imageUrl={data.projectLogoUrl} onImageChange={v => onChange({ projectLogoUrl: v })} />
      </div>
    </div>
  );
}

// ─── FieldError — module-scoped so DmsInput can use it ───────────────────────
function FieldError({ msg }: { msg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 5 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="7" cy="7" r="6.25" stroke="#FF4D4F" strokeWidth="1.25" />
        <path d="M7 4v3.5" stroke="#FF4D4F" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="7" cy="10" r="0.7" fill="#FF4D4F" />
      </svg>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: '#FF4D4F', lineHeight: '16px' }}>
        {msg}
      </span>
    </div>
  );
}

// ─── decimalToDmsDisplay ──────────────────────────────────────────────────────
function decimalToDmsDisplay(decStr: string, dir: string): string {
  if (!decStr) return '';
  const dec = parseFloat(decStr);
  if (isNaN(dec)) return '';
  const abs = Math.abs(dec);
  const d = Math.floor(abs);
  const mFull = (abs - d) * 60;
  const m = Math.floor(mFull);
  const s = parseFloat(((mFull - m) * 60).toFixed(6));
  return `${d}° ${m}' ${s}" ${dir}`;
}

// ─── DmsFieldInput ────────────────────────────────────────────────────────────
// Single small numeric input for Degrees, Minutes, or Seconds.
// integer=true → digits only; false → allows decimal point, max 6 dp.
function DmsFieldInput({ value, symbol, widthPx, flexFill, integer, error, onChange, onBlur }: {
  value: string; symbol: string; widthPx?: number; flexFill?: boolean;
  integer?: boolean; error?: boolean;
  onChange: (v: string) => void; onBlur?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : '#9EA2A8');

  function handleChange(raw: string) {
    if (integer) {
      onChange(raw.replace(/[^0-9]/g, ''));
    } else {
      let f = raw.replace(/[^0-9.]/g, '');
      const pts = f.split('.');
      if (pts.length > 2) f = pts[0] + '.' + pts.slice(1).join('');
      if (f.includes('.')) {
        const [i, d] = f.split('.');
        f = i + '.' + d.slice(0, 6);
      }
      onChange(f);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: flexFill ? 1 : undefined, minWidth: flexFill ? 72 : undefined }}>
      <input
        type="text"
        inputMode={integer ? 'numeric' : 'decimal'}
        value={value}
        placeholder={integer ? '0' : '0.0'}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        style={{
          width: flexFill ? undefined : widthPx,
          flex: flexFill ? 1 : undefined,
          height: 40,
          padding: '0 8px',
          background: error ? '#FFF1F0' : '#FFFFFF',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 14,
          color: '#344054',
          outline: 'none',
          boxSizing: 'border-box' as const,
          textAlign: 'center' as const,
          transition: 'border-color 0.15s, background 0.15s',
        }}
      />
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#667085', flexShrink: 0, lineHeight: '40px' }}>
        {symbol}
      </span>
    </div>
  );
}

// ─── DmsInput ─────────────────────────────────────────────────────────────────
// Three-field DMS row (Degrees °, Minutes ', Seconds ") + DirectionToggle.
// Stores result as decimal degrees; handles all per-field validation and errors.
function DmsInput({ decimalValue, direction, positiveDir, negativeDir, maxDeg, onChange, onDirectionChange }: {
  decimalValue: string;       // abs decimal string from data.latitude / longitude
  direction: string;          // current direction value ('N'|'S' or 'E'|'W')
  positiveDir: string;        // 'N' or 'E'
  negativeDir: string;        // 'S' or 'W'
  maxDeg: number;             // 90 for lat, 180 for lon
  onChange: (decimal: string) => void;
  onDirectionChange: (dir: string) => void;
}) {
  const [deg, setDeg] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [degErr, setDegErr] = useState('');
  const [minErr, setMinErr] = useState('');
  const [secErr, setSecErr] = useState('');
  const [dirErr, setDirErr] = useState('');
  const lastEmittedRef = useRef('');

  function initFromDecimal(val: string) {
    if (!val) { setDeg(''); setMin(''); setSec(''); return; }
    const abs = Math.abs(parseFloat(val));
    if (isNaN(abs)) { setDeg(''); setMin(''); setSec(''); return; }
    const d = Math.floor(abs);
    const mFull = (abs - d) * 60;
    const m = Math.floor(mFull);
    const s = parseFloat(((mFull - m) * 60).toFixed(6));
    setDeg(String(d));
    setMin(String(m));
    setSec(s === 0 ? '0' : String(s));
    setDegErr(''); setMinErr(''); setSecErr(''); setDirErr('');
  }

  useEffect(() => {
    // Only re-init when value changed externally (not from our own emission)
    if (decimalValue !== lastEmittedRef.current) initFromDecimal(decimalValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimalValue]);

  // Validators — return error string or ''
  function chkDeg(v: string): string {
    if (!v.trim()) return 'Degrees is required.';
    if (!/^\d+$/.test(v.trim())) return 'All fields must be valid numbers.';
    const n = parseInt(v, 10);
    if (n < 0 || n > maxDeg) return `Degrees must be between 0 and ${maxDeg}.`;
    return '';
  }
  function chkMin(v: string): string {
    if (!v.trim()) return 'Minutes is required.';
    if (!/^\d+$/.test(v.trim())) return 'All fields must be valid numbers.';
    const n = parseInt(v, 10);
    if (n < 0 || n >= 60) return 'Minutes must be between 0 and 59.';
    return '';
  }
  function chkSec(v: string): string {
    if (!v.trim()) return 'Seconds is required.';
    const n = parseFloat(v.trim());
    if (isNaN(n)) return 'All fields must be valid numbers.';
    if (n < 0 || n >= 60) return 'Seconds must be between 0 and 59.999999.';
    return '';
  }
  function chkDir(): string {
    if (!direction) return `Please select ${positiveDir} or ${negativeDir}.`;
    return '';
  }

  function emitDecimal(d: string, m: string, s: string) {
    const decimal = parseInt(d, 10) + parseInt(m, 10) / 60 + parseFloat(s) / 3600;
    const str = parseFloat(decimal.toFixed(8)).toString();
    lastEmittedRef.current = str;
    onChange(str);
  }

  // Show first active error in priority order
  const firstErr = degErr || minErr || secErr || dirErr;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        {/* Degrees */}
        <DmsFieldInput
          value={deg} symbol="°" widthPx={60} integer error={!!degErr}
          onChange={v => { setDeg(v); if (degErr) setDegErr(chkDeg(v)); }}
          onBlur={() => {
            const e = chkDeg(deg); setDegErr(e);
            if (!e && !chkMin(min) && !chkSec(sec) && !chkDir()) emitDecimal(deg, min, sec);
          }}
        />
        {/* Minutes */}
        <DmsFieldInput
          value={min} symbol="'" widthPx={60} integer error={!!minErr}
          onChange={v => { setMin(v); if (minErr) setMinErr(chkMin(v)); }}
          onBlur={() => {
            const e = chkMin(min); setMinErr(e);
            if (!chkDeg(deg) && !e && !chkSec(sec) && !chkDir()) emitDecimal(deg, min, sec);
          }}
        />
        {/* Seconds */}
        <DmsFieldInput
          value={sec} symbol={'"'} flexFill error={!!secErr}
          onChange={v => { setSec(v); if (secErr) setSecErr(chkSec(v)); }}
          onBlur={() => {
            const e = chkSec(sec); setSecErr(e);
            if (!chkDeg(deg) && !chkMin(min) && !e && !chkDir()) emitDecimal(deg, min, sec);
          }}
        />
        {/* Direction toggle */}
        <div style={{ width: 76, flexShrink: 0 }}>
          <DirectionToggle
            value={direction}
            options={[positiveDir as any, negativeDir as any]}
            onChange={dir => {
              onDirectionChange(dir);
              setDirErr('');
              if (!chkDeg(deg) && !chkMin(min) && !chkSec(sec)) emitDecimal(deg, min, sec);
            }}
          />
        </div>
      </div>
      {firstErr && <FieldError msg={firstErr} />}
    </div>
  );
}

// ─── CoordDecimalInput ────────────────────────────────────────────────────────
// Specialized numeric input for decimal-degree coordinate fields.
// Rules:
//  • Accept only digits, one decimal point, one leading minus — max 6 decimal places
//  • On blur: negative value → abs + auto-select negative direction
//             positive value → keep + auto-select positive direction
//  • Error border follows §16.3 (Red3/Red5 when error=true)
function CoordDecimalInput({
  value, positiveDir, negativeDir, maxAbs,
  placeholder, error, onChange, onDirectionChange, onBlur: onBlurProp,
}: {
  value: string;
  positiveDir: string; negativeDir: string; maxAbs: number;
  placeholder?: string; error?: boolean;
  onChange: (absStr: string) => void;
  onDirectionChange: (dir: string) => void;
  onBlur?: (normalizedValue: string) => void; // receives the normalized value so callers can validate immediately
}) {
  const [inputVal, setInputVal] = useState(value);
  const [focused, setFocused] = useState(false);

  // Sync from parent when not focused (cancel/reset)
  useEffect(() => { if (!focused) setInputVal(value); }, [value, focused]);

  const borderColor = error
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : '#9EA2A8');

  function handleChange(raw: string) {
    let f = raw.replace(/[^0-9.\-]/g, '');
    if (f.indexOf('-') > 0) f = f.replace(/-/g, '');
    const pts = f.split('.');
    if (pts.length > 2) f = pts[0] + '.' + pts.slice(1).join('');
    if (f.includes('.')) {
      const [i, d] = f.split('.');
      f = i + '.' + d.slice(0, 6);
    }
    setInputVal(f);
  }

  function handleBlur() {
    setFocused(false);
    const trimmed = inputVal.trim();
    if (!trimmed) { onChange(''); onBlurProp?.(''); return; }
    const n = parseFloat(trimmed);
    if (isNaN(n)) { onChange(trimmed); onBlurProp?.(trimmed); return; }
    const abs = Math.abs(n);
    const formatted = parseFloat(abs.toFixed(6)).toString();
    setInputVal(formatted);
    onChange(formatted);
    // Auto-direction based on sign entered
    onDirectionChange(n < 0 ? negativeDir : positiveDir);
    // Pass normalized value so parent validates the committed value, not stale state
    onBlurProp?.(formatted);
  }

  function clearValue() {
    setInputVal('');
    onChange('');
    onDirectionChange(positiveDir);
  }

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        type="text" inputMode="decimal" value={inputVal}
        placeholder={placeholder ?? `e.g. 0–${maxAbs}`}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        style={{
          width: '100%', height: 40,
          padding: inputVal ? '0 36px 0 12px' : '0 12px',
          background: error ? '#FFF1F0' : '#FFFFFF',
          border: `1px solid ${borderColor}`,
          borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054',
          outline: 'none', boxSizing: 'border-box' as const,
          transition: 'border-color 0.15s, background 0.15s',
        }}
      />
      {inputVal && (
        <button
          onMouseDown={e => { e.preventDefault(); clearValue(); }}
          style={{ position: 'absolute', right: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M9.13281 9.83906C9.32656 10.0328 9.64531 10.0328 9.83906 9.83906C10.0328 9.64531 10.0328 9.32656 9.83906 9.13281L5.69844 4.99219L9.83906 0.851562C10.0328 0.657812 10.0328 0.339062 9.83906 0.145312C9.64531 -0.0484375 9.32656 -0.0484375 9.13281 0.145312L4.99219 4.28594L0.851562 0.145312C0.657812 -0.0484375 0.339062 -0.0484375 0.145312 0.145312C-0.0484375 0.339062 -0.0484375 0.657812 0.145312 0.851562L4.28594 4.99219L0.145312 9.13281C-0.0484375 9.32656 -0.0484375 9.64531 0.145312 9.83906C0.339062 10.0328 0.657812 10.0328 0.851562 9.83906L4.99219 5.69844L9.13281 9.83906Z" fill="#8C8C8C" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── DirectionToggle ──────────────────────────────────────────────────────────
// Compact segmented 2-option toggle for N/S and E/W direction selection.
// Active state uses Inertia Navy #243746; inactive follows §15.2 Secondary style.
function DirectionToggle({ value, options, onChange }: {
  value: string; options: [string, string]; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', height: 40, borderRadius: 4, overflow: 'hidden', border: '1px solid #C3C7CC' }}>
      {options.map((opt, i) => {
        const isActive = value === opt;
        return (
          <button key={opt} onClick={() => onChange(opt)}
            style={{
              flex: 1, height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isActive ? '#243746' : '#F2F3F4',
              color: isActive ? '#FFFFFF' : '#616D79',
              border: 'none',
              borderLeft: i === 0 ? 'none' : '1px solid #C3C7CC',
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              fontWeight: isActive ? 500 : 400,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
              userSelect: 'none',
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Project Address fields ───────────────────────────────────────────────────
function ProjectAddressFields({ data, editing, onChange }: {
  data: ProjectData;
  editing: boolean;
  onChange: (u: Partial<ProjectData>) => void;
}) {
  const [latError, setLatError] = useState('');
  const [lonError, setLonError] = useState('');

  // Clear errors when switching coordinate format
  useEffect(() => {
    setLatError('');
    setLonError('');
  }, [data.coordFormat]);

  // ── Decimal-mode validators (DMS validation is self-contained inside DmsInput) ─���─

  // Decimal-mode only — DMS validation is self-contained inside DmsInput
  const validateLat = (val: string) => {
    if (!val.trim()) { setLatError('Latitude is required.'); return; }
    const n = parseFloat(val.trim());
    if (isNaN(n)) { setLatError('Latitude must be a valid number.'); return; }
    if (n < 0 || n > 90) { setLatError('Latitude must be between 0 and 90.'); return; }
    if (!data.latDirection) { setLatError('Please select N or S.'); return; }
    setLatError('');
  };

  const validateLon = (val: string) => {
    if (!val.trim()) { setLonError('Longitude is required.'); return; }
    const n = parseFloat(val.trim());
    if (isNaN(n)) { setLonError('Longitude must be a valid number.'); return; }
    if (n < 0 || n > 180) { setLonError('Longitude must be between 0 and 180.'); return; }
    if (!data.lonDirection) { setLonError('Please select E or W.'); return; }
    setLonError('');
  };

  return (
    <div style={{ display: 'flex', gap: 32, padding: 24, background: '#FFFFFF' }}>
      {/* Column 1 — Country / Addr1 / Addr2 / City / State+Zip */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>

        <FormField label="Country">
          {editing
            ? <SelectInput value={data.country} onChange={v => onChange({ country: v })} options={['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France']} />
            : <ViewValue value={data.country} />}
        </FormField>

        <FormField label="Address line 1">
          {editing
            ? <TextInput value={data.address} onChange={v => onChange({ address: v })} placeholder="Type here" />
            : <ViewValue value={data.address} />}
        </FormField>

        <FormField label="Address line 2">
          {editing
            ? <TextInput value={data.address2} onChange={v => onChange({ address2: v })} placeholder="Type here" />
            : <ViewValue value={data.address2 || '—'} />}
        </FormField>

        <FormField label="City">
          {editing
            ? <SelectInput value={data.city} onChange={v => onChange({ city: v })} options={['Cleveland', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']} placeholder="Type here" />
            : <ViewValue value={data.city} />}
        </FormField>

        {editing ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormField label="State/Region">
                <SelectInput value={data.state} onChange={v => onChange({ state: v })} options={['Ohio', 'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Washington']} placeholder="Type here" />
              </FormField>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormField label="Zip/Postal Code">
                <TextInput value={data.zip} onChange={v => onChange({ zip: v })} placeholder="Type here" />
              </FormField>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormField label="State/Region"><ViewValue value={data.state} /></FormField>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormField label="Zip/Postal Code"><ViewValue value={data.zip} /></FormField>
            </div>
          </div>
        )}
      </div>

      {/* Column 2 — Coordinate Format / Lat / Lon / Timezone */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Coordinate Format */}
        <FormField label="Coordinate Format">
          {editing ? (
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', height: 40 }}>
              <RadioButton checked={data.coordFormat === 'decimal'} onChange={() => onChange({ coordFormat: 'decimal' })} label="Decimal degrees" />
              <RadioButton checked={data.coordFormat === 'dms'} onChange={() => onChange({ coordFormat: 'dms' })} label="Degrees, minutes, seconds" />
            </div>
          ) : (
            <ViewValue value={data.coordFormat === 'decimal' ? 'Decimal degrees' : 'Degrees, minutes, seconds'} />
          )}
        </FormField>

        {/* Latitude */}
        <div>
          <FormField label="Latitude">
            {editing ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ flex: 1 }}>
                  {data.coordFormat === 'decimal' ? (
                    <CoordDecimalInput
                      value={data.latitude}
                      positiveDir="N"
                      negativeDir="S"
                      maxAbs={90}
                      placeholder="e.g. 41.5036"
                      error={!!latError}
                      onChange={v => { onChange({ latitude: v }); if (latError) validateLat(v); }}
                      onDirectionChange={dir => onChange({ latDirection: dir as 'N' | 'S' })}
                      onBlur={v => validateLat(v)}
                    />
                  ) : (
                    // DMS mode: full-width, direction toggle is inside DmsInput
                    <DmsInput
                      decimalValue={data.latitude}
                      direction={data.latDirection}
                      positiveDir="N"
                      negativeDir="S"
                      maxDeg={90}
                      onChange={v => onChange({ latitude: v })}
                      onDirectionChange={dir => onChange({ latDirection: dir as 'N' | 'S' })}
                    />
                  )}
                </div>
                {/* Direction toggle only shown in decimal mode; DMS has its own */}
                {data.coordFormat === 'decimal' && (
                  <div style={{ width: 76, flexShrink: 0 }}>
                    <DirectionToggle
                      value={data.latDirection}
                      options={['N', 'S']}
                      onChange={dir => {
                        onChange({ latDirection: dir as 'N' | 'S' });
                        if (latError) validateLat(data.latitude);
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <ViewValue value={
                data.latitude
                  ? data.coordFormat === 'dms'
                    ? decimalToDmsDisplay(data.latitude, data.latDirection)
                    : `${data.latitude}° ${data.latDirection}`
                  : ''
              } />
            )}
          </FormField>
          {editing && data.coordFormat === 'decimal' && latError && <FieldError msg={latError} />}
          {editing && data.coordFormat === 'decimal' && !latError && (
            <div style={{ marginTop: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#8C8C8C', lineHeight: '16px' }}>
              Decimal degrees, range 0° to 90°, up to 6 decimal places. Negative values auto-select S.
            </div>
          )}
        </div>

        {/* Longitude */}
        <div>
          <FormField label="Longitude">
            {editing ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ flex: 1 }}>
                  {data.coordFormat === 'decimal' ? (
                    <CoordDecimalInput
                      value={data.longitude}
                      positiveDir="E"
                      negativeDir="W"
                      maxAbs={180}
                      placeholder="e.g. 81.6200"
                      error={!!lonError}
                      onChange={v => { onChange({ longitude: v }); if (lonError) validateLon(v); }}
                      onDirectionChange={dir => onChange({ lonDirection: dir as 'E' | 'W' })}
                      onBlur={v => validateLon(v)}
                    />
                  ) : (
                    // DMS mode: full-width, direction toggle is inside DmsInput
                    <DmsInput
                      decimalValue={data.longitude}
                      direction={data.lonDirection}
                      positiveDir="E"
                      negativeDir="W"
                      maxDeg={180}
                      onChange={v => onChange({ longitude: v })}
                      onDirectionChange={dir => onChange({ lonDirection: dir as 'E' | 'W' })}
                    />
                  )}
                </div>
                {/* Direction toggle only shown in decimal mode; DMS has its own */}
                {data.coordFormat === 'decimal' && (
                  <div style={{ width: 76, flexShrink: 0 }}>
                    <DirectionToggle
                      value={data.lonDirection}
                      options={['E', 'W']}
                      onChange={dir => {
                        onChange({ lonDirection: dir as 'E' | 'W' });
                        if (lonError) validateLon(data.longitude);
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <ViewValue value={
                data.longitude
                  ? data.coordFormat === 'dms'
                    ? decimalToDmsDisplay(data.longitude, data.lonDirection)
                    : `${data.longitude}° ${data.lonDirection}`
                  : ''
              } />
            )}
          </FormField>
          {editing && data.coordFormat === 'decimal' && lonError && <FieldError msg={lonError} />}
          {editing && data.coordFormat === 'decimal' && !lonError && (
            <div style={{ marginTop: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#8C8C8C', lineHeight: '16px' }}>
              Decimal degrees, range 0° to 180°, up to 6 decimal places. Negative values auto-select W.
            </div>
          )}
        </div>

        {/* Time Zone */}
        <FormField label="Time Zone (UTC)">
          {editing ? (
            <SelectInput
              value={data.timezone}
              onChange={v => onChange({ timezone: v })}
              options={[
                '(UTC -12:00) International Date Line West',
                '(UTC -8:00 / -7:00) Los Angeles - Pacific Time',
                '(UTC -7:00 / -6:00) Denver - Mountain Time',
                '(UTC -6:00 / -5:00) Chicago - Central Time',
                '(UTC -5:00 / -4:00) New York - Eastern Time',
                '(UTC +0:00) London - GMT',
                '(UTC +1:00) Paris - CET',
              ]}
            />
          ) : (
            <ViewValue value={data.timezone} />
          )}
        </FormField>
      </div>

      {/* Column 3 — Job Site (disabled — always non-interactive) */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FormField label="Job Site">
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Disabled dropdown shell — matches §16.3 disabled state */}
              <div style={{
                height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 10px',
                background: '#F5F5F5',
                border: '1px solid #E0E4E8',
                borderRadius: 4,
                cursor: 'not-allowed',
                userSelect: 'none',
              }}>
                <span style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#BFBFBF',
                }}>
                  {data.jobSite || 'Select a Job Site'}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 6l4 4 4-4" stroke="#BFBFBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400, color: '#5B6570', lineHeight: '16px' }}>
                Link this project to an existing Job Site for reporting.
              </span>
            </div>
          ) : (
            <ViewValue value={data.jobSite} />
          )}
        </FormField>
      </div>
    </div>
  );
}

// ─── Modal close button ───────────────────────────────────────────────────────
function ModalCloseBtn({ onClose }: { onClose: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: hov ? '#F5F6F7' : 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 8, flexShrink: 0 }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ─── Archive Confirmation Modal ───────────────────────────────────────────────
function ArchiveModal({ onClose }: { onClose: () => void }) {
  const [typedValue, setTypedValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [hov, setHov] = useState(false);
  const isConfirmed = typedValue.toLowerCase() === 'archive';

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', width: 420, maxWidth: 'calc(100vw - 32px)', flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header §10.3 */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Archive Project
            </p>
            <ModalCloseBtn onClose={onClose} />
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFFBE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 15.2779 14.065" fill="none">
                <path d={ARCHIVE_BOX_PATH} fill="#FAAD14" />
              </svg>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#262626', margin: '0 0 8px 0', textAlign: 'center' }}>
            Archive this project?
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#595959', margin: '0 0 20px 0', textAlign: 'center' }}>
            This project will be moved to the archive. It will no longer appear in your active workspace until you unarchive it.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#595959', margin: '0 0 8px 0' }}>
            Type <strong style={{ color: '#262626' }}>archive</strong> to confirm.
          </p>
          <input
            type="text"
            value={typedValue}
            onChange={e => setTypedValue(e.target.value)}
            placeholder="Type archive to confirm"
            autoFocus
            style={{ width: '100%', height: 40, padding: '0 12px', boxSizing: 'border-box' as const, background: '#FFFFFF', border: `1px solid ${focused ? '#91D5FF' : '#D0D5DD'}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', outline: 'none', transition: 'border-color 0.15s' }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        {/* Footer §10.4 */}
        <div style={{ height: 72, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 10, flexShrink: 0 }}>
          <SecondaryBtn label="Cancel" onClick={onClose} />
          <button
            disabled={!isConfirmed}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{ height: 36, padding: '0 16px', background: isConfirmed ? (hov ? '#D48806' : '#FAAD14') : '#FFE58F', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', cursor: isConfirmed ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 15.2779 14.065" fill="none">
              <path d={ARCHIVE_BOX_PATH} fill="white" />
            </svg>
            Archive Project
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteModal({ onClose }: { onClose: () => void }) {
  const [typedValue, setTypedValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [hov, setHov] = useState(false);
  const isConfirmed = typedValue.toLowerCase() === 'delete';

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', width: 420, maxWidth: 'calc(100vw - 32px)', flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header §10.3 */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Delete Project
            </p>
            <ModalCloseBtn onClose={onClose} />
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d={INFO_CIRCLE_PATH} fill="#F5222D" />
              </svg>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#262626', margin: '0 0 8px 0', textAlign: 'center' }}>
            Delete this project?
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#595959', margin: '0 0 20px 0', textAlign: 'center' }}>
            This action <strong style={{ color: '#F5222D' }}>cannot be undone</strong>. All project data, members, and configurations will be permanently erased from the system.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#595959', margin: '0 0 8px 0' }}>
            Type <strong style={{ color: '#262626' }}>delete</strong> to confirm.
          </p>
          <input
            type="text"
            value={typedValue}
            onChange={e => setTypedValue(e.target.value)}
            placeholder="Type delete to confirm"
            autoFocus
            style={{ width: '100%', height: 40, padding: '0 12px', boxSizing: 'border-box' as const, background: '#FFFFFF', border: `1px solid ${focused ? '#FFA39E' : '#D0D5DD'}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', outline: 'none', transition: 'border-color 0.15s' }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        {/* Footer §10.4 */}
        <div style={{ height: 72, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 28px', gap: 10, flexShrink: 0 }}>
          <SecondaryBtn label="Cancel" onClick={onClose} />
          <button
            disabled={!isConfirmed}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{ height: 36, padding: '0 16px', background: isConfirmed ? (hov ? '#B91C1C' : '#D92D20') : '#FFA39E', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', cursor: isConfirmed ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 14.6239 16.875" fill="none">
              <path d={trashPaths.pc0b2e00} fill="white" />
            </svg>
            Delete Project
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Project Actions ───���──────────────────────────────────────────────────────
function ProjectActions() {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, background: '#FFFFFF' }}>

        {/* ── Archive Card — Figma Frame2318 layout ── */}
        <div style={{ background: '#FFFBE6', border: '1px solid #FAAD14', borderRadius: 4, padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Row 1: icon + text */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', paddingRight: 8 }}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d={INFO_CIRCLE_PATH} fill="#FAAD14" />
              </svg>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#262626', margin: 0 }}>Archive Project</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#262626', margin: 0 }}>
                  Move this project to the archive workspace. Archived projects and their data will no longer be accessible in the active workspace until the project is unarchived.
                </p>
              </div>
            </div>
            {/* Row 2: button right-aligned */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 8 }}>
              <button
                onClick={() => setShowArchiveModal(true)}
                style={{ height: 36, padding: '0 16px', background: '#FAAD14', border: '1px solid #FFE58F', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'white', whiteSpace: 'nowrap' }}
              >
                <svg width="16" height="16" viewBox="0 0 15.2779 14.065" fill="none" style={{ flexShrink: 0 }}>
                  <path d={ARCHIVE_BOX_PATH} fill="white" />
                </svg>
                Archive
              </button>
            </div>
          </div>
        </div>

        {/* ── Delete Card — Figma Frame2320 layout ── */}
        <div style={{ background: '#FFF1F0', border: '1px solid #F5222D', borderRadius: 4, padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Row 1: icon + text */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', paddingRight: 8 }}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d={INFO_CIRCLE_PATH} fill="#F5222D" />
              </svg>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#262626', margin: 0 }}>Delete Project</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#262626', margin: 0 }}>
                  Permanently remove this project and all associated data from the system. This action cannot be undone and should only be used when a project was created by mistake or must be fully erased.
                </p>
              </div>
            </div>
            {/* Row 2: button right-aligned */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 8 }}>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{ height: 36, padding: '0 16px', background: '#F5222D', border: '1px solid #FFA39E', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'white', whiteSpace: 'nowrap' }}
              >
                <svg width="16" height="16" viewBox="0 0 14.6239 16.875" fill="none" style={{ flexShrink: 0 }}>
                  <path d={trashPaths.pc0b2e00} fill="white" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation modals — portalled to document.body */}
      {showArchiveModal && <ArchiveModal onClose={() => setShowArchiveModal(false)} />}
      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} />}
    </>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export function GeneralInformationPage() {
  // Section expand/collapse
  const [projectInfoOpen, setProjectInfoOpen] = useState(true);
  const [addressOpen, setAddressOpen] = useState(true);
  const [actionsOpen, setActionsOpen] = useState(true);

  // Edit mode per section
  const [projectInfoEditing, setProjectInfoEditing] = useState(false);
  const [addressEditing, setAddressEditing] = useState(false);

  // Committed (view) data
  const [savedData, setSavedData] = useState<ProjectData>(INITIAL_DATA);
  // Draft (edit) data
  const [draftData, setDraftData] = useState<ProjectData>(INITIAL_DATA);

  // Validation
  const [nameError, setNameError] = useState(false);

  const updateDraft = (updates: Partial<ProjectData>) =>
    setDraftData(prev => ({ ...prev, ...updates }));

  // Project Info handlers
  const onInfoEdit = () => { setDraftData({ ...savedData }); setNameError(false); setProjectInfoEditing(true); setProjectInfoOpen(true); };
  const onInfoSave = () => {
    if (!draftData.projectName.trim()) {
      setNameError(true);
      return; // block save
    }
    setNameError(false);
    setSavedData({ ...draftData });
    setProjectInfoEditing(false);
  };
  const onInfoCancel = () => { setDraftData({ ...savedData }); setNameError(false); setProjectInfoEditing(false); };

  // Address handlers
  const onAddrEdit = () => { setDraftData({ ...savedData }); setAddressEditing(true); setAddressOpen(true); };
  const onAddrSave = () => { setSavedData({ ...draftData }); setAddressEditing(false); };
  const onAddrCancel = () => { setDraftData({ ...savedData }); setAddressEditing(false); };

  const displayData = (editing: boolean) => editing ? draftData : savedData;

  return (
    <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF', padding: 12 }}>
      {/* Card with 8px radius + gray4 border */}
      <div style={{ border: '1px solid #F0F0F0', borderRadius: 8, overflow: 'hidden', background: '#FFFFFF' }}>

        {/* ── Project Information ── */}
        <SectionHeader
          title="General Information"
          expanded={projectInfoOpen}
          onToggle={() => setProjectInfoOpen(v => !v)}
          showEdit
          isEditing={projectInfoEditing}
          onEdit={onInfoEdit}
          onSave={onInfoSave}
          onCancel={onInfoCancel}
        />
        {projectInfoOpen && (
          <ProjectInformationFields
            data={displayData(projectInfoEditing)}
            editing={projectInfoEditing}
            onChange={updateDraft}
            nameError={nameError}
            onNameChange={v => { if (v.trim()) setNameError(false); }}
          />
        )}

        {/* Divider */}
        <div style={{ height: 1, background: '#F0F0F0' }} />

        {/* ── Project Address ── */}
        <SectionHeader
          title="Project Address"
          expanded={addressOpen}
          onToggle={() => setAddressOpen(v => !v)}
          showEdit
          isEditing={addressEditing}
          onEdit={onAddrEdit}
          onSave={onAddrSave}
          onCancel={onAddrCancel}
        />
        {addressOpen && (
          <ProjectAddressFields
            data={displayData(addressEditing)}
            editing={addressEditing}
            onChange={updateDraft}
          />
        )}

        {/* Divider */}
        <div style={{ height: 1, background: '#F0F0F0' }} />

        {/* ── Project Actions ── */}
        <SectionHeader
          title="Project Actions"
          expanded={actionsOpen}
          onToggle={() => setActionsOpen(v => !v)}
        />
        {actionsOpen && <ProjectActions />}
      </div>
    </div>
  );
}