# Coado — Especificação Funcional

**Coado** é um aplicativo web mobile-first para auxiliar na preparação de café orgânico moído. A interface é minimalista e de uso rápido, pensada para ser acessada pela manhã com poucos toques.

---

## Identidade

- **Nome**: Coado
- **Tagline sugerida**: *"Seu café, do jeito certo."*
- **Idioma**: Português brasileiro
- **Plataforma**: Web, mobile-first (PWA)

---

## Público-Alvo

Usuário único, uso pessoal, pela manhã. A experiência deve ser **rápida, intuitiva e sem fricção**. O usuário não quer ler — quer tocar e preparar o café.

---

## Stack

- HTML + CSS + JavaScript puro (sem frameworks, para leveza máxima)
- PWA simples (manifesto + service worker básico para funcionar offline)
- Armazenamento de preferências no `localStorage`

---

## Arquitetura de Telas

O app tem **dois modos**:

1. **Modo Configuração** — tela única com scroll vertical, onde o usuário define sua receita
2. **Modo Preparo** — tela imersiva passo a passo, ativada ao iniciar o preparo

---

## MODO CONFIGURAÇÃO

### Seção 0 — Seleção de Moedor (opcional, persistida)

Exibida **uma única vez na primeira abertura do app**, e sempre acessível via ícone de configuração no canto superior. O usuário seleciona seu moedor para que o app exiba configurações precisas de moagem ao longo de toda a experiência.

**Comportamento:**
- Se nenhum moedor for selecionado, o app exibe descrições genéricas de moagem (ex: "Moagem média-fina")
- Se um moedor for selecionado, o app exibe o número de cliques/posição específico para aquele modelo
- A seleção é salva no `localStorage` e persiste entre sessões
- Pode ser alterada a qualquer momento via ícone de configuração (⚙️) no topo da tela

**Moedores disponíveis:**

| Moedor | Tipo de ajuste | Observação |
|--------|---------------|------------|
| Timemore C2 | Cliques a partir do zero | Popular, excelente custo-benefício |
| Timemore C3 / C3 Pro | Cliques a partir do zero | Sucessor do C2, burrs S2C |
| Timemore C3S | Cliques a partir do zero | Versão compacta do C3 |
| Comandante C40 | Cliques a partir do zero | Referência premium alemã |
| 1Zpresso JX | Rotações + número + clique (ex: 2.5.0) | Formato: rotações.número.clique |
| 1Zpresso JX-Pro | Rotações + número + clique (ex: 2.5.0) | Mais preciso para espresso |
| Baratza Encore | Número de 1 a 40 | Elétrico; números maiores = moagem mais grossa |
| Hario Skerton Pro | Cliques a partir do zero | Clássico, moagem irregular em configurações finas |
| Sem moedor específico | — | Exibe descrições genéricas |

> ⚠️ **Nota importante a exibir ao usuário**: Os valores de cliques são pontos de partida. Fatores como torra, origem do grão, umidade e preferência pessoal podem exigir ajuste fino de ±2 a 3 cliques.

---

### Seção 1 — Quantidade de Xícaras / Copos

**Seletor de número de porções**
- Botões `–` e `+` com o número centralizado, de 1 a 10

**Seletor de tamanho do recipiente**
- Exibido como **cards horizontais roláveis**
- Cada card contém um **ícone SVG de silhueta do recipiente** + nome + volume em ml
- Os ícones SVG devem ser escalados **proporcionalmente ao volume real** de cada recipiente — a caneca (300ml) deve parecer visualmente ~3,75× maior que a xícara pequena (80ml), transmitindo a diferença de quantidade de forma imediata, sem exigir leitura

| Opção           | Volume | Ícone SVG                              |
|-----------------|--------|----------------------------------------|
| Xícara pequena  | 80 ml  | Silhueta pequena de xícara com pires   |
| Xícara média    | 120 ml | Silhueta média de xícara               |
| Xícara grande   | 150 ml | Silhueta grande de xícara              |
| Copo americano  | 200 ml | Silhueta de copo alto                  |
| Caneca          | 300 ml | Silhueta de caneca larga               |
| Personalizado   | livre  | Ícone de lápis + campo numérico livre  |

