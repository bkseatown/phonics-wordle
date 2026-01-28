/* ===============================
   Decode the Word – Stable Core
   =============================== */

const MAX_GUESSES = 6;
let CURRENT_WORD_LENGTH = 5;

let currentWord = "";
let currentEntry = null;
let guesses = [];
let currentGuess = "";
let gameOver = false;
let isUpperCase = false;
let cachedVoices = [];

/* DOM */
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const overlay = document.getElementById("modal-overlay");
const welcomeModal = document.getElementById("welcome-modal");
const teacherModal = document.getElementById("teacher-modal");
const endModal = document.getElementById("modal");
const banner = document.getElementById("banner-container");
const focusAnchor = document.getElementById("focus-anchor");

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  initVoices();
  initControls();
  initKeyboard();
  startNewGame();
  checkFirstVisit();
});

/* ---------- VOICES ---------- */
function initVoices() {
  const load = () => {
    cachedVoices = speechSynthesis.getVoices();
  };
  load();
  speechSynthesis.onvoiceschanged = load;
}

/* ---------- CONTROLS ---------- */
function initControls() {
  document.getElementById("new-word-btn").onclick = startNewGame;
  document.getElementById("case-toggle").onclick = toggleCase;

  document.getElementById("pattern-select").onchange = startNewGame;
  document.getElementById("length-select").onchange = startNewGame;

  document.getElementById("teacher-btn").onclick = () => openModal(teacherModal);
  document.getElementById("set-word-btn").onclick = submitTeacherWord;
  document.getElementById("toggle-mask").onclick = toggleMask;

  document.getElementById("hear-word-hint").onclick = () => speak(currentWord);
  document.getElementById("hear-sentence-hint").onclick = () => speak(currentEntry.sentence);
  document.getElementById("play-again-btn").onclick = startNewGame;
  document.getElementById("start-playing-btn").onclick = closeModal;

  document.querySelectorAll(".close-btn").forEach(b =>
    b.onclick = closeModal
  );

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal();
  });

  window.addEventListener("keydown", handleGlobalKeys);
}

/* ---------- KEY HANDLING ---------- */
function handleGlobalKeys(e) {
  if (!overlay.classList.contains("hidden")) {
    if (e.key === "Escape" || e.key === "Enter") closeModal();
    e.preventDefault();
    return;
  }

  if (gameOver) return;

  if (e.key === "Enter") submitGuess();
  else if (e.key === "Backspace") deleteLetter();
  else if (/^[a-z]$/i.test(e.key)) handleInput(e.key.toLowerCase());
}

/* ---------- MODALS ---------- */
function openModal(modal) {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  welcomeModal.classList.add("hidden");
  teacherModal.classList.add("hidden");
  endModal.classList.add("hidden");
  focusAnchor.focus();
}

/* ---------- BANNER ---------- */
function showBanner(text) {
  banner.textContent = text;
  banner.classList.remove("hidden");
  setTimeout(() => banner.classList.add("hidden"), 2500);
}

/* ---------- TEACHER ---------- */
function toggleMask() {
  const i = document.getElementById("custom-word-input");
  i.type = i.type === "password" ? "text" : "password";
  i.focus();
}

function submitTeacherWord() {
  const val = document.getElementById("custom-word-input").value.trim().toLowerCase();
  if (!/^[a-z]{3,10}$/.test(val)) {
    document.getElementById("teacher-error").textContent = "3–10 letters only.";
    return;
  }
  closeModal();
  showBanner("Teacher word accepted. Ready to play!");
  startNewGame(val);
}

/* ---------- GAME ---------- */
function startNewGame(forcedWord = null) {
  guesses = [];
  currentGuess = "";
  gameOver = false;
  board.innerHTML = "";
  updateFocusPanel();

  if (forcedWord) {
    currentWord = forcedWord;
    CURRENT_WORD_LENGTH = forcedWord.length;
    currentEntry = WORD_ENTRIES[forcedWord] || { def: "", sentence: "", syllables: forcedWord };
  } else {
    const data = getWord();
    currentWord = data.word;
    currentEntry = data.entry;
    CURRENT_WORD_LENGTH = currentWord.length;
  }

  board.style.gridTemplateColumns = `repeat(${CURRENT_WORD_LENGTH}, 50px)`;
  for (let i = 0; i < MAX_GUESSES * CURRENT_WORD_LENGTH; i++) {
    const t = document.createElement("div");
    t.className = "tile";
    board.appendChild(t);
  }
}

function handleInput(c) {
  if (currentGuess.length < CURRENT_WORD_LENGTH) {
    currentGuess += c;
    updateGrid();
  }
}

function deleteLetter() {
  currentGuess = currentGuess.slice(0, -1);
  updateGrid();
}

function submitGuess() {
  if (currentGuess.length !== CURRENT_WORD_LENGTH) return;
  const res = evaluate(currentGuess, currentWord);
  reveal(res);
  guesses.push(currentGuess);

  if (currentGuess === currentWord || guesses.length >= MAX_GUESSES) {
    gameOver = true;
    setTimeout(() => showEnd(), 1200);
  }
  currentGuess = "";
}

/* ---------- UTILS ---------- */
function speak(text) {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  const v = cachedVoices.find(v => v.lang.startsWith("en")) || cachedVoices[0];
  u.voice = v;
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

function checkFirstVisit() {
  if (!localStorage.getItem("decode_visited")) {
    openModal(welcomeModal);
    localStorage.setItem("decode_visited", "1");
  }
}
