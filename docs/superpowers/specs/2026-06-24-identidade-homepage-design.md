---
name: identidade-homepage
description: Auditoria e redesign da homepage do INTERFIBRAS para tornar a identidade do grupo de pesquisa clara na primeira tela — público-alvo: estudantes de graduação (IC) e candidatos a mestrado
metadata:
  type: project
---

# Redesign de Identidade — Homepage INTERFIBRAS

## Problema

A homepage do INTERFIBRAS não deixa claro, na primeira tela, que se trata de um **grupo de pesquisa da EESC-USP**. O badge "Jovem Pesquisador FAPESP · EESC-USP · São Carlos" existe mas está em `text-xs` com opacidade reduzida. O headline é poético e evoca uma startup de biomateriais. Nenhuma seção diz explicitamente "somos um grupo de pesquisa".

Visitantes alvo — estudantes de graduação buscando IC e candidatos a mestrado — chegam com incerteza sobre se esse é um grupo acadêmico real e se podem participar.

## Público-alvo

- **Graduandos** a partir do 3.º semestre interessados em iniciação científica
- **Candidatos a mestrado** avaliando o grupo antes de entrar em contato

Ambos precisam responder em menos de 5 segundos: "O que é isso? É um grupo da USP? Posso entrar?"

## Abordagem escolhida

Narrativa completa redesenhada — atacar o fluxo inteiro da homepage com a jornada do estudante em mente. Reformular o Hero para liderar com identidade, substituir a seção "Coordenador" por uma seção âncora de identidade explícita, manter as seções seguintes com ajustes pontuais.

## Estrutura nova da homepage

| # | Seção | Status | Componente |
|---|---|---|---|
| 1 | Hero | Reformulado | `Hero.jsx` |
| 2 | O INTERFIBRAS (identidade + coordenador) | Reformulado | `Coordenador.jsx` → `SobreOGrupo.jsx` |
| 3 | O que investigamos | Mantido | `Pesquisa.jsx` |
| 4 | Como é pesquisar aqui | Mantido | `ComoEPesquisar.jsx` |
| 5 | Faça parte do grupo | Mantido | `OportunidadesPreview.jsx` |
| 6 | Equipe | Mantido | `EquipePreview.jsx` |
| 7 | Notícias | Mantido | `NoticiasPreview.jsx` |

---

## Seção 1 — Hero.jsx (reformulado)

### Problema atual
O badge `"Jovem Pesquisador FAPESP · EESC-USP · São Carlos"` está em `font-semibold text-xs` com `color: '#8ABFB2'` — visualmente subordinado. O headline `"Madeira, carapaças e bactérias. Os materiais do futuro já existem na natureza."` é poético mas não ancora a identidade.

### Mudanças

**Badge → Bloco de identidade proeminente**

Substituir o badge atual (uma linha, `text-xs`) por um bloco de duas linhas com hierarquia visual clara:

```
Linha 1 (destaque):  GRUPO DE PESQUISA · Biopolímeros e Interfaces
Linha 2 (suporte):   EESC-USP · Dep. de Materiais · São Carlos · FAPESP
```

- Linha 1: `font-sora font-bold text-sm` (era `text-xs`)
- Linha 2: `font-inter text-xs` com opacidade menor
- O container do badge mantém o estilo visual (borda jade, fundo translúcido) mas fica ligeiramente maior para comportar duas linhas

**Headline — ajuste do segundo verso**

- Manter: `"Madeira, carapaças e bactérias."`
- Substituir: `"Os materiais do futuro já existem na natureza."` →
- Por: `"Somos o grupo que transforma esses recursos em materiais sem petróleo."`

Isso ancora identidade (`somos o grupo`) sem perder o gancho poético da primeira linha.

**Subtítulo — frase de identidade explícita**

Substituir:
> "Pesquisamos como transformar essas matérias-primas naturais em fibras, filmes e revestimentos de desempenho — sem petróleo."

