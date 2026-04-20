# Filtering — Filter Panel

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## 1. Overview

The Filter Panel is a resizable floating panel triggered by the Filter button in the table toolbar. It allows users to narrow table results by multiple criteria simultaneously.

**File:** `/src/app/components/filter-panel.tsx`

---

## 2. Visual Spec

| Property | Value |
|---|---|
| Default size | `460 × 590px` |
| Min size | `360 × 340px` |
| Resizable | Yes — via `re-resizable` package |
| Position | `fixed`, rendered via `createPortal` into `document.body` |
| z-index | `9999` |
| Background | `#FFFFFF` |
| Border | `1px solid #E0E4E8` |

---

## 3. Filter Fields

The following fields are supported. Each field is independently configurable:

| Field | Input type |
|---|---|
| Company | Multi-select |
| Office | Multi-select |
| Email Domain | Multi-select |
| Status | Multi-select |
| Permission Type | Multi-select |
| User Type | Multi-select |
| Access Level | Multi-select |

Each field stores its chosen values in an array within `FilterConfig.filters`.

---

## 4. Filter Field Behaviour

- **Multi-select:** Multiple values can be selected per field. All selected values act as OR within a field; AND across fields.
- **Visibility toggle:** Each field can be individually shown or hidden within the panel.
- **Active filter count:** The number of fields with at least one selected value is shown as an orange badge (`#FF4D00`) on the toolbar Filter button.

---

## 5. Toolbar Filter Button States

| State | Style |
|---|---|
| **Default (no filters active)** | Standard Secondary button style |
| **Active (filter panel open)** | Secondary Pressed style: `bg #616D79`, `border #616D79`, `color #FFFFFF` + orange count badge |
| **Filters applied (panel closed)** | Standard Secondary style + orange count badge |

---

## 6. Implementation Notes

- Must use `createPortal` into `document.body` — the panel must not be clipped by the table's stacking context.
- Position using `position: fixed` with `top` / `left` values derived from the trigger button's bounding rect.
- Use `re-resizable` for drag-to-resize — do not use `react-resizable`.
- `FilterConfig.filters` is a record of field key → `string[]` of selected values.

---

## 7. Do / Don't

- ✅ Always use `createPortal` so the panel can appear above the sticky table header.
- ✅ Always reflect the active filter count on the toolbar button badge.
- ✅ Apply the Secondary Pressed style to the Filter button while the panel is open.
- ❌ Never render the panel inside the table container or sidebar — it must be fixed-position via a portal.
- ❌ Never apply a filter without updating the count badge.
