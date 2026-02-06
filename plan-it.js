const SCENARIOS = [
  {
    id: 'morning-mission',
    band: 'K-2',
    title: 'Morning Mission',
    description: 'It is 7:00 AM. You want to arrive at school feeling calm and ready by 8:30 AM.',
    tip: 'Tip: Put “must-do” tasks first, then leave a small buffer.',
    selFocus: 'Self-management: planning calmly',
    reflection: 'What could you do if one task takes longer than expected?',
    startTime: '7:00',
    endTime: '8:30',
    stepMinutes: 15,
    tasks: [
      { id: 'breakfast', label: 'Breakfast', durationMinutes: 15, earliest: '7:00', latestStart: '7:45' },
      { id: 'dress', label: 'Get dressed', durationMinutes: 15, earliest: '7:00', latestStart: '8:00' },
      { id: 'pack', label: 'Pack backpack', durationMinutes: 15, earliest: '7:15', latestStart: '8:00' },
      { id: 'read', label: 'Read 10–15 minutes', durationMinutes: 15, earliest: '7:15', latestStart: '8:15' },
      { id: 'leave', label: 'Leave for school', durationMinutes: 15, mustStart: '8:15' }
    ]
  },
  {
    id: 'after-school-rescue',
    band: '3-5',
    title: 'After-School Rescue',
    description: 'It is 3:00 PM. You want to finish your tasks and be ready for bed by 9:00 PM.',
    tip: 'Tip: Start with the fixed events (practice, dinner), then fit flexible tasks around them.',
    selFocus: 'Balance: responsibilities + self-care',
    reflection: 'Which task helps you feel most ready for tomorrow—and why?',
    startTime: '3:00',
    endTime: '9:00',
    stepMinutes: 30,
    tasks: [
      { id: 'snack', label: 'Snack', durationMinutes: 30, earliest: '3:00', latestStart: '4:30' },
      { id: 'homework', label: 'Homework', durationMinutes: 60, earliest: '3:00', latestStart: '6:00' },
      { id: 'reading', label: 'Reading', durationMinutes: 30, earliest: '3:30', latestStart: '8:00' },
      { id: 'practice', label: 'Practice', durationMinutes: 60, mustStart: '5:00' },
      { id: 'dinner', label: 'Dinner', durationMinutes: 30, mustStart: '6:30' },
      { id: 'shower', label: 'Shower', durationMinutes: 30, earliest: '7:00', latestStart: '8:00' }
    ]
  },
  {
    id: 'project-balance',
    band: '6-8',
    title: 'Project Balance',
    description: 'It is 4:00 PM. You have homework, a club practice, and you still need time to recharge before bed.',
    tip: 'Tip: Protect one short “reset” break so you don’t run out of focus.',
    selFocus: 'Executive function: focus + breaks',
    reflection: 'Where did you place your break—and how did it help your focus?',
    startTime: '4:00',
    endTime: '10:00',
    stepMinutes: 30,
    tasks: [
      { id: 'snack', label: 'Snack', durationMinutes: 30, earliest: '4:00', latestStart: '5:30' },
      { id: 'homework', label: 'Homework', durationMinutes: 60, earliest: '4:00', latestStart: '7:30' },
      { id: 'project', label: 'Group project', durationMinutes: 60, earliest: '4:30', latestStart: '8:00' },
      { id: 'practice', label: 'Club / practice', durationMinutes: 60, mustStart: '6:00' },
      { id: 'dinner', label: 'Dinner', durationMinutes: 30, mustStart: '7:30' },
      { id: 'reset', label: 'Reset break', durationMinutes: 30, earliest: '4:30', latestStart: '9:00' },
      { id: 'shower', label: 'Shower', durationMinutes: 30, earliest: '8:00', latestStart: '9:30' }
    ]
  },
  {
    id: 'work-study-wellness',
    band: '9-12',
    title: 'Work, Study, Wellness',
    description: 'It is 4:00 PM. You have a shift, then you need to study and still protect sleep by 11:00 PM.',
    tip: 'Tip: Schedule sleep first, then build the rest around it. “Late” work is harder.',
    selFocus: 'Boundaries: sleep + stress management',
    reflection: 'What boundary protects your well-being in this plan?',
    startTime: '4:00',
    endTime: '11:00',
    stepMinutes: 30,
    tasks: [
      { id: 'commute', label: 'Commute', durationMinutes: 30, mustStart: '4:30' },
      { id: 'shift', label: 'Work shift', durationMinutes: 180, mustStart: '5:00' },
      { id: 'dinner', label: 'Dinner', durationMinutes: 30, earliest: '8:00', latestStart: '9:30' },
      { id: 'study', label: 'Study block', durationMinutes: 60, earliest: '8:30', latestStart: '10:00' },
      { id: 'home', label: 'Home / family', durationMinutes: 30, earliest: '8:00', latestStart: '10:00' },
      { id: 'unwind', label: 'Unwind', durationMinutes: 30, earliest: '9:00', latestStart: '10:30' },
      { id: 'bed', label: 'Get ready for bed', durationMinutes: 30, mustStart: '10:30' }
    ]
  }
];

