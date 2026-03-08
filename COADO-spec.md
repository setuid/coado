# Coado — Especificação Funcional v3.3

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
- Dados de moedores em `/data/grinders.json` versionado no repositório
- Manuais em PDF em `/docs/grinders/` versionados no repositório

---

## Arquitetura de Telas

O app tem **três modos**:

1. **Modo Configuração** — tela única com scroll vertical, onde o usuário define sua receita
2. **Modo Preparo** — tela imersiva passo a passo, ativada ao iniciar o preparo
3. **Tela de Conclusão** — exibida ao finalizar, com avaliação e compartilhamento

---

## Arquivos de Dados Versionados

### `/data/grinders.json`

Arquivo JSON único com todos os moedores suportados, versionado no repositório. Estrutura de cada entrada:

```json
[
  {
    "id": "timemore-c2",
    "name": "Timemore C2",
    "brand": "Timemore",
    "type": "manual",
    "unit": "cliques",
    "unitDescription": "Cliques a partir do zero (fechar sem forçar = posição 0)",
    "calibrationNote": "Feche o moedor completamente sem forçar. Esse é o ponto zero. Abra os cliques em sentido anti-horário.",
    "manualUrl": "https://www.manualslib.com/manual/3910577/Timemore-Chestnut-C2.html",
    "espressoCapable": false,
    "espressoNote": "Não recomendado para espresso — range de ajuste muito pequeno na faixa fina.",
    "notes": "Mínimo recomendado: 6 cliques. Pode danificar as burrs abaixo disso.",
    "settings": {
      "v60":     "18–22",
      "chemex":  "22–26",
      "pano":    "20–24",
      "prensa":  "26–30",
      "espresso": null
    }
  }
]
```

