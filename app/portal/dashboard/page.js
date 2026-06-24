import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getConteudos, getFeedbacks, getRelatorios } from '@/lib/notion'
import StudentDashboard from '@/components/portal/StudentDashboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/portal/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/portal/login')
  if (profile.is_admin) redirect('/portal/admin')

  const alunoNome = profile.nome

  const [conteudos, feedbacks, relatorios] = await Promise.all([
    getConteudos(alunoNome),
    getFeedbacks(alunoNome),
    getRelatorios(alunoNome),
  ])

  const procedimentos = conteudos.filter((c) => c.tipo === 'procedimento')
  const experimentos = conteudos.filter((c) => c.tipo === 'experimento')

  return (
    <StudentDashboard
      profile={profile}
      procedimentos={procedimentos}
      experimentos={experimentos}
      feedbacks={feedbacks}
      relatorios={relatorios}
    />
  )
}
