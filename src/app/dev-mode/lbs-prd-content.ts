import type { DevDocument } from '../components/dev-mode';

const BASE_URL = 'https://sigidev.atlassian.net/wiki/spaces/INN/pages';

export const lbsPrdDocuments: DevDocument[] = [
  {
    id: 'lbs-prd-overview',
    title: 'Project Setting | Location Breakdown Structure',
    sourceUrl: `${BASE_URL}/2939518977/Project+Setting+Location+Breakdown+Structure`,
    markdown: `# PRD: Location Breakdown Structure (LBS) Module

## 1. Executive Summary

The Location Breakdown Structure (LBS) module defines the **"Where" dimension** of all project data in Nexus. It provides a governed, hierarchical structure for spatial organization, enabling consistent linking of inspections, drawings, model elements, RFIs, and reporting.

This module consists of two coordinated layers:

- **Location Break Down Structure**: A hierarchical, level-based structure (system of record)
- **Vertical Zones**: A flat, cross-level spatial grouping layer for vertical continuity (e.g., shafts, risers)

---

## 2. Problem Statement

Construction data today lacks a consistent, governed spatial structure:

- Locations are inconsistent across tools (Procore, ACC, drawings, BIM)
- Vertical elements (shafts, risers, stairs) cannot be modeled properly in a tree structure
- Reporting and filtering by location is unreliable
- AI and analytics cannot reason over spatial relationships

Nexus requires a unified and governed location system that supports both:

- level-based containment
- cross-level continuity

---

## 3. Goals & Objectives

### Primary Goals

- Establish a **single source of truth for project locations**
- Enable **consistent linking of all objects to location**
- Support hierarchical navigation (LBS)
- Support cross-level grouping (Vertical Zones)

### Success Criteria

- 100% of project objects can be assigned to a location
- Users can filter and report by Level, Area / Room, and Vertical Zone
- No duplicate or conflicting location structures

---

## 4. Scope

### In Scope

- Primary LBS hierarchy (Tier 0-8)
- Level-based structure with elevation support
- Controlled spatial types (Tier 3-8)
- Vertical Zones tab (flat structure)
- Linking Vertical Zones to LBS nodes
- Import / Export for both structures

### Out of Scope (for now)

- AI-generated LBS
- Automated BIM -> LBS mapping
- Advanced rule engine for type transitions
- Graph visualization of relationships

---

## 5. System Architecture Overview

### Two-Layer Model

#### 1. Primary LBS (Hierarchical)

- Tree structure
- Defines containment (where something is located)

#### 2. Vertical Zones (Relational)

- Flat list
- Defines continuity (what spans across levels)

## 6. Relationship Model

### Vertical Zone <-> LBS

- Many-to-many relationship
- A vertical zone can link to multiple levels and multiple spatial nodes (room, area, zone)

### Example

\`\`\`
Shaft A:
  Level 01 -> Area East
  Level 02 -> Room 201
  Level 03 -> Room 301
\`\`\`

## 7. Key Product Insight

Primary LBS defines:

> **Where something exists on a level**

Vertical Zones define:

> **What continues through multiple levels**

This separation keeps the model clean, supports real-world construction behavior, and enables future graph-based intelligence.`,
    children: [
      {
        id: 'lbs-diagram-explanation',
        title: 'Diagram Explanation',
        sourceUrl: `${BASE_URL}/2939518977/Project+Setting+Location+Breakdown+Structure#diagram-explanation`,
        contentType: 'mermaid',
        markdown: `flowchart TD
  jobSite["Job Site"] --> projectOne["Project 1"]
  jobSite --> projectTwo["Project 2"]
  projectOne --> buildingOneP1["Building 1"]
  projectOne --> buildingTwoP1["Building 2"]
  projectTwo --> buildingOneP2["Building 1"]
  buildingOneP1 --> levelOneP1B1["Level 1"]
  buildingOneP1 --> levelTwoP1B1["Level 2"]
  buildingTwoP1 --> levelOneP1B2["Level 1"]
  buildingOneP2 --> levelOneP2B1["Level 1"]
  buildingOneP1 --> lbsTree["LBS Tree"]
  lbsTree --> localCode["Location Code"]
  localCode --> fullCode["Full Code"]
  fullCode --> assignment["Assignment And Reporting"]`,
        diagram: `flowchart TD
  jobSite["Job Site"] --> projectOne["Project 1"]
  jobSite --> projectTwo["Project 2"]
  projectOne --> buildingOneP1["Building 1"]
  projectOne --> buildingTwoP1["Building 2"]
  projectTwo --> buildingOneP2["Building 1"]
  buildingOneP1 --> levelOneP1B1["Level 1"]
  buildingOneP1 --> levelTwoP1B1["Level 2"]
  buildingTwoP1 --> levelOneP1B2["Level 1"]
  buildingOneP2 --> levelOneP2B1["Level 1"]
  buildingOneP1 --> lbsTree["LBS Tree"]
  lbsTree --> localCode["Location Code"]
  localCode --> fullCode["Full Code"]
  fullCode --> assignment["Assignment And Reporting"]`,
      },
      {
        id: 'lbs-prd-lbs-tab',
        title: 'Location Breakdown Structure Tab',
        sourceUrl: `${BASE_URL}/2939977729/Location+Breakdown+Structure+Tab`,
        markdown: `# Location Breakdown Structure Tab

## 6.1 Overview

The Primary LBS defines the **hierarchical spatial structure** of a project and serves as the authoritative source for the **"Where" dimension**.

The structure is strictly:

- hierarchical (tree-based)
- single-path (each node has one parent)
- non-duplicative

In addition to horizontal hierarchy, the LBS supports **vertical segmentation within a Level**, without introducing additional tiers.

---

## 6.2 Tier Structure

| Tier | Type | Rules |
| --- | --- | --- |
| Tier 0 | Job Site | Optional, system-reserved |
| Tier 1 | Building | Auto-derived from Project Settings (Project Name / Code) |
| Tier 2 | Level | Fixed, elevation-enabled, non-convertible |
| Tier 3-8 | Spatial Breakdown | Controlled, flexible |

---

## 6.3 Level (Tier 2) Rules

- Represents the project's vertical stacking
- Only tier that accepts elevation values
- Cannot be renamed or converted to another type
- Acts as the anchor for all spatial breakdowns

---

## 6.4 Spatial Breakdown (Tier 3-8)

### Allowed Types

\`\`\`
Section
Wing
Department
Zone
Area
Unit
Suite
Room
Sub Room
Corridor
Core
Bay
\`\`\`

| Type | Description | Typical Use Case |
| --- | --- | --- |
| Section | Highest-level subdivision of a building | Tower vs Podium, Building A vs Building B |
| Wing | Large directional or linear subdivision | East Wing, West Wing |
| Department | Organizational grouping | ER, Radiology, Finance |
| Zone | Logical grouping by systems or sequencing | HVAC zones, fire zones |
| Area | Flexible grouping for planning or reporting | Work areas, trade zones |
| Unit | Self-contained tenant or ownership boundary | Apartment unit, retail tenant space |
| Suite | Collection of rooms functioning as a unit | Office suites, patient suites |
| Room | Physically enclosed space | Offices, bedrooms, conference rooms |
| Sub Room | Subdivision of a room | Closets, equipment zones |
| Corridor | Circulation space | Hallways, passageways |
| Core | Central service zone | Elevator cores, stair cores |
| Bay | Structural or modular subdivision | Structural bays, parking bays |

### Behavior

- Types are controlled but flexible
- Nodes can be converted between types, subject to validation
- Each node must belong to a single parent

### Full Tier to copy

\`\`\`
Job Site Locked
Project Locked
Building Locked
Level Locked
Section
Wing
Department
Zone
Area
Unit
Suite
Room
Sub Room
Corridor
Core
Bay
\`\`\`

## 6.5 Vertical Segmentation (Within-Level Classification)

Vertical Segmentation allows representing **sub-level spatial zones within a Level** (for example, plenum spaces) without introducing additional hierarchy tiers.

Vertical Segmentation is a **property of a spatial node**, not a structural tier.

### Allowed Values

| Value | Description |
| --- | --- |
| Floor Plenum | Space below finished floor |
| Occupied Space | Main usable volume |
| Ceiling Plenum | Space above ceiling |
| Full Height | Spans entire level (default) |

### Behavior Rules

- Does not create new nodes
- Does not affect hierarchy
- Does not introduce additional tiers
- A spatial node can support one or multiple segments
- Default value is **Full Height**

### Applicability

Vertical Segmentation can be applied to:

- Zone
- Area
- Unit
- Room
- Sub Room

Not applicable to Level or Building.

### Example

\`\`\`
Building A
  Level 02
    Zone A
      Room 201 [Vertical Segments: Occupied, Ceiling Plenum]
\`\`\`

## 6.7 Key Design Principles

- LBS represents containment, not geometry
- Vertical Segmentation represents within-level classification
- Hierarchy must remain stable, simple, and scalable`,
        children: [
          {
            id: 'lbs-prd-vertical-segmentation',
            title: 'Vertical Segmentation (Add-on to LBS)',
            sourceUrl: `${BASE_URL}/2943123458/Vertical+Segmentation+Add-on+to+LBS`,
            markdown: `# Vertical Segmentation (Add-on to LBS)

## 7.1 Overview

Vertical Segmentation defines how vertical space within a spatial node is allocated **without modifying the LBS hierarchy**.

It is:

- A property of a node, not a tier
- Constrained by the height available from its parent
- Used to define plenum spaces, while occupied space is always derived

Vertical Segmentation introduces **vertical constraints**, not hierarchy changes.

---

## 7.2 Core Concept

Each node operates within a **height budget**:

\`\`\`
Available Height = Parent Occupied Space
\`\`\`

Vertical Segmentation allows users to define:

- Ceiling Plenum (optional)
- Floor Plenum (optional)

The system automatically derives:

- Occupied Space (remaining height)

## 7.3 Segment Model

| Segment | Behavior |
| --- | --- |
| Ceiling Plenum | Optional, user-defined |
| Floor Plenum | Optional, user-defined |
| Occupied Space | Always present, system-calculated, read-only |

## 7.4 Core Rule

When a parent node defines vertical segmentation:

- The parent's **Occupied Space becomes the available height** for all descendants
- All descendant nodes must operate within this reduced height

> Parent segmentation introduces constraints, not structure.

## 7.5 Calculation Model

\`\`\`
Occupied Space = Available Height - (Ceiling Plenum + Floor Plenum)

Available Height =
- Level Height (if no parent segmentation)
- Parent Occupied Space (if parent is segmented)
\`\`\`

## 7.7 Validation Rules

\`\`\`
Ceiling Plenum + Floor Plenum <= Available Height
\`\`\`

If exceeded, the node becomes invalid and the system must show an error state and prevent saving in edit context.

## 7.8 Parent Change Impact

When vertical segmentation is introduced or modified at a parent node, all descendants must be re-evaluated against the new available height.

Resolution options:

- **Auto Adjust**: apply parent segmentation and adjust child segment values
- **Keep and Review Manually**: apply parent segmentation and mark affected nodes invalid
- **Cancel**: abort operation

> Parent changes must never silently modify or delete child data.

## 7.9 UI/UX Rules

| Segment | Editable |
| --- | --- |
| Ceiling Plenum | Yes |
| Floor Plenum | Yes |
| Occupied Space | No (derived) |

### Display Example

\`\`\`
Available Height: 14'-3"

Ceiling Plenum   [ 3'-0" ]
Occupied Space   [ 11'-3" ] (auto)
Floor Plenum     [ 0'-0" ]

Remaining Height: 11'-3"
\`\`\`

## 7.12 Validation Equations

\`\`\`
If no parent segmentation:
H_available = H_level

If parent segmented:
H_available = H_parent_occupied

H_occupied = H_available - (H_ceiling + H_floor)

H_ceiling + H_floor <= H_available
\`\`\`

> Vertical Segmentation constrains how height is used within a space, while LBS defines where that space exists.`,
          },
        ],
      },
      {
        id: 'lbs-prd-vertical-zones',
        title: 'Vertical Zones',
        sourceUrl: `${BASE_URL}/2940108801/Vertical+Zones`,
        markdown: `# Vertical Zones

## 7.1 Overview

Vertical Zones define **cross-level spatial entities** that cannot be represented within the hierarchical LBS structure.

These elements:

- span across multiple Levels
- do not belong to a single parent in the hierarchy
- represent continuity rather than containment

Vertical Zones complement the Primary LBS by enabling representation of the vertical dimension of building systems and spaces.

## 7.2 Definition

A Vertical Zone is a flat, non-hierarchical entity that:

- references one or more Levels
- optionally links to spatial nodes within the LBS
- represents a continuous vertical condition (for example, shaft or riser)

## 7.3 Supported Types

| Type | Description |
| --- | --- |
| Shaft | Vertical enclosed space for MEP systems |
| Riser | Vertical routing path for utilities |
| Stair / Stairwell | Vertical circulation space |
| Elevator / Elevator Shaft | Vertical transportation system |
| Atrium | Open vertical volume across levels |
| Vertical Chase | General-purpose vertical service space |

## 7.4 Core Data Fields

| Field | Description |
| --- | --- |
| Name | Display name |
| Code | Optional identifier |
| Type | Controlled enum |
| Start Level | Reference to LBS Level |
| End Level | Reference to LBS Level |
| Elevation Start | Derived from Start Level, editable override |
| Elevation End | Derived from End Level, editable override |
| Description | Optional text |

## 7.5 Behavior Rules

- Vertical Zones are not part of the LBS hierarchy
- Vertical Zones do not have parent-child relationships
- Vertical Zones exist as a flat list
- Must reference valid Level nodes only
- Must span at least one Level
- Must satisfy Start Level <= End Level

## 7.6 Relationship with Primary LBS

Vertical Zones can be linked to LBS nodes to provide spatial context.

Relationship characteristics:

- one Vertical Zone -> multiple LBS nodes
- one LBS node -> multiple Vertical Zones
- links are contextual, non-hierarchical, and optional

### Example

\`\`\`
Vertical Zone: Shaft A
  Level 01 -> Room 101
  Level 02 -> Room 201
  Level 03 -> Corridor 301
\`\`\`

## 7.7 Interaction with Vertical Segmentation

| Concept | Purpose |
| --- | --- |
| Vertical Segmentation | Within-level classification (plenum vs occupied space) |
| Vertical Zones | Cross-level continuity (shaft, riser, etc.) |

## 7.9 Key Design Principles

- Vertical Zones represent continuity, not containment
- Must remain flat, simple, and non-hierarchical
- Should not duplicate or interfere with LBS structure`,
      },
      {
        id: 'lbs-prd-unified-spatial-model',
        title: 'Unified Spatial Model Diagram',
        sourceUrl: `${BASE_URL}/2939781128/Unified+Spatial+Model+Diagram`,
        markdown: `# Unified Spatial Model Diagram

## Primary LBS + Vertical Segmentation + Vertical Zones

## 1. Conceptual Stack

\`\`\`
                VERTICAL ZONES
           (Cross-Level Continuity)
          Shaft | Riser | Stair | etc.
                    |
                    v
              PRIMARY LBS (TREE)
            (Containment Hierarchy)

  Tier 1: Building
      |
      +-- Tier 2: Level (Elevation Anchor)
              |
              +-- Tier 3+: Spatial Breakdown
                      (Zone / Unit / Room / etc.)
                    |
                    v
          VERTICAL SEGMENTATION
       (Within-Level Classification)
        Floor | Occupied | Ceiling
\`\`\`

## 2. Example Scenario

### Primary LBS

\`\`\`
Building A
  Level 02 (Elevation: 20'-0")
    Unit A
      Room 201
      Room 202
\`\`\`

### Vertical Segmentation

\`\`\`
Room 201
  Vertical Segments:
    - Occupied Space
    - Ceiling Plenum

Room 202
  Vertical Segments:
    - Occupied Space
\`\`\`

Same node, no duplication. It is just internal vertical classification.

### Vertical Zone

\`\`\`
Vertical Zone: Riser R-01
Type: Riser

Spans:
  Level 01 -> Ceiling Plenum
  Level 02 -> Ceiling Plenum
  Level 03 -> Ceiling Plenum

Linked Locations:
  Level 01 -> Room 101
  Level 02 -> Room 201
  Level 03 -> Room 301
\`\`\`

## 3. How They Work Together

| Layer | Role | Structure |
| --- | --- | --- |
| Primary LBS | Containment | Tree |
| Vertical Segmentation | Within-level classification | Property |
| Vertical Zones | Cross-level continuity | Flat + linked |

## 4. Combined Example

\`\`\`
Element: Duct Segment

Primary LBS:
  Building A -> Level 02 -> Room 201

Vertical Segment:
  Ceiling Plenum

Vertical Zone:
  Riser R-01
\`\`\``,
      },
      {
        id: 'lbs-prd-future-considerations',
        title: 'Future Considerations for LBS Assignment and Spatial Relationships in Nexus Data Model',
        sourceUrl: `${BASE_URL}/2939781121/Future+Considerations+for+LBS+Assignment+and+Spatial+Relationships+in+Nexus+Data+Model`,
        markdown: `# Future Considerations

## 1. Element-to-LBS Assignment Strategy

As Nexus evolves toward a fully governed data model, a standardized approach is required for assigning LBS locations to elements (for example, walls, doors, equipment).

### Key Principles

- Each element must have one and only one Primary LBS assignment
- LBS assignment must remain hierarchical, non-duplicative, and stable over time

### Open Questions

- What is the governing rule for assignment?
  - Highest enclosing container?
  - Level-based assignment?
  - Element-type-specific rules?
- Should assignment be auto-derived from BIM, user-defined, or hybrid?
- How should edge cases be handled?
  - elements spanning multiple spaces
  - elements crossing levels

### Direction

LBS should strictly represent **containment**, not interaction or geometry-derived relationships. A formal assignment strategy and rule engine will be required to ensure consistency across projects and integrations.

---

## 2. Adjacency & Spatial Relationships (Non-LBS Layer)

Elements and spaces often have relationships that are not hierarchical. For example, a wall may sit between two rooms. These relationships must be modeled outside of the LBS structure.

### Key Principles

- LBS should not encode adjacency or boundary relationships
- Spatial relationships should be represented in a separate relational graph layer
- Support many-to-many relationships between elements and spaces

### Examples

- Wall -> bounded by -> Room 201, Room 202
- Room -> adjacent to -> Corridor
- Shaft -> intersects -> multiple levels

### Direction

Adjacency and spatial relationships will form a **graph-based intelligence layer** on top of LBS, enabling advanced querying, visualization, and AI-driven insights without compromising the integrity of the core LBS hierarchy.`,
      },
    ],
  },
];
