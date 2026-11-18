/* BeyonDegrees — PWA install.
 *
 *  - Captures the `beforeinstallprompt` event app-wide and exposes a tiny API:
 *      window.BDInstall.prompt()      → trigger install (native / iOS steps / sheet)
 *      window.BDInstall.canPrompt()   → is a native prompt available?
 *      window.BDInstall.showSheet()   → open the install bottom sheet
 *      window.BDInstall.isIOSSafari
 *  - Mobile HOME shows a welcome bottom sheet ONCE (first visit), in the app
 *    language (i18n). The small "Install app" entry in the app-menu calls
 *    BDInstall.prompt() everywhere else.
 *  - Desktop pages show a small floating pill when installable.
 *
 *  Sheet styling uses the design-system CSS variables already on the page, so
 *  it follows the active dark/light theme.
 */
(function () {
  'use strict';

  var isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  var ua = navigator.userAgent || '';
  var isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (/Macintosh/.test(ua) && 'ontouchend' in document);
  var isIOSSafari = isIOS && !/crios|fxios|edgios/i.test(ua);
  var isInAppBrowser = /FBAN|FBAV|Instagram|Line|Zalo|TikTok|MicroMessenger|Twitter|LinkedIn/i.test(ua);

  var isMobile  = location.pathname.indexOf('/mobile/')  !== -1;
  var isDesktop = location.pathname.indexOf('/desktop/') !== -1;
  var isHome    = /\/onboarding\/home\//.test(location.pathname);

  var WELCOMED_KEY = 'bd-pwa-welcomed';
  var deferredPrompt = null;

  var DL_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/>' +
    '<path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>';

  /* i18n helper — uses BDi18n when present, else the English fallback. */
  function t(key, fb) {
    try {
      if (window.BDi18n && BDi18n.t) {
        var v = BDi18n.t(key);
        if (v != null && v !== key) return v;
      }
    } catch (e) {}
    return fb;
  }

  function ensurePWAInstallAssets() {
    if (!document.querySelector('link[rel="manifest"]')) {
      var manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = '/mobile/manifest.json';
      document.head.appendChild(manifest);
    }
    if (!document.querySelector('meta[name="theme-color"]')) {
      var theme = document.createElement('meta');
      theme.name = 'theme-color';
      theme.content = '#1a0533';
      document.head.appendChild(theme);
    }
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      var apple = document.createElement('link');
      apple.rel = 'apple-touch-icon';
      apple.href = '/shared/icons/icon-180.png';
      document.head.appendChild(apple);
    }
    if (!document.querySelector('link[rel="icon"][sizes="192x192"]')) {
      var iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      iconLink.type = 'image/png';
      iconLink.sizes = '192x192';
      iconLink.href = '/shared/icons/icon-192.png';
      document.head.appendChild(iconLink);
    }
    if (window.isSecureContext && 'serviceWorker' in navigator && !window.__BDPWAServiceWorkerRegistered) {
      window.__BDPWAServiceWorkerRegistered = true;
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .catch(function (err) { console.warn('SW registration failed:', err); });
    }
  }

  function unavailableMessage() {
    if (isInAppBrowser) {
      return t('install.open_browser', 'This in-app browser cannot install PWAs. Open the site in Chrome on Android or Safari on iPhone, then install from there.');
    }
    if (!window.isSecureContext) {
      return t('install.needs_https', 'App install only works on HTTPS. If you are opening a local IP or http link on your phone, deploy the site or use an HTTPS tunnel first.');
    }
    if (!('serviceWorker' in navigator)) {
      return t('install.unsupported_browser', 'This browser does not support installing this web app. Please open it in Chrome on Android or Safari on iPhone.');
    }
    return t('install.unavailable', 'Your browser is still preparing the install prompt. Wait a moment, then tap Install again or use the browser menu.');
  }

  /* ── styles ─────────────────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('bd-pwa-style')) return;
    var s = document.createElement('style');
    s.id = 'bd-pwa-style';
    s.textContent = [
      '#bd-pwa-pill{position:fixed;right:16px;bottom:16px;z-index:var(--z-modal,111);',
      ' display:none;align-items:center;gap:var(--space-2,8px);padding:12px 18px;border:0;',
      ' border-radius:var(--radius-full,999px);cursor:pointer;color:#fff;',
      ' font-family:var(--font-display,system-ui);font-weight:var(--fw-bold,700);font-size:14px;',
      ' background:linear-gradient(135deg,var(--violet-600,#7c3aed),var(--violet-700,#6d28d9));',
      ' box-shadow:var(--shadow-violet,0 8px 24px rgba(124,58,237,.45));',
      ' transition:transform var(--transition-fast,.15s) ease;}',
      '#bd-pwa-pill:hover{transform:translateY(-2px);}',
      '#bd-pwa-pill svg{width:18px;height:18px;}',

      '#bd-pwa-backdrop{position:fixed;inset:0;z-index:var(--z-modal-backdrop,110);',
      ' display:flex;align-items:flex-end;justify-content:center;',
      ' background:rgba(6,6,15,.62);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);',
      ' opacity:0;pointer-events:none;transition:opacity var(--transition-base,.25s) ease;}',
      '#bd-pwa-backdrop.open{opacity:1;pointer-events:auto;}',

      '#bd-pwa-sheet{width:100%;max-width:480px;box-sizing:border-box;',
      ' background:var(--bg-elevated,#1a1a2e);color:var(--text-primary,#f8fafc);',
      ' border:1px solid var(--border-color,#1a1a2e);border-bottom:0;',
      ' border-radius:var(--radius-xl,20px) var(--radius-xl,20px) 0 0;',
      ' padding:var(--space-3,12px) var(--space-6,24px) calc(var(--space-8,32px) + env(safe-area-inset-bottom));',
      ' box-shadow:var(--shadow-xl,0 12px 32px rgba(0,0,0,.25));text-align:center;',
      ' transform:translateY(110%);transition:transform var(--transition-slow,.35s) var(--transition-timing-out,cubic-bezier(0,0,.2,1));}',
      '#bd-pwa-backdrop.open #bd-pwa-sheet{transform:translateY(0);}',

      '.bd-pwa-handle{width:40px;height:4px;border-radius:var(--radius-full,999px);',
      ' background:var(--neutral-600,#252540);margin:0 auto var(--space-5,20px);}',
      '.bd-pwa-icon{width:76px;height:76px;margin:0 auto var(--space-4,16px);',
      ' border-radius:var(--radius-lg,16px);overflow:hidden;',
      ' box-shadow:var(--shadow-violet,0 8px 24px rgba(124,58,237,.3));}',
      '.bd-pwa-icon img{width:100%;height:100%;display:block;}',
      '.bd-pwa-title{margin:0 0 var(--space-2,8px);font-family:var(--font-display,system-ui);',
      ' font-size:var(--text-h3-size,22px);font-weight:var(--fw-extrabold,800);',
      ' color:var(--text-primary,#f8fafc);line-height:var(--lh-tight,1.2);}',
      '.bd-pwa-desc{margin:0 auto var(--space-6,24px);max-width:300px;',
      ' font-size:var(--text-sm-size,13px);color:var(--text-secondary,#c8c8e0);',
      ' line-height:var(--lh-relaxed,1.7);}',
      '.bd-pwa-install{width:100%;display:flex;align-items:center;justify-content:center;',
      ' gap:var(--space-2,8px);padding:var(--space-4,16px);border:0;cursor:pointer;color:#fff;',
      ' border-radius:var(--radius-lg,16px);font-family:var(--font-display,system-ui);',
      ' font-size:var(--text-body-size,16px);font-weight:var(--fw-bold,700);',
      ' background:linear-gradient(135deg,var(--violet-600,#7c3aed),var(--violet-700,#6d28d9));',
      ' box-shadow:var(--shadow-violet,0 8px 24px rgba(124,58,237,.3));',
      ' transition:transform var(--transition-fast,.15s) ease;}',
      '.bd-pwa-install:hover{transform:translateY(-2px);}',
      '.bd-pwa-install:active{transform:translateY(0);}',
      '.bd-pwa-install svg{width:20px;height:20px;}',
      '.bd-pwa-later{margin-top:var(--space-3,12px);width:100%;padding:var(--space-3,12px);',
      ' background:transparent;border:0;cursor:pointer;color:var(--text-muted,#6b6b9a);',
      ' font-family:var(--font-display,system-ui);font-size:var(--text-sm-size,13px);',
      ' font-weight:var(--fw-semibold,600);}',
      '.bd-pwa-later:hover{color:var(--text-secondary,#c8c8e0);}',
      '.bd-pwa-steps{margin:0 0 var(--space-2,8px);padding:0;list-style:none;text-align:start;}',
      '.bd-pwa-steps li{display:flex;align-items:center;gap:var(--space-3,12px);',
      ' padding:var(--space-3,12px) 0;border-bottom:1px solid var(--border-color,#1a1a2e);',
      ' font-size:var(--text-sm-size,13px);color:var(--text-secondary,#c8c8e0);}',
      '.bd-pwa-steps li:last-child{border-bottom:0;}',
      '.bd-pwa-steps .n{flex:0 0 26px;height:26px;display:grid;place-items:center;',
      ' border-radius:var(--radius-full,999px);background:var(--violet-600,#7c3aed);color:#fff;',
      ' font-weight:var(--fw-bold,700);font-size:13px;}',
      '.bd-pwa-steps b{color:var(--text-primary,#f8fafc);}',
      '.bd-pwa-note{margin:0 auto var(--space-4,16px);max-width:320px;',
      ' font-size:var(--text-sm-size,13px);line-height:var(--lh-relaxed,1.7);',
      ' color:var(--text-secondary,#c8c8e0);}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── bottom sheet (built on demand) ─────────────────────────────────── */
  var backdrop = null;

  function buildSheet() {
    if (backdrop) return backdrop;
    injectStyles();
    backdrop = document.createElement('div');
    backdrop.id = 'bd-pwa-backdrop';
    backdrop.innerHTML =
      '<div id="bd-pwa-sheet" role="dialog" aria-modal="true" aria-labelledby="bd-pwa-title">' +
        '<div class="bd-pwa-handle"></div>' +
        '<div class="bd-pwa-body"></div>' +
      '</div>';
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop || e.target.classList.contains('bd-pwa-later')) { close(); return; }
      if (e.target.closest && e.target.closest('.bd-pwa-install')) {
        triggerInstall({ fromSheet: true });
      }
    });
    return backdrop;
  }

  function iconHTML() {
    return '<div class="bd-pwa-icon"><img src="/shared/icons/icon-192.png" alt="BeyonDegrees" width="76" height="76"></div>';
  }

  function renderMain() {
    buildSheet().querySelector('.bd-pwa-body').innerHTML =
      iconHTML() +
      '<h2 class="bd-pwa-title" id="bd-pwa-title">' + t('install.title', 'Install BeyonDegrees') + '</h2>' +
      '<p class="bd-pwa-desc">' + t('install.desc', 'Add the app to your home screen for quick access and a smoother, app-like experience.') + '</p>' +
      '<button class="bd-pwa-install" type="button">' + DL_SVG + '<span>' + t('install.cta', 'Install app') + '</span></button>' +
      '<button class="bd-pwa-later" type="button">' + t('install.later', 'Maybe later') + '</button>';
  }

  function renderIOS() {
    buildSheet().querySelector('.bd-pwa-body').innerHTML =
      iconHTML() +
      '<h2 class="bd-pwa-title" id="bd-pwa-title">' + t('install.ios_title', 'Add to Home Screen') + '</h2>' +
      '<p class="bd-pwa-desc">' + t('install.ios_sub', 'Just 3 steps to install on iPhone/iPad:') + '</p>' +
      '<ol class="bd-pwa-steps">' +
        '<li><span class="n">1</span><span>' + t('install.ios_1', 'Tap the <b>Share</b> button in Safari.') + '</span></li>' +
        '<li><span class="n">2</span><span>' + t('install.ios_2', 'Choose <b>Add to Home Screen</b>.') + '</span></li>' +
        '<li><span class="n">3</span><span>' + t('install.ios_3', 'Tap <b>Add</b> in the top corner.') + '</span></li>' +
      '</ol>' +
      '<button class="bd-pwa-later" type="button">' + t('install.ios_done', 'Got it') + '</button>';
  }

  function renderUnavailable() {
    buildSheet().querySelector('.bd-pwa-body').innerHTML =
      iconHTML() +
      '<h2 class="bd-pwa-title" id="bd-pwa-title">' + t('install.title', 'Install BeyonDegrees') + '</h2>' +
      '<p class="bd-pwa-note">' + unavailableMessage() + '</p>' +
      '<button class="bd-pwa-later" type="button">' + t('install.ios_done', 'Got it') + '</button>';
  }

  function showSheet() {
    ensurePWAInstallAssets();
    buildSheet();
    if (isIOSSafari && !deferredPrompt) renderIOS(); else renderMain();
    requestAnimationFrame(function () { backdrop.classList.add('open'); });
  }
  function close() { if (backdrop) backdrop.classList.remove('open'); }

  function triggerInstall(opts) {
    opts = opts || {};
    ensurePWAInstallAssets();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        close();
      });
      return;
    }
    if (isIOSSafari) {
      renderIOS();
      requestAnimationFrame(function () { buildSheet().classList.add('open'); });
      return;
    }
    if (opts.fromSheet) {
      renderUnavailable();
      requestAnimationFrame(function () { buildSheet().classList.add('open'); });
      return;
    }
    showSheet();
  }

  /* ── desktop pill ───────────────────────────────────────────────────── */
  function setupPill() {
    injectStyles();
    var pill = document.createElement('button');
    pill.id = 'bd-pwa-pill';
    pill.type = 'button';
    pill.innerHTML = DL_SVG + '<span>' + t('menu.install', 'Install app') + '</span>';
    pill.addEventListener('click', function () { BDInstall.prompt(); });
    document.body.appendChild(pill);
    window.addEventListener('bd-installable', function () { pill.style.display = 'inline-flex'; });
    window.addEventListener('appinstalled', function () { pill.style.display = 'none'; });
    if (deferredPrompt || isIOSSafari) pill.style.display = 'inline-flex';
  }

  /* ── public API ─────────────────────────────────────────────────────── */
  var BDInstall = window.BDInstall = {
    isIOSSafari: isIOSSafari,
    canPrompt: function () { return !!deferredPrompt; },
    showSheet: showSheet,
    /* Trigger install: native prompt → iOS steps → informational sheet. */
    prompt: function () {
      triggerInstall();
    }
  };

  /* ── wiring ─────────────────────────────────────────────────────────── */
  if (isStandalone) return; // already installed — nothing to offer

  ensurePWAInstallAssets();

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    try { window.dispatchEvent(new Event('bd-installable')); } catch (err) {}
    if (backdrop && backdrop.classList.contains('open')) renderMain();
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    close();
  });

  function start() {
    if (isDesktop) {
      setupPill();
    } else if (isMobile && isHome) {
      /* Welcome sheet — once per device, on first home visit. */
      var welcomed = false;
      try { welcomed = localStorage.getItem(WELCOMED_KEY) === '1'; } catch (e) {}
      if (!welcomed) {
        try { localStorage.setItem(WELCOMED_KEY, '1'); } catch (e) {}
        setTimeout(showSheet, 700);
      }
    }
    /* Other mobile screens: no auto UI — the app-menu "Install app" item
       calls BDInstall.prompt(). */
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
