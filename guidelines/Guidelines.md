# Inertia Nexus — Design System & Guidelines

> **Version:** 1.0 · **Last Updated:** March 2026  
> This document captures every visual and interaction decision made in the **Project Configuration Module** of Inertia Nexus. Use it as the single source of truth when building any future module or app within the Inertia Nexus platform.

---

## 1. Brand Identity

| Token | Value |
|---|---|
| **Product name** | Inertia Nexus |
| **Brand accent** | `#FF4D00` (Inertia Orange) |
| **Primary surface** | `#243746` (Inertia Dark Navy) |
| **Logotype** | SVG mark (flame/angular paths) rendered in `#FF4D00` and `#BFBFBF` |

The Inertia Nexus mark is composed of five SVG `<path>` elements — two orange (`#FF4D00`) and three grey (`#BFBFBF`). Always render it at 28 × 35 px in the top-nav and never alter the fill colours.

---

## 2. Colour Palette

### 2.1 Core Brand Colours

| Name | Hex | Usage |
|---|---|---|
| Inertia Orange | `#FF4D00` | Active states, accents, CTA buttons, active sidebar indicator |
| Inertia Navy | `#243746` | Top nav bar, sidebar background |
| Navy Hover | `#2d4255` | Sidebar nav item hover, apps-launcher button hover |
| Navy Active | `#384857` | Active nav item, collapse button strip |

### 2.2 Neutral / Surface Colours

| Name | Hex | Usage |
|---|---|---|
| Page Background | `#F2F3F4` | Main content area background |
| White | `#FFFFFF` | Cards, modals, table background |
| Light Grey | `#FAFAFA` | Empty-state / canvas background |
| Border | `#D9D9D9` | Horizontal section dividers |
| Input Background | `#F3F3F5` | Form input fills |
| Muted Border | `#E0E4E8` | Panel dividers, dropdown borders |

### 2.3 Text Colours

| Name | Hex | Usage |
|---|---|---|
| Dark Text | `#1D2C38` | Page titles, primary content |
| Navy Text | `#243746` | Table header text, secondary labels |
| Mid-Grey | `#3B4A56` | Module card labels |
| Body | `#384857` | Sort icons, secondary interactive text |
| Muted | `#616D79` | Table toolbar icons, sub-labels |
| Placeholder | `#667085` | Form placeholders, helper text |
| White | `#FFFFFF` | Text on dark nav surfaces |
| Sidebar Active | `#F0F0F0` | Active nav label text |

### 2.4 Status / Semantic Colours

| Status | Background | Text | Dot |
|---|---|---|---|
| Active | `#ECFDF3` | `#027A48` | `#12B76A` |
| Suspended | `#FEF2F2` | `#B91C1C` | `#EF4444` |
| Pending Invitation | `#EFF8FF` | `#175CD3` | `#6172F3` |
| Expired Invitation | `#FFF7ED` | `#C4320A` | `#EF6820` |

### 2.5 Toast Colours

| Type | Background | Left-border / Icon |
|---|---|---|
| Success | `#F6FFED` | `#52C41A` |
| Error | `#FFF2F0` | `#FF4D4F` |
| Info | `#E6F7FF` | `#1890FF` |
| Warning | `#FFFBE6` | `#FAAD14` |

### 2.6 Checkbox / Selection Colours

| State | Fill | Border |
|---|---|---|
| Checked | `#0E70CB` (solid) | — |
| Indeterminate | `#0E70CB` (solid) + white dash | — |
| Unchecked | `#FFFFFF` | `#D0D5DD` |
| Unchecked hover | `#F0F7FF` | `#0E70CB` |

### 2.7 Team Badge Palette (example tokens)

Team badges use paired background + text colours from a predefined palette:

```
#DDE9FF / #465FFF   (AR — Architecture)
#FDF2FA / #DD2590   (SC — Structural/Civil)
#E6F4EA / #1E7E34   (BM — BIM)
#FFF3E0 / #E65100   (SE — Structural Engineer)
#E8F5E9 / #2E7D32   (ME — MEP)
#FCE4EC / #C62828   (DC — Document Control)
#E3F2FD / #1565C0   (PM — Project Management)
#E8EAF6 / #3949AB   (QA — Quality Assurance)
#FFF8E1 / #F9A825   (various)
```

### 2.8 Background Colour Tokens

Semantic background tokens used across layout surfaces, components, and overlays. Always prefer these named tokens over raw hex values when referencing surface backgrounds.

| Token name | Hex / Value | Sample | Usage |
|---|---|---|---|
| `Backgrounds / white` | `#FFFFFF` | ⬤ white | Component background — cards, modals, table rows, input fills |
| `Backgrounds / background-1` | `#F0F2F5` | ⬤ light blue-grey | Layout / Page background — main content shell behind white panels |
| `Backgrounds / background-2` | `#F9FAFB` | ⬤ near-white | Under sheet background — empty states, canvas areas, secondary panels |
| `Backgrounds / tooltip-bg` | `#243746` at 90% opacity (`rgba(36,55,70,0.9)`) | ⬤ dark navy | Tooltip background — dark navy with slight transparency |
| **`Search Background color`** | **`#FCFE58`** | ⬤ vivid yellow | **Search match highlight** — inline background applied to matched characters in any search result across the platform |

#### Usage rules

- **`white`** is the default surface for all interactive components (cards, dropdowns, table rows, form inputs). Never substitute `#F9FAFB` or `#F0F2F5` here.
- **`background-1`** (`#F0F2F5`) is the outer page shell that sits behind white content panels. Use this wherever the Guidelines specify `#F2F3F4` as the page background — treat them as equivalent page-level tokens.
- **`background-2`** (`#F9FAFB`) is the recessed / under-sheet level — empty-state canvases, secondary panel insets, or any surface one level below `background-1`.
- **`tooltip-bg`** (`rgba(36,55,70,0.9)`) is reserved exclusively for tooltips. It borrows the Inertia Navy hue but with 10% transparency so it feels lighter than the full nav chrome.

---

## 3. Typography

### 3.1 Font Stack

| Font | Role | Import |
|---|---|---|
| **Open Sans** | Global UI font (all body copy, nav, table cells, sidebar labels) | Google Fonts, weights 300/400/500/600/700/800 |
| **Inter** | Module selector card labels, modal headings, confirmation dialogs | Google Fonts, weights 400/500/600/700 |
| **Roboto** | Available, loaded as fallback | — |
| **Outfit** | Available, loaded as fallback | — |

The global font is set in `theme.css`:
```css
*, *::before, *::after {
  font-family: 'Open Sans', sans-serif;
}
```

Font imports live exclusively in `/src/styles/fonts.css`.

### 3.2 Type Scale

| Context | Size | Weight | Notes |
|---|---|---|---|
| Page title (h1) | 36px | Bold (`700`) | Users, Roles, etc. section headings |
| Sidebar label | 14px | Normal `400` (inactive) / Bold `700` (active) | Open Sans |
| Nav active indicator | 14px | `700` | colour `#F0F0F0` |
| Table header | 13px | `600` | Open Sans, measured via canvas for column width calc |
| Table cell | 13–14px | `400` | Open Sans |
| Status badge | 11px | `500` | Pill shape |
| Module card label | 11px / `14px` line-height | `400` | Inter, 2-line clamp |
| Modal heading | 16px | `600` | Inter |
| Modal body | 13px | `400` | Inter |
| Toast title | 14px | `600` | Open Sans |
| Toast message | 13px | `400` | Open Sans |
| Button text | Base / `500` | — | Inherits from theme |

### 3.3 Letter Spacing

| Context | Tracking |
|---|---|
| Top-nav project title | `−0.4px` |
| Sidebar nav labels | `−0.28px` |

### 3.4 Type Style Scale (Design System Tokens)

The following type styles are sourced directly from the Figma "Typography" frame (`Container-2021-7407`). All styles use **Inter** as the primary font. Each token (`text-style-*`) maps to a named Figma text style and should be referenced by token name when documenting or implementing design decisions.

| Typestyle | Token | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|---|
| **DisplayXLarge** | `text-style-display-x-large` | Inter | `38px` | Bold (`700`) | `44px` | `0px` | Largest display heading |
| **DisplayLarge** | `text-style-display-large` | Inter | `30px` | Bold (`700`) | `34px` | `0px` | — |
| **DisplayMedium** | `text-style-display-medium` | Inter | `24px` | Semibold (`600`) | `32px` | `0px` | — |
| **DisplaySmall** | `text-style-display-small` | Inter | `20px` | Regular (`400`) | `28px` | `0px` | — |
| **PageHeading** | `text-style-page-heading` | Inter | `18px` | Bold (`700`) | `26px` | `0px` | Page-level section titles |
| **Heading** | `text-style-heading` | Inter | `16px` | Semibold (`600`) | `24px` | `0px` | Modal headings, card titles |
| **Subheading** | `text-style-subheading` | Inter | `12px` | Semibold (`600`) | `16px` | `0px` | `UPPERCASE` — used as section labels |
| **Label / BodySmall** | `text-style-body-small` | Inter | `14px` | Regular (`400`) | `20px` | `0px` | Label variant uses Semibold (`600`) |
| **BodyLarge** | `text-style-body-large` | Inter | `16px` | Regular (`400`) | `20px` | `0px` | — |
| **BodySmall** | `text-style-body-small` | Inter | `14px` | Regular (`400`) | `20px` | `0px` | — |
| **CaptionLarge** | `text-style-caption-large` | Inter | `12px` | Regular (`400`) | `16px` | `0px` | — |
| **CaptionSmall** | `text-style-caption-small` | Inter | `10px` | Regular (`400`) | `14px` | `0px` | Smallest text level |

#### Colour variants per style

Each typestyle ships with three colour variants:

| Variant | Colour | Usage |
|---|---|---|
| **Default** | `#262626` (`Gray / gray-10`) | Primary text on white/light surfaces |
| **Subdued** | `#595959` (`Gray / gray-8`) | Secondary / supporting text, de-emphasised content |
| **Disabled** | `#BFBFBF` (`Gray / gray-6`) | Disabled state text (Body and Caption levels only) |

#### Usage notes

- **Display styles** (`DisplayXLarge` → `DisplaySmall`) are for hero text, dashboard stats, and large numeric callouts. Use sparingly.
- **PageHeading** maps directly to page title `h1` elements across all module views (Users, Roles, Teams, etc.).
- **Heading** is the standard modal heading and panel title size.
- **Subheading** is always `UPPERCASE` with `Semibold` weight — use for section labels and group headers within forms or sidebars.
- **Label** is the `Semibold` variant of `BodySmall` (same size/line-height, weight bumped to `600`) — use for form field labels and table column headers.
- **BodyLarge** / **BodySmall** cover the two main body text sizes. `BodySmall` (`14px`) is the most common UI text size across tables, sidebar labels, and form inputs.
- **CaptionLarge** and **CaptionSmall** are for metadata, timestamps, helper text, and status annotations.
- Letter spacing is `0px` (no tracking) across all styles — do not add custom letter-spacing unless explicitly specified elsewhere in these guidelines (see §3.3 for nav-specific exceptions).

---

## 4. Layout & Spacing

### 4.1 Overall Shell

```
┌─────────────────── Top Nav (56px) ───────────────────┐
│ [56×56 App Launcher] [Project Name]        [Icons]   │
├──────────┬───────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                         │
│ 280px    │  flex-1, min-h-0, bg #F2F3F4              │
│ (56px    │                                            │
│  collapsed)│                                         │
└──────────┴───────────────────────────────────────────┘
```

- **Top Nav height:** `56px`, `bg-[#243746]`, `z-index: 10`, no shadow or bottom border.
- **Sidebar expanded:** `280px` wide. Collapsed: `56px`.
- **Main content:** `flex-1`, white background for content panels, `#F2F3F4` for outer shell.

### 4.2 Top Navigation Bar

- Full-width, `56px` tall, `bg #243746`.
- **Left side:** App Launcher button (56 × 52px, marginBottom 4px for visual bottom-alignment) → Project thumbnail (56 × 56px) → Project name.
- **Right side:** Question icon (36 × 36px) → Avatar block (200 × 44px, `bg black`, `border #75808B`, `border-radius 4px`).
- No divider line or drop shadow on the nav bar itself.

### 4.3 Sidebar Navigation

**Expanded state (280px):**
- Each nav item: `48px` tall, `px-16px`.
- Active item: `bg #384857` + `4px` left orange bar (`#FF4D00`) + bold white label.
- Hover: `bg #2D4255`.
- Inactive: `bg transparent`.
- Collapse button at bottom: `bg #384857`, icon rotated 180° relative to expand.

**Collapsed state (56px):**
- Each nav item: `56px` wide × `48px` tall, icons centred.
- Same active/hover colour rules apply.
- Bottom expand button shows `CollapseRightIcon`.

### 4.4 Content Page Structure

```
Page
├── Section Header — px-24px, h-72px, border-bottom #D9D9D9
│   └── DisplayMedium: Inter 24px/600, line-height 32px, color #1D2C38
└── Content Body — flex-1, min-h-0, p-12px
    └── Table Container
```

### 4.5 Spacing Scale (common values)

| Usage | Value |
|---|---|
| Nav item horizontal padding | 16px |
| **Section Header horizontal padding** | **24px** |
| Content page top padding | 24px |
| Card / panel inner padding | 12px |
| Icon gap from label | 12px (sidebar), 16px (top-nav) |
| Modal inner padding | 24px |
| Button group gap | 8px |
| Table cell padding | 6px left/right |
| Section divider margin | 8px top, 4px bottom |

---

### 4.6 Section Header

The **Section Header** is the top bar rendered inside every Project Settings sub-page (General, Members, Teams, Locations, etc.). It sits between the sidebar and the content body, and is always white with a bottom divider.

#### Anatomy

```
┌──────────────────────────────────────────────── 100% width ──┐
│  [Section Title]                                              │  ← height: 72px
│  paddingLeft: 24px · paddingRight: 24px                      │
│  bg: #FFFFFF · borderBottom: 1px solid #D9D9D9               │
└───────────────────────────────────────────────────────────────┘
```

#### Specification

| Property | Value |
|---|---|
| **Height** | `72px` (fixed) |
| **Background** | `#FFFFFF` |
| **Bottom border** | `1px solid #D9D9D9` |
| **Horizontal padding** | `24px` left and right |
| **Vertical alignment** | `flex; align-items: center` — title is always vertically centred |
| **Typography token** | `DisplayMedium` |
| **Font family** | `Inter` |
| **Font size** | `24px` |
| **Font weight** | `600` (Semibold) |
| **Line height** | `32px` |
| **Letter spacing** | `0px` |
| **Text colour** | `#1D2C38` (`Navy / navy-10`) |

#### Implementation

```tsx
<div
  style={{
    height: 72,
    paddingLeft: 24,
    paddingRight: 24,
    background: '#FFFFFF',
    borderBottom: '1px solid #D9D9D9',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  }}
>
  <h1
    style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '32px',
      letterSpacing: 0,
      color: '#1D2C38',
      margin: 0,
    }}
  >
    {title}
  </h1>
</div>
```

#### Usage rules

- **Always use the Section Header** at the top of every Project Settings sub-page. Never omit it.
- **Never use 48px horizontal padding** for this component — the edge gap is `24px` on both sides.
- **Never substitute Open Sans or another font** — the Section Header title always uses `Inter`.
- **Never use a heavier weight than `600`** — DisplayMedium is Semibold, not Bold.
- The `flexShrink: 0` rule is mandatory — it prevents the header from collapsing in a flex column layout where the content body scrolls below it.
- The bottom border (`1px solid #D9D9D9`) is always present and must never be removed.

---

## 5. Shell Components

### 5.1 Top Navigation Bar — `TopNav`

**File:** `App.tsx → TopNav`

```
Props: { sidebarExpanded: boolean; onToggle: () => void }
```

- **App Launcher button:** `56 × 52px` (plus `4px marginBottom` for bottom-edge alignment within the 56px rail), hover `#2D4255`, `transition-colors`.  
  - Icon: `AppsGridIcon` 24 × 24px, white when closed, `#FF4D00` when open.
- **Module Selector popup:** fixed position, `top: 56px`, `left: 0px` — flush to left edge of screen, immediately below header.
- **Project thumbnail:** `56 × 56px`, no border-radius, `object-cover`.
- **Project name:** 16px, `#F2F3F4`, `font-normal`, `pb-6px` (bottom-aligned within 56px row).

### 5.2 Sidebar — `Sidebar`

**File:** `App.tsx → Sidebar`

```
Props: { expanded, onToggle, activeNav, onNavChange }
```

Nav item IDs: `users`, `roles`, `companies`, `teams`, `permissions`, `lbs`

Active item indicator: `position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #FF4D00`

---

## 6. Module Selector (App Launcher)

**File:** `/src/app/components/module-selector.tsx`

### Visual spec

- **Panel size:** `504px` wide (5 columns × 96px + 2 × 12px padding).
- **Background:** `#FFFFFF`, `border-radius: 8px`.
- **Border:** `1px solid #E0E4E8`.
- **Shadow:** `0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)`.
- **Position:** `fixed`, rendered via `ReactDOM.createPortal` into `document.body`, `z-index: 9999`.
- **Default anchor:** `top: 56px` (bottom of header), `left: 0` (flush left edge of screen).

### Module card

- **Size:** 96 × 88px, `border-radius: 6px`.
- **Icon area:** 40 × 40px centred.
- **Label:** 11px Inter, `#3B4A56`, 2-line clamp, `14px` line-height.
- **Hover:** background `#F5F6F7`.
- **Active/pressed:** no permanent active state — panel closes on selection.

### Module grid

- 5-column CSS grid, gap 0.
- Main modules rendered first (9 items → 2 rows of 5 + partial row).
- Horizontal divider `1px #E0E4E8` after main modules.
- Bottom modules (Project Connectors, Project Settings) in same 5-col grid.

### Behaviour

- **Open:** toggle on App Launcher button click; icon turns `#FF4D00` when open.
- **Close:** click outside panel, press `Escape`, or select a module.
- **Portal:** always render into `document.body` to avoid stacking-context issues with sticky table header.

---

## 7. Data Table — `UsersTable`

**File:** `/src/app/components/users-table.tsx`

> Full specification is in [`/guidelines/components/tables.md`](../guidelines/components/tables.md) and [`/guidelines/modules/users.md`](../guidelines/modules/users.md). The summary below keeps the root document in sync.

### Toolbar

Located above the table, contains (left to right):
1. **Search input** — placeholder `"Search users…"`, `SearchIcon`, `width: 276px`. Live filters by `user.name` + `user.email`.
2. **Filter** button — active filter count badge in `#FF4D00`; Secondary Pressed style (`bg #616D79`, `border #616D79`, `color #FFFFFF`) while filter panel is open.
3. **Export** split button (Segmented Secondary Medium) — left segment opens Export CSV modal; right chevron opens dropdown: _Export as CSV file_ + _Download import template_.
4. **Import** button — opens Import CSV modal.
5. **Table view** toggle — `IconRegularTableList`; orange `#FF4D00` when active.
6. **Column settings** button — `#616D79` inactive; `#FF4D00` while Column Settings panel is open.
7. **Add User** CTA — `#FF4D00` background, white text, white `+` icon, `border-radius: 4px`.

