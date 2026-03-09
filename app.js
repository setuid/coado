'use strict';

const APP_VERSION = '3.4';

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
  { id: 'suave',       name: 'Suave',       color: '#2E7D32', bg: '#E8F5E9', gPer100: 5,  ratio: '1:20' },
  { id: 'equilibrado', name: 'Equilibrado', color: '#E65100', bg: '#FFF3E0', gPer100: 6,  ratio: '1:16' },
  { id: 'forte',       name: 'Forte',       color: '#B71C1C', bg: '#FFEBEE', gPer100: 8,  ratio: '1:12' },
  { id: 'extra-forte', name: 'Extra Forte', color: '#37474F', bg: '#ECEFF1', gPer100: 10, ratio: '1:10' },
];

const METHODS = {
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
    calibration: 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
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
    calibration: 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
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
    calibration: 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
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
    calibration: 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados. Use mais cliques do que parece necessário — moagem grossa mesmo.',
    steps(agua) {
      return [
        { name: 'Adicionar café', sub: 'Coloque o café moído grosso no cilindro',             checklist: true },
        { name: 'Despejar água',  sub: `Despeje todo o volume (${agua} ml) de uma vez`,      checklist: true },
        { name: 'Mexer',          sub: 'Mexa suavemente por 10 segundos',                     checklist: true },
        { name: 'Aguardar',       sub: 'Coloque a tampa sem pressionar',                      wait: 240, waitLabel: '4 min' },
        { name: 'Pressionar',     sub: 'Pressione o êmbolo lentamente até o fundo',          checklist: true },
        { name: 'Servir',         sub: 'Sirva imediatamente para evitar extração excessiva',  checklist: true },
      ];
    },
  },
  espresso: {
    name: 'Espresso',
    tip: 'Moagem fina. Dose + extração em 25–30s.',
    grind: 'Fina',
    time: '25–30s',
    compensation: 0,
    temp: '90–96°C',
    isEspresso: true,
    details: [
      'Aqueça a máquina e o portafiltro por pelo menos 10 min',
      'Dose o café no portafiltro e distribua uniformemente',
      'Tampe com pressão firme e uniforme (~15 kg de força)',
      'Encaixe o portafiltro e inicie a extração imediatamente',
      'Observe o fluxo: ideal começa em 6–8s após o início',
      'Pare a extração em 25–30s ou ao atingir o volume alvo',
    ],
    organic: 'Cafés orgânicos de torra média produzem espressos mais doces e equilibrados. Evite torras muito escuras que mascaram as notas originais.',
    calibration: 'Para espresso: 1 clique mais fino = extração mais lenta e mais amarga. 1 clique mais grosso = mais rápida e mais azeda. Ajuste 1 clique por vez.',
    steps(dose, yieldMl) {
      return [
        { name: 'Aquecer',    sub: 'Aqueça a máquina e o portafiltro',                          checklist: true },
        { name: 'Dosar',      sub: `Coloque ${dose}g de café moído fino no portafiltro`,         checklist: true },
        { name: 'Distribuir', sub: 'Distribua o café uniformemente (WDT ou tap suave)',          checklist: true },
        { name: 'Tampar',     sub: 'Tampe com pressão firme e uniforme (~15 kg)',                checklist: true },
        { name: 'Extrair',    sub: `Inicie a extração — alvo: ${yieldMl}ml em 25–30s`,          wait: 30, waitLabel: '30s' },
        { name: 'Servir',     sub: 'Sirva imediatamente',                                        checklist: true },
      ];
    },
  },
};

