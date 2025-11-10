<guideline doc_id="GW" category="03-development" version="1.1.0" status="Active" last_updated="2025-11-09" owner="DevOps Automation Engineer">

  <purpose id="GW-PU">
    Establishes conventional commits, changesets-based versioning, branching strategy, pull request process, and automated release workflow for the Sando Design System monorepo following GitHub Flow principles.
  </purpose>

<core_rules id="GW-CR">

    <rule id="GW-CR-R1" title="Conventional Commits (Non-Negotiable)">
      <summary>
        ALL commits MUST follow the Conventional Commits specification.
      </summary>

      <pattern lang="bash">
        # ✅ CORRECT
        git commit -m "feat(components): add sando-button component"
        git commit -m "fix(tokens): correct contrast ratios in dark mode"
        git commit -m "docs(storybook): update button usage examples"
      </pattern>

      <anti_pattern lang="bash">
        # ❌ WRONG
        git commit -m "added button"
        git commit -m "fixed bug"
        git commit -m "update docs"
      </anti_pattern>

      <why>
        Conventional commits enable automated changelog generation, semantic versioning, and clear project history. The format is machine-parseable for CI/CD pipelines and changesets integration.
      </why>

      <reference type="specification" url="https://www.conventionalcommits.org/">
        Conventional Commits Spec
      </reference>
    </rule>

    <rule id="GW-CR-R2" title="Changesets for Versioning (Non-Negotiable)">
      <summary>
        Every PR with public API changes MUST include a changeset.
      </summary>

      <pattern lang="bash">
        # Create changeset (interactive CLI)
        pnpm changeset

        # Example changeset file (.changeset/cool-pandas-jump.md):
        # ---
        # "@sando/components": minor
        # ---
        #
        # Add sando-button component with solid/outline/ghost variants
      </pattern>

      <anti_pattern lang="bash">
        # ❌ WRONG: Manual version bumps in package.json
        # Never manually edit version fields - changesets handles this
      </anti_pattern>

      <why>
        Changesets automate semantic versioning across the monorepo, manage interdependencies between packages, and generate accurate changelogs. Manual versioning creates inconsistencies and breaks automated releases.
      </why>

      <reference type="documentation" url="https://github.com/changesets/changesets">
        Changesets Documentation
      </reference>
    </rule>

    <rule id="GW-CR-R3" title="Branch Naming Convention (Non-Negotiable)">
      <summary>
        Branch names MUST follow the pattern: `type/description`
      </summary>

      <pattern lang="bash">
        # ✅ CORRECT
        git checkout -b feat/button-component
        git checkout -b fix/token-contrast-ratios
        git checkout -b docs/api-reference
        git checkout -b refactor/flavor-mixin
      </pattern>

      <anti_pattern lang="bash">
        # ❌ WRONG
        git checkout -b button
        git checkout -b fix-bug
        git checkout -b my-feature-123
      </anti_pattern>

      <why>
        Consistent branch naming enables automated CI workflows, improves repository navigation, and provides context at a glance. The pattern mirrors conventional commit types for clarity.
      </why>
    </rule>

    <rule id="GW-CR-R4" title="Pull Request Validation (Non-Negotiable)">
      <summary>
        All PRs MUST pass CI checks and receive 1+ approval before merge.
      </summary>

      <ci_checks_required>
        <check>Tests (unit + E2E + a11y)</check>
        <check>Lint (ESLint + Prettier)</check>
        <check>Build (all packages)</check>
        <check>Type checking (TypeScript strict mode)</check>
      </ci_checks_required>

      <pr_title>Must follow conventional commit format</pr_title>

      <pr_template lang="markdown">
        feat(components): add sando-button component

        ## Summary
        - Implements solid, outline, ghost variants
        - Supports all standard sizes (sm, md, lg)
        - Full WCAG 2.1 AA compliance

        ## Test Plan
        - [x] Unit tests (Vitest)
        - [x] E2E tests (Playwright)
        - [x] Accessibility tests (axe-core)
      </pr_template>

      <anti_pattern lang="markdown">
        # ❌ WRONG: Generic title
        Add button

        No description or test plan provided.
      </anti_pattern>

      <why>
        Automated validation catches issues early, reduces manual review burden, and ensures consistent quality. Meaningful descriptions provide context for reviewers and future maintainers.
      </why>
    </rule>

    <rule id="GW-CR-R5" title="Release Process (Non-Negotiable)">
      <summary>
        Releases MUST follow the 4-step changesets workflow.
      </summary>

      <workflow>
        <step number="1">Create changeset for each PR</step>
        <step number="2">Version packages (when ready to release)</step>
        <step number="3">Build all packages</step>
        <step number="4">Publish to NPM</step>
      </workflow>

      <pattern lang="bash">
        # 1. Create changeset for each PR
        pnpm changeset

        # 2. Version packages (when ready to release)
        pnpm version-packages

        # 3. Build all packages
        pnpm build

        # 4. Publish to NPM
        pnpm release
      </pattern>

      <anti_pattern lang="bash">
        # ❌ WRONG: Manual npm publish
        npm publish packages/components
        # Skips validation, breaks monorepo dependencies, no changelog
      </anti_pattern>

      <why>
        The changesets workflow ensures semantic versioning, dependency coordination across packages, changelog generation, and atomic releases. Manual publishing breaks these guarantees.
      </why>
    </rule>

