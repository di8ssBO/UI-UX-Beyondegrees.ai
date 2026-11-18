/**
 * tab-lock.js — BeyonDegrees.ai
 * ─────────────────────────────────────────────────────────────
 * Đảm bảo bottom-nav tab đúng được highlight trên các trang
 * "deep" (detail, sub-feature) mà URL không khớp trực tiếp
 * với tab href.
 *
 * Cách dùng:
 *   <body data-lock-tab="t2">   ← lock vào tab Disciplines
 *
 * Nếu không có data-lock-tab, tự detect từ URL path.
 *
 * Tab map:
 *   t1 = Home        (onboarding/home)
 *   t2 = Disciplines (discipline/*)
 *   t3 = Majors      (major/*)
 *   t4 = Universities (university/*)
 *   t5 = Profile     (profile/*)
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  const URL_TAB_MAP = [
    { segment: 'discipline', tab: 't2' },
    { segment: 'major',      tab: 't3' },
    { segment: 'university', tab: 't4' },
    { segment: 'profile',    tab: 't5' },
    { segment: 'home',       tab: 't1' },
    { segment: 'onboarding', tab: 't1' },
    { segment: 'quiz',       tab: 't1' },
    { segment: 'results',    tab: 't1' },
  ];

  function resolveTab() {
    // 1) Explicit lock via <body data-lock-tab="tN">
    const locked = document.body && document.body.dataset.lockTab;
    if (locked) return locked;

    // 2) Auto-detect từ URL segments
    const segments = window.location.pathname
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean);

    for (const { segment, tab } of URL_TAB_MAP) {
      if (segments.includes(segment)) return tab;
    }

    return null;
  }

  function applyLock() {
    const targetTab = resolveTab();
    if (!targetTab) return;

    const allTabs = document.querySelectorAll('[data-tab]');
    allTabs.forEach(el => {
      if (el.dataset.tab === targetTab) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // Chạy sau DOMContentLoaded để override bất kỳ active nào đã set trong HTML
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLock);
  } else {
    applyLock();
  }
})();
