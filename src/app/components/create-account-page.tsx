import React, { useState, useEffect } from 'react';
import svgPaths from '../../imports/svg-fau8wkvc2e';
import successPaths from '../../imports/svg-lzmuliejif';
import imgAvatar from 'figma:asset/6855565d8e7de372c9135a9fe9259b83bdce1ccb.png';
import InertiaLogo from '../../imports/Inertiafulllogo68';

// ─── Exactly mirrors login-page primitives ────────────────────────────────────

/** Eye icons — identical to login-page */
function EyeClosedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20.6205 14.5" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0.560547 7.25C0.560547 7.25 3.81055 0.75 10.3105 0.75C16.8105 0.75 20.0605 7.25 20.0605 7.25C20.0605 7.25 16.8105 13.75 10.3105 13.75C3.81055 13.75 0.560547 7.25 0.560547 7.25Z"
        stroke="#9CA4AE" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
      <circle cx="10.3102" cy="7.25" r="3.75" stroke="#9CA4AE" strokeLinecap="round" strokeWidth="0.9375" />
    </svg>
  );
}
function EyeOpenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="#9CA4AE" strokeWidth="1.5" />
    </svg>
  );
}

/** Criteria row — identical to login-page (white text, white/translucent circle) */
function CriteriaRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {met ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="8" fill="#00AC2B" />
          <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="white" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7.5" fill="white" stroke="rgba(255,255,255,0.3)" />
        </svg>
      )}
      {/* Inter 400 14px #FFFFFF — matching login-page CriteriaRow exactly */}
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#FFFFFF' }}>
        {label}
      </span>
    </div>
  );
}

/** Checkbox — §2.6 (unchecked white, checked #0E70CB) */
function Checkbox({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
        <rect x="1" y="1" width="16" height="16" rx="2" fill="#0E70CB" />
        <path d="M4.5 9L7.5 12L13.5 6" stroke="white" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <rect x="0.5" y="0.5" width="17" height="17" rx="2.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/** Input field — identical spec to LoginFormField in login-page
 *  border-radius 4px · height 44px · border 1.111px · white bg · Inter 400 14px */
function FormInput({
  id, label, type = 'text', placeholder = '', value, onChange, required, error,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (showPwd ? 'text' : 'password') : type;

  const hasError = !!error;
  const border = hasError ? '1.111px solid #FFA39E'
    : focused  ? '1.111px solid #91D5FF'
    : hovered  ? '1.111px solid #A8B0BB'
    : '1.111px solid #D0D5DD';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {/* Label — Inter 600 14px #FFFFFF, same as LoginFormField */}
      <label htmlFor={id} style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 14, lineHeight: '20px', letterSpacing: 0, color: '#FFFFFF',
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}>
        {label}
        {required && <span style={{ color: '#FFA39E', marginLeft: 2 }}>*</span>}
      </label>
      <div style={{
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
          id={id} type={actualType} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, height: '100%', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'Inter, sans-serif',
            fontWeight: 400, fontSize: 14, lineHeight: '20px',
            color: '#344054', paddingLeft: 16, paddingRight: isPassword ? 44 : 16,
          }}
        />
        {isPassword && (
          <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)}
            style={{
              position: 'absolute', right: 12, display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
            {showPwd ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
      {hasError && (
        <p style={{
          fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
          fontSize: 12, lineHeight: '13px', color: '#FF4D4F', margin: 0,
        }}>{error}</p>
      )}
    </div>
  );
}

/** Office dropdown — same border/height/radius as FormInput */
function OfficeDropdown({ value, onChange, error }: {
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasError = !!error;
  const border = hasError ? '1.111px solid #FFA39E'
    : open    ? '1.111px solid #91D5FF'
    : hovered ? '1.111px solid #A8B0BB'
    : '1.111px solid #D0D5DD';

  const offices = ['Head Office', 'Sydney Office', 'Melbourne Office', 'Brisbane Office', 'Perth Office'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', position: 'relative' }}>
      <label style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 14, lineHeight: '20px', letterSpacing: 0, color: '#FFFFFF',
        whiteSpace: 'nowrap',
      }}>
        Office <span style={{ color: '#FFA39E' }}>*</span>
      </label>
      <div
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: 44, background: hasError ? '#FFF1F0' : '#FFFFFF',
          border, borderRadius: 4,
          boxShadow: '0px 1px 2px 0px rgba(16,24,40,0.05)',
          display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 12,
          cursor: 'pointer', transition: 'border-color 0.15s', userSelect: 'none',
        }}
      >
        <span style={{
          flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '20px',
          color: value ? '#344054' : '#9CA4AE',
        }}>
          {value || ' '}
        </span>
        <svg width="10" height="6" viewBox="0 0 8.89453 5.1077" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d={svgPaths.p239bdd00} fill="#9EA3A9" />
        </svg>
      </div>
      {hasError && (
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '13px', color: '#FF4D4F', margin: 0 }}>
          {error}
        </p>
      )}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 300,
          background: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden',
        }}>
          {offices.map(o => (
            <div key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{
                padding: '10px 16px', fontFamily: 'Inter, sans-serif', fontWeight: 400,
                fontSize: 14, lineHeight: '20px', color: '#344054',
                cursor: 'pointer', background: value === o ? '#E6F7FF' : 'transparent',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (value !== o) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = value === o ? '#E6F7FF' : 'transparent'; }}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** OrangeBtn — pixel-for-pixel copy from login-page */
function OrangeBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  const bg = disabled ? '#FFBD9C' : prs ? '#D4380D' : hov ? '#FF773E' : '#FF4D00';
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)} onMouseUp={() => setPrs(false)}
      style={{
        width: '100%', height: 48, background: bg, border: 'none', borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
        color: '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
      {label}
    </button>
  );
}