Toolbar button pattern: `h-[36px]`, flex, centred, `gap-[6px]`, `border border-[#D0D5DD]`, `rounded-[4px]`, hover `bg #F9FAFB`.

### Table container

Every table in the platform is wrapped in a container div that applies the outer stroke and rounded corners:

| Property | Value |
|---|---|
| **Border** | `1px solid #D9D9D9` |
| **Border-radius** | `8px` |
| **Overflow** | `hidden` (clips children to the rounded boundary) |
| **Background** | `#FAFAFA` |

> **Never** use `#F0F0F0` or any near-white colour for the table container border — it renders effectively invisible against white content areas. Always use the `Border` token `#D9D9D9`.

---

### Table structure

- **Sticky header** — `position: sticky; top: 0; z-index: 20; background: #FAFAFA`.
- **Checkbox column:** fixed `48px`; becomes `position: sticky; left: 0` when any column is frozen.
- **User (Name) column:** min `240px`, flex-fill; becomes sticky-left when frozen.
- **Middle columns:** flex-fill, user-resizable via drag handle on the right edge of each header cell.
- **Actions column:** fixed `60px`, sticky-right, `boxShadow: '-1px 0 0 0 #E5E7EB, -4px 0 10px rgba(0,0,0,0.06)'`.

### Column definitions

| Key | Label | Groupable | Default visible |
|---|---|---|---|
| `user` | Name | — | ✅ required |
| `jobTitle` | Job Title | ❌ | ✅ |
| `email` | Email | ❌ | ✅ required |
| `company` | Company | ✅ | ✅ |
| `office` | Office | ✅ | ✅ |
| `accessLevel` | Role Access Level | ✅ | ✅ |
| `userType` | User Type | ✅ | ✅ |
| `status` | Status | ✅ | ✅ |
| `emailDomain` | Domain | ✅ | ❌ |
| `address` | Address | ❌ | ❌ |

### Column resize

Columns have a grip dots icon on the right edge of the header. `onMouseDown` starts resize, `onMouseMove` on `document` updates width live, `onMouseUp` commits. Min-width calculated from canvas measurement of the label + padding budget.

> Full interaction spec — including hover colours, resize-border states, and sort-arrow visibility — is defined in **§7.A** below. All tables across the platform must conform to that spec.

### Grouping

**Default Group By:** `company` (Company), applied on initial render. Persisted in `localStorage` per `projectId`.

- **Drag source:** the entire column header cell is the DnD source (not just the grip icon). Dragging a header to the Group By lane adds it as a group level. Clicking still sorts.
- **Chip style:** `bg #E5E7E9`, `color #384857`, `4px solid {accentColor}` left border (depth-keyed), `h-[24px]`, `border-radius: 4px`.
- **Groupable columns:** `company`, `office`, `accessLevel`, `userType`, `status`, `emailDomain`.
- **Group header row depth colours:** cycle through 4 styles (blue → green → amber → purple) by `depth % 4`.

### Column freeze

Controlled from the Column Settings panel ("Freeze up to column", range `0`–`5`):

- Name column = Column 1. Each +1 freezes the next visible dynamic column from the left.
- The **last frozen column** gets `borderRight: '2px solid #9CA4AE'` across all header and data cells — Google Sheets–style separator.
- **Group header rows** receive `position: sticky; left: 0` when any freeze is active, so they pin left and never scroll horizontally.

### Table density

Controlled from Column Settings panel (Compact / Normal / Expanded):

| Density | Data row | Group row |
|---|---|---|
| Compact | `36px` | `22px` |
| Normal (default) | `48px` | `32px` |
| Expanded | `60px` | `40px` |

### Row anatomy

```
[Checkbox 48px] [User cell flex] [...columns flex] [Actions 60px sticky-right]
```

**User cell:** Avatar (32 × 32px, `border-radius: 50%`) + Name (13px `#1D2C38` weight `600`) + Email (11px `#616D79`).

**Actions cell:** Info icon button (opens Personal Info Panel) + Ellipsis icon button (context menu).

### Pagination

- "Showing X–Y of Z" text, left side.
- Prev/Next arrow buttons + page number chips (current: `bg #FF4D00`), right side.
- Page size: 20 rows.
- Ellipsis logic: always show first/last, ±1 around current, `…` for gaps.

### Sort

Click column header → asc; click again → desc; click again → clear. Only one column sorted at a time. Sort arrows: active direction `#4D7CFE`, inactive `#C4CAD1`. Dragging a header to the Group By lane does not trigger a sort.

---

## 7.A Table Column Header — Universal Interaction Spec

> **Scope:** This section is the single source of truth for column-header hover, sort-arrow visibility, and resize-border behaviour for **every table in the platform** — including the Members Table (`users-table.tsx`), the User Account Landing Page List View (`user-account-landing.tsx`), and any future table module. These rules apply regardless of the table's data domain.

---

### 7.A.1 Header Row

| Property | Value |
|---|---|
| **Background (default / idle)** | `#FAFAFA` |
| **Background (cell hovered)** | `#EEEFF1` |
| **Background transition** | `background 0.1s` |
| **Bottom border** | `1px solid #F0F0F0` |
| **`position`** | `sticky; top: 0; z-index: 20` |

The hover background applies to the **individual cell** being hovered, not the entire header row.

---

### 7.A.2 Header Cell Anatomy

```
┌──────────────────────────────────────────────── cell width ──────────────────┐
│  [Label text]  [Sort arrows — conditional]  ←8px→  ‖  [Resize handle 7px]   │
│  padding-left: 6–8px                                                         │
│  padding-right: 10px  ← gives exactly 8px visual gap to the 2px border line │
│  height: matches table header row height                                      │
│  overflow: clip                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

- `display: flex; align-items: center`
- `position: relative` — required so the absolutely-positioned resize handle sits correctly at the right edge
- `overflow: clip` — prevents the resize handle from bleeding outside the cell
- `cursor: pointer` (sortable columns) · `cursor: default` (non-sortable)
- `user-select: none`

#### Right-padding rule — 8px visual gap to the resize border

The resize handle is `7px` wide, positioned `absolute; right: 0`. The visible `2px` border line sits at the very right edge of the cell. To produce **exactly 8px of visible clearance** between the sort arrows and the border line, `paddingRight` must be `10px`:

```
visual gap = paddingRight − border-line-width
         8 = 10          − 2
```

| Cell type | `paddingRight` | Visual gap to border |
|---|---|---|
| Has resize handle | `10px` | **8px** ✓ |
| No resize handle (last column) | `8px` | — (no border present) |

> **Never** use `paddingRight: 6px` (→ 4px gap) or `paddingRight: 8px` (→ 6px gap) on cells that carry a resize handle. The rule is `10px` on all resizable header cells, across every table in the platform.

---

### 7.A.3 Label Typography

| Property | Value |
|---|---|
| Font family | `Open Sans, sans-serif` |
| Font size | `13px` |
| Font weight | `600` (SemiBold) |
| Colour | `#384857` |
| Overflow | `ellipsis` — never wrap or clip abruptly |

---

### 7.A.4 Sort Arrows — Visibility Rules

Sort arrows sit to the **right of the label**, inside the cell (before the resize handle).

| Condition | Arrow visibility |
|---|---|
| Column is **sorted** (asc or desc) | Always visible — `opacity: 1` |
| Column is **not sorted**, cell is **hovered** | Visible — `opacity: 1` |
| Column is **not sorted**, cell is **not hovered** | Hidden — `opacity: 0` |

```ts
opacity = (isActive || isHovered) ? 1 : 0
transition: opacity 0.15s
```

**Arrow colours:**

| Arrow | Colour |
|---|---|
| Active direction (up or down) | `#4D7CFE` (Blue) |
| Inactive direction | `#C4CAD1` (Light grey) |

**Size:** `16 × 16px` icon area. `flexShrink: 0`.

> **Never** show sort arrows only when a column is actively sorted — they must also appear on cell hover to signal sortability to the user.

---

### 7.A.5 Resize Handle — Three-State Border

The resize handle is a `7px`-wide invisible hit-zone absolutely positioned at the **right edge** of every resizable header cell. It renders a `2px`-wide vertical line whose colour transitions through three states:

| State | Line colour | Trigger |
|---|---|---|
| **Idle** | `transparent` | No interaction |
| **Cell hovered** (but not the handle itself) | `#9CA4AE` (mid-grey) | Mouse enters the parent header cell |
| **Handle hovered** or **drag active** | `#4D7CFE` (Blue) | Mouse enters the 7px hit zone, or column is being resized |

```ts
lineColor = (active || handleHovered) ? '#4d7cfe'
          : cellHovered               ? '#9CA4AE'
          : 'transparent'
```

**Line geometry:**

| Property | Value |
|---|---|
| Width | `2px` |
| Height | Full header row height in `px` (e.g. `47px` or `48px` — match the actual rendered header height, never `%`) |
| Border-radius | `none` — never use a rounded pill shape |
| `transition` | `background 0.1s` |
| Position within hit-zone | flush right, vertically centred |

**Hit zone:**

| Property | Value |
|---|---|
| Width | `7px` |
| Height | `100%` (full cell height) |
| `position` | `absolute; right: 0; top: 0` |
| `cursor` | `col-resize` |
| `z-index` | `20` |
| Click | `e.stopPropagation()` — **never** triggers a sort |
| Drag | `draggable={false}; onDragStart: e.preventDefault()` |

> **Critical implementation rule:** The `cellHovered` state **must** be managed via React `useState` inside the header cell component, **not** via direct DOM mutations (`e.currentTarget.style.background = ...`). DOM mutations cannot propagate to child component props. Always lift hover into React state so it can be passed as `cellHovered` prop to the `ResizeHandle` child.

---

### 7.A.6 Implementation Pattern — `HeaderCell` Component

Every table must implement its column header as a **dedicated React component** (never an inline `<div>`) so that `useState(isHovered)` is scoped to the cell and flows cleanly into the resize handle child.

```tsx
function HeaderCell({
  colStyle, label, sortKey, sortState, onSort,
  showResize, resizeKey, onDelta,
}: HeaderCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = !!sortKey && sortState?.key === sortKey;

  return (
    <div
      style={{
        ...colStyle,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 8,
        paddingRight: 10,   // 10px = 2px border + 8px visual gap between sort icon and border
        overflow: 'clip',
        cursor: sortKey ? 'pointer' : 'default',
        userSelect: 'none',
        background: isHovered ? '#EEEFF1' : '#FAFAFA',
        transition: 'background 0.1s',
      }}
      onClick={onSort}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label */}
      <span style={{
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 600,
        fontSize: 13,
        color: '#384857',
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>

      {/* Sort arrows — visible when sorted OR hovered */}
      {sortKey && (
        <span style={{
          display: 'flex',
          alignItems: 'center',
          width: 16,
          height: 16,
          flexShrink: 0,
          opacity: isActive || isHovered ? 1 : 0,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
        }}>
          <SortArrows dir={isActive ? sortState!.dir : null} />
        </span>
      )}

      {/* Resize handle — receives cellHovered for the gray border state */}
      {showResize && (
        <ResizeHandle colKey={resizeKey} onDelta={onDelta} cellHovered={isHovered} />
      )}
    </div>
  );
}
```

---

### 7.A.7 `ResizeHandle` Component

```tsx
function ResizeHandle({
  colKey, onDelta, cellHovered = false,
}: {
  colKey: string;
  onDelta: (key: string, delta: number) => void;
  cellHovered?: boolean;
}) {
  const [active, setActive] = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);

  // onMouseDown → attach mousemove/mouseup to window, setActive(true/false)

  const lineColor = active || handleHovered ? '#4d7cfe'
                  : cellHovered             ? '#9CA4AE'
                  : 'transparent';

  return (
    <div
      style={{
        position: 'absolute', right: 0, top: 0,
        height: '100%', width: 7,
        cursor: 'col-resize', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHandleHovered(true)}
      onMouseLeave={() => setHandleHovered(false)}
      onClick={e => e.stopPropagation()}
      draggable={false}
      onDragStart={e => e.preventDefault()}
    >
      <div style={{
        height: HEADER_ROW_HEIGHT_PX,  // exact px value matching the header row
        width: 2,
        background: lineColor,
        transition: 'background 0.1s',
        flexShrink: 0,
      }} />
    </div>
  );
}
```

---

### 7.A.8 Rules & Anti-Patterns

| ✅ Always | ❌ Never |
|---|---|
| Use React `useState` for cell hover | Use `onMouseEnter → e.currentTarget.style.background` DOM mutation |
| Pass `cellHovered` as a prop to the resize handle child | Try to infer cell hover from CSS `:hover` or `querySelector` inside the child |
| Show sort arrows on **hover AND active sort** | Show sort arrows only when the column is sorted |
| Use `#EEEFF1` for the hovered cell background | Use `#F5F5F5`, `#F0F0F0`, or any other grey for hover |
| Use `#9CA4AE` for the resize border on cell hover | Show a visible resize border in the idle (no hover) state |
| Use `#4D7CFE` for the resize border on handle hover / drag | Use `#FF4D00` (orange) for any part of the resize handle |
| Apply `transition: background 0.1s` on both the cell and the resize line | Apply instant colour changes without transition |
| Use `overflow: clip` on the header cell div | Let the resize handle bleed outside the cell boundary |
| Set `onClick: e.stopPropagation()` on the resize handle | Let a resize drag-start trigger a sort click |
| Use an explicit `px` value for the resize line height | Use `%` heights (e.g. `48%`) — they cause the line to appear shorter than the cell |
| Use `paddingRight: 10px` on every resizable header cell | Use `paddingRight: 6px` (→ 4px gap) or `8px` (→ 6px gap) — both fall short of the required 8px clearance |

---

## 8. Status Badges

Pill-shaped, inline-flex, `border-radius: 9999px`, `px-7px py-2px`.

```
● Active           bg #ECFDF3  text #027A48  dot #12B76A
● Suspended        bg #FEF2F2  text #B91C1C  dot #EF4444
● Pending Invite   bg #EFF8FF  text #175CD3  dot #6172F3
● Expired Invite   bg #FFF7ED  text #C4320A  dot #EF6820
```

Dot size: `5 × 5px`, `border-radius: 50%`.

---

## 9. Avatars

### User list avatars (table rows)

- **Size:** 32 × 32px, `border-radius: 50%`.
- **Real photo:** shown for known users with photo assets.
- **Generated:** initials (first + last initial), background cycles through 10 colours keyed by `user.id % 10`:

```
#3B5998 / #E4405F / #2D8653 / #9B59B6 / #E67E22
#1ABC9C / #E74C3C / #34495E / #16A085 / #8E44AD
```

### Personal Info Panel avatars

- **Size:** larger (panel-specific).
- Palette (6 entries, cycles by `id % 6`):

```
#DDE9FF / #465FFF
#E6F4EA / #1E7E34
#FFF3E0 / #E65100
#FCE4EC / #C62828
#E8EAF6 / #3949AB
#E0F7FA / #006064
```

---

## 10. Modals & Overlays

### 10.1 Backdrop

All modals use:
```css
position: fixed; inset: 0; z-index: 500+;
background: rgba(0,0,0,0.20);
display: flex; align-items: center; justify-content: center;
```
Click on backdrop closes modal (unless destructive confirmation required).

---

### 10.2 Modal Shell

| Property | Value |
|---|---|
| **Background** | `#FFFFFF` (white) — applies to the entire shell including header and body |
| **Border-radius** | `8px` |
| **Overflow** | `hidden` (clips children to rounded boundary) |
| **Shadow** | `0 8px 40px rgba(0,0,0,0.24)` |
| **Typical widths** | `420px` (confirm dialogs) · `640–700px` (standard modals) · `980px` (large two-pane flows) |

> **Never** use a dark navy (`#243746`) background for the modal shell. The entire modal surface is always white.

---

### 10.3 Standard Modal Header Style

This header style applies to all modals across the platform: **Import CSV**, **Export CSV**, **Add User**, and any future modal.

#### Anatomy

```
┌──────────────────────────────────── 100% width ──┐
│  [Title]                              [× close]  │  ← height: 72px
│  padding: 0 24px                                 │
│  background: #FFFFFF                             │
├──────────────────────────────────────────────────┤
│  Divider — 1px solid #F0F0F0                     │
└──────────────────────────────────────────────────┘
```

#### Specification

| Property | Value |
|---|---|
| **Height** | `72px` (fixed) |
| **Background** | `#FFFFFF` |
| **Bottom divider** | `1px solid #F0F0F0` |
| **Horizontal padding** | `24px` left and right |
| **Vertical alignment** | `flex; align-items: center` — title and close button always vertically centred |
| **Title font family** | `Actor, sans-serif` |
| **Title font size** | `24px` |
| **Title font weight** | `400` (Regular) |
| **Title line-height** | `28.8px` |
| **Title colour** | `#1B2736` |
| **Close button** | Ghost — `background: none; border: none` · hover `background: #F5F6F7` · `border-radius: 40px` |
| **Close icon** | `×` SVG `12 × 12px` · stroke `#384857` · `strokeWidth 1.5` · `strokeLinecap round` |
| **Close button padding** | `8px` around the icon (effective hit zone ~28px) |

#### Usage rules

- **No dark navy header.** The previous pattern of `bg-[#243746]` with a white logo and white close icon is retired. All modal headers are now white.
- **No icons alongside the title.** The header contains only the title text (left) and the close button (right).
- **No sub-text in the header row.** Any supplementary description belongs in the modal body, below the `#F0F0F0` divider.
- **Always include the `#F0F0F0` bottom divider** — it separates the header from the content area.
- **`flexShrink: 0`** is mandatory on the header wrapper to prevent collapse in a flex-column layout.

#### Implementation

```tsx
{/* Modal Header */}
<div style={{ backgroundColor: '#FFFFFF', flexShrink: 0 }}>
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 72, padding: '0 24px',
  }}>
    <p style={{
      fontFamily: "'Actor', sans-serif",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: '28.8px',
      color: '#1B2736',
      margin: 0,
      whiteSpace: 'nowrap',
    }}>
      Modal Title
    </p>
    <button
      onClick={onClose}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'none', border: 'none', cursor: 'pointer',
        borderRadius: 40, transition: 'background-color 0.15s',
      }}
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
```

---

### 10.4 Modal Footer Style

The footer is shared across Import CSV, Export CSV, Add User, and all future modals.

| Property | Value |
|---|---|
| **Height** | `72px` (fixed) |
| **Background** | `#FFFFFF` (white) |
| **Top border** | `1px solid #C3C7CC` |
| **Horizontal padding** | `28px` left and right |
| **Button alignment** | `flex; align-items: center; justify-content: space-between` |
| **Button gap (right group)** | `10px` |

