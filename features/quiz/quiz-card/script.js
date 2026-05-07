/* =====================================================
   BeyonDegrees.ai — Quiz Card Hybrid Interaction
   Mode A: Drag + Spring Physics (4-direction swipe)
   Mode B: Hold 300ms → Spectrum Tap (continuous scale)
   ===================================================== */

// ─── QUESTIONS BANK ───────────────────────────────────
const QUESTIONS = [
  { text: 'Tôi thích giải quyết vấn đề bằng cách phân tích dữ liệu hơn là dựa vào cảm xúc', tag: '⚡ Kỹ thuật', discipline: 'kt' },
  { text: 'Tôi cảm thấy hứng thú khi khám phá văn hóa và ngôn ngữ của các dân tộc khác nhau', tag: '📚 Nhân văn', discipline: 'nv' },
  { text: 'Tôi muốn công việc tạo ra tác động trực tiếp đến sức khỏe con người', tag: '⚕️ Y & Sức khỏe', discipline: 'yt' },
  { text: 'Tôi thích làm việc với số liệu, biểu đồ và mô hình hơn là với văn bản', tag: '📊 Xã hội học', discipline: 'kt' },
  { text: 'Tôi tìm thấy ý nghĩa khi giúp đỡ người khác vượt qua khó khăn trong cuộc sống', tag: '💚 Nhân văn', discipline: 'nv' },
  { text: 'Tôi bị thu hút bởi cách mà thiên nhiên và môi trường tự nhiên vận hành', tag: '🌿 Nông nghiệp', discipline: 'nn' },
  { text: 'Tôi muốn tạo ra những thứ mà người khác có thể nhìn thấy và sử dụng hằng ngày', tag: '⚡ Kỹ thuật', discipline: 'kt' },
  { text: 'Tôi tin rằng hiểu lịch sử và triết học giúp tôi đưa ra quyết định tốt hơn', tag: '📚 Nhân văn', discipline: 'nv' },
  { text: 'Tôi thích thử nghiệm và chấp nhận rủi ro hơn là đi theo con đường an toàn', tag: '⚡ Kỹ thuật', discipline: 'kt' },
  { text: 'Tôi cảm thấy có trách nhiệm với cộng đồng và muốn đóng góp cho xã hội', tag: '📊 Xã hội học', discipline: 'nv' },
];

// ─── STATE ────────────────────────────────────────────
const state = {
  currentIndex: 6,       // current question index (0-based into QUESTIONS)
  totalAnswered: 6,
  scores: { agree: 3, strong: 1, neutral: 2, disagree: 1 },
  dna: { kt: 40, nv: 28, yt: 20, nn: 12 },
  history: [],           // for undo

  // Drag state
  dragging: false,
  holdTimer: null,
  isSpectrumMode: false,
  spectrumValue: 0,      // -1.0 to 1.0
  startX: 0, startY: 0,
  startClientX: 0, startClientY: 0,
  currentDx: 0, currentDy: 0,
};

// ─── DOM REFS ─────────────────────────────────────────
const card       = () => document.getElementById('activeCard');
const back1      = () => document.getElementById('backCard1');
const back2      = () => document.getElementById('backCard2');
const overlay    = () => document.getElementById('dragOverlay');
const hintR      = () => document.getElementById('hintRight');
const hintL      = () => document.getElementById('hintLeft');
const hintU      = () => document.getElementById('hintUp');
const hintD      = () => document.getElementById('hintDown');
const specWrap   = () => document.getElementById('spectrumWrap');
const specThumb  = () => document.getElementById('spectrumThumb');
const specLabel  = () => document.getElementById('spectrumValueLabel');
const swipeHint  = () => document.getElementById('swipeHint');
const modeInd    = () => document.getElementById('modeIndicator');
const modeLabel  = () => modeInd().querySelector('.mode-label');
const toast      = () => document.getElementById('bdToast');

