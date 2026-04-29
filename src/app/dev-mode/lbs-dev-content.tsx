import React from 'react';
import type { DevPageContent } from '../components/dev-mode';
import { lbsPrdDocuments } from './lbs-prd-content';
import { orphanDataHandlingDocument } from './orphan-data-dev-content';

function GuidanceList({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
      {children}
    </ul>
  );
}

export const lbsDevContent: DevPageContent = {
  documents: [...lbsPrdDocuments, orphanDataHandlingDocument],
  annotations: [
    {
      id: 'view-lbs-tabs',
      anchor: 'lbs-tabs',
      mode: 'view',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: LBS Tabs',
      body: (
        <span>
          Each tab is a separate Location Breakdown Structure. The Primary LBS is the system of record for hierarchical containment, while Vertical Zones are a separate relational layer for spaces that continue across levels.
        </span>
      ),
    },
    {
      id: 'view-lbs-orphan-data',
      anchor: 'lbs-vertical-zones-tab',
      mode: 'view',
      layerId: 'notes',
      placement: 'bottom',
      title: 'Guidance Marker: Vertical Zones Can Hold Orphan Level References',
      body: (
        <span>
          Vertical Zones reference Primary LBS levels. If a referenced level is soft-deleted or unavailable, keep the stored value and snapshot visible, label it as orphaned, and only allow replacement with active levels.
        </span>
      ),
    },
    {
      id: 'view-lbs-search',
      anchor: 'lbs-search',
      mode: 'view',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Search Is View-Only Filtering',
      body: (
        <span>
          Search filters what the viewer sees; it does not change the saved LBS tree. Developers should preserve the underlying hierarchy, expansion state, and generated codes while filtering rows.
        </span>
      ),
    },
    {
      id: 'view-lbs-local-code',
      anchor: 'lbs-location-code',
      mode: 'view',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Location Code Is Local',
      body: (
        <span>
          Location Code is only the current node segment. A child under <strong>B2</strong> should store its own segment, not repeat the parent. Parent segments are added automatically into Full Code.
        </span>
      ),
    },
    {
      id: 'view-lbs-full-code',
      anchor: 'lbs-full-code',
      mode: 'view',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Full Code Is Generated',
      body: (
        <span>
          Full Code is generated from the project path plus every local Location Code segment. This generated value must be unique, but the local Location Code can repeat in different branches when the resulting Full Code stays unique.
        </span>
      ),
    },
    {
      id: 'view-lbs-tree',
      anchor: 'lbs-tree',
      mode: 'view',
      layerId: 'notes',
      placement: 'right',
      title: 'Guidance Marker: Read The Tree As Containment',
      body: (
        <div>
          <p style={{ margin: 0 }}>The tree answers <strong>where</strong> something exists on a level. Context rows such as Job Site and Project frame the path, then Building, Level, and spatial nodes define containment.</p>
          <GuidanceList>
            <li>Tier 2 Level rows carry elevation.</li>
            <li>Tier 3-8 rows break the level into areas, rooms, or zones.</li>
            <li>Vertical continuity belongs in Vertical Zones, not by duplicating tree branches.</li>
          </GuidanceList>
        </div>
      ),
    },
    {
      id: 'view-lbs-import-export',
      anchor: 'lbs-import-export',
      mode: 'view',
      layerId: 'field-explanations',
      placement: 'left',
      title: 'Guidance Marker: Import And Export Respect Generated Codes',
      body: (
        <span>
          Template download, Import, and Export are operational paths around the same rules: users provide local location data, while the system generates and validates Full Code from the hierarchy.
        </span>
      ),
    },
    {
      id: 'edit-lbs-draft-session',
      anchor: 'lbs-edit-save-cancel',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Edit Uses A Draft Tree',
      body: (
        <span>
          Edit mode works on a draft copy of the committed LBS. <strong>Cancel</strong> discards the draft. <strong>Save changes</strong> validates the draft, writes it back to the active tab, and returns the page to view mode.
        </span>
      ),
    },
    {
      id: 'edit-lbs-separator',
      anchor: 'lbs-separator',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Separator Controls Full Code Display',
      body: (
        <span>
          The separator changes how Full Code is generated and validated during the edit session. The current default is a dot, so parent and child segments render like <strong>BLDG.L01.ROOM101</strong>.
        </span>
      ),
    },
    {
      id: 'edit-lbs-required-local-code',
      anchor: 'lbs-location-code',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Required Local Segment',
      body: (
        <span>
          Location Code is required for saved location nodes and should stay local to the row. Developers should validate the generated path, not force global uniqueness on this one field.
        </span>
      ),
    },
    {
      id: 'edit-lbs-full-code-validation',
      anchor: 'lbs-full-code',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Full Code Must Be Unique',
      body: (
        <span>
          Full Code is read-only because it is derived from the draft tree. Save must block duplicate generated Full Codes, missing required values, and unresolved vertical segmentation issues.
        </span>
      ),
    },
    {
      id: 'edit-lbs-actions',
      anchor: 'lbs-edit-actions',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'left',
      title: 'Guidance Marker: Actions Mutate The Draft',
      body: (
        <span>
          Actions add, remove, or position nodes in the draft tree. Add Level belongs under Building rows, child/sibling actions apply to spatial breakdown rows, and delete removes the selected node plus its descendants.
        </span>
      ),
    },
    {
      id: 'edit-lbs-vertical-segments',
      anchor: 'lbs-vertical-segments',
      mode: 'edit',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Vertical Segments Can Block Save',
      body: (
        <span>
          Vertical Segments model ceiling, occupied, and floor height inside a level. Enabling or changing them can affect descendants, so conflicts and manual-review flags must be resolved before Save is enabled.
        </span>
      ),
    },
  ],
};
