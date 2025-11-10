<guideline doc_id="MS" category="02-architecture" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Design System Architect">

  <purpose id="MS-PU">
    Defines the Turborepo + pnpm workspace architecture, build orchestration, dependency management, and package organization for the Sando Design System monorepo. This ensures strict build order, efficient caching, and proper cross-package dependencies.
  </purpose>

<core_rules id="MS-CR">

    <rule id="MS-CR-R1" title="Strict Build Order (Non-Negotiable)">
      <summary>
        Tokens MUST be built before components, components before apps. This dependency chain is enforced by Turborepo.
      </summary>

      <build_chain>
        <step number="1">@sando/tokens (build)</step>
        <step number="2">@sando/components (build)</step>
        <step number="3">@sando/docs + @sando/site (dev/build)</step>
      </build_chain>

      <why>
        Components consume generated token files (CSS + TS). Building components before tokens fails. Apps import components, so components must be built first.
      </why>

      <turborepo_config lang="json">
        {
          "tasks": {
            "build": {
              "dependsOn": ["^build"] // ← "^" means dependencies build first
            }
          }
        }
      </turborepo_config>

      <anti_pattern lang="bash">
        # ❌ WRONG: Building components before tokens
        pnpm --filter @sando/components build  # Fails - no token files exist yet
      </anti_pattern>

      <pattern lang="bash">
        # ✅ CORRECT: Build tokens first
        pnpm --filter @sando/tokens build
        pnpm --filter @sando/components build

        # ✅ BEST: Let Turborepo handle order
        pnpm build  # Turborepo builds in correct order automatically
      </pattern>
    </rule>

    <rule id="MS-CR-R2" title="Package Organization">
      <summary>
        Each workspace package MUST follow strict folder structure and naming. Packages are either libraries (shared) or apps (deployable).
      </summary>

      <structure>
        <directory name="sando-design-system">
          <directory name="packages" description="Shared libraries">
            <directory name="tokens" package="@sando/tokens" />
            <directory name="components" package="@sando/components" />
          </directory>
          <directory name="apps" description="Deployable applications">
            <directory name="docs" package="@sando/docs" description="Storybook" />
            <directory name="site" package="@sando/site" description="VitePress" />
          </directory>
        </directory>
      </structure>

      <naming_convention>
        <scope>All packages use `@sando/` scope</scope>
        <format>Package names: kebab-case matching folder name</format>
        <example>packages/tokens/ → @sando/tokens</example>
      </naming_convention>

      <package_json_pattern lang="json">
        {
          "name": "@sando/tokens",
          "version": "0.1.0",
          "main": "./dist/index.js",
          "exports": {
            ".": "./dist/index.js",
            "./ingredients": "./dist/sando-tokens/css/ingredients/ingredients.css"
          }
        }
      </package_json_pattern>

      <anti_pattern lang="json">
        // ❌ WRONG: No scope, wrong name format
        {
          "name": "sando_tokens", // Should be @sando/tokens
          "version": "0.1.0"
        }
      </anti_pattern>
    </rule>

    <rule id="MS-CR-R3" title="Workspace Dependencies">
      <summary>
        Use `workspace:*` protocol for cross-package references. This ensures local packages always use the workspace version, not npm registry.
      </summary>

      <pattern lang="json" file="packages/components/package.json">
        {
          "dependencies": {
            "@sando/tokens": "workspace:*" // ← Always use workspace version
          }
        }
      </pattern>

      <why>
        Without `workspace:*`, pnpm might fetch from npm registry instead of using local package. This breaks local development and causes version mismatches.
      </why>

      <anti_pattern lang="json">
        // ❌ WRONG: Version number instead of workspace protocol
        {
          "dependencies": {
            "@sando/tokens": "^0.1.0"  // Might fetch from npm, not local
          }
        }

        // ❌ WRONG: File path instead of package name
        {
          "dependencies": {
            "tokens": "file:../tokens"  // Use workspace protocol instead
          }
        }
      </anti_pattern>
    </rule>

    <rule id="MS-CR-R4" title="Turborepo Caching Strategy">
      <summary>
        Cache build outputs, never cache dev/watch tasks. Caching speeds up CI/local builds but must not interfere with live reload.
      </summary>

      <cache_enabled>
        <task name="build">
          <outputs>dist/**, .next/**, storybook-static/**</outputs>
          <cache>true</cache>
        </task>
        <task name="test">
          <outputs>coverage/**, test-results/**</outputs>
          <cache>true</cache>
        </task>
        <task name="lint">
          <outputs>None, but results are cached</outputs>
          <cache>true</cache>
        </task>
      </cache_enabled>

      <non_cached persistent="true">
        <task name="dev">Live reload for development</task>
        <task name="test:watch">Auto-rerun tests</task>
        <task name="test:ui">Interactive test UI</task>
      </non_cached>

      <turbo_config lang="json">
        {
          "tasks": {
            "build": {
              "dependsOn": ["^build"],
              "outputs": ["dist/**"],
              "cache": true // ← Implicit (default)
            },
            "dev": {
              "cache": false,
              "persistent": true // ← Long-running process
            }
          }
        }
      </turbo_config>

      <force_rebuild>
        <command>pnpm build --force</command>
        <command>pnpm clean && pnpm build</command>
      </force_rebuild>
    </rule>

    <rule id="MS-CR-R5" title="pnpm Workspace Configuration">
      <summary>
        All packages MUST be defined in pnpm-workspace.yaml. This file is the single source of truth for workspace members.
      </summary>

      <pnpm_workspace lang="yaml">
        packages:
          - "packages/*" # All folders in packages/ are workspace packages
          - "apps/*" # All folders in apps/ are workspace apps
      </pnpm_workspace>

      <adding_new_package>
        <step number="1">Create folder in `packages/` or `apps/`</step>
        <step number="2">Add `package.json` with `@sando/{name}`</step>
        <step number="3">No need to update `pnpm-workspace.yaml` (glob pattern covers it)</step>
        <step number="4">Run `pnpm install` to register</step>
      </adding_new_package>

      <anti_pattern lang="yaml">
        # ❌ WRONG: Hardcoding package names
        packages:
          - 'packages/tokens'
          - 'packages/components'
          # New package? Must update this list manually (fragile)

        # ✅ CORRECT: Use glob patterns
        packages:
          - 'packages/*'  # Automatically includes all packages
      </anti_pattern>
    </rule>

</core_rules>

<package_responsibilities id="MS-PR">

    <package name="@sando/tokens" location="packages/tokens">
      <purpose>
        Design token source files (JSON) and build system (Style Dictionary). Generates CSS + TypeScript token files.
      </purpose>

      <key_files>
        <file path="src/ingredients/*.json">Primitive tokens</file>
        <file path="src/flavors/*/flavor*.json">Semantic tokens + modes</file>
        <file path="src/recipes/*.json">Component tokens</file>
        <file path="build/index.js">Build orchestrator</file>
        <file path="dist/sando-tokens/">Generated output (CSS + TS)</file>
      </key_files>

      <exports lang="json">
        {
          "exports": {
            "./ingredients": "./dist/sando-tokens/css/ingredients/ingredients.css",
            "./flavors/original": "./dist/sando-tokens/css/flavors/original/flavor.css",
            "./recipes/button": "./dist/sando-tokens/css/recipes/button.css",
            "./ts/ingredients": "./dist/sando-tokens/ts/ingredients/index.ts"
          }
        }
      </exports>

      <commands>
        <command>pnpm --filter @sando/tokens build</command>
        <command>pnpm --filter @sando/tokens dev</command>
        <command>pnpm --filter @sando/tokens test</command>
      </commands>

      <dependencies>None (leaf package in dependency graph)</dependencies>
    </package>

    <package name="@sando/components" location="packages/components">
      <purpose>
        Lit Web Components consuming tokens. Each component is self-contained in its own folder.
      </purpose>

      <key_files>
        <file path="src/components/button/">Button component (7-file pattern)</file>
        <file path="src/components/input/">Input component</file>
        <file path="src/mixins/">Shared mixins (FlavorableMixin)</file>
        <file path="src/styles/tokens.css.js">Token CSS imports</file>
        <file path="dist/">Compiled components</file>
      </key_files>

      <exports lang="json">
        {
          "exports": {
            ".": "./dist/index.js",
            "./button": "./dist/components/button/index.js",
            "./input": "./dist/components/input/index.js"
          }
        }
      </exports>

      <commands>
        <command>pnpm --filter @sando/components build</command>
        <command>pnpm --filter @sando/components test</command>
        <command>pnpm --filter @sando/components test:e2e</command>
      </commands>

      <dependencies>
        <dependency>@sando/tokens (workspace)</dependency>
        <dependency>lit</dependency>
      </dependencies>
    </package>

    <package name="@sando/docs" location="apps/docs">
      <purpose>
        Storybook documentation for components. Interactive component explorer.
      </purpose>

      <key_files>
        <file path=".storybook/main.ts">Storybook config</file>
        <file path="stories/">Component stories</file>
        <file path="public/">Static assets</file>
        <file path="storybook-static/">Build output</file>
      </key_files>

      <commands>
        <command>pnpm --filter @sando/docs dev</command>
        <command>pnpm --filter @sando/docs build</command>
      </commands>

      <dependencies>
        <dependency>@sando/components (workspace)</dependency>
        <dependency>@sando/tokens (workspace)</dependency>
        <dependency>storybook</dependency>
      </dependencies>

      <port>6006 (default, configurable in .env.local)</port>
    </package>

    <package name="@sando/site" location="apps/site">
      <purpose>
        VitePress documentation site. Guides, tutorials, API reference.
      </purpose>

      <key_files>
        <file path=".vitepress/config.ts">VitePress config</file>
        <file path="components/">Component docs (Markdown)</file>
        <file path="guides/">Tutorial guides</file>
        <file path=".vitepress/dist/">Build output</file>
      </key_files>

      <commands>
        <command>pnpm --filter @sando/site dev</command>
        <command>pnpm --filter @sando/site build</command>
        <command>pnpm --filter @sando/site preview</command>
      </commands>

      <dependencies>
        <dependency>@sando/components (workspace)</dependency>
        <dependency>vitepress</dependency>
      </dependencies>

      <port>3000 (default, configurable in .env.local)</port>
    </package>

