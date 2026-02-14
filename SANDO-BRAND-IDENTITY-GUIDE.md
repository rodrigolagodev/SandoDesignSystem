🍱 SANDO BRAND IDENTITY GUIDE

The Complete Brand Strategy for Sando Design System

Version: 1.0.0
Date: February 2026
Author: UX Design Specialist

TABLE OF CONTENTS

Brand Essence
Color Palette
Typography
Visual Elements
Brand Application
Competitive Differentiation
1. BRAND ESSENCE

1.1 Brand Story

The Origin: More Than Just a Sandwich

Sando (サンド) is the Japanese word for "sandwich"—but calling a Katsu Sando "just a sandwich" is like calling a design system "just some components." The Katsu Sando represents something far more meaningful: the Japanese philosophy of elevating the ordinary into the extraordinary through meticulous attention to detail.

The Katsu Sando Philosophy

A proper Katsu Sando is deceptively simple—soft milk bread, crispy tonkatsu cutlet, and tangy sauce. But behind that simplicity lies:

Shokunin Spirit (職人気質): The craftsman's dedication to mastery. Each element—bread softness, cutlet crispiness, sauce balance—is perfected individually before assembly.
Kodawari (こだわり): An uncompromising commitment to quality. The bread must be shokupan (milk bread), never regular bread. The cutlet must be panko-crusted, never regular breadcrumbs.
Harmony Over Heroics: No single ingredient dominates. The bread doesn't outshine the meat, the sauce doesn't overwhelm—everything works together in perfect balance.
The Design System Parallel

Just as a Katsu Sando chef spends years perfecting each component before assembling the whole, Sando Design System invests in foundational excellence:

Culinary Element	Design System Element	Meaning
Shokupan (Milk Bread)	Ingredients (Layer 1)	The foundation that holds everything together—soft, reliable, consistent
Tonkatsu (Cutlet)	Flavors (Layer 2)	The character, the taste, the brand identity
Sauce & Garnish	Recipes (Layer 3)	The final assembly, ready to serve
Why "Sando" (Not "Sandwich")

"Sando" deliberately uses the Japanese term because:

Cultural Distinction: It signals that this isn't a generic sandwich—it's something crafted with intention
Accessibility: Like the design system, "Sando" is approachable and easy to say
Memorability: Short, punchy, distinctive—stands out in a sea of "UI", "Kit", and "System" suffixes
Philosophy: Embraces the Japanese aesthetic principles woven throughout the system
The Three-Layer Story

"Start with the basics, season with meaning, and serve with style."

Layer 1 - Ingredients: Like gathering the finest shokupan flour and aged pork, we start with perceptually perfect OKLCH colors, carefully measured spacing units, and proven typography scales. Raw materials with no opinion on how they'll be used.

Layer 2 - Flavors: The chef's signature. Will it be classic Tonkatsu with warm amber tones? Fresh Strawberry with pink accents? Each flavor tells a different brand story using the same quality ingredients.

Layer 3 - Recipes: The final dish, plated and ready. Buttons, cards, inputs—components assembled from Flavors, ready to serve to users. Consistent quality, infinite variety.

1.2 Brand Values

The 7 Pillars of Sando

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   1. CRAFTSMANSHIP     │  "We spend months so you spend minutes"        │
│   2. ACCESSIBILITY     │  "Every user, every context, always"           │
│   3. INTENTIONALITY    │  "Nothing arbitrary, everything considered"    │
│   4. FLEXIBILITY       │  "Build once, theme infinitely"                │
│   5. SIMPLICITY        │  "Complex problems, elegant solutions"         │
│   6. TRANSPARENCY      │  "Open source, open process, open mind"        │
│   7. BALANCE           │  "Convention where it helps, escape hatches    │
│                        │   when you need them"                          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Value Deep Dive

1. Craftsmanship (職人の技 - Shokunin no Waza)

What we believe: Design systems deserve the same obsessive attention to detail that a sushi master gives to rice preparation.

How we demonstrate it:

8 curated color palettes, not 800 random swatches
OKLCH color space for perceptual uniformity—orange-500 and blue-500 look equally vibrant
Every token has been tested, not generated
Differentiator: While other systems auto-generate thousands of color combinations, we hand-tune each palette for real-world harmony.

2. Accessibility (誰でも - Dare demo)

What we believe: Accessibility isn't a feature—it's the foundation. If it doesn't work for everyone, it doesn't work.

How we demonstrate it:

WCAG 2.1 AA minimum on all components, AAA where achievable
Automatic accessibility modes (dark, high-contrast, reduced-motion) via media queries
Focus on colorblind users: lightness contrast, not just hue contrast
Per guideline CS-CA-R1: All color combinations use lightness differences, not just hue
Differentiator: Accessibility isn't retrofitted—it's architected into the three-layer token system from the ground up.

3. Intentionality (意図的 - Ito-teki)

What we believe: Every decision should have a reason. Random choices create random outcomes.

How we demonstrate it:

Every component state documented in COMPONENT_DESIGN.toon (CD-SIS-R1)
Variant taxonomy is standardized: solid, outline, ghost, text (CD-VT-C1)
Size naming follows T-shirt convention: xs, sm, md, lg, xl (CD-VT-C2)
No arbitrary values—everything references the token scale
Differentiator: When developers ask "why is it this way?", there's always a documented answer.

4. Flexibility (柔軟性 - Juunan-sei)

What we believe: A design system should empower, not constrain. The best systems provide guardrails, not handcuffs.

How we demonstrate it:

Flavor system: swap entire brand identities with one attribute change
CSS variable overrides for edge cases
Framework-agnostic Web Components work everywhere
Per TS-TP-P4: Direct CSS override when you really need to break the rules
Differentiator: Change flavor="tonkatsu" to flavor="strawberry" and the entire UI transforms—no component changes needed.

5. Simplicity (簡素 - Kanso)

