/* =========================================
   PHONICS WORDLE - PRO ENGINE
   ========================================= */

const CONFIG = {
    voice: true,
    confetti: true,
    filter: 'all'
};

let state = {
    target: "",
    syllables: "",
    grid: [],
    row: 0,
    guess: "",
    over: false,
    pool: []
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
        return;
    }

    const keys = Object.keys(window.WORD_ENTRIES);

    if (CONFIG.filter === 'all') {
        state.pool = keys;
    } else {
        state.pool = keys.filter(k => {
            const d = window.WORD_ENTRIES[k];
            const allTags = (d.tags || []).concat(d.focus || []);
            return allTags.some(t => t.includes(CONFIG.filter));
        });
    }

    if (state.pool.length === 0) {
        state.pool = keys;
    }
}

function init() {
    loadPool();
    const rawWord = state.pool[Math.floor(Math.random() * state.pool.length)];
    const data = window.WORD_ENTRIES[rawWord];
    
    state.target = rawWord;
    state.syllables = data.syllables || rawWord; 
    
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
    
    modal.classList.add("hidden");
    document.getElementById("modal-title").textContent = "";
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
    const keys = [
        "qwertyuiop",
        "asdfghjkl",
        "zxcvbnm"
    ];
    
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    
    const kbd = document.getElementById("keyboard");
    
    keys.forEach(rowStr => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "key-row";
        
        rowStr.split("").forEach(char => {
            const btn = document.createElement("button");
            btn.className = "key";
            
            if (vowels.includes(char)) {
                btn.classList.add("vowel-key");
            }

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
    if (!window.WORD_ENTRIES[guess]) {
        shakeRow();
        showToast("Not in word list!");
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

    // Render Colors
    result.forEach((color, i) => {
        const tile = document.getElementById(`r${state.row}-c${i}`);
        
        // Speed Fix: Reduced from 200ms to 150ms
        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(color);
            
            // Safety Check for Keyboard
            const keyBtn = document.getElementById("key-" + guess[i]);
            
            if (keyBtn) {
                const isGreen = keyBtn.classList.contains("green");
                const isYellow = keyBtn.classList.contains("yellow");
                
                if (color === "green") {
                    keyBtn.classList.remove("yellow", "gray");
                    keyBtn.classList.add("green");
                } else if (color === "yellow" && !isGreen) {
                    keyBtn.classList.remove("gray");
                    keyBtn.classList.add("yellow");
                } else if (color === "gray" && !isGreen && !isYellow) {
                    keyBtn.classList.add("gray");
                }
            }
        }, i * 150); 
    });

    // Check Win/Loss
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
    }, target.length * 150 + 300); // Adjusted for new speed
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
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}

// ---------------------------------------------------------
// MODALS & TOOLS
// ---------------------------------------------------------

function showModal(win) {
    const data = window.WORD_ENTRIES[state.target];
    
    document.getElementById("modal-title").textContent = win ? "🎉 Fantastic!" : "Good Try!";
    document.getElementById("reveal-word").textContent = state.syllables || state.target;
    document.getElementById("reveal-def").textContent = data.def;
    document.getElementById("reveal-sentence").textContent = data.sentence;
    
    // INSTRUCTIONAL TIPS
    const tipBox = document.getElementById("reveal-tip");
    let tipText = "";
    const tags = data.tags || [];

    if (tags.includes("magic-e")) {
        tipText = "💡 Rule: The silent 'e' at the end makes the vowel say its name.";
    } else if (tags.includes("digraph")) {
        tipText = "💡 Rule: Two letters stuck together make ONE new sound.";
    } else if (tags.includes("floss")) {
        tipText = "💡 Rule: We double f, l, s, or z at the end of short words.";
    } else if (tags.includes("r-controlled")) {
        tipText = "💡 Rule: The 'r' is bossy and changes the vowel's sound.";
    } else if (tags.includes("vowel-team")) {
        tipText = "💡 Rule: When two vowels go walking, the first one does the talking.";
    } else if (tags.includes("cvc")) {
        tipText = "💡 Tip: This is a closed syllable. The vowel is short.";
    }

    tipBox.textContent = tipText;
    tipBox.style.display = tipText ? "block" : "none";

    modal.classList.remove("hidden");
    if (win && CONFIG.voice) speak(state.target);
}

function speak(text) {
    if (!CONFIG.voice) return;
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
    
    // FIX: Changed max length from 6 to 10 to allow "mag-net-ic"
    if (cleanWord.length < 3 || cleanWord.length > 10) {
        showToast("Word must be 3-10 letters");
        return;
    }

    state.target = cleanWord;
    state.syllables = input;
    
    if (!window.WORD_ENTRIES[cleanWord]) {
        window.WORD_ENTRIES[cleanWord] = {
            def: "Teacher Custom Word",
            sentence: "Great job decoding!",
            tags: ["custom"]
        };
    }
    
    document.getElementById("teacher-menu").classList.add("hidden");
    resetGame();
    showToast(`Target: ${input}`);
}

// ---------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitGuess();
    else if (e.key === "Backspace") handleInput("Backspace");
    else if (/^[a-z]$/i.test(e.key)) handleInput(e.key.toLowerCase());
});

document.getElementById("btn-next-word").onclick = init;
document.getElementById("modal-close").onclick = () => modal.classList.add("hidden");
document.getElementById("help-close").onclick = () => document.getElementById("help-modal-overlay").classList.add("hidden");

document.getElementById("btn-voice").onclick = function() {
    CONFIG.voice = !CONFIG.voice;
    this.textContent = CONFIG.voice ? "🔊 ON" : "🔇 OFF";
};
document.getElementById("btn-help").onclick = () => document.getElementById("help-modal-overlay").classList.remove("hidden");
document.getElementById("btn-teacher").onclick = () => document.getElementById("teacher-menu").classList.remove("hidden");

document.getElementById("btn-teacher-set").onclick = initTeacherMode;
document.getElementById("btn-teacher-cancel").onclick = () => document.getElementById("teacher-menu").classList.add("hidden");

document.getElementById("btn-hear-word").onclick = () => speak(state.target);
document.getElementById("btn-hear-sentence").onclick = () => {
    const data = window.WORD_ENTRIES[state.target];
    if (data) speak(data.sentence);
};

document.getElementById("filter-select").onchange = (e) => {
    CONFIG.filter = e.target.value;
    init(); 
    e.target.blur();
};

window.onload = init;