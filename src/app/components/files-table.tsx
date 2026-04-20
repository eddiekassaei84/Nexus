import React, {
  useState, useEffect, useRef, useMemo, useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import svgToolbar  from '../../imports/svg-489hpipx3e';
import svgSelBar   from '../../imports/svg-2062azgn1b';
import svgColIcon  from '../../imports/svg-8fwk0tn1pe';
import svgColPanel from '../../imports/svg-8yfr0vll8e';
import svgFigmaPanel from '../../imports/svg-oc4nus65we';
import { MultiSelectDropdown, FormField } from './filter-panel';
import svgActions  from '../../imports/svg-r7j39olk53';
import svgClock    from '../../imports/svg-c2rv7mb72m';

// ─── Types ────────────────────────────────────────────────────────────────────
type FileFormat    = 'PDF'|'DWG'|'RVT'|'XLSX'|'DOCX'|'IFC'|'DXF'|'PNG'|'JPG'|'ZIP'|'CSV'|'PPTX'|'NWD'|'P6';
type FileStatus    = 'Draft'|'Approved'|'Published'|'Archived'|'Superseded'|'Void';
type DocType       = 'Drawing'|'Specification'|'Model'|'BIM Model'|'Report'|'Photo'|'Schedule'|'Contract'|'Calculation'|'Meeting Minutes';
type ProjectPhase  = 'Pre-Design'|'Design'|'Tender'|'Construction'|'Commissioning'|'Handover';
type ReviewStatus  = 'Not Started'|'In Review'|'Approved'|'Rejected'|'On Hold';
type AccessPerm    = 'All Members'|'Team Leaders Only'|'Discipline Only'|'Restricted'|'Confidential';
type SortState     = null | { key: string; dir: 'asc' | 'desc' };
type Density       = 'compact' | 'normal' | 'expanded';

interface FileItem {
  id: number;
  name: string;
  format: FileFormat;
  version: string;
  status: FileStatus;
  type: DocType;
  discipline: string;
  phase: ProjectPhase;
  reviewStatus: ReviewStatus;
  accessPermissions: AccessPerm;
  originator: string;
  author: string;
  createdDate: string;
  modifiedDate: string;
  classificationCode: string;
  projectCode: string;
  spatialLocation: string;
  systemBreakdown: string;
  description: string;
  size: string;
}

interface Column {
  key: string;
  label: string;
  defaultWidth: number;
  sortable: boolean;
  required: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CHECKBOX_W = 48;
const ACTIONS_W  = 64;
const PAGE_SIZE  = 20;
const PANEL_W    = 390;

// ─── Column definitions (18 columns) ─────────────────────────────────────────
const COLUMNS: Column[] = [
  { key: 'name',               label: 'Name',             defaultWidth: 260, sortable: true,  required: true  },
  { key: 'format',             label: 'Format',           defaultWidth: 80,  sortable: true,  required: false },
  { key: 'version',            label: 'Version',          defaultWidth: 80,  sortable: false, required: false },
  { key: 'status',             label: 'Status',           defaultWidth: 120, sortable: true,  required: false },
  { key: 'type',               label: 'Type',             defaultWidth: 140, sortable: true,  required: false },
  { key: 'discipline',         label: 'Discipline',       defaultWidth: 130, sortable: true,  required: false },
  { key: 'phase',              label: 'Phase',            defaultWidth: 130, sortable: true,  required: false },
  { key: 'reviewStatus',       label: 'Review Status',    defaultWidth: 140, sortable: true,  required: false },
  { key: 'accessPermissions',  label: 'Access',           defaultWidth: 160, sortable: true,  required: false },
  { key: 'originator',         label: 'Originator',       defaultWidth: 150, sortable: true,  required: false },
  { key: 'author',             label: 'Author',           defaultWidth: 150, sortable: true,  required: false },
  { key: 'createdDate',        label: 'Created',          defaultWidth: 110, sortable: true,  required: false },
  { key: 'modifiedDate',       label: 'Modified',         defaultWidth: 110, sortable: true,  required: false },
  { key: 'classificationCode', label: 'Class. Code',      defaultWidth: 130, sortable: true,  required: false },
  { key: 'projectCode',        label: 'Project Code',     defaultWidth: 120, sortable: false, required: false },
  { key: 'spatialLocation',    label: 'Location',         defaultWidth: 140, sortable: true,  required: false },
  { key: 'systemBreakdown',    label: 'System',           defaultWidth: 140, sortable: true,  required: false },
  { key: 'size',               label: 'Size',             defaultWidth: 80,  sortable: true,  required: false },
];

const DEFAULT_VISIBLE = new Set<string>([
  'name','format','version','status','type','discipline','phase',
  'reviewStatus','accessPermissions','originator','author','createdDate','modifiedDate',
]);

// ─── Mock Data ────────────────────────────────────────────────────────────────
const FILES_DATA: FileItem[] = [
  { id:1,  name:'Site Plan - Level 00 - Floor Plan',            format:'DWG',  version:'V03', status:'Approved',   type:'Drawing',        discipline:'Architecture',   phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'James Whitfield',  createdDate:'2024-01-15', modifiedDate:'2024-03-22', classificationCode:'A-FL-00-001', projectCode:'INX-2024-001', spatialLocation:'Level 00', systemBreakdown:'Architectural Shell', description:'Ground floor plan showing all rooms and circulation', size:'4.2 MB' },
  { id:2,  name:'Structural Frame - Foundation Layout',          format:'DWG',  version:'V05', status:'Published',  type:'Drawing',        discipline:'Structural',     phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Sarah Chen',       createdDate:'2024-01-20', modifiedDate:'2024-04-10', classificationCode:'S-FN-00-001', projectCode:'INX-2024-001', spatialLocation:'Basement', systemBreakdown:'Foundation System', description:'Foundation layout with pile cap details', size:'6.8 MB' },
  { id:3,  name:'MEP - HVAC Ductwork Layout - Level 01',        format:'RVT',  version:'V02', status:'Draft',      type:'BIM Model',      discipline:'MEP',            phase:'Design',        reviewStatus:'In Review',   accessPermissions:'Discipline Only',   originator:'Jacobs',   author:'Michael Torres',   createdDate:'2024-02-01', modifiedDate:'2024-04-18', classificationCode:'M-HV-01-001', projectCode:'INX-2024-001', spatialLocation:'Level 01', systemBreakdown:'HVAC System', description:'HVAC ductwork coordination model for Level 01', size:'52.3 MB' },
  { id:4,  name:'Project Specification - Division 03 Concrete', format:'DOCX', version:'V01', status:'Draft',      type:'Specification',  discipline:'Structural',     phase:'Tender',        reviewStatus:'Not Started', accessPermissions:'Team Leaders Only', originator:'ARUP',     author:'Emma Johnson',     createdDate:'2024-02-10', modifiedDate:'2024-02-28', classificationCode:'S-SP-00-003', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Concrete Structure', description:'Specification for reinforced concrete works', size:'1.1 MB' },
  { id:5,  name:'Fire Egress Plan - Emergency Exit Routes',     format:'PDF',  version:'V04', status:'Approved',   type:'Drawing',        discipline:'Fire Safety',    phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'Arup Fire','author':'Daniel Park',      createdDate:'2024-02-15', modifiedDate:'2024-05-01', classificationCode:'F-EG-00-001', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Fire Protection', description:'Emergency egress routes and assembly points', size:'2.3 MB' },
  { id:6,  name:'IFC Export - Architectural Model v3',         format:'IFC',  version:'V03', status:'Published',  type:'BIM Model',      discipline:'Architecture',   phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'James Whitfield',  createdDate:'2024-03-01', modifiedDate:'2024-05-10', classificationCode:'A-BM-00-003', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Architectural Shell', description:'Full architectural BIM model for coordination', size:'128.5 MB' },
  { id:7,  name:'Roof Drainage - Plan and Details',            format:'DWG',  version:'V02', status:'Approved',   type:'Drawing',        discipline:'Civil',          phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Sarah Chen',       createdDate:'2024-03-05', modifiedDate:'2024-04-25', classificationCode:'C-DR-RF-001', projectCode:'INX-2024-001', spatialLocation:'Roof', systemBreakdown:'Drainage System', description:'Roof drainage plan with scupper and downpipe details', size:'3.7 MB' },
  { id:8,  name:'Cost Plan Report - Stage 3',                  format:'XLSX', version:'V01', status:'Approved',   type:'Report',         discipline:'Cost Management',phase:'Design',        reviewStatus:'Approved',    accessPermissions:'Restricted',        originator:'WT Partnership','author':'Alice Morgan', createdDate:'2024-03-10', modifiedDate:'2024-03-10', classificationCode:'C-RP-00-003', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Project Controls', description:'Stage 3 cost plan with elemental breakdown', size:'890 KB' },
  { id:9,  name:'Lighting Layout - Office Level 03',           format:'DWG',  version:'V02', status:'Draft',      type:'Drawing',        discipline:'Electrical',     phase:'Design',        reviewStatus:'In Review',   accessPermissions:'Discipline Only',   originator:'Jacobs',   author:'Michael Torres',   createdDate:'2024-03-15', modifiedDate:'2024-05-05', classificationCode:'E-LT-03-001', projectCode:'INX-2024-001', spatialLocation:'Level 03', systemBreakdown:'Lighting System', description:'Lighting layout for open-plan office area', size:'2.9 MB' },
  { id:10, name:'Façade System - Curtain Wall Details',        format:'DWG',  version:'V06', status:'Approved',   type:'Drawing',        discipline:'Architecture',   phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Emma Johnson',     createdDate:'2024-01-25', modifiedDate:'2024-05-15', classificationCode:'A-CW-00-001', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Facade System', description:'Curtain wall unitised system assembly details', size:'8.1 MB' },
  { id:11, name:'Geotechnical Investigation Report',           format:'PDF',  version:'V01', status:'Archived',   type:'Report',         discipline:'Geotechnical',   phase:'Pre-Design',    reviewStatus:'Approved',    accessPermissions:'Team Leaders Only', originator:'Douglas Partners','author':'Daniel Park', createdDate:'2023-11-20', modifiedDate:'2024-01-08', classificationCode:'G-IR-00-001', projectCode:'INX-2024-001', spatialLocation:'Site', systemBreakdown:'Substructure', description:'Borehole data and soil classification report', size:'15.4 MB' },
  { id:12, name:'Plumbing Schematic - Hot & Cold Water',       format:'DWG',  version:'V03', status:'Draft',      type:'Drawing',        discipline:'MEP',            phase:'Design',        reviewStatus:'Not Started', accessPermissions:'Discipline Only',   originator:'Jacobs',   author:'Alice Morgan',     createdDate:'2024-04-01', modifiedDate:'2024-05-20', classificationCode:'M-PL-00-001', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Plumbing System', description:'Schematic diagram for hot and cold water distribution', size:'1.8 MB' },
  { id:13, name:'Construction Programme - Detailed Baseline',  format:'P6',   version:'V02', status:'Approved',   type:'Schedule',       discipline:'Project Management',phase:'Construction',reviewStatus:'Approved',    accessPermissions:'Team Leaders Only', originator:'Laing O\'Rourke','author':'James Whitfield', createdDate:'2024-04-10', modifiedDate:'2024-05-25', classificationCode:'P-SC-00-002', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Programme', description:'Detailed P6 construction programme', size:'3.2 MB' },
  { id:14, name:'NWD Navisworks Coordination Model - May 2024', format:'NWD', version:'V05', status:'Published',  type:'BIM Model',      discipline:'BIM',            phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Sarah Chen',       createdDate:'2024-05-01', modifiedDate:'2024-05-28', classificationCode:'B-NW-00-005', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'All Systems', description:'Monthly NWD coordination model - clash detection', size:'247.6 MB' },
  { id:15, name:'Façade Photo Record - March 2024',            format:'ZIP',  version:'V01', status:'Published',  type:'Photo',          discipline:'Architecture',   phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Michael Torres',   createdDate:'2024-03-30', modifiedDate:'2024-03-30', classificationCode:'A-PH-00-003', projectCode:'INX-2024-001', spatialLocation:'External', systemBreakdown:'Facade System', description:'Site photo record of facade installation progress', size:'340 MB' },
  { id:16, name:'Staircase Design - Core A Sections',          format:'DWG',  version:'V04', status:'Approved',   type:'Drawing',        discipline:'Architecture',   phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Emma Johnson',     createdDate:'2024-02-20', modifiedDate:'2024-05-12', classificationCode:'A-ST-CA-001', projectCode:'INX-2024-001', spatialLocation:'Core A', systemBreakdown:'Vertical Circulation', description:'Section drawings for main staircase Core A', size:'5.2 MB' },
  { id:17, name:'Traffic Impact Assessment',                   format:'PDF',  version:'V02', status:'Archived',   type:'Report',         discipline:'Civil',          phase:'Pre-Design',    reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Daniel Park',      createdDate:'2023-10-15', modifiedDate:'2024-01-05', classificationCode:'C-RP-TR-001', projectCode:'INX-2024-001', spatialLocation:'Site', systemBreakdown:'Site Infrastructure', description:'Traffic impact assessment for planning approval', size:'8.9 MB' },
  { id:18, name:'CCTV Layout - Security Camera Positions',     format:'DWG',  version:'V01', status:'Draft',      type:'Drawing',        discipline:'Security',       phase:'Design',        reviewStatus:'Not Started', accessPermissions:'Restricted',        originator:'Jacobs',   author:'Alice Morgan',     createdDate:'2024-05-05', modifiedDate:'2024-05-30', classificationCode:'S-CC-00-001', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Security System', description:'CCTV camera layout and field of view coverage', size:'2.1 MB' },
  { id:19, name:'Acoustic Report - Noise Impact Assessment',   format:'PDF',  version:'V03', status:'Published',  type:'Report',         discipline:'Acoustics',      phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'James Whitfield',  createdDate:'2024-03-20', modifiedDate:'2024-04-30', classificationCode:'A-AC-00-003', projectCode:'INX-2024-001', spatialLocation:'External', systemBreakdown:'Acoustic Performance', description:'External noise assessment and mitigation recommendations', size:'6.3 MB' },
  { id:20, name:'Handover Manual - Operating & Maintenance',   format:'PDF',  version:'V01', status:'Draft',      type:'Report',         discipline:'Facilities',     phase:'Handover',      reviewStatus:'Not Started', accessPermissions:'Team Leaders Only', originator:'ARUP',     author:'Sarah Chen',       createdDate:'2024-05-15', modifiedDate:'2024-06-01', classificationCode:'F-HO-00-001', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'All Systems', description:'Draft O&M manual for building handover', size:'12.7 MB' },
  { id:21, name:'Environmental Impact Assessment',             format:'PDF',  version:'V04', status:'Approved',   type:'Report',         discipline:'Environmental',  phase:'Pre-Design',    reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Michael Torres',   createdDate:'2023-09-15', modifiedDate:'2024-01-15', classificationCode:'E-IA-00-004', projectCode:'INX-2024-001', spatialLocation:'Site', systemBreakdown:'Environmental', description:'Full EIA for planning submission', size:'22.4 MB' },
  { id:22, name:'Substation Layout - HV Distribution',        format:'DWG',  version:'V02', status:'Draft',      type:'Drawing',        discipline:'Electrical',     phase:'Design',        reviewStatus:'In Review',   accessPermissions:'Restricted',        originator:'Jacobs',   author:'Emma Johnson',     createdDate:'2024-04-20', modifiedDate:'2024-05-22', classificationCode:'E-SS-00-002', projectCode:'INX-2024-001', spatialLocation:'Basement', systemBreakdown:'High Voltage', description:'HV substation layout and cable routing', size:'3.4 MB' },
  { id:23, name:'Presentation Slides - Design Review April',  format:'PPTX', version:'V01', status:'Archived',   type:'Report',         discipline:'Architecture',   phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Daniel Park',      createdDate:'2024-04-05', modifiedDate:'2024-04-05', classificationCode:'A-PR-00-004', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Project Management', description:'Slides for April design review workshop', size:'18.2 MB' },
  { id:24, name:'Survey Point Cloud - Site Topography',       format:'ZIP',  version:'V01', status:'Published',  type:'Model',          discipline:'Civil',          phase:'Pre-Design',    reviewStatus:'Approved',    accessPermissions:'Team Leaders Only', originator:'Douglas Partners','author':'Alice Morgan', createdDate:'2023-12-01', modifiedDate:'2024-01-10', classificationCode:'C-SV-00-001', projectCode:'INX-2024-001', spatialLocation:'Site', systemBreakdown:'Site Infrastructure', description:'LiDAR point cloud survey data for site', size:'1.2 GB' },
  { id:25, name:'Waterproofing Spec - Basement Tanking',      format:'DOCX', version:'V02', status:'Approved',   type:'Specification',  discipline:'Structural',     phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'James Whitfield',  createdDate:'2024-03-25', modifiedDate:'2024-05-08', classificationCode:'S-WP-BM-002', projectCode:'INX-2024-001', spatialLocation:'Basement', systemBreakdown:'Waterproofing', description:'Basement waterproofing specification and details', size:'980 KB' },
  { id:26, name:'Waste Management Plan',                      format:'PDF',  version:'V01', status:'Approved',   type:'Report',         discipline:'Environmental',  phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Sarah Chen',       createdDate:'2024-04-15', modifiedDate:'2024-04-15', classificationCode:'E-WM-00-001', projectCode:'INX-2024-001', spatialLocation:'Site', systemBreakdown:'Environmental', description:'Site waste management plan and recycling targets', size:'1.5 MB' },
  { id:27, name:'Lift Shaft Coordination Drawing - Core B',   format:'DWG',  version:'V03', status:'Published',  type:'Drawing',        discipline:'Architecture',   phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Michael Torres',   createdDate:'2024-02-28', modifiedDate:'2024-05-18', classificationCode:'A-LF-CB-003', projectCode:'INX-2024-001', spatialLocation:'Core B', systemBreakdown:'Vertical Transportation', description:'Lift shaft coordination with structural and MEP', size:'4.6 MB' },
  { id:28, name:'Fire Protection Calculation Report',         format:'PDF',  version:'V02', status:'Published',  type:'Calculation',    discipline:'Fire Safety',    phase:'Design',        reviewStatus:'Approved',    accessPermissions:'Team Leaders Only', originator:'Arup Fire','author':'Emma Johnson',     createdDate:'2024-03-08', modifiedDate:'2024-04-22', classificationCode:'F-CA-00-002', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Fire Protection', description:'Hydraulic calculations for sprinkler system', size:'2.8 MB' },
  { id:29, name:'Meeting Minutes - Design Coordination #12',  format:'DOCX', version:'V01', status:'Published',  type:'Meeting Minutes', discipline:'Project Management',phase:'Design',      reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Daniel Park',      createdDate:'2024-05-08', modifiedDate:'2024-05-08', classificationCode:'P-MM-00-012', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Project Management', description:'Design coordination meeting minutes - Issue 12', size:'340 KB' },
  { id:30, name:'Structural Calculation - Column Schedule',   format:'PDF',  version:'V04', status:'Approved',   type:'Calculation',    discipline:'Structural',     phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'SKM',      author:'Alice Morgan',     createdDate:'2024-02-22', modifiedDate:'2024-05-02', classificationCode:'S-CA-00-004', projectCode:'INX-2024-001', spatialLocation:'All Levels', systemBreakdown:'Column System', description:'Column sizing calculations with load schedule', size:'3.1 MB' },
  { id:31, name:'Facade DXF Export for Manufacturing',       format:'DXF',  version:'V02', status:'Published',  type:'Drawing',        discipline:'Architecture',   phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'James Whitfield',  createdDate:'2024-05-12', modifiedDate:'2024-05-29', classificationCode:'A-CW-EX-002', projectCode:'INX-2024-001', spatialLocation:'External', systemBreakdown:'Facade System', description:'DXF export for facade panel manufacturer', size:'9.2 MB' },
  { id:32, name:'Render - Lobby Interior View',              format:'PNG',  version:'V02', status:'Approved',   type:'Photo',          discipline:'Architecture',   phase:'Design',        reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Sarah Chen',       createdDate:'2024-04-28', modifiedDate:'2024-04-28', classificationCode:'A-VZ-LB-002', projectCode:'INX-2024-001', spatialLocation:'Level 00', systemBreakdown:'Interior', description:'Photorealistic render of lobby interior', size:'42.1 MB' },
  { id:33, name:'Employer\'s Requirements - BIM Protocol',   format:'DOCX', version:'V03', status:'Published',  type:'Specification',  discipline:'BIM',            phase:'Pre-Design',    reviewStatus:'Approved',    accessPermissions:'All Members',       originator:'ARUP',     author:'Michael Torres',   createdDate:'2023-12-15', modifiedDate:'2024-02-05', classificationCode:'B-ER-00-003', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'BIM Management', description:'BIM execution plan and employer requirements', size:'2.4 MB' },
  { id:34, name:'Contract Agreement - Main Works',           format:'PDF',  version:'V01', status:'Published',  type:'Contract',       discipline:'Legal',          phase:'Construction',  reviewStatus:'Approved',    accessPermissions:'Confidential',      originator:'ARUP',     author:'Emma Johnson',     createdDate:'2024-04-01', modifiedDate:'2024-04-01', classificationCode:'L-CA-00-001', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Contract', description:'Signed main works contract agreement', size:'5.7 MB' },
  { id:35, name:'Data Sheet - User Import Template',         format:'CSV',  version:'V01', status:'Approved',   type:'Schedule',       discipline:'Project Management',phase:'Construction',reviewStatus:'Approved',    accessPermissions:'Team Leaders Only', originator:'Laing O\'Rourke','author':'Daniel Park', createdDate:'2024-05-20', modifiedDate:'2024-05-20', classificationCode:'P-DS-00-001', projectCode:'INX-2024-001', spatialLocation:'All', systemBreakdown:'Project Controls', description:'Template for bulk user import into project system', size:'48 KB' },
];

// ─── Colour tables ────────────────────────────────────────────────────────────
const FORMAT_COLORS: Record<FileFormat, { bg: string; text: string; border: string }> = {
  'PDF':  { bg: '#FFF1F0', text: '#CF1322', border: '#FFA39E' },
  'DWG':  { bg: '#E6F7FF', text: '#0050B3', border: '#91D5FF' },
  'RVT':  { bg: '#F9F0FF', text: '#531DAB', border: '#D3ADF7' },
  'XLSX': { bg: '#F6FFED', text: '#237804', border: '#B7EB8F' },
  'DOCX': { bg: '#E6F4FF', text: '#004085', border: '#91C4FF' },
  'IFC':  { bg: '#FFF7E6', text: '#AD4E00', border: '#FFD591' },
  'DXF':  { bg: '#E6F7FF', text: '#0050B3', border: '#BAE7FF' },
  'PNG':  { bg: '#FDF4FF', text: '#9B2FAE', border: '#ECA9FF' },
  'JPG':  { bg: '#FDF4FF', text: '#9B2FAE', border: '#ECA9FF' },
  'ZIP':  { bg: '#F5F5F5', text: '#595959', border: '#D9D9D9' },
  'CSV':  { bg: '#F6FFED', text: '#237804', border: '#B7EB8F' },
  'PPTX': { bg: '#FFF1F0', text: '#AD1A00', border: '#FFBB96' },
  'NWD':  { bg: '#EFF8FF', text: '#175CD3', border: '#BAE7FF' },
  'P6':   { bg: '#FFF7E6', text: '#AD4E00', border: '#FFD591' },
};

const STATUS_COLORS: Record<FileStatus, { bg: string; text: string; dot: string }> = {
  'Draft':      { bg: '#F5F5F5', text: '#595959',  dot: '#8C8C8C' },
  'Approved':   { bg: '#ECFDF3', text: '#027A48',  dot: '#12B76A' },
  'Published':  { bg: '#EFF8FF', text: '#175CD3',  dot: '#6172F3' },
  'Archived':   { bg: '#F5F5F5', text: '#595959',  dot: '#BFBFBF' },
  'Superseded': { bg: '#FFF7ED', text: '#C4320A',  dot: '#EF6820' },
  'Void':       { bg: '#FEF2F2', text: '#B91C1C',  dot: '#EF4444' },
};

const TYPE_COLORS: Record<DocType, { bg: string; text: string }> = {
  'Drawing':        { bg: '#EFF8FF', text: '#175CD3' },
  'Specification':  { bg: '#F5F3FF', text: '#6D28D9' },
  'Model':          { bg: '#FFF7ED', text: '#C4320A' },
  'BIM Model':      { bg: '#FDF4FF', text: '#A21CAF' },
  'Report':         { bg: '#F0FDF4', text: '#166534' },
  'Photo':          { bg: '#FDF4FF', text: '#A21CAF' },
  'Schedule':       { bg: '#FFFBE6', text: '#B45309' },
  'Contract':       { bg: '#FEF2F2', text: '#B91C1C' },
  'Calculation':    { bg: '#E0F2FE', text: '#0369A1' },
  'Meeting Minutes':{ bg: '#F3F4F6', text: '#374151' },
};

const PHASE_COLORS: Record<ProjectPhase, { bg: string; text: string }> = {
  'Pre-Design':    { bg: '#F5F5F5', text: '#595959' },
  'Design':        { bg: '#E6F7FF', text: '#1890FF' },
  'Tender':        { bg: '#FFFBE6', text: '#D48806' },
  'Construction':  { bg: '#FFF1F0', text: '#CF1322' },
  'Commissioning': { bg: '#F6FFED', text: '#389E0D' },
  'Handover':      { bg: '#F9F0FF', text: '#531DAB' },
};

const REVIEW_COLORS: Record<ReviewStatus, { bg: string; text: string; dot: string }> = {
  'Not Started': { bg: '#F5F5F5', text: '#595959', dot: '#BFBFBF' },
  'In Review':   { bg: '#E6F7FF', text: '#1890FF', dot: '#40A9FF' },
  'Approved':    { bg: '#F6FFED', text: '#389E0D', dot: '#52C41A' },
  'Rejected':    { bg: '#FFF1F0', text: '#CF1322', dot: '#FF4D4F' },
  'On Hold':     { bg: '#FFF7E6', text: '#D48806', dot: '#FAAD14' },
};

const ACCESS_COLORS: Record<AccessPerm, { bg: string; text: string }> = {
  'All Members':       { bg: '#F6FFED', text: '#389E0D' },
  'Team Leaders Only': { bg: '#E6F7FF', text: '#1890FF' },
  'Discipline Only':   { bg: '#FFF7E6', text: '#D48806' },
  'Restricted':        { bg: '#FFF1F0', text: '#CF1322' },
  'Confidential':      { bg: '#FEF2F2', text: '#B42318' },
};

const AVATAR_COLORS = ['#3B5998','#E4405F','#2D8653','#9B59B6','#E67E22','#1ABC9C','#E74C3C','#34495E','#16A085','#8E44AD'];

// ─── Utility ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function initials(name: string): string {
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '');
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lowerText  = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lowerText.indexOf(lowerQuery, lastIndex);
  while (idx !== -1) {
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(
      <span key={idx} style={{ background: '#FCFE58' }}>{text.slice(idx, idx + query.length)}</span>
    );
    lastIndex = idx + query.length;
    idx = lowerText.indexOf(lowerQuery, lastIndex);
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: AVATAR_COLORS[idx],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      fontFamily: 'Inter, sans-serif', fontSize: size * 0.42,
      fontWeight: 600, color: '#FFFFFF', userSelect: 'none',
    }}>
      {initials(name).toUpperCase()}
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({ checked, indeterminate = false, onChange }: {
  checked: boolean; indeterminate?: boolean; onChange: () => void;
}) {
  const [hov, setHov] = useState(false);
  const bg = (checked || indeterminate)
    ? '#0E70CB'
    : hov ? '#F0F7FF' : '#FFFFFF';
  const border = (checked || indeterminate)
    ? 'none'
    : hov ? '1.5px solid #0E70CB' : '1.5px solid #D0D5DD';
  return (
    <div
      onClick={e => { e.stopPropagation(); onChange(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 16, height: 16, borderRadius: 3,
        background: bg, border,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, transition: 'background 0.1s',
      }}
    >
      {indeterminate && !checked && (
        <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
          <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

// ─── FormatPill ───────────────────────────────────────────────────────────────
function FormatPill({ format }: { format: FileFormat }) {
  const { bg, text, border } = FORMAT_COLORS[format] ?? { bg: '#F5F5F5', text: '#595959', border: '#D9D9D9' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 7px',
      borderRadius: 4, border: `1px solid ${border}`, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {format}
    </span>
  );
}

// ─── VersionPill ──────────────────────────────────────────────────────────────
function VersionPill({ version }: { version: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
      borderRadius: 4, border: '1px solid #91D5FF', background: '#E6F7FF',
      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '18px',
      color: '#1890FF', whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {version}
    </span>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: FileStatus }) {
  const { bg, text, dot } = STATUS_COLORS[status] ?? STATUS_COLORS['Draft'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: 22, padding: '0 7px',
      borderRadius: 9999, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── PhasePill ────────────────────────────────────────────────────────────────
function PhasePill({ phase }: { phase: ProjectPhase }) {
  const { bg, text } = PHASE_COLORS[phase] ?? { bg: '#F5F5F5', text: '#595959' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 7px',
      borderRadius: 4, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {phase}
    </span>
  );
}

// ─── ReviewBadge ─────��────────────────────────────────────────────────────────
function ReviewBadge({ status }: { status: ReviewStatus }) {
  const { bg, text, dot } = REVIEW_COLORS[status] ?? REVIEW_COLORS['Not Started'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: 22, padding: '0 7px',
      borderRadius: 9999, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── AccessPill ───────────────────────────────────────────────────────────────
function AccessPill({ access }: { access: AccessPerm }) {
  const { bg, text } = ACCESS_COLORS[access] ?? { bg: '#F5F5F5', text: '#595959' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 7px',
      borderRadius: 4, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {access}
    </span>
  );
}

// ─── TypeTag ──────────────────────────────────────────────────────────────────
function TypeTag({ type }: { type: DocType }) {
  const { bg, text } = TYPE_COLORS[type] ?? { bg: '#F5F5F5', text: '#3B4A56' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
      borderRadius: 4, background: bg,
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
      color: text, whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {type}
    </span>
  );
}

// ─── MonoCell ─────────────────────────────────────────────────────────────────
function MonoCell({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'monospace', fontSize: 12, color: '#4C5A67',
      paddingLeft: 8, overflow: 'hidden', textOverflow: 'ellipsis',
      whiteSpace: 'nowrap', display: 'block', flex: 1, letterSpacing: '0.02em',
    }}>
      {children}
    </span>
  );
}

// ─── Context Menu ─────────────────────────────────────────────────────────────
function ContextMenu({ x, y, selectedCount, onClose, onDownload, onMove, onCopyLink, onViewHistory, onVoid, onDelete }: {
  x: number; y: number; selectedCount: number; onClose: () => void;
  onDownload: () => void; onMove: () => void; onCopyLink: () => void;
  onViewHistory: () => void; onVoid: () => void; onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', esc); };
  }, [onClose]);

  // Flip if off-screen
  const vpW = window.innerWidth; const vpH = window.innerHeight;
  const menuW = 210; const menuH = 250;
  const ax = x + menuW > vpW ? x - menuW : x;
  const ay = y + menuH > vpH ? y - menuH : y;

  const item = (icon: React.ReactNode, label: string, onClick: () => void, danger = false) => (
    <div
      key={label}
      onClick={() => { onClick(); onClose(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 34, padding: '0 12px', cursor: 'pointer',
        fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
        color: danger ? '#D92D20' : '#384857',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#F5F5F5'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {icon}
      {label}
    </div>
  );

  return ReactDOM.createPortal(
    <div ref={ref} style={{ position: 'fixed', top: ay, left: ax, zIndex: 9999, background: '#FFFFFF', borderRadius: 6, border: '1px solid #E0E4E8', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: menuW, padding: '4px 0' }}>
      {selectedCount > 1 && <div style={{ padding: '6px 12px 4px', fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{selectedCount} files selected</div>}
      {item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 16L7 11M12 16L17 11M12 16V4" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 20h16" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/></svg>, 'Download', onDownload)}
      {item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h7l2 2h7v13H4V4z" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, 'Move to Folder', onMove)}
      {item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/></svg>, 'Copy Link', onCopyLink)}
      {selectedCount === 1 && item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#616D79" strokeWidth="1.5"/><path d="M12 8v4l3 3" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/></svg>, 'View History', onViewHistory)}
      <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
      {item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18.364 5.636a9 9 0 11-12.728 0M12 3v9" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/></svg>, 'Void', onVoid)}
      {item(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={svgSelBar.p4d85200} stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, 'Delete', onDelete, true)}
    </div>,
    document.body
  );
}

// ─── ResizeHandle (§7.A.7) ────────────────────────────────────────────────────
function ResizeHandle({ colKey, onDelta, cellHovered = false }: {
  colKey: string; onDelta: (key: string, delta: number) => void; cellHovered?: boolean;
}) {
  const [active,        setActive]        = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);
  const startX = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    startX.current = e.clientX;
    setActive(true);
    const move = (mv: MouseEvent) => { onDelta(colKey, mv.clientX - startX.current); startX.current = mv.clientX; };
    const up   = () => { setActive(false); window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const lineColor = active || handleHovered ? '#4D7CFE'
    : cellHovered ? '#9CA4AE'
    : 'transparent';

  return (
    <div
      style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 7, cursor: 'col-resize', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false}
      onDragStart={e => e.preventDefault()}
    >
      <div style={{ height: '100%', width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── SortArrows ───────────────────────────────────────────────────────────────
function SortArrows({ dir }: { dir: 'asc' | 'desc' | null }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 4L5 7h6L8 4z"   fill={dir === 'asc'  ? '#4D7CFE' : '#C4CAD1'} />
      <path d="M8 12L5 9h6L8 12z" fill={dir === 'desc' ? '#4D7CFE' : '#C4CAD1'} />
    </svg>
  );
}

// ─── HeaderCell (§7.A.6) ──────────────────────────────────────────────────────
function HeaderCell({ col, sortState, onSort, onDelta, showResize }: {
  col: Column; sortState: SortState;
  onSort: (key: string) => void;
  onDelta: (key: string, delta: number) => void;
  showResize: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = !!col.sortable && sortState?.key === col.key;

  return (
    <div
      style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        height: '100%', paddingLeft: 8, paddingRight: showResize ? 10 : 8,
        overflow: 'clip', cursor: col.sortable ? 'pointer' : 'default',
        userSelect: 'none',
        background: isHovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onClick={() => col.sortable && onSort(col.key)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{
        fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13,
        color: '#384857', flex: 1, overflow: 'hidden',
        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {col.label}
      </span>
      {col.sortable && (
        <span style={{
          display: 'flex', alignItems: 'center', width: 16, height: 16,
          flexShrink: 0,
          opacity: isActive || isHovered ? 1 : 0,
          transition: 'opacity 0.15s', pointerEvents: 'none',
        }}>
          <SortArrows dir={isActive ? sortState!.dir : null} />
        </span>
      )}
      {showResize && <ResizeHandle colKey={col.key} onDelta={onDelta} cellHovered={isHovered} />}
    </div>
  );
}

// ─── Files Filter Config ──────────────────────────────────────────────────────
interface FileFilterConfig {
  format: string[];
  status: string[];
  type: string[];
  discipline: string[];
  phase: string[];
  reviewStatus: string[];
  accessPermissions: string[];
  originator: string[];
}
const EMPTY_FILTER: FileFilterConfig = { format:[], status:[], type:[], discipline:[], phase:[], reviewStatus:[], accessPermissions:[], originator:[] };

const FILES_FILTER_FIELDS: Array<{ key: keyof FileFilterConfig; label: string; options: string[] }> = [
  { key: 'format',            label: 'Format',             options: ['PDF','DWG','RVT','XLSX','DOCX','IFC','DXF','PNG','ZIP','PPTX','NWD','P6','CSV'] },
  { key: 'status',            label: 'Status',             options: ['Draft','Approved','Published','Archived','Superseded','Void'] },
  { key: 'type',              label: 'Type',               options: ['Drawing','Specification','Model','BIM Model','Report','Photo','Schedule','Contract','Calculation','Meeting Minutes'] },
  { key: 'discipline',        label: 'Discipline',         options: [...new Set(FILES_DATA.map(f => f.discipline))].sort() },
  { key: 'phase',             label: 'Phase',              options: ['Pre-Design','Design','Tender','Construction','Commissioning','Handover'] },
  { key: 'reviewStatus',      label: 'Review Status',      options: ['Not Started','In Review','Approved','Rejected','On Hold'] },
  { key: 'accessPermissions', label: 'Access Permissions', options: ['All Members','Team Leaders Only','Discipline Only','Restricted','Confidential'] },
  { key: 'originator',        label: 'Originator',         options: [...new Set(FILES_DATA.map(f => f.originator))].sort() },
];

// ─── Files Filter Side Panel ──────────────────────────────────────────────────
function FilesFilterPanel({ onClose, config, onApply }: {
  onClose: () => void; config: FileFilterConfig; onApply: (c: FileFilterConfig) => void;
}) {
  const [local, setLocal] = useState<FileFilterConfig>({ ...config });
  useEffect(() => { setLocal({ ...config }); }, [config]);

  const totalSelected = Object.values(local).flat().length;
  const activeCount   = Object.values(local).filter(arr => arr.length > 0).length;
  const setField = (key: keyof FileFilterConfig, val: string[]) =>
    setLocal(prev => ({ ...prev, [key]: val }));

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div style={{ width: PANEL_W, height: '100%', display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderLeft: '1px solid #D9D9D9', overflow: 'hidden' }}>

      {/* Header — 72px total: 71px content + 1px Gray4 bottom border */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736', whiteSpace: 'nowrap' }}>Filter</span>
            {activeCount > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 20, height: 20, padding: '0 5px', borderRadius: 9999, background: '#1890FF', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>
                {totalSelected}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F6F7'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {FILES_FILTER_FIELDS.map((field, idx) => (
            <div key={field.key}>
              <div style={{ paddingBottom: 16 }}>
                <FormField label={field.label} badge={local[field.key].length}>
                  <MultiSelectDropdown
                    value={local[field.key]}
                    options={field.options}
                    onChange={val => setField(field.key, val)}
                    placeholder={`Select ${field.label.toLowerCase()}…`}
                  />
                </FormField>
              </div>
              {idx < FILES_FILTER_FIELDS.length - 1 && (
                <div style={{ height: 1, background: '#F0F0F0', margin: '0 0 12px' }} />
              )}
            </div>
          ))}
          <div style={{ height: 20 }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: 1, background: '#C3C7CC' }} />
        <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
          <button
            onClick={() => setLocal(EMPTY_FILTER)}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: activeCount > 0 ? '#616D79' : '#BFBFBF', background: 'none', border: 'none', cursor: activeCount > 0 ? 'pointer' : 'default', padding: '4px 8px', borderRadius: 4, transition: 'background 0.15s' }}
            onMouseEnter={e => { if (activeCount > 0) (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            Reset All
          </button>
          <button
            onClick={() => { onApply(local); onClose(); }}
            style={{ height: 36, padding: '0 20px', background: '#FF4D00', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', cursor: 'pointer', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}
          >
            Apply{totalSelected > 0 ? ` (${totalSelected})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── File Details Side Panel ──────────────────────────────────────────────────
function FileDetailsPanel({ file, onClose }: { file: FileItem; onClose: () => void }) {
  const meta: [string, React.ReactNode][] = [
    ['Format',       <FormatPill format={file.format} />],
    ['Version',      <VersionPill version={file.version} />],
    ['Status',       <StatusBadge status={file.status} />],
    ['Type',         <TypeTag type={file.type} />],
    ['Discipline',   file.discipline],
    ['Phase',        <PhasePill phase={file.phase} />],
    ['Review',       <ReviewBadge status={file.reviewStatus} />],
    ['Access',       <AccessPill access={file.accessPermissions} />],
    ['Originator',   file.originator],
    ['Author',       <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Avatar name={file.author} size={18} />{file.author}</span>],
    ['Created',      formatDate(file.createdDate)],
    ['Modified',     formatDate(file.modifiedDate)],
    ['Class. Code',  <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#4C5A67' }}>{file.classificationCode}</span>],
    ['Project Code', <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#4C5A67' }}>{file.projectCode}</span>],
    ['Location',     file.spatialLocation],
    ['System',       file.systemBreakdown],
    ['Size',         file.size],
  ];

  return (
    <div style={{ width: PANEL_W, height: '100%', display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderLeft: '1px solid #D9D9D9', overflow: 'hidden' }}>
      {/* Header — 72px total: 71px content + 1px Gray4 bottom border */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736' }}>File Details</span>
        <button onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', transition: 'background 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F6F7'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>
      {/* Body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 0', background: '#FFFFFF' }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#1D2C38', lineHeight: '20px', wordBreak: 'break-word' }}>{file.name}</div>
          <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <StatusBadge status={file.status} />
            <ReviewBadge status={file.reviewStatus} />
          </div>
        </div>
        {file.description && (
          <div style={{ marginBottom: 16, padding: 12, background: '#FFFFFF', borderRadius: 6, border: '1px solid #E0E4E8' }}>
            <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 10, fontWeight: 600, color: '#9CA4AE', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>Description</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#384857', lineHeight: '18px' }}>{file.description}</div>
          </div>
        )}
        <div style={{ borderRadius: 6, border: '1px solid #E0E4E8', overflow: 'hidden', marginBottom: 20 }}>
          {meta.map(([label, value], i) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', minHeight: 38, padding: '6px 12px', background: '#FFFFFF', borderBottom: i < meta.length - 1 ? '1px solid #F0F0F0' : 'none', gap: 10 }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#9CA4AE', width: 88, flexShrink: 0 }}>{label as string}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#384857', flex: 1, minWidth: 0 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Footer — Download Secondary §15.2, no Share */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #C3C7CC' }}>
        <div style={{ display: 'flex', height: 60, padding: '0 20px', alignItems: 'center' }}>
          <button
            style={{ flex: 1, height: 36, background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#E5E7E9'; b.style.borderColor = '#616D79'; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#F2F3F4'; b.style.borderColor = '#C3C7CC'; }}
            onMouseDown={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#616D79'; b.style.color = '#FFFFFF'; b.style.borderColor = '#616D79'; }}
            onMouseUp={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#E5E7E9'; b.style.color = '#616D79'; b.style.borderColor = '#616D79'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 16L7 11M12 16L17 11M12 16V4" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 20h16" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bulk Edit Panel ──────────────────────────────────────────────────────────
function FilesBulkEditPanel({ selectedIds, files, onClose, onSave }: {
  selectedIds: Set<number>; files: FileItem[]; onClose: () => void; onSave: (u: Partial<FileItem>) => void;
}) {
  const [status,       setStatus]       = useState('');
  const [discipline,   setDiscipline]   = useState('');
  const [phase,        setPhase]        = useState('');
  const [reviewStatus, setReviewStatus] = useState('');
  const [access,       setAccess]       = useState('');

  const disciplines = [...new Set(FILES_DATA.map(f => f.discipline))].sort();

  const sel = (val: string, setter: (v: string) => void, opts: string[], label: string) => (
    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38' }}>{label}</label>
      <select value={val} onChange={e => setter(e.target.value)}
        style={{ width: '100%', height: 36, padding: '0 10px', border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
        <option value="">— No Change —</option>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const handleSave = () => {
    const u: Partial<FileItem> = {};
    if (status)       u.status             = status as FileStatus;
    if (discipline)   u.discipline         = discipline;
    if (phase)        u.phase              = phase as ProjectPhase;
    if (reviewStatus) u.reviewStatus       = reviewStatus as ReviewStatus;
    if (access)       u.accessPermissions  = access as AccessPerm;
    onSave(u);
    onClose();
  };

  return (
    <div style={{ width: PANEL_W, height: '100%', display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderLeft: '1px solid #D9D9D9', overflow: 'hidden' }}>
      {/* Header — 72px total: 71px content + 1px Gray4 bottom border */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <div>
            <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736' }}>Bulk Edit</span>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#616D79', marginTop: 2 }}>{selectedIds.size} files selected</div>
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5F6F7'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sel(status,       setStatus,       ['Draft','Approved','Published','Archived','Superseded','Void'], 'Status')}
        {sel(discipline,   setDiscipline,   disciplines, 'Discipline')}
        {sel(phase,        setPhase,        ['Pre-Design','Design','Tender','Construction','Commissioning','Handover'], 'Phase')}
        {sel(reviewStatus, setReviewStatus, ['Not Started','In Review','Approved','Rejected','On Hold'], 'Review Status')}
        {sel(access,       setAccess,       ['All Members','Team Leaders Only','Discipline Only','Restricted','Confidential'], 'Access Permissions')}
        <div style={{ height: 20 }} />
      </div>
      <div style={{ flexShrink: 0, borderTop: '1px solid #C3C7CC' }}>
        <div style={{ display: 'flex', gap: 8, height: 72, padding: '0 20px', alignItems: 'center' }}>
          <button onClick={onClose}
            style={{ height: 36, padding: '0 16px', background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#616D79', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; }}>
            Cancel
          </button>
          <button onClick={handleSave}
            style={{ flex: 1, height: 36, background: '#FF4D00', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#FFFFFF', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Column Settings Panel ────────────────────────────────────────────────────
function DensityBtn({ pathKey, densityKey, density, onDensity }: { pathKey: string; densityKey: Density; density: Density; onDensity: (d: Density) => void }) {
  const isActive = density === densityKey;
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onDensity(densityKey)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ width: 32, height: 32, borderRadius: 4, border: 'none', background: isActive ? '#E5E7E9' : hov ? '#F0F1F2' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.1s', padding: 5 }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: 'block' }}>
        <path d={(svgFigmaPanel as any)[pathKey]} fill={isActive ? '#243746' : '#616D79'} />
      </svg>
    </button>
  );
}

function FilesColumnSettingsPanel({ anchorRef, visibleCols, onToggle, onClose, density, onDensity, freezeCol, onFreezeCol, onReset }: {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  visibleCols: Set<string>; onToggle: (key: string) => void; onClose: () => void;
  density: Density; onDensity: (d: Density) => void;
  freezeCol: number; onFreezeCol: (n: number) => void;
  onReset: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const r = anchorRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 4, right: window.innerWidth - r.right });
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const click = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener('keydown', esc);
    document.addEventListener('mousedown', click);
    return () => { window.removeEventListener('keydown', esc); document.removeEventListener('mousedown', click); };
  }, [onClose, anchorRef]);

  return ReactDOM.createPortal(
    <div ref={panelRef} style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999, width: 270, height: 600, maxHeight: 'calc(100vh - 80px)', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E0E4E8', boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Column list (scrollable) ── */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {COLUMNS.map(col => {
          const isRequired = !!col.required;
          const isVisible = isRequired || visibleCols.has(col.key);
          return (
            <div
              key={col.key}
              onClick={() => { if (!isRequired) onToggle(col.key); }}
              style={{ position: 'relative', background: '#FFFFFF', height: 48, flexShrink: 0, width: '100%', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8, paddingRight: 4, paddingBottom: 1, boxSizing: 'border-box', cursor: isRequired ? 'default' : 'pointer', opacity: isRequired ? 0.7 : 1 }}
              onMouseEnter={e => { if (!isRequired) e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: '#F3F4F6', pointerEvents: 'none' }} />
              {/* GripDots */}
              <div style={{ opacity: 0.4, flexShrink: 0, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '0 3px' }}>
                <svg width="4" height="13" viewBox="0 0 4 13" fill="none"><path d={svgFigmaPanel.p230df800} fill="#616D79" /></svg>
                <svg width="4" height="13" viewBox="0 0 4 13" fill="none"><path d={svgFigmaPanel.p1843a900} fill="#616D79" /></svg>
              </div>
              {/* Checkbox */}
              <div style={{ flexShrink: 0, width: 18, height: 18, position: 'relative' }}>
                <svg style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  {isVisible
                    ? <path d={svgFigmaPanel.pae529f2} fill={isRequired ? '#D1D5DB' : '#0E70CB'} />
                    : <path d={svgFigmaPanel.p3370a680} fill="#D0D5DD" />
                  }
                </svg>
              </div>
              {/* Label */}
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#262626', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{col.label}</span>
            </div>
          );
        })}
      </div>

      {/* ── Table Density ── */}
      <div style={{ flexShrink: 0, height: 53, borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px 16px 0' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, lineHeight: '19.5px', color: '#384857', whiteSpace: 'nowrap' }}>Table Density</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <DensityBtn pathKey="p32f8f9f0" densityKey="compact" density={density} onDensity={onDensity} />
          <DensityBtn pathKey="p19b84f80" densityKey="normal" density={density} onDensity={onDensity} />
          <DensityBtn pathKey="p20882ef0" densityKey="expanded" density={density} onDensity={onDensity} />
        </div>
      </div>

      {/* ── Freeze up to column ── */}
      <div style={{ flexShrink: 0, height: 49, borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px 16px 0' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, lineHeight: '19.5px', color: '#384857', whiteSpace: 'nowrap' }}>Freeze up to column:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, lineHeight: '21px', color: '#243746', width: 16, textAlign: 'center' }}>{freezeCol}</span>
          {/* − button (fades at 0) */}
          <button
            onClick={() => onFreezeCol(Math.max(0, freezeCol - 1))}
            disabled={freezeCol === 0}
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: freezeCol === 0 ? 'default' : 'pointer', flexShrink: 0, opacity: freezeCol === 0 ? 0.4 : 1, transition: 'opacity 0.15s', padding: '1px 8px', boxSizing: 'border-box' }}
          >
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none"><path d={svgFigmaPanel.p17c7d700} fill="#384857" /></svg>
          </button>
          {/* + button */}
          <button
            onClick={() => onFreezeCol(Math.min(5, freezeCol + 1))}
            disabled={freezeCol === 5}
            style={{ flex: '1 0 0', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: freezeCol === 5 ? 'default' : 'pointer', opacity: freezeCol === 5 ? 0.4 : 1, transition: 'opacity 0.15s', padding: '1px 9px', boxSizing: 'border-box' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={svgFigmaPanel.p14468300} fill="#384857" /></svg>
          </button>
        </div>
      </div>

      {/* ── Reset to Default ── */}
      <div style={{ flexShrink: 0, height: 44, borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 16, paddingTop: 9 }}>
        <button onClick={onReset}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#616D79', textDecoration: 'underline', textDecorationColor: '#C3C7CC', transition: 'color 0.1s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#243746'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#616D79'; }}>
          Reset to Default
        </button>
      </div>
    </div>,
    document.body
  );
}

// ─── Files Selection Action Bar ───────────────────────────────────────────────
function FilesSelectionBar({ count, onBulkEdit, onDelete }: {
  count: number; onBulkEdit: () => void; onDelete: () => void;
}) {
  if (count === 0) return null;
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', background: '#243746', borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.25)', zIndex: 10, whiteSpace: 'nowrap' }}>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#F0F0F0', fontWeight: 400 }}>
        {count} file{count > 1 ? 's' : ''} selected
      </span>
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
      <button onClick={onBulkEdit}
        style={{ display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', background: 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#F0F0F0', transition: 'background 0.1s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d={svgSelBar.p20d6f040} stroke="#F0F0F0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Edit
      </button>
      <button onClick={onDelete}
        style={{ display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', background: 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#FF7A70', transition: 'background 0.1s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,77,0,0.15)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d={svgSelBar.p4d85200} stroke="#FF7A70" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Delete
      </button>
    </div>
  );
}

// ─── Cell value renderer ──────────────────────────────────────────────────────
function CellValue({ col, file, query }: { col: Column; file: FileItem; query: string }) {
  const hl = (s: string) => highlightText(s, query);
  switch (col.key) {
    case 'name':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 8, overflow: 'hidden', flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 500, color: '#1D2C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {hl(file.name)}
          </span>
        </div>
      );
    case 'format':        return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><FormatPill format={file.format} /></div>;
    case 'version':       return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><VersionPill version={file.version} /></div>;
    case 'status':        return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><StatusBadge status={file.status} /></div>;
    case 'type':          return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><TypeTag type={file.type} /></div>;
    case 'discipline':    return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{hl(file.discipline)}</span></div>;
    case 'phase':         return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><PhasePill phase={file.phase} /></div>;
    case 'reviewStatus':  return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><ReviewBadge status={file.reviewStatus} /></div>;
    case 'accessPermissions': return <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center' }}><AccessPill access={file.accessPermissions} /></div>;
    case 'originator':    return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{hl(file.originator)}</span></div>;
    case 'author':        return (
      <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
        <Avatar name={file.author} size={22} />
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hl(file.author)}</span>
      </div>
    );
    case 'createdDate':   return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{formatDate(file.createdDate)}</span></div>;
    case 'modifiedDate':  return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{formatDate(file.modifiedDate)}</span></div>;
    case 'classificationCode': return <MonoCell>{hl(file.classificationCode)}</MonoCell>;
    case 'projectCode':   return <MonoCell>{hl(file.projectCode)}</MonoCell>;
    case 'spatialLocation': return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{hl(file.spatialLocation)}</span></div>;
    case 'systemBreakdown': return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{hl(file.systemBreakdown)}</span></div>;
    case 'size':          return <div style={{ paddingLeft: 8 }}><span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{file.size}</span></div>;
    default: return null;
  }
}

// ─── Main FilesTable ──────────────────────────────────────────────────────────
export function FilesTable() {
  const [files, setFiles]               = useState<FileItem[]>(FILES_DATA);
  const [searchQuery, setSearchQuery]   = useState('');
  const [sortState, setSortState]       = useState<SortState>(null);
  const [selectedIds, setSelectedIds]   = useState<Set<number>>(new Set());
  const [visibleCols, setVisibleCols]   = useState<Set<string>>(DEFAULT_VISIBLE);
  const [colWidths, setColWidths]       = useState<Record<string, number>>(() =>
    Object.fromEntries(COLUMNS.map(c => [c.key, c.defaultWidth]))
  );
  const [page, setPage]                 = useState(1);
  const [showFilter, setShowFilter]     = useState(false);
  const [filterConfig, setFilterConfig] = useState<FileFilterConfig>(EMPTY_FILTER);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [clearHov, setClearHov]         = useState(false);
  const [showColVis, setShowColVis]     = useState(false);
  const [density, setDensity]           = useState<Density>('normal');
  const [freezeCol, setFreezeCol]       = useState(0);
  const [contextMenu, setContextMenu]   = useState<{ x: number; y: number } | null>(null);
  const [detailFile, setDetailFile]     = useState<FileItem | null>(null);
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const colVisBtnRef   = useRef<HTMLButtonElement | null>(null);

  const sidePanelOpen = detailFile !== null || showBulkEdit || showFilter;

  // ── Density row heights
  const DENSITY_ROW_H: Record<Density, number> = { compact: 32, normal: 48, expanded: 60 };
  const rowHeight = DENSITY_ROW_H[density];

  // ── Filtered + sorted
  const filtered = useMemo(() => {
    let r = files;
    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(f =>
        f.name.toLowerCase().includes(q)               ||
        f.discipline.toLowerCase().includes(q)         ||
        f.originator.toLowerCase().includes(q)         ||
        f.author.toLowerCase().includes(q)             ||
        f.classificationCode.toLowerCase().includes(q) ||
        f.projectCode.toLowerCase().includes(q)        ||
        f.spatialLocation.toLowerCase().includes(q)    ||
        f.systemBreakdown.toLowerCase().includes(q)    ||
        f.description.toLowerCase().includes(q)
      );
    }
    // filter
    const keys = Object.keys(filterConfig) as (keyof FileFilterConfig)[];
    for (const k of keys) {
      if (filterConfig[k].length > 0) {
        r = r.filter(f => filterConfig[k].includes((f as Record<string, unknown>)[k] as string));
      }
    }
    // sort
    if (sortState) {
      const { key, dir } = sortState;
      r = [...r].sort((a, b) => {
        const av = (a as Record<string, unknown>)[key] as string ?? '';
        const bv = (b as Record<string, unknown>)[key] as string ?? '';
        const cmp = av.localeCompare(bv);
        return dir === 'asc' ? cmp : -cmp;
      });
    }
    return r;
  }, [files, searchQuery, filterConfig, sortState]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage    = Math.min(page, totalPages);
  const pageFiles  = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  // ── Pagination chips
  const pageNums = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr: (number | '...')[] = [1];
    if (curPage > 3) arr.push('...');
    for (let i = Math.max(2, curPage - 1); i <= Math.min(totalPages - 1, curPage + 1); i++) arr.push(i);
    if (curPage < totalPages - 2) arr.push('...');
    arr.push(totalPages);
    return arr;
  }, [totalPages, curPage]);

  const showClear    = searchQuery.length > 0;
  const activeFilters = Object.values(filterConfig).filter(v => v.length > 0).length;

  const allSelected  = pageFiles.length > 0 && pageFiles.every(f => selectedIds.has(f.id));
  const someSelected = !allSelected && pageFiles.some(f => selectedIds.has(f.id));

  const toggleAll = useCallback(() => {
    setSelectedIds(prev => {
      const s = new Set(prev);
      if (allSelected) pageFiles.forEach(f => s.delete(f.id));
      else pageFiles.forEach(f => s.add(f.id));
      return s;
    });
  }, [allSelected, pageFiles]);

  const handleSort = useCallback((key: string) => {
    setSortState(prev => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null;
    });
  }, []);

  const handleResize = useCallback((key: string, delta: number) => {
    setColWidths(prev => {
      const col = COLUMNS.find(c => c.key === key);
      const minW = col ? Math.max(60, col.defaultWidth * 0.5) : 60;
      return { ...prev, [key]: Math.max(minW, (prev[key] ?? 100) + delta) };
    });
  }, []);

  const toggleColVis = useCallback((key: string) => {
    setVisibleCols(prev => {
      const s = new Set(prev);
      s.has(key) ? s.delete(key) : s.add(key);
      return s;
    });
  }, []);

  const handleBulkSave = useCallback((u: Partial<FileItem>) => {
    setFiles(prev => prev.map(f => selectedIds.has(f.id) ? { ...f, ...u } : f));
  }, [selectedIds]);

  const visColList = COLUMNS.filter(c => visibleCols.has(c.key));
  const tableMinW  = CHECKBOX_W + visColList.reduce((a, c) => a + (colWidths[c.key] ?? c.defaultWidth), 0) + ACTIONS_W;

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>

      {/* ── Main canvas ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>

        {/* Section Header */}
        <div style={{ height: 72, background: '#FFFFFF', borderBottom: '1px solid #D9D9D9', display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: '32px', color: '#1D2C38', margin: 0 }}>Files</h1>
        </div>

        {/* Table zone */}
        <div style={{ flex: 1, minHeight: 0, padding: 12, background: '#FFFFFF', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, minHeight: 0, border: '1px solid #D9D9D9', borderRadius: 8, overflow: 'hidden', background: '#FAFAFA', display: 'flex', flexDirection: 'column' }}>

            {/* Toolbar */}
            <div style={{ background: '#FAFAFA', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderBottom: '1px solid #F0F0F0', flexShrink: 0 }}>

              {/* Left: search + filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                {/* Search */}
                <div style={{ position: 'relative', width: 276, height: 36, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  onMouseEnter={() => setSearchHovered(true)} onMouseLeave={() => setSearchHovered(false)}>
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                    <svg width="16" height="16" viewBox="-1 -1 14.6 14.6" fill="none">
                      <path d={svgToolbar.p6a0e00} stroke="#9CA4AE" strokeWidth="1.2" />
                      <path d="M10.2 10.2L13 13" stroke="#9CA4AE" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    ref={searchInputRef} type="text" value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Search files…"
                    style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: `1px solid ${searchFocused ? '#91D5FF' : searchHovered ? '#A8B0BB' : '#D0D5DD'}`, borderRadius: 4, background: '#FFFFFF', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#344054', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' }}
                  />
                  {showClear && (
                    <button onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHov ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}
                      onMouseEnter={() => setClearHov(true)} onMouseLeave={() => setClearHov(false)}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  )}
                </div>

                {/* Filter */}
                <button
                  onClick={() => { setShowFilter(f => { if (!f) { setDetailFile(null); setShowBulkEdit(false); } return !f; }); }}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4, height: 36, padding: '0 16px', borderRadius: 4, border: `1px solid ${(showFilter || activeFilters > 0) ? '#616D79' : '#C3C7CC'}`, background: (showFilter || activeFilters > 0) ? '#616D79' : '#F2F3F4', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: (showFilter || activeFilters > 0) ? '#FFFFFF' : '#616D79', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { if (!showFilter && activeFilters === 0) { (e.currentTarget as HTMLButtonElement).style.background = '#E8EAEC'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#616D79'; } }}
                  onMouseLeave={e => { if (!showFilter && activeFilters === 0) { (e.currentTarget as HTMLButtonElement).style.background = '#F2F3F4'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C3C7CC'; } }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d={svgToolbar.p3877eb00} stroke={(showFilter || activeFilters > 0) ? '#FFFFFF' : '#616D79'} strokeLinejoin="round" strokeWidth="1.25581" />
                  </svg>
                  Filter
                  {activeFilters > 0 && (
                    <span style={{ position: 'absolute', top: -7, right: -7, background: '#FF4D00', color: 'white', width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600 }}>{activeFilters}</span>
                  )}
                </button>
              </div>

              {/* Right: Jobs + Add New File */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Jobs — Secondary Medium §15.2 with Clock04 icon */}
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 16px', border: '1px solid #C3C7CC', borderRadius: 4, background: '#F2F3F4', color: '#616D79', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#E5E7E9'; b.style.borderColor = '#616D79'; }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#F2F3F4'; b.style.borderColor = '#C3C7CC'; }}
                  onMouseDown={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#616D79'; b.style.color = '#FFFFFF'; b.style.borderColor = '#616D79'; }}
                  onMouseUp={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#E5E7E9'; b.style.color = '#616D79'; b.style.borderColor = '#616D79'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16.0001" fill="none" style={{ flexShrink: 0 }}>
                    <path d={svgClock.p28d35500} stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgClock.p37616a00} stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Jobs
                </button>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: 4, height: 36, padding: '0 16px', borderRadius: 4, border: 'none', background: '#FF4D00', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: 'white', cursor: 'pointer', transition: 'background 0.15s', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF4D00'; }}
                  onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.background = '#D4380D'; }}
                  onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FF773E'; }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d={svgToolbar.p5d7ae40} fill="white" />
                  </svg>
                  Add New File
                </button>
              </div>
            </div>

            {/* Scrollable table area */}
            <div style={{ flex: 1, minHeight: 0, overflowX: 'auto', overflowY: 'auto', background: '#FFFFFF' }}>
              <div style={{ minWidth: tableMinW, width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

                {/* Header */}
                <div style={{ display: 'flex', height: 48, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20, flexShrink: 0 }}>
                  <div style={{ width: CHECKBOX_W, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
                    <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  </div>
                  {visColList.map((col, i) => (
                    <div key={col.key} style={{ width: colWidths[col.key] ?? col.defaultWidth, flexShrink: 0, height: '100%' }}>
                      <HeaderCell col={col} sortState={sortState} onSort={handleSort} onDelta={handleResize} showResize={i < visColList.length - 1} />
                    </div>
                  ))}
                  {/* Actions header — sticky right */}
                  <div style={{ width: ACTIONS_W, flexShrink: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', position: 'sticky', right: 0, zIndex: 21, boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
                    <button
                      ref={colVisBtnRef}
                      onClick={() => setShowColVis(v => !v)}
                      title="Column Settings"
                      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0, padding: 0, background: showColVis ? '#616D79' : 'transparent', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (!showColVis) (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = showColVis ? '#616D79' : 'transparent'; }}>
                      <svg width="15" height="14" viewBox="0 0 14.727 13.091" fill="none" style={{ flexShrink: 0 }}>
                        <path d={svgColIcon.p942c180} fill={showColVis ? '#FFFFFF' : '#616D79'} />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Rows */}
                {pageFiles.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#9CA4AE' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" stroke="#D0D5DD" strokeWidth="1.5" strokeLinejoin="round"/><path d="M14 3v6h6" stroke="#D0D5DD" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>No files match your filters</span>
                  </div>
                ) : pageFiles.map((file, ri) => {
                  const isSel    = selectedIds.has(file.id);
                  const isDetail = detailFile?.id === file.id;
                  const rowBg    = isSel ? '#E6F7FF' : isDetail ? '#FFFBE6' : '#FFFFFF';

                  return (
                    <div
                      key={file.id}
                      style={{ display: 'flex', height: rowHeight, borderBottom: '1px solid #F0F0F0', background: rowBg, transition: 'background 0.1s' }}
                      onContextMenu={e => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); if (!selectedIds.has(file.id)) setSelectedIds(prev => { const s = new Set(prev); s.add(file.id); return s; }); }}
                    >
                      {/* Checkbox */}
                      <div style={{ width: CHECKBOX_W, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: rowBg }}>
                        <Checkbox checked={isSel} onChange={() => { setSelectedIds(prev => { const s = new Set(prev); s.has(file.id) ? s.delete(file.id) : s.add(file.id); return s; }); }} />
                      </div>

                      {/* Data cells */}
                      {visColList.map(col => (
                        <div key={col.key} style={{ width: colWidths[col.key] ?? col.defaultWidth, flexShrink: 0, display: 'flex', alignItems: 'center', overflow: 'hidden', background: rowBg }}>
                          <CellValue col={col} file={file} query={searchQuery} />
                        </div>
                      ))}

                      {/* Actions — sticky right, Figma icons */}
                      <div style={{ width: ACTIONS_W, flexShrink: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, position: 'sticky', right: 0, zIndex: 4, background: rowBg, boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
                        {/* Info — opens File Details */}
                        <button
                          title="View details"
                          onClick={() => { setDetailFile(prev => prev?.id === file.id ? null : file); setShowBulkEdit(false); setShowFilter(false); }}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4, color: isDetail ? '#FF4D00' : '#616D79', transition: 'background 0.1s', flexShrink: 0 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}>
                          {/* Figma info icon — svg-r7j39olk53 */}
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <g clipPath="url(#clip-info-row)">
                              <path d={svgActions.p3d2bd500} stroke="currentColor" strokeWidth="0.75" />
                              <path d={svgActions.p106b6900} fill="currentColor" stroke="currentColor" strokeWidth="0.75" />
                              <path d={svgActions.p3237fd00} stroke="currentColor" strokeLinejoin="round" strokeWidth="0.75" />
                            </g>
                            <defs><clipPath id="clip-info-row"><rect fill="white" height="15" width="15" /></clipPath></defs>
                          </svg>
                        </button>
                        {/* Ellipsis — opens context menu */}
                        <button
                          title="More actions"
                          onClick={e => { e.stopPropagation(); setContextMenu({ x: e.clientX, y: e.clientY }); if (!selectedIds.has(file.id)) setSelectedIds(prev => { const s = new Set(prev); s.add(file.id); return s; }); }}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4, color: '#616D79', transition: 'background 0.1s', flexShrink: 0 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E5E7E9'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}>
                          {/* Figma ellipsis icon — svg-r7j39olk53 */}
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d={svgActions.p34d59600} fill="currentColor" />
                            <path d={svgActions.p3f5ba600} fill="currentColor" />
                            <path d={svgActions.peec08c0}  fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            <div style={{ position: 'relative', height: 48, borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0, background: '#FFFFFF' }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#616D79' }}>
                {filtered.length === 0 ? 'No files' : `Showing ${(curPage - 1) * PAGE_SIZE + 1}–${Math.min(curPage * PAGE_SIZE, filtered.length)} of ${filtered.length} files`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={curPage === 1}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: curPage === 1 ? 'not-allowed' : 'pointer', opacity: curPage === 1 ? 0.4 : 1, color: '#384857' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {pageNums.map((n, i) => n === '...'
                  ? <span key={`e${i}`} style={{ width: 32, textAlign: 'center', fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#616D79' }}>…</span>
                  : <button key={n} onClick={() => setPage(n as number)}
                      style={{ width: 32, height: 32, border: '1px solid #D0D5DD', borderRadius: 4, background: curPage === n ? '#FF4D00' : '#FFFFFF', color: curPage === n ? '#FFFFFF' : '#384857', fontFamily: 'Outfit, sans-serif', fontSize: 14, cursor: 'pointer', fontWeight: curPage === n ? 600 : 400, transition: 'background 0.1s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {n}
                    </button>
                )}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={curPage === totalPages}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', cursor: curPage === totalPages ? 'not-allowed' : 'pointer', opacity: curPage === totalPages ? 0.4 : 1, color: '#384857' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              {/* Floating selection bar */}
              <FilesSelectionBar
                count={selectedIds.size}
                onBulkEdit={() => { setShowBulkEdit(true); setDetailFile(null); setShowFilter(false); }}
                onDelete={() => { setFiles(prev => prev.filter(f => !selectedIds.has(f.id))); setSelectedIds(new Set()); setDetailFile(null); }}
              />
            </div>

          </div>{/* end table card */}
        </div>{/* end table zone */}
      </div>{/* end main canvas */}

      {/* ── Side Panel (0 → 390px animated push) ── */}
      <div style={{ flexShrink: 0, width: sidePanelOpen ? PANEL_W : 0, overflow: 'hidden', transition: 'width 0.26s cubic-bezier(0.4,0,0.2,1)', height: '100%' }}>
        {detailFile && <FileDetailsPanel file={detailFile} onClose={() => setDetailFile(null)} />}
        {showBulkEdit && !detailFile && (
          <FilesBulkEditPanel selectedIds={selectedIds} files={files} onClose={() => setShowBulkEdit(false)} onSave={handleBulkSave} />
        )}
        {showFilter && !detailFile && !showBulkEdit && (
          <FilesFilterPanel
            config={filterConfig}
            onClose={() => setShowFilter(false)}
            onApply={cfg => { setFilterConfig(cfg); setPage(1); }}
          />
        )}
      </div>

      {/* ── Portalled overlays ── */}
      {showColVis && (
        <FilesColumnSettingsPanel
          anchorRef={colVisBtnRef}
          visibleCols={visibleCols}
          onToggle={toggleColVis}
          onClose={() => setShowColVis(false)}
          density={density}
          onDensity={setDensity}
          freezeCol={freezeCol}
          onFreezeCol={setFreezeCol}
          onReset={() => { setVisibleCols(new Set(DEFAULT_VISIBLE)); setDensity('normal'); setFreezeCol(0); }}
        />
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x} y={contextMenu.y} selectedCount={selectedIds.size}
          onClose={() => setContextMenu(null)}
          onDownload={() => {}}
          onMove={() => {}}
          onCopyLink={() => {}}
          onViewHistory={() => {}}
          onVoid={() => { setFiles(prev => prev.map(f => selectedIds.has(f.id) ? { ...f, status: 'Void' } : f)); setContextMenu(null); }}
          onDelete={() => { setFiles(prev => prev.filter(f => !selectedIds.has(f.id))); setSelectedIds(new Set()); setDetailFile(null); setContextMenu(null); }}
        />
      )}
    </div>
  );
}
