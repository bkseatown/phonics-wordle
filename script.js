/* =========================================
   DECODE THE WORD - CORE LOGIC (GOLD MASTER)
   ========================================= */

const MAX_GUESSES = 6;
let CURRENT_WORD_LENGTH = 5;
let currentWord = "";
let currentEntry = null;
let guesses = [];
let currentGuess = "";
let gameOver = false;
let isFirstLoad = true;
let isUpperCase = false;

// DOM
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const modalOverlay = document.getElementById("modal-overlay");
const welcomeModal = document.getElementById("welcome-modal");
const teacherModal = document.getElementById("teacher-modal");
const gameModal = document.getElementById("modal");

document.addEventListener("DOMContentLoaded", () => {
    initControls();
    initKeyboard();
    startNewGame();
    checkFirstTimeVisitor();
});

function initControls() {
    // Buttons
    document.getElementById("new-word-btn").onclick = () => startNewGame();
    document.getElementById("case-toggle").onclick = toggleCase;
    
    // Selects
    document.getElementById("pattern-select").onchange = () => startNewGame();
    document.getElementById("length-select").onchange = (e) => {
        const val = e.target.value;
        CURRENT_WORD_LENGTH = val === 'any' ? 5 : parseInt(val);
        startNewGame();
    };

    // Teacher Mode
    document.getElementById("teacher-btn").onclick = openTeacherMode;
    document.getElementById("set-word-btn").onclick = handleTeacherSubmit;
    document.getElementById("toggle-mask").onclick = () => {
        const inp = document.getElementById("custom-word-input");
        inp.type = inp.type === "password" ? "text" : "password";
        // Re-focus to keep typing
        inp.focus();
    };

    // Hints
    document.getElementById("hear-word-hint").onclick = () => speak(currentWord);
    document.getElementById("hear-sentence-hint").onclick = () => {
        showToast("Sentence hint shared!");
        speak(currentEntry.sentence);
    };
    document.getElementById("speak-btn").onclick = () => speak(currentWord);

    // Modal Closing Logic (Outside Click, Buttons, Esc)
    document.querySelectorAll(".close-btn, .close-teacher, #start-playing-btn, #play-again-btn").forEach(btn => {
        btn.addEventListener("click", closeModal);
    });

    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) closeModal();
    };

    // Global Keyboard Listener
    window.addEventListener("keydown", (e) => {
        // If modal is open, only allow Escape or Enter (if valid context)
        if (!modalOverlay.classList.contains("hidden")) {
            if (e.key === "Escape") closeModal();
            if (e.key === "Enter" && !welcomeModal.classList.contains("hidden")) closeModal();
            return;
        }

        if (gameOver) return;

        if (e.key === "Enter") submitGuess();
        else if (e.key === "Backspace") deleteLetter();
        else if (/^[a-z]$/i.test(e.key)) handleInput(e.key.toLowerCase());
    });

    // Teacher Input Specifics (Prevent background typing)
    const tInput = document.getElementById("custom-word-input");
    tInput.addEventListener("keydown", (e) => {
        e.stopPropagation(); // Stop game board from receiving keys
        if (e.key === "Enter") handleTeacherSubmit();
        if (e.key === "Escape") closeModal();
    });
}

function startNewGame(customWord = null) {
    gameOver = false;
    guesses = [];
    currentGuess = "";
    board.innerHTML = "";
    clearKeyboardColors();
    updateFocusPanel();
    
    if (customWord) {
        currentWord = customWord.toLowerCase();
        CURRENT_WORD_LENGTH = currentWord.length;
        currentEntry = window.WORD_ENTRIES[currentWord] || { 
            def: "Teacher word.", sentence: "Can you decode this?", syllables: currentWord 
        };
    } else {
        const data = getWordFromDictionary();
        currentWord = data.word;
        currentEntry = data.entry;
        // If 'Any Length' is selected, update internal length to match the word
        if (document.getElementById("length-select").value === 'any') {
            CURRENT_WORD_LENGTH = currentWord.length;
        }
    }

    isFirstLoad = false;
    
    // Build Grid
    board.style.gridTemplateColumns = `repeat(${CURRENT_WORD_LENGTH}, 1fr)`;
    for (let i = 0; i < MAX_GUESSES * CURRENT_WORD_LENGTH; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = `tile-${i}`;
        board.appendChild(tile);
    }
}

function getWordFromDictionary() {
    const pattern = document.getElementById("pattern-select").value;
    const lenVal = document.getElementById("length-select").value;
    
    // First load forces 5 letters if 'any' is selected to maintain grid look
    let targetLen = (lenVal === 'any') ? (isFirstLoad ? 5 : null) : parseInt(lenVal);

    const pool = Object.keys(window.WORD_ENTRIES).filter(w => {
        const e = window.WORD_ENTRIES[w];
        const lenMatch = !targetLen || w.length === targetLen;
        const patMatch = pattern === 'all' || (e.tags && e.tags.includes(pattern));
        return lenMatch && patMatch;
    });

    // Fallback if no words match filter
    const final = pool.length ? pool[Math.floor(Math.random() * pool.length)] : "apple";
    return { word: final, entry: window.WORD_ENTRIES[final] };
}

