/**
 * Theme Builder — Typography Panel
 *
 * Lets the user select heading, body, and code font families and previews
 * the scale in real time. Emits tb-panel-change on every change.
 */

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import {
  FONT_FAMILIES,
  MONO_FONT_KEYS,
  type FontFamilyEntry,
  type PanelChangeDetail,
} from "./theme-builder-types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fontValue(key: string): string {
  return FONT_FAMILIES[key]?.value ?? key;
}

function buildFontFamilyJson(
  headingKey: string,
  bodyKey: string,
  codeKey: string,
): Record<string, unknown> {
  return {
    font: {
      family: {
        heading: {
          value: fontValue(headingKey),
          type: "fontFamily",
          description: "Custom heading family",
        },
        body: {
          value: fontValue(bodyKey),
          type: "fontFamily",
          description: "Custom body family",
        },
        code: {
          value: fontValue(codeKey),
          type: "fontFamily",
          description: "Custom code family",
        },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// SandoTbTypographyPanel
// ---------------------------------------------------------------------------

export class SandoTbTypographyPanel extends LitElement {
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

    /* ---- Sidebar controls ---- */
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

    .field-hint {
      font-size: 11px;
      color: #999;
    }

    /* ---- Preview area ---- */
    .preview-root {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .preview-section {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 32px;
    }

    .preview-section:last-child {
      border-bottom: none;
    }

    .preview-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #999;
      margin: 0 0 20px;
    }

    /* ---- Heading scale ---- */
    .type-row {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 16px;
    }

    .type-label {
      font-size: 11px;
      color: #bbb;
      width: 64px;
      flex-shrink: 0;
      font-family: monospace;
    }

    .type-display {
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .type-h1 {
      font-weight: 700;
      font-size: 2rem;
      line-height: 1.2;
      letter-spacing: -0.025em;
    }

    .type-h2 {
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1.2;
      letter-spacing: 0;
    }

    .type-h3 {
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.3;
      letter-spacing: 0;
    }

    /* ---- Body scale ---- */
    .body-row {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 12px;
    }

    .type-body-lg {
      font-size: 1.125rem;
      line-height: 1.6;
      font-weight: 400;
    }

    .type-body {
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 400;
    }

    .type-body-sm {
      font-size: 0.875rem;
      line-height: 1.6;
      font-weight: 400;
    }

    .type-caption {
      font-size: 0.75rem;
      line-height: 1.6;
      font-weight: 400;
    }

    /* ---- Code specimen ---- */
    .code-specimen {
      font-size: 0.875rem;
      line-height: 1.5;
      background: #f5f5f5;
      padding: 16px 20px;
      border-radius: 6px;
      color: #333;
      white-space: pre;
      overflow-x: auto;
    }

    /* ---- Export row ---- */
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
  `;

  @state() private _headingKey = "outfit";
  @state() private _bodyKey = "source-sans";
  @state() private _codeKey = "fira-code";

  private _onChange() {
    const json = buildFontFamilyJson(
      this._headingKey,
      this._bodyKey,
      this._codeKey,
    );
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail: { tab: "typography", json, isReady: true },
      }),
    );
  }

  private _onHeadingChange(e: Event) {
    this._headingKey = (e.target as HTMLSelectElement).value;
    this._onChange();
  }

  private _onBodyChange(e: Event) {
    this._bodyKey = (e.target as HTMLSelectElement).value;
    this._onChange();
  }

  private _onCodeChange(e: Event) {
    this._codeKey = (e.target as HTMLSelectElement).value;
    this._onChange();
  }

  private _buildJsonContent(): string {
    return (
      JSON.stringify(
        buildFontFamilyJson(this._headingKey, this._bodyKey, this._codeKey),
        null,
        2,
      ) + "\n"
    );
  }

  private _downloadJson() {
    const content = this._buildJsonContent();
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "font-families.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  getJsonContent(): string {
    return this._buildJsonContent();
  }

  private _renderFamilySelect(
    id: string,
    label: string,
    value: string,
    onChange: (e: Event) => void,
    monoOnly = false,
  ) {
    type FontEntry = [string, FontFamilyEntry];
    type Groups = Record<string, FontEntry[]>;

    const allEntries = Object.entries(FONT_FAMILIES) as FontEntry[];

    const groups: Groups = monoOnly
      ? { monospace: allEntries.filter(([, v]) => v.group === "monospace") }
      : {
          "sans-serif": allEntries.filter(([, v]) => v.group === "sans-serif"),
          serif: allEntries.filter(([, v]) => v.group === "serif"),
          monospace: allEntries.filter(([, v]) => v.group === "monospace"),
          expressive: allEntries.filter(([, v]) => v.group === "expressive"),
        };

    const monoFilter = monoOnly ? (MONO_FONT_KEYS as readonly string[]) : null;

    return html`
      <div class="field">
        <label for="${id}">${label}</label>
        <select id="${id}" .value="${value}" @change="${onChange}">
          ${Object.entries(groups).map(
            ([groupLabel, entries]: [string, FontEntry[]]) => {
              const filtered: FontEntry[] = monoFilter
                ? entries.filter(([k]: [string, FontFamilyEntry]) =>
                    monoFilter.includes(k),
                  )
                : entries;
              if (filtered.length === 0) return html``;
              return html`
                <optgroup label="${groupLabel}">
                  ${filtered.map(
                    ([key, entry]: [string, FontFamilyEntry]) => html`
                      <option value="${key}" ?selected="${key === value}">
                        ${key}${entry.description
                          ? ` — ${entry.description}`
                          : ""}
                      </option>
                    `,
                  )}
                </optgroup>
              `;
            },
          )}
        </select>
      </div>
    `;
  }

  renderSidebarControls() {
    return html`
      ${this._renderFamilySelect(
        "heading-family",
        "Heading Family",
        this._headingKey,
        this._onHeadingChange.bind(this),
      )}
      ${this._renderFamilySelect(
        "body-family",
        "Body Family",
        this._bodyKey,
        this._onBodyChange.bind(this),
      )}
      ${this._renderFamilySelect(
        "code-family",
        "Code Family",
        this._codeKey,
        this._onCodeChange.bind(this),
        true,
      )}

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
    const headingFont = fontValue(this._headingKey);
    const bodyFont = fontValue(this._bodyKey);
    const codeFont = fontValue(this._codeKey);
    const pangram = "The quick brown fox jumps over the lazy dog.";

    return html`
      <div class="preview-root">
        <!-- Section A: Heading scale -->
        <div class="preview-section">
          <p class="preview-section-title">
            A — Heading Scale (${this._headingKey})
          </p>

          <div class="type-row">
            <span class="type-label">Display</span>
            <span class="type-display" style="font-family: ${headingFont};"
              >${pangram}</span
            >
          </div>

          <div class="type-row">
            <span class="type-label">H1</span>
            <span class="type-h1" style="font-family: ${headingFont};"
              >${pangram}</span
            >
          </div>

          <div class="type-row">
            <span class="type-label">H2</span>
            <span class="type-h2" style="font-family: ${headingFont};"
              >${pangram}</span
            >
          </div>

          <div class="type-row">
            <span class="type-label">H3</span>
            <span class="type-h3" style="font-family: ${headingFont};"
              >${pangram}</span
            >
          </div>
        </div>

        <!-- Section B: Body scale -->
        <div class="preview-section">
          <p class="preview-section-title">B — Body Scale (${this._bodyKey})</p>

          <div class="body-row">
            <span class="type-label">Body LG</span>
            <span class="type-body-lg" style="font-family: ${bodyFont};"
              >${pangram}</span
            >
          </div>

          <div class="body-row">
            <span class="type-label">Body</span>
            <span class="type-body" style="font-family: ${bodyFont};"
              >${pangram}</span
            >
          </div>

          <div class="body-row">
            <span class="type-label">Body SM</span>
            <span class="type-body-sm" style="font-family: ${bodyFont};"
              >${pangram}</span
            >
          </div>

          <div class="body-row">
            <span class="type-label">Caption</span>
            <span class="type-caption" style="font-family: ${bodyFont};"
              >${pangram}</span
            >
          </div>
        </div>

        <!-- Section C: Code specimen -->
        <div class="preview-section">
          <p class="preview-section-title">
            C — Code Specimen (${this._codeKey})
          </p>
          <pre class="code-specimen" style="font-family: ${codeFont};">
const theme = new SandoTheme({ flavor: 'sando' });</pre
          >
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

customElements.define("sando-tb-typography-panel", SandoTbTypographyPanel);
