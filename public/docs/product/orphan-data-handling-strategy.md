# Orphan Data Handling Strategy for Referenced Fields

## Purpose

This document defines the platform strategy for handling referenced data when the source record is removed, disabled, or no longer available for selection. The goal is to preserve historical context, prevent accidental data loss, and give users a clear path to replace obsolete references with active values.

## Core Principle

Referenced records should not be hard deleted. When a referenced record is removed from active use, it should be soft deleted or marked unavailable.

Soft deletion makes orphan handling predictable because existing records can still resolve the historical reference, while new assignments can be limited to active records only.

## Definitions

| Term | Definition |
| --- | --- |
| Referenced Field | A field that stores a reference to another record or predefined value. |
| Referenced Record | The source record selected by a referenced field. |
| Active Reference | A referenced record that exists and is available for new selection. |
| Unavailable Reference | A referenced record that is soft deleted, inactive, deprecated, or otherwise not selectable. |
| Orphan Reference | A stored reference that cannot resolve to an active referenced record. |
| Display Snapshot | The last-known display value stored with the reference for historical resilience. |

## Detection Rule

A stored reference should be treated as unavailable or orphaned when:

```text
IF referenced_record does not exist
OR referenced_record.deletedAt is not null
OR referenced_record.status is not active
THEN referenceStatus = unavailable
```

For UI purposes, unresolved unavailable references may be labeled as `Orphaned`.

## Storage Requirements

Referenced fields should store:

- Stable referenced ID where possible.
- Display snapshot at the time of assignment.
- Optional source metadata needed for audit or troubleshooting.

The system should prefer computed orphan status over a persisted orphan flag in the first implementation phase.

## Display Behavior

The UI must continue to display stored unavailable references. It must not blank, null, or hide them.

Recommended display pattern:

```text
Level 2 (Orphaned)
```

or, where more precise language is needed:

```text
Level 2 (Deleted)
```

The UI should include contextual guidance:

- This value is no longer available in the active source data.
- Select an active value to replace it.
- Replacement is irreversible through the normal UI.

## Selection Behavior

Only active referenced records may appear in dropdowns, search pickers, trees, or typeaheads for new assignments.

Unavailable or orphaned references:

- Remain visible when already stored.
- Are not selectable for new assignments.
- Are not offered as replacement options.

## Edit and Save Behavior

Existing orphan reference, unchanged:

- Save is allowed.
- Stored value and display snapshot remain preserved.

Replace with active reference:

- Save is allowed.
- Stored ID and display snapshot update to the new active reference.
- Previous orphan reference is no longer associated with the record.

Assign unavailable reference:

- Save is rejected.
- API and UI must enforce the same validation.

New record:

- Only active references may be selected.

## Soft Delete Behavior

When a referenced record is removed:

- Mark it as soft deleted or inactive.
- Remove it from active pickers.
- Preserve existing references.
- Preserve existing display snapshots.
- Do not cascade nulls into dependent records.

Hard delete should be reserved for exceptional administrative cleanup after dependency review.

## LBS Example

In Location Breakdown Structure, Vertical Zones reference Primary LBS Level records through start and end level fields.

Current mock behavior already follows part of this strategy:

- Vertical Zones store `startLevelId` and `endLevelId`.
- Vertical Zones also store `startLevelName` and `endLevelName` snapshots.
- If a referenced level is missing from the active Primary LBS, the UI displays the snapshot with an orphan badge.
- Level dropdowns only show active level records.

Planned production behavior:

- Removing a Primary LBS Level should soft delete the level rather than hard delete it.
- Vertical Zones referencing that level should continue showing the stored snapshot.
- The deleted level should not be selectable for new Vertical Zone assignments.
- Users may replace the orphaned start or end level with an active level.
- Linked location references should follow the same orphan handling behavior as start and end levels.

## API Contract

Referenced fields should return enough information for the UI to render active and orphan states consistently.

Example:

```json
{
  "value": "bld-l02",
  "displayText": "Level 2",
  "referenceStatus": "orphaned",
  "isOrphan": true
}
```

Recommended statuses:

- `active`
- `inactive`
- `deleted`
- `orphaned`
- `unresolved`

## Validation Matrix

| Scenario | Expected Behavior |
| --- | --- |
| Existing orphan value, unchanged | Allowed |
| Existing orphan replaced with active value | Allowed |
| Existing active value unchanged | Allowed |
| Assign soft-deleted value | Rejected |
| Assign missing value by API | Rejected |
| New record creation | Active values only |
| Bulk edit | Active replacement values only |

## Success Criteria

- Previously stored referenced values are never lost automatically.
- Orphaned values remain visible and understandable.
- Obsolete values cannot be reused for new assignments.
- Users can replace orphaned values with active values.
- UI and API behavior is consistent across referenced fields.
