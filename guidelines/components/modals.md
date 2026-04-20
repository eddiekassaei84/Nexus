# Modals, Overlays & Toasts

> Part of the Inertia Nexus Design System. See [`../guide.md`](../guide.md) for global rules and [`../foundations.md`](../foundations.md) for colour tokens.
> For module-specific modals (Add User, Invite, Import, Export), see [`../modules/users.md`](../modules/users.md).

---

## 1. Backdrop

All modals share the same backdrop:

```css
position: fixed;
inset: 0;
z-index: 500+;
background: rgba(0,0,0,0.35);
display: flex;
align-items: center;
justify-content: center;
```

- Click on backdrop closes modal (unless a destructive confirmation requires typed input).
- Pressing `Escape` always closes the modal.
- Focus returns to the trigger element on close.

---

## 2. Modal Shell

```css
background: white;
border-radius: 10px;
overflow: hidden;
box-shadow: 0 20px 50px rgba(0,0,0,0.25);
```

**Typical widths:**
- `420px` — confirm/destructive dialogs
- `640–700px` — standard modals
- `auto` with max-width — larger multi-step flows

---

## 3. Modal Header

```css
padding: 24px 24px 16px 24px;
```

| Element | Spec |
|---|---|
| Title | Inter `16px` weight `600` colour `#101828` |
| Sub-text | Inter `13px` weight `400` colour `#667085` |
| Layout | `flex; align-items: flex-start; gap: 14px` (icon + title) |

---

## 4. Destructive Confirmation Modal

Used whenever an irreversible action (delete, remove) requires explicit user confirmation.

### Anatomy

- **Icon:** 40 × 40px rounded-full, `bg #FEF3F2`, red warning SVG inside
- **Typed confirmation:** user must type `"delete"` (case-insensitive) to enable the confirm button
- **Confirm button:** `bg #D92D20`, white text, full width
- **Cancel button:** Secondary style

### States

- Confirm button is disabled until the typed value matches `"delete"`.
- Do not close on backdrop click — the user must explicitly cancel or confirm.

---

## 5. Toast Notifications

**File:** `/src/app/components/toast.tsx`

### Usage

```tsx
const { showToast } = useToast();
showToast({ type: 'success', title: 'User added', message: 'Optional detail.' });
```

Wrap the app root in `<ToastProvider>`.

### Visual Spec

| Property | Value |
|---|---|
| Position | Fixed, bottom-right, stacked |
| z-index | `9000+` |
| Width | ~`340px` |
| Background | `white` |
| Border-radius | `8px` |
| Left border | `4px` solid, in type colour |
| Icon | `22 × 22px` filled circle with white symbol |
| Auto-dismiss | ~4 seconds with animated progress bar |

### Type Colours

| Type | Background | Left-border / Icon |
|---|---|---|
| `success` | `#F6FFED` | `#52C41A` |
| `error` | `#FFF2F0` | `#FF4D4F` |
| `info` | `#E6F7FF` | `#1890FF` |
| `warning` | `#FFFBE6` | `#FAAD14` |

### Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Toast title | Open Sans | `14px` | `600` |
| Toast message | Open Sans | `13px` | `400` |

### Implementation Notes

- Toast must be rendered via `createPortal` into `document.body` at `z-index: 9000+`.
- Multiple toasts stack vertically.
- Progress bar animates from full width to zero over the auto-dismiss duration.

---

---

## 6. Image Crop Modal — `ImageCropModal`

**File:** `/src/app/components/ui/image-crop-modal.tsx`

The `ImageCropModal` is the **single shared component** for all image-upload crop flows across the platform. Import it from the shared location — never re-implement it inline.

### When to use

Whenever the user uploads an image file and a fixed-ratio crop is required before saving.

| Surface | Ratio | Output size | Label prop |
|---|---|---|---|
| General Information — Project Image | `16:9` | `1280 × 720 px` | `"Project Image"` |
| General Information — Project Logo | `1:1` | `256 × 256 px` | `"Project Logo"` |
| Personal Info Panel — Member Avatar | `1:1` | `96 × 96 px` | `"Profile Photo"` |

### Import

```tsx
import { ImageCropModal } from './ui/image-crop-modal';
// Adjust relative path as needed from the calling file's location.
```

### Props

| Prop | Type | Description |
|---|---|---|
| `file` | `File` | Raw `File` object from a file-input or drag-drop event |
| `targetWidth` | `number` | Output canvas width in natural pixels |
| `targetHeight` | `number` | Output canvas height in natural pixels |
| `label` | `string` | Inserted into the modal title as `"Crop {label}"` |
| `onSave` | `(dataUrl: string) => void` | Called with a `image/jpeg` data URL at quality 0.92 |
| `onClose` | `() => void` | Called when user cancels or presses Escape |

