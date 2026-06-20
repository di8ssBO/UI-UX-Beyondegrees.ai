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
   RESULTS SCREEN ENGINE — BeyonDegrees.ai
   - Confetti burst on load
   - Animated match % counter
   - Staggered DNA bar fill
   - Share card interaction
   ===================================================== */

(function () {
  'use strict';

  /* ── Data ───────────────────────────────────────── */
  const MATCH_PCT = 87;

  const DNA_DATA = [
    { disc: 'kt', target: 78 },
    { disc: 'tn', target: 68 },
    { disc: 'nv', target: 62 },
    { disc: 'xh', target: 55 },
    { disc: 'yt', target: 45 },
    { disc: 'nn', target: 31 },
  ];

  /* ── Utils ──────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }

  /* ══════════════════════════════════════════════════
     CONFETTI ENGINE
     Canvas confetti — runs for ~4s then stops
  ══════════════════════════════════════════════════ */
  function launchConfetti() {
    const canvas = $('confettiCanvas');
    if (!canvas) return;

    const screen = document.getElementById('mobileScreen');
    const W = screen ? screen.offsetWidth  : 370;
    const H = screen ? screen.offsetHeight : 780;
    canvas.width  = W;
    canvas.height = H;

    const ctx    = canvas.getContext('2d');
    const COLORS = [
      '#a78bfa', '#7c3aed', '#c4b5fd',   // violet
      '#06d6a0', '#34d399',               // mint
      '#fbbf24', '#f97316',               // amber/orange
      '#60a5fa', '#3b82f6',               // blue
      '#fb7185', '#f43f5e',               // rose
    ];

    const SHAPES = ['rect', 'circle', 'ribbon'];
    const N      = 80;

    /* Particle class */
    function Particle(delay) {
      this.reset(delay);
    }
    Particle.prototype.reset = function (delay) {
      this.x      = Math.random() * W;
      this.y      = -10 - Math.random() * 60 - (delay || 0) * 120;
      this.vx     = (Math.random() - 0.5) * 2.5;
      this.vy     = 2.5 + Math.random() * 3;
      this.vr     = (Math.random() - 0.5) * 8;
      this.r      = Math.random() * 360;
      this.w      = 7 + Math.random() * 6;
      this.h      = this.w * (0.4 + Math.random() * 0.6);
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.shape  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.alpha  = 0.85 + Math.random() * 0.15;
      this.dead   = false;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.05 + Math.random() * 0.05;
    };
    Particle.prototype.update = function () {
      this.wobble += this.wobbleSpeed;
      this.x  += this.vx + Math.sin(this.wobble) * 0.8;
      this.y  += this.vy;
      this.r  += this.vr;
      this.vy += 0.06; // gravity
      if (this.y > H + 20) this.dead = true;
    };
    Particle.prototype.draw = function (ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.r * Math.PI / 180);
      ctx.fillStyle = this.color;

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 'ribbon') {
        ctx.beginPath();
        ctx.moveTo(-this.w / 2, 0);
        ctx.quadraticCurveTo(0, this.h, this.w / 2, 0);
        ctx.quadraticCurveTo(0, -this.h, -this.w / 2, 0);
        ctx.fill();
      } else {
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      }
      ctx.restore();
    };

    /* Init particles with staggered delays */
    let particles = [];
    for (let i = 0; i < N; i++) {
      particles.push(new Particle(i / N));
    }

    const START     = Date.now();
    const DURATION  = 3800; // ms confetti runs
    let   rafId     = null;

    function loop() {
      const elapsed = Date.now() - START;
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      // Remove dead particles
      particles = particles.filter(p => !p.dead);

      if (elapsed < DURATION || particles.length > 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    }
    rafId = requestAnimationFrame(loop);
  }

  /* ══════════════════════════════════════════════════
     MATCH % COUNTER
     Count up from 0 to MATCH_PCT over 1.5s with ease-out
  ══════════════════════════════════════════════════ */
  function animateMatchPct() {
    const el    = $('matchPct');
    if (!el) return;

    const DURATION = 1500;
    const tStart   = Date.now();

    function step() {
      const t     = Math.min(1, (Date.now() - tStart) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3.5);
      const val   = Math.round(eased * MATCH_PCT);
      el.textContent = val;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ══════════════════════════════════════════════════
     DNA BARS — staggered fill
  ══════════════════════════════════════════════════ */
  function animateDNABars() {
    DNA_DATA.forEach(({ disc, target }, i) => {
      setTimeout(() => {
        const bar = $('dsc-bar-' + disc);
        const pct = $('dsc-pct-' + disc);
        if (!bar) return;

        const ANIM_MS = 1100;
        const tStart  = Date.now();

        function step() {
          const t     = Math.min(1, (Date.now() - tStart) / ANIM_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          const val   = Math.round(eased * target);
          bar.style.width = val + '%';
          if (pct) pct.textContent = val + '%';
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }, 1300 + i * 200); // start after hero animation (1.1s) + stagger
    });
  }

  /* ══════════════════════════════════════════════════
     SHARE INTERACTION
  ══════════════════════════════════════════════════ */
  function bindShare() {
    // Create toast element
    const screen = document.getElementById('mobileScreen');
    const toast  = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = '✓ Link đã sao chép!';
    if (screen) screen.appendChild(toast);

    function showToast() {
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 2400);
    }

    const dnaBtn  = $('dnaShareBtn');
    const topBtn  = $('topShareBtn');
    if (dnaBtn) dnaBtn.addEventListener('click', showToast);
    if (topBtn) topBtn.addEventListener('click', showToast);
  }

  /* ══════════════════════════════════════════════════
     SAVE BUTTON micro-interaction
  ══════════════════════════════════════════════════ */
  function bindSave() {
    const btn = $('saveResultBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.textContent = '✅ Đã lưu!';
      btn.style.color = 'var(--mint-400)';
      btn.style.borderColor = 'rgba(6,214,160,0.3)';
      setTimeout(() => {
        btn.textContent = '🔖 Lưu kết quả';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  }

  /* ── Bootstrap ──────────────────────────────────── */
  function init() {
    // Small delay so the page renders first
    setTimeout(launchConfetti,    150);
    setTimeout(animateMatchPct,   500);
    setTimeout(animateDNABars,    0);
    bindShare();
    bindSave();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
