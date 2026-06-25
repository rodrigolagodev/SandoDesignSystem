/**
 * Flavor Workshop — Interactive flavor authoring tool for Sando Design System.
 *
 * Multi-tab workshop for crafting custom OKLCH palettes, typography, shape,
 * motion, and elevation ingredients. All exports can be downloaded individually
 * or bundled into a ZIP via "Download All".
 *
 * This is a docs-only developer tool — NOT a public component.
 * It lives exclusively in apps/docs/stories/tools/ and is never published
 * to packages/components/.
 *
 * @see ThemeBuilder.mdx for usage instructions and export format details.
 */

import type { Meta, StoryObj } from "@storybook/web-components";
import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { zipSync, strToU8 } from "fflate";

import type {
  BuilderState,
  TabName,
  PanelChangeDetail,
} from "./theme-builder-types.js";

// Import panel elements (each registers its own custom element)
import "./theme-builder-info-panel.js";
import "./theme-builder-colors-panel.js";
import "./theme-builder-typography-panel.js";
import "./theme-builder-shape-panel.js";
import "./theme-builder-motion-panel.js";
import "./theme-builder-elevation-panel.js";

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

const TABS: Array<{ id: TabName; label: string }> = [
  { id: "info", label: "Flavor Info" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "shape", label: "Shape" },
  { id: "motion", label: "Motion" },
  { id: "elevation", label: "Elevation" },
];

// File names per tab for the ZIP
const TAB_FILENAMES: Record<TabName, string> = {
  info: "manifest.json",
  colors: "color-palette.json",
  typography: "font-families.json",
  shape: "border-shape.json",
  motion: "animation.json",
  elevation: "elevation.json",
};

// ---------------------------------------------------------------------------
// SandoThemeBuilder — root shell
//
// Architecture: Each panel element is always rendered in the DOM (display:none
// for inactive ones) to preserve @state() across tab switches.
// Each panel renders its own sidebar+main layout via a 2-column CSS grid.
// The root shell provides only the top tab bar and the Download All footer.
// ---------------------------------------------------------------------------

