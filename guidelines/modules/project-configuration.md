# Project Configuration Module

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules.
> Navigation chrome is specified in [`../patterns/navigation.md`](../patterns/navigation.md).

---

## 1. Overview

The Project Configuration Module is the primary shell of the Inertia Nexus web app. It provides the top navigation bar, sidebar navigation, and the main content area into which all sub-module views are rendered.

**File:** `App.tsx` (shell, TopNav, Sidebar, MainContent)
**Routes:** `routes.ts` via `createBrowserRouter`

---

## 2. View Routing

The `currentView` state in `App.tsx` routes between views:

| View key | Trigger | Description |
|---|---|---|
| `'user-account-landing'` | App launch default, clicking Inertia Blade logo, clicking "Cleveland Hospital" dropdown | User Account Landing Page — project picker |
| `'home'` | Clicking a project card on the landing page | Project Home view |
| *(module views)* | Clicking sidebar nav items | Users, Roles, Teams, etc. |

---

## 3. Content Page Structure

```
Page
├── Title Row — px: 48px, pt: 24px, pb: 8px, border-bottom: 1px solid #D9D9D9
│   └── h1 — 36px bold #1D2C38
└── Content Body — flex-1, min-h-0, p: 12px
    └── Module content (table, cards, etc.)
```

---

## 4. Module Selector — Registered Modules

The Module Selector grid (App Launcher) contains:

**Main modules (9 items, rows of 5):**
- Project Home
- Documents
- BIM
- Field
- Quality
- Safety
- Estimating
- Schedule
- Project Configuration ← current module

**Divider**

**Bottom modules:**
- Project Connectors
- Project Settings

---

## 5. Sidebar Navigation Items

| ID | Label | Icon component |
|---|---|---|
| `users` | Users | `UserSingleIcon` |
| `roles` | Roles | `UserKeyIcon` |
| `companies` | Companies | *(company icon)* |
| `teams` | Teams | `UserGroupIcon` |
| `permissions` | Permissions | `UserKeyIcon` |
| `lbs` | LBS | `LayersIcon` |

Active sidebar nav item:
- Icon renders in `#FF4D00`
- Label bold `#F0F0F0`
- `bg #384857` + `4px` left orange bar

---

## 6. SVG Assets

| Asset | Source | Usage |
|---|---|---|
| Primary icon set | `svg-fynbzyrtwq.ts` | Sidebar icons, nav utility icons |
| Secondary icon set | `svg-o83jhbud1k.ts` | Brand logo secondary paths |
| Additional sets | `svg-0vjjjbc447.ts`, `svg-l6fn2d072u.ts`, `svg-01ga0z05le.ts`, `svg-0ey0n29ml8.ts`, `svg-yjrzoufxgw.ts`, `svg-2lc95mvujv.ts` | Module-specific icons and assets |
