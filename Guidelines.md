# Inertia Nexus — Component Pattern Library

> Companion to the main Design System Guidelines. Each section here documents a **reusable interaction pattern** that has been built and tested in production. Reference by name when asking for implementation in new modules.

---

## 0. Universal UI Text Rules

### 0.1 Em Dash Prohibition

**Rule:** The em dash character (`—`, U+2014) is **never permitted in any UI-facing text string** anywhere in the platform.

| ✅ Always | ❌ Never |
|---|---|
| Use a comma, period, or natural sentence break to separate clauses | Use `—` as a separator in helper text, labels, tooltips, placeholders, or any visible string |
| `"Decimal degrees, range 0° to 90°, up to 6 decimal places."` | `"Decimal degrees — range 0° to 90° — up to 6 decimal places"` |
| `"Read only. Cannot be edited."` | `"Read only — cannot be edited"` |

This rule applies to:
- Helper / hint text below form fields
- Placeholder text inside inputs
- Tooltip content
- Table cell values
- Status labels and badges
- Error messages
- Empty-state copy
- Any other string rendered in the DOM

> **Why:** Em dashes can render inconsistently across fonts and operating systems, and they conflict with the platform's Open Sans / Inter typographic rhythm. They also reduce readability in dense UI contexts.

---

## 26. Inline Error Expansion

**Canonical implementation:** `lbs-table.tsx`  
**Also implemented in:** `roles-table.tsx`  
**Status:** Platform standard — apply to every editable table that has in-row edit mode.

---

### 26.1 What It Is

A table-row validation pattern for **dense, in-row edit mode** where there is no space below an input to render a static error label without disrupting surrounding rows. When a field fails validation, the row **grows taller** to accommodate an inline error message rendered directly beneath the offending input — without shifting siblings, overlapping content, or requiring a tooltip.

**The name to use when requesting this pattern:** *"Inline Error Expansion"*

---

### 26.2 Visual States

| State | Row height | Input border | Input background | Icon inside field | Message below input |
|---|---|---|---|---|---|
| **Valid (edit mode)** | `EDIT_ROW_H_BASE` | `#D0D5DD` idle / `#91D5FF` focus | `#FFFFFF` | — | — |
| **Error** | `EDIT_ROW_H_ERROR` | `#FFA39E` idle / `#FF4D4F` focus | `#FFF1F0` | ⚠ red filled circle (right edge) | `Open Sans 11px #FF4D4F`, clipped at row boundary |

---

### 26.3 Height Constants

Each table defines its own pair. Always use named constants — never hard-code raw pixel values.

| Table | `EDIT_ROW_H_BASE` | `EDIT_ROW_H_ERROR` | Expansion |
|---|---|---|---|
| LBS Primary (`lbs-table.tsx`) | `44px` | `56px` | +12px |
| Vertical Zones (`lbs-table.tsx`) | `48px` | `60px` | +12px |
| Roles (`roles-table.tsx`) | `48px` | `62px` | +14px |

**Formula:** `EDIT_ROW_H_ERROR = EDIT_ROW_H_BASE + error_message_zone`  
Error message zone = message line-height (14px) + top gap (2px) = **+14px minimum** (use 12px when inputs are 30px, 14px when inputs are 32px).

---

### 26.4 The Five Layers

**Layer 1 — Global validation engine (`computeEditErrors` / `validateItems`)**  
A pure function that walks the entire edit dataset and returns a single `Map<string, string>` keyed as `"{rowId}_{fieldKey}"`. Called on every change (or on first save attempt) — never stores local error state per field.

**Layer 2 — Row height switch (`rowHasError`)**  
Per row, check whether any of that row's keys exist in the error map:
```ts
const rowHasError = editErrors.has(`${rowId}_name`) || editErrors.has(`${rowId}_code`);
const currentRowH = rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
```
Growth is **downward-only**: inputs stay top-aligned at the same visual position they'd occupy when centred in the base-height row (achieved via `cellPadTop`).

