# ADR-006: sando-form Scope for v1.0

## Status

Proposed

## Context

Issue #85 poses the question: should `<sando-form>` be promoted to stable, shipped
as `@experimental`, or deferred entirely for v1.0?

The component is substantive: 766 LOC implementation, 503 LOC unit tests, 170 LOC
accessibility tests, full JSDoc coverage, and a public API surface comprising 7
props, 5 events, 4 public methods (`submit`, `reset`, `validate`, `markAsPristine`,
`clearErrors`, `getFormData`, `getJson`, `setLoading`), and an `addError` callback
surfaced through `FormValidateEventDetail`.

The RFC framing is therefore not about implementation readiness but about whether
the API surface is stable enough to commit to under semver for 1.0. Three open
questions govern that determination.

---

## Open Question Analysis

### OQ-1: `FORM_CONTROL_SELECTORS` extensibility

**Finding.** The constant is a module-level `const` (line 23-33 of `sando-form.ts`),
built once at load time and joined into a single selector string. It is used in
three private methods (`_getFormControls` at line 484, `_handleFormChange` at line
699, `_propagateLoadingState` via the controls list), and one inline selector for
button discovery. There is no static property, no hook, and no event mechanism for
consumers to contribute additional selectors at runtime.

**Impact on M6.** The M6 milestone will introduce custom Sando-shaped inputs (e.g.
`sando-date-picker`, `sando-file-upload`, third-party `name`-attributed Web
Components). To integrate with `<sando-form>` today, those components would need to
match one of the nine hardcoded selectors. They cannot. This means that every M6
custom input either (a) ships its own form coordination logic independent of
`sando-form`, or (b) forces a breaking change to the stable `sando-form` contract
— a `major` bump.

**Can it be solved in M1?** Yes, with low effort. Exposing a static property
`SandoForm.additionalSelectors: string[]` (append-only, read at query time instead
of constant-join time) would make the discovery mechanism open/closed-compliant.
This is a purely additive change to the class interface — no existing prop or event
type is modified. It does not block M1 delivery.

**Verdict.** Solvable before the 1.0 cut. If Option A is taken, this must be
resolved as task A2 before the stable label is attached. If left unresolved, the
locked-in selector set makes stable promotion dangerous (forces a future major bump
to support M6).

---

### OQ-2: `addError` is form-level only

**Finding.** `addError(name, message)` is a callback inside `FormValidateEventDetail`
(types line 89, implementation line 233-235). When called, `_addCustomError` finds
the control by `[name="${name}"]` and sets `error = true` plus `errorText = message`
on it (lines 726-733). The form-level `sando-validate` event is the only surface
that exposes this callback; there is no imperative API on the component itself and
no field-level event.

**Is this blocking for v1.0?** No. The existing design covers the dominant use case:
custom server-side or schema-validation errors are delivered after a submit attempt,
and the handler can call `addError` for each field in the same synchronous callback.
The fact that the entry point is the form event rather than a per-field event is an
architectural choice, not a deficiency. The Zod/Valibot integration recipe described
in the issue tasks works correctly within this model.

A field-level API (e.g. `form.addError(name, msg)` as a public method, or a per-
field `sando-field-validate` event) would be a purely additive enhancement for 1.1
once real-world patterns emerge. Committing to the current form-level surface now
does not prevent that addition later without a breaking change.

**Can it be improved in M1?** Optionally. Exposing `addError` as a direct public
method on `SandoForm` (mirroring the callback signature) would make it callable
imperatively (e.g. after an async server response) without depending on the event
lifecycle. This is additive, low-risk, and would complete the API ergonomics story
for 1.0. It is recommended but not blocking.

**Verdict.** Not a blocker. Current surface is sufficient for v1.0 under either A
or B. Optional improvement: expose `addError(name, message)` as a public imperative
method on the class.

---

### OQ-3: `enctype` type union vs. `string`

**Finding.** The type is `'application/x-www-form-urlencoded' | 'multipart/form-data'
| 'text/plain'` (types line 149, component line 131). This is the exhaustive set of
values accepted by the HTML `enctype` attribute per the HTML Living Standard. The
implementation passes the value directly to the native `<form>` element's `enctype`
attribute (render line 743) without branching on it.

**Semver impact assessment.** The HTML spec is unlikely to add a new enctype value.
Non-standard values (e.g. `application/json` as explored in an old W3C proposal)
are not accepted by native forms and would require custom serialization logic in
`sando-form` itself — a feature addition, not a type widening. Widening to `string`
would weaken type safety with no practical benefit. Narrowing the union later would
be a breaking change. The current closed union is correct.

**If a new enctype is ever needed.** Adding a value to the union is a non-breaking
change for consumers (TypeScript will still accept all previously valid values). The
only breaking scenario would be removing a value from the union, which has no
plausible motivation.

**Verdict.** No action required. The current union is the correct and stable type.
This question is closed.

---

## Package Exports Gotcha

**Finding.** The wildcard export in `packages/components/package.json` is:

```json
"./*": {
  "import": "./dist/components/*/sando-*.js",
  "types": "./dist/components/*/sando-*.d.ts"
}
```

The wildcard `*` in `"./*"` is a single path segment. The subpath
`./experimental/form` contains two segments (`experimental` and `form`), so Node's
exports resolution does not match it against `./*`. An explicit entry is required:

```json
"./experimental/form": {
  "import": "./dist/components/form/sando-form.js",
  "types": "./dist/components/form/sando-form.d.ts"
}
```

