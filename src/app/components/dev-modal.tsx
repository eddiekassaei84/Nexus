import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export interface DevModalProps {
  onClose: () => void;
  onYes: () => void;  // company recognised → Create Account
  onNo: () => void;   // company not recognised → Register Company
}

export function DevModal({ onClose, onYes, onNo }: DevModalProps) {
  const [selection, setSelection] = useState<'yes' | 'no' | null>(null);
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [pressNext, setPressNext] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setSubmitted(true);
    if (!selection) return;
    selection === 'yes' ? onYes() : onNo();
  };

  const modal = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: 520,
          background: '#FFFFFF',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ── MODAL HEADER (§10.3) ── */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
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
              For Inertia Developers Only
            </p>
            <button
              onClick={onClose}
              onMouseEnter={() => setHoverClose(true)}
              onMouseLeave={() => setHoverClose(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: hoverClose ? '#F5F6F7' : 'none',
                border: 'none', cursor: 'pointer',
                borderRadius: 40, transition: 'background-color 0.15s', padding: 8,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Question */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '20px',
            color: '#384857',
            margin: 0,
          }}>
            Does Inertia have the ability to recognize the company from the user's email domain?
          </p>

          {/* Radio options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RadioOption
              id="dev-yes"
              label="Yes"
              checked={selection === 'yes'}
              onChange={() => setSelection('yes')}
            />
            <RadioOption
              id="dev-no"
              label="No"
              checked={selection === 'no'}
              onChange={() => setSelection('no')}
            />
          </div>

          {/* Validation hint */}
          <div style={{ height: 16 }}>
            {submitted && !selection && (
              <p style={{
                fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
                fontSize: 12, lineHeight: '16px', color: '#FF4D4F', margin: 0,
              }}>
                Please select an option to continue.
              </p>
            )}
          </div>
        </div>

        {/* ── FOOTER (§10.4) ── */}
        <div style={{
          height: 72,
          borderTop: '1px solid #C3C7CC',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingLeft: 28, paddingRight: 28, gap: 10,
        }}>
          {/* Cancel */}
          <SecondaryBtn label="Cancel" onClick={onClose} />
          {/* Next */}
          <button
            onClick={handleNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => { setHoverNext(false); setPressNext(false); }}
            onMouseDown={() => setPressNext(true)}
            onMouseUp={() => setPressNext(false)}
            style={{
              height: 36,
              padding: '0 16px',
              background: pressNext ? '#D4380D' : hoverNext ? '#FF773E' : '#FF4D00',
              border: 'none',
              borderRadius: 4,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

// ── Radio option ─────────────────────────────────────────────────────────────
function RadioOption({ id, label, checked, onChange }: {
  id: string; label: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        cursor: 'pointer', userSelect: 'none',
      }}
    >
      {/* Custom radio */}
      <div style={{ position: 'relative', width: 18, height: 18, flexShrink: 0 }}>
        <input
          id={id} type="radio" checked={checked} onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', margin: 0 }}
        />
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          border: checked ? '2px solid #0E70CB' : '2px solid #D0D5DD',
          background: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.15s',
          boxSizing: 'border-box',
        }}>
          {checked && (
            <div style={{
              width: 9, height: 9, borderRadius: '50%',
              background: '#0E70CB',
            }} />
          )}
        </div>
      </div>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: checked ? 500 : 400,
        fontSize: 14,
        lineHeight: '20px',
        color: '#344054',
      }}>
        {label}
      </span>
    </label>
  );
}

// ── Secondary button (§15.2 Medium) ─────────────────────────────────────────
function SecondaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)}
      onMouseUp={() => setPrs(false)}
      style={{
        height: 36,
        padding: '0 16px',
        background: prs ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4',
        border: `1px solid ${prs ? '#616D79' : hov ? '#616D79' : '#C3C7CC'}`,
        borderRadius: 4,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '20px',
        color: prs ? '#FFFFFF' : '#616D79',
        cursor: 'pointer',
        transition: 'background 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}