// ─── Account Created step ─────────────────────────────────────────────────────
function AccountCreated({ onRedirect }: { onRedirect: () => void }) {
  const [seconds, setSeconds] = useState(10);
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);

  useEffect(() => {
    if (seconds <= 0) { onRedirect(); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onRedirect]);

  const progress = ((10 - seconds) / 10) * 100;
  const bg = prs ? '#D4380D' : hov ? '#FF773E' : '#FF4D00';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ━━━ FROZEN HEADER ━━━ */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ padding: '32px 40px 20px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 24, lineHeight: '32px', letterSpacing: 0,
            color: '#FFFFFF', margin: 0,
          }}>
            Account created
          </p>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
      </div>

      {/* ━━━ SCROLLABLE BODY ━━━ */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '20px 40px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>

        {/* Company row — matches Create Account company row style */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            overflow: 'hidden', position: 'relative',
            border: '1.5px solid rgba(255,255,255,0.3)',
          }}>
            <img alt="" src={imgAvatar} style={{
              position: 'absolute', height: '100%',
              left: '-18.34%', top: '1.24%',
              width: '568.75%', maxWidth: 'none',
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>Inertia Systems</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.60)',
            }}>eddie.kassaei@projectinertia.com</span>
          </div>
        </div>

        {/* Success message */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Green filled circle + checkmark — from svg-lzmuliejif pb442b00 */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d={successPaths.pb442b00} fill="#00AC2B" />
          </svg>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
          }}>
            Your account has been successfully created.
          </span>
        </div>
      </div>

      {/* ━━━ PINNED BOTTOM — progress bar + button ━━━ */}
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
            Auto-redirecting in {seconds}s…
          </span>
        </div>

        <button
          onClick={onRedirect}
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          Redirecting you now …
        </button>
      </div>

      {/* ━━━ FROZEN FOOTER ━━━ */}
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

    </div>
  );
}

