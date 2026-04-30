# Architecture

Chill FM is a Vite + React single page app with a second isolated 3D album screen served from the `3d-album-stack` npm workspace.

## Main App Flow

- `src/main.tsx` mounts React.
- `src/App.tsx` owns the main runtime state: playback, theme, language, layered screen routing, gallery selection, artist panels, and AI modal state.
- `src/services/groqService.ts` owns Groq/Llama assistant calls.
- `3d-album-stack` is built as an npm workspace and copied into the main static output by `scripts/build-with-stack.mjs`.
- The root `package.json` owns dependency installation and the single root `package-lock.json`.

## Module Boundaries

- `src/types/` stores shared TypeScript shapes.
- `src/data/` stores local curated music and artist catalog data.
- `src/lib/` stores browser/API helpers that are not React components.
- `src/utils/` stores small pure helpers.
- `src/components/` stores reusable UI islands extracted from `App.tsx`.

## Integration Rules

- Keep the YouTube playback host mounted outside collapsed UI so playback continues while the radio is hidden.
- Keep the 3D album stack in an iframe to preserve its own interaction model.
- Home and Stack are independent layered screens, not a shared horizontal `200vw` layout. Home may stay mounted for playback continuity, while Stack appears as a fixed overlay.
- Stack theme changes are coordinated from the parent `StackScreen` to the iframe via `postMessage` with `type: "STACK_THEME"`; the iframe owns its own CSS theme rendering.
- Use npm workspaces for dependency sharing; do not add a separate `3d-album-stack/package-lock.json`.
- Prefer small extractions from `App.tsx` over large state-management rewrites until the player logic is isolated intentionally.