---

### Seção 2 — Intensidade do Café

**3 botões visuais** de seleção única:
- 🟢 Suave
- 🟡 Equilibrado *(padrão)*
- 🔴 Forte

A **proporção no formato barista** (ex: `1:16`) deve ser exibida junto ao botão selecionado como informação secundária, permitindo que o usuário aprenda a linguagem de café de especialidade naturalmente com o uso.

| Intensidade | Gramas por 100ml | Formato barista |
|-------------|------------------|-----------------|
| Suave       | 5g / 100ml       | 1:20            |
| Equilibrado | 6g / 100ml       | 1:16            |
| Forte       | 8g / 100ml       | 1:12            |

---

### Seção 3 — Método de Preparo

Cards tocáveis com ícone/ilustração simples. Ao selecionar, uma dica rápida de 1 linha aparece abaixo.

| Método          | Ícone sugerido | Dica rápida                                          |
|-----------------|----------------|------------------------------------------------------|
| V60             | Funil/cone     | Moagem média-fina. Despeje em espiral. ~3 min        |
| Chemex          | Ampulheta      | Moagem média-grossa. Despeje lentamente. ~4 min      |
| Prensa Francesa | Êmbolo         | Moagem grossa. Aguarde 4 min antes de pressionar     |
| Coador de pano  | Pano/saco      | Moagem média. Tradicional e ideal para café orgânico |

**Compensação de água por método** (aplicada automaticamente):

| Método          | Fator de compensação |
|-----------------|----------------------|
| V60             | +0%                  |
| Chemex          | +5%                  |
| Prensa Francesa | +10%                 |
| Coador de pano  | +5%                  |

---

### Seção 4 — Resultado (Card de Destaque)

Exibido em tempo real, atualizado automaticamente a cada mudança nas seções acima.

**Sem moedor selecionado:**
```
┌─────────────────────────────────┐
│  ☕ Sua receita                  │
│                                 │
│  💧 Água:     XXX ml            │
│  🌿 Café:     XX g              │
│  ⏱ Tempo:    ~ X min           │
│  📐 Moagem:   Média-fina        │
│                                 │
│       [ ▶ Iniciar Preparo ]     │
└─────────────────────────────────┘
```

**Com moedor selecionado (ex: Timemore C3):**
```
┌─────────────────────────────────┐
│  ☕ Sua receita                  │
│                                 │
│  💧 Água:     XXX ml            │
│  🌿 Café:     XX g              │
│  ⏱ Tempo:    ~ X min           │
│  📐 Moagem:   20 cliques        │
│     Timemore C3 · Média-fina    │
│                                 │
│       [ ▶ Iniciar Preparo ]     │
└─────────────────────────────────┘
```

- **Água**: volume total em ml, com fator de compensação do método já aplicado
- **Café**: gramas a moer
- **Tempo estimado**: de acordo com o método
- **Moagem**: descrição genérica se sem moedor; número de cliques + modelo se moedor selecionado
- **Botão "▶ Iniciar Preparo"**: ativa o Modo Preparo

---

### Seção 5 — Dica do Método (Acordeão)

Colapsado por padrão. Ao tocar em "saiba mais", expande com:

- Passo a passo simplificado do método (3–5 passos)
- Temperatura ideal da água:
  - V60: 92–94°C
  - Chemex: 90–93°C
  - Prensa Francesa: 92–96°C
  - Coador de pano: 90–92°C
- Dica sobre café orgânico (ex: *"Cafés orgânicos naturais tendem a ter notas frutadas — evite água fervendo para preservar o aroma"*)
- **Se moedor selecionado**: dica de como calibrar o zero do moedor antes de contar os cliques

---

## TABELA DE CONFIGURAÇÕES DE MOEDOR POR MÉTODO

Esta é a tabela de dados interna que o app usa para exibir o número correto de cliques no card de resultado. Todos os valores são pontos de partida recomendados para café de torra média — o usuário deve ajustar ±2 a 3 cliques conforme o resultado na xícara.

