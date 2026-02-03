// Simple translation system that uses your existing multilingual word data
window.TRANSLATIONS = {
    getTranslation: function(word, langCode = 'en') {
        const wordData = window.WORDS_DATA && window.WORDS_DATA[word.toLowerCase()];
        if (!wordData || !wordData[langCode]) return null;
        
        return {
            definition: wordData[langCode].def || '',
            sentence: wordData[langCode].sentence || ''
        };
    }
};

console.log('✓ Translation system ready');
