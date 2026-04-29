# Roles and Permissions Fallback Strategy

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

- Use `none` for apps where `none` is allowed.
- Use the first valid minimum when `none` is not applicable.
- In the current prototype, Home cannot use `none`, so it falls back to `read-only`.

Explicit fallback for a role with no saved permission record:

- Home: `read-only`
- Files: `none` in the UI, or technically `null`/missing permission data in storage before fallback is applied.
- Settings: `none` in the UI, or technically `null`/missing permission data in storage before fallback is applied.

This prevents blank permission states and keeps custom or newly imported roles from accidentally inheriting elevated access.

## Import and Custom Role Behavior

Imported roles are a flat list. The import template supports:

- `Name` as the required first column.
- `Code` as optional.
- `Note` as optional.

Imported roles should not create groups, parent rows, trade rows, levels, or hierarchy. Any new role that does not yet have explicit permissions should use the permissions fallback rule above.

## Implementation Notes

- Role identity is currently name-based for user assignment protection in the prototype because mock users store `accessLevel` as display text.
- Production should use stable role IDs for assignment checks.
- Restore Defaults is an all-or-nothing action: if any protected role is assigned, no defaults are restored.
- Permission fallback must be non-elevating. Missing permission data should never grant edit/admin access.
