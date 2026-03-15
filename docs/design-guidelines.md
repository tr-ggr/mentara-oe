# Mentara Design Guidelines

## Tech Stack & Design System Detected

| Area | Detected in repo | Implementation implication |
|---|---|---|
| App framework | Next.js `~16.0.1` + React `^19.0.0` in Nx monorepo | Use App Router patterns and React component composition |
| CSS approach | Tailwind CSS `3.4.3` + app-level CSS | Use Tailwind for spacing/layout utilities, CSS variables for token overrides |
| Component library | `@radix-ui/themes` `^3.2.1` | Define UI guidance in Radix `Theme` tokens + Radix component variants |
| Theme mode | `next-themes` `^0.4.6` + Radix Theme provider | Treat light and dark as first-class themes |
| Icon library | None detected | Define icon style rules and a recommended future package path |
| Animation library | None detected | Use CSS keyframes/transitions for lightweight motion |

### Existing Design Tokens Already Defined

The app already maps a Mentara accent palette and gray scale through CSS custom properties in [`apps/web/src/app/theme-colors.css`](/home/tr-ggr/NerdProjects/mentara-ecosystem/mentara-oe/apps/web/src/app/theme-colors.css), then applies them through Radix color aliases:

- `--mentara-1..12`, `--mentara-a1..a12`, `--mentara-surface`, `--mentara-contrast`
- `--gray-1..12`, `--gray-a1..a12`, `--gray-surface`, `--gray-contrast`
- `.radix-themes { --green-* -> --mentara-* }`

The app currently sets:

```tsx
<Theme
  accentColor="green"
  grayColor="gray"
  panelBackground="solid"
  radius="large"
  scaling="100%"
>
```

in [`apps/web/src/app/providers.tsx`](/home/tr-ggr/NerdProjects/mentara-ecosystem/mentara-oe/apps/web/src/app/providers.tsx).

## Brand Identity & Design Philosophy

Mentara should feel:

- Safe and human: calm but not sterile
- Competent and trustworthy: clinical reliability without clinical coldness
- Filipino and inclusive: respectful of language, family context, and community care
- Immediate in crisis: clear, high-priority safety affordances

Flat design supports this by:

- Reducing cognitive load with clear surfaces, simple geometry, and predictable interactions
- Improving focus for users under stress through strong hierarchy and whitespace
- Making critical actions obvious via saturated color contrast and minimal decorative noise

### Cultural UX Principles (Philippine Context)

- Lead with `malasakit` (care): copy and visual tone should feel supportive, never judgmental
- Enable `bayanihan` (community): community and peer-support modules should emphasize safety and moderation
- Respect multilingual reality: English and Filipino can coexist in UI labels and helper text
- Avoid stigma markers: avoid imagery/icons implying "broken," "dangerous," or "othered"

## Color Palette

Direction: **Hybrid refresh**. Keep the current sage trust anchor, then add warmer/saturated supporting accents for flat UI clarity.

### Core Brand & Semantic Tokens

| Token | Hex | Usage | Rationale |
|---|---|---|---|
| `mentara.trust` | `#879E73` | Primary CTAs, active controls, key highlights | Existing Mentara anchor; steady, grounded, calming |
| `mentara.trustStrong` | `#566C43` | Text/icons on light surfaces, pressed states | Improves contrast and action certainty |
| `mentara.warm` | `#F08A5D` | Encouragement accents, progress highlights | Adds warmth/humanity without alarm |
| `mentara.community` | `#1F9D8B` | Peer/community surfaces, badges | Signals social connection and continuity |
| `mentara.info` | `#2F6FED` | Informational states and links | Clear, familiar utility color |
| `semantic.success` | `#1D9A52` | Confirmations and completed health steps | Positive, stable completion cue |
| `semantic.warning` | `#F2A93B` | Caution and pending-risk states | Attention-grabbing, non-panic |
| `semantic.error` | `#D64545` | Validation/system errors | Strong but distinct from crisis color |
| `semantic.crisis` | `#C62828` | NCMH hotline and emergency action | Highest urgency, reserved only for safety-critical actions |
| `neutral.bg` | `#F8FAFC` | App background (light) | Soft neutral to reduce glare |
| `neutral.surface` | `#FFFFFF` | Cards/forms (light) | Maximum readability |
| `neutral.text` | `#17212B` | Primary text (light) | High-legibility base |

### Radix Token Override Pattern

Use this pattern to keep implementation consistent with current stack:

