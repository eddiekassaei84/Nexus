# Tables

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.
> For module-specific table implementations, see [`../modules/users.md`](../modules/users.md).

---

## 1. Structure

```
[Toolbar]
[Group-by lane]
[Column headers — sticky top]
[Table rows (scrollable)]
[Pagination]
```

| Zone | Behaviour |
|---|---|
| **Toolbar** | Fixed above table, never scrolls |
| **Group-by lane** | Below toolbar, above column headers; always visible when group keys are active or a drag is in progress |
| **Column headers** | `position: sticky; top: 0; z-index: 20; background: #FAFAFA` |
| **Table rows** | Vertically scrollable; rows expand to at least viewport width with horizontal scroll |
| **Pagination** | Fixed below the scroll area |

### Column layout

| Column | Width | Notes |
|---|---|---|
| Checkbox | `48px` fixed | Always first; sticky-left when any column is frozen |
| Entity (Name) | `240px` min, flex-fill | Avatar + name + secondary label; becomes sticky when frozen |
| Middle columns | flex-fill, user-resizable | Min-width from canvas label measurement + padding budget |
| Actions | `60px` fixed, sticky-right | `boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)'` |

---

## 2. Toolbar

Located directly above the table. Standard button order (left to right):

1. **Search input** — live filter, placeholder varies by surface (see [`../patterns/search.md`](../patterns/search.md))
2. **Filter** button — shows active filter count badge in `#FF4D00`; applies **Secondary Pressed** style (`bg #616D79`, `border #616D79`, `color #FFFFFF`) while the filter panel is open
3. **Export** split button — left segment opens Export CSV modal; right chevron segment opens dropdown with: "Export as CSV file" + "Download import template" options
4. **Import** button — opens Import CSV modal
5. **Table view** toggle — orange `#FF4D00` when active; `#616D79` when inactive
6. **Column settings** button — `#616D79` inactive; `#FF4D00` while the Column Settings panel is open
7. **Add Entity** CTA — `bg #FF4D00`, white text, white `+` icon, `border-radius: 4px`

**Toolbar button base style:** `h-[36px]`, flex, centred, `gap-[6px]`, `border border-[#D0D5DD]`, `rounded-[4px]`, hover `bg #F9FAFB`

---

## 3. Column Resize

Columns have a drag handle (`GripDots` icon) on the right edge of each header cell.

- `onMouseDown` starts resize; `onMouseMove` on `document` updates width live; `onMouseUp` commits
- Min-width is calculated from the measured label text width (Canvas API, `600 13px Open Sans`) + `12px` padding + `20px` icons budget
- The Name/Entity column has a hard minimum of `240px`
- Resize handle hover state darkens to `#9CA4AE`

---

## 4. Group-by Lane

A dedicated drop zone above the column headers. Rows can be nested into multiple levels of grouping.

### Drag sources

| Source | Behaviour |
|---|---|
| **Column header cell** (the entire cell) | Drag anywhere on the header to begin a Group By drag. Visual feedback: header bg shifts to `#E8EDF5`, opacity `0.7`. |
| **Grip dots icon** (visual affordance inside the header) | Shown on hover (`opacity-0 → opacity-50`), full opacity while dragging. `pointer-events: none` — the outer header cell is the actual DnD source. |

**Important:** Clicking a column header sorts (asc → desc → off). Dragging it moves the column to the Group By lane. The HTML5 drag API naturally suppresses the `click` event after a real drag, so sort and group-by never conflict.

### Drop zone states

| Drag state | Lane background | Lane border |
|---|---|---|
| No drag active | `#FAFAFA` | `#F0F0F0` |
| Dragging — groupable column | `#f5f8ff` | `#6b9fff` |
| Hovering — valid drop | `#eef5ff` | `#6b9fff` |
| Hovering — non-groupable column | `#fff0f0` | `#fca5a5` |
| Hovering — already grouped column | `#fffbeb` | `#fcd34d` |

### Chips

Each active group level is shown as a chip:

