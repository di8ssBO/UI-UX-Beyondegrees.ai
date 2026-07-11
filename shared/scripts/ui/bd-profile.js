/* ─────────────────────────────────────────────────────────────
   BeyonDegrees — User Profile  (bd-profile.js)
   Keys:
     localStorage 'bd-profile' = { firstName, lastName }
     localStorage 'bd-avatar'  = base64 dataURL | null
   Usage:
     BDProfile.get()              → { firstName, lastName }
     BDProfile.getDisplayName()   → "Hoang Phuc"  (fallback: null)
     BDProfile.getInitials()      → "HP"
     BDProfile.save(fn, ln)       → writes name to localStorage
     BDProfile.saveAvatar(url)    → writes avatar dataURL to localStorage
     BDProfile.getAvatar()        → dataURL or null
     BDProfile.applyTabLabel()    → updates profile tab label on page
     BDProfile.applyNameDisplay() → updates .profile-name + initials
     BDProfile.applyAvatar()      → sets avatar image or initials
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

    getInitials: function () {
      var p = this.get();
      var fi = (p.firstName || '').trim().charAt(0).toUpperCase();
      var li = (p.lastName  || '').trim().charAt(0).toUpperCase();
      return (fi + li) || '?';
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

    applyAvatar: function () {
      var self = this;
      document.querySelectorAll('.avatar').forEach(function (el) {
        var dataURL = self.getAvatar();
        if (dataURL) {
          el.innerHTML = '<img src="' + dataURL + '" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">';
        } else {
          el.textContent = self.getInitials();
        }
      });
    },

    /* Updates <span class="tab-label"> inside the 5th tab-item */
    applyTabLabel: function () {
      var name = this.getFirstName() || this.getDisplayName();
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

    /* Updates .profile-name elements and initials (profile overview screen) */
    applyNameDisplay: function () {
      var name = this.getDisplayName();
      if (!name) return;
      document.querySelectorAll('.profile-name').forEach(function (el) {
        el.textContent = name;
      });
      /* Refresh initials only if no avatar image is set */
      if (!this.getAvatar()) {
        var initials = this.getInitials();
        document.querySelectorAll('.avatar').forEach(function (el) {
          if (!el.querySelector('img')) el.textContent = initials;
        });
      }
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
})();
