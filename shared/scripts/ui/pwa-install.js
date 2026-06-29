/* BeyonDegrees — PWA install prompt.
 *
 * Mobile pages (/mobile/...)  -> a design-system bottom sheet (like production).
 * Desktop pages (/desktop/...) -> a small floating "Tải ứng dụng" pill.
 *
 * - Chrome/Edge/Android: uses the `beforeinstallprompt` event.
 * - iOS Safari (no beforeinstallprompt): shows "Add to Home Screen" steps.
 * - Hides if the app is already installed / running standalone.
 * - "Để sau" snoozes the sheet for a few days.
 *
 * Styling uses the design-system CSS variables already loaded on the page, so
 * it follows the active dark/light theme automatically.
 */
(function () {
  'use strict';

  // Already running as an installed app → nothing to offer.
  var isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (isStandalone) return;

  var ua = navigator.userAgent || '';
  var isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (/Macintosh/.test(ua) && 'ontouchend' in document);
  var isIOSSafari = isIOS && !/crios|fxios|edgios/i.test(ua);

  // Which version is this page? Mobile gets the bottom sheet.
  var isMobileVersion = location.pathname.indexOf('/mobile/') !== -1;

  var deferredPrompt = null;
  var ICON = '/shared/icons/icon-192.png';
  var DL_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/>' +
    '<path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>';

  function injectStyles() {
    if (document.getElementById('bd-pwa-style')) return;
    var s = document.createElement('style');
    s.id = 'bd-pwa-style';
    s.textContent = [
      /* ---------- desktop floating pill ---------- */
      '#bd-pwa-pill{position:fixed;right:16px;bottom:16px;z-index:var(--z-modal,111);',
      ' display:none;align-items:center;gap:var(--space-2,8px);padding:12px 18px;border:0;',
      ' border-radius:var(--radius-full,999px);cursor:pointer;color:#fff;',
      ' font-family:var(--font-display,system-ui);font-weight:var(--fw-bold,700);font-size:14px;',
      ' background:linear-gradient(135deg,var(--violet-600,#7c3aed),var(--violet-700,#6d28d9));',
      ' box-shadow:var(--shadow-violet,0 8px 24px rgba(124,58,237,.45));',
      ' transition:transform var(--transition-fast,.15s) ease;}',
      '#bd-pwa-pill:hover{transform:translateY(-2px);}',
      '#bd-pwa-pill svg{width:18px;height:18px;}',

      /* ---------- mobile bottom sheet ---------- */
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
      ' transition:transform var(--transition-fast,.15s) ease,box-shadow var(--transition-fast,.15s) ease;}',
      '.bd-pwa-install:hover{transform:translateY(-2px);}',
      '.bd-pwa-install:active{transform:translateY(0);box-shadow:var(--shadow-violet-sm,0 4px 12px rgba(124,58,237,.2));}',
      '.bd-pwa-install svg{width:20px;height:20px;}',
      '.bd-pwa-later{margin-top:var(--space-3,12px);width:100%;padding:var(--space-3,12px);',
      ' background:transparent;border:0;cursor:pointer;color:var(--text-muted,#6b6b9a);',
      ' font-family:var(--font-display,system-ui);font-size:var(--text-sm-size,13px);',
      ' font-weight:var(--fw-semibold,600);transition:color var(--transition-fast,.15s) ease;}',
      '.bd-pwa-later:hover{color:var(--text-secondary,#c8c8e0);}',

      /* iOS step list */
      '.bd-pwa-steps{margin:0 0 var(--space-2,8px);padding:0;list-style:none;text-align:left;}',
      '.bd-pwa-steps li{display:flex;align-items:center;gap:var(--space-3,12px);',
      ' padding:var(--space-3,12px) 0;border-bottom:1px solid var(--border-color,#1a1a2e);',
      ' font-size:var(--text-sm-size,13px);color:var(--text-secondary,#c8c8e0);}',
      '.bd-pwa-steps li:last-child{border-bottom:0;}',
      '.bd-pwa-steps .n{flex:0 0 26px;height:26px;display:grid;place-items:center;',
      ' border-radius:var(--radius-full,999px);background:var(--violet-600,#7c3aed);color:#fff;',
      ' font-weight:var(--fw-bold,700);font-size:13px;}',
      '.bd-pwa-steps b{color:var(--text-primary,#f8fafc);}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ---------------- desktop pill ---------------- */
  function setupPill() {
    var pill = document.createElement('button');
    pill.id = 'bd-pwa-pill';
    pill.type = 'button';
    pill.setAttribute('aria-label', 'Tải ứng dụng');
    pill.innerHTML = DL_SVG + '<span>Tải ứng dụng</span>';
    document.body.appendChild(pill);

    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
      pill.style.display = 'inline-flex';
    });
    window.addEventListener('appinstalled', function () {
      deferredPrompt = null; pill.style.display = 'none';
    });
    pill.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null; pill.style.display = 'none';
      });
    });
    if (isIOSSafari) pill.style.display = 'inline-flex'; // unlikely on desktop, harmless
  }

  /* ---------------- mobile bottom sheet ---------------- */
  function setupSheet() {
    var backdrop = document.createElement('div');
    backdrop.id = 'bd-pwa-backdrop';

    // The sheet always leads with the download button on every platform.
    function mainBody() {
      return '<div class="bd-pwa-icon"><img src="' + ICON + '" alt="BeyonDegrees" width="76" height="76"></div>' +
        '<h2 class="bd-pwa-title" id="bd-pwa-title">Cài đặt BeyonDegrees</h2>' +
        '<p class="bd-pwa-desc">Thêm ứng dụng vào màn hình chính để mở nhanh và dùng mượt như app thật.</p>' +
        '<button class="bd-pwa-install" type="button">' + DL_SVG + '<span>Cài đặt ứng dụng</span></button>' +
        '<button class="bd-pwa-later" type="button">Để sau</button>';
    }
    // iOS can't trigger install programmatically — only reached if an iPhone
    // user taps the button, since there's genuinely no other path on iOS.
    function iosSteps() {
      return '<div class="bd-pwa-icon"><img src="' + ICON + '" alt="BeyonDegrees" width="76" height="76"></div>' +
        '<h2 class="bd-pwa-title" id="bd-pwa-title">Thêm vào màn hình chính</h2>' +
        '<p class="bd-pwa-desc">Chỉ 3 bước để cài trên iPhone/iPad:</p>' +
        '<ol class="bd-pwa-steps">' +
          '<li><span class="n">1</span><span>Bấm nút <b>Chia sẻ</b> ở thanh dưới Safari.</span></li>' +
          '<li><span class="n">2</span><span>Chọn <b>Thêm vào MH chính</b>.</span></li>' +
          '<li><span class="n">3</span><span>Bấm <b>Thêm</b> ở góc trên.</span></li>' +
        '</ol>' +
        '<button class="bd-pwa-later" type="button">Đã hiểu</button>';
    }

    backdrop.innerHTML =
      '<div id="bd-pwa-sheet" role="dialog" aria-modal="true" aria-labelledby="bd-pwa-title">' +
        '<div class="bd-pwa-handle"></div>' +
        '<div class="bd-pwa-body">' + mainBody() + '</div>' +
      '</div>';
    document.body.appendChild(backdrop);

    var sheetBody = backdrop.querySelector('.bd-pwa-body');

    function open() { requestAnimationFrame(function () { backdrop.classList.add('open'); }); }
    function close() { backdrop.classList.remove('open'); }

    backdrop.addEventListener('click', function (e) {
      // Close on dim-area tap or any "later / đã hiểu" button.
      if (e.target === backdrop || e.target.classList.contains('bd-pwa-later')) {
        close();
        return;
      }
      // The install button (and its inner icon/span) → trigger install.
      if (e.target.closest && e.target.closest('.bd-pwa-install')) {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.finally(function () { deferredPrompt = null; close(); });
        } else if (isIOSSafari) {
          sheetBody.innerHTML = iosSteps();
        }
      }
    });

    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
    });
    window.addEventListener('appinstalled', function () {
      deferredPrompt = null; close();
    });

    // Always surface the install button on load — don't wait for the browser's
    // installability heuristic.
    setTimeout(open, 500);
  }

  function ready() {
    injectStyles();
    if (isMobileVersion) setupSheet();
    else setupPill();
  }

  if (document.body) ready();
  else document.addEventListener('DOMContentLoaded', ready);
})();