const scenarioSelect = document.getElementById('planit-scenario');
const scenarioTitle = document.getElementById('planit-scenario-title');
const scenarioText = document.getElementById('planit-scenario-text');
const scenarioTip = document.getElementById('planit-scenario-tip');
const quickGradeEl = document.getElementById('planit-quick-grade');
const quickFocusEl = document.getElementById('planit-quick-focus');
const quickMinutesEl = document.getElementById('planit-quick-minutes');
const quickGenerateBtn = document.getElementById('planit-quick-generate');
const quickOutputEl = document.getElementById('planit-quick-output');
const quickStatusEl = document.getElementById('planit-quick-status');
const taskList = document.getElementById('planit-task-list');
const resetBtn = document.getElementById('planit-reset');
const checkBtn = document.getElementById('planit-check');
const autoBtn = document.getElementById('planit-auto');
const feedbackEl = document.getElementById('planit-feedback');
const timelineEl = document.getElementById('planit-timeline');
const lessonEl = document.getElementById('planit-lesson');

const reflectionSection = document.getElementById('planit-reflection');
const reflectionPromptEl = document.getElementById('planit-reflection-prompt');
const reflectionInput = document.getElementById('planit-reflection-input');
const reflectionSaveBtn = document.getElementById('planit-reflection-save');
const reflectionSavedEl = document.getElementById('planit-reflection-saved');

const videoInput = document.getElementById('planit-video-url');
const videoOpenBtn = document.getElementById('planit-video-open');

const QUICK_ACTIVITY_META = {
  'word-quest': { label: 'Word Quest', href: 'word-quest.html' },
  cloze: { label: 'Story Fill', href: 'cloze.html' },
  comprehension: { label: 'Read & Think', href: 'comprehension.html' },
  fluency: { label: 'Speed Sprint', href: 'fluency.html' },
  madlibs: { label: 'Silly Stories', href: 'madlibs.html' },
  writing: { label: 'Write & Build', href: 'writing.html' },
  'plan-it': { label: 'Plan-It', href: 'plan-it.html' }
};