function updateFocusPanel() {
    const pat = document.getElementById("pattern-select").value;
    const info = window.FOCUS_INFO[pat] || window.FOCUS_INFO.all;
    
    document.getElementById("focus-title").textContent = info.title;
    document.getElementById("focus-desc").textContent = info.desc;
    document.getElementById("focus-hint").textContent = info.hint;
    document.getElementById("focus-examples").textContent = info.examples || "";

    const quickRow = document.getElementById("quick-tiles-row");
    if (info.quick) {
        quickRow.innerHTML = "";
        info.quick.forEach(q => {
            const b = document.createElement("button");
            b.className = "q-tile";
            b.textContent = q;
            b.onclick = () => { 
                // Insert full quick tile string
                for(let c of q) handleInput(c); 
            };
            quickRow.appendChild(b);
        });
        quickRow.classList.remove("hidden");
    } else {
        quickRow.classList.add("hidden");
    }
}

// --- INPUT & GRID ---

function initKeyboard() {
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    keyboard.innerHTML = "";
    rows.forEach(r => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";
        r.split("").forEach(char => {
            const k = document.createElement("button");
            k.className = `key ${"aeiou".includes(char) ? 'vowel' : ''}`;
            k.textContent = isUpperCase ? char.toUpperCase() : char;
            k.dataset.key = char;
            k.onclick = () => handleInput(char);
            rowDiv.appendChild(k);
        });
        if (r === "zxcvbnm") {
            const ent = createKey("ENTER", submitGuess, true);
            const del = createKey("⌫", deleteLetter, true);
            rowDiv.prepend(ent);
            rowDiv.append(del);
        }
        keyboard.appendChild(rowDiv);
    });
}

function createKey(txt, action, wide) {
    const b = document.createElement("button");
    b.textContent = txt;
    b.className = `key ${wide ? 'wide' : ''}`;
    b.onclick = action;
    return b;
}

function handleInput(char) {
    if (currentGuess.length < CURRENT_WORD_LENGTH && !gameOver) {
        currentGuess += char;
        updateGrid();
    }
}

function deleteLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
}

function updateGrid() {
    const offset = guesses.length * CURRENT_WORD_LENGTH;
    
    // Clear current row
    for (let i = 0; i < CURRENT_WORD_LENGTH; i++) {
        const t = document.getElementById(`tile-${offset + i}`);
        t.textContent = "";
        t.className = "tile"; // reset
    }
    
    // Fill current row
    for (let i = 0; i < currentGuess.length; i++) {
        const t = document.getElementById(`tile-${offset + i}`);
        const char = currentGuess[i];
        t.textContent = isUpperCase ? char.toUpperCase() : char;
        t.className = "tile active";
    }
}

function toggleCase() {
    isUpperCase = !isUpperCase;
    document.getElementById("case-toggle").textContent = isUpperCase ? "ABC" : "abc";
    initKeyboard();
    
    // Refresh board to show new case
    // 1. Previous guesses
    guesses.forEach((g, rIdx) => {
        const off = rIdx * CURRENT_WORD_LENGTH;
        for(let i=0; i<CURRENT_WORD_LENGTH; i++) {
            const t = document.getElementById(`tile-${off+i}`);
            t.textContent = isUpperCase ? g[i].toUpperCase() : g[i];
        }
    });
    // 2. Current guess
    const currOff = guesses.length * CURRENT_WORD_LENGTH;
    for(let i=0; i<currentGuess.length; i++) {
        const t = document.getElementById(`tile-${currOff+i}`);
        t.textContent = isUpperCase ? currentGuess[i].toUpperCase() : currentGuess[i];
    }
}

// --- GAME LOGIC ---

function submitGuess() {
    if (currentGuess.length !== CURRENT_WORD_LENGTH) {
        // Simple shake effect
        const offset = guesses.length * CURRENT_WORD_LENGTH;
        const first = document.getElementById(`tile-${offset}`);
        if(first) {
            first.style.transform = "translateX(5px)";
            setTimeout(() => first.style.transform = "none", 100);
        }
        return;
    }
    
    const result = evaluate(currentGuess, currentWord);
    revealColors(result, currentGuess);
    guesses.push(currentGuess);

    if (currentGuess === currentWord) {
        gameOver = true;
        setTimeout(() => showEndModal(true), 1500);
    } else if (guesses.length >= MAX_GUESSES) {
        gameOver = true;
        setTimeout(() => showEndModal(false), 1500);
    } else {
        currentGuess = "";
    }
}

function evaluate(guess, target) {
    const res = Array(CURRENT_WORD_LENGTH).fill("absent");
    const tArr = target.split("");
    const gArr = guess.split("");

    // Green pass
    gArr.forEach((c, i) => {
        if (c === tArr[i]) {
            res[i] = "correct";
            tArr[i] = null;
            gArr[i] = null;
        }
    });
    // Yellow pass
    gArr.forEach((c, i) => {
        if (c && tArr.includes(c)) {
            res[i] = "present";
            tArr[tArr.indexOf(c)] = null;
        }
    });
    return res;
}

function revealColors(result, guess) {
    const offset = (guesses.length) * CURRENT_WORD_LENGTH;
    result.forEach((status, i) => {
        setTimeout(() => {
            const t = document.getElementById(`tile-${offset + i}`);
            t.classList.add(status);
            t.classList.add("pop"); // Animation

            const k = document.querySelector(`.key[data-key="${guess[i]}"]`);
            if (k) {
                // Priority: correct > present > absent
                if (status === "correct") k.className = `key ${isUpperCase?'':'vowel' in k.classList} correct`;
                else if (status === "present" && !k.classList.contains("correct")) k.className = `key ${isUpperCase?'':'vowel' in k.classList} present`;
                else if (status === "absent" && !k.classList.contains("correct") && !k.classList.contains("present")) k.className = `key ${isUpperCase?'':'vowel' in k.classList} absent`;
            }
        }, i * 200);
    });
}