Additionally, `SandoForm` is currently re-exported from the root barrel
(`packages/components/src/index.ts` lines 54-56). Under Option B, removing it from
`index.ts` would leave `@sando-ds/components/form` still resolvable via the
wildcard (single-segment match). To prevent dual-path exposure under Option B, the
safest approach is: (a) keep the explicit `./experimental/form` entry, and (b) add
a blocking null entry `"./form": null` to suppress the wildcard match for that path.
Node resolves explicit entries before wildcards, so `null` wins.

---

## Decision

**Option A — Promote to stable — with OQ-1 resolved before the 1.0 cut.**

The implementation is production-quality. OQ-2 and OQ-3 are not blockers. OQ-1 is
the only genuine stability risk, and it is solvable with a small, additive API
change before the cut (expose `SandoForm.additionalSelectors`). Shipping as
experimental (B) is the conservative hedge but carries its own costs: it signals
uncertainty where there is none, requires a non-trivial package.json restructure,
and creates a two-import-path reality that must be cleaned up in 1.1.

Option C (defer) is rejected. Discarding 766 LOC + 673 LOC of tests from a mature,
accessible, fully-documented component has no justification given the analysis above.

**Conditional.** If OQ-1 cannot be resolved before the 1.0 feature freeze (i.e. if
the team decides the extensibility design requires broader discussion), then fall
back to **Option B** as described in the issue tasks. The package.json gotcha above
must be implemented correctly if B is chosen.

---

## Consequences

**Positive**

- Completes the form story for 1.0 with a single, stable import path.
- Consumers get semver guarantees on the event contracts
  (`FormSubmitEventDetail`, `FormValidateEventDetail`) and props from day one.
- No "experimental" stigma on a component that is demonstrably ready.
- OQ-1 resolution (`additionalSelectors`) makes M6 custom input integration
  possible without a future major bump.

**Negative**

- Committing to the `FormSubmitEventDetail` / `FormValidateEventDetail` shape
  means any future reshape is a `major`. The current shape is well-modeled but
  must be treated as frozen.
- Resolving OQ-1 before the cut requires a small amount of additional implementation
  work and a design decision on the `additionalSelectors` API contract.

**Neutral**

- The `enctype` type union is already correct; no change needed.
- `addError` as a form-level-only surface is a deliberate constraint, not a gap.
  A public imperative method can be added in 1.1 without breaking anything.
- The existing test suite (503 + 170 LOC) must be updated to cover the new
  `additionalSelectors` static property when OQ-1 is resolved.

---

## Alternatives Considered

**Option A without resolving OQ-1.** Rejected. Promoting to stable with a hardcoded
selector list locks the M6 milestone into either workarounds or a major bump. The
fix is low-effort; skipping it to save time is a false economy.

**Option B (ship as experimental).** Viable fallback if OQ-1 resolution is deferred.
Requires correct package.json restructure (explicit `./experimental/form` entry plus
`"./form": null` suppressor, removal from root barrel). The `@experimental` JSDoc
tag must be at the class level (not file level) to appear correctly in the CEM.
Acceptable if the team cannot commit the OQ-1 implementation time in M1.

**Option C (defer entirely).** Rejected unconditionally. The component passes its
own accessibility and unit test suites, has complete JSDoc, and implements
progressive enhancement. Removing it from the package creates gratuitous churn with
zero benefit.

---

## Implementation Notes (for sando-developer if Option A is chosen)

### Required before stable promotion

**1. Resolve OQ-1 — open selector extensibility**

Add a static property to `SandoForm`:

```ts
/**
 * Additional CSS selectors for custom form controls.
 * Append to this array to integrate third-party or future Sando controls
 * with sando-form's discovery, validation, and loading propagation.
 *
 * @example
 * SandoForm.additionalSelectors.push('my-input[name]');
 */
static additionalSelectors: string[] = [];
```

Update `_getFormControls` to build the selector at query time:

```ts
private _getFormControls(): HTMLElement[] {
  const allSelectors = [
    ...FORM_CONTROL_SELECTORS.split(', '),
    ...SandoForm.additionalSelectors
  ].join(', ');
  return Array.from(this.querySelectorAll(allSelectors));
}
```

Update `_handleFormChange` similarly (replace the constant reference with the
composed selector). The constant `FORM_CONTROL_SELECTORS` becomes the default base
and can remain as-is.

**2. Expose `addError` as a public imperative method (recommended)**

```ts
/**
 * Programmatically set a validation error on a named field.
 * Useful for applying server-side errors after an async submit response.
 */
addError(name: string, message: string): void {
  this._addCustomError(name, message);
}
```

This makes `_addCustomError` private-to-public without changing its implementation.

**3. Root barrel export** — already present in `src/index.ts`. No change needed.

**4. Coverage gate** — run `pnpm --filter @sando-ds/components test:coverage` and
confirm `sando-form` meets or exceeds 90% before merging.

### If falling back to Option B

- Remove `SandoForm` and its type exports from `packages/components/src/index.ts`.
- Add to `packages/components/package.json` exports (before the `"./*"` wildcard):
  ```json
  "./form": null,
  "./experimental/form": {
    "import": "./dist/components/form/sando-form.js",
    "types": "./dist/components/form/sando-form.d.ts"
  }
  ```
- Add `@experimental` tag at the `SandoForm` class JSDoc block (not file header).
- New guide page: `apps/docs/stories/guides/ExperimentalComponents.mdx`.