| Property | Value |
|---|---|
| Background | `#E5E7E9` (`Navy / navy-2`) |
| Text colour | `#384857` |
| Left border | `4px solid {accentColor}` — depth-keyed accent (see §4.2 Group Header Rows) |
| Height | `24px` |
| Border-radius | `4px` |
| Remove button | `×` button inside chip; hover bg `rgba(#C3C7CC, 0.6)` |

Between chips, a right-pointing chevron SVG (`stroke: #9ca3af`, `strokeWidth: 1.5`) visually separates levels.

Utility buttons at the end of the chip list:
- **Clear** — removes all groups; `color: #ef4444`
- **Collapse All / Expand All** — toggles all group rows simultaneously; `color: #384857`

### Placeholder text

| Condition | Text shown |
|---|---|
| No groups, no drag | `Drag a column header (or grip) into this lane to group rows` |
| Drag active, not yet over lane | `Drop a groupable column here…` |
| Hovering — valid | `Drop here → group by "{label}"` |

### "Group by:" label

- Font: Inter `600` `16px` `24px` line-height, colour `#384857`
- Always visible on the left of the lane; `verticalAlign: middle`

### Groupable columns

Only columns explicitly marked `groupable: true` are accepted by the drop zone. Non-groupable columns show the red feedback state and display an error tooltip.

### Default group-by

The table opens with **Company** as the default group-by key. The selection is persisted per `projectId` in `localStorage`. If a saved preference exists, it overrides the default on mount.

---

## 4.2 Group Header Rows

Each group level renders a full-width header row inside the table body.

### Depth styles (cycled by depth index mod 4)

| Depth | Background | Left border (accent) | Text colour |
|---|---|---|---|
| 0 | `#ebf0ff` | `#4d7cfe` | `#1e3a8a` |
| 1 | `#e8f4ee` | `#34a660` | `#14532d` |
| 2 | `#fef9ec` | `#f59e0b` | `#78350f` |
| 3 | `#fdf2ff` | `#c084fc` | `#581c87` |

### Anatomy

```
[Left 4px accent border]  [Chevron]  [Column label:]  [Group value]  [(count)]   [Actions cell (transparent placeholder)]
```

- Chevron rotates open/closed on toggle
- Click anywhere on the group row toggles expand/collapse
- `hover: brightness-[0.97]` subtle hover
- Indented by `12px + depth × 20px` on the left

### Heights (driven by Table Density — see §8)

| Density | Group row height |
|---|---|
| Compact | `22px` |
| Normal | `32px` |
| Expanded | `40px` |

### Freeze interaction

When `freezeCount ≥ 1`, group header rows receive `position: sticky; left: 0; zIndex: 4; width: 100%` so they pin to the left viewport edge and do not scroll horizontally alongside the table content.

---

## 5. Row Anatomy

```
[Checkbox 48px] [Entity cell] [...middle columns] [Actions 60px sticky-right]
```

**Entity cell:** Avatar (`32 × 32px`, `border-radius: 50%`) + Name (`13px`, `#1D2C38`, weight `600`) + Secondary label (`11px`, `#616D79`)

**Actions cell:** Info icon button (opens detail panel) + Ellipsis icon button (opens context menu). Both are `60px` fixed, sticky-right.

### Row heights (driven by Table Density — see §8)

| Density | Data row height |
|---|---|
| Compact | `36px` |
| Normal | `48px` |
| Expanded | `60px` |

---

## 6. Sort

- Click a column header once → sort ascending (A→Z).
- Click again → sort descending (Z→A).
- Click again → clear sort.
- **Only one column is sorted at a time.**
- Sort arrows: active direction in `#4D7CFE`; inactive (hover hint) in `#C4CAD1`.
- Sort arrows fade in on header hover and stay visible while the column is actively sorted.
- **Drag suppresses click:** If the user drags the header to the Group By lane, no sort is applied.

---

## 7. Pagination

