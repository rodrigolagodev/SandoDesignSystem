# Changelog

All notable changes to the `prompt-engineer` skill are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this skill adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-01-25

### Added

- **New `workflows/` directory** - Step-by-step guides for common prompting tasks
- **New `templates/` directory** - Reusable prompt templates for different use cases

### Changed

- **Restructured reference documentation** - Split the large `prompting-techniques.md` file into smaller, focused documents for better maintainability and faster loading
- **Improved progressive disclosure** - Main SKILL.md now references modular documents instead of containing all information inline

### Why This Change?

The original structure had a single large reference file. This update follows the skill best practice of:

- Keeping SKILL.md under 500 lines
- Using `references/` for detailed documentation
- Using `workflows/` for step-by-step processes
- Using `templates/` for reusable starting points

---

## [1.0.0] - 2026-01-15

### Added

- **Initial release** of prompt-engineer skill
- **SKILL.md** - Main entry point with core prompting methodology
- **Reference documentation:**
  - `references/prompting-techniques.md` - Comprehensive techniques guide
- **Documentation:**
  - README.md with usage instructions
  - LICENSE (MIT)

### Core Features

- Prompt analysis and weakness detection
- Structured prompt generation from loose ideas
- Professional prompting techniques (few-shot, chain-of-thought, etc.)
- Token efficiency optimization
- English and Spanish language support

### Philosophy

Transform vague ideas and suboptimal prompts into clear, structured instructions that maximize LLM performance.

---

## Roadmap

### Planned for 1.2.0

- [ ] Additional workflow guides
- [ ] Industry-specific templates (marketing, technical, creative)
- [ ] Prompt testing and iteration workflow

### Planned for 2.0.0

- [ ] Advanced techniques (constitutional AI, self-consistency)
- [ ] Model-specific optimization guides
- [ ] Prompt library management
