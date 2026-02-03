/* ==========================================================================
   DECODE THE WORD: EDUCATIONAL JOKES, FUN FACTS & MOTIVATIONAL CONTENT
   Engagement content that reinforces learning while adding joy
   ========================================================================== */

window.ENGAGEMENT_CONTENT = {
    
    // Educational jokes that reinforce phonics concepts
    jokes: [
        // CVC Jokes
        "Why did the cat sit on the mat? Because it was a perfect CVC match!",
        "What do you call a pig that does karate? A pork chop!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What do you call a sleeping bull? A bulldozer!",
        "Why did the kid bring a ladder to school? Because she wanted to go to high school!",
        
        // Digraph Jokes
        "What do you call a fish wearing a crown? A king fish!",
        "Why did the chicken cross the playground? To get to the other slide!",
        "What do you call a sheep with no legs? A cloud!",
        "Why don't sharks live on land? Because they can't catch fish there!",
        "What's a tree's favorite drink? Root beer!",
        
        // Vowel Team Jokes  
        "What do you call a bear in the rain? A drizzly bear!",
        "Why did the bee get married? Because she found her honey!",
        "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
        "Why do fish live in salt water? Because pepper makes them sneeze!",
        "What do you call a cow on a trampoline? A milk shake!",
        
        // Reading Jokes
        "What's a book's favorite season? Fall, because that's when the leaves turn pages!",
        "Why did the book go to therapy? It had too many issues!",
        "What do you call a story about a broken pencil? Pointless!",
        "Why don't books ever get cold? They have book jackets!",
        "What's a librarian's favorite type of music? Something with a good story line!"
    ],
    
    // Educational fun facts that connect to literacy and phonics
    facts: [
        // Language Facts
        "The word 'alphabet' comes from the first two letters of the Greek alphabet: alpha and beta!",
        "The letter 'E' is the most commonly used letter in the English language!",
        "Some words look the same but sound different - these are called homographs, like 'read' (present) and 'read' (past)!",
        "The shortest complete sentence in English is 'I am' or 'Go!'",
        "There are over 7,000 languages spoken in the world today!",
        
        // Reading Facts
        "Children who read for just 15 minutes a day are exposed to about 1 million words per year!",
        "The average person's eyes make 2-3 jumps per second while reading!",
        "Reading fiction can help you understand other people's emotions better!",
        "Your brain creates mental movies when you read - that's why books can feel so real!",
        "Libraries have existed for over 4,000 years - the oldest known library was in ancient Mesopotamia!",
        
        // Phonics Facts  
        "The English language has about 44 different sounds but only 26 letters!",
        "The 'silent E' at the end of words is called 'magic E' because it changes the vowel sound!",
        "Rhyming words don't always have the same spelling pattern - like 'blue' and 'through'!",
        "Some letters make different sounds in different words - the letter 'C' can sound like 'K' or 'S'!",
        "The most common three-letter words in English are 'the', 'and', and 'for'!",
        
        // Brain Facts
        "Reading exercises your brain like a muscle - the more you read, the stronger it gets!",
        "When you read aloud, you use both the speaking and listening parts of your brain!",
        "Your brain can recognize a word in just 150 milliseconds - that's faster than a blink!",
        "Reading before bed can help you sleep better and remember more!",
        "Every time you learn a new word, your brain creates new connections!"
    ],
    
    // Motivational quotes and encouragement
    quotes: [
        // Growth Mindset
        "Every expert was once a beginner. Keep practicing!",
        "Mistakes are proof that you're trying and learning!",
        "Your brain grows stronger every time you struggle with something new!",
        "Reading is like exercise for your imagination!",
        "The more you read, the more places you'll go in your mind!",
        
        // Persistence
        "Some words are tricky, but you're trickier!",
        "Every book you read makes you a better reader!",
        "Learning to read is like learning to ride a bike - it takes practice, then it's yours forever!",
        "You don't have to be perfect, you just have to keep trying!",
        "Every great reader started with their first word!",
        
        // Joy of Reading
        "Books are friends that never leave your side!",
        "Reading gives your mind wings to fly anywhere!",
        "Each book is a doorway to a new adventure!",
        "Words are magic - they can take you anywhere and teach you anything!",
        "Reading is dreaming with your eyes open!"
    ],
    
    // Achievement celebrations
    celebrations: [
        "🎉 Fantastic! You're becoming a stronger reader!",
        "⭐ Amazing work! Your brain just grew a little bit!",
        "🏆 Excellent! You tackled that tricky word!",
        "🌟 Wonderful! You're building your reading superpowers!",
        "🎊 Great job! Every word you read makes you smarter!",
        "💪 Awesome! You didn't give up - that shows real strength!",
        "🎯 Perfect! You hit the target with that word!",
        "🚀 Incredible! You're launching into reading success!",
        "📚 Brilliant! You're adding more words to your word collection!",
        "🌈 Beautiful reading! You're painting pictures with words!"
    ]
};

// Content management functions
window.ENGAGEMENT_HELPERS = {
    
    // Get random content by type
    getRandomContent: function(type = 'mixed') {
        const content = window.ENGAGEMENT_CONTENT;
        
        if (type === 'mixed') {
            const allTypes = ['jokes', 'facts', 'quotes', 'celebrations'];
            type = allTypes[Math.floor(Math.random() * allTypes.length)];
        }
        
        const items = content[type] || content.facts;
        return {
            type: type,
            content: items[Math.floor(Math.random() * items.length)],
            emoji: this.getEmojiForType(type),
            title: this.getTitleForType(type)
        };
    },
    
    // Get emoji for content type
    getEmojiForType: function(type) {
        const emojis = {
            jokes: '😄',
            facts: '🌟', 
            quotes: '💭',
            celebrations: '🎉'
        };
        return emojis[type] || '📚';
    },
    
    // Get title for content type
    getTitleForType: function(type) {
        const titles = {
            jokes: 'Joke Time!',
            facts: 'Fun Fact!',
            quotes: 'You Can Do It!',
            celebrations: 'Great Job!'
        };
        return titles[type] || 'Did You Know?';
    },
    
    // Get content appropriate for age/level
    getAgeAppropriate: function(type, level = 'elementary') {
        // For now, all content is elementary-appropriate
        return this.getRandomContent(type);
    }
};

// Settings for popup control
window.POPUP_SETTINGS = {
    enabled: true,
    frequency: 3, // Show every 3 games
    types: ['jokes', 'facts', 'quotes'], // Which types to show
    showCelebrations: true, // Show celebrations on success
    duration: 5000 // How long to show popup (ms)
};

console.log('✓ Engagement content loaded:', 
    Object.keys(window.ENGAGEMENT_CONTENT).reduce((sum, key) => sum + window.ENGAGEMENT_CONTENT[key].length, 0),
    'items across all categories');