```css
/* app/theme-colors.css */
.radix-themes {
  --green-9: #879e73;
  --green-10: #7c9269;
  --green-11: #566c43;

  --orange-9: #f08a5d;
  --teal-9: #1f9d8b;
  --blue-9: #2f6fed;
  --amber-9: #f2a93b;
  --red-9: #d64545;
}

/* Crisis color kept separate to avoid accidental reuse */
:root {
  --crisis-9: #c62828;
  --crisis-10: #a91f1f;
  --crisis-11: #7f1717;
}
```

### Light/Dark Behavior Rules

- Light mode defaults for onboarding, forms, and long reading sessions
- Dark mode preserves token intent, not exact luminance
- `semantic.crisis` keeps highest salience in both modes
- Avoid using pure black backgrounds; keep Radix neutral ramps for reduced eye strain

## Typography

### Typeface Recommendations

- Primary UI/body: `Lato`, fallback to current sans stack
- Display/emphasis (optional, sparse): `Museo Slab` equivalent for hero headlines only
- Keep all functional UI (forms, buttons, alerts) in sans-serif

### CSS Font Tokens

```css
:root {
  --font-ui: 'Lato', 'Avenir Next', 'Segoe UI', 'Noto Sans', 'Liberation Sans', sans-serif;
  --font-display: 'Museo Slab', 'Iowan Old Style', 'Palatino Linotype', serif;
}
```

### Type Scale

| Style | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `H1` | `clamp(2rem, 5vw, 2.5rem)` | `700` | `1.2` | Landing hero, major page titles |
| `H2` | `1.75rem` | `700` | `1.25` | Section headers |
| `H3` | `1.375rem` | `600` | `1.3` | Card titles, modal titles |
| `H4` | `1.125rem` | `600` | `1.35` | Subsections, grouped fields |
| `Body-lg` | `1rem` | `400` | `1.6` | Main content |
| `Body` | `0.9375rem` | `400` | `1.6` | Default UI text |
| `Caption` | `0.8125rem` | `400` | `1.5` | Metadata, hints |
| `Label` | `0.875rem` | `600` | `1.4` | Input labels, chips, buttons |

### Bilingual (English + Filipino) Handling

- Prefer short, direct sentence structures in both languages
- Keep labels in one language per element; use helper text for bilingual clarification
- Maintain 45-75 character line lengths for body copy
- Use sentence case for supportive tone; avoid all-caps except compact status badges

## Iconography

No icon package is currently installed.

### Style Rules

- Flat, geometric, rounded-corner shapes
- Stroke-first style, `1.75px` to `2px` visual weight
- Default grid: `24x24`; compact: `20x20`; dense data rows: `16x16`
- Avoid mixed icon metaphors (do not combine outline and filled sets in same feature)

### Mental Health-Sensitive Guidance

- Prefer neutral supportive metaphors: chat, shield, calendar, people, heart outline
- Avoid stigmatizing metaphors: cracked head, danger silhouettes, "insanity" symbols
- Crisis icon should be explicit and practical (`phone`, `lifeline`, `alert`) not dramatic

### Future Package Recommendation

If adding icons, prefer `@radix-ui/react-icons` for close Radix fit or `lucide-react` for broad set consistency.

## Buttons & Interactive Elements

### Button Variants (Radix-first)

| Variant | Intent | Visual |
|---|---|---|
| Primary | Main action | Solid trust color (`green`) |
| Secondary | Alternative action | Soft/outline neutral |
| Ghost | Low-emphasis contextual action | Transparent background |
| Destructive | Irreversible non-crisis actions | Red semantic |
| Crisis | NCMH hotline / immediate safety | Dedicated `--crisis-*` token |

### State Requirements

- `default`: high contrast label and clear boundary
- `hover`: 6-10% darken or elevated shadow
- `active`: clear pressed feedback within 80-120ms
- `disabled`: lower contrast + remove shadow + `not-allowed` cursor
- `loading`: preserve width and show progress affordance

### Radix + Utility Example

```tsx
import { Button } from '@radix-ui/themes';

<Button color="green" size="3" radius="large">Book Session</Button>
<Button variant="soft" color="gray">View Profile</Button>
<Button variant="ghost" color="gray">Maybe later</Button>
<Button color="red">Delete Draft</Button>

<Button className="bg-[var(--crisis-9)] hover:bg-[var(--crisis-10)] active:bg-[var(--crisis-11)] text-white shadow-sm">
  Call NCMH Crisis Hotline
</Button>
```

### Crisis Action Rules

- Crisis button must be globally recognizable and always text-explicit
- Never co-locate crisis action directly beside destructive account actions
- On mobile, keep crisis action within thumb reach and persistent in key flows

## Spacing & Layout Grid

