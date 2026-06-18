import Link from 'next/link'
import { getAllOportunidades, toHtml } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Oportunidades | INTERFIBRAS',
  description: 'Vagas para iniciação científica, mestrado, doutorado e colaborações no grupo INTERFIBRAS.',
}

const nivelCor = {
  IC:        { text: '#2d8a72', bg: 'rgba(75,175,146,0.10)',  border: 'rgba(75,175,146,0.30)' },
  Mestrado:  { text: '#692BBA', bg: 'rgba(105,43,186,0.08)',  border: 'rgba(105,43,186,0.28)' },
  Doutorado: { text: '#692BBA', bg: 'rgba(105,43,186,0.12)',  border: 'rgba(105,43,186,0.35)' },
  'Pós-doc': { text: '#9c6e12', bg: 'rgba(221,160,31,0.10)',  border: 'rgba(221,160,31,0.30)' },
  Visita:    { text: '#2d7a6c', bg: 'rgba(138,191,178,0.14)', border: 'rgba(138,191,178,0.38)' },
}
const nivelDefault = nivelCor.IC

async function parseOportunidade(op) {
  if (!op._body) return { ...op, content: '' }
  return { ...op, content: await toHtml(op._body) }
}

export default async function OportunidadesPage() {
  const raw = getAllOportunidades()
  const oportunidades = await Promise.all(raw.map(parseOportunidade))
  const abertas = oportunidades.filter((o) => o.status === 'aberto')
  const encerradas = oportunidades.filter((o) => o.status !== 'aberto')

  return (
    <div className="min-h-screen">

      {/* ── Cabeçalho ─────────────────────────── */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3d1485 0%, #692BBA 45%, #2a7a5f 85%, #4BAF92 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(75,175,146,0.18) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container-narrow relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 font-inter text-sm
                                   text-white/55 hover:text-white transition-colors mb-8">
            ← Início
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-0.5 rounded-full bg-white/40" aria-hidden="true" />
            <span className="font-inter text-xs font-semibold text-white/60 uppercase tracking-widest">
              Oportunidades
            </span>
          </div>
          <h1 className="font-sora font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Faça parte do grupo.
          </h1>
          <p className="font-inter text-white/60 max-w-xl leading-relaxed">
            Buscamos pessoas curiosas, cuidadosas no laboratório e interessadas em
            transformar materiais naturais em soluções para o futuro.
          </p>
        </div>
      </div>

      {/* ── Vagas abertas ────────────────────── */}
      <div className="bg-neutro py-14">
        <div className="container-narrow">
          {abertas.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-verde-jade" aria-hidden="true" />
                <span className="font-inter text-xs font-bold uppercase tracking-widest text-verde-profundo/50">
                  Vagas abertas
                </span>
              </div>
              <div className="space-y-6 mb-14">
                {abertas.map((op) => (
                  <OportunidadeCard key={op.slug} op={op} />
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div
            className="rounded-2xl p-8 sm:p-10 mb-14 text-white overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(75,175,146,0.18) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 text-center">
              <h2 className="font-sora font-bold text-xl sm:text-2xl mb-3">
                Não encontrou o que procura?
              </h2>
              <p className="font-inter text-white/60 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Entre em contato com a coordenação para discutir possibilidades
                de colaboração, visitas científicas ou outros formatos.
              </p>
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white font-sora font-semibold
                           text-sm rounded-xl transition-all hover:bg-verde-jade hover:text-white"
                style={{ color: '#072524' }}
              >
                Entrar em contato →
              </Link>
            </div>
          </div>

          {/* Vagas encerradas */}
          {encerradas.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-verde-profundo/30" aria-hidden="true" />
                <span className="font-inter text-xs font-bold uppercase tracking-widest text-verde-profundo/35">
                  Vagas encerradas
                </span>
              </div>
              <div className="space-y-4 opacity-55">
                {encerradas.map((op) => (
                  <OportunidadeCard key={op.slug} op={op} encerrada />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function OportunidadeCard({ op, encerrada }) {
  const cor = nivelCor[op.nivel] || nivelDefault
  return (
    <div
      className={`bg-white rounded-2xl p-7 transition-all duration-300 relative
                  ${encerrada
                    ? 'border border-gray-100'
                    : 'border border-gray-100 hover:border-verde-jade/25 hover:shadow-xl hover:shadow-verde-jade/5'
                  }`}
    >
      {!encerrada && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ background: 'linear-gradient(to bottom, #4BAF92, #2d8a72)' }}
          aria-hidden="true"
        />
      )}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        {op.nivel && (
          <span
            className="font-inter text-xs font-semibold rounded-full px-3 py-0.5"
            style={{ color: cor.text, background: cor.bg, border: `1px solid ${cor.border}` }}
          >
            {op.nivel}
          </span>
        )}
        <span
          className="flex items-center gap-1.5 font-inter text-xs font-medium"
          style={{ color: op.status === 'aberto' ? '#2d8a72' : 'rgba(7,37,36,0.35)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: op.status === 'aberto' ? '#4BAF92' : 'rgba(7,37,36,0.25)' }}
          />
          {op.status === 'aberto' ? 'Aberta' : 'Encerrada'}
        </span>
        {op.bolsa && op.status === 'aberto' && (
          <span
            className="font-inter text-xs font-medium rounded-full px-2.5 py-0.5"
            style={{ color: '#9c6e12', background: 'rgba(221,160,31,0.10)', border: '1px solid rgba(221,160,31,0.30)' }}
          >
            Bolsa disponível
          </span>
        )}
      </div>

      <h3 className="font-sora font-bold text-verde-profundo text-xl leading-snug mb-3">
        {op.titulo}
      </h3>

      {op.resumo && (
        <p className="font-inter text-verde-profundo/55 leading-relaxed mb-4 text-sm">{op.resumo}</p>
      )}

      {op.content && (
        <div
          className="prose prose-sm max-w-none mt-4 pt-4
                     prose-headings:font-sora prose-headings:text-verde-profundo
                     prose-a:text-verde-jade prose-strong:text-verde-profundo
                     prose-p:text-verde-profundo/60"
          style={{ borderTop: '1px solid rgba(7,37,36,0.07)' }}
          dangerouslySetInnerHTML={{ __html: op.content }}
        />
      )}

      {op.prazo && op.status === 'aberto' && (
        <p className="font-inter text-verde-profundo/35 text-xs mt-5">
          Prazo: {formatDate(op.prazo)}
        </p>
      )}
    </div>
  )
}