### Timemore C2

Sistema: cliques a partir do zero. Mínimo recomendado: 6 cliques (abaixo pode danificar as burrs).

| Método          | Cliques recomendados | Categoria        |
|-----------------|----------------------|------------------|
| V60             | 18–22                | Média-fina       |
| Chemex          | 22–26                | Média-grossa     |
| Coador de pano  | 20–24                | Média            |
| Prensa Francesa | 26–30                | Grossa           |

> O C2 não é recomendado para espresso — range de ajuste muito pequeno na faixa fina.

---

### Timemore C3 / C3 Pro

Sistema: cliques a partir do zero. Mínimo recomendado: 6 cliques. Burrs S2C (Spike to Cut).

| Método          | Cliques recomendados | Categoria        |
|-----------------|----------------------|------------------|
| V60             | 15–20                | Média-fina       |
| Chemex          | 20–24                | Média-grossa     |
| Coador de pano  | 18–22                | Média            |
| Prensa Francesa | 22–26                | Grossa           |

> O C3 consegue moer para espresso (6–12 cliques), mas o range de ajuste é limitado — use apenas com máquinas de pressurized basket.

---

### Timemore C3S

Sistema: cliques a partir do zero. Versão compacta com mesmas burrs do C3.

| Método          | Cliques recomendados | Categoria        |
|-----------------|----------------------|------------------|
| V60             | 14–18                | Média-fina       |
| Chemex          | 18–22                | Média-grossa     |
| Coador de pano  | 16–20                | Média            |
| Prensa Francesa | 20–25                | Grossa           |

---

### Comandante C40

Sistema: cliques a partir do zero. Referência da indústria — ~30 microns por clique.

| Método          | Cliques recomendados | Categoria        |
|-----------------|----------------------|------------------|
| V60             | 22–28                | Média-fina       |
| Chemex          | 28–34                | Média-grossa     |
| Coador de pano  | 24–30                | Média            |
| Prensa Francesa | 32–38                | Grossa           |

> Para espresso: 10–15 cliques. O Comandante é um dos poucos hand grinders que performa bem para espresso.

---

### 1Zpresso JX

Sistema: rotações + número + clique (ex: `2.5.0` = 2 rotações completas, posição 5, clique 0). Cada rotação = 40 cliques = 0,5mm de ajuste.

| Método          | Configuração recomendada | Equivalente em cliques totais |
|-----------------|--------------------------|-------------------------------|
| V60             | 2.5.0 – 3.5.0            | ~100–140 cliques              |
| Chemex          | 3.5.0 – 4.2.0            | ~140–168 cliques              |
| Coador de pano  | 3.0.0 – 4.0.0            | ~120–160 cliques              |
| Prensa Francesa | 4.0.0 – 5.0.0            | ~160–200 cliques              |

> O JX é otimizado para café de filtro. Para espresso, o JX-Pro oferece mais precisão.

---

### 1Zpresso JX-Pro

Sistema: rotações + número + clique (ex: `1.5.0`). Mesmo sistema do JX, burrs ligeiramente diferentes.

| Método          | Configuração recomendada | Categoria        |
|-----------------|--------------------------|------------------|
| Espresso        | 1.0.0 – 2.0.0            | Fina             |
| V60             | 2.2.0 – 3.5.0            | Média-fina       |
| Chemex          | 3.2.0 – 4.0.0            | Média-grossa     |
| Coador de pano  | 2.8.0 – 3.8.0            | Média            |
| Prensa Francesa | 4.0.0 – 4.8.0            | Grossa           |

---

### Baratza Encore

Sistema: número de 1 a 40 impresso no anel do hopper. **Números maiores = moagem mais grossa** (ao contrário dos manuais de cliques). Elétrico.

| Método          | Configuração recomendada | Categoria        |
|-----------------|--------------------------|------------------|
| V60             | 15–20                    | Média-fina       |
| Chemex          | 20–26                    | Média-grossa     |
| Coador de pano  | 18–24                    | Média            |
| Prensa Francesa | 28–35                    | Grossa           |

