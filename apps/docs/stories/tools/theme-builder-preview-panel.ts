/**
 * Theme Builder — Preview Panel
 *
 * Renders real Sando components inside a scoped container that has the
 * current builder values injected as CSS custom property overrides.
 * Because CSS custom properties cascade through Shadow DOM, every component
 * inside the canvas picks up the live ingredient values without a token
 * build step.
 *
 * This panel has no JSON output and does not emit tb-panel-change.
 */

import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import type { BuilderState } from "./theme-builder-types.js";

// Register all Sando custom elements so they're available in the canvas.
import "@sando-ds/components";

// ---------------------------------------------------------------------------
// CSS override builder
// ---------------------------------------------------------------------------

function buildOverrideVars(state: BuilderState): string {
  const vars: string[] = [];

  // -- Colors ---------------------------------------------------------------
  const colorsData = state.colors?.json as
    | { color?: Record<string, Record<string, { value: string }>> }
    | undefined;
  if (colorsData?.color) {
    const colorKey = Object.keys(colorsData.color)[0];
    const p = colorsData.color[colorKey];
    if (p) {
      const v = (step: string) => p[step]?.value;
      if (v("50")) vars.push(`--sando-color-focus-background: ${v("50")}`);
      if (v("400")) vars.push(`--sando-color-border-on-solid: ${v("400")}`);
      if (v("500"))
        vars.push(`--sando-color-text-selection-default: ${v("500")}`);
      if (v("600")) {
        vars.push(`--sando-color-focus-ring: ${v("600")}`);
        vars.push(`--sando-color-border-emphasis: ${v("600")}`);
        vars.push(`--sando-color-icon-interactive: ${v("600")}`);
      }
      if (v("700")) {
        vars.push(`--sando-color-action-solid-background-default: ${v("700")}`);
        vars.push(`--sando-color-border-brandEmphasis: ${v("700")}`);
        vars.push(`--sando-color-text-link-default: ${v("700")}`);
      }
      if (v("800")) {
        vars.push(`--sando-color-action-solid-background-hover: ${v("800")}`);
        vars.push(`--sando-color-text-link-hover: ${v("800")}`);
      }
      if (v("900")) {
        vars.push(`--sando-color-focus-text: ${v("900")}`);
        vars.push(`--sando-color-text-link-active: ${v("900")}`);
      }
    }
  }

  // -- Typography -----------------------------------------------------------
  const typData = state.typography?.json as
    | {
        font?: {
          family?: {
            heading?: { value: string };
            body?: { value: string };
            code?: { value: string };
          };
        };
      }
    | undefined;
  if (typData?.font?.family) {
    const { heading, body, code } = typData.font.family;
    if (heading?.value)
      vars.push(`--sando-font-family-heading: ${heading.value}`);
    if (body?.value) vars.push(`--sando-font-family-body: ${body.value}`);
    if (code?.value) vars.push(`--sando-font-family-mono: ${code.value}`);
  }

  // -- Shape ----------------------------------------------------------------
  const shapeData = state.shape?.json as
    | {
        border?: {
          radius?: Record<string, { value: string }>;
          width?: { default?: { value: string } };
        };
      }
    | undefined;
  if (shapeData?.border) {
    const r = shapeData.border.radius;
    const w = shapeData.border.width;
    if (r?.xs?.value) vars.push(`--sando-border-radius-muted: ${r.xs.value}`);
    if (r?.sm?.value) vars.push(`--sando-border-radius-default: ${r.sm.value}`);
    if (r?.md?.value)
      vars.push(`--sando-border-radius-emphasis: ${r.md.value}`);
    if (r?.lg?.value) vars.push(`--sando-border-radius-full: ${r.lg.value}`);
    if (w?.default?.value) {
      vars.push(`--sando-border-width-default: ${w.default.value}`);
      vars.push(`--sando-border-width-stroke: ${w.default.value}`);
    }
  }

  // -- Motion ---------------------------------------------------------------
  const motionData = state.motion?.json as
    | {
        animation?: {
          duration?: Record<string, { value: string }>;
          easing?: Record<string, { value: string }>;
        };
      }
    | undefined;
  if (motionData?.animation) {
    const dur = motionData.animation.duration;
    const ease = motionData.animation.easing;
    if (dur?.micro?.value)
      vars.push(`--sando-animation-duration-fast: ${dur.micro.value}`);
    if (dur?.standard?.value)
      vars.push(`--sando-animation-duration-normal: ${dur.standard.value}`);
    if (dur?.expressive?.value)
      vars.push(`--sando-animation-duration-slow: ${dur.expressive.value}`);
    if (ease?.micro?.value)
      vars.push(`--sando-animation-easing-entrance: ${ease.micro.value}`);
    if (ease?.standard?.value)
      vars.push(`--sando-animation-easing-default: ${ease.standard.value}`);
    if (ease?.expressive?.value)
      vars.push(
        `--sando-animation-easing-continuous: ${ease.expressive.value}`,
      );
  }

  // -- Elevation ------------------------------------------------------------
  const elevData = state.elevation?.json as
    | { elevation?: Record<string, { value: string }> }
    | undefined;
  if (elevData?.elevation) {
    const e = elevData.elevation;
    if (e["0"]?.value) vars.push(`--sando-elevation-0: ${e["0"].value}`);
    if (e["100"]?.value) vars.push(`--sando-elevation-100: ${e["100"].value}`);
    if (e["200"]?.value) vars.push(`--sando-elevation-200: ${e["200"].value}`);
    if (e["300"]?.value) vars.push(`--sando-elevation-300: ${e["300"].value}`);
    if (e["400"]?.value) vars.push(`--sando-elevation-400: ${e["400"].value}`);
    if (e["500"]?.value) vars.push(`--sando-elevation-500: ${e["500"].value}`);
  }

  return vars.join("; ");
}