const QUICK_FOCUS_LIBRARY = {
  'phonics-decoding': {
    label: 'Phonics & Decoding',
    summary: 'Build accurate word reading with explicit sound-symbol routines.',
    steps: [
      { phase: 'I do', activity: 'word-quest', move: 'Model target sound patterns and corrective feedback.' },
      { phase: 'We do', activity: 'cloze', move: 'Apply patterns in short sentence context together.' },
      { phase: 'You do with support', activity: 'fluency', move: 'Transfer to connected text with teacher prompts.' }
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
    summary: 'Increase accuracy, pacing, and expression while preserving comprehension.',
    steps: [
      { phase: 'I do', activity: 'fluency', move: 'Demonstrate phrasing and punctuation-aware reading.' },
      { phase: 'We do', activity: 'comprehension', move: 'Read and discuss evidence from the same text.' },
      { phase: 'You do with support', activity: 'writing', move: 'Write a short text response with sentence frames.' }
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
    summary: 'Strengthen text-based responses with evidence and reasoning.',
    steps: [
      { phase: 'I do', activity: 'comprehension', move: 'Model question unpacking and evidence hunting.' },
      { phase: 'We do', activity: 'cloze', move: 'Justify each answer with context clues.' },
      { phase: 'You do with support', activity: 'writing', move: 'Write a short evidence statement with feedback.' }
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
    summary: 'Improve sentence quality, structure, and vocabulary choices.',
    steps: [
      { phase: 'I do', activity: 'writing', move: 'Model one clear topic sentence and one detail sentence.' },
      { phase: 'We do', activity: 'madlibs', move: 'Co-build grammar and vocabulary decisions.' },
      { phase: 'You do with support', activity: 'comprehension', move: 'Respond to prompts using sentence stems.' }
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
    summary: 'Develop planning, pacing, and self-regulation routines.',
    steps: [
      { phase: 'I do', activity: 'plan-it', move: 'Model task sequencing and timing decisions.' },
      { phase: 'We do', activity: 'writing', move: 'Co-write one realistic daily plan.' },
      { phase: 'You do with support', activity: 'comprehension', move: 'Reflect with evidence-based check-ins.' }
    ],
    wordQuestFocusByBand: {
      'K-2': { focus: 'cvc', len: '3' },
      '3-5': { focus: 'ccvc', len: '4' },
      '6-8': { focus: 'multisyllable', len: 'any' },
      '9-12': { focus: 'multisyllable', len: 'any' }
    }
  }
};

const STORAGE_KEY = 'planit_progress_v2';
const VIDEO_KEY = 'planit_video_links_v1';
const REFLECTION_KEY = 'planit_reflections_v1';

let currentScenario = SCENARIOS[0];
let selections = {}; // { taskId: "HH:MM" }
let activeTaskId = null;
let lastCheck = { missing: new Set(), overlaps: new Set() };

function applyLightTheme() {
  document.body.classList.add('force-light');
  document.documentElement.classList.add('force-light');
  document.documentElement.style.colorScheme = 'light';
}

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function normalizeGradeBand(value) {
  const band = String(value || '').trim();
  if (band === 'K-2' || band === '3-5' || band === '6-8' || band === '9-12') return band;
  return '3-5';
}

function getMinuteSplit(totalMinutes) {
  const n = Number(totalMinutes || 20);
  if (n <= 10) return [3, 4, 3];
  if (n <= 20) return [5, 8, 7];
  return [8, 12, 10];
}

function getQuickActivityHref(activityId, context = {}) {
  const meta = QUICK_ACTIVITY_META[activityId];
  if (!meta) return '#';
  const url = new URL(meta.href, window.location.href);
  if (activityId === 'word-quest' && context.wordQuestFocus) {
    url.searchParams.set('focus', context.wordQuestFocus);
    if (context.wordQuestLength) {
      url.searchParams.set('len', context.wordQuestLength);
    }
  }
  if (activityId === 'plan-it') {
    if (context.builderFocus) url.searchParams.set('builderFocus', context.builderFocus);
    if (context.builderGrade) url.searchParams.set('builderGrade', context.builderGrade);
    if (context.builderMinutes) url.searchParams.set('builderMinutes', String(context.builderMinutes));
  }
  return url.toString();
}

function toMinutes(timeStr) {
  const [h, m] = (timeStr || '0:0').split(':').map(n => Number(n));
  return (h * 60) + (m || 0);
}

function fromMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
}

function listSlots(scenario) {
  const start = toMinutes(scenario.startTime);
  const end = toMinutes(scenario.endTime);
  const step = scenario.stepMinutes;
  const slots = [];
  for (let t = start; t <= end; t += step) {
    slots.push(fromMinutes(t));
  }
  return slots;
}

function getTaskOptions(task, scenario) {
  const slots = listSlots(scenario);
  const start = toMinutes(scenario.startTime);
  const end = toMinutes(scenario.endTime);
  const dur = task.durationMinutes;

  if (task.mustStart) return [task.mustStart];

  const earliest = task.earliest ? toMinutes(task.earliest) : start;
  const latestStart = task.latestStart ? toMinutes(task.latestStart) : (end - dur);

  return slots.filter(label => {
    const t = toMinutes(label);
    if (t < earliest) return false;
    if (t > latestStart) return false;
    if (t + dur > end) return false;
    return true;
  });
}

function initializeFixedTasks() {
  (currentScenario.tasks || []).forEach(task => {
    if (task.mustStart) selections[task.id] = task.mustStart;
  });
}

function getDefaultGradeBand() {
  try {
    const profile = window.DECODE_PLATFORM?.getProfile?.();
    return profile?.gradeBand || '';
  } catch (e) {
    return '';
  }
}

function pickDefaultScenario() {
  const band = getDefaultGradeBand();
  if (band) {
    const found = SCENARIOS.find(s => s.band === band);
    if (found) return found;
  }
  return SCENARIOS.find(s => s.id === 'after-school-rescue') || SCENARIOS[0];
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return;
    const pick = SCENARIOS.find(s => s.id === parsed.scenarioId);
    if (pick) currentScenario = pick;
    selections = parsed.selections || {};
  } catch (e) {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    scenarioId: currentScenario.id,
    selections
  }));
}