// Thresholds
const SWIPE_X = 80;   // px to trigger horizontal swipe
const SWIPE_Y = 60;   // px to trigger vertical swipe
const HOLD_MS = 300;  // ms hold to enter spectrum mode
const MOVE_DEAD = 8;  // px dead zone before registering as drag

// ─── STORY BAR ────────────────────────────────────────
function buildStoryBar() {
  const bar = document.getElementById('storyBar');
  bar.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const seg = document.createElement('div');
    seg.className = 'story-seg';
    const answeredInSeg = Math.min(Math.max(state.totalAnswered - i * 3, 0), 3);
    if (answeredInSeg >= 3) seg.classList.add('filled');
    else if (answeredInSeg > 0) seg.classList.add('active');
    bar.appendChild(seg);
  }
}

// ─── LOAD QUESTION ────────────────────────────────────
function loadQuestion() {
  const q = QUESTIONS[state.currentIndex % QUESTIONS.length];
  document.getElementById('qText').textContent = q.text;
  document.getElementById('disciplineTag').textContent = q.tag;
  document.getElementById('qNumber').textContent = String(state.totalAnswered + 1).padStart(2, '0');
  document.getElementById('counterCurrent').textContent = state.totalAnswered + 1;
}

// ─── UPDATE UI ────────────────────────────────────────
function updateScoreboard() {
  document.getElementById('agreeCount').textContent = state.scores.agree;
  document.getElementById('strongCount').textContent = state.scores.strong;
  document.getElementById('neutralCount').textContent = state.scores.neutral;
  document.getElementById('disagreeCount').textContent = state.scores.disagree;
}

function updateDNA(discipline, direction) {
  // Shift DNA scores based on answer direction
  const shift = direction === 'agree' ? 4 : direction === 'strong' ? 7 : direction === 'neutral' ? 1 : -3;
  if (discipline && state.dna[discipline] !== undefined) {
    state.dna[discipline] = Math.min(95, Math.max(5, state.dna[discipline] + shift));
  }
  // Random small shifts to others for realism
  Object.keys(state.dna).forEach(k => {
    if (k !== discipline) {
      state.dna[k] = Math.min(95, Math.max(5, state.dna[k] + (Math.random() * 4 - 2)));
    }
  });
  // Normalize to 100%
  const total = Object.values(state.dna).reduce((a, b) => a + b, 0);
  Object.keys(state.dna).forEach(k => state.dna[k] = Math.round(state.dna[k] / total * 100));

  // Update bars
  const ids = { kt: 'dna-kt', nv: 'dna-nv', yt: 'dna-yt', nn: 'dna-nn' };
  Object.keys(ids).forEach(k => {
    const pct = state.dna[k];
    const row = document.getElementById(ids[k]);
    if (row) {
      row.textContent = pct + '%';
      const fill = row.previousElementSibling?.querySelector('.dna-fill');
      if (fill) fill.style.width = pct + '%';
    }
  });
}

// ─── SHOW TOAST ───────────────────────────────────────
function showToast(msg, color) {
  const t = toast();
  t.textContent = msg;
  t.style.borderColor = color || '';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

// ─── MILESTONE CHECK ──────────────────────────────────
function checkMilestone() {
  const milestones = {
    10: { emoji: '🔥', text: '1/3 xong rồi!', sub: 'Đang hình thành hồ sơ...', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)' },
    20: { emoji: '⚡', text: '2/3 hoàn thành!', sub: 'AI đang phân tích...', bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.4)' },
    30: { emoji: '🎉', text: 'Xong rồi!', sub: 'Đang tạo kết quả...', bg: 'rgba(6,214,160,0.15)', border: 'rgba(6,214,160,0.4)' },
  };
  const m = milestones[state.totalAnswered];
  if (!m) return;

  const overlay = document.getElementById('milestoneOverlay');
  const content = overlay.querySelector('.milestone-content');
  document.getElementById('milestoneEmoji').textContent = m.emoji;
  document.getElementById('milestoneText').textContent = m.text;
  document.getElementById('milestoneSub').textContent = m.sub;
  content.style.background = m.bg;
  content.style.borderColor = m.border;

  overlay.classList.remove('show');
  void overlay.offsetWidth;
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 2400);
}