const GRINDERS = {
  'timemore-c2': {
    name: 'Timemore C2',
    unit: 'cliques',
    calibrationNote: 'Feche o moedor completamente sem forçar. Esse é o ponto zero. Abra os cliques em sentido anti-horário.',
    manualUrl: 'https://www.manualslib.com/manual/3910577/Timemore-Chestnut-C2.html',
    espressoCapable: false,
    espressoNote: 'Não recomendado para espresso — range de ajuste muito pequeno na faixa fina.',
    settings: { v60: '18–22', chemex: '22–26', pano: '20–24', prensa: '26–30', espresso: null },
  },
  'timemore-c3': {
    name: 'Timemore C3 / C3 Pro',
    unit: 'cliques',
    calibrationNote: 'Feche o moedor completamente sem forçar. Esse é o ponto zero. Abra os cliques em sentido anti-horário.',
    manualUrl: 'https://www.manualslib.com/manual/3910579/Timemore-Chestnut-C3.html',
    espressoCapable: 'limited',
    espressoNote: 'Apenas com cesta pressurizada (pressurized basket) — janela de ajuste muito estreita.',
    settings: { v60: '15–20', chemex: '20–24', pano: '18–22', prensa: '22–26', espresso: '7–8' },
  },
  'timemore-c3s': {
    name: 'Timemore C3S',
    unit: 'cliques',
    calibrationNote: 'Feche o moedor completamente sem forçar. Esse é o ponto zero. Abra os cliques em sentido anti-horário.',
    manualUrl: 'https://manuals.plus/asin/B0C1TZN9T5',
    espressoCapable: 'limited',
    espressoNote: 'Apenas com cesta pressurizada (pressurized basket) — mesma limitação do C3.',
    settings: { v60: '14–18', chemex: '18–22', pano: '16–20', prensa: '20–25', espresso: '7–8' },
  },
  'comandante-c40': {
    name: 'Comandante C40',
    unit: 'cliques',
    calibrationNote: 'Feche o moedor completamente sem forçar. Cada clique equivale a ~25–30 µm de ajuste — alta precisão.',
    manualUrl: 'https://www.maxicoffee.com/images/pdf/C40-Manual.pdf',
    espressoCapable: true,
    espressoNote: 'Excelente para espresso — ~25–30 µm por clique, alta precisão. Red Clix: 18–24 cliques.',
    settings: { v60: '22–28', chemex: '28–34', pano: '24–30', prensa: '32–38', espresso: '10–15' },
  },
  '1zpresso-jx': {
    name: '1Zpresso JX',
    unit: 'rotações',
    calibrationNote: 'Gire o ajuste até o zero (parar de girar sem forçar). Depois abra o número de rotações indicado. Cada rotação = 40 cliques.',
    manualUrl: 'https://1zpresso.coffee/manual-j-en/',
    espressoCapable: false,
    espressoNote: 'Tecnicamente possível (~1.5–1.8 rot) mas resultado inconsistente. Prefira o JX-Pro para espresso.',
    settings: { v60: '2.5–3.5', chemex: '3.5–4.2', pano: '3.0–4.0', prensa: '4.0–5.0', espresso: null },
  },
  '1zpresso-jx-pro': {
    name: '1Zpresso JX-Pro',
    unit: 'rotações',
    calibrationNote: 'Gire o ajuste até o zero (parar de girar sem forçar). Depois abra o número de rotações indicado.',
    manualUrl: 'https://1zpresso.coffee/manual-jxpro-en/',
    espressoCapable: true,
    espressoNote: 'Projetado para espresso — 1.6–1.8 rotações (setting #12–16).',
    settings: { v60: '2.2–3.5', chemex: '3.2–4.0', pano: '2.8–3.8', prensa: '4.0–4.8', espresso: '1.6–1.8' },
  },
  'baratza-encore': {
    name: 'Baratza Encore',
    unit: 'número',
    calibrationNote: 'Gire o hopper (parte superior) alinhando a linha branca ao número desejado. Ajuste sempre com o moedor ligado.',
    manualUrl: 'https://assets.breville.com/ZCG485/manual-encore-en-v4-3-120122.pdf',
    espressoCapable: false,
    espressoNote: 'Não recomendado para espresso — saltos grandes entre settings, muito impreciso na faixa fina.',
    settings: { v60: '15–20', chemex: '20–26', pano: '18–24', prensa: '28–35', espresso: null },
  },
  'breville-smart-grinder-pro': {
    name: 'Breville Smart Grinder Pro',
    unit: 'número',
    calibrationNote: 'O ajuste é feito pelo dial digital (1–60). Números menores = moagem mais fina. Ajuste sempre com o moedor desligado antes de ligar.',
    manualUrl: 'https://www.breville.com/content/dam/breville/au/assets/grinders/finished-goods/bcg820/bcg820-manual.pdf',
    espressoCapable: true,
    espressoNote: 'Bom para espresso — faixa de 1–16 com boa consistência. Ajuste 1 número por vez.',
    settings: { v60: '20–26', chemex: '26–32', pano: '22–28', prensa: '36–44', espresso: '10–15' },
  },
  'hario-skerton-pro': {
    name: 'Hario Skerton Pro',
    unit: 'cliques',
    calibrationNote: 'O ajuste fica na parte inferior do moedor. Feche completamente (posição 0) e abra os cliques indicados.',
    manualUrl: 'https://global.hario.com/product/MMCS-2B.pdf',
    espressoCapable: false,
    espressoNote: 'Não recomendado para espresso — distribuição irregular de partículas na faixa muito fina.',
    settings: { v60: '6–8', chemex: '8–10', pano: '7–9', prensa: '10–14', espresso: null },
  },
};

// ─── STATE ────────────────────────────────────────────────────────────────────

const DEFAULT = { portions: 3, sizeId: 'md', customMl: 200, intensityId: 'forte', methodId: 'chemex', shotType: 'duplo' };
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
  const method = METHODS[state.methodId];
  if (method.isEspresso) {
    const dosePerShot = state.shotType === 'simples' ? 9 : 18;
    const yieldPerShot = state.shotType === 'simples' ? 18 : 36;
    const dose = dosePerShot * state.portions;
    const yieldMl = yieldPerShot * state.portions;
    return { isEspresso: true, dose, yieldMl, dosePerShot, yieldPerShot };
  }
  const size = SIZES.find(s => s.id === state.sizeId);
  const sizeMl = size.id === 'custom' ? (parseInt(state.customMl) || 200) : size.ml;
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const volumeTotal = state.portions * sizeMl;
  const cafeG = Math.round((volumeTotal / 100) * intensity.gPer100 * 10) / 10;
  const aguaTotal = Math.round(volumeTotal * (1 + method.compensation));
  return { isEspresso: false, volumeTotal, cafeG, aguaTotal, sizeMl };
}

function calcSteps(recipe) {
  const method = METHODS[state.methodId];
  if (method.isEspresso) return method.steps(recipe.dose, recipe.yieldMl);
  return method.steps(recipe.aguaTotal, recipe.cafeG);
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
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
    espresso: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="16" cy="10" rx="10" ry="4" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2"/>
      <path d="M6 10 L7 22 Q16 26 25 22 L26 10" fill="currentColor" opacity="0.12" stroke="currentColor" stroke-width="2"/>
      <path d="M20 22 Q24 22 26 26 L22 26 Q20 24 20 22Z" fill="currentColor" opacity="0.25"/>
      <line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  };
  return icons[id] || '';
}

// ─── URL / SHARE ──────────────────────────────────────────────────────────────

function buildShareURL() {
  const url = new URL(location.href);
  url.search = '';
  const method = METHODS[state.methodId];
  if (method.isEspresso) {
    url.searchParams.set('m', 'espresso');
    url.searchParams.set('shot', state.shotType);
    url.searchParams.set('qty', state.portions);
  } else {
    url.searchParams.set('p', state.portions);
    url.searchParams.set('s', state.sizeId);
    url.searchParams.set('i', state.intensityId);
    url.searchParams.set('m', state.methodId);
    if (state.sizeId === 'custom') url.searchParams.set('c', state.customMl);
  }
  return url.toString();
}

