import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { INITIAL_DATA as PROJECT_INFO } from './general-information';
import trashPaths   from '../../imports/svg-fjqvq36uqo';
import siblingPaths from '../../imports/svg-dwr8dix3rb';
import childPaths   from '../../imports/svg-p3h938sv9m';
import chevronDownPaths  from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';
import svgPaths from '../../imports/svg-hvnufn483u';
import { parseElevation as parseElevationNew, formatFtIn as formatFtInNew } from './elevation-input';
import primaryLbsPaths from '../../imports/svg-7c6r5p5mpm';
import nodeAddPaths from '../../imports/svg-05y9lboq8f';
import lbsToolbarPaths from '../../imports/svg-89i8y7hcrh';
import vsInfoIconPaths from '../../imports/svg-j0c6euxmns';
import vsWarnPaths from '../../imports/svg-eecwam5vcx';
import checkboxCheckedPaths from '../../imports/svg-ykz1la4da4';
import buildingIconPaths from '../../imports/svg-e8zbubrltf';
import exclPaths from '../../imports/svg-9duqae3uak';

// ─── Types ─────────────────────────────────────────────────────────────────────
const SHOW_LBS_TAB_CREATION = false;
const SHOW_LBS_IMPORT_EXPORT = false;

const LBS_TYPES = ['Zone Structure', 'Work Zones', 'Trade Zones', 'Logistics Zones', 'Phasing'] as const;
type LBSType = typeof LBS_TYPES[number];

interface LBSItem {
  id: string;
  name: string;        // col 1 — Location Name
  code: string;        // col 2 — Location Code (node segment)
  // col 3 — Full Code is computed (root-to-node path), not stored
  type: string;        // col 4 — Type (Site / Building / Floor / Zone…)
  elevation: string;   // col 5 — Elevation in ft-in format e.g. 13'-9"
  description: string; // kept for search
  vs: VSConfig | null; // Vertical Segmentation config (null = not configured)
  children: LBSItem[];
}

interface LBSTab {
  id: string;
  label: string;
  items: LBSItem[];
  builtIn: boolean;
  type: LBSType;
}

type SortKey = 'name' | 'code' | 'type' | 'elevation';
type SortDir = 'asc' | 'desc';
interface SortState { key: SortKey; dir: SortDir; }

// ─── Vertical Segmentation types ──────────────────────────────────────────────
type VSMode = 'unified' | 'local' | 'inherited';
type VSSegmentKey = 'ceiling' | 'occupied' | 'floor';
interface VSSegment { enabled: boolean; mode: VSMode; height: string; } // height stored as ft-in
interface VSConfig {
  enabled:  boolean;
  ceiling:  VSSegment;
  occupied: VSSegment;
  floor:    VSSegment;
}
function defaultVSConfig(): VSConfig {
  return {
    enabled:  false,
    ceiling:  { enabled: true, mode: 'local', height: '' },
    occupied: { enabled: true, mode: 'local', height: '' },
    floor:    { enabled: false, mode: 'local', height: '' },
  };
}
const VS_SEG_LABELS: Record<VSSegmentKey, { full: string; abbr: string }> = {
  ceiling:  { full: 'Ceiling Plenum', abbr: 'C' },
  occupied: { full: 'Occupied Space', abbr: 'O' },
  floor:    { full: 'Floor Plenum',   abbr: 'F' },
};
const VS_SEGMENT_KEYS: VSSegmentKey[] = ['ceiling', 'occupied', 'floor'];
function vsCompact(vs: VSConfig | null | undefined): string {
  if (!vs?.enabled) return '';
  const parts: string[] = [];
  const PLENUM_KEYS: { key: VSSegmentKey; abbr: string }[] = [
    { key: 'ceiling', abbr: 'C' },
    { key: 'floor',   abbr: 'F' },
  ];
  PLENUM_KEYS.forEach(({ key, abbr }) => {
    const seg = vs[key];
    if (!seg.enabled || !seg.height) return;
    const parsed = parseElevationNew(seg.height);
    if (parsed !== null && Math.abs(parsed) > 0) parts.push(abbr);
  });
  return parts.join(', ');
}
function applyParentLocks(draft: VSConfig, parentVS: VSConfig | null): VSConfig {
  if (!parentVS?.enabled) return draft;
  const patched = { ...draft };
  VS_SEGMENT_KEYS.forEach(k => {
    if (parentVS[k].enabled && parentVS[k].mode === 'unified') {
      patched[k] = { ...patched[k], mode: 'inherited' };
    }
  });
  return patched;
}

/**
 * Returns the total plenum inches consumed by an enabled VSConfig.
 * Rule: only ceiling and floor plenums subtract from the available height passed to
 * descendants. The parent's occupied-space height defines what children inherit —
 * it is NOT subtracted separately (it equals floorInches − plenums when balanced).
 */
function vsConsumedInches(vs: VSConfig | null | undefined): number {
  if (!vs?.enabled) return 0;
  const PLENUM_KEYS: VSSegmentKey[] = ['ceiling', 'floor'];
  let sum = 0;
  PLENUM_KEYS.forEach(k => {
    if (vs[k].enabled && vs[k].height) {
      const feet = parseElevationNew(vs[k].height);
      if (feet !== null) sum += Math.round(Math.abs(feet) * 12);
    }
  });
  return sum;
}

// ─── VS downstream conflict helpers ───────────────────────────────────────────

/**
 * Walk only the descendants of `changedItemId` to find nodes whose VS plenums
 * would exceed the effective available height after `newVS` is applied.
 */
function findConflictedDescendants(
  items: LBSItem[],
  changedItemId: string,
  newVS: VSConfig,
  sortedLevels: { id: string; inches: number }[]
): string[] {
  const conflicted: string[] = [];
  function getNextLvlIn(lvlIn: number) { return sortedLevels.find(l => l.inches > lvlIn)?.inches ?? null; }

  function walkChildren(nodes: LBSItem[], lvlIn: number | null, cum: number) {
    for (const node of nodes) {
      const isLvl   = isLevelType(node.type);
      const nElev   = isLvl && node.elevation ? parseFtIn(node.elevation) : NaN;
      const thisLvl = isLvl ? (isNaN(nElev) ? null : nElev) : lvlIn;
      if (node.vs?.enabled && vsConsumedInches(node.vs) > 0 && thisLvl !== null) {
        const nextIn = getNextLvlIn(thisLvl);
        if (nextIn !== null && vsConsumedInches(node.vs) > Math.max(0, nextIn - thisLvl - cum))
          conflicted.push(node.id);
      }
      walkChildren(node.children, thisLvl, cum + vsConsumedInches(node.vs));
    }
  }

  function findAndWalk(nodes: LBSItem[], lvlIn: number | null, cum: number): boolean {
    for (const node of nodes) {
      const isLvl   = isLevelType(node.type);
      const nElev   = isLvl && node.elevation ? parseFtIn(node.elevation) : NaN;
      const thisLvl = isLvl ? (isNaN(nElev) ? null : nElev) : lvlIn;
      if (node.id === changedItemId) {
        walkChildren(node.children, thisLvl, cum + vsConsumedInches(newVS));
        return true;
      }
      if (findAndWalk(node.children, thisLvl, cum + vsConsumedInches(node.vs))) return true;
    }
    return false;
  }

  findAndWalk(items, null, 0);
  return conflicted;
}

/**
 * Returns IDs of ALL descendants of `changedItemId` that already have VS enabled.
 * Used as the trigger when ENABLING parent VS — at that moment the parent has no
 * plenum values yet (consumed = 0), so no mathematical conflict exists, but children
 * are still impacted because the parent will eventually consume available height.
 */
function findDescendantsWithVS(items: LBSItem[], changedItemId: string): string[] {
  const result: string[] = [];
  function walkChildren(nodes: LBSItem[]) {
    for (const node of nodes) {
      if (node.vs?.enabled) result.push(node.id);
      walkChildren(node.children);
    }
  }
  function findAndWalk(nodes: LBSItem[]): boolean {
    for (const node of nodes) {
      if (node.id === changedItemId) { walkChildren(node.children); return true; }
      if (findAndWalk(node.children)) return true;
    }
    return false;
  }
  findAndWalk(items);
  return result;
}

/** Find a single item anywhere in the tree. Returns null if not found. */
function findLBSItem(items: LBSItem[], id: string): LBSItem | null {
  for (const it of items) {
    if (it.id === id) return it;
    const found = findLBSItem(it.children, id);
    if (found) return found;
  }
  return null;
}

/** Reactively find all nodes whose VS plenums exceed their effective available height. */
function computeAllVSConflicts(
  items: LBSItem[],
  sortedLevels: { id: string; inches: number }[]
): Set<string> {
  const result = new Set<string>();
  function getNextLvlIn(lvlIn: number) { return sortedLevels.find(l => l.inches > lvlIn)?.inches ?? null; }
  function walk(nodes: LBSItem[], lvlIn: number | null, cum: number) {
    for (const node of nodes) {
      const isLvl   = isLevelType(node.type);
      const nElev   = isLvl && node.elevation ? parseFtIn(node.elevation) : NaN;
      const thisLvl = isLvl ? (isNaN(nElev) ? null : nElev) : lvlIn;
      if (node.vs?.enabled && vsConsumedInches(node.vs) > 0 && thisLvl !== null) {
        const nextIn = getNextLvlIn(thisLvl);
        if (nextIn !== null && vsConsumedInches(node.vs) > Math.max(0, nextIn - thisLvl - cum))
          result.add(node.id);
      }
      walk(node.children, thisLvl, cum + vsConsumedInches(node.vs));
    }
  }
  walk(items, null, 0);
  return result;
}

/**
 * Apply `newVS` to `changedItemId` and proportionally scale down any descendant
 * VS configs whose plenums exceed the new effective available height.
 */
function autoAdjustDescendantVS(
  items: LBSItem[],
  changedItemId: string,
  newVS: VSConfig,
  sortedLevels: { id: string; inches: number }[]
): LBSItem[] {
  function getNextLvlIn(lvlIn: number) { return sortedLevels.find(l => l.inches > lvlIn)?.inches ?? null; }

  function walk(nodes: LBSItem[], lvlIn: number | null, cum: number, insideChanged: boolean): LBSItem[] {
    return nodes.map(node => {
      const isLvl    = isLevelType(node.type);
      const nElev    = isLvl && node.elevation ? parseFtIn(node.elevation) : NaN;
      const thisLvl  = isLvl ? (isNaN(nElev) ? null : nElev) : lvlIn;
      const isTarget = node.id === changedItemId;
      let result: LBSItem = isTarget ? { ...node, vs: newVS } : { ...node };

      if (insideChanged && !isTarget && node.vs?.enabled && thisLvl !== null) {
        const nextIn = getNextLvlIn(thisLvl);
        if (nextIn !== null) {
          const avail    = Math.max(0, nextIn - thisLvl - cum);
          const consumed = vsConsumedInches(node.vs);
          if (consumed > avail) {
            const ceilIn  = node.vs.ceiling.enabled && node.vs.ceiling.height
              ? Math.round(Math.abs(parseElevationNew(node.vs.ceiling.height) ?? 0) * 12) : 0;
            const flrIn   = node.vs.floor.enabled && node.vs.floor.height
              ? Math.round(Math.abs(parseElevationNew(node.vs.floor.height)   ?? 0) * 12) : 0;
            const totalIn = ceilIn + flrIn;
            if (totalIn > 0) {
              const ratio    = avail / totalIn;
              const nCeilIn  = Math.floor(ceilIn * ratio);
              const nFlrIn   = Math.floor(flrIn  * ratio);
              const nOccIn   = Math.max(0, avail - nCeilIn - nFlrIn);
              result = {
                ...result, vs: {
                  ...node.vs,
                  ceiling:  { ...node.vs.ceiling,  height: node.vs.ceiling.enabled  ? feetToFtIn(nCeilIn / 12) : '' },
                  floor:    { ...node.vs.floor,    height: node.vs.floor.enabled    ? feetToFtIn(nFlrIn  / 12) : '' },
                  occupied: { ...node.vs.occupied, height: nOccIn > 0 ? feetToFtIn(nOccIn / 12) : '' },
                },
              };
            } else {
              result = {
                ...result, vs: {
                  ...node.vs,
                  ceiling:  { ...node.vs.ceiling,  height: '' },
                  floor:    { ...node.vs.floor,    height: '' },
                  occupied: { ...node.vs.occupied, height: avail > 0 ? feetToFtIn(avail / 12) : '' },
                },
              };
            }
          }
        }
      }

      const nextCum = cum + vsConsumedInches(result.vs);
      return { ...result, children: walk(node.children, thisLvl, nextCum, insideChanged || isTarget) };
    });
  }

  return walk(items, null, 0, false);
}

// ─────────────────────────────────────────────────────────────────────────────
type DragItem   = { itemId: string; parentId: string | null; label: string; levelGroupId: string; };
type DropTarget =
  | { type: 'before'; itemId: string; parentId: string | null }
  | { type: 'after';  itemId: string; parentId: string | null }
  | { type: 'inside'; itemId: string };

// ─── ID generator ──────────────────────────────────────────────────────────────
let _uid = 0;
function uid() { return `lbs_${Date.now()}_${++_uid}`; }