// --- MODALS & HELPERS ---

function showEndModal(win) {
    modalOverlay.classList.remove("hidden");
    gameModal.classList.remove("hidden");
    document.getElementById("modal-title").textContent = win ? "Great Job!" : "Nice Try!";
    document.getElementById("modal-word").textContent = currentWord;
    document.getElementById("modal-syllables").textContent = currentEntry.syllableText || currentEntry.syllables.replace(/-/g, " • ");
    document.getElementById("modal-def").textContent = currentEntry.def;
    document.getElementById("modal-sentence").textContent = `"${currentEntry.sentence}"`;
    
    // Show bonus content after a short delay
    setTimeout(() => showBonusContent(), 2000);
}

function showBonusContent() {
    // Check if bonus bank exists
    if (!window.BONUS_BANK || !window.QUOTE_BANK) return;
    
    // Randomly choose between fact, joke, or quote
    const type = Math.random();
    let content = "";
    
    if (type < 0.4 && window.BONUS_BANK.facts.length > 0) {
        // Show a random fact
        const fact = window.BONUS_BANK.facts[Math.floor(Math.random() * window.BONUS_BANK.facts.length)];
        content = `<div class="bonus-header">✨ Did you know?</div><div class="bonus-text">${fact}</div>`;
    } else if (type < 0.7 && window.BONUS_BANK.jokes.length > 0) {
        // Show a random joke
        const joke = window.BONUS_BANK.jokes[Math.floor(Math.random() * window.BONUS_BANK.jokes.length)];
        content = `<div class="bonus-header">😄 Quick Joke</div><div class="bonus-text"><strong>${joke.q}</strong><br><em>${joke.a}</em></div>`;
    } else if (window.QUOTE_BANK.k2.length > 0) {
        // Show a random quote (for now, using k2 grade band as default)
        const allQuotes = [...window.QUOTE_BANK.k2, ...window.QUOTE_BANK.g3_5];
        const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        content = `<div class="bonus-header">💡 Remember</div><div class="bonus-text">"${quote.text}"</div>`;
    }
    
    if (!content) return;
    
    // Create and show bonus popup
    const bonusPopup = document.createElement("div");
    bonusPopup.className = "bonus-popup";
    bonusPopup.innerHTML = content;
    document.body.appendChild(bonusPopup);
    
    // Animate in
    setTimeout(() => bonusPopup.classList.add("show"), 10);
    
    // Auto-dismiss after 6 seconds
    setTimeout(() => {
        bonusPopup.classList.remove("show");
        setTimeout(() => bonusPopup.remove(), 300);
    }, 6000);
    
    // Click to dismiss
    bonusPopup.onclick = () => {
        bonusPopup.classList.remove("show");
        setTimeout(() => bonusPopup.remove(), 300);
    };
}

function openTeacherMode() {
    modalOverlay.classList.remove("hidden");
    teacherModal.classList.remove("hidden");
    const inp = document.getElementById("custom-word-input");
    inp.value = "";
    document.getElementById("teacher-error").textContent = "";
    inp.focus();
}

function handleTeacherSubmit() {
    const val = document.getElementById("custom-word-input").value.trim().toLowerCase();
    if (val.length < 3 || val.length > 10 || !/^[a-z]+$/.test(val)) {
        document.getElementById("teacher-error").textContent = "3-10 letters, no spaces.";
        return;
    }
    closeModal();
    showToast("Teacher word accepted. Ready!");
    startNewGame(val);
}

function closeModal() {
    modalOverlay.classList.add("hidden");
    welcomeModal.classList.add("hidden");
    teacherModal.classList.add("hidden");
    gameModal.classList.add("hidden");
}

function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.getElementById("toast-container").appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function checkFirstTimeVisitor() {
    if (!localStorage.getItem("decode_v4_visited")) {
        modalOverlay.classList.remove("hidden");
        welcomeModal.classList.remove("hidden");
        localStorage.setItem("decode_v4_visited", "true");
    }
}

function clearKeyboardColors() {
    document.querySelectorAll(".key").forEach(k => {
        k.classList.remove("correct", "present", "absent");
        // Maintain vowel class if needed, or re-init logic handles it
        // The loop in initKeyboard handles base classes
    });
    // Re-run init to reset clean slate or just remove classes manually. 
    // Easier to just re-init if toggling cases, but simple remove works.
    initKeyboard(); 
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    // Prefer natural sounding English voices (Google, Samantha, etc)
    const preferred = voices.find(v => (v.name.includes("Google") || v.name.includes("Samantha")) && v.lang.startsWith("en"));
    msg.voice = preferred || voices[0];
    msg.rate = 0.9;
    speechSynthesis.speak(msg);
}

