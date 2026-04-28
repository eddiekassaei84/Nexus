import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import svgPaths from '../../imports/svg-3xvz08dg8y';
import imgAvatar from 'figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png';
import { imgShutterstock6856549541 } from '../../imports/svg-slpmo';
import { ImageCropModal } from './ui/image-crop-modal';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  devModeEnabled?: boolean;
  onDevModeChange?: (enabled: boolean) => void;
  onSignOut?: () => void;
}

// ── Remove Photo confirmation modal ──────────────────────────────────────────
function RemovePhotoModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [cancelHov, setCancelHov] = useState(false);
  const [confirmHov, setConfirmHov] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 700,
        background: 'rgba(0,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#FFFFFF', borderRadius: 8, overflow: 'hidden',
          width: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Body */}
        <div style={{ padding: '28px 24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {/* Red warning icon */}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FEF3F2',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L18 17H2L10 3Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 8v4M10 14v.5" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#1D2C38', margin: '0 0 6px', lineHeight: '24px' }}>
              Remove profile photo?
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79', margin: 0, lineHeight: '18px' }}>
              Your profile photo will be removed and replaced with your initials avatar.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #C3C7CC',
          height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          padding: '0 24px', gap: 10,
        }}>
          <button
            onClick={onCancel}
            onMouseEnter={() => setCancelHov(true)}
            onMouseLeave={() => setCancelHov(false)}
            style={{
              height: 36, padding: '0 16px',
              background: cancelHov ? '#E5E7E9' : '#F2F3F4',
              border: `1px solid ${cancelHov ? '#616D79' : '#C3C7CC'}`,
              borderRadius: 4, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#616D79', transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            onMouseEnter={() => setConfirmHov(true)}
            onMouseLeave={() => setConfirmHov(false)}
            style={{
              height: 36, padding: '0 16px',
              background: confirmHov ? '#B42318' : '#D92D20',
              border: 'none', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#FFFFFF', transition: 'background 0.15s',
            }}
          >
            Remove photo
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProfileDropdown({ isOpen, onClose, anchorRef, triggerRef, devModeEnabled = false, onDevModeChange, onSignOut }: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Avatar state
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [originalAvatarSource, setOriginalAvatarSource] = useState<File | string | null>(null);
  const [avatarHovered, setAvatarHovered] = useState(false);

  // Modal state
  const [showCropModal, setShowCropModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Close on outside click — but NOT when the trigger button itself is clicked (handled by the toggle)
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      // Never close while a modal is open — they portal outside dropdownRef
      if (showCropModal || showRemoveModal) return;
      const target = e.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen, onClose, triggerRef, showCropModal, showRemoveModal]);

  // Close on Escape (but not when a modal is open)
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showCropModal && !showRemoveModal) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, showCropModal, showRemoveModal]);

  if (!isOpen) return null;

  const anchorRect = anchorRef.current?.getBoundingClientRect();
  const right = anchorRect ? window.innerWidth - anchorRect.right : 12;
  const top = (anchorRect ? anchorRect.bottom : 60) + 4;

  return ReactDOM.createPortal(
    <div>
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top,
          right,
          width: 292,
          background: '#FFFFFF',
          borderRadius: 6,
          boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Header — email ─────────────────────────────────────────────── */}
        <div style={{
          height: 48,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 21px',
          borderBottom: '1px solid #f0f0f0',
          flexShrink: 0,
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: '#434343',
            textAlign: 'center',
            margin: 0,
          }}>
            levi.ackerman@projectinertia.com
          </p>
        </div>

        {/* ── Main content — avatar + greeting + manage button ────────────── */}
        <div style={{
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 24px',
          gap: 10,
          flexShrink: 0,
        }}>
          {/* Avatar wrapper — hover triggers split Edit / Remove overlay */}
          <div
            style={{ position: 'relative', width: 71.336, height: 70.042, flexShrink: 0, cursor: 'pointer' }}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
          >
            {/* Layer 1 — Masked avatar image */}
            <div style={{
              position: 'absolute', inset: 0,
              maskImage: `url('${imgShutterstock6856549541}')`,
              WebkitMaskImage: `url('${imgShutterstock6856549541}')`,
              maskSize: '104px 104px',
              WebkitMaskSize: '104px 104px',
              maskPosition: '-17px -7.113px',
              WebkitMaskPosition: '-17px -7.113px',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              overflow: 'hidden',
            }}>
              <img
                src={profileImg ?? imgAvatar}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Layer 2 — Split hover overlay, same mask so it clips to the exact avatar shape */}
            <div style={{
              position: 'absolute', inset: 0,
              maskImage: `url('${imgShutterstock6856549541}')`,
              WebkitMaskImage: `url('${imgShutterstock6856549541}')`,
              maskSize: '104px 104px',
              WebkitMaskSize: '104px 104px',
              maskPosition: '-17px -7.113px',
              WebkitMaskPosition: '-17px -7.113px',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              display: 'flex',
              opacity: avatarHovered ? 1 : 0,
              pointerEvents: avatarHovered ? 'auto' : 'none',
              transition: 'opacity 0.15s',
            }}>
              {/* Left half — Edit */}
              <div
                onClick={() => setShowCropModal(true)}
                style={{
                  flex: 1, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.50)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.68)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.50)')}
                title="Edit photo"
              >
                {/* Pencil icon — 18×18 */}
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* 1px vertical divider */}
              <div style={{ width: 1, background: 'rgba(255,255,255,0.35)', flexShrink: 0, alignSelf: 'stretch' }} />

              {/* Right half — Remove (greyed out when no custom photo) */}
              <div
                onClick={() => profileImg && setShowRemoveModal(true)}
                style={{
                  flex: 1, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.50)',
                  cursor: profileImg ? 'pointer' : 'default',
                  opacity: profileImg ? 1 : 0.38,
                }}
                onMouseEnter={e => { if (profileImg) e.currentTarget.style.background = 'rgba(0,0,0,0.68)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.50)'; }}
                title={profileImg ? 'Remove photo' : 'No photo to remove'}
              >
                {/* Trash icon — 16×17 */}
                <svg width="16" height="17" viewBox="0 0 14.6239 16.875" fill="none">
                  <path d="M1.125 4.21875H13.5M5.625 1.125H9M2.25 4.21875L3.09375 14.625C3.09375 15.2463 3.5975 15.75 4.21875 15.75H10.4062C11.0275 15.75 11.5312 15.2463 11.5312 14.625L12.375 4.21875" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '24px',
            color: '#595959',
            textAlign: 'center',
            margin: 0,
            width: '100%',
          }}>
            Hi, Levi
          </p>

          {/* Manage account pill button */}
          <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <button
              style={{
                height: 40,
                background: '#F2F3F4',
                border: '1px solid #C3C7CC',
                borderRadius: 40,
                padding: '0 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '20px',
                color: '#616D79',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                outline: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; }}
            >
              Manage your Blade Account
            </button>
          </div>
        </div>

        {/* ── Dev Mode row ────────────────────────────────────────────────── */}
        <div style={{
          height: 48,
          background: '#FFFFFF',
          borderTop: '1px solid #C3C7CC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#616D79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="m10 9-3 3 3 3" />
              <path d="m14 15 3-3-3-3" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#616D79' }}>
              Dev Mode
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={devModeEnabled}
            onClick={() => onDevModeChange?.(!devModeEnabled)}
            style={{
              width: 42,
              height: 24,
              borderRadius: 999,
              border: 'none',
              background: devModeEnabled ? '#243746' : '#D9D9D9',
              cursor: 'pointer',
              padding: 2,
              position: 'relative',
              transition: 'background 0.18s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: devModeEnabled ? 21 : 3,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.28)',
                transition: 'left 0.18s',
              }}
            />
          </button>
        </div>

        {/* ── Sign out row ────────────────────────────────────────────────── */}
        <div style={{
          height: 48,
          background: '#FFFFFF',
          borderTop: '1px solid #C3C7CC',
          borderBottom: '1px solid #C3C7CC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              height: 32,
              padding: '0 16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 4,
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              color: '#616D79',
              outline: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            onClick={() => { onClose(); onSignOut?.(); }}
          >
            {/* Logout icon */}
            <svg
              width="16" height="16"
              viewBox="0 0 15.144 13.5"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path d={svgPaths.p3e8e4a00} stroke="#616D79" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M10.394 6.75L1.06066 6.75" stroke="#616D79" strokeWidth="1.5" />
              <path d={svgPaths.p10709800} stroke="#616D79" strokeWidth="1.5" />
            </svg>
            Sign out
          </button>
        </div>

        {/* ── Footer links ─────────────────────────────────────────────────── */}
        <div style={{
          height: 36,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '20px',
            color: '#616D79',
            outline: 'none',
          }}>
            Privacy Policy
          </button>

          {/* Dot separator */}
          <svg width="4" height="4" viewBox="0 0 2.594 2.594" fill="none" style={{ flexShrink: 0 }}>
            <path d={svgPaths.p18e1e600} fill="#616D79" />
          </svg>

          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '20px',
            color: '#616D79',
            outline: 'none',
          }}>
            Term of Service
          </button>
        </div>
      </div>

      {/* ── ImageCropModal ─────────────────────────────────────────────────── */}
      {showCropModal && (
        <ImageCropModal
          file={originalAvatarSource instanceof File ? originalAvatarSource : undefined}
          imageUrl={typeof originalAvatarSource === 'string' ? originalAvatarSource : (profileImg ?? imgAvatar)}
          targetWidth={96}
          targetHeight={96}
          label="Profile Photo"
          onSave={(dataUrl, source) => {
            setProfileImg(dataUrl);
            setOriginalAvatarSource(source);
            setShowCropModal(false);
          }}
          onClose={() => setShowCropModal(false)}
          onRemove={() => {
            setShowRemoveModal(true);
            setShowCropModal(false);
          }}
        />
      )}

      {/* ── Remove Photo confirmation ──────────────────────────────────────── */}
      {showRemoveModal && (
        <RemovePhotoModal
          onConfirm={() => {
            setProfileImg(null);
            setOriginalAvatarSource(null);
            setShowRemoveModal(false);
          }}
          onCancel={() => setShowRemoveModal(false)}
        />
      )}
    </div>,
    document.body,
  );
}