// ─── Tree utilities ────────────────────────────────────────────────────────────
function removeFromTree(items: LBSItem[], id: string): { tree: LBSItem[]; removed: LBSItem | null } {
  let removed: LBSItem | null = null;
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
function insertBefore(items: LBSItem[], targetId: string, newItem: LBSItem): LBSItem[] {
  const result: LBSItem[] = [];
  for (const item of items) {
    if (item.id === targetId) result.push(newItem);
    result.push({ ...item, children: insertBefore(item.children, targetId, newItem) });
  }
  return result;
}
function insertAfter(items: LBSItem[], targetId: string, newItem: LBSItem): LBSItem[] {
  const result: LBSItem[] = [];
  for (const item of items) {
    result.push({ ...item, children: insertAfter(item.children, targetId, newItem) });
    if (item.id === targetId) result.push(newItem);
  }
  return result;
}
function insertInsideAsLastChild(items: LBSItem[], parentId: string, newItem: LBSItem): LBSItem[] {
  return items.map(item => {
    if (item.id === parentId) return { ...item, children: [...item.children, newItem] };
    return { ...item, children: insertInsideAsLastChild(item.children, parentId, newItem) };
  });
}
function updateItem(items: LBSItem[], id: string, patch: Partial<Pick<LBSItem, 'name'|'code'|'type'|'elevation'|'description'|'vs'>>): LBSItem[] {
  return items.map(item => {
    if (item.id === id) return { ...item, ...patch };
    return { ...item, children: updateItem(item.children, id, patch) };
  });
}
function newEmptyItem(): LBSItem {
  return { id: uid(), name: '', code: '', type: '', elevation: '', description: '', vs: null, children: [] };
}
function addChildToItem(items: LBSItem[], parentId: string, newChild: LBSItem): LBSItem[] {
  return items.map(item => {
    if (item.id === parentId) return { ...item, children: [...item.children, newChild] };
    return { ...item, children: addChildToItem(item.children, parentId, newChild) };
  });
}
function collectAllIds(items: LBSItem[]): string[] {
  const ids: string[] = [];
  function walk(arr: LBSItem[]) { arr.forEach(i => { ids.push(i.id); walk(i.children); }); }
  walk(items);
  return ids;
}
/**
 * Parse any elevation string → total inches (for sorting/validation).
 * Uses the shared parseElevation() engine — accepts all formats.
 */
function parseFtIn(s: string): number {
  const feet = parseElevationNew(s.trim());
  if (feet === null) return NaN;
  return feet * 12; // total inches
}

/**
 * Convert decimal feet → canonical ft-in display string "X' - Y\"".
 * Uses the shared formatFtIn() engine.
 */
function feetToFtIn(feet: number): string {
  if (!isFinite(feet)) return '';
  return formatFtInNew(feet, 8); // 1/8" precision
}

/** Convert a stored ft-in string back to a plain decimal-feet string for input display. */
function ftInToDecimalStr(s: string): string {
  if (!s.trim()) return '';
  const feet = parseElevationNew(s.trim());
  if (feet === null) return '';
  return parseFloat(feet.toFixed(6)).toString();
}

function isLevelType(type: string)    { return type.trim().toLowerCase() === 'level'; }
function isBuildingType(type: string) { return type.trim().toLowerCase() === 'building'; }

/** Collect all Level items with valid elevations, sorted ascending by elevation (in inches). */
function collectLevels(items: LBSItem[]): { id: string; elevation: string; inches: number }[] {
  const out: { id: string; elevation: string; inches: number }[] = [];
  function walk(arr: LBSItem[]) {
    for (const it of arr) {
      if (isLevelType(it.type) && it.elevation.trim()) {
        const inches = parseFtIn(it.elevation.trim());
        if (!isNaN(inches)) out.push({ id: it.id, elevation: it.elevation, inches });
      }
      walk(it.children);
    }
  }
  walk(items);
  out.sort((a, b) => a.inches - b.inches);
  return out;
}

// Sync every non-Level item's stored elevation to its computed ancestor value before saving
function propagateElevations(items: LBSItem[], ancestorLevelElev: string | null = null): LBSItem[] {
  return items.map(item => {
    const own  = isLevelType(item.type);
    const elev = own ? item.elevation : (ancestorLevelElev ?? '');
    const next = own ? item.elevation : ancestorLevelElev;
    return { ...item, elevation: elev, children: propagateElevations(item.children, next) };
  });
}

function validateItems(items: LBSItem[], errors = new Map<string, string>(), sep = '.'): Map<string, string> {
  const fullCodeOwners = new Map<string, { id: string; fullCode: string }[]>();

  function recordFullCode(item: LBSItem, fullCode: string) {
    const key = fullCode.trim().toLowerCase();
    if (!key) return;
    fullCodeOwners.set(key, [...(fullCodeOwners.get(key) ?? []), { id: item.id, fullCode }]);
  }

  function walk(nodes: LBSItem[], prefix: string) {
    // ── Per-item checks ──────────────────────────────────────────────────────
    for (const item of nodes) {
      const fullCode = prefix ? `${prefix}${sep}${item.code}` : item.code;
      recordFullCode(item, fullCode);

      if (!item.name.trim()) errors.set(`${item.id}_name`, 'Name is required');
      // Location Code can repeat across different branches, but generated Full Code must remain unique.
      // Elevation must be a valid ft-in value (written by ElevationInput on blur)
      if (isLevelType(item.type) && item.elevation.trim() !== '' && isNaN(parseFtIn(item.elevation.trim()))) {
        errors.set(`${item.id}_elevation`, 'Elevation must be a number in feet (e.g. 14 or -14.25)');
      }
      walk(item.children, fullCode);
    }

    // ── Sibling Level ordering ───────────────────────────────────────────────
    // Among Level-typed siblings (in list order), each elevation must be >= the
    // previous Level's elevation. Items with empty or invalid elevations are
    // skipped and reset the chain so a single bad row doesn't cascade errors.
    let prevInches: number | null = null;
    let prevElevLabel = '';
    for (const item of nodes) {
      if (!isLevelType(item.type)) continue;
      const raw = item.elevation.trim();
      if (raw === '') { prevInches = null; prevElevLabel = ''; continue; } // empty -> reset chain
      const inches = parseFtIn(raw);
      if (isNaN(inches)) { prevInches = null; prevElevLabel = ''; continue; } // invalid format -> reset chain
      if (prevInches !== null && inches < prevInches) {
        // Only add the ordering error if no format error already exists
        if (!errors.has(`${item.id}_elevation`)) {
          const prevFt = parseFloat((prevInches / 12).toFixed(6)).toString();
          errors.set(`${item.id}_elevation`, `Elevation cannot be less than the previous Level (${prevFt} ft = ${prevElevLabel})`);
        }
        // Keep prevInches at the last valid anchor — don't advance past an out-of-order entry
      } else {
        prevInches = inches;
        prevElevLabel = raw;
      }
    }
  }

  walk(items, PROJECT_INFO.code || '');

  fullCodeOwners.forEach(owners => {
    if (owners.length <= 1) return;
    owners.forEach(({ id, fullCode }) => {
      errors.set(`${id}_code`, `Full Code "${fullCode}" is already used`);
    });
  });

  return errors;
}
function findDropTarget(x: number, y: number, dragId: string, levelGroupId: string): DropTarget | null {
  const els = document.elementsFromPoint(x, y);
  for (const el of els) {
    let rowEl: Element | null = el;
    while (rowEl && !rowEl.hasAttribute('data-lbs-id')) rowEl = rowEl.parentElement;
    if (!rowEl) continue;
    const id = rowEl.getAttribute('data-lbs-id')!;
    const rawParent = rowEl.getAttribute('data-lbs-parent');
    const parentId = (rawParent === 'ROOT' || !rawParent) ? null : rawParent;
    const hasChildren = rowEl.getAttribute('data-lbs-has-children') === 'true';
    const targetGroup = rowEl.getAttribute('data-lbs-level-group') ?? 'ROOT';
    if (id === dragId) return null;
    // Constrain drag to same level group (prevents cross-Level moves)
    if (targetGroup !== levelGroupId) continue;
    const rect = rowEl.getBoundingClientRect();
    const relY = y - rect.top;
    if (relY < rect.height * 0.25) return { type: 'before', itemId: id, parentId };
    if (hasChildren && relY > rect.height * 0.75) return { type: 'inside', itemId: id };
    return { type: 'after', itemId: id, parentId };
  }
  return null;
}

// ─── Seed data ─────────────────────────────────────────────────────────────────
function mk(id: string, name: string, code: string, type: string, elevation: string, description: string, children: LBSItem[] = []): LBSItem {
  return { id, name, code, type, elevation, description, vs: null, children };
}

// Site and Building levels removed — derived from Project Context (Show Project Context toggle).
// The editable LBS hierarchy now starts directly from Level (first project-defined tier).
// Cleveland Hospital — Primary LBS (Building → Levels → Spatial Breakdown)
const SITE_LBS_ITEMS_LEVELS: LBSItem[] = [
  // ── Basement 2 ─────────────────────────────────────────────────────────────
  mk('bld-b2', 'Basement 2', 'B2', 'Level', "-28'-6\"", 'Deep basement — structural works, drainage, and utility distribution', [
    mk('bld-b2-str',  'Structural Works',   'STR',  'Zone', "-28'-6\"", 'Raft slab, pile caps, and transfer beams'),
    mk('bld-b2-drn',  'Drainage & Sumps',   'DRN',  'Area', "-28'-6\"", 'Sump pits, drainage channels, and ejector pump wells'),
    mk('bld-b2-fuel', 'Fuel Storage',       'FUEL', 'Room', "-28'-6\"", 'Generator fuel tanks and secondary containment bunds'),
    mk('bld-b2-stg',  'Medical Storage',    'STG',  'Area', "-28'-6\"", 'Locked bulk storage for medical consumables and equipment'),
  ]),
  // ── Basement 1 ─────────────────────────────────────────────────────────────
  mk('bld-b1', 'Basement 1', 'B1', 'Level', "-14'-3\"", 'Below-grade parking, central plant, and hospital services', [
    mk('bld-b1-pkg',  'Staff Parking',      'PKG',  'Zone', "-14'-3\"", 'Staff and physician car parking — 180 bays'),
    mk('bld-b1-mech', 'Central Plant Room', 'MECH', 'Room', "-14'-3\"", 'Chillers, AHUs, boilers, and BMS control room'),
    mk('bld-b1-elec', 'Electrical Room',    'ELEC', 'Room', "-14'-3\"", 'Main switchboard, transformers, UPS, and generator'),
    mk('bld-b1-strl', 'Sterile Supply',     'STRL', 'Area', "-14'-3\"", 'Central sterile services department (CSSD)'),
    mk('bld-b1-lby',  'Service Corridor',   'SVC',  'Area', "-14'-3\"", 'Goods receival, waste management, and loading dock'),
  ]),
  // ── Level 1 (Ground) ───────────────────────────────────────────────────────
  mk('bld-l01', 'Level 1', 'L01', 'Level', "0'-0\"", 'Ground level — main entry, emergency department, and diagnostic imaging', [
    mk('bld-l01-ent', 'Main Entry & Lobby', 'ENT', 'Area', "0'-0\"", 'Public entry atrium, information desk, and wayfinding hub'),
    mk('bld-l01-ed',  'Emergency Dept',     'ED',  'Zone', "0'-0\"", 'Full emergency department including triage and resuscitation bays', [
      mk('bld-l01-ed-tri', 'Triage',            'TRI', 'Area', "0'-0\"", 'Walk-in triage and ambulance receival — 6 assessment bays', [
        mk('bld-l01-ed-tri-r1', 'Assessment Room 1', 'R1', 'Room', "0'-0\"", 'Primary assessment — acute presentations and ambulance handover', [
          mk('bld-l01-ed-tri-r1-s1', 'Waiting Bay',        'S1', 'Sub Room', "0'-0\"", 'Seated holding area adjacent to assessment room 1'),
          mk('bld-l01-ed-tri-r1-s2', 'Examination Cubicle','S2', 'Sub Room', "0'-0\"", 'Curtained examination cubicle with vitals monitoring point'),
        ]),
        mk('bld-l01-ed-tri-r2', 'Assessment Room 2', 'R2', 'Room', "0'-0\"", 'Secondary assessment — walk-in and minor injury presentations', [
          mk('bld-l01-ed-tri-r2-s1', 'Waiting Bay',        'S1', 'Sub Room', "0'-0\"", 'Seated holding area adjacent to assessment room 2'),
          mk('bld-l01-ed-tri-r2-s2', 'Nurse Station',      'S2', 'Sub Room', "0'-0\"", 'Triage nurse workstation with EMR terminal and drug storage'),
        ]),
        mk('bld-l01-ed-tri-r3', 'Isolation Room',   'R3', 'Room', "0'-0\"", 'Negative-pressure triage isolation for suspected infectious cases', [
          mk('bld-l01-ed-tri-r3-s1', 'Anteroom',           'S1', 'Sub Room', "0'-0\"", 'PPE donning/doffing anteroom with hand hygiene station'),
          mk('bld-l01-ed-tri-r3-s2', 'Patient Bay',        'S2', 'Sub Room', "0'-0\"", 'Single-bed isolation bay with negative-pressure ventilation'),
        ]),
      ]),
      mk('bld-l01-ed-res', 'Resuscitation',     'RES', 'Room', "0'-0\"", 'Four-bay resus room with crash cart and defibrillator access'),
      mk('bld-l01-ed-obs', 'Observation Ward',  'OBS', 'Area', "0'-0\"", 'Short-stay observation — 20 monitored beds'),
    ]),
    mk('bld-l01-img', 'Diagnostic Imaging',  'IMG', 'Zone', "0'-0\"", 'Radiology, CT, MRI, and fluoroscopy suites', [
      mk('bld-l01-img-xr', 'X-Ray Suite',   'XR', 'Room', "0'-0\"", 'Four digital X-ray rooms with lead-lined walls'),
      mk('bld-l01-img-ct', 'CT Suite',      'CT', 'Room', "0'-0\"", 'Dual 64-slice CT scanners with control and prep areas'),
      mk('bld-l01-img-mr', 'MRI Suite',     'MR', 'Room', "0'-0\"", '3T MRI scanner with RF-shielded bore room and console'),
    ]),
    mk('bld-l01-phr', 'Pharmacy',            'PHR', 'Room', "0'-0\"", 'Inpatient and outpatient dispensary with robotic dispensing unit'),
    mk('bld-l01-svc', 'Support Services',    'SVC', 'Zone', "0'-0\"", 'Electrical risers, comms rooms, and service corridors'),
  ]),
  // ── Level 2 ────────────────────────────────────────────────────────────────
  mk('bld-l02', 'Level 2', 'L02', 'Level', "14'-0\"", 'Surgical floor — operating theatres, recovery, and pre-op', [
    mk('bld-l02-or',  'Surgical Suite',     'OR',  'Zone', "14'-0\"", 'Eight operating theatres with laminar-flow HVAC', [
      mk('bld-l02-or-t1', 'Theatre 1 — General',    'T1', 'Room', "14'-0\"", 'General and laparoscopic surgery — 650 ft²'),
      mk('bld-l02-or-t2', 'Theatre 2 — General',    'T2', 'Room', "14'-0\"", 'General and laparoscopic surgery — 650 ft²'),
      mk('bld-l02-or-t3', 'Theatre 3 — Orthopaedic','T3', 'Room', "14'-0\"", 'Orthopaedic and joint replacement — 750 ft²'),
      mk('bld-l02-or-t4', 'Theatre 4 — Cardiac',    'T4', 'Room', "14'-0\"", 'Cardiac and thoracic surgery — 900 ft²'),
    ]),
    mk('bld-l02-pre', 'Pre-Op Zone',        'PRE', 'Area', "14'-0\"", '24 pre-operative preparation bays with anaesthetic rooms', [
      mk('bld-l02-pre-r1', 'Pre-Op Bay A', 'RA', 'Room', "14'-0\"", 'Bays 1–8 — pre-anaesthetic assessment and IV cannulation', [
        mk('bld-l02-pre-r1-s1', 'Patient Holding',    'S1', 'Sub Room', "14'-0\"", 'Curtained bay with recliner, IV pole, and call button'),
        mk('bld-l02-pre-r1-s2', 'Anaesthetic Sub-Bay','S2', 'Sub Room', "14'-0\"", 'Anaesthetist workstation with airway equipment cart'),
      ]),
      mk('bld-l02-pre-r2', 'Pre-Op Bay B', 'RB', 'Room', "14'-0\"", 'Bays 9–16 — patient preparation and consent documentation', [
        mk('bld-l02-pre-r2-s1', 'Patient Holding',    'S1', 'Sub Room', "14'-0\"", 'Curtained bay with recliner, IV pole, and call button'),
        mk('bld-l02-pre-r2-s2', 'Family Waiting Nook','S2', 'Sub Room', "14'-0\"", 'Adjacent seated alcove for one accompanying family member'),
      ]),
      mk('bld-l02-pre-r3', 'Pre-Op Bay C', 'RC', 'Room', "14'-0\"", 'Bays 17–24 — paediatric and bariatric surgical prep', [
        mk('bld-l02-pre-r3-s1', 'Paediatric Sub-Bay', 'S1', 'Sub Room', "14'-0\"", 'Child-friendly bay with cot-height trolley and play distraction'),
        mk('bld-l02-pre-r3-s2', 'Bariatric Sub-Bay',  'S2', 'Sub Room', "14'-0\"", 'Wide-access bay with bariatric bed and reinforced flooring'),
      ]),
    ]),
    mk('bld-l02-rec', 'Recovery (PACU)',    'REC', 'Area', "14'-0\"", 'Post-anaesthesia care unit — 32 stage-1 and stage-2 bays'),
    mk('bld-l02-ssd', 'Sterile Store',      'SSD', 'Room', "14'-0\"", 'Surgical instrument and sterile goods holding room'),
    mk('bld-l02-svc', 'Support Services',   'SVC', 'Zone', "14'-0\"", 'Clean utility, soiled utility, and anaesthetic gas plant'),
  ]),
  // ── Level 3 ────────────────────────────────────────────────────────────────
  mk('bld-l03', 'Level 3', 'L03', 'Level', "28'-0\"", 'Critical care floor — ICU, CCU, and high dependency unit', [
    mk('bld-l03-icu', 'Intensive Care Unit', 'ICU', 'Zone', "28'-0\"", '24-bed closed-format ICU with centralised nursing station', [
      mk('bld-l03-icu-a', 'ICU Pod A',  'A', 'Area', "28'-0\"", 'Beds 1–8 — single-patient isolation rooms with anterooms'),
      mk('bld-l03-icu-b', 'ICU Pod B',  'B', 'Area', "28'-0\"", 'Beds 9–16 — open-bay critical care with curtain privacy'),
      mk('bld-l03-icu-c', 'ICU Pod C',  'C', 'Area', "28'-0\"", 'Beds 17–24 — step-down monitoring with telemetry'),
    ]),
    mk('bld-l03-ccu', 'Cardiac Care Unit',  'CCU', 'Zone', "28'-0\"", '12-bed CCU with continuous cardiac monitoring'),
    mk('bld-l03-hdu', 'High Dependency',    'HDU', 'Area', "28'-0\"", '16-bed HDU for post-surgical and complex medical patients'),
    mk('bld-l03-neo', 'Neonatal ICU',       'NEO', 'Area', "28'-0\"", '18-bassinet NICU with isolette bays and family rooms'),
    mk('bld-l03-svc', 'Support Services',   'SVC', 'Zone', "28'-0\"", 'Clean utility, medication room, and equipment storage'),
  ]),
  // ── Level 4 ────────────────────────────────────────────────────────────────
  mk('bld-l04', 'Level 4', 'L04', 'Level', "42'-0\"", 'Inpatient wards — medical and surgical beds', [
    mk('bld-l04-mwd', 'Medical Ward',      'MWD', 'Zone', "42'-0\"", '40-bed general medical ward — north wing', [
      mk('bld-l04-mwd-a', 'Ward A (Beds 1–20)',  'A', 'Area', "42'-0\"", 'Single and twin rooms — acute medical patients', [
        mk('bld-l04-mwd-a-r01', 'Room 101', 'R101', 'Room', "42'-0\"", 'Single-bed private room — acute medical, north-facing', [
          mk('bld-l04-mwd-a-r01-s1', 'Ensuite Bathroom', 'ENS', 'Sub Room', "42'-0\"", 'Private ensuite with shower, toilet, and grab rails'),
          mk('bld-l04-mwd-a-r01-s2', 'Wardrobe Alcove',  'WRD', 'Sub Room', "42'-0\"", 'Built-in wardrobe and personal belongings storage alcove'),
        ]),
        mk('bld-l04-mwd-a-r02', 'Room 102', 'R102', 'Room', "42'-0\"", 'Twin-bed room — acute medical, north-facing', [
          mk('bld-l04-mwd-a-r02-s1', 'Ensuite Bathroom', 'ENS', 'Sub Room', "42'-0\"", 'Shared ensuite with shower, toilet, and grab rails'),
          mk('bld-l04-mwd-a-r02-s2', 'Visitor Seating',  'VIS', 'Sub Room', "42'-0\"", 'Bedside visitor zone with two chairs and privacy curtain'),
        ]),
        mk('bld-l04-mwd-a-r03', 'Room 103', 'R103', 'Room', "42'-0\"", 'Single-bed isolation room — contact precautions', [
          mk('bld-l04-mwd-a-r03-s1', 'Anteroom',          'ANT', 'Sub Room', "42'-0\"", 'PPE anteroom with sink, glove dispenser, and apron rack'),
          mk('bld-l04-mwd-a-r03-s2', 'Patient Bay',       'BAY', 'Sub Room', "42'-0\"", 'Isolation patient bay with negative-pressure exhaust'),
        ]),
      ]),
      mk('bld-l04-mwd-b', 'Ward B (Beds 21–40)', 'B', 'Area', "42'-0\"", 'Single and twin rooms — sub-acute and step-down', [
        mk('bld-l04-mwd-b-r01', 'Room 104', 'R104', 'Room', "42'-0\"", 'Single-bed room — sub-acute step-down, south-facing', [
          mk('bld-l04-mwd-b-r01-s1', 'Ensuite Bathroom', 'ENS', 'Sub Room', "42'-0\"", 'Private ensuite with shower, toilet, and grab rails'),
          mk('bld-l04-mwd-b-r01-s2', 'Wardrobe Alcove',  'WRD', 'Sub Room', "42'-0\"", 'Built-in wardrobe and personal belongings storage alcove'),
        ]),
        mk('bld-l04-mwd-b-r02', 'Room 105', 'R105', 'Room', "42'-0\"", 'Twin-bed room — sub-acute, south-facing', [
          mk('bld-l04-mwd-b-r02-s1', 'Ensuite Bathroom', 'ENS', 'Sub Room', "42'-0\"", 'Shared ensuite with shower, toilet, and grab rails'),
          mk('bld-l04-mwd-b-r02-s2', 'Visitor Seating',  'VIS', 'Sub Room', "42'-0\"", 'Bedside visitor zone with two chairs and privacy curtain'),
        ]),
      ]),
    ]),
    mk('bld-l04-swd', 'Surgical Ward',     'SWD', 'Zone', "42'-0\"", '36-bed post-surgical ward — south wing', [
      mk('bld-l04-swd-a', 'Ward C (Beds 1–18)',  'A', 'Area', "42'-0\"", 'Post-op orthopaedic and general surgery patients'),
      mk('bld-l04-swd-b', 'Ward D (Beds 19–36)', 'B', 'Area', "42'-0\"", 'Post-op cardiac and thoracic surgery patients'),
    ]),
    mk('bld-l04-iso', 'Isolation Rooms',   'ISO', 'Area', "42'-0\"", 'Eight negative-pressure isolation rooms for infectious cases'),
    mk('bld-l04-stn', 'Nursing Stations',  'STN', 'Area', "42'-0\"", 'Central nursing stations, medication rooms, and clean utility'),
    mk('bld-l04-svc', 'Support Services',  'SVC', 'Zone', "42'-0\"", 'Soiled utility, linen store, and equipment bay'),
  ]),
  // ── Roof Level ─────────────────────────────────────────────────────────────
  mk('bld-roof', 'Roof Level', 'ROOF', 'Level', "56'-0\"", 'Rooftop plant, helipad, and services infrastructure', [
    mk('bld-roof-heli', 'Helipad',          'HELI', 'Area', "56'-0\"", 'FATO-compliant helicopter landing and takeoff area with lighting'),
    mk('bld-roof-plt',  'Plant Room',       'PLT',  'Room', "56'-0\"", 'Cooling towers, AHUs, medical gas manifolds, and BMS nodes'),
    mk('bld-roof-pvl',  'PV Array Zone',    'PVL',  'Zone', "56'-0\"", 'Solar photovoltaic panel array — 480 kW capacity'),
    mk('bld-roof-com',  'Comms & Antenna',  'COM',  'Area', "56'-0\"", 'Telecoms mast, nurse call radio, and wireless AP infrastructure'),
  ]),
];

// Wrap all level rows in the first Building item
const SITE_LBS_ITEMS: LBSItem[] = [
  mk('site-bldg-1', 'Cleveland Hospital Building', 'BLDG', 'Building', '', 'Main hospital building', SITE_LBS_ITEMS_LEVELS),
];



const ZONE_LBS_ITEMS: LBSItem[] = [
  mk('z-com', 'Common Areas', 'Z-COM', 'Zone', "0'-0\"", 'Shared spaces accessible to all occupants', [
    mk('z-com-cor', 'Corridors & Circulation', 'COR', 'Area', "0'-0\"", 'Lift lobbies, fire stairs, and common corridors'),
    mk('z-com-tlt', 'Amenities', 'TLT', 'Area', "0'-0\"", 'Bathrooms and accessible facilities per floor'),
    mk('z-com-svc', 'Services Zones', 'SVC', 'Zone', "0'-0\"", 'Risers, switch rooms, and electrical cupboards'),
  ]),
  mk('z-ten', 'Tenancy Areas', 'Z-TEN', 'Zone', "0'-0\"", 'Demised areas leased to individual tenants', [
    mk('z-ten-offa', 'Office Tenancy A', 'OFFA', 'Area', "13'-9\"", 'Level 1 north — 600 m²'),
    mk('z-ten-offb', 'Office Tenancy B', 'OFFB', 'Area', "13'-9\"", 'Level 1 south — 600 m²'),
    mk('z-ten-retl', 'Retail Tenancies', 'RETL', 'Area', "0'-0\"", 'Ground floor street-front retail units'),
  ]),
  mk('z-plant', 'Plant & Services', 'Z-PLANT', 'Zone', "0'-0\"", 'Dedicated mechanical and electrical service areas', [
    mk('z-plant-mech', 'Mechanical Plant', 'MECH', 'Area', "0'-0\"", 'AHUs, FCUs, and HVAC plant areas'),
    mk('z-plant-elec', 'Electrical Plant', 'ELEC', 'Area', "0'-0\"", 'Switchboards, transformers, and UPS rooms'),
    mk('z-plant-comm', 'Communications', 'COMM', 'Area', "0'-0\"", 'Data racks, comms rooms, and IDF locations'),
  ]),
];

const INITIAL_LBS_TABS: LBSTab[] = [
  { id: 'site-structure', label: 'Primary LBS', items: SITE_LBS_ITEMS, builtIn: true, type: 'Zone Structure' },
];

const INITIAL_LBS_EXPANDED = new Set<string>(); // view mode defaults to all collapsed

// ─── Column constants ──────────────────────────────────────────────────────────
const COL_NAME           = 280;  // col 1 — Location Name (tree indent lives here)
const COL_CODE           = 126;  // col 2 — Location Code (hugs "Location Code" header + standard padding)
const COL_FULLCODE       = 240;  // col 3 — Full Code (fixed 240px)
const COL_TYPE           = 130;  // col 4 — Type
const COL_ELEVATION_EDIT = 130;  // col 5 — Elevation fixed only in edit mode (hugs in view)
const COL_ACTIONS   = 160;   // edit-mode only
const COL_VS        = 188;   // Vertical Segments column — wider to fit Tertiary "Edit" button
const HEADER_H         = 44;
const ROW_H            = 44;
const EDIT_ROW_H_BASE  = 44; // edit-mode default row height (matches view mode)
const EDIT_ROW_H_ERROR = 56; // edit-mode row height when there is a validation error (expands downward only)
const INDENT      = 20;
const MAX_TIERS   = 7;       // maximum nesting depth (tiers 1–7 = depth 0–6)
const P_PLUS_VERTICAL = 'M10.9998 5.82818e-08L10.9998 22';

// ─── Full Code computation ─────────────────────────────────────────────────────
const SEP_DEFS = [
  { id: '|',     symbol: '|',   name: 'Pipe',         sepStr: ' | ' },
  { id: '.',     symbol: '.',   name: 'Dot',          sepStr: '.'   },
  { id: '-',     symbol: '-',   name: 'Hyphen',       sepStr: ' - ' },
  { id: 'none',  symbol: '∅',   name: 'None',         sepStr: ''    },
] as const;
type SepOption = typeof SEP_DEFS[number]['id'];

function getSepStr(id: SepOption): string {
  return SEP_DEFS.find(s => s.id === id)?.sepStr ?? '.';
}

function buildFullCodeMap(items: LBSItem[], prefix = '', sep = ' / '): Map<string, string> {
  const map = new Map<string, string>();
  for (const item of items) {
    // Building and all other tiers are included in the Full Code path
    const fullCode = prefix ? `${prefix}${sep}${item.code}` : item.code;
    map.set(item.id, fullCode);
    buildFullCodeMap(item.children, fullCode, sep).forEach((v, k) => map.set(k, v));
  }
  return map;
}

// ─── Separator Dropdown ────────────────────────────────────────────────────────
function SeparatorDropdown({ value, onChange }: { value: SepOption; onChange: (v: SepOption) => void }) {
  const [open, setOpen]       = useState(false);
  const [hov,  setHov]        = useState(false);
  const btnRef                = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function toggle() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: Math.max(r.width, 168) });
    }
    setOpen(o => !o);
  }

  const bg     = open ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4';
  const border = open ? '#616D79' : hov ? '#616D79' : '#C3C7CC';
  const color  = open ? '#FFFFFF' : '#616D79';
  const currentDef = SEP_DEFS.find(s => s.id === value) ?? SEP_DEFS[0];

  return (
    <>
      <button
        ref={btnRef}
        data-dev-anchor="lbs-separator"
        onClick={e => { e.stopPropagation(); toggle(); }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title="Choose Full Code separator"
        style={{
          height: 26, minWidth: 44, padding: '0 7px',
          display: 'inline-flex', alignItems: 'center', gap: 3,
          background: bg, border: `1px solid ${border}`, borderRadius: 4,
          cursor: 'pointer', flexShrink: 0,
          transition: 'background 0.15s, border-color 0.15s',
          userSelect: 'none',
        }}
      >
        {/* Trigger shows only the symbol — never the name */}
        <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color, lineHeight: 1 }}>
          {currentDef.symbol}
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && ReactDOM.createPortal(
        <div style={{
          position: 'absolute', top: menuPos.top, left: menuPos.left,
          minWidth: menuPos.width, zIndex: 9999,
          background: '#FFFFFF', borderRadius: 4,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
          padding: '4px 0', border: '1px solid #E0E4E8',
        }}>
          {SEP_DEFS.map(def => {
            const isSel = def.id === value;
            return (
              <div
                key={def.id}
                onMouseDown={e => { e.stopPropagation(); onChange(def.id); setOpen(false); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', gap: 10,
                  padding: '0 12px', cursor: 'pointer',
                  background: isSel ? '#E6F7FF' : 'transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSel ? '#E6F7FF' : 'transparent'; }}
              >
                {/* Symbol */}
                <span style={{
                  fontFamily: 'monospace', fontSize: 14, fontWeight: 700,
                  color: isSel ? '#096DD9' : '#384857',
                  width: 16, textAlign: 'center', flexShrink: 0,
                }}>
                  {def.symbol}
                </span>
                {/* Name */}
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: isSel ? 600 : 400,
                  color: isSel ? '#096DD9' : '#616D79',
                  flex: 1,
                }}>
                  {def.name}
                </span>
                {/* Checkmark */}
                {isSel && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── Type reference data ───────────────────────────────────────────────────────
// 'Site', 'Building', and 'Project' removed — these are derived from Project Context (§ Show Project Context toggle)
const TYPE_OPTIONS = [
  'Section', 'Zone',
  'Department', 'Area', 'Unit', 'Room', 'Sub Room',
  'Wing', 'Corridor', 'Core', 'Suite', 'Bay',
] as const;

// ─── Vertical Zones types & data ──────────────────────────────────────────────
const VZONE_TYPES = ['Shaft', 'Riser', 'Stair', 'Elevator', 'Atrium', 'Vertical Chase'] as const;

interface VerticalZone {
  id: string; name: string; code: string; type: string;
  startLevelId: string; endLevelId: string;
  startLevelName?: string; // snapshot: last-known name of startLevel (preserved when level is deleted)
  endLevelName?: string;   // snapshot: last-known name of endLevel (preserved when level is deleted)
  elevationStart: string; elevationEnd: string;
  description: string; linkedLocationIds: string[];
  buildingId?: string; // explicit building assignment set when zone is created via "Add Vertical Zone"
}

interface LevelNode { id: string; name: string; elevation: string; }
type FlatLBSNode = { id: string; name: string; code: string; fullCode: string; depth: number; };

// ─── Building grouping for Vertical Zones ─────────────────────────────────────
interface BuildingNode { id: string; name: string; code: string; levelIds: Set<string>; }

function collectBuildingNodes(lbsTabs: LBSTab[]): BuildingNode[] {
  const buildings: BuildingNode[] = [];
  function collectLevelsUnder(items: LBSItem[], levelIds: Set<string>) {
    for (const it of items) {
      if (isLevelType(it.type)) levelIds.add(it.id);
      collectLevelsUnder(it.children, levelIds);
    }
  }
  function walkItems(items: LBSItem[]) {
    for (const it of items) {
      if (isBuildingType(it.type)) {
        const levelIds = new Set<string>();
        collectLevelsUnder(it.children, levelIds);
        buildings.push({ id: it.id, name: it.name, code: it.code, levelIds });
      } else {
        walkItems(it.children);
      }
    }
  }
  for (const tab of lbsTabs) walkItems(tab.items);
  return buildings;
}

function collectLevelNodes(lbsTabs: LBSTab[]): LevelNode[] {
  const nodes: LevelNode[] = [];
  function walk(items: LBSItem[]) {
    for (const it of items) {
      if (isLevelType(it.type)) nodes.push({ id: it.id, name: it.name, elevation: it.elevation });
      walk(it.children);
    }
  }
  for (const tab of lbsTabs) walk(tab.items);
  return nodes;
}

function flattenAllLbsNodes(items: LBSItem[], prefix = '', depth = 0): FlatLBSNode[] {
  const result: FlatLBSNode[] = [];
  for (const item of items) {
    const fc = prefix ? `${prefix}/${item.code}` : item.code;
    result.push({ id: item.id, name: item.name, code: item.code, fullCode: fc, depth });
    result.push(...flattenAllLbsNodes(item.children, fc, depth + 1));
  }
  return result;
}

const INITIAL_VZONES: VerticalZone[] = [
  { id: 'vz-1', name: 'Main Stairwell',     code: 'ST-01',  type: 'Stair',    startLevelId: 'bld-b2',  endLevelId: 'bld-roof', startLevelName: 'Basement 2', endLevelName: 'Roof Level', elevationStart: "-28'-6\"", elevationEnd: "56'-0\"", description: 'Primary egress stair serving all levels', linkedLocationIds: [] },
  { id: 'vz-2', name: 'Service Elevator',   code: 'EL-01',  type: 'Elevator', startLevelId: 'bld-b1',  endLevelId: 'bld-l04',  startLevelName: 'Basement 1', endLevelName: 'Level 4',    elevationStart: "-14'-3\"", elevationEnd: "42'-0\"", description: 'Goods and patient service elevator', linkedLocationIds: [] },
  { id: 'vz-3', name: 'Central Atrium',     code: 'ATR-01', type: 'Atrium',   startLevelId: 'bld-l01', endLevelId: 'bld-l04',  startLevelName: 'Level 1',    endLevelName: 'Level 4',    elevationStart: "0'-0\"",   elevationEnd: "42'-0\"", description: 'Open void — natural light from L1 to L4', linkedLocationIds: [] },
  { id: 'vz-4', name: 'Mechanical Shaft A', code: 'SH-01',  type: 'Shaft',    startLevelId: 'bld-b1',  endLevelId: 'bld-roof', startLevelName: 'Basement 1', endLevelName: 'Roof Level', elevationStart: "-14'-3\"", elevationEnd: "56'-0\"", description: 'Primary HVAC and electrical services shaft', linkedLocationIds: [] },
  { id: 'vz-5', name: 'Medical Gas Riser',  code: 'RS-01',  type: 'Riser',    startLevelId: 'bld-b1',  endLevelId: 'bld-l04',  startLevelName: 'Basement 1', endLevelName: 'Level 4',    elevationStart: "-14'-3\"", elevationEnd: "42'-0\"", description: 'O₂, N₂O and vacuum medical gas distribution', linkedLocationIds: [] },
];

const VZ_HEADER_H    = 44;
const VZ_ROW_H       = 48;
const VZ_ROW_H_ERROR = 60; // §26 — expands downward 12px to hold the error message text

// ─── §26 — Vertical Zone validation engine ────────────────────────────────────
// Pure function. Returns Map<string, string> keyed "{zoneId}_{fieldName}".
// Add new rules here — never duplicate validation logic elsewhere.
function validateZones(zones: VerticalZone[]): Map<string, string> {
  const errors = new Map<string, string>();
  for (const z of zones) {
    if (!z.name.trim()) errors.set(`${z.id}_name`, 'Name is required');
  }
  return errors;
}

function TypeDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen]       = useState(false);
  const [hov, setHov]         = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest('[data-type-menu]')) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function toggle() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: r.bottom + window.scrollY + 2, left: r.left + window.scrollX, width: Math.max(r.width, 160) });
    }
    setOpen(o => !o);
  }

  const borderColor = open ? '#91D5FF' : hov ? '#A8B0BB' : '#D0D5DD';

  return (
    <>
      <button
        ref={btnRef}
        data-type-menu
        onClick={e => { e.stopPropagation(); toggle(); }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1, minWidth: 0, height: 30,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 8, paddingRight: 6,
          background: '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: 4,
          cursor: 'pointer', transition: 'border-color 0.15s',
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
          color: value ? '#344054' : '#9EA3A9',
          whiteSpace: 'nowrap', overflow: 'hidden',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, textAlign: 'left' }}>
          {value || 'Select type…'}
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0, marginLeft: 4 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && ReactDOM.createPortal(
        <div data-type-menu style={{
          position: 'absolute', top: menuPos.top, left: menuPos.left,
          minWidth: menuPos.width, zIndex: 9999,
          background: '#FFFFFF', borderRadius: 4,
          boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
          padding: '4px 0', border: '1px solid #E0E4E8', maxHeight: 320, overflowY: 'auto',
        }}>
          {/* None option */}
          <div
            onMouseDown={e => { e.stopPropagation(); onChange(''); setOpen(false); }}
            style={{
              height: 32, display: 'flex', alignItems: 'center',
              padding: '0 12px', cursor: 'pointer',
              background: value === '' ? '#E6F7FF' : 'transparent',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
              color: '#9EA3A9', fontStyle: 'italic',
            }}
            onMouseEnter={e => { if (value !== '') (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = value === '' ? '#E6F7FF' : 'transparent'; }}
          >
            — None —
          </div>
          <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />

          {TYPE_OPTIONS.map(opt => {
            const isSel = value === opt;
            return (
              <div
                key={opt}
                onMouseDown={e => { e.stopPropagation(); onChange(opt); setOpen(false); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 12px', cursor: 'pointer',
                  background: isSel ? '#E6F7FF' : 'transparent',
                  transition: 'background 0.1s',
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isSel ? 600 : 400,
                  color: isSel ? '#096DD9' : '#384857',
                }}
                onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSel ? '#E6F7FF' : 'transparent'; }}
              >
                <span>{opt}</span>
                {isSel && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── Delete Row Warning key ────────────────────────────────────────────────────
const DELETE_ROW_WARNING_KEY = 'inertia_lbs_delete_row_warning_dismissed';
const DELETE_VZ_WARNING_KEY  = 'inertia_lbs_delete_vz_warning_dismissed';

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
        <path d={chevronDownPaths.p1d4b7280}  fill="#384857" transform="rotate(180 9 9)" />
      ) : (
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
function TrashIconSVG({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14.6239 16.875" fill="none">
      <path d={trashPaths.pc0b2e00} fill={color} />
    </svg>
  );
}
function AddChildIcon() {
  // svg-p3h938sv9m — §23.2: body #384857, accent plus #FF6425, rotate(90deg) for child direction
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'rotate(90deg)', flexShrink: 0 }}>
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

// ─── Location icon (building outline) ─────────────────────────────────────────
function LocationIcon({ color = '#384857' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 21h18M3 7l9-4 9 4v14H3V7z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="9" y="9" width="2" height="2" rx="0.5" fill={color} />
      <rect x="13" y="9" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  );
}

// ─── Primary LBS icon (Figma asset) ───────────────────────────────────────────
function PrimaryLBSIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d={primaryLbsPaths.p1235ff00} fill={color} />
    </svg>
  );
}

// ─── Node Add icon (Figma asset — "Add Level") ────────────────────────────────
function NodeAddIcon({ stroke = '#FF4D00', size = 22 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 21.5" fill="none" style={{ flexShrink: 0 }}>
      <path d={nodeAddPaths.pa8e4980} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={nodeAddPaths.pfdc0100} stroke={stroke} strokeWidth="1.5" />
      <path d={nodeAddPaths.p5df2960} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Validation banner ────────────────────────────────────────────────────────
function ValidationBanner({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div data-dev-anchor="lbs-edit-validation" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 36, flexShrink: 0, background: '#FFF1F0', borderBottom: '1px solid #FFA39E' }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z" stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#B91C1C' }}>
        {count} validation error, hover the highlighted fields for details.
      </span>
    </div>
  );
}

// ─── VS Side Panel ─────────────────────────────────────────────────────────────
function VSSidePanel({
  item, parentVS, floorHeight, parentConsumedInches, onClose, onApply, isNewEnable,
}: {
  item: LBSItem; parentVS: VSConfig | null;
  floorHeight: string | null;        // ft-in string — next level elev − this level elev (gross)
  parentConsumedInches: number;      // total plenum inches already claimed by ancestor nodes
  onClose: () => void; onApply: (vs: VSConfig) => void;
  isNewEnable?: boolean;             // true when panel was opened by clicking the mini-toggle (OFF→ON)
}) {
  const initVS = item.vs ?? defaultVSConfig();

  // ── Top-level enabled toggle
  // When opened via the mini-toggle (isNewEnable), force enabled = true immediately.
  const [enabled, setEnabled] = useState(isNewEnable ? true : initVS.enabled);

  // ── Plenum checkboxes + inputs (ceiling & floor editable; occupied always-on with optional manual override)
  const [ceilingEnabled, setCeilingEnabled] = useState(initVS.ceiling.enabled);
  const [floorEnabled,   setFloorEnabled]   = useState(initVS.floor.enabled);
  const [ceilingInput,   setCeilingInput]   = useState(initVS.ceiling.height || '');
  const [floorInput,     setFloorInput]     = useState(initVS.floor.height   || '');
  const [occupiedInput,  setOccupiedInput]  = useState(initVS.occupied.height || '');

  // ── Gross floor height (next level elev − this level elev)
  const grossInches = floorHeight ? parseFtIn(floorHeight) : NaN;
  const hasFloorH   = !isNaN(grossInches) && grossInches > 0;

  // ── Effective available height (gross minus ancestor plenum deduction)
  const hasParentDeduct = parentConsumedInches > 0;
  const effectiveInches = hasFloorH ? Math.max(0, grossInches - parentConsumedInches) : NaN;
  const effectiveHeight = hasFloorH ? feetToFtIn(effectiveInches / 12) : null;
  const parentConsumedH = hasParentDeduct ? feetToFtIn(parentConsumedInches / 12) : null;

  // ── Parse a plenum input → inches (0 when unchecked/empty, NaN on bad format)
  function parsePlIn(raw: string): number {
    const t = raw.trim();
    if (!t) return 0;
    const feet = parseElevationNew(t);
    return feet !== null ? Math.round(Math.abs(feet) * 12) : NaN;
  }

  const ceilIn     = ceilingEnabled ? parsePlIn(ceilingInput) : 0;
  const floorIn    = floorEnabled   ? parsePlIn(floorInput)   : 0;
  const occupiedIn = parsePlIn(occupiedInput);

  // ── Format errors (input present but un-parseable)
  const ceilFmtErr  = ceilingEnabled && ceilingInput.trim() !== '' && isNaN(ceilIn);
  const floorFmtErr = floorEnabled   && floorInput.trim()   !== '' && isNaN(floorIn);
  const occFmtErr   = occupiedInput.trim() !== '' && isNaN(occupiedIn);
  const anyFmtErr   = ceilFmtErr || floorFmtErr || occFmtErr;

  // ── Total used = sum of all three rows
  const totalUsed = (isNaN(ceilIn) ? 0 : ceilIn) + (isNaN(occupiedIn) ? 0 : occupiedIn) + (isNaN(floorIn) ? 0 : floorIn);

  // ── Remaining = available − total used
  const remainingInches  = hasFloorH ? Math.max(0, effectiveInches - totalUsed) : NaN;
  const budgetExceeds    = hasFloorH && totalUsed > effectiveInches;
  const remainingDisplay = budgetExceeds
    ? "0' - 0\""
    : !isNaN(remainingInches)
      ? feetToFtIn(remainingInches / 12)
      : '—';

  // ── At least one plenum must be checked AND have a value when VS is enabled
  const hasAtLeastOnePlenum =
    (ceilingEnabled && ceilingInput.trim() !== '') ||
    (floorEnabled   && floorInput.trim()   !== '');

  // ── canApply: remaining must be exactly 0 (all height accounted for), no format errors, no overflow
  const canApply = !enabled || (!anyFmtErr && !budgetExceeds && hasFloorH && remainingInches === 0);

  // ── Build the full VSConfig on save
  function buildConfig(): VSConfig {
    const ceilFeet  = ceilingEnabled && ceilingInput.trim() ? parseElevationNew(ceilingInput.trim()) : null;
    const floorFeet = floorEnabled   && floorInput.trim()   ? parseElevationNew(floorInput.trim())   : null;
    const occFeet   = occupiedInput.trim() ? parseElevationNew(occupiedInput.trim()) : null;
    const occHeight = occFeet !== null ? feetToFtIn(Math.abs(occFeet)) : '';
    return {
      enabled,
      ceiling:  { enabled: ceilingEnabled, mode: 'local', height: ceilFeet  !== null ? feetToFtIn(Math.abs(ceilFeet))  : '' },
      occupied: { enabled: true,           mode: 'local', height: occHeight },
      floor:    { enabled: floorEnabled,   mode: 'local', height: floorFeet !== null ? feetToFtIn(Math.abs(floorFeet)) : '' },
    };
  }

  // ── Reusable plenum input row (ceiling & floor)
  function PlenumRow({
    label, checked, onToggle, value, onChange, onBlurFmt, isErr, isLast,
  }: {
    label: string; checked: boolean; onToggle: () => void;
    value: string; onChange: (v: string) => void; onBlurFmt: () => void;
    isErr: boolean; isLast: boolean;
  }) {
    return (
      <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: isLast ? 'none' : '1px solid #F0F0F0', minHeight: 44, background: checked ? '#FFFFFF' : '#FAFAFA', transition: 'background 0.1s' }}>
        <div onClick={onToggle} style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #E5E7EB', cursor: 'pointer' }}>
          <div style={{ width: 16, height: 16, borderRadius: 2, flexShrink: 0, border: `1.5px solid ${checked ? '#0E70CB' : '#D0D5DD'}`, background: checked ? '#0E70CB' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s' }}>
            {checked && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 6, borderRight: '1px solid #E5E7EB' }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: checked ? 500 : 400, color: checked ? '#1D2C38' : '#9EA3A9', transition: 'color 0.1s' }}>{label}</span>
        </div>
        <div style={{ width: 96, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 6, paddingRight: 6 }}>
          {checked ? (
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="e.g. 2-6"
              style={{ width: '100%', height: 28, border: `1px solid ${isErr || budgetExceeds ? '#FFA39E' : '#D0D5DD'}`, borderRadius: 4, paddingLeft: 7, paddingRight: 7, fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#344054', background: isErr || budgetExceeds ? '#FFF1F0' : '#FFFFFF', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.15s, background 0.15s' }}
              onFocus={e => { if (!isErr && !budgetExceeds) e.currentTarget.style.borderColor = '#91D5FF'; }}
              onBlur={() => onBlurFmt()}
            />
          ) : (
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#D0D5DD' }}>—</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Header §11.0 — 72px total */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736', whiteSpace: 'nowrap' }}>Vertical Segmentation</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>

      {/* ── Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' as any }}>

        {/* Node context chip */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#F9FAFB', borderRadius: 4, border: '1px solid #E5E7EB' }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              {item.name || item.code || 'Untitled'}
            </span>
            {item.type && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#616D79', background: '#E5E7E9', borderRadius: 9999, padding: '2px 6px', flexShrink: 0 }}>
                {item.type}
              </span>
            )}
          </div>
        </div>

        {/* ── Enable toggle row */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38' }}>Enable Vertical Segmentation</span>
            <div onClick={() => setEnabled(v => !v)}
              style={{ width: 40, height: 20, borderRadius: 10, background: enabled ? '#FF4D00' : '#D9D9D9', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 2, left: enabled ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s' }} />
            </div>
          </div>
        </div>

        {/* ── "Select a plenum" hint — shown only on new-enable until a value is entered */}
        {/* ── Segment table — faded when disabled */}
        <div style={{ opacity: enabled ? 1 : 0.35, transition: 'opacity 0.2s', pointerEvents: enabled ? undefined : 'none' }}>

          {/* Floor / available height info */}
          {hasFloorH && (
            <div style={{ margin: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#616D79' }}>
                  Floor height:&nbsp;
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1D2C38' }}>{floorHeight}</span>
                  <span style={{ color: '#9CA4AE' }}>&nbsp;(next level − this level)</span>
                </span>
              </div>
              {hasParentDeduct && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', background: '#FFFBE6', border: '1px solid #FFD666', borderRadius: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" stroke="#FAAD14" strokeWidth="1.5" />
                    <path d="M8 5v3M8 10.5v.5" stroke="#FAAD14" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#7A5900', lineHeight: '16px', flex: 1 }}>
                    Parent plenums claim&nbsp;
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7A5900' }}>{parentConsumedH}</span>
                    ,&nbsp;available to this node:&nbsp;
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#7A5900' }}>{effectiveHeight}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ── Three-row segment table */}
          <div style={{ margin: hasFloorH ? '8px 16px 0' : '12px 16px 0', border: '1px solid #D9D9D9', borderRadius: 4, overflow: 'hidden' }}>

            {/* Table header */}
            <div style={{ display: 'flex', alignItems: 'stretch', background: '#FAFAFA', borderBottom: '1px solid #E5E7EB', height: 32 }}>
              <div style={{ width: 44, flexShrink: 0, borderRight: '1px solid #E5E7EB' }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 10, borderRight: '1px solid #E5E7EB' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#384857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Segment</span>
              </div>
              <div style={{ width: 96, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10, paddingRight: 6 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#384857', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Height</span>
                {hasFloorH && (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: hasParentDeduct ? '#C4632A' : '#9CA4AE', whiteSpace: 'nowrap' }}>
                    of {hasParentDeduct ? effectiveHeight : floorHeight}{hasParentDeduct ? ' avail.' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Row 1 — Ceiling Plenum (editable) */}
            <PlenumRow
              label="Ceiling Plenum"
              checked={ceilingEnabled}
              onToggle={() => setCeilingEnabled(v => !v)}
              value={ceilingInput}
              onChange={v => setCeilingInput(v)}
              onBlurFmt={() => {
                const t = ceilingInput.trim();
                if (t) { const f = parseElevationNew(t); if (f !== null) setCeilingInput(feetToFtIn(Math.abs(f))); }
              }}
              isErr={ceilFmtErr}
              isLast={false}
            />

            {/* Row 2 — Occupied Space (always-on checkbox, editable height) */}
            <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #F0F0F0', minHeight: 44, background: '#FFFFFF' }}>
              {/* Always-checked disabled checkbox — same 16×16 box style as PlenumRow, disabled colours */}
              <div style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #E5E7EB', cursor: 'not-allowed' }}>
                <div style={{ width: 16, height: 16, borderRadius: 2, flexShrink: 0, background: '#BFBFBF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              {/* Label + helper text */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 10, paddingRight: 6, borderRight: '1px solid #E5E7EB', gap: 1 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 500, color: '#1D2C38' }}>Occupied Space</span>

              </div>
              {/* Editable input — placeholder shows auto-calculated value */}
              <div style={{ width: 96, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 6, paddingRight: 6 }}>
                <input
                  type="text"
                  value={occupiedInput}
                  onChange={e => setOccupiedInput(e.target.value)}
                  placeholder="e.g. 2-6"
                  style={{
                    width: '100%', height: 28,
                    border: `1px solid ${occFmtErr || budgetExceeds ? '#FFA39E' : '#D0D5DD'}`,
                    borderRadius: 4, paddingLeft: 7, paddingRight: 7,
                    fontFamily: 'Open Sans, sans-serif', fontSize: 13,
                    color: '#344054',
                    background: occFmtErr || budgetExceeds ? '#FFF1F0' : '#FFFFFF',
                    outline: 'none', boxSizing: 'border-box' as const,
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onFocus={e => {
                    if (!budgetExceeds && !occFmtErr) e.currentTarget.style.borderColor = '#91D5FF';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = occFmtErr || budgetExceeds ? '#FFA39E' : '#D0D5DD';
                    const t = occupiedInput.trim();
                    if (t) {
                      const f = parseElevationNew(t);
                      if (f !== null) setOccupiedInput(feetToFtIn(Math.abs(f)));
                    }
                  }}
                />
              </div>
            </div>

            {/* Row 3 — Floor Plenum (editable) */}
            <PlenumRow
              label="Floor Plenum"
              checked={floorEnabled}
              onToggle={() => setFloorEnabled(v => !v)}
              value={floorInput}
              onChange={v => setFloorInput(v)}
              onBlurFmt={() => {
                const t = floorInput.trim();
                if (t) { const f = parseElevationNew(t); if (f !== null) setFloorInput(feetToFtIn(Math.abs(f))); }
              }}
              isErr={floorFmtErr}
              isLast={true}
            />
          </div>

          {/* ── Total exceeds available — inline error banner */}
          {budgetExceeds && (
            <div style={{ margin: '6px 16px 0', padding: '8px 12px', background: '#FFF1F0', border: '1px solid #FFA39E', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="7" stroke="#FF4D4F" strokeWidth="1.5" />
                <path d="M8 5v3M8 10.5v.5" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#B91C1C', lineHeight: '18px' }}>
                Total height exceeds available height{hasFloorH ? <> ({effectiveHeight})</> : ''}.
              </span>
            </div>
          )}

          {/* ── Remaining height widget */}
          {hasFloorH && enabled && (
            <div style={{
              margin: '8px 16px 0', padding: '7px 12px',
              background: budgetExceeds ? '#FFF1F0' : '#F0F7FF',
              border: `1px solid ${budgetExceeds ? '#FFA39E' : '#BAE7FF'}`,
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: budgetExceeds ? '#B91C1C' : '#616D79' }}>
                Remaining height
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: budgetExceeds ? '#B91C1C' : '#1D2C38', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {remainingDisplay}
              </span>
            </div>
          )}

          <div style={{ height: 16 }} />
        </div>
      </div>

      {/* ── Footer §10.4 */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #C3C7CC' }}>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingLeft: 20, paddingRight: 20 }}>
          <button onClick={onClose}
            style={{ height: 36, padding: '0 16px', background: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}>
            {isNewEnable ? 'Cancel' : 'Cancel'}
          </button>
          <button
            onClick={() => canApply && onApply(buildConfig())}
            disabled={!canApply}
            title={!canApply && enabled && !hasAtLeastOnePlenum ? 'Select a plenum and enter a height value to apply' : undefined}
            style={{ height: 36, padding: '0 16px', background: canApply ? '#FF4D00' : '#FFBD9C', border: 'none', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', cursor: canApply ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}
            onMouseEnter={e => { if (canApply) e.currentTarget.style.background = '#FF773E'; }}
            onMouseLeave={e => { if (canApply) e.currentTarget.style.background = '#FF4D00'; }}>
            Apply Changes
          </button>
        </div>
      </div>
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

// ─── Column resize handle (§7.A.7) ──────────────���─────────────────────────────
function ColResizeHandle({ colKey, onDelta, cellHovered }: {
  colKey: string;
  onDelta: (key: string, delta: number) => void;
  cellHovered: boolean;
}) {
  const [active, setActive]               = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
    let lastX = e.clientX;
    const onMove = (me: MouseEvent) => {
      onDelta(colKey, me.clientX - lastX);
      lastX = me.clientX;
    };
    const onUp = () => {
      setActive(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

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
      <div style={{ height: 44, width: 2, background: lineColor, transition: 'background 0.1s', flexShrink: 0 }} />
    </div>
  );
}

// ─── Header cell ──────────────────────────────────────────────────────────────
function LBSHeaderCell({ label, style, editMode = false, required = false, colKey, onDelta, fillFlex = false, stickyLeft, showInfoTooltip = false, devAnchor }: {
  label: string; style?: React.CSSProperties; editMode?: boolean; required?: boolean;
  colKey?: string; onDelta?: (key: string, delta: number) => void; fillFlex?: boolean;
  stickyLeft?: number; showInfoTooltip?: boolean; devAnchor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // Store the icon's center-X and bottom-Y in viewport coords
  const [tooltipAnchor, setTooltipAnchor] = useState({ top: 0, iconCenterX: 0 });
  const infoIconRef = useRef<HTMLButtonElement>(null);
  const showResize = !!colKey && !!onDelta;
  const isSticky = stickyLeft !== undefined;

  const handleInfoEnter = () => {
    if (infoIconRef.current) {
      const rect = infoIconRef.current.getBoundingClientRect();
      setTooltipAnchor({ top: rect.bottom + 8, iconCenterX: rect.left + rect.width / 2 });
    }
    setTooltipVisible(true);
  };
  const handleInfoLeave = () => setTooltipVisible(false);

  // Approximate tooltip width — used for edge-clamping
  const TOOLTIP_W = 226;
  const MARGIN    = 10;

  return (
    <div
      style={{ ...style, position: isSticky ? 'sticky' : 'relative', left: isSticky ? stickyLeft : undefined, zIndex: isSticky ? 21 : undefined, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: showResize ? 10 : 8, overflow: 'clip', cursor: 'default', userSelect: 'none', ...(fillFlex ? { flex: 1, minWidth: 80, flexShrink: 1 } : { flexShrink: 0 }), background: hovered ? '#EEEFF1' : '#FAFAFA', transition: 'background 0.1s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span data-dev-anchor={devAnchor}>{label}</span>
        {required && editMode && (
          <span style={{ color: '#D92D20', fontWeight: 600, fontSize: 13, lineHeight: 1, flexShrink: 0 }}>*</span>
        )}
        {/* ── Figma circle-info icon — placed inline right after the label text */}
        {showInfoTooltip && (
          <button
            ref={infoIconRef}
            onMouseEnter={handleInfoEnter}
            onMouseLeave={handleInfoLeave}
            onClick={e => e.stopPropagation()}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'help', padding: 0, flexShrink: 0, lineHeight: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
              <path d={vsInfoIconPaths.p116a4b00} fill="#348FA8" />
            </svg>
          </button>
        )}
      </span>
      {tooltipVisible && showInfoTooltip && ReactDOM.createPortal(
        (() => {
          // Clamp left so tooltip never overflows either edge of the viewport
          const rawLeft     = tooltipAnchor.iconCenterX - TOOLTIP_W / 2;
          const clampedLeft = Math.max(MARGIN, Math.min(rawLeft, window.innerWidth - TOOLTIP_W - MARGIN));
          // Caret offset from tooltip's left edge — always points at the icon
          const caretLeft   = Math.max(10, Math.min(tooltipAnchor.iconCenterX - clampedLeft, TOOLTIP_W - 10));
          return (
            <div style={{ position: 'fixed', top: tooltipAnchor.top, left: clampedLeft, width: TOOLTIP_W, background: 'rgba(36,55,70,0.9)', borderRadius: 6, padding: '10px 14px', zIndex: 9999, pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.22)' }}>
              {/* Caret — positioned dynamically so it always points at the icon */}
              <div style={{ position: 'absolute', top: -5, left: caretLeft, transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '5px solid rgba(36,55,70,0.9)' }} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.5)', marginBottom: 6, whiteSpace: 'nowrap' }}>Vertical Segments legend</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#FFFFFF', width: 12, textAlign: 'center' as const, flexShrink: 0 }}>C</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.80)', whiteSpace: 'nowrap' }}>Ceiling Plenum</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#FFFFFF', width: 12, textAlign: 'center' as const, flexShrink: 0 }}>F</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.80)', whiteSpace: 'nowrap' }}>Floor Plenum</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '3px 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', width: 12, textAlign: 'center' as const, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>No vertical segmentation</span>
                </div>
              </div>
            </div>
          );
        })(),
        document.body
      )}
      {showResize && <ColResizeHandle colKey={colKey!} onDelta={onDelta!} cellHovered={hovered} />}
    </div>
  );
}

// ─── Edit input ─────────────────────────────────────────��─────────────────────
function EditInput({ value, onChange, placeholder, error, errorMessage }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  error?: boolean; errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const showErrorMsg = !!(error && errorMessage);
  const borderColor = error
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');

  return (
    <div
      style={{ flex: 1, minWidth: 0, position: 'relative', height: 30 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', height: 30,
          paddingLeft: 8, paddingRight: error ? 28 : 8,
          border: `1px solid ${borderColor}`,
          borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 13,
          fontWeight: 400, color: '#344054',
          background: error ? '#FFF1F0' : '#FFFFFF',
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
        }}
      />
      {/* Error icon — always visible when field has an error */}
      {error && (
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
      {/* Error message — floats below, appears only on hover or focus */}
      {showErrorMsg && (
        <div style={{
          position: 'absolute', top: 32, left: 0, right: 0, zIndex: 10,
          fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#FF4D4F',
          lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          pointerEvents: 'none',
        }}>
          {errorMessage}
        </div>
      )}
    </div>
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

// ─── Elevation input ───────────────────────────────────────────────────────────
// Accepts decimal feet (e.g. -28.5) OR ft-in strings (e.g. -28'-6").
// On blur the input value itself is replaced with the canonical ft-in string —
// no helper text below; the conversion IS the displayed value.
function ElevationInput({ storedValue, hasError, errorMsg, onCommit }: {
  storedValue: string;   // stored ft-in string e.g. "13'-9\""
  hasError: boolean;
  errorMsg?: string;
  onCommit: (ftIn: string) => void;
}) {
  const [raw, setRaw]           = useState(storedValue);
  const [localErr, setLocalErr] = useState(false);
  const [focused, setFocused]   = useState(false);
  const [hovering, setHovering] = useState(false);

  // Sync when storedValue changes from outside (tab switch, new row added)
  useEffect(() => {
    setRaw(storedValue);
    setLocalErr(false);
  }, [storedValue]);

  const showErr    = hasError || localErr;
  const showErrMsg = showErr;
  const errMsg     = localErr
    ? 'Enter feet as a number (e.g. −28.5) or ft-in (e.g. −28′-6″)'
    : errorMsg;

  const borderColor = showErr
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');

  function commit(value: string) {
    const trimmed = value.trim();
    if (trimmed === '') {
      setLocalErr(false); setRaw(''); onCommit('');
      return;
    }
    // Use the shared rich parser — accepts all formats (12' 6", 12-6, 12.5, 150", 12ft 6in, …)
    const feet = parseElevationNew(trimmed);
    if (feet !== null && isFinite(feet)) {
      const ftIn = feetToFtIn(feet); // normalises to "X' - Y""
      setLocalErr(false);
      setRaw(ftIn);
      onCommit(ftIn);
      return;
    }
    // Invalid input
    setLocalErr(true);
  }

  return (
    <div
      style={{ flex: 1, minWidth: 0, position: 'relative', height: 30 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        type="text"
        value={raw}
        placeholder={"e.g. 14'-3\" or 14.25 or 171\""}
        onChange={e => { setRaw(e.target.value); setLocalErr(false); }}
        onFocus={() => setFocused(true)}
        onBlur={e => { commit(e.target.value); setFocused(false); }}
        onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        style={{
          width: '100%', height: 30,
          paddingLeft: 8, paddingRight: showErr ? 28 : 8,
          border: `1px solid ${borderColor}`,
          borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 13,
          color: '#344054', background: showErr ? '#FFF1F0' : '#FFFFFF',
          outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
        }}
      />
      {/* Error icon — always visible when field has an error */}
      {showErr && (
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
      {/* Error message — always visible when row is auto-expanded for an error */}
      {showErrMsg && errMsg && (
        <div style={{
          position: 'absolute', top: 32, left: 0, right: 0, zIndex: 10,
          fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#FF4D4F',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          pointerEvents: 'none', paddingLeft: 2,
        }}>
          {errMsg}
        </div>
      )}
    </div>
  );
}

// ─── Toolbar helpers ──────────────────────────────────────────────────────────
function ToolbarBtn({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={disabled}
      style={{
        height: 36, display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 10, paddingRight: 10,
        background: (!disabled && hov) ? '#F5F6F7' : 'transparent',
        border: 'none', borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400,
        color: disabled ? '#BFBFBF' : '#384857',
        whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s',
        opacity: 1,
      }}
    >
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
function CancelBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: hov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${hov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
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
function RemoveBtn({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const [hov, setHov]       = useState(false);
  const [pressed, setPressed] = useState(false);
  const iconColor = disabled ? '#BFBFBF' : pressed ? '#FFFFFF' : '#616D79';
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      title={disabled ? 'The Primary LBS tab cannot be removed' : undefined}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16, paddingRight: 16, background: disabled ? 'transparent' : pressed ? '#616D79' : hov ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: disabled ? '#BFBFBF' : pressed ? '#FFFFFF' : '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s', opacity: 1 }}
    >
      <TrashIconSVG color={iconColor} />
      <span>Remove</span>
    </button>
  );
}

// ─── Add Level icon (toolbar size — same nodeAddPaths, rendered at 18×18) ─────
function NodeAddNewIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 17 21.5" fill="none" style={{ flexShrink: 0 }}>
      <path d={nodeAddPaths.pa8e4980} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={nodeAddPaths.pfdc0100} stroke={color} strokeWidth="1.5" />
      <path d={nodeAddPaths.p5df2960} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
// ─── Building icon (Figma asset — Building06) ─────────────────────────────────
function BuildingIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <g>
        <path d={buildingIconPaths.pfb6b0e0} stroke={color} strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <path d={buildingIconPaths.p36f6d900} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={buildingIconPaths.p23154580} stroke={color} strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Add Building button (Secondary Medium §15.2) ─────────────────────────────
function AddBuildingBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov]       = useState(false);
  const [pressed, setPressed] = useState(false);
  const bg     = pressed ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4';
  const border = pressed ? '#616D79' : hov ? '#616D79' : '#C3C7CC';
  const color  = pressed ? '#FFFFFF' : '#616D79';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      title="Add a new Building to this LBS"
      style={{
        height: 36,
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        color,
        cursor: 'pointer',
        transition: 'background 0.15s, border-color 0.15s',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      <BuildingIcon color={color} />
      <span>Add Building</span>
    </button>
  );
}

// ─── Add Level button (Secondary Medium §15.2) ────────────────────────────────
function AddLevelBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov]       = useState(false);
  const [pressed, setPressed] = useState(false);
  const bg      = pressed ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4';
  const border  = pressed ? '#616D79' : hov ? '#616D79' : '#C3C7CC';
  const color   = pressed ? '#FFFFFF' : '#616D79';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      title="Add a new Level row to this LBS"
      style={{
        height: 36,
        display: 'flex', alignItems: 'center', gap: 6,
        paddingLeft: 12, paddingRight: 14,
        background: bg, border: `1px solid ${border}`, borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color,
        whiteSpace: 'nowrap',
        transition: 'background 0.15s, border-color 0.15s',
        flexShrink: 0,
      }}
    >
      <NodeAddNewIcon color={color} />
      <span>Add Level</span>
    </button>
  );
}

// ─── Compact inline action button (30px, no icon) — used in table Actions cells ─
function RowActionBtn({
  label, onClick, variant = 'secondary', title,
}: {
  label: string; onClick: () => void; variant?: 'secondary' | 'remove'; title?: string;
}) {
  const [hov, setHov]     = useState(false);
  const [press, setPress] = useState(false);
  const isRemove = variant === 'remove';
  const bg     = isRemove
    ? press ? '#FFE4E3' : hov ? '#FFE4E3' : '#FFF1F0'
    : press ? '#616D79' : hov ? '#E5E7E9' : '#F2F3F4';
  const border = isRemove
    ? press ? '#FFA39E' : hov ? '#FFA39E' : '#FFA39E'
    : press ? '#616D79' : hov ? '#616D79' : '#C3C7CC';
  const color  = isRemove
    ? '#D92D20'
    : press ? '#FFFFFF' : '#616D79';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      title={title}
      style={{
        height: 30, padding: '0 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg, border: `1px solid ${border}`, borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color,
        whiteSpace: 'nowrap', flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {label}
    </button>
  );
}

// ─── Create LBS Modal ─────────────────────��────────────────────────────────────

/** Portalled discipline dropdown used inside CreateLBSModal. */
function DisciplineDropdown({ value, onChange }: { value: LBSType; onChange: (v: LBSType) => void }) {
  const [open, setOpen]               = useState(false);
  const [query, setQuery]             = useState('');
  const [hovItem, setHovItem]         = useState<string | null>(null);
  const triggerRef                    = useRef<HTMLDivElement>(null);
  const inputRef                      = useRef<HTMLInputElement>(null);
  const [menuStyle, setMenuStyle]     = useState<React.CSSProperties>({});

  const filtered = query.length >= 2
    ? LBS_TYPES.filter(t => t.toLowerCase().includes(query.toLowerCase()))
    : LBS_TYPES;

  function openMenu() {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
      background: '#FFFFFF',
      borderRadius: 4,
      boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)',
      padding: '4px 0',
      zIndex: 9999,
      maxHeight: 320,
      overflowY: 'auto',
    });
    setOpen(true);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function closeMenu() { setOpen(false); setQuery(''); }

  function pick(v: LBSType) { onChange(v); closeMenu(); }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) return;
      closeMenu();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const chevronColor = open ? '#91D5FF' : '#9EA3A9';

  return (
    <>
      {/* Trigger */}
      <div ref={triggerRef}
        onClick={() => open ? closeMenu() : openMenu()}
        style={{
          height: 40, width: '100%', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 10, paddingRight: 10,
          border: `1px solid ${open ? '#91D5FF' : '#D0D5DD'}`,
          borderRadius: 4, background: '#FFFFFF',
          cursor: 'pointer', userSelect: 'none',
          transition: 'border-color 0.15s',
          position: 'relative',
        }}>
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
              lineHeight: '20px', color: '#344054',
            }}
          />
        ) : (
          <span style={{
            fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400,
            lineHeight: '20px',
            color: '#344054',
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {value}
          </span>
        )}
        {/* Chevron */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
          <path d="M4 6l4 4 4-4" stroke={chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Portalled menu */}
      {open && ReactDOM.createPortal(
        <div style={menuStyle}>
          {/* Discipline options */}
          {filtered.length === 0 ? (
            <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>
              No results found
            </div>
          ) : filtered.map(opt => {
            const selected = value === opt;
            return (
              <div key={opt}
                onMouseEnter={() => setHovItem(opt)}
                onMouseLeave={() => setHovItem(null)}
                onMouseDown={e => { e.preventDefault(); pick(opt); }}
                style={{
                  height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingLeft: 12, paddingRight: 12,
                  background: selected ? '#E6F7FF' : hovItem === opt ? '#F5F5F5' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.1s',
                  fontFamily: 'Inter, sans-serif', fontSize: 14,
                  fontWeight: selected ? 600 : 400, color: '#384857',
                }}>
                <span>{opt}</span>
                {selected && (
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function CreateLBSModal({ onConfirm, onClose }: { onConfirm: (name: string, type: LBSType) => void; onClose: () => void }) {
  const [name, setName]               = useState('');
  const [type, setType]               = useState<LBSType>('Zone Structure');
  const [nameFocused, setNameFocused] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [cancelHov, setCancelHov]     = useState(false);
  const [createHov, setCreateHov]     = useState(false);
  const nameRef                       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const trimmedName = name.trim();
  const nameValid   = trimmedName.length >= 3;
  const nameError   = nameTouched && !nameValid;
  const nameBorder  = nameError ? '#FFA39E' : nameFocused ? '#91D5FF' : '#D0D5DD';

  function handleCreate() {
    setNameTouched(true);
    if (!nameValid) return;
    onConfirm(trimmedName, type);
  }

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 480, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Create New LBS
            </p>
            <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Name field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#344054' }}>
              Name <span style={{ color: '#D92D20' }}>*</span>
            </label>
            <input ref={nameRef} type="text" value={name} onChange={e => setName(e.target.value)}
              onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
              placeholder="e.g. Phase 2 Structure, Structural LBS…"
              style={{ width: '100%', height: 40, boxSizing: 'border-box', paddingLeft: 10, paddingRight: 10, border: `1px solid ${nameBorder}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#344054', background: nameError ? '#FFF1F0' : '#FFFFFF', outline: 'none', transition: 'border-color 0.15s' }}
            />
            {nameError
              ? <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#D92D20', lineHeight: '16px' }}>Name must be at least 3 characters.</span>
              : <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#667085', lineHeight: '16px' }}>Minimum 3 characters required.</span>
            }
          </div>
          {/* Type field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#344054' }}>
              Type
            </label>
            <DisciplineDropdown value={type} onChange={setType} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#667085', lineHeight: '16px' }}>
              Choose how this LBS will organize project locations and field work.
            </span>
          </div>
        </div>
        {/* Footer */}
        <div style={{ height: 72, flexShrink: 0, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingLeft: 28, paddingRight: 28 }}>
          <button onClick={onClose} onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${cancelHov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
            Cancel
          </button>
          <button onClick={handleCreate} disabled={!nameValid && nameTouched}
            onMouseEnter={() => nameValid && setCreateHov(true)} onMouseLeave={() => setCreateHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: (!nameValid && nameTouched) ? '#FFBD9C' : createHov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: (!nameValid && nameTouched) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Export LBS Modal ──────────────────────────────────────────────────────────
function makeLBSTimestamp() {
  const d   = new Date();
  const pad = (n: number, l = 2) => String(n).padStart(l, '0');
  return String(d.getFullYear()) + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes());
}

/** Flatten an LBSItem tree to CSV rows, computing full codes and inherited elevations. */
function flattenLBSToCSV(items: LBSItem[], sep: string, prefix = '', ancestorLevelElev: string | null = null): string[] {
  const rows: string[] = [];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  for (const item of items) {
    const fullCode = prefix ? `${prefix}${sep}${item.code}` : item.code;
    const isLvl   = isLevelType(item.type);
    const elev    = isLvl ? item.elevation : (ancestorLevelElev ?? '');
    rows.push([esc(item.name), esc(item.code), esc(fullCode), esc(item.type), esc(elev)].join(','));
    rows.push(...flattenLBSToCSV(item.children, sep, fullCode, isLvl ? item.elevation : ancestorLevelElev));
  }
  return rows;
}

function ExportLBSModal({ tabLabel, items, sep, onClose }: {
  tabLabel: string; items: LBSItem[]; sep: string; onClose: () => void;
}) {
  const makeDefault              = () => `${tabLabel.replace(/\s+/g, '')}-${makeLBSTimestamp()}`;
  const [filename, setFilename]  = useState(makeDefault);
  const [focused, setFocused]    = useState(false);

  useEffect(() => { setFilename(makeDefault()); }, [tabLabel]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  function handleExport() {
    const header = 'Location Name,Location Code,Full Code,Type,Elevation (ft-in)';
    const csv    = [header, ...flattenLBSToCSV(items, sep, PROJECT_INFO.code || '')].join('\n');
    const blob   = new Blob([csv], { type: 'text/csv' });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement('a');
    a.href = url; a.download = `${filename || 'lbs-export'}.csv`; a.click();
    URL.revokeObjectURL(url);
    onClose();
  }

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 500, backgroundColor: 'rgba(0,0,0,0.20)' }} onClick={onClose} />

      {/* Modal shell */}
      <div
        style={{
          position: 'fixed', zIndex: 501, top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 48px)',
          backgroundColor: '#FFFFFF', borderRadius: 8,
          boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header §10.3 ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Export to CSV
            </p>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, borderRadius: 40, transition: 'background-color 0.15s' }}
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
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 24px 24px' }}>

            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', margin: 0 }}>
              Exporting to CSV gives you a quick way to review, edit, or share your project&apos;s
              location breakdown structure outside the platform, whether for coordination with
              other teams, bulk updates, or offline audits.
            </p>

            {/* Filename input + .csv badge */}
            <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
              <div style={{
                flex: 1, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center',
                padding: '0 12px', minHeight: 40, borderRadius: '4px 0 0 4px',
                border: `1px solid ${focused ? '#91D5FF' : '#9EA2A8'}`, borderRight: 'none',
                transition: 'border-color 0.15s',
              }}>
                <input
                  type="text" value={filename}
                  onChange={e => setFilename(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{ width: '100%', outline: 'none', background: 'transparent', fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: '1.2', color: '#243746', border: 'none', padding: 0 }}
                  spellCheck={false}
                />
              </div>
              <div style={{
                backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 12px', minHeight: 40, flexShrink: 0, width: 60,
                borderRadius: '0 4px 4px 0', border: '1px solid #9EA2A8', borderLeft: 'none',
              }}>
                <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 14, color: '#9EA3A9', userSelect: 'none' }}>.csv</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer §10.4 ── */}
        <div style={{ backgroundColor: '#FFFFFF', height: 72, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingRight: 28, paddingLeft: 28, borderTop: '1px solid #C3C7CC' }}>
          <button
            onClick={onClose}
            style={{ backgroundColor: '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, height: 36, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.15s, border-color 0.15s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F2F3F4'; e.currentTarget.style.borderColor = '#C3C7CC'; }}
            onMouseDown={e => { e.currentTarget.style.backgroundColor = '#616D79'; e.currentTarget.style.borderColor = '#616D79'; const s = e.currentTarget.querySelector('span'); if (s) (s as HTMLElement).style.color = '#FFFFFF'; }}
            onMouseUp={e => { e.currentTarget.style.backgroundColor = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; const s = e.currentTarget.querySelector('span'); if (s) (s as HTMLElement).style.color = '#616D79'; }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#616D79' }}>Cancel</span>
          </button>
          <button
            onClick={handleExport}
            style={{ backgroundColor: '#FF4D00', border: 'none', borderRadius: 4, height: 36, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.15s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF4D00')}
            onMouseDown={e => (e.currentTarget.style.backgroundColor = '#D4380D')}
            onMouseUp={e => (e.currentTarget.style.backgroundColor = '#FF773E')}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#FFFFFF' }}>Export</span>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

// ─── Remove Tab Modal ──────────────────────────────────────────────────────────
function RemoveLBSModal({ tabLabel, onConfirm, onClose }: { tabLabel: string; onConfirm: () => void; onClose: () => void }) {
  const [input, setInput]         = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [cancelHov, setCancelHov] = useState(false);
  const [removeHov, setRemoveHov] = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const confirmed                 = input.trim().toLowerCase() === 'remove';

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 460, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0 }}>Remove LBS</p>
            <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 6.5V10.5M10 13.5v.5" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="10" r="8.25" stroke="#D92D20" strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: '20px', color: '#1D2C38' }}>
                Remove <span style={{ fontStyle: 'italic', color: '#384857' }}>"{tabLabel}"</span>?
              </p>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                This will permanently delete the LBS and all its location nodes. Any project elements currently tagged to locations in this breakdown will lose their location assignments.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#384857' }}>
              Type <strong style={{ fontWeight: 600 }}>remove</strong> to confirm:
            </label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="remove"
              style={{ height: 36, width: '100%', boxSizing: 'border-box', paddingLeft: 10, paddingRight: 10, border: `1px solid ${inputFocused ? '#91D5FF' : '#D0D5DD'}`, borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#344054', background: '#FFFFFF', outline: 'none', transition: 'border-color 0.15s' }}
            />
          </div>
        </div>
        {/* Footer */}
        <div style={{ height: 72, flexShrink: 0, background: '#FFFFFF', borderTop: '1px solid #C3C7CC', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingLeft: 28, paddingRight: 28 }}>
          <button onClick={onClose} onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${cancelHov ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}>
            Cancel
          </button>
          <button onClick={confirmed ? onConfirm : undefined} disabled={!confirmed}
            onMouseEnter={() => confirmed && setRemoveHov(true)} onMouseLeave={() => setRemoveHov(false)}
            style={{ height: 36, paddingLeft: 16, paddingRight: 16, background: !confirmed ? 'rgba(217,45,32,0.35)' : removeHov ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: !confirmed ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
            Remove
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Delete Row Warning Modal ─────────────────────────────────────────────────
function DeleteRowWarningModal({ item, tabLabel, onConfirm, onCancel }: {
  item: LBSItem; tabLabel: string;
  onConfirm: (dontShowAgain: boolean) => void; onCancel: () => void;
}) {
  const [dontShow, setDontShow] = useState(false);
  const [confirmHov, setConfirmHov] = useState(false);
  const [cancelHov, setCancelHov]   = useState(false);
  const [checkHov, setCheckHov]     = useState(false);
  const displayName = item.name || item.code || 'this location';

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ width: 520, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>Remove Location</p>
            <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                Removing{' '}<span style={{ fontStyle: 'italic', color: '#384857' }}>"{displayName}"</span>{' '}
                from <span style={{ color: '#384857' }}>{tabLabel}</span> will also remove all its child locations.
              </p>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                Any project elements, inspections, issues, drawings, or RFIs, currently tagged to this location or any of its children will lose their location assignment. This action cannot be undone.
              </p>
            </div>
          </div>
          {/* Don't show again */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', padding: '2px 0' }}
            onClick={() => setDontShow(v => !v)}
            onMouseEnter={() => setCheckHov(true)}
            onMouseLeave={() => setCheckHov(false)}>
            <div style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0, background: dontShow ? '#0E70CB' : checkHov ? '#F0F7FF' : '#FFFFFF', border: `1px solid ${dontShow ? '#0E70CB' : checkHov ? '#0E70CB' : '#D0D5DD'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s' }}>
              {dontShow && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#384857' }}>Don't show this message again</span>
          </div>
        </div>
        {/* Footer */}
        <div style={{ height: 72, borderTop: '1px solid #C3C7CC', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#FFFFFF' }}>
          <button onClick={onCancel} onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, padding: '0 16px', background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s', whiteSpace: 'nowrap' }}>
            Cancel
          </button>
          <button onClick={() => onConfirm(dontShow)} onMouseEnter={() => setConfirmHov(true)} onMouseLeave={() => setConfirmHov(false)}
            style={{ height: 36, padding: '0 20px', background: confirmHov ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
            Remove Location
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Delete Vertical Zone Warning Modal ──────────────────────────────────────
function DeleteZoneWarningModal({ zone, onConfirm, onCancel }: {
  zone: VerticalZone;
  onConfirm: (dontShowAgain: boolean) => void; onCancel: () => void;
}) {
  const [dontShow, setDontShow] = useState(false);
  const [confirmHov, setConfirmHov] = useState(false);
  const [cancelHov, setCancelHov]   = useState(false);
  const [checkHov, setCheckHov]     = useState(false);
  const displayName = zone.name || zone.code || 'this vertical zone';

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ width: 520, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>Remove Vertical Zone</p>
            <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>
        {/* Body */}
        <div style={{ padding: '24px 28px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                Removing{' '}<span style={{ fontStyle: 'italic', color: '#384857' }}>"{displayName}"</span>{' '}
                will permanently delete this vertical zone.
              </p>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#616D79' }}>
                Any project elements, drawings, or RFIs currently tagged to this vertical zone will lose their assignment. This action cannot be undone.
              </p>
            </div>
          </div>
          {/* Don't show again */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', padding: '2px 0' }}
            onClick={() => setDontShow(v => !v)}
            onMouseEnter={() => setCheckHov(true)}
            onMouseLeave={() => setCheckHov(false)}>
            <div style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0, background: dontShow ? '#0E70CB' : checkHov ? '#F0F7FF' : '#FFFFFF', border: `1px solid ${dontShow ? '#0E70CB' : checkHov ? '#0E70CB' : '#D0D5DD'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s' }}>
              {dontShow && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#384857' }}>Don't show this message again</span>
          </div>
        </div>
        {/* Footer */}
        <div style={{ height: 72, borderTop: '1px solid #C3C7CC', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#FFFFFF' }}>
          <button onClick={onCancel} onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, padding: '0 16px', background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s', whiteSpace: 'nowrap' }}>
            Cancel
          </button>
          <button onClick={() => onConfirm(dontShow)} onMouseEnter={() => setConfirmHov(true)} onMouseLeave={() => setConfirmHov(false)}
            style={{ height: 36, padding: '0 20px', background: confirmHov ? '#B42318' : '#D92D20', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'background 0.15s' }}>
            Remove Vertical Zone
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Auto-sizing tab input ────────────────────────────────────────────────────
function AutoSizeTabInput({ initialValue, onCommit, onCancel }: { initialValue: string; onCommit: (v: string) => void; onCancel: () => void }) {
  const [value, setValue] = useState(initialValue);
  const [width, setWidth] = useState(80);
  const spanRef           = useRef<HTMLSpanElement>(null);
  const inputRef          = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);
  useEffect(() => {
    if (spanRef.current) setWidth(Math.max(spanRef.current.offsetWidth + 24, 80));
  }, [value]);
  function commit() { const v = value.trim(); if (v) onCommit(v); else onCancel(); }
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span ref={spanRef} aria-hidden style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', whiteSpace: 'pre', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, paddingLeft: 12, paddingRight: 12 }}>{value || ' '}</span>
      <input ref={inputRef} type="text" value={value} onChange={e => setValue(e.target.value)}
        onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') commit(); if (e.key === 'Escape') onCancel(); }}
        onBlur={commit} onClick={e => e.stopPropagation()}
        style={{ width, height: 28, boxSizing: 'border-box', paddingLeft: 8, paddingRight: 8, border: '1.5px solid #91D5FF', borderRadius: 3, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#243746', background: '#FFFFFF', outline: 'none', transition: 'width 0.08s' }}
      />
    </div>
  );
}

// ─── VZ Type Dropdown ─────────────────────────────────────────────────────────
function VZTypeDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen]       = useState(false);
  const [hov, setHov]         = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!(e.target as Element)?.closest('[data-vztype-menu]')) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  function toggle() {
    if (btnRef.current) { const r = btnRef.current.getBoundingClientRect(); setMenuPos({ top: r.bottom + window.scrollY + 2, left: r.left + window.scrollX, width: Math.max(r.width, 160) }); }
    setOpen(o => !o);
  }
  const bc = open ? '#91D5FF' : hov ? '#A8B0BB' : '#D0D5DD';
  return (
    <>
      <button ref={btnRef} data-vztype-menu onClick={e => { e.stopPropagation(); toggle(); }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ flex: 1, minWidth: 0, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 6, background: '#FFFFFF', border: `1px solid ${bc}`, borderRadius: 4, cursor: 'pointer', transition: 'border-color 0.15s', fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: value ? '#344054' : '#9EA3A9', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, textAlign: 'left' }}>{value || 'Select type…'}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0, marginLeft: 4 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && ReactDOM.createPortal(
        <div data-vztype-menu style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, minWidth: menuPos.width, zIndex: 9999, background: '#FFFFFF', borderRadius: 4, boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)', padding: '4px 0', border: '1px solid #E0E4E8', maxHeight: 320, overflowY: 'auto' }}>
          <div onMouseDown={e => { e.stopPropagation(); onChange(''); setOpen(false); }}
            style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 12px', cursor: 'pointer', background: value === '' ? '#E6F7FF' : 'transparent', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#9EA3A9', fontStyle: 'italic' }}
            onMouseEnter={e => { if (value !== '') (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = value === '' ? '#E6F7FF' : 'transparent'; }}>
            — None —
          </div>
          <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
          {VZONE_TYPES.map(opt => {
            const isSel = value === opt;
            return (
              <div key={opt} onMouseDown={e => { e.stopPropagation(); onChange(opt); setOpen(false); }}
                style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', cursor: 'pointer', background: isSel ? '#E6F7FF' : 'transparent', transition: 'background 0.1s', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isSel ? 600 : 400, color: isSel ? '#096DD9' : '#384857' }}
                onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSel ? '#E6F7FF' : 'transparent'; }}>
                <span>{opt}</span>
                {isSel && <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0 }}><path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Orphan Level Badge ───────────────────────────────────────────────────────
function OrphanLevelBadge() {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      top: r.top + window.scrollY - 6,   // 6px gap above icon; tooltip extends upward via transform
      left: r.left + window.scrollX + r.width / 2,
    });
  }

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setPos(null)}
        style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', width: 16, height: 16 }}
      >
        <svg width="16" height="14" viewBox="0 0 14.4926 12.75" fill="none">
          <path clipRule="evenodd" d={exclPaths.p3b8bf570} fill="#FAAD14" fillRule="evenodd" />
        </svg>
      </div>
      {pos !== null && ReactDOM.createPortal(
        <div style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          transform: 'translate(-50%, -100%)',
          zIndex: 9999,
          pointerEvents: 'none',
          paddingBottom: 6,
        }}>
          {/* Popover card */}
          <div style={{
            width: 240,
            borderRadius: 4,
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.15)',
            border: '1px solid #D9D9D9',
          }}>
            {/* Title */}
            <div style={{ padding: '5px 16px', background: '#FFFFFF' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#434343', margin: 0 }}>
                Orphan Level
              </p>
            </div>
            {/* Divider */}
            <div style={{ height: 1, background: '#D9D9D9' }} />
            {/* Content */}
            <div style={{ padding: '12px 16px', background: '#FFFFFF' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#595959', margin: 0 }}>
                This &ldquo;Level&rdquo; is no longer part of the LBS but is preserved for historical accuracy. Select a new value to replace it.
              </p>
            </div>
          </div>
          {/* Down-pointing arrow */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
              <path d="M0 0L7 7L14 0Z" fill="#FFFFFF" />
              <path d="M0 0L7 7L14 0" stroke="#D9D9D9" strokeWidth="1" />
            </svg>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Level Dropdown ───────────────────────────────────────────────────────────
function LevelDropdown({ value, onChange, levelNodes, placeholder = 'Select level…', orphanName }: {
  value: string; onChange: (id: string) => void; levelNodes: LevelNode[]; placeholder?: string; orphanName?: string;
}) {
  const [open, setOpen]       = useState(false);
  const [hov, setHov]         = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!(e.target as Element)?.closest('[data-level-menu]')) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  function toggle() {
    if (btnRef.current) { const r = btnRef.current.getBoundingClientRect(); setMenuPos({ top: r.bottom + window.scrollY + 2, left: r.left + window.scrollX, width: Math.max(r.width, 180) }); }
    setOpen(o => !o);
  }
  const selectedNode = levelNodes.find(n => n.id === value);
  const isOrphan = !selectedNode && !!value && !!orphanName;
  const bc = open ? '#91D5FF' : hov ? '#A8B0BB' : isOrphan ? '#FAAD14' : '#D0D5DD';
  const textColor = selectedNode ? '#344054' : isOrphan ? '#8C8C8C' : '#9EA3A9';
  return (
    <>
      <button ref={btnRef} data-level-menu onClick={e => { e.stopPropagation(); toggle(); }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ flex: 1, minWidth: 0, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 6, background: '#FFFFFF', border: `1px solid ${bc}`, borderRadius: 4, cursor: 'pointer', transition: 'border-color 0.15s', fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400, color: textColor, whiteSpace: 'nowrap', overflow: 'hidden' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, textAlign: 'left' }}>{selectedNode ? selectedNode.name : isOrphan ? orphanName : placeholder}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0, marginLeft: 4 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke={open ? '#91D5FF' : '#9EA3A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && ReactDOM.createPortal(
        <div data-level-menu style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, minWidth: menuPos.width, zIndex: 9999, background: '#FFFFFF', borderRadius: 4, boxShadow: '0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)', padding: '4px 0', border: '1px solid #E0E4E8', maxHeight: 320, overflowY: 'auto' }}>
          <div onMouseDown={e => { e.stopPropagation(); onChange(''); setOpen(false); }}
            style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 12px', cursor: 'pointer', background: value === '' ? '#E6F7FF' : 'transparent', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#9EA3A9', fontStyle: 'italic' }}
            onMouseEnter={e => { if (value !== '') (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = value === '' ? '#E6F7FF' : 'transparent'; }}>
            — None —
          </div>
          <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
          {levelNodes.length === 0
            ? <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9EA3A9' }}>No levels defined</div>
            : levelNodes.map(node => {
                const isSel = value === node.id;
                return (
                  <div key={node.id} onMouseDown={e => { e.stopPropagation(); onChange(node.id); setOpen(false); }}
                    style={{ minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 12px', cursor: 'pointer', background: isSel ? '#E6F7FF' : 'transparent', transition: 'background 0.1s', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isSel ? 600 : 400, color: isSel ? '#096DD9' : '#384857' }}
                    onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSel ? '#E6F7FF' : 'transparent'; }}>
                    <div>
                      <div>{node.name || '—'}</div>
                      {node.elevation && <div style={{ fontSize: 11, color: isSel ? '#4D7CFE' : '#9CA4AE', fontWeight: 400 }}>{node.elevation}</div>}
                    </div>
                    {isSel && <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ flexShrink: 0, marginLeft: 8 }}><path d="M1 5l3.5 3.5L12 1" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                );
              })
          }
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Vertical Zones Tab Icon ──────────────────────────────────────────────────
function VerticalZonesTabIcon({ color = '#616D79' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 5h14M2 9h14M2 13h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 2v14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 5L9 2L11.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Add Zone Button ──────────────────────────────────────────────────────────
function AddZoneBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 36, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 14, paddingRight: 14, background: hov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: 'white', whiteSpace: 'nowrap', transition: 'background 0.15s', flexShrink: 0 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <span>Add Vertical Zone</span>
    </button>
  );
}

// ─── Vertical Zone Detail Panel ───────────────────────────────────────────────
function VerticalZoneDetailPanel({ zone, levelNodes, allLbsNodes, onClose, onUpdate }: {
  zone: VerticalZone; levelNodes: LevelNode[]; allLbsNodes: FlatLBSNode[];
  onClose: () => void; onUpdate: (zone: VerticalZone) => void;
}) {
  const [showAddLocation, setShowAddLocation] = useState(false);
  const startNode     = levelNodes.find(n => n.id === zone.startLevelId);
  const endNode       = levelNodes.find(n => n.id === zone.endLevelId);
  const startIsOrphan = !startNode && !!zone.startLevelId;
  const endIsOrphan   = !endNode   && !!zone.endLevelId;

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  function toggleLocation(nodeId: string) {
    const updated = zone.linkedLocationIds.includes(nodeId)
      ? zone.linkedLocationIds.filter(id => id !== nodeId)
      : [...zone.linkedLocationIds, nodeId];
    onUpdate({ ...zone, linkedLocationIds: updated });
  }

  const linkedNodes = allLbsNodes.filter(n => zone.linkedLocationIds.includes(n.id));

  return (
    <div style={{ width: 360, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', overflow: 'hidden' }}>
      {/* Header §11.0 */}
      <div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <span style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 20, color: '#1B2736', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {zone.name || 'Zone Details'}
          </span>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Basic Info */}
        <section>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Basic Info</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Name</div>
              <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626' }}>{zone.name || '—'}</div>
            </div>
            {zone.code && (
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Code</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{zone.code}</div>
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Type</div>
              {zone.type
                ? <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '2px 8px', background: '#E5E7E9', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79' }}>{zone.type}</span>
                : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
              }
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Levels</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626' }}>
                {/* Start level + optional orphan badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: startIsOrphan ? '#8C8C8C' : '#262626' }}>
                    {startIsOrphan ? (zone.startLevelName || zone.startLevelId) : (startNode?.name || '—')}
                  </span>
                  {startIsOrphan && <OrphanLevelBadge />}
                </div>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 5h12M8 1l4 4-4 4" stroke="#9CA4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* End level + optional orphan badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: endIsOrphan ? '#8C8C8C' : '#262626' }}>
                    {endIsOrphan ? (zone.endLevelName || zone.endLevelId) : (endNode?.name || '—')}
                  </span>
                  {endIsOrphan && <OrphanLevelBadge />}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Elevation Start</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{zone.elevationStart || '—'}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Elevation End</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{zone.elevationEnd || '—'}</div>
              </div>
            </div>
            {zone.description && (
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#384857', marginBottom: 3 }}>Description</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#616D79', lineHeight: '18px' }}>{zone.description}</div>
              </div>
            )}
          </div>
        </section>

        <div style={{ height: 1, background: '#F0F0F0' }} />

        {/* Linked Locations */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Linked Locations{zone.linkedLocationIds.length > 0 && ` (${zone.linkedLocationIds.length})`}
            </div>
            <button onClick={() => setShowAddLocation(v => !v)}
              style={{ height: 28, display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 10, paddingRight: 10, background: showAddLocation ? '#E5E7E9' : '#F2F3F4', border: `1px solid ${showAddLocation ? '#616D79' : '#C3C7CC'}`, borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#616D79', whiteSpace: 'nowrap', transition: 'background 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E5E7E9'; e.currentTarget.style.borderColor = '#616D79'; }}
              onMouseLeave={e => { e.currentTarget.style.background = showAddLocation ? '#E5E7E9' : '#F2F3F4'; e.currentTarget.style.borderColor = showAddLocation ? '#616D79' : '#C3C7CC'; }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" /></svg>
              <span>Add Location</span>
            </button>
          </div>

          {/* Picker */}
          {showAddLocation && (
            <div style={{ border: '1px solid #D0D5DD', borderRadius: 4, background: '#FFFFFF', marginBottom: 12, maxHeight: 200, overflowY: 'auto' }}>
              {allLbsNodes.length === 0
                ? <div style={{ padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9EA3A9' }}>No locations defined</div>
                : allLbsNodes.map(node => {
                    const isLinked = zone.linkedLocationIds.includes(node.id);
                    return (
                      <div key={node.id} onClick={() => toggleLocation(node.id)}
                        style={{ height: 32, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 8 + node.depth * 10, paddingRight: 12, cursor: 'pointer', background: isLinked ? '#E6F7FF' : 'transparent', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#384857', transition: 'background 0.1s' }}
                        onMouseEnter={e => { if (!isLinked) (e.currentTarget as HTMLElement).style.background = '#F5F5F5'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isLinked ? '#E6F7FF' : 'transparent'; }}>
                        <div style={{ width: 14, height: 14, borderRadius: 2, flexShrink: 0, background: isLinked ? '#0E70CB' : '#FFFFFF', border: `1px solid ${isLinked ? '#0E70CB' : '#D0D5DD'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s' }}>
                          {isLinked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{node.name || node.code || 'Untitled'}</span>
                        {node.fullCode && <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE', flexShrink: 0 }}>{node.fullCode}</span>}
                      </div>
                    );
                  })
              }
            </div>
          )}

          {/* Linked list */}
          {linkedNodes.length === 0
            ? <div style={{ textAlign: 'center', padding: '12px 0', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>No locations linked</div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {linkedNodes.map(node => (
                  <div key={node.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: 4, background: '#F9FAFB', border: '1px solid #F0F0F0' }}>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.name || node.code}</div>
                      {node.fullCode && <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#9CA4AE' }}>{node.fullCode}</div>}
                    </div>
                    <button onClick={() => toggleLocation(node.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: '#8C8C8C', flexShrink: 0, borderRadius: 2, transition: 'color 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D92D20')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8C8C8C')}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                ))}
              </div>
          }
        </section>
      </div>
    </div>
  );
}

// ─── Vertical Zones Table ─────────────────────────────────────────────────────
function VerticalZonesTable({ zones, setZones, levelNodes, allLbsNodes, tabs }: {
  zones: VerticalZone[];
  setZones: React.Dispatch<React.SetStateAction<VerticalZone[]>>;
  levelNodes: LevelNode[];
  allLbsNodes: FlatLBSNode[];
  tabs: LBSTab[];
}) {
  const [editMode,           setEditMode]           = useState(false);
  const [editZones,          setEditZones]          = useState<VerticalZone[]>([]);
  const [search,             setSearch]             = useState('');
  const [clearHov,           setClearHov]           = useState(false);
  const [selectedRowId,      setSelectedRowId]      = useState<string | null>(null);
  const [hoveredRowId,       setHoveredRowId]       = useState<string | null>(null);
  const [collapsedBuildings, setCollapsedBuildings] = useState<Set<string>>(new Set());
  const [showErrors,         setShowErrors]         = useState(false); // §26 — gates error visibility until first save attempt
  const [deleteZoneWarning,  setDeleteZoneWarning]  = useState<{ zone: VerticalZone } | null>(null);

  function toggleBuilding(bid: string) {
    setCollapsedBuildings(prev => {
      const next = new Set(prev);
      next.has(bid) ? next.delete(bid) : next.add(bid);
      return next;
    });
  }

  const [colWidths, setColWidths] = useState({ name: 200, code: 110, type: 140, startLevel: 150, endLevel: 150, elevStart: 72, elevEnd: 72, desc: 220 });
  function onColDelta(key: string, delta: number) {
    setColWidths(prev => ({ ...prev, [key]: Math.max(80, (prev as Record<string, number>)[key] + delta) }));
  }

  function enterEdit() { setEditZones(JSON.parse(JSON.stringify(zones))); setEditMode(true); setSelectedRowId(null); setShowErrors(false); }
  function cancelEdit() { setEditMode(false); setEditZones([]); setShowErrors(false); }
  function saveEdit() {
    // §26 — run validation engine; if any errors exist, reveal them and abort
    const errors = validateZones(editZones);
    if (errors.size > 0) { setShowErrors(true); return; }
    setZones(editZones); setEditMode(false); setEditZones([]); setShowErrors(false);
  }
  function updZone(id: string, patch: Partial<VerticalZone>) {
    setEditZones(p => p.map(z => z.id === id ? { ...z, ...patch } : z));
    // No manual error-state mutation — errors are derived from editZones via allZoneErrors (§26)
  }

  // §26 — Layer 1: live validation engine (runs on every editZones change)
  const allZoneErrors = useMemo(
    () => editMode ? validateZones(editZones) : new Map<string, string>(),
    [editZones, editMode]
  );
  // §26 — Layer 1 gate: only show errors after the first save attempt
  const vzEditErrors = showErrors ? allZoneErrors : new Map<string, string>();

  function requestDelZone(zone: VerticalZone) {
    const dismissed = localStorage.getItem(DELETE_VZ_WARNING_KEY) === 'true';
    if (dismissed) {
      setEditZones(p => p.filter(z => z.id !== zone.id));
    } else {
      setDeleteZoneWarning({ zone });
    }
  }
  function confirmDelZone(dontShowAgain: boolean) {
    if (!deleteZoneWarning) return;
    if (dontShowAgain) localStorage.setItem(DELETE_VZ_WARNING_KEY, 'true');
    setEditZones(p => p.filter(z => z.id !== deleteZoneWarning.zone.id));
    setDeleteZoneWarning(null);
  }
  function addZone() {
    const newZ: VerticalZone = { id: uid(), name: '', code: '', type: '', startLevelId: '', endLevelId: '', elevationStart: '', elevationEnd: '', description: '', linkedLocationIds: [] };
    setEditZones(p => [...p, newZ]);
  }
  function addZoneToBuilding(buildingId: string) {
    // Pre-populate level fields from the building's first known level
    const building = buildingNodes.find(b => b.id === buildingId);
    const firstLevel = building ? levelNodes.find(n => building.levelIds.has(n.id)) : undefined;
    const newZ: VerticalZone = {
      id: uid(), name: '', code: '', type: '',
      startLevelId: firstLevel?.id ?? '',
      endLevelId: firstLevel?.id ?? '',
      startLevelName: firstLevel?.name ?? '',
      endLevelName: firstLevel?.name ?? '',
      elevationStart: firstLevel?.elevation ?? '',
      elevationEnd: firstLevel?.elevation ?? '',
      description: '', linkedLocationIds: [],
      buildingId, // explicitly tie this zone to the clicked building
    };
    // Insert right after the last zone that belongs to this building so the new
    // row appears at the bottom of the correct building group immediately.
    setEditZones(prev => {
      const lastIdx = prev.reduce((acc, z, i) => {
        const belongs = z.buildingId === buildingId
          || (building && (building.levelIds.has(z.startLevelId) || building.levelIds.has(z.endLevelId)));
        return belongs ? i : acc;
      }, -1);
      if (lastIdx === -1) {
        // No existing zones for this building — append to end
        return [...prev, newZ];
      }
      const next = [...prev];
      next.splice(lastIdx + 1, 0, newZ);
      return next;
    });
    // Auto-expand the group so the new row is immediately visible
    setCollapsedBuildings(prev => { const next = new Set(prev); next.delete(buildingId); return next; });
  }
  function handleStartLevelChange(zoneId: string, levelId: string) {
    const node = levelNodes.find(n => n.id === levelId);
    updZone(zoneId, {
      startLevelId: levelId,
      ...(node ? { elevationStart: node.elevation, startLevelName: node.name } : {}),
      // If cleared to empty, also clear the snapshot so no orphan ghost remains
      ...(levelId === '' ? { startLevelName: '' } : {}),
    });
  }
  function handleEndLevelChange(zoneId: string, levelId: string) {
    const node = levelNodes.find(n => n.id === levelId);
    updZone(zoneId, {
      endLevelId: levelId,
      ...(node ? { elevationEnd: node.elevation, endLevelName: node.name } : {}),
      ...(levelId === '' ? { endLevelName: '' } : {}),
    });
  }

  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';
  const displayZones = editMode ? editZones : (
    q ? zones.filter(z => z.name.toLowerCase().includes(q) || z.code.toLowerCase().includes(q) || z.type.toLowerCase().includes(q) || z.description.toLowerCase().includes(q))
      : zones
  );
  const selectedZone = zones.find(z => z.id === selectedRowId);
  const showClear = search.length > 0;

  // ── Building grouping ──────────────────────────────────────────────────────
  const buildingNodes = useMemo(() => collectBuildingNodes(tabs), [tabs]);

  const zoneGroups = useMemo((): { building: BuildingNode | null; zones: VerticalZone[] }[] => {
    const map = new Map<string, VerticalZone[]>();
    for (const z of displayZones) {
      // Prefer the explicit buildingId set at creation time; fall back to
      // level-based assignment for zones that pre-date this field.
      let bid = '__unassigned__';
      if (z.buildingId && buildingNodes.some(b => b.id === z.buildingId)) {
        bid = z.buildingId;
      } else {
        for (const b of buildingNodes) {
          if (b.levelIds.has(z.startLevelId) || b.levelIds.has(z.endLevelId)) { bid = b.id; break; }
        }
      }
      if (!map.has(bid)) map.set(bid, []);
      map.get(bid)!.push(z);
    }
    const result: { building: BuildingNode | null; zones: VerticalZone[] }[] = [];
    for (const b of buildingNodes) {
      // Always include every building — even if it has 0 zones — so newly-added
      // buildings appear as group rows immediately without requiring a zone first.
      result.push({ building: b, zones: map.get(b.id) ?? [] });
    }
    const unassigned = map.get('__unassigned__');
    if (unassigned?.length) result.push({ building: null, zones: unassigned });
    return result;
  }, [displayZones, buildingNodes]);

  // Actions column is sticky-right — doesn't drive the scrollable minWidth
  const VZ_ACTIONS_COL = 56;
  // desc is flex:1 so only its minWidth (150) counts toward the scroll threshold
  const totalMinW = colWidths.name + colWidths.code + colWidths.type + colWidths.startLevel + colWidths.endLevel + colWidths.elevStart + colWidths.elevEnd + 150;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minWidth: 0 }}>
      {/* Container — overflow:hidden clips border-radius; scroll lives on the inner div */}
      <div style={{ flex: 1, border: '1px solid #D9D9D9', borderRadius: '8px', overflow: 'hidden', display: 'flex', minHeight: 0, minWidth: 0, background: 'white' }}>

        {/* Table + toolbar area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Search is always shown; in editMode it stays for filtering */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 276, flexShrink: 0 }}>
                <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><SearchIcon /></div>
                <input type="text" placeholder="Search vertical zones…" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', height: 36, paddingLeft: 34, paddingRight: showClear ? 34 : 10, border: '1px solid #D0D5DD', borderRadius: 4, fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: 400, color: '#344054', background: '#FFFFFF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#91D5FF')}
                  onBlur={e  => (e.currentTarget.style.borderColor = '#D0D5DD')} />
                {showClear && (
                  <button onClick={() => setSearch('')} onMouseEnter={() => setClearHov(true)} onMouseLeave={() => setClearHov(false)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: clearHov ? '#595959' : '#8C8C8C', transition: 'color 0.1s' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {editMode ? (
                <>
                  <CancelBtn onClick={cancelEdit} />
                  <SaveBtn onClick={saveEdit} />
                </>
              ) : (
                <>
                  {SHOW_LBS_IMPORT_EXPORT && (
                    <>
                      <SecondaryBtn onClick={() => {}}><ImportIcon /><span>Import</span></SecondaryBtn>
                      <SecondaryBtn onClick={() => {}}><ExportIcon /><span>Export</span></SecondaryBtn>
                    </>
                  )}
                  <PrimaryEditBtn onClick={enterEdit} />
                </>
              )}
            </div>
          </div>

          {/* §26 ValidationBanner — above all rows, below toolbar, outside scroll area */}
          {editMode && showErrors && allZoneErrors.size > 0 && (
            <ValidationBanner count={allZoneErrors.size} />
          )}

          {/* Table scroll area */}
          <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto', minHeight: 0 }}>
            <div style={{ minWidth: totalMinW }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'stretch', height: VZ_HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
                <LBSHeaderCell label="Name"            style={{ width: colWidths.name }}       required={editMode} editMode={editMode} colKey="name"       onDelta={onColDelta} />
                <LBSHeaderCell label="Code"            style={{ width: colWidths.code }}       editMode={editMode} colKey="code"       onDelta={onColDelta} />
                <LBSHeaderCell label="Type"            style={{ width: colWidths.type }}       editMode={editMode} colKey="type"       onDelta={onColDelta} />
                <LBSHeaderCell label="Start Level"     style={{ width: colWidths.startLevel }} editMode={editMode} colKey="startLevel" onDelta={onColDelta} />
                <LBSHeaderCell label="End Level"       style={{ width: colWidths.endLevel }}   editMode={editMode} colKey="endLevel"   onDelta={onColDelta} />
                <LBSHeaderCell label="Start (ft)"      style={{ width: colWidths.elevStart }}  editMode={editMode} colKey="elevStart"  onDelta={onColDelta} />
                <LBSHeaderCell label="End (ft)"        style={{ width: colWidths.elevEnd }}    editMode={editMode} colKey="elevEnd"    onDelta={onColDelta} />
                <LBSHeaderCell label="Description" fillFlex editMode={editMode} />

              </div>

              {/* Empty state */}
              {displayZones.length === 0 && zoneGroups.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 220, gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: editMode ? '#FFF3EE' : '#F5F5F5', border: editMode ? '1.5px dashed #FF4D00' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
                      <path d="M2 5h14M2 9h14M2 13h14" stroke={editMode ? '#FF4D00' : '#BFBFBF'} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9 2v14" stroke={editMode ? '#FF4D00' : '#BFBFBF'} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M6.5 5L9 2L11.5 5" stroke={editMode ? '#FF4D00' : '#BFBFBF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                      {q ? 'No vertical zones match your search.' : 'No vertical zones defined'}
                    </div>
                    {editMode && !q && (
                      <div style={{ marginTop: 8, fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#BFBFBF', fontStyle: 'italic' }}>
                        Use &ldquo;Add Vertical Zone&rdquo; on each building group row above.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rows — grouped by Building (Tier 1) → Vertical Zone (Tier 2) */}
              {zoneGroups.map(({ building, zones: groupZones }) => {
                const bid = building?.id ?? '__unassigned__';
                const isCollapsed = collapsedBuildings.has(bid);
                return (
                  <React.Fragment key={bid}>

                    {/* ── Building group header row (Tier 1) ──────────────── */}
                    <div
                      onClick={() => toggleBuilding(bid)}
                      style={{
                        display: 'flex', alignItems: 'center',
                        height: 40, flexShrink: 0,
                        background: '#F5F6F7',
                        borderBottom: '1px solid #EEEFF1',
                        paddingLeft: 12, paddingRight: 12,
                        gap: 8, cursor: 'pointer', userSelect: 'none',
                        position: 'sticky', top: VZ_HEADER_H, zIndex: 10,
                      }}
                    >
                      {/* Chevron */}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transition: 'transform 0.15s', transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
                        <path d="M4 6l4 4 4-4" stroke="#616D79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {/* Building name */}
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {building?.name ?? 'Unassigned'}
                      </span>
                      {/* Building type badge */}
                      <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '2px 7px', background: '#E5E7E9', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79', whiteSpace: 'nowrap', flexShrink: 0 }}>Building</span>
                      {/* Right side: Add Zone btn in editMode, Code + count in view mode */}
                      {editMode ? (
                        <div onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
                          <RowActionBtn
                            label="Add Vertical Zone"
                            onClick={() => addZoneToBuilding(bid)}
                            title={`Add a vertical zone under ${building?.name ?? 'this building'}`}
                          />
                        </div>
                      ) : (
                        <>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#8C8C8C', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            {groupZones.length} zone{groupZones.length !== 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>

                    {/* ── Zone data rows (Tier 2) — hidden when building is collapsed ── */}
                    {!isCollapsed && groupZones.length === 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', height: 40, paddingLeft: 36, borderBottom: '1px solid #F0F0F0', background: 'white' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#BFBFBF', fontStyle: 'italic' }}>No vertical zones assigned to this building yet</span>
                      </div>
                    )}
                    {!isCollapsed && groupZones.map(zone => {
                // §26 — per-row error derivation
                const isHov         = !editMode && hoveredRowId === zone.id;
                const isSelected    = !editMode && selectedRowId === zone.id;
                const startNode     = levelNodes.find(n => n.id === zone.startLevelId);
                const endNode       = levelNodes.find(n => n.id === zone.endLevelId);
                const startIsOrphan = !startNode && !!zone.startLevelId;
                const endIsOrphan   = !endNode   && !!zone.endLevelId;
                const hasNameErr    = vzEditErrors.has(`${zone.id}_name`);
                const rowHasErr     = hasNameErr; // add other field keys here as more validations are added
                // §26 — Layer 2: row height switch (downward-only expansion)
                const rowH          = editMode ? (rowHasErr ? VZ_ROW_H_ERROR : VZ_ROW_H) : VZ_ROW_H;
                // §26 — Layer 3: cell alignment cascade — every cell in the row uses these
                const cellAlign     = (rowHasErr ? 'flex-start' : 'center') as React.CSSProperties['alignItems'];
                const cellPadTop    = rowHasErr ? 9 : 0; // (VZ_ROW_H − INPUT_H) / 2 = (48−30)/2 = 9
                return (
                  <div key={zone.id}
                    onMouseEnter={() => !editMode && setHoveredRowId(zone.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                    onClick={() => !editMode && setSelectedRowId(isSelected ? null : zone.id)}
                    style={{ display: 'flex', alignItems: 'stretch', height: rowH, background: isSelected ? '#E6F7FF' : isHov ? '#F9FAFB' : 'white', borderBottom: '1px solid #D9D9D9', cursor: editMode ? 'default' : 'pointer', transition: 'background 0.1s' }}>

                    {/* Name — §26 Layer 4: overflow:visible + zIndex so absolute error msg bleeds into expansion zone */}
                    <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 12, paddingRight: 8, overflow: hasNameErr ? 'visible' : 'hidden', position: 'relative', zIndex: hasNameErr ? 2 : undefined }}>
                      {editMode ? (
                        <EditInput
                          value={zone.name}
                          onChange={v => updZone(zone.id, { name: v })}
                          placeholder="Zone name *"
                          error={hasNameErr}
                          errorMessage={vzEditErrors.get(`${zone.id}_name`)}
                        />
                      ) : (
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 500, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlightText(zone.name, search) || <span style={{ color: '#BFBFBF' }}>—</span>}</span>
                      )}
                    </div>

                    {/* Code */}
                    <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                      {editMode
                        ? <EditInput value={zone.code} onChange={v => updZone(zone.id, { code: v })} placeholder="e.g. ST-01" />
                        : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: zone.code ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{zone.code || '—'}</span>
                      }
                    </div>

                    {/* Type */}
                    <div style={{ width: colWidths.type, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                      {editMode
                        ? <VZTypeDropdown value={zone.type} onChange={v => updZone(zone.id, { type: v })} />
                        : zone.type
                          ? <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '2px 8px', background: '#E5E7E9', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79', whiteSpace: 'nowrap', flexShrink: 0 }}>{zone.type}</span>
                          : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                      }
                    </div>

                    {/* Start Level */}
                    <div style={{ width: colWidths.startLevel, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden', gap: 0 }}>
                      {editMode ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, minWidth: 0 }}>
                          <LevelDropdown value={zone.startLevelId} onChange={v => handleStartLevelChange(zone.id, v)} levelNodes={levelNodes} placeholder="Start level…" orphanName={zone.startLevelName} />
                          {startIsOrphan && <OrphanLevelBadge />}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: startIsOrphan ? '#8C8C8C' : startNode ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
                            {startIsOrphan ? (zone.startLevelName || zone.startLevelId) : (startNode?.name || '—')}
                          </span>
                          {startIsOrphan && <div style={{ marginLeft: 4, flexShrink: 0 }}><OrphanLevelBadge /></div>}
                        </div>
                      )}
                    </div>

                    {/* End Level */}
                    <div style={{ width: colWidths.endLevel, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden', gap: 0 }}>
                      {editMode ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                          <LevelDropdown value={zone.endLevelId} onChange={v => handleEndLevelChange(zone.id, v)} levelNodes={levelNodes} placeholder="End level…" orphanName={zone.endLevelName} />
                          {endIsOrphan && <OrphanLevelBadge />}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: endIsOrphan ? '#8C8C8C' : endNode ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                            {endIsOrphan ? (zone.endLevelName || zone.endLevelId) : (endNode?.name || '—')}
                          </span>
                          {endIsOrphan && <OrphanLevelBadge />}
                        </div>
                      )}
                    </div>

                    {/* Elevation Start — read-only; auto-filled from Start Level */}
                    <div style={{ width: colWidths.elevStart, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                      {editMode ? (
                        <div title="Auto-filled from Start Level" style={{ flex: 1, minWidth: 0, height: 30, paddingLeft: 8, paddingRight: 8, border: '1px solid #E0E4E8', borderRadius: 4, background: '#FFFFFF', cursor: 'default', display: 'flex', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#9EA3A9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {zone.elevationStart || '—'}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: zone.elevationStart ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{zone.elevationStart || '—'}</span>
                      )}
                    </div>

                    {/* Elevation End — read-only; auto-filled from End Level */}
                    <div style={{ width: colWidths.elevEnd, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                      {editMode ? (
                        <div title="Auto-filled from End Level" style={{ flex: 1, minWidth: 0, height: 30, paddingLeft: 8, paddingRight: 8, border: '1px solid #E0E4E8', borderRadius: 4, background: '#FFFFFF', cursor: 'default', display: 'flex', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#9EA3A9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {zone.elevationEnd || '—'}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: zone.elevationEnd ? '#384857' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{zone.elevationEnd || '—'}</span>
                      )}
                    </div>

                    {/* Description — flex:1 fills remaining space before the sticky Actions col */}
                    <div style={{ flex: 1, minWidth: 150, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, paddingLeft: 8, paddingRight: 8, overflow: 'hidden' }}>
                      {editMode
                        ? <EditInput value={zone.description} onChange={v => updZone(zone.id, { description: v })} placeholder="Optional description" />
                        : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: zone.description ? '#616D79' : '#BFBFBF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlightText(zone.description, search) || '—'}</span>
                      }
                    </div>

                    {/* Delete — sticky-right frozen column */}
                    {editMode && (
                      <div style={{ width: VZ_ACTIONS_COL, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, justifyContent: 'center', position: 'sticky', right: 0, zIndex: 4, background: isHov ? '#F9FAFB' : 'white', boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)', transition: 'background 0.1s' }}>
                        <IconBtn onClick={() => requestDelZone(zone)} title="Delete zone"><TrashIconSVG /></IconBtn>
                      </div>
                    )}
                  </div>
                );
                    })}
                  </React.Fragment>
                );
              })}

            </div>
          </div>
        </div>


      </div>
      {deleteZoneWarning && (
        <DeleteZoneWarningModal
          zone={deleteZoneWarning.zone}
          onConfirm={confirmDelZone}
          onCancel={() => setDeleteZoneWarning(null)}
        />
      )}
    </div>
  );
}

// ─── Tab Item ─────────────────────────────────────────────────────────────────
function TabItem({ tab, isActive, editMode, isRenaming, onActivate, onStartRename, onCommitRename, onCancelRename }: {
  tab: LBSTab; isActive: boolean; editMode: boolean; isRenaming: boolean;
  onActivate: () => void; onStartRename: () => void;
  onCommitRename: (name: string) => void; onCancelRename: () => void;
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
        borderBottom: isActive ? '3px solid #FF4D00' : '1px solid #F0F0F0',
        borderRadius: '4px 4px 0 0',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isActive ? 600 : 400,
        color: isActive ? '#243746' : '#384857',
        cursor: editMode ? 'default' : 'pointer',
        flexShrink: 0, whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', gap: 6,
        boxSizing: 'border-box', transition: 'background 0.1s, padding-right 0.1s',
      }}
    >
      {isRenaming ? (
        <AutoSizeTabInput initialValue={tab.label} onCommit={onCommitRename} onCancel={onCancelRename} />
      ) : (
        <>
          <PrimaryLBSIcon color={isActive ? '#243746' : '#616D79'} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? '#243746' : '#384857' }}>
            {tab.label}
          </span>
          {showRenameIcon && (
            <button
              onClick={e => { e.stopPropagation(); onStartRename(); }}
              onMouseEnter={() => setPenHov(true)}
              onMouseLeave={() => setPenHov(false)}
              title="Rename tab"
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, padding: 0, background: penHov ? '#E5E7E9' : 'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', transition: 'background 0.1s' }}
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

// ─── VS Conflict Resolution Modal ──────���──────────────────────────────────────
function VSConflictModal({
  affectedCount,
  isEnabling,
  onAutoAdjust,
  onKeepAndReview,
  onCancel,
}: {
  affectedCount: number;
  isEnabling: boolean;
  onAutoAdjust: () => void;
  onKeepAndReview: () => void;
  onCancel: () => void;
}) {
  const [selected,  setSelected]  = useState<'auto' | 'review'>('auto');
  const [applyHov,  setApplyHov]  = useState(false);
  const [cancelHov, setCancelHov] = useState(false);
  const [hov1, setHov1]           = useState(false);
  const [hov2, setHov2]           = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  function handleApply() {
    if (selected === 'auto') onAutoAdjust();
    else onKeepAndReview();
  }

  function RadioDot({ checked }: { checked: boolean }) {
    return (
      <div style={{ width: 16, height: 16, flexShrink: 0, position: 'relative' }}>
        <svg style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="#FFFFFF" r="7.5" stroke={checked ? '#616D79' : '#D9D9D9'} />
          {checked && <circle cx="8" cy="8" fill="#616D79" r="4" />}
        </svg>
      </div>
    );
  }

  return ReactDOM.createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(0,0,0,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{ width: 480, background: '#FFFFFF', borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.24)', display: 'flex', flexDirection: 'column' }}>

        {/* Header — §10.3 */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Actor', sans-serif", fontWeight: 400, fontSize: 24, lineHeight: '28.8px', color: '#1B2736', margin: 0, whiteSpace: 'nowrap' }}>
              Resolve Child Segmentation
            </p>
            <button
              onClick={onCancel}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 40, transition: 'background-color 0.15s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F6F7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ padding: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: '#F0F0F0', width: '100%' }} />
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Message — plain text, no coloured box */}
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, lineHeight: '20px', color: '#384857' }}>
            <span style={{ fontWeight: 600 }}>
              {affectedCount} child {affectedCount === 1 ? 'space' : 'spaces'}
            </span>{' '}
            will exceed the available height.
          </p>

          {/* Option 1 — Auto Adjust */}
          <div
            onClick={() => setSelected('auto')}
            onMouseEnter={() => setHov1(true)}
            onMouseLeave={() => setHov1(false)}
            style={{
              border: `1px solid ${selected === 'auto' ? '#616D79' : '#D9D9D9'}`,
              borderRadius: 6,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              background: selected === 'auto' ? '#F9FAFB' : hov1 ? '#FAFAFA' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.1s',
            }}
          >
            <div style={{ paddingTop: 1, flexShrink: 0 }}><RadioDot checked={selected === 'auto'} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38' }}>Auto Adjust</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#027A48', background: '#ECFDF3', border: '1px solid #B7EB8F', borderRadius: 9999, padding: '1px 7px', flexShrink: 0, whiteSpace: 'nowrap' }}>Recommended</span>
              </div>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: '17px', color: '#616D79' }}>
                Adjust child values to fit new height
              </p>
            </div>
          </div>

          {/* Option 2 — Review Manually */}
          <div
            onClick={() => setSelected('review')}
            onMouseEnter={() => setHov2(true)}
            onMouseLeave={() => setHov2(false)}
            style={{
              border: `1px solid ${selected === 'review' ? '#616D79' : '#D9D9D9'}`,
              borderRadius: 6,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              background: selected === 'review' ? '#F9FAFB' : hov2 ? '#FAFAFA' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.1s',
            }}
          >
            <div style={{ paddingTop: 1, flexShrink: 0 }}><RadioDot checked={selected === 'review'} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1D2C38', display: 'block', marginBottom: 3 }}>Review Manually</span>
              <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: '17px', color: '#616D79' }}>
                Keep values, resolve issues yourself
              </p>
              <p style={{ margin: '3px 0 0', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 400, lineHeight: '16px', color: '#9EA3A9' }}>
                Cannot save until resolved
              </p>
            </div>
          </div>
        </div>

        {/* Footer — §10.4 */}
        <div style={{ height: 72, borderTop: '1px solid #C3C7CC', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: '#FFFFFF' }}>
          <button
            onClick={onCancel}
            onMouseEnter={() => setCancelHov(true)} onMouseLeave={() => setCancelHov(false)}
            style={{ height: 36, padding: '0 16px', background: cancelHov ? '#E5E7E9' : '#F2F3F4', border: '1px solid #C3C7CC', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#616D79', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            onMouseEnter={() => setApplyHov(true)} onMouseLeave={() => setApplyHov(false)}
            style={{ height: 36, padding: '0 20px', background: applyHov ? '#FF773E' : '#FF4D00', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, color: '#FFFFFF', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function LocationBreakdownStructure() {
  // ── Tab state
  const [tabs, setTabs]               = useState<LBSTab[]>(INITIAL_LBS_TABS);
  const [activeTabId, setActiveTabId] = useState(INITIAL_LBS_TABS[0].id);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [renamingTabId, setRenamingTabId]     = useState<string | null>(null);

  // ── Active view: 'primary' = LBS tabs, 'vz' = Vertical Zones
  const [activeView, setActiveView] = useState<'primary' | 'vz'>('primary');
  // ── Vertical Zones state
  const [vzones, setVzones]         = useState<VerticalZone[]>(INITIAL_VZONES);

  // ── View state
  const [search, setSearch]         = useState('');
  const [clearHov, setClearHov]     = useState(false);
  const [colWidths, setColWidths]   = useState({ name: COL_NAME, code: COL_CODE, fullCode: COL_FULLCODE, type: COL_TYPE, elevation: COL_ELEVATION_EDIT });
  function onColDelta(key: string, delta: number) {
    setColWidths(prev => {
      const minW = key === 'elevation' ? 80 : key === 'type' ? 80 : key === 'code' ? 100 : 120;
      return { ...prev, [key]: Math.max(minW, (prev as Record<string, number>)[key] + delta) };
    });
  }
  const [expanded, setExpanded]     = useState<Set<string>>(INITIAL_LBS_EXPANDED);
  const [hoveredId, setHoveredId]   = useState<string | null>(null);

  // ── Edit state
  const [editMode, setEditMode]     = useState(false);
  const [editItems, setEditItems]   = useState<LBSItem[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [separator, setSeparator]   = useState<SepOption>('.');

  // ── Project Context toggle (edit mode only)
  const [showProjectContext, setShowProjectContext] = useState(true);

  // ── Delete row warning modal
  const [deleteRowWarning, setDeleteRowWarning] = useState<{ item: LBSItem } | null>(null);

  // ── VS Side Panel state
  const [vsPanelItemId, setVsPanelItemId] = useState<string | null>(null);

  // ── VS Conflict Resolution modal state
  const [vsConflictModal, setVsConflictModal] = useState<{
    itemId: string;
    newVS: VSConfig;
    affectedIds: string[];
    isEnabling: boolean;
  } | null>(null);

  // ── VS Manual-review flags — IDs the user chose to "Review Manually" in the conflict modal.
  //    These show a flag trailing icon in the VS column and block Save until cleared.
  //    Each flag is cleared when the user opens that child's VS panel and clicks Apply Changes.
  const [vsManualFlags, setVsManualFlags] = useState<Set<string>>(new Set());

  // ── Reactive conflict set — recomputed whenever editItems changes.
  //    Any node whose VS plenums exceed its effective available height is listed.
  //    Used for ⚠ indicators and blocking save.
  const vsConflicts = useMemo<Set<string>>(() => {
    if (!editMode || editItems.length === 0) return new Set();
    return computeAllVSConflicts(editItems, collectLevels(editItems));
  }, [editItems, editMode]);

  function updateItemVS(id: string, vs: VSConfig) {
    setEditItems(p => updateItem(p, id, { vs }));
  }
  function findVSContext(
    items: LBSItem[],
    targetId: string,
    parentVS: VSConfig | null = null,
    ancestorLevelElev: string | null = null,
    cumulativeConsumedInches = 0,
  ): { item: LBSItem; parentVS: VSConfig | null; levelElevation: string | null; parentConsumedInches: number } | null {
    for (const it of items) {
      const itIsLevel = isLevelType(it.type);
      const elev = itIsLevel ? (it.elevation || null) : ancestorLevelElev;
      if (it.id === targetId) {
        return { item: it, parentVS, levelElevation: elev, parentConsumedInches: cumulativeConsumedInches };
      }
      // Accumulate this node's consumed inches before descending into its children
      const nextCumulative = cumulativeConsumedInches + vsConsumedInches(it.vs);
      const r = findVSContext(it.children, targetId, it.vs?.enabled ? it.vs : null, elev, nextCumulative);
      if (r) return r;
    }
    return null;
  }

  // ── Drag state
  const dragItemRef   = useRef<DragItem | null>(null);
  const dropTargetRef = useRef<DropTarget | null>(null);
  const editItemsRef  = useRef(editItems);
  const liveItemsRef  = useRef<LBSItem[]>([]);
  const editModeRef   = useRef(editMode);
  const expandedRef   = useRef(expanded);
  const rafRef        = useRef<number | null>(null);

  const [isDragging,  setIsDragging]  = useState(false);
  const [draggingId,  setDraggingId]  = useState<string | null>(null);
  const [previewPos,  setPreviewPos]  = useState({ x: 0, y: 0 });
  const [dropTarget,  setDropTarget]  = useState<DropTarget | null>(null);

  const activeTab  = tabs.find(t => t.id === activeTabId) ?? tabs[0];
  const liveItems  = activeTab?.items ?? [];

  useEffect(() => { editItemsRef.current = editItems; }, [editItems]);
  useEffect(() => { liveItemsRef.current = liveItems; }, [liveItems]);
  useEffect(() => { editModeRef.current  = editMode;  }, [editMode]);
  useEffect(() => { expandedRef.current  = expanded;  }, [expanded]);

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : '';
    return () => { document.body.style.cursor = ''; };
  }, [isDragging]);

  // ── Tab helpers
  function addTab(name: string, type: LBSType) {
    const newTab: LBSTab = { id: uid(), label: name, items: [], builtIn: false, type };
    setTabs(t => [...t, newTab]);
    setActiveTabId(newTab.id);
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
  function saveTabItems(newItems: LBSItem[]) {
    setTabs(tabs => tabs.map(t => t.id === activeTabId ? { ...t, items: newItems } : t));
  }

  // ── Enter / exit edit mode
  function enterEditMode() {
    const items: LBSItem[] = JSON.parse(JSON.stringify(liveItems));
    setEditItems(items);
    setExpanded(new Set(collectAllIds(items)));
    setShowErrors(false);
    setVsManualFlags(new Set()); // always start a fresh edit session with no flags
    // Reset the "don't show again" flag each session so the Remove Location
    // confirmation modal always appears when entering edit mode.
    localStorage.removeItem(DELETE_ROW_WARNING_KEY);
    setEditMode(true);
  }
  function cancelEdit() {
    setEditMode(false); setEditItems([]); setShowErrors(false);
    setVsManualFlags(new Set()); // discard any pending manual-review flags
  }
  function saveEdit() {
    if (vsConflicts.size > 0 || vsManualFlags.size > 0) {
      // VS conflicts or unresolved manual-review flags must be cleared before saving
      setShowErrors(true);
      return;
    }
    const errors = validateItems(editItems, new Map<string, string>(), getSepStr(separator));
    if (errors.size > 0) { setShowErrors(true); return; }
    saveTabItems(propagateElevations(editItems));
    setEditMode(false); setEditItems([]); setShowErrors(false);
    setVsManualFlags(new Set());
    setExpanded(new Set()); // reset to Collapse All on returning to view mode
  }

  const allErrors  = useMemo(() => editMode ? validateItems(editItems, new Map<string, string>(), getSepStr(separator)) : new Map<string, string>(), [editItems, editMode, separator]);
  const editErrors = showErrors ? allErrors : new Map<string, string>();

  // ── Edit helpers
  function updItem(id: string, patch: Partial<Pick<LBSItem, 'name'|'code'|'type'|'elevation'|'description'|'vs'>>) {
    setEditItems(p => updateItem(p, id, patch));
  }
  function delItem(id: string) {
    const findItem = (items: LBSItem[], targetId: string): LBSItem | null => {
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
    const newItem = newEmptyItem();
    setEditItems(p => addChildToItem(p, parentId, newItem));
    setExpanded(p => new Set([...p, parentId, newItem.id]));
  }
  function addSibling(siblingId: string) {
    setEditItems(p => insertAfter(p, siblingId, newEmptyItem()));
  }
  function addLevel() {
    // Add Level as a child of the last Building in the tree; fall back to root if none exists
    const newLevel: LBSItem = { id: uid(), name: '', code: '', type: 'Level', elevation: '', description: '', vs: null, children: [] };
    setEditItems(prev => {
      const lastBldg = [...prev].reverse().find(it => isBuildingType(it.type));
      if (lastBldg) {
        // Ensure the building is expanded so the new level is visible
        setExpanded(s => new Set([...s, lastBldg.id]));
        return addChildToItem(prev, lastBldg.id, newLevel);
      }
      // No building in tree — add level at root
      return [...prev, newLevel];
    });
    setTimeout(() => {
      const scrollable = document.querySelector('[data-lbs-scroll]') as HTMLElement | null;
      if (scrollable) scrollable.scrollTop = scrollable.scrollHeight;
    }, 50);
  }
  function addBuilding() {
    // Adds a new first-tier Building row at the end of the tree
    const newBuilding: LBSItem = { id: uid(), name: '', code: '', type: 'Building', elevation: '', description: '', vs: null, children: [] };
    setEditItems(p => [...p, newBuilding]);
    setExpanded(s => new Set([...s, newBuilding.id]));
    setTimeout(() => {
      const scrollable = document.querySelector('[data-lbs-scroll]') as HTMLElement | null;
      if (scrollable) scrollable.scrollTop = scrollable.scrollHeight;
    }, 50);
  }
  function addLevelToBuilding(buildingId: string) {
    // Adds a new Level as a child of the specified Building row
    const newLevel: LBSItem = { id: uid(), name: '', code: '', type: 'Level', elevation: '', description: '', vs: null, children: [] };
    setEditItems(prev => addChildToItem(prev, buildingId, newLevel));
    setExpanded(s => new Set([...s, buildingId]));
    setTimeout(() => {
      const scrollable = document.querySelector('[data-lbs-scroll]') as HTMLElement | null;
      if (scrollable) scrollable.scrollTop = scrollable.scrollHeight;
    }, 50);
  }

  // ── VS conflict resolution handlers ─────────────────────────────────────────

  /**
   * Gate a VS change through conflict detection, then shows the resolution modal
   * or applies immediately.
   *
   * Two distinct trigger paths:
   *
   * A) ENABLING — VS is going from OFF → ON.
   *    The parent has no plenum values yet (consumed = 0), so a mathematical
   *    conflict check would always return zero. Instead we check whether any
   *    descendants already have VS enabled, because once the user enters parent
   *    plenum values those children WILL be affected.
   *
   * B) VALUE CHANGE — VS was already ON and the user is saving new plenum values
   *    (from the Edit side panel). Here we do the mathematical check: does the
   *    new parent configuration cause any descendant's (C+F) > available height?
   */
  function applyVSWithConflictCheck(itemId: string, newVS: VSConfig, closePanelOnApply = false) {
    // Determine whether this is an enabling event or a value-change event
    const currentItem = findLBSItem(editItems, itemId);
    const wasEnabled  = currentItem?.vs?.enabled ?? false;
    const isEnabling  = newVS.enabled && !wasEnabled;

    if (newVS.enabled) {
      let triggeredIds: string[];

      if (isEnabling) {
        // Path A — just turned ON: show modal whenever descendants have VS
        triggeredIds = findDescendantsWithVS(editItems, itemId);
      } else {
        // Path B — already ON, values changed: show modal only on math conflicts
        const sortedLevels = collectLevels(editItems);
        triggeredIds = findConflictedDescendants(editItems, itemId, newVS, sortedLevels);
      }

      if (triggeredIds.length > 0) {
        setVsConflictModal({ itemId, newVS, affectedIds: triggeredIds, isEnabling });
        return;
      }
    }

    // No conflict / disabling: apply immediately.
    // Also clear any manual-review flag for this item (user resolved it via the panel).
    setEditItems(p => updateItem(p, itemId, { vs: newVS }));
    setVsManualFlags(prev => { const n = new Set(prev); n.delete(itemId); return n; });
    if (closePanelOnApply) setVsPanelItemId(null);
  }

  function handleVSConflictAutoAdjust() {
    if (!vsConflictModal) return;
    const { itemId, newVS, affectedIds, isEnabling } = vsConflictModal;
    if (isEnabling) {
      // Parent was just turned ON — no plenum values yet, nothing to scale.
      // Simply apply the enabled flag; auto-adjust will re-run when values are set.
      setEditItems(p => updateItem(p, itemId, { vs: newVS }));
    } else {
      // Parent values changed — scale down conflicted descendants proportionally.
      const sortedLevels = collectLevels(editItems);
      setEditItems(autoAdjustDescendantVS(editItems, itemId, newVS, sortedLevels));
    }
    // Auto-adjust resolves all affected children — clear any manual flags for them.
    setVsManualFlags(prev => {
      const n = new Set(prev);
      affectedIds.forEach(id => n.delete(id));
      return n;
    });
    setVsConflictModal(null);
    setVsPanelItemId(null);
  }

  function handleVSConflictKeepAndReview() {
    if (!vsConflictModal) return;
    const { itemId, newVS, affectedIds } = vsConflictModal;
    setEditItems(p => updateItem(p, itemId, { vs: newVS }));
    // Add all affected children to the manual-review flag set so they show
    // a flag icon in the VS column and block Save until each one is resolved.
    setVsManualFlags(prev => new Set([...prev, ...affectedIds]));
    setVsConflictModal(null);
    setVsPanelItemId(null);
  }

  function handleVSConflictCancel() {
    setVsConflictModal(null);
  }

  // ── Sort


  // ── Expand
  function toggleExpanded(id: string) { setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function expandAll()   { setExpanded(new Set(collectAllIds(editMode ? editItems : liveItems))); }
  function collapseAll() { setExpanded(new Set()); }

  // Nodes that have children — only these can be expanded/collapsed
  const allExpandableIds = useMemo(() => {
    function collectParentIds(items: LBSItem[]): string[] {
      const ids: string[] = [];
      for (const it of items) {
        if (it.children && it.children.length > 0) {
          ids.push(it.id);
          ids.push(...collectParentIds(it.children));
        }
      }
      return ids;
    }
    return new Set(collectParentIds(editMode ? editItems : liveItems));
  }, [editMode, editItems, liveItems]);

  // Expand All is disabled when there are no expandable nodes OR every one is already expanded
  const canExpandAll   = allExpandableIds.size > 0 && [...allExpandableIds].some(id => !expanded.has(id));
  // Collapse All is disabled when there are no expandable nodes OR none is currently expanded
  const canCollapseAll = allExpandableIds.size > 0 && [...allExpandableIds].some(id => expanded.has(id));

  // ── Drag & Drop
  function performDrop(target: DropTarget) {
    const item   = dragItemRef.current!;
    const isEdit = editModeRef.current;
    const source = isEdit ? editItemsRef.current : liveItemsRef.current;
    const { tree, removed } = removeFromTree(JSON.parse(JSON.stringify(source)), item.itemId);
    if (!removed) return;
    let newTree: LBSItem[];
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
        started = true; setIsDragging(true); setDraggingId(item.itemId);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPreviewPos({ x: me.clientX, y: me.clientY });
        const t = findDropTarget(me.clientX, me.clientY, item.itemId, item.levelGroupId);
        dropTargetRef.current = t; setDropTarget(t);
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

  // ── Filter / sort
  const q = search.trim().length >= 2 ? search.toLowerCase().trim() : '';
  function filterItems(items: LBSItem[]): LBSItem[] {
    if (!q) return items;
    return items.reduce<LBSItem[]>((acc, item) => {
      const matches = item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q) || item.type.toLowerCase().includes(q) || item.elevation.includes(q) || item.description.toLowerCase().includes(q);
      const filteredChildren = filterItems(item.children);
      if (matches || filteredChildren.length > 0) acc.push({ ...item, children: filteredChildren });
      return acc;
    }, []);
  }
  const displayItems  = editMode ? editItems : filterItems(liveItems);
  const fullCodeMap   = useMemo(() => buildFullCodeMap(editMode ? editItems : liveItems, PROJECT_INFO.code || '', getSepStr(separator)), [editMode, editItems, liveItems, separator]);
  const showClear     = search.length > 0;

  // ── Vertical Zones derived data
  const levelNodes  = useMemo(() => collectLevelNodes(tabs), [tabs]);
  const allLbsNodes = useMemo(() => flattenAllLbsNodes(liveItems), [liveItems]);

  // ── Project context data (sourced from General Information)
  const ctxProjectName = PROJECT_INFO.projectName;
  const ctxJobSite     = PROJECT_INFO.jobSite; // empty string = no job site assigned

  // ── Contextual read-only header row renderer (Project Context)
  function renderContextualRow(label: string, typeBadge: string, icon: React.ReactNode, isLast: boolean, locationCode?: string) {
    return (
      <div
        key={`ctx-${typeBadge}`}
        style={{
          display: 'flex', alignItems: 'stretch', height: ROW_H,
          background: '#F5F6F7',
          borderBottom: '1px solid #F0F0F0',
          position: 'relative',
        }}
      >
        {/* Blank spacer to align with drag-handle column — contextual rows are always locked */}
        {editMode && <div style={{ width: 24, flexShrink: 0 }} />}

        {/* Col 1 — Location Name �� frozen */}
        <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 8, paddingRight: 8, gap: 6, overflow: 'hidden', position: 'sticky', left: editMode ? 24 : 0, zIndex: 3, background: '#F5F6F7' }}>
          {/* No chevron — contextual rows have no children */}
          <div style={{ width: 18, flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', flex: 1 }}>
            {icon}
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
        </div>

        {/* Col 2 — Code (project code for Building row, dash otherwise) */}
        <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8 }}>
          {locationCode
            ? <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#384857' }}>{locationCode}</span>
            : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
          }
        </div>

        {/* Col 3 — Full Code (project code for Project row, dash for others) */}
        <div style={{ width: colWidths.fullCode, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8 }}>
          {locationCode
            ? <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#616D79' }}>{locationCode}</span>
            : <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
          }
        </div>

        {/* Col 4 — Type badge */}
        <div style={{ width: colWidths.type, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            borderRadius: 9999, padding: '2px 8px',
            background: '#E5E7E9',
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {typeBadge}
          </span>
        </div>

        {/* Col 5 — Elevation (dash) — fixed width in both modes */}
        <div style={{ width: colWidths.elevation, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
        </div>

        {/* Col 6 — Vertical Segments — flex-fill, dash for context rows */}
        <div style={{ flex: 1, minWidth: 120, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 8 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
        </div>

        {/* Actions — Project row gets "Add Building"; other context rows (Job Site) are read-only */}
        {editMode && (
          <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 28, paddingRight: 28, position: 'sticky', right: 0, zIndex: 4, background: 'inherit', boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
            {typeBadge === 'Project'
              ? <RowActionBtn label="Add Building" onClick={addBuilding} title="Add a new Building to this LBS" />
              : <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 400, color: '#BFBFBF', fontStyle: 'italic' }}>read-only</span>
            }
          </div>
        )}
      </div>
    );
  }

  // ── Recursive row renderer
  function renderItems(items: LBSItem[], depth = 0, parentId: string | null = null, ancestorLevelElevation: string | null = null, levelGroupId = 'ROOT', parentVS: VSConfig | null = null): React.ReactNode {
    return items.map(item => {
      const isExp        = expanded.has(item.id);
      const hasChildren  = item.children.length > 0;
      const isDragSrc    = draggingId === item.id;

      // ── Building item — render as a special locked first-tier row ──────────
      if (isBuildingType(item.type)) {
        const bHov         = !isDragging && hoveredId === item.id;
        const bStickyLeft  = editMode ? 24 : 0;
        // Inline error expansion — same pattern as regular rows (§ EDIT_ROW_H_ERROR)
        const bNameErr     = editErrors.get(`${item.id}_name`);
        const bRowHasError = editMode && !!bNameErr;
        const bRowH        = editMode ? (bRowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE) : ROW_H;
        // When the row expands for an error, align cell content to the top (7px from top)
        // so the error message text has space at the bottom — identical to regular item rows.
        const bCellAlign  = (bRowHasError ? 'flex-start' : 'center') as React.CSSProperties['alignItems'];
        const bCellPadTop = bRowHasError ? 7 : 0;
        return (
          <div key={item.id}>
            <div
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex', alignItems: 'stretch',
                height: bRowH,
                background: bHov ? '#F9FAFB' : '#FFFFFF',
                borderBottom: '1px solid #D9D9D9',
                transition: 'background 0.1s',
              }}
            >
              {/* Drag handle spacer — Building rows are locked, never dragged */}
              {editMode && <div style={{ width: 24, flexShrink: 0 }} />}

              {/* Col 1 — Name with chevron */}
              <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: editMode ? 4 : 8, paddingRight: 8, gap: 4, overflow: editMode ? 'visible' : 'hidden', position: 'sticky', left: bStickyLeft, zIndex: 11, background: 'inherit' }}>
                <button
                  onClick={e => { e.stopPropagation(); toggleExpanded(item.id); }}
                  style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: 'pointer', marginTop: bRowHasError ? 1 : 0 }}
                >
                  <ChevronIcon expanded={isExp} />
                </button>
                {editMode ? (
                  <EditInput
                    value={item.name}
                    onChange={v => updItem(item.id, { name: v })}
                    placeholder="Building name"
                    error={!!bNameErr}
                    errorMessage={bNameErr}
                  />
                ) : (
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </span>
                )}
              </div>

              {/* Col 2 — Code */}
              <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                {editMode ? (
                  <EditInput value={item.code} onChange={v => updItem(item.id, { code: v })} placeholder="e.g. BLDG" />
                ) : (
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.code}
                  </span>
                )}
              </div>

              {/* Col 3 — Full Code (computed: project code + building code) */}
              <div style={{ width: colWidths.fullCode, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#616D79', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: editMode ? 'italic' : 'normal', opacity: editMode ? 0.55 : 1 }}>
                  {fullCodeMap.get(item.id) ?? item.code}
                </span>
              </div>

              {/* Col 4 — Type pill locked "Building" */}
              <div style={{ width: colWidths.type, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '2px 8px', background: '#E5E7E9', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Building
                </span>
              </div>

              {/* Col 5 — Elevation (dash — not applicable for Building) */}
              <div style={{ width: colWidths.elevation, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
              </div>

              {/* Col 6 — VS — flex-fill, dash for Building rows */}
              <div style={{ flex: 1, minWidth: 120, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
              </div>

              {/* Actions — Building rows: Add Level + Remove */}
              {editMode && (
                <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: bCellAlign, paddingTop: bCellPadTop, justifyContent: 'center', gap: 10, paddingLeft: 20, paddingRight: 22, position: 'sticky', right: 0, zIndex: 4, background: 'inherit', boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
                  <div style={{ width: 74, flexShrink: 0 }}>
                    <RowActionBtn label="Add Level" onClick={() => addLevelToBuilding(item.id)} title="Add a Level under this Building" />
                  </div>
                  <IconBtn onClick={() => delItem(item.id)} title="Remove this Building and all its children"><TrashIconSVG /></IconBtn>
                </div>
              )}
            </div>
            {/* Children — Level rows */}
            {isExp && renderItems(item.children, depth + 1, item.id, null, 'ROOT', null)}
          </div>
        );
      }

      // ── Elevation derivation ────────────────────────────────────────────────
      // 'editable'  — this item IS a Level; user can enter elevation
      // 'inherited' — this item is a descendant of a Level; shows that Level's elevation (read-only)
      // 'empty'     — this item is above / beside all Levels; shows nothing (read-only)
      const isLevel   = isLevelType(item.type);
      const elevState = isLevel                          ? 'editable'
                      : ancestorLevelElevation !== null  ? 'inherited'
                      : 'empty';
      // What the elevation column should display
      const displayElevation = isLevel ? item.elevation : (ancestorLevelElevation ?? '');
      // What to pass to children
      const childAncestorElev = isLevel ? item.elevation : ancestorLevelElevation;
      const isHov        = !isDragging && hoveredId === item.id;
      // Level rows and deeper all use depth-based indentation; depth=1 = one INDENT under Building
      const indent       = depth * INDENT;
      // Level group: items that are themselves a Level at any depth act as their children's group anchor.
      // An item whose nearest Level-type ancestor is LevelX belongs to LevelX's group.
      // Root-level items (with no Level ancestor, including Level items themselves) share 'ROOT'.
      const myLevelGroupId = levelGroupId; // this row belongs to the incoming group
      const childLevelGroupId = isLevel ? item.id : levelGroupId;
      const isLevelRow = isLevel; // alias for clarity in JSX below

      // Row height in edit mode: expand to 56px when any field has a validation error.
      // Growth is downward-only: inputs stay top-aligned (paddingTop 7 = same as centered in 44px)
      // and the extra 12px at the bottom holds the error message text.
      const rowHasError = editMode && (
        editErrors.has(`${item.id}_name`) || editErrors.has(`${item.id}_elevation`)
      );
      const currentRowH  = editMode ? (rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE) : ROW_H;
      // Cell alignment helpers — applied to every cell in the row so all content shifts together
      const cellAlign  = rowHasError ? 'flex-start' : 'center';
      const cellPadTop = rowHasError ? 7 : 0;

      return (
        <div key={item.id} style={{ display: 'contents' }}>
          <div
            data-lbs-id={item.id}
            data-lbs-parent={parentId ?? 'ROOT'}
            data-lbs-has-children={hasChildren ? 'true' : 'false'}
            data-lbs-level-group={myLevelGroupId}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={!editMode && hasChildren ? () => toggleExpanded(item.id) : undefined}
            style={{
              display: 'flex', alignItems: 'stretch', height: currentRowH,
              background: isDragSrc ? '#F0F2F5' : isHov ? '#F9FAFB' : 'white',
              borderBottom: '1px solid #D9D9D9',
              opacity: isDragSrc ? 0.4 : 1,
              cursor: !editMode && hasChildren ? 'pointer' : 'default',
              transition: 'background 0.1s, opacity 0.15s',
              ...rowIndicator(item.id),
            }}
          >
            {/* Drag handle (edit only) — frozen at left:0 */}
            {editMode && (
              isLevelRow
                ? <div style={{ width: 24, flexShrink: 0, position: 'sticky', left: 0, zIndex: 12, background: 'inherit' }} />
                : <div style={{ position: 'sticky', left: 0, zIndex: 12, background: 'inherit', flexShrink: 0 }}><DragHandle onMouseDown={e => onHandleMouseDown(e, { itemId: item.id, parentId, label: item.name || item.code || 'Untitled', levelGroupId: myLevelGroupId })} /></div>
            )}

            {/* Col 1 — Location Name — frozen (sticky-left) */}
            <div style={{ width: colWidths.name, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: (editMode ? 4 : 8) + indent, paddingRight: 8, gap: 4, overflow: editMode ? 'visible' : 'hidden', position: 'sticky', left: editMode ? 24 : 0, zIndex: 11, background: 'inherit' }}>
              {/* Chevron �� only visible when the item has children */}
              <button
                onClick={e => { e.stopPropagation(); if (hasChildren) toggleExpanded(item.id); }}
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0, cursor: hasChildren ? 'pointer' : 'default', opacity: hasChildren ? 1 : 0 }}
              >
                <ChevronIcon expanded={isExp} />
              </button>
              {editMode ? (
                <EditInput value={item.name} onChange={v => updItem(item.id, { name: v })} placeholder="e.g. Level 1, Zone A" error={editErrors.has(`${item.id}_name`)} errorMessage={editErrors.get(`${item.id}_name`)} />
              ) : (
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: depth === 0 ? 600 : 400, fontSize: 13, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {highlightText(item.name, search)}
                </span>
              )}
            </div>

            {/* Col 2 — Location Code */}
            <div style={{ width: colWidths.code, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
              {editMode ? (
                <EditInput value={item.code} onChange={v => updItem(item.id, { code: v })} placeholder="e.g. L01" error={editErrors.has(`${item.id}_code`)} errorMessage={editErrors.get(`${item.id}_code`)} />
              ) : (
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {highlightText(item.code, search)}
                </span>
              )}
            </div>

            {/* Col 3 — Full Code (read-only computed) */}
            <div style={{ width: colWidths.fullCode, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#616D79', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: editMode ? 'italic' : 'normal', opacity: editMode ? 0.55 : 1 }}>
                {fullCodeMap.get(item.id) ?? item.code}
              </span>
            </div>

            {/* Col 4 — Type */}
            <div style={{ width: colWidths.type, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden' }}>
              {editMode ? (
                isLevelRow ? (
                  // Level type is locked — same pill badge style as contextual "Building" / "Job Site" rows
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    borderRadius: 9999, padding: '2px 8px',
                    background: '#E5E7E9',
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    Level
                  </span>
                ) : (
                <TypeDropdown value={item.type} onChange={v => {
                  const patch: Partial<Pick<LBSItem, 'name'|'code'|'type'|'elevation'|'description'|'vs'>> = { type: v };
                  if (isLevelType(item.type) && !isLevelType(v)) patch.elevation = '';
                  updItem(item.id, patch);
                }} />
                )
              ) : (
                isLevelRow ? (
                  // Level type — same locked pill as edit mode (§ view-mode parity)
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    borderRadius: 9999, padding: '2px 8px',
                    background: '#E5E7E9',
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#616D79',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    Level
                  </span>
                ) : (
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {highlightText(item.type, search)}
                  </span>
                )
              )}
            </div>

            {/* Col 5 — Elevation — fixed width in both modes (VS is now the flex-fill column) */}
            <div style={{ width: colWidths.elevation, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {editMode ? (
                elevState === 'editable' ? (
                  // ── Active input — accepts decimal feet, auto-converts to ft-in ──
                  <ElevationInput
                    key={item.id}
                    storedValue={item.elevation}
                    hasError={editErrors.has(`${item.id}_elevation`)}
                    errorMsg={editErrors.get(`${item.id}_elevation`)}
                    onCommit={ftIn => updItem(item.id, { elevation: ftIn })}
                  />
                ) : (
                  // ── Read-only display — inherited or empty ─────────────────
                  <div
                    title={elevState === 'inherited'
                      ? `Inherited from parent Level (${displayElevation})`
                      : 'Elevation is not applicable above Level tier'}
                    style={{
                      flex: 1, minWidth: 0, height: 30, paddingLeft: 8, paddingRight: 8,
                      border: '1px solid #E0E4E8', borderRadius: 4,
                      background: '#FFFFFF', cursor: 'default',
                      display: 'flex', alignItems: 'center', overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Open Sans, sans-serif', fontSize: 13,
                      color: '#9EA3A9',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {elevState === 'inherited' ? (displayElevation || '—') : '—'}
                    </span>
                  </div>
                )
              ) : (
                // ── View mode ─────────────────────────────────────────────────
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayElevation !== '' ? displayElevation : '—'}
                </span>
              )}
            </div>

            {/* Col 6 — Vertical Segments */}
            {(() => {
              const vsEligible    = true; // Level rows are eligible — VS applies to their floor-to-ceiling height
              const compact       = vsCompact(item.vs);
              const vsOn          = !!(item.vs?.enabled);
              const hasConflict   = vsConflicts.has(item.id);
              const hasManualFlag = vsManualFlags.has(item.id);
              return (
                <div style={{ flex: 1, minWidth: 120, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, height: '100%', paddingLeft: 12, paddingRight: 8, gap: 8, overflow: 'hidden' }}>
                  {vsEligible ? (
                    editMode ? (
                      <>
                        {/* Mini toggle */}
                        <div onClick={() => {
                          const newEnabled = !vsOn;
                          if (newEnabled) {
                            // OFF → ON: open the panel to configure plenums first.
                            // Do NOT apply the enable yet — panel's Apply button does that.
                            setVsPanelItemId(item.id);
                          } else {
                            // ON → OFF: turn off immediately (no panel needed)
                            const base    = item.vs ?? defaultVSConfig();
                            const patched = applyParentLocks({ ...base, enabled: false }, parentVS);
                            applyVSWithConflictCheck(item.id, patched, false);
                            // Also clear any manual-review flag for this item
                            setVsManualFlags(prev => { const n = new Set(prev); n.delete(item.id); return n; });
                          }
                        }}
                          style={{ width: 32, height: 16, borderRadius: 8, background: vsOn ? '#FF4D00' : '#D9D9D9', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ position: 'absolute', top: 2, left: vsOn ? 16 : 2, width: 12, height: 12, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
                        </div>

                        {/* "Full Height" label when VS is off and no issues */}
                        {!vsOn && !hasConflict && !hasManualFlag && (
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontStyle: 'italic', color: '#9EA3A9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Full Height
                          </span>
                        )}

                        {/* Edit button — pencil + "Edit" + trailing ⚠ when issue (Figma Container-2298-9962) */}
                        {vsOn && (() => {
                          const isOpen  = vsPanelItemId === item.id;
                          const isIssue = hasConflict || hasManualFlag;
                          const iconColor = isIssue ? '#D97706' : isOpen ? '#FFFFFF' : '#616D79';
                          const textColor = isIssue ? '#D97706' : isOpen ? '#FFFFFF' : '#616D79';
                          return (
                            <button
                              onClick={() => setVsPanelItemId(item.id)}
                              title={isIssue
                                ? hasConflict
                                  ? 'Vertical segmentation exceeds available height — open to resolve'
                                  : 'Marked for manual review — open VS panel and apply changes to resolve'
                                : 'Configure Vertical Segmentation'}
                              style={{
                                height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: 4, padding: '0 12px',
                                background: isOpen ? '#616D79' : 'transparent',
                                border: 'none', borderRadius: 4, cursor: 'pointer',
                                flexShrink: 0, transition: 'background 0.15s', whiteSpace: 'nowrap',
                              }}
                              onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#E5E7E9'; }}
                              onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
                            >
                              {/* Pencil icon — 16×16 (Figma Icon in Frame) */}
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                                <path d={vsWarnPaths.p2d974900}
                                  stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                                <path d="M9.333 3.667L12.333 6.667"
                                  stroke={iconColor} strokeLinecap="round" strokeWidth="1.4" />
                              </svg>
                              {/* "Edit" label */}
                              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: textColor }}>Edit</span>
                              {/* Trailing ⚠ warning icon — only when issue (Figma Icon1 in Frame) */}
                              {isIssue && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                                  <path d={vsWarnPaths.p32bd4f00} fill="#FFFBE6" stroke="#D97706" strokeLinejoin="round" strokeWidth="1.225" />
                                  <path d="M7 5.6875V8.3125" stroke="#D97706" strokeLinecap="round" strokeWidth="1.225" />
                                  <path d={vsWarnPaths.p2dc3da00} fill="#D97706" />
                                </svg>
                              )}
                            </button>
                          );
                        })()}
                      </>
                    ) : (
                      /* View mode — show C / F / C, F for active plenums; '—' for everything else */
                      (() => {
                        const label = vsOn ? compact : '';
                        return label ? (
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#384857', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {label}
                          </span>
                        ) : (
                          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                        );
                      })()
                    )
                  ) : (
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#BFBFBF' }}>—</span>
                  )}
                </div>
              );
            })()}

            {/* Actions (edit only) */}
            {editMode && (() => {
              const atMaxDepth = depth >= MAX_TIERS - 1; // depth 6 = tier 8 (Building=1, Level=2, breakdown=3–8)
              return (
                <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop, justifyContent: 'center', gap: 10, height: '100%', paddingLeft: 20, paddingRight: 22, position: 'sticky', right: 0, zIndex: 4, background: 'inherit', boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
                  {/* 74px left slot — mirrors the Figma Frame width so all rows align */}
                  <div style={{ width: 74, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {atMaxDepth
                      ? (
                        <div
                          title={`Maximum ${MAX_TIERS + 1} tiers reached`}
                          style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'not-allowed', borderRadius: 4, opacity: 0.35 }}
                        >
                          <AddChildIcon />
                        </div>
                      )
                      : <IconBtn onClick={() => addChild(item.id)} title={`Add child location (tier ${depth + 3} of ${MAX_TIERS + 1})`}><AddChildIcon /></IconBtn>
                    }
                    {/* AddSibling hidden for Level rows — only shown for Spatial breakdown rows */}
                    {!isLevelRow && (
                      <IconBtn onClick={() => addSibling(item.id)} title="Add sibling location"><AddSiblingIcon /></IconBtn>
                    )}
                  </div>
                  <IconBtn onClick={() => delItem(item.id)} title="Delete location"><TrashIconSVG /></IconBtn>
                </div>
              );
            })()}
          </div>

          {/* Children — pass this item's VS config as parentVS (only if enabled) */}
          {isExp && renderItems(item.children, depth + 1, item.id, childAncestorElev, childLevelGroupId, item.vs?.enabled ? item.vs : null)}
        </div>
      );
    });
  }

  // ── Download template
  function downloadTemplate() {
    const csv = `Location Name,Location Code,Full Code,Type,Elevation (ft-in)\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = `${activeTab.label.replace(/\s+/g, '_')}_lbs_template.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  // ── Depth statistics badge
  const totalLocations = useMemo(() => {
    function countAll(items: LBSItem[]): number {
      return items.reduce((acc, item) => acc + 1 + countAll(item.children), 0);
    }
    return countAll(liveItems);
  }, [liveItems]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minWidth: 0, userSelect: isDragging ? 'none' : undefined }}>

      {/* Modals */}
      {createModalOpen && <CreateLBSModal onConfirm={addTab} onClose={() => setCreateModalOpen(false)} />}
      {removeModalOpen && <RemoveLBSModal tabLabel={activeTab?.label ?? ''} onConfirm={removeActiveTab} onClose={() => setRemoveModalOpen(false)} />}
      {deleteRowWarning && <DeleteRowWarningModal item={deleteRowWarning.item} tabLabel={activeTab?.label ?? ''} onConfirm={confirmDelItem} onCancel={() => setDeleteRowWarning(null)} />}
      {exportModalOpen && <ExportLBSModal tabLabel={activeTab?.label ?? 'LBS'} items={liveItems} sep={getSepStr(separator)} onClose={() => setExportModalOpen(false)} />}
      {vsConflictModal && (
        <VSConflictModal
          affectedCount={vsConflictModal.affectedIds.length}
          isEnabling={vsConflictModal.isEnabling}
          onAutoAdjust={handleVSConflictAutoAdjust}
          onKeepAndReview={handleVSConflictKeepAndReview}
          onCancel={handleVSConflictCancel}
        />
      )}

      {/* Drag preview */}
      {isDragging && dragItemRef.current && <DragPreview x={previewPos.x} y={previewPos.y} item={dragItemRef.current} />}

      {/* ── Tab Bar ──────────────────────────────────────────────────────── */}
      <div data-dev-anchor="lbs-tabs" style={{ display: 'flex', alignItems: 'flex-end', gap: 6, flexShrink: 0, paddingTop: 8 }}>
        {tabs.map(tab => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={activeView === 'primary' && tab.id === activeTabId}
            editMode={editMode}
            isRenaming={renamingTabId === tab.id}
            onActivate={() => { setActiveView('primary'); setActiveTabId(tab.id); setSearch(''); setExpanded(INITIAL_LBS_EXPANDED); }}
            onStartRename={() => { setActiveTabId(tab.id); setRenamingTabId(tab.id); }}
            onCommitRename={name => renameTab(tab.id, name)}
            onCancelRename={() => setRenamingTabId(null)}
          />
        ))}
        {/* Vertical Zones fixed tab */}
        <div
          data-dev-anchor="lbs-vertical-zones-tab"
          onClick={() => !editMode && setActiveView('vz')}
          style={{
            position: 'relative', height: 44,
            minWidth: 120, paddingLeft: 16, paddingRight: 16,
            background: activeView === 'vz' ? '#FFFFFF' : '#FAFAFA',
            border: '1px solid #F0F0F0',
            borderBottom: activeView === 'vz' ? '3px solid #FF4D00' : '1px solid #F0F0F0',
            borderRadius: '4px 4px 0 0',
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: activeView === 'vz' ? 600 : 400,
            color: activeView === 'vz' ? '#243746' : '#384857',
            cursor: editMode ? 'default' : 'pointer',
            flexShrink: 0, whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 6,
            boxSizing: 'border-box', transition: 'background 0.1s',
            opacity: editMode ? 0.4 : 1,
          }}
        >
          <VerticalZonesTabIcon color={activeView === 'vz' ? '#243746' : '#616D79'} />
          <span>Vertical Zones</span>
        </div>
        {/* Add LBS tab — hidden for the current release scope, preserved for future scope. */}
        {SHOW_LBS_TAB_CREATION && (
          <button
            onClick={() => !editMode && setCreateModalOpen(true)}
            title="Create new LBS"
            style={{ height: 44, width: 48, background: '#FAFAFA', border: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', borderRadius: '4px 4px 0 0', cursor: editMode ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: editMode ? 0.4 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M0 11H22" stroke="#FF4D00" strokeWidth="2" />
              <path d={P_PLUS_VERTICAL} stroke="#FF4D00" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Vertical Zones View ───────────────────────────────────────────── */}
      {activeView === 'vz' && (
        <VerticalZonesTable
          zones={vzones}
          setZones={setVzones}
          levelNodes={levelNodes}
          allLbsNodes={allLbsNodes}
          tabs={tabs}
        />
      )}

      {/* ── Primary LBS Table Container ───────────────────────────────────── */}
      {activeView === 'primary' && <div data-dev-page-mode={editMode ? 'edit' : 'view'} style={{ flex: 1, border: '1px solid #D9D9D9', borderRadius: '0 8px 8px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, background: 'white' }}>

        {/* ── Toolbar ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, flexShrink: 0, paddingLeft: 12, paddingRight: 12, background: '#FAFAFA', borderBottom: '1px solid #D9D9D9', gap: 8 }}>

          {/* ── LEFT section ─────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Add Building / Add Level buttons are now in the Actions column of Project / Building rows */}
            {/* Search — always visible */}
            <div data-dev-anchor="lbs-search" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: colWidths.name, flexShrink: 0 }}>
              <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><SearchIcon /></div>
              <input type="text" placeholder="Search locations…" value={search} onChange={e => setSearch(e.target.value)}
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
            {/* Expand / Collapse All — disabled when no tiers are expandable/collapsible */}
            <ToolbarBtn onClick={expandAll} disabled={!canExpandAll}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d={lbsToolbarPaths.p2ad83800} fill={canExpandAll ? '#384857' : '#BFBFBF'} /></svg>
              <span>Expand All</span>
            </ToolbarBtn>
            <ToolbarBtn onClick={collapseAll} disabled={!canCollapseAll}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d={lbsToolbarPaths.p22287070} fill={canCollapseAll ? '#616D79' : '#BFBFBF'} /></svg>
              <span>Collapse All</span>
            </ToolbarBtn>
          </div>

          {/* ── RIGHT section ────────────────────────────────────────────────── */}
          <div data-dev-anchor={editMode ? 'lbs-edit-save-cancel' : 'lbs-import-export'} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {editMode ? (
              <>
                <CancelBtn onClick={cancelEdit} />
                {/* VS unresolved-flags badge — matches Figma Container-2298-10014 */}
                {(vsConflicts.size > 0 || vsManualFlags.size > 0) && (() => {
                  const total = vsConflicts.size + vsManualFlags.size;
                  return (
                    <div
                      title={`${total} vertical segmentation ${total === 1 ? 'issue' : 'issues'} must be resolved before saving`}
                      style={{
                        position: 'relative', display: 'flex', alignItems: 'center', gap: 5,
                        height: 36, padding: '0 11px',
                        background: '#FFFBE6', borderRadius: 4, flexShrink: 0, cursor: 'default',
                      }}
                    >
                      {/* Inset border — matches Figma border overlay pattern */}
                      <div style={{ position: 'absolute', inset: 0, border: '1px solid #FFD666', borderRadius: 4, pointerEvents: 'none' }} />
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <path d={vsWarnPaths.p32bd4f00} fill="#FFFBE6" stroke="#D97706" strokeLinejoin="round" strokeWidth="1.225" />
                        <path d="M7 5.6875V8.3125" stroke="#D97706" strokeLinecap="round" strokeWidth="1.225" />
                        <path d={vsWarnPaths.p2dc3da00} fill="#D97706" />
                      </svg>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#B45309', whiteSpace: 'nowrap' }}>
                        {total} unresolved {total === 1 ? 'flag' : 'flags'}
                      </span>
                    </div>
                  );
                })()}
                <SaveBtn onClick={saveEdit} disabled={(showErrors && allErrors.size > 0) || vsConflicts.size > 0 || vsManualFlags.size > 0} />
              </>
            ) : (
              <>
                {SHOW_LBS_IMPORT_EXPORT && (
                  <>
                    <button onClick={downloadTemplate} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400, color: '#1890FF', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                      Download Import Template
                    </button>
                    <SecondaryBtn onClick={() => {}}><ImportIcon /><span>Import</span></SecondaryBtn>
                    <SecondaryBtn onClick={() => setExportModalOpen(true)}><ExportIcon /><span>Export</span></SecondaryBtn>
                  </>
                )}
                <PrimaryEditBtn onClick={enterEditMode} />
              </>
            )}
          </div>
        </div>

        {/* ── Validation banner ─────────────────────────────────────────────── */}
        {editMode && showErrors && allErrors.size > 0 && <ValidationBanner count={allErrors.size} />}

        {/* ── MainCanvas + Push Side Panel (flex-row) ───────────────────────── */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>

        {/* ── Scrollable area (MainCanvas) ───────────────────────────────────── */}
        <div data-lbs-scroll data-dev-anchor="lbs-tree" style={{ flex: 1, overflowX: 'auto', overflowY: 'auto', minHeight: 0 }}>
          {/* VS is now flex-fill — its 120px min counts; Elevation always fixed; Actions is sticky so excluded */}
          <div style={{ minWidth: (editMode ? 24 : 0) + colWidths.name + colWidths.code + colWidths.fullCode + colWidths.type + colWidths.elevation + 120, display: 'flex', flexDirection: 'column' }}>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'stretch', height: HEADER_H, background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 20 }}>
              {/* Drag handle slot — sticky at left: 0 in edit mode */}
              {editMode && <div style={{ width: 24, flexShrink: 0, background: '#FAFAFA', position: 'sticky', left: 0, zIndex: 22 }} />}
              {/* 1 — Location Name — frozen (sticky-left) */}
              <LBSHeaderCell label="Location Name" style={{ width: colWidths.name }}      editMode={editMode} required colKey="name" onDelta={onColDelta} stickyLeft={editMode ? 24 : 0} />
              {/* 2 — Location Code */}
              <LBSHeaderCell label="Location Code" style={{ width: colWidths.code }}      editMode={editMode} colKey="code"      onDelta={onColDelta} devAnchor="lbs-location-code" />
              {/* 3 — Full Code header with separator picker (edit mode only) */}
              <div style={{ position: 'relative', width: colWidths.fullCode, flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12, paddingRight: 10, gap: 8, background: '#FAFAFA', overflow: 'clip' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857', whiteSpace: 'nowrap', flex: 1 }}>
                  <span data-dev-anchor="lbs-full-code">Full Code</span>
                </span>
                {editMode && <SeparatorDropdown value={separator} onChange={setSeparator} />}
                <ColResizeHandle colKey="fullCode" onDelta={onColDelta} cellHovered={false} />
              </div>
              {/* 4 — Type */}
              <LBSHeaderCell label="Type"          style={{ width: colWidths.type }}      editMode={editMode} colKey="type"      onDelta={onColDelta} />
              {/* 5 — Elevation — fixed resizable in edit mode, flex-fill in view mode */}
              {/* 5 — Elevation — fixed resizable in edit, fixed at colWidths value in view */}
              <LBSHeaderCell label="Elevation (ft-in)" style={{ width: colWidths.elevation }} editMode={editMode} colKey={editMode ? "elevation" : undefined} onDelta={editMode ? onColDelta : undefined} />
              {/* 6 — Vertical Segments — flex-fill in both modes (takes all remaining space before sticky Actions) */}
              <LBSHeaderCell label="Vertical Segments" fillFlex editMode={editMode} showInfoTooltip devAnchor="lbs-vertical-segments" />
              {editMode && (
                <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F5F5', paddingLeft: 4, position: 'sticky', right: 0, zIndex: 22, boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)' }}>
                  <span data-dev-anchor="lbs-edit-actions" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#384857' }}>Actions</span>
                </div>
              )}
            </div>

            {/* ── Contextual Project Context rows (visible in both edit and view mode when toggle is on) ─── */}
            {showProjectContext && (() => {
              const jobSiteIcon = (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#9CA4AE" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" stroke="#9CA4AE" strokeWidth="1.5" />
                </svg>
              );
              const rows: React.ReactNode[] = [];
              // Job Site row — only if a Job Site is assigned (non-empty string)
              if (ctxJobSite && ctxJobSite.trim() !== '') {
                rows.push(renderContextualRow(ctxJobSite, 'Job Site', jobSiteIcon, false));
              }
              // Project row — always shown; no icon, project code shown in Location Code column
              rows.push(renderContextualRow(ctxProjectName, 'Project', null, false, PROJECT_INFO.code || undefined));
              return rows;
            })()}

            {/* Rows — Building items and their children are rendered by renderItems */}
            {renderItems(displayItems)}

            {/* Empty state */}
            {displayItems.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12 }}>
                {editMode ? (
                  <button
                    onClick={addBuilding}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FFF3EE', border: '1.5px dashed #FF4D00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <NodeAddIcon stroke="#FF4D00" size={30} />
                    </div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>Click + to add the first building.</span>
                  </button>
                ) : (
                  <>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <NodeAddIcon stroke="#BFBFBF" size={30} />
                    </div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#8C8C8C' }}>
                      {search ? 'No levels match your search.' : 'No levels yet. Click Edit to add.'}
                    </span>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
        {/* ── End scrollable area */}

        {/* ── Push Side Panel — slides in from the right, pushes MainCanvas left */}
        <div data-dev-anchor={editMode && vsPanelItemId ? 'lbs-vs-side-panel' : undefined} style={{
          width: editMode && vsPanelItemId ? 370 : 0,
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'width 0.26s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          borderLeft: editMode && vsPanelItemId ? '1px solid #D9D9D9' : 'none',
        }}>
          {editMode && vsPanelItemId && (() => {
            const ctx = findVSContext(editItems, vsPanelItemId);
            if (!ctx) return null;
            // Compute floor height = next level elevation − ancestor level elevation
            const sortedLevels   = collectLevels(editItems);
            const curInches      = ctx.levelElevation ? parseFtIn(ctx.levelElevation) : NaN;
            const nextLvl        = !isNaN(curInches) ? sortedLevels.find(l => l.inches > curInches) : undefined;
            const floorHInches   = nextLvl && !isNaN(curInches) ? nextLvl.inches - curInches : null;
            const floorHeight    = floorHInches !== null ? feetToFtIn(floorHInches / 12) : null;
            return (
              <VSSidePanel
                item={ctx.item}
                parentVS={ctx.parentVS}
                floorHeight={floorHeight}
                parentConsumedInches={ctx.parentConsumedInches}
                isNewEnable={!(ctx.item.vs?.enabled)}
                onClose={() => setVsPanelItemId(null)}
                onApply={vs => applyVSWithConflictCheck(vsPanelItemId, vs, true)}
              />
            );
          })()}
        </div>

        {/* ── End flex-row content zone */}
        </div>

      </div>}
    </div>
  );
}
