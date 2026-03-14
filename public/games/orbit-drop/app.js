const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerValue = document.getElementById('playerValue');
const scoreValue = document.getElementById('scoreValue');
const bestValue = document.getElementById('bestValue');
const comboValue = document.getElementById('comboValue');
const phaseValue = document.getElementById('phaseValue');
const bestDockValue = document.getElementById('bestDockValue');
const comboDockValue = document.getElementById('comboDockValue');
const phaseDockValue = document.getElementById('phaseDockValue');
const finalPlayer = document.getElementById('finalPlayer');
const finalScore = document.getElementById('finalScore');
const finalBest = document.getElementById('finalBest');
const gameOverTitle = document.getElementById('gameOverTitle');
const rankLine = document.getElementById('rankLine');
const eventBanner = document.getElementById('eventBanner');
const leaderboardList = document.getElementById('leaderboardList');
const playerNameInput = document.getElementById('playerNameInput');

const startOverlay = document.getElementById('startOverlay');
const pauseOverlay = document.getElementById('pauseOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const startButton = document.getElementById('startButton');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const restartTopButton = document.getElementById('restartTopButton');
const pauseRestartButton = document.getElementById('pauseRestartButton');
const homeButton = document.getElementById('homeButton');
const pauseHomeButton = document.getElementById('pauseHomeButton');
const gameOverHomeButton = document.getElementById('gameOverHomeButton');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const STORAGE_KEY = 'orbit-drop-leaderboard';
const PLAYER_KEY = 'orbit-drop-player-name';
const LEADERBOARD_LIMIT = 5;
const BASE_SPEED = 200;
const MAX_DT = 1 / 30;

const phases = [
  { start: 0, label: 'Calm Orbit', speed: 1, ringInterval: 2.15, rotation: 0.8 },
  { start: 18, label: 'Tight Drift', speed: 1.14, ringInterval: 1.9, rotation: 1.0 },
  { start: 36, label: 'Pulse Lanes', speed: 1.28, ringInterval: 1.68, rotation: 1.2 },
  { start: 54, label: 'Singularity', speed: 1.42, ringInterval: 1.5, rotation: 1.38 },
];

const state = {
  mode: 'start',
  time: 0,
  score: 0,
  best: 0,
  combo: 0,
  playerName: loadPlayerName(),
  leaderboard: loadLeaderboard(),
  lastTimestamp: 0,
  bannerTimer: 0,
  bannerText: 'Tap or press space to flip horizontal drift. Pass through the glowing gate opening.',
  justSavedRank: null,
  stars: makeStars(),
  particles: [],
  rings: [],
  nextRingAt: 0,
  player: createPlayer(),
};

state.best = state.leaderboard[0]?.score || 0;
playerNameInput.value = state.playerName;

function createPlayer() {
  return {
    x: WIDTH * 0.5,
    y: HEIGHT * 0.18,
    radius: 18,
    drift: 1,
    speedX: 280,
    trail: [],
    flash: 0,
  };
}

function makeStars() {
  return Array.from({ length: 90 }, () => ({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 18 + 10,
    alpha: Math.random() * 0.7 + 0.2,
  }));
}

function currentPhase() {
  let active = phases[0];
  for (const phase of phases) {
    if (state.time >= phase.start) active = phase;
  }
  return active;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function loadPlayerName() {
  return (localStorage.getItem(PLAYER_KEY) || '').trim();
}

function savePlayerName(name) {
  localStorage.setItem(PLAYER_KEY, name);
}

function loadLeaderboard() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry) => entry && typeof entry.name === 'string' && Number.isFinite(entry.score))
      .map((entry) => ({ name: entry.name.slice(0, 18), score: Math.floor(entry.score) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, LEADERBOARD_LIMIT);
  } catch {
    return [];
  }
}

function saveLeaderboard() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.leaderboard));
}

