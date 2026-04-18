# agentrealm

**Agentless sandbox workspaces for AI agents**

[![npm](https://img.shields.io/npm/v/agentrealm.svg)](https://www.npmjs.com/package/agentrealm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/node/v/agentrealm)](package.json)

---

## What is a realm?

A **realm** is a lightweight, agentless sandbox workspace for AI agents.

In a traditional agent workspace, one agent permanently guards the space — it's always watching, always running. A realm is different: **no agent lives there**. Any AI agent (or human) can enter when needed, do focused work, and leave. When the work is complete, simply delete the realm or keep it archived.

Think of it as a shared project folder with built-in structure, a context loader, and a work diary — designed to be understood and entered by any agent without prior knowledge of the project.

### Agent Workspace vs Realm

| | Agent Workspace | Realm |
|---|---|---|
| Persistent agent | ✅ Always watching | ❌ Agentless |
| Entry model | One dedicated agent | Any agent |
| Context loading | Agent-managed | `realm prompt <name>` |
| Lifecycle | Ongoing | Scoped → delete when done |
| Use case | Long-lived assistant | Focused task or project |
| Overhead | High | Low |

---

## Install

```bash
npm i -g agentrealm
```

Three binary aliases installed: `realm` (primary), `agentrealm`, `agent-realm`.

---

## Quick Start

```bash
# Create a new realm
realm new my-project

# Load context into an agent session
realm prompt my-project

# Copy context to clipboard (then paste into your agent)
realm prompt my-project --copy

# List all realms
realm ls

# Add a diary entry
realm diary my-project "Finished the API integration, tests passing"

# When you're done, you can delete the realm or leave it archived
# realm rm my-project --purge
```

---

## Commands

| Command | Description |
|---------|-------------|
| `realm new <name> [--dir <path>] [--with-diary]` | Create a new realm |
| `realm ls` | List realms |
| `realm cd <name>` | Print realm directory (`cd $(realm cd foo)`) |
| `realm prompt <name>` | Build context bundle — stdout, clipboard, or file |
| `realm rm <name> [--purge] [--yes]` | Remove from registry; `--purge` deletes directory |
| `realm diary <name> [message]` | Append diary entry or open in `$EDITOR` |
| `realm skill` | Print path to bundled SKILL.md |

### `realm prompt` options

```
--memory          Include MEMORY.md if present
--diary <date>    Include historical diary file (YYYY-MM-DD)
--diaries-list    List available archived diaries
--copy            Copy output to clipboard
--out <file>      Write output to file
```

---

## Realm File Structure

```
~/realms/my-project/
├── INDEX.md        # Read order + quick load instructions
├── REALM.md        # Purpose, rules, and context
├── TOOLS.md        # Tool checklist for this realm
├── DIARY.md        # Rolling work log (optional: --with-diary)
├── MEMORY.md       # Accumulated knowledge (manual, optional)
└── diaries/        # Archived diary files (auto-rotated at 200 lines)
    └── 2026-04-18.md
```

The **registry** lives at `~/.realm.yml`:

```yaml
version: 1
realms:
  my-project:
    dir: /Users/you/realms/my-project
    created: 2026-04-18T08:55:00.000Z
    description: ""
```

---

## Why "agentless" matters

When an AI agent enters a workspace, it usually needs to know a lot of context to be useful: what's the purpose? What tools are available? What's been tried before? This typically lives in the agent's memory or a long system prompt.

With realms, **the context travels with the workspace** — not the agent. Run `realm prompt my-project` and any agent instantly has everything it needs. Agents stay stateless and interchangeable. Realms stay self-describing.

This unlocks:
- **Multi-agent collaboration** — different models for different subtasks, no coordination overhead
- **Resume from anywhere** — any agent, any session, full context in seconds
- **Clean boundaries** — one realm per project, sealed when done, archived forever

---

## AgentSkill Integration

`agentrealm` ships a bundled [AgentSkill](https://openclaw.ai/skills) that tells agents how to use realms:

```bash
realm skill    # prints path to skill/SKILL.md
```

Register it with your agent system to make realm-entry automatic.

---

## MIT License

Copyright (c) 2026 Exis. See [LICENSE](LICENSE).
