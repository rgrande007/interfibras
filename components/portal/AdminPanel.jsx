'use client'

import { useState } from 'react'
import {
  logout,
  addFeedback,
  addConteudo,
  addFeedbackRelatorio,
} from '@/app/portal/actions'
import {
  LogOut,
  Users,
  FlaskConical,
  ClipboardList,
  MessageSquare,
  FileText,
  Plus,
  ChevronRight,
} from 'lucide-react'

const STATUS_LABELS = {
  rascunho: { label: 'Rascunho', color: 'bg-amber-100 text-amber-700' },
  enviado: { label: 'Enviado', color: 'bg-blue-100 text-blue-700' },
  revisado: { label: 'Revisado', color: 'bg-green-100 text-green-700' },
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function FeedbackModal({ alunoNome, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    data.set('aluno_nome', alunoNome)
    const result = await addFeedback(data)
    setLoading(false)
    if (result?.error) setError(result.error)
    else { onSuccess(); onClose() }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="font-semibold text-[#072524] mb-1">Enviar Feedback</h3>
        <p className="text-xs text-[#072524]/50 mb-4">Para: {alunoNome}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="conteudo"
            required
            rows={5}
            placeholder="Escreva seu feedback…"
            className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524] resize-none"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-lg bg-[#4BAF92] text-white text-sm hover:bg-[#3d9a80] transition-colors disabled:opacity-50">
              {loading ? 'Enviando…' : 'Enviar'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#072524]/15 text-[#072524] text-sm hover:bg-[#F1F2EF] transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ConteudoModal({ alunoNome, students, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [para, setPara] = useState(alunoNome ?? 'Todos')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    data.set('aluno_nome', para === 'Todos' ? null : para)
    const result = await addConteudo(data)
    setLoading(false)
    if (result?.error) setError(result.error)
    else { onSuccess(); onClose() }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="font-semibold text-[#072524] mb-4">Adicionar Conteúdo</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select name="tipo"
            className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524]">
            <option value="procedimento">Procedimento</option>
            <option value="experimento">Experimento</option>
          </select>
          <input name="titulo" required placeholder="Título"
            className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524]" />
          <textarea name="conteudo" rows={5} placeholder="Conteúdo…"
            className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524] resize-none" />
          <div>
            <label className="text-xs text-[#072524]/50 mb-1 block">Visível para</label>
            <select value={para} onChange={(e) => setPara(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524]">
              <option value="Todos">Todos os alunos</option>
              {students.map((s) => (
                <option key={s.id} value={s.nome}>{s.nome}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-lg bg-[#4BAF92] text-white text-sm hover:bg-[#3d9a80] transition-colors disabled:opacity-50">
              {loading ? 'Salvando…' : 'Salvar no Notion'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#072524]/15 text-[#072524] text-sm hover:bg-[#F1F2EF] transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function RelatorioReviewModal({ relatorio, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    data.set('relatorio_id', relatorio.id)
    const result = await addFeedbackRelatorio(data)
    setLoading(false)
    if (result?.error) setError(result.error)
    else { onSuccess(); onClose() }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="font-semibold text-[#072524] mb-1">Revisar Relatório</h3>
        <p className="text-xs text-[#072524]/50 mb-3">{relatorio.aluno} — {relatorio.titulo}</p>
        {relatorio.conteudo && (
          <div className="bg-[#F1F2EF] rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
            <p className="text-xs text-[#072524]/70 whitespace-pre-wrap leading-relaxed">{relatorio.conteudo}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea name="feedback_orientador"
            defaultValue={relatorio.feedback_orientador ?? ''}
            rows={4} placeholder="Seu feedback…"
            className="w-full px-3 py-2 rounded-lg border border-[#072524]/15 text-sm focus:outline-none focus:border-[#4BAF92] text-[#072524] resize-none" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-lg bg-[#692BBA] text-white text-sm hover:bg-[#5a22a0] transition-colors disabled:opacity-50">
              {loading ? 'Salvando…' : 'Salvar revisão no Notion'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#072524]/15 text-[#072524] text-sm hover:bg-[#F1F2EF] transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminPanel({
  adminProfile,
  students,
  allConteudos,
  allFeedbacks,
  allRelatorios,
}) {
  const [activeView, setActiveView] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [modal, setModal] = useState(null)

  const pendingRelatorios = allRelatorios.filter((r) => r.status === 'enviado')

  const studentData = selectedStudent
    ? {
        feedbacks: allFeedbacks.filter((f) => f.aluno === selectedStudent.nome),
        conteudos: allConteudos.filter(
          (c) => c.aluno === selectedStudent.nome || c.aluno === 'Todos'
        ),
        relatorios: allRelatorios.filter((r) => r.aluno === selectedStudent.nome),
      }
    : null

  return (
    <div className="min-h-screen bg-[#F1F2EF]">
      <header className="bg-[#072524] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#692BBA]" />
          <span className="text-[#b785f5] text-xs font-medium tracking-widest uppercase">Interfibras</span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-white/70 text-xs">Painel do Orientador</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-xs hidden sm:block">Dr. {adminProfile?.nome}</span>
          <button onClick={() => logout()}
            className="flex items-center gap-1.5 text-[#8ABFB2] hover:text-white text-xs transition-colors">
            <LogOut size={13} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Alunos', icon: Users },
            { id: 'conteudo', label: 'Conteúdo Geral', icon: ClipboardList },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id}
              onClick={() => { setActiveView(id); setSelectedStudent(null) }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeView === id && !selectedStudent
                  ? 'bg-[#072524] text-white'
                  : 'text-[#072524]/60 hover:text-[#072524] bg-white/60'
              }`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* Visão geral */}
        {activeView === 'overview' && !selectedStudent && (
          <div className="space-y-4">
            {pendingRelatorios.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-blue-700 mb-2">
                  {pendingRelatorios.length} relatório(s) aguardando revisão
                </p>
                <div className="space-y-2">
                  {pendingRelatorios.map((r) => (
                    <div key={r.id} className="flex items-center justify-between">
                      <span className="text-xs text-blue-600">{r.aluno} — {r.titulo}</span>
                      <button onClick={() => setModal({ type: 'review', data: r })}
                        className="text-xs text-blue-700 font-medium hover:underline">
                        Revisar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-[#072524] font-semibold">Alunos</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {students.map((s) => {
                const sRel = allRelatorios.filter((r) => r.aluno === s.nome)
                const sFb = allFeedbacks.filter((f) => f.aluno === s.nome)
                return (
                  <button key={s.id}
                    onClick={() => { setSelectedStudent(s); setActiveView('student') }}
                    className="bg-white rounded-xl border border-[#072524]/10 px-5 py-4 text-left hover:border-[#4BAF92]/50 hover:shadow-sm transition-all flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#072524] text-sm">{s.nome}</p>
                      {s.projeto && <p className="text-xs text-[#072524]/50 mt-0.5">{s.projeto}</p>}
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs text-[#072524]/40">{sRel.length} relatório(s)</span>
                        <span className="text-xs text-[#072524]/40">{sFb.length} feedback(s)</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[#072524]/30" />
                  </button>
                )
              })}
              {students.length === 0 && (
                <p className="text-sm text-[#072524]/40 col-span-2 py-8 text-center">
                  Nenhum aluno cadastrado ainda.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Conteúdo geral */}
        {activeView === 'conteudo' && !selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[#072524] font-semibold">Conteúdo para todos os alunos</h2>
              <button onClick={() => setModal({ type: 'conteudo', data: null })}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4BAF92] text-white text-xs hover:bg-[#3d9a80] transition-colors">
                <Plus size={12} /> Adicionar no Notion
              </button>
            </div>
            <div className="space-y-2">
              {allConteudos.filter((c) => c.aluno === 'Todos').map((c) => (
                <div key={c.id}
                  className="bg-white rounded-xl border border-[#072524]/10 px-5 py-3 flex items-center justify-between">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                      c.tipo === 'experimento'
                        ? 'bg-[#692BBA]/10 text-[#692BBA]'
                        : 'bg-[#4BAF92]/10 text-[#4BAF92]'
                    }`}>{c.tipo}</span>
                    <span className="text-sm text-[#072524]">{c.titulo}</span>
                  </div>
                  <span className="text-xs text-[#072524]/40">{formatDate(c.created_at)}</span>
                </div>
              ))}
              {allConteudos.filter((c) => c.aluno === 'Todos').length === 0 && (
                <p className="text-sm text-[#072524]/40 py-8 text-center">Nenhum conteúdo geral ainda.</p>
              )}
            </div>
          </div>
        )}

        {/* Área do aluno selecionado */}
        {selectedStudent && studentData && (
          <div>
            <button onClick={() => { setSelectedStudent(null); setActiveView('overview') }}
              className="text-xs text-[#072524]/50 hover:text-[#072524] mb-4 flex items-center gap-1">
              ← Voltar
            </button>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[#072524] font-semibold text-lg">{selectedStudent.nome}</h2>
                {selectedStudent.projeto && (
                  <p className="text-sm text-[#072524]/50">{selectedStudent.projeto}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal({ type: 'conteudo', data: { alunoNome: selectedStudent.nome } })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#072524]/15 text-[#072524] text-xs hover:bg-white transition-colors">
                  <Plus size={12} /> Conteúdo
                </button>
                <button onClick={() => setModal({ type: 'feedback', data: selectedStudent.nome })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4BAF92] text-white text-xs hover:bg-[#3d9a80] transition-colors">
                  <MessageSquare size={12} /> Feedback
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Feedbacks */}
              <section>
                <h3 className="text-xs font-semibold text-[#072524]/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MessageSquare size={11} /> Feedbacks enviados
                </h3>
                <div className="space-y-2">
                  {studentData.feedbacks.length === 0 ? (
                    <p className="text-xs text-[#072524]/40 py-4 text-center">Nenhum feedback ainda.</p>
                  ) : (
                    studentData.feedbacks.map((f) => (
                      <div key={f.id} className="bg-white rounded-xl border border-[#4BAF92]/20 px-4 py-3">
                        <p className="text-sm text-[#072524] whitespace-pre-wrap leading-relaxed">{f.conteudo}</p>
                        <p className="text-xs text-[#072524]/40 mt-2">{formatDate(f.created_at)}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Relatórios */}
              <section>
                <h3 className="text-xs font-semibold text-[#072524]/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FileText size={11} /> Relatórios
                </h3>
                <div className="space-y-2">
                  {studentData.relatorios.length === 0 ? (
                    <p className="text-xs text-[#072524]/40 py-4 text-center">Nenhum relatório ainda.</p>
                  ) : (
                    studentData.relatorios.map((r) => (
                      <div key={r.id} className="bg-white rounded-xl border border-[#072524]/10 px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-[#072524]">{r.titulo}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_LABELS[r.status]?.color ?? ''}`}>
                              {STATUS_LABELS[r.status]?.label ?? r.status}
                            </span>
                            {r.status === 'enviado' && (
                              <button onClick={() => setModal({ type: 'review', data: r })}
                                className="text-xs text-[#692BBA] font-medium hover:underline">
                                Revisar
                              </button>
                            )}
                          </div>
                        </div>
                        {r.feedback_orientador && (
                          <div className="mt-2 pt-2 border-t border-[#072524]/8">
                            <p className="text-xs text-[#692BBA] font-medium mb-0.5">Seu feedback</p>
                            <p className="text-xs text-[#072524]/60 whitespace-pre-wrap">{r.feedback_orientador}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'feedback' && (
        <FeedbackModal
          alunoNome={modal.data}
          onClose={() => setModal(null)}
          onSuccess={() => window.location.reload()}
        />
      )}
      {modal?.type === 'conteudo' && (
        <ConteudoModal
          alunoNome={modal.data?.alunoNome ?? null}
          students={students}
          onClose={() => setModal(null)}
          onSuccess={() => window.location.reload()}
        />
      )}
      {modal?.type === 'review' && (
        <RelatorioReviewModal
          relatorio={modal.data}
          onClose={() => setModal(null)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  )
}
