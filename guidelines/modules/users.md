# Users Module

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules.
> Generic table behaviour is in [`../components/tables.md`](../components/tables.md).
> Generic modal specs are in [`../components/modals.md`](../components/modals.md).
> Filter panel is in [`../patterns/filtering.md`](../patterns/filtering.md).
> Search behaviour is in [`../patterns/search.md`](../patterns/search.md).
> Selection/checkbox behaviour is in [`../patterns/selection.md`](../patterns/selection.md).

---

## 1. Users Table

**File:** `/src/app/components/users-table.tsx`

### 1.1 Toolbar

Located directly above the table. Button order (left to right):

1. **Search input** — `width: 276px`; placeholder `"Search users…"`; live filters by `user.name` + `user.email`
2. **Filter** button — Secondary Pressed style (`bg #616D79`, `border #616D79`, `color #FFFFFF`) while the filter panel is open; orange badge showing active filter count when filters are applied
3. **Export** split button (Segmented Secondary Medium, §19) — left segment opens Export CSV modal; right chevron segment drops down with two options:
   - _Export as CSV file_ — opens Export CSV modal
   - _Download import template_ — triggers immediate `.csv` download (`inertia-users-export-template.csv`)
4. **Import** button — opens Import CSV modal
5. **Table view** toggle — `IconRegularTableList` icon; `#FF4D00` when active, `#616D79` inactive
6. **Column settings** button — `column_setting` icon from `svg-2lc95mvujv`; `#616D79` inactive, `#FF4D00` while the Column Settings panel is open
7. **Add User** CTA — `bg #FF4D00`, white text, white `+` icon, `border-radius: 4px`

### 1.2 Column Definitions

| Key | Label | Groupable | Default visible | Min width |
|---|---|---|---|---|
| `user` | Name | — | ✅ (required) | `240px` |
| `jobTitle` | Job Title | ❌ | ✅ | canvas-measured |
| `email` | Email | ❌ | ✅ (required) | canvas-measured |
| `company` | Company | ✅ | ✅ | canvas-measured |
| `office` | Office | ✅ | ✅ | canvas-measured |
| `accessLevel` | Role Access Level | ✅ | ✅ | canvas-measured |
| `userType` | User Type | ✅ | ✅ | canvas-measured |
| `status` | Status | ✅ | ✅ | canvas-measured |
| `emailDomain` | Domain | ✅ | ❌ | canvas-measured |
| `address` | Address | ❌ | ❌ | canvas-measured |

**Canvas min-width formula:** `measureLabel(label, '600 13px Open Sans') + 12px padding + 20px icons budget`

**Required columns** (`Name`, `Email`) cannot be hidden from the Column Settings panel — their visibility checkbox is rendered in a disabled state.

### 1.3 User Cell (Name Column)

```
[Avatar 32×32px border-radius 50%]  [Name 13px #1D2C38 weight 600]
                                     [Email 11px #616D79]
```

**Avatar fallback (initials):** first + last initial; background colour cycled by `user.id % 10` from the 10-colour palette. See [`../foundations.md §7.5`](../foundations.md).

**Search highlighting:** when a search query is active, `highlightText()` is applied to the **Name** portion of the user cell. Email is not highlighted in this cell (it is searchable for filtering but not visually highlighted in the avatar+name cell). See [`../patterns/search.md`](../patterns/search.md).

### 1.4 Actions Cell

Two icon buttons in the fixed `60px` sticky-right column:

| Button | Icon | Action |
|---|---|---|
| **Info** | `InfoIcon` (inline SVG) | Opens the Personal Info Panel for this user |
| **Ellipsis** | `EllipsisIcon` | Opens a context menu for row-level actions |

### 1.5 Search

| Property | Value |
|---|---|
| Placeholder | `Search users…` |
| Width | `276px` |
| Searchable fields | `user.name`, `user.email` |
| Filter logic | Case-insensitive substring match across both fields (OR); empty query returns all users |
| Highlighting | `highlightText()` applied to `user.name` in the name cell |

### 1.6 Grouping

**Default Group By:** `company` (Company column)

