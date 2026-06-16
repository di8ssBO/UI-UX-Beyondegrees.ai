/* ─────────────────────────────────────────────────────────────
   BeyonDegrees — User Profile  (bd-profile.js)
   Key: localStorage 'bd-profile' = { firstName, lastName }
   Usage:
     BDProfile.get()           → { firstName, lastName }
     BDProfile.getDisplayName()→ "Hoang Phuc"  (fallback: null)
     BDProfile.save(fn, ln)    → writes to localStorage
     BDProfile.applyTabLabel() → updates all profile tab labels on page
     BDProfile.applyNameDisplay(selector) → updates .profile-name elements
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
      return { firstName: 'Hoang', lastName: 'Phuc' };
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

    /* Updates <span class="tab-label"> inside the 5th tab-item */
    applyTabLabel: function () {
      var name = this.getDisplayName();
      if (!name) return;
      /* Select by position (5th .tab-item) or by data-tab="t5" */
      var selectors = [
        '.tab-item[data-tab="t5"] .tab-label',
        '.float-tab-bar .tab-item:last-child .tab-label'
      ];
      var updated = false;
      selectors.forEach(function (sel) {
        var els = document.querySelectorAll(sel);
        els.forEach(function (el) { el.textContent = name; updated = true; });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
