/* utils */
/* BeyonDegrees.ai — Shared Utilities */

// Toast Notification System
const Toast = {
  show(message, duration = 2000, type = 'info') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },
  
  success(message, duration = 2000) {
    this.show(message, duration, 'success');
  },
  
  error(message, duration = 3000) {
    this.show(message, duration, 'error');
  },
  
  warning(message, duration = 2500) {
    this.show(message, duration, 'warning');
  }
};

// Clipboard Utilities
const Clipboard = {
  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      Toast.success(`Copied: ${text}`);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      Toast.error('Failed to copy');
      return false;
    }
  },
  
  async paste() {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.error('Failed to paste:', err);
      Toast.error('Failed to paste');
      return null;
    }
  }
};

// Format Utilities
const Format = {
  percent(value) {
    const num = parseFloat(value);
    return isNaN(num) ? '0%' : `${Math.round(num)}%`;
  },
  
  capitalize(str) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  },
  
  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  },
  
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  },
  
  formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  },
  
  truncate(str, length = 50) {
    if (typeof str !== 'string') return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  }
};

// DOM Utilities
const DOM = {
  query(selector) {
    return document.querySelector(selector);
  },
  
  queryAll(selector) {
    return document.querySelectorAll(selector);
  },
  
  create(tag, attributes = {}, content = '') {
    const el = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'innerHTML') {
        el.innerHTML = value;
      } else if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    });
    if (content) el.textContent = content;
    return el;
  },
  
  addClass(el, className) {
    if (el) el.classList.add(className);
    return el;
  },
  
  removeClass(el, className) {
    if (el) el.classList.remove(className);
    return el;
  },
  
  toggleClass(el, className) {
    if (el) el.classList.toggle(className);
    return el;
  },
  
  hasClass(el, className) {
    return el && el.classList.contains(className);
  },
  
  setStyle(el, styles) {
    if (el) Object.assign(el.style, styles);
    return el;
  }
};

// Event Utilities
const Events = {
  debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },
  
  throttle(func, delay = 300) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  },
  
  on(element, event, handler) {
    element && element.addEventListener(event, handler);
  },
  
  off(element, event, handler) {
    element && element.removeEventListener(event, handler);
  },
  
  once(element, event, handler) {
    const wrapper = (...args) => {
      handler.apply(this, args);
      element && element.removeEventListener(event, wrapper);
    };
    element && element.addEventListener(event, wrapper);
  }
};

// Storage Utilities
const Storage = {
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Storage error:', err);
      return false;
    }
  },
  
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Storage error:', err);
      return defaultValue;
    }
  },
  
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Storage error:', err);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error('Storage error:', err);
      return false;
    }
  }
};

// Export as global namespace
window.BD = {
  Toast,
  Clipboard,
  Format,
  DOM,
  Events,
  Storage
};

/* navigation */
/* BeyonDegrees.ai — Navigation & Page Management */

// Navigation Manager
const Navigation = {
  init() {
    this.initBottomNav();
    this.initSidebarNav();
    this.initActiveState();
    this.initScrollSpy();
  },
  
  initBottomNav() {
    const items = document.querySelectorAll('.bottom-nav-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href') || item.getAttribute('data-href');
        if (href && !href.startsWith('javascript')) {
          window.location.href = href;
        }
      });
    });
  },
  
  initSidebarNav() {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || link.getAttribute('data-href');
        if (href && !href.startsWith('javascript')) {
          e.preventDefault();
          window.location.href = href;
        }
      });
    });
  },
  
  initActiveState() {
    const currentPath = window.location.pathname;
    
    // Bottom nav items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const href = item.getAttribute('href') || item.getAttribute('data-href') || '';
      if (href && ((h => { const s = h.replace(/\/$/, '').split('/').filter(Boolean).pop(); return !!s && currentPath.includes(s); })(href))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Sidebar items
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-href') || '';
      if (href && ((h => { const s = h.replace(/\/$/, '').split('/').filter(Boolean).pop(); return !!s && currentPath.includes(s); })(href))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },
  
  initScrollSpy() {
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          const navItem = document.querySelector(`[data-nav="${sectionId}"]`);
          if (navItem) {
            document.querySelectorAll('[data-nav]').forEach(item => {
              item.classList.remove('active');
            });
            navItem.classList.add('active');
          }
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  },
  
  setActive(selector) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove('active'));
  },
  
  goTo(path) {
    window.location.href = path;
  }
};