// ================================
// Teacher Recording Studio (IndexedDB + MediaRecorder)
// ================================
let studioDbPromise = null;
function openStudioDb() {
  if (studioDbPromise) return studioDbPromise;
  studioDbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open("decode_the_word_audio_db", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("audio")) {
        db.createObjectStore("audio");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return studioDbPromise;
}
async function studioPut(key, blob) {
  const db = await openStudioDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("audio", "readwrite");
    tx.objectStore("audio").put(blob, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
async function studioGet(key) {
  const db = await openStudioDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("audio", "readonly");
    const req = tx.objectStore("audio").get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

function initStudio() {
  const openBtn = document.getElementById("open-studio-btn");
  const modal = document.getElementById("studio-modal");
  if (!openBtn || !modal) return; // studio not present in this build

  const closeBtn = document.getElementById("close-studio");
  const exitBtn = document.getElementById("studio-exit-btn");

  const setupView = document.getElementById("studio-setup-view");
  const recordView = document.getElementById("studio-record-view");

  const startBtn = document.getElementById("studio-start-btn");
  const nextBtn = document.getElementById("studio-next-btn");

  const counterEl = document.getElementById("studio-counter");
  const wordEl = document.getElementById("studio-word-display");
  const sentenceTA = document.getElementById("studio-sentence-display");

  const recWordBtn = document.getElementById("record-word-btn");
  const playWordBtn = document.getElementById("play-word-preview");
  const recSentenceBtn = document.getElementById("record-sentence-btn");
  const playSentenceBtn = document.getElementById("play-sentence-preview");

  const autoAdvance = document.getElementById("studio-auto-advance");
  const doWord = document.getElementById("record-word-checkbox");
  const doSentence = document.getElementById("record-sentence-checkbox");
  const progressEl = document.getElementById("studio-progress");

  // Guard: if any critical element missing, don't crash the app
  const required = [closeBtn, exitBtn, setupView, recordView, startBtn, nextBtn, counterEl, wordEl, sentenceTA, recWordBtn, playWordBtn, recSentenceBtn, playSentenceBtn];
  if (required.some(el => !el)) {
    console.warn("Recording Studio markup incomplete. Studio disabled to prevent crashes.");
    openBtn.style.display = "none";
    return;
  }

  let wordKeys = [];
  let studioIndex = 0;
  let stream = null;
  let recorder = null;
  let chunks = [];
  let recordingType = null; // "word" | "sentence"
  let isRecording = false;

  function showModal() {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
  function hideModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    // Ensure mic turns off if open
    stopStream();
  }

  function stopStream() {
    try {
      if (recorder && recorder.state !== "inactive") recorder.stop();
    } catch {}
    recorder = null;
    isRecording = false;
    recordingType = null;
    chunks = [];
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    // reset button labels and remove recording class
    recWordBtn.textContent = "Record";
    recSentenceBtn.textContent = "Record";
    recWordBtn.classList.remove("recording");
    recSentenceBtn.classList.remove("recording");
  }

  function currentWordKey() {
    return wordKeys[studioIndex] || null;
  }
  function currentEntry() {
    const k = currentWordKey();
    return (k && window.WORD_ENTRIES && window.WORD_ENTRIES[k]) ? window.WORD_ENTRIES[k] : null;
  }

  async function refreshUI() {
    if (!window.WORD_ENTRIES) {
      progressEl.textContent = "Word bank not loaded. Check phonics_focus_data.js path.";
      return;
    }
    wordKeys = Object.keys(window.WORD_ENTRIES);
    if (!wordKeys.length) {
      progressEl.textContent = "Word bank is empty.";
      return;
    }
    if (studioIndex < 0) studioIndex = 0;
    if (studioIndex >= wordKeys.length) studioIndex = 0;

    const k = currentWordKey();
    const entry = currentEntry();
    counterEl.textContent = `${studioIndex + 1} / ${wordKeys.length}`;
    wordEl.textContent = k ? k.toUpperCase() : "";
    sentenceTA.value = entry?.sentence || "";

    // enable/disable preview buttons based on recorded existence
    const wordBlob = await studioGet(`${k}_word`);
    playWordBtn.disabled = !wordBlob;
    const sentenceBlob = await studioGet(`${k}_sentence`);
    playSentenceBtn.disabled = !sentenceBlob;

    progressEl.textContent = "";
  }

  async function playBlob(blob) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.play();
  }

  async function startRecording(type) {
    if (isRecording) return;
    const k = currentWordKey();
    if (!k) return;

    // Respect teacher's selected scope
    if (type === "word" && doWord && !doWord.checked) return;
    if (type === "sentence" && doSentence && !doSentence.checked) return;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      recordingType = type;
      isRecording = true;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        await studioPut(`${k}_${recordingType}`, blob);

        // Show confirmation
        const statusEl = document.getElementById("recording-status");
        statusEl.textContent = `✓ ${recordingType === 'word' ? 'Word' : 'Sentence'} recording saved!`;
        statusEl.style.color = "#16a34a";
        setTimeout(() => {
          statusEl.textContent = "";
        }, 2000);

        // update preview availability
        if (recordingType === "word") playWordBtn.disabled = false;
        if (recordingType === "sentence") playSentenceBtn.disabled = false;

        // IMPORTANT: turn mic off
        stopStream();

        // auto-advance if desired and both selected parts recorded
        if (autoAdvance && autoAdvance.checked) {
          const needsWord = doWord ? doWord.checked : true;
          const needsSentence = doSentence ? doSentence.checked : true;
          const wordDone = !needsWord || (await studioGet(`${k}_word`));
          const sentenceDone = !needsSentence || (await studioGet(`${k}_sentence`));
          if (wordDone && sentenceDone) {
            studioIndex = Math.min(studioIndex + 1, wordKeys.length - 1);
            await refreshUI();
          }
        }
      };

      recorder.start();

      // update button label and show recording status
      const statusEl = document.getElementById("recording-status");
      if (type === "word") {
        recWordBtn.textContent = "🔴 Stop";
        recWordBtn.classList.add("recording");
        statusEl.textContent = "🎙️ Recording word...";
        statusEl.style.color = "#dc2626";
      }
      if (type === "sentence") {
        recSentenceBtn.textContent = "🔴 Stop";
        recSentenceBtn.classList.add("recording");
        statusEl.textContent = "🎙️ Recording sentence...";
        statusEl.style.color = "#dc2626";
      }

    } catch (err) {
      console.error(err);
      const statusEl = document.getElementById("recording-status");
      statusEl.textContent = "⚠️ Mic permission blocked. Please allow microphone access.";
      statusEl.style.color = "#dc2626";
      stopStream();
    }
  }

  function stopRecording() {
    if (!recorder) return;
    try {
      recorder.stop();
    } catch {
      stopStream();
    }
  }

  openBtn.onclick = () => {
    // swap views
    setupView.classList.remove("hidden");
    recordView.classList.add("hidden");
    showModal();
    progressEl.textContent = "";
  };

  closeBtn.onclick = hideModal;
  exitBtn.onclick = hideModal;

  // close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden") && e.key === "Escape") hideModal();
  });

  startBtn.onclick = async () => {
    setupView.classList.add("hidden");
    recordView.classList.remove("hidden");
    studioIndex = 0;
    await refreshUI();
  };

  nextBtn.onclick = async () => {
    studioIndex = Math.min(studioIndex + 1, (window.WORD_ENTRIES ? Object.keys(window.WORD_ENTRIES).length - 1 : studioIndex));
    await refreshUI();
  };

  recWordBtn.onclick = () => {
    if (isRecording && recordingType === "word") return stopRecording();
    startRecording("word");
  };
  recSentenceBtn.onclick = () => {
    if (isRecording && recordingType === "sentence") return stopRecording();
    // save edited sentence back to WORD_ENTRIES in-memory so it matches recording
    const entry = currentEntry();
    if (entry) entry.sentence = sentenceTA.value.trim();
    startRecording("sentence");
  };

  playWordBtn.onclick = async () => {
    const k = currentWordKey();
    const blob = await studioGet(`${k}_word`);
    playBlob(blob);
  };
  playSentenceBtn.onclick = async () => {
    const k = currentWordKey();
    const blob = await studioGet(`${k}_sentence`);
    playBlob(blob);
  };

  // Make sure DB is created early (non-blocking)
  openStudioDb().then(() => console.log("Audio DB Ready")).catch(() => {});
}