</core_rules>

<conventional_commits id="GW-CC">

    <commit_types>
      <type name="feat" triggers="Minor version" scope_examples="components, tokens, build">
        New features
      </type>
      <type name="fix" triggers="Patch version" scope_examples="accessibility, theming, build">
        Bug fixes
      </type>
      <type name="docs" triggers="No version bump" scope_examples="storybook, site, api, readme">
        Documentation only
      </type>
      <type name="refactor" triggers="No version bump" scope_examples="mixin, styles, types">
        Code changes (no behavior)
      </type>
      <type name="perf" triggers="Patch version" scope_examples="bundle, render, tokens">
        Performance improvements
      </type>
      <type name="test" triggers="No version bump" scope_examples="unit, e2e, a11y">
        Test additions/changes
      </type>
      <type name="chore" triggers="No version bump" scope_examples="deps, ci, tooling">
        Maintenance tasks
      </type>
      <type name="style" triggers="No version bump" scope_examples="prettier, eslint">
        Code style/formatting
      </type>
      <type name="build" triggers="Patch version" scope_examples="vite, turbo, style-dictionary">
        Build system changes
      </type>
      <type name="ci" triggers="No version bump" scope_examples="github-actions, workflows">
        CI configuration changes
      </type>
    </commit_types>

    <scopes>
      <package_level>
        <scope name="components">@sando/components</scope>
        <scope name="tokens">@sando/tokens</scope>
        <scope name="docs">@sando/docs (Storybook)</scope>
        <scope name="site">@sando/site (VitePress)</scope>
      </package_level>

      <feature_level>
        <scope>button, input, card - Specific components</scope>
        <scope>theming, accessibility, build - Cross-cutting concerns</scope>
      </feature_level>
    </scopes>

    <breaking_changes>
      <format>Add `BREAKING CHANGE:` in commit body or `!` after type</format>

      <pattern lang="bash">
        # ✅ CORRECT: Breaking change notation
        git commit -m "feat(components)!: remove deprecated size prop

        BREAKING CHANGE: The 'size' prop has been removed. Use 'variant' instead.
        Migration: Replace size='large' with variant='lg'
        "
      </pattern>

      <triggers>Major version bump</triggers>
    </breaking_changes>

</conventional_commits>

<changesets_workflow id="GW-CSW">

    <when_to_create>
      <create_changeset_when>
        <item>Component public API (props, events, slots, CSS parts, methods)</item>
        <item>Token values or structure</item>
        <item>Build output or distribution format</item>
        <item>Peer dependency requirements</item>
      </create_changeset_when>

      <skip_changeset_when>
        <item>Documentation (Storybook stories, VitePress guides)</item>
        <item>Internal implementation (no API changes)</item>
        <item>Test files</item>
        <item>Development tooling</item>
      </skip_changeset_when>
    </when_to_create>

    <creating_changesets>
      <command>pnpm changeset</command>

      <prompts>
        <prompt number="1">Select packages to version (space to select, enter to confirm)</prompt>
        <prompt number="2">Select bump type (major/minor/patch)</prompt>
        <prompt number="3">Enter summary (appears in CHANGELOG.md)</prompt>
      </prompts>

      <example_changeset file=".changeset/cool-pandas-jump.md" lang="yaml">
        ---
        "@sando/components": minor
        "@sando/tokens": patch
        ---
        Add sando-button component

        - Implements solid, outline, ghost variants
        - Adds button Recipe tokens
        - Full keyboard navigation support
      </example_changeset>
    </creating_changesets>

    <semantic_versioning>
      <bump_type type="major">
        <when>Breaking changes (API removal, behavior change)</when>
        <example>Remove deprecated prop, change default value</example>
      </bump_type>

      <bump_type type="minor">
        <when>New features (backward compatible)</when>
        <example>Add new component, add new prop</example>
      </bump_type>

      <bump_type type="patch">
        <when>Bug fixes (backward compatible)</when>
        <example>Fix accessibility issue, correct token value</example>
      </bump_type>

      <reference type="specification" url="https://semver.org/">
        Semantic Versioning
      </reference>
    </semantic_versioning>

