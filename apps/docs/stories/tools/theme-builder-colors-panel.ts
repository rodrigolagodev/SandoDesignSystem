/**
 * Theme Builder — Colors Panel
 *
 * Extracted from the original ThemeBuilder.stories.ts (Colors tab logic).
 * Generates an OKLCH palette from a brand color and emits tb-panel-change
 * events when a palette is successfully generated.
 */

import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import {
  generatePalette,
  generateNeutralPalette,
  validatePaletteContrast,
  NEUTRAL_PALETTES,
} from "@sando-tokens/generators/palette-generator.js";
import { parse, converter } from "culori";
import type { PanelChangeDetail } from "./theme-builder-types.js";
import { validateFlavorName } from "./theme-builder-types.js";

const toOklch = converter("oklch");

// ---------------------------------------------------------------------------
// Types (colors-panel local)
// ---------------------------------------------------------------------------

interface PaletteStep {
  value: string;
  oklch: { l: number; c: number; h: number };
}

interface GeneratedPalette {
  name: string;
  palette: Record<string, PaletteStep>;
}

interface ContrastTest {
  background: string;
  foreground: string;
  contrast: number;
  passes: boolean;
}

interface ContrastResult {
  valid: boolean;
  failures: string[];
  tests: ContrastTest[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PALETTE_STEPS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function validateColorInput(color: string): string | null {
  if (!color || color.trim() === "") return "Color is required";
  const parsed = parse(color);
  if (!parsed) return "Enter a valid CSS color (e.g. #3b82f6, rgb(59,130,246))";
  return null;
}

// ---------------------------------------------------------------------------
// SandoTbColorsPanel — Colors tab panel
// ---------------------------------------------------------------------------

export class SandoTbColorsPanel extends LitElement {
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
      display: flex;
      flex-direction: column;
      gap: 32px;
      overflow-y: auto;
      background: #f8f8f8;
    }

    /* ---- Empty state ---- */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 300px;
      color: #aaa;
      gap: 12px;
    }

    .empty-state-icon {
      font-size: 48px;
    }

    .empty-state-text {
      font-size: 16px;
    }

