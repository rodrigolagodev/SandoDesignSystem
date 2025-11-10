<guideline doc_id="VPG" category="06-documentation" version="1.0.0" status="Active" last_updated="2025-11-09" owner="Technical Writer">

  <purpose id="VPG-PU">
    Establish comprehensive standards for writing long-form tutorial and guide documentation in VitePress for the Sando Design System. This includes frontmatter configuration, markdown features, code examples, navigation structure, and content organization to ensure guides are clear, accessible, and maintainable.
  </purpose>

  <targets id="VPG-TGT">
    <target>Getting Started guides, conceptual tutorials, integration guides, accessibility guides</target>
  </targets>

  <scope id="VPG-SC">
    Markdown structure, frontmatter, code blocks, containers, navigation
  </scope>

  <enforcement id="VPG-ENF">
    Documentation review, VitePress build validation
  </enforcement>

<core_rules id="VPG-CR">
<rule id="VPG-CR-R1" title="Frontmatter with Title and Description (Required for SEO)">

<summary>
Every guide page SHOULD include frontmatter with title and description for SEO and social sharing, though VitePress can generate these from content if omitted.
</summary>

      <pattern lang="markdown">
        ---
        title: Page Title for SEO and Browser Tabs
        description: Brief one-sentence description for search engines and social media previews
        ---

        # Main Heading (h1)

        First paragraph starts immediately after heading...
      </pattern>

      <real_example lang="markdown" title="From quick-start.md">
        ---
        title: Quick Start Guide
        description: Get started with Sando Design System in your project with this step-by-step tutorial
        ---

        # Quick Start

        Get started with Sando design tokens in your project.
      </real_example>

      <why>
        Frontmatter title/description improve SEO, control browser tab text, and customize social media preview cards. VitePress uses h1 as fallback if omitted.
      </why>

      <note>
        Frontmatter is OPTIONAL. VitePress will extract title from first h1 and description from first paragraph if frontmatter is missing. Use frontmatter when you need explicit control over SEO metadata.
      </note>

      <reference type="source_file" path="quick-start.md">
        Frontmatter example
      </reference>
      <reference type="external" url="https://vitepress.dev/reference/frontmatter-config">
        VitePress frontmatter docs
      </reference>
    </rule>

    <rule id="VPG-CR-R2" title="Progressive Step-by-Step Structure (Required for Tutorials)">
      <summary>
        Tutorial guides MUST use numbered headings (h2) for sequential steps, creating clear progression from start to finish.
      </summary>

      <pattern lang="markdown">
        # Tutorial Title

        Brief introduction explaining what the user will learn.

        ## Step 1: First Action

        Instructions for the first step...

        ```code
        Example code for step 1
        ```

        ## Step 2: Second Action

        Instructions for the second step...

        ## Step 3: Third Action

        Instructions for the third step...

        ## Next Steps

        Where to go after completing the tutorial.
      </pattern>

      <why>
        Numbered steps provide clear progression. Users can follow along sequentially without getting lost. Next Steps section prevents dead ends.
      </why>

      <reference type="source_file" path="quick-start.md" lines="9-213">
        Complete step-by-step example
      </reference>
    </rule>

    <rule id="VPG-CR-R3" title="VitePress Containers for Contextual Information (Required)">
      <summary>
        Use VitePress custom containers (tip, warning, danger, details) to highlight important information without disrupting reading flow.
      </summary>

      <pattern lang="markdown">
        ::: tip Optional Title
        Helpful information that enhances understanding but isn't critical.
        :::

        ::: warning Important Notice
        Cautionary information the user should be aware of.
        :::

        ::: danger Critical Warning
        Information about potential breaking changes or serious issues.
        :::

        ::: details Click to Expand
        Collapsible content for additional details that some users may want.
        :::
      </pattern>

      <container_types>
        <container type="tip" usage="Helpful hints, best practices, pro tips"/>
        <container type="warning" usage="Important notices, deprecation warnings, prerequisites"/>
        <container type="danger" usage="Breaking changes, critical security issues, destructive actions"/>
        <container type="details" usage="Collapsible extra information, advanced topics, troubleshooting"/>
      </container_types>

      <real_examples>
        <example source="quick-start.md" lines="5-7, 113-115">
          ::: warning Components Coming Soon
          This guide focuses on using Sando's token system. Component examples are provided for future reference but are not yet implemented.
          :::
        </example>

        <example source="accessibility.md">
          tip Touch Target Compliance
          All button sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
        </example>
      </real_examples>

      <why>
        Containers visually differentiate contextual information from main content. Icons and colors draw attention without requiring bold text or excessive formatting.
      </why>

      <reference type="external" url="https://vitepress.dev/guide/markdown#custom-containers">
        VitePress container docs
      </reference>
    </rule>

    <rule id="VPG-CR-R4" title="Code Groups for Multi-Framework Examples (Required)">
      <summary>
        Use VitePress code groups (::: code-group) when showing the same example in multiple languages, frameworks, or tools.
      </summary>

      <pattern lang="markdown">
        ::: code-group

        ```language [Tab Label 1]
        code for option 1
        ```

        ```language [Tab Label 2]
        code for option 2
        ```

        ```language [Tab Label 3]
        code for option 3
        ```

        :::
      </pattern>

      <real_example lang="markdown" title="From quick-start.md">
        ::: code-group

        ```bash [Vite]
        pnpm create vite my-app --template vanilla-ts
        cd my-app
        ```

        ```bash [Next.js]
        pnpm create next-app my-app
        cd my-app
        ```

        :::
      </real_example>

      <when_to_use>
        <use_case>Multiple framework implementations (React, Vue, Angular)</use_case>
        <use_case>Multiple build tool setups (Vite, Webpack, Rollup)</use_case>
        <use_case>Alternative approaches to same task</use_case>
        <use_case>Related files in a project (HTML + TS, CSS + JS)</use_case>
      </when_to_use>

      <why>
        Code groups let users choose their preferred framework/tool without scrolling through irrelevant examples. Tabs save space and improve scannability.
      </why>

      <reference type="source_file" path="quick-start.md" lines="11-23, 52-109">
        Code group examples
      </reference>
      <reference type="external" url="https://vitepress.dev/guide/markdown#code-groups">
        VitePress code groups docs
      </reference>
    </rule>

    <rule id="VPG-CR-R5" title="Inline Code and Syntax Highlighting (Required)">
      <summary>
        Use proper syntax highlighting for all code blocks and inline code formatting for technical terms.
      </summary>

      <inline_code_pattern lang="markdown">
        The `sando-button` component accepts a `variant` property that can be `'solid'`, `'outline'`, or `'ghost'`.

        Install with `pnpm add @sando/components` to get started.
      </inline_code_pattern>

      <code_block_pattern lang="markdown">
        ```language
        code here
        ```
      </code_block_pattern>

      <supported_languages>
        <lang name="html">HTML markup</lang>
        <lang name="css">CSS styles</lang>
        <lang name="typescript" alias="ts">TypeScript code</lang>
        <lang name="javascript" alias="js">JavaScript code</lang>
        <lang name="tsx">React/TypeScript JSX</lang>
        <lang name="jsx">React/JavaScript JSX</lang>
        <lang name="vue">Vue single-file components</lang>
        <lang name="bash" alias="sh">Shell commands</lang>
        <lang name="json">JSON data</lang>
        <lang name="yaml">YAML configuration</lang>
      </supported_languages>

      <why>
        Syntax highlighting improves code readability. Inline code formatting distinguishes technical terms from prose. Proper language tags enable VitePress code features (copy button, line numbers).
      </why>

      <reference type="source_file" path="quick-start.md" lines="13-16, 27-29, 33-45, 167-179">
        Code highlighting examples
      </reference>
      <reference type="external" url="https://vitepress.dev/guide/markdown#syntax-highlighting">
        VitePress markdown docs
      </reference>
    </rule>