- Applied on initial render.
- Persisted in `localStorage` keyed by `projectId` (`'inertia-nexus-groupby-{projectId}'`).
- If a saved preference exists it overrides the default on mount.
- Users can drag any **groupable** column header (see §1.2) to the Group By lane to add or replace grouping levels.
- Users can clear individual chips or use "Clear" to remove all grouping.

**Groupable columns:** `company`, `office`, `accessLevel`, `userType`, `status`, `emailDomain`

**Non-groupable columns:** `jobTitle`, `email`, `address` — drag is rejected by the drop zone with a red feedback state.

### 1.7 Sort

- Click a column header → sort ascending; click again → descending; click again → clear.
- Only one column sorted at a time.
- Sort and Group By do not conflict — sort applies within each group's row list.

### 1.8 Filter Fields

Handled by the Filter Panel (see [`../patterns/filtering.md`](../patterns/filtering.md)):

| Field key | Label | Filter type |
|---|---|---|
| `company` | Company | Multi-select |
| `office` | Office | Multi-select |
| `emailDomain` | Email Domain | Multi-select |
| `status` | Status | Multi-select |
| `permissionType` | Permission Type | Multi-select |
| `userType` | User Type | Multi-select |
| `accessLevel` | Access Level | Multi-select |

Filter logic: OR within a field, AND across fields. Empty field = no filter on that dimension.

### 1.9 Table Density

Toggled from the Column Settings panel. Drives row and group row heights:

| Density | Data row | Group row |
|---|---|---|
| Compact | `36px` | `22px` |
| Normal (default) | `48px` | `32px` |
| Expanded | `60px` | `40px` |

### 1.10 Column Freeze

Controlled from the Column Settings panel ("Freeze up to column" counter, range `0`–`5`):

- `0` = no frozen columns (default).
- `≥ 1` = Name column is frozen first (Column 1); each additional count freezes the next visible dynamic column from the left.
- The Checkbox column also becomes sticky-left when freeze is active.
- The last frozen column gets a `2px solid #9CA4AE` right border separator across all rows (header + data + group rows).
- Group header rows pin to `left: 0` when any freeze is active.

---

## 2. Personal Info Panel

**File:** `/src/app/components/personal-info-panel.tsx`

- Slides in from the right side of the screen.
- Triggered by the **Info icon** in the table row Actions cell.
- Close via `×` icon button or pressing `Escape`.

### Content Displayed

- Large avatar (initials, palette cycles by `id % 6` — see [`../foundations.md §7.5`](../foundations.md))
- Full name
- Job title
- Company
- Office address
- Phone
- Email
- Permission type
- Invitation timestamp

### SVG Assets

Panel header uses its own SVG import set: `svg-hk4l0szw5g`, `svg-pm2yaulvbc`, and related modules.

### Status / Invite Actions (within panel)

- **Suspend / Activate** toggle — calls `handleStatusChange(userId, nextStatus)` and syncs the open panel state.
- **Re-invite** (for Expired Invitation users) — calls `handleReinvite(userId, 'Pending Invitation', newInvitedAt)` and updates both the table and the panel.

---

## 3. Column Settings Panel

**File:** `/src/app/components/column-settings-panel.tsx`

- Positioned relative to its trigger button (Column Settings button in toolbar).
- Panel width `300px`; appears as a fixed popover, closes on outside click or `Escape`.
- Column Settings icon renders in `#FF4D00` while the panel is open.

### Panel Sections

1. **Table Density** — Compact / Normal / Expanded toggle (three Tertiary Medium icon buttons)
2. **Freeze up to column** — `−` / `+` segmented counter (`0`–`5`)
3. **Column list** — toggleable + reorderable rows via `react-dnd`

### Column List Row

- Grip handle on the left (drag to reorder within the list)
- Checkbox — `#0E70CB` checked; disabled for required columns
- Column label — Inter `400` `14px` `#262626`

**Reset** link at the bottom of the panel restores `DEFAULT_COL_SETTINGS`.

---

## 4. Selection Action Bar

**File:** `/src/app/components/selection-action-bar.tsx`

Appears at the bottom of the viewport when one or more table rows are selected.

