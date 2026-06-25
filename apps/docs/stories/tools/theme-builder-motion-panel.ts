/**
 * Theme Builder — Motion Panel
 *
 * Controls for animation duration and easing presets.
 * Renders 3 live animation demo cards with a Replay button.
 * Emits tb-panel-change on every change.
 */

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import {
  MOTION_PRESETS,
  EASING_VALUES,
  type MotionPreset,
  type EasingName,
  type PanelChangeDetail,
} from "./theme-builder-types.js";

// ---------------------------------------------------------------------------
// JSON builder
// ---------------------------------------------------------------------------

function buildMotionJson(
  microDur: string,
  microEase: string,
  stdDur: string,
  stdEase: string,
  exprDur: string,
  exprEase: string
): Record<string, unknown> {
  return {
    animation: {
      duration: {
        micro:      { value: microDur, type: "duration" },
        standard:   { value: stdDur,   type: "duration" },
        expressive: { value: exprDur,  type: "duration" },
      },
      easing: {
        micro:      { value: microEase, type: "cubicBezier" },
        standard:   { value: stdEase,   type: "cubicBezier" },
        expressive: { value: exprEase,  type: "cubicBezier" },
      },
    },
  };
}

const DURATION_OPTIONS = [
  "50ms", "75ms", "100ms", "150ms", "200ms", "250ms",
  "300ms", "400ms", "500ms", "600ms", "700ms", "800ms", "1000ms",
];

const EASING_NAMES = Object.keys(EASING_VALUES) as EasingName[];

// ---------------------------------------------------------------------------
// SandoTbMotionPanel
// ---------------------------------------------------------------------------

