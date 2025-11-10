<guideline doc_id="XX" category="01-design-system" version="1.0.0" status="Draft" last_updated="2025-11-09" owner="Role Name">

  <purpose id="XX-PU">
    One-sentence description of what this guideline covers and why it exists for the Sando Design System.
  </purpose>

<core_rules id="XX-CR">

    <rule id="XX-CR-R1" title="Rule 1 Name (Non-Negotiable)">
      <summary>
        Clear, actionable statement of the standard.
      </summary>

      <why>
        Rationale explaining why this standard exists and its importance.
      </why>

      <pattern lang="typescript">
        // ✅ Good - follows the standard
        const goodExample = "example code";
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ Bad - violates the standard
        const badExample = "counter-example";
      </anti_pattern>

      <constraint>
        Specific constraint or limitation that applies to this rule.
      </constraint>

      <exceptions>
        Rare cases where deviation is acceptable (if any).
      </exceptions>
    </rule>

    <rule id="XX-CR-R2" title="Rule 2 Name">
      <summary>
        Another clear, actionable statement.
      </summary>

      <why>
        Why this rule matters for the design system.
      </why>

      <pattern lang="typescript">
        // ✅ Correct approach
        const anotherGoodExample = "proper implementation";
      </pattern>

      <anti_pattern lang="typescript">
        // ❌ Avoid this
        const anotherBadExample = "problematic code";
      </anti_pattern>

      <applicability>
        When and where this rule applies (components, tokens, etc.)
      </applicability>
    </rule>

    <rule id="XX-CR-R3" title="Rule 3 Name">
      <summary>
        Third core rule statement.
      </summary>

      <specification>
        Detailed specification or technical details.
      </specification>

      <pattern lang="json">
        {
          "example": {
            "property": { "value": "correct pattern" }
          }
        }
      </pattern>

      <reference type="guideline" doc_id="TA" file="TOKEN_ARCHITECTURE.md">
        related concept or dependency
      </reference>
    </rule>

</core_rules>

  <standards id="XX-ST">
    <summary>
      Detailed standards and implementation guidelines.
    </summary>

    <rule id="XX-ST-C1" title="Standard Category 1">
      <description>
        Comprehensive explanation of this standard category.
      </description>

      <requirements>
        <requirement type="MUST">Critical requirement that must be followed</requirement>
        <requirement type="SHOULD">Recommended but not mandatory</requirement>
        <requirement type="MAY">Optional enhancement</requirement>
      </requirements>

      <implementation lang="typescript">
        // Complete, production-ready example
        export const properImplementation = () => {
          // Implementation following all standards
        };
      </implementation>

      <explanation>
        Why this solution follows the guidelines and key aspects.
      </explanation>
    </rule>

    <rule id="XX-ST-C2" title="Standard Category 2">
      <description>
        Another standard category explanation.
      </description>

      <pattern lang="typescript" file="example-file.ts">
        // Pattern showing proper usage
        export const example = "implementation";
      </pattern>

      <benefits>
        <benefit name="Benefit 1">Description of advantage</benefit>
        <benefit name="Benefit 2">Description of advantage</benefit>
      </benefits>
    </rule>

  </standards>

<detailed_examples id="XX-DE">

    <use_case id="XX-DE-UC1" title="Use Case 1: Scenario Name">
      <scenario>
        Describe a common real-world situation where this guideline applies.
      </scenario>

      <solution lang="typescript">
        // Complete example demonstrating the guideline
        export const solutionImplementation = () => {
          // Implementation details
        };
      </solution>

      <explanation>
        Why this solution correctly follows the guidelines and what makes it compliant.
      </explanation>
    </use_case>

    <use_case id="XX-DE-UC2" title="Use Case 2: Another Scenario">
      <scenario>
        Another common situation requiring this guideline.
      </scenario>

      <solution lang="typescript">
        // Another complete example
        export const anotherImplementation = () => {
          // Implementation following standards
        };
      </solution>

      <key_aspects>
        <aspect>Important aspect 1 that makes this compliant</aspect>
        <aspect>Important aspect 2 demonstrating the pattern</aspect>
      </key_aspects>
    </use_case>

</detailed_examples>

<anti_patterns id="XX-AP">