> **Fontes de referência**: dados compilados dos manuais oficiais de cada fabricante e validados contra:
> - [Coffee Chronicler Grind Size Chart](https://coffeechronicler.com/grind-size-chart/) — base de dados crowdsourced, atualizada
> - [Honest Coffee Guide](https://honestcoffeeguide.com/coffee-grind-size-chart/) — páginas dedicadas por modelo
> - [CL!CK open-source converter](https://giuseppecesarano.github.io/click/) — ferramenta de conversão entre moedores
> - [1Zpresso Official Grind Guide](https://1zpresso.coffee/grind-setting/) — guia oficial 1Zpresso
> - [SCA Coffee Standards](https://sca.coffee/research/coffee-standards) — parâmetros de extração
>
> Todos os valores são pontos de partida para torra média.

### `/docs/grinders/`

PDFs dos manuais oficiais de cada moedor, versionados no repositório para acesso offline.

| Arquivo no repo | URL de origem do PDF |
|----------------|---------------------|
| `timemore-c2-manual.pdf` | https://www.manualslib.com/manual/3910577/Timemore-Chestnut-C2.html |
| `timemore-c3-manual.pdf` | https://www.manualslib.com/manual/3910579/Timemore-Chestnut-C3.html |
| `timemore-c3s-manual.pdf` | https://manuals.plus/asin/B0C1TZN9T5 |
| `comandante-c40-manual.pdf` | https://www.maxicoffee.com/images/pdf/C40-Manual.pdf *(PDF direto)* |
| `1zpresso-jx-manual.pdf` | https://1zpresso.coffee/manual-j-en/ *(série J cobre o JX)* |
| `1zpresso-jx-pro-manual.pdf` | https://1zpresso.coffee/manual-jxpro-en/ *(oficial 1Zpresso)* |
| `baratza-encore-manual.pdf` | https://assets.breville.com/ZCG485/manual-encore-en-v4-3-120122.pdf *(PDF direto, v4.3)* |
| `hario-skerton-pro-manual.pdf` | https://global.hario.com/product/MMCS-2B.pdf *(PDF direto Hario)* |

> ⚠️ Os PDFs devem ser baixados das URLs acima e comitados no repositório. Verificar licença de redistribuição de cada fabricante antes de incluir. Os links `manualUrl` no `grinders.json` apontam para a fonte oficial — usados como fallback caso o PDF local não exista.

---

## MODO CONFIGURAÇÃO

### Seção 0 — Seleção de Moedor (opcional, persistida)

Exibida **expandida na primeira abertura do app**, e sempre acessível via ⚙️ no header. O usuário seleciona seu moedor para que o app exiba configurações precisas de moagem.

#### Busca de Moedor

Um campo de busca de texto aparece acima da grade de moedores:

```
┌─────────────────────────────────────┐
│ 🔍  Buscar moedor...                │
└─────────────────────────────────────┘
```

- Filtro em tempo real por nome (ex: "timemore", "1zpresso", "baratza")
- Sem resultado: exibe mensagem "Nenhum moedor encontrado — use 'Sem moedor específico'"
- O campo é limpo ao selecionar um moedor

#### Grade de Moedores

Cada moedor exibe nome, unidade de ajuste e um botão de manual:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Timemore C2  │  │ Timemore C3  │  │ Timemore C3S │
│   cliques    │  │   cliques    │  │   cliques    │
│    [📄]      │  │    [📄]      │  │    [📄]      │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Comandante   │  │ 1Zpresso JX  │  │1Zpresso JX-  │
│    C40       │  │   rotações   │  │    Pro       │
│    [📄]      │  │    [📄]      │  │    [📄]      │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│   Baratza    │  │    Hario     │
│   Encore     │  │ Skerton Pro  │
│    [📄]      │  │    [📄]      │
└──────────────┘  └──────────────┘
┌────────────────────────────────────┐
│     Sem moedor específico          │
└────────────────────────────────────┘
```

- Botão 📄 abre o PDF do manual em nova aba (ou exibe inline no mobile)
- O PDF vem de `/docs/grinders/{id}-manual.pdf`
- Se o PDF não estiver disponível localmente, abre o `manualUrl` oficial

**Comportamento:**
- Se nenhum moedor selecionado → descrições genéricas (ex: "Moagem média-fina")
- Se moedor selecionado → cliques/posição específica para aquele modelo e método
- **Seleção persistida em `localStorage['coado-grinder']`**: ao reabrir o app, o moedor escolhido anteriormente é automaticamente recarregado e exibido como selecionado — sem necessidade de o usuário escolher novamente
- Na primeira abertura (sem histórico de escolha), a seção de moedor é exibida expandida para encorajar a seleção
- Nas sessões seguintes, a seção aparece colapsada em acordeão mostrando o moedor atual; o usuário pode alterá-lo a qualquer momento via ⚙️ no header
- Toast de confirmação ao selecionar: *"[Nome do moedor] selecionado!"*

**Moedores suportados (v3.0):**

| Moedor | Ajuste | Espresso | Manual |
|--------|--------|----------|--------|
| Timemore C2 | Cliques | ❌ | PDF |
| Timemore C3 / C3 Pro | Cliques | ⚠️ pressurized basket | PDF |
| Timemore C3S | Cliques | ⚠️ pressurized basket | PDF |
| Comandante C40 | Cliques | ✅ | PDF |
| 1Zpresso JX | Rotações | ❌ otimizado filtro | PDF |
| 1Zpresso JX-Pro | Rotações | ✅ | PDF |
| Baratza Encore | Número 1–40 | ❌ | PDF |
| Hario Skerton Pro | Cliques | ❌ | PDF |
| Sem moedor específico | — | — | — |

> ⚠️ **Nota ao usuário**: Valores são pontos de partida para torra média. Ajuste ±2–3 cliques conforme o resultado na xícara.

---

### Seção 1 — Quantidade de Xícaras / Copos

> *Sem alterações em relação à v2.0 — exceto: para o método Espresso, o seletor de tamanho é substituído por seletor de tipo de shot (ver Seção 3).*

**Seletor de número de porções**
- Botões `–` e `+` com o número centralizado, de 1 a 10
- Para Espresso: máximo 4 (doses de espresso)

**Seletor de tamanho do recipiente** (apenas para métodos de filtro)

| Opção           | Volume |
|-----------------|--------|
| Xícara pequena  | 80 ml  |
| Xícara média    | 120 ml |
| Xícara grande   | 150 ml |
| Copo americano  | 200 ml |
| Caneca          | 300 ml |
| Personalizado   | livre  |

---

### Seção 2 — Intensidade do Café

**4 botões visuais** de seleção única (para métodos de filtro):

| Intensidade   | g/100ml | Ratio barista | Cor       |
|---------------|---------|---------------|-----------|
| Suave         | 5       | 1:20          | 🟢 Verde  |
| Equilibrado   | 6       | 1:16          | 🟠 Laranja |
| Forte *(padrão)* | 8   | 1:12          | 🔴 Vermelho |
| Extra Forte   | 10      | 1:10          | ⬛ Preto/Chumbo |

> **Extra Forte** — ratio 1:10 (10g de café por 100ml de água). Usado por baristas para café de filtro muito concentrado, semelhante ao estilo "café coado nordestino". Não recomendado para métodos de imersão longa (prensa francesa) — resulta em excesso de amargor.

> **Atenção ao UI**: ao selecionar Extra Forte com Prensa Francesa, exibir aviso: *"Para Prensa Francesa, recomendamos no máximo Forte (1:12) para evitar amargor excessivo."*

> **Para Espresso**: a seção de intensidade é **ocultada** — o espresso tem proporção fixa (1:2 ou 1:2.5 conforme shot).

---

### Seção 3 — Método de Preparo

**5 métodos disponíveis** (adicionado Espresso):

| Método          | Dica rápida                                          | Ordem |
|-----------------|------------------------------------------------------|-------|
| Chemex *(padrão)* | Moagem média-grossa. Despeje lentamente. ~4 min  | 1º    |
| V60             | Moagem média-fina. Despeje em espiral. ~3 min        | 2º    |
| Coador de pano  | Moagem média. Tradicional e ideal para café orgânico | 3º    |
| Prensa Francesa | Moagem grossa. Aguarde 4 min antes de pressionar     | 4º    |
| Espresso        | Moagem fina. Dose + extração em 25–30s               | 5º    |
| Espresso ☕     | Moagem fina. Dose + extração em 25–30s               |

**Compensação de água por método:**

| Método          | Fator de compensação |
|-----------------|----------------------|
| V60             | +0%                  |
| Chemex          | +5%                  |
| Prensa Francesa | +10%                 |
| Coador de pano  | +5%                  |
| Espresso        | N/A (lógica própria) |

#### Método Espresso — Lógica Específica

O espresso tem lógica completamente diferente dos métodos de filtro:

**Parâmetros:**

| Parâmetro | Valor |
|-----------|-------|
| Dose (café) | 18g por dose dupla / 9g por dose simples |
| Yield (água/saída) | 36–40ml por dose dupla / 18–20ml por dose simples |
| Ratio | ~1:2 (dose : yield) |
| Temperatura | 90–96°C |
| Tempo de extração | 25–30 segundos |
| Moagem | Fina a muito fina |

**Seletor de tipo de shot** (substitui o seletor de tamanho):

```
┌──────────────┐  ┌──────────────┐
│  Dose Dupla  │  │ Dose Simples │
│   (padrão)   │  │              │
│   18g → 36ml │  │   9g → 18ml  │
└──────────────┘  └──────────────┘
```

**Card de receita para espresso:**

```
┌─────────────────────────────────┐
│  ☕ Sua receita — Espresso       │
│                                 │
│  🌿 Dose:     18 g × 2          │
│  💧 Yield:    36–40 ml × 2      │
│  📐 Moagem:   Fina              │
│  ⏱ Extração: 25–30s            │
│  🌡️ Água:     92–94°C           │
│                                 │
│       [ ▶ Iniciar Preparo ]     │
└─────────────────────────────────┘
```

**Configurações de moagem para espresso por moedor:**

| Moedor | Configuração espresso | Capaz? |
|--------|----------------------|--------|
| Timemore C2 | — | ❌ Burrs muito abertas; não consegue moagem fina suficiente |
| Timemore C3 / C3 Pro | 7–8 cliques | ⚠️ Janela mínima — apenas pressurized basket |
| Timemore C3S | 7–8 cliques | ⚠️ Mesmo que C3 — janela muito estreita |
| Comandante C40 | 10–15 cliques (eixo padrão) | ✅ ~25–30 µm por clique, excelente precisão |
| 1Zpresso JX | ~1.5–1.8 rotações | ❌ Tecnicamente possível mas inconsistente |
| 1Zpresso JX-Pro | ~1.6–1.8 rotações (setting #12–16) | ✅ Projetado para espresso também |
| Baratza Encore | Setting 8 | ❌ Saltos grandes entre settings; muito impreciso |
| Hario Skerton Pro | 0–2 cliques | ❌ Mói fino mas distribuição irregular |

> Se o moedor selecionado não suporta espresso (❌), exibir aviso: *"[Moedor] não é recomendado para espresso — moagem inconsistente nessa faixa. Valores abaixo são genéricos."*
> Se o moedor é ⚠️, exibir: *"[Moedor] pode fazer espresso apenas com cesta pressurizada (pressurized basket). Resultado varia."*

---

### Seção 4 — Resultado (Card de Destaque)

> *Atualizado para incluir espresso e novo estilo de receita.*

Exibido em tempo real. Para métodos de filtro, mantém o layout atual (v2.0). Para espresso:

```
┌─────────────────────────────────┐
│  ☕ Sua receita — Espresso       │
│                                 │
│  🌿 Dose:    18 g × 2 = 36 g   │
│  💧 Yield:   36–40 ml × 2      │
│  📐 Moagem:  10–15 cliques      │
│     Comandante C40 · Fina       │
│  ⏱ Extração: 25–30s            │
│                                 │
│  [ ▶ Iniciar Preparo ] [ 🔗 ]   │
└─────────────────────────────────┘
```

---

### Seção 5 — Notas Pessoais

> *Sem alterações em relação à v2.0.*

---

### Seção 6 — Saiba Mais (Acordeão)

> *Atualizado para incluir espresso e novo conteúdo.*

Adicionado para espresso:
- Dica sobre extração: *"25s = subextraído (azedo), 30s = ideal, >35s = sobrextraído (amargo)"*
- Dica sobre pressão: *"9 bar é o padrão. Máquinas domésticas de 15 bar devem usar menos café para compensar"*
- Dica de calibração do moedor para espresso (se moedor selecionado)

---

### Seção 7 — Histórico (Acordeão)

> *Atualizado: cada item agora mostra a avaliação em estrelas (se registrada).*

```
┌──────────────────────────────────────────┐
│ [V60] [Forte] ⭐⭐⭐⭐☆         ontem  │
│ 2× Xícara média · 250ml · 15g · ⏱2:45  │
└──────────────────────────────────────────┘
```

---

## MODO PREPARO

### Filtro — Barra de Progresso (métodos V60, Chemex, Pano, Prensa)

Em cada etapa de despeje, exibe:
- **Volume do passo atual** em destaque (ex: `95 ml`)
- **Barra de progresso acumulada**: representa `(volume já despejado + volume deste passo) / total`, de forma que a barra atinja 100% ao confirmar o último despeje
- **Meta**: `Despejado até aqui: X ml` (antes do passo atual) · `Restante: Y ml · Total: Z ml`

> ⚠️ Correção v3.2: a barra de progresso usa o volume **acumulado** (não apenas o passo atual), evitando exibição incorreta de barra quase vazia no último despeje.

---

### Espresso — Modo Preparo (Checklist)

Método de extração por pressão — o Modo Preparo funciona como **checklist guiado**.

| Etapa | Ação | Timer |
|-------|------|-------|
| 1 | Aqueça a máquina e o portafiltro | — |
| 2 | Dose: coloque ${dose}g de café no portafiltro | — |
| 3 | Distribua o café uniformemente (WDT ou tap) | — |
| 4 | Tampe com pressão firme e uniforme (~15 kg) | — |
| 5 | Encaixe o portafiltro e inicie a extração | — |
| 6 | Observe: extração deve iniciar em 6–8s | ⏱ 30s |
| 7 | Pare em ${yield}ml (25–30 segundos) | — |
| 8 | Sirva imediatamente | — |

> Timer de 30s na etapa 6 é referência — o usuário para quando atingir o volume alvo.

---

## TELA DE CONCLUSÃO

### Avaliação com Estrelas

Após "Café pronto!", o usuário pode avaliar o preparo:

```
┌──────────────────────────────────────┐
│                                      │
│         ☕ Café pronto!              │
│                                      │
│      Bom proveito. 😊               │
│                                      │
│  ⏱ Preparo em: 2:45                 │
│                                      │
│  ┌── Chemex · Forte · 3 porç. ─────┐ │
│  │ Água        450 ml              │ │
│  │ Café        36 g                │ │
│  │ Moagem      22–26 cliques       │ │
│  │ Tempo       3:30–4:30 min       │ │
│  │ Temperatura 90–93°C             │ │
│  │ Intensidade Forte (1:12)        │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Como ficou este café?               │
│  ☆ ☆ ☆ ☆ ☆                         │
│  (toque para avaliar)                │
│                                      │
│  ┌── Notas ──────────────────────┐   │
│  │ campo de texto livre          │   │
│  └───────────────────────────────┘   │
│                                      │
│    [ 🔗 Compartilhar ]               │
│    [ Fazer outro café ]              │
│                                      │
└──────────────────────────────────────┘
```

**Comportamento da avaliação:**
- 1 a 5 estrelas, opcional (pode pular)
- Ao tocar numa estrela, preenche da 1ª até a tocada (⭐⭐⭐☆☆ = 3 estrelas)
- Avaliação salva junto com o registro do histórico: `{ ...historyEntry, rating: 3 }`
- Exibida no histórico como ⭐ ícones
- Armazenamento: já inclusa no `localStorage['coado-history']`

### Compartilhar Configuração

Botão **"🔗 Compartilhar"** na tela de conclusão (além do card de receita):

- Gera URL com todos os parâmetros da receita atual:
  - `?p=2&s=sm&i=forte&m=v60` (método filtro)
  - `?m=espresso&shot=duplo&qty=2` (espresso)
- Ao abrir o link, o app restaura exatamente aquela configuração + exibe toast *"Receita compartilhada carregada!"*
- O link **não inclui** a avaliação nem as notas — compartilha apenas a receita objetiva

---

## TABELA DE CONFIGURAÇÕES DE MOEDOR POR MÉTODO (v3.0)

> Todas as tabelas existentes da v2.0 são mantidas. Adicionar coluna Espresso:

### Timemore C2

| Método          | Cliques | Categoria |
|-----------------|---------|-----------|
| V60             | 18–22   | Média-fina |
| Chemex          | 22–26   | Média-grossa |
| Coador de pano  | 20–24   | Média |
| Prensa Francesa | 26–30   | Grossa |
| Espresso        | —       | Não recomendado |

### Timemore C3 / C3 Pro

| Método          | Cliques | Categoria |
|-----------------|---------|-----------|
| V60             | 15–20   | Média-fina |
| Chemex          | 20–24   | Média-grossa |
| Coador de pano  | 18–22   | Média |
| Prensa Francesa | 22–26   | Grossa |
| Espresso        | 7–8     | ⚠️ Janela mínima — apenas pressurized basket |

### Timemore C3S

| Método          | Cliques | Categoria |
|-----------------|---------|-----------|
| V60             | 14–18   | Média-fina |
| Chemex          | 18–22   | Média-grossa |
| Coador de pano  | 16–20   | Média |
| Prensa Francesa | 20–25   | Grossa |
| Espresso        | 7–8     | ⚠️ Janela mínima — apenas pressurized basket |

### Comandante C40

| Método          | Cliques | Categoria |
|-----------------|---------|-----------|
| V60             | 22–28   | Média-fina |
| Chemex          | 28–34   | Média-grossa |
| Coador de pano  | 24–30   | Média |
| Prensa Francesa | 32–38   | Grossa |
| Espresso        | 10–15   | ✅ Fina (~25–30 µm por clique) |

> Red Clix upgrade: dobra a precisão do ajuste (18–24 cliques para espresso).

### 1Zpresso JX

| Método          | Configuração | Categoria |
|-----------------|-------------|-----------|
| V60             | 2.5–3.5 rot | Média-fina |
| Chemex          | 3.5–4.2 rot | Média-grossa |
| Coador de pano  | 3.0–4.0 rot | Média |
| Prensa Francesa | 4.0–5.0 rot | Grossa |
| Espresso        | ~1.5–1.8 rot | ❌ Tecnicamente possível, resultado inconsistente |

### 1Zpresso JX-Pro

| Método          | Configuração | Categoria |
|-----------------|-------------|-----------|
| V60             | 2.2–3.5 rot | Média-fina |
| Chemex          | 3.2–4.0 rot | Média-grossa |
| Coador de pano  | 2.8–3.8 rot | Média |
| Prensa Francesa | 4.0–4.8 rot | Grossa |
| Espresso        | 1.6–1.8 rot (setting #12–16) | ✅ Projetado para espresso |

### Baratza Encore

| Método          | Configuração | Categoria |
|-----------------|-------------|-----------|
| V60             | 15–20       | Média-fina |
| Chemex          | 20–26       | Média-grossa |
| Coador de pano  | 18–24       | Média |
| Prensa Francesa | 28–35       | Grossa |
| Espresso        | —           | ❌ Não recomendado |

### Hario Skerton Pro

| Método          | Cliques | Categoria |
|-----------------|---------|-----------|
| V60             | 6–8     | Média-fina |
| Chemex          | 8–10    | Média-grossa |
| Coador de pano  | 7–9     | Média |
| Prensa Francesa | 10–14   | Grossa |
| Espresso        | —       | ❌ Não recomendado |

---

## Fórmulas de Cálculo

### Filtro (V60, Chemex, Pano, Prensa) — sem alteração da v2.0

```
volume_total_ml = número_de_porções × tamanho_recipiente_ml
café_gramas = (volume_total_ml / 100) × gramas_por_100ml[intensidade]
água_com_compensação_ml = volume_total_ml × (1 + fator_compensação[método])
```

### Espresso (lógica própria)

```
// Dose dupla (padrão)
dose_g     = 18g × número_de_doses
yield_ml   = 36ml × número_de_doses  (target; usuário para na extração)
ratio      = 1:2

// Dose simples
dose_g     = 9g × número_de_doses
yield_ml   = 18ml × número_de_doses
ratio      = 1:2

// Extração
tempo_alvo = 25–30 segundos
temperatura = 90–96°C  (ideal: 92–94°C para torra média)
pressao    = 9 bar (informativo — o app não controla)
```

### Intensidades (atualizado com Extra Forte)

| Intensidade   | g/100ml | Ratio | gPer100 (código) |
|---------------|---------|-------|-----------------|
| Suave         | 5       | 1:20  | 5               |
| Equilibrado   | 6       | 1:16  | 6               |
| Forte         | 8       | 1:12  | 8               |
| Extra Forte   | 10      | 1:10  | 10              |

---

## Comportamento e UX

| Aspecto | Comportamento |
|---------|---------------|
| Persistência | `localStorage`: `coado-grinder`, `coado-state`, `coado-notes`, `coado-history` |
| Padrão inicial | **3 porções · xícara grande · forte · Chemex** |
| Tempo real | Cálculos atualizam instantaneamente |
| Área de toque | Mínimo 44×44px |
| Moedor | Busca em tempo real; PDF do manual acessível na seleção; **auto-carregado entre sessões** (sem ação do usuário) |
| Extra Forte + Prensa | Exibir aviso sobre amargor excessivo |
| Espresso + moedor sem suporte | Exibir aviso amigável |
| Avaliação | Opcional, 1–5 estrelas, salva no histórico |
| Compartilhar | URL params (métodos filtro e espresso); link não inclui notas nem avaliação |
| Toast | Feedback para: moedor salvo, link copiado, receita carregada, avaliação salva |
| Histórico | Estrelas exibidas no histórico se avaliado |

---

## O que NÃO incluir

- ❌ Login / conta de usuário
- ❌ Receitas salvas editáveis
- ❌ Múltiplos idiomas
- ❌ Animações pesadas
- ❌ Publicidade ou rastreamento
- ❌ Controle direto de máquina de espresso

---

## Evoluções Futuras (fora do escopo v3)

- Modo barista avançado (bloom customizado, fluxo de despeje)
- Suporte a mais moedores (Niche Zero, Kinu M47, Fellow Ode Gen 2, Timemore Slim)
- Ajuste por torra: -2 cliques para torras claras, +2 para torras escuras
- Exportação de histórico (CSV)
- Modo AeroPress
- Estatísticas de avaliação (nota média por método/intensidade)

---

## Fluxo Completo (v3.0)

```
[Abrir Coado]
      ↓
[Seção 0 — primeira vez ou ⚙️]
  Buscar moedor → Selecionar → Ver PDF do manual
  → retornos: acordeão colapsado com moedor atual
      ↓
[Seção 1] Porções + Tamanho do recipiente
  (Espresso: Porções + Tipo de shot: Duplo / Simples)
      ↓
[Seção 2] Intensidade: Suave · Equilibrado · Forte · Extra Forte
  (Espresso: seção oculta — ratio fixo 1:2)
      ↓
[Seção 3] Método: V60 · Chemex · Prensa · Pano · Espresso ☕
      ↓
[Seção 4] Resultado em tempo real:
  Filtro: Água · Café · Tempo · Moagem (cliques ou genérico)
  Espresso: Dose · Yield · Moagem · Tempo de extração
      ↓
[Seção 5] Minhas notas
      ↓
[Seção 6] 💡 Saiba mais — temperatura, passo a passo, calibração
      ↓
[Seção 7] 📋 Histórico — últimos 10, com estrelas
      ↓
     [▶ Iniciar Preparo]   [🔗 Compartilhar]
      ↓
[MODO PREPARO — timer global no header]
  Filtro: Bloom (timer) → Despejes → ☕ Pronto!
  Espresso: Checklist guiado com timer de extração
      ↓
[TELA DE CONCLUSÃO]
  ☕ Café pronto!
  ⭐⭐⭐⭐☆  (avaliação opcional)
  ⏱ Tempo total · Notas editáveis
  [🔗 Compartilhar esta receita]
  [Fazer outro café]
```

---

---

## Changelog

### v3.3
- **Card de receita na tela de conclusão**: após o preparo, exibe um resumo compacto com método, intensidade, porções, água, café, moagem, tempo e temperatura — para o usuário lembrar o que fez e comparar com a avaliação

### v3.2
- **Defaults ajustados**: Chemex (1º na lista), 3 porções, xícara grande, intensidade Forte
- **Barra de progresso corrigida**: agora usa volume acumulado (pouredBefore + step.vol), atingindo 100% no último despeje
- **Total ml visível**: linha de meta exibe "Restante: X ml · Total: Y ml" durante o preparo

### v3.1
- Comportamento de persistência do moedor tornado explícito: seleção é auto-carregada ao reabrir o app, sem interação do usuário
- Correção de estilos CSS para todos os elementos adicionados na v3.0 (shot cards, star rating, avisos, busca de moedor)
- Grid de intensidade ajustado para 2×2 (4 opções)

### v3.0
- Intensidade Extra Forte (1:10)
- Método Espresso completo (dose/yield, checklist, timer)
- Busca de moedores em tempo real
- PDFs dos manuais versionados em `/docs/grinders/`
- Avaliação 1–5 estrelas na tela de conclusão
- Compartilhamento de receita via URL params

*Coado — Especificação v3.3 · Versão em produção no GitHub Pages*
