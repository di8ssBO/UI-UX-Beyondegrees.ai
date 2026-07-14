/* ─────────────────────────────────────────────────────────────────
   BeyonDegrees.ai — Discipline Configuration
   Shared between mobile (mobile/) and desktop quiz, loading, radar.

   window.BD_DISC_COLORS  — full aurora/theme config per discipline
   window.BD_DISC_NAMES   — plain display names
   window.BD_DISC_EMOJIS  — emoji per discipline
   ───────────────────────────────────────────────────────────────── */

window.BD_DISC_EMOJIS = {
  kt: '💻', nv: '📖', yt: '🩺', xh: '🌐', nn: '🌾', tn: '🧬',
};

window.BD_DISC_NAMES = {
  kt: 'Engineering & Technology',
  nv: 'Humanities',
  yt: 'Medical & Health Sciences',
  xh: 'Social Sciences',
  nn: 'Agricultural Sciences',
  tn: 'Natural Sciences',
};

/* Superset: all properties used by both mobile and desktop quiz/loading */
window.BD_DISC_COLORS = {
  kt: {
    primary: '#7c3aed', dark: '#2d1267', glow: 'rgba(24,99,220,0.5)',
    light: '#ECE2EE', lightAccent: '#A088AB',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #ECE2EE 60%, #DDCFE2 100%)',
    lightGlow: 'rgba(160,136,171,0.45)',
    fieldDark: 'rgba(124,58,237,0.18)', fieldLight: 'rgba(160,136,171,0.35)',
    label: '⚡ Engineering & Tech', next: 'nv',
  },
  nv: {
    primary: '#3b82f6', dark: '#1e3a8a', glow: 'rgba(59,130,246,0.5)',
    light: '#DCE8EF', lightAccent: '#5E8090',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #DCE8EF 60%, #C2D5E0 100%)',
    lightGlow: 'rgba(143,181,204,0.50)',
    fieldDark: 'rgba(59,130,246,0.18)', fieldLight: 'rgba(143,181,204,0.35)',
    label: '📚 Humanities', next: 'yt',
  },
  yt: {
    primary: '#06d6a0', dark: '#064e3b', glow: 'rgba(6,214,160,0.5)',
    light: '#DCE7DE', lightAccent: '#5C7C68',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #DCE7DE 60%, #C5D8C9 100%)',
    lightGlow: 'rgba(146,178,153,0.50)',
    fieldDark: 'rgba(6,214,160,0.15)', fieldLight: 'rgba(146,178,153,0.35)',
    label: '⚕️ Health & Medicine', next: 'xh',
  },
  xh: {
    primary: '#a855f7', dark: '#3b0764', glow: 'rgba(168,85,247,0.5)',
    light: '#DDCFE2', lightAccent: '#856E92',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #DDCFE2 60%, #CDB8D2 100%)',
    lightGlow: 'rgba(186,161,194,0.50)',
    fieldDark: 'rgba(168,85,247,0.18)', fieldLight: 'rgba(186,161,194,0.35)',
    label: '🌐 Social Sciences', next: 'nn',
  },
  nn: {
    primary: '#f59e0b', dark: '#451a03', glow: 'rgba(245,158,11,0.5)',
    light: '#FAEEDA', lightAccent: '#B26344',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #FAEEDA 50%, #F4C9A8 100%)',
    lightGlow: 'rgba(232,168,107,0.50)',
    fieldDark: 'rgba(245,158,11,0.15)', fieldLight: 'rgba(232,168,107,0.35)',
    label: '🌿 Agriculture', next: 'tn',
  },
  tn: {
    primary: '#f43f5e', dark: '#4c0519', glow: 'rgba(244,63,94,0.5)',
    light: '#F5E0D5', lightAccent: '#A86E5E',
    lightBase: 'linear-gradient(180deg, #FFFCF5 0%, #F5E0D5 60%, #EDCDC0 100%)',
    lightGlow: 'rgba(197,136,122,0.50)',
    fieldDark: 'rgba(244,63,94,0.15)', fieldLight: 'rgba(197,136,122,0.35)',
    label: '🔬 Natural Sciences', next: 'kt',
  },
};
