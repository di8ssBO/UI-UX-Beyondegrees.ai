/**
 * discipline-nav.js — BeyonDegrees.ai
 * ─────────────────────────────────────────────────────────────────────
 * Xử lý điều hướng từ Discipline_Match → Discipline_Detail pages.
 *
 * Cách dùng: thêm vào cuối <body> của Discipline_Match_v1.html
 *   <script src="discipline-nav.js"></script>
 *
 * Quy tắc đặt tên file:
 *   Discipline_Detail_{discCode}.html
 *   ví dụ: Discipline_Detail_tn.html, Discipline_Detail_kt.html
 * ─────────────────────────────────────────────────────────────────────
 */

/** Map disc code → file detail tương ứng */
const DISC_PAGES = {
  kt: '../detail/kt.html',   // Engineering & Technology
  tn: '../detail/tn.html',   // Natural Sciences
  xh: '../detail/xh.html',   // Social Sciences
  nv: '../detail/nv.html',   // Humanities
  yt: '../detail/yt.html',   // Medical & Health Sciences
  nn: '../detail/nn.html',   // Agricultural Sciences
};

/** Điều hướng có ripple feedback nhẹ */
function navigateTo(url, sourceEl) {
  if (!url) return;

  // Visual press feedback
  if (sourceEl) {
    sourceEl.style.transform = 'scale(0.96)';
    sourceEl.style.opacity   = '0.75';
  }

  setTimeout(() => { window.location.href = url; }, 160);
}

/** Khởi tạo click handlers trên tất cả discipline cards */
function initDisciplineNav() {
  const cards = document.querySelectorAll('.dc');

  cards.forEach(card => {
    // Tìm disc code từ class list (dc-kt, dc-tn, …)
    const discClass = [...card.classList].find(c => /^dc-[a-z]{2}$/.test(c));
    if (!discClass) return;

    const discCode  = discClass.replace('dc-', '');        // "tn"
    const detailUrl = DISC_PAGES[discCode];

    if (!detailUrl) return;

    // ── Nút "Why I match?" → trang Why I Match ──────────────────────
    const btnExplore = card.querySelector('.btn-ex');
    if (btnExplore) {
      btnExplore.style.cursor = 'pointer';
      btnExplore.addEventListener('click', () =>
        navigateTo('../why/index.html?disc=' + discCode, btnExplore)
      );
    }

    // ── Nút "Career Paths" → trang detail ───────────────────────────
    const btnCareer = card.querySelector('.btn-pw');
    if (btnCareer) {
      btnCareer.style.cursor = 'pointer';
      btnCareer.addEventListener('click', () =>
        navigateTo(detailUrl, btnCareer)
      );
    }
  });
}

// Chạy sau khi DOM load xong
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDisciplineNav);
} else {
  initDisciplineNav();
}
