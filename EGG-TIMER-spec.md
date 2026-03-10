# Coado — Egg Timer (Ovo Cozido) · Especificação Funcional v1.0

**Funcionalidade complementar** ao app Coado: um timer de precisão para cozinhar ovos com a textura perfeita da gema. Segue a mesma filosofia de UX do app — rápido, intuitivo, sem fricção.

---

## Motivação

Cozinhar ovo parece simples, mas acertar o ponto exato da gema exige precisão de tempo. Assim como o Coado ajuda a fazer café perfeito, o Egg Timer ajuda a fazer ovo perfeito.

---

## Acesso

### Botão na Home

Na header do app, ao lado do botão ⚙️ (configurar moedor), adicionar um botão com ícone de ovo:

```
┌──────────────────────────────────────┐
│ 🇧🇷  ☕ Coado          🥚  ⚙️       │
│    Seu café, do jeito certo.         │
│                v3.8                  │
└──────────────────────────────────────┘
```

- **Ícone**: 🥚 (emoji de ovo)
- **Classe CSS**: `.btn-egg-timer`
- **Posição**: à esquerda do ⚙️, na mesma `.app-header-row`
- **Aria-label**: "Timer de ovo cozido"
- **Comportamento**: ao clicar, renderiza a tela do Egg Timer (substitui o conteúdo do `#app`, igual ao modo preparo do café)

---

## Tela Principal — Egg Timer

### Layout

```
┌──────────────────────────────────────┐
│       ← Voltar       🥚 Ovo Cozido  │
├──────────────────────────────────────┤
│                                      │
│         Escolha o ponto:             │
│                                      │
│  ┌────────────┐  ┌────────────┐      │
│  │   🟡       │  │   🟠       │      │
│  │  Mole      │  │ Médio-mole │      │
│  │  6 min     │  │  8 min     │      │
│  └────────────┘  └────────────┘      │
│                                      │
│  ┌────────────┐  ┌────────────┐      │
│  │   🟤       │  │   🔵       │      │
│  │  Médio     │  │   Duro     │      │
│  │  10 min    │  │  12 min    │      │
│  └────────────┘  └────────────┘      │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  🔢 Personalizado            │    │
│  │  Escolha os minutos          │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌── Quantidade ────────────────┐    │
│  │  [ − ]     3 ovos    [ + ]   │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌── Tamanho do ovo ───────────┐     │
│  │  ( ) Pequeno (P)            │     │
│  │  (●) Médio/Grande (M/G)     │     │
│  │  ( ) Jumbo (XL)             │     │
│  └─────────────────────────────┘     │
│                                      │
│  ℹ️ Dica: Ovos em temperatura       │
│  ambiente cozinham mais rápido.      │
│  Ajuste +1 min se tirar da          │
│  geladeira.                          │
│                                      │
│         [ 🥚 Iniciar Timer ]         │
│                                      │
└──────────────────────────────────────┘
```

---

### Pontos de Cozimento

| Ponto | Tempo base (M/G) | Cor indicativa | Descrição da gema |
|-------|-------------------|----------------|-------------------|
| Mole | 6 min | 🟡 Amarelo | Gema totalmente líquida, cremosa |
| Médio-mole | 8 min | 🟠 Laranja | Gema com exterior firme, centro cremoso (jammy egg) |
| Médio | 10 min | 🟤 Marrom | Gema quase toda firme, leve umidade no centro |
| Duro | 12 min | 🔵 Azul/cinza | Gema completamente firme e seca |
| Personalizado | X min | 🔢 | Usuário define o tempo |

#### Ajuste por tamanho do ovo

| Tamanho | Ajuste |
|---------|--------|
| Pequeno (P) | −1 min |
| Médio/Grande (M/G) | 0 (base) |
| Jumbo (XL) | +1 min |

#### Ajuste por temperatura do ovo

Exibir dica informativa (não calcular automaticamente):
> *"Ovos direto da geladeira? Adicione +1 minuto ao tempo. Ou deixe em temperatura ambiente por 10 min antes."*

---

### Quantidade de Ovos

- Seletor `−` / `+` igual ao de porções de café
- Range: 1 a 12 ovos
- Padrão: 3 ovos
- **Nota**: a quantidade é informativa/registro — o tempo de cozimento não muda com a quantidade (desde que todos caibam na panela cobertos por água)

---

