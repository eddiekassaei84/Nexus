# Inertia Nexus — Design System Root Guide

> **Version:** 1.0 · **Last Updated:** March 2026
> This is the single source of truth for building any module or app within the Inertia Nexus platform. Start here, then follow the document map to the relevant spec file.

---

## 1. Design Philosophy

1. **Dark chrome, light content.** Navigation and chrome use Inertia Navy (`#243746`). Content areas are white or near-white. Never use dark navy as a content background.

2. **Orange is sacred.** `#FF4D00` is used exclusively for: active states, CTAs, the 4px sidebar indicator, the active app launcher icon, and the brand logo. Never use it for error states or informational colour.

3. **No dividers in the header.** The top nav has `box-shadow: none` and `border-bottom: none` by design.

4. **Always portal floating elements.** Any element that must appear above a sticky header must use `createPortal` into `document.body`.

5. **Sidebar is a first-class navigation element.** It is always visible (expanded or collapsed). Never hide the sidebar completely.

6. **Status is always a pill badge.** Never use plain text for user status — always use the `StatusBadge` component with its defined colour tokens.

7. **1.5px stroke weight.** All SVG icon strokes use `strokeWidth="1.5"` and `strokeLinecap="round"` or `"square"` as defined per icon. Never deviate.

8. **Consistent hover states.** On dark surfaces: hover = `#2D4255`. On white surfaces: hover = `#F9FAFB` or `#F5F6F7`. Interactive elements always have `transition-colors` applied.

9. **Open Sans is the UI font.** Use Inter only for modal headings, button labels, and module card labels. Never mix other fonts into the UI chrome.

10. **Resizable columns, not fixed.** Table columns are flex-fill by default and resizable by the user. Min-widths are calculated from the measured text label width + padding budget.

---

## 2. Global Rules

- **Never** use `opacity` to fake a disabled state on any component — always use the literal disabled colour tokens.
- **Never** use `#FF4D00` for input focus rings — that colour is reserved for CTAs and active sidebar indicators. Use `#91D5FF` (Blue / blue-3) for all input focus borders.
- **Never** use pill shape (`border-radius: 46px`) for standard form inputs — pill shape is reserved for status badges only.
- **Never** use `text-shadow` or `opacity` to indicate search matches — always use the `background` property with `#FCFE58`.
- **Never** hard-code raw hex values when a named token exists — always reference the token name from `foundations.md`.
- **Never** apply `highlightText()` to status badges, timestamps, account names, or any non-searchable field.
- **Always** use `white-space: nowrap` on button labels, tab labels, and nav items.
- **Always** apply `transition-colors` (or equivalent `transition`) to every interactive element.
- **Always** use `createPortal` for floating panels that must escape stacking contexts (Module Selector, Filter Panel, Toast).

---

## 3. Token Usage Principles

- Reference tokens by their **named scale** (e.g. `Orange / orange-6`, `Navy / navy-9`) rather than raw hex values in documentation and code comments.
- Background surfaces follow a strict hierarchy: `white` → `background-1` → `background-2`. Never swap levels.
- `tooltip-bg` (`rgba(36,55,70,0.9)`) is reserved **exclusively** for tooltips. Do not use it on any other surface.
- `#FCFE58` is the **only** permitted search highlight colour. Do not substitute any other yellow.
- Status semantic colours (Active, Suspended, Pending, Expired) are fixed pairs — never mix background and text from different status states.

---

## 4. Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Component files | kebab-case | `users-table.tsx`, `filter-panel.tsx` |
| Component names | PascalCase | `UsersTable`, `FilterPanel` |
| SVG import modules | `svg-{hash}.ts` | `svg-fynbzyrtwq.ts` |
| Drag type tokens | SCREAMING_SNAKE | `ADD_MODAL_AVAIL_USER` |
| CSS custom properties | `--token-name` | `--color-orange-6` |
| Route paths | kebab-case | `/project-configuration` |
| State variables | camelCase | `sidebarExpanded`, `activeNav` |

---

## 5. Accessibility Baseline

- All interactive elements must be reachable by keyboard (`Tab`, `Enter`, `Space`, `Escape`).
- `Escape` closes all modals, drawers, and floating panels.
- Focus returns to the trigger element when a modal or panel is closed.
- Icon-only buttons must have an `aria-label` or a visually hidden `<span>` for screen readers.
- Colour alone must never be the sole means of conveying state — always pair colour with shape, weight, or text.
- Minimum touch target size: `36 × 36px` (aligns with Medium button height).
- Status badges include both a coloured dot and a text label — never dot-only.

---

## 6. Implementation Guardrails

### Technical Stack

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

### z-index Layering

| Layer | z-index |
|---|---|
| Sticky table header | 20 |
| Sticky actions column | 4–16 |
| Modals / overlays | 500–600 |
| Toast stack | 9000 |
| Module Selector / Filter Panel | 9999 |

### Portal Convention

Any floating panel that must escape a stacking context (sticky table header, transformed containers) **must** use `createPortal(…, document.body)`. Position using `position: fixed` with explicit `top` / `left` pixel values derived from `anchorTop` / `anchorLeft` props.

### Font Loading

Font imports live **exclusively** in `/src/styles/fonts.css`. Do not add `@import` statements in any other CSS file.

The global font is set in `theme.css`:
```css
*, *::before, *::after {
  font-family: 'Open Sans', sans-serif;
}
```

### Styling Notes

Some base components may have gap/typography baked in as defaults. Always **explicitly set** any styling from the guidelines in generated React to override those defaults.

---

## 7. File Organisation

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

## 8. Document Map

| What you need | Go to |
|---|---|
| Brand colours, type scale, spacing, icon rules | [`foundations.md`](./foundations.md) |
| Button variants and states | [`components/buttons.md`](./components/buttons.md) |
| Input fields | [`components/inputs.md`](./components/inputs.md) |
| Table structure, sort, grouping, pagination | [`components/tables.md`](./components/tables.md) |
| Tab groups and segmented buttons | [`components/tabs.md`](./components/tabs.md) |
| Modals, toasts, overlays | [`components/modals.md`](./components/modals.md) |
| Search behaviour and highlight logic | [`patterns/search.md`](./patterns/search.md) |
| Top nav, sidebar, module selector | [`patterns/navigation.md`](./patterns/navigation.md) |
| Selection action bar, checkboxes | [`patterns/selection.md`](./patterns/selection.md) |
| Filter panel | [`patterns/filtering.md`](./patterns/filtering.md) |
| Project Configuration module layout | [`modules/project-configuration.md`](./modules/project-configuration.md) |
| Users module — table, panels, modals | [`modules/users.md`](./modules/users.md) |
