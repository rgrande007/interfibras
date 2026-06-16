# Adequação da Página de Notícias — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir inconsistências técnicas na página `/noticias`: categorias quebradas, bloco hardcoded duplicado e destaque excessivo nos posts.

**Architecture:** Cirurgia mínima em 3 arquivos de componente + 2 arquivos de conteúdo. Nenhuma nova abstração ou dependência. O sistema de posts existente (lib/content.js + arquivos .md) já suporta tudo — só precisamos alinhar os dados com a página.

**Tech Stack:** Next.js (App Router), React Server Components, arquivos Markdown com gray-matter, Tailwind 4, inline styles

---

## Mapa de arquivos

| Arquivo | Ação | O que muda |
|---|---|---|
| `content/posts/aprovacao-fapesp-jovem-pesquisador.md` | Modificar | `categoria: Grupo` → `categoria: Marco` |
| `content/posts/inicio-das-atividades.md` | Modificar | `destaque: true` → `destaque: false` |
| `app/noticias/page.js` | Modificar | Remove hardcoded, atualiza categorias/cores/ícones |
| `app/noticias/[slug]/page.js` | Modificar | Atualiza `categoriaMeta` para espelhar as novas categorias |

---

## Task 1: Corrigir metadados dos posts

**Files:**
- Modify: `content/posts/aprovacao-fapesp-jovem-pesquisador.md`
- Modify: `content/posts/inicio-das-atividades.md`

- [ ] **Step 1: Mudar categoria do post de aprovação para Marco**

Em `content/posts/aprovacao-fapesp-jovem-pesquisador.md`, alterar a linha:
```
categoria: "Grupo"
```
para:
```
categoria: "Marco"
```

- [ ] **Step 2: Remover destaque de inicio-das-atividades**

Em `content/posts/inicio-das-atividades.md`, alterar a linha:
```
destaque: true
```
para:
```
destaque: false
```

- [ ] **Step 3: Verificar que os outros dois posts estão corretos**

Confirmar que em `content/posts/chamada-iniciacao-cientifica-2026.md`:
- `categoria: "Oportunidades"` ✓
- `destaque: true` ✓

Confirmar que em `content/posts/primeiro-equipamento-chegou.md`:
- `categoria: "Laboratório"` ✓
- `destaque: true` ✓

---

## Task 2: Atualizar `app/noticias/page.js`

**Files:**
- Modify: `app/noticias/page.js`

Esta task tem 4 partes atômicas. Faça todas antes de verificar.

- [ ] **Step 1: Substituir o array CATEGORIAS**

Localizar (linhas 9–16):
```js
const CATEGORIAS = [
  { label: 'Todos', valor: null },
  { label: 'Publicação', valor: 'Publicação' },
  { label: 'Evento', valor: 'Evento' },
  { label: 'Premiação', valor: 'Premiação' },
  { label: 'Parceria', valor: 'Parceria' },
  { label: 'Grupo', valor: 'Grupo' },
]
```
Substituir por:
```js
const CATEGORIAS = [
  { label: 'Todos', valor: null },
  { label: 'Marco', valor: 'Marco' },
  { label: 'Grupo', valor: 'Grupo' },
  { label: 'Laboratório', valor: 'Laboratório' },
  { label: 'Publicação', valor: 'Publicação' },
  { label: 'Oportunidades', valor: 'Oportunidades' },
]
```

- [ ] **Step 2: Substituir o objeto categoriaMeta**

Localizar (linhas 18–25):
```js
const categoriaMeta = {
  Publicação: { bg: 'rgba(75,175,146,0.12)',  border: 'rgba(75,175,146,0.30)',  text: '#2d8a72', accent: '#4BAF92' },
  Evento:     { bg: 'rgba(105,43,186,0.10)',  border: 'rgba(105,43,186,0.28)',  text: '#692BBA', accent: '#8B52D4' },
  Premiação:  { bg: 'rgba(221,160,31,0.10)',  border: 'rgba(221,160,31,0.30)',  text: '#9c6e12', accent: '#DDA01F' },
  Parceria:   { bg: 'rgba(138,191,178,0.12)', border: 'rgba(138,191,178,0.30)', text: '#2d7a6c', accent: '#8ABFB2' },
  Grupo:      { bg: 'rgba(75,175,146,0.10)',  border: 'rgba(75,175,146,0.28)',  text: '#2d8a72', accent: '#4BAF92' },
}
const catDefault = { bg: 'rgba(75,175,146,0.10)', border: 'rgba(75,175,146,0.28)', text: '#2d8a72', accent: '#4BAF92' }
```
Substituir por:
```js
const categoriaMeta = {
  Marco:        { bg: 'rgba(221,160,31,0.10)',  border: 'rgba(221,160,31,0.30)',  text: '#9c6e12', accent: '#DDA01F' },
  Grupo:        { bg: 'rgba(75,175,146,0.10)',  border: 'rgba(75,175,146,0.28)',  text: '#2d8a72', accent: '#4BAF92' },
  Laboratório:  { bg: 'rgba(59,174,196,0.10)',  border: 'rgba(59,174,196,0.28)',  text: '#1e6e82', accent: '#3BAEC4' },
  Publicação:   { bg: 'rgba(75,175,146,0.12)',  border: 'rgba(75,175,146,0.30)',  text: '#2d8a72', accent: '#4BAF92' },
  Oportunidades:{ bg: 'rgba(105,43,186,0.10)',  border: 'rgba(105,43,186,0.28)',  text: '#692BBA', accent: '#8B52D4' },
}
const catDefault = { bg: 'rgba(75,175,146,0.10)', border: 'rgba(75,175,146,0.28)', text: '#2d8a72', accent: '#4BAF92' }
```

- [ ] **Step 3: Remover MARCO_FUNDADOR e showMarco da função do componente**

