import React, { useState, useRef, useCallback, useEffect } from 'react';
import svgPathsClose from '../../imports/svg-uayoveoicl';
import summaryIcons from '../../imports/svg-hjxz06n11w';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'uploading' | 'processing' | 'summary';
type RowStatus = 'added' | 'updated' | 'duplicate' | 'failed' | 'invited';

interface SummaryData {
  added: number;
  updated: number;
  duplicates: number;
  failed: number;
  invited: number;
  reportCSV: string;
  reportFilename: string;
}

// ─── CSV helpers ──────────────────────────────────────────────────────────────
function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };
  const split = (l: string) => l.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
  return { headers: split(lines[0]), rows: lines.slice(1).map(split) };
}

function getEmail(row: string[], headers: string[]): string {
  const idx = headers.findIndex(h => /email/i.test(h));
  if (idx >= 0 && idx < row.length) return row[idx];
  return row.find(c => c.includes('@')) ?? '';
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

const STATUS_LABELS: Record<RowStatus, string> = {
  added:     'Added Successfully',
  updated:   'Updated Existing User',
  duplicate: 'Duplicate — Skipped',
  failed:    'Failed — Invalid Data',
  invited:   'Invitation Sent',
};

function categorizeRow(row: string[], headers: string[], idx: number): RowStatus {
  const email = getEmail(row, headers);
  if (!isValidEmail(email)) return 'failed';
  const n = idx % 10;
  if (n === 9) return 'duplicate';
  if (n === 8) return 'updated';
  if (n === 6 || n === 3) return 'invited';
  return 'added';
}

function computeSummary(file: File, csvText: string): SummaryData {
  const { headers, rows } = parseCSV(csvText);
  const dataRows =
    rows.length > 0
      ? rows
      : Array.from({ length: Math.max(6, Math.ceil(file.size / 150)) }, (_, i) => [
          `User ${i + 1}`,
          `user${i + 1}@example.com`,
          'Member',
          'Acme Corp',
          'New York',
          'Editor',
          'Contributor',
        ]);

  const statuses = dataRows.map((r, i) => categorizeRow(r, headers, i));
  const counts = statuses.reduce<Record<string, number>>((a, s) => {
    a[s] = (a[s] || 0) + 1;
    return a;
  }, {});

  const effectiveHeaders =
    headers.length > 0
      ? headers
      : ['Name', 'Email', 'Job Title', 'Company', 'Office', 'Permission', 'Permission Type'];
  const reportHeaders = [...effectiveHeaders, 'Import Status'];
  const reportRows = dataRows.map((r, i) => {
    const paddedRow = [...r];
    while (paddedRow.length < effectiveHeaders.length) paddedRow.push('');
    return [...paddedRow, STATUS_LABELS[statuses[i]]];
  });
  const reportCSV = [reportHeaders, ...reportRows].map(r => r.join(',')).join('\n');
  const baseName = file.name.replace(/\.csv$/i, '');

  return {
    added:      counts.added      || 0,
    updated:    counts.updated    || 0,
    duplicates: counts.duplicate  || 0,
    failed:     counts.failed     || 0,
    invited:    counts.invited    || 0,
    reportCSV,
    reportFilename: `${baseName}_report.csv`,
  };
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
      <path
        d={svgPathsClose.p2059ac00}
        stroke="#1890FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.40625"
      />
      <path d="M1.875 11.25H13.125" stroke="#1890FF" strokeLinecap="round" strokeWidth="1.40625" />
    </svg>
  );
}

function PlusOrangeIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 33.9931 33.9931" fill="none">
      <path d="M0.999796 16.9965H32.9933" stroke="#FF4D00" strokeLinecap="square" strokeWidth="1.5" />
      <path d="M16.9965 0.999796V32.9933" stroke="#FF4D00" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CsvFileIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 22" fill="none">
      <rect x="1" y="1" width="16" height="20" rx="2" stroke="#616D79" strokeWidth="1.3" />
      <path d="M1 6H17" stroke="#616D79" strokeWidth="1.3" />
      <path d="M5 10H13M5 14H10" stroke="#616D79" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Summary icons ────────────────────────────────────────────────────────────
