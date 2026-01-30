/* =========================================
   DECODE THE WORD - PHONEME AWARENESS SYSTEM
   Sound isolation + mouth positions (UFLI-style)
   Critical for EAL learners and phonological awareness
   ========================================= */

(function () {
  
  // Phoneme articulation data (mouth positions)
  window.PHONEME_ARTICULATION = {
    // STOPS
    "p": {
      type: "stop",
      voicing: "voiceless",
      place: "bilabial",
      description: "Press both lips together, then release with a puff of air",
      visual: "Lips together → burst apart",
      tipForEAL: "No voice box vibration. Just air. Like blowing out a candle gently."
    },
    "b": {
      type: "stop",
      voicing: "voiced",
      place: "bilabial",
      description: "Press both lips together, voice box vibrates, then release",
      visual: "Lips together → burst apart (with voice)",
      tipForEAL: "Put hand on throat. Feel the vibration? That's voice."
    },
    "t": {
      type: "stop",
      voicing: "voiceless",
      place: "alveolar",
      description: "Tongue tip touches the bumpy ridge behind upper teeth, then releases",
      visual: "Tongue tip up → snap down",
      tipForEAL: "Feel the ridge right behind your top teeth? Touch it with your tongue tip."
    },
    "d": {
      type: "stop",
      voicing: "voiced",
      place: "alveolar",
      description: "Tongue tip touches ridge behind upper teeth, voice box vibrates, then releases",
      visual: "Tongue tip up → snap down (with voice)",
      tipForEAL: "Same position as /t/ but add voice. Feel your throat vibrate."
    },
    "k": {
      type: "stop",
      voicing: "voiceless",
      place: "velar",
      description: "Back of tongue touches soft roof of mouth (velum), then releases",
      visual: "Tongue back up → release",
      tipForEAL: "The 'k' sound happens way in the back of your mouth. Say 'kuh' and feel it."
    },
    "g": {
      type: "stop",
      voicing: "voiced",
      place: "velar",
      description: "Back of tongue touches velum, voice box vibrates, then releases",
      visual: "Tongue back up → release (with voice)",
      tipForEAL: "Same as /k/ but with voice from your throat."
    },

    // FRICATIVES
    "f": {
      type: "fricative",
      voicing: "voiceless",
      place: "labiodental",
      description: "Top teeth touch lower lip lightly, air flows through",
      visual: "Teeth on lip → steady air stream",
      tipForEAL: "Bite your lower lip gently. Blow air out. No voice."
    },
    "v": {
      type: "fricative",
      voicing: "voiced",
      place: "labiodental",
      description: "Top teeth touch lower lip, voice box vibrates, air flows through",
      visual: "Teeth on lip → steady air stream (with voice)",
      tipForEAL: "Same mouth position as /f/ but turn on your voice box."
    },
    "s": {
      type: "fricative",
      voicing: "voiceless",
      place: "alveolar",
      description: "Tongue tip near ridge, teeth almost together, air hisses through",
      visual: "Tongue tip forward → hissing air (like a snake)",
      tipForEAL: "Make a snake sound: ssssss. Your teeth are almost closed."
    },
    "z": {
      type: "fricative",
      voicing: "voiced",
      place: "alveolar",
      description: "Tongue tip near ridge, teeth almost together, air buzzes through with voice",
      visual: "Tongue tip forward → buzzing air (like a bee)",
      tipForEAL: "Make a bee sound: zzzzz. Same mouth as /s/ but with voice."
    },
    "th-voiceless": {
      type: "fricative",
      voicing: "voiceless",
      place: "dental",
      description: "Tongue tip between teeth, blow air through (think, math, path)",
      visual: "Tongue pokes out slightly → steady air",
      tipForEAL: "Stick your tongue between your teeth. Blow air. Like 'thhhh'."
    },
    "th-voiced": {
      type: "fricative",
      voicing: "voiced",
      place: "dental",
      description: "Tongue tip between teeth, voice box vibrates (this, that, mother)",
      visual: "Tongue pokes out slightly → vibrating air",
      tipForEAL: "Same position but add voice. Feel your throat vibrate: 'this'."
    },
    "sh": {
      type: "fricative",
      voicing: "voiceless",
      place: "postalveolar",
      description: "Tongue behind ridge, lips rounded slightly, air flows through (ship, wish)",
      visual: "Lips round → shushing sound",
      tipForEAL: "Make a 'be quiet' sound: shhhhh. Lips push forward a bit."
    },
    "zh": {
      type: "fricative",
      voicing: "voiced",
      place: "postalveolar",
      description: "Tongue behind ridge, lips rounded, voice vibrates (measure, treasure)",
      visual: "Lips round → buzzing shush",
      tipForEAL: "Like /sh/ but add voice. Rare in English but in words like 'measure'."
    },
    "h": {
      type: "fricative",
      voicing: "voiceless",
      place: "glottal",
      description: "Open mouth, air flows from throat (no tongue or lip contact)",
      visual: "Open mouth → breathy air",
      tipForEAL: "Just breathe out with sound. Your mouth can be in any shape."
    },

    // AFFRICATES
    "ch": {
      type: "affricate",
      voicing: "voiceless",
      place: "postalveolar",
      description: "Start like /t/, end like /sh/ - two sounds blended (chip, much)",
      visual: "Tongue up → sh position quickly",
      tipForEAL: "Say /t/ and /sh/ really fast together: t-sh → ch."
    },
    "j": {
      type: "affricate",
      voicing: "voiced",
      place: "postalveolar",
      description: "Start like /d/, end like /zh/ - two sounds blended (jump, judge)",
      visual: "Tongue up → zh position quickly (with voice)",
      tipForEAL: "Say /d/ and /zh/ fast together: d-zh → j. Feel vibration."
    },

    // NASALS
    "m": {
      type: "nasal",
      voicing: "voiced",
      place: "bilabial",
      description: "Lips together, air flows through nose, voice box vibrates",
      visual: "Lips closed → air through nose (mmmmm)",
      tipForEAL: "Close lips. Hum. Feel your nose vibrate? Air goes through your nose."
    },
    "n": {
      type: "nasal",
      voicing: "voiced",
      place: "alveolar",
      description: "Tongue tip touches ridge, air flows through nose, voice vibrates",
      visual: "Tongue tip up → air through nose (nnnnnn)",
      tipForEAL: "Touch tongue to roof of mouth. Hum through your nose: nnnnn."
    },
    "ng": {
      type: "nasal",
      voicing: "voiced",
      place: "velar",
      description: "Back of tongue touches velum, air flows through nose (sing, ring)",
      visual: "Tongue back up → air through nose",
      tipForEAL: "Say 'sing' but hold the ending: siiiiing. Feel tongue in back?"
    },

    // LIQUIDS
    "l": {
      type: "liquid",
      voicing: "voiced",
      place: "alveolar",
      description: "Tongue tip touches ridge, air flows around sides of tongue",
      visual: "Tongue tip up → air flows around sides",
      tipForEAL: "Put tongue tip on roof. Air escapes around the sides. Say lllll."
    },
    "r": {
      type: "liquid",
      voicing: "voiced",
      place: "postalveolar",
      description: "Tongue tip up and back (not touching), or bunched up, lips may round",
      visual: "Tongue curled up/back → rrrrr",
      tipForEAL: "This is hard for many languages! Curl tongue up or bunch it back. Don't touch anything."
    },

    // GLIDES
    "w": {
      type: "glide",
      voicing: "voiced",
      place: "velar/labial",
      description: "Lips round tightly, then glide open to next vowel sound",
      visual: "Lips tight → glide open (like a kiss →)",
      tipForEAL: "Make a kiss shape. Then open. The movement makes /w/."
    },
    "y": {
      type: "glide",
      voicing: "voiced",
      place: "palatal",
      description: "Tongue high and forward, glide down to next vowel",
      visual: "Tongue high → glide down",
      tipForEAL: "Say 'eeee' then quickly move to next sound. That glide is /y/."
    },

    // VOWELS - SHORT
    "ă": {
      type: "vowel",
      height: "low",
      frontness: "front",
      rounding: "unrounded",
      description: "Mouth open wide, tongue low and forward (cat, hat, map)",
      visual: "Wide open mouth, say 'ahhhh' at doctor",
      tipForEAL: "Open your mouth like you're surprised: 'ă!'"
    },
    "ĕ": {
      type: "vowel",
      height: "mid",
      frontness: "front",
      rounding: "unrounded",
      description: "Mouth half-open, tongue mid-front (bed, red, let)",
      visual: "Mouth medium open, relaxed",
      tipForEAL: "Say 'eh' like you're not sure about something."
    },
    "ĭ": {
      type: "vowel",
      height: "high",
      frontness: "front",
      rounding: "unrounded",
      description: "Mouth slightly open, tongue high and forward (sit, big, hit)",
      visual: "Small mouth opening, smile slightly",
      tipForEAL: "Almost like smiling a bit. Short and quick: ĭ."
    },
    "ŏ": {
      type: "vowel",
      height: "low-mid",
      frontness: "back",
      rounding: "rounded",
      description: "Mouth open, tongue low and back, lips slightly rounded (hot, hop, box)",
      visual: "Mouth open, jaw drops (like ah but rounder)",
      tipForEAL: "Open mouth but keep lips a bit rounded: ŏ."
    },
    "ŭ": {
      type: "vowel",
      height: "mid",
      frontness: "central",
      rounding: "unrounded",
      description: "Mouth half-open, tongue central and relaxed (cup, run, fun)",
      visual: "Relaxed mouth, middle position",
      tipForEAL: "Say 'uh' like 'uh-oh'. Very relaxed."
    },

    // VOWELS - LONG
    "ā": {
      type: "vowel",
      height: "mid-high",
      frontness: "front",
      rounding: "unrounded",
      description: "Say the letter name 'A' - tongue moves from mid to high (cake, rain, day)",
      visual: "Mouth starts half-open → closes slightly (diphthong)",
      tipForEAL: "Say the letter A. Your tongue moves during this sound."
    },
    "ē": {
      type: "vowel",
      height: "high",
      frontness: "front",
      rounding: "unrounded",
      description: "Say the letter name 'E' - tongue high and forward, lips spread (see, tree, beach)",
      visual: "Big smile, tongue forward and up",
      tipForEAL: "Smile wide and say 'eeeeee' like the letter E."
    },
    "ī": {
      type: "vowel",
      height: "low-high",
      frontness: "central-front",
      rounding: "unrounded",
      description: "Say the letter name 'I' - tongue moves from low to high (bike, time, fly)",
      visual: "Mouth opens → closes (big movement, diphthong)",
      tipForEAL: "Say 'ah' then 'ee' quickly: ah-ee → I."
    },
    "ō": {
      type: "vowel",
      height: "mid-high",
      frontness: "back",
      rounding: "rounded",
      description: "Say the letter name 'O' - lips round, tongue moves (boat, hope, snow)",
      visual: "Lips round → get even rounder",
      tipForEAL: "Make your lips round like you're kissing. Say 'oh'."
    },
    "ū": {
      type: "vowel",
      height: "high",
      frontness: "back",
      rounding: "rounded",
      description: "Say the letter name 'U' - lips very rounded, tongue high and back (cube, use, blue)",
      visual: "Tight lip rounding, tongue back and high",
      tipForEAL: "Say 'oo' like in 'moon'. Very round lips."
    },

    // R-CONTROLLED VOWELS
    "ar": {
      type: "r-controlled",
      description: "Open mouth, say 'ah' then curl tongue for R (car, park, star)",
      visual: "Open → curl tongue back",
      tipForEAL: "Start with 'ah', then lift tongue for R without touching anything."
    },
    "er": {
      type: "r-controlled",
      description: "Relaxed mouth, tongue bunched or curled for R sound (her, bird, turn, work)",
      visual: "Neutral mouth → tongue curled/bunched",
      tipForEAL: "Say 'uh' then add the R curl. All these spellings sound the same!"
    },
    "ir": {
      type: "r-controlled",
      description: "Same as 'er' - tongue bunched or curled for R (bird, girl, first)",
      visual: "Neutral mouth → tongue curled/bunched",
      tipForEAL: "Sounds exactly like 'er'. Different spelling, same sound."
    },
    "or": {
      type: "r-controlled",
      description: "Lips round slightly, say 'oh' then curl tongue for R (fork, horn, sport)",
      visual: "Round lips → curl tongue back",
      tipForEAL: "Start with 'oh' sound, then add R curl."
    },
    "ur": {
      type: "r-controlled",
      description: "Same as 'er' and 'ir' - neutral mouth, tongue curled for R (turn, burn, hurt)",
      visual: "Neutral mouth → tongue curled/bunched",
      tipForEAL: "Sounds like 'er' and 'ir'. Three spellings, one sound!"
    }
  };

  // Word-level phoneme breakdown (first 100 most common words)
  window.PHONEME_DATA = {
    // CVC words
    cat: {
      word: "cat",
      phonemes: ["k", "ă", "t"],
      ipa: ["k", "æ", "t"],
      syllables: ["cat"],
      breakdown: [
        { letter: "c", sound: "k", position: "initial", notes: "Hard C sound" },
        { letter: "a", sound: "ă", position: "medial", notes: "Short A vowel" },
        { letter: "t", sound: "t", position: "final", notes: "Unvoiced T" }
      ]
    },
    dog: {
      word: "dog",
      phonemes: ["d", "ŏ", "g"],
      ipa: ["d", "ɑ", "g"],
      syllables: ["dog"],
      breakdown: [
        { letter: "d", sound: "d", position: "initial", notes: "Voiced D" },
        { letter: "o", sound: "ŏ", position: "medial", notes: "Short O vowel" },
        { letter: "g", sound: "g", position: "final", notes: "Hard G" }
      ]
    },
    sun: {
      word: "sun",
      phonemes: ["s", "ŭ", "n"],
      ipa: ["s", "ʌ", "n"],
      syllables: ["sun"],
      breakdown: [
        { letter: "s", sound: "s", position: "initial", notes: "Hissing S" },
        { letter: "u", sound: "ŭ", position: "medial", notes: "Short U vowel" },
        { letter: "n", sound: "n", position: "final", notes: "Nasal N" }
      ]
    },
    map: {
      word: "map",
      phonemes: ["m", "ă", "p"],
      ipa: ["m", "æ", "p"],
      syllables: ["map"],
      breakdown: [
        { letter: "m", sound: "m", position: "initial", notes: "Nasal M" },
        { letter: "a", sound: "ă", position: "medial", notes: "Short A" },
        { letter: "p", sound: "p", position: "final", notes: "Popping P" }
      ]
    },
    bed: {
      word: "bed",
      phonemes: ["b", "ĕ", "d"],
      ipa: ["b", "ɛ", "d"],
      syllables: ["bed"],
      breakdown: [
        { letter: "b", sound: "b", position: "initial", notes: "Voiced B" },
        { letter: "e", sound: "ĕ", position: "medial", notes: "Short E" },
        { letter: "d", sound: "d", position: "final", notes: "Voiced D" }
      ]
    },
    
    // Digraphs
    ship: {
      word: "ship",
      phonemes: ["sh", "ĭ", "p"],
      ipa: ["ʃ", "ɪ", "p"],
      syllables: ["ship"],
      breakdown: [
        { letter: "sh", sound: "sh", position: "initial", notes: "Digraph - two letters, one sound" },
        { letter: "i", sound: "ĭ", position: "medial", notes: "Short I" },
        { letter: "p", sound: "p", position: "final", notes: "Popping P" }
      ]
    },
    chat: {
      word: "chat",
      phonemes: ["ch", "ă", "t"],
      ipa: ["tʃ", "æ", "t"],
      syllables: ["chat"],
      breakdown: [
        { letter: "ch", sound: "ch", position: "initial", notes: "Digraph - like t+sh blended" },
        { letter: "a", sound: "ă", position: "medial", notes: "Short A" },
        { letter: "t", sound: "t", position: "final", notes: "Unvoiced T" }
      ]
    },
    then: {
      word: "then",
      phonemes: ["th", "ĕ", "n"],
      ipa: ["ð", "ɛ", "n"],
      syllables: ["then"],
      breakdown: [
        { letter: "th", sound: "th-voiced", position: "initial", notes: "Voiced TH - tongue between teeth" },
        { letter: "e", sound: "ĕ", position: "medial", notes: "Short E" },
        { letter: "n", sound: "n", position: "final", notes: "Nasal N" }
      ]
    },
    ring: {
      word: "ring",
      phonemes: ["r", "ĭ", "ng"],
      ipa: ["ɹ", "ɪ", "ŋ"],
      syllables: ["ring"],
      breakdown: [
        { letter: "r", sound: "r", position: "initial", notes: "Liquid R" },
        { letter: "i", sound: "ĭ", position: "medial", notes: "Short I" },
        { letter: "ng", sound: "ng", position: "final", notes: "Nasal digraph - tongue back" }
      ]
    },

    // Magic E
    cake: {
      word: "cake",
      phonemes: ["k", "ā", "k"],
      ipa: ["k", "eɪ", "k"],
      syllables: ["cake"],
      breakdown: [
        { letter: "c", sound: "k", position: "initial", notes: "Hard C" },
        { letter: "a", sound: "ā", position: "medial", notes: "Long A - says its name!" },
        { letter: "k", sound: "k", position: "final", notes: "Hard K" },
        { letter: "e", sound: "silent", position: "final", notes: "Silent E makes vowel long" }
      ]
    },
    hope: {
      word: "hope",
      phonemes: ["h", "ō", "p"],
      ipa: ["h", "oʊ", "p"],
      syllables: ["hope"],
      breakdown: [
        { letter: "h", sound: "h", position: "initial", notes: "Breathy H" },
        { letter: "o", sound: "ō", position: "medial", notes: "Long O - says its name!" },
        { letter: "p", sound: "p", position: "final", notes: "Popping P" },
        { letter: "e", sound: "silent", position: "final", notes: "Magic E" }
      ]
    },

    // Blends
    stop: {
      word: "stop",
      phonemes: ["s", "t", "ŏ", "p"],
      ipa: ["s", "t", "ɑ", "p"],
      syllables: ["stop"],
      breakdown: [
        { letter: "s", sound: "s", position: "initial", notes: "Part of ST blend" },
        { letter: "t", sound: "t", position: "initial", notes: "Part of ST blend - hear both sounds!" },
        { letter: "o", sound: "ŏ", position: "medial", notes: "Short O" },
        { letter: "p", sound: "p", position: "final", notes: "Popping P" }
      ]
    },
    
    // Vowel teams
    rain: {
      word: "rain",
      phonemes: ["r", "ā", "n"],
      ipa: ["ɹ", "eɪ", "n"],
      syllables: ["rain"],
      breakdown: [
        { letter: "r", sound: "r", position: "initial", notes: "Liquid R" },
        { letter: "ai", sound: "ā", position: "medial", notes: "Vowel team - AI makes long A" },
        { letter: "n", sound: "n", position: "final", notes: "Nasal N" }
      ]
    },
    boat: {
      word: "boat",
      phonemes: ["b", "ō", "t"],
      ipa: ["b", "oʊ", "t"],
      syllables: ["boat"],
      breakdown: [
        { letter: "b", sound: "b", position: "initial", notes: "Voiced B" },
        { letter: "oa", sound: "ō", position: "medial", notes: "Vowel team - OA makes long O" },
        { letter: "t", sound: "t", position: "final", notes: "Unvoiced T" }
      ]
    },

    // R-controlled
    car: {
      word: "car",
      phonemes: ["k", "ar"],
      ipa: ["k", "ɑɹ"],
      syllables: ["car"],
      breakdown: [
        { letter: "c", sound: "k", position: "initial", notes: "Hard C" },
        { letter: "ar", sound: "ar", position: "final", notes: "R-controlled - bossy R changes the vowel!" }
      ]
    },
    bird: {
      word: "bird",
      phonemes: ["b", "er", "d"],
      ipa: ["b", "ɜɹ", "d"],
      syllables: ["bird"],
      breakdown: [
        { letter: "b", sound: "b", position: "initial", notes: "Voiced B" },
        { letter: "ir", sound: "er", position: "medial", notes: "R-controlled - IR sounds like ER!" },
        { letter: "d", sound: "d", position: "final", notes: "Voiced D" }
      ]
    }
  };

  // Function to generate phoneme data for any word (basic algorithm)
  window.generatePhonemeBreakdown = function(word) {
    // This is a simplified version - full implementation would need
    // sophisticated phonics rules engine
    const breakdown = [];
    // Return structure matching PHONEME_DATA format
    return {
      word: word,
      phonemes: [], // Would be populated by rules engine
      ipa: [],
      syllables: [word], // Simplified
      breakdown: breakdown
    };
  };

  // Helper to get articulation info
  window.getArticulationInfo = function(sound) {
    return window.PHONEME_ARTICULATION[sound] || null;
  };

  console.log("✓ Phoneme awareness system loaded");

})();