</changesets_workflow>

<github_flow id="GW-GHF">

<summary>
Sando Design System follows GitHub Flow - a lightweight, branch-based workflow designed for frequent deployments and rapid iteration.
</summary>

    <core_philosophy>
      <principle number="1">Master is always deployable - Every commit to `master` is production-ready</principle>
      <principle number="2">Feature branches are short-lived - Merge within 3 days to avoid drift</principle>
      <principle number="3">Pull requests are the unit of work - All changes go through PR review</principle>
      <principle number="4">Deploy frequently - Continuous deployment from `master`</principle>
      <principle number="5">Delete branches after merge - Keep repository clean and navigable</principle>
    </core_philosophy>

    <branch_lifecycle>
      <step number="1">Create branch from up-to-date `master`</step>
      <step number="2">Commit frequently with conventional commit messages</step>
      <step number="3">Open PR early for feedback and visibility</step>
      <step number="4">CI validates tests, lint, build automatically</step>
      <step number="5">Code review ensures quality (1+ approval required)</step>
      <step number="6">Merge to master triggers automated deployment</step>
      <step number="7">Delete branch automatically after merge</step>
    </branch_lifecycle>

    <short_lived_branches>
      <rule>Feature branches MUST be merged within **3 days** of creation</rule>

      <why>
        <reason>Reduces merge conflicts - Less drift from master</reason>
        <reason>Encourages small changes - Forces atomic, focused PRs</reason>
        <reason>Faster feedback loops - Issues discovered and fixed quickly</reason>
        <reason>Continuous integration - Code integrates early and often</reason>
      </why>

      <good_scope>
        <example>feat/add-button-hover-state (can finish in 2 days)</example>
        <example>fix/dropdown-keyboard-nav (can finish in 1 day)</example>
        <example>refactor/extract-focus-mixin (can finish in 2 days)</example>
      </good_scope>

      <too_large>
        <example>feat/form-system (takes 2 weeks)</example>
        <example>refactor/modernize-codebase (takes 1 week)</example>
        <example>feat/v2-api-redesign (takes 2 weeks)</example>
      </too_large>

      <how_to_split>
        <method>Break into phases - Ship incrementally behind feature flags</method>
        <method>Use draft PRs - Get early feedback on architecture</method>
        <method>Create tracking issues - Coordinate multi-PR features</method>
        <method>Merge frequently - Even incomplete work if not exposed to users</method>
      </how_to_split>
    </short_lived_branches>

    <deployable_master>
      <rule>Every commit to `master` MUST be production-ready</rule>

      <enforcement>
        <mechanism>Branch protection - Direct pushes to `master` blocked</mechanism>
        <mechanism>Required CI checks - Tests, lint, build must pass</mechanism>
        <mechanism>Code review - 1+ approval required (even for solo developers)</mechanism>
        <mechanism>Automated deployment - Successful merge triggers deploy to production</mechanism>
      </enforcement>

      <deployable_patterns>
        <pattern>feat(components): add sando-button with full test coverage</pattern>
        <pattern>fix(tokens): correct contrast ratio calculation</pattern>
        <pattern>refactor(button): extract focus styles to mixin</pattern>
      </deployable_patterns>

      <non_deployable_anti_patterns>
        <anti_pattern>feat(components): add button component (WIP)</anti_pattern>
        <anti_pattern>fix(tokens): temporary fix, tests failing</anti_pattern>
        <anti_pattern>refactor(build): update config (breaks production build)</anti_pattern>
      </non_deployable_anti_patterns>

      <incomplete_features_handling>
        <technique>Use feature flags - Disable incomplete work in production</technique>
        <technique>Keep code private - Don't export unfinished components</technique>
        <technique>Document status - Mark as `@experimental` in docs</technique>
        <technique>Test in isolation - Ensure existing features still work</technique>
      </incomplete_features_handling>
    </deployable_master>

    <branch_auto_delete>
      <rule>Feature branches MUST be deleted immediately after merge</rule>

      <why>
        <reason>Reduces clutter - Keep branch list clean and navigable</reason>
        <reason>Signals completion - Deleted branch = work is merged</reason>
        <reason>Prevents confusion - No stale branches with ambiguous status</reason>
        <reason>Encourages fresh starts - Each new feature starts from current master</reason>
      </why>

      <automation setting="GitHub Settings → Pull Requests">
        Automatically delete head branches after merge
      </automation>

      <manual_cleanup lang="bash">
        # Delete local branch after merge
        git branch -d feat/button-component

        # Delete remote branch (if auto-delete disabled)
        git push origin --delete feat/button-component

        # Prune stale remote-tracking branches
        git fetch --prune
      </manual_cleanup>

      <exception>
        Long-lived branches for major versions (e.g., `v1`, `v2`) - these are NOT feature branches and should never be deleted.
      </exception>
    </branch_auto_delete>

    <deployment_workflow>
      <trigger>Every merge to `master` automatically deploys to production</trigger>

      <automated_steps>
        <step number="1">Merge PR - Squash and merge to `master`</step>
        <step number="2">CI builds - Tokens → Components → Storybook → VitePress</step>
        <step number="3">Deploy to GitHub Pages - Automated deployment with health checks</step>
        <step number="4">Version PR creation - Changesets bot creates release PR (if changesets present)</step>
      </automated_steps>

      <rollback_strategy lang="bash">
        # Revert specific commit
        git revert <commit-sha>
        git push origin master

        # Creates new commit that undoes changes
        # Triggers re-deployment automatically
      </rollback_strategy>

      <why_cd_works>
        <reason>Small changes - Low risk per deployment</reason>
        <reason>Fast feedback - Issues caught in minutes, not days</reason>
        <reason>Easy rollback - `git revert` undoes problematic changes</reason>
        <reason>Automated testing - CI catches issues before production</reason>
      </why_cd_works>
    </deployment_workflow>

    <reference type="guide" url="https://guides.github.com/introduction/flow/">
      GitHub Flow Guide
    </reference>

