/* =========================================
   DECODE THE WORD - LOGIC (FINAL POLISH)
   ========================================= */

const MAX_GUESSES = 6;
let CURRENT_WORD_LENGTH = 5; 
let currentWord = "";
let currentEntry = null;
let guesses = [];
let currentGuess = "";
let gameOver = false;
let isFirstLoad = true; // Flag for forcing 5x6 grid on start

// DOM Elements
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const modal = document.getElementById("modal");
const teacherModal = document.getElementById("teacher-modal");
const welcomeModal = document.getElementById("welcome-modal");

document.addEventListener("DOMContentLoaded", () => {
    initControls();
    initKeyboard();
    startNewGame();
    checkFirstTimeVisitor(); 
});

function initControls() {
    document.getElementById("new-word-btn").addEventListener("click", () => startNewGame());
    
    // Play Again / Reset
    document.getElementById("play-again-btn").addEventListener("click", () => {
        closeModal();
        startNewGame();
    });
    
    // Welcome Modal Button
    document.getElementById("start-playing-btn").addEventListener("click", () => {
        welcomeModal.classList.add("hidden");
    });

    // Dropdowns
    document.getElementById("length-select").addEventListener("change", (e) => {
        const val = e.target.value;
        CURRENT_WORD_LENGTH = val === 'any' ? 5 : parseInt(val);
        startNewGame();
    });
    document.getElementById("pattern-select").addEventListener("change", () => startNewGame());

    // Teacher Mode
    document.getElementById("teacher-btn").addEventListener("click", () => {
        teacherModal.classList.remove("hidden");
        document.getElementById("custom-word-input").focus();
    });
    document.getElementById("set-word-btn").addEventListener("click", handleTeacherSubmit);
    
    // Close Btns
    document.querySelector(".close-btn").addEventListener("click", closeModal);
    document.querySelector(".close-teacher").addEventListener("click", () => teacherModal.classList.add("hidden"));
    
    // Audio
    document.getElementById("speak-btn").addEventListener("click", speakWord);
}

// --- GAME LOOP ---

function startNewGame(customWord = null) {
    gameOver = false;
    guesses = [];
    currentGuess = "";
    board.innerHTML = "";
    clearKeyboardColors();
    closeModal();

    if (customWord) {
        // Teacher Mode Path
        currentWord = customWord.toLowerCase();
        CURRENT_WORD_LENGTH = currentWord.length;
        currentEntry = window.WORD_ENTRIES[currentWord] || {
            def: "Teacher provided word.",
            sentence: "You can do it!",
            syllables: currentWord
        };
    } else {
        // Standard Path
        const wordData = getWordFromDictionary();
        if (!wordData) {
            alert("No words found for these settings. Try 'Mixed Review' or 'Any Length'.");
            return;
        }
        currentWord = wordData.word;
        currentEntry = wordData.entry;
        
        // If "Any Length" is selected, update internal length to match word
        if (document.getElementById("length-select").value === 'any') {
            CURRENT_WORD_LENGTH = currentWord.length;
        }
    }
    
    // Reset First Load Flag
    isFirstLoad = false;

    // Set Grid
    board.style.gridTemplateColumns = `repeat(${CURRENT_WORD_LENGTH}, 1fr)`;
    for (let i = 0; i < MAX_GUESSES * CURRENT_WORD_LENGTH; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = `tile-${i}`;
        board.appendChild(tile);
    }
    
    console.log(`Target: ${currentWord}`);
}

function getWordFromDictionary() {
    const pattern = document.getElementById("pattern-select").value;
    const lenVal = document.getElementById("length-select").value;
    
    // FORCE 5 LETTERS ON FIRST LOAD
    // This ensures the app always looks like Wordle (5x6) when it first opens
    // even if "Any Length" is the default setting.
    let targetLength = null;
    if (lenVal !== 'any') {
        targetLength = parseInt(lenVal);
    } else if (isFirstLoad) {
        targetLength = 5;
    }

    const candidates = Object.keys(window.WORD_ENTRIES).filter(word => {
        const entry = window.WORD_ENTRIES[word];
        
        const lengthMatch = (targetLength === null) || (word.length === targetLength);
        const patternMatch = (pattern === 'all') || (entry.tags && entry.tags.includes(pattern));
        
        return lengthMatch && patternMatch;
    });

    if (candidates.length === 0) return null;
    const randomWord = candidates[Math.floor(Math.random() * candidates.length)];
    return { word: randomWord, entry: window.WORD_ENTRIES[randomWord] };
}

// --- INPUT & GRID ---

function initKeyboard() {
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    keyboard.innerHTML = "";
    rows.forEach(rowStr => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");
        rowStr.split("").forEach(char => {
            const key = document.createElement("button");
            key.textContent = char;
            key.classList.add("key");
            key.dataset.key = char;
            key.addEventListener("click", () => handleInput(char));
            rowDiv.appendChild(key);
        });
        if (rowStr === "zxcvbnm") {
            const enter = createSpecialKey("ENTER", submitGuess);
            const back = createSpecialKey("⌫", deleteLetter);
            rowDiv.insertBefore(enter, rowDiv.firstChild);
            rowDiv.appendChild(back);
        }
        keyboard.appendChild(rowDiv);
    });

    document.addEventListener("keydown", (e) => {
        if (gameOver) return;
        const key = e.key.toLowerCase();
        if (key === "enter") submitGuess();
        else if (key === "backspace") deleteLetter();
        else if (/^[a-z]$/.test(key)) handleInput(key);
    });
}