// Try to initialize studio after DOM is ready
document.addEventListener("DOMContentLoaded", initStudio);

/* =========================================
   PHASE 2: PASSAGE READER & PHONEME PRACTICE
   ========================================= */

// Initialize Phase 2 features
function initPhase2Features() {
  initPassageReader();
  initPhonemePractice();
  initTeacherControls();
  
  console.log("✓ Phase 2 features initialized");
}

// =======================
// PASSAGE READER
// =======================

function initPassageReader() {
  const passageBtn = document.getElementById('open-passage-btn');
  const passageModal = document.getElementById('passage-modal');
  const closeBtn = document.getElementById('close-passage');
  const playBtn = document.getElementById('passage-play-btn');
  const highlightBtn = document.getElementById('passage-highlight-btn');
  const questionsBtn = document.getElementById('passage-questions-btn');
  const anotherBtn = document.getElementById('passage-another-btn');
  
  if (!passageBtn || !passageModal) {
    console.warn("Passage reader elements not found");
    return;
  }
  
  let currentPassage = null;
  let highlightMode = false;
  
  // Open passage for current focus
  passageBtn.onclick = () => {
    const focus = document.getElementById('pattern-select').value;
    const passage = window.getRandomPassage(focus);
    
    if (passage) {
      currentPassage = passage;
      showPassage(passage);
    } else {
      showToast("No passages available for this focus yet!");
    }
  };
  
  // Close modal
  closeBtn.onclick = () => {
    passageModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    highlightMode = false;
  };
  
  // Play passage audio (using Web Speech API for now)
  playBtn.onclick = () => {
    if (!currentPassage) return;
    speakText(currentPassage.text);
    showToast("🔊 Playing passage...");
  };
  
  // Toggle pattern highlighting
  highlightBtn.onclick = () => {
    highlightMode = !highlightMode;
    highlightPatternWords(currentPassage, highlightMode);
    highlightBtn.textContent = highlightMode ? "✓ Highlighting" : "👁 Highlight Pattern";
    highlightBtn.style.background = highlightMode ? "var(--color-correct)" : "";
    highlightBtn.style.color = highlightMode ? "white" : "";
  };
  
  // Toggle questions visibility
  questionsBtn.onclick = () => {
    const questionsDiv = document.getElementById('passage-questions');
    const isHidden = questionsDiv.classList.contains('hidden');
    questionsDiv.classList.toggle('hidden');
    questionsBtn.textContent = isHidden ? "✓ Questions Shown" : "❓ Show Questions";
  };
  
  // Load another random passage
  anotherBtn.onclick = () => {
    const focus = document.getElementById('pattern-select').value;
    const passage = window.getRandomPassage(focus);
    if (passage) {
      currentPassage = passage;
      showPassage(passage);
      highlightMode = false;
    } else {
      showToast("No more passages available!");
    }
  };
}