function IconAdded() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
      <div style={{ position: 'absolute', inset: '8.33%' }}>
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
          <path d={summaryIcons.p2170b040} fill="#00AC2B" />
        </svg>
      </div>
    </div>
  );
}

function IconUpdated() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
      <svg style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' }} viewBox="0 0 24 24" fill="none">
        <path d={summaryIcons.p172d3d80} fill="#1890FF" />
      </svg>
    </div>
  );
}

function IconDuplicate() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
      <div style={{ position: 'absolute', top: '12.5%', left: '9.74%', right: '9.74%', bottom: '16.67%' }}>
        <svg width="100%" height="100%" viewBox="0 0 19.3235 17" fill="none">
          <path clipRule="evenodd" d={summaryIcons.p18d02c80} fill="#FAAD14" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function IconFailed() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
      <div style={{ position: 'absolute', top: '-8.34%', left: '-8.93%', right: '-8.93%', bottom: '-9.52%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 20, height: 20, transform: 'rotate(45deg)' }}>
          <svg width="100%" height="100%" viewBox="0 0 20.0004 20.0004" fill="none">
            <path d={summaryIcons.p3c5cc980} fill="#F5222D" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconInvited() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
      <svg style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' }} viewBox="0 0 24 24" fill="none">
        <path d={summaryIcons.p2aea7800} fill="#74E0C1" />
      </svg>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress, label }: { progress: number; label: string }) {
  return (
    <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={label}
      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', height: 22 }}>
      <div style={{ flex: 1, position: 'relative', height: 8, borderRadius: 8, overflow: 'hidden', backgroundColor: '#E3E3E4' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 8, backgroundColor: '#FF9B6D', width: `${progress}%`, transition: 'width 0.12s linear' }} />
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#8C8C8C', width: 34, textAlign: 'right', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
        {progress}%
      </span>
    </div>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px', height: 24, borderRadius: 40, backgroundColor: '#E6F7FF', border: '1px solid #91D5FF' }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#1890FF' }}>{label}</span>
    </div>
  );
}

