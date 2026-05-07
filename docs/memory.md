active_area: repository cleanup
current_task: Remove redundant AGENTS_final.md from the public repository.
relevant_files:
  - AGENTS_final.md
  - docs/memory.md
assumptions:
  - The project uses LongCat (Meituan) for the AI assistant.
  - LongCat calls must stay server-side because the repo is public and frontend bundles are inspectable.
done:
  - Added the Nujabes/Shing02 Luv(sic) sequence to the local track catalog.
  - Replaced mojibake Chinese labels in App and IntroOverlay with readable Chinese.
  - Reduced Home layout padding, player width, gallery height, gallery card size, and right carousel footprint.
  - Changed the Home layer to overflow hidden to avoid visible vertical scrollbars.
  - Applied a compact Home stage scale, reduced the main radio width, tightened radio screen/body spacing, and narrowed the right gallery footprint.
  - Linked the project to Vercel project `chill-fm`.
  - Added `vercel.json` so Vercel uses the Vite framework, `npm run build`, `npm install`, and `dist`.
  - Deployed production to `https://chill-fm.vercel.app`.
  - Verified the deployed homepage returns HTTP 200 and Vercel inspect reports Ready.
  - Checked Vercel project error logs for the last hour; no logs were found.
  - Added `chillfm.dev` to the Vercel project `chill-fm`.
  - Vercel reports `chillfm.dev` is not configured yet because DNS still needs `A chillfm.dev 76.76.21.21` at the domain provider, or Vercel nameservers.
  - Removed the Home gallery card's black bottom gradient overlay, inset ring, dark wrapper background, and inactive black shadow.
  - Kept a lighter warm active-card shadow so the active cover still has depth without a black transparent block.
  - Removed the screenshot capture feature, screenshot state/ref/handler/button, and `html2canvas` dependency.
  - Enlarged the Now Playing track title and status text, using the freed control-row space.
  - Renamed the root Vite HTML title, 3D stack HTML title, and app metadata name to `MyChill`.
  - Verified the old `My Google AI Studio App` title no longer appears outside generated or source output.
  - Initialized a local git repository on branch `main`.
  - Added generated build outputs and local deployment/config secrets to `.gitignore`.
  - Created the first local commit `cb5092d Initial MyChill app`.
  - Installed GitHub CLI `gh` via winget.
  - GitHub CLI authenticated successfully as `ryanyeong`.
  - Created the public GitHub repository `ryanyeong/MyChill`.
  - Added `origin` as `https://github.com/ryanyeong/MyChill.git`.
  - Pushed local `main` to `origin/main`.
  - Verified with npm run lint and npm run build.
  - Verified with `rg` that `MyChill` is present in source and generated HTML titles.
  - Verified the GitHub repo with `gh repo view ryanyeong/MyChill`.
  - Confirmed no tracked source file contains a real provider API key.
  - Established the server-side AI boundary: `api/ask-artist.js` is the only place that touches a provider API key, and the browser only talks to `/api/ask-artist`.
  - Updated the route to Vercel's Web Standard `POST(request)` function style after the first production deploy returned an early platform error.
  - Removed AI provider key injection from the root Vite config to enforce the server-side boundary.
  - Removed the unused `GEMINI_API_KEY` injection from the 3D stack Vite config as additional hardening.
  - Updated `.env.example` to document the server-only AI provider key.
  - Updated README to note that local AI API testing should use `vercel dev`.
  - Rewrote mojibake `AGENTS.md` with the current backend AI boundary.
  - Removed stale Gemini key instructions from the stack README and env example.
  - Pushed the backend security migration to GitHub in commits `e359f73` and `eea8ac2`.
  - User chose to ignore Vercel deployment for now and only require the GitHub/frontend exposure risk to be addressed.
  - Synced the user's remote README update without modifying it.
  - Removed redundant `AGENTS_final.md`; `AGENTS.md` and `docs/` are the active collaboration docs.
  - 2026-05-07: Wired the AI archivist to LongCat (`LongCat-Flash-Chat`) via the OpenAI-compatible endpoint `https://api.longcat.chat/openai/v1/chat/completions`; `api/ask-artist.js` reads `LONGCAT_API_KEY` (with optional `LONGCAT_API_URL`, `LONGCAT_MODEL` overrides).
  - 2026-05-07: Established `src/services/aiService.ts` as the browser-side AI wrapper (provider-neutral); the import in `src/App.tsx` points at it.
  - 2026-05-07: Updated `.env.example` to document `LONGCAT_API_KEY`.
  - 2026-05-07: Added `LONGCAT_API_KEY` to the Vercel production environment via stdin and redeployed. Production AI route returns 200 from `https://chill-fm-ashy.vercel.app/api/ask-artist`.
  - 2026-05-07: Local dev runs on `vercel dev --listen 0.0.0.0:43000`.
  - 2026-05-07: Synced `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CODEBASE_INDEX.md`, and `docs/PROJECT_CANON.md` to reference LongCat throughout.
  - 2026-05-08: Removed stale production deployment snapshots from Vercel; only the latest GitHub-triggered deployment remains.
in_progress:
  - none
blockers:
  - The current LongCat key was shared in chat plaintext during setup; rotate it from the LongCat console if exposure is a concern, then `vercel env rm LONGCAT_API_KEY production` and re-add.
next_step: none.
