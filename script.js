/* =========================================
   PHONICS WORDLE - PRO ENGINE
   ========================================= */

const CONFIG = {
    voice: false,    
    confetti: true,
    filter: 'all',
    length: 'any',
    largeText: false
};

const JOKES_AND_FACTS = [
    { type: "Joke", text: "Why did the cookie go to the hospital? Because he felt crummy!" },
    { type: "Fact", text: "Did you know? Octopuses have three hearts!" },
    { type: "Joke", text: "What do you call a sleeping dinosaur? A dino-snore!" },
    { type: "Fact", text: "Honey is the only food that never spoils." },
    { type: "Joke", text: "Why was the math book sad? It had too many problems." },
    { type: "Fact", text: "A group of flamingos is called a 'flamboyance'." },
    { type: "Joke", text: "What falls in winter but never gets hurt? Snow!" },
    { type: "Fact", text: "Sloths can hold their breath longer than dolphins." },
    { type: "Joke", text: "What has hands but cannot clap? A clock!" },
    { type: "Fact", text: "Butterflies taste with their feet." }
];

let state = {
    target: "",
    syllables: "",
    grid: [],
    row: 0,
    guess: "",
    over: false,
    pool: [],
    customGame: false // NEW: Tracks if this is a teacher-set word
};

const board = document.getElementById("game-board");
const modal = document.getElementById("modal-overlay");
const toast = document.getElementById("toast");

// ---------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------

function loadPool() {
    if (!window.WORD_ENTRIES) {
        showToast("Error: Dictionary missing");
        return false;
    }
    const keys = Object.keys(window.WORD_ENTRIES);
    let filtered = keys;

    // Normal filtering logic...
    if (CONFIG.filter !== 'all') {
        filtered = keys.filter(k => {
            const d = window.WORD_ENTRIES[k];
            const allTags = (d.tags || []).concat(d.focus || []);
            return allTags.some(t => t.includes(CONFIG.filter));
        });
    }

    if (CONFIG.length !== 'any') {
        const targetLen = parseInt(CONFIG.length);
        filtered = filtered.filter(k => k.length === targetLen);
    }

    state.pool = filtered;

    // Fallback
    if (state.pool.length === 0) {
        showToast(`No ${CONFIG.length}-letter words for this skill.`);
        document.getElementById('length-select').value = 'any';
        CONFIG.length = 'any';
        state.pool = keys.filter(k => {
             const d = window.WORD_ENTRIES[k];
             const allTags = (d.tags || []).concat(d.focus || []);
             return CONFIG.filter === 'all' || allTags.some(t => t.includes(CONFIG.filter));
        });
    }

    if (state.pool.length === 0) {
        showToast("No words found! Check filters.");
        return false;
    }
    return true;
}

function init() {
    if (!loadPool()) return;

    const rawWord = state.pool[Math.floor(Math.random() * state.pool.length)];
    const data = window.WORD_ENTRIES[rawWord];
    
    state.target = rawWord;
    state.syllables = data.syllables || rawWord; 
    state.customGame = false; // Reset teacher flag
    
    resetGame();
}

function resetGame() {
    state.row = 0;
    state.guess = "";
    state.over = false;
    
    board.innerHTML = "";
    document.getElementById("keyboard").innerHTML = "";
    
    createGrid();
    createKeyboard();
    
    closeAllModals(); // Helper to clear UI
}

// ---------------------------------------------------------
// BOARD & KEYBOARD
// ---------------------------------------------------------

function createGrid() {
    const len = state.target.length;
    board.style.gridTemplateColumns = `repeat(${len}, 60px)`;
    state.grid = [];

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < len; c++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.id = `r${r}-c${c}`;
            board.appendChild(tile);
            state.grid.push(tile);
        }
    }
}

function createKeyboard() {
    const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    const kbd = document.getElementById("keyboard");
    
    keys.forEach(rowStr => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "key-row";
        rowStr.split("").forEach(char => {
            const btn = document.createElement("button");
            btn.className = "key";
            if (vowels.includes(char)) btn.classList.add("vowel-key");
            btn.textContent = char;
            btn.id = "key-" + char;
            btn.onclick = () => handleInput(char);
            rowDiv.appendChild(btn);
        });
        
        if (rowStr.startsWith("z")) {
            const enter = document.createElement("button");
            enter.className = "key action";
            enter.textContent = "ENTER";
            enter.onclick = submitGuess;
            rowDiv.appendChild(enter);

            const del = document.createElement("button");
            del.className = "key action";
            del.textContent = "⌫";
            del.onclick = () => handleInput("Backspace");
            rowDiv.prepend(del);
        }
        kbd.appendChild(rowDiv);
    });
}

