# Index — {{name}}

> **This is a realm** — an agentless sandbox workspace. No agent permanently guards this space.
> Any agent may enter, work, and leave. When the work is done, seal the realm.

## Read Order

When entering this realm, load files in this order:

1. **REALM.md** — Purpose, rules, and context for this realm
2. **TOOLS.md** — Tool checklist and constraints for work in this realm
3. **DIARY.md** — Rolling work log (if present)
4. **MEMORY.md** — Accumulated knowledge (if present)

## Quick Load

```bash
realm prompt {{name}}
```

This command bundles the above files into a single context block ready to paste into an agent session.

## About Realms

Unlike an agent workspace (where a dedicated agent is always watching), realms are **agentless**.
They are shared collaboration spaces — any AI agent or human can enter, contribute, and leave.

Use `realm seal {{name}}` when the work is done.