function copyToClipboard(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
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
  setTimeout(() => { el.classList.remove('toast-show'); setTimeout(() => el.remove(), 300); }, 2500);
}

// ─── STORAGE ──────────────────────────────────────────────────────────────────

function saveState() { try { localStorage.setItem('coado-state', JSON.stringify(state)); } catch {} }

function loadState() {
  const params = new URLSearchParams(location.search);
  // Espresso shared URL
  if (params.get('m') === 'espresso') {
    state.methodId = 'espresso';
    const shot = params.get('shot');
    if (shot === 'simples' || shot === 'duplo') state.shotType = shot;
    const qty = parseInt(params.get('qty'));
    if (qty >= 1 && qty <= 4) state.portions = qty;
    history.replaceState({}, '', location.pathname);
    showToast('Receita compartilhada carregada!');
    return;
  }
  // Filter shared URL
  if (params.has('p') || params.has('s') || params.has('i') || params.has('m')) {
    const p = parseInt(params.get('p')), s = params.get('s'),
          i = params.get('i'), m = params.get('m'), c = parseInt(params.get('c'));
    if (p >= 1 && p <= 10) state.portions = p;
    if (SIZES.find(x => x.id === s)) state.sizeId = s;
    if (INTENSITIES.find(x => x.id === i)) state.intensityId = i;
    if (METHODS[m] && m !== 'espresso') state.methodId = m;
    if (c >= 50 && c <= 1000) state.customMl = c;
    history.replaceState({}, '', location.pathname);
    showToast('Receita compartilhada carregada!');
    return;
  }
  try {
    const s = JSON.parse(localStorage.getItem('coado-state') || 'null');
    if (s) Object.assign(state, s);
  } catch {}
}

// ─── GRINDER ──────────────────────────────────────────────────────────────────

function isGrinderFirstTime() { return localStorage.getItem('coado-grinder') === null; }

function loadGrinder() {
  const g = localStorage.getItem('coado-grinder');
  if (!g || g === 'none') return null;
  return GRINDERS[g] ? g : null;
}

function saveGrinder(id) { localStorage.setItem('coado-grinder', id || 'none'); }

function getGrinderDisplay(grinderId, methodId) {
  const method = METHODS[methodId];
  if (!grinderId) return { value: method.grind, sub: null, warning: null };
  const g = GRINDERS[grinderId];
  if (!g) return { value: method.grind, sub: null, warning: null };
  const setting = g.settings[methodId];
  if (!setting) {
    const warning = method.isEspresso ? g.espressoNote : null;
    return { value: method.grind, sub: null, warning };
  }
  return { value: `${setting} ${g.unit}`, sub: `${g.name} · ${method.grind}`, warning: null };
}

// ─── NOTES ────────────────────────────────────────────────────────────────────

function noteKey() {
  if (state.methodId === 'espresso') return `espresso_${state.shotType}`;
  return `${state.methodId}_${state.intensityId}`;
}
function loadNotes() { try { return JSON.parse(localStorage.getItem('coado-notes') || '{}'); } catch { return {}; } }
function saveNote(text) {
  const notes = loadNotes(); const k = noteKey();
  if (text.trim()) notes[k] = text.trim(); else delete notes[k];
  try { localStorage.setItem('coado-notes', JSON.stringify(notes)); } catch {}
}
function getCurrentNote() { return loadNotes()[noteKey()] || ''; }

// ─── HISTORY ──────────────────────────────────────────────────────────────────

function loadHistory() { try { return JSON.parse(localStorage.getItem('coado-history') || '[]'); } catch { return []; } }

function saveToHistory(duration) {
  const recipe = calcRecipe();
  const method = METHODS[state.methodId];
  const hist = loadHistory();
  const entry = {
    ts: Date.now(), portions: state.portions, methodId: state.methodId,
    intensityId: state.intensityId, duration, rating: null,
  };
  if (method.isEspresso) {
    entry.shotType = state.shotType;
    entry.sizeName = state.shotType === 'simples' ? 'Dose simples' : 'Dose dupla';
    entry.cafeG = recipe.dose;
    entry.aguaTotal = recipe.yieldMl;
  } else {
    const size = SIZES.find(s => s.id === state.sizeId);
    entry.sizeId = state.sizeId;
    entry.customMl = state.customMl;
    entry.sizeName = size.id === 'custom' ? (state.customMl + 'ml') : size.name;
    entry.cafeG = recipe.cafeG;
    entry.aguaTotal = recipe.aguaTotal;
  }
  hist.unshift(entry);
  while (hist.length > 10) hist.pop();
  try { localStorage.setItem('coado-history', JSON.stringify(hist)); } catch {}
}

