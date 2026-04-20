# Inertia Nexus — Foundations

> Part of the Inertia Nexus Design System. See [`guide.md`](./guide.md) for global rules and document map.

---

## 1. Brand Identity

| Token | Value |
|---|---|
| **Product name** | Inertia Nexus |
| **Brand accent** | `#FF4D00` (Inertia Orange) |
| **Primary surface** | `#243746` (Inertia Dark Navy) |
| **Logotype** | SVG mark (flame/angular paths) rendered in `#FF4D00` and `#BFBFBF` |

The Inertia Nexus mark is composed of five SVG `<path>` elements — two orange (`#FF4D00`) and three grey (`#BFBFBF`). Always render it at **28 × 35 px** in the top-nav. Never alter the fill colours.

**SVG sources:** `svg-fynbzyrtwq` + `svg-o83jhbud1k`

---

## 2. Colour Tokens

### 2.1 Core Brand Colours

| Name | Hex | Usage |
|---|---|---|
| Inertia Orange | `#FF4D00` | Active states, accents, CTA buttons, active sidebar indicator |
| Inertia Navy | `#243746` | Top nav bar, sidebar background |
| Navy Hover | `#2D4255` | Sidebar nav item hover, app-launcher button hover |
| Navy Active | `#384857` | Active nav item, collapse button strip |

### 2.2 Neutral / Surface Colours

| Name | Hex | Usage |
|---|---|---|
| Page Background | `#F2F3F4` | Main content area background (alias of `background-1`) |
| White | `#FFFFFF` | Cards, modals, table background |
| Light Grey | `#FAFAFA` | Empty-state / canvas background |
| Border | `#D9D9D9` | Horizontal section dividers |
| Input Background | `#F3F3F5` | Form input fills (toolbar-embedded only) |
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

Status pairs are fixed — never mix background and text from different status states.

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

### 2.7 Team Badge Palette

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

### 2.8 Background Tokens

Semantic background tokens used across layout surfaces. Always prefer these named tokens over raw hex values.

| Token | Hex | Usage |
|---|---|---|
| `Backgrounds / white` | `#FFFFFF` | Component background — cards, modals, table rows, input fills |
| `Backgrounds / background-1` | `#F0F2F5` | Layout / Page background — main content shell behind white panels |
| `Backgrounds / background-2` | `#F9FAFB` | Under-sheet background — empty states, canvas areas, secondary panels |
| `Backgrounds / tooltip-bg` | `rgba(36,55,70,0.9)` | Tooltip background — reserved exclusively for tooltips |
| `Search Background color` | `#FCFE58` | Search match highlight — inline background on matched characters |

**Usage rules:**
- `white` is the default surface for all interactive components. Never substitute `#F9FAFB` or `#F0F2F5` here.
- `background-1` (`#F0F2F5`) is the outer page shell. Treat `#F2F3F4` as its alias.
- `background-2` (`#F9FAFB`) is one level below `background-1` — for empty-state canvases and secondary panel insets.
- `tooltip-bg` is reserved exclusively for tooltips.

---

## 3. Full Colour Scale

### 3.1 Gray (Neutral)

| Token | Hex | Usage |
|---|---|---|
| `Gray / gray-1` | `#FFFFFF` | White text |
| `Gray / gray-2` | `#FAFAFA` | Table header |
| `Gray / gray-3` | `#F5F5F5` | Background |
| `Gray / gray-4` | `#F0F0F0` | Divider |
| `Gray / gray-5` | `#D9D9D9` | Border |
| `Gray / gray-6` | `#BFBFBF` | Disabled |
| `Gray / gray-7` | `#8C8C8C` | Secondary text / placeholder / caption |
| `Gray / gray-8` | `#595959` | — |
| `Gray / gray-9` | `#434343` | — |
| `Gray / gray-10` | `#262626` | Title / Primary Text |

### 3.2 Orange (Primary)

| Token | Hex | Usage |
|---|---|---|
| `Orange / orange-1` | `#FFEDE4` | — |
| `Orange / orange-2` | `#FFDECC` | — |
| `Orange / orange-3` | `#FFBD9C` | Primary button disabled background |
| `Orange / orange-4` | `#FF9B6D` | — |
| `Orange / orange-5` | `#FF773E` | Primary button hover background |
| `Orange / orange-6` | `#FF4D00` | **Primary brand colour** · Primary button default |
| `Orange / orange-7` | `#D4380D` | Primary button pressed background |
| `Orange / orange-8` | `#AD2102` | — |
| `Orange / orange-9` | `#871400` | — |
| `Orange / orange-10` | `#610B00` | — |

### 3.3 Navy (Secondary)

