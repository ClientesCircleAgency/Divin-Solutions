# Phase 4 - Performance and Visual QA

Status: In progress.

Objective: make the upgraded website smooth, lightweight and visually stable before the final SEO, PT/EN and Hostinger launch work.

## Progress

| Block | Scope | Status | Notes |
| --- | --- | --- | --- |
| 4.1 Asset and build audit | Validate final asset paths, public asset weight and production build | Done | 70 `asset(...)` references exist. `public/assets` is about 23.57 MB. Build passes. |
| 4.2 Video payload audit | Keep only production videos in `public` | Done | Only the four final 10s hero videos remain in `public`; each is about 0.94 MB to 1.66 MB. |
| 4.3 Responsive/layout QA | Check desktop/tablet/mobile for overflow, clipped cards and text breaks | Done for first-view routes | Chrome headless screenshots regenerated for Home, Supply, Civil, Accommodations, About and Privacy. About mobile card clipping fixed. |
| 4.4 Motion and reduced-motion QA | Confirm scroll/video motion is smooth and disabled when users prefer reduced motion | In progress | Reduced-motion CSS exists. Final videos are light. Remaining check: manual scroll pass through deep sections in browser. |
| 4.5 Final launch-readiness pass | Build, route checks, asset hygiene, deploy notes | In progress | Build passes. Main routes return 200 on preview. Deploy notes still pending. |

## Key Routes To QA

- `/`
- `/construction-supply`
- `/civil-construction`
- `/accommodations-industrial-support`
- `/about-us`
- `/privacy-policy`
- `/cookies-policy`
- `/terms-and-conditions`

## Current Technical Baseline

- Build command: `npm run build`
- Dev URL: `http://127.0.0.1:5173/`
- Main JS bundle: about 434 KB before gzip, about 132 KB gzip
- Main CSS bundle: about 169 KB before gzip, about 29 KB gzip
- Final hero videos in production public folder:
  - `home-hero-final-10s.mp4`
  - `supply-hero-final-10s.mp4`
  - `civil-hero-final-10s.mp4`
  - `accommodations-hero-final-10s.mp4`

## Latest Validation

- `npm run build` passes.
- Preview route checks return 200 for `/`, `/construction-supply`, `/civil-construction`, `/accommodations-industrial-support`, `/about-us`, `/privacy-policy`, `/cookies-policy` and `/terms-and-conditions`.
- Final screenshot set is stored in `qa-screenshots/phase-4/final-pass-clean/`.
- Public production videos:
  - `home-hero-final-10s.mp4` - about 1.29 MB
  - `supply-hero-final-10s.mp4` - about 1.41 MB
  - `civil-hero-final-10s.mp4` - about 1.66 MB
  - `accommodations-hero-final-10s.mp4` - about 0.94 MB

## Next Actions

1. Do a manual scroll pass through deep sections in browser, because previous issues were below the hero.
2. Fix any remaining deep-section spacing or card issues found in that pass.
3. Prepare deployment notes for the later SEO, PT/EN and Hostinger phase.
