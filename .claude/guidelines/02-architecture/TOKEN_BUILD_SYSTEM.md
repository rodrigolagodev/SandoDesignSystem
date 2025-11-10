<guideline doc_id="TBS" category="02-architecture" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Developer Tooling Specialist">

  <purpose id="TBS-PU">
    Defines the Style Dictionary 4.0 orchestrator that builds the three-layer token system (Ingredients → Flavors → Recipes), including custom transforms, formats, build caching, and output structure. This system generates CSS custom properties and TypeScript files from JSON source tokens.
  </purpose>

<core_rules id="TBS-CR">

    <rule id="TBS-CR-R1" title="Three-Layer Build Sequence (Non-Negotiable)">
      <summary>
        Tokens build in strict order: Ingredients → Flavors → Recipes. Each layer must complete before the next begins.
      </summary>

      <build_flow>
        <step number="1" layer="Ingredients">Generate CSS + TS primitives</step>
        <step number="2" layer="Flavors">Generate CSS + TS semantic tokens (references Layer 1)</step>
        <step number="3" layer="Recipes">Generate CSS + TS component tokens (references Layer 2)</step>
      </build_flow>

      <why>
        Flavors reference Ingredients, Recipes reference Flavors. Building out of order causes broken CSS variable references.
      </why>

      <pattern lang="javascript" file="packages/tokens/build/index.js">
        const layers = [
          { name: "Ingredients", config: ingredientsConfig },
          ...flavorLayers, // Multiple flavors (original, strawberry, etc.)
          { name: "Recipes", config: recipesConfig },
        ];

        await buildAllLayers({ layers, force, verbose });
      </pattern>

      <reference type="source_file" path="packages/tokens/build/index.js">
        Complete orchestrator implementation
      </reference>
    </rule>

    <rule id="TBS-CR-R2" title="Custom Transforms for CSS Variables">
      <summary>
        Two custom transforms process all tokens: `name/css-sando` and `name/css-var-reference`.
      </summary>

      <transform id="TBS-CR-R2-T1" name="name/css-sando">
        <purpose>Adds `--sando-` prefix to all CSS variable names</purpose>
        <example>
          <input>color.orange.700</input>
          <output>--sando-color-orange-700</output>
        </example>
        <implementation lang="javascript" file="build/transforms/name-css-sando.js">
          {
            name: 'name/css-sando',
            type: 'name',
            transform: (token) => {
              return `--sando-${token.path.join('-')}`;
            }
          }
        </implementation>
      </transform>

      <transform id="TBS-CR-R2-T2" name="name/css-var-reference">
        <purpose>Converts `{reference}` syntax to `var(--sando-*)`</purpose>
        <example>
          <input>{color.orange.700.value}</input>
          <output>var(--sando-color-orange-700)</output>
        </example>
        <implementation lang="javascript" file="build/transforms/css-var-reference.js">
          {
            name: 'name/css-var-reference',
            type: 'value',
            filter: (token) => token.original?.value?.includes('{'),
            transform: (token) => {
              return token.original.value.replace(
                /\{([^}]+)\.value\}/g,
                (match, path) => `var(--sando-${path.replace(/\./g, '-')})`
              );
            }
          }
        </implementation>
      </transform>

      <why>
        This creates the CSS variable chain that enables theming. Without these transforms, references would be resolved to absolute values, breaking theme switching.
      </why>

      <reference type="source_directory" path="packages/tokens/build/transforms/">
        Complete transform implementations
      </reference>
    </rule>

    <rule id="TBS-CR-R3" title="Layer-Specific Transform Groups">
      <summary>
        Each layer uses a specific transform group that determines which transforms apply.
      </summary>

      <transform_groups>
        <group name="sando/css/ingredients" layer="Ingredients">
          <transforms>
            <transform>name/css-sando</transform>
          </transforms>
          <note>Only name transform (no references)</note>
        </group>

        <group name="sando/css/flavors" layer="Flavors">
          <transforms>
            <transform>name/css-sando</transform>
            <transform>name/css-var-reference</transform>
          </transforms>
          <note>Name + reference transforms</note>
        </group>

        <group name="sando/css/recipes" layer="Recipes">
          <transforms>
            <transform>name/css-sando</transform>
            <transform>name/css-var-reference</transform>
          </transforms>
          <note>Name + reference transforms</note>
        </group>
      </transform_groups>

      <why>
        Ingredients have no references (absolute values), so they don't need the reference transform. Flavors and Recipes reference other layers, so they need both transforms.
      </why>
    </rule>

    <rule id="TBS-CR-R4" title="Dual Output Formats (CSS + TypeScript)">
      <summary>
        Every token layer generates TWO outputs: CSS custom properties and TypeScript files.
      </summary>

      <css_output location="dist/sando-tokens/css/">
        <ingredients lang="css">
          /* Ingredients: Absolute values */
          :root {
            --sando-color-orange-700: oklch(0.47 0.2 25);
          }
        </ingredients>

        <flavors lang="css">
          /* Flavors: var() references */
          [flavor="original"] {
            --sando-color-action-solid-background-default: var(--sando-color-orange-700);
          }
        </flavors>

        <recipes lang="css">
          /* Recipes: var() references */
          :root {
            --sando-button-solid-backgroundColor-default: var(
              --sando-color-action-solid-background-default
            );
          }
        </recipes>
      </css_output>

      <typescript_output location="dist/sando-tokens/ts/">
        <css_variables lang="typescript">
          // CSS variable names (for component consumption)
          export const tokens = {
            color: {
              orange: {
                700: "--sando-color-orange-700",
              },
            },
          };
        </css_variables>

        <absolute_values lang="typescript">
          // Absolute values (for testing, calculations)
          export const values = {
            color: {
              orange: {
                700: "oklch(0.47 0.20 25)",
              },
            },
          };
        </absolute_values>
      </typescript_output>

      <why>
        <reason name="CSS">Runtime styling in components</reason>
        <reason name="TypeScript">Type safety, testing, design tool integration</reason>
      </why>

      <reference type="source_directory" path="packages/tokens/build/formats/">
        Custom format implementations
      </reference>
    </rule>

    <rule id="TBS-CR-R5" title="Incremental Build Caching">
      <summary>
        The build system caches layer hashes in `.build-cache.json` to skip unchanged layers.
      </summary>

      <cache_structure lang="json">
        {
          "ingredients": "abc123...",
          "flavors": "def456...",
          "recipes": "ghi789..."
        }
      </cache_structure>

      <cache_behavior>
        <condition>If source files unchanged → Skip build (use cached output)</condition>
        <condition>If source files changed → Rebuild layer + update cache</condition>
        <condition>`--force` flag → Bypass cache, rebuild everything</condition>
      </cache_behavior>

      <force_rebuild>
        <method number="1">
          <command>pnpm tokens:build --force</command>
          <description>Use --force flag</description>
        </method>
        <method number="2">
          <command>rm packages/tokens/.build-cache.json && pnpm tokens:build</command>
          <description>Delete cache manually</description>
        </method>
        <method number="3">
          <command>pnpm --filter @sando/tokens build:clean</command>
          <description>Use build:clean script</description>
        </method>
      </force_rebuild>

      <why>
        Speeds up development. Changing one color shouldn't rebuild all 3 layers.
      </why>

      <reference type="source_file" path="packages/tokens/build/utils/build-cache.js">
        Cache implementation
      </reference>
    </rule>

