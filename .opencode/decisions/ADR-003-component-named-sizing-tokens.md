# ADR-003: Component-Named Sizing Tokens in the Flavor Layer

**Status:** Accepted  
**Date:** 2026-06-09  
**Author:** sando-architect  
**Affects:** TA-CR-R5 (TOKEN_ARCHITECTURE.toon), Flavor layer sizing namespace  
**Priority:** P3 (resolved pre-P0)

---

## Context

Guideline TA-CR-R5 states: **"Flavors provide semantic meaning (use context), not value descriptions."** By extension, component names should not appear in the Flavor layer — they describe _use context_, not _which component uses them_.

However, the `sizing.*` namespace in every flavor's `flavor.json` contains two entries that embed component names:

| Token             | Scope                                                     | Present since   |
| ----------------- | --------------------------------------------------------- | --------------- |
| `sizing.toggle.*` | track width/height per size, thumb size, offset           | Pre-M0 (legacy) |
| `sizing.avatar.*` | container diameter, font size, presence dot size per size | #133 (post-M0)  |

Both appear identically across all 7 flavors (sando, original, strawberry, nori, egg-salad, kiwi, tonkatsu). No dark/contrast/motion mode files contain sizing overrides — these are absolute-dimensional tokens, not theme-dependent.

The rest of the `sizing.*` namespace uses generic semantic keys:

- `sizing.control.*` — general interactive control dimensions (xs–xl)
- `sizing.icon.*` — icon container dimensions
- `sizing.indicator.*` — badge/dot dimensions

### Usage in Recipes

| Recipe        | References                                                                                                                          | Count         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `switch.json` | `{sizing.toggle.track.*}`, `{sizing.toggle.thumb.*}`, `{sizing.toggle.offset}`                                                      | 12 references |
| `avatar.json` | `{sizing.avatar.*.dimension}`, `{sizing.avatar.*.fontSize}`, `{sizing.avatar.*.presenceDot}`, `{sizing.avatar.presenceBorderWidth}` | 16 references |

### Proliferation Risk

Only 2 of 20+ components have component-named sizing tokens. No new component-named entries have appeared since `sizing.avatar` was added in PR #133. The pattern is self-evident in the JSON and naturally gated by the question: _"Does this component have physical geometry no generic size can express?"_

---

## Options Considered

### Option A — Document as Explicit Exception (XS effort)

Amend TA-CR-R5 with a carve-out permitting component-named sizing tokens when the dimension is intrinsic to a specific component's physical geometry and no generic semantic equivalent exists.

- **No token changes required** — 0 files modified in packages/
- **Only guideline change** — amend TA-CR-R5 in TOKEN_ARCHITECTURE.toon
- **P0 CSS chunking unaffected** — no namespace refactor needed
- **Risk:** Sets a documented precedent (mitigated by clear criteria)

### Option B — Refactor (L effort)

Rename `sizing.toggle.*` and `sizing.avatar.*` to generic semantic equivalents, e.g. `sizing.control.toggle.*`, `sizing.thumbnail.*`.

- **Scope:** 7 flavor.json files, 2 recipe files, 2+ component implementations
- **Problem:** Renaming to `sizing.control.toggle.*` still contains "toggle" — the component name is inherent to the geometry description. Adding "control." as a prefix adds no semantic value.
- **No semantic equivalent exists for avatar:** Avatar sizing is a coordinated triplet (container diameter + font size + presence dot size) with no generic "thumbnail" or "media" concept that conveys circular cropping, font scaling, and dot positioning.
- **Risk:** Breaking change requiring semver major bump across tokens and components
- **P0 CSS chunking affected:** Would need to account for namespace changes

---

## Analysis

### Can `sizing.toggle` be expressed generically?

| Token                           | Value              | Generic alternative                                |
| ------------------------------- | ------------------ | -------------------------------------------------- |
| `sizing.toggle.track.sm.width`  | `{space.8}` (32px) | `sizing.control.sm` = `{space.7}` (28px) — differs |
| `sizing.toggle.track.sm.height` | `{space.5}` (20px) | No generic track height exists                     |
| `sizing.toggle.thumb.sm`        | `{space.3}` (12px) | No generic thumb size exists                       |
| `sizing.toggle.offset`          | `{space.1}` (4px)  | No generic offset exists                           |

The toggle track has a specific aspect ratio (e.g., 32×20 for sm) that does not match `sizing.control.*` values. The thumb and offset are derived from track proportions. These are **physical geometry** — not semantic usage context.

### Can `sizing.avatar` be expressed generically?

| Size | Avatar dim | `sizing.control` | Match? |
| ---- | ---------- | ---------------- | ------ |
| xs   | 24px       | 20px             | ✗      |
| sm   | 32px       | 28px             | ✗      |
| md   | 40px       | 32px             | ✗      |
| lg   | 48px       | 40px             | ✗      |
| xl   | 64px       | 52px             | ✗      |

Plus each avatar size carries a coordinated font size and presence dot diameter. This is a multi-property sizing grid intrinsic to avatar geometry.

### Refactoring illusion

Option B would rename but not eliminate the problem. `sizing.control.toggle.track.sm.width` still contains "toggle". The only way to truly remove the component name would be to invent artificial generic names (e.g., `sizing.controlTrack.sm.width`) that obscure meaning and reduce developer ergonomics.

---

## Decision

**Adopt Option A — Document as explicit exception.**

TA-CR-R5 is amended with the following carve-out, added as a new `exception` block immediately after the existing rule body:

> **Exception — Component-Named Sizing Tokens**  
> Component-named sizing tokens in the Flavor layer are permitted when the dimension is intrinsic to a specific component's physical geometry and no generic semantic equivalent exists.
>
> Criteria for the exception:
>
> 1. The dimension encodes a specific physical proportion that cannot be generalized (e.g., aspect ratio of a toggle track, circular diameter of an avatar).
> 2. The dimension is part of a coordinated multi-property set (e.g., avatar container + font + presence dot) that must stay locked per size.
> 3. No existing `sizing.control.*` or other generic sizing token can express the same physical dimension.
>
> Existing tokens satisfying this exception: `sizing.toggle.*`, `sizing.avatar.*`.  
> Any NEW component-named sizing tokens MUST be reviewed against these criteria during PR review.

---

## Consequences

### Positive

- **Zero breaking changes** — no recipe, component, or consumer code modifications
- **P0 CSS bundle chunking proceeds without disruption** — no namespace refactor needed
- **Guideline is clarified** — future agents/developers understand when component-named sizing tokens are appropriate
- **Exception is bounded** — clear 3-criteria test prevents uncontrolled proliferation

### Negative

- TA-CR-R5 is no longer a hard "component names never appear in Flavors" rule — it has a documented exception
- Two tokens remain that look like architectural debt in an idealized model

### Mitigations

- The exception is documented in the guideline itself (not a separate document), so it's visible during all agent/developer reviews
- PR review gate criteria prevent new component-named tokens without justification
- Periodic audits (e.g., quarterly) can verify no new component-named tokens violate the criteria

---

## References

- TA-CR-R5 in `.opencode/guidelines/01-design-system/TOKEN_ARCHITECTURE.toon` (lines 153–174)
- Flavor layer spec TA-TLA-L2 (lines 298–371)
- `packages/tokens/src/flavors/sando/flavor.json` (lines 527–752)
- `packages/tokens/src/recipes/switch.json` (lines 163–241)
- `packages/tokens/src/recipes/avatar.json` (lines 3–113)
