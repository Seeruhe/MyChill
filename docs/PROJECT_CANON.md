# Project Canon

This file defines stable project rules for Chill FM. It should change rarely and only with explicit human approval.

## Product Identity

Chill FM is an atmospheric AI music frontend centered on jazz hip-hop, lo-fi, archive culture, and retro radio interaction.

The experience should feel like:

- a tactile vintage radio interface
- a late-night jazz-hop listening desk
- an archive terminal for discovering artists, albums, and stories
- a calm interactive space rather than a generic music dashboard

The product should prioritize mood, rhythm, visual restraint, and storytelling over feature density.

## Core Experiences

- The main FM screen is the primary listening experience.
- Music playback must continue across UI transitions whenever possible.
- The launch radio screen is an intentional entry ritual; only the radio should trigger entry.
- The right-side gallery and player controls should remain visually integrated with the radio concept.
- The `3d-album-stack` workspace is a second-screen reading and discovery experience, loaded through an iframe to preserve its own interaction model.
- The AI assistant is an archivist-style helper for artist and music questions, not a generic chatbot.

## Music Direction

The music and content direction is jazz hip-hop first.

Preferred artists and adjacent references include:

- Nujabes
- Shing02
- A Tribe Called Quest
- Digable Planets
- Gang Starr
- Black Star
- MF DOOM / Madvillain
- J Dilla
- jazz rap, boom-bap, lo-fi hip-hop, chillhop, and archive-adjacent instrumental hip-hop

Avoid drifting the catalog toward generic pop unless explicitly requested.

## Visual Direction

The visual language should preserve the existing retro radio / dot-matrix / archive terminal mood.

Preferred qualities:

- tactile controls
- red accent tones
- restrained contrast
- noir or late-night atmosphere
- canvas or dot-matrix display elements
- intentional motion rather than generic animation
- album and musician content presented as curated archive material

Avoid:

- generic SaaS dashboard styling
- default purple gradients
- unrelated futuristic glassmorphism
- excessive metadata panels in places intended to stay minimal
- UI changes that make the experience feel like a template

## Technical Stack

The project uses:

- Vite
- React 19
- TypeScript
- Tailwind CSS via `@tailwindcss/vite`
- `motion`
- `lucide-react`
- npm workspaces

The root package owns dependency installation and the root `package-lock.json`.

`3d-album-stack` is an npm workspace package. Do not add a separate `3d-album-stack/package-lock.json`.

## Architecture Principles

- Prefer incremental refactors over large rewrites.
- Keep behavior stable while extracting modules.
- Preserve iframe isolation for `3d-album-stack` unless the human explicitly approves a deeper integration.
- Keep playback state stable and avoid remounting the playback host during visual UI changes.
- Keep AI provider logic behind `src/services/aiService.ts` unless a backend migration is explicitly planned.
- Prefer local curated content for music stories and metadata; runtime network fetching should be limited and resilient.

## Code Organization Rules

- Shared TypeScript shapes belong in `src/types/`.
- Local curated data belongs in `src/data/`.
- Browser/API helpers belong in `src/lib/`.
- Pure utility helpers belong in `src/utils/`.
- Reusable visual islands belong in `src/components/`.
- `src/App.tsx` may coordinate application-level state, but new standalone UI should not be added there by default.

When reducing `App.tsx`, extract stable UI islands first. Do not split the playback state machine casually.

## AI Rules

- The AI assistant uses LongCat with `LongCat-Flash-Chat` (OpenAI-compatible API at `https://api.longcat.chat/openai/v1`).
- The assistant persona should remain archival, music-aware, and concise.
- Do not hardcode real API keys in source files.
- The current frontend-injected API key pattern is acceptable for local/demo use, but production security should move AI calls to a server boundary.

## Playback Rules

- Playback should start from the beginning when switching tracks intentionally.
- Seeking must only seek within the current track and must not trigger next-track behavior.
- Volume controls must support reliable click and drag interaction.
- Hiding or minimizing UI must not stop playback.
- The player may use YouTube IFrame for full-track playback while keeping the video hidden.

## 3D Album Stack Rules

- Preserve the original interaction pattern: idle stack, first-click preview, second-click full content.
- The stack is a music reading experience, not just decorative cards.
- Cards should use album/music visuals and support article-like musician or album stories.
- Full reading content should remain readable, spacious, and bilingual when supported.
- Keep the stack iframe-isolated unless a future decision explicitly changes this.

## Verification Rules

For code changes, run the relevant checks before claiming completion:

- `npm run lint`
- `npm run build`

For workspace or `3d-album-stack` changes, also run:

- `npm run lint:stack`

If a change affects interaction-heavy UI, prefer a browser/dev-server check when practical.

## Documentation Rules

Documentation is the source of truth for future sessions.

- Update `docs/ARCHITECTURE.md` when module boundaries, data flow, or integration patterns change.
- Update `docs/DECISIONS.md` when an implementation or architecture choice matters beyond the current task.
- Update `docs/CODEBASE_INDEX.md` when important files or directories move.
- Update `docs/memory.md` after completing work so the next session can continue without chat history.

`docs/PROJECT_CANON.md` should only be changed with explicit human permission.
