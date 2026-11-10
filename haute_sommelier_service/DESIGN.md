---
name: Haute Sommelier & Service
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c9c6c1'
  on-secondary: '#31302d'
  secondary-container: '#474743'
  on-secondary-container: '#b7b5af'
  tertiary: '#d8ccc3'
  on-tertiary: '#362f29'
  tertiary-container: '#bcb1a8'
  on-tertiary-container: '#4b443d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2dc'
  secondary-fixed-dim: '#c9c6c1'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#ede0d7'
  tertiary-fixed-dim: '#d0c4bb'
  on-tertiary-fixed: '#201a15'
  on-tertiary-fixed-variant: '#4d453f'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  display-md:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  display-md-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-tablet: 1.25rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style

This design system reimagines hospitality tooling for multi-Michelin-starred properties and boutique ateliers. Rather than treating floor management and service coordination as a cluttered industrial kitchen display system (KDS), the visual tone reflects the serene discretion of a maitre d' at twilight: calm, composed, immaculate, and editorial.

### Design Movement & Core Sensibility
The aesthetic blends **Modern Luxury Editorial** with **Soft Architectural Depth**. 
- Deep obsidian backgrounds frame luminous creamy parchment text, creating high-contrast legibility without ocular fatigue in low-light dining rooms.
- Warm champagne gold serves strictly as a deliberate focal instrument—guiding eyes to course timings, VIP guest status, and table allocations without loud utilitarian alerts.
- Tactile, translucent glass surfaces evoke smoked crystal and brushed brass, maintaining a sense of haute cuisine craftsmanship even within digital interfaces.

## Colors

The palette rejects cold digital grays in favor of warm, mineral-tinted undertones reminiscent of basalt stone, aged champagne, and handmade cotton stationery.

### Palette Architecture
- **Base Canvas (`#121214`)**: A warm obsidian black with a soft neutral undertone that prevents sterile digital voids.
- **Surface Elevation Layers**:
  - `surface-container-low`: `#18181B` (Deep basalt, used for subtle table grid groupings)
  - `surface-container`: `#1F1E22` (Smoked slate, foundational card backing)
  - `surface-container-high`: `#28272C` (Elevated overlays, flyouts, and active table nodes)
  - `surface-glass`: `rgba(31, 30, 34, 0.65)` with 20px backdrop blur for modal backing and floating navigators.
- **Primary Accent (`#D4AF37`)**: Antique champagne gold. Applied exclusively to active reservations, VIP badges, sommelier recommendations, and critical temporal milestones.
- **Secondary / Parchment Spectrum**:
  - Primary Typography: `#F8F6F0` (Cream parchment for high-clarity headline and metric reading)
  - Secondary Typography: `#EFECE6` (Soft alabaster for structural labels and body copy)
- **Muted Structural Neutral (`#8C827A`)**: Warm ash gray for borders, passive icons, and inactive timeline tracks.
- **Semantic Accents (Muted Gastronomy Tones)**:
  - *Seated / In Progress*: Champagne Olive (`#7D8B68`)
  - *Attention / Urgent Course*: Burnt Sienna Gold (`#C87D55`)
  - *Completed / Settled*: Faded Champagne Ochre (`#A69265`)

## Typography

Typography establishes an editorial atmosphere akin to a bespoke tasting menu. 

- **Playfair Display** introduces haute culture and literary grace across table numbers, guest patron titles, dining room zones, and high-level shift metrics. It is set with relaxed, generous line-heights and slight negative tracking on large scales to retain high elegance.
- **Plus Jakarta Sans** delivers clarity for operational parameters: allergy alerts, seating timestamps, covers count, and sommelier vintage pairings.
- **Tracking & Capitalization Rules**: All `label-sm` and `label-md` tokens are rendered strictly in uppercase with wide letter spacing (`0.08em` to `0.12em`) to mirror luxury house cataloguing.

## Layout & Spacing

The layout philosophy rejects dense, squished point-of-sale grids in favor of an **Asymmetric Editorial Flow** anchored by a structured 12-column layout.