Por:
> "Grupo de pesquisa experimental da Escola de Engenharia de São Carlos (USP). Investigamos como organizar celulose, quitina e biopolímeros em fibras, filmes e revestimentos de alto desempenho — sem petróleo."

---

## Seção 2 — Coordenador.jsx → SobreOGrupo.jsx (reformulado)

### Problema atual
A seção mistura quatro responsabilidades: por que o grupo existe (contexto ambiental), o perfil do coordenador, os biopolímeros que usam, e o desafio científico. Começa com stats de plástico — contexto válido, mas não é o que um estudante precisa ver primeiro.

### Mudanças

**Arquivo:** Renomear `Coordenador.jsx` → `SobreOGrupo.jsx`  
**Import em `app/page.js`:** atualizar import e comentário do bloco 2

**Nova ordem de conteúdo dentro da seção:**

1. **Label:** `"O INTERFIBRAS"` (era `"Por que o INTERFIBRAS existe"`)

2. **H2:** `"Um grupo de pesquisa em biopolímeros e interfaces."` (era `"Ciência de materiais para reduzir a dependência de recursos fósseis."`)

3. **Parágrafo de identidade** (novo — inserir antes dos stats):
   > "O INTERFIBRAS é um grupo de pesquisa experimental sediado no Departamento de Materiais da EESC-USP, financiado pelo Programa Jovem Pesquisador em Centros Emergentes da FAPESP (processo 2023/03039-7). Investigamos como organizar biopolímeros naturais — celulose, quitina e celulose bacteriana — em fibras, filmes e revestimentos de base natural."

4. **Cards de identidade** (novos — 4 cards em grid 2×2):
   - Card 1: `Grupo de Pesquisa` · Biopolímeros e Interfaces
   - Card 2: `FAPESP` · Jovem Pesquisador · Processo 2023/03039-7
   - Card 3: `EESC-USP` · Dep. de Materiais (SMM) · São Carlos, SP
   - Card 4: `Em formação` · Primeiros integrantes sendo selecionados

   Visual: estilo consistente com os cards existentes de biopolímeros (fundo claro, borda jade suave). Grid `grid-cols-2 gap-4`.

5. **Coordenação** (mantida — foto + fichas de credibilidade do Rafael)

6. **Fatos contextuais** (mantidos — stats de plástico, dependência fóssil, resíduos agrícolas)

7. **De onde partimos** (mantido — celulose, quitina, celulose bacteriana)

8. **O desafio científico** (mantido — box jade ao final)

---

## Mudanças em app/page.js

```js
// Antes:
import Coordenador from '@/components/home/Coordenador'
// {/* 2 — Por que o INTERFIBRAS existe */}
// <Coordenador />

// Depois:
import SobreOGrupo from '@/components/home/SobreOGrupo'
// {/* 2 — O que é o INTERFIBRAS */}
// <SobreOGrupo />
```

---

## Ajustes pontuais nas demais seções

Nenhuma mudança estrutural — apenas reforços textuais onde a identidade pode ser mencionada de passagem:

- `ComoEPesquisar.jsx` — label `"Formação científica"` permanece. Nenhuma mudança.
- `OportunidadesPreview.jsx` — permanece. Nenhuma mudança.
- `EquipePreview.jsx` — permanece. Nenhuma mudança.

---

## O que NÃO muda

- Visual design geral (cores, fontes, animações, dark mode das seções escuras)
- Seções 3–7 (Pesquisa, ComoEPesquisar, Oportunidades, Equipe, Notícias)
- Dados e conteúdo científico — nenhum fato é removido, apenas reorganizado
- Sistema de conteúdo (MDX, `lib/content.js`)
- Header, Footer, outras páginas

---

## Critérios de sucesso

- Um estudante que chega na homepage consegue responder em 5 segundos: "É um grupo de pesquisa da USP sobre biopolímeros"
- O texto "grupo de pesquisa" aparece de forma proeminente antes do fim da primeira tela
- A identidade institucional (EESC-USP + FAPESP) está visível em pelo menos dois lugares distintos acima da dobra ou na primeira seção logo abaixo