| Token | Hex | Usage |
|---|---|---|
| `Navy / navy-1` | `#F2F3F4` | Secondary button default background |
| `Navy / navy-2` | `#E5E7E9` | Secondary / tertiary button hover background |
| `Navy / navy-3` | `#C3C7CC` | Secondary / tertiary button pressed background |
| `Navy / navy-4` | `#8A939D` | — |
| `Navy / navy-5` | `#75808B` | — |
| `Navy / navy-6` | `#616D79` | Icon / button text colour · Secondary / Tertiary stroke |
| `Navy / navy-7` | `#4C5A67` | — |
| `Navy / navy-8` | `#384857` | Widget / toolbar background |
| `Navy / navy-9` | `#243746` | **Secondary brand colour** · Nav bg · Modal top-frame bg |
| `Navy / navy-10` | `#1D2C38` | — |

### 3.4 Blue (Interactive)

| Token | Hex | Usage |
|---|---|---|
| `Blue / blue-1` | `#E6F7FF` | Selected background |
| `Blue / blue-2` | `#BAE7FF` | — |
| `Blue / blue-3` | `#91D5FF` | Input focus border |
| `Blue / blue-4` | `#69C0FF` | — |
| `Blue / blue-5` | `#40A9FF` | Hover |
| `Blue / blue-6` | `#1890FF` | Normal |
| `Blue / blue-7` | `#096DD9` | Click |
| `Blue / blue-8` | `#0050B3` | — |
| `Blue / blue-9` | `#003A8C` | — |
| `Blue / blue-10` | `#002766` | — |

### 3.5 Red (Critical)

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

### 3.6 Gold (Warning)

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

### 3.7 Green (Success)

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

### 3.8 Cyan (Highlight)

| Token | Hex | Usage |
|---|---|---|
| `Cyan / cyan-6` | `#13C2C2` | Highlight colour |
| *(other steps omitted — not semantically assigned)* | | |

### 3.9 Extra

| Token | Hex | Usage |
|---|---|---|
| `Extra / Purple` | `#7E57C5` | Colourful tag background |
| `Extra / Magenta` | `#ED40A9` | — |
| `Extra / Mint` | `#74E0C1` | — |
| `Extra / Teal` | `#008996` | — |
| `Extra / Yellow` | `#FFDD00` | — |
| `Extra / Grey` | `#A7A8A9` | — |

### 3.10 Semantic Role Quick-Reference

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
| Btn pressed (secondary) | `Navy / navy-3` | `#C3C7CC` |
| Btn default (secondary) | `Navy / navy-1` | `#F2F3F4` |
| Interactive normal | `Blue / blue-6` | `#1890FF` |
| Interactive hover | `Blue / blue-5` | `#40A9FF` |
| Interactive click | `Blue / blue-7` | `#096DD9` |
| Input focus border | `Blue / blue-3` | `#91D5FF` |
| Selection bg | `Blue / blue-1` | `#E6F7FF` |
| Error bg | `Red / red-1` | `#FFF1F0` |
| Error border | `Red / red-3` | `#FFA39E` |
| Error normal | `Red / red-5` | `#FF4D4F` |
| Warning bg | `Gold / gold-1` | `#FFFBE6` |
| Warning normal | `Gold / gold-6` | `#FAAD14` |
| Success bg | `Green / green-1` | `#F6FFED` |
| Success normal | `Green / green-6` | `#52C41A` |
| Page shell bg | `Backgrounds / background-1` | `#F0F2F5` |
| Under-sheet bg | `Backgrounds / background-2` | `#F9FAFB` |
| Component bg | `Backgrounds / white` | `#FFFFFF` |
| Tooltip bg | `Backgrounds / tooltip-bg` | `rgba(36,55,70,0.9)` |
| Search match highlight | `Search Background color` | `#FCFE58` |

---

## 4. Typography

### 4.1 Font Stack

| Font | Role | Import |
|---|---|---|
| **Open Sans** | Global UI font — body copy, nav, table cells, sidebar labels | Google Fonts, weights 300/400/500/600/700/800 |
| **Inter** | Button labels, modal headings, module card labels, confirmation dialogs | Google Fonts, weights 400/500/600/700 |
| **Roboto** | Loaded as fallback | — |
| **Outfit** | Loaded as fallback | — |

### 4.2 Type Scale (UI Contexts)

| Context | Size | Weight | Font | Notes |
|---|---|---|---|---|
| Page title (h1) | 36px | `700` | Open Sans | Users, Roles, etc. section headings |
| Sidebar label | 14px | `400` inactive / `700` active | Open Sans | — |
| Nav active indicator | 14px | `700` | Open Sans | colour `#F0F0F0` |
| Table header | 13px | `600` | Open Sans | Measured via canvas for column width |
| Table cell | 13–14px | `400` | Open Sans | — |
| Status badge | 11px | `500` | Open Sans | Pill shape |
| Module card label | 11px / `14px` line-height | `400` | Inter | 2-line clamp |
| Modal heading | 16px | `600` | Inter | — |
| Modal body | 13px | `400` | Inter | — |
| Toast title | 14px | `600` | Open Sans | — |
| Toast message | 13px | `400` | Open Sans | — |
| Button text | varies by size tier | `400` | Inter | See components/buttons.md |

