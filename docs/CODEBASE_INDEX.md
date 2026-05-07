# Codebase Index

- `src/App.tsx`: Main Chill FM shell, playback state, canvas visualizer, gallery coordination, queue, story, AI modal, and artist panel.
- `src/components/IntroOverlay.tsx`: Centered radio launch overlay.
- `src/components/StackScreen.tsx`: Second-screen iframe wrapper for `3d-album-stack`, including the mini player overlay and stack theme toggle.
- `src/components/gallery/MusicGalleryItem.tsx`: Vertical gallery album card.
- `src/components/gallery/galleryConstants.ts`: Shared gallery sizing constants.
- `src/data/musicLibrary.ts`: Local track and artist catalog.
- `src/lib/dotMatrix.ts`: Dot-matrix segment map and canvas text drawing helper.
- `src/lib/youtubeIframeApi.ts`: YouTube IFrame API script loader and window typing.
- `src/services/aiService.ts`: Browser-side assistant request wrapper that calls `/api/ask-artist`.
- `src/types/music.ts`: Shared music-related types.
- `src/utils/time.ts`: Time formatting helper.
- `api/ask-artist.js`: Vercel serverless route for LongCat (OpenAI-compatible) calls and server-only `LONGCAT_API_KEY` access.
- `3d-album-stack/`: Workspace package for the independent 3D album reading experience loaded by iframe; receives parent theme messages via `postMessage`.
- `scripts/build-with-stack.mjs`: Builds the stack workspace, copies it to public assets, then builds Chill FM.
- `package.json`: Root app package and npm workspace owner for `3d-album-stack`.
