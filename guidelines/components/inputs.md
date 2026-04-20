# Field Inputs

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## 1. Overview

Input fields share the same size scale as buttons — height, horizontal padding, font size, and line-height are identical per tier. The only dimension that differs from buttons is border-radius, which uses `4px` for all input sizes to maintain a consistent rectangular shape.

---

## 2. Anatomy

```
[Leading Icon (optional)]  [Value / Placeholder text]  [Clear × icon (conditional)]
  left padding: 10px  (without leading icon)
                36px  (with leading icon)
  right padding: 10px (without clear icon)
                 34px (with clear icon visible)
  icon and text vertically centred
  border: 1px solid
  border-radius: 4px
  background: #FFFFFF (default) | #F3F3F5 (toolbar / embedded)
  transition: border-color 0.15s
```

---

## 3. States

| State | Border colour | Background | Text colour | Placeholder colour |
|---|---|---|---|---|
| **Default** | `#D0D5DD` | `#FFFFFF` | `#344054` | `#667085` |
| **Hover** | `#A8B0BB` | `#FFFFFF` | `#344054` | `#667085` |
| **Active / Focus** | `#91D5FF` (`Blue / blue-3`) | `#FFFFFF` | `#344054` | `#667085` |
| **Disabled** | `#E0E4E8` | `#F5F5F5` | `#BFBFBF` | `#BFBFBF` |
| **Error** | `#FFA39E` (`Red / red-3`) | `#FFFFFF` | `#344054` | `#667085` |

> **Active / Focus rule:** When the field receives focus, the border immediately switches to `#91D5FF` (Blue / blue-3). Never use `#FF4D00` for input focus — that colour is reserved for CTA buttons and active sidebar indicators.

---

## 4. Clear (×) Icon

Appears inside the field on the right edge whenever the field has one or more characters. Disappears when empty.

| Property | Value |
|---|---|
| Visibility | Shown **only** when `value.length > 0` |
| Size | `16 × 16px` (Small / Medium) · `18 × 18px` (Large) |
| Icon | `×` SVG path (`M12 4L4 12M4 4l8 8`) |
| Default colour | `#8C8C8C` (`Gray / gray-7`) |
| Hover colour | `#595959` (`Gray / gray-8`) |
| Position | `position: absolute; right: 10px;` vertically centred |
| On click | Clears field value and returns focus to input |
| Transition | `opacity 0.1s` — fades in/out as value changes |

---

## 5. Size Scale

Font size and line-height remain constant across all input sizes — only height and icon size change.

| Size | Height | H. Padding | Font size | Line height | Icon size | Border-radius |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `10px` | `14px` | `20px` | `16 × 16px` | `4px` |
| **Medium** | `36px` | `10px` | `14px` | `20px` | `16 × 16px` | `4px` |
| **Large** | `40px` | `12px` | `14px` | `20px` | `18 × 18px` | `4px` |

---

## 6. Typography

| Property | Value |
|---|---|
| Font family | `Open Sans` |
| Font size | `14px` (all sizes) |
| Line height | `20px` (all sizes) |
| Font weight | `400` (Regular) |
| Value colour | `#344054` |
| Placeholder colour | `#667085` |

---

## 7. Search Input Variant

Search inputs follow the same field spec with these specifics:

| Property | Value |
|---|---|
| Leading icon | SearchIcon — 16 × 16px, `stroke #9CA4AE`, `strokeWidth 1.5` |
| Leading icon position | `position: absolute; left: 10px;` vertically centred, `pointer-events: none` |
| padding-left (with icon) | `34px` |
| Height (default) | `36px` (Medium tier) |
| Background | `#FFFFFF` |

For full search behaviour and highlight logic, see [`../patterns/search.md`](../patterns/search.md).

---

## 8. Do / Don't

- ✅ Always use `Blue / blue-3` (`#91D5FF`) for the active/focus border.
- ✅ Render the clear `×` icon **only** when `value.length > 0`. Never show it on an empty field.
- ✅ When a leading search icon is present, set `padding-left: 34–36px` to accommodate it.
- ❌ Never use `border-radius: 46px` (pill shape) for standard form inputs — pill shape is reserved for status badges.
- ❌ Never use `#FF4D00` as a focus colour on inputs.
- ✅ Prefer `background: #FFFFFF` for standalone form fields; use `#F3F3F5` only for inputs embedded inside toolbars or dark-chrome surfaces.
