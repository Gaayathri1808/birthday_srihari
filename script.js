// Birthday target: 18 Nov 2026 00:00:00 IST (UTC+5:30)
const targetDate = new Date("2026-11-18T00:00:00+05:30").getTime();
let previewMode = false;
let audioPlaying = false;
let audioCtx = null;
let currentScreen = 'screen-countdown';

// Letter Text exactly as provided by user
const LETTER_TEXT = `Happiest birthday bawa 💜🩵

This day will always be my most special day this day has gave me you 🤗 Enakku inaikkum enaikkum you are so special 🍃✨ you showed me what is love 🩵 you showed me how it feels to become prioritized 🩵 you made me special 🩵 you made me adore me 🩵 you made me feel sex 🫣 so you are the person that's the whole eternity to me 💜🩵

Naalaikku unakku oru gift kuttyah personal ah adha vaangiko 🙈😁 periya gift enta nerla vaangiko 😘 adha vida periya gift ennaiye aprom mothama vaangiko 🫣🙈

we are having conflicts neraya prechana irukku but we are all strong together innum neraya varusham unkooda sandhosama irukkanum namakkunu oru life namakkunu oru veedu namba namba pasanga namba business nu aduthu vazhkaiya happy unkooda vazhanum adhukku nee innum neraya birthdays kondadanum so blessing you a long longgg longgggg years of age and happiness ( enkooda irukkanala unakku neraya kedaikkum 😁 ) 🎇✨

Once happy 21 my dear dearer dearest bawa 🫂😘 ( konjam poruppum bayamum valathukonga 🫣 )

I love you and only you the most bawa ` + "😘".repeat(500);

// Screen Navigation
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    currentScreen = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Countdown Logic
function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0 && !previewMode) {
    showScreen('screen-celebrate');
    startFireworks();
    return;
  }

  const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const h = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const m = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
  const s = Math.max(0, Math.floor((diff / 1000) % 60));

  document.getElementById('days').innerText = String(d).padStart(2, '0');
  document.getElementById('hours').innerText = String(h).padStart(2, '0');
  document.getElementById('minutes').innerText = String(m).padStart(2, '0');
  document.getElementById('seconds').innerText = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Preview Mode Toggle
const previewBtn = document.getElementById('previewModeBtn');
const previewText = document.getElementById('previewText');
const quickTestBtn = document.getElementById('quickTestBtn');

function triggerMidnightCelebration() {
  previewMode = true;
  previewText.innerText = "Back to Countdown";
  showScreen('screen-celebrate');
  startFireworks();
  startMusic();
}

previewBtn.addEventListener('click', () => {
  if (!previewMode) {
    triggerMidnightCelebration();
  } else {
    previewMode = false;
    previewText.innerText = "Preview Midnight";
    showScreen('screen-countdown');
  }
});
if (quickTestBtn) {
  quickTestBtn.addEventListener('click', triggerMidnightCelebration);
}

// Screen 2 -> Screen 3
document.getElementById('goToCakeBtn').addEventListener('click', () => {
  showScreen('screen-cake');
});

// Screen 3: Cake Candle Extinguish & WhatsApp
const candle = document.getElementById('candle');
const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const wishSection = document.getElementById('wishSection');
let blownOut = false;