</package_responsibilities>

<build_order_visualization id="MS-BOV">
<diagram>
┌─────────────────┐
│ @sando/tokens │ (Layer 1: Build first)
└────────┬────────┘
│ generates CSS/TS files
▼
┌─────────────────┐
│ @sando/components│ (Layer 2: Consume tokens)
└────────┬────────┘
│ imports components
▼
┌──────────────────────────┐
│ @sando/docs (Storybook) │ (Layer 3: Document components)
│ @sando/site (VitePress) │
└──────────────────────────┘
</diagram>

    <enforcement>
      Turborepo enforces this via `dependsOn: ["^build"]` - Each package's build waits for dependencies to finish.
    </enforcement>

</build_order_visualization>

<common_commands id="MS-CC">

    <root_level_commands>
      <command name="pnpm install">Install dependencies (MUST use pnpm)</command>
      <command name="pnpm build">Build all packages (respects build order)</command>
      <command name="pnpm dev">Development mode (parallel: Storybook + VitePress)</command>
      <command name="pnpm test">Run all tests across all packages</command>
      <command name="pnpm lint">Lint all packages</command>
      <command name="pnpm format">Format all files</command>
      <command name="pnpm clean">Clean all artifacts</command>
    </root_level_commands>

    <package_specific_commands>
      <syntax>pnpm --filter &lt;package-name&gt; &lt;command&gt;</syntax>

      <tokens>
        <command>pnpm --filter @sando/tokens build</command>
        <command>pnpm --filter @sando/tokens dev</command>
        <command>pnpm --filter @sando/tokens test</command>
      </tokens>

      <components>
        <command>pnpm --filter @sando/components build</command>
        <command>pnpm --filter @sando/components test</command>
        <command>pnpm --filter @sando/components test:e2e</command>
      </components>

      <storybook>
        <command>pnpm --filter @sando/docs dev</command>
        <command>pnpm --filter @sando/docs build</command>
      </storybook>

      <vitepress>
        <command>pnpm --filter @sando/site dev</command>
        <command>pnpm --filter @sando/site build</command>
        <command>pnpm --filter @sando/site preview</command>
      </vitepress>
    </package_specific_commands>

    <shorter_aliases description="From root package.json">
      <command name="pnpm tokens:build">Build only tokens</command>
      <command name="pnpm tokens:dev">Watch mode</command>
      <command name="pnpm components:build">Build only components</command>
      <command name="pnpm docs:dev">Start Storybook</command>
      <command name="pnpm docs:build">Build Storybook</command>
      <command name="pnpm site:dev">Start VitePress</command>
      <command name="pnpm site:build">Build VitePress</command>
      <command name="pnpm site:preview">Preview VitePress</command>
    </shorter_aliases>

