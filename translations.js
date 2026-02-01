/* ==========================================================================
   DECODE THE WORD: TRANSLATION DATABASE (EXPANDED - Phase 1)
   16 High-Frequency Words × 8 Languages
   Languages: Spanish, Chinese, Arabic, Vietnamese, Tagalog, Portuguese, French, Hindi
   ========================================================================== */

(function() {
    'use strict';

    window.SUPPORTED_LANGUAGES = {
        es: 'Spanish / Español',
        zh: 'Chinese / 中文',
        ar: 'Arabic / العربية',
        vi: 'Vietnamese / Tiếng Việt',
        tl: 'Tagalog',
        pt: 'Portuguese / Português',
        fr: 'French / Français',
        hi: 'Hindi / हिन्दी'
    };

    window.TRANSLATIONS = {
        
        cat: {
            es: { word: "gato", def: "Un animal pequeño con pelaje que maúlla.", sentence: "El gato se sentó en la alfombra.", phonetic: "GAH-toh" },
            zh: { word: "猫", def: "一种会叫的小动物。", sentence: "猫静静地坐在垫子上。", phonetic: "māo" },
            ar: { word: "قطة", def: "حيوان صغير يموء.", sentence: "القطة جلست على السجادة.", phonetic: "qiṭṭa" },
            vi: { word: "con mèo", def: "Một động vật nhỏ kêu meo meo.", sentence: "Con mèo ngồi trên thảm.", phonetic: "kon mɛːw" },
            tl: { word: "pusa", def: "Isang maliit na hayop na may balahibo.", sentence: "Ang pusa ay umupo sa alpombra.", phonetic: "poo-sah" },
            pt: { word: "gato", def: "Um animal pequeno que mia.", sentence: "O gato sentou no tapete.", phonetic: "GAH-too" },
            fr: { word: "chat", def: "Un petit animal qui miaule.", sentence: "Le chat s'est assis sur le tapis.", phonetic: "shah" },
            hi: { word: "बिल्ली", def: "एक छोटा जानवर जो म्याऊं करता है।", sentence: "बिल्ली चटाई पर बैठी।", phonetic: "bil-lee" }
        },

        dog: {
            es: { word: "perro", def: "Un animal que ladra.", sentence: "El perro corrió por el parque.", phonetic: "PEH-roh" },
            zh: { word: "狗", def: "一种会叫的宠物。", sentence: "狗在公园里跑。", phonetic: "gǒu" },
            ar: { word: "كلب", def: "حيوان ينبح.", sentence: "الكلب ركض في الحديقة.", phonetic: "kalb" },
            vi: { word: "con chó", def: "Một động vật sủa gâu gâu.", sentence: "Con chó chạy trong công viên.", phonetic: "kon chó" },
            tl: { word: "aso", def: "Isang hayop na tumatahol.", sentence: "Ang aso ay tumakbo sa parke.", phonetic: "AH-so" },
            pt: { word: "cachorro", def: "Um animal que late.", sentence: "O cachorro correu no parque.", phonetic: "kah-SHOR-roo" },
            fr: { word: "chien", def: "Un animal qui aboie.", sentence: "Le chien a couru dans le parc.", phonetic: "shee-ehn" },
            hi: { word: "कुत्ता", def: "एक जानवर जो भौंकता है।", sentence: "कुत्ता पार्क में दौड़ा।", phonetic: "kut-taa" }
        },

        run: {
            es: { word: "correr", def: "Moverse rápidamente.", sentence: "Los niños corren rápido.", phonetic: "ko-REHR" },
            zh: { word: "跑", def: "快速移动。", sentence: "孩子们跑得快。", phonetic: "pǎo" },
            ar: { word: "يجري", def: "التحرك بسرعة.", sentence: "الأطفال يجرون بسرعة.", phonetic: "yajri" },
            vi: { word: "chạy", def: "Di chuyển nhanh.", sentence: "Các em chạy nhanh.", phonetic: "chai" },
            tl: { word: "tumakbo", def: "Gumalaw nang mabilis.", sentence: "Ang mga bata ay tumatakbo.", phonetic: "too-mahk-bo" },
            pt: { word: "correr", def: "Mover-se rapidamente.", sentence: "As crianças correm rápido.", phonetic: "ko-HEHR" },
            fr: { word: "courir", def: "Se déplacer rapidement.", sentence: "Les enfants courent vite.", phonetic: "koo-reer" },
            hi: { word: "दौड़ना", def: "तेजी से चलना।", sentence: "बच्चे तेज़ दौड़ते हैं।", phonetic: "dowd-naa" }
        },

        sun: {
            es: { word: "sol", def: "La estrella que brilla en el cielo.", sentence: "El sol brilla hoy.", phonetic: "sohl" },
            zh: { word: "太阳", def: "天空中的明亮星星。", sentence: "今天太阳很亮。", phonetic: "tài yáng" },
            ar: { word: "شمس", def: "النجم المشرق في السماء.", sentence: "الشمس مشرقة اليوم.", phonetic: "shams" },
            vi: { word: "mặt trời", def: "Ngôi sao sáng trên trời.", sentence: "Mặt trời sáng hôm nay.", phonetic: "mat trawee" },
            tl: { word: "araw", def: "Ang bituin na sumisingning.", sentence: "Ang araw ay maliwanag ngayon.", phonetic: "ah-RAW" },
            pt: { word: "sol", def: "A estrela brilhante.", sentence: "O sol brilha hoje.", phonetic: "SOHL" },
            fr: { word: "soleil", def: "L'étoile brillante.", sentence: "Le soleil brille aujourd'hui.", phonetic: "so-lay" },
            hi: { word: "सूरज", def: "आकाश में चमकता तारा।", sentence: "आज सूरज चमक रहा है।", phonetic: "soo-raj" }
        },

        big: {
            es: { word: "grande", def: "De tamaño mayor.", sentence: "El elefante es muy grande.", phonetic: "GRAHN-deh" },
            zh: { word: "大", def: "尺寸很大。", sentence: "大象非常大。", phonetic: "dà" },
            ar: { word: "كبير", def: "ذو حجم كبير.", sentence: "الفيل كبير جداً.", phonetic: "kabeer" },
            vi: { word: "to", def: "Kích thước lớn.", sentence: "Con voi rất to.", phonetic: "taw" },
            tl: { word: "malaki", def: "Malaking sukat.", sentence: "Ang elepante ay napakala ki.", phonetic: "mah-lah-kee" },
            pt: { word: "grande", def: "De tamanho maior.", sentence: "O elefante é muito grande.", phonetic: "GRAHN-jee" },
            fr: { word: "grand", def: "De grande taille.", sentence: "L'éléphant est très grand.", phonetic: "grahn" },
            hi: { word: "बड़ा", def: "बड़े आकार का।", sentence: "हाथी बहुत बड़ा है।", phonetic: "buh-daa" }
        },

        red: {
            es: { word: "rojo", def: "Color del fuego.", sentence: "La manzana es roja.", phonetic: "ROH-hoh" },
            zh: { word: "红色", def: "火的颜色。", sentence: "苹果是红色的。", phonetic: "hóng sè" },
            ar: { word: "أحمر", def: "لون النار.", sentence: "التفاحة حمراء.", phonetic: "ahmar" },
            vi: { word: "màu đỏ", def: "Màu của lửa.", sentence: "Quả táo màu đỏ.", phonetic: "màu daw" },
            tl: { word: "pula", def: "Kulay ng apoy.", sentence: "Ang mansanas ay pula.", phonetic: "poo-lah" },
            pt: { word: "vermelho", def: "Cor do fogo.", sentence: "A maçã é vermelha.", phonetic: "vehr-MEH-lyoo" },
            fr: { word: "rouge", def: "Couleur du feu.", sentence: "La pomme est rouge.", phonetic: "roozh" },
            hi: { word: "लाल", def: "आग का रंग।", sentence: "सेब लाल है।", phonetic: "laal" }
        },

        hop: {
            es: { word: "saltar", def: "Brincar.", sentence: "El conejo salta alto.", phonetic: "sahl-TAHR" },
            zh: { word: "跳", def: "跳跃。", sentence: "兔子跳得很高。", phonetic: "tiào" },
            ar: { word: "يقفز", def: "القفز.", sentence: "الأرنب يقفز عالياً.", phonetic: "yaqfiz" },
            vi: { word: "nhảy", def: "Nhảy lên.", sentence: "Thỏ nhảy cao.", phonetic: "nyai" },
            tl: { word: "tumalon", def: "Sumalta.", sentence: "Ang kuneho ay tumalon nang mataas.", phonetic: "too-mah-lon" },
            pt: { word: "pular", def: "Saltar.", sentence: "O coelho pula alto.", phonetic: "poo-LAHR" },
            fr: { word: "sauter", def: "Bondir.", sentence: "Le lapin saute haut.", phonetic: "so-tay" },
            hi: { word: "कूदना", def: "उछलना।", sentence: "खरगोश ऊंचा कूदता है।", phonetic: "kood-naa" }
        },

        sit: {
            es: { word: "sentar", def: "Descansar sentado.", sentence: "Siéntate aquí.", phonetic: "sehn-TAHR" },
            zh: { word: "坐", def: "坐下休息。", sentence: "请坐这里。", phonetic: "zuò" },
            ar: { word: "يجلس", def: "الجلوس للراحة.", sentence: "اجلس هنا.", phonetic: "yajlis" },
            vi: { word: "ngồi", def: "Ngồi xuống.", sentence: "Ngồi đây.", phonetic: "ngoy" },
            tl: { word: "umupo", def: "Magpahinga.", sentence: "Umupo dito.", phonetic: "oo-moo-po" },
            pt: { word: "sentar", def: "Descansar sentado.", sentence: "Sente-se aqui.", phonetic: "sehn-TAHR" },
            fr: { word: "asseoir", def: "S'asseoir.", sentence: "Assieds-toi ici.", phonetic: "ah-swahr" },
            hi: { word: "बैठना", def: "बैठकर आराम करना।", sentence: "यहाँ बैठो।", phonetic: "baith-naa" }
        },

        can: {
            es: { word: "puede", def: "Ser capaz.", sentence: "Puedo hacerlo.", phonetic: "PWEH-deh" },
            zh: { word: "能", def: "能够。", sentence: "我能做到。", phonetic: "néng" },
            ar: { word: "يمكن", def: "القدرة.", sentence: "يمكنني فعل ذلك.", phonetic: "yumkin" },
            vi: { word: "có thể", def: "Có khả năng.", sentence: "Tôi có thể làm được.", phonetic: "kó tể" },
            tl: { word: "maaari", def: "May kakayahan.", sentence: "Kaya ko ito.", phonetic: "mah-ah-ree" },
            pt: { word: "pode", def: "Ser capaz.", sentence: "Posso fazer isso.", phonetic: "POH-jee" },
            fr: { word: "peut", def: "Être capable.", sentence: "Je peux le faire.", phonetic: "puh" },
            hi: { word: "सकता", def: "सक्षम होना।", sentence: "मैं यह कर सकता हूँ।", phonetic: "sak-taa" }
        },

        top: {
            es: { word: "arriba", def: "La parte alta.", sentence: "Está arriba.", phonetic: "ah-REE-bah" },
            zh: { word: "顶部", def: "最高处。", sentence: "在顶部。", phonetic: "dǐng bù" },
            ar: { word: "أعلى", def: "الجزء العلوي.", sentence: "إنه في الأعلى.", phonetic: "a'laa" },
            vi: { word: "đỉnh", def: "Phần trên cùng.", sentence: "Ở đỉnh.", phonetic: "dinh" },
            tl: { word: "tuktok", def: "Ang itaas.", sentence: "Nasa tuktok.", phonetic: "took-tok" },
            pt: { word: "topo", def: "A parte alta.", sentence: "Está no topo.", phonetic: "TOH-poo" },
            fr: { word: "haut", def: "La partie haute.", sentence: "C'est en haut.", phonetic: "oh" },
            hi: { word: "शीर्ष", def: "ऊपरी हिस्सा।", sentence: "शीर्ष पर है।", phonetic: "sheer-sh" }
        },

        hat: {
            es: { word: "sombrero", def: "Se lleva en la cabeza.", sentence: "Tengo un sombrero.", phonetic: "sohm-BREH-roh" },
            zh: { word: "帽子", def: "戴在头上的。", sentence: "我有一顶帽子。", phonetic: "mào zi" },
            ar: { word: "قبعة", def: "تُلبس على الرأس.", sentence: "لدي قبعة.", phonetic: "qubba'a" },
            vi: { word: "mũ", def: "Đội trên đầu.", sentence: "Tôi có một cái mũ.", phonetic: "moo" },
            tl: { word: "sumbrero", def: "Isinusuot sa ulo.", sentence: "Mayroon akong sumbrero.", phonetic: "soom-breh-roh" },
            pt: { word: "chapéu", def: "Usado na cabeça.", sentence: "Tenho um chapéu.", phonetic: "shah-PEH-oo" },
            fr: { word: "chapeau", def: "Porté sur la tête.", sentence: "J'ai un chapeau.", phonetic: "shah-poh" },
            hi: { word: "टोपी", def: "सिर पर पहनी जाती है।", sentence: "मेरे पास एक टोपी है।", phonetic: "toe-pee" }
        },

        map: {
            es: { word: "mapa", def: "Muestra lugares.", sentence: "Usamos un mapa.", phonetic: "MAH-pah" },
            zh: { word: "地图", def: "显示地方。", sentence: "我们用地图。", phonetic: "dì tú" },
            ar: { word: "خريطة", def: "تُظهر الأماكن.", sentence: "نستخدم خريطة.", phonetic: "khareeṭa" },
            vi: { word: "bản đồ", def: "Cho thấy địa điểm.", sentence: "Chúng ta dùng bản đồ.", phonetic: "ban daw" },
            tl: { word: "mapa", def: "Nagpapakita ng mga lugar.", sentence: "Gumagamit kami ng mapa.", phonetic: "MAH-pah" },
            pt: { word: "mapa", def: "Mostra lugares.", sentence: "Usamos um mapa.", phonetic: "MAH-pah" },
            fr: { word: "carte", def: "Montre des lieux.", sentence: "Nous utilisons une carte.", phonetic: "kahrt" },
            hi: { word: "नक्शा", def: "जगहें दिखाता है।", sentence: "हम नक्शा इस्तेमाल करते हैं।", phonetic: "nak-sha" }
        },

        ship: {
            es: { word: "barco", def: "Viaja por agua.", sentence: "El barco navega.", phonetic: "BAHR-koh" },
            zh: { word: "船", def: "在水上行驶。", sentence: "船在航行。", phonetic: "chuán" },
            ar: { word: "سفينة", def: "تسافر على الماء.", sentence: "السفينة تبحر.", phonetic: "safeena" },
            vi: { word: "con tàu", def: "Di chuyển trên nước.", sentence: "Con tàu đang đi.", phonetic: "kon tàu" },
            tl: { word: "barko", def: "Naglalakbay sa tubig.", sentence: "Ang barko ay naglalayag.", phonetic: "BAHR-ko" },
            pt: { word: "navio", def: "Viaja pela água.", sentence: "O navio navega.", phonetic: "nah-VEE-oo" },
            fr: { word: "navire", def: "Voyage sur l'eau.", sentence: "Le navire navigue.", phonetic: "nah-veer" },
            hi: { word: "जहाज़", def: "पानी पर चलता है।", sentence: "जहाज़ जा रहा है।", phonetic: "ja-haaz" }
        },

        rain: {
            es: { word: "lluvia", def: "Agua del cielo.", sentence: "Está lloviendo.", phonetic: "YOO-vee-ah" },
            zh: { word: "雨", def: "从天上落下的水。", sentence: "正在下雨。", phonetic: "yǔ" },
            ar: { word: "مطر", def: "ماء من السماء.", sentence: "إنها تمطر.", phonetic: "maṭar" },
            vi: { word: "mưa", def: "Nước từ trời.", sentence: "Trời đang mưa.", phonetic: "mưa" },
            tl: { word: "ulan", def: "Tubig mula sa langit.", sentence: "Umuulan.", phonetic: "oo-lan" },
            pt: { word: "chuva", def: "Água do céu.", sentence: "Está chovendo.", phonetic: "SHOO-vah" },
            fr: { word: "pluie", def: "Eau du ciel.", sentence: "Il pleut.", phonetic: "plwee" },
            hi: { word: "बारिश", def: "आकाश से पानी।", sentence: "बारिश हो रही है।", phonetic: "baa-rish" }
        },

        tree: {
            es: { word: "árbol", def: "Planta grande.", sentence: "El árbol es alto.", phonetic: "AHR-bohl" },
            zh: { word: "树", def: "大植物。", sentence: "树很高。", phonetic: "shù" },
            ar: { word: "شجرة", def: "نبات كبير.", sentence: "الشجرة طويلة.", phonetic: "shajara" },
            vi: { word: "cây", def: "Cây lớn.", sentence: "Cây cao.", phonetic: "kai" },
            tl: { word: "puno", def: "Malaking halaman.", sentence: "Ang puno ay mataas.", phonetic: "poo-no" },
            pt: { word: "árvore", def: "Planta grande.", sentence: "A árvore é alta.", phonetic: "AHR-vo-ree" },
            fr: { word: "arbre", def: "Grande plante.", sentence: "L'arbre est grand.", phonetic: "ahr-br" },
            hi: { word: "पेड़", def: "बड़ा पौधा।", sentence: "पेड़ ऊँचा है।", phonetic: "ped" }
        },

        bird: {
            es: { word: "pájaro", def: "Vuela con alas.", sentence: "El pájaro canta.", phonetic: "PAH-ha-roh" },
            zh: { word: "鸟", def: "用翅膀飞。", sentence: "鸟在唱歌。", phonetic: "niǎo" },
            ar: { word: "طائر", def: "يطير بجناحيه.", sentence: "الطائر يغني.", phonetic: "ṭa'ir" },
            vi: { word: "con chim", def: "Bay bằng cánh.", sentence: "Con chim hót.", phonetic: "kon chim" },
            tl: { word: "ibon", def: "Lumilipad gamit ang pakpak.", sentence: "Ang ibon ay umaawit.", phonetic: "ee-bon" },
            pt: { word: "pássaro", def: "Voa com asas.", sentence: "O pássaro canta.", phonetic: "PAH-sah-roo" },
            fr: { word: "oiseau", def: "Vole avec des ailes.", sentence: "L'oiseau chante.", phonetic: "wah-zo" },
            hi: { word: "पक्षी", def: "पंखों से उड़ता है।", sentence: "पक्षी गा रहा है।", phonetic: "pak-shee" }
        },

        hope: {
            es: { word: "esperanza", def: "Deseo de algo bueno.", sentence: "Tengo esperanza.", phonetic: "es-peh-RAHN-sah" },
            zh: { word: "希望", def: "希望好事发生。", sentence: "我有希望。", phonetic: "xī wàng" },
            ar: { word: "أمل", def: "الرغبة في الخير.", sentence: "لدي أمل.", phonetic: "amal" },
            vi: { word: "hy vọng", def: "Mong muốn điều tốt.", sentence: "Tôi có hy vọng.", phonetic: "hee vawng" },
            tl: { word: "pag-asa", def: "Pagnanais ng maganda.", sentence: "Mayroon akong pag-asa.", phonetic: "pag-ah-sa" },
            pt: { word: "esperança", def: "Desejo de algo bom.", sentence: "Tenho esperança.", phonetic: "es-peh-RAHN-sah" },
            fr: { word: "espoir", def: "Désir de bien.", sentence: "J'ai de l'espoir.", phonetic: "es-pwahr" },
            hi: { word: "आशा", def: "अच्छी चीज़ की इच्छा।", sentence: "मुझे आशा है।", phonetic: "aa-sha" }
        }

    };

    window.getTranslation = function(word, langCode) {
        const wordLower = word.toLowerCase();
        if (window.TRANSLATIONS && window.TRANSLATIONS[wordLower] && window.TRANSLATIONS[wordLower][langCode]) {
            return window.TRANSLATIONS[wordLower][langCode];
        }
        return null;
    };

    window.hasTranslation = function(word, langCode) {
        return window.getTranslation(word, langCode) !== null;
    };

    console.log('✓ Translation system loaded with', Object.keys(window.TRANSLATIONS).length, 'words in', Object.keys(window.SUPPORTED_LANGUAGES).length, 'languages');
})();
