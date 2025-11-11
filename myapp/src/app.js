import QUESTIONS from './questions.js';
import PROFILES from './profiles.js';
import { Profile } from './components.js';
import { DimensionStep, DimensionType, RangeType } from './classes.js';

const TOTAL_STEPS = 5;
const QUESTIONS_PER_STEP = 10;

const state = {
  currentStep: 1,
  answers: {}, // keys like s1: [1..5,...]
  results: {}, // keys like step1: percentage,
};

const el = {
  startBtn: document.getElementById('startBtn'),
  intro: document.getElementById('intro'),
  stepContainer: document.getElementById('stepContainer'),
  stepTitle: document.getElementById('stepTitle'),
  stepNumber: document.getElementById('stepNumber'),
  questionsForm: document.getElementById('questionsForm'),
  saveStepBtn: document.getElementById('saveStepBtn'),
  prevBtn: document.getElementById('prevBtn'),
  skipBtn: document.getElementById('skipBtn'),
  resultsSection: document.getElementById('results'),
  resultsChart: document.getElementById('resultsChart'),
  resultsList: document.getElementById('resultsList'),
  profileCard: document.getElementById('profileCard'),
  restartBtn: document.getElementById('restartBtn'),
  errorMsg: document.getElementById('error')
};

el.startBtn.addEventListener('click', () => {
  el.intro.classList.add('hidden');
  el.stepContainer.classList.remove('hidden');
  renderStep(1);
});

el.prevBtn.addEventListener('click', () => {
  if (state.currentStep > 1) renderStep(state.currentStep - 1);
});

el.skipBtn.addEventListener('click', () => {
  // Clear current step answers
  state.answers[`s${state.currentStep}`] = null;
  renderStep(state.currentStep);
});

el.saveStepBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const collected = collectAnswersForCurrentStep();
  if (!collected) {
    el.errorMsg.classList.toggle('hidden');
    setTimeout(() => {
      el.errorMsg.classList.toggle('hidden');
    }, 5000);
    return;
  }

  // Save answers array
  state.answers[`s${state.currentStep}`] = collected;

  // Calculate sum, average, percentage
  const sum = collected.reduce((a, b) => a + b, 0);
  const avg = sum / QUESTIONS_PER_STEP;
  const percent = Math.round(avg * 20);
  state.results[`${DimensionStep[`STEP${state.currentStep}`]}`] = percent;

  if (state.currentStep < TOTAL_STEPS) {
    renderStep(state.currentStep + 1);
  } else {
    showResults();
  }
});

el.restartBtn.addEventListener('click', () => {
  // reset
  state.currentStep = 1;
  state.answers = {};
  state.results = {};
  el.stepContainer.classList.remove('hidden');
  renderStep(1);
});

function renderStep(step) {
  window.scrollTo(0, 0);
  state.currentStep = step;
  el.stepNumber.textContent = step;
  el.stepTitle.textContent = QUESTIONS[`step${step}`].title;
  el.questionsForm.innerHTML = '';

  const qs = QUESTIONS[`step${step}`].questions;
  qs.forEach((qObj, i) => {
    const field = document.createElement('div');
    field.className = 'p-4 border rounded-lg bg-gray-50 flex items-center justify-between gap-4';
    const question = document.createElement('div');
    question.className = 'flex-1';
    question.innerHTML = `<i class="text-sm text-gray-600">${escapeHtml(qObj)}</i>`;

    const rate = document.createElement('div');
    rate.className = 'flex gap-2 items-center';

    const btnBgColors = [
      'choice-btn_completely-disagree',
      'choice-btn_somewhat-disagree',
      'choice-btn_neutral',
      'choice-btn_somewhat-agree',
      'choice-btn_completely-agree'
    ];

    for (let v = 1; v <= 5; v++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-3 py-2 rounded-full border border-gray-200 hover:scale-110 transition choice-btn ' + btnBgColors[v - 1];
      btn.dataset.value = v;
      btn.dataset.qid = `s${step}q${i + 1}`;
      btn.addEventListener('click', function(event) { onChoiceClick(event, btnBgColors[v - 1]); });
      rate.appendChild(btn);
    }

    field.appendChild(question);
    field.appendChild(rate);
    el.questionsForm.appendChild(field);
  });

  // Restore previously selected answers if any
  const saved = state.answers[`s${step}`];
  if (Array.isArray(saved)) {
    // for each question button set active state
    saved.forEach((val, idx) => {
      const qid = `s${step}q${idx + 1}`;
      const btns = el.questionsForm.querySelectorAll(`button[data-qid="${qid}"]`);
      btns.forEach(b => {
        if (+b.dataset.value === val) b.classList.add('bg-indigo-200', 'text-indigo-800');
        else b.classList.remove('bg-indigo-200', 'text-indigo-800');
      });
    });
  }
}

