import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { useToast } from './toast';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CreateProjectFormData {
  ownerOffice: string;
  projectName: string;
  projectNumber: string;
  projectType: string;
  projectScope: string;
  deliveryMethod: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit?: (data: CreateProjectFormData) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  'Office', 'Residential', 'Single Family', 'Multifamily', 'Retail',
  'Healthcare', 'Industrial', 'Warehouse', 'Hospitality', 'Education',
  'Infrastructure', 'Parking', 'Mixed Use', 'Government', 'Data Center',
  'Renovation', 'Commercial', 'Institutional', 'Public Works',
];
const PROJECT_SCOPES = [
  'New Construction', 'Renovation/Alteration', 'Maintenance/Service',
  'Training Project', 'Demonstration Project',
];
const DELIVERY_METHODS = [
  'Design–Bid–Build', 'Design–Build', 'Construction Manager at Risk',
  'Construction Management Agency', 'Integrated Project Delivery',
  'Public–Private Partnership', 'EPC (Engineering, Procurement, Construction)',
  'EPCM (Engineering, Procurement, Construction Management)', 'Turnkey',
  'Design–Build–Operate', 'Design–Build–Finance', 'Multiple Prime Contracts',
  'Job Order Contracting', 'Alliance Contracting',
];
const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'UAE', 'India', 'Brazil', 'Other',
];
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

// ─── Country → ISO code map (for Nominatim filtering) ─────────────────────────
const COUNTRY_CODES: Record<string, string> = {
  'United States': 'us', 'United Kingdom': 'gb', 'Canada': 'ca',
  'Australia': 'au', 'Germany': 'de', 'France': 'fr', 'Japan': 'jp',
  'Singapore': 'sg', 'UAE': 'ae', 'India': 'in', 'Brazil': 'br',
};

// ─── Nominatim types ───────────────────────────────────────────────────────────
interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    pedestrian?: string;
    path?: string;
    suburb?: string;
    neighbourhood?: string;
    quarter?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
}
interface AddressParts {
  line1: string; line2: string; city: string; state: string; zip: string;
}

// ─── Inline Portal Dropdown ────────────────────────────────────────────────────
interface DropdownProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  dividerAfter?: string;
  error?: boolean;
}

