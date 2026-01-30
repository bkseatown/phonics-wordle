/* =========================================
   DECODE THE WORD - DECODABLE PASSAGES
   Connected text for reading practice
   Aligned with phonics patterns
   ========================================= */

(function () {
  window.PASSAGES = {
    
    /* ================================
       CVC PASSAGES (Short Vowels)
       ================================ */
    cvc: [
      {
        title: "The Cat and the Mat",
        level: "Beginning",
        focus: "Short vowels: a, e, i, o, u",
        text: "A cat sat on a mat. The cat was fat. A rat ran past the fat cat. The cat got up. The cat ran at the rat. The rat hid in a box. The cat sat on the mat. The cat had a nap.",
        words: ["cat", "sat", "mat", "was", "fat", "rat", "ran", "past", "got", "up", "at", "hid", "in", "box", "had", "nap"],
        highlightPattern: "cvc",
        questions: [
          "Where did the cat sit?",
          "What ran past the cat?",
          "Where did the rat hide?"
        ],
        teachingPoints: [
          "Notice the short vowel sounds: ă (cat), ĕ (get), ĭ (hid), ŏ (box), ŭ (up)",
          "Every CVC word follows the pattern: consonant-vowel-consonant",
          "The vowel is 'short' - it doesn't say its name"
        ]
      },
      {
        title: "The Red Hen",
        level: "Beginning",
        focus: "Short vowels with simple story",
        text: "A red hen had a pen. In the pen was a big pig. The pig sat in the mud. The hen did not sit in the mud. The hen sat on a log. A bug bit the pig. The pig ran and ran. The hen got the bug. The pig said thank you to the hen.",
        words: ["red", "hen", "had", "pen", "in", "was", "big", "pig", "sat", "mud", "did", "not", "on", "log", "bug", "bit", "ran", "got", "said"],
        highlightPattern: "cvc",
        questions: [
          "What color was the hen?",
          "Where did the pig sit?",
          "Who helped the pig?"
        ],
        teachingPoints: [
          "Short e in 'hen', 'pen', 'red'",
          "Short i in 'big', 'pig', 'bit', 'did'",
          "Short u in 'bug', 'mud'"
        ]
      },
      {
        title: "Ten Men",
        level: "Developing",
        focus: "All five short vowels",
        text: "Ten men met on a hot day. The sun was big and hot. The men sat in the grass. They had a fun plan. They would run a big race. The first man won a red cap. The men all had fun. After the race, they had a quick nap in the sun.",
        words: ["ten", "men", "met", "on", "hot", "day", "sun", "was", "big", "sat", "in", "had", "fun", "plan", "run", "race", "won", "red", "cap", "all", "nap"],
        highlightPattern: "cvc",
        questions: [
          "How many men were there?",
          "What did they do?",
          "What did the winner get?"
        ],
        teachingPoints: [
          "All five short vowels appear: a, e, i, o, u",
          "Notice high-frequency words: 'they', 'would', 'after'",
          "Practice reading with expression"
        ]
      }
    ],

    /* ================================
       DIGRAPH PASSAGES
       ================================ */
    digraph: [
      {
        title: "The Ship",
        level: "Beginning",
        focus: "Digraphs: sh, ch, th",
        text: "A big ship sits in the bay. On the ship is a man and his dog. The dog has thick fur. The man has a red hat. A fish swims past the ship. The dog sees the fish and barks. The man pets the dog. They both sit on the deck and watch the waves.",
        words: ["ship", "sits", "bay", "on", "is", "his", "dog", "has", "thick", "fur", "hat", "fish", "swims", "past", "sees", "barks", "pets", "both", "deck", "watch"],
        highlightPattern: "digraph",
        questions: [
          "Where is the ship?",
          "What does the dog have?",
          "What swims past the ship?"
        ],
        teachingPoints: [
          "Digraph 'sh' in ship: two letters, one sound /sh/",
          "Digraph 'th' in thick: voiced /th/ sound",
          "Digraph 'ch' can appear in other words too"
        ]
      },
      {
        title: "Lunch with Chad",
        level: "Developing",
        focus: "Multiple digraphs in context",
        text: "Chad and his mom go to lunch. They sit at a bench near the beach. Mom has a sandwich. Chad has fish and chips. A bird flies down and sits on their bench. The bird wants a chip. Chad gives the bird a small chip. The bird says thank you with a chirp. They finish lunch and walk back home on the path through the park.",
        words: ["lunch", "Chad", "mom", "sit", "bench", "beach", "sandwich", "fish", "chips", "bird", "down", "their", "wants", "chip", "gives", "thank", "chirp", "finish", "path", "through"],
        highlightPattern: "digraph",
        questions: [
          "Who did Chad have lunch with?",
          "What did the bird want?",
          "How did they walk home?"
        ],
        teachingPoints: [
          "Multiple digraphs: ch (Chad, lunch, beach, bench, chirp)",
          "Digraph sh: fish, wish, finish, sandwich",
          "Digraph th: thank, path, through"
        ]
      }
    ],

    /* ================================
       BLEND PASSAGES
       ================================ */
    blend: [
      {
        title: "The Brave Crab",
        level: "Beginning",
        focus: "Initial blends: bl, cr, br, fl, gr",
        text: "A brave crab lives by the sea. The crab has a blue shell. One day, a big wave crashes on the sand. The crab must run fast. The crab grabs his friend, a small snail. They hide under a flat rock. The storm passes. The friends are safe. The crab is glad he was brave and quick.",
        words: ["brave", "crab", "lives", "by", "blue", "shell", "day", "wave", "crashes", "sand", "must", "run", "fast", "grabs", "friend", "small", "snail", "hide", "flat", "rock", "storm", "glad", "quick"],
        highlightPattern: "blend",
        questions: [
          "What color is the crab's shell?",
          "Who is the crab's friend?",
          "Where did they hide?"
        ],
        teachingPoints: [
          "Initial blends: br (brave), cr (crab, crashes), bl (blue)",
          "Final blends: st (must, fast), nd (friend, sand)",
          "You hear both sounds in a blend, but they move together"
        ]
      },
      {
        title: "Spring Has Sprung",
        level: "Developing",
        focus: "Three-letter blends and seasonal vocabulary",
        text: "Spring has sprung at last. The snow melts and grass grows green. Flowers bloom in the garden. A robin builds a nest in the tree. Frogs croak in the pond. Children play outside and splash in puddles. The days grow longer and brighter. Everyone is glad that spring is here after the long, cold winter.",
        words: ["spring", "sprung", "at", "snow", "melts", "grass", "grows", "green", "flowers", "bloom", "garden", "robin", "builds", "nest", "tree", "frogs", "croak", "pond", "children", "play", "splash", "puddles", "grow", "glad"],
        highlightPattern: "blend",
        questions: [
          "What happens to the snow?",
          "What does the robin build?",
          "What do children do in puddles?"
        ],
        teachingPoints: [
          "Three-letter blends: spr (spring, sprung)",
          "Initial blends: gr (grass, grows, green), bl (bloom), fr (frogs), cr (croak), pl (play, splash)",
          "Notice how blends help us pack more sounds into words"
        ]
      }
    ],

    /* ================================
       MAGIC E PASSAGES
       ================================ */
    "magic-e": [
      {
        title: "The Brave Cave Explorer",
        level: "Developing",
        focus: "Long vowels with silent e",
        text: "Jake wants to explore a cave near his home. He takes a rope and a flashlight. Inside the cave, it is quite dark. Jake can see shapes on the stone walls. He finds a place to rest and takes a break. The cave is cold but safe. Jake makes his way back outside. The sunshine feels nice and warm. Jake is brave and had quite an adventure in the cave that day.",
        words: ["Jake", "explore", "cave", "near", "home", "takes", "rope", "inside", "quite", "stone", "finds", "place", "rest", "takes", "break", "safe", "makes", "way", "outside", "nice", "warm", "brave", "quite", "adventure"],
        highlightPattern: "magic-e",
        questions: [
          "What does Jake explore?",
          "What does he take with him?",
          "How does the sunshine feel?"
        ],
        teachingPoints: [
          "Silent e makes the vowel say its name: Jake, cave, rope, stone, place, safe, make, nice, brave",
          "Compare: cap/cape, hop/hope, mad/made",
          "The e is silent but powerful!"
        ]
      },
      {
        title: "A Bike Ride to the Lake",
        level: "Developing",
        focus: "Multiple CVCe patterns",
        text: "Mike and Jane ride their bikes to the lake. The ride takes quite some time. They wave to people as they pass by. At the lake, they take off their shoes and wade in the cool water. Jane finds a smooth white stone. Mike spots a snake on the shore. They stay safe by the water's edge. Later, they eat grapes and cake. What a fine day by the lake!",
        words: ["Mike", "Jane", "ride", "bikes", "lake", "takes", "quite", "time", "wave", "pass", "take", "wade", "cool", "finds", "white", "stone", "Mike", "snake", "shore", "safe", "edge", "grapes", "cake", "fine", "day"],
        highlightPattern: "magic-e",
        questions: [
          "Where do they ride their bikes?",
          "What does Jane find?",
          "What do they eat?"
        ],
        teachingPoints: [
          "Long a_e: Jane, lake, takes, wave, cake, grapes, snake",
          "Long i_e: Mike, ride, bikes, time, white, fine",
          "Long o_e: stone, shore",
          "Notice how the silent e changes the vowel sound"
        ]
      }
    ],

    /* ================================
       VOWEL TEAM PASSAGES
       ================================ */
    "vowel-team": [
      {
        title: "Rain in May",
        level: "Developing",
        focus: "Vowel teams: ai, ay, ee, ea",
        text: "It is May and rain falls from gray clouds. Sam stays inside to read a book. He drinks tea and eats toast. Outside, the rain makes puddles in the street. Sam sees a bird searching for seeds in the rain. After the rain stops, Sam goes outside to play. The air smells clean and fresh. He sees a rainbow in the sky. What a great day after the rain!",
        words: ["May", "rain", "gray", "Sam", "stays", "read", "tea", "eats", "toast", "rain", "street", "sees", "searching", "seeds", "rain", "play", "clean", "sees", "rainbow", "great", "day", "rain"],
        highlightPattern: "vowel-team",
        questions: [
          "What month is it?",
          "What does Sam do inside?",
          "What does he see in the sky?"
        ],
        teachingPoints: [
          "Vowel team 'ai': rain, rainbow",
          "Vowel team 'ay': May, stays, play, day",
          "Vowel team 'ea': tea, eats, clean",
          "Vowel team 'ee': seeds, sees",
          "When two vowels team up, usually the first one 'talks'"
        ]
      },
      {
        title: "Boat Trip at the Beach",
        level: "Advancing",
        focus: "Multiple vowel teams in context",
        text: "The team loads the boat early in the morning. The sea is calm and the sky is clear. They float out past the coast. Jean sees three seals sleeping on the rocks. The seals seem peaceful in the sunshine. The team eats a meal on the boat: bread, cheese, and peaches. A seagull flies by hoping for a treat. They sail for hours under the bright blue sky. What a dream of a day on the sea!",
        words: ["team", "loads", "boat", "sea", "clear", "float", "coast", "Jean", "sees", "three", "seals", "sleeping", "seem", "peaceful", "eats", "meal", "boat", "bread", "cheese", "peaches", "seagull", "treat", "sail", "dream", "day", "sea"],
        highlightPattern: "vowel-team",
        questions: [
          "When do they load the boat?",
          "What does Jean see on the rocks?",
          "What do they eat?"
        ],
        teachingPoints: [
          "Vowel team 'ea': team, sea, Jean, seals, peaceful, eats, meal, peaches, treat, dream",
          "Vowel team 'oa': loads, boat, float, coast",
          "Vowel team 'ee': three, sleeping, seem, cheese",
          "Notice: 'ea' can make different sounds (bread vs. beach)"
        ]
      }
    ],

    /* ================================
       R-CONTROLLED PASSAGES
       ================================ */
    "r-controlled": [
      {
        title: "The Bird in the Park",
        level: "Beginning",
        focus: "R-controlled vowels: ar, er, ir, or",
        text: "A bird sits on a branch in the park. The bird has dark feathers and a short tail. It chirps a cheerful song. A girl walks past. She hears the bird singing. The bird flies to a fern near the path. The girl watches it search for food. She learns that birds work hard to find what they need. The bird flies north to find more food before dark.",
        words: ["bird", "park", "dark", "feathers", "short", "chirps", "cheerful", "girl", "hears", "fern", "near", "search", "learns", "work", "hard", "find", "north", "before", "dark"],
        highlightPattern: "r-controlled",
        questions: [
          "Where does the bird sit?",
          "What does the bird do?",
          "Where does the bird fly?"
        ],
        teachingPoints: [
          "R-controlled 'ar': park, dark, hard",
          "R-controlled 'er': feathers, fern, cheerful",
          "R-controlled 'ir': bird, chirps, girl",
          "R-controlled 'or': short, north, before, work",
          "The 'r' is bossy - it changes how the vowel sounds!"
        ]
      },
      {
        title: "The Storm",
        level: "Developing",
        focus: "All r-controlled vowels with weather theme",
        text: "Dark storm clouds form in the north. The air turns cold. Birds hurry to shelter before the storm arrives. Thunder rumbles and lightning flashes across the purple sky. Rain pours down hard. Water swirls in the street. A girl watches from her porch. She wears a warm sweater and holds a mug of hot cocoa. After an hour, the storm passes. The earth smells fresh and clean. The girl sees a perfect rainbow arching over the park. She learned that storms can be scary but also beautiful.",
        words: ["storm", "dark", "form", "north", "air", "turns", "birds", "hurry", "shelter", "before", "storm", "thunder", "purple", "pours", "hard", "swirls", "street", "girl", "porch", "wears", "warm", "sweater", "mug", "hour", "earth", "perfect", "arching", "park", "learned"],
        highlightPattern: "r-controlled",
        questions: [
          "Where do the clouds form?",
          "What does the girl wear?",
          "What appears after the storm?"
        ],
        teachingPoints: [
          "R-controlled 'ar': dark, warm",
          "R-controlled 'er': shelter, sweater, after, perfect",
          "R-controlled 'ir': girl, birds, swirls",
          "R-controlled 'or': storm, form, north, porch",
          "R-controlled 'ur': turns, hurry, thunder, purple, pours, hour"
        ]
      }
    ],

    /* ================================
       MULTISYLLABIC PASSAGES
       ================================ */
    multisyllable: [
      {
        title: "The Garden Picnic",
        level: "Advancing",
        focus: "Two-syllable words with multiple patterns",
        text: "The children decide to have a picnic in the garden. They carry a basket filled with sandwiches, apples, and lemon cookies. Under a shady tree, they spread a blanket on the grass. Butterflies flutter around the flowers. A rabbit hops past, then stops to nibble some clover. The children eat their lunch and tell funny stories. Later, they help their mother water the garden. The sunset paints the sky purple and orange. What a perfect summer afternoon!",
        words: ["children", "decide", "picnic", "garden", "carry", "basket", "sandwiches", "apples", "lemon", "cookies", "under", "shady", "blanket", "butterflies", "flutter", "flowers", "rabbit", "nibble", "clover", "funny", "stories", "later", "mother", "water", "garden", "sunset", "purple", "orange", "perfect", "summer", "afternoon"],
        highlightPattern: "multisyllable",
        questions: [
          "What do the children carry?",
          "What animal hops past?",
          "What do they do after lunch?"
        ],
        teachingPoints: [
          "Break words into syllables: pic-nic, bas-ket, blan-ket, rab-bit",
          "Look for familiar patterns in each syllable",
          "Compound words: sun-set, but-ter-flies, after-noon",
          "Clap out syllables to help decode"
        ]
      },
      {
        title: "The Helpful Robot",
        level: "Advancing",
        focus: "Multisyllabic with prefixes and suffixes",
        text: "Professor Chen invents a helpful robot in her workshop. The robot can complete many different tasks. It cleans the windows, organizes books, and even prepares sandwiches for lunch. One morning, the robot discovers a problem. The garden needs watering, but the hose has a leak. The clever robot quickly finds a solution. It uses tape to repair the broken section. Professor Chen is impressed with the robot's thinking. She decides to enter the robot in a contest. The robot wins first prize for being both useful and creative!",
        words: ["Professor", "invents", "helpful", "robot", "workshop", "complete", "different", "cleans", "windows", "organizes", "prepares", "sandwiches", "morning", "discovers", "problem", "garden", "watering", "clever", "quickly", "solution", "repair", "broken", "section", "impressed", "thinking", "decides", "enter", "contest", "useful", "creative"],
        highlightPattern: "multisyllable",
        questions: [
          "What does Professor Chen invent?",
          "What problem does the robot find?",
          "What prize does the robot win?"
        ],
        teachingPoints: [
          "Prefix 'dis-': discovers (dis-cov-ers)",
          "Suffix '-ful': helpful, useful",
          "Suffix '-ing': watering, thinking",
          "Suffix '-ly': quickly",
          "Three+ syllables: dif-fer-ent, or-gan-ize, sand-wich-es",
          "Break complex words into manageable parts"
        ]
      }
    ],

    /* ================================
       MIXED REVIEW PASSAGES
       ================================ */
    all: [
      {
        title: "The Moonlight Adventure",
        level: "Advancing",
        focus: "All phonics patterns integrated",
        text: "Late one moonlit night, twins Maya and Jake couldn't sleep. They heard strange chirping sounds coming from the backyard. Being brave and curious, they decided to investigate. Carefully, they crept outside with their flashlights. Near the garden shed, they discovered three tiny baby birds that had fallen from their nest. The birds seemed frightened and cold. Maya gently scooped them up while Jake found a small box with soft cloth inside. They placed the birds carefully in the box to keep them warm and safe. In the morning, they would ask their neighbor, Mr. Carter, who knew everything about birds, to help return them to their mother. As they walked back inside, they both felt proud of their kind rescue. Sometimes being helpful means staying up past bedtime!",
        words: ["moonlit", "twins", "Maya", "Jake", "sleep", "strange", "chirping", "backyard", "brave", "curious", "investigate", "carefully", "crept", "flashlights", "garden", "discovered", "three", "tiny", "fallen", "nest", "frightened", "gently", "scooped", "found", "cloth", "placed", "carefully", "warm", "safe", "morning", "neighbor", "Carter", "everything", "return", "mother", "proud", "rescue", "helpful", "staying", "bedtime"],
        highlightPattern: "all",
        questions: [
          "Why couldn't the twins sleep?",
          "What did they find in the backyard?",
          "Who will they ask for help in the morning?",
          "How did they keep the birds safe?"
        ],
        teachingPoints: [
          "This passage contains ALL phonics patterns you've learned",
          "CVC: get, bed",
          "Digraphs: chirping, three, mother, cloth",
          "Blends: brave, crept, flashlights, placed",
          "Magic e: Jake, brave, late, inside, safe",
          "Vowel teams: moonlit, sleep, seemed",
          "R-controlled: Carter, birds, garden, morning, mother",
          "Multisyllabic: investigate, discovered, carefully, everything, neighbor",
          "Can you find one example of each pattern?"
        ]
      },
      {
        title: "The Science Fair Success",
        level: "Advanced",
        focus: "Complex multisyllabic with academic vocabulary",
        text: "Rosa prepared all semester for the school science fair. Her project investigated how different liquids affect plant growth. She planted identical seeds in separate containers and watered each group with a different liquid: plain water, salt water, sugar water, and lemon juice. Rosa recorded her observations carefully each morning before school. She measured each plant's height, counted the leaves, and photographed the results. After three weeks, Rosa discovered something interesting. Plants watered with plain water grew the tallest and healthiest. Salt water actually prevented growth almost completely. Sugar water made plants grow quickly at first, but then they became weak and droopy. The lemon juice plants showed unexpected results - moderate growth with unusually dark green leaves. On science fair day, Rosa explained her hypothesis, method, data, and conclusions clearly. The judges were impressed with her systematic approach and critical thinking. She learned that good science requires patience, careful observation, and honest reporting of results - whether they match your prediction or surprise you!",
        words: ["Rosa", "prepared", "semester", "science", "fair", "project", "investigated", "liquids", "affect", "plant", "growth", "planted", "identical", "seeds", "separate", "containers", "watered", "group", "different", "liquid", "plain", "salt", "sugar", "lemon", "juice", "recorded", "observations", "carefully", "morning", "school", "measured", "height", "counted", "photographed", "results", "weeks", "discovered", "interesting", "tallest", "healthiest", "prevented", "completely", "quickly", "became", "weak", "droopy", "unexpected", "moderate", "unusually", "explained", "hypothesis", "method", "data", "conclusions", "clearly", "judges", "impressed", "systematic", "approach", "critical", "thinking", "learned", "requires", "patience", "observation", "honest", "reporting", "prediction", "surprise"],
        highlightPattern: "all",
        questions: [
          "What did Rosa's project investigate?",
          "Which liquid helped plants grow best?",
          "What happened to plants with salt water?",
          "What did the judges appreciate about Rosa's work?",
          "What three things does good science require?"
        ],
        teachingPoints: [
          "Academic vocabulary: investigate, hypothesis, observations, conclusions",
          "Complex multisyllabic words: identical (i-den-ti-cal), systematic (sys-tem-at-ic), observation (ob-ser-va-tion)",
          "Prefixes: unexpected (un-), prevented (pre-)",
          "Suffixes: carefully (-ful-ly), healthiest (-i-est), completely (-ly)",
          "Notice how breaking words into syllables makes them easier to read",
          "Science terms often have Greek or Latin roots"
        ]
      }
    ]
  };

  // Helper function to get passages by focus
  window.getPassagesByFocus = function(focus) {
    return window.PASSAGES[focus] || [];
  };

  // Helper function to get random passage
  window.getRandomPassage = function(focus) {
    const passages = window.PASSAGES[focus] || [];
    if (passages.length === 0) return null;
    return passages[Math.floor(Math.random() * passages.length)];
  };

  console.log("✓ Decodable passages library loaded");

})();