function buildScenarioList() {
  const order = ['K-2', '3-5', '6-8', '9-12'];
  scenarioSelect.innerHTML = '';

  order.forEach(band => {
    const items = SCENARIOS.filter(s => s.band === band);
    if (!items.length) return;
    const group = document.createElement('optgroup');
    group.label = band;
    items.forEach(s => {
      const option = document.createElement('option');
      option.value = s.id;
      option.textContent = s.title;
      group.appendChild(option);
    });
    scenarioSelect.appendChild(group);
  });

  if (!Array.from(scenarioSelect.options).some(o => o.value === currentScenario.id)) {
    currentScenario = pickDefaultScenario();
  }
  scenarioSelect.value = currentScenario.id;
}

function renderScenario() {
  scenarioTitle.textContent = currentScenario.title;
  const sel = currentScenario.selFocus ? ` • ${currentScenario.selFocus}` : '';
  scenarioText.textContent = `${currentScenario.description}${sel}`;
  scenarioTip.textContent = currentScenario.tip || '';
}

function getIntervals() {
  const start = toMinutes(currentScenario.startTime);
  const end = toMinutes(currentScenario.endTime);

  const intervals = [];
  currentScenario.tasks.forEach(task => {
    const startLabel = selections[task.id];
    if (!startLabel) return;
    const t0 = toMinutes(startLabel);
    const t1 = t0 + task.durationMinutes;
    intervals.push({
      id: task.id,
      label: task.label,
      start: t0,
      end: t1,
      duration: task.durationMinutes,
      fixed: !!task.mustStart
    });
  });

  const problems = [];
  intervals.forEach(it => {
    if (it.start < start || it.end > end) problems.push(`${it.label} does not fit in the timeline.`);
  });

  return { intervals, problems };
}

function overlapsAny(interval, others) {
  return others.some(o => (interval.start < o.end && interval.end > o.start));
}

function isSlotAvailable(task, timeLabel) {
  if (!task || !timeLabel) return false;
  const options = getTaskOptions(task, currentScenario);
  if (!options.includes(timeLabel)) return false;

  const start = toMinutes(timeLabel);
  const interval = { start, end: start + task.durationMinutes };
  const { intervals } = getIntervals();
  const others = intervals.filter(i => i.id !== task.id);
  return !overlapsAny(interval, others);
}

function formatConstraint(task) {
  if (task.mustStart) return `Fixed: ${task.mustStart}`;
  const parts = [];
  if (task.earliest) parts.push(`Earliest ${task.earliest}`);
  if (task.latestStart) parts.push(`Latest ${task.latestStart}`);
  return parts.join(' • ');
}

