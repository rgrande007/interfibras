'use client'

import { useState } from 'react'
import { logout, saveRelatorio } from '@/app/portal/actions'
// relatorio.id é o ID da página Notion
import { LogOut, FlaskConical, ClipboardList, MessageSquare, FileText, Plus, Send } from 'lucide-react'

const TABS = [
  { id: 'procedimentos', label: 'Procedimentos', icon: ClipboardList },
  { id: 'experimentos', label: 'Experimentos', icon: FlaskConical },
  { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
]

const STATUS_LABELS = {
  rascunho: { label: 'Rascunho', color: 'bg-amber-100 text-amber-700' },
  enviado: { label: 'Enviado', color: 'bg-blue-100 text-blue-700' },
  revisado: { label: 'Revisado', color: 'bg-green-100 text-green-700' },
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-16 text-[#072524]/40">
      <p className="text-sm">{message}</p>
    </div>
  )
}

function ContentCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-[#072524]/10 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-[#F1F2EF] transition-colors"
      >
        <span className="font-medium text-[#072524] text-sm">{item.titulo}</span>
        <span className="text-[#4BAF92] text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && item.conteudo && (
        <div className="px-5 pb-5 text-sm text-[#072524]/70 leading-relaxed border-t border-[#072524]/8 pt-4 whitespace-pre-wrap">
          {item.conteudo}
        </div>
      )}
    </div>
  )
}

