import Link from 'next/link'
import { getAllEquipe } from '@/lib/content'

export const metadata = {
  title: 'Equipe | INTERFIBRAS',
  description: 'Conheça os membros do grupo de pesquisa INTERFIBRAS na Universidade de São Paulo.',
}

export default function EquipePage() {
  const membros = getAllEquipe()
  const coordenacao = membros.filter((m) => m.cargo === 'Coordenador' || m.ordem === 1)
  const restantes = membros.filter((m) => m.cargo !== 'Coordenador' && m.ordem !== 1)

  return (
    <div className="min-h-screen">

      {/* ── Cabeçalho ────────────────────────── */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(75,175,146,0.12) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 font-inter text-sm text-verde-jade/70
                                   hover:text-verde-jade transition-colors mb-8">
            ← Início
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }} aria-hidden="true" />
            <span className="font-inter text-xs font-semibold text-verde-jade uppercase tracking-widest">
              Equipe
            </span>
          </div>
          <h1 className="font-sora font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            As pessoas do INTERFIBRAS.
          </h1>
          <p className="font-inter text-white/55 max-w-xl leading-relaxed">
            Um grupo em formação, reunindo pesquisadores, estudantes e colaboradores em
            torno de materiais sustentáveis e biofabricação.
          </p>
        </div>
      </div>

      {/* ── Conteúdo ────────────────────────── */}
      <div className="bg-neutro py-14">
        <div className="container-page">

          {/* Coordenação */}
          <SectionLabel>Coordenação</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {coordenacao.map((membro) => (
              <MemberCard key={membro.slug} membro={membro} />
            ))}
          </div>

          {/* Outros membros */}
          {restantes.length > 0 && (
            <>
              <SectionLabel>Estudantes e Colaboradores</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {restantes.map((membro) => (
                  <MemberCard key={membro.slug} membro={membro} />
                ))}
              </div>
            </>
          )}

          {/* Placeholder */}
          <div
            className="bg-white rounded-2xl p-10 border-2 border-dashed text-center"
            style={{ borderColor: 'rgba(75,175,146,0.25)' }}
          >
            <p className="font-sora font-semibold text-verde-profundo/45 mb-2">
              Esta seção crescerá com o grupo
            </p>
            <p className="font-inter text-verde-profundo/35 text-sm mb-6 max-w-sm mx-auto">
              Estudantes, pesquisadores visitantes e laboratórios parceiros serão listados aqui.
            </p>
            <Link
              href="/oportunidades"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-sora font-semibold
                         text-sm rounded-xl transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #4BAF92, #2d8a72)' }}
            >
              Ver oportunidades →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span
        className="block w-6 h-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
        aria-hidden="true"
      />
      <h2 className="font-inter text-xs font-bold uppercase tracking-widest text-verde-profundo/40">
        {children}
      </h2>
    </div>
  )
}

function MemberCard({ membro }) {
  const hasLinks = membro.lattes || membro.orcid || membro.linkedin

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100
                    hover:border-verde-jade/30 hover:shadow-xl hover:shadow-verde-jade/6
                    transition-all duration-300 flex flex-col group relative">

      {/* Stretched link para notícia de entrada */}
      {membro.noticia && (
        <Link
          href={`/noticias/${membro.noticia}`}
          className="absolute inset-0 z-0"
          aria-label={`Ver notícia de entrada de ${membro.nome}`}
        />
      )}

      {/* Foto */}
      <div className="relative w-full overflow-hidden bg-gray-100 aspect-square">
        {membro.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={membro.foto}
            alt={membro.nome}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(75,175,146,0.08), rgba(105,43,186,0.05))' }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
              stroke="rgba(75,175,146,0.30)" strokeWidth="0.7" strokeLinecap="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-6 flex-1 relative z-10">
        <div>
          <h3 className="font-sora font-bold text-verde-profundo text-lg leading-snug mb-1">
            {membro.nome}
          </h3>
          <p className="font-inter text-sm font-semibold" style={{ color: '#2d8a72' }}>
            {membro.cargo}
          </p>
        </div>

        {membro.areas && (
          <div className="flex flex-wrap gap-1.5">
            {membro.areas.map((a) => (
              <span
                key={a}
                className="font-inter text-xs font-medium rounded-full px-2.5 py-1"
                style={{
                  color: '#1f6b56',
                  background: 'rgba(75,175,146,0.12)',
                  border: '1px solid rgba(75,175,146,0.32)',
                }}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {hasLinks && (
          <div className="flex gap-4 mt-auto pt-4" style={{ borderTop: '1px solid rgba(7,37,36,0.07)' }}>
            {membro.lattes && (
              <a href={membro.lattes} target="_blank" rel="noopener noreferrer"
                aria-label={`Currículo Lattes de ${membro.nome}`}
                className="font-inter text-xs font-semibold text-verde-jade hover:text-verde-profundo transition-colors relative z-20">
                Lattes ↗
              </a>
            )}
            {membro.orcid && (
              <a href={membro.orcid} target="_blank" rel="noopener noreferrer"
                aria-label={`ORCID de ${membro.nome}`}
                className="font-inter text-xs font-semibold text-verde-jade hover:text-verde-profundo transition-colors relative z-20">
                ORCID ↗
              </a>
            )}
            {membro.linkedin && (
              <a href={membro.linkedin} target="_blank" rel="noopener noreferrer"
                aria-label={`LinkedIn de ${membro.nome}`}
                className="font-inter text-xs font-semibold text-verde-jade hover:text-verde-profundo transition-colors relative z-20">
                LinkedIn ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
