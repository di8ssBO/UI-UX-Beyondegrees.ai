/**
 * bd-analytics.js — BeyonDegrees.ai
 * ─────────────────────────────────────────────────────────────
 * Lightweight client-side analytics tracker for the
 * Antigravity Framework. Collects all metric inputs locally
 * via localStorage — no external requests, fully offline.
 *
 * AG Score = 0.30 × JourneyCompletion
 *          + 0.30 × AvgInteractions
 *          + 0.20 × D7Return
 *          + 0.20 × SaveRate
 *
 * Baseline: 41.2 / 100   →   Target: 65 / 100
 *
 * ── Public API ────────────────────────────────────────────────
 *   BDAnalytics.logStep('quiz_start')          journey milestone
 *   BDAnalytics.logInteraction('swipe')        micro-interaction
 *   BDAnalytics.logSave('university_heart')    save / share action
 *   BDAnalytics.logQuestion(index)             called per swipe
 *   BDAnalytics.getScore()                     live AG inputs
 *   BDAnalytics.export()                       print JSON → console
 *   BDAnalytics.reset()                        clear all data (dev)
 *
 * ── Journey steps (each = 20 pts) ─────────────────────────────
 *   quiz_start → quiz_complete → results_viewed
 *   → university_viewed → save_action
 *
 * ── Interaction types ─────────────────────────────────────────
 *   swipe | undo | warn_dismiss | chart_switch | uni_expand
 *
 * ── Save types ────────────────────────────────────────────────
 *   share | university_heart | save_results
 * ─────────────────────────────────────────────────────────────
 */