### 4.3 Letter Spacing Exceptions

| Context | Tracking |
|---|---|
| Top-nav project title | `−0.4px` |
| Sidebar nav labels | `−0.28px` |

All other contexts: `0px` letter spacing. Do not add custom tracking unless specified here.

### 4.4 Design System Type Tokens

All tokens use **Inter** as the primary font. Token names map directly to Figma text styles.

| Style | Token | Size | Weight | Line Height | Notes |
|---|---|---|---|---|---|
| DisplayXLarge | `text-style-display-x-large` | `38px` | `700` | `44px` | Largest display heading |
| DisplayLarge | `text-style-display-large` | `30px` | `700` | `34px` | — |
| DisplayMedium | `text-style-display-medium` | `24px` | `600` | `32px` | — |
| DisplaySmall | `text-style-display-small` | `20px` | `400` | `28px` | — |
| PageHeading | `text-style-page-heading` | `18px` | `700` | `26px` | Page-level section titles |
| Heading | `text-style-heading` | `16px` | `600` | `24px` | Modal headings, card titles |
| Subheading | `text-style-subheading` | `12px` | `600` | `16px` | Always UPPERCASE — section labels |
| Label | `text-style-body-small` | `14px` | `600` | `20px` | Semibold variant of BodySmall |
| BodyLarge | `text-style-body-large` | `16px` | `400` | `20px` | — |
| BodySmall | `text-style-body-small` | `14px` | `400` | `20px` | Most common UI text size |
| CaptionLarge | `text-style-caption-large` | `12px` | `400` | `16px` | Metadata, timestamps, helper text |
| CaptionSmall | `text-style-caption-small` | `10px` | `400` | `14px` | Smallest text level |

**Colour variants per token:**

| Variant | Colour | Usage |
|---|---|---|
| Default | `#262626` (`Gray / gray-10`) | Primary text on white/light surfaces |
| Subdued | `#595959` (`Gray / gray-8`) | Secondary / supporting text |
| Disabled | `#BFBFBF` (`Gray / gray-6`) | Disabled state (Body and Caption only) |

**Usage notes:**
- Display styles are for hero text and large numeric callouts. Use sparingly.
- Subheading is always `UPPERCASE` — never apply it in mixed or lowercase.
- Label = Semibold variant of BodySmall — use for form field labels and table column headers.
- Letter spacing is `0px` across all tokens — see §4.3 for the only exceptions.

---

## 5. Spacing Scale

| Usage | Value |
|---|---|
| Nav item horizontal padding | `16px` |
| Content page horizontal padding | `48px` |
| Content page top padding | `24px` |
| Card / panel inner padding | `12px` |
| Icon gap from label (sidebar) | `12px` |
| Icon gap from label (top-nav) | `16px` |
| Modal inner padding | `24px` |
| Button group gap | `8px` |
| Table cell padding | `6px` left/right |
| Section divider margin | `8px` top, `4px` bottom |

---

## 6. Elevation (Shadows)

| Surface | Shadow |
|---|---|
| Modal | `0 20px 50px rgba(0,0,0,0.25)` |
| Module Selector panel | `0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)` |
| Sticky actions column | `−1px 0 0 0 #E5E7EB, −4px 0 10px rgba(0,0,0,0.06)` |
| Top nav | none — `box-shadow: none` by design |

---

## 7. Icon Rules

### 7.1 Stroke Weight

All SVG icon strokes use `strokeWidth="1.5"` throughout the UI. Never deviate unless a specific icon definition overrides it.
`strokeLinecap` is `"round"` or `"square"` as defined per icon.

### 7.2 Icon Sizes by Context

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

### 7.3 Icon Colour Rules

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

### 7.4 Key Icon Components

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

### 7.5 Avatars

**User list avatars (table rows):**
- Size: 32 × 32px, `border-radius: 50%`
- Initials (first + last initial), background cycles through 10 colours keyed by `user.id % 10`:

```
#3B5998 / #E4405F / #2D8653 / #9B59B6 / #E67E22
#1ABC9C / #E74C3C / #34495E / #16A085 / #8E44AD
```

**Personal Info Panel avatars:**
- Size: larger (panel-specific)
- Palette (6 entries, cycles by `id % 6`):

```
#DDE9FF / #465FFF
#E6F4EA / #1E7E34
#FFF3E0 / #E65100
#FCE4EC / #C62828
#E8EAF6 / #3949AB
#E0F7FA / #006064
```