## Tela de Preparo — Timer Ativo

### Instruções passo a passo

O preparo segue um checklist guiado (similar ao modo espresso):

| Etapa | Instrução | Timer |
|-------|-----------|-------|
| 1 | Coloque {N} ovo(s) em uma panela | — |
| 2 | Cubra com água fria (2cm acima dos ovos) | — |
| 3 | Leve ao fogo alto até ferver | — |
| 4 | Quando ferver, reduza para fogo médio-baixo | — |
| 5 | Agora conte o tempo! | ⏱ {X} min |
| 6 | Retire e coloque em banho de gelo imediatamente | — |
| 7 | Aguarde 2 minutos no gelo | ⏱ 2 min |
| 8 | Ovos prontos! Descasque e sirva | — |

### Layout da tela de timer (etapa 5)

```
┌──────────────────────────────────────┐
│                                      │
│         🥚 Ovo Cozido                │
│         Ponto: Médio-mole            │
│                                      │
│     ┌─────────────────────┐          │
│     │                     │          │
│     │      07:42          │          │
│     │                     │          │
│     │   ████████░░░░  65% │          │
│     │                     │          │
│     └─────────────────────┘          │
│                                      │
│     Tempo total: 8:00                │
│     3 ovos · Médio/Grande            │
│                                      │
│         [ ✕ Cancelar ]               │
│                                      │
└──────────────────────────────────────┘
```

**Timer:**
- Contagem regressiva (ex: 08:00 → 00:00)
- Barra de progresso visual
- Quando chegar a 00:00: alerta sonoro (mesmo sistema de áudio do café) + vibração (se suportado pelo dispositivo)
- Tela não deve apagar durante o timer (usar Wake Lock API se disponível)

---

## Tela de Conclusão

```
┌──────────────────────────────────────┐
│                                      │
│         🥚 Ovos prontos!             │
│                                      │
│     Bom apetite! 😋                 │
│                                      │
│  ⏱ Cozimento: 8:00                  │
│                                      │
│  ┌── Resumo ───────────────────┐     │
│  │ Ponto      Médio-mole       │     │
│  │ Quantidade 3 ovos           │     │
│  │ Tamanho   Médio/Grande      │     │
│  │ Tempo     8 min             │     │
│  └─────────────────────────────┘     │
│                                      │
│  Como ficaram os ovos?               │
│  ☆ ☆ ☆ ☆ ☆                         │
│                                      │
│  ┌── Notas ──────────────────────┐   │
│  │ campo de texto livre          │   │
│  └───────────────────────────────┘   │
│                                      │
│    [ 🥚 Fazer mais ovos ]            │
│    [ ☕ Voltar ao café ]              │
│                                      │
└──────────────────────────────────────┘
```

---

## Persistência

| Chave localStorage | Conteúdo |
|---------------------|----------|
| `coado-egg-state` | `{ firmness: 'medium-soft', qty: 3, size: 'md' }` |
| `coado-egg-history` | Array com últimos 10 registros de ovos cozidos |

### Estrutura do histórico

```json
{
  "date": "2026-03-10T07:30:00Z",
  "firmness": "medium-soft",
  "minutes": 8,
  "qty": 3,
  "size": "md",
  "rating": 4,
  "notes": "Ficou perfeito hoje!"
}
```

---

## Internacionalização

Adicionar as seguintes chaves ao objeto `T` para os 8 idiomas suportados:

| Chave | PT-BR | EN |
|-------|-------|-----|
| `egg.title` | Ovo Cozido | Boiled Egg |
| `egg.subtitle` | Timer de precisão | Precision Timer |
| `egg.firmness` | Escolha o ponto | Choose firmness |
| `egg.soft` | Mole | Soft |
| `egg.medium-soft` | Médio-mole | Medium-soft |
| `egg.medium` | Médio | Medium |
| `egg.hard` | Duro | Hard |
| `egg.custom` | Personalizado | Custom |
| `egg.qty` | Quantidade | Quantity |
| `egg.size` | Tamanho do ovo | Egg size |
| `egg.size.sm` | Pequeno (P) | Small |
| `egg.size.md` | Médio/Grande (M/G) | Medium/Large |
| `egg.size.xl` | Jumbo (XL) | Jumbo (XL) |
| `egg.start` | Iniciar Timer | Start Timer |
| `egg.done` | Ovos prontos! | Eggs done! |
| `egg.back` | Voltar ao café | Back to coffee |
| `egg.again` | Fazer mais ovos | Make more eggs |
| `egg.tip.fridge` | Ovos direto da geladeira? Adicione +1 minuto. | Eggs from the fridge? Add +1 minute. |
| `egg.step.place` | Coloque {n} ovo(s) em uma panela | Place {n} egg(s) in a pot |
| `egg.step.water` | Cubra com água fria (2cm acima) | Cover with cold water (2cm above) |
| `egg.step.boil` | Leve ao fogo alto até ferver | Bring to a boil on high heat |
| `egg.step.reduce` | Reduza para fogo médio-baixo | Reduce to medium-low heat |
| `egg.step.timer` | Agora conte o tempo! | Now count the time! |
| `egg.step.ice` | Coloque em banho de gelo | Place in ice bath |
| `egg.step.ice.wait` | Aguarde 2 min no gelo | Wait 2 min in ice |
| `egg.step.serve` | Descasque e sirva! | Peel and serve! |
| `egg.rating` | Como ficaram os ovos? | How were the eggs? |

---

## Estilo Visual

Seguir o design system existente do Coado:

- Cards de ponto: mesma estrutura dos `.method-card` (grid 2×2)
- Timer: estilo similar ao timer de preparo do café (header com gradiente, contagem grande)
- Cores: usar as CSS variables existentes (`--accent`, `--surface`, `--border`, etc.)
- Cor de destaque do egg timer: `--egg-accent: #E8A317` (dourado/gema) — usada apenas nos cards de ponto e no ícone
- Barra de progresso: reutilizar `.volume-bar` existente
- Botões: reutilizar `.btn-start`, `.btn-round`, `.btn-done`
- Transições: mesmos 0.18s ease do app
- Border radius: `--radius` (14px) e `--radius-sm` (8px)

---

## Service Worker

Atualizar o `sw.js`:
- Incrementar versão do cache (ex: `coado-v3.8`)
- Nenhum asset novo necessário (tudo inline no `app.js` e `style.css`)

---

## Navegação

```
[Home — Config Screen]
    │
    ├── 🥚 (btn-egg-timer) ──→ [Egg Timer Config]
    │                               │
    │                               ├── [▶ Iniciar] ──→ [Egg Timer Prep — checklist + timer]
    │                               │                        │
    │                               │                        └── [Conclusão — rating + notas]
    │                               │                                 │
    │                               │                                 ├── [🥚 Fazer mais ovos] ──→ [Egg Timer Config]
    │                               │                                 └── [☕ Voltar ao café] ──→ [Home]
    │                               │
    │                               └── [← Voltar] ──→ [Home]
    │
    ├── ⚙️ (grinder) ──→ [Toggle grinder accordion]
    └── [▶ Iniciar Preparo café] ──→ [Modo Preparo café]
```

---

## Fórmula de Cálculo

```javascript
function calcEggTime(firmness, size) {
  const BASE_TIMES = {
    'soft': 6,
    'medium-soft': 8,
    'medium': 10,
    'hard': 12
  };

  const SIZE_ADJUST = {
    'sm': -1,   // Pequeno
    'md': 0,    // Médio/Grande (base)
    'xl': +1    // Jumbo
  };

  return BASE_TIMES[firmness] + SIZE_ADJUST[size];
}
```

---

## O que NÃO incluir

- ❌ Método sous-vide / imersão precisa
- ❌ Receitas de ovo (frito, mexido, pochê, omelete) — apenas cozido
- ❌ Cálculo baseado em altitude
- ❌ Integração com termômetro / sensor
- ❌ Histórico cruzado com café (são independentes)

---

## Changelog

### v3.8 (planejado)
- **Egg Timer**: Timer de precisão para ovo cozido com 4 pontos pré-definidos + personalizado
- **Botão 🥚 na home**: acesso rápido ao timer de ovo ao lado do ⚙️
- **Checklist guiado**: instruções passo a passo para cozimento perfeito
- **Banho de gelo**: timer extra de 2 min para o choque térmico
- **Avaliação e notas**: registro do resultado para aprendizado
- **Persistência**: preferências e histórico salvos em localStorage
- **Internacionalização**: suporte nos 8 idiomas do app

---

*Coado Egg Timer — Especificação v1.0 · Aguardando aprovação para implementação*