</github_flow>

<branching_strategy id="GW-BS">

    <main_branch name="master">
      <protection>
        <rule>No direct commits (PR required)</rule>
        <rule>CI checks must pass</rule>
        <rule>1+ approval required</rule>
        <rule>Up-to-date with base branch</rule>
      </protection>
    </main_branch>

    <feature_branches>
      <lifecycle>Create → Work → PR → Merge → Delete</lifecycle>

      <types>
        <type name="feat/*">New features (components, tokens, capabilities)</type>
        <type name="fix/*">Bug fixes (accessibility, rendering, tokens)</type>
        <type name="docs/*">Documentation (Storybook, VitePress, inline)</type>
        <type name="refactor/*">Code improvements (no behavior change)</type>
        <type name="perf/*">Performance optimization</type>
        <type name="test/*">Test additions (unit, E2E, a11y)</type>
        <type name="chore/*">Maintenance (deps, tooling, CI)</type>
      </types>

      <examples>
        <example>feat/button-component</example>
        <example>fix/dark-mode-contrast</example>
        <example>docs/theming-guide</example>
        <example>refactor/flavor-mixin</example>
        <example>perf/bundle-size</example>
        <example>test/keyboard-navigation</example>
        <example>chore/upgrade-lit-3.3</example>
      </examples>
    </feature_branches>

</branching_strategy>

<pull_request_guidelines id="GW-PRG">

    <title_format>type(scope): description</title_format>

    <title_examples>
      <example>feat(components): add sando-button component</example>
      <example>fix(tokens): correct contrast ratios in dark mode</example>
      <example>docs(storybook): update theming examples</example>
    </title_examples>

    <description_template lang="markdown">
      ## Summary

      [Brief description of changes and motivation]

      ## Changes

      - [Bullet point list of specific changes]
      - [Component API additions/modifications]
      - [Token changes]

      ## Test Plan

      - [ ] Unit tests pass (pnpm test)
      - [ ] E2E tests pass (pnpm test:e2e)
      - [ ] Accessibility tests pass (axe-core)
      - [ ] Manual testing completed
      - [ ] Storybook stories added/updated

      ## Changeset

      - [ ] Changeset created (if public API changes)
      - [ ] Breaking changes documented (if major bump)

      ## Screenshots/Videos

      [Visual changes if applicable]
    </description_template>

    <ci_validation>
      <check>Tests: pnpm test (Vitest unit + Playwright E2E)</check>
      <check>Lint: pnpm lint (ESLint + Prettier check)</check>
      <check>Build: pnpm build (all packages)</check>
      <check>Types: tsc --noEmit (TypeScript strict mode)</check>
    </ci_validation>

    <review_process>
      <step number="1">Author: Create PR with changeset and description</step>
      <step number="2">CI: Automated checks run (tests, lint, build)</step>
      <step number="3">Reviewer: 1+ approval required</step>
      <step number="4">Merge: Squash and merge to master</step>
      <step number="5">Cleanup: Delete feature branch automatically</step>
    </review_process>

</pull_request_guidelines>

