(() => {
  window.PHONICS_DATA = {
    FOCUS_OPTIONS: [
      { value: "none", label: "Mixed Review", defaultLen: 5 },
      { value: "cvc", label: "CVC (Short Vowels)", defaultLen: 3 }
    ],
    WORDS: {
      none: ["cat","dog","ship","rain","cake"],
      cvc: ["cat","dog","sun","bug","pig"]
    },
    DEFINITIONS: {
      cat:{def:"A small pet animal.",sent:"The cat sat on the mat."},
      dog:{def:"A friendly pet.",sent:"The dog ran fast."},
      sun:{def:"The star in the sky.",sent:"The sun is bright."},
      bug:{def:"A small insect.",sent:"The bug crawled."},
      pig:{def:"A farm animal.",sent:"The pig rolled in mud."},
      ship:{def:"A big boat.",sent:"The ship sailed."},
      rain:{def:"Water from clouds.",sent:"The rain fell."},
      cake:{def:"A sweet treat.",sent:"The cake was tasty."}
    }
  };
})();