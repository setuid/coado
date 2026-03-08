'use strict';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SIZES = [
  { id: 'xs',     name: 'Xícara pequena', ml: 80 },
  { id: 'sm',     name: 'Xícara média',   ml: 120 },
  { id: 'md',     name: 'Xícara grande',  ml: 150 },
  { id: 'lg',     name: 'Copo americano', ml: 200 },
  { id: 'xl',     name: 'Caneca',         ml: 300 },
  { id: 'custom', name: 'Personalizado',  ml: null },
];

const INTENSITIES = [
  { id: 'suave',       name: 'Suave',       color: '#2E7D32', bg: '#E8F5E9', gPer100: 5, ratio: '1:20' },
  { id: 'equilibrado', name: 'Equilibrado', color: '#E65100', bg: '#FFF3E0', gPer100: 6, ratio: '1:16' },
  { id: 'forte',       name: 'Forte',       color: '#B71C1C', bg: '#FFEBEE', gPer100: 8, ratio: '1:12' },
];

const METHODS = {
  v60: {
    name: 'V60',
    tip: 'Moagem média-fina. Despeje em espiral. ~3 min',
    grind: 'Média-fina',
    time: '2:30–3:30 min',
    compensation: 0,
    temp: '92–94°C',
    details: [
      'Dobre o filtro e pré-aqueça o V60 com água quente',
      'Adicione o café moído e nivele levemente',
      'Bloom: despeje o dobro do peso do café, aguarde 30–45s',
      'Continue despejando em espiral do centro para fora em 2 pulsos',
      'Aguarde a drenagem completa (~3 min no total)',
    ],
    organic: 'Cafés orgânicos naturais têm notas frutadas — evite água acima de 94°C para preservar o aroma.',
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.40);
      const d2 = round5(rest * 0.35);
      const d3 = agua - bloom - d1 - d2;
      return [
        { name: 'Bloom',            sub: 'Liberar CO₂, despertar o café', vol: bloom, wait: 38, waitLabel: '~35–45s' },
        { name: 'Primeiro Despeje', sub: 'Doçura e corpo',                vol: d1 },
        { name: 'Segundo Despeje',  sub: 'Acidez e complexidade',         vol: d2 },
        { name: 'Despeje Final',    sub: 'Equilíbrio e volume',           vol: d3 },
      ];
    },
  },

  chemex: {
    name: 'Chemex',
    tip: 'Moagem média-grossa. Despeje lentamente. ~4 min',
    grind: 'Média-grossa',
    time: '3:30–4:30 min',
    compensation: 0.05,
    temp: '90–93°C',
    details: [
      'Use o filtro Chemex dobrado com 3 camadas voltadas para o bico',
      'Pré-aqueça com água quente e descarte',
      'Bloom: despeje o dobro do peso do café, aguarde 45s',
      'Continue despejando em pulsos lentos e circulares',
      'Drenagem total leva cerca de 4 min',
    ],
    organic: 'O filtro espesso da Chemex remove mais óleos, resultando numa bebida mais limpa e delicada.',
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.30);
      const d2 = round5(rest * 0.35);
      const d3 = agua - bloom - d1 - d2;
      return [
        { name: 'Bloom',            sub: 'Liberar CO₂',                    vol: bloom, wait: 45, waitLabel: '45s' },
        { name: 'Primeiro Despeje', sub: 'Extração inicial, doçura',       vol: d1,    wait: 30, waitLabel: '30s' },
        { name: 'Segundo Despeje',  sub: 'Corpo e acidez balanceada',      vol: d2,    wait: 20, waitLabel: '20s' },
        { name: 'Terceiro Despeje', sub: 'Finalização e ajuste de volume', vol: d3 },
      ];
    },
  },

  pano: {
    name: 'Coador de pano',
    tip: 'Moagem média. Tradicional e ideal para café orgânico',
    grind: 'Média',
    time: '2:00–3:00 min',
    compensation: 0.05,
    temp: '90–92°C',
    details: [
      'Lave bem o coador de pano antes de usar',
      'Adicione o café moído e posicione sobre o recipiente',
      'Bloom: umedeça todo o café e aguarde 30s',
      'Despeje o restante em movimentos circulares suaves e contínuos',
      'Não apresse — deixe filtrar naturalmente',
    ],
    organic: 'O coador de pano preserva mais óleos que papel, realçando a doçura e o corpo de cafés orgânicos.',
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.60);
      const d2 = agua - bloom - d1;
      return [
        { name: 'Bloom',             sub: 'Umedecer o café',     vol: bloom, wait: 30, waitLabel: '30s' },
        { name: 'Despeje Principal', sub: 'Extração principal',  vol: d1 },
        { name: 'Despeje Final',     sub: 'Volume e equilíbrio', vol: d2 },
      ];
    },
  },

  prensa: {
    name: 'Prensa Francesa',
    tip: 'Moagem grossa. Aguarde 4 min antes de pressionar',
    grind: 'Grossa',
    time: '4:30–5:00 min',
    compensation: 0.10,
    temp: '92–96°C',
    details: [
      'Pré-aqueça o cilindro com água quente e descarte',
      'Adicione o café moído grosso',
      'Despeje toda a água de uma vez',
      'Mexa suavemente por 10 segundos',
      'Coloque a tampa sem pressionar e aguarde 4 minutos',
      'Pressione o êmbolo lentamente e sirva imediatamente',
    ],
    organic: 'A imersão completa da prensa francesa extrai mais óleos e intensidade de cafés orgânicos.',
    steps(agua) {
      return [
        { name: 'Adicionar café', sub: 'Coloque o café moído grosso no cilindro',            checklist: true },
        { name: 'Despejar água',  sub: `Despeje todo o volume (${agua} ml) de uma vez`,     checklist: true },
        { name: 'Mexer',          sub: 'Mexa suavemente por 10 segundos',                    checklist: true },
        { name: 'Aguardar',       sub: 'Coloque a tampa sem pressionar',                     wait: 240, waitLabel: '4 min' },
        { name: 'Pressionar',     sub: 'Pressione o êmbolo lentamente até o fundo',         checklist: true },
        { name: 'Servir',         sub: 'Sirva imediatamente para evitar extração excessiva', checklist: true },
      ];
    },
  },
};

