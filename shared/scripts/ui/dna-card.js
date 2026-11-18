/* ─────────────────────────────────────────────────────────────────
   BeyonDegrees.ai — Academic DNA shareable card (shared)
   Used by mobile/results/dna-card.html and desktop/results/dna-card/.

   Expects in the page: #mainPct #mainDisc #mainSub #dnaBars #taglineText
   and a toast element #toast (class .bd-dna-toast). Load AFTER i18n.js:
   it renders on DOMContentLoaded, after BDi18n.init() has run, so no raw
   i18n keys are shown.

   Numbers come from window.BD_DNA_PCTS (shared/scripts/data/disc-config.js),
   the same values the Disciplines page shows. In this UI prototype they are
   fixed sample values; the real scores come from bd-api in Phase 2.
   ───────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  function t(k) { return (window.BDi18n && BDi18n.t) ? BDi18n.t(k) : k; }
  function tf(k, v) { return (window.BDi18n && BDi18n.tf) ? BDi18n.tf(k, v) : t(k); }

  /* Bar order/labels — keys already exist in i18n.js (dna.bar.*) */
  var BARS = {
    kt: { icon: '⚡', key: 'dna.bar.eng',    cls: 'bar-blue'   },
    nv: { icon: '📚', key: 'dna.bar.hum',    cls: 'bar-violet' },
    tn: { icon: '🔬', key: 'dna.bar.sci',    cls: 'bar-teal'   },
    yt: { icon: '🩺', key: 'dna.bar.health', cls: 'bar-mint'   },
    xh: { icon: '🌐', key: 'dna.bar.social', cls: 'bar-orange' },
    nn: { icon: '🌾', key: 'dna.bar.agri',   cls: 'bar-green'  }
  };
  var FALLBACK = { kt: 94, tn: 89, yt: 64, nn: 62, xh: 34, nv: 32 };

  function progress() {
    try {
      var p = parseInt(localStorage.getItem('quizProgress') || '0', 10);
      var m = parseInt(localStorage.getItem('quizMilestone') || '0', 10);
      return Math.max(p || 0, m || 0);
    } catch (e) { return 0; }
  }

  function render() {
    var P = window.BD_DNA_PCTS || FALLBACK;
    var order = Object.keys(BARS).sort(function (a, b) { return (P[b] || 0) - (P[a] || 0); });
    var top = order[0], second = order[1];
    var $ = function (id) { return document.getElementById(id); };

    if ($('mainPct'))  $('mainPct').textContent  = (P[top] || 0) + '%';
    if ($('mainDisc')) $('mainDisc').textContent = t(BARS[top].key);

    /* Before the quiz is complete, say so instead of claiming a final DNA */
    var done = progress();
    if ($('mainSub')) {
      var cap = done >= 30 ? null : done >= 20 ? 'disc.caption.20' : done >= 10 ? 'disc.caption.10' : 'disc.caption.0';
      $('mainSub').textContent = cap ? t(cap) : t('dna.main_sub');
      $('mainSub').removeAttribute('data-i18n');
    }
    if ($('taglineText')) {
      $('taglineText').innerHTML = tf('dna.tagline.dynamic', {
        a: (P[top] || 0) + '% ' + t(BARS[top].key),
        b: (P[second] || 0) + '% ' + t(BARS[second].key)
      });
    }

    var box = $('dnaBars');
    if (box) {
      box.innerHTML = order.map(function (k) {
        var b = BARS[k], pct = P[k] || 0;
        return '<div class="dna-row">' +
          '<span class="dna-icon">' + b.icon + '</span>' +
          '<span class="dna-name">' + t(b.key) + '</span>' +
          '<div class="dna-bar-track"><div class="dna-bar-fill ' + b.cls + '" style="width:0%" data-target="' + pct + '%"></div></div>' +
          '<span class="dna-pct">' + pct + '%</span></div>';
      }).join('');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          box.querySelectorAll('.dna-bar-fill').forEach(function (el) { el.style.width = el.dataset.target; });
        });
      });
    }
  }

  function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2800);
  }

  /* Instagram / TikTok: the OS share sheet where available (phones), where
     the user picks the app; otherwise copy the link. Copy: copy the link. */
  function handleShare(platform) {
    var url = location.origin + location.pathname;
    var tag = document.getElementById('taglineText');
    var text = tag ? tag.innerText : 'My Academic DNA';
    if (platform !== 'copy' && navigator.share) {
      navigator.share({ title: 'BeyonDegrees.ai — Academic DNA', text: text, url: url })
        .catch(function () {});
      return;
    }
    var done = function () { showToast(t('dna.toast_copy')); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, done);
    } else {
      done();
    }
  }

  window.BDDnaCard = { render: render, share: handleShare };
  window.handleShare = handleShare;          /* used by onclick in markup */

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();

  /* Re-render if the language changes on the page */
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
})();
