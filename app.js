'use strict';

const APP_VERSION = '3.6';
const CACHE = 'coado-v3.6';

// ─── LANGUAGES ────────────────────────────────────────────────────────────────

const LANGS = [
  { id: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr', imperial: false },
  { id: 'en', name: 'English',   flag: '🇺🇸', dir: 'ltr', imperial: true  },
  { id: 'es', name: 'Español',   flag: '🇪🇸', dir: 'ltr', imperial: false },
  { id: 'it', name: 'Italiano',  flag: '🇮🇹', dir: 'ltr', imperial: false },
  { id: 'ar', name: 'العربية',   flag: '🇸🇦', dir: 'rtl', imperial: false },
  { id: 'ja', name: '日本語',     flag: '🇯🇵', dir: 'ltr', imperial: false },
  { id: 'zh', name: '中文',       flag: '🇨🇳', dir: 'ltr', imperial: false },
  { id: 'ru', name: 'Русский',   flag: '🇷🇺', dir: 'ltr', imperial: false },
];


// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────

const T = {
  pt: {
    'tagline': 'Seu café, do jeito certo.',
    'sec.portions.filter': 'Quantas porções?',
    'sec.portions.espresso': 'Quantas doses?',
    'sec.size': 'Tamanho do recipiente',
    'sec.intensity': 'Intensidade',
    'sec.method': 'Método de preparo',
    'sec.notes': 'Minhas notas',
    'sec.learn': 'Saiba mais',
    'sec.history': 'Histórico',
    'size.xs': 'Xícara pequena',
    'size.sm': 'Xícara média',
    'size.md': 'Xícara grande',
    'size.lg': 'Copo americano',
    'size.xl': 'Caneca',
    'size.custom': 'Personalizado',
    'size.free': 'livre',
    'intensity.suave': 'Suave',
    'intensity.equilibrado': 'Equilibrado',
    'intensity.forte': 'Forte',
    'intensity.extra-forte': 'Extra Forte',
    'shot.duplo': 'Dose Dupla',
    'shot.simples': 'Dose Simples',
    'shot.standard': 'padrão',
    'lbl.agua': 'Água',
    'lbl.cafe': 'Café',
    'lbl.tempo': 'Tempo',
    'lbl.moagem': 'Moagem',
    'lbl.dose': 'Dose',
    'lbl.yield': 'Yield',
    'lbl.extracao': 'Extração',
    'lbl.temperatura': 'Temperatura',
    'lbl.intensidade': 'Intensidade',
    'lbl.porcoes': 'porç.',
    'lbl.volume': 'Volume:',
    'btn.start': '▶ Iniciar Preparo',
    'btn.share': '🔗 Compartilhar esta receita',
    'btn.restart': 'Fazer outro café',
    'prep.close': '✕ Encerrar',
    'prep.attack': 'ATAQUE',
    'prep.of': 'de',
    'prep.waiting': 'Aguarde',
    'prep.skip': 'pular espera',
    'prep.confirm.checklist': '✓ Feito',
    'prep.confirm.espresso': '✓ Pronto',
    'prep.confirm.pour': '✓ Despejei',
    'prep.hint.checklist': 'Confirme quando finalizado',
    'prep.hint.timer': '⏳ Timer de {time} será iniciado ao confirmar',
    'prep.back': '← Voltar',
    'pour.neste': 'neste ataque',
    'pour.adjusted': 'ajustado',
    'pour.adjust.label': 'Ajustar volume real',
    'pour.stats.poured': 'Já despejado',
    'pour.stats.after': 'Após este ataque',
    'pour.stats.remaining': 'Ainda falta',
    'pour.stats.total': 'Total',
    'done.title': 'Café pronto!',
    'done.msg': 'Bom proveito. 😊',
    'done.time.label': '⏱ Preparo em:',
    'done.rating.q': 'Como ficou este café?',
    'done.notes.placeholder': 'Como ficou? Algo para ajustar na próxima vez...',
    'hist.empty': 'Nenhum preparo registrado ainda.\nComplete seu primeiro preparo para ver o histórico aqui.',
    'hist.restore.toast': 'Receita restaurada!',
    'hist.delete.toast': 'Preparo removido.',
    'hist.delete.aria': 'Excluir este preparo',
    'grinder.title': 'Meu moedor',
    'grinder.optional': '· opcional',
    'grinder.search': '🔍  Buscar moedor...',
    'grinder.none': 'Sem moedor específico',
    'grinder.none.unit': 'descrição genérica',
    'grinder.note': '⚠️ Valores são pontos de partida — ajuste ±2–3 conforme o resultado na xícara.',
    'grinder.no.results': 'Nenhum moedor encontrado — use "Sem moedor específico"',
    'grinder.summary': '⚙️ Moedor:',
    'warn.prensa': '⚠️ Para Prensa Francesa, recomendamos no máximo <strong>Forte (1:12)</strong> para evitar amargor excessivo.',
    'method.chemex.tip': 'Moagem média-grossa. Despeje lentamente. ~4 min',
    'method.v60.tip': 'Moagem média-fina. Despeje em espiral. ~3 min',
    'method.pano.tip': 'Moagem média. Tradicional e ideal para café orgânico',
    'method.prensa.tip': 'Moagem grossa. Aguarde 4 min antes de pressionar',
    'method.espresso.tip': 'Moagem fina. Dose + extração em 25–30s.',
    'method.chemex.grind': 'Média-grossa',
    'method.v60.grind': 'Média-fina',
    'method.pano.grind': 'Média',
    'method.prensa.grind': 'Grossa',
    'method.espresso.grind': 'Fina',
    'method.chemex.d0': 'Use o filtro Chemex dobrado com 3 camadas voltadas para o bico',
    'method.chemex.d1': 'Pré-aqueça com água quente e descarte',
    'method.chemex.d2': 'Bloom: despeje o dobro do peso do café, aguarde 45s',
    'method.chemex.d3': 'Continue despejando em pulsos lentos e circulares',
    'method.chemex.d4': 'Drenagem total leva cerca de 4 min',
    'method.chemex.organic': 'O filtro espesso da Chemex remove mais óleos, resultando numa bebida mais limpa e delicada.',
    'method.chemex.calibration': 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
    'method.v60.d0': 'Dobre o filtro e pré-aqueça o V60 com água quente',
    'method.v60.d1': 'Adicione o café moído e nivele levemente',
    'method.v60.d2': 'Bloom: despeje o dobro do peso do café, aguarde 30–45s',
    'method.v60.d3': 'Continue despejando em espiral do centro para fora em 2 pulsos',
    'method.v60.d4': 'Aguarde a drenagem completa (~3 min no total)',
    'method.v60.organic': 'Cafés orgânicos naturais têm notas frutadas — evite água acima de 94°C para preservar o aroma.',
    'method.v60.calibration': 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
    'method.pano.d0': 'Lave bem o coador de pano antes de usar',
    'method.pano.d1': 'Adicione o café moído e posicione sobre o recipiente',
    'method.pano.d2': 'Bloom: umedeça todo o café e aguarde 30s',
    'method.pano.d3': 'Despeje o restante em movimentos circulares suaves e contínuos',
    'method.pano.d4': 'Não apresse — deixe filtrar naturalmente',
    'method.pano.organic': 'O coador de pano preserva mais óleos que papel, realçando a doçura e o corpo de cafés orgânicos.',
    'method.pano.calibration': 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados em sentido anti-horário.',
    'method.prensa.d0': 'Pré-aqueça o cilindro com água quente e descarte',
    'method.prensa.d1': 'Adicione o café moído grosso',
    'method.prensa.d2': 'Despeje toda a água de uma vez',
    'method.prensa.d3': 'Mexa suavemente por 10 segundos',
    'method.prensa.d4': 'Coloque a tampa sem pressionar e aguarde 4 minutos',
    'method.prensa.d5': 'Pressione o êmbolo lentamente e sirva imediatamente',
    'method.prensa.organic': 'A imersão completa da prensa francesa extrai mais óleos e intensidade de cafés orgânicos.',
    'method.prensa.calibration': 'Feche o moedor completamente (sem forçar), depois abra os cliques recomendados. Use mais cliques do que parece necessário — moagem grossa mesmo.',
    'method.espresso.d0': 'Aqueça a máquina e o portafiltro por pelo menos 10 min',
    'method.espresso.d1': 'Dose o café no portafiltro e distribua uniformemente',
    'method.espresso.d2': 'Tampe com pressão firme e uniforme (~15 kg de força)',
    'method.espresso.d3': 'Encaixe o portafiltro e inicie a extração imediatamente',
    'method.espresso.d4': 'Observe o fluxo: ideal começa em 6–8s após o início',
    'method.espresso.d5': 'Pare a extração em 25–30s ou ao atingir o volume alvo',
    'method.espresso.organic': 'Cafés orgânicos de torra média produzem espressos mais doces e equilibrados. Evite torras muito escuras que mascaram as notas originais.',
    'method.espresso.calibration': 'Para espresso: 1 clique mais fino = extração mais lenta e mais amarga. 1 clique mais grosso = mais rápida e mais azeda. Ajuste 1 clique por vez.',
    'step.bloom': 'Bloom',
    'step.bloom.sub.co2': 'Liberar CO₂',
    'step.bloom.sub.wake': 'Liberar CO₂, despertar o café',
    'step.chemex.pour1': 'Primeiro Despeje',
    'step.chemex.pour1.sub': 'Extração inicial, doçura',
    'step.chemex.pour2': 'Segundo Despeje',
    'step.chemex.pour2.sub': 'Corpo e acidez balanceada',
    'step.chemex.pour3': 'Terceiro Despeje',
    'step.chemex.pour3.sub': 'Finalização e ajuste de volume',
    'step.v60.pour1': 'Primeiro Despeje',
    'step.v60.pour1.sub': 'Doçura e corpo',
    'step.v60.pour2': 'Segundo Despeje',
    'step.v60.pour2.sub': 'Acidez e complexidade',
    'step.v60.pour3': 'Despeje Final',
    'step.v60.pour3.sub': 'Equilíbrio e volume',
    'step.pano.main': 'Despeje Principal',
    'step.pano.main.sub': 'Extração principal',
    'step.pano.final': 'Despeje Final',
    'step.pano.final.sub': 'Volume e equilíbrio',
    'step.prensa.add': 'Adicionar café',
    'step.prensa.add.sub': 'Coloque o café moído grosso no cilindro',
    'step.prensa.water': 'Despejar água',
    'step.prensa.water.sub.template': 'Despeje todo o volume ({vol}) de uma vez',
    'step.prensa.stir': 'Mexer',
    'step.prensa.stir.sub': 'Mexa suavemente por 10 segundos',
    'step.prensa.wait': 'Aguardar',
    'step.prensa.wait.sub': 'Coloque a tampa sem pressionar',
    'step.prensa.press': 'Pressionar',
    'step.prensa.press.sub': 'Pressione o êmbolo lentamente até o fundo',
    'step.prensa.serve': 'Servir',
    'step.prensa.serve.sub': 'Sirva imediatamente para evitar extração excessiva',
    'step.espresso.heat': 'Aquecer',
    'step.espresso.heat.sub': 'Aqueça a máquina e o portafiltro',
    'step.espresso.dose': 'Dosar',
    'step.espresso.dose.sub.template': 'Coloque {dose}g de café moído fino no portafiltro',
    'step.espresso.distribute': 'Distribuir',
    'step.espresso.distribute.sub': 'Distribua o café uniformemente (WDT ou tap suave)',
    'step.espresso.tamp': 'Tampar',
    'step.espresso.tamp.sub': 'Tampe com pressão firme e uniforme (~15 kg)',
    'step.espresso.extract': 'Extrair',
    'step.espresso.extract.sub.template': 'Inicie a extração — alvo: {yield}ml em 25–30s',
    'step.espresso.serve': 'Servir',
    'step.espresso.serve.sub': 'Sirva imediatamente',
    'recipe.title.filter': '☕ Sua receita',
    'recipe.title.espresso': '☕ Sua receita — Espresso',
    'step.pano.bloom.sub': 'Umedecer o café',
    'method.pano.name': 'Coador de pano',
    'method.prensa.name': 'Prensa Francesa',
  },
  en: {
    'tagline': 'Your coffee, the right way.',
    'sec.portions.filter': 'How many portions?',
    'sec.portions.espresso': 'How many shots?',
    'sec.size': 'Cup size',
    'sec.intensity': 'Intensity',
    'sec.method': 'Brewing method',
    'sec.notes': 'My notes',
    'sec.learn': 'Learn more',
    'sec.history': 'History',
    'size.xs': 'Small cup',
    'size.sm': 'Medium cup',
    'size.md': 'Large cup',
    'size.lg': 'Tumbler',
    'size.xl': 'Mug',
    'size.custom': 'Custom',
    'size.free': 'free',
    'intensity.suave': 'Light',
    'intensity.equilibrado': 'Balanced',
    'intensity.forte': 'Strong',
    'intensity.extra-forte': 'Extra Strong',
    'shot.duplo': 'Double Shot',
    'shot.simples': 'Single Shot',
    'shot.standard': 'standard',
    'lbl.agua': 'Water',
    'lbl.cafe': 'Coffee',
    'lbl.tempo': 'Time',
    'lbl.moagem': 'Grind',
    'lbl.dose': 'Dose',
    'lbl.yield': 'Yield',
    'lbl.extracao': 'Extraction',
    'lbl.temperatura': 'Temperature',
    'lbl.intensidade': 'Intensity',
    'lbl.porcoes': 'serv.',
    'lbl.volume': 'Volume:',
    'btn.start': '▶ Start Brewing',
    'btn.share': '🔗 Share this recipe',
    'btn.restart': 'Brew another',
    'prep.close': '✕ Stop',
    'prep.attack': 'POUR',
    'prep.of': 'of',
    'prep.waiting': 'Wait',
    'prep.skip': 'skip wait',
    'prep.confirm.checklist': '✓ Done',
    'prep.confirm.espresso': '✓ Ready',
    'prep.confirm.pour': '✓ Poured',
    'prep.hint.checklist': 'Confirm when done',
    'prep.hint.timer': '⏳ {time} timer will start on confirm',
    'prep.back': '← Back',
    'pour.neste': 'this pour',
    'pour.adjusted': 'adjusted',
    'pour.adjust.label': 'Adjust actual amount',
    'pour.stats.poured': 'Already poured',
    'pour.stats.after': 'After this pour',
    'pour.stats.remaining': 'Still to go',
    'pour.stats.total': 'Total',
    'done.title': 'Coffee ready!',
    'done.msg': 'Enjoy! 😊',
    'done.time.label': '⏱ Brewed in:',
    'done.rating.q': 'How was this coffee?',
    'done.notes.placeholder': 'How was it? Anything to adjust next time...',
    'hist.empty': 'No brews recorded yet.\nComplete your first brew to see history here.',
    'hist.restore.toast': 'Recipe restored!',
    'hist.delete.toast': 'Brew removed.',
    'hist.delete.aria': 'Delete this brew',
    'grinder.title': 'My grinder',
    'grinder.optional': '· optional',
    'grinder.search': '🔍  Search grinder...',
    'grinder.none': 'No specific grinder',
    'grinder.none.unit': 'generic description',
    'grinder.note': '⚠️ Values are starting points — adjust ±2–3 based on your cup.',
    'grinder.no.results': 'No grinder found — use "No specific grinder"',
    'grinder.summary': '⚙️ Grinder:',
    'warn.prensa': '⚠️ For French Press, we recommend max <strong>Strong (1:12)</strong> to avoid excessive bitterness.',
    'method.chemex.tip': 'Medium-coarse grind. Pour slowly. ~4 min',
    'method.v60.tip': 'Medium-fine grind. Pour in spirals. ~3 min',
    'method.pano.tip': 'Medium grind. Traditional and ideal for organic coffee',
    'method.prensa.tip': 'Coarse grind. Wait 4 min before pressing',
    'method.espresso.tip': 'Fine grind. Dose + extraction in 25–30s.',
    'method.chemex.grind': 'Medium-coarse',
    'method.v60.grind': 'Medium-fine',
    'method.pano.grind': 'Medium',
    'method.prensa.grind': 'Coarse',
    'method.espresso.grind': 'Fine',
    'method.chemex.d0': 'Use the Chemex filter folded with 3 layers facing the spout',
    'method.chemex.d1': 'Pre-rinse with hot water and discard',
    'method.chemex.d2': 'Bloom: pour twice the coffee weight, wait 45s',
    'method.chemex.d3': 'Continue pouring in slow, circular pulses',
    'method.chemex.d4': 'Full drainage takes about 4 min',
    'method.chemex.organic': 'The thick Chemex filter removes more oils, resulting in a cleaner, more delicate cup.',
    'method.chemex.calibration': 'Close the grinder completely (without forcing), then open the recommended clicks counterclockwise.',
    'method.v60.d0': 'Fold the filter and pre-rinse the V60 with hot water',
    'method.v60.d1': 'Add ground coffee and level gently',
    'method.v60.d2': 'Bloom: pour twice the coffee weight, wait 30–45s',
    'method.v60.d3': 'Pour in spirals from center outward in 2 pulses',
    'method.v60.d4': 'Wait for full drainage (~3 min total)',
    'method.v60.organic': 'Natural organic coffees have fruity notes — avoid water above 94°C to preserve aroma.',
    'method.v60.calibration': 'Close the grinder completely (without forcing), then open the recommended clicks counterclockwise.',
    'method.pano.d0': 'Wash the cloth filter well before use',
    'method.pano.d1': 'Add ground coffee and position over the vessel',
    'method.pano.d2': 'Bloom: wet all the coffee and wait 30s',
    'method.pano.d3': 'Pour the rest in gentle, continuous circular movements',
    'method.pano.d4': "Don't rush — let it filter naturally",
    'method.pano.organic': 'The cloth filter preserves more oils than paper, enhancing the sweetness and body of organic coffees.',
    'method.pano.calibration': 'Close the grinder completely (without forcing), then open the recommended clicks counterclockwise.',
    'method.prensa.d0': 'Pre-heat the cylinder with hot water and discard',
    'method.prensa.d1': 'Add coarse ground coffee',
    'method.prensa.d2': 'Pour all the water at once',
    'method.prensa.d3': 'Stir gently for 10 seconds',
    'method.prensa.d4': 'Place the lid without pressing and wait 4 minutes',
    'method.prensa.d5': 'Press the plunger slowly and serve immediately',
    'method.prensa.organic': 'Full immersion of the French press extracts more oils and intensity from organic coffees.',
    'method.prensa.calibration': 'Close the grinder completely (without forcing), then open the recommended clicks. Use more clicks than seems necessary — truly coarse grind.',
    'method.espresso.d0': 'Heat the machine and portafilter for at least 10 min',
    'method.espresso.d1': 'Dose coffee in portafilter and distribute evenly',
    'method.espresso.d2': 'Tamp with firm, even pressure (~15 kg of force)',
    'method.espresso.d3': 'Lock in portafilter and start extraction immediately',
    'method.espresso.d4': 'Watch the flow: ideal starts 6–8s after beginning',
    'method.espresso.d5': 'Stop extraction at 25–30s or at target volume',
    'method.espresso.organic': 'Organic medium-roast coffees produce sweeter, more balanced espressos. Avoid very dark roasts that mask the original notes.',
    'method.espresso.calibration': 'For espresso: 1 click finer = slower, more bitter. 1 click coarser = faster, more sour. Adjust 1 click at a time.',
    'step.bloom': 'Bloom',
    'step.bloom.sub.co2': 'Release CO₂',
    'step.bloom.sub.wake': 'Release CO₂, awaken the coffee',
    'step.chemex.pour1': 'First Pour',
    'step.chemex.pour1.sub': 'Initial extraction, sweetness',
    'step.chemex.pour2': 'Second Pour',
    'step.chemex.pour2.sub': 'Body and balanced acidity',
    'step.chemex.pour3': 'Third Pour',
    'step.chemex.pour3.sub': 'Finish and volume adjustment',
    'step.v60.pour1': 'First Pour',
    'step.v60.pour1.sub': 'Sweetness and body',
    'step.v60.pour2': 'Second Pour',
    'step.v60.pour2.sub': 'Acidity and complexity',
    'step.v60.pour3': 'Final Pour',
    'step.v60.pour3.sub': 'Balance and volume',
    'step.pano.main': 'Main Pour',
    'step.pano.main.sub': 'Main extraction',
    'step.pano.final': 'Final Pour',
    'step.pano.final.sub': 'Volume and balance',
    'step.prensa.add': 'Add coffee',
    'step.prensa.add.sub': 'Put coarse ground coffee in the cylinder',
    'step.prensa.water': 'Add water',
    'step.prensa.water.sub.template': 'Pour all {vol} at once',
    'step.prensa.stir': 'Stir',
    'step.prensa.stir.sub': 'Stir gently for 10 seconds',
    'step.prensa.wait': 'Wait',
    'step.prensa.wait.sub': 'Place the lid without pressing',
    'step.prensa.press': 'Press',
    'step.prensa.press.sub': 'Press the plunger slowly to the bottom',
    'step.prensa.serve': 'Serve',
    'step.prensa.serve.sub': 'Serve immediately to avoid over-extraction',
    'step.espresso.heat': 'Heat up',
    'step.espresso.heat.sub': 'Heat the machine and portafilter',
    'step.espresso.dose': 'Dose',
    'step.espresso.dose.sub.template': 'Put {dose}g of fine ground coffee in the portafilter',
    'step.espresso.distribute': 'Distribute',
    'step.espresso.distribute.sub': 'Distribute coffee evenly (WDT or gentle tap)',
    'step.espresso.tamp': 'Tamp',
    'step.espresso.tamp.sub': 'Tamp with firm, even pressure (~15 kg)',
    'step.espresso.extract': 'Extract',
    'step.espresso.extract.sub.template': 'Start extraction — target: {yield}ml in 25–30s',
    'step.espresso.serve': 'Serve',
    'step.espresso.serve.sub': 'Serve immediately',
    'recipe.title.filter': '☕ Your recipe',
    'recipe.title.espresso': '☕ Your recipe — Espresso',
    'step.pano.bloom.sub': 'Wet the coffee',
    'method.pano.name': 'Cloth Filter',
    'method.prensa.name': 'French Press',
  },
  es: {
    'tagline': 'Tu café, como debe ser.',
    'sec.portions.filter': '¿Cuántas porciones?',
    'sec.portions.espresso': '¿Cuántos shots?',
    'sec.size': 'Tamaño del recipiente',
    'sec.intensity': 'Intensidad',
    'sec.method': 'Método de preparación',
    'sec.notes': 'Mis notas',
    'sec.learn': 'Saber más',
    'sec.history': 'Historial',
    'size.xs': 'Taza pequeña',
    'size.sm': 'Taza mediana',
    'size.md': 'Taza grande',
    'size.lg': 'Vaso americano',
    'size.xl': 'Tazón',
    'size.custom': 'Personalizado',
    'size.free': 'libre',
    'intensity.suave': 'Suave',
    'intensity.equilibrado': 'Equilibrado',
    'intensity.forte': 'Fuerte',
    'intensity.extra-forte': 'Extra Fuerte',
    'shot.duplo': 'Doble',
    'shot.simples': 'Simple',
    'shot.standard': 'estándar',
    'lbl.agua': 'Agua',
    'lbl.cafe': 'Café',
    'lbl.tempo': 'Tiempo',
    'lbl.moagem': 'Molienda',
    'lbl.dose': 'Dosis',
    'lbl.yield': 'Rendimiento',
    'lbl.extracao': 'Extracción',
    'lbl.temperatura': 'Temperatura',
    'lbl.intensidade': 'Intensidad',
    'lbl.porcoes': 'porc.',
    'lbl.volume': 'Volumen:',
    'btn.start': '▶ Iniciar',
    'btn.share': '🔗 Compartir receta',
    'btn.restart': 'Hacer otro café',
    'prep.close': '✕ Detener',
    'prep.attack': 'VERTIDA',
    'prep.of': 'de',
    'prep.waiting': 'Espera',
    'prep.skip': 'omitir espera',
    'prep.confirm.checklist': '✓ Hecho',
    'prep.confirm.espresso': '✓ Listo',
    'prep.confirm.pour': '✓ Vertí',
    'prep.hint.checklist': 'Confirma cuando termine',
    'prep.hint.timer': '⏳ El temporizador de {time} iniciará al confirmar',
    'prep.back': '← Volver',
    'pour.neste': 'en esta vertida',
    'pour.adjusted': 'ajustado',
    'pour.adjust.label': 'Ajustar volumen real',
    'pour.stats.poured': 'Ya vertido',
    'pour.stats.after': 'Tras esta vertida',
    'pour.stats.remaining': 'Aún falta',
    'pour.stats.total': 'Total',
    'done.title': '¡Café listo!',
    'done.msg': '¡Que aproveche! 😊',
    'done.time.label': '⏱ Preparado en:',
    'done.rating.q': '¿Qué tal este café?',
    'done.notes.placeholder': '¿Qué tal? ¿Algo que ajustar?',
    'hist.empty': 'Ningún preparo registrado aún.\nCompleta tu primer café para ver el historial.',
    'hist.restore.toast': '¡Receta restaurada!',
    'hist.delete.toast': 'Preparo eliminado.',
    'hist.delete.aria': 'Eliminar este preparo',
    'grinder.title': 'Mi molinillo',
    'grinder.optional': '· opcional',
    'grinder.search': '🔍  Buscar molinillo...',
    'grinder.none': 'Sin molinillo específico',
    'grinder.none.unit': 'descripción genérica',
    'grinder.note': '⚠️ Los valores son puntos de partida — ajusta ±2–3 según el resultado.',
    'grinder.no.results': 'Sin resultados — usa "Sin molinillo específico"',
    'grinder.summary': '⚙️ Molinillo:',
    'warn.prensa': '⚠️ Para prensa francesa, recomendamos máximo <strong>Fuerte (1:12)</strong> para evitar amargura excesiva.',
    'method.chemex.tip': 'Molido medio-grueso. Vierte despacio. ~4 min',
    'method.v60.tip': 'Molido medio-fino. Vierte en espiral. ~3 min',
    'method.pano.tip': 'Molido medio. Tradicional e ideal para café orgánico',
    'method.prensa.tip': 'Molido grueso. Espera 4 min antes de presionar',
    'method.espresso.tip': 'Molido fino. Dosis + extracción en 25–30s.',
    'method.chemex.grind': 'Medio-grueso',
    'method.v60.grind': 'Medio-fino',
    'method.pano.grind': 'Medio',
    'method.prensa.grind': 'Grueso',
    'method.espresso.grind': 'Fino',
    'method.chemex.d0': 'Usa el filtro Chemex doblado con 3 capas hacia el pico',
    'method.chemex.d1': 'Pre-enjuaga con agua caliente y desecha',
    'method.chemex.d2': 'Bloom: vierte el doble del peso del café, espera 45s',
    'method.chemex.d3': 'Continúa vertiendo en pulsos lentos y circulares',
    'method.chemex.d4': 'El drenaje completo tarda unos 4 min',
    'method.chemex.organic': 'El grueso filtro de Chemex elimina más aceites, resultando en una bebida más limpia y delicada.',
    'method.chemex.calibration': 'Cierra el molinillo completamente (sin forzar), luego abre los clics recomendados en sentido antihorario.',
    'method.v60.d0': 'Dobla el filtro y calienta el V60 con agua caliente',
    'method.v60.d1': 'Añade el café molido y nivela suavemente',
    'method.v60.d2': 'Bloom: vierte el doble del peso del café, espera 30–45s',
    'method.v60.d3': 'Vierte en espiral del centro hacia fuera en 2 pulsos',
    'method.v60.d4': 'Espera el drenaje completo (~3 min total)',
    'method.v60.organic': 'Los cafés orgánicos naturales tienen notas frutales — evita agua por encima de 94°C.',
    'method.v60.calibration': 'Cierra el molinillo completamente (sin forzar), luego abre los clics recomendados en sentido antihorario.',
    'method.pano.d0': 'Lava bien el filtro de tela antes de usar',
    'method.pano.d1': 'Añade el café molido y posiciónalo sobre el recipiente',
    'method.pano.d2': 'Bloom: humedece todo el café y espera 30s',
    'method.pano.d3': 'Vierte el resto con movimientos circulares suaves y continuos',
    'method.pano.d4': 'No apresures — deja que filtre naturalmente',
    'method.pano.organic': 'El filtro de tela conserva más aceites que el papel, realzando la dulzura y el cuerpo de los cafés orgánicos.',
    'method.pano.calibration': 'Cierra el molinillo completamente (sin forzar), luego abre los clics recomendados en sentido antihorario.',
    'method.prensa.d0': 'Pre-calienta el cilindro con agua caliente y deséchala',
    'method.prensa.d1': 'Añade el café molido grueso',
    'method.prensa.d2': 'Vierte toda el agua de una vez',
    'method.prensa.d3': 'Mezcla suavemente durante 10 segundos',
    'method.prensa.d4': 'Pon la tapa sin presionar y espera 4 minutos',
    'method.prensa.d5': 'Presiona el émbolo lentamente y sirve inmediatamente',
    'method.prensa.organic': 'La inmersión completa de la prensa francesa extrae más aceites e intensidad de los cafés orgánicos.',
    'method.prensa.calibration': 'Cierra el molinillo completamente (sin forzar), luego abre los clics recomendados. Usa más clics de los que parecen necesarios — molido grueso de verdad.',
    'method.espresso.d0': 'Calienta la máquina y el portafiltro al menos 10 min',
    'method.espresso.d1': 'Dosa el café en el portafiltro y distribuye uniformemente',
    'method.espresso.d2': 'Tampea con presión firme y uniforme (~15 kg de fuerza)',
    'method.espresso.d3': 'Encaja el portafiltro e inicia la extracción inmediatamente',
    'method.espresso.d4': 'Observa el flujo: lo ideal empieza 6–8s después del inicio',
    'method.espresso.d5': 'Detén la extracción en 25–30s o al alcanzar el volumen objetivo',
    'method.espresso.organic': 'Los cafés orgánicos de tueste medio producen espressos más dulces y equilibrados. Evita tuestes muy oscuros que enmascaren las notas originales.',
    'method.espresso.calibration': 'Para espresso: 1 clic más fino = extracción más lenta y amarga. 1 clic más grueso = más rápida y ácida. Ajusta 1 clic a la vez.',
    'step.bloom': 'Bloom',
    'step.bloom.sub.co2': 'Liberar CO₂',
    'step.bloom.sub.wake': 'Liberar CO₂, despertar el café',
    'step.chemex.pour1': 'Primera Vertida',
    'step.chemex.pour1.sub': 'Extracción inicial, dulzura',
    'step.chemex.pour2': 'Segunda Vertida',
    'step.chemex.pour2.sub': 'Cuerpo y acidez equilibrada',
    'step.chemex.pour3': 'Tercera Vertida',
    'step.chemex.pour3.sub': 'Finalización y ajuste de volumen',
    'step.v60.pour1': 'Primera Vertida',
    'step.v60.pour1.sub': 'Dulzura y cuerpo',
    'step.v60.pour2': 'Segunda Vertida',
    'step.v60.pour2.sub': 'Acidez y complejidad',
    'step.v60.pour3': 'Vertida Final',
    'step.v60.pour3.sub': 'Equilibrio y volumen',
    'step.pano.main': 'Vertida Principal',
    'step.pano.main.sub': 'Extracción principal',
    'step.pano.final': 'Vertida Final',
    'step.pano.final.sub': 'Volumen y equilibrio',
    'step.prensa.add': 'Añadir café',
    'step.prensa.add.sub': 'Pon el café molido grueso en el cilindro',
    'step.prensa.water': 'Añadir agua',
    'step.prensa.water.sub.template': 'Vierte todo el volumen ({vol}) de una vez',
    'step.prensa.stir': 'Mezclar',
    'step.prensa.stir.sub': 'Mezcla suavemente durante 10 segundos',
    'step.prensa.wait': 'Esperar',
    'step.prensa.wait.sub': 'Pon la tapa sin presionar',
    'step.prensa.press': 'Presionar',
    'step.prensa.press.sub': 'Presiona el émbolo lentamente hasta el fondo',
    'step.prensa.serve': 'Servir',
    'step.prensa.serve.sub': 'Sirve inmediatamente para evitar la sobre-extracción',
    'step.espresso.heat': 'Calentar',
    'step.espresso.heat.sub': 'Calienta la máquina y el portafiltro',
    'step.espresso.dose': 'Dosificar',
    'step.espresso.dose.sub.template': 'Pon {dose}g de café molido fino en el portafiltro',
    'step.espresso.distribute': 'Distribuir',
    'step.espresso.distribute.sub': 'Distribuye el café uniformemente (WDT o golpecito suave)',
    'step.espresso.tamp': 'Tampar',
    'step.espresso.tamp.sub': 'Tampea con presión firme y uniforme (~15 kg)',
    'step.espresso.extract': 'Extraer',
    'step.espresso.extract.sub.template': 'Inicia la extracción — objetivo: {yield}ml en 25–30s',
    'step.espresso.serve': 'Servir',
    'step.espresso.serve.sub': 'Sirve inmediatamente',
    'recipe.title.filter': '☕ Tu receta',
    'recipe.title.espresso': '☕ Tu receta — Espresso',
    'step.pano.bloom.sub': 'Humedecer el café',
    'method.pano.name': 'Filtro de tela',
    'method.prensa.name': 'Prensa Francesa',
  },
  it: {
    'tagline': 'Il tuo caffè, nel modo giusto.',
    'sec.portions.filter': 'Quante porzioni?',
    'sec.portions.espresso': 'Quanti shot?',
    'sec.size': 'Dimensione tazza',
    'sec.intensity': 'Intensità',
    'sec.method': 'Metodo di preparazione',
    'sec.notes': 'Le mie note',
    'sec.learn': 'Scopri di più',
    'sec.history': 'Storico',
    'size.xs': 'Tazza piccola',
    'size.sm': 'Tazza media',
    'size.md': 'Tazza grande',
    'size.lg': 'Bicchiere americano',
    'size.xl': 'Mug',
    'size.custom': 'Personalizzato',
    'size.free': 'libero',
    'intensity.suave': 'Delicato',
    'intensity.equilibrado': 'Equilibrato',
    'intensity.forte': 'Forte',
    'intensity.extra-forte': 'Extra Forte',
    'shot.duplo': 'Doppio',
    'shot.simples': 'Singolo',
    'shot.standard': 'standard',
    'lbl.agua': 'Acqua',
    'lbl.cafe': 'Caffè',
    'lbl.tempo': 'Tempo',
    'lbl.moagem': 'Macinatura',
    'lbl.dose': 'Dose',
    'lbl.yield': 'Resa',
    'lbl.extracao': 'Estrazione',
    'lbl.temperatura': 'Temperatura',
    'lbl.intensidade': 'Intensità',
    'lbl.porcoes': 'porz.',
    'lbl.volume': 'Volume:',
    'btn.start': '▶ Inizia',
    'btn.share': '🔗 Condividi ricetta',
    'btn.restart': 'Altro caffè',
    'prep.close': '✕ Ferma',
    'prep.attack': 'VERSAMENTO',
    'prep.of': 'di',
    'prep.waiting': 'Attendi',
    'prep.skip': 'salta attesa',
    'prep.confirm.checklist': '✓ Fatto',
    'prep.confirm.espresso': '✓ Pronto',
    'prep.confirm.pour': '✓ Versato',
    'prep.hint.checklist': 'Conferma quando finito',
    'prep.hint.timer': '⏳ Timer di {time} partirà alla conferma',
    'prep.back': '← Indietro',
    'pour.neste': 'in questo versamento',
    'pour.adjusted': 'aggiustato',
    'pour.adjust.label': 'Regola volume reale',
    'pour.stats.poured': 'Già versato',
    'pour.stats.after': 'Dopo questo versamento',
    'pour.stats.remaining': 'Ancora da versare',
    'pour.stats.total': 'Totale',
    'done.title': 'Caffè pronto!',
    'done.msg': 'Buon caffè! 😊',
    'done.time.label': '⏱ Preparato in:',
    'done.rating.q': "Com'era questo caffè?",
    'done.notes.placeholder': "Com'è andata? Qualcosa da aggiustare?",
    'hist.empty': 'Nessuna preparazione registrata.\nCompleta la prima per vedere lo storico.',
    'hist.restore.toast': 'Ricetta ripristinata!',
    'hist.delete.toast': 'Preparazione rimossa.',
    'hist.delete.aria': 'Elimina questa preparazione',
    'grinder.title': 'Il mio macinacaffè',
    'grinder.optional': '· opzionale',
    'grinder.search': '🔍  Cerca macinacaffè...',
    'grinder.none': 'Senza macinacaffè specifico',
    'grinder.none.unit': 'descrizione generica',
    'grinder.note': '⚠️ I valori sono punti di partenza — aggiusta ±2–3 in base al risultato.',
    'grinder.no.results': 'Nessun risultato — usa "Senza macinacaffè specifico"',
    'grinder.summary': '⚙️ Macinacaffè:',
    'warn.prensa': '⚠️ Per la pressa francese, consigliamo massimo <strong>Forte (1:12)</strong> per evitare eccessiva amarezza.',
    'method.chemex.tip': 'Macinatura medio-grossa. Versare lentamente. ~4 min',
    'method.v60.tip': 'Macinatura medio-fine. Versare a spirale. ~3 min',
    'method.pano.tip': 'Macinatura media. Tradizionale, ideale per caffè biologico',
    'method.prensa.tip': 'Macinatura grossa. Attendere 4 min prima di pressare',
    'method.espresso.tip': 'Macinatura fine. Dose + estrazione in 25–30s.',
    'method.chemex.grind': 'Medio-grossa',
    'method.v60.grind': 'Medio-fine',
    'method.pano.grind': 'Media',
    'method.prensa.grind': 'Grossa',
    'method.espresso.grind': 'Fine',
    'method.chemex.d0': 'Usa il filtro Chemex piegato con 3 strati verso il beccuccio',
    'method.chemex.d1': 'Preriscalda con acqua calda e butta via',
    'method.chemex.d2': 'Bloom: versare il doppio del peso del caffè, attendere 45s',
    'method.chemex.d3': 'Continua a versare in impulsi lenti e circolari',
    'method.chemex.d4': 'Il drenaggio completo richiede circa 4 min',
    'method.chemex.organic': 'Il filtro spesso della Chemex rimuove più oli, risultando in una bevanda più pulita e delicata.',
    'method.chemex.calibration': 'Chiudi il macinacaffè completamente (senza forzare), poi apri i click raccomandati in senso antiorario.',
    'method.v60.d0': 'Piega il filtro e preriscalda il V60 con acqua calda',
    'method.v60.d1': 'Aggiungi il caffè macinato e livellalo delicatamente',
    'method.v60.d2': 'Bloom: versare il doppio del peso del caffè, attendere 30–45s',
    'method.v60.d3': 'Versa a spirale dal centro verso l\'esterno in 2 impulsi',
    'method.v60.d4': 'Attendere il drenaggio completo (~3 min in totale)',
    'method.v60.organic': 'I caffè biologici naturali hanno note fruttate — evitare acqua oltre 94°C per preservare l\'aroma.',
    'method.v60.calibration': 'Chiudi il macinacaffè completamente (senza forzare), poi apri i click raccomandati in senso antiorario.',
    'method.pano.d0': 'Lava bene il filtro di tessuto prima dell\'uso',
    'method.pano.d1': 'Aggiungi il caffè macinato e posiziona sul recipiente',
    'method.pano.d2': 'Bloom: bagna tutto il caffè e attendi 30s',
    'method.pano.d3': 'Versare il resto con movimenti circolari delicati e continui',
    'method.pano.d4': 'Non affrettare — lascia filtrare naturalmente',
    'method.pano.organic': 'Il filtro di tessuto conserva più oli della carta, esaltando la dolcezza e il corpo dei caffè biologici.',
    'method.pano.calibration': 'Chiudi il macinacaffè completamente (senza forzare), poi apri i click raccomandati in senso antiorario.',
    'method.prensa.d0': 'Preriscalda il cilindro con acqua calda e svuota',
    'method.prensa.d1': 'Aggiungi il caffè macinato grossolanamente',
    'method.prensa.d2': 'Versare tutta l\'acqua in una volta',
    'method.prensa.d3': 'Mescola delicatamente per 10 secondi',
    'method.prensa.d4': 'Metti il coperchio senza premere e attendi 4 minuti',
    'method.prensa.d5': 'Premi lo stantuffo lentamente e servi immediatamente',
    'method.prensa.organic': 'L\'immersione completa della pressa francese estrae più oli e intensità dai caffè biologici.',
    'method.prensa.calibration': 'Chiudi il macinacaffè completamente (senza forzare), poi apri i click raccomandati. Usa più click del necessario — macinatura grossa davvero.',
    'method.espresso.d0': 'Scalda la macchina e il portafiltro per almeno 10 min',
    'method.espresso.d1': 'Dosa il caffè nel portafiltro e distribuisci uniformemente',
    'method.espresso.d2': 'Pressare con pressione ferma e uniforme (~15 kg di forza)',
    'method.espresso.d3': 'Inserisci il portafiltro e avvia l\'estrazione immediatamente',
    'method.espresso.d4': 'Osserva il flusso: idealmente inizia 6–8s dopo l\'avvio',
    'method.espresso.d5': 'Ferma l\'estrazione a 25–30s o al raggiungimento del volume',
    'method.espresso.organic': 'I caffè biologici a tostatura media producono espresso più dolci ed equilibrati. Evita le tostature scure che mascherano le note originali.',
    'method.espresso.calibration': 'Per espresso: 1 click più fino = estrazione più lenta e amara. 1 click più grosso = più veloce e acida. Regola 1 click alla volta.',
    'step.bloom': 'Bloom',
    'step.bloom.sub.co2': 'Liberare CO₂',
    'step.bloom.sub.wake': 'Liberare CO₂, svegliare il caffè',
    'step.chemex.pour1': 'Primo Versamento',
    'step.chemex.pour1.sub': 'Estrazione iniziale, dolcezza',
    'step.chemex.pour2': 'Secondo Versamento',
    'step.chemex.pour2.sub': 'Corpo e acidità equilibrata',
    'step.chemex.pour3': 'Terzo Versamento',
    'step.chemex.pour3.sub': 'Finalizzazione e aggiustamento del volume',
    'step.v60.pour1': 'Primo Versamento',
    'step.v60.pour1.sub': 'Dolcezza e corpo',
    'step.v60.pour2': 'Secondo Versamento',
    'step.v60.pour2.sub': 'Acidità e complessità',
    'step.v60.pour3': 'Versamento Finale',
    'step.v60.pour3.sub': 'Equilibrio e volume',
    'step.pano.main': 'Versamento Principale',
    'step.pano.main.sub': 'Estrazione principale',
    'step.pano.final': 'Versamento Finale',
    'step.pano.final.sub': 'Volume ed equilibrio',
    'step.prensa.add': 'Aggiungere caffè',
    'step.prensa.add.sub': 'Metti il caffè macinato grossolanamente nel cilindro',
    'step.prensa.water': 'Aggiungere acqua',
    'step.prensa.water.sub.template': 'Versare tutto il volume ({vol}) in una volta',
    'step.prensa.stir': 'Mescolare',
    'step.prensa.stir.sub': 'Mescola delicatamente per 10 secondi',
    'step.prensa.wait': 'Attendere',
    'step.prensa.wait.sub': 'Metti il coperchio senza premere',
    'step.prensa.press': 'Premere',
    'step.prensa.press.sub': 'Premi lo stantuffo lentamente fino in fondo',
    'step.prensa.serve': 'Servire',
    'step.prensa.serve.sub': 'Servire immediatamente per evitare l\'estrazione eccessiva',
    'step.espresso.heat': 'Riscaldare',
    'step.espresso.heat.sub': 'Scalda la macchina e il portafiltro',
    'step.espresso.dose': 'Dosare',
    'step.espresso.dose.sub.template': 'Metti {dose}g di caffè macinato fine nel portafiltro',
    'step.espresso.distribute': 'Distribuire',
    'step.espresso.distribute.sub': 'Distribuire il caffè uniformemente (WDT o tap delicato)',
    'step.espresso.tamp': 'Pressare',
    'step.espresso.tamp.sub': 'Pressare con pressione ferma e uniforme (~15 kg)',
    'step.espresso.extract': 'Estrarre',
    'step.espresso.extract.sub.template': 'Avvia l\'estrazione — obiettivo: {yield}ml in 25–30s',
    'step.espresso.serve': 'Servire',
    'step.espresso.serve.sub': 'Servire immediatamente',
    'recipe.title.filter': '☕ La tua ricetta',
    'recipe.title.espresso': '☕ La tua ricetta — Espresso',
    'step.pano.bloom.sub': 'Bagnare il caffè',
    'method.pano.name': 'Filtro di stoffa',
    'method.prensa.name': 'French Press',
  },
  ar: {
    'tagline': 'قهوتك، على الطريقة الصحيحة.',
    'sec.portions.filter': 'كم حصة؟',
    'sec.portions.espresso': 'كم شوت؟',
    'sec.size': 'حجم الكوب',
    'sec.intensity': 'الشدة',
    'sec.method': 'طريقة التحضير',
    'sec.notes': 'ملاحظاتي',
    'sec.learn': 'تعرف أكثر',
    'sec.history': 'السجل',
    'size.xs': 'كوب صغير',
    'size.sm': 'كوب متوسط',
    'size.md': 'كوب كبير',
    'size.lg': 'كوب أمريكي',
    'size.xl': 'ماج',
    'size.custom': 'مخصص',
    'size.free': 'حر',
    'intensity.suave': 'خفيف',
    'intensity.equilibrado': 'متوازن',
    'intensity.forte': 'قوي',
    'intensity.extra-forte': 'قوي جداً',
    'shot.duplo': 'دوبل',
    'shot.simples': 'سينجل',
    'shot.standard': 'قياسي',
    'lbl.agua': 'ماء',
    'lbl.cafe': 'قهوة',
    'lbl.tempo': 'الوقت',
    'lbl.moagem': 'الطحن',
    'lbl.dose': 'الجرعة',
    'lbl.yield': 'المحصول',
    'lbl.extracao': 'الاستخلاص',
    'lbl.temperatura': 'درجة الحرارة',
    'lbl.intensidade': 'الشدة',
    'lbl.porcoes': 'حصة',
    'lbl.volume': 'الحجم:',
    'btn.start': '▶ ابدأ التحضير',
    'btn.share': '🔗 مشاركة الوصفة',
    'btn.restart': 'تحضير قهوة أخرى',
    'prep.close': '✕ إيقاف',
    'prep.attack': 'الصب',
    'prep.of': 'من',
    'prep.waiting': 'انتظر',
    'prep.skip': 'تخطي الانتظار',
    'prep.confirm.checklist': '✓ تم',
    'prep.confirm.espresso': '✓ جاهز',
    'prep.confirm.pour': '✓ صببت',
    'prep.hint.checklist': 'أكد عند الانتهاء',
    'prep.hint.timer': '⏳ سيبدأ مؤقت {time} عند التأكيد',
    'prep.back': '→ رجوع',
    'pour.neste': 'في هذا الصب',
    'pour.adjusted': 'معدّل',
    'pour.adjust.label': 'ضبط الكمية الفعلية',
    'pour.stats.poured': 'تم صبّه',
    'pour.stats.after': 'بعد هذا الصب',
    'pour.stats.remaining': 'لا يزال باقياً',
    'pour.stats.total': 'المجموع',
    'done.title': '!القهوة جاهزة',
    'done.msg': '!بالصحة والهنا 😊',
    'done.time.label': '⏱ :تم التحضير في',
    'done.rating.q': 'كيف كانت هذه القهوة؟',
    'done.notes.placeholder': 'كيف كانت؟ شيء تعدله في المرة القادمة؟',
    'hist.empty': 'لا توجد تحضيرات مسجلة بعد.\nأتمم أول تحضير لرؤية السجل هنا.',
    'hist.restore.toast': '!تم استعادة الوصفة',
    'hist.delete.toast': 'تم حذف التحضير.',
    'hist.delete.aria': 'حذف هذا التحضير',
    'grinder.title': 'مطحنتي',
    'grinder.optional': '· اختياري',
    'grinder.search': '🔍  ابحث عن مطحنة...',
    'grinder.none': 'بدون مطحنة محددة',
    'grinder.none.unit': 'وصف عام',
    'grinder.note': '⚠️ القيم نقاط بداية — اضبط ±2–3 حسب النتيجة في الكوب.',
    'grinder.no.results': 'لا توجد نتائج — استخدم "بدون مطحنة محددة"',
    'grinder.summary': '⚙️ المطحنة:',
    'warn.prensa': '⚠️ للبريس الفرنسي، نوصي بحد أقصى <strong>قوي (1:12)</strong> لتجنب المرارة الزائدة.',
    'method.chemex.tip': 'طحن متوسط-خشن. اسكب ببطء. ~٤ دقائق',
    'method.v60.tip': 'طحن متوسط-ناعم. اسكب بشكل لولبي. ~٣ دقائق',
    'method.pano.tip': 'طحن متوسط. تقليدي ومثالي للقهوة العضوية',
    'method.prensa.tip': 'طحن خشن. انتظر ٤ دقائق قبل الضغط',
    'method.espresso.tip': 'طحن ناعم. جرعة + استخلاص في ٢٥–٣٠ ثانية.',
    'method.chemex.grind': 'متوسط-خشن',
    'method.v60.grind': 'متوسط-ناعم',
    'method.pano.grind': 'متوسط',
    'method.prensa.grind': 'خشن',
    'method.espresso.grind': 'ناعم',
    'method.chemex.d0': 'استخدم فلتر كيمكس مطوياً بـ 3 طبقات تجاه الفوهة',
    'method.chemex.d1': 'سخّن مسبقاً بالماء الساخن ثم اتركه يتصفى',
    'method.chemex.d2': 'بلوم: اسكب ضعف وزن القهوة، انتظر 45 ثانية',
    'method.chemex.d3': 'استمر في الصب بنبضات دائرية بطيئة',
    'method.chemex.d4': 'يستغرق التصفية الكاملة حوالي 4 دقائق',
    'method.chemex.organic': 'يزيل فلتر كيمكس السميك المزيد من الزيوت، مما يؤدي إلى مشروب أنظف وأكثر رقةً.',
    'method.chemex.calibration': 'أغلق المطحنة تماماً (دون إجبار)، ثم افتح النقرات الموصى بها عكس اتجاه عقارب الساعة.',
    'method.v60.d0': 'اطوِ الفلتر وسخّن الـ V60 بالماء الساخن',
    'method.v60.d1': 'أضف القهوة المطحونة وسوّها بلطف',
    'method.v60.d2': 'بلوم: اسكب ضعف وزن القهوة، انتظر 30–45 ثانية',
    'method.v60.d3': 'اسكب بشكل لولبي من المركز للخارج في نبضتين',
    'method.v60.d4': 'انتظر حتى التصفية الكاملة (~3 دقائق إجمالاً)',
    'method.v60.organic': 'القهوة العضوية الطبيعية ذات نكهات فواكه — تجنب الماء فوق 94°C للحفاظ على العطر.',
    'method.v60.calibration': 'أغلق المطحنة تماماً (دون إجبار)، ثم افتح النقرات الموصى بها عكس اتجاه عقارب الساعة.',
    'method.pano.d0': 'اغسل مرشح القماش جيداً قبل الاستخدام',
    'method.pano.d1': 'أضف القهوة المطحونة وضعها فوق الوعاء',
    'method.pano.d2': 'بلوم: بلّل القهوة كلها وانتظر 30 ثانية',
    'method.pano.d3': 'اسكب الباقي بحركات دائرية لطيفة ومستمرة',
    'method.pano.d4': 'لا تتسرع — دعها تتصفى بشكل طبيعي',
    'method.pano.organic': 'يحافظ مرشح القماش على زيوت أكثر من الورق، مما يعزز حلاوة وقوام القهوة العضوية.',
    'method.pano.calibration': 'أغلق المطحنة تماماً (دون إجبار)، ثم افتح النقرات الموصى بها عكس اتجاه عقارب الساعة.',
    'method.prensa.d0': 'سخّن الأسطوانة بالماء الساخن ثم اسكبه',
    'method.prensa.d1': 'أضف القهوة المطحونة الخشنة',
    'method.prensa.d2': 'اسكب كل الماء دفعة واحدة',
    'method.prensa.d3': 'حرّك بلطف لمدة 10 ثوانٍ',
    'method.prensa.d4': 'ضع الغطاء دون ضغط وانتظر 4 دقائق',
    'method.prensa.d5': 'اضغط على المكبس ببطء وقدّم القهوة فوراً',
    'method.prensa.organic': 'الغمر الكامل في البريس الفرنسي يستخلص مزيداً من الزيوت والقوة من القهوة العضوية.',
    'method.prensa.calibration': 'أغلق المطحنة تماماً (دون إجبار)، ثم افتح النقرات الموصى بها. استخدم نقرات أكثر مما يبدو ضرورياً — الطحن الخشن فعلاً.',
    'method.espresso.d0': 'سخّن الماكينة والبورتافيلتر لمدة 10 دقائق على الأقل',
    'method.espresso.d1': 'ضع القهوة في البورتافيلتر ووزّعها بالتساوي',
    'method.espresso.d2': 'اضغط بقوة ثابتة وموحدة (~15 كجم من القوة)',
    'method.espresso.d3': 'أدخل البورتافيلتر وابدأ الاستخلاص فوراً',
    'method.espresso.d4': 'راقب التدفق: يبدأ مثالياً 6–8 ثوانٍ بعد البدء',
    'method.espresso.d5': 'أوقف الاستخلاص عند 25–30 ثانية أو عند الوصول للحجم المطلوب',
    'method.espresso.organic': 'القهوة العضوية متوسطة التحميص تنتج إسبريسو أكثر حلاوة وتوازناً. تجنب التحميص الداكن جداً الذي يخفي النكهات الأصلية.',
    'method.espresso.calibration': 'للإسبريسو: نقرة أدق = استخلاص أبطأ وأكثر مرارة. نقرة أخشن = أسرع وأكثر حموضة. اضبط نقرة واحدة في كل مرة.',
    'step.bloom': 'Bloom',
    'step.bloom.sub.co2': 'تحرير ثاني أكسيد الكربون',
    'step.bloom.sub.wake': 'تحرير CO₂ وإيقاظ القهوة',
    'step.chemex.pour1': 'الصب الأول',
    'step.chemex.pour1.sub': 'الاستخلاص الأولي، الحلاوة',
    'step.chemex.pour2': 'الصب الثاني',
    'step.chemex.pour2.sub': 'الجسم والحموضة المتوازنة',
    'step.chemex.pour3': 'الصب الثالث',
    'step.chemex.pour3.sub': 'الإنهاء وضبط الحجم',
    'step.v60.pour1': 'الصب الأول',
    'step.v60.pour1.sub': 'الحلاوة والجسم',
    'step.v60.pour2': 'الصب الثاني',
    'step.v60.pour2.sub': 'الحموضة والتعقيد',
    'step.v60.pour3': 'الصب الأخير',
    'step.v60.pour3.sub': 'التوازن والحجم',
    'step.pano.main': 'الصب الرئيسي',
    'step.pano.main.sub': 'الاستخلاص الرئيسي',
    'step.pano.final': 'الصب الأخير',
    'step.pano.final.sub': 'الحجم والتوازن',
    'step.prensa.add': 'إضافة القهوة',
    'step.prensa.add.sub': 'ضع القهوة المطحونة الخشنة في الأسطوانة',
    'step.prensa.water': 'إضافة الماء',
    'step.prensa.water.sub.template': 'اسكب الحجم الكامل ({vol}) دفعة واحدة',
    'step.prensa.stir': 'التحريك',
    'step.prensa.stir.sub': 'حرّك بلطف لمدة 10 ثوانٍ',
    'step.prensa.wait': 'الانتظار',
    'step.prensa.wait.sub': 'ضع الغطاء دون ضغط',
    'step.prensa.press': 'الضغط',
    'step.prensa.press.sub': 'اضغط على المكبس ببطء حتى القاع',
    'step.prensa.serve': 'التقديم',
    'step.prensa.serve.sub': 'قدّمها فوراً لتجنب الاستخلاص المفرط',
    'step.espresso.heat': 'التسخين',
    'step.espresso.heat.sub': 'سخّن الماكينة والبورتافيلتر',
    'step.espresso.dose': 'الجرعة',
    'step.espresso.dose.sub.template': 'ضع {dose}g من القهوة المطحونة الناعمة في البورتافيلتر',
    'step.espresso.distribute': 'التوزيع',
    'step.espresso.distribute.sub': 'وزّع القهوة بالتساوي (WDT أو نقر خفيف)',
    'step.espresso.tamp': 'الضغط',
    'step.espresso.tamp.sub': 'اضغط بقوة ثابتة وموحدة (~15 كجم)',
    'step.espresso.extract': 'الاستخلاص',
    'step.espresso.extract.sub.template': 'ابدأ الاستخلاص — الهدف: {yield}ml في 25–30 ثانية',
    'step.espresso.serve': 'التقديم',
    'step.espresso.serve.sub': 'قدّمها فوراً',
    'recipe.title.filter': '☕ وصفتك',
    'recipe.title.espresso': '☕ وصفتك — إسبريسو',
    'step.pano.bloom.sub': 'تبليل القهوة',
    'method.pano.name': 'فلتر القماش',
    'method.prensa.name': 'الضغط الفرنسي',
  },
  ja: {
    'tagline': 'あなたのコーヒー、正しい方法で。',
    'sec.portions.filter': '何人前？',
    'sec.portions.espresso': '何ショット？',
    'sec.size': 'カップのサイズ',
    'sec.intensity': '濃さ',
    'sec.method': '抽出方法',
    'sec.notes': 'マイノート',
    'sec.learn': '詳細を見る',
    'sec.history': '履歴',
    'size.xs': '小カップ',
    'size.sm': '中カップ',
    'size.md': '大カップ',
    'size.lg': 'グラス',
    'size.xl': 'マグ',
    'size.custom': 'カスタム',
    'size.free': '自由',
    'intensity.suave': 'ライト',
    'intensity.equilibrado': 'バランス',
    'intensity.forte': 'ストロング',
    'intensity.extra-forte': 'エクストラストロング',
    'shot.duplo': 'ダブル',
    'shot.simples': 'シングル',
    'shot.standard': 'スタンダード',
    'lbl.agua': '水',
    'lbl.cafe': 'コーヒー',
    'lbl.tempo': '時間',
    'lbl.moagem': '挽き目',
    'lbl.dose': 'ドーズ',
    'lbl.yield': 'イールド',
    'lbl.extracao': '抽出',
    'lbl.temperatura': '温度',
    'lbl.intensidade': '濃さ',
    'lbl.porcoes': '人前',
    'lbl.volume': '容量：',
    'btn.start': '▶ 抽出開始',
    'btn.share': '🔗 レシピをシェア',
    'btn.restart': 'もう一杯',
    'prep.close': '✕ 終了',
    'prep.attack': '注湯',
    'prep.of': '／',
    'prep.waiting': '待機中',
    'prep.skip': 'スキップ',
    'prep.confirm.checklist': '✓ 完了',
    'prep.confirm.espresso': '✓ 完了',
    'prep.confirm.pour': '✓ 注いだ',
    'prep.hint.checklist': '完了したら確認',
    'prep.hint.timer': '⏳ 確認で{time}タイマー開始',
    'prep.back': '← 戻る',
    'pour.neste': 'この注湯',
    'pour.adjusted': '調整済',
    'pour.adjust.label': '実際の量を調整',
    'pour.stats.poured': '注湯済み',
    'pour.stats.after': 'この注湯後',
    'pour.stats.remaining': '残り',
    'pour.stats.total': '合計',
    'done.title': 'コーヒーができました！',
    'done.msg': 'どうぞ。😊',
    'done.time.label': '⏱ 抽出時間：',
    'done.rating.q': 'このコーヒーはいかがでしたか？',
    'done.notes.placeholder': 'どうでしたか？次回の調整点は？',
    'hist.empty': 'まだ記録がありません。\n最初のコーヒーを完成させて履歴を見ましょう。',
    'hist.restore.toast': 'レシピを復元しました！',
    'hist.delete.toast': '記録を削除しました。',
    'hist.delete.aria': 'この記録を削除',
    'grinder.title': 'グラインダー',
    'grinder.optional': '・任意',
    'grinder.search': '🔍  グラインダーを検索...',
    'grinder.none': '特定のグラインダーなし',
    'grinder.none.unit': '一般的な説明',
    'grinder.note': '⚠️ 値は目安です — カップの結果に応じて±2–3調整してください。',
    'grinder.no.results': '見つかりません — 「特定のグラインダーなし」を使用してください',
    'grinder.summary': '⚙️ グラインダー：',
    'warn.prensa': '⚠️ フレンチプレスには最大<strong>ストロング(1:12)</strong>を推奨します。苦みが強くなります。',
    'method.chemex.tip': '中粗挽き。ゆっくり注ぐ。~4分',
    'method.v60.tip': '中細挽き。スパイラル注ぎ。~3分',
    'method.pano.tip': '中挽き。伝統的でオーガニックコーヒーに最適',
    'method.prensa.tip': '粗挽き。プレスの前に4分待つ',
    'method.espresso.tip': '細挽き。ドーズ+抽出25–30秒。',
    'method.chemex.grind': '中粗挽き',
    'method.v60.grind': '中細挽き',
    'method.pano.grind': '中挽き',
    'method.prensa.grind': '粗挽き',
    'method.espresso.grind': '細挽き',
    'method.chemex.d0': 'フィルターを注ぎ口側に3層になるように折る',
    'method.chemex.d1': '熱湯でリンスしてから捨てる',
    'method.chemex.d2': 'ブルーム：コーヒーの2倍の量を注ぎ、45秒待つ',
    'method.chemex.d3': 'ゆっくり円を描くように注ぎ続ける',
    'method.chemex.d4': '全量抽出には約4分かかる',
    'method.chemex.organic': 'Chemexの厚いフィルターがより多くの油脂を除去し、クリーンで繊細な一杯になります。',
    'method.chemex.calibration': 'グラインダーを完全に閉じ（無理に締めない）、推奨クリック数分だけ反時計回りに開ける。',
    'method.v60.d0': 'フィルターを折り、V60を熱湯でリンスする',
    'method.v60.d1': '挽いたコーヒーを入れて軽く平らにする',
    'method.v60.d2': 'ブルーム：2倍の水を注ぎ、30–45秒待つ',
    'method.v60.d3': '中心から外側へ螺旋状に2回に分けて注ぐ',
    'method.v60.d4': '完全に落ちるまで待つ（合計約3分）',
    'method.v60.organic': '天然オーガニックコーヒーはフルーティな風味があります — アロマを保つため94°C以上は避けてください。',
    'method.v60.calibration': 'グラインダーを完全に閉じ（無理に締めない）、推奨クリック数分だけ反時計回りに開ける。',
    'method.pano.d0': '布フィルターをよく洗ってから使う',
    'method.pano.d1': 'コーヒーを入れ容器の上に置く',
    'method.pano.d2': 'ブルーム：コーヒー全体を濡らし30秒待つ',
    'method.pano.d3': '残りをゆっくり円を描くように注ぐ',
    'method.pano.d4': '急がない — 自然に落ちるのを待つ',
    'method.pano.organic': '布フィルターは紙より多くの油脂を保持し、オーガニックコーヒーの甘さとコクを引き出します。',
    'method.pano.calibration': 'グラインダーを完全に閉じ（無理に締めない）、推奨クリック数分だけ反時計回りに開ける。',
    'method.prensa.d0': '熱湯でシリンダーを温めてから捨てる',
    'method.prensa.d1': '粗挽きコーヒーを入れる',
    'method.prensa.d2': 'お湯を全量一度に注ぐ',
    'method.prensa.d3': '10秒間ゆっくりかき混ぜる',
    'method.prensa.d4': '押さずにふたを置き、4分待つ',
    'method.prensa.d5': 'プランジャーをゆっくり押してすぐにサーブする',
    'method.prensa.organic': 'フレンチプレスの完全浸漬により、オーガニックコーヒーからより多くの油脂と強さを抽出できます。',
    'method.prensa.calibration': 'グラインダーを完全に閉じ（無理に締めない）、推奨クリック数分だけ開ける。必要以上に多く開けてください — 本当に粗挽き。',
    'method.espresso.d0': 'マシンとポルタフィルターを少なくとも10分温める',
    'method.espresso.d1': 'ポルタフィルターにコーヒーを入れ均一に分配する',
    'method.espresso.d2': 'しっかり均一に(~15 kg)タンプする',
    'method.espresso.d3': 'ポルタフィルターを装着してすぐに抽出開始',
    'method.espresso.d4': 'フローを観察：理想は開始6–8秒後から',
    'method.espresso.d5': '25–30秒または目標量で抽出停止',
    'method.espresso.organic': 'オーガニック中煎りコーヒーはより甘くバランスの取れたエスプレッソになります。元の風味を隠す濃い焙煎は避けてください。',
    'method.espresso.calibration': 'エスプレッソ：1クリック細かく = より遅く苦い。1クリック粗く = より速く酸っぱい。1クリックずつ調整。',
    'step.bloom': 'ブルーム',
    'step.bloom.sub.co2': 'CO₂を放出',
    'step.bloom.sub.wake': 'CO₂を放出し、コーヒーを目覚めさせる',
    'step.chemex.pour1': '1回目の注湯',
    'step.chemex.pour1.sub': '初期抽出、甘み',
    'step.chemex.pour2': '2回目の注湯',
    'step.chemex.pour2.sub': 'ボディと酸味のバランス',
    'step.chemex.pour3': '3回目の注湯',
    'step.chemex.pour3.sub': '仕上げと量の調整',
    'step.v60.pour1': '1回目の注湯',
    'step.v60.pour1.sub': '甘みとコク',
    'step.v60.pour2': '2回目の注湯',
    'step.v60.pour2.sub': '酸味と複雑さ',
    'step.v60.pour3': '最終注湯',
    'step.v60.pour3.sub': 'バランスと量',
    'step.pano.main': 'メイン注湯',
    'step.pano.main.sub': 'メイン抽出',
    'step.pano.final': '最終注湯',
    'step.pano.final.sub': '量とバランス',
    'step.prensa.add': 'コーヒーを入れる',
    'step.prensa.add.sub': '粗挽きコーヒーをシリンダーに入れる',
    'step.prensa.water': 'お湯を注ぐ',
    'step.prensa.water.sub.template': '全量({vol})を一度に注ぐ',
    'step.prensa.stir': 'かき混ぜる',
    'step.prensa.stir.sub': '10秒間ゆっくりかき混ぜる',
    'step.prensa.wait': '待機',
    'step.prensa.wait.sub': '押さずにふたを置く',
    'step.prensa.press': 'プレス',
    'step.prensa.press.sub': 'プランジャーをゆっくり底まで押す',
    'step.prensa.serve': 'サーブ',
    'step.prensa.serve.sub': '過抽出を防ぐためすぐにサーブする',
    'step.espresso.heat': '予熱',
    'step.espresso.heat.sub': 'マシンとポルタフィルターを温める',
    'step.espresso.dose': 'ドーズ',
    'step.espresso.dose.sub.template': '{dose}gの細挽きコーヒーをポルタフィルターに入れる',
    'step.espresso.distribute': '分配',
    'step.espresso.distribute.sub': '均一に分配する（WDTまたは軽くタップ）',
    'step.espresso.tamp': 'タンピング',
    'step.espresso.tamp.sub': 'しっかり均一に(~15 kg)タンプする',
    'step.espresso.extract': '抽出',
    'step.espresso.extract.sub.template': '抽出開始 — 目標：{yield}ml、25–30秒',
    'step.espresso.serve': 'サーブ',
    'step.espresso.serve.sub': 'すぐにサーブする',
    'recipe.title.filter': '☕ あなたのレシピ',
    'recipe.title.espresso': '☕ あなたのレシピ — エスプレッソ',
    'step.pano.bloom.sub': 'コーヒーを濡らす',
    'method.pano.name': 'ネルドリップ',
    'method.prensa.name': 'フレンチプレス',
  },
  zh: {
    'tagline': '您的咖啡，恰到好处。',
    'sec.portions.filter': '几份？',
    'sec.portions.espresso': '几杯浓缩？',
    'sec.size': '杯子大小',
    'sec.intensity': '浓度',
    'sec.method': '冲泡方式',
    'sec.notes': '我的笔记',
    'sec.learn': '了解更多',
    'sec.history': '历史记录',
    'size.xs': '小杯',
    'size.sm': '中杯',
    'size.md': '大杯',
    'size.lg': '美式杯',
    'size.xl': '马克杯',
    'size.custom': '自定义',
    'size.free': '自由',
    'intensity.suave': '清淡',
    'intensity.equilibrado': '均衡',
    'intensity.forte': '浓',
    'intensity.extra-forte': '超浓',
    'shot.duplo': '双份',
    'shot.simples': '单份',
    'shot.standard': '标准',
    'lbl.agua': '水',
    'lbl.cafe': '咖啡',
    'lbl.tempo': '时间',
    'lbl.moagem': '研磨度',
    'lbl.dose': '剂量',
    'lbl.yield': '产量',
    'lbl.extracao': '萃取',
    'lbl.temperatura': '温度',
    'lbl.intensidade': '浓度',
    'lbl.porcoes': '份',
    'lbl.volume': '容量：',
    'btn.start': '▶ 开始冲泡',
    'btn.share': '🔗 分享食谱',
    'btn.restart': '再来一杯',
    'prep.close': '✕ 停止',
    'prep.attack': '注水',
    'prep.of': '／',
    'prep.waiting': '请稍等',
    'prep.skip': '跳过等待',
    'prep.confirm.checklist': '✓ 完成',
    'prep.confirm.espresso': '✓ 就绪',
    'prep.confirm.pour': '✓ 已注水',
    'prep.hint.checklist': '完成后确认',
    'prep.hint.timer': '⏳ 确认后将启动{time}计时器',
    'prep.back': '← 返回',
    'pour.neste': '本次注水',
    'pour.adjusted': '已调整',
    'pour.adjust.label': '调整实际用量',
    'pour.stats.poured': '已注水',
    'pour.stats.after': '本次注水后',
    'pour.stats.remaining': '还剩',
    'pour.stats.total': '总量',
    'done.title': '咖啡好了！',
    'done.msg': '请享用。😊',
    'done.time.label': '⏱ 冲泡用时：',
    'done.rating.q': '这杯咖啡怎么样？',
    'done.notes.placeholder': '感觉如何？下次需要调整什么？',
    'hist.empty': '尚无记录。\n完成第一次冲泡即可查看历史。',
    'hist.restore.toast': '已恢复食谱！',
    'hist.delete.toast': '已删除记录。',
    'hist.delete.aria': '删除此记录',
    'grinder.title': '我的磨豆机',
    'grinder.optional': '・可选',
    'grinder.search': '🔍  搜索磨豆机...',
    'grinder.none': '无特定磨豆机',
    'grinder.none.unit': '通用描述',
    'grinder.note': '⚠️ 数值仅供参考，请根据实际效果调整±2–3。',
    'grinder.no.results': '未找到 — 请使用「无特定磨豆机」',
    'grinder.summary': '⚙️ 磨豆机：',
    'warn.prensa': '⚠️ 法压壶建议最多使用<strong>浓(1:12)</strong>以避免过度苦涩。',
    'method.chemex.tip': '中粗研磨。缓慢注水。约4分钟',
    'method.v60.tip': '中细研磨。螺旋注水。约3分钟',
    'method.pano.tip': '中研磨。传统方式，适合有机咖啡',
    'method.prensa.tip': '粗研磨。按压前等待4分钟',
    'method.espresso.tip': '细研磨。剂量+萃取25-30秒。',
    'method.chemex.grind': '中粗研磨',
    'method.v60.grind': '中细研磨',
    'method.pano.grind': '中研磨',
    'method.prensa.grind': '粗研磨',
    'method.espresso.grind': '细研磨',
    'method.chemex.d0': '将Chemex滤纸折叠成三层朝向壶嘴',
    'method.chemex.d1': '用热水预热后倒掉',
    'method.chemex.d2': '预浸：注入咖啡重量两倍的水，等待45秒',
    'method.chemex.d3': '继续以缓慢画圆方式分段注水',
    'method.chemex.d4': '完全滤完约需4分钟',
    'method.chemex.organic': 'Chemex厚滤纸去除更多油脂，带来更干净精致的口感。',
    'method.chemex.calibration': '将磨豆机完全关闭（不要用力），然后逆时针打开推荐的刻度。',
    'method.v60.d0': '折叠滤纸，用热水预热V60',
    'method.v60.d1': '加入咖啡粉并轻轻整平',
    'method.v60.d2': '预浸：注入两倍重量的水，等待30-45秒',
    'method.v60.d3': '分2次从中心向外螺旋注水',
    'method.v60.d4': '等待完全滤完（总计约3分钟）',
    'method.v60.organic': '天然有机咖啡有果香风味——避免水温超过94°C以保留香气。',
    'method.v60.calibration': '将磨豆机完全关闭（不要用力），然后逆时针打开推荐的刻度。',
    'method.pano.d0': '使用前将布滤器洗净',
    'method.pano.d1': '加入咖啡粉并置于容器上',
    'method.pano.d2': '预浸：浸湿全部咖啡粉，等待30秒',
    'method.pano.d3': '以轻柔连续的画圆方式注入剩余水量',
    'method.pano.d4': '不要着急，让其自然滴滤',
    'method.pano.organic': '布滤器比纸滤器保留更多油脂，增强有机咖啡的甜感和醇厚度。',
    'method.pano.calibration': '将磨豆机完全关闭（不要用力），然后逆时针打开推荐的刻度。',
    'method.prensa.d0': '用热水预热滤压壶后倒掉',
    'method.prensa.d1': '加入粗研磨咖啡粉',
    'method.prensa.d2': '一次性注入全部水量',
    'method.prensa.d3': '轻柔搅拌10秒',
    'method.prensa.d4': '盖上盖子但不下压，等待4分钟',
    'method.prensa.d5': '缓慢向下按压活塞，立即上杯',
    'method.prensa.organic': '法压壶的全浸泡萃取方式，能从有机咖啡中提取更多油脂和风味。',
    'method.prensa.calibration': '将磨豆机完全关闭（不要用力），然后打开推荐的刻度。比看起来需要的刻度更多——真正的粗研磨。',
    'method.espresso.d0': '预热机器和冲煮手柄至少10分钟',
    'method.espresso.d1': '将咖啡粉放入冲煮手柄并均匀布粉',
    'method.espresso.d2': '以稳定均匀的力度压粉（约15公斤）',
    'method.espresso.d3': '安装冲煮手柄并立即开始萃取',
    'method.espresso.d4': '观察流速：理想情况下6-8秒后开始流出',
    'method.espresso.d5': '在25-30秒或达到目标量时停止萃取',
    'method.espresso.organic': '有机中度烘焙咖啡能产生更甜、更均衡的浓缩咖啡。避免使用遮盖原始风味的深度烘焙。',
    'method.espresso.calibration': '浓缩咖啡：刻度更细 = 萃取更慢更苦。刻度更粗 = 更快更酸。每次调整一个刻度。',
    'step.bloom': '预浸',
    'step.bloom.sub.co2': '释放CO₂',
    'step.bloom.sub.wake': '释放CO₂，唤醒咖啡',
    'step.chemex.pour1': '第一次注水',
    'step.chemex.pour1.sub': '初始萃取，甜感',
    'step.chemex.pour2': '第二次注水',
    'step.chemex.pour2.sub': '醇厚度与平衡酸度',
    'step.chemex.pour3': '第三次注水',
    'step.chemex.pour3.sub': '完成冲泡，调整水量',
    'step.v60.pour1': '第一次注水',
    'step.v60.pour1.sub': '甜感与醇厚',
    'step.v60.pour2': '第二次注水',
    'step.v60.pour2.sub': '酸度与复杂性',
    'step.v60.pour3': '最终注水',
    'step.v60.pour3.sub': '平衡与水量',
    'step.pano.main': '主要注水',
    'step.pano.main.sub': '主要萃取',
    'step.pano.final': '最终注水',
    'step.pano.final.sub': '水量与平衡',
    'step.prensa.add': '加入咖啡',
    'step.prensa.add.sub': '将粗研磨咖啡放入筒中',
    'step.prensa.water': '注水',
    'step.prensa.water.sub.template': '一次性注入全部({vol})',
    'step.prensa.stir': '搅拌',
    'step.prensa.stir.sub': '轻柔搅拌10秒',
    'step.prensa.wait': '等待',
    'step.prensa.wait.sub': '盖上盖子但不下压',
    'step.prensa.press': '按压',
    'step.prensa.press.sub': '缓慢向下按压活塞至底部',
    'step.prensa.serve': '上杯',
    'step.prensa.serve.sub': '立即上杯以避免过度萃取',
    'step.espresso.heat': '预热',
    'step.espresso.heat.sub': '预热机器和冲煮手柄',
    'step.espresso.dose': '称量咖啡',
    'step.espresso.dose.sub.template': '将{dose}g细研磨咖啡放入冲煮手柄',
    'step.espresso.distribute': '布粉',
    'step.espresso.distribute.sub': '均匀布粉（WDT或轻敲）',
    'step.espresso.tamp': '压粉',
    'step.espresso.tamp.sub': '以稳定均匀的力度压粉（约15公斤）',
    'step.espresso.extract': '萃取',
    'step.espresso.extract.sub.template': '开始萃取——目标：{yield}ml，25-30秒',
    'step.espresso.serve': '上杯',
    'step.espresso.serve.sub': '立即上杯',
    'recipe.title.filter': '☕ 您的食谱',
    'recipe.title.espresso': '☕ 您的食谱 — 浓缩咖啡',
    'step.pano.bloom.sub': '浸湿咖啡粉',
    'method.pano.name': '布滤杯',
    'method.prensa.name': '法压壶',
  },
  ru: {
    'tagline': 'Ваш кофе, правильным способом.',
    'sec.portions.filter': 'Сколько порций?',
    'sec.portions.espresso': 'Сколько шотов?',
    'sec.size': 'Размер чашки',
    'sec.intensity': 'Крепость',
    'sec.method': 'Метод заваривания',
    'sec.notes': 'Мои заметки',
    'sec.learn': 'Узнать больше',
    'sec.history': 'История',
    'size.xs': 'Маленькая чашка',
    'size.sm': 'Средняя чашка',
    'size.md': 'Большая чашка',
    'size.lg': 'Стакан',
    'size.xl': 'Кружка',
    'size.custom': 'Свой объём',
    'size.free': 'своб.',
    'intensity.suave': 'Лёгкий',
    'intensity.equilibrado': 'Сбалансированный',
    'intensity.forte': 'Крепкий',
    'intensity.extra-forte': 'Очень крепкий',
    'shot.duplo': 'Двойной',
    'shot.simples': 'Одинарный',
    'shot.standard': 'стандарт',
    'lbl.agua': 'Вода',
    'lbl.cafe': 'Кофе',
    'lbl.tempo': 'Время',
    'lbl.moagem': 'Помол',
    'lbl.dose': 'Доза',
    'lbl.yield': 'Выход',
    'lbl.extracao': 'Экстракция',
    'lbl.temperatura': 'Температура',
    'lbl.intensidade': 'Крепость',
    'lbl.porcoes': 'пор.',
    'lbl.volume': 'Объём:',
    'btn.start': '▶ Начать',
    'btn.share': '🔗 Поделиться рецептом',
    'btn.restart': 'Ещё кофе',
    'prep.close': '✕ Стоп',
    'prep.attack': 'ЗАЛИВКА',
    'prep.of': 'из',
    'prep.waiting': 'Ожидание',
    'prep.skip': 'пропустить',
    'prep.confirm.checklist': '✓ Готово',
    'prep.confirm.espresso': '✓ Готово',
    'prep.confirm.pour': '✓ Залил',
    'prep.hint.checklist': 'Подтвердите когда готово',
    'prep.hint.timer': '⏳ Таймер {time} запустится при подтверждении',
    'prep.back': '← Назад',
    'pour.neste': 'эта заливка',
    'pour.adjusted': 'скорр.',
    'pour.adjust.label': 'Скорректировать объём',
    'pour.stats.poured': 'Уже налито',
    'pour.stats.after': 'После заливки',
    'pour.stats.remaining': 'Осталось',
    'pour.stats.total': 'Итого',
    'done.title': 'Кофе готов!',
    'done.msg': 'Приятного! 😊',
    'done.time.label': '⏱ Готовилось:',
    'done.rating.q': 'Как вам этот кофе?',
    'done.notes.placeholder': 'Как получилось? Что изменить в следующий раз?',
    'hist.empty': 'Нет записей.\nЗавершите первое приготовление чтобы увидеть историю.',
    'hist.restore.toast': 'Рецепт восстановлен!',
    'hist.delete.toast': 'Запись удалена.',
    'hist.delete.aria': 'Удалить запись',
    'grinder.title': 'Моя кофемолка',
    'grinder.optional': '· по желанию',
    'grinder.search': '🔍  Найти кофемолку...',
    'grinder.none': 'Без конкретной кофемолки',
    'grinder.none.unit': 'общее описание',
    'grinder.note': '⚠️ Значения — отправная точка. Корректируйте ±2–3 по результату.',
    'grinder.no.results': 'Не найдено — используйте «Без конкретной кофемолки»',
    'grinder.summary': '⚙️ Кофемолка:',
    'warn.prensa': '⚠️ Для французского пресса рекомендуем максимум <strong>Крепкий (1:12)</strong> во избежание горечи.',
    'method.chemex.tip': 'Помол средне-крупный. Лейте медленно. ~4 мин',
    'method.v60.tip': 'Помол средне-мелкий. Лейте по спирали. ~3 мин',
    'method.pano.tip': 'Помол средний. Традиционный, идеален для органического кофе',
    'method.prensa.tip': 'Помол крупный. Подождите 4 мин перед нажатием',
    'method.espresso.tip': 'Помол мелкий. Доза + экстракция 25–30 сек.',
    'method.chemex.grind': 'Средне-крупный',
    'method.v60.grind': 'Средне-мелкий',
    'method.pano.grind': 'Средний',
    'method.prensa.grind': 'Крупный',
    'method.espresso.grind': 'Мелкий',
    'method.chemex.d0': 'Сложите фильтр Chemex втрое стороной к носику',
    'method.chemex.d1': 'Ополосните горячей водой и вылейте',
    'method.chemex.d2': 'Блум: влейте воды вдвое больше веса кофе, подождите 45с',
    'method.chemex.d3': 'Продолжайте лить медленными круговыми движениями',
    'method.chemex.d4': 'Полное отекание занимает около 4 мин',
    'method.chemex.organic': 'Толстый фильтр Chemex удаляет больше масел — получается более чистый и нежный напиток.',
    'method.chemex.calibration': 'Закройте кофемолку полностью (без усилий), затем откройте на рекомендованное число кликов против часовой стрелки.',
    'method.v60.d0': 'Сложите фильтр и ополосните V60 горячей водой',
    'method.v60.d1': 'Добавьте молотый кофе и аккуратно выровняйте',
    'method.v60.d2': 'Блум: влейте вдвое больше кофе, подождите 30–45с',
    'method.v60.d3': 'Лейте по спирали от центра к краям в 2 порции',
    'method.v60.d4': 'Дождитесь полного отекания (~3 мин всего)',
    'method.v60.organic': 'Натуральный органический кофе имеет фруктовые ноты — избегайте воды выше 94°C для сохранения аромата.',
    'method.v60.calibration': 'Закройте кофемолку полностью (без усилий), затем откройте на рекомендованное число кликов против часовой стрелки.',
    'method.pano.d0': 'Хорошо промойте матерчатый фильтр перед использованием',
    'method.pano.d1': 'Добавьте молотый кофе, установите над ёмкостью',
    'method.pano.d2': 'Блум: смочите весь кофе и подождите 30с',
    'method.pano.d3': 'Вылейте остаток медленными круговыми движениями',
    'method.pano.d4': 'Не торопитесь — дайте стечь естественно',
    'method.pano.organic': 'Матерчатый фильтр сохраняет больше масел, чем бумажный — усиливает сладость и тело органического кофе.',
    'method.pano.calibration': 'Закройте кофемолку полностью (без усилий), затем откройте на рекомендованное число кликов против часовой стрелки.',
    'method.prensa.d0': 'Ополосните колбу горячей водой и вылейте',
    'method.prensa.d1': 'Добавьте крупно молотый кофе',
    'method.prensa.d2': 'Залейте всю воду сразу',
    'method.prensa.d3': 'Помешайте мягко 10 секунд',
    'method.prensa.d4': 'Положите крышку не нажимая, подождите 4 минуты',
    'method.prensa.d5': 'Медленно нажмите поршень и сразу подайте',
    'method.prensa.organic': 'Полное погружение во французском прессе извлекает больше масел и насыщенности из органического кофе.',
    'method.prensa.calibration': 'Закройте кофемолку полностью (без усилий), затем откройте на рекомендованное число кликов. Используйте больше кликов чем кажется нужным — по-настоящему крупный помол.',
    'method.espresso.d0': 'Прогрейте машину и портафильтр минимум 10 мин',
    'method.espresso.d1': 'Насыпьте кофе в портафильтр и равномерно распределите',
    'method.espresso.d2': 'Темперуйте с равномерным давлением (~15 кг)',
    'method.espresso.d3': 'Вставьте портафильтр и немедленно начните экстракцию',
    'method.espresso.d4': 'Следите за потоком: идеально начинается через 6–8с',
    'method.espresso.d5': 'Остановите экстракцию на 25–30с или при достижении объёма',
    'method.espresso.organic': 'Органический кофе средней обжарки даёт более сладкое и сбалансированное эспрессо. Избегайте тёмной обжарки, которая маскирует оригинальные ноты.',
    'method.espresso.calibration': 'Для эспрессо: 1 клик мельче = медленнее и горче. 1 клик крупнее = быстрее и кислее. Меняйте по 1 клику.',
    'step.bloom': 'Блум',
    'step.bloom.sub.co2': 'Выпустить CO₂',
    'step.bloom.sub.wake': 'Выпустить CO₂, пробудить кофе',
    'step.chemex.pour1': 'Первая заливка',
    'step.chemex.pour1.sub': 'Начальная экстракция, сладость',
    'step.chemex.pour2': 'Вторая заливка',
    'step.chemex.pour2.sub': 'Тело и сбалансированная кислотность',
    'step.chemex.pour3': 'Третья заливка',
    'step.chemex.pour3.sub': 'Финиш и коррекция объёма',
    'step.v60.pour1': 'Первая заливка',
    'step.v60.pour1.sub': 'Сладость и тело',
    'step.v60.pour2': 'Вторая заливка',
    'step.v60.pour2.sub': 'Кислотность и сложность',
    'step.v60.pour3': 'Финальная заливка',
    'step.v60.pour3.sub': 'Баланс и объём',
    'step.pano.main': 'Основная заливка',
    'step.pano.main.sub': 'Основная экстракция',
    'step.pano.final': 'Финальная заливка',
    'step.pano.final.sub': 'Объём и баланс',
    'step.prensa.add': 'Добавить кофе',
    'step.prensa.add.sub': 'Положите крупно молотый кофе в колбу',
    'step.prensa.water': 'Залить воду',
    'step.prensa.water.sub.template': 'Влейте весь объём ({vol}) сразу',
    'step.prensa.stir': 'Перемешать',
    'step.prensa.stir.sub': 'Помешайте мягко 10 секунд',
    'step.prensa.wait': 'Ожидание',
    'step.prensa.wait.sub': 'Положите крышку не нажимая',
    'step.prensa.press': 'Нажать',
    'step.prensa.press.sub': 'Медленно нажмите поршень до дна',
    'step.prensa.serve': 'Подать',
    'step.prensa.serve.sub': 'Подайте сразу, чтобы избежать переэкстракции',
    'step.espresso.heat': 'Разогреть',
    'step.espresso.heat.sub': 'Прогрейте машину и портафильтр',
    'step.espresso.dose': 'Взвесить',
    'step.espresso.dose.sub.template': 'Положите {dose}г мелко молотого кофе в портафильтр',
    'step.espresso.distribute': 'Распределить',
    'step.espresso.distribute.sub': 'Равномерно распределите кофе (WDT или лёгкий стук)',
    'step.espresso.tamp': 'Темпировать',
    'step.espresso.tamp.sub': 'Темперуйте с равномерным давлением (~15 кг)',
    'step.espresso.extract': 'Экстракция',
    'step.espresso.extract.sub.template': 'Начните экстракцию — цель: {yield}мл за 25–30с',
    'step.espresso.serve': 'Подать',
    'step.espresso.serve.sub': 'Подайте немедленно',
    'recipe.title.filter': '☕ Ваш рецепт',
    'recipe.title.espresso': '☕ Ваш рецепт — Эспрессо',
    'step.pano.bloom.sub': 'Смочить кофе',
    'method.pano.name': 'Тканевый фильтр',
    'method.prensa.name': 'Французский пресс',
  },
};


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
    get tip() { return t('method.chemex.tip'); },
    get grind() { return t('method.chemex.grind'); },
    time: '3:30–4:30 min',
    compensation: 0.05,
    temp: '90–93°C',
    get details() { return [t('method.chemex.d0'), t('method.chemex.d1'), t('method.chemex.d2'), t('method.chemex.d3'), t('method.chemex.d4')]; },
    get organic() { return t('method.chemex.organic'); },
    get calibration() { return t('method.chemex.calibration'); },
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.30);
      const d2 = round5(rest * 0.35);
      const d3 = agua - bloom - d1 - d2;
      return [
        { name: t('step.bloom'),          sub: t('step.bloom.sub.co2'),      vol: bloom, wait: 45, waitLabel: '45s' },
        { name: t('step.chemex.pour1'),   sub: t('step.chemex.pour1.sub'),   vol: d1,    wait: 30, waitLabel: '30s' },
        { name: t('step.chemex.pour2'),   sub: t('step.chemex.pour2.sub'),   vol: d2,    wait: 20, waitLabel: '20s' },
        { name: t('step.chemex.pour3'),   sub: t('step.chemex.pour3.sub'),   vol: d3 },
      ];
    },
  },
  v60: {
    name: 'V60',
    get tip() { return t('method.v60.tip'); },
    get grind() { return t('method.v60.grind'); },
    time: '2:30–3:30 min',
    compensation: 0,
    temp: '92–94°C',
    get details() { return [t('method.v60.d0'), t('method.v60.d1'), t('method.v60.d2'), t('method.v60.d3'), t('method.v60.d4')]; },
    get organic() { return t('method.v60.organic'); },
    get calibration() { return t('method.v60.calibration'); },
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.40);
      const d2 = round5(rest * 0.35);
      const d3 = agua - bloom - d1 - d2;
      return [
        { name: t('step.bloom'),        sub: t('step.bloom.sub.wake'),   vol: bloom, wait: 38, waitLabel: '~35–45s' },
        { name: t('step.v60.pour1'),    sub: t('step.v60.pour1.sub'),    vol: d1 },
        { name: t('step.v60.pour2'),    sub: t('step.v60.pour2.sub'),    vol: d2 },
        { name: t('step.v60.pour3'),    sub: t('step.v60.pour3.sub'),    vol: d3 },
      ];
    },
  },
  pano: {
    get name() { return t('method.pano.name'); },
    get tip() { return t('method.pano.tip'); },
    get grind() { return t('method.pano.grind'); },
    time: '2:00–3:00 min',
    compensation: 0.05,
    temp: '90–92°C',
    get details() { return [t('method.pano.d0'), t('method.pano.d1'), t('method.pano.d2'), t('method.pano.d3'), t('method.pano.d4')]; },
    get organic() { return t('method.pano.organic'); },
    get calibration() { return t('method.pano.calibration'); },
    steps(agua, cafe) {
      const bloom = clamp(round5(cafe * 2), 40, 80);
      const rest = agua - bloom;
      const d1 = round5(rest * 0.60);
      const d2 = agua - bloom - d1;
      return [
        { name: t('step.bloom'),        sub: t('step.pano.bloom.sub'),   vol: bloom, wait: 30, waitLabel: '30s' },
        { name: t('step.pano.main'),    sub: t('step.pano.main.sub'),    vol: d1 },
        { name: t('step.pano.final'),   sub: t('step.pano.final.sub'),   vol: d2 },
      ];
    },
  },
  prensa: {
    get name() { return t('method.prensa.name'); },
    get tip() { return t('method.prensa.tip'); },
    get grind() { return t('method.prensa.grind'); },
    time: '4:30–5:00 min',
    compensation: 0.10,
    temp: '92–96°C',
    get details() { return [t('method.prensa.d0'), t('method.prensa.d1'), t('method.prensa.d2'), t('method.prensa.d3'), t('method.prensa.d4'), t('method.prensa.d5')]; },
    get organic() { return t('method.prensa.organic'); },
    get calibration() { return t('method.prensa.calibration'); },
    steps(agua) {
      return [
        { name: t('step.prensa.add'),   sub: t('step.prensa.add.sub'),                              checklist: true },
        { name: t('step.prensa.water'), sub: t('step.prensa.water.sub.template', { vol: fmtVol(agua) }), checklist: true },
        { name: t('step.prensa.stir'),  sub: t('step.prensa.stir.sub'),                             checklist: true },
        { name: t('step.prensa.wait'),  sub: t('step.prensa.wait.sub'),                             wait: 240, waitLabel: '4 min' },
        { name: t('step.prensa.press'), sub: t('step.prensa.press.sub'),                            checklist: true },
        { name: t('step.prensa.serve'), sub: t('step.prensa.serve.sub'),                            checklist: true },
      ];
    },
  },
  espresso: {
    name: 'Espresso',
    get tip() { return t('method.espresso.tip'); },
    get grind() { return t('method.espresso.grind'); },
    time: '25–30s',
    compensation: 0,
    temp: '90–96°C',
    isEspresso: true,
    get details() { return [t('method.espresso.d0'), t('method.espresso.d1'), t('method.espresso.d2'), t('method.espresso.d3'), t('method.espresso.d4'), t('method.espresso.d5')]; },
    get organic() { return t('method.espresso.organic'); },
    get calibration() { return t('method.espresso.calibration'); },
    steps(dose, yieldMl) {
      return [
        { name: t('step.espresso.heat'),       sub: t('step.espresso.heat.sub'),                                    checklist: true },
        { name: t('step.espresso.dose'),       sub: t('step.espresso.dose.sub.template', { dose }),                 checklist: true },
        { name: t('step.espresso.distribute'), sub: t('step.espresso.distribute.sub'),                              checklist: true },
        { name: t('step.espresso.tamp'),       sub: t('step.espresso.tamp.sub'),                                    checklist: true },
        { name: t('step.espresso.extract'),    sub: t('step.espresso.extract.sub.template', { yield: yieldMl }),    wait: 30, waitLabel: '30s' },
        { name: t('step.espresso.serve'),      sub: t('step.espresso.serve.sub'),                                   checklist: true },
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

const DEFAULT = { portions: 3, sizeId: 'sm', customMl: 200, intensityId: 'forte', methodId: 'chemex', shotType: 'duplo' };
let lang = localStorage.getItem('coado-lang') || 'pt';
let state = { ...DEFAULT };
let prepState = null;
let timerInterval = null;
let globalTimerInterval = null;
let prepStartTime = null;
let noteSaveTimer = null;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function round5(n) { return Math.round(n / 5) * 5; }

function t(key, vars) {
  let str = (T[lang]?.[key]) ?? T.pt?.[key] ?? key;
  if (vars) Object.entries(vars).forEach(([k,v]) => { str = str.replace('{' + k + '}', v); });
  return str;
}
function isImperial() { return LANGS.find(l => l.id === lang)?.imperial ?? false; }
function fmtVol(ml) {
  if (!isImperial()) return ml + ' ml';
  return (ml * 0.033814).toFixed(1) + ' fl oz';
}
function fmtWeight(g) {
  if (!isImperial()) return g + ' g';
  return (g * 0.035274).toFixed(1) + ' oz';
}
function fmtTemp(str) {
  if (!isImperial()) return str;
  return str
    .replace(/(\d+)[–-](\d+)°C/g, (_, a, b) => Math.round(+a*9/5+32) + '–' + Math.round(+b*9/5+32) + '°F')
    .replace(/(\d+)°C/g, (_, a) => Math.round(+a*9/5+32) + '°F');
}
function setLang(id) {
  lang = id;
  localStorage.setItem('coado-lang', id);
  const l = LANGS.find(x => x.id === id);
  document.documentElement.lang = id;
  document.documentElement.dir = l?.dir ?? 'ltr';
  renderConfig();
}
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
           placeholder="${t('grinder.search')}" autocomplete="off" aria-label="${t('grinder.title')}">
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
        <span class="grinder-name">${t('grinder.none')}</span>
        <span class="grinder-unit">${t('grinder.none.unit')}</span>
      </button>
    </div>
    <p class="grinder-no-results" id="grinder-no-results" style="display:none">
      ${t('grinder.no.results')}
    </p>
    <p class="grinder-note">${t('grinder.note')}</p>`;

  const grinderSection = firstTime
    ? `<section class="section" id="section-grinder">
        <h2 class="section-title">${t('grinder.title')} <span class="section-opt">${t('grinder.optional')}</span></h2>
        ${grinderGrid}
      </section>`
    : `<section class="section" id="section-grinder">
        <details class="accordion" id="grinder-accordion">
          <summary class="accordion-summary">
            ${t('grinder.summary')} ${grinder ? grinder.name : t('grinder.none')}
          </summary>
          <div class="accordion-body">${grinderGrid}</div>
        </details>
      </section>`;

  // ── Seção 1: size (filter) or shot (espresso) ──
  const secao1 = isEspresso
    ? `<section class="section">
        <h2 class="section-title">${t('sec.portions.espresso')}</h2>
        <div class="shot-cards" role="group" aria-label="${t('sec.portions.espresso')}" id="shot-cards">
          <button class="shot-card ${state.shotType === 'duplo' ? 'selected' : ''}"
                  data-shot="duplo" aria-pressed="${state.shotType === 'duplo'}">
            <div class="shot-name">${t('shot.duplo')}</div>
            <div class="shot-info">18g → 36ml</div>
            <div class="shot-badge">${t('shot.standard')}</div>
          </button>
          <button class="shot-card ${state.shotType === 'simples' ? 'selected' : ''}"
                  data-shot="simples" aria-pressed="${state.shotType === 'simples'}">
            <div class="shot-name">${t('shot.simples')}</div>
            <div class="shot-info">9g → 18ml</div>
            <div class="shot-badge" style="visibility:hidden">.</div>
          </button>
        </div>
      </section>`
    : `<section class="section">
        <h2 class="section-title">${t('sec.size')}</h2>
        <div class="size-cards" role="group" aria-label="${t('sec.size')}" id="size-cards">
          ${SIZES.map(s => `
            <button class="size-card ${s.id === state.sizeId ? 'selected' : ''}"
                    data-size="${s.id}" aria-pressed="${s.id === state.sizeId}"
                    aria-label="${t('size.' + s.id)}${s.ml ? ', ' + fmtVol(s.ml) : ''}">
              <div class="size-icon">${s.id === 'custom' ? customSVG() : cupSVG(s.id, s.ml)}</div>
              <div class="size-name">${t('size.' + s.id)}</div>
              <div class="size-ml">${s.ml ? fmtVol(s.ml) : t('size.free')}</div>
            </button>`).join('')}
        </div>
        ${state.sizeId === 'custom' ? `
          <div class="custom-ml-row">
            <label for="custom-ml">${t('lbl.volume')}</label>
            <input type="number" id="custom-ml" class="custom-ml-input"
                   value="${state.customMl}" min="50" max="1000" step="10" aria-label="Volume em ml">
            <span style="font-size:.85rem;color:var(--muted)">ml</span>
          </div>` : ''}
      </section>`;

  // ── Seção 2: intensity (hidden for espresso) ──
  const intensityWarning = state.intensityId === 'extra-forte' && state.methodId === 'prensa'
    ? `<p class="intensity-warning">${t('warn.prensa')}</p>`
    : '';
  const secao2 = isEspresso ? '' : `
      <section class="section">
        <h2 class="section-title">${t('sec.intensity')}</h2>
        <div class="intensity-group" role="group" aria-label="${t('sec.intensity')}" id="intensity-group">
          ${INTENSITIES.map(i => `
            <button class="intensity-btn ${i.id === state.intensityId ? 'selected' : ''}"
                    data-intensity="${i.id}" aria-pressed="${i.id === state.intensityId}"
                    style="--color:${i.color}; --bg-color:${i.bg}">
              <span class="intensity-dot"></span>
              <span class="intensity-name">${t('intensity.' + i.id)}</span>
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
        <h2 class="recipe-title">${t('recipe.title.espresso')}</h2>
        <div class="recipe-grid">
          <div class="recipe-row">
            <span class="recipe-icon">🌿</span>
            <span class="recipe-label">${t('lbl.dose')}</span>
            <span class="recipe-value" id="val-dose">${fmtWeight(recipe.dosePerShot)} × ${state.portions} = ${fmtWeight(recipe.dose)}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">💧</span>
            <span class="recipe-label">${t('lbl.yield')}</span>
            <span class="recipe-value" id="val-yield">${fmtVol(recipe.yieldPerShot)}–${fmtVol(recipe.yieldPerShot + 4)} × ${state.portions}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">📐</span>
            <span class="recipe-label">${t('lbl.moagem')}</span>
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
            <span class="recipe-label">${t('lbl.extracao')}</span>
            <span class="recipe-value">25–30s</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">🌡️</span>
            <span class="recipe-label">${t('lbl.temperatura')}</span>
            <span class="recipe-value">${fmtTemp(method.temp)}</span>
          </div>
        </div>
        ${espressoGrinderWarning}
        <div class="recipe-actions">
          <button class="btn-start" id="btn-start">${t('btn.start')}</button>
          <button class="btn-share" id="btn-share" aria-label="${t('btn.share')}">🔗</button>
        </div>
      </div>`
    : `<div class="recipe-card">
        <h2 class="recipe-title">${t('recipe.title.filter')}</h2>
        <div class="recipe-grid">
          <div class="recipe-row">
            <span class="recipe-icon">💧</span>
            <span class="recipe-label">${t('lbl.agua')}</span>
            <span class="recipe-value" id="val-agua">${fmtVol(recipe.aguaTotal)}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">🌿</span>
            <span class="recipe-label">${t('lbl.cafe')}</span>
            <span class="recipe-value" id="val-cafe">${fmtWeight(recipe.cafeG)}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">⏱</span>
            <span class="recipe-label">${t('lbl.tempo')}</span>
            <span class="recipe-value">${method.time}</span>
          </div>
          <div class="recipe-row">
            <span class="recipe-icon">📐</span>
            <span class="recipe-label">${t('lbl.moagem')}</span>
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
          <button class="btn-start" id="btn-start">${t('btn.start')}</button>
          <button class="btn-share" id="btn-share" aria-label="${t('btn.share')}">🔗</button>
        </div>
      </div>`;

  // ── Saiba mais (accordion) ──
  const espressoTips = isEspresso ? `
    <p class="acc-espresso-tip">⏱ <strong>25s = subextraído (azedo)</strong> · <strong>30s = ideal</strong> · <strong>>35s = sobrextraído (amargo)</strong></p>
    <p class="acc-espresso-tip">🔩 9 bar é o padrão. Máquinas domésticas de 15 bar devem usar menos café para compensar.</p>` : '';

  const calibrationTip = grinder
    ? `<p class="acc-calibration">🔧 <strong>${grinder.name}:</strong> ${method.calibration} Configuração para ${method.name}: <strong>${grinder.settings[state.methodId] || '—'} ${grinder.unit}</strong>.</p>`
    : '';

  const currentLang = LANGS.find(l => l.id === lang) || LANGS[0];
  document.getElementById('app').innerHTML = `
    <div class="config-screen" role="main">

      <header class="app-header">
        <div class="app-header-row">
          <button class="btn-lang" id="btn-lang" title="${currentLang.name}" aria-label="Language">${currentLang.flag}</button>
          <h1 class="app-title">☕ Coado</h1>
          <button class="btn-grinder-icon" id="btn-grinder-icon" title="Configurar moedor" aria-label="Configurar moedor">⚙️</button>
        </div>
        <p class="app-tagline">${t('tagline')}</p>
        <p class="app-version">v${APP_VERSION}</p>
        <div class="lang-panel" id="lang-panel" hidden>
          ${LANGS.map(l => `<button class="lang-btn ${l.id === lang ? 'selected' : ''}" data-lang="${l.id}">${l.flag} <span>${l.name}</span></button>`).join('')}
        </div>
      </header>

      ${grinderSection}

      <section class="section">
        <h2 class="section-title">${isEspresso ? t('sec.portions.espresso') : t('sec.portions.filter')}</h2>
        <div class="portion-selector">
          <button class="btn-round" id="btn-minus" aria-label="Diminuir">−</button>
          <span class="portion-count" aria-live="polite">${state.portions}</span>
          <button class="btn-round" id="btn-plus" aria-label="Aumentar">+</button>
        </div>
      </section>

      ${secao1}
      ${secao2}

      <section class="section">
        <h2 class="section-title">${t('sec.method')}</h2>
        <div class="method-grid" role="group" aria-label="${t('sec.method')}" id="method-grid">
          ${Object.entries(METHODS).map(([id, m]) => `
            <button class="method-card ${id === state.methodId ? 'selected' : ''}"
                    data-method="${id}" aria-pressed="${id === state.methodId}">
              <div class="method-icon">${methodSVG(id)}</div>
              <div class="method-name">${m.name}</div>
            </button>`).join('')}
        </div>
        <div class="method-tip" role="status">${method.tip}</div>
      </section>

      <section class="section" aria-label="${t('recipe.title.filter')}">
        ${recipeCard}
      </section>

      <section class="section">
        <h2 class="section-title">${t('sec.notes')} — ${method.name}${isEspresso ? ' · ' + (state.shotType === 'duplo' ? t('shot.duplo') : t('shot.simples')) : ' · ' + t('intensity.' + state.intensityId)}</h2>
        <textarea class="notes-area" id="notes-area"
                  placeholder="${t('done.notes.placeholder')}"
                  rows="3">${escapeHtml(note)}</textarea>
      </section>

      <section class="section">
        <details class="accordion">
          <summary class="accordion-summary">💡 ${t('sec.learn')} — ${method.name}</summary>
          <div class="accordion-body">
            <p class="acc-temp">🌡️ ${t('lbl.temperatura')}: <strong>${fmtTemp(method.temp)}</strong></p>
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
            📋 ${t('sec.history')}${hist.length > 0 ? ` (${hist.length})` : ''}
          </summary>
          <div class="accordion-body">
            ${hist.length === 0
              ? `<p class="history-empty">${t('hist.empty').replace('\n', '<br>')}</p>`
              : `<div class="history-list" id="history-list">
                  ${hist.map((h, i) => {
                    const hI = INTENSITIES.find(x => x.id === h.intensityId);
                    const hM = METHODS[h.methodId];
                    const stars = h.rating ? ('⭐'.repeat(h.rating) + '☆'.repeat(5 - h.rating)) : '';
                    return `<div class="history-item" data-hist="${i}" role="button" tabindex="0">
                      <div class="history-item-top">
                        <span class="history-badge">${hM ? hM.name : h.methodId}</span>
                        ${h.methodId !== 'espresso' && hI ? `<span class="history-badge history-badge-intensity" style="--color:${hI.color}">${t('intensity.' + hI.id)}</span>` : ''}
                        ${h.methodId === 'espresso' ? `<span class="history-badge" style="background:#4A2512">${h.shotType === 'simples' ? t('shot.simples') : t('shot.duplo')}</span>` : ''}
                        ${stars ? `<span class="history-stars">${stars}</span>` : ''}
                        <span class="history-date">${formatDate(h.ts)}</span>
                        <button class="btn-hist-delete" data-delete-hist="${i}" aria-label="${t('hist.delete.aria')}">🗑</button>
                      </div>
                      <div class="history-item-info">
                        ${h.portions}× ${h.sizeName} · ${fmtVol(h.aguaTotal)} · ${fmtWeight(h.cafeG)}
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

function deleteHistoryItem(idx) {
  const hist = loadHistory();
  hist.splice(idx, 1);
  try { localStorage.setItem('coado-history', JSON.stringify(hist)); } catch {}
  renderConfig();
  showToast(t('hist.delete.toast'));
}

function bindConfigEvents() {
  document.getElementById('btn-grinder-icon').addEventListener('click', () => {
    const section = document.getElementById('section-grinder');
    const accordion = document.getElementById('grinder-accordion');
    if (accordion && !accordion.open) accordion.open = true;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const btnLang = document.getElementById('btn-lang');
  if (btnLang) {
    btnLang.addEventListener('click', e => {
      const panel = document.getElementById('lang-panel');
      if (panel) {
        panel.hidden = !panel.hidden;
        e.stopPropagation();
      }
    });
  }
  const langPanel = document.getElementById('lang-panel');
  if (langPanel) {
    langPanel.addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      langPanel.hidden = true;
      setLang(btn.dataset.lang);
    });
    document.addEventListener('click', () => {
      const p = document.getElementById('lang-panel');
      if (p) p.hidden = true;
    });
  }

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
      // Handle delete button
      const delBtn = e.target.closest('[data-delete-hist]');
      if (delBtn) {
        e.stopPropagation();
        deleteHistoryItem(parseInt(delBtn.dataset.deleteHist));
        return;
      }
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
      showToast(t('hist.restore.toast'));
    };
    histList.addEventListener('click', restore);
    histList.addEventListener('keydown', restore);
  }
}

function refreshRecipe() {
  const recipe = calcRecipe();
  const el1 = document.getElementById('val-agua');
  const el2 = document.getElementById('val-cafe');
  if (el1) el1.textContent = fmtVol(recipe.aguaTotal);
  if (el2) el2.textContent = fmtWeight(recipe.cafeG);
}

// ─── RENDER PREP ──────────────────────────────────────────────────────────────

function renderPrep() {
  const recipe = calcRecipe();
  const steps = calcSteps(recipe);
  const idx = prepState.stepIndex;
  const step = steps[idx];
  const total = steps.length;
  const isEspresso = METHODS[state.methodId].isEspresso;
  // Usa override se o usuário ajustou o volume real despejado em ataques anteriores
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
        <div class="timer-label">${t('prep.waiting')}</div>
        <div class="timer-value" id="timer-value" aria-live="polite">${formatTime(prepState.timeLeft)}</div>
        <button class="btn-skip" id="btn-skip-wait">${t('prep.skip')}</button>
      </div>`;
  } else {
    const cumulativePoured = pouredBefore + currentVol;
    const hasOverride = prepState.stepOverride[idx] !== undefined;
    const volBar = step.vol && !isEspresso ? `
      <div class="step-volume">
        <div class="volume-bar" role="progressbar" aria-valuenow="${cumulativePoured}" aria-valuemax="${recipe.aguaTotal}">
          <div class="volume-bar-fill" style="width:${Math.min(100, (cumulativePoured / recipe.aguaTotal) * 100).toFixed(1)}%"></div>
        </div>
      </div>
      <div class="pour-current">
        <span class="pour-current-value">${fmtVol(currentVol)}</span>
        ${hasOverride ? `<span class="vol-adjusted">${t('pour.adjusted')}</span>` : ''}
        <span class="pour-current-label">${t('pour.neste')}</span>
      </div>
      <div class="pour-adjust">
        <button class="btn-pour-adj" id="btn-pour-minus" aria-label="Diminuir 5ml">−5 ml</button>
        <span class="pour-adjust-label">${t('pour.adjust.label')}</span>
        <button class="btn-pour-adj" id="btn-pour-plus" aria-label="Aumentar 5ml">+5 ml</button>
      </div>
      <div class="pour-stats-grid">
        <div class="pour-stat">
          <span class="pour-stat-label">${t('pour.stats.poured')}</span>
          <span class="pour-stat-value">${fmtVol(pouredBefore)}</span>
        </div>
        <div class="pour-stat pour-stat-accent">
          <span class="pour-stat-label">${t('pour.stats.after')}</span>
          <span class="pour-stat-value">${fmtVol(cumulativePoured)}</span>
        </div>
        <div class="pour-stat">
          <span class="pour-stat-label">${t('pour.stats.remaining')}</span>
          <span class="pour-stat-value">${fmtVol(Math.max(0, remaining))}</span>
        </div>
        <div class="pour-stat pour-stat-muted">
          <span class="pour-stat-label">${t('pour.stats.total')}</span>
          <span class="pour-stat-value">${fmtVol(recipe.aguaTotal)}</span>
        </div>
      </div>` : '';

    const hint = step.checklist
      ? `<p class="step-checklist-hint">${t('prep.hint.checklist')}</p>`
      : (step.wait && !step.vol ? `<p class="step-checklist-hint">${t('prep.hint.timer', { time: step.waitLabel })}</p>` : '');

    bodyHTML = `${volBar}${hint}
      <div class="prep-actions">
        ${idx > 0 ? `<button class="btn-back" id="btn-back">${t('prep.back')}</button>` : '<span></span>'}
        <button class="btn-done" id="btn-done">${step.checklist ? t('prep.confirm.checklist') : (isEspresso ? t('prep.confirm.espresso') : t('prep.confirm.pour'))}</button>
      </div>`;
  }

  document.getElementById('app').innerHTML = `
    <div class="prep-screen" role="main">
      <div class="prep-header">
        <button class="btn-close" id="btn-close" aria-label="${t('prep.close')}">${t('prep.close')}</button>
        <div class="prep-progress">${t('prep.attack')} ${idx + 1} ${t('prep.of')} ${total}</div>
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
    ? `Espresso · ${state.shotType === 'simples' ? t('shot.simples') : t('shot.duplo')}`
    : `${method.name} · ${t('intensity.' + state.intensityId)}`;

  const recipeRows = isEspresso ? `
    <div class="done-recipe-row"><span>${t('lbl.dose')}</span><strong>${fmtWeight(recipe.dosePerShot)} × ${state.portions} = ${fmtWeight(recipe.dose)}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.yield')}</span><strong>${fmtVol(recipe.yieldPerShot)}–${fmtVol(recipe.yieldPerShot + 4)} × ${state.portions}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.moagem')}</span><strong>${grinderDisplay.value}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.extracao')}</span><strong>25–30s</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.temperatura')}</span><strong>${fmtTemp(method.temp)}</strong></div>
  ` : `
    <div class="done-recipe-row"><span>${t('lbl.agua')}</span><strong>${fmtVol(recipe.aguaTotal)}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.cafe')}</span><strong>${fmtWeight(recipe.cafeG)}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.moagem')}</span><strong>${grinderDisplay.value}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.tempo')}</span><strong>${method.time}</strong></div>
    <div class="done-recipe-row"><span>${t('lbl.temperatura')}</span><strong>${fmtTemp(method.temp)}</strong></div>
    ${!isEspresso ? `<div class="done-recipe-row"><span>${t('lbl.intensidade')}</span><strong>${t('intensity.' + state.intensityId)} (${intensity.ratio})</strong></div>` : ''}
  `;

  document.getElementById('app').innerHTML = `
    <div class="done-screen" role="main">
      <div class="done-emoji" aria-hidden="true">☕</div>
      <h2 class="done-title">${t('done.title')}</h2>
      <p class="done-msg">${t('done.msg')}</p>
      ${elapsed > 0 ? `<p class="done-time">${t('done.time.label')} <strong>${formatTime(elapsed)}</strong></p>` : ''}

      <div class="done-recipe-card">
        <div class="done-recipe-title">${method.name}${!isEspresso ? ' · ' + t('intensity.' + state.intensityId) : ' · ' + (state.shotType === 'duplo' ? t('shot.duplo') : t('shot.simples'))} · ${state.portions} ${t('lbl.porcoes')}</div>
        ${recipeRows}
      </div>

      <div class="rating-group" id="rating-group">
        <p class="rating-label">${t('done.rating.q')}</p>
        <div class="stars" id="stars" role="group" aria-label="${t('done.rating.q')}">
          ${[1,2,3,4,5].map(n =>
            `<button class="star-btn" data-star="${n}" aria-label="${n} estrela${n > 1 ? 's' : ''}">☆</button>`
          ).join('')}
        </div>
      </div>

      <div class="done-notes">
        <label class="done-notes-label" for="done-notes-area">${t('sec.notes')} — ${noteLabel}</label>
        <textarea class="notes-area" id="done-notes-area"
                  placeholder="${t('done.notes.placeholder')}"
                  rows="3">${escapeHtml(note)}</textarea>
      </div>

      <button class="btn-share-done" id="btn-share-done">${t('btn.share')}</button>
      <button class="btn-restart" id="btn-restart">${t('btn.restart')}</button>
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
// Apply current language direction on init
(function() {
  const l = LANGS.find(x => x.id === lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = l?.dir ?? 'ltr';
})();
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