function saveRatingToHistory(rating) {
  const hist = loadHistory();
  if (hist.length > 0) { hist[0].rating = rating; }
  try { localStorage.setItem('coado-history', JSON.stringify(hist)); } catch {}
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
function stopGlobalTimer() { clearInterval(globalTimerInterval); globalTimerInterval = null; }
function getElapsed() { return prepStartTime ? Math.floor((Date.now() - prepStartTime) / 1000) : 0; }

// ─── RENDER CONFIG ────────────────────────────────────────────────────────────

function renderConfig() {
  const recipe = calcRecipe();
  const method = METHODS[state.methodId];
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const note = getCurrentNote();
  const hist = loadHistory();
  const grinderId = loadGrinder();
  const grinder = grinderId ? GRINDERS[grinderId] : null;
  const grinderDisplay = getGrinderDisplay(grinderId, state.methodId);
  const firstTime = isGrinderFirstTime();
  const isEspresso = method.isEspresso;

  // ── Grinder section ──
  const grinderGrid = `
    <input type="search" class="grinder-search" id="grinder-search"
           placeholder="🔍  Buscar moedor..." autocomplete="off" aria-label="Buscar moedor">
    <div class="grinder-grid" id="grinder-grid">
      ${Object.entries(GRINDERS).map(([id, g]) => `
        <button class="grinder-btn ${id === grinderId ? 'selected' : ''}"
                data-grinder="${id}" aria-pressed="${id === grinderId}">
          <span class="grinder-name">${g.name}</span>
          <span class="grinder-unit">${g.unit}</span>
          ${g.manualUrl ? `<span class="grinder-manual-icon" data-manual-url="${escapeHtml(g.manualUrl)}"
                title="Ver manual" role="button" tabindex="0" aria-label="Manual ${g.name}">📄</span>` : ''}
        </button>`).join('')}
      <button class="grinder-btn grinder-btn-none ${!grinderId && !firstTime ? 'selected' : ''}"
              data-grinder="none" aria-pressed="${!grinderId && !firstTime}">
        <span class="grinder-name">Sem moedor específico</span>
        <span class="grinder-unit">descrição genérica</span>
      </button>
    </div>
    <p class="grinder-no-results" id="grinder-no-results" style="display:none">
      Nenhum moedor encontrado — use "Sem moedor específico"
    </p>
    <p class="grinder-note">⚠️ Valores são pontos de partida — ajuste ±2–3 cliques conforme o resultado na xícara.</p>`;

  const grinderSection = firstTime
    ? `<section class="section" id="section-grinder">
        <h2 class="section-title">Meu moedor <span class="section-opt">· opcional</span></h2>
        ${grinderGrid}
      </section>`
    : `<section class="section" id="section-grinder">
        <details class="accordion" id="grinder-accordion">
          <summary class="accordion-summary">
            ⚙️ Moedor: ${grinder ? grinder.name : 'Sem moedor específico'}
          </summary>
          <div class="accordion-body">${grinderGrid}</div>
        </details>
      </section>`;

  // ── Seção 1: size (filter) or shot (espresso) ──
  const secao1 = isEspresso
    ? `<section class="section">
        <h2 class="section-title">Tipo de shot</h2>
        <div class="shot-cards" role="group" aria-label="Tipo de shot" id="shot-cards">
          <button class="shot-card ${state.shotType === 'duplo' ? 'selected' : ''}"
                  data-shot="duplo" aria-pressed="${state.shotType === 'duplo'}">
            <div class="shot-name">Dose Dupla</div>
            <div class="shot-info">18g → 36ml</div>
            <div class="shot-badge">padrão</div>
          </button>
          <button class="shot-card ${state.shotType === 'simples' ? 'selected' : ''}"
                  data-shot="simples" aria-pressed="${state.shotType === 'simples'}">
            <div class="shot-name">Dose Simples</div>
            <div class="shot-info">9g → 18ml</div>
            <div class="shot-badge" style="visibility:hidden">.</div>
          </button>
        </div>
      </section>`
    : `<section class="section">
        <h2 class="section-title">Tamanho do recipiente</h2>
        <div class="size-cards" role="group" aria-label="Tamanho do recipiente" id="size-cards">
          ${SIZES.map(s => `
            <button class="size-card ${s.id === state.sizeId ? 'selected' : ''}"
                    data-size="${s.id}" aria-pressed="${s.id === state.sizeId}"
                    aria-label="${s.name}${s.ml ? ', ' + s.ml + 'ml' : ''}">
              <div class="size-icon">${s.id === 'custom' ? customSVG() : cupSVG(s.id, s.ml)}</div>
              <div class="size-name">${s.name}</div>
              <div class="size-ml">${s.ml ? s.ml + ' ml' : 'livre'}</div>
            </button>`).join('')}
        </div>
        ${state.sizeId === 'custom' ? `
          <div class="custom-ml-row">
            <label for="custom-ml">Volume:</label>
            <input type="number" id="custom-ml" class="custom-ml-input"
                   value="${state.customMl}" min="50" max="1000" step="10" aria-label="Volume em ml">
            <span style="font-size:.85rem;color:var(--muted)">ml</span>
          </div>` : ''}
      </section>`;

  // ── Seção 2: intensity (hidden for espresso) ──
  const intensityWarning = state.intensityId === 'extra-forte' && state.methodId === 'prensa'
    ? `<p class="intensity-warning">⚠️ Para Prensa Francesa, recomendamos no máximo <strong>Forte (1:12)</strong> para evitar amargor excessivo.</p>`
    : '';
  const secao2 = isEspresso ? '' : `
      <section class="section">
        <h2 class="section-title">Intensidade</h2>
        <div class="intensity-group" role="group" aria-label="Intensidade" id="intensity-group">
          ${INTENSITIES.map(i => `
            <button class="intensity-btn ${i.id === state.intensityId ? 'selected' : ''}"
                    data-intensity="${i.id}" aria-pressed="${i.id === state.intensityId}"
                    style="--color:${i.color}; --bg-color:${i.bg}">
              <span class="intensity-dot"></span>
              <span class="intensity-name">${i.name}</span>
              ${i.id === state.intensityId ? `<span class="intensity-ratio">${i.ratio}</span>` : ''}
            </button>`).join('')}
        </div>
        ${intensityWarning}
      </section>`;

  // ── Recipe card ──
  const espressoGrinderWarning = isEspresso && grinder && !grinder.settings.espresso
    ? `<p class="espresso-grinder-warning">${grinder.espressoCapable === 'limited'
        ? `⚠️ ${grinder.name} pode fazer espresso apenas com cesta pressurizada. Resultado varia.`
        : `ℹ️ ${grinder.name} não é recomendado para espresso — moagem inconsistente nessa faixa.`}</p>`
    : '';

  const recipeCard = isEspresso
    ? `<div class="recipe-card">
        <h2 class="recipe-title">☕ Sua receita — Espresso</h2>
        <div class="recipe-grid">
          <div class="recipe-row">
            <span class="recipe-icon">🌿</span>
            <span class="recipe-label">Dose</span>
            <span class="recipe-value" id="val-dose">${recipe.dosePerShot}g × ${state.portions} = ${recipe.dose}g</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">💧</span>
            <span class="recipe-label">Yield</span>
            <span class="recipe-value" id="val-yield">${recipe.yieldPerShot}–${recipe.yieldPerShot + 4}ml × ${state.portions}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">📐</span>
            <span class="recipe-label">Moagem</span>
            <span class="recipe-value">${grinderDisplay.value}</span>
          </div>
          ${grinderDisplay.sub ? `
          <div class="recipe-row recipe-row-sub">
            <span class="recipe-icon"></span>
            <span class="recipe-label"></span>
            <span class="recipe-value-sub">${grinderDisplay.sub}</span>
          </div>` : ''}
          <div class="recipe-row">
            <span class="recipe-icon">⏱</span>
            <span class="recipe-label">Extração</span>
            <span class="recipe-value">25–30s</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">🌡️</span>
            <span class="recipe-label">Água</span>
            <span class="recipe-value">90–96°C</span>
          </div>
        </div>
        ${espressoGrinderWarning}
        <div class="recipe-actions">
          <button class="btn-start" id="btn-start">▶ Iniciar Preparo</button>
          <button class="btn-share" id="btn-share" aria-label="Compartilhar receita">🔗</button>
        </div>
      </div>`
    : `<div class="recipe-card">
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
            <span class="recipe-value">${grinderDisplay.value}</span>
          </div>
          ${grinderDisplay.sub ? `
          <div class="recipe-row recipe-row-sub">
            <span class="recipe-icon"></span>
            <span class="recipe-label"></span>
            <span class="recipe-value-sub">${grinderDisplay.sub}</span>
          </div>` : ''}
        </div>
        <div class="recipe-actions">
          <button class="btn-start" id="btn-start">▶ Iniciar Preparo</button>
          <button class="btn-share" id="btn-share" aria-label="Compartilhar receita">🔗</button>
        </div>
      </div>`;

  // ── Saiba mais (accordion) ──
  const espressoTips = isEspresso ? `
    <p class="acc-espresso-tip">⏱ <strong>25s = subextraído (azedo)</strong> · <strong>30s = ideal</strong> · <strong>>35s = sobrextraído (amargo)</strong></p>
    <p class="acc-espresso-tip">🔩 9 bar é o padrão. Máquinas domésticas de 15 bar devem usar menos café para compensar.</p>` : '';

  const calibrationTip = grinder
    ? `<p class="acc-calibration">🔧 <strong>${grinder.name}:</strong> ${method.calibration} Configuração para ${method.name}: <strong>${grinder.settings[state.methodId] || '—'} ${grinder.unit}</strong>.</p>`
    : '';

  document.getElementById('app').innerHTML = `
    <div class="config-screen" role="main">

      <header class="app-header">
        <div class="app-header-row">
          <div class="app-header-spacer"></div>
          <h1 class="app-title">☕ Coado</h1>
          <button class="btn-grinder-icon" id="btn-grinder-icon" title="Configurar moedor" aria-label="Configurar moedor">⚙️</button>
        </div>
        <p class="app-tagline">Seu café, do jeito certo.</p>
        <p class="app-version">v${APP_VERSION}</p>
      </header>

      ${grinderSection}

      <section class="section">
        <h2 class="section-title">Quantas ${isEspresso ? 'doses' : 'porções'}?</h2>
        <div class="portion-selector">
          <button class="btn-round" id="btn-minus" aria-label="Diminuir">−</button>
          <span class="portion-count" aria-live="polite">${state.portions}</span>
          <button class="btn-round" id="btn-plus" aria-label="Aumentar">+</button>
        </div>
      </section>

      ${secao1}
      ${secao2}

      <section class="section">
        <h2 class="section-title">Método de preparo</h2>
        <div class="method-grid" role="group" aria-label="Método de preparo" id="method-grid">
          ${Object.entries(METHODS).map(([id, m]) => `
            <button class="method-card ${id === state.methodId ? 'selected' : ''}"
                    data-method="${id}" aria-pressed="${id === state.methodId}">
              <div class="method-icon">${methodSVG(id)}</div>
              <div class="method-name">${m.name}</div>
            </button>`).join('')}
        </div>
        <div class="method-tip" role="status">${method.tip}</div>
      </section>

      <section class="section" aria-label="Sua receita">
        ${recipeCard}
      </section>

      <section class="section">
        <h2 class="section-title">Minhas notas — ${method.name}${isEspresso ? ' · ' + (state.shotType === 'duplo' ? 'Dose dupla' : 'Dose simples') : ' · ' + intensity.name}</h2>
        <textarea class="notes-area" id="notes-area"
                  placeholder="Anote ajustes, impressões, o que funcionou bem..."
                  rows="3">${escapeHtml(note)}</textarea>
      </section>

      <section class="section">
        <details class="accordion">
          <summary class="accordion-summary">💡 Saiba mais — ${method.name}</summary>
          <div class="accordion-body">
            <p class="acc-temp">🌡️ Temperatura ideal: <strong>${method.temp}</strong></p>
            <ol class="acc-steps">
              ${method.details.map(d => `<li>${d}</li>`).join('')}
            </ol>
            ${espressoTips}
            <p class="acc-organic">🌱 ${method.organic}</p>
            ${calibrationTip}
          </div>
        </details>
      </section>

      <section class="section">
        <details class="accordion">
          <summary class="accordion-summary">
            📋 Histórico${hist.length > 0 ? ` (${hist.length})` : ''}
          </summary>
          <div class="accordion-body">
            ${hist.length === 0
              ? `<p class="history-empty">Nenhum preparo registrado ainda.<br>Complete seu primeiro preparo para ver o histórico aqui.</p>`
              : `<div class="history-list" id="history-list">
                  ${hist.map((h, i) => {
                    const hI = INTENSITIES.find(x => x.id === h.intensityId);
                    const hM = METHODS[h.methodId];
                    const stars = h.rating ? ('⭐'.repeat(h.rating) + '☆'.repeat(5 - h.rating)) : '';
                    return `<div class="history-item" data-hist="${i}" role="button" tabindex="0">
                      <div class="history-item-top">
                        <span class="history-badge">${hM ? hM.name : h.methodId}</span>
                        ${h.methodId !== 'espresso' && hI ? `<span class="history-badge history-badge-intensity" style="--color:${hI.color}">${hI.name}</span>` : ''}
                        ${h.methodId === 'espresso' ? `<span class="history-badge" style="background:#4A2512">${h.shotType === 'simples' ? 'Simples' : 'Dupla'}</span>` : ''}
                        ${stars ? `<span class="history-stars">${stars}</span>` : ''}
                        <span class="history-date">${formatDate(h.ts)}</span>
                      </div>
                      <div class="history-item-info">
                        ${h.portions}× ${h.sizeName} · ${h.aguaTotal} ml · ${h.cafeG} g
                        ${h.duration ? `· ⏱ ${formatTime(h.duration)}` : ''}
                      </div>
                    </div>`;
                  }).join('')}
                </div>`}
          </div>
        </details>
      </section>

      <footer class="app-footer-version">Coado v${APP_VERSION}</footer>
    </div>`;

  bindConfigEvents();
}

function bindConfigEvents() {
  document.getElementById('btn-grinder-icon').addEventListener('click', () => {
    const section = document.getElementById('section-grinder');
    const accordion = document.getElementById('grinder-accordion');
    if (accordion && !accordion.open) accordion.open = true;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const grinderSearch = document.getElementById('grinder-search');
  if (grinderSearch) {
    grinderSearch.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      const btns = document.querySelectorAll('.grinder-btn[data-grinder]:not([data-grinder="none"])');
      let visible = 0;
      btns.forEach(btn => {
        const name = (GRINDERS[btn.dataset.grinder]?.name || '').toLowerCase();
        const show = !q || name.includes(q);
        btn.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      const noRes = document.getElementById('grinder-no-results');
      if (noRes) noRes.style.display = visible === 0 ? '' : 'none';
    });
  }

  const grinderGrid = document.getElementById('grinder-grid');
  if (grinderGrid) {
    grinderGrid.addEventListener('click', e => {
      const manualIcon = e.target.closest('[data-manual-url]');
      if (manualIcon) {
        e.stopPropagation();
        window.open(manualIcon.dataset.manualUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      const btn = e.target.closest('[data-grinder]');
      if (!btn) return;
      const id = btn.dataset.grinder;
      saveGrinder(id === 'none' ? null : id);
      const search = document.getElementById('grinder-search');
      if (search) search.value = '';
      document.querySelectorAll('.grinder-btn[data-grinder]').forEach(b => b.style.display = '');
      const noRes = document.getElementById('grinder-no-results');
      if (noRes) noRes.style.display = 'none';
      showToast(id === 'none' ? 'Sem moedor específico' : `${GRINDERS[id]?.name} selecionado!`);
      renderConfig();
    });
  }

  document.getElementById('btn-minus').addEventListener('click', () => {
    const max = METHODS[state.methodId].isEspresso ? 4 : 10;
    if (state.portions > 1) { state.portions--; saveState(); renderConfig(); }
  });
  document.getElementById('btn-plus').addEventListener('click', () => {
    const max = METHODS[state.methodId].isEspresso ? 4 : 10;
    if (state.portions < max) { state.portions++; saveState(); renderConfig(); }
  });

  // Shot selector (espresso)
  const shotCards = document.getElementById('shot-cards');
  if (shotCards) {
    shotCards.addEventListener('click', e => {
      const card = e.target.closest('[data-shot]');
      if (!card) return;
      state.shotType = card.dataset.shot;
      saveState(); renderConfig();
    });
  }

  // Size cards (filter)
  const sizeCardsEl = document.getElementById('size-cards');
  if (sizeCardsEl) {
    sizeCardsEl.addEventListener('click', e => {
      const card = e.target.closest('[data-size]');
      if (!card) return;
      state.sizeId = card.dataset.size;
      saveState(); renderConfig();
    });
  }

  const customInput = document.getElementById('custom-ml');
  if (customInput) {
    customInput.addEventListener('input', e => {
      state.customMl = parseInt(e.target.value) || 200;
      saveState(); refreshRecipe();
    });
  }

  const intensityGroup = document.getElementById('intensity-group');
  if (intensityGroup) {
    intensityGroup.addEventListener('click', e => {
      const btn = e.target.closest('[data-intensity]');
      if (!btn) return;
      state.intensityId = btn.dataset.intensity;
      saveState(); renderConfig();
    });
  }

  document.getElementById('method-grid').addEventListener('click', e => {
    const card = e.target.closest('[data-method]');
    if (!card) return;
    state.methodId = card.dataset.method;
    // When switching to espresso, cap portions at 4
    if (state.methodId === 'espresso' && state.portions > 4) state.portions = 4;
    saveState(); renderConfig();
  });

  document.getElementById('btn-start').addEventListener('click', () => {
    clearInterval(timerInterval);
    prepState = { stepIndex: 0, waiting: false, timeLeft: 0, stepOverride: {} };
    startGlobalTimer();
    renderPrep();
  });

  document.getElementById('btn-share').addEventListener('click', () => {
    const url = buildShareURL();
    copyToClipboard(url).then(ok => showToast(ok ? '🔗 Link copiado!' : 'Link: ' + url));
  });

  const notesArea = document.getElementById('notes-area');
  if (notesArea) {
    notesArea.addEventListener('input', e => {
      clearTimeout(noteSaveTimer);
      noteSaveTimer = setTimeout(() => saveNote(e.target.value), 600);
    });
  }

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
        methodId: h.methodId,
        intensityId: h.intensityId || DEFAULT.intensityId,
        sizeId: h.sizeId || DEFAULT.sizeId,
        customMl: h.customMl || DEFAULT.customMl,
        shotType: h.shotType || DEFAULT.shotType,
      });
      saveState(); renderConfig();
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
  const isEspresso = METHODS[state.methodId].isEspresso;
  // Usa override se o usuário ajustou o volume real despejado em etapas anteriores
  const pouredBefore = steps.slice(0, idx).reduce((s, st, i) => {
    const vol = prepState.stepOverride[i] !== undefined ? prepState.stepOverride[i] : (st.vol || 0);
    return s + vol;
  }, 0);
  const currentVol = prepState.stepOverride[idx] !== undefined ? prepState.stepOverride[idx] : (step.vol || 0);
  const remaining = (recipe.aguaTotal || 0) - pouredBefore - currentVol;

  let bodyHTML = '';
  if (prepState.waiting) {
    bodyHTML = `
      <div class="timer-display">
        <div class="timer-emoji">⏳</div>
        <div class="timer-label">Aguarde</div>
        <div class="timer-value" id="timer-value" aria-live="polite">${formatTime(prepState.timeLeft)}</div>
        <button class="btn-skip" id="btn-skip-wait">pular espera</button>
      </div>`;
  } else {
    const cumulativePoured = pouredBefore + currentVol;
    const hasOverride = prepState.stepOverride[idx] !== undefined;
    const volBar = step.vol && !isEspresso ? `
      <div class="step-volume">
        <div class="volume-bar-label">${currentVol} ml${hasOverride ? ' <span class="vol-adjusted">ajustado</span>' : ''}</div>
        <div class="volume-bar" role="progressbar" aria-valuenow="${cumulativePoured}" aria-valuemax="${recipe.aguaTotal}">
          <div class="volume-bar-fill" style="width:${Math.min(100, (cumulativePoured / recipe.aguaTotal) * 100).toFixed(1)}%"></div>
        </div>
      </div>
      <div class="pour-adjust">
        <button class="btn-pour-adj" id="btn-pour-minus" aria-label="Diminuir 5ml">−5ml</button>
        <span class="pour-adjust-label">Despejei exatamente</span>
        <button class="btn-pour-adj" id="btn-pour-plus" aria-label="Aumentar 5ml">+5ml</button>
      </div>
      <div class="step-meta">
        <span>Despejado até aqui: ${pouredBefore} ml</span>
        <span>Restante: ${Math.max(0, remaining)} ml · Total: ${recipe.aguaTotal} ml</span>
      </div>` : '';

    const hint = step.checklist
      ? `<p class="step-checklist-hint">Confirme quando finalizado</p>`
      : (step.wait && !step.vol ? `<p class="step-checklist-hint">⏳ Timer de ${step.waitLabel} será iniciado ao confirmar</p>` : '');

    bodyHTML = `${volBar}${hint}
      <div class="prep-actions">
        ${idx > 0 ? `<button class="btn-back" id="btn-back">← Voltar</button>` : '<span></span>'}
        <button class="btn-done" id="btn-done">${step.checklist ? '✓ Feito' : (isEspresso ? '✓ Pronto' : '✓ Despejei')}</button>
      </div>`;
  }

  document.getElementById('app').innerHTML = `
    <div class="prep-screen" role="main">
      <div class="prep-header">
        <button class="btn-close" id="btn-close" aria-label="Encerrar preparo">✕ Encerrar</button>
        <div class="prep-progress">ETAPA ${idx + 1} de ${total}</div>
        <div class="global-timer" id="global-timer">⏱ ${formatTime(getElapsed())}</div>
      </div>
      <div class="prep-step">
        <h2 class="step-name">${step.name}</h2>
        <p class="step-sub">${step.sub}</p>
        ${bodyHTML}
      </div>
      <footer class="app-footer-version">Coado v${APP_VERSION}</footer>
    </div>`;

  bindPrepEvents(steps);
}

function bindPrepEvents(steps) {
  document.getElementById('btn-close').addEventListener('click', () => {
    clearInterval(timerInterval); stopGlobalTimer();
    prepState = null; prepStartTime = null; renderConfig();
  });

  if (prepState.waiting) {
    document.getElementById('btn-skip-wait').addEventListener('click', () => {
      clearInterval(timerInterval); prepState.waiting = false; advanceStep(steps);
    });
    return;
  }

  const btnBack = document.getElementById('btn-back');
  if (btnBack) btnBack.addEventListener('click', () => {
    clearInterval(timerInterval); prepState.stepIndex--; prepState.waiting = false; renderPrep();
  });

  const btnPourMinus = document.getElementById('btn-pour-minus');
  if (btnPourMinus) btnPourMinus.addEventListener('click', () => {
    const step = steps[prepState.stepIndex];
    const cur = prepState.stepOverride[prepState.stepIndex] !== undefined
      ? prepState.stepOverride[prepState.stepIndex] : step.vol;
    prepState.stepOverride[prepState.stepIndex] = Math.max(0, cur - 5);
    renderPrep();
  });

  const btnPourPlus = document.getElementById('btn-pour-plus');
  if (btnPourPlus) btnPourPlus.addEventListener('click', () => {
    const step = steps[prepState.stepIndex];
    const cur = prepState.stepOverride[prepState.stepIndex] !== undefined
      ? prepState.stepOverride[prepState.stepIndex] : step.vol;
    prepState.stepOverride[prepState.stepIndex] = cur + 5;
    renderPrep();
  });

  document.getElementById('btn-done').addEventListener('click', () => {
    const step = steps[prepState.stepIndex];
    if (step.wait) {
      prepState.waiting = true; prepState.timeLeft = step.wait;
      renderPrep(); startCountdown(steps);
    } else { advanceStep(steps); }
  });
}

function advanceStep(steps) {
  prepState.stepIndex++; prepState.waiting = false;
  if (prepState.stepIndex >= steps.length) renderDone(); else renderPrep();
}

function startCountdown(steps) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    prepState.timeLeft--;
    const el = document.getElementById('timer-value');
    if (el) el.textContent = formatTime(prepState.timeLeft);
    if (prepState.timeLeft <= 0) {
      clearInterval(timerInterval); prepState.waiting = false; advanceStep(steps);
    }
  }, 1000);
}