candle.addEventListener('click', () => {
  if (!blownOut) {
    blownOut = true;
    flame.classList.add('extinguished');
    smoke.classList.add('puff');
    playTone(523.25, 0.4);
    burstConfetti();
    setTimeout(() => {
      wishSection.classList.remove('hidden');
      wishSection.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  }
});

document.getElementById('submitWishBtn').addEventListener('click', () => {
  const wish = document.getElementById('wishInput').value.trim() || 'You are my biggest wish!';
  const phone = '917448608647';
  const text = encodeURIComponent(`My birthday wish is: ${wish} 💜`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  setTimeout(() => {
    showScreen('screen-game');
    initBalloonGame();
  }, 1000);
});

document.getElementById('goToGameBtn').addEventListener('click', () => {
  showScreen('screen-game');
  initBalloonGame();
});

// Screen 4: Balloon Game (13 Balloons)
const balloonLetters = ['I', 'L', 'O', 'V', 'E', 'Y', 'O', 'U', 'B', 'A', 'W', 'A', '💜'];
let poppedCount = 0;

function initBalloonGame() {
  const arena = document.getElementById('balloonArena');
  const wordBar = document.getElementById('revealedWord');
  arena.innerHTML = '';
  wordBar.innerHTML = '';
  poppedCount = 0;
  document.getElementById('gameSuccessModal').classList.add('hidden');

  const fullWord = "I LOVE YOU BAWA 💜";
  for (let ch of fullWord) {
    const slot = document.createElement('span');
    slot.className = ch === ' ' ? 'letter-slot space' : 'letter-slot';
    slot.innerText = ch === ' ' ? ' ' : '_';
    wordBar.appendChild(slot);
  }

  const colors = [
    'linear-gradient(135deg, #a855f7, #6b21a8)',
    'linear-gradient(135deg, #38bdf8, #0284c7)',
    'linear-gradient(135deg, #ec4899, #be185d)',
    'linear-gradient(135deg, #c084fc, #7e22ce)',
    'linear-gradient(135deg, #7dd3fc, #0369a1)',
    'linear-gradient(135deg, #f472b6, #db2777)'
  ];

  balloonLetters.forEach((letter, index) => {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.background = colors[index % colors.length];
    b.style.animationDelay = (index * 0.25) + 's';

    const shine = document.createElement('div');
    shine.className = 'balloon-shine';
    b.appendChild(shine);

    const num = document.createElement('span');
    num.className = 'balloon-number';
    num.innerText = index + 1;
    b.appendChild(num);

    b.addEventListener('click', () => {
      if (b.classList.contains('popping')) return;
      b.classList.add('popping');
      playPopSound();
      revealLetter(index, letter);
      poppedCount++;
      if (poppedCount === balloonLetters.length) {
        setTimeout(() => {
          document.getElementById('gameSuccessModal').classList.remove('hidden');
          burstConfetti();
        }, 600);
      }
    });

    arena.appendChild(b);
  });
}

function revealLetter(idx, char) {
  const slots = document.querySelectorAll('#revealedWord .letter-slot:not(.space)');
  if (slots[idx]) {
    slots[idx].innerText = char;
    slots[idx].classList.add('revealed');
  }
}

document.getElementById('goToLetterBtn').addEventListener('click', () => {
  showScreen('screen-letter');
});

// Screen 5: Love Letter
const waxSeal = document.getElementById('waxSeal');
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letterPaper');
const letterBodyText = document.getElementById('letterBodyText');
letterBodyText.innerText = LETTER_TEXT;

waxSeal.addEventListener('click', openLetter);
envelope.addEventListener('click', openLetter);

function openLetter() {
  envelope.classList.add('open');
  playTone(440, 0.3);
  setTimeout(() => {
    letterPaper.classList.add('open');
    letterPaper.scrollIntoView({ behavior: 'smooth' });
    burstConfetti();
  }, 500);
}

document.getElementById('restartTourBtn').addEventListener('click', () => {
  showScreen('screen-countdown');
});

// Stars Background Canvas
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 3500);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    });
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0.1) s.speed = -s.speed;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(216, 180, 254, ${Math.abs(s.alpha)})`;
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Fireworks Canvas
const fwCanvas = document.getElementById('fireworksCanvas');
const fwCtx = fwCanvas.getContext('2d');
let particles = [];
let fwActive = false;

function resizeFwCanvas() {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeFwCanvas);
resizeFwCanvas();

function startFireworks() {
  fwActive = true;
  for (let i = 0; i < 5; i++) {
    createFirework();
  }
}

function createFirework() {
  const x = Math.random() * fwCanvas.width;
  const y = Math.random() * (fwCanvas.height * 0.5) + 50;
  const colors = ['#f472b6', '#38bdf8', '#c084fc', '#facc15', '#ffffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      decay: Math.random() * 0.02 + 0.015
    });
  }
}

function animateFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // gravity
    p.alpha -= p.decay;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.globalAlpha = p.alpha;
    fwCtx.fill();
    fwCtx.globalAlpha = 1;
  }
  if (fwActive && Math.random() < 0.06 && particles.length < 150) {
    createFirework();
  }
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function burstConfetti() {
  for (let i = 0; i < 4; i++) {
    createFirework();
  }
}

// Web Audio API Ambient Romantic Synthesizer
const melodyNotes = [
  261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00,
  329.63, 349.23, 392.00, 440.00, 523.25, 587.33, 523.25, 392.00
];
let noteIndex = 0;
let musicInterval = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq, duration = 0.5) {
  try {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {}
}

function playPopSound() {
  playTone(880, 0.15);
}

function startMusic() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  audioPlaying = true;
  document.getElementById('musicToggleBtn').classList.add('playing');
  document.querySelector('.music-text').innerText = "Music: On 🎵";

  if (!musicInterval) {
    musicInterval = setInterval(() => {
      if (audioPlaying) {
        playTone(melodyNotes[noteIndex], 0.8);
        noteIndex = (noteIndex + 1) % melodyNotes.length;
      }
    }, 450);
  }
}

function stopMusic() {
  audioPlaying = false;
  document.getElementById('musicToggleBtn').classList.remove('playing');
  document.querySelector('.music-text').innerText = "Music: Off";
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

document.getElementById('musicToggleBtn').addEventListener('click', () => {
  if (audioPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

// Unlock audio on first user touch
document.addEventListener('click', () => {
  initAudio();
}, { once: true });
