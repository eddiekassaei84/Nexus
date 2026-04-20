# Search — Behaviour, Function & Style

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules.
> Search input field dimensions and states follow the spec in [`../components/inputs.md`](../components/inputs.md).

All future modules must conform to this specification.

---

## 1. Token Reference

| Token | Hex | Usage |
|---|---|---|
| `Search Background color` | `#FCFE58` | Inline background on every matched character sequence in search results |

> This is the **only** colour used to highlight search matches. Do not use `#FFFBE6` (Gold-1 / Warning bg) or any other yellow variant.

---

## 2. Search Input Field — Anatomy

```
[Search Icon 16×16]  [Placeholder / Value text]  [Clear × icon (conditional)]
  Search icon: position absolute, left: 10px, vertically centred, pointer-events: none
  padding-left: 34px  (to clear the leading icon)
  padding-right: 34px (when clear icon visible) / 10px (when empty)
  height: 36px  (Medium size tier)
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

## 3. Search Icon Spec

| Property | Value |
|---|---|
| Size | `16 × 16px` |
| Viewbox | `0 0 20 20` |
| Shape | Circle `cx 8.5 cy 8.5 r 6.5` + diagonal line `13.5→18 13.5→18` |
| Stroke | `#9CA4AE`, `strokeWidth 1.5` |
| Position | `position: absolute; left: 10px;` vertically centred |
| pointer-events | `none` |

---

## 4. Interaction States

| State | Border colour | Background | Notes |
|---|---|---|---|
| **Default** | `#D0D5DD` | `#FFFFFF` | Resting state |
| **Hover** | `#A8B0BB` | `#FFFFFF` | Mouse enters, not yet focused |
| **Active / Focus** | `#91D5FF` (`Blue / blue-3`) | `#FFFFFF` | Keyboard focus |
| **Disabled** | `#E0E4E8` | `#F5F5F5` | Non-interactive; text `#BFBFBF` |

> Never use `#FF4D00` for the focus border.

---

## 5. Clear (×) Icon

| Property | Value |
|---|---|
| Visibility | Shown **only** when `value.length > 0` |
| Size | `16 × 16px` |
| Icon | `×` SVG path (`M12 4L4 12M4 4l8 8`) |
| Default colour | `#8C8C8C` (`Gray / gray-7`) |
| Hover colour | `#595959` (`Gray / gray-8`) |
| Position | `position: absolute; right: 10px;` vertically centred |
| On click | Clears value, returns focus to input |
| Transition | `opacity 0.1s` |

---

## 6. Filter Logic

Search is **always live / as-you-type**. There is no submit button — results update on every keystroke via controlled state (`onChange → setSearchQuery`).

**General rules:**
- Matching is **case-insensitive** and **substring-based** (not whole-word).
- An empty query returns all results — no filter applied.
- The filter applies identically regardless of the current view mode (Grid, List, Map, etc.).

**Per-surface scope:**

| Surface | Searchable fields |
|---|---|
| User Account Landing Page | `project.name`, `project.projectNumber` |
| Users Table (Project Module) | user name, email |

**Example filter logic:**
```ts
const q = searchQuery.toLowerCase();
const match = project.name.toLowerCase().includes(q) ||
              project.projectNumber.toLowerCase().includes(q);
```

**Add new card/row:** Hidden in Grid and List views when a query is active.

**Result count footer:** Updates to reflect filtered results: `Showing 1–N of N results`.

---

## 7. Inline Match Highlighting — `highlightText()`

When a query is active, every occurrence of the matched substring is wrapped in a `<span>` with `background: #FCFE58`. Only the matched characters are highlighted — not the full text string.

### Function Signature

```ts
function highlightText(text: string, query: string): React.ReactNode
```

### Algorithm

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

### Highlight Span Style

| Property | Value |
|---|---|
| `background` | `#FCFE58` |
| `color` | Inherits from parent — no override |
| `padding` | None |
| `border-radius` | None |
| `font-weight` | Inherits from parent — no override |

### Where `highlightText()` Is Applied

| Surface | Fields highlighted |
|---|---|
| Grid card — Project Name | `project.name` |
| Grid card — Project Number | `project.projectNumber` |
| List table — Project Name cell | `project.name` |
| List table — Project Number cell | `project.projectNumber` |

---

## 8. Placeholder Text by Surface

| Surface | Placeholder |
|---|---|
| User Account Landing Page | `Search projects by name or number` |
| Users Table (Project Module) | `Search users…` |

---

## 9. Do / Don't

- ✅ `#FCFE58` is the **only** permitted search highlight colour.
- ✅ Use `<span>` for highlight — never `<div>` or `<p>`.
- ✅ Highlight wraps matched characters only. Non-matching characters render without any background.
- ✅ Case-insensitive matching, case-preserving display — always show the original casing.
- ✅ All occurrences of the query within a single value are highlighted (the `while` loop handles this).
- ✅ Empty query = no highlights, raw string returned unchanged.
- ❌ Never use `#FFFBE6`, `#FFDD00`, or any other yellow as the highlight colour.
- ❌ Never use `opacity` or `text-shadow` to indicate matches.
- ❌ Never apply `highlightText()` to status badges, timestamps, account names, integration icons, or any non-searchable field.
