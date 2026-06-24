# Jovem Pesquisador FAPESP — Notion Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar o espaço completo "Jovem Pesquisador FAPESP" no Notion com 7 bases de dados relacionadas, Dashboard estético clean e Portal do Aluno compartilhável.

**Architecture:** Hub central (Dashboard) conectado a 7 databases via Notion Relational Properties. Databases são criados primeiro sem relações, depois as relações são adicionadas via update-data-source (requer IDs das databases já existentes). Views e páginas de navegação são criadas por último.

**Tech Stack:** Notion MCP API (`notion-create-database`, `notion-create-pages`, `notion-update-data-source`, `notion-update-page`, `notion-search`, `notion-fetch`)

## Global Constraints

- Todos os nomes de propriedades são em português conforme o spec
- Paleta estética: clean/orgânica — branco, verde-sálvia, cinza-ardósia, terracota suave
- Databases são criados como sub-páginas do workspace principal (page_id do workspace principal)
- Relações são sempre DUAL (bidirecional) para visibilidade nos dois lados
- Nenhum dado sensível (financeiro) é exposto no Portal do Aluno

---

## Task 1: Localizar raiz do workspace Notion

**Files:** N/A (exploração)

- [ ] **Step 1: Buscar página raiz ou espaço existente**

Usar `notion-search` com query "Jovem Pesquisador" para verificar se já existe algo, e depois buscar por páginas de nível superior para escolher o parent.

---

## Task 2: Criar página principal do workspace

**Files:**
- Create: Página Notion "🔬 Jovem Pesquisador FAPESP" (workspace root)

**Produces:** `page_id` da página principal — usado como parent de todas as databases e sub-páginas

- [ ] **Step 1: Criar página raiz**

`notion-create-pages` com título "🔬 Jovem Pesquisador FAPESP", sem parent (workspace level), com ícone 🔬 e cover de nanofibras.

- [ ] **Step 2: Anotar o page_id retornado**

O `page_id` desta página é usado em todas as tasks seguintes como `parent.page_id`.

---

## Task 3: Criar database — Equipe

**Files:**
- Create: Database "👥 Equipe" (parent = página principal)

**Produces:** `data_source_id` de Equipe — usado nas relações de Projetos, Experimentos, Tarefas, Prestação de Contas

- [ ] **Step 1: Criar database Equipe**

```sql
CREATE TABLE (
  "Nome" TITLE,
  "Papel" SELECT('PI':blue, 'IC':green, 'Mestrado':purple, 'Doutorado':orange, 'Colaborador Externo':gray),
  "Instituição" RICH_TEXT,
  "Email" EMAIL,
  "Status da bolsa" SELECT('Ativa':green, 'Em renovação':yellow, 'Encerrada':red),
  "Início" DATE,
  "Fim previsto" DATE
)
```

- [ ] **Step 2: Anotar data_source_id de Equipe**

---

## Task 4: Criar database — Timeline FAPESP

**Files:**
- Create: Database "📅 Timeline FAPESP" (parent = página principal)

**Produces:** `data_source_id` de Timeline — usado na relação de Prestação de Contas

- [ ] **Step 1: Criar database Timeline FAPESP**

```sql
CREATE TABLE (
  "Marco" TITLE,
  "Tipo" SELECT('Relatório científico':blue, 'Prestação de contas':orange, 'Publicação':green, 'Reunião':gray, 'Entrega interna':purple),
  "Data" DATE,
  "Status" SELECT('Não iniciado':gray, 'Em preparação':yellow, 'Entregue':blue, 'Aprovado':green),
  "Dias de antecedência para alerta" NUMBER,
  "Notas" RICH_TEXT,
  "Documentos" FILES
)
```

- [ ] **Step 2: Anotar data_source_id de Timeline FAPESP**

---

## Task 5: Criar database — Central de Projetos

**Files:**
- Create: Database "🔬 Central de Projetos e Trabalhos" (parent = página principal)

**Produces:** `data_source_id` de Projetos — usado nas relações de Experimentos e Tarefas

- [ ] **Step 1: Criar database Central de Projetos**

```sql
CREATE TABLE (
  "Título" TITLE,
  "Status" SELECT('Ideia':gray, 'Refinamento':yellow, 'Experimentos':blue, 'Análise':purple, 'Escrita':orange, 'Submetido':pink, 'Publicado':green),
  "Linha de pesquisa" SELECT('Nanocelulose':green, 'Lignina':brown, 'Quitina':orange, 'Interfaces':blue, 'Funcionalização':purple, 'Outro':gray),
  "Descrição da ideia" RICH_TEXT,
  "Journal alvo" RICH_TEXT,
  "Prazo estimado" DATE,
  "Criado em" CREATED_TIME
)
```

- [ ] **Step 2: Anotar data_source_id de Central de Projetos**

---

## Task 6: Criar database — Experimentos

**Files:**
- Create: Database "🧪 Experimentos" (parent = página principal)

**Produces:** `data_source_id` de Experimentos — usado nas relações de Tarefas e Inventário

- [ ] **Step 1: Criar database Experimentos**

```sql
CREATE TABLE (
  "Nome" TITLE,
  "Status" SELECT('Planejado':gray, 'Em andamento':blue, 'Concluído':green, 'Replicação necessária':yellow, 'Arquivado':red),
  "Data início" DATE,
  "Data fim" DATE,
  "Resultados" RICH_TEXT,
  "Observações" RICH_TEXT,
  "Arquivos de dados" FILES,
  "Protocolo" FILES
)
```

- [ ] **Step 2: Anotar data_source_id de Experimentos**

---

## Task 7: Criar database — Tarefas

**Files:**
- Create: Database "✅ Tarefas" (parent = página principal)