**Layer 3 — Cell alignment cascade (`cellAlign` + `cellPadTop`)**  
When a row grows, **every cell** in that row switches alignment so all inputs share the same horizontal baseline:
```ts
const cellAlign  = rowHasError ? 'flex-start' as const : 'center' as const;
const cellPadTop = rowHasError ? Math.floor((EDIT_ROW_H_BASE - INPUT_H) / 2) : 0;
// e.g. LBS: (44-30)/2 = 7   Roles: (48-32)/2 = 8
```

**Layer 4 — `EditInput` component**  
A `position: relative` wrapper div containing:
- The `<input>` element (full-width inside wrapper, `height: INPUT_H`)
- A red ⚠ icon (`position: absolute; right: 8; top: 50%`) — visible whenever `error === true`
- The error message text (`position: absolute; top: INPUT_H + 2px`) — visible whenever `error && errorMessage`

The cell div must have `overflow: visible` and `position: relative; zIndex: 2` when erroring, so the absolute-positioned message can bleed into the row's extra height zone without clipping.

**Layer 5 — `ValidationBanner`**  
A `36px` strip (`#FFF1F0` background / `1px solid #FFA39E` border-bottom) rendered above all data rows during edit mode. Shows the total error count across the entire dataset. Acts as a persistent signal for errors on rows scrolled out of view.

---

### 26.5 `EditInput` — Canonical Implementation

```tsx
function EditInput({ value, onChange, placeholder, error, errorMessage }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  error?: boolean; errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const borderColor = error
    ? (focused ? '#FF4D4F' : '#FFA39E')
    : (focused ? '#91D5FF' : hovering ? '#A8B0BB' : '#D0D5DD');

  return (
    <div
      style={{ flex: 1, minWidth: 0, position: 'relative', height: INPUT_H }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', height: INPUT_H,
          paddingLeft: 8, paddingRight: error ? 28 : 8,
          border: `1px solid ${borderColor}`, borderRadius: 4,
          fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: 400,
          color: '#344054', background: error ? '#FFF1F0' : '#FFFFFF',
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.15s, background 0.15s',
        }}
      />
      {/* Error icon — always visible when field has an error */}
      {error && (
        <div style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4D4F" />
            <path d="M7 3.5v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="white" />
          </svg>
        </div>
      )}
      {/* Error message — always visible when error (row has expanded to accommodate it) */}
      {error && errorMessage && (
        <div style={{
          position: 'absolute', top: INPUT_H + 2, left: 0, right: 0, zIndex: 10,
          fontFamily: 'Open Sans, sans-serif', fontSize: 11, color: '#FF4D4F',
          lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis', pointerEvents: 'none',
        }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
```

---

### 26.6 Row Render Pattern

```tsx
// Compute per-row before JSX
const rowHasError = editErrors.has(`${id}_name`) || editErrors.has(`${id}_code`);
const currentRowH = rowHasError ? EDIT_ROW_H_ERROR : EDIT_ROW_H_BASE;
const cellAlign   = rowHasError ? 'flex-start' as const : 'center' as const;
const cellPadTop  = rowHasError ? CELL_PAD_TOP : 0;  // (BASE - INPUT_H) / 2

// Row wrapper — height switches, all other styles unchanged
<div style={{ display: 'flex', alignItems: 'stretch', height: currentRowH, ... }}>

  {/* Cell with erroring EditInput — overflow: visible so message bleeds down */}
  <div style={{
    width: COL_W, flexShrink: 0,
    display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop,
    paddingLeft: 8, paddingRight: 8,
    overflow: rowHasError ? 'visible' : 'hidden',
    position: 'relative', zIndex: rowHasError ? 2 : undefined,
  }}>
    <EditInput error={editErrors.has(`${id}_name`)} errorMessage={editErrors.get(`${id}_name`)} ... />
  </div>

  {/* Cell without errors — same alignment cascade, keep overflow: hidden */}
  <div style={{
    flex: 1, minWidth: 0,
    display: 'flex', alignItems: cellAlign, paddingTop: cellPadTop,
    paddingLeft: 8, paddingRight: 8, overflow: 'hidden',
  }}>
    <EditInput ... /> {/* no error props */}
  </div>

</div>
```

