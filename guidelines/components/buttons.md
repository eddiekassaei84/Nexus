# Buttons

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.

---

## Shared Anatomy

All button variants share this content structure:

```
[Leading Icon] [Label] [Trailing Chevron]
  gap: 4px between every item
  border-radius: 4px
  font: Inter — weight and size vary by tier
  white-space: nowrap
  transition: background 0.15s
```

- Use **Inter**, not Open Sans, for all button labels.
- Never use `opacity` to fake a disabled state — always use the literal disabled colour token.
- Icon strokes always match the text colour for the current state.

---

## Shared Size Scale

Icon size **and** height both change across sizes. Font size and line-height vary by size tier; padding, border-radius, and gap are identical across all variants.

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `16px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `16px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `16px` | `20 × 20px` | `16px` | `22px` | `4px` |

> Segmented Buttons use a different size scale — see §5.

---

## 1. Primary CTA

**Figma source:** `Primary Default / Hover / Pressed / Disabled`

### States

| State | Background | Text | Cursor |
|---|---|---|---|
| **Default** | `#FF4D00` | `#FFFFFF` | `pointer` |
| **Hover** | `#FF773E` | `#FFFFFF` | `pointer` |
| **Pressed / Active** | `#D4380D` | `#FFFFFF` | `pointer` |
| **Disabled** | `#FFBD9C` | `#FFFFFF` | `not-allowed` |

### Do / Don't

- ✅ Use `#FF773E` on hover, `#D4380D` on press/active.
- ❌ Never use `#FF4D00` as the hover colour.
- ❌ Never use `opacity` to fake the disabled state — use `#FFBD9C` background.
- ✅ Icon strokes are `white` in all states.

---

## 2. Primary CTA — Dark Surface Variant

**Figma source:** `Primary Default / Hover / Pressed / Focused / Disabled — Dark mode`

Use this variant when placing a Primary action on a **dark surface** (top nav `#243746`, sidebar `#384857`, or any `Navy / navy-8–9` background). The button is transparent at rest; it only gains a fill on interaction.

### States

| State | Background | Text / Icon | Cursor |
|---|---|---|---|
| **Default** | `transparent` | `#FFFFFF` | `pointer` |
| **Hover** | `#4C5A67` | `#FFFFFF` | `pointer` |
| **Pressed / Active** | `#75808B` | `#FFFFFF` | `pointer` |
| **Focused** | `#384857` | `#FFFFFF` | `pointer` |
| **Disabled** | `transparent` | `#BFBFBF` | `not-allowed` |

### Do / Don't

- ✅ Only use on dark surfaces — on white/light surfaces always use the standard Primary CTA.
- ❌ Never add a visible fill in the default rest state.
- ❌ Never use `opacity` to fake disabled — use `transparent` bg + `#BFBFBF` text/icons.
- ✅ Hover and Pressed use progressively lighter navy fills, consistent with the sidebar interaction pattern.

---

## 3. Secondary

**Figma source:** `Secondary Default / Hover / Pressed / Focused / Disabled`

### States

| State | Background | Border | Text / Icon | Cursor |
|---|---|---|---|---|
| **Default** | `#F2F3F4` | `1px solid #C3C7CC` | `#616D79` | `pointer` |
| **Hover** | `#E5E7E9` | `1px solid #616D79` | `#616D79` | `pointer` |
| **Pressed / Active** | `#616D79` | `1px solid #616D79` | `#FFFFFF` | `pointer` |
| **Focused** | `#C3C7CC` | `1px solid #616D79` | `#616D79` | `pointer` |
| **Disabled** | `#F5F5F5` | `1px solid #BFBFBF` | `#BFBFBF` | `not-allowed` |

### Do / Don't

- ❌ Never use `white` or `#F9FAFB` as the default background — use `#F2F3F4`.
- ❌ Never use `opacity` to fake disabled — use `#F5F5F5` bg + `#BFBFBF` border and text.
- ✅ Border colour transitions from `#C3C7CC` (default) to `#616D79` (hover/pressed/focused).
- ✅ Icon/chevron strokes match text colour in every state (`white` only in Pressed).