</core_rules>

<vitepress_guide_patterns id="VPG-VGP">
<tutorial_structure id="VPG-VGP-TS" lang="markdown">

---

title: Tutorial Title
description: What the user will learn in one sentence

---

      # Tutorial Title

      Brief introduction (1-2 paragraphs) explaining:
      - What the user will build/learn
      - Prerequisites (if any)
      - Estimated time (optional)

      ## Step 1: First Action

      Clear instruction for what to do.

      ```code
      Example code
      ```

      **Result**: What the user should see or expect after this step.

      ## Step 2: Second Action

      Next instruction...

      ## Full Example

      Complete working code showing all steps together.

      ## Troubleshooting

      ### Problem 1
      **Solution**: How to fix it.

      ## Next Steps

      - **[Related Guide](../path)** - Description
      - **[Next Tutorial](../path)** - Description
    </tutorial_structure>

    <conceptual_guide_structure id="VPG-VGP-CGS" lang="markdown">
      ---
      title: Concept Title
      description: Brief explanation of the concept
      ---

      # Concept Title

      Opening paragraph explaining what this concept is and why it matters.

      ## What is [Concept]?

      Detailed explanation with definitions and analogies.

      ## Why Use [Concept]?

      Benefits and use cases:
      - **Benefit 1**: Explanation
      - **Benefit 2**: Explanation

      ## How [Concept] Works

      Technical explanation with code examples.

      ## Common Patterns

      ### Pattern 1
      Description and example.

      ## Best Practices

      - ✅ DO: Recommended approach
      - ❌ DON'T: Anti-pattern to avoid

      ## Related Concepts

      - **[Related Topic](../path)** - How it relates
    </conceptual_guide_structure>

    <integration_guide_structure id="VPG-VGP-IGS" lang="markdown">
      ---
      title: Integration with [Framework/Tool]
      description: How to use Sando with [Framework/Tool]
      ---

      # Integration with [Framework/Tool]

      ## Prerequisites

      - Node.js ≥20.0.0
      - [Framework] ≥[version]

      ## Installation

      ```bash
      pnpm add @sando/components @sando/tokens
      ```

      ## Configuration

      ### Step 1: Setup Config
      ### Step 2: Import Components
      ### Step 3: Use Components

      ## TypeScript Support

      ## Common Patterns

      ## Troubleshooting

      ## Example Project
    </integration_guide_structure>