function showPassage(passage) {
  const modal = document.getElementById('passage-modal');
  const overlay = document.getElementById('modal-overlay');
  
  // Set title and metadata
  document.getElementById('passage-title').textContent = passage.title;
  document.getElementById('passage-level').textContent = passage.level;
  document.getElementById('passage-focus').textContent = passage.focus;
  
  // Inject text with word spans for highlighting
  const textContainer = document.getElementById('passage-text');
  textContainer.innerHTML = passage.text
    .split(' ')
    .map((word, idx) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '').toLowerCase();
      const punctuation = word.match(/[.,!?;:]/g) || [];
      const isTargetWord = passage.words && passage.words.includes(cleanWord);
      
      return `<span class="passage-word ${isTargetWord ? 'target-word' : ''}" data-index="${idx}" data-word="${cleanWord}">${word}</span>`;
    })
    .join(' ');
  
  // Add click handlers to words (for future audio sync)
  document.querySelectorAll('.passage-word').forEach(span => {
    span.onclick = () => {
      const word = span.dataset.word;
      if (word) speakText(word);
    };
  });
  
  // Add questions
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = passage.questions
    .map(q => `<li>${q}</li>`)
    .join('');
  
  // Add teaching points
  const teachingList = document.getElementById('teaching-list');
  teachingList.innerHTML = passage.teachingPoints
    .map(t => `<li>${t}</li>`)
    .join('');
  
  // Reset questions to hidden
  document.getElementById('passage-questions').classList.add('hidden');
  document.getElementById('passage-questions-btn').textContent = "❓ Show Questions";
  
  // Show modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function highlightPatternWords(passage, enable) {
  const words = document.querySelectorAll('.passage-word.target-word');
  words.forEach(word => {
    if (enable) {
      word.classList.add('highlighted');
    } else {
      word.classList.remove('highlighted');
    }
  });
}

// =======================
// PHONEME PRACTICE
// =======================

function initPhonemePractice() {
  const phonemeBtn = document.getElementById('open-phoneme-btn');
  const phonemeModal = document.getElementById('phoneme-modal');
  const closeBtn = document.getElementById('close-phoneme');
  const playAllBtn = document.getElementById('phoneme-play-all');
  const slowBlendBtn = document.getElementById('phoneme-slow-blend');
  
  if (!phonemeBtn || !phonemeModal) {
    console.warn("Phoneme practice elements not found");
    return;
  }
  
  let currentPhonemeWord = null;
  
  // Open phoneme practice for current word
  phonemeBtn.onclick = () => {
    const word = currentWord || 'cat';
    currentPhonemeWord = word;
    showPhonemePractice(word);
  };
  
  // Close modal
  closeBtn.onclick = () => {
    phonemeModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
  };
  
  // Play whole word
  playAllBtn.onclick = () => {
    if (currentPhonemeWord) {
      speakText(currentPhonemeWord);
    }
  };
  
  // Slow blend (play phonemes with pauses)
  slowBlendBtn.onclick = () => {
    if (currentPhonemeWord) {
      slowBlendPhonemes(currentPhonemeWord);
    }
  };
}

function showPhonemePractice(word) {
  const modal = document.getElementById('phoneme-modal');
  const overlay = document.getElementById('modal-overlay');
  
  document.getElementById('phoneme-word').textContent = word.toUpperCase();
  
  // Get phoneme data
  const data = window.PHONEME_DATA[word];
  if (!data) {
    // Generate basic breakdown for words not in database
    const soundsGrid = document.getElementById('phoneme-sounds');
    soundsGrid.innerHTML = word.split('').map((letter, idx) => `
      <button class="phoneme-btn" data-sound="${letter}">
        <span class="phoneme-letter">${letter}</span>
        <span class="phoneme-symbol">/${letter}/</span>
      </button>
    `).join('');
    
    // Add basic click handlers
    document.querySelectorAll('.phoneme-btn').forEach(btn => {
      btn.onclick = () => {
        const sound = btn.dataset.sound;
        playPhoneme(sound, btn);
      };
    });
  } else {
    // Use detailed phoneme data
    const soundsGrid = document.getElementById('phoneme-sounds');
    soundsGrid.innerHTML = data.breakdown
      .map((item, idx) => `
        <button class="phoneme-btn" data-sound="${item.sound}" data-info="${item.sound}">
          <span class="phoneme-letter">${item.letter}</span>
          <span class="phoneme-symbol">/${item.sound}/</span>
        </button>
      `).join('');
    
    // Add click handlers for individual sounds
    document.querySelectorAll('.phoneme-btn').forEach(btn => {
      btn.onclick = () => {
        const sound = btn.dataset.sound;
        const infoKey = btn.dataset.info;
        playPhoneme(sound, btn);
        showArticulationInfo(infoKey);
      };
    });
  }
  
  // Clear articulation info
  document.getElementById('phoneme-articulation').innerHTML = '<p class="muted">👆 Click a sound above to see how to make it</p>';
  
  // Show modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function showArticulationInfo(sound) {
  const showMouthPositions = document.getElementById('enable-mouth-positions')?.checked !== false;
  const showIPA = document.getElementById('show-ipa')?.checked || false;
  
  if (!showMouthPositions) {
    return; // Don't show if teacher hasn't enabled
  }
  
  const info = window.getArticulationInfo(sound);
  if (!info) {
    document.getElementById('phoneme-articulation').innerHTML = `
      <div class="articulation-card">
        <h4>Sound: /${sound}/</h4>
        <p>Click the button to hear this sound.</p>
      </div>
    `;
    return;
  }
  
  const articulationDiv = document.getElementById('phoneme-articulation');
  articulationDiv.innerHTML = `
    <div class="articulation-card">
      <h4>How to Make: /${sound}/ ${showIPA && info.ipa ? `[${info.ipa}]` : ''}</h4>
      <p><strong>${info.description}</strong></p>
      <p class="visual-cue">👁 ${info.visual}</p>
      <p class="eal-tip">💡 Tip: ${info.tipForEAL}</p>
      <div class="sound-properties">
        <span class="badge">${info.type}</span>
        <span class="badge">${info.voicing}</span>
        ${info.place ? `<span class="badge">${info.place}</span>` : ''}
      </div>
    </div>
  `;
}

