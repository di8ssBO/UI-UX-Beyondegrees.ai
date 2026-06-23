/* ─────────────────────────────────────────────────────────────────
   BeyonDegrees.ai — Loading Screen Data
   Shared between mobile and desktop loading screens.

   window.BD_DNA_SCHEDULE  — DNA bar targets & timing (identical on both)
   window.BD_PHASES        — 5 analysis phases
     mobile  → use phase.i18nLabel / phase.i18nTitle via t()
     desktop → use phase.label    / phase.title    directly
   ───────────────────────────────────────────────────────────────── */

window.BD_DNA_SCHEDULE = [
  { disc: 'kt', ico: '💻', name: 'Engineering & Tech',  target: 78, start:  2.0 },
  { disc: 'yt', ico: '🩺', name: 'Health & Medicine',   target: 45, start:  4.5 },
  { disc: 'nv', ico: '📖', name: 'Humanities',          target: 62, start:  6.0 },
  { disc: 'nn', ico: '🌾', name: 'Agriculture',         target: 31, start:  8.5 },
  { disc: 'xh', ico: '🌐', name: 'Social Sciences',     target: 55, start: 10.0 },
  { disc: 'tn', ico: '🧬', name: 'Natural Sciences',    target: 68, start: 12.5 },
];

window.BD_PHASES = [
  { label: 'Analyzing',   title: 'Your Academic DNA',          i18nLabel: 'loading.phase.analyzing',   i18nTitle: 'loading.phase.title.dna'       },
  { label: 'Evaluating',  title: 'Your Key Strengths',         i18nLabel: 'loading.phase.evaluating',  i18nTitle: 'loading.phase.title.strengths'  },
  { label: 'Comparing',   title: 'Thousands of Majors',        i18nLabel: 'loading.phase.comparing',   i18nTitle: 'loading.phase.title.majors'     },
  { label: 'Calculating', title: 'Your Compatibility',         i18nLabel: 'loading.phase.calculating', i18nTitle: 'loading.phase.title.compat'     },
  { label: 'Finalizing',  title: 'Results Tailored for You',   i18nLabel: 'loading.phase.finalizing',  i18nTitle: 'loading.phase.title.results'    },
];
