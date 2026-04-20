import React, { useState, useEffect, useRef } from 'react';
import type { User } from './users-table';

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────
interface DeleteModalProps {
  count:     number;
  onClose:   () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({ count, onClose, onConfirm }: DeleteModalProps) {
  const [typed, setTyped] = useState('');
  const inputRef          = useRef<HTMLInputElement>(null);
  const canConfirm        = typed.toLowerCase() === 'delete';

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-[10px] overflow-hidden"
        style={{ width: 420, boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-[14px] px-[24px] pt-[24px] pb-[16px]">
          <div
            className="flex items-center justify-center rounded-full shrink-0 mt-[1px]"
            style={{ width: 40, height: 40, background: '#FEF3F2' }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18.66 17H1.34L10 2Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M10 8V11" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="14" r="1" fill="#D92D20"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:16, color:'#101828', marginBottom:4, lineHeight:'24px' }}>
              Remove {count} {count === 1 ? 'user' : 'users'}?
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:400, fontSize:13, color:'#667085', lineHeight:'20px' }}>
              This action cannot be undone. The selected {count === 1 ? 'user' : 'users'} will be permanently removed from this project.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[28px] rounded-[6px] hover:bg-[#F2F4F7] transition-colors shrink-0 mt-[-2px]"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1L10 10M10 1L1 10" stroke="#667085" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-[24px] pb-[24px]">
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#344054', marginBottom:8, fontWeight:500 }}>
            To confirm, type <span style={{ color:'#D92D20', fontWeight:600 }}>Delete</span> in the field below:
          </p>
          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder="Type Delete to confirm"
            className="w-full h-[38px] px-[12px] rounded-[6px] outline-none transition-colors"
            style={{
              border: `1.5px solid ${canConfirm ? '#D92D20' : '#D0D5DD'}`,
              fontFamily: 'Inter,sans-serif',
              fontSize: 13,
              color: '#101828',
              background: canConfirm ? '#FFF5F5' : 'white',
            }}
            onKeyDown={e => { if (e.key === 'Enter' && canConfirm) onConfirm(); }}
          />
          <div className="flex items-center justify-end gap-[10px] mt-[20px]">
            <button
              onClick={onClose}
              className="h-[36px] px-[16px] rounded-[4px] transition-colors"
              style={{ fontFamily:'Inter,sans-serif', fontSize:16, lineHeight:'22px', color:'#616D79', fontWeight:400, background:'#F2F3F4', border:'1px solid #C3C7CC', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor='#616D79'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor='#C3C7CC'; }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!canConfirm}
              className="h-[36px] px-[16px] rounded-[6px] transition-colors"
              style={{
                fontFamily: 'Inter,sans-serif',
                fontSize:   13,
                fontWeight: 500,
                background: canConfirm ? '#D92D20' : '#F2F4F7',
                cursor:     canConfirm ? 'pointer' : 'not-allowed',
                border:     canConfirm ? '1px solid #B42318' : '1px solid #D0D5DD',
                color:      canConfirm ? 'white' : '#A0ADB8',
              } as React.CSSProperties}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 4H14M5 4V2.5C5 2.22 5.22 2 5.5 2H10.5C10.78 2 11 2.22 11 2.5V4M6 7V12M10 7V12M3 4L4 14H12L13 4"
        stroke="#344054" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function BanIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#344054" strokeWidth="1.4"/>
      <path d="M3.05 3.05L12.95 12.95" stroke="#344054" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#344054" strokeWidth="1.4"/>
      <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#344054" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#344054" strokeWidth="1.4"/>
      <path d="M1.5 5.5L8 9.5L14.5 5.5" stroke="#344054" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function CountIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 4.5H14M2 8H14M2 11.5H9" stroke="#344054" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M11 2.5l2.5 2.5L5 13.5H2.5V11L11 2.5Z" stroke="#344054" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4.5l2.5 2.5" stroke="#344054" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Single pill segment ───────────────────────────────────────────────────────
interface SegmentProps {
  icon:    React.ReactNode;
  label:   string;
  onClick?: () => void;
  isCount?: boolean;   // first segment — count, slightly bolder
}

function Segment({ icon, label, onClick, isCount }: SegmentProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={!onClick}
      className="flex items-center gap-[6px] h-full px-[14px] transition-colors select-none"
      style={{
        background:  hovered && onClick ? '#F9FAFB' : 'transparent',
        cursor:      onClick ? 'pointer' : 'default',
        fontFamily:  'Inter, sans-serif',
        fontSize:    13,
        fontWeight:  isCount ? 600 : 400,
        color:       '#243746',
        border:      'none',
        outline:     'none',
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Vertical divider between segments
function VDiv() {
  return <div style={{ width: 1, alignSelf: 'stretch', margin: '7px 0', background: '#D0D5DD' }} />;
}

// ─── Main SelectionActionBar ───────────────────────────────────────────────────
export interface SelectionActionBarProps {
  selectedIds:      Set<number>;
  allUsers:         User[];
  onRemove:         (ids: Set<number>) => void;
  onSuspend:        (ids: Set<number>) => void;
  onActivate:       (ids: Set<number>) => void;
  onReinvite:       (ids: Set<number>) => void;
  onClearSelection: () => void;
  onBulkEdit?:      () => void;
  onEditOne?:       (user: User) => void;
}

export function SelectionActionBar({
  selectedIds, allUsers,
  onRemove, onSuspend, onActivate, onReinvite, onBulkEdit, onEditOne,
}: SelectionActionBarProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const count    = selectedIds.size;
  const selected = allUsers.filter(u => selectedIds.has(u.id));

  // Status logic
  const allActive    = selected.length > 0 && selected.every(u => u.membershipStatus === 'Active');
  const allSuspended = selected.length > 0 && selected.every(u => u.membershipStatus === 'Suspended');
  const allInvite    = selected.length > 0 && selected.every(
    u => u.status === 'Pending Invitation' || u.status === 'Expired Invitation'
  );

  if (count === 0) return null;

  const handleConfirmRemove = () => {
    onRemove(selectedIds);
    setShowDeleteModal(false);
  };

  return (
    <>
      {/*
        Floating pill — absolutely positioned inside the `relative` footer container.
        Centered horizontally, centered vertically in the footer strip.
      */}
      <div
        style={{
          position:  'absolute',
          left:      '50%',
          top:       '50%',
          transform: 'translate(-50%, -50%)',
          zIndex:    50,
          display:   'flex',
          alignItems: 'stretch',
          height:    36,
          background: 'white',
          borderRadius: 6,
          border:    '1px solid #D0D5DD',
          boxShadow: '0 4px 18px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
          overflow:  'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {/* 1 — Count (always) */}
        <Segment
          icon={<CountIcon />}
          label={`${count} Selected`}
          isCount
        />

        <VDiv />

        {/* 2 — Edit / Edit Bulk */}
        <Segment
          icon={<EditIcon />}
          label={count === 1 ? 'Edit' : 'Edit Bulk'}
          onClick={count === 1
            ? (selected[0] ? () => onEditOne?.(selected[0]) : undefined)
            : onBulkEdit}
        />

        <VDiv />

        {/* 3 — Remove (always) */}
        <Segment
          icon={<TrashIcon />}
          label="Remove"
          onClick={() => setShowDeleteModal(true)}
        />

        {/* 4 — Status-specific actions */}
        {allActive && (
          <>
            <VDiv />
            <Segment icon={<BanIcon />}          label="Suspend"   onClick={() => onSuspend(selectedIds)} />
          </>
        )}
        {allSuspended && (
          <>
            <VDiv />
            <Segment icon={<CheckCircleIcon />}  label="Activate"  onClick={() => onActivate(selectedIds)} />
          </>
        )}
        {allInvite && (
          <>
            <VDiv />
            <Segment icon={<MailIcon />}         label="Re-invite" onClick={() => onReinvite(selectedIds)} />
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          count={count}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmRemove}
        />
      )}
    </>
  );
}