---

## 4. Tertiary

**Figma source:** `Tertiary Default / Hover / Pressed / Focused / Disabled`

### States

| State | Background | Border | Text / Icon | Cursor |
|---|---|---|---|---|
| **Default** | `transparent` | none | `#616D79` | `pointer` |
| **Hover** | `#E5E7E9` | none | `#616D79` | `pointer` |
| **Pressed / Active** | `#616D79` | none | `#FFFFFF` | `pointer` |
| **Focused** | `#C3C7CC` | none | `#616D79` | `pointer` |
| **Disabled** | `transparent` | none | `#BFBFBF` | `not-allowed` |

### Do / Don't

- ✅ Key distinction from Secondary: Tertiary has **no border in any state**.
- ✅ Key distinction from Ghost: Tertiary carries a text label; Ghost buttons are icon-only.
- ❌ Never show a `1px` border on hover or focus.
- ❌ Never use `opacity` for disabled — use `transparent` bg + `#BFBFBF` text/icons.

---

## 5. Ghost / Icon

Used for icon-only or situational utility actions, especially on dark nav surfaces.

```
bg: transparent
border: none
icon-only or icon+label
hover: bg #F5F6F7  (light surfaces)
       bg #2D4255  (dark nav surfaces)
```

---

## 6. Destructive

Used for irreversible actions (delete, remove).

```
bg: #D92D20
text: white
border-radius: 4px
disabled: opacity-40  (exception — opacity is permitted here)
```

---

## 7. Segmented Buttons (Button Group)

**Figma source:** `Segmented Buttons Group` · Style: Secondary · Layout: Grouped · Size: Medium
**SVG paths:** `/src/imports/svg-779tf3jmb0.ts`

### Anatomy

The group is a flat flex row of 2 or more segments. No wrapping container background or border — borders live on each segment.

```
display: flex
align-items: center
```

Each segment:

```
[Leading Icon] [Label] [Trailing Chevron-down]
  gap: 4px
  horizontal padding: 12px each side
  content overflow: clip
```

### States

| State | Background | Border colour | Border sides | Text / Icon |
|---|---|---|---|---|
| **Active / Selected** | `#616D79` | `#616D79` | left + top + bottom (no right) | `#FFFFFF` |
| **Inactive** | `#F2F3F4` | `#C3C7CC` | left + top + bottom (no right, except last = all 4) | `#616D79` |

**Border joining rule:**
- Every segment except the last renders only `border-left + border-top + border-bottom`. The next segment's left border acts as the shared divider.
- The **last segment** renders all four borders.
- Active segment border colour matches its background, making it visually flush.

**Corner rounding:**
- First segment: `border-radius: 4px 0 0 4px`
- Middle segment(s): no border-radius
- Last segment: `border-radius: 0 4px 4px 0`

### Size Scale

| Size | Height | H. Padding | Icon | Font size | Line height | Gap |
|---|---|---|---|---|---|---|
| **Small** | `32px` | `12px` | `16 × 16px` | `16px` | `22px` | `4px` |
| **Medium** | `36px` | `12px` | `18 × 18px` | `14px` | `20px` | `4px` |
| **Large** | `40px` | `12px` | `20 × 20px` | `16px` | `22px` | `4px` |

### Typography

| Property | Value |
|---|---|
| Font family | `Inter` |
| Font weight | `400` (Regular) |
| Active colour | `#FFFFFF` |
| Inactive colour | `#616D79` |
| White-space | `nowrap` |

### Hover

| Surface | Hover background |
|---|---|
| Active segment | no change (already filled `#616D79`) |
| Inactive segment | `#E8EAEC` |

Apply `transition: background 0.15s` on each segment.

### Do / Don't

- ✅ Always render as a connected group — minimum 2, maximum 5 segments.
- ✅ Use for mutually exclusive view/mode selections (Card / Table / Map).
- ❌ Never use `#FF4D00` as the active fill — this component uses `#616D79` exclusively.
- ❌ Never use an individual segmented button in isolation.
