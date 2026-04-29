import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import svgPathsClose from '../../imports/svg-uayoveoicl';
import summaryIcons from '../../imports/svg-hjxz06n11w';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'confirming' | 'uploading' | 'processing' | 'summary';

interface RoleChild {
  id: string; name: string; code: string; description: string;
  trade: string | null;
}
interface RoleGroup {
  id: string; name: string; code: string; description: string; children: RoleChild[];
}

interface SummaryData {
  imported: number;
  failed: number;
  reportCSV: string;
  reportFilename: string;
}

// ─── File parsing ─────────────────────────────────────────────────────────────
function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };

  const splitLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes) {
        result.push(cur.trim()); cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  };

  return { headers: splitLine(lines[0]), rows: lines.slice(1).map(splitLine) };
}

async function readFileAsTable(file: File): Promise<{ headers: string[]; rows: string[][] }> {
  const isExcel =
    /\.(xlsx|xls)$/i.test(file.name) ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel';

  if (isExcel) {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as string[][];
    if (!data.length) return { headers: [], rows: [] };
    return { headers: data[0].map(String), rows: data.slice(1).map(r => r.map(String)) };
  }

  return parseCSV(await file.text());
}

// ─── Role parser ──────────────────────────────────────────────────────────────
function parseIntoRoles(
  headers: string[],
  rows: string[][],
): { groups: RoleGroup[]; imported: number; failed: number; reportRows: string[][] } {
  const colIdx = (pattern: RegExp) => headers.findIndex(h => pattern.test(h.trim()));

  const rIdx = colIdx(/role.?name/i) >= 0 ? colIdx(/role.?name/i) : colIdx(/^name$/i) >= 0 ? colIdx(/^name$/i) : 0;
  const cIdx = colIdx(/^code$/i);
  const dIdx = colIdx(/desc|note/i);

  const get = (row: string[], idx: number) => (idx >= 0 && row[idx] !== undefined ? row[idx].trim() : '');

  const reportRows: string[][] = [];
  let failed = 0;
  let imported = 0;

  const group: RoleGroup = {
    id: `imp_roles_${Date.now()}`,
    name: 'Roles',
    code: 'ROLES',
    description: '',
    children: [],
  };

  let cCounter = 0;
  for (const row of rows) {
    const roleName = get(row, rIdx);
    if (!roleName) {
      failed++;
      reportRows.push([...row, 'Failed — Missing Name']);
      continue;
    }
    group.children.push({
      id: `imp_c_${cCounter++}_${Date.now()}`,
      name: roleName,
      code: get(row, cIdx),
      description: get(row, dIdx),
      trade: null,
    });
    imported++;
    reportRows.push([...row, 'Imported Successfully']);
  }

  return { groups: group.children.length > 0 ? [group] : [], imported, failed, reportRows };
}

