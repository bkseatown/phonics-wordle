/* ==========================================================================
   DECODE THE WORD: DECODABLE TEXTS DATABASE
   Science of Reading aligned texts for extended practice
   ========================================================================== */

window.DECODABLE_TEXTS = [
    {
        id: 1,
        title: "The Cat and the Mat",
        level: "CVC - Beginning",
        focus: "cvc",
        patterns: ["short a", "short e", "short i"],
        content: "The cat sat on the mat. The cat is fat. The rat ran to the cat. The cat and the rat sat on the mat. The end.",
        comprehension: [
            { question: "Where did the cat sit?", answer: "on the mat" },
            { question: "What animal ran to the cat?", answer: "the rat" }
        ]
    },
    {
        id: 2,
        title: "Ben's Big Dog", 
        level: "CVC - Developing",
        focus: "cvc",
        patterns: ["short e", "short i", "short o"],
        content: "Ben has a big dog. The dog can dig. The dog dug a big pit. Ben got wet. The dog got wet too. Ben and his dog run home.",
        comprehension: [
            { question: "What can the dog do?", answer: "dig" },
            { question: "What did the dog dig?", answer: "a big pit" }
        ]
    },
    {
        id: 3,
        title: "The Ship Trip",
        level: "Digraphs - Beginning", 
        focus: "digraph",
        patterns: ["sh", "ch", "th"],
        content: "The ship went on a trip. The child saw a fish. The fish had sharp teeth. The child wished to catch the fish. But the fish was too quick.",
        comprehension: [
            { question: "What did the ship go on?", answer: "a trip" },
            { question: "What did the fish have?", answer: "sharp teeth" }
        ]
    },
    {
        id: 4,
        title: "Frog on a Log",
        level: "Blends - Beginning",
        focus: "ccvc", 
        patterns: ["fl", "fr", "gr", "tr"],
        content: "A green frog sat on a log. The frog could jump and flip. A brown trod came by the log. The frog and toad became friends. They played by the stream.",
        comprehension: [
            { question: "What color was the frog?", answer: "green" },
            { question: "Where did they play?", answer: "by the stream" }
        ]
    },
    {
        id: 5,
        title: "The Magic Cake",
        level: "Magic E - Beginning",
        focus: "cvce",
        patterns: ["a_e", "i_e", "o_e"],
        content: "Jane made a cake. She put the cake on a plate. The cake looked nice. Mike came by to take a bite. The cake was so good that it made them both smile.",
        comprehension: [
            { question: "Who made the cake?", answer: "Jane" },
            { question: "What did the cake make them do?", answer: "smile" }
        ]
    },
    {
        id: 6,
        title: "Rain Day Play",
        level: "Vowel Teams - Beginning",
        focus: "vowel_team",
        patterns: ["ai", "ay", "ee", "ea"],
        content: "It was a rainy day. May could not play outside. She read a book about the sea. The book had pictures of green trees and clean beaches. May dreamed of sunny days.",
        comprehension: [
            { question: "Why couldn't May play outside?", answer: "it was rainy" },
            { question: "What was in May's book?", answer: "pictures of trees and beaches" }
        ]
    },
    {
        id: 7,
        title: "The Car Trip",
        level: "R-Controlled - Beginning", 
        focus: "r_controlled",
        patterns: ["ar", "or", "er"],
        content: "Our family took a trip in the car. We drove far to see the farm. The farmer showed us the barn. There were horses and corn. It was the best trip ever.",
        comprehension: [
            { question: "How did the family travel?", answer: "in the car" },
            { question: "What did they see at the farm?", answer: "horses and corn" }
        ]
    },
    {
        id: 8,
        title: "The Loud House",
        level: "Diphthongs - Beginning",
        focus: "diphthong", 
        patterns: ["ou", "ow", "oi", "oy"],
        content: "The house was loud. The boy played with his toy. His voice was loud too. The sound came out the window. The neighbors heard the noise. But they didn't mind because the boy brought them joy.",
        comprehension: [
            { question: "What was loud?", answer: "the house" },
            { question: "How did the neighbors feel?", answer: "they didn't mind" }
        ]
    },
    {
        id: 9,
        title: "Stuff in the Hill",
        level: "FLOSS Rule - Beginning",
        focus: "floss",
        patterns: ["ff", "ll", "ss"], 
        content: "Jill went up the hill. She found stuff in the grass. There was a bell and some shells. Jill put all the stuff in her bag. She felt happy as she went back down the hill.",
        comprehension: [
            { question: "Where did Jill go?", answer: "up the hill" },
            { question: "What did she find?", answer: "a bell and shells" }
        ]
    },
    {
        id: 10,
        title: "The King's Ring",
        level: "Welded Sounds - Beginning",
        focus: "welded",
        patterns: ["ng", "nk", "ing"],
        content: "The king lost his ring. He was thinking about where it could be. He looked in the bank and by the pink flowers. A bird was singing in a tree. The king found his ring hanging on a branch.",
        comprehension: [
            { question: "What did the king lose?", answer: "his ring" },
            { question: "Where did he find it?", answer: "hanging on a branch" }
        ]
    },
    {
        id: 11,
        title: "The Happy Family",
        level: "Multisyllabic - Beginning",
        focus: "multisyllable",
        patterns: ["two syllables", "compound words"],
        content: "The happy family went to the playground. The children played on the swings and slide. Mother and father sat on a blanket. Everyone had a wonderful time together. They decided to come back tomorrow.",
        comprehension: [
            { question: "Where did the family go?", answer: "the playground" },
            { question: "When will they come back?", answer: "tomorrow" }
        ]
    },
    {
        id: 12,
        title: "Unhappy to Happy",
        level: "Prefixes & Suffixes - Beginning", 
        focus: "prefix",
        patterns: ["un-", "re-", "-ed", "-ing"],
        content: "Tom was unhappy because he lost his homework. He looked everywhere but couldn't find it. Then he remembered he left it at school. Tom walked back to school and found his papers. He felt relieved and happy again.",
        comprehension: [
            { question: "Why was Tom unhappy?", answer: "he lost his homework" },
            { question: "Where did he find it?", answer: "at school" }
        ]
    }
];

// Helper functions for decodable texts
window.DECODABLE_HELPERS = {
    
    // Get texts by focus area
    getTextsByFocus: function(focus) {
        return window.DECODABLE_TEXTS.filter(text => text.focus === focus);
    },
    
    // Get texts by level
    getTextsByLevel: function(level) {
        return window.DECODABLE_TEXTS.filter(text => text.level.includes(level));
    },
    
    // Get random text for practice
    getRandomText: function(focus = null) {
        let texts = focus ? this.getTextsByFocus(focus) : window.DECODABLE_TEXTS;
        return texts[Math.floor(Math.random() * texts.length)];
    },
    
    // Count words in text
    countWords: function(text) {
        return text.content.split(/\s+/).filter(word => word.length > 0).length;
    },
    
    // Get difficulty score (rough estimate)
    getDifficultyScore: function(text) {
        const wordCount = this.countWords(text);
        const avgWordLength = text.content.replace(/[^a-zA-Z\s]/g, '').split(/\s+/)
            .reduce((sum, word) => sum + word.length, 0) / wordCount;
        return Math.round((wordCount * avgWordLength) / 10);
    }
};

console.log('✓ Decodable texts loaded:', window.DECODABLE_TEXTS.length, 'texts covering all phonics patterns');