> O Encore não é recomendado para espresso — ajuste muito impreciso na faixa fina. Use o setting 8 apenas em máquinas com pressurized basket.

> ⚙️ **Como ajustar**: gire o hopper (parte superior) alinhando a linha branca ao número desejado. Ajuste sempre com o moedor ligado para preservar as burrs.

---

### Hario Skerton Pro

Sistema: cliques a partir do zero (ajuste na parte inferior do moedor).

| Método          | Cliques recomendados | Categoria        |
|-----------------|----------------------|------------------|
| V60             | 6–8                  | Média-fina       |
| Chemex          | 8–10                 | Média-grossa     |
| Coador de pano  | 7–9                  | Média            |
| Prensa Francesa | 10–14                | Grossa           |

> O Skerton Pro tem desempenho irregular em moagens finas. Evite usar para espresso. Para café de filtro, funciona bem.

---

## MODO PREPARO

Ativado pelo botão "▶ Iniciar Preparo". A tela muda completamente para uma interface imersiva de **uma etapa por vez**.

### Interface de Cada Etapa

```
┌──────────────────────────────────────┐
│  ETAPA 2 de 4                        │
│                                      │
│  💧 Primeiro Despeje                 │
│     Corpo e Doçura                   │
│                                      │
│  ───────────── 120 ml ──────────── │
│                                      │
│  Total despejado até agora: 172 ml  │
│  Restante: 178 ml                   │
│                                      │
│  💡 Despeje em espiral do centro     │
│     para fora. Leve e contínuo.      │
│                                      │
│         [ ✓ Despejei ]               │
└──────────────────────────────────────┘
```

- **"✓ Despejei"** — avança para a próxima etapa
- **"← Voltar"** — retorna à etapa anterior
- **"✕ Encerrar"** — volta ao Modo Configuração

---

### Etapas por Método

Os volumes são calculados automaticamente com base no `água_com_compensação_ml` da receita.

#### V60

| Etapa | Nome             | Objetivo                        | Volume              | Aguardar |
|-------|------------------|---------------------------------|---------------------|----------|
| 1     | Bloom            | Liberar CO₂, despertar o café   | café_g × 2 ml       | 30–45s   |
| 2     | Primeiro Despeje | Doçura e corpo                  | ~40% do restante    | —        |
| 3     | Segundo Despeje  | Acidez e complexidade           | ~35% do restante    | —        |
| 4     | Despeje Final    | Equilíbrio e volume             | restante            | —        |

Tempo total estimado: **2:30–3:30 min**

#### Chemex

| Etapa | Nome             | Objetivo                       | Volume              | Aguardar |
|-------|------------------|--------------------------------|---------------------|----------|
| 1     | Bloom            | Liberar CO₂                    | café_g × 2 ml       | 45s      |
| 2     | Primeiro Despeje | Extração inicial, doçura       | ~30% do restante    | 30s      |
| 3     | Segundo Despeje  | Corpo e acidez balanceada      | ~35% do restante    | 20s      |
| 4     | Terceiro Despeje | Finalização e ajuste de volume | restante            | —        |

Tempo total estimado: **3:30–4:30 min**

#### Coador de Pano

| Etapa | Nome              | Objetivo           | Volume           | Aguardar |
|-------|-------------------|--------------------|------------------|----------|
| 1     | Bloom             | Umedecer o café    | café_g × 2 ml    | 30s      |
| 2     | Despeje Principal | Extração principal | ~60% do restante | —        |
| 3     | Despeje Final     | Volume e equilíbrio| restante         | —        |

Tempo total estimado: **2:00–3:00 min**

#### Prensa Francesa

Método de imersão total — o Modo Preparo funciona como **checklist guiado**, não com despejes pulsados.

| Etapa | Ação                                         | Timer    |
|-------|----------------------------------------------|----------|
| 1     | Adicionar o café moído ao cilindro           | —        |
| 2     | Despejar todo o volume de água de uma vez    | —        |
| 3     | Mexer suavemente por 10 segundos             | —        |
| 4     | Fechar a tampa sem pressionar e aguardar     | ⏳ 4 min |
| 5     | Pressionar o êmbolo lentamente               | —        |
| 6     | Servir imediatamente                         | —        |