const BDAnalytics = (() => {

  // ── localStorage keys ────────────────────────────────────────
  const K = {
    FIRST_VISIT:       'bd_firstVisit',
    LAST_VISIT:        'bd_lastVisit',
    VISIT_COUNT:       'bd_visitCount',
    QUIZ_COMPLETED_AT: 'bd_quizCompletedAt',
    D7_RETURNED:       'bd_d7Returned',
    ALL_SESSIONS:      'bd_sessions',
    CURRENT_SESSION:   'bd_currentSession',
  };

  // ── Journey step definitions ─────────────────────────────────
  const JOURNEY_STEPS = [
    'quiz_start',        // User entered quiz screen
    'quiz_complete',     // User answered Q30
    'results_viewed',    // DNA card / match-reveal opened
    'university_viewed', // University matches opened
    'save_action',       // Any save or share action
  ];
  // Each step = 20 pts → full journey = 100 pts

  // Interactions >= 15 per session → score 100
  const INTERACTION_TARGET = 15;

  // ── Helpers ──────────────────────────────────────────────────
  const now = () => new Date().toISOString();

  function _load(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }

  function _save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function _uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  }

  // ── Session management ───────────────────────────────────────
  function _getSession() {
    let s = _load(K.CURRENT_SESSION);
    if (!s) {
      s = {
        id:                _uid(),
        startedAt:         now(),
        endedAt:           null,
        questionsAnswered: 0,
        lastQuestion:      -1,
        interactions: {
          swipes:         0,
          undos:          0,
          warnDismissals: 0,
          chartSwitches:  0,
          uniExpands:     0,
        },
        saves:        0,
        shares:       0,
        journeySteps: [],
      };
      _save(K.CURRENT_SESSION, s);
    }
    return s;
  }

  function _putSession(s) {
    _save(K.CURRENT_SESSION, s);
  }

  function _flushSession() {
    const s = _load(K.CURRENT_SESSION);
    if (!s) return;
    s.endedAt = now();
    const all = _load(K.ALL_SESSIONS, []);
    const idx = all.findIndex(x => x.id === s.id);
    if (idx >= 0) all[idx] = s;
    else all.push(s);
    _save(K.ALL_SESSIONS, all);
    localStorage.removeItem(K.CURRENT_SESSION);
  }

  // ── Visit tracking ───────────────────────────────────────────
  function _trackVisit() {
    if (!_load(K.FIRST_VISIT)) _save(K.FIRST_VISIT, now());

    const count = _load(K.VISIT_COUNT, 0);
    _save(K.VISIT_COUNT, count + 1);
    _save(K.LAST_VISIT, now());

    // D7 Return: did user come back within 7 days of quiz completion?
    const completedAt = _load(K.QUIZ_COMPLETED_AT);
    const alreadyD7   = _load(K.D7_RETURNED, false);
    if (completedAt && !alreadyD7 && count >= 1) {
      const diffDays =
        (Date.now() - new Date(completedAt).getTime()) / 86400000;
      if (diffDays > 0 && diffDays <= 7) {
        _save(K.D7_RETURNED, true);
      }
    }
  }

  // ── Score computation ────────────────────────────────────────
  function _computeScores(s) {
    const stepsHit = JOURNEY_STEPS.filter(
      step => s.journeySteps.includes(step)
    ).length;
    const journeyCompletion = stepsHit * 20; // 0–100

    const totalInter =
      (s.interactions.swipes         || 0) +
      (s.interactions.undos          || 0) +
      (s.interactions.warnDismissals || 0) +
      (s.interactions.chartSwitches  || 0) +
      (s.interactions.uniExpands     || 0);
    const interactionScore = Math.min(
      100,
      Math.round((totalInter / INTERACTION_TARGET) * 100)
    );

    const d7Return = _load(K.D7_RETURNED, false) ? 100 : 0;
    const saveRate = ((s.saves || 0) + (s.shares || 0)) > 0 ? 100 : 0;

    const agScore = Math.round(
      0.30 * journeyCompletion +
      0.30 * interactionScore +
      0.20 * d7Return +
      0.20 * saveRate
    );

    return { journeyCompletion, interactionScore, d7Return, saveRate, agScore };
  }

  // ── Auto-flush on unload ─────────────────────────────────────
  window.addEventListener('pagehide',     _flushSession);
  window.addEventListener('beforeunload', _flushSession);

  // ── Initialize ───────────────────────────────────────────────
  _trackVisit();
  _getSession();

  // ── Public API ───────────────────────────────────────────────
  return {

    /**
     * Log a journey milestone step.
     * logQuestion() auto-fires quiz_start and quiz_complete,
     * so manual calls are only needed for other steps.
     */
    logStep(step) {
      if (!JOURNEY_STEPS.includes(step)) return;
      const s = _getSession();
      if (!s.journeySteps.includes(step)) s.journeySteps.push(step);
      if (step === 'quiz_complete' && !_load(K.QUIZ_COMPLETED_AT)) {
        _save(K.QUIZ_COMPLETED_AT, now());
      }
      _putSession(s);
    },

    /**
     * Log a micro-interaction.
     * Types: swipe | undo | warn_dismiss | chart_switch | uni_expand
     */
    logInteraction(type) {
      const MAP = {
        swipe:        'swipes',
        undo:         'undos',
        warn_dismiss: 'warnDismissals',
        chart_switch: 'chartSwitches',
        uni_expand:   'uniExpands',
      };
      const field = MAP[type];
      if (!field) return;
      const s = _getSession();
      s.interactions[field] = (s.interactions[field] || 0) + 1;
      _putSession(s);
    },

    /**
     * Log a save or share action.
     * Also auto-marks the 'save_action' journey step.
     * Types: share | university_heart | save_results
     */
    logSave(type) {
      const s = _getSession();
      if (type === 'share') s.shares = (s.shares || 0) + 1;
      else                  s.saves  = (s.saves  || 0) + 1;
      if (!s.journeySteps.includes('save_action')) {
        s.journeySteps.push('save_action');
      }
      _putSession(s);
    },

    /**
     * Log the current question index (0-based).
     * Call inside recordAnswer() on quiz-card.
     * Auto-promotes: quiz_start (Q1) and quiz_complete (Q30).
     */
    logQuestion(questionIndex) {
      const s = _getSession();
      s.questionsAnswered = Math.max(s.questionsAnswered, questionIndex + 1);
      s.lastQuestion      = questionIndex;
      if (!s.journeySteps.includes('quiz_start')) {
        s.journeySteps.push('quiz_start');
      }
      if (questionIndex >= 29 && !s.journeySteps.includes('quiz_complete')) {
        s.journeySteps.push('quiz_complete');
        if (!_load(K.QUIZ_COMPLETED_AT)) _save(K.QUIZ_COMPLETED_AT, now());
      }
      _putSession(s);
    },

    /**
     * Get live AG Score inputs for the current session.
     */
    getScore() {
      return _computeScores(_getSession());
    },

    /**
     * Export full analytics report to DevTools console.
     * Run: BDAnalytics.export()
     * Copy the printed JSON into KH_BaoCao_HangTuan_v2.xlsx
     */
    export() {
      _flushSession();
      const all     = _load(K.ALL_SESSIONS, []);
      const current = _getSession();

      const enriched = [...all, current].map(s => ({
        ...s, scores: _computeScores(s),
      }));

      const total = enriched.length;
      const avg   = fn => total
        ? Math.round(enriched.reduce((acc, s) => acc + fn(s), 0) / total)
        : 0;

      const aggJourney     = avg(s => s.scores.journeyCompletion);
      const aggInteraction = avg(s => s.scores.interactionScore);
      const aggD7          = _load(K.D7_RETURNED, false) ? 100 : 0;
      const sessWithSave   = enriched.filter(s => s.scores.saveRate > 0).length;
      const aggSaveRate    = total
        ? Math.round((sessWithSave / total) * 100) : 0;
      const aggAG = Math.round(
        0.30 * aggJourney     +
        0.30 * aggInteraction +
        0.20 * aggD7          +
        0.20 * aggSaveRate
      );

      const report = {
        exportedAt: now(),
        meta: {
          firstVisit:      _load(K.FIRST_VISIT),
          lastVisit:       _load(K.LAST_VISIT),
          visitCount:      _load(K.VISIT_COUNT, 0),
          quizCompletedAt: _load(K.QUIZ_COMPLETED_AT),
          d7Returned:      _load(K.D7_RETURNED, false),
          totalSessions:   total,
        },
        antigravity: {
          journeyCompletion: aggJourney,       // weight 0.30
          avgInteractions:   aggInteraction,   // weight 0.30
          d7Return:          aggD7,            // weight 0.20
          saveRate:          aggSaveRate,       // weight 0.20
          agScore:           aggAG,
          baseline:          41.2,
          target:            65,
          delta:             +(aggAG - 41.2).toFixed(1),
        },
        sessions: enriched.map(s => ({
          id:                s.id,
          startedAt:         s.startedAt,
          questionsAnswered: s.questionsAnswered,
          lastQuestion:      s.lastQuestion,
          steps:             s.journeySteps,
          interactions:      s.interactions,
          saves:             s.saves,
          shares:            s.shares,
          scores:            s.scores,
        })),
      };

      console.group('BD Analytics — Antigravity Report');
      console.log('AG Score: ' + aggAG + '/100  (baseline 41.2 -> target 65)');
      console.log('Delta: ' + (report.antigravity.delta > 0 ? '+' : '') + report.antigravity.delta);
      console.log('-----------------------------------------------');
      console.log('Journey Completion : ' + aggJourney     + '/100  (x0.30)');
      console.log('Avg Interactions   : ' + aggInteraction + '/100  (x0.30)');
      console.log('D7 Return          : ' + aggD7          + '/100  (x0.20)');
      console.log('Save Rate          : ' + aggSaveRate    + '/100  (x0.20)');
      console.log('-----------------------------------------------');
      console.log('Sessions tracked   : ' + total);
      console.log('Visit count        : ' + _load(K.VISIT_COUNT, 0));
      console.log('-----------------------------------------------');
      console.log('Full JSON (copy to Excel):');
      console.log(JSON.stringify(report, null, 2));
      console.groupEnd();

      return report;
    },

    /**
     * Clear all analytics data. DEV USE ONLY.
     */
    reset() {
      Object.values(K).forEach(k => localStorage.removeItem(k));
      console.log('[BDAnalytics] All analytics data cleared.');
    },

  };

})();

window.BDAnalytics = BDAnalytics;