</core_rules>

<build_orchestration id="TBS-BO">

    <entry_point file="build/index.js">
      <responsibilities>
        <item>Register custom transforms</item>
        <item>Register transform groups</item>
        <item>Register custom formats</item>
        <item>Define layer configurations</item>
        <item>Execute build sequence</item>
        <item>Print build summary</item>
        <item>Validate results</item>
      </responsibilities>

      <key_flow lang="javascript">
        // 1. Register transforms
        StyleDictionary.registerTransform(nameCssSando);
        StyleDictionary.registerTransform(cssVarReference);

        // 2. Register transform groups
        StyleDictionary.registerTransformGroup({
          name: "sando/css/ingredients",
          transforms: ["name/css-sando"],
        });

        // 3. Register formats
        StyleDictionary.registerFormat({
          name: "css/ingredients",
          format: cssIngredients,
        });

        // 4. Build all layers
        const results = await buildAllLayers({ layers, force, verbose });

        // 5. Validate
        const allSucceeded = validateBuildResults(results);
      </key_flow>

      <reference type="source_file" path="packages/tokens/build/index.js">
        Complete file (~145 lines)
      </reference>
    </entry_point>

    <orchestrator file="build/core/orchestrator.js">
      <responsibilities>
        <item>Iterate through layers sequentially</item>
        <item>Check cache for each layer</item>
        <item>Build layer if needed</item>
        <item>Update cache after successful build</item>
        <item>Collect results</item>
      </responsibilities>

      <key_function lang="javascript">
        export async function buildAllLayers(options) {
          const { layers, force, verbose } = options;
          const results = {};

          for (const layer of layers) {
            const { name, config, cacheKey } = layer;

            // Build layer
            const result = await buildLayer({ name, config, verbose });
            results[name] = result;

            // Update cache if successful
            if (result.success && cacheKey) {
              updateCache(cacheKey, `src/${cacheKey}`);
            }
          }

          return results;
        }
      </key_function>

      <reference type="source_file" path="packages/tokens/build/core/orchestrator.js">
        Complete file (~65 lines)
      </reference>
    </orchestrator>

    <layer_builder file="build/core/layer-builder.js">
      <responsibilities>
        <item>Execute Style Dictionary for single layer</item>
        <item>Measure build time</item>
        <item>Handle errors</item>
        <item>Return build result</item>
      </responsibilities>

      <key_function lang="javascript">
        export async function buildLayer({ name, config, verbose }) {
          const startTime = Date.now();

          try {
            const sd = new StyleDictionary(config);
            await sd.buildAllPlatforms();

            return {
              success: true,
              duration: Date.now() - startTime,
            };
          } catch (error) {
            return {
              success: false,
              error: error.message,
              duration: Date.now() - startTime,
            };
          }
        }
      </key_function>

      <reference type="source_file" path="packages/tokens/build/core/layer-builder.js">
        Complete file (~40 lines)
      </reference>
    </layer_builder>