---

### Timer por Etapa

Nas etapas com tempo de espera definido (bloom, descanso da prensa), exibir automaticamente um **timer regressivo visual** após "Despejei":

```
⏳ Aguarde...  0:38
[pular espera]
```

- Visual apenas — sem som
- Ao chegar em zero, avança automaticamente para a próxima etapa
- Botão "pular espera" sempre disponível

---

### Tela de Conclusão

```
┌──────────────────────────────────────┐
│                                      │
│         ☕ Café pronto!              │
│                                      │
│      Bom proveito. 😊               │
│                                      │
│       [ Fazer outro café ]           │
│                                      │
└──────────────────────────────────────┘
```

"Fazer outro café" retorna ao Modo Configuração com os valores anteriores preservados.

---

## Fórmulas de Cálculo

### Receita

```
volume_total_ml = número_de_porções × tamanho_recipiente_ml

café_gramas = (volume_total_ml / 100) × gramas_por_100ml[intensidade]

água_com_compensação_ml = volume_total_ml × (1 + fator_compensação[método])
```

### Etapas de Despeje

```
bloom_ml = café_gramas × 2  (mínimo 40ml, máximo 80ml)
água_restante_ml = água_com_compensação_ml − bloom_ml

// Todos os volumes arredondados para o múltiplo de 5ml mais próximo

// Exemplo — V60, 350ml total, 21g de café:
bloom_ml        = 42ml
água_restante   = 308ml
despeje_1       = 308 × 0.40 = 123ml → arredonda para 125ml
despeje_2       = 308 × 0.35 = 108ml → arredonda para 110ml
despeje_3       = 350 − 42 − 125 − 110 = 73ml → arredonda para 75ml

// Verificação: 42 + 125 + 110 + 73 = 350ml ✓
// (o despeje final absorve o resíduo do arredondamento)
```

### Lookup de Configuração de Moedor

```javascript
// Estrutura de dados interna (JavaScript)
const grinderSettings = {
  "timemore-c2": {
    nome: "Timemore C2",
    unidade: "cliques",
    metodos: {
      v60:    { min: 18, max: 22, display: "18–22 cliques" },
      chemex: { min: 22, max: 26, display: "22–26 cliques" },
      pano:   { min: 20, max: 24, display: "20–24 cliques" },
      prensa: { min: 26, max: 30, display: "26–30 cliques" }
    }
  },
  "timemore-c3": {
    nome: "Timemore C3 / C3 Pro",
    unidade: "cliques",
    metodos: {
      v60:    { min: 15, max: 20, display: "15–20 cliques" },
      chemex: { min: 20, max: 24, display: "20–24 cliques" },
      pano:   { min: 18, max: 22, display: "18–22 cliques" },
      prensa: { min: 22, max: 26, display: "22–26 cliques" }
    }
  },
  "timemore-c3s": {
    nome: "Timemore C3S",
    unidade: "cliques",
    metodos: {
      v60:    { min: 14, max: 18, display: "14–18 cliques" },
      chemex: { min: 18, max: 22, display: "18–22 cliques" },
      pano:   { min: 16, max: 20, display: "16–20 cliques" },
      prensa: { min: 20, max: 25, display: "20–25 cliques" }
    }
  },
  "comandante-c40": {
    nome: "Comandante C40",
    unidade: "cliques",
    metodos: {
      v60:    { min: 22, max: 28, display: "22–28 cliques" },
      chemex: { min: 28, max: 34, display: "28–34 cliques" },
      pano:   { min: 24, max: 30, display: "24–30 cliques" },
      prensa: { min: 32, max: 38, display: "32–38 cliques" }
    }
  },
  "1zpresso-jx": {
    nome: "1Zpresso JX",
    unidade: "rotações",
    metodos: {
      v60:    { display: "2.5 – 3.5 rotações" },
      chemex: { display: "3.5 – 4.2 rotações" },
      pano:   { display: "3.0 – 4.0 rotações" },
      prensa: { display: "4.0 – 5.0 rotações" }
    }
  },
  "1zpresso-jx-pro": {
    nome: "1Zpresso JX-Pro",
    unidade: "rotações",
    metodos: {
      v60:    { display: "2.2 – 3.5 rotações" },
      chemex: { display: "3.2 – 4.0 rotações" },
      pano:   { display: "2.8 – 3.8 rotações" },
      prensa: { display: "4.0 – 4.8 rotações" }
    }
  },
  "baratza-encore": {
    nome: "Baratza Encore",
    unidade: "número (1–40)",
    instrucao: "Números maiores = moagem mais grossa",
    metodos: {
      v60:    { min: 15, max: 20, display: "15–20" },
      chemex: { min: 20, max: 26, display: "20–26" },
      pano:   { min: 18, max: 24, display: "18–24" },
      prensa: { min: 28, max: 35, display: "28–35" }
    }
  },
  "hario-skerton-pro": {
    nome: "Hario Skerton Pro",
    unidade: "cliques",
    metodos: {
      v60:    { min: 6,  max: 8,  display: "6–8 cliques" },
      chemex: { min: 8,  max: 10, display: "8–10 cliques" },
      pano:   { min: 7,  max: 9,  display: "7–9 cliques" },
      prensa: { min: 10, max: 14, display: "10–14 cliques" }
    }
  }
}

// Lookup ao exibir o card de resultado:
function getMoagemDisplay(grinderId, metodo) {
  if (!grinderId) return "Média-fina"; // fallback genérico
  return grinderSettings[grinderId].metodos[metodo].display;
}
```

