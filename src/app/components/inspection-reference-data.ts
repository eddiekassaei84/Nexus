/**
 * Inspection Settings → Reference Data
 * Seed data for the Inspection module's reference data tables.
 * Passed as `initialTabs` + `initialExpanded` props into the shared ReferenceDataTable component.
 */

// ─── Shared item factory (mirrors the one in reference-data-table.tsx) ─────────
interface RefItem {
  id: string; code: string; name: string; description: string; children: RefItem[];
}
interface RefTab {
  id: string; label: string; items: RefItem[]; builtIn: boolean; structureType?: 'flat' | 'hierarchy';
}

function mk(id: string, code: string, name: string, description: string, children: RefItem[] = []): RefItem {
  return { id, code, name, description, children };
}

// ─── Inspection Type ───────────────────────────────────────────────────────────
const INSP_TYPE_ITEMS: RefItem[] = [
  mk('it-safety',     'SAFETY',   'Safety',                     'HSE and site safety inspections'),
  mk('it-quality',    'QUALITY',  'Quality',                    'Workmanship and material quality checks'),
  mk('it-structural', 'STRUCT',   'Structural',                 'Structural integrity and connections'),
  mk('it-mep',        'MEP',      'MEP',                        'Mechanical, electrical, and plumbing'),
  mk('it-fire',       'FIRE',     'Fire & Life Safety',         'Fire suppression, egress, and alarms'),
  mk('it-envelope',   'ENVLP',    'Building Envelope',          'Facade, roofing, and waterproofing'),
  mk('it-civil',      'CIVIL',    'Civil & Sitework',           'Earthworks, paving, and utilities'),
  mk('it-env',        'ENV',      'Environmental',              'Environmental compliance and monitoring'),
  mk('it-commissioning', 'COMM',  'Commissioning',              'System commissioning and start-up'),
  mk('it-closeout',   'CLOSE',    'Closeout',                   'Pre-handover and punch-list inspections'),
];

// ─── Priority ─────────────────────────────────────────────────────────────────
const PRIORITY_ITEMS: RefItem[] = [
  mk('p-critical', 'CRIT',   'Critical',    'Immediate action required — work stoppage risk'),
  mk('p-high',     'HIGH',   'High',        'Must be resolved within 24 hours'),
  mk('p-medium',   'MED',    'Medium',      'Must be resolved within 7 days'),
  mk('p-low',      'LOW',    'Low',         'Non-urgent — schedule for next inspection cycle'),
  mk('p-info',     'INFO',   'Informational','For record only — no corrective action required'),
];

// ─── Checklist Category ────────────────────────────────────────────────────────
const CHECKLIST_CAT_ITEMS: RefItem[] = [
  mk('cc-general',    'GEN',   'General',          'General site and administrative checks'),
  mk('cc-structural', 'STR',   'Structural',       'Structural works including concrete and steel'),
  mk('cc-mep',        'MEP',   'MEP',              'Mechanical, electrical, and plumbing checks'),
  mk('cc-arch',       'ARCH',  'Architectural',    'Finishes, fitout, and envelope checks'),
  mk('cc-safety',     'SAFE',  'Safety & HSE',     'Health, safety, and environment items'),
  mk('cc-env',        'ENV',   'Environmental',    'Environmental monitoring and compliance'),
  mk('cc-quality',    'QA',    'Quality Assurance','Hold points and ITP witness requirements'),
];

// ─── Observation Category (hierarchy) ─────────────────────────────────────────
const OBS_CAT_ITEMS: RefItem[] = [
  mk('oc-nonconformance', 'NCR', 'Non-Conformance', 'Work not meeting specification or drawing intent', [
    mk('oc-ncr-workmanship', 'NCR-WK', 'Poor Workmanship',    'Defective installation or fabrication'),
    mk('oc-ncr-material',    'NCR-MT', 'Wrong Material',      'Material does not match specification'),
    mk('oc-ncr-dims',        'NCR-DM', 'Dimension Deviation', 'Dimensions outside tolerance'),
    mk('oc-ncr-missing',     'NCR-MS', 'Missing Element',     'Required item omitted from installation'),
  ]),
  mk('oc-safety', 'SAFE', 'Safety Hazard', 'Conditions presenting risk of injury or harm', [
    mk('oc-safe-fall',    'SAFE-FL', 'Fall Hazard',     'Unguarded edges, openings, or elevated work'),
    mk('oc-safe-struck',  'SAFE-SB', 'Struck-By Hazard','Overhead work, unsecured materials'),
    mk('oc-safe-ppe',     'SAFE-PP', 'PPE Non-Compliance','Personal protective equipment not worn'),
    mk('oc-safe-elec',    'SAFE-EL', 'Electrical Hazard','Exposed conductors or unsafe temporary power'),
  ]),
  mk('oc-rfi',       'RFI',   'Request for Information', 'Clarification required before proceeding'),
  mk('oc-positive',  'POS',   'Positive Observation',    'Commendable practice or exemplary work'),
  mk('oc-env',       'ENV',   'Environmental',           'Environmental non-compliance or near miss'),
];

// ─── Corrective Action Status ──────────────────────────────────────────────────
const CA_STATUS_ITEMS: RefItem[] = [
  mk('ca-open',       'OPEN',   'Open',             'Corrective action raised, not yet started'),
  mk('ca-in-prog',    'INPROG', 'In Progress',       'Corrective action underway'),
  mk('ca-pending',    'PNDVFY', 'Pending Verification', 'Contractor claims resolved — awaiting inspector verification'),
  mk('ca-closed',     'CLOSED', 'Closed',            'Verified and accepted by inspector'),
  mk('ca-voided',     'VOID',   'Voided',            'Raised in error or no longer applicable'),
  mk('ca-escalated',  'ESCL',   'Escalated',         'Passed to project manager or authority'),
];

// ─── Assembled tabs ────────────────────────────────────────────────────────────
export const INSPECTION_REF_DATA_TABS: RefTab[] = [
  { id: 'insp-type',    label: 'Inspection Type',       items: INSP_TYPE_ITEMS,    builtIn: true, structureType: 'flat'      },
  { id: 'priority',     label: 'Priority',              items: PRIORITY_ITEMS,     builtIn: true, structureType: 'flat'      },
  { id: 'checklist-cat',label: 'Checklist Category',    items: CHECKLIST_CAT_ITEMS,builtIn: true, structureType: 'flat'      },
  { id: 'obs-cat',      label: 'Observation Category',  items: OBS_CAT_ITEMS,      builtIn: true, structureType: 'hierarchy' },
  { id: 'ca-status',    label: 'Corrective Action Status', items: CA_STATUS_ITEMS,  builtIn: true, structureType: 'flat'      },
];

export const INSPECTION_REF_DATA_EXPANDED = new Set(['oc-nonconformance', 'oc-safety']);
