/* ─────────────────────────────────────────────────────────────────
   BeyonDegrees.ai — Quiz Builder (shared by mobile + desktop)
   Depends on: assertions.js       (BD_ASSERTIONS: en + vi, pools d/m/u)
               assertions-i18n.js  (BD_ASSERTIONS_I18N: fr / hi / ar by id)
   Exposes:
     window.BD_buildQuizSet()   → 30 questions: 10 d + 10 m + 10 u
     window.BD_quizText(q)      → question text in the current language
     window.BD_resetQuizSet()   → forget the saved set (used by Reset Account)

   The chosen set is saved in localStorage ('bd-quiz-set') so resuming the
   quiz (?start=N), reloading, or switching between mobile and desktop keeps
   the same 30 questions. A new random set is drawn after Reset Account.
   ───────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var STORE_KEY  = 'bd-quiz-set';
  var PER_STAGE  = 10;
  /* Colour/discipline of a card is assigned round-robin: the assertion
     data has no discipline column yet, so this is visual only. */
  var DISC_CYCLE = ['kt', 'nn', 'nv', 'tn', 'xh', 'yt'];
  var STAGE_TAGS = { d: '🎯 Discipline', m: '📚 Major', u: '🏛️ University' };

  function shuffle(arr) {                      /* Fisher–Yates, unbiased */
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function readSaved() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var ids = raw ? JSON.parse(raw) : null;
      return Array.isArray(ids) && ids.length === PER_STAGE * 3 ? ids : null;
    } catch (e) { return null; }
  }

  function save(ids) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(ids)); } catch (e) {}
  }

  function wrap(stage, items, offset) {
    return items.map(function (q, i) {
      return {
        id   : q.id,
        text : q.text,
        vi   : q.vi,
        stage: stage,
        tag  : STAGE_TAGS[stage],
        disc : DISC_CYCLE[(offset + i) % DISC_CYCLE.length]
      };
    });
  }

  window.BD_buildQuizSet = function () {
    var src = window.BD_ASSERTIONS;
    if (!src) {
      console.error('[BD] BD_ASSERTIONS not loaded — assertions.js missing?');
      return [];
    }
    var pools = { d: src.d || [], m: src.m || [], u: src.u || [] };
    var byId = {};
    ['d', 'm', 'u'].forEach(function (s) {
      pools[s].forEach(function (q) { byId[q.id] = { q: q, stage: s }; });
    });

    /* Reuse the saved set when every id still exists in the bank. */
    var saved = readSaved();
    if (saved && saved.every(function (id) { return byId[id]; })) {
      return saved.map(function (id, i) {
        return wrap(byId[id].stage, [byId[id].q], i)[0];
      });
    }

    var picked = [].concat(
      wrap('d', shuffle(pools.d).slice(0, PER_STAGE), 0),
      wrap('m', shuffle(pools.m).slice(0, PER_STAGE), PER_STAGE),
      wrap('u', shuffle(pools.u).slice(0, PER_STAGE), PER_STAGE * 2)
    );
    save(picked.map(function (q) { return q.id; }));
    return picked;
  };

  window.BD_quizText = function (q) {
    if (!q) return '';
    var lang = 'en';
    try { lang = localStorage.getItem('bd-lang') || 'en'; } catch (e) {}
    if (lang === 'vi' && q.vi) return q.vi;
    var i18n = window.BD_ASSERTIONS_I18N;
    if (i18n && i18n[lang] && i18n[lang][q.id]) return i18n[lang][q.id];
    return q.text;
  };

  window.BD_resetQuizSet = function () {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  };
}());
