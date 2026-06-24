'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  createFeedback,
  createConteudo,
  upsertRelatorio,
  revisarRelatorio,
} from '@/lib/notion'

async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile, supabase }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(formData) {
  const supabase = await createClient()
  const email = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'E-mail ou senha incorretos.' }

  redirect('/portal/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/portal/login')
}

// ─── Feedback (admin → aluno, escrito no Notion) ──────────────────────────────

export async function addFeedback(formData) {
  const { profile } = await getAuthenticatedUser()
  if (!profile?.is_admin) return { error: 'Não autorizado.' }

  const alunoNome = formData.get('aluno_nome')
  const mensagem = formData.get('conteudo')

  try {
    await createFeedback({ alunoNome, mensagem })
  } catch (e) {
    return { error: e.message }
  }

  revalidatePath('/portal/admin')
  return { success: true }
}

// ─── Conteúdo (admin cria procedimento/experimento no Notion) ─────────────────

export async function addConteudo(formData) {
  const { profile } = await getAuthenticatedUser()
  if (!profile?.is_admin) return { error: 'Não autorizado.' }

  const titulo = formData.get('titulo')
  const conteudo = formData.get('conteudo')
  const tipo = formData.get('tipo') || 'procedimento'
  const alunoNome = formData.get('aluno_nome') || null

  try {
    await createConteudo({ titulo, conteudo, tipo, alunoNome })
  } catch (e) {
    return { error: e.message }
  }

  revalidatePath('/portal/admin')
  revalidatePath('/portal/dashboard')
  return { success: true }
}

// ─── Relatório (aluno salva no Notion) ────────────────────────────────────────

export async function saveRelatorio(formData) {
  const { profile } = await getAuthenticatedUser()

  const notionId = formData.get('notion_id') || null
  const titulo = formData.get('titulo')
  const conteudo = formData.get('conteudo')
  const status = formData.get('status') || 'rascunho'

  try {
    await upsertRelatorio({
      notionId,
      alunoNome: profile.nome,
      titulo,
      conteudo,
      status,
    })
  } catch (e) {
    return { error: e.message }
  }

  revalidatePath('/portal/dashboard')
  return { success: true }
}

// ─── Revisão do orientador (atualiza relatório no Notion) ─────────────────────

export async function addFeedbackRelatorio(formData) {
  const { profile } = await getAuthenticatedUser()
  if (!profile?.is_admin) return { error: 'Não autorizado.' }

  const notionId = formData.get('relatorio_id')
  const feedbackOrientador = formData.get('feedback_orientador')

  try {
    await revisarRelatorio({ notionId, feedbackOrientador })
  } catch (e) {
    return { error: e.message }
  }

  revalidatePath('/portal/admin')
  return { success: true }
}
