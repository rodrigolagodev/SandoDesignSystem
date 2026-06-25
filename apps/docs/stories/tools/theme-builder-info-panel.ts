/**
 * Flavor Workshop — Flavor Info Panel
 *
 * First tab of the Flavor Workshop. Collects flavor metadata (name, author,
 * description, version, website) and emits tb-panel-change with isReady: true
 * as soon as a valid flavor name is entered.
 *
 * The flavor name set here is passed down to the Colors panel by the shell.
 */

import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import type { PanelChangeDetail } from "./theme-builder-types.js";
import { SYSTEM_FLAVORS, validateFlavorName } from "./theme-builder-types.js";

// ---------------------------------------------------------------------------
// SandoTbInfoPanel
// ---------------------------------------------------------------------------

export class SandoTbInfoPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 52px);
    }

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
      gap: 24px;
      overflow-y: auto;
      background: #f8f8f8;
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

    .field-hint {
      font-size: 11px;
      color: #aaa;
      margin: 0;
    }

    .field input[type="text"],
    .field input[type="url"],
    .field textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.15s;
      font-family: inherit;
    }

    .field input[type="text"]:focus,
    .field input[type="url"]:focus,
    .field textarea:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    .field input.error {
      border-color: #ef4444;
    }

    .field textarea {
      resize: vertical;
      min-height: 72px;
    }

    .field-error {
      font-size: 12px;
      color: #ef4444;
      min-height: 16px;
    }

    .field-required {
      color: #ef4444;
      margin-left: 2px;
    }

    /* ---- Section separator ---- */
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #999;
      margin: 4px 0 0;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    /* ---- Status badge ---- */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.ready {
      background: #dcfce7;
      color: #166534;
    }

    .status-badge.pending {
      background: #fef9c3;
      color: #854d0e;
    }

    /* ---- Passport card (main preview) ---- */
    .passport {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      overflow: hidden;
      max-width: 480px;
    }

    .passport-header {
      background: #1a1a1a;
      color: #fff;
      padding: 20px 24px 16px;
    }

    .passport-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #888;
      margin: 0 0 8px;
    }

    .passport-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      word-break: break-word;
    }

    .passport-display-name {
      font-size: 14px;
      color: #aaa;
      margin: 4px 0 0;
    }

    .passport-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .passport-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .passport-row-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #bbb;
    }

    .passport-row-value {
      font-size: 14px;
      color: #222;
      word-break: break-word;
    }

    .passport-row-value.empty {
      color: #ccc;
      font-style: italic;
    }

    .passport-footer {
      padding: 12px 24px;
      background: #f8f8f8;
      border-top: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .passport-version {
      font-size: 12px;
      color: #888;
      font-family: monospace;
    }

    .passport-ds-label {
      font-size: 11px;
      color: #ccc;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    /* ---- Naming guide ---- */
    .naming-guide {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 16px 20px;
      max-width: 480px;
    }

    .naming-guide-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #888;
      margin: 0 0 10px;
    }

    .naming-guide ul {
      margin: 0;
      padding: 0 0 0 16px;
      font-size: 13px;
      color: #555;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .reserved-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .reserved-chip {
      padding: 2px 8px;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      color: #555;
    }
  `;

  @state() private _name = "";
  @state() private _displayName = "";
  @state() private _author = "";
  @state() private _description = "";
  @state() private _version = "1.0.0";
  @state() private _website = "";
  @state() private _nameError: string | null = null;

  private get _isReady(): boolean {
    return this._nameError === null && this._name.trim() !== "";
  }

  private _onNameInput(e: Event) {
    this._name = (e.target as HTMLInputElement).value;
    this._nameError = validateFlavorName(this._name);
    this._emitChange();
  }

  private _onDisplayNameInput(e: Event) {
    this._displayName = (e.target as HTMLInputElement).value;
    this._emitChange();
  }

  private _onAuthorInput(e: Event) {
    this._author = (e.target as HTMLInputElement).value;
    this._emitChange();
  }

  private _onDescriptionInput(e: Event) {
    this._description = (e.target as HTMLTextAreaElement).value;
    this._emitChange();
  }

  private _onVersionInput(e: Event) {
    this._version = (e.target as HTMLInputElement).value;
    this._emitChange();
  }

  private _onWebsiteInput(e: Event) {
    this._website = (e.target as HTMLInputElement).value;
    this._emitChange();
  }

  private _buildJson(): Record<string, unknown> {
    return {
      flavor: {
        name: this._name.trim(),
        displayName: this._displayName.trim() || this._name.trim(),
        author: this._author.trim(),
        description: this._description.trim(),
        version: this._version.trim() || "1.0.0",
        website: this._website.trim(),
      },
    };
  }

  private _emitChange() {
    const detail: PanelChangeDetail = {
      tab: "info",
      json: this._buildJson(),
      isReady: this._isReady,
    };
    this.dispatchEvent(
      new CustomEvent<PanelChangeDetail>("tb-panel-change", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  }

  override render() {
    const displayValue = this._displayName.trim() || this._name.trim() || "—";
    const nameValue = this._name.trim() || "your-flavor";

    return html`
      <div class="panel-layout">
        <aside class="panel-sidebar">
          <p class="section-title">Identity</p>

          <!-- Flavor Name -->
          <div class="field">
            <label for="info-name">
              Flavor Name <span class="field-required">*</span>
            </label>
            <input
              id="info-name"
              type="text"
              class="${this._nameError ? "error" : ""}"
              .value="${this._name}"
              placeholder="e.g. matcha, sakura, yuzu"
              @input="${this._onNameInput}"
              autocomplete="off"
              spellcheck="false"
            />
            <span class="field-error">${this._nameError ?? ""}</span>
            <p class="field-hint">
              Kebab-case only. Used as the token key and ZIP filename.
            </p>
          </div>

          <!-- Display Name -->
          <div class="field">
            <label for="info-display-name">Display Name</label>
            <input
              id="info-display-name"
              type="text"
              .value="${this._displayName}"
              placeholder="e.g. Matcha Green"
              @input="${this._onDisplayNameInput}"
            />
            <p class="field-hint">
              Human-readable label shown in UIs and docs.
            </p>
          </div>

          <p class="section-title">Authorship</p>

          <!-- Author -->
          <div class="field">
            <label for="info-author">Author</label>
            <input
              id="info-author"
              type="text"
              .value="${this._author}"
              placeholder="e.g. Jane Doe"
              @input="${this._onAuthorInput}"
            />
          </div>

          <!-- Description -->
          <div class="field">
            <label for="info-description">Description</label>
            <textarea
              id="info-description"
              .value="${this._description}"
              placeholder="Brief description of this flavor's character and intended use…"
              @input="${this._onDescriptionInput}"
            ></textarea>
          </div>

          <p class="section-title">Release</p>

          <!-- Version -->
          <div class="field">
            <label for="info-version">Version</label>
            <input
              id="info-version"
              type="text"
              .value="${this._version}"
              placeholder="1.0.0"
              @input="${this._onVersionInput}"
            />
          </div>

          <!-- Website -->
          <div class="field">
            <label for="info-website">Website / Repo</label>
            <input
              id="info-website"
              type="url"
              .value="${this._website}"
              placeholder="https://github.com/…"
              @input="${this._onWebsiteInput}"
            />
          </div>

          <!-- Status -->
          <div
            class="${this._isReady
              ? "status-badge ready"
              : "status-badge pending"}"
          >
            ${this._isReady
              ? html`&#10003; Flavor identity set`
              : html`Enter a flavor name to continue`}
          </div>
        </aside>

        <main class="panel-main" aria-live="polite">
          <!-- Passport card -->
          <div class="passport">
            <div class="passport-header">
              <p class="passport-label">
                Sando Design System — Flavor Workshop
              </p>
              <h2 class="passport-name">${nameValue}</h2>
              ${this._displayName.trim()
                ? html`<p class="passport-display-name">
                    ${this._displayName.trim()}
                  </p>`
                : html``}
            </div>

            <div class="passport-body">
              <div class="passport-row">
                <span class="passport-row-label">Author</span>
                <span
                  class="passport-row-value ${!this._author.trim()
                    ? "empty"
                    : ""}"
                >
                  ${this._author.trim() || "—"}
                </span>
              </div>

              <div class="passport-row">
                <span class="passport-row-label">Description</span>
                <span
                  class="passport-row-value ${!this._description.trim()
                    ? "empty"
                    : ""}"
                >
                  ${this._description.trim() || "No description provided."}
                </span>
              </div>

              ${this._website.trim()
                ? html`
                    <div class="passport-row">
                      <span class="passport-row-label">Website</span>
                      <span class="passport-row-value"
                        >${this._website.trim()}</span
                      >
                    </div>
                  `
                : html``}
            </div>

            <div class="passport-footer">
              <span class="passport-version"
                >v${this._version.trim() || "1.0.0"}</span
              >
              <span class="passport-ds-label">FLAVOR WORKSHOP</span>
            </div>
          </div>

          <!-- Naming guide -->
          <div class="naming-guide">
            <p class="naming-guide-title">Naming rules</p>
            <ul>
              <li>Lowercase letters, numbers, and hyphens only</li>
              <li>Single word or hyphenated (e.g. <code>egg-salad</code>)</li>
              <li>Food-inspired names follow the Sando convention</li>
              <li>These names are reserved by the system:</li>
            </ul>
            <div class="reserved-list">
              ${[...SYSTEM_FLAVORS].map(
                (name) => html`<span class="reserved-chip">${name}</span>`,
              )}
            </div>
          </div>
        </main>
      </div>
    `;
  }

  /** Expose the current valid flavor name for the shell */
  get currentFlavorName(): string {
    return this._isReady ? this._name.trim() : "";
  }
}

customElements.define("sando-tb-info-panel", SandoTbInfoPanel);