The pagination bar sits in a `64px` tall footer strip (`background: #FAFAFA`, `border-top: 1px solid #F0F0F0`, `padding: 0 16px`).

### Layout

```
[Showing X–Y of Z users]          [← Prev]  [1] [2] [3] [4] [5] […] [20]  [Next →]
```

- **Left:** "Showing X–Y of Z" label — `Open Sans 12px`, colour `#667085`.
- **Right:** Prev arrow · page number chips · Next arrow — all in a `flex` row, `gap: 12px` between the arrows and the chip group.

### Prev / Next arrow buttons

Arrow buttons use the **Tertiary Medium style (§15.3)**:

| Property | Value |
|---|---|
| **Size** | `36 × 36px` |
| **Border-radius** | `4px` |
| **Border** | `none` (all states) |
| **Background (default)** | `transparent` |
| **Background (hover)** | `#E5E7E9` |
| **Background (pressed)** | `#616D79` |
| **Background (disabled)** | `transparent` |
| **Icon stroke (enabled)** | `#616D79` |
| **Icon stroke (disabled)** | `#BFBFBF` |
| **Cursor (enabled)** | `pointer` |
| **Cursor (disabled)** | `not-allowed` |
| **Transition** | `background 0.15s` |

> **Never** use `opacity` to indicate the disabled state — always change the icon stroke to `#BFBFBF` explicitly. **Never** add a border or box-shadow to these buttons — Tertiary style has no border in any state.

### Page number chips

| Property | Value |
|---|---|
| **Size** | `40 × 40px` |
| **Border-radius** | `8px` |
| **Border** | `none` |
| **Background (active page)** | `#FF4D00` |
| **Background (inactive, hover)** | `#F0F0F0` |
| **Background (inactive, default)** | `transparent` |
| **Background (ellipsis `…`)** | `transparent`, `cursor: default`, non-interactive |
| **Font** | `Outfit Medium 14px / 20px`, colour `#FFFFFF` (active) · `#243746` (inactive) |
| **Gap between chips** | `2px` |
| **Transition** | `background 0.15s` |

### Fixed 7-slot algorithm

The chip list always occupies **exactly 7 slots** (when `totalPages > 7`):

| Condition | Slots rendered |
|---|---|
| `totalPages ≤ 7` | All pages `[1, 2, …, N]` — no ellipsis |
| `currentPage ≤ 4` | `[1] [2] [3] [4] [5] […] [N]` |
| `currentPage ≥ N − 3` | `[1] […] [N-4] [N-3] [N-2] [N-1] [N]` |
| Middle | `[1] […] [cur-1] [cur] [cur+1] […] [N]` |

This keeps the footer width **stable** — it never reflows as the user navigates pages.

### Other rules

- Default page size: **20 rows**.
- Page resets to `1` whenever the search query, filters, or grouping change.

---

## 8. Table Density

Controlled from the **Column Settings panel** via three Tertiary Medium icon buttons.

| Mode | Data row height | Group row height |
|---|---|---|
| **Compact** | `36px` | `22px` |
| **Normal** (default) | `48px` | `32px` |
| **Expanded** | `60px` | `40px` |

**Button style (density selector):**
- Active: `bg #616D79`, icon fill `#FFFFFF`
- Inactive: `bg transparent`, icon fill `#616D79`, hover `bg #E5E7E9`
- Size: `36 × 36px` each, `border-radius: 4px`, no border

---

## 9. Column Freeze

Controlled from the **Column Settings panel** via a "Freeze up to column" segmented `−` / `+` counter.

| Property | Value |
|---|---|
| Range | `0` (none) to `5` columns |
| Display | Zero-padded two-digit number (`00`, `01` … `05`), Inter `600` `14px` |
| Counter buttons | Segmented Secondary Medium grouped buttons (§19 spec); left segment = `−`, right = `+` |

### Freeze behaviour