| Property | Value |
|---|---|
| Position | `fixed`, full-width, above the table pagination |
| Visibility | Hidden when `selectedIds.size === 0`; visible when `≥ 1` |
| Content | "{N} users selected" + action buttons |

### Action Buttons

| Button | Style | Action |
|---|---|---|
| **Resend invite** | Secondary | Resends the invitation email for selected users |
| **Suspend** | Secondary | Sets all selected users to `Suspended` status |
| **Delete** | Destructive (`bg #D92D20`) | Opens the Delete Confirmation Modal |

After a bulk action completes, `selectedIds` is cleared and the bar disappears.

---

## 5. Add User Modal

**File:** `/src/app/components/add-user-modal.tsx`

### Layout

Two-pane layout:

| Pane | Content |
|---|---|
| **Left** | Searchable directory list of available users — drag-and-drop to the right pane |
| **Right** | "Cart" of selected users — drag-to-reorder within this pane |

Each user row shows: avatar + name + company + email.

### Drag & Drop

- Library: `react-dnd` + `HTML5Backend`
- Drag type tokens: `ADD_MODAL_AVAIL_USER` (left pane) · `ADD_MODAL_CART_USER` (right pane)

### CTA

`"Add X users to project"` — `bg #FF4D00`, white text, full width at bottom of modal.

`X` reflects the count of users currently in the right-pane cart.

---

## 6. Invite User Modal

**File:** `/src/app/components/invite-user-modal.tsx`

Launched from within the Add User Modal when a user is not found in the directory.

- Email invitation flow with role selection dropdown.
- Uses standard modal shell (`640–700px` width) and header spec.

---

## 7. Import CSV Modal

**File:** `/src/app/components/import-csv-modal.tsx`

Two steps:

1. **Upload** — drag-and-drop file upload zone. Accepts `.csv` files.
2. **Map fields** — column mapping step to align CSV headers to user fields.

---

## 8. Export CSV Modal

**File:** `/src/app/components/export-csv-modal.tsx`

- Column selector — choose which fields to include in the export.
- Format options — delimiter, encoding, etc.

Also accessible via the **Export** split button dropdown in the toolbar ("Export as CSV file").

---

## 9. User Data Model

```ts
interface User {
  id:             number;
  name:           string;
  email:          string;
  jobTitle:       string;
  company:        string;
  office:         string;       // city name; mapped to full address via OFFICE_ADDRESS_SHORT
  accessLevel:    string;       // e.g. 'Project Manager', 'Editor', 'Viewer', 'Admin', 'Owner'
  permissionType: string;       // e.g. 'Full', 'Contributor', 'Read-Only', 'Manager'
  userType:       string;       // e.g. 'Project Admin', 'Project Member'
  teams:          { initials: string; bg: string; text: string }[];
  status:         'Active' | 'Suspended' | 'Pending Invitation' | 'Expired Invitation';
  invitedAt?:     string;       // ISO 8601 timestamp — present for Pending / Expired users
}
```

### Office → Address Lookup (`OFFICE_ADDRESS_SHORT`)

| City | Address |
|---|---|
| Boston | `100 Federal St, Boston, MA 02110` |
| New York | `350 5th Ave, New York, NY 10118` |
| Chicago | `233 S Wacker Dr, Chicago, IL 60606` |
| Houston | `1600 Smith St, Houston, TX 77002` |
| Seattle | `1201 3rd Ave, Seattle, WA 98101` |
| Austin | `1705 Cedar Bend Dr, Austin, TX 78758` |

---

## 10. Bulk Action Handlers

| Handler | Behaviour |
|---|---|
| `handleBulkRemove(ids)` | Removes matching users from `baseUsers`; clears `selectedIds` |
| `handleBulkSuspend(ids)` | Sets matching users' status to `'Suspended'`; clears `selectedIds` |
| `handleBulkActivate(ids)` | Sets matching users' status to `'Active'`; clears `selectedIds` |
| `handleStatusChange(userId, next)` | Single-user status update; syncs the open Personal Info Panel |
| `handleReinvite(userId, status, invitedAt)` | Flips Expired → Pending and updates the timestamp; syncs the open panel |