function updateLeaderboard(score) {
  const entry = { name: state.playerName, score: Math.floor(score) };
  state.leaderboard.push(entry);
  state.leaderboard = state.leaderboard.sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_LIMIT);
  saveLeaderboard();
  state.best = state.leaderboard[0]?.score || 0;
  const rank = state.leaderboard.findIndex((item) => item.name === entry.name && item.score === entry.score);
  return rank >= 0 ? rank + 1 : null;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function renderLeaderboard() {
  leaderboardList.innerHTML = '';
  if (!state.leaderboard.length) {
    const empty = document.createElement('li');
    empty.innerHTML = '<span class="rank">—</span><span class="name">No runs yet. Start the orbit.</span><span class="score">0</span>';
    leaderboardList.appendChild(empty);
    return;
  }

  state.leaderboard.forEach((entry, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <span class="name">${escapeHtml(entry.name)}</span>
      <span class="score">${entry.score}</span>
    `;
    leaderboardList.appendChild(item);
  });
}

function setBanner(text, duration = 2.2) {
  state.bannerText = text;
  state.bannerTimer = duration;
  eventBanner.textContent = text;
}

function updateHud() {
  const phase = currentPhase();
  playerValue.textContent = state.playerName || 'Guest';
  scoreValue.textContent = Math.floor(state.score).toString();
  bestValue.textContent = Math.floor(state.best).toString();
  comboValue.textContent = `x${Math.max(1, state.combo + 1)}`;
  phaseValue.textContent = phase.label;
  bestDockValue.textContent = Math.floor(state.best).toString();
  comboDockValue.textContent = `x${Math.max(1, state.combo + 1)}`;
  phaseDockValue.textContent = phase.label;
}

function syncOverlayState() {
  const overlayOpen = state.mode === 'start' || state.mode === 'paused' || state.mode === 'gameover';
  document.body.classList.toggle('overlay-open', overlayOpen);
  startOverlay.classList.toggle('visible', state.mode === 'start');
  pauseOverlay.classList.toggle('visible', state.mode === 'paused');
  gameOverOverlay.classList.toggle('visible', state.mode === 'gameover');
}

function resetRun() {
  state.time = 0;
  state.score = 0;
  state.combo = 0;
  state.rings = [];
  state.particles = [];
  state.player = createPlayer();
  state.nextRingAt = 0.8;
  state.justSavedRank = null;
  setBanner('Flip drift to line up with the opening. Perfect center passes score more.', 3);
  updateHud();
}

function startRun() {
  const name = playerNameInput.value.trim();
  if (!name) {
    setBanner('Enter your name first so your score can stick to the leaderboard.', 2.6);
    playerNameInput.focus();
    return;
  }

  state.playerName = name.slice(0, 18);
  savePlayerName(state.playerName);
  resetRun();
  state.mode = 'playing';
  syncOverlayState();
}

function pauseRun() {
  if (state.mode !== 'playing') return;
  state.mode = 'paused';
  syncOverlayState();
}

function resumeRun() {
  if (state.mode !== 'paused') return;
  state.mode = 'playing';
  syncOverlayState();
}

function endRun(reason) {
  state.mode = 'gameover';
  state.justSavedRank = updateLeaderboard(state.score);
  renderLeaderboard();
  updateHud();
  finalPlayer.textContent = state.playerName || 'Guest';
  finalScore.textContent = Math.floor(state.score).toString();
  finalBest.textContent = Math.floor(state.best).toString();
  gameOverTitle.textContent = reason || 'You clipped the ring.';
  rankLine.textContent = state.justSavedRank ? `Leaderboard rank: #${state.justSavedRank}` : 'Score saved to leaderboard';
  syncOverlayState();
}

function quitToHome() {
  window.location.href = '/games';
}

function toggleDrift() {
  if (state.mode === 'start') {
    startRun();
    return;
  }
  if (state.mode !== 'playing') return;
  state.player.drift *= -1;
  state.player.flash = 0.18;
}

function spawnRing() {
  const phase = currentPhase();
  const gapSize = randomBetween(0.78, 1.18);
  const radius = randomBetween(122, 176);
  const gateAngle = randomBetween(0, Math.PI * 2);
  const rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * randomBetween(phase.rotation * 0.65, phase.rotation * 1.15);
  state.rings.push({
    x: WIDTH * 0.5,
    y: HEIGHT + radius + 80,
    radius,
    thickness: 22,
    gapSize,
    gapAngle: gateAngle,
    rotationSpeed,
    scored: false,
    perfect: false,
  });
}

function updatePlayer(dt) {
  const player = state.player;
  player.x += player.drift * player.speedX * dt;
  const minX = 76;
  const maxX = WIDTH - 76;
  if (player.x < minX) {
    player.x = minX;
    player.drift = 1;
  }
  if (player.x > maxX) {
    player.x = maxX;
    player.drift = -1;
  }

  player.trail.push({ x: player.x, y: player.y, life: 0.5 });
  if (player.trail.length > 18) player.trail.shift();
  player.trail.forEach((node) => { node.life -= dt; });
  player.trail = player.trail.filter((node) => node.life > 0);
  player.flash = Math.max(0, player.flash - dt);
}

function angleDistance(a, b) {
  const diff = Math.atan2(Math.sin(a - b), Math.cos(a - b));
  return Math.abs(diff);
}

function updateRings(dt) {
  const phase = currentPhase();
  const scrollSpeed = BASE_SPEED * phase.speed;

  for (const ring of state.rings) {
    ring.y -= scrollSpeed * dt;
    ring.gapAngle += ring.rotationSpeed * dt;

    const dx = state.player.x - ring.x;
    const dy = state.player.y - ring.y;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const withinBand = dist > ring.radius - ring.thickness - state.player.radius && dist < ring.radius + state.player.radius;
    const insideGap = angleDistance(angle, ring.gapAngle) < ring.gapSize / 2;

    if (withinBand && !insideGap) {
      burst(state.player.x, state.player.y, '#ff7a93', 24);
      endRun('You clipped the ring.');
      return;
    }

    if (!ring.scored && ring.y < state.player.y) {
      ring.scored = true;
      const centerDelta = angleDistance(angle, ring.gapAngle);
      const perfect = centerDelta < ring.gapSize * 0.18;
      ring.perfect = perfect;
      state.combo += 1;
      const points = perfect ? 160 + state.combo * 35 : 100 + state.combo * 20;
      state.score += points;
      setBanner(perfect ? 'Perfect pass. Chain climbing.' : 'Clean pass. Keep the core alive.', 1.4);
      burst(state.player.x, state.player.y, perfect ? '#ffd968' : '#72f6ff', perfect ? 20 : 14);
    }
  }

  state.rings = state.rings.filter((ring) => ring.y > -ring.radius - 100);
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    state.particles.push({
      x,
      y,
      vx: randomBetween(-180, 180),
      vy: randomBetween(-180, 180),
      life: randomBetween(0.35, 0.8),
      maxLife: 1,
      size: randomBetween(2, 5),
      color,
    });
  }
}

function updateParticles(dt) {
  for (const particle of state.particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
  }
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function updateStars(dt) {
  const speed = BASE_SPEED * currentPhase().speed * 0.24;
  for (const star of state.stars) {
    star.y -= (star.speed + speed) * dt;
    if (star.y < -4) {
      star.y = HEIGHT + 4;
      star.x = Math.random() * WIDTH;
    }
  }
}

function update(dt) {
  if (state.mode !== 'playing') return;

  state.time += dt;
  state.score += dt * 12 * currentPhase().speed;

  if (state.bannerTimer > 0) {
    state.bannerTimer -= dt;
    if (state.bannerTimer <= 0) eventBanner.textContent = 'Tap or press space to flip horizontal drift. Pass through the glowing gate opening.';
  }

  if (state.time >= state.nextRingAt) {
    spawnRing();
    state.nextRingAt = state.time + currentPhase().ringInterval * randomBetween(0.92, 1.08);
  }

  updatePlayer(dt);
  updateStars(dt);
  updateRings(dt);
  updateParticles(dt);
  updateHud();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, '#0a1533');
  gradient.addColorStop(0.45, '#071224');
  gradient.addColorStop(1, '#04070f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (const star of state.stars) {
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = '#d6ecff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const glow = ctx.createRadialGradient(WIDTH * 0.5, HEIGHT * 0.22, 30, WIDTH * 0.5, HEIGHT * 0.22, WIDTH * 0.42);
  glow.addColorStop(0, 'rgba(114,246,255,0.18)');
  glow.addColorStop(0.45, 'rgba(138,125,255,0.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawRing(ring) {
  ctx.save();
  ctx.translate(ring.x, ring.y);
  ctx.rotate(ring.gapAngle);

  ctx.lineWidth = ring.thickness;
  ctx.strokeStyle = 'rgba(110, 200, 255, 0.18)';
  ctx.shadowBlur = 28;
  ctx.shadowColor = 'rgba(114,246,255,0.18)';

  const start = ring.gapSize / 2;
  const end = Math.PI * 2 - ring.gapSize / 2;
  ctx.beginPath();
  ctx.arc(0, 0, ring.radius, start, end);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, ring.radius + ring.thickness * 0.55, start, end);
  ctx.stroke();

  const gateGradient = ctx.createLinearGradient(ring.radius, 0, ring.radius - 140, 0);
  gateGradient.addColorStop(0, '#ffd968');
  gateGradient.addColorStop(1, '#72f6ff');
  ctx.strokeStyle = gateGradient;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, ring.radius, -ring.gapSize / 2, ring.gapSize / 2);
  ctx.stroke();

  ctx.restore();
}

function drawPlayer() {
  const player = state.player;
  player.trail.forEach((node, index) => {
    const alpha = Math.max(0, node.life / 0.5) * ((index + 1) / player.trail.length) * 0.3;
    ctx.fillStyle = `rgba(114,246,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, player.radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
  });

  const glow = ctx.createRadialGradient(player.x, player.y, 4, player.x, player.y, player.radius * 3.2);
  glow.addColorStop(0, 'rgba(255,255,255,0.95)');
  glow.addColorStop(0.28, 'rgba(114,246,255,0.95)');
  glow.addColorStop(0.68, 'rgba(138,125,255,0.45)');
  glow.addColorStop(1, 'rgba(138,125,255,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius * 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f5f8ff';
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = player.flash > 0 ? '#ffd968' : '#72f6ff';
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius + 6, 0, Math.PI * 2);
  ctx.stroke();
}

function drawParticles() {
  for (const particle of state.particles) {
    ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawGuide() {
  ctx.save();
  ctx.setLineDash([8, 14]);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(WIDTH * 0.5, 0);
  ctx.lineTo(WIDTH * 0.5, HEIGHT);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  drawBackground();
  drawGuide();
  state.rings.forEach(drawRing);
  drawParticles();
  drawPlayer();
}

function frame(timestamp) {
  const rawDt = Math.min(MAX_DT, (timestamp - state.lastTimestamp) / 1000 || 0);
  state.lastTimestamp = timestamp;
  update(rawDt);
  draw();
  requestAnimationFrame(frame);
}

function handlePrimaryAction(event) {
  if (event) event.preventDefault();
  if (state.mode === 'paused' || state.mode === 'gameover') return;
  toggleDrift();
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    handlePrimaryAction(event);
  }
  if (event.key === 'p' || event.key === 'P' || event.key === 'Escape') {
    if (state.mode === 'playing') pauseRun();
    else if (state.mode === 'paused') resumeRun();
  }
  if (event.key === 'r' || event.key === 'R') {
    if (state.mode === 'playing' || state.mode === 'paused' || state.mode === 'gameover') {
      resetRun();
      state.mode = 'playing';
      syncOverlayState();
    }
  }
  if (event.key === 'Enter' && state.mode === 'start') {
    startRun();
  }
});

canvas.addEventListener('pointerdown', handlePrimaryAction);
startButton.addEventListener('click', startRun);
resumeButton.addEventListener('click', resumeRun);
restartButton.addEventListener('click', () => {
  resetRun();
  state.mode = 'playing';
  syncOverlayState();
});
restartTopButton.addEventListener('click', () => {
  resetRun();
  state.mode = 'playing';
  syncOverlayState();
});
pauseRestartButton.addEventListener('click', () => {
  resetRun();
  state.mode = 'playing';
  syncOverlayState();
});
homeButton.addEventListener('click', quitToHome);
pauseHomeButton.addEventListener('click', quitToHome);
gameOverHomeButton.addEventListener('click', quitToHome);

renderLeaderboard();
updateHud();
syncOverlayState();
requestAnimationFrame(frame);