---

## Comportamento e UX

| Aspecto | Comportamento |
|---------|---------------|
| Persistência | `localStorage` salva moedor selecionado + última configuração; ao abrir o app, carrega automaticamente |
| Padrão inicial | 2 porções · xícara média (120ml) · intensidade equilibrada · V60 |
| Tempo real | Todos os cálculos atualizam instantaneamente, sem botão de "calcular" |
| Feedback visual | Card de resultado tem animação suave ao atualizar; método selecionado fica destacado |
| Área de toque | Mínimo de 48×48px em todos os controles interativos |
| Contraste | Textos com contraste adequado para uso em ambiente com pouca luz (manhã cedo) |
| Moedor | Seleção persiste entre sessões; alterável a qualquer momento via ⚙️ no topo |

---

## O que NÃO incluir

- ❌ Login / conta de usuário
- ❌ Histórico de preparos
- ❌ Receitas salvas
- ❌ Múltiplos idiomas
- ❌ Animações pesadas
- ❌ Publicidade ou rastreamento

---

## Evoluções Futuras (fora do escopo v1)

- Timer global de preparo visível durante o Modo Preparo
- Notas pessoais por receita
- Histórico dos últimos preparos
- Compartilhar receita via link
- Adicionar espresso como método com lógica própria (proporção 1:2, dose em gramas, sem etapas de despeje)
- Modo barista avançado (bloom customizado, fluxo de despeje)
- Suporte a mais moedores (Niche Zero, Kinu M47, Fellow Ode Gen 2)
- Ajuste por torra: -2 cliques para torras claras, +2 cliques para torras escuras

---

## Fluxo Completo

```
[Abrir Coado]
      ↓
[Seção 0 — primeira vez] Qual é o seu moedor? (opcional, salvo)
      ↓
[Seção 1] Quantas porções? + Tamanho do recipiente (ícones proporcionais)
      ↓
[Seção 2] Intensidade (Suave · Equilibrado · Forte) + proporção barista
      ↓
[Seção 3] Método (V60 · Chemex · Prensa Francesa · Coador de pano)
      ↓
[Seção 4] Resultado em tempo real:
          Água · Café · Tempo · Moagem (cliques do moedor OU descrição genérica)
      ↓
         [▶ Iniciar Preparo]
      ↓
[MODO PREPARO]
  Bloom (timer) → Despeje 1 → Despeje 2 → ... → ☕ Pronto!
      ↓
         [Fazer outro café → volta à Seção 1]
```

---

*Coado — Especificação v1.3 · Pronto para implementação com Claude Code*
