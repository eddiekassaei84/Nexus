Add “Vertical Zones” Tab to LBS UI

Add a second tab next to Primary LBS called Vertical Zones in the Location Breakdown Structure (LBS) module.

1. Tab Behavior

Place the new tab to the right of Primary LBS

Keep the same tab styling (active underline, spacing, typography)

Default tab = Primary LBS

Switching tabs should:

preserve page layout

not reload the entire page (client-side switch)

2. Vertical Zones Layout

Replace the hierarchical tree with a flat table layout

3. Table Columns

Create a table with the following columns:

Column Name	Behavior
Name	Text, required
Code	Text, optional
Type	Dropdown (Shaft, Riser, Stair, Elevator, Atrium, Vertical Chase)
Start Level	Dropdown (pull from existing LBS Level nodes only)
End Level	Dropdown (pull from existing LBS Level nodes only)
Elevation Start (ft-in)	Auto-filled from Start Level, editable override
Elevation End (ft-in)	Auto-filled from End Level, editable override
Description	Optional text
4. Top Toolbar (match LBS style)

Reuse existing toolbar pattern:

Search input: “Search vertical zones…”

Buttons:

Import

Export

Edit (toggle edit mode)

Optional:

“+ Add Vertical Zone” button (primary CTA in edit mode)

5. Row Behavior

Clicking a row opens a right-side panel (drawer)

Panel includes:

Basic info (Name, Type, Levels)

Section: Linked Locations

Button: “+ Add Location”

Allows selecting LBS nodes (from Primary LBS tree)

6. Edit Mode

When Edit is active:

Table cells become editable

Allow:

Add new rows

Delete rows

Change Type, Levels, Code

Maintain same interaction pattern as Primary LBS edit mode

7. Data Rules

Start Level and End Level must reference Tier 2 (Level) nodes only

Elevation values:

default from selected Levels

allow manual override

No hierarchy in this tab (strictly flat list)

8. Visual Consistency

Match:

spacing

typography

button styles

table density

Keep alignment consistent with Primary LBS table

9. Empty State

If no vertical zones exist:

Display:

Icon (optional)

Message: “No vertical zones defined”

CTA: “+ Add Vertical Zone”