</build_orchestration>

<layer_configurations id="TBS-LC">

    <ingredients_config file="build/configs/ingredients.config.js">
      <settings>
        <source>src/ingredients/*.json</source>
        <transform_group>sando/css/ingredients (no references)</transform_group>
        <formats>
          <format>css/ingredients</format>
          <format>typescript/css-variables</format>
          <format>typescript/primitive-values</format>
        </formats>
        <output>
          <css>dist/sando-tokens/css/ingredients/</css>
          <typescript>dist/sando-tokens/ts/ingredients/</typescript>
        </output>
      </settings>

      <output_structure>
        <directory name="dist/sando-tokens">
          <directory name="css/ingredients">
            <file>color.css</file>
            <file>space.css</file>
            <file>index.css (imports all)</file>
          </directory>
          <directory name="ts/ingredients">
            <file>color.ts</file>
            <file>space.ts</file>
            <file>index.ts (exports all)</file>
          </directory>
        </directory>
      </output_structure>
    </ingredients_config>

    <flavors_config file="build/configs/flavors.config.js">
      <settings>
        <source>src/flavors/{flavor-name}/*.json</source>
        <transform_group>sando/css/flavors (has references)</transform_group>
        <formats>
          <format>css/flavors-modes (special format for @media wrapping)</format>
        </formats>
        <output>dist/sando-tokens/css/flavors/{flavor-name}/</output>
      </settings>

      <special_behavior>
        Mode files (flavor-dark.json, flavor-high-contrast.json) are wrapped in @media queries
      </special_behavior>

      <example lang="css">
        /* Base flavor */
        [flavor="original"] {
          --sando-color-action-solid-background-default: var(--sando-color-orange-700);
        }

        /* Dark mode (automatic @media wrapper) */
        @media (prefers-color-scheme: dark) {
          [flavor="original"] {
            --sando-color-action-solid-background-default: var(
              --sando-color-orange-600
            );
          }
        }
      </example>

      <why>
        Modes are automatic (user's system preference), not manual like Flavors.
      </why>

      <reference type="guideline" doc_id="TS" file="../01-design-system/THEMING_STRATEGY.md">
        Flavors vs Modes distinction
      </reference>
    </flavors_config>

    <recipes_config file="build/configs/recipes.config.js">
      <settings>
        <source>src/recipes/*.json</source>
        <transform_group>sando/css/recipes (has references)</transform_group>
        <formats>
          <format>css/recipes</format>
          <format>typescript/css-variables</format>
        </formats>
        <output>
          <css>dist/sando-tokens/css/recipes/</css>
          <typescript>dist/sando-tokens/ts/recipes/</typescript>
        </output>
      </settings>

      <output_structure>
        <directory name="dist/sando-tokens">
          <directory name="css/recipes">
            <file>button.css</file>
            <file>input.css</file>
            <file>index.css</file>
          </directory>
          <directory name="ts/recipes">
            <file>button.ts</file>
            <file>input.ts</file>
            <file>index.ts</file>
          </directory>
        </directory>
      </output_structure>
    </recipes_config>

</layer_configurations>

<build_commands id="TBS-BC">

    <primary_commands>
      <command name="pnpm tokens:build">Standard build (uses cache)</command>
      <command name="pnpm tokens:build --force">Force rebuild (bypass cache)</command>
      <command name="pnpm tokens:build --verbose">Verbose output (shows all tokens)</command>
      <command name="pnpm tokens:dev">Watch mode (rebuild on file changes)</command>
    </primary_commands>

    <development_commands>
      <command name="pnpm --filter @sando/tokens clean">Clean all outputs and cache</command>
      <command name="pnpm --filter @sando/tokens build:clean">Clean + rebuild</command>
      <command name="pnpm --filter @sando/tokens test">Test tokens (validation tests)</command>
    </development_commands>

</build_commands>

<output_structure id="TBS-OS">
<directory_tree>
<directory name="packages/tokens/dist/sando-tokens">
<directory name="css">
<directory name="ingredients">
<file description="Color primitives">color.css</file>
<file description="Spacing primitives">space.css</file>
<file description="Typography primitives">font.css</file>
<file description="Imports all ingredients">index.css</file>
</directory>
<directory name="flavors">
<directory name="original">
<file description="Base flavor (light mode)">flavor.css</file>
<file description="Dark mode (@media wrapped)">flavor-dark.css</file>
<file description="High contrast mode">flavor-high-contrast.css</file>
<file description="Reduced motion mode">flavor-motion-reduce.css</file>
</directory>
<directory name="strawberry">
<file description="Same structure">[same structure]</file>
</directory>
<file description="Imports all flavors">index.css</file>
</directory>
<directory name="recipes">
<file description="Button tokens">button.css</file>
<file description="Input tokens">input.css</file>
<file description="Imports all recipes">index.css</file>
</directory>
<file description="Imports ingredients + flavors + recipes">index.css</file>
</directory>
<directory name="ts">
<directory name="ingredients">
<file description="Color exports (names + values)">color.ts</file>
<file description="Barrel export">index.ts</file>
</directory>
<directory name="flavors">
<file description="Original flavor exports">original.ts</file>
<file>index.ts</file>
</directory>
<directory name="recipes">
<file description="Button token exports">button.ts</file>
<file>index.ts</file>
</directory>
</directory>
</directory>
</directory_tree>
</output_structure>

<custom_formats id="TBS-CF">

    <css_formats>
      <format name="css/ingredients">Simple `:root` selector, absolute values</format>
      <format name="css/flavors-modes">`[flavor="name"]` selector + `@media` wrapping for modes</format>
      <format name="css/recipes">`:root` selector with var() references</format>
    </css_formats>

    <typescript_formats>
      <format name="typescript/css-variables">
        <description>Exports CSS variable names</description>
        <example lang="typescript">
          export const tokens = {
            color: {
              orange: {
                700: "--sando-color-orange-700",
              },
            },
          };
        </example>
      </format>

      <format name="typescript/primitive-values">
        <description>Exports absolute values</description>
        <example lang="typescript">
          export const values = {
            color: {
              orange: {
                700: "oklch(0.47 0.20 25)",
              },
            },
          };
        </example>
      </format>
    </typescript_formats>

    <reference type="source_directory" path="packages/tokens/build/formats/css/">
      CSS format implementations
    </reference>

    <reference type="source_directory" path="packages/tokens/build/formats/typescript/">
      TypeScript format implementations
    </reference>

</custom_formats>

<adding_tokens id="TBS-AT">

    <adding_ingredient>
      <step number="1">Edit source file</step>
      <example lang="bash">
        echo '{
          "color": {
            "purple": {
              "500": { "value": "oklch(0.55 0.25 310)", "type": "color" }
            }
          }
        }' >> packages/tokens/src/ingredients/color.json
      </example>

      <step number="2">Build (auto-detects changes)</step>
      <command>pnpm tokens:build</command>

      <step number="3">Output generated</step>
      <output>
        <file>dist/sando-tokens/css/ingredients/color.css</file>
        <file>dist/sando-tokens/ts/ingredients/color.ts</file>
      </output>
    </adding_ingredient>

    <adding_flavor>
      <step number="1">Edit flavor source</step>
      <example lang="bash">
        echo '{
          "color": {
            "sidebar": {
              "background": {
                "value": "{color.neutral.100.value}",
                "type": "color"
              }
            }
          }
        }' >> packages/tokens/src/flavors/original/flavor.json
      </example>

      <step number="2">Build</step>
      <command>pnpm tokens:build</command>

      <step number="3">Output</step>
      <result>var(--sando-color-neutral-100) reference generated</result>
    </adding_flavor>

    <adding_recipe>
      <step number="1">Create new recipe file</step>
      <command>touch packages/tokens/src/recipes/card.json</command>

      <step number="2">Add tokens</step>
      <example lang="bash">
        echo '{
          "card": {
            "backgroundColor": {
              "value": "{color.background.surface.value}",
              "type": "color"
            }
          }
        }' > packages/tokens/src/recipes/card.json
      </example>

      <step number="3">Build</step>
      <command>pnpm tokens:build</command>

      <step number="4">Output</step>
      <file>dist/sando-tokens/css/recipes/card.css</file>
    </adding_recipe>

</adding_tokens>

  <validation id="TBS-V">

    <build_setup>
      <item status="required">Style Dictionary 4.0.0 installed</item>
      <item status="required">Custom transforms registered (`name/css-sando`, `name/css-var-reference`)</item>
      <item status="required">Transform groups registered (ingredients, flavors, recipes)</item>
      <item status="required">Custom formats registered (css, typescript)</item>
    </build_setup>

    <build_execution>
      <item status="required">`pnpm tokens:build` runs without errors</item>
      <item status="required">All 3 layers build in order (Ingredients → Flavors → Recipes)</item>
      <item status="required">Build cache created (`.build-cache.json`)</item>
      <item status="required">CSS output in `dist/sando-tokens/css/`</item>
      <item status="required">TypeScript output in `dist/sando-tokens/ts/`</item>
    </build_execution>

    <output_validation>
      <item status="required">Ingredients use `:root` selector with absolute values</item>
      <item status="required">Flavors use `[flavor="name"]` selector with var() references</item>
      <item status="required">Dark mode wrapped in `@media (prefers-color-scheme: dark)`</item>
      <item status="required">Recipes use `:root` selector with var() references</item>
      <item status="required">TypeScript exports both names and values</item>
    </output_validation>

    <token_tests>
      <item status="required">Token structure tests pass (`pnpm --filter @sando/tokens test:structure`)</item>
      <item status="required">Token reference tests pass (`pnpm --filter @sando/tokens test:references`)</item>
      <item status="required">No broken references in output</item>
    </token_tests>

  </validation>

<related_guidelines id="TBS-RG">
<reference
      type="guideline"
      doc_id="TA"
      file="../01-design-system/TOKEN_ARCHITECTURE.md"
      category="01-design-system">
Three-layer token system rules
</reference>

    <reference
      type="guideline"
      doc_id="TS"
      file="../01-design-system/THEMING_STRATEGY.md"
      category="01-design-system">
      Flavors vs Modes, @media wrapping
    </reference>

    <reference
      type="guideline"
      doc_id="MS"
      file="MONOREPO_STRUCTURE.md"
      category="02-architecture">
      Build order, Turborepo dependencies
    </reference>

    <reference
      type="guideline"
      doc_id="CA"
      file="COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
      Token consumption in components
    </reference>

</related_guidelines>

<external_references id="TBS-ER">
<reference
      type="documentation"
      url="https://styledictionary.com/"
      title="Style Dictionary Documentation">
Configuration, transforms, formats
</reference>

    <reference
      type="repository"
      url="https://github.com/amzn/style-dictionary"
      title="Style Dictionary GitHub">
      Source code, examples
    </reference>

</external_references>

  <changelog id="TBS-CL">
    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="INITIAL">Initial token build system guideline</change>
      <change type="NEW">Documented Style Dictionary 4.0 orchestrator</change>
      <change type="NEW">Custom transforms and formats</change>
      <change type="NEW">Three-layer build sequence</change>
      <change type="NEW">Build caching and incremental builds</change>
      <change type="NEW">Output structure (CSS + TypeScript)</change>
    </version>
  </changelog>

  <conclusion>
    This guideline documents the token build orchestration that generates CSS custom properties and TypeScript files from JSON source tokens. The three-layer build sequence (Ingredients → Flavors → Recipes) is critical for maintaining proper CSS variable references.
  </conclusion>

</guideline>
