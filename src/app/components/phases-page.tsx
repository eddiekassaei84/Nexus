import React, { useState, useRef } from 'react';
import { FlatRefTable, refItemsToFlatGroups } from './flat-ref-table';
import type { FlatGroup, FlatRefTableHandle } from './flat-ref-table';
import { PHASE_ITEMS } from './reference-data-table';
import { ImportRefDataModal, downloadRefDataTemplate } from './import-refdata-modal';
import { ExportRefDataModal } from './export-refdata-modal';

// ─── Button components (match discipline-table style) ─────────────────────────
function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background-color 0.15s', flexShrink: 0 }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}
    >
      {children}
    </button>
  );
}

function SecBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{ height: 36, paddingLeft: 14, paddingRight: 14, backgroundColor: '#FFFFFF', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', transition: 'background-color 0.15s, border-color 0.15s', flexShrink: 0 }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5F6F7'; e.currentTarget.style.borderColor = '#9EA2A8'; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
    >
      {children}
    </button>
  );
}

function TerBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{ height: 36, paddingLeft: 14, paddingRight: 14, backgroundColor: 'transparent', border: '1px solid transparent', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', transition: 'background-color 0.15s', flexShrink: 0 }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {children}
    </button>
  );
}

function RestoreDefaultLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ height: 36, paddingLeft: 8, paddingRight: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: 4, transition: 'color 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
      onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
    >
      Restore Defaults
    </button>
  );
}

// ─── Import / Export toolbar icons ────────────────────────────────────────────
function ImportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20.75 21.5" fill="none">
      <path d="M3 13.5v4.5h14.75v-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M10.375 1v12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9l4.375 4.5L14.75 9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21.8107 21.2803" fill="none">
      <path d="M3 13.5v4.5h15v-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M10.5 12V1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 5L10.5 1l4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12.611 12.611" fill="none">
      <path d="M6.3055 1v10.611M1 6.3055h10.611" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Toggle button (Group by Phase) ──────────────────────────────────────────
function ToggleGroupBtn({ grouped, onClick }: { grouped: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={grouped ? 'Switch to flat list view' : 'Switch to grouped view'}
      style={{ height: 36, paddingLeft: 14, paddingRight: 14, backgroundColor: grouped ? '#EFF0F2' : '#FFFFFF', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', transition: 'background-color 0.15s', flexShrink: 0 }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = grouped ? '#E5E7E9' : '#F5F6F7')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = grouped ? '#EFF0F2' : '#FFFFFF')}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="3" rx="1" stroke={grouped ? '#384857' : '#9EA2A8'} strokeWidth="1.5" />
        <rect x="3" y="11" width="13" height="3" rx="1" stroke={grouped ? '#384857' : '#9EA2A8'} strokeWidth="1.5" />
        <rect x="3" y="17" width="9" height="3" rx="1" stroke={grouped ? '#384857' : '#9EA2A8'} strokeWidth="1.5" />
      </svg>
      Group by Phase
    </button>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export function PhasesPage() {
  const [editMode,     setEditMode]     = useState(false);
  const [grouped,      setGrouped]      = useState(true);
  const [liveData,     setLiveData]     = useState<FlatGroup[]>(() => refItemsToFlatGroups(PHASE_ITEMS));
  const [importOpen,   setImportOpen]   = useState(false);
  const [exportOpen,   setExportOpen]   = useState(false);
  const tableRef = useRef<FlatRefTableHandle>(null);

  function handleEnterEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    tableRef.current?.cancelEdit();
  }

  function handleSave() {
    tableRef.current?.saveEdit();
  }

  function handleRestoreDefaults() {
    setLiveData(refItemsToFlatGroups(PHASE_ITEMS));
    setEditMode(false);
  }

  function handleAddPhase() {
    tableRef.current?.addGroup();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#FFFFFF' }}>

      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '0 16px', borderBottom: '1px solid #E8EAED', flexShrink: 0, background: '#FFFFFF' }}>

        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editMode ? (
            <PrimaryBtn onClick={handleAddPhase}>
              <PlusIcon />
              <span>Add Phase</span>
            </PrimaryBtn>
          ) : (
            <ToggleGroupBtn grouped={grouped} onClick={() => { setGrouped(v => !v); tableRef.current?.expandAll(); }} />
          )}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!editMode ? (
            <>
              <button
                onClick={() => downloadRefDataTemplate('flat', 'Phases', 'phases')}
                style={{ height: 36, paddingLeft: 8, paddingRight: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: 4 }}
                onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Download Import Template
              </button>
              <RestoreDefaultLink onClick={handleRestoreDefaults} />
              <SecBtn onClick={() => setExportOpen(true)}>
                <ExportIcon />
                <span>Export</span>
              </SecBtn>
              <PrimaryBtn onClick={handleEnterEdit}>
                <EditIcon />
                <span>Edit</span>
              </PrimaryBtn>
            </>
          ) : (
            <>
              <TerBtn onClick={handleCancel}>Cancel</TerBtn>
              <SecBtn onClick={() => setImportOpen(true)}>
                <ImportIcon />
                <span>Import</span>
              </SecBtn>
              <PrimaryBtn onClick={handleSave}>Save Changes</PrimaryBtn>
            </>
          )}
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 12px 12px 12px' }}>
        <FlatRefTable
          ref={tableRef}
          editMode={editMode}
          grouped={grouped}
          groupLabel="Phase"
          itemLabel="Sub-phase"
          initialData={liveData}
          onDataChange={setLiveData}
          onEditSave={(data) => { setLiveData(data); setEditMode(false); }}
          onEditCancel={() => setEditMode(false)}
        />
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <ImportRefDataModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        tabLabel="Phases"
        structureType="flat"
        tabId="phases"
        onImport={(imported) => {
          setLiveData(imported as FlatGroup[]);
          setImportOpen(false);
        }}
      />

      <ExportRefDataModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        tabLabel="Phases"
        structureType="flat"
        flatGroups={liveData}
        groupLabel="Phase"
        itemLabel="Sub-phase"
      />
    </div>
  );
}
