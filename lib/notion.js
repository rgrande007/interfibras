import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// IDs dos databases (configurados no .env.local)
const DB_CONTEUDOS  = process.env.NOTION_DB_CONTEUDOS
const DB_FEEDBACKS  = process.env.NOTION_DB_FEEDBACKS
const DB_RELATORIOS = process.env.NOTION_DB_RELATORIOS

// Extrai texto plano de propriedades rich_text do Notion
function richText(prop) {
  return prop?.rich_text?.map((t) => t.plain_text).join('') ?? ''
}

function titleText(prop) {
  return prop?.title?.map((t) => t.plain_text).join('') ?? ''
}

// ─── Conteúdos (procedimentos + experimentos) ────────────────────────────────

export async function getConteudos(alunoNome) {
  const resp = await notion.databases.query({
    database_id: DB_CONTEUDOS,
    filter: {
      and: [
        { property: 'Ativo', checkbox: { equals: true } },
        {
          or: [
            { property: 'Aluno', select: { equals: 'Todos' } },
            { property: 'Aluno', select: { equals: alunoNome } },
          ],
        },
      ],
    },
    sorts: [{ property: 'Criado em', direction: 'descending' }],
  })

  return resp.results.map((page) => ({
    id: page.id,
    titulo: titleText(page.properties['Título']),
    conteudo: richText(page.properties['Conteúdo']),
    tipo: page.properties['Tipo']?.select?.name?.toLowerCase() ?? 'procedimento',
    created_at: page.created_time,
  }))
}

// ─── Feedbacks ───────────────────────────────────────────────────────────────

export async function getFeedbacks(alunoNome) {
  const resp = await notion.databases.query({
    database_id: DB_FEEDBACKS,
    filter: { property: 'Aluno', select: { equals: alunoNome } },
    sorts: [{ property: 'Data', direction: 'descending' }],
  })

  return resp.results.map((page) => ({
    id: page.id,
    conteudo: richText(page.properties['Mensagem']),
    created_at:
      page.properties['Data']?.date?.start ?? page.created_time,
  }))
}

export async function getFeedbacksTodos() {
  const resp = await notion.databases.query({
    database_id: DB_FEEDBACKS,
    sorts: [{ property: 'Data', direction: 'descending' }],
  })

  return resp.results.map((page) => ({
    id: page.id,
    aluno: page.properties['Aluno']?.select?.name ?? '',
    conteudo: richText(page.properties['Mensagem']),
    created_at:
      page.properties['Data']?.date?.start ?? page.created_time,
  }))
}

export async function createFeedback({ alunoNome, mensagem }) {
  await notion.pages.create({
    parent: { database_id: DB_FEEDBACKS },
    properties: {
      Aluno: { select: { name: alunoNome } },
      Mensagem: { rich_text: [{ text: { content: mensagem } }] },
      Data: { date: { start: new Date().toISOString().split('T')[0] } },
    },
  })
}

// ─── Relatórios ──────────────────────────────────────────────────────────────

export async function getRelatorios(alunoNome) {
  const resp = await notion.databases.query({
    database_id: DB_RELATORIOS,
    filter: { property: 'Aluno', select: { equals: alunoNome } },
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  })

  return resp.results.map(pageToRelatorio)
}

export async function getRelatoriosTodos() {
  const resp = await notion.databases.query({
    database_id: DB_RELATORIOS,
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  })

  return resp.results.map(pageToRelatorio)
}

function pageToRelatorio(page) {
  return {
    id: page.id,
    titulo: titleText(page.properties['Título']),
    conteudo: richText(page.properties['Conteúdo']),
    aluno: page.properties['Aluno']?.select?.name ?? '',
    status: page.properties['Status']?.select?.name?.toLowerCase() ?? 'rascunho',
    feedback_orientador: richText(page.properties['Feedback do Orientador']),
    updated_at: page.last_edited_time,
    created_at: page.created_time,
  }
}

export async function upsertRelatorio({ notionId, alunoNome, titulo, conteudo, status }) {
  if (notionId) {
    await notion.pages.update({
      page_id: notionId,
      properties: {
        Título: { title: [{ text: { content: titulo } }] },
        Conteúdo: { rich_text: [{ text: { content: conteudo ?? '' } }] },
        Status: { select: { name: capitalize(status) } },
      },
    })
  } else {
    await notion.pages.create({
      parent: { database_id: DB_RELATORIOS },
      properties: {
        Título: { title: [{ text: { content: titulo } }] },
        Aluno: { select: { name: alunoNome } },
        Conteúdo: { rich_text: [{ text: { content: conteudo ?? '' } }] },
        Status: { select: { name: capitalize(status) } },
      },
    })
  }
}

export async function revisarRelatorio({ notionId, feedbackOrientador }) {
  await notion.pages.update({
    page_id: notionId,
    properties: {
      Status: { select: { name: 'Revisado' } },
      'Feedback do Orientador': {
        rich_text: [{ text: { content: feedbackOrientador } }],
      },
    },
  })
}

// ─── Conteúdo (admin) ────────────────────────────────────────────────────────

export async function getConteudosTodos() {
  const resp = await notion.databases.query({
    database_id: DB_CONTEUDOS,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  })

  return resp.results.map((page) => ({
    id: page.id,
    titulo: titleText(page.properties['Título']),
    conteudo: richText(page.properties['Conteúdo']),
    tipo: page.properties['Tipo']?.select?.name?.toLowerCase() ?? 'procedimento',
    aluno: page.properties['Aluno']?.select?.name ?? 'Todos',
    ativo: page.properties['Ativo']?.checkbox ?? false,
    created_at: page.created_time,
  }))
}

export async function createConteudo({ titulo, conteudo, tipo, alunoNome }) {
  await notion.pages.create({
    parent: { database_id: DB_CONTEUDOS },
    properties: {
      Título: { title: [{ text: { content: titulo } }] },
      Conteúdo: { rich_text: [{ text: { content: conteudo ?? '' } }] },
      Tipo: { select: { name: capitalize(tipo) } },
      Aluno: { select: { name: alunoNome ?? 'Todos' } },
      Ativo: { checkbox: true },
    },
  })
}

function capitalize(str) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