What we believe: The goal isn't the most powerful system—it's the most useful system.

How we demonstrate it:

3 layers, not 7. Ingredients → Flavors → Recipes. That's it.
Sensible defaults: variant="solid", size="md"
Components work with zero configuration
Documentation follows the actual user journey, not internal architecture
Differentiator: You can be productive with Sando in minutes, not days.

6. Transparency (透明性 - Tōmei-sei)

What we believe: Open source isn't just about code—it's about process, decisions, and reasoning.

How we demonstrate it:

All 28 guidelines publicly documented
Every architectural decision has a rationale
Build system is documented, not magic
Component APIs follow predictable patterns
Differentiator: You can understand how Sando works, not just that it works.

7. Balance (調和 - Chōwa)

What we believe: The best systems find equilibrium between structure and freedom, opinion and flexibility.

How we demonstrate it:

Strong conventions (variant naming, state patterns) with escape hatches (CSS overrides)
Automated accessibility modes, but manual flavor selection
Comprehensive defaults, but every token overridable
Per Japanese design philosophy: Ma (間) - meaningful space between elements
Differentiator: Sando is opinionated enough to be useful, flexible enough to adapt.

1.3 Brand Voice & Tone

The Sando Voice

Sando speaks like a senior developer who's also an excellent cook: technically precise, deeply knowledgeable, but warm and approachable. We explain complex concepts through relatable metaphors. We're confident without being arrogant, helpful without being patronizing.

Voice Characteristics

Attribute	Description	Example
Warm	Friendly and approachable, like inviting someone into your kitchen	"Let's build something delicious together"
Precise	Technically accurate, no hand-waving	"OKLCH ensures perceptual uniformity—L=0.5 actually looks 50% bright"
Educational	We teach, not just tell	"This matters because..."
Humble	Confident but not boastful	"We think this works well" not "This is the best way"
Playful	The food metaphor adds levity without undermining expertise	"Start with quality ingredients"
Tone Modulation by Context

Context                 Tone Adjustment              Example
────────────────────────────────────────────────────────────────────────────
Documentation           Helpful, educational         "Here's how the flavor system works..."
                        Technically detailed         

Error Messages          Empathetic, actionable       "That didn't work. Here's what to try..."
                        Never blaming                

Marketing               Confident, inspiring          "Build once, theme infinitely"
                        Aspirational                  

API Reference           Precise, concise              "variant: 'solid' | 'outline' | 'ghost'"
                        Just the facts                

Getting Started         Encouraging, accessible       "You're 3 lines away from your first 
                        Quick wins                    Sando component"

Changelog               Direct, grateful              "Fixed contrast in dark mode. Thanks @user 
                        Credit community              for reporting!"
Voice Examples: DO vs DON'T

Documentation

✅ DO	❌ DON'T
"Flavors work like themes—they're brand identities you can swap with one attribute"	"Flavors are semantic token mappings that override base layer configurations"
"Think of Ingredients like pantry staples—they're always available, never change"	"Layer 1 tokens are primitive color values in OKLCH format"
"The default size (md) ensures touch targets meet accessibility standards"	"Use md to be WCAG 2.5.5 compliant"
Error Messages

✅ DO	❌ DON'T
"We couldn't find that flavor. Did you mean 'tonkatsu'?"	"Error: Invalid flavor attribute"
"This color combination doesn't meet contrast requirements. Try a darker text color."	"WCAG Contrast Error"
"The button needs a label for screen readers. Add some text or an aria-label."	"Accessibility violation: missing accessible name"
Marketing

✅ DO	❌ DON'T
"We spent months perfecting 8 color palettes so you can spend minutes creating a beautiful, accessible design system"	"Industry-leading color system with optimized OKLCH values"
"The perfect recipe for building delicious UIs"	"A comprehensive component library solution"
"Framework-agnostic. Works with React, Vue, Angular, Svelte, or just HTML"	"Universal JavaScript web component framework interoperability"
1.4 Brand Personality

If Sando Were a Person

Meet Sando - A Japanese-American chef in their mid-30s who runs a modern sandwich shop. They trained at culinary school but chose to master the humble sandwich rather than pursue fine dining. Their philosophy: excellence doesn't require pretension.

Personality Traits

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   🎯 METICULOUS BUT NOT FUSSY                                            │
│      Cares deeply about details that matter, ignores details that don't  │
│                                                                          │
│   🤝 HELPFUL BUT NOT HOVERING                                            │
│      Available when needed, steps back when not                          │
│                                                                          │
│   📚 KNOWLEDGEABLE BUT NOT CONDESCENDING                                 │
│      Shares expertise as a gift, not as a flex                           │
│                                                                          │
│   🎨 CREATIVE BUT NOT CHAOTIC                                            │
│      Innovation within structure, not for its own sake                   │
│                                                                          │
│   😊 PLAYFUL BUT NOT SILLY                                               │
│      Uses the food metaphor to clarify, not to distract                  │
│                                                                          │
│   🔧 PRACTICAL BUT NOT BORING                                            │
│      Focuses on what ships, but makes it enjoyable                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Personality in Action

Situation	How Sando Responds
A user is confused by documentation	Takes time to explain with analogies, adds examples
Someone reports a bug	Thanks them genuinely, fixes it quickly, credits them in the changelog
A competitor does something well	Acknowledges it, learns from it, doesn't feel threatened
A feature request doesn't fit the vision	Explains the reasoning, suggests alternatives, stays respectful
An accessibility issue is found	Treats it as a critical bug, not a nice-to-have
Sando's Workspace

Imagine Sando's kitchen:

Ingredients are organized meticulously, labeled clearly
Tools are professional-grade but well-worn from use
There's a whiteboard with recipe ideas and improvement notes
The space is welcoming—anyone can come in and learn
Japanese design prints on the wall, modern equipment on the counter
A small library of cookbooks and programming books
2. COLOR PALETTE

2.1 Primary Brand Colors

