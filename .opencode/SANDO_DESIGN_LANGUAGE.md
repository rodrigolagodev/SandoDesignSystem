# Sando Design Language

> **Version**: 1.0.0 | **Status**: Foundational | **Date**: 2026-04-06
> **Role**: Governing visual specification for the Sando Design System.
> Everything downstream — guidelines, tokens, component styling — derives from this document.

---

## Preamble: What Sando Looks Like

If you put a Sando interface next to a Material UI interface, the difference should be immediate:

- **Material** looks like software. **Sando** looks like a product someone _made_.
- **Chakra** looks accessible and fine. **Sando** looks deliberate and warm.
- **Tailwind UI** looks templated. **Sando** looks authored.

Sando's visual target: **70% Stripe / 30% Vercel**. The warmth, whitespace, and layered depth of Stripe's design. The precision, restraint, and technical confidence of Vercel's. The fusion: premium craft that doesn't feel cold, technical confidence that doesn't feel sterile.

The brand analogy is non-negotiable: Sando is the Japanese sandwich (サンド). The bread-filling-bread structure maps directly to the three-layer token architecture (Ingredients → Flavors → Recipes). Flavor names are food-inspired. This metaphor must remain alive across all touchpoints.

---

## 1. Core Principles

### 1.1 Warm Restraint

**Definition**: Decoration serves meaning. Color and ornament earn their place through function, never through abundance.

**DO**: Use the accent color exclusively on interactive elements (buttons, links, focus rings, active states) and sparingly on emphasis surfaces (selected row, highlighted badge).
**DON'T**: Use the accent color as section backgrounds, decorative dividers, or gradient fills.
**Currently wrong**: Amber is applied to `background.emphasis`, `selection.background`, `border.emphasis`, `focus.ring`, `control.trackActive`, `link.default`, and `icon.interactive` — that's seven distinct usage categories. The accent should appear in three maximum: actions, focus indicators, and active controls. Everything else should use neutral warmth.

---

### 1.2 Structured Whitespace

**Definition**: Space is a design element, not leftover. Components breathe through deliberate, consistent padding and margins that follow the 4px grid without exception.

**DO**: Use generous inline padding on controls (12px minimum for md). Maintain consistent vertical rhythm with the stack scale. Let content areas have substantial margins from edges.
**DON'T**: Collapse padding to fit more content. Use inconsistent gaps between siblings. Break the 4px grid for "optical adjustments" without documenting them.
**Currently wrong**: Inset spacing uses `space.1` (4px) for muted, `space.3` (12px) for default, and `space.5` (20px) for emphasis — the jump from muted to default is 3x (4px→12px), but default to emphasis is only 1.67x (12px→20px). The ratio should feel more progressive and the base inset should be more generous.

---

### 1.3 Quiet Depth

**Definition**: Visual hierarchy comes from subtle surface layers and barely-there shadows, not from thick borders or heavy contrast. Depth whispers — it never shouts.

**DO**: Use soft, layered shadows on elevated elements. Use 1px borders at low opacity to define edges. Let background shade differences communicate hierarchy (base → surface → raised).
**DON'T**: Use box shadows darker than 10% opacity. Use borders thicker than 1px for structure (2px is reserved for focus and emphasis only). Stack multiple visual separators (border + shadow + background change simultaneously).
**Currently wrong**: The elevation system uses generic Tailwind-style shadows (`rgba(0,0,0,0.1)`) instead of warm-tinted shadows that match the neutral-warm palette. Shadows should use the same warm hue bias as the surface colors.

---

### 1.4 Alive, Not Animated

**Definition**: Interactive elements respond to human input with organic, purposeful microinteractions. Motion confirms action — it never decorates idle state.

**DO**: Apply `scale(0.98)` on press to confirm tactile contact. Transition border-color and background-color over 150-200ms. Use ease-out for entrances, ease-in for exits.
**DON'T**: Add hover animations to non-interactive elements. Use bounce, spring, or elastic easings. Animate on page load. Duration over 300ms for state changes.
**Currently wrong**: The system defines `animation.duration.fast` as 200ms and `animation.duration.normal` as 300ms, but there's no guidance on _when_ to use which. 200ms should be the ceiling for state changes (hover, press). 300ms is only for layout transitions (expand/collapse, slide-in).

---

### 1.5 Typographic Clarity

**Definition**: Typography establishes information hierarchy through weight and size contrast, not through color or decoration. Every text element has exactly one visual role.

**DO**: Use clear weight differentiation: 700 for headings, 600 for emphasis/labels, 400 for body. Keep body text at 14px (0.875rem) as the workhorse size. Use the heading font (Outfit) only for headings and hero text.
**DON'T**: Use more than three font weights in a single component. Mix heading and body fonts in the same text block. Use font-size alone to differentiate hierarchy (weight must change too).
**Currently wrong**: The system uses `font.weight.400` for body and `font.weight.700` for headings with `font.weight.600` as "emphasis". In practice, 600 and 700 are nearly indistinguishable in many sans-serif fonts. The weight system should use 400 (body), 500 (emphasis/labels), 700 (headings) for maximum perceptual differentiation.

---

### 1.6 Predictable Structure

**Definition**: Every component follows the same visual grammar. Users learn the system once and never need to re-learn it for a new component.

**DO**: Apply the same border-radius to all controls (buttons, inputs, selects, checkboxes). Use the same hover pattern (darken border, lighten background) across all interactive elements. Maintain consistent height scales (sm/md/lg map to the same physical sizes everywhere).
**DON'T**: Give buttons rounded corners but inputs sharp corners. Use different hover patterns for similar elements. Make badge heights different from button heights at the same size.
**Currently wrong**: Buttons use `border.radius.200` (8px), but badges also use `border.radius.200` for the same-named token. Cards use `border.radius.300` (12px). This is actually correct differentiation — controls get 8px, containers get 12px — but this rule isn't explicitly documented anywhere.

