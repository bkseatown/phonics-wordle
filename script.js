document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- MODAL (ONE AT A TIME) ---------------- */
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("close-modal");
  var actionBtn = document.getElementById("modal-action");

  function openModal(title, text, actionText) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-text").textContent = text;
    actionBtn.textContent = actionText;
    overlay.classList.remove("hidden");
  }

  function closeModal() {
    overlay.classList.add("hidden");
  }

  closeBtn.onclick = closeModal;
  actionBtn.onclick = closeModal;

  overlay.onclick = function (e) {
    if (e.target === overlay) closeModal();
  };

  window.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("hidden")) {
      if (e.key === "Escape" || e.key === "Enter") {
        closeModal();
      }
      e.preventDefault();
    }
  });

  /* ---------------- BOARD ---------------- */
  var board = document.getElementById("board");

  function buildBoard() {
    board.innerHTML = "";
    for (var i = 0; i < 30; i++) {
      var tile = document.createElement("div");
      tile.className = "tile";
      board.appendChild(tile);
    }
  }

  /* ---------------- KEYBOARD ---------------- */
  var keyboard = document.getElementById("keyboard");
  var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";

  function buildKeyboard() {
    keyboard.innerHTML = "";
    for (var i = 0; i < letters.length; i++) {
      var key = document.createElement("button");
      key.className = "key";
      key.textContent = letters[i];
      keyboard.appendChild(key);
    }
  }

  /* ---------------- HINT BUTTONS ---------------- */
  var currentWord = "plant";
  var currentSentence = "The plant grew in the sun.";

  document.getElementById("hear-word").onclick = function () {
    speak(currentWord);
  };

  document.getElementById("hear-sentence").onclick = function () {
    speak(currentSentence);
  };

  function speak(text) {
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  }

  /* ---------------- BUTTONS ---------------- */
  document.getElementById("teacher-btn").onclick = function () {
    openModal("Teacher Mode", "Teacher word setting coming next.", "OK");
  };

  document.getElementById("new-word-btn").onclick = function () {
    buildBoard();
  };

  /* ---------------- INIT ---------------- */
  buildBoard();
  buildKeyboard();

  // show welcome ONCE
  if (!localStorage.getItem("decode_seen")) {
    openModal("Welcome 👋", "Pick a focus and decode the word.", "Start");
    localStorage.setItem("decode_seen", "1");
  }

  console.log("✅ Decode the Word loaded correctly");
});