**Produces:** `data_source_id` de Tarefas

- [ ] **Step 1: Criar database Tarefas**

```sql
CREATE TABLE (
  "Nome" TITLE,
  "Status" SELECT('A fazer':gray, 'Em andamento':blue, 'Bloqueado':red, 'Concluído':green),
  "Prioridade" SELECT('Alta':red, 'Média':yellow, 'Baixa':gray),
  "Prazo" DATE,
  "Tipo" SELECT('Experimental':blue, 'Análise':purple, 'Escrita':orange, 'Administrativo':gray, 'Reunião':green),
  "Descrição" RICH_TEXT
)
```

- [ ] **Step 2: Anotar data_source_id de Tarefas**

---

## Task 8: Criar database — Inventário

**Files:**
- Create: Database "📦 Inventário" (parent = página principal)

**Produces:** `data_source_id` de Inventário

- [ ] **Step 1: Criar database Inventário**

```sql
CREATE TABLE (
  "Item" TITLE,
  "Categoria" SELECT('Equipamento':blue, 'Consumível':green, 'Vidraria':purple, 'Reagente':orange, 'EPI':red, 'Outro':gray),
  "Quantidade atual" NUMBER,
  "Unidade" SELECT('unid':gray, 'mL':blue, 'g':green, 'm':purple, 'caixa':orange),
  "Quantidade mínima" NUMBER,
  "Estoque OK?" FORMULA('prop("Quantidade atual") >= prop("Quantidade mínima")'),
  "Localização" RICH_TEXT,
  "Fornecedor" RICH_TEXT,
  "Última reposição" DATE,
  "Observações" RICH_TEXT
)
```

- [ ] **Step 2: Anotar data_source_id de Inventário**

---

## Task 9: Criar database — Prestação de Contas

**Files:**
- Create: Database "💰 Prestação de Contas" (parent = página principal)

**Produces:** `data_source_id` de Prestação de Contas

- [ ] **Step 1: Criar database Prestação de Contas**

```sql
CREATE TABLE (
  "Despesa" TITLE,
  "Categoria" SELECT('Material de consumo':green, 'Equipamento':blue, 'Passagem':orange, 'Diária':yellow, 'Serviço':purple, 'Outro':gray),
  "Valor (R$)" NUMBER FORMAT 'number',
  "Data" DATE,
  "Status" SELECT('Pendente':red, 'Pago':yellow, 'Prestado à FAPESP':green),
  "Rubrica" RICH_TEXT,
  "Nota fiscal" FILES
)
```

- [ ] **Step 2: Anotar data_source_id de Prestação de Contas**

---

## Task 10: Adicionar relações entre databases

**Requires:** Todos os data_source_ids das Tasks 3–9

- [ ] **Step 1: Adicionar relações em Equipe**

```sql
ADD COLUMN "Projetos" RELATION('<ds_projetos>', DUAL 'Responsável');
ADD COLUMN "Experimentos" RELATION('<ds_experimentos>', DUAL 'Responsável');
ADD COLUMN "Tarefas" RELATION('<ds_tarefas>', DUAL 'Responsável');
ADD COLUMN "Despesas" RELATION('<ds_prestacao>', DUAL 'Responsável pela compra')
```

- [ ] **Step 2: Adicionar relações em Central de Projetos**

```sql
ADD COLUMN "Colaboradores" RELATION('<ds_equipe>', DUAL 'Projetos colaborados');
ADD COLUMN "Experimentos" RELATION('<ds_experimentos>', DUAL 'Projeto vinculado');
ADD COLUMN "Tarefas" RELATION('<ds_tarefas>', DUAL 'Projeto vinculado')
```

- [ ] **Step 3: Adicionar relações em Experimentos**

```sql
ADD COLUMN "Itens de Inventário" RELATION('<ds_inventario>', DUAL 'Experimentos que usam')
```

- [ ] **Step 4: Adicionar relações em Tarefas**

```sql
ADD COLUMN "Experimento vinculado" RELATION('<ds_experimentos>', DUAL 'Tarefas')
```

- [ ] **Step 5: Adicionar relações em Prestação de Contas**

```sql
ADD COLUMN "Marco FAPESP vinculado" RELATION('<ds_timeline>', DUAL 'Despesas vinculadas')
```

---

## Task 11: Criar Dashboard (Home)

**Files:**
- Create: Página "🏠 Dashboard" (parent = página principal)

- [ ] **Step 1: Criar página Dashboard com conteúdo estético**

Página com cover de nanofibras/microscopia, paleta clean, callout blocks de métricas rápidas, linked databases para Projetos (Gallery), Tarefas da semana (agrupado por Responsável), e próximos marcos FAPESP (tabela ordenada por Data). Links rápidos para todas as databases.

---

## Task 12: Criar Portal do Aluno

**Files:**
- Create: Página "🎓 Portal do Aluno" (parent = página principal)

- [ ] **Step 1: Criar página Portal do Aluno**

Página compartilhável com seções: Minhas Tarefas, Meus Experimentos, Protocolos, Comunicados do Orientador. Inclui instruções de uso para os alunos.

---

## Task 13: Adicionar entradas de exemplo

- [ ] **Step 1: Adicionar membros da equipe**

Criar entrada para PI (Rafael Grande) e entradas placeholder para 2 ICs e 1 mestrando.

- [ ] **Step 2: Adicionar marcos FAPESP iniciais**

Criar 3-4 marcos típicos: Relatório Parcial, Prestação de Contas Semestral, Relatório Final.

- [ ] **Step 3: Adicionar projeto exemplo**

Criar uma entrada em Central de Projetos com Status = "Experimentos" e outline de artigo como sub-página.