</vitepress_guide_patterns>

<markdown_features id="VPG-MF">
<internal_links id="VPG-MF-IL" lang="markdown">
[Link Text](/path/to/page)
[Link Text](../relative/path)

      <!-- Links with descriptions -->
      - **[Link Text](/path)** - Brief description

      ## Next Steps

      - **[Theming Guide](/getting-started/theming)** - Learn how to customize
      - **[Token Architecture](/tokens/architecture)** - Understand the system
    </internal_links>

    <external_links id="VPG-MF-EL" lang="markdown">
      [GitHub Repository](https://github.com/user/repo)

      <!-- Open in new tab -->
      [Storybook](https://example.com){target="_blank"}
    </external_links>

    <emoji_conventions id="VPG-MF-EC">
      <emojis>
        <emoji symbol="✅">Checkmark: Completed features, best practices</emoji>
        <emoji symbol="❌">Cross: Anti-patterns, things to avoid</emoji>
        <emoji symbol="⚠️">Warning: Important notices, breaking changes</emoji>
        <emoji symbol="💡">Lightbulb: Tips, ideas, insights</emoji>
        <emoji symbol="📚">Books: Documentation, learning resources</emoji>
        <emoji symbol="🎨">Palette: Design, theming, styling</emoji>
        <emoji symbol="♿">Accessibility: A11y features</emoji>
        <emoji symbol="🔒">Lock: Security, type safety</emoji>
        <emoji symbol="⚡">Lightning: Performance, speed</emoji>
        <emoji symbol="🔧">Wrench: Tools, configuration</emoji>
        <emoji symbol="📝">Memo: Notes, documentation</emoji>
      </emojis>

      <why>
        Emoji add visual interest and help users scan content quickly. Use sparingly for emphasis, not decoration.
      </why>
    </emoji_conventions>

    <lists_and_formatting id="VPG-MF-LAF" lang="markdown">
      <!-- Unordered list -->
      - Item 1
      - Item 2
        - Nested item

      <!-- Ordered list -->
      1. First step
      2. Second step

      <!-- Task list -->
      - [ ] Task not done
      - [x] Task completed

      <!-- Bold and italic -->
      **Bold text** for emphasis
      _Italic text_ for subtle emphasis
      `Code text` for technical terms
    </lists_and_formatting>

    <tables id="VPG-MF-T" lang="markdown">
      | Column 1 | Column 2 | Column 3 |
      | -------- | -------- | -------- |
      | Value A  | Value B  | Value C  |

      <!-- Aligned columns -->
      | Left | Center | Right |
      | :--- | :----: | ----: |
      | L1   |   C1   |    R1 |
    </tables>

</markdown_features>

<navigation_configuration id="VPG-NC">
<sidebar_configuration id="VPG-NC-SC" lang="typescript">
// .vitepress/config.ts
sidebar: {
'/getting-started/': [
{
text: 'Getting Started',
items: [
{ text: 'Introduction', link: '/getting-started/introduction' },
{ text: 'Installation', link: '/getting-started/installation' },
{ text: 'Quick Start', link: '/getting-started/quick-start' },
]
}
],
}
</sidebar_configuration>

    <organization_principles id="VPG-NC-OP">
      <principle>Group related pages under collapsible sections</principle>
      <principle>Use descriptive section titles</principle>
      <principle>Order pages by learning progression (beginner → advanced)</principle>
      <principle>Place overview/introduction pages first</principle>
    </organization_principles>

    <top_navigation id="VPG-NC-TN" lang="typescript">
      nav: [
        { text: "Guide", link: "/getting-started/introduction" },
        { text: "Tokens", link: "/tokens/architecture" },
        { text: "Components", link: "/components/overview" },
        {
          text: "Storybook",
          link: "https://example.com/storybook",
          target: "_blank",
        },
      ]
    </top_navigation>

    <reference type="source_file" path=".vitepress/config.ts" lines="12-76">
      Navigation configuration
    </reference>

</navigation_configuration>

<content_organization id="VPG-CO">
<file_naming id="VPG-CO-FN">
<structure>
apps/site/
├── getting-started/
│ ├── introduction.md # Kebab-case
│ ├── installation.md
│ ├── quick-start.md
│ └── theming.md
├── guides/
│ ├── accessibility.md
│ ├── contributing.md
│ └── flavor-philosophy.md
├── tokens/
│ ├── architecture.md
│ ├── ingredients.md
│ └── flavors.md
└── components/
├── overview.md
└── button.md
</structure>

      <conventions>
        <convention>Use kebab-case for file names</convention>
        <convention>Name matches page title (lowercased, spaces → hyphens)</convention>
        <convention>Use descriptive names (quick-start.md not qs.md)</convention>
        <convention>Group by category in folders</convention>
      </conventions>
    </file_naming>

    <directory_structure id="VPG-CO-DS">
      <categories>
        <category name="getting-started">Onboarding, installation, first steps</category>
        <category name="guides">Conceptual topics, philosophy, best practices</category>
        <category name="tokens">Design token documentation</category>
        <category name="components">Component API reference</category>
        <category name="examples">Complete example projects (optional)</category>
      </categories>

      <why>
        Clear categories help users find content. Mirrors sidebar structure in config.ts.
      </why>
    </directory_structure>

</content_organization>

<writing_guidelines id="VPG-WG">
<tone_and_voice id="VPG-WG-TAV">
<guideline>Clear and Direct: Avoid unnecessary words</guideline>
<guideline>Active Voice: "Import the component" not "The component should be imported"</guideline>
<guideline>Second Person: Address the user as "you"</guideline>
<guideline>Present Tense: "The button renders..." not "The button will render..."</guideline>
<guideline>Inclusive: Use "they/them" for generic users</guideline>
<guideline>Positive: Focus on what to do, not just what to avoid</guideline>
</tone_and_voice>

    <code_examples id="VPG-WG-CE">
      <always_include>
        <item>Complete, working code</item>
        <item>Comments explaining non-obvious parts</item>
        <item>Expected output or result</item>
        <item>Syntax highlighting (proper language tags)</item>
      </always_include>

      <example lang="markdown">
        ```ts
        // Import the component
        import "@sando/components/button";

        // Use in your HTML
        const app = document.querySelector("#app")!;
        app.innerHTML = `
          <sando-button variant="solid">
            Click me
          </sando-button>
        `;

        // Add event listener
        const button = app.querySelector("sando-button")!;
        button.addEventListener("click", () => {
          console.log("Clicked!"); // Output: "Clicked!"
        });
        ```
      </example>

      <why>
        Complete examples reduce confusion. Comments guide understanding. Expected output shows what success looks like.
      </why>
    </code_examples>

    <accessibility_in_documentation id="VPG-WG-AID">
      <guidelines>
        <guideline>Provide alt text for images (when images added)</guideline>
        <guideline>Use semantic headings (h2, h3, not bold text)</guideline>
        <guideline>Write descriptive link text (not "click here")</guideline>
        <guideline>Test documentation with screen readers</guideline>
        <guideline>Ensure code examples are keyboard accessible</guideline>
      </guidelines>

      <example lang="markdown">
        <!-- ❌ BAD -->
        [Click here](../guide) to learn more.

        <!-- ✅ GOOD -->
        [Learn more about theming](../guide)
      </example>
    </accessibility_in_documentation>

</writing_guidelines>

<validation_checklist id="VPG-VC">
<page_structure id="VPG-VC-PS">
<checks>
<check>Frontmatter included (title, description) OR first h1 is descriptive</check>
<check>One h1 heading (page title)</check>
<check>Logical h2/h3 hierarchy (no skipping levels)</check>
<check>Introduction paragraph after h1</check>
<check>Next Steps or Related sections at end</check>
</checks>
</page_structure>

    <content_quality id="VPG-VC-CQ">
      <checks>
        <check>Clear, concise writing in active voice</check>
        <check>Technical terms explained or linked to glossary</check>
        <check>Code examples are complete and working</check>
        <check>Syntax highlighting applied (correct language tags)</check>
        <check>Links use descriptive text (not "click here")</check>
      </checks>
    </content_quality>

    <code_examples id="VPG-VC-CE">
      <checks>
        <check>All code blocks have language tags</check>
        <check>Examples are self-contained and runnable</check>
        <check>Comments explain non-obvious code</check>
        <check>Multi-framework examples use code groups</check>
        <check>Expected output or result documented</check>
      </checks>
    </code_examples>

    <vitepress_features id="VPG-VC-VF">
      <checks>
        <check>Containers used for tips/warnings/danger</check>
        <check>Code groups used for multi-option examples</check>
        <check>Internal links use VitePress routing format</check>
        <check>External links open in new tab (if appropriate)</check>
        <check>Line numbers enabled for long code blocks</check>
      </checks>
    </vitepress_features>

    <navigation id="VPG-VC-NAV">
      <checks>
        <check>Page added to sidebar config (.vitepress/config.ts)</check>
        <check>Sidebar grouping is logical</check>
        <check>File name matches URL pattern (kebab-case)</check>
        <check>Previous/Next navigation makes sense</check>
      </checks>
    </navigation>

    <accessibility id="VPG-VC-A11Y">
      <checks>
        <check>Semantic heading structure (h1 → h2 → h3)</check>
        <check>Link text is descriptive</check>
        <check>Images have alt text (if images present)</check>
        <check>Code examples include keyboard interaction notes</check>
        <check>Tables have proper headers</check>
      </checks>
    </accessibility>

</validation_checklist>

<related_guidelines id="VPG-RG">
<reference type="guideline" doc_id="API" file="./API_REFERENCE.md">
Component API documentation format
</reference>
<reference type="guideline" doc_id="SBS" file="./STORYBOOK_STORIES.md">
Interactive component stories
</reference>
<reference type="guideline" doc_id="CS" file="../03-development/CODE_STYLE.md">
Code example formatting
</reference>
<reference type="guideline" doc_id="WC" file="../04-accessibility/WCAG_COMPLIANCE.md">
Documentation accessibility
</reference>
</related_guidelines>

<external_references id="VPG-ER">
<category name="VitePress Documentation">
<reference url="https://vitepress.dev/guide/what-is-vitepress">VitePress Guide - Official documentation</reference>
<reference url="https://vitepress.dev/guide/markdown">Markdown Extensions - Markdown features</reference>
<reference url="https://vitepress.dev/reference/frontmatter-config">Frontmatter - Page configuration</reference>
<reference url="https://vitepress.dev/reference/default-theme-config">Theme Config - Navigation/sidebar setup</reference>
</category>

    <category name="Markdown">
      <reference url="https://www.markdownguide.org/">Markdown Guide - Basic/extended syntax</reference>
      <reference url="https://commonmark.org/">CommonMark Spec - Markdown specification</reference>
    </category>

    <category name="Writing">
      <reference url="https://developers.google.com/style">Google Developer Docs Style Guide - Technical writing best practices</reference>
      <reference url="https://docs.microsoft.com/en-us/style-guide/">Microsoft Writing Style Guide - Writing for developers</reference>
    </category>

</external_references>

  <changelog id="VPG-CL">
    <version number="1.0.0" date="2025-11-09">
      <change type="NOTE">Initial guideline creation</change>
      <change type="IMPROVED">5 Core Rules: frontmatter, step-by-step structure, containers, code groups, syntax highlighting</change>
      <change type="IMPROVED">VitePress guide patterns: tutorial, conceptual, integration structures</change>
      <change type="IMPROVED">Markdown features: links, emoji, lists, tables</change>
      <change type="IMPROVED">Navigation configuration: sidebar, top nav patterns</change>
      <change type="IMPROVED">Content organization: file naming, directory structure</change>
      <change type="IMPROVED">Writing guidelines: tone, voice, code examples, accessibility</change>
      <change type="IMPROVED">Validation checklist: structure, content, code, VitePress features, navigation, a11y</change>
      <change type="NOTE">References to quick-start.md (lines 9-213), accessibility.md, button.md</change>
      <change type="NOTE">References to .vitepress/config.ts (lines 12-76)</change>
      <change type="NOTE">Agent-optimized XML format for token efficiency</change>
      <change type="NOTE">Great documentation teaches, not just tells. Write guides that empower users to succeed independently.</change>
    </version>
  </changelog>

</guideline>
