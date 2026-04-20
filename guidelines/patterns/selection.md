# Selection — Checkboxes & Selection Action Bar

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## 1. Checkbox States

Used in table rows and list views to select one or more items.

| State | Fill | Border |
|---|---|---|
| **Checked** | `#0E70CB` (solid) | — |
| **Indeterminate** | `#0E70CB` (solid) + white dash | — |
| **Unchecked** | `#FFFFFF` | `#D0D5DD` |
| **Unchecked hover** | `#F0F7FF` | `#0E70CB` |

### Do / Don't

- ✅ Use `#0E70CB` consistently for checked and indeterminate states.
- ✅ Always show a white dash on the indeterminate fill to visually distinguish it from fully-checked.
- ❌ Never use `#FF4D00` for checkbox states — orange is reserved for CTAs and active nav indicators.

---

## 2. Selection Action Bar

**File:** `/src/app/components/selection-action-bar.tsx`

Appears at the bottom of the screen when one or more table rows are selected via checkboxes.

### Visual Spec

| Property | Value |
|---|---|
| Position | `fixed`, full-width, above the table pagination |
| z-index | Within `500–600` range (above content, below modals) |
| Background | White or dark surface — follows module theme |
| Content | "{N} users selected" label + action buttons |

### Action Buttons

Standard actions (left to right):

1. **Resend invite** — Secondary style
2. **Suspend** — Secondary style
3. **Delete** — Destructive style (`bg #D92D20`, white text)

Clicking **Delete** triggers the Delete Confirmation Modal (see [`../components/modals.md`](../components/modals.md)).

### Behaviour

| Condition | Result |
|---|---|
| 0 rows selected | Bar is hidden |
| 1+ rows selected | Bar appears with count and action buttons |
| All rows deselected | Bar disappears |
| Delete confirmed | Bar dismisses after operation completes |

### Do / Don't

- ✅ Always show the count of selected items: "{N} users selected".
- ✅ The Delete action must route through the Delete Confirmation Modal — never delete directly.
- ❌ Never show the bar when 0 items are selected.
- ❌ Never place the bar inside the table scroll container — it must be fixed-position.