function createSpecialKey(text, action) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("key", "wide");
    btn.addEventListener("click", action);
    return btn;
}

function handleInput(char) {
    if (currentGuess.length < CURRENT_WORD_LENGTH) {
        currentGuess += char;
        updateGrid();
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    }
}

function updateGrid() {
    const rowOffset = guesses.length * CURRENT_WORD_LENGTH;
    for (let i = 0; i < CURRENT_WORD_LENGTH; i++) {
        const tile = document.getElementById(`tile-${rowOffset + i}`);
        tile.textContent = "";
        tile.classList.remove("pop");
        tile.style.borderColor = "#d3d6da";
    }
    for (let i = 0; i < currentGuess.length; i++) {
        const tile = document.getElementById(`tile-${rowOffset + i}`);
        tile.textContent = currentGuess[i];
        tile.classList.add("pop");
        if (i === currentGuess.length - 1) tile.style.borderColor = "#888"; 
    }
}

// --- SCORING ---

function submitGuess() {
    if (currentGuess.length !== CURRENT_WORD_LENGTH) {
        // Shake animation
        const rowOffset = guesses.length * CURRENT_WORD_LENGTH;
        const firstTile = document.getElementById(`tile-${rowOffset}`);
        firstTile.style.transform = "translateX(5px)";
        setTimeout(() => firstTile.style.transform = "none", 100);
        return;
    }

    const result = checkWord(currentGuess);
    revealRow(result);
    guesses.push(currentGuess);

    if (currentGuess === currentWord) {
        gameOver = true;
        setTimeout(() => showModal(true), 1500);
    } else if (guesses.length >= MAX_GUESSES) {
        gameOver = true;
        setTimeout(() => showModal(false), 1500);
    } else {
        currentGuess = "";
    }
}

function checkWord(guess) {
    const result = Array(CURRENT_WORD_LENGTH).fill("absent");
    const targetArr = currentWord.split("");
    const guessArr = guess.split("");

    // Green Pass
    for (let i = 0; i < CURRENT_WORD_LENGTH; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = "correct";
            targetArr[i] = null;
            guessArr[i] = null;
        }
    }
    // Yellow Pass
    for (let i = 0; i < CURRENT_WORD_LENGTH; i++) {
        if (guessArr[i] && targetArr.includes(guessArr[i])) {
            result[i] = "present";
            targetArr[targetArr.indexOf(guessArr[i])] = null;
        }
    }
    return result;
}

function revealRow(result) {
    const rowOffset = guesses.length * CURRENT_WORD_LENGTH;
    result.forEach((status, i) => {
        setTimeout(() => {
            const tile = document.getElementById(`tile-${rowOffset + i}`);
            tile.classList.add(status);
            
            // Keyboard Update
            const key = document.querySelector(`.key[data-key="${currentGuess[i]}"]`);
            if (key) {
                const old = key.classList.contains("correct") ? 2 : key.classList.contains("present") ? 1 : 0;
                const joy = status === "correct" ? 2 : status === "present" ? 1 : 0;
                if (joy > old) {
                    key.classList.remove("present", "absent");
                    key.classList.add(status);
                } else if (joy === 0 && old === 0) {
                    key.classList.add("absent");
                }
            }
        }, i * 200);
    });
}

// --- UTILS ---

function handleTeacherSubmit() {
    const input = document.getElementById("custom-word-input");
    const errorMsg = document.getElementById("teacher-error");
    const word = input.value.trim().toLowerCase();

    // UPDATED VALIDATION: Up to 10 letters
    if (!word || word.length < 3 || word.length > 10 || !/^[a-z]+$/.test(word)) {
        errorMsg.textContent = "Please enter a valid word (3-10 letters).";
        return;
    }
    teacherModal.classList.add("hidden");
    input.value = "";
    errorMsg.textContent = "";
    startNewGame(word);
}

function checkFirstTimeVisitor() {
    // Show Welcome Modal if no localStorage key found
    if (!localStorage.getItem("visited_decode_v2")) {
        welcomeModal.classList.remove("hidden");
        localStorage.setItem("visited_decode_v2", "true");
    }
}

function showModal(win) {
    modal.classList.remove("hidden");
    document.getElementById("modal-title").textContent = win ? "Great Job!" : "Nice Try!";
    document.getElementById("modal-word").textContent = currentWord;
    
    const syllables = currentEntry.syllables || currentWord;
    document.getElementById("modal-syllables").textContent = syllables.split("-").join(" • ");

    document.getElementById("modal-def").textContent = currentEntry.def;
    document.getElementById("modal-sentence").textContent = `"${currentEntry.sentence}"`;
}

function closeModal() {
    modal.classList.add("hidden");
}

function clearKeyboardColors() {
    document.querySelectorAll(".key").forEach(k => k.classList.remove("correct", "present", "absent"));
}

function speakWord() {
    const u = new SpeechSynthesisUtterance(currentWord);
    speechSynthesis.speak(u);
}