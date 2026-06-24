import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  getConteudosTodos,
  getFeedbacksTodos,
  getRelatoriosTodos,
} from '@/lib/notion'
import AdminPanel from '@/components/portal/AdminPanel'

export default async function AdminPage() {
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

  if (!profile?.is_admin) redirect('/portal/dashboard')

  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_admin', false)
    .order('nome')

  const [allConteudos, allFeedbacks, allRelatorios] = await Promise.all([
    getConteudosTodos(),
    getFeedbacksTodos(),
    getRelatoriosTodos(),
  ])

  return (
    <AdminPanel
      adminProfile={profile}
      students={students ?? []}
      allConteudos={allConteudos}
      allFeedbacks={allFeedbacks}
      allRelatorios={allRelatorios}
    />
  )
}
