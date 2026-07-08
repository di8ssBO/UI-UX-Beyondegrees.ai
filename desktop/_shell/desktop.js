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
        'settings.log_out': 'Log Out', 'settings.delete_account': 'Delete Account',
        'settings.security': 'Password & Security', 'settings.password': 'Password',
        'settings.password_desc': 'Keep your account sign-in protected.',
        'settings.edit': 'Edit', 'settings.devices': 'Signed-in devices',
        'settings.devices_desc': 'Current device and recent sessions.',
        'settings.password_modal_title': 'Change password',
        'settings.current_password': 'Current password', 'settings.new_password': 'New password',
        'settings.confirm_password': 'Confirm new password', 'settings.cancel': 'Cancel',
        'settings.done': 'Done', 'settings.password_mismatch': 'New passwords do not match.',
        'settings.password_updated': 'Password updated just now.',
        'settings.devices_modal_title': 'Signed-in devices', 'settings.current_device': 'Current device',
        'settings.other_devices': 'Other devices', 'settings.device_current_name': 'Windows desktop',
        'settings.device_current_meta': 'This browser · Active now',
        'settings.device_phone_name': 'iPhone 15', 'settings.device_phone_meta': 'Ho Chi Minh City · 2 hours ago',
        'settings.device_tablet_name': 'iPad', 'settings.device_tablet_meta': 'Hanoi · Yesterday',
        'settings.device_logout': 'Log out', 'settings.device_logged_out': 'Signed out',
        'settings.logout_all_devices': 'Log out of all devices',
        'settings.all_devices_logged_out': 'All devices signed out'
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
        'settings.log_out': 'Đăng xuất', 'settings.delete_account': 'Xóa tài khoản',
        'settings.security': 'Mật khẩu và bảo mật', 'settings.password': 'Mật khẩu',
        'settings.password_desc': 'Bảo vệ thông tin đăng nhập tài khoản của bạn.',
        'settings.edit': 'Chỉnh sửa', 'settings.devices': 'Thiết bị đã đăng nhập',
        'settings.devices_desc': 'Thiết bị hiện tại và các phiên gần đây.',
        'settings.password_modal_title': 'Đổi mật khẩu',
        'settings.current_password': 'Mật khẩu hiện tại', 'settings.new_password': 'Mật khẩu mới',
        'settings.confirm_password': 'Xác nhận mật khẩu mới', 'settings.cancel': 'Hủy bỏ',
        'settings.done': 'Xong', 'settings.password_mismatch': 'Mật khẩu mới không khớp.',
        'settings.password_updated': 'Đã cập nhật mật khẩu.',
        'settings.devices_modal_title': 'Thiết bị đã đăng nhập', 'settings.current_device': 'Thiết bị hiện tại',
        'settings.other_devices': 'Các thiết bị khác', 'settings.device_current_name': 'Máy tính Windows',
        'settings.device_current_meta': 'Trình duyệt này · Đang hoạt động',
        'settings.device_phone_name': 'iPhone 15', 'settings.device_phone_meta': 'TP. Hồ Chí Minh · 2 giờ trước',
        'settings.device_tablet_name': 'iPad', 'settings.device_tablet_meta': 'Hà Nội · Hôm qua',
        'settings.device_logout': 'Đăng xuất', 'settings.device_logged_out': 'Đã đăng xuất',
        'settings.logout_all_devices': 'Đăng xuất khỏi tất cả thiết bị',
        'settings.all_devices_logged_out': 'Đã đăng xuất tất cả thiết bị'
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

    var FALLBACK_EXTRA_T = {
      hi: {
        'settings.security': 'पासवर्ड और सुरक्षा',
        'settings.password': 'पासवर्ड',
        'settings.password_desc': 'अपने खाते के साइन-इन को सुरक्षित रखें।',
        'settings.edit': 'संपादित करें',
        'settings.devices': 'लॉग-इन डिवाइस',
        'settings.devices_desc': 'वर्तमान डिवाइस और हाल के सत्र।',
        'settings.password_modal_title': 'पासवर्ड बदलें',
        'settings.current_password': 'वर्तमान पासवर्ड',
        'settings.new_password': 'नया पासवर्ड',
        'settings.confirm_password': 'नए पासवर्ड की पुष्टि करें',
        'settings.cancel': 'रद्द करें',
        'settings.done': 'पूर्ण',
        'settings.password_mismatch': 'नए पासवर्ड मेल नहीं खाते।',
        'settings.password_updated': 'पासवर्ड अपडेट हो गया।',
        'settings.devices_modal_title': 'लॉग-इन डिवाइस',
        'settings.current_device': 'वर्तमान डिवाइस',
        'settings.other_devices': 'अन्य डिवाइस',
        'settings.device_current_name': 'Windows डेस्कटॉप',
        'settings.device_current_meta': 'यह ब्राउज़र · अभी सक्रिय',
        'settings.device_phone_name': 'iPhone 15',
        'settings.device_phone_meta': 'हो ची मिन्ह सिटी · 2 घंटे पहले',
        'settings.device_tablet_name': 'iPad',
        'settings.device_tablet_meta': 'हनोई · कल',
        'settings.device_logout': 'लॉग आउट',
        'settings.device_logged_out': 'लॉग आउट हो गया',
        'settings.logout_all_devices': 'सभी डिवाइस से लॉग आउट करें',
        'settings.all_devices_logged_out': 'सभी डिवाइस लॉग आउट हो गए'
      },
      fr: {
        'settings.security': 'Mot de passe et sécurité',
        'settings.password': 'Mot de passe',
        'settings.password_desc': 'Protégez la connexion à votre compte.',
        'settings.edit': 'Modifier',
        'settings.devices': 'Appareils connectés',
        'settings.devices_desc': 'Appareil actuel et sessions récentes.',
        'settings.password_modal_title': 'Modifier le mot de passe',
        'settings.current_password': 'Mot de passe actuel',
        'settings.new_password': 'Nouveau mot de passe',
        'settings.confirm_password': 'Confirmer le nouveau mot de passe',
        'settings.cancel': 'Annuler',
        'settings.done': 'Terminé',
        'settings.password_mismatch': 'Les nouveaux mots de passe ne correspondent pas.',
        'settings.password_updated': 'Mot de passe mis à jour.',
        'settings.devices_modal_title': 'Appareils connectés',
        'settings.current_device': 'Appareil actuel',
        'settings.other_devices': 'Autres appareils',
        'settings.device_current_name': 'Ordinateur Windows',
        'settings.device_current_meta': 'Ce navigateur · actif maintenant',
        'settings.device_phone_name': 'iPhone 15',
        'settings.device_phone_meta': 'Hô Chi Minh-Ville · il y a 2 heures',
        'settings.device_tablet_name': 'iPad',
        'settings.device_tablet_meta': 'Hanoï · hier',
        'settings.device_logout': 'Se déconnecter',
        'settings.device_logged_out': 'Déconnecté',
        'settings.logout_all_devices': 'Se déconnecter de tous les appareils',
        'settings.all_devices_logged_out': 'Tous les appareils sont déconnectés'
      },
      ar: {
        'settings.security': 'كلمة المرور والأمان',
        'settings.password': 'كلمة المرور',
        'settings.password_desc': 'حافظ على أمان تسجيل الدخول إلى حسابك.',
        'settings.edit': 'تعديل',
        'settings.devices': 'الأجهزة التي سجلت الدخول',
        'settings.devices_desc': 'الجهاز الحالي والجلسات الأخيرة.',
        'settings.password_modal_title': 'تغيير كلمة المرور',
        'settings.current_password': 'كلمة المرور الحالية',
        'settings.new_password': 'كلمة المرور الجديدة',
        'settings.confirm_password': 'تأكيد كلمة المرور الجديدة',
        'settings.cancel': 'إلغاء',
        'settings.done': 'تم',
        'settings.password_mismatch': 'كلمتا المرور الجديدتان غير متطابقتين.',
        'settings.password_updated': 'تم تحديث كلمة المرور.',
        'settings.devices_modal_title': 'الأجهزة التي سجلت الدخول',
        'settings.current_device': 'الجهاز الحالي',
        'settings.other_devices': 'الأجهزة الأخرى',
        'settings.device_current_name': 'سطح مكتب Windows',
        'settings.device_current_meta': 'هذا المتصفح · نشط الآن',
        'settings.device_phone_name': 'iPhone 15',
        'settings.device_phone_meta': 'مدينة هو تشي منه · منذ ساعتين',
        'settings.device_tablet_name': 'iPad',
        'settings.device_tablet_meta': 'هانوي · أمس',
        'settings.device_logout': 'تسجيل الخروج',
        'settings.device_logged_out': 'تم تسجيل الخروج',
        'settings.logout_all_devices': 'تسجيل الخروج من كل الأجهزة',
        'settings.all_devices_logged_out': 'تم تسجيل الخروج من كل الأجهزة'
      }
    };
    Object.keys(FALLBACK_EXTRA_T).forEach(function (lang) {
      Object.keys(FALLBACK_EXTRA_T[lang]).forEach(function (key) {
        FALLBACK_T[lang][key] = FALLBACK_EXTRA_T[lang][key];
      });
    });

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
      tf: function (key, vars) {
        var s = this.t(key);
        if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
        return s;
      },
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
    /* Match the shared engine: set _lang immediately, re-apply on DOMContentLoaded. */
    window.BDi18n.init();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { window.BDi18n.init(); });
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

  var desktopInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    desktopInstallPrompt = e;
  });
  window.addEventListener('appinstalled', function () {
    desktopInstallPrompt = null;
  });

  function ensureDesktopInstallAssets() {
    if (!document.querySelector('link[rel="manifest"]')) {
      var manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = '/mobile/manifest.json';
      document.head.appendChild(manifest);
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
    if ('serviceWorker' in navigator && !window.__BDDesktopSWRegistered) {
      window.__BDDesktopSWRegistered = true;
      var register = function () {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .catch(function (err) { console.warn('SW registration failed:', err); });
      };
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register, { once: true });
    }
  }

  function showDownloadInfo() {
    var modal = document.getElementById('bd-download-modal');
    if (modal) modal.classList.add('show');
  }

  function initDownloadButton() {
    var btn = document.getElementById('bd-download-app');
    if (!btn) return;
    btn.addEventListener('click', function () {
      ensureDesktopInstallAssets();
      if (desktopInstallPrompt) {
        desktopInstallPrompt.prompt();
        desktopInstallPrompt.userChoice.finally(function () {
          desktopInstallPrompt = null;
        });
        return;
      }
      if (window.BDInstall && typeof window.BDInstall.prompt === 'function') {
        window.BDInstall.prompt();
        return;
      }
      showDownloadInfo();
    });
  }

  /* ── Shared data ────────────────────────────────────────── */
  window.BD = window.BD || {};
  BD.disciplines = {
    kt: { name: 'Engineering & Technology',  short: 'Engineering',  icon: '⚙️', accClass: 'acc-kt', match: 92 },
    yt: { name: 'Medical & Health Sciences', short: 'Medical',      icon: '🩺', accClass: 'acc-yt', match: 78 },
    tn: { name: 'Natural Sciences',          short: 'Natural Sci',  icon: '🔬', accClass: 'acc-tn', match: 71 },
    xh: { name: 'Social Sciences',           short: 'Social Sci',   icon: '🧠', accClass: 'acc-xh', match: 64 },
    nv: { name: 'Humanities',                short: 'Humanities',   icon: '📜', accClass: 'acc-nv', match: 58 },
    nn: { name: 'Agricultural Sciences',     short: 'Agricultural', icon: '🌱', accClass: 'acc-nn', match: 43 }
  };

  /* ── i18n helper ────────────────────────────────────────── */
  function tr(key, fallback) {
    return (window.BDi18n && typeof window.BDi18n.t === 'function') ? window.BDi18n.t(key) : fallback;
  }
  /* Like tr(), but falls back to the default when the key is missing —
     BDi18n.t() echoes the key back when it has no translation for it. */
  function trOr(key, fallback) {
    var v = tr(key, fallback);
    return (!v || v === key) ? fallback : v;
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
    if      (h < 6)  { g = 'Good night';     em = '🌙'; }
    else if (h < 12) { g = 'Good morning';   em = '☀️'; }
    else if (h < 18) { g = 'Good afternoon'; em = '🔥'; }
    else             { g = 'Good evening';   em = '✨'; }
    var uname = '';
    try { uname = localStorage.getItem('bd-username') || ''; } catch (e) {}
    return uname
      ? g + ', <span class="greet-name">' + uname + '</span> ' + em
      : g + ' ' + em;
  }

  /* ── Nav config ─────────────────────────────────────────── */
  /* main = top of the sidebar; account = pinned to the bottom */
  function buildNav() {
    return {
      main: [
        { sec: tr('sidebar.explore', 'Explore') },
        { id: 'home',         href: '../../onboarding/home/',        label: tr('nav.about_me', 'About me'),       icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10' },
        { id: 'quiz',         href: '../../quiz/quiz-card/',         label: tr('nav.quiz', 'Quiz'),               icon: 'M9 9a3 3 0 115.8 1c-.7.8-1.8 1.2-1.8 2.5M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0' },
        { sec: tr('sidebar.results', 'Results') },
        { id: 'understand',   href: '../../results/understand-matches/', label: tr('nav.understand', 'Understand Matches'), icon: 'M9 15a6 6 0 100-12 6 6 0 000 12zM15 15a6 6 0 100-12 6 6 0 000 12' },
        { id: 'disciplines',  href: '../../discipline/match/',       label: tr('nav.disciplines', 'Disciplines'), icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5' },
        { id: 'majors',       href: '../../major/recommendations/',  label: tr('nav.majors', 'Majors'),           icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0v7m-6.5-3.5V11.5' },
        { id: 'universities', href: '../../university/matches/',     label: tr('nav.universities', 'Universities'), icon: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' }
      ],
      account: [
        { sec: tr('sidebar.account', 'Account') },
        { id: 'profile',      href: '../../profile/edit/',           label: 'My Account',                         icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0' },
        { id: 'settings',     href: '../../profile/settings/',       label: tr('nav.settings', 'Settings'),       icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 00-2-1.2L14.5 3h-5l-.4 2.6a7.4 7.4 0 00-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.4l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 002 1.2l.4 2.6h5l.4-2.6a7.4 7.4 0 002-1.2l2.4 1 2-3.4-2-1.6c.07-.4.1-.8.1-1.2z' }
      ]
    };
  }

  function icon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }

  /* ── Render shell ───────────────────────────────────────── */
  function renderShell() {
    var page  = document.body.getAttribute('data-page')  || '';
    var crumb = document.body.getAttribute('data-crumb') || '';
    var stats = getLiveStats();
    ensureDesktopInstallAssets();

    var navData = buildNav();
    var renderNav = function (arr) {
      return arr.map(function (n) {
        if (n.sec) return '<div class="nav-section-label">' + n.sec + '</div>';
        var active = n.id === page ? ' active' : '';
        return '<a class="nav-item' + active + '" href="' + n.href + '" title="' + n.label + '">'
          + icon(n.icon) + '<span class="nav-label">' + n.label + '</span></a>';
      }).join('');
    };
    var nav        = renderNav(navData.main);
    var accountNav = renderNav(navData.account);

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
      + '<div class="sidebar-bottom">'
      +   '<button class="nav-item nav-download" id="bd-download-app" type="button" title="Download">'
      +     icon('M12 3v12M7 10l5 5 5-5M5 21h14')
      +     '<span class="nav-label">Download</span>'
      +   '</button>'
      +   accountNav
      +   '<button class="nav-item nav-reset" id="bd-reset-account" type="button" title="' + trOr('sidebar.reset', 'Reset Account') + '">'
      +     icon('M23 4v6h-6M20.49 15a9 9 0 1 1-2.12-9.36L23 10')
      +     '<span class="nav-label">' + trOr('sidebar.reset', 'Reset Account') + '</span>'
      +   '</button>'
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
      + '</header>';

    var main = document.querySelector('.main');
    document.body.insertAdjacentHTML('afterbegin', sidebar);
    if (main) main.insertAdjacentHTML('afterbegin', topbar);
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    /* Reset modal — inject once into body */
    document.body.insertAdjacentHTML('beforeend',
      '<div class="bd-modal" id="bd-reset-modal">' +
        '<div class="card bd-mbox">' +
          '<h3>' + trOr('edit.reset_title', 'Reset Account?') + '</h3>' +
          '<p>' + trOr('edit.reset_body', 'This will clear all quiz progress and all your answers. You\'ll start fresh from Question 1.') + '</p>' +
          '<div class="bd-mbtns">' +
            '<button class="btn btn-danger" id="bd-reset-confirm">' + trOr('edit.reset_confirm', 'Reset & Start Over') + '</button>' +
            '<button class="btn btn-ghost" id="bd-reset-cancel">' + trOr('edit.cancel', 'Cancel') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>');

    document.body.insertAdjacentHTML('beforeend',
      '<div class="bd-modal" id="bd-download-modal">' +
        '<div class="card bd-mbox">' +
          '<h3>Download BeyonDegrees</h3>' +
          '<p>The app install prompt will appear when this browser allows it. You can also use your browser menu to install this app.</p>' +
          '<div class="bd-mbtns">' +
            '<button class="btn btn-primary" id="bd-download-ok">Got it</button>' +
          '</div>' +
        '</div>' +
      '</div>');

    var resetModal   = document.getElementById('bd-reset-modal');
    var resetConfirm = document.getElementById('bd-reset-confirm');
    var resetCancel  = document.getElementById('bd-reset-cancel');
    var downloadModal = document.getElementById('bd-download-modal');
    var downloadOk = document.getElementById('bd-download-ok');

    /* Reset Account — opens modal instead of window.confirm */
    var resetBtn = document.getElementById('bd-reset-account');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        resetModal.classList.add('show');
      });
    }
    resetCancel.addEventListener('click', function () {
      resetModal.classList.remove('show');
    });
    resetModal.addEventListener('click', function (e) {
      if (e.target === resetModal) resetModal.classList.remove('show');
    });
    resetConfirm.addEventListener('click', function () {
      try {
        localStorage.removeItem('quizProgress');
        localStorage.removeItem('quizMilestone');
        localStorage.removeItem('quizCounts');
        localStorage.removeItem('quizAnswerLog');
      } catch (e) {}
      window.location.href = '../../onboarding/home/';
    });
    if (downloadOk) {
      downloadOk.addEventListener('click', function () {
        downloadModal.classList.remove('show');
      });
    }
    if (downloadModal) {
      downloadModal.addEventListener('click', function (e) {
        if (e.target === downloadModal) downloadModal.classList.remove('show');
      });
    }

    initDownloadButton();
    initNavProgress();
    initSidebarPin();
  }

  /* ── Keep sidebar expanded after a tab switch — ONLY when the
     navigation was started from inside the sidebar ──
     A click on any sidebar link flags the next page (sessionStorage);
     that page then loads with the rail expanded and collapses back the
     moment the pointer moves outside it. Navigations that start anywhere
     else (content CTAs, links, redirects) leave the rail collapsed. */
  function initSidebarPin() {
    var sb = document.getElementById('bd-sidebar');
    if (!sb) return;

    /* Mark sidebar-originated navigations for the next page. */
    sb.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a[href]')) {
        try { sessionStorage.setItem('bd-nav-from-sidebar', '1'); } catch (e2) {}
      }
    });

    /* Only pin if we arrived here via a sidebar click. */
    var fromSidebar = false;
    try {
      fromSidebar = sessionStorage.getItem('bd-nav-from-sidebar') === '1';
      sessionStorage.removeItem('bd-nav-from-sidebar');
    } catch (e) {}
    if (!fromSidebar) return;

    sb.classList.add('bd-pinned');
    function unpin() {
      sb.classList.remove('bd-pinned');
      document.removeEventListener('mousemove', onMove, true);
      sb.removeEventListener('mouseleave', unpin);
    }
    function onMove(e) {
      if (!sb.contains(e.target)) unpin();
    }
    sb.addEventListener('mouseleave', unpin);
    document.addEventListener('mousemove', onMove, true);
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
