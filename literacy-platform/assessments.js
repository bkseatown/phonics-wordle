(function () {
  const ROLE_KEY = 'cornerstone_home_role_v1';
  const DEFAULT_ROLE = 'teacher';

  const ROLE_LABELS = {
    teacher: 'Teacher',
    'learning-support': 'Learning Support Teacher',
    eal: 'EAL Specialist',
    slp: 'Speech and Language Pathologist',
    counselor: 'School Counselor',
    psychologist: 'School Psychologist',
    admin: 'Administrator',
    dean: 'Dean',
    parent: 'Parent / Caregiver',
    student: 'Student'
  };

  const PRIORITY_LANES = {
    teacher: ['literacy', 'numeracy', 'executive'],
    'learning-support': ['literacy', 'numeracy', 'executive'],
    eal: ['literacy', 'slp', 'executive'],
    slp: ['slp', 'literacy'],
    counselor: ['sel', 'executive'],
    psychologist: ['sel', 'executive', 'literacy', 'numeracy'],
    admin: ['literacy', 'numeracy', 'sel'],
    dean: ['literacy', 'numeracy', 'executive'],
    parent: ['literacy', 'numeracy'],
    student: ['literacy', 'numeracy']
  };

  function normalizeRole(value) {
    const raw = String(value || '').trim().toLowerCase();
    return PRIORITY_LANES[raw] ? raw : DEFAULT_ROLE;
  }

  function readRoleFromPlatform() {
    const fromPlatform = window.DECODE_PLATFORM?.getRolePathway?.();
    if (fromPlatform) return normalizeRole(fromPlatform);
    const fromStorage = localStorage.getItem(ROLE_KEY);
    return normalizeRole(fromStorage);
  }

  function applyRole(roleId, recommendedOnly) {
    const role = normalizeRole(roleId);
    const lanes = PRIORITY_LANES[role] || PRIORITY_LANES[DEFAULT_ROLE];
    const cards = Array.from(document.querySelectorAll('.assessment-lane'));
    cards.forEach((card) => {
      const laneId = String(card.getAttribute('data-lane') || '').trim().toLowerCase();
      const isPriority = lanes.includes(laneId);
      card.classList.toggle('is-priority', isPriority);
      card.classList.toggle('is-secondary', !isPriority);
      card.classList.toggle('hidden', !!recommendedOnly && !isPriority);
    });

    const note = document.getElementById('assessments-role-note');
    if (note) {
      const laneLabel = lanes.map((lane) => lane.charAt(0).toUpperCase() + lane.slice(1)).join(', ');
      note.textContent = `Showing ${ROLE_LABELS[role] || 'role'} pathways. Priority lanes: ${laneLabel}.`;
    }
  }

  function init() {
    const roleSelect = document.getElementById('assessments-role-select');
    const recommendedToggle = document.getElementById('assessments-recommended-only');
    if (!roleSelect) return;

    const startingRole = readRoleFromPlatform();
    roleSelect.value = startingRole;
    applyRole(startingRole, !!recommendedToggle?.checked);

    roleSelect.addEventListener('change', () => {
      const role = normalizeRole(roleSelect.value);
      localStorage.setItem(ROLE_KEY, role);
      applyRole(role, !!recommendedToggle?.checked);
    });

    if (recommendedToggle) {
      recommendedToggle.addEventListener('change', () => {
        applyRole(roleSelect.value, recommendedToggle.checked);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
