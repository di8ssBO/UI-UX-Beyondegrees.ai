/* ═══════════════════════════════════════════════════════════════
   BeyonDegrees — App Hamburger Menu  (app-menu.js)
   Auto-initializes every .app-menu-wrap found on the page.
   Uses position:fixed so dropdown escapes any overflow:hidden parent.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

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
    if (!btn || !dropdown) return;

    /* Move the drawer to <body> so it escapes any overflow:hidden / transforms. */
    document.body.appendChild(dropdown);
    var backdrop = getBackdrop();

    function open()  { dropdown.classList.add('open');    backdrop.classList.add('open');    btn.classList.add('open'); }
    function close() { dropdown.classList.remove('open'); backdrop.classList.remove('open'); btn.classList.remove('open'); }
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

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
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

      var btn = document.getElementById('appMenuResetConfirm');
      btn.textContent = _t('menu.resetting','Resetting…');
      btn.style.opacity = '0.7';
      setTimeout(function () {
        window.location.href = '../../onboarding/home/';
      }, 800);
    });
  }

  /* ── Action handlers ── */
  function bindActions() {
    document.querySelectorAll('[data-menu-action]').forEach(function (el) {
      el.addEventListener('click', function () {
        /* Close all dropdowns */
        document.querySelectorAll('.app-dropdown').forEach(function (d) { d.classList.remove('open'); });
        document.querySelectorAll('.app-menu-btn').forEach(function (b) { b.classList.remove('open'); });

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
    document.querySelectorAll('.app-menu-wrap').forEach(initMenu);
    bindActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