// ---------------------------------------------------------
// GAME LOGIC
// ---------------------------------------------------------

function handleInput(key) {
    if (state.over) return;
    const len = state.target.length;
    if (key === "Backspace") {
        state.guess = state.guess.slice(0, -1);
    } else if (state.guess.length < len && /^[a-z]$/.test(key)) {
        state.guess += key;
    }
    updateGrid();
}

function updateGrid() {
    const len = state.target.length;
    for (let c = 0; c < len; c++) {
        const tile = document.getElementById(`r${state.row}-c${c}`);
        tile.textContent = state.guess[c] || "";
        tile.setAttribute("data-state", state.guess[c] ? "active" : "");
    }
}

function submitGuess() {
    if (state.over) return;
    const guess = state.guess;
    const target = state.target;
    
    if (guess.length !== target.length) {
        shakeRow();
        return;
    }

    // TEACHER FIX: If custom game, skip dictionary check!
    // Otherwise, check dictionary.
    if (!state.customGame && !window.WORD_ENTRIES[guess]) {
        shakeRow();
        showToast("Not in our dictionary");
        return;
    }

    const result = new Array(target.length).fill("gray");
    const targetChars = target.split("");
    const guessChars = guess.split("");

    // Pass 1: Greens
    guessChars.forEach((char, i) => {
        if (char === targetChars[i]) {
            result[i] = "green";
            targetChars[i] = null;
            guessChars[i] = null;
        }
    });

    // Pass 2: Yellows
    guessChars.forEach((char, i) => {
        if (char && targetChars.includes(char)) {
            result[i] = "yellow";
            targetChars[targetChars.indexOf(char)] = null; 
        }
    });

    // Render
    result.forEach((color, i) => {
        const tile = document.getElementById(`r${state.row}-c${i}`);
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(color);
            tile.addEventListener('animationend', () => { tile.classList.remove('flip'); }, { once: true });
            
            const keyBtn = document.getElementById("key-" + guess[i]);
            if (keyBtn) {
                const isGreen = keyBtn.classList.contains("green");
                const isYellow = keyBtn.classList.contains("yellow");
                if (color === "green") {
                    keyBtn.classList.remove("yellow", "gray"); keyBtn.classList.add("green");
                } else if (color === "yellow" && !isGreen) {
                    keyBtn.classList.remove("gray"); keyBtn.classList.add("yellow");
                } else if (color === "gray" && !isGreen && !isYellow) {
                    keyBtn.classList.add("gray");
                }
            }
        }, i * 150); 
    });

    setTimeout(() => {
        if (guess === target) {
            state.over = true;
            if (CONFIG.confetti) triggerConfetti();
            showModal(true);
        } else if (state.row >= 5) {
            state.over = true;
            showModal(false);
        } else {
            state.row++;
            state.guess = "";
        }
    }, target.length * 150 + 300);
}

function shakeRow() {
    const len = state.target.length;
    for (let c = 0; c < len; c++) {
        const tile = document.getElementById(`r${state.row}-c${c}`);
        tile.classList.add("shake");
        setTimeout(() => tile.classList.remove("shake"), 500);
    }
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ---------------------------------------------------------
// MODALS & HELPERS
// ---------------------------------------------------------

// Helper to clean up all modal states
function closeAllModals() {
    document.querySelectorAll('.tool-overlay, #modal-overlay, #help-modal-overlay').forEach(el => {
        el.classList.add('hidden');
    });
}

function showModal(win) {
    // If custom game, use generic data if missing
    const data = window.WORD_ENTRIES[state.target] || { def: "Custom Teacher Word", sentence: "Great job!", tags: [] };
    
    document.getElementById("modal-title").textContent = win ? "🎉 Fantastic!" : "Good Try!";
    document.getElementById("reveal-word").textContent = state.syllables || state.target;
    document.getElementById("reveal-def").textContent = data.def;
    document.getElementById("reveal-sentence").textContent = data.sentence;
    
    const tipBox = document.getElementById("reveal-tip");
    let tipText = "";
    const tags = data.tags || [];

    // Tips logic...
    if (tags.includes("magic-e")) tipText = "💡 Rule: The silent 'e' makes the vowel say its name.";
    else if (tags.includes("digraph")) tipText = "💡 Rule: Two letters stuck together make ONE sound.";
    else if (tags.includes("doubling")) tipText = "💡 Rule: 1-1-1 Rule! Double the last letter.";
    else if (tags.includes("schwa")) tipText = "💡 Rule: The unstressed vowel sounds like 'uh'.";
    else if (tags.includes("cvc")) tipText = "💡 Tip: Closed syllable. Short vowel.";

    tipBox.textContent = tipText;
    tipBox.style.display = tipText ? "block" : "none";

    // Fun Content
    const funBox = document.getElementById("fun-content-box");
    if (win) {
        const funItem = JOKES_AND_FACTS[Math.floor(Math.random() * JOKES_AND_FACTS.length)];
        document.getElementById("fun-label").textContent = funItem.type === 'Joke' ? '😂 Joke:' : '🧠 Fun Fact:';
        document.getElementById("fun-text").textContent = funItem.text;
        funBox.classList.remove("hidden");
    } else {
        funBox.classList.add("hidden");
    }

    modal.classList.remove("hidden");
    if (win && CONFIG.voice) speak(state.target);
}

function speak(text) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.name.includes("Google US English")) || voices[0];
    if (preferred) u.voice = preferred;
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
}

