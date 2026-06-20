/* ═══════════════════════════════════════════════════════════════════
   BeyonDegrees.ai — Desktop Shell v2.0
   Dynamic sidebar, topbar, theme toggle, nav progress bar.
   Mobile localStorage parity: bd-theme, bd-username, quizMilestone,
   quizProgress, selectedDisciplines, disciplineScores.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────── */
  var $ = function (id) { return document.getElementById(id); };
  var qs = function (sel) { return document.querySelector(sel); };

  /* ── Theme ───────────────────────────────────────────────────── */
  function getThemePref() {
    try { return localStorage.getItem('bd-theme') || 'dark'; } catch (e) { return 'dark'; }
  }
  function resolveTheme(pref) {
    if (pref === 'system') {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return pref === 'light' ? 'light' : 'dark';
  }
  function applyTheme(pref) {
    var resolved = resolveTheme(pref);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-pref', pref);
    try { localStorage.setItem('bd-theme', pref); } catch (e) {}
  }
  function toggleTheme() {
    var cur = getThemePref();
    var next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    renderSidebar();
  }

  /* ── Quiz State ──────────────────────────────────────────────── */
  function getLiveStats() {
    var milestone = 0, answered = 0;
    try {
      milestone = parseInt(localStorage.getItem('quizMilestone') || '0', 10) || 0;
      var qp = localStorage.getItem('quizProgress') || '0';
      answered = parseInt(qp, 10);
      if (isNaN(answered)) answered = 0;
    } catch (e) {}
    return {
      answered: Math.max(0, Math.min(answered, 30)),
      milestone: milestone,
      pct: Math.round((Math.min(answered, 30) / 30) * 100)
    };
  }

  /* ── Greeting ────────────────────────────────────────────────── */
  function getGreeting() {
    var h = new Date().getHours();
    var name = '';
    try { name = localStorage.getItem('bd-username') || ''; } catch (e) {}
    var emoji = h < 5 ? '🌙' : h < 12 ? '☀️' : h < 17 ? '🔥' : h < 21 ? '✨' : '🌙';
    var word = h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Good night';
    return emoji + ' ' + word + (name ? ', ' + name : '') + '!';
  }

  /* ── Navigation Map ──────────────────────────────────────────── */
  /* All paths are relative from any desktop/CATEGORY/SCREEN/ page:
     always 2 levels up (../../) to reach desktop root, then to target. */
  var NAV_GROUPS = [
    {
      label: 'Journey',
      items: [
        { id: 'home',      icon: '🏠', label: 'About me',    path: '../../onboarding/home/' },
        { id: 'quiz-card', icon: '🃏', label: 'Quiz',        path: '../../quiz/quiz-card/' },
        { id: 'loading',   icon: '🤖', label: 'AI Analysis', path: '../../onboarding/loading/', minMilestone: 0 }
      ]
    },
    {
      label: 'Results',
      items: [
        { id: 'match-reveal',    icon: '🧬', label: 'DNA Reveal',   path: '../../results/match-reveal/',    minMilestone: 10 },
        { id: 'match',           icon: '🎯', label: 'Disciplines',  path: '../../discipline/match/',        minMilestone: 10 },
        { id: 'recommendations', icon: '📚', label: 'Majors',       path: '../../major/recommendations/',   minMilestone: 20 },
        { id: 'matches',         icon: '🏛', label: 'Universities', path: '../../university/matches/',      minMilestone: 30 }
      ]
    },
    {
      label: 'Profile',
      items: [
        { id: 'overview',  icon: '👤', label: 'Overview',  path: '../../profile/overview/' },
        { id: 'settings',  icon: '⚙️',  label: 'Settings', path: '../../profile/settings/' }
      ]
    }
  ];

  /* ── Render Sidebar ──────────────────────────────────────────── */
  function renderSidebar() {
    var sidebar = $('bdSidebar');
    if (!sidebar) return;

    var stats = getLiveStats();
    var theme = getThemePref();
    var resolved = resolveTheme(theme);
    var currentPage = document.body.getAttribute('data-page') || '';

    var h = '';

    /* Logo */
    h += '<div class="sidebar-logo">';
    h += '<div class="sidebar-logo-mark">BD</div>';
    h += '<div class="sidebar-logo-text">BeyonDegrees<span>.ai</span></div>';
    h += '</div>';

    /* Quiz progress */
    h += '<div class="sidebar-progress-wrap">';
    h += '<div class="sidebar-progress-label">' + stats.answered + ' / 30 answered</div>';
    h += '<div class="sidebar-progress-bar-bg">';
    h += '<div class="sidebar-progress-bar" style="width:' + stats.pct + '%"></div>';
    h += '</div>';
    h += '</div>';

    /* Nav groups */
    h += '<nav class="sidebar-nav">';
    NAV_GROUPS.forEach(function (group) {
      h += '<div class="sidebar-group">';
      h += '<div class="sidebar-group-label">' + group.label + '</div>';
      group.items.forEach(function (item) {
        var isActive = currentPage === item.id;
        var isLocked = (item.minMilestone !== undefined) && (stats.milestone < item.minMilestone);
        var cls = 'sidebar-nav-item';
        if (isActive) cls += ' active';
        if (isLocked) cls += ' locked';
        var href = isLocked ? '#' : item.path;
        h += '<a href="' + href + '" class="' + cls + '"' + (isLocked ? ' tabindex="-1" aria-disabled="true"' : '') + '>';
        h += '<span style="font-size:14px">' + item.icon + '</span>';
        h += '<span>' + item.label + '</span>';
        if (isLocked) h += '<span style="font-size:9px;opacity:0.5;margin-left:auto">🔒</span>';
        h += '</a>';
      });
      h += '</div>';
    });
    h += '</nav>';

    /* Footer: theme toggle */
    h += '<div class="sidebar-footer">';
    h += '<button class="sidebar-theme-btn" onclick="window.bdShell.toggleTheme()">';
    if (resolved === 'light') {
      h += '<span>☀️</span><span>Light Mode</span>';
    } else {
      h += '<span>🌙</span><span>Dark Mode</span>';
    }
    h += '</button>';
    h += '</div>';

    sidebar.innerHTML = h;
  }

  /* ── Render Topbar ───────────────────────────────────────────── */
  function renderTopbar() {
    var topbar = $('bdTopbar');
    if (!topbar) return;

    var crumb = document.body.getAttribute('data-crumb') || 'BeyonDegrees';
    var pageId = document.body.getAttribute('data-page') || '';
    var isHome = pageId === 'home';

    var h = '<div class="topbar-inner">';

    /* Left */
    h += '<div class="topbar-left">';
    if (isHome) {
      h += '<span class="topbar-greeting">' + getGreeting() + '</span>';
    } else {
      h += '<nav class="topbar-breadcrumb">';
      h += '<span class="bd-crumb-home">BeyonDegrees</span>';
      h += '<span class="bd-crumb-sep"> &rsaquo; </span>';
      h += '<span class="bd-crumb-current">' + crumb + '</span>';
      h += '</nav>';
    }
    h += '</div>';

    /* Right */
    h += '<div class="topbar-right">';
    h += '</div>';

    h += '</div>';
    topbar.innerHTML = h;
  }

  /* ── Nav Progress Bar ────────────────────────────────────────── */
  function initNavProgress() {
    /* Create progress bar element */
    var bar = document.createElement('div');
    bar.id = 'bdNavProgress';
    bar.className = 'nav-progress';
    bar.innerHTML = '<div class="nav-progress-fill"></div>';
    document.body.appendChild(bar);

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || !a.href || a.href === '#' || a.target === '_blank') return;
      if (a.href === window.location.href) return;
      bar.classList.add('loading');
      setTimeout(function () { bar.classList.remove('loading'); }, 1000);
    });
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    renderSidebar();
    renderTopbar();
    initNavProgress();

    /* Watch theme attribute for re-render */
    if (window.MutationObserver) {
      new MutationObserver(function () {
        renderSidebar();
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Public API ──────────────────────────────────────────────── */
  window.bdShell = {
    toggleTheme:  toggleTheme,
    getLiveStats: getLiveStats,
    refresh:      function () { renderSidebar(); renderTopbar(); }
  };
  /* Mobile-compat alias */
  window.bdSetTheme = applyTheme;

})();
