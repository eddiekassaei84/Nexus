import React, { useState } from 'react';
import svgPaths from '../../imports/svg-txwbaoaydt';
import emailLogoSvg from '../../imports/svg-g0altvvnbk';

// ─── Gmail-chrome colours ─────────────────────────────────────────────────────
const C = {
  gmailBg: '#f6f8fc',
  sidebar: '#f6f8fc',
  sidebarActive: '#d3e3fd',
  sidebarText: '#202124',
  sidebarTextBold: '#001d35',
  emailBg: '#ffffff',
  emailBorder: '#e0e0e0',
  headerBg: '#ffffff',
  navyEmail: '#243746',
};

// ─── Gmail left-sidebar nav item ─────────────────────────────────────────────
function SidebarItem({
  icon, label, badge, active, bold,
}: {
  icon: React.ReactNode; label: string; badge?: string | number; active?: boolean; bold?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', height: 32, borderRadius: 16,
        paddingLeft: 12, paddingRight: 12, gap: 14, cursor: 'pointer',
        background: active ? C.sidebarActive : 'transparent',
        fontFamily: "'Google Sans', Roboto, sans-serif",
        fontSize: 14,
        fontWeight: bold || active ? 700 : 400,
        color: active ? C.sidebarTextBold : C.sidebarText,
        userSelect: 'none',
      }}
    >
      <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {badge !== undefined && (
        <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: bold || active ? 700 : 400, fontSize: active ? 12 : 11, color: active ? C.sidebarTextBold : '#5f6368' }}>
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── Minimal SVG icons matching Gmail style ───────────────────────────────────
function IconInbox() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z" fill="currentColor" />
      <path d="M1 13h4l1.5 2h7L15 13h4v4a1 1 0 01-1 1H2a1 1 0 01-1-1v-4z" fill="currentColor" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21 2 7.31l5.53-.8L10 1.5z" stroke="#5f6368" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}
function IconSnooze() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <circle cx="10" cy="10" r="8" stroke="#5f6368" strokeWidth="1.2"/>
      <path d="M10 5v5l3 3" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function IconSent() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M2 10l16-7-7 16-2-6-7-3z" stroke="#5f6368" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}
function IconDrafts() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <rect x="3" y="4" width="14" height="12" rx="1" stroke="#5f6368" strokeWidth="1.2"/>
      <path d="M3 7l7 5 7-5" stroke="#5f6368" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}
function IconMore() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M10 4v1M10 10v1M10 16v1" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconLabel() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M17 10l-7-7H3v7l7 7 7-7z" stroke="#5f6368" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Gmail top-bar search ─────────────────────────────────────────────────────
function GmailTopBar({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      height: 64, background: C.headerBg, display: 'flex', alignItems: 'center',
      paddingLeft: 16, paddingRight: 16, gap: 8, borderBottom: '1px solid #e0e0e0',
      flexShrink: 0,
    }}>
      {/* Hamburger */}
      <button style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={svgPaths.p1d821780} fill="#444746" />
        </svg>
      </button>

      {/* Gmail logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginRight: 8, width: 80, flexShrink: 0 }}>
        <svg width="40" height="30" viewBox="0 0 75 55">
          <path d="M5 5h65L40 30 5 5z" fill="#EA4335"/>
          <path d="M5 5L5 50" stroke="#C5221F" strokeWidth="7"/>
          <path d="M70 5L70 50" stroke="#1A73E8" strokeWidth="7"/>
          <path d="M5 5L40 30L75 5" fill="none" stroke="#FBBC04" strokeWidth="0"/>
          <path d="M5 50h65" fill="none"/>
          <rect x="1.5" y="5" width="7" height="45" rx="4" fill="#C5221F"/>
          <rect x="66.5" y="5" width="7" height="45" rx="4" fill="#1A73E8"/>
          <path d="M5 5L40 32 75 5V50H5V5z" fill="none"/>
        </svg>
        <span style={{ fontFamily: "'Google Sans', Roboto, sans-serif", fontWeight: 400, fontSize: 22, color: '#5f6368', letterSpacing: '-0.5px' }}>Gmail</span>
      </div>

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: 720, height: 46, background: '#eaf1fb', borderRadius: 24,
        display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 8, gap: 12,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="6" stroke="#444746" strokeWidth="1.5"/>
          <path d="M13 13l4 4" stroke="#444746" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ flex: 1, fontFamily: 'Roboto, sans-serif', fontSize: 16, color: '#202124', lineHeight: '20px' }}>Search mail</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={svgPaths.p36e9ca00} fill="#444746" />
        </svg>
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
        {/* Question */}
        <button style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9.5" stroke="#5f6368" strokeWidth="1.2"/>
            <path d={svgPaths.pe593d70} fill="none" stroke="#5f6368" strokeWidth="1.1"/>
          </svg>
        </button>
        {/* Settings */}
        <button style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d={svgPaths.p866b800} fill="#5f6368" />
          </svg>
        </button>
        {/* Apps grid */}
        <button style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d={svgPaths.p5d97a80} fill="#5f6368" />
          </svg>
        </button>
        {/* Avatar */}
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 4 }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: 14, color: '#fff' }}>Z</span>
        </div>
      </div>
    </div>
  );
}

