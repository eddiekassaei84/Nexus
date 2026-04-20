# Navigation — Top Nav, Sidebar & Module Selector

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## 1. Overall Shell Layout

```
┌─────────────────── Top Nav (56px) ───────────────────┐
│ [56×56 App Launcher] [Project Name]        [Icons]   │
├──────────┬───────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                         │
│ 280px    │  flex-1, min-h-0, bg #F2F3F4              │
│ (56px    │                                            │
│ collapsed)│                                          │
└──────────┴───────────────────────────────────────────┘
```

- **Top Nav height:** `56px`, `bg #243746`, `z-index: 10`, no shadow, no bottom border.
- **Sidebar expanded:** `280px`. Collapsed: `56px`.
- **Main content:** `flex-1`, white background for content panels, `#F2F3F4` for outer shell.
- **File:** `App.tsx → TopNav`, `App.tsx → Sidebar`

---

## 2. Top Navigation Bar

**Props:** `{ sidebarExpanded: boolean; onToggle: () => void }`

### Layout (left to right)

| Slot | Size | Notes |
|---|---|---|
| App Launcher button | `56 × 52px` (+ `4px marginBottom` for bottom-edge alignment) | hover `#2D4255`, `transition-colors` |
| Project thumbnail | `56 × 56px` | no border-radius, `object-cover` |
| Project name | — | `16px`, `#F2F3F4`, `font-normal`, `pb: 6px` (bottom-aligned within 56px row) |
| Question icon | `36 × 36px` | right side |
| Avatar block | `200 × 44px` | `bg black`, `border #75808B`, `border-radius 4px`, right side |

### Rules

- No divider line or drop shadow on the nav bar.
- `box-shadow: none` and `border-bottom: none` are intentional — never add them.
- Project name uses `letter-spacing: −0.4px`.
- App Launcher icon: white when closed, `#FF4D00` when the Module Selector is open.

---

## 3. Sidebar

**Props:** `{ expanded, onToggle, activeNav, onNavChange }`

**Nav item IDs:** `users`, `roles`, `companies`, `teams`, `permissions`, `lbs`

### Expanded State (280px)

| Property | Value |
|---|---|
| Item height | `48px` |
| Item padding | `px: 16px` |
| Active item bg | `#384857` |
| Active left bar | `position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #FF4D00` |
| Active label | bold white `#F0F0F0` |
| Active icon | `#FF4D00` (primary orange) |
| Inactive icon | `white` at semi-transparent fill |
| Hover bg | `#2D4255` |
| Inactive bg | `transparent` |
| Collapse button | `bg #384857`, icon rotated 180° relative to expand |
| Label tracking | `letter-spacing: −0.28px` |

### Collapsed State (56px)

| Property | Value |
|---|---|
| Item width × height | `56px × 48px` |
| Icon | centred |
| Active/hover colours | same as expanded |
| Expand button | shows `CollapseRightIcon` |

### Rules

- The sidebar is **always visible** — never hide it completely, only collapse it to `56px`.
- The active item's icon renders in `#FF4D00`; inactive icons remain white.
- The `4px` left orange bar is `position: absolute` inside the nav item container.

---

## 4. Module Selector (App Launcher)

**File:** `/src/app/components/module-selector.tsx`

### Visual Spec

| Property | Value |
|---|---|
| Panel width | `504px` (5 columns × 96px + 2 × 12px padding) |
| Background | `#FFFFFF` |
| Border-radius | `8px` |
| Border | `1px solid #E0E4E8` |
| Shadow | `0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)` |
| Position | `fixed`, `top: 56px`, `left: 0` (flush left edge of screen) |
| z-index | `9999` |
| Render | `ReactDOM.createPortal` into `document.body` |

### Module Card

| Property | Value |
|---|---|
| Size | `96 × 88px` |
| Border-radius | `6px` |
| Icon area | `40 × 40px` centred |
| Label | `11px` Inter, `#3B4A56`, 2-line clamp, `14px` line-height |
| Hover | `bg #F5F6F7` |
| Active/pressed | no permanent active state — panel closes on selection |

### Grid Layout

- 5-column CSS grid, gap `0`.
- Main modules first (9 items → 2 rows of 5 + partial row).
- Horizontal divider `1px solid #E0E4E8` after main modules.
- Bottom modules (Project Connectors, Project Settings) in the same 5-col grid.

### Behaviour

| Trigger | Result |
|---|---|
| App Launcher button click | Toggles panel open/closed; icon turns `#FF4D00` when open |
| Click outside panel | Closes panel |
| `Escape` | Closes panel |
| Module card click | Closes panel and navigates |

### Implementation Notes

- Always render via `createPortal` into `document.body` — this avoids stacking-context conflicts with the sticky table header.
- Position using `position: fixed; top: 56px; left: 0`.
