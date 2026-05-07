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
    // Extract last non-empty path segment (handles trailing-slash folder URLs)
    const getSegment = (href) => {
      const s = href.replace(/\/$/, '').split('/').filter(Boolean).pop();
      return s || null;
    };

    // Bottom nav items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const href = item.getAttribute('href') || item.getAttribute('data-href') || '';
      const seg = getSegment(href);
      if (seg && currentPath.includes(seg)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Sidebar items
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-href') || '';
      const seg = getSegment(href);
      if (seg && currentPath.includes(seg)) {
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
