/* =========================================
   DECODE THE WORD - CORE LOGIC (FULL FIX)
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

// DOM Elements
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const modalOverlay = document.getElementById("modal-overlay");
const welcomeModal = document.getElementById("welcome-modal");
const teacherModal = document.getElementById("teacher-modal");
const gameModal = document.getElementById("modal");

document.addEventListener("DOMContentLoaded", () => {
    initControls();
    initKeyboard();
    
    // Safety check: Ensure data loaded before starting
    if (window.WORD_ENTRIES) {
        startNewGame();
    } else {
        console.error("Data file (phonics_focus_data.js) not loaded yet.");
        // Fallback start if data is missing
        startNewGame("seed"); 
    }
    
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
        inp.focus();
    };

    // Hints
    document.getElementById("hear-word-hint").onclick = () => speak(currentWord);
    document.getElementById("hear-sentence-hint").onclick = () => {
        showToast("Sentence hint shared!");
        if (currentEntry && currentEntry.sentence) {
            speak(currentEntry.sentence);
        }
    };
    document.getElementById("speak-btn").onclick = () => speak(currentWord);

    // Modal Closing Logic
    document.querySelectorAll(".close-btn, .close-teacher, #start-playing-btn, #play-again-btn").forEach(btn => {
        btn.addEventListener("click", closeModal);
    });

    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) closeModal();
    };

    // Global Keyboard Listener
    window.addEventListener("keydown", (e) => {
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

    // Teacher Input Specifics
    const tInput = document.getElementById("custom-word-input");
    if (tInput) {
        tInput.addEventListener("keydown", (e) => {
            e.stopPropagation();
            if (e.key === "Enter") handleTeacherSubmit();
            if (e.key === "Escape") closeModal();
        });
    }
}

function startNewGame(customWord = null) {
    gameOver = false;
    guesses = [];
    currentGuess = "";
    board.innerHTML = "";
    
    // Clear styles
    clearKeyboardColors();
    updateFocusPanel();
    
    // Hide Modals if open (except welcome if first load)
    if (!isFirstLoad) {
        closeModal();
    }

    if (customWord) {
        currentWord = customWord.toLowerCase();
        CURRENT_WORD_LENGTH = currentWord.length;
        // Try to find it in dictionary, otherwise use generic entry
        currentEntry = window.WORD_ENTRIES && window.WORD_ENTRIES[currentWord] 
            ? window.WORD_ENTRIES[currentWord] 
            : { def: "Teacher word.", sentence: "Can you decode this?", syllables: currentWord };
    } else {
        const data = getWordFromDictionary();
        currentWord = data.word;
        currentEntry = data.entry;
        
        // Sync length
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
    
    console.log(`Game Started. Target: ${currentWord}`);
}

function getWordFromDictionary() {
    // Safety check if data file isn't loaded
    if (!window.WORD_ENTRIES) {
        return { word: "seed", entry: { def: "Part of a plant", sentence: "Plant the seed.", syllables: "seed" }};
    }

    const pattern = document.getElementById("pattern-select").value;
    const lenVal = document.getElementById("length-select").value;
    
    let targetLen = (lenVal === 'any') ? (isFirstLoad ? 5 : null) : parseInt(lenVal);

    const pool = Object.keys(window.WORD_ENTRIES).filter(w => {
        const e = window.WORD_ENTRIES[w];
        const lenMatch = !targetLen || w.length === targetLen;
        const patMatch = pattern === 'all' || (e.tags && e.tags.includes(pattern));
        return lenMatch && patMatch;
    });

    const final = pool.length ? pool[Math.floor(Math.random() * pool.length)] : "apple";
    return { word: final, entry: window.WORD_ENTRIES[final] };
}

function updateFocusPanel() {
    if (!window.FOCUS_INFO) return; // Safety check

    const pat = document.getElementById("pattern-select").value;
    const info = window.FOCUS_INFO[pat] || window.FOCUS_INFO.all || window.FOCUS_INFO.mixed;
    
    if (info) {
        document.getElementById("focus-title").textContent = info.label || info.title;
        document.getElementById("focus-desc").textContent = info.desc;
        document.getElementById("focus-hint").textContent = info.hint;
        document.getElementById("focus-examples").textContent = `Ex: ${info.examples}`;

        const quickRow = document.getElementById("quick-tiles-row");
        if (info.quick) {
            quickRow.innerHTML = "";
            info.quick.forEach(q => {
                const b = document.createElement("button");
                b.className = "q-tile";
                b.textContent = q;
                b.onclick = () => { 
                    for(let c of q) handleInput(c); 
                };
                quickRow.appendChild(b);
            });
            quickRow.classList.remove("hidden");
        } else {
            quickRow.classList.add("hidden");
        }
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
        if(t) {
            t.textContent = "";
            t.className = "tile"; 
        }
    }
    
    // Fill current row
    for (let i = 0; i < currentGuess.length; i++) {
        const t = document.getElementById(`tile-${offset + i}`);
        if(t) {
            const char = currentGuess[i];
            t.textContent = isUpperCase ? char.toUpperCase() : char;
            t.className = "tile active";
        }
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
            if(t) t.textContent = isUpperCase ? g[i].toUpperCase() : g[i];
        }
    });
    // 2. Current guess
    const currOff = guesses.length * CURRENT_WORD_LENGTH;
    for(let i=0; i<currentGuess.length; i++) {
        const t = document.getElementById(`tile-${currOff+i}`);
        if(t) t.textContent = isUpperCase ? currentGuess[i].toUpperCase() : currentGuess[i];
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
            if(t) {
                t.classList.add(status);
                t.classList.add("pop"); 
            }

            const k = document.querySelector(`.key[data-key="${guess[i]}"]`);
            if (k) {
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
    
    if (currentEntry) {
        document.getElementById("modal-syllables").textContent = currentEntry.syllables ? currentEntry.syllables.replace(/-/g, " • ") : currentWord;
        document.getElementById("modal-def").textContent = currentEntry.def;
        document.getElementById("modal-sentence").textContent = `"${currentEntry.sentence}"`;
    }
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
    showToast("Teacher word accepted!");
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
    const container = document.getElementById("toast-container");
    if(container) {
        container.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
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
    });
    initKeyboard(); 
}

function speak(text) {
    if (!text) return;
    const msg = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v => (v.name.includes("Google") || v.name.includes("Samantha")) && v.lang.startsWith("en"));
    msg.voice = preferred || voices[0];
    msg.rate = 0.9;
    speechSynthesis.speak(msg);
}