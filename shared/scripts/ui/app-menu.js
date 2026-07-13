/* ═══════════════════════════════════════════════════════════════
   BeyonDegrees — App Hamburger Menu  (app-menu.js)
   Auto-initializes every .app-menu-wrap found on the page.
   Uses position:fixed so dropdown escapes any overflow:hidden parent.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var menuApi = null;

  function mobileHref(path) {
    var clean = String(path || '').replace(/^\/+/, '');
    var pathname = window.location.pathname || '';
    var marker = '/mobile/';
    var idx = pathname.indexOf(marker);

    if (idx !== -1) {
      return pathname.slice(0, idx + marker.length) + clean;
    }

    return clean;
  }

  function createDefaultMenu() {
    var wrap = document.createElement('div');
    wrap.className = 'app-menu-wrap app-menu-wrap--generated';
    wrap.setAttribute('data-home', mobileHref('onboarding/home/'));
    wrap.innerHTML = [
      '<div class="app-dropdown">',
        '<div class="app-menu-section" data-i18n="menu.section_explore">Explore</div>',
        '<a href="' + mobileHref('understand-matches/') + '" class="app-menu-item" data-menu-action="understand-matches">',
          '<span class="app-menu-icon app-menu-icon--understand"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><circle cx="15" cy="9" r="6"/><circle cx="12" cy="15" r="6"/></svg></span>',
          '<span data-i18n="menu.understand_matches">Understand Matches</span>',
        '</a>',
        '<div class="app-menu-section" data-i18n="menu.section_account">Account</div>',
        '<a href="' + mobileHref('profile/edit/') + '" class="app-menu-item" data-menu-action="my-account">',
          '<span class="app-menu-icon app-menu-icon--account"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg></span>',
          '<span data-i18n="menu.my_account">My Account</span>',
        '</a>',
        '<a href="' + mobileHref('profile/settings/') + '" class="app-menu-item" data-menu-action="account-settings">',
          '<span class="app-menu-icon app-menu-icon--settings"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>',
          '<span data-i18n="menu.account_settings">Account Settings</span>',
        '</a>',
        '<button class="app-menu-item" data-menu-action="leave-review">',
          '<span class="app-menu-icon app-menu-icon--review"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>',
          '<span data-i18n="menu.leave_review">Leave Review</span>',
        '</button>',
        '<button class="app-menu-item" data-menu-action="share">',
          '<span class="app-menu-icon app-menu-icon--share"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>',
          '<span data-i18n="menu.share_archetype">Share Archetype</span>',
        '</button>',
        '<button class="app-menu-item" data-menu-action="contact">',
          '<span class="app-menu-icon app-menu-icon--contact"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>',
          '<span data-i18n="menu.contact_us">Contact Us</span>',
        '</button>',
        '<button class="app-menu-item" data-menu-action="install">',
          '<span class="app-menu-icon app-menu-icon--install"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg></span>',
          '<span data-i18n="menu.install">Install app</span>',
        '</button>',
        '<div class="app-menu-divider"></div>',
        '<button class="app-menu-item app-menu-item--danger" data-menu-action="reset">',
          '<span class="app-menu-icon app-menu-icon--danger"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg></span>',
          '<span data-i18n="menu.reset_account">Reset Account</span>',
        '</button>',
      '</div>'
    ].join('');
    document.body.appendChild(wrap);

    if (window.BDi18n && window.BDi18n.apply && window.BDi18n.current) {
      window.BDi18n.apply(window.BDi18n.current());
    }

    return wrap;
  }

  function ensureMenuWrap() {
    var existing = document.querySelector('.app-menu-wrap');
    if (existing) return existing;
    if (!document.querySelector('.float-tab-bar .tab-item')) return null;
    return createDefaultMenu();
  }

  /* One shared dim backdrop behind the slide-in drawer. */
  function getBackdrop() {
    var bd = document.getElementById('app-menu-backdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'app-menu-backdrop';
      bd.className = 'app-menu-backdrop';
      document.body.appendChild(bd);
    }
    return bd;
  }

  function initMenu(wrap) {
    var btn      = wrap.querySelector('.app-menu-btn');
    var dropdown = wrap.querySelector('.app-dropdown');
    if (!dropdown) return null;

    /* Move the drawer to <body> so it escapes any overflow:hidden / transforms. */
    document.body.appendChild(dropdown);
    var backdrop = getBackdrop();

    function setTriggersExpanded(value) {
      document.querySelectorAll('.float-tab-bar .tab-item[data-app-menu-trigger-bound="1"]').forEach(function (el) {
        el.setAttribute('aria-expanded', value);
      });
    }
    function open()  { dropdown.style.transform = ''; dropdown.classList.add('open');    backdrop.classList.add('open');    if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); } setTriggersExpanded('true'); }
    function close() { dropdown.style.transform = ''; dropdown.classList.remove('open'); backdrop.classList.remove('open'); if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } setTriggersExpanded('false'); }
    function toggle() { dropdown.classList.contains('open') ? close() : open(); }

    /* Inject a close (✕) button once, at the top of the drawer. */
    if (!dropdown.querySelector('.app-menu-close')) {
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'app-menu-close';
      x.setAttribute('aria-label', 'Close');
      x.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
      x.addEventListener('click', close);
      dropdown.insertBefore(x, dropdown.firstChild);
    }

    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    }
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      if (!dropdown.classList.contains('open')) return;
      if (dropdown.contains(e.target)) return;
      if (btn && btn.contains(e.target)) return;
      var accountTab = e.target.closest && e.target.closest('.float-tab-bar .tab-item');
      if (isAccountTab(accountTab)) return;
      close();
    });
    return { open: open, close: close, toggle: toggle };
  }

  function isAccountTab(el) {
    if (!el || !el.classList || !el.classList.contains('tab-item')) return false;
    if (!el.closest('.float-tab-bar')) return false;

    var tab = el.getAttribute('data-tab');
    var href = el.getAttribute('href') || '';

    return tab === 't5' ||
      tab === 'account' ||
      href.indexOf('/profile/edit/') !== -1 ||
      href.indexOf('/profile/overview/') !== -1 ||
      href.indexOf('/profile/settings/') !== -1 ||
      href.indexOf('profile/edit/') !== -1 ||
      href.indexOf('profile/overview/') !== -1 ||
      href.indexOf('profile/settings/') !== -1;
  }

  function bindAccountTabTrigger() {
    document.querySelectorAll('.float-tab-bar .tab-item').forEach(function (el) {
      if (!isAccountTab(el) || el.dataset.appMenuTriggerBound === '1') return;

      el.dataset.appMenuTriggerBound = '1';
      el.setAttribute('aria-haspopup', 'menu');
      el.setAttribute('aria-label', 'Account menu');
      el.setAttribute('title', 'Account');
      var icon = el.querySelector('.tab-icon');
      if (icon && !icon.querySelector('.app-menu-tab-mark')) {
        icon.innerHTML = '<span class="app-menu-tab-mark" aria-hidden="true"></span>';
      }
      if (icon) icon.classList.add('has-app-menu-tab-mark');
      el.addEventListener('click', function (e) {
        if (!menuApi) return;
        e.preventDefault();
        e.stopPropagation();
        el.setAttribute('aria-expanded', 'true');
        menuApi.open();
      }, true);
    });
  }

  /* ── Reset confirm modal ── */
  function showResetConfirm() {
    var existing = document.getElementById('appMenuResetModal');
    if (existing) { existing.remove(); }

    var _t = (window.BDi18n && window.BDi18n.t) ? function(k,d){ return window.BDi18n.t(k) || d; } : function(k,d){ return d; };

    var modal = document.createElement('div');
    modal.id = 'appMenuResetModal';
    modal.style.cssText = [
      'position:fixed;inset:0;z-index:10000',
      'display:flex;align-items:center;justify-content:center',
      'background:rgba(0,0,0,0.70)',
      'padding:24px'
    ].join(';');

    modal.innerHTML = [
      '<div style="background:#12152e;border:1px solid rgba(239,68,68,0.30);border-radius:20px;padding:28px 24px;max-width:320px;width:100%;text-align:center;box-shadow:0 16px 48px rgba(0,0,0,0.60)">',
        '<div style="font-size:32px;margin-bottom:12px">&#x26A0;&#xFE0F;</div>',
        '<div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">' + _t('menu.reset_title','Reset Account?') + '</div>',
        '<div style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.5;margin-bottom:24px">' + _t('menu.reset_body','All your quiz progress and results will be permanently deleted. This cannot be undone.') + '</div>',
        '<button id="appMenuResetConfirm" style="width:100%;padding:13px;background:linear-gradient(135deg,rgba(185,28,28,0.80),rgba(239,68,68,0.70));border:1px solid rgba(252,165,165,0.40);border-radius:12px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px">' + _t('menu.reset_confirm','Reset Account') + '</button>',
        '<button id="appMenuResetCancel" style="width:100%;padding:13px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);border-radius:12px;color:rgba(255,255,255,0.65);font-size:14px;font-weight:600;cursor:pointer">' + _t('menu.reset_cancel','Cancel') + '</button>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);
    modal.classList.add('open');

    document.getElementById('appMenuResetCancel').addEventListener('click', function () {
      modal.remove();
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.remove();
    });

    document.getElementById('appMenuResetConfirm').addEventListener('click', function () {
      /* Clear all quiz & profile data */
      var keys = ['quizProgress','quizMilestone','bd-quiz-progress'];
      keys.forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });
      ['bd_dna','bd_answers','bd_scores','bd_nextStart'].forEach(function(k) {
        try { sessionStorage.removeItem(k); } catch(e) {}
      });
      try { sessionStorage.setItem('bd_reset_success','1'); } catch(e) {}

      var wrap = document.querySelector('.app-menu-wrap');
      var home = (wrap && wrap.getAttribute('data-home')) || '../../onboarding/home/';

      var btn = document.getElementById('appMenuResetConfirm');
      btn.textContent = _t('menu.resetting','Resetting…');
      btn.style.opacity = '0.7';
      setTimeout(function () {
        window.location.href = home;
      }, 800);
    });
  }

  /* ── Action handlers ── */
  function bindActions() {
    document.querySelectorAll('[data-menu-action]').forEach(function (el) {
      el.addEventListener('click', function () {
        /* Close all dropdowns */
        document.querySelectorAll('.app-dropdown').forEach(function (d) {
          d.classList.remove('open');
          d.style.transform = '';
        });
        document.querySelectorAll('.app-menu-btn').forEach(function (b) { b.classList.remove('open'); });
        document.querySelectorAll('.app-menu-backdrop').forEach(function (b) { b.classList.remove('open'); });
        document.querySelectorAll('.float-tab-bar .tab-item[data-app-menu-trigger-bound="1"]').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });

        var action = el.getAttribute('data-menu-action');

        if (action === 'my-account') {
          window.location.href = el.getAttribute('href') || el.getAttribute('data-href') || '../../profile/edit/';

        } else if (action === 'account-settings') {
          window.location.href = el.getAttribute('href') || el.getAttribute('data-href') || '../../profile/settings/';

        } else if (action === 'leave-review') {
          window.open('https://www.trustpilot.com', '_blank');

        } else if (action === 'share') {
          var shareText = 'Check out my Academic Archetype on BeyonDegrees.ai!';
          if (navigator.share) {
            navigator.share({ title: 'BeyonDegrees', text: shareText, url: window.location.href });
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          }

        } else if (action === 'contact') {
          window.location.href = 'mailto:support@beyondegrees.ai';

        } else if (action === 'install') {
          if (window.BDInstall && window.BDInstall.prompt) window.BDInstall.prompt();

        } else if (action === 'reset') {
          showResetConfirm();
        }
      });
    });
  }

  function init() {
    ensureMenuWrap();
    document.querySelectorAll('.app-menu-wrap').forEach(function (wrap) {
      var api = initMenu(wrap);
      if (api && !menuApi) menuApi = api;
    });
    bindAccountTabTrigger();
    bindActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