### Grid System & Rhythms
- **Desktop (12 Columns)**: Max canvas width `1600px`, centered with `margin: 3rem`. Gaps between course tracks and floorplan zones utilize `gutter: 1.5rem`.
- **Tablet (8 Columns)**: Designed for iPad Pro floor service (sommelier and host stand). `margin-tablet: 2rem`, `gutter-tablet: 1.25rem`.
- **Mobile Handheld (4 Columns)**: Intended for discreet floor-manager devices. `margin-mobile: 1.25rem`, single-column stacking with continuous vertical flows.

### Spacing Philosophy
Negative space is a primary functional feature: it minimizes operational friction and reduces cognitive load during busy dinner services. Cards allow a minimum internal padding of `space-md` (`1.25rem`) up to `space-lg` (`2rem`) for VIP detail views.

## Elevation & Depth

Depth is established through low-luminance light transmission and micro-borders rather than heavy drop shadows.

### Smoked Glass & Tonal Layers
- **Base Canvas**: Completely flat obsidian (`#121214`).
- **Cards & Plates**: Translucent smoked quartz panels (`rgba(31, 30, 34, 0.72)`) with a `backdrop-filter: blur(16px)` layer.
- **Outlines (Ghost Filaments)**: All containers feature an ultra-fine `1px` border with `rgba(212, 175, 55, 0.12)` (warm gold filament) or `rgba(255, 255, 255, 0.06)`. This mimics the edge of fine beveled crystal.
- **Ambient Illumination**: Overlays and modals project a soft, warm amber penumbra:
  `box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.8), 0 0 24px -4px rgba(212, 175, 55, 0.05);`

## Shapes

The design system embraces an understated architectural geometry: `roundedness: 1` (Soft).

- Standard cards, interactive table nodes, input fields, and panels carry a refined `4px` (`0.25rem`) radius.
- Modals, flyout sheets, and guest profile drawers scale to `8px` (`0.5rem`).
- Pills and circles are strictly reserved for bespoke numerical counts (such as course round indicators or guest cover indicators) to maintain visual hierarchy against rectangular layout blocks.

## Components

### Buttons
- **Primary Action (e.g., "Confirm Seating", "Allocate Reserve")**: Deep gold surface (`#D4AF37`) with obsidian typography (`#121214`), `title-md` font weight, `4px` corner radius, and subtle gold bloom on hover (`box-shadow: 0 0 16px rgba(212, 175, 55, 0.3)`).
- **Secondary Action (e.g., "Course Timeline")**: Smoked transparent background, `1px` border of `rgba(212, 175, 55, 0.25)`, typography in `#F8F6F0`.
- **Tertiary / Text (e.g., "Dismiss")**: Minimal padding, no background, parchment text with an underline accent on hover.

### Cards & Reservation Modules
- Constructed with `surface-container` background and `1px` filament border (`rgba(255, 255, 255, 0.06)`).
- Header sections feature guest names in `Playfair Display` (`headline-sm`) accompanied by subtle champagne metadata (`label-sm`).
- Dynamic hover state slightly illuminates the border to `rgba(212, 175, 55, 0.3)` with a smooth `300ms` cubic transition.

### Bespoke Status Badges & Chips
- Compact, flat, non-intrusive badges with minimal `0.25rem` radius.
- **VIP / Critic / Cellar Reserve**: Gold hairline border with `rgba(212, 175, 55, 0.15)` fill and crisp parchment text.
- **Course Status (e.g., "Entrée Fired", "Digestif")**: Muted slate backing with a single 4px luminous pip indicating real-time kitchen progress.

### Form Inputs & Dietary Selectors
- Background: `#18181B`.
- Border: `1px solid rgba(140, 130, 122, 0.3)`. Focus state: `1px solid #D4AF37` with no heavy outline rings.
- Placeholder text in muted ash gray (`#8C827A`), text entries shift to rich cream (`#F8F6F0`).

### Lists & Service Logs
- Stripped of heavy zebra striping. Rows are separated by hair-thin dividers (`rgba(255, 255, 255, 0.04)`).
- Generous vertical line-height (`space-md` row padding) to allow instant scannability for service staff during active seatings.

### Bespoke Service Additions
- **Tasting Menu Flow Indicator**: A horizontal thread containing tiny geometric milestones, marking pacing between courses (Amuse-Bouche, Fish, Main, Pre-Dessert) with elapsed minute counters rendered in `label-sm`.
- **Sommelier Cellar Drawer**: A slide-over glass panel detailing wine pairing notes, serving temperature, and bottle inventory with editorial wine label previews.