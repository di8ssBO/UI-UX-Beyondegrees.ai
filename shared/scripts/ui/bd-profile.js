/* ─────────────────────────────────────────────────────────────
   BeyonDegrees — User Profile  (bd-profile.js)
   Keys:
     localStorage 'bd-profile' = { firstName, lastName }
     localStorage 'bd-avatar'  = base64 dataURL | null
   Usage:
     BDProfile.get()              → { firstName, lastName }
     BDProfile.getDisplayName()   → "Hoang Phuc"  (fallback: null)
     BDProfile.save(fn, ln)       → writes name to localStorage
     BDProfile.saveAvatar(url)    → writes avatar dataURL to localStorage
     BDProfile.getAvatar()        → dataURL or null
     BDProfile.applyTabLabel()    → updates profile tab label on page
     BDProfile.applyNameDisplay() → updates .profile-name
     BDProfile.applyAvatar()      → sets avatar image or placeholder icon
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var KEY = 'bd-profile';

  var BDProfile = {
    get: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) {
          var p = JSON.parse(raw);
          if (p && (p.firstName || p.lastName)) return p;
        }
      } catch (e) {}
      /* Default seed — replaced when user saves from Profile Edit */
      return { firstName: 'Your', lastName: 'Name' };
    },

    getDisplayName: function () {
      var p = this.get();
      var name = ((p.firstName || '') + ' ' + (p.lastName || '')).trim();
      return name || null;
    },

    getFirstName: function () {
      return (this.get().firstName || '').trim();
    },

    save: function (firstName, lastName) {
      try {
        localStorage.setItem(KEY, JSON.stringify({
          firstName: (firstName || '').trim(),
          lastName:  (lastName  || '').trim()
        }));
      } catch (e) {}
    },

    saveAvatar: function (dataURL) {
      try { localStorage.setItem('bd-avatar', dataURL); } catch (e) {}
    },

    removeAvatar: function () {
      try { localStorage.removeItem('bd-avatar'); } catch (e) {}
    },

    getAvatar: function () {
      try { return localStorage.getItem('bd-avatar') || null; } catch (e) { return null; }
    },

    /* No photo set → a generic placeholder icon, never initials (a blank
       avatar shouldn't imply a name has been read/parsed). */
    AVATAR_PLACEHOLDER_SVG: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',

    applyAvatar: function () {
      var self = this;
      document.querySelectorAll('.avatar').forEach(function (el) {
        var dataURL = self.getAvatar();
        if (dataURL) {
          el.innerHTML = '<img src="' + dataURL + '" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">';
        } else {
          el.innerHTML = self.AVATAR_PLACEHOLDER_SVG;
        }
      });
    },

    /* Updates <span class="tab-label"> inside the 5th tab-item. This is
       the sole owner of that element's text (it intentionally does NOT
       carry data-i18n in markup) — i18n.js runs its own DOMContentLoaded
       pass *after* this one (bd-profile.js loads in <head>, i18n.js at
       the end of <body>), so if the label were i18n-managed too, every
       page load would silently stomp the name back to "Account". The
       untranslated-fallback branch below keeps it correctly localized
       when no name is set yet. */
    applyTabLabel: function () {
      var name = this.getFirstName() || this.getDisplayName();
      var fallback = (window.BDi18n && window.BDi18n.t) ? window.BDi18n.t('nav.account') : 'Account';
      var text = name || fallback;
      var selectors = [
        '.tab-item[data-tab="t5"] .tab-label',
        '.float-tab-bar .tab-item:last-child .tab-label'
      ];
      var updated = false;
      selectors.forEach(function (sel) {
        var els = document.querySelectorAll(sel);
        els.forEach(function (el) { el.textContent = text; updated = true; });
      });
      return updated;
    },

    /* Updates .profile-name elements (profile overview screen) */
    applyNameDisplay: function () {
      var name = this.getDisplayName();
      if (!name) return;
      document.querySelectorAll('.profile-name').forEach(function (el) {
        el.textContent = name;
      });
    }
  };

  window.BDProfile = BDProfile;

  /* Auto-run on DOM ready */
  function onReady() {
    BDProfile.applyTabLabel();
    BDProfile.applyNameDisplay();
    BDProfile.applyAvatar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  /* Keep the tab label's translated fallback ("Account"/"Tài khoản"/...)
     correct if the user switches language later at runtime, without
     needing every consuming page to remember to re-call applyTabLabel(). */
  new MutationObserver(function () { BDProfile.applyTabLabel(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
})();