Localizar e remover a constante `MARCO_FUNDADOR` (linhas 27–32):
```js
const MARCO_FUNDADOR = {
  titulo: 'Aprovação do Projeto Jovem Pesquisador FAPESP',
  resumo:
    'O INTERFIBRAS nasce com a aprovação do Projeto Jovem Pesquisador em Centros Emergentes — FAPESP, Processo 2023/03039-7 — sediado no Departamento de Materiais da Escola de Engenharia de São Carlos (EESC), Universidade de São Paulo. Marco inaugural do grupo.',
  data: '2025-06-01',
}
```

Dentro de `NoticiasPage`, localizar e remover a linha:
```js
const showMarco = !categoriaAtiva
```

Localizar e remover o bloco JSX do marco fundador inteiro — do comentário até o `</div>` de fechamento (linhas 151–211):
```jsx
{/* ── Marco Fundador — destaque fixo ──────────── */}
{showMarco && (
  <div className="mb-10">
    ... (bloco inteiro até o </div> de fechamento do showMarco)
  </div>
)}
```

- [ ] **Step 4: Atualizar a função CategoryIcon**

Localizar a função `CategoryIcon` (a partir da linha ~368) e substituí-la inteiramente por:
```jsx
function CategoryIcon({ categoria, accent }) {
  const stroke = accent || '#4BAF92'
  if (categoria === 'Marco') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  if (categoria === 'Publicação') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  }
  if (categoria === 'Grupo') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (categoria === 'Oportunidades') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  }
  /* Laboratório — default: frasco */
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M10 2v7.31" />
      <path d="M14 9.3V1.99" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    </svg>
  )
}
```

Localizar e remover a função `StarIcon` inteira (logo antes de CategoryIcon):
```js
function StarIcon() {
  return (
    <svg ...>
      <polygon points="12 2 ..." />
    </svg>
  )
}
```

---

## Task 3: Atualizar `app/noticias/[slug]/page.js`

**Files:**
- Modify: `app/noticias/[slug]/page.js`

- [ ] **Step 1: Substituir o objeto categoriaMeta**

Localizar (linhas 20–27):
```js
const categoriaMeta = {
  Publicação: { color: '#4BAF92',  bg: 'rgba(75,175,146,0.13)',  border: 'rgba(75,175,146,0.32)'  },
  Evento:     { color: '#b785f5',  bg: 'rgba(105,43,186,0.13)',  border: 'rgba(105,43,186,0.32)'  },
  Premiação:  { color: '#DDA01F',  bg: 'rgba(221,160,31,0.12)',  border: 'rgba(221,160,31,0.32)'  },
  Parceria:   { color: '#8ABFB2',  bg: 'rgba(138,191,178,0.15)', border: 'rgba(138,191,178,0.38)' },
  Grupo:      { color: '#4BAF92',  bg: 'rgba(75,175,146,0.13)',  border: 'rgba(75,175,146,0.32)'  },
}
const catDefault = { color: '#4BAF92', bg: 'rgba(75,175,146,0.13)', border: 'rgba(75,175,146,0.32)' }
```
Substituir por:
```js
const categoriaMeta = {
  Marco:        { color: '#DDA01F', bg: 'rgba(221,160,31,0.12)',  border: 'rgba(221,160,31,0.32)'  },
  Grupo:        { color: '#4BAF92', bg: 'rgba(75,175,146,0.13)',  border: 'rgba(75,175,146,0.32)'  },
  Laboratório:  { color: '#3BAEC4', bg: 'rgba(59,174,196,0.12)',  border: 'rgba(59,174,196,0.32)'  },
  Publicação:   { color: '#4BAF92', bg: 'rgba(75,175,146,0.13)',  border: 'rgba(75,175,146,0.32)'  },
  Oportunidades:{ color: '#b785f5', bg: 'rgba(105,43,186,0.13)',  border: 'rgba(105,43,186,0.32)'  },
}
const catDefault = { color: '#4BAF92', bg: 'rgba(75,175,146,0.13)', border: 'rgba(75,175,146,0.32)' }
```

---

## Task 4: Verificação completa

**Files:** nenhum

- [ ] **Step 1: Iniciar o servidor de desenvolvimento**

```bash
cd "a:/página interfibras/interfibras"
npm run dev
```

Abrir `http://localhost:3000/noticias` no browser.

- [ ] **Step 2: Verificar filtros**

Clicar em cada filtro e confirmar:

| Filtro | Post(s) esperado(s) |
|---|---|
| Marco | Aprovação do Projeto Jovem Pesquisador FAPESP |
| Grupo | INTERFIBRAS inicia suas atividades na USP |
| Laboratório | Primeiro equipamento do laboratório chega à USP |
| Oportunidades | Chamada aberta: Iniciação Científica 2026 |
| Todos | 4 posts |

- [ ] **Step 3: Verificar ausência do bloco hardcoded**

Na view "Todos", confirmar que **não existe** mais o card dourado "Marco Fundador" separado acima da grade. O post de aprovação FAPESP deve aparecer como card normal na grade com badge dourado "Marco".

- [ ] **Step 4: Verificar a home**

Abrir `http://localhost:3000`. Confirmar que a seção de notícias em destaque exibe **exatamente 3 posts**:
- Aprovação do Projeto Jovem Pesquisador FAPESP
- Chamada aberta: Iniciação Científica 2026
- Primeiro equipamento do laboratório chega à USP

O post `inicio-das-atividades` **não deve aparecer** na home.

- [ ] **Step 5: Verificar página interna de um post Marco**

Abrir `http://localhost:3000/noticias/aprovacao-fapesp-jovem-pesquisador`. Confirmar que o badge de categoria aparece em **dourado** (cor `#DDA01F`), não em verde.