function renderTasks() {
  taskList.innerHTML = '';
  currentScenario.tasks.forEach(task => {
    const options = getTaskOptions(task, currentScenario);
    const chosen = selections[task.id] && options.includes(selections[task.id]) ? selections[task.id] : '';

    const row = document.createElement('div');
    row.className = 'planit-task';
    row.dataset.task = task.id;
    row.classList.toggle('is-active', activeTaskId === task.id);
    row.classList.toggle('is-missing', lastCheck.missing.has(task.id));

    const constraint = formatConstraint(task);
    const meta = constraint ? `${task.durationMinutes} min • ${constraint}` : `${task.durationMinutes} min`;

    if (task.mustStart) {
      row.innerHTML = `
        <div class="planit-task-left">
          <div class="planit-task-name">${task.label}</div>
          <div class="planit-task-meta">${meta}</div>
        </div>
        <div class="planit-task-right">
          <div class="planit-fixed-pill" aria-label="Fixed start time">${task.mustStart}</div>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="planit-task-left">
          <div class="planit-task-name">${task.label}</div>
          <div class="planit-task-meta">${meta}</div>
        </div>
        <div class="planit-task-right">
          <label class="planit-task-label">
            Start
            <select data-task="${task.id}">
              <option value="">Choose…</option>
              ${options.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </label>
        </div>
      `;

      const select = row.querySelector('select');
      select.value = chosen;
      select.addEventListener('change', () => {
        if (select.value) {
          selections[task.id] = select.value;
        } else {
          delete selections[task.id];
        }
        activeTaskId = null;
        clearCheckFlags();
        saveState();
        renderTasks();
        renderTimeline();
        hideReflection();
      });
    }

    row.addEventListener('click', (event) => {
      if (event.target && (event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION' || event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (task.mustStart) return;
      activeTaskId = (activeTaskId === task.id) ? null : task.id;
      renderTasks();
      renderTimeline();
    });

    taskList.appendChild(row);
  });
}

function clearCheckFlags() {
  lastCheck = { missing: new Set(), overlaps: new Set() };
}

function renderTimeline() {
  const slots = listSlots(currentScenario);
  const start = toMinutes(currentScenario.startTime);
  const step = currentScenario.stepMinutes;
  const rows = Math.max(1, slots.length - 1);

  timelineEl.innerHTML = '';
  timelineEl.style.setProperty('--planit-rows', String(rows));

  const activeTask = activeTaskId ? currentScenario.tasks.find(t => t.id === activeTaskId) : null;
  const activeOptions = activeTask ? getTaskOptions(activeTask, currentScenario) : [];

  // row labels + slots
  slots.slice(0, -1).forEach((label, i) => {
    const row = document.createElement('div');
    row.className = 'planit-time-row';
    row.style.gridRow = `${i + 1}`;

    const time = document.createElement('div');
    time.className = 'planit-time-label';
    time.textContent = label;

    const slot = document.createElement('div');
    slot.className = 'planit-time-slot';
    slot.dataset.time = label;

    if (activeTask && activeOptions.includes(label)) {
      const canPlace = isSlotAvailable(activeTask, label);
      slot.classList.toggle('is-available', canPlace);
      slot.classList.toggle('is-unavailable', !canPlace);
    }

    slot.addEventListener('click', () => {
      if (!activeTask) return;
      if (!isSlotAvailable(activeTask, label)) return;
      selections[activeTask.id] = label;
      activeTaskId = null;
      clearCheckFlags();
      saveState();
      renderTasks();
      renderTimeline();
      hideReflection();
    });

    timelineEl.appendChild(time);
    timelineEl.appendChild(slot);
  });

  // task blocks
  const { intervals } = getIntervals();
  intervals.forEach((it, idx) => {
    const rowStart = Math.floor((it.start - start) / step) + 1;
    const rowSpan = Math.max(1, Math.ceil(it.duration / step));
    const block = document.createElement('button');
    block.type = 'button';
    block.className = 'planit-block';
    block.style.gridRow = `${rowStart} / span ${rowSpan}`;
    block.style.setProperty('--planit-color', String((idx % 6) + 1));
    block.classList.toggle('is-overlap', lastCheck.overlaps.has(it.id));
    block.classList.toggle('is-fixed', it.fixed);
    block.setAttribute('aria-label', `${it.label} starting at ${fromMinutes(it.start)} for ${it.duration} minutes`);
    block.innerHTML = `
      <div class="planit-block-title">${it.label}</div>
      <div class="planit-block-meta">${fromMinutes(it.start)} • ${it.duration} min</div>
    `;
    block.addEventListener('click', () => {
      const task = currentScenario.tasks.find(t => t.id === it.id);
      if (task?.mustStart) return;
      delete selections[it.id];
      clearCheckFlags();
      saveState();
      renderTasks();
      renderTimeline();
      hideReflection();
    });
    timelineEl.appendChild(block);
  });
}

function checkPlan() {
  feedbackEl.textContent = '';
  clearCheckFlags();

  const missingTasks = currentScenario.tasks.filter(t => !selections[t.id]);
  if (missingTasks.length) {
    lastCheck.missing = new Set(missingTasks.map(t => t.id));
    feedbackEl.textContent = `Pick start times for: ${missingTasks.map(t => t.label).join(', ')}.`;
    renderTasks();
    renderTimeline();
    hideReflection();
    return;
  }

  const { intervals, problems } = getIntervals();
  const sorted = intervals.slice().sort((a, b) => a.start - b.start);
  const overlapIds = new Set();

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (cur.start < prev.end) {
      problems.push(`Overlap: ${prev.label} overlaps with ${cur.label}.`);
      overlapIds.add(prev.id);
      overlapIds.add(cur.id);
    }
  }

  currentScenario.tasks.forEach(task => {
    const chosen = selections[task.id];
    if (!chosen) return;
    if (task.mustStart && chosen !== task.mustStart) {
      problems.push(`${task.label} must start at ${task.mustStart}.`);
      overlapIds.add(task.id);
    }
    if (task.earliest && toMinutes(chosen) < toMinutes(task.earliest)) {
      problems.push(`${task.label} starts too early (earliest: ${task.earliest}).`);
    }
    if (task.latestStart && toMinutes(chosen) > toMinutes(task.latestStart)) {
      problems.push(`${task.label} starts too late (latest: ${task.latestStart}).`);
    }
  });

  lastCheck.overlaps = overlapIds;

  if (problems.length) {
    feedbackEl.innerHTML = `<ul class="planit-feedback-list">${problems.map(p => `<li>⚠️ ${p}</li>`).join('')}</ul>`;
    renderTasks();
    renderTimeline();
    hideReflection();
  } else {
    feedbackEl.textContent = '✅ Nice plan! Everything fits with no overlaps.';
    renderTasks();
    renderTimeline();
    showReflection();
  }

  try {
    window.DECODE_PLATFORM?.logActivity?.({
      activity: 'plan-it',
      label: 'Plan-It',
      event: problems.length ? `Checked (${problems.length} issue${problems.length === 1 ? '' : 's'})` : 'Checked (no overlaps)',
      detail: {
        scenarioId: currentScenario.id,
        scenarioTitle: currentScenario.title,
        issues: problems.length
      }
    });
  } catch (e) {}
}

function autoPlan() {
  clearCheckFlags();
  hideReflection();

  const fixed = {};
  currentScenario.tasks.forEach(t => {
    if (t.mustStart) fixed[t.id] = t.mustStart;
  });
  selections = { ...fixed };

  const flex = currentScenario.tasks
    .filter(t => !t.mustStart)
    .map(t => {
      const opts = getTaskOptions(t, currentScenario);
      return { task: t, options: opts, window: opts.length };
    })
    .sort((a, b) => (a.window - b.window) || (b.task.durationMinutes - a.task.durationMinutes));

  flex.forEach(({ task, options }) => {
    for (const label of options) {
      if (isSlotAvailable(task, label)) {
        selections[task.id] = label;
        break;
      }
    }
  });

  saveState();
  renderTasks();
  renderTimeline();
  feedbackEl.textContent = 'Auto-plan filled what it could. Tap “Check Plan” to review.';
}

function resetAll() {
  selections = {};
  initializeFixedTasks();
  activeTaskId = null;
  clearCheckFlags();
  saveState();
  renderTasks();
  renderTimeline();
  feedbackEl.textContent = '';
  hideReflection();
}

function loadVideoMap() {
  const parsed = safeParse(localStorage.getItem(VIDEO_KEY) || '');
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function saveVideoMap(map) {
  localStorage.setItem(VIDEO_KEY, JSON.stringify(map));
}

function currentVideoUrl() {
  const map = loadVideoMap();
  return (map[currentScenario.id] || '').toString().trim();
}

function setCurrentVideoUrl(url) {
  const map = loadVideoMap();
  const cleaned = (url || '').toString().trim();
  if (cleaned) {
    map[currentScenario.id] = cleaned;
  } else {
    delete map[currentScenario.id];
  }
  saveVideoMap(map);
}

function renderLesson() {
  if (!lessonEl) return;
  const url = currentVideoUrl();
  if (!url) {
    lessonEl.classList.add('hidden');
    lessonEl.innerHTML = '';
    return;
  }
  lessonEl.classList.remove('hidden');
  lessonEl.innerHTML = `
    <div class="planit-lesson-title">Mini-lesson</div>
    <div class="planit-lesson-copy">Watch a short explanation before you plan (opens a new tab).</div>
    <button type="button" id="planit-lesson-open" class="secondary-btn">Watch</button>
  `;
  lessonEl.querySelector('#planit-lesson-open')?.addEventListener('click', () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function syncTeacherVideoControls() {
  if (!videoInput || !videoOpenBtn) return;
  const url = currentVideoUrl();
  videoInput.value = url;
  videoOpenBtn.disabled = !url;
}

function renderQuickFocusOptions() {
  if (!quickFocusEl) return;
  quickFocusEl.innerHTML = Object.entries(QUICK_FOCUS_LIBRARY)
    .map(([id, profile]) => `<option value="${id}">${profile.label}</option>`)
    .join('');
}

function applyQuickBuilderQueryDefaults() {
  const params = new URLSearchParams(window.location.search || '');
  const queryFocus = String(params.get('builderFocus') || '').trim();
  const queryGradeRaw = String(params.get('builderGrade') || '').trim();
  const queryGrade = normalizeGradeBand(queryGradeRaw);
  const queryMinutes = String(params.get('builderMinutes') || '').trim();

  if (quickGradeEl) {
    const profileBand = normalizeGradeBand(getDefaultGradeBand());
    quickGradeEl.value = profileBand;
    if (queryGradeRaw) quickGradeEl.value = queryGrade;
  }

  if (quickFocusEl && queryFocus && QUICK_FOCUS_LIBRARY[queryFocus]) {
    quickFocusEl.value = queryFocus;
  }

  if (quickMinutesEl && ['10', '20', '30'].includes(queryMinutes)) {
    quickMinutesEl.value = queryMinutes;
  }
}

function renderQuickLessonBuilder() {
  if (!quickOutputEl || !quickFocusEl || !quickGradeEl || !quickMinutesEl) return;

  const focusId = String(quickFocusEl.value || 'comprehension-evidence');
  const gradeBand = normalizeGradeBand(quickGradeEl.value || getDefaultGradeBand());
  const minutes = Number(quickMinutesEl.value || 20);
  const profile = QUICK_FOCUS_LIBRARY[focusId] || QUICK_FOCUS_LIBRARY['comprehension-evidence'];
  const split = getMinuteSplit(minutes);
  const wordQuestDefaults = profile.wordQuestFocusByBand?.[gradeBand] || { focus: 'all', len: 'any' };

  const stepCards = profile.steps.map((step, index) => {
    const activityMeta = QUICK_ACTIVITY_META[step.activity] || { label: step.activity };
    const href = getQuickActivityHref(step.activity, {
      wordQuestFocus: wordQuestDefaults.focus,
      wordQuestLength: wordQuestDefaults.len,
      builderFocus: focusId,
      builderGrade: gradeBand,
      builderMinutes: minutes
    });
    return `
      <article class="planit-quick-step">
        <div class="planit-quick-phase">${index + 1}. ${step.phase} · ${split[index] || split[split.length - 1]} min</div>
        <div class="planit-quick-activity">${activityMeta.label}</div>
        <div class="planit-quick-move">${step.move}</div>
        <a class="secondary-btn planit-quick-link" href="${href}">Open ${activityMeta.label}</a>
      </article>
    `;
  }).join('');

  const redActivity = QUICK_ACTIVITY_META[profile.steps[0]?.activity]?.label || 'Target activity';
  const yellowActivity = QUICK_ACTIVITY_META[profile.steps[1]?.activity]?.label || 'Guided activity';
  const greenActivity = QUICK_ACTIVITY_META[profile.steps[2]?.activity]?.label || 'Independent activity';

  quickOutputEl.innerHTML = `
    <div class="planit-quick-summary">
      <strong>${profile.label}</strong> · ${minutes} minutes · ${gradeBand}
      <div>${profile.summary}</div>
    </div>
    <div class="planit-quick-steps">${stepCards}</div>
    <div class="planit-quick-rag">
      <section class="planit-rag-lane planit-rag-red">
        <div class="planit-rag-title">Red (Immediate support)</div>
        <ul>
          <li>Start with explicit modeling and tight teacher prompts.</li>
          <li>Primary lane: ${redActivity}.</li>
        </ul>
      </section>
      <section class="planit-rag-lane planit-rag-yellow">
        <div class="planit-rag-title">Yellow (Guided practice)</div>
        <ul>
          <li>Move to coached reps with fast feedback loops.</li>
          <li>Primary lane: ${yellowActivity}.</li>
        </ul>
      </section>
      <section class="planit-rag-lane planit-rag-green">
        <div class="planit-rag-title">Green (Maintain + extend)</div>
        <ul>
          <li>Assign independent reps and extension challenges.</li>
          <li>Primary lane: ${greenActivity}.</li>
        </ul>
      </section>
    </div>
  `;

  if (quickStatusEl) {
    quickStatusEl.textContent = `Built ${minutes}-minute lesson for ${gradeBand}.`;
  }
}

function loadReflectionMap() {
  const parsed = safeParse(localStorage.getItem(REFLECTION_KEY) || '');
  return parsed && typeof parsed === 'object' ? parsed : {};
}

function saveReflectionMap(map) {
  localStorage.setItem(REFLECTION_KEY, JSON.stringify(map));
}

function loadReflectionText() {
  const map = loadReflectionMap();
  return (map[currentScenario.id]?.text || '').toString();
}

function saveReflectionText(text) {
  const map = loadReflectionMap();
  map[currentScenario.id] = {
    text: (text || '').toString(),
    updatedAt: Date.now()
  };
  saveReflectionMap(map);
}

function showReflection() {
  if (!reflectionSection || !reflectionPromptEl || !reflectionInput) return;
  reflectionPromptEl.textContent = currentScenario.reflection || 'What strategy worked for you?';
  reflectionInput.value = loadReflectionText();
  reflectionSavedEl.textContent = '';
  reflectionSection.classList.remove('hidden');
}

function hideReflection() {
  if (!reflectionSection) return;
  reflectionSection.classList.add('hidden');
  if (reflectionSavedEl) reflectionSavedEl.textContent = '';
}

function init() {
  applyLightTheme();
  loadState();
  if (!currentScenario || !SCENARIOS.find(s => s.id === currentScenario.id)) {
    currentScenario = pickDefaultScenario();
    selections = {};
  }
  initializeFixedTasks();

  buildScenarioList();
  renderScenario();
  renderQuickFocusOptions();
  applyQuickBuilderQueryDefaults();
  renderQuickLessonBuilder();
  renderLesson();
  renderTasks();
  renderTimeline();
  syncTeacherVideoControls();
  hideReflection();

  scenarioSelect.addEventListener('change', () => {
    const pick = SCENARIOS.find(s => s.id === scenarioSelect.value);
    if (pick) currentScenario = pick;
    selections = {};
    activeTaskId = null;
    clearCheckFlags();
    initializeFixedTasks();
    saveState();
    renderScenario();
    renderLesson();
    renderTasks();
    renderTimeline();
    feedbackEl.textContent = '';
    syncTeacherVideoControls();
    hideReflection();
  });

  resetBtn.addEventListener('click', resetAll);
  checkBtn.addEventListener('click', checkPlan);
  autoBtn?.addEventListener('click', autoPlan);
  quickGenerateBtn?.addEventListener('click', renderQuickLessonBuilder);
  quickGradeEl?.addEventListener('change', renderQuickLessonBuilder);
  quickFocusEl?.addEventListener('change', renderQuickLessonBuilder);
  quickMinutesEl?.addEventListener('change', renderQuickLessonBuilder);

  reflectionSaveBtn?.addEventListener('click', () => {
    const text = (reflectionInput?.value || '').toString();
    saveReflectionText(text);
    if (reflectionSavedEl) reflectionSavedEl.textContent = 'Saved.';
  });

  videoInput?.addEventListener('change', () => {
    setCurrentVideoUrl(videoInput.value);
    syncTeacherVideoControls();
    renderLesson();
  });

  videoOpenBtn?.addEventListener('click', () => {
    const url = currentVideoUrl();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

init();