// ─── RECORD ANSWER ────────────────────────────────────
function recordAnswer(direction, specValue) {
  const q = QUESTIONS[state.currentIndex % QUESTIONS.length];
  state.history.push({
    index: state.currentIndex,
    direction,
    specValue,
    dnaSnapshot: { ...state.dna },
    scoresSnapshot: { ...state.scores },
  });

  state.scores[direction] = (state.scores[direction] || 0) + 1;
  state.totalAnswered++;
  state.currentIndex++;

  updateDNA(q.discipline, direction);
  updateScoreboard();
  buildStoryBar();
  checkMilestone();

  // Toast
  const toastMap = {
    agree:    ['Đồng ý ✓', 'var(--mint-500)'],
    strong:   ['Rất đồng ý ⚡', 'var(--violet-400)'],
    neutral:  ['Trung lập –', ''],
    disagree: ['Không đồng ý ✕', 'var(--red-400)'],
  };
  if (specValue !== undefined) {
    const pct = Math.round(specValue * 100);
    showToast(`Mức độ: ${pct > 0 ? '+' : ''}${pct}%`, pct > 0 ? 'var(--mint-500)' : 'var(--red-400)');
  } else {
    const [msg, color] = toastMap[direction] || ['', ''];
    showToast(msg, color);
  }
}

// ─── UNDO ─────────────────────────────────────────────
function undoLast() {
  if (!state.history.length) { showToast('Không có gì để hoàn tác', ''); return; }
  const last = state.history.pop();
  state.currentIndex = last.index;
  state.totalAnswered--;
  Object.assign(state.dna, last.dnaSnapshot);
  Object.assign(state.scores, last.scoresSnapshot);
  updateScoreboard();
  buildStoryBar();
  loadQuestion();
  showToast('↩ Hoàn tác', '');
}

// ─── CARD FLING ANIMATION ─────────────────────────────
function flingCard(direction, callback) {
  const c = card();
  const targets = {
    right:   { tx: 500,   ty: -60,  r:  20 },
    left:    { tx: -500,  ty: -60,  r: -20 },
    up:      { tx: 20,    ty: -600, r:  5 },
    down:    { tx: 0,     ty: 300,  r:  0 },
  };
  const t = targets[direction];
  if (!t) return;

  c.style.transition = 'transform 0.45s cubic-bezier(0.36,0,0.66,-0.2), opacity 0.4s ease';
  c.style.transform = `translateX(${t.tx}px) translateY(${t.ty}px) rotate(${t.r}deg)`;
  c.style.opacity = '0';

  // Animate back cards up
  const b1 = back1();
  b1.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s';
  b1.style.transform = 'scale(1) translateY(0)';
  b1.style.opacity = '1';

  setTimeout(() => {
    resetCard();
    loadQuestion();
    callback && callback();
  }, 440);
}

function resetCard() {
  const c = card();
  c.style.transition = 'none';
  c.style.transform = '';
  c.style.opacity = '1';
  // Reset overlay
  const ov = overlay();
  ov.style.opacity = '0';
  ov.style.background = '';
  // Hide hints
  [hintR(), hintL(), hintU(), hintD()].forEach(h => h?.classList.remove('visible'));
  // Reset back cards
  const b1 = back1();
  b1.style.transition = 'none';
  b1.style.transform = '';
  b1.style.opacity = '';
}

