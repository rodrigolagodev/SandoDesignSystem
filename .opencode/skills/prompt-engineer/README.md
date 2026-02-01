# Prompt Engineer

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/standard-Agent%20Skills-orange.svg)](https://agentskills.io)

> Expert system for analyzing, optimizing, and improving prompts to maximize LLM performance.

---

## Overview

The **prompt-engineer** skill transforms vague ideas and suboptimal prompts into clear, structured instructions that produce better results with LLMs.

**Key capabilities:**
- Analyze prompts for weaknesses and improvement opportunities
- Structure loose ideas into optimized prompts
- Apply professional prompting techniques (few-shot, chain-of-thought, etc.)
- Format for token efficiency without sacrificing quality
- Support for English and Spanish

---

## Installation

```bash
git clone https://github.com/rodrigolagodev/prompt-engineer.git ~/.config/opencode/skills/prompt-engineer
```

---

## Quick Start

**Interactive mode:**
```
User: "Tengo estas ideas sueltas, ayúdame a crear un prompt"
Agent: [Asks clarifying questions, then generates optimized prompt]
```

**Quick optimization:**
```
User: "Mejora este prompt: escribe código"
Agent: [Analyzes, asks context questions, delivers optimized version]
```

---

## Workflow

```
1. User provides prompt/ideas
         ↓
2. Analyze for gaps and weaknesses
         ↓
3. Ask clarifying questions
         ↓
4. Apply optimization techniques
         ↓
5. Present optimized prompt
         ↓
6. Offer: explanation / comparison / save to .md
```

---

## Project Structure

```
prompt-engineer/
├── SKILL.md                           # Main skill file
├── README.md                          # This file
├── CHANGELOG.md                       # Version history
├── LICENSE                            # MIT License
│
├── references/                        # Reference documentation
│   ├── prompting-techniques.md        # Core techniques overview
│   ├── few-shot-examples.md           # Few-shot prompting patterns
│   ├── chain-of-thought.md            # CoT and reasoning techniques
│   └── token-optimization.md          # Efficiency guidelines
│
├── templates/                         # Reusable prompt templates
│   ├── code-generation.md             # Programming prompts
│   ├── content-creation.md            # Writing and creative prompts
│   └── analysis-prompts.md            # Data and code analysis
│
└── workflows/                         # Step-by-step guides
    ├── optimize-existing-prompt.md    # Improve a prompt you have
    ├── create-from-scratch.md         # Build a new prompt
    └── iterative-refinement.md        # Test and improve cycle
```

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| Context is King | More context = better results |
| Optimized for LLMs | Format for maximum comprehension |
| Token Efficiency | Fewer tokens, same quality |
| Hierarchical Structure | General → specific organization |
| Explicit Instructions | Say exactly what to do |
| Examples > Rules | Few-shot beats long explanations |

---

## Example

**Before:**
```
write code for a website
```

**After:**
```
Create a personal portfolio website using React.

## Requirements
- Single page application with smooth scrolling
- Responsive design (mobile-first)

## Sections
1. Hero - Name, title, brief intro
2. About - Professional background
3. Projects - Grid with screenshots and links
4. Contact - Email form

## Tech Stack
- React 18 + Tailwind CSS

## Deliverables
- Component structure
- Clean, commented code
```

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Created by <strong>Rodrigo Lago</strong> for the Agent Skills community
</p>
