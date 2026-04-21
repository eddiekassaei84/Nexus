import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import svgPathsClose from '../../imports/svg-uayoveoicl';
import summaryIcons from '../../imports/svg-hjxz06n11w';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'confirming' | 'uploading' | 'processing' | 'summary';

export interface TradeEntry {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface DisciplineGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  children: TradeEntry[];
}

interface SummaryData {
  imported: number;
  failed: number;
  reportCSV: string;
  reportFilename: string;
}

// ─── Sample file map ─────────────────────────────────────────────────────────
const SAMPLE_FILE_MAP: Record<string, string> = {
  'disciplines': '/sample-imports/DisciplineTrade_Import_Sample.xlsx',
};

export function downloadDisciplineTemplate(tabId?: string) {
  if (tabId && SAMPLE_FILE_MAP[tabId]) {
    const a = document.createElement('a');
    a.href = SAMPLE_FILE_MAP[tabId];
    a.download = SAMPLE_FILE_MAP[tabId].split('/').pop()!;
    a.click();
    return;
  }
  const csv = [
    'Code,Name,Type,Note',
    'CIVIL,Civil,Discipline,',
    'CIVIL-01,Earthwork,Trade,Site excavation and grading.',
    'CIVIL-02,Paving,Trade,Asphalt and concrete paving.',
    'STRUCT,Structural,Discipline,',
    'STRUCT-01,Concrete,Trade,Cast-in-place and precast concrete.',
    'STRUCT-02,Steel,Trade,Structural steel framing and connections.',
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'DisciplineTrade_import_template.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Parse uploaded file into DisciplineGroup[] ───────────────────────────────
function uid() { return Math.random().toString(36).slice(2); }

async function readFileAsTable(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: '' });
        resolve(rows as string[][]);
      } catch { reject(new Error('Could not read file')); }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsArrayBuffer(file);
  });
}

function parseIntoDisciplines(
  headers: string[],
  rows: string[][],
): { groups: DisciplineGroup[]; imported: number; failed: number; reportRows: string[][] } {
  const colIdx = (pattern: RegExp) => headers.findIndex(h => pattern.test(h.trim()));
  const codeIdx  = colIdx(/^code$/i) >= 0 ? colIdx(/^code$/i) : 0;
  const nameIdx  = colIdx(/^name$/i) >= 0 ? colIdx(/^name$/i) : 1;
  const typeIdx  = colIdx(/^type$/i);
  const noteIdx  = colIdx(/^note$/i) >= 0 ? colIdx(/^note$/i) : colIdx(/^description$/i);
  const get = (row: string[], i: number) => (i >= 0 && i < row.length ? String(row[i] ?? '').trim() : '');

  const reportRows: string[][] = [['Row', 'Code', 'Name', 'Status', 'Reason']];
  let imported = 0; let failed = 0;
  const groups: DisciplineGroup[] = [];
  let currentGroup: DisciplineGroup | null = null;

  rows.forEach((row, i) => {
    const rowNum = i + 2;
    const code = get(row, codeIdx);
    const name = get(row, nameIdx);
    const type = typeIdx >= 0 ? get(row, typeIdx).toLowerCase() : '';
    const note = noteIdx >= 0 ? get(row, noteIdx) : '';

    if (!code && !name) return; // skip blank rows

    if (!code || !name) {
      failed++;
      reportRows.push([String(rowNum), code, name, 'Failed', 'Missing required Code or Name']);
      return;
    }

    const isDiscipline = type === 'discipline' || (!type && !currentGroup);
    if (isDiscipline) {
      currentGroup = { id: uid(), code, name, description: note, children: [] };
      groups.push(currentGroup);
      imported++;
      reportRows.push([String(rowNum), code, name, 'Imported', 'Discipline']);
    } else {
      if (!currentGroup) {
        currentGroup = { id: uid(), code: 'UNGROUPED', name: 'Ungrouped', description: '', children: [] };
        groups.push(currentGroup);
      }
      currentGroup.children.push({ id: uid(), code, name, description: note });
      imported++;
      reportRows.push([String(rowNum), code, name, 'Imported', 'Trade']);
    }
  });

  return { groups, imported, failed, reportRows };
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.1336 12.1336" fill="none">
      <path d={svgPathsClose.p41af6c0} fill="#384857" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <path d={svgPathsClose.p2059ac00} stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
      <path d="M1.875 11.25H13.125" stroke="#1890FF" strokeLinecap="round" strokeWidth="1.40625" />
    </svg>
  );
}
function PlusOrangeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="24" fill="#FFF3EE" />
      <path d="M24 16v16M16 24h16" stroke="#FF4D00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconAdded()  { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#52C41A"/><path d="M4.5 8l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconFailed() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#FF4D4F"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>; }

function SummaryRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon}
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#595959' }}>{text}</span>
    </div>
  );
}
function ReportDownloadRow({ filename, onDownload }: { filename: string; onDownload: () => void }) {
  return (
    <div style={{ position: 'relative', borderRadius: 4, width: '100%', backgroundColor: '#FAFAFA', border: '1px dashed #D9D9D9' }}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 44, borderBottom: '1px solid #D9D9D9' }}>
          <div style={{ flex: 1, padding: '0 12px', overflow: 'hidden' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#595959', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{filename}</span>
          </div>
          <button onClick={onDownload}
            style={{ flexShrink: 0, padding: '0 16px', background: 'none', border: 'none', cursor: 'pointer', opacity: 1, transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            aria-label="Download full import report CSV"
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: '22px', color: '#3B82F6', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Download Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ImportDisciplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (groups: DisciplineGroup[]) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ImportDisciplineModal({ isOpen, onClose, onImport }: ImportDisciplineModalProps) {
  const [phase,           setPhase]           = useState<Phase>('idle');
  const [file,            setFile]            = useState<File | null>(null);
  const [parsedData,      setParsedData]      = useState<string[][] | null>(null);
  const [uploadProgress,  setUploadProgress]  = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [summary,         setSummary]         = useState<SummaryData | null>(null);
  const [confirmTyped,    setConfirmTyped]     = useState('');
  const [isDragOver,      setIsDragOver]       = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle'); setFile(null); setParsedData(null);
      setUploadProgress(0); setProcessProgress(0);
      setSummary(null); setConfirmTyped('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  const handleFileSelect = useCallback(async (f: File) => {
    setFile(f);
    let parsed: string[][] | null = null;
    try { parsed = await readFileAsTable(f); } catch { /* ignore */ }
    setParsedData(parsed);
    setUploadProgress(0);
    setPhase('uploading');
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  }, [handleFileSelect]);

  // Simulate upload progress
  useEffect(() => {
    if (phase !== 'uploading') return;
    if (uploadProgress >= 100) { setPhase('confirming'); return; }
    const t = setTimeout(() => setUploadProgress(p => Math.min(p + 20, 100)), 80);
    return () => clearTimeout(t);
  }, [phase, uploadProgress]);

  // Simulate processing
  useEffect(() => {
    if (phase !== 'processing') return;
    if (processProgress >= 100) {
      if (parsedData && parsedData.length > 1) {
        const [headerRow, ...dataRows] = parsedData;
        const { groups, imported, failed, reportRows } = parseIntoDisciplines(headerRow, dataRows);
        const reportCSV = reportRows.map(r => r.map(v => v.includes(',') ? `"${v}"` : v).join(',')).join('\n');
        const ts = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        setSummary({ imported, failed, reportCSV, reportFilename: `discipline-trade-import-report-${ts}.csv` });
        if (imported > 0) onImport(groups);
      } else {
        setSummary({ imported: 0, failed: 0, reportCSV: '', reportFilename: '' });
      }
      setPhase('summary');
      return;
    }
    const t = setTimeout(() => setProcessProgress(p => Math.min(p + 15, 100)), 60);
    return () => clearTimeout(t);
  }, [phase, processProgress, parsedData, onImport]);

  const handleDownloadReport = () => {
    if (!summary) return;
    const blob = new Blob([summary.reportCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = summary.reportFilename; a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}b`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}mb`;
  };

  const isInProgress = phase === 'uploading' || phase === 'processing';
  const canImport    = !!file && !isInProgress;
  const confirmMatch = confirmTyped.toLowerCase() === 'import';
  const currentProgress = phase === 'uploading' ? uploadProgress : processProgress;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(0,0,0,0.20)' }} onClick={onClose} />

      {/* Modal shell */}
      <div
        style={{ position: 'fixed', zIndex: 301, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 48px)', backgroundColor: '#F5F5F5', borderRadius: 8, boxShadow: '20px 20px 25px -5px rgba(0,0,0,0.10), 8px 8px 10px -6px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Content area */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', backgroundColor: '#FFFFFF', borderRadius: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '9px 24px 24px' }}>

            {/* Heading */}
            <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>
                  {phase === 'summary' ? 'Import Complete' : 'Import Disciplines & Trades'}
                </p>
                <button onClick={onClose} aria-label="Close"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, borderRadius: 40, transition: 'background-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <div style={{ padding: 8 }}><CloseIcon /></div>
                </button>
              </div>
              <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%', flexShrink: 0 }} />
            </div>

            {/* Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {phase !== 'summary' && (
                <>
                  {(phase === 'idle' || phase === 'confirming') && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', margin: 0 }}>
                      Importing a CSV or Excel file will replace all existing <strong style={{ fontWeight: 600, color: '#1D2C38' }}>disciplines &amp; trades</strong> data. Download the template to see the required format.
                    </p>
                  )}

                  {phase === 'idle' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5.99 }}>
                      <DownloadIcon />
                      <button
                        onClick={() => downloadDisciplineTemplate('disciplines')}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#1890FF', textDecoration: 'underline', textAlign: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        Download Import Template
                      </button>
                    </div>
                  )}

                  {phase === 'idle' && (
                    <div
                      style={{ border: `2px dashed ${isDragOver ? '#FF4D00' : '#D0D5DD'}`, borderRadius: 8, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: isDragOver ? '#FFF3EE' : '#FAFAFA', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={onDrop}
                    >
                      <div style={{ position: 'relative', flexShrink: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlusOrangeIcon />
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', textAlign: 'center', margin: 0, flexShrink: 0 }}>
                        Click or drag a CSV or Excel file to this area to upload<br />
                        or browse for a file manually
                      </p>
                      <button
                        onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        style={{ height: 36, padding: '0 16px', background: '#FFFFFF', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', transition: 'background 0.15s, border-color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
                      >
                        Browse file
                      </button>
                      <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ''; }} />
                    </div>
                  )}

                  {/* Upload / process progress */}
                  {(phase === 'uploading' || phase === 'processing') && file && (
                    <div style={{ border: '1px solid #E8EAED', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFA' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#384857', fontWeight: 500 }}>{file.name}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C' }}>{formatSize(file.size)}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: '#E8EAED', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 3, background: '#FF4D00', width: `${currentProgress}%`, transition: 'width 0.1s linear' }} />
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8C8C8C' }}>
                        {phase === 'uploading' ? `Uploading… ${currentProgress}%` : `Processing… ${currentProgress}%`}
                      </span>
                    </div>
                  )}

                  {/* Confirmation warning */}
                  {phase === 'confirming' && file && (
                    <div style={{ border: '1px solid #FCA5A5', borderRadius: 8, padding: 16, background: '#FEF2F2', display: 'flex', gap: 12 }}>
                      <div style={{ flexShrink: 0, marginTop: 2 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#FEE2E2"/><path d="M10 6v4M10 13h.01" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '22px', color: '#B91C1C', margin: '0 0 4px' }}>
                          This will completely replace all current disciplines &amp; trades data
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#7F1D1D', margin: 0 }}>
                          All existing disciplines and trades will be <strong style={{ fontWeight: 600 }}>permanently deleted</strong> and replaced with the contents of <strong style={{ fontWeight: 600 }}>{file.name}</strong>. This action cannot be reversed.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Type "IMPORT" confirmation */}
                  {phase === 'confirming' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '16px', color: '#384857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Type <strong>IMPORT</strong> to confirm
                      </span>
                      <input
                        type="text" value={confirmTyped} onChange={e => setConfirmTyped(e.target.value)}
                        placeholder="Type IMPORT to confirm"
                        style={{ height: 40, padding: '0 12px', border: `1px solid ${confirmMatch ? '#52C41A' : '#D0D5DD'}`, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#384857', outline: 'none', transition: 'border-color 0.15s', background: '#FFFFFF' }}
                        onFocus={e => { if (!confirmMatch) e.currentTarget.style.borderColor = '#91D5FF'; }}
                        onBlur={e  => { if (!confirmMatch) e.currentTarget.style.borderColor = '#D0D5DD'; }}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Summary */}
              {phase === 'summary' && summary && (
                <>
                  {summary.imported > 0 && (
                    <SummaryRow icon={<IconAdded />} text={`${summary.imported} row${summary.imported !== 1 ? 's' : ''} successfully imported`} />
                  )}
                  {summary.failed > 0 && (
                    <SummaryRow icon={<IconFailed />} text={`${summary.failed} row${summary.failed !== 1 ? 's' : ''} failed to import (see report for details)`} />
                  )}
                  {summary.imported === 0 && summary.failed === 0 && (
                    <SummaryRow icon={<IconAdded />} text="No items were found in the file." />
                  )}
                  {summary.reportCSV && (
                    <ReportDownloadRow filename={summary.reportFilename} onDownload={handleDownloadReport} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#F5F5F5', height: 72, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, paddingRight: 24, borderTop: '1.111px solid #C3C7CC' }}>
          {phase === 'summary' ? (
            <button onClick={onClose}
              style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}>
              Done
            </button>
          ) : phase === 'confirming' ? (
            <>
              <button onClick={() => { setPhase('idle'); setFile(null); setConfirmTyped(''); }}
                style={{ height: 36, paddingLeft: 12, paddingRight: 12, background: 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#E5E7E9')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                Back
              </button>
              <button onClick={() => { if (confirmMatch) { setProcessProgress(0); setPhase('processing'); } }}
                disabled={!confirmMatch}
                style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: confirmMatch ? '#FF4D00' : '#D9D9D9', border: 'none', borderRadius: 4, cursor: confirmMatch ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', transition: 'background-color 0.15s' }}
                onMouseEnter={e => { if (confirmMatch) e.currentTarget.style.backgroundColor = '#FF773E'; }}
                onMouseLeave={e => { if (confirmMatch) e.currentTarget.style.backgroundColor = '#FF4D00'; }}>
                Confirm Import
              </button>
            </>
          ) : (
            <>
              <button onClick={onClose}
                style={{ height: 36, paddingLeft: 12, paddingRight: 12, background: 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#E5E7E9')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                Cancel
              </button>
              <button onClick={() => canImport && setPhase('confirming')}
                disabled={!canImport || isInProgress}
                style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: canImport ? '#FF4D00' : '#D9D9D9', border: 'none', borderRadius: 4, cursor: canImport ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', transition: 'background-color 0.15s' }}
                onMouseEnter={e => { if (canImport) e.currentTarget.style.backgroundColor = '#FF773E'; }}
                onMouseLeave={e => { if (canImport) e.currentTarget.style.backgroundColor = '#FF4D00'; }}>
                Import
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