// ─── RENDER DONE ──────────────────────────────────────────────────────────────

function renderDone() {
  clearInterval(timerInterval);
  const elapsed = getElapsed();
  stopGlobalTimer();
  saveToHistory(elapsed);

  const recipe = calcRecipe();
  const method = METHODS[state.methodId];
  const intensity = INTENSITIES.find(i => i.id === state.intensityId);
  const grinderId = loadGrinder();
  const grinderDisplay = getGrinderDisplay(grinderId, state.methodId);
  const note = getCurrentNote();
  const isEspresso = method.isEspresso;

  const noteLabel = isEspresso
    ? `Espresso · ${state.shotType === 'simples' ? 'Dose simples' : 'Dose dupla'}`
    : `${method.name} · ${intensity.name}`;

  const recipeRows = isEspresso ? `
    <div class="done-recipe-row"><span>Dose</span><strong>${recipe.dosePerShot}g × ${state.portions} = ${recipe.dose}g</strong></div>
    <div class="done-recipe-row"><span>Yield</span><strong>${recipe.yieldPerShot}–${recipe.yieldPerShot + 4}ml × ${state.portions}</strong></div>
    <div class="done-recipe-row"><span>Moagem</span><strong>${grinderDisplay.value}</strong></div>
    <div class="done-recipe-row"><span>Extração</span><strong>25–30s</strong></div>
    <div class="done-recipe-row"><span>Temperatura</span><strong>${method.temp}</strong></div>
  ` : `
    <div class="done-recipe-row"><span>Água</span><strong>${recipe.aguaTotal} ml</strong></div>
    <div class="done-recipe-row"><span>Café</span><strong>${recipe.cafeG} g</strong></div>
    <div class="done-recipe-row"><span>Moagem</span><strong>${grinderDisplay.value}</strong></div>
    <div class="done-recipe-row"><span>Tempo</span><strong>${method.time}</strong></div>
    <div class="done-recipe-row"><span>Temperatura</span><strong>${method.temp}</strong></div>
    ${!isEspresso ? `<div class="done-recipe-row"><span>Intensidade</span><strong>${intensity.name} (${intensity.ratio})</strong></div>` : ''}
  `;

  document.getElementById('app').innerHTML = `
    <div class="done-screen" role="main">
      <div class="done-emoji" aria-hidden="true">☕</div>
      <h2 class="done-title">Café pronto!</h2>
      <p class="done-msg">Bom proveito. 😊</p>
      ${elapsed > 0 ? `<p class="done-time">⏱ Preparo em: <strong>${formatTime(elapsed)}</strong></p>` : ''}

      <div class="done-recipe-card">
        <div class="done-recipe-title">${method.name}${!isEspresso ? ' · ' + intensity.name : ' · ' + (state.shotType === 'duplo' ? 'Dose dupla' : 'Dose simples')} · ${state.portions} porç.</div>
        ${recipeRows}
      </div>

      <div class="rating-group" id="rating-group">
        <p class="rating-label">Como ficou este café?</p>
        <div class="stars" id="stars" role="group" aria-label="Avaliação de 1 a 5 estrelas">
          ${[1,2,3,4,5].map(n =>
            `<button class="star-btn" data-star="${n}" aria-label="${n} estrela${n > 1 ? 's' : ''}">☆</button>`
          ).join('')}
        </div>
      </div>

      <div class="done-notes">
        <label class="done-notes-label" for="done-notes-area">Notas — ${noteLabel}</label>
        <textarea class="notes-area" id="done-notes-area"
                  placeholder="Como ficou? Algo para ajustar na próxima vez..."
                  rows="3">${escapeHtml(note)}</textarea>
      </div>

      <button class="btn-share-done" id="btn-share-done">🔗 Compartilhar esta receita</button>
      <button class="btn-restart" id="btn-restart">Fazer outro café</button>
      <footer class="app-footer-version">Coado v${APP_VERSION}</footer>
    </div>`;

  // Star rating
  const starsEl = document.getElementById('stars');
  if (starsEl) {
    starsEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-star]');
      if (!btn) return;
      const rating = parseInt(btn.dataset.star);
      starsEl.querySelectorAll('.star-btn').forEach((b, i) => {
        b.textContent = i < rating ? '⭐' : '☆';
        b.classList.toggle('active', i < rating);
      });
      saveRatingToHistory(rating);
      showToast(`Avaliação salva: ${'⭐'.repeat(rating)}`);
    });
  }

  const notesArea = document.getElementById('done-notes-area');
  if (notesArea) notesArea.addEventListener('input', e => {
    clearTimeout(noteSaveTimer);
    noteSaveTimer = setTimeout(() => saveNote(e.target.value), 600);
  });

  document.getElementById('btn-share-done').addEventListener('click', () => {
    const url = buildShareURL();
    copyToClipboard(url).then(ok => showToast(ok ? '🔗 Link copiado!' : 'Link: ' + url));
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    prepState = null; prepStartTime = null; renderConfig();
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

loadState();
renderConfig();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      // Verifica update ao app retornar ao foco (garante versão nova sem fechar o app)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update();
      });
    }).catch(() => {});

    // Quando o novo SW assume o controle, recarrega para servir os arquivos novos
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      location.reload();
    });
  });
}
