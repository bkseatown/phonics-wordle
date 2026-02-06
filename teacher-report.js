// Teacher report: printable growth summary + standards mastery heatmap.
(function () {
  const ACTIVITY_LABELS = {
    'word-quest': 'Word Quest',
    cloze: 'Story Fill',
    comprehension: 'Read & Think',
    fluency: 'Speed Sprint',
    madlibs: 'Silly Stories',
    writing: 'Write & Build',
    'plan-it': 'Plan-It'
  };

  const ACTIVITY_ORDER = [
    'word-quest',
    'cloze',
    'comprehension',
    'fluency',
    'madlibs',
    'writing',
    'plan-it'
  ];

  const ACTIVITY_STANDARDS = {
    'word-quest': ['RF.2.3', 'RF.3.3'],
    cloze: ['L.3.4', 'RL.3.1'],
    comprehension: ['RL.3.1', 'RI.3.1'],
    fluency: ['RF.3.4'],
    madlibs: ['L.3.1', 'L.3.3'],
    writing: ['W.3.2', 'W.3.4'],
    'plan-it': ['SL.3.1', 'W.3.8']
  };

  const STANDARD_META = {
    'RF.2.3': { domain: 'Foundational Skills', label: 'Phonics and word analysis' },
    'RF.3.3': { domain: 'Foundational Skills', label: 'Decode multisyllable words' },
    'RF.3.4': { domain: 'Foundational Skills', label: 'Read with fluency and accuracy' },
    'L.3.1': { domain: 'Language', label: 'Grammar and usage' },
    'L.3.3': { domain: 'Language', label: 'Vocabulary and expression' },
    'L.3.4': { domain: 'Language', label: 'Determine meaning in context' },
    'RL.3.1': { domain: 'Reading Literature', label: 'Ask and answer questions' },
    'RI.3.1': { domain: 'Reading Informational', label: 'Use evidence from text' },
    'W.3.2': { domain: 'Writing', label: 'Informative/explanatory writing' },
    'W.3.4': { domain: 'Writing', label: 'Clear, coherent writing' },
    'W.3.8': { domain: 'Writing', label: 'Recall and organize information' },
    'SL.3.1': { domain: 'Speaking & Listening', label: 'Collaborative discussion skills' }
  };

  const STANDARD_RECOMMENDATIONS = {
    'RF.2.3': {
      focus: 'Word Quest (CVC, digraphs, blends)',
      notes: 'Use short decoding sets and immediate error correction.'
    },
    'RF.3.3': {
      focus: 'Word Quest (multisyllable + affixes)',
      notes: 'Chunk words by syllables, prefixes, and suffixes.'
    },
    'RF.3.4': {
      focus: 'Speed Sprint',
      notes: 'Run 1-minute repeated readings with a reachable WCPM goal.'
    },
    'L.3.1': {
      focus: 'Silly Stories',
      notes: 'Target parts of speech and sentence-level revisions.'
    },
    'L.3.3': {
      focus: 'Silly Stories + Write & Build',
      notes: 'Practice stronger word choices and sentence variety.'
    },
    'L.3.4': {
      focus: 'Story Fill',
      notes: 'Use context clues and discuss why each choice fits.'
    },
    'RL.3.1': {
      focus: 'Read & Think',
      notes: 'Require evidence-based answers from the passage.'
    },
    'RI.3.1': {
      focus: 'Read & Think (informational passages)',
      notes: 'Highlight keywords and cite text evidence.'
    },
    'W.3.2': {
      focus: 'Write & Build',
      notes: 'Use plan-to-draft frames with explicit detail sentences.'
    },
    'W.3.4': {
      focus: 'Write & Build revisions',
      notes: 'Revise for sentence clarity and organization.'
    },
    'W.3.8': {
      focus: 'Plan-It',
      notes: 'Practice sequencing and reflecting on planning choices.'
    },
    'SL.3.1': {
      focus: 'Plan-It reflection routines',
      notes: 'Prompt verbal justification for each selected step.'
    }
  };

  const ACTIVITY_HREF = {
    'word-quest': 'word-quest.html',
    cloze: 'cloze.html',
    comprehension: 'comprehension.html',
    fluency: 'fluency.html',
    madlibs: 'madlibs.html',
    writing: 'writing.html',
    'plan-it': 'plan-it.html'
  };

  const FOCUS_LIBRARY = {
    'phonics-decoding': {
      label: 'Phonics & Decoding',
      specialistFit: 'SPED · EAL · SLP',
      summary: 'Explicit sound-symbol mapping and controlled transfer to text.',
      steps: [
        {
          phase: 'I do',
          activity: 'word-quest',
          move: 'Model decoding moves and corrective feedback with target patterns.'
        },
        {
          phase: 'We do',
          activity: 'cloze',
          move: 'Guide students to apply target words in sentence context.'
        },
        {
          phase: 'You do with support',
          activity: 'fluency',
          move: 'Practice connected text with line focus and immediate coaching.'
        }
      ],
      wordQuestFocusByBand: {
        'K-2': { focus: 'cvc', len: '3' },
        '3-5': { focus: 'ccvc', len: '4' },
        '6-8': { focus: 'multisyllable', len: 'any' },
        '9-12': { focus: 'multisyllable', len: 'any' }
      }
    },
    'fluency-prosody': {
      label: 'Fluency & Prosody',
      specialistFit: 'SPED · EAL · SLP',
      summary: 'Build automaticity, expression, and punctuation-aware reading.',
      steps: [
        {
          phase: 'I do',
          activity: 'fluency',
          move: 'Model rate, phrasing, and punctuation in short connected text.'
        },
        {
          phase: 'We do',
          activity: 'comprehension',
          move: 'Read together, annotate key evidence, and discuss meaning.'
        },
        {
          phase: 'You do with support',
          activity: 'writing',
          move: 'Use sentence stems to retell or summarize with teacher prompts.'
        }
      ],
      wordQuestFocusByBand: {
        'K-2': { focus: 'digraph', len: '3' },
        '3-5': { focus: 'r_controlled', len: '5' },
        '6-8': { focus: 'vowel_team', len: '5' },
        '9-12': { focus: 'multisyllable', len: 'any' }
      }
    },
    'comprehension-evidence': {
      label: 'Comprehension & Evidence',
      specialistFit: 'EAL · SPED · Literacy coach',
      summary: 'Move from surface reading to evidence-based responses.',
      steps: [
        {
          phase: 'I do',
          activity: 'comprehension',
          move: 'Model question unpacking and how to locate evidence.'
        },
        {
          phase: 'We do',
          activity: 'cloze',
          move: 'Use context clues and justify answer choices together.'
        },
        {
          phase: 'You do with support',
          activity: 'writing',
          move: 'Write a short response citing evidence with scaffolded frames.'
        }
      ],
      wordQuestFocusByBand: {
        'K-2': { focus: 'cvc', len: '3' },
        '3-5': { focus: 'cvce', len: '4' },
        '6-8': { focus: 'vowel_team', len: '5' },
        '9-12': { focus: 'multisyllable', len: 'any' }
      }
    },
    'writing-language': {
      label: 'Writing & Language',
      specialistFit: 'SPED · EAL · Classroom',
      summary: 'Sentence quality, vocabulary precision, and paragraph coherence.',
      steps: [
        {
          phase: 'I do',
          activity: 'writing',
          move: 'Model a topic sentence and one expanded detail sentence.'
        },
        {
          phase: 'We do',
          activity: 'madlibs',
          move: 'Co-construct grammar and word choice in a guided playful task.'
        },
        {
          phase: 'You do with support',
          activity: 'comprehension',
          move: 'Respond to text prompts with sentence-level feedback.'
        }
      ],
      wordQuestFocusByBand: {
        'K-2': { focus: 'digraph', len: '3' },
        '3-5': { focus: 'vowel_team', len: '5' },
        '6-8': { focus: 'multisyllable', len: 'any' },
        '9-12': { focus: 'multisyllable', len: 'any' }
      }
    },
    'sel-executive': {
      label: 'SEL & Executive Function',
      specialistFit: 'Counseling · SEL · Learning support',
      summary: 'Self-management, planning stamina, and reflection routines.',
      steps: [
        {
          phase: 'I do',
          activity: 'plan-it',
          move: 'Model planning choices, timing, and regulation checkpoints.'
        },
        {
          phase: 'We do',
          activity: 'writing',
          move: 'Co-write a simple action plan using supportive language.'
        },
        {
          phase: 'You do with support',
          activity: 'comprehension',
          move: 'Self-monitor with evidence prompts and reflective check-ins.'
        }
      ],
      wordQuestFocusByBand: {
        'K-2': { focus: 'cvc', len: '3' },
        '3-5': { focus: 'ccvc', len: '4' },
        '6-8': { focus: 'multisyllable', len: 'any' },
        '9-12': { focus: 'multisyllable', len: 'any' }
      }
    }
  };

  const DOMAIN_ACTIVITY_PLAYBOOK = {
    decoding: [
      { activity: 'word-quest', move: 'Target pattern drills with immediate corrective feedback.' },
      { activity: 'cloze', move: 'Apply decoding patterns inside sentence context.' }
    ],
    fluency: [
      { activity: 'fluency', move: 'Use repeated readings with explicit pace and phrasing cues.' },
      { activity: 'comprehension', move: 'Read then answer with evidence to connect rate and meaning.' }
    ],
    comprehension: [
      { activity: 'comprehension', move: 'Practice text-dependent questions and evidence sentences.' },
      { activity: 'cloze', move: 'Use context clues and justify every blank choice.' }
    ],
    'written-language': [
      { activity: 'writing', move: 'Build sentence-to-paragraph structure with guided frames.' },
      { activity: 'madlibs', move: 'Rehearse grammar and vocabulary choices in short cycles.' }
    ],
    'executive-function': [
      { activity: 'plan-it', move: 'Model scheduling, timing, and reflection routines.' },
      { activity: 'writing', move: 'Convert plans into short actionable writing goals.' }
    ],
    general: [
      { activity: 'word-quest', move: 'Use a short decoding warm-up before core tasks.' },
      { activity: 'comprehension', move: 'Close with one text-evidence check for transfer.' }
    ]
  };

  const ROLE_PATHWAY_LIBRARY = {
    'learning-support': {
      label: 'Learning Support / SPED',
      fit: 'MTSS · SPED · Intervention',
      goal: 'Run a tight intervention loop with explicit modeling, guided transfer, and documented next steps.',
      focusId: 'phonics-decoding',
      steps: [
        { activity: 'word-quest', minutes: '8-10', move: 'Target the current placement focus and coach errors immediately.' },
        { activity: 'cloze', minutes: '6-8', move: 'Transfer the pattern to context and check understanding aloud.' },
        { activity: 'teacher-report', label: 'Teacher Report Snapshot', anchor: '#report-share-summary', minutes: '2-3', move: 'Capture a shareable summary for MTSS notes and family communication.' }
      ]
    },
    eal: {
      label: 'EAL',
      fit: 'Language development · EAL · Classroom support',
      goal: 'Blend decoding, vocabulary, and context cues with language-friendly routines.',
      focusId: 'comprehension-evidence',
      steps: [
        { activity: 'word-quest', minutes: '6-8', move: 'Preview key vocabulary and decode high-utility words.' },
        { activity: 'comprehension', minutes: '8-10', move: 'Use text evidence prompts and sentence stems for oral rehearsal.' },
        { activity: 'cloze', minutes: '4-6', move: 'Close with context clues and quick justification of choices.' }
      ]
    },
    slp: {
      label: 'Speech-Language (SLP)',
      fit: 'SLP · Fluency · Phonology',
      goal: 'Connect sound production, prosody, and language output in short high-repetition sets.',
      focusId: 'fluency-prosody',
      steps: [
        { activity: 'word-quest', minutes: '6-8', move: 'Warm up with targeted phoneme patterns and repeated production.' },
        { activity: 'fluency', minutes: '8-10', move: 'Practice paced oral reading with phrasing and punctuation cues.' },
        { activity: 'writing', minutes: '4-6', move: 'Use a short written output to reinforce expressive language transfer.' }
      ]
    },
    'sel-counselor': {
      label: 'SEL / School Counselor',
      fit: 'Counselor · SEL · Executive function',
      goal: 'Use literacy tasks to build regulation, planning stamina, and reflection language.',
      focusId: 'sel-executive',
      steps: [
        { activity: 'plan-it', minutes: '8-10', move: 'Model planning decisions and discuss regulation checkpoints.' },
        { activity: 'writing', minutes: '6-8', move: 'Translate plans into short action writing with supportive stems.' },
        { activity: 'comprehension', minutes: '4-6', move: 'End with evidence-based reflection on choices and outcomes.' }
      ]
    },
    leadership: {
      label: 'Leadership / Admin',
      fit: 'Principal · HoS · Instructional coaching',
      goal: 'Demonstrate instructional coherence, measurable impact, and repeatable daily implementation.',
      focusId: 'comprehension-evidence',
      steps: [
        { activity: 'teacher-report', label: 'Literacy Pulse + R/Y/G', anchor: '#report-pulse', minutes: '2-3', move: 'Open the pulse to show intervention priorities and support bands.' },
        { activity: 'plan-it', minutes: '5-7', move: 'Show cross-skill transfer into executive-function and self-management routines.' },
        { activity: 'word-quest', minutes: '5-7', move: 'Show focused decoding reps with immediate feedback and learner adjustment.' }
      ]
    }
  };

  const FRAMEWORK_ALIGNMENT = {
    decoding: [
      { framework: 'Science of Reading', alignment: 'Explicit phoneme-grapheme mapping, cumulative review, and decodable transfer.' },
      { framework: 'OG / Wilson / UFLI', alignment: 'Direct sound-symbol instruction, syllable routines, dictation, and corrective feedback.' },
      { framework: 'Words Their Way', alignment: 'Feature-based spelling pattern analysis and word sorting.' },
      { framework: 'Corrective Reading / Lexia-style', alignment: 'Mastery checks, scripted correction loops, and frequent retrieval.' },
      { framework: 'Common Core', alignment: 'RF.2.3, RF.3.3, RF.3.4 and language transfer standards.' },
      { framework: 'PYP / MYP / DP (SL/HL)', alignment: 'Structured word study and morphology linked to authentic reading and writing tasks.' },
      { framework: 'UK Curriculum', alignment: 'Phonics and word-reading progression across KS1-KS3 expectations.' },
      { framework: 'WIDA', alignment: 'Language forms, vocabulary, and discourse supports within literacy instruction.' }
    ],
    fluency: [
      { framework: 'Science of Reading', alignment: 'Build automaticity after decoding accuracy; rate must support meaning.' },
      { framework: 'OG / Wilson / UFLI', alignment: 'Repeated connected-text practice with phrasing and error correction.' },
      { framework: 'Corrective Reading / Lexia-style', alignment: 'Timed passages with immediate feedback and progress graphing.' },
      { framework: 'Common Core', alignment: 'RF.3.4 and grade-level oral reading fluency expectations.' },
      { framework: 'PYP / MYP / DP (SL/HL)', alignment: 'Fluency as access to comprehension, discussion, and literary analysis.' },
      { framework: 'UK Curriculum', alignment: 'Accuracy, automaticity, and prosody in curriculum-aligned reading.' },
      { framework: 'WIDA', alignment: 'Oral language scaffolds and pronunciation-aware rehearsal for multilingual learners.' }
    ],
    comprehension: [
      { framework: 'Science of Reading', alignment: 'Language comprehension integrated with decoding through evidence-based questioning.' },
      { framework: 'UFLI / Structured Literacy transfer', alignment: 'Apply taught patterns and vocabulary in connected text.' },
      { framework: 'Common Core', alignment: 'RL/RI text evidence, inferencing, and vocabulary-in-context standards.' },
      { framework: 'PYP / MYP / DP (SL/HL)', alignment: 'Inquiry, interpretation, and evidence-backed responses across text types.' },
      { framework: 'UK Curriculum', alignment: 'Retrieval, inference, and explanation in reading comprehension objectives.' },
      { framework: 'WIDA', alignment: 'Sentence stems and discourse scaffolds to express evidence clearly.' }
    ],
    'written-language': [
      { framework: 'Science of Reading and Writing', alignment: 'Reading-writing reciprocity: spelling, syntax, and composition reinforce each other.' },
      { framework: 'Words Their Way', alignment: 'Spelling-feature knowledge applied in sentence and paragraph writing.' },
      { framework: 'Step Up to Writing', alignment: 'Structured planning, color-coding, and clear paragraph organization.' },
      { framework: 'Common Core', alignment: 'W.3.2, W.3.4, W.3.8 and language conventions.' },
      { framework: 'PYP / MYP / DP (SL/HL)', alignment: 'Purpose-driven writing for audience, argument, and reflection.' },
      { framework: 'UK Curriculum', alignment: 'Composition, grammar, and transcription expectations by key stage.' },
      { framework: 'WIDA', alignment: 'Language objectives paired with content objectives for writing output.' }
    ],
    'executive-function': [
      { framework: 'MTSS / RTI', alignment: 'Tiered supports for planning, self-monitoring, and persistence.' },
      { framework: 'SEL Frameworks', alignment: 'Goal setting, self-management, and reflection routines embedded in literacy tasks.' },
      { framework: 'Common Core Speaking & Listening', alignment: 'Collaborative planning and discussion routines (SL standards).' },
      { framework: 'PYP / MYP', alignment: 'Approaches to learning: self-management and communication skills.' },
      { framework: 'UK / International pastoral systems', alignment: 'Metacognition, independence, and regulation outcomes.' },
      { framework: 'WIDA', alignment: 'Language-supported reflection and strategy talk for multilingual learners.' }
    ]
  };

  const BENCHMARK_EXPECTATIONS = {
    'K-2': {
      decoding: { boy: 0.45, moy: 0.62, eoy: 0.78 },
      fluency: { boy: 0.34, moy: 0.52, eoy: 0.68 },
      comprehension: { boy: 0.36, moy: 0.54, eoy: 0.7 },
      'written-language': { boy: 0.32, moy: 0.5, eoy: 0.66 },
      'executive-function': { boy: 0.42, moy: 0.58, eoy: 0.72 }
    },
    '3-5': {
      decoding: { boy: 0.52, moy: 0.68, eoy: 0.82 },
      fluency: { boy: 0.44, moy: 0.62, eoy: 0.78 },
      comprehension: { boy: 0.46, moy: 0.64, eoy: 0.8 },
      'written-language': { boy: 0.42, moy: 0.6, eoy: 0.76 },
      'executive-function': { boy: 0.48, moy: 0.64, eoy: 0.78 }
    },
    '6-8': {
      decoding: { boy: 0.58, moy: 0.72, eoy: 0.84 },
      fluency: { boy: 0.5, moy: 0.66, eoy: 0.8 },
      comprehension: { boy: 0.52, moy: 0.68, eoy: 0.82 },
      'written-language': { boy: 0.48, moy: 0.66, eoy: 0.8 },
      'executive-function': { boy: 0.5, moy: 0.66, eoy: 0.8 }
    },
    '9-12': {
      decoding: { boy: 0.6, moy: 0.74, eoy: 0.86 },
      fluency: { boy: 0.54, moy: 0.7, eoy: 0.82 },
      comprehension: { boy: 0.56, moy: 0.72, eoy: 0.84 },
      'written-language': { boy: 0.52, moy: 0.7, eoy: 0.84 },
      'executive-function': { boy: 0.52, moy: 0.68, eoy: 0.82 }
    }
  };

  const learnerNameEl = document.getElementById('report-learner-name');
  const generatedAtEl = document.getElementById('report-generated-at');
  const metricsEl = document.getElementById('report-metrics');
  const focusEl = document.getElementById('report-focus');
  const pulseEl = document.getElementById('report-pulse');
  const builderGradeEl = document.getElementById('report-builder-grade');
  const builderFocusEl = document.getElementById('report-builder-focus');
  const builderDurationEl = document.getElementById('report-builder-duration');
  const builderGenerateBtn = document.getElementById('report-builder-generate');
  const builderCopyBtn = document.getElementById('report-builder-copy');
  const builderOutputEl = document.getElementById('report-builder-output');
  const builderStatusEl = document.getElementById('report-builder-status');
  const heatmapEl = document.getElementById('report-heatmap');
  const emptyEl = document.getElementById('report-empty');
  const refreshBtn = document.getElementById('report-refresh');
  const loadSampleBtn = document.getElementById('report-load-sample');
  const exportPdfBtn = document.getElementById('report-export-pdf');
  const printBtn = document.getElementById('report-print');
  const shareSummaryEl = document.getElementById('report-share-summary');
  const shareCopyBtn = document.getElementById('report-share-copy');
  const shareStatusEl = document.getElementById('report-share-status');
  const outcomesEl = document.getElementById('report-outcomes');
  const crosswalkEl = document.getElementById('report-framework-crosswalk');
  const benchmarksEl = document.getElementById('report-benchmarks');
  const goalDomainEl = document.getElementById('report-goal-domain');
  const goalTierEl = document.getElementById('report-goal-tier');
  const goalHorizonEl = document.getElementById('report-goal-horizon');
  const goalGenerateBtn = document.getElementById('report-goal-generate');
  const goalCopyBtn = document.getElementById('report-goal-copy');
  const goalOutputEl = document.getElementById('report-goal-output');
  const goalStatusEl = document.getElementById('report-goal-status');
  const roleSelectEl = document.getElementById('report-role-select');
  const rolePathwayEl = document.getElementById('report-role-pathway');
  const roleCopyBtn = document.getElementById('report-role-copy');
  const roleStatusEl = document.getElementById('report-role-status');

  let latestBuilderText = '';
  let latestShareText = '';
  let latestGoalText = '';
  let latestRolePathwayText = '';
  let latestGoalContext = null;
  let latestRoleContext = null;

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function readJson(key, fallback) {
    const parsed = safeParse(localStorage.getItem(key) || '');
    return parsed === null || parsed === undefined ? fallback : parsed;
  }

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
  }

  function average(values) {
    if (!values.length) return null;
    const sum = values.reduce((total, value) => total + value, 0);
    return sum / values.length;
  }

  function parseRatioFromText(text) {
    const match = String(text || '').match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return null;
    const numerator = Number(match[1]);
    const denominator = Number(match[2]);
    if (!denominator) return null;
    return clamp(numerator / denominator);
  }

  function scoreEntry(entry) {
    const detail = entry?.detail || {};
    const event = String(entry?.event || '').toLowerCase();
    const activity = String(entry?.activity || '');

    if (typeof detail.correct === 'number' && typeof detail.total === 'number' && detail.total > 0) {
      return clamp(detail.correct / detail.total);
    }

    const ratioFromEvent = parseRatioFromText(event);
    if (ratioFromEvent !== null) return ratioFromEvent;

    if (typeof detail.won === 'boolean') {
      return detail.won ? 1 : 0.2;
    }

    if (typeof detail.issues === 'number') {
      return clamp(1 - (detail.issues * 0.2));
    }

    if (typeof detail.goal === 'number' && detail.goal > 0 && typeof detail.orf === 'number') {
      return clamp(detail.orf / detail.goal);
    }

    if (typeof detail.orf === 'number') {
      return clamp(detail.orf / 120);
    }

    if (typeof detail.wordCount === 'number') {
      return clamp(detail.wordCount / 60);
    }

    if (event.includes('goal met') || event.includes('quest complete') || event.includes('level complete')) {
      return 1;
    }

    if (event.includes('checked') || event.includes('generated') || event.includes('built paragraph')) {
      return 0.7;
    }

    if (activity === 'madlibs') return 0.7;
    if (activity === 'plan-it') return 0.65;

    return 0.6;
  }

  function getLogs() {
    const log = readJson('decode_activity_log_v1', []);
    return Array.isArray(log) ? log : [];
  }

  function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    return `${Math.round(value * 100)}%`;
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'learner';
  }

  function buildDateSlug(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getActivityHref(activityId, context = {}) {
    const file = ACTIVITY_HREF[activityId];
    if (!file) return '#';
    const url = new URL(file, window.location.href);
    if (activityId === 'word-quest' && context.wordQuestFocus) {
      url.searchParams.set('focus', context.wordQuestFocus);
      if (context.wordQuestLength) {
        url.searchParams.set('len', context.wordQuestLength);
      }
    }
    if (activityId === 'plan-it') {
      if (context.builderFocus) {
        url.searchParams.set('builderFocus', context.builderFocus);
      }
      if (context.builderGradeBand) {
        url.searchParams.set('builderGrade', context.builderGradeBand);
      }
      if (context.builderMinutes) {
        url.searchParams.set('builderMinutes', String(context.builderMinutes));
      }
    }
    return url.toString();
  }

  function normalizeGradeBand(value) {
    const band = String(value || '').trim();
    if (band === 'K-2' || band === '3-5' || band === '6-8' || band === '9-12') return band;
    return '3-5';
  }

  function activityDomain(activityId) {
    if (activityId === 'word-quest') return 'decoding';
    if (activityId === 'fluency') return 'fluency';
    if (activityId === 'comprehension' || activityId === 'cloze') return 'comprehension';
    if (activityId === 'writing' || activityId === 'madlibs') return 'written-language';
    if (activityId === 'plan-it') return 'executive-function';
    return 'general';
  }

  function domainLabel(domainId) {
    const map = {
      decoding: 'Decoding',
      fluency: 'Fluency & prosody',
      comprehension: 'Comprehension',
      'written-language': 'Written language',
      'executive-function': 'Planning & regulation',
      general: 'General literacy'
    };
    return map[domainId] || 'Literacy';
  }

  function currentSchoolWindow(date = new Date()) {
    const month = date.getMonth() + 1;
    if (month >= 8 && month <= 10) return 'boy';
    if (month >= 11 || month <= 2) return 'moy';
    return 'eoy';
  }

  function schoolWindowLabel(windowKey) {
    if (windowKey === 'boy') return 'Beginning of year';
    if (windowKey === 'moy') return 'Middle of year';
    return 'End of year';
  }

  function benchmarkStatus(current, target) {
    if (current === null || current === undefined || Number.isNaN(current)) {
      return { label: 'Need baseline', cls: 'bench-none' };
    }
    if (target === null || target === undefined || Number.isNaN(target)) {
      return { label: 'No target', cls: 'bench-none' };
    }
    const delta = current - target;
    if (delta >= 0.03) {
      return { label: 'On track', cls: 'bench-good' };
    }
    if (delta >= -0.06) {
      return { label: 'Watch', cls: 'bench-watch' };
    }
    return { label: 'Intensive', cls: 'bench-alert' };
  }

  function getActivityStats(logs) {
    const buckets = {};
    logs.forEach((entry) => {
      const activity = String(entry?.activity || '');
      if (!ACTIVITY_LABELS[activity]) return;
      if (!buckets[activity]) {
        buckets[activity] = {
          activity,
          label: ACTIVITY_LABELS[activity],
          scores: [],
          evidence: 0,
          lastTs: 0
        };
      }
      const score = scoreEntry(entry);
      if (typeof score === 'number' && !Number.isNaN(score)) {
        buckets[activity].scores.push(clamp(score));
      }
      buckets[activity].evidence += 1;
      buckets[activity].lastTs = Math.max(buckets[activity].lastTs, Number(entry?.ts || 0));
    });

    return Object.values(buckets).map((bucket) => ({
      activity: bucket.activity,
      label: bucket.label,
      avg: average(bucket.scores),
      evidence: bucket.evidence,
      lastTs: bucket.lastTs
    }));
  }

  function getDomainStats(logs) {
    const buckets = {};
    logs.forEach((entry) => {
      const activity = String(entry?.activity || '');
      const domain = activityDomain(activity);
      if (!buckets[domain]) {
        buckets[domain] = { domain, scores: [], evidence: 0 };
      }
      const score = scoreEntry(entry);
      if (typeof score === 'number' && !Number.isNaN(score)) {
        buckets[domain].scores.push(clamp(score));
      }
      buckets[domain].evidence += 1;
    });

    return Object.values(buckets).map((bucket) => ({
      domain: bucket.domain,
      label: domainLabel(bucket.domain),
      avg: average(bucket.scores),
      evidence: bucket.evidence
    }));
  }

  function mapPlacementFocusToBuilder(focus) {
    const value = String(focus || '').toLowerCase();
    if (!value) return 'comprehension-evidence';
    if (value === 'cvc' || value === 'digraph' || value === 'ccvc' || value === 'cvce' || value === 'vowel_team' || value === 'r_controlled' || value === 'multisyllable') {
      return 'phonics-decoding';
    }
    return 'comprehension-evidence';
  }

  function mapStandardToBuilder(standard) {
    const text = String(standard || '');
    if (text.startsWith('RF')) return text === 'RF.3.4' ? 'fluency-prosody' : 'phonics-decoding';
    if (text.startsWith('RL') || text.startsWith('RI')) return 'comprehension-evidence';
    if (text.startsWith('W') || text.startsWith('L')) return 'writing-language';
    if (text.startsWith('SL')) return 'sel-executive';
    return 'comprehension-evidence';
  }

  function recommendBuilderFocus(placementRec, weakestRow, domainStats) {
    if (placementRec?.focus) return mapPlacementFocusToBuilder(placementRec.focus);
    if (weakestRow?.standard) return mapStandardToBuilder(weakestRow.standard);

    const weakestDomain = domainStats
      .filter((row) => row.evidence > 0 && row.avg !== null)
      .sort((a, b) => (a.avg - b.avg))[0];

    if (!weakestDomain) return 'comprehension-evidence';
    if (weakestDomain.domain === 'decoding') return 'phonics-decoding';
    if (weakestDomain.domain === 'fluency') return 'fluency-prosody';
    if (weakestDomain.domain === 'written-language') return 'writing-language';
    if (weakestDomain.domain === 'executive-function') return 'sel-executive';
    return 'comprehension-evidence';
  }

  function getMinuteSplit(totalMinutes) {
    const n = Number(totalMinutes || 20);
    if (n <= 10) return [3, 4, 3];
    if (n <= 20) return [5, 8, 7];
    return [8, 12, 10];
  }

  function exportPdf() {
    const learner = window.DECODE_PLATFORM?.getActiveLearner?.();
    const today = new Date();
    const fileStem = `decode-report-${slugify(learner?.name || 'learner')}-${buildDateSlug(today)}`;
    const previousTitle = document.title;
    document.title = fileStem;
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 800);
  }

  function buildMetrics(logs) {
    const uniqueActivities = new Set(logs.map((entry) => entry?.activity).filter(Boolean));
    const now = Date.now();
    const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const recentSessions = logs.filter((entry) => Number(entry?.ts || 0) >= weekAgo).length;

    const wordQuest = readJson('decode_progress_data', {});
    const attempted = Number(wordQuest?.wordsAttempted || 0);
    const correct = Number(wordQuest?.wordsCorrect || 0);
    const wordQuestAccuracy = attempted ? clamp(correct / attempted) : null;

    const fluencyEntries = logs.filter((entry) => entry?.activity === 'fluency' && typeof entry?.detail?.orf === 'number');
    const fluencyAvg = average(fluencyEntries.map((entry) => clamp(Number(entry.detail.orf) / 120)));

    const comprehensionEntries = logs.filter((entry) => entry?.activity === 'comprehension');
    const compScores = comprehensionEntries.map((entry) => scoreEntry(entry));
    const compAvg = average(compScores);

    const latestEntry = logs[0];
    const latestDate = latestEntry?.ts ? new Date(latestEntry.ts).toLocaleDateString() : 'No activity yet';

    return [
      { label: 'Total Sessions', value: `${logs.length}` },
      { label: 'Activities Used', value: `${uniqueActivities.size}` },
      { label: 'Sessions (7 days)', value: `${recentSessions}` },
      { label: 'Word Quest Accuracy', value: formatPercent(wordQuestAccuracy) },
      { label: 'Fluency (est. mastery)', value: formatPercent(fluencyAvg) },
      { label: 'Comprehension (est. mastery)', value: formatPercent(compAvg) },
      { label: 'Most Recent Activity', value: latestDate }
    ];
  }

  function buildHeatmap(logs) {
    const standardSet = new Set(Object.keys(STANDARD_META));
    logs.forEach((entry) => {
      const activity = String(entry?.activity || '');
      const tagged = Array.isArray(entry?.standards) ? entry.standards : (ACTIVITY_STANDARDS[activity] || []);
      tagged.forEach((standard) => {
        if (standard) standardSet.add(String(standard));
      });
    });
    const standards = Array.from(standardSet);
    const matrix = {};
    standards.forEach((standard) => {
      matrix[standard] = {};
      ACTIVITY_ORDER.forEach((activity) => {
        matrix[standard][activity] = [];
      });
    });

    logs.forEach((entry) => {
      const activity = String(entry?.activity || '');
      const mappedStandards = Array.isArray(entry?.standards) && entry.standards.length
        ? entry.standards
        : ACTIVITY_STANDARDS[activity];
      if (!mappedStandards || !mappedStandards.length) return;
      const score = scoreEntry(entry);
      mappedStandards.forEach((standard) => {
        if (!matrix[standard]) return;
        matrix[standard][activity].push(score);
      });
    });

    return standards.map((standard) => {
      const perActivity = {};
      ACTIVITY_ORDER.forEach((activity) => {
        perActivity[activity] = average(matrix[standard][activity]);
      });
      const allScores = ACTIVITY_ORDER
        .flatMap((activity) => matrix[standard][activity]);
      return {
        standard,
        domain: STANDARD_META[standard]?.domain || 'Standards',
        label: STANDARD_META[standard]?.label || standard,
        perActivity,
        overall: average(allScores),
        evidence: allScores.length
      };
    });
  }

  function getPlacementRecommendation() {
    const placement = readJson('decode_placement_v1', null);
    return placement?.recommendation || null;
  }

  function getWeakestStandardRow(rows) {
    const eligible = rows.filter((row) => row.evidence >= 3 && row.overall !== null);
    if (!eligible.length) return null;
    return eligible.reduce((weakest, row) => {
      if (!weakest) return row;
      return row.overall < weakest.overall ? row : weakest;
    }, null);
  }

  function renderMetrics(logs) {
    if (!metricsEl) return [];
    const metrics = buildMetrics(logs);
    metricsEl.innerHTML = '';
    metrics.forEach((metric) => {
      const card = document.createElement('div');
      card.className = 'report-metric';
      card.innerHTML = `
        <div class="report-metric-label">${metric.label}</div>
        <div class="report-metric-value">${metric.value}</div>
      `;
      metricsEl.appendChild(card);
    });
    return metrics;
  }

  function renderFocus(placementRec, weakestRow) {
    if (!focusEl) return;
    focusEl.innerHTML = '';

    if (placementRec) {
      const title = document.createElement('div');
      title.className = 'report-focus-title';
      title.textContent = `${placementRec.focus} (length ${placementRec.length})`;
      const note = document.createElement('div');
      note.className = 'report-focus-note';
      note.textContent = placementRec.headline || placementRec.notes || 'Use placement-aligned practice in Word Quest.';
      focusEl.appendChild(title);
      focusEl.appendChild(note);
    }

    if (!weakestRow) {
      if (!placementRec) {
        const fallback = document.createElement('div');
        fallback.className = 'report-focus-note';
        fallback.textContent = 'Not enough evidence yet. Run at least three scored sessions for stronger recommendations.';
        focusEl.appendChild(fallback);
      }
      return;
    }

    const recommendation = STANDARD_RECOMMENDATIONS[weakestRow.standard];
    const weakHeader = document.createElement('div');
    weakHeader.className = 'report-focus-title';
    weakHeader.textContent = `Priority from data: ${weakestRow.standard} (${formatPercent(weakestRow.overall)})`;
    focusEl.appendChild(weakHeader);

    const weakBody = document.createElement('div');
    weakBody.className = 'report-focus-note';
    if (recommendation) {
      weakBody.textContent = `${recommendation.focus}. ${recommendation.notes}`;
    } else {
      weakBody.textContent = `${weakestRow.label}. Reinforce this standard with targeted practice and explicit feedback.`;
    }
    focusEl.appendChild(weakBody);
  }

  function getSupportProfile() {
    const settings = readJson('decode_settings', {}) || {};
    const enabled = [];
    if (settings.largeText) enabled.push('Large text');
    if (settings.lineFocus) enabled.push('Line focus');
    if (settings.reducedStimulation) enabled.push('Reduced stimulation');
    if (settings.focusMode) enabled.push('Focus mode');
    if (settings.calmMode) enabled.push('Calm mode');
    if (settings.fontProfile === 'opendyslexic') enabled.push('OpenDyslexic font profile');
    if (settings.fontProfile === 'atkinson') enabled.push('Atkinson font profile');
    return enabled;
  }

  function buildRecommendedActivities(gaps, placementRec, weakestRow) {
    const picks = [];
    const seen = new Set();

    function pushPick(activityId, rationale) {
      if (!activityId || seen.has(activityId)) return;
      seen.add(activityId);
      picks.push({
        activity: activityId,
        label: ACTIVITY_LABELS[activityId] || activityId,
        href: getActivityHref(activityId),
        rationale
      });
    }

    gaps.forEach((gap) => {
      const playbook = DOMAIN_ACTIVITY_PLAYBOOK[gap.domain] || DOMAIN_ACTIVITY_PLAYBOOK.general;
      playbook.forEach((step) => {
        pushPick(step.activity, `${gap.label}: ${step.move}`);
      });
    });

    if (placementRec?.focus) {
      pushPick('word-quest', `Placement focus ${placementRec.focus} for targeted decoding reps.`);
    }

    if (weakestRow?.standard) {
      const rec = STANDARD_RECOMMENDATIONS[weakestRow.standard];
      if (rec?.focus?.toLowerCase().includes('plan-it')) pushPick('plan-it', rec.notes || 'Reinforce planning and reflection routines.');
      if (rec?.focus?.toLowerCase().includes('write')) pushPick('writing', rec.notes || 'Reinforce writing structure with explicit models.');
      if (rec?.focus?.toLowerCase().includes('fluency')) pushPick('fluency', rec.notes || 'Reinforce rate, accuracy, and expression.');
      if (rec?.focus?.toLowerCase().includes('read')) pushPick('comprehension', rec.notes || 'Reinforce text-evidence responses.');
      if (rec?.focus?.toLowerCase().includes('word')) pushPick('word-quest', rec.notes || 'Reinforce phonics and decoding patterns.');
    }

    if (!picks.length) {
      const fallback = DOMAIN_ACTIVITY_PLAYBOOK.general;
      fallback.forEach((step) => pushPick(step.activity, step.move));
    }

    return picks.slice(0, 3);
  }

  function buildPulseModel(logs, placementRec, weakestRow) {
    const activityStats = getActivityStats(logs);
    const domainStats = getDomainStats(logs)
      .filter((row) => row.evidence > 0 && row.avg !== null)
      .sort((a, b) => b.avg - a.avg);

    const strengths = domainStats
      .filter((row) => row.evidence >= 2 && row.avg >= 0.74)
      .slice(0, 3);

    const gaps = [...domainStats]
      .filter((row) => row.evidence >= 2 && row.avg < 0.7)
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 3);

    const fallbackStrengths = strengths.length ? strengths : domainStats.slice(0, 3);
    const fallbackGaps = gaps.length ? gaps : [...domainStats].sort((a, b) => a.avg - b.avg).slice(0, 3);

    const priorities = [];
    if (placementRec?.headline) {
      priorities.push(`Placement priority: ${placementRec.headline}`);
    } else if (placementRec?.focus) {
      priorities.push(`Placement priority: ${placementRec.focus}`);
    }
    if (weakestRow?.standard) {
      const rec = STANDARD_RECOMMENDATIONS[weakestRow.standard];
      priorities.push(
        rec
          ? `Standards priority: ${weakestRow.standard} -> ${rec.focus}`
          : `Standards priority: ${weakestRow.standard} (${weakestRow.label})`
      );
    }
    if (fallbackGaps[0]) {
      priorities.push(`Domain priority: ${fallbackGaps[0].label} (${formatPercent(fallbackGaps[0].avg)})`);
    }

    const supports = getSupportProfile();
    const topPriority = priorities[0] || 'Build evidence with 3-5 scored sessions this week.';
    const domainPriority = fallbackGaps[0]?.label || 'Core literacy';
    const recommendedActivities = buildRecommendedActivities(fallbackGaps, placementRec, weakestRow);

    const traffic = {
      red: [],
      yellow: [],
      green: []
    };
    domainStats.forEach((row) => {
      const label = `${row.label} (${formatPercent(row.avg)})`;
      if (row.avg < 0.6) {
        traffic.red.push(label);
      } else if (row.avg < 0.8) {
        traffic.yellow.push(label);
      } else {
        traffic.green.push(label);
      }
    });

    const interventionSnapshot = activityStats
      .filter((row) => row.avg !== null)
      .sort((a, b) => (a.avg - b.avg))
      .slice(0, 5);

    return {
      strengths: fallbackStrengths,
      gaps: fallbackGaps,
      priorities: priorities.slice(0, 3),
      supports,
      topPriority,
      domainPriority,
      domainStats,
      activityStats,
      recommendedActivities,
      traffic,
      interventionSnapshot
    };
  }

  function renderPulse(pulse) {
    if (!pulseEl) return;

    const strengthItems = pulse.strengths.length
      ? pulse.strengths.map((row) => `<li>${escapeHtml(row.label)} · ${formatPercent(row.avg)} (${row.evidence} samples)</li>`).join('')
      : '<li>Need more scored sessions for a stable strengths pattern.</li>';

    const gapItems = pulse.gaps.length
      ? pulse.gaps.map((row) => `<li>${escapeHtml(row.label)} · ${formatPercent(row.avg)} (${row.evidence} samples)</li>`).join('')
      : '<li>No major domain gaps flagged yet. Continue progress monitoring.</li>';

    const priorityItems = pulse.priorities.length
      ? pulse.priorities.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
      : '<li>Run at least 3 scored sessions to generate priorities.</li>';

    const supportsText = pulse.supports.length
      ? pulse.supports.map(escapeHtml).join(' · ')
      : 'No accessibility supports enabled yet. Suggested starter set: Large text · Line focus · Reduced stimulation.';

    const activityItems = pulse.recommendedActivities.length
      ? pulse.recommendedActivities.map((item) => `
        <li>
          <a class="report-pulse-link" href="${item.href}">${escapeHtml(item.label)}</a>
          <div class="report-pulse-subnote">${escapeHtml(item.rationale)}</div>
        </li>
      `).join('')
      : '<li>Build 3-5 scored sessions first, then refresh for activity recommendations.</li>';

    const redItems = pulse.traffic.red.length ? pulse.traffic.red.map((item) => `<li>${escapeHtml(item)}</li>`).join('') : '<li>No domains in urgent status.</li>';
    const yellowItems = pulse.traffic.yellow.length ? pulse.traffic.yellow.map((item) => `<li>${escapeHtml(item)}</li>`).join('') : '<li>No domains in monitor status.</li>';
    const greenItems = pulse.traffic.green.length ? pulse.traffic.green.map((item) => `<li>${escapeHtml(item)}</li>`).join('') : '<li>No domains in maintain status yet.</li>';

    const snapshotItems = pulse.interventionSnapshot.length
      ? pulse.interventionSnapshot.map((row) => `<li>${escapeHtml(row.label)} · ${formatPercent(row.avg)} (${row.evidence} samples)</li>`).join('')
      : '<li>No scored activity snapshot yet.</li>';

    pulseEl.innerHTML = `
      <div class="report-pulse-grid">
        <article class="report-pulse-card">
          <h3>Strengths</h3>
          <ul>${strengthItems}</ul>
        </article>
        <article class="report-pulse-card">
          <h3>Highest-Leverage Gaps</h3>
          <ul>${gapItems}</ul>
        </article>
        <article class="report-pulse-card">
          <h3>4-Week Intervention Pathway</h3>
          <ul>
            <li>Week 1: I do heavy modeling in ${escapeHtml(pulse.domainPriority)}.</li>
            <li>Week 2: We do guided reps with immediate feedback and correction.</li>
            <li>Week 3: You do with support, plus brief fluency/comprehension checks.</li>
            <li>Week 4: Re-check progress and tighten next targets from data.</li>
          </ul>
          <div class="report-pulse-note">${escapeHtml(pulse.topPriority)}</div>
        </article>
        <article class="report-pulse-card">
          <h3>Priorities + Supports</h3>
          <ul>${priorityItems}</ul>
          <div class="report-pulse-note"><strong>Support profile:</strong> ${supportsText}</div>
        </article>
        <article class="report-pulse-card">
          <h3>Recommended Next Activities</h3>
          <ul>${activityItems}</ul>
        </article>
        <article class="report-pulse-card">
          <h3>Unified Intervention Snapshot</h3>
          <ul>${snapshotItems}</ul>
        </article>
        <article class="report-pulse-card">
          <h3>Red / Yellow / Green Workflow</h3>
          <div class="report-rag-grid">
            <section class="report-rag-lane report-rag-red">
              <div class="report-rag-title">Red (Immediate support)</div>
              <ul>${redItems}</ul>
            </section>
            <section class="report-rag-lane report-rag-yellow">
              <div class="report-rag-title">Yellow (Guided practice)</div>
              <ul>${yellowItems}</ul>
            </section>
            <section class="report-rag-lane report-rag-green">
              <div class="report-rag-title">Green (Maintain + extend)</div>
              <ul>${greenItems}</ul>
            </section>
          </div>
        </article>
      </div>
    `;
  }

  function buildOutcomeProofModel(logs, pulse, placementRec, weakestRow) {
    const scored = logs
      .map((entry) => ({
        score: scoreEntry(entry),
        ts: Number(entry?.ts || 0)
      }))
      .filter((row) => typeof row.score === 'number' && !Number.isNaN(row.score))
      .sort((a, b) => a.ts - b.ts);

    const recent = scored.slice(-8);
    const prior = scored.slice(Math.max(0, scored.length - 16), Math.max(0, scored.length - 8));
    const recentAvg = average(recent.map((row) => row.score));
    const priorAvg = average(prior.map((row) => row.score));
    const momentumDelta = recentAvg !== null && priorAvg !== null
      ? recentAvg - priorAvg
      : null;

    const activities = new Set(
      logs
        .map((entry) => String(entry?.activity || ''))
        .filter((activity) => !!ACTIVITY_LABELS[activity])
    );
    const domains = new Set(
      Array.from(activities).map((activity) => activityDomain(activity))
    );

    const evidenceCount = logs.length;
    const readiness = evidenceCount >= 12
      ? 'High'
      : evidenceCount >= 6
        ? 'Building'
        : 'Early';

    const redCount = pulse?.traffic?.red?.length || 0;
    const yellowCount = pulse?.traffic?.yellow?.length || 0;
    const greenCount = pulse?.traffic?.green?.length || 0;

    const focusId = recommendBuilderFocus(placementRec, weakestRow, getDomainStats(logs));
    const focusProfile = FOCUS_LIBRARY[focusId] || FOCUS_LIBRARY['comprehension-evidence'];

    const implementationLine = evidenceCount
      ? `${evidenceCount} logged sessions across ${activities.size || 1} activities and ${domains.size || 1} domains.`
      : 'No logged sessions yet. Start with a 10-minute cycle and refresh this report.';

    const momentumLine = momentumDelta === null
      ? 'Need at least 16 scored events for trend-to-trend momentum.'
      : `${momentumDelta >= 0 ? '+' : ''}${Math.round(momentumDelta * 100)} points vs prior window (${formatPercent(priorAvg)} -> ${formatPercent(recentAvg)}).`;

    const tierLine = `R/Y/G spread: ${redCount} red · ${yellowCount} yellow · ${greenCount} green.`;
    const alignmentLine = `${focusProfile.label} is currently the strongest team-fit focus (${focusProfile.specialistFit}).`;

    const narrative = [
      `Teacher action: ${pulse?.topPriority || 'Build a 4-week intervention loop from the top gap.'}`,
      `Learner response: ${momentumLine}`,
      `System value: ${tierLine} ${alignmentLine}`
    ];

    return {
      readiness,
      implementationLine,
      momentumLine,
      tierLine,
      alignmentLine,
      narrative
    };
  }

  function renderOutcomeProof(logs, pulse, placementRec, weakestRow) {
    if (!outcomesEl) return;
    const model = buildOutcomeProofModel(logs, pulse, placementRec, weakestRow);
    const narrativeItems = model.narrative.map((line) => `<li>${escapeHtml(line)}</li>`).join('');

    outcomesEl.innerHTML = `
      <div class="report-outcome-grid">
        <article class="report-outcome-card">
          <h3>Implementation Strength</h3>
          <div class="report-outcome-value">${escapeHtml(model.readiness)}</div>
          <div class="report-outcome-note">${escapeHtml(model.implementationLine)}</div>
        </article>
        <article class="report-outcome-card">
          <h3>Momentum Signal</h3>
          <div class="report-outcome-value">${escapeHtml(model.momentumLine.split('. ')[0] || model.momentumLine)}</div>
          <div class="report-outcome-note">${escapeHtml(model.momentumLine)}</div>
        </article>
        <article class="report-outcome-card">
          <h3>Tiered Support Readiness</h3>
          <div class="report-outcome-value">${escapeHtml(model.tierLine)}</div>
          <div class="report-outcome-note">${escapeHtml(model.alignmentLine)}</div>
        </article>
      </div>
      <div class="report-outcome-proof">
        <h3>Leadership Narrative (ready to share)</h3>
        <ul>${narrativeItems}</ul>
      </div>
    `;
  }

  function getPriorityDomainsForAlignment(pulse) {
    const rankedGaps = (pulse?.gaps || [])
      .map((row) => row.domain)
      .filter((domainId) => !!FRAMEWORK_ALIGNMENT[domainId]);
    const defaults = ['decoding', 'comprehension', 'fluency', 'written-language'];
    return Array.from(new Set([...rankedGaps, ...defaults])).slice(0, 4);
  }

  function renderFrameworkCrosswalk(pulse) {
    if (!crosswalkEl) return;
    const domains = getPriorityDomainsForAlignment(pulse);
    if (!domains.length) {
      crosswalkEl.innerHTML = '<div class="muted">Not enough data yet. Complete scored sessions to generate framework mapping.</div>';
      return;
    }

    const cards = domains.map((domainId) => {
      const rows = FRAMEWORK_ALIGNMENT[domainId] || [];
      const current = pulse?.domainStats?.find((row) => row.domain === domainId);
      const currentText = current?.avg !== null && current?.avg !== undefined
        ? `${formatPercent(current.avg)} (${current.evidence || 0} samples)`
        : 'Need more scored samples';
      const list = rows.map((entry) => `<li><strong>${escapeHtml(entry.framework)}:</strong> ${escapeHtml(entry.alignment)}</li>`).join('');
      return `
        <article class="report-crosswalk-card">
          <h3>${escapeHtml(domainLabel(domainId))}</h3>
          <div class="report-crosswalk-score"><strong>Current evidence:</strong> ${escapeHtml(currentText)}</div>
          <ul>${list}</ul>
        </article>
      `;
    }).join('');

    crosswalkEl.innerHTML = `
      <div class="report-crosswalk-grid">${cards}</div>
      <div class="report-crosswalk-note">Crosswalk is a planning support view that translates learner data into framework-aligned instructional moves.</div>
    `;
  }

  function renderBenchmarks(learner, pulse) {
    if (!benchmarksEl) return;
    const gradeBand = normalizeGradeBand(learner?.gradeBand || builderGradeEl?.value || '3-5');
    const benchmarkMap = BENCHMARK_EXPECTATIONS[gradeBand] || BENCHMARK_EXPECTATIONS['3-5'];
    const windowKey = currentSchoolWindow(new Date());
    const rows = Object.keys(benchmarkMap).map((domainId) => {
      const expected = benchmarkMap[domainId];
      const current = pulse?.domainStats?.find((row) => row.domain === domainId)?.avg ?? null;
      const status = benchmarkStatus(current, expected[windowKey]);
      return `
        <tr>
          <td><strong>${escapeHtml(domainLabel(domainId))}</strong></td>
          <td>${formatPercent(current)}</td>
          <td>${formatPercent(expected.boy)}</td>
          <td>${formatPercent(expected.moy)}</td>
          <td>${formatPercent(expected.eoy)}</td>
          <td><span class="report-bench-chip ${status.cls}">${escapeHtml(status.label)}</span></td>
        </tr>
      `;
    }).join('');

    benchmarksEl.innerHTML = `
      <div class="report-bench-meta">
        <div><strong>Grade band benchmark set:</strong> ${escapeHtml(gradeBand)}</div>
        <div><strong>Current checkpoint:</strong> ${escapeHtml(schoolWindowLabel(windowKey))}</div>
      </div>
      <div class="report-bench-table-wrap">
        <table class="report-bench-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Current</th>
              <th>BOY</th>
              <th>MOY</th>
              <th>EOY</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="report-bench-note">Benchmarks are planning norms on the platform mastery scale and should be calibrated with your school or network expectations.</div>
    `;
  }

  function resolveGoalDomain(pulse) {
    const selected = String(goalDomainEl?.value || 'auto');
    if (selected !== 'auto') return selected;
    if (pulse?.gaps?.[0]?.domain) return pulse.gaps[0].domain;
    const ranked = (pulse?.domainStats || [])
      .filter((row) => row.avg !== null && row.avg !== undefined)
      .sort((a, b) => a.avg - b.avg);
    return ranked[0]?.domain || 'decoding';
  }

  function computeGoalTarget({ baseline, benchmark, tier, horizon }) {
    const tierNearGain = tier === '1' ? 0.08 : tier === '2' ? 0.12 : 0.16;
    const tierLongGain = tier === '1' ? 0.14 : tier === '2' ? 0.2 : 0.24;
    const expected = benchmark || null;
    let target = expected;
    if (baseline !== null && baseline !== undefined && !Number.isNaN(baseline)) {
      const gain = horizon === 'near' ? tierNearGain : tierLongGain;
      target = target === null || target === undefined ? baseline + gain : Math.max(target, baseline + gain);
    }
    if (target === null || target === undefined || Number.isNaN(target)) return null;
    return clamp(target, 0.1, 0.98);
  }

  function tierPlanText(tier) {
    if (tier === '1') {
      return 'Tier 1: 4x/week targeted differentiation inside core literacy block, 10-15 minutes each cycle.';
    }
    if (tier === '3') {
      return 'Tier 3: Daily intensive individualized support, 25-35 minutes, with explicit modeling and immediate corrective feedback.';
    }
    return 'Tier 2: 4-5x/week small-group intervention, 15-25 minutes, tightly matched to the top gap.';
  }

  function progressRuleText(tier) {
    if (tier === '1') {
      return 'Decision rule: if growth is <5 points after 4 weeks, move to Tier 2 targeted support.';
    }
    if (tier === '3') {
      return 'Decision rule: if growth is <8 points after 4 weeks, redesign plan and increase specialist intensity.';
    }
    return 'Decision rule: if growth is <7 points after 4 weeks, increase session frequency or move to Tier 3.';
  }

  function renderGoalDraft(context = {}) {
    if (!goalOutputEl) return;
    const learner = context.learner || null;
    const pulse = context.pulse || null;
    const gradeBand = normalizeGradeBand(learner?.gradeBand || builderGradeEl?.value || '3-5');
    const domainId = resolveGoalDomain(pulse);
    const domainName = domainLabel(domainId);
    const tier = String(goalTierEl?.value || '2');
    const focusHorizon = String(goalHorizonEl?.value || 'near');
    const benchmarkSet = BENCHMARK_EXPECTATIONS[gradeBand]?.[domainId] || null;
    const windowKey = currentSchoolWindow(new Date());
    const baseline = pulse?.domainStats?.find((row) => row.domain === domainId)?.avg ?? null;
    const nearBenchmark = benchmarkSet
      ? (windowKey === 'boy' ? benchmarkSet.moy : benchmarkSet.eoy)
      : null;
    const longBenchmark = benchmarkSet?.eoy ?? null;
    const nearTarget = computeGoalTarget({ baseline, benchmark: nearBenchmark, tier, horizon: 'near' });
    const longTarget = computeGoalTarget({ baseline, benchmark: longBenchmark, tier, horizon: 'long' });
    const baselineText = baseline !== null && baseline !== undefined && !Number.isNaN(baseline)
      ? formatPercent(baseline)
      : 'Collect 3-5 scored sessions for baseline';
    const nearTargetText = nearTarget !== null ? formatPercent(nearTarget) : 'Set after baseline';
    const longTargetText = longTarget !== null ? formatPercent(longTarget) : 'Set after baseline';
    const learnerName = learner?.name || 'Learner';
    const frameworks = (FRAMEWORK_ALIGNMENT[domainId] || [])
      .slice(0, 4)
      .map((item) => item.framework)
      .join(' · ');
    const recommendedActivities = (pulse?.recommendedActivities || [])
      .map((item) => item.label)
      .slice(0, 3)
      .join(', ') || 'Word Quest, Read & Think, Write & Build';

    const nearGoal = `Near-term goal (4-6 weeks): ${learnerName} will improve ${domainName.toLowerCase()} from ${baselineText} to ${nearTargetText} on platform mastery indicators, using ${tier === '1' ? 'core differentiation' : tier === '2' ? 'targeted small-group intervention' : 'intensive individualized intervention'}.`;
    const longGoal = `Long-term goal (12-16 weeks): ${learnerName} will sustain ${longTargetText} or higher in ${domainName.toLowerCase()} with transfer across at least two activity types and consistent progress-monitoring evidence.`;
    const benchmarkLine = benchmarkSet
      ? `Benchmark anchors for ${gradeBand}: BOY ${formatPercent(benchmarkSet.boy)} · MOY ${formatPercent(benchmarkSet.moy)} · EOY ${formatPercent(benchmarkSet.eoy)}.`
      : `Benchmark anchors for ${gradeBand} not configured yet.`;
    const equityLine = 'Equity guardrail: keep cognitive demand high while adjusting scaffolds (language supports, chunking, accessibility settings, and explicit modeling).';
    const monitoringLine = `Progress monitoring: check twice weekly using scored tasks in ${recommendedActivities}.`;
    const tierLine = tierPlanText(tier);
    const decisionLine = progressRuleText(tier);

    latestGoalText = [
      `${learnerName} Tiered Goal Draft (${domainName})`,
      `Grade band: ${gradeBand} | Tier ${tier}`,
      nearGoal,
      longGoal,
      tierLine,
      monitoringLine,
      benchmarkLine,
      decisionLine,
      equityLine,
      `Framework alignment: ${frameworks}`
    ].join('\n');

    goalOutputEl.innerHTML = `
      <div class="report-goal-card">
        <h3>${escapeHtml(domainName)} · Tier ${escapeHtml(tier)}</h3>
        <p>${escapeHtml(nearGoal)}</p>
        <p>${escapeHtml(longGoal)}</p>
        <ul>
          <li>${escapeHtml(tierLine)}</li>
          <li>${escapeHtml(monitoringLine)}</li>
          <li>${escapeHtml(benchmarkLine)}</li>
          <li>${escapeHtml(decisionLine)}</li>
          <li>${escapeHtml(equityLine)}</li>
          <li><strong>Framework alignment:</strong> ${escapeHtml(frameworks)}</li>
        </ul>
        <div class="report-goal-note">Current focus horizon: ${focusHorizon === 'near' ? 'Near term (4-6 weeks)' : 'Long term (12-16 weeks)'}.</div>
      </div>
    `;
    if (goalStatusEl) goalStatusEl.textContent = '';
  }

  async function copyGoalDraft() {
    if (!latestGoalText) {
      if (goalStatusEl) goalStatusEl.textContent = 'Generate a goal draft first, then copy.';
      return;
    }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(latestGoalText);
      } else {
        throw new Error('clipboard-unavailable');
      }
      if (goalStatusEl) goalStatusEl.textContent = 'Goal draft copied.';
    } catch {
      if (goalStatusEl) goalStatusEl.textContent = 'Clipboard unavailable. Copy directly from the goal card.';
    }
  }

  function recommendRolePathwayId(pulse) {
    const topDomain = pulse?.gaps?.[0]?.domain || '';
    if (topDomain === 'fluency') return 'slp';
    if (topDomain === 'executive-function') return 'sel-counselor';
    if (topDomain === 'comprehension' || topDomain === 'written-language') return 'eal';
    return 'learning-support';
  }

  function getRoleStepHref(step, context = {}) {
    if (!step?.activity) return '#';
    if (step.activity === 'teacher-report') {
      return step.anchor || 'teacher-report.html';
    }
    return getActivityHref(step.activity, context);
  }

  function renderRolePathway(context = {}) {
    if (!rolePathwayEl || !roleSelectEl) return;
    const learner = context.learner || null;
    const pulse = context.pulse || null;
    const placementRec = context.placementRec || null;
    const weakestRow = context.weakestRow || null;
    const preferredRoleId = recommendRolePathwayId(pulse);

    if (!roleSelectEl.value || !ROLE_PATHWAY_LIBRARY[roleSelectEl.value]) {
      roleSelectEl.value = preferredRoleId;
    }

    const roleId = roleSelectEl.value || preferredRoleId;
    const pathway = ROLE_PATHWAY_LIBRARY[roleId] || ROLE_PATHWAY_LIBRARY['learning-support'];
    const gradeBand = normalizeGradeBand(learner?.gradeBand || builderGradeEl?.value || '3-5');
    const focusProfile = FOCUS_LIBRARY[pathway.focusId] || FOCUS_LIBRARY['comprehension-evidence'];
    const defaultWordQuest = focusProfile.wordQuestFocusByBand?.[gradeBand] || { focus: 'all', len: 'any' };
    const wordQuestFocus = placementRec?.focus || defaultWordQuest.focus;
    const wordQuestLength = placementRec?.length || defaultWordQuest.len;
    const urgentDomain = pulse?.traffic?.red?.[0] || 'No urgent domain currently flagged.';
    const topPriority = pulse?.topPriority || 'Run at least 3 scored sessions to produce stronger role-specific recommendations.';

    const baseContext = {
      wordQuestFocus,
      wordQuestLength,
      builderFocus: pathway.focusId,
      builderGradeBand: gradeBand,
      builderMinutes: 20
    };

    const stepLines = [];
    const stepCards = pathway.steps.map((step, index) => {
      const label = step.label || ACTIVITY_LABELS[step.activity] || step.activity;
      const href = getRoleStepHref(step, baseContext);
      const openLabel = step.activity === 'teacher-report'
        ? `Open ${label}`
        : `Open ${ACTIVITY_LABELS[step.activity] || label}`;
      stepLines.push(`${index + 1}) ${label} (${step.minutes} min)`);
      stepLines.push(`   ${step.move}`);
      stepLines.push(`   ${href}`);
      return `
        <article class="report-role-step">
          <div class="report-role-phase">${index + 1}. ${escapeHtml(label)} · ${escapeHtml(step.minutes)} min</div>
          <div class="report-role-move">${escapeHtml(step.move)}</div>
          <a class="secondary-btn report-role-link" href="${href}">${escapeHtml(openLabel)}</a>
        </article>
      `;
    }).join('');

    latestRolePathwayText = [
      `${pathway.label} Launch Pathway`,
      `Grade band: ${gradeBand}`,
      `Team fit: ${pathway.fit}`,
      `Goal: ${pathway.goal}`,
      `Top priority: ${topPriority}`,
      `Urgent lane: ${urgentDomain}`,
      '',
      ...stepLines
    ].join('\n');

    rolePathwayEl.innerHTML = `
      <div class="report-role-summary">
        <div><strong>${escapeHtml(pathway.label)}</strong> · ${escapeHtml(pathway.fit)}</div>
        <div>${escapeHtml(pathway.goal)}</div>
        <div><strong>Current top priority:</strong> ${escapeHtml(topPriority)}</div>
        <div><strong>Urgent lane from R/Y/G:</strong> ${escapeHtml(urgentDomain)}</div>
      </div>
      <div class="report-role-steps">${stepCards}</div>
      <div class="report-role-note">Suggested routine: keep this loop to 20 minutes daily and refresh the report weekly.</div>
    `;
    if (roleStatusEl) roleStatusEl.textContent = '';
  }

  async function copyRolePathway() {
    if (!latestRolePathwayText) {
      if (roleStatusEl) roleStatusEl.textContent = 'Refresh report first to generate a role pathway.';
      return;
    }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(latestRolePathwayText);
      } else {
        throw new Error('clipboard-unavailable');
      }
      if (roleStatusEl) roleStatusEl.textContent = 'Role pathway copied.';
    } catch {
      if (roleStatusEl) roleStatusEl.textContent = 'Clipboard unavailable. Copy directly from the pathway cards.';
    }
  }

  function renderBuilderFocusOptions() {
    if (!builderFocusEl) return;
    const entries = Object.entries(FOCUS_LIBRARY);
    builderFocusEl.innerHTML = entries
      .map(([id, profile]) => `<option value="${id}">${profile.label}</option>`)
      .join('');
  }

  function renderBuilderPlan(context = {}) {
    if (!builderOutputEl || !builderFocusEl || !builderDurationEl || !builderGradeEl) return;

    const focusId = String(builderFocusEl.value || 'comprehension-evidence');
    const duration = Number(builderDurationEl.value || 20);
    const gradeBand = normalizeGradeBand(builderGradeEl.value || context.gradeBand);
    const profile = FOCUS_LIBRARY[focusId] || FOCUS_LIBRARY['comprehension-evidence'];
    const split = getMinuteSplit(duration);
    const wordQuestDefault = profile.wordQuestFocusByBand?.[gradeBand] || { focus: 'all', len: 'any' };
    const lines = [
      `${profile.label} · ${duration} minutes · ${gradeBand}`,
      profile.summary,
      `Best fit: ${profile.specialistFit}`,
      ''
    ];

    const stepCards = profile.steps.map((step, index) => {
      const minutes = split[index] || split[split.length - 1];
      const href = getActivityHref(step.activity, {
        wordQuestFocus: wordQuestDefault.focus,
        wordQuestLength: wordQuestDefault.len,
        builderFocus: focusId,
        builderGradeBand: gradeBand,
        builderMinutes: duration
      });
      lines.push(`${index + 1}) ${step.phase} · ${minutes} min · ${ACTIVITY_LABELS[step.activity] || step.activity}`);
      lines.push(`   ${step.move}`);
      lines.push(`   ${href}`);
      return `
        <article class="report-builder-step">
          <div class="report-builder-phase">${index + 1}. ${escapeHtml(step.phase)} · ${minutes} min</div>
          <div class="report-builder-activity">${escapeHtml(ACTIVITY_LABELS[step.activity] || step.activity)}</div>
          <div class="report-builder-move">${escapeHtml(step.move)}</div>
          <a class="secondary-btn report-builder-link" href="${href}">Open ${escapeHtml(ACTIVITY_LABELS[step.activity] || step.activity)}</a>
        </article>
      `;
    }).join('');

    lines.push('');
    lines.push('Instructional spine: explicit model -> guided practice -> independent practice with support.');
    latestBuilderText = lines.join('\n');

    builderOutputEl.innerHTML = `
      <div class="report-builder-summary">
        <div><strong>${escapeHtml(profile.label)}</strong> · ${duration} minutes · ${escapeHtml(gradeBand)}</div>
        <div>${escapeHtml(profile.summary)}</div>
        <div><strong>Best fit:</strong> ${escapeHtml(profile.specialistFit)}</div>
      </div>
      <div class="report-builder-steps">${stepCards}</div>
      <div class="report-builder-note">Use this as a daily lesson spine: explicit model -> guided practice -> independent practice with support.</div>
    `;
    if (builderStatusEl) builderStatusEl.textContent = '';
  }

  async function copyBuilderPlan() {
    if (!latestBuilderText) {
      if (builderStatusEl) builderStatusEl.textContent = 'Build a lesson first, then copy.';
      return;
    }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(latestBuilderText);
      } else {
        throw new Error('clipboard-unavailable');
      }
      if (builderStatusEl) builderStatusEl.textContent = 'Lesson plan copied.';
    } catch {
      if (builderStatusEl) builderStatusEl.textContent = 'Clipboard unavailable. Copy directly from the lesson cards.';
    }
  }

  function masteryClass(score) {
    if (score === null || score === undefined) return 'heat-empty';
    if (score >= 0.85) return 'heat-high';
    if (score >= 0.65) return 'heat-mid';
    return 'heat-low';
  }

  function renderHeatmap(logs) {
    if (!heatmapEl || !emptyEl) return [];
    const rows = buildHeatmap(logs);

    const thead = heatmapEl.querySelector('thead');
    const tbody = heatmapEl.querySelector('tbody');
    if (!thead || !tbody) return rows;

    thead.innerHTML = '';
    tbody.innerHTML = '';

    const headRow = document.createElement('tr');
    const standardHead = document.createElement('th');
    standardHead.textContent = 'Standard';
    headRow.appendChild(standardHead);
    ACTIVITY_ORDER.forEach((activity) => {
      const th = document.createElement('th');
      th.textContent = ACTIVITY_LABELS[activity] || activity;
      headRow.appendChild(th);
    });
    const overallHead = document.createElement('th');
    overallHead.textContent = 'Overall';
    headRow.appendChild(overallHead);
    const evidenceHead = document.createElement('th');
    evidenceHead.textContent = 'Evidence';
    headRow.appendChild(evidenceHead);
    thead.appendChild(headRow);

    rows.forEach((row) => {
      const tr = document.createElement('tr');
      const standardCell = document.createElement('td');
      const standardStrong = document.createElement('strong');
      standardStrong.textContent = row.standard;
      const standardNote = document.createElement('div');
      standardNote.className = 'report-standard-note';
      standardNote.textContent = row.label;
      standardCell.appendChild(standardStrong);
      standardCell.appendChild(standardNote);
      tr.appendChild(standardCell);

      ACTIVITY_ORDER.forEach((activity) => {
        const score = row.perActivity[activity];
        const td = document.createElement('td');
        td.className = `heat-cell ${masteryClass(score)}`;
        td.textContent = formatPercent(score);
        tr.appendChild(td);
      });

      const overallCell = document.createElement('td');
      overallCell.className = `heat-cell ${masteryClass(row.overall)}`;
      overallCell.textContent = formatPercent(row.overall);
      tr.appendChild(overallCell);

      const evidenceCell = document.createElement('td');
      evidenceCell.textContent = `${row.evidence}`;
      tr.appendChild(evidenceCell);
      tbody.appendChild(tr);
    });

    const hasEvidence = rows.some((row) => row.evidence > 0);
    emptyEl.textContent = hasEvidence
      ? ''
      : 'No scored activity evidence yet. Complete a few activities, then refresh this report.';

    return rows;
  }

  function getMetricValue(metrics, label) {
    return metrics.find((metric) => metric.label === label)?.value || '—';
  }

  function renderShareSummary(learner, metrics, pulse, weakestRow, placementRec) {
    if (!shareSummaryEl) return;

    const strengths = pulse.strengths.length
      ? pulse.strengths.map((row) => `${row.label} ${formatPercent(row.avg)}`).join(', ')
      : 'Need more scored sessions to confirm strengths.';

    const gaps = pulse.gaps.length
      ? pulse.gaps.map((row) => `${row.label} ${formatPercent(row.avg)}`).join(', ')
      : 'No major domain gaps flagged yet.';

    const activities = pulse.recommendedActivities.length
      ? pulse.recommendedActivities.map((row) => row.label).join(', ')
      : 'Build additional activity evidence first.';

    const focusLine = weakestRow?.standard
      ? `Data priority standard: ${weakestRow.standard} (${formatPercent(weakestRow.overall)}).`
      : placementRec?.focus
        ? `Placement priority: ${placementRec.focus} (length ${placementRec.length}).`
        : 'Priority: collect more scored sessions this week.';

    const learnerLabel = learner?.name || 'Learner';
    const lines = [
      `${learnerLabel} Literacy Summary`,
      `Generated: ${new Date().toLocaleString()}`,
      '',
      `Sessions completed: ${getMetricValue(metrics, 'Total Sessions')} (${getMetricValue(metrics, 'Sessions (7 days)')} in the last 7 days).`,
      `Word Quest accuracy: ${getMetricValue(metrics, 'Word Quest Accuracy')}.`,
      `Fluency estimate: ${getMetricValue(metrics, 'Fluency (est. mastery)')}.`,
      `Comprehension estimate: ${getMetricValue(metrics, 'Comprehension (est. mastery)')}.`,
      '',
      `Strengths: ${strengths}`,
      `Top 3 gaps: ${gaps}`,
      `${focusLine}`,
      `Recommended next activities: ${activities}`,
      `Intervention priority: ${pulse.topPriority}`
    ];

    latestShareText = lines.join('\n');
    shareSummaryEl.textContent = latestShareText;
    if (shareStatusEl) shareStatusEl.textContent = '';
  }

  async function copyShareSummary() {
    if (!latestShareText) {
      if (shareStatusEl) shareStatusEl.textContent = 'Refresh report first to generate a summary.';
      return;
    }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(latestShareText);
      } else {
        throw new Error('clipboard-unavailable');
      }
      if (shareStatusEl) shareStatusEl.textContent = 'Summary copied.';
    } catch {
      if (shareStatusEl) shareStatusEl.textContent = 'Clipboard unavailable. Copy text directly from the summary box.';
    }
  }

  function loadSampleData() {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const sampleLog = [
      { activity: 'word-quest', label: 'Word Quest', event: '4/5', ts: now - (0.7 * day), detail: { correct: 4, total: 5 } },
      { activity: 'fluency', label: 'Speed Sprint', event: 'Goal met', ts: now - (0.6 * day), detail: { orf: 82, goal: 95 } },
      { activity: 'comprehension', label: 'Read & Think', event: '3/5', ts: now - (0.5 * day), detail: { correct: 3, total: 5 } },
      { activity: 'writing', label: 'Write & Build', event: 'Built paragraph', ts: now - (0.45 * day), detail: { wordCount: 52 } },
      { activity: 'plan-it', label: 'Plan-It', event: 'Checked (2 issues)', ts: now - (0.4 * day), detail: { issues: 2 } },
      { activity: 'cloze', label: 'Story Fill', event: '2/4', ts: now - (0.35 * day), detail: { correct: 2, total: 4 } },
      { activity: 'word-quest', label: 'Word Quest', event: '3/5', ts: now - (0.3 * day), detail: { correct: 3, total: 5 } },
      { activity: 'fluency', label: 'Speed Sprint', event: 'Checked', ts: now - (0.24 * day), detail: { orf: 76, goal: 95 } },
      { activity: 'comprehension', label: 'Read & Think', event: '4/5', ts: now - (0.18 * day), detail: { correct: 4, total: 5 } },
      { activity: 'madlibs', label: 'Silly Stories', event: 'Completed', ts: now - (0.14 * day), detail: { wordCount: 45 } },
      { activity: 'writing', label: 'Write & Build', event: 'Checked', ts: now - (0.1 * day), detail: { wordCount: 58 } },
      { activity: 'plan-it', label: 'Plan-It', event: 'Checked (no overlaps)', ts: now - (0.05 * day), detail: { issues: 0 } }
    ];

    localStorage.setItem('decode_activity_log_v1', JSON.stringify(sampleLog));
    localStorage.setItem('decode_progress_data', JSON.stringify({
      wordsAttempted: 140,
      wordsCorrect: 104
    }));
    localStorage.setItem('decode_placement_v1', JSON.stringify({
      recommendation: {
        focus: 'vowel_team',
        length: '5',
        headline: 'Strengthen vowel-team decoding in short daily cycles.',
        notes: 'Use targeted decoding reps before comprehension.'
      }
    }));
  }

  function refreshReport() {
    const learner = window.DECODE_PLATFORM?.getActiveLearner?.();
    if (learnerNameEl) learnerNameEl.textContent = learner?.name || 'Learner';
    if (generatedAtEl) generatedAtEl.textContent = new Date().toLocaleString();

    const logs = getLogs();
    const metrics = renderMetrics(logs);
    const rows = renderHeatmap(logs);
    const placementRec = getPlacementRecommendation();
    const weakest = getWeakestStandardRow(rows);
    renderFocus(placementRec, weakest);

    const pulse = buildPulseModel(logs, placementRec, weakest);
    renderPulse(pulse);
    renderOutcomeProof(logs, pulse, placementRec, weakest);
    renderFrameworkCrosswalk(pulse);
    renderBenchmarks(learner, pulse);
    renderShareSummary(learner, metrics, pulse, weakest, placementRec);

    if (builderGradeEl && learner?.gradeBand) {
      builderGradeEl.value = normalizeGradeBand(learner.gradeBand);
    }
    if (builderFocusEl) {
      const recommendedFocus = recommendBuilderFocus(placementRec, weakest, getDomainStats(logs));
      builderFocusEl.value = recommendedFocus;
    }
    renderBuilderPlan({ gradeBand: learner?.gradeBand });

    latestGoalContext = {
      learner,
      pulse,
      placementRec,
      weakestRow: weakest
    };
    renderGoalDraft(latestGoalContext);

    latestRoleContext = {
      learner,
      pulse,
      placementRec,
      weakestRow: weakest
    };
    if (roleSelectEl && !roleSelectEl.dataset.manualRole) {
      roleSelectEl.value = recommendRolePathwayId(pulse);
    }
    renderRolePathway(latestRoleContext);
  }

  renderBuilderFocusOptions();
  refreshBtn?.addEventListener('click', refreshReport);
  loadSampleBtn?.addEventListener('click', () => {
    loadSampleData();
    refreshReport();
    if (shareStatusEl) shareStatusEl.textContent = 'Sample data loaded.';
  });
  exportPdfBtn?.addEventListener('click', exportPdf);
  printBtn?.addEventListener('click', () => window.print());
  shareCopyBtn?.addEventListener('click', () => {
    copyShareSummary();
  });
  builderGenerateBtn?.addEventListener('click', () => renderBuilderPlan());
  builderCopyBtn?.addEventListener('click', () => {
    copyBuilderPlan();
  });
  goalGenerateBtn?.addEventListener('click', () => {
    if (latestGoalContext) {
      renderGoalDraft(latestGoalContext);
    }
  });
  goalCopyBtn?.addEventListener('click', () => {
    copyGoalDraft();
  });
  goalDomainEl?.addEventListener('change', () => {
    if (latestGoalContext) {
      renderGoalDraft(latestGoalContext);
    }
  });
  goalTierEl?.addEventListener('change', () => {
    if (latestGoalContext) {
      renderGoalDraft(latestGoalContext);
    }
  });
  goalHorizonEl?.addEventListener('change', () => {
    if (latestGoalContext) {
      renderGoalDraft(latestGoalContext);
    }
  });
  roleSelectEl?.addEventListener('change', () => {
    roleSelectEl.dataset.manualRole = 'true';
    if (latestRoleContext) {
      renderRolePathway(latestRoleContext);
    }
  });
  roleCopyBtn?.addEventListener('click', () => {
    copyRolePathway();
  });
  builderGradeEl?.addEventListener('change', () => renderBuilderPlan());
  builderFocusEl?.addEventListener('change', () => renderBuilderPlan());
  builderDurationEl?.addEventListener('change', () => renderBuilderPlan());

  refreshReport();
})();
