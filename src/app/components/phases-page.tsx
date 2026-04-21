import React, { useState, useRef } from 'react';
import { FlatRefTable, refItemsToFlatGroups } from './flat-ref-table';
import type { FlatGroup, FlatRefTableHandle } from './flat-ref-table';
import { PHASE_ITEMS } from './reference-data-table';
import { ImportRefDataModal, downloadRefDataTemplate } from './import-refdata-modal';
import { ExportRefDataModal } from './export-refdata-modal';

// ─── Button components (identical to discipline-table) ─────────────────────────
function SecBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${hov && !disabled ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, background: hov && !disabled ? '#E5E7E9' : '#F2F3F4', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: disabled ? '#BFBFBF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s', opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
}

function PriBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 6, border: 'none', borderRadius: 4, background: hov ? '#FF773E' : '#FF4D00', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      {children}
    </button>
  );
}

function TerBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{ height: 36, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 6, border: 'none', borderRadius: 4, background: pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: pressed ? '#FFFFFF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s' }}>
      {children}
    </button>
  );
}

function ToolbarBtn({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={disabled ? undefined : onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 32, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 5, border: '1px solid transparent', borderRadius: 4, background: hov && !disabled ? '#F0F0F0' : 'transparent', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: disabled ? '#BFBFBF' : '#384857', whiteSpace: 'nowrap', transition: 'background 0.15s', opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}

function RestoreDefaultLink({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: 'none', border: 'none', padding: '0 4px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', textDecoration: hov ? 'underline' : 'none', whiteSpace: 'nowrap', transition: 'text-decoration 0.15s' }}>
      Restore Defaults
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="#8C8C8C" strokeWidth="1.3" />
      <path d="M10.5 10.5L13.5 13.5" stroke="#8C8C8C" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

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

// ─── Main Page Component ───────────────────────────────────────────────────────
export function PhasesPage() {
  const [editMode,     setEditMode]     = useState(false);
  const [groupByPhase, setGroupByPhase] = useState(true);
  const [search,       setSearch]       = useState('');
  const [liveData,     setLiveData]     = useState<FlatGroup[]>(() => refItemsToFlatGroups(PHASE_ITEMS));
  const [importOpen,   setImportOpen]   = useState(false);
  const [exportOpen,   setExportOpen]   = useState(false);
  const [clearHover,   setClearHover]   = useState(false);
  const tableRef = useRef<FlatRefTableHandle>(null);

  function enterEditMode() {
    setEditMode(true);
    tableRef.current?.expandAll();
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
  function expandAll() {
    tableRef.current?.expandAll();
  }
  function collapseAll() {
    tableRef.current?.collapseAll();
  }

  const showClear = search.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', background: 'white', overflow: 'hidden', minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8 }}>

      {/* ── Toolbar ──────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>

        {/* LEFT */}
        {!editMode ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 240, flexShrink: 0 }}>
              <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}><SearchIcon /></div>
              <input
                type="text"
                placeholder="Search phases"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                onBlur={e => (e.currentTarget.style.borderColor = '#D0D5DD')}
              />
              {showClear && (
                <button
                  onClick={() => setSearch('')}
                  onMouseEnter={() => setClearHover(true)}
                  onMouseLeave={() => setClearHover(false)}
                  aria-label="Clear search"
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHover ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            {/* Group by Phase toggle switch */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer' }}
              onClick={() => setGroupByPhase(prev => !prev)}>
              <div style={{ width: 40, height: 20, borderRadius: 10, background: groupByPhase ? '#243746' : '#D9D9D9', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 2, left: groupByPhase ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
              </div>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', userSelect: 'none' }}>Group by Phase</span>
            </div>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            <ToolbarBtn onClick={expandAll} disabled={!groupByPhase}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor" /></svg>
              <span>Expand All</span>
            </ToolbarBtn>
            <ToolbarBtn onClick={collapseAll} disabled={!groupByPhase}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor" /></svg>
              <span>Collapse All</span>
            </ToolbarBtn>
          </div>
        ) : (
          /* Edit mode LEFT — Add Phase + Expand/Collapse */
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SecBtn onClick={handleAddPhase}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" /></svg>
              <span>Add Phase</span>
            </SecBtn>
            <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
            <ToolbarBtn onClick={expandAll}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.19791 9.90001C6.43574 9.90001 6.6526 9.80908 6.82749 9.62019L12.158 4.1708C12.3118 4.0169 12.3888 3.82803 12.3888 3.59718C12.3888 3.14248 12.0321 2.78571 11.5843 2.78571C11.3605 2.78571 11.1507 2.87665 10.9967 3.03055L6.19791 7.9483L1.39908 3.03055C1.23819 2.87665 1.03532 2.78571 0.811464 2.78571C0.356765 2.78571 0 3.14248 0 3.59718C0 3.82103 0.0839447 4.0169 0.237843 4.1708L5.56832 9.62019C5.7502 9.80908 5.96006 9.90001 6.19791 9.90001Z" fill="currentColor" /></svg>
              <span>Expand All</span>
            </ToolbarBtn>
            <ToolbarBtn onClick={collapseAll}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0.237843 8.52193C0.0839447 8.66883 0 8.8647 0 9.08855C0 9.54324 0.356765 9.90001 0.811464 9.90001C1.03532 9.90001 1.24518 9.81607 1.39908 9.65517L6.19791 4.73742L10.9967 9.65517C11.1507 9.81607 11.3605 9.90001 11.5843 9.90001C12.0321 9.90001 12.3888 9.54324 12.3888 9.08855C12.3888 8.8647 12.3118 8.66883 12.158 8.52193L6.82749 3.06553C6.6526 2.88365 6.43574 2.78571 6.19791 2.78571C5.96006 2.78571 5.7502 2.87665 5.56832 3.06553L0.237843 8.52193Z" fill="currentColor" /></svg>
              <span>Collapse All</span>
            </ToolbarBtn>
          </div>
        )}

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {editMode ? (
            <>
              <RestoreDefaultLink onClick={handleRestoreDefaults} />
              <TerBtn onClick={handleCancel}>Cancel</TerBtn>
              <SecBtn onClick={() => setImportOpen(true)}><ImportIcon /><span>Import</span></SecBtn>
              <PriBtn onClick={handleSave}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="17 21 17 13 7 13 7 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="7 3 7 8 15 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Save Changes</span>
              </PriBtn>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M7.5 1.875v7.5M4.375 6.25L7.5 9.375l3.125-3.125" stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
                  <path d="M1.875 11.25H13.125" stroke="#1890FF" strokeLinecap="round" strokeWidth="1.40625" />
                </svg>
                <button
                  onClick={() => downloadRefDataTemplate('flat', 'Phases', 'phases')}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 13, color: '#1890FF', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Download Import Template
                </button>
              </div>
              <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
              <SecBtn onClick={() => setExportOpen(true)}><ExportIcon /><span>Export</span></SecBtn>
              <PriBtn onClick={enterEditMode}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Edit</span>
              </PriBtn>
            </>
          )}
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <FlatRefTable
          ref={tableRef}
          editMode={editMode}
          grouped={groupByPhase}
          search={search}
          groupLabel="Phase"
          itemLabel="Sub-phase"
          initialData={liveData}
          onDataChange={setLiveData}
          onEditSave={(data) => { setLiveData(data); setEditMode(false); }}
          onEditCancel={() => setEditMode(false)}
        />
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────────── */}
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
