(function(){
  const qs = id => document.getElementById(id);

  function initSelectors(){
    APP_CONFIG.letters.forEach(n=>qs("lettersSelect").add(new Option(n,n)));
    APP_CONFIG.guesses.forEach(n=>qs("guessesSelect").add(new Option(n,n)));
    ["cvc","blends","heart"].forEach(f=>qs("focusSelect").add(new Option(f,f)));
  }

  function initTabs(){
    const show = id => {
      ["panel-how","panel-word","panel-sentence"].forEach(p=>qs(p).classList.add("hidden"));
      qs(id).classList.remove("hidden");
    };
    qs("tab-how").onclick = ()=>show("panel-how");
    qs("tab-word").onclick = ()=>show("panel-word");
    qs("tab-sentence").onclick = ()=>show("panel-sentence");
  }

  function initBoard(){
    const board = qs("board");
    board.innerHTML = "";
    for(let i=0;i<25;i++){
      const d=document.createElement("div");
      d.className="tile";
      board.appendChild(d);
    }
  }

  window.addEventListener("DOMContentLoaded", ()=>{
    initSelectors();
    initTabs();
    initBoard();
  });
})();