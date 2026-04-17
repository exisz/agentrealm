---
name: agentrealm
version: 0.1.0
description: Enter and work within agentless realm workspaces
triggers:
  - realm
  - agentrealm
  - agentless workspace
  - sandbox workspace
install: npm i -g agentrealm
---

# AgentSkill: agentrealm

## What is a Realm?

A **realm** is an agentless sandbox workspace. Unlike an agent workspace where a dedicated agent
permanently guards the space, realms are ephemeral collaboration zones. Any agent can enter,
work, and leave. Realms are sealed when the work is done.

## When This Skill Applies

Use this skill when:
- You are asked to work in a realm
- You see a `REALM.md` file in a directory
- A user says "enter the realm" or "work in realm X"

## Entering a Realm

When entering a realm, load its full context first:

```bash
realm prompt <name>
```

This outputs the bundled INDEX.md + REALM.md + TOOLS.md + DIARY.md (if present) as a single
context block. Paste it into your session or use `--copy` to get it on the clipboard.

## Working in a Realm

1. Read REALM.md — understand the purpose and rules
2. Read TOOLS.md — know what tools are available
3. Read DIARY.md — understand recent progress and context
4. Do your work
5. **Before leaving:** if the realm has a DIARY.md, log a brief note:
   ```bash
   realm diary <name> "Brief note: what you did, what's next"
   ```

## Leaving / Sealing

- Leave freely — no cleanup required beyond a diary note
- Seal when the work is fully done: `realm seal <name>`

## Common Commands

| Command | Description |
|---------|-------------|
| `realm new <name>` | Create a new realm |
| `realm prompt <name>` | Load realm context |
| `realm ls` | List active realms |
| `realm diary <name> "msg"` | Log a diary entry |
| `realm seal <name>` | Seal a completed realm |
| `realm cd <name>` | Get realm directory path |

## Finding This Skill

```bash
realm skill
```

Prints the absolute path to this file.