function playPhoneme(sound, btnElement) {
  // Add playing animation
  if (btnElement) {
    btnElement.classList.add('playing');
    setTimeout(() => btnElement.classList.remove('playing'), 600);
  }
  
  // Use Web Speech API to speak the sound
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(sound);
    utterance.rate = 0.6; // Slow down for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
  } else {
    showToast(`Sound: /${sound}/`);
  }
}

function slowBlendPhonemes(word) {
  const data = window.PHONEME_DATA[word];
  if (!data) {
    speakText(word);
    return;
  }
  
  // Speak each phoneme with pauses
  let delay = 0;
  data.phonemes.forEach((phoneme, idx) => {
    setTimeout(() => {
      playPhoneme(phoneme);
      
      // Highlight corresponding button
      const buttons = document.querySelectorAll('.phoneme-btn');
      if (buttons[idx]) {
        buttons[idx].classList.add('playing');
        setTimeout(() => buttons[idx].classList.remove('playing'), 800);
      }
    }, delay);
    delay += 1000; // 1 second between sounds
  });
  
  // Speak whole word at the end
  setTimeout(() => {
    showToast("Now together:");
    setTimeout(() => speakText(word), 500);
  }, delay + 500);
}

// =======================
// TEACHER CONTROLS
// =======================

function initTeacherControls() {
  const enablePassages = document.getElementById('enable-passages');
  const enablePhonemes = document.getElementById('enable-phoneme-practice');
  const featureContainer = document.getElementById('feature-buttons-container');
  const passageBtn = document.getElementById('open-passage-btn');
  const phonemeBtn = document.getElementById('open-phoneme-btn');
  
  if (!enablePassages || !enablePhonemes) return;
  
  // Toggle passage button visibility
  enablePassages.addEventListener('change', (e) => {
    if (passageBtn && featureContainer) {
      if (e.target.checked) {
        passageBtn.classList.remove('hidden');
        featureContainer.classList.remove('hidden');
      } else {
        passageBtn.classList.add('hidden');
        // Hide container if both are disabled
        if (!enablePhonemes.checked) {
          featureContainer.classList.add('hidden');
        }
      }
    }
  });
  
  // Toggle phoneme button visibility
  enablePhonemes.addEventListener('change', (e) => {
    if (phonemeBtn && featureContainer) {
      if (e.target.checked) {
        phonemeBtn.classList.remove('hidden');
        featureContainer.classList.remove('hidden');
      } else {
        phonemeBtn.classList.add('hidden');
        // Hide container if both are disabled
        if (!enablePassages.checked) {
          featureContainer.classList.add('hidden');
        }
      }
    }
  });
  
  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem('enable-passages', enablePassages.checked);
    localStorage.setItem('enable-phonemes', enablePhonemes.checked);
    localStorage.setItem('enable-mouth-positions', document.getElementById('enable-mouth-positions')?.checked);
    localStorage.setItem('show-ipa', document.getElementById('show-ipa')?.checked);
  };
  
  enablePassages.addEventListener('change', savePreferences);
  enablePhonemes.addEventListener('change', savePreferences);
  document.getElementById('enable-mouth-positions')?.addEventListener('change', savePreferences);
  document.getElementById('show-ipa')?.addEventListener('change', savePreferences);
  
  // Load saved preferences
  const loadPreferences = () => {
    const passagesPref = localStorage.getItem('enable-passages') === 'true';
    const phonemesPref = localStorage.getItem('enable-phonemes') === 'true';
    const mouthPref = localStorage.getItem('enable-mouth-positions') !== 'false'; // Default true
    const ipaPref = localStorage.getItem('show-ipa') === 'true';
    
    enablePassages.checked = passagesPref;
    enablePhonemes.checked = phonemesPref;
    if (document.getElementById('enable-mouth-positions')) {
      document.getElementById('enable-mouth-positions').checked = mouthPref;
    }
    if (document.getElementById('show-ipa')) {
      document.getElementById('show-ipa').checked = ipaPref;
    }
    
    // Trigger change events to show/hide buttons
    enablePassages.dispatchEvent(new Event('change'));
    enablePhonemes.dispatchEvent(new Event('change'));
  };
  
  loadPreferences();
}

// =======================
// HELPER FUNCTIONS
// =======================