</common_commands>

<turborepo_configuration id="MS-TC">
<file>turbo.json (monorepo root)</file>

    <task_configuration lang="json">
      {
        "$schema": "https://turbo.build/schema.json",
        "ui": "tui", // Terminal UI for build progress
        "tasks": {
          "build": {
            "dependsOn": ["^build"], // ← Wait for dependencies to build
            "outputs": [
              "dist/**",
              ".next/**",
              "!.next/cache/**",
              "storybook-static/**",
              ".vitepress/dist/**"
            ],
            "env": ["NODE_ENV"] // Invalidate cache if NODE_ENV changes
          },
          "test": {
            "dependsOn": ["build"], // Tests need built packages
            "outputs": ["coverage/**", "test-results/**"],
            "cache": true
          },
          "dev": {
            "cache": false, // Never cache dev mode
            "persistent": true // Long-running process
          },
          "lint": {
            "outputs": [], // No file outputs
            "cache": true // Cache lint results
          }
        },
        "globalDependencies": [
          "**/.env.*local" // Invalidate cache if env files change
        ]
      }
    </task_configuration>

    <key_concepts>
      <concept name="dependsOn: [&quot;^build&quot;]">
        <meaning>`^` prefix means "dependencies" (packages this package depends on)</meaning>
        <meaning>Without `^`, it means "tasks in THIS package"</meaning>
        <example>`"dependsOn": ["^build", "test"]` = dependencies build first, then THIS package's test task</example>
      </concept>

      <concept name="Outputs">
        <meaning>Files to cache for reuse</meaning>
        <meaning>Glob patterns: `dist/**` includes all files in dist/</meaning>
        <meaning>Negations: `!.next/cache/**` excludes files from cache</meaning>
      </concept>

      <concept name="Persistent Tasks">
        <meaning>Long-running processes (dev servers, watch modes)</meaning>
        <meaning>Cannot be cached (always run fresh)</meaning>
      </concept>
    </key_concepts>