export class SandoTbMotionPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 52px);
    }

    /* ---- 2-column panel layout ---- */
    .panel-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      min-height: calc(100vh - 52px);
    }

    .panel-sidebar {
      background: #fff;
      border-right: 1px solid #e5e5e5;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-y: auto;
    }

    .panel-main {
      padding: 32px;
      overflow-y: auto;
      background: #f8f8f8;
    }

    /* ---- Segmented control ---- */
    .segment-group {
      display: flex;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }

    .segment-btn {
      flex: 1;
      padding: 8px 4px;
      background: #fff;
      border: none;
      border-right: 1px solid #ddd;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      color: #555;
      transition: background 0.15s, color 0.15s;
    }

    .segment-btn:last-child {
      border-right: none;
    }

    .segment-btn.active {
      background: #1a1a1a;
      color: #fff;
    }

    .segment-btn:hover:not(.active) {
      background: #f5f5f5;
    }

    /* ---- Field label ---- */
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin: 0 0 8px;
    }

    /* ---- Fine-tune disclosure ---- */
    details {
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      overflow: hidden;
    }

    summary {
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #555;
      cursor: pointer;
      user-select: none;
      background: #fafafa;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::before {
      content: "▶";
      font-size: 10px;
      transition: transform 0.15s;
    }

    details[open] summary::before {
      transform: rotate(90deg);
    }

    .fine-tune-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .fine-tune-tier {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .fine-tune-tier-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #999;
    }

    .fine-tune-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .fine-tune-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .fine-tune-field label {
      font-size: 11px;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .fine-tune-field select {
      padding: 6px 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 12px;
      background: #fff;
      outline: none;
      cursor: pointer;
    }

    /* ---- Checkbox ---- */
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #555;
      cursor: pointer;
    }

    .checkbox-row input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: #1a1a1a;
    }

    /* ---- Export ---- */
    .export-row {
      display: flex;
      gap: 8px;
    }

    .btn-export {
      flex: 1;
      padding: 8px 12px;
      background: #fff;
      color: #1a1a1a;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }

    .btn-export:hover {
      background: #f5f5f5;
      border-color: #bbb;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #555;
      margin: 0 0 10px;
    }

    /* ---- Preview area ---- */
    .preview-root {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .preview-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .preview-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin: 0;
    }

    .btn-replay {
      padding: 6px 14px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      color: #555;
      transition: background 0.15s;
    }

    .btn-replay:hover {
      background: #f5f5f5;
    }

    .demo-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }

    .demo-card {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      padding: 20px;
      min-width: 200px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .demo-card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #aaa;
    }

    .demo-card-label {
      font-size: 12px;
      color: #bbb;
      margin-top: 8px;
      font-family: monospace;
    }

    /* ---- Demo 1: Toggle switch ---- */
    .toggle-track {
      width: 48px;
      height: 28px;
      background: #e5e5e5;
      border-radius: 14px;
      position: relative;
      cursor: pointer;
      transition: background 0.2s;
    }

    .toggle-track.on {
      background: #22c55e;
    }

    .toggle-thumb {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transition: transform var(--tb-micro-dur) var(--tb-micro-ease);
    }

    .toggle-track.on .toggle-thumb {
      transform: translateX(20px);
    }

    /* ---- Demo 2: Expand panel ---- */
    .expand-btn {
      padding: 8px 16px;
      background: #1a1a1a;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      width: fit-content;
    }

    .expand-panel {
      background: #f5f5f5;
      border-radius: 6px;
      overflow: hidden;
      max-height: 0;
      transition: max-height var(--tb-std-dur) var(--tb-std-ease);
    }

    .expand-panel.open {
      max-height: 80px;
    }

    .expand-panel-inner {
      padding: 12px 16px;
      font-size: 13px;
      color: #555;
    }

    /* ---- Demo 3: Confirm button ---- */
    .confirm-btn {
      padding: 8px 20px;
      background: #3b82f6;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: transform var(--tb-expr-dur) var(--tb-expr-ease),
                  background var(--tb-expr-dur) var(--tb-expr-ease);
      width: fit-content;
    }

    .confirm-btn.confirmed {
      background: #22c55e;
      transform: scale(1.08);
    }
  `;

  @state() private _preset: MotionPreset = "standard";
  @state() private _microDur = "100ms";
  @state() private _microEase: EasingName = "ease-out";
  @state() private _stdDur = "300ms";
  @state() private _stdEase: EasingName = "ease-in-out";
  @state() private _exprDur = "500ms";
  @state() private _exprEase: EasingName = "energetic";
  @state() private _reducedMotion = false;

  // Demo state
  @state() private _toggleOn = false;
  @state() private _panelOpen = false;
  @state() private _confirmed = false;
  @state() private _replayKey = 0;

  private _applyPreset(preset: MotionPreset) {
    this._preset = preset;
    const p = MOTION_PRESETS[preset];
    this._microDur = p.micro.duration;
    this._microEase = p.micro.easing;
    this._stdDur = p.standard.duration;
    this._stdEase = p.standard.easing;
    this._exprDur = p.expressive.duration;
    this._exprEase = p.expressive.easing;
    this._emitChange();
  }

  private _emitChange() {
    const json = buildMotionJson(
      this._microDur,
      EASING_VALUES[this._microEase],
      this._stdDur,
      EASING_VALUES[this._stdEase],
      this._exprDur,
      EASING_VALUES[this._exprEase]
    );
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail: { tab: "motion", json, isReady: true },
      })
    );
  }

  private _onPresetClick(preset: MotionPreset) {
    this._applyPreset(preset);
  }

  private _onFineTuneChange(
    field: "microDur" | "microEase" | "stdDur" | "stdEase" | "exprDur" | "exprEase",
    e: Event
  ) {
    const val = (e.target as HTMLSelectElement).value;
    if (field === "microDur") this._microDur = val;
    else if (field === "microEase") this._microEase = val as EasingName;
    else if (field === "stdDur") this._stdDur = val;
    else if (field === "stdEase") this._stdEase = val as EasingName;
    else if (field === "exprDur") this._exprDur = val;
    else this._exprEase = val as EasingName;
    this._emitChange();
  }

  private _onReplay() {
    this._replayKey += 1;
    this._toggleOn = false;
    this._panelOpen = false;
    this._confirmed = false;
    // Trigger animations after a short tick
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._toggleOn = true;
        this._panelOpen = true;
        setTimeout(() => {
          this._confirmed = true;
        }, 400);
      });
    });
  }

  private _buildJsonContent(): string {
    return (
      JSON.stringify(
        buildMotionJson(
          this._microDur,
          EASING_VALUES[this._microEase],
          this._stdDur,
          EASING_VALUES[this._stdEase],
          this._exprDur,
          EASING_VALUES[this._exprEase]
        ),
        null,
        2
      ) + "\n"
    );
  }

  private _downloadJson() {
    const blob = new Blob([this._buildJsonContent()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "animation.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  getJsonContent(): string {
    return this._buildJsonContent();
  }

  private _buildCssVarString() {
    if (this._reducedMotion) {
      return "--tb-micro-dur: 0ms; --tb-micro-ease: linear; --tb-std-dur: 0ms; --tb-std-ease: linear; --tb-expr-dur: 0ms; --tb-expr-ease: linear;";
    }
    return `--tb-micro-dur: ${this._microDur}; --tb-micro-ease: ${EASING_VALUES[this._microEase]}; --tb-std-dur: ${this._stdDur}; --tb-std-ease: ${EASING_VALUES[this._stdEase]}; --tb-expr-dur: ${this._exprDur}; --tb-expr-ease: ${EASING_VALUES[this._exprEase]};`;
  }

  renderSidebarControls() {
    const presets: MotionPreset[] = ["subtle", "standard", "expressive"];
    return html`
      <!-- Preset segmented control -->
      <div>
        <span class="field-label">Motion Preset</span>
        <div class="segment-group" role="group" aria-label="Motion preset">
          ${presets.map(
            (p) => html`
              <button
                class="segment-btn ${this._preset === p ? "active" : ""}"
                @click="${() => this._onPresetClick(p)}"
                aria-pressed="${this._preset === p}"
              >
                ${p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            `
          )}
        </div>
      </div>

      <!-- Fine-tune -->
      <details>
        <summary>Fine-tune Timing</summary>
        <div class="fine-tune-body">
          ${(["micro", "standard", "expressive"] as const).map((tier) => {
            const durKey = tier === "standard" ? "stdDur" : tier === "expressive" ? "exprDur" : "microDur";
            const easeKey = tier === "standard" ? "stdEase" : tier === "expressive" ? "exprEase" : "microEase";
            const durVal = tier === "micro" ? this._microDur : tier === "standard" ? this._stdDur : this._exprDur;
            const easeVal = tier === "micro" ? this._microEase : tier === "standard" ? this._stdEase : this._exprEase;
            return html`
              <div class="fine-tune-tier">
                <span class="fine-tune-tier-label">${tier}</span>
                <div class="fine-tune-row">
                  <div class="fine-tune-field">
                    <label for="${tier}-dur">Duration</label>
                    <select
                      id="${tier}-dur"
                      @change="${(e: Event) => this._onFineTuneChange(durKey, e)}"
                    >
                      ${DURATION_OPTIONS.map(
                        (opt) => html`<option value="${opt}" ?selected="${opt === durVal}">${opt}</option>`
                      )}
                    </select>
                  </div>
                  <div class="fine-tune-field">
                    <label for="${tier}-ease">Easing</label>
                    <select
                      id="${tier}-ease"
                      @change="${(e: Event) => this._onFineTuneChange(easeKey, e)}"
                    >
                      ${EASING_NAMES.map(
                        (opt) => html`<option value="${opt}" ?selected="${opt === easeVal}">${opt}</option>`
                      )}
                    </select>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </details>

      <!-- Reduced motion preview checkbox -->
      <label class="checkbox-row">
        <input
          type="checkbox"
          .checked="${this._reducedMotion}"
          @change="${(e: Event) => { this._reducedMotion = (e.target as HTMLInputElement).checked; }}"
        />
        Preview with prefers-reduced-motion
      </label>

      <!-- Export -->
      <div>
        <p class="section-title">Export</p>
        <div class="export-row">
          <button class="btn-export" @click="${this._downloadJson}">
            Download JSON
          </button>
        </div>
      </div>
    `;
  }

  renderMainPreview() {
    const cssVars = this._buildCssVarString();

    return html`
      <div class="preview-root" style="${cssVars}" key="${this._replayKey}">
        <div class="preview-header">
          <p class="preview-section-title">Motion Preview — ${this._preset}</p>
          <button class="btn-replay" @click="${this._onReplay}">Replay</button>
        </div>

        <div class="demo-cards">

          <!-- Demo 1: Micro — Toggle switch -->
          <div class="demo-card">
            <span class="demo-card-title">Micro</span>
            <div
              class="toggle-track ${this._toggleOn ? "on" : ""}"
              role="switch"
              aria-checked="${this._toggleOn}"
              tabindex="0"
              @click="${() => { this._toggleOn = !this._toggleOn; }}"
              @keydown="${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { this._toggleOn = !this._toggleOn; } }}"
            >
              <div class="toggle-thumb" style="transition-duration: ${this._reducedMotion ? "0ms" : this._microDur}; transition-timing-function: ${EASING_VALUES[this._microEase]};"></div>
            </div>
            <span class="demo-card-label">${this._microDur} / ${this._microEase}</span>
          </div>

          <!-- Demo 2: Standard — Expand panel -->
          <div class="demo-card">
            <span class="demo-card-title">Standard</span>
            <button class="expand-btn" @click="${() => { this._panelOpen = !this._panelOpen; }}">
              ${this._panelOpen ? "Hide panel" : "Show panel"}
            </button>
            <div class="expand-panel ${this._panelOpen ? "open" : ""}"
              style="transition-duration: ${this._reducedMotion ? "0ms" : this._stdDur}; transition-timing-function: ${EASING_VALUES[this._stdEase]};">
              <div class="expand-panel-inner">Panel content appears here.</div>
            </div>
            <span class="demo-card-label">${this._stdDur} / ${this._stdEase}</span>
          </div>

          <!-- Demo 3: Expressive — Confirm button -->
          <div class="demo-card">
            <span class="demo-card-title">Expressive</span>
            <button
              class="confirm-btn ${this._confirmed ? "confirmed" : ""}"
              style="transition-duration: ${this._reducedMotion ? "0ms" : this._exprDur}; transition-timing-function: ${EASING_VALUES[this._exprEase]};"
              @click="${() => { this._confirmed = !this._confirmed; }}"
            >
              ${this._confirmed ? "Confirmed!" : "Confirm"}
            </button>
            <span class="demo-card-label">${this._exprDur} / ${this._exprEase}</span>
          </div>

        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="panel-layout">
        <aside class="panel-sidebar">
          ${this.renderSidebarControls()}
        </aside>
        <main class="panel-main">
          ${this.renderMainPreview()}
        </main>
      </div>
    `;
  }
}

customElements.define("sando-tb-motion-panel", SandoTbMotionPanel);
