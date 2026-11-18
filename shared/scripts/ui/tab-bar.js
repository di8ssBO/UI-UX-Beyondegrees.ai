/* ═══════════════════════════════════════════════════════════════
   BeyonDegrees — Mobile bottom tab bar (tab-bar.js)
   One source for the 5-tab bar on every mobile page.

   Markup in a page (the script must come right after the nav):
     <nav class="float-tab-bar" id="floatTabBar" data-bd-tabbar data-active="t3"></nav>
     <script src="../../../shared/scripts/ui/tab-bar.js"></script>

   data-active: t1 About me · t2 Disciplines · t3 Majors · t4 Universities
                t5 Account (user's first name) · none (no tab highlighted)
   Without data-active the tab is derived from the URL.
   Tab 5 opens the account menu (app-menu.js binds it).
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ICONS = {
    t1: '<circle cx="11" cy="8" r="3.5"/><path d="M4 21c0-3.5 3.1-6 7-6s7 2.5 7 6"/><path d="M19 2l.45 1.35L20.8 3.8l-1.35.45L19 5.6l-.45-1.35L17.2 3.8l1.35-.45z" fill="currentColor" stroke="none"/>',
    t2: '<circle cx="12" cy="12" r="9"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" stroke="none" fill="currentColor" opacity="0.6"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    t3: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    t4: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    t5: '<circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 20.5c0-3.5 3.4-6.5 7.5-6.5s7.5 3 7.5 6.5"/><circle cx="19" cy="5" r="2.5" fill="currentColor" stroke="none" opacity="0.9"/><path d="M18 5l.7.7 1.3-1.4" stroke="var(--bg-base,#06060f)" stroke-width="1.4" fill="none" stroke-linecap="round"/>'
  };

  var TABS = [
    { id: 't1', path: 'onboarding/home/',       key: 'nav.about_me',     label: 'About me' },
    { id: 't2', path: 'discipline/match/',      key: 'nav.disciplines',  label: 'Disciplines' },
    { id: 't3', path: 'major/recommendations/', key: 'nav.majors',       label: 'Majors' },
    { id: 't4', path: 'university/matches/',    key: 'nav.universities', label: 'Universities' },
    { id: 't5', path: 'profile/edit/',          key: null,               label: 'Account' }
  ];

  /* URL segment → tab, used when the page does not set data-active */
  var URL_MAP = [
    ['understand-matches', 'none'],
    ['discipline', 't2'], ['major', 't3'], ['university', 't4'], ['profile', 't5'],
    ['onboarding', 't1'], ['quiz', 't1'], ['results', 't1']
  ];

  function mobileHref(path) {
    var p = window.location.pathname || '';
    var i = p.indexOf('/mobile/');
    return i !== -1 ? p.slice(0, i + 8) + path : path;
  }

  function activeFor(nav) {
    var a = nav.getAttribute('data-active');
    if (a) return a;
    var lock = document.body && document.body.getAttribute('data-lock-tab');
    if (lock) return lock;
    var segs = (window.location.pathname || '').split('/');
    for (var k = 0; k < URL_MAP.length; k++) {
      if (segs.indexOf(URL_MAP[k][0]) !== -1) return URL_MAP[k][1];
    }
    return 'none';
  }

  function t(key, fallback) {
    if (key && window.BDi18n && BDi18n.t) {
      var s = BDi18n.t(key);
      if (s && s !== key) return s;
    }
    return fallback;
  }

  /* Tab 5 shows the user's first name (from login / sign-up / profile edit) */
  function accountLabel() {
    try {
      var p = JSON.parse(localStorage.getItem('bd-profile') || '{}') || {};
      var name = (p.firstName || p.givenName || '').trim();
      if (name) return name;
    } catch (e) {}
    return t('nav.account', 'Account');
  }

  function render(nav) {
    var active = activeFor(nav);
    nav.innerHTML = TABS.map(function (tab) {
      var label = tab.id === 't5' ? accountLabel() : t(tab.key, tab.label);
      var i18n = tab.key ? ' data-i18n="' + tab.key + '"' : '';
      return '<a href="' + mobileHref(tab.path) + '" class="tab-item' + (tab.id === active ? ' active' : '') + '" data-tab="' + tab.id + '">' +
        '<span class="tab-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[tab.id] + '</svg></span>' +
        '<span class="tab-label"' + i18n + '>' + label + '</span></a>';
    }).join('');
    nav.setAttribute('data-bd-rendered', '1');
  }

  /* Same geometry on every page: 60px bar, 48px active pill, whether or not
     a tab is active (pages used to range from 50 to 64px). Injected last so
     it wins over the per-page copies of the tab bar CSS. */
  function injectStyle() {
    if (document.getElementById('bd-tabbar-style')) return;
    var st = document.createElement('style');
    st.id = 'bd-tabbar-style';
    st.textContent =
      'nav.float-tab-bar[data-bd-tabbar]{min-height:60px;box-sizing:border-box;margin-left:10px;margin-right:10px;margin-bottom:12px;padding:5px}' +
      'nav.float-tab-bar[data-bd-tabbar] .tab-item{box-sizing:border-box}' +
      'nav.float-tab-bar[data-bd-tabbar] .tab-item.active{height:48px}';
    (document.head || document.documentElement).appendChild(st);
  }

  injectStyle();
  document.querySelectorAll('nav.float-tab-bar[data-bd-tabbar]:not([data-bd-rendered])').forEach(render);

  /* Keep tab 5 in the current language when the user has no name yet */
  var obs = new MutationObserver(function () {
    document.querySelectorAll('nav.float-tab-bar[data-bd-tabbar] .tab-item[data-tab="t5"] .tab-label').forEach(function (el) {
      el.textContent = accountLabel();
    });
  });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

  window.BDTabBar = { render: render };
}());
