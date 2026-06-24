# Design Spec — Espaço Notion: Jovem Pesquisador FAPESP

**Data:** 2026-06-23  
**Projeto:** Jovem Pesquisador FAPESP — Controle de Interfaces em Meio Aquoso para Organização de Nanoblocos Naturais em Materiais Funcionais  
**Área:** Ciência de Materiais / Nanomateriais de fontes renováveis  
**Responsável:** PI (Rafael Grande)  
**Equipe atual:** PI + 2 ICs + 1 mestrando + colaboradores externos  

---

## Contexto e Motivação

O PI identificou três pontos de dor principais na gestão atual:

- **A — Rastreabilidade de experimentos:** dificuldade em saber o que foi feito, o que funcionou e onde estão os dados
- **B — Visibilidade da equipe:** alunos não sabem o que precisam fazer nem o andamento geral
- **C — Prazos FAPESP:** relatórios e prestações de contas pegam de surpresa

O espaço Notion deve resolver os três com um sistema conectado, estético e de baixa fricção.

---

## Abordagem Escolhida

**Hub Central + Bases Relacionadas** — um dashboard central conecta 7 bases de dados relacionadas entre si. Informações fluem entre as bases via relações e rollups, eliminando duplicação e permitindo visões cruzadas (ex: qual experimento está vinculado a qual projeto, quais itens do inventário estão acabando, quanto do orçamento já foi comprometido).

---

## Mapa do Espaço

```
🏠 Dashboard (Home)
│
├── 🔬 Central de Projetos
├── 🧪 Experimentos
├── ✅ Tarefas
├── 👥 Equipe
├── 📅 Timeline FAPESP
├── 📦 Inventário
├── 💰 Prestação de Contas
└── 🎓 Portal do Aluno
```

---

## Bases de Dados

### 🔬 Central de Projetos e Trabalhos

Pipeline de cada linha de pesquisa, da ideia à publicação. Um projeto pode gerar múltiplos artigos.

| Propriedade | Tipo | Notas |
|---|---|---|
| Título | Título | Nome do sub-projeto / linha |
| Status | Select | Ideia → Refinamento → Experimentos → Análise → Escrita → Submetido → Publicado |
| Responsável | Relation → Equipe | Pessoa que lidera o trabalho |
| Colaboradores | Relation → Equipe | Membros adicionais |
| Linha de pesquisa | Select | Nanocelulose / Lignina / Quitina / Interfaces / Funcionalização / Outro |
| Descrição da ideia | Text | Contexto, motivação, hipótese central |
| Experimentos vinculados | Relation → Experimentos | Experimentos que alimentam este projeto |
| Outline do artigo | Page (sub-página) | Template fixo: Intro / Objetivos / Metodologia / Resultados esperados / Discussão / Conclusão |
| Journal alvo | Text | Ex: ACS Nano, Biomacromolecules |
| Prazo estimado | Date | Meta de submissão |
| Criado em | Created time | Automático |

**Views sugeridas:**
- Kanban por Status (visão pipeline)
- Tabela completa (visão PI)
- Galeria por Linha de pesquisa

---

### 🧪 Experimentos

Registro central de toda atividade laboratorial.

| Propriedade | Tipo | Notas |
|---|---|---|
| Nome | Título | Identificador único do experimento |
| Status | Select | Planejado / Em andamento / Concluído / Replicação necessária / Arquivado |
| Projeto vinculado | Relation → Central de Projetos | |
| Responsável | Relation → Equipe | Quem executou |
| Data início | Date | |
| Data fim | Date | |
| Protocolo | Files ou Page | Documento de protocolo |
| Resultados | Text / Page | Observações e dados qualitativos |
| Arquivos de dados | Files | Imagens, planilhas, espectros |
| Observações | Text | Desvios, intercorrências, próximos passos |

**Views sugeridas:**
- Tabela filtrada por Responsável (para o Portal do Aluno)
- Kanban por Status
- Timeline por Data início

---

### ✅ Tarefas

Gestão de atividades da equipe com rastreabilidade.

| Propriedade | Tipo | Notas |
|---|---|---|
| Nome | Título | |
| Responsável | Relation → Equipe | |
| Status | Select | A fazer / Em andamento / Bloqueado / Concluído |
| Prioridade | Select | Alta / Média / Baixa |
| Prazo | Date | |
| Experimento vinculado | Relation → Experimentos | |
| Projeto vinculado | Relation → Central de Projetos | |
| Tipo | Select | Experimental / Análise / Escrita / Administrativo / Reunião |
| Descrição | Text | |

**Views sugeridas:**
- Agrupado por Responsável (visão semanal da equipe)
- Filtrado por Status = Em andamento (foco)
- Calendário por Prazo

---

### 👥 Equipe

Cadastro de todos os membros e colaboradores.

| Propriedade | Tipo | Notas |
|---|---|---|
| Nome | Título | |
| Papel | Select | PI / IC / Mestrado / Doutorado / Colaborador Externo |
| Instituição | Text | |
| Email | Email | |
| Projeto focado | Relation → Central de Projetos | |
| Status da bolsa | Select | Ativa / Encerrada / Em renovação |
| Início | Date | |
| Fim previsto | Date | |

---

### 📅 Timeline FAPESP

Controle de todos os marcos, prazos e entregas do projeto.

| Propriedade | Tipo | Notas |
|---|---|---|
| Marco | Título | |
| Tipo | Select | Relatório científico / Prestação de contas / Publicação / Reunião / Entrega interna |
| Data | Date | |
| Status | Select | Não iniciado / Em preparação / Entregue / Aprovado |
| Dias de antecedência para alerta | Number | Para lembrete manual ou automação futura |
| Documentos | Files | |
| Despesas vinculadas | Relation → Prestação de Contas | |
| Notas | Text | |

