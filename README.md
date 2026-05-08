# BeyonDegrees.ai — UI/UX

Mobile-first UI prototype for BeyonDegrees.ai — an AI-powered academic guidance platform helping students discover their best-fit disciplines, majors, and universities.

---

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- No framework. No build tool. Open any `.html` file directly in a browser.

---

## Folder Structure

```
BeyonDegrees-UI/
│
├── design-system/          # Design tokens, base styles, component styles
│   ├── tokens.css          # Color, spacing, typography variables
│   ├── base.css            # Reset + global styles
│   ├── layout.css          # Device frame, desktop container
│   ├── animations.css      # Shared animation keyframes
│   ├── components/         # Reusable UI component styles
│   └── docs/               # Design system documentation pages
│
├── features/               # All product screens
│   ├── onboarding/
│   │   ├── home/           # About Me / home tab
│   │   └── loading/        # Quiz result loading screen
│   ├── quiz/
│   │   └── quiz-card/      # 30-question quiz interface
│   ├── discipline/
│   │   ├── match/          # Discipline match results + Academic DNA radar
│   │   ├── detail/         # Per-discipline detail pages
│   │   └── why/            # Why I match explanation
│   ├── major/
│   │   ├── recommendations/ # Major recommendations list
│   │   └── detail/         # Major detail page
│   ├── university/
│   │   └── matches/        # University match results
│   ├── results/
│   │   └── match-reveal/   # Animated match reveal screen
│   └── profile/
│       ├── overview/       # Student profile overview
│       ├── edit/           # Edit profile
│       └── settings/       # App settings
│
├── shared/
│   └── scripts/            # Shared JavaScript utilities
│
└── data/                   # CSV data exports (disciplines, majors)
```

---

## How to Run

No installation required.

```bash
# Option 1 — Open directly
Open any index.html file in a browser

# Option 2 — Local server (recommended to avoid CORS issues)
npx serve .
# Then visit: http://localhost:3000
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `master` | Stable delivery branch — only leader merges from `dev` |
| `dev` | Active development — accepts PRs from `feature/` branches |
| `feature/name` | Individual feature work — PR into `dev` when complete |

---

## Team

**BeyonDegrees.ai — UI/UX Team**