// ─── SPRING BACK ──────────────────────────────────────
function springBack() {
  const c = card();
  c.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s';
  c.style.transform = 'translateX(0) translateY(0) rotate(0deg)';
  c.style.opacity = '1';
  const ov = overlay();
  ov.style.transition = 'opacity 0.3s';
  ov.style.opacity = '0';
  [hintR(), hintL(), hintU(), hintD()].forEach(h => h?.classList.remove('visible'));
  setTimeout(() => { c.style.transition = ''; }, 600);
}

// ─── DRAG OVERLAY UPDATE ──────────────────────────────
function updateDragOverlay(dx, dy) {
  const ov = overlay();
  const absDx = Math.abs(dx), absDy = Math.abs(dy);
  const dominant = absDx > absDy ? 'x' : 'y';

  let color = '', intensity = 0;
  let rH = false, lH = false, uH = false, dH = false;

  if (dominant === 'x') {
    intensity = Math.min(absDx / 120, 1);
    if (dx > 0) { color = `rgba(6,214,160,${intensity * 0.35})`; rH = intensity > 0.4; }
    else         { color = `rgba(255,71,87,${intensity * 0.35})`; lH = intensity > 0.4; }
  } else {
    intensity = Math.min(absDy / 100, 1);
    if (dy < 0) { color = `rgba(124,58,237,${intensity * 0.4})`; uH = intensity > 0.4; }
    else         { color = `rgba(107,107,154,${intensity * 0.25})`; dH = intensity > 0.4; }
  }

  ov.style.background = color;
  ov.style.opacity = '1';
  hintR().classList.toggle('visible', rH);
  hintL().classList.toggle('visible', lH);
  hintU().classList.toggle('visible', uH);
  hintD().classList.toggle('visible', dH);
}

// ─── SPECTRUM MODE ────────────────────────────────────
function enterSpectrumMode() {
  if (state.isSpectrumMode) return;
  state.isSpectrumMode = true;

  const c = card();
  c.style.cursor = 'ew-resize';
  swipeHint()?.style.setProperty('display', 'none');
  specWrap().classList.add('visible');
  modeInd().classList.add('spectrum');
  modeLabel().textContent = 'Spectrum';

  // Reset spectrum to center
  state.spectrumValue = 0;
  updateSpectrumUI();
}

function exitSpectrumMode() {
  state.isSpectrumMode = false;
  const c = card();
  c.style.cursor = 'grab';
  swipeHint()?.style.removeProperty('display');
  specWrap().classList.remove('visible');
  modeInd().classList.remove('spectrum');
  modeLabel().textContent = 'Swipe';
}

function updateSpectrumUI() {
  const v = state.spectrumValue; // -1 to 1
  const pct = (v + 1) / 2 * 100; // 0 to 100
  specThumb().style.left = pct + '%';

  // Thumb color
  if (v > 0.15)       { specThumb().style.borderColor = 'var(--mint-500)'; }
  else if (v < -0.15) { specThumb().style.borderColor = 'var(--red-400)'; }
  else                { specThumb().style.borderColor = 'var(--neutral-300)'; }

  // Label
  if      (v > 0.6)  specLabel().textContent = 'Rất đồng ý ⚡';
  else if (v > 0.2)  specLabel().textContent = 'Đồng ý ✓';
  else if (v > -0.2) specLabel().textContent = 'Trung lập –';
  else if (v > -0.6) specLabel().textContent = 'Không đồng ý';
  else               specLabel().textContent = 'Hoàn toàn không đồng ý ✕';
}

function confirmSpectrumAnswer() {
  const v = state.spectrumValue;
  let direction;
  if      (v > 0.5)  direction = 'strong';
  else if (v > 0.1)  direction = 'agree';
  else if (v > -0.1) direction = 'neutral';
  else               direction = 'disagree';

  exitSpectrumMode();
  recordAnswer(direction, v);
  flingCard(direction === 'strong' ? 'up' : direction === 'agree' ? 'right' : direction === 'neutral' ? 'down' : 'left');
}

