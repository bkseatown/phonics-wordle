document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- MODAL ---------------- */
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("close-modal");
  var startBtn = document.getElementById("start-btn");

  function closeModal() {
    overlay.style.display = "none";
  }

  closeBtn.onclick = closeModal;
  startBtn.onclick = closeModal;

  overlay.onclick = function (e) {
    if (e.target === overlay) closeModal();
  };

  window.addEventListener("keydown", function (e) {
    if (overlay.style.display !== "none") {
      if (e.key === "Escape" || e.key === "Enter") closeModal();
    }
  });

  overlay.style.display = "flex";

  /* ---------------- FOCUS TAXONOMY ---------------- */

  var FOCUS_INFO = {
    mixed: {
      label: "Mixed Review",
      desc: "A mix of common phonics patterns students have already learned.",
      examples: ["cat", "ship", "tree"],
      hint: "Encourage students to look all the way through the word."
    },
    cvc: {
      label: "CVC",
      desc: "Consonant–vowel–consonant words with short vowels.",
      examples: ["cat", "sun", "bed"],
      hint: "Say each sound, then blend."
    },
    digraphs: {
      label: "Digraphs",
      desc: "Two letters that make one sound.",
      examples: ["ship", "chop", "thin"],
      hint: "Look for letters that stick together."
    },
    blends: {
      label: "Blends",
      desc: "Two or three consonants blended together.",
      examples: ["stop", "flag", "clip"],
      hint: "Each sound is heard, but they are said quickly."
    },
    floss: {
      label: "FLOSS",
      desc: "Short vowel words ending in ff, ll, ss, or zz.",
      examples: ["hill", "buzz", "off"],
      hint: "Double the last consonant."
    },
    magicE: {
      label: "Magic E",
      desc: "Silent e makes the vowel say its name.",
      examples: ["make", "time", "hope"],
      hint: "The e is quiet, but powerful."
    },
    vowelTeams: {
      label: "Vowel Teams",
      desc: "Two vowels working together to make one sound.",
      examples: ["rain", "boat", "seed"],
      hint: "The vowels team up to make one sound."
    },
    rControlled: {
      label: "R-Controlled",
      desc: "Vowels followed by r that change the vowel sound.",
      examples: ["car", "bird", "fork"],
      hint: "The r changes the vowel sound."
    },
    prefixes: {
      label: "Prefixes",
      desc: "Word parts added to the beginning of a base word.",
      examples: ["redo", "unhappy", "preview"],
      hint: "Prefixes change the meaning."
    },
    suffixes: {
      label: "Suffixes",
      desc: "Word parts added to the end of a base word.",
      examples: ["jumped", "playing", "cats"],
      hint: "Suffixes often change tense or number."
    },
    schwa: {
      label: "Schwa",
      desc: "An unstressed vowel that sounds like /uh/.",
      examples: ["about", "animal"],
      hint: "Say the word naturally and listen."
    }
  };

  /* ---------------- BUILD FOCUS DROPDOWN ---------------- */

  var focusSelect = document.getElementById("focus-select");
  var focusTitle = document.getElementById("focus-title");
  var focusDesc = document.getElementById("focus-desc");
  var focusExamples = document.getElementById("focus-examples");
  var focusHint = document.getElementById("focus-hint");

  Object.keys(FOCUS_INFO).forEach(function (key) {
    var opt = document.createElement("option");
    opt.value = key;
    opt.textContent = FOCUS_INFO[key].label + " (" + FOCUS_INFO[key].examples.join(", ") + ")";
    focusSelect.appendChild(opt);
  });

  function updateFocusPanel(key) {
    var info = FOCUS_INFO[key];
    focusTitle.textContent = info.label;
    focusDesc.textContent = info.desc;
    focusExamples.textContent = info.examples.join(", ");
    focusHint.textContent = "Tip: " + info.hint;
  }

  focusSelect.onchange = function () {
    updateFocusPanel(focusSelect.value);
  };

  updateFocusPanel("mixed");

  /* ---------------- DEMO BOARD + KEYBOARD ---------------- */

  var board = document.getElementById("board");
  for (var i = 0; i < 30; i++) {
    var tile = document.createElement("div");
    tile.className = "tile";
    board.appendChild(tile);
  }

  var keyboard = document.getElementById("keyboard");
  var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
  for (var j = 0; j < letters.length; j++) {
    var keyBtn = document.createElement("button");
    keyBtn.className = "key";
    keyBtn.textContent = letters[j];
    keyboard.appendChild(keyBtn);
  }

  /* ---------------- SPEECH (DEMO) ---------------- */

  document.getElementById("hear-word").onclick = function () {
    speechSynthesis.speak(new SpeechSynthesisUtterance("plant"));
  };

  document.getElementById("hear-sentence").onclick = function () {
    speechSynthesis.speak(
      new SpeechSynthesisUtterance("The plant grew in the sun.")
    );
  };

  console.log("✅ Focus taxonomy restored");
});