<summary>
Common mistakes and patterns to avoid.
</summary>

    <anti_pattern id="XX-AP-1" title="Anti-pattern Name">
      <problem>
        What makes this an anti-pattern and why it's problematic.
      </problem>

      <bad_example lang="typescript">
        // ❌ DON'T DO THIS
        const badPattern = "problematic code";
      </bad_example>

      <why_wrong>
        Specific issues this creates (performance, maintainability, breaks theming, etc.)
      </why_wrong>

      <correct_approach lang="typescript">
        // ✅ CORRECT APPROACH
        const goodPattern = "proper implementation";
      </correct_approach>
    </anti_pattern>

    <anti_pattern id="XX-AP-2" title="Another Anti-pattern">
      <problem>
        Description of the anti-pattern and its consequences.
      </problem>

      <bad_example lang="typescript">
        // ❌ AVOID
        const anotherBadPattern = "code to avoid";
      </bad_example>

      <why_wrong>
        Explanation of why this violates guidelines.
      </why_wrong>

      <correct_approach lang="typescript">
        // ✅ BETTER
        const betterApproach = "improved code";
      </correct_approach>
    </anti_pattern>

</anti_patterns>

  <validation id="XX-V">

    <automated_validation>
      <summary>
        How to automatically check compliance with this guideline.
      </summary>

      <command>
        pnpm run validate:guideline-name
      </command>

      <checks>
        <check>Specific validation criteria 1</check>
        <check>Specific validation criteria 2</check>
        <check>Specific validation criteria 3</check>
      </checks>
    </automated_validation>

    <manual_checklist>
      <summary>
        When reviewing code/designs manually, verify:
      </summary>

      <item status="required">Checklist item 1</item>
      <item status="required">Checklist item 2</item>
      <item status="recommended">Checklist item 3</item>
      <item status="optional">Checklist item 4</item>
    </manual_checklist>

    <common_issues>
      <issue title="Issue Name">
        <description>Description of common violation</description>
        <detection>How to spot this issue</detection>
        <fix>How to correct it</fix>
      </issue>
    </common_issues>

  </validation>

<integration_points id="XX-IP">

    <for_agents>
      <summary>
        How agents should use this guideline.
      </summary>

      <usage>
        <agent name="agent-name-1">How they use it and when to reference</agent>
        <agent name="agent-name-2">How they use it and when to reference</agent>
        <agent name="agent-name-3">How they use it and when to reference</agent>
      </usage>

      <reference_pattern>
        Reference `.claude/guidelines/[category]/[this-file].md` for:
        - Key aspect 1
        - Key aspect 2
        - Key aspect 3
      </reference_pattern>
    </for_agents>

    <for_skills>
      <summary>
        How skills should reference this guideline.
      </summary>

      <usage>
        <skill name="skill-name-1">Usage scenario and context</skill>
        <skill name="skill-name-2">Usage scenario and context</skill>
      </usage>

      <enforcement>
        When [performing task], follow:
        - `.claude/guidelines/[category]/[this-file].md`
        - Specific section reference
      </enforcement>
    </for_skills>

    <for_commands>
      <summary>
        How slash commands should use this guideline.
      </summary>

      <usage>
        <command name="/command-name-1">How it uses guideline for validation</command>
        <command name="/command-name-2">How it uses guideline for analysis</command>
      </usage>

      <analysis_pattern>
        Analyze compliance with:
        - `.claude/guidelines/[category]/[this-file].md`
        - Report deviations from [specific standards]
      </analysis_pattern>
    </for_commands>

</integration_points>

<migration_guide id="XX-MG">

<summary>
If this guideline introduces changes to existing patterns.
</summary>

    <from_to>
      <old_approach lang="typescript">
        // Previous implementation
        const oldApproach = "deprecated pattern";
      </old_approach>

      <new_approach lang="typescript">
        // Current standard
        const newApproach = "updated pattern";
      </new_approach>
    </from_to>

    <migration_steps>
      <step number="1">Step to identify old pattern</step>
      <step number="2">Step to refactor to new pattern</step>
      <step number="3">Step to validate the change</step>
      <step number="4">Step to test the migration</step>
    </migration_steps>

    <breaking_changes>
      List any breaking changes introduced by this guideline version.
    </breaking_changes>

    <backward_compatibility>
      How to maintain compatibility during transition period.
    </backward_compatibility>

</migration_guide>

<related_guidelines id="XX-RG">
<reference
      type="guideline"
      doc_id="TA"
      file="TOKEN_ARCHITECTURE.md"
      category="01-design-system">
