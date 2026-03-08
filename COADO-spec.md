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

- **Água**: volume total em ml, com fator de compensação do método já aplicado
- **Café**: gramas a moer
- **Tempo estimado**: de acordo com o método
- **Moagem recomendada**: de acordo com o método
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

---

## Comportamento e UX

| Aspecto | Comportamento |
|---------|---------------|
| Persistência | `localStorage` salva a última configuração; ao abrir o app, carrega automaticamente |
| Padrão inicial | 2 porções · xícara média (120ml) · intensidade equilibrada · V60 |
| Tempo real | Todos os cálculos atualizam instantaneamente, sem botão de "calcular" |
| Feedback visual | Card de resultado tem animação suave ao atualizar; método selecionado fica destacado |
| Área de toque | Mínimo de 48×48px em todos os controles interativos |
| Contraste | Textos com contraste adequado para uso em ambiente com pouca luz (manhã cedo) |

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
- Modo barista avançado (controle de bloom customizado, fluxo de despeje)

---

## Fluxo Completo

```
[Abrir Coado]
      ↓
[Seção 1] Quantas porções? + Tamanho do recipiente (ícones proporcionais)
      ↓
[Seção 2] Intensidade (Suave · Equilibrado · Forte) + proporção barista
      ↓
[Seção 3] Método (V60 · Chemex · Prensa Francesa · Coador de pano)
      ↓
[Seção 4] Resultado em tempo real: Água · Café · Moagem · Tempo
      ↓
         [▶ Iniciar Preparo]
      ↓
[MODO PREPARO]
  Bloom (timer) → Despeje 1 → Despeje 2 → ... → ☕ Pronto!
      ↓
         [Fazer outro café → volta à Seção 1]
```

---

*Coado — Especificação v1.2 · Pronto para implementação com Claude Code*