**Views sugeridas:**
- Calendário (visão mensal)
- Tabela ordenada por Data (próximos prazos no topo)
- Filtrado por Status ≠ Aprovado (pendências)

---

### 📦 Inventário

Controle de materiais do laboratório com alerta de reposição.

| Propriedade | Tipo | Notas |
|---|---|---|
| Item | Título | |
| Categoria | Select | Equipamento / Consumível / Vidraria / Reagente / EPI / Outro |
| Quantidade atual | Number | |
| Unidade | Select | unid / mL / g / m / caixa |
| Quantidade mínima | Number | Threshold de alerta |
| Estoque OK? | Formula | `atual >= mínima` → ✅ / ⚠️ |
| Localização | Text | Prateleira, armário, geladeira... |
| Fornecedor | Text | |
| Última reposição | Date | |
| Experimentos que usam | Relation → Experimentos | |
| Observações | Text | |

**Views sugeridas:**
- Filtrado por Estoque OK? = ⚠️ (itens a repor)
- Agrupado por Categoria

---

### 💰 Prestação de Contas

Rastreamento financeiro da bolsa FAPESP.

| Propriedade | Tipo | Notas |
|---|---|---|
| Despesa | Título | |
| Categoria | Select | Material de consumo / Equipamento / Passagem / Diária / Serviço / Outro |
| Valor (R$) | Number | |
| Data | Date | |
| Status | Select | Pendente / Pago / Prestado à FAPESP |
| Nota fiscal | Files | Comprovante digitalizado |
| Marco FAPESP vinculado | Relation → Timeline FAPESP | |
| Rubrica | Select | Conforme plano de trabalho da bolsa |
| Responsável | Relation → Equipe | Quem realizou a compra |

**Views sugeridas:**
- Agrupado por Status
- Soma de Valor por Categoria (rollup no Dashboard)
- Filtrado por Status = Pendente

---

### 🎓 Portal do Aluno

Página estática compartilhada como convidado com cada aluno. Contém views filtradas das bases principais.

**Seções:**
1. **Minhas tarefas desta semana** — view de Tarefas filtrada por Responsável = aluno logado, Prazo = semana atual
2. **Meus experimentos em andamento** — view de Experimentos filtrada por Responsável = aluno logado
3. **Protocolos** — seção com links ou arquivos de protocolos disponibilizados pelo PI
4. **Adicionar resultado** — link direto para criar nova entrada em Experimentos (com Responsável pré-preenchido)
5. **Feedback do orientador** — seção de texto editável pelo PI por aluno, ou comentários nas entradas de Tarefas/Experimentos
6. **Comunicados** — bloco de texto/callout atualizado pelo PI com avisos gerais

**Permissões:** cada aluno recebe acesso de convidado (Can edit) somente nas páginas do Portal e nas bases de Tarefas e Experimentos. Não acessa Prestação de Contas nem configurações do workspace.

---

## Dashboard (Home)

Página principal do espaço com estética **clean/orgânica**.

**Estética:**
- Paleta: branco/off-white de fundo, acentos em verde-sálvia, cinza-ardósia e terracota suave
- Cover: imagem de microscopia ou fibras naturais em close (TEM/SEM de nanocelulose, por exemplo)
- Ícone: átomo ou estrutura molecular minimalista
- Tipografia: títulos em negrito limpo, subtítulos em cinza médio
- Uso de callout blocks coloridos para métricas chave

**Blocos do Dashboard:**
```
[Cover image — microscopia/nanofibras]
[Ícone + Título: Jovem Pesquisador FAPESP]

┌─────────────────────────────────────────┐
│  ⚠️ Próximo prazo FAPESP               │
│  [Nome do marco] — em X dias           │
└─────────────────────────────────────────┘

[4 cards de métricas rápidas]
  🧪 Experimentos em andamento: N
  ✅ Tarefas abertas: N
  📦 Itens a repor: N
  💰 Saldo estimado disponível: R$ X

[Seção: Projetos em Andamento]
  → view Gallery da Central de Projetos, filtrado por Status ≠ Publicado

[Seção: Tarefas da Equipe — Esta Semana]
  → view de Tarefas agrupada por Responsável, filtrado por Prazo = semana atual

[Seção: Próximos Marcos FAPESP]
  → view de Timeline FAPESP ordenada por Data, próximos 60 dias

[Links rápidos]
  🔬 Central de Projetos | 🧪 Experimentos | 👥 Equipe | 📦 Inventário | 💰 Prestação de Contas | 🎓 Portal do Aluno
```

---

## Relações entre Bases (Grafo)

```
Central de Projetos
    ↔ Experimentos (um projeto tem N experimentos)
    ↔ Equipe (responsável + colaboradores)

Experimentos
    ↔ Tarefas (uma tarefa pode estar vinculada a um experimento)
    ↔ Inventário (experimento usa N itens)
    ↔ Equipe (responsável)

Tarefas
    ↔ Equipe (responsável)
    ↔ Central de Projetos

Prestação de Contas
    ↔ Timeline FAPESP (despesa vinculada a um marco)
    ↔ Equipe (quem comprou)
```

---

## Fora do Escopo

- Integração com SAGe FAPESP (sistema de gestão de bolsas) — manual por ora
- Base de Literatura / Zotero — explicitamente excluída por decisão do PI
- Automações Notion (notificações por email) — avaliadas em fase posterior

---

## Próximo Passo

Implementação via API Notion MCP: criação das bases, propriedades, relações, views e páginas conforme este spec.
