/* ─────────────────────────────────────────────────────────────────
   BeyonDegrees.ai — Quiz Builder (Mobile / Dynamic)
   Depends on: assertions.js (BD_ASSERTIONS), assertions-i18n.js (BD_ASSERTIONS_I18N)
   Exposes: window.BD_buildQuizSet()

   Usage in HTML (after assertions.js + assertions-i18n.js):
     <script src=".../data/quiz-builder.js"></script>
     <script>
       const QUESTIONS = BD_buildQuizSet();
     </script>
   ───────────────────────────────────────────────────────────────── */

(function () {
  var _DISC_CYCLE  = ['kt', 'nv', 'yt', 'xh', 'nn', 'tn'];
  var _STAGE_TAGS  = { d: '🎯 Discipline', m: '📚 Major', u: '🏛️ University' };

  window.BD_buildQuizSet = function () {
    if (!window.BD_ASSERTIONS) {
      console.error('[BD] BD_ASSERTIONS not loaded — assertions.js missing?');
      return [];
    }
    var _lang = (function () {
      try { return localStorage.getItem('bd-lang') || 'en'; } catch (e) { return 'en'; }
    }());
    var _i18n = window.BD_ASSERTIONS_I18N;
    var ci    = 0;

    function pick(arr, n) { return arr.slice().sort(function () { return Math.random() - 0.5; }).slice(0, n); }

    function wrap(stage, items) {
      return items.map(function (q) {
        return {
          id   : q.id,
          text : _lang === 'en'                                    ? q.text
               : (_i18n && _i18n[_lang] && _i18n[_lang][q.id])    ? _i18n[_lang][q.id]
               : (q[_lang] || q.text),
          stage: stage,
          tag  : _STAGE_TAGS[stage],
          disc : _DISC_CYCLE[ci++ % _DISC_CYCLE.length],
        };
      });
    }

    return [].concat(
      wrap('d', pick(BD_ASSERTIONS.d, 10)),
      wrap('m', pick(BD_ASSERTIONS.m, 10)),
      wrap('u', pick(BD_ASSERTIONS.u, 10))
    );
  };
}());