</turborepo_configuration>

<build_cache_management id="MS-BCM">

    <turborepo_cache>
      <location>node_modules/.cache/turbo/ (gitignored)</location>
    </turborepo_cache>

    <cache_usage_conditions>
      <condition>Source files unchanged (git hash)</condition>
      <condition>Dependencies unchanged (package.json, lockfile)</condition>
      <condition>Environment variables unchanged (listed in `env`)</condition>
      <condition>Global dependencies unchanged (.env files)</condition>
    </cache_usage_conditions>

    <force_rebuild>
      <method number="1">
        <command>pnpm build --force</command>
        <description>--force flag</description>
      </method>
      <method number="2">
        <command>pnpm clean && pnpm build</command>
        <description>Clean + rebuild</description>
      </method>
      <method number="3">
        <command>rm -rf node_modules/.cache/turbo && pnpm build</command>
        <description>Delete Turbo cache</description>
      </method>
    </force_rebuild>

    <token_build_cache>
      <note>Separate from Turborepo: Tokens have their own incremental build cache</note>
      <location>packages/tokens/.build-cache.json</location>
      <force_rebuild>
        <command>rm packages/tokens/.build-cache.json</command>
        <command>pnpm --filter @sando/tokens build -- --force</command>
      </force_rebuild>
    </token_build_cache>