**Button spec in footer:**
- Secondary actions (Cancel, tertiary actions like "Invite New User") → **Secondary Medium** (§15.2): `h-36px`, `padding: 0 16px`, `bg #F2F3F4`, `border: 1px solid #C3C7CC`.
- Primary / confirm action → **Primary Medium** (§15.1): `h-36px`, `padding: 0 16px`, `bg #FF4D00` → hover `#FF773E` → pressed `#D4380D` · disabled `#FFBD9C`.
- All button labels: `Inter, 14px, weight 400`.

---

### 10.5 Delete Confirmation Modal

- Icon: 40 × 40px rounded-full, `bg #FEF3F2`, red warning SVG inside.
- Typed confirmation: user must type `"delete"` (case-insensitive) to enable the confirm button.
- Confirm button: Destructive — `bg #D92D20`, white text, full width.

---

### 10.6 Add User Modal

**File:** `/src/app/components/add-user-modal.tsx`

#### Shell

| Property | Value |
|---|---|
| **Size** | `980 × 730px` · `max-width: calc(100vw - 32px)` · `max-height: calc(100vh - 32px)` |
| **Background** | `#FFFFFF` (entire shell — header, body, and content panels all white) |
| **Border-radius** | `8px` |
| **Shadow** | `0 8px 40px rgba(0,0,0,0.24)` |
| **z-index** | `101` (overlay at `100`) |

#### Header

Follows the **Standard Modal Header Style** (§10.3) exactly:
- Title: `"Add User"` · `Actor, 24px, weight 400, #1B2736`
- Ghost close button with `#384857` × icon

#### Body

- **Background:** `#FFFFFF`
- **Padding:** `28px` horizontal · `16px` top
- **Gap between sections:** `12px`
- **Search By tabs** (Company / E-mail): underline tab style, `3px` orange (`#FF4D00`) active indicator, `Inter 15px`
- **Two-pane layout:** `[Available Users — flex-1] [Add/Remove buttons — 148px] [Added Users Cart — flex-1]`
- **Bottom gap between panels and footer:** `12px` (`pb-[12px]` on the panels row)

#### Available Users & Added Users Cart panels

| Property | Value |
|---|---|
| **Panel card border (idle)** | `1px solid #D9D9D9` |
| **Panel card border (drop active)** | `2px solid #FF4D00` + `box-shadow: 0 0 0 3px rgba(255,77,0,0.12)` |
| **Panel card background** | `#FFFFFF` |
| **Panel card border-radius** | `4px` |
| **Column header row** | `bg #FAFAFA` · `border-bottom: 1px solid #9EA3A9` · `height: 34px` |
| **Data row height** | `36px` |
| **Data row zebra** | even `#FFFFFF` · odd `#FAFAFA` |
| **Selected row bg** | `#FFF3EE` |
| **Disabled row bg** | `#F7F8FA` · text `#B0B8C1` |
| **Row border-bottom** | `1px solid #F0F0F0` |
| **Search filter bar** | `bg #FAFAFA` · `border-bottom: 1px solid #D9D9D9` · input `h-30px` |

#### Add / Remove transfer buttons

Both buttons are centred vertically between the two panels (`px-18px` column).

| Button | Style | Spec |
|---|---|---|
| **Add →** | Primary Medium | `#FF4D00` → `#FF773E` hover → `#D4380D` pressed · `#FFBD9C` disabled · `h-36px` · `padding: 0 16px` · Inter 14px/400 · white icon |
| **← Remove** | Secondary Medium | `#F2F3F4` bg · `border: 1px solid #C3C7CC` default → `#E5E7E9`/`#616D79` hover → `#616D79`/white pressed · `#F5F5F5`/`#BFBFBF` disabled (no `opacity`) · `h-36px` · `padding: 0 16px` · Inter 14px/400 |

> **Never** use `opacity` for the disabled state on the Remove button. Use `#F5F5F5` background and `#BFBFBF` text/border explicitly.

#### Footer

Follows the **Modal Footer Style** (§10.4):
- Left: **"Invite New User"** — Secondary Medium with `+` icon stroke `#616D79`
- Right: **"Cancel"** (Secondary Medium) + **"Add N users to project"** (Primary Medium, label updates dynamically with cart count)

#### Drag & Drop

- **Drag type tokens:** `ADD_MODAL_AVAIL_USER` (from Available panel) · `ADD_MODAL_CART_USER` (from Cart panel)
- Cross-panel drag: Available → Cart (adds) · Cart → Available (removes)
- Drop hint banner: `rgba(255,77,0,0.10)` background · `1px dashed #FF4D00` bottom border

---

### 10.7 Invite User Modal

Launched from within Add User modal. Email invitation flow with role selection.

---

### 10.8 Import CSV Modal

Follows Standard Modal Header (§10.3) and Footer (§10.4). Drag-and-drop file upload zone + field mapping step.

---

### 10.9 Export CSV Modal

Follows Standard Modal Header (§10.3) and Footer (§10.4). Column selector + format options.

---

## 11. Panels (Slide-in / Drawer)

### 11.0 Side Panel — Universal Header Spec

> **Scope:** This section is the single source of truth for the header of **every push-layout side panel** across the platform — Filter Panel, File Details Panel, Bulk Edit Panel, Personal Info Panel, Column Settings Panel, and any future drawer panel. All panels must use this exact structure.

#### Anatomy

```
┌──────────────────────────────────────── panel width ──┐
│  [Title + optional badge]        [× close button]     │  ← 71px content area
├───────────────────────────────────────────────────────┤
│  1px solid #F0F0F0 (Gray / gray-4)                    │  ← 1px border strip
└───────────────────────────────────────────────────────┘
                                  Total outer height = 72px
```

#### Critical rule — 72px = 71px content + 1px border, **not** 72px content + 1px border

The outer wrapper is exactly **`72px`** tall. The 1px bottom border is **contained within** those 72px — it is not additive. Use a `flex-column` wrapper to enforce this:

```tsx
{/* ✅ Correct — 72px total */}
<div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
  {/* Content row — fills the remaining 71px */}
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
    {/* Title + close button */}
  </div>
  {/* Border strip — 1px, always last child */}
  <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
</div>

{/* ❌ Wrong — total = 73px (72px content div + 1px border sibling) */}
<div style={{ flexShrink: 0 }}>
  <div style={{ height: 72, ... }}> ... </div>
  <div style={{ height: 1, background: '#F0F0F0' }} />
</div>

{/* ❌ Also wrong — border adds to box height when not box-sizing: border-box on a fixed-height flex item */}
<div style={{ height: 72, borderBottom: '1px solid #F0F0F0', ... }}> ... </div>
```

#### Specification

| Property | Value |
|---|---|
| **Outer wrapper height** | `72px` (fixed, never `auto`) |
| **Outer wrapper display** | `flex; flexDirection: column` |
| **Background** | `#FFFFFF` |
| **`flexShrink`** | `0` — mandatory on the outer wrapper |
| **Content row** | `flex: 1` — fills exactly 71px |
| **Content padding** | `0 20px` horizontal |
| **Content alignment** | `display: flex; alignItems: center; justifyContent: space-between` |
| **Border strip** | `height: 1px; background: #F0F0F0 (Gray/gray-4); flexShrink: 0` — always the **last child** of the outer wrapper |
| **Title font family** | `Actor, sans-serif` |
| **Title font size** | `20px` |
| **Title font weight** | `400` (Regular) |
| **Title colour** | `#1B2736` |
| **Close button** | Ghost — `background: none; border: none` · hover `background: #F5F6F7` · `border-radius: 40px` · `padding: 8px` |
| **Close icon** | `×` SVG `12 × 12px` · stroke `#384857` · `strokeWidth 1.5` · `strokeLinecap round` |

#### Implementation

```tsx
{/* Side Panel Header — always this exact structure */}
<div style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
  <div style={{
    flex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 20px',
  }}>
    <span style={{
      fontFamily: "'Actor', sans-serif",
      fontWeight: 400, fontSize: 20,
      color: '#1B2736', whiteSpace: 'nowrap',
    }}>
      Panel Title
    </span>
    <button
      onClick={onClose}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 8, borderRadius: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#F5F6F7')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M2 2L14 14M14 2L2 14" stroke="#384857" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  </div>
  {/* 1px bottom border — always last child, always inside the 72px */}
  <div style={{ height: 1, flexShrink: 0, background: '#F0F0F0' }} />
</div>
```

#### Usage rules

| ✅ Always | ❌ Never |
|---|---|
| Set `height: 72` on the **outer** wrapper | Set `height: 72` on the inner content row and add the border as a sibling |
| Use `display: flex; flexDirection: column` on the outer wrapper | Use `borderBottom` on the outer wrapper (adds to total height) |
| Use `flex: 1` on the content row so it fills 71px | Use `height: 71` on the content row (fragile — breaks if padding changes) |
| Place the `height: 1` border div as the **last child** of the outer wrapper | Place the border div outside (after) the outer wrapper |
| Use `flexShrink: 0` on both the outer wrapper and the border strip | Let either shrink in a flex column layout |
| Use `#F0F0F0` (`Gray / gray-4`) for the border | Use `#D9D9D9` (`Gray / gray-5`) — that is the Section Header and table border colour |

---

### 11.1 Personal Info Panel

**File:** `/src/app/components/personal-info-panel.tsx`

- Slides in from the right side.
- Header uses its own SVG import set (`svg-hk4l0szw5g`, `svg-pm2yaulvbc`, etc.).
- Displays: avatar, full name, job title, company, office address, phone, email, permission type, invitation timestamp.
- Close via `×` icon button or pressing `Escape`.

#### 11.1.1 Member Avatar Edit Mode

The avatar section follows the **same pattern as `ImageField`** (General Information — Project Logo / Project Image). The click-on-avatar + camera-hover overlay interaction is **retired**. Dedicated buttons are used instead.

##### Layout

```
┌──────────────────────────────────────────────── panel width ──┐
│  [Avatar 64×64 circle]  [Name                              ] │
│                         [Job Title                         ] │
│                         [Email                             ] │
│                         [Status badge                      ] │
├───────────────────────────────────────────────────────────────┤
│  [Edit ──────────────────] [Remove photo ───────────────────] │  ← gap: 8px · marginTop: 12px
└───────────────────────────────────────────────────────────────┘
```

- The avatar circle is **display-only** — no `onClick`, no hover overlay, no cursor change.
- A `border: 1px solid #E5E7EB` ring is always visible around the circle.

##### Edit button — Secondary Medium (§15.2)

| Property | Value |
|---|---|
| **Height** | `36px` |
| **Flex** | `1` (50 % of row, minus 8px gap) |
| **Background (default)** | `#F2F3F4` · border `1px solid #C3C7CC` |
| **Background (hover)** | `#E5E7E9` · border `1px solid #616D79` |
| **Icon** | Pencil SVG `15×15` · stroke `#616D79` |
| **Label** | `"Edit"` · Inter 14px/400 · `#616D79` |
| **On click** | Opens `ImageCropModal` with `originalAvatarSource` |

##### Remove photo button — Destructive state

| Property | Value |
|---|---|
| **Height** | `36px` |
| **Flex** | `1` (50 % of row, minus 8px gap) |
| **Enabled** | bg `#FFF1F0` · border `1px solid #FFA39E` · text `#D92D20` · hover bg `#FFE4E3` |
| **Disabled** | bg `#F5F5F5` · border `1px solid #E0E4E8` · text `#BFBFBF` · `cursor: not-allowed` |
| **Enabled condition** | Only when `customAvatarUrl !== null` (a cropped photo has been set) |
| **On click** | Opens `RemovePhotoModal` confirmation |

##### `originalAvatarSource` — Re-crop pattern

Identical to `ImageField.originalSource` in General Information:

- `originalAvatarSource: File | string | null` — stores the **pre-crop** original, never the cropped JPEG output.
- Passed to `ImageCropModal` as `file` (if `instanceof File`) or `imageUrl` (if `string`).
- `onSave(dataUrl, src)` → `setOriginalAvatarSource(src)` + `setCustomAvatarUrl(dataUrl)`.
- Reset to `null` when the active user changes (`user?.id` effect) or when the photo is removed.

##### `RemovePhotoModal`

Inline confirmation dialog (portalled to `document.body`, `z-index: 600`). **No type-to-confirm** — simpler UX for a profile photo:

- Red warning icon (40×40, `bg #FEF3F2`).
- Footer: **Cancel** (Secondary Medium) + **Remove photo** (`bg #D92D20` → hover `#B42318`, white text).
- On confirm: `setCustomAvatarUrl(null)` + `setOriginalAvatarSource(null)`.

##### Rules

| ✅ Always | ❌ Never |
|---|---|
| Use Edit + Remove photo buttons below the avatar circle | Use click-on-avatar / camera-hover overlay to trigger upload |
| Pass `originalAvatarSource` to `ImageCropModal` | Pass the cropped output `customAvatarUrl` into the modal |
| Use `onSave(dataUrl, src)` two-arg form; store `src` as `originalAvatarSource` | Use the one-arg form — the original source is lost after the first crop |
| Keep Remove photo disabled when no custom photo is set | Enable Remove photo when only the initials placeholder is shown |
| Confirm removal via `RemovePhotoModal` | Remove silently without a confirmation step |

### 11.2 Filter Panel

**File:** `/src/app/components/filter-panel.tsx`

- Rendered via `createPortal` into `document.body`.
- Default size: **460 × 590px**. Min: **360 × 340px**. Resizable via `re-resizable`.
- Filter fields: Company, Office, Email Domain, Status, Permission Type, User Type, Access Level.
- Each field supports multi-select (array of chosen values stored in `FilterConfig.filters`).
- Visibility toggle (show/hide) per field.
- Active filter count shown as orange badge on toolbar Filter button.

### 11.3 Column Settings Panel

**File:** `/src/app/components/column-settings-panel.tsx`

- Positioned relative to its trigger button (column settings button in toolbar).
- Toggle visibility and reorder columns via drag-and-drop.

---

## 12. Selection Action Bar

**File:** `/src/app/components/selection-action-bar.tsx`

Appears at the bottom of the screen when one or more table rows are selected.

- Fixed position, full-width, above table pagination.
- Shows: "{N} users selected" + action buttons (Resend invite, Suspend, Delete).
- Delete triggers the Delete Confirmation Modal.

---

## 13. Toast Notifications

**File:** `/src/app/components/toast.tsx`

### Usage

```tsx
const { showToast } = useToast();
showToast({ type: 'success', title: 'User added', message: 'Optional detail.' });
```

Wrap the app root in `<ToastProvider>`.

### Visual

- **Position:** fixed, bottom-right, stacked, `z-index: 9000+`.
- **Width:** ~340px.
- **Shape:** `border-radius: 8px`, white background, `4px` left-border in type colour.
- **Icon:** 22 × 22px filled circle with white symbol.
- **Auto-dismiss:** ~4 seconds with animated progress bar.
- **Types:** `success` | `error` | `info` | `warning`.

---

## 14. Iconography

All icons are inline SVG. Stroke weight is **1.5px** throughout the UI unless noted.

### Icon sizes

| Location | Size |
|---|---|
| Sidebar nav | 24 × 24px |
| Top-nav utility icons | 22–24px |
| App Launcher (waffle) | 24 × 24px |
| Table toolbar | 18 × 18px |
| Status badge dot | 5 × 5px |
| Table row action | 15–20px |
| Module card | 28 × 28px |
| Chevrons | 8–12px |

### Icon colour rules

| Context | Colour |
|---|---|
| On dark nav (inactive) | `white` |
| On dark nav (active) | `white` (label bold) |
| App Launcher (closed) | `white` |
| App Launcher (open) | `#FF4D00` |
| Toolbar icons | `#616D79` |
| Orange CTA icons | `white` |
| Active tab/toggle | `#FF4D00` |
| Sort arrows (active) | `#4D7CFE` |
| Sort arrows (inactive) | `#C4CAD1` |

### Key icon components

| Component | SVG source | Usage |
|---|---|---|
| `InertiaAiIcon` | `svg-fynbzyrtwq` + `svg-o83jhbud1k` | Brand logo in top-nav |
| `AppsGridIcon` | `svg-4n56u6vlml` | App Launcher waffle button |
| `ProjectConfigIcon` | Inline SVG (slider lines) | Module card + sidebar |
| `BellIcon` | `svg-fynbzyrtwq` | Top-nav notifications |
| `QuestionIcon` | `svg-fynbzyrtwq` | Top-nav help |
| `UserSingleIcon` | `svg-fynbzyrtwq` | Users nav item |
| `UserKeyIcon` | `svg-fynbzyrtwq` | Roles / Permissions nav |
| `UserGroupIcon` | `svg-fynbzyrtwq` | Teams nav |
| `LayersIcon` | `svg-fynbzyrtwq` | LBS nav |
| `CollapseRightIcon` | `svg-fynbzyrtwq` | Sidebar collapse toggle |
| `FilterIcon` | `svg-fynbzyrtwq` | Table toolbar |
| `ImportIcon` | `svg-fynbzyrtwq` | Table toolbar |
| `ExportIcon` | `svg-fynbzyrtwq` | Table toolbar |
| `SearchIcon` | Inline SVG | Table toolbar + filter panel |
| `ChevronIcon` | `svg-fynbzyrtwq` | Pagination, group rows |
| `SortIcon` | `svg-fynbzyrtwq` | Table headers |
| `SettingsIcon` | `svg-fynbzyrtwq` | Settings action |
| `EllipsisIcon` | `svg-fynbzyrtwq` | Row context menu |
| `InfoIcon` | Inline SVG | Row info action |
| `PlusIcon` | `svg-fynbzyrtwq` | Add button |
| `GripDots` | Inline SVG | Column drag handle |

---

## 15. Buttons

### 15.1 Primary CTA

**Figma source:** `Primary Default / Hover / Pressed / Disabled`

#### States

| State | Background | Text | Cursor |
|---|---|---|---|
| **Default** | `#FF4D00` | `#FFFFFF` | `pointer` |
| **Hover** | `#FF773E` | `#FFFFFF` | `pointer` |
| **Pressed / Active** | `#D4380D` | `#FFFFFF` | `pointer` |
| **Disabled** | `#FFBD9C` | `#FFFFFF` | `not-allowed` |

#### Anatomy

```
[Leading Icon] [Label] [Trailing Chevron]
  gap: 4px between every item
  border-radius: 4px
  border: none
  font: Inter Regular 400 — size varies by tier (see Size Scale), #FFFFFF
  white-space: nowrap
  transition: background 0.15s
```

#### Size Scale

Icon size **and** height both change across sizes. Font size and line-height vary by size tier; padding, border-radius, and gap are identical in all sizes.

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `16px` | `22px` | `4px` |

#### Usage notes

- **Never** use `#FF4D00` hover — always use `#FF773E` on hover and `#D4380D` on press/active.
- **Never** use `opacity` to fake the disabled state — use the literal `#FFBD9C` background.
- Icon strokes are `white` in all states.
- Use Inter, not Open Sans, for button labels.

---

### 15.1.1 Primary CTA — Dark Surface Variant