// ─── Gmail left sidebar ───────────────────────────────────────────────────────
function GmailSidebar() {
  return (
    <div style={{
      width: 256, flexShrink: 0, background: C.sidebar,
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
      paddingTop: 8,
    }}>
      {/* Compose button */}
      <div style={{ paddingLeft: 8, paddingRight: 8, marginBottom: 16 }}>
        <div style={{
          height: 56, background: '#c2e7ff', borderRadius: 16,
          display: 'flex', alignItems: 'center', paddingLeft: 18, gap: 12,
          cursor: 'pointer',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#001d35"/>
          </svg>
          <span style={{ fontFamily: "'Google Sans', Roboto, sans-serif", fontWeight: 500, fontSize: 14, color: '#001d35' }}>Compose</span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SidebarItem icon={<IconInbox />} label="Inbox" badge="2,998" active bold />
        <SidebarItem icon={<IconStar />} label="Starred" />
        <SidebarItem icon={<IconSnooze />} label="Snoozed" />
        <SidebarItem icon={<IconSent />} label="Sent" />
        <SidebarItem icon={<IconDrafts />} label="Drafts" badge={13} bold />
        <SidebarItem icon={<svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M3 5h14M3 10h14M3 15h7" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round"/></svg>} label="MyCRM" />
        <SidebarItem icon={<svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M5 4h10a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#5f6368" strokeWidth="1.2"/><path d="M7 8h6M7 11h4" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round"/></svg>} label="Attachment Drive" />
      </div>

      <div style={{ height: 1, background: '#e0e0e0', margin: '8px 16px' }} />

      {/* Categories / Labels */}
      <div style={{ paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 32, paddingLeft: 12, gap: 14, cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6l7 4 7-4M3 6v8l7 4 7-4V6" stroke="#5f6368" strokeWidth="1.2" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: 14, color: C.sidebarText }}>Categories</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: 32, paddingLeft: 12, gap: 14 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p31f32980} fill="#5f6368"/></svg>
          <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: 14, color: C.sidebarText }}>Labels</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: 32, paddingLeft: 12, gap: 14, cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={svgPaths.p31f32980} fill="#5f6368"/></svg>
          <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400, fontSize: 14, color: C.sidebarText }}>More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Email action toolbar ─────────────────────────────────────────────────────
function EmailActionBar({ onClose }: { onClose: () => void }) {
  const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 36, height: 36, borderRadius: '50%', border: 'none',
    background: 'none', cursor: 'pointer',
  };
  return (
    <div style={{
      height: 52, background: C.emailBg, borderBottom: '1px solid #e0e0e0',
      display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8,
      gap: 2, flexShrink: 0,
    }}>
      {/* Back arrow */}
      <button style={btnStyle} onClick={onClose}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={svgPaths.p2b3cab00} fill="#444746" />
        </svg>
      </button>
      {/* Archive */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="14" height="3" rx="0.5" stroke="#444746" strokeWidth="1.2"/>
          <path d="M3 5h12v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#444746" strokeWidth="1.2"/>
          <path d="M7 9h4" stroke="#444746" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* Report spam */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7.5 2h3l5 5v3l-5 5h-3l-5-5V7l5-5z" stroke="#444746" strokeWidth="1.2"/>
          <path d="M9 6v4M9 12v.01" stroke="#444746" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>
      {/* Delete */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 5h12M7 5V3h4v2M6 5v9a1 1 0 001 1h4a1 1 0 001-1V5H6z" stroke="#444746" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* More */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="4" r="1.2" fill="#444746"/>
          <circle cx="9" cy="9" r="1.2" fill="#444746"/>
          <circle cx="9" cy="14" r="1.2" fill="#444746"/>
        </svg>
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Count */}
      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: '#444746' }}>6 of 3,692</span>
      {/* Prev / Next */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M10 13L5 9l5-4" stroke="#444746" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M8 5l5 4-5 4" stroke="#444746" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Print / New window */}
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={svgPaths.p16a29500} fill="#444746"/>
        </svg>
      </button>
      <button style={btnStyle}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d={svgPaths.p71cf200} fill="#444746"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Inertia BLADE email body ─────────────────────────────────────────────────
function InertiaEmailBody({ onCreateAccount }: { onCreateAccount: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    /* Outer page background — #f7f9fa, scrollable */
    <div style={{
      width: '100%',
      background: '#f7f9fa',
      overflowY: 'auto',
      padding: '24px 80px',
      boxSizing: 'border-box',
    }}>
      {/* White card with rounded corners */}
      <div style={{
        background: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
      }}>
        {/* Inner padding wrapper */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 18,
          padding: '16px 40px',
        }}>

          {/* Banner — dark navy card with logo + headline */}
          <div style={{
            background: '#28314a',
            borderRadius: 8,
            padding: '12px 22px',
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>
            {/* Blade full logo */}
            <div style={{ width: 155.175, height: 40, flexShrink: 0 }}>
              <svg width="155.175" height="40" viewBox="0 0 155.175 40" fill="none" preserveAspectRatio="none">
                <path d={emailLogoSvg.p3b26f980} fill="#F0F0F0" />
                <path d={emailLogoSvg.p2a25f080} fill="#FF4D00" />
                <path d={emailLogoSvg.p31311f00} fill="#FF4D00" />
                <path d={emailLogoSvg.p3a2b0400} fill="#FF4D00" />
                <path d={emailLogoSvg.p3df3d880} fill="#FF4D00" />
                <path d={emailLogoSvg.p98b4780} fill="#FF4D00" />
                <path d={emailLogoSvg.p28d42900} fill="#F0F0F0" />
                <path d={emailLogoSvg.pbd07b00} fill="#F0F0F0" />
                <path d={emailLogoSvg.p39135180} fill="#F0F0F0" />
                <path d={emailLogoSvg.p1b98a840} fill="#F0F0F0" />
                <path d={emailLogoSvg.p1d828e00} fill="#F0F0F0" />
                <path d={emailLogoSvg.p7086500} fill="#F0F0F0" />
                <path d={emailLogoSvg.p391b640} fill="#F0F0F0" />
              </svg>
            </div>
            {/* Headline */}
            <p style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 24, lineHeight: 'normal',
              color: '#ffffff', margin: 0,
            }}>
              You've Been Added to a Project
            </p>
          </div>

          {/* Body content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Greeting + invitation text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: 24, lineHeight: '32px',
                color: '#000000', margin: 0, whiteSpace: 'nowrap',
              }}>
                {`Hi {{FirstName}},`}
              </p>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 400,
                fontSize: 14, color: '#333333',
                width: 584, whiteSpace: 'pre-wrap',
              }}>
                <p style={{ margin: 0 }}>
                  <strong style={{ fontWeight: 700 }}>{`{{InvitingCompanyName}}`}</strong>
                  {` has added you to the`}
                  <strong style={{ fontWeight: 700 }}>{` {{ProjectName}}`}</strong>
                  {` project in `}
                  <strong style={{ fontWeight: 700 }}>Inertia Systems.</strong>
                </p>
                <p style={{ lineHeight: '22px', margin: 0 }}>&nbsp;</p>
                <p style={{ lineHeight: '22px', margin: 0 }}>
                  To get started, you'll need to create your account using the link below:
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onCreateAccount}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                alignSelf: 'flex-start',
                height: 40, padding: '0 16px',
                background: hovered ? '#FF773E' : '#FF4D00',
                border: 'none', borderRadius: 4,
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: 16, lineHeight: '24px', color: '#ffffff',
                cursor: 'pointer', transition: 'background 0.15s',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              Create your account
            </button>

            {/* Follow-up text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 400,
                lineHeight: '22px', fontSize: 14,
                color: '#000000', width: 584, whiteSpace: 'pre-wrap',
              }}>
                <p style={{ margin: 0 }}>This link will guide you through setting up your password and accessing the project.</p>
                <p style={{ margin: 0 }}>&nbsp;</p>
                <p style={{ margin: 0 }}>If you weren't expecting this invitation, you can safely ignore this email.</p>
                <p style={{ margin: 0 }}>&nbsp;</p>
                <p style={{ margin: 0 }}>If you have any questions, your project administrator or the Inertia team can help you get started.</p>
              </div>
            </div>

            {/* Sign-off */}
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 400,
                lineHeight: '22px', color: '#000000',
                width: 584, margin: 0,
              }}>Welcome aboard,</p>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: 14, color: '#FF4D00',
                width: 584,
              }}>
                <span style={{ lineHeight: '22px', display: 'block' }}>
                  Inertia Systems, Inc.
                </span>
                <a
                  href="https://support.blade.inertia.com"
                  style={{
                    lineHeight: '22px',
                    color: '#FF4D00',
                    textDecoration: 'underline',
                    textDecorationSkipInk: 'none',
                  }}
                >
                  https://support.blade.inertia.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: 0, borderTop: '0.533px solid #dfe3e8',
            width: '100%',
          }} />

          {/* Footer */}
          <div style={{
            background: '#f5f5f5',
            margin: '0 -40px -16px',
            padding: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 400,
              fontSize: 10, color: '#000000',
              textAlign: 'center', width: 476,
            }}>
              <p style={{ margin: 0 }}>This is an operational email. Please do not reply to this message.</p>
              <p style={{ margin: 0 }}>© Inertia Systems, Inc. All rights reserved.</p>
            </div>
            {/* Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <a href="https://go.inertiasystems.com/privacy-policy" style={{
                fontFamily: 'sans-serif', fontWeight: 400,
                fontSize: 10, color: '#333333',
                textDecoration: 'underline', textDecorationSkipInk: 'none',
                whiteSpace: 'nowrap',
              }}>Privacy policy</a>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
              </svg>
              <a href="https://go.inertiasystems.com/terms-and-conditions" style={{
                fontFamily: 'sans-serif', fontWeight: 400,
                fontSize: 10, color: '#333333',
                textDecoration: 'underline', textDecorationSkipInk: 'none',
                whiteSpace: 'nowrap',
              }}>Terms of service</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Email thread header ──────────────────────────────────────────────────────
function EmailThreadHeader() {
  return (
    <div style={{ marginBottom: 16 }}>
      {/* Thread subject */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <h2 style={{
          fontFamily: "'Google Sans', Roboto, sans-serif", fontWeight: 400,
          fontSize: 22, lineHeight: '28px', color: '#202124', margin: 0,
        }}>
          You've Been Added to a Project — Inertia Systems
        </h2>
      </div>
    </div>
  );
}

