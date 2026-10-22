# Abdulla Khan — Portfolio

React + Vite portfolio featuring the ThreeUI Living Green scene, a personalized 3D design profile, four supplied UI projects and 25 graphic pieces.

## Run

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Preview: http://127.0.0.1:5174/. Deploy the contents of dist to the existing abdulakhan9132.github.io repository.

- src/main.jsx: portfolio and native dialog interactions.
- src/portfolio.css: responsive layout and reduced-motion behavior.
- src/portfolio-assets.json: imported project and graphic catalog.
- data.js: original profile, contact and career data.
- src/shaders and public/landing-pages: unchanged registered ThreeUI source.
- threeui-sources.json: all 17 verified source and binary hashes.
- scripts/verify-threeui.mjs: source-integrity check, also runs before build.
- scripts/prepare-portfolio-assets.py: regenerate optimized public/portfolio assets from the supplied BG folders (Python + Pillow). Originals are never modified.

The 17 registered ThreeUI files remain byte-exact on disk. Portfolio content and the requested card removal are applied to the live hero DOM. The Vite content plugin uses src/personalize-paper.js to replace the sample award certificate text with Abdulla's design profile without changing the original shaders or source files. Wheel and vertical touch events pass from the sandboxed paper to the page, so scrolling continues through the scene. Contact uses a native glass-styled email link; no GPT or AI service is presented.

The previous portfolio is backed up under output. Existing Caseform source remains in assets/projects/caseform.
