/* ==========================================================================
   DECODE THE WORD: COMPREHENSIVE TRANSLATION SYSTEM
   Extracted from multilingual word database for family engagement
   ========================================================================== */

window.TRANSLATIONS = {
    // Translation system that works with the multilingual word structure
    // This enables family engagement in native languages
    
    // Language codes supported
    supportedLanguages: ['en', 'es', 'zh', 'ms', 'vi', 'tl', 'pt', 'hi'],
    
    // Get translation for any word in the database
    getTranslation: function(word, langCode = 'en') {
        const wordData = window.WORDS_DATA && window.WORDS_DATA[word.toLowerCase()];
        if (!wordData) return null;
        
        const translation = wordData[langCode];
        if (!translation) return null;
        
        return {
            word: word,
            language: langCode,
            definition: translation.def || '',
            sentence: translation.sentence || '',
            phonetic: translation.phonetic || ''
        };
    },
    
    // Get all available languages for a word
    getAvailableLanguages: function(word) {
        const wordData = window.WORDS_DATA && window.WORDS_DATA[word.toLowerCase()];
        if (!wordData) return [];
        
        const availableLanguages = [];
        this.supportedLanguages.forEach(lang => {
            if (wordData[lang]) {
                availableLanguages.push(lang);
            }
        });
        return availableLanguages;
    },
    
    // Language display names
    languageNames: {
        'en': 'English',
        'es': 'Español',
        'zh': '中文',
        'ms': 'Bahasa Melayu', 
        'vi': 'Tiếng Việt',
        'tl': 'Filipino',
        'pt': 'Português',
        'hi': 'हिन्दी'
    },
    
    // Get language display name
    getLanguageName: function(langCode) {
        return this.languageNames[langCode] || langCode;
    }
};

// Legacy compatibility function
function getWordTranslation(word, langCode) {
    return window.TRANSLATIONS.getTranslation(word, langCode);
}

console.log('✓ Comprehensive translation system loaded with support for', window.TRANSLATIONS.supportedLanguages.length, 'languages');