**Figma source:** `Primary Default / Hover / Pressed / Focused / Disabled — Dark mode`  
**SVG assets:** `svg-b82n1s3hua` (Default) · `svg-3s0i3rzcmr` (Hover) · `svg-m6jyjlpt5c` (Pressed) · `svg-cmowoubr8o` (Focused) · `svg-3mmejo6cw8` (Disabled)

Use this variant whenever a Primary action button is placed on a **dark surface** (e.g. the top nav bar `#243746`, sidebar `#384857` toolbar chrome, or any `Navy / navy-8–9` background). The button is transparent by default so the dark chrome shows through; it only gains a background fill on interaction.

#### States

| State | Background | Text / Icon colour | Cursor |
|---|---|---|---|
| **Default** | `transparent` | `#FFFFFF` | `pointer` |
| **Hover** | `#4C5A67` (`Navy / navy-7`) | `#FFFFFF` | `pointer` |
| **Pressed / Active** | `#75808B` (`Navy / navy-5`) | `#FFFFFF` | `pointer` |
| **Focused** | `#384857` (`Navy / navy-8`) | `#FFFFFF` | `pointer` |
| **Disabled** | `transparent` | `#BFBFBF` (`Gray / gray-6`) | `not-allowed` |

#### Anatomy

```
[Leading Icon] [Label] [Trailing Chevron]
  gap: 4px between every item
  border-radius: 4px
  border: none (all states)
  font: Inter Regular 400 — size varies by tier (see Size Scale below), #FFFFFF
  white-space: nowrap
  transition: background 0.15s
```

#### Size Scale

Identical to the standard Primary CTA size scale (§15.1).

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `16px` | `22px` | `4px` |

#### Usage notes

- **Only use on dark surfaces.** On white or light surfaces, always use the standard Primary CTA (§15.1) with `#FF4D00` default background.
- **Default is always transparent** — do not add a visible fill in the default rest state. The dark chrome background shows through, giving the button a ghost appearance at rest.
- **Hover and Pressed use progressively lighter navy fills** — `#4C5A67` hover → `#75808B` pressed — consistent with the sidebar hover/active pattern.
- **Focused uses `#384857`** (Navy/navy-8), the same token used for the active sidebar item and widget toolbar background.
- **Disabled**: transparent background + `#BFBFBF` text and icon strokes. Never use `opacity` to fake this state.
- Icon and chevron strokes are always `white` in Default / Hover / Pressed / Focused states, and `#BFBFBF` in Disabled.
- Use Inter, not Open Sans, for button labels — identical rule to the standard Primary CTA.

---

### 15.2 Secondary

**Figma source:** `Secondary Default / Hover / Pressed / Focused / Disabled`

#### States

| State | Background | Border | Text / Icon colour | Cursor |
|---|---|---|---|---|
| **Default** | `#F2F3F4` | `1px solid #C3C7CC` | `#616D79` | `pointer` |
| **Hover** | `#E5E7E9` | `1px solid #616D79` | `#616D79` | `pointer` |
| **Pressed / Active** | `#616D79` | `1px solid #616D79` | `#FFFFFF` | `pointer` |
| **Focused** | `#C3C7CC` | `1px solid #616D79` | `#616D79` | `pointer` |
| **Disabled** | `#F5F5F5` | `1px solid #BFBFBF` | `#BFBFBF` | `not-allowed` |

#### Anatomy

```
[Leading Icon] [Label] [Trailing Chevron]
  gap: 4px between every item
  border-radius: 4px
  font: Inter Regular 400 — size varies by tier (see Size Scale)
  white-space: nowrap
  transition: background 0.15s, border-color 0.15s
```

#### Size Scale

Icon size **and** height both change across sizes. Font size and line-height vary by size tier; padding, border-radius, and gap are identical in all sizes.

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `16px` | `22px` | `4px` |

#### Usage notes

- **Never** use `white` or `#F9FAFB` as the default or hover background — the Secondary button uses `#F2F3F4` default and `#E5E7E9` hover.
- **Never** use `opacity` to fake the disabled state — use the literal `#F5F5F5` background and `#BFBFBF` for border and text.
- Icon and chevron strokes match the text colour in every state (grey in default/hover/focused/disabled, `white` in pressed).
- Border colour changes from `#C3C7CC` (default) to `#616D79` (hover/pressed/focused).
- Use Inter, not Open Sans, for button labels.

### 15.3 Tertiary

**Figma source:** `Tertiary Default / Hover / Pressed / Focused / Disabled`

#### States

| State | Background | Border | Text / Icon colour | Cursor |
|---|---|---|---|---|
| **Default** | `transparent` | `none` | `#616D79` | `pointer` |
| **Hover** | `#E5E7E9` | `none` | `#616D79` | `pointer` |
| **Pressed / Active** | `#616D79` | `none` | `#FFFFFF` | `pointer` |
| **Focused** | `#C3C7CC` | `none` | `#616D79` | `pointer` |
| **Disabled** | `transparent` | `none` | `#BFBFBF` | `not-allowed` |

#### Anatomy

```
[Leading Icon] [Label] [Trailing Chevron]
  gap: 4px between every item
  border-radius: 4px
  border: none (in all states — never a visible outline)
  font: Inter Regular 400 — size varies by tier (see Size Scale)
  white-space: nowrap
  transition: background 0.15s
```

#### Size Scale

Icon size **and** height both change across sizes. Font size and line-height vary by size tier; padding, border-radius, and gap are identical in all sizes.

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `16px` | `22px` | `4px` |

#### Usage notes

- **Key distinction from Secondary:** Tertiary has **no border in any state** — not even on hover or focus. Secondary always carries a `1px` border; Tertiary never does.
- **Key distinction from Ghost/Icon:** Tertiary carries a text label alongside the icon and uses the same size scale as Primary/Secondary. Ghost buttons are icon-only or situational utility actions on dark nav surfaces.
- **Never** use `opacity` to fake the disabled state — use `transparent` background and `#BFBFBF` for text and icon colour.
- Icon and chevron strokes match the text colour in every state (`#616D79` default/hover/focused, `#BFBFBF` disabled, `white` pressed).
- Use Inter, not Open Sans, for button labels.

---

### 15.4 Ghost / Icon

```
bg: transparent
border: none
icon-only or icon+label
hover: bg #F5F6F7 or #2D4255 (on dark nav)
```

### 15.5 Destructive

```
bg: #D92D20
text: white
disabled: opacity-40
border-radius: 4px
```

---

## 15.6 Toggle Switch

**Figma source:** `ToggleSwitch — Active / Inactive`

The Toggle Switch is used in table rows (e.g. the Roles Table Active column) to enable or disable a record inline, without opening a modal.

### Anatomy

```
┌──────────────────────── 40px ────────────────────────┐
│  ◯  (thumb 16×16px, inset 2px)         height: 20px  │
└───────────────────────────────────────────────────────┘
```

### Dimensions

| Property | Value |
|---|---|
| **Width** | `40px` |
| **Height** | `20px` |
| **Border-radius (track)** | `10px` — exactly half of height, produces a perfect pill |
| **Thumb size** | `16 × 16px` |
| **Thumb border-radius** | `50%` — perfect circle |
| **Thumb inset** | `2px` from top, `2px` from left (off) / `2px` from right (on) |
| **Thumb left (off)** | `2px` |
| **Thumb left (on)** | `22px` (`40 − 16 − 2 = 22`) |

### States

| State | Track background | Thumb background | Thumb shadow |
|---|---|---|---|
| **Active (on)** | `#FF4D00` (Inertia Orange) | `#FFFFFF` | `0 1px 3px rgba(0,0,0,0.25)` |
| **Inactive (off)** | `#D9D9D9` (`Gray / gray-5`) | `#FFFFFF` | `0 1px 3px rgba(0,0,0,0.25)` |

### Transitions

| Property | Duration |
|---|---|
| Track `background` | `0.2s` |
| Thumb `left` | `0.2s` |

### Cascade rule

When a **parent group row** toggle is switched **off**, all child rows belonging to that group are simultaneously deactivated (their `activeMap` entries set to `false`). Switching the parent back **on** reactivates all children. Child toggles can still be toggled individually without affecting the parent.

### Implementation

```tsx
function ToggleSwitch({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!active)}
      style={{
        width: 40, height: 20, borderRadius: 10,
        background: active ? '#FF4D00' : '#D9D9D9',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 2,
        left: active ? 22 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}
```

### Usage rules

- **Never** use `border-radius: 16px` or `border-radius: 9999px` for the track — always use exactly `10px` (half of the `20px` height).
- **Never** use `opacity` to indicate the off state — always change the track `background` to `#D9D9D9`.
- **Never** use `#FF4D00` as the off-state colour — orange is reserved for the active/on state only.
- Always apply `transition` on both the track background and the thumb position for a smooth animation.
- The `flexShrink: 0` rule is mandatory when the toggle is placed inside a flex table cell.

---

## 15.7 Chevron Icon

The chevron is used in table rows to expand/collapse parent groups (e.g. Roles Table, Reference Data table, and any future tree-table in the platform).

### Figma source assets

Two separate Figma frames are used — one per state. Both live as imported SVG path modules:

| State | Figma frame name | Import path | Path key |
|---|---|---|---|
| **Expanded (▼)** | `Chevron-down` | `../../imports/svg-0ujzuiicjd` | `p1d4b7280` |
| **Collapsed (►)** | `Chevron-right` | `../../imports/svg-kphlmu302k` | `p1d644480` |

> **Do not share these Figma frames with AI again.** They are permanently catalogued here. Always reference `svg-0ujzuiicjd` (ChevronDown) and `svg-kphlmu302k` (ChevronRight) directly.

### Path geometry — why `rotate(180 9 9)` is required

The SVG coordinate system has `y=0` at the **top** and `y` increasing **downward**. Both Figma chevron paths are drawn with their apex (the pointed tip) at a **low y value** (near the top of the 18 × 18 viewBox):

| Path | Apex coordinates | Native render | Required visual |
|---|---|---|---|
| `p1d4b7280` (Chevron-down) | apex at `y ≈ 6` (top of box) | **▲** (up-pointing) | **▼** (down-pointing) |
| `p1d644480` (Chevron-right) | apex at `x ≈ 6` (left of box) | **◄** (left-pointing) | **►** (right-pointing) |

To flip each path to its correct visual direction, apply `transform="rotate(180 9 9)"` directly on the `<path>` element. This rotates 180° around the centre point `(9, 9)` of the 18 × 18 viewBox — the cleanest SVG-native correction with no CSS hacks.

> **Never** omit this `transform` attribute. Removing it produces the wrong orientation (▲ for expanded, ◄ for collapsed). **Never** use CSS `transform: rotate(180deg)` on the outer `<svg>` element — apply the SVG `transform` attribute on the `<path>` element itself.

### Dimensions

| Property | Value |
|---|---|
| **SVG element size** | `18 × 18px` |
| **SVG viewBox** | `0 0 18 18` |
| **Fill colour** | `#384857` |

### Visual states

| State | Path used | SVG `transform` on `<path>` | Visual result |
|---|---|---|---|
| **Expanded** | `p1d4b7280` (Chevron-down) | `rotate(180 9 9)` | **▼** — points downward, content visible below |
| **Collapsed** | `p1d644480` (Chevron-right) | `rotate(180 9 9)` | **►** — points right, content hidden |

> **Critical rule:** Expanded = ▼, Collapsed = ►. Never use ▲ or ◄ — these are the *un-corrected* native path orientations.

### Hit zone

The `ChevronIcon` is wrapped in a `<button>` element sized `18 × 18px`. The button uses `background: none; border: none; padding: 0; cursor: pointer`.

- Set `opacity: 0` (and `cursor: default`) when the row has no children.
- Use `e.stopPropagation()` if the chevron button sits inside a clickable row.

### Implementation

```tsx
import chevronDownPaths  from '../../imports/svg-0ujzuiicjd';
import chevronRightPaths from '../../imports/svg-kphlmu302k';

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      {expanded ? (
        /* Chevron-down — apex at top (▲ natively), rotate 180° around centre → ▼ */
        <path d={chevronDownPaths.p1d4b7280} fill="#384857" transform="rotate(180 9 9)" />
      ) : (
        /* Chevron-right — apex at left (◄ natively), rotate 180° around centre → ► */
        <path d={chevronRightPaths.p1d644480} fill="#384857" transform="rotate(180 9 9)" />
      )}
    </svg>
  );
}
```

### Usage rules

| ✅ Always | ❌ Never |
|---|---|
| Use `svg-0ujzuiicjd` (`p1d4b7280`) for the **expanded** state | Use a single path with CSS `rotate(-90deg)` / `rotate(0deg)` toggling |
| Use `svg-kphlmu302k` (`p1d644480`) for the **collapsed** state | Omit the `transform="rotate(180 9 9)"` attribute — paths render wrong without it |
| Apply `transform="rotate(180 9 9)"` on **both** `<path>` elements | Apply the rotation on the outer `<svg>` element |
| Use `18 × 18px` SVG with `viewBox="0 0 18 18"` | Use a `12 × 8` or other viewBox — it clips the path |
| Keep `flexShrink: 0` on the SVG | Allow the SVG to shrink inside flex table cells |

---

## 15.8 Radio Button

**Figma source:** `Selected` · `Default` · `Hover` · `Disabled` — `/src/imports/Selected.tsx`, `/src/imports/Default.tsx`, `/src/imports/Hover.tsx`, `/src/imports/Disabled.tsx`

The Radio Button is used in table cells and forms wherever a single mutually-exclusive value must be chosen per row (e.g. the Role Access Level matrix, permission selectors, and any future single-choice column in a data table).

---

### 15.8.1 Anatomy

```
┌──────── 16 × 16 px ────────┐
│  ○  outer circle r=7.5     │  ← plate (white or #F5F5F5)
│     + stroke               │  ← state-driven colour
│  ●  inner dot r=4          │  ← visible in Selected state only (#616D79)
└─────────────────────────────┘
```

The SVG `viewBox` is always `0 0 16 16`. Both circles share the same centre point `cx=8 cy=8`.

---

### 15.8.2 States

| State | Plate fill | Stroke | Inner dot | Figma file |
|---|---|---|---|---|
| **Default** | `#FFFFFF` (white) | `#D9D9D9` | — | `Default.tsx` |
| **Hover** | `#FFFFFF` (white) | `#616D79` | — | `Hover.tsx` |
| **Selected** | `#FFFFFF` (white) | `#616D79` | `#616D79` fill, `r=4` | `Selected.tsx` |
| **Disabled** | `#F5F5F5` | `#BFBFBF` | — | `Disabled.tsx` |

> **Hover and Selected share the same stroke colour (`#616D79`).** The only visual difference is the presence of the inner dot in Selected.

---

### 15.8.3 Dimensions

| Property | Value |
|---|---|
| **Container size** | `16 × 16 px` |
| **`viewBox`** | `0 0 16 16` |
| **Outer circle** | `cx=8 cy=8 r=7.5` |
| **Inner dot** | `cx=8 cy=8 r=4` |
| **`preserveAspectRatio`** | `none` |
| **`flexShrink`** | `0` — mandatory when inside a flex cell |

---

### 15.8.4 Implementation — `RadioSVG` Component

This is the canonical implementation to use across every table and form in the platform:

```tsx
type RadioState = 'default' | 'hover' | 'selected' | 'disabled';

function RadioSVG({ state }: { state: RadioState }) {
  const plateFill = state === 'disabled' ? '#F5F5F5' : 'white';
  const stroke    = state === 'default'  ? '#D9D9D9'
                  : state === 'disabled' ? '#BFBFBF'
                  : '#616D79';           // hover + selected both #616D79
  const showDot   = state === 'selected';

  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 16, height: 16 }}>
      <svg
        style={{ position: 'absolute', display: 'block', width: '100%', height: '100%' }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" fill={plateFill} r="7.5" stroke={stroke} />
        {showDot && <circle cx="8" cy="8" fill="#616D79" r="4" />}
      </svg>
    </div>
  );
}
```

#### Deriving state from React interaction

```tsx
function RadioCell({ selected, disabled, editMode }: {
  selected: boolean; disabled?: boolean; editMode: boolean;
}) {
  const [hov, setHov] = useState(false);

  const radioState: RadioState =
    disabled            ? 'disabled'
    : selected          ? 'selected'
    : (hov && editMode) ? 'hover'
    : 'default';

  return (
    <div
      onMouseEnter={() => !disabled && editMode && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: disabled ? 'not-allowed' : editMode ? 'pointer' : 'default' }}
    >
      <RadioSVG state={radioState} />
    </div>
  );
}
```

---

### 15.8.5 Usage Rules

| ✅ Always | ❌ Never |
|---|---|
| Use `RadioSVG` with the exact four-state enum for every radio control | Hand-code ad-hoc `<div>` circles styled with custom colours |
| Use `#616D79` for both Hover stroke and Selected stroke + dot | Use `#FF4D00` or any other brand colour for the radio active/selected state |
| Use `#D9D9D9` for the Default stroke | Use a lighter grey or transparent border in the default state |
| Keep inner dot `r=4` on a `16×16 viewBox` | Scale the dot with a percentage or different radius |
| Set `flexShrink: 0` on the container `<div>` | Allow the 16×16 SVG container to shrink inside a flex table cell |
| Set `position: absolute` + `width/height: 100%` on the `<svg>` inside its `position: relative` wrapper | Place the SVG without a positioned wrapper — it will not size correctly |
| Show the inner dot **only** in the `selected` state | Show the dot on hover or in any other non-selected state |
| Use `preserveAspectRatio="none"` on the SVG element | Omit this attribute — it may cause the circle to distort on non-square containers |

---

## 16. Field Input Style

### 16.1 Overview

Input fields share the same size scale as buttons (§15) — height, horizontal padding, font size, and line-height are identical per tier. The only dimension that differs from buttons is the border-radius, which uses `4px` for all input sizes to maintain a consistent rectangular shape.

---

### 16.2 Anatomy

```
[Leading Icon (optional)]  [Value / Placeholder text]  [Clear × icon (conditional)]
  left padding: 10px (without leading icon) / 36px (with leading icon)
  right padding: 10px (without clear icon) / 34px (with clear icon)
  icon and text vertically centred
  border: 1px solid
  border-radius: 4px
  background: #FFFFFF (default) | #F3F3F5 (toolbar / embedded)
  transition: border-color 0.15s
```

---

### 16.3 States

| State | Border colour | Background | Text colour | Placeholder colour |
|---|---|---|---|---|
| **Default** | `#D0D5DD` | `#FFFFFF` | `#344054` | `#667085` |
| **Hover** | `#A8B0BB` | `#FFFFFF` | `#344054` | `#667085` |
| **Active / Focus** | `#91D5FF` (`Blue / blue-3`) | `#FFFFFF` | `#344054` | `#667085` |
| **Disabled** | `#E0E4E8` | `#F5F5F5` | `#BFBFBF` | `#BFBFBF` |
| **Error** | `#FFA39E` (`Red / red-3`) | `#FFFFFF` | `#344054` | `#667085` |

> **Active / Focus rule:** When the field receives focus, the border immediately switches to `#91D5FF` (Blue / blue-3). Never use `#FF4D00` for input focus — that colour is reserved for CTA buttons and active sidebar indicators.

