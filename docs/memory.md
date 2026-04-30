active_area: app metadata and publishing
current_task: Rename the app to MyChill and prepare GitHub publishing.
relevant_files:
  - src/App.tsx
  - vercel.json
  - src/components/IntroOverlay.tsx
  - src/components/gallery/galleryConstants.ts
  - src/data/musicLibrary.ts
assumptions:
  - Home should avoid internal/browser vertical scrolling on common desktop viewport heights by using a more compact layout.
  - Vercel production builds should use npm workspaces and output the root `dist` directory.
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
in_progress:
  - none
blockers: none
next_step: Commit and push this memory update if desired.