function onChoiceClick(ev, btnColor) {
  const btn = ev.currentTarget;
  const qid = btn.dataset.qid;
  const val = Number(btn.dataset.value);
  // find sibling buttons for same qid
  const siblings = btn.parentElement.querySelectorAll(`button[data-qid="${qid}"]`);
  siblings.forEach(s => {
    s.classList.remove('scale-110')
    s.classList.add('bg-gray-100');
  });
  btn.classList.remove('bg-gray-100');
  btn.classList.add('scale-110', btnColor);

  // set temporary value in a data map on the form
  const map = el.questionsForm.dataset.map ? JSON.parse(el.questionsForm.dataset.map) : {};
  map[qid] = val;
  el.questionsForm.dataset.map = JSON.stringify(map);
}

function collectAnswersForCurrentStep() {
  const map = el.questionsForm.dataset.map ? JSON.parse(el.questionsForm.dataset.map) : {};
  const ordered = [];
  for (let q = 1; q <= QUESTIONS_PER_STEP; q++) {
    const qid = `s${state.currentStep}q${q}`;
    if (!map[qid]) return null; // missing answer
    ordered.push(Number(map[qid]));
  }
  return ordered;
}

function showResults() {
  el.stepContainer.classList.add('hidden');
  el.resultsSection.classList.remove('hidden');

  // Chart
  const labels = [];
  const data = [];
  Object.keys(DimensionStep).forEach(key => {
    labels.push(DimensionType[DimensionStep[key]]);
    data.push(state.results[DimensionStep[key]] || 0);
  });

  // Destroy previous chart instance if exists
  if (window._psicoChart) window._psicoChart.destroy();

  const ctx = el.resultsChart.getContext('2d');
  window._psicoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Percent',
        data,
        backgroundColor: [
          '#FDE68A', // amber-200
          '#C7D2FE', // indigo-200
          '#FBCFE8', // pink-200
          '#BBF7D0', // green-200
          '#FCE7F3'  // rose-100
        ],
        borderRadius: 6,
        barPercentage: 0.6
      }]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { legend: { display: false } }
    }
  });

  // determine best profile
  const best = determineProfile(state.results);
  renderProfileCard(best);

  // list details
  el.resultsList.innerHTML = '';
  for (let s = 1; s <= TOTAL_STEPS; s++) {
    const card = document.createElement('div');
    card.className = 'p-4 border rounded bg-white shadow-sm';
    const pct = state.results[DimensionStep[`STEP${s}`]] || 0;
    card.innerHTML = `<div class="text-sm text-gray-600">${DimensionType[DimensionStep[`STEP${s}`]]}</div><div class="text-2xl font-semibold">${pct}%</div>`;
    el.resultsList.appendChild(card);
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" })[c]);
}

// Determine which profile best matches the user's percentages.
function determineProfile(results) {
  // map steps to trait keys
  const traits = {
    CONTROL: results.CONTROL || 0,
    DISCIPLINA: results.DISCIPLINA || 0,
    GESTION: results.GESTION || 0,
    TOLERANCIA: results.TOLERANCIA || 0,
    SESGOS: results.SESGOS || 0,
  };

  console.log('Profile results: ', results);
  console.log('User traits:', traits);

  let best = null;
  for (const profile of PROFILES) {
    let matches = 0;
    let distance = 0;
    for (const key of Object.keys(profile.ranges)) {
      const [min, max] = profile.ranges[key];
      console.log(`Profile ${profile.id} - Checking trait ${key}: user val=${traits[key]}, range=[${min},${max}]`);
      const val = traits[key] ?? 0;
      if (val >= min && val <= max) {
        matches += 1;
      } else if (val < min) {
        distance += (min - val);
      } else if (val > max) {
        distance += (val - max);
      }
    }

    const score = { profile, matches, distance };
    if (score.matches > best?.matches) best = score;
    else if (score.matches === best?.matches && score.distance < best?.distance) best = score;
    else best = score;
  }

  return best;
}

function renderProfileCard(best) {
  if (!el.profileCard) return;
  if (!best || !best.profile) {
    el.profileCard.innerHTML = '<div class="p-4 bg-yellow-50 border rounded">No matching profile could be determined.</div>';
    return;
  }

  const profile = best.profile;

  const dimensions = Object.keys(DimensionStep).map(key => {
    const label = DimensionType[DimensionStep[key]];
    const userVal = state.results[DimensionStep[key]] ?? 0;
    const [min, max] = profile.ranges[DimensionStep[key]];
    const matched = userVal >= min && userVal <= max;
    return { label, userVal, min, max, matched };
  });

  el.profileCard.innerHTML = Profile({
    profileName: profile.name,
    profileDesc: profile.desc,
    totalMatches: best.matches,
    dimensions
  });
}