---

### 16.4 Clear (×) Icon

A clear icon appears **inside the field on the right edge** whenever the field contains one or more characters. It disappears when the field is empty.

| Property | Value |
|---|---|
| Icon | `×` glyph (or SVG close/x path) |
| Size | `16 × 16px` (Small / Medium) · `18 × 18px` (Large) |
| Colour | `#8C8C8C` (`Gray / gray-7`) default · `#595959` (`Gray / gray-8`) on hover |
| Position | Absolutely positioned, `right: 10px`, vertically centred |
| Right padding (field) | Expands to `34px` when the clear icon is visible to prevent text overlap |
| Behaviour | `onClick` → clears field value and returns focus to the input |
| Transition | `opacity 0.1s` — fades in/out as value changes |

---

### 16.5 Size Scale

Font size and line-height remain constant across all input sizes — only height and icon size change.

| Size | Height | H. Padding | Font size | Line height | Icon size | Border-radius |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `10px` | `14px` | `20px` | `16 × 16px` | `4px` |
| **Medium** | `36px` | `10px` | `14px` | `20px` | `16 × 16px` | `4px` |
| **Large** | `40px` | `12px` | `14px` | `20px` | `18 × 18px` | `4px` |

---

### 16.6 Typography

| Property | Value |
|---|---|
| Font family | `Open Sans` |
| Font size | `14px` (all sizes) |
| Line height | `20px` (all sizes) |
| Font weight | `400` (Regular) |
| Value colour | `#344054` |
| Placeholder colour | `#667085` |

---

### 16.7 Usage Notes

- Always use `Blue / blue-3` (`#91D5FF`) for the active/focus border — never `#FF4D00`.
- The clear `×` icon is **always conditional** — render it only when `value.length > 0`. Never show a static clear icon on an empty field.
- When a leading search icon is present, set `padding-left: 36px` to accommodate it.
- Do **not** use `border-radius: 46px` (pill shape) for standard form inputs — pill shape is reserved for status badges only.
- **Dropdown "— None —" ground rule:** Every `SelectInput` / dropdown that is **not** mandatory must offer a `"— None —"` first option so users can clear the field. See §16.8.7 rule 8 and §16.8.8 for full visual spec. Exception: mandatory fields (marked with a red `*`) must never offer a blank/None option.
- Prefer `background: #FFFFFF` for standalone form fields; use `#F3F3F5` only for inputs embedded inside toolbars or dark-chrome surfaces.

---

## 16.8 Dropdown / Select Component

This section defines the full visual and interaction specification for all custom `SelectInput` dropdown components used across the platform (General Information edit mode, filters, table toolbars, etc.).

---

### 16.8.1 Trigger Button

The trigger is the closed-state field that the user clicks to open the menu.

| Property | Value |
|---|---|
| **Height** | `40px` |
| **Width** | `100%` of its container |
| **Background** | `#FFFFFF` |
| **Border (idle)** | `1px solid #D0D5DD` |
| **Border (open / focused)** | `1px solid #91D5FF` (`Blue / blue-3`) |
| **Border-radius** | `4px` |
| **Horizontal padding** | `10px` left and right |
| **Font family** | `Open Sans, sans-serif` |
| **Font size** | `14px` |
| **Font weight** | `400` (Regular) |
| **Line height** | `20px` |
| **Value colour** | `#344054` |
| **Placeholder colour** | `#9EA3A9` |
| **Cursor** | `pointer` (closed) · `default` (open) |
| **Transition** | `border-color 0.15s` |
| **Trailing chevron colour (idle)** | `#9EA3A9` |
| **Trailing chevron colour (open)** | `#91D5FF` |
| **Chevron rotation** | `0deg` (closed) · `180deg` (open) |

---

### 16.8.2 Inline Search (Open State)

When the user clicks the trigger to open the dropdown, the value display is immediately replaced by an inline text input that accepts a search query. The input auto-focuses on open.

| Property | Value |
|---|---|
| **Input appearance** | `border: none; outline: none; background: transparent` — inherits the trigger's border and background |
| **Placeholder** | `"Search..."` |
| **Font** | `Open Sans, 14px, weight 400, color #344054` |
| **Filtering threshold** | Filter activates from the **2nd character** onward (`query.length >= 2`). The full list is shown for 0–1 characters |
| **Filter logic** | Case-insensitive substring match: `option.toLowerCase().includes(query.toLowerCase())` |
| **Auto-focus** | `setTimeout(() => inputRef.current?.focus(), 30)` — slight delay ensures the portal is mounted |

---

### 16.8.3 Menu Panel

The dropdown panel is always **portalled to `document.body`** using `ReactDOM.createPortal` to prevent clipping inside scroll containers or stacking contexts.

| Property | Value |
|---|---|
| **Position** | `position: absolute` — anchored to `triggerRef.getBoundingClientRect()` |
| **Top offset** | `triggerBottom + scrollY + 4px` |
| **Width** | Matches trigger width; `minWidth: 180px` floor |
| **Background** | `#FFFFFF` |
| **Border-radius** | `4px` |
| **Box shadow** | `0px 9px 28px 8px rgba(0,0,0,0.05), 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12)` |
| **Padding** | `4px` top and bottom |
| **z-index** | `9999` |
| **Max height** | **`320px`** — mandatory upper bound for all dropdown menus across the platform |
| **Overflow** | `overflowY: 'auto'` — vertical scroll activates automatically when list height exceeds 320px |

> **Scrolling rule:** No dropdown menu may ever exceed `320px` in height. When the visible list content surpasses this limit, a scrollbar is applied automatically via `overflowY: 'auto'`. This rule applies to every `SelectInput` instance across all modules, regardless of the number of options.

---

### 16.8.4 Menu Items

| Property | Value |
|---|---|
| **Height** | `32px` |
| **Horizontal padding** | `12px` left and right |
| **Vertical padding** | `5px` top and bottom |
| **Font family** | `Inter, sans-serif` |
| **Font size** | `14px` |
| **Font weight (unselected)** | `400` (Regular) |
| **Font weight (selected)** | `600` (SemiBold) |
| **Text colour** | `#384857` |
| **Background (idle)** | `transparent` |
| **Background (hovered)** | `#F5F5F5` |
| **Background (selected)** | `#E6F7FF` (`Blue / blue-1`) |
| **Selected checkmark icon** | `13 × 10px` SVG · stroke `#1890FF` · `strokeWidth 1.5` · `strokeLinecap round` |
| **Cursor** | `pointer` |
| **Transition** | `background 0.1s` |
| **Divider** | `1px solid #F0F0F0` · `margin: 4px 0` — rendered after the item specified by `dividerAfter` prop |

---

### 16.8.5 Empty State

When the search query produces no matching options:

| Property | Value |
|---|---|
| **Content** | Text: `"No results found"` |
| **Padding** | `8px 12px` |
| **Font** | `Inter, 14px, colour #9EA3A9` |

---

### 16.8.6 Dismiss Behaviour

| Trigger | Result |
|---|---|
| Click outside the trigger + menu | Menu closes, search text cleared |
| Select a menu item | Menu closes, value updated, search text cleared |
| `mousedown` on backdrop | Detected via `document.addEventListener('mousedown', handler)` — handler fires only if click target is outside `triggerRef` |

---

### 16.8.7 Usage Rules

1. **Max height is always `320px`.** Never hard-code a taller value or `overflow: hidden` — all dropdowns must scroll when content exceeds this limit.
2. **Always portal to `document.body`.** Never render the menu panel as a direct DOM child of the trigger — it will be clipped by `overflow: hidden` parents (tables, modals, scroll containers).
3. **Filtering starts at the 2nd character.** The 1st character typed shows the full list as a visual confirmation that search mode is active.
4. **Never use `#FF4D00` for the focus border.** The open/focus border is always `#91D5FF` (`Blue / blue-3`) — orange is reserved for CTAs and active indicators.
5. **Chevron must reflect open state.** Chevron colour changes from `#9EA3A9` (idle) to `#91D5FF` (open) in sync with the border.
6. **Selected item uses `#E6F7FF` background + bold label + blue checkmark.** Never use orange or the brand primary for selection indicators inside dropdown menus.
7. **Hover is `#F5F5F5`.** Never use `#F9FAFB`, `#F0F0F0`, or any other near-white variant for menu item hover.
8. **"— None —" ground rule (non-mandatory fields).** Every dropdown / select field that is **not** a mandatory required field **must** include `"— None —"` as the first menu item, allowing the user to clear the field. This option is rendered in italic `#9EA3A9` text and is visually separated from the real options by a `1px #F0F0F0` divider below it. When selected it stores an empty string `""` as the field value, and the trigger displays `"— None —"` in the placeholder style. **Exception:** Omit "— None —" only when the field is explicitly marked as required/mandatory (e.g. fields with a red asterisk `*`), where an empty value would be invalid.

---

### 16.8.8 "— None —" Option — Visual Spec

| Property | Value |
|---|---|
| **Label text** | `"— None —"` (em-dashes, not hyphens) |
| **Font style** | `italic` |
| **Text colour** | `#9EA3A9` (muted grey — same as placeholder) |
| **Background (idle)** | `transparent` |
| **Background (hover)** | `#F5F5F5` |
| **Height** | `32px` (same as all menu items) |
| **Padding** | `0 12px` |
| **Checkmark** | Never shown — even when this value is selected |
| **Separator below** | `1px solid #F0F0F0` · `margin: 4px 0` |
| **Position** | Always first in the list; hidden when the search query is 2+ characters |
| **Stored value** | Empty string `""` |
| **Trigger display when selected** | Same italic muted style as placeholder (`#9EA3A9`) |

---

## 17. Technical Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v4 (utility-first, inline classes) |
| Icons | Inline SVG (Figma-exported paths via `svg-*` import modules) |
| Fonts | Google Fonts via `fonts.css` |
| Routing | `react-router` (Data Mode, `RouterProvider`) |
| Drag & Drop | `react-dnd` + `react-dnd-html5-backend` |
| Portals | `ReactDOM.createPortal` for Module Selector, Filter Panel, Toast |
| Notifications | Custom `ToastProvider` context (`/src/app/components/toast.tsx`) |
| Raster images | `figma:asset/` virtual module scheme |
| Vector images | `/src/imports/svg-*.ts` modules |

### z-index layering

| Layer | z-index |
|---|---|
| Sticky table header | 20 |
| Sticky actions column | 4–16 |
| Modals / overlays | 500–600 |
| Toast stack | 9000 |
| Module Selector / Filter Panel | 9999 |

### Portal convention

Any floating panel that must escape a stacking context (sticky table header, transformed containers) **must** use `createPortal(…, document.body)`. Position using `position: fixed` with explicit `top` / `left` pixel values derived from `anchorTop` / `anchorLeft` props.

### File organisation

```
/src
├── app
│   ├── App.tsx                         ← Shell, TopNav, Sidebar, MainContent
│   ├── routes.ts                       ← createBrowserRouter
│   └── components
│       ├── add-user-modal.tsx
│       ├── column-settings-panel.tsx
│       ├── export-csv-modal.tsx
│       ├── filter-panel.tsx
│       ├── import-csv-modal.tsx
│       ├── invite-user-modal.tsx
│       ├── module-selector.tsx         ← AppsGridIcon + ModuleSelector
│       ├── personal-info-panel.tsx
│       ├── selection-action-bar.tsx
│       ├── toast.tsx                   ← ToastProvider + useToast
│       ├── users-table.tsx
│       ├── figma/
│       │   └── ImageWithFallback.tsx   ← PROTECTED — do not modify
│       └── ui/                         ← Shared primitives
├── imports
│   ├── svg-fynbzyrtwq.ts               ← Primary icon path set
│   ├── svg-o83jhbud1k.ts               ← Secondary icon path set
│   └── svg-*.ts                        ← Other imported SVG modules
└── styles
    ├── fonts.css                       ← Google Fonts @import only
    ├── theme.css                       ← CSS custom properties + global rules
    ├── index.css                       ← Base reset
    └── tailwind.css                    ← Tailwind entry point
```

---

## 18. Key Design Principles

1. **Dark chrome, light content.** Navigation and chrome use Inertia Navy (`#243746`). Content areas are white or near-white. Never use the dark navy as a content background.

2. **Orange is sacred.** `#FF4D00` is used exclusively for: active states, CTAs, the 4px sidebar indicator, the active app launcher icon, and the brand logo. Never use it for error states or informational colour.

3. **No dividers in the header.** The top nav has `box-shadow: none` and `border-bottom: none` by design.

4. **Always portal floating elements.** Any element that must appear above a sticky header must use `createPortal` into `document.body`.

5. **Sidebar is a first-class navigation element.** It is always visible (expanded or collapsed). Never hide the sidebar completely.

6. **Status is always a pill badge.** Never use plain text for user status — always use the `StatusBadge` component with its defined colour tokens.

7. **1.5px stroke weight.** All SVG icon strokes use `strokeWidth="1.5"` and `strokeLinecap="round"` or `"square"` as defined per icon. Never deviate.

8. **Consistent hover states.** On dark surfaces: hover = `#2D4255`. On white surfaces: hover = `#F9FAFB` or `#F5F6F7`. Interactive elements always have a `transition-colors` applied.

9. **Open Sans is the UI font.** Use Inter only for modal headings and module card labels. Never mix other fonts into the UI chrome.

10. **Resizable columns, not fixed.** Table columns are flex-fill by default and resizable by the user. Min-widths are calculated from the measured text label width + padding budget.

---

## 19. Segmented Buttons (Button Group)

### 19.1 Variant: Secondary — Grouped

**Figma source:** `Segmented Buttons Group` · Style: Secondary · Layout: Grouped · Size: Medium  
**SVG paths:** `/src/imports/svg-779tf3jmb0.ts`

---

### 19.2 Container

```
display: flex
align-items: center
border-radius: 4px  (applied via per-segment corner rounding — see below)
```

The group is a flat flex row of 2 or more Segmented Button segments. There is no wrapping container background or border — borders live on each segment.

---

### 19.3 Segment anatomy

Each segment contains a single `content` row:

```
[Leading Icon — size varies by size tier] [Label] [Trailing Chevron — size varies]
  gap: 4px between every item
  content row height: matches icon size
  content overflow: clip
```

| Property | Value |
|---|---|
| Display | `flex; flex-direction: row; align-items: center; justify-content: center` |
| Horizontal padding | `12px` each side |
| Content gap | `4px` — applied between leading icon, label, and trailing chevron |
| Icon size | Varies by size tier — see §19.6 |
| Trailing icon | Chevron-down, same size as leading icon, `−90°` rotation |

---

### 19.4 States

| State | Background | Border colour | Border sides | Text / Icon colour |
|---|---|---|---|---|
| **Active / Selected** | `#616D79` | `#616D79` | left + top + bottom (no right) | `#FFFFFF` |
| **Inactive** | `#F2F3F4` | `#C3C7CC` | left + top + bottom (no right, except last segment = all 4) | `#616D79` |

**Border joining rule:**
- Every segment **except the last** renders only `border-left + border-top + border-bottom`. The next segment's left border acts as the shared divider.
- The **last segment** renders all four borders (`border: 1px solid`).
- Active segment border colour matches its background (`#616D79`), making it visually flush with the fill.

**Corner rounding:**
- First segment: `border-radius: 4px 0 0 4px` (top-left + bottom-left only).
- Middle segment(s): no border-radius.
- Last segment: `border-radius: 0 4px 4px 0` (top-right + bottom-right only).

---

### 19.5 Typography

| Property | Value |
|---|---|
| Font family | `Inter` |
| Font weight | `400` (Regular) |
| Font size | `16px` (Small / Large) · `14px` (Medium) |
| Line height | `22px` (Small / Large) · `20px` (Medium) |
| Font style | Normal (not italic) |
| White space | `nowrap` |
| Colour (active) | `#FFFFFF` |
| Colour (inactive) | `#616D79` |

> Medium font size and line-height match the Tab Group Medium tier (§20.6) — `14px / 20px`. Small and Large use `16px / 22px` in line with the Secondary button (§15.2).

---

### 19.6 Size Scale

Icon size **and** height both change across sizes. Font size and line-height vary by size tier; padding and gap are identical in all sizes.

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `12px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `12px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `12px` | `20 × 20px` | `16px` | `22px` | `4px` |

---

### 19.7 Hover & Interaction

| Surface | Hover background |
|---|---|
| Active segment | no change (already filled `#616D79`) |
| Inactive segment | `#E8EAEC` (slightly darker than `#F2F3F4`) |

Apply `transition: background 0.15s` on each segment.

---

### 19.8 Usage notes

- Always render as a connected group — never use individual segmented buttons in isolation; use the standard Secondary / Outlined button instead.
- The segmented group is used for mutually exclusive view/mode selections (e.g. Card view / Table view / Map view).
- Minimum group size: 2 segments. Maximum recommended: 5 segments.
- Do **not** use `#FF4D00` (Inertia Orange) as the active fill for this component — the secondary segmented style uses `#616D79` exclusively.

---

## 20. Tab Group Buttons

**Figma sources:** `PrimaryTabsGroup` · `SecondaryTabsGroup`  
**SVG paths:** `/src/imports/svg-sbstuck9i.ts` (Primary) · `/src/imports/svg-zi8xz2231c.ts` (Secondary)

---

### 20.1 Overview

Tab groups are horizontal navigation bars used to switch between views or content sections within a module. Two style variants exist:

| Variant | Active indicator colour | Use case |
|---|---|---|
| **Primary** | `#FF4D00` (Inertia Orange) | Main module-level tabs |
| **Secondary** | `#243746` (Inertia Navy) | Nested or sub-section tabs |

---

### 20.2 Container

```
display: flex
align-items: center
border-bottom: 1px solid #D9D9D9   ← spans full tab bar width
```

Tabs are inline — there is no wrapping container background or fill. The bottom border visually anchors the bar to the content below and is always present regardless of active state.

---

### 20.3 Tab Item Anatomy

Each tab item is a vertical flex column:

```
display: flex
flex-direction: column
align-items: center
height: [varies by size — see §20.6]
```

It contains two children in sequence:

1. **Tab Name row** — horizontal flex row with icon + label + close icon
2. **Highlight bar** — 2px tall full-width strip (coloured when active, transparent when inactive)

#### Tab Name row

```
[Leading Icon] [Label] [Trailing Close ×]
  gap: 8px between every item
  horizontal padding: 16px each side
  align-items: center
```

| Slot | Detail |
|---|---|
| **Leading icon** | Context icon rendered at the size-tier's icon size (see §20.6) |
| **Label** | Inter, 14px, 20px line-height — `600` SemiBold when active, `400` Regular when inactive |
| **Trailing close ×** | Same size as leading icon. Rendered as a `+` glyph rotated 45°, `stroke #243746`, `strokeWidth 1.5`, `strokeLinecap square` |

Both icon slots use `overflow: clip` and `color: #243746` in all states.

---

### 20.4 Highlight Bar

```
height: 2px
width: 100%
```

