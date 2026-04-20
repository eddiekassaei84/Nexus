import React, { useState, useEffect } from 'react';
import svgPaths from '../../imports/svg-c0g2xlbqu0';
import InertiaLogo from '../../imports/Inertiafulllogo68';

// ── URL validation helper ─────────────────────────────────────────────────────
function isValidUrl(url: string): boolean {
  if (!url) return true;
  // Prepend https:// if no protocol is present so URL() can parse it
  const tryUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  try {
    const u = new URL(tryUrl);
    // Hostname must contain at least one dot and a valid TLD (2+ chars)
    return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(u.hostname);
  } catch {
    return false;
  }
}

// ── Shared chevron icon (from svg-c0g2xlbqu0 p3cfcc3a4) ──────────────────────
function ChevronDown({ color = '#9EA3A9' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 15.9896 15.9896" fill="none" style={{ flexShrink: 0 }}>
      <path d={svgPaths.p3cfcc3a4} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49902" />
    </svg>
  );
}

// ── Orange CTA button (§15.1 Medium) ────────────────────────────────────────
function OrangeBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  const bg = disabled ? '#FFBD9C' : prs ? '#D4380D' : hov ? '#FF773E' : '#FF4D00';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)}
      onMouseUp={() => setPrs(false)}
      style={{
        width: '100%', height: 48, background: bg,
        border: 'none', borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontWeight: 400,
        fontSize: 14, lineHeight: '20px',
        color: '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// ── Back arrow button ─────────────────────────────────────────────────────────
function BackBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 6, flexShrink: 0,
        background: hov ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.20)',
        cursor: 'pointer', transition: 'background 0.15s',
        padding: 0,
      }}
      title="Back"
    >
      {/* Left-pointing chevron */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 12L6 8L10 4" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── White text-field (address inputs) ────────────────────────────────────────
function AddressField({
  placeholder, value, onChange,
}: { placeholder: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const [hov, setHov] = useState(false);
  const border = focused ? '1.111px solid #91D5FF'
    : hov ? '1.111px solid #A8B0BB'
    : '1.111px solid #D0D5DD';
  return (
    <div
      style={{
        height: 40, width: '100%', background: '#FFFFFF',
        border, borderRadius: 4,
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', transition: 'border-color 0.15s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, height: '100%', border: 'none', outline: 'none',
          background: 'transparent',
          fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '20px', color: '#344054',
          paddingLeft: 10, paddingRight: 10,
        }}
      />
    </div>
  );
}

// ── Taller FormInput (border-radius 4px, for Company Name / Company URL) ────
function FormInput({
  id, label, placeholder = '', value, onChange, required, error,
}: {
  id: string; label: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasError = !!error;
  const border = hasError ? '1.111px solid #FFA39E'
    : focused ? '1.111px solid #91D5FF'
    : hovered ? '1.111px solid #A8B0BB'
    : '1.111px solid #D0D5DD';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <label htmlFor={id} style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 14, lineHeight: '20px', color: '#FFFFFF', cursor: 'pointer',
      }}>
        {label}
        {required && <span style={{ color: '#FFA39E', marginLeft: 2 }}>*</span>}
      </label>
      <div
        style={{
          position: 'relative', height: 44, width: '100%',
          background: hasError ? '#FFF1F0' : '#FFFFFF',
          border, borderRadius: 4,
          boxShadow: '0px 1px 2px 0px rgba(16,24,40,0.05)',
          display: 'flex', alignItems: 'center', overflow: 'hidden',
          transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          id={id} type="text" value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, height: '100%', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'Inter, sans-serif',
            fontWeight: 400, fontSize: 14, lineHeight: '20px',
            color: '#344054', paddingLeft: 16, paddingRight: 16,
          }}
        />
      </div>
      {hasError && (
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '13px', color: '#FF4D4F', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Dropdown (country / state / yes-no) ──────────────────────────────────────
function SelectField({
  value, options, onChange, placeholder,
}: { value: string; options: string[]; onChange: (v: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  const border = open ? '1.111px solid #91D5FF'
    : hov ? '1.111px solid #A8B0BB'
    : '1.111px solid #D0D5DD';
  return (
    <div style={{ position: 'relative', height: 40, width: '100%' }}>
      <div
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: '100%', background: '#FFFFFF',
          border, borderRadius: 4,
          display: 'flex', alignItems: 'center',
          paddingLeft: 11, paddingRight: 11,
          cursor: 'pointer', transition: 'border-color 0.15s', userSelect: 'none',
        }}
      >
        <span style={{
          flex: 1, fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '20px',
          color: value ? '#344054' : '#9EA3A9',
        }}>
          {value || placeholder || ''}
        </span>
        <ChevronDown color={open ? '#91D5FF' : '#9EA3A9'} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 400,
          background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxHeight: 200, overflowY: 'auto',
        }}>
          {options.map(opt => (
            <div key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontWeight: 400,
                fontSize: 14, lineHeight: '20px', color: '#384857',
                cursor: 'pointer', background: value === opt ? '#E6F7FF' : 'transparent',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = value === opt ? '#E6F7FF' : 'transparent'; }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Reusable section label (white + optional asterisk) ───────────────────────
function SectionLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <label style={{
      fontFamily: 'Open Sans, sans-serif', fontWeight: 600,
      fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
      display: 'flex', gap: 4,
    }}>
      {text}
      {required && <span style={{ color: '#FFA39E' }}>*</span>}
    </label>
  );
}

// ── Address sub-block (country + line1 + line2 + city + state+zip) ───────────
function AddressBlock({
  country, onCountry,
  line1, onLine1,
  line2, onLine2,
  city, onCity,
  state, onState,
  zip, onZip,
  label, required,
  submitted,
}: {
  country: string; onCountry: (v: string) => void;
  line1: string; onLine1: (v: string) => void;
  line2: string; onLine2: (v: string) => void;
  city: string; onCity: (v: string) => void;
  state: string; onState: (v: string) => void;
  zip: string; onZip: (v: string) => void;
  label: string; required?: boolean;
  submitted: boolean;
}) {
  const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Singapore', 'Other'];
  const US_STATES = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington', 'Other'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SectionLabel text={label} required={required} />
      <SelectField value={country} options={COUNTRIES} onChange={onCountry} />
      <AddressField placeholder="Address Line 1" value={line1} onChange={onLine1} />
      {submitted && !line1 && (
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: '-4px 0 0' }}>Address Line 1 is required.</p>
      )}
      <AddressField placeholder="Address Line 2" value={line2} onChange={onLine2} />
      <AddressField placeholder="City" value={city} onChange={onCity} />
      {submitted && !city && (
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: '-4px 0 0' }}>City is required.</p>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <SelectField value={state} options={US_STATES} onChange={onState} placeholder="State/Region" />
        </div>
        <div style={{ flex: 1 }}>
          <AddressField placeholder="Zip/Postal Code" value={zip} onChange={onZip} />
        </div>
      </div>
    </div>
  );
}

// ── FROZEN card header shared by both steps ───────────────────────────────────
function CardHeader({ title }: { title: string }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ padding: '32px 40px 20px' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 24, lineHeight: '32px', letterSpacing: 0,
          color: '#FFFFFF', margin: 0,
        }}>
          {title}
        </p>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
    </div>
  );
}