The Tonkatsu Foundation

The primary brand palette draws inspiration from the Katsu Sando itself: golden fried cutlet, warm bread, rich sauce. This creates an immediately recognizable visual identity that's warm, appetizing, and distinctive.

Primary: Tonkatsu Amber

The hero color. Rich, warm amber that evokes perfectly fried panko breading.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   TONKATSU AMBER (Primary)                                               │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Base (500)      For brand marks, primary CTAs when on light bg         │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.65 0.08 50)                                    │   │
│   │  HEX:     #B08055                                                │   │
│   │  RGB:     rgb(176, 128, 85)                                      │   │
│   │  HSL:     hsl(28, 36%, 51%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Dark (700)      For primary buttons, links on light backgrounds        │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.46 0.07 50)                                    │   │
│   │  HEX:     #7A5838                                                │   │
│   │  RGB:     rgb(122, 88, 56)                                       │   │
│   │  HSL:     hsl(29, 37%, 35%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Light (200)     For subtle backgrounds, hover states                   │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.92 0.035 50)                                   │   │
│   │  HEX:     #F0E5D8                                                │   │
│   │  RGB:     rgb(240, 229, 216)                                     │   │
│   │  HSL:     hsl(33, 48%, 89%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Secondary: Shokupan Cream

The foundation color. Warm off-white that evokes soft milk bread.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   SHOKUPAN CREAM (Secondary - Backgrounds)                               │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Base (50)       Primary background, canvas                             │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.98 0.018 30)                                   │   │
│   │  HEX:     #FBF8F5                                                │   │
│   │  RGB:     rgb(251, 248, 245)                                     │   │
│   │  HSL:     hsl(30, 40%, 97%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Surface (100)   Elevated surfaces, cards                               │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.95 0.018 30)                                   │   │
│   │  HEX:     #F5EFE8                                                │   │
│   │  RGB:     rgb(245, 239, 232)                                     │   │
│   │  HSL:     hsl(32, 35%, 94%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Tertiary: Ink (Text)

The contrast color. Warm dark brown for text and UI elements.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   INK (Tertiary - Text & Icons)                                          │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Heading (950)   Primary text, maximum contrast                         │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.22 0.018 30)                                   │   │
│   │  HEX:     #2D2622                                                │   │
│   │  RGB:     rgb(45, 38, 34)                                        │   │
│   │  HSL:     hsl(22, 14%, 15%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Body (800)      Body text, good contrast                               │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.38 0.018 30)                                   │   │
│   │  HEX:     #5A4F46                                                │   │
│   │  RGB:     rgb(90, 79, 70)                                        │   │
│   │  HSL:     hsl(27, 13%, 31%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Muted (500)     Secondary text, captions                               │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  OKLCH:   oklch(0.64 0.018 30)                                   │   │
│   │  HEX:     #9A8B7E                                                │   │
│   │  RGB:     rgb(154, 139, 126)                                     │   │
│   │  HSL:     hsl(28, 12%, 55%)                                      │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
2.2 Semantic State Colors

Status System

Per CD-VT-C3 (Status Variants), Sando uses semantic colors for feedback states. These are consistent across all flavors.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   SUCCESS (Green)  - Confirmations, completed actions                    │
│   ────────────────────────────────────────────────────────────────────   │
│   Background:  oklch(0.92 0.03 145)   #E5F5E8   Hue 145°                 │
│   Text:        oklch(0.44 0.08 145)   #4A7D52                            │
│   Border:      oklch(0.68 0.10 145)   #7BC48A                            │
│                                                                          │
│   DESTRUCTIVE (Red) - Errors, destructive actions, danger               │
│   ────────────────────────────────────────────────────────────────────   │
│   Background:  oklch(0.92 0.04 15)    #F8E6E6   Hue 15°                  │
│   Text:        oklch(0.46 0.14 15)    #A04040                            │
│   Border:      oklch(0.70 0.15 15)    #E07878                            │
│                                                                          │
│   WARNING (Amber) - Cautions, non-critical issues                        │
│   ────────────────────────────────────────────────────────────────────   │
│   Background:  oklch(0.94 0.06 85)    #FDF5E0   Hue 85°                  │
│   Text:        oklch(0.68 0.14 60)    #9A7020                            │
│   Border:      oklch(0.82 0.12 85)    #E8D088                            │
│                                                                          │
│   INFO (Blue) - Helpful information, tips, notes                         │
│   ────────────────────────────────────────────────────────────────────   │
│   Background:  oklch(0.96 0.02 250)   #EBF2FA   Hue 250°                 │
│   Text:        oklch(0.48 0.10 250)   #4868A0                            │
│   Border:      oklch(0.74 0.10 250)   #88A8D8                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
2.3 Color Philosophy

Why These Colors Represent Sando

Warmth Over Coldness

Sando deliberately uses warm neutrals (hue 30°) rather than pure grays. This reflects:

The Japanese food aesthetic—warmth, comfort, nourishment
The artisanal, handcrafted nature of the system
Differentiation from cold, corporate tech aesthetics
OKLCH as a Statement

Using OKLCH color space (per CS-CR-R1) isn't just technical—it's philosophical:

Perceptual uniformity = treating all colors equally
Scientific foundation = decisions based on research, not preference
Accessibility built-in = lightness scale guarantees contrast
The Brown Decision

Choosing brown as the primary action color is intentional:

It's warm and approachable, not aggressive
It references the Katsu Sando's golden-brown perfection
It's distinctive—most design systems use blue, green, or purple
It pairs beautifully with warm cream backgrounds
Cultural Significance

Color	Japanese Reference	Meaning
Brown (茶色)	Ocha (tea), tree bark	Groundedness, reliability, nature
Cream (生成り)	Kinari, natural cloth	Purity, simplicity, authenticity
Warm neutrals	Wabi-sabi aesthetic	Imperfection, warmth, humanity
Gold accents	Kintsugi (金継ぎ)	Embracing flaws, finding beauty in repair
2.4 Color Usage Guidelines

Primary Use Cases

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   USAGE MATRIX                                                           │
│                                                                          │
│   Element              │ Color                 │ Token Reference         │
│   ────────────────────────────────────────────────────────────────────   │
│   Page background      │ Shokupan Cream 50     │ color.background.base   │
│   Card surface         │ Shokupan Cream 100    │ color.background.surface│
│   Heading text         │ Ink 950               │ color.text.heading      │
│   Body text            │ Ink 800               │ color.text.body         │
│   Caption/secondary    │ Ink 500               │ color.text.muted        │
│   Primary button       │ Brown 600 bg          │ color.action.solid.bg   │
│   Primary button text  │ White                 │ color.text.on-solid     │
│   Link text            │ Brown 600             │ color.text.link.default │
│   Focus ring           │ Brown 500             │ color.focus.ring        │
│   Default border       │ Neutral Warm 300      │ color.border.default    │
│   Emphasis border      │ Brown 500             │ color.border.emphasis   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Contrast Requirements (Per CS-CR-R5)

Combination	Ratio	WCAG Level	Use Case
Ink 950 on Cream 50	14.8:1	AAA	Headings
Ink 800 on Cream 50	10.2:1	AAA	Body text
White on Brown 600	4.9:1	AA	Button text
Ink 500 on Cream 50	4.5:1	AA	Muted text
Brown 600 on Cream 50	5.2:1	AA	Links
Dark Mode Adaptation

In dark mode, the palette inverts while maintaining warmth:

Light Mode                    Dark Mode
────────────────────────────────────────────────────
Cream 50 (background)    →    Warm 900 (background)
Ink 950 (heading)        →    Cream 50 (heading)
Ink 800 (body)           →    Cream 200 (body)
Brown 600 (primary)      →    Brown 400 (primary)
3. TYPOGRAPHY

3.1 Primary Typeface (Headings/Brand)

Recommendation: Space Grotesk

Space Grotesk is the recommended primary typeface for Sando's brand identity, headings, and marketing materials.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   SPACE GROTESK                                                          │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Category:       Geometric Sans-Serif                                   │
│   Designer:       Florian Karsten (2018)                                 │
│   License:        Open Font License (Google Fonts)                       │
│   Weights:        300, 400, 500, 600, 700                               │
│   Variable:       Yes (wght axis)                                        │
│                                                                          │
│   CSS Import:                                                            │
│   @import url('https://fonts.googleapis.com/css2?family=              │
│   Space+Grotesk:wght@300..700&display=swap');                          │
│                                                                          │
│   Font Stack:                                                            │
│   'Space Grotesk', system-ui, sans-serif                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Why Space Grotesk

Requirement	How Space Grotesk Meets It
Craft/artisanal feel	Distinctive monospace-influenced letterforms convey precision
Modern but approachable	Geometric foundations with humanist details
Web support	Available on Google Fonts, variable font support
Good for code	Monospace heritage means it pairs well with code fonts
Japanese influence	Clean, minimal aesthetic aligns with Japanese design principles
Character Showcase

ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789

The quick brown fox jumps over the lazy dog.
Build once, theme infinitely.
サンド Design System
Usage Guidelines

Context	Weight	Size Range
Logo/Brand mark	700 (Bold)	24-48px
H1 (Hero)	700 (Bold)	36-48px
H2 (Section)	600 (SemiBold)	28-36px
H3 (Subsection)	600 (SemiBold)	20-24px
H4-H6	500 (Medium)	16-20px
Marketing headlines	700 (Bold)	32-64px
3.2 Secondary Typeface (Body/UI)

Recommendation: Inter (with System Font Fallback)

For body text and UI elements, Sando recommends Inter as the preferred font, with a robust system font fallback stack per TSYS-CR-R1.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   INTER                                                                  │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Category:       Humanist Sans-Serif                                    │
│   Designer:       Rasmus Andersson (2016-present)                        │
│   License:        Open Font License                                      │
│   Weights:        100-900 (variable)                                     │
│   Variable:       Yes (wght, slnt axes)                                  │
│                                                                          │
│   Key Features:                                                          │
│   - Optimized for screen readability at small sizes                      │
│   - Excellent x-height for UI                                            │
│   - Carefully tuned for different optical sizes                          │
│   - Support for 100+ languages                                           │
│                                                                          │
│   CSS Import:                                                            │
│   @import url('https://fonts.googleapis.com/css2?family=              │
│   Inter:wght@400;500;600;700&display=swap');                           │
│                                                                          │
│   Font Stack:                                                            │
│   'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
System Font Fallback Strategy

When Inter isn't loaded, the system font stack ensures excellent performance:

--font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 
             Helvetica, Arial, sans-serif;
Why this order:

Inter - Preferred choice when available
system-ui - Modern browsers' native UI font
-apple-system - San Francisco on macOS/iOS
Segoe UI - Windows native
Roboto - Android native
Helvetica, Arial - Universal fallbacks
Monospace Pairing: JetBrains Mono

For code blocks and technical documentation:

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   JETBRAINS MONO                                                         │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Category:       Monospace                                              │
│   Designer:       JetBrains (2020)                                       │
│   License:        Open Font License                                      │
│   Features:       Code ligatures, increased height for readability       │
│                                                                          │
│   Font Stack:                                                            │
│   'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
3.3 Type Scale

Modular Scale Specification

Based on TSYS-CR-R2, Sando uses a modular scale with approximately 1.125-1.25 ratio (Major Third to Perfect Fourth):

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   TYPE SCALE                                                             │
│   ────────────────────────────────────────────────────────────────────   │
│                                                                          │
│   Token    │ Size      │ px    │ Use Case                               │
│   ─────────────────────────────────────────────────────────────────────  │
│   50       │ 0.625rem  │ 10px  │ Micro text, badges                     │
│   100      │ 0.75rem   │ 12px  │ Captions, labels                       │
│   200      │ 0.875rem  │ 14px  │ Small body, compact UI                 │
│   300      │ 1rem      │ 16px  │ BODY (default) ⭐                      │
│   400      │ 1.125rem  │ 18px  │ Large body, lead text                  │
│   500      │ 1.25rem   │ 20px  │ H4, small headings                     │
│   600      │ 1.5rem    │ 24px  │ H3, medium headings                    │
│   700      │ 2rem      │ 32px  │ H2, large headings                     │
│   800      │ 2.5rem    │ 40px  │ H1, page titles                        │
│   900      │ 3rem      │ 48px  │ Display, hero text                     │
│                                                                          │
│   Base: 16px (1rem)                                                      │
│   Scale: ~1.125-1.25 ratio (Minor Third to Major Third)                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Line Height Scale (Per TSYS-CR-R5)

All line heights are unitless for proportional scaling:

Token	Value	Use Case
100	1.0	Badges, tight spaces
120	1.2	Headings, display text
140	1.4	UI text, labels
150	1.5	Body text (WCAG minimum) ⭐
160	1.6	Long-form reading
180	1.8	Large text blocks
Font Weight Scale

Token	Weight	Name	Use Case
400	400	Regular	Body text (default)
500	500	Medium	UI labels, emphasis
600	600	SemiBold	Subheadings
700	700	Bold	Headings, CTAs
900	900	Black	Display, marketing
3.4 Type Pairing Guidelines

The Space Grotesk + Inter Pairing

This pairing works because of contrast within harmony:

Space Grotesk (headings): Geometric, distinctive, attention-grabbing
Inter (body): Humanist, readable, comfortable for long text
Both fonts share:

Modern, clean aesthetics
Excellent screen rendering
Good x-heights for readability
Hierarchy Rules

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   TYPOGRAPHIC HIERARCHY                                                  │
│                                                                          │
│   H1  │ Space Grotesk │ 700 │ 2.5-3rem   │ Line-height: 1.2            │
│   H2  │ Space Grotesk │ 600 │ 2rem       │ Line-height: 1.2            │
│   H3  │ Space Grotesk │ 600 │ 1.5rem     │ Line-height: 1.2            │
│   H4  │ Space Grotesk │ 500 │ 1.25rem    │ Line-height: 1.3            │
│   Body│ Inter         │ 400 │ 1rem       │ Line-height: 1.5            │
│   Lead│ Inter         │ 400 │ 1.125rem   │ Line-height: 1.6            │
│   Small│Inter         │ 400 │ 0.875rem   │ Line-height: 1.4            │
│   Caption│Inter       │ 400 │ 0.75rem    │ Line-height: 1.4            │
│   Code│ JetBrains Mono│ 400 │ 0.875rem   │ Line-height: 1.6            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Weight Usage Guidelines

Weight	Use For	Don't Use For
400	Body text, paragraphs, form inputs	Headings, CTAs
500	UI labels, table headers, metadata	Long body text
600	Subheadings, card titles	Body text
700	Main headings, buttons, CTAs	Captions, help text
900	Display text, hero headlines	Anything at small sizes
4. VISUAL ELEMENTS

4.1 Logo Concepts

Direction 1: Wordmark with Layered Element

Concept: A clean wordmark where the letter "S" incorporates subtle layering—a visual nod to the three-layer architecture and the sandwich concept.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   WORDMARK: "sando"                                                      │
│                                                                          │
│   • Font: Space Grotesk Bold (700)                                       │
│   • Case: Lowercase (approachable, modern)                               │
│   • Special treatment: The "s" has a subtle gradient or layered         │
│     effect suggesting the sandwich layers                                │
│                                                                          │
│   Variations:                                                            │
│   • Primary: Full color on light background                              │
│   • Reversed: Light on dark background                                   │
│   • Monochrome: Single color for limited palettes                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Direction 2: Icon + Wordmark

Concept: A simple icon depicting three horizontal layers (bread-filling-bread) paired with the wordmark.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ICON + WORDMARK                                                        │
│                                                                          │
│   Icon:                                                                  │
│   • Three horizontal rounded rectangles stacked                          │
│   • Top and bottom: Cream/neutral (bread)                                │
│   • Middle: Brown/amber (filling/flavor)                                 │
│   • Corners: Rounded (4-8px radius)                                      │
│                                                                          │
│   Layout options:                                                        │
│   • Horizontal: Icon left, wordmark right                                │
│   • Vertical: Icon top, wordmark below                                   │
│   • Icon only: For favicons, app icons, small spaces                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Direction 3: Abstract Sandwich Symbol

Concept: A more abstract, modern take—a geometric shape that suggests layers without being literally a sandwich.

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ABSTRACT SYMBOL                                                        │
│                                                                          │
│   • Three overlapping rounded squares/circles                            │
│   • Offset slightly to show depth                                        │
│   • Colors: Cream, Brown, Cream (or gradient)                            │
│   • Works at any size without losing meaning                             │
│                                                                          │
│   Why this works:                                                        │
│   • Scales perfectly from favicon to billboard                           │
│   • Doesn't look dated (not overly literal)                              │
│   • The three shapes = three layers concept                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Logo Size Guidelines

Context	Minimum Size	Recommended Size
Favicon	16×16px	32×32px
App icon	48×48px	512×512px
Header	24px height	32-40px height
Marketing	40px height	80-120px height
Clear Space

Maintain minimum clear space equal to the height of the "s" around all sides of the logo.

4.2 Iconography Style

Icon Specifications

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ICONOGRAPHY GUIDELINES                                                 │
│                                                                          │
│   Style:           Outlined (stroke-based)                               │
│   Why:             Clean, modern, matches geometric typography           │
│                                                                          │
│   Stroke Weight:   1.5-2px at 24px size                                  │
│   Why:             Visible but not heavy, maintains at small sizes       │
│                                                                          │
│   Corner Radius:   2px (subtle rounding)                                 │
│   Why:             Approachable, matches component border-radius         │
│                                                                          │
│   Grid:            24×24px base, scales to 16/20/32/48                   │
│   Padding:         2px on all sides within grid                          │
│                                                                          │
│   Line Caps:       Round                                                 │
│   Line Joins:      Round                                                 │
│                                                                          │
│   Recommended Set: Lucide (open source, consistent, React/Vue support)   │
│   Alternative:     Heroicons, Phosphor                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Icon Size Scale (Per CD-VT-C2)

Size Token	Icon Size	Use With
xs	12px	xs buttons, compact UI
sm	16px	sm buttons, form labels
md	20-24px	md buttons, navigation
lg	28-32px	lg buttons, cards
xl	36-48px	Hero sections, features
Icon Color Usage

Context	Color	Token
Default	Ink 600	--sando-color-icon-default
Muted	Ink 500	--sando-color-icon-muted
Interactive	Brown 600	--sando-color-icon-interactive
On solid buttons	White	--sando-color-icon-on-solid
Success	Green 600	State token
Error	Red 600	State token
4.3 Illustration Style

Illustration Guidelines

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ILLUSTRATION STYLE                                                     │
│                                                                          │
│   Approach:         Minimal, flat, geometric                             │
│   Influence:        Japanese graphic design, mid-century modern          │
│                                                                          │
│   Color Palette:                                                         │
│   • Primary: Tonkatsu Amber, Shokupan Cream                              │
│   • Accents: Flavor colors (pink, green, brown)                          │
│   • Limited: Max 3-4 colors per illustration                             │
│                                                                          │
│   Shapes:                                                                │
│   • Geometric: Circles, rounded rectangles, organic curves              │
│   • No harsh angles                                                      │
│   • Rounded corners (8-16px)                                             │
│                                                                          │
│   Subjects:                                                              │
│   • Food/ingredient metaphors when relevant                              │
│   • Abstract shapes for concepts                                         │
│   • No people (keeps it universal)                                       │
│                                                                          │
│   Texture:                                                               │
│   • Minimal or none                                                      │
│   • If used: subtle grain, paper texture                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
When to Use Illustrations

Context	Illustration Type
Empty states	Simple, single-object, encouraging
Error pages	Lighthearted but respectful
Feature explanation	Abstract concepts, process flows
Marketing	Hero illustrations, feature highlights
Documentation	Minimal, explanatory diagrams
4.4 Photography Direction

Photography Guidelines

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   PHOTOGRAPHY STYLE                                                      │
│                                                                          │
│   Subject Matter:                                                        │
│   • Japanese food (katsu sando, ingredients)                             │
│   • Craft/artisan workspaces                                             │
│   • Abstract textures (wood grain, paper, fabric)                        │
│                                                                          │
│   Mood:                                                                  │
│   • Warm, inviting, natural light                                        │
│   • Clean backgrounds, minimal clutter                                   │
│   • Top-down or 45° angle food shots                                     │
│                                                                          │
│   Color Treatment:                                                       │
│   • Warm white balance                                                   │
│   • Slightly desaturated (not hyper-vivid)                               │
│   • Consistent with brand palette                                        │
│                                                                          │
│   DO:                                                                    │
│   ✓ Natural lighting                                                     │
│   ✓ Negative space                                                       │
│   ✓ Handcrafted, artisanal subjects                                      │
│   ✓ Japanese aesthetic influence                                         │
│                                                                          │
│   DON'T:                                                                 │
│   ✗ Stock photo feel                                                     │
│   ✗ Overly saturated colors                                              │
│   ✗ Busy, cluttered compositions                                         │
│   ✗ Generic tech imagery                                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
5. BRAND APPLICATION

5.1 Documentation Site (VitePress)

VitePress Theme Customization

/* VitePress Brand Customization */
:root {
  /* Brand Colors */
  --vp-c-brand-1: oklch(0.46 0.07 50);  /* Brown 700 - Primary actions */
  --vp-c-brand-2: oklch(0.55 0.08 50);  /* Brown 600 - Hover */
  --vp-c-brand-3: oklch(0.65 0.08 50);  /* Brown 500 - Soft accents */
  --vp-c-brand-soft: oklch(0.92 0.035 50 / 0.14); /* Brown 200 transparent */
  
  /* Background */
  --vp-c-bg: oklch(0.98 0.018 30);      /* Shokupan Cream 50 */
  --vp-c-bg-soft: oklch(0.95 0.018 30); /* Cream 100 */
  --vp-c-bg-muted: oklch(0.90 0.018 30);/* Cream 200 */
  
  /* Text */
  --vp-c-text-1: oklch(0.22 0.018 30);  /* Ink 950 */
  --vp-c-text-2: oklch(0.38 0.018 30);  /* Ink 800 */
  --vp-c-text-3: oklch(0.64 0.018 30);  /* Ink 500 */
  
  /* Typography */
  --vp-font-family-base: 'Inter', system-ui, sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', monospace;
}

/* Hero Section */
.VPHero .name {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 700;
}

/* Tagline */
.VPHero .tagline {
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--vp-c-text-2);
}
Documentation Typography Hierarchy

Element	Font	Weight	Size	Color
H1	Space Grotesk	700	2rem	Ink 950
H2	Space Grotesk	600	1.5rem	Ink 950
H3	Space Grotesk	600	1.25rem	Ink 900
Body	Inter	400	1rem	Ink 800
Code	JetBrains Mono	400	0.875rem	Ink 800
Link	Inter	400	1rem	Brown 600
Content Containers

/* Tip Container */
.tip {
  background: oklch(0.92 0.03 145 / 0.2);  /* Success green tint */
  border-left: 4px solid oklch(0.60 0.11 145);
}

/* Warning Container */
.warning {
  background: oklch(0.94 0.06 85 / 0.3);  /* Warning amber tint */
  border-left: 4px solid oklch(0.82 0.14 90);
}

/* Danger Container */
.danger {
  background: oklch(0.92 0.04 15 / 0.2);  /* Error red tint */
  border-left: 4px solid oklch(0.62 0.18 15);
}
5.2 Storybook Theming

Storybook Manager Theme

// .storybook/manager.js
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    
    // Brand
    brandTitle: 'Sando Design System',
    brandUrl: 'https://sando.dev',
    brandImage: '/sando-logo.svg',
    brandTarget: '_self',
    
    // Colors
    colorPrimary: '#7A5838',      // Brown 700
    colorSecondary: '#B08055',    // Brown 500
    
    // UI
    appBg: '#FBF8F5',             // Cream 50
    appContentBg: '#FFFFFF',
    appBorderColor: '#E8DFD4',    // Warm 200
    appBorderRadius: 8,
    
    // Typography
    fontBase: '"Inter", system-ui, sans-serif',
    fontCode: '"JetBrains Mono", monospace',
    
    // Text colors
    textColor: '#2D2622',         // Ink 950
    textInverseColor: '#FBF8F5',
    textMutedColor: '#9A8B7E',    // Ink 500
    
    // Toolbar
    barTextColor: '#5A4F46',      // Ink 800
    barSelectedColor: '#7A5838',  // Brown 700
    barBg: '#F5EFE8',             // Cream 100
    
    // Forms
    inputBg: '#FFFFFF',
    inputBorder: '#D4C9BC',
    inputTextColor: '#2D2622',
    inputBorderRadius: 4,
  }),
});
Storybook Docs Theme