function buildReportCSV(
  headers: string[],
  reportRows: string[][],
  filename: string,
): { csv: string; name: string } {
  const effectiveHeaders = headers.length > 0 ? headers : ['Name', 'Code', 'Note'];
  const escape = (v: string) =>
    v.includes(',') || v.includes('"') || v.includes('\n') ? `"${v.replace(/"/g, '""')}"` : v;
  const allHeaders = [...effectiveHeaders, 'Import Status'];
  const csv = [allHeaders, ...reportRows]
    .map(r => r.map(c => escape(String(c))).join(','))
    .join('\n');
  const baseName = filename.replace(/\.(csv|xlsx|xls)$/i, '');
  return { csv, name: `${baseName}_import_report.csv` };
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
            aria-label="Download full import report CSV"
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: '22px', color: '#3B82F6', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Download Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function downloadRolesTemplate() {
  const a = document.createElement('a');
  a.href = '/sample-imports/Roles_Import_Sample.xlsx';
  a.download = 'Roles_Import_Sample.xlsx';
  a.click();
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ImportRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (groups: RoleGroup[]) => void;
  projectName?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ImportRolesModal({
  isOpen,
  onClose,
  onImport,
  projectName = 'Cleveland Hospital',
}: ImportRolesModalProps) {
  const [phase,           setPhase]           = useState<Phase>('idle');
  const [file,            setFile]            = useState<File | null>(null);
  const [isDragging,      setIsDragging]      = useState(false);
  const [parsedData,      setParsedData]      = useState<{ headers: string[]; rows: string[][] }>({ headers: [], rows: [] });
  const [uploadProgress,  setUploadProgress]  = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [summary,         setSummary]         = useState<SummaryData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Typed confirmation state
  const [confirmTyped,   setConfirmTyped]   = useState('');
  const [confirmFocused, setConfirmFocused] = useState(false);
  const confirmInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle'); setFile(null); setIsDragging(false);
      setParsedData({ headers: [], rows: [] }); setUploadProgress(0);
      setProcessProgress(0); setSummary(null); setConfirmTyped('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && !isInProgress) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  // Auto-focus typed input when entering confirming phase
  useEffect(() => {
    if (phase === 'confirming') {
      setConfirmTyped('');
      setTimeout(() => confirmInputRef.current?.focus(), 50);
    }
  }, [phase]);

  // Upload progress simulation
  useEffect(() => {
    if (phase !== 'uploading') return;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 8 + 4, 100);
      setUploadProgress(Math.round(p));
      if (p >= 100) { clearInterval(iv); setProcessProgress(0); setPhase('processing'); }
    }, 100);
    return () => clearInterval(iv);
  }, [phase]);

  // Processing phase — actually parse + call onImport
  useEffect(() => {
    if (phase !== 'processing') return;
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 7 + 5, 100);
      setProcessProgress(Math.round(p));
      if (p >= 100) {
        clearInterval(iv);

        const { groups, imported, failed, reportRows } = parseIntoRoles(parsedData.headers, parsedData.rows);
        const { csv, name } = buildReportCSV(parsedData.headers, reportRows, file?.name ?? 'import');

        // Actually replace the roles in the table
        if (groups.length > 0) {
          onImport(groups);
        }

        setSummary({ imported, failed, reportCSV: csv, reportFilename: name });
        setPhase('summary');
      }
    }, 90);
    return () => clearInterval(iv);
  }, [phase, parsedData, file, onImport]);

  const handleFileSelect = useCallback((f: File | null) => {
    if (!f) return;
    const isValid =
      /\.(csv|xlsx|xls)$/i.test(f.name) ||
      f.type === 'text/csv' ||
      f.type === 'application/vnd.ms-excel' ||
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (isValid) setFile(f);
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
    let parsed = { headers: [] as string[], rows: [] as string[][] };
    try { parsed = await readFileAsTable(file); } catch { /* ignore */ }
    setParsedData(parsed);
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

  const isInProgress = phase === 'uploading' || phase === 'processing';
  const currentProgress = phase === 'uploading' ? uploadProgress : processProgress;
  const canImport    = !!file && !isInProgress;
  const confirmMatch = confirmTyped.toLowerCase() === 'import';

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: '26px', color: '#1D2C38', margin: 0, whiteSpace: 'nowrap' }}>
                  {phase === 'summary'
                    ? `Import Summary — ${projectName}`
                    : `Import roles to '${projectName}'`}
                </p>
                {!isInProgress && (
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, borderRadius: 40 }}
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

            {/* ── Body ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* ─── IDLE / IN-PROGRESS / CONFIRMING ─── */}
              {phase !== 'summary' && (
                <>
                  {/* Description — shown in idle and confirming */}
                  {(phase === 'idle' || phase === 'confirming') && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', margin: 0 }}>
                      Importing a CSV or Excel file will replace all existing project roles with the data in the uploaded file.
                      {' '}Your file must include the required first column: <strong style={{ fontWeight: 600, color: '#1D2C38' }}>Name</strong>. <strong style={{ fontWeight: 600, color: '#1D2C38' }}>Code</strong> and <strong style={{ fontWeight: 600, color: '#1D2C38' }}>Note</strong> are optional.
                    </p>
                  )}

                  {/* Download template link */}
                  {phase === 'idle' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5.99 }}>
                      <DownloadIcon />
                      <button
                        onClick={downloadRolesTemplate}
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#1890FF', textDecoration: 'underline', textAlign: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.15s' }}
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
                      style={{ position: 'relative', borderRadius: 4, width: '100%', overflow: 'hidden', backgroundColor: isDragging ? '#FFF8F5' : '#FAFAFA', border: `1.111px dashed ${isDragging ? '#FF4D00' : '#D9D9D9'}`, transition: 'background-color 0.15s, border-color 0.15s', cursor: file ? 'default' : 'pointer' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '1.111px', minHeight: 186 }}>
                        <div style={{ position: 'relative', flexShrink: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <PlusOrangeIcon />
                        </div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', textAlign: 'center', margin: 0, flexShrink: 0 }}>
                          Click or drag a CSV or Excel file to this area to upload<br />
                          or browse for a file manually
                        </p>
                        <button
                          onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          style={{ backgroundColor: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, height: 32, paddingLeft: 16, paddingRight: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background-color 0.15s, border-color 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; }}
                        >
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#616D79' }}>Browse</span>
                        </button>

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
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 1, transition: 'opacity 0.15s' }}
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
                        accept=".csv,.xlsx,.xls,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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

                  {/* ─── CONFIRMING phase — warning + typed confirmation ─── */}
                  {phase === 'confirming' && file && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {/* File chip */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', backgroundColor: '#F2F3F4', borderRadius: 4, border: '1px solid #D9D9D9' }}>
                        <CsvFileIcon />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '20px', color: '#595959', flex: 1 }}>
                          {file.name} ({formatSize(file.size)})
                        </span>
                        <button
                          onClick={() => { setFile(null); setPhase('idle'); }}
                          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 1, transition: 'opacity 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      {/* Warning banner */}
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: '#FFF2F0', border: '1px solid #FFA39E', borderRadius: 6 }}>
                        <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: '#FEF3F2', border: '1px solid #FFA39E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
                            <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 0 0 2.908 18h14.184a1.75 1.75 0 0 0 1.515-2.5L11.515 2.929a1.75 1.75 0 0 0-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '22px', color: '#B91C1C', margin: '0 0 4px' }}>
                            This will completely replace all current roles
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#7F1D1D', margin: 0 }}>
                            All existing roles will be <strong style={{ fontWeight: 600 }}>permanently deleted</strong> and replaced with the contents of <strong style={{ fontWeight: 600 }}>{file.name}</strong>. This action cannot be reversed.
                          </p>
                        </div>
                      </div>

                      {/* Typed confirmation input */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                          Type <strong style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1D2C38' }}>import</strong> to confirm
                        </label>
                        <input
                          ref={confirmInputRef}
                          type="text"
                          value={confirmTyped}
                          onChange={e => setConfirmTyped(e.target.value)}
                          placeholder="import"
                          autoComplete="off"
                          spellCheck={false}
                          onFocus={() => setConfirmFocused(true)}
                          onBlur={() => setConfirmFocused(false)}
                          style={{
                            height: 36,
                            paddingLeft: 10, paddingRight: 10,
                            border: `1px solid ${confirmMatch ? '#B7EB8F' : confirmFocused ? '#91D5FF' : '#D0D5DD'}`,
                            borderRadius: 4,
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: 14, fontWeight: 400, lineHeight: '20px',
                            color: '#344054',
                            background: '#FFFFFF',
                            outline: 'none',
                            boxSizing: 'border-box',
                            width: '100%',
                            transition: 'border-color 0.15s',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ─── SUMMARY ─── */}
              {phase === 'summary' && summary && (
                <>
                  {summary.imported > 0 && (
                    <SummaryRow
                      icon={<IconAdded />}
                      text={`${summary.imported} role${summary.imported !== 1 ? 's' : ''} imported successfully`}
                    />
                  )}
                  {summary.failed > 0 && (
                    <SummaryRow
                      icon={<IconFailed />}
                      text={`${summary.failed} row${summary.failed !== 1 ? 's' : ''} failed to import (see report for details)`}
                    />
                  )}
                  {summary.imported === 0 && summary.failed === 0 && (
                    <SummaryRow icon={<IconAdded />} text="No roles were found in the file." />
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
            backgroundColor: '#F5F5F5',
            height: 72,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
            paddingRight: 24,
            borderTop: '1px solid #C3C7CC',
          }}
        >
          {/* Summary phase: Close (Secondary) */}
          {phase === 'summary' && (
            <button
              onClick={onClose}
              style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#616D79', whiteSpace: 'nowrap', transition: 'background-color 0.15s, border-color 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; }}
            >
              Close
            </button>
          )}

          {/* Idle phase: Import (Primary) */}
          {phase === 'idle' && (
            <button
              onClick={canImport ? () => setPhase('confirming') : undefined}
              disabled={!canImport}
              style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: canImport ? '#FF4D00' : '#FFBD9C', border: 'none', borderRadius: 4, cursor: canImport ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background-color 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
              onMouseLeave={e => { if (canImport) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF4D00'; }}
            >
              Import
            </button>
          )}

          {/* Confirming phase: Back (Secondary) + Confirm Import (Primary) */}
          {phase === 'confirming' && (
            <>
              <button
                onClick={() => setPhase('idle')}
                style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#616D79', whiteSpace: 'nowrap', transition: 'background-color 0.15s, border-color 0.15s', flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E5E7E9'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; }}
              >
                ← Back
              </button>
              <button
                onClick={confirmMatch ? handleImport : undefined}
                disabled={!confirmMatch}
                style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: confirmMatch ? '#FF4D00' : '#FFBD9C', border: 'none', borderRadius: 4, cursor: confirmMatch ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background-color 0.15s', flexShrink: 0 }}
                onMouseEnter={e => { if (confirmMatch) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF773E'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = confirmMatch ? '#FF4D00' : '#FFBD9C'; }}
              >
                Confirm Import
              </button>
            </>
          )}

          {/* Uploading/Processing */}
          {isInProgress && (
            <button
              disabled
              style={{ height: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: '#FFBD9C', border: 'none', borderRadius: 4, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Importing…
            </button>
          )}
        </div>
      </div>
    </>
  );
}