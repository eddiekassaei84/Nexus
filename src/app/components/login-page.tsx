import React, { useState, useCallback, useEffect, useRef } from 'react';
import svgPaths from '../../imports/svg-7y77rl5fbk';
import mfaPaths from '../../imports/svg-ucnr48euq5';
import InertiaLogo from '../../imports/Inertiafulllogo68';

// ─── Flow steps ──────────────────────────────────────────────────────────────
type Step = 'login' | 'forgot' | 'otp' | 'reset' | 'success' | 'method';

// ─── Auth constants ───────────────────────────────────────────────────────────
const VALID_EMAIL    = 'levi.ackerman@projectinertia.com';
const VALID_PASSWORD = 'admin';
const VALID_OTP      = '123456';

// ─── Login validation ─────────────────────────────────────────────────────────
type FieldState = 'default' | 'focus' | 'valid' | 'invalid';
interface FS { touched: boolean; error: string; fieldState: FieldState }

function validateLoginEmail(v: string) {
  if (!v.trim()) return 'Email is required.';
  if (v.trim().toLowerCase() !== VALID_EMAIL) return 'No account found for this email address.';
  return '';
}
function validateLoginPassword(v: string) {
  if (!v) return 'Password is required.';
  if (v !== VALID_PASSWORD) return 'Incorrect password.';
  return '';
}

// ─── Password criteria ────────────────────────────────────────────────────────
function pwCriteria(p: string) {
  return {
    length:    p.length >= 10,
    uppercase: /[A-Z]/.test(p),
    number:    /[0-9]/.test(p),
    symbol:    /[^A-Za-z0-9]/.test(p),
  };
}

// ─── Border helper ────────────────────────────────────────────────────────────
function borderClr(state: FieldState, focused: boolean, hovered: boolean) {
  if (state === 'invalid') return '#FFA39E'; // red3
  if (state === 'valid')   return '#B7EB8F';
  if (focused)             return '#91D5FF';
  if (hovered)             return '#A8B0BB';
  return '#D0D5DD';
}

// ─── Shared primitives ────────────────────────────────────────────────────────

/** Chevron-left back button */
function BackBtn({ onBack }: { onBack: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onBack}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width="14" height="14" viewBox="0 0 6.708 11.917" fill="none">
        <path d="M5.958 11.167L.75 5.958 5.958.75" stroke={hov ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: 14,
        lineHeight: '20px', color: hov ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}>Back</span>
    </button>
  );
}

/** Standard step header with title + description */
function StepHeader({ title, desc, titleSize = 25 }: { title: string; desc: string; titleSize?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600,
        fontSize: titleSize, lineHeight: '44px', color: '#FFFFFF', margin: 0 }}>{title}</p>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400,
        fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 374 }}>{desc}</p>
    </div>
  );
}

/** White input field used in sub-steps */
function GlassInput({
  id, label, type = 'text', placeholder, value,
  onChange, error, helperText,
}: {
  id: string; label?: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; error?: string; helperText?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (showPwd ? 'text' : 'password') : type;
  const hasError = !!error;
  const border = hasError ? '1px solid #FFA39E'
    : focused ? '1px solid #91D5FF'
    : hovered ? '1px solid #A8B0BB'
    : '1px solid #9ea2a8';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {label && (
        <label htmlFor={id} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 14, lineHeight: '20px', color: '#FFFFFF' }}>{label}</label>
      )}
      <div style={{ position: 'relative', height: 40, width: '100%',
        background: '#FFFFFF', border, borderRadius: 4,
        display: 'flex', alignItems: 'center',
        transition: 'border-color 0.15s',
        ...(hasError ? { background: 'rgba(255,107,107,0.06)' } : {}),
      }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <input id={id} type={actualType} value={value} placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, height: '100%', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'Inter, sans-serif',
            fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#1D2939',
            paddingLeft: 12, paddingRight: isPassword ? 40 : 12 }} />
        {isPassword && (
          <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)}
            style={{ position: 'absolute', right: 8, display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <svg width="20" height="14" viewBox="0 0 20.6205 14.5" fill="none">
              <path d="M0.560547 7.25C0.560547 7.25 3.81055 0.75 10.3105 0.75C16.8105 0.75 20.0605 7.25 20.0605 7.25C20.0605 7.25 16.8105 13.75 10.3105 13.75C3.81055 13.75 0.560547 7.25 0.560547 7.25Z"
                stroke="#616D79" />
              <circle cx="10.3102" cy="7.25" r="3.75" stroke="#616D79" />
            </svg>
          </button>
        )}
      </div>
      {error && <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
        fontSize: 12, lineHeight: '13px', color: '#FF4D4F', margin: 0 }}>{error}</p>}
      {!error && helperText && <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
        fontSize: 12, lineHeight: '13px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{helperText}</p>}
    </div>
  );
}

