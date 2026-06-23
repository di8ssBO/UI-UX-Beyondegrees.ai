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
// Home Screen Interactions

document.addEventListener('DOMContentLoaded', () => {
  const disciplineCards = document.querySelectorAll('.discipline-card');
  const ctaButton = document.querySelector('.cta-section .btn-primary');

  // Toggle discipline selection
  disciplineCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      card.style.borderColor = card.classList.contains('selected')
        ? 'var(--violet-600)'
        : 'var(--neutral-700)';
      card.style.background = card.classList.contains('selected')
        ? 'rgba(124, 58, 237, 0.1)'
        : 'var(--bg-surface)';
    });
  });

  // CTA button click
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      window.location.href = '../../quiz/quiz-card/index.html?stage=1';
    });
  }

  // ── Orange Pill Tab Bar interaction ──
  const tabBar = document.getElementById('floatTabBar');
  if (tabBar) {
    const tabs = tabBar.querySelectorAll('.tab-item:not(.tab-disabled)');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // If it's a real navigation link, let it navigate
        if (tab.href && tab.href !== '#' && !tab.href.endsWith('#')) return;
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }
});
