# AGENTS.md

## Purpose
This repository is designed to support long-term, scalable development with Codex.  
The goal is to keep context stable across sessions by separating persistent rules, architectural knowledge, decisions, and short-term task state.

## Working Rule
Before making any change, read the relevant documentation in `docs/` first.  
Do not rely on chat history as the source of truth when the repository already contains documentation.  
Follow the Default Reading Order below unless the task is clearly scoped to a single file.

---

## Documentation Layers

### 1. `docs/PROJECT_CANON.md`
Read this first.  
Use it for stable project rules that rarely change, such as:
- product goal
- business rules
- naming conventions
- engineering principles
- tech stack choices
- coding standards

### 2. `docs/ARCHITECTURE.md`
Read this after `PROJECT_CANON.md`.  
Use it for system structure, including:
- module boundaries
- data flow
- service responsibilities
- integration patterns
- layering rules

### 3. `docs/DECISIONS.md`
Read this when a task may affect architecture, behavior, or implementation direction.  
Use it for recorded decisions with:
- date
- decision
- reason
- impact

### 4. `docs/CODEBASE_INDEX.md`
Read this when locating relevant files or understanding repository layout.  
Use it as a map of:
- entry points
- core modules
- important services
- key files
- major routes/components

### 5. `docs/memory.md`
Read this before continuing an existing task.  
Use it only for current working state. Always write in this exact format:

```
active_area: [file or module name]
current_task: [one sentence description]
relevant_files:
  - [file path]
assumptions:
  - [assumption made during execution]
done:
  - [completed item]
in_progress:
  - [item currently being worked on]
blockers: [description, or "none"]
next_step: [one concrete action]
```

---

## Default Reading Order
When starting a task, follow this order:
1. `docs/PROJECT_CANON.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DECISIONS.md`
4. `docs/CODEBASE_INDEX.md`
5. `docs/memory.md`
6. the task-relevant source files

---

## Execution Mode
Mode: incremental

Rules:
- Implement in small steps.
- Validate after each step.
- Update `docs/memory.md` after each step when continuing a task.

---

## Implementation Rules
- Prefer existing patterns over inventing new ones.
- Keep changes focused on the requested task.
- Avoid cross-module coupling unless it is already part of the design.
- Do not rewrite architecture unless the task explicitly requires it.
- Do not duplicate business logic.
- Any change to existing logic must not break passing tests. Run the relevant test suite before marking done.
- New functionality requires accompanying tests unless the task explicitly states otherwise.

---

## When to Stop and Ask
Pause and request clarification before proceeding if:
- The task description is ambiguous and multiple interpretations would lead to meaningfully different implementations.
- Completing the task requires modifying files outside the identified minimal file set, or spans more than two modules not already connected by the existing design.
- The documented architecture in `docs/ARCHITECTURE.md` conflicts with the task requirements.
- `docs/` contains contradictory information relevant to the task.

Do not proceed on assumptions for any of the above. State what is unclear and wait for a response.

---

## Anti-Drift Rule
If implementation deviates from `docs/PROJECT_CANON.md`, `docs/ARCHITECTURE.md`, or `docs/DECISIONS.md`, you must:
- stop
- explain the conflict
- propose options
- wait for confirmation

---

## Protected Paths
Do not modify the following unless the task explicitly names them as targets:
- `.env` and `.env.*` files
- `migrations/` — already-executed migration files
- `docs/PROJECT_CANON.md` — only the human should update this

When in doubt about whether a file is protected, ask before editing.

---

## Update Rules
After finishing work:
- update `docs/memory.md` with the current state using the format defined above
- update `docs/DECISIONS.md` if a meaningful architectural or implementation choice was made
- update `docs/ARCHITECTURE.md` if module boundaries or data flow changed
- update `docs/CODEBASE_INDEX.md` if file locations or module structure changed

---

## Definition of Done
A task is complete only when:
- the requested behavior is implemented
- related code paths remain consistent
- the change matches the documented architecture
- existing tests pass; new tests are added if required
- no unintended side effects exist on behavior outside the task scope
- the repository documentation reflects the new state
- the next session can continue without re-explaining the project

---

## Notes for This Repository
Keep this file short.  
Use `docs/` for long-form guidance.  
Use `docs/memory.md` for short-term progress only.  
Treat the documentation as the source of truth for project context.