/** Orange primary button */
function OrangeBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  const bg = disabled ? '#FFBD9C' : prs ? '#D4380D' : hov ? '#FF773E' : '#FF4D00';
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)} onMouseUp={() => setPrs(false)}
      style={{ width: '100%', height: 48, background: bg, border: 'none', borderRadius: 4,
        fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
        color: '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {label}
    </button>
  );
}

/** Criteria row: empty circle (unmet) or green filled check (met) */
function CriteriaRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {met ? (
        /* Green filled circle with white checkmark */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="8" fill="#00AC2B" />
          <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="white" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        /* Empty circle */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7.5" fill="white" stroke="rgba(255,255,255,0.3)" />
        </svg>
      )}
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400,
        fontSize: 14, lineHeight: '20px', color: '#FFFFFF' }}>{label}</span>
    </div>
  );
}

// ─── Inertia Blade Wordmark ───────────────────────────────────────────────────
function InertiaWordMark() {
  return (
    <div style={{ width: 254, height: 66, flexShrink: 0 }}>
      <InertiaLogo />
    </div>
  );
}

// ─── Eye icons ────────────────────────────────────────────────────────────────
function EyeClosedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <path d={svgPaths.p2464c100} stroke="#9CA4AE" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
      <path d={svgPaths.p260e0f80} stroke="#9CA4AE" strokeLinecap="round" strokeWidth="0.9375" />
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

// ─── Google / Microsoft logos ─────────────────────────────────────────────────
function GoogleLogo() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
      <svg style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }}
        fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p135c3480} fill="#4285F4" />
        <path d={svgPaths.p270ae5c0} fill="#34A853" />
        <path d={svgPaths.p1d974000} fill="#FBBC05" />
        <path d={svgPaths.p13f49a00} fill="#EA4335" />
      </svg>
    </div>
  );
}
function MicrosoftLogo() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 22, height: 22, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', background: '#F25325', top: 0, left: 0, width: '46%', height: '46%' }} />
      <div style={{ position: 'absolute', background: '#80BC06', top: 0, left: '54%', width: '46%', height: '46%' }} />
      <div style={{ position: 'absolute', background: '#05A6F0', top: '54%', left: 0, width: '46%', height: '46%' }} />
      <div style={{ position: 'absolute', background: '#FEBA08', top: '54%', left: '54%', width: '46%', height: '46%' }} />
    </div>
  );
}
function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ width: 400, height: 47.986, flexShrink: 0,
      background: hov ? '#E8EAEC' : '#F2F4F7', borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon}
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
        lineHeight: '20px', color: '#344054', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