<release_process id="GW-RP">

    <step_1 title="Create Changesets (Per PR)">
      <command>pnpm changeset</command>
      <actions>
        <action>Select affected packages</action>
        <action>Choose bump type (major/minor/patch)</action>
        <action>Write summary</action>
      </actions>
    </step_1>

    <step_2 title="Version Packages (When Ready)">
      <command>pnpm version-packages</command>
      <operations>
        <operation>Reads all changesets in .changeset/</operation>
        <operation>Bumps package.json versions</operation>
        <operation>Updates CHANGELOG.md files</operation>
        <operation>Deletes consumed changesets</operation>
        <operation>Commits changes</operation>
      </operations>
    </step_2>

    <step_3 title="Build and Validate">
      <commands>
        <command>pnpm build</command>
        <command>pnpm test</command>
        <command>ls packages/components/dist</command>
        <command>ls packages/tokens/dist</command>
      </commands>
    </step_3>

    <step_4 title="Publish to NPM">
      <command>pnpm release</command>
      <operations>
        <operation>Builds all packages (pnpm build)</operation>
        <operation>Publishes to NPM (changeset publish)</operation>
        <operation>Creates git tags</operation>
        <operation>Pushes tags to remote</operation>
      </operations>
    </step_4>

    <workflow_diagram>
      [Changesets Created] → [version-packages] → [Build] → [Publish]
             (per PR)           (when ready)      (validate)  (to NPM)
               ↓                     ↓                ↓           ↓
          .changeset/           package.json      dist/      npm registry
          cool-pandas.md        version bumped    built      + git tags
    </workflow_diagram>

    <reference type="guide" url="https://turbo.build/repo/docs/handbook/publishing-packages">
      Turborepo Publishing Packages
    </reference>

</release_process>

<related_guidelines id="GW-RG">
<reference
      type="guideline"
      doc_id="MS"
      file="../02-architecture/MONOREPO_STRUCTURE.md"
      category="02-architecture">
Package organization and dependencies
</reference>

    <reference
      type="guideline"
      doc_id="CST"
      file="CODE_STYLE.md"
      category="03-development">
      TypeScript and formatting standards
    </reference>

    <reference
      type="guideline"
      doc_id="TST"
      file="TESTING_STRATEGY.md"
      category="03-development">
      Test requirements and coverage
    </reference>

    <reference
      type="guideline"
      doc_id="CA"
      file="../02-architecture/COMPONENT_ARCHITECTURE.md"
      category="02-architecture">
      Component file structure
    </reference>

</related_guidelines>

<external_references id="GW-ER">
<reference
      type="specification"
      url="https://www.conventionalcommits.org/"
      title="Conventional Commits">
Commit message specification
</reference>

    <reference
      type="documentation"
      url="https://github.com/changesets/changesets"
      title="Changesets">
      Version management tool
    </reference>

    <reference
      type="specification"
      url="https://semver.org/"
      title="Semantic Versioning">
      Versioning specification
    </reference>

    <reference
      type="guide"
      url="https://turbo.build/repo/docs/handbook/publishing-packages"
      title="Turborepo Publishing">
      Monorepo publishing guide
    </reference>

    <reference
      type="guide"
      url="https://guides.github.com/introduction/flow/"
      title="GitHub Flow">
      Branching workflow
    </reference>

</external_references>

  <changelog id="GW-CL">
    <version number="1.1.0" date="2025-11-09" status="Active">
      <change type="IMPROVED">Migrated to XML format for LLM optimization</change>
      <change type="IMPROVED">Added structured IDs for all sections</change>
      <change type="NEW">GitHub Flow Principles section</change>
      <change type="NEW">Core philosophy: deployable master, short-lived branches</change>
      <change type="NEW">Branch lifecycle workflow</change>
      <change type="NEW">Short-lived feature branches rule (3 days)</change>
      <change type="NEW">Always deployable master principle</change>
      <change type="NEW">Branch auto-delete requirement</change>
      <change type="NEW">Deployment workflow and rollback strategy</change>
    </version>

    <version number="1.0.0" date="2025-11-03" status="Active">
      <change type="INITIAL">Initial guideline created</change>
      <change type="NEW">Conventional commits standard</change>
      <change type="NEW">Changesets workflow</change>
      <change type="NEW">Branch naming convention</change>
      <change type="NEW">Pull request validation</change>
      <change type="NEW">4-step release process</change>
    </version>

  </changelog>

  <conclusion>
    Consistent Git workflow enables automated versioning and releases across the monorepo. GitHub Flow principles ensure master is always deployable through short-lived branches, continuous integration, and automated deployment.
  </conclusion>

</guideline>
