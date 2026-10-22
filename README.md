# Abdulla Khan — Portfolio

Published at https://abdulakhan9132.github.io/ with GitHub Pages.

The root contains the deployable static build. Editable React/Vite source, original profile data, optimized portfolio assets, tests, and exact ThreeUI sources are in `.portfolio-source/`.

```sh
cd .portfolio-source
npm ci
npm test
npm run dev
npm run build
```

Copy `.portfolio-source/dist/` contents to the repository root to publish an updated build. Keep `.nojekyll` in place. No paid hosting or external account is required.

The portfolio contains four supplied UI project collections and 25 graphic pieces. The ThreeUI hero, paper, glass controls and required binary assets are recorded in `threeui-sources.json`; the build verifies all 17 registered hashes. UI UX Pro Max is installed at `.agents/skills/ui-ux-pro-max/SKILL.md` with its scripts and design data.

The original registered sources stay byte-exact. The paper is personalized at build time with Abdulla's design profile and forwards wheel and touch scrolling to the parent page. The contact section uses a native glass-styled email action with no GPT branding. Third-party notices are available in `/licenses/`.
