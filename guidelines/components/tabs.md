# Tab Groups

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## 1. Overview

Tab groups are horizontal navigation bars used to switch between views or content sections within a module. Two style variants exist:

| Variant | Active indicator | Use case |
|---|---|---|
| **Primary** | `#FF4D00` (Inertia Orange) | Main module-level tabs |
| **Secondary** | `#243746` (Inertia Navy) | Nested or sub-section tabs |

**Figma sources:** `PrimaryTabsGroup` · `SecondaryTabsGroup`
**SVG paths:** `/src/imports/svg-sbstuck9i.ts` (Primary) · `/src/imports/svg-zi8xz2231c.ts` (Secondary)

---

## 2. Container

```
display: flex
align-items: center
border-bottom: 1px solid #D9D9D9   ← spans full tab bar width — always present
```

Tabs are inline — no wrapping container background or fill.

---

## 3. Tab Item Anatomy

Each tab item is a vertical flex column containing two children:

```
display: flex
flex-direction: column
align-items: center
height: [varies by size tier — see §6]
```

1. **Tab Name row** — horizontal flex row
2. **Highlight bar** — 2px tall full-width strip

### Tab Name Row

```
[Leading Icon] [Label] [Trailing Close ×]
  gap: 8px between every item
  horizontal padding: 16px each side
  align-items: center
```

| Slot | Detail |
|---|---|
| **Leading icon** | Context icon at the size-tier's icon size |
| **Label** | Inter, 14px, 20px line-height — `600` SemiBold when active, `400` Regular when inactive |
| **Trailing close ×** | Same size as leading icon. Rendered as `+` glyph rotated 45°, `stroke #243746`, `strokeWidth 1.5`, `strokeLinecap square` |

Both icon slots use `overflow: clip` and `color: #243746` in all states.

---

## 4. Highlight Bar

```
height: 2px
width: 100%
```

| Variant | Active colour | Inactive colour |
|---|---|---|
| **Primary** | `#FF4D00` | transparent |
| **Secondary** | `#243746` | transparent |

The bar is `2px` — never increase its height.

---

## 5. States

| State | Label weight | Label colour | Highlight bar |
|---|---|---|---|
| **Active** | `600` (SemiBold) | `#243746` | Visible — variant colour |
| **Inactive** | `400` (Regular) | `#243746` | Transparent / hidden |
| **Hover** | `400` (Regular) | `#243746` | Transparent (no change) |

> Label colour is `#243746` in both active and inactive states. The only visual difference is label weight and the presence of the highlight bar.

---

## 6. Size Scale

| Size | Tab height | H. Padding | Icon size | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `14px` | `20px` | `8px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `8px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `14px` | `20px` | `8px` |
| **XL** | `48px` | `16px` | `24 × 24px` | `18px` | `26px` | `8px` |

---

## 7. Typography

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

## 8. Do / Don't

- ✅ Always include the bottom border (`1px solid #D9D9D9`) spanning the full tab bar width.
- ✅ Only one tab can be active at a time within a group.
- ✅ Use **Primary** (orange) for top-level module navigation tabs.
- ✅ Use **Secondary** (navy) for nested or sub-section tabs.
- ✅ Tab items grow horizontally to fit content — no fixed width.
- ❌ Never wrap tab labels — always `white-space: nowrap`.
- ❌ Never increase the highlight bar beyond `2px`.
- ❌ Never omit the bottom border, even when no tab is active.