// .storybook/preview.js
export const parameters = {
  docs: {
    theme: {
      base: 'light',
      brandTitle: 'Sando',
      
      // Typography
      typography: {
        fonts: {
          base: '"Inter", system-ui, sans-serif',
          mono: '"JetBrains Mono", monospace',
        },
      },
    },
  },
};
5.3 README/GitHub Branding

Badge Style Guide

<!-- Technology Badges -->
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Lit](https://img.shields.io/badge/Lit-3.3-325CFF?style=flat-square&logo=lit&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-B08055?style=flat-square)

<!-- Custom Sando Badge (using shields.io) -->
![Sando](https://img.shields.io/badge/🍱_Sando-Design_System-B08055?style=flat-square)

<!-- Status Badges -->
![Build](https://img.shields.io/badge/build-passing-4A7D52?style=flat-square)
![Coverage](https://img.shields.io/badge/coverage-95%25-4A7D52?style=flat-square)
README Structure

# 🍱 Sando Design System

> The perfect recipe for building delicious UIs

[HERO IMAGE: High-quality screenshot or illustration]

## ✨ Features

- **🎨 8 Curated Color Palettes** - Not auto-generated, hand-tuned
- **♿ WCAG 2.1 AA by Default** - Accessibility built into the architecture
- **🎭 Multi-Flavor Theming** - Swap brands with one attribute
- **📦 Framework Agnostic** - Works with React, Vue, Angular, Svelte, or vanilla

## 🚀 Quick Start

[CODE BLOCKS]

## 📖 Documentation

[LINKS]

## 🤝 Contributing

[INSTRUCTIONS]

---

Built with ❤️ and 🍱 by the Sando team
GitHub Social Preview

Size: 1280×640px
Content: Logo + tagline + abstract layer illustration
Colors: Warm cream background, brown accents
Typography: Space Grotesk for "Sando", Inter for tagline
5.4 Social Media / Marketing

Profile Picture

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   PROFILE PICTURE (Avatar)                                               │
│                                                                          │
│   Format:    Square, 400×400px minimum                                   │
│   Content:   Sando icon (layered sandwich symbol)                        │
│   Background: Tonkatsu Amber (Brown 500) or Cream 50                     │
│   Style:     Simple, recognizable at small sizes                         │
│                                                                          │
│   Variations:                                                            │
│   • Light mode: Brown icon on cream background                           │
│   • Dark mode: Cream icon on brown background                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Cover/Banner Images

Platform	Size	Content
Twitter/X	1500×500px	Logo + tagline + abstract layers
LinkedIn	1584×396px	Logo + tagline + screenshot
GitHub	1280×640px	Logo + tagline + features
Post Templates

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   POST STYLE GUIDE                                                       │
│                                                                          │
│   Background Options:                                                    │
│   • Cream 50 (primary)                                                   │
│   • Brown 600 (accent/emphasis)                                          │
│   • Gradient: Cream to light amber                                       │
│                                                                          │
│   Typography:                                                            │
│   • Headlines: Space Grotesk Bold                                        │
│   • Body: Inter Regular                                                  │
│   • Code: JetBrains Mono                                                 │
│                                                                          │
│   Imagery:                                                               │
│   • Code screenshots with proper syntax highlighting                     │
│   • Component demos with brand colors                                    │
│   • Abstract layer illustrations                                         │
│                                                                          │
│   Voice:                                                                 │
│   • Informative but not salesy                                           │
│   • Technical but accessible                                             │
│   • Use food metaphors sparingly (avoid overuse)                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
6. COMPETITIVE DIFFERENTIATION

Brand Positioning Matrix

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                    DESIGN SYSTEM POSITIONING                             │
│                                                                          │
│                        Corporate                                         │
│                            ↑                                             │
│               Material │ │ Ant Design                                    │
│                        │ │                                               │
│   Unopinionated ←──────┼──────────→ Opinionated                          │
│                        │ │                                               │
│          Radix │ │ SANDO │ │ Chakra                                      │
│                        │ │                                               │
│                            ↓                                             │
│                       Approachable                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
Detailed Competitor Comparison

vs. Tailwind UI

Aspect	Tailwind UI	Sando
Philosophy	Utility-first, massive class names	Token-first, semantic classes
Theming	Manual class overrides	Flavor attribute, instant swap
Accessibility	Developer responsibility	Built into architecture
Color System	HSL-based, 22+ palettes	OKLCH-based, 8 curated palettes
Brand Identity	Technical, neutral	Warm, crafted, distinctive
Lock-in	Tailwind ecosystem	Framework-agnostic Web Components
Sando's Edge: "We curate so you don't have to choose from 1000 options. Quality over quantity."

vs. Radix UI

Aspect	Radix	Sando
Philosophy	Unstyled primitives	Styled, themeable components
Theming	CSS-in-JS required	CSS custom properties
Visual Identity	None (bring your own)	Strong, cohesive brand
Learning Curve	Steep (primitives + styling)	Gentle (works out of the box)
Flexibility	Maximum (no opinions)	Balanced (opinions with escape hatches)
Sando's Edge: "Beautiful defaults without sacrificing flexibility. You don't have to build everything from scratch."

vs. Chakra UI

Aspect	Chakra UI	Sando
Philosophy	Friendly, colorful, React-first	Crafted, warm, framework-agnostic
Color System	Traditional HSL	Perceptually uniform OKLCH
Framework	React-only	Web Components (any framework)
Theming	Theme object, styled-system	Flavor attribute, CSS variables
Brand Voice	Casual, playful	Warm, expert, educational
Sando's Edge: "Same approachability, better color science, works everywhere."

vs. Material Design

Aspect	Material Design	Sando
Philosophy	Google's opinionated vision	Japanese craftsmanship
Visual Style	Flat, geometric, corporate	Warm, artisanal, human
Flexibility	Limited (Material = Material)	High (Flavors change everything)
Identity	Google brand extension	Standalone identity
Accessibility	Good but not central	Foundational
Sando's Edge: "Your brand, not Google's. Accessible by architecture, not afterthought."

vs. Ant Design

Aspect	Ant Design	Sando
Philosophy	Enterprise-first, feature-rich	Focused, craft-first
Visual Density	High (complex components)	Balanced (clarity over density)
Bundle Size	Large	Minimal (<10KB per component)
Customization	Less-based themes	CSS custom properties
Brand Feel	Corporate, Chinese enterprise	Artisanal, global appeal
Sando's Edge: "Elegance through restraint. Not every app needs 60+ components."

The Sando Difference: Summary

┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   WHAT MAKES SANDO UNIQUE                                                │
│                                                                          │
│   1. PERCEPTUALLY UNIFORM COLORS                                         │
│      Other systems use HSL, where L=50% varies wildly by hue.           │
│      Sando uses OKLCH, where L=0.5 always looks 50% bright.             │
│                                                                          │
│   2. CURATED, NOT GENERATED                                              │
│      8 hand-tuned palettes > 800 auto-generated options.                │
│      We made the hard decisions so you don't have to.                    │
│                                                                          │
│   3. ACCESSIBILITY BY ARCHITECTURE                                       │
│      Modes (dark, high-contrast, reduced-motion) are automatic.         │
│      Not a checklist item—a foundational design decision.                │
│                                                                          │
│   4. THREE-LAYER CLARITY                                                 │
│      Ingredients → Flavors → Recipes.                                    │
│      Not 7 layers of abstraction. Just 3.                                │
│                                                                          │
│   5. FRAMEWORK FREEDOM                                                   │
│      Web Components work everywhere.                                     │
│      No React lock-in, no Vue lock-in, no lock-in.                       │
│                                                                          │
│   6. DISTINCTIVE IDENTITY                                                │
│      Warm, crafted, memorable.                                           │
│      Not another blue-gray tech aesthetic.                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
APPENDIX: Quick Reference

Brand Colors (Copy-Paste Ready)

/* Primary Brand */
--sando-brand-primary: oklch(0.55 0.08 50);      /* Brown 600 */
--sando-brand-primary-hover: oklch(0.46 0.07 50); /* Brown 700 */
--sando-brand-primary-light: oklch(0.92 0.035 50); /* Brown 200 */

/* Backgrounds */
--sando-bg-base: oklch(0.98 0.018 30);           /* Cream 50 */
--sando-bg-surface: oklch(0.95 0.018 30);        /* Cream 100 */

/* Text */
--sando-text-heading: oklch(0.22 0.018 30);      /* Ink 950 */
--sando-text-body: oklch(0.38 0.018 30);         /* Ink 800 */
--sando-text-muted: oklch(0.64 0.018 30);        /* Ink 500 */

/* States */
--sando-success: oklch(0.60 0.11 145);
--sando-error: oklch(0.62 0.18 15);
--sando-warning: oklch(0.82 0.14 90);
--sando-info: oklch(0.60 0.13 250);
Typography (Copy-Paste Ready)

/* Font Families */
--sando-font-heading: 'Space Grotesk', system-ui, sans-serif;
--sando-font-body: 'Inter', system-ui, -apple-system, sans-serif;
--sando-font-mono: 'JetBrains Mono', Consolas, monospace;

/* Font Sizes */
--sando-text-xs: 0.75rem;    /* 12px */
--sando-text-sm: 0.875rem;   /* 14px */
--sando-text-base: 1rem;     /* 16px */
--sando-text-lg: 1.25rem;    /* 20px */
--sando-text-xl: 1.5rem;     /* 24px */
--sando-text-2xl: 2rem;      /* 32px */
--sando-text-3xl: 3rem;      /* 48px */
Key Taglines

Context	Tagline
Primary	"The perfect recipe for building delicious UIs"
Technical	"Build once, theme infinitely"
Value Prop	"We spent months perfecting 8 color palettes so you can spend minutes creating"
Philosophy	"Start with the basics, season with meaning, serve with style"
Accessibility	"Every user, every context, always"
Document Changelog

Version	Date	Changes
1.0.0	Feb 2026	Initial brand identity guide
This document serves as the definitive brand reference for all Sando Design System communications, implementations, and extensions.