function PortalDropdown({ value, onChange, options, placeholder, dividerAfter, error }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = query.length >= 2
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const openMenu = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      background: '#FFFFFF',
      borderRadius: 4,
      boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
      padding: '4px 0',
      maxHeight: 320,
      overflowY: 'auto',
    });
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const closeMenu = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, closeMenu]);

  const select = (opt: string) => {
    onChange(opt);
    closeMenu();
  };

  const isOpen = open;

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={isOpen ? closeMenu : openMenu}
        style={{
          height: 40,
          width: '100%',
          background: '#FFFFFF',
          border: `1px solid ${isOpen ? '#91D5FF' : error ? '#FFA39E' : '#D0D5DD'}`,
          borderRadius: 4,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#344054',
              lineHeight: '20px',
              minWidth: 0,
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span style={{
            flex: 1,
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: value ? '#344054' : '#9EA3A9',
            lineHeight: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {value || placeholder}
          </span>
        )}
        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke={isOpen ? '#91D5FF' : '#9EA3A9'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Menu via portal */}
      {isOpen && ReactDOM.createPortal(
        <div style={menuStyle as React.CSSProperties}>
          {filteredOptions.length === 0 ? (
            <div style={{
              padding: '8px 12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#9EA3A9',
            }}>
              No results found
            </div>
          ) : (
            filteredOptions.map(opt => {
              const selected = opt === value;
              return (
                <div key={opt}>
                  <div
                    onMouseDown={e => { e.preventDefault(); select(opt); }}
                    style={{
                      height: 32,
                      padding: '5px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: selected ? 600 : 400,
                      color: '#384857',
                      background: selected ? '#E6F7FF' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                      boxSizing: 'border-box',
                    }}
                    onMouseEnter={e => {
                      if (!selected) (e.currentTarget as HTMLDivElement).style.background = '#F5F5F5';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.background = selected ? '#E6F7FF' : 'transparent';
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {opt}
                    </span>
                    {selected && (
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0, marginLeft: 8 }}>
                        <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {dividerAfter === opt && (
                    <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '4px 0' }} />
                  )}
                </div>
              );
            })
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Office Portal Dropdown ───────────────────────────────────────────────────
function OfficePortalDropdown({
  value, onChange, offices, placeholder, error,
}: {
  value: string;
  onChange: (v: string) => void;
  offices: OfficeOption[];
  placeholder: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const filtered = query.length >= 2
    ? offices.filter(o =>
        o.company.toLowerCase().includes(query.toLowerCase()) ||
        o.office.toLowerCase().includes(query.toLowerCase())
      )
    : offices;

  const openMenu = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      background: '#FFFFFF',
      borderRadius: 4,
      boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
      padding: '4px 0',
      maxHeight: 320,
      overflowY: 'auto',
    });
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const closeMenu = useCallback(() => { setOpen(false); setQuery(''); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, closeMenu]);

  const select = (opt: OfficeOption) => { onChange(opt.label); closeMenu(); };

  const selected = offices.find(o => o.label === value);

  return (
    <div ref={triggerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={open ? closeMenu : openMenu}
        style={{
          height: 40, width: '100%', background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : error ? '#FFA39E' : '#D0D5DD'}`,
          borderRadius: 4, padding: '0 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', transition: 'border-color 0.15s', boxSizing: 'border-box',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search company or city…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#344054', lineHeight: '20px', minWidth: 0,
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : selected ? (
          /* Selected value — company SemiBold, pipe, office Regular */
          <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', minWidth: 0 }}>
            <span style={{
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 600,
              color: '#344054', whiteSpace: 'nowrap', flexShrink: 0,
            }}>{selected.company}</span>
            <span style={{ color: '#D0D5DD', flexShrink: 0 }}>|</span>
            <span style={{
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#616D79', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{selected.office}</span>
          </span>
        ) : (
          <span style={{
            flex: 1, fontFamily: 'Open Sans, sans-serif', fontSize: 14,
            fontWeight: 400, color: '#9EA3A9', lineHeight: '20px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{placeholder}</span>
        )}
        {/* Chevron */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
          <path d="M4 6L8 10L12 6"
            stroke={open ? '#91D5FF' : '#9EA3A9'}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Menu via portal */}
      {open && ReactDOM.createPortal(
        <div style={menuStyle as React.CSSProperties}>
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>
              No results found
            </div>
          ) : (
            filtered.map(opt => {
              const isSelected = opt.label === value;
              return (
                <div
                  key={opt.label}
                  onMouseDown={e => { e.preventDefault(); select(opt); }}
                  style={{
                    height: 36, padding: '0 12px',
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: isSelected ? '#E6F7FF' : 'transparent',
                    cursor: 'pointer', transition: 'background 0.1s', boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = '#F5F5F5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = isSelected ? '#E6F7FF' : 'transparent'; }}
                >
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    fontWeight: 600, color: '#344054', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>{opt.company}</span>
                  <span style={{ color: '#D0D5DD', flexShrink: 0, fontSize: 13 }}>|</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    fontWeight: 400, color: '#616D79',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                  }}>{opt.office}</span>
                  {isSelected && (
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0, marginLeft: 4 }}>
                      <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Field Label ──────────────────────────────────────────────────────────────
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        color: '#1B2736',
        lineHeight: '20px',
      }}>
        {label}
      </span>
      {required && (
        <span style={{ color: '#DB0000', fontFamily: 'Open Sans, sans-serif', fontSize: 14, lineHeight: '20px' }}>*</span>
      )}
    </div>
  );
}

// ─── Text Input ───────────────────────────────────────────────────────────────
interface TextFieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

function TextField({ value, onChange, placeholder, autoFocus }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = focused ? '#91D5FF' : hovered ? '#A8B0BB' : '#D0D5DD';

  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: 40,
        padding: '0 10px',
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        background: '#FFFFFF',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        color: '#344054',
        outline: 'none',
        transition: 'border-color 0.15s',
        boxSizing: 'border-box',
      }}
    />
  );
}

// ─── Section Divider Label ────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: 'Open Sans, sans-serif',
      fontSize: 14,
      fontWeight: 600,
      color: '#1B2736',
      lineHeight: '20px',
      paddingBottom: 8,
      borderBottom: '1px solid #F0F0F0',
      marginBottom: 4,
    }}>
      {label}
    </div>
  );
}

// ─── Address Autocomplete Field ────────────────────────────────────────────────
function AddressAutocompleteField({
  value, onChange, onSelect, country,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (parts: AddressParts) => void;
  country: string;
}) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inject spin keyframe once
  useEffect(() => {
    if (!document.getElementById('addr-autocomplete-styles')) {
      const s = document.createElement('style');
      s.id = 'addr-autocomplete-styles';
      s.textContent = '@keyframes addrSpin { to { transform: rotate(360deg); } }';
      document.head.appendChild(s);
    }
  }, []);

  const borderColor = focused ? '#91D5FF' : hovered ? '#A8B0BB' : '#D0D5DD';

  const updateDropdownPos = () => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'fixed',
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
      zIndex: 9999,
      background: '#FFFFFF',
      borderRadius: 4,
      boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
      maxHeight: 280,
      overflowY: 'auto' as const,
      padding: '4px 0',
    });
  };

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const cc = COUNTRY_CODES[country];
        const ccParam = cc ? `&countrycodes=${cc}` : '';
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}${ccParam}&limit=7&addressdetails=1`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        if (data.length > 0) { updateDropdownPos(); setShowDropdown(true); }
        else setShowDropdown(false);
      } catch { setSuggestions([]); setShowDropdown(false); }
      finally { setLoading(false); }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value, country]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const parseParts = (s: NominatimResult): AddressParts => {
    const a = s.address;
    const hn = a.house_number || '';
    const road = a.road || a.pedestrian || a.path || '';
    const line1 = [hn, road].filter(Boolean).join(' ') || s.display_name.split(',')[0].trim();
    const line2 = a.suburb || a.neighbourhood || a.quarter || '';
    const city = a.city || a.town || a.village || a.county || '';
    const state = a.state || '';
    const zip = a.postcode || '';
    return { line1, line2, city, state, zip };
  };

  const handleSelect = (s: NominatimResult) => {
    const parts = parseParts(s);
    onSelect(parts);
    setShowDropdown(false);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Address Line 1"
        onFocus={() => {
          setFocused(true);
          if (suggestions.length > 0) { updateDropdownPos(); setShowDropdown(true); }
        }}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', height: 40,
          paddingLeft: 10, paddingRight: loading ? 34 : 10,
          border: `1px solid ${borderColor}`,
          borderRadius: 4, background: '#FFFFFF',
          fontFamily: 'Open Sans, sans-serif', fontSize: 14,
          fontWeight: 400, lineHeight: '20px', color: '#344054',
          outline: 'none', transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}
      />

      {/* Spinner */}
      {loading && (
        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            border: '2px solid #E0E4E8', borderTopColor: '#FF4D00',
            animation: 'addrSpin 0.7s linear infinite',
          }} />
        </div>
      )}

      {/* Suggestions portal */}
      {showDropdown && suggestions.length > 0 && ReactDOM.createPortal(
        <div style={dropdownStyle}>
          {suggestions.map(s => {
            const { line1, city, state, zip } = parseParts(s);
            const secondary = [city, state, zip].filter(Boolean).join(', ');
            return (
              <div
                key={s.place_id}
                onMouseDown={e => { e.preventDefault(); handleSelect(s); }}
                style={{ padding: '8px 12px', cursor: 'pointer', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F5F5F5')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                  color: '#344054', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {line1}
                </div>
                {secondary && (
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400,
                    color: '#667085', marginTop: 2, whiteSpace: 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {secondary}
                  </div>
                )}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Current user's offices (mock — in production, sourced from auth context) ──
interface OfficeOption { label: string; company: string; office: string; }
const USER_OFFICES: OfficeOption[] = [
  { label: 'Henrich Advisory  |  Boston',      company: 'Henrich Advisory', office: 'Boston'   },
  { label: 'Henrich Advisory  |  New York',     company: 'Henrich Advisory', office: 'New York' },
  { label: 'TechCorp  |  Chicago',              company: 'TechCorp',         office: 'Chicago'  },
  { label: 'TechCorp  |  Houston',              company: 'TechCorp',         office: 'Houston'  },
  { label: 'BuildSmart  |  Boston',             company: 'BuildSmart',       office: 'Boston'   },
  { label: 'BuildSmart  |  Seattle',            company: 'BuildSmart',       office: 'Seattle'  },
  { label: 'Apex Engineering  |  Austin',       company: 'Apex Engineering', office: 'Austin'   },
  { label: 'CityWorks  |  Boston',              company: 'CityWorks',        office: 'Boston'   },
];

// ─── Main Modal ───────────────────────────────────────────────────────────────
export function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const { showToast } = useToast();
  const [form, setForm] = useState<CreateProjectFormData>({
    ownerOffice: '',
    projectName: '',
    projectNumber: '',
    projectType: '',
    projectScope: '',
    deliveryMethod: '',
    country: 'United States',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [attempted, setAttempted] = useState(false);

  const officeError = attempted && !form.ownerOffice;
  const canSubmit = form.projectName.trim().length > 0 && form.ownerOffice.trim().length > 0;

  const update = (patch: Partial<CreateProjectFormData>) =>
    setForm(prev => ({ ...prev, ...patch }));

  const handleSubmit = () => {
    setAttempted(true);
    if (!canSubmit) return;
    onSubmit?.(form);
    onClose();
    showToast({
      type: 'success',
      title: 'Project created successfully.',
      message: 'You can now start adding files, team members, and workflows.',
    });
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: 580,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          background: '#FFFFFF',
          borderRadius: 8,
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{ background: '#FFFFFF', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 72, padding: '0 24px',
          }}>
            <p style={{
              fontFamily: "'Actor', sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: '28.8px',
              color: '#1B2736',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              Create project
            </p>
            <button
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                borderRadius: 40, transition: 'background-color 0.15s',
                padding: 8,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── Body (scrollable) ── */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '24px 28px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>

          {/* Office (Project Owner) — required, always first */}
          <div>
            <FieldLabel label="Office (Project Owner)" required />
            <OfficePortalDropdown
              value={form.ownerOffice}
              onChange={v => { setForm(prev => ({ ...prev, ownerOffice: v })); }}
              offices={USER_OFFICES}
              placeholder="Select an office you belong to"
              error={officeError}
            />
            {/* Helper text — always visible unless error is shown */}
            {!officeError && (
              <p style={{
                fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400,
                color: '#667085', margin: '4px 0 0', lineHeight: '16px',
              }}>
                This office will own and manage the project.
              </p>
            )}
            {/* Error message */}
            {officeError && (
              <p style={{
                fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 400,
                color: '#FF4D4F', margin: '4px 0 0', lineHeight: '16px',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="#FF4D4F" strokeWidth="1.5"/>
                  <path d="M8 5v3.5M8 11v.5" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                An owning office is required to create a project.
              </p>
            )}
          </div>

          {/* Project Name */}
          <div>
            <FieldLabel label="Project Name" required />
            <TextField
              value={form.projectName}
              onChange={v => update({ projectName: v })}
              placeholder="Type a project name"
              autoFocus
            />
          </div>

          {/* Project Number */}
          <div>
            <FieldLabel label="Project Number" />
            <TextField
              value={form.projectNumber}
              onChange={v => update({ projectNumber: v })}
              placeholder="Type a project number"
            />
          </div>

          {/* Project Type */}
          <div>
            <FieldLabel label="Project Type" />
            <PortalDropdown
              value={form.projectType}
              onChange={v => update({ projectType: v })}
              options={PROJECT_TYPES}
              placeholder="Select a project type"
            />
          </div>

          {/* Project Scope */}
          <div>
            <FieldLabel label="Project Scope" />
            <PortalDropdown
              value={form.projectScope}
              onChange={v => update({ projectScope: v })}
              options={PROJECT_SCOPES}
              placeholder="Select a project scope"
              dividerAfter="Maintenance/Service"
            />
          </div>

          {/* Delivery Method */}
          <div>
            <FieldLabel label="Delivery Method" />
            <PortalDropdown
              value={form.deliveryMethod}
              onChange={v => update({ deliveryMethod: v })}
              options={DELIVERY_METHODS}
              placeholder="Select a delivery method"
            />
          </div>

          {/* Project Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel label="Project Address" />

            {/* Country */}
            <PortalDropdown
              value={form.country}
              onChange={v => update({ country: v })}
              options={COUNTRIES}
              placeholder="Country"
            />

            {/* Address Line 1 */}
            <AddressAutocompleteField
              value={form.addressLine1}
              onChange={v => update({ addressLine1: v })}
              onSelect={parts => update({
                addressLine1: parts.line1,
                addressLine2: parts.line2,
                city: parts.city,
                state: parts.state,
                zip: parts.zip,
              })}
              country={form.country}
            />

            {/* Address Line 2 */}
            <TextField
              value={form.addressLine2}
              onChange={v => update({ addressLine2: v })}
              placeholder="Address Line 2"
            />

            {/* City */}
            <TextField
              value={form.city}
              onChange={v => update({ city: v })}
              placeholder="City"
            />

            {/* State + Zip row */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <PortalDropdown
                  value={form.state}
                  onChange={v => update({ state: v })}
                  options={US_STATES}
                  placeholder="State/Region"
                />
              </div>
              <div style={{ width: 180, flexShrink: 0 }}>
                <TextField
                  value={form.zip}
                  onChange={v => update({ zip: v })}
                  placeholder="Zip/Postal Code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          height: 72,
          borderTop: '1px solid #C3C7CC',
          background: '#FFFFFF',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
          padding: '0 28px',
        }}>
          {/* Cancel */}
          <button
            onClick={onClose}
            style={{
              height: 36,
              padding: '0 16px',
              background: '#F2F3F4',
              border: '1px solid #C3C7CC',
              borderRadius: 4,
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#616D79',
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
              whiteSpace: 'nowrap',
              outline: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
            }}
          >
            Cancel
          </button>

          {/* Create Project */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              height: 36,
              padding: '0 16px',
              background: canSubmit ? '#FF4D00' : '#FFBD9C',
              border: 'none',
              borderRadius: 4,
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#FFFFFF',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
              whiteSpace: 'nowrap',
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#FF773E';
            }}
            onMouseLeave={e => {
              if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00';
            }}
            onMouseDown={e => {
              if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#D4380D';
            }}
            onMouseUp={e => {
              if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#FF773E';
            }}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}