// ─── Single email message card ────────────────────────────────────────────────
function EmailMessageCard({ onCreateAccount }: { onCreateAccount: () => void }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 8,
      overflow: 'hidden', marginBottom: 8,
    }}>
      {/* Message header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', padding: '12px 16px',
          cursor: 'pointer', gap: 12,
        }}
        onClick={() => setExpanded(v => !v)}
      >
        {/* Sender avatar */}
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#1a6eed',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: 18, color: '#fff' }}>B</span>
        </div>

        {/* Sender info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: "'Google Sans', Roboto, sans-serif", fontWeight: 500, fontSize: 14, color: '#202124' }}>Blade</span>
            {/* Verified icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6.5" fill="#1a73e8"/>
              <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#5f6368' }}>&lt; no-reply@blade.inertia.com &gt;</span>
          </div>
          <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#5f6368' }}>
            to me
            <svg style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle' }} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Timestamp + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#5f6368', whiteSpace: 'nowrap' }}>12:13 PM (2 hours ago)</span>
          {/* Star */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2l2.06 4.17 4.6.67-3.33 3.24.79 4.58L9 12.27l-4.12 2.39.79-4.58-3.33-3.24 4.6-.67L9 2z" stroke="#5f6368" strokeWidth="1.1" strokeLinejoin="round"/>
          </svg>
          {/* Emoji */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#5f6368" strokeWidth="1.1"/>
            <circle cx="6.5" cy="7.5" r="1" fill="#5f6368"/>
            <circle cx="11.5" cy="7.5" r="1" fill="#5f6368"/>
            <path d="M6 11.5a3 3 0 006 0" stroke="#5f6368" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          {/* Reply */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 10l5-5v3c4 0 7 2 7 6-1.5-3-4-4-7-4v3L2 10z" fill="#5f6368"/>
          </svg>
          {/* Overflow */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="5" r="1.2" fill="#5f6368"/>
            <circle cx="9" cy="9" r="1.2" fill="#5f6368"/>
            <circle cx="9" cy="13" r="1.2" fill="#5f6368"/>
          </svg>
        </div>
      </div>

      {/* Email content */}
      {expanded && (
        <InertiaEmailBody onCreateAccount={onCreateAccount} />
      )}
    </div>
  );
}

// ─── Bottom reply bar ─────────────────────────────────────────────────────────
function ReplyBar() {
  const [replyHov, setReplyHov] = useState(false);
  const [fwdHov, setFwdHov] = useState(false);
  const [chatHov, setChatHov] = useState(false);

  const pillBtn = (label: string, icon: React.ReactNode, hov: boolean, setHov: (v: boolean) => void) => (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, height: 36,
        padding: '0 16px', borderRadius: 18,
        border: '1px solid #dadce0', background: hov ? '#f1f3f4' : '#ffffff',
        fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: 14, color: '#202124',
        cursor: 'pointer', transition: 'background 0.1s',
      }}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0' }}>
      {pillBtn('Reply',
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M2 10l5-5v3c4 0 7 2 7 6-1.5-3-4-4-7-4v3L2 10z" fill="#202124"/></svg>,
        replyHov, setReplyHov,
      )}
      {pillBtn('Forward',
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M16 10l-5-5v3c-4 0-7 2-7 6 1.5-3 4-4 7-4v3l5-5z" fill="#202124"/></svg>,
        fwdHov, setFwdHov,
      )}
      {pillBtn('Share in chat',
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="14" height="11" rx="2" stroke="#202124" strokeWidth="1.2"/>
          <path d="M5 16l2-3h4l2 3" stroke="#202124" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>,
        chatHov, setChatHov,
      )}
      {/* "New" badge on Share in chat */}
    </div>
  );
}

// ─── Main Gmail-style email page ─────────────────────────────────────────────
export interface SignUpEmailPageProps {
  onBack: () => void;
  onCreateAccount: () => void;
}

export function SignUpEmailPage({ onBack, onCreateAccount }: SignUpEmailPageProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2100,
      background: '#f6f8fc',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Roboto, sans-serif',
    }}>
      {/* Top navigation bar */}
      <GmailTopBar onClose={onBack} />

      {/* Body row */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Left sidebar */}
        <GmailSidebar />

        {/* Email content area */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          {/* Email action toolbar */}
          <EmailActionBar onClose={onBack} />

          {/* Thread content */}
          <div style={{ padding: '16px 16px 24px 16px', maxWidth: 900, width: '100%' }}>
            <EmailThreadHeader />
            <EmailMessageCard onCreateAccount={onCreateAccount} />
            <ReplyBar />
          </div>
        </div>
      </div>
    </div>
  );
}