// ---------------------------------------------------------------------------
// SandoTbPreviewPanel
// ---------------------------------------------------------------------------

export class SandoTbPreviewPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 52px);
      background: #f8f8f8;
    }

    /* ---- Status bar ---- */
    .status-bar {
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      padding: 12px 32px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .status-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #aaa;
      margin-right: 4px;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      border: 1px solid;
    }

    .status-pill.ready {
      background: #f0fdf4;
      color: #16a34a;
      border-color: #bbf7d0;
    }

    .status-pill.pending {
      background: #fafafa;
      color: #aaa;
      border-color: #e5e5e5;
    }

    .status-pill-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }

    .status-pill.ready .status-pill-dot {
      background: #22c55e;
    }

    .status-pill.pending .status-pill-dot {
      background: #ddd;
    }

    /* ---- Canvas ---- */
    .canvas-outer {
      padding: 40px;
    }

    .canvas-hint {
      text-align: center;
      padding: 60px 24px;
      color: #bbb;
      font-size: 14px;
      line-height: 1.6;
    }

    .canvas-hint strong {
      display: block;
      font-size: 16px;
      color: #999;
      margin-bottom: 8px;
    }

    /* ---- Themed canvas wrapper ---- */
    .canvas {
      background: var(--sando-color-background-base, #fafaf9);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    /* ---- Sections inside canvas ---- */
    .section {
      padding: 32px;
      border-bottom: 1px solid var(--sando-color-border-muted, #e5e5e5);
    }

    .section:last-child {
      border-bottom: none;
    }

    .section-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--sando-color-text-muted, #aaa);
      margin: 0 0 20px;
    }

    .section-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }

    /* ---- Form scenario ---- */
    .form-scenario {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 700px) {
      .form-scenario {
        grid-template-columns: 1fr;
      }
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* ---- Card scenario ---- */
    .card-row {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: flex-start;
    }

    /* ---- Type specimen ---- */
    .type-specimen {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .specimen-display {
      font-size: 2rem;
      font-weight: 700;
      font-family: var(--sando-font-family-heading, inherit);
      color: var(--sando-color-text-heading, #111);
      line-height: 1.15;
      letter-spacing: -0.03em;
    }

    .specimen-body {
      font-size: 1rem;
      font-family: var(--sando-font-family-body, inherit);
      color: var(--sando-color-text-body, #444);
      line-height: 1.6;
    }

    .specimen-link {
      color: var(--sando-color-text-link-default, #555);
      font-family: var(--sando-font-family-body, inherit);
      font-size: 0.875rem;
      cursor: pointer;
    }

    .specimen-code {
      font-family: var(--sando-font-family-mono, monospace);
      font-size: 0.8125rem;
      background: var(--sando-color-background-surface, #f5f5f5);
      padding: 10px 14px;
      border-radius: var(--sando-border-radius-default, 4px);
      color: var(--sando-color-text-body, #444);
    }
  `;

  @property({ attribute: false }) builderState: BuilderState = {};

  private get _hasAnyState(): boolean {
    return (
      this.builderState.colors?.isReady === true ||
      this.builderState.typography?.isReady === true ||
      this.builderState.shape?.isReady === true ||
      this.builderState.motion?.isReady === true ||
      this.builderState.elevation?.isReady === true
    );
  }

  private _pill(label: string, key: keyof BuilderState) {
    const ready = this.builderState[key]?.isReady === true;
    return html`
      <span class="status-pill ${ready ? "ready" : "pending"}">
        <span class="status-pill-dot"></span>
        ${label}
      </span>
    `;
  }

  override render() {
    const overrideStyle = buildOverrideVars(this.builderState);

    return html`
      <!-- Status bar -->
      <div class="status-bar">
        <span class="status-label">Applied</span>
        ${this._pill("Colors", "colors")}
        ${this._pill("Typography", "typography")}
        ${this._pill("Shape", "shape")} ${this._pill("Motion", "motion")}
        ${this._pill("Elevation", "elevation")}
      </div>

      <!-- Canvas -->
      <div class="canvas-outer">
        ${!this._hasAnyState
          ? html`
              <div class="canvas-hint">
                <strong>Nothing to preview yet</strong>
                Configure at least one ingredient tab (Colors, Typography,
                Shape, Motion, or Elevation) and come back here to see the live
                result.
              </div>
            `
          : html`
              <div class="canvas" data-flavor="sando" style="${overrideStyle}">
                <!-- 1. Typography specimen -->
                <div class="section">
                  <p class="section-label">Typography</p>
                  <div class="type-specimen">
                    <span class="specimen-display">Crafted with care.</span>
                    <span class="specimen-body"
                      >A design system built on warmth, precision, and
                      deliberate craft. Every token is a decision.
                      <span class="specimen-link">Learn more →</span></span
                    >
                    <pre class="specimen-code">
import "@sando-ds/components";</pre
                    >
                  </div>
                </div>

                <!-- 2. Actions -->
                <div class="section">
                  <p class="section-label">Actions</p>
                  <div class="section-row">
                    <sando-button variant="solid">Primary</sando-button>
                    <sando-button variant="outline">Secondary</sando-button>
                    <sando-button variant="ghost">Ghost</sando-button>
                    <sando-button variant="solid" size="sm">Small</sando-button>
                    <sando-button variant="solid" disabled
                      >Disabled</sando-button
                    >
                    <sando-badge>New</sando-badge>
                    <sando-badge variant="success">Active</sando-badge>
                    <sando-tag>Design System</sando-tag>
                    <sando-tag removable>Removable</sando-tag>
                  </div>
                </div>

                <!-- 3. Form -->
                <div class="section">
                  <p class="section-label">Form</p>
                  <div class="form-scenario">
                    <div class="form-field">
                      <sando-label for="preview-name" required
                        >Display name</sando-label
                      >
                      <sando-input
                        id="preview-name"
                        placeholder="e.g. Tonkatsu"
                        value=""
                      ></sando-input>
                    </div>
                    <div class="form-field">
                      <sando-label for="preview-email">Email</sando-label>
                      <sando-input
                        id="preview-email"
                        type="email"
                        placeholder="hello@sando.design"
                      ></sando-input>
                    </div>
                    <div
                      class="form-field"
                      style="justify-content:flex-end;padding-top:8px;"
                    >
                      <sando-switch label="Enable notifications"></sando-switch>
                    </div>
                    <div
                      class="form-field"
                      style="justify-content:flex-end;padding-top:8px;"
                    >
                      <sando-checkbox
                        label="I agree to the terms"
                      ></sando-checkbox>
                    </div>
                  </div>
                </div>

                <!-- 4. Cards -->
                <div class="section">
                  <p class="section-label">Cards</p>
                  <div class="card-row">
                    <sando-card
                      variant="elevated"
                      style="flex:1;min-width:240px;"
                    >
                      <div slot="header">
                        <strong
                          style="font-family:var(--sando-font-family-heading,inherit);font-size:1rem;"
                          >Getting started</strong
                        >
                      </div>
                      <p
                        style="margin:0;font-size:0.875rem;color:var(--sando-color-text-body,#555);"
                      >
                        Start building with Sando. Install the components
                        package and import your first component.
                      </p>
                      <div
                        slot="footer"
                        style="display:flex;gap:8px;justify-content:flex-end;"
                      >
                        <sando-button variant="ghost" size="sm"
                          >Dismiss</sando-button
                        >
                        <sando-button variant="solid" size="sm"
                          >Read docs</sando-button
                        >
                      </div>
                    </sando-card>

                    <sando-card
                      variant="outlined"
                      style="flex:1;min-width:240px;"
                    >
                      <div slot="header">
                        <strong
                          style="font-family:var(--sando-font-family-heading,inherit);font-size:1rem;"
                          >Your flavor</strong
                        >
                      </div>
                      <p
                        style="margin:0;font-size:0.875rem;color:var(--sando-color-text-body,#555);"
                      >
                        Download the ingredient JSON files and run
                        <code
                          style="font-family:var(--sando-font-family-mono,monospace);font-size:0.8em;"
                          >pnpm tokens:build</code
                        >
                        to apply your flavor.
                      </p>
                      <div
                        slot="footer"
                        style="display:flex;gap:8px;justify-content:flex-end;"
                      >
                        <sando-button variant="outline" size="sm"
                          >Download</sando-button
                        >
                      </div>
                    </sando-card>
                  </div>
                </div>
              </div>
            `}
      </div>
    `;
  }
}

customElements.define("sando-tb-preview-panel", SandoTbPreviewPanel);
