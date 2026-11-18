(function () {
  "use strict";

  var MAJORS = [
    { v: "cs", label: "Computer Science", emoji: "💻", ai: true },
    { v: "ds", label: "Data Science & AI", emoji: "🤖", ai: true },
    { v: "design", label: "Design & UX", emoji: "🎨", ai: true },
    { v: "eng", label: "Engineering", emoji: "⚙️" },
    { v: "med", label: "Medicine", emoji: "🩺" },
    { v: "biz", label: "Business", emoji: "📊" },
    { v: "psy", label: "Psychology", emoji: "🧠" },
    { v: "econ", label: "Economics", emoji: "📈" },
    { v: "law", label: "Law", emoji: "⚖️" },
    { v: "arch", label: "Architecture", emoji: "🏛️" },
    { v: "bio", label: "Biology", emoji: "🔬" },
    { v: "comm", label: "Communications", emoji: "📣" }
  ];

  var STUDY = [
    { v: "abroad", label: "Abroad", emoji: "🌍" },
    { v: "home", label: "My Country", emoji: "🏠" },
    { v: "either", label: "Either", emoji: "✨" }
  ];

  var DEGREE = [
    { v: "bachelor", label: "Bachelor's", emoji: "🎓" },
    { v: "master", label: "Master's", emoji: "📚" },
    { v: "phd", label: "PhD", emoji: "🔬" },
    { v: "associate", label: "Associate's", emoji: "📜" }
  ];

  var AI_LOCATION = "Ho Chi Minh City, Vietnam";

  var params = new URLSearchParams(window.location.search);
  var device = document.body.getAttribute("data-device") || "mobile";
  var theme = normalizeTheme(params.get("theme")) || normalizeTheme(readStorage("bd-theme")) || "dark";

  var state = {
    location: "",
    studyWhere: null,
    degree: null,
    knowMajor: false,
    major: null,
    majorQuery: "",
    majorOpen: false,
    avatarUrl: null,
    locStatus: "idle" // idle | detecting | suggest | done
  };

  var root = document.getElementById("cp-app");
  var els = {};
  var detectT1, detectT2;

  applyTheme();
  hydrateState();
  renderShell();
  cacheEls();
  syncStateToControls();
  bindEvents();
  update();
  if (state.location.trim()) syncLocationUI();
  else startLocationDetection();

  /* ── Helpers ─────────────────────────────────────────────── */
  function normalizeTheme(v) {
    return v === "light" || v === "dark" ? v : "";
  }

  function readStorage(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return ""; }
  }

  function writeStorage(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) {}
  }

  function readJson(key) {
    try {
      var raw = readStorage(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function hydrateState() {
    var saved = readJson("bd-onboarding") || {};
    state.location = saved.location || state.location;
    state.studyWhere = normalizeStudyWhere(saved.studyWhere) || state.studyWhere;
    state.degree = saved.degree || state.degree;
    state.knowMajor = !!saved.knowMajor;
    state.major = saved.knowMajor ? (saved.major || null) : null;
    var avatar = readStorage("bd-avatar") || readStorage("bd-profile-avatar");
    if (avatar) state.avatarUrl = avatar;
    if (state.location.trim()) state.locStatus = "done";
  }

  function normalizeStudyWhere(value) {
    if (value === "in-country" || value === "my-country") return "home";
    return value || null;
  }

  function syncStateToControls() {
    if (state.avatarUrl && els.avatarInner) {
      els.avatarInner.style.backgroundImage = "url(" + JSON.stringify(state.avatarUrl) + ")";
      els.avatar.classList.add("has-image");
    }
    if (els.location) els.location.value = state.location || "";
    if (state.major) {
      var m = findMajor(state.major);
      if (m) {
        state.majorQuery = m.label;
        if (els.majorQ) els.majorQ.value = m.label;
      }
    }
    syncLocationUI();
    renderMajorTag();
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ── Theme ───────────────────────────────────────────────── */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    writeStorage("bd-theme", theme);
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    applyTheme();
    updateThemeToggle();
    var next = new URLSearchParams(window.location.search);
    next.set("theme", theme);
    window.history.replaceState(null, "", window.location.pathname + "?" + next.toString());
  }

  function updateThemeToggle() {
    if (!els.themeIcon || !els.themeText) return;
    els.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    els.themeText.textContent = theme === "dark" ? "Light" : "Dark";
  }

  /* ── Markup ──────────────────────────────────────────────── */
  function renderShell() {
    root.innerHTML = [
      '<div class="cp-bg cp-bg-dark" aria-hidden="true">',
      '<div class="cp-blob cp-blob-1"></div>',
      '<div class="cp-blob cp-blob-2"></div>',
      '<div class="cp-blob cp-blob-3"></div>',
      "</div>",
      '<div class="cp-bg cp-bg-light" aria-hidden="true"></div>',

      '<button class="cp-theme-toggle" type="button" data-cp-theme aria-label="Toggle theme">',
      '<span class="cp-theme-icon" aria-hidden="true"></span>',
      '<span class="cp-theme-text"></span>',
      "</button>",

      '<main class="cp-main">',
      '<div class="cp-logo">',
      '<img src="/shared/beyondegrees-logo-mark.png" alt="">',
      "<strong>BeyonDegrees<span>.ai</span></strong>",
      "</div>",

      '<div class="cp-chip"><span class="cp-dot"></span>AI-Powered Setup</div>',

      '<h1 class="cp-title">Complete Your Profile</h1>',
      '<p class="cp-subtitle">A few quick details so our AI can match you to the right majors and universities.</p>',

      '<section class="cp-card">',
      '<div class="cp-card-hairline"></div>',

      // Avatar + strength
      '<div class="cp-id-row">',
      '<div class="cp-avatar" data-cp-avatar role="button" tabindex="0" aria-label="Upload profile photo">',
      '<div class="cp-avatar-ring"></div>',
      '<div class="cp-avatar-inner"><span class="cp-avatar-ph" aria-hidden="true">📷</span></div>',
      '<div class="cp-avatar-edit" aria-hidden="true">✏️</div>',
      "</div>",
      '<div class="cp-strength">',
      '<div class="cp-strength-head">',
      '<span class="cp-strength-label">Profile strength</span>',
      '<span class="cp-strength-pct" data-cp-pct>0%</span>',
      "</div>",
      '<div class="cp-strength-bar"><div class="cp-strength-fill" data-cp-fill></div></div>',
      '<div class="cp-strength-msg"><span data-cp-ai-emoji>👋</span><span data-cp-ai-msg></span></div>',
      "</div>",
      "</div>",
      '<input type="file" accept="image/*" data-cp-file hidden>',

      // Location
      '<div class="cp-field">',
      '<label class="cp-label" for="cp-location">📍 Location</label>',
      '<div class="cp-input-wrap">',
      '<input class="cp-input" id="cp-location" data-cp-location placeholder="Where are you based?" autocomplete="address-level2">',
      "</div>",
      '<div class="cp-loc-detecting" data-cp-loc-detecting hidden>',
      '<span class="cp-spinner"></span>AI is detecting your location…',
      "</div>",
      '<button class="cp-loc-suggest" type="button" data-cp-loc-suggest hidden>',
      '<span aria-hidden="true">✦</span>',
      '<span class="cp-loc-suggest-pre">AI suggests</span>',
      "<span>" + esc(AI_LOCATION) + "</span>",
      '<span class="cp-loc-suggest-use">· Use</span>',
      "</button>",
      "</div>",

      // Study where
      '<div class="cp-field">',
      '<label class="cp-label">I want to study</label>',
      '<div class="cp-seg-row" data-cp-study>' + segButtons(STUDY) + "</div>",
      "</div>",

      // Degree
      '<div class="cp-field">',
      '<label class="cp-label">I\'m working toward a…</label>',
      '<div class="cp-degree-grid" data-cp-degree>' + segButtons(DEGREE) + "</div>",
      "</div>",

      // Know-major toggle
      '<button class="cp-know" type="button" data-cp-know aria-pressed="false">',
      '<span class="cp-check" data-cp-check></span>',
      '<span class="cp-know-label">I already know what I want to study</span>',
      '<span class="cp-know-hint" data-cp-know-hint>OPTIONAL</span>',
      "</button>",

      // Major area
      '<div class="cp-major" data-cp-major hidden>',
      '<label class="cp-label" for="cp-major-q">Preferred Major</label>',
      '<div class="cp-ai-picks">',
      '<span class="cp-ai-picks-label"><span aria-hidden="true">✦</span>AI PICKS</span>',
      aiPickButtons(),
      "</div>",
      '<div class="cp-input-wrap">',
      '<input class="cp-input" id="cp-major-q" data-cp-major-q placeholder="Search a major…" autocomplete="off">',
      '<div class="cp-dropdown" data-cp-dropdown hidden></div>',
      "</div>",
      '<div class="cp-major-tag" data-cp-major-tag hidden>',
      '<span data-cp-major-tag-text></span>',
      '<button class="cp-major-clear" type="button" data-cp-major-clear aria-label="Remove major">✕</button>',
      "</div>",
      "</div>",

      // AI guide
      '<div class="cp-guide" data-cp-guide>',
      '<span class="cp-guide-emoji" aria-hidden="true">🤖</span>',
      "<div>",
      '<div class="cp-guide-title">No worries — that\'s what we\'re here for.</div>',
      '<div class="cp-guide-body">Our AI will guide you to your perfect major through a quick <b>30-question quiz</b> after setup.</div>',
      "</div>",
      "</div>",

      // Continue
      '<button class="cp-cta" type="button" data-cp-continue><span data-cp-cta-label>Continue</span> <span class="cp-cta-arrow" aria-hidden="true">→</span></button>',
      "</section>",

      '<p class="cp-note">🔒 Your data stays private. Edit anytime in settings.</p>',
      "</main>"
    ].join("");
  }

  function segButtons(list) {
    return list.map(function (o) {
      return '<button class="cp-seg" type="button" data-val="' + o.v + '">' +
        '<span class="cp-seg-emoji" aria-hidden="true">' + o.emoji + "</span>" + esc(o.label) +
        "</button>";
    }).join("");
  }

  function aiPickButtons() {
    return MAJORS.filter(function (m) { return m.ai; }).map(function (m) {
      return '<button class="cp-chip-btn" type="button" data-val="' + m.v + '">' +
        m.emoji + " " + esc(m.label) + "</button>";
    }).join("");
  }

  /* ── Cache + bind ────────────────────────────────────────── */
  function cacheEls() {
    els.themeIcon = root.querySelector(".cp-theme-icon");
    els.themeText = root.querySelector(".cp-theme-text");
    els.pct = root.querySelector("[data-cp-pct]");
    els.fill = root.querySelector("[data-cp-fill]");
    els.aiEmoji = root.querySelector("[data-cp-ai-emoji]");
    els.aiMsg = root.querySelector("[data-cp-ai-msg]");
    els.avatar = root.querySelector("[data-cp-avatar]");
    els.avatarInner = root.querySelector(".cp-avatar-inner");
    els.file = root.querySelector("[data-cp-file]");
    els.location = root.querySelector("[data-cp-location]");
    els.locDetecting = root.querySelector("[data-cp-loc-detecting]");
    els.locSuggest = root.querySelector("[data-cp-loc-suggest]");
    els.study = root.querySelector("[data-cp-study]");
    els.degree = root.querySelector("[data-cp-degree]");
    els.know = root.querySelector("[data-cp-know]");
    els.check = root.querySelector("[data-cp-check]");
    els.knowHint = root.querySelector("[data-cp-know-hint]");
    els.major = root.querySelector("[data-cp-major]");
    els.majorQ = root.querySelector("[data-cp-major-q]");
    els.dropdown = root.querySelector("[data-cp-dropdown]");
    els.majorTag = root.querySelector("[data-cp-major-tag]");
    els.majorTagText = root.querySelector("[data-cp-major-tag-text]");
    els.guide = root.querySelector("[data-cp-guide]");
    els.ctaLabel = root.querySelector("[data-cp-cta-label]");
  }

  function bindEvents() {
    updateThemeToggle();
    root.querySelector("[data-cp-theme]").addEventListener("click", toggleTheme);

    // Avatar
    els.avatar.addEventListener("click", function () { els.file.click(); });
    els.avatar.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); els.file.click(); }
    });
    els.file.addEventListener("change", onAvatarFile);

    // Location
    els.location.addEventListener("input", function (e) {
      state.location = e.target.value;
      state.locStatus = "done";
      syncLocationUI();
      update();
    });
    els.locSuggest.addEventListener("click", function () {
      state.location = AI_LOCATION;
      state.locStatus = "done";
      els.location.value = AI_LOCATION;
      syncLocationUI();
      update();
    });

    // Segmented
    els.study.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-val]");
      if (!btn) return;
      state.studyWhere = state.studyWhere === btn.dataset.val ? null : btn.dataset.val;
      update();
    });
    els.degree.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-val]");
      if (!btn) return;
      state.degree = state.degree === btn.dataset.val ? null : btn.dataset.val;
      update();
    });

    // Know-major
    els.know.addEventListener("click", function () {
      state.knowMajor = !state.knowMajor;
      update();
    });

    // Major picks (AI chips)
    els.major.querySelector(".cp-ai-picks").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-val]");
      if (!btn) return;
      pickMajor(btn.dataset.val);
    });

    // Major search
    els.majorQ.addEventListener("input", function (e) {
      state.majorQuery = e.target.value;
      state.majorOpen = true;
      renderDropdown();
    });
    els.majorQ.addEventListener("focus", function () {
      state.majorOpen = true;
      renderDropdown();
    });
    els.dropdown.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-val]");
      if (!btn) return;
      pickMajor(btn.dataset.val);
    });
    els.majorTag.querySelector("[data-cp-major-clear]").addEventListener("click", clearMajor);

    // Close dropdown on outside click
    document.addEventListener("click", function (e) {
      if (!els.major.contains(e.target)) {
        state.majorOpen = false;
        renderDropdown();
      }
    });

    // Continue
    root.querySelector("[data-cp-continue]").addEventListener("click", onContinue);
  }

  /* ── Avatar ──────────────────────────────────────────────── */
  function onAvatarFile(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      state.avatarUrl = r.result;
      els.avatarInner.style.backgroundImage = "url(" + JSON.stringify(r.result) + ")";
      els.avatar.classList.add("has-image");
      update();
    };
    r.readAsDataURL(f);
  }

  /* ── Major ───────────────────────────────────────────────── */
  function findMajor(v) {
    return MAJORS.filter(function (m) { return m.v === v; })[0] || null;
  }

  function pickMajor(v) {
    var m = findMajor(v);
    if (!m) return;
    state.major = v;
    state.majorQuery = m.label;
    state.majorOpen = false;
    els.majorQ.value = m.label;
    renderDropdown();
    renderMajorTag();
    update();
  }

  function clearMajor() {
    state.major = null;
    state.majorQuery = "";
    els.majorQ.value = "";
    renderMajorTag();
    update();
  }

  function renderDropdown() {
    if (!state.majorOpen) { els.dropdown.hidden = true; return; }
    var q = state.majorQuery.trim().toLowerCase();
    var list = MAJORS.filter(function (m) { return !q || m.label.toLowerCase().indexOf(q) !== -1; });
    if (!list.length) {
      els.dropdown.innerHTML = '<div class="cp-dropdown-empty">No majors found</div>';
    } else {
      els.dropdown.innerHTML = list.map(function (m) {
        return '<button class="cp-dropdown-item" type="button" data-val="' + m.v + '">' +
          '<span class="cp-dropdown-emoji" aria-hidden="true">' + m.emoji + "</span>" + esc(m.label) +
          "</button>";
      }).join("");
    }
    els.dropdown.hidden = false;
  }

  function renderMajorTag() {
    var m = state.major ? findMajor(state.major) : null;
    if (m) {
      els.majorTagText.textContent = m.emoji + "  " + m.label;
      els.majorTag.hidden = false;
    } else {
      els.majorTag.hidden = true;
    }
  }

  /* ── Location UI ─────────────────────────────────────────── */
  function startLocationDetection() {
    detectT1 = setTimeout(function () {
      if (state.locStatus === "idle") { state.locStatus = "detecting"; syncLocationUI(); }
    }, 600);
    detectT2 = setTimeout(function () {
      if (!state.location.trim()) { state.locStatus = "suggest"; syncLocationUI(); }
    }, 2200);
  }

  function syncLocationUI() {
    els.locDetecting.hidden = state.locStatus !== "detecting";
    els.locSuggest.hidden = !(state.locStatus === "suggest" && !state.location.trim());
  }

  /* ── Completeness ────────────────────────────────────────── */
  function completeness() {
    var done = 0;
    var total = 5;
    if (state.avatarUrl) done++;
    if (state.location.trim()) done++;
    if (state.studyWhere) done++;
    if (state.degree) done++;
    if (state.knowMajor ? !!state.major : false) done++;
    return Math.round((done / total) * 100);
  }

  function aiCopy(pct) {
    if (pct === 0) return { e: "👋", m: "Let's set up your profile!" };
    if (pct < 50) return { e: "💪", m: "Nice start — keep going!" };
    if (pct < 80) return { e: "🔥", m: "You're almost there!" };
    if (pct < 100) return { e: "⚡", m: "One more detail to go!" };
    return { e: "🎉", m: "All set — looking great!" };
  }

  /* ── Update view from state ──────────────────────────────── */
  function update() {
    var pct = completeness();
    var ai = aiCopy(pct);
    els.pct.textContent = pct + "%";
    els.fill.style.width = pct + "%";
    els.aiEmoji.textContent = ai.e;
    els.aiMsg.textContent = ai.m;

    setSegState(els.study, state.studyWhere);
    setSegState(els.degree, state.degree);

    els.know.classList.toggle("is-on", state.knowMajor);
    els.know.setAttribute("aria-pressed", state.knowMajor ? "true" : "false");
    els.check.textContent = state.knowMajor ? "✓" : "";
    els.knowHint.textContent = state.knowMajor ? "PICK ONE" : "OPTIONAL";

    els.major.hidden = !state.knowMajor;
    els.guide.hidden = state.knowMajor;

    els.ctaLabel.textContent = pct >= 80 ? "Continue to Quiz" : "Continue";
  }

  function setSegState(container, value) {
    container.querySelectorAll("[data-val]").forEach(function (btn) {
      btn.classList.toggle("is-on", btn.dataset.val === value);
    });
  }

  /* ── Continue ────────────────────────────────────────────── */
  function persist() {
    // Avatar → bd-avatar (read by shared/scripts/ui/bd-profile.js)
    if (state.avatarUrl) writeStorage("bd-avatar", state.avatarUrl);
    // Onboarding prefs → bd-onboarding (kept separate from auth's bd-profile)
    writeStorage("bd-onboarding", JSON.stringify({
      location: state.location.trim(),
      studyWhere: state.studyWhere,
      degree: state.degree,
      knowMajor: state.knowMajor,
      major: state.knowMajor ? state.major : null
    }));
  }

  function onContinue() {
    persist();
    var next = params.get("next");
    if (!next) {
      next = device === "desktop"
        ? "/desktop/onboarding/home/"
        : "/mobile/onboarding/home/index.html";
    }
    var btn = root.querySelector("[data-cp-continue]");
    if (btn) {
      btn.disabled = true;
      els.ctaLabel.textContent = "Saving…";
    }
    clearTimeout(detectT1);
    clearTimeout(detectT2);
    setTimeout(function () { window.location.href = next; }, 320);
  }
})();
