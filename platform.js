// Shared platform boot (runs on every page).
// Purpose: keep UI look + accessibility settings consistent across activities.
(function () {
  const SETTINGS_KEY = 'decode_settings';
  const PLACEMENT_KEY = 'decode_placement_v1';
  const PROFILE_KEY = 'decode_profile_v1';
  const UI_LOOK_CLASSES = ['look-k2', 'look-35', 'look-612'];
  const ACTIVITY_LOG_KEY = 'decode_activity_log_v1';

  const ACTIVITIES = [
    {
      id: 'home',
      href: 'index.html',
      navLabel: 'Home'
    },
    {
      id: 'word-quest',
      href: 'word-quest.html',
      navLabel: 'Word Quest'
    },
    {
      id: 'cloze',
      href: 'cloze.html',
      navLabel: 'Story Fill'
    },
    {
      id: 'comprehension',
      href: 'comprehension.html',
      navLabel: 'Read & Think'
    },
    {
      id: 'fluency',
      href: 'fluency.html',
      navLabel: 'Speed Sprint'
    },
    {
      id: 'madlibs',
      href: 'madlibs.html',
      navLabel: 'Silly Stories'
    },
    {
      id: 'writing',
      href: 'writing.html',
      navLabel: 'Write & Build'
    },
    {
      id: 'plan-it',
      href: 'plan-it.html',
      navLabel: 'Plan-It'
    }
  ];

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function normalizeLook(value) {
    const raw = String(value || '35');
    if (raw === 'k2') return 'k2';
    if (raw === '612') return '612';
    return '35';
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

  function deriveLearnerProfile({ settings, profile, placement }) {
    const gradeBand = normalizeGradeBand(profile?.gradeBand || placement?.gradeBand || settings?.gradeBand || '');
    const fromBand = gradeBandToLook(gradeBand);
    const uiLook = normalizeLook(settings?.uiLook || profile?.uiLook || fromBand || '35');
    return {
      version: 1,
      gradeBand: gradeBand || '',
      uiLook
    };
  }

  const stored = safeParse(localStorage.getItem(SETTINGS_KEY) || '');
  const storedPlacement = safeParse(localStorage.getItem(PLACEMENT_KEY) || '');
  const storedProfile = safeParse(localStorage.getItem(PROFILE_KEY) || '');
  const derivedProfile = deriveLearnerProfile({ settings: stored, profile: storedProfile, placement: storedPlacement });

  const look = normalizeLook(stored && stored.uiLook ? stored.uiLook : derivedProfile.uiLook);

  const body = document.body;
  if (!body) return;

  body.classList.add('force-light');
  document.documentElement.style.colorScheme = 'light';

  // Accessibility toggles (safe on pages that don't use them).
  body.classList.toggle('calm-mode', !!(stored && stored.calmMode));
  body.classList.toggle('large-text', !!(stored && stored.largeText));
  body.classList.toggle('hide-ipa', stored ? stored.showIPA === false : false);
  body.classList.toggle('hide-examples', stored ? stored.showExamples === false : false);
  body.classList.toggle('hide-mouth-cues', stored ? stored.showMouthCues === false : false);

  UI_LOOK_CLASSES.forEach((cls) => body.classList.remove(cls));
  body.classList.add(look === 'k2' ? 'look-k2' : look === '612' ? 'look-612' : 'look-35');

  // Lightweight local-only event log (used by Home progress preview).
  const platform = (window.DECODE_PLATFORM = window.DECODE_PLATFORM || {});
  platform.activities = platform.activities || ACTIVITIES;

  function readJson(key, fallback) {
    const parsed = safeParse(localStorage.getItem(key) || '');
    return parsed === null || parsed === undefined ? fallback : parsed;
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function appendLocalArray(key, item, limit = 120) {
    const existing = readJson(key, []);
    const arr = Array.isArray(existing) ? existing : [];
    arr.unshift(item);
    if (arr.length > limit) arr.length = limit;
    writeJson(key, arr);
    return arr;
  }

  platform.readJson = platform.readJson || readJson;
  platform.writeJson = platform.writeJson || writeJson;
  platform.appendLocalArray = platform.appendLocalArray || appendLocalArray;

  platform.getProfile = platform.getProfile || function getProfile() {
    const settings = safeParse(localStorage.getItem(SETTINGS_KEY) || '');
    const placement = safeParse(localStorage.getItem(PLACEMENT_KEY) || '');
    const profile = safeParse(localStorage.getItem(PROFILE_KEY) || '');
    return deriveLearnerProfile({ settings, profile, placement });
  };

  platform.setProfile = platform.setProfile || function setProfile(updates) {
    const existing = safeParse(localStorage.getItem(PROFILE_KEY) || '') || {};
    const merged = {
      ...existing,
      ...updates,
      updatedAt: Date.now(),
      version: 1
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
    return merged;
  };

  platform.logActivity = platform.logActivity || function logActivity(entry) {
    try {
      const record = {
        ts: Date.now(),
        ...entry
      };
      appendLocalArray(ACTIVITY_LOG_KEY, record, 140);
      return record;
    } catch {
      return null;
    }
  };

  function getCurrentPageFile() {
    const raw = (window.location && window.location.pathname) ? window.location.pathname : '';
    const last = raw.split('/').filter(Boolean).pop();
    return (last || 'index.html').toLowerCase();
  }

  function getCurrentActivityId() {
    const currentFile = getCurrentPageFile();
    const match = ACTIVITIES.find((a) => (a.href || '').toLowerCase() === currentFile);
    return match ? match.id : '';
  }

  function renderPrimaryNav() {
    const navs = Array.from(document.querySelectorAll('nav.header-actions'));
    if (!navs.length) return;
    const currentFile = getCurrentPageFile();

    navs.forEach((nav) => {
      nav.innerHTML = '';
      ACTIVITIES.forEach((activity) => {
        const link = document.createElement('a');
        link.className = 'link-btn';
        link.href = activity.href;
        link.textContent = activity.navLabel;
        if (activity.href.toLowerCase() === currentFile) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
        nav.appendChild(link);
      });
    });
  }

  renderPrimaryNav();

  // Optional teacher mini-lesson links (kept minimal + collapsed).
  const LESSON_KEY = 'decode_teacher_lessons_v1';
  const activityId = getCurrentActivityId();
  if (activityId && activityId !== 'home' && activityId !== 'word-quest' && activityId !== 'plan-it') {
    const main = document.querySelector('main');
    if (main) {
      const readLessonMap = () => {
        const parsed = safeParse(localStorage.getItem(LESSON_KEY) || '');
        return parsed && typeof parsed === 'object' ? parsed : {};
      };
      const saveLessonMap = (map) => {
        localStorage.setItem(LESSON_KEY, JSON.stringify(map));
      };
      const getLessonUrl = () => {
        const map = readLessonMap();
        return (map[activityId] || '').toString().trim();
      };
      const setLessonUrl = (url) => {
        const map = readLessonMap();
        const cleaned = (url || '').toString().trim();
        if (cleaned) map[activityId] = cleaned;
        else delete map[activityId];
        saveLessonMap(map);
      };

      let lessonCard = document.getElementById('activity-lesson-card');
      if (!lessonCard) {
        lessonCard = document.createElement('div');
        lessonCard.id = 'activity-lesson-card';
        lessonCard.className = 'activity-lesson hidden';
        main.appendChild(lessonCard);
      }

      let teacherTools = document.getElementById('activity-teacher-tools');
      if (!teacherTools) {
        teacherTools = document.createElement('details');
        teacherTools.id = 'activity-teacher-tools';
        teacherTools.className = 'activity-teacher-tools';
        teacherTools.innerHTML = `
          <summary>Teacher tools</summary>
          <div class="activity-teacher-body">
            <label for="activity-lesson-url"><strong>Mini-lesson video link</strong></label>
            <div class="activity-teacher-row">
              <input id="activity-lesson-url" type="url" placeholder="Paste a YouTube link or a teacher video link" />
              <button id="activity-lesson-open" type="button" class="secondary-btn">Open</button>
            </div>
            <div class="muted">Tip: use a “share” link you trust. This app does not download videos.</div>
          </div>
        `;
        main.appendChild(teacherTools);
      }

      const renderLesson = () => {
        const url = getLessonUrl();
        const input = document.getElementById('activity-lesson-url');
        const openBtn = document.getElementById('activity-lesson-open');
        if (input) input.value = url;
        if (openBtn) openBtn.disabled = !url;

        if (!url) {
          lessonCard.classList.add('hidden');
          lessonCard.innerHTML = '';
          return;
        }

        lessonCard.classList.remove('hidden');
        lessonCard.innerHTML = `
          <div class="activity-lesson-title">Mini-lesson</div>
          <div class="activity-lesson-copy">Watch a short explanation before you start (opens a new tab).</div>
          <button id="activity-lesson-watch" type="button" class="secondary-btn">Watch</button>
        `;
        lessonCard.querySelector('#activity-lesson-watch')?.addEventListener('click', () => {
          window.open(url, '_blank', 'noopener,noreferrer');
        });
      };

      const input = document.getElementById('activity-lesson-url');
      input?.addEventListener('change', () => {
        setLessonUrl(input.value);
        renderLesson();
      });

      const openBtn = document.getElementById('activity-lesson-open');
      openBtn?.addEventListener('click', () => {
        const url = getLessonUrl();
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
      });

      renderLesson();
    }
  }
})();
