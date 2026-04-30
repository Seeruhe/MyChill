# Decisions

## 2026-04-26: Incremental App.tsx Refactor

Decision: Extract stable data, types, utility helpers, YouTube loader, gallery card, intro overlay, and stack iframe screen into focused modules while leaving the playback state machine in `App.tsx`.

Reason: `App.tsx` had grown beyond 1500 lines. The safest first pass is to move low-coupling code without changing user-facing behavior.

Impact: Future changes to catalog data, gallery cards, intro UI, and stack screen routing can be made in smaller files. Playback behavior remains centralized for now.

## 2026-04-26: npm Workspace Dependency Layout

Decision: Convert `3d-album-stack` into an npm workspace managed by the Chill FM root package.

Reason: Both projects are Vite/React apps with repeated dependencies and duplicated lockfiles. Workspaces allow dependency hoisting and one root lockfile while preserving the iframe-based runtime boundary.

Impact: Dependency installation should be run from the repository root. Build scripts now call `npm --workspace 3d-album-stack run build`; `3d-album-stack/package-lock.json` is intentionally removed.

## 2026-04-26: Layered Screen Routing

Decision: Replace the previous `200vw` horizontal stage with independent Home and Stack screen layers.

Reason: The shared horizontal layout allowed Home's minimum height and background to affect the Stack page, causing visual bleed and iframe positioning issues. A fixed Stack overlay preserves page independence while keeping the playback host mounted.

Impact: `screenIndex` now controls opacity, transform, pointer events, and z-index instead of translating a shared two-screen flex track. Music playback remains uninterrupted because the player host stays mounted in the App tree.

## 2026-04-26: Stack Theme Messaging

Decision: Add Stack page light/dark mode through parent-to-iframe `postMessage` instead of direct DOM access or iframe reloads.

Reason: The 3D album stack remains iframe-isolated, so theme state should cross the boundary through an explicit message contract. This preserves stack scroll position, card preview/full state, and interaction continuity.

Impact: `StackScreen` owns the light/dark toggle and sends `{ type: "STACK_THEME", theme }`; `3d-album-stack` listens for that message and applies `data-theme` to its root wrapper.

## 2026-04-30: Server-Side Groq Boundary

Decision: Move Groq/Llama assistant calls from the Vite frontend bundle to the Vercel serverless API route `/api/ask-artist`.

Reason: The previous Vite `define` configuration injected `GROQ_API_KEY` into browser JavaScript at build time. That is acceptable only for quick demos, not for a public production deployment.

Impact: `src/services/groqService.ts` now sends artist questions to the local API route. `api/ask-artist.js` reads `GROQ_API_KEY` server-side, builds the archivist prompt, calls Groq, and returns only the assistant answer to the browser.

Follow-up hardening: Remove unused frontend AI-key injection from the `3d-album-stack` Vite config as well, so future environment variables are not accidentally bundled into the iframe app.
