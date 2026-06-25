/**
 * Theme Builder — Shape Panel
 *
 * Controls for border-radius presets and border width.
 * Renders a live preview grid of shape silhouettes.
 * Emits tb-panel-change on every change.
 */

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import {
  SHAPE_PRESETS,
  BORDER_WIDTH_OPTIONS,
  type ShapePreset,
  type PanelChangeDetail,
} from "./theme-builder-types.js";

// ---------------------------------------------------------------------------
// JSON builder
// ---------------------------------------------------------------------------

function buildShapeJson(
  xs: string,
  sm: string,
  md: string,
  lg: string,
  borderWidth: string,
): Record<string, unknown> {
  return {
    border: {
      radius: {
        xs: { value: xs, type: "dimension" },
        sm: { value: sm, type: "dimension" },
        md: { value: md, type: "dimension" },
        lg: { value: lg, type: "dimension" },
      },
      width: {
        default: { value: borderWidth, type: "dimension" },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// SandoTbShapePanel
// ---------------------------------------------------------------------------

export class SandoTbShapePanel extends LitElement {
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
      transition:
        background 0.15s,
        color 0.15s;
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

    /* ---- Section labels ---- */
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 8px;
      display: block;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.15s;
    }

    .field select:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
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

    .fine-tune-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 14px;
    }

    .fine-tune-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .fine-tune-field label {
      font-size: 11px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .fine-tune-field select {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 13px;
      background: #fff;
      outline: none;
      cursor: pointer;
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
      transition:
        background 0.15s,
        border-color 0.15s;
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

    /* ---- Preview grid ---- */
    .preview-root {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .preview-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin: 0 0 20px;
    }

    .shape-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: flex-start;
    }

    .shape-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .shape-label {
      font-size: 11px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .shape-caption {
      font-size: 10px;
      color: #bbb;
      font-family: monospace;
    }

    /* Shape silhouettes */
    .silhouette-button {
      width: 120px;
      height: 40px;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
    }

    .silhouette-input {
      width: 240px;
      height: 40px;
      background: transparent;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-size: 13px;
      color: #666;
      box-sizing: border-box;
    }

    .silhouette-card {
      width: 180px;
      height: 120px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #bbb;
    }

    .silhouette-badge {
      width: 72px;
      height: 24px;
      background: #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      color: #555;
    }

    .silhouette-avatar {
      width: 48px;
      height: 48px;
      background: #3b82f6;
      border-radius: 50%;
    }
  `;

  @state() private _preset: ShapePreset = "precise";
  @state() private _xs = "0.125rem";
  @state() private _sm = "0.25rem";
  @state() private _md = "0.5rem";
  @state() private _lg = "0.75rem";
  @state() private _borderWidth = "1px";

  private _applyPreset(preset: ShapePreset) {
    this._preset = preset;
    const p = SHAPE_PRESETS[preset];
    this._xs = p.xs;
    this._sm = p.sm;
    this._md = p.md;
    this._lg = p.lg;
    this._emitChange();
  }

  private _emitChange() {
    const json = buildShapeJson(
      this._xs,
      this._sm,
      this._md,
      this._lg,
      this._borderWidth,
    );
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail: { tab: "shape", json, isReady: true },
      }),
    );
  }

  private _onPresetClick(preset: ShapePreset) {
    this._applyPreset(preset);
  }

  private _onFineTuneChange(key: "xs" | "sm" | "md" | "lg", e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    if (key === "xs") this._xs = val;
    else if (key === "sm") this._sm = val;
    else if (key === "md") this._md = val;
    else this._lg = val;
    this._preset = "precise"; // reset preset label when fine-tuning
    this._emitChange();
  }

  private _onBorderWidthChange(e: Event) {
    this._borderWidth = (e.target as HTMLSelectElement).value;
    this._emitChange();
  }

  private _buildJsonContent(): string {
    return (
      JSON.stringify(
        buildShapeJson(
          this._xs,
          this._sm,
          this._md,
          this._lg,
          this._borderWidth,
        ),
        null,
        2,
      ) + "\n"
    );
  }

  private _downloadJson() {
    const blob = new Blob([this._buildJsonContent()], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "border-shape.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  getJsonContent(): string {
    return this._buildJsonContent();
  }

  private _radiusOptions = [
    "0rem",
    "0.125rem",
    "0.25rem",
    "0.375rem",
    "0.5rem",
    "0.625rem",
    "0.75rem",
    "0.875rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2rem",
    "9999px",
  ];

  renderSidebarControls() {
    const presets: ShapePreset[] = [
      "sharp",
      "precise",
      "rounded",
      "expressive",
    ];
    return html`
      <!-- Preset segmented control -->
      <div>
        <span class="field-label">Shape Preset</span>
        <div class="segment-group" role="group" aria-label="Shape preset">
          ${presets.map(
            (p) => html`
              <button
                class="segment-btn ${this._preset === p ? "active" : ""}"
                @click="${() => this._onPresetClick(p)}"
                aria-pressed="${this._preset === p}"
              >
                ${p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            `,
          )}
        </div>
      </div>

      <!-- Fine-tune -->
      <details>
        <summary>Fine-tune Radii</summary>
        <div class="fine-tune-grid">
          ${(["xs", "sm", "md", "lg"] as const).map(
            (key) => html`
              <div class="fine-tune-field">
                <label for="radius-${key}">${key.toUpperCase()}</label>
                <select
                  id="radius-${key}"
                  @change="${(e: Event) => this._onFineTuneChange(key, e)}"
                >
                  ${this._radiusOptions.map(
                    (opt) =>
                      html`<option
                        value="${opt}"
                        .selected="${opt ===
                        this[`_${key}` as `_${typeof key}`]}"
                      >
                        ${opt}
                      </option>`,
                  )}
                </select>
              </div>
            `,
          )}
        </div>
      </details>

      <!-- Border width -->
      <div class="field">
        <label for="border-width" class="field-label" style="margin:0 0 8px;"
          >Border Width</label
        >
        <select id="border-width" @change="${this._onBorderWidthChange}">
          ${BORDER_WIDTH_OPTIONS.map(
            (opt) => html`
              <option
                value="${opt.value}"
                .selected="${opt.value === this._borderWidth}"
              >
                ${opt.label}
              </option>
            `,
          )}
        </select>
      </div>

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
    const xs = this._xs;
    const sm = this._sm;
    const md = this._md;
    const lg = this._lg;
    const bw = this._borderWidth;

    return html`
      <div class="preview-root">
        <p class="preview-section-title">Shape Preview — ${this._preset}</p>
        <div class="shape-grid">
          <!-- 1. Button default -->
          <div class="shape-item">
            <span class="shape-label">Button</span>
            <div class="silhouette-button" style="border-radius: ${sm};">
              Button
            </div>
            <span class="shape-caption">sm: ${sm}</span>
          </div>

          <!-- 2. Dialog / panel -->
          <div class="shape-item">
            <span class="shape-label">Dialog</span>
            <div
              class="silhouette-card"
              style="border-radius: ${lg}; border: ${bw} solid #e5e5e5; box-shadow: 0 8px 24px rgba(0,0,0,0.12); width: 160px; height: 100px;"
            >
              Dialog
            </div>
            <span class="shape-caption">lg: ${lg}</span>
          </div>

          <!-- 3. Input field -->
          <div class="shape-item">
            <span class="shape-label">Input</span>
            <div
              class="silhouette-input"
              style="border-radius: ${sm}; border: ${bw} solid #999;"
            >
              Placeholder text…
            </div>
            <span class="shape-caption">sm: ${sm}, border: ${bw}</span>
          </div>

          <!-- 4. Card -->
          <div class="shape-item">
            <span class="shape-label">Card</span>
            <div
              class="silhouette-card"
              style="border-radius: ${md}; border: ${bw} solid #e5e5e5; box-shadow: 0 2px 8px rgba(0,0,0,0.08);"
            >
              Card
            </div>
            <span class="shape-caption">md: ${md}</span>
          </div>

          <!-- 5. Badge -->
          <div class="shape-item">
            <span class="shape-label">Badge</span>
            <div class="silhouette-badge" style="border-radius: ${xs};">
              Tag
            </div>
            <span class="shape-caption">xs: ${xs}</span>
          </div>

          <!-- 6. Avatar — always 50% -->
          <div class="shape-item">
            <span class="shape-label">Avatar</span>
            <div class="silhouette-avatar"></div>
            <span class="shape-caption">fixed: 50%</span>
          </div>
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="panel-layout">
        <aside class="panel-sidebar">${this.renderSidebarControls()}</aside>
        <main class="panel-main">${this.renderMainPreview()}</main>
      </div>
    `;
  }
}

customElements.define("sando-tb-shape-panel", SandoTbShapePanel);