| Variant | Active colour | Inactive colour |
|---|---|---|
| **Primary** | `#FF4D00` | transparent (no visible bar) |
| **Secondary** | `#243746` | transparent (no visible bar) |

---

### 20.5 States

| State | Label weight | Label colour | Highlight bar |
|---|---|---|---|
| **Active** | `600` (SemiBold) | `#243746` | Visible — variant colour (orange or navy) |
| **Inactive** | `400` (Regular) | `#243746` | Transparent / hidden |
| **Hover** | `400` (Regular) | `#243746` | Transparent (no change — hover is handled at the product level) |

> Label colour is `#243746` in **both** active and inactive states. The only visual difference between active and inactive is label weight and the presence of the highlight bar.

---

### 20.6 Size Scale

Icon size **and** tab height both change across sizes. Padding, font size, line-height, and gap are identical in all sizes.

| Size | Tab height | H. Padding | Icon size | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `14px` | `20px` | `8px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `8px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `14px` | `20px` | `8px` |
| **XL** | `48px` | `16px` | `24 × 24px` | `18px` | `26px` | `8px` |

---

### 20.7 Typography

| Property | Value |
|---|---|
| Font family | `Inter` |
| Font size | `14px` (Small / Medium / Large) · `18px` (XL) |
| Line height | `20px` (Small / Medium / Large) · `26px` (XL) |
| Active weight | `600` (SemiBold) |
| Inactive weight | `400` (Regular) |
| Colour (all states) | `#243746` |
| White-space | `nowrap` |

---

### 20.8 Usage Notes

- The bottom border (`1px #D9D9D9`) always spans the full width of the tab bar — never omit it.
- Only one tab can be active at a time within a group.
- The trailing **×** icon allows closing / removing individual tabs.
- Use **Primary** style for top-level module navigation tabs (orange `#FF4D00` active indicator matches the brand CTA).
- Use **Secondary** style for nested or sub-section tabs (navy `#243746` active indicator is more subdued).
- Never wrap tab labels — always apply `white-space: nowrap`.
- The highlight bar is `2px` — never increase its height.
- Tab items grow horizontally to fit their content; they do not have a fixed width.

---

## 21. Full Design System Colour Palette

This section documents every colour token from the Figma "Color Styles" frame. Tokens are grouped by scale and labelled exactly as they appear in Figma. Use these token names when referencing colours in code, documentation, or design handoff.

---

### 20.1 Gray (Neutral)

| Token | Hex | Usage |
|---|---|---|
| `Gray / gray-1` | `#FFFFFF` | White text |
| `Gray / gray-2` | `#FAFAFA` | Table header |
| `Gray / gray-3` | `#F5F5F5` | Background |
| `Gray / gray-4` | `#F0F0F0` | Divider |
| `Gray / gray-5` | `#D9D9D9` | Border |
| `Gray / gray-6` | `#BFBFBF` | Disable |
| `Gray / gray-7` | `#8C8C8C` | Secondary text / placeholder text / caption |
| `Gray / gray-8` | `#595959` | — |
| `Gray / gray-9` | `#434343` | — |
| `Gray / gray-10` | `#262626` | Title / Primary Text |

---

### 20.2 Backgrounds

| Token | Hex | Usage |
|---|---|---|
| `Backgrounds / white` | `#FFFFFF` | Component background |
| `Backgrounds / background-1` | `#F0F2F5` | Layout / Page background |
| `Backgrounds / background-2` | `#F9FAFB` | Under sheet background |
| `Backgrounds / tooltip-bg` | `rgba(36,55,70,0.9)` | Tooltip background |

---

### 20.3 Orange (Primary)

| Token | Hex | Usage |
|---|---|---|
| `Orange / orange-1` | `#FFEDE4` | — |
| `Orange / orange-2` | `#FFDECC` | — |
| `Orange / orange-3` | `#FFBD9C` | Primary button disabled background |
| `Orange / orange-4` | `#FF9B6D` | — |
| `Orange / orange-5` | `#FF773E` | Primary button hovered background |
| `Orange / orange-6` | `#FF4D00` | **Primary brand colour** · Primary button default background |
| `Orange / orange-7` | `#D4380D` | Primary button pressed background |
| `Orange / orange-8` | `#AD2102` | — |
| `Orange / orange-9` | `#871400` | — |
| `Orange / orange-10` | `#610B00` | — |

---

### 20.4 Navy (Secondary)

| Token | Hex | Usage |
|---|---|---|
| `Navy / navy-1` | `#F2F3F4` | Secondary button default background |
| `Navy / navy-2` | `#E5E7E9` | Secondary / tertiary button hovered background |
| `Navy / navy-3` | `#C3C7CC` | Secondary / tertiary button pressed background |
| `Navy / navy-4` | `#8A939D` | — |
| `Navy / navy-5` | `#75808B` | — |
| `Navy / navy-6` | `#616D79` | Icon / button text colour · Secondary / Tertiary button stroke colour |
| `Navy / navy-7` | `#4C5A67` | — |
| `Navy / navy-8` | `#384857` | Widget top-frame background (webapp) · Toolbar background |
| `Navy / navy-9` | `#243746` | **Secondary brand colour** · Drawer nav bg · Bottom tab nav bg (mobile) · Toolbar button pressed bg · Modal top-frame bg |
| `Navy / navy-10` | `#1D2C38` | — |

---

### 20.5 Blue (Interactive)

| Token | Hex | Usage |
|---|---|---|
| `Blue / blue-1` | `#E6F7FF` | Selected background colour |
| `Blue / blue-2` | `#BAE7FF` | — |
| `Blue / blue-3` | `#91D5FF` | Border |
| `Blue / blue-4` | `#69C0FF` | — |
| `Blue / blue-5` | `#40A9FF` | Hover |
| `Blue / blue-6` | `#1890FF` | Normal |
| `Blue / blue-7` | `#096DD9` | Click |
| `Blue / blue-8` | `#0050B3` | — |
| `Blue / blue-9` | `#003A8C` | — |
| `Blue / blue-10` | `#002766` | — |

---

### 20.6 Cyan (Highlight)

| Token | Hex | Usage |
|---|---|---|
| `Cyan / cyan-1` | `#E6FFFB` | — |
| `Cyan / cyan-2` | `#B5F5EC` | — |
| `Cyan / cyan-3` | `#87E8DE` | — |
| `Cyan / cyan-4` | `#5CDBD3` | — |
| `Cyan / cyan-5` | `#36CFC9` | — |
| `Cyan / cyan-6` | `#13C2C2` | Highlight colour |
| `Cyan / cyan-7` | `#08979C` | — |
| `Cyan / cyan-8` | `#006D75` | — |
| `Cyan / cyan-9` | `#00474F` | — |
| `Cyan / cyan-10` | `#002329` | — |

---

### 20.7 Red (Critical)

| Token | Hex | Usage |
|---|---|---|
| `Red / red-1` | `#FFF1F0` | Error background |
| `Red / red-2` | `#FFCCC7` | — |
| `Red / red-3` | `#FFA39E` | Error border |
| `Red / red-4` | `#FF7875` | Error hover |
| `Red / red-5` | `#FF4D4F` | Error normal |
| `Red / red-6` | `#F5222D` | Error click |
| `Red / red-7` | `#CF1322` | — |
| `Red / red-8` | `#A8071A` | — |
| `Red / red-9` | `#820014` | — |
| `Red / red-10` | `#5C0011` | — |

---

### 20.8 Gold (Warning)

| Token | Hex | Usage |
|---|---|---|
| `Gold / gold-1` | `#FFFBE6` | Warning background |
| `Gold / gold-2` | `#FFF1B8` | — |
| `Gold / gold-3` | `#FFE58F` | — |
| `Gold / gold-4` | `#FFD666` | Warning border |
| `Gold / gold-5` | `#FFC53D` | Warning hover |
| `Gold / gold-6` | `#FAAD14` | Warning normal |
| `Gold / gold-7` | `#D48806` | Warning click |
| `Gold / gold-8` | `#AD6800` | — |
| `Gold / gold-9` | `#874D00` | — |
| `Gold / gold-10` | `#613400` | — |

---

### 20.9 Green (Success)

| Token | Hex | Usage |
|---|---|---|
| `Green / green-1` | `#F6FFED` | Success background |
| `Green / green-2` | `#D9F7BE` | — |
| `Green / green-3` | `#B7EB8F` | Success border |
| `Green / green-4` | `#95DE64` | — |
| `Green / green-5` | `#73D13D` | Success hover |
| `Green / green-6` | `#52C41A` | Success normal |
| `Green / green-7` | `#389E0D` | Success click |
| `Green / green-8` | `#237804` | — |
| `Green / green-9` | `#135200` | — |
| `Green / green-10` | `#092B00` | — |

---

### 20.10 Extra

| Token | Hex | Usage |
|---|---|---|
| `Extra / Purple` | `#7E57C5` | Colourful tag background |
| `Extra / Magenta` | `#ED40A9` | — |
| `Extra / Mint` | `#74E0C1` | — |
| `Extra / Teal` | `#008996` | — |
| `Extra / Yellow` | `#FFDD00` | — |
| `Extra / Grey` | `#A7A8A9` | — |

---

### 20.11 Quick-reference — Semantic roles mapped to tokens

| Semantic role | Token | Hex |
|---|---|---|
| Brand / CTA default | `Orange / orange-6` | `#FF4D00` |
| Brand / CTA hover | `Orange / orange-5` | `#FF773E` |
| Brand / CTA pressed | `Orange / orange-7` | `#D4380D` |
| Brand / CTA disabled | `Orange / orange-3` | `#FFBD9C` |
| Nav background | `Navy / navy-9` | `#243746` |
| Toolbar / widget bg | `Navy / navy-8` | `#384857` |
| Button text / icon | `Navy / navy-6` | `#616D79` |
| Btn hover (secondary) | `Navy / navy-2` | `#E5E7E9` |
| Btn pressed (secondary)| `Navy / navy-3` | `#C3C7CC` |
| Btn default (secondary)| `Navy / navy-1` | `#F2F3F4` |
| Interactive normal | `Blue / blue-6` | `#1890FF` |
| Interactive hover | `Blue / blue-5` | `#40A9FF` |
| Interactive click | `Blue / blue-7` | `#096DD9` |
| Selection bg | `Blue / blue-1` | `#E6F7FF` |
| Highlight / teal | `Cyan / cyan-6` | `#13C2C2` |
| Error bg | `Red / red-1` | `#FFF1F0` |
| Error border | `Red / red-3` | `#FFA39E` |
| Error hover | `Red / red-4` | `#FF7875` |
| Error normal | `Red / red-5` | `#FF4D4F` |
| Error click | `Red / red-6` | `#F5222D` |
| Warning bg | `Gold / gold-1` | `#FFFBE6` |
| Warning border | `Gold / gold-4` | `#FFD666` |
| Warning hover | `Gold / gold-5` | `#FFC53D` |
| Warning normal | `Gold / gold-6` | `#FAAD14` |
| Warning click | `Gold / gold-7` | `#D48806` |
| Success bg | `Green / green-1` | `#F6FFED` |
| Success border | `Green / green-3` | `#B7EB8F` |
| Success hover | `Green / green-5` | `#73D13D` |
| Success normal | `Green / green-6` | `#52C41A` |
| Success click | `Green / green-7` | `#389E0D` |
| Page shell bg | `Backgrounds / background-1` | `#F0F2F5` |
| Under-sheet bg | `Backgrounds / background-2` | `#F9FAFB` |
| Component bg | `Backgrounds / white` | `#FFFFFF` |
| Tooltip bg | `Backgrounds / tooltip-bg` | `rgba(36,55,70,0.9)` |
| **Search match highlight** | **`Search Background color`** | **`#FCFE58`** |

---

## 22. Search — Behaviour, Function & Style

This section defines every aspect of the search experience across the Inertia Nexus platform, from field anatomy and interaction states to result filtering logic and inline match highlighting. All future modules must conform to this specification.

---

### 22.1 Token Reference

| Token name | Hex | Usage |
|---|---|---|
| **`Search Background color`** | **`#FCFE58`** | Inline background applied to every matched character sequence inside search results — both card views and table rows |

> This is the **only** colour used to highlight search matches. Do **not** use `#FFFBE6` (Gold-1 / Warning bg) or any other yellow variant for search highlighting.

---

### 22.2 Search Input Field — Anatomy

```
[Search Icon 16×16]  [Placeholder / Value text]  [Clear × icon (conditional)]
  position: absolute, left: 10px, vertically centred, pointer-events: none
  padding-left: 34px (to clear the leading icon)
  padding-right: 34px (when clear icon is visible) / 10px (when field is empty)
  height: 36px  (Medium size tier — matches §16.5)
  border: 1px solid #D0D5DD
  border-radius: 4px
  background: #FFFFFF
  font-family: Open Sans, sans-serif
  font-size: 14px
  font-weight: 400
  line-height: 20px
  color: #344054
  placeholder color: #667085
  transition: border-color 0.15s
```

---

### 22.3 Search Input Field — Interaction States

| State | Border colour | Background | Notes |
|---|---|---|---|
| **Default** | `#D0D5DD` | `#FFFFFF` | Resting state, no user interaction |
| **Hover** | `#A8B0BB` | `#FFFFFF` | Mouse enters field, not yet focused |
| **Active / Focus** | `#91D5FF` (`Blue / blue-3`) | `#FFFFFF` | Field has keyboard focus |
| **Disabled** | `#E0E4E8` | `#F5F5F5` | Non-interactive; text `#BFBFBF` |

> **Never** use `#FF4D00` for the focus border — that colour is reserved for CTA buttons and active sidebar indicators.

---

### 22.4 Clear (×) Icon — Rules

| Property | Value |
|---|---|
| Visibility | Shown **only** when `value.length > 0`; hidden when field is empty |
| Size | `16 × 16px` |
| Icon | `×` SVG path (`M12 4L4 12M4 4l8 8`) |
| Default colour | `#8C8C8C` (`Gray / gray-7`) |
| Hover colour | `#595959` (`Gray / gray-8`) |
| Position | `position: absolute; right: 10px;` vertically centred |
| On click | Clears `value`, returns focus to input |
| Transition | `opacity 0.1s` fade-in/out as value changes |

---

### 22.5 Search Icon

| Property | Value |
|---|---|
| Size | `16 × 16px` |
| Viewbox | `0 0 20 20` |
| Shape | Circle `cx 8.5 cy 8.5 r 6.5` + diagonal line `13.5→18 13.5→18` |
| Stroke | `#9CA4AE`, `strokeWidth 1.5` |
| Position | `position: absolute; left: 10px;` vertically centred, `pointer-events: none` |

---

### 22.6 Search Scope — User Account Landing Page

The search input on the User Account Landing Page filters across **two fields simultaneously**:

| Field | Description |
|---|---|
| **Project Name** | Full text of `project.name` |
| **Project Number** | Full text of `project.projectNumber` |

**Filter logic:**
```ts
const q = searchQuery.toLowerCase();
const match = project.name.toLowerCase().includes(q) ||
              project.projectNumber.toLowerCase().includes(q);
```

- Matching is **case-insensitive** and **substring-based** (not whole-word).
- An empty query returns all projects (no filter applied).
- The filter is applied identically in all three view modes: **Grid**, **List**, and **Map**.
- In Grid and List views, when a query is active, the **"Add new project"** card/row is hidden.
- In Grid/List footer, the count updates to reflect filtered results: `Showing 1–N of N projects`.

---

### 22.7 Inline Match Highlighting — `highlightText()`

When a search query is active, every occurrence of the matched substring is wrapped in a highlighted `<span>` inline within the rendered text. The highlight must appear **only on the matched characters** — not the entire text string.

#### Function signature

```ts
function highlightText(text: string, query: string): React.ReactNode
```

#### Algorithm

```ts
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lowerText.indexOf(lowerQuery, lastIndex);
  while (idx !== -1) {
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(
      <span key={idx} style={{ background: '#FCFE58' }}>
        {text.slice(idx, idx + query.length)}
      </span>
    );
    lastIndex = idx + query.length;
    idx = lowerText.indexOf(lowerQuery, lastIndex);
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
```

#### Highlight span style

| Property | Value |
|---|---|
| `background` | `#FCFE58` (`Search Background color`) |
| `color` | Inherits from parent — no override |
| `padding` | None — background spans only the character glyphs |
| `border-radius` | None |
| `font-weight` | Inherits from parent — no override |

#### Where `highlightText()` is applied

| Surface | Fields highlighted |
|---|---|
| Grid card — Project Name (`<p>` headline) | `project.name` |
| Grid card — Project Number (`<p>` sub-label) | `project.projectNumber` |
| List table — Project Name cell | `project.name` |
| List table — Project Number cell | `project.projectNumber` |

> **Never** apply `highlightText()` to status badges, timestamps, account names, integration icons, or any non-searchable fields.

---

### 22.8 Placeholder Text

| Surface | Placeholder |
|---|---|
| User Account Landing Page | `Search projects by name or number` |
| Users Table (Project Module) | `Search users…` |

---

### 22.9 Usage Rules

1. **`#FCFE58` is the only permitted search highlight colour.** Do not substitute `#FFFBE6`, `#FFDD00`, or any other yellow.
2. **Highlight is inline, not block-level.** Use `<span>` — never `<div>` or `<p>` — so the highlight flows with the text without altering layout.
3. **The highlight wraps matched characters only.** Non-matching characters before, between, and after matches render without any background.
4. **Case-insensitive matching, case-preserving display.** The original casing of the source text is always shown — never transform to upper or lowercase in the highlighted output.
5. **Multiple matches per field are all highlighted.** The `while` loop in `highlightText()` handles repeated occurrences of the query within a single text value.
6. **Empty query = no highlights.** When `searchQuery === ''`, `highlightText()` returns the raw string unchanged — no spans are injected.
7. **Never use `opacity` or `text-shadow` to indicate matches** — always use the `background` property on the match span.
8. **Search is always live / as-you-type.** There is no submit button; results update on every keystroke via controlled state (`onChange → setSearchQuery`).

---

## 23. Hierarchical Table — Edit Mode Action Icons

> **Scope:** This section is the single source of truth for the three row-level action icons rendered in the **Actions column** of every editable hierarchical (tree) table across the platform — including the **Project Roles** table (`roles-table.tsx`), the **Project Reference Data** table (`reference-data-table.tsx`), and any future tree-table module. All three tables must use the identical Figma-sourced SVG paths, button dimensions, and layout values defined here.

---

### 23.1 Canonical Icon Assets

All three action icons are sourced from Figma-exported SVG path modules. **Never substitute hand-coded inline SVG paths** for these — always import and use the Figma asset paths directly.

| Icon | Purpose | SVG module | Path key(s) | Fill colours |
|---|---|---|---|---|
| **AddChild** | Add a child node beneath the current row | `svg-p3h938sv9m` | `p247db800` (body) · `pbf71000` (accent plus) | body `#384857` · accent `#FF6425` |
| **AddSibling** | Add a new sibling node after the current row | `svg-dwr8dix3rb` | `p35a00f00` (body) · `pbf71000` (accent plus) | body `#384857` · accent `#FF6425` |
| **Trash** | Delete the current row | `svg-fjqvq36uqo` | `pc0b2e00` | colour prop (default `#616D79`) |

