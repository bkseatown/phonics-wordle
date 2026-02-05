// Home page enhancements: placement screener + recommended next steps.
(function () {
  const PLACEMENT_KEY = 'decode_placement_v1';
  const SETTINGS_KEY = 'decode_settings';

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('placement-modal');
  const summary = document.getElementById('placement-summary');

  const startBtn = document.getElementById('placement-start');
  const closeBtn = document.getElementById('placement-close');
  const calcBtn = document.getElementById('placement-calc');
  const clearBtn = document.getElementById('placement-clear');
  const result = document.getElementById('placement-result');
  const goWordQuest = document.getElementById('placement-go-word-quest');
  const openWordQuest = document.getElementById('placement-open-word-quest');

  const gradeSelect = document.getElementById('placement-grade');
  const skillEls = {
    letterSounds: document.getElementById('skill-letter-sounds'),
    cvc: document.getElementById('skill-cvc'),
    digraph: document.getElementById('skill-digraph'),
    blends: document.getElementById('skill-blends'),
    magicE: document.getElementById('skill-magic-e'),
    vowelTeam: document.getElementById('skill-vowel-team'),
    rControlled: document.getElementById('skill-r-controlled'),
    multisyllable: document.getElementById('skill-multisyllable')
  };

  if (!overlay || !modal || !summary || !startBtn || !calcBtn || !clearBtn || !result || !goWordQuest || !gradeSelect) {
    return;
  }

  const wordQuestStat = document.getElementById('progress-word-quest');
  const wordQuestDetail = document.getElementById('progress-word-quest-detail');
  const activityLogList = document.getElementById('progress-activity-log');
  const activityLogEmpty = document.getElementById('progress-activity-empty');

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function normalizeGradeBand(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (raw === 'k2' || raw.toLowerCase() === 'k-2') return 'K-2';
    if (raw === '35' || raw === '3-5') return '3-5';
    if (raw === '68' || raw === '6-8') return '6-8';
    if (raw === '912' || raw === '9-12') return '9-12';
    if (raw === '612' || raw === '6-12') return '6-8';
    return raw;
  }

  function gradeBandToLook(band) {
    const normalized = normalizeGradeBand(band);
    if (normalized === 'K-2') return 'k2';
    if (normalized === '3-5') return '35';
    if (normalized === '6-8' || normalized === '9-12') return '612';
    return '';
  }

  function applyLookClass(look) {
    const body = document.body;
    if (!body) return;
    body.classList.remove('look-k2', 'look-35', 'look-612');
    body.classList.add(look === 'k2' ? 'look-k2' : look === '612' ? 'look-612' : 'look-35');
  }

  function syncProfileAndLook(gradeBand) {
    const normalized = normalizeGradeBand(gradeBand);
    if (!normalized) return;

    try {
      window.DECODE_PLATFORM?.setProfile?.({ gradeBand: normalized });
    } catch {}

    const look = gradeBandToLook(normalized);
    if (!look) return;

    const existing = safeParse(localStorage.getItem(SETTINGS_KEY) || '') || {};
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...existing, uiLook: look }));
    applyLookClass(look);
  }

  function getSkillState() {
    return {
      letterSounds: !!skillEls.letterSounds?.checked,
      cvc: !!skillEls.cvc?.checked,
      digraph: !!skillEls.digraph?.checked,
      blends: !!skillEls.blends?.checked,
      magicE: !!skillEls.magicE?.checked,
      vowelTeam: !!skillEls.vowelTeam?.checked,
      rControlled: !!skillEls.rControlled?.checked,
      multisyllable: !!skillEls.multisyllable?.checked
    };
  }

  function computeRecommendation(skills) {
    if (!skills.letterSounds) {
      return {
        focus: 'cvc',
        length: '3',
        headline: 'Start with sound-letter connections + 3-letter words.',
        notes: 'Tip: open Sound Lab in Word Quest (Tools ▾) and practice short vowels + consonants.'
      };
    }
    if (!skills.cvc) {
      return {
        focus: 'cvc',
        length: '3',
        headline: 'Start with CVC short vowels.',
        notes: 'Keep words short and repeat patterns daily.'
      };
    }
    if (!skills.digraph) {
      return {
        focus: 'digraph',
        length: '4',
        headline: 'Next focus: digraphs (sh/ch/th).',
        notes: 'Practice the digraph sound, then read words with that pattern.'
      };
    }
    if (!skills.blends) {
      return {
        focus: 'ccvc',
        length: '4',
        headline: 'Next focus: blends (st/bl/cr).',
        notes: 'Start with initial blends (CCVC), then move to final blends (CVCC).'
      };
    }
    if (!skills.magicE) {
      return {
        focus: 'cvce',
        length: '4',
        headline: 'Next focus: silent‑e (CVCe).',
        notes: 'Contrast pairs help: cap → cape, kit → kite.'
      };
    }
    if (!skills.vowelTeam) {
      return {
        focus: 'vowel_team',
        length: '5',
        headline: 'Next focus: vowel teams.',
        notes: 'Try one team per day (ai, ee, oa…).'
      };
    }
    if (!skills.rControlled) {
      return {
        focus: 'r_controlled',
        length: '5',
        headline: 'Next focus: r‑controlled vowels.',
        notes: 'Group by sound (ar / er / or) to reduce confusion.'
      };
    }
    if (!skills.multisyllable) {
      return {
        focus: 'multisyllable',
        length: 'any',
        headline: 'Next focus: multisyllable words.',
        notes: 'Teach “chunking”: syllables, prefixes/suffixes, and known patterns.'
      };
    }
    return {
      focus: 'multisyllable',
      length: 'any',
      headline: 'You can start with multisyllable practice.',
      notes: 'Mix in prefixes/suffixes and vocabulary work.'
    };
  }

  function wordQuestHref(focus, length) {
    const url = new URL('word-quest.html', window.location.href);
    if (focus) url.searchParams.set('focus', focus);
    if (length) url.searchParams.set('len', length);
    return url.toString();
  }

  function openModal() {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    modal.classList.remove('hidden');
    modal.dataset.open = 'true';
  }

  function closeModal() {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    modal.classList.add('hidden');
    delete modal.dataset.open;
  }

  function renderSummary(data) {
    if (!summary) return;

    if (!data || !data.recommendation) {
      summary.innerHTML = `
        <div class="home-mini-title">Current recommendation</div>
        <div class="muted">Not set yet. Run the screener to get a starting focus.</div>
      `;
      if (openWordQuest) openWordQuest.href = 'word-quest.html';
      return;
    }

    const rec = data.recommendation;
    const updated = data.updatedAt ? new Date(data.updatedAt) : null;
    const updatedText = updated && !Number.isNaN(updated.getTime())
      ? updated.toLocaleDateString()
      : '—';

    const focusLabel = rec.focus === 'vowel_team'
      ? 'Vowel Teams'
      : rec.focus === 'r_controlled'
        ? 'R-Controlled'
        : rec.focus === 'cvce'
          ? 'Silent‑e (CVCe)'
          : rec.focus === 'ccvc'
            ? 'Blends (CCVC)'
            : rec.focus === 'digraph'
              ? 'Digraphs'
              : rec.focus === 'cvc'
                ? 'CVC'
                : rec.focus === 'multisyllable'
                  ? 'Multisyllable'
                  : 'All Words';

    summary.innerHTML = `
      <div class="home-mini-title">Current recommendation</div>
      <div class="home-placement-line"><strong>${focusLabel}</strong> · length <strong>${rec.length}</strong> · updated <strong>${updatedText}</strong></div>
      <div class="muted">${rec.headline || ''}</div>
    `;

    const href = wordQuestHref(rec.focus, rec.length);
    goWordQuest.href = href;
    openWordQuest.href = href;
  }

  function store(data) {
    localStorage.setItem(PLACEMENT_KEY, JSON.stringify(data));
  }

  function load() {
    return safeParse(localStorage.getItem(PLACEMENT_KEY) || '');
  }

  function setFormFromData(data) {
    if (!data) return;
    if (gradeSelect && data.gradeBand !== undefined) {
      gradeSelect.value = normalizeGradeBand(data.gradeBand) || '';
    }
    const skills = data.skills || {};
    if (skillEls.letterSounds) skillEls.letterSounds.checked = !!skills.letterSounds;
    if (skillEls.cvc) skillEls.cvc.checked = !!skills.cvc;
    if (skillEls.digraph) skillEls.digraph.checked = !!skills.digraph;
    if (skillEls.blends) skillEls.blends.checked = !!skills.blends;
    if (skillEls.magicE) skillEls.magicE.checked = !!skills.magicE;
    if (skillEls.vowelTeam) skillEls.vowelTeam.checked = !!skills.vowelTeam;
    if (skillEls.rControlled) skillEls.rControlled.checked = !!skills.rControlled;
    if (skillEls.multisyllable) skillEls.multisyllable.checked = !!skills.multisyllable;
  }

  function showResult(rec) {
    result.classList.remove('hidden');
    result.innerHTML = `
      <div class="placement-result-title">Recommended Word Quest focus</div>
      <div class="placement-result-main"><strong>${rec.focus}</strong> · length <strong>${rec.length}</strong></div>
      <div class="muted" style="margin-top:6px;">${rec.headline || ''}</div>
      ${rec.notes ? `<div class="muted" style="margin-top:6px;">${rec.notes}</div>` : ''}
    `;

    const href = wordQuestHref(rec.focus, rec.length);
    goWordQuest.href = href;
    goWordQuest.classList.remove('hidden');
  }

  startBtn.addEventListener('click', () => {
    const existing = load();
    setFormFromData(existing);
    if (existing?.recommendation) {
      showResult(existing.recommendation);
    } else {
      result.classList.add('hidden');
      goWordQuest.classList.add('hidden');
    }
    openModal();
  });

  closeBtn?.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.dataset.open === 'true') {
      closeModal();
    }
  });

  calcBtn.addEventListener('click', () => {
    const gradeBand = normalizeGradeBand(gradeSelect.value || '');
    const skills = getSkillState();
    const recommendation = computeRecommendation(skills);
    const payload = {
      version: 1,
      gradeBand,
      skills,
      recommendation,
      updatedAt: new Date().toISOString()
    };
    store(payload);
    syncProfileAndLook(gradeBand);
    showResult(recommendation);
    renderSummary(payload);
  });

  clearBtn.addEventListener('click', () => {
    localStorage.removeItem(PLACEMENT_KEY);
    Object.values(skillEls).forEach((el) => {
      if (el) el.checked = false;
    });
    gradeSelect.value = '';
    result.classList.add('hidden');
    goWordQuest.classList.add('hidden');
    renderSummary(null);
  });

  // Initial render
  renderSummary(load());

  function renderProgress() {
    if (wordQuestStat && wordQuestDetail) {
      const data = safeParse(localStorage.getItem('decode_progress_data') || '');
      const attempted = Number(data?.wordsAttempted || 0);
      const correct = Number(data?.wordsCorrect || 0);
      const totalGuesses = Number(data?.totalGuesses || 0);

      if (!attempted) {
        wordQuestStat.textContent = 'No data yet';
        wordQuestDetail.textContent = 'Play a few rounds to see accuracy and recent words.';
      } else {
        const accuracy = Math.round((correct / attempted) * 100);
        const avgGuesses = attempted ? (totalGuesses / attempted) : 0;
        wordQuestStat.textContent = `${accuracy}% accuracy`;
        wordQuestDetail.textContent = `${correct}/${attempted} correct · avg guesses ${avgGuesses.toFixed(1)}`;
      }
    }

    if (activityLogList && activityLogEmpty) {
      const log = safeParse(localStorage.getItem('decode_activity_log_v1') || '');
      const entries = Array.isArray(log) ? log.slice(0, 8) : [];
      activityLogList.innerHTML = '';
      activityLogEmpty.textContent = '';

      if (!entries.length) {
        activityLogEmpty.textContent = 'No recent activity yet.';
        return;
      }

      entries.forEach((entry) => {
        const when = entry?.ts ? new Date(entry.ts) : null;
        const whenText = when && !Number.isNaN(when.getTime())
          ? when.toLocaleDateString()
          : '';
        const label = entry?.label || entry?.activityLabel || entry?.activity || 'Activity';
        const event = entry?.event || entry?.action || entry?.message || 'Updated';
        const li = document.createElement('li');
        li.textContent = whenText ? `${label}: ${event} (${whenText})` : `${label}: ${event}`;
        activityLogList.appendChild(li);
      });
    }
  }

  renderProgress();
})();
