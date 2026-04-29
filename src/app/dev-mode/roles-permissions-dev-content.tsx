import React from 'react';
import type { DevPageContent } from '../components/dev-mode';

const fallbackStrategyMarkdown = `# Roles and Permissions Fallback Strategy

## Purpose

Roles are project-scoped labels that can be assigned to users. Permissions are the access matrix attached to a role. The fallback strategy keeps user assignments safe when role definitions are edited, imported, deleted, or restored to defaults.

## Role Restore Default Rule

Restore Defaults must not overwrite any current role that is assigned to a user.

Before restore runs, the system checks every role currently visible in the edit draft against project member assignments. If any user has one of those roles, restore is blocked and the user sees a modal explaining:

- Restore Defaults cannot override assigned roles.
- No role changes are applied.
- The user must remove or reassign all users from the current roles first.
- After no users are assigned to those roles, the user can return and click Restore Defaults again.

This rule applies even if the default role set contains the same role name. The current assignment is treated as protected until users are explicitly reassigned.

## Delete Rule

Deleting a single role follows the same protection model. If a role is assigned to one or more project members, delete is blocked and the user must reassign those members first.

## Permissions Fallback Rule

When the permissions matrix cannot find a saved permission record for a role, the role falls back to the minimum valid access state:

- Use \`none\` for apps where \`none\` is allowed.
- Use the first valid minimum when \`none\` is not applicable.
- In the current prototype, Home cannot use \`none\`, so it falls back to \`read-only\`.

Explicit fallback for a role with no saved permission record:

- Home: \`read-only\`
- Files: \`none\` in the UI, or technically \`null\`/missing permission data in storage before fallback is applied.
- Settings: \`none\` in the UI, or technically \`null\`/missing permission data in storage before fallback is applied.

This prevents blank permission states and keeps custom or newly imported roles from accidentally inheriting elevated access.

## Import and Custom Role Behavior

Imported roles are a flat list. The import template supports:

- \`Name\` as the required first column.
- \`Code\` as optional.
- \`Note\` as optional.

Imported roles should not create groups, parent rows, trade rows, levels, or hierarchy. Any new role that does not yet have explicit permissions should use the permissions fallback rule above.

## Implementation Notes

- Role identity is currently name-based for user assignment protection in the prototype because mock users store \`accessLevel\` as display text.
- Production should use stable role IDs for assignment checks.
- Restore Defaults is an all-or-nothing action: if any protected role is assigned, no defaults are restored.
- Permission fallback must be non-elevating. Missing permission data should never grant edit/admin access.
`;

const fallbackDocument = {
  id: 'roles-permissions-fallback-strategy',
  title: 'Roles and Permissions Fallback Strategy',
  sourceUrl: '/docs/product/roles-permissions-fallback-strategy.md',
  markdown: fallbackStrategyMarkdown,
};

export const rolesDevContent: DevPageContent = {
  documents: [fallbackDocument],
  annotations: [
    {
      id: 'roles-flat-list',
      anchor: 'roles-flat-list-root',
      mode: 'all',
      layerId: 'field-explanations',
      placement: 'right',
      title: 'Guidance Marker: Roles Are A Flat List',
      body: (
        <span>
          Roles no longer have visible grouping. Import, view, edit, and export should treat each row as one role with Name required and Code/Note optional.
        </span>
      ),
    },
    {
      id: 'roles-restore-defaults-block',
      anchor: 'roles-restore-defaults',
      mode: 'edit',
      layerId: 'notes',
      placement: 'bottom',
      title: 'Guidance Marker: Restore Defaults Is Protected',
      body: (
        <span>
          Restore Defaults must first check whether any current role is assigned to users. If yes, show the blocking modal and do not replace the draft defaults.
        </span>
      ),
    },
    {
      id: 'roles-import-sample-file',
      anchor: 'roles-import-sample',
      mode: 'view',
      layerId: 'notes',
      placement: 'bottom',
      title: 'Guidance Marker: Verify The New Roles Import Sample',
      body: (
        <span>
          The current role import sample is the newly uploaded <strong>Roles_Import_Sample.xlsx</strong>. Dev should download this file, try importing it, verify the flat role list imports correctly, and make sure the production product includes this exact sample file.
        </span>
      ),
    },
  ],
};

export const rolePermissionsDevContent: DevPageContent = {
  documents: [fallbackDocument],
  annotations: [
    {
      id: 'permissions-fallback-root',
      anchor: 'permissions-fallback-root',
      mode: 'all',
      layerId: 'field-explanations',
      placement: 'bottom',
      title: 'Guidance Marker: Non-Elevating Permission Fallback',
      body: (
        <span>
          If a role has no saved permission record, the matrix falls back to Home = Read Only, Files = None, and Settings = None. Missing permissions should never grant edit or admin access.
        </span>
      ),
    },
    {
      id: 'permissions-role-list',
      anchor: 'permissions-role-list',
      mode: 'all',
      layerId: 'notes',
      placement: 'right',
      title: 'Guidance Marker: Role Selection Drives The Matrix',
      body: (
        <span>
          The selected role controls which permission record is read. New or imported roles with no saved permissions should display Home as Read Only and Files/Settings as None until explicit access is saved.
        </span>
      ),
    },
    {
      id: 'permissions-matrix',
      anchor: 'permissions-matrix',
      mode: 'all',
      layerId: 'field-explanations',
      placement: 'left',
      title: 'Guidance Marker: Fallback Uses Minimum Valid Access',
      body: (
        <span>
          App-specific not-applicable rules still apply. Home cannot use None, so missing permission data falls back to Read Only. Files and Settings can use None, so missing data falls back to None.
        </span>
      ),
    },
  ],
};