// ─── STATE ────────────────────────────────────────────────────────────────────

const DEFAULT = {
  portions: 2,
  sizeId: 'sm',
  customMl: 200,
  intensityId: 'equilibrado',
  methodId: 'v60',
};

let state = { ...DEFAULT };
let prepState = null;
let timerInterval = null;
let globalTimerInterval = null;
let prepStartTime = null;
let noteSaveTimer = null;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function round5(n) { return Math.round(n / 5) * 5; }
function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

function calcRecipe() {
  const size = SIZES.find(s => s.id === state.sizeId);
  const sizeMl = size.id === 'custom' ? (parseInt(state.customMl) || 200) : size.ml;
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const method = METHODS[state.methodId];
  const volumeTotal = state.portions * sizeMl;
  const cafeG = Math.round((volumeTotal / 100) * intensity.gPer100 * 10) / 10;
  const aguaTotal = Math.round(volumeTotal * (1 + method.compensation));
  return { volumeTotal, cafeG, aguaTotal, sizeMl };
}

function calcSteps(recipe) {
  return METHODS[state.methodId].steps(recipe.aguaTotal, recipe.cafeG);
}

function formatTime(s) {
  if (s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function formatDate(ts) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  if (ts >= todayStart) return 'hoje';
  if (ts >= todayStart - 86400000) return 'ontem';
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

function cupSVG(id, ml) {
  const h = ml ? Math.round(24 * (ml / 80)) : 24;
  const aspect = id === 'lg' ? 0.55 : id === 'xl' ? 1.05 : 0.82;
  const w = Math.round(h * aspect);

  if (id === 'xs' || id === 'sm' || id === 'md') {
    return `<svg width="${w}" height="${h}" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 6 Q5 26 17 27 Q29 26 28 6 Z" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M24 20 Q32 20 32 27 Q32 34 24 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="17" cy="40" rx="14" ry="3.5" fill="currentColor" opacity="0.22" stroke="currentColor" stroke-width="1.5"/>
    </svg>`;
  }
  if (id === 'lg') {
    return `<svg width="${w}" height="${h}" viewBox="0 0 22 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 3 L2 47 L20 47 L18 3 Z" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <line x1="3" y1="14" x2="5" y2="14" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
      <line x1="3" y1="24" x2="5" y2="24" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
      <line x1="3" y1="34" x2="5" y2="34" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
    </svg>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 50 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="4" width="34" height="34" rx="5" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="2.2"/>
    <path d="M38 14 Q48 14 48 24 Q48 34 38 34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="21" cy="41" rx="18" ry="4" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
  </svg>`;
}

function customSVG() {
  return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="1.8" stroke-dasharray="4 2.5"/>
    <path d="M11 18 L14 18 L20 12 L22 14 L16 20 L11 21 Z" fill="currentColor" opacity="0.7"/>
    <line x1="18.5" y1="13.5" x2="20.5" y2="15.5" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
  </svg>`;
}

function methodSVG(id) {
  const icons = {
    v60: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 5 L16 27 L28 5 Z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <line x1="16" y1="27" x2="16" y2="31" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M10 14 Q16 11 22 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    </svg>`,
    chemex: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3 L16 14 L26 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 14 L8 29 Q16 31 24 29 L22 14" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <line x1="12" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    pano: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 7 Q16 5 27 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 7 Q10 22 16 25 Q22 22 24 7" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="16" cy="28" rx="6" ry="2.5" fill="currentColor" opacity="0.2"/>
    </svg>`,
    prensa: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="11" width="16" height="18" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2"/>
      <line x1="16" y1="2" x2="16" y2="11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="10" y1="22" x2="22" y2="22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <rect x="12" y="2" width="8" height="4" rx="2" fill="currentColor" opacity="0.3"/>
    </svg>`,
  };
  return icons[id] || '';
}

// ─── URL / SHARE ──────────────────────────────────────────────────────────────

function buildShareURL() {
  const url = new URL(location.href);
  url.search = '';
  url.searchParams.set('p', state.portions);
  url.searchParams.set('s', state.sizeId);
  url.searchParams.set('i', state.intensityId);
  url.searchParams.set('m', state.methodId);
  if (state.sizeId === 'custom') url.searchParams.set('c', state.customMl);
  return url.toString();
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(el);
  el.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(el);
  return Promise.resolve(ok);
}

function showToast(msg) {
  const prev = document.querySelector('.toast');
  if (prev) prev.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('toast-show')));
  setTimeout(() => {
    el.classList.remove('toast-show');
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

// ─── STORAGE ──────────────────────────────────────────────────────────────────

function saveState() {
  try { localStorage.setItem('coado-state', JSON.stringify(state)); } catch {}
}

function loadState() {
  // URL params take priority (shared link)
  const params = new URLSearchParams(location.search);
  if (params.has('p') || params.has('s') || params.has('i') || params.has('m')) {
    const p = parseInt(params.get('p'));
    const s = params.get('s');
    const i = params.get('i');
    const m = params.get('m');
    const c = parseInt(params.get('c'));
    if (p >= 1 && p <= 10) state.portions = p;
    if (SIZES.find(x => x.id === s)) state.sizeId = s;
    if (INTENSITIES.find(x => x.id === i)) state.intensityId = i;
    if (METHODS[m]) state.methodId = m;
    if (c >= 50 && c <= 1000) state.customMl = c;
    // Clean URL without page reload
    history.replaceState({}, '', location.pathname);
    showToast('Receita compartilhada carregada!');
    return;
  }
  try {
    const saved = JSON.parse(localStorage.getItem('coado-state') || 'null');
    if (saved) Object.assign(state, saved);
  } catch {}
}

// ─── NOTES ────────────────────────────────────────────────────────────────────

function noteKey() { return `${state.methodId}_${state.intensityId}`; }

function loadNotes() {
  try { return JSON.parse(localStorage.getItem('coado-notes') || '{}'); } catch { return {}; }
}

function saveNote(text) {
  const notes = loadNotes();
  const k = noteKey();
  if (text.trim()) notes[k] = text.trim();
  else delete notes[k];
  try { localStorage.setItem('coado-notes', JSON.stringify(notes)); } catch {}
}

function getCurrentNote() {
  return loadNotes()[noteKey()] || '';
}

// ─── HISTORY ──────────────────────────────────────────────────────────────────

function loadHistory() {
  try { return JSON.parse(localStorage.getItem('coado-history') || '[]'); } catch { return []; }
}

function saveToHistory(duration) {
  const recipe = calcRecipe();
  const size = SIZES.find(s => s.id === state.sizeId);
  const history = loadHistory();
  history.unshift({
    ts: Date.now(),
    portions: state.portions,
    sizeId: state.sizeId,
    customMl: state.customMl,
    sizeName: size.id === 'custom' ? (state.customMl + 'ml') : size.name,
    intensityId: state.intensityId,
    methodId: state.methodId,
    aguaTotal: recipe.aguaTotal,
    cafeG: recipe.cafeG,
    duration,
  });
  while (history.length > 10) history.pop();
  try { localStorage.setItem('coado-history', JSON.stringify(history)); } catch {}
}

// ─── GLOBAL TIMER ─────────────────────────────────────────────────────────────

function startGlobalTimer() {
  prepStartTime = Date.now();
  clearInterval(globalTimerInterval);
  globalTimerInterval = setInterval(() => {
    const el = document.getElementById('global-timer');
    if (el) el.textContent = '⏱ ' + formatTime(getElapsed());
  }, 1000);
}

function stopGlobalTimer() {
  clearInterval(globalTimerInterval);
  globalTimerInterval = null;
}

function getElapsed() {
  return prepStartTime ? Math.floor((Date.now() - prepStartTime) / 1000) : 0;
}

// ─── RENDER CONFIG ────────────────────────────────────────────────────────────

function renderConfig() {
  const recipe = calcRecipe();
  const method = METHODS[state.methodId];
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const note = getCurrentNote();
  const hist = loadHistory();

  document.getElementById('app').innerHTML = `
    <div class="config-screen" role="main">

      <header class="app-header">
        <h1 class="app-title">☕ Coado</h1>
        <p class="app-tagline">Seu café, do jeito certo.</p>
      </header>

      <!-- Porções -->
      <section class="section">
        <h2 class="section-title">Quantas porções?</h2>
        <div class="portion-selector">
          <button class="btn-round" id="btn-minus" aria-label="Diminuir porções">−</button>
          <span class="portion-count" aria-live="polite">${state.portions}</span>
          <button class="btn-round" id="btn-plus" aria-label="Aumentar porções">+</button>
        </div>
      </section>

      <!-- Tamanho -->
      <section class="section">
        <h2 class="section-title">Tamanho do recipiente</h2>
        <div class="size-cards" role="group" aria-label="Tamanho do recipiente" id="size-cards">
          ${SIZES.map(s => `
            <button class="size-card ${s.id === state.sizeId ? 'selected' : ''}"
                    data-size="${s.id}"
                    aria-pressed="${s.id === state.sizeId}"
                    aria-label="${s.name}${s.ml ? ', ' + s.ml + 'ml' : ''}">
              <div class="size-icon">
                ${s.id === 'custom' ? customSVG() : cupSVG(s.id, s.ml)}
              </div>
              <div class="size-name">${s.name}</div>
              <div class="size-ml">${s.ml ? s.ml + ' ml' : 'livre'}</div>
            </button>
          `).join('')}
        </div>
        ${state.sizeId === 'custom' ? `
          <div class="custom-ml-row">
            <label for="custom-ml">Volume:</label>
            <input type="number" id="custom-ml" class="custom-ml-input"
                   value="${state.customMl}" min="50" max="1000" step="10" aria-label="Volume em ml">
            <span style="font-size:.85rem;color:var(--muted)">ml</span>
          </div>
        ` : ''}
      </section>

      <!-- Intensidade -->
      <section class="section">
        <h2 class="section-title">Intensidade</h2>
        <div class="intensity-group" role="group" aria-label="Intensidade" id="intensity-group">
          ${INTENSITIES.map(i => `
            <button class="intensity-btn ${i.id === state.intensityId ? 'selected' : ''}"
                    data-intensity="${i.id}"
                    aria-pressed="${i.id === state.intensityId}"
                    style="--color:${i.color}; --bg-color:${i.bg}">
              <span class="intensity-dot"></span>
              <span class="intensity-name">${i.name}</span>
              ${i.id === state.intensityId ? `<span class="intensity-ratio">${i.ratio}</span>` : ''}
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Método -->
      <section class="section">
        <h2 class="section-title">Método de preparo</h2>
        <div class="method-grid" role="group" aria-label="Método de preparo" id="method-grid">
          ${Object.entries(METHODS).map(([id, m]) => `
            <button class="method-card ${id === state.methodId ? 'selected' : ''}"
                    data-method="${id}"
                    aria-pressed="${id === state.methodId}">
              <div class="method-icon">${methodSVG(id)}</div>
              <div class="method-name">${m.name}</div>
            </button>
          `).join('')}
        </div>
        <div class="method-tip" role="status">${method.tip}</div>
      </section>

      <!-- Resultado -->
      <section class="section" aria-label="Sua receita">
        <div class="recipe-card">
          <h2 class="recipe-title">☕ Sua receita</h2>
          <div class="recipe-grid">
            <div class="recipe-row">
              <span class="recipe-icon">💧</span>
              <span class="recipe-label">Água</span>
              <span class="recipe-value" id="val-agua">${recipe.aguaTotal} ml</span>
            </div>
            <div class="recipe-row">
              <span class="recipe-icon">🌿</span>
              <span class="recipe-label">Café</span>
              <span class="recipe-value" id="val-cafe">${recipe.cafeG} g</span>
            </div>
            <div class="recipe-row">
              <span class="recipe-icon">⏱</span>
              <span class="recipe-label">Tempo</span>
              <span class="recipe-value">${method.time}</span>
            </div>
            <div class="recipe-row">
              <span class="recipe-icon">📐</span>
              <span class="recipe-label">Moagem</span>
              <span class="recipe-value">${method.grind}</span>
            </div>
          </div>
          <div class="recipe-actions">
            <button class="btn-start" id="btn-start">▶ Iniciar Preparo</button>
            <button class="btn-share" id="btn-share" aria-label="Compartilhar receita">🔗</button>
          </div>
        </div>
      </section>

      <!-- Notas pessoais -->
      <section class="section">
        <h2 class="section-title">Minhas notas — ${method.name} · ${intensity.name}</h2>
        <textarea class="notes-area" id="notes-area"
                  placeholder="Anote ajustes, impressões, o que funcionou bem..."
                  rows="3">${escapeHtml(note)}</textarea>
      </section>

      <!-- Saiba mais -->
      <section class="section">
        <details class="accordion">
          <summary class="accordion-summary">💡 Saiba mais — ${method.name}</summary>
          <div class="accordion-body">
            <p class="acc-temp">🌡️ Temperatura ideal: <strong>${method.temp}</strong></p>
            <ol class="acc-steps">
              ${method.details.map(d => `<li>${d}</li>`).join('')}
            </ol>
            <p class="acc-organic">🌱 ${method.organic}</p>
          </div>
        </details>
      </section>

      <!-- Histórico -->
      <section class="section">
        <details class="accordion" ${hist.length === 0 ? '' : ''}>
          <summary class="accordion-summary">
            📋 Histórico${hist.length > 0 ? ` (${hist.length})` : ''}
          </summary>
          <div class="accordion-body">
            ${hist.length === 0
              ? `<p class="history-empty">Nenhum preparo registrado ainda.<br>Complete seu primeiro preparo para ver o histórico aqui.</p>`
              : `<div class="history-list" id="history-list">
                  ${hist.map((h, i) => {
                    const hIntensity = INTENSITIES.find(x => x.id === h.intensityId);
                    const hMethod = METHODS[h.methodId];
                    return `
                    <div class="history-item" data-hist="${i}" role="button" tabindex="0"
                         aria-label="Usar receita: ${hMethod ? hMethod.name : h.methodId}, ${hIntensity ? hIntensity.name : h.intensityId}">
                      <div class="history-item-top">
                        <span class="history-badge">${hMethod ? hMethod.name : h.methodId}</span>
                        <span class="history-badge history-badge-intensity"
                              style="--color:${hIntensity ? hIntensity.color : '#888'}">
                          ${hIntensity ? hIntensity.name : h.intensityId}
                        </span>
                        <span class="history-date">${formatDate(h.ts)}</span>
                      </div>
                      <div class="history-item-info">
                        ${h.portions}× ${h.sizeName} · ${h.aguaTotal} ml · ${h.cafeG} g
                        ${h.duration ? `· ⏱ ${formatTime(h.duration)}` : ''}
                      </div>
                    </div>`;
                  }).join('')}
                </div>`
            }
          </div>
        </details>
      </section>

    </div>
  `;

  bindConfigEvents();
}

function bindConfigEvents() {
  document.getElementById('btn-minus').addEventListener('click', () => {
    if (state.portions > 1) { state.portions--; saveState(); renderConfig(); }
  });
  document.getElementById('btn-plus').addEventListener('click', () => {
    if (state.portions < 10) { state.portions++; saveState(); renderConfig(); }
  });

  document.getElementById('size-cards').addEventListener('click', e => {
    const card = e.target.closest('[data-size]');
    if (!card) return;
    state.sizeId = card.dataset.size;
    saveState();
    renderConfig();
  });

  const customInput = document.getElementById('custom-ml');
  if (customInput) {
    customInput.addEventListener('input', e => {
      state.customMl = parseInt(e.target.value) || 200;
      saveState();
      refreshRecipe();
    });
  }

  document.getElementById('intensity-group').addEventListener('click', e => {
    const btn = e.target.closest('[data-intensity]');
    if (!btn) return;
    state.intensityId = btn.dataset.intensity;
    saveState();
    renderConfig();
  });

  document.getElementById('method-grid').addEventListener('click', e => {
    const card = e.target.closest('[data-method]');
    if (!card) return;
    state.methodId = card.dataset.method;
    saveState();
    renderConfig();
  });

  document.getElementById('btn-start').addEventListener('click', () => {
    clearInterval(timerInterval);
    prepState = { stepIndex: 0, waiting: false, timeLeft: 0 };
    startGlobalTimer();
    renderPrep();
  });

  document.getElementById('btn-share').addEventListener('click', () => {
    const url = buildShareURL();
    copyToClipboard(url).then(ok => showToast(ok ? '🔗 Link copiado!' : 'Link: ' + url));
  });

  // Notes: auto-save with debounce
  const notesArea = document.getElementById('notes-area');
  if (notesArea) {
    notesArea.addEventListener('input', e => {
      clearTimeout(noteSaveTimer);
      noteSaveTimer = setTimeout(() => saveNote(e.target.value), 600);
    });
  }

  // History: click to restore recipe
  const histList = document.getElementById('history-list');
  if (histList) {
    const restore = e => {
      const item = e.target.closest('[data-hist]');
      if (!item) return;
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      const h = loadHistory()[parseInt(item.dataset.hist)];
      if (!h) return;
      Object.assign(state, {
        portions: h.portions,
        sizeId: h.sizeId,
        customMl: h.customMl || DEFAULT.customMl,
        intensityId: h.intensityId,
        methodId: h.methodId,
      });
      saveState();
      renderConfig();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Receita restaurada!');
    };
    histList.addEventListener('click', restore);
    histList.addEventListener('keydown', restore);
  }
}

function refreshRecipe() {
  const recipe = calcRecipe();
  const el1 = document.getElementById('val-agua');
  const el2 = document.getElementById('val-cafe');
  if (el1) el1.textContent = recipe.aguaTotal + ' ml';
  if (el2) el2.textContent = recipe.cafeG + ' g';
}

// ─── RENDER PREP ──────────────────────────────────────────────────────────────

function renderPrep() {
  const recipe = calcRecipe();
  const steps = calcSteps(recipe);
  const idx = prepState.stepIndex;
  const step = steps[idx];
  const total = steps.length;

  const pouredBefore = steps.slice(0, idx).reduce((s, st) => s + (st.vol || 0), 0);
  const remaining = recipe.aguaTotal - pouredBefore - (step.vol || 0);

  let bodyHTML = '';

  if (prepState.waiting) {
    bodyHTML = `
      <div class="timer-display">
        <div class="timer-emoji">⏳</div>
        <div class="timer-label">Aguarde</div>
        <div class="timer-value" id="timer-value" aria-live="polite">${formatTime(prepState.timeLeft)}</div>
        <button class="btn-skip" id="btn-skip-wait">pular espera</button>
      </div>
    `;
  } else {
    const volBar = step.vol ? `
      <div class="step-volume">
        <div class="volume-bar-label">${step.vol} ml</div>
        <div class="volume-bar" role="progressbar" aria-valuenow="${step.vol}" aria-valuemax="${recipe.aguaTotal}">
          <div class="volume-bar-fill" style="width:${Math.min(100, (step.vol / recipe.aguaTotal) * 100).toFixed(1)}%"></div>
        </div>
      </div>
      <div class="step-meta">
        <span>Despejado até aqui: ${pouredBefore} ml</span>
        <span>Restante: ${Math.max(0, remaining)} ml</span>
      </div>
    ` : '';

    const hint = step.checklist
      ? `<p class="step-checklist-hint">Confirme quando finalizado</p>`
      : (step.wait && !step.vol
          ? `<p class="step-checklist-hint">⏳ Timer de ${step.waitLabel} será iniciado ao confirmar</p>`
          : '');

    bodyHTML = `
      ${volBar}
      ${hint}
      <div class="prep-actions">
        ${idx > 0 ? `<button class="btn-back" id="btn-back">← Voltar</button>` : '<span></span>'}
        <button class="btn-done" id="btn-done">${step.checklist ? '✓ Feito' : '✓ Despejei'}</button>
      </div>
    `;
  }

  document.getElementById('app').innerHTML = `
    <div class="prep-screen" role="main">
      <div class="prep-header">
        <button class="btn-close" id="btn-close" aria-label="Encerrar preparo">✕ Encerrar</button>
        <div class="prep-progress">ETAPA ${idx + 1} de ${total}</div>
        <div class="global-timer" id="global-timer" aria-label="Tempo total de preparo">
          ⏱ ${formatTime(getElapsed())}
        </div>
      </div>
      <div class="prep-step">
        <h2 class="step-name">${step.name}</h2>
        <p class="step-sub">${step.sub}</p>
        ${bodyHTML}
      </div>
    </div>
  `;

  bindPrepEvents(steps);
}

function bindPrepEvents(steps) {
  document.getElementById('btn-close').addEventListener('click', () => {
    clearInterval(timerInterval);
    stopGlobalTimer();
    prepState = null;
    prepStartTime = null;
    renderConfig();
  });

  if (prepState.waiting) {
    document.getElementById('btn-skip-wait').addEventListener('click', () => {
      clearInterval(timerInterval);
      prepState.waiting = false;
      advanceStep(steps);
    });
    return;
  }

  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      clearInterval(timerInterval);
      prepState.stepIndex--;
      prepState.waiting = false;
      renderPrep();
    });
  }

  document.getElementById('btn-done').addEventListener('click', () => {
    const step = steps[prepState.stepIndex];
    if (step.wait) {
      prepState.waiting = true;
      prepState.timeLeft = step.wait;
      renderPrep();
      startCountdown(steps);
    } else {
      advanceStep(steps);
    }
  });
}

function advanceStep(steps) {
  prepState.stepIndex++;
  prepState.waiting = false;
  if (prepState.stepIndex >= steps.length) {
    renderDone();
  } else {
    renderPrep();
  }
}

function startCountdown(steps) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    prepState.timeLeft--;
    const el = document.getElementById('timer-value');
    if (el) el.textContent = formatTime(prepState.timeLeft);
    if (prepState.timeLeft <= 0) {
      clearInterval(timerInterval);
      prepState.waiting = false;
      advanceStep(steps);
    }
  }, 1000);
}

// ─── RENDER DONE ──────────────────────────────────────────────────────────────

function renderDone() {
  clearInterval(timerInterval);
  const elapsed = getElapsed();
  stopGlobalTimer();
  saveToHistory(elapsed);

  const method = METHODS[state.methodId];
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const note = getCurrentNote();

  document.getElementById('app').innerHTML = `
    <div class="done-screen" role="main">
      <div class="done-emoji" aria-hidden="true">☕</div>
      <h2 class="done-title">Café pronto!</h2>
      <p class="done-msg">Bom proveito. 😊</p>
      ${elapsed > 0 ? `<p class="done-time">⏱ Preparo em: <strong>${formatTime(elapsed)}</strong></p>` : ''}
      <div class="done-notes">
        <label class="done-notes-label" for="done-notes-area">
          Notas — ${method.name} · ${intensity.name}
        </label>
        <textarea class="notes-area" id="done-notes-area"
                  placeholder="Como ficou? Algo para ajustar na próxima vez..."
                  rows="3">${escapeHtml(note)}</textarea>
      </div>
      <button class="btn-restart" id="btn-restart">Fazer outro café</button>
    </div>
  `;

  const notesArea = document.getElementById('done-notes-area');
  if (notesArea) {
    notesArea.addEventListener('input', e => {
      clearTimeout(noteSaveTimer);
      noteSaveTimer = setTimeout(() => saveNote(e.target.value), 600);
    });
  }

  document.getElementById('btn-restart').addEventListener('click', () => {
    prepState = null;
    prepStartTime = null;
    renderConfig();
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

loadState();
renderConfig();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