</build_cache_management>

<cross_package_imports id="MS-CPI">

    <importing_tokens_in_components>
      <pattern lang="typescript" file="packages/components/src/components/button/sando-button.ts">
        import { tokenStyles } from "../../styles/tokens.css.js"; // Local import
      </pattern>

      <token_css_import lang="typescript" file="packages/components/src/styles/tokens.css.js">
        import { css } from "lit";

        // Import generated token CSS
        import ingredientsCss from "@sando/tokens/ingredients";
        import flavorCss from "@sando/tokens/flavors/original";
        import buttonRecipesCss from "@sando/tokens/recipes/button";

        export const tokenStyles = css`
          ${ingredientsCss}
          ${flavorCss}
          ${buttonRecipesCss}
        `;
      </token_css_import>

      <why>`@sando/tokens` exports individual CSS files. Components import what they need.</why>
    </importing_tokens_in_components>

    <importing_components_in_apps>
      <storybook lang="typescript">
        // Storybook story
        import "@sando/components/button"; // Auto-registers &lt;sando-button&gt;
        import type { SandoButton } from "@sando/components/button";
      </storybook>

      <vitepress lang="vue">
        <!-- VitePress markdown -->
        <script setup>
        import "@sando/components/button";
        </script>

        <sando-button>Click me</sando-button>
      </vitepress>
    </importing_components_in_apps>

</cross_package_imports>

<adding_new_packages id="MS-ANP">
<guide>
<step number="1">Create folder</step>
<command>mkdir packages/new-package && cd packages/new-package</command>

      <step number="2">Create package.json</step>
      <example lang="json">
        {
          "name": "@sando/new-package",
          "version": "0.1.0",
          "type": "module",
          "main": "./dist/index.js",
          "exports": {
            ".": "./dist/index.js"
          },
          "scripts": {
            "build": "vite build",
            "dev": "vite",
            "test": "vitest"
          },
          "dependencies": {
            "@sando/tokens": "workspace:*"
          }
        }
      </example>

      <step number="3">Add to workspace (automatic - glob pattern covers it)</step>
      <command>pnpm install</command>

      <step number="4">Create source files</step>
      <command>mkdir src && touch src/index.ts</command>

      <step number="5">Build and test</step>
      <command>pnpm --filter @sando/new-package build</command>
      <command>pnpm --filter @sando/new-package test</command>
    </guide>