function ProgressRow({ filename, phase, progress }: { filename: string; phase: 'uploading' | 'processing'; progress: number }) {
  return (
    <div style={{ position: 'relative', borderRadius: 4, width: '100%', backgroundColor: '#FAFAFA', border: '1px dashed #D9D9D9' }}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 68, borderBottom: '1px solid #D9D9D9' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
            <div style={{ flex: 1, padding: '0 12px', overflow: 'hidden' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#595959', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{filename}</span>
            </div>
            <div style={{ width: 96, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <StatusPill label={phase === 'uploading' ? 'Uploading' : 'Processing'} />
            </div>
          </div>
          <div style={{ padding: '0 12px' }}>
            <ProgressBar progress={progress} label={phase === 'uploading' ? 'Upload progress' : 'Processing progress'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
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
            aria-label="Download full import report CSV">
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: '22px', color: '#3B82F6', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Download Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Template CSV ─────────────────────────────────────────────────────────────
const TEMPLATE_CSV = [
  'Name,Email,Job Title,Company,Office,Permission,Permission Type',
  'Jane Smith,jane@example.com,Project Manager,Acme Corp,New York,Editor,Contributor',
  'John Doe,john@example.com,BIM Coordinator,Build Co,London,Viewer,Member',
  'Sara Lee,sara@example.com,Site Manager,Construct Ltd,Sydney,Admin,Manager',
].join('\n');

function downloadTemplate() {
  const blob = new Blob([TEMPLATE_CSV], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'users_import_template.csv'; a.click();
  URL.revokeObjectURL(url);
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ImportCSVModal({
  isOpen,
  onClose,
  projectName = 'Cleveland Hospital',
}: ImportCSVModalProps) {
  const [phase,           setPhase]           = useState<Phase>('idle');
  const [file,            setFile]            = useState<File | null>(null);
  const [isDragging,      setIsDragging]      = useState(false);
  const [csvText,         setCsvText]         = useState('');
  const [uploadProgress,  setUploadProgress]  = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [summary,         setSummary]         = useState<SummaryData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle'); setFile(null); setIsDragging(false);
      setCsvText(''); setUploadProgress(0); setProcessProgress(0); setSummary(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (phase !== 'uploading') return;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 7 + 3, 100);
      setUploadProgress(Math.round(p));
      if (p >= 100) { clearInterval(iv); setProcessProgress(0); setPhase('processing'); }
    }, 110);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'processing') return;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 6 + 4, 100);
      setProcessProgress(Math.round(p));
      if (p >= 100) { clearInterval(iv); setSummary(computeSummary(file!, csvText)); setPhase('summary'); }
    }, 100);
    return () => clearInterval(iv);
  }, [phase, file, csvText]);

  const handleFileSelect = useCallback((f: File | null) => {
    if (f && (f.name.endsWith('.csv') || f.type === 'text/csv' || f.type === 'application/vnd.ms-excel')) {
      setFile(f);
    }
  }, []);

  const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0] ?? null);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] ?? null);
    e.target.value = '';
  };

  const handleImport = useCallback(async () => {
    if (!file) return;
    let text = '';
    try { text = await file.text(); } catch { /* ignore */ }
    setCsvText(text);
    setUploadProgress(0);
    setPhase('uploading');
  }, [file]);

  const handleDownloadReport = () => {
    if (!summary) return;
    const blob = new Blob([summary.reportCSV], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = summary.reportFilename; a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}b`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}mb`;
  };

  if (!isOpen) return null;

  const isInProgress    = phase === 'uploading' || phase === 'processing';
  const currentProgress = phase === 'uploading' ? uploadProgress : processProgress;
  const canImport       = !!file && !isInProgress;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(0,0,0,0.20)' }}
        onClick={isInProgress ? undefined : onClose}
      />

      {/* Modal shell */}
      <div
        style={{
          position: 'fixed', zIndex: 301,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 48px)',
          backgroundColor: '#F5F5F5',
          borderRadius: 8,
          boxShadow: '20px 20px 25px -5px rgba(0,0,0,0.10), 8px 8px 10px -6px rgba(0,0,0,0.10)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ═══ WHITE CONTENT AREA ═══ */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', backgroundColor: '#FFFFFF', borderRadius: 4 }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 36, height: '100%', padding: '9px 24px 24px' }}
            aria-live="polite"
            aria-atomic="true"
          >
            {/* ── Heading row ── */}
            <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                <p style={{
                  fontFamily: "'Actor', sans-serif",
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: '28.8px',
                  color: '#1B2736',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {phase === 'summary'
                    ? `Import Summary for ${projectName}`
                    : `Import users to '${projectName}' project`}
                </p>
                {!isInProgress && (
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
                      borderRadius: 40, transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ padding: 8 }}>
                      <CloseIcon />
                    </div>
                  </button>
                )}
              </div>
              {/* Divider */}
              <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%', flexShrink: 0 }} />
            </div>

            {/* ── Body group ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* ─── IDLE / IN-PROGRESS ─── */}
              {phase !== 'summary' && (
                <>
                  {/* Description */}
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', margin: 0 }}>
                    Importing from CSV lets you add or update users in bulk, so you can onboard entire project teams
                    quickly or delegate setup to someone else without needing to do it one-by-one.
                  </p>

                  {/* Download template link */}
                  {phase === 'idle' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <DownloadIcon />
                      <button
                        onClick={downloadTemplate}
                        style={{
                          fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
                          color: '#1890FF', textDecoration: 'underline',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                          transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        Download Import Template
                      </button>
                    </div>
                  )}

                  {/* Dropzone */}
                  {phase === 'idle' && (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => !file && fileInputRef.current?.click()}
                      style={{
                        position: 'relative',
                        borderRadius: 4,
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: isDragging ? '#FFF8F5' : '#FAFAFA',
                        border: `1.111px dashed ${isDragging ? '#FF4D00' : '#D9D9D9'}`,
                        transition: 'background-color 0.15s, border-color 0.15s',
                        cursor: file ? 'default' : 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '1.111px', minHeight: 186 }}>
                        {/* Plus icon */}
                        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <PlusOrangeIcon />
                        </div>

                        {/* Instructions */}
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', textAlign: 'center', margin: 0, flexShrink: 0 }}>
                          Click or drag a CSV to this area to upload<br />
                          or browse CSV file manually
                        </p>

                        {/* Browse button */}
                        <button
                          onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          style={{
                            backgroundColor: '#F2F3F4',
                            border: '1.111px solid #C3C7CC',
                            borderRadius: 4,
                            height: 32,
                            width: 84,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E5E7E9')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F2F3F4')}
                        >
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#616D79' }}>Browse</span>
                        </button>

                        {/* File chip */}
                        {file && (
                          <div
                            style={{ backgroundColor: '#F2F3F4', display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', height: 32, borderRadius: 4 }}
                            onClick={e => e.stopPropagation()}
                          >
                            <CsvFileIcon />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959' }}>
                              {file.name} ({formatSize(file.size)})
                            </span>
                            <button
                              onClick={e => { e.stopPropagation(); setFile(null); }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.15s' }}
                              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                              aria-label="Remove file"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        )}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,text/csv,application/vnd.ms-excel"
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {/* Progress row */}
                  {isInProgress && file && (
                    <ProgressRow
                      filename={file.name}
                      phase={phase as 'uploading' | 'processing'}
                      progress={currentProgress}
                    />
                  )}
                </>
              )}

              {/* ─── SUMMARY ─── */}
              {phase === 'summary' && summary && (
                <>
                  {summary.added > 0 && (
                    <SummaryRow icon={<IconAdded />} text={`${summary.added} user${summary.added !== 1 ? 's' : ''} added successfully`} />
                  )}
                  {summary.updated > 0 && (
                    <SummaryRow icon={<IconUpdated />} text={`${summary.updated} user${summary.updated !== 1 ? 's' : ''} updated`} />
                  )}
                  {summary.duplicates > 0 && (
                    <SummaryRow icon={<IconDuplicate />} text={`${summary.duplicates} duplicate entr${summary.duplicates !== 1 ? 'ies' : 'y'} skipped`} />
                  )}
                  {summary.failed > 0 && (
                    <SummaryRow icon={<IconFailed />} text={`${summary.failed} failed to import (see details in report)`} />
                  )}
                  {summary.invited > 0 && (
                    <SummaryRow icon={<IconInvited />} text={`${summary.invited} Invitation${summary.invited !== 1 ? 's' : ''} Sent`} />
                  )}
                  <ReportDownloadRow filename={summary.reportFilename} onDownload={handleDownloadReport} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            height: 72,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 16,
            paddingRight: 24,
            borderTop: '1.111px solid #C3C7CC',
          }}
        >
          {/* Cancel / Close — Secondary Medium */}
          <button
            onClick={onClose}
            disabled={isInProgress}
            style={{
              backgroundColor: isInProgress ? '#F5F5F5' : '#F2F3F4',
              border: `1px solid ${isInProgress ? '#BFBFBF' : '#C3C7CC'}`,
              borderRadius: 4,
              height: 36,
              padding: '0 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: isInProgress ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s, border-color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!isInProgress) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
              }
            }}
            onMouseLeave={e => {
              if (!isInProgress) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC';
              }
            }}
            onMouseDown={e => {
              if (!isInProgress) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#616D79';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                const span = (e.currentTarget as HTMLButtonElement).querySelector('span');
                if (span) span.style.color = '#FFFFFF';
              }
            }}
            onMouseUp={e => {
              if (!isInProgress) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79';
                const span = (e.currentTarget as HTMLButtonElement).querySelector('span');
                if (span) span.style.color = '#616D79';
              }
            }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: isInProgress ? '#BFBFBF' : '#616D79' }}>
              {phase === 'summary' ? 'Close' : 'Cancel'}
            </span>
          </button>

          {/* Import button — Primary Medium */}
          {phase !== 'summary' && (
            <button
              onClick={canImport ? handleImport : undefined}
              disabled={!canImport}
              style={{
                backgroundColor: canImport ? '#FF4D00' : '#FFBD9C',
                border: 'none',
                borderRadius: 4,
                height: 36,
                padding: '0 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: canImport ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
              onMouseLeave={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
              onMouseDown={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4380D'; }}
              onMouseUp={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#FFFFFF' }}>
                {isInProgress ? 'Importing…' : 'Import'}
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}