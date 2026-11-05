---
name: Haute Couture Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c178'
  primary: '#e9c178'
  on-primary: '#412d00'
  primary-container: '#c6a15b'
  on-primary-container: '#4f3800'
  inverse-primary: '#775a1a'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#b1c6f9'
  on-tertiary: '#192f59'
  tertiary-container: '#91a6d7'
  on-tertiary-container: '#253b65'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c178'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5d4202'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#b1c6f9'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#314671'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.08em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.06em
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: 0.06em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.04em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.03em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.15em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.18em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.2em
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 4rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style
The brand personality embodies disciplined elegance, monolithic luxury, and unapologetic minimalism. Drawing inspiration from modern high-fashion houses, the interface acts as an unadorned gallery frame that retreats to foreground imagery, silhouettes, and artisanal tailoring.

The design movement combines **Minimalism** with an **Editorial Haute Couture** sensibility. Visual volume is achieved through radical negative space, cinematic aspect ratios, stark chromatic contrast, and meticulous typographic hierarchy rather than decorative ornamentation or layered dimensionality. The emotional response must evoke exclusivity, architectural poise, and quiet confidence.

## Colors
The palette relies on a deep, obsidian base contrasted against pure white typography and an architectural champagne-gold accent used exclusively for moments of elevated focus.

- **Canvas & Surfaces**: The base canvas is `#0A0A0A`. Elevated planes, slide-out carts, and modal backdrops shift to `#151515`.
- **Text & Hierarchy**: Primary titles, headlines, and essential values are rendered in `#FFFFFF`. Secondary descriptions, metadata, dimensions, and breadcrumbs utilize `#B8B8B8`.
- **Accents**: `#C6A15B` (Pale Antique Gold) is reserved for subtle hover states, active indicators, luxury badges, and checkout progression. It must never overwhelm large surfaces.
- **Architectural Rules**: Dividers, hairpins, and structural containment strictly use `#292929` at 1px thickness.

## Typography
Typographic treatment creates an editorial rhythm between high-contrast dramatic display forms and disciplined, airy sans-serif utilitarian details.

- **Display & Headlines (`Bodoni Moda`)**: Applied to collection releases, brand statements, lookbook headings, and product names. Most headline levels use uppercase styling paired with tracked spacing (`0.04em` to `0.08em`) to mirror luxury print magazines.
- **Body & Captions (`Plus Jakarta Sans`)**: Set in light (`300`) and regular (`400`) weights with generous line heights to ensure legible, airy reading against the deep dark canvas.
- **Labels & Microcopy (`Plus Jakarta Sans`)**: Always uppercase with extreme tracking (`0.15em` to `0.2em`) for pricing, category navigations, filters, buttons, and system notices.

## Layout & Spacing
The layout relies on an **asymmetric editorial grid** operating on a 12-column baseline on desktop, 8 columns on tablet, and 4 columns on mobile. 

- **Canvas Margins**: Deep lateral margins (`margin: 4rem` on desktop, tapering to `1.25rem` on mobile) allow lookbook images to float unconstrained.
- **Vertical Rhythm**: Massive white space is intentional. Vertical separations between narrative modules use `space-xl` (and multiples thereof), rejecting dense visual packing.
- **Asymmetric Offsets**: Lookbooks and campaign showcases break standard 50/50 balance by utilizing 7:5 and 8:4 column arrangements, pairing large full-height portrait photography with offset typographic descriptions.

## Elevation & Depth
In alignment with pure high-fashion minimalism, traditional elevation methods—such as diffuse drop shadows, soft blur fields, or colorful glows—are strictly forbidden.

Depth is expressed solely through:
- **Tonal Stepping**: The default ground is `#0A0A0A`. Drawers, overlay filters, search takeovers, and fly-out menus step upward to `#151515`.
- **Razor-Thin Outlines**: All interactive and structural separations rely on 1px crisp borders in `#292929`.
- **Image Stacking**: Contextual overlays (such as quick-view sheets or size guides) employ a `#0A0A0A` backdrop at 85% opacity with no blur, maintaining sharp, graphic silhouettes throughout the viewport.

## Shapes
The shape language is strictly **Sharp (0)**. 

No border radiuses are permitted on any UI element. Buttons, text fields, notification banners, imagery containers, and modal sheets are formed with pure right angles (0px radius). This architectural severity reflects tailoring precision and the structural geometry of luxury garments.

## Components

### Buttons
- **Primary**: Sharp rectangle, solid `#FFFFFF` fill with `#0A0A0A` text (`label-md`, uppercase, `0.18em` tracking). Hover state smoothly transitions background to `#C6A15B` and text to `#0A0A0A`.
- **Secondary / Ghost**: Sharp rectangle, transparent background, 1px border in `#292929`, text `#FFFFFF`. Hover state transitions border and text to `#C6A15B`.
- **Text Action**: Unbordered, underlined with 1px hairline `#292929` offset by 4px; on hover, hairline transitions to `#C6A15B`.

### Product Cards
- Zero-radius container with no shadows and no outer border.
- Photography occupies 3:4 aspect ratio with subtle zoom (scale 1.03) upon pointer hover.
- Product titles set in `body-sm` (`#B8B8B8`), prices set in `label-md` (`#FFFFFF`).
- Quick-add actions reveal on hover as full-width sharp bottom bars across the image base.

### Form Inputs & Text Fields
- Minimalist underline structure or boxed sharp inputs utilizing 1px `#292929` border, transparent background, and `#FFFFFF` text.
- Focused state transforms bottom or bounding border to 1px `#C6A15B` without outer glow.
- Labels stay floating above in `label-sm`, uppercase, color `#B8B8B8`.

### Checkboxes & Radio Buttons
- **Checkboxes**: 14px sharp squares bounded by 1px `#292929`. Checked state displays a solid `#FFFFFF` or `#C6A15B` fill with a sharp cutout.
- **Radio Buttons**: 14px sharp squares (preserving the non-rounded motif) with a centered 6px inner solid square when active.

### Chips & Filter Tags
- Architectural sharp rectangular pills; transparent ground with 1px `#292929` stroke.
- Text set in `label-sm`.
- Active state renders with a solid `#151515` background and `#C6A15B` border.

### Curated Editorial Modules
- **Lookbook Gallery**: Full-bleed edge-to-edge frames separated only by 1px `#292929` gutters.
- **Size Selector**: Modular grid of sharp tiles; unavailable sizes crossed out with a diagonal hairline 1px `#292929` stroke.