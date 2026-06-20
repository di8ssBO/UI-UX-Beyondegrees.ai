/* BeyonDegrees.ai — Desktop shell (sidebar + topbar + theme + seamless UX) */
(function () {
  'use strict';

  /* Desktop pages can be served from /desktop, where ../shared is outside the
     static root. Keep a small local i18n fallback so settings language changes
     still work when the shared engine fails to load. */
  if (!window.BDi18n || typeof window.BDi18n.t !== 'function') {
    var FALLBACK_LANGS = {
      en: { nativeName: 'English',     dir: 'ltr' },
      vi: { nativeName: 'Tiếng Việt',  dir: 'ltr' },
      hi: { nativeName: 'हिन्दी',      dir: 'ltr' },
      fr: { nativeName: 'Français',    dir: 'ltr' },
      ar: { nativeName: 'العربية',     dir: 'rtl' }
    };
    var FALLBACK_T = {
      en: {
        'nav.about_me': 'About me', 'nav.quiz': 'Quiz',
        'nav.disciplines': 'Disciplines', 'nav.majors': 'Majors',
        'nav.universities': 'Universities', 'nav.settings': 'Settings',
        'sidebar.explore': 'Explore', 'sidebar.results': 'Results',
        'sidebar.account': 'Account', 'sidebar.questions': 'Questions',
        'sidebar.top_match': 'Top match',
        'settings.title': 'Account Settings', 'settings.language': 'Language',
        'settings.theme': 'Theme', 'settings.theme.light': 'Light',
        'settings.theme.dark': 'Dark', 'settings.theme.system': 'System',
        'settings.notifications': 'Notifications', 'settings.account': 'Account',
        'settings.log_out': 'Log Out', 'settings.delete_account': 'Delete Account'
      },
      vi: {
        'nav.about_me': 'Về tôi', 'nav.quiz': 'Bài trắc nghiệm',
        'nav.disciplines': 'Khối ngành', 'nav.majors': 'Ngành học',
        'nav.universities': 'Đại học', 'nav.settings': 'Cài đặt',
        'sidebar.explore': 'Khám phá', 'sidebar.results': 'Kết quả',
        'sidebar.account': 'Tài khoản', 'sidebar.questions': 'Câu hỏi',
        'sidebar.top_match': 'Phù hợp nhất',
        'settings.title': 'Cài đặt tài khoản', 'settings.language': 'Ngôn ngữ',
        'settings.theme': 'Giao diện', 'settings.theme.light': 'Sáng',
        'settings.theme.dark': 'Tối', 'settings.theme.system': 'Theo hệ thống',
        'settings.notifications': 'Thông báo', 'settings.account': 'Tài khoản',
        'settings.log_out': 'Đăng xuất', 'settings.delete_account': 'Xóa tài khoản'
      },
      hi: {
        'nav.about_me': 'मेरे बारे में', 'nav.quiz': 'क्विज',
        'nav.disciplines': 'विषय क्षेत्र', 'nav.majors': 'मेजर',
        'nav.universities': 'विश्वविद्यालय', 'nav.settings': 'सेटिंग्स',
        'sidebar.explore': 'एक्सप्लोर', 'sidebar.results': 'परिणाम',
        'sidebar.account': 'खाता', 'sidebar.questions': 'प्रश्न',
        'sidebar.top_match': 'शीर्ष मैच',
        'settings.title': 'खाता सेटिंग्स', 'settings.language': 'भाषा',
        'settings.theme': 'थीम', 'settings.theme.light': 'लाइट',
        'settings.theme.dark': 'डार्क', 'settings.theme.system': 'सिस्टम',
        'settings.notifications': 'सूचनाएं', 'settings.account': 'खाता',
        'settings.log_out': 'लॉग आउट', 'settings.delete_account': 'खाता हटाएं'
      },
      fr: {
        'nav.about_me': 'À propos de moi', 'nav.quiz': 'Quiz',
        'nav.disciplines': 'Disciplines', 'nav.majors': 'Filières',
        'nav.universities': 'Universités', 'nav.settings': 'Paramètres',
        'sidebar.explore': 'Explorer', 'sidebar.results': 'Résultats',
        'sidebar.account': 'Compte', 'sidebar.questions': 'Questions',
        'sidebar.top_match': 'Meilleur match',
        'settings.title': 'Paramètres du compte', 'settings.language': 'Langue',
        'settings.theme': 'Thème', 'settings.theme.light': 'Clair',
        'settings.theme.dark': 'Sombre', 'settings.theme.system': 'Système',
        'settings.notifications': 'Notifications', 'settings.account': 'Compte',
        'settings.log_out': 'Se déconnecter', 'settings.delete_account': 'Supprimer le compte'
      },
      ar: {
        'nav.about_me': 'نبذة عني', 'nav.quiz': 'الاختبار',
        'nav.disciplines': 'المجالات', 'nav.majors': 'التخصصات',
        'nav.universities': 'الجامعات', 'nav.settings': 'الإعدادات',
        'sidebar.explore': 'استكشاف', 'sidebar.results': 'النتائج',
        'sidebar.account': 'الحساب', 'sidebar.questions': 'الأسئلة',
        'sidebar.top_match': 'أفضل تطابق',
        'settings.title': 'إعدادات الحساب', 'settings.language': 'اللغة',
        'settings.theme': 'السمة', 'settings.theme.light': 'فاتح',
        'settings.theme.dark': 'داكن', 'settings.theme.system': 'النظام',
        'settings.notifications': 'الإشعارات', 'settings.account': 'الحساب',
        'settings.log_out': 'تسجيل الخروج', 'settings.delete_account': 'حذف الحساب'
      }
    };

    function fallbackLang() {
      var lang = 'en';
      try { lang = localStorage.getItem('bd-lang') || 'en'; } catch (e) {}
      return FALLBACK_T[lang] ? lang : 'en';
    }
    function fallbackValue(lang, key) {
      return (FALLBACK_T[lang] && FALLBACK_T[lang][key] != null ? FALLBACK_T[lang][key] : null)
        || (FALLBACK_T.en[key] != null ? FALLBACK_T.en[key] : null);
    }

    window.BDi18n = {
      LANGS: FALLBACK_LANGS,
      _lang: fallbackLang(),
      t: function (key) { return fallbackValue(this._lang, key) || key; },
      apply: function (lang) {
        if (!FALLBACK_T[lang]) lang = 'en';
        this._lang = lang;
        var meta = FALLBACK_LANGS[lang] || FALLBACK_LANGS.en;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', meta.dir);
        document.documentElement.setAttribute('data-lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
          var value = fallbackValue(lang, el.getAttribute('data-i18n'));
          if (value != null) el.textContent = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
          var value = fallbackValue(lang, el.getAttribute('data-i18n-placeholder'));
          if (value != null) el.setAttribute('placeholder', value);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
          var value = fallbackValue(lang, el.getAttribute('data-i18n-aria'));
          if (value != null) el.setAttribute('aria-label', value);
        });
        try { localStorage.setItem('bd-lang', lang); } catch (e) {}
      },
      init: function () { this.apply(fallbackLang()); },
      current: function () { return this._lang; }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { window.BDi18n.init(); });
    } else {
      window.BDi18n.init();
    }
  }

  /* ── Theme (anti-FOUC: also set by inline script in <head>) ── */
  var saved = localStorage.getItem('bd-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', cur);
    localStorage.setItem('bd-theme', cur);
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.innerHTML = themeLabel();
  }
  function themeLabel() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? '&#127769; Dark mode' : '&#9728;&#65039; Light mode';
  }

  /* ── Shared data ────────────────────────────────────────── */
  window.BD = window.BD || {};
  BD.disciplines = {
    kt: { name: 'Engineering & Technology',  short: 'Engineering',  icon: '⚙️', accClass: 'acc-kt', match: 92 },
    yt: { name: 'Medical & Health Sciences', short: 'Medical',      icon: '\U0001fa7a', accClass: 'acc-yt', match: 78 },
    tn: { name: 'Natural Sciences',          short: 'Natural Sci',  icon: '\U0001f52c', accClass: 'acc-tn', match: 71 },
    xh: { name: 'Social Sciences',           short: 'Social Sci',   icon: '\U0001f9e0', accClass: 'acc-xh', match: 64 },
    nv: { name: 'Humanities',                short: 'Humanities',   icon: '\U0001f4dc', accClass: 'acc-nv', match: 58 },
    nn: { name: 'Agricultural Sciences',     short: 'Agricultural', icon: '\U0001f331', accClass: 'acc-nn', match: 43 }
  };

  /* ── i18n helper ────────────────────────────────────────── */
  function tr(key, fallback) {
    return (window.BDi18n && typeof window.BDi18n.t === 'function') ? window.BDi18n.t(key) : fallback;
  }

  /* ── Live stats from localStorage (mobile-compatible keys) ─ */
  function getLiveStats() {
    var answered = 0;
    var topMatchPct = '--';
    var topDisc = null;
    try {
      /* quizMilestone: 0|1|10|20|30 — set by both mobile and desktop quiz */
      var milestone = parseInt(localStorage.getItem('quizMilestone') || '0', 10);
      answered = isNaN(milestone) ? 0 : Math.min(milestone, 30);
      /* quizProgress: mobile stores numeric string e.g. "15" (fine-grained) */
      var qp = localStorage.getItem('quizProgress');
      if (qp) {
        var cnt = parseInt(qp, 10);
        if (isNaN(cnt)) {
          try { cnt = Object.keys(JSON.parse(qp)).length; } catch (e2) { cnt = 0; }
        }
        if (cnt > answered) answered = Math.min(cnt, 30);
      }
    } catch (e) {}
    try {
      /* disciplineScores: { kt:92, yt:78, ... } — written by quiz engine */
      var ds = localStorage.getItem('disciplineScores');
      if (ds) {
        var scores = JSON.parse(ds);
        var best = null, bestPct = 0;
        Object.keys(scores).forEach(function (k) {
          if (scores[k] > bestPct) { bestPct = scores[k]; best = k; }
        });
        if (best) { topMatchPct = bestPct + '%'; topDisc = best; }
      } else if (answered >= 10 && BD.disciplines) {
        /* Fallback to demo match data until real scores exist */
        var bestKey = 'kt', bestVal = 0;
        Object.keys(BD.disciplines).forEach(function (k) {
          if (BD.disciplines[k].match > bestVal) { bestVal = BD.disciplines[k].match; bestKey = k; }
        });
        topMatchPct = bestVal + '%';
        topDisc = bestKey;
      }
    } catch (e) {}
    return { answered: answered, topMatchPct: topMatchPct, topDisc: topDisc };
  }

  /* ── Time-based greeting ────────────────────────────────── */
  function getGreeting() {
    var h = new Date().getHours();
    var g, em;
    if      (h < 6)  { g = 'Good night';     em = '\U0001f319'; }
    else if (h < 12) { g = 'Good morning';   em = '☀️'; }
    else if (h < 18) { g = 'Good afternoon'; em = '\U0001f525'; }
    else             { g = 'Good evening';   em = '✨'; }
    var uname = '';
    try { uname = localStorage.getItem('bd-username') || ''; } catch (e) {}
    return uname
      ? g + ', <span class="greet-name">' + uname + '</span> ' + em
      : g + ' ' + em;
  }

  /* ── Nav config ─────────────────────────────────────────── */
  function buildNav() {
    return [
      { sec: tr('sidebar.explore', 'Explore') },
      { id: 'home',         href: '../../onboarding/home/',        label: tr('nav.about_me', 'About me'),       icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10' },
      { id: 'quiz',         href: '../../quiz/quiz-card/',         label: tr('nav.quiz', 'Quiz'),               icon: 'M9 9a3 3 0 115.8 1c-.7.8-1.8 1.2-1.8 2.5M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0' },
      { sec: tr('sidebar.results', 'Results') },
      { id: 'disciplines',  href: '../../discipline/match/',       label: tr('nav.disciplines', 'Disciplines'), icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5' },
      { id: 'majors',       href: '../../major/recommendations/',  label: tr('nav.majors', 'Majors'),           icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0v7m-6.5-3.5V11.5' },
      { id: 'universities', href: '../../university/matches/',     label: tr('nav.universities', 'Universities'), icon: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' },
      { sec: tr('sidebar.account', 'Account') },
      { id: 'profile',      href: '../../profile/overview/',       label: 'Hoang Phuc',                         icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0' },
      { id: 'settings',     href: '../../profile/settings/',       label: tr('nav.settings', 'Settings'),       icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 00-2-1.2L14.5 3h-5l-.4 2.6a7.4 7.4 0 00-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.4l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 002 1.2l.4 2.6h5l.4-2.6a7.4 7.4 0 002-1.2l2.4 1 2-3.4-2-1.6c.07-.4.1-.8.1-1.2z' }
    ];
  }

  function icon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }

  /* ── Render shell ───────────────────────────────────────── */
  function renderShell() {
    var page  = document.body.getAttribute('data-page')  || '';
    var crumb = document.body.getAttribute('data-crumb') || '';
    var stats = getLiveStats();

    var nav = buildNav().map(function (n) {
      if (n.sec) return '<div class="nav-section-label">' + n.sec + '</div>';
      var active = n.id === page ? ' active' : '';
      return '<a class="nav-item' + active + '" href="' + n.href + '" title="' + n.label + '">'
        + icon(n.icon) + '<span class="nav-label">' + n.label + '</span></a>';
    }).join('');

    /* Discipline badge — visible after quiz milestone >= 10 */
    var discBadge = '';
    if (stats.topDisc && stats.answered >= 10 && BD.disciplines[stats.topDisc]) {
      var d = BD.disciplines[stats.topDisc];
      discBadge = '<div class="side-disc-badge ' + d.accClass + '">'
        + '<span class="badge-icon">' + d.icon + '</span>'
        + '<span class="badge-label">' + d.short + '</span>'
        + '<span class="badge-pct">' + stats.topMatchPct + '</span>'
        + '</div>';
    }

    var sidebar =
      '<aside class="sidebar" id="bd-sidebar">'
      + '<a class="sidebar-logo" href="../../onboarding/home/"><span class="logo-mark">BD</span><span class="logo-text">BeyonDegrees.ai</span></a>'
      + nav
      + '<div class="sidebar-footer">'
      +   discBadge
      +   '<div class="side-stats">'
      +     '<div class="side-stat"><b>' + stats.answered + '/30</b><span>' + tr('sidebar.questions', 'Questions') + '</span></div>'
      +     '<div class="side-stat"><b>' + stats.topMatchPct + '</b><span>' + tr('sidebar.top_match', 'Top match') + '</span></div>'
      +   '</div>'
      + '</div>'
      + '</aside>';

    /* Aurora blobs + noise overlay (dark mode only via CSS) */
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="aurora-bg"><div class="blob blob-1"></div><div class="blob blob-2"></div>'
      + '<div class="blob blob-3"></div><div class="blob blob-4"></div></div>'
      + '<div class="noise-overlay"></div>');

    /* Topbar: greeting on home, concise page name on all others */
    var leftSlot = page === 'home'
      ? '<div class="topbar-greeting">' + getGreeting() + '</div>'
      : '<div class="crumbs"><b>' + crumb + '</b></div>';

    var topbar =
      '<header class="topbar" id="bd-topbar">'
      + leftSlot
      + '<div class="topbar-spacer"></div>'
      + '<button class="theme-toggle" type="button" aria-label="Toggle theme">' + themeLabel() + '</button>'
      + '<div class="avatar" role="img" aria-label="User profile">HP</div>'
      + '</header>';

    var main = document.querySelector('.main');
    document.body.insertAdjacentHTML('afterbegin', sidebar);
    if (main) main.insertAdjacentHTML('afterbegin', topbar);
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    initNavProgress();
  }

  /* ── Navigation progress bar (seamless page transitions) ── */
  function initNavProgress() {
    var bar = document.createElement('div');
    bar.className = 'nav-progress';
    bar.id = 'bd-nav-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Page loading');
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('javascript') === 0) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      bar.className = 'nav-progress is-loading';
    }, true);

    window.addEventListener('pageshow', function () {
      bar.className = 'nav-progress is-done';
      setTimeout(function () { bar.className = 'nav-progress'; }, 400);
    });
  }

  /* ── Helpers ────────────────────────────────────────────── */
  BD.param = function (key, fallback) {
    return new URLSearchParams(location.search).get(key) || fallback;
  };
  BD.toggleTheme = toggleTheme;
  BD.themeLabel  = themeLabel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShell);
  } else {
    renderShell();
  }
})();