</adding_new_packages>

  <validation id="MS-V">

    <workspace_structure>
      <item status="required">All packages in `packages/` or `apps/` folders</item>
      <item status="required">All packages use `@sando/` scope</item>
      <item status="required">All packages have `package.json` with correct name</item>
      <item status="required">`pnpm-workspace.yaml` includes glob patterns</item>
    </workspace_structure>

    <dependencies_checklist>
      <item status="required">Cross-package deps use `workspace:*` protocol</item>
      <item status="required">No version numbers for workspace packages</item>
      <item status="required">External deps (lit, vite) are NOT workspace protocol</item>
    </dependencies_checklist>

    <build_order_checklist>
      <item status="required">Tokens package has no workspace dependencies</item>
      <item status="required">Components depend on tokens (`@sando/tokens: workspace:*`)</item>
      <item status="required">Apps depend on components (`@sando/components: workspace:*`)</item>
      <item status="required">`turbo.json` has `dependsOn: ["^build"]`</item>
    </build_order_checklist>

    <turborepo_config_checklist>
      <item status="required">Build tasks have `outputs` defined</item>
      <item status="required">Dev/watch tasks have `persistent: true`</item>
      <item status="required">Dev/watch tasks have `cache: false`</item>
      <item status="required">Test tasks depend on build (`dependsOn: ["build"]`)</item>
    </turborepo_config_checklist>

    <commands_checklist>
      <item status="required">`pnpm build` builds in correct order</item>
      <item status="required">`pnpm dev` starts Storybook + VitePress</item>
      <item status="required">`pnpm test` runs all tests</item>
      <item status="required">Package filters work: `pnpm --filter @sando/tokens build`</item>
    </commands_checklist>

  </validation>

  <faq id="MS-FAQ">

    <question id="MS-FAQ-Q1">
      <q>Why use pnpm instead of npm/yarn?</q>
      <a>
        Reasons:
        1. Faster installs: Symlinks packages instead of copying
        2. Disk space: Single store for all package versions
        3. Strict mode: Prevents phantom dependencies (can't import undeclared deps)
        4. Workspace protocol: `workspace:*` ensures local packages always used
      </a>
    </question>

    <question id="MS-FAQ-Q2">
      <q>What happens if I build components before tokens?</q>
      <a>
        Build FAILS. Components import token CSS/TS files that don't exist until tokens are built.

        Error:
        ```
        Error: Cannot find module '@sando/tokens/ingredients'
        ```

        Solution: Build tokens first, or use `pnpm build` (Turborepo handles order).
      </a>
    </question>

    <question id="MS-FAQ-Q3">
      <q>Can I run multiple dev servers simultaneously?</q>
      <a>
        YES. `pnpm dev` runs Storybook (port 6006) and VitePress (port 3000) in parallel.
        Turborepo uses `--parallel` flag for dev tasks (no dependency waiting).
      </a>
    </question>

    <question id="MS-FAQ-Q4">
      <q>How do I know if cache is being used?</q>
      <a>
        Turborepo output:
        ```
        >>> FULL TURBO     # Cache hit (reused previous build)
        >>> >>> LOCAL      # Cache miss (building fresh)
        ```
        Use `--force` to bypass cache.
      </a>
    </question>

    <question id="MS-FAQ-Q5">
      <q>Can I build a single package?</q>
      <a>
        YES:
        ```bash
        # Build only tokens
        pnpm --filter @sando/tokens build

        # Build tokens and everything that depends on it
        pnpm --filter @sando/tokens... build
        ```
      </a>
    </question>

  </faq>

<related_guidelines id="MS-RG">
<reference
      type="guideline"
      doc_id="TA"
      file="../01-design-system/TOKEN_ARCHITECTURE.md"
      category="01-design-system">
Three-layer token system (explains why tokens build first)
</reference>

    <reference
      type="guideline"
      doc_id="TBS"
      file="TOKEN_BUILD_SYSTEM.md"
      category="02-architecture">
      Style Dictionary orchestrator and token build process
    </reference>

    <reference
      type="guideline"
      doc_id="CA"
      file="COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
      Component structure (explains component package organization)
    </reference>

    <reference
      type="guideline"
      doc_id="GW"
      file="../03-development/GIT_WORKFLOW.md"
      category="03-development">
      Changesets for versioning workspace packages
    </reference>

</related_guidelines>

<external_references id="MS-ER">
<reference
      type="documentation"
      url="https://turbo.build/repo/docs"
      title="Turborepo Documentation">
Official Turborepo guide
</reference>

    <reference
      type="documentation"
      url="https://pnpm.io/workspaces"
      title="pnpm Workspaces">
      pnpm workspace documentation
    </reference>

    <reference
      type="documentation"
      url="https://pnpm.io/filtering"
      title="pnpm Filtering">
      Using `--filter` for package-specific commands
    </reference>

</external_references>

  <changelog id="MS-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial Release</change>
      <change type="NEW">Defined monorepo structure (packages vs apps)</change>
      <change type="NEW">Documented Turborepo build order enforcement</change>
      <change type="NEW">Explained pnpm workspace configuration</change>
      <change type="NEW">Added package responsibilities and exports</change>
      <change type="NEW">Included build cache management guide</change>
      <change type="NEW">Added cross-package import patterns</change>
      <change type="NEW">Created validation checklist</change>
    </version>
  </changelog>

  <conclusion>
    This guideline establishes the foundation for the Sando Design System monorepo architecture. All build, dependency, and package organization decisions reference these rules.
  </conclusion>

</guideline>