// ─── Create Account Form Content ──────────────────────────────────────────────
function CreateAccountForm({ onSuccess, lockedOfficeName }: { onSuccess: () => void; lockedOfficeName?: string }) {
  const [step, setStep]                 = useState<'form' | 'success'>('form');
  const [office, setOffice]             = useState('');
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed]             = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  const criteria = {
    length:    password.length >= 10,
    uppercase: /[A-Z]/.test(password),
    number:    /[0-9]/.test(password),
    symbol:    /[^A-Za-z0-9]/.test(password),
  };
  const allMet = Object.values(criteria).every(Boolean);

  const confirmError = submitted && confirmPassword !== password
    ? 'Passwords do not match.'
    : undefined;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!lockedOfficeName && !office) return;
    if (!firstName || !password || !allMet || confirmPassword !== password || !agreed) return;
    setStep('success');
  };

  if (step === 'success') {
    return <AccountCreated onRedirect={onSuccess} />;
  }

  return (
    /* 3-zone flex column filling the full card height */
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ━━━ FROZEN HEADER ━━━ */}
      <div style={{ flexShrink: 0 }}>
        {/* Title row */}
        <div style={{ padding: '32px 40px 20px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 24, lineHeight: '32px', letterSpacing: 0,
            color: '#FFFFFF', margin: 0,
          }}>
            Create your account
          </p>
        </div>
        {/* Header separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 0 }} />
      </div>

      {/* ━━━ SCROLLABLE BODY ━━━ */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '20px 40px 20px',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {/* Company row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            overflow: 'hidden', position: 'relative',
            border: '1.5px solid rgba(255,255,255,0.3)',
          }}>
            <img
              alt=""
              src={imgAvatar}
              style={{
                position: 'absolute', height: '100%',
                left: '-18.34%', top: '1.24%',
                width: '568.75%', maxWidth: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 14, lineHeight: '20px', color: '#FFFFFF',
            }}>{`{Company Name}`}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: 13, lineHeight: '18px', color: 'rgba(255,255,255,0.60)',
            }}>eddie.kassaei@projectinertia.com</span>
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lockedOfficeName ? (
            /* Locked office — pre-filled and read-only */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
              <label style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: 14, lineHeight: '20px', letterSpacing: 0, color: '#FFFFFF',
                whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Office
                {/* Lock icon */}
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.65 }}>
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </label>
              <div style={{
                height: 44, background: 'rgba(255,255,255,0.08)',
                border: '1.111px solid rgba(255,255,255,0.20)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center',
                paddingLeft: 16, paddingRight: 16,
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 400,
                  fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.70)',
                }}>
                  {lockedOfficeName}
                </span>
              </div>
            </div>
          ) : (
            <OfficeDropdown
              value={office} onChange={setOffice}
              error={submitted && !office ? 'Office is required.' : undefined}
            />
          )}
          <FormInput id="ca-firstname" label="First Name" required value={firstName} onChange={setFirstName}
            error={submitted && !firstName ? 'First name is required.' : undefined} />
          <FormInput id="ca-lastname"  label="Last Name"            value={lastName}  onChange={setLastName} />
          <FormInput id="ca-password"  label="Password"   required type="password"    value={password}  onChange={setPassword}
            error={submitted && !password ? 'Password is required.' : undefined} />
          <FormInput id="ca-confirm"   label="Confirm Password" required type="password" value={confirmPassword} onChange={v => { setConfirmPassword(v); }}
            error={confirmError} />
        </div>

        {/* Password criteria */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: '#FFFFFF', margin: 0,
          }}>A password must include:</p>
          <CriteriaRow met={criteria.length}    label="Minimum of 10 Characters" />
          <CriteriaRow met={criteria.uppercase} label="At least one uppercase letter" />
          <CriteriaRow met={criteria.number}    label="At least one number" />
          <CriteriaRow met={criteria.symbol}    label="At least one symbol" />
        </div>

        {/* Terms & conditions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            onClick={() => setAgreed(v => !v)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ marginTop: 2 }}>
              <Checkbox checked={agreed} />
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.80)', margin: 0,
            }}>
              I agree to{' '}
              <a href="https://go.inertiasystems.com/terms-and-conditions" target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ color: '#FF773E', textDecoration: 'none' }}>
                Inertia Systems Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="https://go.inertiasystems.com/privacy-policy" target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ color: '#FF773E', textDecoration: 'none' }}>
                Privacy Policy
              </a>
            </p>
          </div>
          {/* Fixed-height reserved slot — always occupies space, never shifts layout */}
          <div style={{ height: 16, flexShrink: 0, paddingLeft: 26 }}>
            {submitted && !agreed && (
              <p style={{
                fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
                fontSize: 12, lineHeight: '16px', color: '#FF4D4F', margin: 0,
              }}>
                You must agree to the Terms and Privacy Policy to continue.
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        <OrangeBtn label="Create account" onClick={handleSubmit} />
      </div>

      {/* ━━━ FROZEN FOOTER — 24px, separator on top ━━━ */}
      <div style={{ flexShrink: 0 }}>
        {/* Footer separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
        {/* Footer bar */}
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

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE SHELL — pixel-for-pixel copy of LoginPage shell
// ═══════════════════════════════════════════════════════════════════════════════
export interface CreateAccountPageProps {
  onBack: () => void;
  onSuccess: () => void;
  onLogoClick?: () => void;
  lockedOfficeName?: string;
}

export function CreateAccountPage({ onBack, onSuccess, onLogoClick, lockedOfficeName }: CreateAccountPageProps) {
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

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2150,
      backgroundColor: '#243746',
      /* Identical gradient to LoginPage */
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
      {/* ── LEFT PANEL — 652px, identical to LoginPage ── */}
      <div style={{
        width: 652, flexShrink: 0, height: '100%',
        paddingLeft: 86, paddingRight: 86, paddingTop: 86,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
        boxSizing: 'border-box',
      }}>
        {/* Logo — same wrapper as LoginPage */}
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

        {/* Form card — IDENTICAL dimensions and frosted-glass treatment as LoginPage */}
        <div style={{
          width: 480, flexShrink: 0,
          background: 'rgba(250,250,250,0)',
          borderRadius: '24px 24px 0 0',
          position: 'relative',
          overflow: 'hidden',
          height: 768,
        }}>
          {/* Frosted glass backdrop — byte-for-byte from LoginPage */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(250,250,250,0.1)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'inherit',
            border: '1.111px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
          }} />

          {/* Inner flex shell — NOT a scroll container; scroll is managed inside the form */}
          <div style={{
            position: 'relative', zIndex: 1,
            height: '100%',
            display: 'flex', flexDirection: 'column',
          }}>
            <CreateAccountForm onSuccess={onSuccess} lockedOfficeName={lockedOfficeName} />
          </div>
        </div>
      </div>

      {/* Right side breathes — identical to LoginPage */}
      <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}