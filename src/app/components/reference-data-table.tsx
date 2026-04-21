import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import svgPaths from '../../imports/svg-hvnufn483u';
import trashPaths from '../../imports/svg-fjqvq36uqo';
import siblingPaths from '../../imports/svg-dwr8dix3rb';
import childPaths from '../../imports/svg-p3h938sv9m';
import chevronDownPaths from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';
import flatListPaths from '../../imports/svg-nyr7fyunsb';
import hierarchyPaths from '../../imports/svg-a562f27wh3';
import { FlatRefTable, refItemsToFlatGroups } from './flat-ref-table';
import type { FlatGroup, FlatRefTableHandle } from './flat-ref-table';
import { ImportRefDataModal, downloadRefDataTemplate } from './import-refdata-modal';
import { ExportRefDataModal } from './export-refdata-modal';
const P_PLUS_VERTICAL = 'M10.9998 5.82818e-08L10.9998 22';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface RefItem {
  id: string;
  code: string;
  name: string;
  xwalkId?: string;
  description: string;
  children: RefItem[];
}

interface RefTab {
  id: string;
  label: string;
  items: RefItem[];
  builtIn: boolean;
  structureType?: StructureType;
}

type StructureType = 'flat' | 'hierarchy';

type SortKey = 'code' | 'name' | 'description';
type SortDir = 'asc' | 'desc';
interface SortState { key: SortKey; dir: SortDir; }

type DragItem = { itemId: string; parentId: string | null; label: string; };
type DropTarget =
  | { type: 'before'; itemId: string; parentId: string | null }
  | { type: 'after';  itemId: string; parentId: string | null }
  | { type: 'inside'; itemId: string };

// ─── ID generator ──────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `rd_${Date.now()}_${++_uid}`; }

// ─── Tree utilities ────────────────────────────────────────────────────────────
function removeFromTree(items: RefItem[], id: string): { tree: RefItem[]; removed: RefItem | null } {
  let removed: RefItem | null = null;
  const tree = items
    .filter(item => { if (item.id === id) { removed = item; return false; } return true; })
    .map(item => {
      if (removed) return item;
      const r = removeFromTree(item.children, id);
      removed = r.removed;
      return { ...item, children: r.tree };
    });
  return { tree, removed };
}

function insertBefore(items: RefItem[], targetId: string, newItem: RefItem): RefItem[] {
  const result: RefItem[] = [];
  for (const item of items) {
    if (item.id === targetId) result.push(newItem);
    result.push({ ...item, children: insertBefore(item.children, targetId, newItem) });
  }
  return result;
}

function insertAfter(items: RefItem[], targetId: string, newItem: RefItem): RefItem[] {
  const result: RefItem[] = [];
  for (const item of items) {
    result.push({ ...item, children: insertAfter(item.children, targetId, newItem) });
    if (item.id === targetId) result.push(newItem);
  }
  return result;
}

function insertInsideAsLastChild(items: RefItem[], parentId: string, newItem: RefItem): RefItem[] {
  return items.map(item => {
    if (item.id === parentId) return { ...item, children: [...item.children, newItem] };
    return { ...item, children: insertInsideAsLastChild(item.children, parentId, newItem) };
  });
}

function updateItem(items: RefItem[], id: string, patch: Partial<Pick<RefItem, 'code' | 'name' | 'description'>>): RefItem[] {
  return items.map(item => {
    if (item.id === id) return { ...item, ...patch };
    return { ...item, children: updateItem(item.children, id, patch) };
  });
}

function addChildToItem(items: RefItem[], parentId: string, newChild: RefItem): RefItem[] {
  return items.map(item => {
    if (item.id === parentId) return { ...item, children: [...item.children, newChild] };
    return { ...item, children: addChildToItem(item.children, parentId, newChild) };
  });
}

function addSiblingAfter(items: RefItem[], siblingId: string, newItem: RefItem): RefItem[] {
  return insertAfter(items, siblingId, newItem);
}

function collectAllIds(items: RefItem[]): string[] {
  const ids: string[] = [];
  function walk(arr: RefItem[]) { arr.forEach(i => { ids.push(i.id); walk(i.children); }); }
  walk(items);
  return ids;
}

function validateItems(items: RefItem[], errors = new Map<string, string>()): Map<string, string> {
  for (const item of items) {
    if (!item.code.trim()) errors.set(`${item.id}_code`, 'Code is required');
    if (!item.name.trim()) errors.set(`${item.id}_name`, 'Name is required');
    validateItems(item.children, errors);
  }
  return errors;
}

function findDropTarget(x: number, y: number, dragId: string): DropTarget | null {
  const els = document.elementsFromPoint(x, y);
  for (const el of els) {
    let rowEl: Element | null = el;
    while (rowEl && !rowEl.hasAttribute('data-rd-id')) rowEl = rowEl.parentElement;
    if (!rowEl) continue;
    const id = rowEl.getAttribute('data-rd-id')!;
    const rawParent = rowEl.getAttribute('data-rd-parent');
    const parentId = (rawParent === 'ROOT' || !rawParent) ? null : rawParent;
    const hasChildren = rowEl.getAttribute('data-rd-has-children') === 'true';
    if (id === dragId) return null;
    const rect = rowEl.getBoundingClientRect();
    const relY = y - rect.top;
    if (relY < rect.height * 0.25) return { type: 'before', itemId: id, parentId };
    if (hasChildren && relY > rect.height * 0.75) return { type: 'inside', itemId: id };
    return { type: 'after', itemId: id, parentId };
  }
  return null;
}

// ─── Seed data ─────────────────────────────────────────────────────────────────
function mk(id: string, code: string, name: string, description = '', children: RefItem[] = []): RefItem {
  return { id, code, name, description, children };
}

// ─── Phase seed data ───────────────────────────────────────────────────────────
export const PHASE_ITEMS: RefItem[] = [
  mk('ph-pl', 'PL', 'Planning', '', [
    mk('ph-pl-feas', 'PL-FEAS', 'Feasibility'),
    mk('ph-pl-conc', 'PL-CONC', 'Concept Planning'),
    mk('ph-pl-prog', 'PL-PROG', 'Programming'),
    mk('ph-pl-budg', 'PL-BUDG', 'Budgeting'),
  ]),
  mk('ph-ds', 'DS', 'Design', '', [
    mk('ph-ds-sd',  'DS-SD',  'Schematic Design (SD)'),
    mk('ph-ds-dd',  'DS-DD',  'Design Development (DD)'),
    mk('ph-ds-cd',  'DS-CD',  'Construction Documents (CD)'),
    mk('ph-ds-ifp', 'DS-IFP', 'Issued for Permit'),
    mk('ph-ds-ifc', 'DS-IFC', 'Issued for Construction (IFC)'),
  ]),
  mk('ph-pc', 'PC', 'Procurement', '', [
    mk('ph-pc-preq', 'PC-PREQ', 'Prequalification'),
    mk('ph-pc-bid',  'PC-BID',  'Bidding / Tendering'),
    mk('ph-pc-eval', 'PC-EVAL', 'Bid Evaluation'),
    mk('ph-pc-awd',  'PC-AWD',  'Award'),
  ]),
  mk('ph-cn', 'CN', 'Construction', '', [
    mk('ph-cn-mob',  'CN-MOB',  'Mobilization'),
    mk('ph-cn-site', 'CN-SITE', 'Site Preparation'),
    mk('ph-cn-fdn',  'CN-FDN',  'Foundations'),
    mk('ph-cn-str',  'CN-STR',  'Structure'),
    mk('ph-cn-env',  'CN-ENV',  'Envelope'),
    mk('ph-cn-mep',  'CN-MEP',  'MEP Rough-In'),
    mk('ph-cn-int',  'CN-INT',  'Interior Fit-Out'),
    mk('ph-cn-fin',  'CN-FIN',  'Finishes'),
  ]),
  mk('ph-cx', 'CX', 'Commissioning', '', [
    mk('ph-cx-test', 'CX-TEST', 'System Testing'),
    mk('ph-cx-strt', 'CX-STRT', 'Start-Up'),
    mk('ph-cx-bal',  'CX-BAL',  'Balancing'),
    mk('ph-cx-fcx',  'CX-FCX',  'Final Commissioning'),
  ]),
  mk('ph-ho', 'HO', 'Handover', '', [
    mk('ph-ho-pnch', 'HO-PNCH', 'Punch / Closeout'),
    mk('ph-ho-insp', 'HO-INSP', 'Final Inspections'),
    mk('ph-ho-asbt', 'HO-ASBT', 'As-Built Documentation'),
    mk('ph-ho-trn',  'HO-TRN',  'Owner Training'),
    mk('ph-ho-turn', 'HO-TURN', 'Turnover'),
  ]),
  mk('ph-op', 'OP', 'Operations', '', [
    mk('ph-op-warr', 'OP-WARR', 'Warranty Period'),
    mk('ph-op-mant', 'OP-MANT', 'Maintenance'),
    mk('ph-op-asop', 'OP-ASOP', 'Asset Operations'),
  ]),
];

export const TRADE_ITEMS: RefItem[] = [
  mk('t-gc',    'GC',     'General Contractor',           'Prime contractor responsible for overall project delivery, subcontractor coordination, and site management'),
  mk('t-cm',    'CM',     'Construction Management',      'Professional services managing schedule, cost, quality, and coordination on behalf of the owner'),
  mk('t-civil', 'CIVIL',  'Civil',                        'Civil engineering works including grading, drainage, roads, and site infrastructure'),
  mk('t-site',  'SITE',   'Sitework',                     'Preparatory site activities including clearing, grubbing, erosion control, and temporary facilities'),
  mk('t-erth',  'EARTH',  'Earthworks',                   'Mass excavation, cut-and-fill operations, compaction, and engineered fill placement'),
  mk('t-excv',  'EXCAV',  'Excavation',                   'Trenching, pit excavation, and shoring for foundations, utilities, and below-grade structures'),
  mk('t-util',  'UTIL',   'Utilities',                    'Installation of underground wet and dry utilities including water, sewer, gas, and electrical conduit'),
  mk('t-drn',   'DRAIN',  'Drainage',                     'Surface and subsurface drainage systems including swales, detention, French drains, and storm culverts'),
  mk('t-road',  'ROAD',   'Roadwork / Paving',            'Subbase preparation, asphalt and concrete paving, kerbing, line marking, and traffic management infrastructure'),
  mk('t-land',  'LAND',   'Landscaping',                  'Soft landscaping, turf, planting, irrigation, and site amenity works'),
  mk('t-demo',  'DEMO',   'Demolition',                   'Selective and structural demolition, deconstruction, and hazardous material abatement'),
  mk('t-surv',  'SURV',   'Surveying',                    'Land surveying, as-built documentation, setout, and dimensional control throughout construction'),
  mk('t-steel', 'STEEL',  'Structural Steel',             'Fabrication, delivery, and erection of structural steel frames, columns, beams, and connections'),
  mk('t-conc',  'CONC',   'Concrete',                     'Formwork, reinforcement placement, concrete supply, and finishing for cast-in-place elements'),
  mk('t-prec',  'PREC',   'Precast Concrete',             'Off-site manufacture and on-site erection of precast structural and architectural concrete elements'),
  mk('t-rebr',  'REBAR',  'Reinforcing Steel',            'Detailing, supply, bending, and placement of reinforcing bar and post-tensioning systems'),
  mk('t-msry',  'MSRY',   'Masonry',                      'Brick, block, natural stone, and mortar construction for walls, piers, and architectural features'),
  mk('t-fram',  'FRAM',   'Framing',                      'Structural timber and light-gauge steel framing for floors, walls, and roof structures'),
  mk('t-carp',  'CARP',   'Carpentry',                    'Rough and finish carpentry including blocking, backing, trim, and site-built timber elements'),
  mk('t-roof',  'ROOF',   'Roofing',                      'Membrane, metal, tile, and built-up roofing systems including flashings and penetration details'),
  mk('t-wtpf',  'WTPF',   'Waterproofing',                'Below-grade and above-grade waterproofing membranes, coatings, and joint sealant systems'),
  mk('t-clad',  'CLAD',   'Facade / Cladding',            'External cladding systems including composite panels, terracotta, stone, and rain-screen assemblies'),
  mk('t-curt',  'CURT',   'Curtain Wall',                 'Unitised and stick-built aluminium curtain wall, spandrel panels, and structural silicone glazing'),
  mk('t-glaz',  'GLAZ',   'Windows & Glazing',            'Aluminium window frames, storefront systems, skylights, and architectural glass supply and installation'),
  mk('t-door',  'DOOR',   'Doors & Hardware',             'Interior and exterior door frames, door leaves, overhead doors, access control hardware, and ironmongery'),
  mk('t-insl',  'INSUL',  'Insulation',                   'Thermal and acoustic insulation for walls, roofs, floors, and mechanical systems'),
  mk('t-dryw',  'DRYW',   'Drywall / Partitions',         'Gypsum board, metal stud framing, fire-rated partitions, shaft walls, and acoustic assemblies'),
  mk('t-ceil',  'CEIL',   'Ceiling Systems',              'Suspended acoustic tile ceilings, drywall soffits, stretched fabric, and specialty ceiling systems'),
  mk('t-flor',  'FLOOR',  'Flooring',                     'Ceramic tile, carpet, hardwood, vinyl, polished concrete, epoxy, and specialty raised floor systems'),
  mk('t-pnt',   'PAINT',  'Painting & Coatings',          'Interior and exterior painting, specialised coatings, intumescent fire protection, and surface preparation'),
  mk('t-fin',   'FINSH',  'Finishes',                     'General interior finishes scope covering wall, floor, and ceiling materials not classified under a specific trade'),
  mk('t-mill',  'MILL',   'Millwork / Casework',          'Architectural millwork, custom joinery, built-in cabinetry, reception counters, and decorative timber elements'),
  mk('t-hvac',  'HVAC',   'HVAC',                         'Heating, ventilation, and air conditioning systems including air handling units, FCUs, and distribution'),
  mk('t-mech',  'MECH',   'Mechanical',                   'General mechanical scope encompassing HVAC, refrigeration, plumbing, and related building services plant'),
  mk('t-refr',  'REFR',   'Refrigeration',                'Industrial and commercial refrigeration plant, cold rooms, process cooling, and refrigerant pipework'),
  mk('t-duct',  'DUCT',   'Ductwork',                     'Sheet-metal ductwork fabrication and installation for supply air, return air, and exhaust systems'),
  mk('t-bas',   'BAS',    'Building Automation',          'Building management systems (BMS/BAS), DDC controls, sensors, actuators, and central SCADA platforms'),
  mk('t-elec',  'ELEC',   'Electrical',                   'Complete electrical scope including main switchgear, distribution boards, wiring, and final connections'),
  mk('t-powr',  'POWR',   'Power Distribution',           'High and low voltage switchboards, transformers, UPS, generator sets, and power reticulation systems'),
  mk('t-lght',  'LIGHT',  'Lighting',                     'Interior and exterior luminaire supply and installation, lighting controls, and emergency lighting'),
  mk('t-lvlt',  'LVLT',   'Low Voltage',                  'Structured cabling, AV systems, nurse call, MATV, access control wiring, and low-voltage containment'),
  mk('t-falm',  'FALM',   'Fire Alarm',                   'Addressable fire detection and alarm systems, smoke and heat detectors, panels, and public address integration'),
  mk('t-sec',   'SEC',    'Security Systems',             'CCTV, intruder detection, access control, intercom, and electronic security integration'),
  mk('t-comm',  'COMM',   'Communications / Data',        'Telecommunications infrastructure, structured data cabling, server room fit-out, and fibre optic networks'),
  mk('t-plmb',  'PLMB',   'Plumbing',                     'Domestic cold and hot water systems, sanitary drainage, storm drainage, and fixtures and fittings'),
  mk('t-pipe',  'PIPE',   'Piping',                       'Process and services piping systems including hydraulics, compressed air, medical gas, and steam'),
  mk('t-gas',   'GAS',    'Gas Systems',                  'Natural gas supply, LP gas, medical gas, and specialised gas distribution systems and equipment'),
  mk('t-fire',  'FIRE',   'Fire Protection / Sprinklers', 'Wet, dry, and pre-action sprinkler systems, hydrant mains, fire hose reels, and suppression systems'),
  mk('t-elev',  'ELEV',   'Elevators & Escalators',       'Passenger lifts, service elevators, escalators, moving walkways, and associated shaft and pit works'),
  mk('t-ktch',  'KITCH',  'Kitchen Equipment',            'Commercial kitchen equipment, exhaust hoods, cold rooms, dishwash systems, and catering infrastructure'),
  mk('t-med',   'MED',    'Medical Equipment',            'Specialised medical and clinical equipment including imaging, operating theatre, and patient care systems'),
  mk('t-lab',   'LAB',    'Laboratory Equipment',         'Fume cupboards, safety cabinets, lab benches, specialist services, and scientific equipment installations'),
  mk('t-acst',  'ACST',   'Acoustics',                    'Acoustic treatment, sound isolation, noise and vibration control, and performance ceiling and wall systems'),
  mk('t-sign',  'SIGN',   'Signage',                      'Wayfinding, statutory, identification, digital display, and architectural signage systems'),
  mk('t-wste',  'WASTE',  'Waste Management',             'On-site waste sorting, skip and bin management, recycling programs, and disposal compliance'),
  mk('t-safe',  'SAFE',   'Safety',                       'Site safety management, PPE, fall protection, scaffolding, barriers, and WHS regulatory compliance'),
  mk('t-qa',    'QAQC',   'Quality / QAQC',               'Quality assurance and quality control programs, inspection and test plans, non-conformance management'),
  mk('t-insp',  'INSP',   'Inspection',                   'Third-party and statutory inspection services including structural, building, and special inspections'),
  mk('t-cmsn',  'CMSN',   'Commissioning',                'System commissioning, performance testing, balancing, and operational readiness verification'),
  mk('t-bim',   'BIM',    'BIM / VDC',                    'Building information modelling, clash detection, 4D scheduling, model coordination, and digital delivery'),
  mk('t-arch',  'ARCH',   'Design / Architecture',        'Architectural design, documentation, contract administration, and design management services'),
  mk('t-seng',  'SENG',   'Structural Engineering',       'Structural design, analysis, certification, and field engineering for all structural systems'),
  mk('t-mepeng','MEPENG', 'MEP Engineering',              'Mechanical, electrical, and plumbing engineering design, documentation, and engineering management'),
  mk('t-env',   'ENV',    'Environmental',                'Environmental impact management, contamination assessment, regulatory compliance, and reporting'),
  mk('t-sust',  'SUST',   'Sustainability / LEED',        'Sustainable design consulting, energy modelling, Green Star or LEED certification, and reporting'),
  mk('t-fac',   'FAC',    'Facilities / Operations',      'Facilities management handover, O&M manual preparation, and operational readiness planning'),
];

const WBS_ITEMS: RefItem[] = [
  { id: 'wbs_1A', code: '1A', name: 'Owner Allowances', xwalkId: '', description: '', children: [
    { id: 'wbs_1A_01', code: '1A.01', name: 'Contingency Allowances', xwalkId: '', description: '', children: [
      { id: 'wbs_1A_01_10', code: '1A.01.10', name: 'Owner Contingency Allowance', xwalkId: '1', description: '', children: [] }
    ] },
    { id: 'wbs_1A_02', code: '1A.02', name: 'Betterment Allowances', xwalkId: '', description: '', children: [
      { id: 'wbs_1A_02_10', code: '1A.02.10', name: 'Owner\'s Betterment Allowance', xwalkId: '2', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_1B', code: '1B', name: 'General Conditions', xwalkId: '', description: '', children: [
    { id: 'wbs_1B_01', code: '1B.01', name: 'Project Management', xwalkId: '', description: '', children: [
      { id: 'wbs_1B_01_10', code: '1B.01.10', name: 'General Conditions (Turnkey)', xwalkId: '3', description: '', children: [] },
      { id: 'wbs_1B_01_20', code: '1B.01.20', name: 'General Labor', xwalkId: '4', description: '', children: [] },
      { id: 'wbs_1B_01_30', code: '1B.01.30', name: 'Project Management Software (Owner)', xwalkId: '5', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_1C', code: '1C', name: 'Sub Bond/Insurance', xwalkId: '', description: '', children: [
    { id: 'wbs_1C_01', code: '1C.01', name: 'Sub Default Protection', xwalkId: '', description: '', children: [
      { id: 'wbs_1C_01_10', code: '1C.01.10', name: 'Subcontractor Default Insurance (SDI)', xwalkId: '6', description: '', children: [] },
      { id: 'wbs_1C_01_20', code: '1C.01.20', name: 'Sub Bonds', xwalkId: '7', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_1D', code: '1D', name: 'Add-ons', xwalkId: '', description: '', children: [
    { id: 'wbs_1D_01', code: '1D.01', name: 'Project Management - Add-On', xwalkId: '', description: '', children: [
      { id: 'wbs_1D_01_10', code: '1D.01.10', name: 'Project Management Software', xwalkId: '8', description: '', children: [] }
    ] },
    { id: 'wbs_1D_02', code: '1D.02', name: 'Regulatory Requirements - Add-On', xwalkId: '', description: '', children: [
      { id: 'wbs_1D_02_10', code: '1D.02.10', name: 'AGC Fees', xwalkId: '9', description: '', children: [] },
      { id: 'wbs_1D_02_20', code: '1D.02.20', name: 'Permits', xwalkId: '10', description: '', children: [] }
    ] },
    { id: 'wbs_1D_03', code: '1D.03', name: 'Bonds & Insurance', xwalkId: '', description: '', children: [
      { id: 'wbs_1D_03_10', code: '1D.03.10', name: 'Bonds', xwalkId: '11', description: '', children: [] },
      { id: 'wbs_1D_03_11', code: '1D.03.11', name: 'Bonds - Initial Cost', xwalkId: '12', description: '', children: [] },
      { id: 'wbs_1D_03_12', code: '1D.03.12', name: 'Bonds - Surcharge', xwalkId: '13', description: '', children: [] },
      { id: 'wbs_1D_03_20', code: '1D.03.20', name: 'Builder\'s Risk', xwalkId: '14', description: '', children: [] },
      { id: 'wbs_1D_03_30', code: '1D.03.30', name: 'General Liability', xwalkId: '15', description: '', children: [] },
      { id: 'wbs_1D_03_40', code: '1D.03.40', name: 'Insurance', xwalkId: '16', description: '', children: [] },
      { id: 'wbs_1D_03_41', code: '1D.03.41', name: 'Errors & Omissions Insurance (E&O)', xwalkId: '17', description: '', children: [] },
      { id: 'wbs_1D_03_42', code: '1D.03.42', name: 'Owner-Controlled Insurance Program (OCIP)', xwalkId: '18', description: '', children: [] },
      { id: 'wbs_1D_03_50', code: '1D.03.50', name: 'Warranty Cost', xwalkId: '19', description: '', children: [] }
    ] },
    { id: 'wbs_1D_04', code: '1D.04', name: 'Overhead & Profit', xwalkId: '', description: '', children: [
      { id: 'wbs_1D_04_10', code: '1D.04.10', name: 'Preconstruction', xwalkId: '20', description: '', children: [] },
      { id: 'wbs_1D_04_20', code: '1D.04.20', name: 'CM Contingency', xwalkId: '21', description: '', children: [] },
      { id: 'wbs_1D_04_30', code: '1D.04.30', name: 'Fee', xwalkId: '22', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_1E', code: '1E', name: 'General Requirements', xwalkId: '', description: '', children: [
    { id: 'wbs_1E_01', code: '1E.01', name: 'Project Planning', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_01_10', code: '1E.01.10', name: 'Project Success Planning (PSP)', xwalkId: '23', description: '', children: [] },
      { id: 'wbs_1E_01_20', code: '1E.01.20', name: 'BIM', xwalkId: '24', description: '', children: [] }
    ] },
    { id: 'wbs_1E_02', code: '1E.02', name: 'Security Procedures', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_02_10', code: '1E.02.10', name: 'Contractor Badging', xwalkId: '25', description: '', children: [] },
      { id: 'wbs_1E_02_20', code: '1E.02.20', name: 'Job Site Security', xwalkId: '26', description: '', children: [] },
      { id: 'wbs_1E_02_21', code: '1E.02.21', name: 'Security - Guard', xwalkId: '27', description: '', children: [] },
      { id: 'wbs_1E_02_22', code: '1E.02.22', name: 'Security - Cameras', xwalkId: '28', description: '', children: [] }
    ] },
    { id: 'wbs_1E_03', code: '1E.03', name: 'Regulatory Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_03_10', code: '1E.03.10', name: 'LEED', xwalkId: '29', description: '', children: [] }
    ] },
    { id: 'wbs_1E_04', code: '1E.04', name: 'Quality Control', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_04_10', code: '1E.04.10', name: 'Testing', xwalkId: '30', description: '', children: [] },
      { id: 'wbs_1E_04_11', code: '1E.04.11', name: 'Air Quality Testing', xwalkId: '31', description: '', children: [] },
      { id: 'wbs_1E_04_12', code: '1E.04.12', name: 'Moisture Testing', xwalkId: '32', description: '', children: [] },
      { id: 'wbs_1E_04_20', code: '1E.04.20', name: 'Construction Inspection', xwalkId: '33', description: '', children: [] },
      { id: 'wbs_1E_04_30', code: '1E.04.30', name: 'Commissioning', xwalkId: '34', description: '', children: [] }
    ] },
    { id: 'wbs_1E_05', code: '1E.05', name: 'Temporary Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_05_10', code: '1E.05.10', name: 'Temporary Electricity', xwalkId: '35', description: '', children: [] },
      { id: 'wbs_1E_05_20', code: '1E.05.20', name: 'Temporary Generator', xwalkId: '36', description: '', children: [] },
      { id: 'wbs_1E_05_30', code: '1E.05.30', name: 'Temporary Water', xwalkId: '37', description: '', children: [] }
    ] },
    { id: 'wbs_1E_06', code: '1E.06', name: 'Temporary Construction', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_06_10', code: '1E.06.10', name: 'Temporary Stairs', xwalkId: '38', description: '', children: [] },
      { id: 'wbs_1E_06_20', code: '1E.06.20', name: 'Timber Mats', xwalkId: '39', description: '', children: [] }
    ] },
    { id: 'wbs_1E_07', code: '1E.07', name: 'Temporary Cranes & Hoists', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_07_10', code: '1E.07.10', name: 'Tower Crane', xwalkId: '40', description: '', children: [] },
      { id: 'wbs_1E_07_11', code: '1E.07.11', name: 'Tower Crane - Foundation', xwalkId: '41', description: '', children: [] },
      { id: 'wbs_1E_07_12', code: '1E.07.12', name: 'Tower Crane - Set-Up', xwalkId: '42', description: '', children: [] },
      { id: 'wbs_1E_07_13', code: '1E.07.13', name: 'Tower Crane - Fencing', xwalkId: '43', description: '', children: [] },
      { id: 'wbs_1E_07_14', code: '1E.07.14', name: 'Tower Crane - Rental', xwalkId: '44', description: '', children: [] },
      { id: 'wbs_1E_07_15', code: '1E.07.15', name: 'Tower Crane - Operator', xwalkId: '45', description: '', children: [] },
      { id: 'wbs_1E_07_20', code: '1E.07.20', name: 'Man Hoist', xwalkId: '46', description: '', children: [] },
      { id: 'wbs_1E_07_30', code: '1E.07.30', name: 'Material Hoist', xwalkId: '47', description: '', children: [] },
      { id: 'wbs_1E_07_40', code: '1E.07.40', name: 'Forklift', xwalkId: '48', description: '', children: [] },
      { id: 'wbs_1E_07_50', code: '1E.07.50', name: 'Temporary Scaffolding & Platforms', xwalkId: '49', description: '', children: [] },
      { id: 'wbs_1E_07_60', code: '1E.07.60', name: 'Temporary Elevators', xwalkId: '3611', description: '', children: [] }
    ] },
    { id: 'wbs_1E_08', code: '1E.08', name: 'Vehicular Access & Parking', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_08_10', code: '1E.08.10', name: 'Temporary Access Road', xwalkId: '50', description: '', children: [] },
      { id: 'wbs_1E_08_20', code: '1E.08.20', name: 'Temporary Parking', xwalkId: '51', description: '', children: [] },
      { id: 'wbs_1E_08_30', code: '1E.08.30', name: 'Traffic Control', xwalkId: '52', description: '', children: [] },
      { id: 'wbs_1E_08_40', code: '1E.08.40', name: 'Laydown Area', xwalkId: '53', description: '', children: [] }
    ] },
    { id: 'wbs_1E_09', code: '1E.09', name: 'Temporary Barriers & Enclosures', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_09_10', code: '1E.09.10', name: 'Temporary Interior Partitions', xwalkId: '54', description: '', children: [] },
      { id: 'wbs_1E_09_20', code: '1E.09.20', name: 'Safety Rails @ Elevated Floors', xwalkId: '55', description: '', children: [] },
      { id: 'wbs_1E_09_21', code: '1E.09.21', name: 'Safety Rails @ Elevated Floors (Maintenance Only)', xwalkId: '56', description: '', children: [] },
      { id: 'wbs_1E_09_30', code: '1E.09.30', name: 'Temporary Fence', xwalkId: '57', description: '', children: [] },
      { id: 'wbs_1E_09_40', code: '1E.09.40', name: 'Tree Protection', xwalkId: '58', description: '', children: [] }
    ] },
    { id: 'wbs_1E_10', code: '1E.10', name: 'Temporary Controls', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_10_10', code: '1E.10.10', name: 'Dewatering', xwalkId: '59', description: '', children: [] },
      { id: 'wbs_1E_10_20', code: '1E.10.20', name: 'Dust Control', xwalkId: '60', description: '', children: [] }
    ] },
    { id: 'wbs_1E_11', code: '1E.11', name: 'Project Identification', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_11_10', code: '1E.11.10', name: 'Project Signage', xwalkId: '61', description: '', children: [] }
    ] },
    { id: 'wbs_1E_12', code: '1E.12', name: 'Product Storage & Handling', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_12_10', code: '1E.12.10', name: 'Material Storage', xwalkId: '62', description: '', children: [] }
    ] },
    { id: 'wbs_1E_13', code: '1E.13', name: 'Field Engineering', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_13_10', code: '1E.13.10', name: 'Survey & Layout', xwalkId: '63', description: '', children: [] },
      { id: 'wbs_1E_13_20', code: '1E.13.20', name: 'Underground Penetrating Radar', xwalkId: '64', description: '', children: [] },
      { id: 'wbs_1E_13_30', code: '1E.13.30', name: 'Utilities Potholing', xwalkId: '3612', description: '', children: [] }
    ] },
    { id: 'wbs_1E_14', code: '1E.14', name: 'Execution', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_14_10', code: '1E.14.10', name: 'Shoring & Bracing', xwalkId: '65', description: '', children: [] },
      { id: 'wbs_1E_14_20', code: '1E.14.20', name: 'Patch to Match', xwalkId: '66', description: '', children: [] }
    ] },
    { id: 'wbs_1E_15', code: '1E.15', name: 'Cleaning & Waste Management', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_15_10', code: '1E.15.10', name: 'Street Cleaning', xwalkId: '67', description: '', children: [] },
      { id: 'wbs_1E_15_20', code: '1E.15.20', name: 'Daily Progress Cleanings', xwalkId: '68', description: '', children: [] },
      { id: 'wbs_1E_15_30', code: '1E.15.30', name: 'Trash Chutes for Elevated Floors', xwalkId: '69', description: '', children: [] },
      { id: 'wbs_1E_15_40', code: '1E.15.40', name: 'Final Cleaning', xwalkId: '70', description: '', children: [] },
      { id: 'wbs_1E_15_50', code: '1E.15.50', name: 'Dumpsters', xwalkId: '3613', description: '', children: [] }
    ] },
    { id: 'wbs_1E_16', code: '1E.16', name: 'Closeout', xwalkId: '', description: '', children: [
      { id: 'wbs_1E_16_10', code: '1E.16.10', name: 'As-Built Survey', xwalkId: '71', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_2A', code: '2A', name: 'Abatement', xwalkId: '', description: '', children: [
    { id: 'wbs_2A_01', code: '2A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_2A_01_01', code: '2A.01.01', name: 'Mobilization', xwalkId: '72', description: '', children: [] },
      { id: 'wbs_2A_01_02', code: '2A.01.02', name: 'Bond/Permit', xwalkId: '73', description: '', children: [] },
      { id: 'wbs_2A_01_03', code: '2A.01.03', name: 'Submittals', xwalkId: '74', description: '', children: [] },
      { id: 'wbs_2A_01_04', code: '2A.01.04', name: 'Equip Rentals', xwalkId: '75', description: '', children: [] },
      { id: 'wbs_2A_01_05', code: '2A.01.05', name: 'Supervision', xwalkId: '76', description: '', children: [] },
      { id: 'wbs_2A_01_06', code: '2A.01.06', name: 'Demobilization', xwalkId: '77', description: '', children: [] },
      { id: 'wbs_2A_01_07', code: '2A.01.07', name: 'Close-Out', xwalkId: '78', description: '', children: [] },
      { id: 'wbs_2A_01_09', code: '2A.01.09', name: 'Cleaning', xwalkId: '79', description: '', children: [] },
      { id: 'wbs_2A_01_13', code: '2A.01.13', name: 'Testing', xwalkId: '80', description: '', children: [] }
    ] },
    { id: 'wbs_2A_02', code: '2A.02', name: 'Asbestos Abatement', xwalkId: '', description: '', children: [
      { id: 'wbs_2A_02_10', code: '2A.02.10', name: 'Asbestos Abatement - Flooring, Grout & Mastic', xwalkId: '81', description: '', children: [] },
      { id: 'wbs_2A_02_20', code: '2A.02.20', name: 'Asbestos Abatement - Ceiling & Mastic', xwalkId: '82', description: '', children: [] },
      { id: 'wbs_2A_02_30', code: '2A.02.30', name: 'Asbestos Abatement - Brick & Mastic', xwalkId: '83', description: '', children: [] },
      { id: 'wbs_2A_02_40', code: '2A.02.40', name: 'Asbestos Abatement - Vapor Barrier & Mastic', xwalkId: '84', description: '', children: [] },
      { id: 'wbs_2A_02_50', code: '2A.02.50', name: 'Asbestos Abatement - Exterior & Interior Insulation', xwalkId: '85', description: '', children: [] },
      { id: 'wbs_2A_02_60', code: '2A.02.60', name: 'Asbestos Abatement - Exterior & Interior Joint Sealants', xwalkId: '86', description: '', children: [] },
      { id: 'wbs_2A_02_70', code: '2A.02.70', name: 'Asbestos Abatement - Roofing & Insulation', xwalkId: '87', description: '', children: [] },
      { id: 'wbs_2A_02_80', code: '2A.02.80', name: 'Asbestos Abatement - Pipe Insulation', xwalkId: '88', description: '', children: [] },
      { id: 'wbs_2A_02_90', code: '2A.02.90', name: 'Asbestos Abatement - Mastic at Other Locations', xwalkId: '89', description: '', children: [] }
    ] },
    { id: 'wbs_2A_03', code: '2A.03', name: 'Other Hazardous Materials Remediation', xwalkId: '', description: '', children: [
      { id: 'wbs_2A_03_10', code: '2A.03.10', name: 'Lead Remediation', xwalkId: '90', description: '', children: [] },
      { id: 'wbs_2A_03_20', code: '2A.03.20', name: 'Mold Remediation', xwalkId: '91', description: '', children: [] },
      { id: 'wbs_2A_03_30', code: '2A.03.30', name: 'Polychlorinate Biphenyl Remediation', xwalkId: '92', description: '', children: [] }
    ] },
    { id: 'wbs_2A_04', code: '2A.04', name: 'Removal & Disposal of Contaminated Soils', xwalkId: '', description: '', children: [
      { id: 'wbs_2A_04_10', code: '2A.04.10', name: 'Excavation & Handling of Contaminated Material', xwalkId: '93', description: '', children: [] },
      { id: 'wbs_2A_04_20', code: '2A.04.20', name: 'Removal & Disposal of Asbestos Contaminated Soils', xwalkId: '94', description: '', children: [] },
      { id: 'wbs_2A_04_30', code: '2A.04.30', name: 'Removal & Disposal of Polychlorinate Biphenyl Contaminated Soils', xwalkId: '95', description: '', children: [] },
      { id: 'wbs_2A_04_40', code: '2A.04.40', name: 'Removal & Disposal of Organically Contaminated Soils', xwalkId: '96', description: '', children: [] }
    ] },
    { id: 'wbs_2A_05', code: '2A.05', name: 'Abatement - Supplementary work', xwalkId: '', description: '', children: [
      { id: 'wbs_2A_05_10', code: '2A.05.10', name: 'Make Safe Zone - Abatement', xwalkId: '97', description: '', children: [] },
      { id: 'wbs_2A_05_20', code: '2A.05.20', name: 'Dust Control Measures - Abatement', xwalkId: '98', description: '', children: [] },
      { id: 'wbs_2A_05_30', code: '2A.05.30', name: 'Haul off & Waste Disposal - Abatement', xwalkId: '99', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_2B', code: '2B', name: 'Demolition', xwalkId: '', description: '', children: [
    { id: 'wbs_2B_01', code: '2B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_01_01', code: '2B.01.01', name: 'Mobilization', xwalkId: '100', description: '', children: [] },
      { id: 'wbs_2B_01_02', code: '2B.01.02', name: 'Bond/Permit', xwalkId: '101', description: '', children: [] },
      { id: 'wbs_2B_01_03', code: '2B.01.03', name: 'Submittals', xwalkId: '102', description: '', children: [] },
      { id: 'wbs_2B_01_04', code: '2B.01.04', name: 'Equip Rentals', xwalkId: '103', description: '', children: [] },
      { id: 'wbs_2B_01_05', code: '2B.01.05', name: 'Supervision', xwalkId: '104', description: '', children: [] },
      { id: 'wbs_2B_01_06', code: '2B.01.06', name: 'Demobilization', xwalkId: '105', description: '', children: [] },
      { id: 'wbs_2B_01_07', code: '2B.01.07', name: 'Close-Out', xwalkId: '106', description: '', children: [] },
      { id: 'wbs_2B_01_09', code: '2B.01.09', name: 'Cleaning', xwalkId: '107', description: '', children: [] },
      { id: 'wbs_2B_01_11', code: '2B.01.11', name: 'Safety Cables/Rails', xwalkId: '108', description: '', children: [] }
    ] },
    { id: 'wbs_2B_02', code: '2B.02', name: 'Selective Demo - Building Exterior', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_02_10', code: '2B.02.10', name: 'Selective Demolition - Exterior Partitions w/ Finish System', xwalkId: '109', description: '', children: [] },
      { id: 'wbs_2B_02_20', code: '2B.02.20', name: 'Selective Demolition - Exterior Finish System', xwalkId: '110', description: '', children: [] },
      { id: 'wbs_2B_02_30', code: '2B.02.30', name: 'Selective Demolition - Exterior Soffit', xwalkId: '111', description: '', children: [] },
      { id: 'wbs_2B_02_40', code: '2B.02.40', name: 'Selective Demolition - Roofing & Accessories', xwalkId: '112', description: '', children: [] }
    ] },
    { id: 'wbs_2B_03', code: '2B.03', name: 'Selective Demo - Building Interior', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_03_10', code: '2B.03.10', name: 'Selective Demolition - Interior Partitions', xwalkId: '113', description: '', children: [] },
      { id: 'wbs_2B_03_20', code: '2B.03.20', name: 'Selective Demolition - Doors, Frames, Hardware', xwalkId: '114', description: '', children: [] },
      { id: 'wbs_2B_03_30', code: '2B.03.30', name: 'Selective Demolition - Windows/Storefronts/Curtainwalls', xwalkId: '115', description: '', children: [] },
      { id: 'wbs_2B_03_40', code: '2B.03.40', name: 'Selective Demolition - Overhead Doors', xwalkId: '116', description: '', children: [] },
      { id: 'wbs_2B_03_50', code: '2B.03.50', name: 'Selective Demolition - Flooring Finish', xwalkId: '117', description: '', children: [] },
      { id: 'wbs_2B_03_60', code: '2B.03.60', name: 'Selective Demolition - Ceiling Finish', xwalkId: '118', description: '', children: [] },
      { id: 'wbs_2B_03_70', code: '2B.03.70', name: 'Selective Demolition - Wall Finishes', xwalkId: '119', description: '', children: [] },
      { id: 'wbs_2B_03_80', code: '2B.03.80', name: 'Selective Demolition - Interior Misc Concrete', xwalkId: '120', description: '', children: [] },
      { id: 'wbs_2B_03_90', code: '2B.03.90', name: 'Selective Demolition - Interior Railings', xwalkId: '121', description: '', children: [] }
    ] },
    { id: 'wbs_2B_04', code: '2B.04', name: 'Selective Demo - Specialties, Equipment & Furnishing', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_04_10', code: '2B.04.10', name: 'Selective Demolition - Specialties', xwalkId: '122', description: '', children: [] },
      { id: 'wbs_2B_04_20', code: '2B.04.20', name: 'Selective Demolition - Equipment', xwalkId: '123', description: '', children: [] },
      { id: 'wbs_2B_04_30', code: '2B.04.30', name: 'Selective Demolition - Furniture', xwalkId: '124', description: '', children: [] },
      { id: 'wbs_2B_04_40', code: '2B.04.40', name: 'Selective Demolition - Casework/Millwork', xwalkId: '125', description: '', children: [] },
      { id: 'wbs_2B_04_50', code: '2B.04.50', name: 'Selective Demolition - Window Coverings', xwalkId: '126', description: '', children: [] },
      { id: 'wbs_2B_04_60', code: '2B.04.60', name: 'Selective Demolition - Interior Seatings', xwalkId: '127', description: '', children: [] }
    ] },
    { id: 'wbs_2B_05', code: '2B.05', name: 'Structure Demolitions', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_05_10', code: '2B.05.10', name: 'Complete Building Demolition', xwalkId: '128', description: '', children: [] },
      { id: 'wbs_2B_05_20', code: '2B.05.20', name: 'Structural Concrete Demolition', xwalkId: '129', description: '', children: [] },
      { id: 'wbs_2B_05_30', code: '2B.05.30', name: 'Structural Steel Demolition', xwalkId: '130', description: '', children: [] },
      { id: 'wbs_2B_05_40', code: '2B.05.40', name: 'Swimming Pool Demolition', xwalkId: '131', description: '', children: [] }
    ] },
    { id: 'wbs_2B_06', code: '2B.06', name: 'Saw-Cutting', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_06_10', code: '2B.06.10', name: 'Saw-Cut - Concrete Slab, Beam, Joist', xwalkId: '132', description: '', children: [] },
      { id: 'wbs_2B_06_20', code: '2B.06.20', name: 'Saw-Cut - Concrete Walls', xwalkId: '133', description: '', children: [] },
      { id: 'wbs_2B_06_30', code: '2B.06.30', name: 'Saw-Cut - Steel Decking', xwalkId: '134', description: '', children: [] }
    ] },
    { id: 'wbs_2B_07', code: '2B.07', name: 'Facility Services Demolition', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_07_10', code: '2B.07.10', name: 'Fire Sprinkler System Demolition', xwalkId: '135', description: '', children: [] },
      { id: 'wbs_2B_07_20', code: '2B.07.20', name: 'Fire Alarm System Demolition', xwalkId: '136', description: '', children: [] },
      { id: 'wbs_2B_07_30', code: '2B.07.30', name: 'Plumbing Demolition', xwalkId: '137', description: '', children: [] },
      { id: 'wbs_2B_07_40', code: '2B.07.40', name: 'HVAC Demolition', xwalkId: '138', description: '', children: [] },
      { id: 'wbs_2B_07_50', code: '2B.07.50', name: 'Electrical Demolition', xwalkId: '139', description: '', children: [] },
      { id: 'wbs_2B_07_60', code: '2B.07.60', name: 'Technology Demolition', xwalkId: '140', description: '', children: [] }
    ] },
    { id: 'wbs_2B_08', code: '2B.08', name: 'Remove & Relocate', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_08_10', code: '2B.08.10', name: 'Remove & Relocate - Site Equipment & Furnishing', xwalkId: '141', description: '', children: [] },
      { id: 'wbs_2B_08_20', code: '2B.08.20', name: 'Remove & Relocate - Building Equipment & Furniture', xwalkId: '142', description: '', children: [] },
      { id: 'wbs_2B_08_30', code: '2B.08.30', name: 'Remove & Relocate - Fire Sprinkler Fixtures & Equipment', xwalkId: '143', description: '', children: [] },
      { id: 'wbs_2B_08_40', code: '2B.08.40', name: 'Remove & Relocate - Plumbing Fixtures & Equipment', xwalkId: '144', description: '', children: [] },
      { id: 'wbs_2B_08_50', code: '2B.08.50', name: 'Remove & Relocate - HVAC Equipment', xwalkId: '145', description: '', children: [] },
      { id: 'wbs_2B_08_60', code: '2B.08.60', name: 'Remove & Relocate - Electrical Fixtures & Equipment', xwalkId: '146', description: '', children: [] },
      { id: 'wbs_2B_08_70', code: '2B.08.70', name: 'Remove & Relocate - Fire Alarm Fixtures', xwalkId: '147', description: '', children: [] },
      { id: 'wbs_2B_08_80', code: '2B.08.80', name: 'Remove & Relocate - Portable Buildings', xwalkId: '148', description: '', children: [] }
    ] },
    { id: 'wbs_2B_09', code: '2B.09', name: 'Demolition - Supplementary work', xwalkId: '', description: '', children: [
      { id: 'wbs_2B_09_10', code: '2B.09.10', name: 'Disconnect & Make Safe - Demolition', xwalkId: '149', description: '', children: [] },
      { id: 'wbs_2B_09_20', code: '2B.09.20', name: 'X-Ray Slab for Demolition', xwalkId: '150', description: '', children: [] },
      { id: 'wbs_2B_09_30', code: '2B.09.30', name: 'Protect In Place Existing Items', xwalkId: '151', description: '', children: [] },
      { id: 'wbs_2B_09_40', code: '2B.09.40', name: 'Temporary Bracing & Shoring - Demolition', xwalkId: '152', description: '', children: [] },
      { id: 'wbs_2B_09_50', code: '2B.09.50', name: 'Dust Control Measures - Demolition', xwalkId: '153', description: '', children: [] },
      { id: 'wbs_2B_09_60', code: '2B.09.60', name: 'Salvage of Construction Materials', xwalkId: '154', description: '', children: [] },
      { id: 'wbs_2B_09_70', code: '2B.09.70', name: 'Surface Preparation for New Finishes', xwalkId: '155', description: '', children: [] },
      { id: 'wbs_2B_09_80', code: '2B.09.80', name: 'Haul off & Waste Disposal - Demolition', xwalkId: '156', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3A', code: '3A', name: 'Building & Site Concrete', xwalkId: '', description: '', children: [
    { id: 'wbs_3A_00', code: '3A.00', name: 'Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_00_04', code: '3A.00.04', name: 'Concrete - Allowance', xwalkId: '157', description: '', children: [] }
    ] },
    { id: 'wbs_3A_01', code: '3A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_01_01', code: '3A.01.01', name: 'Mobilization', xwalkId: '158', description: '', children: [] },
      { id: 'wbs_3A_01_02', code: '3A.01.02', name: 'Bond/Permit', xwalkId: '159', description: '', children: [] },
      { id: 'wbs_3A_01_03', code: '3A.01.03', name: 'Submittals', xwalkId: '160', description: '', children: [] },
      { id: 'wbs_3A_01_04', code: '3A.01.04', name: 'Equip Rentals', xwalkId: '161', description: '', children: [] },
      { id: 'wbs_3A_01_05', code: '3A.01.05', name: 'Supervision', xwalkId: '162', description: '', children: [] },
      { id: 'wbs_3A_01_06', code: '3A.01.06', name: 'Demobilization', xwalkId: '163', description: '', children: [] },
      { id: 'wbs_3A_01_07', code: '3A.01.07', name: 'Close-Out', xwalkId: '164', description: '', children: [] },
      { id: 'wbs_3A_01_10', code: '3A.01.10', name: 'Mockup', xwalkId: '165', description: '', children: [] }
    ] },
    { id: 'wbs_3A_02', code: '3A.02', name: 'Foundations', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_02_01', code: '3A.02.01', name: 'Piers - Straight Shaft', xwalkId: '166', description: '', children: [] },
      { id: 'wbs_3A_02_02', code: '3A.02.02', name: 'Piers - Belled', xwalkId: '167', description: '', children: [] },
      { id: 'wbs_3A_02_03', code: '3A.02.03', name: 'Piers - ACP', xwalkId: '168', description: '', children: [] },
      { id: 'wbs_3A_02_04', code: '3A.02.04', name: 'Piers - Cased', xwalkId: '169', description: '', children: [] },
      { id: 'wbs_3A_02_05', code: '3A.02.05', name: 'Piers - Slurry', xwalkId: '170', description: '', children: [] },
      { id: 'wbs_3A_02_06', code: '3A.02.06', name: 'Pile Caps', xwalkId: '171', description: '', children: [] },
      { id: 'wbs_3A_02_07', code: '3A.02.07', name: 'Spread Footings', xwalkId: '172', description: '', children: [] },
      { id: 'wbs_3A_02_08', code: '3A.02.08', name: 'Mat Foundation', xwalkId: '173', description: '', children: [] },
      { id: 'wbs_3A_02_09', code: '3A.02.09', name: 'Wall Footings', xwalkId: '174', description: '', children: [] },
      { id: 'wbs_3A_02_10', code: '3A.02.10', name: 'Grade Beams', xwalkId: '175', description: '', children: [] },
      { id: 'wbs_3A_02_11', code: '3A.02.11', name: 'Plinths', xwalkId: '176', description: '', children: [] },
      { id: 'wbs_3A_02_12', code: '3A.02.12', name: 'Pits', xwalkId: '177', description: '', children: [] },
      { id: 'wbs_3A_02_13', code: '3A.02.13', name: 'Foundation Walls', xwalkId: '178', description: '', children: [] },
      { id: 'wbs_3A_02_14', code: '3A.02.14', name: 'Foundation - Isolated Beam', xwalkId: '179', description: '', children: [] },
      { id: 'wbs_3A_02_15', code: '3A.02.15', name: 'Mud Slab', xwalkId: '180', description: '', children: [] }
    ] },
    { id: 'wbs_3A_03', code: '3A.03', name: 'Slab (Level 1)', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_03_01', code: '3A.03.01', name: 'Slab on Grade', xwalkId: '181', description: '', children: [] },
      { id: 'wbs_3A_03_02', code: '3A.03.02', name: 'Slab on Void', xwalkId: '182', description: '', children: [] },
      { id: 'wbs_3A_03_03', code: '3A.03.03', name: 'Slab on Geofoam', xwalkId: '183', description: '', children: [] },
      { id: 'wbs_3A_03_04', code: '3A.03.04', name: 'Tilt-Wall Pour Strip', xwalkId: '184', description: '', children: [] },
      { id: 'wbs_3A_03_05', code: '3A.03.05', name: 'Pan Slab - Crawlspace', xwalkId: '185', description: '', children: [] },
      { id: 'wbs_3A_03_06', code: '3A.03.06', name: 'Slab on Metal Deck (Level 1)', xwalkId: '186', description: '', children: [] },
      { id: 'wbs_3A_03_07', code: '3A.03.07', name: 'Block Outs', xwalkId: '187', description: '', children: [] },
      { id: 'wbs_3A_03_08', code: '3A.03.08', name: 'Steps On-Grade', xwalkId: '188', description: '', children: [] },
      { id: 'wbs_3A_03_09', code: '3A.03.09', name: 'Steps on Geofoam', xwalkId: '189', description: '', children: [] }
    ] },
    { id: 'wbs_3A_04', code: '3A.04', name: 'Elevated', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_04_01', code: '3A.04.01', name: 'Slab on Metal Deck', xwalkId: '190', description: '', children: [] },
      { id: 'wbs_3A_04_02', code: '3A.04.02', name: 'CIP - Elevated Slab', xwalkId: '191', description: '', children: [] },
      { id: 'wbs_3A_04_03', code: '3A.04.03', name: 'CIP - Elevated Walls', xwalkId: '192', description: '', children: [] },
      { id: 'wbs_3A_04_04', code: '3A.04.04', name: 'CIP - Elevated Columns', xwalkId: '193', description: '', children: [] },
      { id: 'wbs_3A_04_05', code: '3A.04.05', name: 'CIP - Elevated Isolated Beams', xwalkId: '194', description: '', children: [] },
      { id: 'wbs_3A_04_06', code: '3A.04.06', name: 'CIP - Elevated Stairs', xwalkId: '195', description: '', children: [] },
      { id: 'wbs_3A_04_07', code: '3A.04.07', name: 'Pan Slab - Elevated', xwalkId: '196', description: '', children: [] },
      { id: 'wbs_3A_04_08', code: '3A.04.08', name: 'Pan Slab - Re-Shore', xwalkId: '197', description: '', children: [] },
      { id: 'wbs_3A_04_09', code: '3A.04.09', name: 'Pan Stairs', xwalkId: '198', description: '', children: [] }
    ] },
    { id: 'wbs_3A_05', code: '3A.05', name: 'Roof Construction', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_05_01', code: '3A.05.01', name: 'CIP - Roof Slab', xwalkId: '199', description: '', children: [] }
    ] },
    { id: 'wbs_3A_06', code: '3A.06', name: 'Exterior', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_06_01', code: '3A.06.01', name: 'Tilt-Wall (Exterior)', xwalkId: '200', description: '', children: [] },
      { id: 'wbs_3A_06_02', code: '3A.06.02', name: 'Tilt-Wall Casting Bed', xwalkId: '201', description: '', children: [] },
      { id: 'wbs_3A_06_03', code: '3A.06.03', name: 'Tilt-Wall Deadman', xwalkId: '202', description: '', children: [] },
      { id: 'wbs_3A_06_04', code: '3A.06.04', name: 'Tilt-Wall Casting Bed - Demo and Remove', xwalkId: '203', description: '', children: [] },
      { id: 'wbs_3A_06_05', code: '3A.06.05', name: 'Tilt-Wall Deadman - Demo and Remove', xwalkId: '204', description: '', children: [] }
    ] },
    { id: 'wbs_3A_07', code: '3A.07', name: 'Interior', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_07_01', code: '3A.07.01', name: 'Tilt-Wall (Interior)', xwalkId: '205', description: '', children: [] },
      { id: 'wbs_3A_07_02', code: '3A.07.02', name: 'Topping Slab - Freezer', xwalkId: '206', description: '', children: [] },
      { id: 'wbs_3A_07_03', code: '3A.07.03', name: 'Topping Slab - Hollow Core Plank', xwalkId: '207', description: '', children: [] },
      { id: 'wbs_3A_07_04', code: '3A.07.04', name: 'CIP Pony Walls - Interior', xwalkId: '208', description: '', children: [] },
      { id: 'wbs_3A_07_05', code: '3A.07.05', name: 'Housekeeping Pad', xwalkId: '209', description: '', children: [] },
      { id: 'wbs_3A_07_06', code: '3A.07.06', name: 'Interior Curb', xwalkId: '210', description: '', children: [] },
      { id: 'wbs_3A_07_07', code: '3A.07.07', name: 'Locker Base', xwalkId: '211', description: '', children: [] },
      { id: 'wbs_3A_07_08', code: '3A.07.08', name: 'Topping on Floor System', xwalkId: '212', description: '', children: [] }
    ] },
    { id: 'wbs_3A_11', code: '3A.11', name: 'Roadways', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_11_10', code: '3A.11.10', name: 'Site - Concrete Paving', xwalkId: '213', description: '', children: [] },
      { id: 'wbs_3A_11_11', code: '3A.11.11', name: 'Site - Concrete Paving - 05"', xwalkId: '214', description: '', children: [] },
      { id: 'wbs_3A_11_12', code: '3A.11.12', name: 'Site - Concrete Paving - 05', xwalkId: '215', description: '', children: [] },
      { id: 'wbs_3A_11_13', code: '3A.11.13', name: 'Site - Concrete Paving - 06"', xwalkId: '216', description: '', children: [] },
      { id: 'wbs_3A_11_14', code: '3A.11.14', name: 'Site - Concrete Paving - 06', xwalkId: '217', description: '', children: [] },
      { id: 'wbs_3A_11_15', code: '3A.11.15', name: 'Site - Concrete Paving - 07"', xwalkId: '218', description: '', children: [] },
      { id: 'wbs_3A_11_16', code: '3A.11.16', name: 'Site - Concrete Paving - 07', xwalkId: '219', description: '', children: [] },
      { id: 'wbs_3A_11_17', code: '3A.11.17', name: 'Site - Concrete Paving - 08"', xwalkId: '220', description: '', children: [] },
      { id: 'wbs_3A_11_18', code: '3A.11.18', name: 'Site - Concrete Paving - 08', xwalkId: '221', description: '', children: [] },
      { id: 'wbs_3A_11_19', code: '3A.11.19', name: 'Site - Concrete Paving - 09"', xwalkId: '222', description: '', children: [] },
      { id: 'wbs_3A_11_20', code: '3A.11.20', name: 'Site - Concrete Paving - 09', xwalkId: '223', description: '', children: [] },
      { id: 'wbs_3A_11_21', code: '3A.11.21', name: 'Site - Concrete Paving - 10"', xwalkId: '224', description: '', children: [] },
      { id: 'wbs_3A_11_30', code: '3A.11.30', name: 'Site - Concrete Curb', xwalkId: '225', description: '', children: [] },
      { id: 'wbs_3A_11_40', code: '3A.11.40', name: 'Site - Concrete Curb & Gutter', xwalkId: '226', description: '', children: [] },
      { id: 'wbs_3A_11_50', code: '3A.11.50', name: 'Site - Concrete Pads', xwalkId: '227', description: '', children: [] }
    ] },
    { id: 'wbs_3A_12', code: '3A.12', name: 'Site Development', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_12_01', code: '3A.12.01', name: 'Site - Sidewalks', xwalkId: '228', description: '', children: [] },
      { id: 'wbs_3A_12_02', code: '3A.12.02', name: 'Site - Sidewalks - ADA Ramp', xwalkId: '229', description: '', children: [] },
      { id: 'wbs_3A_12_03', code: '3A.12.03', name: 'Site - Paver Sub Base Concrete', xwalkId: '230', description: '', children: [] },
      { id: 'wbs_3A_12_04', code: '3A.12.04', name: 'Site - Mow Strip', xwalkId: '231', description: '', children: [] },
      { id: 'wbs_3A_12_05', code: '3A.12.05', name: 'Site - Pilot Channel', xwalkId: '232', description: '', children: [] },
      { id: 'wbs_3A_12_06', code: '3A.12.06', name: 'Site - Ramp', xwalkId: '233', description: '', children: [] },
      { id: 'wbs_3A_12_07', code: '3A.12.07', name: 'Site - Retaining Wall', xwalkId: '234', description: '', children: [] },
      { id: 'wbs_3A_12_10', code: '3A.12.10', name: 'Site - Concrete Wall', xwalkId: '235', description: '', children: [] },
      { id: 'wbs_3A_12_11', code: '3A.12.11', name: 'Site - Wall Footings', xwalkId: '236', description: '', children: [] },
      { id: 'wbs_3A_12_12', code: '3A.12.12', name: 'Site - Concrete Bench', xwalkId: '237', description: '', children: [] },
      { id: 'wbs_3A_12_13', code: '3A.12.13', name: 'Site - Pads', xwalkId: '238', description: '', children: [] },
      { id: 'wbs_3A_12_14', code: '3A.12.14', name: 'Site - Steps', xwalkId: '239', description: '', children: [] },
      { id: 'wbs_3A_12_15', code: '3A.12.15', name: 'Site - Light Pole Base', xwalkId: '240', description: '', children: [] },
      { id: 'wbs_3A_12_16', code: '3A.12.16', name: 'Site - Column Footing', xwalkId: '241', description: '', children: [] },
      { id: 'wbs_3A_12_17', code: '3A.12.17', name: 'Site - Bollards (Install)', xwalkId: '242', description: '', children: [] },
      { id: 'wbs_3A_12_18', code: '3A.12.18', name: 'Site - Flagpole Base', xwalkId: '243', description: '', children: [] },
      { id: 'wbs_3A_12_19', code: '3A.12.19', name: 'Site - Monument Sign Foundation', xwalkId: '244', description: '', children: [] },
      { id: 'wbs_3A_12_20', code: '3A.12.20', name: 'Site - Bike Rack (Install)', xwalkId: '245', description: '', children: [] },
      { id: 'wbs_3A_12_21', code: '3A.12.21', name: 'Site - Sidewalks - Truncated Dome Pavers', xwalkId: '246', description: '', children: [] },
      { id: 'wbs_3A_12_22', code: '3A.12.22', name: 'Underground Ductbank Concrete', xwalkId: '247', description: '', children: [] }
    ] },
    { id: 'wbs_3A_13', code: '3A.13', name: 'Offsite Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3A_13_01', code: '3A.13.01', name: 'Offsite - Concrete Paving', xwalkId: '248', description: '', children: [] },
      { id: 'wbs_3A_13_02', code: '3A.13.02', name: 'Offsite - Concrete Curb', xwalkId: '249', description: '', children: [] },
      { id: 'wbs_3A_13_03', code: '3A.13.03', name: 'Offsite - Concrete Curb & Gutter', xwalkId: '250', description: '', children: [] },
      { id: 'wbs_3A_13_04', code: '3A.13.04', name: 'Offsite - Sidewalks', xwalkId: '251', description: '', children: [] },
      { id: 'wbs_3A_13_05', code: '3A.13.05', name: 'Offsite - Sidewalks - ADA Ramps', xwalkId: '252', description: '', children: [] },
      { id: 'wbs_3A_13_06', code: '3A.13.06', name: 'Offsite - Light Pole Base', xwalkId: '253', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3B', code: '3B', name: 'LWIC', xwalkId: '', description: '', children: [
    { id: 'wbs_3B_00', code: '3B.00', name: 'LWIC System', xwalkId: '', description: '', children: [
      { id: 'wbs_3B_00_00', code: '3B.00.00', name: 'LWIC - Turnkey', xwalkId: '254', description: '', children: [] }
    ] },
    { id: 'wbs_3B_01', code: '3B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3B_01_01', code: '3B.01.01', name: 'Mobilization', xwalkId: '255', description: '', children: [] },
      { id: 'wbs_3B_01_02', code: '3B.01.02', name: 'Bond/Permit', xwalkId: '256', description: '', children: [] },
      { id: 'wbs_3B_01_03', code: '3B.01.03', name: 'Submittals', xwalkId: '257', description: '', children: [] },
      { id: 'wbs_3B_01_04', code: '3B.01.04', name: 'Equip Rentals', xwalkId: '258', description: '', children: [] },
      { id: 'wbs_3B_01_05', code: '3B.01.05', name: 'Supervision', xwalkId: '259', description: '', children: [] },
      { id: 'wbs_3B_01_06', code: '3B.01.06', name: 'Demobilization', xwalkId: '260', description: '', children: [] },
      { id: 'wbs_3B_01_07', code: '3B.01.07', name: 'Close-Out', xwalkId: '261', description: '', children: [] }
    ] },
    { id: 'wbs_3B_02', code: '3B.02', name: 'Decks', xwalkId: '', description: '', children: [
      { id: 'wbs_3B_02_03', code: '3B.02.03', name: 'Tectum Roof Decks', xwalkId: '262', description: '', children: [] }
    ] },
    { id: 'wbs_3B_03', code: '3B.03', name: 'Lightweight Insulating Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3B_03_01', code: '3B.03.01', name: 'Lightweight Slurry Fill', xwalkId: '263', description: '', children: [] },
      { id: 'wbs_3B_03_02', code: '3B.03.02', name: 'EPS Insulation Board', xwalkId: '264', description: '', children: [] },
      { id: 'wbs_3B_03_03', code: '3B.03.03', name: 'Lightweight Concrete Topping', xwalkId: '265', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3C', code: '3C', name: 'Hollow-Core Plank', xwalkId: '', description: '', children: [
    { id: 'wbs_3C_01', code: '3C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3C_01_01', code: '3C.01.01', name: 'Mobilization', xwalkId: '266', description: '', children: [] },
      { id: 'wbs_3C_01_02', code: '3C.01.02', name: 'Bond/Permit', xwalkId: '267', description: '', children: [] },
      { id: 'wbs_3C_01_03', code: '3C.01.03', name: 'Submittals', xwalkId: '268', description: '', children: [] },
      { id: 'wbs_3C_01_04', code: '3C.01.04', name: 'Equip Rentals', xwalkId: '269', description: '', children: [] },
      { id: 'wbs_3C_01_05', code: '3C.01.05', name: 'Supervision', xwalkId: '270', description: '', children: [] },
      { id: 'wbs_3C_01_06', code: '3C.01.06', name: 'Demobilization', xwalkId: '271', description: '', children: [] },
      { id: 'wbs_3C_01_07', code: '3C.01.07', name: 'Close-Out', xwalkId: '272', description: '', children: [] },
      { id: 'wbs_3C_01_09', code: '3C.01.09', name: 'Cleaning', xwalkId: '273', description: '', children: [] }
    ] },
    { id: 'wbs_3C_02', code: '3C.02', name: 'Hollow Core Precast Planks', xwalkId: '', description: '', children: [
      { id: 'wbs_3C_02_10', code: '3C.02.10', name: 'Precast Hollow Core Planks', xwalkId: '274', description: '', children: [] },
      { id: 'wbs_3C_02_11', code: '3C.02.11', name: 'Precast Hollow Core Planks - 6"', xwalkId: '275', description: '', children: [] },
      { id: 'wbs_3C_02_12', code: '3C.02.12', name: 'Precast Hollow Core Planks - 8"', xwalkId: '276', description: '', children: [] },
      { id: 'wbs_3C_02_13', code: '3C.02.13', name: 'Precast Hollow Core Planks - 10"', xwalkId: '277', description: '', children: [] },
      { id: 'wbs_3C_02_14', code: '3C.02.14', name: 'Precast Hollow Core Planks - 12"', xwalkId: '278', description: '', children: [] }
    ] },
    { id: 'wbs_3C_03', code: '3C.03', name: 'Hollow Core Precast Planks - Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_3C_03_10', code: '3C.03.10', name: 'Hollow Core Plank - Bearing Pads', xwalkId: '279', description: '', children: [] },
      { id: 'wbs_3C_03_20', code: '3C.03.20', name: 'Hollow Core Plank - Joint Grout', xwalkId: '280', description: '', children: [] },
      { id: 'wbs_3C_03_30', code: '3C.03.30', name: 'Hollow Core Plank - Connections & Supports', xwalkId: '281', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3D', code: '3D', name: 'Precast Concrete', xwalkId: '', description: '', children: [
    { id: 'wbs_3D_01', code: '3D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_01_01', code: '3D.01.01', name: 'Mobilization', xwalkId: '282', description: '', children: [] },
      { id: 'wbs_3D_01_02', code: '3D.01.02', name: 'Bond/Permit', xwalkId: '283', description: '', children: [] },
      { id: 'wbs_3D_01_03', code: '3D.01.03', name: 'Submittals', xwalkId: '284', description: '', children: [] },
      { id: 'wbs_3D_01_04', code: '3D.01.04', name: 'Equip Rentals', xwalkId: '285', description: '', children: [] },
      { id: 'wbs_3D_01_05', code: '3D.01.05', name: 'Supervision', xwalkId: '286', description: '', children: [] },
      { id: 'wbs_3D_01_06', code: '3D.01.06', name: 'Demobilization', xwalkId: '287', description: '', children: [] },
      { id: 'wbs_3D_01_07', code: '3D.01.07', name: 'Close-Out', xwalkId: '288', description: '', children: [] },
      { id: 'wbs_3D_01_09', code: '3D.01.09', name: 'Cleaning', xwalkId: '289', description: '', children: [] },
      { id: 'wbs_3D_01_10', code: '3D.01.10', name: 'Mockup', xwalkId: '290', description: '', children: [] },
      { id: 'wbs_3D_01_11', code: '3D.01.11', name: 'Safety Cables/Rails', xwalkId: '291', description: '', children: [] }
    ] },
    { id: 'wbs_3D_02', code: '3D.02', name: 'Structural Precast Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_02_10', code: '3D.02.10', name: 'Precast Columns', xwalkId: '292', description: '', children: [] },
      { id: 'wbs_3D_02_20', code: '3D.02.20', name: 'Precast Beams, Spandrels & Girders', xwalkId: '293', description: '', children: [] },
      { id: 'wbs_3D_02_30', code: '3D.02.30', name: 'Precast Double Tees', xwalkId: '294', description: '', children: [] },
      { id: 'wbs_3D_02_40', code: '3D.02.40', name: 'Precast Slabs & Ramps', xwalkId: '295', description: '', children: [] },
      { id: 'wbs_3D_02_50', code: '3D.02.50', name: 'Precast Solid Wall Panel Assemblies', xwalkId: '296', description: '', children: [] },
      { id: 'wbs_3D_02_60', code: '3D.02.60', name: 'Precast Insulated Wall Panel Assemblies', xwalkId: '297', description: '', children: [] },
      { id: 'wbs_3D_02_70', code: '3D.02.70', name: 'Precast Stairs', xwalkId: '298', description: '', children: [] },
      { id: 'wbs_3D_02_80', code: '3D.02.80', name: 'Precast Barrier Walls', xwalkId: '299', description: '', children: [] }
    ] },
    { id: 'wbs_3D_03', code: '3D.03', name: 'Precast Stadium Seatings', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_03_10', code: '3D.03.10', name: 'Precast Stadium Seatings - Columns', xwalkId: '300', description: '', children: [] },
      { id: 'wbs_3D_03_20', code: '3D.03.20', name: 'Precast Stadium Seatings - Raker Beams', xwalkId: '301', description: '', children: [] },
      { id: 'wbs_3D_03_30', code: '3D.03.30', name: 'Precast Stadium Seatings - Wall Panels', xwalkId: '302', description: '', children: [] },
      { id: 'wbs_3D_03_40', code: '3D.03.40', name: 'Precast Stadium Seatings - Stairs', xwalkId: '303', description: '', children: [] },
      { id: 'wbs_3D_03_50', code: '3D.03.50', name: 'Precast Stadium Seatings - Risers', xwalkId: '304', description: '', children: [] },
      { id: 'wbs_3D_03_60', code: '3D.03.60', name: 'Precast Bleachers', xwalkId: '305', description: '', children: [] }
    ] },
    { id: 'wbs_3D_04', code: '3D.04', name: 'Architectural Precast Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_04_10', code: '3D.04.10', name: 'Precast Stair Treads', xwalkId: '306', description: '', children: [] },
      { id: 'wbs_3D_04_20', code: '3D.04.20', name: 'Precast Balustrade/Railing', xwalkId: '307', description: '', children: [] }
    ] },
    { id: 'wbs_3D_05', code: '3D.05', name: 'Precast Fences & Barriers', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_05_10', code: '3D.05.10', name: 'Precast Traffic Barriers', xwalkId: '308', description: '', children: [] },
      { id: 'wbs_3D_05_20', code: '3D.05.20', name: 'Precast Fences', xwalkId: '309', description: '', children: [] }
    ] },
    { id: 'wbs_3D_06', code: '3D.06', name: 'Precast Site Furnishing', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_06_10', code: '3D.06.10', name: 'Precast Bollards', xwalkId: '310', description: '', children: [] },
      { id: 'wbs_3D_06_20', code: '3D.06.20', name: 'Precast Planters', xwalkId: '311', description: '', children: [] },
      { id: 'wbs_3D_06_30', code: '3D.06.30', name: 'Precast Benches', xwalkId: '312', description: '', children: [] },
      { id: 'wbs_3D_06_40', code: '3D.06.40', name: 'Precast Countertops', xwalkId: '313', description: '', children: [] }
    ] },
    { id: 'wbs_3D_07', code: '3D.07', name: 'Precast - Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_3D_07_10', code: '3D.07.10', name: 'Precast - Connection Steel', xwalkId: '314', description: '', children: [] },
      { id: 'wbs_3D_07_20', code: '3D.07.20', name: 'Precast - Grout Packing', xwalkId: '315', description: '', children: [] },
      { id: 'wbs_3D_07_30', code: '3D.07.30', name: 'Precast - Bearing Pads & Shims', xwalkId: '316', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3E', code: '3E', name: 'Architectural Concrete', xwalkId: '', description: '', children: [
    { id: 'wbs_3E_01', code: '3E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3E_01_01', code: '3E.01.01', name: 'Mobilization', xwalkId: '317', description: '', children: [] },
      { id: 'wbs_3E_01_02', code: '3E.01.02', name: 'Bond/Permit', xwalkId: '318', description: '', children: [] },
      { id: 'wbs_3E_01_03', code: '3E.01.03', name: 'Submittals', xwalkId: '319', description: '', children: [] },
      { id: 'wbs_3E_01_04', code: '3E.01.04', name: 'Equip Rentals', xwalkId: '320', description: '', children: [] },
      { id: 'wbs_3E_01_07', code: '3E.01.07', name: 'Close-Out', xwalkId: '321', description: '', children: [] },
      { id: 'wbs_3E_01_09', code: '3E.01.09', name: 'Cleaning', xwalkId: '322', description: '', children: [] },
      { id: 'wbs_3E_01_10', code: '3E.01.10', name: 'Mockup', xwalkId: '323', description: '', children: [] }
    ] },
    { id: 'wbs_3E_02', code: '3E.02', name: 'Glass-Fiber-Reinforced Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_3E_02_10', code: '3E.02.10', name: 'GFRC Wall Panels', xwalkId: '324', description: '', children: [] },
      { id: 'wbs_3E_02_20', code: '3E.02.20', name: 'GFRC Soffit Panels', xwalkId: '325', description: '', children: [] },
      { id: 'wbs_3E_02_30', code: '3E.02.30', name: 'GFRC Column Covers', xwalkId: '326', description: '', children: [] },
      { id: 'wbs_3E_02_40', code: '3E.02.40', name: 'GFRC Fascia', xwalkId: '327', description: '', children: [] },
      { id: 'wbs_3E_02_50', code: '3E.02.50', name: 'GFRC Trims & Cornice', xwalkId: '328', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_3F', code: '3F', name: 'Gypcrete', xwalkId: '', description: '', children: [
    { id: 'wbs_3F_01', code: '3F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_3F_01_01', code: '3F.01.01', name: 'Mobilization', xwalkId: '329', description: '', children: [] },
      { id: 'wbs_3F_01_02', code: '3F.01.02', name: 'Bond/Permit', xwalkId: '330', description: '', children: [] },
      { id: 'wbs_3F_01_03', code: '3F.01.03', name: 'Submittals', xwalkId: '331', description: '', children: [] },
      { id: 'wbs_3F_01_07', code: '3F.01.07', name: 'Close-Out', xwalkId: '332', description: '', children: [] },
      { id: 'wbs_3F_01_09', code: '3F.01.09', name: 'Cleaning', xwalkId: '333', description: '', children: [] }
    ] },
    { id: 'wbs_3F_02', code: '3F.02', name: 'Subfloor System', xwalkId: '', description: '', children: [
      { id: 'wbs_3F_02_01', code: '3F.02.01', name: 'Gypsum Underlayment', xwalkId: '334', description: '', children: [] },
      { id: 'wbs_3F_02_02', code: '3F.02.02', name: 'Acoustical/Sound Mat', xwalkId: '335', description: '', children: [] },
      { id: 'wbs_3F_02_03', code: '3F.02.03', name: 'Perimeter Isolation Strips', xwalkId: '336', description: '', children: [] }
    ] },
    { id: 'wbs_3F_03', code: '3F.03', name: 'Exterior Concrete Topping System', xwalkId: '', description: '', children: [
      { id: 'wbs_3F_03_01', code: '3F.03.01', name: 'Regular Weight Concrete Topping', xwalkId: '337', description: '', children: [] },
      { id: 'wbs_3F_03_02', code: '3F.03.02', name: 'Light Weight Concrete Topping', xwalkId: '338', description: '', children: [] }
    ] },
    { id: 'wbs_3F_04', code: '3F.04', name: 'Waterproofing Under Concrete Topping', xwalkId: '', description: '', children: [
      { id: 'wbs_3F_04_01', code: '3F.04.01', name: 'Under Topping Slab Waterproofing - Sheet', xwalkId: '339', description: '', children: [] },
      { id: 'wbs_3F_04_02', code: '3F.04.02', name: 'Under Topping Slab Waterproofing - Hot Poured', xwalkId: '340', description: '', children: [] },
      { id: 'wbs_3F_04_03', code: '3F.04.03', name: 'Under Topping Slab Waterproofing - Cold Poured', xwalkId: '341', description: '', children: [] },
      { id: 'wbs_3F_04_04', code: '3F.04.04', name: 'Under Topping Slab Waterproofing - Drainage Mat', xwalkId: '342', description: '', children: [] },
      { id: 'wbs_3F_04_05', code: '3F.04.05', name: 'Under Topping Slab Waterproofing - Flashings & Door Pockets', xwalkId: '343', description: '', children: [] }
    ] },
    { id: 'wbs_3F_05', code: '3F.05', name: 'Gypcrete - Coating', xwalkId: '', description: '', children: [
      { id: 'wbs_3F_05_01', code: '3F.05.01', name: 'Gypcrete Sealer', xwalkId: '344', description: '', children: [] },
      { id: 'wbs_3F_05_02', code: '3F.05.02', name: 'Concrete Topping - Clear Sealer', xwalkId: '345', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_4A', code: '4A', name: 'Masonry', xwalkId: '', description: '', children: [
    { id: 'wbs_4A_01', code: '4A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_01_01', code: '4A.01.01', name: 'Mobilization', xwalkId: '346', description: '', children: [] },
      { id: 'wbs_4A_01_02', code: '4A.01.02', name: 'Bond/Permit', xwalkId: '347', description: '', children: [] },
      { id: 'wbs_4A_01_03', code: '4A.01.03', name: 'Submittals', xwalkId: '348', description: '', children: [] },
      { id: 'wbs_4A_01_04', code: '4A.01.04', name: 'Equip Rentals', xwalkId: '349', description: '', children: [] },
      { id: 'wbs_4A_01_05', code: '4A.01.05', name: 'Supervision', xwalkId: '350', description: '', children: [] },
      { id: 'wbs_4A_01_06', code: '4A.01.06', name: 'Demobilization', xwalkId: '351', description: '', children: [] },
      { id: 'wbs_4A_01_07', code: '4A.01.07', name: 'Close-Out', xwalkId: '352', description: '', children: [] },
      { id: 'wbs_4A_01_09', code: '4A.01.09', name: 'Cleaning', xwalkId: '353', description: '', children: [] },
      { id: 'wbs_4A_01_10', code: '4A.01.10', name: 'Mockup', xwalkId: '354', description: '', children: [] }
    ] },
    { id: 'wbs_4A_02', code: '4A.02', name: 'Exterior Wall Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_02_10', code: '4A.02.10', name: 'Exterior Wall - Brick', xwalkId: '355', description: '', children: [] },
      { id: 'wbs_4A_02_20', code: '4A.02.20', name: 'Exterior Wall - CMU (Regular)', xwalkId: '356', description: '', children: [] },
      { id: 'wbs_4A_02_21', code: '4A.02.21', name: 'Exterior Wall - CMU (Regular) - 4"', xwalkId: '357', description: '', children: [] },
      { id: 'wbs_4A_02_22', code: '4A.02.22', name: 'Exterior Wall - CMU (Regular) - 6"', xwalkId: '358', description: '', children: [] },
      { id: 'wbs_4A_02_23', code: '4A.02.23', name: 'Exterior Wall - CMU (Regular) - 8"', xwalkId: '359', description: '', children: [] },
      { id: 'wbs_4A_02_24', code: '4A.02.24', name: 'Exterior Wall - CMU (Regular) - 10"', xwalkId: '360', description: '', children: [] },
      { id: 'wbs_4A_02_25', code: '4A.02.25', name: 'Exterior Wall - CMU (Regular) - 12"', xwalkId: '361', description: '', children: [] },
      { id: 'wbs_4A_02_30', code: '4A.02.30', name: 'Exterior Wall - CMU (Split Face)', xwalkId: '362', description: '', children: [] },
      { id: 'wbs_4A_02_31', code: '4A.02.31', name: 'Exterior Wall - CMU (Split Face) - 4"', xwalkId: '363', description: '', children: [] },
      { id: 'wbs_4A_02_32', code: '4A.02.32', name: 'Exterior Wall - CMU (Split Face) - 6"', xwalkId: '364', description: '', children: [] },
      { id: 'wbs_4A_02_33', code: '4A.02.33', name: 'Exterior Wall - CMU (Split Face) - 8"', xwalkId: '365', description: '', children: [] },
      { id: 'wbs_4A_02_34', code: '4A.02.34', name: 'Exterior Wall - CMU (Split Face) - 10"', xwalkId: '366', description: '', children: [] },
      { id: 'wbs_4A_02_35', code: '4A.02.35', name: 'Exterior Wall - CMU (Split Face) - 12"', xwalkId: '367', description: '', children: [] },
      { id: 'wbs_4A_02_40', code: '4A.02.40', name: 'Exterior Wall - CMU (Burnished Block)', xwalkId: '368', description: '', children: [] },
      { id: 'wbs_4A_02_41', code: '4A.02.41', name: 'Exterior Wall - CMU (Burnished Block) - 4"', xwalkId: '369', description: '', children: [] },
      { id: 'wbs_4A_02_42', code: '4A.02.42', name: 'Exterior Wall - CMU (Burnished Block) - 6"', xwalkId: '370', description: '', children: [] },
      { id: 'wbs_4A_02_43', code: '4A.02.43', name: 'Exterior Wall - CMU (Burnished Block) - 8"', xwalkId: '371', description: '', children: [] },
      { id: 'wbs_4A_02_44', code: '4A.02.44', name: 'Exterior Wall - CMU (Burnished Block) - 10"', xwalkId: '372', description: '', children: [] },
      { id: 'wbs_4A_02_45', code: '4A.02.45', name: 'Exterior Wall - CMU (Burnished Block) - 12"', xwalkId: '373', description: '', children: [] },
      { id: 'wbs_4A_02_50', code: '4A.02.50', name: 'Exterior Wall - CMU (Lightweight)', xwalkId: '374', description: '', children: [] },
      { id: 'wbs_4A_02_51', code: '4A.02.51', name: 'Exterior Wall - CMU (Lightweight) - 4"', xwalkId: '375', description: '', children: [] },
      { id: 'wbs_4A_02_52', code: '4A.02.52', name: 'Exterior Wall - CMU (Lightweight) - 6"', xwalkId: '376', description: '', children: [] },
      { id: 'wbs_4A_02_53', code: '4A.02.53', name: 'Exterior Wall - CMU (Lightweight) - 8"', xwalkId: '377', description: '', children: [] },
      { id: 'wbs_4A_02_54', code: '4A.02.54', name: 'Exterior Wall - CMU (Lightweight) - 10"', xwalkId: '378', description: '', children: [] },
      { id: 'wbs_4A_02_55', code: '4A.02.55', name: 'Exterior Wall - CMU (Lightweight) - 12"', xwalkId: '379', description: '', children: [] }
    ] },
    { id: 'wbs_4A_03', code: '4A.03', name: 'Exterior Wall Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_03_10', code: '4A.03.10', name: 'Exterior Wall Veneer - Brick', xwalkId: '380', description: '', children: [] },
      { id: 'wbs_4A_03_20', code: '4A.03.20', name: 'Exterior Wall Veneer - CMU', xwalkId: '381', description: '', children: [] },
      { id: 'wbs_4A_03_30', code: '4A.03.30', name: 'Exterior Wall Veneer - Manufactured Stone', xwalkId: '382', description: '', children: [] },
      { id: 'wbs_4A_03_40', code: '4A.03.40', name: 'Exterior Wall Veneer - Stone Panel', xwalkId: '383', description: '', children: [] },
      { id: 'wbs_4A_03_50', code: '4A.03.50', name: 'Exterior Wall Veneer - Cast Stone', xwalkId: '384', description: '', children: [] }
    ] },
    { id: 'wbs_4A_04', code: '4A.04', name: 'Exterior Wall Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_04_10', code: '4A.04.10', name: 'Exterior Masonry Wall - Rebar', xwalkId: '385', description: '', children: [] },
      { id: 'wbs_4A_04_20', code: '4A.04.20', name: 'Exterior Masonry Wall - Grout Fill', xwalkId: '386', description: '', children: [] },
      { id: 'wbs_4A_04_30', code: '4A.04.30', name: 'Exterior Masonry Wall - Accessories', xwalkId: '387', description: '', children: [] },
      { id: 'wbs_4A_04_40', code: '4A.04.40', name: 'Exterior Masonry Wall - Install HM Frames', xwalkId: '388', description: '', children: [] },
      { id: 'wbs_4A_04_50', code: '4A.04.50', name: 'Exterior Masonry Wall - Install Loose Lintels', xwalkId: '389', description: '', children: [] }
    ] },
    { id: 'wbs_4A_05', code: '4A.05', name: 'Interior Wall Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_05_10', code: '4A.05.10', name: 'Interior Wall - Brick', xwalkId: '390', description: '', children: [] },
      { id: 'wbs_4A_05_20', code: '4A.05.20', name: 'Interior Wall - CMU (Regular)', xwalkId: '391', description: '', children: [] },
      { id: 'wbs_4A_05_21', code: '4A.05.21', name: 'Interior Wall - CMU (Regular) - 4"', xwalkId: '392', description: '', children: [] },
      { id: 'wbs_4A_05_22', code: '4A.05.22', name: 'Interior Wall - CMU (Regular) - 6"', xwalkId: '393', description: '', children: [] },
      { id: 'wbs_4A_05_23', code: '4A.05.23', name: 'Interior Wall - CMU (Regular) - 8"', xwalkId: '394', description: '', children: [] },
      { id: 'wbs_4A_05_24', code: '4A.05.24', name: 'Interior Wall - CMU (Regular) - 10"', xwalkId: '395', description: '', children: [] },
      { id: 'wbs_4A_05_25', code: '4A.05.25', name: 'Interior Wall - CMU (Regular) - 12"', xwalkId: '396', description: '', children: [] },
      { id: 'wbs_4A_05_30', code: '4A.05.30', name: 'Interior Wall - CMU (Split Face)', xwalkId: '397', description: '', children: [] },
      { id: 'wbs_4A_05_31', code: '4A.05.31', name: 'Interior Wall - CMU (Split Face) - 4"', xwalkId: '398', description: '', children: [] },
      { id: 'wbs_4A_05_32', code: '4A.05.32', name: 'Interior Wall - CMU (Split Face) - 6"', xwalkId: '399', description: '', children: [] },
      { id: 'wbs_4A_05_33', code: '4A.05.33', name: 'Interior Wall - CMU (Split Face) - 8"', xwalkId: '400', description: '', children: [] },
      { id: 'wbs_4A_05_34', code: '4A.05.34', name: 'Interior Wall - CMU (Split Face) - 10"', xwalkId: '401', description: '', children: [] },
      { id: 'wbs_4A_05_35', code: '4A.05.35', name: 'Interior Wall - CMU (Split Face) - 12"', xwalkId: '402', description: '', children: [] },
      { id: 'wbs_4A_05_40', code: '4A.05.40', name: 'Interior Wall - CMU (Burnished Block)', xwalkId: '403', description: '', children: [] },
      { id: 'wbs_4A_05_41', code: '4A.05.41', name: 'Interior Wall - CMU (Burnished Block) - 4"', xwalkId: '404', description: '', children: [] },
      { id: 'wbs_4A_05_42', code: '4A.05.42', name: 'Interior Wall - CMU (Burnished Block) - 6"', xwalkId: '405', description: '', children: [] },
      { id: 'wbs_4A_05_43', code: '4A.05.43', name: 'Interior Wall - CMU (Burnished Block) - 8"', xwalkId: '406', description: '', children: [] },
      { id: 'wbs_4A_05_44', code: '4A.05.44', name: 'Interior Wall - CMU (Burnished Block) - 10"', xwalkId: '407', description: '', children: [] },
      { id: 'wbs_4A_05_45', code: '4A.05.45', name: 'Interior Wall - CMU (Burnished Block) - 12"', xwalkId: '408', description: '', children: [] },
      { id: 'wbs_4A_05_50', code: '4A.05.50', name: 'Interior Wall - CMU (Lightweight)', xwalkId: '409', description: '', children: [] },
      { id: 'wbs_4A_05_51', code: '4A.05.51', name: 'Interior Wall - CMU (Lightweight) - 4"', xwalkId: '410', description: '', children: [] },
      { id: 'wbs_4A_05_52', code: '4A.05.52', name: 'Interior Wall - CMU (Lightweight) - 6"', xwalkId: '411', description: '', children: [] },
      { id: 'wbs_4A_05_53', code: '4A.05.53', name: 'Interior Wall - CMU (Lightweight) - 8"', xwalkId: '412', description: '', children: [] },
      { id: 'wbs_4A_05_54', code: '4A.05.54', name: 'Interior Wall - CMU (Lightweight) - 10"', xwalkId: '413', description: '', children: [] },
      { id: 'wbs_4A_05_55', code: '4A.05.55', name: 'Interior Wall - CMU (Lightweight) - 12"', xwalkId: '414', description: '', children: [] },
      { id: 'wbs_4A_05_60', code: '4A.05.60', name: 'Interior Wall - CMU (Sound Block)', xwalkId: '415', description: '', children: [] },
      { id: 'wbs_4A_05_61', code: '4A.05.61', name: 'Interior Wall - CMU (Sound Block) - 4"', xwalkId: '416', description: '', children: [] },
      { id: 'wbs_4A_05_62', code: '4A.05.62', name: 'Interior Wall - CMU (Sound Block) - 6"', xwalkId: '417', description: '', children: [] },
      { id: 'wbs_4A_05_63', code: '4A.05.63', name: 'Interior Wall - CMU (Sound Block) - 8"', xwalkId: '418', description: '', children: [] },
      { id: 'wbs_4A_05_64', code: '4A.05.64', name: 'Interior Wall - CMU (Sound Block) - 10"', xwalkId: '419', description: '', children: [] },
      { id: 'wbs_4A_05_65', code: '4A.05.65', name: 'Interior Wall - CMU (Sound Block) - 12"', xwalkId: '420', description: '', children: [] },
      { id: 'wbs_4A_05_70', code: '4A.05.70', name: 'Interior Wall - CMU (Glazed Block)', xwalkId: '421', description: '', children: [] },
      { id: 'wbs_4A_05_71', code: '4A.05.71', name: 'Interior Wall - CMU (Glazed Block) - 4"', xwalkId: '422', description: '', children: [] },
      { id: 'wbs_4A_05_72', code: '4A.05.72', name: 'Interior Wall - CMU (Glazed Block) - 6"', xwalkId: '423', description: '', children: [] },
      { id: 'wbs_4A_05_73', code: '4A.05.73', name: 'Interior Wall - CMU (Glazed Block) - 8"', xwalkId: '424', description: '', children: [] },
      { id: 'wbs_4A_05_74', code: '4A.05.74', name: 'Interior Wall - CMU (Glazed Block) - 10"', xwalkId: '425', description: '', children: [] },
      { id: 'wbs_4A_05_75', code: '4A.05.75', name: 'Interior Wall - CMU (Glazed Block) - 12"', xwalkId: '426', description: '', children: [] }
    ] },
    { id: 'wbs_4A_06', code: '4A.06', name: 'Interior Wall Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_06_10', code: '4A.06.10', name: 'Interior Wall Veneer - Brick', xwalkId: '427', description: '', children: [] },
      { id: 'wbs_4A_06_20', code: '4A.06.20', name: 'Interior Wall Veneer - Stone', xwalkId: '428', description: '', children: [] },
      { id: 'wbs_4A_06_30', code: '4A.06.30', name: 'Interior Wall Veneer - Glazed Block', xwalkId: '429', description: '', children: [] }
    ] },
    { id: 'wbs_4A_07', code: '4A.07', name: 'Interior Wall Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_07_10', code: '4A.07.10', name: 'Interior Masonry Wall - Rebar', xwalkId: '430', description: '', children: [] },
      { id: 'wbs_4A_07_20', code: '4A.07.20', name: 'Interior Masonry Wall - Grout Fill', xwalkId: '431', description: '', children: [] },
      { id: 'wbs_4A_07_30', code: '4A.07.30', name: 'Interior Masonry Wall - Foam Insulation', xwalkId: '432', description: '', children: [] },
      { id: 'wbs_4A_07_40', code: '4A.07.40', name: 'Interior Masonry Wall - Accessories', xwalkId: '433', description: '', children: [] },
      { id: 'wbs_4A_07_50', code: '4A.07.50', name: 'Interior Masonry Wall - Install HM Frames', xwalkId: '434', description: '', children: [] }
    ] },
    { id: 'wbs_4A_08', code: '4A.08', name: 'Site Masonry', xwalkId: '', description: '', children: [
      { id: 'wbs_4A_08_10', code: '4A.08.10', name: 'Site Wall Veneer - Brick', xwalkId: '435', description: '', children: [] },
      { id: 'wbs_4A_08_20', code: '4A.08.20', name: 'Site Wall Veneer - Stone', xwalkId: '436', description: '', children: [] },
      { id: 'wbs_4A_08_30', code: '4A.08.30', name: 'Site Wall - CMU', xwalkId: '437', description: '', children: [] },
      { id: 'wbs_4A_08_31', code: '4A.08.31', name: 'Site Wall - CMU - 4"', xwalkId: '438', description: '', children: [] },
      { id: 'wbs_4A_08_32', code: '4A.08.32', name: 'Site Wall - CMU - 6"', xwalkId: '439', description: '', children: [] },
      { id: 'wbs_4A_08_33', code: '4A.08.33', name: 'Site Wall - CMU - 8"', xwalkId: '440', description: '', children: [] },
      { id: 'wbs_4A_08_34', code: '4A.08.34', name: 'Site Wall - CMU - 10"', xwalkId: '441', description: '', children: [] },
      { id: 'wbs_4A_08_35', code: '4A.08.35', name: 'Site Wall - CMU - 12"', xwalkId: '442', description: '', children: [] },
      { id: 'wbs_4A_08_40', code: '4A.08.40', name: 'Site Wall - Cast Stone', xwalkId: '443', description: '', children: [] },
      { id: 'wbs_4A_08_50', code: '4A.08.50', name: 'Site Wall - Rebar', xwalkId: '444', description: '', children: [] },
      { id: 'wbs_4A_08_60', code: '4A.08.60', name: 'Site Wall - Grout Fill', xwalkId: '445', description: '', children: [] },
      { id: 'wbs_4A_08_70', code: '4A.08.70', name: 'Site Wall - Accessories', xwalkId: '446', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_4B', code: '4B', name: 'Insulated Concrete Walls', xwalkId: '', description: '', children: [
    { id: 'wbs_4B_01', code: '4B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_4B_01_01', code: '4B.01.01', name: 'Mobilization', xwalkId: '447', description: '', children: [] },
      { id: 'wbs_4B_01_02', code: '4B.01.02', name: 'Bond/Permit', xwalkId: '448', description: '', children: [] },
      { id: 'wbs_4B_01_03', code: '4B.01.03', name: 'Submittals', xwalkId: '449', description: '', children: [] },
      { id: 'wbs_4B_01_04', code: '4B.01.04', name: 'Equip Rentals', xwalkId: '450', description: '', children: [] },
      { id: 'wbs_4B_01_05', code: '4B.01.05', name: 'Supervision', xwalkId: '451', description: '', children: [] },
      { id: 'wbs_4B_01_06', code: '4B.01.06', name: 'Demobilization', xwalkId: '452', description: '', children: [] },
      { id: 'wbs_4B_01_07', code: '4B.01.07', name: 'Close-Out', xwalkId: '453', description: '', children: [] },
      { id: 'wbs_4B_01_09', code: '4B.01.09', name: 'Cleaning', xwalkId: '454', description: '', children: [] },
      { id: 'wbs_4B_01_10', code: '4B.01.10', name: 'Mockup', xwalkId: '455', description: '', children: [] },
      { id: 'wbs_4B_01_18', code: '4B.01.18', name: 'Temporary Scaffolding & Platforms', xwalkId: '456', description: '', children: [] },
      { id: 'wbs_4B_01_19', code: '4B.01.19', name: 'Shoring & Bracing', xwalkId: '457', description: '', children: [] }
    ] },
    { id: 'wbs_4B_02', code: '4B.02', name: 'Exterior ICF Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_4B_02_10', code: '4B.02.10', name: 'Exterior Wall - ICF Panels', xwalkId: '458', description: '', children: [] },
      { id: 'wbs_4B_02_11', code: '4B.02.11', name: 'Exterior Wall - ICF Panels - 04" Core + Form Each Side', xwalkId: '459', description: '', children: [] },
      { id: 'wbs_4B_02_12', code: '4B.02.12', name: 'Exterior Wall - ICF Panels - 06" Core + Form Each Side', xwalkId: '460', description: '', children: [] },
      { id: 'wbs_4B_02_13', code: '4B.02.13', name: 'Exterior Wall - ICF Panels - 08" Core + Form Each Side', xwalkId: '461', description: '', children: [] },
      { id: 'wbs_4B_02_14', code: '4B.02.14', name: 'Exterior Wall - ICF Panels - 10" Core + Form Each Side', xwalkId: '462', description: '', children: [] },
      { id: 'wbs_4B_02_15', code: '4B.02.15', name: 'Exterior Wall - ICF Panels - 12" Core + Form Each Side', xwalkId: '463', description: '', children: [] }
    ] },
    { id: 'wbs_4B_03', code: '4B.03', name: 'Interior ICF Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_4B_03_10', code: '4B.03.10', name: 'Interior Wall - ICF Panels', xwalkId: '464', description: '', children: [] },
      { id: 'wbs_4B_03_11', code: '4B.03.11', name: 'Interior Wall - ICF Panels - 04" Core + Form Each Side', xwalkId: '465', description: '', children: [] },
      { id: 'wbs_4B_03_12', code: '4B.03.12', name: 'Interior Wall - ICF Panels - 06" Core + Form Each Side', xwalkId: '466', description: '', children: [] },
      { id: 'wbs_4B_03_13', code: '4B.03.13', name: 'Interior Wall - ICF Panels - 08" Core + Form Each Side', xwalkId: '467', description: '', children: [] },
      { id: 'wbs_4B_03_14', code: '4B.03.14', name: 'Interior Wall - ICF Panels - 10" Core + Form Each Side', xwalkId: '468', description: '', children: [] },
      { id: 'wbs_4B_03_15', code: '4B.03.15', name: 'Interior Wall - ICF Panels - 12" Core + Form Each Side', xwalkId: '469', description: '', children: [] }
    ] },
    { id: 'wbs_4B_04', code: '4B.04', name: 'ICF Panel Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_4B_04_10', code: '4B.04.10', name: 'ICF Panels - Wall Alignment System', xwalkId: '470', description: '', children: [] },
      { id: 'wbs_4B_04_20', code: '4B.04.20', name: 'ICF Panels - Window, Door, Corner Bucks', xwalkId: '471', description: '', children: [] }
    ] },
    { id: 'wbs_4B_05', code: '4B.05', name: 'ICF Panel Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_4B_05_10', code: '4B.05.10', name: 'ICF Panels - Concrete', xwalkId: '472', description: '', children: [] },
      { id: 'wbs_4B_05_20', code: '4B.05.20', name: 'ICF Panels - Rebar', xwalkId: '473', description: '', children: [] },
      { id: 'wbs_4B_05_30', code: '4B.05.30', name: 'ICF Panels - Misc Accessories', xwalkId: '474', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_5A', code: '5A', name: 'Structural Steel (Fab & Erect)', xwalkId: '', description: '', children: [
    { id: 'wbs_5A_00', code: '5A.00', name: 'Structural Steel Fab & Erect', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_00_00', code: '5A.00.00', name: 'Structural Steel Fab & Erect - Turnkey', xwalkId: '475', description: '', children: [] },
      { id: 'wbs_5A_00_01', code: '5A.00.01', name: 'Structural Steel Fab - Turnkey', xwalkId: '476', description: '', children: [] },
      { id: 'wbs_5A_00_02', code: '5A.00.02', name: 'Structural Steel Erection - Turnkey', xwalkId: '477', description: '', children: [] },
      { id: 'wbs_5A_00_03', code: '5A.00.03', name: 'Structural Steel - Allowance', xwalkId: '478', description: '', children: [] }
    ] },
    { id: 'wbs_5A_01', code: '5A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_01_01', code: '5A.01.01', name: 'Mobilization', xwalkId: '479', description: '', children: [] },
      { id: 'wbs_5A_01_02', code: '5A.01.02', name: 'Bond/Permit', xwalkId: '480', description: '', children: [] },
      { id: 'wbs_5A_01_03', code: '5A.01.03', name: 'Submittals', xwalkId: '481', description: '', children: [] },
      { id: 'wbs_5A_01_04', code: '5A.01.04', name: 'Equip Rentals', xwalkId: '482', description: '', children: [] },
      { id: 'wbs_5A_01_05', code: '5A.01.05', name: 'Supervision', xwalkId: '483', description: '', children: [] },
      { id: 'wbs_5A_01_06', code: '5A.01.06', name: 'Demobilization', xwalkId: '484', description: '', children: [] },
      { id: 'wbs_5A_01_07', code: '5A.01.07', name: 'Close-Out', xwalkId: '485', description: '', children: [] },
      { id: 'wbs_5A_01_11', code: '5A.01.11', name: 'Safety Cables/Rails', xwalkId: '486', description: '', children: [] },
      { id: 'wbs_5A_01_19', code: '5A.01.19', name: 'Tiltwall - Bracing Rental', xwalkId: '487', description: '', children: [] },
      { id: 'wbs_5A_01_20', code: '5A.01.20', name: 'Tiltwall - Bracing Removal', xwalkId: '488', description: '', children: [] },
      { id: 'wbs_5A_01_21', code: '5A.01.21', name: 'Tiltwall - Lifting/Bracing Inserts', xwalkId: '489', description: '', children: [] }
    ] },
    { id: 'wbs_5A_02', code: '5A.02', name: 'Columns', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_02_01', code: '5A.02.01', name: 'Steel Columns', xwalkId: '490', description: '', children: [] },
      { id: 'wbs_5A_02_02', code: '5A.02.02', name: 'Anchor Bolts', xwalkId: '491', description: '', children: [] },
      { id: 'wbs_5A_02_03', code: '5A.02.03', name: 'Base Plates', xwalkId: '492', description: '', children: [] }
    ] },
    { id: 'wbs_5A_03', code: '5A.03', name: 'Floor Steel Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_03_01', code: '5A.03.01', name: 'Floor Beams & Bracing', xwalkId: '493', description: '', children: [] },
      { id: 'wbs_5A_03_02', code: '5A.03.02', name: 'Floor Opening Frames', xwalkId: '494', description: '', children: [] },
      { id: 'wbs_5A_03_03', code: '5A.03.03', name: 'Floor Framing Connection Steel', xwalkId: '495', description: '', children: [] },
      { id: 'wbs_5A_03_04', code: '5A.03.04', name: 'Floor Deck', xwalkId: '496', description: '', children: [] }
    ] },
    { id: 'wbs_5A_04', code: '5A.04', name: 'Roof Steel Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_04_01', code: '5A.04.01', name: 'Roof Beams & Bracing', xwalkId: '497', description: '', children: [] },
      { id: 'wbs_5A_04_02', code: '5A.04.02', name: 'Trusses', xwalkId: '498', description: '', children: [] },
      { id: 'wbs_5A_04_03', code: '5A.04.03', name: 'Joists', xwalkId: '499', description: '', children: [] },
      { id: 'wbs_5A_04_04', code: '5A.04.04', name: 'Girders', xwalkId: '500', description: '', children: [] },
      { id: 'wbs_5A_04_05', code: '5A.04.05', name: 'Roof Opening Frames', xwalkId: '501', description: '', children: [] },
      { id: 'wbs_5A_04_06', code: '5A.04.06', name: 'RTU Support Framing', xwalkId: '502', description: '', children: [] },
      { id: 'wbs_5A_04_07', code: '5A.04.07', name: 'Roof Framing Connection Steel', xwalkId: '503', description: '', children: [] },
      { id: 'wbs_5A_04_08', code: '5A.04.08', name: 'Roof Deck', xwalkId: '504', description: '', children: [] }
    ] },
    { id: 'wbs_5A_05', code: '5A.05', name: 'Exterior Wall Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_05_01', code: '5A.05.01', name: 'Exterior Tiltwall Panel Erection', xwalkId: '505', description: '', children: [] },
      { id: 'wbs_5A_05_02', code: '5A.05.02', name: 'Exterior Wall Embeds', xwalkId: '506', description: '', children: [] },
      { id: 'wbs_5A_05_03', code: '5A.05.03', name: 'Exterior Wall Loose Lintels', xwalkId: '507', description: '', children: [] },
      { id: 'wbs_5A_05_04', code: '5A.05.04', name: 'Exterior Wall Openings Support Framing', xwalkId: '508', description: '', children: [] },
      { id: 'wbs_5A_05_05', code: '5A.05.05', name: 'Screenwall Framing', xwalkId: '509', description: '', children: [] },
      { id: 'wbs_5A_05_06', code: '5A.05.06', name: 'Exterior Wall Connection Steel', xwalkId: '510', description: '', children: [] }
    ] },
    { id: 'wbs_5A_06', code: '5A.06', name: 'Interior Steel Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_06_01', code: '5A.06.01', name: 'Interior Tiltwall Panel Erection', xwalkId: '511', description: '', children: [] },
      { id: 'wbs_5A_06_02', code: '5A.06.02', name: 'Interior Partition Support Framing', xwalkId: '512', description: '', children: [] },
      { id: 'wbs_5A_06_03', code: '5A.06.03', name: 'Catwalk Framing', xwalkId: '513', description: '', children: [] },
      { id: 'wbs_5A_06_04', code: '5A.06.04', name: 'Interior Wall Connection Steel', xwalkId: '514', description: '', children: [] }
    ] },
    { id: 'wbs_5A_07', code: '5A.07', name: 'Stairs & Railings', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_07_01', code: '5A.07.01', name: 'Metal Stairs', xwalkId: '515', description: '', children: [] },
      { id: 'wbs_5A_07_02', code: '5A.07.02', name: 'Metal Walkways', xwalkId: '516', description: '', children: [] },
      { id: 'wbs_5A_07_03', code: '5A.07.03', name: 'Metal Stair Railings', xwalkId: '517', description: '', children: [] },
      { id: 'wbs_5A_07_04', code: '5A.07.04', name: 'Metal Floor Gratings', xwalkId: '518', description: '', children: [] },
      { id: 'wbs_5A_07_05', code: '5A.07.05', name: 'Metal Ladders', xwalkId: '519', description: '', children: [] }
    ] },
    { id: 'wbs_5A_08', code: '5A.08', name: 'Interior Metal', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_08_01', code: '5A.08.01', name: 'Metal Guardrails', xwalkId: '520', description: '', children: [] },
      { id: 'wbs_5A_08_02', code: '5A.08.02', name: 'Metal Handrails', xwalkId: '521', description: '', children: [] },
      { id: 'wbs_5A_08_03', code: '5A.08.03', name: 'Metal Bollards', xwalkId: '522', description: '', children: [] },
      { id: 'wbs_5A_08_04', code: '5A.08.04', name: 'Metal Frames & Grates - Sump Pit', xwalkId: '523', description: '', children: [] },
      { id: 'wbs_5A_08_05', code: '5A.08.05', name: 'Interior Metal Gates', xwalkId: '524', description: '', children: [] }
    ] },
    { id: 'wbs_5A_09', code: '5A.09', name: 'Site Metal', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_09_01', code: '5A.09.01', name: 'Site Steel Framing', xwalkId: '525', description: '', children: [] },
      { id: 'wbs_5A_09_02', code: '5A.09.02', name: 'Site Metal Railings', xwalkId: '526', description: '', children: [] },
      { id: 'wbs_5A_09_03', code: '5A.09.03', name: 'Site Metal Bollards', xwalkId: '527', description: '', children: [] },
      { id: 'wbs_5A_09_04', code: '5A.09.04', name: 'Site Metal Gates', xwalkId: '528', description: '', children: [] },
      { id: 'wbs_5A_09_05', code: '5A.09.05', name: 'Traffic Guardrail', xwalkId: '529', description: '', children: [] }
    ] },
    { id: 'wbs_5A_10', code: '5A.10', name: 'Site Metal Structures', xwalkId: '', description: '', children: [
      { id: 'wbs_5A_10_01', code: '5A.10.01', name: 'Fabricated Pedestrian Bridges', xwalkId: '530', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_5B', code: '5B', name: 'Structural Steel (Fab Only)', xwalkId: '', description: '', children: [
    { id: 'wbs_5B_00', code: '5B.00', name: 'Structural Steel Fab', xwalkId: '', description: '', children: [
      { id: 'wbs_5B_00_00', code: '5B.00.00', name: 'Structural Steel Fab - Turnkey', xwalkId: '531', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_5C', code: '5C', name: 'Structural Steel (Erection Only)', xwalkId: '', description: '', children: [
    { id: 'wbs_5C_00', code: '5C.00', name: 'Structural Steel Erection', xwalkId: '', description: '', children: [
      { id: 'wbs_5C_00_00', code: '5C.00.00', name: 'Structural Steel Erection - Turnkey', xwalkId: '532', description: '', children: [] }
    ] },
    { id: 'wbs_5C_01', code: '5C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_5C_01_19', code: '5C.01.19', name: 'Tiltwall - Bracing Rental', xwalkId: '533', description: '', children: [] },
      { id: 'wbs_5C_01_20', code: '5C.01.20', name: 'Tiltwall - Bracing Removal', xwalkId: '534', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_5D', code: '5D', name: 'Miscellaneous Metals', xwalkId: '', description: '', children: [
    { id: 'wbs_5D_01', code: '5D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_5D_01_03', code: '5D.01.03', name: 'Submittals', xwalkId: '535', description: '', children: [] },
      { id: 'wbs_5D_01_09', code: '5D.01.09', name: 'Cleaning', xwalkId: '536', description: '', children: [] }
    ] },
    { id: 'wbs_5D_02', code: '5D.02', name: 'Stair Nosing', xwalkId: '', description: '', children: [
      { id: 'wbs_5D_02_01', code: '5D.02.01', name: 'Metal Nosing - Building Stairs', xwalkId: '537', description: '', children: [] },
      { id: 'wbs_5D_02_02', code: '5D.02.02', name: 'Metal Nosing - Site Steps', xwalkId: '538', description: '', children: [] }
    ] },
    { id: 'wbs_5D_03', code: '5D.03', name: 'Formed Metal Fabrications', xwalkId: '', description: '', children: [
      { id: 'wbs_5D_03_01', code: '5D.03.01', name: 'Metal Downspout Boots', xwalkId: '539', description: '', children: [] }
    ] },
    { id: 'wbs_5D_04', code: '5D.04', name: 'Metal Grates & Covers - Building', xwalkId: '', description: '', children: [
      { id: 'wbs_5D_04_01', code: '5D.04.01', name: 'Metal Trench Frames & Grates - Building', xwalkId: '540', description: '', children: [] },
      { id: 'wbs_5D_04_02', code: '5D.04.02', name: 'Metal Pit Frames & Grates - Building', xwalkId: '541', description: '', children: [] },
      { id: 'wbs_5D_04_03', code: '5D.04.03', name: 'Metal Access & Hatch Covers - Building', xwalkId: '542', description: '', children: [] }
    ] },
    { id: 'wbs_5D_05', code: '5D.05', name: 'Metal Grates & Covers - Site', xwalkId: '', description: '', children: [
      { id: 'wbs_5D_05_01', code: '5D.05.01', name: 'Metal Tree Grates - Site', xwalkId: '543', description: '', children: [] },
      { id: 'wbs_5D_05_02', code: '5D.05.02', name: 'Metal Access & Hatch Covers - Site', xwalkId: '544', description: '', children: [] },
      { id: 'wbs_5D_05_03', code: '5D.05.03', name: 'Metal Manhole Frames & Covers - Site', xwalkId: '545', description: '', children: [] },
      { id: 'wbs_5D_05_04', code: '5D.05.04', name: 'Metal Inlet Frames & Grates - Site', xwalkId: '546', description: '', children: [] },
      { id: 'wbs_5D_05_05', code: '5D.05.05', name: 'Metal Trench Frames & Grates - Site', xwalkId: '547', description: '', children: [] },
      { id: 'wbs_5D_05_06', code: '5D.05.06', name: 'Metal Trench Frames & Grates - Offsite', xwalkId: '548', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_5E', code: '5E', name: 'Ornamental Metals', xwalkId: '', description: '', children: [
    { id: 'wbs_5E_01', code: '5E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_5E_01_01', code: '5E.01.01', name: 'Mobilization', xwalkId: '549', description: '', children: [] },
      { id: 'wbs_5E_01_02', code: '5E.01.02', name: 'Bond/Permit', xwalkId: '550', description: '', children: [] },
      { id: 'wbs_5E_01_03', code: '5E.01.03', name: 'Submittals', xwalkId: '551', description: '', children: [] },
      { id: 'wbs_5E_01_05', code: '5E.01.05', name: 'Supervision', xwalkId: '552', description: '', children: [] },
      { id: 'wbs_5E_01_07', code: '5E.01.07', name: 'Close-Out', xwalkId: '553', description: '', children: [] },
      { id: 'wbs_5E_01_09', code: '5E.01.09', name: 'Cleaning', xwalkId: '554', description: '', children: [] },
      { id: 'wbs_5E_01_10', code: '5E.01.10', name: 'Mockup', xwalkId: '555', description: '', children: [] },
      { id: 'wbs_5E_01_13', code: '5E.01.13', name: 'Testing', xwalkId: '556', description: '', children: [] }
    ] },
    { id: 'wbs_5E_02', code: '5E.02', name: 'Decorative Interior Railings', xwalkId: '', description: '', children: [
      { id: 'wbs_5E_02_10', code: '5E.02.10', name: 'Interior Aluminum Guardrails', xwalkId: '557', description: '', children: [] },
      { id: 'wbs_5E_02_20', code: '5E.02.20', name: 'Interior Aluminum Handrails', xwalkId: '558', description: '', children: [] },
      { id: 'wbs_5E_02_21', code: '5E.02.21', name: 'Interior Aluminum Handrails - Wall Mounted', xwalkId: '559', description: '', children: [] },
      { id: 'wbs_5E_02_22', code: '5E.02.22', name: 'Interior Aluminum Handrails - Guardrail Mounted', xwalkId: '560', description: '', children: [] },
      { id: 'wbs_5E_02_23', code: '5E.02.23', name: 'Interior Aluminum Handrails - Floor Mounted/Mono-Rails', xwalkId: '561', description: '', children: [] },
      { id: 'wbs_5E_02_30', code: '5E.02.30', name: 'Interior Stainless Steel Guardrails', xwalkId: '562', description: '', children: [] },
      { id: 'wbs_5E_02_40', code: '5E.02.40', name: 'Interior Stainless Steel Handrails', xwalkId: '563', description: '', children: [] },
      { id: 'wbs_5E_02_41', code: '5E.02.41', name: 'Interior Stainless Steel Handrails - Wall Mounted', xwalkId: '564', description: '', children: [] },
      { id: 'wbs_5E_02_42', code: '5E.02.42', name: 'Interior Stainless Steel Handrails - Guardrail Mounted', xwalkId: '565', description: '', children: [] },
      { id: 'wbs_5E_02_43', code: '5E.02.43', name: 'Interior Stainless Steel Handrails - Floor Mounted/Mono-Rails', xwalkId: '566', description: '', children: [] },
      { id: 'wbs_5E_02_50', code: '5E.02.50', name: 'Interior Wire Rope Railings', xwalkId: '567', description: '', children: [] },
      { id: 'wbs_5E_02_60', code: '5E.02.60', name: 'Interior Decorative Glass/Glazed Railing System', xwalkId: '568', description: '', children: [] },
      { id: 'wbs_5E_02_70', code: '5E.02.70', name: 'Interior Wood & Metal Railing System', xwalkId: '569', description: '', children: [] }
    ] },
    { id: 'wbs_5E_03', code: '5E.03', name: 'Decorative Exterior/Site Railings', xwalkId: '', description: '', children: [
      { id: 'wbs_5E_03_30', code: '5E.03.30', name: 'Exterior/Site Stainless Steel Guardrails', xwalkId: '570', description: '', children: [] },
      { id: 'wbs_5E_03_40', code: '5E.03.40', name: 'Exterior/Site Stainless Steel Handrails', xwalkId: '571', description: '', children: [] },
      { id: 'wbs_5E_03_41', code: '5E.03.41', name: 'Exterior/Site Stainless Steel Handrails - Wall Mounted', xwalkId: '572', description: '', children: [] },
      { id: 'wbs_5E_03_42', code: '5E.03.42', name: 'Exterior/Site Stainless Steel Handrails - Guardrail Mounted', xwalkId: '573', description: '', children: [] },
      { id: 'wbs_5E_03_43', code: '5E.03.43', name: 'Exterior/Site Stainless Steel Handrails - Floor Mounted/Mono-Rails', xwalkId: '574', description: '', children: [] },
      { id: 'wbs_5E_03_50', code: '5E.03.50', name: 'Exterior/Site Wire Rope Guardrails', xwalkId: '575', description: '', children: [] },
      { id: 'wbs_5E_03_60', code: '5E.03.60', name: 'Exterior/Site Decorative Glass/Glazed Railing Syst', xwalkId: '576', description: '', children: [] }
    ] },
    { id: 'wbs_5E_04', code: '5E.04', name: 'Decorative Metal Stairs', xwalkId: '', description: '', children: [
      { id: 'wbs_5E_04_10', code: '5E.04.10', name: 'Interior Decorative Stairs', xwalkId: '577', description: '', children: [] },
      { id: 'wbs_5E_04_20', code: '5E.04.20', name: 'Prefabricated Metal Spiral Stairs', xwalkId: '578', description: '', children: [] },
      { id: 'wbs_5E_04_30', code: '5E.04.30', name: 'Monumental Stairs', xwalkId: '579', description: '', children: [] },
      { id: 'wbs_5E_04_40', code: '5E.04.40', name: 'Exterior Aluminum Metal Stairs', xwalkId: '580', description: '', children: [] },
      { id: 'wbs_5E_04_50', code: '5E.04.50', name: 'Perforated Aluminum Risers', xwalkId: '581', description: '', children: [] }
    ] },
    { id: 'wbs_5E_05', code: '5E.05', name: 'Miscellaneous Decorative Metals', xwalkId: '', description: '', children: [
      { id: 'wbs_5E_05_20', code: '5E.05.20', name: 'Decorative Metal Grilles', xwalkId: '582', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_6A', code: '6A', name: 'Rough Carpentry', xwalkId: '', description: '', children: [
    { id: 'wbs_6A_00', code: '6A.00', name: 'Wood Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_00_10', code: '6A.00.10', name: 'Wood Framing - Turnkey', xwalkId: '583', description: '', children: [] },
      { id: 'wbs_6A_00_11', code: '6A.00.11', name: 'Wood Framing Labor - Turnkey', xwalkId: '584', description: '', children: [] },
      { id: 'wbs_6A_00_12', code: '6A.00.12', name: 'Wood Framing Material - Turnkey', xwalkId: '585', description: '', children: [] }
    ] },
    { id: 'wbs_6A_01', code: '6A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_01_01', code: '6A.01.01', name: 'Mobilization', xwalkId: '586', description: '', children: [] },
      { id: 'wbs_6A_01_02', code: '6A.01.02', name: 'Bond/Permit', xwalkId: '587', description: '', children: [] },
      { id: 'wbs_6A_01_03', code: '6A.01.03', name: 'Submittals', xwalkId: '588', description: '', children: [] },
      { id: 'wbs_6A_01_04', code: '6A.01.04', name: 'Equip Rentals', xwalkId: '589', description: '', children: [] },
      { id: 'wbs_6A_01_05', code: '6A.01.05', name: 'Supervision', xwalkId: '590', description: '', children: [] },
      { id: 'wbs_6A_01_07', code: '6A.01.07', name: 'Close-Out', xwalkId: '591', description: '', children: [] },
      { id: 'wbs_6A_01_09', code: '6A.01.09', name: 'Cleaning', xwalkId: '592', description: '', children: [] },
      { id: 'wbs_6A_01_10', code: '6A.01.10', name: 'Mockup', xwalkId: '593', description: '', children: [] },
      { id: 'wbs_6A_01_11', code: '6A.01.11', name: 'Safety Cables/Rails', xwalkId: '594', description: '', children: [] },
      { id: 'wbs_6A_01_13', code: '6A.01.13', name: 'Testing', xwalkId: '595', description: '', children: [] },
      { id: 'wbs_6A_01_14', code: '6A.01.14', name: 'Survey & Layout', xwalkId: '596', description: '', children: [] },
      { id: 'wbs_6A_01_18', code: '6A.01.18', name: 'Temporary Bracing', xwalkId: '597', description: '', children: [] }
    ] },
    { id: 'wbs_6A_02', code: '6A.02', name: 'Floor Wood Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_02_01', code: '6A.02.01', name: 'Floor Strongbacks & Bracings', xwalkId: '598', description: '', children: [] },
      { id: 'wbs_6A_02_02', code: '6A.02.02', name: 'Premanufactured Wood Floor Beams', xwalkId: '599', description: '', children: [] },
      { id: 'wbs_6A_02_03', code: '6A.02.03', name: 'Premanufactured Wood Floor Trusses', xwalkId: '600', description: '', children: [] },
      { id: 'wbs_6A_02_04', code: '6A.02.04', name: 'Wooden Floor Deck', xwalkId: '601', description: '', children: [] }
    ] },
    { id: 'wbs_6A_03', code: '6A.03', name: 'Roof Wood Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_03_01', code: '6A.03.01', name: 'Premanufactured Wood Columns', xwalkId: '602', description: '', children: [] },
      { id: 'wbs_6A_03_02', code: '6A.03.02', name: 'Roof Strongbacks & Bracings', xwalkId: '603', description: '', children: [] },
      { id: 'wbs_6A_03_03', code: '6A.03.03', name: 'Premanufactured Wood Roof Beams', xwalkId: '604', description: '', children: [] },
      { id: 'wbs_6A_03_04', code: '6A.03.04', name: 'Premanufactured Wood Roof Trusses', xwalkId: '605', description: '', children: [] },
      { id: 'wbs_6A_03_05', code: '6A.03.05', name: 'Wooden Roof Deck', xwalkId: '606', description: '', children: [] }
    ] },
    { id: 'wbs_6A_04', code: '6A.04', name: 'Exterior Wood Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_04_01', code: '6A.04.01', name: 'Exterior Wall Wood Stud Framing', xwalkId: '607', description: '', children: [] },
      { id: 'wbs_6A_04_02', code: '6A.04.02', name: 'Exterior Soffits/Ceilings Wood Stud Framing', xwalkId: '608', description: '', children: [] },
      { id: 'wbs_6A_04_03', code: '6A.04.03', name: 'Exterior Wall Wooden Bracing', xwalkId: '609', description: '', children: [] },
      { id: 'wbs_6A_04_04', code: '6A.04.04', name: 'Exterior Wall Sheathing - OSB/Plywood', xwalkId: '610', description: '', children: [] },
      { id: 'wbs_6A_04_05', code: '6A.04.05', name: 'Building Wrap (Tyvek)', xwalkId: '611', description: '', children: [] }
    ] },
    { id: 'wbs_6A_05', code: '6A.05', name: 'Interior Wood Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_05_01', code: '6A.05.01', name: 'Interior Wall Wood Stud Framing', xwalkId: '612', description: '', children: [] },
      { id: 'wbs_6A_05_02', code: '6A.05.02', name: 'Interior Ceilings/Furrdowns Wood Stud Framing', xwalkId: '613', description: '', children: [] },
      { id: 'wbs_6A_05_03', code: '6A.05.03', name: 'Interior Wall Sheathing - OSB/Plywood', xwalkId: '614', description: '', children: [] }
    ] },
    { id: 'wbs_6A_06', code: '6A.06', name: 'Roof Rough Carpentry', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_06_00', code: '6A.06.00', name: 'Roof Blocking', xwalkId: '615', description: '', children: [] },
      { id: 'wbs_6A_06_01', code: '6A.06.01', name: 'Roof Blocking - Roof Edge/Roof Perimeter', xwalkId: '616', description: '', children: [] },
      { id: 'wbs_6A_06_02', code: '6A.06.02', name: 'Roof Blocking - RTU/Roof Openings', xwalkId: '617', description: '', children: [] },
      { id: 'wbs_6A_06_03', code: '6A.06.03', name: 'Roof Parapet Blocking', xwalkId: '618', description: '', children: [] },
      { id: 'wbs_6A_06_04', code: '6A.06.04', name: 'Plywood at Roof/Parapet', xwalkId: '619', description: '', children: [] }
    ] },
    { id: 'wbs_6A_07', code: '6A.07', name: 'Exterior Wall Rough Carpentry', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_07_01', code: '6A.07.01', name: 'Exterior Wall Blocking - Door Openings', xwalkId: '620', description: '', children: [] },
      { id: 'wbs_6A_07_02', code: '6A.07.02', name: 'Exterior Wall Blocking - Window/Storefront', xwalkId: '621', description: '', children: [] }
    ] },
    { id: 'wbs_6A_08', code: '6A.08', name: 'Interior Wall Rough Carpentry', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_08_01', code: '6A.08.01', name: 'Interior In-Wall Blocking - Wall Mounted Accessories/Equipment', xwalkId: '622', description: '', children: [] },
      { id: 'wbs_6A_08_02', code: '6A.08.02', name: 'Interior In-Wall Blocking - Casework/Millwork', xwalkId: '623', description: '', children: [] },
      { id: 'wbs_6A_08_03', code: '6A.08.03', name: 'Interior Wall Blocking - Openings', xwalkId: '624', description: '', children: [] },
      { id: 'wbs_6A_08_04', code: '6A.08.04', name: 'Plywood on Interior Wall', xwalkId: '625', description: '', children: [] }
    ] },
    { id: 'wbs_6A_09', code: '6A.09', name: 'Site Rough Carpentry', xwalkId: '', description: '', children: [
      { id: 'wbs_6A_09_01', code: '6A.09.01', name: 'Site Wall Blocking', xwalkId: '626', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_6B', code: '6B', name: 'Glu-Lam', xwalkId: '', description: '', children: [
    { id: 'wbs_6B_01', code: '6B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_6B_01_01', code: '6B.01.01', name: 'Mobilization', xwalkId: '627', description: '', children: [] },
      { id: 'wbs_6B_01_02', code: '6B.01.02', name: 'Bond/Permit', xwalkId: '628', description: '', children: [] },
      { id: 'wbs_6B_01_03', code: '6B.01.03', name: 'Submittals', xwalkId: '629', description: '', children: [] },
      { id: 'wbs_6B_01_04', code: '6B.01.04', name: 'Equip Rentals', xwalkId: '630', description: '', children: [] },
      { id: 'wbs_6B_01_05', code: '6B.01.05', name: 'Supervision', xwalkId: '631', description: '', children: [] },
      { id: 'wbs_6B_01_07', code: '6B.01.07', name: 'Close-Out', xwalkId: '632', description: '', children: [] },
      { id: 'wbs_6B_01_09', code: '6B.01.09', name: 'Cleaning', xwalkId: '633', description: '', children: [] },
      { id: 'wbs_6B_01_19', code: '6B.01.19', name: 'Shoring & Bracing', xwalkId: '634', description: '', children: [] }
    ] },
    { id: 'wbs_6B_02', code: '6B.02', name: 'Glued Laminated Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_6B_02_10', code: '6B.02.10', name: 'Glued Laminated Wood Beams', xwalkId: '635', description: '', children: [] },
      { id: 'wbs_6B_02_20', code: '6B.02.20', name: 'Glued Laminated Wood Girders', xwalkId: '636', description: '', children: [] },
      { id: 'wbs_6B_02_30', code: '6B.02.30', name: 'Glued Laminated Wood Trusses', xwalkId: '637', description: '', children: [] },
      { id: 'wbs_6B_02_40', code: '6B.02.40', name: 'Glued Laminated Wood Columns', xwalkId: '638', description: '', children: [] },
      { id: 'wbs_6B_02_50', code: '6B.02.50', name: 'Glued Laminated Trees & Arches', xwalkId: '639', description: '', children: [] }
    ] },
    { id: 'wbs_6B_03', code: '6B.03', name: 'Laminated Decking', xwalkId: '', description: '', children: [
      { id: 'wbs_6B_03_10', code: '6B.03.10', name: 'Laminated Wood Deck', xwalkId: '640', description: '', children: [] }
    ] },
    { id: 'wbs_6B_04', code: '6B.04', name: 'Glulam - Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_6B_04_10', code: '6B.04.10', name: 'Glulam - Connection Steel', xwalkId: '641', description: '', children: [] }
    ] },
    { id: 'wbs_6B_05', code: '6B.05', name: 'Glulam - Treatment & Finish', xwalkId: '', description: '', children: [
      { id: 'wbs_6B_05_10', code: '6B.05.10', name: 'Glulam - Preservative Treatment', xwalkId: '642', description: '', children: [] },
      { id: 'wbs_6B_05_20', code: '6B.05.20', name: 'Glulam - Varnish Finish', xwalkId: '643', description: '', children: [] },
      { id: 'wbs_6B_05_30', code: '6B.05.30', name: 'Glulam - Staining, Sealing & Other Finishing', xwalkId: '644', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7A', code: '7A', name: 'Waterproofing & Sealants', xwalkId: '', description: '', children: [
    { id: 'wbs_7A_01', code: '7A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_01_01', code: '7A.01.01', name: 'Mobilization', xwalkId: '645', description: '', children: [] },
      { id: 'wbs_7A_01_02', code: '7A.01.02', name: 'Bond/Permit', xwalkId: '646', description: '', children: [] },
      { id: 'wbs_7A_01_03', code: '7A.01.03', name: 'Submittals', xwalkId: '647', description: '', children: [] },
      { id: 'wbs_7A_01_04', code: '7A.01.04', name: 'Equip Rentals', xwalkId: '648', description: '', children: [] },
      { id: 'wbs_7A_01_05', code: '7A.01.05', name: 'Supervision', xwalkId: '649', description: '', children: [] },
      { id: 'wbs_7A_01_06', code: '7A.01.06', name: 'Demobilization', xwalkId: '650', description: '', children: [] },
      { id: 'wbs_7A_01_07', code: '7A.01.07', name: 'Close-Out', xwalkId: '651', description: '', children: [] },
      { id: 'wbs_7A_01_09', code: '7A.01.09', name: 'Cleaning', xwalkId: '652', description: '', children: [] },
      { id: 'wbs_7A_01_10', code: '7A.01.10', name: 'Mockup', xwalkId: '653', description: '', children: [] }
    ] },
    { id: 'wbs_7A_02', code: '7A.02', name: 'Waterproofing & Dampproofing', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_02_10', code: '7A.02.10', name: 'Below Grade Waterproofing', xwalkId: '654', description: '', children: [] },
      { id: 'wbs_7A_02_20', code: '7A.02.20', name: 'Below Grade Dampproofing', xwalkId: '655', description: '', children: [] }
    ] },
    { id: 'wbs_7A_03', code: '7A.03', name: 'Water Repellents', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_03_10', code: '7A.03.10', name: 'Applied Water Repellents - Exterior Walls', xwalkId: '656', description: '', children: [] }
    ] },
    { id: 'wbs_7A_04', code: '7A.04', name: 'Traffic Coating', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_04_10', code: '7A.04.10', name: 'Pedestrian Traffic Coatings', xwalkId: '657', description: '', children: [] },
      { id: 'wbs_7A_04_20', code: '7A.04.20', name: 'Vehicular Traffic Coatings', xwalkId: '658', description: '', children: [] }
    ] },
    { id: 'wbs_7A_05', code: '7A.05', name: 'Weather Barriers', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_05_10', code: '7A.05.10', name: 'Fluid-Applied Air Barriers', xwalkId: '659', description: '', children: [] }
    ] },
    { id: 'wbs_7A_06', code: '7A.06', name: 'Flashing', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_06_10', code: '7A.06.10', name: 'Metal Flashing', xwalkId: '660', description: '', children: [] },
      { id: 'wbs_7A_06_20', code: '7A.06.20', name: 'Flexible Flashing', xwalkId: '661', description: '', children: [] }
    ] },
    { id: 'wbs_7A_07', code: '7A.07', name: 'Joint Sealants', xwalkId: '', description: '', children: [
      { id: 'wbs_7A_07_01', code: '7A.07.01', name: 'Joint Sealants - Building', xwalkId: '662', description: '', children: [] },
      { id: 'wbs_7A_07_10', code: '7A.07.10', name: 'Joint Sealants - Building - Exterior Walls', xwalkId: '663', description: '', children: [] },
      { id: 'wbs_7A_07_11', code: '7A.07.11', name: 'Joint Sealants - Building - Exterior Masonry Walls', xwalkId: '664', description: '', children: [] },
      { id: 'wbs_7A_07_12', code: '7A.07.12', name: 'Joint Sealants - Building - Exterior Tilt-Wall Panels', xwalkId: '665', description: '', children: [] },
      { id: 'wbs_7A_07_20', code: '7A.07.20', name: 'Joint Sealants - Building - Interior Walls', xwalkId: '666', description: '', children: [] },
      { id: 'wbs_7A_07_21', code: '7A.07.21', name: 'Joint Sealants - Building - Interior Masonry Walls', xwalkId: '667', description: '', children: [] },
      { id: 'wbs_7A_07_22', code: '7A.07.22', name: 'Joint Sealants - Building - Interior Tilt-Wall Panels', xwalkId: '668', description: '', children: [] },
      { id: 'wbs_7A_07_30', code: '7A.07.30', name: 'Joint Sealants - Building - Interior Slab', xwalkId: '669', description: '', children: [] },
      { id: 'wbs_7A_07_40', code: '7A.07.40', name: 'Joint Sealants - Site - Paving', xwalkId: '670', description: '', children: [] },
      { id: 'wbs_7A_07_50', code: '7A.07.50', name: 'Joint Sealants - Site - Sidewalk', xwalkId: '671', description: '', children: [] },
      { id: 'wbs_7A_07_60', code: '7A.07.60', name: 'Joint Sealants - Site - Isolation Joint', xwalkId: '672', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7B', code: '7B', name: 'Thermal Insulation', xwalkId: '', description: '', children: [
    { id: 'wbs_7B_01', code: '7B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7B_01_01', code: '7B.01.01', name: 'Mobilization', xwalkId: '673', description: '', children: [] },
      { id: 'wbs_7B_01_02', code: '7B.01.02', name: 'Bond/Permit', xwalkId: '674', description: '', children: [] },
      { id: 'wbs_7B_01_03', code: '7B.01.03', name: 'Submittals', xwalkId: '675', description: '', children: [] },
      { id: 'wbs_7B_01_04', code: '7B.01.04', name: 'Equip Rentals', xwalkId: '676', description: '', children: [] },
      { id: 'wbs_7B_01_05', code: '7B.01.05', name: 'Supervision', xwalkId: '677', description: '', children: [] },
      { id: 'wbs_7B_01_06', code: '7B.01.06', name: 'Demobilization', xwalkId: '678', description: '', children: [] },
      { id: 'wbs_7B_01_07', code: '7B.01.07', name: 'Close-Out', xwalkId: '679', description: '', children: [] },
      { id: 'wbs_7B_01_09', code: '7B.01.09', name: 'Cleaning', xwalkId: '680', description: '', children: [] },
      { id: 'wbs_7B_01_10', code: '7B.01.10', name: 'Mockup', xwalkId: '681', description: '', children: [] }
    ] },
    { id: 'wbs_7B_02', code: '7B.02', name: 'Rigid Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_7B_02_01', code: '7B.02.01', name: 'Rigid Insulation at Building Exterior', xwalkId: '682', description: '', children: [] },
      { id: 'wbs_7B_02_10', code: '7B.02.10', name: 'Rigid Insulation at Masonry', xwalkId: '683', description: '', children: [] },
      { id: 'wbs_7B_02_20', code: '7B.02.20', name: 'Rigid Insulation at Metal Panels', xwalkId: '684', description: '', children: [] },
      { id: 'wbs_7B_02_30', code: '7B.02.30', name: 'Rigid Insulation at FC Panels/Siding', xwalkId: '685', description: '', children: [] },
      { id: 'wbs_7B_02_40', code: '7B.02.40', name: 'Rigid Insulation at Plaster', xwalkId: '686', description: '', children: [] },
      { id: 'wbs_7B_02_50', code: '7B.02.50', name: 'Rigid Insulation at Soffit', xwalkId: '687', description: '', children: [] },
      { id: 'wbs_7B_02_60', code: '7B.02.60', name: 'Rigid Insulation at Interior Side of Tiltwalls', xwalkId: '688', description: '', children: [] },
      { id: 'wbs_7B_02_70', code: '7B.02.70', name: 'Rigid Insulation at Foundation', xwalkId: '689', description: '', children: [] },
      { id: 'wbs_7B_02_80', code: '7B.02.80', name: 'Rigid Insulation under Topping Slab', xwalkId: '690', description: '', children: [] }
    ] },
    { id: 'wbs_7B_03', code: '7B.03', name: 'Spray Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_7B_03_10', code: '7B.03.10', name: 'Underside Spray-Foam Insulation', xwalkId: '691', description: '', children: [] },
      { id: 'wbs_7B_03_11', code: '7B.03.11', name: 'Underside Spray-Foam Insulation - Crawlspace', xwalkId: '692', description: '', children: [] },
      { id: 'wbs_7B_03_12', code: '7B.03.12', name: 'Underside Spray-Foam Insulation - Metal Deck', xwalkId: '693', description: '', children: [] },
      { id: 'wbs_7B_03_20', code: '7B.03.20', name: 'Spray Foam Insulation - Walls/Roof Deck Junction', xwalkId: '694', description: '', children: [] }
    ] },
    { id: 'wbs_7B_04', code: '7B.04', name: 'Batt Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_7B_04_10', code: '7B.04.10', name: 'Vinyl Coated Batt Insulation at interior side of walls/roof', xwalkId: '695', description: '', children: [] },
      { id: 'wbs_7B_04_20', code: '7B.04.20', name: 'Rock Wool @ Metal Panel', xwalkId: '696', description: '', children: [] },
      { id: 'wbs_7B_04_40', code: '7B.04.40', name: 'Batt Insulation at Wood Framing - Exterior Wall', xwalkId: '697', description: '', children: [] },
      { id: 'wbs_7B_04_50', code: '7B.04.50', name: 'Batt Insulation at Wood Framing - Interior Wall', xwalkId: '698', description: '', children: [] },
      { id: 'wbs_7B_04_60', code: '7B.04.60', name: 'Blown Insulation at Attic', xwalkId: '699', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7C', code: '7C', name: 'Roofing', xwalkId: '', description: '', children: [
    { id: 'wbs_7C_01', code: '7C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_01_01', code: '7C.01.01', name: 'Mobilization', xwalkId: '700', description: '', children: [] },
      { id: 'wbs_7C_01_02', code: '7C.01.02', name: 'Bond/Permit', xwalkId: '701', description: '', children: [] },
      { id: 'wbs_7C_01_03', code: '7C.01.03', name: 'Submittals', xwalkId: '702', description: '', children: [] },
      { id: 'wbs_7C_01_04', code: '7C.01.04', name: 'Equip Rentals', xwalkId: '703', description: '', children: [] },
      { id: 'wbs_7C_01_05', code: '7C.01.05', name: 'Supervision', xwalkId: '704', description: '', children: [] },
      { id: 'wbs_7C_01_06', code: '7C.01.06', name: 'Demobilization', xwalkId: '705', description: '', children: [] },
      { id: 'wbs_7C_01_07', code: '7C.01.07', name: 'Close-Out', xwalkId: '706', description: '', children: [] },
      { id: 'wbs_7C_01_09', code: '7C.01.09', name: 'Cleaning', xwalkId: '707', description: '', children: [] },
      { id: 'wbs_7C_01_10', code: '7C.01.10', name: 'Mockup', xwalkId: '708', description: '', children: [] },
      { id: 'wbs_7C_01_11', code: '7C.01.11', name: 'Safety Cables/Rails', xwalkId: '709', description: '', children: [] }
    ] },
    { id: 'wbs_7C_03', code: '7C.03', name: 'Metal Roofing', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_03_10', code: '7C.03.10', name: 'Standing Seam Metal Roofing', xwalkId: '710', description: '', children: [] }
    ] },
    { id: 'wbs_7C_04', code: '7C.04', name: 'Steep Sloped Roofing', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_04_10', code: '7C.04.10', name: 'Shingles', xwalkId: '711', description: '', children: [] },
      { id: 'wbs_7C_04_20', code: '7C.04.20', name: 'Roof Tiles', xwalkId: '712', description: '', children: [] }
    ] },
    { id: 'wbs_7C_05', code: '7C.05', name: 'Membrane Roofing', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_05_10', code: '7C.05.10', name: 'Bituminous Roofing', xwalkId: '713', description: '', children: [] },
      { id: 'wbs_7C_05_20', code: '7C.05.20', name: 'Asphalt Roofing', xwalkId: '714', description: '', children: [] },
      { id: 'wbs_7C_05_30', code: '7C.05.30', name: 'Mod Bit Roofing', xwalkId: '715', description: '', children: [] },
      { id: 'wbs_7C_05_40', code: '7C.05.40', name: 'TPO Roofing', xwalkId: '716', description: '', children: [] },
      { id: 'wbs_7C_05_41', code: '7C.05.41', name: 'TPO Roofing - R9', xwalkId: '717', description: '', children: [] },
      { id: 'wbs_7C_05_42', code: '7C.05.42', name: 'TPO Roofing - R25', xwalkId: '718', description: '', children: [] },
      { id: 'wbs_7C_05_43', code: '7C.05.43', name: 'TPO Roofing - R30', xwalkId: '719', description: '', children: [] },
      { id: 'wbs_7C_05_50', code: '7C.05.50', name: 'PVC Roofing', xwalkId: '720', description: '', children: [] },
      { id: 'wbs_7C_05_60', code: '7C.05.60', name: 'Elastomeric Roofing', xwalkId: '721', description: '', children: [] }
    ] },
    { id: 'wbs_7C_06', code: '7C.06', name: 'Roof Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_06_10', code: '7C.06.10', name: 'Roof Board Insulation', xwalkId: '722', description: '', children: [] }
    ] },
    { id: 'wbs_7C_07', code: '7C.07', name: 'Roof Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_7C_07_10', code: '7C.07.10', name: 'Roof Misc Sheet Metal', xwalkId: '723', description: '', children: [] },
      { id: 'wbs_7C_07_20', code: '7C.07.20', name: 'Premanufactured Roof Specialties', xwalkId: '724', description: '', children: [] },
      { id: 'wbs_7C_07_30', code: '7C.07.30', name: 'Hatches & Vents', xwalkId: '725', description: '', children: [] },
      { id: 'wbs_7C_07_40', code: '7C.07.40', name: 'Walkway Pads', xwalkId: '726', description: '', children: [] },
      { id: 'wbs_7C_07_50', code: '7C.07.50', name: 'Roof Flexible Flashing', xwalkId: '727', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7D', code: '7D', name: 'Metal Wall Panels', xwalkId: '', description: '', children: [
    { id: 'wbs_7D_01', code: '7D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_01_01', code: '7D.01.01', name: 'Mobilization', xwalkId: '728', description: '', children: [] },
      { id: 'wbs_7D_01_02', code: '7D.01.02', name: 'Bond/Permit', xwalkId: '729', description: '', children: [] },
      { id: 'wbs_7D_01_03', code: '7D.01.03', name: 'Submittals', xwalkId: '730', description: '', children: [] },
      { id: 'wbs_7D_01_04', code: '7D.01.04', name: 'Equip Rentals', xwalkId: '731', description: '', children: [] },
      { id: 'wbs_7D_01_05', code: '7D.01.05', name: 'Supervision', xwalkId: '732', description: '', children: [] },
      { id: 'wbs_7D_01_06', code: '7D.01.06', name: 'Demobilization', xwalkId: '733', description: '', children: [] },
      { id: 'wbs_7D_01_07', code: '7D.01.07', name: 'Close-Out', xwalkId: '734', description: '', children: [] },
      { id: 'wbs_7D_01_09', code: '7D.01.09', name: 'Cleaning', xwalkId: '735', description: '', children: [] },
      { id: 'wbs_7D_01_10', code: '7D.01.10', name: 'Mockup', xwalkId: '736', description: '', children: [] }
    ] },
    { id: 'wbs_7D_02', code: '7D.02', name: 'Metal Wall Panel Framing System', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_02_01', code: '7D.02.01', name: 'Rainscreen Attachment System (Knight Wall)', xwalkId: '737', description: '', children: [] },
      { id: 'wbs_7D_02_02', code: '7D.02.02', name: 'Metal Wall Panel - Framing (Sub-girts, Z-girts)', xwalkId: '738', description: '', children: [] },
      { id: 'wbs_7D_02_05', code: '7D.02.05', name: 'Metal Wall Panel - Flashing & Trim', xwalkId: '739', description: '', children: [] }
    ] },
    { id: 'wbs_7D_03', code: '7D.03', name: 'Metal Wall Panels (MWP)', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_03_01', code: '7D.03.01', name: 'MWP - Wall Panels', xwalkId: '740', description: '', children: [] },
      { id: 'wbs_7D_03_02', code: '7D.03.02', name: 'MWP - Soffit Panels', xwalkId: '741', description: '', children: [] },
      { id: 'wbs_7D_03_03', code: '7D.03.03', name: 'MWP – Wall Panels (Insulated)', xwalkId: '742', description: '', children: [] },
      { id: 'wbs_7D_03_04', code: '7D.03.04', name: 'Roof Screens Panels', xwalkId: '743', description: '', children: [] }
    ] },
    { id: 'wbs_7D_04', code: '7D.04', name: 'Metal Composite Material (MCM) Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_04_01', code: '7D.04.01', name: 'MCM - Wall Panels', xwalkId: '744', description: '', children: [] },
      { id: 'wbs_7D_04_02', code: '7D.04.02', name: 'MCM - Soffit Panels', xwalkId: '745', description: '', children: [] },
      { id: 'wbs_7D_04_03', code: '7D.04.03', name: 'MCM - Canopy Soffits', xwalkId: '746', description: '', children: [] }
    ] },
    { id: 'wbs_7D_05', code: '7D.05', name: 'Sidings', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_05_01', code: '7D.05.01', name: 'Aluminum Siding', xwalkId: '747', description: '', children: [] }
    ] },
    { id: 'wbs_7D_06', code: '7D.06', name: 'Roof Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_06_01', code: '7D.06.01', name: 'Metal Roof Panels', xwalkId: '748', description: '', children: [] },
      { id: 'wbs_7D_06_02', code: '7D.06.02', name: 'Composite Roof Panels', xwalkId: '749', description: '', children: [] }
    ] },
    { id: 'wbs_7D_07', code: '7D.07', name: 'Decorative Metal Panel', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_07_01', code: '7D.07.01', name: 'Exterior Aluminum Decorative Metal Panels', xwalkId: '750', description: '', children: [] },
      { id: 'wbs_7D_07_02', code: '7D.07.02', name: 'Perforated Decorative Aluminum Screen Panels', xwalkId: '751', description: '', children: [] },
      { id: 'wbs_7D_07_04', code: '7D.07.04', name: 'Exterior Aluminum Column Covers', xwalkId: '752', description: '', children: [] },
      { id: 'wbs_7D_07_05', code: '7D.07.05', name: 'Interior Aluminum Column Covers', xwalkId: '753', description: '', children: [] },
      { id: 'wbs_7D_07_06', code: '7D.07.06', name: 'Metal Wire Mesh Screen Panel', xwalkId: '754', description: '', children: [] }
    ] },
    { id: 'wbs_7D_08', code: '7D.08', name: 'Exterior Wood Panel', xwalkId: '', description: '', children: [
      { id: 'wbs_7D_08_01', code: '7D.08.01', name: 'Exterior Wood Wall Panels', xwalkId: '755', description: '', children: [] },
      { id: 'wbs_7D_08_02', code: '7D.08.02', name: 'Exterior Wood Siding', xwalkId: '756', description: '', children: [] },
      { id: 'wbs_7D_08_03', code: '7D.08.03', name: 'Exterior Wood Trims', xwalkId: '757', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7E', code: '7E', name: 'Fiber Cement Panels', xwalkId: '', description: '', children: [
    { id: 'wbs_7E_01', code: '7E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7E_01_01', code: '7E.01.01', name: 'Mobilization', xwalkId: '758', description: '', children: [] },
      { id: 'wbs_7E_01_02', code: '7E.01.02', name: 'Bond/Permit', xwalkId: '759', description: '', children: [] },
      { id: 'wbs_7E_01_03', code: '7E.01.03', name: 'Submittals', xwalkId: '760', description: '', children: [] },
      { id: 'wbs_7E_01_04', code: '7E.01.04', name: 'Equip Rentals', xwalkId: '761', description: '', children: [] },
      { id: 'wbs_7E_01_05', code: '7E.01.05', name: 'Supervision', xwalkId: '762', description: '', children: [] },
      { id: 'wbs_7E_01_06', code: '7E.01.06', name: 'Demobilization', xwalkId: '763', description: '', children: [] },
      { id: 'wbs_7E_01_07', code: '7E.01.07', name: 'Close-Out', xwalkId: '764', description: '', children: [] },
      { id: 'wbs_7E_01_09', code: '7E.01.09', name: 'Cleaning', xwalkId: '765', description: '', children: [] },
      { id: 'wbs_7E_01_10', code: '7E.01.10', name: 'Mockup', xwalkId: '766', description: '', children: [] }
    ] },
    { id: 'wbs_7E_02', code: '7E.02', name: 'Fiber Cement Panel Framing System', xwalkId: '', description: '', children: [
      { id: 'wbs_7E_02_01', code: '7E.02.01', name: 'Fiber Cement Panel - Sub-Framing (Clip System, Z-girts)', xwalkId: '767', description: '', children: [] },
      { id: 'wbs_7E_02_02', code: '7E.02.02', name: 'Fiber Cement Panel - Flashing & Trim', xwalkId: '768', description: '', children: [] }
    ] },
    { id: 'wbs_7E_03', code: '7E.03', name: 'Exterior Siding & Trims', xwalkId: '', description: '', children: [
      { id: 'wbs_7E_03_01', code: '7E.03.01', name: 'Exterior Wall - Fiber Cement Panels', xwalkId: '769', description: '', children: [] },
      { id: 'wbs_7E_03_02', code: '7E.03.02', name: 'Exterior Wall - Fiber Cement Siding', xwalkId: '770', description: '', children: [] },
      { id: 'wbs_7E_03_03', code: '7E.03.03', name: 'Exterior Wall - Fiber Cement Trims & Cornice', xwalkId: '771', description: '', children: [] },
      { id: 'wbs_7E_03_04', code: '7E.03.04', name: 'Exterior Soffit - Fiber Cement Panels', xwalkId: '772', description: '', children: [] }
    ] },
    { id: 'wbs_7E_04', code: '7E.04', name: 'Interior Siding & Trims', xwalkId: '', description: '', children: [
      { id: 'wbs_7E_04_01', code: '7E.04.01', name: 'Interior Wall - Fiber Cement Panels', xwalkId: '773', description: '', children: [] },
      { id: 'wbs_7E_04_02', code: '7E.04.02', name: 'Interior Wall - Fiber Cement Siding', xwalkId: '774', description: '', children: [] },
      { id: 'wbs_7E_04_03', code: '7E.04.03', name: 'Interior Wall - Fiber Cement Trims & Cornice', xwalkId: '775', description: '', children: [] },
      { id: 'wbs_7E_04_04', code: '7E.04.04', name: 'Interior Ceiling - Fiber Cement Panels', xwalkId: '776', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7F', code: '7F', name: 'Fireproofing', xwalkId: '', description: '', children: [
    { id: 'wbs_7F_00', code: '7F.00', name: 'Fireproofing System', xwalkId: '', description: '', children: [
      { id: 'wbs_7F_00_00', code: '7F.00.00', name: 'Fireproofing - Turnkey', xwalkId: '777', description: '', children: [] }
    ] },
    { id: 'wbs_7F_01', code: '7F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7F_01_01', code: '7F.01.01', name: 'Mobilization', xwalkId: '778', description: '', children: [] },
      { id: 'wbs_7F_01_02', code: '7F.01.02', name: 'Bond/Permit', xwalkId: '779', description: '', children: [] },
      { id: 'wbs_7F_01_03', code: '7F.01.03', name: 'Submittals', xwalkId: '780', description: '', children: [] },
      { id: 'wbs_7F_01_04', code: '7F.01.04', name: 'Equip Rentals', xwalkId: '781', description: '', children: [] },
      { id: 'wbs_7F_01_05', code: '7F.01.05', name: 'Supervision', xwalkId: '782', description: '', children: [] },
      { id: 'wbs_7F_01_06', code: '7F.01.06', name: 'Demobilization', xwalkId: '783', description: '', children: [] },
      { id: 'wbs_7F_01_07', code: '7F.01.07', name: 'Close-Out', xwalkId: '784', description: '', children: [] },
      { id: 'wbs_7F_01_09', code: '7F.01.09', name: 'Cleaning', xwalkId: '785', description: '', children: [] },
      { id: 'wbs_7F_01_10', code: '7F.01.10', name: 'Mockup', xwalkId: '786', description: '', children: [] },
      { id: 'wbs_7F_01_13', code: '7F.01.13', name: 'Testing', xwalkId: '787', description: '', children: [] }
    ] },
    { id: 'wbs_7F_02', code: '7F.02', name: 'Applied Fire Protection', xwalkId: '', description: '', children: [
      { id: 'wbs_7F_02_01', code: '7F.02.01', name: 'Sprayed Cementitious Fireproofing - Columns', xwalkId: '788', description: '', children: [] },
      { id: 'wbs_7F_02_02', code: '7F.02.02', name: 'Sprayed Cementitious Fireproofing - Floor Framing', xwalkId: '789', description: '', children: [] },
      { id: 'wbs_7F_02_03', code: '7F.02.03', name: 'Sprayed Cementitious Fireproofing - Roof Framing', xwalkId: '790', description: '', children: [] },
      { id: 'wbs_7F_02_04', code: '7F.02.04', name: 'Spray Foam Fireproofing - Floor Framing', xwalkId: '791', description: '', children: [] },
      { id: 'wbs_7F_02_05', code: '7F.02.05', name: 'Spray Foam Fireproofing - Roof Framing', xwalkId: '792', description: '', children: [] }
    ] },
    { id: 'wbs_7F_03', code: '7F.03', name: 'Intumescent Fireproofing', xwalkId: '', description: '', children: [
      { id: 'wbs_7F_03_01', code: '7F.03.01', name: 'Intumescent Fireproofing - Columns', xwalkId: '793', description: '', children: [] },
      { id: 'wbs_7F_03_02', code: '7F.03.02', name: 'Intumescent Fireproofing - Floor Framing', xwalkId: '794', description: '', children: [] },
      { id: 'wbs_7F_03_03', code: '7F.03.03', name: 'Intumescent Fireproofing - Roof Framing', xwalkId: '795', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7G', code: '7G', name: 'Firestopping & Safing', xwalkId: '', description: '', children: [
    { id: 'wbs_7G_01', code: '7G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7G_01_01', code: '7G.01.01', name: 'Mobilization', xwalkId: '796', description: '', children: [] },
      { id: 'wbs_7G_01_02', code: '7G.01.02', name: 'Bond/Permit', xwalkId: '797', description: '', children: [] },
      { id: 'wbs_7G_01_03', code: '7G.01.03', name: 'Submittals', xwalkId: '798', description: '', children: [] },
      { id: 'wbs_7G_01_07', code: '7G.01.07', name: 'Close-Out', xwalkId: '799', description: '', children: [] },
      { id: 'wbs_7G_01_09', code: '7G.01.09', name: 'Cleaning', xwalkId: '800', description: '', children: [] }
    ] },
    { id: 'wbs_7G_02', code: '7G.02', name: 'Penetration Firestopping', xwalkId: '', description: '', children: [
      { id: 'wbs_7G_02_10', code: '7G.02.10', name: 'Penetration Firestopping for Fire Sprinkler System', xwalkId: '801', description: '', children: [] },
      { id: 'wbs_7G_02_20', code: '7G.02.20', name: 'Penetration Firestopping for Plumbing System', xwalkId: '802', description: '', children: [] },
      { id: 'wbs_7G_02_30', code: '7G.02.30', name: 'Penetration Firestopping for HVAC System', xwalkId: '803', description: '', children: [] },
      { id: 'wbs_7G_02_40', code: '7G.02.40', name: 'Penetration Firestopping for Electrical System', xwalkId: '804', description: '', children: [] },
      { id: 'wbs_7G_02_50', code: '7G.02.50', name: 'Penetration Firestopping for Technology System', xwalkId: '805', description: '', children: [] }
    ] },
    { id: 'wbs_7G_03', code: '7G.03', name: 'Joint Firestopping', xwalkId: '', description: '', children: [
      { id: 'wbs_7G_03_10', code: '7G.03.10', name: 'Joint Firestopping at Fire-Rated Masonry Walls', xwalkId: '806', description: '', children: [] },
      { id: 'wbs_7G_03_20', code: '7G.03.20', name: 'Joint Firestopping at Fire-Rated Drywall', xwalkId: '807', description: '', children: [] },
      { id: 'wbs_7G_03_30', code: '7G.03.30', name: 'Joint Firestopping at Curtainwall-Floor Intersections', xwalkId: '808', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7H', code: '7H', name: 'Expansion Control', xwalkId: '', description: '', children: [
    { id: 'wbs_7H_00', code: '7H.00', name: 'Expansion Control System', xwalkId: '', description: '', children: [
      { id: 'wbs_7H_00_00', code: '7H.00.00', name: 'Expansion Control - Turnkey', xwalkId: '809', description: '', children: [] }
    ] },
    { id: 'wbs_7H_01', code: '7H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7H_01_01', code: '7H.01.01', name: 'Mobilization', xwalkId: '810', description: '', children: [] },
      { id: 'wbs_7H_01_02', code: '7H.01.02', name: 'Bond/Permit', xwalkId: '811', description: '', children: [] },
      { id: 'wbs_7H_01_03', code: '7H.01.03', name: 'Submittals', xwalkId: '812', description: '', children: [] },
      { id: 'wbs_7H_01_05', code: '7H.01.05', name: 'Supervision', xwalkId: '813', description: '', children: [] },
      { id: 'wbs_7H_01_06', code: '7H.01.06', name: 'Demobilization', xwalkId: '814', description: '', children: [] },
      { id: 'wbs_7H_01_07', code: '7H.01.07', name: 'Close-Out', xwalkId: '815', description: '', children: [] },
      { id: 'wbs_7H_01_10', code: '7H.01.10', name: 'Mockup', xwalkId: '816', description: '', children: [] }
    ] },
    { id: 'wbs_7H_02', code: '7H.02', name: 'Exterior Expansion Joints', xwalkId: '', description: '', children: [
      { id: 'wbs_7H_02_01', code: '7H.02.01', name: 'Exterior - Metal Cover System - Wall Joints', xwalkId: '817', description: '', children: [] },
      { id: 'wbs_7H_02_02', code: '7H.02.02', name: 'Exterior - Metal Cover System - Soffit Joints', xwalkId: '818', description: '', children: [] },
      { id: 'wbs_7H_02_03', code: '7H.02.03', name: 'Exterior - Metal Cover System - Parking Structure Joints', xwalkId: '819', description: '', children: [] },
      { id: 'wbs_7H_02_04', code: '7H.02.04', name: 'Exterior - Metal Cover System - Seating Structure Joints', xwalkId: '820', description: '', children: [] },
      { id: 'wbs_7H_02_05', code: '7H.02.05', name: 'Exterior - Elastomeric Seal - Wall Joints', xwalkId: '821', description: '', children: [] },
      { id: 'wbs_7H_02_06', code: '7H.02.06', name: 'Exterior - Elastomeric Seal - Soffit Joints', xwalkId: '822', description: '', children: [] },
      { id: 'wbs_7H_02_07', code: '7H.02.07', name: 'Exterior - Elastomeric Seal - Parking Structure Joints', xwalkId: '823', description: '', children: [] },
      { id: 'wbs_7H_02_08', code: '7H.02.08', name: 'Exterior - Elastomeric Seal - Seating Structure Joints', xwalkId: '824', description: '', children: [] },
      { id: 'wbs_7H_02_09', code: '7H.02.09', name: 'Exterior - Foam Seal - Wall Joints', xwalkId: '825', description: '', children: [] },
      { id: 'wbs_7H_02_10', code: '7H.02.10', name: 'Exterior - Foam Seal - Soffit Joints', xwalkId: '826', description: '', children: [] },
      { id: 'wbs_7H_02_11', code: '7H.02.11', name: 'Exterior - Foam Seal - Parking Structure Joints', xwalkId: '827', description: '', children: [] },
      { id: 'wbs_7H_02_12', code: '7H.02.12', name: 'Exterior - Foam Seal - Seating Structure Joints', xwalkId: '828', description: '', children: [] },
      { id: 'wbs_7H_02_13', code: '7H.02.13', name: 'Exterior - Fire Barrier - Wall Joints', xwalkId: '829', description: '', children: [] },
      { id: 'wbs_7H_02_14', code: '7H.02.14', name: 'Exterior - Fire Barrier - Parking Structure Joints', xwalkId: '830', description: '', children: [] }
    ] },
    { id: 'wbs_7H_03', code: '7H.03', name: 'Interior Expansion Joints', xwalkId: '', description: '', children: [
      { id: 'wbs_7H_03_01', code: '7H.03.01', name: 'Interior - Metal Cover System - Floor Joints', xwalkId: '831', description: '', children: [] },
      { id: 'wbs_7H_03_02', code: '7H.03.02', name: 'Interior - Metal Cover System - Wall Joints', xwalkId: '832', description: '', children: [] },
      { id: 'wbs_7H_03_03', code: '7H.03.03', name: 'Interior - Metal Cover System - Ceiling Joints', xwalkId: '833', description: '', children: [] },
      { id: 'wbs_7H_03_04', code: '7H.03.04', name: 'Interior - Elastomeric Seal - Floor Joints', xwalkId: '834', description: '', children: [] },
      { id: 'wbs_7H_03_05', code: '7H.03.05', name: 'Interior - Elastomeric Seal - Wall Joints', xwalkId: '835', description: '', children: [] },
      { id: 'wbs_7H_03_06', code: '7H.03.06', name: 'Interior - Elastomeric Seal - Ceiling Joints', xwalkId: '836', description: '', children: [] },
      { id: 'wbs_7H_03_07', code: '7H.03.07', name: 'Interior - Foam Seal - Floor Joints', xwalkId: '837', description: '', children: [] },
      { id: 'wbs_7H_03_08', code: '7H.03.08', name: 'Interior - Foam Seal - Wall Joints', xwalkId: '838', description: '', children: [] },
      { id: 'wbs_7H_03_09', code: '7H.03.09', name: 'Interior - Foam Seal - Ceiling Joints', xwalkId: '839', description: '', children: [] },
      { id: 'wbs_7H_03_10', code: '7H.03.10', name: 'Interior - Fire Barrier - Floor Joints', xwalkId: '840', description: '', children: [] },
      { id: 'wbs_7H_03_11', code: '7H.03.11', name: 'Interior - Fire Barrier - Wall Joints', xwalkId: '841', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_7J', code: '7J', name: 'Roof Pedestal Pavers', xwalkId: '', description: '', children: [
    { id: 'wbs_7J_00', code: '7J.00', name: 'Pedestal & Pavers', xwalkId: '', description: '', children: [
      { id: 'wbs_7J_00_00', code: '7J.00.00', name: 'Roof Pedestals & Pavers System', xwalkId: '842', description: '', children: [] }
    ] },
    { id: 'wbs_7J_01', code: '7J.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_7J_01_01', code: '7J.01.01', name: 'Mobilization', xwalkId: '843', description: '', children: [] },
      { id: 'wbs_7J_01_02', code: '7J.01.02', name: 'Bond/Permit', xwalkId: '844', description: '', children: [] },
      { id: 'wbs_7J_01_03', code: '7J.01.03', name: 'Submittals', xwalkId: '845', description: '', children: [] },
      { id: 'wbs_7J_01_04', code: '7J.01.04', name: 'Equip Rentals', xwalkId: '846', description: '', children: [] },
      { id: 'wbs_7J_01_07', code: '7J.01.07', name: 'Close-Out', xwalkId: '847', description: '', children: [] },
      { id: 'wbs_7J_01_09', code: '7J.01.09', name: 'Cleaning', xwalkId: '848', description: '', children: [] }
    ] },
    { id: 'wbs_7J_02', code: '7J.02', name: 'Roof Pavers', xwalkId: '', description: '', children: [
      { id: 'wbs_7J_02_10', code: '7J.02.10', name: 'Roof Porcelain Pavers', xwalkId: '849', description: '', children: [] },
      { id: 'wbs_7J_02_20', code: '7J.02.20', name: 'Roof Concrete Pavers', xwalkId: '850', description: '', children: [] },
      { id: 'wbs_7J_02_30', code: '7J.02.30', name: 'Roof Wood Deck Tiles', xwalkId: '851', description: '', children: [] },
      { id: 'wbs_7J_02_40', code: '7J.02.40', name: 'Roof Ballast Pavers', xwalkId: '852', description: '', children: [] },
      { id: 'wbs_7J_02_50', code: '7J.02.50', name: 'Roof Turf', xwalkId: '853', description: '', children: [] }
    ] },
    { id: 'wbs_7J_03', code: '7J.03', name: 'Roof Pedestals', xwalkId: '', description: '', children: [
      { id: 'wbs_7J_03_10', code: '7J.03.10', name: 'Adjustable Roof Pedestals', xwalkId: '854', description: '', children: [] },
      { id: 'wbs_7J_03_20', code: '7J.03.20', name: 'Non-Adjustable Roof Pedestals', xwalkId: '855', description: '', children: [] }
    ] },
    { id: 'wbs_7J_04', code: '7J.04', name: 'Roof Trays', xwalkId: '', description: '', children: [
      { id: 'wbs_7J_04_10', code: '7J.04.10', name: 'Paver Trays', xwalkId: '856', description: '', children: [] },
      { id: 'wbs_7J_04_20', code: '7J.04.20', name: 'Turf Trays', xwalkId: '857', description: '', children: [] },
      { id: 'wbs_7J_04_30', code: '7J.04.30', name: 'Plant Trays', xwalkId: '858', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8A', code: '8A', name: 'Doors', xwalkId: '', description: '', children: [
    { id: 'wbs_8A_00', code: '8A.00', name: 'Doors / Frames / HW', xwalkId: '', description: '', children: [
      { id: 'wbs_8A_00_01', code: '8A.00.01', name: 'Doors (Turnkey)', xwalkId: '859', description: '', children: [] },
      { id: 'wbs_8A_00_02', code: '8A.00.02', name: 'Doors / Frames / HW (Material)', xwalkId: '860', description: '', children: [] },
      { id: 'wbs_8A_00_03', code: '8A.00.03', name: 'Doors / HW (Install)', xwalkId: '861', description: '', children: [] },
      { id: 'wbs_8A_00_04', code: '8A.00.04', name: 'Storefront Door Hardware', xwalkId: '862', description: '', children: [] }
    ] },
    { id: 'wbs_8A_01', code: '8A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8A_01_01', code: '8A.01.01', name: 'Mobilization', xwalkId: '863', description: '', children: [] },
      { id: 'wbs_8A_01_02', code: '8A.01.02', name: 'Bond/Permit', xwalkId: '864', description: '', children: [] },
      { id: 'wbs_8A_01_03', code: '8A.01.03', name: 'Submittals', xwalkId: '865', description: '', children: [] },
      { id: 'wbs_8A_01_04', code: '8A.01.04', name: 'Equip Rentals', xwalkId: '866', description: '', children: [] },
      { id: 'wbs_8A_01_05', code: '8A.01.05', name: 'Supervision', xwalkId: '867', description: '', children: [] },
      { id: 'wbs_8A_01_06', code: '8A.01.06', name: 'Demobilization', xwalkId: '868', description: '', children: [] },
      { id: 'wbs_8A_01_07', code: '8A.01.07', name: 'Close-Out', xwalkId: '869', description: '', children: [] },
      { id: 'wbs_8A_01_10', code: '8A.01.10', name: 'Mockup', xwalkId: '870', description: '', children: [] }
    ] },
    { id: 'wbs_8A_02', code: '8A.02', name: 'Exterior Openings', xwalkId: '', description: '', children: [
      { id: 'wbs_8A_02_00', code: '8A.02.00', name: 'Exterior Door - Frame / Door', xwalkId: '871', description: '', children: [] },
      { id: 'wbs_8A_02_11', code: '8A.02.11', name: 'Exterior Door - HM Frame / HM Door', xwalkId: '872', description: '', children: [] },
      { id: 'wbs_8A_02_12', code: '8A.02.12', name: 'Exterior Door - HM Frame / Wood Door', xwalkId: '873', description: '', children: [] },
      { id: 'wbs_8A_02_13', code: '8A.02.13', name: 'Exterior Door - Wood Frame / Wood Door', xwalkId: '874', description: '', children: [] },
      { id: 'wbs_8A_02_14', code: '8A.02.14', name: 'Exterior Door - ALUM Frame / Wood Door', xwalkId: '875', description: '', children: [] },
      { id: 'wbs_8A_02_15', code: '8A.02.15', name: 'Exterior Door - ALUM Frame / ALUM Door', xwalkId: '876', description: '', children: [] },
      { id: 'wbs_8A_02_16', code: '8A.02.16', name: 'Exterior Door - FRP Frame / FRP Door', xwalkId: '877', description: '', children: [] },
      { id: 'wbs_8A_02_17', code: '8A.02.17', name: 'Exterior Door - STC Frame / STC Door', xwalkId: '878', description: '', children: [] },
      { id: 'wbs_8A_02_18', code: '8A.02.18', name: 'Exterior Door - Storm Frame / Storm Door', xwalkId: '879', description: '', children: [] },
      { id: 'wbs_8A_02_19', code: '8A.02.19', name: 'Exterior Door - Wood Door in Storefront', xwalkId: '880', description: '', children: [] },
      { id: 'wbs_8A_02_20', code: '8A.02.20', name: 'Exterior Door & Hardware - Install', xwalkId: '881', description: '', children: [] },
      { id: 'wbs_8A_02_31', code: '8A.02.31', name: 'Exterior Door Frames - HM', xwalkId: '882', description: '', children: [] },
      { id: 'wbs_8A_02_32', code: '8A.02.32', name: 'Exterior Door Frames - Wood', xwalkId: '883', description: '', children: [] },
      { id: 'wbs_8A_02_33', code: '8A.02.33', name: 'Exterior Door Frames - ALUM', xwalkId: '884', description: '', children: [] },
      { id: 'wbs_8A_02_34', code: '8A.02.34', name: 'Exterior Door Frames - FRP', xwalkId: '885', description: '', children: [] },
      { id: 'wbs_8A_02_35', code: '8A.02.35', name: 'Exterior Door Frames - STC', xwalkId: '886', description: '', children: [] },
      { id: 'wbs_8A_02_36', code: '8A.02.36', name: 'Exterior Door Frames - Storm Resistant', xwalkId: '887', description: '', children: [] },
      { id: 'wbs_8A_02_41', code: '8A.02.41', name: 'Exterior Door - HM', xwalkId: '888', description: '', children: [] },
      { id: 'wbs_8A_02_42', code: '8A.02.42', name: 'Exterior Door - Wood', xwalkId: '889', description: '', children: [] },
      { id: 'wbs_8A_02_43', code: '8A.02.43', name: 'Exterior Door - ALUM', xwalkId: '890', description: '', children: [] },
      { id: 'wbs_8A_02_44', code: '8A.02.44', name: 'Exterior Door - FRP', xwalkId: '891', description: '', children: [] },
      { id: 'wbs_8A_02_45', code: '8A.02.45', name: 'Exterior Door - STC', xwalkId: '892', description: '', children: [] },
      { id: 'wbs_8A_02_46', code: '8A.02.46', name: 'Exterior Door - Storm Resistant', xwalkId: '893', description: '', children: [] },
      { id: 'wbs_8A_02_51', code: '8A.02.51', name: 'Exterior Door Hardware - HM Door', xwalkId: '894', description: '', children: [] },
      { id: 'wbs_8A_02_52', code: '8A.02.52', name: 'Exterior Door Hardware - Wood Door', xwalkId: '895', description: '', children: [] },
      { id: 'wbs_8A_02_53', code: '8A.02.53', name: 'Exterior Door Hardware - ALUM Door', xwalkId: '896', description: '', children: [] },
      { id: 'wbs_8A_02_54', code: '8A.02.54', name: 'Exterior Door Hardware - FRP Door', xwalkId: '897', description: '', children: [] },
      { id: 'wbs_8A_02_55', code: '8A.02.55', name: 'Exterior Door Hardware - STC Door', xwalkId: '898', description: '', children: [] },
      { id: 'wbs_8A_02_56', code: '8A.02.56', name: 'Exterior Door Hardware - Storm Resistant Door', xwalkId: '899', description: '', children: [] },
      { id: 'wbs_8A_02_61', code: '8A.02.61', name: 'Exterior Door and Hardware (install) - HM Door', xwalkId: '900', description: '', children: [] },
      { id: 'wbs_8A_02_62', code: '8A.02.62', name: 'Exterior Door and Hardware (install) - Wood Door', xwalkId: '901', description: '', children: [] },
      { id: 'wbs_8A_02_63', code: '8A.02.63', name: 'Exterior Door and Hardware (install) - ALUM Door', xwalkId: '902', description: '', children: [] },
      { id: 'wbs_8A_02_64', code: '8A.02.64', name: 'Exterior Door and Hardware (install) - FRP Door', xwalkId: '903', description: '', children: [] },
      { id: 'wbs_8A_02_65', code: '8A.02.65', name: 'Exterior Door and Hardware (install) - STC Door', xwalkId: '904', description: '', children: [] },
      { id: 'wbs_8A_02_66', code: '8A.02.66', name: 'Exterior Door and Hardware (install) - Storm Resistant Door', xwalkId: '905', description: '', children: [] }
    ] },
    { id: 'wbs_8A_03', code: '8A.03', name: 'Interior Openings', xwalkId: '', description: '', children: [
      { id: 'wbs_8A_03_00', code: '8A.03.00', name: 'Interior Door - Frame / Door', xwalkId: '906', description: '', children: [] },
      { id: 'wbs_8A_03_11', code: '8A.03.11', name: 'Interior Window Frame - HM', xwalkId: '907', description: '', children: [] },
      { id: 'wbs_8A_03_12', code: '8A.03.12', name: 'Interior Door - HM Frame / HM Door', xwalkId: '908', description: '', children: [] },
      { id: 'wbs_8A_03_13', code: '8A.03.13', name: 'Interior Door - HM Frame / Wood Door', xwalkId: '909', description: '', children: [] },
      { id: 'wbs_8A_03_14', code: '8A.03.14', name: 'Interior Door - Wood Frame / Wood Door', xwalkId: '910', description: '', children: [] },
      { id: 'wbs_8A_03_15', code: '8A.03.15', name: 'Interior Door - ALUM Frame / Wood Door', xwalkId: '911', description: '', children: [] },
      { id: 'wbs_8A_03_16', code: '8A.03.16', name: 'Interior Door - ALUM Frame / ALUM Door', xwalkId: '912', description: '', children: [] },
      { id: 'wbs_8A_03_17', code: '8A.03.17', name: 'Interior Door - FRP Frame / FRP Door', xwalkId: '913', description: '', children: [] },
      { id: 'wbs_8A_03_18', code: '8A.03.18', name: 'Interior Door - STC Frame / STC Door', xwalkId: '914', description: '', children: [] },
      { id: 'wbs_8A_03_19', code: '8A.03.19', name: 'Interior Door - Wood Door in Storefront', xwalkId: '915', description: '', children: [] },
      { id: 'wbs_8A_03_20', code: '8A.03.20', name: 'Interior Door & Hardware - Install', xwalkId: '916', description: '', children: [] },
      { id: 'wbs_8A_03_21', code: '8A.03.21', name: 'Interior Traffic Doors & Frames', xwalkId: '917', description: '', children: [] },
      { id: 'wbs_8A_03_22', code: '8A.03.22', name: 'Interior Safety Doors & Frames', xwalkId: '918', description: '', children: [] },
      { id: 'wbs_8A_03_31', code: '8A.03.31', name: 'Interior Window Frame - HM', xwalkId: '919', description: '', children: [] },
      { id: 'wbs_8A_03_32', code: '8A.03.32', name: 'Interior Door Frame - HM', xwalkId: '920', description: '', children: [] },
      { id: 'wbs_8A_03_33', code: '8A.03.33', name: 'Interior Door Frame - Wood', xwalkId: '921', description: '', children: [] },
      { id: 'wbs_8A_03_34', code: '8A.03.34', name: 'Interior Door Frame - ALUM', xwalkId: '922', description: '', children: [] },
      { id: 'wbs_8A_03_35', code: '8A.03.35', name: 'Interior Door Frame - FRP', xwalkId: '923', description: '', children: [] },
      { id: 'wbs_8A_03_36', code: '8A.03.36', name: 'Interior Door Frame - STC', xwalkId: '924', description: '', children: [] },
      { id: 'wbs_8A_03_41', code: '8A.03.41', name: 'Interior Door - HM', xwalkId: '925', description: '', children: [] },
      { id: 'wbs_8A_03_42', code: '8A.03.42', name: 'Interior Door - Wood', xwalkId: '926', description: '', children: [] },
      { id: 'wbs_8A_03_43', code: '8A.03.43', name: 'Interior Door - ALUM', xwalkId: '927', description: '', children: [] },
      { id: 'wbs_8A_03_44', code: '8A.03.44', name: 'Interior Door - FRP', xwalkId: '928', description: '', children: [] },
      { id: 'wbs_8A_03_45', code: '8A.03.45', name: 'Interior Door - STC', xwalkId: '929', description: '', children: [] },
      { id: 'wbs_8A_03_51', code: '8A.03.51', name: 'Interior Door Hardware - HM Door', xwalkId: '930', description: '', children: [] },
      { id: 'wbs_8A_03_52', code: '8A.03.52', name: 'Interior Door Hardware - Wood Door', xwalkId: '931', description: '', children: [] },
      { id: 'wbs_8A_03_53', code: '8A.03.53', name: 'Interior Door Hardware - ALUM Door', xwalkId: '932', description: '', children: [] },
      { id: 'wbs_8A_03_54', code: '8A.03.54', name: 'Interior Door Hardware - FRP Door', xwalkId: '933', description: '', children: [] },
      { id: 'wbs_8A_03_55', code: '8A.03.55', name: 'Interior Door Hardware - STC Door', xwalkId: '934', description: '', children: [] },
      { id: 'wbs_8A_03_61', code: '8A.03.61', name: 'Interior Door and Hardware (install) - HM Door', xwalkId: '935', description: '', children: [] },
      { id: 'wbs_8A_03_62', code: '8A.03.62', name: 'Interior Door and Hardware (install) - Wood Door', xwalkId: '936', description: '', children: [] },
      { id: 'wbs_8A_03_63', code: '8A.03.63', name: 'Interior Door and Hardware (install) - ALUM Door', xwalkId: '937', description: '', children: [] },
      { id: 'wbs_8A_03_64', code: '8A.03.64', name: 'Interior Door and Hardware (install) - FRP Door', xwalkId: '938', description: '', children: [] },
      { id: 'wbs_8A_03_65', code: '8A.03.65', name: 'Interior Door and Hardware (install) - STC Door', xwalkId: '939', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8B', code: '8B', name: 'Fire Doors', xwalkId: '', description: '', children: [
    { id: 'wbs_8B_01', code: '8B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8B_01_01', code: '8B.01.01', name: 'Mobilization', xwalkId: '940', description: '', children: [] },
      { id: 'wbs_8B_01_02', code: '8B.01.02', name: 'Bond/Permit', xwalkId: '941', description: '', children: [] },
      { id: 'wbs_8B_01_03', code: '8B.01.03', name: 'Submittals', xwalkId: '942', description: '', children: [] },
      { id: 'wbs_8B_01_07', code: '8B.01.07', name: 'Close-Out', xwalkId: '943', description: '', children: [] },
      { id: 'wbs_8B_01_09', code: '8B.01.09', name: 'Cleaning', xwalkId: '944', description: '', children: [] }
    ] },
    { id: 'wbs_8B_02', code: '8B.02', name: 'Vertical Coiling Fire Door', xwalkId: '', description: '', children: [
      { id: 'wbs_8B_02_01', code: '8B.02.01', name: 'Interior Overhead Coiling Fire Doors', xwalkId: '945', description: '', children: [] }
    ] },
    { id: 'wbs_8B_03', code: '8B.03', name: 'Horizontal Sliding Fire Door', xwalkId: '', description: '', children: [
      { id: 'wbs_8B_03_01', code: '8B.03.01', name: 'Interior Accordion Folding Fire Doors', xwalkId: '946', description: '', children: [] },
      { id: 'wbs_8B_03_02', code: '8B.03.02', name: 'Accordion Fire Doors - Pocket Doors', xwalkId: '947', description: '', children: [] },
      { id: 'wbs_8B_03_03', code: '8B.03.03', name: 'Accordion Fire Doors - Vision Panel', xwalkId: '948', description: '', children: [] },
      { id: 'wbs_8B_03_04', code: '8B.03.04', name: 'Accordion Fire Doors - Automatic Closing System', xwalkId: '949', description: '', children: [] },
      { id: 'wbs_8B_03_05', code: '8B.03.05', name: 'Accordion Fire Doors - MODBUS Controls', xwalkId: '950', description: '', children: [] },
      { id: 'wbs_8B_03_06', code: '8B.03.06', name: 'Accordion Fire Doors - Exit Hardware', xwalkId: '951', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8C', code: '8C', name: 'Overhead Doors', xwalkId: '', description: '', children: [
    { id: 'wbs_8C_01', code: '8C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8C_01_01', code: '8C.01.01', name: 'Mobilization', xwalkId: '952', description: '', children: [] },
      { id: 'wbs_8C_01_02', code: '8C.01.02', name: 'Bond/Permit', xwalkId: '953', description: '', children: [] },
      { id: 'wbs_8C_01_03', code: '8C.01.03', name: 'Submittals', xwalkId: '954', description: '', children: [] },
      { id: 'wbs_8C_01_05', code: '8C.01.05', name: 'Supervision', xwalkId: '955', description: '', children: [] },
      { id: 'wbs_8C_01_06', code: '8C.01.06', name: 'Demobilization', xwalkId: '956', description: '', children: [] },
      { id: 'wbs_8C_01_07', code: '8C.01.07', name: 'Close-Out', xwalkId: '957', description: '', children: [] }
    ] },
    { id: 'wbs_8C_02', code: '8C.02', name: 'Exterior Overhead Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_8C_02_01', code: '8C.02.01', name: 'Exterior Counter Doors', xwalkId: '958', description: '', children: [] },
      { id: 'wbs_8C_02_02', code: '8C.02.02', name: 'Exterior Coiling Overhead Doors', xwalkId: '959', description: '', children: [] },
      { id: 'wbs_8C_02_03', code: '8C.02.03', name: 'Exterior Sectional Overhead Doors', xwalkId: '960', description: '', children: [] },
      { id: 'wbs_8C_02_04', code: '8C.02.04', name: 'Exterior Glass Overhead Doors', xwalkId: '961', description: '', children: [] }
    ] },
    { id: 'wbs_8C_03', code: '8C.03', name: 'Interior Overhead Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_8C_03_01', code: '8C.03.01', name: 'Interior Counter Doors', xwalkId: '962', description: '', children: [] },
      { id: 'wbs_8C_03_02', code: '8C.03.02', name: 'Interior Coiling Overhead Doors', xwalkId: '963', description: '', children: [] },
      { id: 'wbs_8C_03_03', code: '8C.03.03', name: 'Interior Sectional Overhead Doors', xwalkId: '964', description: '', children: [] },
      { id: 'wbs_8C_03_04', code: '8C.03.04', name: 'Interior Glass Overhead Doors', xwalkId: '965', description: '', children: [] }
    ] },
    { id: 'wbs_8C_04', code: '8C.04', name: 'Interior Grilles', xwalkId: '', description: '', children: [
      { id: 'wbs_8C_04_01', code: '8C.04.01', name: 'Interior Counter Grilles', xwalkId: '966', description: '', children: [] },
      { id: 'wbs_8C_04_02', code: '8C.04.02', name: 'Interior Coiling Grilles', xwalkId: '967', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8D', code: '8D', name: 'Glass & Glazing', xwalkId: '', description: '', children: [
    { id: 'wbs_8D_01', code: '8D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_01_01', code: '8D.01.01', name: 'Mobilization', xwalkId: '968', description: '', children: [] },
      { id: 'wbs_8D_01_02', code: '8D.01.02', name: 'Bond/Permit', xwalkId: '969', description: '', children: [] },
      { id: 'wbs_8D_01_03', code: '8D.01.03', name: 'Submittals', xwalkId: '970', description: '', children: [] },
      { id: 'wbs_8D_01_04', code: '8D.01.04', name: 'Equip Rentals', xwalkId: '971', description: '', children: [] },
      { id: 'wbs_8D_01_05', code: '8D.01.05', name: 'Supervision', xwalkId: '972', description: '', children: [] },
      { id: 'wbs_8D_01_06', code: '8D.01.06', name: 'Demobilization', xwalkId: '973', description: '', children: [] },
      { id: 'wbs_8D_01_07', code: '8D.01.07', name: 'Close-Out', xwalkId: '974', description: '', children: [] },
      { id: 'wbs_8D_01_09', code: '8D.01.09', name: 'Cleaning', xwalkId: '975', description: '', children: [] },
      { id: 'wbs_8D_01_10', code: '8D.01.10', name: 'Mockup', xwalkId: '976', description: '', children: [] },
      { id: 'wbs_8D_01_13', code: '8D.01.13', name: 'Water Test', xwalkId: '977', description: '', children: [] }
    ] },
    { id: 'wbs_8D_02', code: '8D.02', name: 'Exterior Entrances, Storefronts, Curtainwalls', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_02_01', code: '8D.02.01', name: 'Exterior Curtainwall System', xwalkId: '978', description: '', children: [] },
      { id: 'wbs_8D_02_02', code: '8D.02.02', name: 'Exterior Storefront System', xwalkId: '979', description: '', children: [] },
      { id: 'wbs_8D_02_03', code: '8D.02.03', name: 'Exterior Alum Sliding Glass Windows', xwalkId: '980', description: '', children: [] },
      { id: 'wbs_8D_02_04', code: '8D.02.04', name: 'Exterior Glass/Storefront Doors', xwalkId: '981', description: '', children: [] },
      { id: 'wbs_8D_02_05', code: '8D.02.05', name: 'Exterior Alum Window Box', xwalkId: '982', description: '', children: [] },
      { id: 'wbs_8D_02_06', code: '8D.02.06', name: 'Exterior Window Screens', xwalkId: '983', description: '', children: [] },
      { id: 'wbs_8D_02_07', code: '8D.02.07', name: 'Exterior Glazing @ Door Vision Lites', xwalkId: '984', description: '', children: [] },
      { id: 'wbs_8D_02_08', code: '8D.02.08', name: 'Exterior Glazing @ HM Frames', xwalkId: '985', description: '', children: [] },
      { id: 'wbs_8D_02_09', code: '8D.02.09', name: 'Exterior Door Hardware - Storefront Doors', xwalkId: '986', description: '', children: [] },
      { id: 'wbs_8D_02_10', code: '8D.02.10', name: 'Exterior Sliding Glass Door', xwalkId: '987', description: '', children: [] }
    ] },
    { id: 'wbs_8D_03', code: '8D.03', name: 'Exterior Glazing Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_03_01', code: '8D.03.01', name: 'Exterior Perimeter Caulking', xwalkId: '988', description: '', children: [] },
      { id: 'wbs_8D_03_02', code: '8D.03.02', name: 'Exterior Firestopping', xwalkId: '989', description: '', children: [] },
      { id: 'wbs_8D_03_03', code: '8D.03.03', name: 'Alum Flashing/Sub Sill', xwalkId: '990', description: '', children: [] },
      { id: 'wbs_8D_03_04', code: '8D.03.04', name: 'Spandrel Glass Insulation', xwalkId: '991', description: '', children: [] },
      { id: 'wbs_8D_03_05', code: '8D.03.05', name: 'Break Metal', xwalkId: '992', description: '', children: [] },
      { id: 'wbs_8D_03_06', code: '8D.03.06', name: 'Infill Metal Panels', xwalkId: '993', description: '', children: [] },
      { id: 'wbs_8D_03_07', code: '8D.03.07', name: 'Exterior Mullion Extensions', xwalkId: '994', description: '', children: [] }
    ] },
    { id: 'wbs_8D_04', code: '8D.04', name: 'Interior Entrances, Storefronts, Curtainwalls', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_04_01', code: '8D.04.01', name: 'Interior Curtainwall System', xwalkId: '995', description: '', children: [] },
      { id: 'wbs_8D_04_02', code: '8D.04.02', name: 'Interior Storefront System', xwalkId: '996', description: '', children: [] },
      { id: 'wbs_8D_04_03', code: '8D.04.03', name: 'Interior Alum Sliding Glass Windows', xwalkId: '997', description: '', children: [] },
      { id: 'wbs_8D_04_04', code: '8D.04.04', name: 'Interior Glass/Storefront Doors', xwalkId: '998', description: '', children: [] },
      { id: 'wbs_8D_04_05', code: '8D.04.05', name: 'Interior Manual Sliding Glass Doors', xwalkId: '999', description: '', children: [] },
      { id: 'wbs_8D_04_06', code: '8D.04.06', name: 'Interior Glazing @ Doors Vision Lites', xwalkId: '1000', description: '', children: [] },
      { id: 'wbs_8D_04_07', code: '8D.04.07', name: 'Interior Glazing @ HM/RACO Frames', xwalkId: '1001', description: '', children: [] },
      { id: 'wbs_8D_04_08', code: '8D.04.08', name: 'Interior Door Hardware - Storefront Doors', xwalkId: '1002', description: '', children: [] },
      { id: 'wbs_8D_04_09', code: '8D.04.09', name: 'Interior Alum fixed Glass Windows', xwalkId: '1003', description: '', children: [] },
      { id: 'wbs_8D_04_10', code: '8D.04.10', name: 'Interior Sound Control Windows', xwalkId: '1004', description: '', children: [] }
    ] },
    { id: 'wbs_8D_05', code: '8D.05', name: 'Interior Glazing Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_05_01', code: '8D.05.01', name: 'Interior Perimeter Caulking', xwalkId: '1005', description: '', children: [] },
      { id: 'wbs_8D_05_02', code: '8D.05.02', name: 'Interior Firestopping', xwalkId: '1006', description: '', children: [] }
    ] },
    { id: 'wbs_8D_06', code: '8D.06', name: 'Glass Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_06_01', code: '8D.06.01', name: 'Glass at Cabinetry/Display Cases', xwalkId: '1007', description: '', children: [] },
      { id: 'wbs_8D_06_02', code: '8D.06.02', name: 'Interior Glass Shelves', xwalkId: '1008', description: '', children: [] },
      { id: 'wbs_8D_06_03', code: '8D.06.03', name: 'Unframed Mirrors', xwalkId: '1009', description: '', children: [] },
      { id: 'wbs_8D_06_04', code: '8D.06.04', name: 'Back Painted Glass', xwalkId: '1010', description: '', children: [] },
      { id: 'wbs_8D_06_05', code: '8D.06.05', name: 'Glass Shower Enclosures', xwalkId: '1011', description: '', children: [] },
      { id: 'wbs_8D_06_06', code: '8D.06.06', name: 'Glass Flooring', xwalkId: '3614', description: '', children: [] }
    ] },
    { id: 'wbs_8D_07', code: '8D.07', name: 'Glazing Films', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_07_01', code: '8D.07.01', name: 'Decorative Film', xwalkId: '1012', description: '', children: [] },
      { id: 'wbs_8D_07_02', code: '8D.07.02', name: 'Safety & Security Film', xwalkId: '1013', description: '', children: [] }
    ] },
    { id: 'wbs_8D_08', code: '8D.08', name: 'Sunshades', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_08_01', code: '8D.08.01', name: 'Exterior Sunshades', xwalkId: '1014', description: '', children: [] }
    ] },
    { id: 'wbs_8D_09', code: '8D.09', name: 'Operable Partition', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_09_01', code: '8D.09.01', name: 'Exterior Operable Glass Wall Partition', xwalkId: '1015', description: '', children: [] },
      { id: 'wbs_8D_09_02', code: '8D.09.02', name: 'Interior Operable Glass Wall Partition', xwalkId: '1016', description: '', children: [] }
    ] },
    { id: 'wbs_8D_10', code: '8D.10', name: 'Premanufactured Windows', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_10_01', code: '8D.10.01', name: 'Exterior Vinyl Windows', xwalkId: '1017', description: '', children: [] },
      { id: 'wbs_8D_10_02', code: '8D.10.02', name: 'Exterior Special Function Windows', xwalkId: '1018', description: '', children: [] },
      { id: 'wbs_8D_10_03', code: '8D.10.03', name: 'Interior Special Function Windows', xwalkId: '1019', description: '', children: [] }
    ] },
    { id: 'wbs_8D_11', code: '8D.11', name: 'Special Openings', xwalkId: '', description: '', children: [
      { id: 'wbs_8D_11_01', code: '8D.11.01', name: 'Exterior Automatic Entrances', xwalkId: '1020', description: '', children: [] },
      { id: 'wbs_8D_11_02', code: '8D.11.02', name: 'Exterior Automatic Door Operators', xwalkId: '1021', description: '', children: [] },
      { id: 'wbs_8D_11_03', code: '8D.11.03', name: 'Interior Automatic Entrances', xwalkId: '1022', description: '', children: [] },
      { id: 'wbs_8D_11_04', code: '8D.11.04', name: 'Interior Automatic Door Operators', xwalkId: '1023', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8E', code: '8E', name: 'Skylights', xwalkId: '', description: '', children: [
    { id: 'wbs_8E_01', code: '8E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8E_01_01', code: '8E.01.01', name: 'Mobilization', xwalkId: '1024', description: '', children: [] },
      { id: 'wbs_8E_01_02', code: '8E.01.02', name: 'Bond/Permit', xwalkId: '1025', description: '', children: [] },
      { id: 'wbs_8E_01_03', code: '8E.01.03', name: 'Submittals', xwalkId: '1026', description: '', children: [] },
      { id: 'wbs_8E_01_04', code: '8E.01.04', name: 'Equip Rentals', xwalkId: '1027', description: '', children: [] },
      { id: 'wbs_8E_01_07', code: '8E.01.07', name: 'Close-Out', xwalkId: '1028', description: '', children: [] },
      { id: 'wbs_8E_01_09', code: '8E.01.09', name: 'Cleaning', xwalkId: '1029', description: '', children: [] }
    ] },
    { id: 'wbs_8E_02', code: '8E.02', name: 'Structured-Polycarbonate-Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_8E_02_10', code: '8E.02.10', name: 'Translucent Polycarbonate Wall Panels', xwalkId: '1030', description: '', children: [] },
      { id: 'wbs_8E_02_20', code: '8E.02.20', name: 'Translucent Polycarbonate Window Assemblies', xwalkId: '1031', description: '', children: [] },
      { id: 'wbs_8E_02_30', code: '8E.02.30', name: 'Translucent Polycarbonate Skylights', xwalkId: '1032', description: '', children: [] }
    ] },
    { id: 'wbs_8E_03', code: '8E.03', name: 'Fiberglass-Sandwich-Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_8E_03_10', code: '8E.03.10', name: 'Translucent Fiberglass Wall Panels', xwalkId: '1033', description: '', children: [] },
      { id: 'wbs_8E_03_20', code: '8E.03.20', name: 'Translucent Fiberglass Skylight', xwalkId: '1034', description: '', children: [] }
    ] },
    { id: 'wbs_8E_04', code: '8E.04', name: 'Unit Skylights', xwalkId: '', description: '', children: [
      { id: 'wbs_8E_04_10', code: '8E.04.10', name: 'Domed Unit Skylights', xwalkId: '1035', description: '', children: [] },
      { id: 'wbs_8E_04_20', code: '8E.04.20', name: 'Pyramidal Unit Skylights', xwalkId: '1036', description: '', children: [] },
      { id: 'wbs_8E_04_30', code: '8E.04.30', name: 'Tubular Unit Skylights', xwalkId: '1037', description: '', children: [] },
      { id: 'wbs_8E_04_40', code: '8E.04.40', name: 'Tubular Daylighting Device', xwalkId: '1038', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8F', code: '8F', name: 'Architectural Louvers', xwalkId: '', description: '', children: [
    { id: 'wbs_8F_01', code: '8F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_01_01', code: '8F.01.01', name: 'Mobilization', xwalkId: '1039', description: '', children: [] },
      { id: 'wbs_8F_01_02', code: '8F.01.02', name: 'Bond/Permit', xwalkId: '1040', description: '', children: [] },
      { id: 'wbs_8F_01_03', code: '8F.01.03', name: 'Submittals', xwalkId: '1041', description: '', children: [] },
      { id: 'wbs_8F_01_04', code: '8F.01.04', name: 'Equip Rentals', xwalkId: '1042', description: '', children: [] },
      { id: 'wbs_8F_01_07', code: '8F.01.07', name: 'Close-Out', xwalkId: '1043', description: '', children: [] },
      { id: 'wbs_8F_01_09', code: '8F.01.09', name: 'Cleaning', xwalkId: '1044', description: '', children: [] }
    ] },
    { id: 'wbs_8F_02', code: '8F.02', name: 'Standard Louvers', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_02_10', code: '8F.02.10', name: 'Fixed Drainable Louvers', xwalkId: '1045', description: '', children: [] },
      { id: 'wbs_8F_02_20', code: '8F.02.20', name: 'Fixed Non-Drainable Louvers', xwalkId: '1046', description: '', children: [] },
      { id: 'wbs_8F_02_30', code: '8F.02.30', name: 'Adjustable Louvers', xwalkId: '1047', description: '', children: [] },
      { id: 'wbs_8F_02_40', code: '8F.02.40', name: 'Combination Louvers', xwalkId: '1048', description: '', children: [] }
    ] },
    { id: 'wbs_8F_03', code: '8F.03', name: 'Extreme Weather Louvers', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_03_10', code: '8F.03.10', name: 'Wind Driven Rain Rated Louvers', xwalkId: '1049', description: '', children: [] },
      { id: 'wbs_8F_03_20', code: '8F.03.20', name: 'Storm-Resistant Louvers', xwalkId: '1050', description: '', children: [] },
      { id: 'wbs_8F_03_30', code: '8F.03.30', name: 'Hurricane-Resistant Louver', xwalkId: '1051', description: '', children: [] }
    ] },
    { id: 'wbs_8F_04', code: '8F.04', name: 'Rooftop Equipment Enclosure', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_04_10', code: '8F.04.10', name: 'Louvered Roof Equipment Screen - Direct Mount (w/ framing)', xwalkId: '1052', description: '', children: [] },
      { id: 'wbs_8F_04_20', code: '8F.04.20', name: 'Louvered Roof Equipment Screen - Standard Mount (w/o framing)', xwalkId: '1053', description: '', children: [] },
      { id: 'wbs_8F_04_30', code: '8F.04.30', name: 'Louvered Roof Equipment Screen - Prefab Structural Framing', xwalkId: '1054', description: '', children: [] }
    ] },
    { id: 'wbs_8F_05', code: '8F.05', name: 'Site Equipment Enclosure', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_05_10', code: '8F.05.10', name: 'Louvered Frame Gate - Dumpster Enclosure', xwalkId: '1055', description: '', children: [] },
      { id: 'wbs_8F_05_20', code: '8F.05.20', name: 'Louveres - Site Enclosure', xwalkId: '1056', description: '', children: [] }
    ] },
    { id: 'wbs_8F_06', code: '8F.06', name: 'Vents', xwalkId: '', description: '', children: [
      { id: 'wbs_8F_06_10', code: '8F.06.10', name: 'Soffit Vents', xwalkId: '1057', description: '', children: [] },
      { id: 'wbs_8F_06_20', code: '8F.06.20', name: 'Wall Vents', xwalkId: '1058', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_8G', code: '8G', name: 'Access Doors', xwalkId: '', description: '', children: [
    { id: 'wbs_8G_01', code: '8G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_8G_01_01', code: '8G.01.01', name: 'Mobilization', xwalkId: '1059', description: '', children: [] },
      { id: 'wbs_8G_01_02', code: '8G.01.02', name: 'Bond/Permit', xwalkId: '1060', description: '', children: [] },
      { id: 'wbs_8G_01_03', code: '8G.01.03', name: 'Submittals', xwalkId: '1061', description: '', children: [] },
      { id: 'wbs_8G_01_07', code: '8G.01.07', name: 'Close-Out', xwalkId: '1062', description: '', children: [] },
      { id: 'wbs_8G_01_09', code: '8G.01.09', name: 'Cleaning', xwalkId: '1063', description: '', children: [] }
    ] },
    { id: 'wbs_8G_02', code: '8G.02', name: 'Access Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_8G_02_10', code: '8G.02.10', name: 'Wall Access Door', xwalkId: '1064', description: '', children: [] },
      { id: 'wbs_8G_02_20', code: '8G.02.20', name: 'Ceiling Access Door', xwalkId: '1065', description: '', children: [] },
      { id: 'wbs_8G_02_30', code: '8G.02.30', name: 'Floor Access Door', xwalkId: '1066', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9A', code: '9A', name: 'Drywall', xwalkId: '', description: '', children: [
    { id: 'wbs_9A_00', code: '9A.00', name: 'Drywall System', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_00_10', code: '9A.00.10', name: 'Structural Stud Framing - Turnkey', xwalkId: '1067', description: '', children: [] }
    ] },
    { id: 'wbs_9A_01', code: '9A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_01_01', code: '9A.01.01', name: 'Mobilization', xwalkId: '1068', description: '', children: [] },
      { id: 'wbs_9A_01_02', code: '9A.01.02', name: 'Bond/Permit', xwalkId: '1069', description: '', children: [] },
      { id: 'wbs_9A_01_03', code: '9A.01.03', name: 'Submittals', xwalkId: '1070', description: '', children: [] },
      { id: 'wbs_9A_01_04', code: '9A.01.04', name: 'Equip Rentals', xwalkId: '1071', description: '', children: [] },
      { id: 'wbs_9A_01_05', code: '9A.01.05', name: 'Supervision', xwalkId: '1072', description: '', children: [] },
      { id: 'wbs_9A_01_06', code: '9A.01.06', name: 'Demobilization', xwalkId: '1073', description: '', children: [] },
      { id: 'wbs_9A_01_07', code: '9A.01.07', name: 'Close-Out', xwalkId: '1074', description: '', children: [] },
      { id: 'wbs_9A_01_09', code: '9A.01.09', name: 'Cleaning', xwalkId: '1075', description: '', children: [] },
      { id: 'wbs_9A_01_10', code: '9A.01.10', name: 'Mockup', xwalkId: '1076', description: '', children: [] }
    ] },
    { id: 'wbs_9A_03', code: '9A.03', name: 'Exterior Drywall Assemblies', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_03_01', code: '9A.03.01', name: 'Exterior Wall - Gypsum Board Assembly', xwalkId: '1077', description: '', children: [] },
      { id: 'wbs_9A_03_02', code: '9A.03.02', name: 'Exterior Metal Stud Framing - Wall Panel', xwalkId: '1078', description: '', children: [] },
      { id: 'wbs_9A_03_03', code: '9A.03.03', name: 'Exterior Metal Stud Framing - Column Wrap', xwalkId: '1079', description: '', children: [] },
      { id: 'wbs_9A_03_04', code: '9A.03.04', name: 'Exterior Metal Stud Framing - Soffit', xwalkId: '1080', description: '', children: [] }
    ] },
    { id: 'wbs_9A_04', code: '9A.04', name: 'Interior Drywall Assemblies', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_04_01', code: '9A.04.01', name: 'Interior Gypsum Board Partition - to Deck', xwalkId: '1081', description: '', children: [] },
      { id: 'wbs_9A_04_02', code: '9A.04.02', name: 'Interior Gypsum Board Partition - to Ceiling', xwalkId: '1082', description: '', children: [] },
      { id: 'wbs_9A_04_03', code: '9A.04.03', name: 'Gypsum Board Assembly - Chase Wall', xwalkId: '1083', description: '', children: [] },
      { id: 'wbs_9A_04_04', code: '9A.04.04', name: 'Gypsum Board Assembly - Shaft Wall', xwalkId: '1084', description: '', children: [] },
      { id: 'wbs_9A_04_05', code: '9A.04.05', name: 'Interior Gypsum Board - Column Wrap', xwalkId: '1085', description: '', children: [] },
      { id: 'wbs_9A_04_06', code: '9A.04.06', name: 'Interior Gypsum Board - Pony Walls', xwalkId: '1086', description: '', children: [] },
      { id: 'wbs_9A_04_07', code: '9A.04.07', name: 'Install HM Frames in Drywall', xwalkId: '1087', description: '', children: [] },
      { id: 'wbs_9A_04_08', code: '9A.04.08', name: 'Interior Gypsum Board - Millwork Framing', xwalkId: '1088', description: '', children: [] }
    ] },
    { id: 'wbs_9A_05', code: '9A.05', name: 'Interior Gyp Ceilings', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_05_01', code: '9A.05.01', name: 'Gypsum Board Ceiling', xwalkId: '1089', description: '', children: [] },
      { id: 'wbs_9A_05_02', code: '9A.05.02', name: 'Gypsum Board Ceiling Bulkheads', xwalkId: '1090', description: '', children: [] },
      { id: 'wbs_9A_05_03', code: '9A.05.03', name: 'Batt Insulation - Above Ceiling', xwalkId: '1091', description: '', children: [] }
    ] },
    { id: 'wbs_9A_06', code: '9A.06', name: 'Drywall Finish', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_06_01', code: '9A.06.01', name: 'Tape & Float - Walls', xwalkId: '1092', description: '', children: [] },
      { id: 'wbs_9A_06_02', code: '9A.06.02', name: 'Tape & Float - Ceiling/Bulkheads', xwalkId: '1093', description: '', children: [] }
    ] },
    { id: 'wbs_9A_07', code: '9A.07', name: 'Interior Drywall Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_07_01', code: '9A.07.01', name: 'Sound Caulking', xwalkId: '1094', description: '', children: [] },
      { id: 'wbs_9A_07_02', code: '9A.07.02', name: 'Drywall Firestopping', xwalkId: '1095', description: '', children: [] }
    ] },
    { id: 'wbs_9A_08', code: '9A.08', name: 'Drywall Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_9A_08_01', code: '9A.08.01', name: 'GFRG', xwalkId: '1096', description: '', children: [] },
      { id: 'wbs_9A_08_02', code: '9A.08.02', name: 'FRP Panels', xwalkId: '1097', description: '', children: [] },
      { id: 'wbs_9A_08_03', code: '9A.08.03', name: 'Bullet Resistant Panels', xwalkId: '1098', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9B', code: '9B', name: 'Plaster', xwalkId: '', description: '', children: [
    { id: 'wbs_9B_01', code: '9B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9B_01_01', code: '9B.01.01', name: 'Mobilization', xwalkId: '1099', description: '', children: [] },
      { id: 'wbs_9B_01_02', code: '9B.01.02', name: 'Bond/Permit', xwalkId: '1100', description: '', children: [] },
      { id: 'wbs_9B_01_03', code: '9B.01.03', name: 'Submittals', xwalkId: '1101', description: '', children: [] },
      { id: 'wbs_9B_01_04', code: '9B.01.04', name: 'Equip Rentals', xwalkId: '1102', description: '', children: [] },
      { id: 'wbs_9B_01_07', code: '9B.01.07', name: 'Close-Out', xwalkId: '1103', description: '', children: [] },
      { id: 'wbs_9B_01_09', code: '9B.01.09', name: 'Cleaning', xwalkId: '1104', description: '', children: [] },
      { id: 'wbs_9B_01_10', code: '9B.01.10', name: 'Mockup', xwalkId: '1105', description: '', children: [] }
    ] },
    { id: 'wbs_9B_02', code: '9B.02', name: 'Exterior Plaster Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_9B_02_01', code: '9B.02.01', name: 'Exterior Wall - Portland Cement Stucco', xwalkId: '1106', description: '', children: [] },
      { id: 'wbs_9B_02_02', code: '9B.02.02', name: 'Exterior Soffit - Portland Cement Stucco', xwalkId: '1107', description: '', children: [] },
      { id: 'wbs_9B_02_03', code: '9B.02.03', name: 'Exterior Wall - Exterior Insulation & Finish Systems (EIFS)', xwalkId: '1108', description: '', children: [] },
      { id: 'wbs_9B_02_04', code: '9B.02.04', name: 'Exterior Soffit - Exterior Insulation & Finish Systems (EIFS)', xwalkId: '1109', description: '', children: [] },
      { id: 'wbs_9B_02_05', code: '9B.02.05', name: 'Exterior Wall - Direct Applied Exterior Finish System (DEFS)', xwalkId: '1110', description: '', children: [] },
      { id: 'wbs_9B_02_06', code: '9B.02.06', name: 'Exterior Soffit - Direct Applied Exterior Finish System (DEFS)', xwalkId: '1111', description: '', children: [] },
      { id: 'wbs_9B_02_07', code: '9B.02.07', name: 'Plaster Trims & Cornice', xwalkId: '1112', description: '', children: [] }
    ] },
    { id: 'wbs_9B_03', code: '9B.03', name: 'Interior Plaster Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_9B_03_01', code: '9B.03.01', name: 'Interior Wall - Portland Cement Plaster', xwalkId: '1113', description: '', children: [] },
      { id: 'wbs_9B_03_02', code: '9B.03.02', name: 'Interior Ceiling - Portland Cement Plaster', xwalkId: '1114', description: '', children: [] },
      { id: 'wbs_9B_03_03', code: '9B.03.03', name: 'Acoustical Gypsum Plastering', xwalkId: '1115', description: '', children: [] }
    ] },
    { id: 'wbs_9B_04', code: '9B.04', name: 'Plaster Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9B_04_01', code: '9B.04.01', name: 'Drainage Boards - Plaster', xwalkId: '1116', description: '', children: [] },
      { id: 'wbs_9B_04_02', code: '9B.04.02', name: 'Special Finish Coat - Plaster', xwalkId: '1117', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9C', code: '9C', name: 'Acoustical', xwalkId: '', description: '', children: [
    { id: 'wbs_9C_01', code: '9C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_01_01', code: '9C.01.01', name: 'Mobilization', xwalkId: '1118', description: '', children: [] },
      { id: 'wbs_9C_01_02', code: '9C.01.02', name: 'Bond/Permit', xwalkId: '1119', description: '', children: [] },
      { id: 'wbs_9C_01_03', code: '9C.01.03', name: 'Submittals', xwalkId: '1120', description: '', children: [] },
      { id: 'wbs_9C_01_04', code: '9C.01.04', name: 'Equip Rentals', xwalkId: '1121', description: '', children: [] },
      { id: 'wbs_9C_01_05', code: '9C.01.05', name: 'Supervision', xwalkId: '1122', description: '', children: [] },
      { id: 'wbs_9C_01_06', code: '9C.01.06', name: 'Demobilization', xwalkId: '1123', description: '', children: [] },
      { id: 'wbs_9C_01_07', code: '9C.01.07', name: 'Close-Out', xwalkId: '1124', description: '', children: [] },
      { id: 'wbs_9C_01_08', code: '9C.01.08', name: 'Cleaning', xwalkId: '1125', description: '', children: [] },
      { id: 'wbs_9C_01_10', code: '9C.01.10', name: 'Mockup', xwalkId: '1126', description: '', children: [] },
      { id: 'wbs_9C_01_50', code: '9C.01.50', name: 'Temporary Scaffolding & Platforms', xwalkId: '1127', description: '', children: [] }
    ] },
    { id: 'wbs_9C_02', code: '9C.02', name: 'Acoustical Ceiling Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_02_01', code: '9C.02.01', name: 'Acoustical Ceiling Tiles/Panels', xwalkId: '1128', description: '', children: [] },
      { id: 'wbs_9C_02_02', code: '9C.02.02', name: 'Acoustical Ceiling Clouds', xwalkId: '1129', description: '', children: [] },
      { id: 'wbs_9C_02_03', code: '9C.02.03', name: 'Acoustical Baffle Ceiling System', xwalkId: '1130', description: '', children: [] },
      { id: 'wbs_9C_02_04', code: '9C.02.04', name: 'Acoustical Fabric Wrapped Ceilings', xwalkId: '1131', description: '', children: [] },
      { id: 'wbs_9C_02_05', code: '9C.02.05', name: 'Acoustical Wood Ceiling', xwalkId: '1132', description: '', children: [] },
      { id: 'wbs_9C_02_06', code: '9C.02.06', name: 'Acoustical Metal Panel Ceilings', xwalkId: '1133', description: '', children: [] }
    ] },
    { id: 'wbs_9C_03', code: '9C.03', name: 'Specialty Ceilings', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_03_01', code: '9C.03.01', name: 'Open Metal Mesh/Cell Ceilings', xwalkId: '1134', description: '', children: [] },
      { id: 'wbs_9C_03_02', code: '9C.03.02', name: 'Metal Ceiling & Wall Panel System', xwalkId: '1135', description: '', children: [] },
      { id: 'wbs_9C_03_03', code: '9C.03.03', name: 'Linear Metal Ceilings', xwalkId: '1136', description: '', children: [] },
      { id: 'wbs_9C_03_04', code: '9C.03.04', name: 'Tectum Ceiling & Wall Panels', xwalkId: '1137', description: '', children: [] },
      { id: 'wbs_9C_03_05', code: '9C.03.05', name: 'Wood Ceiling & Wall Panel System', xwalkId: '1138', description: '', children: [] },
      { id: 'wbs_9C_03_06', code: '9C.03.06', name: 'Wood Grille/Baffle Ceiling', xwalkId: '1139', description: '', children: [] },
      { id: 'wbs_9C_03_07', code: '9C.03.07', name: 'Suspended Plastic Ceilings', xwalkId: '1140', description: '', children: [] },
      { id: 'wbs_9C_03_08', code: '9C.03.08', name: 'Decorative Panel Ceilings', xwalkId: '1141', description: '', children: [] },
      { id: 'wbs_9C_03_09', code: '9C.03.09', name: 'Fiberglass Reinforced Panel Ceilings', xwalkId: '1142', description: '', children: [] },
      { id: 'wbs_9C_03_10', code: '9C.03.10', name: 'Textured Ceiling System', xwalkId: '1143', description: '', children: [] }
    ] },
    { id: 'wbs_9C_04', code: '9C.04', name: 'Special Function Ceilings', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_04_01', code: '9C.04.01', name: 'Security Ceiling System', xwalkId: '1144', description: '', children: [] },
      { id: 'wbs_9C_04_02', code: '9C.04.02', name: 'Integrated Ceiling System', xwalkId: '1145', description: '', children: [] }
    ] },
    { id: 'wbs_9C_05', code: '9C.05', name: 'Acoustic Room Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_05_01', code: '9C.05.01', name: 'Acoustical Wall Panels', xwalkId: '1146', description: '', children: [] },
      { id: 'wbs_9C_05_02', code: '9C.05.02', name: 'Acoustical Fabric-Wrapped Wall Panels', xwalkId: '1147', description: '', children: [] },
      { id: 'wbs_9C_05_03', code: '9C.05.03', name: 'Acoustical Stretched-Fabric Wall Systems', xwalkId: '1148', description: '', children: [] },
      { id: 'wbs_9C_05_04', code: '9C.05.04', name: 'Acoustical Wall Diffusers', xwalkId: '1149', description: '', children: [] },
      { id: 'wbs_9C_05_05', code: '9C.05.05', name: 'Acoustical Ceiling Diffusers', xwalkId: '1150', description: '', children: [] },
      { id: 'wbs_9C_05_06', code: '9C.05.06', name: 'Fabric-Wrapped Tackable Wall Panels', xwalkId: '1151', description: '', children: [] }
    ] },
    { id: 'wbs_9C_06', code: '9C.06', name: 'Miscellaneous Acoustical Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9C_06_01', code: '9C.06.01', name: 'Acoustical Sealants', xwalkId: '1152', description: '', children: [] },
      { id: 'wbs_9C_06_02', code: '9C.06.02', name: 'Axiom Trims', xwalkId: '1153', description: '', children: [] },
      { id: 'wbs_9C_06_03', code: '9C.06.03', name: 'Light Fixture Support Wires', xwalkId: '1154', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9D', code: '9D', name: 'Interior Wall Panels', xwalkId: '', description: '', children: [
    { id: 'wbs_9D_01', code: '9D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9D_01_01', code: '9D.01.01', name: 'Mobilization', xwalkId: '1155', description: '', children: [] },
      { id: 'wbs_9D_01_02', code: '9D.01.02', name: 'Bond/Permit', xwalkId: '1156', description: '', children: [] },
      { id: 'wbs_9D_01_03', code: '9D.01.03', name: 'Submittals', xwalkId: '1157', description: '', children: [] },
      { id: 'wbs_9D_01_04', code: '9D.01.04', name: 'Equip Rentals', xwalkId: '1158', description: '', children: [] },
      { id: 'wbs_9D_01_07', code: '9D.01.07', name: 'Close-Out', xwalkId: '1159', description: '', children: [] },
      { id: 'wbs_9D_01_10', code: '9D.01.10', name: 'Mockup', xwalkId: '1160', description: '', children: [] }
    ] },
    { id: 'wbs_9D_02', code: '9D.02', name: 'Interior Wood Wall Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_9D_02_10', code: '9D.02.10', name: 'Plastic Laminate Wood Wall Panels', xwalkId: '1161', description: '', children: [] },
      { id: 'wbs_9D_02_20', code: '9D.02.20', name: 'Decorative Laminate Wood Wall Panels', xwalkId: '1162', description: '', children: [] },
      { id: 'wbs_9D_02_30', code: '9D.02.30', name: 'Wood Veneer Wall Panels', xwalkId: '1163', description: '', children: [] }
    ] },
    { id: 'wbs_9D_03', code: '9D.03', name: 'Interior Metal Wall Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_9D_03_10', code: '9D.03.10', name: 'Metal Laminate Wall Panels', xwalkId: '1164', description: '', children: [] },
      { id: 'wbs_9D_03_20', code: '9D.03.20', name: 'Interior Metal Wall Panels', xwalkId: '1165', description: '', children: [] }
    ] },
    { id: 'wbs_9D_04', code: '9D.04', name: 'Interior Glass Wall Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_9D_04_10', code: '9D.04.10', name: 'Decorative Glass Wall Panels', xwalkId: '1166', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9E', code: '9E', name: 'Tile', xwalkId: '', description: '', children: [
    { id: 'wbs_9E_01', code: '9E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_01_01', code: '9E.01.01', name: 'Mobilization', xwalkId: '1167', description: '', children: [] },
      { id: 'wbs_9E_01_02', code: '9E.01.02', name: 'Bond/Permit', xwalkId: '1168', description: '', children: [] },
      { id: 'wbs_9E_01_03', code: '9E.01.03', name: 'Submittals', xwalkId: '1169', description: '', children: [] },
      { id: 'wbs_9E_01_04', code: '9E.01.04', name: 'Equip Rentals', xwalkId: '1170', description: '', children: [] },
      { id: 'wbs_9E_01_05', code: '9E.01.05', name: 'Supervision', xwalkId: '1171', description: '', children: [] },
      { id: 'wbs_9E_01_06', code: '9E.01.06', name: 'Demobilization', xwalkId: '1172', description: '', children: [] },
      { id: 'wbs_9E_01_07', code: '9E.01.07', name: 'Close-Out', xwalkId: '1173', description: '', children: [] },
      { id: 'wbs_9E_01_09', code: '9E.01.09', name: 'Cleaning', xwalkId: '1174', description: '', children: [] },
      { id: 'wbs_9E_01_10', code: '9E.01.10', name: 'Mockup', xwalkId: '1175', description: '', children: [] }
    ] },
    { id: 'wbs_9E_02', code: '9E.02', name: 'Floor Finish', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_02_01', code: '9E.02.01', name: 'Floor - Porcelain Tile', xwalkId: '1176', description: '', children: [] },
      { id: 'wbs_9E_02_02', code: '9E.02.02', name: 'Floor - Ceramic Tile', xwalkId: '1177', description: '', children: [] },
      { id: 'wbs_9E_02_03', code: '9E.02.03', name: 'Floor - Quarry Tile', xwalkId: '1178', description: '', children: [] },
      { id: 'wbs_9E_02_04', code: '9E.02.04', name: 'Floor - Stone Tile', xwalkId: '1179', description: '', children: [] },
      { id: 'wbs_9E_02_05', code: '9E.02.05', name: 'Floor - Glass Mosaic Tile', xwalkId: '1180', description: '', children: [] },
      { id: 'wbs_9E_02_06', code: '9E.02.06', name: 'Stair - Tile', xwalkId: '1181', description: '', children: [] },
      { id: 'wbs_9E_02_07', code: '9E.02.07', name: 'Freezer/Cooler - Tile', xwalkId: '1182', description: '', children: [] }
    ] },
    { id: 'wbs_9E_03', code: '9E.03', name: 'Floor Base', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_03_01', code: '9E.03.01', name: 'Base - Porcelain Tile', xwalkId: '1183', description: '', children: [] },
      { id: 'wbs_9E_03_02', code: '9E.03.02', name: 'Base - Ceramic Tile', xwalkId: '1184', description: '', children: [] },
      { id: 'wbs_9E_03_03', code: '9E.03.03', name: 'Base - Quarry Tile', xwalkId: '1185', description: '', children: [] },
      { id: 'wbs_9E_03_04', code: '9E.03.04', name: 'Base - Stone Tile', xwalkId: '1186', description: '', children: [] },
      { id: 'wbs_9E_03_05', code: '9E.03.05', name: 'Base - Stainless Steel Base', xwalkId: '1187', description: '', children: [] }
    ] },
    { id: 'wbs_9E_04', code: '9E.04', name: 'Wall Finish', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_04_01', code: '9E.04.01', name: 'Wall - Porcelain Tile', xwalkId: '1188', description: '', children: [] },
      { id: 'wbs_9E_04_02', code: '9E.04.02', name: 'Wall - Ceramic Tile', xwalkId: '1189', description: '', children: [] },
      { id: 'wbs_9E_04_03', code: '9E.04.03', name: 'Wall - Quarry Tile', xwalkId: '1190', description: '', children: [] },
      { id: 'wbs_9E_04_04', code: '9E.04.04', name: 'Wall - Stone Tile', xwalkId: '1191', description: '', children: [] },
      { id: 'wbs_9E_04_05', code: '9E.04.05', name: 'Wall - Glass Mosaic Tile', xwalkId: '1192', description: '', children: [] }
    ] },
    { id: 'wbs_9E_05', code: '9E.05', name: 'Exterior Tile', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_05_01', code: '9E.05.01', name: 'Exterior Wall Tiles', xwalkId: '1193', description: '', children: [] }
    ] },
    { id: 'wbs_9E_06', code: '9E.06', name: 'Tiling Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_06_01', code: '9E.06.01', name: 'Shower Pans', xwalkId: '1194', description: '', children: [] },
      { id: 'wbs_9E_06_02', code: '9E.06.02', name: 'Wall Trims (Schluter)', xwalkId: '1195', description: '', children: [] },
      { id: 'wbs_9E_06_03', code: '9E.06.03', name: 'Floor Transitions - Tile', xwalkId: '1196', description: '', children: [] },
      { id: 'wbs_9E_06_04', code: '9E.06.04', name: 'Marble Threshold', xwalkId: '1197', description: '', children: [] }
    ] },
    { id: 'wbs_9E_07', code: '9E.07', name: 'Tiling Supplementary Work', xwalkId: '', description: '', children: [
      { id: 'wbs_9E_07_01', code: '9E.07.01', name: 'Floor Preparations - Tile', xwalkId: '1198', description: '', children: [] },
      { id: 'wbs_9E_07_02', code: '9E.07.02', name: 'Crack Isolation Membrane - Tile', xwalkId: '1199', description: '', children: [] },
      { id: 'wbs_9E_07_03', code: '9E.07.03', name: 'Tile Waterproofing', xwalkId: '1200', description: '', children: [] },
      { id: 'wbs_9E_07_04', code: '9E.07.04', name: 'Tile Epoxy Grout', xwalkId: '1201', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9F', code: '9F', name: 'Resilient Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9F_01', code: '9F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9F_01_01', code: '9F.01.01', name: 'Mobilization', xwalkId: '1202', description: '', children: [] },
      { id: 'wbs_9F_01_02', code: '9F.01.02', name: 'Bond/Permit', xwalkId: '1203', description: '', children: [] },
      { id: 'wbs_9F_01_03', code: '9F.01.03', name: 'Submittals', xwalkId: '1204', description: '', children: [] },
      { id: 'wbs_9F_01_04', code: '9F.01.04', name: 'Equip Rentals', xwalkId: '1205', description: '', children: [] },
      { id: 'wbs_9F_01_05', code: '9F.01.05', name: 'Supervision', xwalkId: '1206', description: '', children: [] },
      { id: 'wbs_9F_01_06', code: '9F.01.06', name: 'Demobilization', xwalkId: '1207', description: '', children: [] },
      { id: 'wbs_9F_01_07', code: '9F.01.07', name: 'Close-Out', xwalkId: '1208', description: '', children: [] },
      { id: 'wbs_9F_01_09', code: '9F.01.09', name: 'Cleaning', xwalkId: '1209', description: '', children: [] },
      { id: 'wbs_9F_01_10', code: '9F.01.10', name: 'Mockup', xwalkId: '1210', description: '', children: [] },
      { id: 'wbs_9F_01_13', code: '9F.01.13', name: 'Testing', xwalkId: '1211', description: '', children: [] }
    ] },
    { id: 'wbs_9F_02', code: '9F.02', name: 'Resilient Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9F_02_01', code: '9F.02.01', name: 'Vinyl Composition Tile (VCT)', xwalkId: '1212', description: '', children: [] },
      { id: 'wbs_9F_02_02', code: '9F.02.02', name: 'Luxury Vinyl Tiles (LVT)', xwalkId: '1213', description: '', children: [] },
      { id: 'wbs_9F_02_03', code: '9F.02.03', name: 'Rubber Tiles', xwalkId: '1214', description: '', children: [] },
      { id: 'wbs_9F_02_04', code: '9F.02.04', name: 'Vinyl Sheet Flooring', xwalkId: '1215', description: '', children: [] },
      { id: 'wbs_9F_02_05', code: '9F.02.05', name: 'Rubber Sheet Flooring', xwalkId: '1216', description: '', children: [] },
      { id: 'wbs_9F_02_06', code: '9F.02.06', name: 'Static-Control Resilient Flooring', xwalkId: '1217', description: '', children: [] },
      { id: 'wbs_9F_02_07', code: '9F.02.07', name: 'Linoleum Flooring', xwalkId: '1218', description: '', children: [] },
      { id: 'wbs_9F_02_08', code: '9F.02.08', name: 'Stair - Resilient Flooring', xwalkId: '1219', description: '', children: [] }
    ] },
    { id: 'wbs_9F_03', code: '9F.03', name: 'Carpet Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9F_03_01', code: '9F.03.01', name: 'Tile Carpeting', xwalkId: '1220', description: '', children: [] },
      { id: 'wbs_9F_03_02', code: '9F.03.02', name: 'Sheet Carpeting', xwalkId: '1221', description: '', children: [] },
      { id: 'wbs_9F_03_03', code: '9F.03.03', name: 'Walk-off Carpet', xwalkId: '1222', description: '', children: [] }
    ] },
    { id: 'wbs_9F_04', code: '9F.04', name: 'Resilient Base & Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9F_04_01', code: '9F.04.01', name: 'Rubber Bases', xwalkId: '1223', description: '', children: [] },
      { id: 'wbs_9F_04_02', code: '9F.04.02', name: 'Metal Bases', xwalkId: '1224', description: '', children: [] },
      { id: 'wbs_9F_04_03', code: '9F.04.03', name: 'Floor Transitions - Resilient Floor & Carpet', xwalkId: '1225', description: '', children: [] }
    ] },
    { id: 'wbs_9F_05', code: '9F.05', name: 'Resilient Supplementary Work', xwalkId: '', description: '', children: [
      { id: 'wbs_9F_05_01', code: '9F.05.01', name: 'Floor Polish - Resilient Floor', xwalkId: '1226', description: '', children: [] },
      { id: 'wbs_9F_05_02', code: '9F.05.02', name: 'Floor Preparations - Resilient Floor & Carpet', xwalkId: '1227', description: '', children: [] },
      { id: 'wbs_9F_05_03', code: '9F.05.03', name: 'Moisture Mitigation - Resilient Floor & Carpet', xwalkId: '1228', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9G', code: '9G', name: 'Wood Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9G_01', code: '9G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9G_01_01', code: '9G.01.01', name: 'Mobilization', xwalkId: '1229', description: '', children: [] },
      { id: 'wbs_9G_01_02', code: '9G.01.02', name: 'Bond/Permit', xwalkId: '1230', description: '', children: [] },
      { id: 'wbs_9G_01_03', code: '9G.01.03', name: 'Submittals', xwalkId: '1231', description: '', children: [] },
      { id: 'wbs_9G_01_05', code: '9G.01.05', name: 'Supervision', xwalkId: '1232', description: '', children: [] },
      { id: 'wbs_9G_01_07', code: '9G.01.07', name: 'Close-Out', xwalkId: '1233', description: '', children: [] },
      { id: 'wbs_9G_01_09', code: '9G.01.09', name: 'Cleaning', xwalkId: '1234', description: '', children: [] }
    ] },
    { id: 'wbs_9G_02', code: '9G.02', name: 'Interior Wooden Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9G_02_01', code: '9G.02.01', name: 'Non-Athletic Wood Flooring', xwalkId: '1235', description: '', children: [] },
      { id: 'wbs_9G_02_02', code: '9G.02.02', name: 'Wood Stage Flooring', xwalkId: '1236', description: '', children: [] },
      { id: 'wbs_9G_02_03', code: '9G.02.03', name: 'Wood Stair Flooring', xwalkId: '1237', description: '', children: [] },
      { id: 'wbs_9G_02_04', code: '9G.02.04', name: 'Wood Flooring - Seating/Learning Stairs', xwalkId: '1238', description: '', children: [] }
    ] },
    { id: 'wbs_9G_03', code: '9G.03', name: 'Exterior Wooden Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9G_03_01', code: '9G.03.01', name: 'Exterior Wood Deck', xwalkId: '1239', description: '', children: [] },
      { id: 'wbs_9G_03_02', code: '9G.03.02', name: 'Exterior Wood Patio', xwalkId: '1240', description: '', children: [] }
    ] },
    { id: 'wbs_9G_04', code: '9G.04', name: 'Wooden Flooring Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9G_04_01', code: '9G.04.01', name: 'Wood Floor Base', xwalkId: '1241', description: '', children: [] },
      { id: 'wbs_9G_04_02', code: '9G.04.02', name: 'Wood Floor Transition Strips', xwalkId: '1242', description: '', children: [] }
    ] },
    { id: 'wbs_9G_05', code: '9G.05', name: 'Wood Flooring Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9G_05_01', code: '9G.05.01', name: 'Floor Preparation - Wood Flooring', xwalkId: '1243', description: '', children: [] },
      { id: 'wbs_9G_05_02', code: '9G.05.02', name: 'Subfloor System - Wood Flooring', xwalkId: '1244', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9H', code: '9H', name: 'Athletic Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9H_01', code: '9H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9H_01_01', code: '9H.01.01', name: 'Mobilization', xwalkId: '1245', description: '', children: [] },
      { id: 'wbs_9H_01_02', code: '9H.01.02', name: 'Bond/Permit', xwalkId: '1246', description: '', children: [] },
      { id: 'wbs_9H_01_03', code: '9H.01.03', name: 'Submittals', xwalkId: '1247', description: '', children: [] },
      { id: 'wbs_9H_01_04', code: '9H.01.04', name: 'Equip Rentals', xwalkId: '1248', description: '', children: [] },
      { id: 'wbs_9H_01_07', code: '9H.01.07', name: 'Close-Out', xwalkId: '1249', description: '', children: [] },
      { id: 'wbs_9H_01_09', code: '9H.01.09', name: 'Cleaning', xwalkId: '1250', description: '', children: [] },
      { id: 'wbs_9H_01_10', code: '9H.01.10', name: 'Mockup', xwalkId: '1251', description: '', children: [] },
      { id: 'wbs_9H_01_13', code: '9H.01.13', name: 'Testing', xwalkId: '1252', description: '', children: [] }
    ] },
    { id: 'wbs_9H_02', code: '9H.02', name: 'Athletic Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9H_02_10', code: '9H.02.10', name: 'Athletic Rubber Tile Flooring', xwalkId: '1253', description: '', children: [] },
      { id: 'wbs_9H_02_20', code: '9H.02.20', name: 'Athletic Rubber Sheet Flooring', xwalkId: '1254', description: '', children: [] },
      { id: 'wbs_9H_02_30', code: '9H.02.30', name: 'Athletic Wood Flooring', xwalkId: '1255', description: '', children: [] },
      { id: 'wbs_9H_02_40', code: '9H.02.40', name: 'Fluid-Applied Athletic Flooring', xwalkId: '1256', description: '', children: [] },
      { id: 'wbs_9H_02_50', code: '9H.02.50', name: 'Portable Athletic Flooring', xwalkId: '1257', description: '', children: [] }
    ] },
    { id: 'wbs_9H_03', code: '9H.03', name: 'Athletic Flooring Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9H_03_10', code: '9H.03.10', name: 'Rubber Base - Athletic Flooring', xwalkId: '1258', description: '', children: [] },
      { id: 'wbs_9H_03_20', code: '9H.03.20', name: 'Wood Base - Athletic Flooring', xwalkId: '1259', description: '', children: [] },
      { id: 'wbs_9H_03_30', code: '9H.03.30', name: 'Transitions & Thresholds - Athletic Flooring', xwalkId: '1260', description: '', children: [] },
      { id: 'wbs_9H_03_40', code: '9H.03.40', name: 'Paint/Markings/Striping/Logos/Graphics - Athletic Flooring', xwalkId: '1261', description: '', children: [] }
    ] },
    { id: 'wbs_9H_04', code: '9H.04', name: 'Wood Flooring Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9H_04_10', code: '9H.04.10', name: 'Floor Preparation - Athletic Flooring', xwalkId: '1262', description: '', children: [] },
      { id: 'wbs_9H_04_20', code: '9H.04.20', name: 'Subfloor System - Athletic Flooring', xwalkId: '1263', description: '', children: [] },
      { id: 'wbs_9H_04_30', code: '9H.04.30', name: 'Sanding & Finish Coating - Athletic Flooring', xwalkId: '1264', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9I', code: '9I', name: 'Terrazzo Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9I_01', code: '9I.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_01_01', code: '9I.01.01', name: 'Mobilization', xwalkId: '1265', description: '', children: [] },
      { id: 'wbs_9I_01_02', code: '9I.01.02', name: 'Bond/Permit', xwalkId: '1266', description: '', children: [] },
      { id: 'wbs_9I_01_03', code: '9I.01.03', name: 'Submittals', xwalkId: '1267', description: '', children: [] },
      { id: 'wbs_9I_01_06', code: '9I.01.06', name: 'Demobilization', xwalkId: '1268', description: '', children: [] },
      { id: 'wbs_9I_01_07', code: '9I.01.07', name: 'Close-Out', xwalkId: '1269', description: '', children: [] },
      { id: 'wbs_9I_01_09', code: '9I.01.09', name: 'Cleaning', xwalkId: '1270', description: '', children: [] },
      { id: 'wbs_9I_01_10', code: '9I.01.10', name: 'Mockup', xwalkId: '1271', description: '', children: [] }
    ] },
    { id: 'wbs_9I_02', code: '9I.02', name: 'Cast in Place Terrazzo', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_02_01', code: '9I.02.01', name: 'Portland Cement Terrazzo Flooring', xwalkId: '1272', description: '', children: [] },
      { id: 'wbs_9I_02_02', code: '9I.02.02', name: 'Resinous Matrix Terrazzo Flooring', xwalkId: '1273', description: '', children: [] },
      { id: 'wbs_9I_02_03', code: '9I.02.03', name: 'Terrazzo Logos', xwalkId: '1274', description: '', children: [] }
    ] },
    { id: 'wbs_9I_03', code: '9I.03', name: 'Precast Terrazzo', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_03_01', code: '9I.03.01', name: 'Precast Terrazzo Floors', xwalkId: '1275', description: '', children: [] },
      { id: 'wbs_9I_03_02', code: '9I.03.02', name: 'Precast Terrazzo Wall Units', xwalkId: '1276', description: '', children: [] },
      { id: 'wbs_9I_03_03', code: '9I.03.03', name: 'Precast Terrazzo - Base', xwalkId: '1277', description: '', children: [] },
      { id: 'wbs_9I_03_04', code: '9I.03.04', name: 'Precast Terrazzo Stair Treads & Risers', xwalkId: '1278', description: '', children: [] }
    ] },
    { id: 'wbs_9I_04', code: '9I.04', name: 'Exterior Terrazzo', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_04_01', code: '9I.04.01', name: 'Outdoor Terrazzo Floors', xwalkId: '1279', description: '', children: [] }
    ] },
    { id: 'wbs_9I_05', code: '9I.05', name: 'Terrazzo Floor Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_05_01', code: '9I.05.01', name: 'Floor Transitions - Terrazzo Flooring', xwalkId: '1280', description: '', children: [] },
      { id: 'wbs_9I_05_02', code: '9I.05.02', name: 'Joint Strips - Terrazzo Flooring', xwalkId: '1281', description: '', children: [] }
    ] },
    { id: 'wbs_9I_06', code: '9I.06', name: 'Terrazzo Floor Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9I_06_01', code: '9I.06.01', name: 'Polishing & Sealing - Terrazzo Flooring', xwalkId: '1282', description: '', children: [] },
      { id: 'wbs_9I_06_02', code: '9I.06.02', name: 'Crack Isolation Membrane - Terrazzo Flooring', xwalkId: '1283', description: '', children: [] },
      { id: 'wbs_9I_06_03', code: '9I.06.03', name: 'Moisture Mitigation - Terrazzo Flooring', xwalkId: '1284', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9J', code: '9J', name: 'Fluid-Applied Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9J_01', code: '9J.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9J_01_01', code: '9J.01.01', name: 'Mobilization', xwalkId: '1285', description: '', children: [] },
      { id: 'wbs_9J_01_02', code: '9J.01.02', name: 'Bond/Permit', xwalkId: '1286', description: '', children: [] },
      { id: 'wbs_9J_01_03', code: '9J.01.03', name: 'Submittals', xwalkId: '1287', description: '', children: [] },
      { id: 'wbs_9J_01_07', code: '9J.01.07', name: 'Close-Out', xwalkId: '1288', description: '', children: [] },
      { id: 'wbs_9J_01_09', code: '9J.01.09', name: 'Cleaning', xwalkId: '1289', description: '', children: [] },
      { id: 'wbs_9J_01_10', code: '9J.01.10', name: 'Mockup', xwalkId: '1290', description: '', children: [] },
      { id: 'wbs_9J_01_13', code: '9J.01.13', name: 'Testing', xwalkId: '1291', description: '', children: [] }
    ] },
    { id: 'wbs_9J_02', code: '9J.02', name: 'Resinous Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9J_02_01', code: '9J.02.01', name: 'Resinous Floor', xwalkId: '1292', description: '', children: [] },
      { id: 'wbs_9J_02_02', code: '9J.02.02', name: 'Resinous Base', xwalkId: '1293', description: '', children: [] },
      { id: 'wbs_9J_02_03', code: '9J.02.03', name: 'Joint Sealants - Resinous Floor', xwalkId: '1294', description: '', children: [] }
    ] },
    { id: 'wbs_9J_03', code: '9J.03', name: 'Other Fluid-Applied Flooring', xwalkId: '', description: '', children: [
      { id: 'wbs_9J_03_01', code: '9J.03.01', name: 'Elastomeric Liquid Flooring', xwalkId: '1295', description: '', children: [] },
      { id: 'wbs_9J_03_02', code: '9J.03.02', name: 'Epoxy-Marble Chip Flooring', xwalkId: '1296', description: '', children: [] },
      { id: 'wbs_9J_03_03', code: '9J.03.03', name: 'Magnesium-Oxychloride Flooring', xwalkId: '1297', description: '', children: [] },
      { id: 'wbs_9J_03_04', code: '9J.03.04', name: 'Quartz Flooring', xwalkId: '1298', description: '', children: [] }
    ] },
    { id: 'wbs_9J_04', code: '9J.04', name: 'Fluid-Applied Flooring Supplementary Work', xwalkId: '', description: '', children: [
      { id: 'wbs_9J_04_01', code: '9J.04.01', name: 'Floor Preparations - Fluid-Applied Flooring', xwalkId: '1299', description: '', children: [] },
      { id: 'wbs_9J_04_02', code: '9J.04.02', name: 'Crack Isolation Membrane - Fluid-Applied Flooring', xwalkId: '1300', description: '', children: [] },
      { id: 'wbs_9J_04_03', code: '9J.04.03', name: 'Moisture Mitigation - Fluid-Applied Flooring', xwalkId: '1301', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9K', code: '9K', name: 'Concrete Floor Finishes', xwalkId: '', description: '', children: [
    { id: 'wbs_9K_01', code: '9K.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9K_01_01', code: '9K.01.01', name: 'Mobilization', xwalkId: '1302', description: '', children: [] },
      { id: 'wbs_9K_01_02', code: '9K.01.02', name: 'Bond/Permit', xwalkId: '1303', description: '', children: [] },
      { id: 'wbs_9K_01_03', code: '9K.01.03', name: 'Submittals', xwalkId: '1304', description: '', children: [] },
      { id: 'wbs_9K_01_04', code: '9K.01.04', name: 'Equip Rentals', xwalkId: '1305', description: '', children: [] },
      { id: 'wbs_9K_01_07', code: '9K.01.07', name: 'Close-Out', xwalkId: '1306', description: '', children: [] },
      { id: 'wbs_9K_01_09', code: '9K.01.09', name: 'Cleaning', xwalkId: '1307', description: '', children: [] },
      { id: 'wbs_9K_01_10', code: '9K.01.10', name: 'Mockup', xwalkId: '1308', description: '', children: [] }
    ] },
    { id: 'wbs_9K_02', code: '9K.02', name: 'Interior Concrete Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_9K_02_10', code: '9K.02.10', name: 'Polished Concrete Floor', xwalkId: '1309', description: '', children: [] },
      { id: 'wbs_9K_02_20', code: '9K.02.20', name: 'Sealed Concrete Floor', xwalkId: '1310', description: '', children: [] },
      { id: 'wbs_9K_02_30', code: '9K.02.30', name: 'Stained Concrete Floor', xwalkId: '1311', description: '', children: [] }
    ] },
    { id: 'wbs_9K_03', code: '9K.03', name: 'Concrete Floor Finish Supplementary Work', xwalkId: '', description: '', children: [
      { id: 'wbs_9K_03_10', code: '9K.03.10', name: 'Floor Preparations - Concrete Floor Finishes', xwalkId: '1312', description: '', children: [] },
      { id: 'wbs_9K_03_20', code: '9K.03.20', name: 'Joint Filler - Concrete Floor Finishes', xwalkId: '1313', description: '', children: [] },
      { id: 'wbs_9K_03_30', code: '9K.03.30', name: 'Floor Protection - Concrete Floor Finishes', xwalkId: '1314', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9L', code: '9L', name: 'Painting', xwalkId: '', description: '', children: [
    { id: 'wbs_9L_00', code: '9L.00', name: 'Paint', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_00_00', code: '9L.00.00', name: 'Painting - Turnkey', xwalkId: '1315', description: '', children: [] }
    ] },
    { id: 'wbs_9L_01', code: '9L.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_01_01', code: '9L.01.01', name: 'Mobilization', xwalkId: '1316', description: '', children: [] },
      { id: 'wbs_9L_01_02', code: '9L.01.02', name: 'Bond/Permit', xwalkId: '1317', description: '', children: [] },
      { id: 'wbs_9L_01_03', code: '9L.01.03', name: 'Submittals', xwalkId: '1318', description: '', children: [] },
      { id: 'wbs_9L_01_04', code: '9L.01.04', name: 'Equip Rentals', xwalkId: '1319', description: '', children: [] },
      { id: 'wbs_9L_01_05', code: '9L.01.05', name: 'Supervision', xwalkId: '1320', description: '', children: [] },
      { id: 'wbs_9L_01_06', code: '9L.01.06', name: 'Demobilization', xwalkId: '1321', description: '', children: [] },
      { id: 'wbs_9L_01_07', code: '9L.01.07', name: 'Close-Out', xwalkId: '1322', description: '', children: [] },
      { id: 'wbs_9L_01_09', code: '9L.01.09', name: 'Cleaning', xwalkId: '1323', description: '', children: [] },
      { id: 'wbs_9L_01_10', code: '9L.01.10', name: 'Mockup', xwalkId: '1324', description: '', children: [] }
    ] },
    { id: 'wbs_9L_02', code: '9L.02', name: 'Building - Exterior Painting', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_02_01', code: '9L.02.01', name: 'Paint - Exterior Masonry', xwalkId: '1325', description: '', children: [] },
      { id: 'wbs_9L_02_02', code: '9L.02.02', name: 'Paint - Exterior Concrete', xwalkId: '1326', description: '', children: [] },
      { id: 'wbs_9L_02_03', code: '9L.02.03', name: 'Paint - Exterior Plaster', xwalkId: '1327', description: '', children: [] },
      { id: 'wbs_9L_02_04', code: '9L.02.04', name: 'Paint - Exterior FC Siding & Panels', xwalkId: '1328', description: '', children: [] },
      { id: 'wbs_9L_02_05', code: '9L.02.05', name: 'Paint - Exterior Wood Siding & Panels', xwalkId: '1329', description: '', children: [] },
      { id: 'wbs_9L_02_06', code: '9L.02.06', name: 'Paint - Exterior HM Doors & Frames', xwalkId: '1330', description: '', children: [] },
      { id: 'wbs_9L_02_07', code: '9L.02.07', name: 'Paint - Exterior Wood Doors & Frames', xwalkId: '1331', description: '', children: [] },
      { id: 'wbs_9L_02_08', code: '9L.02.08', name: 'Paint - Exterior Overhead Doors', xwalkId: '1332', description: '', children: [] },
      { id: 'wbs_9L_02_09', code: '9L.02.09', name: 'Paint - Exterior Misc Metal', xwalkId: '1333', description: '', children: [] },
      { id: 'wbs_9L_02_10', code: '9L.02.10', name: 'Paint - Exterior Exposed Piping', xwalkId: '1334', description: '', children: [] }
    ] },
    { id: 'wbs_9L_03', code: '9L.03', name: 'Building - Interior Painting', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_03_00', code: '9L.03.00', name: 'Paint - Interior', xwalkId: '1335', description: '', children: [] },
      { id: 'wbs_9L_03_01', code: '9L.03.01', name: 'Paint - Interior Masonry', xwalkId: '1336', description: '', children: [] },
      { id: 'wbs_9L_03_02', code: '9L.03.02', name: 'Paint - Interior Drywall', xwalkId: '1337', description: '', children: [] },
      { id: 'wbs_9L_03_03', code: '9L.03.03', name: 'Paint - Interior Concrete', xwalkId: '1338', description: '', children: [] },
      { id: 'wbs_9L_03_04', code: '9L.03.04', name: 'Paint - Interior Gypsum Ceiling', xwalkId: '1339', description: '', children: [] },
      { id: 'wbs_9L_03_05', code: '9L.03.05', name: 'Paint - Interior Plaster', xwalkId: '1340', description: '', children: [] },
      { id: 'wbs_9L_03_06', code: '9L.03.06', name: 'Paint - Interior Exposed Ceiling', xwalkId: '1341', description: '', children: [] },
      { id: 'wbs_9L_03_07', code: '9L.03.07', name: 'Paint - Interior Wood', xwalkId: '1342', description: '', children: [] },
      { id: 'wbs_9L_03_08', code: '9L.03.08', name: 'Paint - Interior HM Doors & Frames', xwalkId: '1343', description: '', children: [] },
      { id: 'wbs_9L_03_09', code: '9L.03.09', name: 'Paint - Interior Wood Doors & Frames', xwalkId: '1344', description: '', children: [] },
      { id: 'wbs_9L_03_10', code: '9L.03.10', name: 'Paint - Interior Overhead Doors', xwalkId: '1345', description: '', children: [] },
      { id: 'wbs_9L_03_11', code: '9L.03.11', name: 'Paint - Interior Guardrails & Handrails', xwalkId: '1346', description: '', children: [] },
      { id: 'wbs_9L_03_12', code: '9L.03.12', name: 'Paint - Interior Metal Stairs', xwalkId: '1347', description: '', children: [] },
      { id: 'wbs_9L_03_13', code: '9L.03.13', name: 'Paint - Interior Exposed Metals', xwalkId: '1348', description: '', children: [] },
      { id: 'wbs_9L_03_14', code: '9L.03.14', name: 'Paint - Interior Exposed Piping', xwalkId: '1349', description: '', children: [] },
      { id: 'wbs_9L_03_15', code: '9L.03.15', name: 'Paint - Interior Painted Graphics & Signage', xwalkId: '1350', description: '', children: [] },
      { id: 'wbs_9L_03_16', code: '9L.03.16', name: 'Epoxy Paint', xwalkId: '1351', description: '', children: [] },
      { id: 'wbs_9L_03_17', code: '9L.03.17', name: 'Interior Level 5 Finish', xwalkId: '1352', description: '', children: [] },
      { id: 'wbs_9L_03_18', code: '9L.03.18', name: 'Blockfiller/Backroll Masonry', xwalkId: '1353', description: '', children: [] }
    ] },
    { id: 'wbs_9L_04', code: '9L.04', name: 'Site Painting', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_04_01', code: '9L.04.01', name: 'Paint - Site Exposed Concrete', xwalkId: '1354', description: '', children: [] },
      { id: 'wbs_9L_04_02', code: '9L.04.02', name: 'Paint - Site Masonry', xwalkId: '1355', description: '', children: [] },
      { id: 'wbs_9L_04_03', code: '9L.04.03', name: 'Paint - Site Metals', xwalkId: '1356', description: '', children: [] },
      { id: 'wbs_9L_04_04', code: '9L.04.04', name: 'Paint - Site Canopies', xwalkId: '1357', description: '', children: [] }
    ] },
    { id: 'wbs_9L_05', code: '9L.05', name: 'High-Performance Coatings', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_05_01', code: '9L.05.01', name: 'Abrasion-Resistant Coatings', xwalkId: '1358', description: '', children: [] },
      { id: 'wbs_9L_05_02', code: '9L.05.02', name: 'Graffiti-Resistant Coatings', xwalkId: '1359', description: '', children: [] },
      { id: 'wbs_9L_05_03', code: '9L.05.03', name: 'Elastomeric Coatings', xwalkId: '1360', description: '', children: [] }
    ] },
    { id: 'wbs_9L_06', code: '9L.06', name: 'Special Coatings', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_06_01', code: '9L.06.01', name: 'Special Concrete Coatings', xwalkId: '1361', description: '', children: [] },
      { id: 'wbs_9L_06_02', code: '9L.06.02', name: 'Special Steel Coatings', xwalkId: '1362', description: '', children: [] },
      { id: 'wbs_9L_06_03', code: '9L.06.03', name: 'Dry Erase Coatings', xwalkId: '1363', description: '', children: [] }
    ] },
    { id: 'wbs_9L_07', code: '9L.07', name: 'Wall Coverings', xwalkId: '', description: '', children: [
      { id: 'wbs_9L_07_01', code: '9L.07.01', name: 'Vinyl Wall Coverings', xwalkId: '1364', description: '', children: [] },
      { id: 'wbs_9L_07_02', code: '9L.07.02', name: 'Digital Wall Coverings', xwalkId: '1365', description: '', children: [] },
      { id: 'wbs_9L_07_03', code: '9L.07.03', name: 'Dry Erase Wall Coverings', xwalkId: '1366', description: '', children: [] },
      { id: 'wbs_9L_07_04', code: '9L.07.04', name: 'Writable Wall Coverings', xwalkId: '1367', description: '', children: [] },
      { id: 'wbs_9L_07_05', code: '9L.07.05', name: 'Tackable Wall Coverings', xwalkId: '1368', description: '', children: [] },
      { id: 'wbs_9L_07_06', code: '9L.07.06', name: 'Acoustic Wall Coverings', xwalkId: '1369', description: '', children: [] },
      { id: 'wbs_9L_07_07', code: '9L.07.07', name: 'Wood Veneer Wall Coverings', xwalkId: '1370', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_9M', code: '9M', name: 'Access Flooring', xwalkId: '', description: '', children: [
    { id: 'wbs_9M_00', code: '9M.00', name: 'Access Flooring System', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_00_01', code: '9M.00.01', name: 'Access Flooring (Turnkey)', xwalkId: '3617', description: '', children: [] }
    ] },
    { id: 'wbs_9M_01', code: '9M.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_01_01', code: '9M.01.01', name: 'Mobilization', xwalkId: '3618', description: '', children: [] },
      { id: 'wbs_9M_01_02', code: '9M.01.02', name: 'Bond/Permit', xwalkId: '3619', description: '', children: [] },
      { id: 'wbs_9M_01_03', code: '9M.01.03', name: 'Submittals', xwalkId: '3620', description: '', children: [] },
      { id: 'wbs_9M_01_04', code: '9M.01.04', name: 'Equip Rentals', xwalkId: '3621', description: '', children: [] },
      { id: 'wbs_9M_01_05', code: '9M.01.05', name: 'Supervision', xwalkId: '3622', description: '', children: [] },
      { id: 'wbs_9M_01_09', code: '9M.01.09', name: 'Cleaning', xwalkId: '3623', description: '', children: [] },
      { id: 'wbs_9M_01_10', code: '9M.01.10', name: 'Mockup', xwalkId: '3624', description: '', children: [] },
      { id: 'wbs_9M_01_13', code: '9M.01.13', name: 'Testing', xwalkId: '3625', description: '', children: [] }
    ] },
    { id: 'wbs_9M_02', code: '9M.02', name: 'Access Flooring Understructures', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_02_10', code: '9M.02.10', name: 'Access Flooring Support - Pedestal System', xwalkId: '3626', description: '', children: [] },
      { id: 'wbs_9M_02_20', code: '9M.02.20', name: 'Access Flooring Support - Stringer System', xwalkId: '3627', description: '', children: [] },
      { id: 'wbs_9M_02_30', code: '9M.02.30', name: 'Access Flooring Support - (Stringerless) Corner Lock System', xwalkId: '3628', description: '', children: [] }
    ] },
    { id: 'wbs_9M_03', code: '9M.03', name: 'Access Floor Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_03_10', code: '9M.03.10', name: 'Access Floor - Hollow Steel Panels', xwalkId: '3629', description: '', children: [] },
      { id: 'wbs_9M_03_20', code: '9M.03.20', name: 'Access Floor - Cementitious Filled Steel Panels', xwalkId: '3630', description: '', children: [] },
      { id: 'wbs_9M_03_30', code: '9M.03.30', name: 'Access Floor - Aluminum Panels', xwalkId: '3631', description: '', children: [] },
      { id: 'wbs_9M_03_40', code: '9M.03.40', name: 'Access Floor - Woodcore Panels', xwalkId: '3632', description: '', children: [] }
    ] },
    { id: 'wbs_9M_04', code: '9M.04', name: 'Access Flooring Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_04_10', code: '9M.04.10', name: 'Access Floor - Bare Finish', xwalkId: '3633', description: '', children: [] },
      { id: 'wbs_9M_04_20', code: '9M.04.20', name: 'Access Floor - Anti-Static Flooring', xwalkId: '3634', description: '', children: [] },
      { id: 'wbs_9M_04_30', code: '9M.04.30', name: 'Access Floor - Alignment Pins', xwalkId: '3635', description: '', children: [] }
    ] },
    { id: 'wbs_9M_05', code: '9M.05', name: 'Access Flooring Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_05_10', code: '9M.05.10', name: 'Access Flooring - Cutouts and Grommets', xwalkId: '3636', description: '', children: [] },
      { id: 'wbs_9M_05_20', code: '9M.05.20', name: 'Access Flooring - Service Outlets', xwalkId: '3637', description: '', children: [] },
      { id: 'wbs_9M_05_30', code: '9M.05.30', name: 'Access Flooring - Panel Lifting Device', xwalkId: '3638', description: '', children: [] }
    ] },
    { id: 'wbs_9M_06', code: '9M.06', name: 'Access Flooring Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_9M_06_10', code: '9M.06.10', name: 'Access Flooring - Floor Preparation', xwalkId: '3639', description: '', children: [] },
      { id: 'wbs_9M_06_20', code: '9M.06.20', name: 'Access Flooring - Floor Protection', xwalkId: '3640', description: '', children: [] },
      { id: 'wbs_9M_06_30', code: '9M.06.30', name: 'Access Flooring - Pedetstal Layout', xwalkId: '3641', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10A', code: '10A', name: 'Misc Specialties', xwalkId: '', description: '', children: [
    { id: 'wbs_10A_01', code: '10A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_01_01', code: '10A.01.01', name: 'Mobilization', xwalkId: '1371', description: '', children: [] },
      { id: 'wbs_10A_01_02', code: '10A.01.02', name: 'Bond/Permit', xwalkId: '1372', description: '', children: [] },
      { id: 'wbs_10A_01_03', code: '10A.01.03', name: 'Submittals', xwalkId: '1373', description: '', children: [] },
      { id: 'wbs_10A_01_04', code: '10A.01.04', name: 'Equip Rentals', xwalkId: '1374', description: '', children: [] },
      { id: 'wbs_10A_01_07', code: '10A.01.07', name: 'Close-Out', xwalkId: '1375', description: '', children: [] },
      { id: 'wbs_10A_01_09', code: '10A.01.09', name: 'Cleaning', xwalkId: '1376', description: '', children: [] },
      { id: 'wbs_10A_01_13', code: '10A.01.13', name: 'Testing', xwalkId: '1377', description: '', children: [] }
    ] },
    { id: 'wbs_10A_02', code: '10A.02', name: 'Medical Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_02_10', code: '10A.02.10', name: 'Medical Headwall', xwalkId: '1378', description: '', children: [] },
      { id: 'wbs_10A_02_20', code: '10A.02.20', name: 'Medical Clinic Bed', xwalkId: '1379', description: '', children: [] },
      { id: 'wbs_10A_02_30', code: '10A.02.30', name: 'Nurse Cot', xwalkId: '1380', description: '', children: [] },
      { id: 'wbs_10A_02_40', code: '10A.02.40', name: 'Examination Table', xwalkId: '1381', description: '', children: [] }
    ] },
    { id: 'wbs_10A_03', code: '10A.03', name: 'Storage Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_03_10', code: '10A.03.10', name: 'Floor Safe', xwalkId: '1382', description: '', children: [] },
      { id: 'wbs_10A_03_20', code: '10A.03.20', name: 'Wall Safe', xwalkId: '1383', description: '', children: [] }
    ] },
    { id: 'wbs_10A_04', code: '10A.04', name: 'Other Interior Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_04_10', code: '10A.04.10', name: 'Banners', xwalkId: '1384', description: '', children: [] }
    ] },
    { id: 'wbs_10A_05', code: '10A.05', name: 'Other Exterior Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_05_10', code: '10A.05.10', name: 'Bird Control Devices', xwalkId: '1385', description: '', children: [] }
    ] },
    { id: 'wbs_10A_06', code: '10A.06', name: 'Fabricated Rooms', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_06_10', code: '10A.06.10', name: 'Weld Booth', xwalkId: '1386', description: '', children: [] },
      { id: 'wbs_10A_06_20', code: '10A.06.20', name: 'Paint Booth', xwalkId: '1387', description: '', children: [] },
      { id: 'wbs_10A_06_30', code: '10A.06.30', name: 'Dinning Booth', xwalkId: '1388', description: '', children: [] }
    ] },
    { id: 'wbs_10A_07', code: '10A.07', name: 'MEP Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_07_10', code: '10A.07.10', name: 'Power Cord Reel', xwalkId: '1389', description: '', children: [] },
      { id: 'wbs_10A_07_20', code: '10A.07.20', name: 'Telephone Enclosure', xwalkId: '1390', description: '', children: [] }
    ] },
    { id: 'wbs_10A_08', code: '10A.08', name: 'Cranes & Hoists', xwalkId: '', description: '', children: [
      { id: 'wbs_10A_08_10', code: '10A.08.10', name: 'Electric Chain Hoist', xwalkId: '1391', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10B', code: '10B', name: 'Visual Display Boards', xwalkId: '', description: '', children: [
    { id: 'wbs_10B_01', code: '10B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10B_01_01', code: '10B.01.01', name: 'Mobilization', xwalkId: '1392', description: '', children: [] },
      { id: 'wbs_10B_01_02', code: '10B.01.02', name: 'Bond/Permit', xwalkId: '1393', description: '', children: [] },
      { id: 'wbs_10B_01_03', code: '10B.01.03', name: 'Submittals', xwalkId: '1394', description: '', children: [] },
      { id: 'wbs_10B_01_05', code: '10B.01.05', name: 'Supervision', xwalkId: '1395', description: '', children: [] },
      { id: 'wbs_10B_01_07', code: '10B.01.07', name: 'Close-Out', xwalkId: '1396', description: '', children: [] },
      { id: 'wbs_10B_01_09', code: '10B.01.09', name: 'Cleaning', xwalkId: '1397', description: '', children: [] }
    ] },
    { id: 'wbs_10B_02', code: '10B.02', name: 'Display Boards', xwalkId: '', description: '', children: [
      { id: 'wbs_10B_02_10', code: '10B.02.10', name: 'Markerboards', xwalkId: '1398', description: '', children: [] },
      { id: 'wbs_10B_02_11', code: '10B.02.11', name: 'Markerboards - 4\'', xwalkId: '1399', description: '', children: [] },
      { id: 'wbs_10B_02_12', code: '10B.02.12', name: 'Markerboards - 6\'', xwalkId: '1400', description: '', children: [] },
      { id: 'wbs_10B_02_13', code: '10B.02.13', name: 'Markerboards - 8\'', xwalkId: '1401', description: '', children: [] },
      { id: 'wbs_10B_02_14', code: '10B.02.14', name: 'Markerboards - 10\'', xwalkId: '1402', description: '', children: [] },
      { id: 'wbs_10B_02_15', code: '10B.02.15', name: 'Markerboards - 12\'', xwalkId: '1403', description: '', children: [] },
      { id: 'wbs_10B_02_16', code: '10B.02.16', name: 'Markerboards - 16\'', xwalkId: '1404', description: '', children: [] },
      { id: 'wbs_10B_02_17', code: '10B.02.17', name: 'Markerboards - 20\'', xwalkId: '1405', description: '', children: [] },
      { id: 'wbs_10B_02_20', code: '10B.02.20', name: 'Chalkboards', xwalkId: '1406', description: '', children: [] },
      { id: 'wbs_10B_02_30', code: '10B.02.30', name: 'Glass Markerboards', xwalkId: '1407', description: '', children: [] },
      { id: 'wbs_10B_02_40', code: '10B.02.40', name: 'Sliding Markerboards', xwalkId: '1408', description: '', children: [] },
      { id: 'wbs_10B_02_43', code: '10B.02.43', name: 'Sliding Markerboards - 8\'', xwalkId: '1409', description: '', children: [] },
      { id: 'wbs_10B_02_44', code: '10B.02.44', name: 'Sliding Markerboards - 10\'', xwalkId: '1410', description: '', children: [] },
      { id: 'wbs_10B_02_50', code: '10B.02.50', name: 'Tackboards', xwalkId: '1411', description: '', children: [] },
      { id: 'wbs_10B_02_51', code: '10B.02.51', name: 'Tackboards - 4\'', xwalkId: '1412', description: '', children: [] },
      { id: 'wbs_10B_02_52', code: '10B.02.52', name: 'Tackboards - 6\'', xwalkId: '1413', description: '', children: [] },
      { id: 'wbs_10B_02_53', code: '10B.02.53', name: 'Tackboards - 8\'', xwalkId: '1414', description: '', children: [] },
      { id: 'wbs_10B_02_54', code: '10B.02.54', name: 'Tackboards - 10\'', xwalkId: '1415', description: '', children: [] },
      { id: 'wbs_10B_02_55', code: '10B.02.55', name: 'Tackboards - 12\'', xwalkId: '1416', description: '', children: [] },
      { id: 'wbs_10B_02_56', code: '10B.02.56', name: 'Tackboards - 16\'', xwalkId: '1417', description: '', children: [] }
    ] },
    { id: 'wbs_10B_03', code: '10B.03', name: 'Display Wall System', xwalkId: '', description: '', children: [
      { id: 'wbs_10B_03_10', code: '10B.03.10', name: 'Marker Walls', xwalkId: '1418', description: '', children: [] },
      { id: 'wbs_10B_03_20', code: '10B.03.20', name: 'Glass Marker Walls', xwalkId: '1419', description: '', children: [] },
      { id: 'wbs_10B_03_30', code: '10B.03.30', name: 'Tack Walls', xwalkId: '1420', description: '', children: [] }
    ] },
    { id: 'wbs_10B_04', code: '10B.04', name: 'Display Cases & Cabinets', xwalkId: '', description: '', children: [
      { id: 'wbs_10B_04_10', code: '10B.04.10', name: 'Pre-manufactured Display Cases', xwalkId: '1421', description: '', children: [] },
      { id: 'wbs_10B_04_20', code: '10B.04.20', name: 'Bulletin Board Cabinets', xwalkId: '1422', description: '', children: [] }
    ] },
    { id: 'wbs_10B_05', code: '10B.05', name: 'Visual Display Board Miscellaneous', xwalkId: '', description: '', children: [
      { id: 'wbs_10B_05_10', code: '10B.05.10', name: 'Display Rails', xwalkId: '1423', description: '', children: [] },
      { id: 'wbs_10B_05_20', code: '10B.05.20', name: 'Visual Display Board Accessories', xwalkId: '1424', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10C', code: '10C', name: 'Signage', xwalkId: '', description: '', children: [
    { id: 'wbs_10C_00', code: '10C.00', name: 'Interior/Exterior Signage', xwalkId: '', description: '', children: [
      { id: 'wbs_10C_00_00', code: '10C.00.00', name: 'Signage (Turnkey)', xwalkId: '1425', description: '', children: [] }
    ] },
    { id: 'wbs_10C_01', code: '10C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10C_01_01', code: '10C.01.01', name: 'Mobilization', xwalkId: '1426', description: '', children: [] },
      { id: 'wbs_10C_01_02', code: '10C.01.02', name: 'Bond/Permit', xwalkId: '1427', description: '', children: [] },
      { id: 'wbs_10C_01_03', code: '10C.01.03', name: 'Submittals', xwalkId: '1428', description: '', children: [] },
      { id: 'wbs_10C_01_05', code: '10C.01.05', name: 'Supervision', xwalkId: '1429', description: '', children: [] },
      { id: 'wbs_10C_01_07', code: '10C.01.07', name: 'Close-Out', xwalkId: '1430', description: '', children: [] },
      { id: 'wbs_10C_01_09', code: '10C.01.09', name: 'Cleaning', xwalkId: '1431', description: '', children: [] }
    ] },
    { id: 'wbs_10C_02', code: '10C.02', name: 'Site Sign', xwalkId: '', description: '', children: [
      { id: 'wbs_10C_02_10', code: '10C.02.10', name: 'Monument Signs', xwalkId: '1432', description: '', children: [] },
      { id: 'wbs_10C_02_20', code: '10C.02.20', name: 'Electronic Marquee Signs', xwalkId: '1433', description: '', children: [] },
      { id: 'wbs_10C_02_30', code: '10C.02.30', name: 'Post & Panel Signs', xwalkId: '1434', description: '', children: [] },
      { id: 'wbs_10C_02_40', code: '10C.02.40', name: 'Inlay Letters in Concrete', xwalkId: '1435', description: '', children: [] }
    ] },
    { id: 'wbs_10C_03', code: '10C.03', name: 'Building Exterior Sign', xwalkId: '', description: '', children: [
      { id: 'wbs_10C_03_10', code: '10C.03.10', name: 'Exterior Building Sign', xwalkId: '1436', description: '', children: [] },
      { id: 'wbs_10C_03_20', code: '10C.03.20', name: 'Exterior Letters & Numbers', xwalkId: '1437', description: '', children: [] },
      { id: 'wbs_10C_03_21', code: '10C.03.21', name: 'Exterior Letters & Numbers - 6"', xwalkId: '1438', description: '', children: [] },
      { id: 'wbs_10C_03_22', code: '10C.03.22', name: 'Exterior Letters & Numbers - 8"', xwalkId: '1439', description: '', children: [] },
      { id: 'wbs_10C_03_23', code: '10C.03.23', name: 'Exterior Letters & Numbers - 12"', xwalkId: '1440', description: '', children: [] },
      { id: 'wbs_10C_03_24', code: '10C.03.24', name: 'Exterior Letters & Numbers - 18"', xwalkId: '1441', description: '', children: [] },
      { id: 'wbs_10C_03_25', code: '10C.03.25', name: 'Exterior Letters & Numbers - 24"', xwalkId: '1442', description: '', children: [] },
      { id: 'wbs_10C_03_26', code: '10C.03.26', name: 'Exterior Letters & Numbers - 36"', xwalkId: '1443', description: '', children: [] },
      { id: 'wbs_10C_03_30', code: '10C.03.30', name: 'Exterior Logo', xwalkId: '1444', description: '', children: [] }
    ] },
    { id: 'wbs_10C_04', code: '10C.04', name: 'Building Interior Sign', xwalkId: '', description: '', children: [
      { id: 'wbs_10C_04_10', code: '10C.04.10', name: 'Plaque', xwalkId: '1445', description: '', children: [] },
      { id: 'wbs_10C_04_20', code: '10C.04.20', name: 'Directories', xwalkId: '1446', description: '', children: [] },
      { id: 'wbs_10C_04_30', code: '10C.04.30', name: 'Interior Letters & Numbers', xwalkId: '1447', description: '', children: [] },
      { id: 'wbs_10C_04_31', code: '10C.04.31', name: 'Interior Letters & Numbers - 6"', xwalkId: '1448', description: '', children: [] },
      { id: 'wbs_10C_04_32', code: '10C.04.32', name: 'Interior Letters & Numbers - 8"', xwalkId: '1449', description: '', children: [] },
      { id: 'wbs_10C_04_33', code: '10C.04.33', name: 'Interior Letters & Numbers - 12"', xwalkId: '1450', description: '', children: [] },
      { id: 'wbs_10C_04_34', code: '10C.04.34', name: 'Interior Letters & Numbers - 18"', xwalkId: '1451', description: '', children: [] },
      { id: 'wbs_10C_04_35', code: '10C.04.35', name: 'Interior Letters & Numbers - 24"', xwalkId: '1452', description: '', children: [] },
      { id: 'wbs_10C_04_36', code: '10C.04.36', name: 'Interior Letters & Numbers - 36"', xwalkId: '1453', description: '', children: [] },
      { id: 'wbs_10C_04_40', code: '10C.04.40', name: 'Interior Logo', xwalkId: '1454', description: '', children: [] },
      { id: 'wbs_10C_04_50', code: '10C.04.50', name: 'Room Identification Signs', xwalkId: '1455', description: '', children: [] },
      { id: 'wbs_10C_04_60', code: '10C.04.60', name: 'Wayfinding & Title Signs', xwalkId: '1456', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10D', code: '10D', name: 'Toilet Partitions & Accessories', xwalkId: '', description: '', children: [
    { id: 'wbs_10D_01', code: '10D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10D_01_01', code: '10D.01.01', name: 'Mobilization', xwalkId: '1457', description: '', children: [] },
      { id: 'wbs_10D_01_02', code: '10D.01.02', name: 'Bond/Permit', xwalkId: '1458', description: '', children: [] },
      { id: 'wbs_10D_01_03', code: '10D.01.03', name: 'Submittals', xwalkId: '1459', description: '', children: [] },
      { id: 'wbs_10D_01_05', code: '10D.01.05', name: 'Supervision', xwalkId: '1460', description: '', children: [] },
      { id: 'wbs_10D_01_07', code: '10D.01.07', name: 'Close-Out', xwalkId: '1461', description: '', children: [] },
      { id: 'wbs_10D_01_09', code: '10D.01.09', name: 'Cleaning', xwalkId: '1462', description: '', children: [] }
    ] },
    { id: 'wbs_10D_02', code: '10D.02', name: 'Toilet Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_10D_02_01', code: '10D.02.01', name: 'Toilet Compartments', xwalkId: '1463', description: '', children: [] },
      { id: 'wbs_10D_02_02', code: '10D.02.02', name: 'Shower Partitions', xwalkId: '1464', description: '', children: [] },
      { id: 'wbs_10D_02_03', code: '10D.02.03', name: 'Urinal Screen', xwalkId: '1465', description: '', children: [] }
    ] },
    { id: 'wbs_10D_03', code: '10D.03', name: 'Toilet Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_10D_03_01', code: '10D.03.01', name: 'Toilet Tissue Dispenser', xwalkId: '1466', description: '', children: [] },
      { id: 'wbs_10D_03_02', code: '10D.03.02', name: 'Soap Dispenser', xwalkId: '1467', description: '', children: [] },
      { id: 'wbs_10D_03_03', code: '10D.03.03', name: 'Grab Bar', xwalkId: '1468', description: '', children: [] },
      { id: 'wbs_10D_03_04', code: '10D.03.04', name: 'Paper Towel Dispenser', xwalkId: '1469', description: '', children: [] },
      { id: 'wbs_10D_03_05', code: '10D.03.05', name: 'Paper Towel Dispenser/Waste Receptacle', xwalkId: '1470', description: '', children: [] },
      { id: 'wbs_10D_03_06', code: '10D.03.06', name: 'Waste Receptacle', xwalkId: '1471', description: '', children: [] },
      { id: 'wbs_10D_03_07', code: '10D.03.07', name: 'Robe Hook', xwalkId: '1472', description: '', children: [] },
      { id: 'wbs_10D_03_08', code: '10D.03.08', name: 'Framed Mirror', xwalkId: '1473', description: '', children: [] },
      { id: 'wbs_10D_03_09', code: '10D.03.09', name: 'Sanitary Napkin Disposal', xwalkId: '1474', description: '', children: [] },
      { id: 'wbs_10D_03_10', code: '10D.03.10', name: 'Toilet Seat Cover Dispenser', xwalkId: '1475', description: '', children: [] },
      { id: 'wbs_10D_03_11', code: '10D.03.11', name: 'Baby Changing Station', xwalkId: '1476', description: '', children: [] },
      { id: 'wbs_10D_03_12', code: '10D.03.12', name: 'Adult Changing Station', xwalkId: '1477', description: '', children: [] },
      { id: 'wbs_10D_03_13', code: '10D.03.13', name: 'Shower Seat', xwalkId: '1478', description: '', children: [] },
      { id: 'wbs_10D_03_14', code: '10D.03.14', name: 'Shower Curtain Rod, Curtain & Hooks', xwalkId: '1479', description: '', children: [] },
      { id: 'wbs_10D_03_15', code: '10D.03.15', name: 'Under-Sink Piping Covers', xwalkId: '1480', description: '', children: [] },
      { id: 'wbs_10D_03_16', code: '10D.03.16', name: 'Mop & Broom Holder', xwalkId: '1481', description: '', children: [] },
      { id: 'wbs_10D_03_17', code: '10D.03.17', name: 'Hook Strip', xwalkId: '1482', description: '', children: [] },
      { id: 'wbs_10D_03_18', code: '10D.03.18', name: 'Soap Dish', xwalkId: '1483', description: '', children: [] },
      { id: 'wbs_10D_03_19', code: '10D.03.19', name: 'Mop Basin Hose and Bracket', xwalkId: '1484', description: '', children: [] },
      { id: 'wbs_10D_03_20', code: '10D.03.20', name: 'Sanitary Napkin Dispenser', xwalkId: '1485', description: '', children: [] },
      { id: 'wbs_10D_03_21', code: '10D.03.21', name: 'Toilet Accessories (OFCI)', xwalkId: '1486', description: '', children: [] }
    ] },
    { id: 'wbs_10D_04', code: '10D.04', name: 'Toilet Accessories - Electric Operated', xwalkId: '', description: '', children: [
      { id: 'wbs_10D_04_01', code: '10D.04.01', name: 'Electric Hand Dryer', xwalkId: '1487', description: '', children: [] },
      { id: 'wbs_10D_04_02', code: '10D.04.02', name: 'Motorized Change Table', xwalkId: '1488', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10E', code: '10E', name: 'Cubicle Curtains', xwalkId: '', description: '', children: [
    { id: 'wbs_10E_01', code: '10E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10E_01_03', code: '10E.01.03', name: 'Submittals', xwalkId: '1489', description: '', children: [] }
    ] },
    { id: 'wbs_10E_02', code: '10E.02', name: 'Cubicle Curtains & Track', xwalkId: '', description: '', children: [
      { id: 'wbs_10E_02_01', code: '10E.02.01', name: 'Cubicle Curtains', xwalkId: '1490', description: '', children: [] },
      { id: 'wbs_10E_02_02', code: '10E.02.02', name: 'Cubicle Track & Hardware', xwalkId: '1491', description: '', children: [] },
      { id: 'wbs_10E_02_03', code: '10E.02.03', name: 'Privacy Screens', xwalkId: '1492', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10F', code: '10F', name: 'Wire Mesh Partitions', xwalkId: '', description: '', children: [
    { id: 'wbs_10F_01', code: '10F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10F_01_01', code: '10F.01.01', name: 'Mobilization', xwalkId: '1493', description: '', children: [] },
      { id: 'wbs_10F_01_02', code: '10F.01.02', name: 'Bond/Permit', xwalkId: '1494', description: '', children: [] },
      { id: 'wbs_10F_01_03', code: '10F.01.03', name: 'Submittals', xwalkId: '1495', description: '', children: [] },
      { id: 'wbs_10F_01_04', code: '10F.01.04', name: 'Equip Rentals', xwalkId: '1496', description: '', children: [] },
      { id: 'wbs_10F_01_07', code: '10F.01.07', name: 'Close-Out', xwalkId: '1497', description: '', children: [] },
      { id: 'wbs_10F_01_09', code: '10F.01.09', name: 'Cleaning', xwalkId: '1498', description: '', children: [] }
    ] },
    { id: 'wbs_10F_02', code: '10F.02', name: 'Interior Wire Mesh Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_10F_02_10', code: '10F.02.10', name: 'Woven Wire Mesh Partitions', xwalkId: '1499', description: '', children: [] },
      { id: 'wbs_10F_02_20', code: '10F.02.20', name: 'Welded Wire Mesh Partitions', xwalkId: '1500', description: '', children: [] }
    ] },
    { id: 'wbs_10F_03', code: '10F.03', name: 'Wire Mesh Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_10F_03_10', code: '10F.03.10', name: 'Wire Mesh - Sliding Doors', xwalkId: '1501', description: '', children: [] },
      { id: 'wbs_10F_03_20', code: '10F.03.20', name: 'Wire Mesh - Swing Doors', xwalkId: '1502', description: '', children: [] },
      { id: 'wbs_10F_03_30', code: '10F.03.30', name: 'Wire Mesh - Door Hardware', xwalkId: '1503', description: '', children: [] }
    ] },
    { id: 'wbs_10F_04', code: '10F.04', name: 'Wire Mesh Partition Misc Components', xwalkId: '', description: '', children: [
      { id: 'wbs_10F_04_10', code: '10F.04.10', name: 'Wire Mesh - Partition Finish', xwalkId: '1504', description: '', children: [] },
      { id: 'wbs_10F_04_20', code: '10F.04.20', name: 'Wire Mesh - Cutouts', xwalkId: '1505', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10G', code: '10G', name: 'Operable Partitions', xwalkId: '', description: '', children: [
    { id: 'wbs_10G_01', code: '10G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_01_01', code: '10G.01.01', name: 'Mobilization', xwalkId: '1506', description: '', children: [] },
      { id: 'wbs_10G_01_02', code: '10G.01.02', name: 'Bond/Permit', xwalkId: '1507', description: '', children: [] },
      { id: 'wbs_10G_01_03', code: '10G.01.03', name: 'Submittals', xwalkId: '1508', description: '', children: [] },
      { id: 'wbs_10G_01_05', code: '10G.01.05', name: 'Supervision', xwalkId: '1509', description: '', children: [] },
      { id: 'wbs_10G_01_07', code: '10G.01.07', name: 'Close-Out', xwalkId: '1510', description: '', children: [] },
      { id: 'wbs_10G_01_09', code: '10G.01.09', name: 'Cleaning', xwalkId: '1511', description: '', children: [] }
    ] },
    { id: 'wbs_10G_02', code: '10G.02', name: 'Operable Panel Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_02_01', code: '10G.02.01', name: 'Folding Panel Partitions - Manual Operated', xwalkId: '1512', description: '', children: [] },
      { id: 'wbs_10G_02_02', code: '10G.02.02', name: 'Folding Panel Partitions - Electric Operated', xwalkId: '1513', description: '', children: [] },
      { id: 'wbs_10G_02_03', code: '10G.02.03', name: 'Folding Glass-Panel Partitions - Manual Operated', xwalkId: '1514', description: '', children: [] },
      { id: 'wbs_10G_02_04', code: '10G.02.04', name: 'Folding Glass-Panel Partitions - Electric Operated', xwalkId: '1515', description: '', children: [] }
    ] },
    { id: 'wbs_10G_03', code: '10G.03', name: 'Operable Panel Finish', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_03_01', code: '10G.03.01', name: 'Operable Panel Finish - Vinyl', xwalkId: '1516', description: '', children: [] },
      { id: 'wbs_10G_03_02', code: '10G.03.02', name: 'Operable Panel Finish - Fabric', xwalkId: '1517', description: '', children: [] },
      { id: 'wbs_10G_03_03', code: '10G.03.03', name: 'Operable Panel Finish - Carpet', xwalkId: '1518', description: '', children: [] },
      { id: 'wbs_10G_03_04', code: '10G.03.04', name: 'Operable Panel Finish - Plastic Laminate', xwalkId: '1519', description: '', children: [] },
      { id: 'wbs_10G_03_05', code: '10G.03.05', name: 'Operable Panel Finish - Marker Board', xwalkId: '1520', description: '', children: [] },
      { id: 'wbs_10G_03_06', code: '10G.03.06', name: 'Operable Panel Finish - Tack Board', xwalkId: '1521', description: '', children: [] }
    ] },
    { id: 'wbs_10G_04', code: '10G.04', name: 'Operable Partitions Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_04_01', code: '10G.04.01', name: 'Operable Panel - Pocket Doors', xwalkId: '1522', description: '', children: [] },
      { id: 'wbs_10G_04_02', code: '10G.04.02', name: 'Operable Panel - Pass Doors', xwalkId: '1523', description: '', children: [] }
    ] },
    { id: 'wbs_10G_05', code: '10G.05', name: 'Operable Partitions Miscellaneous', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_05_01', code: '10G.05.01', name: 'Operable Partitions - Field Punch Holes', xwalkId: '1524', description: '', children: [] }
    ] },
    { id: 'wbs_10G_06', code: '10G.06', name: 'Accordion Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_06_01', code: '10G.06.01', name: 'Accordion Folding Partitions - Non-Fire Rated', xwalkId: '1525', description: '', children: [] },
      { id: 'wbs_10G_06_02', code: '10G.06.02', name: 'Accordion Door', xwalkId: '1526', description: '', children: [] },
      { id: 'wbs_10G_06_03', code: '10G.06.03', name: 'Roll-Up Wood Doors', xwalkId: '1527', description: '', children: [] }
    ] },
    { id: 'wbs_10G_07', code: '10G.07', name: 'Sliding Partitions', xwalkId: '', description: '', children: [
      { id: 'wbs_10G_07_01', code: '10G.07.01', name: 'Interior Sliding Glass Partition', xwalkId: '1528', description: '', children: [] },
      { id: 'wbs_10G_07_02', code: '10G.07.02', name: 'Exterior Sliding Glass Partition', xwalkId: '1529', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10H', code: '10H', name: 'Wall Protection', xwalkId: '', description: '', children: [
    { id: 'wbs_10H_01', code: '10H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10H_01_01', code: '10H.01.01', name: 'Mobilization', xwalkId: '1530', description: '', children: [] },
      { id: 'wbs_10H_01_02', code: '10H.01.02', name: 'Bond/Permit', xwalkId: '1531', description: '', children: [] },
      { id: 'wbs_10H_01_03', code: '10H.01.03', name: 'Submittals', xwalkId: '1532', description: '', children: [] },
      { id: 'wbs_10H_01_07', code: '10H.01.07', name: 'Close-Out', xwalkId: '1533', description: '', children: [] },
      { id: 'wbs_10H_01_09', code: '10H.01.09', name: 'Cleaning', xwalkId: '1534', description: '', children: [] }
    ] },
    { id: 'wbs_10H_02', code: '10H.02', name: 'Protective Guards', xwalkId: '', description: '', children: [
      { id: 'wbs_10H_02_01', code: '10H.02.01', name: 'Corner Guards', xwalkId: '1535', description: '', children: [] },
      { id: 'wbs_10H_02_02', code: '10H.02.02', name: 'End Wall Guards', xwalkId: '1536', description: '', children: [] }
    ] },
    { id: 'wbs_10H_03', code: '10H.03', name: 'Wall Protective Rails', xwalkId: '', description: '', children: [
      { id: 'wbs_10H_03_01', code: '10H.03.01', name: 'Chair Rails', xwalkId: '1537', description: '', children: [] },
      { id: 'wbs_10H_03_02', code: '10H.03.02', name: 'Crash Rails', xwalkId: '1538', description: '', children: [] },
      { id: 'wbs_10H_03_03', code: '10H.03.03', name: 'Bumper Rails', xwalkId: '1539', description: '', children: [] }
    ] },
    { id: 'wbs_10H_04', code: '10H.04', name: 'Wall Protective Covers', xwalkId: '', description: '', children: [
      { id: 'wbs_10H_04_01', code: '10H.04.01', name: 'Wall Protection Coverings (Acrovyn)', xwalkId: '1540', description: '', children: [] },
      { id: 'wbs_10H_04_02', code: '10H.04.02', name: 'Wall Protection Panels (Acrovyn)', xwalkId: '1541', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10I', code: '10I', name: 'Safety Specialties', xwalkId: '', description: '', children: [
    { id: 'wbs_10I_01', code: '10I.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10I_01_01', code: '10I.01.01', name: 'Mobilization', xwalkId: '1542', description: '', children: [] },
      { id: 'wbs_10I_01_02', code: '10I.01.02', name: 'Bond/Permit', xwalkId: '1543', description: '', children: [] },
      { id: 'wbs_10I_01_03', code: '10I.01.03', name: 'Submittals', xwalkId: '1544', description: '', children: [] },
      { id: 'wbs_10I_01_07', code: '10I.01.07', name: 'Close-Out', xwalkId: '1545', description: '', children: [] }
    ] },
    { id: 'wbs_10I_02', code: '10I.02', name: 'Emergency Access Cabinets', xwalkId: '', description: '', children: [
      { id: 'wbs_10I_02_01', code: '10I.02.01', name: 'Emergency Key Cabinet (Gate)', xwalkId: '1546', description: '', children: [] },
      { id: 'wbs_10I_02_02', code: '10I.02.02', name: 'Emergency Key Cabinet (Building)', xwalkId: '1547', description: '', children: [] },
      { id: 'wbs_10I_02_03', code: '10I.02.03', name: 'Emergency Access Padlocks', xwalkId: '1548', description: '', children: [] },
      { id: 'wbs_10I_02_04', code: '10I.02.04', name: 'Emergency Access Gate & Key Switch', xwalkId: '1549', description: '', children: [] },
      { id: 'wbs_10I_02_05', code: '10I.02.05', name: 'Fireman\'s FDC Plug', xwalkId: '1550', description: '', children: [] }
    ] },
    { id: 'wbs_10I_03', code: '10I.03', name: 'Emergency Aid Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10I_03_01', code: '10I.03.01', name: 'Defibrillator Cabinet', xwalkId: '1551', description: '', children: [] },
      { id: 'wbs_10I_03_02', code: '10I.03.02', name: 'First Aid Cabinets', xwalkId: '1552', description: '', children: [] },
      { id: 'wbs_10I_03_03', code: '10I.03.03', name: 'Accessibility Evacuation Chairs', xwalkId: '1553', description: '', children: [] },
      { id: 'wbs_10I_03_04', code: '10I.03.04', name: 'First Aid Kits', xwalkId: '1554', description: '', children: [] }
    ] },
    { id: 'wbs_10I_04', code: '10I.04', name: 'Fire Protection Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_10I_04_01', code: '10I.04.01', name: 'Fire Extinguisher & Cabinet', xwalkId: '1555', description: '', children: [] },
      { id: 'wbs_10I_04_02', code: '10I.04.02', name: 'Fire Extinguishers (Bracket Mounted)', xwalkId: '1556', description: '', children: [] },
      { id: 'wbs_10I_04_03', code: '10I.04.03', name: 'Fire Blanket & Cabinet', xwalkId: '1557', description: '', children: [] },
      { id: 'wbs_10I_04_04', code: '10I.04.04', name: 'Fire Blankets', xwalkId: '1558', description: '', children: [] },
      { id: 'wbs_10I_04_05', code: '10I.04.05', name: 'Fire Extinguisher - Chemical', xwalkId: '1559', description: '', children: [] },
      { id: 'wbs_10I_04_06', code: '10I.04.06', name: 'Fire Extinguisher Hooks & Brackets', xwalkId: '1560', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10J', code: '10J', name: 'Lockers', xwalkId: '', description: '', children: [
    { id: 'wbs_10J_01', code: '10J.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_01_01', code: '10J.01.01', name: 'Mobilization', xwalkId: '1561', description: '', children: [] },
      { id: 'wbs_10J_01_02', code: '10J.01.02', name: 'Bond/Permit', xwalkId: '1562', description: '', children: [] },
      { id: 'wbs_10J_01_03', code: '10J.01.03', name: 'Submittals', xwalkId: '1563', description: '', children: [] },
      { id: 'wbs_10J_01_07', code: '10J.01.07', name: 'Close-Out', xwalkId: '1564', description: '', children: [] },
      { id: 'wbs_10J_01_09', code: '10J.01.09', name: 'Cleaning', xwalkId: '1565', description: '', children: [] }
    ] },
    { id: 'wbs_10J_02', code: '10J.02', name: 'Metal Lockers', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_02_01', code: '10J.02.01', name: 'Metal Lockers - Single Tier', xwalkId: '1566', description: '', children: [] },
      { id: 'wbs_10J_02_02', code: '10J.02.02', name: 'Metal Lockers - Double Tier', xwalkId: '1567', description: '', children: [] },
      { id: 'wbs_10J_02_03', code: '10J.02.03', name: 'Metal Lockers - Triple Tier', xwalkId: '1568', description: '', children: [] },
      { id: 'wbs_10J_02_04', code: '10J.02.04', name: 'Metal Lockers - Multi Tier', xwalkId: '1569', description: '', children: [] },
      { id: 'wbs_10J_02_05', code: '10J.02.05', name: 'Metal Lockers w/ Built-In Bench', xwalkId: '1570', description: '', children: [] },
      { id: 'wbs_10J_02_06', code: '10J.02.06', name: 'Metal Lockers - Install Only', xwalkId: '1571', description: '', children: [] }
    ] },
    { id: 'wbs_10J_03', code: '10J.03', name: 'Non-Metal Lockers', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_03_01', code: '10J.03.01', name: 'Wood Lockers', xwalkId: '1572', description: '', children: [] },
      { id: 'wbs_10J_03_02', code: '10J.03.02', name: 'Plastic Laminate Lockers', xwalkId: '1573', description: '', children: [] },
      { id: 'wbs_10J_03_03', code: '10J.03.03', name: 'Solid Plastic Lockers', xwalkId: '1574', description: '', children: [] },
      { id: 'wbs_10J_03_04', code: '10J.03.04', name: 'Solid Phenolic Lockers', xwalkId: '1575', description: '', children: [] },
      { id: 'wbs_10J_03_05', code: '10J.03.05', name: 'Wire Mesh Lockers', xwalkId: '1576', description: '', children: [] }
    ] },
    { id: 'wbs_10J_04', code: '10J.04', name: 'Special Lockers', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_04_01', code: '10J.04.01', name: 'Pass-Thru Cubby Lockers', xwalkId: '1577', description: '', children: [] },
      { id: 'wbs_10J_04_02', code: '10J.04.02', name: 'Large Size Storage Lockers', xwalkId: '1578', description: '', children: [] },
      { id: 'wbs_10J_04_03', code: '10J.04.03', name: 'Narcotics Lockers', xwalkId: '1579', description: '', children: [] },
      { id: 'wbs_10J_04_04', code: '10J.04.04', name: 'Weapon Storage Lockers', xwalkId: '1580', description: '', children: [] }
    ] },
    { id: 'wbs_10J_05', code: '10J.05', name: 'Locker Room Benches', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_05_01', code: '10J.05.01', name: 'Locker Room Metal Bench', xwalkId: '1581', description: '', children: [] },
      { id: 'wbs_10J_05_02', code: '10J.05.02', name: 'Locker Room Wood Bench', xwalkId: '1582', description: '', children: [] },
      { id: 'wbs_10J_05_03', code: '10J.05.03', name: 'Locker Room Bench w/ Storage', xwalkId: '1583', description: '', children: [] },
      { id: 'wbs_10J_05_04', code: '10J.05.04', name: 'Locker Room ADA Bench', xwalkId: '1584', description: '', children: [] },
      { id: 'wbs_10J_05_05', code: '10J.05.05', name: 'Locker Room Dressing Bench w/ Back', xwalkId: '1585', description: '', children: [] },
      { id: 'wbs_10J_05_06', code: '10J.05.06', name: 'Locker Room Hardwood Top Bench', xwalkId: '1586', description: '', children: [] },
      { id: 'wbs_10J_05_07', code: '10J.05.07', name: 'Locker Room HDPE Top Bench', xwalkId: '1587', description: '', children: [] }
    ] },
    { id: 'wbs_10J_06', code: '10J.06', name: 'Locker Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_10J_06_01', code: '10J.06.01', name: 'Locker Sloping Hoods/Tops', xwalkId: '1588', description: '', children: [] },
      { id: 'wbs_10J_06_02', code: '10J.06.02', name: 'Locker Filler Panel', xwalkId: '1589', description: '', children: [] },
      { id: 'wbs_10J_06_03', code: '10J.06.03', name: 'Locker Metal Base', xwalkId: '1590', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10K', code: '10K', name: 'Metal Shelving', xwalkId: '', description: '', children: [
    { id: 'wbs_10K_01', code: '10K.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10K_01_01', code: '10K.01.01', name: 'Mobilization', xwalkId: '1591', description: '', children: [] },
      { id: 'wbs_10K_01_02', code: '10K.01.02', name: 'Bond/Permit', xwalkId: '1592', description: '', children: [] },
      { id: 'wbs_10K_01_03', code: '10K.01.03', name: 'Submittals', xwalkId: '1593', description: '', children: [] },
      { id: 'wbs_10K_01_07', code: '10K.01.07', name: 'Close-Out', xwalkId: '1594', description: '', children: [] },
      { id: 'wbs_10K_01_09', code: '10K.01.09', name: 'Cleaning', xwalkId: '1595', description: '', children: [] }
    ] },
    { id: 'wbs_10K_02', code: '10K.02', name: 'Metal Shelving', xwalkId: '', description: '', children: [
      { id: 'wbs_10K_02_01', code: '10K.02.01', name: 'Metal Storage Shelving', xwalkId: '1596', description: '', children: [] },
      { id: 'wbs_10K_02_02', code: '10K.02.02', name: 'Wall Mounted Storage Shelving', xwalkId: '1597', description: '', children: [] },
      { id: 'wbs_10K_02_03', code: '10K.02.03', name: 'Metal Wire Storage Shelving', xwalkId: '1598', description: '', children: [] },
      { id: 'wbs_10K_02_04', code: '10K.02.04', name: 'Mobile Storage Shelving', xwalkId: '1599', description: '', children: [] }
    ] },
    { id: 'wbs_10K_03', code: '10K.03', name: 'Metal Rack', xwalkId: '', description: '', children: [
      { id: 'wbs_10K_03_01', code: '10K.03.01', name: 'Bulk Storage Racks', xwalkId: '1600', description: '', children: [] },
      { id: 'wbs_10K_03_02', code: '10K.03.02', name: 'Pallet Storage Racks', xwalkId: '1601', description: '', children: [] }
    ] },
    { id: 'wbs_10K_04', code: '10K.04', name: 'Metal Cabinets', xwalkId: '', description: '', children: [
      { id: 'wbs_10K_04_01', code: '10K.04.01', name: 'Office Metal Storage Cabinets', xwalkId: '1602', description: '', children: [] },
      { id: 'wbs_10K_04_02', code: '10K.04.02', name: 'Industrial Metal Storage Cabinets', xwalkId: '1603', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10L', code: '10L', name: 'Canopies', xwalkId: '', description: '', children: [
    { id: 'wbs_10L_01', code: '10L.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_01_01', code: '10L.01.01', name: 'Mobilization', xwalkId: '1604', description: '', children: [] },
      { id: 'wbs_10L_01_02', code: '10L.01.02', name: 'Bond/Permit', xwalkId: '1605', description: '', children: [] },
      { id: 'wbs_10L_01_03', code: '10L.01.03', name: 'Submittals', xwalkId: '1606', description: '', children: [] },
      { id: 'wbs_10L_01_05', code: '10L.01.05', name: 'Supervision', xwalkId: '1607', description: '', children: [] },
      { id: 'wbs_10L_01_07', code: '10L.01.07', name: 'Close-Out', xwalkId: '1608', description: '', children: [] },
      { id: 'wbs_10L_01_09', code: '10L.01.09', name: 'Cleaning', xwalkId: '1609', description: '', children: [] }
    ] },
    { id: 'wbs_10L_02', code: '10L.02', name: 'Metal Awnings', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_02_01', code: '10L.02.01', name: 'Awnings - Building', xwalkId: '1610', description: '', children: [] },
      { id: 'wbs_10L_02_02', code: '10L.02.02', name: 'Awnings - Site', xwalkId: '1611', description: '', children: [] }
    ] },
    { id: 'wbs_10L_03', code: '10L.03', name: 'Metal Canopies', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_03_01', code: '10L.03.01', name: 'Metal Canopy - Freestanding', xwalkId: '1612', description: '', children: [] },
      { id: 'wbs_10L_03_02', code: '10L.03.02', name: 'Metal Canopy - Cantilever', xwalkId: '1613', description: '', children: [] },
      { id: 'wbs_10L_03_03', code: '10L.03.03', name: 'Metal Canopy - Trellis', xwalkId: '1614', description: '', children: [] },
      { id: 'wbs_10L_03_04', code: '10L.03.04', name: 'Metal Canopy - Fuel Station Canopy', xwalkId: '1615', description: '', children: [] }
    ] },
    { id: 'wbs_10L_04', code: '10L.04', name: 'Car Shade', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_04_01', code: '10L.04.01', name: 'Carports', xwalkId: '1616', description: '', children: [] },
      { id: 'wbs_10L_04_02', code: '10L.04.02', name: 'Trailer Parking Canopy', xwalkId: '1617', description: '', children: [] }
    ] },
    { id: 'wbs_10L_05', code: '10L.05', name: 'Metal Walkway Cover', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_05_01', code: '10L.05.01', name: 'Metal Walkway - Building attached', xwalkId: '1618', description: '', children: [] },
      { id: 'wbs_10L_05_02', code: '10L.05.02', name: 'Metal Walkway - Site Freestanding', xwalkId: '1619', description: '', children: [] }
    ] },
    { id: 'wbs_10L_06', code: '10L.06', name: 'Sunshades', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_06_01', code: '10L.06.01', name: 'Vertical Sunshades', xwalkId: '1620', description: '', children: [] },
      { id: 'wbs_10L_06_02', code: '10L.06.02', name: 'Horizontal Sunshades', xwalkId: '1621', description: '', children: [] }
    ] },
    { id: 'wbs_10L_07', code: '10L.07', name: 'Canopy Attachments', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_07_01', code: '10L.07.01', name: 'Canopy Wall', xwalkId: '1622', description: '', children: [] },
      { id: 'wbs_10L_07_02', code: '10L.07.02', name: 'Trellis Wall', xwalkId: '1623', description: '', children: [] },
      { id: 'wbs_10L_07_03', code: '10L.07.03', name: 'Canopy Column & Beam Wraps', xwalkId: '1624', description: '', children: [] },
      { id: 'wbs_10L_07_04', code: '10L.07.04', name: 'Canopy Soffit', xwalkId: '1625', description: '', children: [] }
    ] },
    { id: 'wbs_10L_08', code: '10L.08', name: 'Fabric Protective Covers', xwalkId: '', description: '', children: [
      { id: 'wbs_10L_08_01', code: '10L.08.01', name: 'Fabric Awnings', xwalkId: '1626', description: '', children: [] },
      { id: 'wbs_10L_08_02', code: '10L.08.02', name: 'Fabric Canopy', xwalkId: '1627', description: '', children: [] },
      { id: 'wbs_10L_08_03', code: '10L.08.03', name: 'Fabric Walkway Cover', xwalkId: '1628', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10M', code: '10M', name: 'Flagpoles', xwalkId: '', description: '', children: [
    { id: 'wbs_10M_01', code: '10M.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10M_01_01', code: '10M.01.01', name: 'Mobilization', xwalkId: '1629', description: '', children: [] },
      { id: 'wbs_10M_01_02', code: '10M.01.02', name: 'Bond/Permit', xwalkId: '1630', description: '', children: [] },
      { id: 'wbs_10M_01_03', code: '10M.01.03', name: 'Submittals', xwalkId: '1631', description: '', children: [] },
      { id: 'wbs_10M_01_07', code: '10M.01.07', name: 'Close-Out', xwalkId: '1632', description: '', children: [] },
      { id: 'wbs_10M_01_09', code: '10M.01.09', name: 'Cleaning', xwalkId: '1633', description: '', children: [] }
    ] },
    { id: 'wbs_10M_02', code: '10M.02', name: 'In-Ground Flagpoles', xwalkId: '', description: '', children: [
      { id: 'wbs_10M_02_00', code: '10M.02.00', name: 'Ground-Set Flagpoles', xwalkId: '1634', description: '', children: [] },
      { id: 'wbs_10M_02_01', code: '10M.02.01', name: 'Ground-Set Flagpoles - Internal Halyard', xwalkId: '1635', description: '', children: [] },
      { id: 'wbs_10M_02_02', code: '10M.02.02', name: 'Ground-Set Flagpoles - External Halyard', xwalkId: '1636', description: '', children: [] },
      { id: 'wbs_10M_02_03', code: '10M.02.03', name: 'Automatic Flagpoles', xwalkId: '1637', description: '', children: [] },
      { id: 'wbs_10M_02_04', code: '10M.02.04', name: 'Nautical Flagpoles', xwalkId: '1638', description: '', children: [] }
    ] },
    { id: 'wbs_10M_03', code: '10M.03', name: 'Other Mount Flagpoles', xwalkId: '', description: '', children: [
      { id: 'wbs_10M_03_01', code: '10M.03.01', name: 'Wall-Mounted Flagpoles', xwalkId: '1639', description: '', children: [] },
      { id: 'wbs_10M_03_02', code: '10M.03.02', name: 'Roof-Mounted Flagpoles', xwalkId: '1640', description: '', children: [] },
      { id: 'wbs_10M_03_03', code: '10M.03.03', name: 'Plaza-Mounted Flagpoles', xwalkId: '1641', description: '', children: [] }
    ] },
    { id: 'wbs_10M_04', code: '10M.04', name: 'Flagpole Miscellaneous', xwalkId: '', description: '', children: [
      { id: 'wbs_10M_04_01', code: '10M.04.01', name: 'Flagpole Flags', xwalkId: '1642', description: '', children: [] },
      { id: 'wbs_10M_04_02', code: '10M.04.02', name: 'Flagpole Installation Material', xwalkId: '1643', description: '', children: [] },
      { id: 'wbs_10M_04_03', code: '10M.04.03', name: 'Flagpole Concrete Base', xwalkId: '1644', description: '', children: [] }
    ] },
    { id: 'wbs_10M_05', code: '10M.05', name: 'Flagpole Specialty', xwalkId: '', description: '', children: [
      { id: 'wbs_10M_05_01', code: '10M.05.01', name: 'Flagpole Lighting', xwalkId: '1645', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10N', code: '10N', name: 'Postal Specialties', xwalkId: '', description: '', children: [
    { id: 'wbs_10N_01', code: '10N.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10N_01_01', code: '10N.01.01', name: 'Mobilization', xwalkId: '1646', description: '', children: [] },
      { id: 'wbs_10N_01_02', code: '10N.01.02', name: 'Bond/Permit', xwalkId: '1647', description: '', children: [] },
      { id: 'wbs_10N_01_03', code: '10N.01.03', name: 'Submittals', xwalkId: '1648', description: '', children: [] },
      { id: 'wbs_10N_01_07', code: '10N.01.07', name: 'Close-Out', xwalkId: '1649', description: '', children: [] },
      { id: 'wbs_10N_01_09', code: '10N.01.09', name: 'Cleaning', xwalkId: '1650', description: '', children: [] }
    ] },
    { id: 'wbs_10N_02', code: '10N.02', name: 'Mailboxes', xwalkId: '', description: '', children: [
      { id: 'wbs_10N_02_10', code: '10N.02.10', name: 'Commercial Mailboxes', xwalkId: '1651', description: '', children: [] },
      { id: 'wbs_10N_02_20', code: '10N.02.20', name: 'Mail Collection/Outgoing Mailboxes', xwalkId: '1652', description: '', children: [] }
    ] },
    { id: 'wbs_10N_03', code: '10N.03', name: 'Mail Storage', xwalkId: '', description: '', children: [
      { id: 'wbs_10N_03_10', code: '10N.03.10', name: 'Parcel Lockers', xwalkId: '1653', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10O', code: '10O', name: 'Fireplace', xwalkId: '', description: '', children: [
    { id: 'wbs_10O_01', code: '10O.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10O_01_01', code: '10O.01.01', name: 'Mobilization', xwalkId: '1654', description: '', children: [] },
      { id: 'wbs_10O_01_02', code: '10O.01.02', name: 'Bond/Permit', xwalkId: '1655', description: '', children: [] },
      { id: 'wbs_10O_01_03', code: '10O.01.03', name: 'Submittals', xwalkId: '1656', description: '', children: [] },
      { id: 'wbs_10O_01_07', code: '10O.01.07', name: 'Close-Out', xwalkId: '1657', description: '', children: [] },
      { id: 'wbs_10O_01_09', code: '10O.01.09', name: 'Cleaning', xwalkId: '1658', description: '', children: [] },
      { id: 'wbs_10O_01_13', code: '10O.01.13', name: 'Testing', xwalkId: '1659', description: '', children: [] }
    ] },
    { id: 'wbs_10O_02', code: '10O.02', name: 'Manufactured Fireplace', xwalkId: '', description: '', children: [
      { id: 'wbs_10O_02_10', code: '10O.02.10', name: 'Wood-Fired Fireplace', xwalkId: '1660', description: '', children: [] },
      { id: 'wbs_10O_02_20', code: '10O.02.20', name: 'Gas Fireplace', xwalkId: '1661', description: '', children: [] },
      { id: 'wbs_10O_02_30', code: '10O.02.30', name: 'Electric Fireplace', xwalkId: '1662', description: '', children: [] },
      { id: 'wbs_10O_02_40', code: '10O.02.40', name: 'Outdoor Fireplace', xwalkId: '1663', description: '', children: [] }
    ] },
    { id: 'wbs_10O_03', code: '10O.03', name: 'Stoves', xwalkId: '', description: '', children: [
      { id: 'wbs_10O_03_10', code: '10O.03.10', name: 'Pellet Stove', xwalkId: '1664', description: '', children: [] }
    ] },
    { id: 'wbs_10O_04', code: '10O.04', name: 'Fireplace Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_10O_04_10', code: '10O.04.10', name: 'Fireplace Flue', xwalkId: '1665', description: '', children: [] },
      { id: 'wbs_10O_04_20', code: '10O.04.20', name: 'Fireplace Chimney', xwalkId: '1666', description: '', children: [] },
      { id: 'wbs_10O_04_30', code: '10O.04.30', name: 'Fireplace Mantels', xwalkId: '1667', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_10P', code: '10P', name: 'Carports', xwalkId: '', description: '', children: [
    { id: 'wbs_10P_01', code: '10P.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_10P_01_01', code: '10P.01.01', name: 'Mobilization', xwalkId: '1668', description: '', children: [] },
      { id: 'wbs_10P_01_02', code: '10P.01.02', name: 'Bond/Permit', xwalkId: '1669', description: '', children: [] },
      { id: 'wbs_10P_01_03', code: '10P.01.03', name: 'Submittals', xwalkId: '1670', description: '', children: [] },
      { id: 'wbs_10P_01_07', code: '10P.01.07', name: 'Close-Out', xwalkId: '1671', description: '', children: [] },
      { id: 'wbs_10P_01_09', code: '10P.01.09', name: 'Cleaning', xwalkId: '1672', description: '', children: [] }
    ] },
    { id: 'wbs_10P_02', code: '10P.02', name: 'Standard Carports', xwalkId: '', description: '', children: [
      { id: 'wbs_10P_02_10', code: '10P.02.10', name: 'Flat Roof Carports', xwalkId: '1673', description: '', children: [] },
      { id: 'wbs_10P_02_20', code: '10P.02.20', name: 'Gable Roof Carports', xwalkId: '1674', description: '', children: [] }
    ] },
    { id: 'wbs_10P_03', code: '10P.03', name: 'Special Carports', xwalkId: '', description: '', children: [
      { id: 'wbs_10P_03_10', code: '10P.03.10', name: 'Large Vehicle Carports', xwalkId: '1675', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11A', code: '11A', name: 'Residential Appliances', xwalkId: '', description: '', children: [
    { id: 'wbs_11A_01', code: '11A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_01_01', code: '11A.01.01', name: 'Mobilization', xwalkId: '1676', description: '', children: [] },
      { id: 'wbs_11A_01_02', code: '11A.01.02', name: 'Bond/Permit', xwalkId: '1677', description: '', children: [] },
      { id: 'wbs_11A_01_03', code: '11A.01.03', name: 'Submittals', xwalkId: '1678', description: '', children: [] },
      { id: 'wbs_11A_01_07', code: '11A.01.07', name: 'Close-Out', xwalkId: '1679', description: '', children: [] },
      { id: 'wbs_11A_01_09', code: '11A.01.09', name: 'Cleaning', xwalkId: '1680', description: '', children: [] }
    ] },
    { id: 'wbs_11A_02', code: '11A.02', name: 'Residential Kitchen Appliances', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_02_01', code: '11A.02.01', name: 'Residential Ranges', xwalkId: '1681', description: '', children: [] },
      { id: 'wbs_11A_02_02', code: '11A.02.02', name: 'Residential Cooktops', xwalkId: '1682', description: '', children: [] },
      { id: 'wbs_11A_02_03', code: '11A.02.03', name: 'Residential Ovens', xwalkId: '1683', description: '', children: [] },
      { id: 'wbs_11A_02_04', code: '11A.02.04', name: 'Residential Vent Hoods', xwalkId: '1684', description: '', children: [] },
      { id: 'wbs_11A_02_05', code: '11A.02.05', name: 'Residential Microwave', xwalkId: '1685', description: '', children: [] },
      { id: 'wbs_11A_02_06', code: '11A.02.06', name: 'Residential Dishwashers', xwalkId: '1686', description: '', children: [] },
      { id: 'wbs_11A_02_07', code: '11A.02.07', name: 'Residential Garbage Disposal', xwalkId: '1687', description: '', children: [] },
      { id: 'wbs_11A_02_08', code: '11A.02.08', name: 'Residential Refrigerators', xwalkId: '1688', description: '', children: [] },
      { id: 'wbs_11A_02_09', code: '11A.02.09', name: 'Residential Undercounter Refrigerators', xwalkId: '1689', description: '', children: [] },
      { id: 'wbs_11A_02_10', code: '11A.02.10', name: 'Residential Freezers', xwalkId: '1690', description: '', children: [] },
      { id: 'wbs_11A_02_11', code: '11A.02.11', name: 'Residential Icemakers', xwalkId: '1691', description: '', children: [] },
      { id: 'wbs_11A_02_12', code: '11A.02.12', name: 'Residential Small Kitchen Appliances', xwalkId: '1692', description: '', children: [] },
      { id: 'wbs_11A_02_13', code: '11A.02.13', name: 'Residential Kitchen Appliances (OFCI)', xwalkId: '1693', description: '', children: [] }
    ] },
    { id: 'wbs_11A_03', code: '11A.03', name: 'Residential Laundry Appliances', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_03_01', code: '11A.03.01', name: 'Residential Grade Clothes Washers', xwalkId: '1694', description: '', children: [] },
      { id: 'wbs_11A_03_02', code: '11A.03.02', name: 'Residential Grade Clothes Dryers', xwalkId: '1695', description: '', children: [] },
      { id: 'wbs_11A_03_03', code: '11A.03.03', name: 'Stacked Clothes Washer & Dryer', xwalkId: '1696', description: '', children: [] },
      { id: 'wbs_11A_03_04', code: '11A.03.04', name: 'Combination Clothes Washer/Dryer', xwalkId: '1697', description: '', children: [] }
    ] },
    { id: 'wbs_11A_04', code: '11A.04', name: 'Miscellaneous Appliances', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_04_01', code: '11A.04.01', name: 'Oscillating Fan', xwalkId: '1698', description: '', children: [] },
      { id: 'wbs_11A_04_02', code: '11A.04.02', name: 'Treatment Tables', xwalkId: '1699', description: '', children: [] }
    ] },
    { id: 'wbs_11A_05', code: '11A.05', name: 'Commercial Laundry Appliances', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_05_01', code: '11A.05.01', name: 'Commercial Clothes Washers', xwalkId: '1700', description: '', children: [] },
      { id: 'wbs_11A_05_02', code: '11A.05.02', name: 'Commercial Clothes Dryers', xwalkId: '1701', description: '', children: [] },
      { id: 'wbs_11A_05_03', code: '11A.05.03', name: 'Laundry Carts', xwalkId: '1702', description: '', children: [] },
      { id: 'wbs_11A_05_04', code: '11A.05.04', name: 'Laundry Chutes', xwalkId: '1703', description: '', children: [] }
    ] },
    { id: 'wbs_11A_06', code: '11A.06', name: 'Commercial Food Dispensing Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11A_06_01', code: '11A.06.01', name: 'Commercial Ice Machine', xwalkId: '1704', description: '', children: [] },
      { id: 'wbs_11A_06_02', code: '11A.06.02', name: 'Commercial Icemaker Bin', xwalkId: '1705', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11B', code: '11B', name: 'Food Service Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11B_00', code: '11B.00', name: 'Food Service System', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_00_00', code: '11B.00.00', name: 'Food Service - Turnkey', xwalkId: '1706', description: '', children: [] },
      { id: 'wbs_11B_00_01', code: '11B.00.01', name: 'Food Service Equipment - Install Only', xwalkId: '1707', description: '', children: [] }
    ] },
    { id: 'wbs_11B_01', code: '11B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_01_01', code: '11B.01.01', name: 'Mobilization', xwalkId: '1708', description: '', children: [] },
      { id: 'wbs_11B_01_02', code: '11B.01.02', name: 'Bond/Permit', xwalkId: '1709', description: '', children: [] },
      { id: 'wbs_11B_01_03', code: '11B.01.03', name: 'Submittals', xwalkId: '1710', description: '', children: [] },
      { id: 'wbs_11B_01_05', code: '11B.01.05', name: 'Supervision', xwalkId: '1711', description: '', children: [] },
      { id: 'wbs_11B_01_07', code: '11B.01.07', name: 'Close-Out', xwalkId: '1712', description: '', children: [] },
      { id: 'wbs_11B_01_09', code: '11B.01.09', name: 'Cleaning', xwalkId: '1713', description: '', children: [] },
      { id: 'wbs_11B_01_12', code: '11B.01.12', name: 'Commissioning', xwalkId: '1714', description: '', children: [] },
      { id: 'wbs_11B_01_13', code: '11B.01.13', name: 'Testing', xwalkId: '1715', description: '', children: [] }
    ] },
    { id: 'wbs_11B_02', code: '11B.02', name: 'Refrigeration system', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_02_01', code: '11B.02.01', name: 'Walk-In - Freezer/Cooler Combination', xwalkId: '1716', description: '', children: [] },
      { id: 'wbs_11B_02_02', code: '11B.02.02', name: 'Walk-In - Freezer', xwalkId: '1717', description: '', children: [] },
      { id: 'wbs_11B_02_03', code: '11B.02.03', name: 'Walk-In - Cooler', xwalkId: '1718', description: '', children: [] },
      { id: 'wbs_11B_02_04', code: '11B.02.04', name: 'Cooler - Cold Storage Refrigeration System', xwalkId: '1719', description: '', children: [] },
      { id: 'wbs_11B_02_05', code: '11B.02.05', name: 'Cooler - Cooler Storage Assembly', xwalkId: '1720', description: '', children: [] },
      { id: 'wbs_11B_02_06', code: '11B.02.06', name: 'Cooler - Beverage Coolers', xwalkId: '1721', description: '', children: [] },
      { id: 'wbs_11B_02_07', code: '11B.02.07', name: 'Cooler - Floral Coolers', xwalkId: '1722', description: '', children: [] },
      { id: 'wbs_11B_02_08', code: '11B.02.08', name: 'Freezer - Freezer Storage Assembly', xwalkId: '1723', description: '', children: [] },
      { id: 'wbs_11B_02_09', code: '11B.02.09', name: 'Freezer - Reach-In Freezers', xwalkId: '1724', description: '', children: [] },
      { id: 'wbs_11B_02_10', code: '11B.02.10', name: 'Freezer - Roll-In Freezers', xwalkId: '1725', description: '', children: [] },
      { id: 'wbs_11B_02_11', code: '11B.02.11', name: 'Refrigerator - Reach-In Refrigerators', xwalkId: '1726', description: '', children: [] },
      { id: 'wbs_11B_02_12', code: '11B.02.12', name: 'Refrigerator - Roll-In Refrigerators', xwalkId: '1727', description: '', children: [] },
      { id: 'wbs_11B_02_13', code: '11B.02.13', name: 'Refrigerator - Roll-Thru Refrigerators', xwalkId: '1728', description: '', children: [] },
      { id: 'wbs_11B_02_14', code: '11B.02.14', name: 'Refrigerator - Pass-Thru Refrigerators', xwalkId: '1729', description: '', children: [] },
      { id: 'wbs_11B_02_15', code: '11B.02.15', name: 'Refrigerator - Countertop Refrigerators', xwalkId: '1730', description: '', children: [] },
      { id: 'wbs_11B_02_16', code: '11B.02.16', name: 'Refrigerator - Undercounter Refrigerators', xwalkId: '1731', description: '', children: [] },
      { id: 'wbs_11B_02_17', code: '11B.02.17', name: 'Refrigerator - Pizza Prep Table Refrigerators', xwalkId: '1732', description: '', children: [] },
      { id: 'wbs_11B_02_18', code: '11B.02.18', name: 'Refrigerator - Refrigerated Air Screens', xwalkId: '1733', description: '', children: [] },
      { id: 'wbs_11B_02_19', code: '11B.02.19', name: 'Refrigerator - Refrigerated Bases', xwalkId: '1734', description: '', children: [] },
      { id: 'wbs_11B_02_20', code: '11B.02.20', name: 'Refrigerator - Refrigerator Racks', xwalkId: '1735', description: '', children: [] }
    ] },
    { id: 'wbs_11B_03', code: '11B.03', name: 'Ice Machine', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_03_01', code: '11B.03.01', name: 'ICE Machine - ICE Makers', xwalkId: '1736', description: '', children: [] },
      { id: 'wbs_11B_03_02', code: '11B.03.02', name: 'ICE Machine - ICE Makers w/ Bin', xwalkId: '1737', description: '', children: [] },
      { id: 'wbs_11B_03_03', code: '11B.03.03', name: 'ICE Machine - Ice Cubers', xwalkId: '1738', description: '', children: [] },
      { id: 'wbs_11B_03_04', code: '11B.03.04', name: 'ICE Machine - ICE Dispensers', xwalkId: '1739', description: '', children: [] }
    ] },
    { id: 'wbs_11B_04', code: '11B.04', name: 'Food Service Storage System', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_04_01', code: '11B.04.01', name: 'Shelving - Dry Storage Shelving', xwalkId: '1740', description: '', children: [] },
      { id: 'wbs_11B_04_02', code: '11B.04.02', name: 'Shelving - Cold Storage Shelving', xwalkId: '1741', description: '', children: [] },
      { id: 'wbs_11B_04_03', code: '11B.04.03', name: 'Shelving - Chemical Shelving', xwalkId: '1742', description: '', children: [] },
      { id: 'wbs_11B_04_04', code: '11B.04.04', name: 'Shelving - Mobile Shelving', xwalkId: '1743', description: '', children: [] },
      { id: 'wbs_11B_04_05', code: '11B.04.05', name: 'Shelving - Wall Mount Shelves', xwalkId: '1744', description: '', children: [] },
      { id: 'wbs_11B_04_06', code: '11B.04.06', name: 'Shelving - Utensil Shelving', xwalkId: '1745', description: '', children: [] },
      { id: 'wbs_11B_04_07', code: '11B.04.07', name: 'Shelving - Drying Shelf', xwalkId: '1746', description: '', children: [] },
      { id: 'wbs_11B_04_08', code: '11B.04.08', name: 'Racks - Can Rack', xwalkId: '1747', description: '', children: [] },
      { id: 'wbs_11B_04_09', code: '11B.04.09', name: 'Racks - Utensil Rack', xwalkId: '1748', description: '', children: [] },
      { id: 'wbs_11B_04_10', code: '11B.04.10', name: 'Racks - Dishwasher Rack', xwalkId: '1749', description: '', children: [] },
      { id: 'wbs_11B_04_11', code: '11B.04.11', name: 'Racks - Drying Rack', xwalkId: '1750', description: '', children: [] },
      { id: 'wbs_11B_04_12', code: '11B.04.12', name: 'Racks - Dunnage Rack', xwalkId: '1751', description: '', children: [] },
      { id: 'wbs_11B_04_13', code: '11B.04.13', name: 'Racks - Pan Rack', xwalkId: '1752', description: '', children: [] },
      { id: 'wbs_11B_04_14', code: '11B.04.14', name: 'Racks - Pot Rack', xwalkId: '1753', description: '', children: [] },
      { id: 'wbs_11B_04_15', code: '11B.04.15', name: 'Racks - Tray Rack Dispenser', xwalkId: '1754', description: '', children: [] },
      { id: 'wbs_11B_04_16', code: '11B.04.16', name: 'Merchandiser - Display Merchandisers', xwalkId: '1755', description: '', children: [] },
      { id: 'wbs_11B_04_17', code: '11B.04.17', name: 'Merchandiser - Beverage Merchandisers', xwalkId: '1756', description: '', children: [] },
      { id: 'wbs_11B_04_18', code: '11B.04.18', name: 'Merchandiser - Heated Merchandiser', xwalkId: '1757', description: '', children: [] },
      { id: 'wbs_11B_04_19', code: '11B.04.19', name: 'Merchandiser - Refrigerated Merchandiser', xwalkId: '1758', description: '', children: [] },
      { id: 'wbs_11B_04_20', code: '11B.04.20', name: 'Lockers - Kitchen Lockers, Safe', xwalkId: '1759', description: '', children: [] }
    ] },
    { id: 'wbs_11B_05', code: '11B.05', name: 'Food Service Work Table', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_05_01', code: '11B.05.01', name: 'Work Table', xwalkId: '1760', description: '', children: [] },
      { id: 'wbs_11B_05_02', code: '11B.05.02', name: 'Work Table - Mobile Worktable', xwalkId: '1761', description: '', children: [] },
      { id: 'wbs_11B_05_03', code: '11B.05.03', name: 'Work Table - Island Worktable', xwalkId: '1762', description: '', children: [] },
      { id: 'wbs_11B_05_04', code: '11B.05.04', name: 'Work Table - Demonstration Table', xwalkId: '1763', description: '', children: [] },
      { id: 'wbs_11B_05_05', code: '11B.05.05', name: 'Prep Table', xwalkId: '1764', description: '', children: [] },
      { id: 'wbs_11B_05_06', code: '11B.05.06', name: 'Prep Table - Cutting Table', xwalkId: '1765', description: '', children: [] },
      { id: 'wbs_11B_05_07', code: '11B.05.07', name: 'Prep Table - Setup Table', xwalkId: '1766', description: '', children: [] },
      { id: 'wbs_11B_05_08', code: '11B.05.08', name: 'Prep Table - Pizza Table', xwalkId: '1767', description: '', children: [] },
      { id: 'wbs_11B_05_09', code: '11B.05.09', name: 'Prep Table - Bakers Table', xwalkId: '1768', description: '', children: [] },
      { id: 'wbs_11B_05_10', code: '11B.05.10', name: 'Prep Table - Island Table (with sink)', xwalkId: '1769', description: '', children: [] }
    ] },
    { id: 'wbs_11B_06', code: '11B.06', name: 'Food Preparation Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_06_01', code: '11B.06.01', name: 'Blender', xwalkId: '1770', description: '', children: [] },
      { id: 'wbs_11B_06_02', code: '11B.06.02', name: 'Food Mixer', xwalkId: '1771', description: '', children: [] },
      { id: 'wbs_11B_06_03', code: '11B.06.03', name: 'Planetary Mixer', xwalkId: '1772', description: '', children: [] },
      { id: 'wbs_11B_06_04', code: '11B.06.04', name: 'Food Processor', xwalkId: '1773', description: '', children: [] },
      { id: 'wbs_11B_06_05', code: '11B.06.05', name: 'Meat Slicer', xwalkId: '1774', description: '', children: [] },
      { id: 'wbs_11B_06_06', code: '11B.06.06', name: 'Sandwich Press', xwalkId: '1775', description: '', children: [] },
      { id: 'wbs_11B_06_07', code: '11B.06.07', name: 'Dough Divider Rounder', xwalkId: '1776', description: '', children: [] }
    ] },
    { id: 'wbs_11B_07', code: '11B.07', name: 'Cooking Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_07_01', code: '11B.07.01', name: 'Fryer', xwalkId: '1777', description: '', children: [] },
      { id: 'wbs_11B_07_02', code: '11B.07.02', name: 'Broiler', xwalkId: '1778', description: '', children: [] },
      { id: 'wbs_11B_07_03', code: '11B.07.03', name: 'Griddle', xwalkId: '1779', description: '', children: [] },
      { id: 'wbs_11B_07_04', code: '11B.07.04', name: 'Oven - Convection Oven', xwalkId: '1780', description: '', children: [] },
      { id: 'wbs_11B_07_05', code: '11B.07.05', name: 'Oven - Conveyor Oven', xwalkId: '1781', description: '', children: [] },
      { id: 'wbs_11B_07_06', code: '11B.07.06', name: 'Oven - Combination Oven', xwalkId: '1782', description: '', children: [] },
      { id: 'wbs_11B_07_07', code: '11B.07.07', name: 'Oven - Double Convection Oven', xwalkId: '1783', description: '', children: [] },
      { id: 'wbs_11B_07_08', code: '11B.07.08', name: 'Oven - Microwave Oven', xwalkId: '1784', description: '', children: [] },
      { id: 'wbs_11B_07_09', code: '11B.07.09', name: 'Oven - Mobile Cook-N-Hold Oven', xwalkId: '1785', description: '', children: [] },
      { id: 'wbs_11B_07_10', code: '11B.07.10', name: 'Oven - Pizza Oven', xwalkId: '1786', description: '', children: [] },
      { id: 'wbs_11B_07_11', code: '11B.07.11', name: 'Oven - Deck Oven', xwalkId: '1787', description: '', children: [] },
      { id: 'wbs_11B_07_12', code: '11B.07.12', name: 'Range - Multi Burner Range', xwalkId: '1788', description: '', children: [] },
      { id: 'wbs_11B_07_13', code: '11B.07.13', name: 'Steamer - Convection Steamer', xwalkId: '1789', description: '', children: [] },
      { id: 'wbs_11B_07_14', code: '11B.07.14', name: 'Steamer - Double Convection Steamer', xwalkId: '1790', description: '', children: [] },
      { id: 'wbs_11B_07_15', code: '11B.07.15', name: 'Skillets - Tilting Skillet', xwalkId: '1791', description: '', children: [] },
      { id: 'wbs_11B_07_16', code: '11B.07.16', name: 'Skillets - Tilting Skillet Braising Pan', xwalkId: '1792', description: '', children: [] }
    ] },
    { id: 'wbs_11B_08', code: '11B.08', name: 'Food Service Water Filtration', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_08_01', code: '11B.08.01', name: 'Water Filtration System - Water Filter', xwalkId: '1793', description: '', children: [] },
      { id: 'wbs_11B_08_02', code: '11B.08.02', name: 'Water Filtration System - Water Filter for Stem Equipment', xwalkId: '1794', description: '', children: [] },
      { id: 'wbs_11B_08_03', code: '11B.08.03', name: 'Water Filtration System - Water Filter for Ice Machines', xwalkId: '1795', description: '', children: [] },
      { id: 'wbs_11B_08_04', code: '11B.08.04', name: 'Water Filtration System - Water Softener Conditioner', xwalkId: '1796', description: '', children: [] },
      { id: 'wbs_11B_08_05', code: '11B.08.05', name: 'Water Filtration System - Reverse Osmosis', xwalkId: '1797', description: '', children: [] }
    ] },
    { id: 'wbs_11B_09', code: '11B.09', name: 'Food Warmers', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_09_01', code: '11B.09.01', name: 'Buffet Warmer', xwalkId: '1798', description: '', children: [] },
      { id: 'wbs_11B_09_02', code: '11B.09.02', name: 'Heated Cabinet', xwalkId: '1799', description: '', children: [] },
      { id: 'wbs_11B_09_03', code: '11B.09.03', name: 'Undercounter Heated Cabinet', xwalkId: '1800', description: '', children: [] },
      { id: 'wbs_11B_09_04', code: '11B.09.04', name: 'Pass-Thru Heated Cabinet', xwalkId: '1801', description: '', children: [] },
      { id: 'wbs_11B_09_05', code: '11B.09.05', name: 'Reach-In Heated Cabinet', xwalkId: '1802', description: '', children: [] },
      { id: 'wbs_11B_09_06', code: '11B.09.06', name: 'Roll-Thru Heated Cabinet', xwalkId: '1803', description: '', children: [] },
      { id: 'wbs_11B_09_07', code: '11B.09.07', name: 'Roll-In Heated Cabinet', xwalkId: '1804', description: '', children: [] },
      { id: 'wbs_11B_09_08', code: '11B.09.08', name: 'Proofer Cabinet', xwalkId: '1805', description: '', children: [] },
      { id: 'wbs_11B_09_09', code: '11B.09.09', name: 'Booster Heater', xwalkId: '1806', description: '', children: [] }
    ] },
    { id: 'wbs_11B_10', code: '11B.10', name: 'Food Service Transport Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_10_01', code: '11B.10.01', name: 'Transport Cart - Cam Carts', xwalkId: '1807', description: '', children: [] },
      { id: 'wbs_11B_10_02', code: '11B.10.02', name: 'Transport Cart - Dish Carts', xwalkId: '1808', description: '', children: [] },
      { id: 'wbs_11B_10_03', code: '11B.10.03', name: 'Transport Cart - Silver Carts', xwalkId: '1809', description: '', children: [] },
      { id: 'wbs_11B_10_04', code: '11B.10.04', name: 'Transport Cart - Utility Carts', xwalkId: '1810', description: '', children: [] },
      { id: 'wbs_11B_10_05', code: '11B.10.05', name: 'Transport Cart - Vendor\'s Carts', xwalkId: '1811', description: '', children: [] },
      { id: 'wbs_11B_10_06', code: '11B.10.06', name: 'Transport Cart - Heated Carts', xwalkId: '1812', description: '', children: [] },
      { id: 'wbs_11B_10_07', code: '11B.10.07', name: 'Transport Cart - Mobile Tray Lowerators', xwalkId: '1813', description: '', children: [] },
      { id: 'wbs_11B_10_08', code: '11B.10.08', name: 'Dollies - Milk Dolly', xwalkId: '1814', description: '', children: [] },
      { id: 'wbs_11B_10_09', code: '11B.10.09', name: 'Dollies - Rack Dolly', xwalkId: '1815', description: '', children: [] }
    ] },
    { id: 'wbs_11B_11', code: '11B.11', name: 'Food Service Counter', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_11_01', code: '11B.11.01', name: 'Counter - Serving counter', xwalkId: '1816', description: '', children: [] },
      { id: 'wbs_11B_11_02', code: '11B.11.02', name: 'Counter - Back Counter', xwalkId: '1817', description: '', children: [] },
      { id: 'wbs_11B_11_03', code: '11B.11.03', name: 'Counter - Beverage Counter', xwalkId: '1818', description: '', children: [] },
      { id: 'wbs_11B_11_04', code: '11B.11.04', name: 'Counter - Snack Counter', xwalkId: '1819', description: '', children: [] },
      { id: 'wbs_11B_11_05', code: '11B.11.05', name: 'Counter - Double Serving counter', xwalkId: '1820', description: '', children: [] },
      { id: 'wbs_11B_11_06', code: '11B.11.06', name: 'Counter - Cold Food Counter', xwalkId: '1821', description: '', children: [] },
      { id: 'wbs_11B_11_07', code: '11B.11.07', name: 'Counter - Hot Food Counter', xwalkId: '1822', description: '', children: [] },
      { id: 'wbs_11B_11_08', code: '11B.11.08', name: 'Counter - Hot/Cold Counter', xwalkId: '1823', description: '', children: [] },
      { id: 'wbs_11B_11_09', code: '11B.11.09', name: 'Counter - Refrigerated Counter', xwalkId: '1824', description: '', children: [] },
      { id: 'wbs_11B_11_10', code: '11B.11.10', name: 'Counter - Novelty Counter', xwalkId: '1825', description: '', children: [] },
      { id: 'wbs_11B_11_11', code: '11B.11.11', name: 'Counter - Cashier Counter', xwalkId: '1826', description: '', children: [] },
      { id: 'wbs_11B_11_12', code: '11B.11.12', name: 'Counter - Filler Counter', xwalkId: '1827', description: '', children: [] },
      { id: 'wbs_11B_11_13', code: '11B.11.13', name: 'Counter - Demo Counter', xwalkId: '1828', description: '', children: [] },
      { id: 'wbs_11B_11_14', code: '11B.11.14', name: 'Counter - Plating/Staging Counter', xwalkId: '1829', description: '', children: [] },
      { id: 'wbs_11B_11_15', code: '11B.11.15', name: 'Counter - Chef\'s Counter', xwalkId: '1830', description: '', children: [] },
      { id: 'wbs_11B_11_16', code: '11B.11.16', name: 'Counter - Non-Refrigerated Display Case', xwalkId: '1831', description: '', children: [] }
    ] },
    { id: 'wbs_11B_12', code: '11B.12', name: 'Beverage Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_12_01', code: '11B.12.01', name: 'Coffee Maker', xwalkId: '1832', description: '', children: [] },
      { id: 'wbs_11B_12_02', code: '11B.12.02', name: 'Tea Brewer/Dispenser', xwalkId: '1833', description: '', children: [] },
      { id: 'wbs_11B_12_03', code: '11B.12.03', name: 'Hot Water Dispenser', xwalkId: '1834', description: '', children: [] },
      { id: 'wbs_11B_12_04', code: '11B.12.04', name: 'Beverage Dispenser', xwalkId: '1835', description: '', children: [] },
      { id: 'wbs_11B_12_05', code: '11B.12.05', name: 'Juice Dispenser', xwalkId: '1836', description: '', children: [] }
    ] },
    { id: 'wbs_11B_13', code: '11B.13', name: 'Food Service Warewash', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_13_01', code: '11B.13.01', name: 'Clean Dish table', xwalkId: '1837', description: '', children: [] },
      { id: 'wbs_11B_13_02', code: '11B.13.02', name: 'Soiled Dish table', xwalkId: '1838', description: '', children: [] },
      { id: 'wbs_11B_13_03', code: '11B.13.03', name: 'Clothes Dryer', xwalkId: '1839', description: '', children: [] },
      { id: 'wbs_11B_13_04', code: '11B.13.04', name: 'Clothes Washer', xwalkId: '1840', description: '', children: [] },
      { id: 'wbs_11B_13_05', code: '11B.13.05', name: 'Dishwasher', xwalkId: '1841', description: '', children: [] }
    ] },
    { id: 'wbs_11B_14', code: '11B.14', name: 'Fire Suppression System', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_14_01', code: '11B.14.01', name: 'Food Service Fire Suppression System', xwalkId: '1842', description: '', children: [] }
    ] },
    { id: 'wbs_11B_15', code: '11B.15', name: 'Food Service Plumbing', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_15_01', code: '11B.15.01', name: 'Food Service Sinks', xwalkId: '1843', description: '', children: [] },
      { id: 'wbs_11B_15_02', code: '11B.15.02', name: 'Food Service Disposer', xwalkId: '1844', description: '', children: [] },
      { id: 'wbs_11B_15_03', code: '11B.15.03', name: 'Food Service Plumbing Accessories', xwalkId: '1845', description: '', children: [] },
      { id: 'wbs_11B_15_04', code: '11B.15.04', name: 'Food Service Plumbing Fixtures', xwalkId: '1846', description: '', children: [] }
    ] },
    { id: 'wbs_11B_16', code: '11B.16', name: 'Food Service HVAC', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_16_01', code: '11B.16.01', name: 'Condensate Hood', xwalkId: '1847', description: '', children: [] },
      { id: 'wbs_11B_16_02', code: '11B.16.02', name: 'Exhaust Hood', xwalkId: '1848', description: '', children: [] },
      { id: 'wbs_11B_16_03', code: '11B.16.03', name: 'Air Curtain', xwalkId: '1849', description: '', children: [] },
      { id: 'wbs_11B_16_04', code: '11B.16.04', name: 'Food Service Fan', xwalkId: '1850', description: '', children: [] },
      { id: 'wbs_11B_16_05', code: '11B.16.05', name: 'Temperature Monitoring System', xwalkId: '1851', description: '', children: [] }
    ] },
    { id: 'wbs_11B_17', code: '11B.17', name: 'Food Service Electrical', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_17_01', code: '11B.17.01', name: 'Kitchen Electrical Accessories', xwalkId: '1852', description: '', children: [] },
      { id: 'wbs_11B_17_02', code: '11B.17.02', name: 'Kitchen Lighting', xwalkId: '1853', description: '', children: [] }
    ] },
    { id: 'wbs_11B_18', code: '11B.18', name: 'Food Service Openings', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_18_01', code: '11B.18.01', name: 'Kitchen Rolldown Door', xwalkId: '1854', description: '', children: [] }
    ] },
    { id: 'wbs_11B_19', code: '11B.19', name: 'Kitchen Wall Protection', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_19_01', code: '11B.19.01', name: 'FS Bumpers Rails', xwalkId: '1855', description: '', children: [] },
      { id: 'wbs_11B_19_02', code: '11B.19.02', name: 'FS Guide Rail', xwalkId: '1856', description: '', children: [] },
      { id: 'wbs_11B_19_03', code: '11B.19.03', name: 'FS Corner Guards', xwalkId: '1857', description: '', children: [] },
      { id: 'wbs_11B_19_04', code: '11B.19.04', name: 'FS Wall Cap', xwalkId: '1858', description: '', children: [] }
    ] },
    { id: 'wbs_11B_20', code: '11B.20', name: 'Kitchen Misc Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11B_20_01', code: '11B.20.01', name: 'FS Disposable Cup Dispenser', xwalkId: '1859', description: '', children: [] },
      { id: 'wbs_11B_20_02', code: '11B.20.02', name: 'FS Ceiling Mounted Mirror', xwalkId: '1860', description: '', children: [] },
      { id: 'wbs_11B_20_03', code: '11B.20.03', name: 'FS Menu Board System', xwalkId: '1861', description: '', children: [] },
      { id: 'wbs_11B_20_04', code: '11B.20.04', name: 'Kitchenware', xwalkId: '1862', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11C', code: '11C', name: 'A/V Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11C_01', code: '11C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11C_01_01', code: '11C.01.01', name: 'Mobilization', xwalkId: '1863', description: '', children: [] },
      { id: 'wbs_11C_01_02', code: '11C.01.02', name: 'Bond/Permit', xwalkId: '1864', description: '', children: [] },
      { id: 'wbs_11C_01_03', code: '11C.01.03', name: 'Submittals', xwalkId: '1865', description: '', children: [] },
      { id: 'wbs_11C_01_07', code: '11C.01.07', name: 'Close-Out', xwalkId: '1866', description: '', children: [] },
      { id: 'wbs_11C_01_09', code: '11C.01.09', name: 'Cleaning', xwalkId: '1867', description: '', children: [] }
    ] },
    { id: 'wbs_11C_02', code: '11C.02', name: 'Projection Screens', xwalkId: '', description: '', children: [
      { id: 'wbs_11C_02_10', code: '11C.02.10', name: 'Electrical Projection Screens', xwalkId: '1868', description: '', children: [] },
      { id: 'wbs_11C_02_20', code: '11C.02.20', name: 'Manual Projection Screens', xwalkId: '1869', description: '', children: [] }
    ] },
    { id: 'wbs_11C_03', code: '11C.03', name: 'AV Equipment Support', xwalkId: '', description: '', children: [
      { id: 'wbs_11C_03_10', code: '11C.03.10', name: 'TV/LCD Panel Mounts', xwalkId: '1870', description: '', children: [] },
      { id: 'wbs_11C_03_20', code: '11C.03.20', name: 'Projector Mounts', xwalkId: '1871', description: '', children: [] }
    ] },
    { id: 'wbs_11C_04', code: '11C.04', name: 'AV Equipment (OFCI)', xwalkId: '', description: '', children: [
      { id: 'wbs_11C_04_10', code: '11C.04.10', name: 'AV Equipment (OFCI) - TV/LCD Panel', xwalkId: '1872', description: '', children: [] },
      { id: 'wbs_11C_04_20', code: '11C.04.20', name: 'AV Equipment (OFCI) - Projector', xwalkId: '1873', description: '', children: [] },
      { id: 'wbs_11C_04_30', code: '11C.04.30', name: 'AV Equipment (OFCI) - Smartboard', xwalkId: '1874', description: '', children: [] },
      { id: 'wbs_11C_04_40', code: '11C.04.40', name: 'AV Equipment (OFCI) - Projection Screen', xwalkId: '1875', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11D', code: '11D', name: 'Theatrical Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11D_00', code: '11D.00', name: 'Theatrical Equipment System', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_00_00', code: '11D.00.00', name: 'Theatrical Equipment - Turnkey', xwalkId: '1876', description: '', children: [] },
      { id: 'wbs_11D_00_01', code: '11D.00.01', name: 'Theatrical Equipment - Allowance', xwalkId: '1877', description: '', children: [] }
    ] },
    { id: 'wbs_11D_01', code: '11D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_01_01', code: '11D.01.01', name: 'Mobilization', xwalkId: '1878', description: '', children: [] },
      { id: 'wbs_11D_01_02', code: '11D.01.02', name: 'Bond/Permit', xwalkId: '1879', description: '', children: [] },
      { id: 'wbs_11D_01_03', code: '11D.01.03', name: 'Submittals', xwalkId: '1880', description: '', children: [] },
      { id: 'wbs_11D_01_05', code: '11D.01.05', name: 'Supervision', xwalkId: '1881', description: '', children: [] },
      { id: 'wbs_11D_01_07', code: '11D.01.07', name: 'Close-Out', xwalkId: '1882', description: '', children: [] },
      { id: 'wbs_11D_01_09', code: '11D.01.09', name: 'Cleaning', xwalkId: '1883', description: '', children: [] },
      { id: 'wbs_11D_01_12', code: '11D.01.12', name: 'Commissioning', xwalkId: '1884', description: '', children: [] },
      { id: 'wbs_11D_01_13', code: '11D.01.13', name: 'Testing', xwalkId: '1885', description: '', children: [] }
    ] },
    { id: 'wbs_11D_02', code: '11D.02', name: 'Stage Rigging', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_02_01', code: '11D.02.01', name: 'Pipe Grid', xwalkId: '1886', description: '', children: [] },
      { id: 'wbs_11D_02_02', code: '11D.02.02', name: 'Rigging Equipment', xwalkId: '1887', description: '', children: [] }
    ] },
    { id: 'wbs_11D_03', code: '11D.03', name: 'Stage Fabric', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_03_01', code: '11D.03.01', name: 'Stage Curtains', xwalkId: '1888', description: '', children: [] },
      { id: 'wbs_11D_03_02', code: '11D.03.02', name: 'Draperies', xwalkId: '1889', description: '', children: [] }
    ] },
    { id: 'wbs_11D_04', code: '11D.04', name: 'Stage Acoustic', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_04_01', code: '11D.04.01', name: 'Acoustical Shell/Tower', xwalkId: '1890', description: '', children: [] },
      { id: 'wbs_11D_04_02', code: '11D.04.02', name: 'Acoustic Banner', xwalkId: '1891', description: '', children: [] }
    ] },
    { id: 'wbs_11D_05', code: '11D.05', name: 'Stage Lighting', xwalkId: '', description: '', children: [
      { id: 'wbs_11D_05_01', code: '11D.05.01', name: 'Theatrical Lighting Instruments & Fixtures', xwalkId: '1892', description: '', children: [] },
      { id: 'wbs_11D_05_02', code: '11D.05.02', name: 'Theatrical Lighting Dimming & Controls', xwalkId: '1893', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11E', code: '11E', name: 'Gym Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11E_01', code: '11E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_01_01', code: '11E.01.01', name: 'Mobilization', xwalkId: '1894', description: '', children: [] },
      { id: 'wbs_11E_01_02', code: '11E.01.02', name: 'Bond/Permit', xwalkId: '1895', description: '', children: [] },
      { id: 'wbs_11E_01_03', code: '11E.01.03', name: 'Submittals', xwalkId: '1896', description: '', children: [] },
      { id: 'wbs_11E_01_04', code: '11E.01.04', name: 'Equip Rentals', xwalkId: '1897', description: '', children: [] },
      { id: 'wbs_11E_01_07', code: '11E.01.07', name: 'Close-Out', xwalkId: '1898', description: '', children: [] },
      { id: 'wbs_11E_01_09', code: '11E.01.09', name: 'Cleaning', xwalkId: '1899', description: '', children: [] }
    ] },
    { id: 'wbs_11E_02', code: '11E.02', name: 'Interior Basketball Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_02_01', code: '11E.02.01', name: 'Interior Basketball Goal - Fixed Backstop', xwalkId: '1900', description: '', children: [] },
      { id: 'wbs_11E_02_02', code: '11E.02.02', name: 'Interior Basketball Goal - Retractable Backstop', xwalkId: '1901', description: '', children: [] }
    ] },
    { id: 'wbs_11E_03', code: '11E.03', name: 'Exterior Basketball Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_03_01', code: '11E.03.01', name: 'Exterior Basketball Goal - Fixed Backstop', xwalkId: '1902', description: '', children: [] },
      { id: 'wbs_11E_03_02', code: '11E.03.02', name: 'Exterior Basketball Goal - Retractable Backstop', xwalkId: '1903', description: '', children: [] },
      { id: 'wbs_11E_03_03', code: '11E.03.03', name: 'Exterior Basketball Barrier Netting', xwalkId: '1904', description: '', children: [] }
    ] },
    { id: 'wbs_11E_04', code: '11E.04', name: 'Interior Volleyball Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_04_01', code: '11E.04.01', name: 'Volleyball Sleeves', xwalkId: '1905', description: '', children: [] },
      { id: 'wbs_11E_04_02', code: '11E.04.02', name: 'Volleyball Posts & Net', xwalkId: '1906', description: '', children: [] },
      { id: 'wbs_11E_04_03', code: '11E.04.03', name: 'Volleyball Official\'s Platform', xwalkId: '1907', description: '', children: [] },
      { id: 'wbs_11E_04_04', code: '11E.04.04', name: 'Ceiling Suspended Volleyball Equipment', xwalkId: '1908', description: '', children: [] }
    ] },
    { id: 'wbs_11E_05', code: '11E.05', name: 'Scoreboard', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_05_01', code: '11E.05.01', name: 'Interior Scoreboards', xwalkId: '1909', description: '', children: [] },
      { id: 'wbs_11E_05_02', code: '11E.05.02', name: 'Interior Scoreboard Controls', xwalkId: '1910', description: '', children: [] }
    ] },
    { id: 'wbs_11E_06', code: '11E.06', name: 'Interior Athletic Equipment Storage', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_06_01', code: '11E.06.01', name: 'Volleyball Standard Wall Storage Rack', xwalkId: '1911', description: '', children: [] },
      { id: 'wbs_11E_06_02', code: '11E.06.02', name: 'Volleyball Transport/Storage Cart', xwalkId: '1912', description: '', children: [] },
      { id: 'wbs_11E_06_03', code: '11E.06.03', name: 'Interior Athletic Storage/Casework', xwalkId: '1913', description: '', children: [] },
      { id: 'wbs_11E_06_04', code: '11E.06.04', name: 'Interior Athletic Hooks', xwalkId: '1914', description: '', children: [] }
    ] },
    { id: 'wbs_11E_07', code: '11E.07', name: 'Misc Gym Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_07_01', code: '11E.07.01', name: 'Gym Safety Wall Pads', xwalkId: '1915', description: '', children: [] },
      { id: 'wbs_11E_07_02', code: '11E.07.02', name: 'Gym Divider Curtain', xwalkId: '1916', description: '', children: [] },
      { id: 'wbs_11E_07_03', code: '11E.07.03', name: 'Wrestling Mat Lift', xwalkId: '1917', description: '', children: [] },
      { id: 'wbs_11E_07_04', code: '11E.07.04', name: 'Wrestling Mat', xwalkId: '1918', description: '', children: [] },
      { id: 'wbs_11E_07_05', code: '11E.07.05', name: 'Ballet Barre', xwalkId: '1919', description: '', children: [] },
      { id: 'wbs_11E_07_06', code: '11E.07.06', name: 'Whirlpool - Athletic', xwalkId: '1920', description: '', children: [] },
      { id: 'wbs_11E_07_07', code: '11E.07.07', name: 'Wall Pads - De-escalation Room', xwalkId: '1921', description: '', children: [] }
    ] },
    { id: 'wbs_11E_08', code: '11E.08', name: 'Exercise Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11E_08_10', code: '11E.08.10', name: 'Treadmills', xwalkId: '1922', description: '', children: [] },
      { id: 'wbs_11E_08_20', code: '11E.08.20', name: 'Training Machines', xwalkId: '1923', description: '', children: [] },
      { id: 'wbs_11E_08_21', code: '11E.08.21', name: 'Elliptical Machine', xwalkId: '1924', description: '', children: [] },
      { id: 'wbs_11E_08_22', code: '11E.08.22', name: 'Leg Curl Machine', xwalkId: '1925', description: '', children: [] },
      { id: 'wbs_11E_08_23', code: '11E.08.23', name: 'Shoulder Press Machine', xwalkId: '1926', description: '', children: [] },
      { id: 'wbs_11E_08_24', code: '11E.08.24', name: 'Training Multi Machine', xwalkId: '1927', description: '', children: [] },
      { id: 'wbs_11E_08_30', code: '11E.08.30', name: 'Upright Bikes', xwalkId: '1928', description: '', children: [] },
      { id: 'wbs_11E_08_40', code: '11E.08.40', name: 'Workout Benches', xwalkId: '1929', description: '', children: [] },
      { id: 'wbs_11E_08_50', code: '11E.08.50', name: 'Dumbbell Racks', xwalkId: '1930', description: '', children: [] },
      { id: 'wbs_11E_08_60', code: '11E.08.60', name: 'Taping Station', xwalkId: '1931', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11F', code: '11F', name: 'Library Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11F_00', code: '11F.00', name: 'Library Furniture System', xwalkId: '', description: '', children: [
      { id: 'wbs_11F_00_01', code: '11F.00.01', name: 'Library Furniture (Turnkey)', xwalkId: '1932', description: '', children: [] }
    ] },
    { id: 'wbs_11F_01', code: '11F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11F_01_01', code: '11F.01.01', name: 'Mobilization', xwalkId: '1933', description: '', children: [] },
      { id: 'wbs_11F_01_02', code: '11F.01.02', name: 'Bond/Permit', xwalkId: '1934', description: '', children: [] },
      { id: 'wbs_11F_01_03', code: '11F.01.03', name: 'Submittals', xwalkId: '1935', description: '', children: [] },
      { id: 'wbs_11F_01_05', code: '11F.01.05', name: 'Supervision', xwalkId: '1936', description: '', children: [] },
      { id: 'wbs_11F_01_06', code: '11F.01.06', name: 'Demobilization', xwalkId: '1937', description: '', children: [] },
      { id: 'wbs_11F_01_07', code: '11F.01.07', name: 'Close-Out', xwalkId: '1938', description: '', children: [] },
      { id: 'wbs_11F_01_09', code: '11F.01.09', name: 'Cleaning', xwalkId: '1939', description: '', children: [] }
    ] },
    { id: 'wbs_11F_02', code: '11F.02', name: 'Library Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11F_02_01', code: '11F.02.01', name: 'Book Depository', xwalkId: '1940', description: '', children: [] },
      { id: 'wbs_11F_02_02', code: '11F.02.02', name: 'Book Theft Detection System', xwalkId: '1941', description: '', children: [] },
      { id: 'wbs_11F_02_03', code: '11F.02.03', name: 'Book Carts', xwalkId: '1942', description: '', children: [] }
    ] },
    { id: 'wbs_11F_03', code: '11F.03', name: 'Library Storage System', xwalkId: '', description: '', children: [
      { id: 'wbs_11F_03_01', code: '11F.03.01', name: 'Library Stack System', xwalkId: '1943', description: '', children: [] },
      { id: 'wbs_11F_03_02', code: '11F.03.02', name: 'Library Shelving', xwalkId: '1944', description: '', children: [] },
      { id: 'wbs_11F_03_03', code: '11F.03.03', name: 'Magazine/Newspaper Racks', xwalkId: '1945', description: '', children: [] }
    ] },
    { id: 'wbs_11F_04', code: '11F.04', name: 'Library Casework', xwalkId: '', description: '', children: [
      { id: 'wbs_11F_04_01', code: '11F.04.01', name: 'Library Circulation Desk', xwalkId: '1946', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11G', code: '11G', name: 'Playground Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11G_00', code: '11G.00', name: 'Play Structures & Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_00_00', code: '11G.00.00', name: 'Playground Equipment - Turnkey', xwalkId: '1947', description: '', children: [] },
      { id: 'wbs_11G_00_01', code: '11G.00.01', name: 'Playground - Allowance', xwalkId: '3615', description: '', children: [] }
    ] },
    { id: 'wbs_11G_01', code: '11G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_01_01', code: '11G.01.01', name: 'Mobilization', xwalkId: '1948', description: '', children: [] },
      { id: 'wbs_11G_01_02', code: '11G.01.02', name: 'Bond/Permit', xwalkId: '1949', description: '', children: [] },
      { id: 'wbs_11G_01_03', code: '11G.01.03', name: 'Submittals', xwalkId: '1950', description: '', children: [] },
      { id: 'wbs_11G_01_04', code: '11G.01.04', name: 'Equip Rentals', xwalkId: '1951', description: '', children: [] },
      { id: 'wbs_11G_01_07', code: '11G.01.07', name: 'Close-Out', xwalkId: '1952', description: '', children: [] },
      { id: 'wbs_11G_01_09', code: '11G.01.09', name: 'Cleaning', xwalkId: '1953', description: '', children: [] }
    ] },
    { id: 'wbs_11G_02', code: '11G.02', name: 'Play Structures', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_02_10', code: '11G.02.10', name: 'Pirate Ship Play Center', xwalkId: '1954', description: '', children: [] },
      { id: 'wbs_11G_02_20', code: '11G.02.20', name: 'Custom Play Center', xwalkId: '1955', description: '', children: [] }
    ] },
    { id: 'wbs_11G_03', code: '11G.03', name: 'Playground Freestanding Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_03_10', code: '11G.03.10', name: 'Swing Sets', xwalkId: '1956', description: '', children: [] },
      { id: 'wbs_11G_03_20', code: '11G.03.20', name: 'Slide', xwalkId: '1957', description: '', children: [] },
      { id: 'wbs_11G_03_30', code: '11G.03.30', name: 'Spinner', xwalkId: '1958', description: '', children: [] },
      { id: 'wbs_11G_03_40', code: '11G.03.40', name: 'Rocking/Springing Equipment', xwalkId: '1959', description: '', children: [] },
      { id: 'wbs_11G_03_50', code: '11G.03.50', name: 'See-Saw', xwalkId: '1960', description: '', children: [] },
      { id: 'wbs_11G_03_60', code: '11G.03.60', name: 'Tunnel/Crawl Tube', xwalkId: '1961', description: '', children: [] },
      { id: 'wbs_11G_03_70', code: '11G.03.70', name: 'Climber', xwalkId: '1962', description: '', children: [] },
      { id: 'wbs_11G_03_80', code: '11G.03.80', name: 'Playground Misc Equipment', xwalkId: '1963', description: '', children: [] }
    ] },
    { id: 'wbs_11G_04', code: '11G.04', name: 'Playground Learning Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_04_10', code: '11G.04.10', name: 'Playground Musical Instruments', xwalkId: '1964', description: '', children: [] },
      { id: 'wbs_11G_04_20', code: '11G.04.20', name: 'Playground Learning Walls', xwalkId: '1965', description: '', children: [] }
    ] },
    { id: 'wbs_11G_05', code: '11G.05', name: 'Playground Sculptures', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_05_10', code: '11G.05.10', name: 'Playground Concrete Sculptures', xwalkId: '1966', description: '', children: [] },
      { id: 'wbs_11G_05_20', code: '11G.05.20', name: 'Playground GFRC Sculptures', xwalkId: '1967', description: '', children: [] }
    ] },
    { id: 'wbs_11G_06', code: '11G.06', name: 'Playground Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_11G_06_10', code: '11G.06.10', name: 'Playground Borders', xwalkId: '1968', description: '', children: [] },
      { id: 'wbs_11G_06_20', code: '11G.06.20', name: 'Playground Wear Mats', xwalkId: '1969', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11H', code: '11H', name: 'Kiln', xwalkId: '', description: '', children: [
    { id: 'wbs_11H_01', code: '11H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11H_01_01', code: '11H.01.01', name: 'Mobilization', xwalkId: '1970', description: '', children: [] },
      { id: 'wbs_11H_01_02', code: '11H.01.02', name: 'Bond/Permit', xwalkId: '1971', description: '', children: [] },
      { id: 'wbs_11H_01_03', code: '11H.01.03', name: 'Submittals', xwalkId: '1972', description: '', children: [] }
    ] },
    { id: 'wbs_11H_02', code: '11H.02', name: 'Ceramic & Pottery Kiln', xwalkId: '', description: '', children: [
      { id: 'wbs_11H_02_01', code: '11H.02.01', name: 'Ceramic Kilns', xwalkId: '1973', description: '', children: [] },
      { id: 'wbs_11H_02_02', code: '11H.02.02', name: 'Kiln Ventilation System', xwalkId: '1974', description: '', children: [] },
      { id: 'wbs_11H_02_03', code: '11H.02.03', name: 'Drying Racks at Kiln', xwalkId: '1975', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11I', code: '11I', name: 'Shop Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11I_01', code: '11I.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_01_01', code: '11I.01.01', name: 'Mobilization', xwalkId: '1976', description: '', children: [] },
      { id: 'wbs_11I_01_02', code: '11I.01.02', name: 'Bond/Permit', xwalkId: '1977', description: '', children: [] },
      { id: 'wbs_11I_01_03', code: '11I.01.03', name: 'Submittals', xwalkId: '1978', description: '', children: [] },
      { id: 'wbs_11I_01_04', code: '11I.01.04', name: 'Equip Rentals', xwalkId: '1979', description: '', children: [] },
      { id: 'wbs_11I_01_07', code: '11I.01.07', name: 'Close-Out', xwalkId: '1980', description: '', children: [] },
      { id: 'wbs_11I_01_09', code: '11I.01.09', name: 'Cleaning', xwalkId: '1981', description: '', children: [] }
    ] },
    { id: 'wbs_11I_02', code: '11I.02', name: 'Metal Shop Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_02_10', code: '11I.02.10', name: 'Machine Tools', xwalkId: '1982', description: '', children: [] },
      { id: 'wbs_11I_02_11', code: '11I.02.11', name: 'Lathe', xwalkId: '1983', description: '', children: [] },
      { id: 'wbs_11I_02_12', code: '11I.02.12', name: 'Shaper/Planer/Sanders', xwalkId: '1984', description: '', children: [] },
      { id: 'wbs_11I_02_13', code: '11I.02.13', name: 'Drill', xwalkId: '1985', description: '', children: [] },
      { id: 'wbs_11I_02_14', code: '11I.02.14', name: 'Mill', xwalkId: '1986', description: '', children: [] },
      { id: 'wbs_11I_02_15', code: '11I.02.15', name: 'Grinder', xwalkId: '1987', description: '', children: [] },
      { id: 'wbs_11I_02_16', code: '11I.02.16', name: 'Saw', xwalkId: '1988', description: '', children: [] },
      { id: 'wbs_11I_02_17', code: '11I.02.17', name: 'Press', xwalkId: '1989', description: '', children: [] },
      { id: 'wbs_11I_02_18', code: '11I.02.18', name: 'Welder', xwalkId: '1990', description: '', children: [] },
      { id: 'wbs_11I_02_19', code: '11I.02.19', name: 'Plasma Cutter', xwalkId: '1991', description: '', children: [] },
      { id: 'wbs_11I_02_31', code: '11I.02.31', name: 'Liquid Handling Equipment', xwalkId: '1992', description: '', children: [] }
    ] },
    { id: 'wbs_11I_03', code: '11I.03', name: 'Shop Furniture', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_03_10', code: '11I.03.10', name: 'Welding Benches', xwalkId: '1993', description: '', children: [] },
      { id: 'wbs_11I_03_20', code: '11I.03.20', name: 'Welding Screens', xwalkId: '1994', description: '', children: [] },
      { id: 'wbs_11I_03_30', code: '11I.03.30', name: 'Shop Storage Bins', xwalkId: '1995', description: '', children: [] },
      { id: 'wbs_11I_03_40', code: '11I.03.40', name: 'Liquid Storage Tanks', xwalkId: '1996', description: '', children: [] },
      { id: 'wbs_11I_03_50', code: '11I.03.50', name: 'Welding Tables', xwalkId: '1997', description: '', children: [] }
    ] },
    { id: 'wbs_11I_04', code: '11I.04', name: 'Auto Shop Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_04_10', code: '11I.04.10', name: 'Vehicle Service Equipment', xwalkId: '1998', description: '', children: [] },
      { id: 'wbs_11I_04_11', code: '11I.04.11', name: 'Auto Lift', xwalkId: '1999', description: '', children: [] },
      { id: 'wbs_11I_04_12', code: '11I.04.12', name: 'Compressed-Air Vehicle Service Equipment', xwalkId: '2000', description: '', children: [] },
      { id: 'wbs_11I_04_13', code: '11I.04.13', name: 'Vehicle Lubrication Equipment', xwalkId: '2001', description: '', children: [] },
      { id: 'wbs_11I_04_14', code: '11I.04.14', name: 'Tire-Changing Equipment', xwalkId: '2002', description: '', children: [] },
      { id: 'wbs_11I_04_20', code: '11I.04.20', name: 'Vehicle-Washing Equipment', xwalkId: '2003', description: '', children: [] },
      { id: 'wbs_11I_04_30', code: '11I.04.30', name: 'Vehicle Charging Equipment', xwalkId: '2004', description: '', children: [] }
    ] },
    { id: 'wbs_11I_05', code: '11I.05', name: 'Photo Lab Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_05_10', code: '11I.05.10', name: 'Photo Processing Equipment', xwalkId: '2005', description: '', children: [] },
      { id: 'wbs_11I_05_20', code: '11I.05.20', name: 'Photo Lab - Green Screen', xwalkId: '2006', description: '', children: [] }
    ] },
    { id: 'wbs_11I_06', code: '11I.06', name: 'Agricultural Shop Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11I_06_10', code: '11I.06.10', name: 'Agricultural Equipment', xwalkId: '2007', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11J', code: '11J', name: 'Misc Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11J_01', code: '11J.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11J_01_01', code: '11J.01.01', name: 'Mobilization', xwalkId: '2008', description: '', children: [] },
      { id: 'wbs_11J_01_02', code: '11J.01.02', name: 'Bond/Permit', xwalkId: '2009', description: '', children: [] },
      { id: 'wbs_11J_01_03', code: '11J.01.03', name: 'Submittals', xwalkId: '2010', description: '', children: [] },
      { id: 'wbs_11J_01_04', code: '11J.01.04', name: 'Equip Rentals', xwalkId: '2011', description: '', children: [] },
      { id: 'wbs_11J_01_07', code: '11J.01.07', name: 'Close-Out', xwalkId: '2012', description: '', children: [] },
      { id: 'wbs_11J_01_09', code: '11J.01.09', name: 'Cleaning', xwalkId: '2013', description: '', children: [] },
      { id: 'wbs_11J_01_13', code: '11J.01.13', name: 'Testing', xwalkId: '2014', description: '', children: [] }
    ] },
    { id: 'wbs_11J_02', code: '11J.02', name: 'Musical Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11J_02_10', code: '11J.02.10', name: 'Musical Instruments', xwalkId: '2015', description: '', children: [] },
      { id: 'wbs_11J_02_20', code: '11J.02.20', name: 'Pianos', xwalkId: '2016', description: '', children: [] },
      { id: 'wbs_11J_02_21', code: '11J.02.21', name: 'Pianos - Baby Grand Piano', xwalkId: '2017', description: '', children: [] }
    ] },
    { id: 'wbs_11J_03', code: '11J.03', name: 'Shipping Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11J_03_10', code: '11J.03.10', name: 'Ship Center - Powered Conveyor', xwalkId: '2018', description: '', children: [] },
      { id: 'wbs_11J_03_20', code: '11J.03.20', name: 'Ship Center - Packaging Table', xwalkId: '2019', description: '', children: [] },
      { id: 'wbs_11J_03_30', code: '11J.03.30', name: 'Ship Center - Sales POS Counter', xwalkId: '2020', description: '', children: [] },
      { id: 'wbs_11J_03_40', code: '11J.03.40', name: 'Ship Center - Storage Cabinets', xwalkId: '2021', description: '', children: [] },
      { id: 'wbs_11J_03_50', code: '11J.03.50', name: 'Ship Center - Bulk Storage Racks', xwalkId: '2022', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11K', code: '11K', name: 'Parking Control Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11K_01', code: '11K.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11K_01_01', code: '11K.01.01', name: 'Mobilization', xwalkId: '2023', description: '', children: [] },
      { id: 'wbs_11K_01_02', code: '11K.01.02', name: 'Bond/Permit', xwalkId: '2024', description: '', children: [] },
      { id: 'wbs_11K_01_03', code: '11K.01.03', name: 'Submittals', xwalkId: '2025', description: '', children: [] },
      { id: 'wbs_11K_01_04', code: '11K.01.04', name: 'Equip Rentals', xwalkId: '2026', description: '', children: [] },
      { id: 'wbs_11K_01_07', code: '11K.01.07', name: 'Close-Out', xwalkId: '2027', description: '', children: [] },
      { id: 'wbs_11K_01_09', code: '11K.01.09', name: 'Cleaning', xwalkId: '2028', description: '', children: [] }
    ] },
    { id: 'wbs_11K_02', code: '11K.02', name: 'Parking Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_11K_02_10', code: '11K.02.10', name: 'Lift Arm Parking Gates', xwalkId: '2029', description: '', children: [] },
      { id: 'wbs_11K_02_20', code: '11K.02.20', name: 'Sliding Parking Gates', xwalkId: '2030', description: '', children: [] },
      { id: 'wbs_11K_02_30', code: '11K.02.30', name: 'Swinging Parking Gates', xwalkId: '2031', description: '', children: [] },
      { id: 'wbs_11K_02_40', code: '11K.02.40', name: 'Parking Gates - Gate Operator', xwalkId: '2032', description: '', children: [] }
    ] },
    { id: 'wbs_11K_03', code: '11K.03', name: 'Vehicle Access Control System', xwalkId: '', description: '', children: [
      { id: 'wbs_11K_03_10', code: '11K.03.10', name: 'Vehicle Detectors', xwalkId: '2033', description: '', children: [] },
      { id: 'wbs_11K_03_20', code: '11K.03.20', name: 'Vehicle Access Control Units', xwalkId: '2034', description: '', children: [] }
    ] },
    { id: 'wbs_11K_04', code: '11K.04', name: 'Parking Fee Collection System', xwalkId: '', description: '', children: [
      { id: 'wbs_11K_04_10', code: '11K.04.10', name: 'Parking Ticket Dispensers', xwalkId: '2035', description: '', children: [] },
      { id: 'wbs_11K_04_20', code: '11K.04.20', name: 'Parking Meters', xwalkId: '2036', description: '', children: [] },
      { id: 'wbs_11K_04_30', code: '11K.04.30', name: 'Parking Fee Coin Collection Equipment', xwalkId: '2037', description: '', children: [] }
    ] },
    { id: 'wbs_11K_05', code: '11K.05', name: 'Garage Parking Management System', xwalkId: '', description: '', children: [
      { id: 'wbs_11K_05_10', code: '11K.05.10', name: 'Parking Access Control System', xwalkId: '2038', description: '', children: [] },
      { id: 'wbs_11K_05_20', code: '11K.05.20', name: 'Parking Revenue Control System', xwalkId: '2039', description: '', children: [] },
      { id: 'wbs_11K_05_30', code: '11K.05.30', name: 'Parking Guidance System', xwalkId: '2040', description: '', children: [] },
      { id: 'wbs_11K_05_40', code: '11K.05.40', name: 'License Plate Recognition System', xwalkId: '2041', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11L', code: '11L', name: 'Loading Dock Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11L_01', code: '11L.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11L_01_01', code: '11L.01.01', name: 'Mobilization', xwalkId: '2042', description: '', children: [] },
      { id: 'wbs_11L_01_02', code: '11L.01.02', name: 'Bond/Permit', xwalkId: '2043', description: '', children: [] },
      { id: 'wbs_11L_01_03', code: '11L.01.03', name: 'Submittals', xwalkId: '2044', description: '', children: [] },
      { id: 'wbs_11L_01_04', code: '11L.01.04', name: 'Equip Rentals', xwalkId: '2045', description: '', children: [] },
      { id: 'wbs_11L_01_07', code: '11L.01.07', name: 'Close-Out', xwalkId: '2046', description: '', children: [] },
      { id: 'wbs_11L_01_09', code: '11L.01.09', name: 'Cleaning', xwalkId: '2047', description: '', children: [] }
    ] },
    { id: 'wbs_11L_02', code: '11L.02', name: 'Loading Dock Seals & Shelters', xwalkId: '', description: '', children: [
      { id: 'wbs_11L_02_10', code: '11L.02.10', name: 'Loading Dock Seals', xwalkId: '2048', description: '', children: [] },
      { id: 'wbs_11L_02_20', code: '11L.02.20', name: 'Loading Dock Shelters', xwalkId: '2049', description: '', children: [] },
      { id: 'wbs_11L_02_30', code: '11L.02.30', name: 'Loading Dock Seal Hood', xwalkId: '2050', description: '', children: [] },
      { id: 'wbs_11L_02_40', code: '11L.02.40', name: 'Loading Dock Canopies', xwalkId: '2051', description: '', children: [] }
    ] },
    { id: 'wbs_11L_03', code: '11L.03', name: 'Stationary Loading Dock Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11L_03_10', code: '11L.03.10', name: 'Loading Dock Levelers', xwalkId: '2052', description: '', children: [] },
      { id: 'wbs_11L_03_20', code: '11L.03.20', name: 'Loading Dock Lifts', xwalkId: '2053', description: '', children: [] },
      { id: 'wbs_11L_03_30', code: '11L.03.30', name: 'Loading Dock Truck Restraints', xwalkId: '2054', description: '', children: [] },
      { id: 'wbs_11L_03_40', code: '11L.03.40', name: 'Loading Dock Light Communication System', xwalkId: '2055', description: '', children: [] },
      { id: 'wbs_11L_03_50', code: '11L.03.50', name: 'Steel Dock Pit/Angle Kit', xwalkId: '2056', description: '', children: [] },
      { id: 'wbs_11L_03_60', code: '11L.03.60', name: 'Dock Guard Barrier Lip', xwalkId: '2057', description: '', children: [] }
    ] },
    { id: 'wbs_11L_04', code: '11L.04', name: 'Loading Dock Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_11L_04_10', code: '11L.04.10', name: 'Loading Dock Bumpers', xwalkId: '2058', description: '', children: [] },
      { id: 'wbs_11L_04_20', code: '11L.04.20', name: 'Loading Dock Lights', xwalkId: '2059', description: '', children: [] },
      { id: 'wbs_11L_04_30', code: '11L.04.30', name: 'Loading Dock Fans', xwalkId: '2060', description: '', children: [] },
      { id: 'wbs_11L_04_40', code: '11L.04.40', name: 'Loading Dock Safety Gates', xwalkId: '2061', description: '', children: [] },
      { id: 'wbs_11L_04_50', code: '11L.04.50', name: 'Loading Dock Door Guards', xwalkId: '2062', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11M', code: '11M', name: 'Pedestrian Control Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11M_01', code: '11M.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11M_01_01', code: '11M.01.01', name: 'Mobilization', xwalkId: '2063', description: '', children: [] },
      { id: 'wbs_11M_01_02', code: '11M.01.02', name: 'Bond/Permit', xwalkId: '2064', description: '', children: [] },
      { id: 'wbs_11M_01_03', code: '11M.01.03', name: 'Submittals', xwalkId: '2065', description: '', children: [] },
      { id: 'wbs_11M_01_04', code: '11M.01.04', name: 'Equip Rentals', xwalkId: '2066', description: '', children: [] },
      { id: 'wbs_11M_01_07', code: '11M.01.07', name: 'Close-Out', xwalkId: '2067', description: '', children: [] },
      { id: 'wbs_11M_01_09', code: '11M.01.09', name: 'Cleaning', xwalkId: '2068', description: '', children: [] }
    ] },
    { id: 'wbs_11M_02', code: '11M.02', name: 'Interior Pedestrian Control Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11M_02_10', code: '11M.02.10', name: 'Interior Pedestrian Rotary Gates', xwalkId: '2069', description: '', children: [] },
      { id: 'wbs_11M_02_20', code: '11M.02.20', name: 'Interior Pedestrian Turnstiles', xwalkId: '2070', description: '', children: [] },
      { id: 'wbs_11M_02_30', code: '11M.02.30', name: 'Interior Pedestrian Control Devices', xwalkId: '2071', description: '', children: [] },
      { id: 'wbs_11M_02_40', code: '11M.02.40', name: 'Interior Pedestrian Access Control System', xwalkId: '2072', description: '', children: [] },
      { id: 'wbs_11M_02_50', code: '11M.02.50', name: 'Pedestrian Electronic Detection & Counting Equipment', xwalkId: '2073', description: '', children: [] },
      { id: 'wbs_11M_02_60', code: '11M.02.60', name: 'Pedestrian Fare Collection Equipment', xwalkId: '2074', description: '', children: [] }
    ] },
    { id: 'wbs_11M_03', code: '11M.03', name: 'Exterior Pedestrian Control Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11M_03_10', code: '11M.03.10', name: 'Exterior Pedestrian Rotary Gates', xwalkId: '2075', description: '', children: [] },
      { id: 'wbs_11M_03_20', code: '11M.03.20', name: 'Exterior Pedestrian Turnstiles', xwalkId: '2076', description: '', children: [] },
      { id: 'wbs_11M_03_30', code: '11M.03.30', name: 'Exterior Pedestrian Control Devices', xwalkId: '2077', description: '', children: [] },
      { id: 'wbs_11M_03_40', code: '11M.03.40', name: 'Exterior Pedestrian Access Control System', xwalkId: '2078', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11N', code: '11N', name: 'Recreational Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11N_01', code: '11N.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11N_01_01', code: '11N.01.01', name: 'Mobilization', xwalkId: '2079', description: '', children: [] },
      { id: 'wbs_11N_01_02', code: '11N.01.02', name: 'Bond/Permit', xwalkId: '2080', description: '', children: [] },
      { id: 'wbs_11N_01_03', code: '11N.01.03', name: 'Submittals', xwalkId: '2081', description: '', children: [] },
      { id: 'wbs_11N_01_04', code: '11N.01.04', name: 'Equip Rentals', xwalkId: '2082', description: '', children: [] },
      { id: 'wbs_11N_01_07', code: '11N.01.07', name: 'Close-Out', xwalkId: '2083', description: '', children: [] },
      { id: 'wbs_11N_01_09', code: '11N.01.09', name: 'Cleaning', xwalkId: '2084', description: '', children: [] }
    ] },
    { id: 'wbs_11N_02', code: '11N.02', name: 'Indoor Recreational Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11N_02_10', code: '11N.02.10', name: 'Bowling Alley Equipment', xwalkId: '2085', description: '', children: [] },
      { id: 'wbs_11N_02_20', code: '11N.02.20', name: 'Shooting Range Equipment', xwalkId: '2086', description: '', children: [] },
      { id: 'wbs_11N_02_30', code: '11N.02.30', name: 'Climbing Wall', xwalkId: '2087', description: '', children: [] },
      { id: 'wbs_11N_02_40', code: '11N.02.40', name: 'Indoor Table Games', xwalkId: '2088', description: '', children: [] }
    ] },
    { id: 'wbs_11N_03', code: '11N.03', name: 'Outdoor Recreational Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11N_03_10', code: '11N.03.10', name: 'Outdoor Gaming Tables', xwalkId: '2089', description: '', children: [] }
    ] },
    { id: 'wbs_11N_04', code: '11N.04', name: 'Pet Park Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11N_04_10', code: '11N.04.10', name: 'Pet Trash Station', xwalkId: '2090', description: '', children: [] },
      { id: 'wbs_11N_04_20', code: '11N.04.20', name: 'Pet Wash Station', xwalkId: '2091', description: '', children: [] },
      { id: 'wbs_11N_04_30', code: '11N.04.30', name: 'Pet Drinking Fountain', xwalkId: '2092', description: '', children: [] },
      { id: 'wbs_11N_04_40', code: '11N.04.40', name: 'Pet Play Equipment', xwalkId: '2093', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11O', code: '11O', name: 'Healthcare Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11O_01', code: '11O.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11O_01_01', code: '11O.01.01', name: 'Mobilization', xwalkId: '2094', description: '', children: [] },
      { id: 'wbs_11O_01_02', code: '11O.01.02', name: 'Bond/Permit', xwalkId: '2095', description: '', children: [] },
      { id: 'wbs_11O_01_03', code: '11O.01.03', name: 'Submittals', xwalkId: '2096', description: '', children: [] },
      { id: 'wbs_11O_01_04', code: '11O.01.04', name: 'Equip Rentals', xwalkId: '2097', description: '', children: [] },
      { id: 'wbs_11O_01_07', code: '11O.01.07', name: 'Close-Out', xwalkId: '2098', description: '', children: [] },
      { id: 'wbs_11O_01_09', code: '11O.01.09', name: 'Cleaning', xwalkId: '2099', description: '', children: [] },
      { id: 'wbs_11O_01_13', code: '11O.01.13', name: 'Testing', xwalkId: '2100', description: '', children: [] }
    ] },
    { id: 'wbs_11O_02', code: '11O.02', name: 'Medical Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11O_02_10', code: '11O.02.10', name: 'Medical Sterilizing Equipment', xwalkId: '2101', description: '', children: [] },
      { id: 'wbs_11O_02_20', code: '11O.02.20', name: 'Examination Equipment', xwalkId: '2102', description: '', children: [] },
      { id: 'wbs_11O_02_30', code: '11O.02.30', name: 'Treatment Equipment', xwalkId: '2103', description: '', children: [] },
      { id: 'wbs_11O_02_40', code: '11O.02.40', name: 'Patient Care Equipment', xwalkId: '2104', description: '', children: [] },
      { id: 'wbs_11O_02_41', code: '11O.02.41', name: 'Portable Dehumidifier', xwalkId: '2105', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11P', code: '11P', name: 'Maintenance Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11P_01', code: '11P.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11P_01_01', code: '11P.01.01', name: 'Mobilization', xwalkId: '2106', description: '', children: [] },
      { id: 'wbs_11P_01_02', code: '11P.01.02', name: 'Bond/Permit', xwalkId: '2107', description: '', children: [] },
      { id: 'wbs_11P_01_03', code: '11P.01.03', name: 'Submittals', xwalkId: '2108', description: '', children: [] },
      { id: 'wbs_11P_01_04', code: '11P.01.04', name: 'Equip Rentals', xwalkId: '2109', description: '', children: [] },
      { id: 'wbs_11P_01_07', code: '11P.01.07', name: 'Close-Out', xwalkId: '2110', description: '', children: [] },
      { id: 'wbs_11P_01_09', code: '11P.01.09', name: 'Cleaning', xwalkId: '2111', description: '', children: [] },
      { id: 'wbs_11P_01_13', code: '11P.01.13', name: 'Testing', xwalkId: '2112', description: '', children: [] }
    ] },
    { id: 'wbs_11P_02', code: '11P.02', name: 'Facility Maintenance Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11P_02_10', code: '11P.02.10', name: 'Floor & Wall Cleaning Equipment', xwalkId: '2113', description: '', children: [] },
      { id: 'wbs_11P_02_20', code: '11P.02.20', name: 'Housekeeping Carts', xwalkId: '2114', description: '', children: [] },
      { id: 'wbs_11P_02_30', code: '11P.02.30', name: 'Vacuum Cleaning Systems', xwalkId: '2115', description: '', children: [] },
      { id: 'wbs_11P_02_40', code: '11P.02.40', name: 'Window Washing Systems', xwalkId: '2116', description: '', children: [] },
      { id: 'wbs_11P_02_50', code: '11P.02.50', name: 'Facility Fall Protection', xwalkId: '2117', description: '', children: [] }
    ] },
    { id: 'wbs_11P_03', code: '11P.03', name: 'Trash Handling Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_11P_03_10', code: '11P.03.10', name: 'Trash Compactor', xwalkId: '2118', description: '', children: [] },
      { id: 'wbs_11P_03_20', code: '11P.03.20', name: 'Trash Containers', xwalkId: '2119', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_11Q', code: '11Q', name: 'Detention Equipment', xwalkId: '', description: '', children: [
    { id: 'wbs_11Q_00', code: '11Q.00', name: 'Detention Equipment System', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_00_00', code: '11Q.00.00', name: 'Detention Equipment - Turnkey', xwalkId: '2120', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_01', code: '11Q.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_01_01', code: '11Q.01.01', name: 'Mobilization', xwalkId: '2121', description: '', children: [] },
      { id: 'wbs_11Q_01_02', code: '11Q.01.02', name: 'Bond/Permit', xwalkId: '2122', description: '', children: [] },
      { id: 'wbs_11Q_01_03', code: '11Q.01.03', name: 'Submittals', xwalkId: '2123', description: '', children: [] },
      { id: 'wbs_11Q_01_04', code: '11Q.01.04', name: 'Equip Rentals', xwalkId: '2124', description: '', children: [] },
      { id: 'wbs_11Q_01_05', code: '11Q.01.05', name: 'Supervision', xwalkId: '2125', description: '', children: [] },
      { id: 'wbs_11Q_01_07', code: '11Q.01.07', name: 'Close-Out', xwalkId: '2126', description: '', children: [] },
      { id: 'wbs_11Q_01_09', code: '11Q.01.09', name: 'Cleaning', xwalkId: '2127', description: '', children: [] },
      { id: 'wbs_11Q_01_13', code: '11Q.01.13', name: 'Testing', xwalkId: '2128', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_02', code: '11Q.02', name: 'Detention Room Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_02_10', code: '11Q.02.10', name: 'Detention Doors & Frames', xwalkId: '2129', description: '', children: [] },
      { id: 'wbs_11Q_02_20', code: '11Q.02.20', name: 'Detention Pass-Thru Doors', xwalkId: '2130', description: '', children: [] },
      { id: 'wbs_11Q_02_30', code: '11Q.02.30', name: 'Detention Door Hardware', xwalkId: '2131', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_03', code: '11Q.03', name: 'Detention Room Window', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_03_10', code: '11Q.03.10', name: 'Detention Windows', xwalkId: '2132', description: '', children: [] },
      { id: 'wbs_11Q_03_20', code: '11Q.03.20', name: 'Detention Window Screens', xwalkId: '2133', description: '', children: [] },
      { id: 'wbs_11Q_03_30', code: '11Q.03.30', name: 'Detention Security Glazing', xwalkId: '2134', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_04', code: '11Q.04', name: 'Detention Room Interior', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_04_10', code: '11Q.04.10', name: 'Detention Woven Mesh Ceiling System', xwalkId: '2135', description: '', children: [] },
      { id: 'wbs_11Q_04_20', code: '11Q.04.20', name: 'Detention Panel/Plank Ceiling System', xwalkId: '2136', description: '', children: [] },
      { id: 'wbs_11Q_04_30', code: '11Q.04.30', name: 'Detention Room Padding', xwalkId: '2137', description: '', children: [] },
      { id: 'wbs_11Q_04_40', code: '11Q.04.40', name: 'Detention Room Wall Panels', xwalkId: '2138', description: '', children: [] },
      { id: 'wbs_11Q_04_50', code: '11Q.04.50', name: 'Detention Security Mesh', xwalkId: '2139', description: '', children: [] },
      { id: 'wbs_11Q_04_60', code: '11Q.04.60', name: 'Detention Equipment Fasteners', xwalkId: '2140', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_05', code: '11Q.05', name: 'Detention Equipment & Furnishings', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_05_10', code: '11Q.05.10', name: 'Detention Toilet Accessories', xwalkId: '2141', description: '', children: [] },
      { id: 'wbs_11Q_05_20', code: '11Q.05.20', name: 'Detention Appliances', xwalkId: '2142', description: '', children: [] },
      { id: 'wbs_11Q_05_30', code: '11Q.05.30', name: 'Detention Cabinet', xwalkId: '2143', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_06', code: '11Q.06', name: 'Detention Room Furniture', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_06_10', code: '11Q.06.10', name: 'Detention Bunks', xwalkId: '2144', description: '', children: [] },
      { id: 'wbs_11Q_06_20', code: '11Q.06.20', name: 'Detention Desks', xwalkId: '2145', description: '', children: [] },
      { id: 'wbs_11Q_06_30', code: '11Q.06.30', name: 'Detention Stools', xwalkId: '2146', description: '', children: [] },
      { id: 'wbs_11Q_06_40', code: '11Q.06.40', name: 'Detention Tables', xwalkId: '2147', description: '', children: [] },
      { id: 'wbs_11Q_06_50', code: '11Q.06.50', name: 'Detention Safety Clothes Hooks', xwalkId: '2148', description: '', children: [] },
      { id: 'wbs_11Q_06_60', code: '11Q.06.60', name: 'Detention Custom Furniture', xwalkId: '2149', description: '', children: [] },
      { id: 'wbs_11Q_06_70', code: '11Q.06.70', name: 'Detention Control Room Furniture', xwalkId: '2150', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_07', code: '11Q.07', name: 'Detention Cell Modules', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_07_10', code: '11Q.07.10', name: 'Precast-Concrete Detention Cell Modules', xwalkId: '2151', description: '', children: [] },
      { id: 'wbs_11Q_07_20', code: '11Q.07.20', name: 'Pre-Engineered Steel Detention Modules', xwalkId: '2152', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_08', code: '11Q.08', name: 'Detention Lighting', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_08_10', code: '11Q.08.10', name: 'Detention Lighting System', xwalkId: '2153', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_09', code: '11Q.09', name: 'Detention Monitoring & Control System', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_09_10', code: '11Q.09.10', name: 'Detention Access Control Systems', xwalkId: '2154', description: '', children: [] },
      { id: 'wbs_11Q_09_20', code: '11Q.09.20', name: 'Detention Video Surveillance Systems', xwalkId: '2155', description: '', children: [] },
      { id: 'wbs_11Q_09_30', code: '11Q.09.30', name: 'Detention Alarm & Monitoring', xwalkId: '2156', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_10', code: '11Q.10', name: 'Detention Video Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_10_10', code: '11Q.10.10', name: 'Detention Video Recording Systems', xwalkId: '2157', description: '', children: [] }
    ] },
    { id: 'wbs_11Q_11', code: '11Q.11', name: 'Detention Communication Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_11Q_11_10', code: '11Q.11.10', name: 'Detention Intercom & Paging Systems', xwalkId: '2158', description: '', children: [] },
      { id: 'wbs_11Q_11_20', code: '11Q.11.20', name: 'Detention Television Systems', xwalkId: '2159', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12A', code: '12A', name: 'Graphics', xwalkId: '', description: '', children: [
    { id: 'wbs_12A_00', code: '12A.00', name: 'Super Graphics', xwalkId: '', description: '', children: [
      { id: 'wbs_12A_00_00', code: '12A.00.00', name: 'Super Graphics - Allowance', xwalkId: '2160', description: '', children: [] },
      { id: 'wbs_12A_00_01', code: '12A.00.01', name: 'Graphics - Allowance', xwalkId: '2161', description: '', children: [] }
    ] },
    { id: 'wbs_12A_01', code: '12A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12A_01_01', code: '12A.01.01', name: 'Mobilization', xwalkId: '2162', description: '', children: [] },
      { id: 'wbs_12A_01_02', code: '12A.01.02', name: 'Bond/Permit', xwalkId: '2163', description: '', children: [] },
      { id: 'wbs_12A_01_03', code: '12A.01.03', name: 'Submittals', xwalkId: '2164', description: '', children: [] },
      { id: 'wbs_12A_01_04', code: '12A.01.04', name: 'Equip Rentals', xwalkId: '2165', description: '', children: [] },
      { id: 'wbs_12A_01_07', code: '12A.01.07', name: 'Close-Out', xwalkId: '2166', description: '', children: [] },
      { id: 'wbs_12A_01_09', code: '12A.01.09', name: 'Cleaning', xwalkId: '2167', description: '', children: [] }
    ] },
    { id: 'wbs_12A_02', code: '12A.02', name: 'Exterior Printed Graphics', xwalkId: '', description: '', children: [
      { id: 'wbs_12A_02_10', code: '12A.02.10', name: 'Digitally Printed Vinyl Graphics - Exterior Wall', xwalkId: '2168', description: '', children: [] },
      { id: 'wbs_12A_02_20', code: '12A.02.20', name: 'Digitally Printed Vinyl Graphics - Exterior Window', xwalkId: '2169', description: '', children: [] },
      { id: 'wbs_12A_02_30', code: '12A.02.30', name: 'Digitally Printed Vinyl Graphics - Outdoor Floor', xwalkId: '2170', description: '', children: [] }
    ] },
    { id: 'wbs_12A_03', code: '12A.03', name: 'Interior Printed Graphics', xwalkId: '', description: '', children: [
      { id: 'wbs_12A_03_10', code: '12A.03.10', name: 'Digitally Printed Vinyl Graphics - Interior Wall', xwalkId: '2171', description: '', children: [] },
      { id: 'wbs_12A_03_20', code: '12A.03.20', name: 'Digitally Printed Vinyl Graphics - Interior Window', xwalkId: '2172', description: '', children: [] },
      { id: 'wbs_12A_03_30', code: '12A.03.30', name: 'Digitally Printed Vinyl Graphics - Indoor Floor', xwalkId: '2173', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12B', code: '12B', name: 'Window Treatments', xwalkId: '', description: '', children: [
    { id: 'wbs_12B_01', code: '12B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_01_01', code: '12B.01.01', name: 'Mobilization', xwalkId: '2174', description: '', children: [] },
      { id: 'wbs_12B_01_02', code: '12B.01.02', name: 'Bond/Permit', xwalkId: '2175', description: '', children: [] },
      { id: 'wbs_12B_01_03', code: '12B.01.03', name: 'Submittals', xwalkId: '2176', description: '', children: [] },
      { id: 'wbs_12B_01_07', code: '12B.01.07', name: 'Close-Out', xwalkId: '2177', description: '', children: [] },
      { id: 'wbs_12B_01_09', code: '12B.01.09', name: 'Cleaning', xwalkId: '2178', description: '', children: [] },
      { id: 'wbs_12B_01_10', code: '12B.01.10', name: 'Mockup', xwalkId: '2179', description: '', children: [] }
    ] },
    { id: 'wbs_12B_02', code: '12B.02', name: 'Window Blinds', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_02_00', code: '12B.02.00', name: 'Interior Window Blinds', xwalkId: '2180', description: '', children: [] },
      { id: 'wbs_12B_02_01', code: '12B.02.01', name: 'Aluminum Louver Blinds', xwalkId: '2181', description: '', children: [] },
      { id: 'wbs_12B_02_02', code: '12B.02.02', name: 'Vinyl Louver Blinds', xwalkId: '2182', description: '', children: [] },
      { id: 'wbs_12B_02_03', code: '12B.02.03', name: 'Faux Wood Louver Blinds', xwalkId: '2183', description: '', children: [] },
      { id: 'wbs_12B_02_04', code: '12B.02.04', name: 'Wood Louver Blinds', xwalkId: '2184', description: '', children: [] }
    ] },
    { id: 'wbs_12B_03', code: '12B.03', name: 'Curtains & Drapes', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_03_01', code: '12B.03.01', name: 'Window Curtains', xwalkId: '2185', description: '', children: [] }
    ] },
    { id: 'wbs_12B_04', code: '12B.04', name: 'Manual Window Shades', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_04_00', code: '12B.04.00', name: 'Manual Window Shades System', xwalkId: '2186', description: '', children: [] },
      { id: 'wbs_12B_04_01', code: '12B.04.01', name: 'Manual Window Shades - Single Roller', xwalkId: '2187', description: '', children: [] },
      { id: 'wbs_12B_04_02', code: '12B.04.02', name: 'Manual Window Shades - Double Roller', xwalkId: '2188', description: '', children: [] }
    ] },
    { id: 'wbs_12B_05', code: '12B.05', name: 'Motorized Window Shades', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_05_00', code: '12B.05.00', name: 'Motorized Window Shades Systems', xwalkId: '2189', description: '', children: [] },
      { id: 'wbs_12B_05_01', code: '12B.05.01', name: 'Motorized Window Shades - Single Roller', xwalkId: '2190', description: '', children: [] },
      { id: 'wbs_12B_05_02', code: '12B.05.02', name: 'Motorized Window Shades - Double Roller', xwalkId: '2191', description: '', children: [] }
    ] },
    { id: 'wbs_12B_06', code: '12B.06', name: 'Window Treatment Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_12B_06_01', code: '12B.06.01', name: 'Window Shade Pockets', xwalkId: '2192', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12C', code: '12C', name: 'Casework/Millwork', xwalkId: '', description: '', children: [
    { id: 'wbs_12C_00', code: '12C.00', name: 'Casework & Countertops', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_00_01', code: '12C.00.01', name: 'Casework - Allowance', xwalkId: '3616', description: '', children: [] }
    ] },
    { id: 'wbs_12C_01', code: '12C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_01_01', code: '12C.01.01', name: 'Mobilization', xwalkId: '2193', description: '', children: [] },
      { id: 'wbs_12C_01_02', code: '12C.01.02', name: 'Bond/Permit', xwalkId: '2194', description: '', children: [] },
      { id: 'wbs_12C_01_03', code: '12C.01.03', name: 'Submittals', xwalkId: '2195', description: '', children: [] },
      { id: 'wbs_12C_01_05', code: '12C.01.05', name: 'Supervision', xwalkId: '2196', description: '', children: [] },
      { id: 'wbs_12C_01_06', code: '12C.01.06', name: 'Demobilization', xwalkId: '2197', description: '', children: [] },
      { id: 'wbs_12C_01_07', code: '12C.01.07', name: 'Close-Out', xwalkId: '2198', description: '', children: [] },
      { id: 'wbs_12C_01_09', code: '12C.01.09', name: 'Cleaning', xwalkId: '2199', description: '', children: [] },
      { id: 'wbs_12C_01_10', code: '12C.01.10', name: 'Mockup', xwalkId: '2200', description: '', children: [] }
    ] },
    { id: 'wbs_12C_02', code: '12C.02', name: 'Casework', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_02_01', code: '12C.02.01', name: 'Base Cabinet', xwalkId: '2201', description: '', children: [] },
      { id: 'wbs_12C_02_02', code: '12C.02.02', name: 'Wall Cabinet', xwalkId: '2202', description: '', children: [] },
      { id: 'wbs_12C_02_03', code: '12C.02.03', name: 'Tall Cabinet', xwalkId: '2203', description: '', children: [] },
      { id: 'wbs_12C_02_04', code: '12C.02.04', name: 'Desk', xwalkId: '2204', description: '', children: [] },
      { id: 'wbs_12C_02_05', code: '12C.02.05', name: 'Work Stations', xwalkId: '2205', description: '', children: [] }
    ] },
    { id: 'wbs_12C_03', code: '12C.03', name: 'Special Casework', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_03_01', code: '12C.03.01', name: 'Wooden Display Case', xwalkId: '2206', description: '', children: [] },
      { id: 'wbs_12C_03_02', code: '12C.03.02', name: 'Wooden Open Shelves', xwalkId: '2207', description: '', children: [] },
      { id: 'wbs_12C_03_03', code: '12C.03.03', name: 'Wooden Cubbies', xwalkId: '2208', description: '', children: [] },
      { id: 'wbs_12C_03_04', code: '12C.03.04', name: 'Wooden Mailslots', xwalkId: '2209', description: '', children: [] },
      { id: 'wbs_12C_03_05', code: '12C.03.05', name: 'Wooden Benches', xwalkId: '2210', description: '', children: [] },
      { id: 'wbs_12C_03_06', code: '12C.03.06', name: 'Upholstery', xwalkId: '2211', description: '', children: [] },
      { id: 'wbs_12C_03_07', code: '12C.03.07', name: 'Backpack Hooks', xwalkId: '2212', description: '', children: [] },
      { id: 'wbs_12C_03_08', code: '12C.03.08', name: 'Wooden Racks', xwalkId: '2213', description: '', children: [] },
      { id: 'wbs_12C_03_09', code: '12C.03.09', name: 'Wardrobe Shelf and Rod', xwalkId: '2214', description: '', children: [] },
      { id: 'wbs_12C_03_10', code: '12C.03.10', name: 'D-Rings', xwalkId: '2215', description: '', children: [] }
    ] },
    { id: 'wbs_12C_04', code: '12C.04', name: 'Countertops', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_04_01', code: '12C.04.01', name: 'Countertop - P-Lam', xwalkId: '2216', description: '', children: [] },
      { id: 'wbs_12C_04_02', code: '12C.04.02', name: 'Countertop - Solid Surface', xwalkId: '2217', description: '', children: [] },
      { id: 'wbs_12C_04_03', code: '12C.04.03', name: 'Countertop - Metal', xwalkId: '2218', description: '', children: [] },
      { id: 'wbs_12C_04_04', code: '12C.04.04', name: 'Window Sills - P-Lam', xwalkId: '2219', description: '', children: [] },
      { id: 'wbs_12C_04_05', code: '12C.04.05', name: 'Window Sills - Solid Surface', xwalkId: '2220', description: '', children: [] },
      { id: 'wbs_12C_04_06', code: '12C.04.06', name: 'Wall Caps - P-Lam', xwalkId: '2221', description: '', children: [] },
      { id: 'wbs_12C_04_07', code: '12C.04.07', name: 'Wall Caps - Solid Surface', xwalkId: '2222', description: '', children: [] }
    ] },
    { id: 'wbs_12C_05', code: '12C.05', name: 'Wall Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_05_01', code: '12C.05.01', name: 'Wood Wall Panel', xwalkId: '2223', description: '', children: [] },
      { id: 'wbs_12C_05_02', code: '12C.05.02', name: 'P-Lam Wall Panel', xwalkId: '2224', description: '', children: [] },
      { id: 'wbs_12C_05_03', code: '12C.05.03', name: 'Resin Wall Panel', xwalkId: '2225', description: '', children: [] },
      { id: 'wbs_12C_05_04', code: '12C.05.04', name: 'Wood Baffles/Slats', xwalkId: '2226', description: '', children: [] }
    ] },
    { id: 'wbs_12C_06', code: '12C.06', name: 'Millwork', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_06_01', code: '12C.06.01', name: 'Wood Trim & Molding', xwalkId: '2227', description: '', children: [] },
      { id: 'wbs_12C_06_02', code: '12C.06.02', name: 'Wood Base', xwalkId: '2228', description: '', children: [] },
      { id: 'wbs_12C_06_03', code: '12C.06.03', name: 'Wood Chair Rails', xwalkId: '2229', description: '', children: [] },
      { id: 'wbs_12C_06_04', code: '12C.06.04', name: 'Wood Stair Railings', xwalkId: '2230', description: '', children: [] }
    ] },
    { id: 'wbs_12C_07', code: '12C.07', name: 'Architectural Woodwork', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_07_01', code: '12C.07.01', name: 'Finished Wood Framing', xwalkId: '2231', description: '', children: [] },
      { id: 'wbs_12C_07_02', code: '12C.07.02', name: 'Tree House Woodwork', xwalkId: '2232', description: '', children: [] },
      { id: 'wbs_12C_07_03', code: '12C.07.03', name: 'Pergola Woodwork', xwalkId: '2233', description: '', children: [] }
    ] },
    { id: 'wbs_12C_08', code: '12C.08', name: 'Site Finish Carpentry', xwalkId: '', description: '', children: [
      { id: 'wbs_12C_08_01', code: '12C.08.01', name: 'Site Casework', xwalkId: '2234', description: '', children: [] },
      { id: 'wbs_12C_08_02', code: '12C.08.02', name: 'Site Countertops', xwalkId: '2235', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12D', code: '12D', name: 'Lab Casework', xwalkId: '', description: '', children: [
    { id: 'wbs_12D_01', code: '12D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_01_01', code: '12D.01.01', name: 'Mobilization', xwalkId: '2236', description: '', children: [] },
      { id: 'wbs_12D_01_02', code: '12D.01.02', name: 'Bond/Permit', xwalkId: '2237', description: '', children: [] },
      { id: 'wbs_12D_01_03', code: '12D.01.03', name: 'Submittals', xwalkId: '2238', description: '', children: [] },
      { id: 'wbs_12D_01_05', code: '12D.01.05', name: 'Supervision', xwalkId: '2239', description: '', children: [] },
      { id: 'wbs_12D_01_06', code: '12D.01.06', name: 'Demobilization', xwalkId: '2240', description: '', children: [] },
      { id: 'wbs_12D_01_07', code: '12D.01.07', name: 'Close-Out', xwalkId: '2241', description: '', children: [] },
      { id: 'wbs_12D_01_09', code: '12D.01.09', name: 'Cleaning', xwalkId: '2242', description: '', children: [] },
      { id: 'wbs_12D_01_10', code: '12D.01.10', name: 'Mockup', xwalkId: '2243', description: '', children: [] }
    ] },
    { id: 'wbs_12D_02', code: '12D.02', name: 'Casework', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_02_01', code: '12D.02.01', name: 'Lab Base Cabinet', xwalkId: '2244', description: '', children: [] },
      { id: 'wbs_12D_02_02', code: '12D.02.02', name: 'Lab Wall Cabinet', xwalkId: '2245', description: '', children: [] },
      { id: 'wbs_12D_02_03', code: '12D.02.03', name: 'Lab Tall Cabinet', xwalkId: '2246', description: '', children: [] },
      { id: 'wbs_12D_02_04', code: '12D.02.04', name: 'Teacher Demo Desk', xwalkId: '2247', description: '', children: [] },
      { id: 'wbs_12D_02_05', code: '12D.02.05', name: 'Lab Open Shelves', xwalkId: '2248', description: '', children: [] },
      { id: 'wbs_12D_02_06', code: '12D.02.06', name: 'Lab Sink Apron', xwalkId: '2249', description: '', children: [] }
    ] },
    { id: 'wbs_12D_03', code: '12D.03', name: 'Countertops', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_03_01', code: '12D.03.01', name: 'Lab Countertop - Epoxy Resin', xwalkId: '2250', description: '', children: [] },
      { id: 'wbs_12D_03_02', code: '12D.03.02', name: 'Lab Countertop - Chemical Resistant P-Lam', xwalkId: '2251', description: '', children: [] },
      { id: 'wbs_12D_03_03', code: '12D.03.03', name: 'Lab Countertop - Solid Phenolic', xwalkId: '2252', description: '', children: [] }
    ] },
    { id: 'wbs_12D_04', code: '12D.04', name: 'Lab Storage Cabinet', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_04_01', code: '12D.04.01', name: 'Flammable Storage Cabinet', xwalkId: '2253', description: '', children: [] },
      { id: 'wbs_12D_04_02', code: '12D.04.02', name: 'Chemical Storage Cabinet', xwalkId: '2254', description: '', children: [] },
      { id: 'wbs_12D_04_03', code: '12D.04.03', name: 'Goggle/Sanitizer Storage Cabinet', xwalkId: '2255', description: '', children: [] },
      { id: 'wbs_12D_04_04', code: '12D.04.04', name: 'Tote Tray Storage Cabinet', xwalkId: '2256', description: '', children: [] },
      { id: 'wbs_12D_04_05', code: '12D.04.05', name: 'Microscope Storage Cabinet', xwalkId: '2257', description: '', children: [] },
      { id: 'wbs_12D_04_06', code: '12D.04.06', name: 'Acid Resistant Cabinet', xwalkId: '2258', description: '', children: [] },
      { id: 'wbs_12D_04_07', code: '12D.04.07', name: 'Fire Resistant Cabinet', xwalkId: '2259', description: '', children: [] }
    ] },
    { id: 'wbs_12D_05', code: '12D.05', name: 'Lab Furniture', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_05_01', code: '12D.05.01', name: 'Student Desk/Table', xwalkId: '2260', description: '', children: [] }
    ] },
    { id: 'wbs_12D_06', code: '12D.06', name: 'Lab Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_06_01', code: '12D.06.01', name: 'Lab Peg Board', xwalkId: '2261', description: '', children: [] },
      { id: 'wbs_12D_06_02', code: '12D.06.02', name: 'Lab Drying Rack', xwalkId: '2262', description: '', children: [] }
    ] },
    { id: 'wbs_12D_07', code: '12D.07', name: 'Lab Fixtures', xwalkId: '', description: '', children: [
      { id: 'wbs_12D_07_01', code: '12D.07.01', name: 'Fume Hood & Cabinet', xwalkId: '2263', description: '', children: [] },
      { id: 'wbs_12D_07_02', code: '12D.07.02', name: 'Emergency Shower & Eyewash Station', xwalkId: '2264', description: '', children: [] },
      { id: 'wbs_12D_07_03', code: '12D.07.03', name: 'Lab Sink', xwalkId: '2265', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12E', code: '12E', name: 'Musical Instrument Storage', xwalkId: '', description: '', children: [
    { id: 'wbs_12E_01', code: '12E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12E_01_01', code: '12E.01.01', name: 'Mobilization', xwalkId: '2266', description: '', children: [] },
      { id: 'wbs_12E_01_02', code: '12E.01.02', name: 'Bond/Permit', xwalkId: '2267', description: '', children: [] },
      { id: 'wbs_12E_01_03', code: '12E.01.03', name: 'Submittals', xwalkId: '2268', description: '', children: [] },
      { id: 'wbs_12E_01_04', code: '12E.01.04', name: 'Equip Rentals', xwalkId: '2269', description: '', children: [] },
      { id: 'wbs_12E_01_05', code: '12E.01.05', name: 'Supervision', xwalkId: '2270', description: '', children: [] },
      { id: 'wbs_12E_01_06', code: '12E.01.06', name: 'Demobilization', xwalkId: '2271', description: '', children: [] },
      { id: 'wbs_12E_01_07', code: '12E.01.07', name: 'Close-Out', xwalkId: '2272', description: '', children: [] }
    ] },
    { id: 'wbs_12E_02', code: '12E.02', name: 'Music Storage', xwalkId: '', description: '', children: [
      { id: 'wbs_12E_02_01', code: '12E.02.01', name: 'Music Instrument Storage Cabinets', xwalkId: '2273', description: '', children: [] },
      { id: 'wbs_12E_02_02', code: '12E.02.02', name: 'Acoustic Cabinets', xwalkId: '2274', description: '', children: [] },
      { id: 'wbs_12E_02_03', code: '12E.02.03', name: 'Instrument Storage Racks', xwalkId: '2275', description: '', children: [] },
      { id: 'wbs_12E_02_04', code: '12E.02.04', name: 'Music Workstations', xwalkId: '2276', description: '', children: [] },
      { id: 'wbs_12E_02_05', code: '12E.02.05', name: 'Music Library System', xwalkId: '2277', description: '', children: [] },
      { id: 'wbs_12E_02_06', code: '12E.02.06', name: 'Uniform Storage Cabinets', xwalkId: '2278', description: '', children: [] },
      { id: 'wbs_12E_02_07', code: '12E.02.07', name: 'Music Instrument Holders & Brackets', xwalkId: '2279', description: '', children: [] },
      { id: 'wbs_12E_02_08', code: '12E.02.08', name: 'Music Stands', xwalkId: '2280', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12F', code: '12F', name: 'Entrance Mats/Grilles', xwalkId: '', description: '', children: [
    { id: 'wbs_12F_01', code: '12F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12F_01_01', code: '12F.01.01', name: 'Mobilization', xwalkId: '2281', description: '', children: [] },
      { id: 'wbs_12F_01_02', code: '12F.01.02', name: 'Bond/Permit', xwalkId: '2282', description: '', children: [] },
      { id: 'wbs_12F_01_03', code: '12F.01.03', name: 'Submittals', xwalkId: '2283', description: '', children: [] },
      { id: 'wbs_12F_01_07', code: '12F.01.07', name: 'Close-Out', xwalkId: '2284', description: '', children: [] },
      { id: 'wbs_12F_01_09', code: '12F.01.09', name: 'Cleaning', xwalkId: '2285', description: '', children: [] }
    ] },
    { id: 'wbs_12F_02', code: '12F.02', name: 'Entrance Floor Mats & Frames', xwalkId: '', description: '', children: [
      { id: 'wbs_12F_02_10', code: '12F.02.10', name: 'Entrance Floor Recessed Frames', xwalkId: '2286', description: '', children: [] },
      { id: 'wbs_12F_02_20', code: '12F.02.20', name: 'Entrance Floor Recessed Mats', xwalkId: '2287', description: '', children: [] },
      { id: 'wbs_12F_02_30', code: '12F.02.30', name: 'Entrance Floor Roll-Up Rail Mats', xwalkId: '2288', description: '', children: [] }
    ] },
    { id: 'wbs_12F_03', code: '12F.03', name: 'Entrance Floor Grilles & Gratings', xwalkId: '', description: '', children: [
      { id: 'wbs_12F_03_10', code: '12F.03.10', name: 'Entrance Floor Grilles', xwalkId: '2289', description: '', children: [] },
      { id: 'wbs_12F_03_20', code: '12F.03.20', name: 'Entrance Floor Gratings', xwalkId: '2290', description: '', children: [] },
      { id: 'wbs_12F_03_30', code: '12F.03.30', name: 'Entrance Floor Grids', xwalkId: '2291', description: '', children: [] }
    ] },
    { id: 'wbs_12F_04', code: '12F.04', name: 'Moveable Rugs & Mats', xwalkId: '', description: '', children: [
      { id: 'wbs_12F_04_10', code: '12F.04.10', name: 'Walk Off Carpet', xwalkId: '2292', description: '', children: [] },
      { id: 'wbs_12F_04_20', code: '12F.04.20', name: 'Vinyl Mats', xwalkId: '2293', description: '', children: [] },
      { id: 'wbs_12F_04_30', code: '12F.04.30', name: 'Rubber Mats', xwalkId: '2294', description: '', children: [] }
    ] },
    { id: 'wbs_12F_05', code: '12F.05', name: 'Entrance Flooring - Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_12F_05_10', code: '12F.05.10', name: 'Entrance Mat - Carpet Inserts', xwalkId: '2295', description: '', children: [] },
      { id: 'wbs_12F_05_20', code: '12F.05.20', name: 'Entrance Mat - Tread Rails', xwalkId: '2296', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_12G', code: '12G', name: 'Interior Seating', xwalkId: '', description: '', children: [
    { id: 'wbs_12G_01', code: '12G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_12G_01_01', code: '12G.01.01', name: 'Mobilization', xwalkId: '2297', description: '', children: [] },
      { id: 'wbs_12G_01_02', code: '12G.01.02', name: 'Bond/Permit', xwalkId: '2298', description: '', children: [] },
      { id: 'wbs_12G_01_03', code: '12G.01.03', name: 'Submittals', xwalkId: '2299', description: '', children: [] },
      { id: 'wbs_12G_01_04', code: '12G.01.04', name: 'Equip Rentals', xwalkId: '2300', description: '', children: [] },
      { id: 'wbs_12G_01_07', code: '12G.01.07', name: 'Close-Out', xwalkId: '2301', description: '', children: [] },
      { id: 'wbs_12G_01_09', code: '12G.01.09', name: 'Cleaning', xwalkId: '2302', description: '', children: [] }
    ] },
    { id: 'wbs_12G_02', code: '12G.02', name: 'Interior Fixed Seating', xwalkId: '', description: '', children: [
      { id: 'wbs_12G_02_10', code: '12G.02.10', name: 'Interior Fixed Audience Seatings - Upholstered Seats', xwalkId: '2303', description: '', children: [] },
      { id: 'wbs_12G_02_20', code: '12G.02.20', name: 'Interior Fixed Audience Seatings - Plastic Chairs', xwalkId: '2304', description: '', children: [] }
    ] },
    { id: 'wbs_12G_03', code: '12G.03', name: 'Interior Fixed Bleachers', xwalkId: '', description: '', children: [
      { id: 'wbs_12G_03_00', code: '12G.03.00', name: 'Interior Fixed Bleacher System', xwalkId: '2305', description: '', children: [] },
      { id: 'wbs_12G_03_10', code: '12G.03.10', name: 'Elevated Interior Fixed Bleachers', xwalkId: '2306', description: '', children: [] },
      { id: 'wbs_12G_03_20', code: '12G.03.20', name: 'Low Rise Interior Fixed Bleachers', xwalkId: '2307', description: '', children: [] },
      { id: 'wbs_12G_03_30', code: '12G.03.30', name: 'Interior Fixed Bleacher Accessories', xwalkId: '2308', description: '', children: [] }
    ] },
    { id: 'wbs_12G_04', code: '12G.04', name: 'Interior Telescopic Bleachers', xwalkId: '', description: '', children: [
      { id: 'wbs_12G_04_00', code: '12G.04.00', name: 'Interior Telescopic Bleacher System', xwalkId: '2309', description: '', children: [] },
      { id: 'wbs_12G_04_10', code: '12G.04.10', name: 'Elevated Manual Telescopic Bleachers', xwalkId: '2310', description: '', children: [] },
      { id: 'wbs_12G_04_20', code: '12G.04.20', name: 'Elevated Power-Operated Telescopic Bleachers', xwalkId: '2311', description: '', children: [] },
      { id: 'wbs_12G_04_30', code: '12G.04.30', name: 'Low-Rise Manual Telescopic Bleachers', xwalkId: '2312', description: '', children: [] },
      { id: 'wbs_12G_04_40', code: '12G.04.40', name: 'Low-Rise Power-Operated Telescopic Bleachers', xwalkId: '2313', description: '', children: [] }
    ] },
    { id: 'wbs_12G_05', code: '12G.05', name: 'Movable Interior Seating', xwalkId: '', description: '', children: [
      { id: 'wbs_12G_05_10', code: '12G.05.10', name: 'Interior Portable Bleachers', xwalkId: '2314', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13A', code: '13A', name: 'Swimming Pool', xwalkId: '', description: '', children: [
    { id: 'wbs_13A_01', code: '13A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_01_01', code: '13A.01.01', name: 'Mobilization', xwalkId: '2315', description: '', children: [] },
      { id: 'wbs_13A_01_02', code: '13A.01.02', name: 'Bond/Permit', xwalkId: '2316', description: '', children: [] },
      { id: 'wbs_13A_01_03', code: '13A.01.03', name: 'Submittals', xwalkId: '2317', description: '', children: [] },
      { id: 'wbs_13A_01_04', code: '13A.01.04', name: 'Equip Rentals', xwalkId: '2318', description: '', children: [] },
      { id: 'wbs_13A_01_05', code: '13A.01.05', name: 'Supervision', xwalkId: '2319', description: '', children: [] },
      { id: 'wbs_13A_01_06', code: '13A.01.06', name: 'Demobilization', xwalkId: '2320', description: '', children: [] },
      { id: 'wbs_13A_01_07', code: '13A.01.07', name: 'Close-Out', xwalkId: '2321', description: '', children: [] },
      { id: 'wbs_13A_01_09', code: '13A.01.09', name: 'Cleaning', xwalkId: '2322', description: '', children: [] },
      { id: 'wbs_13A_01_12', code: '13A.01.12', name: 'Commissioning', xwalkId: '2323', description: '', children: [] },
      { id: 'wbs_13A_01_13', code: '13A.01.13', name: 'Testing', xwalkId: '2324', description: '', children: [] },
      { id: 'wbs_13A_01_14', code: '13A.01.14', name: 'Survey & Layout', xwalkId: '2325', description: '', children: [] },
      { id: 'wbs_13A_01_15', code: '13A.01.15', name: 'Dewatering', xwalkId: '2326', description: '', children: [] }
    ] },
    { id: 'wbs_13A_02', code: '13A.02', name: 'Swimming Pools Construction', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_02_10', code: '13A.02.10', name: 'Pool Construction - Below Grade', xwalkId: '2327', description: '', children: [] },
      { id: 'wbs_13A_02_20', code: '13A.02.20', name: 'Pool Construction - On Grade', xwalkId: '2328', description: '', children: [] },
      { id: 'wbs_13A_02_30', code: '13A.02.30', name: 'Pool Construction - Elevated', xwalkId: '2329', description: '', children: [] }
    ] },
    { id: 'wbs_13A_03', code: '13A.03', name: 'Swimming Pool Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_03_10', code: '13A.03.10', name: 'Pool Tile System', xwalkId: '2330', description: '', children: [] },
      { id: 'wbs_13A_03_20', code: '13A.03.20', name: 'Pool Plaster', xwalkId: '2331', description: '', children: [] },
      { id: 'wbs_13A_03_30', code: '13A.03.30', name: 'Pool Special Aggregate Finish', xwalkId: '2332', description: '', children: [] },
      { id: 'wbs_13A_03_40', code: '13A.03.40', name: 'Pool Cementitious Finish', xwalkId: '2333', description: '', children: [] },
      { id: 'wbs_13A_03_50', code: '13A.03.50', name: 'Pool Deck System', xwalkId: '2334', description: '', children: [] }
    ] },
    { id: 'wbs_13A_04', code: '13A.04', name: 'Premanufactured Swimming Pool', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_04_10', code: '13A.04.10', name: 'Premanufactured Pool System', xwalkId: '2335', description: '', children: [] }
    ] },
    { id: 'wbs_13A_05', code: '13A.05', name: 'Pool Equipment & Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_05_10', code: '13A.05.10', name: 'Movable Pool Bulkheads', xwalkId: '2336', description: '', children: [] },
      { id: 'wbs_13A_05_20', code: '13A.05.20', name: 'Movable Pool Floors', xwalkId: '2337', description: '', children: [] },
      { id: 'wbs_13A_05_30', code: '13A.05.30', name: 'Pool Covers', xwalkId: '2338', description: '', children: [] },
      { id: 'wbs_13A_05_40', code: '13A.05.40', name: 'Pool Athletic Equipment', xwalkId: '2339', description: '', children: [] },
      { id: 'wbs_13A_05_50', code: '13A.05.50', name: 'Pool Timing System', xwalkId: '2340', description: '', children: [] },
      { id: 'wbs_13A_05_60', code: '13A.05.60', name: 'Pool Alarm System', xwalkId: '2341', description: '', children: [] },
      { id: 'wbs_13A_05_70', code: '13A.05.70', name: 'Pool Safety Specialty', xwalkId: '2342', description: '', children: [] },
      { id: 'wbs_13A_05_80', code: '13A.05.80', name: 'Pool ADA Lifts', xwalkId: '2343', description: '', children: [] },
      { id: 'wbs_13A_05_90', code: '13A.05.90', name: 'Pool Maintenance & Cleaning Equipment', xwalkId: '2344', description: '', children: [] }
    ] },
    { id: 'wbs_13A_06', code: '13A.06', name: 'Pool Plumbing System Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_06_10', code: '13A.06.10', name: 'Pool Piping System', xwalkId: '2345', description: '', children: [] },
      { id: 'wbs_13A_06_20', code: '13A.06.20', name: 'Pool Trench Drain & Grate System', xwalkId: '2346', description: '', children: [] },
      { id: 'wbs_13A_06_30', code: '13A.06.30', name: 'Pool Plumbing Equipment', xwalkId: '2347', description: '', children: [] },
      { id: 'wbs_13A_06_40', code: '13A.06.40', name: 'Pool Plumbing Fixtures', xwalkId: '2348', description: '', children: [] }
    ] },
    { id: 'wbs_13A_07', code: '13A.07', name: 'Pool Mechanical Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_07_10', code: '13A.07.10', name: 'Pool Filtration System', xwalkId: '2349', description: '', children: [] },
      { id: 'wbs_13A_07_20', code: '13A.07.20', name: 'Pool Chemical Feeders', xwalkId: '2350', description: '', children: [] },
      { id: 'wbs_13A_07_30', code: '13A.07.30', name: 'Pool UV & Ozone Treatment System', xwalkId: '2351', description: '', children: [] },
      { id: 'wbs_13A_07_40', code: '13A.07.40', name: 'Pool Automated Cleaners', xwalkId: '2352', description: '', children: [] },
      { id: 'wbs_13A_07_50', code: '13A.07.50', name: 'Pool Heating System', xwalkId: '2353', description: '', children: [] }
    ] },
    { id: 'wbs_13A_08', code: '13A.08', name: 'Pool Electrical Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_13A_08_10', code: '13A.08.10', name: 'Pool Electrical Wiring & Conduits', xwalkId: '2354', description: '', children: [] },
      { id: 'wbs_13A_08_20', code: '13A.08.20', name: 'Pool Lighting', xwalkId: '2355', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13B', code: '13B', name: 'Sound-Conditioned Room', xwalkId: '', description: '', children: [
    { id: 'wbs_13B_01', code: '13B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13B_01_01', code: '13B.01.01', name: 'Mobilization', xwalkId: '2356', description: '', children: [] },
      { id: 'wbs_13B_01_02', code: '13B.01.02', name: 'Bond/Permit', xwalkId: '2357', description: '', children: [] },
      { id: 'wbs_13B_01_03', code: '13B.01.03', name: 'Submittals', xwalkId: '2358', description: '', children: [] },
      { id: 'wbs_13B_01_04', code: '13B.01.04', name: 'Equip Rentals', xwalkId: '2359', description: '', children: [] },
      { id: 'wbs_13B_01_07', code: '13B.01.07', name: 'Close-Out', xwalkId: '2360', description: '', children: [] },
      { id: 'wbs_13B_01_09', code: '13B.01.09', name: 'Cleaning', xwalkId: '2361', description: '', children: [] },
      { id: 'wbs_13B_01_13', code: '13B.01.13', name: 'Testing', xwalkId: '2362', description: '', children: [] }
    ] },
    { id: 'wbs_13B_02', code: '13B.02', name: 'Modular Sound Isolation Rooms', xwalkId: '', description: '', children: [
      { id: 'wbs_13B_02_10', code: '13B.02.10', name: 'Modular Sound Isolation Room - Standard', xwalkId: '2363', description: '', children: [] },
      { id: 'wbs_13B_02_20', code: '13B.02.20', name: 'Modular Sound Isolation Room - Non-Upgradable to VAE', xwalkId: '2364', description: '', children: [] },
      { id: 'wbs_13B_02_30', code: '13B.02.30', name: 'Modular Sound Isolation Room - Upgradable to VAE', xwalkId: '2365', description: '', children: [] },
      { id: 'wbs_13B_02_40', code: '13B.02.40', name: 'Modular Sound Isolation Room - With VAE', xwalkId: '2366', description: '', children: [] }
    ] },
    { id: 'wbs_13B_03', code: '13B.03', name: 'Sound Isolation Rooms - Standard System', xwalkId: '', description: '', children: [
      { id: 'wbs_13B_03_10', code: '13B.03.10', name: 'Sound Isolation Rooms - HVAC System', xwalkId: '2367', description: '', children: [] },
      { id: 'wbs_13B_03_20', code: '13B.03.20', name: 'Sound Isolation Rooms - Electrical System', xwalkId: '2368', description: '', children: [] },
      { id: 'wbs_13B_03_30', code: '13B.03.30', name: 'Sound Isolation Rooms - Lighting System', xwalkId: '2369', description: '', children: [] }
    ] },
    { id: 'wbs_13B_04', code: '13B.04', name: 'Sound Isolation Rooms - Special System', xwalkId: '', description: '', children: [
      { id: 'wbs_13B_04_10', code: '13B.04.10', name: 'Virtual Acoustical Environment (VAE) System', xwalkId: '2370', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13C', code: '13C', name: 'Stadium Seatings', xwalkId: '', description: '', children: [
    { id: 'wbs_13C_01', code: '13C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13C_01_01', code: '13C.01.01', name: 'Mobilization', xwalkId: '2371', description: '', children: [] },
      { id: 'wbs_13C_01_02', code: '13C.01.02', name: 'Bond/Permit', xwalkId: '2372', description: '', children: [] },
      { id: 'wbs_13C_01_03', code: '13C.01.03', name: 'Submittals', xwalkId: '2373', description: '', children: [] },
      { id: 'wbs_13C_01_04', code: '13C.01.04', name: 'Equip Rentals', xwalkId: '2374', description: '', children: [] },
      { id: 'wbs_13C_01_05', code: '13C.01.05', name: 'Supervision', xwalkId: '2375', description: '', children: [] },
      { id: 'wbs_13C_01_06', code: '13C.01.06', name: 'Demobilization', xwalkId: '2376', description: '', children: [] },
      { id: 'wbs_13C_01_07', code: '13C.01.07', name: 'Close-Out', xwalkId: '2377', description: '', children: [] },
      { id: 'wbs_13C_01_09', code: '13C.01.09', name: 'Cleaning', xwalkId: '2378', description: '', children: [] },
      { id: 'wbs_13C_01_10', code: '13C.01.10', name: 'Mockup', xwalkId: '2379', description: '', children: [] },
      { id: 'wbs_13C_01_13', code: '13C.01.13', name: 'Testing', xwalkId: '2380', description: '', children: [] }
    ] },
    { id: 'wbs_13C_02', code: '13C.02', name: 'Permanent Bleachers/Grandstands', xwalkId: '', description: '', children: [
      { id: 'wbs_13C_02_00', code: '13C.02.00', name: 'Grandstand Seating', xwalkId: '2381', description: '', children: [] },
      { id: 'wbs_13C_02_01', code: '13C.02.01', name: 'Angle Framed Bleachers/Grandstands', xwalkId: '2382', description: '', children: [] },
      { id: 'wbs_13C_02_02', code: '13C.02.02', name: 'Leg Truss Bleachers/Grandstands', xwalkId: '2383', description: '', children: [] },
      { id: 'wbs_13C_02_03', code: '13C.02.03', name: 'Beam Supported Permanent Grandstands', xwalkId: '2384', description: '', children: [] },
      { id: 'wbs_13C_02_04', code: '13C.02.04', name: 'Bleacher/Grandstand Foundation', xwalkId: '2385', description: '', children: [] }
    ] },
    { id: 'wbs_13C_03', code: '13C.03', name: 'Portable/Folding Site Bleachers', xwalkId: '', description: '', children: [
      { id: 'wbs_13C_03_01', code: '13C.03.01', name: 'Portable Site Bleachers', xwalkId: '2386', description: '', children: [] },
      { id: 'wbs_13C_03_02', code: '13C.03.02', name: 'Retractable Site Bleachers/Seatings', xwalkId: '2387', description: '', children: [] }
    ] },
    { id: 'wbs_13C_04', code: '13C.04', name: 'Stadium Seating Components', xwalkId: '', description: '', children: [
      { id: 'wbs_13C_04_01', code: '13C.04.01', name: 'Stadium Seating Stairs', xwalkId: '2388', description: '', children: [] },
      { id: 'wbs_13C_04_02', code: '13C.04.02', name: 'Stadium Seating Ramps', xwalkId: '2389', description: '', children: [] },
      { id: 'wbs_13C_04_03', code: '13C.04.03', name: 'Stadium Seating Riser Boards', xwalkId: '2390', description: '', children: [] },
      { id: 'wbs_13C_04_04', code: '13C.04.04', name: 'Stadium Seating Chairs/Benches', xwalkId: '2391', description: '', children: [] },
      { id: 'wbs_13C_04_05', code: '13C.04.05', name: 'Stadium Seating Deck System', xwalkId: '2392', description: '', children: [] },
      { id: 'wbs_13C_04_06', code: '13C.04.06', name: 'Stadium Seating Railings', xwalkId: '2393', description: '', children: [] },
      { id: 'wbs_13C_04_07', code: '13C.04.07', name: 'Stadium Seating Fence & Gates', xwalkId: '2394', description: '', children: [] }
    ] },
    { id: 'wbs_13C_05', code: '13C.05', name: 'Stadium Seating Allied Structures', xwalkId: '', description: '', children: [
      { id: 'wbs_13C_05_01', code: '13C.05.01', name: 'Press Box', xwalkId: '2395', description: '', children: [] },
      { id: 'wbs_13C_05_02', code: '13C.05.02', name: 'Storage Rooms', xwalkId: '2396', description: '', children: [] },
      { id: 'wbs_13C_05_03', code: '13C.05.03', name: 'Ticket Booths', xwalkId: '2397', description: '', children: [] },
      { id: 'wbs_13C_05_04', code: '13C.05.04', name: 'Scorers Booths', xwalkId: '2398', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13D', code: '13D', name: 'Special Athletic Structures', xwalkId: '', description: '', children: [
    { id: 'wbs_13D_01', code: '13D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13D_01_01', code: '13D.01.01', name: 'Mobilization', xwalkId: '2399', description: '', children: [] },
      { id: 'wbs_13D_01_02', code: '13D.01.02', name: 'Bond/Permit', xwalkId: '2400', description: '', children: [] },
      { id: 'wbs_13D_01_03', code: '13D.01.03', name: 'Submittals', xwalkId: '2401', description: '', children: [] },
      { id: 'wbs_13D_01_04', code: '13D.01.04', name: 'Equip Rentals', xwalkId: '2402', description: '', children: [] },
      { id: 'wbs_13D_01_07', code: '13D.01.07', name: 'Close-Out', xwalkId: '2403', description: '', children: [] },
      { id: 'wbs_13D_01_09', code: '13D.01.09', name: 'Cleaning', xwalkId: '2404', description: '', children: [] }
    ] },
    { id: 'wbs_13D_02', code: '13D.02', name: 'Athletic Towers', xwalkId: '', description: '', children: [
      { id: 'wbs_13D_02_10', code: '13D.02.10', name: 'Band Towers', xwalkId: '2405', description: '', children: [] },
      { id: 'wbs_13D_02_20', code: '13D.02.20', name: 'Sports Video/Viewing Towers', xwalkId: '2406', description: '', children: [] },
      { id: 'wbs_13D_02_30', code: '13D.02.30', name: 'Rappel Towers', xwalkId: '2407', description: '', children: [] }
    ] },
    { id: 'wbs_13D_03', code: '13D.03', name: 'Non-Athletic Towers', xwalkId: '', description: '', children: [
      { id: 'wbs_13D_03_10', code: '13D.03.10', name: 'Observation Towers', xwalkId: '2408', description: '', children: [] },
      { id: 'wbs_13D_03_20', code: '13D.03.20', name: 'Guard Towers', xwalkId: '2409', description: '', children: [] },
      { id: 'wbs_13D_03_30', code: '13D.03.30', name: 'Range Towers', xwalkId: '2410', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13E', code: '13E', name: 'Pre-Engineered Metal Building', xwalkId: '', description: '', children: [
    { id: 'wbs_13E_00', code: '13E.00', name: 'PEMB System', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_00_00', code: '13E.00.00', name: 'PEMB - Turnkey', xwalkId: '2411', description: '', children: [] }
    ] },
    { id: 'wbs_13E_01', code: '13E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_01_01', code: '13E.01.01', name: 'Mobilization', xwalkId: '2412', description: '', children: [] },
      { id: 'wbs_13E_01_02', code: '13E.01.02', name: 'Bond/Permit', xwalkId: '2413', description: '', children: [] },
      { id: 'wbs_13E_01_03', code: '13E.01.03', name: 'Submittals', xwalkId: '2414', description: '', children: [] },
      { id: 'wbs_13E_01_04', code: '13E.01.04', name: 'Equip Rentals', xwalkId: '2415', description: '', children: [] },
      { id: 'wbs_13E_01_05', code: '13E.01.05', name: 'Supervision', xwalkId: '2416', description: '', children: [] },
      { id: 'wbs_13E_01_06', code: '13E.01.06', name: 'Demobilization', xwalkId: '2417', description: '', children: [] },
      { id: 'wbs_13E_01_07', code: '13E.01.07', name: 'Close-Out', xwalkId: '2418', description: '', children: [] },
      { id: 'wbs_13E_01_09', code: '13E.01.09', name: 'Cleaning', xwalkId: '2419', description: '', children: [] },
      { id: 'wbs_13E_01_12', code: '13E.01.12', name: 'Commissioning', xwalkId: '2420', description: '', children: [] },
      { id: 'wbs_13E_01_13', code: '13E.01.13', name: 'Testing', xwalkId: '2421', description: '', children: [] },
      { id: 'wbs_13E_01_14', code: '13E.01.14', name: 'Survey & Layout', xwalkId: '2422', description: '', children: [] },
      { id: 'wbs_13E_01_18', code: '13E.01.18', name: 'Temporary Scaffolding & Platforms', xwalkId: '2423', description: '', children: [] }
    ] },
    { id: 'wbs_13E_02', code: '13E.02', name: 'PEMB Framing System', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_02_10', code: '13E.02.10', name: 'PEMB Columns', xwalkId: '2424', description: '', children: [] },
      { id: 'wbs_13E_02_20', code: '13E.02.20', name: 'PEMB Floor Framing', xwalkId: '2425', description: '', children: [] },
      { id: 'wbs_13E_02_30', code: '13E.02.30', name: 'PEMB Roof Framing', xwalkId: '2426', description: '', children: [] },
      { id: 'wbs_13E_02_40', code: '13E.02.40', name: 'PEMB Wall Framing', xwalkId: '2427', description: '', children: [] }
    ] },
    { id: 'wbs_13E_03', code: '13E.03', name: 'PEMB Panels', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_03_10', code: '13E.03.10', name: 'PEMB Roof Panels', xwalkId: '2428', description: '', children: [] },
      { id: 'wbs_13E_03_20', code: '13E.03.20', name: 'PEMB Wall Panels', xwalkId: '2429', description: '', children: [] }
    ] },
    { id: 'wbs_13E_04', code: '13E.04', name: 'PEMB Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_04_10', code: '13E.04.10', name: 'PEMB Roof Insulation', xwalkId: '2430', description: '', children: [] },
      { id: 'wbs_13E_04_20', code: '13E.04.20', name: 'PEMB Wall Insulation', xwalkId: '2431', description: '', children: [] }
    ] },
    { id: 'wbs_13E_05', code: '13E.05', name: 'PEMB Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_05_10', code: '13E.05.10', name: 'PEMB Gutters & Downspouts', xwalkId: '2432', description: '', children: [] },
      { id: 'wbs_13E_05_20', code: '13E.05.20', name: 'PEMB Flashings', xwalkId: '2433', description: '', children: [] },
      { id: 'wbs_13E_05_30', code: '13E.05.30', name: 'PEMB Roof Jacks', xwalkId: '2434', description: '', children: [] },
      { id: 'wbs_13E_05_40', code: '13E.05.40', name: 'PEMB Roof Curbs', xwalkId: '2435', description: '', children: [] },
      { id: 'wbs_13E_05_50', code: '13E.05.50', name: 'PEMB Sealants', xwalkId: '2436', description: '', children: [] }
    ] },
    { id: 'wbs_13E_06', code: '13E.06', name: 'Pre-Engineered Modular Buildings', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_06_10', code: '13E.06.10', name: 'Pre-Engineered Modular Building Foundation/Concrete', xwalkId: '2437', description: '', children: [] },
      { id: 'wbs_13E_06_20', code: '13E.06.20', name: 'Pre-Engineered Modular Building Structural Framing', xwalkId: '2438', description: '', children: [] },
      { id: 'wbs_13E_06_30', code: '13E.06.30', name: 'Pre-Engineered Modular Building Exterior Enclosure', xwalkId: '2439', description: '', children: [] },
      { id: 'wbs_13E_06_40', code: '13E.06.40', name: 'Pre-Engineered Modular Building Interior Construction', xwalkId: '2440', description: '', children: [] },
      { id: 'wbs_13E_06_50', code: '13E.06.50', name: 'Pre-Engineered Modular Building Fire Protection', xwalkId: '2441', description: '', children: [] },
      { id: 'wbs_13E_06_60', code: '13E.06.60', name: 'Pre-Engineered Modular Building Plumbing', xwalkId: '2442', description: '', children: [] },
      { id: 'wbs_13E_06_70', code: '13E.06.70', name: 'Pre-Engineered Modular Building HVAC', xwalkId: '2443', description: '', children: [] },
      { id: 'wbs_13E_06_80', code: '13E.06.80', name: 'Pre-Engineered Modular Building Electrical', xwalkId: '2444', description: '', children: [] },
      { id: 'wbs_13E_06_90', code: '13E.06.90', name: 'Pre-Engineered Modular Building Technology', xwalkId: '2445', description: '', children: [] }
    ] },
    { id: 'wbs_13E_07', code: '13E.07', name: 'Pre-Fabricated Structures', xwalkId: '', description: '', children: [
      { id: 'wbs_13E_07_10', code: '13E.07.10', name: 'Pre-fabricated Control Booth', xwalkId: '2446', description: '', children: [] },
      { id: 'wbs_13E_07_20', code: '13E.07.20', name: 'Pre-fabricated General Storage Building', xwalkId: '2447', description: '', children: [] },
      { id: 'wbs_13E_07_30', code: '13E.07.30', name: 'Pre-fabricated Chemical Storage Building', xwalkId: '2448', description: '', children: [] },
      { id: 'wbs_13E_07_40', code: '13E.07.40', name: 'Pre-fabricated Equipment Enclosure Building', xwalkId: '2449', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13F', code: '13F', name: 'Fabric Shade Structures', xwalkId: '', description: '', children: [
    { id: 'wbs_13F_01', code: '13F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13F_01_01', code: '13F.01.01', name: 'Mobilization', xwalkId: '2450', description: '', children: [] },
      { id: 'wbs_13F_01_02', code: '13F.01.02', name: 'Bond/Permit', xwalkId: '2451', description: '', children: [] },
      { id: 'wbs_13F_01_03', code: '13F.01.03', name: 'Submittals', xwalkId: '2452', description: '', children: [] },
      { id: 'wbs_13F_01_07', code: '13F.01.07', name: 'Close-Out', xwalkId: '2453', description: '', children: [] },
      { id: 'wbs_13F_01_09', code: '13F.01.09', name: 'Cleaning', xwalkId: '2454', description: '', children: [] },
      { id: 'wbs_13F_01_13', code: '13F.01.13', name: 'Testing', xwalkId: '2455', description: '', children: [] }
    ] },
    { id: 'wbs_13F_02', code: '13F.02', name: 'Fabric Shade Structure System', xwalkId: '', description: '', children: [
      { id: 'wbs_13F_02_10', code: '13F.02.10', name: 'Tensioned Fabric Structures', xwalkId: '2456', description: '', children: [] },
      { id: 'wbs_13F_02_20', code: '13F.02.20', name: 'Framed Fabric Structures', xwalkId: '2457', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13G', code: '13G', name: 'Fountains', xwalkId: '', description: '', children: [
    { id: 'wbs_13G_01', code: '13G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13G_01_01', code: '13G.01.01', name: 'Mobilization', xwalkId: '2458', description: '', children: [] },
      { id: 'wbs_13G_01_02', code: '13G.01.02', name: 'Bond/Permit', xwalkId: '2459', description: '', children: [] },
      { id: 'wbs_13G_01_03', code: '13G.01.03', name: 'Submittals', xwalkId: '2460', description: '', children: [] },
      { id: 'wbs_13G_01_04', code: '13G.01.04', name: 'Equip Rentals', xwalkId: '2461', description: '', children: [] },
      { id: 'wbs_13G_01_05', code: '13G.01.05', name: 'Supervision', xwalkId: '2462', description: '', children: [] },
      { id: 'wbs_13G_01_07', code: '13G.01.07', name: 'Close-Out', xwalkId: '2463', description: '', children: [] },
      { id: 'wbs_13G_01_09', code: '13G.01.09', name: 'Cleaning', xwalkId: '2464', description: '', children: [] }
    ] },
    { id: 'wbs_13G_02', code: '13G.02', name: 'Prefabricated Fountain', xwalkId: '', description: '', children: [
      { id: 'wbs_13G_02_10', code: '13G.02.10', name: 'Exterior Fountains (w/o Pool)', xwalkId: '2465', description: '', children: [] },
      { id: 'wbs_13G_02_20', code: '13G.02.20', name: 'Exterior Fountains (w/ Pool)', xwalkId: '2466', description: '', children: [] },
      { id: 'wbs_13G_02_30', code: '13G.02.30', name: 'Interior Fountains (w/o Pool)', xwalkId: '2467', description: '', children: [] },
      { id: 'wbs_13G_02_40', code: '13G.02.40', name: 'Interior Fountains (w/ Pool)', xwalkId: '2468', description: '', children: [] }
    ] },
    { id: 'wbs_13G_03', code: '13G.03', name: 'Cast-in Place Fountain Structure', xwalkId: '', description: '', children: [
      { id: 'wbs_13G_03_10', code: '13G.03.10', name: 'Concrete for Fountains', xwalkId: '2469', description: '', children: [] },
      { id: 'wbs_13G_03_20', code: '13G.03.20', name: 'Masonry/Cast Stone for Fountains', xwalkId: '2470', description: '', children: [] },
      { id: 'wbs_13G_03_30', code: '13G.03.30', name: 'Stainless Steel/Metals for Fountains', xwalkId: '2471', description: '', children: [] },
      { id: 'wbs_13G_03_40', code: '13G.03.40', name: 'Waterproofing & Sealants for Fountains', xwalkId: '2472', description: '', children: [] },
      { id: 'wbs_13G_03_50', code: '13G.03.50', name: 'Plumbing System for Fountains', xwalkId: '2473', description: '', children: [] },
      { id: 'wbs_13G_03_60', code: '13G.03.60', name: 'Mechanical System for Fountains', xwalkId: '2474', description: '', children: [] },
      { id: 'wbs_13G_03_70', code: '13G.03.70', name: 'Electrical System for Fountains', xwalkId: '2475', description: '', children: [] },
      { id: 'wbs_13G_03_80', code: '13G.03.80', name: 'Paver System for Fountains', xwalkId: '2476', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_13H', code: '13H', name: 'Greenhouse', xwalkId: '', description: '', children: [
    { id: 'wbs_13H_01', code: '13H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_01_01', code: '13H.01.01', name: 'Mobilization', xwalkId: '2477', description: '', children: [] },
      { id: 'wbs_13H_01_02', code: '13H.01.02', name: 'Bond/Permit', xwalkId: '2478', description: '', children: [] },
      { id: 'wbs_13H_01_03', code: '13H.01.03', name: 'Submittals', xwalkId: '2479', description: '', children: [] },
      { id: 'wbs_13H_01_04', code: '13H.01.04', name: 'Equip Rentals', xwalkId: '2480', description: '', children: [] },
      { id: 'wbs_13H_01_07', code: '13H.01.07', name: 'Close-Out', xwalkId: '2481', description: '', children: [] },
      { id: 'wbs_13H_01_09', code: '13H.01.09', name: 'Cleaning', xwalkId: '2482', description: '', children: [] },
      { id: 'wbs_13H_01_13', code: '13H.01.13', name: 'Testing', xwalkId: '2483', description: '', children: [] }
    ] },
    { id: 'wbs_13H_02', code: '13H.02', name: 'Greenhouse Framing', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_02_10', code: '13H.02.10', name: 'Greenhouse Framing System', xwalkId: '2484', description: '', children: [] }
    ] },
    { id: 'wbs_13H_03', code: '13H.03', name: 'Greenhouse Covering', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_03_10', code: '13H.03.10', name: 'Greenhouse Covering - Glass', xwalkId: '2485', description: '', children: [] },
      { id: 'wbs_13H_03_20', code: '13H.03.20', name: 'Greenhouse Covering - Polycarbonate', xwalkId: '2486', description: '', children: [] },
      { id: 'wbs_13H_03_30', code: '13H.03.30', name: 'Greenhouse Covering - Polyethylene Film', xwalkId: '2487', description: '', children: [] }
    ] },
    { id: 'wbs_13H_04', code: '13H.04', name: 'Greenhouse Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_04_10', code: '13H.04.10', name: 'Greenhouse HVAC Systems', xwalkId: '2488', description: '', children: [] },
      { id: 'wbs_13H_04_20', code: '13H.04.20', name: 'Greenhouse Plumbing Systems', xwalkId: '2489', description: '', children: [] },
      { id: 'wbs_13H_04_30', code: '13H.04.30', name: 'Greenhouse Electrical Systems', xwalkId: '2490', description: '', children: [] },
      { id: 'wbs_13H_04_40', code: '13H.04.40', name: 'Greenhouse Lighting Systems', xwalkId: '2491', description: '', children: [] }
    ] },
    { id: 'wbs_13H_05', code: '13H.05', name: 'Greenhouse Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_05_10', code: '13H.05.10', name: 'Greenhouse - Doors', xwalkId: '2492', description: '', children: [] },
      { id: 'wbs_13H_05_20', code: '13H.05.20', name: 'Greenhouse - Inlet/Outlet Screens', xwalkId: '2493', description: '', children: [] },
      { id: 'wbs_13H_05_30', code: '13H.05.30', name: 'Greenhouse - Sun Control/Energy Curtain', xwalkId: '2494', description: '', children: [] }
    ] },
    { id: 'wbs_13H_06', code: '13H.06', name: 'Greenhouse Furnishings', xwalkId: '', description: '', children: [
      { id: 'wbs_13H_06_10', code: '13H.06.10', name: 'Greenhouse - Tables & Beds', xwalkId: '2495', description: '', children: [] },
      { id: 'wbs_13H_06_20', code: '13H.06.20', name: 'Greenhouse - Display Benches', xwalkId: '2496', description: '', children: [] },
      { id: 'wbs_13H_06_30', code: '13H.06.30', name: 'Greenhouse - Hanging Basket Rails', xwalkId: '2497', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_14A', code: '14A', name: 'Elevators', xwalkId: '', description: '', children: [
    { id: 'wbs_14A_01', code: '14A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_01_01', code: '14A.01.01', name: 'Mobilization', xwalkId: '2498', description: '', children: [] },
      { id: 'wbs_14A_01_02', code: '14A.01.02', name: 'Bond/Permit', xwalkId: '2499', description: '', children: [] },
      { id: 'wbs_14A_01_03', code: '14A.01.03', name: 'Submittals', xwalkId: '2500', description: '', children: [] },
      { id: 'wbs_14A_01_04', code: '14A.01.04', name: 'Equip Rentals', xwalkId: '2501', description: '', children: [] },
      { id: 'wbs_14A_01_05', code: '14A.01.05', name: 'Supervision', xwalkId: '2502', description: '', children: [] },
      { id: 'wbs_14A_01_06', code: '14A.01.06', name: 'Demobilization', xwalkId: '2503', description: '', children: [] },
      { id: 'wbs_14A_01_07', code: '14A.01.07', name: 'Close-Out', xwalkId: '2504', description: '', children: [] },
      { id: 'wbs_14A_01_09', code: '14A.01.09', name: 'Cleaning', xwalkId: '2505', description: '', children: [] },
      { id: 'wbs_14A_01_12', code: '14A.01.12', name: 'Commissioning', xwalkId: '2506', description: '', children: [] },
      { id: 'wbs_14A_01_13', code: '14A.01.13', name: 'Testing', xwalkId: '2507', description: '', children: [] }
    ] },
    { id: 'wbs_14A_02', code: '14A.02', name: 'Hydraulic Elevators', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_02_01', code: '14A.02.01', name: 'Hydraulic Passenger Elevator', xwalkId: '2508', description: '', children: [] },
      { id: 'wbs_14A_02_02', code: '14A.02.02', name: 'Hydraulic Freight Elevator', xwalkId: '2509', description: '', children: [] },
      { id: 'wbs_14A_02_03', code: '14A.02.03', name: 'Hydraulic Service Elevator', xwalkId: '2510', description: '', children: [] },
      { id: 'wbs_14A_02_04', code: '14A.02.04', name: 'Hydraulic Residential Elevators', xwalkId: '2511', description: '', children: [] }
    ] },
    { id: 'wbs_14A_03', code: '14A.03', name: 'Electric Traction Elevators', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_03_01', code: '14A.03.01', name: 'Machine Room (MR) Electric Traction Elevators', xwalkId: '2512', description: '', children: [] },
      { id: 'wbs_14A_03_02', code: '14A.03.02', name: 'Machine Room-less (MRL) Electric Traction Elevators', xwalkId: '2513', description: '', children: [] },
      { id: 'wbs_14A_03_03', code: '14A.03.03', name: 'Electric Traction Freight Elevators', xwalkId: '2514', description: '', children: [] },
      { id: 'wbs_14A_03_04', code: '14A.03.04', name: 'Electric Traction Service Elevators', xwalkId: '2515', description: '', children: [] },
      { id: 'wbs_14A_03_05', code: '14A.03.05', name: 'Electric Traction Residential Elevators', xwalkId: '2516', description: '', children: [] }
    ] },
    { id: 'wbs_14A_04', code: '14A.04', name: 'Custom Elevator Finishes', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_04_01', code: '14A.04.01', name: 'Custom Elevator Cab Finishes', xwalkId: '2517', description: '', children: [] },
      { id: 'wbs_14A_04_02', code: '14A.04.02', name: 'Custom Elevator Lobby Finishes', xwalkId: '2518', description: '', children: [] }
    ] },
    { id: 'wbs_14A_05', code: '14A.05', name: 'Dumbwaiters', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_05_01', code: '14A.05.01', name: 'Hydraulic Dumbwaiters', xwalkId: '2519', description: '', children: [] },
      { id: 'wbs_14A_05_02', code: '14A.05.02', name: 'Electric Dumbwaiters', xwalkId: '2520', description: '', children: [] }
    ] },
    { id: 'wbs_14A_06', code: '14A.06', name: 'Escalators & Moving Walks', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_06_01', code: '14A.06.01', name: 'Escalator', xwalkId: '2521', description: '', children: [] },
      { id: 'wbs_14A_06_02', code: '14A.06.02', name: 'Moving Walks/Ramps', xwalkId: '2522', description: '', children: [] }
    ] },
    { id: 'wbs_14A_07', code: '14A.07', name: 'Additional Elevator Features', xwalkId: '', description: '', children: [
      { id: 'wbs_14A_07_01', code: '14A.07.01', name: 'Additional Features', xwalkId: '2523', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_14B', code: '14B', name: 'Lifts', xwalkId: '', description: '', children: [
    { id: 'wbs_14B_01', code: '14B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_14B_01_01', code: '14B.01.01', name: 'Mobilization', xwalkId: '2524', description: '', children: [] },
      { id: 'wbs_14B_01_02', code: '14B.01.02', name: 'Bond/Permit', xwalkId: '2525', description: '', children: [] },
      { id: 'wbs_14B_01_03', code: '14B.01.03', name: 'Submittals', xwalkId: '2526', description: '', children: [] },
      { id: 'wbs_14B_01_04', code: '14B.01.04', name: 'Equip Rentals', xwalkId: '2527', description: '', children: [] },
      { id: 'wbs_14B_01_06', code: '14B.01.06', name: 'Demobilization', xwalkId: '2528', description: '', children: [] },
      { id: 'wbs_14B_01_07', code: '14B.01.07', name: 'Close-Out', xwalkId: '2529', description: '', children: [] },
      { id: 'wbs_14B_01_09', code: '14B.01.09', name: 'Cleaning', xwalkId: '2530', description: '', children: [] },
      { id: 'wbs_14B_01_12', code: '14B.01.12', name: 'Commissioning', xwalkId: '2531', description: '', children: [] },
      { id: 'wbs_14B_01_13', code: '14B.01.13', name: 'Testing', xwalkId: '2532', description: '', children: [] }
    ] },
    { id: 'wbs_14B_02', code: '14B.02', name: 'People Lifts', xwalkId: '', description: '', children: [
      { id: 'wbs_14B_02_01', code: '14B.02.01', name: 'Patient Care Lift System', xwalkId: '2533', description: '', children: [] },
      { id: 'wbs_14B_02_02', code: '14B.02.02', name: 'Wheelchair Lifts', xwalkId: '2534', description: '', children: [] }
    ] },
    { id: 'wbs_14B_03', code: '14B.03', name: 'Platform Lifts', xwalkId: '', description: '', children: [
      { id: 'wbs_14B_03_01', code: '14B.03.01', name: 'Orchestra Lifts', xwalkId: '2535', description: '', children: [] },
      { id: 'wbs_14B_03_02', code: '14B.03.02', name: 'Stage Lifts', xwalkId: '2536', description: '', children: [] }
    ] },
    { id: 'wbs_14B_04', code: '14B.04', name: 'Vehicle Lifts', xwalkId: '', description: '', children: [
      { id: 'wbs_14B_04_01', code: '14B.04.01', name: 'Vehicle Service Lifts', xwalkId: '2537', description: '', children: [] },
      { id: 'wbs_14B_04_02', code: '14B.04.02', name: 'Vehicle Parking Lifts', xwalkId: '2538', description: '', children: [] }
    ] },
    { id: 'wbs_14B_05', code: '14B.05', name: 'Material Lifts', xwalkId: '', description: '', children: [
      { id: 'wbs_14B_05_01', code: '14B.05.01', name: 'Material Handling Lifts', xwalkId: '2539', description: '', children: [] },
      { id: 'wbs_14B_05_02', code: '14B.05.02', name: 'Material Scissor Lifts', xwalkId: '2540', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_14C', code: '14C', name: 'Trash Chutes', xwalkId: '', description: '', children: [
    { id: 'wbs_14C_01', code: '14C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_01_01', code: '14C.01.01', name: 'Mobilization', xwalkId: '2541', description: '', children: [] },
      { id: 'wbs_14C_01_02', code: '14C.01.02', name: 'Bond/Permit', xwalkId: '2542', description: '', children: [] },
      { id: 'wbs_14C_01_03', code: '14C.01.03', name: 'Submittals', xwalkId: '2543', description: '', children: [] },
      { id: 'wbs_14C_01_04', code: '14C.01.04', name: 'Equip Rentals', xwalkId: '2544', description: '', children: [] },
      { id: 'wbs_14C_01_05', code: '14C.01.05', name: 'Supervision', xwalkId: '2545', description: '', children: [] },
      { id: 'wbs_14C_01_07', code: '14C.01.07', name: 'Close-Out', xwalkId: '2546', description: '', children: [] },
      { id: 'wbs_14C_01_09', code: '14C.01.09', name: 'Cleaning', xwalkId: '2547', description: '', children: [] },
      { id: 'wbs_14C_01_13', code: '14C.01.13', name: 'Testing', xwalkId: '2548', description: '', children: [] }
    ] },
    { id: 'wbs_14C_02', code: '14C.02', name: 'Trash Chute Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_02_10', code: '14C.02.10', name: 'Standard Trash Chute System', xwalkId: '2549', description: '', children: [] },
      { id: 'wbs_14C_02_20', code: '14C.02.20', name: 'Pneumatic Trash Chute System', xwalkId: '2550', description: '', children: [] },
      { id: 'wbs_14C_02_30', code: '14C.02.30', name: 'Medical Waste Chute System', xwalkId: '2551', description: '', children: [] }
    ] },
    { id: 'wbs_14C_03', code: '14C.03', name: 'Trash Chute Chase', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_03_10', code: '14C.03.10', name: 'Trash Chute', xwalkId: '2552', description: '', children: [] }
    ] },
    { id: 'wbs_14C_04', code: '14C.04', name: 'Trash Chute Doors', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_04_10', code: '14C.04.10', name: 'Trash Chute Intake Doors', xwalkId: '2553', description: '', children: [] },
      { id: 'wbs_14C_04_20', code: '14C.04.20', name: 'Trash Chute Discharge-Doors', xwalkId: '2554', description: '', children: [] },
      { id: 'wbs_14C_04_30', code: '14C.04.30', name: 'Trash Chute Access Doors', xwalkId: '2555', description: '', children: [] }
    ] },
    { id: 'wbs_14C_05', code: '14C.05', name: 'Trash Chute Control System', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_05_10', code: '14C.05.10', name: 'Trash Chute Mechanical Interlocks', xwalkId: '2556', description: '', children: [] },
      { id: 'wbs_14C_05_20', code: '14C.05.20', name: 'Trash Chute Electrical Interlocks', xwalkId: '2557', description: '', children: [] },
      { id: 'wbs_14C_05_30', code: '14C.05.30', name: 'Trash Chute Manual Control System', xwalkId: '2558', description: '', children: [] },
      { id: 'wbs_14C_05_40', code: '14C.05.40', name: 'Trash Chute Recycling System', xwalkId: '2559', description: '', children: [] }
    ] },
    { id: 'wbs_14C_06', code: '14C.06', name: 'Trash Chute Components', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_06_10', code: '14C.06.10', name: 'Trash Chute Roof Vents', xwalkId: '2560', description: '', children: [] },
      { id: 'wbs_14C_06_20', code: '14C.06.20', name: 'Trash Chute Fire Sprinklers', xwalkId: '2561', description: '', children: [] },
      { id: 'wbs_14C_06_30', code: '14C.06.30', name: 'Trash Chute Heat & Smoke Detector System', xwalkId: '2562', description: '', children: [] }
    ] },
    { id: 'wbs_14C_07', code: '14C.07', name: 'Trash Chute Maintenance Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_07_10', code: '14C.07.10', name: 'Trash Chute Flushing Spray Unit', xwalkId: '2563', description: '', children: [] },
      { id: 'wbs_14C_07_20', code: '14C.07.20', name: 'Trash Chute Disinfecting & Sanitizing  Unit', xwalkId: '2564', description: '', children: [] }
    ] },
    { id: 'wbs_14C_08', code: '14C.08', name: 'Trash Chute Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_14C_08_10', code: '14C.08.10', name: 'Trash Chute Intake Door Baffles', xwalkId: '2565', description: '', children: [] },
      { id: 'wbs_14C_08_20', code: '14C.08.20', name: 'Trash Chute Sound Dampening', xwalkId: '2566', description: '', children: [] },
      { id: 'wbs_14C_08_30', code: '14C.08.30', name: 'Trash Chute Sound Isolators', xwalkId: '2567', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_21A', code: '21A', name: 'Fire Suppression', xwalkId: '', description: '', children: [
    { id: 'wbs_21A_00', code: '21A.00', name: 'Fire Suppression (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_00_00', code: '21A.00.00', name: 'Fire Suppression Systems', xwalkId: '2568', description: '', children: [] }
    ] },
    { id: 'wbs_21A_01', code: '21A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_01_01', code: '21A.01.01', name: 'Mobilization', xwalkId: '2569', description: '', children: [] },
      { id: 'wbs_21A_01_02', code: '21A.01.02', name: 'Bond/Permit', xwalkId: '2570', description: '', children: [] },
      { id: 'wbs_21A_01_03', code: '21A.01.03', name: 'Submittals', xwalkId: '2571', description: '', children: [] },
      { id: 'wbs_21A_01_04', code: '21A.01.04', name: 'Equip Rentals', xwalkId: '2572', description: '', children: [] },
      { id: 'wbs_21A_01_05', code: '21A.01.05', name: 'Supervision', xwalkId: '2573', description: '', children: [] },
      { id: 'wbs_21A_01_06', code: '21A.01.06', name: 'Demobilization', xwalkId: '2574', description: '', children: [] },
      { id: 'wbs_21A_01_07', code: '21A.01.07', name: 'Close-Out', xwalkId: '2575', description: '', children: [] },
      { id: 'wbs_21A_01_09', code: '21A.01.09', name: 'Cleaning', xwalkId: '2576', description: '', children: [] },
      { id: 'wbs_21A_01_13', code: '21A.01.13', name: 'Testing', xwalkId: '2577', description: '', children: [] }
    ] },
    { id: 'wbs_21A_02', code: '21A.02', name: 'Wet-Pipe Sprinkler Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_02_01', code: '21A.02.01', name: 'Fire Sprinkler Underground (5\' Out to 1\' AFF)', xwalkId: '2578', description: '', children: [] },
      { id: 'wbs_21A_02_02', code: '21A.02.02', name: 'Fire-Suppression Standpipes', xwalkId: '2579', description: '', children: [] },
      { id: 'wbs_21A_02_03', code: '21A.02.03', name: 'Wet-Pipe Sprinkler Riser', xwalkId: '2580', description: '', children: [] },
      { id: 'wbs_21A_02_04', code: '21A.02.04', name: 'Wet-Pipe Sprinkler Piping (Main/Branchline)', xwalkId: '2581', description: '', children: [] },
      { id: 'wbs_21A_02_05', code: '21A.02.05', name: 'Wet-Pipe Sprinkler Heads', xwalkId: '2582', description: '', children: [] },
      { id: 'wbs_21A_02_06', code: '21A.02.06', name: 'Dry Horizontal Sidewall', xwalkId: '2583', description: '', children: [] }
    ] },
    { id: 'wbs_21A_03', code: '21A.03', name: 'Dry-Pipe Sprinkler Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_03_01', code: '21A.03.01', name: 'Dry-Pipe Sprinkler Piping', xwalkId: '2584', description: '', children: [] },
      { id: 'wbs_21A_03_02', code: '21A.03.02', name: 'Dry-Pipe Sprinkler Heads', xwalkId: '2585', description: '', children: [] }
    ] },
    { id: 'wbs_21A_04', code: '21A.04', name: 'Fire Extinguishing Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_04_01', code: '21A.04.01', name: 'Clean-Agent Fire-Extinguishing Systems', xwalkId: '2586', description: '', children: [] }
    ] },
    { id: 'wbs_21A_05', code: '21A.05', name: 'Pump & Tank', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_05_01', code: '21A.05.01', name: 'Fire Pumps', xwalkId: '2587', description: '', children: [] },
      { id: 'wbs_21A_05_02', code: '21A.05.02', name: 'Fire Water Storage Tank', xwalkId: '2588', description: '', children: [] },
      { id: 'wbs_21A_05_03', code: '21A.05.03', name: 'Fire Water Surge Tank', xwalkId: '2589', description: '', children: [] }
    ] },
    { id: 'wbs_21A_06', code: '21A.06', name: 'Fire Suppression Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_21A_06_01', code: '21A.06.01', name: 'Fire-Suppression Piping Insulation', xwalkId: '2590', description: '', children: [] },
      { id: 'wbs_21A_06_02', code: '21A.06.02', name: 'Fire-Suppression Heat Tracing', xwalkId: '2591', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_22A', code: '22A', name: 'Plumbing', xwalkId: '', description: '', children: [
    { id: 'wbs_22A_00', code: '22A.00', name: 'Plumbing (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_00_00', code: '22A.00.00', name: 'Plumbing Systems', xwalkId: '2592', description: '', children: [] }
    ] },
    { id: 'wbs_22A_01', code: '22A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_01_01', code: '22A.01.01', name: 'Mobilization', xwalkId: '2593', description: '', children: [] },
      { id: 'wbs_22A_01_02', code: '22A.01.02', name: 'Bond/Permit', xwalkId: '2594', description: '', children: [] },
      { id: 'wbs_22A_01_03', code: '22A.01.03', name: 'Submittals', xwalkId: '2595', description: '', children: [] },
      { id: 'wbs_22A_01_04', code: '22A.01.04', name: 'Equip Rentals', xwalkId: '2596', description: '', children: [] },
      { id: 'wbs_22A_01_05', code: '22A.01.05', name: 'Supervision', xwalkId: '2597', description: '', children: [] },
      { id: 'wbs_22A_01_06', code: '22A.01.06', name: 'Demobilization', xwalkId: '2598', description: '', children: [] },
      { id: 'wbs_22A_01_07', code: '22A.01.07', name: 'Close-Out', xwalkId: '2599', description: '', children: [] },
      { id: 'wbs_22A_01_12', code: '22A.01.12', name: 'Commissioning', xwalkId: '2600', description: '', children: [] }
    ] },
    { id: 'wbs_22A_02', code: '22A.02', name: 'Water Distribution', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_02_01', code: '22A.02.01', name: 'Below Grade Domestic Water Piping', xwalkId: '2601', description: '', children: [] },
      { id: 'wbs_22A_02_02', code: '22A.02.02', name: 'Above Grade Domestic Water Piping', xwalkId: '2602', description: '', children: [] },
      { id: 'wbs_22A_02_03', code: '22A.02.03', name: 'Domestic Water Fixtures', xwalkId: '2603', description: '', children: [] },
      { id: 'wbs_22A_02_04', code: '22A.02.04', name: 'Domestic Water Equipment', xwalkId: '2604', description: '', children: [] }
    ] },
    { id: 'wbs_22A_03', code: '22A.03', name: 'Sanitary Drainage', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_03_01', code: '22A.03.01', name: 'Below Grade Sanitary Piping', xwalkId: '2605', description: '', children: [] },
      { id: 'wbs_22A_03_02', code: '22A.03.02', name: 'Above Grade Sanitary & Vent Piping', xwalkId: '2606', description: '', children: [] },
      { id: 'wbs_22A_03_03', code: '22A.03.03', name: 'Sanitary Fixtures', xwalkId: '2607', description: '', children: [] },
      { id: 'wbs_22A_03_04', code: '22A.03.04', name: 'Sanitary Equipment', xwalkId: '2608', description: '', children: [] },
      { id: 'wbs_22A_03_05', code: '22A.03.05', name: 'Below Grade Sanitary Support System - Suspended', xwalkId: '2609', description: '', children: [] },
      { id: 'wbs_22A_03_06', code: '22A.03.06', name: 'Below Grade Sanitary Support System - Bedding Material', xwalkId: '2610', description: '', children: [] }
    ] },
    { id: 'wbs_22A_04', code: '22A.04', name: 'Storm Drainage', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_04_01', code: '22A.04.01', name: 'Below Grade Storm Piping', xwalkId: '2611', description: '', children: [] },
      { id: 'wbs_22A_04_02', code: '22A.04.02', name: 'Above Grade Storm Piping', xwalkId: '2612', description: '', children: [] },
      { id: 'wbs_22A_04_03', code: '22A.04.03', name: 'Storm Fixtures', xwalkId: '2613', description: '', children: [] },
      { id: 'wbs_22A_04_04', code: '22A.04.04', name: 'Storm Equipment', xwalkId: '2614', description: '', children: [] }
    ] },
    { id: 'wbs_22A_05', code: '22A.05', name: 'Foundation Subdrainage', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_05_01', code: '22A.05.01', name: 'Foundation Subdrainage Piping', xwalkId: '2615', description: '', children: [] },
      { id: 'wbs_22A_05_02', code: '22A.05.02', name: 'Foundation Subdrainage Equipment', xwalkId: '2616', description: '', children: [] }
    ] },
    { id: 'wbs_22A_06', code: '22A.06', name: 'Acid Waste', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_06_01', code: '22A.06.01', name: 'Below Grade Acid Waste Piping', xwalkId: '2617', description: '', children: [] },
      { id: 'wbs_22A_06_02', code: '22A.06.02', name: 'Above Grade Acid Waste & Vent Piping', xwalkId: '2618', description: '', children: [] },
      { id: 'wbs_22A_06_03', code: '22A.06.03', name: 'Acid Waste Fixtures', xwalkId: '2619', description: '', children: [] },
      { id: 'wbs_22A_06_04', code: '22A.06.04', name: 'Acid Waste Equipment', xwalkId: '2620', description: '', children: [] }
    ] },
    { id: 'wbs_22A_07', code: '22A.07', name: 'Compressed Air System', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_07_01', code: '22A.07.01', name: 'Compressed-Air Piping', xwalkId: '2621', description: '', children: [] },
      { id: 'wbs_22A_07_02', code: '22A.07.02', name: 'Compressed-Air Equipment', xwalkId: '2622', description: '', children: [] }
    ] },
    { id: 'wbs_22A_08', code: '22A.08', name: 'Gas System', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_08_01', code: '22A.08.01', name: 'Below Grade Natural Gas Piping', xwalkId: '2623', description: '', children: [] },
      { id: 'wbs_22A_08_02', code: '22A.08.02', name: 'Above Grade Natural Gas Piping', xwalkId: '2624', description: '', children: [] },
      { id: 'wbs_22A_08_03', code: '22A.08.03', name: 'Natural Gas Fixtures', xwalkId: '2625', description: '', children: [] },
      { id: 'wbs_22A_08_04', code: '22A.08.04', name: 'Natural Gas Equipment', xwalkId: '2626', description: '', children: [] },
      { id: 'wbs_22A_08_05', code: '22A.08.05', name: 'Medical Gas & Air Piping', xwalkId: '2627', description: '', children: [] },
      { id: 'wbs_22A_08_06', code: '22A.08.06', name: 'Medical Gas & Air Equipment', xwalkId: '2628', description: '', children: [] }
    ] },
    { id: 'wbs_22A_09', code: '22A.09', name: 'Site Plumbing', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_09_01', code: '22A.09.01', name: 'Below Grade Site Plumbing Piping', xwalkId: '2629', description: '', children: [] },
      { id: 'wbs_22A_09_02', code: '22A.09.02', name: 'Above Grade Site Plumbing Piping', xwalkId: '2630', description: '', children: [] },
      { id: 'wbs_22A_09_03', code: '22A.09.03', name: 'Site Plumbing Fixtures', xwalkId: '2631', description: '', children: [] }
    ] },
    { id: 'wbs_22A_10', code: '22A.10', name: 'Plumbing Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_22A_10_01', code: '22A.10.01', name: 'Piping/Equipment Insulation', xwalkId: '2632', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_23A', code: '23A', name: 'HVAC', xwalkId: '', description: '', children: [
    { id: 'wbs_23A_00', code: '23A.00', name: 'HVAC (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_00_00', code: '23A.00.00', name: 'HVAC Systems', xwalkId: '2633', description: '', children: [] }
    ] },
    { id: 'wbs_23A_01', code: '23A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_01_01', code: '23A.01.01', name: 'Mobilization', xwalkId: '2634', description: '', children: [] },
      { id: 'wbs_23A_01_02', code: '23A.01.02', name: 'Bond/Permit', xwalkId: '2635', description: '', children: [] },
      { id: 'wbs_23A_01_03', code: '23A.01.03', name: 'Submittals', xwalkId: '2636', description: '', children: [] },
      { id: 'wbs_23A_01_04', code: '23A.01.04', name: 'Equip Rentals', xwalkId: '2637', description: '', children: [] },
      { id: 'wbs_23A_01_05', code: '23A.01.05', name: 'Supervision', xwalkId: '2638', description: '', children: [] },
      { id: 'wbs_23A_01_06', code: '23A.01.06', name: 'Demobilization', xwalkId: '2639', description: '', children: [] },
      { id: 'wbs_23A_01_07', code: '23A.01.07', name: 'Close-Out', xwalkId: '2640', description: '', children: [] },
      { id: 'wbs_23A_01_09', code: '23A.01.09', name: 'Cleaning', xwalkId: '2641', description: '', children: [] },
      { id: 'wbs_23A_01_12', code: '23A.01.12', name: 'Commissioning', xwalkId: '2642', description: '', children: [] },
      { id: 'wbs_23A_01_13', code: '23A.01.13', name: 'Testing', xwalkId: '2643', description: '', children: [] }
    ] },
    { id: 'wbs_23A_02', code: '23A.02', name: 'HVAC Piping & Pumps', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_02_01', code: '23A.02.01', name: 'Underground Hydronic Piping', xwalkId: '2644', description: '', children: [] },
      { id: 'wbs_23A_02_02', code: '23A.02.02', name: 'Aboveground Hydronic Piping', xwalkId: '2645', description: '', children: [] },
      { id: 'wbs_23A_02_03', code: '23A.02.03', name: 'Ground-Loop Heat-Pump Piping/Geothermal System', xwalkId: '2646', description: '', children: [] },
      { id: 'wbs_23A_02_04', code: '23A.02.04', name: 'Hydronic Pumps', xwalkId: '2647', description: '', children: [] },
      { id: 'wbs_23A_02_05', code: '23A.02.05', name: 'Steam & Condensate Heating Piping', xwalkId: '2648', description: '', children: [] },
      { id: 'wbs_23A_02_06', code: '23A.02.06', name: 'Steam Condensate Pumps', xwalkId: '2649', description: '', children: [] },
      { id: 'wbs_23A_02_07', code: '23A.02.07', name: 'Refrigerant Piping', xwalkId: '2650', description: '', children: [] },
      { id: 'wbs_23A_02_08', code: '23A.02.08', name: 'HVAC Condensate Drain Piping', xwalkId: '2651', description: '', children: [] },
      { id: 'wbs_23A_02_09', code: '23A.02.09', name: 'HVAC Water Treatment', xwalkId: '2652', description: '', children: [] }
    ] },
    { id: 'wbs_23A_03', code: '23A.03', name: 'HVAC Air Distribution', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_03_01', code: '23A.03.01', name: 'Ductwork - Sheet Metal', xwalkId: '2653', description: '', children: [] },
      { id: 'wbs_23A_03_02', code: '23A.03.02', name: 'Ductwork - Pre-insulated', xwalkId: '2654', description: '', children: [] },
      { id: 'wbs_23A_03_03', code: '23A.03.03', name: 'Ductwork - Duct Board', xwalkId: '2655', description: '', children: [] },
      { id: 'wbs_23A_03_04', code: '23A.03.04', name: 'Ductwork - Flexible', xwalkId: '2656', description: '', children: [] },
      { id: 'wbs_23A_03_05', code: '23A.03.05', name: 'Air Terminal Units', xwalkId: '2657', description: '', children: [] },
      { id: 'wbs_23A_03_06', code: '23A.03.06', name: 'Grilles, Registers & Diffusers (GRD)', xwalkId: '2658', description: '', children: [] },
      { id: 'wbs_23A_03_07', code: '23A.03.07', name: 'HVAC Air Curtains', xwalkId: '2659', description: '', children: [] }
    ] },
    { id: 'wbs_23A_04', code: '23A.04', name: 'Central Cooling Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_04_01', code: '23A.04.01', name: 'Chillers', xwalkId: '2660', description: '', children: [] },
      { id: 'wbs_23A_04_02', code: '23A.04.02', name: 'Cooling Towers', xwalkId: '2661', description: '', children: [] },
      { id: 'wbs_23A_04_03', code: '23A.04.03', name: 'Condenser Units', xwalkId: '2662', description: '', children: [] },
      { id: 'wbs_23A_04_04', code: '23A.04.04', name: 'Condensing Boilers', xwalkId: '2663', description: '', children: [] }
    ] },
    { id: 'wbs_23A_05', code: '23A.05', name: 'Central Heating Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_05_01', code: '23A.05.01', name: 'Heating Boilers', xwalkId: '2664', description: '', children: [] },
      { id: 'wbs_23A_05_02', code: '23A.05.02', name: 'Gas Fired Heaters', xwalkId: '2665', description: '', children: [] },
      { id: 'wbs_23A_05_03', code: '23A.05.03', name: 'Heat Exchangers for HVAC', xwalkId: '2666', description: '', children: [] },
      { id: 'wbs_23A_05_04', code: '23A.05.04', name: 'Energy Recovery Equipment (ERV)', xwalkId: '2667', description: '', children: [] }
    ] },
    { id: 'wbs_23A_06', code: '23A.06', name: 'Central HVAC Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_06_01', code: '23A.06.01', name: 'Indoor Central-Station Air-Handling Units', xwalkId: '2668', description: '', children: [] },
      { id: 'wbs_23A_06_02', code: '23A.06.02', name: 'Packaged, Outdoor Air-Handling Units', xwalkId: '2669', description: '', children: [] },
      { id: 'wbs_23A_06_03', code: '23A.06.03', name: 'Packaged, Rooftop Air-Conditioning Units', xwalkId: '2670', description: '', children: [] },
      { id: 'wbs_23A_06_04', code: '23A.06.04', name: 'Packaged, Rooftop Air-Handling Units', xwalkId: '2671', description: '', children: [] }
    ] },
    { id: 'wbs_23A_07', code: '23A.07', name: 'Decentralized HVAC Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_07_01', code: '23A.07.01', name: 'Packaged Terminal Air-Conditioners', xwalkId: '2672', description: '', children: [] },
      { id: 'wbs_23A_07_02', code: '23A.07.02', name: 'Mini-Split-System Air-Conditioners', xwalkId: '2673', description: '', children: [] },
      { id: 'wbs_23A_07_03', code: '23A.07.03', name: 'Fan Coil Units', xwalkId: '2674', description: '', children: [] },
      { id: 'wbs_23A_07_04', code: '23A.07.04', name: 'Unit Heaters', xwalkId: '2675', description: '', children: [] },
      { id: 'wbs_23A_07_05', code: '23A.07.05', name: 'Large Size Ceiling Fans', xwalkId: '2676', description: '', children: [] },
      { id: 'wbs_23A_07_06', code: '23A.07.06', name: 'Humidity Control Equipment', xwalkId: '2677', description: '', children: [] }
    ] },
    { id: 'wbs_23A_08', code: '23A.08', name: 'Ventilation', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_08_01', code: '23A.08.01', name: 'Louvers & Vents', xwalkId: '2678', description: '', children: [] },
      { id: 'wbs_23A_08_02', code: '23A.08.02', name: 'HVAC Exhaust Fans', xwalkId: '2679', description: '', children: [] },
      { id: 'wbs_23A_08_03', code: '23A.08.03', name: 'HVAC Gravity Ventilators', xwalkId: '2680', description: '', children: [] },
      { id: 'wbs_23A_08_04', code: '23A.08.04', name: 'Ventilation Hoods', xwalkId: '2681', description: '', children: [] },
      { id: 'wbs_23A_08_05', code: '23A.08.05', name: 'Breechings, Chimneys, & Stacks', xwalkId: '2682', description: '', children: [] },
      { id: 'wbs_23A_08_06', code: '23A.08.06', name: 'Special Exhaust Systems', xwalkId: '2683', description: '', children: [] },
      { id: 'wbs_23A_08_07', code: '23A.08.07', name: 'Smoke Evacuation System', xwalkId: '2684', description: '', children: [] },
      { id: 'wbs_23A_08_08', code: '23A.08.08', name: 'HVAC Supply Fans', xwalkId: '2685', description: '', children: [] }
    ] },
    { id: 'wbs_23A_09', code: '23A.09', name: 'HVAC Air Cleaning Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_09_01', code: '23A.09.01', name: 'Particulate Air Filtration', xwalkId: '2686', description: '', children: [] },
      { id: 'wbs_23A_09_02', code: '23A.09.02', name: 'Electronic Air Cleaners', xwalkId: '2687', description: '', children: [] }
    ] },
    { id: 'wbs_23A_10', code: '23A.10', name: 'HVAC Insulation', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_10_01', code: '23A.10.01', name: 'HVAC Duct Insulation', xwalkId: '2688', description: '', children: [] },
      { id: 'wbs_23A_10_02', code: '23A.10.02', name: 'HVAC Pipe Insulation', xwalkId: '2689', description: '', children: [] }
    ] },
    { id: 'wbs_23A_11', code: '23A.11', name: 'HVAC Supplementary Components', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_11_01', code: '23A.11.01', name: 'HVAC Heat Tracing', xwalkId: '2690', description: '', children: [] },
      { id: 'wbs_23A_11_02', code: '23A.11.02', name: 'Vibration Isolation for HVAC', xwalkId: '2691', description: '', children: [] },
      { id: 'wbs_23A_11_03', code: '23A.11.03', name: 'Duct Silencers/Sound Attenuator', xwalkId: '2692', description: '', children: [] },
      { id: 'wbs_23A_11_04', code: '23A.11.04', name: 'Fire Dampers/Smoke Dampers', xwalkId: '2693', description: '', children: [] },
      { id: 'wbs_23A_11_05', code: '23A.11.05', name: 'Variable Frequency Drive (VFD)', xwalkId: '2694', description: '', children: [] }
    ] },
    { id: 'wbs_23A_12', code: '23A.12', name: 'Instrumentation & Control for HVAC', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_12_01', code: '23A.12.01', name: 'Controls for HVAC', xwalkId: '2695', description: '', children: [] }
    ] },
    { id: 'wbs_23A_13', code: '23A.13', name: 'TAB for HVAC', xwalkId: '', description: '', children: [
      { id: 'wbs_23A_13_01', code: '23A.13.01', name: 'Testing, Adjusting, & Balancing for HVAC', xwalkId: '2696', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_25A', code: '25A', name: 'Building Automation System', xwalkId: '', description: '', children: [
    { id: 'wbs_25A_00', code: '25A.00', name: 'Building Automation System (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_00_00', code: '25A.00.00', name: 'Building Automation (Controls)', xwalkId: '2697', description: '', children: [] }
    ] },
    { id: 'wbs_25A_01', code: '25A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_01_01', code: '25A.01.01', name: 'Mobilization', xwalkId: '2698', description: '', children: [] },
      { id: 'wbs_25A_01_02', code: '25A.01.02', name: 'Bond/Permit', xwalkId: '2699', description: '', children: [] },
      { id: 'wbs_25A_01_03', code: '25A.01.03', name: 'Submittals', xwalkId: '2700', description: '', children: [] },
      { id: 'wbs_25A_01_05', code: '25A.01.05', name: 'Supervision', xwalkId: '2701', description: '', children: [] },
      { id: 'wbs_25A_01_06', code: '25A.01.06', name: 'Demobilization', xwalkId: '2702', description: '', children: [] },
      { id: 'wbs_25A_01_07', code: '25A.01.07', name: 'Close-Out', xwalkId: '2703', description: '', children: [] },
      { id: 'wbs_25A_01_09', code: '25A.01.09', name: 'Cleaning', xwalkId: '2704', description: '', children: [] },
      { id: 'wbs_25A_01_12', code: '25A.01.12', name: 'Commissioning', xwalkId: '2705', description: '', children: [] },
      { id: 'wbs_25A_01_13', code: '25A.01.13', name: 'Testing', xwalkId: '2706', description: '', children: [] }
    ] },
    { id: 'wbs_25A_02', code: '25A.02', name: 'HVAC Equipment Controls', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_02_01', code: '25A.02.01', name: 'Controls for Central HVAC Equipment', xwalkId: '2707', description: '', children: [] },
      { id: 'wbs_25A_02_02', code: '25A.02.02', name: 'Controls for Decentralized HVAC Equipment', xwalkId: '2708', description: '', children: [] },
      { id: 'wbs_25A_02_03', code: '25A.02.03', name: 'Controls for Air Distribution Equipment', xwalkId: '2709', description: '', children: [] },
      { id: 'wbs_25A_02_04', code: '25A.02.04', name: 'Controls for Ventilation Equipment', xwalkId: '2710', description: '', children: [] },
      { id: 'wbs_25A_02_05', code: '25A.02.05', name: 'HVAC Override Button', xwalkId: '2711', description: '', children: [] },
      { id: 'wbs_25A_02_06', code: '25A.02.06', name: 'HVAC Emergency Shutdown', xwalkId: '2712', description: '', children: [] }
    ] },
    { id: 'wbs_25A_03', code: '25A.03', name: 'HVAC Monitoring System', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_03_01', code: '25A.03.01', name: 'Refrigerant Monitoring System', xwalkId: '2713', description: '', children: [] },
      { id: 'wbs_25A_03_02', code: '25A.03.02', name: 'CO2 Monitoring System', xwalkId: '2714', description: '', children: [] },
      { id: 'wbs_25A_03_03', code: '25A.03.03', name: 'Temperature/Humidity Monitoring System', xwalkId: '2715', description: '', children: [] }
    ] },
    { id: 'wbs_25A_04', code: '25A.04', name: 'Misc Controls', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_04_01', code: '25A.04.01', name: 'Controls for Electrical Equipment', xwalkId: '2716', description: '', children: [] },
      { id: 'wbs_25A_04_02', code: '25A.04.02', name: 'Controls for Lighting', xwalkId: '2717', description: '', children: [] },
      { id: 'wbs_25A_04_03', code: '25A.04.03', name: 'Controls for Fire Suppression System', xwalkId: '2718', description: '', children: [] },
      { id: 'wbs_25A_04_04', code: '25A.04.04', name: 'Controls for Plumbing Equipment', xwalkId: '2719', description: '', children: [] },
      { id: 'wbs_25A_04_05', code: '25A.04.05', name: 'Controls for Fire Alarm', xwalkId: '2720', description: '', children: [] },
      { id: 'wbs_25A_04_06', code: '25A.04.06', name: 'Controls for Irrigation System', xwalkId: '2721', description: '', children: [] }
    ] },
    { id: 'wbs_25A_05', code: '25A.05', name: 'IT Services/Integration', xwalkId: '', description: '', children: [
      { id: 'wbs_25A_05_01', code: '25A.05.01', name: 'Network Infrastructure - IP', xwalkId: '2722', description: '', children: [] },
      { id: 'wbs_25A_05_02', code: '25A.05.02', name: 'Graphics & Software', xwalkId: '2723', description: '', children: [] },
      { id: 'wbs_25A_05_03', code: '25A.05.03', name: 'Programming', xwalkId: '2724', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_26A', code: '26A', name: 'Electrical', xwalkId: '', description: '', children: [
    { id: 'wbs_26A_00', code: '26A.00', name: 'Electrical (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_00_00', code: '26A.00.00', name: 'Electrical Systems', xwalkId: '2725', description: '', children: [] }
    ] },
    { id: 'wbs_26A_01', code: '26A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_01_01', code: '26A.01.01', name: 'Mobilization', xwalkId: '2726', description: '', children: [] },
      { id: 'wbs_26A_01_02', code: '26A.01.02', name: 'Bond/Permit', xwalkId: '2727', description: '', children: [] },
      { id: 'wbs_26A_01_03', code: '26A.01.03', name: 'Submittals', xwalkId: '2728', description: '', children: [] },
      { id: 'wbs_26A_01_04', code: '26A.01.04', name: 'Equip Rentals', xwalkId: '2729', description: '', children: [] },
      { id: 'wbs_26A_01_05', code: '26A.01.05', name: 'Supervision', xwalkId: '2730', description: '', children: [] },
      { id: 'wbs_26A_01_06', code: '26A.01.06', name: 'Demobilization', xwalkId: '2731', description: '', children: [] },
      { id: 'wbs_26A_01_07', code: '26A.01.07', name: 'Close-Out', xwalkId: '2732', description: '', children: [] },
      { id: 'wbs_26A_01_08', code: '26A.01.08', name: 'Temporary Utilities', xwalkId: '2733', description: '', children: [] }
    ] },
    { id: 'wbs_26A_02', code: '26A.02', name: 'Misc', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_02_01', code: '26A.02.01', name: 'Lightning Protection/Grounding', xwalkId: '2734', description: '', children: [] }
    ] },
    { id: 'wbs_26A_03', code: '26A.03', name: 'Equipment/Gear', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_03_01', code: '26A.03.01', name: 'Generator', xwalkId: '2735', description: '', children: [] },
      { id: 'wbs_26A_03_02', code: '26A.03.02', name: 'Gear Package', xwalkId: '2736', description: '', children: [] },
      { id: 'wbs_26A_03_03', code: '26A.03.03', name: 'Equipment Connections', xwalkId: '2737', description: '', children: [] }
    ] },
    { id: 'wbs_26A_04', code: '26A.04', name: 'Lighting Fixtures', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_04_01', code: '26A.04.01', name: 'Light Fixtures (Building)', xwalkId: '2738', description: '', children: [] },
      { id: 'wbs_26A_04_02', code: '26A.04.02', name: 'Lighting Controls', xwalkId: '2739', description: '', children: [] }
    ] },
    { id: 'wbs_26A_05', code: '26A.05', name: 'Rough In', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_05_01', code: '26A.05.01', name: 'Electrical Underground (Building)', xwalkId: '2740', description: '', children: [] },
      { id: 'wbs_26A_05_02', code: '26A.05.02', name: 'Feeder (OH)', xwalkId: '2741', description: '', children: [] },
      { id: 'wbs_26A_05_03', code: '26A.05.03', name: 'Branch', xwalkId: '2742', description: '', children: [] },
      { id: 'wbs_26A_05_04', code: '26A.05.04', name: 'Electrical Devices/Trim', xwalkId: '2743', description: '', children: [] },
      { id: 'wbs_26A_05_05', code: '26A.05.05', name: 'Technology Conduits, Rough-ins, Sleeves', xwalkId: '2744', description: '', children: [] }
    ] },
    { id: 'wbs_26A_06', code: '26A.06', name: 'Site Electrical', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_06_10', code: '26A.06.10', name: 'Electrical Underground (Site)', xwalkId: '2745', description: '', children: [] },
      { id: 'wbs_26A_06_11', code: '26A.06.11', name: 'Electrical Underground Ductbank', xwalkId: '2746', description: '', children: [] },
      { id: 'wbs_26A_06_20', code: '26A.06.20', name: 'Site Electrical', xwalkId: '2747', description: '', children: [] },
      { id: 'wbs_26A_06_21', code: '26A.06.21', name: 'EV Charging Station', xwalkId: '2748', description: '', children: [] },
      { id: 'wbs_26A_06_30', code: '26A.06.30', name: 'Light Fixtures (Site)', xwalkId: '2749', description: '', children: [] }
    ] },
    { id: 'wbs_26A_07', code: '26A.07', name: 'Sports Lighting', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_07_01', code: '26A.07.01', name: 'Sports Lighting', xwalkId: '2750', description: '', children: [] }
    ] },
    { id: 'wbs_26A_08', code: '26A.08', name: 'Offsite Electrical', xwalkId: '', description: '', children: [
      { id: 'wbs_26A_08_01', code: '26A.08.01', name: 'Offsite Electrical', xwalkId: '2751', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_27A', code: '27A', name: 'Structured Cabling', xwalkId: '', description: '', children: [
    { id: 'wbs_27A_00', code: '27A.00', name: 'Structured Cabling (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_00_00', code: '27A.00.00', name: 'Structured Cabling Systems', xwalkId: '2752', description: '', children: [] }
    ] },
    { id: 'wbs_27A_01', code: '27A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_01_01', code: '27A.01.01', name: 'Mobilization', xwalkId: '2753', description: '', children: [] },
      { id: 'wbs_27A_01_02', code: '27A.01.02', name: 'Bond/Permit', xwalkId: '2754', description: '', children: [] },
      { id: 'wbs_27A_01_03', code: '27A.01.03', name: 'Submittals', xwalkId: '2755', description: '', children: [] },
      { id: 'wbs_27A_01_04', code: '27A.01.04', name: 'Equip Rentals', xwalkId: '2756', description: '', children: [] },
      { id: 'wbs_27A_01_05', code: '27A.01.05', name: 'Supervision', xwalkId: '2757', description: '', children: [] },
      { id: 'wbs_27A_01_06', code: '27A.01.06', name: 'Demobilization', xwalkId: '2758', description: '', children: [] },
      { id: 'wbs_27A_01_07', code: '27A.01.07', name: 'Close-Out', xwalkId: '2759', description: '', children: [] },
      { id: 'wbs_27A_01_08', code: '27A.01.08', name: 'Temporary Utilities', xwalkId: '2760', description: '', children: [] },
      { id: 'wbs_27A_01_12', code: '27A.01.12', name: 'Commissioning', xwalkId: '2761', description: '', children: [] },
      { id: 'wbs_27A_01_13', code: '27A.01.13', name: 'Testing', xwalkId: '2762', description: '', children: [] }
    ] },
    { id: 'wbs_27A_02', code: '27A.02', name: 'Demarcation', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_02_01', code: '27A.02.01', name: 'Incoming Telecommunications Circuits', xwalkId: '2763', description: '', children: [] }
    ] },
    { id: 'wbs_27A_03', code: '27A.03', name: 'Backbone Cabling', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_03_01', code: '27A.03.01', name: 'Backbone Cabling - Underground', xwalkId: '2764', description: '', children: [] },
      { id: 'wbs_27A_03_02', code: '27A.03.02', name: 'Backbone Cabling - Overhead', xwalkId: '2765', description: '', children: [] }
    ] },
    { id: 'wbs_27A_04', code: '27A.04', name: 'Horizontal Cabling', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_04_01', code: '27A.04.01', name: 'Horizontal Cabling - Overhead', xwalkId: '2766', description: '', children: [] }
    ] },
    { id: 'wbs_27A_05', code: '27A.05', name: 'Equipment Room Fittings', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_05_00', code: '27A.05.00', name: 'Communication Equipment Rooms', xwalkId: '2767', description: '', children: [] },
      { id: 'wbs_27A_05_01', code: '27A.05.01', name: 'MDF Buildout', xwalkId: '2768', description: '', children: [] },
      { id: 'wbs_27A_05_02', code: '27A.05.02', name: 'IDF Buildout', xwalkId: '2769', description: '', children: [] }
    ] },
    { id: 'wbs_27A_06', code: '27A.06', name: 'Structured Cabling Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_27A_06_01', code: '27A.06.01', name: 'Network Outlets & Data Drops', xwalkId: '2770', description: '', children: [] },
      { id: 'wbs_27A_06_02', code: '27A.06.02', name: 'Underground Ducts & Raceways', xwalkId: '2771', description: '', children: [] },
      { id: 'wbs_27A_06_03', code: '27A.06.03', name: 'Pathway & Pathway Supports', xwalkId: '2772', description: '', children: [] },
      { id: 'wbs_27A_06_04', code: '27A.06.04', name: 'Racks & Cabinets', xwalkId: '2773', description: '', children: [] },
      { id: 'wbs_27A_06_05', code: '27A.06.05', name: 'Termination Blocks & Patch Panels', xwalkId: '2774', description: '', children: [] },
      { id: 'wbs_27A_06_06', code: '27A.06.06', name: 'Patch Cords', xwalkId: '2775', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_27B', code: '27B', name: 'Intercom & P/A', xwalkId: '', description: '', children: [
    { id: 'wbs_27B_00', code: '27B.00', name: 'Intercom & P/A (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_27B_00_00', code: '27B.00.00', name: 'Intercom & P/A Systems', xwalkId: '2776', description: '', children: [] }
    ] },
    { id: 'wbs_27B_01', code: '27B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_27B_01_01', code: '27B.01.01', name: 'Mobilization', xwalkId: '2777', description: '', children: [] },
      { id: 'wbs_27B_01_02', code: '27B.01.02', name: 'Bond/Permit', xwalkId: '2778', description: '', children: [] },
      { id: 'wbs_27B_01_03', code: '27B.01.03', name: 'Submittals', xwalkId: '2779', description: '', children: [] },
      { id: 'wbs_27B_01_04', code: '27B.01.04', name: 'Equip Rentals', xwalkId: '2780', description: '', children: [] },
      { id: 'wbs_27B_01_05', code: '27B.01.05', name: 'Supervision', xwalkId: '2781', description: '', children: [] },
      { id: 'wbs_27B_01_07', code: '27B.01.07', name: 'Close-Out', xwalkId: '2782', description: '', children: [] },
      { id: 'wbs_27B_01_12', code: '27B.01.12', name: 'Commissioning', xwalkId: '2783', description: '', children: [] },
      { id: 'wbs_27B_01_13', code: '27B.01.13', name: 'Testing', xwalkId: '2784', description: '', children: [] }
    ] },
    { id: 'wbs_27B_02', code: '27B.02', name: 'Intercom System Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_27B_02_01', code: '27B.02.01', name: 'IP Phone/Telephone', xwalkId: '2785', description: '', children: [] }
    ] },
    { id: 'wbs_27B_03', code: '27B.03', name: 'Public Address & Clock System Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_27B_03_01', code: '27B.03.01', name: 'Microphones', xwalkId: '2786', description: '', children: [] },
      { id: 'wbs_27B_03_02', code: '27B.03.02', name: 'Loudspeakers', xwalkId: '2787', description: '', children: [] },
      { id: 'wbs_27B_03_03', code: '27B.03.03', name: 'PA & Clock System - Amplifiers', xwalkId: '2788', description: '', children: [] },
      { id: 'wbs_27B_03_04', code: '27B.03.04', name: 'Volume Control', xwalkId: '2789', description: '', children: [] },
      { id: 'wbs_27B_03_05', code: '27B.03.05', name: 'Local Sound Reinforcement', xwalkId: '2790', description: '', children: [] },
      { id: 'wbs_27B_03_06', code: '27B.03.06', name: 'Master Clock', xwalkId: '2791', description: '', children: [] }
    ] },
    { id: 'wbs_27B_04', code: '27B.04', name: 'Intercom & P/A Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_27B_04_01', code: '27B.04.01', name: 'Intercom & P/A (Software, Programming & Licensing)', xwalkId: '2792', description: '', children: [] },
      { id: 'wbs_27B_04_02', code: '27B.04.02', name: 'Intercom & P/A Control Panel', xwalkId: '2793', description: '', children: [] },
      { id: 'wbs_27B_04_03', code: '27B.04.03', name: 'Intercom & P/A Cabling', xwalkId: '2794', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_27C', code: '27C', name: 'AV Systems', xwalkId: '', description: '', children: [
    { id: 'wbs_27C_00', code: '27C.00', name: 'AV Systems (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_00_00', code: '27C.00.00', name: 'Audio-Video Systems', xwalkId: '2795', description: '', children: [] },
      { id: 'wbs_27C_00_01', code: '27C.00.01', name: 'Technology - Allowance', xwalkId: '2796', description: '', children: [] }
    ] },
    { id: 'wbs_27C_01', code: '27C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_01_01', code: '27C.01.01', name: 'Mobilization', xwalkId: '2797', description: '', children: [] },
      { id: 'wbs_27C_01_02', code: '27C.01.02', name: 'Bond/Permit', xwalkId: '2798', description: '', children: [] },
      { id: 'wbs_27C_01_03', code: '27C.01.03', name: 'Submittals', xwalkId: '2799', description: '', children: [] },
      { id: 'wbs_27C_01_04', code: '27C.01.04', name: 'Equip Rentals', xwalkId: '2800', description: '', children: [] },
      { id: 'wbs_27C_01_05', code: '27C.01.05', name: 'Supervision', xwalkId: '2801', description: '', children: [] },
      { id: 'wbs_27C_01_07', code: '27C.01.07', name: 'Close-Out', xwalkId: '2802', description: '', children: [] },
      { id: 'wbs_27C_01_12', code: '27C.01.12', name: 'Commissioning', xwalkId: '2803', description: '', children: [] },
      { id: 'wbs_27C_01_13', code: '27C.01.13', name: 'Testing', xwalkId: '2804', description: '', children: [] }
    ] },
    { id: 'wbs_27C_02', code: '27C.02', name: 'Video Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_02_01', code: '27C.02.01', name: 'Projectors', xwalkId: '2805', description: '', children: [] },
      { id: 'wbs_27C_02_02', code: '27C.02.02', name: 'Projection Screens', xwalkId: '2806', description: '', children: [] },
      { id: 'wbs_27C_02_03', code: '27C.02.03', name: 'Flat Panel Displays', xwalkId: '2807', description: '', children: [] },
      { id: 'wbs_27C_02_04', code: '27C.02.04', name: 'Interactive Displays', xwalkId: '2808', description: '', children: [] },
      { id: 'wbs_27C_02_05', code: '27C.02.05', name: 'Digital Signage', xwalkId: '2809', description: '', children: [] },
      { id: 'wbs_27C_02_06', code: '27C.02.06', name: 'Video wall', xwalkId: '2810', description: '', children: [] },
      { id: 'wbs_27C_02_07', code: '27C.02.07', name: 'AV Cameras', xwalkId: '2811', description: '', children: [] }
    ] },
    { id: 'wbs_27C_03', code: '27C.03', name: 'Audio Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_03_01', code: '27C.03.01', name: 'Speakers', xwalkId: '2812', description: '', children: [] },
      { id: 'wbs_27C_03_02', code: '27C.03.02', name: 'Wireless Microphone System', xwalkId: '2813', description: '', children: [] },
      { id: 'wbs_27C_03_03', code: '27C.03.03', name: 'AV System - Amplifiers', xwalkId: '2814', description: '', children: [] },
      { id: 'wbs_27C_03_04', code: '27C.03.04', name: 'Audio Mixers', xwalkId: '2815', description: '', children: [] }
    ] },
    { id: 'wbs_27C_04', code: '27C.04', name: 'AV Racks & Mounts', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_04_01', code: '27C.04.01', name: 'AV Equipment Rack', xwalkId: '2816', description: '', children: [] },
      { id: 'wbs_27C_04_02', code: '27C.04.02', name: 'AV Wall Mounts', xwalkId: '2817', description: '', children: [] }
    ] },
    { id: 'wbs_27C_05', code: '27C.05', name: 'AV System Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_05_01', code: '27C.05.01', name: 'AV System (Software, Programming & Licensing)', xwalkId: '2818', description: '', children: [] },
      { id: 'wbs_27C_05_02', code: '27C.05.02', name: 'Network Controllers', xwalkId: '2819', description: '', children: [] },
      { id: 'wbs_27C_05_03', code: '27C.05.03', name: 'AV Transmitter', xwalkId: '2820', description: '', children: [] },
      { id: 'wbs_27C_05_04', code: '27C.05.04', name: 'AV Receiver & Processor', xwalkId: '2821', description: '', children: [] },
      { id: 'wbs_27C_05_05', code: '27C.05.05', name: 'AV Relay Module', xwalkId: '2822', description: '', children: [] },
      { id: 'wbs_27C_05_06', code: '27C.05.06', name: 'AV Conduit & Cabling', xwalkId: '2823', description: '', children: [] }
    ] },
    { id: 'wbs_27C_06', code: '27C.06', name: 'Special Distributed Communication System', xwalkId: '', description: '', children: [
      { id: 'wbs_27C_06_01', code: '27C.06.01', name: 'Assistive Listening systems (ALS)', xwalkId: '2824', description: '', children: [] },
      { id: 'wbs_27C_06_02', code: '27C.06.02', name: 'Healthcare Communications & Monitoring Systems', xwalkId: '2825', description: '', children: [] },
      { id: 'wbs_27C_06_03', code: '27C.06.03', name: 'AV Broadcast Studio System', xwalkId: '2826', description: '', children: [] },
      { id: 'wbs_27C_06_04', code: '27C.06.04', name: 'AV System in Outdoor Athletic Fields', xwalkId: '2827', description: '', children: [] },
      { id: 'wbs_27C_06_05', code: '27C.06.05', name: 'Smart Restroom System', xwalkId: '2828', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_27D', code: '27D', name: 'Voice Communications', xwalkId: '', description: '', children: [
    { id: 'wbs_27D_01', code: '27D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_27D_01_01', code: '27D.01.01', name: 'Mobilization', xwalkId: '2829', description: '', children: [] },
      { id: 'wbs_27D_01_02', code: '27D.01.02', name: 'Bond/Permit', xwalkId: '2830', description: '', children: [] },
      { id: 'wbs_27D_01_03', code: '27D.01.03', name: 'Submittals', xwalkId: '2831', description: '', children: [] },
      { id: 'wbs_27D_01_04', code: '27D.01.04', name: 'Equip Rentals', xwalkId: '2832', description: '', children: [] },
      { id: 'wbs_27D_01_07', code: '27D.01.07', name: 'Close-Out', xwalkId: '2833', description: '', children: [] },
      { id: 'wbs_27D_01_09', code: '27D.01.09', name: 'Cleaning', xwalkId: '2834', description: '', children: [] },
      { id: 'wbs_27D_01_13', code: '27D.01.13', name: 'Testing', xwalkId: '2835', description: '', children: [] }
    ] },
    { id: 'wbs_27D_02', code: '27D.02', name: 'Terminal Equipment System', xwalkId: '', description: '', children: [
      { id: 'wbs_27D_02_10', code: '27D.02.10', name: 'Telephone System (VOIP)', xwalkId: '2836', description: '', children: [] },
      { id: 'wbs_27D_02_20', code: '27D.02.20', name: 'Blue Emergency Telephones', xwalkId: '2837', description: '', children: [] },
      { id: 'wbs_27D_02_30', code: '27D.02.30', name: 'Radio Communications Equipment', xwalkId: '2838', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_27E', code: '27E', name: 'Special Communication Systems', xwalkId: '', description: '', children: [
    { id: 'wbs_27E_01', code: '27E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_27E_01_01', code: '27E.01.01', name: 'Mobilization', xwalkId: '2839', description: '', children: [] },
      { id: 'wbs_27E_01_02', code: '27E.01.02', name: 'Bond/Permit', xwalkId: '2840', description: '', children: [] },
      { id: 'wbs_27E_01_03', code: '27E.01.03', name: 'Submittals', xwalkId: '2841', description: '', children: [] },
      { id: 'wbs_27E_01_04', code: '27E.01.04', name: 'Equip Rentals', xwalkId: '2842', description: '', children: [] },
      { id: 'wbs_27E_01_07', code: '27E.01.07', name: 'Close-Out', xwalkId: '2843', description: '', children: [] },
      { id: 'wbs_27E_01_09', code: '27E.01.09', name: 'Cleaning', xwalkId: '2844', description: '', children: [] },
      { id: 'wbs_27E_01_13', code: '27E.01.13', name: 'Testing', xwalkId: '2845', description: '', children: [] }
    ] },
    { id: 'wbs_27E_02', code: '27E.02', name: 'Special Distributed Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_27E_02_10', code: '27E.02.10', name: 'Paging Systems', xwalkId: '2846', description: '', children: [] },
      { id: 'wbs_27E_02_20', code: '27E.02.20', name: 'Sound Masking Systems', xwalkId: '2847', description: '', children: [] },
      { id: 'wbs_27E_02_30', code: '27E.02.30', name: 'Internal Cellular, Paging, & Antenna Systems', xwalkId: '2848', description: '', children: [] }
    ] },
    { id: 'wbs_27E_03', code: '27E.03', name: 'Assistive Learning Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_27E_03_10', code: '27E.03.10', name: 'Assistive Listening Systems', xwalkId: '2849', description: '', children: [] }
    ] },
    { id: 'wbs_27E_04', code: '27E.04', name: 'Healthcare Communications Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_27E_04_10', code: '27E.04.10', name: 'Nurse Call/Code Blue Systems', xwalkId: '2850', description: '', children: [] }
    ] },
    { id: 'wbs_27E_05', code: '27E.05', name: 'Emergency Communications Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_27E_05_10', code: '27E.05.10', name: 'Rescue Assistance Signal Systems', xwalkId: '2851', description: '', children: [] },
      { id: 'wbs_27E_05_20', code: '27E.05.20', name: 'AOR Two-Way Communication System', xwalkId: '2852', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_28A', code: '28A', name: 'Access Control', xwalkId: '', description: '', children: [
    { id: 'wbs_28A_00', code: '28A.00', name: 'Access Control (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_00_00', code: '28A.00.00', name: 'Access Control Systems', xwalkId: '2853', description: '', children: [] }
    ] },
    { id: 'wbs_28A_01', code: '28A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_01_01', code: '28A.01.01', name: 'Mobilization', xwalkId: '2854', description: '', children: [] },
      { id: 'wbs_28A_01_02', code: '28A.01.02', name: 'Bond/Permit', xwalkId: '2855', description: '', children: [] },
      { id: 'wbs_28A_01_03', code: '28A.01.03', name: 'Submittals', xwalkId: '2856', description: '', children: [] },
      { id: 'wbs_28A_01_04', code: '28A.01.04', name: 'Equip Rentals', xwalkId: '2857', description: '', children: [] },
      { id: 'wbs_28A_01_05', code: '28A.01.05', name: 'Supervision', xwalkId: '2858', description: '', children: [] },
      { id: 'wbs_28A_01_06', code: '28A.01.06', name: 'Demobilization', xwalkId: '2859', description: '', children: [] },
      { id: 'wbs_28A_01_07', code: '28A.01.07', name: 'Close-Out', xwalkId: '2860', description: '', children: [] },
      { id: 'wbs_28A_01_12', code: '28A.01.12', name: 'Commissioning', xwalkId: '2861', description: '', children: [] },
      { id: 'wbs_28A_01_13', code: '28A.01.13', name: 'Testing', xwalkId: '2862', description: '', children: [] }
    ] },
    { id: 'wbs_28A_02', code: '28A.02', name: 'Access Control Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_02_01', code: '28A.02.01', name: 'Card Readers', xwalkId: '2863', description: '', children: [] },
      { id: 'wbs_28A_02_02', code: '28A.02.02', name: 'Biometric Readers', xwalkId: '2864', description: '', children: [] },
      { id: 'wbs_28A_02_03', code: '28A.02.03', name: 'Video/Audio Intercom', xwalkId: '2865', description: '', children: [] },
      { id: 'wbs_28A_02_04', code: '28A.02.04', name: 'Access Control System Credentials', xwalkId: '2866', description: '', children: [] },
      { id: 'wbs_28A_02_05', code: '28A.02.05', name: 'Door Contacts', xwalkId: '2867', description: '', children: [] },
      { id: 'wbs_28A_02_06', code: '28A.02.06', name: 'Access Control Sensors', xwalkId: '2868', description: '', children: [] },
      { id: 'wbs_28A_02_07', code: '28A.02.07', name: 'Door Release, Duress, Panic & Lockdown Buttons', xwalkId: '2869', description: '', children: [] },
      { id: 'wbs_28A_02_08', code: '28A.02.08', name: 'Electrified Door Hardware', xwalkId: '2870', description: '', children: [] }
    ] },
    { id: 'wbs_28A_03', code: '28A.03', name: 'Site Access Control', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_03_01', code: '28A.03.01', name: 'Site - Card Readers', xwalkId: '2871', description: '', children: [] },
      { id: 'wbs_28A_03_02', code: '28A.03.02', name: 'Site - Door Contacts', xwalkId: '2872', description: '', children: [] }
    ] },
    { id: 'wbs_28A_04', code: '28A.04', name: 'Access Control Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_04_01', code: '28A.04.01', name: 'Access Control Software, Programming & Licensing', xwalkId: '2873', description: '', children: [] },
      { id: 'wbs_28A_04_02', code: '28A.04.02', name: 'Access Control Panels', xwalkId: '2874', description: '', children: [] },
      { id: 'wbs_28A_04_03', code: '28A.04.03', name: 'Access Control System Cabling', xwalkId: '2875', description: '', children: [] }
    ] },
    { id: 'wbs_28A_05', code: '28A.05', name: 'Special Access Control Systems', xwalkId: '', description: '', children: [
      { id: 'wbs_28A_05_01', code: '28A.05.01', name: 'Security Access Detection Equipment', xwalkId: '2876', description: '', children: [] },
      { id: 'wbs_28A_05_02', code: '28A.05.02', name: 'Vehicle Identification Systems', xwalkId: '2877', description: '', children: [] },
      { id: 'wbs_28A_05_03', code: '28A.05.03', name: 'Electronic Turnstiles', xwalkId: '2878', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_28B', code: '28B', name: 'Intrusion Detection', xwalkId: '', description: '', children: [
    { id: 'wbs_28B_00', code: '28B.00', name: 'Intrusion Detection (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_28B_00_00', code: '28B.00.00', name: 'Intrusion Detection Systems', xwalkId: '2879', description: '', children: [] }
    ] },
    { id: 'wbs_28B_01', code: '28B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_28B_01_01', code: '28B.01.01', name: 'Mobilization', xwalkId: '2880', description: '', children: [] },
      { id: 'wbs_28B_01_02', code: '28B.01.02', name: 'Bond/Permit', xwalkId: '2881', description: '', children: [] },
      { id: 'wbs_28B_01_03', code: '28B.01.03', name: 'Submittals', xwalkId: '2882', description: '', children: [] },
      { id: 'wbs_28B_01_04', code: '28B.01.04', name: 'Equip Rentals', xwalkId: '2883', description: '', children: [] },
      { id: 'wbs_28B_01_05', code: '28B.01.05', name: 'Supervision', xwalkId: '2884', description: '', children: [] },
      { id: 'wbs_28B_01_06', code: '28B.01.06', name: 'Demobilization', xwalkId: '2885', description: '', children: [] },
      { id: 'wbs_28B_01_07', code: '28B.01.07', name: 'Close-Out', xwalkId: '2886', description: '', children: [] },
      { id: 'wbs_28B_01_08', code: '28B.01.08', name: 'Commissioning', xwalkId: '2887', description: '', children: [] },
      { id: 'wbs_28B_01_13', code: '28B.01.13', name: 'Testing', xwalkId: '2888', description: '', children: [] }
    ] },
    { id: 'wbs_28B_02', code: '28B.02', name: 'Intrusion Detection Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_28B_02_01', code: '28B.02.01', name: 'Intrusion Detection - Keypads', xwalkId: '2889', description: '', children: [] },
      { id: 'wbs_28B_02_02', code: '28B.02.02', name: 'Motion Detectors', xwalkId: '2890', description: '', children: [] },
      { id: 'wbs_28B_02_03', code: '28B.02.03', name: 'Glass Break Detector', xwalkId: '2891', description: '', children: [] },
      { id: 'wbs_28B_02_04', code: '28B.02.04', name: 'Intrusion Detection - Sirens/Horn', xwalkId: '2892', description: '', children: [] },
      { id: 'wbs_28B_02_05', code: '28B.02.05', name: 'Intrusion Detection - Door Contacts', xwalkId: '2893', description: '', children: [] }
    ] },
    { id: 'wbs_28B_03', code: '28B.03', name: 'Intrusion Detection Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_28B_03_01', code: '28B.03.01', name: 'Intrusion Detection - Software, Programming & Licensing', xwalkId: '2894', description: '', children: [] },
      { id: 'wbs_28B_03_02', code: '28B.03.02', name: 'Intrusion Detection - Control Panels', xwalkId: '2895', description: '', children: [] },
      { id: 'wbs_28B_03_03', code: '28B.03.03', name: 'Intrusion Detection - Cabling', xwalkId: '2896', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_28C', code: '28C', name: 'CCTV', xwalkId: '', description: '', children: [
    { id: 'wbs_28C_00', code: '28C.00', name: 'CCTV (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_28C_00_00', code: '28C.00.00', name: 'Video Surveillance (CCTV)', xwalkId: '2897', description: '', children: [] }
    ] },
    { id: 'wbs_28C_01', code: '28C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_28C_01_01', code: '28C.01.01', name: 'Mobilization', xwalkId: '2898', description: '', children: [] },
      { id: 'wbs_28C_01_02', code: '28C.01.02', name: 'Bond/Permit', xwalkId: '2899', description: '', children: [] },
      { id: 'wbs_28C_01_03', code: '28C.01.03', name: 'Submittals', xwalkId: '2900', description: '', children: [] },
      { id: 'wbs_28C_01_04', code: '28C.01.04', name: 'Equip Rentals', xwalkId: '2901', description: '', children: [] },
      { id: 'wbs_28C_01_05', code: '28C.01.05', name: 'Supervision', xwalkId: '2902', description: '', children: [] },
      { id: 'wbs_28C_01_07', code: '28C.01.07', name: 'Close-Out', xwalkId: '2903', description: '', children: [] },
      { id: 'wbs_28C_01_08', code: '28C.01.08', name: 'Commissioning', xwalkId: '2904', description: '', children: [] },
      { id: 'wbs_28C_01_13', code: '28C.01.13', name: 'Testing', xwalkId: '2905', description: '', children: [] }
    ] },
    { id: 'wbs_28C_02', code: '28C.02', name: 'CCTV Cameras', xwalkId: '', description: '', children: [
      { id: 'wbs_28C_02_01', code: '28C.02.01', name: 'Exterior Cameras - Wall or Ceiling Mounted', xwalkId: '2906', description: '', children: [] },
      { id: 'wbs_28C_02_02', code: '28C.02.02', name: 'Exterior Cameras - Pole Mounted', xwalkId: '2907', description: '', children: [] },
      { id: 'wbs_28C_02_03', code: '28C.02.03', name: 'Interior Cameras', xwalkId: '2908', description: '', children: [] }
    ] },
    { id: 'wbs_28C_03', code: '28C.03', name: 'CCTV Monitoring Station', xwalkId: '', description: '', children: [
      { id: 'wbs_28C_03_01', code: '28C.03.01', name: 'Displays & Control Consoles', xwalkId: '2909', description: '', children: [] },
      { id: 'wbs_28C_03_02', code: '28C.03.02', name: 'Recording & Storage Devices', xwalkId: '2910', description: '', children: [] },
      { id: 'wbs_28C_03_03', code: '28C.03.03', name: 'Switches & Routers', xwalkId: '2911', description: '', children: [] }
    ] },
    { id: 'wbs_28C_04', code: '28C.04', name: 'CCTV Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_28C_04_01', code: '28C.04.01', name: 'Video Management Software (VMS), Licensing', xwalkId: '2912', description: '', children: [] },
      { id: 'wbs_28C_04_02', code: '28C.04.02', name: 'Video Surveillance Cabling', xwalkId: '2913', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_28D', code: '28D', name: 'Fire Alarm', xwalkId: '', description: '', children: [
    { id: 'wbs_28D_00', code: '28D.00', name: 'Fire Alarm (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_00_00', code: '28D.00.00', name: 'Fire Detection & Alarm', xwalkId: '2914', description: '', children: [] }
    ] },
    { id: 'wbs_28D_01', code: '28D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_01_01', code: '28D.01.01', name: 'Mobilization', xwalkId: '2915', description: '', children: [] },
      { id: 'wbs_28D_01_02', code: '28D.01.02', name: 'Bond/Permit', xwalkId: '2916', description: '', children: [] },
      { id: 'wbs_28D_01_03', code: '28D.01.03', name: 'Submittals', xwalkId: '2917', description: '', children: [] },
      { id: 'wbs_28D_01_04', code: '28D.01.04', name: 'Equip Rentals', xwalkId: '2918', description: '', children: [] },
      { id: 'wbs_28D_01_05', code: '28D.01.05', name: 'Supervision', xwalkId: '2919', description: '', children: [] },
      { id: 'wbs_28D_01_06', code: '28D.01.06', name: 'Demobilization', xwalkId: '2920', description: '', children: [] },
      { id: 'wbs_28D_01_07', code: '28D.01.07', name: 'Close-Out', xwalkId: '2921', description: '', children: [] },
      { id: 'wbs_28D_01_08', code: '28D.01.08', name: 'Commissioning', xwalkId: '2922', description: '', children: [] },
      { id: 'wbs_28D_01_13', code: '28D.01.13', name: 'Testing', xwalkId: '2923', description: '', children: [] }
    ] },
    { id: 'wbs_28D_02', code: '28D.02', name: 'Initiating Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_02_01', code: '28D.02.01', name: 'Smoke Detectors', xwalkId: '2924', description: '', children: [] },
      { id: 'wbs_28D_02_02', code: '28D.02.02', name: 'Heat Detectors', xwalkId: '2925', description: '', children: [] },
      { id: 'wbs_28D_02_03', code: '28D.02.03', name: 'Carbon Monoxide Detectors', xwalkId: '2926', description: '', children: [] },
      { id: 'wbs_28D_02_04', code: '28D.02.04', name: 'Pull Station', xwalkId: '2927', description: '', children: [] },
      { id: 'wbs_28D_02_05', code: '28D.02.05', name: 'Fire Alarm - Door Holder', xwalkId: '2928', description: '', children: [] }
    ] },
    { id: 'wbs_28D_03', code: '28D.03', name: 'Notification Devices', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_03_01', code: '28D.03.01', name: 'Voice Evacuation', xwalkId: '2929', description: '', children: [] },
      { id: 'wbs_28D_03_02', code: '28D.03.02', name: 'Horns', xwalkId: '2930', description: '', children: [] },
      { id: 'wbs_28D_03_03', code: '28D.03.03', name: 'Strobes', xwalkId: '2931', description: '', children: [] },
      { id: 'wbs_28D_03_04', code: '28D.03.04', name: 'Combination Devices', xwalkId: '2932', description: '', children: [] },
      { id: 'wbs_28D_03_05', code: '28D.03.05', name: 'Vibrating Pads', xwalkId: '2933', description: '', children: [] },
      { id: 'wbs_28D_03_06', code: '28D.03.06', name: 'Dialers or Communicators', xwalkId: '2934', description: '', children: [] }
    ] },
    { id: 'wbs_28D_04', code: '28D.04', name: 'Fire Alarm Control & Relay Module', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_04_01', code: '28D.04.01', name: 'Fire Alarm Control Panels', xwalkId: '2935', description: '', children: [] },
      { id: 'wbs_28D_04_02', code: '28D.04.02', name: 'Fire Alarm Remote Annunciator', xwalkId: '2936', description: '', children: [] },
      { id: 'wbs_28D_04_03', code: '28D.04.03', name: 'Fire Alarm Transmitter', xwalkId: '2937', description: '', children: [] },
      { id: 'wbs_28D_04_04', code: '28D.04.04', name: 'Relay Modules & Interface Devices', xwalkId: '2938', description: '', children: [] }
    ] },
    { id: 'wbs_28D_05', code: '28D.05', name: 'Fire Alarm Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_28D_05_01', code: '28D.05.01', name: 'Fire Alarm Software & Programming', xwalkId: '2939', description: '', children: [] },
      { id: 'wbs_28D_05_02', code: '28D.05.02', name: 'Fire Alarm Cabling', xwalkId: '2940', description: '', children: [] },
      { id: 'wbs_28D_05_03', code: '28D.05.03', name: 'Fire Alarm Battery Backup', xwalkId: '2941', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_28E', code: '28E', name: 'ERRS', xwalkId: '', description: '', children: [
    { id: 'wbs_28E_00', code: '28E.00', name: 'ERRS (Turnkey)', xwalkId: '', description: '', children: [
      { id: 'wbs_28E_00_00', code: '28E.00.00', name: 'Emergency Response Systems', xwalkId: '2942', description: '', children: [] }
    ] },
    { id: 'wbs_28E_01', code: '28E.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_28E_01_01', code: '28E.01.01', name: 'Mobilization', xwalkId: '2943', description: '', children: [] },
      { id: 'wbs_28E_01_02', code: '28E.01.02', name: 'Bond/Permit', xwalkId: '2944', description: '', children: [] },
      { id: 'wbs_28E_01_03', code: '28E.01.03', name: 'Submittals', xwalkId: '2945', description: '', children: [] },
      { id: 'wbs_28E_01_07', code: '28E.01.07', name: 'Close-Out', xwalkId: '2946', description: '', children: [] },
      { id: 'wbs_28E_01_13', code: '28E.01.13', name: 'Testing', xwalkId: '2947', description: '', children: [] }
    ] },
    { id: 'wbs_28E_02', code: '28E.02', name: 'ERRS Infrastructure', xwalkId: '', description: '', children: [
      { id: 'wbs_28E_02_01', code: '28E.02.01', name: 'ERRS Antenna System', xwalkId: '2948', description: '', children: [] },
      { id: 'wbs_28E_02_02', code: '28E.02.02', name: 'ERRS Bidirectional Amplifier', xwalkId: '2949', description: '', children: [] },
      { id: 'wbs_28E_02_03', code: '28E.02.03', name: 'ERRS Repeaters/Amplifiers', xwalkId: '2950', description: '', children: [] },
      { id: 'wbs_28E_02_04', code: '28E.02.04', name: 'ERRS Control & Monitoring Panel', xwalkId: '2951', description: '', children: [] },
      { id: 'wbs_28E_02_05', code: '28E.02.05', name: 'ERRS Cabling', xwalkId: '2952', description: '', children: [] },
      { id: 'wbs_28E_02_06', code: '28E.02.06', name: 'ERRS Power Supplies', xwalkId: '2953', description: '', children: [] }
    ] },
    { id: 'wbs_28E_03', code: '28E.03', name: 'Radio Frequency Survey/Testing', xwalkId: '', description: '', children: [
      { id: 'wbs_28E_03_01', code: '28E.03.01', name: 'Preliminary RF Survey/Testing', xwalkId: '2954', description: '', children: [] }
    ] },
    { id: 'wbs_28E_04', code: '28E.04', name: 'Cellular Signal Booster', xwalkId: '', description: '', children: [
      { id: 'wbs_28E_04_01', code: '28E.04.01', name: 'Cellular Antenna System', xwalkId: '2955', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_31A', code: '31A', name: 'Earthwork', xwalkId: '', description: '', children: [
    { id: 'wbs_31A_00', code: '31A.00', name: 'Sitework', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_00_00', code: '31A.00.00', name: 'Earthworks (Turnkey)', xwalkId: '2956', description: '', children: [] },
      { id: 'wbs_31A_00_01', code: '31A.00.01', name: 'Unforeseen Infrastructure Allowance', xwalkId: '2957', description: '', children: [] }
    ] },
    { id: 'wbs_31A_01', code: '31A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_01_01', code: '31A.01.01', name: 'Mobilization', xwalkId: '2958', description: '', children: [] },
      { id: 'wbs_31A_01_02', code: '31A.01.02', name: 'Bond/Permit', xwalkId: '2959', description: '', children: [] },
      { id: 'wbs_31A_01_03', code: '31A.01.03', name: 'Submittals', xwalkId: '2960', description: '', children: [] },
      { id: 'wbs_31A_01_04', code: '31A.01.04', name: 'Equip Rentals', xwalkId: '2961', description: '', children: [] },
      { id: 'wbs_31A_01_05', code: '31A.01.05', name: 'Supervision', xwalkId: '2962', description: '', children: [] },
      { id: 'wbs_31A_01_06', code: '31A.01.06', name: 'Demobilization', xwalkId: '2963', description: '', children: [] },
      { id: 'wbs_31A_01_07', code: '31A.01.07', name: 'Close-Out', xwalkId: '2964', description: '', children: [] },
      { id: 'wbs_31A_01_13', code: '31A.01.13', name: 'Testing', xwalkId: '2965', description: '', children: [] },
      { id: 'wbs_31A_01_14', code: '31A.01.14', name: 'Survey & Layout', xwalkId: '2966', description: '', children: [] },
      { id: 'wbs_31A_01_15', code: '31A.01.15', name: 'Dewatering', xwalkId: '2967', description: '', children: [] },
      { id: 'wbs_31A_01_16', code: '31A.01.16', name: 'Access Road/Temporary Road', xwalkId: '2968', description: '', children: [] },
      { id: 'wbs_31A_01_17', code: '31A.01.17', name: 'Temporary Laydown Area', xwalkId: '2969', description: '', children: [] }
    ] },
    { id: 'wbs_31A_02', code: '31A.02', name: 'Site Demolition & Waste Disposal', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_02_00', code: '31A.02.00', name: 'Selective Site Demolition', xwalkId: '2970', description: '', children: [] },
      { id: 'wbs_31A_02_01', code: '31A.02.01', name: 'Demolition - Trees/Shrubs/Plants', xwalkId: '2971', description: '', children: [] },
      { id: 'wbs_31A_02_02', code: '31A.02.02', name: 'Demolition - Site Paving (Asphalt/Concrete)', xwalkId: '2972', description: '', children: [] },
      { id: 'wbs_31A_02_03', code: '31A.02.03', name: 'Demolition - Sidewalks/Flatwork/Gravel Road', xwalkId: '2973', description: '', children: [] },
      { id: 'wbs_31A_02_04', code: '31A.02.04', name: 'Demolition - Site Structures', xwalkId: '2974', description: '', children: [] },
      { id: 'wbs_31A_02_05', code: '31A.02.05', name: 'Demolition - Fence & Gates', xwalkId: '2975', description: '', children: [] },
      { id: 'wbs_31A_02_06', code: '31A.02.06', name: 'Saw-Cut - Pavement, Sidewalk/Flatwork, Curbs', xwalkId: '2976', description: '', children: [] },
      { id: 'wbs_31A_02_07', code: '31A.02.07', name: 'Demolition - Dry Utilities - Power Line', xwalkId: '2977', description: '', children: [] },
      { id: 'wbs_31A_02_08', code: '31A.02.08', name: 'Demolition - Dry Utilities - Power Pole', xwalkId: '2978', description: '', children: [] },
      { id: 'wbs_31A_02_09', code: '31A.02.09', name: 'Demolition - Site Curb', xwalkId: '2979', description: '', children: [] },
      { id: 'wbs_31A_02_10', code: '31A.02.10', name: 'Demolition - Dry Utilities - Gas Line', xwalkId: '2980', description: '', children: [] },
      { id: 'wbs_31A_02_11', code: '31A.02.11', name: 'Demolition - Site Signage/Site Furnishing/Site Equipment', xwalkId: '2981', description: '', children: [] },
      { id: 'wbs_31A_02_12', code: '31A.02.12', name: 'Demolition - Dry Utilities - Electrical Equipment/Fixtures', xwalkId: '2982', description: '', children: [] }
    ] },
    { id: 'wbs_31A_03', code: '31A.03', name: 'Earthwork Site Clearing', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_03_01', code: '31A.03.01', name: 'Site Clearing & Grubbing', xwalkId: '2983', description: '', children: [] },
      { id: 'wbs_31A_03_02', code: '31A.03.02', name: 'Topsoil Strip & Stockpile', xwalkId: '2984', description: '', children: [] }
    ] },
    { id: 'wbs_31A_04', code: '31A.04', name: 'Excavation & Fill', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_04_01', code: '31A.04.01', name: 'Building Pad - Cut & Fill', xwalkId: '2985', description: '', children: [] },
      { id: 'wbs_31A_04_02', code: '31A.04.02', name: 'Site - Cut & Fill', xwalkId: '2986', description: '', children: [] },
      { id: 'wbs_31A_04_03', code: '31A.04.03', name: 'Detention Pond - Cut & Fill', xwalkId: '2987', description: '', children: [] },
      { id: 'wbs_31A_04_04', code: '31A.04.04', name: 'Detention Pond - Demuck', xwalkId: '2988', description: '', children: [] },
      { id: 'wbs_31A_04_05', code: '31A.04.05', name: 'Retaining Wall - Excavation', xwalkId: '2989', description: '', children: [] },
      { id: 'wbs_31A_04_06', code: '31A.04.06', name: 'Rock Excavation', xwalkId: '2990', description: '', children: [] },
      { id: 'wbs_31A_04_07', code: '31A.04.07', name: 'Excavation Support & Protection', xwalkId: '2991', description: '', children: [] },
      { id: 'wbs_31A_04_08', code: '31A.04.08', name: 'Site - Import Regular Fill', xwalkId: '2992', description: '', children: [] },
      { id: 'wbs_31A_04_09', code: '31A.04.09', name: 'Site - Spoil Haul-offs', xwalkId: '2993', description: '', children: [] },
      { id: 'wbs_31A_04_10', code: '31A.04.10', name: 'Site - Topsoil Haul-offs', xwalkId: '2994', description: '', children: [] }
    ] },
    { id: 'wbs_31A_05', code: '31A.05', name: 'Subgrade Prep - Building Pad', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_05_01', code: '31A.05.01', name: 'Building Pad - Compacted Subgrade', xwalkId: '2995', description: '', children: [] },
      { id: 'wbs_31A_05_02', code: '31A.05.02', name: 'Building Pad - Moisture Conditioning', xwalkId: '2996', description: '', children: [] },
      { id: 'wbs_31A_05_03', code: '31A.05.03', name: 'Building Pad - Lime/Fly Ash/Lime-Fly Ash Stabilization', xwalkId: '2997', description: '', children: [] },
      { id: 'wbs_31A_05_04', code: '31A.05.04', name: 'Building Pad - Asphalt Stabilization', xwalkId: '2998', description: '', children: [] },
      { id: 'wbs_31A_05_05', code: '31A.05.05', name: 'Building Pad - Cement Stabilization', xwalkId: '2999', description: '', children: [] },
      { id: 'wbs_31A_05_06', code: '31A.05.06', name: 'Building Pad - Chemical Injection Soil Stabilization', xwalkId: '3000', description: '', children: [] },
      { id: 'wbs_31A_05_07', code: '31A.05.07', name: 'Building Pad - Water Injection Soil Stabilization', xwalkId: '3001', description: '', children: [] },
      { id: 'wbs_31A_05_08', code: '31A.05.08', name: 'Building Pad - Pressure Grout Soil Stabilization', xwalkId: '3002', description: '', children: [] },
      { id: 'wbs_31A_05_09', code: '31A.05.09', name: 'Building Pad - Geosynthetic Soil Stabilization & Layers', xwalkId: '3003', description: '', children: [] }
    ] },
    { id: 'wbs_31A_06', code: '31A.06', name: 'Subgrade Prep - Site', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_06_01', code: '31A.06.01', name: 'Site - Compacted Subgrade', xwalkId: '3004', description: '', children: [] },
      { id: 'wbs_31A_06_02', code: '31A.06.02', name: 'Site - Moisture Conditioning', xwalkId: '3005', description: '', children: [] },
      { id: 'wbs_31A_06_03', code: '31A.06.03', name: 'Site - Lime/Fly Ash/Lime-Fly Ash Stabilization', xwalkId: '3006', description: '', children: [] },
      { id: 'wbs_31A_06_04', code: '31A.06.04', name: 'Site - Asphalt Stabilization', xwalkId: '3007', description: '', children: [] },
      { id: 'wbs_31A_06_05', code: '31A.06.05', name: 'Site - Cement Stabilization', xwalkId: '3008', description: '', children: [] },
      { id: 'wbs_31A_06_06', code: '31A.06.06', name: 'Site - Chemical Injection Soil Stabilization', xwalkId: '3009', description: '', children: [] },
      { id: 'wbs_31A_06_07', code: '31A.06.07', name: 'Site - Water Injection Soil Stabilization', xwalkId: '3010', description: '', children: [] },
      { id: 'wbs_31A_06_08', code: '31A.06.08', name: 'Site - Pressure Grout Soil Stabilization', xwalkId: '3011', description: '', children: [] },
      { id: 'wbs_31A_06_09', code: '31A.06.09', name: 'Site - Geosynthetic Soil Stabilization & Layers', xwalkId: '3012', description: '', children: [] }
    ] },
    { id: 'wbs_31A_07', code: '31A.07', name: 'Special Fill', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_07_01', code: '31A.07.01', name: 'Building Pad - Select Fill', xwalkId: '3013', description: '', children: [] },
      { id: 'wbs_31A_07_02', code: '31A.07.02', name: 'Site - Select Fill', xwalkId: '3014', description: '', children: [] }
    ] },
    { id: 'wbs_31A_08', code: '31A.08', name: 'Earthwork - Base Materials', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_08_01', code: '31A.08.01', name: 'Building Pad - Base Materials', xwalkId: '3015', description: '', children: [] },
      { id: 'wbs_31A_08_02', code: '31A.08.02', name: 'Pavement - Base Materials', xwalkId: '3016', description: '', children: [] },
      { id: 'wbs_31A_08_03', code: '31A.08.03', name: 'Sidewalk - Base Materials', xwalkId: '3017', description: '', children: [] },
      { id: 'wbs_31A_08_04', code: '31A.08.04', name: 'Gravel Paving', xwalkId: '3018', description: '', children: [] },
      { id: 'wbs_31A_08_05', code: '31A.08.05', name: 'Detention Pond - Base Material', xwalkId: '3019', description: '', children: [] }
    ] },
    { id: 'wbs_31A_09', code: '31A.09', name: 'Backfill & Final Grading', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_09_01', code: '31A.09.01', name: 'Backfill - Building Crawl Space/Basement', xwalkId: '3020', description: '', children: [] },
      { id: 'wbs_31A_09_02', code: '31A.09.02', name: 'Backfill - Foundation Walls', xwalkId: '3021', description: '', children: [] },
      { id: 'wbs_31A_09_03', code: '31A.09.03', name: 'Re-grading - Crawl Space', xwalkId: '3022', description: '', children: [] },
      { id: 'wbs_31A_09_04', code: '31A.09.04', name: 'Final Grading - Building Pad', xwalkId: '3023', description: '', children: [] },
      { id: 'wbs_31A_09_05', code: '31A.09.05', name: 'Backfill - Retaining Walls/Site Walls', xwalkId: '3024', description: '', children: [] },
      { id: 'wbs_31A_09_06', code: '31A.09.06', name: 'Backfill - Curbs & Islands', xwalkId: '3025', description: '', children: [] },
      { id: 'wbs_31A_09_07', code: '31A.09.07', name: 'Final Grading - Site', xwalkId: '3026', description: '', children: [] },
      { id: 'wbs_31A_09_08', code: '31A.09.08', name: 'Respread - Topsoil', xwalkId: '3027', description: '', children: [] }
    ] },
    { id: 'wbs_31A_10', code: '31A.10', name: 'Offsite Earthworks', xwalkId: '', description: '', children: [
      { id: 'wbs_31A_10_01', code: '31A.10.01', name: 'Offsite - Demolition', xwalkId: '3028', description: '', children: [] },
      { id: 'wbs_31A_10_02', code: '31A.10.02', name: 'Offsite - Clearing & Grubbing', xwalkId: '3029', description: '', children: [] },
      { id: 'wbs_31A_10_03', code: '31A.10.03', name: 'Offsite - Topsoil Strip & Stockpile', xwalkId: '3030', description: '', children: [] },
      { id: 'wbs_31A_10_04', code: '31A.10.04', name: 'Offsite - Cut & Fill', xwalkId: '3031', description: '', children: [] },
      { id: 'wbs_31A_10_05', code: '31A.10.05', name: 'Offsite - Embankments', xwalkId: '3032', description: '', children: [] },
      { id: 'wbs_31A_10_06', code: '31A.10.06', name: 'Offsite - Soil Stabilization', xwalkId: '3033', description: '', children: [] },
      { id: 'wbs_31A_10_07', code: '31A.10.07', name: 'Offsite - Base Materials', xwalkId: '3034', description: '', children: [] },
      { id: 'wbs_31A_10_08', code: '31A.10.08', name: 'Offsite - Final Grading', xwalkId: '3035', description: '', children: [] },
      { id: 'wbs_31A_10_09', code: '31A.10.09', name: 'Offsite - Backfill Curbs', xwalkId: '3036', description: '', children: [] },
      { id: 'wbs_31A_10_10', code: '31A.10.10', name: 'Offsite - Topsoil Re-spread', xwalkId: '3037', description: '', children: [] },
      { id: 'wbs_31A_10_11', code: '31A.10.11', name: 'Offsite - Excavation Support & Protection', xwalkId: '3038', description: '', children: [] },
      { id: 'wbs_31A_10_12', code: '31A.10.12', name: 'Offsite - Import Regular Fill', xwalkId: '3039', description: '', children: [] },
      { id: 'wbs_31A_10_13', code: '31A.10.13', name: 'Offsite - Spoil Haul-offs', xwalkId: '3040', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_31B', code: '31B', name: 'Erosion Control', xwalkId: '', description: '', children: [
    { id: 'wbs_31B_01', code: '31B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_31B_01_01', code: '31B.01.01', name: 'Mobilization', xwalkId: '3041', description: '', children: [] },
      { id: 'wbs_31B_01_02', code: '31B.01.02', name: 'Bond/Permit', xwalkId: '3042', description: '', children: [] },
      { id: 'wbs_31B_01_05', code: '31B.01.05', name: 'Supervision', xwalkId: '3043', description: '', children: [] },
      { id: 'wbs_31B_01_18', code: '31B.01.18', name: 'Tree Protection', xwalkId: '3044', description: '', children: [] }
    ] },
    { id: 'wbs_31B_02', code: '31B.02', name: 'SWPPP Services', xwalkId: '', description: '', children: [
      { id: 'wbs_31B_02_01', code: '31B.02.01', name: 'SWPPP Narrative & Startup', xwalkId: '3045', description: '', children: [] },
      { id: 'wbs_31B_02_02', code: '31B.02.02', name: 'NOI Permit Fee', xwalkId: '3046', description: '', children: [] },
      { id: 'wbs_31B_02_03', code: '31B.02.03', name: 'SWPPP Inspections', xwalkId: '3047', description: '', children: [] },
      { id: 'wbs_31B_02_04', code: '31B.02.04', name: 'SWPPP Maintenance', xwalkId: '3048', description: '', children: [] },
      { id: 'wbs_31B_02_05', code: '31B.02.05', name: 'Removal of Erosion Control Measures', xwalkId: '3049', description: '', children: [] }
    ] },
    { id: 'wbs_31B_03', code: '31B.03', name: 'Site Erosion Controls', xwalkId: '', description: '', children: [
      { id: 'wbs_31B_03_01', code: '31B.03.01', name: 'Construction Entrance', xwalkId: '3050', description: '', children: [] },
      { id: 'wbs_31B_03_02', code: '31B.03.02', name: 'Perimeter Silt Fence', xwalkId: '3051', description: '', children: [] },
      { id: 'wbs_31B_03_03', code: '31B.03.03', name: 'Inlet Protection Barriers', xwalkId: '3052', description: '', children: [] },
      { id: 'wbs_31B_03_04', code: '31B.03.04', name: 'Rock Filter Dams', xwalkId: '3053', description: '', children: [] },
      { id: 'wbs_31B_03_05', code: '31B.03.05', name: 'Erosion Control Matting', xwalkId: '3054', description: '', children: [] },
      { id: 'wbs_31B_03_06', code: '31B.03.06', name: 'Concrete Truck Washout', xwalkId: '3055', description: '', children: [] },
      { id: 'wbs_31B_03_08', code: '31B.03.08', name: 'Erosion Control Log Dam', xwalkId: '3056', description: '', children: [] }
    ] },
    { id: 'wbs_31B_04', code: '31B.04', name: 'Water Quality Pond', xwalkId: '', description: '', children: [
      { id: 'wbs_31B_04_00', code: '31B.04.00', name: 'Water Quality Pond (Turnkey)', xwalkId: '3057', description: '', children: [] },
      { id: 'wbs_31B_04_01', code: '31B.04.01', name: 'Filtration Pond', xwalkId: '3058', description: '', children: [] },
      { id: 'wbs_31B_04_02', code: '31B.04.02', name: 'Gabion Wall', xwalkId: '3059', description: '', children: [] },
      { id: 'wbs_31B_04_03', code: '31B.04.03', name: 'Access Drive, Splash Pad', xwalkId: '3060', description: '', children: [] }
    ] },
    { id: 'wbs_31B_05', code: '31B.05', name: 'Offsite Erosion Controls', xwalkId: '', description: '', children: [
      { id: 'wbs_31B_05_01', code: '31B.05.01', name: 'Offsite - Silt Fence', xwalkId: '3061', description: '', children: [] },
      { id: 'wbs_31B_05_02', code: '31B.05.02', name: 'Offsite - Inlet Protection', xwalkId: '3062', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_31C', code: '31C', name: 'Termite Control', xwalkId: '', description: '', children: [
    { id: 'wbs_31C_02', code: '31C.02', name: 'Soil Treatment', xwalkId: '', description: '', children: [
      { id: 'wbs_31C_02_01', code: '31C.02.01', name: 'Termite Control', xwalkId: '3063', description: '', children: [] },
      { id: 'wbs_31C_02_02', code: '31C.02.02', name: 'Rodent Control', xwalkId: '3064', description: '', children: [] },
      { id: 'wbs_31C_02_03', code: '31C.02.03', name: 'Vegetation Control', xwalkId: '3065', description: '', children: [] }
    ] },
    { id: 'wbs_31C_03', code: '31C.03', name: 'Termite Control Services', xwalkId: '', description: '', children: [
      { id: 'wbs_31C_03_01', code: '31C.03.01', name: 'Annual Termite Inspection', xwalkId: '3066', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32A', code: '32A', name: 'Asphalt', xwalkId: '', description: '', children: [
    { id: 'wbs_32A_01', code: '32A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32A_01_01', code: '32A.01.01', name: 'Mobilization', xwalkId: '3067', description: '', children: [] },
      { id: 'wbs_32A_01_02', code: '32A.01.02', name: 'Bond/Permit', xwalkId: '3068', description: '', children: [] },
      { id: 'wbs_32A_01_03', code: '32A.01.03', name: 'Submittals', xwalkId: '3069', description: '', children: [] },
      { id: 'wbs_32A_01_04', code: '32A.01.04', name: 'Equip Rentals', xwalkId: '3070', description: '', children: [] },
      { id: 'wbs_32A_01_05', code: '32A.01.05', name: 'Supervision', xwalkId: '3071', description: '', children: [] },
      { id: 'wbs_32A_01_06', code: '32A.01.06', name: 'Demobilization', xwalkId: '3072', description: '', children: [] },
      { id: 'wbs_32A_01_07', code: '32A.01.07', name: 'Close-Out', xwalkId: '3073', description: '', children: [] },
      { id: 'wbs_32A_01_09', code: '32A.01.09', name: 'Cleaning', xwalkId: '3074', description: '', children: [] },
      { id: 'wbs_32A_01_13', code: '32A.01.13', name: 'Testing', xwalkId: '3075', description: '', children: [] },
      { id: 'wbs_32A_01_14', code: '32A.01.14', name: 'Survey & Layout', xwalkId: '3076', description: '', children: [] },
      { id: 'wbs_32A_01_16', code: '32A.01.16', name: 'Temporary Asphalt Road', xwalkId: '3077', description: '', children: [] }
    ] },
    { id: 'wbs_32A_02', code: '32A.02', name: 'Asphalt Pavement System', xwalkId: '', description: '', children: [
      { id: 'wbs_32A_02_10', code: '32A.02.10', name: 'Asphalt Pavement Subgrade Preparation', xwalkId: '3078', description: '', children: [] },
      { id: 'wbs_32A_02_20', code: '32A.02.20', name: 'Asphalt Pavement Base Course', xwalkId: '3079', description: '', children: [] },
      { id: 'wbs_32A_02_30', code: '32A.02.30', name: 'Asphalt Pavement Preparatory Coats', xwalkId: '3080', description: '', children: [] },
      { id: 'wbs_32A_02_40', code: '32A.02.40', name: 'Asphalt Pavement', xwalkId: '3081', description: '', children: [] },
      { id: 'wbs_32A_02_41', code: '32A.02.41', name: 'Asphalt Pavement - 2" HMAC', xwalkId: '3082', description: '', children: [] },
      { id: 'wbs_32A_02_42', code: '32A.02.42', name: 'Asphalt Pavement - 2', xwalkId: '3083', description: '', children: [] },
      { id: 'wbs_32A_02_43', code: '32A.02.43', name: 'Asphalt Pavement - 3" HMAC', xwalkId: '3084', description: '', children: [] },
      { id: 'wbs_32A_02_44', code: '32A.02.44', name: 'Asphalt Pavement - 3', xwalkId: '3085', description: '', children: [] },
      { id: 'wbs_32A_02_45', code: '32A.02.45', name: 'Asphalt Pavement - 4" HMAC', xwalkId: '3086', description: '', children: [] },
      { id: 'wbs_32A_02_50', code: '32A.02.50', name: 'Asphalt Pavement Seal Coats', xwalkId: '3087', description: '', children: [] },
      { id: 'wbs_32A_02_60', code: '32A.02.60', name: 'Porous Asphalt Pavement', xwalkId: '3088', description: '', children: [] }
    ] },
    { id: 'wbs_32A_03', code: '32A.03', name: 'Asphalt Pavement Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32A_03_10', code: '32A.03.10', name: 'Asphalt Curbs', xwalkId: '3089', description: '', children: [] },
      { id: 'wbs_32A_03_20', code: '32A.03.20', name: 'Asphalt Speed Humps', xwalkId: '3090', description: '', children: [] }
    ] },
    { id: 'wbs_32A_04', code: '32A.04', name: 'Asphalt Pavement Remove & Repair', xwalkId: '', description: '', children: [
      { id: 'wbs_32A_04_10', code: '32A.04.10', name: 'Asphaltic Surface Treatment', xwalkId: '3091', description: '', children: [] },
      { id: 'wbs_32A_04_20', code: '32A.04.20', name: 'Asphalt Pavement Repair', xwalkId: '3092', description: '', children: [] },
      { id: 'wbs_32A_04_30', code: '32A.04.30', name: 'Asphalt Pavement Mill & Overlay', xwalkId: '3093', description: '', children: [] },
      { id: 'wbs_32A_04_40', code: '32A.04.40', name: 'Remove Asphalt Pavement', xwalkId: '3094', description: '', children: [] },
      { id: 'wbs_32A_04_50', code: '32A.04.50', name: 'Spoil Haul-off Asphalt', xwalkId: '3095', description: '', children: [] }
    ] },
    { id: 'wbs_32A_05', code: '32A.05', name: 'Off-site Asphalt Pavement', xwalkId: '', description: '', children: [
      { id: 'wbs_32A_05_10', code: '32A.05.10', name: 'Off-site Asphalt Pavement', xwalkId: '3096', description: '', children: [] },
      { id: 'wbs_32A_05_20', code: '32A.05.20', name: 'Off-site Asphalt Pavement Curbs & Humps', xwalkId: '3097', description: '', children: [] },
      { id: 'wbs_32A_05_30', code: '32A.05.30', name: 'Off-site Asphaltic Surface Treatment', xwalkId: '3098', description: '', children: [] },
      { id: 'wbs_32A_05_40', code: '32A.05.40', name: 'Off-site Pavement Repair', xwalkId: '3099', description: '', children: [] },
      { id: 'wbs_32A_05_50', code: '32A.05.50', name: 'Off-site Pavement Mill & Overlay', xwalkId: '3100', description: '', children: [] },
      { id: 'wbs_32A_05_60', code: '32A.05.60', name: 'Off-site Remove Asphalt Pavement', xwalkId: '3101', description: '', children: [] },
      { id: 'wbs_32A_05_70', code: '32A.05.70', name: 'Off-site Spoil Haul-off Asphalt', xwalkId: '3102', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32B', code: '32B', name: 'Unit Pavers', xwalkId: '', description: '', children: [
    { id: 'wbs_32B_01', code: '32B.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32B_01_01', code: '32B.01.01', name: 'Mobilization', xwalkId: '3103', description: '', children: [] },
      { id: 'wbs_32B_01_02', code: '32B.01.02', name: 'Bond/Permit', xwalkId: '3104', description: '', children: [] },
      { id: 'wbs_32B_01_03', code: '32B.01.03', name: 'Submittals', xwalkId: '3105', description: '', children: [] },
      { id: 'wbs_32B_01_07', code: '32B.01.07', name: 'Close-Out', xwalkId: '3106', description: '', children: [] },
      { id: 'wbs_32B_01_09', code: '32B.01.09', name: 'Cleaning', xwalkId: '3107', description: '', children: [] },
      { id: 'wbs_32B_01_10', code: '32B.01.10', name: 'Mockup', xwalkId: '3108', description: '', children: [] }
    ] },
    { id: 'wbs_32B_02', code: '32B.02', name: 'Unit Paver System', xwalkId: '', description: '', children: [
      { id: 'wbs_32B_02_01', code: '32B.02.01', name: 'Precast Concrete Pavers', xwalkId: '3109', description: '', children: [] },
      { id: 'wbs_32B_02_02', code: '32B.02.02', name: 'Brick Unit Pavers', xwalkId: '3110', description: '', children: [] },
      { id: 'wbs_32B_02_03', code: '32B.02.03', name: 'Asphalt Unit Pavers', xwalkId: '3111', description: '', children: [] },
      { id: 'wbs_32B_02_04', code: '32B.02.04', name: 'Stone Paving', xwalkId: '3112', description: '', children: [] },
      { id: 'wbs_32B_02_05', code: '32B.02.05', name: 'Unit Pavers - Bedding Material', xwalkId: '3113', description: '', children: [] },
      { id: 'wbs_32B_02_06', code: '32B.02.06', name: 'Unit Pavers - Edge Restraints', xwalkId: '3114', description: '', children: [] },
      { id: 'wbs_32B_02_07', code: '32B.02.07', name: 'Unit Pavers - Install Only', xwalkId: '3115', description: '', children: [] }
    ] },
    { id: 'wbs_32B_03', code: '32B.03', name: 'Porous Paver System', xwalkId: '', description: '', children: [
      { id: 'wbs_32B_03_01', code: '32B.03.01', name: 'Porous Unit Pavers', xwalkId: '3116', description: '', children: [] },
      { id: 'wbs_32B_03_02', code: '32B.03.02', name: 'Porous Paver Base Materials', xwalkId: '3117', description: '', children: [] },
      { id: 'wbs_32B_03_03', code: '32B.03.03', name: 'Porous Paver Sub-Drainage System', xwalkId: '3118', description: '', children: [] }
    ] },
    { id: 'wbs_32B_04', code: '32B.04', name: 'Grass Paver System', xwalkId: '', description: '', children: [
      { id: 'wbs_32B_04_01', code: '32B.04.01', name: 'Grass Pavers', xwalkId: '3119', description: '', children: [] },
      { id: 'wbs_32B_04_02', code: '32B.04.02', name: 'Grass Paver Base Materials', xwalkId: '3120', description: '', children: [] },
      { id: 'wbs_32B_04_03', code: '32B.04.03', name: 'Grass Paver Sub-Drainage System', xwalkId: '3121', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32C', code: '32C', name: 'Stripes & Stops', xwalkId: '', description: '', children: [
    { id: 'wbs_32C_01', code: '32C.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_01_01', code: '32C.01.01', name: 'Mobilization', xwalkId: '3122', description: '', children: [] },
      { id: 'wbs_32C_01_02', code: '32C.01.02', name: 'Bond/Permit', xwalkId: '3123', description: '', children: [] },
      { id: 'wbs_32C_01_03', code: '32C.01.03', name: 'Submittals', xwalkId: '3124', description: '', children: [] },
      { id: 'wbs_32C_01_04', code: '32C.01.04', name: 'Equip Rentals', xwalkId: '3125', description: '', children: [] },
      { id: 'wbs_32C_01_05', code: '32C.01.05', name: 'Supervision', xwalkId: '3126', description: '', children: [] },
      { id: 'wbs_32C_01_06', code: '32C.01.06', name: 'Demobilization', xwalkId: '3127', description: '', children: [] },
      { id: 'wbs_32C_01_07', code: '32C.01.07', name: 'Close-Out', xwalkId: '3128', description: '', children: [] },
      { id: 'wbs_32C_01_09', code: '32C.01.09', name: 'Cleaning', xwalkId: '3129', description: '', children: [] },
      { id: 'wbs_32C_01_14', code: '32C.01.14', name: 'Survey & Layout', xwalkId: '3130', description: '', children: [] }
    ] },
    { id: 'wbs_32C_02', code: '32C.02', name: 'Pavement Markings - Striping', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_02_01', code: '32C.02.01', name: 'Pavement Line Striping', xwalkId: '3131', description: '', children: [] },
      { id: 'wbs_32C_02_02', code: '32C.02.02', name: 'Crosswalk Striping', xwalkId: '3132', description: '', children: [] },
      { id: 'wbs_32C_02_03', code: '32C.02.03', name: 'Fire Lane Striping', xwalkId: '3133', description: '', children: [] },
      { id: 'wbs_32C_02_04', code: '32C.02.04', name: 'Parking Stall Line Striping', xwalkId: '3134', description: '', children: [] },
      { id: 'wbs_32C_02_05', code: '32C.02.05', name: 'Parking Stall Area Striping', xwalkId: '3135', description: '', children: [] },
      { id: 'wbs_32C_02_06', code: '32C.02.06', name: 'Basket Ball Court Striping', xwalkId: '3136', description: '', children: [] },
      { id: 'wbs_32C_02_07', code: '32C.02.07', name: 'Practice Field Striping', xwalkId: '3137', description: '', children: [] }
    ] },
    { id: 'wbs_32C_03', code: '32C.03', name: 'Pavement Markings - Symbols/Letters', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_03_01', code: '32C.03.01', name: 'Pavement Marking Symbols/Stencils', xwalkId: '3138', description: '', children: [] },
      { id: 'wbs_32C_03_02', code: '32C.03.02', name: 'Pavement Marking Letters/Text', xwalkId: '3139', description: '', children: [] },
      { id: 'wbs_32C_03_03', code: '32C.03.03', name: 'Directional Arrows', xwalkId: '3140', description: '', children: [] },
      { id: 'wbs_32C_03_04', code: '32C.03.04', name: 'Basket Ball Court Symbols/Stencils', xwalkId: '3141', description: '', children: [] },
      { id: 'wbs_32C_03_05', code: '32C.03.05', name: 'Practice Field Symbols/Stencils', xwalkId: '3142', description: '', children: [] }
    ] },
    { id: 'wbs_32C_04', code: '32C.04', name: 'Pavement Markings - Signages', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_04_01', code: '32C.04.01', name: 'Parking Signages w/ Footing', xwalkId: '3143', description: '', children: [] },
      { id: 'wbs_32C_04_02', code: '32C.04.02', name: 'Parking Signages w/o Footing', xwalkId: '3144', description: '', children: [] },
      { id: 'wbs_32C_04_03', code: '32C.04.03', name: 'Traffic Signages', xwalkId: '3145', description: '', children: [] }
    ] },
    { id: 'wbs_32C_05', code: '32C.05', name: 'Pavement Markings - Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_05_01', code: '32C.05.01', name: 'Speed Bumps', xwalkId: '3146', description: '', children: [] },
      { id: 'wbs_32C_05_02', code: '32C.05.02', name: 'Wheel Stops', xwalkId: '3147', description: '', children: [] },
      { id: 'wbs_32C_05_03', code: '32C.05.03', name: 'Pavement Reflectors', xwalkId: '3148', description: '', children: [] }
    ] },
    { id: 'wbs_32C_06', code: '32C.06', name: 'Off-site - Pavement Markings & Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32C_06_01', code: '32C.06.01', name: 'Off-site Pavement Markings - Striping', xwalkId: '3149', description: '', children: [] },
      { id: 'wbs_32C_06_02', code: '32C.06.02', name: 'Off-site Pavement Marking - Symbols/Letters', xwalkId: '3150', description: '', children: [] },
      { id: 'wbs_32C_06_03', code: '32C.06.03', name: 'Off-site Pavement Marking - Directional Arrows', xwalkId: '3151', description: '', children: [] },
      { id: 'wbs_32C_06_05', code: '32C.06.05', name: 'Off-site Speed Bumps', xwalkId: '3152', description: '', children: [] },
      { id: 'wbs_32C_06_06', code: '32C.06.06', name: 'Off-site Pavement Reflectors', xwalkId: '3153', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32D', code: '32D', name: 'Athletic Field', xwalkId: '', description: '', children: [
    { id: 'wbs_32D_00', code: '32D.00', name: 'Fields', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_00_01', code: '32D.00.01', name: 'Baseball Field – Turnkey', xwalkId: '3154', description: '', children: [] },
      { id: 'wbs_32D_00_02', code: '32D.00.02', name: 'Softball Field – Turnkey', xwalkId: '3155', description: '', children: [] },
      { id: 'wbs_32D_00_03', code: '32D.00.03', name: 'Football (Sod) & Track/Events – Turnkey', xwalkId: '3156', description: '', children: [] },
      { id: 'wbs_32D_00_04', code: '32D.00.04', name: 'Football (Synthetic) & Track/Events – Turnkey', xwalkId: '3157', description: '', children: [] },
      { id: 'wbs_32D_00_05', code: '32D.00.05', name: 'Practice Field (Sod) – Turnkey', xwalkId: '3158', description: '', children: [] },
      { id: 'wbs_32D_00_06', code: '32D.00.06', name: 'Practice Field (Synthetic) – Turnkey', xwalkId: '3159', description: '', children: [] },
      { id: 'wbs_32D_00_07', code: '32D.00.07', name: 'Track – Turnkey', xwalkId: '3160', description: '', children: [] },
      { id: 'wbs_32D_00_08', code: '32D.00.08', name: 'Track/Events – Turnkey', xwalkId: '3161', description: '', children: [] },
      { id: 'wbs_32D_00_09', code: '32D.00.09', name: 'Outdoor Basketball Court – Turnkey', xwalkId: '3162', description: '', children: [] }
    ] },
    { id: 'wbs_32D_01', code: '32D.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_01_01', code: '32D.01.01', name: 'Mobilization', xwalkId: '3163', description: '', children: [] },
      { id: 'wbs_32D_01_02', code: '32D.01.02', name: 'Bond/Permit', xwalkId: '3164', description: '', children: [] },
      { id: 'wbs_32D_01_03', code: '32D.01.03', name: 'Submittals', xwalkId: '3165', description: '', children: [] },
      { id: 'wbs_32D_01_04', code: '32D.01.04', name: 'Equip Rentals', xwalkId: '3166', description: '', children: [] },
      { id: 'wbs_32D_01_05', code: '32D.01.05', name: 'Supervision', xwalkId: '3167', description: '', children: [] },
      { id: 'wbs_32D_01_06', code: '32D.01.06', name: 'Demobilization', xwalkId: '3168', description: '', children: [] },
      { id: 'wbs_32D_01_07', code: '32D.01.07', name: 'Close-Out', xwalkId: '3169', description: '', children: [] },
      { id: 'wbs_32D_01_09', code: '32D.01.09', name: 'Cleaning', xwalkId: '3170', description: '', children: [] },
      { id: 'wbs_32D_01_13', code: '32D.01.13', name: 'Testing', xwalkId: '3171', description: '', children: [] },
      { id: 'wbs_32D_01_14', code: '32D.01.14', name: 'Survey & Layout', xwalkId: '3172', description: '', children: [] }
    ] },
    { id: 'wbs_32D_02', code: '32D.02', name: 'Demolition - Athletic Fields & Events', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_02_01', code: '32D.02.01', name: 'Removal of Concrete at Athletic Fields & Events', xwalkId: '3173', description: '', children: [] },
      { id: 'wbs_32D_02_02', code: '32D.02.02', name: 'Removal of Athletic Field Surfacing', xwalkId: '3174', description: '', children: [] },
      { id: 'wbs_32D_02_03', code: '32D.02.03', name: 'Removal of Field Track', xwalkId: '3175', description: '', children: [] },
      { id: 'wbs_32D_02_04', code: '32D.02.04', name: 'Removal of Field Events', xwalkId: '3176', description: '', children: [] },
      { id: 'wbs_32D_02_05', code: '32D.02.05', name: 'Removal of Field Equipment', xwalkId: '3177', description: '', children: [] },
      { id: 'wbs_32D_02_06', code: '32D.02.06', name: 'Repair/Repatch Field Track', xwalkId: '3178', description: '', children: [] }
    ] },
    { id: 'wbs_32D_03', code: '32D.03', name: 'Football/Soccer Fields', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_03_01', code: '32D.03.01', name: 'Laser Grading & Base Compaction - Football/Soccer Fields', xwalkId: '3179', description: '', children: [] },
      { id: 'wbs_32D_03_02', code: '32D.03.02', name: 'Subgrade Stabilization - Football/Soccer Fields', xwalkId: '3180', description: '', children: [] },
      { id: 'wbs_32D_03_03', code: '32D.03.03', name: 'Base Materials - Football/Soccer Fields', xwalkId: '3181', description: '', children: [] },
      { id: 'wbs_32D_03_04', code: '32D.03.04', name: 'Topsoil (Root Zone) - Football/Soccer Fields', xwalkId: '3182', description: '', children: [] },
      { id: 'wbs_32D_03_05', code: '32D.03.05', name: 'Synthetic Surfacing - Football/Soccer Fields', xwalkId: '3183', description: '', children: [] },
      { id: 'wbs_32D_03_06', code: '32D.03.06', name: 'Sod/Natural Turf - Football/Soccer Fields', xwalkId: '3184', description: '', children: [] },
      { id: 'wbs_32D_03_07', code: '32D.03.07', name: 'Subdrainage System - Football/Soccer Field', xwalkId: '3185', description: '', children: [] },
      { id: 'wbs_32D_03_08', code: '32D.03.08', name: 'Irrigation System - Football/Soccer Field', xwalkId: '3186', description: '', children: [] },
      { id: 'wbs_32D_03_09', code: '32D.03.09', name: 'Field Lines & Markings - Football/Soccer Fields', xwalkId: '3187', description: '', children: [] },
      { id: 'wbs_32D_03_10', code: '32D.03.10', name: 'Site Concrete - Football/Soccer Field', xwalkId: '3188', description: '', children: [] }
    ] },
    { id: 'wbs_32D_04', code: '32D.04', name: 'Baseball/Softball Field', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_04_01', code: '32D.04.01', name: 'Laser Grading & Base Compaction - Baseball/Softball Field', xwalkId: '3189', description: '', children: [] },
      { id: 'wbs_32D_04_02', code: '32D.04.02', name: 'Subgrade Stabilization - Baseball/Softball Field', xwalkId: '3190', description: '', children: [] },
      { id: 'wbs_32D_04_03', code: '32D.04.03', name: 'Base Materials - Baseball/Softball Field', xwalkId: '3191', description: '', children: [] },
      { id: 'wbs_32D_04_04', code: '32D.04.04', name: 'Topsoil (Root Zone) - Baseball/Softball Field', xwalkId: '3192', description: '', children: [] },
      { id: 'wbs_32D_04_05', code: '32D.04.05', name: 'Synthetic Surfacing - Baseball/Softball Field', xwalkId: '3193', description: '', children: [] },
      { id: 'wbs_32D_04_06', code: '32D.04.06', name: 'Sod/Natural Turf - Baseball/Softball Field', xwalkId: '3194', description: '', children: [] },
      { id: 'wbs_32D_04_07', code: '32D.04.07', name: 'Red Dirt/Mound Clay - Baseball/Softball Field', xwalkId: '3195', description: '', children: [] },
      { id: 'wbs_32D_04_08', code: '32D.04.08', name: 'Crushed Rock - Baseball/Softball Field', xwalkId: '3196', description: '', children: [] },
      { id: 'wbs_32D_04_09', code: '32D.04.09', name: 'Warning Track - Baseball/Softball Field', xwalkId: '3197', description: '', children: [] },
      { id: 'wbs_32D_04_10', code: '32D.04.10', name: 'Subdrainage System - Baseball/Softball Field', xwalkId: '3198', description: '', children: [] },
      { id: 'wbs_32D_04_11', code: '32D.04.11', name: 'Irrigation System - Baseball/Softball Field', xwalkId: '3199', description: '', children: [] },
      { id: 'wbs_32D_04_12', code: '32D.04.12', name: 'Field Lines & Markings - Baseball/Softball Field', xwalkId: '3200', description: '', children: [] },
      { id: 'wbs_32D_04_13', code: '32D.04.13', name: 'Site Concrete - Baseball/Softball Field', xwalkId: '3201', description: '', children: [] }
    ] },
    { id: 'wbs_32D_05', code: '32D.05', name: 'Running Track', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_05_01', code: '32D.05.01', name: 'Laser Grading & Base Compaction - Running Track', xwalkId: '3202', description: '', children: [] },
      { id: 'wbs_32D_05_02', code: '32D.05.02', name: 'Subgrade Stabilization - Running Track', xwalkId: '3203', description: '', children: [] },
      { id: 'wbs_32D_05_03', code: '32D.05.03', name: 'Base Material - Running Track', xwalkId: '3204', description: '', children: [] },
      { id: 'wbs_32D_05_04', code: '32D.05.04', name: 'Topsoil (Root Zone) - Running Track', xwalkId: '3205', description: '', children: [] },
      { id: 'wbs_32D_05_05', code: '32D.05.05', name: 'Synthetic Surfacing - Running Track', xwalkId: '3206', description: '', children: [] },
      { id: 'wbs_32D_05_06', code: '32D.05.06', name: 'Asphalt Paving - Running Track', xwalkId: '3207', description: '', children: [] },
      { id: 'wbs_32D_05_07', code: '32D.05.07', name: 'Sod/Natural - Running Track', xwalkId: '3208', description: '', children: [] },
      { id: 'wbs_32D_05_08', code: '32D.05.08', name: 'Subdrainage System - Running Track', xwalkId: '3209', description: '', children: [] },
      { id: 'wbs_32D_05_09', code: '32D.05.09', name: 'Striping & Painting - Running Track', xwalkId: '3210', description: '', children: [] },
      { id: 'wbs_32D_05_10', code: '32D.05.10', name: 'Concrete Curbs - Running Track', xwalkId: '3211', description: '', children: [] },
      { id: 'wbs_32D_05_11', code: '32D.05.11', name: 'D-Zone Concrete', xwalkId: '3212', description: '', children: [] }
    ] },
    { id: 'wbs_32D_06', code: '32D.06', name: 'Long Jump', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_06_01', code: '32D.06.01', name: 'Subgrade Stabilization - Long Jump', xwalkId: '3213', description: '', children: [] },
      { id: 'wbs_32D_06_02', code: '32D.06.02', name: 'Base Material - Long Jump', xwalkId: '3214', description: '', children: [] },
      { id: 'wbs_32D_06_03', code: '32D.06.03', name: 'Long Jump Runway', xwalkId: '3215', description: '', children: [] },
      { id: 'wbs_32D_06_04', code: '32D.06.04', name: 'Jump Pit', xwalkId: '3216', description: '', children: [] },
      { id: 'wbs_32D_06_05', code: '32D.06.05', name: 'Long Jump Take-off Boards', xwalkId: '3217', description: '', children: [] },
      { id: 'wbs_32D_06_06', code: '32D.06.06', name: 'Subdrainage System - Long Jump', xwalkId: '3218', description: '', children: [] },
      { id: 'wbs_32D_06_07', code: '32D.06.07', name: 'Concrete Curbs - Long Jump', xwalkId: '3219', description: '', children: [] }
    ] },
    { id: 'wbs_32D_07', code: '32D.07', name: 'Shot-Put', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_07_01', code: '32D.07.01', name: 'Subgrade Stabilization - Shot-Put', xwalkId: '3220', description: '', children: [] },
      { id: 'wbs_32D_07_02', code: '32D.07.02', name: 'Base Material - Shot-Put', xwalkId: '3221', description: '', children: [] },
      { id: 'wbs_32D_07_03', code: '32D.07.03', name: 'Shot-Put Pad', xwalkId: '3222', description: '', children: [] },
      { id: 'wbs_32D_07_04', code: '32D.07.04', name: 'Shot-Put Curb', xwalkId: '3223', description: '', children: [] },
      { id: 'wbs_32D_07_05', code: '32D.07.05', name: 'Subdrainage System - Shot-Put', xwalkId: '3224', description: '', children: [] }
    ] },
    { id: 'wbs_32D_08', code: '32D.08', name: 'Discus', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_08_01', code: '32D.08.01', name: 'Subgrade Stabilization - Discus', xwalkId: '3225', description: '', children: [] },
      { id: 'wbs_32D_08_02', code: '32D.08.02', name: 'Base Material - Discus', xwalkId: '3226', description: '', children: [] },
      { id: 'wbs_32D_08_03', code: '32D.08.03', name: 'Discus Pad', xwalkId: '3227', description: '', children: [] },
      { id: 'wbs_32D_08_04', code: '32D.08.04', name: 'Discus Cage', xwalkId: '3228', description: '', children: [] },
      { id: 'wbs_32D_08_05', code: '32D.08.05', name: 'Subdrainage System - Discus', xwalkId: '3229', description: '', children: [] }
    ] },
    { id: 'wbs_32D_09', code: '32D.09', name: 'Pole Vault', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_09_01', code: '32D.09.01', name: 'Subgrade Stabilization - Pole Vault', xwalkId: '3230', description: '', children: [] },
      { id: 'wbs_32D_09_02', code: '32D.09.02', name: 'Base Material - Pole Vault', xwalkId: '3231', description: '', children: [] },
      { id: 'wbs_32D_09_03', code: '32D.09.03', name: 'Pole Vault Runway', xwalkId: '3232', description: '', children: [] },
      { id: 'wbs_32D_09_04', code: '32D.09.04', name: 'Pole Vault Apron', xwalkId: '3233', description: '', children: [] },
      { id: 'wbs_32D_09_05', code: '32D.09.05', name: 'Vault Box', xwalkId: '3234', description: '', children: [] },
      { id: 'wbs_32D_09_06', code: '32D.09.06', name: 'Subdrainage System - Pole Vault', xwalkId: '3235', description: '', children: [] },
      { id: 'wbs_32D_09_07', code: '32D.09.07', name: 'Athletic Surfacing - Pole Vault', xwalkId: '3236', description: '', children: [] },
      { id: 'wbs_32D_09_08', code: '32D.09.08', name: 'Concrete Slab - Pole Vault', xwalkId: '3237', description: '', children: [] }
    ] },
    { id: 'wbs_32D_10', code: '32D.10', name: 'Athletic Field Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_10_01', code: '32D.10.01', name: 'Goal Posts & Nets', xwalkId: '3238', description: '', children: [] },
      { id: 'wbs_32D_10_02', code: '32D.10.02', name: 'Foul Poles', xwalkId: '3239', description: '', children: [] },
      { id: 'wbs_32D_10_03', code: '32D.10.03', name: 'Bat Racks', xwalkId: '3240', description: '', children: [] },
      { id: 'wbs_32D_10_04', code: '32D.10.04', name: 'Batting Cage', xwalkId: '3241', description: '', children: [] },
      { id: 'wbs_32D_10_05', code: '32D.10.05', name: 'Exterior Wall Pads', xwalkId: '3242', description: '', children: [] },
      { id: 'wbs_32D_10_06', code: '32D.10.06', name: 'Dugout Equipment', xwalkId: '3243', description: '', children: [] },
      { id: 'wbs_32D_10_07', code: '32D.10.07', name: 'Benches & Storage', xwalkId: '3244', description: '', children: [] },
      { id: 'wbs_32D_10_08', code: '32D.10.08', name: 'Backstop', xwalkId: '3245', description: '', children: [] },
      { id: 'wbs_32D_10_09', code: '32D.10.09', name: 'Discus Equipment', xwalkId: '3246', description: '', children: [] },
      { id: 'wbs_32D_10_10', code: '32D.10.10', name: 'Shot Put Equipment', xwalkId: '3247', description: '', children: [] },
      { id: 'wbs_32D_10_11', code: '32D.10.11', name: 'Tetherball Equipment', xwalkId: '3248', description: '', children: [] }
    ] },
    { id: 'wbs_32D_11', code: '32D.11', name: 'Athletic Field Scoreboards', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_11_01', code: '32D.11.01', name: 'Scoreboard Structure - Athletic Field', xwalkId: '3249', description: '', children: [] },
      { id: 'wbs_32D_11_02', code: '32D.11.02', name: 'Scoreboard - Athletic Field', xwalkId: '3250', description: '', children: [] },
      { id: 'wbs_32D_11_03', code: '32D.11.03', name: 'Play Clock - Athletic Field', xwalkId: '3251', description: '', children: [] }
    ] },
    { id: 'wbs_32D_12', code: '32D.12', name: 'Athletic Field - Fence & Windscreens', xwalkId: '', description: '', children: [
      { id: 'wbs_32D_12_01', code: '32D.12.01', name: 'Fence & Windscreens - Baseball/Softball', xwalkId: '3252', description: '', children: [] },
      { id: 'wbs_32D_12_02', code: '32D.12.02', name: 'Fence & Windscreens - Track & Field Events', xwalkId: '3253', description: '', children: [] },
      { id: 'wbs_32D_12_03', code: '32D.12.03', name: 'Fence & Windscreens - Football/Soccer Field', xwalkId: '3254', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32F', code: '32F', name: 'Tennis Court', xwalkId: '', description: '', children: [
    { id: 'wbs_32F_00', code: '32F.00', name: 'Tennis', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_00_00', code: '32F.00.00', name: 'Tennis - Turnkey', xwalkId: '3255', description: '', children: [] }
    ] },
    { id: 'wbs_32F_01', code: '32F.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_01_01', code: '32F.01.01', name: 'Mobilization', xwalkId: '3256', description: '', children: [] },
      { id: 'wbs_32F_01_02', code: '32F.01.02', name: 'Bond/Permit', xwalkId: '3257', description: '', children: [] },
      { id: 'wbs_32F_01_03', code: '32F.01.03', name: 'Submittals', xwalkId: '3258', description: '', children: [] },
      { id: 'wbs_32F_01_04', code: '32F.01.04', name: 'Equip Rentals', xwalkId: '3259', description: '', children: [] },
      { id: 'wbs_32F_01_05', code: '32F.01.05', name: 'Supervision', xwalkId: '3260', description: '', children: [] },
      { id: 'wbs_32F_01_06', code: '32F.01.06', name: 'Demobilization', xwalkId: '3261', description: '', children: [] },
      { id: 'wbs_32F_01_07', code: '32F.01.07', name: 'Close-Out', xwalkId: '3262', description: '', children: [] },
      { id: 'wbs_32F_01_09', code: '32F.01.09', name: 'Cleaning', xwalkId: '3263', description: '', children: [] },
      { id: 'wbs_32F_01_13', code: '32F.01.13', name: 'Testing', xwalkId: '3264', description: '', children: [] },
      { id: 'wbs_32F_01_14', code: '32F.01.14', name: 'Survey & Layout', xwalkId: '3265', description: '', children: [] }
    ] },
    { id: 'wbs_32F_02', code: '32F.02', name: 'Demolition - Tennis Court', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_02_01', code: '32F.02.01', name: 'Demolition of Tennis Court', xwalkId: '3266', description: '', children: [] },
      { id: 'wbs_32F_02_02', code: '32F.02.02', name: 'Demolition of Tennis Court Equipment', xwalkId: '3267', description: '', children: [] },
      { id: 'wbs_32F_02_03', code: '32F.02.03', name: 'Demolition of Tennis Court Fence & Gates', xwalkId: '3268', description: '', children: [] },
      { id: 'wbs_32F_02_04', code: '32F.02.04', name: 'Repair/Re-surface Tennis Court', xwalkId: '3269', description: '', children: [] }
    ] },
    { id: 'wbs_32F_03', code: '32F.03', name: 'Tennis Court System', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_03_01', code: '32F.03.01', name: 'Laser Grading & Base Compaction - Tennis Court', xwalkId: '3270', description: '', children: [] },
      { id: 'wbs_32F_03_02', code: '32F.03.02', name: 'Subgrade Stabilization - Tennis Court', xwalkId: '3271', description: '', children: [] },
      { id: 'wbs_32F_03_03', code: '32F.03.03', name: 'Base Materials - Tennis Court', xwalkId: '3272', description: '', children: [] },
      { id: 'wbs_32F_03_04', code: '32F.03.04', name: 'Topsoil (Root Zone) - Tennis Court', xwalkId: '3273', description: '', children: [] },
      { id: 'wbs_32F_03_05', code: '32F.03.05', name: 'Post Tension Concrete - Tennis Court', xwalkId: '3274', description: '', children: [] },
      { id: 'wbs_32F_03_06', code: '32F.03.06', name: 'Synthetic Surface - Tennis Court', xwalkId: '3275', description: '', children: [] },
      { id: 'wbs_32F_03_07', code: '32F.03.07', name: 'Surface Coating - Tennis Court', xwalkId: '3276', description: '', children: [] },
      { id: 'wbs_32F_03_08', code: '32F.03.08', name: 'Sod/Natural Surfacing - Tennis Court', xwalkId: '3277', description: '', children: [] },
      { id: 'wbs_32F_03_09', code: '32F.03.09', name: 'Lines & Striping - Tennis Court', xwalkId: '3278', description: '', children: [] },
      { id: 'wbs_32F_03_10', code: '32F.03.10', name: 'Subdrainage System - Tennis Court', xwalkId: '3279', description: '', children: [] },
      { id: 'wbs_32F_03_11', code: '32F.03.11', name: 'Irrigation System - Tennis Court', xwalkId: '3280', description: '', children: [] }
    ] },
    { id: 'wbs_32F_04', code: '32F.04', name: 'Tennis Court Equipment & Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_04_01', code: '32F.04.01', name: 'Tennis Net Post', xwalkId: '3281', description: '', children: [] },
      { id: 'wbs_32F_04_02', code: '32F.04.02', name: 'Tennis Nets', xwalkId: '3282', description: '', children: [] },
      { id: 'wbs_32F_04_03', code: '32F.04.03', name: 'Tennis Umpire Chair', xwalkId: '3283', description: '', children: [] },
      { id: 'wbs_32F_04_04', code: '32F.04.04', name: 'Tennis Beat Walls/Wall Pads', xwalkId: '3284', description: '', children: [] },
      { id: 'wbs_32F_04_05', code: '32F.04.05', name: 'Tennis Player Benches', xwalkId: '3285', description: '', children: [] },
      { id: 'wbs_32F_04_06', code: '32F.04.06', name: 'Tennis Scoreboard', xwalkId: '3286', description: '', children: [] }
    ] },
    { id: 'wbs_32F_05', code: '32F.05', name: 'Tennis Court Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32F_05_00', code: '32F.05.00', name: 'Fence & Windscreen - Tennis Court', xwalkId: '3287', description: '', children: [] },
      { id: 'wbs_32F_05_01', code: '32F.05.01', name: 'Fence - Tennis Court', xwalkId: '3288', description: '', children: [] },
      { id: 'wbs_32F_05_02', code: '32F.05.02', name: 'Fence Gate - Tennis Court', xwalkId: '3289', description: '', children: [] },
      { id: 'wbs_32F_05_03', code: '32F.05.03', name: 'Windscreen - Tennis Court', xwalkId: '3290', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32G', code: '32G', name: 'Fencing', xwalkId: '', description: '', children: [
    { id: 'wbs_32G_01', code: '32G.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_01_01', code: '32G.01.01', name: 'Mobilization', xwalkId: '3291', description: '', children: [] },
      { id: 'wbs_32G_01_02', code: '32G.01.02', name: 'Bond/Permit', xwalkId: '3292', description: '', children: [] },
      { id: 'wbs_32G_01_03', code: '32G.01.03', name: 'Submittals', xwalkId: '3293', description: '', children: [] },
      { id: 'wbs_32G_01_05', code: '32G.01.05', name: 'Supervision', xwalkId: '3294', description: '', children: [] },
      { id: 'wbs_32G_01_06', code: '32G.01.06', name: 'Demobilization', xwalkId: '3295', description: '', children: [] },
      { id: 'wbs_32G_01_07', code: '32G.01.07', name: 'Close-Out', xwalkId: '3296', description: '', children: [] },
      { id: 'wbs_32G_01_09', code: '32G.01.09', name: 'Cleaning', xwalkId: '3297', description: '', children: [] }
    ] },
    { id: 'wbs_32G_02', code: '32G.02', name: 'Chain-link Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_02_01', code: '32G.02.01', name: 'Chain-link Fence', xwalkId: '3298', description: '', children: [] },
      { id: 'wbs_32G_02_02', code: '32G.02.02', name: 'Chain-link Fence Single Gate', xwalkId: '3299', description: '', children: [] },
      { id: 'wbs_32G_02_03', code: '32G.02.03', name: 'Chain-link Fence Double Gate', xwalkId: '3300', description: '', children: [] },
      { id: 'wbs_32G_02_04', code: '32G.02.04', name: 'Chain-link Fence w/ Privacy Slats', xwalkId: '3301', description: '', children: [] },
      { id: 'wbs_32G_02_05', code: '32G.02.05', name: 'Chain-link Fence w/ Privacy Slats - Single Gate', xwalkId: '3302', description: '', children: [] },
      { id: 'wbs_32G_02_06', code: '32G.02.06', name: 'Chain-link Fence w/ Privacy Slats - Double Gate', xwalkId: '3303', description: '', children: [] },
      { id: 'wbs_32G_02_07', code: '32G.02.07', name: 'Security Fence', xwalkId: '3304', description: '', children: [] },
      { id: 'wbs_32G_02_08', code: '32G.02.08', name: 'Security Fence Single Gate', xwalkId: '3305', description: '', children: [] },
      { id: 'wbs_32G_02_09', code: '32G.02.09', name: 'Security Fence Double Gate', xwalkId: '3306', description: '', children: [] }
    ] },
    { id: 'wbs_32G_03', code: '32G.03', name: 'Decorative Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_03_01', code: '32G.03.01', name: 'Ornamental Fence', xwalkId: '3307', description: '', children: [] },
      { id: 'wbs_32G_03_02', code: '32G.03.02', name: 'Ornamental Fence Single Gate', xwalkId: '3308', description: '', children: [] },
      { id: 'wbs_32G_03_03', code: '32G.03.03', name: 'Ornamental Fence Double Gate', xwalkId: '3309', description: '', children: [] },
      { id: 'wbs_32G_03_04', code: '32G.03.04', name: 'Ornamental Rolling Gate', xwalkId: '3310', description: '', children: [] },
      { id: 'wbs_32G_03_05', code: '32G.03.05', name: 'Remove & Relocate - Ornamental Gate', xwalkId: '3311', description: '', children: [] }
    ] },
    { id: 'wbs_32G_04', code: '32G.04', name: 'Wooden Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_04_01', code: '32G.04.01', name: 'Wooden Fence', xwalkId: '3312', description: '', children: [] },
      { id: 'wbs_32G_04_02', code: '32G.04.02', name: 'Wooden Fence Single Gate', xwalkId: '3313', description: '', children: [] },
      { id: 'wbs_32G_04_03', code: '32G.04.03', name: 'Wooden Fence Double Gate', xwalkId: '3314', description: '', children: [] }
    ] },
    { id: 'wbs_32G_05', code: '32G.05', name: 'Wire Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_05_01', code: '32G.05.01', name: 'Wire Fence', xwalkId: '3315', description: '', children: [] },
      { id: 'wbs_32G_05_02', code: '32G.05.02', name: 'Wire Fence Single Gate', xwalkId: '3316', description: '', children: [] },
      { id: 'wbs_32G_05_03', code: '32G.05.03', name: 'Wire Fence Double Gate', xwalkId: '3317', description: '', children: [] }
    ] },
    { id: 'wbs_32G_06', code: '32G.06', name: 'Metal Panel Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_06_01', code: '32G.06.01', name: 'Metal Panel Fence', xwalkId: '3318', description: '', children: [] },
      { id: 'wbs_32G_06_02', code: '32G.06.02', name: 'Metal Panel Fence Single Gate', xwalkId: '3319', description: '', children: [] },
      { id: 'wbs_32G_06_03', code: '32G.06.03', name: 'Metal Panel Fence Double Gate', xwalkId: '3320', description: '', children: [] }
    ] },
    { id: 'wbs_32G_07', code: '32G.07', name: 'Interior Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_07_01', code: '32G.07.01', name: 'Interior Fence', xwalkId: '3321', description: '', children: [] },
      { id: 'wbs_32G_07_02', code: '32G.07.02', name: 'Interior Fence Single Gate', xwalkId: '3322', description: '', children: [] },
      { id: 'wbs_32G_07_03', code: '32G.07.03', name: 'Interior Fence Double Gate', xwalkId: '3323', description: '', children: [] }
    ] },
    { id: 'wbs_32G_08', code: '32G.08', name: 'Fence & Gate Concrete', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_08_01', code: '32G.08.01', name: 'Fence & Gate Post Footing', xwalkId: '3324', description: '', children: [] }
    ] },
    { id: 'wbs_32G_09', code: '32G.09', name: 'Site Gates & Hardware', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_09_01', code: '32G.09.01', name: 'Sliding Gates', xwalkId: '3325', description: '', children: [] },
      { id: 'wbs_32G_09_02', code: '32G.09.02', name: 'Vehicular Gates', xwalkId: '3326', description: '', children: [] },
      { id: 'wbs_32G_09_03', code: '32G.09.03', name: 'Traffic Gates', xwalkId: '3327', description: '', children: [] },
      { id: 'wbs_32G_09_04', code: '32G.09.04', name: 'Dumpster Gates', xwalkId: '3328', description: '', children: [] },
      { id: 'wbs_32G_09_05', code: '32G.09.05', name: 'Pedestrian Gates', xwalkId: '3329', description: '', children: [] },
      { id: 'wbs_32G_09_06', code: '32G.09.06', name: 'Access Control Gates', xwalkId: '3330', description: '', children: [] },
      { id: 'wbs_32G_09_07', code: '32G.09.07', name: 'Gate Operators', xwalkId: '3331', description: '', children: [] },
      { id: 'wbs_32G_09_08', code: '32G.09.08', name: 'Site Gate Panic Hardware', xwalkId: '3332', description: '', children: [] }
    ] },
    { id: 'wbs_32G_10', code: '32G.10', name: 'Off-Site Fence & Gates', xwalkId: '', description: '', children: [
      { id: 'wbs_32G_10_01', code: '32G.10.01', name: 'Off-Site Fence', xwalkId: '3333', description: '', children: [] },
      { id: 'wbs_32G_10_02', code: '32G.10.02', name: 'Off-Site Fence Single Gate', xwalkId: '3334', description: '', children: [] },
      { id: 'wbs_32G_10_03', code: '32G.10.03', name: 'Off-Site Fence Double Gate', xwalkId: '3335', description: '', children: [] },
      { id: 'wbs_32G_10_04', code: '32G.10.04', name: 'Off-Site Fence & Gate Post Footing', xwalkId: '3336', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32H', code: '32H', name: 'Retaining Walls', xwalkId: '', description: '', children: [
    { id: 'wbs_32H_01', code: '32H.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32H_01_01', code: '32H.01.01', name: 'Mobilization', xwalkId: '3337', description: '', children: [] },
      { id: 'wbs_32H_01_02', code: '32H.01.02', name: 'Bond/Permit', xwalkId: '3338', description: '', children: [] },
      { id: 'wbs_32H_01_03', code: '32H.01.03', name: 'Submittals', xwalkId: '3339', description: '', children: [] },
      { id: 'wbs_32H_01_04', code: '32H.01.04', name: 'Equip Rentals', xwalkId: '3340', description: '', children: [] },
      { id: 'wbs_32H_01_05', code: '32H.01.05', name: 'Supervision', xwalkId: '3341', description: '', children: [] },
      { id: 'wbs_32H_01_06', code: '32H.01.06', name: 'Demobilization', xwalkId: '3342', description: '', children: [] },
      { id: 'wbs_32H_01_07', code: '32H.01.07', name: 'Close-Out', xwalkId: '3343', description: '', children: [] },
      { id: 'wbs_32H_01_09', code: '32H.01.09', name: 'Cleaning', xwalkId: '3344', description: '', children: [] },
      { id: 'wbs_32H_01_13', code: '32H.01.13', name: 'Testing', xwalkId: '3345', description: '', children: [] },
      { id: 'wbs_32H_01_14', code: '32H.01.14', name: 'Survey & Layout', xwalkId: '3346', description: '', children: [] },
      { id: 'wbs_32H_01_15', code: '32H.01.15', name: 'Dewatering', xwalkId: '3347', description: '', children: [] }
    ] },
    { id: 'wbs_32H_02', code: '32H.02', name: 'Retaining Wall Structures', xwalkId: '', description: '', children: [
      { id: 'wbs_32H_02_10', code: '32H.02.10', name: 'Precast Concrete Retaining Walls', xwalkId: '3348', description: '', children: [] },
      { id: 'wbs_32H_02_20', code: '32H.02.20', name: 'Segmental Retaining Walls', xwalkId: '3349', description: '', children: [] },
      { id: 'wbs_32H_02_30', code: '32H.02.30', name: 'Metal Crib Retaining Walls', xwalkId: '3350', description: '', children: [] },
      { id: 'wbs_32H_02_40', code: '32H.02.40', name: 'Gabion Retaining Walls', xwalkId: '3351', description: '', children: [] },
      { id: 'wbs_32H_02_50', code: '32H.02.50', name: 'Stone Retaining Walls', xwalkId: '3352', description: '', children: [] },
      { id: 'wbs_32H_02_60', code: '32H.02.60', name: 'Retaining Wall Leveling Pad', xwalkId: '3353', description: '', children: [] }
    ] },
    { id: 'wbs_32H_03', code: '32H.03', name: 'Retaining Wall Drainage', xwalkId: '', description: '', children: [
      { id: 'wbs_32H_03_10', code: '32H.03.10', name: 'Retaining Wall Drain System', xwalkId: '3354', description: '', children: [] },
      { id: 'wbs_32H_03_20', code: '32H.03.20', name: 'Retaining Wall Filter Fabric', xwalkId: '3355', description: '', children: [] }
    ] },
    { id: 'wbs_32H_04', code: '32H.04', name: 'Retaining Wall Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32H_04_10', code: '32H.04.10', name: 'Shoring & Slope Protection', xwalkId: '3356', description: '', children: [] },
      { id: 'wbs_32H_04_20', code: '32H.04.20', name: 'Retaining Wall Stone Cap/Coping', xwalkId: '3357', description: '', children: [] },
      { id: 'wbs_32H_04_30', code: '32H.04.30', name: 'Traffic Guard/Fence Sleeves', xwalkId: '3358', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32I', code: '32I', name: 'Site Furnishing', xwalkId: '', description: '', children: [
    { id: 'wbs_32I_01', code: '32I.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32I_01_01', code: '32I.01.01', name: 'Mobilization', xwalkId: '3359', description: '', children: [] },
      { id: 'wbs_32I_01_02', code: '32I.01.02', name: 'Bond/Permit', xwalkId: '3360', description: '', children: [] },
      { id: 'wbs_32I_01_03', code: '32I.01.03', name: 'Submittals', xwalkId: '3361', description: '', children: [] },
      { id: 'wbs_32I_01_06', code: '32I.01.06', name: 'Demobilization', xwalkId: '3362', description: '', children: [] },
      { id: 'wbs_32I_01_07', code: '32I.01.07', name: 'Close-Out', xwalkId: '3363', description: '', children: [] },
      { id: 'wbs_32I_01_09', code: '32I.01.09', name: 'Cleaning', xwalkId: '3364', description: '', children: [] }
    ] },
    { id: 'wbs_32I_02', code: '32I.02', name: 'Bike Racks', xwalkId: '', description: '', children: [
      { id: 'wbs_32I_02_01', code: '32I.02.01', name: 'Bike/Bicycle Racks', xwalkId: '3365', description: '', children: [] },
      { id: 'wbs_32I_02_02', code: '32I.02.02', name: 'Bike/Bicycle Lockers', xwalkId: '3366', description: '', children: [] },
      { id: 'wbs_32I_02_03', code: '32I.02.03', name: 'Bike/Bicycle Shelters', xwalkId: '3367', description: '', children: [] }
    ] },
    { id: 'wbs_32I_03', code: '32I.03', name: 'Site Furniture', xwalkId: '', description: '', children: [
      { id: 'wbs_32I_03_01', code: '32I.03.01', name: 'Site Benches', xwalkId: '3368', description: '', children: [] },
      { id: 'wbs_32I_03_02', code: '32I.03.02', name: 'Site Tables', xwalkId: '3369', description: '', children: [] },
      { id: 'wbs_32I_03_03', code: '32I.03.03', name: 'Site Chairs', xwalkId: '3370', description: '', children: [] },
      { id: 'wbs_32I_03_04', code: '32I.03.04', name: 'Site Sofa Seatings', xwalkId: '3371', description: '', children: [] },
      { id: 'wbs_32I_03_05', code: '32I.03.05', name: 'Site Sunshades (Umbrellas)', xwalkId: '3372', description: '', children: [] },
      { id: 'wbs_32I_03_06', code: '32I.03.06', name: 'Trash Receptacles', xwalkId: '3373', description: '', children: [] },
      { id: 'wbs_32I_03_07', code: '32I.03.07', name: 'Site Table and Chairs', xwalkId: '3374', description: '', children: [] },
      { id: 'wbs_32I_03_08', code: '32I.03.08', name: 'Site Furniture (Install Only)', xwalkId: '3375', description: '', children: [] }
    ] },
    { id: 'wbs_32I_04', code: '32I.04', name: 'Site Specialties', xwalkId: '', description: '', children: [
      { id: 'wbs_32I_04_01', code: '32I.04.01', name: 'Decorative Bollards', xwalkId: '3376', description: '', children: [] },
      { id: 'wbs_32I_04_02', code: '32I.04.02', name: 'Decorative Site Fountains', xwalkId: '3377', description: '', children: [] },
      { id: 'wbs_32I_04_03', code: '32I.04.03', name: 'Manufactured Site Planters', xwalkId: '3378', description: '', children: [] },
      { id: 'wbs_32I_04_04', code: '32I.04.04', name: 'Manufactured Site Statues', xwalkId: '3379', description: '', children: [] }
    ] },
    { id: 'wbs_32I_05', code: '32I.05', name: 'Site Equipment', xwalkId: '', description: '', children: [
      { id: 'wbs_32I_05_01', code: '32I.05.01', name: 'Manufactured Fire Pits', xwalkId: '3380', description: '', children: [] },
      { id: 'wbs_32I_05_02', code: '32I.05.02', name: 'Grill & BBQ Stations', xwalkId: '3381', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32J', code: '32J', name: 'Landscape & Irrigation', xwalkId: '', description: '', children: [
    { id: 'wbs_32J_01', code: '32J.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_01_01', code: '32J.01.01', name: 'Mobilization', xwalkId: '3382', description: '', children: [] },
      { id: 'wbs_32J_01_02', code: '32J.01.02', name: 'Bond/Permit', xwalkId: '3383', description: '', children: [] },
      { id: 'wbs_32J_01_03', code: '32J.01.03', name: 'Submittals', xwalkId: '3384', description: '', children: [] },
      { id: 'wbs_32J_01_07', code: '32J.01.07', name: 'Close-Out', xwalkId: '3385', description: '', children: [] },
      { id: 'wbs_32J_01_09', code: '32J.01.09', name: 'Cleaning', xwalkId: '3386', description: '', children: [] },
      { id: 'wbs_32J_01_10', code: '32J.01.10', name: 'Mockup', xwalkId: '3387', description: '', children: [] },
      { id: 'wbs_32J_01_13', code: '32J.01.13', name: 'Testing', xwalkId: '3388', description: '', children: [] },
      { id: 'wbs_32J_01_14', code: '32J.01.14', name: 'Survey & Layout', xwalkId: '3389', description: '', children: [] },
      { id: 'wbs_32J_01_18', code: '32J.01.18', name: 'Tree Protection', xwalkId: '3390', description: '', children: [] }
    ] },
    { id: 'wbs_32J_02', code: '32J.02', name: 'Landscape Planting', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_02_01', code: '32J.02.01', name: 'Ground Cover Plants', xwalkId: '3391', description: '', children: [] },
      { id: 'wbs_32J_02_02', code: '32J.02.02', name: 'Plants & Bulbs', xwalkId: '3392', description: '', children: [] },
      { id: 'wbs_32J_02_03', code: '32J.02.03', name: 'Shrubs', xwalkId: '3393', description: '', children: [] },
      { id: 'wbs_32J_02_04', code: '32J.02.04', name: 'Trees', xwalkId: '3394', description: '', children: [] },
      { id: 'wbs_32J_02_05', code: '32J.02.05', name: 'Exterior Artificial Planting', xwalkId: '3395', description: '', children: [] }
    ] },
    { id: 'wbs_32J_03', code: '32J.03', name: 'Landscape Soil Preparation', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_03_01', code: '32J.03.01', name: 'Mulching', xwalkId: '3396', description: '', children: [] },
      { id: 'wbs_32J_03_02', code: '32J.03.02', name: 'Planting Soil Mix', xwalkId: '3397', description: '', children: [] },
      { id: 'wbs_32J_03_03', code: '32J.03.03', name: 'Landscape Topsoil', xwalkId: '3398', description: '', children: [] },
      { id: 'wbs_32J_03_04', code: '32J.03.04', name: 'Landscape Final Grading', xwalkId: '3399', description: '', children: [] }
    ] },
    { id: 'wbs_32J_04', code: '32J.04', name: 'Landscape Turf & Grasses', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_04_01', code: '32J.04.01', name: 'Hydro-Mulch', xwalkId: '3400', description: '', children: [] },
      { id: 'wbs_32J_04_02', code: '32J.04.02', name: 'Hydroseeding', xwalkId: '3401', description: '', children: [] },
      { id: 'wbs_32J_04_03', code: '32J.04.03', name: 'Seeding', xwalkId: '3402', description: '', children: [] },
      { id: 'wbs_32J_04_04', code: '32J.04.04', name: 'Sodding', xwalkId: '3403', description: '', children: [] },
      { id: 'wbs_32J_04_05', code: '32J.04.05', name: 'Sprigging', xwalkId: '3404', description: '', children: [] }
    ] },
    { id: 'wbs_32J_05', code: '32J.05', name: 'Landscape Natural & Chemical Treatments', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_05_01', code: '32J.05.01', name: 'Fertilizers', xwalkId: '3405', description: '', children: [] },
      { id: 'wbs_32J_05_02', code: '32J.05.02', name: 'Compost/Natural Fertilizers', xwalkId: '3406', description: '', children: [] },
      { id: 'wbs_32J_05_03', code: '32J.05.03', name: 'Herbicides', xwalkId: '3407', description: '', children: [] },
      { id: 'wbs_32J_05_04', code: '32J.05.04', name: 'Pesticides', xwalkId: '3408', description: '', children: [] }
    ] },
    { id: 'wbs_32J_06', code: '32J.06', name: 'Landscape Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_06_01', code: '32J.06.01', name: 'Green Screen (Landscape)', xwalkId: '3409', description: '', children: [] },
      { id: 'wbs_32J_06_02', code: '32J.06.02', name: 'Landscape Edging', xwalkId: '3410', description: '', children: [] },
      { id: 'wbs_32J_06_03', code: '32J.06.03', name: 'Tree Grates', xwalkId: '3411', description: '', children: [] },
      { id: 'wbs_32J_06_04', code: '32J.06.04', name: 'Plant Support Structures', xwalkId: '3412', description: '', children: [] },
      { id: 'wbs_32J_06_05', code: '32J.06.05', name: 'Weed Barrier Fabric', xwalkId: '3413', description: '', children: [] }
    ] },
    { id: 'wbs_32J_07', code: '32J.07', name: 'Landscape Transplanting', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_07_01', code: '32J.07.01', name: 'Transplanting - Ground Cover', xwalkId: '3414', description: '', children: [] },
      { id: 'wbs_32J_07_02', code: '32J.07.02', name: 'Transplanting - Plants', xwalkId: '3415', description: '', children: [] },
      { id: 'wbs_32J_07_03', code: '32J.07.03', name: 'Transplanting - Shrubs', xwalkId: '3416', description: '', children: [] },
      { id: 'wbs_32J_07_04', code: '32J.07.04', name: 'Transplanting - Trees', xwalkId: '3417', description: '', children: [] }
    ] },
    { id: 'wbs_32J_08', code: '32J.08', name: 'Landscape Stone Surfacing & Rocks', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_08_01', code: '32J.08.01', name: 'Rock Rip-Rap (Landscape)', xwalkId: '3418', description: '', children: [] },
      { id: 'wbs_32J_08_02', code: '32J.08.02', name: 'Gravels (Landscape)', xwalkId: '3419', description: '', children: [] },
      { id: 'wbs_32J_08_03', code: '32J.08.03', name: 'Decomposed Granite', xwalkId: '3420', description: '', children: [] },
      { id: 'wbs_32J_08_04', code: '32J.08.04', name: 'Boulders', xwalkId: '3421', description: '', children: [] },
      { id: 'wbs_32J_08_05', code: '32J.08.05', name: 'Limestone Blocks', xwalkId: '3422', description: '', children: [] },
      { id: 'wbs_32J_08_06', code: '32J.08.06', name: 'Stone Benches', xwalkId: '3423', description: '', children: [] }
    ] },
    { id: 'wbs_32J_09', code: '32J.09', name: 'Irrigation', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_09_01', code: '32J.09.01', name: 'Irrigation Systems', xwalkId: '3424', description: '', children: [] },
      { id: 'wbs_32J_09_02', code: '32J.09.02', name: 'Irrigation Components', xwalkId: '3425', description: '', children: [] },
      { id: 'wbs_32J_09_03', code: '32J.09.03', name: 'Irrigation Sleeves', xwalkId: '3426', description: '', children: [] },
      { id: 'wbs_32J_09_04', code: '32J.09.04', name: 'Irrigation Water Meter', xwalkId: '3427', description: '', children: [] },
      { id: 'wbs_32J_09_05', code: '32J.09.05', name: 'Irrigation Pumps', xwalkId: '3428', description: '', children: [] },
      { id: 'wbs_32J_09_06', code: '32J.09.06', name: 'Temporary Irrigation & Watering', xwalkId: '3429', description: '', children: [] }
    ] },
    { id: 'wbs_32J_10', code: '32J.10', name: 'Landscape & Irrigation Maintenance & Repair', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_10_01', code: '32J.10.01', name: 'Landscape Maintenance', xwalkId: '3430', description: '', children: [] },
      { id: 'wbs_32J_10_02', code: '32J.10.02', name: 'Landscape Repair', xwalkId: '3431', description: '', children: [] },
      { id: 'wbs_32J_10_03', code: '32J.10.03', name: 'Irrigation Maintenance', xwalkId: '3432', description: '', children: [] }
    ] },
    { id: 'wbs_32J_11', code: '32J.11', name: 'Landscape Off-site', xwalkId: '', description: '', children: [
      { id: 'wbs_32J_11_01', code: '32J.11.01', name: 'Offsite Landscape Planting', xwalkId: '3433', description: '', children: [] },
      { id: 'wbs_32J_11_02', code: '32J.11.02', name: 'Offsite Landscape Accessories', xwalkId: '3434', description: '', children: [] },
      { id: 'wbs_32J_11_03', code: '32J.11.03', name: 'Offsite Natural Stone Surfacing & Rocks', xwalkId: '3435', description: '', children: [] },
      { id: 'wbs_32J_11_04', code: '32J.11.04', name: 'Offsite Irrigation Systems', xwalkId: '3436', description: '', children: [] },
      { id: 'wbs_32J_11_05', code: '32J.11.05', name: 'Offsite Landscape Maintenance & Repair', xwalkId: '3437', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32K', code: '32K', name: 'Recreational Surfacing', xwalkId: '', description: '', children: [
    { id: 'wbs_32K_01', code: '32K.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32K_01_01', code: '32K.01.01', name: 'Mobilization', xwalkId: '3438', description: '', children: [] },
      { id: 'wbs_32K_01_02', code: '32K.01.02', name: 'Bond/Permit', xwalkId: '3439', description: '', children: [] },
      { id: 'wbs_32K_01_03', code: '32K.01.03', name: 'Submittals', xwalkId: '3440', description: '', children: [] },
      { id: 'wbs_32K_01_05', code: '32K.01.05', name: 'Supervision', xwalkId: '3441', description: '', children: [] },
      { id: 'wbs_32K_01_07', code: '32K.01.07', name: 'Close-Out', xwalkId: '3442', description: '', children: [] }
    ] },
    { id: 'wbs_32K_02', code: '32K.02', name: 'Demolition - Recreational Surfacing', xwalkId: '', description: '', children: [
      { id: 'wbs_32K_02_01', code: '32K.02.01', name: 'Removal of Non-Athletic Turf', xwalkId: '3443', description: '', children: [] },
      { id: 'wbs_32K_02_02', code: '32K.02.02', name: 'Removal of Synthetic/Resilient Protective Surfacing', xwalkId: '3444', description: '', children: [] },
      { id: 'wbs_32K_02_03', code: '32K.02.03', name: 'Relocation/Repair of Recreational Surfaces', xwalkId: '3445', description: '', children: [] }
    ] },
    { id: 'wbs_32K_03', code: '32K.03', name: 'Non-Athletic Artificial Turf', xwalkId: '', description: '', children: [
      { id: 'wbs_32K_03_01', code: '32K.03.01', name: 'Subdrainage System - Non-Athletic Turf', xwalkId: '3446', description: '', children: [] },
      { id: 'wbs_32K_03_02', code: '32K.03.02', name: 'Grading & Base Compaction - Non-Athletic Turf', xwalkId: '3447', description: '', children: [] },
      { id: 'wbs_32K_03_03', code: '32K.03.03', name: 'Geosynthetic Layer - Non-Athletic Turf', xwalkId: '3448', description: '', children: [] },
      { id: 'wbs_32K_03_04', code: '32K.03.04', name: 'Base Materials/Infill Materials - Non-Athletic Turf', xwalkId: '3449', description: '', children: [] },
      { id: 'wbs_32K_03_05', code: '32K.03.05', name: 'Non-Athletic Synthetic Turf', xwalkId: '3450', description: '', children: [] },
      { id: 'wbs_32K_03_06', code: '32K.03.06', name: 'Wood Nailer/Perimeter Boards - Non-Athletic Turf', xwalkId: '3451', description: '', children: [] }
    ] },
    { id: 'wbs_32K_04', code: '32K.04', name: 'Playground Protective Surfacing', xwalkId: '', description: '', children: [
      { id: 'wbs_32K_04_00', code: '32K.04.00', name: 'Playground Protective Surfacing (Turnkey)', xwalkId: '3452', description: '', children: [] },
      { id: 'wbs_32K_04_01', code: '32K.04.01', name: 'Base Materials - Playground Protective Surfacing', xwalkId: '3453', description: '', children: [] },
      { id: 'wbs_32K_04_02', code: '32K.04.02', name: 'Synthetic/Resilient Protective Surfacing', xwalkId: '3454', description: '', children: [] },
      { id: 'wbs_32K_04_03', code: '32K.04.03', name: 'Containment Curbs', xwalkId: '3455', description: '', children: [] }
    ] },
    { id: 'wbs_32K_05', code: '32K.05', name: 'Playground Loose Fill', xwalkId: '', description: '', children: [
      { id: 'wbs_32K_05_01', code: '32K.05.01', name: 'Playground Loose In-Fill Materials', xwalkId: '3456', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_32L', code: '32L', name: 'Roller Compacted Concrete', xwalkId: '', description: '', children: [
    { id: 'wbs_32L_01', code: '32L.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_32L_01_01', code: '32L.01.01', name: 'Mobilization', xwalkId: '3457', description: '', children: [] },
      { id: 'wbs_32L_01_02', code: '32L.01.02', name: 'Bond/Permit', xwalkId: '3458', description: '', children: [] },
      { id: 'wbs_32L_01_03', code: '32L.01.03', name: 'Submittals', xwalkId: '3459', description: '', children: [] },
      { id: 'wbs_32L_01_04', code: '32L.01.04', name: 'Equip Rentals', xwalkId: '3460', description: '', children: [] },
      { id: 'wbs_32L_01_07', code: '32L.01.07', name: 'Close-Out', xwalkId: '3461', description: '', children: [] },
      { id: 'wbs_32L_01_09', code: '32L.01.09', name: 'Cleaning', xwalkId: '3462', description: '', children: [] },
      { id: 'wbs_32L_01_13', code: '32L.01.13', name: 'Testing', xwalkId: '3463', description: '', children: [] },
      { id: 'wbs_32L_01_14', code: '32L.01.14', name: 'Survey & Layout', xwalkId: '3464', description: '', children: [] }
    ] },
    { id: 'wbs_32L_02', code: '32L.02', name: 'Roller Compacted Concrete (RCC) Pavements', xwalkId: '', description: '', children: [
      { id: 'wbs_32L_02_00', code: '32L.02.00', name: 'RCC Paving', xwalkId: '3465', description: '', children: [] },
      { id: 'wbs_32L_02_05', code: '32L.02.05', name: 'RCC Paving - 05"', xwalkId: '3466', description: '', children: [] },
      { id: 'wbs_32L_02_06', code: '32L.02.06', name: 'RCC Paving - 06"', xwalkId: '3467', description: '', children: [] },
      { id: 'wbs_32L_02_07', code: '32L.02.07', name: 'RCC Paving - 07"', xwalkId: '3468', description: '', children: [] },
      { id: 'wbs_32L_02_08', code: '32L.02.08', name: 'RCC Paving - 08"', xwalkId: '3469', description: '', children: [] },
      { id: 'wbs_32L_02_09', code: '32L.02.09', name: 'RCC Paving - 09"', xwalkId: '3470', description: '', children: [] },
      { id: 'wbs_32L_02_10', code: '32L.02.10', name: 'RCC Paving - 10"', xwalkId: '3471', description: '', children: [] },
      { id: 'wbs_32L_02_11', code: '32L.02.11', name: 'RCC Paving - 11"', xwalkId: '3472', description: '', children: [] },
      { id: 'wbs_32L_02_12', code: '32L.02.12', name: 'RCC Paving - 12"', xwalkId: '3473', description: '', children: [] },
      { id: 'wbs_32L_02_13', code: '32L.02.13', name: 'RCC Paving - 13"', xwalkId: '3474', description: '', children: [] },
      { id: 'wbs_32L_02_14', code: '32L.02.14', name: 'RCC Paving - 14"', xwalkId: '3475', description: '', children: [] },
      { id: 'wbs_32L_02_15', code: '32L.02.15', name: 'RCC Paving - 15"', xwalkId: '3476', description: '', children: [] },
      { id: 'wbs_32L_02_16', code: '32L.02.16', name: 'RCC Paving - 16"', xwalkId: '3477', description: '', children: [] },
      { id: 'wbs_32L_02_17', code: '32L.02.17', name: 'RCC Paving - 17"', xwalkId: '3478', description: '', children: [] },
      { id: 'wbs_32L_02_18', code: '32L.02.18', name: 'RCC Paving - 18"', xwalkId: '3479', description: '', children: [] }
    ] },
    { id: 'wbs_32L_03', code: '32L.03', name: 'Conventional Concrete @ RCC Pavements', xwalkId: '', description: '', children: [
      { id: 'wbs_32L_03_10', code: '32L.03.10', name: 'RCC Paving - Block out & Pour Back', xwalkId: '3480', description: '', children: [] },
      { id: 'wbs_32L_03_20', code: '32L.03.20', name: 'Joint Reinforced Concrete (JRC) Paving', xwalkId: '3481', description: '', children: [] },
      { id: 'wbs_32L_03_30', code: '32L.03.30', name: 'Dolly Pads @ RCC Pavements', xwalkId: '3482', description: '', children: [] }
    ] },
    { id: 'wbs_32L_04', code: '32L.04', name: 'Joints in RCC Pavements', xwalkId: '', description: '', children: [
      { id: 'wbs_32L_04_10', code: '32L.04.10', name: 'RCC Paving Sawcut - Control Joints', xwalkId: '3483', description: '', children: [] },
      { id: 'wbs_32L_04_20', code: '32L.04.20', name: 'RCC Paving Sawcut - Construction Joints', xwalkId: '3484', description: '', children: [] },
      { id: 'wbs_32L_04_30', code: '32L.04.30', name: 'RCC Paving Joints - Dowels & Baskets', xwalkId: '3485', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_33A', code: '33A', name: 'Site Utilities', xwalkId: '', description: '', children: [
    { id: 'wbs_33A_01', code: '33A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_01_01', code: '33A.01.01', name: 'Mobilization', xwalkId: '3486', description: '', children: [] },
      { id: 'wbs_33A_01_02', code: '33A.01.02', name: 'Bond/Permit', xwalkId: '3487', description: '', children: [] },
      { id: 'wbs_33A_01_03', code: '33A.01.03', name: 'Submittals', xwalkId: '3488', description: '', children: [] },
      { id: 'wbs_33A_01_04', code: '33A.01.04', name: 'Equip Rentals', xwalkId: '3489', description: '', children: [] },
      { id: 'wbs_33A_01_05', code: '33A.01.05', name: 'Supervision', xwalkId: '3490', description: '', children: [] },
      { id: 'wbs_33A_01_06', code: '33A.01.06', name: 'Demobilization', xwalkId: '3491', description: '', children: [] },
      { id: 'wbs_33A_01_07', code: '33A.01.07', name: 'Close-Out', xwalkId: '3492', description: '', children: [] },
      { id: 'wbs_33A_01_08', code: '33A.01.08', name: 'Temporary Utilities', xwalkId: '3493', description: '', children: [] },
      { id: 'wbs_33A_01_09', code: '33A.01.09', name: 'Cleaning', xwalkId: '3494', description: '', children: [] },
      { id: 'wbs_33A_01_12', code: '33A.01.12', name: 'Commissioning/Decommissioning', xwalkId: '3495', description: '', children: [] },
      { id: 'wbs_33A_01_13', code: '33A.01.13', name: 'Testing & Inspection', xwalkId: '3496', description: '', children: [] },
      { id: 'wbs_33A_01_14', code: '33A.01.14', name: 'Survey & Layout', xwalkId: '3497', description: '', children: [] }
    ] },
    { id: 'wbs_33A_02', code: '33A.02', name: 'Utilities Demolition', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_02_01', code: '33A.02.01', name: 'Utility Demo - Sawcut & Remove Pavement', xwalkId: '3498', description: '', children: [] },
      { id: 'wbs_33A_02_02', code: '33A.02.02', name: 'Utility Demo - Disconnect & Make Safe', xwalkId: '3499', description: '', children: [] },
      { id: 'wbs_33A_02_03', code: '33A.02.03', name: 'Utility Demo - Water Utilities', xwalkId: '3500', description: '', children: [] },
      { id: 'wbs_33A_02_04', code: '33A.02.04', name: 'Utility Demo - Sanitary Sewerage Utilities', xwalkId: '3501', description: '', children: [] },
      { id: 'wbs_33A_02_05', code: '33A.02.05', name: 'Utility Demo - Stormwater Utilities', xwalkId: '3502', description: '', children: [] },
      { id: 'wbs_33A_02_06', code: '33A.02.06', name: 'Utility Demo - Utility Appurtenance', xwalkId: '3503', description: '', children: [] }
    ] },
    { id: 'wbs_33A_04', code: '33A.04', name: 'Water Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_04_01', code: '33A.04.01', name: 'Domestic Water Lines', xwalkId: '3504', description: '', children: [] },
      { id: 'wbs_33A_04_02', code: '33A.04.02', name: 'Fire Water Lines', xwalkId: '3505', description: '', children: [] },
      { id: 'wbs_33A_04_03', code: '33A.04.03', name: 'Backflow Preventers/Meter', xwalkId: '3506', description: '', children: [] },
      { id: 'wbs_33A_04_04', code: '33A.04.04', name: 'Fire Hydrant', xwalkId: '3507', description: '', children: [] },
      { id: 'wbs_33A_04_05', code: '33A.04.05', name: 'Fire Riser', xwalkId: '3508', description: '', children: [] },
      { id: 'wbs_33A_04_06', code: '33A.04.06', name: 'FDC', xwalkId: '3509', description: '', children: [] },
      { id: 'wbs_33A_04_07', code: '33A.04.07', name: 'Auguring for Water Utilities', xwalkId: '3510', description: '', children: [] },
      { id: 'wbs_33A_04_08', code: '33A.04.08', name: 'Steel Encasement', xwalkId: '3511', description: '', children: [] },
      { id: 'wbs_33A_04_09', code: '33A.04.09', name: 'Water Utility - Trenching & Trench Safety', xwalkId: '3512', description: '', children: [] },
      { id: 'wbs_33A_04_10', code: '33A.04.10', name: 'Water Utility - Bedding & Backfill', xwalkId: '3513', description: '', children: [] },
      { id: 'wbs_33A_04_11', code: '33A.04.11', name: 'Water Utility - Valves & Hydrants', xwalkId: '3514', description: '', children: [] },
      { id: 'wbs_33A_04_12', code: '33A.04.12', name: 'Water Utility - Connections', xwalkId: '3515', description: '', children: [] },
      { id: 'wbs_33A_04_13', code: '33A.04.13', name: 'Water Line - Boring & Jacking', xwalkId: '3516', description: '', children: [] },
      { id: 'wbs_33A_04_21', code: '33A.04.21', name: 'Ground-Level Water Storage Cisterns', xwalkId: '3517', description: '', children: [] }
    ] },
    { id: 'wbs_33A_05', code: '33A.05', name: 'Irrigation Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_05_01', code: '33A.05.01', name: 'Irrigation Lines (Main)', xwalkId: '3518', description: '', children: [] },
      { id: 'wbs_33A_05_02', code: '33A.05.02', name: 'Irrigation Meter', xwalkId: '3519', description: '', children: [] },
      { id: 'wbs_33A_05_03', code: '33A.05.03', name: 'Irrigation - Valves & Hydrants', xwalkId: '3520', description: '', children: [] },
      { id: 'wbs_33A_05_04', code: '33A.05.04', name: 'Irrigation - Connections', xwalkId: '3521', description: '', children: [] }
    ] },
    { id: 'wbs_33A_06', code: '33A.06', name: 'Sanitary Sewer Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_06_01', code: '33A.06.01', name: 'Sanitary Sewerage Lines', xwalkId: '3522', description: '', children: [] },
      { id: 'wbs_33A_06_02', code: '33A.06.02', name: 'Sanitary Sewerage Structures', xwalkId: '3523', description: '', children: [] },
      { id: 'wbs_33A_06_03', code: '33A.06.03', name: 'Sanitary Lift Station/Pump Station', xwalkId: '3524', description: '', children: [] },
      { id: 'wbs_33A_06_04', code: '33A.06.04', name: 'Septic Tanks', xwalkId: '3525', description: '', children: [] },
      { id: 'wbs_33A_06_06', code: '33A.06.06', name: 'Site Grease Trap/Interceptor/Sample Wells', xwalkId: '3526', description: '', children: [] },
      { id: 'wbs_33A_06_07', code: '33A.06.07', name: 'Wastewater Filtration System', xwalkId: '3527', description: '', children: [] },
      { id: 'wbs_33A_06_08', code: '33A.06.08', name: 'Sanitary Line - Boring & Jacking', xwalkId: '3528', description: '', children: [] },
      { id: 'wbs_33A_06_09', code: '33A.06.09', name: 'Sanitary Line - Steel Casing', xwalkId: '3529', description: '', children: [] },
      { id: 'wbs_33A_06_10', code: '33A.06.10', name: 'Sanitary Utility - Trenching & Trench Safety', xwalkId: '3530', description: '', children: [] },
      { id: 'wbs_33A_06_11', code: '33A.06.11', name: 'Sanitary Utility - Bedding & Backfill', xwalkId: '3531', description: '', children: [] },
      { id: 'wbs_33A_06_12', code: '33A.06.12', name: 'Sanitary Line - Tap Existing Inlets', xwalkId: '3532', description: '', children: [] },
      { id: 'wbs_33A_06_13', code: '33A.06.13', name: 'Sanitary Sewer Utility - Connection', xwalkId: '3533', description: '', children: [] }
    ] },
    { id: 'wbs_33A_07', code: '33A.07', name: 'Stormwater Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_07_01', code: '33A.07.01', name: 'Stormwater Lines', xwalkId: '3534', description: '', children: [] },
      { id: 'wbs_33A_07_02', code: '33A.07.02', name: 'Stormwater Structures - Precast', xwalkId: '3535', description: '', children: [] },
      { id: 'wbs_33A_07_03', code: '33A.07.03', name: 'Stormwater Structures - CIP Concrete', xwalkId: '3536', description: '', children: [] },
      { id: 'wbs_33A_07_04', code: '33A.07.04', name: 'Stormwater Culverts', xwalkId: '3537', description: '', children: [] },
      { id: 'wbs_33A_07_05', code: '33A.07.05', name: 'Rock Riprap', xwalkId: '3538', description: '', children: [] },
      { id: 'wbs_33A_07_06', code: '33A.07.06', name: 'Stormwater Lift Station/Pump Station', xwalkId: '3539', description: '', children: [] },
      { id: 'wbs_33A_07_08', code: '33A.07.08', name: 'Site Subdrainage System', xwalkId: '3540', description: '', children: [] },
      { id: 'wbs_33A_07_09', code: '33A.07.09', name: 'Downspout & Canopy Drain Connections', xwalkId: '3541', description: '', children: [] },
      { id: 'wbs_33A_07_10', code: '33A.07.10', name: 'Site Metal Grates & Frames', xwalkId: '3542', description: '', children: [] },
      { id: 'wbs_33A_07_11', code: '33A.07.11', name: 'Storm Line - Boring & Jacking', xwalkId: '3543', description: '', children: [] },
      { id: 'wbs_33A_07_12', code: '33A.07.12', name: 'Storm Line - Steel Casing', xwalkId: '3544', description: '', children: [] },
      { id: 'wbs_33A_07_13', code: '33A.07.13', name: 'Storm Utility - Trenching & Trench Safety', xwalkId: '3545', description: '', children: [] },
      { id: 'wbs_33A_07_14', code: '33A.07.14', name: 'Storm Utility - Bedding & Backfill', xwalkId: '3546', description: '', children: [] },
      { id: 'wbs_33A_07_15', code: '33A.07.15', name: 'Storm Line - Tap Existing Inlets', xwalkId: '3547', description: '', children: [] },
      { id: 'wbs_33A_07_16', code: '33A.07.16', name: 'Storm Line - Connections', xwalkId: '3548', description: '', children: [] }
    ] },
    { id: 'wbs_33A_08', code: '33A.08', name: 'Gas Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_08_01', code: '33A.08.01', name: 'Gas Lines', xwalkId: '3549', description: '', children: [] },
      { id: 'wbs_33A_08_02', code: '33A.08.02', name: 'Gas Sleeves', xwalkId: '3550', description: '', children: [] },
      { id: 'wbs_33A_08_03', code: '33A.08.03', name: 'Gas Line - Tap Existing Inlets', xwalkId: '3551', description: '', children: [] }
    ] },
    { id: 'wbs_33A_09', code: '33A.09', name: 'Utility - Repair & Replace', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_09_01', code: '33A.09.01', name: 'Post Utility Repair - Asphalt Pavement', xwalkId: '3552', description: '', children: [] },
      { id: 'wbs_33A_09_02', code: '33A.09.02', name: 'Post Utility Repair - Concrete Pavement', xwalkId: '3553', description: '', children: [] }
    ] },
    { id: 'wbs_33A_10', code: '33A.10', name: 'Off-Site Utilities Demolition & Repair', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_10_01', code: '33A.10.01', name: 'Off-Site Utility Demo - Sawcut & Remove Pavement', xwalkId: '3554', description: '', children: [] },
      { id: 'wbs_33A_10_02', code: '33A.10.02', name: 'Off-Site Utility Demo - Disconnect & Make Safe', xwalkId: '3555', description: '', children: [] },
      { id: 'wbs_33A_10_03', code: '33A.10.03', name: 'Off Site Utility Demo - Water Utilities', xwalkId: '3556', description: '', children: [] },
      { id: 'wbs_33A_10_04', code: '33A.10.04', name: 'Off Site Utility Demo - Sanitary Sewerage Utilities', xwalkId: '3557', description: '', children: [] },
      { id: 'wbs_33A_10_05', code: '33A.10.05', name: 'Off Site Utility Demo - Stormwater Utilities', xwalkId: '3558', description: '', children: [] },
      { id: 'wbs_33A_10_06', code: '33A.10.06', name: 'Off Site Post Utility Repair - Asphalt Pavement', xwalkId: '3559', description: '', children: [] },
      { id: 'wbs_33A_10_07', code: '33A.10.07', name: 'Off Site Post Utility Repair - Concrete Pavement', xwalkId: '3560', description: '', children: [] }
    ] },
    { id: 'wbs_33A_11', code: '33A.11', name: 'Off-Site Water Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_11_01', code: '33A.11.01', name: 'Off-Site - Domestic Water Lines', xwalkId: '3561', description: '', children: [] },
      { id: 'wbs_33A_11_02', code: '33A.11.02', name: 'Off-Site - Backflow Preventers/Meter', xwalkId: '3562', description: '', children: [] },
      { id: 'wbs_33A_11_03', code: '33A.11.03', name: 'Off-Site - Auguring for Water Utilities', xwalkId: '3563', description: '', children: [] },
      { id: 'wbs_33A_11_04', code: '33A.11.04', name: 'Off-Site - Steel Encasement', xwalkId: '3564', description: '', children: [] },
      { id: 'wbs_33A_11_05', code: '33A.11.05', name: 'Off-Site Water Utility - Trenching & Trench Safety', xwalkId: '3565', description: '', children: [] },
      { id: 'wbs_33A_11_06', code: '33A.11.06', name: 'Off-Site Water Utility - Bedding & Backfill', xwalkId: '3566', description: '', children: [] }
    ] },
    { id: 'wbs_33A_12', code: '33A.12', name: 'Off-Site Sanitary Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_12_01', code: '33A.12.01', name: 'Off-Site - Sanitary Sewerage Lines', xwalkId: '3567', description: '', children: [] },
      { id: 'wbs_33A_12_02', code: '33A.12.02', name: 'Off-Site - Sanitary Sewerage Structures', xwalkId: '3568', description: '', children: [] },
      { id: 'wbs_33A_12_03', code: '33A.12.03', name: 'Off-Site - Septic Tanks', xwalkId: '3569', description: '', children: [] },
      { id: 'wbs_33A_12_04', code: '33A.12.04', name: 'Off-Site Sanitary Line - Boring & Jacking', xwalkId: '3570', description: '', children: [] },
      { id: 'wbs_33A_12_05', code: '33A.12.05', name: 'Off-Site Sanitary Line - Steel Casing', xwalkId: '3571', description: '', children: [] },
      { id: 'wbs_33A_12_06', code: '33A.12.06', name: 'Off-Site Sanitary Utility - Trenching & Trench Safety', xwalkId: '3572', description: '', children: [] },
      { id: 'wbs_33A_12_07', code: '33A.12.07', name: 'Off-Site Sanitary Utility - Bedding & Backfill', xwalkId: '3573', description: '', children: [] }
    ] },
    { id: 'wbs_33A_13', code: '33A.13', name: 'Off-Site Storm Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_13_01', code: '33A.13.01', name: 'Off-Site - Stormwater Lines', xwalkId: '3574', description: '', children: [] },
      { id: 'wbs_33A_13_02', code: '33A.13.02', name: 'Off-Site - Stormwater Structures - Precast', xwalkId: '3575', description: '', children: [] },
      { id: 'wbs_33A_13_03', code: '33A.13.03', name: 'Off-Site - Structures - CIP Concrete', xwalkId: '3576', description: '', children: [] },
      { id: 'wbs_33A_13_04', code: '33A.13.04', name: 'Off-Site - Stormwater Culverts', xwalkId: '3577', description: '', children: [] },
      { id: 'wbs_33A_13_05', code: '33A.13.05', name: 'Off-Site - Rock Riprap', xwalkId: '3578', description: '', children: [] },
      { id: 'wbs_33A_13_06', code: '33A.13.06', name: 'Off-Site - Metal Grates & Frames', xwalkId: '3579', description: '', children: [] },
      { id: 'wbs_33A_13_07', code: '33A.13.07', name: 'Off-Site Stormwater Line - Boring & Jacking', xwalkId: '3580', description: '', children: [] },
      { id: 'wbs_33A_13_08', code: '33A.13.08', name: 'Off-Site Stormwater Line - Steel Casing', xwalkId: '3581', description: '', children: [] },
      { id: 'wbs_33A_13_09', code: '33A.13.09', name: 'Off-Site Storm Utility - Trenching & Trench Safety', xwalkId: '3582', description: '', children: [] },
      { id: 'wbs_33A_13_10', code: '33A.13.10', name: 'Off-Site Storm Utility - Bedding & Backfill', xwalkId: '3583', description: '', children: [] }
    ] },
    { id: 'wbs_33A_14', code: '33A.14', name: 'Off-Site Gas Utilities', xwalkId: '', description: '', children: [
      { id: 'wbs_33A_14_01', code: '33A.14.01', name: 'Off-Site Gas Line - Boring & Jacking', xwalkId: '3584', description: '', children: [] }
    ] }
  ] },
  { id: 'wbs_34A', code: '34A', name: 'Traffic Signal', xwalkId: '', description: '', children: [
    { id: 'wbs_34A_01', code: '34A.01', name: 'General Requirements', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_01_01', code: '34A.01.01', name: 'Mobilization', xwalkId: '3585', description: '', children: [] },
      { id: 'wbs_34A_01_02', code: '34A.01.02', name: 'Bond/Permit', xwalkId: '3586', description: '', children: [] },
      { id: 'wbs_34A_01_03', code: '34A.01.03', name: 'Submittals', xwalkId: '3587', description: '', children: [] },
      { id: 'wbs_34A_01_05', code: '34A.01.05', name: 'Supervision', xwalkId: '3588', description: '', children: [] },
      { id: 'wbs_34A_01_07', code: '34A.01.07', name: 'Close-Out', xwalkId: '3589', description: '', children: [] },
      { id: 'wbs_34A_01_09', code: '34A.01.09', name: 'Cleaning', xwalkId: '3590', description: '', children: [] },
      { id: 'wbs_34A_01_13', code: '34A.01.13', name: 'Testing', xwalkId: '3591', description: '', children: [] }
    ] },
    { id: 'wbs_34A_02', code: '34A.02', name: 'Traffic Signal System', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_02_10', code: '34A.02.10', name: 'Vehicular Traffic Signal', xwalkId: '3592', description: '', children: [] },
      { id: 'wbs_34A_02_20', code: '34A.02.20', name: 'Traffic Signal Cabinets', xwalkId: '3593', description: '', children: [] },
      { id: 'wbs_34A_02_30', code: '34A.02.30', name: 'Traffic Signal Solar Power System', xwalkId: '3594', description: '', children: [] },
      { id: 'wbs_34A_02_40', code: '34A.02.40', name: 'Traffic Signal Foundation', xwalkId: '3595', description: '', children: [] }
    ] },
    { id: 'wbs_34A_03', code: '34A.03', name: 'Traffic Signal Controller System', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_03_10', code: '34A.03.10', name: 'Traffic Signal Controller Assembly/Units', xwalkId: '3596', description: '', children: [] },
      { id: 'wbs_34A_03_20', code: '34A.03.20', name: 'Traffic Signal Controller Cabinets', xwalkId: '3597', description: '', children: [] },
      { id: 'wbs_34A_03_30', code: '34A.03.30', name: 'Traffic Signal Controller Foundation', xwalkId: '3598', description: '', children: [] }
    ] },
    { id: 'wbs_34A_04', code: '34A.04', name: 'Traffic Monitoring System', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_04_10', code: '34A.04.10', name: 'Traffic Loop Lead Detector Assembly', xwalkId: '3599', description: '', children: [] },
      { id: 'wbs_34A_04_20', code: '34A.04.20', name: 'Radar Presence Detectors', xwalkId: '3600', description: '', children: [] }
    ] },
    { id: 'wbs_34A_05', code: '34A.05', name: 'Traffic Signal Accessories', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_05_10', code: '34A.05.10', name: 'Traffic Signal Cables & Wiring', xwalkId: '3601', description: '', children: [] },
      { id: 'wbs_34A_05_20', code: '34A.05.20', name: 'Traffic Signal Conduits', xwalkId: '3602', description: '', children: [] },
      { id: 'wbs_34A_05_30', code: '34A.05.30', name: 'Traffic Signal Pull Box/Ground Box', xwalkId: '3603', description: '', children: [] },
      { id: 'wbs_34A_05_40', code: '34A.05.40', name: 'Signs on Traffic Signal', xwalkId: '3604', description: '', children: [] }
    ] },
    { id: 'wbs_34A_06', code: '34A.06', name: 'Traffic Signage', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_06_10', code: '34A.06.10', name: 'Off-site Traffic Signage', xwalkId: '3605', description: '', children: [] },
      { id: 'wbs_34A_06_20', code: '34A.06.20', name: 'Off-site Flashing Lights with Signs', xwalkId: '3606', description: '', children: [] },
      { id: 'wbs_34A_06_30', code: '34A.06.30', name: 'Off-site Pedestrian Signal', xwalkId: '3607', description: '', children: [] },
      { id: 'wbs_34A_06_40', code: '34A.06.40', name: 'Off-site Speed Display Sign', xwalkId: '3608', description: '', children: [] }
    ] },
    { id: 'wbs_34A_07', code: '34A.07', name: 'Traffic Signal Demolition', xwalkId: '', description: '', children: [
      { id: 'wbs_34A_07_10', code: '34A.07.10', name: 'Demolish Traffic Signals', xwalkId: '3609', description: '', children: [] },
      { id: 'wbs_34A_07_20', code: '34A.07.20', name: 'Demolish Off-site Traffic Signage', xwalkId: '3610', description: '', children: [] }
    ] }
  ] }
];

const WORK_PKG_ITEMS = WBS_ITEMS;

const MASTERFORMAT_ITEMS: RefItem[] = [
  { id: 'mf_00', code: '00', name: 'Procurement & Contracting Requirements', xwalkId: '', description: '', children: [
    { id: 'mf_00_70', code: '00-70', name: 'Conditions of the Contract', xwalkId: '', description: '', children: [
      { id: 'mf_00_70_73', code: '00-70-73', name: 'Supplementary Conditions', xwalkId: '', description: '', children: [
        { id: 'mf_00_70_73_16', code: '00-70-73-16', name: 'Insurance Requirements', xwalkId: '14,15,16,17,18,19', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_01', code: '01', name: 'General Requirements', xwalkId: '', description: '', children: [
    { id: 'mf_01_00', code: '01-00', name: 'General Requirements', xwalkId: '2726,2727,2728,2729,2730,2731,2732', description: '', children: [] },
    { id: 'mf_01_20', code: '01-20', name: 'Price & Payment Procedures', xwalkId: '', description: '', children: [
      { id: 'mf_01_20_21', code: '01-20-21', name: 'Allowances', xwalkId: '', description: '', children: [
        { id: 'mf_01_20_21_16', code: '01-20-21-16', name: 'Contingency Allowances', xwalkId: '1,21,157,478', description: '', children: [] },
        { id: 'mf_01_20_21_26', code: '01-20-21-26', name: 'Product Allowances', xwalkId: '2', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_01_30', code: '01-30', name: 'Administrative Requirements', xwalkId: '', description: '', children: [
      { id: 'mf_01_30_31', code: '01-30-31', name: 'Project Management & Coordination', xwalkId: '3,4,5,8,23,24,76,104,162,259,270,286,350,451,483,552,590,631,649,677,704,732,762,782,813,867,955,972,1072,1122,1171,1206,1232,1320,1395,1429,1460,1509,1607,1711,1881,1936,2125,2196,2239,2270,2319,2375,2416,2462,2502,2545,2573,2597,2638,2701,2757,2781,2801,2858,2884,2902,2919,2962,3043,3071,3126,3167,3260,3294,3341,3441,3490,3588,3622', description: '', children: [
        { id: 'mf_01_30_31_19', code: '01-30-31-19', name: 'Preconstruction Meetings', xwalkId: '20', description: '', children: [] }
      ] },
      { id: 'mf_01_30_32', code: '01-30-32', name: 'Construction Progress Documentation', xwalkId: '', description: '', children: [
        { id: 'mf_01_30_32_23', code: '01-30-32-23', name: 'Survey & Layout Data', xwalkId: '596,2325,2422,2966,3076,3130,3172,3265,3346,3389,3464,3497', description: '', children: [] }
      ] },
      { id: 'mf_01_30_33', code: '01-30-33', name: 'Submittal Procedures', xwalkId: '74,102,160,257,268,284,319,331,348,449,481,535,551,588,629,647,675,702,730,760,780,798,812,845,865,942,954,970,1026,1041,1061,1070,1101,1120,1157,1169,1204,1231,1247,1267,1287,1304,1318,1373,1394,1428,1459,1489,1495,1508,1532,1544,1563,1593,1606,1631,1648,1656,1670,1678,1710,1865,1880,1896,1935,1950,1972,1978,2010,2025,2044,2065,2081,2096,2108,2123,2164,2176,2195,2238,2268,2283,2299,2317,2358,2373,2401,2414,2452,2460,2479,2500,2526,2543,2571,2595,2636,2700,2755,2779,2799,2831,2841,2856,2882,2900,2917,2945,2960,3069,3105,3124,3165,3258,3293,3339,3361,3384,3440,3459,3488,3587,3620', description: '', children: [] },
      { id: 'mf_01_30_35', code: '01-30-35', name: 'Special Procedures', xwalkId: '', description: '', children: [
        { id: 'mf_01_30_35_53', code: '01-30-35-53', name: 'Security Procedures', xwalkId: '25,26,27,28', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_01_40', code: '01-40', name: 'Quality Requirements', xwalkId: '', description: '', children: [
      { id: 'mf_01_40_41', code: '01-40-41', name: 'Regulatory Requirements', xwalkId: '73,101,159,256,267,283,318,330,347,448,480,550,587,628,646,674,701,729,759,779,797,811,844,864,941,953,969,1025,1040,1060,1069,1100,1119,1156,1168,1203,1230,1246,1266,1286,1303,1317,1372,1393,1427,1458,1494,1507,1531,1543,1562,1592,1605,1630,1647,1655,1669,1677,1709,1864,1879,1895,1934,1949,1971,1977,2009,2024,2043,2064,2080,2095,2107,2122,2163,2175,2194,2237,2267,2282,2298,2316,2357,2372,2400,2413,2451,2459,2478,2499,2525,2542,2570,2594,2635,2699,2754,2778,2798,2830,2840,2855,2881,2899,2916,2944,2959,3042,3068,3104,3123,3164,3257,3292,3338,3360,3383,3439,3458,3487,3586,3619', description: '', children: [
        { id: 'mf_01_40_41_23', code: '01-40-41-23', name: 'Fees', xwalkId: '9,22,29', description: '', children: [] },
        { id: 'mf_01_40_41_26', code: '01-40-41-26', name: 'Permit Requirements', xwalkId: '10', description: '', children: [] }
      ] },
      { id: 'mf_01_40_43', code: '01-40-43', name: 'Quality Assurance', xwalkId: '', description: '', children: [
        { id: 'mf_01_40_43_39', code: '01-40-43-39', name: 'Mockups', xwalkId: '165,290,323,354,455,555,593,653,681,708,736,766,786,816,870,976,1076,1105,1126,1160,1175,1210,1251,1271,1290,1308,1324,2179,2200,2243,2379,3108,3387,3624', description: '', children: [] }
      ] },
      { id: 'mf_01_40_45', code: '01-40-45', name: 'Quality Control', xwalkId: '', description: '', children: [
        { id: 'mf_01_40_45_23', code: '01-40-45-23', name: 'Testing & Inspecting Services', xwalkId: '30,31,32,80,556,595,787,977,1211,1252,1291,1377,1659,1715,1885,2014,2100,2112,2128,2324,2362,2380,2421,2455,2483,2507,2532,2548,2577,2643,2706,2762,2784,2804,2835,2845,2862,2888,2905,2923,2947,2965,3075,3171,3264,3345,3388,3463,3496,3591,3625', description: '', children: [] },
        { id: 'mf_01_40_45_33', code: '01-40-45-33', name: 'Code-Required Special Inspections & Procedures', xwalkId: '33', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_01_50', code: '01-50', name: 'Temporary Facilities & Controls', xwalkId: '', description: '', children: [
      { id: 'mf_01_50_50', code: '01-50-50', name: 'Temporary Facilities & Controls', xwalkId: '108,291,486,594,597,709', description: '', children: [] },
      { id: 'mf_01_50_51', code: '01-50-51', name: 'Temporary Utilities', xwalkId: '', description: '', children: [
        { id: 'mf_01_50_51_13', code: '01-50-51-13', name: 'Temporary Electricity', xwalkId: '35,36,2733,2760,3493', description: '', children: [] },
        { id: 'mf_01_50_51_36', code: '01-50-51-36', name: 'Temporary Water', xwalkId: '37', description: '', children: [] }
      ] },
      { id: 'mf_01_50_53', code: '01-50-53', name: 'Temporary Construction', xwalkId: '38,39', description: '', children: [] },
      { id: 'mf_01_50_54', code: '01-50-54', name: 'Construction Aids', xwalkId: '75,103,161,258,269,285,320,349,450,482,589,630,648,676,703,731,761,781,846,866,971,1027,1042,1071,1102,1121,1158,1170,1205,1248,1305,1319,1374,1496,1897,1951,1979,2011,2026,2045,2066,2082,2097,2109,2124,2165,2269,2300,2318,2359,2374,2402,2415,2461,2480,2501,2527,2544,2572,2596,2637,2756,2780,2800,2832,2842,2857,2883,2901,2918,2961,3070,3125,3166,3259,3340,3460,3489,3621', description: '', children: [
        { id: 'mf_01_50_54_13', code: '01-50-54-13', name: 'Temporary Elevators', xwalkId: '3611', description: '', children: [] },
        { id: 'mf_01_50_54_16', code: '01-50-54-16', name: 'Temporary Hoists', xwalkId: '46,47,48', description: '', children: [] },
        { id: 'mf_01_50_54_19', code: '01-50-54-19', name: 'Temporary Cranes', xwalkId: '40,41,42,43,44,45', description: '', children: [] },
        { id: 'mf_01_50_54_23', code: '01-50-54-23', name: 'Temporary Scaffolding & Platforms', xwalkId: '49,456,1127,2423', description: '', children: [] }
      ] },
      { id: 'mf_01_50_55', code: '01-50-55', name: 'Vehicular Access & Parking', xwalkId: '', description: '', children: [
        { id: 'mf_01_50_55_13', code: '01-50-55-13', name: 'Temporary Access Roads', xwalkId: '50,2968,3077', description: '', children: [] },
        { id: 'mf_01_50_55_19', code: '01-50-55-19', name: 'Temporary Parking Areas', xwalkId: '51', description: '', children: [] },
        { id: 'mf_01_50_55_26', code: '01-50-55-26', name: 'Traffic Control', xwalkId: '52', description: '', children: [] },
        { id: 'mf_01_50_55_29', code: '01-50-55-29', name: 'Staging Areas', xwalkId: '53,2969', description: '', children: [] }
      ] },
      { id: 'mf_01_50_56', code: '01-50-56', name: 'Temporary Barriers & Enclosures', xwalkId: '54', description: '', children: [
        { id: 'mf_01_50_56_26', code: '01-50-56-26', name: 'Temporary Fencing', xwalkId: '57', description: '', children: [] },
        { id: 'mf_01_50_56_36', code: '01-50-56-36', name: 'Temporary Security Enclosures', xwalkId: '55,56', description: '', children: [] },
        { id: 'mf_01_50_56_39', code: '01-50-56-39', name: 'Temporary Tree & Plant Protection', xwalkId: '58,3044,3390', description: '', children: [] }
      ] },
      { id: 'mf_01_50_57', code: '01-50-57', name: 'Temporary Controls', xwalkId: '60', description: '', children: [
        { id: 'mf_01_50_57_13', code: '01-50-57-13', name: 'Temporary Erosion & Sediment Control', xwalkId: '3048', description: '', children: [] }
      ] },
      { id: 'mf_01_50_58', code: '01-50-58', name: 'Project Identification', xwalkId: '', description: '', children: [
        { id: 'mf_01_50_58_13', code: '01-50-58-13', name: 'Temporary Project Signage', xwalkId: '61', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_01_60', code: '01-60', name: 'Product Requirements', xwalkId: '', description: '', children: [
      { id: 'mf_01_60_66', code: '01-60-66', name: 'Product Storage & Handling Requirements', xwalkId: '62', description: '', children: [] }
    ] },
    { id: 'mf_01_70', code: '01-70', name: 'Execution & Closeout Requirements', xwalkId: '', description: '', children: [
      { id: 'mf_01_70_71', code: '01-70-71', name: 'Examination & Preparation', xwalkId: '', description: '', children: [
        { id: 'mf_01_70_71_13', code: '01-70-71-13', name: 'Mobilization', xwalkId: '72,100,158,255,266,282,317,329,346,447,479,549,586,627,645,673,700,728,758,778,796,810,843,863,940,952,968,1024,1039,1059,1068,1099,1118,1155,1167,1202,1229,1245,1265,1285,1302,1316,1371,1392,1426,1457,1493,1506,1530,1542,1561,1591,1604,1629,1646,1654,1668,1676,1708,1863,1878,1894,1933,1948,1970,1976,2008,2023,2042,2063,2079,2094,2106,2121,2162,2174,2193,2236,2266,2281,2297,2315,2356,2371,2399,2412,2450,2458,2477,2498,2524,2541,2569,2593,2634,2698,2753,2777,2797,2829,2839,2854,2880,2898,2915,2943,2958,3041,3067,3103,3122,3163,3256,3291,3337,3359,3382,3438,3457,3486,3585,3618', description: '', children: [] },
        { id: 'mf_01_70_71_23', code: '01-70-71-23', name: 'Field Engineering', xwalkId: '63,64,3612', description: '', children: [] }
      ] },
      { id: 'mf_01_70_73', code: '01-70-73', name: 'Execution', xwalkId: '', description: '', children: [
        { id: 'mf_01_70_73_23', code: '01-70-73-23', name: 'Bracing & Anchoring', xwalkId: '65,457,487,488,489,533,534,634', description: '', children: [] },
        { id: 'mf_01_70_73_29', code: '01-70-73-29', name: 'Cutting & Patching', xwalkId: '66', description: '', children: [] }
      ] },
      { id: 'mf_01_70_74', code: '01-70-74', name: 'Cleaning & Waste Management', xwalkId: '79,107,273,289,322,333,353,454,536,554,592,633,652,680,707,735,765,785,800,848,944,975,1029,1044,1063,1075,1104,1125,1174,1209,1234,1250,1270,1289,1307,1323,1376,1397,1431,1462,1498,1511,1534,1565,1595,1609,1633,1650,1658,1672,1680,1713,1867,1883,1899,1939,1953,1981,2013,2028,2047,2068,2084,2099,2111,2127,2167,2178,2199,2242,2285,2302,2322,2361,2378,2404,2419,2454,2464,2482,2505,2530,2547,2576,2641,2704,2834,2844,3074,3107,3129,3170,3263,3297,3344,3364,3386,3462,3494,3590,3623', description: '', children: [
        { id: 'mf_01_70_74_13', code: '01-70-74-13', name: 'Progress Cleaning', xwalkId: '67,68', description: '', children: [] },
        { id: 'mf_01_70_74_19', code: '01-70-74-19', name: 'Construction Waste Management & Disposal', xwalkId: '69,3055,3613', description: '', children: [] },
        { id: 'mf_01_70_74_23', code: '01-70-74-23', name: 'Final Cleaning', xwalkId: '70', description: '', children: [] }
      ] },
      { id: 'mf_01_70_77', code: '01-70-77', name: 'Closeout Procedures', xwalkId: '77,105,163,260,271,287,351,452,484,650,678,705,733,763,783,814,868,956,973,1073,1123,1172,1207,1268,1321,1937,2197,2240,2271,2320,2376,2417,2503,2528,2574,2598,2639,2702,2758,2859,2885,2920,2963,3072,3127,3168,3261,3295,3342,3362,3491', description: '', children: [] },
      { id: 'mf_01_70_78', code: '01-70-78', name: 'Closeout Submittals', xwalkId: '78,106,164,261,272,288,321,332,352,453,485,553,591,632,651,679,706,734,764,784,799,815,847,869,943,957,974,1028,1043,1062,1074,1103,1124,1159,1173,1208,1233,1249,1269,1288,1306,1322,1375,1396,1430,1461,1497,1510,1533,1545,1564,1594,1608,1632,1649,1657,1671,1679,1712,1866,1882,1898,1938,1952,1980,2012,2027,2046,2067,2083,2098,2110,2126,2166,2177,2198,2241,2272,2284,2301,2321,2360,2377,2403,2418,2453,2463,2481,2504,2529,2546,2575,2599,2640,2703,2759,2782,2802,2833,2843,2860,2886,2903,2921,2946,2964,3073,3106,3128,3169,3262,3296,3343,3363,3385,3442,3461,3492,3589', description: '', children: [
        { id: 'mf_01_70_78_29', code: '01-70-78-29', name: 'Final Site Survey', xwalkId: '71', description: '', children: [] },
        { id: 'mf_01_70_78_33', code: '01-70-78-33', name: 'Bonds', xwalkId: '6,7,11,12,13', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_01_90', code: '01-90', name: 'Life Cycle Activities', xwalkId: '', description: '', children: [
      { id: 'mf_01_90_91', code: '01-90-91', name: 'Commissioning', xwalkId: '34,1714,1884,2323,2420,2506,2531,2642,2705,2761,2783,2803,2861,2887,2904,2922,3495', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_02', code: '02', name: 'Existing Conditions', xwalkId: '', description: '', children: [
    { id: 'mf_02_40', code: '02-40', name: 'Demolition & Structure Moving', xwalkId: '', description: '', children: [
      { id: 'mf_02_40_41', code: '02-40-41', name: 'Demolition', xwalkId: '132,133,134,141,142,143,144,145,146,147,148,149,150,151,152,153,155,156', description: '', children: [
        { id: 'mf_02_40_41_13', code: '02-40-41-13', name: 'Selective Site Demolition', xwalkId: '2970,2971,2972,2973,2974,2975,2976,2977,2978,2979,2980,2981,2982,3028,3173,3174,3175,3176,3177,3266,3267,3268,3443,3444,3609,3610', description: '', children: [] },
        { id: 'mf_02_40_41_16', code: '02-40-41-16', name: 'Structure Demolition', xwalkId: '128,129,130,131', description: '', children: [] },
        { id: 'mf_02_40_41_19', code: '02-40-41-19', name: 'Selective Demolition', xwalkId: '109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,135,136,137,138,139,140', description: '', children: [] }
      ] },
      { id: 'mf_02_40_42', code: '02-40-42', name: 'Removal & Diversion of Construction Materials', xwalkId: '', description: '', children: [
        { id: 'mf_02_40_42_21', code: '02-40-42-21', name: 'Salvage of Construction Materials', xwalkId: '154', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_02_60', code: '02-60', name: 'Contaminated Site Material Removal', xwalkId: '', description: '', children: [
      { id: 'mf_02_60_61', code: '02-60-61', name: 'Removal & Disposal of Contaminated Soils', xwalkId: '', description: '', children: [
        { id: 'mf_02_60_61_13', code: '02-60-61-13', name: 'Excavation & Handling of Contaminated Material', xwalkId: '93', description: '', children: [] },
        { id: 'mf_02_60_61_23', code: '02-60-61-23', name: 'Removal & Disposal of Polychlorinate Biphenyl Contaminated Soils', xwalkId: '95', description: '', children: [] },
        { id: 'mf_02_60_61_26', code: '02-60-61-26', name: 'Removal & Disposal of Asbestos Contaminated Soils', xwalkId: '94', description: '', children: [] },
        { id: 'mf_02_60_61_29', code: '02-60-61-29', name: 'Removal & Disposal of Organically Contaminated Soils', xwalkId: '96', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_02_80', code: '02-80', name: 'Facility Remediation', xwalkId: '', description: '', children: [
      { id: 'mf_02_80_81', code: '02-80-81', name: 'Transportation & Disposal of Hazardous Materials', xwalkId: '99', description: '', children: [] },
      { id: 'mf_02_80_82', code: '02-80-82', name: 'Asbestos Remediation', xwalkId: '', description: '', children: [
        { id: 'mf_02_80_82_13', code: '02-80-82-13', name: 'Asbestos Abatement', xwalkId: '81,82,83,84,85,86,87,88,89', description: '', children: [] },
        { id: 'mf_02_80_82_16', code: '02-80-82-16', name: '', xwalkId: '97,98', description: '', children: [] }
      ] },
      { id: 'mf_02_80_83', code: '02-80-83', name: 'Lead Remediation', xwalkId: '', description: '', children: [
        { id: 'mf_02_80_83_33', code: '02-80-83-33', name: 'Removal & Disposal of Material Containing Lead', xwalkId: '90', description: '', children: [] }
      ] },
      { id: 'mf_02_80_84', code: '02-80-84', name: 'Polychlorinate Biphenyl Remediation', xwalkId: '92', description: '', children: [] },
      { id: 'mf_02_80_87', code: '02-80-87', name: 'Biohazard Remediation', xwalkId: '', description: '', children: [
        { id: 'mf_02_80_87_13', code: '02-80-87-13', name: 'Mold Remediation', xwalkId: '91', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_03', code: '03', name: 'Concrete', xwalkId: '', description: '', children: [
    { id: 'mf_03_10', code: '03-10', name: 'Concrete Forming & Accessories', xwalkId: '', description: '', children: [
      { id: 'mf_03_10_11', code: '03-10-11', name: 'Concrete Forming', xwalkId: '', description: '', children: [
        { id: 'mf_03_10_11_19', code: '03-10-11-19', name: 'Insulating Concrete Forming', xwalkId: '458,459,460,461,462,463,464,465,466,467,468,469,470,471,474', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_03_20', code: '03-20', name: 'Concrete Reinforcing', xwalkId: '', description: '', children: [
      { id: 'mf_03_20_20', code: '03-20-20', name: 'Concrete Reinforcing', xwalkId: '385,430,473,3485', description: '', children: [] }
    ] },
    { id: 'mf_03_30', code: '03-30', name: 'Cast-in-Place Concrete', xwalkId: '', description: '', children: [
      { id: 'mf_03_30_30', code: '03-30-30', name: 'Cast-in-Place Concrete', xwalkId: '472', description: '', children: [] },
      { id: 'mf_03_30_31', code: '03-30-31', name: 'Structural Concrete', xwalkId: '171,172,174,175,176,177,178,179,180,181,182,184,185,188,191,192,193,194,195,196,197,199,201,202,203,204,208,235,236,238,241,242,243,244,245,1644,3188,3201,3212,3237,3324', description: '', children: [] },
      { id: 'mf_03_30_33', code: '03-30-33', name: 'Architectural Concrete', xwalkId: '183,189,198,209,210,211', description: '', children: [
        { id: 'mf_03_30_33_16', code: '03-30-33-16', name: 'Lightweight Architectural Concrete', xwalkId: '263', description: '', children: [] }
      ] },
      { id: 'mf_03_30_35', code: '03-30-35', name: 'Concrete Finishing', xwalkId: '1310,1312,1313,1314', description: '', children: [
        { id: 'mf_03_30_35_43', code: '03-30-35-43', name: 'Polished Concrete Finishing', xwalkId: '1309', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_03_40', code: '03-40', name: 'Precast Concrete', xwalkId: '', description: '', children: [
      { id: 'mf_03_40_41', code: '03-40-41', name: 'Precast Structural Concrete', xwalkId: '292,293,294,296,297,299,300,301,302,304,314,315,316', description: '', children: [
        { id: 'mf_03_40_41_13', code: '03-40-41-13', name: 'Precast Concrete Hollow Core Planks', xwalkId: '274,275,276,277,278,279,280,281', description: '', children: [] },
        { id: 'mf_03_40_41_16', code: '03-40-41-16', name: 'Precast Concrete Slabs', xwalkId: '295', description: '', children: [] },
        { id: 'mf_03_40_41_23', code: '03-40-41-23', name: 'Precast Concrete Stairs', xwalkId: '298,303', description: '', children: [] }
      ] },
      { id: 'mf_03_40_45', code: '03-40-45', name: 'Precast Architectural Concrete', xwalkId: '305,306,307,308,309,310,311,312,313', description: '', children: [] },
      { id: 'mf_03_40_47', code: '03-40-47', name: 'Site-Cast Concrete', xwalkId: '200,205', description: '', children: [
        { id: 'mf_03_40_47_13', code: '03-40-47-13', name: 'Tilt-Up Concrete', xwalkId: '505,511', description: '', children: [] }
      ] },
      { id: 'mf_03_40_49', code: '03-40-49', name: 'Glass-Fiber-Reinforced Concrete', xwalkId: '324,325,326,328', description: '', children: [
        { id: 'mf_03_40_49_43', code: '03-40-49-43', name: 'Glass-Fiber-Reinforced Concrete Trim', xwalkId: '327', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_03_50', code: '03-50', name: 'Cast Decks & Underlayment', xwalkId: '', description: '', children: [
      { id: 'mf_03_50_51', code: '03-50-51', name: 'Cast Roof Decks', xwalkId: '', description: '', children: [
        { id: 'mf_03_50_51_13', code: '03-50-51-13', name: 'Cementitious Wood Fiber Decks', xwalkId: '262', description: '', children: [] }
      ] },
      { id: 'mf_03_50_52', code: '03-50-52', name: 'Lightweight Concrete Roof Insulation', xwalkId: '', description: '', children: [
        { id: 'mf_03_50_52_13', code: '03-50-52-13', name: 'Composite Concrete Roof Insulation', xwalkId: '264', description: '', children: [] },
        { id: 'mf_03_50_52_16', code: '03-50-52-16', name: 'Lightweight Insulating Concrete', xwalkId: '254,265', description: '', children: [] }
      ] },
      { id: 'mf_03_50_53', code: '03-50-53', name: 'Concrete Topping', xwalkId: '186,190,206,207,212,227,337,338', description: '', children: [] },
      { id: 'mf_03_50_54', code: '03-50-54', name: 'Cast Underlayment', xwalkId: '', description: '', children: [
        { id: 'mf_03_50_54_13', code: '03-50-54-13', name: 'Gypsum Cement Underlayment', xwalkId: '334,344', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_03_60', code: '03-60', name: 'Grouting', xwalkId: '', description: '', children: [
      { id: 'mf_03_60_60', code: '03-60-60', name: 'Grouting', xwalkId: '187,431', description: '', children: [] }
    ] },
    { id: 'mf_03_70', code: '03-70', name: 'Mass Concrete', xwalkId: '', description: '', children: [
      { id: 'mf_03_70_70', code: '03-70-70', name: 'Mass Concrete', xwalkId: '173', description: '', children: [] }
    ] },
    { id: 'mf_03_80', code: '03-80', name: 'Concrete Cutting & Boring', xwalkId: '', description: '', children: [
      { id: 'mf_03_80_81', code: '03-80-81', name: 'Concrete Cutting', xwalkId: '', description: '', children: [
        { id: 'mf_03_80_81_13', code: '03-80-81-13', name: 'Flat Concrete Sawing', xwalkId: '3483,3484', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_04', code: '04', name: 'Masonry', xwalkId: '', description: '', children: [
    { id: 'mf_04_00', code: '04-00', name: 'Masonry', xwalkId: '', description: '', children: [
      { id: 'mf_04_00_05', code: '04-00-05', name: 'Common Work Results for Masonry', xwalkId: '', description: '', children: [
        { id: 'mf_04_00_05_23', code: '04-00-05-23', name: 'Masonry Accessories', xwalkId: '386,387,433,444,445,446', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_04_20', code: '04-20', name: 'Unit Masonry', xwalkId: '', description: '', children: [
      { id: 'mf_04_20_21', code: '04-20-21', name: 'Clay Unit Masonry', xwalkId: '', description: '', children: [
        { id: 'mf_04_20_21_13', code: '04-20-21-13', name: 'Brick Masonry', xwalkId: '355,380,390,427,435', description: '', children: [] },
        { id: 'mf_04_20_21_26', code: '04-20-21-26', name: 'Glazed Structural Clay Tile Masonry', xwalkId: '429', description: '', children: [] }
      ] },
      { id: 'mf_04_20_22', code: '04-20-22', name: 'Concrete Unit Masonry', xwalkId: '356,357,358,359,360,361,381,391,392,393,394,395,396,397,398,399,400,401,402,437,438,439,440,441,442', description: '', children: [
        { id: 'mf_04_20_22_23', code: '04-20-22-23', name: 'Architectural Concrete Unit Masonry', xwalkId: '362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_04_40', code: '04-40', name: 'Stone Assemblies', xwalkId: '', description: '', children: [
      { id: 'mf_04_40_42', code: '04-40-42', name: 'Exterior Stone Cladding', xwalkId: '383,436', description: '', children: [] },
      { id: 'mf_04_40_43', code: '04-40-43', name: 'Stone Masonry', xwalkId: '', description: '', children: [
        { id: 'mf_04_40_43_13', code: '04-40-43-13', name: 'Stone Masonry Veneer', xwalkId: '428', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_04_70', code: '04-70', name: 'Manufactured Masonry', xwalkId: '', description: '', children: [
      { id: 'mf_04_70_72', code: '04-70-72', name: 'Cast Stone Masonry', xwalkId: '384,443', description: '', children: [] },
      { id: 'mf_04_70_73', code: '04-70-73', name: 'Manufactured Stone Masonry', xwalkId: '382', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_05', code: '05', name: 'Metals', xwalkId: '', description: '', children: [
    { id: 'mf_05_10', code: '05-10', name: 'Structural Metal Framing', xwalkId: '', description: '', children: [
      { id: 'mf_05_10_12', code: '05-10-12', name: 'Structural Steel Framing', xwalkId: '389,475,476,477,490,491,492,493,494,495,497,498,501,502,503,506,507,508,509,510,512,513,514,525,531,532', description: '', children: [] }
    ] },
    { id: 'mf_05_20', code: '05-20', name: 'Metal Joists', xwalkId: '', description: '', children: [
      { id: 'mf_05_20_20', code: '05-20-20', name: 'Metal Joists', xwalkId: '499', description: '', children: [] },
      { id: 'mf_05_20_21', code: '05-20-21', name: 'Steel Joist Framing', xwalkId: '', description: '', children: [
        { id: 'mf_05_20_21_23', code: '05-20-21-23', name: 'Steel Joist Girder Framing', xwalkId: '500', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_05_30', code: '05-30', name: 'Metal Decking', xwalkId: '', description: '', children: [
      { id: 'mf_05_30_30', code: '05-30-30', name: 'Metal Decking', xwalkId: '496,504', description: '', children: [] }
    ] },
    { id: 'mf_05_40', code: '05-40', name: 'Cold-Formed Metal Framing', xwalkId: '', description: '', children: [
      { id: 'mf_05_40_43', code: '05-40-43', name: 'Slotted Channel Framing', xwalkId: '737,738', description: '', children: [] }
    ] },
    { id: 'mf_05_50', code: '05-50', name: 'Metal Fabrications', xwalkId: '', description: '', children: [
      { id: 'mf_05_50_50', code: '05-50-50', name: 'Metal Fabrications', xwalkId: '522,523,524,526,527,528,529', description: '', children: [] },
      { id: 'mf_05_50_51', code: '05-50-51', name: 'Metal Stairs', xwalkId: '515', description: '', children: [
        { id: 'mf_05_50_51_33', code: '05-50-51-33', name: 'Metal Ladders', xwalkId: '519', description: '', children: [] },
        { id: 'mf_05_50_51_36', code: '05-50-51-36', name: 'Metal Walkways', xwalkId: '516', description: '', children: [] }
      ] },
      { id: 'mf_05_50_52', code: '05-50-52', name: 'Metal Railings', xwalkId: '517,520,521', description: '', children: [] },
      { id: 'mf_05_50_53', code: '05-50-53', name: 'Metal Gratings', xwalkId: '518,540,541,542', description: '', children: [] },
      { id: 'mf_05_50_55', code: '05-50-55', name: 'Metal Stair Treads & Nosings', xwalkId: '', description: '', children: [
        { id: 'mf_05_50_55_16', code: '05-50-55-16', name: 'Metal Stair Nosings', xwalkId: '537,538', description: '', children: [] }
      ] },
      { id: 'mf_05_50_58', code: '05-50-58', name: 'Formed Metal Fabrications', xwalkId: '539', description: '', children: [
        { id: 'mf_05_50_58_13', code: '05-50-58-13', name: 'Column Covers', xwalkId: '752,753', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_05_70', code: '05-70', name: 'Decorative Metal', xwalkId: '', description: '', children: [
      { id: 'mf_05_70_71', code: '05-70-71', name: 'Decorative Metal Stairs', xwalkId: '577,579,580', description: '', children: [
        { id: 'mf_05_70_71_13', code: '05-70-71-13', name: 'Fabricated Metal Spiral Stairs', xwalkId: '578', description: '', children: [] }
      ] },
      { id: 'mf_05_70_73', code: '05-70-73', name: 'Decorative Metal Railings', xwalkId: '557,558,559,560,561,562,563,564,565,566,570,571,572,573,574', description: '', children: [
        { id: 'mf_05_70_73_13', code: '05-70-73-13', name: 'Glazed Decorative Metal Railings', xwalkId: '568,576', description: '', children: [] },
        { id: 'mf_05_70_73_16', code: '05-70-73-16', name: 'Wire Rope Decorative Metal Railings', xwalkId: '567,575', description: '', children: [] }
      ] },
      { id: 'mf_05_70_75', code: '05-70-75', name: 'Decorative Formed Metal', xwalkId: '581,582,750,751,754', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_06', code: '06', name: 'Wood, Plastics, & Composites', xwalkId: '', description: '', children: [
    { id: 'mf_06_10', code: '06-10', name: 'Rough Carpentry', xwalkId: '', description: '', children: [
      { id: 'mf_06_10_10', code: '06-10-10', name: 'Rough Carpentry', xwalkId: '', description: '', children: [
        { id: 'mf_06_10_10_53', code: '06-10-10-53', name: 'Miscellaneous Rough Carpentry', xwalkId: '615,616,617,618,619,620,621,622,623,624,625,626', description: '', children: [] }
      ] },
      { id: 'mf_06_10_11', code: '06-10-11', name: 'Wood Framing', xwalkId: '583,584,585,598,603,607,608,609,612,613', description: '', children: [] },
      { id: 'mf_06_10_15', code: '06-10-15', name: 'Wood Decking', xwalkId: '', description: '', children: [
        { id: 'mf_06_10_15_13', code: '06-10-15-13', name: 'Wood Floor Decking', xwalkId: '601', description: '', children: [] },
        { id: 'mf_06_10_15_16', code: '06-10-15-16', name: 'Wood Roof Decking', xwalkId: '606', description: '', children: [] },
        { id: 'mf_06_10_15_23', code: '06-10-15-23', name: 'Laminated Wood Decking', xwalkId: '640', description: '', children: [] }
      ] },
      { id: 'mf_06_10_16', code: '06-10-16', name: 'Sheathing', xwalkId: '610,614', description: '', children: [] },
      { id: 'mf_06_10_17', code: '06-10-17', name: 'Shop-Fabricated Structural Wood', xwalkId: '599,602,604', description: '', children: [
        { id: 'mf_06_10_17_53', code: '06-10-17-53', name: 'Shop-Fabricated Wood Trusses', xwalkId: '600,605', description: '', children: [] }
      ] },
      { id: 'mf_06_10_18', code: '06-10-18', name: 'Glued-Laminated Construction', xwalkId: '641,642,643,644', description: '', children: [
        { id: 'mf_06_10_18_13', code: '06-10-18-13', name: 'Glued Laminated Beams', xwalkId: '635,636,637', description: '', children: [] },
        { id: 'mf_06_10_18_16', code: '06-10-18-16', name: 'Glued Laminated Columns', xwalkId: '638,639', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_06_20', code: '06-20', name: 'Finish Carpentry', xwalkId: '', description: '', children: [
      { id: 'mf_06_20_20', code: '06-20-20', name: 'Finish Carpentry', xwalkId: '', description: '', children: [
        { id: 'mf_06_20_20_13', code: '06-20-20-13', name: 'Exterior Finish Carpentry', xwalkId: '2234,2235', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_06_40', code: '06-40', name: 'Architectural Woodwork', xwalkId: '', description: '', children: [
      { id: 'mf_06_40_40', code: '06-40-40', name: 'Architectural Woodwork', xwalkId: '2210,2211,2213,2214,2226,2231,2232,2233', description: '', children: [] },
      { id: 'mf_06_40_41', code: '06-40-41', name: 'Architectural Wood Casework', xwalkId: '2204,2205,2208,3616', description: '', children: [] },
      { id: 'mf_06_40_42', code: '06-40-42', name: 'Wood Paneling', xwalkId: '', description: '', children: [
        { id: 'mf_06_40_42_16', code: '06-40-42-16', name: 'Flush Wood Paneling', xwalkId: '2223', description: '', children: [] },
        { id: 'mf_06_40_42_19', code: '06-40-42-19', name: 'Plastic-Laminate-Faced Wood Paneling', xwalkId: '1161,1162,2224', description: '', children: [] }
      ] },
      { id: 'mf_06_40_43', code: '06-40-43', name: 'Wood Stairs & Railings', xwalkId: '', description: '', children: [
        { id: 'mf_06_40_43_16', code: '06-40-43-16', name: 'Wood Railings', xwalkId: '569,2230', description: '', children: [] }
      ] },
      { id: 'mf_06_40_46', code: '06-40-46', name: 'Wood Trim', xwalkId: '757,2227', description: '', children: [
        { id: 'mf_06_40_46_19', code: '06-40-46-19', name: 'Wood Base & Shoe Moldings', xwalkId: '2228', description: '', children: [] },
        { id: 'mf_06_40_46_23', code: '06-40-46-23', name: 'Wood Chair Rails', xwalkId: '2229', description: '', children: [] },
        { id: 'mf_06_40_46_33', code: '06-40-46-33', name: 'Wood Stops, Stools, & Sills', xwalkId: '2219,2221', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_06_60', code: '06-60', name: 'Plastic Fabrications', xwalkId: '', description: '', children: [
      { id: 'mf_06_60_64', code: '06-60-64', name: 'Plastic Paneling', xwalkId: '1097,2225', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_07', code: '07', name: 'Thermal & Moisture Protection', xwalkId: '', description: '', children: [
    { id: 'mf_07_10', code: '07-10', name: 'Dampproofing & Waterproofing', xwalkId: '', description: '', children: [
      { id: 'mf_07_10_11', code: '07-10-11', name: 'Dampproofing', xwalkId: '655', description: '', children: [] },
      { id: 'mf_07_10_13', code: '07-10-13', name: 'Sheet Waterproofing', xwalkId: '339,342,654', description: '', children: [] },
      { id: 'mf_07_10_14', code: '07-10-14', name: 'Fluid-Applied Waterproofing', xwalkId: '', description: '', children: [
        { id: 'mf_07_10_14_14', code: '07-10-14-14', name: 'Hot Fluid-Applied Polyurea Waterproofing', xwalkId: '340', description: '', children: [] },
        { id: 'mf_07_10_14_16', code: '07-10-14-16', name: 'Cold Fluid-Applied Waterproofing', xwalkId: '341', description: '', children: [] }
      ] },
      { id: 'mf_07_10_18', code: '07-10-18', name: 'Traffic Coatings', xwalkId: '', description: '', children: [
        { id: 'mf_07_10_18_13', code: '07-10-18-13', name: 'Pedestrian Traffic Coatings', xwalkId: '657', description: '', children: [] },
        { id: 'mf_07_10_18_16', code: '07-10-18-16', name: 'Vehicular Traffic Coatings', xwalkId: '658', description: '', children: [] }
      ] },
      { id: 'mf_07_10_19', code: '07-10-19', name: 'Water Repellents', xwalkId: '656', description: '', children: [] }
    ] },
    { id: 'mf_07_20', code: '07-20', name: 'Thermal Protection', xwalkId: '', description: '', children: [
      { id: 'mf_07_20_21', code: '07-20-21', name: 'Thermal Insulation', xwalkId: '695,696,697,698,991', description: '', children: [
        { id: 'mf_07_20_21_13', code: '07-20-21-13', name: 'Board Insulation', xwalkId: '682,683,684,685,686,687,688,689,690', description: '', children: [] },
        { id: 'mf_07_20_21_19', code: '07-20-21-19', name: 'Foamed-In-Place Insulation', xwalkId: '432', description: '', children: [] },
        { id: 'mf_07_20_21_26', code: '07-20-21-26', name: 'Blown Insulation', xwalkId: '699', description: '', children: [] },
        { id: 'mf_07_20_21_29', code: '07-20-21-29', name: 'Sprayed Insulation', xwalkId: '691,692,693,694', description: '', children: [] }
      ] },
      { id: 'mf_07_20_22', code: '07-20-22', name: 'Roof & Deck Insulation', xwalkId: '722', description: '', children: [] },
      { id: 'mf_07_20_24', code: '07-20-24', name: 'Exterior Insulation & Finish Systems', xwalkId: '1108,1109', description: '', children: [
        { id: 'mf_07_20_24_23', code: '07-20-24-23', name: 'Direct-Applied Finish Systems', xwalkId: '1110,1111', description: '', children: [] }
      ] },
      { id: 'mf_07_20_25', code: '07-20-25', name: 'Weather Barriers', xwalkId: '611', description: '', children: [] },
      { id: 'mf_07_20_27', code: '07-20-27', name: 'Air Barriers', xwalkId: '659', description: '', children: [] }
    ] },
    { id: 'mf_07_30', code: '07-30', name: 'Steep Slope Roofing', xwalkId: '', description: '', children: [
      { id: 'mf_07_30_31', code: '07-30-31', name: 'Shingles & Shakes', xwalkId: '711', description: '', children: [] },
      { id: 'mf_07_30_32', code: '07-30-32', name: 'Roof Tiles', xwalkId: '712', description: '', children: [] }
    ] },
    { id: 'mf_07_40', code: '07-40', name: 'Roofing & Siding Panels', xwalkId: '', description: '', children: [
      { id: 'mf_07_40_41', code: '07-40-41', name: 'Roof Panels', xwalkId: '', description: '', children: [
        { id: 'mf_07_40_41_13', code: '07-40-41-13', name: 'Metal Roof Panels', xwalkId: '748', description: '', children: [] },
        { id: 'mf_07_40_41_43', code: '07-40-41-43', name: 'Composite Roof Panels', xwalkId: '749', description: '', children: [] }
      ] },
      { id: 'mf_07_40_42', code: '07-40-42', name: 'Wall Panels', xwalkId: '', description: '', children: [
        { id: 'mf_07_40_42_13', code: '07-40-42-13', name: 'Metal Wall Panels', xwalkId: '740,741,742,743,992,993', description: '', children: [] },
        { id: 'mf_07_40_42_23', code: '07-40-42-23', name: 'Wood Wall Panels', xwalkId: '755', description: '', children: [] },
        { id: 'mf_07_40_42_43', code: '07-40-42-43', name: 'Composite Wall Panels', xwalkId: '744,745,746', description: '', children: [] }
      ] },
      { id: 'mf_07_40_46', code: '07-40-46', name: 'Siding', xwalkId: '', description: '', children: [
        { id: 'mf_07_40_46_16', code: '07-40-46-16', name: 'Aluminum Siding', xwalkId: '747', description: '', children: [] },
        { id: 'mf_07_40_46_23', code: '07-40-46-23', name: 'Wood Siding', xwalkId: '756', description: '', children: [] },
        { id: 'mf_07_40_46_46', code: '07-40-46-46', name: 'Fiber-Cement Siding', xwalkId: '767,768,769,770,771,772,773,774,775,776', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_07_50', code: '07-50', name: 'Membrane Roofing', xwalkId: '', description: '', children: [
      { id: 'mf_07_50_51', code: '07-50-51', name: 'Built-Up Bituminous Roofing', xwalkId: '713', description: '', children: [
        { id: 'mf_07_50_51_13', code: '07-50-51-13', name: 'Built-Up Asphalt Roofing', xwalkId: '714', description: '', children: [] }
      ] },
      { id: 'mf_07_50_52', code: '07-50-52', name: 'Modified Bituminous Membrane Roofing', xwalkId: '715', description: '', children: [] },
      { id: 'mf_07_50_53', code: '07-50-53', name: 'Elastomeric Membrane Roofing', xwalkId: '721', description: '', children: [] },
      { id: 'mf_07_50_54', code: '07-50-54', name: 'Thermoplastic Membrane Roofing', xwalkId: '716,717,718,719', description: '', children: [
        { id: 'mf_07_50_54_19', code: '07-50-54-19', name: 'Polyvinyl-Chloride Roofing', xwalkId: '720', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_07_60', code: '07-60', name: 'Flashing & Sheet Metal', xwalkId: '', description: '', children: [
      { id: 'mf_07_60_60', code: '07-60-60', name: 'Flashing & Sheet Metal', xwalkId: '343,990', description: '', children: [] },
      { id: 'mf_07_60_61', code: '07-60-61', name: 'Sheet Metal Roofing', xwalkId: '710', description: '', children: [] },
      { id: 'mf_07_60_62', code: '07-60-62', name: 'Sheet Metal Flashing & Trim', xwalkId: '660,723,739', description: '', children: [] },
      { id: 'mf_07_60_65', code: '07-60-65', name: 'Flexible Flashing', xwalkId: '661,727', description: '', children: [] }
    ] },
    { id: 'mf_07_70', code: '07-70', name: 'Roof & Wall Specialties & Accessories', xwalkId: '', description: '', children: [
      { id: 'mf_07_70_71', code: '07-70-71', name: 'Roof Specialties', xwalkId: '724', description: '', children: [] },
      { id: 'mf_07_70_72', code: '07-70-72', name: 'Roof Accessories', xwalkId: '725', description: '', children: [
        { id: 'mf_07_70_72_46', code: '07-70-72-46', name: 'Roof Walkways', xwalkId: '726', description: '', children: [] }
      ] },
      { id: 'mf_07_70_76', code: '07-70-76', name: 'Roof Pavers', xwalkId: '842,849,850,851,853,854,855,856,857,858', description: '', children: [
        { id: 'mf_07_70_76_13', code: '07-70-76-13', name: 'Roof Ballast Pavers', xwalkId: '852', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_07_80', code: '07-80', name: 'Fire & Smoke Protection', xwalkId: '', description: '', children: [
      { id: 'mf_07_80_81', code: '07-80-81', name: 'Applied Fire Protection', xwalkId: '777', description: '', children: [
        { id: 'mf_07_80_81_16', code: '07-80-81-16', name: 'Cementitious Fire Protection', xwalkId: '788,789,790', description: '', children: [] },
        { id: 'mf_07_80_81_19', code: '07-80-81-19', name: 'Foamed Magnesium-Oxychloride Fire Protection', xwalkId: '791,792', description: '', children: [] },
        { id: 'mf_07_80_81_23', code: '07-80-81-23', name: 'Intumescent Fire Protection', xwalkId: '793,794,795', description: '', children: [] }
      ] },
      { id: 'mf_07_80_84', code: '07-80-84', name: 'Firestopping', xwalkId: '1095', description: '', children: [
        { id: 'mf_07_80_84_13', code: '07-80-84-13', name: 'Penetration Firestopping', xwalkId: '801,802,803,804,805', description: '', children: [] },
        { id: 'mf_07_80_84_43', code: '07-80-84-43', name: 'Joint Firestopping', xwalkId: '806,807,808,989,1006', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_07_90', code: '07-90', name: 'Joint Protection', xwalkId: '', description: '', children: [
      { id: 'mf_07_90_92', code: '07-90-92', name: 'Joint Sealants', xwalkId: '662,663,664,665,666,667,668,669,670,671,672,988,1005', description: '', children: [
        { id: 'mf_07_90_92_19', code: '07-90-92-19', name: 'Acoustical Joint Sealants', xwalkId: '1152', description: '', children: [] }
      ] },
      { id: 'mf_07_90_95', code: '07-90-95', name: 'Expansion Control', xwalkId: '', description: '', children: [
        { id: 'mf_07_90_95_13', code: '07-90-95-13', name: 'Expansion Joint Cover Assemblies', xwalkId: '809,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_08', code: '08', name: 'Openings', xwalkId: '', description: '', children: [
    { id: 'mf_08_10', code: '08-10', name: 'Doors & Frames', xwalkId: '', description: '', children: [
      { id: 'mf_08_10_10', code: '08-10-10', name: 'Doors & Frames', xwalkId: '859,860,871,906', description: '', children: [] },
      { id: 'mf_08_10_11', code: '08-10-11', name: 'Metal Doors & Frames', xwalkId: '', description: '', children: [
        { id: 'mf_08_10_11_13', code: '08-10-11-13', name: 'Hollow Metal Doors & Frames', xwalkId: '872,908', description: '', children: [] },
        { id: 'mf_08_10_11_16', code: '08-10-11-16', name: 'Aluminum Doors & Frames', xwalkId: '876,912', description: '', children: [] },
        { id: 'mf_08_10_11_69', code: '08-10-11-69', name: 'Metal Storm Doors & Frames', xwalkId: '879,887,893', description: '', children: [] }
      ] },
      { id: 'mf_08_10_12', code: '08-10-12', name: 'Metal Frames', xwalkId: '', description: '', children: [
        { id: 'mf_08_10_12_13', code: '08-10-12-13', name: 'Hollow Metal Frames', xwalkId: '388,434,882,907,919,920,1087', description: '', children: [] },
        { id: 'mf_08_10_12_16', code: '08-10-12-16', name: 'Aluminum Frames', xwalkId: '884,922', description: '', children: [] }
      ] },
      { id: 'mf_08_10_13', code: '08-10-13', name: 'Metal Doors', xwalkId: '', description: '', children: [
        { id: 'mf_08_10_13_13', code: '08-10-13-13', name: 'Hollow Metal Doors', xwalkId: '888,925', description: '', children: [] },
        { id: 'mf_08_10_13_16', code: '08-10-13-16', name: 'Aluminum Doors', xwalkId: '890,927', description: '', children: [] }
      ] },
      { id: 'mf_08_10_14', code: '08-10-14', name: 'Wood Doors', xwalkId: '873,874,875,880,883,889,909,910,911,915,921,926', description: '', children: [] },
      { id: 'mf_08_10_16', code: '08-10-16', name: 'Composite Doors', xwalkId: '', description: '', children: [
        { id: 'mf_08_10_16_13', code: '08-10-16-13', name: 'Fiberglass Doors', xwalkId: '877,885,891,913,923,928', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_08_30', code: '08-30', name: 'Specialty Doors & Frames', xwalkId: '', description: '', children: [
      { id: 'mf_08_30_30', code: '08-30-30', name: 'Specialty Doors & Frames', xwalkId: '1854', description: '', children: [] },
      { id: 'mf_08_30_31', code: '08-30-31', name: 'Access Doors & Panels', xwalkId: '', description: '', children: [
        { id: 'mf_08_30_31_13', code: '08-30-31-13', name: 'Access Doors & Frames', xwalkId: '1064,1065,1066', description: '', children: [] }
      ] },
      { id: 'mf_08_30_32', code: '08-30-32', name: 'Sliding Glass Doors', xwalkId: '987', description: '', children: [] },
      { id: 'mf_08_30_33', code: '08-30-33', name: 'Coiling Doors & Grilles', xwalkId: '', description: '', children: [
        { id: 'mf_08_30_33_13', code: '08-30-33-13', name: 'Coiling Counter Doors', xwalkId: '958,962', description: '', children: [] },
        { id: 'mf_08_30_33_16', code: '08-30-33-16', name: 'Coiling Counter Grilles', xwalkId: '966', description: '', children: [] },
        { id: 'mf_08_30_33_23', code: '08-30-33-23', name: 'Overhead Coiling Doors', xwalkId: '959,963', description: '', children: [] },
        { id: 'mf_08_30_33_26', code: '08-30-33-26', name: 'Overhead Coiling Grilles', xwalkId: '967', description: '', children: [] },
        { id: 'mf_08_30_33_44', code: '08-30-33-44', name: 'Overhead Coiling Fire Curtains', xwalkId: '945', description: '', children: [] }
      ] },
      { id: 'mf_08_30_34', code: '08-30-34', name: 'Special Function Doors', xwalkId: '', description: '', children: [
        { id: 'mf_08_30_34_53', code: '08-30-34-53', name: 'Security Doors & Frames', xwalkId: '918', description: '', children: [] },
        { id: 'mf_08_30_34_73', code: '08-30-34-73', name: 'Sound Control Door Assemblies', xwalkId: '878,886,892,914,924,929', description: '', children: [] }
      ] },
      { id: 'mf_08_30_35', code: '08-30-35', name: 'Folding Doors & Grilles', xwalkId: '', description: '', children: [
        { id: 'mf_08_30_35_13', code: '08-30-35-13', name: 'Folding Doors', xwalkId: '946,947,948,949,950,951,1526,1527', description: '', children: [] }
      ] },
      { id: 'mf_08_30_36', code: '08-30-36', name: 'Panel Doors', xwalkId: '', description: '', children: [
        { id: 'mf_08_30_36_13', code: '08-30-36-13', name: 'Sectional Doors', xwalkId: '960,961,964,965', description: '', children: [] }
      ] },
      { id: 'mf_08_30_38', code: '08-30-38', name: 'Traffic Doors', xwalkId: '917', description: '', children: [] }
    ] },
    { id: 'mf_08_40', code: '08-40', name: 'Entrances, Storefronts, & Curtain Walls', xwalkId: '', description: '', children: [
      { id: 'mf_08_40_40', code: '08-40-40', name: 'Entrances, Storefronts, & Curtain Walls', xwalkId: '978,979,981,982,994,995,996,998,999', description: '', children: [] },
      { id: 'mf_08_40_42', code: '08-40-42', name: 'Entrances', xwalkId: '', description: '', children: [
        { id: 'mf_08_40_42_29', code: '08-40-42-29', name: 'Automatic Entrances', xwalkId: '1020,1022', description: '', children: [] }
      ] },
      { id: 'mf_08_40_43', code: '08-40-43', name: 'Storefronts', xwalkId: '', description: '', children: [
        { id: 'mf_08_40_43_29', code: '08-40-43-29', name: 'Sliding Storefronts', xwalkId: '1528,1529', description: '', children: [] }
      ] },
      { id: 'mf_08_40_45', code: '08-40-45', name: 'Translucent Wall & Roof Assemblies', xwalkId: '', description: '', children: [
        { id: 'mf_08_40_45_13', code: '08-40-45-13', name: 'Structured-Polycarbonate-Panel Assemblies', xwalkId: '1030,1031,1032', description: '', children: [] },
        { id: 'mf_08_40_45_23', code: '08-40-45-23', name: 'Fiberglass-Sandwich-Panel Assemblies', xwalkId: '1033,1034', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_08_50', code: '08-50', name: 'Windows', xwalkId: '', description: '', children: [
      { id: 'mf_08_50_51', code: '08-50-51', name: 'Metal Windows', xwalkId: '', description: '', children: [
        { id: 'mf_08_50_51_66', code: '08-50-51-66', name: 'Metal Window Screens', xwalkId: '983', description: '', children: [] }
      ] },
      { id: 'mf_08_50_53', code: '08-50-53', name: 'Plastic Windows', xwalkId: '', description: '', children: [
        { id: 'mf_08_50_53_13', code: '08-50-53-13', name: 'Vinyl Windows', xwalkId: '1017', description: '', children: [] }
      ] },
      { id: 'mf_08_50_56', code: '08-50-56', name: 'Special Function Windows', xwalkId: '980,997,1003,1018,1019', description: '', children: [
        { id: 'mf_08_50_56_73', code: '08-50-56-73', name: 'Sound Control Windows', xwalkId: '1004', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_08_60', code: '08-60', name: 'Roof Windows & Skylights', xwalkId: '', description: '', children: [
      { id: 'mf_08_60_62', code: '08-60-62', name: 'Unit Skylights', xwalkId: '', description: '', children: [
        { id: 'mf_08_60_62_13', code: '08-60-62-13', name: 'Domed Unit Skylights', xwalkId: '1035', description: '', children: [] },
        { id: 'mf_08_60_62_16', code: '08-60-62-16', name: 'Pyramidal Unit Skylights', xwalkId: '1036', description: '', children: [] },
        { id: 'mf_08_60_62_23', code: '08-60-62-23', name: 'Tubular Skylights', xwalkId: '1037,1038', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_08_70', code: '08-70', name: 'Hardware', xwalkId: '', description: '', children: [
      { id: 'mf_08_70_71', code: '08-70-71', name: 'Door Hardware', xwalkId: '861,862,881,894,895,896,897,898,899,900,901,902,903,904,905,916,930,931,932,933,934,935,936,937,938,939,986,1002', description: '', children: [
        { id: 'mf_08_70_71_13', code: '08-70-71-13', name: 'Automatic Door Operators', xwalkId: '1021,1023', description: '', children: [] }
      ] },
      { id: 'mf_08_70_74', code: '08-70-74', name: 'Non-Integrated Access Control Hardware', xwalkId: '2870', description: '', children: [] }
    ] },
    { id: 'mf_08_80', code: '08-80', name: 'Glazing', xwalkId: '', description: '', children: [
      { id: 'mf_08_80_80', code: '08-80-80', name: 'Glazing', xwalkId: '984,985,1000,1001,1008,1010', description: '', children: [] },
      { id: 'mf_08_80_83', code: '08-80-83', name: 'Mirrors', xwalkId: '1009', description: '', children: [] },
      { id: 'mf_08_80_87', code: '08-80-87', name: 'Glazing Surface Films', xwalkId: '1012,1013', description: '', children: [] },
      { id: 'mf_08_80_88', code: '08-80-88', name: 'Special Function Glazing', xwalkId: '', description: '', children: [
        { id: 'mf_08_80_88_53', code: '08-80-88-53', name: 'Security Glazing', xwalkId: '2134', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_08_90', code: '08-90', name: 'Louvers & Vents', xwalkId: '', description: '', children: [
      { id: 'mf_08_90_90', code: '08-90-90', name: 'Louvers & Vents', xwalkId: '2678', description: '', children: [] },
      { id: 'mf_08_90_91', code: '08-90-91', name: 'Louvers', xwalkId: '', description: '', children: [
        { id: 'mf_08_90_91_16', code: '08-90-91-16', name: 'Operable Wall Louvers', xwalkId: '1047,1048', description: '', children: [] },
        { id: 'mf_08_90_91_19', code: '08-90-91-19', name: 'Fixed Louvers', xwalkId: '1045,1046,1049,1050,1051', description: '', children: [] }
      ] },
      { id: 'mf_08_90_92', code: '08-90-92', name: 'Louvered Equipment Enclosures', xwalkId: '1052,1053,1054,1055,1056', description: '', children: [] },
      { id: 'mf_08_90_95', code: '08-90-95', name: 'Vents', xwalkId: '', description: '', children: [
        { id: 'mf_08_90_95_13', code: '08-90-95-13', name: 'Soffit Vents', xwalkId: '1057', description: '', children: [] },
        { id: 'mf_08_90_95_16', code: '08-90-95-16', name: 'Wall Vents', xwalkId: '1058', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_09', code: '09', name: 'Finishes', xwalkId: '', description: '', children: [
    { id: 'mf_09_00', code: '09-00', name: 'Finishes', xwalkId: '', description: '', children: [
      { id: 'mf_09_00_05', code: '09-00-05', name: 'Common Work Results for Finishes', xwalkId: '', description: '', children: [
        { id: 'mf_09_00_05_61', code: '09-00-05-61', name: 'Common Work Results for Flooring Preparation', xwalkId: '3639,3641', description: '', children: [] },
        { id: 'mf_09_00_05_71', code: '09-00-05-71', name: 'Acoustic Underlayment', xwalkId: '335,336', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_20', code: '09-20', name: 'Plaster & Gypsum Board', xwalkId: '', description: '', children: [
      { id: 'mf_09_20_21', code: '09-20-21', name: 'Plaster & Gypsum Board Assemblies', xwalkId: '', description: '', children: [
        { id: 'mf_09_20_21_16', code: '09-20-21-16', name: 'Gypsum Board Assemblies', xwalkId: '1082,1083,1084,1086,1088,1091', description: '', children: [] }
      ] },
      { id: 'mf_09_20_22', code: '09-20-22', name: 'Supports for Plaster & Gypsum Board', xwalkId: '', description: '', children: [
        { id: 'mf_09_20_22_16', code: '09-20-22-16', name: 'Non-Structural Metal Framing', xwalkId: '1067,1077,1078,1079,1080,1081,1089,1090', description: '', children: [] }
      ] },
      { id: 'mf_09_20_23', code: '09-20-23', name: 'Gypsum Plastering', xwalkId: '', description: '', children: [
        { id: 'mf_09_20_23_13', code: '09-20-23-13', name: 'Acoustical Gypsum Plastering', xwalkId: '1115', description: '', children: [] }
      ] },
      { id: 'mf_09_20_24', code: '09-20-24', name: 'Cement Plastering', xwalkId: '1113,1114,1116,1117', description: '', children: [
        { id: 'mf_09_20_24_23', code: '09-20-24-23', name: 'Cement Stucco', xwalkId: '1106,1107', description: '', children: [] }
      ] },
      { id: 'mf_09_20_27', code: '09-20-27', name: 'Plaster Fabrications', xwalkId: '1112', description: '', children: [
        { id: 'mf_09_20_27_13', code: '09-20-27-13', name: 'Glass-Fiber-Reinforced Gypsum Fabrications', xwalkId: '1096', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_30', code: '09-30', name: 'Tiling', xwalkId: '', description: '', children: [
      { id: 'mf_09_30_30', code: '09-30-30', name: 'Tiling', xwalkId: '1176,1181,1182,1183,1187,1193,1194,1195,1196,1197,1198,1199,1200,1201', description: '', children: [
        { id: 'mf_09_30_30_13', code: '09-30-30-13', name: 'Ceramic Tiling', xwalkId: '1177,1184', description: '', children: [] },
        { id: 'mf_09_30_30_16', code: '09-30-30-16', name: 'Quarry Tiling', xwalkId: '1178,1185', description: '', children: [] },
        { id: 'mf_09_30_30_23', code: '09-30-30-23', name: 'Glass Mosaic Tiling', xwalkId: '1180', description: '', children: [] },
        { id: 'mf_09_30_30_33', code: '09-30-30-33', name: 'Stone Tiling', xwalkId: '1179,1186,1188,1189,1190,1191,1192', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_50', code: '09-50', name: 'Ceilings', xwalkId: '', description: '', children: [
      { id: 'mf_09_50_51', code: '09-50-51', name: 'Acoustical Ceilings', xwalkId: '1153', description: '', children: [
        { id: 'mf_09_50_51_13', code: '09-50-51-13', name: 'Acoustical Panel Ceilings', xwalkId: '1128', description: '', children: [] },
        { id: 'mf_09_50_51_14', code: '09-50-51-14', name: 'Acoustical Fabric-Faced Panel Ceilings', xwalkId: '1131', description: '', children: [] },
        { id: 'mf_09_50_51_23', code: '09-50-51-23', name: 'Acoustical Tile Ceilings', xwalkId: '1129,1130', description: '', children: [] },
        { id: 'mf_09_50_51_26', code: '09-50-51-26', name: 'Acoustical Wood Ceilings', xwalkId: '1132', description: '', children: [] },
        { id: 'mf_09_50_51_33', code: '09-50-51-33', name: 'Acoustical Metal Pan Ceilings', xwalkId: '1133', description: '', children: [] }
      ] },
      { id: 'mf_09_50_54', code: '09-50-54', name: 'Specialty Ceilings', xwalkId: '1137', description: '', children: [
        { id: 'mf_09_50_54_13', code: '09-50-54-13', name: 'Open Metal Mesh Ceilings', xwalkId: '1134', description: '', children: [] },
        { id: 'mf_09_50_54_21', code: '09-50-54-21', name: 'Metal Pan Ceilings', xwalkId: '1135', description: '', children: [] },
        { id: 'mf_09_50_54_23', code: '09-50-54-23', name: 'Linear Metal Ceilings', xwalkId: '1136', description: '', children: [] },
        { id: 'mf_09_50_54_26', code: '09-50-54-26', name: 'Suspended Wood Ceilings', xwalkId: '1138,1139', description: '', children: [] },
        { id: 'mf_09_50_54_29', code: '09-50-54-29', name: 'Suspended Plastic Ceilings', xwalkId: '1140', description: '', children: [] },
        { id: 'mf_09_50_54_33', code: '09-50-54-33', name: 'Decorative Panel Ceilings', xwalkId: '1141', description: '', children: [] },
        { id: 'mf_09_50_54_53', code: '09-50-54-53', name: 'Fiberglass Reinforced Panel Ceilings', xwalkId: '1142', description: '', children: [] }
      ] },
      { id: 'mf_09_50_56', code: '09-50-56', name: 'Textured Ceilings', xwalkId: '1143', description: '', children: [] },
      { id: 'mf_09_50_57', code: '09-50-57', name: 'Special Function Ceilings', xwalkId: '', description: '', children: [
        { id: 'mf_09_50_57_53', code: '09-50-57-53', name: 'Security Ceiling Assemblies', xwalkId: '1144,2135,2136', description: '', children: [] }
      ] },
      { id: 'mf_09_50_58', code: '09-50-58', name: 'Integrated Ceiling Assemblies', xwalkId: '1145', description: '', children: [] }
    ] },
    { id: 'mf_09_60', code: '09-60', name: 'Flooring', xwalkId: '', description: '', children: [
      { id: 'mf_09_60_61', code: '09-60-61', name: 'Flooring Treatment', xwalkId: '345', description: '', children: [
        { id: 'mf_09_60_61_19', code: '09-60-61-19', name: 'Concrete Floor Staining', xwalkId: '1311', description: '', children: [] }
      ] },
      { id: 'mf_09_60_62', code: '09-60-62', name: 'Specialty Flooring', xwalkId: '', description: '', children: [
        { id: 'mf_09_60_62_83', code: '09-60-62-83', name: 'Structural Glass Flooring', xwalkId: '3614', description: '', children: [] }
      ] },
      { id: 'mf_09_60_64', code: '09-60-64', name: 'Wood Flooring', xwalkId: '1235,1236,1237,1238,1239,1240,1241,1242,1243,1244', description: '', children: [
        { id: 'mf_09_60_64_66', code: '09-60-64-66', name: 'Wood Athletic Flooring', xwalkId: '1255,1259,1262,1263,1264', description: '', children: [] }
      ] },
      { id: 'mf_09_60_65', code: '09-60-65', name: 'Resilient Flooring', xwalkId: '1219,1226,1227,1228', description: '', children: [
        { id: 'mf_09_60_65_13', code: '09-60-65-13', name: 'Resilient Base & Accessories', xwalkId: '1223,1224,1225', description: '', children: [] },
        { id: 'mf_09_60_65_16', code: '09-60-65-16', name: 'Resilient Sheet Flooring', xwalkId: '1215,1216', description: '', children: [] },
        { id: 'mf_09_60_65_19', code: '09-60-65-19', name: 'Resilient Tile Flooring', xwalkId: '1212,1213,1214', description: '', children: [] },
        { id: 'mf_09_60_65_36', code: '09-60-65-36', name: 'Static-Control Resilient Flooring', xwalkId: '1217,3634', description: '', children: [] },
        { id: 'mf_09_60_65_43', code: '09-60-65-43', name: 'Linoleum Flooring', xwalkId: '1218', description: '', children: [] },
        { id: 'mf_09_60_65_66', code: '09-60-65-66', name: 'Resilient Athletic Flooring', xwalkId: '1253,1254,1257,1258,1260,1261', description: '', children: [] }
      ] },
      { id: 'mf_09_60_66', code: '09-60-66', name: 'Terrazzo Flooring', xwalkId: '1274,1279,1280,1281,1282,1283,1284', description: '', children: [
        { id: 'mf_09_60_66_13', code: '09-60-66-13', name: 'Portland Cement Terrazzo Flooring', xwalkId: '1272', description: '', children: [] },
        { id: 'mf_09_60_66_16', code: '09-60-66-16', name: 'Terrazzo Floor Tile', xwalkId: '1275,1276,1277,1278', description: '', children: [] },
        { id: 'mf_09_60_66_23', code: '09-60-66-23', name: 'Resinous Matrix Terrazzo Flooring', xwalkId: '1273', description: '', children: [] }
      ] },
      { id: 'mf_09_60_67', code: '09-60-67', name: 'Fluid-Applied Flooring', xwalkId: '', description: '', children: [
        { id: 'mf_09_60_67_13', code: '09-60-67-13', name: 'Elastomeric Liquid Flooring', xwalkId: '1295', description: '', children: [] },
        { id: 'mf_09_60_67_16', code: '09-60-67-16', name: 'Epoxy-Marble Chip Flooring', xwalkId: '1296', description: '', children: [] },
        { id: 'mf_09_60_67_19', code: '09-60-67-19', name: 'Magnesium-Oxychloride Flooring', xwalkId: '1297', description: '', children: [] },
        { id: 'mf_09_60_67_23', code: '09-60-67-23', name: 'Resinous Flooring', xwalkId: '1292,1293,1294,1299,1300,1301', description: '', children: [] },
        { id: 'mf_09_60_67_26', code: '09-60-67-26', name: 'Quartz Flooring', xwalkId: '1298', description: '', children: [] },
        { id: 'mf_09_60_67_66', code: '09-60-67-66', name: 'Fluid-Applied Athletic Flooring', xwalkId: '1256', description: '', children: [] }
      ] },
      { id: 'mf_09_60_68', code: '09-60-68', name: 'Carpeting', xwalkId: '1222', description: '', children: [
        { id: 'mf_09_60_68_13', code: '09-60-68-13', name: 'Tile Carpeting', xwalkId: '1220,3635', description: '', children: [] },
        { id: 'mf_09_60_68_16', code: '09-60-68-16', name: 'Sheet Carpeting', xwalkId: '1221', description: '', children: [] }
      ] },
      { id: 'mf_09_60_69', code: '09-60-69', name: 'Access Flooring', xwalkId: '3617,3629,3630,3631,3632,3640', description: '', children: [
        { id: 'mf_09_60_69_53', code: '09-60-69-53', name: 'Access Flooring Accessories', xwalkId: '3636,3637,3638', description: '', children: [] },
        { id: 'mf_09_60_69_56', code: '09-60-69-56', name: 'Access Flooring Stairs & Stringers', xwalkId: '3626,3627,3628', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_70', code: '09-70', name: 'Wall Finishes', xwalkId: '', description: '', children: [
      { id: 'mf_09_70_70', code: '09-70-70', name: 'Wall Finishes', xwalkId: '1092,1093', description: '', children: [] },
      { id: 'mf_09_70_72', code: '09-70-72', name: 'Wall Coverings', xwalkId: '1364,1365,1366,1367,1368,1369', description: '', children: [
        { id: 'mf_09_70_72_16', code: '09-70-72-16', name: 'Vinyl-Coated Fabric Wall Coverings', xwalkId: '1516', description: '', children: [] },
        { id: 'mf_09_70_72_19', code: '09-70-72-19', name: 'Textile Wall Coverings', xwalkId: '1517', description: '', children: [] }
      ] },
      { id: 'mf_09_70_73', code: '09-70-73', name: 'Wall Carpeting', xwalkId: '1518', description: '', children: [] },
      { id: 'mf_09_70_74', code: '09-70-74', name: 'Flexible Wood Sheets', xwalkId: '', description: '', children: [
        { id: 'mf_09_70_74_13', code: '09-70-74-13', name: 'Wood Wall Coverings', xwalkId: '1370', description: '', children: [] }
      ] },
      { id: 'mf_09_70_77', code: '09-70-77', name: 'Special Wall Surfacing', xwalkId: '', description: '', children: [
        { id: 'mf_09_70_77_23', code: '09-70-77-23', name: 'Fabric-Wrapped Panels', xwalkId: '1147,1151', description: '', children: [] }
      ] },
      { id: 'mf_09_70_78', code: '09-70-78', name: 'Interior Wall Paneling', xwalkId: '1163,1166,2138', description: '', children: [
        { id: 'mf_09_70_78_13', code: '09-70-78-13', name: 'Metal Interior Wall Paneling', xwalkId: '1164,1165', description: '', children: [] },
        { id: 'mf_09_70_78_26', code: '09-70-78-26', name: 'Plastic Interior Wall Paneling', xwalkId: '1519', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_80', code: '09-80', name: 'Acoustic Treatment', xwalkId: '', description: '', children: [
      { id: 'mf_09_80_80', code: '09-80-80', name: 'Acoustic Treatment', xwalkId: '1094', description: '', children: [] },
      { id: 'mf_09_80_81', code: '09-80-81', name: 'Acoustic Insulation', xwalkId: '1085', description: '', children: [] },
      { id: 'mf_09_80_84', code: '09-80-84', name: 'Acoustic Room Components', xwalkId: '', description: '', children: [
        { id: 'mf_09_80_84_13', code: '09-80-84-13', name: 'Fixed Sound-Absorptive Panels', xwalkId: '1146', description: '', children: [] },
        { id: 'mf_09_80_84_14', code: '09-80-84-14', name: 'Acoustic Stretched-Fabric Wall Systems', xwalkId: '1148', description: '', children: [] },
        { id: 'mf_09_80_84_33', code: '09-80-84-33', name: 'Sound-Absorbing Wall Units', xwalkId: '1149', description: '', children: [] },
        { id: 'mf_09_80_84_36', code: '09-80-84-36', name: 'Sound-Absorbing Ceiling Units', xwalkId: '1150', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_09_90', code: '09-90', name: 'Painting & Coating', xwalkId: '', description: '', children: [
      { id: 'mf_09_90_91', code: '09-90-91', name: 'Painting', xwalkId: '', description: '', children: [
        { id: 'mf_09_90_91_13', code: '09-90-91-13', name: 'Exterior Painting', xwalkId: '1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1354,1355,1356,1357', description: '', children: [] },
        { id: 'mf_09_90_91_23', code: '09-90-91-23', name: 'Interior Painting', xwalkId: '1315,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353', description: '', children: [] }
      ] },
      { id: 'mf_09_90_96', code: '09-90-96', name: 'High-Performance Coatings', xwalkId: '', description: '', children: [
        { id: 'mf_09_90_96_13', code: '09-90-96-13', name: 'Abrasion-Resistant Coatings', xwalkId: '1358', description: '', children: [] },
        { id: 'mf_09_90_96_23', code: '09-90-96-23', name: 'Graffiti-Resistant Coatings', xwalkId: '1359', description: '', children: [] },
        { id: 'mf_09_90_96_53', code: '09-90-96-53', name: 'Elastomeric Coatings', xwalkId: '1360', description: '', children: [] },
        { id: 'mf_09_90_96_56', code: '09-90-96-56', name: 'Epoxy Coatings', xwalkId: '3633', description: '', children: [] }
      ] },
      { id: 'mf_09_90_97', code: '09-90-97', name: 'Special Coatings', xwalkId: '1361,1362,1363', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_10', code: '10', name: 'Specialties', xwalkId: '', description: '', children: [
    { id: 'mf_10_10', code: '10-10', name: 'Information Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_10_11', code: '10-10-11', name: 'Visual Display Units', xwalkId: '1424', description: '', children: [
        { id: 'mf_10_10_11_13', code: '10-10-11-13', name: 'Chalkboards', xwalkId: '1406', description: '', children: [] },
        { id: 'mf_10_10_11_16', code: '10-10-11-16', name: 'Markerboards', xwalkId: '1398,1399,1400,1401,1402,1403,1404,1405,1407,1418,1419,1520', description: '', children: [] },
        { id: 'mf_10_10_11_23', code: '10-10-11-23', name: 'Tackboards', xwalkId: '1411,1412,1413,1414,1415,1416,1417,1420,1521', description: '', children: [] },
        { id: 'mf_10_10_11_33', code: '10-10-11-33', name: 'Sliding Visual Display Units', xwalkId: '1408,1409,1410', description: '', children: [] },
        { id: 'mf_10_10_11_39', code: '10-10-11-39', name: 'Visual Display Rails', xwalkId: '1423', description: '', children: [] }
      ] },
      { id: 'mf_10_10_12', code: '10-10-12', name: 'Display Cases', xwalkId: '1007,1421,1422', description: '', children: [] },
      { id: 'mf_10_10_13', code: '10-10-13', name: 'Directories', xwalkId: '1446', description: '', children: [] },
      { id: 'mf_10_10_14', code: '10-10-14', name: 'Signage', xwalkId: '1425,1432,1436,1455,1456', description: '', children: [
        { id: 'mf_10_10_14_16', code: '10-10-14-16', name: 'Plaques', xwalkId: '1445', description: '', children: [] },
        { id: 'mf_10_10_14_19', code: '10-10-14-19', name: 'Dimensional Letter Signage', xwalkId: '1435,1437,1438,1439,1440,1441,1442,1443,1444,1447,1448,1449,1450,1451,1452,1453,1454', description: '', children: [] },
        { id: 'mf_10_10_14_26', code: '10-10-14-26', name: 'Post & Panel/Pylon Signage', xwalkId: '1434', description: '', children: [] },
        { id: 'mf_10_10_14_53', code: '10-10-14-53', name: 'Traffic Signage', xwalkId: '3145,3605', description: '', children: [] },
        { id: 'mf_10_10_14_63', code: '10-10-14-63', name: 'Electronic Message Signage', xwalkId: '1433', description: '', children: [] }
      ] },
      { id: 'mf_10_10_17', code: '10-10-17', name: 'Telephone Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_10_10_17_16', code: '10-10-17-16', name: 'Telephone Enclosures', xwalkId: '1390', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_10_20', code: '10-20', name: 'Interior Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_20_21', code: '10-20-21', name: 'Compartments & Cubicles', xwalkId: '', description: '', children: [
        { id: 'mf_10_20_21_13', code: '10-20-21-13', name: 'Toilet Compartments', xwalkId: '1463,1465', description: '', children: [] },
        { id: 'mf_10_20_21_16', code: '10-20-21-16', name: 'Shower & Dressing Compartments', xwalkId: '1464', description: '', children: [] },
        { id: 'mf_10_20_21_23', code: '10-20-21-23', name: 'Cubicle Curtains & Track', xwalkId: '1490,1491,1492', description: '', children: [] }
      ] },
      { id: 'mf_10_20_22', code: '10-20-22', name: 'Partitions', xwalkId: '', description: '', children: [
        { id: 'mf_10_20_22_13', code: '10-20-22-13', name: 'Wire Mesh Partitions', xwalkId: '1499,1500,1501,1502,1503,1504,1505,2139', description: '', children: [] },
        { id: 'mf_10_20_22_33', code: '10-20-22-33', name: 'Accordion Folding Partitions', xwalkId: '1525', description: '', children: [] },
        { id: 'mf_10_20_22_39', code: '10-20-22-39', name: 'Folding Panel Partitions', xwalkId: '1015,1016,1512,1513,1514,1515,1522,1523,1524', description: '', children: [] }
      ] },
      { id: 'mf_10_20_25', code: '10-20-25', name: 'Service Walls', xwalkId: '', description: '', children: [
        { id: 'mf_10_20_25_13', code: '10-20-25-13', name: 'Patient Bed Service Walls', xwalkId: '1378', description: '', children: [] }
      ] },
      { id: 'mf_10_20_26', code: '10-20-26', name: 'Wall & Door Protection', xwalkId: '1855,1856,1857,1858', description: '', children: [
        { id: 'mf_10_20_26_13', code: '10-20-26-13', name: 'Corner Guards', xwalkId: '1535,1536', description: '', children: [] },
        { id: 'mf_10_20_26_16', code: '10-20-26-16', name: 'Bumper Guards', xwalkId: '1537,1538,1539', description: '', children: [] },
        { id: 'mf_10_20_26_23', code: '10-20-26-23', name: 'Protective Wall Covering', xwalkId: '1540,1541', description: '', children: [] },
        { id: 'mf_10_20_26_41', code: '10-20-26-41', name: 'Ballistics Resistant Panels', xwalkId: '1098', description: '', children: [] }
      ] },
      { id: 'mf_10_20_28', code: '10-20-28', name: 'Toilet, Bath, & Laundry Accessories', xwalkId: '', description: '', children: [
        { id: 'mf_10_20_28_13', code: '10-20-28-13', name: 'Toilet Accessories', xwalkId: '1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1480,1485,1486,1487,1488', description: '', children: [] },
        { id: 'mf_10_20_28_16', code: '10-20-28-16', name: 'Bath Accessories', xwalkId: '1478', description: '', children: [] },
        { id: 'mf_10_20_28_19', code: '10-20-28-19', name: 'Tub & Shower Enclosures', xwalkId: '1011,1479', description: '', children: [] },
        { id: 'mf_10_20_28_26', code: '10-20-28-26', name: 'Hygiene & Custodial Accessories', xwalkId: '1481,1482,1483,1484', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_10_30', code: '10-30', name: 'Fireplaces & Stoves', xwalkId: '', description: '', children: [
      { id: 'mf_10_30_31', code: '10-30-31', name: 'Manufactured Fireplaces', xwalkId: '1660,1661,1662,1663,1665,1667', description: '', children: [
        { id: 'mf_10_30_31_13', code: '10-30-31-13', name: 'Manufactured Fireplace Chimneys', xwalkId: '1666', description: '', children: [] }
      ] },
      { id: 'mf_10_30_35', code: '10-30-35', name: 'Stoves', xwalkId: '1664', description: '', children: [] }
    ] },
    { id: 'mf_10_40', code: '10-40', name: 'Safety Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_40_41', code: '10-40-41', name: 'Emergency Access & Information Cabinets', xwalkId: '', description: '', children: [
        { id: 'mf_10_40_41_16', code: '10-40-41-16', name: 'Emergency Key Cabinets', xwalkId: '1546,1547,1548,1549,1550', description: '', children: [] }
      ] },
      { id: 'mf_10_40_43', code: '10-40-43', name: 'Emergency Aid Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_10_40_43_13', code: '10-40-43-13', name: 'Defibrillator Cabinets', xwalkId: '1551', description: '', children: [] },
        { id: 'mf_10_40_43_16', code: '10-40-43-16', name: 'First Aid Cabinets', xwalkId: '1552,1554', description: '', children: [] },
        { id: 'mf_10_40_43_21', code: '10-40-43-21', name: 'Accessibility Evacuation Chairs', xwalkId: '1553', description: '', children: [] }
      ] },
      { id: 'mf_10_40_44', code: '10-40-44', name: 'Fire Protection Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_10_40_44_13', code: '10-40-44-13', name: 'Fire Protection Cabinets', xwalkId: '1555,1557', description: '', children: [] },
        { id: 'mf_10_40_44_16', code: '10-40-44-16', name: 'Fire Extinguishers', xwalkId: '1556,1559', description: '', children: [] },
        { id: 'mf_10_40_44_19', code: '10-40-44-19', name: 'Fire Blankets', xwalkId: '1558', description: '', children: [] },
        { id: 'mf_10_40_44_43', code: '10-40-44-43', name: 'Fire Extinguisher Accessories', xwalkId: '1560', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_10_50', code: '10-50', name: 'Storage Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_50_51', code: '10-50-51', name: 'Lockers', xwalkId: '1588,1589,1590,1759', description: '', children: [
        { id: 'mf_10_50_51_13', code: '10-50-51-13', name: 'Metal Lockers', xwalkId: '1566,1567,1568,1569,1570,1571,1577,1578,1579,1580', description: '', children: [] },
        { id: 'mf_10_50_51_16', code: '10-50-51-16', name: 'Wood Lockers', xwalkId: '1572', description: '', children: [] },
        { id: 'mf_10_50_51_23', code: '10-50-51-23', name: 'Plastic-Laminate-Clad Lockers', xwalkId: '1573', description: '', children: [] },
        { id: 'mf_10_50_51_26', code: '10-50-51-26', name: 'Plastic Lockers', xwalkId: '1574', description: '', children: [] },
        { id: 'mf_10_50_51_29', code: '10-50-51-29', name: 'Phenolic Lockers', xwalkId: '1575', description: '', children: [] },
        { id: 'mf_10_50_51_43', code: '10-50-51-43', name: 'Wire Mesh Storage Lockers', xwalkId: '1576', description: '', children: [] },
        { id: 'mf_10_50_51_53', code: '10-50-51-53', name: 'Locker Room Benches', xwalkId: '1581,1582,1583,1584,1585,1586,1587', description: '', children: [] }
      ] },
      { id: 'mf_10_50_55', code: '10-50-55', name: 'Postal Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_10_50_55_16', code: '10-50-55-16', name: 'Mail Collection Boxes', xwalkId: '1652', description: '', children: [] },
        { id: 'mf_10_50_55_23', code: '10-50-55-23', name: 'Mail Boxes', xwalkId: '1651', description: '', children: [] },
        { id: 'mf_10_50_55_26', code: '10-50-55-26', name: 'Parcel Lockers', xwalkId: '1653', description: '', children: [] }
      ] },
      { id: 'mf_10_50_56', code: '10-50-56', name: 'Storage Assemblies', xwalkId: '1602,1603', description: '', children: [
        { id: 'mf_10_50_56_13', code: '10-50-56-13', name: 'Metal Storage Shelving', xwalkId: '1596', description: '', children: [] },
        { id: 'mf_10_50_56_17', code: '10-50-56-17', name: 'Wall-Mounted Standards & Shelving', xwalkId: '1597', description: '', children: [] },
        { id: 'mf_10_50_56_23', code: '10-50-56-23', name: 'Wire Storage Shelving', xwalkId: '1598', description: '', children: [] },
        { id: 'mf_10_50_56_26', code: '10-50-56-26', name: 'Mobile Storage Shelving', xwalkId: '1599', description: '', children: [] },
        { id: 'mf_10_50_56_29', code: '10-50-56-29', name: 'Storage Racks', xwalkId: '1600,1601', description: '', children: [] }
      ] },
      { id: 'mf_10_50_57', code: '10-50-57', name: 'Wardrobe & Closet Specialties', xwalkId: '2207', description: '', children: [] }
    ] },
    { id: 'mf_10_70', code: '10-70', name: 'Exterior Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_70_71', code: '10-70-71', name: 'Exterior Protection', xwalkId: '', description: '', children: [
        { id: 'mf_10_70_71_13', code: '10-70-71-13', name: 'Exterior Sun Control Devices', xwalkId: '1014,1620,1621', description: '', children: [] }
      ] },
      { id: 'mf_10_70_73', code: '10-70-73', name: 'Protective Covers', xwalkId: '', description: '', children: [
        { id: 'mf_10_70_73_13', code: '10-70-73-13', name: 'Awnings', xwalkId: '1610,1611,1626', description: '', children: [] },
        { id: 'mf_10_70_73_16', code: '10-70-73-16', name: 'Canopies', xwalkId: '1612,1613,1614,1622,1623,1624,1625,1627', description: '', children: [] },
        { id: 'mf_10_70_73_23', code: '10-70-73-23', name: 'Car Shelters', xwalkId: '1616,1617,1673,1674,1675', description: '', children: [] },
        { id: 'mf_10_70_73_26', code: '10-70-73-26', name: 'Walkway Coverings', xwalkId: '1618,1619,1628', description: '', children: [] },
        { id: 'mf_10_70_73_43', code: '10-70-73-43', name: 'Transportation Stop Shelters', xwalkId: '1615', description: '', children: [] }
      ] },
      { id: 'mf_10_70_75', code: '10-70-75', name: 'Flagpoles', xwalkId: '1643,1645', description: '', children: [
        { id: 'mf_10_70_75_13', code: '10-70-75-13', name: 'Automatic Flagpoles', xwalkId: '1637', description: '', children: [] },
        { id: 'mf_10_70_75_16', code: '10-70-75-16', name: 'Ground-Set Flagpoles', xwalkId: '1634,1635,1636', description: '', children: [] },
        { id: 'mf_10_70_75_19', code: '10-70-75-19', name: 'Nautical Flagpoles', xwalkId: '1638', description: '', children: [] },
        { id: 'mf_10_70_75_23', code: '10-70-75-23', name: 'Wall-Mounted Flagpoles', xwalkId: '1639', description: '', children: [] },
        { id: 'mf_10_70_75_26', code: '10-70-75-26', name: 'Roof-Mounted Flagpoles', xwalkId: '1640', description: '', children: [] },
        { id: 'mf_10_70_75_29', code: '10-70-75-29', name: 'Plaza-Mounted Flagpoles', xwalkId: '1641', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_10_80', code: '10-80', name: 'Other Specialties', xwalkId: '', description: '', children: [
      { id: 'mf_10_80_81', code: '10-80-81', name: 'Pest Control Devices', xwalkId: '', description: '', children: [
        { id: 'mf_10_80_81_13', code: '10-80-81-13', name: 'Bird Control Devices', xwalkId: '1385', description: '', children: [] }
      ] },
      { id: 'mf_10_80_83', code: '10-80-83', name: 'Flags & Banners', xwalkId: '', description: '', children: [
        { id: 'mf_10_80_83_13', code: '10-80-83-13', name: 'Flags', xwalkId: '1642', description: '', children: [] },
        { id: 'mf_10_80_83_16', code: '10-80-83-16', name: 'Banners', xwalkId: '1384', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_11', code: '11', name: 'Equipment', xwalkId: '', description: '', children: [
    { id: 'mf_11_10', code: '11-10', name: 'Vehicle & Pedestrian Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_10_11', code: '11-10-11', name: 'Vehicle Service Equipment', xwalkId: '1998,1999', description: '', children: [
        { id: 'mf_11_10_11_13', code: '11-10-11-13', name: 'Compressed-Air Vehicle Service Equipment', xwalkId: '2000', description: '', children: [] },
        { id: 'mf_11_10_11_19', code: '11-10-11-19', name: 'Vehicle Lubrication Equipment', xwalkId: '2001', description: '', children: [] },
        { id: 'mf_11_10_11_23', code: '11-10-11-23', name: 'Tire-Changing Equipment', xwalkId: '2002', description: '', children: [] },
        { id: 'mf_11_10_11_26', code: '11-10-11-26', name: 'Vehicle-Washing Equipment', xwalkId: '2003', description: '', children: [] },
        { id: 'mf_11_10_11_36', code: '11-10-11-36', name: 'Vehicle Charging Equipment', xwalkId: '2004,2748', description: '', children: [] }
      ] },
      { id: 'mf_11_10_12', code: '11-10-12', name: 'Parking Control Equipment', xwalkId: '2032,2033,2038,2040,2041', description: '', children: [
        { id: 'mf_11_10_12_13', code: '11-10-12-13', name: 'Parking Key & Card Control Units', xwalkId: '2034', description: '', children: [] },
        { id: 'mf_11_10_12_16', code: '11-10-12-16', name: 'Parking Ticket Dispensers', xwalkId: '2035', description: '', children: [] },
        { id: 'mf_11_10_12_23', code: '11-10-12-23', name: 'Parking Meters', xwalkId: '2036', description: '', children: [] },
        { id: 'mf_11_10_12_26', code: '11-10-12-26', name: 'Parking Fee Collection Equipment', xwalkId: '2037,2039', description: '', children: [] },
        { id: 'mf_11_10_12_33', code: '11-10-12-33', name: 'Parking Gates', xwalkId: '2029,2030,2031', description: '', children: [] }
      ] },
      { id: 'mf_11_10_13', code: '11-10-13', name: 'Loading Dock Equipment', xwalkId: '2060,2061,2062', description: '', children: [
        { id: 'mf_11_10_13_13', code: '11-10-13-13', name: 'Loading Dock Bumpers', xwalkId: '2058', description: '', children: [] },
        { id: 'mf_11_10_13_16', code: '11-10-13-16', name: 'Loading Dock Seals & Shelters', xwalkId: '2048,2049,2050,2051', description: '', children: [] },
        { id: 'mf_11_10_13_19', code: '11-10-13-19', name: 'Stationary Loading Dock Equipment', xwalkId: '2052,2053,2054,2055,2056,2057', description: '', children: [] },
        { id: 'mf_11_10_13_26', code: '11-10-13-26', name: 'Loading Dock Lights', xwalkId: '2059', description: '', children: [] }
      ] },
      { id: 'mf_11_10_14', code: '11-10-14', name: 'Pedestrian Control Equipment', xwalkId: '2071,2077', description: '', children: [
        { id: 'mf_11_10_14_13', code: '11-10-14-13', name: 'Pedestrian Gates', xwalkId: '2069,2070,2075,2076', description: '', children: [] },
        { id: 'mf_11_10_14_26', code: '11-10-14-26', name: 'Pedestrian Fare Collection Equipment', xwalkId: '2074', description: '', children: [] },
        { id: 'mf_11_10_14_43', code: '11-10-14-43', name: 'Pedestrian Detection Equipment', xwalkId: '2073', description: '', children: [] },
        { id: 'mf_11_10_14_53', code: '11-10-14-53', name: 'Pedestrian Security Equipment', xwalkId: '2072,2078', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_20', code: '11-20', name: 'Commercial Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_20_21', code: '11-20-21', name: 'Retail & Service Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_20_21_73', code: '11-20-21-73', name: 'Commercial Laundry & Dry Cleaning Equipment', xwalkId: '1700,1701,1702,1703', description: '', children: [] },
        { id: 'mf_11_20_21_83', code: '11-20-21-83', name: 'Photo Processing Equipment', xwalkId: '2005,2006', description: '', children: [] }
      ] },
      { id: 'mf_11_20_22', code: '11-20-22', name: 'Banking Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_20_22_13', code: '11-20-22-13', name: 'Vault Equipment', xwalkId: '1382,1383', description: '', children: [] }
      ] },
      { id: 'mf_11_20_29', code: '11-20-29', name: 'Postal, Packaging, & Shipping Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_20_29_33', code: '11-20-29-33', name: 'Shipping Equipment', xwalkId: '2018,2019,2020,2021,2022', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_30', code: '11-30', name: 'Residential Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_30_30', code: '11-30-30', name: 'Residential Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_30_30_13', code: '11-30-30-13', name: 'Residential Appliances', xwalkId: '1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697', description: '', children: [] },
        { id: 'mf_11_30_30_34', code: '11-30-30-34', name: 'Residential Ceiling Fans', xwalkId: '1698', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_40', code: '11-40', name: 'Foodservice Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_40_40', code: '11-40-40', name: 'Foodservice Equipment', xwalkId: '1706,1707,1716,1757,1763,1769,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1806,1831,1844,1851,1853,1859,1860,1861,1862', description: '', children: [] },
      { id: 'mf_11_40_41', code: '11-40-41', name: 'Foodservice Storage Equipment', xwalkId: '1747,1748,1749,1750,1751,1752,1753,1754,1755,1756', description: '', children: [
        { id: 'mf_11_40_41_13', code: '11-40-41-13', name: 'Refrigerated Food Storage Cases', xwalkId: '1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1758', description: '', children: [] },
        { id: 'mf_11_40_41_23', code: '11-40-41-23', name: 'Walk-In Coolers', xwalkId: '1718', description: '', children: [] },
        { id: 'mf_11_40_41_26', code: '11-40-41-26', name: 'Walk-In Freezers', xwalkId: '1717', description: '', children: [] },
        { id: 'mf_11_40_41_33', code: '11-40-41-33', name: 'Foodservice Shelving', xwalkId: '1740,1741,1742,1743,1744,1745,1746', description: '', children: [] }
      ] },
      { id: 'mf_11_40_42', code: '11-40-42', name: 'Food Preparation Equipment', xwalkId: '1770,1771,1772,1773,1774,1775,1776', description: '', children: [
        { id: 'mf_11_40_42_16', code: '11-40-42-16', name: 'Food Preparation Surfaces', xwalkId: '1760,1761,1762,1764,1765,1766,1767,1768', description: '', children: [] }
      ] },
      { id: 'mf_11_40_43', code: '11-40-43', name: 'Food Delivery Carts & Conveyors', xwalkId: '', description: '', children: [
        { id: 'mf_11_40_43_13', code: '11-40-43-13', name: 'Food Delivery Carts', xwalkId: '1807,1808,1809,1810,1811,1812,1813', description: '', children: [] },
        { id: 'mf_11_40_43_16', code: '11-40-43-16', name: 'Food Delivery Conveyors', xwalkId: '1814,1815', description: '', children: [] }
      ] },
      { id: 'mf_11_40_44', code: '11-40-44', name: 'Food Cooking Equipment', xwalkId: '1777,1778,1779,1789,1790,1791,1792', description: '', children: [
        { id: 'mf_11_40_44_13', code: '11-40-44-13', name: 'Commercial Ranges', xwalkId: '1788', description: '', children: [] },
        { id: 'mf_11_40_44_16', code: '11-40-44-16', name: 'Commercial Ovens', xwalkId: '1780,1781,1782,1783,1784,1785,1786,1787', description: '', children: [] }
      ] },
      { id: 'mf_11_40_46', code: '11-40-46', name: 'Food Dispensing Equipment', xwalkId: '1834,1835,1836', description: '', children: [
        { id: 'mf_11_40_46_16', code: '11-40-46-16', name: 'Service Line Equipment', xwalkId: '1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830', description: '', children: [] },
        { id: 'mf_11_40_46_23', code: '11-40-46-23', name: 'Coffee & Espresso Equipment', xwalkId: '1832,1833', description: '', children: [] },
        { id: 'mf_11_40_46_83', code: '11-40-46-83', name: 'Ice Machines', xwalkId: '1704,1705,1736,1737,1738,1739', description: '', children: [] }
      ] },
      { id: 'mf_11_40_48', code: '11-40-48', name: 'Foodservice Cleaning & Disposal Equipment', xwalkId: '1837,1838,1839,1840', description: '', children: [
        { id: 'mf_11_40_48_13', code: '11-40-48-13', name: 'Commercial Dishwashers', xwalkId: '1841', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_50', code: '11-50', name: 'Educational & Scientific Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_50_51', code: '11-50-51', name: 'Library Equipment', xwalkId: '1942,1945', description: '', children: [
        { id: 'mf_11_50_51_16', code: '11-50-51-16', name: 'Book Depositories', xwalkId: '1940', description: '', children: [] },
        { id: 'mf_11_50_51_19', code: '11-50-51-19', name: 'Book Theft Protection Equipment', xwalkId: '1941', description: '', children: [] },
        { id: 'mf_11_50_51_23', code: '11-50-51-23', name: 'Library Stack Systems', xwalkId: '1943,1944', description: '', children: [] }
      ] },
      { id: 'mf_11_50_52', code: '11-50-52', name: 'Audio-Visual Equipment', xwalkId: '1872,1874,1875', description: '', children: [
        { id: 'mf_11_50_52_13', code: '11-50-52-13', name: 'Projection Screens', xwalkId: '1868,1869', description: '', children: [] },
        { id: 'mf_11_50_52_16', code: '11-50-52-16', name: 'Projectors', xwalkId: '1873', description: '', children: [] },
        { id: 'mf_11_50_52_23', code: '11-50-52-23', name: 'Audio-Visual Equipment Supports', xwalkId: '1870,1871', description: '', children: [] }
      ] },
      { id: 'mf_11_50_53', code: '11-50-53', name: 'Laboratory Equipment', xwalkId: '2261', description: '', children: [
        { id: 'mf_11_50_53_13', code: '11-50-53-13', name: 'Laboratory Fume Hoods', xwalkId: '2263', description: '', children: [] },
        { id: 'mf_11_50_53_33', code: '11-50-53-33', name: 'Emergency Safety Appliances', xwalkId: '2264', description: '', children: [] },
        { id: 'mf_11_50_53_43', code: '11-50-53-43', name: 'Service Fittings & Accessories', xwalkId: '2265', description: '', children: [] },
        { id: 'mf_11_50_53_53', code: '11-50-53-53', name: 'Biological Safety Cabinets', xwalkId: '2253,2254,2255', description: '', children: [] }
      ] },
      { id: 'mf_11_50_57', code: '11-50-57', name: 'Vocational Shop Equipment', xwalkId: '1982,1983,1984,1985,1986,1987,1988,1989,1990,1991', description: '', children: [] }
    ] },
    { id: 'mf_11_60', code: '11-60', name: 'Entertainment & Recreation Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_60_61', code: '11-60-61', name: 'Broadcast, Theater, & Stage Equipment', xwalkId: '1876,1877,1891,2280', description: '', children: [
        { id: 'mf_11_60_61_13', code: '11-60-61-13', name: 'Acoustical Shells', xwalkId: '1890', description: '', children: [] },
        { id: 'mf_11_60_61_33', code: '11-60-61-33', name: 'Rigging Systems & Controls', xwalkId: '1886,1887', description: '', children: [] },
        { id: 'mf_11_60_61_43', code: '11-60-61-43', name: 'Stage Curtains', xwalkId: '1888,1889', description: '', children: [] }
      ] },
      { id: 'mf_11_60_62', code: '11-60-62', name: 'Musical Equipment', xwalkId: '2015,2016,2017', description: '', children: [] },
      { id: 'mf_11_60_66', code: '11-60-66', name: 'Athletic Equipment', xwalkId: '3243,3244,3246,3247,3248', description: '', children: [
        { id: 'mf_11_60_66_13', code: '11-60-66-13', name: 'Exercise Equipment', xwalkId: '1922,1923,1924,1925,1926,1927,1928,1929,1930,1931', description: '', children: [] },
        { id: 'mf_11_60_66_23', code: '11-60-66-23', name: 'Gymnasium Equipment', xwalkId: '1900,1901,1902,1903,1904,1905,1906,1907,1908,1911,1912,1913,1914,1915,1917,1918,1919,1921,3242', description: '', children: [] },
        { id: 'mf_11_60_66_43', code: '11-60-66-43', name: 'Interior Scoreboards', xwalkId: '1909,1910', description: '', children: [] },
        { id: 'mf_11_60_66_53', code: '11-60-66-53', name: 'Gymnasium Dividers', xwalkId: '1916,3241', description: '', children: [] }
      ] },
      { id: 'mf_11_60_67', code: '11-60-67', name: 'Recreational Equipment', xwalkId: '2090,2091,2092,2093', description: '', children: [
        { id: 'mf_11_60_67_13', code: '11-60-67-13', name: 'Bowling Alley Equipment', xwalkId: '2085', description: '', children: [] },
        { id: 'mf_11_60_67_23', code: '11-60-67-23', name: 'Shooting Range Equipment', xwalkId: '2086', description: '', children: [] },
        { id: 'mf_11_60_67_33', code: '11-60-67-33', name: 'Climbing Walls', xwalkId: '2087', description: '', children: [] },
        { id: 'mf_11_60_67_43', code: '11-60-67-43', name: 'Table Games Equipment', xwalkId: '2088,2089', description: '', children: [] }
      ] },
      { id: 'mf_11_60_68', code: '11-60-68', name: 'Play Field Equipment & Structures', xwalkId: '', description: '', children: [
        { id: 'mf_11_60_68_13', code: '11-60-68-13', name: 'Playground Equipment', xwalkId: '1947,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,3615', description: '', children: [] },
        { id: 'mf_11_60_68_16', code: '11-60-68-16', name: 'Play Structures', xwalkId: '1954,1955', description: '', children: [] },
        { id: 'mf_11_60_68_23', code: '11-60-68-23', name: 'Exterior Court Athletic Equipment', xwalkId: '3281,3282,3283,3284,3285', description: '', children: [] },
        { id: 'mf_11_60_68_33', code: '11-60-68-33', name: 'Athletic Field Equipment', xwalkId: '3238,3239,3240', description: '', children: [] },
        { id: 'mf_11_60_68_43', code: '11-60-68-43', name: 'Exterior Scoreboards', xwalkId: '3249,3250,3251,3286', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_70', code: '11-70', name: 'Healthcare Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_70_71', code: '11-70-71', name: 'Medical Sterilizing Equipment', xwalkId: '2101', description: '', children: [] },
      { id: 'mf_11_70_72', code: '11-70-72', name: 'Examination & Treatment Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_70_72_13', code: '11-70-72-13', name: 'Examination Equipment', xwalkId: '2102', description: '', children: [] },
        { id: 'mf_11_70_72_53', code: '11-70-72-53', name: 'Treatment Equipment', xwalkId: '1699,2103', description: '', children: [] }
      ] },
      { id: 'mf_11_70_73', code: '11-70-73', name: 'Patient Care Equipment', xwalkId: '2104,2105', description: '', children: [] }
    ] },
    { id: 'mf_11_80', code: '11-80', name: 'Facility Maintenance & Operation Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_80_81', code: '11-80-81', name: 'Facility Maintenance Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_80_81_13', code: '11-80-81-13', name: 'Floor & Wall Cleaning Equipment', xwalkId: '2113', description: '', children: [] },
        { id: 'mf_11_80_81_16', code: '11-80-81-16', name: 'Housekeeping Carts', xwalkId: '2114', description: '', children: [] },
        { id: 'mf_11_80_81_19', code: '11-80-81-19', name: 'Vacuum Cleaning Systems', xwalkId: '2115', description: '', children: [] },
        { id: 'mf_11_80_81_23', code: '11-80-81-23', name: 'Facade Access Equipment', xwalkId: '2116', description: '', children: [] },
        { id: 'mf_11_80_81_29', code: '11-80-81-29', name: 'Facility Fall Protection', xwalkId: '2117', description: '', children: [] }
      ] },
      { id: 'mf_11_80_82', code: '11-80-82', name: 'Facility Solid Waste Handling Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_80_82_13', code: '11-80-82-13', name: 'Solid Waste Bins', xwalkId: '2119', description: '', children: [] },
        { id: 'mf_11_80_82_26', code: '11-80-82-26', name: 'Facility Waste Compactors', xwalkId: '2118', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_11_90', code: '11-90', name: 'Other Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_11_90_92', code: '11-90-92', name: 'Agricultural Equipment', xwalkId: '2007', description: '', children: [] },
      { id: 'mf_11_90_95', code: '11-90-95', name: 'Arts & Crafts Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_11_90_95_13', code: '11-90-95-13', name: 'Kilns', xwalkId: '1973,1974,1975', description: '', children: [] }
      ] },
      { id: 'mf_11_90_98', code: '11-90-98', name: 'Detention Equipment', xwalkId: '2120,2141,2142,2143', description: '', children: [
        { id: 'mf_11_90_98_12', code: '11-90-98-12', name: 'Detention Doors & Frames', xwalkId: '2129', description: '', children: [] },
        { id: 'mf_11_90_98_13', code: '11-90-98-13', name: 'Detention Pass-Through Doors', xwalkId: '2130', description: '', children: [] },
        { id: 'mf_11_90_98_14', code: '11-90-98-14', name: 'Detention Door Hardware', xwalkId: '2131', description: '', children: [] },
        { id: 'mf_11_90_98_16', code: '11-90-98-16', name: 'Detention Equipment Fasteners', xwalkId: '2140', description: '', children: [] },
        { id: 'mf_11_90_98_19', code: '11-90-98-19', name: 'Detention Room Padding', xwalkId: '2137', description: '', children: [] },
        { id: 'mf_11_90_98_21', code: '11-90-98-21', name: 'Detention Windows', xwalkId: '2132', description: '', children: [] },
        { id: 'mf_11_90_98_23', code: '11-90-98-23', name: 'Detention Window Screens', xwalkId: '2133', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_12', code: '12', name: 'Furnishings', xwalkId: '', description: '', children: [
    { id: 'mf_12_10', code: '12-10', name: 'Art', xwalkId: '', description: '', children: [
      { id: 'mf_12_10_11', code: '12-10-11', name: 'Murals', xwalkId: '', description: '', children: [
        { id: 'mf_12_10_11_13', code: '12-10-11-13', name: 'Photo Murals', xwalkId: '2160,2161,2168,2169,2170,2171,2172,2173', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_12_20', code: '12-20', name: 'Window Treatments', xwalkId: '', description: '', children: [
      { id: 'mf_12_20_21', code: '12-20-21', name: 'Window Blinds', xwalkId: '2180,2181,2182,2183,2184', description: '', children: [] },
      { id: 'mf_12_20_22', code: '12-20-22', name: 'Curtains & Drapes', xwalkId: '2185', description: '', children: [] },
      { id: 'mf_12_20_24', code: '12-20-24', name: 'Window Shades', xwalkId: '2192', description: '', children: [
        { id: 'mf_12_20_24_13', code: '12-20-24-13', name: 'Roller Window Shades', xwalkId: '2186,2187,2188,2189,2190,2191', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_12_30', code: '12-30', name: 'Casework', xwalkId: '', description: '', children: [
      { id: 'mf_12_30_32', code: '12-30-32', name: 'Manufactured Wood Casework', xwalkId: '2201,2202,2203', description: '', children: [] },
      { id: 'mf_12_30_35', code: '12-30-35', name: 'Specialty Casework', xwalkId: '', description: '', children: [
        { id: 'mf_12_30_35_36', code: '12-30-35-36', name: 'Mailroom Casework', xwalkId: '2209', description: '', children: [] },
        { id: 'mf_12_30_35_50', code: '12-30-35-50', name: 'Educational/Library Casework', xwalkId: '1932,1946,2212,2215', description: '', children: [] },
        { id: 'mf_12_30_35_53', code: '12-30-35-53', name: 'Laboratory Casework', xwalkId: '2244,2245,2246,2247,2248,2249,2256,2257,2258,2259,2262', description: '', children: [] },
        { id: 'mf_12_30_35_59', code: '12-30-35-59', name: 'Display Casework', xwalkId: '2206', description: '', children: [] },
        { id: 'mf_12_30_35_83', code: '12-30-35-83', name: 'Performing Arts Casework', xwalkId: '2273,2274,2275,2276,2277,2278,2279', description: '', children: [] }
      ] },
      { id: 'mf_12_30_36', code: '12-30-36', name: 'Countertops', xwalkId: '2216,2220', description: '', children: [
        { id: 'mf_12_30_36_16', code: '12-30-36-16', name: 'Metal Countertops', xwalkId: '2218', description: '', children: [] },
        { id: 'mf_12_30_36_53', code: '12-30-36-53', name: 'Laboratory Countertops', xwalkId: '2250,2251,2252', description: '', children: [] },
        { id: 'mf_12_30_36_61', code: '12-30-36-61', name: 'Simulated Stone Countertops', xwalkId: '2217,2222', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_12_40', code: '12-40', name: 'Furnishings & Accessories', xwalkId: '', description: '', children: [
      { id: 'mf_12_40_48', code: '12-40-48', name: 'Rugs & Mats', xwalkId: '', description: '', children: [
        { id: 'mf_12_40_48_13', code: '12-40-48-13', name: 'Entrance Floor Mats & Frames', xwalkId: '2286,2287,2288,2295,2296', description: '', children: [] },
        { id: 'mf_12_40_48_16', code: '12-40-48-16', name: 'Entrance Floor Grilles', xwalkId: '2289', description: '', children: [] },
        { id: 'mf_12_40_48_19', code: '12-40-48-19', name: 'Entrance Floor Gratings', xwalkId: '2290', description: '', children: [] },
        { id: 'mf_12_40_48_23', code: '12-40-48-23', name: 'Entrance Floor Grids', xwalkId: '2291', description: '', children: [] },
        { id: 'mf_12_40_48_43', code: '12-40-48-43', name: 'Floor Mats', xwalkId: '2292,2293,2294', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_12_50', code: '12-50', name: 'Furniture', xwalkId: '', description: '', children: [
      { id: 'mf_12_50_55', code: '12-50-55', name: 'Detention Furniture', xwalkId: '', description: '', children: [
        { id: 'mf_12_50_55_13', code: '12-50-55-13', name: 'Detention Bunks', xwalkId: '2144', description: '', children: [] },
        { id: 'mf_12_50_55_16', code: '12-50-55-16', name: 'Detention Desks', xwalkId: '2145', description: '', children: [] },
        { id: 'mf_12_50_55_19', code: '12-50-55-19', name: 'Detention Stools', xwalkId: '2146', description: '', children: [] },
        { id: 'mf_12_50_55_23', code: '12-50-55-23', name: 'Detention Tables', xwalkId: '2147', description: '', children: [] },
        { id: 'mf_12_50_55_26', code: '12-50-55-26', name: 'Detention Safety Clothes Hooks', xwalkId: '2148', description: '', children: [] },
        { id: 'mf_12_50_55_83', code: '12-50-55-83', name: 'Custom Detention Furniture', xwalkId: '2149', description: '', children: [] },
        { id: 'mf_12_50_55_86', code: '12-50-55-86', name: 'Detention Control Room Furniture', xwalkId: '2150', description: '', children: [] }
      ] },
      { id: 'mf_12_50_56', code: '12-50-56', name: 'Institutional Furniture', xwalkId: '', description: '', children: [
        { id: 'mf_12_50_56_53', code: '12-50-56-53', name: 'Laboratory Furniture', xwalkId: '2260', description: '', children: [] },
        { id: 'mf_12_50_56_70', code: '12-50-56-70', name: 'Healthcare Furniture', xwalkId: '1379,1380,1381', description: '', children: [] }
      ] },
      { id: 'mf_12_50_57', code: '12-50-57', name: 'Industrial Furniture', xwalkId: '1995,1997', description: '', children: [
        { id: 'mf_12_50_57_13', code: '12-50-57-13', name: 'Welding Benches', xwalkId: '1993', description: '', children: [] },
        { id: 'mf_12_50_57_16', code: '12-50-57-16', name: 'Welding Screens', xwalkId: '1994', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_12_60', code: '12-60', name: 'Multiple Seating', xwalkId: '', description: '', children: [
      { id: 'mf_12_60_61', code: '12-60-61', name: 'Fixed Audience Seating', xwalkId: '', description: '', children: [
        { id: 'mf_12_60_61_13', code: '12-60-61-13', name: 'Upholstered Audience Seating', xwalkId: '2303', description: '', children: [] },
        { id: 'mf_12_60_61_16', code: '12-60-61-16', name: 'Molded-Plastic Audience Seating', xwalkId: '2304', description: '', children: [] }
      ] },
      { id: 'mf_12_60_62', code: '12-60-62', name: 'Portable Audience Seating', xwalkId: '', description: '', children: [
        { id: 'mf_12_60_62_23', code: '12-60-62-23', name: 'Portable Bleachers', xwalkId: '2314', description: '', children: [] }
      ] },
      { id: 'mf_12_60_63', code: '12-60-63', name: 'Stadium & Arena Seating', xwalkId: '2305,2306,2307,2308', description: '', children: [] },
      { id: 'mf_12_60_66', code: '12-60-66', name: 'Telescoping Stands', xwalkId: '2309,2310,2311,2312,2313', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_13', code: '13', name: 'Special Construction', xwalkId: '', description: '', children: [
    { id: 'mf_13_10', code: '13-10', name: 'Special Facility Components', xwalkId: '', description: '', children: [
      { id: 'mf_13_10_11', code: '13-10-11', name: 'Swimming Pools', xwalkId: '2330,2331,2332,2333,2334,2335,2354,2355', description: '', children: [
        { id: 'mf_13_10_11_13', code: '13-10-11-13', name: 'Below-Grade Swimming Pools', xwalkId: '2327', description: '', children: [] },
        { id: 'mf_13_10_11_23', code: '13-10-11-23', name: 'On-Grade Swimming Pools', xwalkId: '2328', description: '', children: [] },
        { id: 'mf_13_10_11_33', code: '13-10-11-33', name: 'Elevated Swimming Pools', xwalkId: '2329', description: '', children: [] },
        { id: 'mf_13_10_11_46', code: '13-10-11-46', name: 'Swimming Pool Accessories', xwalkId: '2338,2339,2340,2341,2342,2343', description: '', children: [] },
        { id: 'mf_13_10_11_49', code: '13-10-11-49', name: 'Swimming Pool Cleaning Equipment', xwalkId: '2344,2352', description: '', children: [] },
        { id: 'mf_13_10_11_53', code: '13-10-11-53', name: 'Movable Pool Bulkheads', xwalkId: '2336', description: '', children: [] },
        { id: 'mf_13_10_11_56', code: '13-10-11-56', name: 'Movable Pool Floors', xwalkId: '2337', description: '', children: [] }
      ] },
      { id: 'mf_13_10_12', code: '13-10-12', name: 'Fountains', xwalkId: '', description: '', children: [
        { id: 'mf_13_10_12_13', code: '13-10-12-13', name: 'Exterior Fountains', xwalkId: '2465,2466,2469,2470,2471,2472,2473,2474,2475,2476,3377', description: '', children: [] },
        { id: 'mf_13_10_12_23', code: '13-10-12-23', name: 'Interior Fountains', xwalkId: '2467,2468', description: '', children: [] }
      ] },
      { id: 'mf_13_10_17', code: '13-10-17', name: 'Tubs & Pools', xwalkId: '', description: '', children: [
        { id: 'mf_13_10_17_33', code: '13-10-17-33', name: 'Whirlpool Tubs', xwalkId: '1920', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_13_20', code: '13-20', name: 'Special Purpose Rooms', xwalkId: '', description: '', children: [
      { id: 'mf_13_20_21', code: '13-20-21', name: 'Controlled Environment Rooms', xwalkId: '', description: '', children: [
        { id: 'mf_13_20_21_48', code: '13-20-21-48', name: 'Sound-Conditioned Rooms', xwalkId: '2363,2364,2365,2366', description: '', children: [] }
      ] },
      { id: 'mf_13_20_26', code: '13-20-26', name: 'Fabricated Rooms', xwalkId: '1386,1387,1388', description: '', children: [] }
    ] },
    { id: 'mf_13_30', code: '13-30', name: 'Special Structures', xwalkId: '', description: '', children: [
      { id: 'mf_13_30_31', code: '13-30-31', name: 'Fabric Structures', xwalkId: '', description: '', children: [
        { id: 'mf_13_30_31_23', code: '13-30-31-23', name: 'Tensioned Fabric Structures', xwalkId: '2456', description: '', children: [] },
        { id: 'mf_13_30_31_33', code: '13-30-31-33', name: 'Framed Fabric Structures', xwalkId: '2457', description: '', children: [] }
      ] },
      { id: 'mf_13_30_34', code: '13-30-34', name: 'Fabricated Engineered Structures', xwalkId: '', description: '', children: [
        { id: 'mf_13_30_34_13', code: '13-30-34-13', name: 'Greenhouses', xwalkId: '2484,2485,2486,2487,2492,2493,2494,2495,2496,2497', description: '', children: [] },
        { id: 'mf_13_30_34_16', code: '13-30-34-16', name: 'Grandstands & Bleachers', xwalkId: '2381,2382,2383,2384,2385,2386,2387,2388,2389,2390,2391,2392,2393,2394', description: '', children: [] },
        { id: 'mf_13_30_34_19', code: '13-30-34-19', name: 'Metal Building Systems', xwalkId: '2411,2424,2425,2426,2427,2428,2429,2430,2431,2432,2433,2434,2435,2436', description: '', children: [] },
        { id: 'mf_13_30_34_23', code: '13-30-34-23', name: 'Fabricated Structures', xwalkId: '2395,2396,2397,2398,2437,2438,2439,2440,2441,2442,2443,2444,2445,2446,2447,2448,2449', description: '', children: [] }
      ] },
      { id: 'mf_13_30_36', code: '13-30-36', name: 'Towers', xwalkId: '2405,2406,2407,2408,2409,2410', description: '', children: [] }
    ] },
    { id: 'mf_13_40', code: '13-40', name: 'Integrated Construction', xwalkId: '', description: '', children: [
      { id: 'mf_13_40_42', code: '13-40-42', name: 'Building Modules & Components', xwalkId: '', description: '', children: [
        { id: 'mf_13_40_42_63', code: '13-40-42-63', name: 'Detention Cell Modules', xwalkId: '2151,2152', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_14', code: '14', name: 'Conveying Equipment', xwalkId: '', description: '', children: [
    { id: 'mf_14_10', code: '14-10', name: 'Dumbwaiters', xwalkId: '', description: '', children: [
      { id: 'mf_14_10_12', code: '14-10-12', name: 'Electric Dumbwaiters', xwalkId: '2520', description: '', children: [] },
      { id: 'mf_14_10_14', code: '14-10-14', name: 'Hydraulic Dumbwaiters', xwalkId: '2519', description: '', children: [] }
    ] },
    { id: 'mf_14_20', code: '14-20', name: 'Elevators', xwalkId: '', description: '', children: [
      { id: 'mf_14_20_20', code: '14-20-20', name: 'Elevators', xwalkId: '2523', description: '', children: [] },
      { id: 'mf_14_20_21', code: '14-20-21', name: 'Electric Traction Elevators', xwalkId: '', description: '', children: [
        { id: 'mf_14_20_21_13', code: '14-20-21-13', name: 'Electric Traction Freight Elevators', xwalkId: '2514', description: '', children: [] },
        { id: 'mf_14_20_21_23', code: '14-20-21-23', name: 'Electric Traction Passenger Elevators', xwalkId: '2512,2513', description: '', children: [] },
        { id: 'mf_14_20_21_33', code: '14-20-21-33', name: 'Electric Traction Residential Elevators', xwalkId: '2516', description: '', children: [] },
        { id: 'mf_14_20_21_43', code: '14-20-21-43', name: 'Electric Traction Service Elevators', xwalkId: '2515', description: '', children: [] }
      ] },
      { id: 'mf_14_20_24', code: '14-20-24', name: 'Hydraulic Elevators', xwalkId: '', description: '', children: [
        { id: 'mf_14_20_24_13', code: '14-20-24-13', name: 'Hydraulic Freight Elevators', xwalkId: '2509', description: '', children: [] },
        { id: 'mf_14_20_24_23', code: '14-20-24-23', name: 'Hydraulic Passenger Elevators', xwalkId: '2508', description: '', children: [] },
        { id: 'mf_14_20_24_33', code: '14-20-24-33', name: 'Hydraulic Residential Elevators', xwalkId: '2511', description: '', children: [] },
        { id: 'mf_14_20_24_43', code: '14-20-24-43', name: 'Hydraulic Service Elevators', xwalkId: '2510', description: '', children: [] }
      ] },
      { id: 'mf_14_20_27', code: '14-20-27', name: 'Custom Elevator Cabs & Doors', xwalkId: '', description: '', children: [
        { id: 'mf_14_20_27_13', code: '14-20-27-13', name: 'Custom Elevator Cab Finishes', xwalkId: '2517,2518', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_14_30', code: '14-30', name: 'Escalators & Moving Walks', xwalkId: '', description: '', children: [
      { id: 'mf_14_30_31', code: '14-30-31', name: 'Escalators', xwalkId: '2521', description: '', children: [] },
      { id: 'mf_14_30_32', code: '14-30-32', name: 'Moving Walks', xwalkId: '2522', description: '', children: [] }
    ] },
    { id: 'mf_14_40', code: '14-40', name: 'Lifts', xwalkId: '', description: '', children: [
      { id: 'mf_14_40_41', code: '14-40-41', name: 'People Lifts', xwalkId: '2533', description: '', children: [] },
      { id: 'mf_14_40_42', code: '14-40-42', name: 'Wheelchair Lifts', xwalkId: '2534', description: '', children: [] },
      { id: 'mf_14_40_43', code: '14-40-43', name: 'Platform Lifts', xwalkId: '2535,2536', description: '', children: [] },
      { id: 'mf_14_40_45', code: '14-40-45', name: 'Vehicle Lifts', xwalkId: '', description: '', children: [
        { id: 'mf_14_40_45_13', code: '14-40-45-13', name: 'Vehicle Service Lifts', xwalkId: '2537', description: '', children: [] },
        { id: 'mf_14_40_45_23', code: '14-40-45-23', name: 'Vehicle Parking Lifts', xwalkId: '2538', description: '', children: [] }
      ] },
      { id: 'mf_14_40_46', code: '14-40-46', name: 'Material Lifts', xwalkId: '2539,2540', description: '', children: [] }
    ] },
    { id: 'mf_14_90', code: '14-90', name: 'Other Conveying Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_14_90_91', code: '14-90-91', name: 'Facility Chutes', xwalkId: '', description: '', children: [
        { id: 'mf_14_90_91_82', code: '14-90-91-82', name: 'Trash Chutes', xwalkId: '2549,2550,2551,2552,2553,2554,2555,2556,2557,2558,2559,2560,2561,2562,2563,2564,2565,2566,2567', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_21', code: '21', name: 'Fire Suppression', xwalkId: '', description: '', children: [
    { id: 'mf_21_00', code: '21-00', name: 'Fire Suppression', xwalkId: '1842,2568', description: '', children: [
      { id: 'mf_21_00_05', code: '21-00-05', name: 'Common Work Results for Fire Suppression', xwalkId: '2578', description: '', children: [
        { id: 'mf_21_00_05_33', code: '21-00-05-33', name: 'Heat Tracing for Fire-Suppression Piping', xwalkId: '2591', description: '', children: [] }
      ] },
      { id: 'mf_21_00_07', code: '21-00-07', name: 'Fire Suppression Systems Insulation', xwalkId: '2590', description: '', children: [] }
    ] },
    { id: 'mf_21_10', code: '21-10', name: 'Water-Based Fire-Suppression Systems', xwalkId: '', description: '', children: [
      { id: 'mf_21_10_12', code: '21-10-12', name: 'Fire-Suppression Standpipes', xwalkId: '2579', description: '', children: [] },
      { id: 'mf_21_10_13', code: '21-10-13', name: 'Fire-Suppression Sprinkler Systems', xwalkId: '', description: '', children: [
        { id: 'mf_21_10_13_13', code: '21-10-13-13', name: 'Wet-Pipe Sprinkler Systems', xwalkId: '2580,2581,2582,2583', description: '', children: [] },
        { id: 'mf_21_10_13_16', code: '21-10-13-16', name: 'Dry-Pipe Sprinkler Systems', xwalkId: '2584,2585', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_21_20', code: '21-20', name: 'Fire-Extinguishing Systems', xwalkId: '', description: '', children: [
      { id: 'mf_21_20_22', code: '21-20-22', name: 'Clean-Agent Fire-Extinguishing Systems', xwalkId: '2586', description: '', children: [] }
    ] },
    { id: 'mf_21_30', code: '21-30', name: 'Fire Pumps', xwalkId: '', description: '', children: [
      { id: 'mf_21_30_30', code: '21-30-30', name: 'Fire Pumps', xwalkId: '2587', description: '', children: [] }
    ] },
    { id: 'mf_21_40', code: '21-40', name: 'Fire-Suppression Water Storage', xwalkId: '', description: '', children: [
      { id: 'mf_21_40_41', code: '21-40-41', name: 'Storage Tanks for Fire-Suppression Water', xwalkId: '2588', description: '', children: [
        { id: 'mf_21_40_41_23', code: '21-40-41-23', name: 'Ground Suction Storage Tanks for Fire-Suppression Water', xwalkId: '2589', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_22', code: '22', name: 'Plumbing', xwalkId: '', description: '', children: [
    { id: 'mf_22_00', code: '22-00', name: 'Plumbing', xwalkId: '2592', description: '', children: [
      { id: 'mf_22_00_05', code: '22-00-05', name: 'Common Work Results for Plumbing', xwalkId: '2610', description: '', children: [
        { id: 'mf_22_00_05_29', code: '22-00-05-29', name: 'Hangers & Supports for Plumbing Piping & Equipment', xwalkId: '2609', description: '', children: [] }
      ] },
      { id: 'mf_22_00_07', code: '22-00-07', name: 'Plumbing Insulation', xwalkId: '2632', description: '', children: [] },
      { id: 'mf_22_00_08', code: '22-00-08', name: 'Commissioning of Plumbing', xwalkId: '2600', description: '', children: [] }
    ] },
    { id: 'mf_22_10', code: '22-10', name: 'Plumbing Piping', xwalkId: '', description: '', children: [
      { id: 'mf_22_10_11', code: '22-10-11', name: 'Facility Water Distribution', xwalkId: '', description: '', children: [
        { id: 'mf_22_10_11_13', code: '22-10-11-13', name: 'Facility Water Distribution Piping', xwalkId: '2489', description: '', children: [] },
        { id: 'mf_22_10_11_16', code: '22-10-11-16', name: 'Domestic Water Piping', xwalkId: '2601,2602', description: '', children: [] },
        { id: 'mf_22_10_11_23', code: '22-10-11-23', name: 'Domestic Water Pumps', xwalkId: '2603', description: '', children: [] }
      ] },
      { id: 'mf_22_10_13', code: '22-10-13', name: 'Facility Sanitary Sewerage', xwalkId: '2605', description: '', children: [
        { id: 'mf_22_10_13_16', code: '22-10-13-16', name: 'Sanitary Waste & Vent Piping', xwalkId: '2606', description: '', children: [] },
        { id: 'mf_22_10_13_29', code: '22-10-13-29', name: 'Sanitary Sewerage Pumps', xwalkId: '2608', description: '', children: [] }
      ] },
      { id: 'mf_22_10_14', code: '22-10-14', name: 'Facility Storm Drainage', xwalkId: '', description: '', children: [
        { id: 'mf_22_10_14_13', code: '22-10-14-13', name: 'Facility Storm Drainage Piping', xwalkId: '2611,2612', description: '', children: [] },
        { id: 'mf_22_10_14_26', code: '22-10-14-26', name: 'Facility Storm Drains', xwalkId: '2613', description: '', children: [] },
        { id: 'mf_22_10_14_29', code: '22-10-14-29', name: 'Sump Pumps', xwalkId: '2614', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_22_40', code: '22-40', name: 'Plumbing Fixtures', xwalkId: '', description: '', children: [
      { id: 'mf_22_40_40', code: '22-40-40', name: 'Plumbing Fixtures', xwalkId: '1845,1846', description: '', children: [] },
      { id: 'mf_22_40_42', code: '22-40-42', name: 'Commercial Plumbing Fixtures', xwalkId: '2607', description: '', children: [
        { id: 'mf_22_40_42_16', code: '22-40-42-16', name: 'Commercial Lavatories & Sinks', xwalkId: '1843', description: '', children: [] }
      ] },
      { id: 'mf_22_40_47', code: '22-40-47', name: 'Drinking Fountains & Water Coolers', xwalkId: '2604', description: '', children: [] }
    ] },
    { id: 'mf_22_50', code: '22-50', name: 'Pool & Fountain Plumbing Systems', xwalkId: '', description: '', children: [
      { id: 'mf_22_50_50', code: '22-50-50', name: 'Pool & Fountain Plumbing Systems', xwalkId: '2629,2630,2631', description: '', children: [] },
      { id: 'mf_22_50_51', code: '22-50-51', name: 'Swimming Pool Plumbing Systems', xwalkId: '2346,2348', description: '', children: [
        { id: 'mf_22_50_51_13', code: '22-50-51-13', name: 'Swimming Pool Piping', xwalkId: '2345', description: '', children: [] },
        { id: 'mf_22_50_51_16', code: '22-50-51-16', name: 'Swimming Pool Pumps', xwalkId: '2347', description: '', children: [] },
        { id: 'mf_22_50_51_19', code: '22-50-51-19', name: 'Swimming Pool Water Treatment Equipment', xwalkId: '2349,2350,2351,2353', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_22_60', code: '22-60', name: 'Gas & Vacuum Systems for Laboratory & Healthcare Facilities', xwalkId: '', description: '', children: [
      { id: 'mf_22_60_61', code: '22-60-61', name: 'Compressed-Air Systems for Laboratory & Healthcare Facilities', xwalkId: '', description: '', children: [
        { id: 'mf_22_60_61_13', code: '22-60-61-13', name: 'Compressed-Air Piping for Laboratory & Healthcare Facilities', xwalkId: '2621', description: '', children: [] },
        { id: 'mf_22_60_61_19', code: '22-60-61-19', name: 'Compressed-Air Equipment for Laboratory & Healthcare Facilities', xwalkId: '2622', description: '', children: [] }
      ] },
      { id: 'mf_22_60_66', code: '22-60-66', name: 'Chemical-Waste Systems for Laboratory & Healthcare Facilities', xwalkId: '2617,2618,2619,2620', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_23', code: '23', name: 'Heating, Ventilating, & Air Conditioning (HVAC)', xwalkId: '', description: '', children: [
    { id: 'mf_23_00', code: '23-00', name: 'Heating, Ventilating, & Air Conditioning (HVAC)', xwalkId: '2633', description: '', children: [
      { id: 'mf_23_00_05', code: '23-00-05', name: 'Common Work Results for HVAC', xwalkId: '', description: '', children: [
        { id: 'mf_23_00_05_33', code: '23-00-05-33', name: 'Heat Tracing for HVAC Piping', xwalkId: '2690', description: '', children: [] },
        { id: 'mf_23_00_05_48', code: '23-00-05-48', name: 'Vibration & Seismic Controls for HVAC', xwalkId: '2691', description: '', children: [] },
        { id: 'mf_23_00_05_93', code: '23-00-05-93', name: 'Testing, Adjusting, & Balancing for HVAC', xwalkId: '2696', description: '', children: [] }
      ] },
      { id: 'mf_23_00_07', code: '23-00-07', name: 'HVAC Insulation', xwalkId: '2688,2689', description: '', children: [] },
      { id: 'mf_23_00_09', code: '23-00-09', name: 'Instrumentation & Control for HVAC', xwalkId: '2694,2695', description: '', children: [] }
    ] },
    { id: 'mf_23_10', code: '23-10', name: 'Facility Fuel Systems', xwalkId: '', description: '', children: [
      { id: 'mf_23_10_11', code: '23-10-11', name: 'Facility Fuel Piping', xwalkId: '', description: '', children: [
        { id: 'mf_23_10_11_23', code: '23-10-11-23', name: 'Facility Natural-Gas Piping', xwalkId: '2623,2624,2625,2626,2627,2628', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_23_20', code: '23-20', name: 'HVAC Piping & Pumps', xwalkId: '', description: '', children: [
      { id: 'mf_23_20_21', code: '23-20-21', name: 'Hydronic Piping & Pumps', xwalkId: '', description: '', children: [
        { id: 'mf_23_20_21_13', code: '23-20-21-13', name: 'Hydronic Piping', xwalkId: '2644,2645,2646', description: '', children: [] },
        { id: 'mf_23_20_21_23', code: '23-20-21-23', name: 'Hydronic Pumps', xwalkId: '2647', description: '', children: [] }
      ] },
      { id: 'mf_23_20_22', code: '23-20-22', name: 'Steam & Condensate Piping & Pumps', xwalkId: '', description: '', children: [
        { id: 'mf_23_20_22_13', code: '23-20-22-13', name: 'Steam & Condensate Heating Piping', xwalkId: '2648', description: '', children: [] },
        { id: 'mf_23_20_22_23', code: '23-20-22-23', name: 'Steam Condensate Pumps', xwalkId: '2649,2652', description: '', children: [] }
      ] },
      { id: 'mf_23_20_23', code: '23-20-23', name: 'Refrigerant Piping', xwalkId: '2650', description: '', children: [] },
      { id: 'mf_23_20_25', code: '23-20-25', name: 'HVAC Water Treatment', xwalkId: '2651', description: '', children: [] }
    ] },
    { id: 'mf_23_30', code: '23-30', name: 'HVAC Air Distribution', xwalkId: '', description: '', children: [
      { id: 'mf_23_30_30', code: '23-30-30', name: 'HVAC Air Distribution', xwalkId: '2367,2488', description: '', children: [] },
      { id: 'mf_23_30_31', code: '23-30-31', name: 'HVAC Ducts & Casings', xwalkId: '', description: '', children: [
        { id: 'mf_23_30_31_13', code: '23-30-31-13', name: 'Metal Ducts', xwalkId: '2653,2654', description: '', children: [] },
        { id: 'mf_23_30_31_16', code: '23-30-31-16', name: 'Nonmetal Ducts', xwalkId: '2655', description: '', children: [] }
      ] },
      { id: 'mf_23_30_33', code: '23-30-33', name: 'Air Duct Accessories', xwalkId: '', description: '', children: [
        { id: 'mf_23_30_33_13', code: '23-30-33-13', name: 'Dampers', xwalkId: '2684,2693', description: '', children: [] },
        { id: 'mf_23_30_33_19', code: '23-30-33-19', name: 'Duct Silencers', xwalkId: '2692', description: '', children: [] },
        { id: 'mf_23_30_33_46', code: '23-30-33-46', name: 'Flexible Ducts', xwalkId: '2656', description: '', children: [] }
      ] },
      { id: 'mf_23_30_34', code: '23-30-34', name: 'HVAC Fans', xwalkId: '1850,2676,2679,2685', description: '', children: [
        { id: 'mf_23_30_34_33', code: '23-30-34-33', name: 'Air Curtains', xwalkId: '1849,2659', description: '', children: [] }
      ] },
      { id: 'mf_23_30_35', code: '23-30-35', name: 'Special Exhaust Systems', xwalkId: '2683', description: '', children: [] },
      { id: 'mf_23_30_36', code: '23-30-36', name: 'Air Terminal Units', xwalkId: '2657', description: '', children: [] },
      { id: 'mf_23_30_37', code: '23-30-37', name: 'Air Outlets & Inlets', xwalkId: '', description: '', children: [
        { id: 'mf_23_30_37_13', code: '23-30-37-13', name: 'Diffusers, Registers, & Grilles', xwalkId: '2658', description: '', children: [] },
        { id: 'mf_23_30_37_23', code: '23-30-37-23', name: 'HVAC Gravity Ventilators', xwalkId: '2680', description: '', children: [] }
      ] },
      { id: 'mf_23_30_38', code: '23-30-38', name: 'Ventilation Hoods', xwalkId: '2681', description: '', children: [
        { id: 'mf_23_30_38_13', code: '23-30-38-13', name: 'Commercial-Kitchen Hoods', xwalkId: '1847,1848', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_23_40', code: '23-40', name: 'HVAC Air Cleaning Devices', xwalkId: '', description: '', children: [
      { id: 'mf_23_40_41', code: '23-40-41', name: 'Particulate Air Filtration', xwalkId: '2686', description: '', children: [] },
      { id: 'mf_23_40_43', code: '23-40-43', name: 'Electronic Air Cleaners', xwalkId: '2687', description: '', children: [] }
    ] },
    { id: 'mf_23_50', code: '23-50', name: 'Central Heating Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_23_50_51', code: '23-50-51', name: 'Breechings, Chimneys, & Stacks', xwalkId: '2682', description: '', children: [] },
      { id: 'mf_23_50_52', code: '23-50-52', name: 'Heating Boilers', xwalkId: '2664', description: '', children: [
        { id: 'mf_23_50_52_16', code: '23-50-52-16', name: 'Condensing Boilers', xwalkId: '2663', description: '', children: [] }
      ] },
      { id: 'mf_23_50_55', code: '23-50-55', name: 'Fuel-Fired Heaters', xwalkId: '2665', description: '', children: [] },
      { id: 'mf_23_50_57', code: '23-50-57', name: 'Heat Exchangers for HVAC', xwalkId: '2666', description: '', children: [] }
    ] },
    { id: 'mf_23_60', code: '23-60', name: 'Central Cooling Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_23_60_62', code: '23-60-62', name: 'Packaged Compressor & Condenser Units', xwalkId: '2662', description: '', children: [] },
      { id: 'mf_23_60_64', code: '23-60-64', name: 'Packaged Water Chillers', xwalkId: '2660', description: '', children: [] },
      { id: 'mf_23_60_65', code: '23-60-65', name: 'Cooling Towers', xwalkId: '2661', description: '', children: [] }
    ] },
    { id: 'mf_23_70', code: '23-70', name: 'Central HVAC Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_23_70_72', code: '23-70-72', name: 'Air-to-Air Energy Recovery Equipment', xwalkId: '2667', description: '', children: [] },
      { id: 'mf_23_70_73', code: '23-70-73', name: 'Indoor Central-Station Air-Handling Units', xwalkId: '2668', description: '', children: [] },
      { id: 'mf_23_70_74', code: '23-70-74', name: 'Packaged Outdoor HVAC Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_23_70_74_13', code: '23-70-74-13', name: 'Packaged, Outdoor, Central-Station Air-Handling Units', xwalkId: '2669', description: '', children: [] },
        { id: 'mf_23_70_74_16', code: '23-70-74-16', name: 'Packaged Rooftop Air-Conditioning Units', xwalkId: '2670,2671', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_23_80', code: '23-80', name: 'Decentralized HVAC Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_23_80_81', code: '23-80-81', name: 'Decentralized Unitary HVAC Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_23_80_81_13', code: '23-80-81-13', name: 'Packaged Terminal Air-Conditioners', xwalkId: '2672', description: '', children: [] },
        { id: 'mf_23_80_81_26', code: '23-80-81-26', name: 'Split-System Air-Conditioners', xwalkId: '2673', description: '', children: [] }
      ] },
      { id: 'mf_23_80_82', code: '23-80-82', name: 'Convection Heating & Cooling Units', xwalkId: '', description: '', children: [
        { id: 'mf_23_80_82_19', code: '23-80-82-19', name: 'Fan Coil Units', xwalkId: '2674', description: '', children: [] },
        { id: 'mf_23_80_82_39', code: '23-80-82-39', name: 'Unit Heaters', xwalkId: '2675', description: '', children: [] }
      ] },
      { id: 'mf_23_80_84', code: '23-80-84', name: 'Humidity Control Equipment', xwalkId: '2677', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_25', code: '25', name: 'Integrated Automation', xwalkId: '', description: '', children: [
    { id: 'mf_25_00', code: '25-00', name: 'Integrated Automation', xwalkId: '2697', description: '', children: [] },
    { id: 'mf_25_10', code: '25-10', name: 'Integrated Automation Network Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_25_10_10', code: '25-10-10', name: 'Integrated Automation Network Equipment', xwalkId: '2722', description: '', children: [] },
      { id: 'mf_25_10_15', code: '25-10-15', name: 'Integrated Automation Software', xwalkId: '2723', description: '', children: [] }
    ] },
    { id: 'mf_25_50', code: '25-50', name: 'Integrated Automation Facility Controls', xwalkId: '', description: '', children: [
      { id: 'mf_25_50_50', code: '25-50-50', name: 'Integrated Automation Facility Controls', xwalkId: '2720,2721,2724', description: '', children: [] },
      { id: 'mf_25_50_53', code: '25-50-53', name: 'Integrated Automation Control of Fire-Suppression Systems', xwalkId: '2718', description: '', children: [] },
      { id: 'mf_25_50_54', code: '25-50-54', name: 'Integrated Automation Control of Plumbing', xwalkId: '2719', description: '', children: [] },
      { id: 'mf_25_50_55', code: '25-50-55', name: 'Integrated Automation Control of HVAC', xwalkId: '2707,2708,2709,2710,2711,2712,2713,2714,2715', description: '', children: [] },
      { id: 'mf_25_50_56', code: '25-50-56', name: 'Integrated Automation Control of Electrical Systems', xwalkId: '2716,2717', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_26', code: '26', name: 'Electrical', xwalkId: '', description: '', children: [
    { id: 'mf_26_00', code: '26-00', name: 'Electrical', xwalkId: '1852,2725', description: '', children: [
      { id: 'mf_26_00_05', code: '26-00-05', name: 'Common Work Results for Electrical', xwalkId: '2740,2741,2742,2743,2745,2747,2751', description: '', children: [
        { id: 'mf_26_00_05_29', code: '26-00-05-29', name: 'Hangers & Supports for Electrical Systems', xwalkId: '1154', description: '', children: [] }
      ] },
      { id: 'mf_26_00_09', code: '26-00-09', name: 'Instrumentation & Control for Electrical Systems', xwalkId: '', description: '', children: [
        { id: 'mf_26_00_09_23', code: '26-00-09-23', name: 'Lighting Control Devices', xwalkId: '2739', description: '', children: [] },
        { id: 'mf_26_00_09_61', code: '26-00-09-61', name: 'Theatrical Lighting Controls', xwalkId: '1893', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_26_10', code: '26-10', name: 'Medium-Voltage Electrical Distribution', xwalkId: '', description: '', children: [
      { id: 'mf_26_10_10', code: '26-10-10', name: 'Medium-Voltage Electrical Distribution', xwalkId: '2368,2490,2735', description: '', children: [] }
    ] },
    { id: 'mf_26_20', code: '26-20', name: 'Low-Voltage Electrical Distribution', xwalkId: '', description: '', children: [
      { id: 'mf_26_20_20', code: '26-20-20', name: 'Low-Voltage Electrical Distribution', xwalkId: '2736,2737', description: '', children: [] },
      { id: 'mf_26_20_27', code: '26-20-27', name: 'Low-Voltage Distribution Equipment', xwalkId: '1389', description: '', children: [] }
    ] },
    { id: 'mf_26_40', code: '26-40', name: 'Electrical Protection', xwalkId: '', description: '', children: [
      { id: 'mf_26_40_40', code: '26-40-40', name: 'Electrical Protection', xwalkId: '2734', description: '', children: [] }
    ] },
    { id: 'mf_26_50', code: '26-50', name: 'Lighting', xwalkId: '', description: '', children: [
      { id: 'mf_26_50_50', code: '26-50-50', name: 'Lighting', xwalkId: '2738', description: '', children: [] },
      { id: 'mf_26_50_55', code: '26-50-55', name: 'Special Purpose Lighting', xwalkId: '2369,2491', description: '', children: [
        { id: 'mf_26_50_55_61', code: '26-50-55-61', name: 'Theatrical Lighting', xwalkId: '1892', description: '', children: [] },
        { id: 'mf_26_50_55_63', code: '26-50-55-63', name: 'Detention Lighting', xwalkId: '2153', description: '', children: [] },
        { id: 'mf_26_50_55_68', code: '26-50-55-68', name: 'Athletic Field Lighting', xwalkId: '2750', description: '', children: [] }
      ] },
      { id: 'mf_26_50_56', code: '26-50-56', name: 'Exterior Lighting', xwalkId: '2749', description: '', children: [
        { id: 'mf_26_50_56_13', code: '26-50-56-13', name: 'Lighting Poles & Standards', xwalkId: '240,253', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_27', code: '27', name: 'Communications', xwalkId: '', description: '', children: [
    { id: 'mf_27_00', code: '27-00', name: 'Communications', xwalkId: '', description: '', children: [
      { id: 'mf_27_00_05', code: '27-00-05', name: 'Common Work Results for Communications', xwalkId: '2744', description: '', children: [
        { id: 'mf_27_00_05_28', code: '27-00-05-28', name: 'Pathways for Communications Systems', xwalkId: '2772', description: '', children: [] },
        { id: 'mf_27_00_05_43', code: '27-00-05-43', name: 'Underground Ducts & Raceways for Communications Systems', xwalkId: '2771', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_27_10', code: '27-10', name: 'Structured Cabling', xwalkId: '', description: '', children: [
      { id: 'mf_27_10_10', code: '27-10-10', name: 'Structured Cabling', xwalkId: '2752,2763', description: '', children: [] },
      { id: 'mf_27_10_11', code: '27-10-11', name: 'Communications Equipment Room Fittings', xwalkId: '2767,2768,2769', description: '', children: [
        { id: 'mf_27_10_11_16', code: '27-10-11-16', name: 'Communications Cabinets, Racks, Frames, & Enclosures', xwalkId: '2773', description: '', children: [] },
        { id: 'mf_27_10_11_19', code: '27-10-11-19', name: 'Communications Termination Blocks & Patch Panels', xwalkId: '2774', description: '', children: [] }
      ] },
      { id: 'mf_27_10_13', code: '27-10-13', name: 'Communications Backbone Cabling', xwalkId: '2764,2765', description: '', children: [] },
      { id: 'mf_27_10_15', code: '27-10-15', name: 'Communications Horizontal Cabling', xwalkId: '2766', description: '', children: [] },
      { id: 'mf_27_10_16', code: '27-10-16', name: 'Communications Connecting Cords, Devices, & Adapters', xwalkId: '', description: '', children: [
        { id: 'mf_27_10_16_19', code: '27-10-16-19', name: 'Communications Patch Cords, Station Cords, & Cross Connect Wire', xwalkId: '2775', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_27_20', code: '27-20', name: 'Data Communications', xwalkId: '', description: '', children: [
      { id: 'mf_27_20_20', code: '27-20-20', name: 'Data Communications', xwalkId: '2770', description: '', children: [] },
      { id: 'mf_27_20_24', code: '27-20-24', name: 'Data Communications Peripheral Data Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_27_20_24_26', code: '27-20-24-26', name: 'Virtual Reality Equipment', xwalkId: '2370', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_27_30', code: '27-30', name: 'Voice Communications', xwalkId: '', description: '', children: [
      { id: 'mf_27_30_32', code: '27-30-32', name: 'Voice Communications Terminal Equipment', xwalkId: '2836', description: '', children: [
        { id: 'mf_27_30_32_26', code: '27-30-32-26', name: 'Ring-Down Emergency Telephones', xwalkId: '2837,2852', description: '', children: [] },
        { id: 'mf_27_30_32_43', code: '27-30-32-43', name: 'Radio Communications Equipment', xwalkId: '2838', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_27_40', code: '27-40', name: 'Audio-Video Communications', xwalkId: '', description: '', children: [
      { id: 'mf_27_40_41', code: '27-40-41', name: 'Audio-Video Systems', xwalkId: '2795,2796,2805,2806,2807,2808,2809,2810,2811,2812,2813,2814,2815,2816,2817,2818,2819,2820,2821,2822,2823,2824,2825,2826,2827', description: '', children: [] },
      { id: 'mf_27_40_42', code: '27-40-42', name: 'Electronic Digital Systems', xwalkId: '2828', description: '', children: [] }
    ] },
    { id: 'mf_27_50', code: '27-50', name: 'Distributed Communications & Monitoring Systems', xwalkId: '', description: '', children: [
      { id: 'mf_27_50_50', code: '27-50-50', name: 'Distributed Communications & Monitoring Systems', xwalkId: '2776', description: '', children: [] },
      { id: 'mf_27_50_51', code: '27-50-51', name: 'Distributed Audio-Video Communications Systems', xwalkId: '', description: '', children: [
        { id: 'mf_27_50_51_13', code: '27-50-51-13', name: 'Paging Systems', xwalkId: '2846', description: '', children: [] },
        { id: 'mf_27_50_51_16', code: '27-50-51-16', name: 'Public Address Systems', xwalkId: '2786,2787,2788', description: '', children: [] },
        { id: 'mf_27_50_51_19', code: '27-50-51-19', name: 'Sound Masking Systems', xwalkId: '2847', description: '', children: [] },
        { id: 'mf_27_50_51_23', code: '27-50-51-23', name: 'Intercommunications & Program Systems', xwalkId: '2785', description: '', children: [] },
        { id: 'mf_27_50_51_26', code: '27-50-51-26', name: 'Assistive Listening Systems', xwalkId: '2849', description: '', children: [] },
        { id: 'mf_27_50_51_29', code: '27-50-51-29', name: 'Rescue Assistance Signal Systems', xwalkId: '2851', description: '', children: [] }
      ] },
      { id: 'mf_27_50_52', code: '27-50-52', name: 'Healthcare Communications & Monitoring Systems', xwalkId: '', description: '', children: [
        { id: 'mf_27_50_52_23', code: '27-50-52-23', name: 'Nurse Call/Code Blue Systems', xwalkId: '2850', description: '', children: [] }
      ] },
      { id: 'mf_27_50_53', code: '27-50-53', name: 'Distributed Systems', xwalkId: '2789,2790,2792,2793,2794', description: '', children: [
        { id: 'mf_27_50_53_13', code: '27-50-53-13', name: 'Clock Systems', xwalkId: '2791', description: '', children: [] },
        { id: 'mf_27_50_53_19', code: '27-50-53-19', name: 'Internal Cellular, Paging, & Antenna Systems', xwalkId: '2848', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_28', code: '28', name: 'Electronic Safety & Security', xwalkId: '', description: '', children: [
    { id: 'mf_28_10', code: '28-10', name: 'Access Control', xwalkId: '', description: '', children: [
      { id: 'mf_28_10_10', code: '28-10-10', name: 'Access Control', xwalkId: '2853', description: '', children: [] },
      { id: 'mf_28_10_13', code: '28-10-13', name: 'Access Control Software & Database Management', xwalkId: '2873', description: '', children: [] },
      { id: 'mf_28_10_14', code: '28-10-14', name: 'Access Control System Hardware', xwalkId: '2874,2875', description: '', children: [] },
      { id: 'mf_28_10_15', code: '28-10-15', name: 'Integrated Access Control Hardware Devices', xwalkId: '2868,2869', description: '', children: [
        { id: 'mf_28_10_15_11', code: '28-10-15-11', name: 'Integrated Credential Readers & Entry Management', xwalkId: '2863,2864,2871', description: '', children: [] },
        { id: 'mf_28_10_15_13', code: '28-10-15-13', name: 'Access Control Credentials', xwalkId: '2866', description: '', children: [] },
        { id: 'mf_28_10_15_15', code: '28-10-15-15', name: 'Electrified Locking Devices & Accessories', xwalkId: '2867,2872,2893,2928', description: '', children: [] },
        { id: 'mf_28_10_15_23', code: '28-10-15-23', name: 'Intercom Entry Systems', xwalkId: '2865', description: '', children: [] },
        { id: 'mf_28_10_15_27', code: '28-10-15-27', name: 'Access Control Electronic Turnstiles & Mobility Systems', xwalkId: '2878', description: '', children: [] }
      ] },
      { id: 'mf_28_10_18', code: '28-10-18', name: 'Security Access Detection Equipment', xwalkId: '2876', description: '', children: [] },
      { id: 'mf_28_10_19', code: '28-10-19', name: 'Access Control Vehicle Identification Systems', xwalkId: '2877', description: '', children: [] }
    ] },
    { id: 'mf_28_20', code: '28-20', name: 'Video Surveillance', xwalkId: '', description: '', children: [
      { id: 'mf_28_20_20', code: '28-20-20', name: 'Video Surveillance', xwalkId: '2897,2912,2913', description: '', children: [] },
      { id: 'mf_28_20_21', code: '28-20-21', name: 'Surveillance Cameras', xwalkId: '2906', description: '', children: [
        { id: 'mf_28_20_21_13', code: '28-20-21-13', name: 'IP Cameras', xwalkId: '2907', description: '', children: [] },
        { id: 'mf_28_20_21_15', code: '28-20-21-15', name: 'Specialty Cameras', xwalkId: '2908', description: '', children: [] }
      ] },
      { id: 'mf_28_20_23', code: '28-20-23', name: 'Video Management System', xwalkId: '2909,2910,2911', description: '', children: [] }
    ] },
    { id: 'mf_28_30', code: '28-30', name: 'Security Detection, Alarm, & Monitoring', xwalkId: '', description: '', children: [
      { id: 'mf_28_30_31', code: '28-30-31', name: 'Intrusion Detection', xwalkId: '2879,2889,2890,2891,2892,2894,2895,2896', description: '', children: [] }
    ] },
    { id: 'mf_28_40', code: '28-40', name: 'Life Safety', xwalkId: '', description: '', children: [
      { id: 'mf_28_40_46', code: '28-40-46', name: 'Fire Detection & Alarm', xwalkId: '2914,2935,2936,2937,2938,2939,2940,2941', description: '', children: [
        { id: 'mf_28_40_46_10', code: '28-40-46-10', name: 'Detection & Initiation', xwalkId: '2924,2925,2926,2927', description: '', children: [] },
        { id: 'mf_28_40_46_23', code: '28-40-46-23', name: 'Fire Alarm Notification Appliances', xwalkId: '2929,2930,2931,2932,2933,2934', description: '', children: [] }
      ] },
      { id: 'mf_28_40_48', code: '28-40-48', name: 'Emergency Response Systems', xwalkId: '2942,2948,2949,2950,2951,2952,2953,2954,2955', description: '', children: [] }
    ] },
    { id: 'mf_28_50', code: '28-50', name: 'Specialized Systems', xwalkId: '', description: '', children: [
      { id: 'mf_28_50_52', code: '28-50-52', name: 'Detention Security Systems', xwalkId: '', description: '', children: [
        { id: 'mf_28_50_52_13', code: '28-50-52-13', name: 'Detention Monitoring & Control System & Interfaces', xwalkId: '2154,2155,2156', description: '', children: [] },
        { id: 'mf_28_50_52_15', code: '28-50-52-15', name: 'Detention Video Systems', xwalkId: '2157', description: '', children: [] },
        { id: 'mf_28_50_52_17', code: '28-50-52-17', name: 'Detention Communication Systems', xwalkId: '2158,2159', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_31', code: '31', name: 'Earthwork', xwalkId: '', description: '', children: [
    { id: 'mf_31_10', code: '31-10', name: 'Site Clearing', xwalkId: '', description: '', children: [
      { id: 'mf_31_10_11', code: '31-10-11', name: 'Clearing & Grubbing', xwalkId: '2983,3029', description: '', children: [] },
      { id: 'mf_31_10_14', code: '31-10-14', name: 'Earth Stripping & Stockpiling', xwalkId: '', description: '', children: [
        { id: 'mf_31_10_14_13', code: '31-10-14-13', name: 'Soil Stripping & Stockpiling', xwalkId: '2984,3030', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_31_20', code: '31-20', name: 'Earth Moving', xwalkId: '', description: '', children: [
      { id: 'mf_31_20_22', code: '31-20-22', name: 'Grading', xwalkId: '3022,3023,3026,3035,3179,3189,3202,3270,3447', description: '', children: [
        { id: 'mf_31_20_22_19', code: '31-20-22-19', name: 'Finish Grading', xwalkId: '3027,3037,3182,3192,3205,3273', description: '', children: [] }
      ] },
      { id: 'mf_31_20_23', code: '31-20-23', name: 'Excavation & Fill', xwalkId: '2956,2957,2985,2986,2987,2988,2989,2992,2993,2994,3020,3021,3024,3031,3034,3039,3040', description: '', children: [
        { id: 'mf_31_20_23_16', code: '31-20-23-16', name: 'Excavation', xwalkId: '2990', description: '', children: [] },
        { id: 'mf_31_20_23_19', code: '31-20-23-19', name: 'Dewatering', xwalkId: '59,2326,2967,3347', description: '', children: [] },
        { id: 'mf_31_20_23_23', code: '31-20-23-23', name: 'Fill', xwalkId: '2995,3004,3013,3014,3019,3025,3036,3078,3456', description: '', children: [] },
        { id: 'mf_31_20_23_33', code: '31-20-23-33', name: 'Trenching & Backfilling', xwalkId: '3512,3513,3530,3531,3545,3546,3565,3566,3572,3573,3582,3583', description: '', children: [] }
      ] },
      { id: 'mf_31_20_24', code: '31-20-24', name: 'Embankments', xwalkId: '3032', description: '', children: [] },
      { id: 'mf_31_20_25', code: '31-20-25', name: 'Erosion & Sedimentation Controls', xwalkId: '3045,3046,3047,3049,3050,3051,3052,3056,3061,3062', description: '', children: [
        { id: 'mf_31_20_25_14', code: '31-20-25-14', name: 'Stabilization Measures for Erosion & Sedimentation Control', xwalkId: '3054', description: '', children: [] },
        { id: 'mf_31_20_25_24', code: '31-20-25-24', name: 'Structural Measures for Erosion & Sedimentation Control', xwalkId: '3053', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_31_30', code: '31-30', name: 'Earthwork Methods', xwalkId: '', description: '', children: [
      { id: 'mf_31_30_31', code: '31-30-31', name: 'Soil Treatment', xwalkId: '3066', description: '', children: [
        { id: 'mf_31_30_31_13', code: '31-30-31-13', name: 'Rodent Control', xwalkId: '3064', description: '', children: [] },
        { id: 'mf_31_30_31_16', code: '31-30-31-16', name: 'Termite Control', xwalkId: '3063', description: '', children: [] },
        { id: 'mf_31_30_31_19', code: '31-30-31-19', name: 'Vegetation Control', xwalkId: '3065', description: '', children: [] }
      ] },
      { id: 'mf_31_30_32', code: '31-30-32', name: 'Soil Stabilization', xwalkId: '2996,3005,3033,3180,3190,3203,3213,3220,3225,3230,3271,3448', description: '', children: [
        { id: 'mf_31_30_32_13', code: '31-30-32-13', name: 'Soil Mixing Stabilization', xwalkId: '2997,2998,2999,3006,3007,3008', description: '', children: [] },
        { id: 'mf_31_30_32_16', code: '31-30-32-16', name: 'Chemical Treatment Soil Stabilization', xwalkId: '3000,3009', description: '', children: [] },
        { id: 'mf_31_30_32_17', code: '31-30-32-17', name: 'Water Injection Soil Stabilization', xwalkId: '3001,3010', description: '', children: [] },
        { id: 'mf_31_30_32_19', code: '31-30-32-19', name: 'Geosynthetic Soil Stabilization & Layer Separation', xwalkId: '3003,3012', description: '', children: [] },
        { id: 'mf_31_30_32_23', code: '31-30-32-23', name: 'Pressure Grouting Soil Stabilization', xwalkId: '3002,3011', description: '', children: [] }
      ] },
      { id: 'mf_31_30_37', code: '31-30-37', name: 'Riprap', xwalkId: '3418,3538,3578', description: '', children: [] }
    ] },
    { id: 'mf_31_50', code: '31-50', name: 'Excavation Support & Protection', xwalkId: '', description: '', children: [
      { id: 'mf_31_50_50', code: '31-50-50', name: 'Excavation Support & Protection', xwalkId: '2991,3038', description: '', children: [] }
    ] },
    { id: 'mf_31_60', code: '31-60', name: 'Special Foundations & Load-Bearing Elements', xwalkId: '', description: '', children: [
      { id: 'mf_31_60_63', code: '31-60-63', name: 'Bored Piles', xwalkId: '166,167,168,169,170', description: '', children: [] }
    ] }
  ] },
  { id: 'mf_32', code: '32', name: 'Exterior Improvements', xwalkId: '', description: '', children: [
    { id: 'mf_32_00', code: '32-00', name: 'Exterior Improvements', xwalkId: '', description: '', children: [
      { id: 'mf_32_00_01', code: '32-00-01', name: 'Operation & Maintenance of Exterior Improvements', xwalkId: '', description: '', children: [
        { id: 'mf_32_00_01_13', code: '32-00-01-13', name: 'Flexible Paving Surface Treatment', xwalkId: '3091,3098,3207', description: '', children: [] },
        { id: 'mf_32_00_01_16', code: '32-00-01-16', name: 'Flexible Paving Rehabilitation', xwalkId: '3093,3100', description: '', children: [] },
        { id: 'mf_32_00_01_17', code: '32-00-01-17', name: 'Flexible Paving Repair', xwalkId: '3092,3099', description: '', children: [] },
        { id: 'mf_32_00_01_80', code: '32-00-01-80', name: 'Operation & Maintenance of Irrigation', xwalkId: '3432', description: '', children: [] },
        { id: 'mf_32_00_01_90', code: '32-00-01-90', name: 'Operation & Maintenance of Planting', xwalkId: '3405,3406,3407,3408,3430', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_32_10', code: '32-10', name: 'Bases, Ballasts, & Paving', xwalkId: '', description: '', children: [
      { id: 'mf_32_10_11', code: '32-10-11', name: 'Base Courses', xwalkId: '3015,3016,3017,3079,3117,3120,3181,3191,3204,3214,3221,3226,3231,3272,3449,3453', description: '', children: [
        { id: 'mf_32_10_11_16', code: '32-10-11-16', name: 'Subbase Courses', xwalkId: '3113', description: '', children: [] },
        { id: 'mf_32_10_11_36', code: '32-10-11-36', name: 'Concrete Base Courses', xwalkId: '230', description: '', children: [] }
      ] },
      { id: 'mf_32_10_12', code: '32-10-12', name: 'Flexible Paving', xwalkId: '3094,3095,3101,3102', description: '', children: [
        { id: 'mf_32_10_12_13', code: '32-10-12-13', name: 'Preparatory Coats', xwalkId: '3080', description: '', children: [] },
        { id: 'mf_32_10_12_16', code: '32-10-12-16', name: 'Asphalt Paving', xwalkId: '3081,3082,3083,3084,3085,3086,3090,3096,3097', description: '', children: [] },
        { id: 'mf_32_10_12_36', code: '32-10-12-36', name: 'Seal Coats', xwalkId: '3087', description: '', children: [] },
        { id: 'mf_32_10_12_43', code: '32-10-12-43', name: 'Porous Flexible Paving', xwalkId: '3088', description: '', children: [] }
      ] },
      { id: 'mf_32_10_13', code: '32-10-13', name: 'Rigid Paving', xwalkId: '213,214,215,216,217,218,219,220,221,222,223,224,248', description: '', children: [
        { id: 'mf_32_10_13_13', code: '32-10-13-13', name: 'Concrete Paving', xwalkId: '3465,3466,3467,3468,3469,3470,3471,3472,3473,3474,3475,3476,3477,3478,3479,3480,3481,3482', description: '', children: [] }
      ] },
      { id: 'mf_32_10_14', code: '32-10-14', name: 'Unit Paving', xwalkId: '246,3114,3115,3119', description: '', children: [
        { id: 'mf_32_10_14_13', code: '32-10-14-13', name: 'Precast Concrete Unit Paving', xwalkId: '3109', description: '', children: [] },
        { id: 'mf_32_10_14_16', code: '32-10-14-16', name: 'Brick Unit Paving', xwalkId: '3110', description: '', children: [] },
        { id: 'mf_32_10_14_23', code: '32-10-14-23', name: 'Asphalt Unit Paving', xwalkId: '3111', description: '', children: [] },
        { id: 'mf_32_10_14_40', code: '32-10-14-40', name: 'Stone Paving', xwalkId: '3112', description: '', children: [] },
        { id: 'mf_32_10_14_43', code: '32-10-14-43', name: 'Porous Unit Paving', xwalkId: '3116', description: '', children: [] }
      ] },
      { id: 'mf_32_10_15', code: '32-10-15', name: 'Aggregate Surfacing', xwalkId: '3018,3419,3420', description: '', children: [] },
      { id: 'mf_32_10_16', code: '32-10-16', name: 'Curbs, Gutters, Sidewalks, & Driveways', xwalkId: '', description: '', children: [
        { id: 'mf_32_10_16_13', code: '32-10-16-13', name: 'Curbs & Gutters', xwalkId: '225,226,249,250,3089,3211,3219', description: '', children: [] },
        { id: 'mf_32_10_16_23', code: '32-10-16-23', name: 'Sidewalks', xwalkId: '228,229,231,233,239,251,252', description: '', children: [] }
      ] },
      { id: 'mf_32_10_17', code: '32-10-17', name: 'Paving Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_32_10_17_13', code: '32-10-17-13', name: 'Parking Bumpers', xwalkId: '3146', description: '', children: [] },
        { id: 'mf_32_10_17_23', code: '32-10-17-23', name: 'Pavement Markings', xwalkId: '3131,3132,3133,3134,3135,3136,3137,3138,3139,3140,3141,3142,3143,3144,3147,3148,3149,3150,3151,3152,3153', description: '', children: [] }
      ] },
      { id: 'mf_32_10_18', code: '32-10-18', name: 'Athletic & Recreational Surfacing', xwalkId: '3154,3155,3156,3157,3158,3159,3160,3161,3162,3215,3216,3217,3222,3223,3227,3228,3232,3233,3234,3236', description: '', children: [
        { id: 'mf_32_10_18_13', code: '32-10-18-13', name: 'Synthetic Grass Surfacing', xwalkId: '3445,3450,3451', description: '', children: [] },
        { id: 'mf_32_10_18_16', code: '32-10-18-16', name: 'Synthetic Resilient Surfacing', xwalkId: '3452,3454,3455', description: '', children: [] },
        { id: 'mf_32_10_18_23', code: '32-10-18-23', name: 'Athletic Surfacing', xwalkId: '3178,3183,3184,3187,3193,3194,3195,3196,3197,3200,3206,3208,3210,3255,3269,3274,3275,3276,3277,3278', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_32_30', code: '32-30', name: 'Site Improvements', xwalkId: '', description: '', children: [
      { id: 'mf_32_30_31', code: '32-30-31', name: 'Fences & Gates', xwalkId: '3252,3253,3254,3321,3322,3323,3325,3326,3327,3328,3329,3330,3332,3333,3334,3335,3336,3358', description: '', children: [
        { id: 'mf_32_30_31_11', code: '32-30-31-11', name: 'Gate Operators', xwalkId: '3331', description: '', children: [] },
        { id: 'mf_32_30_31_13', code: '32-30-31-13', name: 'Chain Link Fences & Gates', xwalkId: '3245,3287,3288,3289,3290,3298,3299,3300,3301,3302,3303,3304,3305,3306', description: '', children: [] },
        { id: 'mf_32_30_31_17', code: '32-30-31-17', name: 'Expanded Metal Fences & Gates', xwalkId: '3318,3319,3320', description: '', children: [] },
        { id: 'mf_32_30_31_19', code: '32-30-31-19', name: 'Decorative Metal Fences & Gates', xwalkId: '3307,3308,3309,3310,3311', description: '', children: [] },
        { id: 'mf_32_30_31_26', code: '32-30-31-26', name: 'Wire Fences & Gates', xwalkId: '3315,3316,3317', description: '', children: [] },
        { id: 'mf_32_30_31_29', code: '32-30-31-29', name: 'Wood Fences & Gates', xwalkId: '3312,3313,3314', description: '', children: [] }
      ] },
      { id: 'mf_32_30_32', code: '32-30-32', name: 'Retaining Walls', xwalkId: '3353,3354,3355,3356,3357', description: '', children: [
        { id: 'mf_32_30_32_13', code: '32-30-32-13', name: 'Cast-in-Place Concrete Retaining Walls', xwalkId: '234', description: '', children: [] },
        { id: 'mf_32_30_32_16', code: '32-30-32-16', name: 'Precast Concrete Retaining Walls', xwalkId: '3348', description: '', children: [] },
        { id: 'mf_32_30_32_23', code: '32-30-32-23', name: 'Segmental Retaining Walls', xwalkId: '3349', description: '', children: [] },
        { id: 'mf_32_30_32_26', code: '32-30-32-26', name: 'Metal Crib Retaining Walls', xwalkId: '3350', description: '', children: [] },
        { id: 'mf_32_30_32_36', code: '32-30-32-36', name: 'Gabion Retaining Walls', xwalkId: '3351', description: '', children: [] },
        { id: 'mf_32_30_32_53', code: '32-30-32-53', name: 'Stone Retaining Walls', xwalkId: '3352', description: '', children: [] }
      ] },
      { id: 'mf_32_30_33', code: '32-30-33', name: 'Site Furnishings', xwalkId: '237,3372,3379,3381', description: '', children: [
        { id: 'mf_32_30_33_13', code: '32-30-33-13', name: 'Site Bicycle Racks', xwalkId: '3365', description: '', children: [] },
        { id: 'mf_32_30_33_14', code: '32-30-33-14', name: 'Site Bicycle Lockers', xwalkId: '3366', description: '', children: [] },
        { id: 'mf_32_30_33_15', code: '32-30-33-15', name: 'Site Bicycle Shelters', xwalkId: '3367', description: '', children: [] },
        { id: 'mf_32_30_33_23', code: '32-30-33-23', name: 'Site Trash & Litter Receptacles', xwalkId: '3373', description: '', children: [] },
        { id: 'mf_32_30_33_33', code: '32-30-33-33', name: 'Site Manufactured Planters', xwalkId: '3378', description: '', children: [] },
        { id: 'mf_32_30_33_43', code: '32-30-33-43', name: 'Site Seating & Tables', xwalkId: '3368,3369,3370,3371,3374,3375', description: '', children: [] }
      ] },
      { id: 'mf_32_30_34', code: '32-30-34', name: 'Fabricated Bridges', xwalkId: '', description: '', children: [
        { id: 'mf_32_30_34_13', code: '32-30-34-13', name: 'Fabricated Pedestrian Bridges', xwalkId: '530', description: '', children: [] }
      ] },
      { id: 'mf_32_30_39', code: '32-30-39', name: 'Manufactured Site Specialties', xwalkId: '', description: '', children: [
        { id: 'mf_32_30_39_13', code: '32-30-39-13', name: 'Manufactured Metal Bollards', xwalkId: '3376', description: '', children: [] },
        { id: 'mf_32_30_39_16', code: '32-30-39-16', name: 'Manufactured Fire Pits', xwalkId: '3380', description: '', children: [] },
        { id: 'mf_32_30_39_33', code: '32-30-39-33', name: 'Artificial Rock Fabrications', xwalkId: '3421,3422,3423,3435', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_32_80', code: '32-80', name: 'Irrigation', xwalkId: '', description: '', children: [
      { id: 'mf_32_80_80', code: '32-80-80', name: 'Irrigation', xwalkId: '3426,3427,3429,3436,3518,3519,3520,3521', description: '', children: [] },
      { id: 'mf_32_80_81', code: '32-80-81', name: 'Irrigation Components', xwalkId: '3425', description: '', children: [] },
      { id: 'mf_32_80_82', code: '32-80-82', name: 'Irrigation Pumps', xwalkId: '3428', description: '', children: [] },
      { id: 'mf_32_80_84', code: '32-80-84', name: 'Planting Irrigation', xwalkId: '3186,3199,3280,3424', description: '', children: [] }
    ] },
    { id: 'mf_32_90', code: '32-90', name: 'Planting', xwalkId: '', description: '', children: [
      { id: 'mf_32_90_90', code: '32-90-90', name: 'Planting', xwalkId: '3431,3433,3437', description: '', children: [] },
      { id: 'mf_32_90_91', code: '32-90-91', name: 'Planting Preparation', xwalkId: '', description: '', children: [
        { id: 'mf_32_90_91_13', code: '32-90-91-13', name: 'Soil Preparation', xwalkId: '3396,3397', description: '', children: [] },
        { id: 'mf_32_90_91_19', code: '32-90-91-19', name: 'Landscape Grading', xwalkId: '3398,3399', description: '', children: [] }
      ] },
      { id: 'mf_32_90_92', code: '32-90-92', name: 'Turf & Grasses', xwalkId: '', description: '', children: [
        { id: 'mf_32_90_92_13', code: '32-90-92-13', name: 'Hydro-Mulching', xwalkId: '3400', description: '', children: [] },
        { id: 'mf_32_90_92_19', code: '32-90-92-19', name: 'Seeding', xwalkId: '3401,3402', description: '', children: [] },
        { id: 'mf_32_90_92_23', code: '32-90-92-23', name: 'Sodding', xwalkId: '3403', description: '', children: [] },
        { id: 'mf_32_90_92_26', code: '32-90-92-26', name: 'Sprigging', xwalkId: '3404', description: '', children: [] }
      ] },
      { id: 'mf_32_90_93', code: '32-90-93', name: 'Plants', xwalkId: '', description: '', children: [
        { id: 'mf_32_90_93_13', code: '32-90-93-13', name: 'Ground Covers', xwalkId: '3391', description: '', children: [] },
        { id: 'mf_32_90_93_23', code: '32-90-93-23', name: 'Plants & Bulbs', xwalkId: '3392', description: '', children: [] },
        { id: 'mf_32_90_93_33', code: '32-90-93-33', name: 'Shrubs', xwalkId: '3393', description: '', children: [] },
        { id: 'mf_32_90_93_43', code: '32-90-93-43', name: 'Trees', xwalkId: '3394', description: '', children: [] },
        { id: 'mf_32_90_93_93', code: '32-90-93-93', name: 'Exterior Artificial Plants', xwalkId: '3395', description: '', children: [] }
      ] },
      { id: 'mf_32_90_94', code: '32-90-94', name: 'Planting Accessories', xwalkId: '3409,3413,3434', description: '', children: [
        { id: 'mf_32_90_94_13', code: '32-90-94-13', name: 'Landscape Edging', xwalkId: '3410', description: '', children: [] },
        { id: 'mf_32_90_94_43', code: '32-90-94-43', name: 'Tree Grates', xwalkId: '3411', description: '', children: [] }
      ] },
      { id: 'mf_32_90_95', code: '32-90-95', name: 'Exterior Planting Support Structures', xwalkId: '3412', description: '', children: [] },
      { id: 'mf_32_90_96', code: '32-90-96', name: 'Transplanting', xwalkId: '', description: '', children: [
        { id: 'mf_32_90_96_13', code: '32-90-96-13', name: 'Ground Cover Transplanting', xwalkId: '3414', description: '', children: [] },
        { id: 'mf_32_90_96_23', code: '32-90-96-23', name: 'Plant & Bulb Transplanting', xwalkId: '3415', description: '', children: [] },
        { id: 'mf_32_90_96_33', code: '32-90-96-33', name: 'Shrub Transplanting', xwalkId: '3416', description: '', children: [] },
        { id: 'mf_32_90_96_43', code: '32-90-96-43', name: 'Tree Transplanting', xwalkId: '3417', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_33', code: '33', name: 'Utilities', xwalkId: '', description: '', children: [
    { id: 'mf_33_00', code: '33-00', name: 'Utilities', xwalkId: '', description: '', children: [
      { id: 'mf_33_00_05', code: '33-00-05', name: 'Common Work Results for Utilities', xwalkId: '3552,3553,3559,3560', description: '', children: [
        { id: 'mf_33_00_05_04', code: '33-00-05-04', name: 'Selective Demolition for Utilities', xwalkId: '3498,3499,3500,3501,3502,3503,3554,3555,3556,3557,3558', description: '', children: [] },
        { id: 'mf_33_00_05_07', code: '33-00-05-07', name: 'Trenchless Installation of Utility Piping', xwalkId: '3510,3511,3516,3528,3529,3543,3544,3563,3564,3570,3571,3580,3581,3584', description: '', children: [] },
        { id: 'mf_33_00_05_33', code: '33-00-05-33', name: 'Polyethylene Utility Pipe', xwalkId: '3549,3550,3551', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_33_10', code: '33-10', name: 'Water Utilities', xwalkId: '', description: '', children: [
      { id: 'mf_33_10_10', code: '33-10-10', name: 'Water Utilities', xwalkId: '3508,3509', description: '', children: [] },
      { id: 'mf_33_10_14', code: '33-10-14', name: 'Water Utility Transmission & Distribution', xwalkId: '', description: '', children: [
        { id: 'mf_33_10_14_13', code: '33-10-14-13', name: 'Public Water Utility Distribution Piping', xwalkId: '3561', description: '', children: [] },
        { id: 'mf_33_10_14_16', code: '33-10-14-16', name: 'Site Water Utility Distribution Piping', xwalkId: '3504,3505,3515', description: '', children: [] },
        { id: 'mf_33_10_14_19', code: '33-10-14-19', name: 'Valves & Hydrants for Water Utility Service', xwalkId: '3507,3514', description: '', children: [] }
      ] },
      { id: 'mf_33_10_16', code: '33-10-16', name: 'Water Utility Storage Tanks', xwalkId: '', description: '', children: [
        { id: 'mf_33_10_16_53', code: '33-10-16-53', name: 'Ground-Level Metal Water Storage Cisterns', xwalkId: '3517', description: '', children: [] }
      ] },
      { id: 'mf_33_10_19', code: '33-10-19', name: 'Water Utility Metering Equipment', xwalkId: '3506,3562', description: '', children: [] }
    ] },
    { id: 'mf_33_30', code: '33-30', name: 'Sanitary Sewerage', xwalkId: '', description: '', children: [
      { id: 'mf_33_30_30', code: '33-30-30', name: 'Sanitary Sewerage', xwalkId: '3523,3532,3568', description: '', children: [] },
      { id: 'mf_33_30_31', code: '33-30-31', name: 'Sanitary Sewerage Piping', xwalkId: '3522,3533', description: '', children: [
        { id: 'mf_33_30_31_11', code: '33-30-31-11', name: 'Public Sanitary Sewerage Gravity Piping', xwalkId: '3567', description: '', children: [] }
      ] },
      { id: 'mf_33_30_32', code: '33-30-32', name: 'Sanitary Sewerage Equipment', xwalkId: '3524', description: '', children: [] },
      { id: 'mf_33_30_34', code: '33-30-34', name: 'Onsite Wastewater Disposal', xwalkId: '3526', description: '', children: [
        { id: 'mf_33_30_34_13', code: '33-30-34-13', name: 'Septic Tanks', xwalkId: '3525,3569', description: '', children: [] },
        { id: 'mf_33_30_34_33', code: '33-30-34-33', name: 'Onsite Intermittent Wastewater Filtration Systems', xwalkId: '3527', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_33_40', code: '33-40', name: 'Stormwater Utilities', xwalkId: '', description: '', children: [
      { id: 'mf_33_40_40', code: '33-40-40', name: 'Stormwater Utilities', xwalkId: '3535,3536,3541,3547,3548,3574,3575,3576', description: '', children: [] },
      { id: 'mf_33_40_41', code: '33-40-41', name: 'Subdrainage', xwalkId: '2615,2616,3118,3121,3185,3198,3209,3218,3224,3229,3235,3279,3446,3540', description: '', children: [] },
      { id: 'mf_33_40_42', code: '33-40-42', name: 'Stormwater Conveyance', xwalkId: '3534', description: '', children: [
        { id: 'mf_33_40_42_13', code: '33-40-42-13', name: 'Stormwater Culverts', xwalkId: '3537,3577', description: '', children: [] },
        { id: 'mf_33_40_42_41', code: '33-40-42-41', name: 'Gratings & Frames for Stormwater Drainage Inlets', xwalkId: '543,544,545,546,547,548,3542,3579', description: '', children: [] }
      ] },
      { id: 'mf_33_40_44', code: '33-40-44', name: 'Stormwater Utility Equipment', xwalkId: '3539', description: '', children: [] },
      { id: 'mf_33_40_46', code: '33-40-46', name: 'Stormwater Management', xwalkId: '', description: '', children: [
        { id: 'mf_33_40_46_11', code: '33-40-46-11', name: 'Stormwater Ponds', xwalkId: '3057,3058,3059,3060', description: '', children: [] },
        { id: 'mf_33_40_46_16', code: '33-40-46-16', name: 'Outlet Structures for Stormwater Ponds', xwalkId: '232', description: '', children: [] }
      ] }
    ] },
    { id: 'mf_33_70', code: '33-70', name: 'Electrical Utilities', xwalkId: '', description: '', children: [
      { id: 'mf_33_70_71', code: '33-70-71', name: 'Electrical Utility Transmission & Distribution', xwalkId: '', description: '', children: [
        { id: 'mf_33_70_71_19', code: '33-70-71-19', name: 'Electrical Underground Ducts, Ductbanks,And Manholes', xwalkId: '247,2746', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_34', code: '34', name: 'Transportation', xwalkId: '', description: '', children: [
    { id: 'mf_34_40', code: '34-40', name: 'Transportation Signaling & Control Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_34_40_41', code: '34-40-41', name: 'Roadway Signaling & Control Equipment', xwalkId: '', description: '', children: [
        { id: 'mf_34_40_41_13', code: '34-40-41-13', name: 'Traffic Signals', xwalkId: '3592,3593,3594,3595,3601,3602,3603,3604,3606,3607,3608', description: '', children: [] },
        { id: 'mf_34_40_41_16', code: '34-40-41-16', name: 'Traffic Control Equipment', xwalkId: '3596,3597,3598', description: '', children: [] },
        { id: 'mf_34_40_41_23', code: '34-40-41-23', name: 'Roadway Monitoring Equipment', xwalkId: '3599,3600', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_41', code: '41', name: 'Material Processing & Handling Equipment', xwalkId: '', description: '', children: [
    { id: 'mf_41_20', code: '41-20', name: 'Piece Material Handling Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_41_20_22', code: '41-20-22', name: 'Cranes & Hoists', xwalkId: '', description: '', children: [
        { id: 'mf_41_20_22_23', code: '41-20-22-23', name: 'Hoists', xwalkId: '1391', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'mf_43', code: '43', name: 'Process Gas & Liquid Handling, Purification, & Storage Equipment', xwalkId: '', description: '', children: [
    { id: 'mf_43_20', code: '43-20', name: 'Liquid Handling Equipment', xwalkId: '', description: '', children: [
      { id: 'mf_43_20_20', code: '43-20-20', name: 'Liquid Handling Equipment', xwalkId: '1992', description: '', children: [] }
    ] },
    { id: 'mf_43_40', code: '43-40', name: 'Gas & Liquid Storage', xwalkId: '', description: '', children: [
      { id: 'mf_43_40_40', code: '43-40-40', name: 'Gas & Liquid Storage', xwalkId: '1996', description: '', children: [] }
    ] }
  ] }
];

const ASSEMBLY_ITEMS = MASTERFORMAT_ITEMS;

const UNIFORMAT_ITEMS: RefItem[] = [
  { id: 'uf_A', code: 'A', name: 'SUBSTRUCTURE', xwalkId: '', description: '', children: [
    { id: 'uf_A_10', code: 'A-10', name: 'FOUNDATIONS', xwalkId: '', description: '', children: [
      { id: 'uf_A_10_10', code: 'A-10-10', name: 'Standard Foundations', xwalkId: '', description: '', children: [
        { id: 'uf_A_10_10_10', code: 'A-10-10-10', name: 'Wall Foundations', xwalkId: '174', description: '', children: [] },
        { id: 'uf_A_10_10_30', code: 'A-10-10-30', name: 'Column Foundations', xwalkId: '172,176,186', description: '', children: [] }
      ] },
      { id: 'uf_A_10_20', code: 'A-10-20', name: 'Special Foundations', xwalkId: '179', description: '', children: [
        { id: 'uf_A_10_20_15', code: 'A-10-20-15', name: 'Bored Piles', xwalkId: '166,167,168,169,170', description: '', children: [] },
        { id: 'uf_A_10_20_30', code: 'A-10-20-30', name: 'Special Foundation Walls', xwalkId: '178', description: '', children: [] },
        { id: 'uf_A_10_20_60', code: 'A-10-20-60', name: 'Raft Foundations', xwalkId: '173', description: '', children: [] },
        { id: 'uf_A_10_20_70', code: 'A-10-20-70', name: 'Pile Caps', xwalkId: '171', description: '', children: [] },
        { id: 'uf_A_10_20_80', code: 'A-10-20-80', name: 'Grade Beams', xwalkId: '175', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_A_40', code: 'A-40', name: 'SLABS-ON-GRADE', xwalkId: '', description: '', children: [
      { id: 'uf_A_40_10', code: 'A-40-10', name: 'Standard Slabs-on-Grade', xwalkId: '181,183,184,187,188,189', description: '', children: [] },
      { id: 'uf_A_40_20', code: 'A-40-20', name: 'Structural Slabs-on-Grade', xwalkId: '182', description: '', children: [] },
      { id: 'uf_A_40_40', code: 'A-40-40', name: 'Pits and Bases', xwalkId: '177', description: '', children: [] },
      { id: 'uf_A_40_90', code: 'A-40-90', name: 'Slab-On-Grade Supplementary Components', xwalkId: '669', description: '', children: [
        { id: 'uf_A_40_90_10', code: 'A-40-90-10', name: 'Perimeter Insulation', xwalkId: '689', description: '', children: [] },
        { id: 'uf_A_40_90_30', code: 'A-40-90-30', name: 'Waterproofing', xwalkId: '654,655', description: '', children: [] },
        { id: 'uf_A_40_90_50', code: 'A-40-90-50', name: 'Mud Slab', xwalkId: '180', description: '', children: [] },
        { id: 'uf_A_40_90_60', code: 'A-40-90-60', name: 'Subbase Layer', xwalkId: '3015', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_A_60', code: 'A-60', name: 'WATER AND GAS MITIGATION', xwalkId: '', description: '', children: [
      { id: 'uf_A_60_10', code: 'A-60-10', name: 'Building Subdrainage', xwalkId: '2615,2616', description: '', children: [] }
    ] },
    { id: 'uf_A_90', code: 'A-90', name: 'SUBSTRUCTURE RELATED ACTIVITIES', xwalkId: '', description: '', children: [
      { id: 'uf_A_90_10', code: 'A-90-10', name: 'Substructure Excavation', xwalkId: '2985', description: '', children: [
        { id: 'uf_A_90_10_10', code: 'A-90-10-10', name: 'Backfill and Compaction', xwalkId: '3013,3020,3021', description: '', children: [] }
      ] },
      { id: 'uf_A_90_20', code: 'A-90-20', name: 'Construction Dewatering', xwalkId: '2326,2967,3347', description: '', children: [] },
      { id: 'uf_A_90_30', code: 'A-90-30', name: 'Excavation Support', xwalkId: '2991', description: '', children: [] },
      { id: 'uf_A_90_40', code: 'A-90-40', name: 'Soil Treatment', xwalkId: '3063,3064,3065,3066', description: '', children: [] }
    ] }
  ] },
  { id: 'uf_B', code: 'B', name: 'SHELL', xwalkId: '', description: '', children: [
    { id: 'uf_B_10', code: 'B-10', name: 'SUPERSTRUCTURE', xwalkId: '490,491,492,583,584,585,599,602,604', description: '', children: [
      { id: 'uf_B_10_10', code: 'B-10-10', name: 'Floor Construction', xwalkId: '292,293,295,300,301,475,476,477,493,494,495,496,513,531,532,598,601', description: '', children: [
        { id: 'uf_B_10_10_10', code: 'B-10-10-10', name: 'Floor Structural Frame', xwalkId: '192,193,194,274,275,276,277,278,279,280,281,600', description: '', children: [] },
        { id: 'uf_B_10_10_20', code: 'B-10-10-20', name: 'Floor Decks, Slabs, and Toppings', xwalkId: '185,190,191,196,197,206,207,209,210,211,212,337,338,1239', description: '', children: [] },
        { id: 'uf_B_10_10_30', code: 'B-10-10-30', name: 'Balcony Floor Construction', xwalkId: '1240', description: '', children: [] },
        { id: 'uf_B_10_10_90', code: 'B-10-10-90', name: 'Floor Construction Supplementary Components', xwalkId: '314,315,316,345,690,691,692,693,694,699', description: '', children: [] }
      ] },
      { id: 'uf_B_10_20', code: 'B-10-20', name: 'Roof Construction', xwalkId: '254,262,263,264,265,294,497,498,499,500,501,502,503,504,603,606', description: '', children: [
        { id: 'uf_B_10_20_10', code: 'B-10-20-10', name: 'Roof Structural Frame', xwalkId: '605,635,636,637,638,639', description: '', children: [] },
        { id: 'uf_B_10_20_20', code: 'B-10-20-20', name: 'Roof Decks, Slabs, and Sheathing', xwalkId: '199,640', description: '', children: [] },
        { id: 'uf_B_10_20_90', code: 'B-10-20-90', name: 'Roof Construction Supplementary Components', xwalkId: '641,642,643,644,790,792,795', description: '', children: [] }
      ] },
      { id: 'uf_B_10_80', code: 'B-10-80', name: 'Stairs', xwalkId: '298,303,304,515,516,517,518,519', description: '', children: [
        { id: 'uf_B_10_80_10', code: 'B-10-80-10', name: 'Stair Construction', xwalkId: '195,198,537,538,577,578,579,580,581,1347', description: '', children: [] },
        { id: 'uf_B_10_80_50', code: 'B-10-80-50', name: 'Stair Railings', xwalkId: '1346', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_B_20', code: 'B-20', name: 'EXTERIOR VERTICAL ENCLOSURES', xwalkId: '', description: '', children: [
      { id: 'uf_B_20_10', code: 'B-20-10', name: 'Exterior Walls', xwalkId: '505,506,507,508,509,510', description: '', children: [
        { id: 'uf_B_20_10_10', code: 'B-20-10-10', name: 'Exterior Wall Veneer', xwalkId: '380,381,382,383,384,740,742,744,747,750,751,754,755,756,757,769,770,771', description: '', children: [] },
        { id: 'uf_B_20_10_20', code: 'B-20-10-20', name: 'Exterior Wall Construction', xwalkId: '200,201,202,203,204,296,297,299,302,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370', description: '', children: [] },
        { id: 'uf_B_20_10_40', code: 'B-20-10-40', name: 'Fabricated Exterior Wall Assemblies', xwalkId: '1030,1031,1033', description: '', children: [] },
        { id: 'uf_B_20_10_50', code: 'B-20-10-50', name: 'Parapets', xwalkId: '618', description: '', children: [] },
        { id: 'uf_B_20_10_60', code: 'B-20-10-60', name: 'Equipment Screens', xwalkId: '743,1052,1053,1054', description: '', children: [] },
        { id: 'uf_B_20_10_80', code: 'B-20-10-80', name: 'Exterior Wall Supplementary Components', xwalkId: '324,325,326,327,328,385,386,387,388,389,470,611,620,621,656,659,660,661,662,663,664,665', description: '', children: [] },
        { id: 'uf_B_20_10_90', code: 'B-20-10-90', name: 'Exterior Wall Opening Supplementary Components', xwalkId: '471,472,473,474,2219,2220', description: '', children: [] }
      ] },
      { id: 'uf_B_20_20', code: 'B-20-20', name: 'Exterior Windows', xwalkId: '983', description: '', children: [
        { id: 'uf_B_20_20_10', code: 'B-20-20-10', name: 'Exterior Operating Windows', xwalkId: '1017', description: '', children: [] },
        { id: 'uf_B_20_20_30', code: 'B-20-20-30', name: 'Exterior Window Wall', xwalkId: '978,979,994', description: '', children: [] },
        { id: 'uf_B_20_20_50', code: 'B-20-20-50', name: 'Exterior Special Function Windows', xwalkId: '980,1018,2134', description: '', children: [] }
      ] },
      { id: 'uf_B_20_50', code: 'B-20-50', name: 'Exterior Doors and Grilles', xwalkId: '', description: '', children: [
        { id: 'uf_B_20_50_10', code: 'B-20-50-10', name: 'Exterior Entrance Doors', xwalkId: '862,871,872,873,874,875,876,877,880,881,888,889,890,891,981,982,987,1015,1020,1529', description: '', children: [] },
        { id: 'uf_B_20_50_30', code: 'B-20-50-30', name: 'Exterior Oversize Doors', xwalkId: '958,959,960,961', description: '', children: [] },
        { id: 'uf_B_20_50_40', code: 'B-20-50-40', name: 'Exterior Special Function Doors', xwalkId: '878,879,886,887,892,893,898,899,904,905,1854', description: '', children: [] },
        { id: 'uf_B_20_50_90', code: 'B-20-50-90', name: 'Exterior Door Supplementary Components', xwalkId: '882,883,884,885,894,895,896,897,900,901,902,903,984,985,986,988,989,990', description: '', children: [] }
      ] },
      { id: 'uf_B_20_70', code: 'B-20-70', name: 'Exterior Louvers and Vents', xwalkId: '', description: '', children: [
        { id: 'uf_B_20_70_10', code: 'B-20-70-10', name: 'Exterior Louvers', xwalkId: '1045,1046,1047,1048,1049,1050,1051', description: '', children: [] },
        { id: 'uf_B_20_70_50', code: 'B-20-70-50', name: 'Exterior Vents', xwalkId: '1057,1058', description: '', children: [] }
      ] },
      { id: 'uf_B_20_80', code: 'B-20-80', name: 'Exterior Wall Appurtenances', xwalkId: '', description: '', children: [
        { id: 'uf_B_20_80_30', code: 'B-20-80-30', name: 'Exterior Opening Protection Devices', xwalkId: '1014', description: '', children: [] },
        { id: 'uf_B_20_80_70', code: 'B-20-80-70', name: 'Exterior Fabrications', xwalkId: '752', description: '', children: [] },
        { id: 'uf_B_20_80_80', code: 'B-20-80-80', name: 'Bird Control Devices', xwalkId: '1385', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_B_30', code: 'B-30', name: 'EXTERIOR HORIZONTAL ENCLOSURES', xwalkId: '', description: '', children: [
      { id: 'uf_B_30_10', code: 'B-30-10', name: 'Roofing', xwalkId: '', description: '', children: [
        { id: 'uf_B_30_10_10', code: 'B-30-10-10', name: 'Steep Slope Roofing', xwalkId: '710,711,712,748,749', description: '', children: [] },
        { id: 'uf_B_30_10_50', code: 'B-30-10-50', name: 'Low-Slope Roofing', xwalkId: '713,714,715,716,717,718,719,720,721', description: '', children: [] },
        { id: 'uf_B_30_10_90', code: 'B-30-10-90', name: 'Roofing Supplementary Components', xwalkId: '615,616,617,619,722', description: '', children: [] }
      ] },
      { id: 'uf_B_30_20', code: 'B-30-20', name: 'Roof Appurtenances', xwalkId: '', description: '', children: [
        { id: 'uf_B_30_20_10', code: 'B-30-20-10', name: 'Roof Accessories', xwalkId: '723,724,725,726,727', description: '', children: [] },
        { id: 'uf_B_30_20_70', code: 'B-30-20-70', name: 'Rainwater Management', xwalkId: '539', description: '', children: [] }
      ] },
      { id: 'uf_B_30_40', code: 'B-30-40', name: 'Traffic Bearing Horizontal Enclosures', xwalkId: '842,849,850,851,852,853,854,855,856,857,858', description: '', children: [
        { id: 'uf_B_30_40_10', code: 'B-30-40-10', name: 'Traffic Bearing Coatings', xwalkId: '657,658', description: '', children: [] },
        { id: 'uf_B_30_40_30', code: 'B-30-40-30', name: 'Horizontal Waterproofing Membrane', xwalkId: '339,340,341,342,343', description: '', children: [] }
      ] },
      { id: 'uf_B_30_60', code: 'B-30-60', name: 'Horizontal Openings', xwalkId: '', description: '', children: [
        { id: 'uf_B_30_60_10', code: 'B-30-60-10', name: 'Roof Windows and Skylights', xwalkId: '1032,1034,1035,1036,1037,1038', description: '', children: [] }
      ] },
      { id: 'uf_B_30_80', code: 'B-30-80', name: 'Overhead Exterior Enclosures', xwalkId: '', description: '', children: [
        { id: 'uf_B_30_80_20', code: 'B-30-80-20', name: 'Exterior Soffits', xwalkId: '608,741,745,746,772,818,822,826', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'uf_C', code: 'C', name: 'INTERIORS', xwalkId: '', description: '', children: [
    { id: 'uf_C_10', code: 'C-10', name: 'INTERIOR CONSTRUCTION', xwalkId: '', description: '', children: [
      { id: 'uf_C_10_10', code: 'C-10-10', name: 'Interior Partitions', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_10_10', code: 'C-10-10-10', name: 'Interior Fixed Partitions', xwalkId: '205,208,612,614', description: '', children: [] },
        { id: 'uf_C_10_10_20', code: 'C-10-10-20', name: 'Interior Glazed Partitions', xwalkId: '995,996,998', description: '', children: [] },
        { id: 'uf_C_10_10_50', code: 'C-10-10-50', name: 'Interior Operable Partitions', xwalkId: '1016,1512,1513,1514,1515,1522,1523,1524,1525,1526,1527', description: '', children: [] },
        { id: 'uf_C_10_10_90', code: 'C-10-10-90', name: 'Interior Partition Supplementary Components', xwalkId: '430,431,432,433,434,622,623,624,625,666,667,668,698', description: '', children: [] }
      ] },
      { id: 'uf_C_10_20', code: 'C-10-20', name: 'Interior Windows', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_20_50', code: 'C-10-20-50', name: 'Interior Special Function Windows', xwalkId: '997,1003,1004,1019,2132,2133', description: '', children: [] }
      ] },
      { id: 'uf_C_10_30', code: 'C-10-30', name: 'Interior Doors', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_30_20', code: 'C-10-30-20', name: 'Interior Entrance Doors', xwalkId: '859,860,861,906,908,909,910,911,912,913,915,916,925,926,927,928,1022,1528', description: '', children: [] },
        { id: 'uf_C_10_30_25', code: 'C-10-30-25', name: 'Interior Sliding Doors', xwalkId: '999', description: '', children: [] },
        { id: 'uf_C_10_30_40', code: 'C-10-30-40', name: 'Interior Coiling Doors', xwalkId: '945,946,947,948,949,950,951,962,963', description: '', children: [] },
        { id: 'uf_C_10_30_50', code: 'C-10-30-50', name: 'Interior Panel Doors', xwalkId: '964,965', description: '', children: [] },
        { id: 'uf_C_10_30_70', code: 'C-10-30-70', name: 'Interior Special Function Doors', xwalkId: '914,917,918,924,929,934,939,2129,2130,2131', description: '', children: [] },
        { id: 'uf_C_10_30_80', code: 'C-10-30-80', name: 'Interior Access Doors and Panels', xwalkId: '1064,1065,1066', description: '', children: [] },
        { id: 'uf_C_10_30_90', code: 'C-10-30-90', name: 'Interior Door Supplementary Components', xwalkId: '907,919,920,921,922,923,930,931,932,933,935,936,937,938', description: '', children: [] }
      ] },
      { id: 'uf_C_10_40', code: 'C-10-40', name: 'Interior Grilles and Gates', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_40_10', code: 'C-10-40-10', name: 'Interior Grilles', xwalkId: '582,966,967', description: '', children: [] }
      ] },
      { id: 'uf_C_10_60', code: 'C-10-60', name: 'Raised Floor Construction', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_60_10', code: 'C-10-60-10', name: 'Access Flooring', xwalkId: '3617,3626,3627,3628,3629,3630,3631,3632,3633,3635,3636,3637,3638', description: '', children: [] },
        { id: 'uf_C_10_60_30', code: 'C-10-60-30', name: 'Platform/Stage Floors', xwalkId: '1236', description: '', children: [] }
      ] },
      { id: 'uf_C_10_70', code: 'C-10-70', name: 'Suspended Ceiling Construction', xwalkId: '', description: '', children: [
        { id: 'uf_C_10_70_10', code: 'C-10-70-10', name: 'Acoustical Suspended Ceilings', xwalkId: '1128,1129,1130,1131,1132,1133', description: '', children: [] },
        { id: 'uf_C_10_70_20', code: 'C-10-70-20', name: 'Suspended Plaster and Gypsum Board Ceilings', xwalkId: '833,836,839', description: '', children: [] },
        { id: 'uf_C_10_70_50', code: 'C-10-70-50', name: 'Specialty Suspended Ceilings', xwalkId: '1134,1135,1136,1137,1138,1139,1140,1141,1142,1143', description: '', children: [] },
        { id: 'uf_C_10_70_70', code: 'C-10-70-70', name: 'Special Function Suspended Ceilings', xwalkId: '1144,1145,2135,2136', description: '', children: [] }
      ] },
      { id: 'uf_C_10_90', code: 'C-10-90', name: 'Interior Specialties', xwalkId: '520,521,522,523,524', description: '', children: [
        { id: 'uf_C_10_90_10', code: 'C-10-90-10', name: 'Interior Railings and Handrails', xwalkId: '307,557,558,559,560,561,562,563,564,565,566,567,568,569,2230', description: '', children: [] },
        { id: 'uf_C_10_90_20', code: 'C-10-90-20', name: 'Information Specialties', xwalkId: '1390,1398,1399,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410', description: '', children: [] },
        { id: 'uf_C_10_90_25', code: 'C-10-90-25', name: 'Compartments and Cubicles', xwalkId: '1463,1464,1465,1490,1491,1492', description: '', children: [] },
        { id: 'uf_C_10_90_30', code: 'C-10-90-30', name: 'Service Walls', xwalkId: '1378', description: '', children: [] },
        { id: 'uf_C_10_90_35', code: 'C-10-90-35', name: 'Wall and Door Protection', xwalkId: '1535,1536,1537,1538,1539,1540,1541,1855,1856,1857,1858,2229', description: '', children: [] },
        { id: 'uf_C_10_90_40', code: 'C-10-90-40', name: 'Toilet, Bath, and Laundry Accessories', xwalkId: '1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,1479,1480', description: '', children: [] },
        { id: 'uf_C_10_90_50', code: 'C-10-90-50', name: 'Fireplaces and Stoves', xwalkId: '1660,1661,1662,1664,1665,1666,1667', description: '', children: [] },
        { id: 'uf_C_10_90_60', code: 'C-10-90-60', name: 'Safety Specialties', xwalkId: '1547,1548,1549,1550,1551,1552,1553,1554', description: '', children: [] },
        { id: 'uf_C_10_90_70', code: 'C-10-90-70', name: 'Storage Specialties', xwalkId: '1382,1383,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590', description: '', children: [] },
        { id: 'uf_C_10_90_90', code: 'C-10-90-90', name: 'Other Interior Specialties', xwalkId: '1007,1008,1009,1010,1011,1384,2210,2211,2212,2213,2214,2215', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_C_20', code: 'C-20', name: 'INTERIOR FINISHES', xwalkId: '1361,1362,1363', description: '', children: [
      { id: 'uf_C_20_10', code: 'C-20-10', name: 'Wall Finishes', xwalkId: '427,428,429,1276', description: '', children: [
        { id: 'uf_C_20_10_10', code: 'C-20-10-10', name: 'Tile Wall Finish', xwalkId: '1183,1184,1185,1187,1188,1189,1190,1191,1192', description: '', children: [] },
        { id: 'uf_C_20_10_20', code: 'C-20-10-20', name: 'Wall Paneling', xwalkId: '773,774,775,1161,1162,1163,1164,1165,1166,2138,2223,2224,2225', description: '', children: [] },
        { id: 'uf_C_20_10_30', code: 'C-20-10-30', name: 'Wall Coverings', xwalkId: '1364,1365,1366,1367,1368,1369,1370,1516,1517', description: '', children: [] },
        { id: 'uf_C_20_10_35', code: 'C-20-10-35', name: 'Wall Carpeting', xwalkId: '1518', description: '', children: [] },
        { id: 'uf_C_20_10_60', code: 'C-20-10-60', name: 'Special Wall Surfacing', xwalkId: '1519', description: '', children: [] },
        { id: 'uf_C_20_10_70', code: 'C-20-10-70', name: 'Wall Painting and Coating', xwalkId: '1315,1335,1336,1337,1338,1342,1348,1349,1350,1351,1352,1353', description: '', children: [] },
        { id: 'uf_C_20_10_80', code: 'C-20-10-80', name: 'Acoustical Wall Treatment', xwalkId: '1146,1147,1148,1149,1151', description: '', children: [] }
      ] },
      { id: 'uf_C_20_20', code: 'C-20-20', name: 'Interior Fabrications', xwalkId: '753,1096,1098,2226,2227,2231,2232,2233', description: '', children: [] },
      { id: 'uf_C_20_30', code: 'C-20-30', name: 'Flooring', xwalkId: '', description: '', children: [
        { id: 'uf_C_20_30_10', code: 'C-20-30-10', name: 'Flooring Treatment', xwalkId: '1228,1309,1310,1311', description: '', children: [] },
        { id: 'uf_C_20_30_20', code: 'C-20-30-20', name: 'Tile Flooring', xwalkId: '1176,1177,1178,1179,1180,1182,1186', description: '', children: [] },
        { id: 'uf_C_20_30_30', code: 'C-20-30-30', name: 'Specialty Flooring', xwalkId: '3614,3634', description: '', children: [] },
        { id: 'uf_C_20_30_45', code: 'C-20-30-45', name: 'Wood Flooring', xwalkId: '1235,1238,1241,1242,2228', description: '', children: [] },
        { id: 'uf_C_20_30_50', code: 'C-20-30-50', name: 'Resilient Flooring', xwalkId: '1212,1213,1214,1215,1216,1217,1218,1223,1224,1225', description: '', children: [] },
        { id: 'uf_C_20_30_60', code: 'C-20-30-60', name: 'Terrazzo Flooring', xwalkId: '1272,1273,1274,1275,1277,1280,1281', description: '', children: [] },
        { id: 'uf_C_20_30_70', code: 'C-20-30-70', name: 'Fluid-Applied Flooring', xwalkId: '1292,1293,1294,1295,1296,1297,1298', description: '', children: [] },
        { id: 'uf_C_20_30_75', code: 'C-20-30-75', name: 'Carpeting', xwalkId: '1220,1221', description: '', children: [] },
        { id: 'uf_C_20_30_80', code: 'C-20-30-80', name: 'Athletic Flooring', xwalkId: '1253,1254,1255,1256,1257,1258,1259,1260,1261', description: '', children: [] },
        { id: 'uf_C_20_30_85', code: 'C-20-30-85', name: 'Entrance Flooring', xwalkId: '1222,2286,2287,2288,2289,2290,2291,2295,2296', description: '', children: [] },
        { id: 'uf_C_20_30_90', code: 'C-20-30-90', name: 'Flooring Supplementary Components', xwalkId: '334,335,336,344,1194,1195,1196,1197,1198,1199,1200,1201,1226,1227,1243,1244,1262,1263,1264,1282,1283,1284', description: '', children: [] }
      ] },
      { id: 'uf_C_20_40', code: 'C-20-40', name: 'Stair Finishes', xwalkId: '306', description: '', children: [
        { id: 'uf_C_20_40_20', code: 'C-20-40-20', name: 'Tile Stair Finish', xwalkId: '1181', description: '', children: [] },
        { id: 'uf_C_20_40_45', code: 'C-20-40-45', name: 'Wood Stair Finish', xwalkId: '1237', description: '', children: [] },
        { id: 'uf_C_20_40_50', code: 'C-20-40-50', name: 'Resilient Stair Finish', xwalkId: '1219', description: '', children: [] },
        { id: 'uf_C_20_40_60', code: 'C-20-40-60', name: 'Terrazzo Stair Finish', xwalkId: '1278', description: '', children: [] }
      ] },
      { id: 'uf_C_20_50', code: 'C-20-50', name: 'Ceiling Finishes', xwalkId: '', description: '', children: [
        { id: 'uf_C_20_50_10', code: 'C-20-50-10', name: 'Plaster and Gypsum Board Finish', xwalkId: '1092,1093,1113,1114,1115', description: '', children: [] },
        { id: 'uf_C_20_50_20', code: 'C-20-50-20', name: 'Ceiling Paneling', xwalkId: '613,776', description: '', children: [] },
        { id: 'uf_C_20_50_70', code: 'C-20-50-70', name: 'Ceiling Painting and Coating', xwalkId: '1339,1340,1341', description: '', children: [] },
        { id: 'uf_C_20_50_80', code: 'C-20-50-80', name: 'Acoustical Ceiling Treatment', xwalkId: '1150', description: '', children: [] },
        { id: 'uf_C_20_50_90', code: 'C-20-50-90', name: 'Ceiling Finish Supplementary Components', xwalkId: '1152,1153,1154', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'uf_D', code: 'D', name: 'SERVICES', xwalkId: '', description: '', children: [
    { id: 'uf_D_10', code: 'D-10', name: 'CONVEYING', xwalkId: '', description: '', children: [
      { id: 'uf_D_10_10', code: 'D-10-10', name: 'Vertical Conveying Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_10_10_10', code: 'D-10-10-10', name: 'Elevators', xwalkId: '2508,2509,2510,2511,2512,2513,2514,2515,2516,2517,2518,2523', description: '', children: [] },
        { id: 'uf_D_10_10_20', code: 'D-10-10-20', name: 'Lifts', xwalkId: '2533,2534,2535,2536,2537,2538,2539,2540', description: '', children: [] },
        { id: 'uf_D_10_10_30', code: 'D-10-10-30', name: 'Escalators', xwalkId: '2521', description: '', children: [] },
        { id: 'uf_D_10_10_50', code: 'D-10-10-50', name: 'Dumbwaiters', xwalkId: '2519,2520', description: '', children: [] },
        { id: 'uf_D_10_10_60', code: 'D-10-10-60', name: 'Moving Ramps', xwalkId: '2522', description: '', children: [] }
      ] },
      { id: 'uf_D_10_50', code: 'D-10-50', name: 'Material Handling', xwalkId: '', description: '', children: [
        { id: 'uf_D_10_50_20', code: 'D-10-50-20', name: 'Hoists', xwalkId: '1391', description: '', children: [] },
        { id: 'uf_D_10_50_60', code: 'D-10-50-60', name: 'Chutes', xwalkId: '2549,2550,2551,2552,2553,2554,2555,2556,2557,2558,2559,2560,2561,2562,2563,2564,2565,2566,2567', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_20', code: 'D-20', name: 'PLUMBING', xwalkId: '2592', description: '', children: [
      { id: 'uf_D_20_10', code: 'D-20-10', name: 'Domestic Water Distribution', xwalkId: '', description: '', children: [
        { id: 'uf_D_20_10_20', code: 'D-20-10-20', name: 'Domestic Water Equipment', xwalkId: '2603', description: '', children: [] },
        { id: 'uf_D_20_10_40', code: 'D-20-10-40', name: 'Domestic Water Piping', xwalkId: '2489,2601,2602', description: '', children: [] },
        { id: 'uf_D_20_10_60', code: 'D-20-10-60', name: 'Plumbing Fixtures', xwalkId: '1843,1845,1846,2604,2607', description: '', children: [] }
      ] },
      { id: 'uf_D_20_20', code: 'D-20-20', name: 'Sanitary Drainage', xwalkId: '', description: '', children: [
        { id: 'uf_D_20_20_10', code: 'D-20-20-10', name: 'Sanitary Sewerage Equipment', xwalkId: '2608', description: '', children: [] },
        { id: 'uf_D_20_20_30', code: 'D-20-20-30', name: 'Sanitary Sewerage Piping', xwalkId: '2605,2606', description: '', children: [] },
        { id: 'uf_D_20_20_90', code: 'D-20-20-90', name: 'Sanitary Drainage Supplementary Components', xwalkId: '2609,2610', description: '', children: [] }
      ] },
      { id: 'uf_D_20_30', code: 'D-20-30', name: 'Building Support Plumbing Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_20_30_10', code: 'D-20-30-10', name: 'Stormwater Drainage Equipment', xwalkId: '2613,2614', description: '', children: [] },
        { id: 'uf_D_20_30_20', code: 'D-20-30-20', name: 'Stormwater Drainage Piping', xwalkId: '2611,2612', description: '', children: [] },
        { id: 'uf_D_20_30_30', code: 'D-20-30-30', name: 'Facility Stormwater Drains', xwalkId: '540,541,542', description: '', children: [] }
      ] },
      { id: 'uf_D_20_60', code: 'D-20-60', name: 'Process Support Plumbing Systems', xwalkId: '2632', description: '', children: [
        { id: 'uf_D_20_60_10', code: 'D-20-60-10', name: 'Compressed-Air Systems', xwalkId: '2621,2622', description: '', children: [] },
        { id: 'uf_D_20_60_30', code: 'D-20-60-30', name: 'Gas Systems', xwalkId: '2623,2624,2625,2626,2627,2628', description: '', children: [] },
        { id: 'uf_D_20_60_40', code: 'D-20-60-40', name: 'Chemical-Waste Systems', xwalkId: '2617,2618,2619,2620', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_30', code: 'D-30', name: 'HEATING, VENTILATION, AND AIR CONDITIONING (HVAC)', xwalkId: '2633', description: '', children: [
      { id: 'uf_D_30_20', code: 'D-30-20', name: 'Heating Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_30_20_10', code: 'D-30-20-10', name: 'Heat Generation', xwalkId: '2646,2664,2665,2666,2682', description: '', children: [] },
        { id: 'uf_D_30_20_70', code: 'D-30-20-70', name: 'Decentralized Heating Equipment', xwalkId: '2675', description: '', children: [] }
      ] },
      { id: 'uf_D_30_30', code: 'D-30-30', name: 'Cooling Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_30_30_10', code: 'D-30-30-10', name: 'Central Cooling', xwalkId: '2660,2661,2662,2663', description: '', children: [] },
        { id: 'uf_D_30_30_70', code: 'D-30-30-70', name: 'Decentralized Cooling', xwalkId: '2672,2673,2674', description: '', children: [] }
      ] },
      { id: 'uf_D_30_50', code: 'D-30-50', name: 'Facility HVAC Distribution Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_30_50_10', code: 'D-30-50-10', name: 'Facility Hydronic Distribution', xwalkId: '2644,2645,2647,2648,2649,2650,2651,2652', description: '', children: [] },
        { id: 'uf_D_30_50_50', code: 'D-30-50-50', name: 'HVAC Air Distribution', xwalkId: '1849,2367,2488,2653,2654,2655,2656,2657,2658,2659,2668,2669,2670,2671,2676,2677,2692,2693', description: '', children: [] },
        { id: 'uf_D_30_50_90', code: 'D-30-50-90', name: 'Facility Distribution Systems Supplementary Components', xwalkId: '2688,2689,2690,2691,2695,2696', description: '', children: [] }
      ] },
      { id: 'uf_D_30_60', code: 'D-30-60', name: 'Ventilation', xwalkId: '', description: '', children: [
        { id: 'uf_D_30_60_10', code: 'D-30-60-10', name: 'Supply Air', xwalkId: '2685', description: '', children: [] },
        { id: 'uf_D_30_60_30', code: 'D-30-60-30', name: 'Exhaust Air', xwalkId: '1847,1848,1850,2678,2679,2680,2681,2683,2684', description: '', children: [] },
        { id: 'uf_D_30_60_60', code: 'D-30-60-60', name: 'Air-to-Air Energy Recovery', xwalkId: '2667', description: '', children: [] },
        { id: 'uf_D_30_60_70', code: 'D-30-60-70', name: 'HVAC Air Cleaning', xwalkId: '2686,2687', description: '', children: [] },
        { id: 'uf_D_30_60_90', code: 'D-30-60-90', name: 'Ventilation Supplementary Components', xwalkId: '2694', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_40', code: 'D-40', name: 'FIRE PROTECTION', xwalkId: '2568', description: '', children: [
      { id: 'uf_D_40_10', code: 'D-40-10', name: 'Fire Suppression', xwalkId: '1842', description: '', children: [
        { id: 'uf_D_40_10_10', code: 'D-40-10-10', name: 'Water-Based Fire-Suppression', xwalkId: '2578,2579,2580,2581,2582,2583,2584,2585,2587,2588,2589', description: '', children: [] },
        { id: 'uf_D_40_10_50', code: 'D-40-10-50', name: 'Fire-Extinguishing', xwalkId: '2586', description: '', children: [] },
        { id: 'uf_D_40_10_90', code: 'D-40-10-90', name: 'Fire Suppression Supplementary Components', xwalkId: '2590,2591', description: '', children: [] }
      ] },
      { id: 'uf_D_40_30', code: 'D-40-30', name: 'Fire Protection Specialties', xwalkId: '', description: '', children: [
        { id: 'uf_D_40_30_10', code: 'D-40-30-10', name: 'Fire Protection Cabinets', xwalkId: '1555,1557', description: '', children: [] },
        { id: 'uf_D_40_30_30', code: 'D-40-30-30', name: 'Fire Extinguishers', xwalkId: '1556,1558,1559', description: '', children: [] },
        { id: 'uf_D_40_30_70', code: 'D-40-30-70', name: 'Fire Extinguisher Accessories', xwalkId: '1560', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_50', code: 'D-50', name: 'ELECTRICAL', xwalkId: '1852,2725', description: '', children: [
      { id: 'uf_D_50_10', code: 'D-50-10', name: 'Facility Power Generation', xwalkId: '', description: '', children: [
        { id: 'uf_D_50_10_10', code: 'D-50-10-10', name: 'Packaged Generator Assemblies', xwalkId: '2735', description: '', children: [] }
      ] },
      { id: 'uf_D_50_20', code: 'D-50-20', name: 'Electrical Service and Distribution', xwalkId: '', description: '', children: [
        { id: 'uf_D_50_20_10', code: 'D-50-20-10', name: 'Electrical Service', xwalkId: '2368,2490,2736,2740', description: '', children: [] },
        { id: 'uf_D_50_20_30', code: 'D-50-20-30', name: 'Power Distribution', xwalkId: '1389,2741', description: '', children: [] }
      ] },
      { id: 'uf_D_50_30', code: 'D-50-30', name: 'General Purpose Electrical Power', xwalkId: '2737', description: '', children: [
        { id: 'uf_D_50_30_10', code: 'D-50-30-10', name: 'Branch Wiring System', xwalkId: '2742', description: '', children: [] }
      ] },
      { id: 'uf_D_50_40', code: 'D-50-40', name: 'Lighting', xwalkId: '', description: '', children: [
        { id: 'uf_D_50_40_10', code: 'D-50-40-10', name: 'Lighting Control', xwalkId: '2739', description: '', children: [] },
        { id: 'uf_D_50_40_50', code: 'D-50-40-50', name: 'Lighting Fixtures', xwalkId: '2153,2369,2491,2738', description: '', children: [] },
        { id: 'uf_D_50_40_90', code: 'D-50-40-90', name: 'Lighting Supplementary Components', xwalkId: '2743', description: '', children: [] }
      ] },
      { id: 'uf_D_50_80', code: 'D-50-80', name: 'Miscellaneous Electrical Systems', xwalkId: '', description: '', children: [
        { id: 'uf_D_50_80_10', code: 'D-50-80-10', name: 'Lightning Protection', xwalkId: '2734', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_60', code: 'D-60', name: 'COMMUNICATIONS', xwalkId: '', description: '', children: [
      { id: 'uf_D_60_10', code: 'D-60-10', name: 'Data Communications', xwalkId: '2744,2752,2763,2764,2765,2766,2767,2768,2769,2771,2772,2773', description: '', children: [
        { id: 'uf_D_60_10_10', code: 'D-60-10-10', name: 'Data Communications Network Equipment', xwalkId: '2770', description: '', children: [] },
        { id: 'uf_D_60_10_30', code: 'D-60-10-30', name: 'Data Communications Peripheral Data Equipment', xwalkId: '2370', description: '', children: [] }
      ] },
      { id: 'uf_D_60_20', code: 'D-60-20', name: 'Voice Communications', xwalkId: '', description: '', children: [
        { id: 'uf_D_60_20_20', code: 'D-60-20-20', name: 'Voice Communications Terminal Equipment', xwalkId: '2836,2837,2838,2852', description: '', children: [] }
      ] },
      { id: 'uf_D_60_30', code: 'D-60-30', name: 'Audio-Video Communication', xwalkId: '', description: '', children: [
        { id: 'uf_D_60_30_10', code: 'D-60-30-10', name: 'Audio-Video Systems', xwalkId: '2795,2796,2805,2806,2807,2808,2809,2810,2811,2812,2813,2814,2815,2816,2817,2818,2819,2820,2821,2822,2823,2824,2825,2826,2827,2828', description: '', children: [] }
      ] },
      { id: 'uf_D_60_60', code: 'D-60-60', name: 'Distributed Communications and Monitoring', xwalkId: '2776', description: '', children: [
        { id: 'uf_D_60_60_10', code: 'D-60-60-10', name: 'Distributed Audio-Video Communications Systems', xwalkId: '2158,2159,2785,2786,2787,2788,2789,2790,2792,2793,2794,2846,2847,2849,2851', description: '', children: [] },
        { id: 'uf_D_60_60_30', code: 'D-60-60-30', name: 'Healthcare Communications and Monitoring', xwalkId: '2850', description: '', children: [] },
        { id: 'uf_D_60_60_50', code: 'D-60-60-50', name: 'Distributed Systems', xwalkId: '2791,2848', description: '', children: [] }
      ] },
      { id: 'uf_D_60_90', code: 'D-60-90', name: 'Communications Supplementary Components', xwalkId: '', description: '', children: [
        { id: 'uf_D_60_90_10', code: 'D-60-90-10', name: 'Supplementary Components', xwalkId: '2774,2775', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_70', code: 'D-70', name: 'ELECTRONIC SAFETY AND SECURITY', xwalkId: '2942,2948,2949,2950,2951,2952,2953,2954,2955', description: '', children: [
      { id: 'uf_D_70_10', code: 'D-70-10', name: 'Access Control and Intrusion Detection', xwalkId: '', description: '', children: [
        { id: 'uf_D_70_10_10', code: 'D-70-10-10', name: 'Access Control', xwalkId: '2154,2853,2863,2864,2865,2866,2867,2868,2869,2870,2871,2872,2873,2874,2875,2876,2877,2878,2893,2928', description: '', children: [] },
        { id: 'uf_D_70_10_50', code: 'D-70-10-50', name: 'Intrusion Detection', xwalkId: '2879,2889,2890,2891,2892,2894,2895,2896', description: '', children: [] }
      ] },
      { id: 'uf_D_70_30', code: 'D-70-30', name: 'Electronic Surveillance', xwalkId: '', description: '', children: [
        { id: 'uf_D_70_30_10', code: 'D-70-30-10', name: 'Video Surveillance', xwalkId: '2155,2157,2897,2906,2907,2908,2909,2910,2911,2912,2913', description: '', children: [] }
      ] },
      { id: 'uf_D_70_50', code: 'D-70-50', name: 'Detection and Alarm', xwalkId: '2156', description: '', children: [
        { id: 'uf_D_70_50_10', code: 'D-70-50-10', name: 'Fire Detection and Alarm', xwalkId: '2914,2924,2925,2926,2927,2929,2930,2931,2932,2933,2934,2935,2936,2937,2938,2939,2940,2941', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_D_80', code: 'D-80', name: 'INTEGRATED AUTOMATION', xwalkId: '2697', description: '', children: [
      { id: 'uf_D_80_10', code: 'D-80-10', name: 'Integrated Automation Facility Controls', xwalkId: '2722,2723,2724', description: '', children: [
        { id: 'uf_D_80_10_10', code: 'D-80-10-10', name: 'Integrated Automation Control of Equipment', xwalkId: '2720,2721', description: '', children: [] },
        { id: 'uf_D_80_10_30', code: 'D-80-10-30', name: 'Integrated Automation Control of Fire-Suppression Systems', xwalkId: '2718', description: '', children: [] },
        { id: 'uf_D_80_10_40', code: 'D-80-10-40', name: 'Integrated Automation Control of Plumbing Systems', xwalkId: '2719', description: '', children: [] },
        { id: 'uf_D_80_10_50', code: 'D-80-10-50', name: 'Integrated Automation Control of HVAC Systems', xwalkId: '2707,2708,2709,2710,2711,2712,2713,2714,2715', description: '', children: [] },
        { id: 'uf_D_80_10_60', code: 'D-80-10-60', name: 'Integrated Automation Control of Electrical Systems', xwalkId: '2716,2717', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'uf_E', code: 'E', name: 'EQUIPMENT AND FURNISHINGS', xwalkId: '', description: '', children: [
    { id: 'uf_E_10', code: 'E-10', name: 'EQUIPMENT', xwalkId: '', description: '', children: [
      { id: 'uf_E_10_10', code: 'E-10-10', name: 'Vehicle and Pedestrian Equipment', xwalkId: '', description: '', children: [
        { id: 'uf_E_10_10_10', code: 'E-10-10-10', name: 'Vehicle Servicing Equipment', xwalkId: '1998,1999,2000,2001,2002,2003,2004,2748', description: '', children: [] },
        { id: 'uf_E_10_10_30', code: 'E-10-10-30', name: 'Interior Parking Control Equipment', xwalkId: '2038,2039,2040,2041', description: '', children: [] },
        { id: 'uf_E_10_10_50', code: 'E-10-10-50', name: 'Loading Dock Equipment', xwalkId: '2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062', description: '', children: [] },
        { id: 'uf_E_10_10_70', code: 'E-10-10-70', name: 'Interior Pedestrian Control Equipment', xwalkId: '2069,2070,2071,2072,2073,2074', description: '', children: [] }
      ] },
      { id: 'uf_E_10_30', code: 'E-10-30', name: 'Commercial Equipment', xwalkId: '', description: '', children: [
        { id: 'uf_E_10_30_35', code: 'E-10-30-35', name: 'Commercial Laundry and Dry Cleaning Equipment', xwalkId: '1700,1701,1702,1703', description: '', children: [] },
        { id: 'uf_E_10_30_60', code: 'E-10-30-60', name: 'Photographic Processing Equipment', xwalkId: '2005,2006', description: '', children: [] },
        { id: 'uf_E_10_30_70', code: 'E-10-30-70', name: 'Postal, Packaging, and Shipping Equipment', xwalkId: '2018,2019,2020,2021,2022', description: '', children: [] },
        { id: 'uf_E_10_30_80', code: 'E-10-30-80', name: 'Foodservice Equipment', xwalkId: '1704,1705,1706,1707,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727', description: '', children: [] }
      ] },
      { id: 'uf_E_10_40', code: 'E-10-40', name: 'Institutional Equipment', xwalkId: '1940,1941,1942,1943,1944,1945', description: '', children: [
        { id: 'uf_E_10_40_10', code: 'E-10-40-10', name: 'Educational and Scientific Equipment', xwalkId: '1868,1869,1870,1871,1872,1873,1874,1875,1973,1974,1975,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992', description: '', children: [] },
        { id: 'uf_E_10_40_20', code: 'E-10-40-20', name: 'Healthcare Equipment', xwalkId: '1699,2101,2102,2103,2104,2105', description: '', children: [] },
        { id: 'uf_E_10_40_70', code: 'E-10-40-70', name: 'Detention Equipment', xwalkId: '2120,2137,2140,2141,2142,2143', description: '', children: [] }
      ] },
      { id: 'uf_E_10_60', code: 'E-10-60', name: 'Residential Equipment', xwalkId: '', description: '', children: [
        { id: 'uf_E_10_60_10', code: 'E-10-60-10', name: 'Residential Appliances', xwalkId: '1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698', description: '', children: [] }
      ] },
      { id: 'uf_E_10_70', code: 'E-10-70', name: 'Entertainment and Recreational Equipment', xwalkId: '', description: '', children: [
        { id: 'uf_E_10_70_10', code: 'E-10-70-10', name: 'Theater and Stage Equipment', xwalkId: '1876,1877,1886,1887,1888,1889,1890,1891,1892,1893,2280', description: '', children: [] },
        { id: 'uf_E_10_70_20', code: 'E-10-70-20', name: 'Musical Equipment', xwalkId: '2015,2016,2017', description: '', children: [] },
        { id: 'uf_E_10_70_50', code: 'E-10-70-50', name: 'Athletic Equipment', xwalkId: '1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931', description: '', children: [] },
        { id: 'uf_E_10_70_60', code: 'E-10-70-60', name: 'Recreational Equipment', xwalkId: '2085,2086,2087,2088,2089,2090,2091,2092,2093', description: '', children: [] }
      ] },
      { id: 'uf_E_10_90', code: 'E-10-90', name: 'Other Equipment', xwalkId: '', description: '', children: [
        { id: 'uf_E_10_90_10', code: 'E-10-90-10', name: 'Solid Waste Handling Equipment', xwalkId: '2113,2114,2115,2116,2117,2118,2119', description: '', children: [] },
        { id: 'uf_E_10_90_30', code: 'E-10-90-30', name: 'Agricultural Equipment', xwalkId: '2007', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_E_20', code: 'E-20', name: 'FURNISHINGS', xwalkId: '', description: '', children: [
      { id: 'uf_E_20_10', code: 'E-20-10', name: 'Fixed Furnishings', xwalkId: '2273,2274,2275,2276,2277,2278,2279', description: '', children: [
        { id: 'uf_E_20_10_10', code: 'E-20-10-10', name: 'Fixed Art', xwalkId: '2160,2161,2168,2169,2170,2171,2172,2173', description: '', children: [] },
        { id: 'uf_E_20_10_20', code: 'E-20-10-20', name: 'Window Treatments', xwalkId: '2180,2181,2182,2183,2184,2185,2186,2187,2188,2189,2190,2191,2192', description: '', children: [] },
        { id: 'uf_E_20_10_30', code: 'E-20-10-30', name: 'Casework', xwalkId: '1932,1946,2201,2202,2203,2204,2205,2208,2209,2216,2217,2218,2244,2245,2246,2247,2248,2249,2250,2251,2252,2262,3616', description: '', children: [] },
        { id: 'uf_E_20_10_70', code: 'E-20-10-70', name: 'Fixed Multiple Seating', xwalkId: '305,2303,2304,2305,2306,2307,2308,2309,2310,2311,2312,2313', description: '', children: [] }
      ] },
      { id: 'uf_E_20_50', code: 'E-20-50', name: 'Movable Furnishings', xwalkId: '', description: '', children: [
        { id: 'uf_E_20_50_30', code: 'E-20-50-30', name: 'Furniture', xwalkId: '1379,1380,1381,1993,1994,1995,1997,2144,2145,2146,2147,2148,2149,2150,2260', description: '', children: [] },
        { id: 'uf_E_20_50_40', code: 'E-20-50-40', name: 'Accessories', xwalkId: '2292,2293,2294', description: '', children: [] },
        { id: 'uf_E_20_50_60', code: 'E-20-50-60', name: 'Movable Multiple Seating', xwalkId: '2314', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'uf_F', code: 'F', name: 'SPECIAL CONSTRUCTION AND DEMOLITION', xwalkId: '', description: '', children: [
    { id: 'uf_F_10', code: 'F-10', name: 'SPECIAL CONSTRUCTION', xwalkId: '', description: '', children: [
      { id: 'uf_F_10_10', code: 'F-10-10', name: 'Integrated Construction', xwalkId: '', description: '', children: [
        { id: 'uf_F_10_10_10', code: 'F-10-10-10', name: 'Building Modules', xwalkId: '2151,2152', description: '', children: [] },
        { id: 'uf_F_10_10_50', code: 'F-10-10-50', name: 'Manufactured/Fabricated Rooms', xwalkId: '1386,1387,1388,2363,2364,2365,2366', description: '', children: [] }
      ] },
      { id: 'uf_F_10_20', code: 'F-10-20', name: 'Special Structures', xwalkId: '', description: '', children: [
        { id: 'uf_F_10_20_10', code: 'F-10-20-10', name: 'Fabric Structures', xwalkId: '1626,1627,1628,2456,2457', description: '', children: [] },
        { id: 'uf_F_10_20_40', code: 'F-10-20-40', name: 'Manufacturer-Engineered Structures', xwalkId: '2381,2382,2383,2384,2385,2386,2387,2388,2389,2390,2391,2392,2393,2394,2395,2396,2397,2398,2411,2424,2425,2426', description: '', children: [] },
        { id: 'uf_F_10_20_60', code: 'F-10-20-60', name: 'Manufactured Canopies', xwalkId: '1610,1612,1613,1614,1615,1618,1620,1621,1622,1623', description: '', children: [] },
        { id: 'uf_F_10_20_70', code: 'F-10-20-70', name: 'Towers', xwalkId: '2405,2406,2407,2408,2409,2410', description: '', children: [] }
      ] },
      { id: 'uf_F_10_50', code: 'F-10-50', name: 'Special Facility Components', xwalkId: '', description: '', children: [
        { id: 'uf_F_10_50_10', code: 'F-10-50-10', name: 'Pools', xwalkId: '2327,2328,2329,2330,2331,2332,2333,2334,2335,2336,2337,2338,2339,2340,2341,2342,2343,2344,2345,2346,2347,2348,2349,2350,2351,2352,2353,2354,2355', description: '', children: [] },
        { id: 'uf_F_10_50_20', code: 'F-10-50-20', name: 'Interior Fountains', xwalkId: '2467,2468', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_F_20', code: 'F-20', name: 'FACILITY REMEDIATION', xwalkId: '', description: '', children: [
      { id: 'uf_F_20_10', code: 'F-20-10', name: 'Hazardous Materials Remediation', xwalkId: '93,94,95,96,97,98', description: '', children: [
        { id: 'uf_F_20_10_10', code: 'F-20-10-10', name: 'Transportation and Disposal of Hazardous Materials', xwalkId: '99', description: '', children: [] },
        { id: 'uf_F_20_10_20', code: 'F-20-10-20', name: 'Asbestos Remediation', xwalkId: '81,82,83,84,85,86,87,88,89', description: '', children: [] },
        { id: 'uf_F_20_10_30', code: 'F-20-10-30', name: 'Lead Remediation', xwalkId: '90', description: '', children: [] },
        { id: 'uf_F_20_10_40', code: 'F-20-10-40', name: 'Polychlorinate Biphenyl Remediation', xwalkId: '92', description: '', children: [] },
        { id: 'uf_F_20_10_50', code: 'F-20-10-50', name: 'Mold Remediation', xwalkId: '91', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_F_30', code: 'F-30', name: 'DEMOLITION', xwalkId: '141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156', description: '', children: [
      { id: 'uf_F_30_10', code: 'F-30-10', name: 'Structure Demolition', xwalkId: '128,129,130,131,132,133,134', description: '', children: [] },
      { id: 'uf_F_30_30', code: 'F-30-30', name: 'Selective Demolition', xwalkId: '135,136,137,138,139,140', description: '', children: [
        { id: 'uf_F_30_30_10', code: 'F-30-30-10', name: 'Selective Building Demolition', xwalkId: '109,110,111,112,120', description: '', children: [] },
        { id: 'uf_F_30_30_30', code: 'F-30-30-30', name: 'Selective Interior Demolition', xwalkId: '113,114,115,116,117,118,119,121,122,123,124,125,126,127', description: '', children: [] }
      ] }
    ] }
  ] },
  { id: 'uf_G', code: 'G', name: 'SITEWORK', xwalkId: '', description: '', children: [
    { id: 'uf_G_10', code: 'G-10', name: 'SITE PREPARATION', xwalkId: '', description: '', children: [
      { id: 'uf_G_10_10', code: 'G-10-10', name: 'Site Clearing', xwalkId: '', description: '', children: [
        { id: 'uf_G_10_10_10', code: 'G-10-10-10', name: 'Clearing and Grubbing', xwalkId: '2983,3029', description: '', children: [] },
        { id: 'uf_G_10_10_30', code: 'G-10-10-30', name: 'Tree and Shrub Removal and Trimming', xwalkId: '2971', description: '', children: [] },
        { id: 'uf_G_10_10_50', code: 'G-10-10-50', name: 'Earth Stripping and Stockpiling', xwalkId: '2984,3030', description: '', children: [] }
      ] },
      { id: 'uf_G_10_20', code: 'G-10-20', name: 'Site Elements Demolition', xwalkId: '3173,3174,3175,3176,3177,3266,3267,3268,3443,3444', description: '', children: [
        { id: 'uf_G_10_20_10', code: 'G-10-20-10', name: 'Utility Demolition', xwalkId: '3498,3499,3500,3501,3502,3503,3554,3555,3556,3557,3558', description: '', children: [] },
        { id: 'uf_G_10_20_50', code: 'G-10-20-50', name: 'Selective Site Demolition', xwalkId: '2970,2972,2973,2974,2975,2976,2977,2978,2979,2980,2981,2982,3028', description: '', children: [] }
      ] },
      { id: 'uf_G_10_70', code: 'G-10-70', name: 'Site Earthwork', xwalkId: '', description: '', children: [
        { id: 'uf_G_10_70_10', code: 'G-10-70-10', name: 'Grading', xwalkId: '3022,3023,3026,3027,3035,3037', description: '', children: [] },
        { id: 'uf_G_10_70_20', code: 'G-10-70-20', name: 'Excavation and Fill', xwalkId: '2956,2957,2986,2987,2988,2989,2990,2992,2993,2994,3014,3019,3024,3025,3031,3034,3036,3038,3039,3040', description: '', children: [] },
        { id: 'uf_G_10_70_30', code: 'G-10-70-30', name: 'Embankments', xwalkId: '3032', description: '', children: [] },
        { id: 'uf_G_10_70_35', code: 'G-10-70-35', name: 'Erosion and Sedimentation Controls', xwalkId: '3045,3046,3047,3048,3049,3050,3051,3052,3053,3054,3056,3061,3062', description: '', children: [] },
        { id: 'uf_G_10_70_40', code: 'G-10-70-40', name: 'Soil Stabilization', xwalkId: '2995,2996,2997,2998,2999,3000,3001,3002,3004,3005,3006,3007,3008,3009,3010,3011,3033', description: '', children: [] },
        { id: 'uf_G_10_70_50', code: 'G-10-70-50', name: 'Soil Reinforcement', xwalkId: '3003,3012', description: '', children: [] },
        { id: 'uf_G_10_70_65', code: 'G-10-70-65', name: 'Riprap', xwalkId: '3418', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_G_20', code: 'G-20', name: 'SITE IMPROVEMENTS', xwalkId: '670,671,672', description: '', children: [
      { id: 'uf_G_20_10', code: 'G-20-10', name: 'Roadways', xwalkId: '', description: '', children: [
        { id: 'uf_G_20_10_10', code: 'G-20-10-10', name: 'Roadway Pavement', xwalkId: '213,214,215,216,217,218,219,220,221,222,223,224,248,3096,3097,3098,3099,3100,3101,3102', description: '', children: [] },
        { id: 'uf_G_20_10_20', code: 'G-20-10-20', name: 'Roadway Curbs and Gutters', xwalkId: '225,226,249,250', description: '', children: [] },
        { id: 'uf_G_20_10_40', code: 'G-20-10-40', name: 'Roadway Appurtenances', xwalkId: '227,3145,3149,3150,3151,3152,3153', description: '', children: [] }
      ] },
      { id: 'uf_G_20_20', code: 'G-20-20', name: 'Parking Lots', xwalkId: '', description: '', children: [
        { id: 'uf_G_20_20_10', code: 'G-20-20-10', name: 'Parking Lot Pavement', xwalkId: '3016,3018,3078,3079,3080,3081,3082,3083,3084,3085,3086,3087,3088,3089,3090,3091,3092,3093,3094,3095,3119,3120', description: '', children: [] },
        { id: 'uf_G_20_20_40', code: 'G-20-20-40', name: 'Parking Lot Appurtenances', xwalkId: '3131,3133,3134,3135,3138,3139,3140,3143,3144,3146,3147,3148', description: '', children: [] },
        { id: 'uf_G_20_20_70', code: 'G-20-20-70', name: 'Parking Lot Lighting', xwalkId: '240,253', description: '', children: [] },
        { id: 'uf_G_20_20_80', code: 'G-20-20-80', name: 'Exterior Parking Control Equipment', xwalkId: '2029,2030,2031,2032,2033,2034,2035,2036,2037', description: '', children: [] }
      ] },
      { id: 'uf_G_20_30', code: 'G-20-30', name: 'Pedestrian Plazas and Walkways', xwalkId: '1279', description: '', children: [
        { id: 'uf_G_20_30_10', code: 'G-20-30-10', name: 'Pedestrian Pavement', xwalkId: '228,230,231,246,251,3017,3109,3110,3111,3112,3113,3114,3115,3116,3117', description: '', children: [] },
        { id: 'uf_G_20_30_30', code: 'G-20-30-30', name: 'Exterior Steps and Ramps', xwalkId: '233,239', description: '', children: [] },
        { id: 'uf_G_20_30_40', code: 'G-20-30-40', name: 'Pedestrian Pavement Appurtenances', xwalkId: '229,252,3132,3136,3141', description: '', children: [] },
        { id: 'uf_G_20_30_80', code: 'G-20-30-80', name: 'Exterior Pedestrian Control Equipment', xwalkId: '2075,2076,2077,2078', description: '', children: [] }
      ] },
      { id: 'uf_G_20_60', code: 'G-20-60', name: 'Site Development', xwalkId: '435,436,437,438,439,440,441,442,443,444,445,446,525,526,527,528,529,570,571,572,573,574,575,576', description: '', children: [
        { id: 'uf_G_20_60_10', code: 'G-20-60-10', name: 'Exterior Fountains', xwalkId: '2465,2466,2469,2470,2471,2472,2473,2474,2475,2476', description: '', children: [] },
        { id: 'uf_G_20_60_20', code: 'G-20-60-20', name: 'Fences and Gates', xwalkId: '308,309,1055,1056,3298,3299,3300,3301,3302,3303,3304,3305,3306,3307,3308,3309,3310,3311,3312,3313,3314,3315,3316,3317,3318,3319,3320,3325', description: '', children: [] },
        { id: 'uf_G_20_60_25', code: 'G-20-60-25', name: 'Site Furnishings', xwalkId: '237,310,311,312,313,2234,2235,3365,3366,3367,3368,3369,3370,3371,3372,3373,3374,3375', description: '', children: [] },
        { id: 'uf_G_20_60_30', code: 'G-20-60-30', name: 'Exterior Signage', xwalkId: '244,1432,1433,1434,1435,1436,1437,1438,1439,1440,1441,1442,1443,1444', description: '', children: [] },
        { id: 'uf_G_20_60_35', code: 'G-20-60-35', name: 'Flagpoles', xwalkId: '243,1634,1635,1636,1637,1638,1639,1640,1641,1642,1643,1644,1645', description: '', children: [] },
        { id: 'uf_G_20_60_40', code: 'G-20-60-40', name: 'Covers and Shelters', xwalkId: '1357,1611,1616,1617,1619,1624,1625,1673,1674,1675', description: '', children: [] },
        { id: 'uf_G_20_60_50', code: 'G-20-60-50', name: 'Site Equipment', xwalkId: '1546,3380,3381', description: '', children: [] },
        { id: 'uf_G_20_60_60', code: 'G-20-60-60', name: 'Retaining Walls', xwalkId: '234,3348,3349,3350,3351,3352,3353,3354,3355,3356,3357', description: '', children: [] },
        { id: 'uf_G_20_60_70', code: 'G-20-60-70', name: 'Site Bridges', xwalkId: '530', description: '', children: [] },
        { id: 'uf_G_20_60_85', code: 'G-20-60-85', name: 'Site Specialties', xwalkId: '235,236,238,241,242,245,1663,3188,3201,3212,3324,3376,3377,3378,3379,3419,3420,3421,3422,3423', description: '', children: [] }
      ] },
      { id: 'uf_G_20_80', code: 'G-20-80', name: 'Landscaping', xwalkId: '3405,3406,3407,3408,3409,3430,3431,3433,3434,3435,3437', description: '', children: [
        { id: 'uf_G_20_80_10', code: 'G-20-80-10', name: 'Planting Irrigation', xwalkId: '3186,3199,3280,3424,3425,3426,3427,3428,3429,3432,3436', description: '', children: [] },
        { id: 'uf_G_20_80_20', code: 'G-20-80-20', name: 'Turf and Grasses', xwalkId: '3184,3194,3208,3400,3401,3402,3403,3404', description: '', children: [] },
        { id: 'uf_G_20_80_30', code: 'G-20-80-30', name: 'Plants', xwalkId: '3391,3392,3393,3394,3395,3396,3397', description: '', children: [] },
        { id: 'uf_G_20_80_50', code: 'G-20-80-50', name: 'Planting Accessories', xwalkId: '3410,3411,3412,3413', description: '', children: [] },
        { id: 'uf_G_20_80_80', code: 'G-20-80-80', name: 'Landscaping Activities', xwalkId: '3414,3415,3416,3417', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_G_30', code: 'G-30', name: 'LIQUID AND GAS SITE UTILITIES', xwalkId: '3552,3553,3559,3560', description: '', children: [
      { id: 'uf_G_30_10', code: 'G-30-10', name: 'Water Utilities', xwalkId: '3510,3511,3561,3563,3564', description: '', children: [
        { id: 'uf_G_30_10_10', code: 'G-30-10-10', name: 'Site Domestic Water Distribution', xwalkId: '3504,3506,3514,3515,3516,3517,3562', description: '', children: [] },
        { id: 'uf_G_30_10_30', code: 'G-30-10-30', name: 'Site Fire Protection Water Distribution', xwalkId: '3505,3507,3508,3509', description: '', children: [] },
        { id: 'uf_G_30_10_50', code: 'G-30-10-50', name: 'Site Irrigation Water Distribution', xwalkId: '3518,3519,3520,3521', description: '', children: [] }
      ] },
      { id: 'uf_G_30_20', code: 'G-30-20', name: 'Sanitary Sewerage Utilities', xwalkId: '3522,3523,3527,3528,3529,3532,3533,3567,3568,3570,3571', description: '', children: [
        { id: 'uf_G_30_20_20', code: 'G-30-20-20', name: 'Sanitary Sewerage Piping', xwalkId: '3526', description: '', children: [] },
        { id: 'uf_G_30_20_40', code: 'G-30-20-40', name: 'Utility Septic Tanks', xwalkId: '3525,3569', description: '', children: [] },
        { id: 'uf_G_30_20_50', code: 'G-30-20-50', name: 'Sanitary Sewerage Structures', xwalkId: '3524', description: '', children: [] }
      ] },
      { id: 'uf_G_30_30', code: 'G-30-30', name: 'Storm Drainage Utilities', xwalkId: '3534,3535,3536,3538,3539,3541,3543,3544,3547,3548,3574,3575,3576,3578,3580,3581', description: '', children: [
        { id: 'uf_G_30_30_30', code: 'G-30-30-30', name: 'Culverts', xwalkId: '3537,3577', description: '', children: [] },
        { id: 'uf_G_30_30_40', code: 'G-30-30-40', name: 'Site Storm Water Drains', xwalkId: '543,544,545,546,547,548,3542,3579', description: '', children: [] },
        { id: 'uf_G_30_30_60', code: 'G-30-30-60', name: 'Site Subdrainage', xwalkId: '3057,3058,3059,3060,3118,3121,3185,3198,3209,3218,3224,3229,3235,3279,3446,3540', description: '', children: [] }
      ] },
      { id: 'uf_G_30_60', code: 'G-30-60', name: 'Site Fuel Distribution', xwalkId: '', description: '', children: [
        { id: 'uf_G_30_60_10', code: 'G-30-60-10', name: 'Site Gas Distribution', xwalkId: '3549,3550,3551,3584', description: '', children: [] }
      ] },
      { id: 'uf_G_30_90', code: 'G-30-90', name: 'Liquid and Gas Site Utilities Supplementary Components', xwalkId: '', description: '', children: [
        { id: 'uf_G_30_90_10', code: 'G-30-90-10', name: 'Supplementary Components', xwalkId: '232', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_G_40', code: 'G-40', name: 'ELECTRICAL SITE IMPROVEMENTS', xwalkId: '', description: '', children: [
      { id: 'uf_G_40_10', code: 'G-40-10', name: 'Site Electric Distribution Systems', xwalkId: '2745,2747,2751', description: '', children: [
        { id: 'uf_G_40_10_20', code: 'G-40-10-20', name: 'Electric Transmission and Distribution', xwalkId: '247,2746', description: '', children: [] }
      ] },
      { id: 'uf_G_40_50', code: 'G-40-50', name: 'Site Lighting', xwalkId: '2749', description: '', children: [] }
    ] }
  ] },
  { id: 'uf_Z', code: 'Z', name: 'GENERAL', xwalkId: '', description: '', children: [
    { id: 'uf_Z_10', code: 'Z-10', name: 'GENERAL REQUIREMENTS', xwalkId: '', description: '', children: [
      { id: 'uf_Z_10_10', code: 'Z-10-10', name: 'Price and Payment Procedures', xwalkId: '', description: '', children: [
        { id: 'uf_Z_10_10_10', code: 'Z-10-10-10', name: 'Allowances', xwalkId: '1,2,157,478', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_20', code: 'Z-10-20', name: 'Administrative Requirements', xwalkId: '', description: '', children: [
        { id: 'uf_Z_10_20_10', code: 'Z-10-20-10', name: 'Project Management and Coordination', xwalkId: '3,4,5,8,23,76,104,162,259,270,286,350,451,483,552,590,631,649,677,704,732,762,782,813,867,955,972,1072', description: '', children: [] },
        { id: 'uf_Z_10_20_30', code: 'Z-10-20-30', name: 'Construction Progress Documentation', xwalkId: '63,596,2325,2422,2966,3076,3130,3172,3265,3346,3389,3464,3497', description: '', children: [] },
        { id: 'uf_Z_10_20_50', code: 'Z-10-20-50', name: 'Submittal Procedures', xwalkId: '74,102,160,257,268,284,319,331,348,449,481,535,551,588,629,647,675,702,730,760,780,798,812,845,865,942,954,970', description: '', children: [] },
        { id: 'uf_Z_10_20_70', code: 'Z-10-20-70', name: 'Special Procedures', xwalkId: '25,26,27,28', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_40', code: 'Z-10-40', name: 'Quality Requirements', xwalkId: '24', description: '', children: [
        { id: 'uf_Z_10_40_10', code: 'Z-10-40-10', name: 'Regulatory Requirements', xwalkId: '9,29,73,101,159,256,267,283,318,330,347,448,480,550,587,628,646,674,701,729,759,779,797,811,844,864,941,953,969', description: '', children: [] },
        { id: 'uf_Z_10_40_40', code: 'Z-10-40-40', name: 'Quality Assurance', xwalkId: '165,290,323,354,455,555,593,653,681,708,736,766,786,816,870,976,1076,1105,1126,1160,1175,1210,1251,1271,1290,1308,1324', description: '', children: [] },
        { id: 'uf_Z_10_40_80', code: 'Z-10-40-80', name: 'Quality Control', xwalkId: '30,31,32,33', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_50', code: 'Z-10-50', name: 'Temporary Facilities and Controls', xwalkId: '108,291,486,594,709', description: '', children: [
        { id: 'uf_Z_10_50_10', code: 'Z-10-50-10', name: 'Temporary Utilities', xwalkId: '35,36,37,2733,2760,3493', description: '', children: [] },
        { id: 'uf_Z_10_50_25', code: 'Z-10-50-25', name: 'Temporary Construction', xwalkId: '597', description: '', children: [] },
        { id: 'uf_Z_10_50_30', code: 'Z-10-50-30', name: 'Construction Aids', xwalkId: '38,39,40,41,42,43,44,45,46,47,48,49,1127,3611', description: '', children: [] },
        { id: 'uf_Z_10_50_35', code: 'Z-10-50-35', name: 'Temporary Vehicular Access and Parking', xwalkId: '50,51,52,53,2968,2969,3077', description: '', children: [] },
        { id: 'uf_Z_10_50_40', code: 'Z-10-50-40', name: 'Temporary Barriers and Enclosures', xwalkId: '54,55,56,57,58,3044,3390', description: '', children: [] },
        { id: 'uf_Z_10_50_50', code: 'Z-10-50-50', name: 'Temporary Controls', xwalkId: '59,60', description: '', children: [] },
        { id: 'uf_Z_10_50_70', code: 'Z-10-50-70', name: 'Project Identification', xwalkId: '61', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_60', code: 'Z-10-60', name: 'Product Requirements', xwalkId: '', description: '', children: [
        { id: 'uf_Z_10_60_50', code: 'Z-10-60-50', name: 'Product Storage and Handling Requirements', xwalkId: '62', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_70', code: 'Z-10-70', name: 'Execution and Closeout Requirements', xwalkId: '', description: '', children: [
        { id: 'uf_Z_10_70_10', code: 'Z-10-70-10', name: 'Examination and Preparation', xwalkId: '64,72,100,158,255,266,282,317,329,346,447,479,549,586,627,645,673,700,728,758,778,796,810,843,863,940,952,968', description: '', children: [] },
        { id: 'uf_Z_10_70_20', code: 'Z-10-70-20', name: 'Execution', xwalkId: '65,66,75,103,161,258,269,285,320,349,450,456,457,482,487,488,489,533,534,589,630,634,648,676,703,731,761,781', description: '', children: [] },
        { id: 'uf_Z_10_70_30', code: 'Z-10-70-30', name: 'Cleaning and Waste Management', xwalkId: '67,68,69,70,79,107,273,289,322,333,353,454,536,554,592,633,652,680,707,735,765,785,800,848,944,975,1029,1044', description: '', children: [] },
        { id: 'uf_Z_10_70_60', code: 'Z-10-70-60', name: 'Closeout Procedures', xwalkId: '77,105,163,260,271,287,351,452,484,650,678,705,733,763,783,814,868,956,973,1073,1123,1172,1207,1268,1321,1937', description: '', children: [] },
        { id: 'uf_Z_10_70_70', code: 'Z-10-70-70', name: 'Closeout Submittals', xwalkId: '6,7,71,78,106,164,261,272,288,321,332,352,453,485,553,591,632,651,679,706,734,764,784,799,815,847,869,943,957', description: '', children: [] }
      ] },
      { id: 'uf_Z_10_90', code: 'Z-10-90', name: 'Life Cycle Activities', xwalkId: '', description: '', children: [
        { id: 'uf_Z_10_90_10', code: 'Z-10-90-10', name: 'Commissioning', xwalkId: '34,1714,1884,2323,2420,2506,2531,2600,2642,2705,2761,2783,2803,2861,2887,2904,2922,3495', description: '', children: [] }
      ] }
    ] },
    { id: 'uf_Z_70', code: 'Z-70', name: 'TAXES, PERMITS, INSURANCE AND BONDS', xwalkId: '14,15,16,17,18,19', description: '', children: [
      { id: 'uf_Z_70_50', code: 'Z-70-50', name: 'Permit Costs', xwalkId: '10', description: '', children: [] },
      { id: 'uf_Z_70_70', code: 'Z-70-70', name: 'Bond Fees', xwalkId: '11,12,13', description: '', children: [] }
    ] },
    { id: 'uf_Z_90', code: 'Z-90', name: 'FEES AND CONTINGENCIES', xwalkId: '', description: '', children: [
      { id: 'uf_Z_90_30', code: 'Z-90-30', name: 'Profit', xwalkId: '22', description: '', children: [] },
      { id: 'uf_Z_90_50', code: 'Z-90-50', name: 'Construction Contingencies', xwalkId: '21', description: '', children: [
        { id: 'uf_Z_90_50_10', code: 'Z-90-50-10', name: 'Design Contingencies', xwalkId: '20', description: '', children: [] }
      ] }
    ] }
  ] }
];

const SYSTEMS_ITEMS = UNIFORMAT_ITEMS;

const INITIAL_TABS: RefTab[] = [
  { id: 'phases',        label: 'Phases',        items: PHASE_ITEMS,    builtIn: true, structureType: 'flat'      as StructureType },
  { id: 'work-packages', label: 'WBS Code',       items: WORK_PKG_ITEMS, builtIn: true, structureType: 'hierarchy' as StructureType },
  { id: 'assembly',      label: 'Master Format',  items: ASSEMBLY_ITEMS, builtIn: true, structureType: 'hierarchy' as StructureType },
  { id: 'systems',       label: 'Uni Format',     items: SYSTEMS_ITEMS,  builtIn: true, structureType: 'hierarchy' as StructureType },
];

const INITIAL_EXPANDED = new Set([
  // Phases — all Tier 01 nodes expanded by default
  'ph-pl', 'ph-ds', 'ph-pc', 'ph-cn', 'ph-cx', 'ph-ho', 'ph-op',
  // Assembly — deep-expand example nodes
  'A', 'A20', 'A2010', 'A2010100',
]);

// ─── Column constants ──────────────────────────────────────────────────────────
const COL_CODE     = 360;
const COL_NAME     = 340;
const COL_ACTIONS  = 160;
const COL_DESC_MIN = 160; // description column minimum — prevents over-squish
const HEADER_H     = 44;
const ROW_H        = 44;
const INDENT       = 20; // px per depth

// ─── Highlight text ────────────────────────────────────────────────────────────
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lo = text.toLowerCase(), lq = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let last = 0, idx = lo.indexOf(lq, last);
  while (idx !== -1) {
    if (idx > last) parts.push(text.slice(last, idx));
    parts.push(<span key={idx} style={{ background: '#FCFE58' }}>{text.slice(idx, idx + query.length)}</span>);
    last = idx + query.length;
    idx = lo.indexOf(lq, last);
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA4AE" strokeWidth="1.5" />
      <path d="M13.5 13.5L18 18" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function SortArrows({ dir }: { dir: SortDir | null }) {
  const up = dir === 'asc'  ? '#4D7CFE' : '#C4CAD1';
  const dn = dir === 'desc' ? '#4D7CFE' : '#C4CAD1';
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
      <path d="M5.5 7V1"          stroke={up} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 4L5.5 1L9 4"    stroke={up} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 7V13"         stroke={dn} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 10L5.5 13L9 10" stroke={dn} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      {expanded ? (
        /* Chevron-down frame — apex at top (▲ natively), rotate 180° around centre → ▼ */
        <path d={chevronDownPaths.p1d4b7280} fill="#384857" transform="rotate(180 9 9)" />
      ) : (
        /* Chevron-right frame — apex at left (◄ natively), rotate 180° around centre → ► */
        <path d={chevronRightPaths.p1d644480} fill="#384857" transform="rotate(180 9 9)" />
      )}
    </svg>
  );
}
function GripDotsIcon({ color = '#9CA4AE' }: { color?: string }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <circle cx="3" cy="2"  r="1.5" fill={color} /><circle cx="7" cy="2"  r="1.5" fill={color} />
      <circle cx="3" cy="6"  r="1.5" fill={color} /><circle cx="7" cy="6"  r="1.5" fill={color} />
      <circle cx="3" cy="10" r="1.5" fill={color} /><circle cx="7" cy="10" r="1.5" fill={color} />
      <circle cx="3" cy="14" r="1.5" fill={color} /><circle cx="7" cy="14" r="1.5" fill={color} />
    </svg>
  );
}
function ImportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6.75 2.75H0.75V20.75H18.75V9.75" stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M9.75 12.75L9.75 8.75C9.75 4.33172 13.3317 0.750001 17.75 0.75L20.75 0.75" stroke="#616D79" strokeWidth="1.5" />
      <path d="M13.75 9.75L9.75 13.75L5.75 9.75" stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9.75 2.53H0.75V20.53H18.75V11.53" stroke="#616D79" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M16.75 8.53L20.75 4.53L16.75 0.53" stroke="#616D79" strokeWidth="1.5" />
      <path d="M19.75 4.53H15.75C11.33 4.53 7.75 8.11 7.75 12.53V15.53" stroke="#616D79" strokeWidth="1.5" />
    </svg>
  );
}
function EditPencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrashIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14.6239 16.875" fill="none">
      <path d={trashPaths.pc0b2e00} fill={color} />
    </svg>
  );
}
function AddChildIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'rotate(90deg)' }}>
      <path clipRule="evenodd" d={childPaths.p247db800} fill="#384857" fillRule="evenodd" />
      <path d={childPaths.pbf71000} fill="#FF6425" />
    </svg>
  );
}
function AddSiblingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'rotate(90deg)' }}>
      <path clipRule="evenodd" d={siblingPaths.p35a00f00} fill="#384857" fillRule="evenodd" />
      <path clipRule="evenodd" d={siblingPaths.pbf71000}  fill="#FF6425" fillRule="evenodd" />
    </svg>
  );
}

// ─── Validation banner ────────────────────────────────────────────────────────
function ValidationBanner({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 36, flexShrink: 0, background: '#FFF1F0', borderBottom: '1px solid #FFA39E' }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#B91C1C' }}>
        {count} validation {count === 1 ? 'error' : 'errors'} — hover the highlighted fields for details.
      </span>
    </div>
  );
}

// ─── Drag preview ─────────────────────────────────────────────────────────────
function DragPreview({ x, y, item }: { x: number; y: number; item: DragItem }) {
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', left: 0, top: 0, transform: `translate(${x + 18}px, ${y - 22}px)`, pointerEvents: 'none', zIndex: 9999, background: 'white', border: '1px solid #D0D5DD', borderLeft: '4px solid #FF4D00', borderRadius: 4, padding: '0 12px', height: 36, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 8, maxWidth: 320, overflow: 'hidden', opacity: 0.96, userSelect: 'none' }}>
      <GripDotsIcon color="#9CA4AE" />
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#1D2939', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
    </div>,
    document.body
  );
}

// ─── Resize handle (§7.A.5–7) ─────────────────────────────────────────────────
function ResizeHandle({
  colKey, onDelta, cellHovered = false,
}: { colKey: string; onDelta: (key: string, delta: number) => void; cellHovered?: boolean }) {
  const [active,        setActive]        = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);
  const startXRef = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    startXRef.current = e.clientX;
    setActive(true);

    function onMove(ev: MouseEvent) {
      onDelta(colKey, ev.clientX - startXRef.current);
      startXRef.current = ev.clientX;
    }
    function onUp() {
      setActive(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  const lineColor = active || handleHovered ? '#4D7CFE'
                  : cellHovered             ? '#9CA4AE'
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
      <div style={{ height: HEADER_H, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── Header cell ──────────────────────────────────────────────────────────────
function RefHeaderCell({
  label, sortKey, sortState, onSort, style, editMode = false,
  colKey, onDelta, showResize = false,
}: {
  label: string; sortKey: SortKey | null; sortState: SortState | null;
  onSort: () => void; style?: React.CSSProperties; editMode?: boolean;
  colKey?: string; onDelta?: (key: string, delta: number) => void; showResize?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive  = !editMode && !!sortKey && sortState?.key === sortKey;
  const clickable = !editMode && !!sortKey;
  return (
    <div
      style={{
        ...style,
        position: 'relative',
        display: 'flex', alignItems: 'center', height: '100%',
        // paddingRight: 10 gives 8px visual gap to the 2px resize border line (§7.A.2)
        paddingLeft: 12, paddingRight: showResize ? 10 : 8,
        overflow: 'clip', cursor: clickable ? 'pointer' : 'default',
        userSelect: 'none', flexShrink: 0,
        background: hovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onClick={clickable ? onSort : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* §7.A.3 — Open Sans, 13px, 600, #384857 */}
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
        {label}
      </span>
      {!editMode && sortKey && (
        <span style={{ display: 'flex', alignItems: 'center', width: 16, height: 16, flexShrink: 0, marginLeft: 4, opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>
          <SortArrows dir={isActive ? sortState!.dir : null} />
        </span>
      )}
      {showResize && colKey && onDelta && (
        <ResizeHandle colKey={colKey} onDelta={onDelta} cellHovered={hovered} />
      )}
    </div>
  );
}

// ─── Edit input ───────────────────────────────────────────────────────────────
function EditInput({ value, onChange, placeholder, error, errorMessage }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  error?: boolean; errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const border = error ? (focused ? '#FF4D4F' : '#FFA39E') : (focused ? '#91D5FF' : '#D0D5DD');
  return (
    <input type="text" value={value} placeholder={placeholder} title={errorMessage} onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ flex: 1, minWidth: 0, height: 30, paddingLeft: 8, paddingRight: 8, border: `1px solid ${border}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#344054', background: error ? '#FFF1F0' : '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
    />
  );
}

// ─── Icon button (Tertiary Small) ─────────────────────────────────────────────
function IconBtn({ onClick, title, children }: { onClick: () => void; title?: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pressed ? '#616D79' : hovered ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s', padding: 0 }}
    >
      {children}
    </button>
  );
}

// ─── Drag handle ──────────────────────────────────────────────────────────────
function DragHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseDown={onMouseDown} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: 24, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', userSelect: 'none', opacity: hovered ? 1 : 0.35, transition: 'opacity 0.15s' }}>
      <GripDotsIcon color={hovered ? '#384857' : '#9CA4AE'} />
    </div>
  );
}

// ─── Toolbar helpers ──────────────────────────────────────────────────────────
function ToolbarBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 10, paddingRight: 10, background: hov ? '#F5F6F7' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      {children}
    </button>
  );
}
function SecondaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 12, paddingRight: 12, background: hov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
      {children}
    </button>
  );
}
function PrimaryEditBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: hov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: 'white', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      <EditPencilIcon /><span>Edit</span>
    </button>
  );
}
function RestoreDefaultBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 36, display: 'flex', alignItems: 'center',
        background: 'none', border: 'none', borderRadius: 4,
        cursor: 'pointer', padding: '0 8px',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        color: '#616D79',
        textDecoration: hov ? 'underline' : 'none',
        whiteSpace: 'nowrap', transition: 'text-decoration 0.15s',
      }}
    >
      Restore Default
    </button>
  );
}
function CancelBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: pressed ? '#FFFFFF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      Cancel
    </button>
  );
}
function SaveBtn({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: disabled ? '#FFBD9C' : hov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: 'white', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
      Save changes
    </button>
  );
}

// ─── Structure Type Icons ──────────────────────────────────────────────────────
function FlatListIcon({ color = '#616D79', size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d={flatListPaths.p38446780} stroke={color} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function HierarchyIcon({ color = '#616D79', size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d={hierarchyPaths.p2e1c1b00} stroke={color} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function StructureTypeIcon({ type, color, size }: { type: StructureType | null; color?: string; size?: number }) {
  if (type === 'flat')      return <FlatListIcon color={color} size={size} />;
  if (type === 'hierarchy') return <HierarchyIcon color={color} size={size} />;
  return null;
}

// ─── Structure Type Dropdown (portalled) ──────────────────────────────────────
const STRUCTURE_OPTIONS: { value: StructureType; label: string }[] = [
  { value: 'flat',      label: 'Flat List' },
  { value: 'hierarchy', label: 'Hierarchy' },
];

function StructureDropdown({
  value, onChange,
}: {
  value: StructureType | null;
  onChange: (v: StructureType) => void;
}) {
  const [open, setOpen]               = useState(false);
  const [search, setSearch]           = useState('');
  const [menuStyle, setMenuStyle]     = useState<React.CSSProperties>({});
  const triggerRef                    = useRef<HTMLDivElement>(null);
  const inputRef                      = useRef<HTMLInputElement>(null);

  const selectedLabel = value ? STRUCTURE_OPTIONS.find(o => o.value === value)?.label ?? '' : '';
  const filtered = search.length >= 2
    ? STRUCTURE_OPTIONS.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : STRUCTURE_OPTIONS;

  function openMenu() {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      minWidth: 180,
      background: '#FFFFFF',
      borderRadius: 4,
      boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
      paddingTop: 4,
      paddingBottom: 4,
      zIndex: 9999,
      maxHeight: 320,
      overflowY: 'auto',
    });
    setOpen(true);
    setSearch('');
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function close() { setOpen(false); setSearch(''); }

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const chevronColor = open ? '#91D5FF' : '#9EA3A9';

  return (
    <>
      <div
        ref={triggerRef}
        onClick={open ? close : openMenu}
        style={{
          height: 40, width: '100%', background: '#FFFFFF',
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4, display: 'flex', alignItems: 'center',
          paddingLeft: 10, paddingRight: 10, gap: 6,
          cursor: open ? 'default' : 'pointer',
          boxSizing: 'border-box', transition: 'border-color 0.15s', userSelect: 'none',
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            onClick={e => e.stopPropagation()}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054' }}
          />
        ) : (
          <>
            {value && <StructureTypeIcon type={value} size={18} color="#616D79" />}
            <span style={{ flex: 1, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: value ? '#344054' : '#9EA3A9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {value ? selectedLabel : 'Select structure type'}
            </span>
          </>
        )}
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
          <path d="M1 1L6 6L11 1" stroke={chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && ReactDOM.createPortal(
        <div style={menuStyle as React.CSSProperties}>
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No results found</div>
          ) : filtered.map(opt => {
            const isSelected = value === opt.value;
            return (
              <div
                key={opt.value}
                onMouseDown={e => { e.preventDefault(); onChange(opt.value); close(); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingLeft: 12, paddingRight: 12, gap: 8,
                  background: isSelected ? '#E6F7FF' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.1s',
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isSelected ? 600 : 400, color: '#384857',
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = isSelected ? '#E6F7FF' : 'transparent'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <StructureTypeIcon type={opt.value} size={18} color="#616D79" />
                  {opt.label}
                </span>
                {isSelected && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5L5 9L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Create Reference Data Modal ──────────────────────────────────────────────
function CreateRefDataModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (name: string, structureType: StructureType) => void;
  onClose: () => void;
}) {
  const [name, setName]                     = useState('');
  const [structureType, setStructureType]   = useState<StructureType>('flat');
  const [nameFocused, setNameFocused]       = useState(false);
  const [nameTouched, setNameTouched]       = useState(false);
  const nameRef                             = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const trimmedName    = name.trim();
  const nameValid      = trimmedName.length >= 3;
  const canCreate      = nameValid;

  const nameError      = nameTouched && !nameValid;
  const nameBorder     = nameError ? '#FFA39E' : nameFocused ? '#91D5FF' : '#D0D5DD';

  function handleCreate() {
    setNameTouched(true);
    if (!canCreate) return;
    onConfirm(trimmedName, structureType!);
  }

  const [cancelHov, setCancelHov] = useState(false);
  const [createHov, setCreateHov] = useState(false);

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 480, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header (§10.3) ── */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Create New Reference Data
            </p>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Name field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#344054' }}>
              Name <span style={{ color: '#D92D20' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => { setNameFocused(false); }}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                placeholder="Enter reference data name"
                style={{
                  width: '100%', height: 40, boxSizing: 'border-box',
                  paddingLeft: 10, paddingRight: 10,
                  border: `1px solid ${nameBorder}`,
                  borderRadius: 4,
                  fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
                  lineHeight: '20px', color: '#344054',
                  background: nameError ? '#FFF1F0' : '#FFFFFF',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
              />
            </div>
            {nameError ? (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#D92D20', lineHeight: '16px' }}>
                Name must be at least 3 characters.
              </span>
            ) : (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#667085', lineHeight: '16px' }}>
                Minimum 3 characters required.
              </span>
            )}
          </div>

          {/* Structure Type field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#344054' }}>
              Structure Type <span style={{ color: '#D92D20' }}>*</span>
            </label>
            <StructureDropdown value={structureType} onChange={setStructureType} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#667085', lineHeight: '16px' }}>
              Choose how items are organised in this reference data set.
            </span>
          </div>

        </div>

        {/* ── Footer (§10.4) ── */}
        <div style={{ height: 72, flexShrink: 0, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingLeft: 28, paddingRight: 28 }}>
          <button
            onClick={onClose}
            onMouseEnter={() => setCancelHov(true)}
            onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${cancelHov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canCreate}
            onMouseEnter={() => canCreate && setCreateHov(true)}
            onMouseLeave={() => setCreateHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: !canCreate ? '#FFBD9C' : createHov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: !canCreate ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
          >
            Create
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}

// ─── Remove Tab Confirmation Modal ────────────────────────────────────────────
function RemoveTabModal({
  tabLabel,
  onConfirm,
  onClose,
}: {
  tabLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [input, setInput]         = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [cancelHov, setCancelHov] = useState(false);
  const [removeHov, setRemoveHov] = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const confirmed = input.trim().toLowerCase() === 'remove';

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 460, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>
              Remove Reference Data
            </p>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Warning icon + description */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1D2C38' }}>
                This action cannot be undone
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '18px', color: '#616D79' }}>
                You are about to permanently remove the <strong style={{ color: '#1D2C38' }}>{tabLabel}</strong> reference data table and all its contents.
              </span>
            </div>
          </div>

          {/* Confirmation input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
              Type <strong style={{ color: '#1D2C38', fontWeight: 600 }}>remove</strong> to confirm
            </label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter' && confirmed) onConfirm(); }}
              placeholder="remove"
              style={{
                height: 40, width: '100%', boxSizing: 'border-box',
                paddingLeft: 10, paddingRight: 10,
                border: `1px solid ${inputFocused ? '#91D5FF' : '#D0D5DD'}`,
                borderRadius: 4,
                fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
                color: '#344054', background: '#FFFFFF',
                outline: 'none', transition: 'border-color 0.15s',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ height: 72, flexShrink: 0, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingLeft: 28, paddingRight: 28 }}>
          <button
            onClick={onClose}
            onMouseEnter={() => setCancelHov(true)}
            onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${cancelHov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}
          >
            Cancel
          </button>
          <button
            onClick={confirmed ? onConfirm : undefined}
            disabled={!confirmed}
            onMouseEnter={() => confirmed && setRemoveHov(true)}
            onMouseLeave={() => setRemoveHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: !confirmed ? 'rgba(217,45,32,0.35)' : removeHov ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: !confirmed ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
          >
            Remove
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}

// ─── Delete Row Warning Modal ─────────────────────────────────────────────────
const DELETE_ROW_WARNING_KEY = 'inertia_ref_data_delete_row_warning_dismissed';

function DeleteRowWarningModal({
  item,
  tabLabel,
  onConfirm,
  onCancel,
}: {
  item: RefItem;
  tabLabel: string;
  onConfirm: (dontShowAgain: boolean) => void;
  onCancel: () => void;
}) {
  const [dontShow, setDontShow] = useState(false);
  const [confirmHov, setConfirmHov] = useState(false);
  const [cancelHov, setCancelHov] = useState(false);
  const [checkHov, setCheckHov] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  const displayName = item.name || item.code || 'this item';

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{ width: 520, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Remove Row
            </p>
            <button
              onClick={onCancel}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '24px 28px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Icon + primary message */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.25" stroke="#C4320A" strokeWidth="1.5" />
                <path d="M10 6.5V10.5" stroke="#C4320A" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13.25" r="0.875" fill="#C4320A" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1D2C38' }}>
                Removing{' '}
                <span style={{ fontStyle: 'italic', color: '#384857' }}>"{displayName}"</span>{' '}
                from <span style={{ color: '#384857' }}>{tabLabel}</span> will orphan any existing assignments.
              </p>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                This value is used as a selectable option in forms, elements, and other records across the project.
                Removing it from the list <strong style={{ fontWeight: 600, color: '#384857' }}>does not clear it from records that already have it assigned</strong> , those records will continue to display the value as-is.
              </p>
            </div>
          </div>

          {/* Orphan explanation card */}
          <div style={{ background: '#FFF7ED', border: '1px solid #FDDCB5', borderRadius: 6, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M6 10L4.5 11.5a2.121 2.121 0 0 0 3 3L9 13" stroke="#C4320A" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M10 6l1.5-1.5a2.121 2.121 0 0 0-3-3L7 3" stroke="#C4320A" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M5.5 8.5l5-5" stroke="#C4320A" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M4 4l1 1M11 11l1 1" stroke="#C4320A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, lineHeight: '16px', color: '#C4320A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                What "orphaned" means
              </span>
            </div>
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#7A3B0A' }}>
              An orphaned value is one that <strong style={{ fontWeight: 600 }}>still appears on a record but is no longer available to select.</strong> Any record currently holding{' '}
              <span style={{ fontStyle: 'italic' }}>"{displayName}"</span> will display it correctly for now , but the moment a user edits that field and switches to a different value,{' '}
              <strong style={{ fontWeight: 600 }}>they will never be able to get it back.</strong> The option disappears from the dropdown permanently.
            </p>
          </div>

          {/* Don't show again */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', padding: '2px 0' }}
            onClick={() => setDontShow(v => !v)}
            onMouseEnter={() => setCheckHov(true)}
            onMouseLeave={() => setCheckHov(false)}
          >
            <div style={{
              width: 16, height: 16, borderRadius: 3, flexShrink: 0,
              background: dontShow ? '#0E70CB' : checkHov ? '#F0F7FF' : '#FFFFFF',
              border: `1px solid ${dontShow ? '#0E70CB' : checkHov ? '#0E70CB' : '#D0D5DD'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, border-color 0.15s',
            }}>
              {dontShow && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#384857' }}>
              Don't show this message again
            </span>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{ height: 72, borderTop: '1px solid #C3C7CC', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#FFFFFF' }}>
          <button
            onClick={onCancel}
            onMouseEnter={() => setCancelHov(true)}
            onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, padding: '0 16px', background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(dontShow)}
            onMouseEnter={() => setConfirmHov(true)}
            onMouseLeave={() => setConfirmHov(false)}
            style={{ height: 36, padding: '0 20px', background: confirmHov ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
          >
            Remove Row
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}

// ─── Auto-sizing tab input ────────────────────────────────────────────────────
function AutoSizeTabInput({
  initialValue,
  onCommit,
  onCancel,
}: {
  initialValue: string;
  onCommit: (v: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue]   = useState(initialValue);
  const [width, setWidth]   = useState(80);
  const spanRef             = useRef<HTMLSpanElement>(null);
  const inputRef            = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);

  useEffect(() => {
    if (spanRef.current) {
      const w = Math.max(spanRef.current.offsetWidth + 24, 80);
      setWidth(w);
    }
  }, [value]);

  function commit() {
    const v = value.trim();
    if (v) onCommit(v); else onCancel();
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {/* Hidden mirror span for width measurement */}
      <span
        ref={spanRef}
        aria-hidden
        style={{
          position: 'absolute', visibility: 'hidden', pointerEvents: 'none',
          whiteSpace: 'pre', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          paddingLeft: 12, paddingRight: 12,
        }}
      >
        {value || ' '}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          e.stopPropagation();
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') onCancel();
        }}
        onBlur={commit}
        onClick={e => e.stopPropagation()}
        style={{
          width, height: 28, boxSizing: 'border-box',
          paddingLeft: 8, paddingRight: 8,
          border: '1.5px solid #91D5FF', borderRadius: 3,
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          color: '#243746', background: '#FFFFFF',
          outline: 'none', transition: 'width 0.08s',
        }}
      />
    </div>
  );
}

// ─── Tab Item (with edit-mode hover rename) ───────────────────────────────────
function TabItem({
  tab,
  isActive,
  editMode,
  isRenaming,
  onActivate,
  onStartRename,
  onCommitRename,
  onCancelRename,
}: {
  tab: RefTab;
  isActive: boolean;
  editMode: boolean;
  isRenaming: boolean;
  onActivate: () => void;
  onStartRename: () => void;
  onCommitRename: (name: string) => void;
  onCancelRename: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [penHov, setPenHov]   = useState(false);

  const showRenameIcon = editMode && isActive && hovered && !isRenaming;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPenHov(false); }}
      onClick={() => { if (!editMode && !isRenaming) onActivate(); }}
      style={{
        position: 'relative', height: 44,
        minWidth: 120, paddingLeft: isRenaming ? 12 : 16, paddingRight: isRenaming ? 8 : (showRenameIcon ? 36 : 16),
        background: isActive ? '#FFFFFF' : hovered && !editMode ? '#F0F0F0' : '#FAFAFA',
        border: '1px solid #F0F0F0',
        borderBottom: isActive ? (editMode ? '3px solid #FF4D00' : '3px solid #FF4D00') : '1px solid #F0F0F0',
        borderRadius: '4px 4px 0 0',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isActive ? 600 : 400,
        color: isActive ? '#243746' : '#384857',
        cursor: editMode ? 'default' : 'pointer',
        flexShrink: 0, whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', gap: 6,
        boxSizing: 'border-box',
        transition: 'background 0.1s, padding-right 0.1s',
      }}
    >
      {isRenaming ? (
        <AutoSizeTabInput
          initialValue={tab.label}
          onCommit={onCommitRename}
          onCancel={onCancelRename}
        />
      ) : (
        <>
          <StructureTypeIcon type={tab.structureType ?? 'flat'} size={18} color="#616D79" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? '#243746' : '#384857' }}>
            {tab.label}
          </span>

          {/* Rename icon — only in edit mode on hover */}
          {showRenameIcon && (
            <button
              onClick={e => { e.stopPropagation(); onStartRename(); }}
              onMouseEnter={() => setPenHov(true)}
              onMouseLeave={() => setPenHov(false)}
              title="Rename tab"
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, padding: 0,
                background: penHov ? '#E5E7E9' : 'transparent',
                border: 'none', borderRadius: 4, cursor: 'pointer',
                transition: 'background 0.1s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 1.5a2.121 2.121 0 013 3L5 14l-4 1 1-4L11.5 1.5z" stroke={penHov ? '#243746' : '#616D79'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ReferenceDataTable({
  initialTabs: initTabs,
  initialExpanded: initExpanded,
}: {
  initialTabs?: RefTab[];
  initialExpanded?: Set<string>;
} = {}) {
  // ── Tab state
  const [tabs, setTabs]               = useState<RefTab[]>(initTabs ?? INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState((initTabs ?? INITIAL_TABS)[0]?.id ?? 'trade');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [restoreDefaultOpen, setRestoreDefaultOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [renamingTabId, setRenamingTabId]     = useState<string | null>(null);

  // ── Flat-tab live data (shared backend for all structureType === 'flat' tabs)
  const [flatTabsData, setFlatTabsData] = useState<Record<string, FlatGroup[]>>(() => {
    const init: Record<string, FlatGroup[]> = {};
    (initTabs ?? INITIAL_TABS).forEach(tab => {
      if (tab.structureType === 'flat') {
        init[tab.id] = refItemsToFlatGroups(tab.items);
      }
    });
    return init;
  });

  // ── Flat-tab UI state (controlled from outer toolbar)
  const [flatGrouped, setFlatGrouped] = useState(true);
  const flatRef = useRef<FlatRefTableHandle>(null);

  // ── View state
  const [search, setSearch]           = useState('');
  const [clearHov, setClearHov]       = useState(false);
  const [sortState, setSortState]     = useState<SortState | null>(null);
  const [expanded, setExpanded]       = useState<Set<string>>(initExpanded ?? INITIAL_EXPANDED);
  const [hoveredId, setHoveredId]     = useState<string | null>(null);

  // ── Column widths (resizable)
  const [colWidths, setColWidths]     = useState({ code: COL_CODE, name: COL_NAME });
  function onColDelta(key: string, delta: number) {
    setColWidths(prev => ({
      ...prev,
      [key]: Math.max(80, (prev as Record<string, number>)[key] + delta),
    }));
  }

  // ── Edit state
  const [editMode, setEditMode]       = useState(false);
  const [editItems, setEditItems]     = useState<RefItem[]>([]);

  // ── Delete row warning modal
  const [deleteRowWarning, setDeleteRowWarning] = useState<{ item: RefItem } | null>(null);

  // ── Drag state
  const dragItemRef    = useRef<DragItem | null>(null);
  const dropTargetRef  = useRef<DropTarget | null>(null);
  const editItemsRef   = useRef(editItems);
  const liveItemsRef   = useRef<RefItem[]>([]);
  const editModeRef    = useRef(editMode);
  const expandedRef    = useRef(expanded);
  const rafRef         = useRef<number | null>(null);

  const [isDragging,  setIsDragging]  = useState(false);
  const [draggingId,  setDraggingId]  = useState<string | null>(null);
  const [previewPos,  setPreviewPos]  = useState({ x: 0, y: 0 });
  const [dropTarget,  setDropTarget]  = useState<DropTarget | null>(null);

  const activeTab  = tabs.find(t => t.id === activeTabId) ?? tabs[0];
  const liveItems  = activeTab.items;

  useEffect(() => { editItemsRef.current = editItems; }, [editItems]);
  useEffect(() => { liveItemsRef.current = liveItems; }, [liveItems]);
  useEffect(() => { editModeRef.current  = editMode;  }, [editMode]);
  useEffect(() => { expandedRef.current  = expanded;  }, [expanded]);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : '';
    return () => { document.body.style.cursor = ''; };
  }, [isDragging]);

  // ── Tab helpers
  const activeTabPrefix = useMemo(() => {
    if (activeTab.id === 'trade')         return 'Trade';
    if (activeTab.id === 'work-packages') return 'WBS Code';
    if (activeTab.id === 'assembly')      return 'Master Format';
    if (activeTab.id === 'systems')       return 'Uni Format';
    return activeTab.label;
  }, [activeTab]);

  function addTab(name: string, structureType: StructureType) {
    const newTab: RefTab = { id: uid(), label: name, items: [], builtIn: false, structureType };
    setTabs(t => [...t, newTab]);
    setActiveTabId(newTab.id);
    if (structureType === 'flat') {
      setFlatTabsData(p => ({ ...p, [newTab.id]: [] }));
    }
    setCreateModalOpen(false);
  }

  function removeActiveTab() {
    const remaining = tabs.filter(t => t.id !== activeTabId);
    setTabs(remaining);
    setActiveTabId(remaining.length > 0 ? remaining[remaining.length - 1].id : '');
    setRemoveModalOpen(false);
    setEditMode(false);
    setEditItems([]);
  }

  function renameTab(id: string, newLabel: string) {
    setTabs(ts => ts.map(t => t.id === id ? { ...t, label: newLabel } : t));
    setRenamingTabId(null);
  }

  // ── Persist edited items back to tab
  function saveTabItems(newItems: RefItem[]) {
    setTabs(tabs => tabs.map(t => t.id === activeTabId ? { ...t, items: newItems } : t));
  }

  // ── Enter / exit edit mode
  function enterEditMode() {
    let items: RefItem[] = JSON.parse(JSON.stringify(liveItems));
    if (items.length === 0) {
      const newId = uid();
      items = [{ id: newId, code: '', name: '', description: '', children: [] }];
    }
    setEditItems(items);
    setExpanded(new Set(collectAllIds(items)));
    setShowErrors(false);
    setEditMode(true);
  }
  function cancelEdit() { setEditMode(false); setEditItems([]); setShowErrors(false); }
  function saveEdit() {
    const errors = computeErrors();
    if (errors.size > 0) { setShowErrors(true); return; }
    saveTabItems(editItems);
    setEditMode(false); setEditItems([]); setShowErrors(false);
  }

  const [showErrors, setShowErrors] = useState(false);
  function computeErrors() { return editMode ? validateItems(editItems) : new Map<string, string>(); }
  const allErrors  = useMemo(() => computeErrors(), [editItems, editMode]);
  const editErrors = showErrors ? allErrors : new Map<string, string>();

  // ── Edit helpers
  function updItem(id: string, patch: Partial<Pick<RefItem, 'code' | 'name' | 'description'>>) {
    setEditItems(p => updateItem(p, id, patch));
  }
  function delItem(id: string) {
    // Find the item first so we can show the warning modal
    const findItem = (items: RefItem[], targetId: string): RefItem | null => {
      for (const it of items) {
        if (it.id === targetId) return it;
        const found = findItem(it.children, targetId);
        if (found) return found;
      }
      return null;
    };
    const target = findItem(editItems, id);
    if (!target) return;

    const dismissed = localStorage.getItem(DELETE_ROW_WARNING_KEY) === 'true';
    if (dismissed) {
      // Skip modal — delete immediately
      setEditItems(p => removeFromTree(p, id).tree);
    } else {
      setDeleteRowWarning({ item: target });
    }
  }

  function confirmDelItem(dontShowAgain: boolean) {
    if (!deleteRowWarning) return;
    if (dontShowAgain) localStorage.setItem(DELETE_ROW_WARNING_KEY, 'true');
    setEditItems(p => removeFromTree(p, deleteRowWarning.item.id).tree);
    setDeleteRowWarning(null);
  }
  function addChild(parentId: string) {
    const newId = uid();
    setEditItems(p => addChildToItem(p, parentId, { id: newId, code: '', name: '', description: '', children: [] }));
    setExpanded(p => new Set([...p, parentId, newId]));
  }
  function addSibling(siblingId: string) {
    const newId = uid();
    setEditItems(p => addSiblingAfter(p, siblingId, { id: newId, code: '', name: '', description: '', children: [] }));
  }

  // ── Sort
  function handleSort(key: SortKey) {
    setSortState(p => !p || p.key !== key ? { key, dir: 'asc' } : p.dir === 'asc' ? { key, dir: 'desc' } : null);
  }

  // ── Expand
  function toggleExpanded(id: string) { setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function expandAll()   { setExpanded(new Set(collectAllIds(editMode ? editItems : liveItems))); }
  function collapseAll() { setExpanded(new Set()); }

  // ── Drag & Drop (sibling reorder + cross-parent)
  function performDrop(target: DropTarget) {
    const item    = dragItemRef.current!;
    const isEdit  = editModeRef.current;
    const source  = isEdit ? editItemsRef.current : liveItemsRef.current;
    const { tree, removed } = removeFromTree(JSON.parse(JSON.stringify(source)), item.itemId);
    if (!removed) return;

    let newTree: RefItem[];
    if (target.type === 'inside') {
      newTree = insertInsideAsLastChild(tree, target.itemId, removed);
      setExpanded(p => new Set([...p, target.itemId]));
    } else if (target.type === 'before') {
      newTree = insertBefore(tree, target.itemId, removed);
    } else {
      newTree = insertAfter(tree, target.itemId, removed);
    }

    if (isEdit) setEditItems(newTree); else saveTabItems(newTree);
  }

  function onHandleMouseDown(e: React.MouseEvent, item: DragItem) {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startY = e.clientY;
    let started = false;

    const onMove = (me: MouseEvent) => {
      if (!started) {
        if (Math.hypot(me.clientX - startX, me.clientY - startY) < 5) return;
        started = true;
        setIsDragging(true);
        setDraggingId(item.itemId);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPreviewPos({ x: me.clientX, y: me.clientY });
        const t = findDropTarget(me.clientX, me.clientY, item.itemId);
        dropTargetRef.current = t;
        setDropTarget(t);
      });
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (started && dropTargetRef.current) performDrop(dropTargetRef.current);
      dragItemRef.current = null; dropTargetRef.current = null;
      setIsDragging(false); setDraggingId(null); setDropTarget(null);
    };

    dragItemRef.current = item;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function rowIndicator(itemId: string): React.CSSProperties {
    if (!dropTarget) return {};
    if (dropTarget.type === 'inside' && dropTarget.itemId === itemId) return { boxShadow: 'inset 0 0 0 2px #4D7CFE', background: '#EBF3FF' };
    if ((dropTarget.type === 'before' || dropTarget.type === 'after') && dropTarget.itemId === itemId) {
      return { boxShadow: dropTarget.type === 'before' ? 'inset 0 2px 0 0 #4D7CFE' : 'inset 0 -2px 0 0 #4D7CFE' };
    }
    return {};
  }

  // ── Filter / sort helpers
  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';

  function filterItems(items: RefItem[]): RefItem[] {
    if (!q) return items;
    return items.reduce<RefItem[]>((acc, item) => {
      const matches = item.code.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      const filteredChildren = filterItems(item.children);
      if (matches || filteredChildren.length > 0) acc.push({ ...item, children: filteredChildren });
      return acc;
    }, []);
  }

  function sortItems(items: RefItem[]): RefItem[] {
    if (!sortState) return items;
    const { key, dir } = sortState; const mul = dir === 'asc' ? 1 : -1;
    return [...items].sort((a, b) => a[key].localeCompare(b[key]) * mul).map(item => ({ ...item, children: sortItems(item.children) }));
  }

  const displayItems = editMode ? editItems : sortItems(filterItems(liveItems));
  const showClear = search.length > 0;
  const isFlatList = (activeTab.structureType ?? 'flat') === 'flat';

  // ── Recursive row renderer
  function renderItems(items: RefItem[], depth = 0, parentId: string | null = null): React.ReactNode {
    return items.map(item => {
      const isExp        = expanded.has(item.id);
      const hasChildren  = item.children.length > 0;
      const isDragSrc    = draggingId === item.id;
      const isHov        = !isDragging && hoveredId === item.id;
      const indent       = depth * INDENT;

      return (
        <div key={item.id} style={{ display: 'contents' }}>
          <div
            data-rd-id={item.id}
            data-rd-parent={parentId ?? 'ROOT'}
            data-rd-has-children={hasChildren ? 'true' : 'false'}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={!editMode && hasChildren ? () => toggleExpanded(item.id) : undefined}
            style={{
              display: 'flex', alignItems: 'stretch', height: ROW_H,
              background: isDragSrc ? '#F0F2F5' : isHov ? '#F9FAFB' : 'white',
              borderBottom: '1px solid #D9D9D9',
              opacity: isDragSrc ? 0.4 : 1,
              cursor: !editMode && hasChildren ? 'pointer' : 'default',
              transition: 'background 0.1s, opacity 0.15s',
              ...rowIndicator(item.id),
            }}
          >
            {/* Drag handle (edit only) */}
            {editMode && (
              <DragHandle onMouseDown={e => onHandleMouseDown(e, { itemId: item.id, parentId, label: item.code || item.name || 'Untitled' })} />
            )}

            {/* Code cell + Name cell — order depends on structure type */}
            {isFlatList ? (
              <>
                {/* FLAT: Name first */}
                <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                  {editMode ? (
                    <EditInput
                      value={item.name}
                      onChange={v => updItem(item.id, { name: v })}
                      placeholder="Name"
                      error={editErrors.has(`${item.id}_name`)}
                      errorMessage={editErrors.get(`${item.id}_name`)}
                    />
                  ) : (
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: depth === 0 ? 500 : 400, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(item.name, search)}
                    </span>
                  )}
                </div>
                {/* FLAT: Code second */}
                <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                  {editMode ? (
                    <EditInput
                      value={item.code}
                      onChange={v => updItem(item.id, { code: v })}
                      placeholder="Code"
                      error={editErrors.has(`${item.id}_code`)}
                      errorMessage={editErrors.get(`${item.id}_code`)}
                    />
                  ) : (
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: depth === 0 ? 600 : 400, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(item.code, search)}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* HIERARCHY: Code first (with chevron + indent) */}
                <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: (editMode ? 4 : 8) + indent, paddingRight: 8, gap: 4, overflow: 'hidden' }}>
                  <button
                    onClick={e => { e.stopPropagation(); if (hasChildren || editMode) toggleExpanded(item.id); }}
                    style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: (hasChildren || editMode) ? 'pointer' : 'default', opacity: (hasChildren || editMode) ? 1 : 0 }}
                  >
                    <ChevronIcon expanded={isExp} />
                  </button>
                  {editMode ? (
                    <EditInput
                      value={item.code}
                      onChange={v => updItem(item.id, { code: v })}
                      placeholder="Code"
                      error={editErrors.has(`${item.id}_code`)}
                      errorMessage={editErrors.get(`${item.id}_code`)}
                    />
                  ) : (
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: depth === 0 ? 600 : 400, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(item.code, search)}
                    </span>
                  )}
                </div>
                {/* HIERARCHY: Name second */}
                <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                  {editMode ? (
                    <EditInput
                      value={item.name}
                      onChange={v => updItem(item.id, { name: v })}
                      placeholder="Name"
                      error={editErrors.has(`${item.id}_name`)}
                      errorMessage={editErrors.get(`${item.id}_name`)}
                    />
                  ) : (
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: depth === 0 ? 500 : 400, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {highlightText(item.name, search)}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Description cell */}
            <div style={{ flex: 1, minWidth: COL_DESC_MIN, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: editMode ? 8 : 12, overflow: 'hidden' }}>
              {editMode ? (
                <EditInput value={item.description} onChange={v => updItem(item.id, { description: v })} placeholder="Note" />
              ) : (
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#616D79', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {highlightText(item.description, search)}
                </span>
              )}
            </div>

            {/* Actions (edit only) */}
            {editMode && (
              <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: '100%', paddingLeft: 8, paddingRight: 8 }}>
                {isFlatList
                  ? <div style={{ width: 32, flexShrink: 0 }} /> /* spacer replaces AddChild */
                  : <IconBtn onClick={() => addChild(item.id)} title="Add child item"><AddChildIcon /></IconBtn>
                }
                <IconBtn onClick={() => addSibling(item.id)} title="Add sibling item"><AddSiblingIcon /></IconBtn>
                <IconBtn onClick={() => delItem(item.id)} title="Delete item"><TrashIcon /></IconBtn>
              </div>
            )}
          </div>

          {/* Children */}
          {isExp && renderItems(item.children, depth + 1, item.id)}
        </div>
      );
    });
  }

  // Download sample / template
  function downloadTemplate() {
    downloadRefDataTemplate(activeTab.structureType ?? 'flat', activeTab.label, activeTab.id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden', userSelect: isDragging ? 'none' : undefined }}>

      {/* Create Reference Data Modal */}
      {createModalOpen && (
        <CreateRefDataModal
          onConfirm={(name, structureType) => addTab(name, structureType)}
          onClose={() => setCreateModalOpen(false)}
        />
      )}

      {/* Remove Reference Data Modal */}      {removeModalOpen && (
        <RemoveTabModal
          tabLabel={activeTab.label}
          onConfirm={removeActiveTab}
          onClose={() => setRemoveModalOpen(false)}
        />
      )}

      {/* Import Reference Data Modal */}
      <ImportRefDataModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        tabLabel={activeTab.label}
        tabId={activeTab.id}
        structureType={activeTab.structureType ?? 'flat'}
        onImport={(importedItems) => {
          setTabs(prev => prev.map(t =>
            t.id === activeTabId
              ? { ...t, items: importedItems as RefItem[] }
              : t
          ));
          setImportModalOpen(false);
        }}
      />

      {/* Export Reference Data Modal */}
      <ExportRefDataModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        tabLabel={activeTab.label}
        structureType={activeTab.structureType ?? 'flat'}
        items={activeTab.items as RefItem[]}
        flatGroups={flatTabsData[activeTab.id] ?? []}
        groupLabel={activeTab.id === 'phases' ? 'Phase' : activeTab.label}
        itemLabel={activeTab.id === 'phases' ? 'Sub-phase' : 'Item'}
      />

      {/* Delete Row Warning Modal */}
      {deleteRowWarning && (
        <DeleteRowWarningModal
          item={deleteRowWarning.item}
          tabLabel={activeTab.label}
          onConfirm={confirmDelItem}
          onCancel={() => setDeleteRowWarning(null)}
        />
      )}

      {/* Drag preview */}
      {isDragging && dragItemRef.current && (
        <DragPreview x={previewPos.x} y={previewPos.y} item={dragItemRef.current} />
      )}

      {/* ── Tab Bar ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, flexShrink: 0, paddingTop: 8 }}>
        {tabs.map(tab => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            editMode={editMode}
            isRenaming={renamingTabId === tab.id}
            onActivate={() => { setActiveTabId(tab.id); setSearch(''); setSortState(null); setExpanded(INITIAL_EXPANDED); }}
            onStartRename={() => { setActiveTabId(tab.id); setRenamingTabId(tab.id); }}
            onCommitRename={name => renameTab(tab.id, name)}
            onCancelRename={() => setRenamingTabId(null)}
          />
        ))}

        {/* Add tab — HIDDEN (keep code, not shown in UI) */}
        <button
          onClick={() => !editMode && setCreateModalOpen(true)}
          title="Create new reference data"
          style={{ height: 44, width: 48, background: '#FAFAFA', border: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', borderRadius: '4px 4px 0 0', cursor: editMode ? 'default' : 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: editMode ? 0.4 : 1 }}
        >
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <path d="M0 11H22" stroke="#FF4D00" strokeWidth="2" />
            <path d={P_PLUS_VERTICAL} stroke="#FF4D00" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* ── Table Container ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, border: '1px solid #D9D9D9', borderRadius: '0 8px 8px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, background: 'white' }}>

        {/* ── Toolbar ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Search */}
            {!editMode && (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 240, flexShrink: 0 }}>
                <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><SearchIcon /></div>
                <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                  onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')}
                />
                {showClear && (
                  <button onClick={() => setSearch('')} onMouseEnter={() => setClearHov(true)} onMouseLeave={() => setClearHov(false)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHov ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                )}
              </div>
            )}
            {/* Add [groupLabel] button in edit mode for flat tabs — mirrors "+ Add Discipline" in Discipline & Trade */}
            {editMode && activeTab.structureType === 'flat' && (
              <>
                <SecondaryBtn onClick={() => flatRef.current?.addGroup()}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span>Add {activeTab.id === 'phases' ? 'Phase' : activeTab.label}</span>
                </SecondaryBtn>
                <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
              </>
            )}
            {/* Group by toggle — only for flat tabs in view mode */}
            {!editMode && activeTab.structureType === 'flat' && (
              <>
                <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0, marginLeft: 4 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer', marginLeft: 4 }}
                  onClick={() => { setFlatGrouped(v => !v); flatRef.current?.expandAll(); }}>
                  <div style={{ width: 40, height: 20, borderRadius: 10, background: flatGrouped ? '#243746' : '#D9D9D9', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                    <div style={{ position: 'absolute', top: 2, left: flatGrouped ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
                  </div>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: '#384857', whiteSpace: 'nowrap', userSelect: 'none' }}>
                    Group by {activeTab.id === 'phases' ? 'Phase' : activeTab.label}
                  </span>
                </div>
                <div style={{ width: 1, height: 24, background: '#D9D9D9', flexShrink: 0 }} />
              </>
            )}
            <ToolbarBtn onClick={() => activeTab.structureType === 'flat' ? flatRef.current?.expandAll() : expandAll()} disabled={activeTab.structureType === 'flat' && !flatGrouped && !editMode}>
              <svg width="13" height="13" viewBox="0 0 14 8" fill="none"><path d={svgPaths.p3c147800} fill="#384857" /></svg>
              <span>Expand All</span>
            </ToolbarBtn>
            <ToolbarBtn onClick={() => activeTab.structureType === 'flat' ? flatRef.current?.collapseAll() : collapseAll()} disabled={activeTab.structureType === 'flat' && !flatGrouped && !editMode}>
              <svg width="13" height="13" viewBox="0 0 14 8" fill="none"><path d={svgPaths.pb96b700} fill="#616D79" /></svg>
              <span>Collapse All</span>
            </ToolbarBtn>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {editMode && activeTab.structureType === 'flat' ? (
              <>
                <RestoreDefaultBtn onClick={() => setRestoreDefaultOpen(true)} />
                <CancelBtn onClick={() => {
                  if (activeTab.structureType === 'flat') { flatRef.current?.cancelEdit(); }
                  cancelEdit();
                }} />
                <SecondaryBtn onClick={() => setImportModalOpen(true)}><ImportIcon /><span>Import</span></SecondaryBtn>
                <SaveBtn onClick={() => {
                  if (activeTab.structureType === 'flat') { flatRef.current?.saveEdit(); return; }
                  saveEdit();
                }} disabled={showErrors && allErrors.size > 0} />
              </>
            ) : (
              <>
                <button onClick={downloadTemplate} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#1890FF', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                  Download Import Template
                </button>
                {activeTab.structureType === 'hierarchy' && (
                  <SecondaryBtn onClick={() => setImportModalOpen(true)}><ImportIcon /><span>Import</span></SecondaryBtn>
                )}
                <SecondaryBtn onClick={() => setExportModalOpen(true)}><ExportIcon /><span>Export</span></SecondaryBtn>
                {activeTab.structureType !== 'hierarchy' && (
                  <PrimaryEditBtn onClick={() => {
                    if (activeTab.structureType === 'flat') { flatRef.current?.startEdit(); }
                    enterEditMode();
                  }} />
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Validation banner ─────────────────────────────────────────────── */}
        {editMode && showErrors && allErrors.size > 0 && <ValidationBanner count={allErrors.size} />}

        {/* ── FLAT TAB: render FlatRefTable ─────────────────────────────────── */}
        {activeTab.structureType === 'flat' ? (
          <FlatRefTable
            ref={flatRef}
            key={activeTab.id}
            initialData={flatTabsData[activeTab.id] ?? refItemsToFlatGroups(activeTab.items)}
            groupLabel={activeTab.id === 'phases' ? 'Phase' : activeTab.label}
            itemLabel={activeTab.id === 'phases' ? 'Sub-phase' : 'Item'}
            groupPillBg="#EFF8FF"
            groupPillColor="#175CD3"
            search={search}
            grouped={flatGrouped}
            editMode={editMode}
            onDataChange={data => setFlatTabsData(p => ({ ...p, [activeTab.id]: data }))}
            onEditSave={data => { setFlatTabsData(p => ({ ...p, [activeTab.id]: data })); setEditMode(false); }}
            onEditCancel={() => setEditMode(false)}
          />
        ) : (
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <div style={{ minWidth: (editMode ? 24 : 0) + colWidths.code + colWidths.name + COL_DESC_MIN + (editMode ? COL_ACTIONS : 0) }}>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
              {editMode && <div style={{ width: 24, flexShrink: 0, background: '#FAFAFA' }} />}
              {isFlatList ? (
                <>
                  <RefHeaderCell label="Title" sortKey="name" sortState={sortState} onSort={() => handleSort('name')} style={{ width: colWidths.name }} editMode={editMode} colKey="name" onDelta={onColDelta} showResize />
                  <RefHeaderCell label="Code" sortKey="code" sortState={sortState} onSort={() => handleSort('code')} style={{ width: colWidths.code }} editMode={editMode} colKey="code" onDelta={onColDelta} showResize />
                </>
              ) : (
                <>
                  <RefHeaderCell label="Code" sortKey="code" sortState={sortState} onSort={() => handleSort('code')} style={{ width: colWidths.code }} editMode={editMode} colKey="code" onDelta={onColDelta} showResize />
                  <RefHeaderCell label="Title" sortKey="name" sortState={sortState} onSort={() => handleSort('name')} style={{ width: colWidths.name }} editMode={editMode} colKey="name" onDelta={onColDelta} showResize />
                </>
              )}
              <RefHeaderCell label={`Note`} sortKey="description" sortState={sortState} onSort={() => handleSort('description')} style={{ flex: 1, minWidth: COL_DESC_MIN }} editMode={editMode} />
              {editMode && (
                <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', paddingLeft: 4 }}>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Actions</span>
                </div>
              )}
            </div>

            {/* Rows */}
            {renderItems(displayItems)}

            {/* Empty state */}
            {displayItems.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 160, gap: 8 }}>
                {editMode ? (
                  <button
                    onClick={() => {
                      const newId = uid();
                      setEditItems(p => [...p, { id: newId, code: '', name: '', description: '', children: [] }]);
                    }}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect width="40" height="40" rx="8" fill="#F5F5F5" />
                      <path d="M20 13v14M13 20h14" stroke="#BFBFBF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>Click + to add the first row.</span>
                  </button>
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect width="40" height="40" rx="8" fill="#F5F5F5" />
                      <path d="M20 13v14M13 20h14" stroke="#BFBFBF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                      {search ? 'No items match your search.' : 'No items yet. Click Edit to add.'}
                    </span>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
        )} {/* end hierarchy tab */}
      </div>
    </div>
  );
}