### Spacing System

- Base unit: `4px`
- Core rhythm: `4, 8, 12, 16, 24, 32, 40, 48, 64`
- Mobile-first comfortable content padding: `16px`
- Card internal padding: `16px` mobile, `24px` desktop

### Tailwind Mapping

| Purpose | Tailwind utility |
|---|---|
| Section vertical spacing | `py-8 md:py-12` |
| Standard card padding | `p-4 md:p-6` |
| Dense inline grouping | `gap-2` |
| Standard component gap | `gap-4` |
| Generous block separation | `gap-6 md:gap-8` |

### Layout Rules

- Primary screen width targets: `max-w-sm` to `max-w-3xl` for therapeutic content
- Avoid overcrowded dashboards; group into progressive disclosure cards
- Keep at least one full spacing unit between unrelated emotional contexts (e.g., progress vs crisis)

## Illustrations & Imagery

### Illustration Style

- Flat, minimal shapes with low-detail facial features
- Warm, reassuring compositions; avoid chaotic or over-stimulating scenes
- Use sparse accent colors with neutral backgrounds

### Representation Principles

- Reflect Filipino diversity: age, skin tone, regional identity, language context
- Include family/community-support visual narratives without enforcing stereotypes
- Avoid “before/after suffering” storytelling patterns

### Photography Guidance

- Prefer candid, grounded moments over staged clinical imagery
- Avoid white-coat, hospital-dominant visual language unless medically necessary

## Component Library Overview

Build with Radix primitives and `@radix-ui/themes` components; use utility classes only for layout and exceptional tokens.

| Component | Structure | Variants / Notes |
|---|---|---|
| Navigation bar | Brand, primary nav, profile, crisis action | Sticky on mobile; crisis shortcut always present |
| Therapist profile card | Avatar, name, credentials, languages, match score, CTA | Compact and expanded card formats |
| Session card | Date/time, mode, therapist, status, join CTA | `upcoming`, `completed`, `reschedule-needed` |
| Community post card | Author, content, tags, moderation status, actions | Emphasize reporting/safety actions |
| Modal | Title, body, primary/secondary actions | Use for confirmations and sensitive warnings |
| Form inputs | Label, helper text, field, inline validation | Always show clear error/help messaging |
| Tags/chips | Topic and language filters | `soft` style by default; strong color only when selected |
| Avatar | Initials/photo + status indicator | Availability and verification states |
| Alerts/notifications | Inline or toast with icon + text + action | `info`, `success`, `warning`, `error`, `crisis` |
| Crisis safety banner | Plain-language copy + one-tap hotline + optional chat link | Persistent in high-risk workflows |

### Suggested Theme Baseline

```tsx
<Theme
  accentColor="green"
  grayColor="gray"
  radius="large"
  panelBackground="solid"
  scaling="100%"
>
  {children}
</Theme>
```

## Accessibility Standards

Target: **WCAG 2.1 AA minimum**.

### Non-negotiable Requirements

- Text contrast: at least `4.5:1` for body text, `3:1` for large text/icons
- Interactive targets: minimum `44x44px`
- Keyboard access: full tab order, visible focus ring, escape-close for dialogs
- Error recovery: clear inline guidance and non-punitive language
- Motion sensitivity: respect `prefers-reduced-motion`

### Distress-Optimized Readability

- Keep critical text concise and action-led
- Use predictable labels: "Book session", "Talk to someone now", "Get help"
- Prevent ambiguity in high-stress moments; avoid figurative wording for safety actions

## Voice & Tone in UI Copy

### Tone Attributes

- Warm, professional, and practical
- Trauma-informed and non-judgmental
- Culturally aware without forced slang

### Writing Rules

- Prefer direct supportive phrasing over institutional/legal tone
- Use people-first language
- Avoid diagnostic labeling in non-clinical contexts
- Keep bilingual phrasing simple and respectful

### Example Copy Patterns

| Context | Preferred copy |
|---|---|
| Empty therapy matches | "We are finding therapists that fit your needs and language." |
| Session reminder | "Your session starts in 15 minutes. Join when you are ready." |
| Community guardrail | "Please keep this space safe and respectful for everyone." |
| Crisis prompt | "If you are in immediate danger, call the NCMH Crisis Hotline now." |

## Developer Quick Start

1. Keep Mentara green as the primary Radix accent and layer warm/community semantics via token overrides.
2. Implement new UI with Radix Themes components first; use Tailwind utilities for layout rhythm.
3. Reserve `--crisis-*` for emergency-only CTAs and banners.
4. Validate contrast, focus visibility, and 44x44 targets before merge.