    /* ---- Palette preview ---- */
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      gap: 4px;
      border-radius: 8px;
      overflow: hidden;
    }

    .palette-swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .swatch-color {
      width: 100%;
      aspect-ratio: 1 / 1.4;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }

    .swatch-step {
      font-size: 11px;
      font-weight: 700;
      color: #444;
    }

    .swatch-hex {
      font-size: 10px;
      color: #888;
      font-family: monospace;
      word-break: break-all;
      text-align: center;
    }

    .swatch-oklch {
      font-size: 9px;
      color: #aaa;
      font-family: monospace;
      text-align: center;
      word-break: break-all;
    }

    /* ---- WCAG table ---- */
    .wcag-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .wcag-table th {
      text-align: left;
      padding: 8px 12px;
      background: #f5f5f5;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 600;
      color: #555;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .wcag-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .wcag-table tr:last-child td {
      border-bottom: none;
    }

    .badge-pass {
      display: inline-block;
      padding: 2px 8px;
      background: #dcfce7;
      color: #166534;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
    }

    .badge-fail {
      display: inline-block;
      padding: 2px 8px;
      background: #fee2e2;
      color: #991b1b;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
    }

    .wcag-summary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .wcag-summary.pass {
      background: #dcfce7;
      color: #166534;
    }

    .wcag-summary.fail {
      background: #fee2e2;
      color: #991b1b;
    }

    .color-pair-preview {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 20px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 700;
    }

    /* ---- Form fields ---- */
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field label {
      font-size: 12px;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .field input[type="text"] {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.15s;
    }

    .field input[type="text"]:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    .field input[type="text"].error {
      border-color: #ef4444;
    }

    .color-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-row input[type="text"] {
      flex: 1;
    }

    .color-row input[type="color"] {
      width: 40px;
      height: 38px;
      padding: 2px;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      background: none;
    }

    .field-error {
      font-size: 12px;
      color: #ef4444;
      min-height: 16px;
    }

    /* ---- Generate button ---- */
    .btn-generate {
      padding: 10px 20px;
      background: #1a1a1a;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition:
        background 0.15s,
        opacity 0.15s;
    }

    .btn-generate:hover:not(:disabled) {
      background: #333;
    }

    .btn-generate:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ---- Export buttons ---- */
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

    .btn-export:hover:not(:disabled) {
      background: #f5f5f5;
      border-color: #bbb;
    }

    .btn-export:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ---- Section title (for sidebar export label) ---- */
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #555;
      margin: 0 0 10px;
    }
  `;

  @property({ type: String }) flavorName = "";
  @property({ type: String }) colorInput = "";

  @state() private _pickerColor = "#3b82f6";
  @state() private _colorError: string | null = null;
  @state() private _result: GeneratedPalette | null = null;
  @state() private _contrast: ContrastResult | null = null;
  @state() private _neutralKey = "neutralWarm";
  @state() private _neutralResult: GeneratedPalette | null = null;

  private get _isValid(): boolean {
    return (
      this._colorError === null &&
      this.flavorName.trim() !== "" &&
      this.colorInput.trim() !== ""
    );
  }

  private _onColorTextInput(e: Event) {
    this.colorInput = (e.target as HTMLInputElement).value;
    this._colorError = validateColorInput(this.colorInput);
    if (!this._colorError && /^#[0-9a-fA-F]{6}$/.test(this.colorInput.trim())) {
      this._pickerColor = this.colorInput.trim();
    }
  }

  private _onPickerInput(e: Event) {
    const hex = (e.target as HTMLInputElement).value;
    this._pickerColor = hex;
    this.colorInput = hex;
    this._colorError = validateColorInput(this.colorInput);
  }

  private _generateNeutral(): GeneratedPalette {
    return generateNeutralPalette(
      NEUTRAL_PALETTES[this._neutralKey],
    ) as GeneratedPalette;
  }

  private _onNeutralChange(key: string) {
    this._neutralKey = key;
    if (this._result) {
      this._neutralResult = this._generateNeutral();
      const json = JSON.parse(this._buildJsonContent()) as Record<
        string,
        unknown
      >;
      this._emitChange(json, true);
    }
  }

  private _onGenerate() {
    const colorErr = validateColorInput(this.colorInput);
    this._colorError = colorErr;
    if (colorErr || !this.flavorName.trim()) return;

    const parsed = parse(this.colorInput);
    if (!parsed) {
      this._colorError =
        "Enter a valid CSS color (e.g. #3b82f6, rgb(59,130,246))";
      return;
    }

    const oklchColor = toOklch(parsed);
    if (!oklchColor) {
      this._colorError = "Could not convert color to OKLCH";
      return;
    }

    const hue = oklchColor.h ?? 0;
    const chroma = Math.min(oklchColor.c ?? 0.2, 0.4);

    const generated = generatePalette({
      hue,
      chroma,
      name: this.flavorName.trim(),
    }) as GeneratedPalette;

    this._result = generated;
    this._neutralResult = this._generateNeutral();
    this._contrast = validatePaletteContrast(
      generated.palette,
    ) as ContrastResult;

    this._applyPaletteToHost(generated);

    // Emit tb-panel-change
    const json = JSON.parse(this._buildJsonContent()) as Record<
      string,
      unknown
    >;
    this._emitChange(json, true);
  }

  private _emitChange(json: Record<string, unknown>, isReady: boolean) {
    const detail: PanelChangeDetail = { tab: "colors", json, isReady };
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  }

  private _applyPaletteToHost(generated: GeneratedPalette) {
    const preview = this.shadowRoot?.querySelector(
      ".palette-preview-wrapper",
    ) as HTMLElement | null;
    if (!preview) return;
    PALETTE_STEPS.forEach((step) => {
      const entry = generated.palette[step];
      if (!entry) return;
      const { l, c, h } = entry.oklch;
      preview.style.setProperty(
        `--sando-color-${generated.name}-${step}`,
        `oklch(${l} ${c} ${h})`,
      );
    });
  }

  private _stepsFromPalette(
    palette: GeneratedPalette,
  ): Record<string, { value: string; type: string; description: string }> {
    const steps: Record<
      string,
      { value: string; type: string; description: string }
    > = {};
    PALETTE_STEPS.forEach((step) => {
      const entry = palette.palette[step];
      if (!entry) return;
      const { l, c, h } = entry.oklch;
      steps[step] = {
        value:
          h !== undefined ? `oklch(${l} ${c} ${h})` : `oklch(${l} ${c} none)`,
        type: "color",
        description: `${palette.name} ${step}`,
      };
    });
    return steps;
  }

  private _buildCssContent(): string {
    if (!this._result) return "";
    const lines = PALETTE_STEPS.map((step) => {
      const entry = this._result!.palette[step];
      const { l, c, h } = entry.oklch;
      return `  --sando-color-${this._result!.name}-${step}: oklch(${l} ${c} ${h});`;
    });
    const neutralLines = this._neutralResult
      ? PALETTE_STEPS.map((step) => {
          const entry = this._neutralResult!.palette[step];
          if (!entry) return "";
          const { l, c, h } = entry.oklch;
          const val =
            h !== undefined ? `oklch(${l} ${c} ${h})` : `oklch(${l} ${c} none)`;
          return `  --sando-color-${this._neutralResult!.name}-${step}: ${val};`;
        }).filter(Boolean)
      : [];
    return `:root {\n${[...lines, ...neutralLines].join("\n")}\n}\n`;
  }

  private _buildJsonContent(): string {
    if (!this._result) return "{}";
    const colorBlock: Record<string, unknown> = {
      [this._result.name]: this._stepsFromPalette(this._result),
    };
    if (this._neutralResult) {
      colorBlock[this._neutralResult.name] = this._stepsFromPalette(
        this._neutralResult,
      );
    }
    return JSON.stringify({ color: colorBlock }, null, 2) + "\n";
  }

  private _downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private _onDownloadCss() {
    if (!this._result) return;
    this._downloadFile(
      this._buildCssContent(),
      `sando-color-${this._result.name}.css`,
      "text/css",
    );
  }

  private _onDownloadJson() {
    if (!this._result) return;
    this._downloadFile(
      this._buildJsonContent(),
      `color-${this._result.name}.json`,
      "application/json",
    );
  }

  /** Rendered into the sidebar slot */
  renderSidebarControls() {
    return html`
      ${!this.flavorName.trim()
        ? html`
            <div
              style="padding:10px 12px;background:#fef9c3;border:1px solid #fde68a;border-radius:6px;font-size:12px;color:#92400e;line-height:1.5;"
            >
              Set a flavor name in the <strong>Flavor Info</strong> tab first.
            </div>
          `
        : html`
            <div
              style="padding:8px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:12px;color:#166534;"
            >
              Flavor: <strong>${this.flavorName}</strong>
            </div>
          `}

      <!-- Brand color input -->
      <div class="field">
        <label for="brand-color">Brand Color</label>
        <div class="color-row">
          <input
            id="brand-color"
            type="text"
            class="${this._colorError ? "error" : ""}"
            .value="${this.colorInput}"
            placeholder="e.g. #3b82f6 or oklch(0.6 0.2 250)"
            @input="${this._onColorTextInput}"
          />
          <input
            type="color"
            .value="${this._pickerColor}"
            @input="${this._onPickerInput}"
            title="Color picker"
          />
        </div>
        <span class="field-error">${this._colorError ?? ""}</span>
      </div>

      <!-- Neutral palette selector -->
      <div class="field">
        <label>Neutral Palette</label>
        <div
          style="display:flex;border:1px solid #ddd;border-radius:8px;overflow:hidden;"
          role="group"
          aria-label="Neutral palette"
        >
          ${(
            [
              { key: "neutral", label: "Gray" },
              { key: "neutralWarm", label: "Warm" },
              { key: "neutralCool", label: "Cool" },
              { key: "sand", label: "Sand" },
            ] as const
          ).map(
            (opt) => html`
              <button
                style="flex:1;padding:7px 4px;background:${this._neutralKey ===
                opt.key
                  ? "#1a1a1a"
                  : "#fff"};color:${this._neutralKey === opt.key
                  ? "#fff"
                  : "#555"};border:none;border-right:1px solid #ddd;font-size:12px;font-weight:500;cursor:pointer;"
                @click="${() => this._onNeutralChange(opt.key)}"
                aria-pressed="${this._neutralKey === opt.key}"
              >
                ${opt.label}
              </button>
            `,
          )}
        </div>
        <p style="font-size:11px;color:#aaa;margin:4px 0 0;line-height:1.5;">
          ${{
            neutral: "Pure achromatic gray — no color tint",
            neutralWarm: "Washi paper warmth — hue 70°, adaptive chroma",
            neutralCool: "Cool blue-gray — hue 220°, subtle tint",
            sand: "Sandy warm — hue 60°, gentle warmth",
          }[this._neutralKey]}
        </p>
      </div>

      <!-- Generate -->
      <button
        class="btn-generate"
        ?disabled="${!this._isValid}"
        @click="${this._onGenerate}"
      >
        Generate Palette
      </button>

      ${this._result
        ? html`
            <div>
              <p class="section-title">Export</p>
              <div class="export-row">
                <button class="btn-export" @click="${this._onDownloadCss}">
                  Download CSS
                </button>
                <button class="btn-export" @click="${this._onDownloadJson}">
                  Download JSON
                </button>
              </div>
            </div>
          `
        : html``}
    `;
  }

  /** Rendered into the main preview slot */
  renderMainPreview() {
    if (!this._result) {
      return html`
        <div class="empty-state">
          <div class="empty-state-icon" aria-hidden="true">&#x1F3A8;</div>
          <div class="empty-state-text">
            ${this.flavorName.trim()
              ? "Enter a brand color and click Generate."
              : "Set a flavor name in the Flavor Info tab, then enter a brand color."}
          </div>
        </div>
      `;
    }
    return html`
      ${this._renderPalettePreview()}
      ${this._neutralResult ? this._renderNeutralPreview() : html``}
      ${this._renderContrastTable()}
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

  // ---- Private render helpers ----

  private _renderPalettePreview() {
    if (!this._result) return html``;
    return html`
      <div>
        <p class="section-title">Palette — ${this._result.name}</p>
        <div class="palette-preview-wrapper">
          <div class="palette-grid">
            ${PALETTE_STEPS.map((step) => {
              const entry = this._result!.palette[step];
              const { l, c, h } = entry.oklch;
              const oklchStr = `oklch(${l} ${c} ${h})`;
              return html`
                <div class="palette-swatch">
                  <div
                    class="swatch-color"
                    style="background: ${oklchStr};"
                    title="${step}: ${entry.value}"
                  ></div>
                  <span class="swatch-step">${step}</span>
                  <span class="swatch-hex">${entry.value}</span>
                  <span class="swatch-oklch">${oklchStr}</span>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private _renderNeutralPreview() {
    if (!this._neutralResult) return html``;
    const nr = this._neutralResult;
    return html`
      <div>
        <p class="section-title">Neutral — ${nr.name}</p>
        <div class="palette-grid">
          ${PALETTE_STEPS.map((step) => {
            const entry = nr.palette[step];
            if (!entry) return html``;
            const { l, c, h } = entry.oklch;
            const oklchStr =
              h !== undefined
                ? `oklch(${l} ${c} ${h})`
                : `oklch(${l} ${c} none)`;
            return html`
              <div class="palette-swatch">
                <div
                  class="swatch-color"
                  style="background: ${oklchStr};"
                  title="${step}: ${entry.value}"
                ></div>
                <span class="swatch-step">${step}</span>
                <span class="swatch-hex">${entry.value}</span>
                <span class="swatch-oklch">${oklchStr}</span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _renderContrastTable() {
    if (!this._contrast || !this._result) return html``;
    return html`
      <div>
        <p class="section-title">WCAG AA Contrast (4.5:1 minimum)</p>
        <div
          class="${this._contrast.valid
            ? "wcag-summary pass"
            : "wcag-summary fail"}"
        >
          ${this._contrast.valid
            ? "All tests pass — WCAG AA compliant"
            : `${this._contrast.failures.length} test(s) failed`}
        </div>
        <table class="wcag-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Background</th>
              <th>Foreground</th>
              <th>Ratio</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${this._contrast.tests.map((test) => {
              const bgEntry = this._result!.palette[test.background];
              const fgEntry = this._result!.palette[test.foreground];
              return html`
                <tr>
                  <td>
                    <div
                      class="color-pair-preview"
                      style="background: ${bgEntry.value}; color: ${fgEntry.value};"
                    >
                      Aa
                    </div>
                  </td>
                  <td>
                    ${test.background}
                    <span style="color:#aaa;font-size:11px;"
                      >${bgEntry.value}</span
                    >
                  </td>
                  <td>
                    ${test.foreground}
                    <span style="color:#aaa;font-size:11px;"
                      >${fgEntry.value}</span
                    >
                  </td>
                  <td>${test.contrast}:1</td>
                  <td>
                    <span class="${test.passes ? "badge-pass" : "badge-fail"}">
                      ${test.passes ? "Pass" : "Fail"}
                    </span>
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }

  // ---- Expose flavor name for ZIP filename ----
  get currentFlavorName(): string {
    return this._result?.name ?? "";
  }

  /** JSON content string for ZIP download */
  getJsonContent(): string {
    return this._buildJsonContent();
  }
}

customElements.define("sando-tb-colors-panel", SandoTbColorsPanel);