- `freezeCount = 0` → no frozen columns; table scrolls normally.
- `freezeCount ≥ 1` → the **Name/Entity column** is always the first frozen column (counted as Column 1). Each additional freeze count adds the next visible dynamic column from the left.
- Frozen columns receive `position: sticky; left: {offset}px; zIndex: 3` on both header and data cells.
- The **Checkbox column** also becomes `position: sticky; left: 0; zIndex: 3` when any freeze is active.
- The **last frozen column** receives `borderRight: '2px solid #9CA4AE'` on both its header cell and every data cell — a Google Sheets–style separator line that spans all rows.
- **Group header rows** receive `position: sticky; left: 0; zIndex: 4; width: 100%` when any freeze is active, so they pin to the left viewport edge.

### z-index stack (frozen columns)

| Element | z-index |
|---|---|
| Sticky table header (overall) | 20 |
| Frozen header cells | 8 |
| Frozen data cells | 3 |
| Frozen group header rows | 4 |
| Sticky-right Actions header | 16 |
| Sticky-right Actions cells | 4 |

---

## 10. Column Settings Panel

**File:** `/src/app/components/column-settings-panel.tsx`

- Positioned relative to the Column Settings button (toolbar, far right).
- Panel width: `300px`. `border-radius: 8px`. `boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.18)'`. `border: 1px solid #E5E7EB`.
- Closes on click outside, `Escape` key, or re-clicking the trigger button.

### Sections (top to bottom)

1. **Table Density** — three icon buttons (Compact / Normal / Expanded). See §8.
2. **Freeze up to column** — segmented `−` / `+` counter. See §9.
3. **Column list** — draggable rows to toggle visibility and reorder.

### Column list rows

Each row contains:
- **Drag handle** (grip icon) — `react-dnd` source; reorders within the list
- **Checkbox** — toggles column visibility; `#0E70CB` when checked; disabled for required columns (`Name`, `Email`)
- **Column label** — Inter `400` `14px`, `#262626`

Required columns (`Name`, `Email`) cannot be hidden — their checkbox is rendered in a disabled state.

**Reset to defaults** link at panel footer restores `DEFAULT_COL_SETTINGS`.

---

## 11. Status Badges

Used inline within table cells to indicate entity status.

Pill-shaped, `display: inline-flex`, `border-radius: 9999px`, `px: 7px`, `py: 2px`, `font-size: 11px`, `font-weight: 500`.

| Status | Background | Text | Dot |
|---|---|---|---|
| Active | `#ECFDF3` | `#027A48` | `#12B76A` |
| Suspended | `#FEF2F2` | `#B91C1C` | `#EF4444` |
| Pending Invite | `#EFF8FF` | `#175CD3` | `#6172F3` |
| Expired Invite | `#FFF7ED` | `#C4320A` | `#EF6820` |

**Dot:** `5 × 5px`, `border-radius: 50%`, rendered inline before the label text.

### Do / Don't

- ✅ Always use `StatusBadge` component — never plain text for entity status.
- ✅ Always include both a coloured dot and a text label.
- ❌ Never use pill shape for anything other than status badges.
- ❌ Never mix background and text colours from different status states.

---

## 12. Do / Don't — Tables

- ✅ Always sticky the header (`position: sticky; top: 0; z-index: 20`).
- ✅ Use `position: sticky; right: 0` for the Actions column.
- ✅ Apply the last-frozen-column right border (`2px solid #9CA4AE`) to **both** header and all data cells.
- ✅ Pin group header rows (`position: sticky; left: 0`) when any column freeze is active.
- ✅ Default Group By to the contextually appropriate column (e.g. **Company** in the Users table).
- ✅ Persist Group By selection per `projectId` key in `localStorage`.
- ✅ Make the entire column header cell the DnD source — not just the grip icon.
- ✅ Use canvas measurement for column min-widths to match the actual rendered label.
- ❌ Never allow click-to-sort to fire if the user performed a drag.
- ❌ Never use a fixed pixel width for middle columns — always `flex: 1 1 0` unless the user has manually resized.
- ❌ Never hide the Actions column or remove its sticky-right shadow.