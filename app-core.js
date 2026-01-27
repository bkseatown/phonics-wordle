(() => {
  const $ = id => document.getElementById(id);

  let state = {
    focus: APP_CONFIG.DEFAULTS.focus,
    length: APP_CONFIG.DEFAULTS.wordLength,
    guesses: APP_CONFIG.DEFAULTS.guesses,
    answer: "",
    row: 0,
    col: 0
  };

  function fillSelect(id, options, defVal) {
    const el = $(id);
    el.innerHTML = "";
    options.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o.value ?? o;
      opt.textContent = o.label ?? o;
      el.appendChild(opt);
    });
    if (defVal) el.value = defVal;
  }

  function buildSelectors() {
    fillSelect("focusSelect", PHONICS_DATA.FOCUS_OPTIONS, state.focus);
    fillSelect("lengthSelect", [2,3,4,5,6,7,8,9,10], state.length);
    fillSelect("guessSelect", [4,5,6,7,8], state.guesses);
  }

  function pickWord() {
    const pool = PHONICS_DATA.WORDS[state.focus] || PHONICS_DATA.WORDS.none;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function buildBoard() {
    const board = $("board");
    board.innerHTML = "";
    board.style.setProperty("--cols", state.length);
    for (let r=0;r<state.guesses;r++){
      const row = document.createElement("div");
      row.className = "row";
      for (let c=0;c<state.length;c++){
        const t = document.createElement("div");
        t.className = "tile";
        row.appendChild(t);
      }
      board.appendChild(row);
    }
  }

  function buildKeyboard() {
    const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    const kb = $("keyboard");
    kb.innerHTML = "";
    keys.forEach(k => {
      const b = document.createElement("button");
      b.className = "key";
      b.textContent = k;
      b.onclick = () => handleChar(k);
      kb.appendChild(b);
    });
  }

  function handleChar(ch){
    if (state.row >= state.guesses) return;
    const board = $("board");
    const tile = board.children[state.row].children[state.col];
    if (!tile) return;
    tile.textContent = ch;
    state.col++;
    if (state.col === state.length){
      state.row++;
      state.col = 0;
    }
  }

  function handleKey(e){
    if (/^[a-zA-Z]$/.test(e.key)) handleChar(e.key.toUpperCase());
  }

  function wireUI(){
    $("btnHelp").onclick = () => showModal("Guess the word using phonics clues.");
    $("btnWord").onclick = () => showModal(state.answer);
    $("btnSentence").onclick = () => {
      const d = PHONICS_DATA.DEFINITIONS[state.answer];
      showModal(d ? d.sent : "");
    };
    $("btnNext").onclick = resetGame;
    $("btnSetWord").onclick = () => {
      const v = $("teacherInput").value.trim().toLowerCase();
      if (v.length>=2 && v.length<=10){
        state.answer = v;
        state.length = v.length;
        resetGame(false);
      }
    };
    $("modalClose").onclick = () => $("modal").classList.add("hidden");
    $("focusSelect").onchange = e => { state.focus = e.target.value; resetGame(); };
    $("lengthSelect").onchange = e => { state.length = +e.target.value; resetGame(); };
    $("guessSelect").onchange = e => { state.guesses = +e.target.value; resetGame(); };
    document.addEventListener("keydown", handleKey);
  }

  function showModal(txt){
    $("modalContent").textContent = txt;
    $("modal").classList.remove("hidden");
  }

  function resetGame(pick=true){
    state.row = 0; state.col = 0;
    if (pick) state.answer = pickWord();
    buildBoard();
  }

  function init(){
    buildSelectors();
    buildKeyboard();
    wireUI();
    resetGame();
  }

  window.addEventListener("DOMContentLoaded", init);
})();