### 23.2 Icon Component Definitions

```tsx
import trashPaths   from '../../imports/svg-fjqvq36uqo';
import siblingPaths from '../../imports/svg-dwr8dix3rb';
import childPaths   from '../../imports/svg-p3h938sv9m';

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
```

> **`rotate(90deg)` is mandatory on both AddChild and AddSibling.** The Figma paths are drawn in a horizontal orientation; the `rotate(90deg)` CSS transform on the outer `<svg>` element reorients them to their correct vertical-hierarchy visual meaning. Never omit this transform.

---

### 23.3 `IconBtn` — Tertiary Icon Button

The action icons are always wrapped in this `IconBtn` component. It implements the **Tertiary** button style (§15.3) at **Small size** with a fixed square hit zone.

| Property | Value |
|---|---|
| **Width × Height** | `32 × 32px` |
| **Background (default)** | `transparent` |
| **Background (hover)** | `#E5E7E9` (`Navy / navy-2`) |
| **Background (pressed)** | `#616D79` (`Navy / navy-6`) |
| **Border** | `none` (all states) |
| **Border-radius** | `4px` |
| **Cursor** | `pointer` |
| **Transition** | `background 0.15s` |

```tsx
function IconBtn({ onClick, title, children }: {
  onClick: () => void; title?: string; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: pressed ? '#616D79' : hovered ? '#E5E7E9' : 'transparent',
        border: 'none', borderRadius: 4,
        cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.15s', padding: 0,
      }}
    >
      {children}
    </button>
  );
}
```

---

### 23.4 Actions Column Layout

| Property | Value |
|---|---|
| **Column width** | `160px` (fixed, `flexShrink: 0`) |
| **Column header label** | `"Actions"` · `Inter 600 13px #384857` · centred |
| **Row cell layout** | `display: flex; align-items: center; justify-content: center` |
| **Gap between buttons** | `4px` |
| **Horizontal padding** | `8px` left and right |
| **Button order** | AddChild → AddSibling → Trash (left to right) |

> **Child rows** that cannot have further children should **omit the AddChild button** and replace it with an equivalent-width invisible spacer (`<div style={{ width: 32, flexShrink: 0 }} />`) to keep the Sibling and Trash icons horizontally aligned with parent rows.

---

### 23.5 Usage Rules

| ✅ Always | ❌ Never |
|---|---|
| Import icons from `svg-p3h938sv9m`, `svg-dwr8dix3rb`, `svg-fjqvq36uqo` | Hand-code replacement plus/cross SVGs for these three actions |
| Apply `style={{ transform: 'rotate(90deg)' }}` on both AddChild and AddSibling `<svg>` elements | Omit the rotation — the icons will render horizontally (wrong orientation) |
| Use `32 × 32px` for `IconBtn` | Use `28 × 28px` or any other size |
| Use `gap: 4px` between action buttons | Use `gap: 2px` or any smaller value |
| Use `COL_ACTIONS = 160px` | Use `136px` or any narrower width |
| Use body fill `#384857` and accent fill `#FF6425` for AddChild/AddSibling | Use `#FF4D00` (Inertia Orange) for the accent — the correct token is `#FF6425` |
| Use `#616D79` as the default `TrashIcon` fill | Use a red colour for the trash icon in its default idle state |

---

## 24. Authentication Pages — Shell Template

This section is the single source of truth for every **full-screen authentication page** in the Inertia Nexus platform: **Login**, **Company Registration**, and **Account Creation**. All three pages share an identical outer shell; only the card content differs.

---

### 24.1 Page Shell

```
┌──────────────────────────── 100vw × 100vh ─────────────────────────────────┐
│  LEFT PANEL — 652px fixed                │  RIGHT PANEL — flex-1 (breathes) │
│  ┌──────────────────── 480px ─────────┐  │                                   │
│  │  Logo — 254 × 66px                  │  │                                   │
│  │  [24px gap]                          │  │                                   │
│  │  Frosted Glass Card — 480 × 768px   │  │                                   │
│  └──────────────────────────────────── │  │                                   │
└──────────────────────────────────────────────────────────────────────────── ┘
```

#### Page background

| Property | Value |
|---|---|
| **Type** | `conic-gradient` |
| **Value** | `conic-gradient(from 90deg at 50% 50%, #456A88 -49.519%, #345167 -18.346%, #243746 12.826%, #345167 31.654%, #456A88 50.481%, #345167 81.654%, #243746 112.83%)` |
| **Fallback** | `background-color: #243746` (Inertia Navy) |
| **Position** | `position: fixed; inset: 0` |

#### Left panel

| Property | Value |
|---|---|
| **Width** | `652px` fixed (`flexShrink: 0`) |
| **Height** | `100%` |
| **Padding** | `paddingLeft: 86px · paddingRight: 86px · paddingTop: 86px` |
| **Inner width** | `652 − 86 − 86 = 480px` — logo and card both fill this exactly |
| **Layout** | `flex; flexDirection: column; alignItems: center; gap: 24px` |

#### Right panel

| Property | Value |
|---|---|
| **Width** | `flex: 1` — takes all remaining horizontal space |
| **Purpose** | Visual breathing room only; no content |

---

### 24.2 Logo

| Property | Value |
|---|---|
| **Component** | `InertiaLogo` (imported from `../../imports/Inertiafulllogo68`) |
| **Wrapper size** | `254 × 66px` (`flexShrink: 0`) |
| **Click behaviour** | Navigates to User Account Landing Page (`onLogoClick` prop) |
| **Hover effect** | `opacity: 0.75` on `mouseEnter`, `opacity: 1` on `mouseLeave` |
| **Transition** | `opacity 0.15s` |
| **Gap below logo** | `24px` (defined by parent `gap: 24px` — never change this) |

> The `24px` gap between the logo and the frosted glass card is fixed and identical across all auth pages. Never increase or decrease it.

---

### 24.3 Frosted Glass Card

The card is the primary content container for all auth flows.

| Property | Value |
|---|---|
| **Width** | `480px` (`flexShrink: 0`) |
| **Height** | `768px` (fixed — never use `auto` or `min-height`) |
| **Border-radius** | `24px 24px 0 0` — rounded top corners only; card bleeds off the bottom of the viewport |
| **Overflow** | `hidden` — clips all children to the rounded boundary |
| **Background (outer div)** | `rgba(250,250,250,0)` — fully transparent; the glass effect comes from the inner backdrop div |

#### Glass backdrop (absolutely positioned inset layer)

| Property | Value |
|---|---|
| **Position** | `position: absolute; inset: 0` |
| **Background** | `rgba(250,250,250,0.1)` |
| **Backdrop filter** | `blur(20px)` + `-webkit-` prefix |
| **Border** | `1.111px solid rgba(255,255,255,0.12)` |
| **Border-bottom** | `none` — the card bleeds off-screen; no bottom edge |
| **Border-radius** | inherits from parent (`24px 24px 0 0`) |

#### Inner shell (above the backdrop, `position: relative; zIndex: 1`)

The card content lives in a `height: 100%` flex column placed above the glass backdrop:

```
Card inner shell (height: 100%, flex column)
├── Frozen header   (flexShrink: 0)
├── Scrollable body (flex: 1, minHeight: 0, overflowY: auto)
└── Frozen footer   (flexShrink: 0)
```

> **Login page exception:** The login step uses `position: absolute` children (pixel-precise positioning from Figma) rather than the three-zone flex pattern. All other steps (Forgot, OTP, Reset, Success) and all Company/Account registration steps use the three-zone flex pattern.

---

### 24.4 Card — Three-Zone Flex Pattern

Every multi-step form card uses the same three-zone layout so the footer never overlaps content and the CTA button is always anchored to the bottom.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

  {/* ── ZONE 1: Frozen header ── */}
  <div style={{ flexShrink: 0 }}>
    <div style={{ padding: '32px 40px 20px' }}>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 24, lineHeight: '32px', letterSpacing: 0,
        color: '#FFFFFF', margin: 0,
      }}>
        {title}
      </p>
    </div>
    <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
  </div>

  {/* ── ZONE 2: Scrollable body ── */}
  <div style={{
    flex: 1, minHeight: 0,
    overflowY: 'auto', overflowX: 'hidden',
    scrollbarWidth: 'none',
    padding: '20px 40px 0',
    display: 'flex', flexDirection: 'column', gap: 16,
  }}>
    {/* form content */}
  </div>

  {/* ── ZONE 3: Frozen footer ── */}
  <div style={{ flexShrink: 0 }}>
    <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />
    <div style={{
      height: 36,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: 40, paddingRight: 40,
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 400,
        fontSize: 12, lineHeight: '16px', color: 'rgba(255,255,255,0.40)',
      }}>
        ©2025 Inertia Systems, Inc. All Rights Reserved
      </span>
    </div>
  </div>

</div>
```

#### Zone dimensions

| Zone | Height | Notes |
|---|---|---|
| **Header** | Variable — `padding: 32px 40px 20px` gives ~`84px` | `flexShrink: 0` mandatory |
| **Separator line** | `1px` | `background: rgba(255,255,255,0.15)` |
| **Scrollable body** | `flex: 1` (fills remaining space) | `minHeight: 0` mandatory for flex scroll to work |
| **Footer separator** | `1px` | `background: rgba(255,255,255,0.15)` |
| **Footer bar** | `36px` | Copyright text |

#### CTA button pin zone (between scrollable body and footer)

When a step needs its primary action button pinned to the bottom (above the footer), it is placed in its **own** `flexShrink: 0` wrapper after the scrollable body — never inside the scrollable body:

```tsx
{/* ── Pinned CTA zone ── */}
<div style={{ flexShrink: 0, padding: '0 40px 24px' }}>
  {/* Optional: progress bar + countdown — see §24.17 */}
  <button style={{ width: '100%', height: 48, ... }}>Label</button>
</div>
```

| Property | Value |
|---|---|
| **Padding** | `0 40px 24px` — 0 top, 40px sides, 24px bottom |
| **Button width** | `100%` (fills the 400px inner width) |
| **Button height** | `48px` |

---

### 24.5 Card Header Typography

| Property | Value |
|---|---|
| **Font family** | `Inter, sans-serif` |
| **Font size** | `24px` |
| **Font weight** | `600` (SemiBold) |
| **Line height** | `32px` |
| **Letter spacing** | `0px` |
| **Colour** | `#FFFFFF` |
| **Margin** | `0` |
| **Padding** | `32px 40px 20px` (top / horizontal / bottom) |

---

### 24.6 Scrollable Body — Spacing Tokens

| Element | Value |
|---|---|
| **Body padding** | `20px 40px 0` (top / horizontal / bottom) |
| **Gap between form sections** | `16px` (Company/Account reg) |
| **Gap on Login sub-steps** | `24px` |
| **Section separator** | `1px solid rgba(255,255,255,0.12)` — `borderBottom` with `paddingBottom: 12–16px` |
| **`scrollbarWidth`** | `none` — scrollbar always hidden |

---

### 24.7 Typography Inside the Card

All text inside the frosted glass card is white or semi-transparent white. The only exception is input field values and placeholder text, which use dark colours on a white input background.

| Context | Font | Size | Weight | Colour |
|---|---|---|---|---|
| **Card title (header)** | Inter | `24px` | `600` | `#FFFFFF` |
| **Step title (Login sub-steps)** | Outfit | `25px` | `600` | `#FFFFFF` |
| **Step description** | Outfit | `14px` | `400` | `rgba(255,255,255,0.65)` |
| **Form field label** | Inter | `14px` | `600` | `#FFFFFF` |
| **Input value text** | Inter | `14px` | `400` | `#344054` |
| **Input placeholder** | Inter | `14px` | `400` | `#667085` |
| **Helper text** | Open Sans | `12px` | `400` | `rgba(255,255,255,0.45)` |
| **Error text** | Open Sans | `12px` | `400` | `#FF4D4F` |
| **Required asterisk** | — | — | — | `#FFA39E` (Red3) |
| **Body copy** | Inter | `14px` | `400` | `rgba(255,255,255,0.75–0.80)` |
| **User email display** | Outfit | `14px` | `600` | `#FFFFFF` |
| **Links (non-button)** | Inter | `14px` | `400` | `#FF773E` (Orange5) |
| **OTP / verification links** | Inter | `14px` | `500` | `#BAE7FF` (Blue2) |
| **Copyright footer** | Inter | `12px` | `400` | `rgba(255,255,255,0.40)` |
| **Back button label** | Outfit | `14px` | `400` | `rgba(255,255,255,0.5)` → hover `#FFFFFF` |
| **Password criteria label** | Inter | `14px` | `400` | `#FFFFFF` |
| **Success heading** | Inter | `18px` | `600` | `#FFFFFF` |
| **Success body** | Inter | `14px` | `400` | `rgba(255,255,255,0.75)` |
| **Highlight span (e.g. "Blade Verified")** | Inter | `14px` | `600` | `#FF773E` |
| **Address block section label** | Open Sans | `14px` | `600` | `#FFFFFF` |
| **Address field / dropdown value** | Open Sans | `14px` | `400` | `#344054` |

---

### 24.8 Primary CTA Button (Auth Pages)

The orange action button is used on every auth page step. It always spans the full inner width and is pinned to the CTA pin zone (§24.4).

| Property | Value |
|---|---|
| **Width** | `100%` |
| **Height** | `48px` |
| **Border-radius** | `4px` |
| **Font** | `Inter, 14px, weight 400, #FFFFFF` |
| **Default bg** | `#FF4D00` |
| **Hover bg** | `#FF773E` |
| **Pressed bg** | `#D4380D` |
| **Disabled bg** | `#FFBD9C` |
| **Transition** | `background 0.15s` |

> **Login step exception:** The button is `400px` wide × `47.986px` tall (Figma-precise), placed at `position: absolute; top: 377.46px; left: 40px`. On all other steps use `width: 100%; height: 48px`.

---

### 24.9 Form Input Fields (Auth Pages)

Two input variants are used across auth pages:

#### Standard `FormInput` (Company & Account Registration)

| Property | Value |
|---|---|
| **Height** | `44px` |
| **Border-radius** | `8px` |
| **Background (default)** | `#FFFFFF` |
| **Background (error)** | `#FFF1F0` |
| **Border (default)** | `1.111px solid #D0D5DD` |
| **Border (hover)** | `1.111px solid #A8B0BB` |
| **Border (focus)** | `1.111px solid #91D5FF` |
| **Border (error)** | `1.111px solid #FFA39E` |
| **Padding left/right** | `16px` (40px right when eye icon present) |
| **Box shadow** | `0px 1px 2px 0px rgba(16,24,40,0.05)` |
| **Transition** | `border-color 0.15s, background 0.15s` |

#### `GlassInput` (Login sub-steps: Forgot / OTP / Reset)

| Property | Value |
|---|---|
| **Height** | `40px` |
| **Border-radius** | `4px` |
| **Background** | `#FFFFFF` |
| **Border (default)** | `1px solid #9ea2a8` |
| **Border (hover)** | `1px solid #A8B0BB` |
| **Border (focus)** | `1px solid #91D5FF` |
| **Border (error)** | `1px solid #FFA39E` |
| **Padding left/right** | `12px` (40px right when eye icon present) |

#### `LoginFormField` (Login step — Figma-precise absolute layout)

| Property | Value |
|---|---|
| **Outer wrapper** | `position: relative; width: 400px; height: 90.99px` |
| **Input box** | `position: absolute; top: 25px; width: 400px; height: 43.993px` |
| **Border-radius** | `8px` |
| **Background (default)** | `#FFFFFF` |
| **Background (error)** | `#FFF1F0` |
| **Border** | `1.111px solid` — state-driven |
| **Box shadow** | `0px 1px 2px 0px rgba(16,24,40,0.05)` |
| **Helper/error text** | `position: absolute; top: 73.99px` |

#### `AddressField` (plain text inputs in address blocks)

| Property | Value |
|---|---|
| **Height** | `40px` |
| **Border-radius** | `4px` |
| **Background** | `#FFFFFF` |
| **Padding left/right** | `10px` |
| **Font** | `Open Sans, 14px, weight 400, #344054` |
| **Border (default)** | `1.111px solid #D0D5DD` |
| **Border (hover)** | `1.111px solid #A8B0BB` |
| **Border (focus)** | `1.111px solid #91D5FF` |

#### `SelectField` (dropdowns in address blocks)

| Property | Value |
|---|---|
| **Height** | `40px` |
| **Border-radius** | `4px` |
| **Padding left/right** | `11px` |
| **Font** | `Open Sans, 14px, weight 400, #344054` · placeholder `#9EA3A9` |
| **Border** | Same three-state rule as `AddressField` |
| **Dropdown max height** | `200px` with `overflowY: auto` |
| **Dropdown border-radius** | `4px` |
| **Dropdown item bg (hover)** | `#F5F5F5` |
| **Dropdown item bg (selected)** | `#E6F7FF` |
| **Dropdown item font** | `Inter, 14px, weight 400, #384857` |

---

### 24.10 Address Block Layout

The `AddressBlock` component wraps a full postal address sub-form used in Company Registration Steps 1 and 2.

```
[Section label — Open Sans 14px/600 #FFFFFF]
[Country dropdown — SelectField, 40px]
[Address Line 1 — AddressField, 40px]
[Address Line 2 — AddressField, 40px]
[City — AddressField, 40px]
[State/Region — SelectField flex:1] [Zip/Postal — AddressField flex:1]  ← gap: 8px
```

| Property | Value |
|---|---|
| **Gap between fields** | `8px` |
| **Error text** | `Open Sans, 12px, weight 400, #FF4D4F` · `margin: -4px 0 0` |

---

### 24.11 Back Button Variants

#### Compact square (Company & Account Registration)

| Property | Value |
|---|---|
| **Size** | `28 × 28px` |
| **Border-radius** | `6px` |
| **Background (idle)** | `rgba(255,255,255,0.08)` |
| **Background (hover)** | `rgba(255,255,255,0.15)` |
| **Border** | `1px solid rgba(255,255,255,0.20)` |
| **Icon** | Chevron-left `16 × 16px` · stroke `rgba(255,255,255,0.80)` · `strokeWidth 1.5` · `strokeLinecap round` |
| **Transition** | `background 0.15s` |

#### Text link (Login sub-steps)

| Property | Value |
|---|---|
| **Layout** | `flex; alignItems: center; gap: 4px` |
| **Chevron** | `14 × 14px` · stroke: `rgba(255,255,255,0.5)` → `#FFFFFF` on hover |
| **Label font** | `Outfit, 14px, weight 400` |
| **Colour** | `rgba(255,255,255,0.5)` → `#FFFFFF` on hover |

---

### 24.12 Radio Option

Used in Company Registration Step 2 (HQ question) and Step 3 (domain question).