// ─── POINTER EVENTS ───────────────────────────────────
function getClientXY(e) {
  if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function onDown(e) {
  if (e.button && e.button !== 0) return;
  e.preventDefault();
  const { x, y } = getClientXY(e);
  state.startClientX = x;
  state.startClientY = y;
  state.dragging = false;
  state.currentDx = 0;
  state.currentDy = 0;

  if (state.isSpectrumMode) return; // spectrum handles its own drag

  // Start hold timer
  state.holdTimer = setTimeout(() => {
    if (!state.dragging) enterSpectrumMode();
  }, HOLD_MS);
}

function onMove(e) {
  e.preventDefault();
  const { x, y } = getClientXY(e);
  const dx = x - state.startClientX;
  const dy = y - state.startClientY;

  if (state.isSpectrumMode) {
    // Horizontal drag = spectrum value
    const trackW = 200; // approx card width - padding
    state.spectrumValue = Math.max(-1, Math.min(1, dx / trackW));
    updateSpectrumUI();
    return;
  }

  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > MOVE_DEAD) {
    state.dragging = true;
    clearTimeout(state.holdTimer);
  }

  if (!state.dragging) return;

  state.currentDx = dx;
  state.currentDy = dy;

  // Apply transform
  const rotate = dx * 0.07;
  const c = card();
  c.style.transition = 'none';
  c.style.transform = `translateX(${dx}px) translateY(${dy * 0.6}px) rotate(${rotate}deg)`;

  updateDragOverlay(dx, dy);
}

function onUp(e) {
  clearTimeout(state.holdTimer);

  if (state.isSpectrumMode) return; // spectrum confirm via button
  if (!state.dragging) { springBack(); return; }

  const dx = state.currentDx;
  const dy = state.currentDy;
  const absDx = Math.abs(dx), absDy = Math.abs(dy);
  const dominant = absDx > absDy ? 'x' : 'y';

  if (dominant === 'x' && absDx > SWIPE_X) {
    const dir = dx > 0 ? 'right' : 'left';
    const answerDir = dx > 0 ? 'agree' : 'disagree';
    recordAnswer(answerDir);
    flingCard(dir);
  } else if (dominant === 'y' && absDy > SWIPE_Y) {
    const dir = dy < 0 ? 'up' : 'down';
    const answerDir = dy < 0 ? 'strong' : 'neutral';
    recordAnswer(answerDir);
    flingCard(dir);
  } else {
    springBack();
  }

  state.dragging = false;
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────
document.addEventListener('keydown', (e) => {
  if (state.isSpectrumMode) {
    if (e.key === 'Enter') { confirmSpectrumAnswer(); return; }
    if (e.key === 'Escape') { exitSpectrumMode(); springBack(); return; }
    if (e.key === 'ArrowLeft')  { state.spectrumValue = Math.max(-1, state.spectrumValue - 0.1); updateSpectrumUI(); }
    if (e.key === 'ArrowRight') { state.spectrumValue = Math.min(1,  state.spectrumValue + 0.1); updateSpectrumUI(); }
    return;
  }
  const map = { ArrowRight:'right', d:'right', ArrowLeft:'left', a:'left', ArrowUp:'up', w:'up', ArrowDown:'down', s:'down' };
  const dir = map[e.key];
  if (!dir) return;
  const answerMap = { right:'agree', left:'disagree', up:'strong', down:'neutral' };
  recordAnswer(answerMap[dir]);
  flingCard(dir);
});

// ─── ATTACH EVENTS ────────────────────────────────────
function attachCardEvents() {
  const c = card();
  // Mouse
  c.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  // Touch
  c.addEventListener('touchstart', onDown, { passive: false });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onUp);
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildStoryBar();
  loadQuestion();
  updateScoreboard();
  attachCardEvents();

  // Undo button
  document.getElementById('undoBtn').addEventListener('click', undoLast);

  // Spectrum confirm button
  document.getElementById('spectrumConfirmBtn').addEventListener('click', confirmSpectrumAnswer);
});