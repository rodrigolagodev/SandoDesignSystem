/**
 * Theme Builder — Elevation Panel
 *
 * Controls for shadow hue and intensity. Previews 6 elevation levels.
 * Emits tb-panel-change on every change.
 */

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import {
  ELEVATION_LEVELS,
  SHADOW_INTENSITY_MULTIPLIER,
  buildShadowValue,
  type ShadowIntensity,
  type PanelChangeDetail,
} from "./theme-builder-types.js";

// ---------------------------------------------------------------------------
// JSON builder
// ---------------------------------------------------------------------------

function buildElevationJson(
  hue: number,
  intensity: ShadowIntensity,
): Record<string, unknown> {
  const multiplier = SHADOW_INTENSITY_MULTIPLIER[intensity];
  const shadow: Record<string, unknown> = {};
  ELEVATION_LEVELS.forEach((level) => {
    shadow[level.key] = {
      value: buildShadowValue(level, hue, multiplier),
      type: "shadow",
    };
  });
  return { shadow };
}

// ---------------------------------------------------------------------------
// SandoTbElevationPanel
// ---------------------------------------------------------------------------

export class SandoTbElevationPanel extends LitElement {
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

    /* ---- Slider row ---- */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slider-row input[type="range"] {
      flex: 1;
      accent-color: #1a1a1a;
      cursor: pointer;
    }

    .slider-row input[type="number"] {
      width: 56px;
      padding: 6px 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 13px;
      text-align: center;
      outline: none;
    }

    .slider-row input[type="number"]:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    .hue-swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
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

    /* ---- Preview ---- */
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

    .elevation-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 32px;
      border-radius: 12px;
      background: oklch(0.95 0.01 60);
    }

    .elevation-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .elevation-card {
      width: 120px;
      height: 100px;
      background: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #555;
    }

    .elevation-label {
      font-size: 11px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .elevation-caption {
      font-size: 9px;
      color: #bbb;
      font-family: monospace;
      text-align: center;
      max-width: 120px;
      word-break: break-all;
      line-height: 1.4;
    }
  `;

  @state() private _hue = 60;
  @state() private _intensity: ShadowIntensity = "default";

  private _emitChange() {
    const json = buildElevationJson(this._hue, this._intensity);
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail: { tab: "elevation", json, isReady: true },
      }),
    );
  }

  private _onHueSlider(e: Event) {
    this._hue = parseInt((e.target as HTMLInputElement).value, 10);
    this._emitChange();
  }

  private _onHueNumber(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val >= 0 && val <= 360) {
      this._hue = val;
      this._emitChange();
    }
  }

  private _onIntensity(intensity: ShadowIntensity) {
    this._intensity = intensity;
    this._emitChange();
  }

  private _buildJsonContent(): string {
    return (
      JSON.stringify(buildElevationJson(this._hue, this._intensity), null, 2) +
      "\n"
    );
  }

  private _downloadJson() {
    const blob = new Blob([this._buildJsonContent()], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "elevation.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  getJsonContent(): string {
    return this._buildJsonContent();
  }

  renderSidebarControls() {
    const hueSwatch = `oklch(0.25 0.02 ${this._hue})`;
    const intensities: ShadowIntensity[] = ["light", "default", "deep"];

    return html`
      <!-- Shadow Hue -->
      <div>
        <span class="field-label">Shadow Hue</span>
        <div class="slider-row">
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            .value="${String(this._hue)}"
            @input="${this._onHueSlider}"
            aria-label="Shadow hue"
          />
          <input
            type="number"
            min="0"
            max="360"
            .value="${String(this._hue)}"
            @change="${this._onHueNumber}"
            aria-label="Shadow hue value"
          />
          <div
            class="hue-swatch"
            style="background: ${hueSwatch};"
            title="${hueSwatch}"
          ></div>
        </div>
      </div>

      <!-- Shadow Intensity -->
      <div>
        <span class="field-label">Shadow Intensity</span>
        <div class="segment-group" role="group" aria-label="Shadow intensity">
          ${intensities.map(
            (i) => html`
              <button
                class="segment-btn ${this._intensity === i ? "active" : ""}"
                @click="${() => this._onIntensity(i)}"
                aria-pressed="${this._intensity === i}"
              >
                ${i.charAt(0).toUpperCase() + i.slice(1)}
              </button>
            `,
          )}
        </div>
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
    const multiplier = SHADOW_INTENSITY_MULTIPLIER[this._intensity];

    return html`
      <div class="preview-root">
        <p class="preview-section-title">
          Elevation Preview — hue ${this._hue}, ${this._intensity} intensity
        </p>
        <div class="elevation-grid">
          ${ELEVATION_LEVELS.map((level) => {
            const shadow = buildShadowValue(level, this._hue, multiplier);
            return html`
              <div class="elevation-item">
                <div
                  class="elevation-card"
                  style="box-shadow: ${shadow};"
                  title="${shadow}"
                >
                  ${level.label}
                </div>
                <span class="elevation-label">${level.label}</span>
                <span class="elevation-caption">${shadow}</span>
              </div>
            `;
          })}
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

customElements.define("sando-tb-elevation-panel", SandoTbElevationPanel);