// ── FROZEN card footer ────────────────────────────────────────────────────────
function CardFooter() {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
      <div style={{
        height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: 40, paddingRight: 40,
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 12, lineHeight: '16px', color: 'rgba(255,255,255,0.40)',
        }}>
          ©2025 Inertia Systems, Inc. All Rights Reserved
        </span>
      </div>
    </div>
  );
}

// ── STEP 1 — Company details ─────────────────────────────────────────────────
function Step1({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry]         = useState('United States');
  const [line1, setLine1]             = useState('');
  const [line2, setLine2]             = useState('');
  const [city, setCity]               = useState('');
  const [state, setState]             = useState('');
  const [zip, setZip]                 = useState('');
  const [companyUrl, setCompanyUrl]   = useState('');
  const [submitted, setSubmitted]     = useState(false);

  const companyUrlInvalid = submitted && companyUrl !== '' && !isValidUrl(companyUrl);

  const handleNext = () => {
    setSubmitted(true);
    if (!companyName || !line1 || !city) return;
    if (companyUrl !== '' && !isValidUrl(companyUrl)) return;
    onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="Company Registration" />

      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '20px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Email + warning row */}
        <div style={{
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {/* Back + email row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <BackBtn onClick={onBack} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              eddie.kassaei@projectinertia.com
            </span>
          </div>
          <p style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.75)',
            margin: 0,
          }}>
            We couldn't recognize your company from your email domain. Please register your company to continue.
          </p>
        </div>

        <FormInput
          id="rc-name" label="Company Name" required placeholder="Your company name"
          value={companyName} onChange={setCompanyName}
          error={submitted && !companyName ? 'Company name is required.' : undefined}
        />

        <AddressBlock
          label="Company Address" required submitted={submitted}
          country={country} onCountry={setCountry}
          line1={line1} onLine1={setLine1}
          line2={line2} onLine2={setLine2}
          city={city} onCity={setCity}
          state={state} onState={setState}
          zip={zip} onZip={setZip}
        />

        <FormInput
          id="rc-url" label="Company URL" placeholder="https://yourcompany.com"
          value={companyUrl} onChange={setCompanyUrl}
          error={companyUrlInvalid ? 'Please enter a valid URL (e.g. https://yourcompany.com).' : undefined}
        />
      </div>

      {/* ── Next button — pinned above footer with 24px gap ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px' }}>
        <OrangeBtn label="Next" onClick={handleNext} />
      </div>

      <CardFooter />
    </div>
  );
}

// ── Radio option component ────────────────────────────────────────────────────
function RadioOption({
  id, value, selected, label, onChange,
}: {
  id: string; value: string; selected: string; label: string;
  onChange: (v: string) => void;
}) {
  const isChecked = selected === value;
  return (
    <label
      htmlFor={id}
      style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
    >
      <div
        onClick={() => onChange(value)}
        style={{
          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
          background: isChecked ? '#FF4D00' : '#FFFFFF',
          border: isChecked ? '2px solid #FF4D00' : '2px solid #D0D5DD',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s, border-color 0.15s',
          boxShadow: isChecked ? '0 0 0 3px rgba(255,77,0,0.18)' : 'none',
        }}
      >
        {isChecked && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', flexShrink: 0 }} />
        )}
      </div>
      <input
        id={id} type="radio" name="hq-radio"
        value={value} checked={isChecked}
        onChange={() => onChange(value)}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 400,
        fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
      }}>
        {label}
      </span>
    </label>
  );
}

// ── STEP 2 — HQ question ──────────────────────────────────────────────────────
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Singapore', 'Other'];
const US_STATES = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington', 'Other'];

function Step2({ onNext, onBack }: { onNext: (officeName: string) => void; onBack: () => void }) {
  const [isHq, setIsHq]           = useState('');
  const [officeName, setOfficeName] = useState('');
  const [country, setCountry]     = useState('United States');
  const [line1, setLine1]         = useState('');
  const [line2, setLine2]         = useState('');
  const [city, setCity]           = useState('');
  const [state, setState]         = useState('');
  const [zip, setZip]             = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNo = isHq === 'no';

  const handleNext = () => {
    setSubmitted(true);
    if (!isHq) return;
    if (isNo && (!line1 || !city)) return;
    // "yes" → skip step 3, go straight with locked "Headquarter Office"
    if (isHq === 'yes') { onNext('Headquarter Office'); return; }
    // "no" → pass officeName to step 3
    onNext(officeName || 'Office');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="Company Registration" />

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '20px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Email row */}
        <div style={{ paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <BackBtn onClick={onBack} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              eddie.kassaei@projectinertia.com
            </span>
          </div>
        </div>

        {/* Is this the company headquarters? — radio buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              Is this the company <span style={{ whiteSpace: 'nowrap' }}>headquarters?<span style={{ color: '#FFA39E' }}>*</span></span>
            </span>
          </div>

          <RadioOption
            id="hq-yes" value="yes" selected={isHq}
            label="Yes, this is the headquarter"
            onChange={setIsHq}
          />
          <RadioOption
            id="hq-no" value="no" selected={isHq}
            label="No, this is another office"
            onChange={setIsHq}
          />

          {submitted && !isHq && (
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: 0 }}>
              Please select an option.
            </p>
          )}
        </div>

        {/* Conditional fields — shown only when "No" is selected */}
        {isNo && (
          <>
            {/* Office / Branch Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
              }}>
                Office/Branch Name
              </label>
              <AddressField
                placeholder="Type office name"
                value={officeName}
                onChange={setOfficeName}
              />
            </div>

            {/* Office Location */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SectionLabel text="Office Location" required />

              <SelectField value={country} options={COUNTRIES} onChange={setCountry} />

              <AddressField placeholder="Address Line 1" value={line1} onChange={setLine1} />
              {submitted && !line1 && (
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: '-4px 0 0' }}>
                  Address Line 1 is required.
                </p>
              )}

              <AddressField placeholder="Address Line 2" value={line2} onChange={setLine2} />

              <AddressField placeholder="City" value={city} onChange={setCity} />
              {submitted && !city && (
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: '-4px 0 0' }}>
                  City is required.
                </p>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <SelectField value={state} options={US_STATES} onChange={setState} placeholder="State/Region" />
                </div>
                <div style={{ flex: 1 }}>
                  <AddressField placeholder="Zip/Postal Code" value={zip} onChange={setZip} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Next button — pinned above footer with 24px gap ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px' }}>
        <OrangeBtn label="Next" onClick={handleNext} />
      </div>

      <CardFooter />
    </div>
  );
}

// ── STEP 3 — Domain question ──────────────────────────────────────────────────
function Step3({
  officeName, onComplete, onBack,
}: { officeName: string; onComplete: (finalOfficeName: string) => void; onBack: () => void }) {
  const [domainAnswer, setDomainAnswer] = useState('');
  const [officeUrl, setOfficeUrl]       = useState('');
  const [submitted, setSubmitted]       = useState(false);

  const isDifferentDomain = domainAnswer === 'yes';
  const officeUrlInvalid = submitted && isDifferentDomain && officeUrl !== '' && !isValidUrl(officeUrl);

  const handleRegister = () => {
    setSubmitted(true);
    if (!domainAnswer) return;
    if (isDifferentDomain && !officeUrl) return;
    if (isDifferentDomain && !isValidUrl(officeUrl)) return;
    onComplete(officeName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="Company Registration" />

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '20px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Email row */}
        <div style={{ paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <BackBtn onClick={onBack} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              eddie.kassaei@projectinertia.com
            </span>
          </div>
        </div>

        {/* Domain question — radio buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              Does this office/branch use a different email domain than the <span style={{ whiteSpace: 'nowrap' }}>headquarters?<span style={{ color: '#FFA39E' }}>*</span></span>
            </span>
          </div>

          <RadioOption
            id="domain-no" value="no" selected={domainAnswer}
            label="No, same domain as headquarters"
            onChange={setDomainAnswer}
          />
          <RadioOption
            id="domain-yes" value="yes" selected={domainAnswer}
            label="Yes, this office uses a different domain"
            onChange={setDomainAnswer}
          />

          {submitted && !domainAnswer && (
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: 0 }}>
              Please select an option.
            </p>
          )}
        </div>

        {/* Conditional URL field — shown only when "Yes, different domain" is selected */}
        {isDifferentDomain && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>
              Office/branch URL
            </label>
            <AddressField
              placeholder="Type office/branch URL"
              value={officeUrl}
              onChange={setOfficeUrl}
            />
            {submitted && isDifferentDomain && !officeUrl && (
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: 0 }}>
                Office URL is required.
              </p>
            )}
            {officeUrlInvalid && (
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#FF4D4F', margin: 0 }}>
                Please enter a valid URL (e.g. https://office.example.com).
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Register Company button — pinned above footer with 24px gap ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px' }}>
        <OrangeBtn label="Register Company" onClick={handleRegister} />
      </div>

      <CardFooter />
    </div>
  );
}

// ── STEP 4 — Success / verification pending ───────────────────────────────────
function StepSuccess({ officeName, onProceed }: { officeName: string; onProceed: () => void }) {
  const [countdown, setCountdown] = useState(10);
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);

  useEffect(() => {
    if (countdown <= 0) { onProceed(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onProceed]);

  const progress = ((10 - countdown) / 10) * 100;
  const bg = prs ? '#D4380D' : hov ? '#FF773E' : '#FF4D00';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="Company Registration" />

      {/* ── Body — centred vertically ── */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 40px',
        gap: 20,
      }}>
        {/* ✔ icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(82,196,26,0.15)',
          border: '2px solid rgba(82,196,26,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5L10 17.5L19 8" stroke="#52C41A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 18, lineHeight: '26px', color: '#FFFFFF',
          margin: 0, textAlign: 'center',
        }}>
          Company created, verification pending
        </p>

        {/* Body */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '22px', color: 'rgba(255,255,255,0.75)',
          margin: 0, textAlign: 'center',
        }}>
          Your company is now active. Our team will review and verify it within the next few days to grant the{' '}
          <span style={{ color: '#FF773E', fontWeight: 600 }}>Blade Verified</span>{' '}
          badge. If we need any additional information, we'll reach out to you.
        </p>
      </div>

      {/* ── Action button — pinned above footer, same position as all other steps ── */}
      <div style={{ flexShrink: 0, padding: '0 40px 24px' }}>
        {/* Progress bar + countdown label */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', marginBottom: 12 }}>
          <div style={{
            width: '100%', height: 3, borderRadius: 9999,
            background: 'rgba(255,255,255,0.15)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 9999,
              background: '#FF4D00',
              width: `${progress}%`,
              transition: 'width 1s linear',
            }} />
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 12, lineHeight: '16px',
            color: 'rgba(255,255,255,0.45)',
          }}>
            Auto-redirecting in {countdown}s…
          </span>
        </div>

        <button
          onClick={onProceed}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => { setHov(false); setPrs(false); }}
          onMouseDown={() => setPrs(true)}
          onMouseUp={() => setPrs(false)}
          style={{
            width: '100%', height: 48, background: bg,
            border: 'none', borderRadius: 4,
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px',
            color: '#FFFFFF', cursor: 'pointer',
            transition: 'background 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            flexShrink: 0,
          }}
        >
          Next → Create account
        </button>
      </div>

      <CardFooter />
    </div>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────

export interface RegisterCompanyPageProps {
  onBack: () => void;
  onNext: (officeName: string) => void;  // passes the locked office name to Create Account
  onLogoClick?: () => void;
}

export function RegisterCompanyPage({ onBack, onNext, onLogoClick }: RegisterCompanyPageProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [officeName, setOfficeName] = useState('');

  // ── Scale to fit any viewport while preserving Figma pixel dimensions ──────
  const [authScale, setAuthScale] = useState(1);
  useEffect(() => {
    function compute() {
      const sx = window.innerWidth / 780;
      const sy = window.innerHeight / 900;
      setAuthScale(Math.min(1, sx, sy));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Step 2 callback — "yes" goes to success step, "no" goes to step 3
  const handleStep2Next = (name: string) => {
    if (name === 'Headquarter Office') {
      setOfficeName('Headquarter Office');
      setStep(4);
    } else {
      setOfficeName(name);
      setStep(3);
    }
  };

  // Step 3 callback — show success before proceeding to Create Account
  const handleStep3Complete = (finalName: string) => {
    setOfficeName(finalName);
    setStep(4);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2150,
      background: 'conic-gradient(from 90deg at 50% 50%, #456A88 -49.519%, #345167 -18.346%, #243746 12.826%, #345167 31.654%, #456A88 50.481%, #345167 81.654%, #243746 112.83%)',
      overflow: 'hidden',
    }}>
      {/* Scale wrapper — inverse size + transform keeps content filling viewport */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        width: `${100 / authScale}%`,
        height: `${100 / authScale}%`,
        transform: `scale(${authScale})`,
        transformOrigin: 'top left',
      }}>
      {/* ── LEFT PANEL — 652px, identical to LoginPage / CreateAccountPage ── */}
      <div style={{
        width: 652, flexShrink: 0, height: '100%',
        paddingLeft: 86, paddingRight: 86, paddingTop: 86,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
        boxSizing: 'border-box',
      }}>
        {/* Logo — same wrapper as LoginPage / CreateAccountPage */}
        <div style={{ width: 254, height: 66, flexShrink: 0 }}>
          <div
            onClick={onLogoClick}
            style={{
              cursor: onLogoClick ? 'pointer' : 'default',
              display: 'block', width: '100%', height: '100%',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { if (onLogoClick) (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <InertiaLogo />
          </div>
        </div>

        {/* Frosted glass card — identical to LoginPage / CreateAccountPage */}
        <div style={{
          width: 480, flexShrink: 0,
          background: 'rgba(250,250,250,0)',
          borderRadius: '24px 24px 0 0',
          position: 'relative',
          overflow: 'hidden',
          height: 768,
        }}>
          {/* Glass backdrop */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(250,250,250,0.1)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'inherit',
            border: '1.111px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
          }} />
          {/* Inner flex shell */}
          <div style={{
            position: 'relative', zIndex: 1,
            height: '100%',
            display: 'flex', flexDirection: 'column',
          }}>
            {step === 1
              ? <Step1 onNext={() => setStep(2)} onBack={onBack} />
              : step === 2
                ? <Step2 onNext={handleStep2Next} onBack={() => setStep(1)} />
                : step === 3
                  ? <Step3 officeName={officeName} onComplete={handleStep3Complete} onBack={() => setStep(2)} />
                  : <StepSuccess officeName={officeName} onProceed={() => onNext(officeName)} />
            }
          </div>
        </div>
      </div>

      {/* Right side breathes */}
      <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}