How this guideline relates (dependencies, complementary concepts, etc.)
</reference>

    <reference
      type="guideline"
      doc_id="CS"
      file="COLOR_SYSTEM.md"
      category="01-design-system">
      Another related guideline relationship
    </reference>

    <reference
      type="source_file"
      path="packages/tokens/src/ingredients/color.json">
      Reference to source code implementation
    </reference>

</related_guidelines>

<external_references id="XX-ER">
<reference
      type="documentation"
      url="https://example.com/docs"
      title="External Documentation">
Description of why this external resource is relevant
</reference>

    <reference
      type="standard"
      url="https://example.com/standard"
      title="Industry Standard">
      Relevant sections or concepts from this standard
    </reference>

    <reference
      type="tool"
      url="https://example.com/tool"
      title="Tool Documentation">
      Related configuration or usage
    </reference>

    <reference
      type="article"
      url="https://example.com/article"
      title="Research Article">
      Background reading or theoretical foundation
    </reference>

</external_references>

<tooling_support id="XX-TS">

    <eslint_rules>
      <summary>ESLint rules that enforce this guideline</summary>
      <config lang="json">
        {
          "rules": {
            "rule-name": ["error", { "option": "value" }]
          }
        }
      </config>
    </eslint_rules>

    <typescript_config>
      <summary>TypeScript configuration supporting this guideline</summary>
      <config lang="json">
        {
          "compilerOptions": {
            "option": "value"
          }
        }
      </config>
    </typescript_config>

    <custom_scripts>
      <script name="validate-guideline" command="pnpm run validate:guideline-name">
        Script to enforce or validate this guideline
      </script>
    </custom_scripts>

</tooling_support>

  <faq id="XX-FAQ">

    <question id="XX-FAQ-Q1">
      <q>Common question about this guideline?</q>
      <a>Answer providing clarity on confusion points or edge cases.</a>
    </question>

    <question id="XX-FAQ-Q2">
      <q>Another frequent question?</q>
      <a>Answer addressing common concerns or misunderstandings.</a>
    </question>

    <question id="XX-FAQ-Q3">
      <q>Question about exceptions or special cases?</q>
      <a>Answer explaining when and how rules can be adapted.</a>
    </question>

  </faq>

  <changelog id="XX-CL">

    <version number="1.0.0" date="2025-11-09" status="Active">
      <change type="INITIAL">Initial release of guideline</change>
      <change type="NEW">Standard 1 established</change>
      <change type="NEW">Standard 2 defined</change>
      <change type="NEW">Examples and patterns added</change>
    </version>

    <version number="0.9.0" date="2025-11-01" status="Draft">
      <change type="DRAFT">Initial draft of standards</change>
      <change type="DRAFT">Examples under review</change>
      <change type="DRAFT">Seeking feedback from team</change>
    </version>

  </changelog>

  <approval id="XX-APR">
    <approved_by>Design System Team</approved_by>
    <approval_date>2025-11-09</approval_date>
    <review_cycle>Quarterly</review_cycle>
    <next_review>2025-02-09</next_review>
  </approval>

  <contributing id="XX-CON">
    <summary>
      To propose changes to this guideline:
    </summary>

    <process>
      <step number="1">Open a discussion with rationale for the change</step>
      <step number="2">Draft proposed modifications using this template</step>
      <step number="3">Get review from relevant stakeholders:
        - design-system-architect (architecture changes)
        - ui-designer (design-related changes)
        - qa-expert (quality/testing changes)
        - technical-writer (documentation clarity)
      </step>
      <step number="4">Update version number following semantic versioning</step>
      <step number="5">Document in changelog</step>
      <step number="6">Update affected agents/skills/commands</step>
    </process>

    <versioning>
      <rule>MAJOR: Breaking changes that require agent updates</rule>
      <rule>MINOR: New sections or standards added</rule>
      <rule>PATCH: Clarifications or typo fixes</rule>
    </versioning>

  </contributing>

  <metadata id="XX-META">
    <guideline_owner>Role/Person responsible for maintaining this</guideline_owner>
    <last_reviewed>2025-11-09</last_reviewed>
    <applies_to>
      <target>agents</target>
      <target>skills</target>
      <target>commands</target>
    </applies_to>
  </metadata>

</guideline>