function RelatorioForm({ relatorio, onClose }) {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  async function handleSubmit(status) {
    setLoading(true)
    setMsg(null)
    const form = document.getElementById('relatorio-form')
    const data = new FormData(form)
    data.set('status', status)
    const result = await saveRelatorio(data)
    setLoading(false)
    if (result?.error) {
      setMsg({ type: 'error', text: result.error })
    } else {
      setMsg({ type: 'success', text: 'Salvo com sucesso!' })
      setTimeout(onClose, 800)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#072524]/10 p-5 space-y-4">
      <h3 className="font-semibold text-[#072524] text-sm">
        {relatorio ? 'Editar Relatório' : 'Novo Relatório'}
      </h3>
      <form id="relatorio-form" className="space-y-3">
        {relatorio && <input type="hidden" name="notion_id" value={relatorio.id} />}
        <input
          name="titulo"
          defaultValue={relatorio?.titulo ?? ''}
          required
          placeholder="Título do relatório"
          className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524]"
        />
        <textarea
          name="conteudo"
          defaultValue={relatorio?.conteudo ?? ''}
          rows={8}
          placeholder="Escreva seu relatório aqui…"
          className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524] resize-none"
        />
      </form>
      {msg && (
        <p className={`text-xs ${msg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {msg.text}
        </p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit('rascunho')}
          disabled={loading}
          className="flex-1 py-2 rounded-lg border border-[#072524]/20 text-[#072524] text-sm hover:bg-[#F1F2EF] transition-colors disabled:opacity-50"
        >
          Salvar rascunho
        </button>
        <button
          onClick={() => handleSubmit('enviado')}
          disabled={loading}
          className="flex-1 py-2 rounded-lg bg-[#4BAF92] text-white text-sm hover:bg-[#3d9a80] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
        >
          <Send size={13} /> Enviar
        </button>
        <button
          onClick={onClose}
          className="px-3 py-2 rounded-lg border border-[#072524]/20 text-[#072524] text-sm hover:bg-[#F1F2EF] transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function StudentDashboard({
  profile,
  procedimentos,
  experimentos,
  feedbacks,
  relatorios,
}) {
  const [activeTab, setActiveTab] = useState('procedimentos')
  const [editingRelatorio, setEditingRelatorio] = useState(null)
  const [showNewRelatorio, setShowNewRelatorio] = useState(false)

  function formatDate(str) {
    return new Date(str).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-[#F1F2EF]">
      {/* Header do portal */}
      <header className="bg-[#072524] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4BAF92]" />
          <span className="text-[#4BAF92] text-xs font-medium tracking-widest uppercase">
            Interfibras
          </span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-white/70 text-xs">Portal do Aluno</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs hidden sm:block">
            {profile?.nome}
          </span>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 text-[#8ABFB2] hover:text-white text-xs transition-colors"
          >
            <LogOut size={13} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Boas-vindas */}
        <div className="mb-6">
          <h1 className="text-[#072524] text-xl font-semibold">
            Olá, {profile?.nome?.split(' ')[0]} 👋
          </h1>
          {profile?.projeto && (
            <p className="text-[#072524]/50 text-sm mt-0.5">{profile.projeto}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/60 rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                activeTab === id
                  ? 'bg-[#072524] text-white shadow-sm'
                  : 'text-[#072524]/60 hover:text-[#072524]'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'procedimentos' && (
          <div className="space-y-3">
            {procedimentos.length === 0 ? (
              <EmptyState message="Nenhum procedimento disponível ainda." />
            ) : (
              procedimentos.map((p) => <ContentCard key={p.id} item={p} />)
            )}
          </div>
        )}

        {activeTab === 'experimentos' && (
          <div className="space-y-3">
            {experimentos.length === 0 ? (
              <EmptyState message="Nenhum experimento disponível ainda." />
            ) : (
              experimentos.map((e) => <ContentCard key={e.id} item={e} />)
            )}
          </div>
        )}

        {activeTab === 'feedbacks' && (
          <div className="space-y-3">
            {feedbacks.length === 0 ? (
              <EmptyState message="Nenhum feedback do orientador ainda." />
            ) : (
              feedbacks.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-xl border border-[#4BAF92]/30 px-5 py-4"
                >
                  <p className="text-sm text-[#072524] leading-relaxed whitespace-pre-wrap">
                    {f.conteudo}
                  </p>
                  <p className="text-xs text-[#072524]/40 mt-3">
                    {formatDate(f.created_at)}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'relatorios' && (
          <div className="space-y-3">
            {!showNewRelatorio && editingRelatorio === null && (
              <button
                onClick={() => setShowNewRelatorio(true)}
                className="w-full py-3 rounded-xl border border-dashed border-[#4BAF92]/50 text-[#4BAF92] text-sm hover:bg-[#4BAF92]/5 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Novo relatório
              </button>
            )}

            {showNewRelatorio && (
              <RelatorioForm
                onClose={() => setShowNewRelatorio(false)}
              />
            )}

            {relatorios.length === 0 && !showNewRelatorio ? (
              <EmptyState message="Nenhum relatório ainda. Crie o primeiro acima." />
            ) : (
              relatorios.map((r) =>
                editingRelatorio?.id === r.id ? (
                  <RelatorioForm
                    key={r.id}
                    relatorio={r}
                    onClose={() => setEditingRelatorio(null)}
                  />
                ) : (
                  <div
                    key={r.id}
                    className="bg-white rounded-xl border border-[#072524]/10 px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium text-[#072524] text-sm">
                          {r.titulo}
                        </h3>
                        <p className="text-xs text-[#072524]/40 mt-0.5">
                          {formatDate(r.updated_at || r.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            STATUS_LABELS[r.status]?.color ?? ''
                          }`}
                        >
                          {STATUS_LABELS[r.status]?.label ?? r.status}
                        </span>
                        {r.status !== 'revisado' && (
                          <button
                            onClick={() => setEditingRelatorio(r)}
                            className="text-xs text-[#4BAF92] hover:underline"
                          >
                            Editar
                          </button>
                        )}
                      </div>
                    </div>
                    {r.feedback_orientador && (
                      <div className="mt-3 pt-3 border-t border-[#072524]/8">
                        <p className="text-xs text-[#4BAF92] font-medium mb-1">
                          Feedback do orientador
                        </p>
                        <p className="text-xs text-[#072524]/70 leading-relaxed whitespace-pre-wrap">
                          {r.feedback_orientador}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