function speakText(text) {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Use a clear voice if available
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en-') && v.name.includes('Female')) || voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesis.speak(utterance);
  }
}

// Initialize Phase 2 on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhase2Features);
} else {
  initPhase2Features();
}

console.log("✓ Phase 2 JavaScript loaded");


/* =========================================
   PHASE 3: TRANSLATION SYSTEM
   ========================================= */

// Initialize translation features
function initTranslationSystem() {
  const enableTranslations = document.getElementById('enable-translations');
  const languageSelector = document.getElementById('language-selector');
  const translationLanguage = document.getElementById('translation-language');
  
  if (!enableTranslations || !languageSelector) {
    console.warn("Translation elements not found");
    return;
  }
  
  // Toggle language selector visibility
  enableTranslations.addEventListener('change', (e) => {
    if (e.target.checked) {
      languageSelector.classList.remove('hidden');
    } else {
      languageSelector.classList.add('hidden');
    }
    saveTranslationPreferences();
  });
  
  // Save language choice
  translationLanguage.addEventListener('change', () => {
    saveTranslationPreferences();
    showToast(`🌍 Translation language set to ${translationLanguage.options[translationLanguage.selectedIndex].text}`);
  });
  
  // Load saved preferences
  loadTranslationPreferences();
  
  console.log("✓ Translation system initialized");
}

function saveTranslationPreferences() {
  const enableTranslations = document.getElementById('enable-translations');
  const translationLanguage = document.getElementById('translation-language');
  
  if (enableTranslations && translationLanguage) {
    localStorage.setItem('enable-translations', enableTranslations.checked);
    localStorage.setItem('translation-language', translationLanguage.value);
  }
}

function loadTranslationPreferences() {
  const enableTranslations = document.getElementById('enable-translations');
  const translationLanguage = document.getElementById('translation-language');
  const languageSelector = document.getElementById('language-selector');
  
  if (enableTranslations && translationLanguage && languageSelector) {
    const enabled = localStorage.getItem('enable-translations') === 'true';
    const language = localStorage.getItem('translation-language') || '';
    
    enableTranslations.checked = enabled;
    translationLanguage.value = language;
    
    if (enabled) {
      languageSelector.classList.remove('hidden');
    }
  }
}

function getTranslationSettings() {
  const enableTranslations = document.getElementById('enable-translations');
  const translationLanguage = document.getElementById('translation-language');
  
  return {
    enabled: enableTranslations?.checked || false,
    language: translationLanguage?.value || ''
  };
}

function displayTranslation(word, containerElement) {
  const settings = getTranslationSettings();
  
  if (!settings.enabled || !settings.language) {
    return; // Translations not enabled
  }
  
  const translation = window.getTranslation(word, settings.language);
  
  if (!translation) {
    // Show "translation unavailable" message
    const unavailableDiv = document.createElement('div');
    unavailableDiv.className = 'translation-unavailable';
    unavailableDiv.innerHTML = `
      <strong>🌍 Translation:</strong> Not yet available for "${word}" in this language. 
      English content provided above.
    `;
    containerElement.appendChild(unavailableDiv);
    return;
  }
  
  const langInfo = window.getLanguageInfo(settings.language);
  if (!langInfo) return;
  
  // Create translation box
  const translationBox = document.createElement('div');
  translationBox.className = 'translation-box';
  if (langInfo.dir === 'rtl') {
    translationBox.setAttribute('dir', 'rtl');
  }
  
  translationBox.innerHTML = `
    <div class="translation-header">
      <div class="translation-language-badge">
        <span class="flag">${langInfo.flag}</span>
        <span>${langInfo.native}</span>
      </div>
      <button class="translation-audio-btn" onclick="window.playTranslationAudio('${word}', '${settings.language}')">
        🔊 Hear in ${langInfo.name}
      </button>
    </div>
    
    <div class="translation-word">${translation.word}</div>
    <div class="translation-phonetic">Pronunciation: ${translation.phonetic}</div>
    <div class="translation-def">${translation.def}</div>
    <div class="translation-sentence">"${translation.sentence}"</div>
  `;
  
  containerElement.appendChild(translationBox);
}

window.playTranslationAudio = function(word, langCode) {
  const translation = window.getTranslation(word, langCode);
  if (!translation) return;
  
  // Speak the word in target language
  window.speakTranslation(translation.word, langCode);
  
  showToast(`🔊 Playing pronunciation...`);
};

// Enhance the existing showResultModal to include translations
const originalShowResultModal = window.showResultModal;
if (typeof originalShowResultModal === 'function') {
  window.showResultModal = function(word, result, guesses) {
    // Call original function
    originalShowResultModal(word, result, guesses);
    
    // Add translation after a brief delay to let modal render
    setTimeout(() => {
      const modalContent = document.querySelector('#result-modal .modal-content');
      if (modalContent && word) {
        // Check if translation already added (prevent duplicates)
        if (!modalContent.querySelector('.translation-box, .translation-unavailable')) {
          displayTranslation(word, modalContent);
        }
      }
    }, 100);
  };
}

// Add translation indicator to word list if available
function addTranslationIndicators() {
  const settings = getTranslationSettings();
  if (!settings.enabled || !settings.language) return;
  
  // This could be used to show which words have translations available
  // For now, it's a placeholder for future enhancement
}

// Initialize translation system on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTranslationSystem);
} else {
  initTranslationSystem();
}

console.log("✓ Translation JavaScript loaded");

