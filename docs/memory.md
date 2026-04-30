active_area: repository cleanup
current_task: Remove redundant AGENTS_final.md from the public repository.
relevant_files:
  - AGENTS_final.md
  - docs/memory.md
assumptions:
  - The project uses Groq, not Grok, for the AI assistant.
  - Groq calls should be server-side because the repo is public and frontend bundles are inspectable.
done:
  - Added the Nujabes/Shing02 Luv(sic) sequence to the local track catalog.
  - Replaced mojibake Chinese labels in App and IntroOverlay with readable Chinese.
  - Reduced Home layout padding, player width, gallery height, gallery card size, and right carousel footprint.
  - Changed the Home layer to overflow hidden to avoid visible vertical scrollbars.
  - Applied a compact Home stage scale, reduced the main radio width, tightened radio screen/body spacing, and narrowed the right gallery footprint.
  - Linked the project to Vercel project `chill-fm`.
  - Added `vercel.json` so Vercel uses the Vite framework, `npm run build`, `npm install`, and `dist`.
  - Added `GROQ_API_KEY` to the Vercel production environment without printing the secret.
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
  - Confirmed no tracked source file contains a real `gsk_` key.
  - Confirmed the previous Vite config injected `GROQ_API_KEY` into the frontend bundle, creating production exposure risk.
  - Added `api/ask-artist.js` as the server-side Groq/Llama route.
  - Updated the route to Vercel's Web Standard `POST(request)` function style after the first production deploy returned an early platform error.
  - Updated `src/services/groqService.ts` so the browser calls `/api/ask-artist` instead of Groq directly.
  - Removed `GROQ_API_KEY` injection from the root Vite config.
  - Removed the unused `GEMINI_API_KEY` injection from the 3D stack Vite config as additional hardening.
  - Updated `.env.example` to mark `GROQ_API_KEY` as server-only.
  - Updated README to note that local AI API testing should use `vercel dev --listen 3000`.
  - Rewrote mojibake `AGENTS.md` with the current backend Groq boundary.
  - Removed stale Gemini key instructions from the stack README and env example.
  - Pushed the backend security migration to GitHub in commits `e359f73` and `eea8ac2`.
  - User chose to ignore Vercel deployment for now and only require the GitHub/frontend exposure risk to be addressed.
  - Synced the user's remote README update without modifying it.
  - Removed redundant `AGENTS_final.md`; `AGENTS.md` and `docs/` are the active collaboration docs.
in_progress:
  - none
blockers:
  - Vercel production may still be serving the older deployment until redeployed.
  - The previously used Groq key should still be rotated because an old frontend deployment and chat history may have exposed it.
next_step: Push the `AGENTS_final.md` deletion to GitHub.