### Usage pattern

```tsx
const [pendingFile, setPendingFile] = useState<File | null>(null);
const [savedUrl,    setSavedUrl]    = useState<string | null>(null);

// Trigger: file input onChange
<input type="file" accept="image/*"
  onChange={e => { const f = e.target.files?.[0]; if (f) setPendingFile(f); }} />

// Render modal when a file is pending
{pendingFile && (
  <ImageCropModal
    file={pendingFile}
    targetWidth={96}
    targetHeight={96}
    label="Profile Photo"
    onSave={dataUrl => { setSavedUrl(dataUrl); setPendingFile(null); }}
    onClose={() => setPendingFile(null)}
  />
)}
```

### Visual spec

| Property | Value |
|---|---|
| **Shell width** | `620px` |
| **Shell border-radius** | `8px` |
| **Shell background** | `#FFFFFF` |
| **Shell shadow** | `0 8px 40px rgba(0,0,0,0.28)` |
| **Backdrop** | `rgba(0,0,0,0.50)` · `z-index: 600` |
| **Header** | Standard Modal Header (§10.3): Actor 24px/400 · height 72px · `#F0F0F0` bottom divider |
| **Preview canvas** | `572 × 320 px` · `#111316` background · `border-radius: 6px` |
| **Dim overlay** | `rgba(0,0,0,0.60)` — 4 rects framing the live crop window |
| **Crop frame border** | `1.5px solid rgba(255,255,255,0.80)` |
| **Rule-of-thirds lines** | `rgba(255,255,255,0.22)` at 33.33% and 66.66% |
| **Corner handles (visual)** | L-bracket · `18 × 18px` · `3px solid #fff` · two sides per corner |
| **Corner handles (hit zone)** | `22 × 22px` transparent, centred on each corner |
| **Output-size chip** | Bottom-right of preview · `rgba(0,0,0,0.48)` pill · Inter 11px |
| **Reset button** | Appears only when crop differs from initial · top-right of preview |
| **Hint text** | `"Drag corners to resize · Drag inside the frame to reposition"` · Open Sans 11px `#9CA4AE` |
| **Footer** | Standard Modal Footer (§10.4): height 72px · `#C3C7CC` top border · Secondary + Primary buttons |

### Interaction model

| Gesture | Effect |
|---|---|
| Drag corner handle | Resizes crop frame with AR locked (diagonal-projection formula) |
| Drag inside frame | Pans the crop frame across the image |
| `Escape` key | Closes modal (calls `onClose`) |
| Click backdrop | Closes modal (calls `onClose`) |
| "Apply crop" | Exports cropped area to JPEG data URL at `targetWidth × targetHeight`, calls `onSave` |
| "Reset" button | Returns crop frame to initial position and size |

### Aspect-ratio locking formula

Corner resize uses a diagonal-projection to keep the AR locked regardless of drag direction:

```ts
// proj = scalar displacement along the crop diagonal
// ar = targetWidth / targetHeight
// s2 = ar² + 1

if (mode === 'br') proj = ( dx * ar + dy) / s2;
if (mode === 'tl') proj = (-dx * ar - dy) / s2;
if (mode === 'tr') proj = ( dx * ar - dy) / s2;
if (mode === 'bl') proj = (-dx * ar + dy) / s2;

newW = startW + proj * ar;
newH = newW / ar;
```

### Usage rules

| ✅ Always | ❌ Never |
|---|---|
| Import from `/src/app/components/ui/image-crop-modal.tsx` | Re-implement inline in another file |
| Use `targetWidth × targetHeight` to enforce minimum resolution | Allow `targetWidth` or `targetHeight` to be less than the required minimum (e.g. 96 for avatars) |
| Pass `file` as a raw `File` object | Convert to data URL before passing — the component handles the object URL lifecycle |
| Call `onClose` in both Save and Cancel flows | Forget to clear the `pendingFile` state after save or cancel |

---

## 7. Do / Don't

- ✅ Always use `position: fixed; inset: 0` for the backdrop.
- ✅ Always return focus to the trigger element when closing.
- ✅ Always use `createPortal` for toasts so they escape all stacking contexts.
- ✅ Always use the shared `ImageCropModal` (§6) for any image upload crop flow — never re-implement inline.
- ❌ Never close a destructive confirmation modal on backdrop click.
- ❌ Never use `#FF4D00` on destructive confirm buttons — use `#D92D20`.
- ❌ Never omit the `Escape` key handler on any modal or overlay.
- ❌ Never set `targetWidth` or `targetHeight` below the surface's minimum resolution (avatars: 96px, project images: 720px height).
