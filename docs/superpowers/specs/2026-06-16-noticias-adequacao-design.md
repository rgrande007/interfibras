# Spec: Adequação da página de notícias

**Data:** 2026-06-16  
**Abordagem:** Cirurgia mínima (A)  
**Escopo:** `app/noticias/page.js`, `app/noticias/[slug]/page.js`, 4 arquivos `.md` em `content/posts/`

---

## Problema

A página `/noticias` tem duas inconsistências que precisam ser corrigidas:

1. **Categorias quebradas silenciosamente** — os posts usam `Oportunidades` e `Laboratório`, mas os filtros da página só reconhecem `Publicação`, `Evento`, `Premiação`, `Parceria`, `Grupo`. Resultado: nenhum post aparece ao clicar nos filtros correspondentes.

2. **Conteúdo hardcoded duplicado** — o bloco `MARCO_FUNDADOR` está hardcoded em `page.js` e descreve o mesmo evento que o post `aprovacao-fapesp-jovem-pesquisador.md`. Qualquer atualização precisaria ser feita em dois lugares.

3. **Destaque excessivo** — todos os 4 posts têm `destaque: true`, mas `getDestaquePosts(n=3)` retorna no máximo 3 para a home, descartando o quarto silenciosamente.

---

## Taxonomia de categorias (nova)

| Categoria | Cor accent | Uso |
|---|---|---|
| `Marco` | Dourado `#DDA01F` | Eventos fundadores, aprovações, conquistas históricas |
| `Grupo` | Verde `#4BAF92` | Composição, estrutura e vida do grupo |
| `Laboratório` | Ciano `#3BAEC4` | Equipamentos, infraestrutura, instalações |
| `Publicação` | Verde `#4BAF92` | Artigos, preprints, capítulos |
| `Oportunidades` | Violeta `#692BBA` | Vagas IC, mestrado, doutorado |

Categorias removidas: `Parceria`, `Premiação`, `Evento` (não existem posts; podem ser adicionadas quando necessário).

---

## Mudanças em `app/noticias/page.js`

- **Remover** constante `MARCO_FUNDADOR` e variável `showMarco`
- **Remover** bloco `{showMarco && (...)}` do JSX
- **Atualizar** array `CATEGORIAS` para: `Todos · Marco · Grupo · Laboratório · Publicação · Oportunidades`
- **Atualizar** objeto `categoriaMeta` com as 5 categorias novas e suas cores
- **Nenhuma** lógica especial para posts Marco — entram na grade como qualquer outro, com badge dourado gerado pelo `categoriaMeta` existente
- **Remover** ícone `StarIcon` (não mais usado)

---

## Mudanças em `app/noticias/[slug]/page.js`

- **Atualizar** `categoriaMeta` para espelhar as mesmas 5 categorias e cores definidas em `page.js`

---

## Mudanças nos posts (`content/posts/`)

| Arquivo | Campo | De | Para |
|---|---|---|---|
| `aprovacao-fapesp-jovem-pesquisador.md` | `categoria` | `Grupo` | `Marco` |
| `inicio-das-atividades.md` | `destaque` | `true` | `false` |
| `chamada-iniciacao-cientifica-2026.md` | — | sem mudança | sem mudança |
| `primeiro-equipamento-chegou.md` | — | sem mudança | sem mudança |

---

## O que este escopo NÃO inclui

- Paginação (YAGNI — 4 posts não justificam)
- Posts Marco fixados no topo da lista (decidido contra na fase de design)
- Contador `(n)` nos filtros
- Mudanças na home (`/`)
- Atualização do corpo dos posts (etapa separada, depende de informações do coordenador)

---

## Critérios de sucesso

- Filtrar por qualquer das 5 categorias mostra os posts corretos
- Nenhum bloco hardcoded na página de notícias
- A home exibe exatamente 3 posts em destaque
- Nenhuma regressão visual na grade de cards
