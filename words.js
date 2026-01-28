window.WORD_ENTRIES = {
    // --- FLOSS RULE (ff, ll, ss, zz) ---
    "hill": { def: "Small mountain.", sentence: "Jack and Jill went up the hill.", syllables: "hill", tags: ["floss", "cvc"] },
    "bell": { def: "Metal ringer.", sentence: "The school bell rang loudly.", syllables: "bell", tags: ["floss", "cvc"] },
    "doll": { def: "Toy figure.", sentence: "The doll had blue eyes.", syllables: "doll", tags: ["floss", "cvc"] },
    "kiss": { def: "Touch with lips.", sentence: "Grandma gave me a sloppy kiss.", syllables: "kiss", tags: ["floss", "cvc"] },
    "mess": { def: "Untidy.", sentence: "Clean up this mess right now!", syllables: "mess", tags: ["floss", "cvc"] },
    "boss": { def: "Person in charge.", sentence: "The baby thinks he is the boss.", syllables: "boss", tags: ["floss", "cvc"] },
    "jazz": { def: "Style of music.", sentence: "The cat played cool jazz on the saxophone.", syllables: "jazz", tags: ["floss", "cvc"] },
    "buzz": { def: "Bee sound.", sentence: "The bee made a loud buzz.", syllables: "buzz", tags: ["floss", "cvc"] },
    "fizz": { def: "Bubbling sound.", sentence: "The soda pop has lots of fizz.", syllables: "fizz", tags: ["floss", "cvc"] },
    "cliff": { def: "Steep rock face.", sentence: "Do not stand too close to the cliff.", syllables: "cliff", tags: ["floss", "cvc"] },
    "sniff": { def: "Smell something.", sentence: "The dog began to sniff the pie.", syllables: "sniff", tags: ["floss", "blend"] },

    // --- PREFIXES (re-, un-, dis-, etc.) ---
    "remake": { def: "Make again.", sentence: "I had to remake my bed.", syllables: "re-make", tags: ["prefix", "multisyllable"] },
    "reuse": { def: "Use again.", sentence: "We reuse bottles to save the planet.", syllables: "re-use", tags: ["prefix", "magic-e"] },
    "undo": { def: "Reverse action.", sentence: "I cannot undo what I said.", syllables: "un-do", tags: ["prefix"] },
    "untie": { def: "Loosen a knot.", sentence: "Help me untie my shoe.", syllables: "un-tie", tags: ["prefix", "vowel-team"] },
    "unsafe": { def: "Dangerous.", sentence: "It is unsafe to run with scissors.", syllables: "un-safe", tags: ["prefix", "magic-e"] },
    "dislike": { def: "Not like.", sentence: "I dislike broccoli very much.", syllables: "dis-like", tags: ["prefix", "magic-e"] },
    "prepay": { def: "Pay before.", sentence: "You must prepay for the gas.", syllables: "pre-pay", tags: ["prefix", "vowel-team"] },
    "misuse": { def: "Use wrongly.", sentence: "Do not misuse the glue.", syllables: "mis-use", tags: ["prefix", "magic-e"] },

    // --- SUFFIXES & DOUBLING (1-1-1 Rule) ---
    "running": { def: "Moving fast.", sentence: "The dog is running after the ball.", syllables: "run-ning", tags: ["suffix", "doubling", "multisyllable"] },
    "sitting": { def: "Resting on bottom.", sentence: "The cat is sitting on my homework.", syllables: "sit-ting", tags: ["suffix", "doubling", "multisyllable"] },
    "hopping": { def: "Jumping lightly.", sentence: "The bunny is hopping in the grass.", syllables: "hop-ping", tags: ["suffix", "doubling", "multisyllable"] },
    "hugging": { def: "Embracing.", sentence: "The bear is hugging the tree.", syllables: "hug-ging", tags: ["suffix", "doubling", "multisyllable"] },
    "winning": { def: "Being first.", sentence: "Our team is winning the game.", syllables: "win-ning", tags: ["suffix", "doubling", "multisyllable"] },
    "hotter": { def: "More hot.", sentence: "Today is hotter than yesterday.", syllables: "hot-ter", tags: ["suffix", "doubling", "multisyllable"] },
    "bigger": { def: "More big.", sentence: "My pumpkin is bigger than yours.", syllables: "big-ger", tags: ["suffix", "doubling", "multisyllable"] },
    "jumping": { def: "Leaping.", sentence: "The frog is jumping high.", syllables: "jump-ing", tags: ["suffix", "multisyllable"] },
    "playing": { def: "Having fun.", sentence: "We are playing tag.", syllables: "play-ing", tags: ["suffix", "multisyllable"] },
    "fastest": { def: "Most fast.", sentence: "The cheetah is the fastest runner.", syllables: "fast-est", tags: ["suffix", "multisyllable"] },

    // --- MULTISYLLABLE ---
    "banana": { def: "Yellow fruit.", sentence: "The minion wanted a banana.", syllables: "ba-na-na", tags: ["multisyllable", "schwa"] },
    "picnic": { def: "Meal outside.", sentence: "Ants raided our picnic basket.", syllables: "pic-nic", tags: ["multisyllable", "cvc"] },
    "robot": { def: "Machine person.", sentence: "The robot did my chores.", syllables: "ro-bot", tags: ["multisyllable"] },
    "camel": { def: "Desert animal.", sentence: "The camel has two humps.", syllables: "cam-el", tags: ["multisyllable"] },
    "cactus": { def: "Prickly plant.", sentence: "Do not hug a cactus.", syllables: "cac-tus", tags: ["multisyllable"] },
    "magnet": { def: "Metal attractor.", sentence: "The magnet stuck to the fridge.", syllables: "mag-net", tags: ["multisyllable"] },
    "napkin": { def: "Paper for wiping.", sentence: "Use a napkin for your face.", syllables: "nap-kin", tags: ["multisyllable"] },
    "pumpkin": { def: "Orange gourd.", sentence: "We carved a pumpkin for Halloween.", syllables: "pump-kin", tags: ["multisyllable"] },
    "pocket": { def: "Pouch in clothes.", sentence: "I found a frog in my pocket.", syllables: "pock-et", tags: ["multisyllable"] },
    "tennis": { def: "Ball game.", sentence: "We played tennis on the court.", syllables: "ten-nis", tags: ["multisyllable", "floss"] },
    
    // --- BLENDS (Initial & Final) ---
    "spot": { def: "A dot.", sentence: "X marks the spot.", syllables: "spot", tags: ["blend-initial"] },
    "stop": { def: "Halt.", sentence: "Stop in the name of love.", syllables: "stop", tags: ["blend-initial"] },
    "plan": { def: "Idea.", sentence: "I have a cunning plan.", syllables: "plan", tags: ["blend-initial"] },
    "frog": { def: "Green hopper.", sentence: "The frog wore a crown.", syllables: "frog", tags: ["blend-initial"] },
    "drum": { def: "Beat instrument.", sentence: "Bang the drum loudly.", syllables: "drum", tags: ["blend-initial"] },
    "mask": { def: "Face cover.", sentence: "The superhero wore a mask.", syllables: "mask", tags: ["blend-final"] },
    "desk": { def: "Work table.", sentence: "My desk is covered in stickers.", syllables: "desk", tags: ["blend-final"] },
    "milk": { def: "Cow drink.", sentence: "Cookies and milk are delicious.", syllables: "milk", tags: ["blend-final"] },
    "camp": { def: "Sleep outside.", sentence: "We set up camp by the river.", syllables: "camp", tags: ["blend-final"] },
    "nest": { def: "Bird home.", sentence: "The eggs are in the nest.", syllables: "nest", tags: ["blend-final"] },

    // --- CVC (Short Vowels) ---
    "cat": { def: "A small pet that meows.", sentence: "The cat refused to wear the matching pajamas.", syllables: "cat", tags: ["cvc"] },
    "dog": { def: "A loyal pet that barks.", sentence: "My dog thinks he is actually a small horse.", syllables: "dog", tags: ["cvc"] },
    "pig": { def: "A farm animal with a curly tail.", sentence: "The pig wore a wig to the disco party.", syllables: "pig", tags: ["cvc"] },
    "box": { def: "A container made of cardboard.", sentence: "I built a rocket ship out of a giant box.", syllables: "box", tags: ["cvc"] },
    "bus": { def: "A large vehicle for many people.", sentence: "The bus driver sang opera songs all the way to school.", syllables: "bus", tags: ["cvc"] },
    "sun": { def: "The hot star in the sky.", sentence: "The sun put on sunglasses because it was too bright.", syllables: "sun", tags: ["cvc"] },
    "hat": { def: "Clothing for your head.", sentence: "My hat flew off and landed on a duck.", syllables: "hat", tags: ["cvc"] },
    "cup": { def: "Something you drink from.", sentence: "The tea cup started dancing on the table.", syllables: "cup", tags: ["cvc"] },
    
    // --- DIGRAPHS ---
    "ship": { def: "Large boat.", sentence: "The pirate ship was made of chocolate.", syllables: "ship", tags: ["digraph"] },
    "fish": { def: "Water animal.", sentence: "The fish blew a bubble that trapped a fly.", syllables: "fish", tags: ["digraph"] },
    "chip": { def: "Crispy snack.", sentence: "I bet you cannot eat just one potato chip.", syllables: "chip", tags: ["digraph"] },
    "moth": { def: "Night insect.", sentence: "The moth thought the lamp was the moon.", syllables: "moth", tags: ["digraph"] },
    
    // --- MAGIC E ---
    "cake": { def: "Sweet baked dessert.", sentence: "The birthday cake exploded with confetti.", syllables: "cake", tags: ["magic-e"] },
    "bike": { def: "Two-wheeled vehicle.", sentence: "My bike has a rocket booster on the back.", syllables: "bike", tags: ["magic-e"] },
    "bone": { def: "Hard skeleton part.", sentence: "The dog buried his bone in my flower pot.", syllables: "bone", tags: ["magic-e"] },
    
    // --- VOWEL TEAMS ---
    "boat": { def: "Water vehicle.", sentence: "The boat was powered by a giant hamster wheel.", syllables: "boat", tags: ["vowel-team"] },
    "rain": { def: "Sky water.", sentence: "If it rains cats and dogs, watch out for poodles.", syllables: "rain", tags: ["vowel-team"] },
    "moon": { def: "Night sky circle.", sentence: "The cow tried to jump over the moon but missed.", syllables: "moon", tags: ["vowel-team"] },
    
    // --- R-CONTROLLED ---
    "car":  { def: "Vehicle.", sentence: "The clown car fit fifty people.", syllables: "car", tags: ["r-controlled"] },
    "star": { def: "Night light.", sentence: "Twinkle twinkle little star.", syllables: "star", tags: ["r-controlled"] },
    "bird": { def: "Flying animal.", sentence: "The bird stole my sandwich.", syllables: "bird", tags: ["r-controlled"] }
};