---

## 2. Typography System

### 2.1 Font Stack

| Role          | Font          | Justification                                                                                                                                                                                                                     |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Headings**  | Outfit        | Geometric sans-serif with warm, rounded terminals. Projects craft and precision without the coldness of Inter or the genericness of system fonts. Its letter-spacing at large sizes creates the "premium signage" feel. **KEEP.** |
| **Body**      | Source Sans 3 | Adobe's humanist sans-serif. Exceptional readability at small sizes. Its open apertures and moderate x-height make it the ideal complement to Outfit's geometry. **KEEP.**                                                        |
| **Monospace** | Fira Code     | Mozilla heritage, ligature support, slightly warm character. **KEEP.**                                                                                                                                                            |

**Why not Inter?** Inter is the "system font of the indie web" — using it signals "we used whatever was popular." Outfit + Source Sans 3 is a distinctive pairing that no major design system uses. This is a competitive advantage.

**Why not Geist (Vercel's font)?** Geist is beautiful but synonymous with Vercel/Next.js. Using it would undermine Sando's independent identity.

### 2.2 Size Scale

Base unit: **14px (0.875rem)** — body text. This is smaller than the current `font.size.200` (also 0.875rem), confirming alignment.

| Token | Size | rem      | Use                           |
| ----- | ---- | -------- | ----------------------------- |
| `50`  | 10px | 0.625rem | Micro labels, icon badges     |
| `100` | 12px | 0.75rem  | Captions, help text, metadata |
| `200` | 14px | 0.875rem | **Body text (base)**          |
| `300` | 16px | 1rem     | Large body, subheadings       |
| `400` | 18px | 1.125rem | Section headings (h4)         |
| `500` | 20px | 1.25rem  | Page section headings (h3)    |
| `600` | 24px | 1.5rem   | Page headings (h2)            |
| `700` | 32px | 2rem     | Hero headings (h1)            |
| `800` | 40px | 2.5rem   | Display text                  |
| `900` | 48px | 3rem     | Display hero                  |

**Scale rationale**: Approximate major second (1.125) ratio at small sizes, transitioning to a more dramatic jump at display sizes. This creates tight, functional spacing at reading sizes and expressive impact at display sizes.

### 2.3 Weight Philosophy

| Weight             | Value      | When to Use                                                         | When NOT to Use                                    |
| ------------------ | ---------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| **400 (Regular)**  | Body       | Body text, descriptions, paragraphs, form values                    | Headings, labels, navigation items                 |
| **500 (Medium)**   | Emphasis   | Labels, nav items, table headers, button text, emphasis within body | Body text, headings                                |
| **600 (Semibold)** | _Reserved_ | Only for specific flavor overrides (e.g., nori)                     | General use — skip this weight in the Sando flavor |
| **700 (Bold)**     | Heading    | Headings (h1-h6), card titles, section headers, pricing             | Body text, form labels, buttons                    |

**Rule**: In the Sando flagship flavor, only three weights appear in any given screen: 400, 500, 700. The 600 weight exists in ingredients for flavors that want a denser weight stack (e.g., nori, tonkatsu) but the Sando flavor explicitly skips it.

### 2.4 Line Height Rules

| Context                              | Value | Rationale                                                    |
| ------------------------------------ | ----- | ------------------------------------------------------------ |
| **Headings** (h1-h3)                 | 1.2   | Tight — large text has built-in visual space between lines   |
| **Subheadings** (h4-h6)              | 1.3   | Slightly more open — bridging heading and body rhythm        |
| **Body text**                        | 1.6   | Generous — optimized for reading long-form content at 14px   |
| **Captions / labels**                | 1.4   | Moderate — small text needs tighter rhythm to feel cohesive  |
| **Single-line UI** (buttons, inputs) | 1.0   | None — height comes from min-height/padding, not line-height |

### 2.5 Letter Spacing Rules

| Context              | Value    | Rule                                                   |
| -------------------- | -------- | ------------------------------------------------------ |
| Display text (≥32px) | -0.025em | Tighten — large text looks loose at default tracking   |
| Headings (20-31px)   | -0.01em  | Slightly tighten — subtle refinement                   |
| Body text (14-18px)  | 0        | Default — never adjust body tracking                   |
| Captions (10-12px)   | 0.025em  | Widen slightly — small text needs air                  |
| ALL-CAPS labels      | 0.05em   | Always widen caps — they're visually tighter by nature |
| Monospace            | 0        | Never adjust — mono fonts are pre-spaced               |

---

## 3. Color Philosophy

### 3.1 The Feeling of Sando's Palette

The Sando flagship flavor should evoke: **a specialty café counter at golden hour**. Think: warm wood surfaces, crisp white ceramic, a single accent of toasted sesame. The palette is built on warmth without sweetness, richness without saturation.

The current amber accent (mapping to `color.amber.600`) reads as "notification yellow" or "construction warning" — it doesn't feel premium. The accent needs to pivot.

### 3.2 Accent Color Direction: From Amber to Kohaku Gold

**Current state**: Pure amber at hue ~58-95° in OKLCH. This is the same amber used by every "warm" design system and reads as generic.

**New direction**: **Kohaku Gold** — a deeper, warmer, more burnished gold that sits between amber and orange on the hue wheel. Think of it as "toasted sesame" color — not the bright yellow of raw amber, but the deep, rich gold of perfectly toasted shokupan bread.

| Quality    | Current Amber                       | Target Kohaku Gold                           |
| ---------- | ----------------------------------- | -------------------------------------------- |
| Hue range  | 58-95° (yellow-amber)               | 40-55° (gold-orange)                         |
| Feeling    | Notification, caution, construction | Crafted, premium, warm authority             |
| Analog     | Bumble app, warning banners         | Luxury packaging, aged whiskey, sesame crust |
| Saturation | Medium-high (screams for attention) | Medium (confident, doesn't scream)           |

**Critical**: The hue shift is subtle (moving roughly 20-30° warmer on the OKLCH wheel) but the perceptual difference is dramatic. This moves the accent from "safety yellow" territory into "burnished gold" territory. The exact ingredient tokens will be determined by the tokens specialist, but the direction is: **warmer hue, slightly lower chroma, same lightness scale**.

### 3.3 Neutral Strategy

**Warm whites**: All neutral surfaces in the Sando flavor use `neutralWarm` — this is correct and should remain. The warmth creates the "natural material" feeling that distinguishes Sando from clinical design systems.

| Surface                | Token                        | Feeling                              |
| ---------------------- | ---------------------------- | ------------------------------------ |
| **Page base**          | `neutralWarm.50`             | Parchment, not paper                 |
| **Card/panel surface** | `neutralWarm.100`            | Linen texture (perceptual)           |
| **Raised element**     | `white`                      | Clean ceramic — the lightest surface |
| **Overlay backdrop**   | `neutral.950` (with opacity) | Deep shadow, not pure black          |

**The neutralWarm curve must maintain its warm bias at every step.** Even at 800 and 900, the grays should read as "charcoal" not "slate." This is what creates the perception of premium natural materials versus digital interface.

### 3.4 Semantic Color Rules

Color is used in exactly four contexts:

1. **Action** — Interactive elements only (buttons, links, toggles). The accent color.
2. **State** — Feedback only (error=red, success=green, warning=yellow, info=blue). These are universal and never change per flavor.
3. **Focus** — Accessibility indicators only. Uses the accent hue but at a specific width and offset that makes it unmistakable.
4. **Surface hierarchy** — Background shade differences (base → surface → raised → overlay). Neutral colors only, never chromatic.

**Explicitly forbidden**: Using chromatic color for decorative purposes. No colored backgrounds for sections. No gradient fills. No colored dividers. No tinted cards. If you want visual variety, change the surface level — don't add color.

### 3.5 Dark Mode Philosophy

**Approach: Depth, not inversion.**

The nori flavor demonstrates this already — dark mode isn't "swap white for black." It's "create depth through layered dark surfaces."

Rules for dark mode:

- **Base surface**: Near-black with warm undertone (not pure `#000`)
- **Surface stacking**: Each level gets _lighter_, not darker (950 → 900 → 800)
- **Text**: Light warm neutrals, not pure white (pure white on dark backgrounds causes eye strain)
- **Accent**: Shifts lighter (600 → 400-500 range) to maintain contrast ratio on dark backgrounds
- **Shadows**: Become more subtle or disappear entirely — dark surfaces don't cast visible shadows. Borders take over the job.
- **Borders**: Become more prominent (they're the primary spatial separator in dark mode)

**Key principle**: In light mode, shadows define depth. In dark mode, borders define depth. The transition is automatic via mode tokens.

---

## 4. Spacing & Density

### 4.1 Base Unit

**4px grid** — confirmed and non-negotiable. Every spacing value is a multiple of 4px (0.25rem).

The space scale: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 64, 80, 96, 128, 160, 192, 256px.

### 4.2 Density Philosophy: "Comfortable"

Sando's density is **comfortable** — not compact (Vercel), not spacious (Material 3). It's the density of a well-designed print layout: generous enough to breathe, tight enough to feel intentional.

| Density         | Reference System      | Feeling                    | Sando Position  |
| --------------- | --------------------- | -------------------------- | --------------- |
| Compact         | Vercel, Linear        | Data-dense, developer tool | ❌ Too tight    |
| **Comfortable** | **Stripe, Notion**    | **Professional, readable** | **✅ This one** |
| Spacious        | Material 3, Apple HIG | Touch-friendly, consumer   | ❌ Too loose    |

### 4.3 Control Inner Padding Rules

Controls (buttons, inputs, selects) follow this matrix:

| Size   | Min Height      | Padding Inline | Padding Block             | Font Size       |
| ------ | --------------- | -------------- | ------------------------- | --------------- |
| **sm** | 28px (space.7)  | 8px (space.2)  | 4px (space.1)             | 12px (font.100) |
| **md** | 36px (space.9)  | 12px (space.3) | 6px — ⚠️ NOT on 4px grid  | 14px (font.200) |
| **lg** | 44px (space.11) | 20px (space.5) | 10px — ⚠️ NOT on 4px grid | 14px (font.200) |

**Issue identified**: The current system uses `space.8` (32px) for md control height and `space.10` (40px) for lg. These feel too round-number-y and don't account for the fact that inline padding + font-size + line-height determine the _actual_ height. The min-height should be the _result_ of the content + padding formula, not an arbitrary number. **Recommendation**: Define control heights as `font-size × line-height + (padding-block × 2) + (border-width × 2)`, and let the token be the _output_ of that math, documented for each size.

### 4.4 Gap Rules

| Context                                                         | Gap Value | Token                   |
| --------------------------------------------------------------- | --------- | ----------------------- |
| Between inline items in a button/badge (icon + text)            | 4px       | `space.1`               |
| Between sibling controls in a group (button group, input group) | 8px       | `space.2`               |
| Between a label and its control                                 | 4px       | `space.1`               |
| Between stacked form fields                                     | 12-16px   | `space.3` to `space.4`  |
| Between sections in a card                                      | 12px      | `space.3`               |
| Between cards in a grid                                         | 16-24px   | `space.4` to `space.6`  |
| Between major page sections                                     | 32-48px   | `space.8` to `space.12` |

### 4.5 When to Use More vs Less Space

**More space when**:

- Transitioning between unrelated content groups
- Around hero/display content
- Between major navigational landmarks
- First element after a page header

**Less space when**:

- Items are part of the same logical group (label + input, icon + text)
- Inside compact UI (table rows, dropdown options, toolbars)
- Between related metadata (author + date, price + currency)

---

## 5. Border & Surface Language

This section addresses the most visible failures in current components.

### 5.1 Border Width Rules

| Width                        | Value              | When to Use                                                                      | Never Use For                               |
| ---------------------------- | ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------- |
| **1px** (`border.width.50`)  | Structural borders | Control edges (inputs, selects), card outlines, dividers, table cells            | Focus rings, active indicators              |
| **2px** (`border.width.100`) | Emphasis borders   | Focus rings, active tab indicators, selected state borders, error state borders  | Structural borders, card outlines, dividers |
| **0px**                      | No border          | Solid-variant buttons, ghost buttons in rest state, filled cards, elevated cards | —                                           |

**Rule**: A component should have EITHER a border OR a shadow at rest, never both simultaneously. The exception is the outlined variant of controls (input, select) which has a 1px border and gains a shadow on focus via the focus ring.

### 5.2 Border Color Rules

Borders are **barely-there by default** and **darken on interaction**:

| State       | Color                      | Opacity Feel | Description                                                      |
| ----------- | -------------------------- | ------------ | ---------------------------------------------------------------- |
| **Resting** | `neutralWarm.200`          | Ghost-like   | You notice it subconsciously but it doesn't compete with content |
| **Default** | `neutralWarm.300`          | Structural   | Clearly defines an edge without drawing attention                |
| **Hover**   | `neutralWarm.400-500`      | Assertive    | The border "wakes up" to confirm interactivity                   |
| **Focus**   | Accent color (Kohaku Gold) | Prominent    | Unmistakable — this is where I am                                |
| **Error**   | `red.400`                  | Alert        | Combined with red text/icon, not border alone                    |

**Key insight from Stripe**: Stripe's borders are often so subtle you don't consciously see them. You _feel_ the edges. This is the target for Sando's resting state borders. On hover, the border darkening is the _primary_ hover signal for outlined elements.

### 5.3 Border Radius System

| Token             | Value                      | Applied To                                                      | Visual Intent                                         |
| ----------------- | -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| `radius.muted`    | 4px (`border.radius.100`)  | Inline elements: badges, tags, code blocks                      | Barely rounded — just enough to not be sharp          |
| `radius.default`  | 8px (`border.radius.200`)  | **All controls**: buttons, inputs, selects, checkboxes, toggles | The signature Sando rounding — visible but restrained |
| `radius.emphasis` | 12px (`border.radius.300`) | **Containers**: cards, modals, panels, dropdowns, popovers      | More generous — containers feel softer                |
| `radius.circular` | 50%                        | Avatars, status dots, round icon buttons                        | Perfect circle                                        |
| `radius.full`     | 9999px                     | Pill-shaped elements: pill badges, pill buttons (variant)       | Full pill shape                                       |

**Rule**: Controls and containers use DIFFERENT radii. A button inside a card should have visibly less rounding than the card itself. This creates visual nesting: the container "holds" its children. The current implementation already does this (8px controls, 12px containers) — this rule formalizes it.

**Exception**: When a control IS the container (a large button that acts as a card-like CTA), use the container radius (12px).

### 5.4 Surface Hierarchy

Four distinct surface levels, differentiated by background color alone (no borders or shadows needed to tell them apart):

| Level       | Token                | Value (Light)             | Value (Dark)              | Used For                                      |
| ----------- | -------------------- | ------------------------- | ------------------------- | --------------------------------------------- |
| **Base**    | `background.base`    | neutralWarm.50            | neutral.950               | Page background, the canvas                   |
| **Surface** | `background.surface` | neutralWarm.100           | neutral.900               | Sidebar, secondary areas, grouping            |
| **Raised**  | `background.raised`  | white                     | neutral.800               | Cards, modals, popovers — "on top of" surface |
| **Overlay** | `background.overlay` | neutral.950 @ 60% opacity | neutral.950 @ 80% opacity | Backdrop behind modals/drawers                |

**Rule for choosing border vs shadow**:

- Element is **on base/surface** → Use border (outlined card) OR shadow (elevated card), never both
- Element is **floating** (dropdown, popover, tooltip) → Use shadow (these need perceived depth)
- Element is **inline** (badge, tag) → Use border only (shadows on tiny elements look wrong)
- Element is a **control** (button, input) → Use border (controls are defined by their edges)

### 5.5 The "Stripe Card" Rule

Stripe's cards have a specific quality: they look like physical cards on a table. Not flat, not aggressively 3D. Just... present. This is achieved by:

1. Pure white background (one step lighter than the page)
2. A very subtle shadow (1-3px blur, 4-6% opacity)
3. A barely-there border (1px at ~10% opacity warm gray)
4. 12px radius (soft but not bubbly)

Sando cards in the elevated variant should match this formula. The outlined variant drops the shadow and uses a slightly more visible border instead.

---

## 6. Elevation & Shadow Language

### 6.1 Philosophy

**70% Stripe (soft layered shadows) / 30% Vercel (borders do the work)**

The rule: Shadows are used sparingly and always as _layered pairs_ — a tight contact shadow + a wider ambient shadow. Single-shadow elements look flat or cheap. Vercel's influence means many elements (controls, inline components) use NO shadow at all — just borders.

### 6.2 Elevation Levels

| Level | Name     | Shadow                                                                          | Used For                                                    |
| ----- | -------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **0** | Flat     | `none`                                                                          | Resting controls, inline elements, non-interactive surfaces |
| **1** | Raised   | Contact: `0 1px 2px rgba(warm, 0.06)` + Ambient: `0 1px 3px rgba(warm, 0.08)`   | Cards, tiles, raised sections                               |
| **2** | Floating | Contact: `0 2px 4px rgba(warm, 0.06)` + Ambient: `0 4px 8px rgba(warm, 0.10)`   | Dropdowns, popovers, tooltips                               |
| **3** | Overlay  | Contact: `0 4px 8px rgba(warm, 0.08)` + Ambient: `0 12px 24px rgba(warm, 0.12)` | Modals, dialogs, command palettes                           |

### 6.3 Shadow Rules

1. **Warm tint**: Shadows should use a warm rgba, not pure black. Use the neutralWarm hue (e.g., `oklch(0.3 0.02 60)`) as the shadow color instead of `rgba(0,0,0,x)`. This is what Stripe does — their shadows have a slight warm brown tint.

2. **Always layered**: Every shadow is TWO shadows — a tight "contact" shadow (1-4px blur) that grounds the element, plus a wider "ambient" shadow (3-24px blur) that creates atmosphere. Single shadows look flat.

3. **Directional subtlety**: All shadows offset slightly downward (y: 1-4px, x: 0). This creates consistent "top-lit" illumination. No inset shadows, no left/right shadows, no upward shadows.

4. **Hover escalation**: Interactive elevated elements (clickable cards) escalate one level on hover: Level 1 → Level 2. This confirms clickability.

5. **Press reduction**: On active/press, shadows reduce to Level 0 (flat) while `scale(0.98)` applies. The element "presses into" the surface.

6. **Dark mode**: Shadows are invisible on dark backgrounds. In dark mode, elevation is communicated through lighter backgrounds + stronger borders. The shadow tokens should resolve to `none` or near-zero in dark mode.

### 6.4 Current Issues with Elevation Tokens

The current `elevation.json` uses Tailwind-style generic rgba shadows:

```
"100": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
```

**Problem**: These are cold, neutral-gray shadows. On a warm-neutral surface (`neutralWarm.50`), cold shadows create a subtle visual discord — the eye registers something "off" even if it can't articulate what.

**Action for tokens specialist**: Replace `rgba(0,0,0,x)` shadow values with warm-tinted alternatives. Keep the same blur radii and offsets but shift the color to match the neutralWarm family.

---

## 7. Interaction Language

### 7.1 Hover

What changes on hover depends on the element type:

| Element Type             | Hover Effect                              | Duration | Details                                                      |
| ------------------------ | ----------------------------------------- | -------- | ------------------------------------------------------------ |
| **Solid button**         | Background darkens one step               | 150ms    | 600 → 700 (one ingredient step darker)                       |
| **Outline button**       | Border darkens + subtle background tint   | 150ms    | Border: 300 → 400. Background: transparent → neutralWarm.100 |
| **Ghost button**         | Background tints                          | 150ms    | transparent → neutralWarm.100                                |
| **Text button**          | Color shifts to accent                    | 150ms    | text.body → accent color                                     |
| **Link**                 | Color darkens one step, underline appears | 150ms    | 600 → 700                                                    |
| **Card (clickable)**     | Shadow escalates + translateY(-2px)       | 200ms    | Level 1 → Level 2, slight lift                               |
| **Card (non-clickable)** | Nothing                                   | —        | Non-interactive elements don't react to hover                |
| **Input**                | Border darkens                            | 150ms    | 300 → accent (emphasis)                                      |
| **Table row**            | Background tints                          | 100ms    | transparent → neutralWarm.50                                 |
| **Nav item**             | Background tints                          | 150ms    | transparent → neutralWarm.100                                |

**Rule**: The hover response must be _immediate enough to feel responsive_ (≤150ms) but _not instant_ (0ms feels glitchy). The 100-150ms range is the sweet spot.

### 7.2 Press / Active

**Universal rule**: `transform: scale(0.98)` on all pressable elements. This is the "Warm & Alive" contract — the element "stamps" into the surface.

**Exceptions**:

- Text links: No scale transform (just darken one more step)
- Table rows: No scale transform (would distort layout)
- Nav items: No scale transform (same reason)
- Elements smaller than 24px: No scale transform (imperceptible at small sizes)

**Additional active effects**:

- Solid buttons: Background darkens to same value as hover (700 → 700, no further darkening)
- Cards: Shadow reduces to Level 0, translateY returns to 0
- Inputs: No active state (inputs focus, they don't "press")

### 7.3 Focus

Focus indicators are the **most important accessibility feature** and must be unmistakable:

| Property          | Value                                                        | Why                                                                                        |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Color**         | Accent color (Kohaku Gold at 600 step in light, 400 in dark) | Consistent with brand, high visibility                                                     |
| **Style**         | `outline` (not box-shadow, not border)                       | Outline doesn't affect layout. Box-shadow focus rings break in overflow:hidden containers. |
| **Width**         | 2px                                                          | Meets WCAG 2.4.12 "Focus Appearance" (minimum 2px)                                         |
| **Offset**        | 2px                                                          | Small gap between element edge and ring creates visual clarity                             |
| **Border-radius** | Matches the element's border-radius + offset                 | A rounded button gets a rounded focus ring                                                 |
| **Visibility**    | `:focus-visible` only (not `:focus`)                         | Mouse clicks don't show ring; keyboard navigation does                                     |

**Rule**: Focus rings are NEVER overridden, hidden, or styled differently per component. They are universal and consistent. The only variance is the border-radius matching.

### 7.4 Transitions

| Category          | Duration | Easing      | Examples                                   |
| ----------------- | -------- | ----------- | ------------------------------------------ |
| **State changes** | 150ms    | ease-out    | Hover on/off, active, color changes        |
| **Layout shifts** | 200ms    | ease-in-out | Accordion expand, drawer slide, tab switch |
| **Entrances**     | 200ms    | ease-out    | Dropdown appear, tooltip show, modal open  |
| **Exits**         | 150ms    | ease-in     | Dropdown close, tooltip hide, modal close  |
| **Loading**       | 500ms    | linear      | Skeleton pulse, spinner rotation           |

**Rule**: Exit animations are 25% faster than entrance animations. This feels snappy — the thing arrives smoothly but leaves quickly when dismissed.

### 7.5 Loading States

Three loading patterns, each for different contexts:

| Pattern               | When to Use                            | Specification                                                                                                                                                 |
| --------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Skeleton**          | Content is loading, layout is known    | Neutral pulse animation at background.surface color. Match the shape of the expected content (text = rectangle, avatar = circle). Duration: 1.5s pulse cycle. |
| **Spinner**           | Action is processing, duration unknown | 2px border circle with accent color on one quarter. Rotation: 500ms linear infinite. Sizes: xs (12px), sm (16px), md (24px), lg (32px).                       |
| **Opacity reduction** | Content is loaded but refreshing/stale | Reduce to 60% opacity (`opacity.600`). No animation — just dim. Overlay a spinner if action is actively processing.                                           |

### 7.6 Disabled States

**Disabled = reduced opacity + pointer-events: none + muted colors.**

| Property           | Value                           | Why                                           |
| ------------------ | ------------------------------- | --------------------------------------------- |
| **Opacity**        | 0.6 (`opacity.600`)             | Clear visual signal of unavailability         |
| **Cursor**         | `not-allowed`                   | Immediate feedback even before hover          |
| **Background**     | `neutralWarm.100`               | Desaturated, neutral — loses all accent color |
| **Text**           | `neutralWarm.400`               | Barely readable — intentionally reduced       |
| **Border**         | `neutralWarm.200`               | Near-invisible — edges fade away              |
| **Pointer events** | `none`                          | Prevents interaction entirely                 |
| **Focus**          | Not focusable (`tabindex="-1"`) | Disabled elements are removed from tab order  |
| **Scale on press** | None                            | No feedback — the element is inert            |

**Rule**: Disabled elements lose ALL chromatic color. No accent tint, no state color. They become monochromatic warm gray. This is non-negotiable — a disabled red "delete" button must not look red.

---

## 8. Component Personality Rules

### 8.1 Controls (Button, Input, Select, Checkbox, Radio, Switch)

**Density**: Comfortable. The md size is the default and should feel "right" without any size prop. Minimum touch target: 36px height (md).

**Border treatment**:

- Outlined controls: 1px `neutralWarm.300` at rest, darkening on hover
- Solid controls: No border (background color defines the edge)
- Ghost controls: No border, no background at rest
- All controls: Same 8px border-radius

**Hover behavior** (all controls):

1. Border darkens (if visible)
2. Background shifts one step (if not solid)
3. Transition: 150ms ease-out
4. NO scale change on hover (scale is reserved for press)

**Disabled treatment**: Unified across all controls (see §7.6).

**Alignment rule**: When controls appear side-by-side (button + input, checkbox + label, select + button), they must share the same visual height at the same size. `sm` controls are all 28px. `md` controls are all 36px. `lg` controls are all 44px.

### 8.2 Containers (Card, Panel, Modal, Drawer)

**Shadow level**:

- Card elevated: Level 1 (raised)
- Card outlined: Level 0 (flat, border-defined)
- Card filled: Level 0 (flat, background-defined)
- Modal/Dialog: Level 3 (overlay)
- Dropdown/Popover: Level 2 (floating)
- Drawer: Level 3 (overlay)

**Border treatment**:

- Elevated cards: Optional 1px `neutralWarm.200` border (so subtle it's barely visible). Combined with shadow for definition.
- Outlined cards: 1px `neutralWarm.300` border. No shadow.
- Modals: No border in light mode (shadow defines edge). 1px border in dark mode (shadow is invisible).
- Dropdowns: 1px border + Level 2 shadow (belt and suspenders — dropdowns need clear definition).

**Radius rule**: All containers use 12px (`border.radius.300`). This is larger than controls (8px) and creates a visual "container" feeling — the rounded corners signal "this holds things."

**Padding**: Containers use the inset scale: sm=4px, md=12px, lg=20px. Cards default to md. Modals default to lg. Dropdowns default to md.

### 8.3 Feedback (Badge, Tag, Alert, Toast)

**Badge personality**: Badges are compact metadata indicators. They are **not buttons** — they don't have hover states or click handlers (unless interactive variant). Their visual treatment:

| Variant     | Background                             | Text                       | Border                | When to Use                   |
| ----------- | -------------------------------------- | -------------------------- | --------------------- | ----------------------------- |
| **Solid**   | Accent or state color                  | White (on-solid)           | None                  | High emphasis: counts, status |
| **Soft**    | Tinted background (100 step of accent) | Dark accent (700-900 step) | None                  | Medium emphasis: categories   |
| **Outline** | Transparent                            | Body or accent text        | 1px accent or neutral | Low emphasis: metadata        |
| **Surface** | Raised (white)                         | Body or accent text        | 1px muted border      | Neutral: tags on cards        |

**What makes a badge distinctly "badge"**: Small physical size (min-height matches `xs` control size: 20px), tighter padding than buttons, and the `radius.muted` (4px) border-radius — NOT the control radius (8px). This differentiates badges from small buttons visually.

**Alert personality**: Full-width feedback blocks. Always include a left border accent (4px `border.width.200` in the state color) plus a tinted background (100 step of the state color). Icon + text + optional close action.

**Toast personality**: Floating notifications. Use Level 2 shadow (floating elevation). White background with a left-border accent like alerts. Auto-dismiss after 5 seconds. Stacks from bottom-right.

### 8.4 Navigation (Tabs, Breadcrumb, Pagination)

**Active state treatment**:

- **Tabs**: Active tab has a 2px bottom border in accent color. Inactive tabs have no border. Background: transparent (active and inactive).
- **Breadcrumb**: Current item is bold (500 weight) with no link styling. Previous items are links. Separator: `/` or `>` in muted color (`neutralWarm.400`).
- **Pagination**: Active page has solid accent background + white text (like a solid button). Inactive pages are ghost buttons. Previous/Next are outline buttons.

**Separator style**:

- Tab groups: Separated by a full-width 1px `neutralWarm.200` border below the tab bar
- Breadcrumb items: Separated by a `/` character in muted text
- Pagination items: Separated by 4px gap (no visual separator)

---

## 9. Brand Identity Direction for the Sando Flavor

### 9.1 Creative Brief: Kohaku Gold

The Sando flagship flavor is named for the Japanese sandwich. The visual metaphor: **sesame-crusted shokupan bread** — golden, toasted, warm, crafted with precision.

**Palette direction**:

| Role             | Feeling                                                                        | Hue Territory                                                                          |
| ---------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Accent**       | Burnished gold — toasted sesame, kohaku (amber stone), craft whiskey           | Warm gold, hue 40-55° in OKLCH. Lower chroma than pure amber. More orange than yellow. |
| **Neutral base** | Warm parchment — unbleached paper, natural linen, light wood                   | neutralWarm palette, very slight warm tint even at lightest steps                      |
| **Neutral dark** | Charcoal — not slate, not blue-gray. Warm darkness like roasted coffee grounds | neutralWarm 800-950, maintaining warm undertone                                        |
| **Emphasis**     | Subtle warmth — not a "highlight color" but a "this area is different" signal  | neutralWarm.200 (barely tinted), NOT accent color                                      |

### 9.2 The "Sesame Bread" Metaphor Translated to Design Tokens

| Sandwich Element              | Design Token Mapping                | Intent                                                               |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| **Toasted sesame crust**      | Accent color (Kohaku Gold 600)      | The most visible, characterful element — small but defining          |
| **Soft white bread interior** | background.raised (white)           | Clean, pure, generous — the foundation that holds everything         |
| **Warm bread surface**        | background.base (neutralWarm.50)    | Barely-there warmth that distinguishes from cold white               |
| **Filling precision**         | Tight spacing, consistent alignment | The craft is in the assembly — nothing sloppy, nothing excessive     |
| **Deli paper wrapper**        | border.default (neutralWarm.300)    | Thin, functional, wrapping — holds the shape without being the point |

### 9.3 Premium Without Losing Warmth

The tension to resolve: "premium" often means "cold" (think luxury fashion: black, white, minimal). Sando must feel premium while staying warm. How:

1. **Whitespace creates premium, not color**. Generous padding, consistent spacing, unhurried layout.
2. **Typography creates premium, not decoration**. Outfit at 700 weight creates confident headlines. Source Sans 3 at 400 creates readable, un-fussy body text.
3. **Restraint creates premium, not richness**. The accent color appears LESS, not more. A Stripe dashboard uses blue on maybe 5% of pixels. Sando should use Kohaku Gold on the same percentage.
4. **Warm shadows create premium, not harsh edges**. The dual-shadow system (contact + ambient) with warm tint creates that "physical object" quality that cold, single shadows can't achieve.

### 9.4 How Sando Differs From Other Flavors

| Flavor               | Character            | Accent Family           | Neutral Family | Identity                                 |
| -------------------- | -------------------- | ----------------------- | -------------- | ---------------------------------------- |
| **Sando** (flagship) | Warm craft precision | Kohaku Gold (warm gold) | neutralWarm    | The premium default — sesame bread craft |
| **Nori**             | Dark ink discipline  | Amber (brighter gold)   | neutral (cold) | The midnight workshop — dark-first       |
| **Original**         | Clean baseline       | Orange (classic)        | neutral        | The reference — clean, un-opinionated    |
| **Strawberry**       | Romantic elegance    | Deep rose/wine          | neutralWarm    | Parisian patisserie — warm + pink        |
| **Egg-salad**        | Soft warmth          | Pale golden             | neutralWarm    | Gentle, approachable — soft yellows      |
| **Kiwi**             | Fresh energy         | Green                   | neutralCool    | Fresh cuts — green + bright              |
| **Tonkatsu**         | Deep richness        | Deep brown              | neutralWarm    | Hearty, grounded — deep browns           |

### 9.5 Elevator Pitch

> **The Sando flavor** is what happens when you apply the craft of a Japanese sandwich shop to a design system. Warm gold accents on parchment-white surfaces. Borders so subtle they feel like creases in deli paper. Shadows that whisper depth rather than shouting it. Typography that's confident without being aggressive. It's Stripe's premium warmth meets Vercel's technical precision — and it looks like nothing else in the ecosystem. Pick `flavor="sando"` and your product instantly feels handcrafted, not generated.

---

## 10. Anti-Patterns (What Sando is NOT)

### 10.1 ❌ Gratuitous Color

Sando never uses chromatic color as decoration. No colored backgrounds for sections. No gradient fills on surfaces. No tinted cards to "add visual interest." Color is reserved for actions, states, and focus — everything else is warm neutral.

**Currently violated by**: `background.emphasis` mapping to `amber.100`. This should map to a neutral warm tint, not the accent color. Emphasis backgrounds should be perceptibly "different" from base, but not "colored."

### 10.2 ❌ Cold Shadows

Sando never uses `rgba(0,0,0,x)` shadows. All shadows are warm-tinted to match the neutral-warm surface palette. Cold shadows on warm surfaces create perceptual discord.

**Currently violated by**: Every shadow in `elevation.json`.

### 10.3 ❌ Thick Borders

Sando never uses borders thicker than 1px for structural purposes. 2px is reserved exclusively for focus rings and active-state indicators. No 3px borders. No 4px borders. No "accent border" thickness.

**Exception**: Alert components use a 4px left-border as a state indicator. This is the ONLY structural use of thick borders, and it's always combined with a color that communicates meaning (red=error, green=success).

### 10.4 ❌ Bouncy Motion

Sando never uses spring, bounce, elastic, or overshoot easings. Motion is organic and natural — `ease-out` for arrivals, `ease-in` for departures, `ease-in-out` for persistent state changes. No playful wobble. No jelly effects. Sando is warm, not whimsical.

### 10.5 ❌ Scale on Hover

Sando never applies scale transforms on hover. `scale(0.98)` is reserved for the **press/active** state only. Scaling on hover feels unstable — the element "breathes" when your cursor passes over it, which conflicts with the principle of quiet stability.

**Currently correct**: The flavor.json defines `scale.hover.default` as `scale.100` (no scale), confirming this is already the intent.

### 10.6 ❌ Decorative Animations

Sando never animates idle elements. No pulsing buttons, no floating cards, no rotating icons (except spinners). No entrance animations on page load. No parallax scrolling effects. Every animation is a response to user action.

### 10.7 ❌ Font Mixing Within Context

Sando never uses the heading font (Outfit) for body text or the body font (Source Sans 3) for headings. Each font has exactly one role. Mixing fonts within the same hierarchy level creates visual noise.

### 10.8 ❌ Pure Black or Pure White

In the Sando flavor, `#000000` and `#FFFFFF` are used only for specific functional purposes:

- Pure white: `raised` surface background (cards), `on-solid` text
- Pure black: Never as a background (use neutralWarm.950)
- Pure black text: Never (use neutralWarm.800 for body, neutralWarm.950 for headings)

The warm neutral palette exists specifically to avoid the harshness of pure black and white.

### 10.9 ❌ Opacity as Primary Disabled Signal

Sando never relies on opacity ALONE for disabled states. Disabled elements also change their colors to neutral (removing all accent/state chromatic color). Opacity reduction is an _additional_ signal, not the only one. Relying solely on opacity fails users who have difficulty perceiving transparency differences.

### 10.10 ❌ Inconsistent Variant Naming

Sando never uses different words for the same concept. If buttons have `solid/outline/ghost`, then all other controls must use the same terms. No `filled` vs `solid` confusion. No `bordered` vs `outline` alternatives. The variant vocabulary is:

| Term       | Meaning                               | Used By                        |
| ---------- | ------------------------------------- | ------------------------------ |
| `solid`    | Filled with accent/action color       | Buttons, badges                |
| `outline`  | Border-defined, transparent fill      | Buttons, badges, cards, inputs |
| `ghost`    | No border, no fill at rest            | Buttons                        |
| `text`     | No border, no fill, just text         | Buttons (link-style)           |
| `soft`     | Tinted fill (light version of accent) | Badges, alerts                 |
| `surface`  | White/raised fill with border         | Badges                         |
| `elevated` | Shadow-defined, raised fill           | Cards                          |
| `filled`   | Solid neutral fill (non-accent)       | Cards, inputs                  |

---

## Implementation Priority

This document should be actioned in the following order:

### Phase 1: Token Foundation (Tokens Specialist)

1. **Redesign the Sando flavor accent** — shift from amber to Kohaku Gold (hue 40-55°)
2. **Fix elevation shadows** — replace cold rgba with warm-tinted shadows
3. **Remap `background.emphasis`** — from `amber.100` to `neutralWarm.200`
4. **Validate weight system** — ensure 400/500/700 are perceptually distinct

### Phase 2: Component Audit (Developer)

1. **Audit all components** against the surface/border rules in §5
2. **Standardize hover patterns** per §7.1
3. **Verify control height consistency** across all sizes
4. **Ensure disabled states** remove all chromatic color per §7.6

### Phase 3: Documentation (Documenter)

1. **Update Storybook** with design language reference stories
2. **Create visual regression** stories for each principle
3. **Document the "why"** behind each decision for consumer developers

---

## Appendix: Decision Log

| Decision                         | Rationale                                                                  | Alternatives Considered                                                               |
| -------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Kohaku Gold over pure amber      | Amber reads as "warning/notification", not "premium brand"                 | Pure orange (too aggressive), copper (too dark), gold-yellow (too close to egg-salad) |
| 8px controls / 12px containers   | Creates visible nesting hierarchy                                          | Uniform radius (no hierarchy), 6px/10px (too subtle), 8px/16px (too dramatic)         |
| Warm-tinted shadows              | Cold shadows on warm surfaces create perceptual discord                    | Pure black shadows (generic), colored shadows (too Stripe-specific)                   |
| Three weights only (400/500/700) | Maximum perceptual differentiation                                         | Four weights (too many choices), two weights (not enough hierarchy)                   |
| Outfit + Source Sans 3           | Distinctive pairing no major DS uses. Warm geometry + humanist readability | Inter (overused), Geist (Vercel-branded), system fonts (no personality)               |
| 150ms hover / 200ms layout       | State feels instant, layout feels smooth                                   | 200ms for all (hovers feel sluggish), 100ms for all (layouts feel jarring)            |
| Focus: outline not box-shadow    | Outline doesn't affect layout, works in overflow:hidden                    | Box-shadow (breaks in containers), border (shifts layout)                             |