// Page transition utilities
const PageTransition = {
  fadeOut(duration = 300) {
    document.body.style.opacity = '0';
    document.body.style.transition = `opacity ${duration}ms ease`;
  },
  
  fadeIn(duration = 300) {
    document.body.style.opacity = '1';
    document.body.style.transition = `opacity ${duration}ms ease`;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  document.body.style.opacity = '1';
});

// Global navigation export
window.Nav = Navigation;
window.PageTransition = PageTransition;

/* screen */
/* =====================================================
   AI LOADING SCREEN ENGINE — BeyonDegrees.ai
   25-second timeline filling the OpenAI wait with
   DNA analysis, milestones, and fun facts.
   ===================================================== */

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────── */
  const TOTAL_DURATION = 25; // seconds

  const PHASES = [
    { label: 'Đang phân tích',  title: 'DNA học thuật của bạn' },
    { label: 'Đang đánh giá',   title: 'Điểm mạnh nổi bật' },
    { label: 'Đang so sánh',    title: 'Hàng nghìn ngành học' },
    { label: 'Đang tính toán',  title: 'Độ tương thích của bạn' },
    { label: 'Đang hoàn thiện', title: 'Kết quả dành riêng cho bạn' },
  ];

  // DNA bar final values (%), staggered reveal start (seconds)
  const DNA_SCHEDULE = [
    { disc: 'kt', target: 78, start: 2.0 },
    { disc: 'yt', target: 45, start: 4.5 },
    { disc: 'nv', target: 62, start: 6.0 },
    { disc: 'nn', target: 31, start: 8.5 },
    { disc: 'xh', target: 55, start: 10.0 },
    { disc: 'tn', target: 68, start: 12.5 },
  ];

  const FUN_FACTS = [
    '73% sinh viên đổi ngành sau năm nhất vì chọn sai từ đầu.',
    'Người dùng BeyonDegrees đưa ra quyết định chọn ngành tự tin hơn 3.2× so với trung bình.',
    'Chỉ 18% học sinh có đủ thông tin về ngành học trước khi quyết định.',
    'AI phân tích 47 chiều dữ liệu từ 30 câu trả lời của bạn.',
    'Ngành phù hợp không chỉ dựa vào điểm số — tính cách quan trọng hơn 2.4×.',
    'BeyonDegrees đã giúp hơn 50,000 học sinh Việt Nam khám phá con đường phù hợp.',
  ];

  const MILESTONES = [
    { at: 5,  emoji: '🧬', title: 'Phân tích hoàn tất!',   sub: 'Đang đánh giá điểm mạnh của bạn...' },
    { at: 12, emoji: '⚡', title: 'Đã tìm thấy pattern!',  sub: 'Đang đối chiếu 2,400+ ngành học...' },
    { at: 20, emoji: '🎯', title: 'Gần xong rồi!',         sub: 'Đang cá nhân hoá kết quả cho bạn...' },
  ];

  /* ── State ──────────────────────────────────────── */
  let startTime      = null;
  let rafId          = null;
  let currentPhase   = -1;
  let currentFact    = 0;
  let factIntervalId = null;
  let dnaFired       = {};   // track which DNA bars have started

  /* ── Utils ──────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }

  /* ── Entry Point ────────────────────────────────── */
  function init() {
    startTime    = Date.now();
    currentPhase = -1;
    dnaFired     = {};

    // Reset story bar
    for (let i = 0; i < 5; i++) {
      const seg = $('seg' + i);
      if (!seg) continue;
      seg.className = 'story-seg';
      const existing = seg.querySelector('.seg-fill');
      if (!existing) {
        const fill = document.createElement('div');
        fill.className = 'seg-fill';
        seg.appendChild(fill);
      } else {
        existing.style.width = '0%';
      }
    }

    // Reset DNA bars
    DNA_SCHEDULE.forEach(({ disc }) => {
      const bar = $('bar-' + disc);
      const pct = $('pct-' + disc);
      if (bar) bar.style.width = '0%';
      if (pct) pct.textContent = '0%';
    });

    // Reset phase text (no animation on reset)
    const label = $('phaseLabel');
    const title = $('phaseTitle');
    if (label) { label.className = 'phase-label'; label.textContent = PHASES[0].label; }
    if (title) { title.className = 'phase-title'; title.textContent = PHASES[0].title; }

    // Reset countdown
    const cdText = $('cdText');
    if (cdText) cdText.textContent = '~' + TOTAL_DURATION + ' giây còn lại';

    // Reset milestone toast
    const toast = $('milestoneToast');
    if (toast) toast.classList.remove('visible');

    // Reset ready overlay
    const overlay = $('readyOverlay');
    if (overlay) overlay.classList.remove('visible');

    // Fun facts
    if (factIntervalId) clearInterval(factIntervalId);
    currentFact = 0;
    renderFunFact(0, false); // no fade on first render
    factIntervalId = setInterval(() => {
      currentFact = (currentFact + 1) % FUN_FACTS.length;
      renderFunFact(currentFact, true);
    }, 4400);

    // Schedule milestones
    MILESTONES.forEach(m => {
      setTimeout(() => showMilestone(m), m.at * 1000);
    });

    // Kick off RAF loop
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  /* ── Main tick loop ─────────────────────────────── */
  function tick() {
    const elapsed   = (Date.now() - startTime) / 1000;
    const remaining = Math.max(0, TOTAL_DURATION - elapsed);

    // --- Countdown ---
    const cdText = $('cdText');
    if (cdText) {
      const secs = Math.ceil(remaining);
      cdText.textContent = secs > 0 ? '~' + secs + ' giây còn lại' : 'Đang hoàn thiện...';
    }

    // --- Phase transitions (every 5s) ---
    const newPhase = Math.min(4, Math.floor(elapsed / 5));
    if (newPhase !== currentPhase) {
      if (currentPhase >= 0) {
        // Mark completed segment as fully done
        sealSegment(currentPhase);
      }
      currentPhase = newPhase;
      transitionPhase(newPhase);
    }

    // --- Live fill for current segment ---
    if (currentPhase >= 0 && currentPhase < 5) {
      const phaseElapsed  = elapsed - currentPhase * 5;
      const phaseFraction = Math.min(1, phaseElapsed / 5);
      setSegmentFill(currentPhase, phaseFraction);
    }

    // --- DNA bars (staggered start) ---
    DNA_SCHEDULE.forEach(({ disc, target, start }) => {
      if (!dnaFired[disc] && elapsed >= start) {
        dnaFired[disc] = true;
        animateDNABar(disc, target);
      }
    });

    // --- Continue or finish ---
    if (elapsed < TOTAL_DURATION) {
      rafId = requestAnimationFrame(tick);
    } else {
      sealAllSegments();
      setTimeout(showReady, 600);
    }
  }

  /* ── Story bar helpers ──────────────────────────── */
  function setSegmentFill(segIndex, fraction) {
    const seg = $('seg' + segIndex);
    if (!seg) return;
    const fill = seg.querySelector('.seg-fill');
    if (fill) fill.style.width = (fraction * 100).toFixed(1) + '%';
  }

  function sealSegment(segIndex) {
    const seg = $('seg' + segIndex);
    if (!seg) return;
    seg.classList.add('done');
    const fill = seg.querySelector('.seg-fill');
    if (fill) fill.style.width = '100%';
  }

  function sealAllSegments() {
    for (let i = 0; i < 5; i++) sealSegment(i);
  }

  /* ── Phase text transition ──────────────────────── */
  function transitionPhase(phase) {
    const p     = PHASES[phase];
    if (!p) return;
    const label = $('phaseLabel');
    const title = $('phaseTitle');
    if (!label || !title) return;

    // Fade out
    label.classList.add('out');
    title.classList.add('out');

    setTimeout(() => {
      label.textContent = p.label;
      title.textContent = p.title;
      label.className   = 'phase-label in';
      title.className   = 'phase-title in';

      // Remove animation class after it plays
      setTimeout(() => {
        label.className = 'phase-label';
        title.className = 'phase-title';
      }, 350);
    }, 230);
  }

  /* ── DNA bar animation ──────────────────────────── */
  function animateDNABar(disc, target) {
    const bar      = $('bar-' + disc);
    const pct      = $('pct-' + disc);
    if (!bar || !pct) return;

    const ANIM_MS  = 1400;
    const tStart   = Date.now();

    function step() {
      const t      = Math.min(1, (Date.now() - tStart) / ANIM_MS);
      const eased  = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const value  = Math.round(eased * target);
      bar.style.width    = value + '%';
      pct.textContent    = value + '%';
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── Fun Facts ──────────────────────────────────── */
  function renderFunFact(index, animated) {
    const text = $('ffText');
    const dots = document.querySelectorAll('.ff-dot');
    if (!text) return;

    if (!animated) {
      text.textContent = FUN_FACTS[index];
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      return;
    }

    text.classList.add('fading');
    setTimeout(() => {
      text.textContent = FUN_FACTS[index];
      text.classList.remove('fading');
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }, 290);
  }

  /* ── Milestone Toast ────────────────────────────── */
  function showMilestone(m) {
    const toast = $('milestoneToast');
    const emoji = $('msEmoji');
    const mTitle = $('msTitle');
    const mSub   = $('msSub');
    if (!toast) return;

    if (emoji)  emoji.textContent  = m.emoji;
    if (mTitle) mTitle.textContent = m.title;
    if (mSub)   mSub.textContent   = m.sub;

    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3200);
  }

  /* ── Ready Overlay ──────────────────────────────── */
  function showReady() {
    if (factIntervalId) { clearInterval(factIntervalId); factIntervalId = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

    const overlay = $('readyOverlay');
    if (overlay) overlay.classList.add('visible');
  }

  /* ── Replay Button ──────────────────────────────── */
  function bindReplay() {
    const btn = $('replayBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const overlay = $('readyOverlay');
      if (overlay) overlay.classList.remove('visible');
      setTimeout(init, 450);
    });
  }

  /* ── Bootstrap ──────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { bindReplay(); init(); });
  } else {
    bindReplay();
    init();
  }

})();

/* ── STAGE-AWARE NAVIGATION ── */
const _urlParams = new URLSearchParams(window.location.search);
const _STAGE = parseInt(_urlParams.get('stage') || '1', 10);
const RESULT_MAP = {
  1: '../../discipline/match/',
  2: '../../major/recommendations-v2/',
  3: '../../university/matches/'
};
const STAGE_Q_COUNT = { 1: 10, 2: 20, 3: 30 };
function goToResult() {
  window.location.href = RESULT_MAP[_STAGE] || '../../discipline/match/';
}
// Auto-update counts and btn href based on stage
document.addEventListener('DOMContentLoaded', () => {
  const qDone = STAGE_Q_COUNT[_STAGE] || 30;
  const elCount  = document.getElementById('qCount');
  const elReady  = document.getElementById('readyCount');
  if (elCount)  elCount.textContent  = qDone;
  if (elReady)  elReady.textContent  = qDone;
  const btn = document.getElementById('readyBtn');
  if (btn) btn.href = RESULT_MAP[_STAGE] || '../../discipline/match/';
  // Fix quiz tab link to resume at correct question
  const _quizTab = document.getElementById('quizTabLink');
  if (_quizTab) {
    if (_STAGE === 1) _quizTab.href = '../../quiz/quiz-card/index.html?start=11';
    else if (_STAGE === 2) _quizTab.href = '../../quiz/quiz-card/index.html?start=21';
    else