// ─── Login field ──────────────────────────────────────────────────────────────
function LoginFormField({ id, label, type = 'text', placeholder, helperText, value, state, onChange, onBlur, onFocus }: {
  id: string; label: string; type?: 'email' | 'password' | 'text';
  placeholder?: string; helperText?: string; value: string; state: FS;
  onChange: (v: string) => void; onBlur: () => void; onFocus: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (showPwd ? 'text' : 'password') : type;
  const bc = borderClr(state.fieldState, focused, hovered);
  const showError = state.fieldState === 'invalid' && !!state.error;

  return (
    <div style={{ position: 'relative', width: 400, height: 90.99, flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 400, height: 20 }}>
        <label htmlFor={id} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
          lineHeight: '20px', letterSpacing: 0, color: '#FFFFFF', cursor: 'pointer', whiteSpace: 'nowrap' }}>{label}</label>
      </div>
      <div style={{ position: 'absolute', top: 25, left: 0, width: 400, height: 43.993,
        background: '#FFFFFF', border: `1.111px solid ${bc}`, borderRadius: 4,
        boxShadow: '0px 1px 2px 0px rgba(16,24,40,0.05)',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        transition: 'border-color 0.15s, background 0.15s',
        ...(state.fieldState === 'invalid' ? { background: '#FFF1F0' } : {}) }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <input id={id} type={actualType} value={value} placeholder={placeholder}
          autoComplete={isPassword ? 'current-password' : 'email'}
          onChange={e => onChange(e.target.value)}
          onFocus={() => { setFocused(true); onFocus(); }}
          onBlur={() => { setFocused(false); onBlur(); }}
          style={{ flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
            color: '#344054', paddingLeft: 16, paddingRight: isPassword ? 40 : 16 }} />
        {isPassword && (
          <button type="button" tabIndex={-1} onClick={() => setShowPwd(v => !v)}
            style={{ position: 'absolute', right: 12, display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {showPwd ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
      <div style={{ position: 'absolute', top: 73.99, left: 0, width: 400 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
          letterSpacing: 0, color: showError ? '#FF4D4F' : '#667085', margin: 0, whiteSpace: 'nowrap' }}>
          {showError ? state.error : helperText}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Step 1: Forgot Password ───────────────────────────────────────────────────
function ForgotStep({ onBack, onNext, initialEmail = '' }: { onBack: () => void; onNext: (email: string) => void; initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!email.trim()) { setError('Email is required.'); return; }
    if (email.trim().toLowerCase() !== VALID_EMAIL) { setError('No account found for this email.'); return; }
    onNext(email.trim());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Zone 1: Frozen header ── */}
      <div style={{ flexShrink: 0, padding: '48px 40px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onBack={onBack} />
          <StepHeader
            title="Forgot Your Password?"
            titleSize={25}
            desc="Enter the email address linked to your account, and we'll send you a link to reset your password."
          />
        </div>
      </div>

      {/* ── Zone 2: Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '24px 40px 0',
      }}>
        <GlassInput id="fp-email" label="Email" type="email"
          placeholder="info@gmail.com" value={email}
          onChange={v => { setEmail(v); setError(''); }} error={error} />
      </div>

      {/* ── Zone 3: Pinned CTA ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px 48px' }}>
        <OrangeBtn label="Send Reset Link" onClick={handleSend} />
      </div>
    </div>
  );
}

// ── Step 2: OTP ───────────────────────────────────────────────────────────────
function OtpStep({ onBack, onNext, onTryAnotherMethod }: { onBack: () => void; onNext: () => void; onTryAnotherMethod: () => void }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  // Code expiry: 10 minutes
  const [expirySeconds, setExpirySeconds] = useState(600);
  // Resend cooldown: 10 seconds before Resend is first allowed
  const [resendCooldown, setResendCooldown] = useState(10);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Code expiry countdown (10 min)
  useEffect(() => {
    if (expirySeconds <= 0) return;
    const t = setTimeout(() => setExpirySeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [expirySeconds]);

  // Resend cooldown countdown (10 sec)
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const fmtExpiry = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const focusBox = (i: number) => inputRefs.current[i]?.focus();

  const handleDigit = (i: number, v: string) => {
    const ch = v.replace(/\D/g, '').slice(-1);
    setDigits(prev => { const next = [...prev]; next[i] = ch; return next; });
    setError('');
    if (ch && i < 5) focusBox(i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        setDigits(prev => { const next = [...prev]; next[i] = ''; return next; });
      } else if (i > 0) {
        focusBox(i - 1);
        setDigits(prev => { const next = [...prev]; next[i - 1] = ''; return next; });
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && i > 0) {
      focusBox(i - 1);
    } else if (e.key === 'ArrowRight' && i < 5) {
      focusBox(i + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length) {
      const next = Array(6).fill('');
      text.split('').forEach((c, i) => { next[i] = c; });
      setDigits(next);
      focusBox(Math.min(text.length, 5));
    }
    e.preventDefault();
  };

  const handleNext = () => {
    const code = digits.join('');
    if (expirySeconds <= 0) { setError('Code has expired. Please request a new one.'); return; }
    if (code.length < 6) { setError('Please enter all 6 digits.'); return; }
    if (code !== VALID_OTP) { setError('Incorrect code. Please try again.'); return; }
    onNext();
  };

  const canResend = resendCooldown === 0;

  const handleResend = () => {
    if (!canResend) return;
    setExpirySeconds(600);    // reset 10-min expiry
    setResendCooldown(10);    // restart 10-sec cooldown
    setDigits(['', '', '', '', '', '']);
    setError('');
    setResent(true);
    focusBox(0);
    setTimeout(() => setResent(false), 3000);
  };

  const BOX = 58;
  const GAP = 10;

  const bodySmall: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
  };
  const linkStyle: React.CSSProperties = {
    ...bodySmall, fontWeight: 500, color: '#BAE7FF',
    cursor: 'pointer', background: 'none', border: 'none', padding: 0,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Zone 1: Frozen header ── */}
      <div style={{ flexShrink: 0, padding: '48px 40px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onBack={onBack} />
          <StepHeader
            title="Reset Your Password"
            titleSize={25}
            desc="A verification code has been sent to your email. Please enter it in the field below."
          />
        </div>
      </div>

      {/* ── Zone 2: Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '24px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* OTP boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
            lineHeight: '20px', color: '#FFFFFF', margin: 0 }}>
            Type your 6 digits security code
          </p>

          <div style={{ display: 'flex', gap: GAP }} onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="text" inputMode="numeric" value={d} maxLength={1}
                onChange={e => handleDigit(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onFocus={e => { e.currentTarget.style.borderColor = '#BAE7FF'; }}
                onBlur={e => { e.currentTarget.style.borderColor = error ? '#FFA39E' : '#D0D5DD'; }}
                style={{
                  width: BOX, height: BOX, flexShrink: 0, textAlign: 'center',
                  background: error ? '#FFF1F0' : '#FFFFFF',
                  border: `1.5px solid ${error ? '#FFA39E' : '#D0D5DD'}`,
                  borderRadius: 4,
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22, lineHeight: '1',
                  color: '#1D2939', outline: 'none',
                  boxShadow: '0px 1px 2px rgba(16,24,40,0.05)',
                  caretColor: '#FF4D00', transition: 'border-color 0.15s',
                }}
              />
            ))}
          </div>

          {/* Reserved fixed-height slot — always occupies space, never shifts layout */}
          <div style={{ height: 16, flexShrink: 0 }}>
            {error && (
              <p style={{ ...bodySmall, fontSize: 12, lineHeight: '16px',
                color: '#FF4D4F', margin: 0 }}>{error}</p>
            )}
            {!error && resent && (
              <p style={{ ...bodySmall, fontSize: 12, lineHeight: '16px', color: '#52C41A', margin: 0 }}>
                Code resent successfully.
              </p>
            )}
          </div>
        </div>

        {/* Bottom rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Row 1: "Didn't get the code?" + [10s countdown] Resend | expiry timer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ ...bodySmall, color: 'rgba(255,255,255,0.7)' }}>
                Didn't get the code?
              </span>
              {!canResend && (
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                  lineHeight: '20px', color: '#FF773E',
                  minWidth: 22, display: 'inline-block', textAlign: 'right',
                }}>
                  {resendCooldown}s
                </span>
              )}
              <button
                onClick={handleResend}
                style={{
                  ...linkStyle,
                  color: canResend ? '#BAE7FF' : 'rgba(186,231,255,0.35)',
                  cursor: canResend ? 'pointer' : 'default',
                }}>
                Resend
              </button>
            </div>
            <span style={{
              ...bodySmall, fontWeight: 500,
              color: expirySeconds > 0 ? '#FF773E' : 'rgba(255,100,100,0.8)',
            }}>
              {expirySeconds > 0 ? fmtExpiry(expirySeconds) : 'Expired'}
            </span>
          </div>

          {/* Row 2: "Having trouble? Try another method" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ ...bodySmall, color: 'rgba(255,255,255,0.7)' }}>Having trouble?</span>
            <button style={{ ...linkStyle }} onClick={onTryAnotherMethod}>Try another method</button>
          </div>
        </div>
      </div>

      {/* ── Zone 3: Pinned CTA ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px 48px' }}>
        <OrangeBtn label="Next" onClick={handleNext} />
      </div>
    </div>
  );
}

// ── Step 3: Reset Password ────────────────────────────────────────────────────
function ResetStep({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [newPw, setNewPw]       = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const criteria = pwCriteria(newPw);
  const allMet = criteria.length && criteria.uppercase && criteria.number && criteria.symbol;

  const handleReset = () => {
    setSubmitted(true);
    if (!allMet) return;
    if (newPw !== confirmPw) { setConfirmError('Passwords must match.'); return; }
    onSuccess();
  };

  const handleConfirmChange = (v: string) => {
    setConfirmPw(v);
    if (confirmError) setConfirmError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Zone 1: Frozen header ── */}
      <div style={{ flexShrink: 0, padding: '48px 40px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onBack={onBack} />
          <StepHeader
            title="Reset Your Password"
            titleSize={25}
            desc="Choose a strong new password for your account."
          />
        </div>
      </div>

      {/* ── Zone 2: Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '24px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <GlassInput id="rp-new" label="New password" type="password"
            placeholder="" value={newPw} onChange={setNewPw}
            error={submitted && !allMet ? 'Please meet all password requirements.' : undefined} />
          <div style={{ marginTop: 4 }}>
            <GlassInput id="rp-confirm" label="Confirm password" type="password"
              placeholder="" value={confirmPw} onChange={handleConfirmChange}
              error={confirmError || undefined} />
          </div>
        </div>

        {/* Password criteria */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
            lineHeight: '20px', color: '#FFFFFF', margin: 0 }}>A password must include:</p>
          <CriteriaRow met={criteria.length}    label="Minimum of 10 Characters" />
          <CriteriaRow met={criteria.uppercase} label="At least one uppercase letter" />
          <CriteriaRow met={criteria.number}    label="At least one number" />
          <CriteriaRow met={criteria.symbol}    label="At least one symbol" />
        </div>
      </div>

      {/* ── Zone 3: Pinned CTA ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px 48px' }}>
        <OrangeBtn label="Reset password" onClick={handleReset} />
      </div>
    </div>
  );
}

// ── Step 4: Success ───────────────────────────────────────────────────────────
function SuccessStep({ email, onContinue }: { email: string; onContinue: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Zone 2: Centred body (flex: 1) ── */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '48px 40px 0',
        gap: 24,
      }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600,
          fontSize: 25, lineHeight: '44px', color: '#FFFFFF', margin: 0 }}>Password Reset</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{email}</p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 374 }}>
            Your password has been updated. You can now sign in using your new password.
          </p>
        </div>
      </div>

      {/* ── Zone 3: Pinned CTA ── */}
      <div style={{ flexShrink: 0, padding: '24px 40px 48px' }}>
        <OrangeBtn label="Continue to login" onClick={onContinue} />
      </div>
    </div>
  );
}

// ── Step MFA: Verification Method ─────────────────────────────────────────────
interface MfaMethod {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function MfaMethodBtn({ icon, label, description, onClick }: {
  icon: React.ReactNode; label: string; description: string; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setPrs(false); }}
        onMouseDown={() => setPrs(true)}
        onMouseUp={() => setPrs(false)}
        style={{
          width: '100%', height: 48,
          background: prs
            ? 'rgba(255,255,255,0.22)'
            : hov
            ? 'rgba(255,255,255,0.16)'
            : 'rgba(255,255,255,0.08)',
          border: `1px solid ${prs ? 'rgba(255,255,255,0.45)' : hov ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.20)'}`,
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s',
          padding: '0 16px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', opacity: prs ? 1 : hov ? 0.95 : 0.85 }}>
          {icon}
        </span>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
          color: '#FFFFFF', whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      </button>
      <p style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: 13, lineHeight: '18px',
        color: 'rgba(255,255,255,0.50)', margin: 0, paddingLeft: 2,
      }}>
        {description}
      </p>
    </div>
  );
}

function VerificationMethodStep({ onBack, onSelectMethod }: {
  onBack: () => void;
  onSelectMethod: () => void;
}) {
  const iconColor = 'rgba(255,255,255,0.85)';

  const EmailIcon = (
    <svg width="22" height="16" viewBox="0 0 21.5 15.5" fill="none">
      <rect x="0.75" y="0.75" width="20" height="14" rx="1"
        stroke={iconColor} strokeWidth="1.5" />
      <path d={mfaPaths.p17dd0000} stroke={iconColor} strokeWidth="1.5" />
    </svg>
  );

  const ShieldIcon = (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d={mfaPaths.p15942c00}
        stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );

  const PhoneIcon = (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
      <path d={mfaPaths.p2cd09580}
        stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M8 18H8.01" stroke={iconColor} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );

  const KeyIcon = (
    <svg width="18" height="18" viewBox="0 0 17.4111 17.4111" fill="none">
      <path d={mfaPaths.p2a64bb00} fill={iconColor} />
    </svg>
  );

  const methods = [
    { id: 'email',         icon: EmailIcon,  label: 'Email code',            description: 'Send a new code to your work email' },
    { id: 'authenticator', icon: ShieldIcon,  label: 'Authenticator app',     description: 'Use your authenticator app to generate a code' },
    { id: 'sms',           icon: PhoneIcon,   label: 'SMS code (if enabled)', description: 'Send a text message to your phone' },
    { id: 'securitykey',   icon: KeyIcon,     label: 'Security key',          description: 'Use a hardware security key' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Zone 1: Frozen header ── */}
      <div style={{ flexShrink: 0, padding: '48px 40px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onBack={onBack} />
          <StepHeader
            title="Verification method"
            titleSize={25}
            desc={"We sent a 6-digit verification code to your work email.\nEnter the code below to continue."}
          />
        </div>
      </div>

      {/* ── Zone 2: Scrollable body ── */}
      <div style={{
        flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        scrollbarWidth: 'none',
        padding: '28px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {methods.map(m => (
          <MfaMethodBtn
            key={m.id}
            icon={m.icon}
            label={m.label}
            description={m.description}
            onClick={onSelectMethod}
          />
        ))}
      </div>

      {/* ── Zone 3: bottom spacer (no CTA — selection IS the action) ── */}
      <div style={{ flexShrink: 0, height: 48 }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN LOGIN FORM (step: login)
// ═══════════════════════════════════════════════════════════════════════════════
function LoginStep({ onForgot, onLogin, onSignUp, onEmailChange: notifyEmailChange, initialEmail }: {
  onForgot: () => void;
  onLogin: () => void;
  onSignUp: () => void;
  onEmailChange: (email: string) => void;
  initialEmail: string;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [emailSt, setEmailSt] = useState<FS>({ touched: false, error: '', fieldState: 'default' });
  const [pwSt,    setPwSt]    = useState<FS>({ touched: false, error: '', fieldState: 'default' });
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (v: string) => {
    setEmail(v);
    notifyEmailChange(v);
    if (emailSt.fieldState === 'invalid') setEmailSt(s => ({ ...s, error: '', fieldState: 'default' }));
  };
  const onEmailFocus = () => setEmailSt(s => ({ ...s, fieldState: s.fieldState === 'valid' || s.fieldState === 'invalid' ? s.fieldState : 'focus' }));
  const onEmailBlur  = () => {
    if (!email && !emailSt.touched) { setEmailSt({ touched: true, error: '', fieldState: 'default' }); return; }
    const err = validateLoginEmail(email);
    setEmailSt({ touched: true, error: err, fieldState: err ? 'invalid' : email ? 'valid' : 'default' });
  };
  const onPwChange = (v: string) => {
    setPassword(v);
    if (pwSt.fieldState === 'invalid') setPwSt(s => ({ ...s, error: '', fieldState: 'default' }));
  };
  const onPwFocus = () => setPwSt(s => ({ ...s, fieldState: s.fieldState === 'valid' || s.fieldState === 'invalid' ? s.fieldState : 'focus' }));
  const onPwBlur  = () => {
    if (!password && !pwSt.touched) { setPwSt({ touched: true, error: '', fieldState: 'default' }); return; }
    const err = validateLoginPassword(password);
    setPwSt({ touched: true, error: err, fieldState: err ? 'invalid' : password ? 'valid' : 'default' });
  };

  const handleLogin = useCallback(() => {
    const eErr = validateLoginEmail(email);
    const pErr = validateLoginPassword(password);
    setEmailSt({ touched: true, error: eErr, fieldState: eErr ? 'invalid' : email ? 'valid' : 'default' });
    setPwSt   ({ touched: true, error: pErr, fieldState: pErr ? 'invalid' : password ? 'valid' : 'default' });
    if (eErr || pErr) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onLogin(); }, 800);
  }, [email, password, onLogin]);

  return (
    <>
      {/* Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 480,
        paddingTop: 40, paddingLeft: 40, paddingRight: 40, boxSizing: 'border-box' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 24, lineHeight: '32px', letterSpacing: 0,
          color: '#FFFFFF', margin: 0, whiteSpace: 'nowrap' }}>Log In to your Account</p>
      </div>

      {/* Fields */}
      <div style={{ position: 'absolute', top: 106.53, left: 0, width: 480,
        paddingLeft: 40, paddingTop: 20.99, display: 'flex', flexDirection: 'column', gap: 15.99 }}>
        <LoginFormField id="email" label="Email" type="email"
          placeholder="Enter your email"
          value={email} state={emailSt}
          onChange={handleEmailChange} onFocus={onEmailFocus} onBlur={onEmailBlur} />
        <LoginFormField id="password" label="Password" type="password"
          placeholder="Enter your password"
          value={password} state={pwSt}
          onChange={onPwChange} onFocus={onPwFocus} onBlur={onPwBlur} />
      </div>

      {/* Remember + Forgot */}
      <div style={{ position: 'absolute', top: 325.49, left: 0, width: 480, height: 51.979,
        paddingLeft: 40, paddingRight: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setRemember(v => !v)}>
          <div style={{ width: 40, height: 20, borderRadius: 36.5, flexShrink: 0,
            background: remember ? '#FF4D00' : '#F2F2F2',
            border: remember ? 'none' : '0.5px solid #E5E5E5',
            position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: remember ? 22 : 2, width: 16, height: 16, borderRadius: '50%',
              background: 'white', boxShadow: '1px 1px 2px 0px rgba(51,51,51,0.3)', transition: 'left 0.2s' }} />
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
            lineHeight: '20px', color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>Remember me</span>
        </div>
        <button onClick={onForgot}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
            lineHeight: '20px', color: '#FF773E', whiteSpace: 'nowrap' }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
          Forgot username/password?
        </button>
      </div>

      {/* LOGIN button */}
      <button onClick={handleLogin} disabled={submitting}
        style={{ position: 'absolute', top: 377.46, left: 40, width: 400, height: 47.986,
          background: submitting ? '#FFBD9C' : '#FF4D00',
          border: 'none', borderRadius: 4,
          fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
          color: '#FFFFFF', cursor: submitting ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'background 0.15s' }}
        onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
        onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}
        onMouseDown={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = '#D4380D'; }}
        onMouseUp={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}>
        {submitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              style={{ animation: 'loginSpin 0.8s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Signing in…
          </>
        ) : 'Login'}
      </button>

      {/* Or divider */}
      <div style={{ position: 'absolute', top: 437.45, left: 0, width: 480, height: 31.181,
        paddingLeft: 40, paddingRight: 40,
        display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ flex: 1, height: 0.99, background: 'rgba(255,255,255,0.18)' }} />
        <div style={{ padding: '0 16px', fontFamily: "'Zen Kaku Gothic Antique', sans-serif",
          fontWeight: 700, fontSize: 12.8, lineHeight: '19.2px',
          color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>Or</div>
        <div style={{ flex: 1, height: 0.99, background: 'rgba(255,255,255,0.18)' }} />
      </div>

      {/* Social buttons */}
      <div style={{ position: 'absolute', top: 468.63, left: 0, width: 480,
        paddingLeft: 40, paddingTop: 40, paddingBottom: 40,
        display: 'flex', flexDirection: 'column', gap: 11.997, boxSizing: 'border-box' }}>
        <SocialButton icon={<MicrosoftLogo />} label="Login with Microsoft" />
        <SocialButton icon={<GoogleLogo />} label="Login with Google" />
      </div>

      {/* New User */}
      <div style={{ position: 'absolute', top: 669.6, left: 0, width: 480, height: 38,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.7)' }}>New User?</span>
        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
          lineHeight: '20px', color: '#FF773E', textDecoration: 'underline' }} onClick={onSignUp}>SIGN UP HERE</button>
      </div>

      {/* Legal */}
      <div style={{ position: 'absolute', top: 707.6, left: 0, width: 480,
        paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'column', gap: 2, boxSizing: 'border-box' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12,
          lineHeight: '16px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
          By using Inertia, you agree to our{' '}
          <a href="https://go.inertiasystems.com/terms-and-conditions" target="_blank" rel="noopener noreferrer"
            style={{ color: '#FF773E', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>Terms and Conditions</a>
          {' '}and{' '}
          <a href="https://go.inertiasystems.com/privacy-policy" target="_blank" rel="noopener noreferrer"
            style={{ color: '#FF773E', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>Privacy Policy</a>
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12,
          lineHeight: '16px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: 0 }}>
          ©2025 Inertia Systems, Inc. All Rights Reserved
        </p>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export interface LoginPageProps { onLogin: () => void; onSignUp?: () => void; onLogoClick?: () => void; }

export function LoginPage({ onLogin, onSignUp, onLogoClick }: LoginPageProps) {
  const [step, setStep] = useState<Step>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  // ── Scale to fit any viewport while preserving Figma pixel dimensions ──────
  const [authScale, setAuthScale] = useState(1);
  useEffect(() => {
    function compute() {
      const sx = window.innerWidth / 780;   // 652px panel + 128px breathing room
      const sy = window.innerHeight / 900;  // 86px top + 66px logo + 24px gap + 724px card visible
      setAuthScale(Math.min(1, sx, sy));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Form card height adapts per step
  const isLogin = step === 'login';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      backgroundColor: '#243746',
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
      {/* ── LEFT PANEL — 652px, 86px padding each side → 480px inner ── */}
      <div style={{
        width: 652, flexShrink: 0, height: '100%',
        paddingLeft: 86, paddingRight: 86, paddingTop: 86,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
        boxSizing: 'border-box',
      }}>
        {/* Logo */}
        <div style={{ width: 254, height: 66, flexShrink: 0 }}>
          <div
            onClick={onLogoClick}
            style={{ cursor: onLogoClick ? 'pointer' : 'default', display: 'block', width: '100%', height: '100%', transition: 'opacity 0.15s' }}
            onMouseEnter={e => { if (onLogoClick) (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <InertiaWordMark />
          </div>
        </div>

        {/* Form card */}
        <div style={{
          width: 480, flexShrink: 0,
          background: 'rgba(250,250,250,0)',
          borderRadius: '24px 24px 0 0',
          position: 'relative',
          overflow: 'hidden',
          height: 768,
        }}>
          {/* Frosted glass backdrop */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(250,250,250,0.1)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'inherit',
            border: '1.111px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
          }} />

          {/* Step content */}
          <div style={{ position: 'relative', zIndex: 1, height: '100%', overflow: 'hidden' }}>
            {step === 'login' && (
              <LoginStep
                onForgot={() => { setForgotEmail(loginEmail); setStep('forgot'); }}
                onLogin={onLogin}
                onSignUp={onSignUp ?? (() => {})}
                onEmailChange={setLoginEmail}
                initialEmail={loginEmail}
              />
            )}
            {step === 'forgot' && (
              <ForgotStep
                onBack={() => setStep('login')}
                onNext={email => { setForgotEmail(email); setStep('otp'); }}
                initialEmail={forgotEmail}
              />
            )}
            {step === 'otp' && (
              <OtpStep
                onBack={() => setStep('forgot')}
                onNext={() => setStep('reset')}
                onTryAnotherMethod={() => setStep('method')}
              />
            )}
            {step === 'reset' && (
              <ResetStep
                onBack={() => setStep('otp')}
                onSuccess={() => setStep('success')}
              />
            )}
            {step === 'success' && (
              <SuccessStep
                email={forgotEmail}
                onContinue={() => setStep('login')}
              />
            )}
            {step === 'method' && (
              <VerificationMethodStep
                onBack={() => setStep('otp')}
                onSelectMethod={() => setStep('otp')}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right side breathes */}
      <div style={{ flex: 1 }} />

      <style>{`@keyframes loginSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}