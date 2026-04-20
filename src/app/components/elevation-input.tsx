/**
 * ElevationInputField — flexible ft-in elevation input
 *
 * Accepted formats (all auto-detected):
 *   12' 6"    12'-6"    12'6"
 *   12ft 6in  12ft6in   12ft-6in
 *   12-6      12 6      (dash / space separated integers)
 *   12.5      12        (decimal feet)
 *   150"      150in     (pure inches → converted to feet)
 *   Negative values: -28'-6"  -28.5  etc.
 *
 * Storage: decimal feet (number)
 * Display on blur: X' - Y"  (1/8" precision by default)
 */

import React, { useState, useEffect, useRef, useId } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Parsing helpers
// ─────────────────────────────────────────────────────────────────────────────

function normRaw(s: string) {
  return s
    .trim()
    .replace(/[\u2032\u02bc]/g, "'")  // normalize apostrophe variants
    .replace(/\u2033/g, '"')           // normalize double-prime
    .replace(/\s+/g, ' ');
}

/** Try matching pure inches: "150"" | "150in" | "150 inches" */
function tryPureInches(s: string): number | null {
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(?:"|in(?:ch(?:es?)?)?\b)\s*$/i);
  return m ? parseFloat(m[1]) / 12 : null;
}

/** Try "12'6"" | "12' 6"" | "12'-6"" | "12ft6in" | "12ft 6in" */
function tryFtInMarked(s: string): number | null {
  const m = s.match(
    /^(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\s*[-\u2013]?\s*(\d+(?:\.\d+)?)\s*(?:"|in(?:ch(?:es?)?)?\b)?\s*$/i
  );
  if (!m) return null;
  const ft = parseFloat(m[1]);
  const inch = parseFloat(m[2]);
  if (inch >= 12) return null;
  return ft + inch / 12;
}

/** Try "12-6" → 12' 6" (dash-separated, second part must be < 12) */
function tryFtInDash(s: string): number | null {
  const m = s.match(/^(\d+(?:\.\d+)?)\s*[-\u2013]\s*(\d+(?:\.\d+)?)\s*(?:"|in(?:ch(?:es?)?)?\b)?\s*$/i);
  if (!m) return null;
  const inch = parseFloat(m[2]);
  if (inch >= 12) return null;
  return parseFloat(m[1]) + inch / 12;
}

/** Try "12 6" → 12' 6"  (space-separated integers, second < 12) */
function tryFtInSpace(s: string): number | null {
  const m = s.match(/^(\d+)\s+(\d+)\s*$/);
  if (!m) return null;
  const inch = parseInt(m[2], 10);
  if (inch >= 12) return null;
  return parseInt(m[1], 10) + inch / 12;
}

/** Try plain decimal / integer feet, with optional unit marker */
function tryDecimalFeet(s: string): number | null {
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')?\s*$/i);
  return m ? parseFloat(m[1]) : null;
}

/**
 * Parse any supported elevation string → decimal feet, or null if unrecognisable.
 */
export function parseElevation(raw: string): number | null {
  const s = normRaw(raw);
  if (!s) return null;

  const neg = /^[-\u2212]/.test(s);
  const abs = neg ? s.slice(1).trim() : s;
  const sign = neg ? -1 : 1;

  const result =
    tryPureInches(abs) ??
    tryFtInMarked(abs) ??
    tryFtInDash(abs) ??
    tryFtInSpace(abs) ??
    tryDecimalFeet(abs);

  return result !== null ? sign * result : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Formatting helpers
// ─────────────────────────────────────────────────────────────────────────────

const EIGHTH_FRACTIONS: Record<number, string> = {
  0: '', 1: '1/8', 2: '1/4', 3: '3/8', 4: '1/2', 5: '5/8', 6: '3/4', 7: '7/8',
};

/**
 * Format decimal feet → "X' - Y"" (canonical Inertia ft-in display).
 */
export function formatFtIn(decimalFeet: number, roundDenom = 8): string {
  const neg = decimalFeet < 0;
  const abs = Math.abs(decimalFeet);

  let wholeFt = Math.floor(abs);
  const rawIn = (abs - wholeFt) * 12;

  let roundedIn = Math.round(rawIn * roundDenom) / roundDenom;
  if (roundedIn >= 12) { wholeFt += 1; roundedIn = 0; }

  const wholeIn = Math.floor(roundedIn);
  const fracIn  = roundedIn - wholeIn;

  let fracStr = '';
  if (roundDenom === 8) {
    fracStr = EIGHTH_FRACTIONS[Math.round(fracIn * 8)] ?? '';
  } else if (fracIn > 0) {
    fracStr = (fracIn).toFixed(2).replace(/\.?0+$/, '');
  }

  const inStr = fracStr ? `${wholeIn} ${fracStr}` : `${wholeIn}`;
  return `${neg ? '-' : ''}${wholeFt}' - ${inStr}"`;
}

function decimalLabel(ft: number): string {
  return `${parseFloat(ft.toFixed(4))} ft`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M8 7v4" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="#9CA4AE" />
    </svg>
  );
}

function ErrIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
      <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="0.75" fill="white" />
    </svg>
  );
}

function FormatTooltip({ visible }: { visible: boolean }) {
  return (
    <div
      role="tooltip"
      style={{
        position: 'absolute', top: 'calc(100% + 6px)', left: 0,
        background: 'rgba(36,55,70,0.9)',
        color: '#FFFFFF', borderRadius: 4,
        padding: '8px 12px',
        fontFamily: 'Open Sans, sans-serif', fontSize: 12, lineHeight: '18px',
        whiteSpace: 'nowrap', zIndex: 9999, pointerEvents: 'none',
        opacity: visible ? 1 : 0, transition: 'opacity 0.15s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Accepted formats:</div>
      <div>{"12' 6\"  \u00b7  12'-6\"  \u00b7  12-6  \u00b7  12 6"}</div>
      <div>{"12.5  \u00b7  150\"  \u00b7  12ft 6in"}</div>
      <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.6)' }}>
        {"Negative: -28'-6\"  or  -28.5"}
      </div>
      <div style={{
        position: 'absolute', top: -5, left: 12,
        width: 0, height: 0,
        borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
        borderBottom: '5px solid rgba(36,55,70,0.9)',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export interface ElevationInputFieldProps {
  /** Current value in decimal feet (null = empty) */
  value: number | null;
  /** Called on blur when value changes */
  onChange: (feet: number | null) => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Rounding denominator for inch fractions (default 8 = nearest 1/8") */
  roundDenom?: number;
  showPreview?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP = {
  sm: { height: 32, font: 13 },
  md: { height: 36, font: 14 },
  lg: { height: 40, font: 14 },
};

export function ElevationInputField({
  value,
  onChange,
  onBlur,
  label = 'Elevation',
  placeholder = "e.g. 12' 6\" or 12.5",
  disabled = false,
  size = 'md',
  roundDenom = 8,
  showPreview = true,
  hasError: externalError,
  errorMessage: externalErrorMsg,
  style,
}: ElevationInputFieldProps) {
  const id = useId();
  const sz = SIZE_MAP[size];

  const [raw, setRaw]           = useState<string>(() =>
    value !== null ? formatFtIn(value, roundDenom) : ''
  );
  const [focused, setFocused]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [localErr, setLocalErr] = useState(false);
  const [showTip, setShowTip]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef(value);

  // Sync external value changes when not focused
  useEffect(() => {
    if (value !== prevValueRef.current) {
      prevValueRef.current = value;
      if (!focused) {
        setRaw(value !== null ? formatFtIn(value, roundDenom) : '');
        setLocalErr(false);
      }
    }
  }, [value, focused, roundDenom]);

  // Live preview
  const liveparsed = parseElevation(raw);
  const hasValue   = raw.trim() !== '';
  const showError  = (hasValue && liveparsed === null) || localErr || !!externalError;
  const errMsg     = externalErrorMsg ??
    ((localErr || (hasValue && liveparsed === null))
      ? "Invalid format. Use 12' 6\" or 12.5"
      : undefined);

  const previewStr =
    showPreview && focused && hasValue && liveparsed !== null
      ? formatFtIn(liveparsed, roundDenom)
      : null;

  // Border / bg
  const borderColor = disabled   ? '#E0E4E8'
    : showError  ? (focused ? '#FF4D4F' : '#FFA39E')
    : focused    ? '#91D5FF'
    : hovering   ? '#A8B0BB'
    :              '#D0D5DD';

  const bg = disabled  ? '#F5F5F5'
    : showError ? '#FFF1F0'
    :             '#FFFFFF';

  // Handlers
  function handleFocus() {
    setFocused(true);
    if (value !== null) {
      setRaw(parseFloat(value.toFixed(6)).toString());
    }
  }

  function handleBlur() {
    setFocused(false);
    const trimmed = raw.trim();
    if (trimmed === '') {
      setLocalErr(false);
      setRaw('');
      onChange(null);
      onBlur?.();
      return;
    }
    const parsed = parseElevation(trimmed);
    if (parsed === null) {
      setLocalErr(true);
      onBlur?.();
      return;
    }
    const normalized = formatFtIn(parsed, roundDenom);
    setLocalErr(false);
    setRaw(normalized);
    onChange(parsed);
    onBlur?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter')  { inputRef.current?.blur(); return; }
    if (e.key === 'Escape') {
      setRaw(value !== null ? formatFtIn(value, roundDenom) : '');
      setLocalErr(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      {/* Label */}
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label
            htmlFor={id}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 13, fontWeight: 600, lineHeight: '18px',
              color: disabled ? '#BFBFBF' : '#344054',
              cursor: disabled ? 'default' : 'pointer',
            }}
          >
            {label}
          </label>
          <div
            style={{ position: 'relative', display: 'inline-flex', cursor: 'help' }}
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
          >
            <InfoIcon />
            <FormatTooltip visible={showTip} />
          </div>
        </div>
      )}

      {/* Input */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => !disabled && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={raw}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          onChange={e => { setRaw(e.target.value); setLocalErr(false); }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%', height: sz.height,
            paddingLeft: 10,
            paddingRight: showError ? 32 : (previewStr ? 0 : 10),
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            background: bg,
            fontFamily: 'Open Sans, sans-serif',
            fontSize: sz.font, fontWeight: 400, lineHeight: '20px',
            color: disabled ? '#BFBFBF' : '#344054',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.15s, background 0.15s',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
        />

        {/* Error icon */}
        {showError && (
          <div style={{
            position: 'absolute', right: 10,
            top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', pointerEvents: 'none',
          }}>
            <ErrIcon />
          </div>
        )}

        {/* Live preview chip */}
        {!showError && previewStr && previewStr !== raw.trim() && (
          <div style={{
            position: 'absolute', right: 8,
            top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
            color: '#9CA4AE', pointerEvents: 'none',
            background: '#FAFAFA', padding: '1px 5px',
            borderRadius: 3, border: '1px solid #E5E7EB',
            whiteSpace: 'nowrap',
          }}>
            {'->'} {previewStr}
          </div>
        )}
      </div>

      {/* Error message */}
      {showError && errMsg && (
        <div style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: 12,
          color: '#FF4D4F', lineHeight: '16px',
        }}>
          {errMsg}
        </div>
      )}

      {/* Stored-as hint */}
      {!focused && !showError && value !== null && (
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: '#9CA4AE', lineHeight: '16px',
        }}>
          Stored as {decimalLabel(value)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Showcase / Demo Page
// ─────────────────────────────────────────────────────────────────────────────

const FORMAT_EXAMPLES = [
  { input: "12' 6\"",  note: 'Feet + inch marks' },
  { input: "12'-6\"",  note: 'Feet mark with dash' },
  { input: "12-6",     note: 'Dash-separated integers' },
  { input: "12 6",     note: 'Space-separated integers' },
  { input: "12.5",     note: 'Decimal feet' },
  { input: "150\"",    note: 'Pure inches' },
  { input: "12ft 6in", note: 'Unit words' },
  { input: "12ft",     note: 'Feet word only' },
  { input: "-28.5",    note: 'Negative (basement)' },
  { input: "-28'-6\"", note: 'Negative ft-in' },
];

const ROUNDING_OPTIONS = [
  { label: '1"',     value: 1  },
  { label: '1/2"',   value: 2  },
  { label: '1/4"',   value: 4  },
  { label: '1/8"',   value: 8  },
  { label: '1/16"',  value: 16 },
];

function FormatRow({ input, note }: { input: string; note: string }) {
  const parsed    = parseElevation(input);
  const formatted = parsed !== null ? formatFtIn(parsed) : '\u2014';
  const stored    = parsed !== null ? decimalLabel(parsed) : '\u2014';
  return (
    <tr>
      <td style={{ padding: '8px 16px', fontFamily: 'monospace', fontSize: 13, color: '#344054', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
        {input}
      </td>
      <td style={{ padding: '8px 16px', fontSize: 13, color: '#616D79', borderBottom: '1px solid #F0F0F0' }}>
        {note}
      </td>
      <td style={{ padding: '8px 16px', fontFamily: 'monospace', fontSize: 13, color: '#027A48', fontWeight: 600, borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
        {formatted}
      </td>
      <td style={{ padding: '8px 16px', fontSize: 13, color: '#9CA4AE', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>
        {stored}
      </td>
    </tr>
  );
}

function StateCard({ title, value: initValue, disabled, hasError, errorMessage, note }: {
  title: string;
  value: number | null;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  note?: string;
}) {
  const [val, setVal] = useState<number | null>(initValue);
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, padding: '20px 20px 16px' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
        {title}
      </div>
      <ElevationInputField
        value={val}
        onChange={setVal}
        disabled={disabled}
        hasError={hasError}
        errorMessage={errorMessage}
        showPreview={!disabled}
      />
      {note && (
        <div style={{ marginTop: 10, fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA4AE' }}>
          {note}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#1D2C38', marginBottom: 12 }}>
      {children}
    </div>
  );
}

function ReadoutItem({ label, value: val }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: '#9CA4AE', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#096DD9' }}>
        {val}
      </div>
    </div>
  );
}

function RuleCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, padding: '18px 20px' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#384857', marginBottom: 12 }}>
        {title}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF4D00', flexShrink: 0, marginTop: 6 }} />
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#616D79', lineHeight: '18px' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ElevationInputShowcase() {
  const [playgroundVal, setPlaygroundVal] = useState<number | null>(12.5);
  const [rounding, setRounding]           = useState(8);
  const [log, setLog] = useState<Array<{ result: number | null; formatted: string; idx: number }>>([]);
  const logIdxRef = useRef(0);

  function handleChange(feet: number | null) {
    setPlaygroundVal(feet);
    logIdxRef.current += 1;
    setLog(prev => [{
      result: feet,
      formatted: feet !== null ? formatFtIn(feet, rounding) : '(empty)',
      idx: logIdxRef.current,
    }, ...prev].slice(0, 6));
  }

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: '#F0F2F5', fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D9D9D9', height: 72, display: 'flex', alignItems: 'center', paddingLeft: 24, paddingRight: 24, flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', color: '#1D2C38', margin: 0 }}>
          Elevation Input — Component Showcase
        </h1>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100 }}>

        {/* ── Playground */}
        <section>
          <SectionHeading>Live Playground</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Left panel */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, padding: 24 }}>
              <ElevationInputField
                value={playgroundVal}
                onChange={handleChange}
                roundDenom={rounding}
                showPreview
                label="Elevation"
                placeholder="Try any format…"
              />

              {/* Rounding */}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#616D79', marginBottom: 8 }}>
                  Inch rounding precision
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {ROUNDING_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setRounding(opt.value)}
                      style={{
                        height: 30, padding: '0 10px',
                        border: `1px solid ${rounding === opt.value ? '#FF4D00' : '#D0D5DD'}`,
                        borderRadius: 4,
                        background: rounding === opt.value ? '#FFF3EE' : '#F2F3F4',
                        color: rounding === opt.value ? '#FF4D00' : '#616D79',
                        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Value readouts */}
              {playgroundVal !== null && (
                <div style={{ marginTop: 20, padding: '12px 14px', background: '#F0F7FF', borderRadius: 6, border: '1px solid #BAE7FF' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <ReadoutItem label="Stored (decimal ft)"  value={decimalLabel(playgroundVal)} />
                    <ReadoutItem label="Normalized display"   value={formatFtIn(playgroundVal, rounding)} />
                    <ReadoutItem label="Decimal inches"       value={`${parseFloat((playgroundVal * 12).toFixed(4))}"`} />
                    <ReadoutItem label="Decimal meters"       value={`${parseFloat((playgroundVal * 0.3048).toFixed(4))} m`} />
                  </div>
                </div>
              )}
            </div>

            {/* Right panel — commit log */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, padding: 24 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#384857', marginBottom: 12 }}>
                Commit log
              </div>
              {log.length === 0 ? (
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#BFBFBF', padding: '16px 0' }}>
                  Type something and press Enter or click away…
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {log.map((entry, i) => (
                    <div key={entry.idx} style={{
                      display: 'flex', gap: 10, alignItems: 'center',
                      padding: '8px 10px', borderRadius: 4,
                      background: i === 0 ? '#F6FFED' : '#FAFAFA',
                      border: `1px solid ${i === 0 ? '#B7EB8F' : '#F0F0F0'}`,
                    }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#9CA4AE', flexShrink: 0 }}>#{entry.idx}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#344054', flex: 1 }}>{entry.formatted}</span>
                      {entry.result !== null && (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA4AE', flexShrink: 0 }}>
                          {decimalLabel(entry.result)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Keyboard hints */}
              <div style={{ marginTop: 20, padding: '10px 12px', background: '#F9FAFB', borderRadius: 4, border: '1px solid #F0F0F0' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', marginBottom: 6 }}>KEYBOARD</div>
                {([['Enter', 'Commit and normalize'], ['Escape', 'Revert to last value'], ['Tab', 'Commit and move focus']] as const).map(([key, desc]) => (
                  <div key={key} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <kbd style={{ background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 3, padding: '1px 5px', fontFamily: 'monospace', fontSize: 10, color: '#384857' }}>
                      {key}
                    </kbd>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#616D79' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Format table */}
        <section>
          <SectionHeading>Accepted Input Formats</SectionHeading>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FAFAFA' }}>
                  {['User Input', 'Format', 'Normalized Output', 'Stored (decimal ft)'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', borderBottom: '1px solid #E5E7EB' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FORMAT_EXAMPLES.map(f => <FormatRow key={f.input} input={f.input} note={f.note} />)}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── States grid */}
        <section>
          <SectionHeading>Component States</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <StateCard title="Default (empty)"     value={null}         note="Click and type any supported format" />
            <StateCard title="With value"          value={12.5}         note="Value pre-committed; shows stored hint" />
            <StateCard title="Negative elevation"  value={-28.5}        note="Basement / below datum" />
            <StateCard title="External error"      value={null}         hasError errorMessage="Elevation must be above -50 ft" note="Error state driven by parent" />
            <StateCard title="Disabled"            value={14}           disabled note="Non-editable, read-only appearance" />
            <StateCard title="Fractional inches"   value={12 + 7.5/12}  note={'7.5" stored as decimal, displayed with 1/8 precision'} />
          </div>
        </section>

        {/* ── Rules */}
        <section>
          <SectionHeading>Conversion Rules</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <RuleCard title="Parsing priority order" items={[
              'Pure inches: 150" → divide by 12',
              'Marked ft-in: 12\'6" or 12ft6in',
              'Dash-separated: 12-6 (inches < 12)',
              'Space-separated integers: 12 6',
              'Decimal / integer feet: 12.5',
            ]} />
            <RuleCard title="Normalization on blur" items={[
              "Output format: X' - Y\"",
              'Inches rounded to nearest 1/8" by default',
              "Rollover: 11 7/8\" + 1/8\" = 1' 0\"",
              "Negative preserved: -28.5 → -28' - 6\"",
              'Storage: always decimal feet (number)',
            ]} />
            <RuleCard title="Validation" items={[
              'Empty field → stores null (no error shown)',
              'Inches >= 12 in ft-in input → error',
              'Unrecognised format → inline error message',
              'Escape key reverts to last valid value',
              'Enter / Tab commits and normalizes',
            ]} />
            <RuleCard title="UX behaviour" items={[
              'Focus: shows decimal feet for easier editing',
              'Live preview chip appears while typing',
              'Blur: replaces raw text with normalized form',
              'Info icon shows format tooltip on hover',
              'Stored-as hint shown below when committed',
            ]} />
          </div>
        </section>

        {/* ── API reference */}
        <section>
          <SectionHeading>Component API</SectionHeading>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FAFAFA' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', borderBottom: '1px solid #E5E7EB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['value',        'number | null',              '\u2014',                "Current decimal-feet value; null = empty"],
                  ['onChange',     '(feet: number | null) => void', '\u2014',             "Fires on blur when value changes"],
                  ['onBlur',       '() => void',                 'undefined',             "Fires on every blur event"],
                  ['label',        'string',                     '"Elevation"',           "Field label (empty string hides it)"],
                  ['placeholder',  'string',                     '"e.g. 12\' 6\\" or 12.5"', "Input placeholder"],
                  ['disabled',     'boolean',                    'false',                 "Non-editable state"],
                  ['size',         '"sm" | "md" | "lg"',         '"md"',                  "Height: 32 / 36 / 40 px"],
                  ['roundDenom',   'number',                     '8',                     "Rounding denominator (8=1/8\", 4=1/4\", etc.)"],
                  ['showPreview',  'boolean',                    'true',                  "Show live ft-in preview while typing"],
                  ['hasError',     'boolean',                    'false',                 "External error override"],
                  ['errorMessage', 'string',                     'undefined',             "External error message override"],
                  ['style',        'CSSProperties',              'undefined',             "Applied to the root wrapper div"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td style={{ padding: '8px 16px', fontFamily: 'monospace', fontSize: 12, color: '#FF4D00', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>{prop}</td>
                    <td style={{ padding: '8px 16px', fontFamily: 'monospace', fontSize: 12, color: '#096DD9', borderBottom: '1px solid #F0F0F0', whiteSpace: 'nowrap' }}>{type}</td>
                    <td style={{ padding: '8px 16px', fontFamily: 'monospace', fontSize: 11, color: '#9CA4AE', borderBottom: '1px solid #F0F0F0' }}>{def}</td>
                    <td style={{ padding: '8px 16px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#384857', borderBottom: '1px solid #F0F0F0' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}