function triggerConfetti() {
    if (typeof window.confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

// ---------------------------------------------------------
// TEACHER MENU
// ---------------------------------------------------------

function initTeacherMode() {
    const input = document.getElementById("teacher-input").value.trim().toLowerCase();
    if (!input) return;

    const cleanWord = input.replace(/-/g, "");
    if (cleanWord.length < 3 || cleanWord.length > 10) {
        showToast("Word must be 3-10 letters");
        return;
    }

    state.target = cleanWord;
    state.syllables = input;
    state.customGame = true; // NEW: Flag this as a custom game
    
    // We don't need to inject into WORD_ENTRIES anymore for validity
    // because submitGuess checks state.customGame
    
    closeAllModals();
    resetGame();
    showToast(`Target: ${input}`);
}

// ---------------------------------------------------------
// GLOBAL EVENTS
// ---------------------------------------------------------

// 1. Unified Click-Outside Listener (The Fix for #1)
window.onclick = function(event) {
    if (event.target.classList.contains('tool-overlay') || 
        event.target.id === 'modal-overlay' || 
        event.target.id === 'help-modal-overlay') {
        
        // If it's the Game Over modal, advance game
        if (event.target.id === 'modal-overlay') {
            init();
        } else {
            // Otherwise just close it
            closeAllModals();
        }
    }
};

// 2. Keyboard Handler
document.addEventListener("keydown", (e) => {
    // Escape Key closes things
    if (e.key === "Escape") {
        closeAllModals();
        return;
    }
    
    // Enter Key Logic
    const modalOpen = !modal.classList.contains("hidden");
    if (e.key === "Enter") {
        if (modalOpen) {
            init(); // Advance game
        } else {
            submitGuess(); // Submit guess
        }
        return;
    }

    if (e.key === "Backspace") handleInput("Backspace");
    else if (/^[a-z]$/i.test(e.key)) handleInput(e.key.toLowerCase());
});

// 3. UI Buttons
document.getElementById("btn-next-word").onclick = init;
document.getElementById("modal-close").onclick = init; // Close = Next Word
document.getElementById("help-close").onclick = closeAllModals;

document.getElementById("btn-voice").onclick = function() {
    CONFIG.voice = !CONFIG.voice;
    this.querySelector(".icon").textContent = CONFIG.voice ? "🔊" : "🔇";
    this.querySelector(".btn-label").textContent = CONFIG.voice ? "ON" : "OFF";
};

document.getElementById("btn-size").onclick = function() {
    CONFIG.largeText = !CONFIG.largeText;
    document.body.classList.toggle("large-mode");
    this.querySelector(".icon").textContent = CONFIG.largeText ? "A-" : "A+";
};

document.getElementById("btn-help").onclick = () => document.getElementById("help-modal-overlay").classList.remove("hidden");
document.getElementById("btn-teacher").onclick = () => document.getElementById("teacher-menu").classList.remove("hidden");
document.getElementById("btn-teacher-set").onclick = initTeacherMode;
document.getElementById("btn-teacher-cancel").onclick = closeAllModals;

document.getElementById("btn-hear-word").onclick = () => speak(state.target);
document.getElementById("btn-hear-sentence").onclick = () => {
    // Handle custom teacher words that might lack sentences
    const data = window.WORD_ENTRIES[state.target] || { sentence: "Good luck!" };
    speak(data.sentence);
};

document.getElementById("filter-select").onchange = (e) => { CONFIG.filter = e.target.value; init(); e.target.blur(); };
document.getElementById("length-select").onchange = (e) => { CONFIG.length = e.target.value; init(); e.target.blur(); };

window.onload = init;