class SandoThemeBuilder extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
      color: #1a1a1a;
      background: #f8f8f8;
      min-height: 100vh;
    }

    /* ---- Shell layout ---- */
    .shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* ---- Top bar ---- */
    .top-bar {
      display: flex;
      align-items: stretch;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      flex-shrink: 0;
      padding: 0 24px;
      gap: 0;
    }

    .top-bar-brand {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 12px 24px 12px 0;
      border-right: 1px solid #e5e5e5;
      margin-right: 20px;
      flex-shrink: 0;
    }

    .top-bar-title {
      font-size: 15px;
      font-weight: 700;
      color: #111;
      margin: 0;
      line-height: 1;
    }

    .top-bar-subtitle {
      font-size: 11px;
      color: #999;
      margin: 3px 0 0;
    }

    /* ---- Tab bar ---- */
    .tab-bar {
      display: flex;
      flex: 1;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tab-bar::-webkit-scrollbar {
      display: none;
    }

    .tab-btn {
      flex-shrink: 0;
      padding: 0 18px;
      height: 52px;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      font-size: 13px;
      font-weight: 500;
      color: #888;
      cursor: pointer;
      transition:
        color 0.15s,
        border-color 0.15s;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tab-btn:hover:not(.active) {
      color: #444;
    }

    .tab-btn.active {
      color: #1a1a1a;
      border-bottom-color: #1a1a1a;
      font-weight: 600;
    }

    .tab-ready-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #22c55e;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ---- Download All in top bar ---- */
    .top-bar-actions {
      display: flex;
      align-items: center;
      padding: 0 0 0 20px;
      border-left: 1px solid #e5e5e5;
      margin-left: auto;
      gap: 8px;
      flex-shrink: 0;
    }

    .btn-download-all {
      padding: 8px 16px;
      background: #1a1a1a;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition:
        background 0.15s,
        opacity 0.15s;
      white-space: nowrap;
    }

    .btn-download-all:hover:not(:disabled) {
      background: #333;
    }

    .btn-download-all:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .download-hint {
      font-size: 11px;
      color: #bbb;
      white-space: nowrap;
    }

    /* ---- Panel container ---- */
    .panels {
      flex: 1;
      position: relative;
    }

    .panel-wrapper {
      width: 100%;
      height: 100%;
    }

    .panel-wrapper[hidden] {
      display: none;
    }
  `;

  @state() private _activeTab: TabName = "info";
  @state() private _builderState: BuilderState = {};

  private _onTabChange(tab: TabName) {
    this._activeTab = tab;
  }

  private _onPanelChange(e: Event) {
    const detail = (e as CustomEvent<PanelChangeDetail>).detail;
    this._builderState = {
      ...this._builderState,
      [detail.tab]: detail,
    };
  }

  private get _downloadAllEnabled(): boolean {
    return this._builderState.info?.isReady === true;
  }

  private _getFlavorName(): string {
    const infoJson = this._builderState.info?.json as
      | { flavor?: { name?: string } }
      | undefined;
    return infoJson?.flavor?.name ?? "my-flavor";
  }

  private get _currentFlavorName(): string {
    const infoJson = this._builderState.info?.json as
      | { flavor?: { name?: string } }
      | undefined;
    return infoJson?.flavor?.name ?? "";
  }

  private _onDownloadAll() {
    if (!this._downloadAllEnabled) return;

    const files: Record<string, Uint8Array> = {};
    const builderState = this._builderState;

    const tabEntries = Object.entries(builderState) as Array<
      [TabName, PanelChangeDetail]
    >;
    for (const [tab, detail] of tabEntries) {
      if (detail?.isReady && detail.json) {
        const filename = TAB_FILENAMES[tab];
        const content = JSON.stringify(detail.json, null, 2) + "\n";
        files[filename] = strToU8(content);
      }
    }

    if (Object.keys(files).length === 0) return;

    const flavorName = this._getFlavorName() || "my-flavor";
    const zipped = zipSync(files);
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${flavorName}-ingredients.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private _isTabReady(tab: TabName): boolean {
    return this._builderState[tab]?.isReady === true;
  }

  override render() {
    return html`
      <div class="shell" @tb-panel-change="${this._onPanelChange}">
        <!-- Top bar: brand + tabs + download all -->
        <header class="top-bar">
          <div class="top-bar-brand">
            <p class="top-bar-title">Flavor Workshop</p>
            <p class="top-bar-subtitle">Craft your design ingredients</p>
          </div>

          <nav class="tab-bar" role="tablist" aria-label="Flavor Workshop tabs">
            ${TABS.map(
              (tab) => html`
                <button
                  class="tab-btn ${this._activeTab === tab.id ? "active" : ""}"
                  role="tab"
                  aria-selected="${this._activeTab === tab.id}"
                  aria-controls="panel-${tab.id}"
                  id="tab-${tab.id}"
                  @click="${() => this._onTabChange(tab.id)}"
                >
                  ${tab.label}
                  ${this._isTabReady(tab.id)
                    ? html`<span
                        class="tab-ready-dot"
                        aria-label="ready"
                        title="Ready"
                      ></span>`
                    : html``}
                </button>
              `,
            )}
          </nav>

          <div class="top-bar-actions">
            ${this._downloadAllEnabled
              ? html``
              : html`<span class="download-hint">Set flavor name first</span>`}
            <button
              class="btn-download-all"
              ?disabled="${!this._downloadAllEnabled}"
              @click="${this._onDownloadAll}"
              title="${this._downloadAllEnabled
                ? "Download all ready tabs as a ZIP"
                : "Set a flavor name in Flavor Info to enable Download All"}"
            >
              Download All
            </button>
          </div>
        </header>

        <!-- Panel area: all panels always rendered, inactive ones hidden -->
        <div class="panels" aria-live="polite">
          <div
            class="panel-wrapper"
            id="panel-info"
            role="tabpanel"
            aria-labelledby="tab-info"
            ?hidden="${this._activeTab !== "info"}"
          >
            <sando-tb-info-panel></sando-tb-info-panel>
          </div>

          <div
            class="panel-wrapper"
            id="panel-colors"
            role="tabpanel"
            aria-labelledby="tab-colors"
            ?hidden="${this._activeTab !== "colors"}"
          >
            <sando-tb-colors-panel
              .flavorName="${this._currentFlavorName}"
            ></sando-tb-colors-panel>
          </div>

          <div
            class="panel-wrapper"
            id="panel-typography"
            role="tabpanel"
            aria-labelledby="tab-typography"
            ?hidden="${this._activeTab !== "typography"}"
          >
            <sando-tb-typography-panel></sando-tb-typography-panel>
          </div>

          <div
            class="panel-wrapper"
            id="panel-shape"
            role="tabpanel"
            aria-labelledby="tab-shape"
            ?hidden="${this._activeTab !== "shape"}"
          >
            <sando-tb-shape-panel></sando-tb-shape-panel>
          </div>

          <div
            class="panel-wrapper"
            id="panel-motion"
            role="tabpanel"
            aria-labelledby="tab-motion"
            ?hidden="${this._activeTab !== "motion"}"
          >
            <sando-tb-motion-panel></sando-tb-motion-panel>
          </div>

          <div
            class="panel-wrapper"
            id="panel-elevation"
            role="tabpanel"
            aria-labelledby="tab-elevation"
            ?hidden="${this._activeTab !== "elevation"}"
          >
            <sando-tb-elevation-panel></sando-tb-elevation-panel>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("sando-theme-builder", SandoThemeBuilder);

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: "Tools/Flavor Workshop",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive multi-tab workshop for crafting Sando Design System flavor ingredients: colors, typography, shape, motion, and elevation. Export individual JSON files or download all as a ZIP.",
      },
    },
    a11y: {
      config: {
        rules: [
          // The preview pane uses dynamically generated color swatches —
          // contrast requirements on the swatches themselves are intentionally
          // not enforced here (the WCAG table validates palette output contrast).
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * The Flavor Workshop — multi-tab interface for crafting a Sando flavor.
 * Use the tabs to configure Colors, Typography, Shape, Motion, and Elevation.
 * Download individual JSON files per tab, or use "Download All" to get a ZIP
 * (requires at least the Flavor Info tab to have a valid flavor name first).
 */
export const Builder: Story = {
  render: () => html`<sando-theme-builder></sando-theme-builder>`,
};