---

### 26.7 `ValidationBanner` — Canonical Implementation

```tsx
function ValidationBanner({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 16px', height: 36, flexShrink: 0,
      background: '#FFF1F0', borderBottom: '1px solid #FFA39E',
    }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 7v4M10 13.5v.5" stroke="#D92D20" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M8.485 2.929L1.393 15.5A1.75 1.75 0 002.908 18h14.184a1.75 1.75 0 001.515-2.5L11.515 2.929a1.75 1.75 0 00-3.03 0Z"
          stroke="#D92D20" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 400,
        lineHeight: '20px', color: '#B91C1C',
      }}>
        {count} validation {count === 1 ? 'error' : 'errors'} — hover the highlighted fields for details.
      </span>
    </div>
  );
}
```

---

### 26.8 Timing — When Errors Activate

**One standard strategy — post-save-attempt:**

```ts
const [showErrors, setShowErrors] = useState(false);  // gate

const allErrors  = useMemo(
  () => editMode ? validateFn(editItems) : new Map<string, string>(),
  [editItems, editMode]
);
const editErrors = showErrors ? allErrors : new Map<string, string>();

function enterEdit()  { ...;  setShowErrors(false); }
function cancelEdit() { ...;  setShowErrors(false); }
function saveEdit() {
  const errs = validateFn(editItems);
  if (errs.size > 0) { setShowErrors(true); return; }  // reveal errors, block save
  ...commit...; setShowErrors(false);
}
```

- `allErrors` is **always live** (useMemo tracks every keystroke) — the map is ready instantly when Save is clicked.
- `editErrors` is **gated** — nothing shows until the user clicks Save at least once.
- After `showErrors` becomes `true`, fixing a field clears its error key in real time (because `allErrors` recomputes on every `editItems` change).
- **Never use a `Set<string>` to track invalid rows.** Only `Map<string, string>` with `{id}_{fieldName}` keys is permitted — it scales to multiple fields per row without any changes to the row render or alignment cascade.
- **Never clear errors manually on field change** (e.g. `setNameErrors(prev => { prev.delete(id); return prev; })`). The `useMemo` does this automatically.

#### Table constants required

```ts
const EDIT_ROW_H_BASE  = N;   // same as view-mode ROW_H
const EDIT_ROW_H_ERROR = N + 12;  // or + 14 depending on input height — see §26.3
```

#### Validate function signature (mandatory)

```ts
function validateFoo(items: FooItem[]): Map<string, string> {
  const errors = new Map<string, string>();
  for (const item of items) {
    if (!item.name.trim()) errors.set(`${item.id}_name`, 'Name is required');
    // add more field checks here — never split across multiple functions
  }
  return errors;
}
```

---

### 26.9 Usage Rules

| ✅ Always | ❌ Never |
|---|---|
| Use named constants `EDIT_ROW_H_BASE` / `EDIT_ROW_H_ERROR` | Hard-code `56` or `62` inline in the JSX |
| Apply `cellAlign` + `cellPadTop` to **every cell** in the row | Apply alignment change only to the erroring cell — other cells would desync |
| Set `overflow: visible` + `position: relative; zIndex: 2` on cells containing an erroring `EditInput` | Leave `overflow: hidden` on erroring cells — the message gets clipped |
| Keep `overflow: hidden` on non-erroring cells (description, actions) | Make all cells `overflow: visible` — unnecessary and causes paint issues |
| Use `Open Sans 11px #FF4D4F` for the error message text | Use `Inter` or any size larger than `11px` for inline error text |
| Keep the `ValidationBanner` at `36px` above the table rows | Show the banner inside the scrollable area (it must stay visible when rows scroll) |
| Expand rows **downward only** (inputs stay top-anchored with `cellPadTop`) | Expand rows upward or re-centre inputs after expansion |
| Show the error icon inside the field at all times when `error === true` | Show the icon only on hover or focus — it must be immediately visible |