| Property | Value |
|---|---|
| **Circle size** | `18 × 18px` |
| **Border-radius** | `50%` |
| **Checked fill** | `#FF4D00` |
| **Checked border** | `2px solid #FF4D00` |
| **Checked shadow** | `0 0 0 3px rgba(255,77,0,0.18)` |
| **Unchecked fill** | `#FFFFFF` |
| **Unchecked border** | `2px solid #D0D5DD` |
| **Inner dot (checked)** | `6 × 6px` · `border-radius: 50%` · `background: #FFFFFF` |
| **Label font** | `Inter, 14px, weight 400, #FFFFFF` |
| **Gap (circle → label)** | `10px` |
| **Transition** | `background 0.15s, border-color 0.15s` |

---

### 24.13 Password Criteria Row

Used in Login (Reset step) and Account Creation.

| Property | Value |
|---|---|
| **Met icon** | `16 × 16px` filled circle `#00AC2B` + white checkmark (`strokeWidth 1.3, strokeLinecap round`) |
| **Unmet icon** | `16 × 16px` open circle · `fill: white` · `stroke: rgba(255,255,255,0.3)` · `r: 7.5` |
| **Label font** | `Inter, 14px, weight 400, #FFFFFF` |
| **Gap (icon → label)** | `8px` |
| **Gap between rows** | `12px` |
| **Section intro text** | `"A password must include:"` · Inter 14px/400 · `#FFFFFF` |

---

### 24.14 Social Login Buttons (Login page only)

| Property | Value |
|---|---|
| **Size** | `400 × 47.986px` |
| **Background (idle)** | `#F2F4F7` |
| **Background (hover)** | `#E8EAEC` |
| **Border-radius** | `8px` |
| **Font** | `Inter, 14px, weight 400, #344054` |
| **Gap (icon → label)** | `12px` |
| **Transition** | `background 0.15s` |
| **Gap between buttons** | `11.997px` |

#### "Or" divider

| Property | Value |
|---|---|
| **Lines** | `height: 0.99px · background: rgba(255,255,255,0.18) · flex: 1` |
| **Label** | `Zen Kaku Gothic Antique, 12.8px, weight 700, rgba(255,255,255,0.7)` · `padding: 0 16px` |

---

### 24.15 OTP Input Boxes (Login — Reset flow)

| Property | Value |
|---|---|
| **Box size** | `58 × 58px` |
| **Count** | `6` boxes · `gap: 10px` |
| **Border-radius** | `8px` |
| **Background (default)** | `#FFFFFF` |
| **Background (error)** | `#FFF1F0` |
| **Border (default)** | `1.5px solid #D0D5DD` |
| **Border (focus)** | `1.5px solid #BAE7FF` |
| **Border (error)** | `1.5px solid #FFA39E` |
| **Font** | `Inter, 22px, weight 600, #1D2939` |
| **Caret colour** | `#FF4D00` |
| **Box shadow** | `0px 1px 2px rgba(16,24,40,0.05)` |
| **Transition** | `border-color 0.15s` |

---

### 24.16 OTP Countdown Timers (Login)

| Element | Spec |
|---|---|
| **Code expiry** | `10 minutes` (600s) · `MM:SS` format · Inter 14px weight 500 · `#FF773E` valid / `rgba(255,100,100,0.8)` expired |
| **Resend cooldown** | `10 seconds` · badge beside "Didn't get the code?" · Inter 13px weight 700 · `#FF773E` |
| **Resend link (ready)** | `#BAE7FF` (Blue2) · `cursor: pointer` |
| **Resend link (cooling)** | `rgba(186,231,255,0.35)` · `cursor: default` |

---

### 24.17 Auto-Redirect Progress Bar (Verification Steps)

Used on **Company Registration Step 4** and **Account Creation success step**. Always placed in the pinned CTA zone above the action button.

```tsx
{/* Progress bar + countdown label */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', marginBottom: 12 }}>
  <div style={{
    width: '100%', height: 3, borderRadius: 9999,
    background: 'rgba(255,255,255,0.15)', overflow: 'hidden',
  }}>
    <div style={{
      height: '100%', borderRadius: 9999,
      background: '#FF4D00',
      width: `${((10 - seconds) / 10) * 100}%`,
      transition: 'width 1s linear',
    }} />
  </div>
  <span style={{
    fontFamily: 'Inter, sans-serif', fontWeight: 400,
    fontSize: 12, lineHeight: '16px',
    color: 'rgba(255,255,255,0.45)',
  }}>
    Auto-redirecting in {seconds}s…
  </span>
</div>
```

| Property | Value |
|---|---|
| **Track height** | `3px` |
| **Track border-radius** | `9999px` (pill) |
| **Track background** | `rgba(255,255,255,0.15)` |
| **Fill colour** | `#FF4D00` |
| **Fill transition** | `width 1s linear` |
| **Fill formula** | `((10 − remaining) / 10) × 100` |
| **Total duration** | `10 seconds` |
| **Label** | `"Auto-redirecting in {N}s…"` · Inter 12px/400 · `rgba(255,255,255,0.45)` |
| **Gap (bar → label)** | `6px` |
| **Margin below group** | `12px` (before action button) |
| **Button label** | Always **static** — never include the countdown number |

---

### 24.18 Company Registration — Step Summary

| Step | Card title | CTA label | Notes |
|---|---|---|---|
| **1 — Company Details** | `"Company Registration"` | `"Next"` | Company name (required), HQ address (required), Company URL (optional) |
| **2 — HQ Question** | `"Company Registration"` | `"Next"` | Radio: Yes = HQ · No = add office/branch details |
| **3 — Domain Question** | `"Company Registration"` | `"Register Company"` | Radio: same / different domain. Different → URL field required |
| **4 — Success** | `"Company Registration"` | `"Next → Create account"` | ✔ icon · heading · body · progress bar + countdown |

#### Success step specifics (Step 4)

| Property | Value |
|---|---|
| **Icon circle** | `64 × 64px` · `border-radius: 50%` · `background: rgba(82,196,26,0.15)` · `border: 2px solid rgba(82,196,26,0.40)` |
| **Checkmark** | SVG `28 × 28px` · path `M5 12.5L10 17.5L19 8` · stroke `#52C41A` · `strokeWidth 2` · `strokeLinecap round` |
| **Heading** | `"Company created, verification pending"` · Inter 18px/600 · `#FFFFFF` · centred |
| **Body** | Inter 14px/400 · `rgba(255,255,255,0.75)` · centred · "Blade Verified" in `#FF773E` weight 600 |
| **Body layout** | `flex: 1` · `alignItems: center; justifyContent: center` — vertically centred |

---

### 24.19 Account Creation — Step Summary

| Step | Card title | CTA label | Notes |
|---|---|---|---|
| **Form** | `"Create your account"` | `"Create account"` | Office (locked or dropdown), First/Last Name, Password + Confirm, Terms checkbox |
| **Success** | `"Account created"` | `"Redirecting you now …"` | ✔ icon · success text · progress bar + countdown |

#### Company identity row (top of scrollable body)

Separated from form fields by `borderBottom: 1px solid rgba(255,255,255,0.12)` and `paddingBottom: 16px`.

| Property | Value |
|---|---|
| **Avatar size** | `36–40px` · `border-radius: 50%` · `border: 1.5px solid rgba(255,255,255,0.3)` |
| **Company name** | Inter 14px/600 · `#FFFFFF` |
| **Email** | Inter 14px/400 · `rgba(255,255,255,0.60)` |
| **Gap (avatar → text)** | `10–12px` |

#### Terms & Conditions checkbox

| Property | Value |
|---|---|
| **Checked fill** | `#0E70CB` (solid blue) |
| **Unchecked fill** | `rgba(255,255,255,0.15)` |
| **Unchecked stroke** | `rgba(255,255,255,0.4)` |
| **Size** | `18 × 18px` · `border-radius: 2.5px` |
| **Link colour** | `#FF773E` (Orange5) |
| **Error text** | Open Sans 12px/400 · `#FF4D4F` |
| **Error slot** | Fixed `16px` height — prevents layout shift |

---

### 24.20 Login Page — Step Summary

| Step | Layout | CTA label | Notes |
|---|---|---|---|
| **Login** | Absolute-positioned (Figma-precise) | `"Login"` | Email + password, Remember me toggle, Forgot link, Social buttons, Sign-up, legal text |
| **Forgot Password** | Three-zone flex · `gap: 24px` | `"Send Reset Link"` | Email field only |
| **OTP** | Three-zone flex · `gap: 24px` | `"Next"` | 6 OTP boxes, 10-min expiry, 10s resend cooldown |
| **Reset Password** | Three-zone flex · `gap: 24px` | `"Reset password"` | New + Confirm password, criteria rows |
| **Success** | Three-zone flex · `gap: 24px` | `"Continue to login"` | Static — no progress bar |

#### Login step absolute-position coordinates

| Element | `top` | `left` | Size |
|---|---|---|---|
| Card title | `40px` | `40px` via `paddingTop: 40px` | Inter 24px/600 |
| Email + password fields | `106.53px` | `paddingLeft: 40px` | `gap: 15.99px` between |
| Remember me + Forgot row | `325.49px` | `paddingLeft/Right: 40px` | `height: 51.979px` |
| Login button | `377.46px` | `40px` | `400 × 47.986px` |
| "Or" divider | `437.45px` | `paddingLeft/Right: 40px` | `height: 31.181px` |
| Social buttons | `468.63px` | `paddingLeft: 40px` | `gap: 11.997px` |
| "New User?" row | `669.6px` | `0` | `height: 38px` |
| Legal text | `707.6px` | `paddingLeft/Right: 20px` | two `<p>` tags, `gap: 2px` |

#### Remember me toggle

| Property | Value |
|---|---|
| **Track** | `40 × 20px` · `border-radius: 36.5px` |
| **Track on** | `#FF4D00` · no border |
| **Track off** | `#F2F2F2` · `border: 0.5px solid #E5E5E5` |
| **Thumb** | `16 × 16px` · `border-radius: 50%` · `background: #FFFFFF` · `boxShadow: 1px 1px 2px rgba(51,51,51,0.3)` |
| **Thumb left on/off** | `22px` / `2px` |
| **Label** | Inter 14px/400 · `rgba(255,255,255,0.85)` |
| **Transition** | `background 0.2s` (track) · `left 0.2s` (thumb) |

---

### 24.21 Usage Rules

| ✅ Always | ❌ Never |
|---|---|
| Use the conic-gradient for the page background | Use a solid `#243746` fill without the gradient |
| Keep `gap: 24px` between logo and card | Adjust the logo-to-card gap per page |
| Use `height: 768px` for the card | Use `height: auto` or `min-height` |
| Use `border-radius: 24px 24px 0 0` for the card | Round all four corners |
| Set `flexShrink: 0` on the logo wrapper and all frozen zones | Let frozen zones shrink in the flex column |
| Use `scrollbarWidth: none` on the scrollable body | Show a scrollbar inside the card |
| Pin the CTA button in its own `flexShrink: 0` zone — `padding: 0 40px 24px` | Place the CTA button inside the scrollable body |
| Use `Inter` for card titles, form labels, body copy | Use `Open Sans` for card titles or labels |
| Use `Outfit` for step titles and back button text in Login sub-steps | Use `Outfit` for Company/Account Registration card titles |
| Use `Open Sans` only for error messages and address block fields | Mix `Open Sans` into main form labels |
| Keep button labels static on verification/success steps | Include the countdown number inside the button label |
| Use `#FF773E` (Orange5) for all non-button links | Use `#FF4D00` for link text colour |
| Use `#BAE7FF` (Blue2) only for OTP resend / verification links | Use blue for general navigation links |
| Use `1.111px` border width on all `FormInput` fields | Use `1px` on `FormInput` — reserve `1px` for `GlassInput` |

---

## 25. Split Navigator Shell — Page Layout Pattern

> **Name:** Split Navigator Shell  
> **First implemented in:** Role Access Level (`/src/app/components/role-access-level.tsx`)  
> **Also used in:** Teams (`/src/app/components/teams-table.tsx`)  
> **When to use:** Any module where the user picks an item from a grouped list on the left and views/edits its detail on the right. Examples: Roles → Permissions matrix, Teams → Team Composition, Companies → Company Details, Locations → Location detail.

---

### 25.1 Overview

```
┌───────────────────────────────────────── full width ──┐
│  Section Header — 72px (§4.6)                          │  ← white, border-bottom #D9D9D9, padding 0 24px
├───────────────────────────────────────────────────────┤
│  Content Area — flex:1, padding:12px, gap:12px         │  ← white background
│  ┌──── 360px ───────────────┐  ┌──── flex-1 ────────┐  │
│  │ LEFT Navigator Panel     │  │ RIGHT Detail Panel  │  │
│  │ border 1px #D9D9D9       │  │ (no card border)    │  │
│  │ border-radius 8px        │  │                     │  │
│  │ overflow hidden          │  │ ┌─ Toolbar 52px ──┐ │  │
│  │ ┌─ Header strip 48px ──┐ │  │ │ marginBottom 8px│ │  │
│  │ │ bg #FAFAFA            │ │  │ └─────────────────┘ │  │
│  │ │ border-b #F0F0F0      │ │  │ ┌─ Table card ────┐ │  │
│  │ │ Open Sans 13/600      │ │  │ │ flex:1           │ │  │
│  │ └───────────────────────┘ │  │ │ border #D9D9D9   │ │  │
│  │ ┌─ Search 52px ─────────┐ │  │ │ radius 8px       │ │  │
│  │ │ padding 8px 10px       │ │  │ │ ┌─ Hdr 48px ──┐ │ │  │
│  │ │ border-b #E5E7EB       │ │  │ │ │ #FAFAFA      │ │ │  │
│  │ └───────────────────────┘ │  │ │ └──────────────┘ │ │  │
│  │ ┌─ Group hdr 28px ──────┐ │  │ │ Data rows 48px   │ │  │
│  │ │ bg #F5F6F7             │ │  │ │ Pagination 48px  │ │  │
│  │ │ border-b #EEEFF1       │ │  │ └─────────────────┘ │  │
│  │ │ Open Sans 11/600 #8C8C8C uppercase 0.04em │ │  │   │  │
│  │ └───────────────────────┘ │  └────────────────────┘  │
│  │ ┌─ List item 40px ──────┐ │                           │
│  │ │ idle: #FFFFFF          │ │                           │
│  │ │ hover: #F9FAFB         │ │                           │
│  │ │ active: #FFF8F5 +      │ │                           │
│  │ │   3px #FF4D00 left bar │ │                           │
│  │ └───────────────────────┘ │                           │
│  └──────────────────────────┘                            │
└───────────────────────────────────────────────────────┘
```

---

### 25.2 Content Area Wrapper

| Property | Value |
|---|---|
| **Display** | `flex` (row), `flex: 1`, `minHeight: 0`, `overflow: hidden` |
| **Padding** | `12px` (all sides) |
| **Gap** | `12px` (between panels) |
| **Background** | `#FFFFFF` |

---

### 25.3 Left Navigator Panel

| Property | Value |
|---|---|
| **Width** | `360px` fixed (`flexShrink: 0`) |
| **Border** | `1px solid #D9D9D9` |
| **Border-radius** | `8px` |
| **Overflow** | `hidden` |
| **Background** | `#FFFFFF` |

**Panel Header Strip** (`flexShrink: 0`):

| Property | Value |
|---|---|
| Height | `48px` |
| Background | `#FAFAFA` |
| Bottom border | `1px solid #F0F0F0` |
| Padding | `0 8px` |
| Title font | `Open Sans 13px/600 #384857` |
| CTA (optional) | Primary Small §15.1 — `height: 32px` |

**Search Bar Zone** (`flexShrink: 0`):

| Property | Value |
|---|---|
| Padding | `8px 10px` |
| Bottom border | `1px solid #E5E7EB` |
| Background | `#FFFFFF` |

**Group Header Rows**:

| Property | Value |
|---|---|
| Height | `28px` |
| Background | `#F5F6F7` |
| Bottom border | `1px solid #EEEFF1` |
| Padding | `0 16px` |
| Font | `Open Sans 11px/600 #8C8C8C`, `uppercase`, `letter-spacing: 0.04em` |
| Position | `sticky; top: 0; z-index: 1` |

**List Item Rows**:

| State | Background | Border-left | Padding-left | Weight | Colour |
|---|---|---|---|---|---|
| Idle | `#FFFFFF` | `3px solid transparent` | `16px` | `400` | `#262626` |
| Hover | `#F9FAFB` | `3px solid transparent` | `16px` | `400` | `#262626` |
| Active | `#FFF8F5` | `3px solid #FF4D00` | `13px` | `500` | `#1D2939` |

Height `40px` · Bottom border `1px solid #F0F0F0` · Font `Open Sans 13px` · `transition: background 0.1s`

**Scrollable List**: `flex: 1; minHeight: 0; overflowY: auto`

---

### 25.4 Right Detail Panel

| Property | Value |
|---|---|
| **flex** | `1` |
| **minWidth** | `0` |
| **display** | `flex; flex-direction: column` |
| **overflow** | `hidden` |
| **Border** | **none** — the right panel has no card border |

**Detail Toolbar** (sits above the table, NOT inside the card):

| Property | Value |
|---|---|
| Height | `52px` (`flexShrink: 0`) |
| Layout | `flex; align-items: center; justify-content: space-between` |
| Padding-left | `4px` |
| Padding-right | `0` |
| Margin-bottom | `8px` |

**Table Container Card** (`flex: 1; minHeight: 0`):

| Property | Value |
|---|---|
| Border | `1px solid #D9D9D9` |
| Border-radius | `8px` |
| Overflow | `hidden` |
| Background | `#FFFFFF` |
| Sticky header | `48px`, `#FAFAFA`, `border-bottom: 1px solid #F0F0F0`, `z-index: 20` — §7.A |
| Data rows | Normal density `48px`, `border-bottom: 1px solid #F0F0F0` |
| Pagination | `48px`, `border-top: 1px solid #F0F0F0` |

---

### 25.5 Usage Rules

| ✅ Always | ❌ Never |
|---|---|
| `padding: 12px` + `gap: 12px` on the content area wrapper | Let panels touch edge-to-edge with no gap |
| Left Panel: `border: 1px solid #D9D9D9` + `border-radius: 8px` | Use `border-right` only on the left panel (loses the card radius) |
| Table Container inside Right Panel: `border: 1px solid #D9D9D9` + `border-radius: 8px` | Give the Right Panel wrapper itself a card border |
| Detail Toolbar outside the table card with `marginBottom: 8px` | Put the toolbar inside the table card |
| Left panel header: `Open Sans 13px/600 #384857`, padding `0 8px` | Use `Inter 16px` or wider padding (`0 12px`) for the panel header |
| Group headers: `#F5F6F7` bg, `#EEEFF1` border, `#8C8C8C uppercase 0.04em` | Use `#F5F5F5` bg or `#616D79` text for group headers |
| Active item: `#FFF8F5` bg + `3px solid #FF4D00` left border + `padding-left: 13px` | Use 2px or 2.2px left border, or `#FFF3EE` background |
| Left panel exactly `360px` wide | Use 280px, 320px, or any other width |
| Detail Toolbar exactly `52px` high | Use `60px` (that is the Section Header height — different component) |