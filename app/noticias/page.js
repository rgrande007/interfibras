import Link from 'next/link'
import { getAllPosts } from '@/lib/content'

export const metadata = {
  title: 'Notícias | INTERFIBRAS',
  description: 'Marcos científicos, publicações, eventos e registros do grupo INTERFIBRAS — Da natureza, para o futuro.',
}

const CATEGORIAS = [
  { label: 'Todos', valor: null },
  { label: 'Marco', valor: 'Marco' },
  { label: 'Grupo', valor: 'Grupo' },
  { label: 'Laboratório', valor: 'Laboratório' },
  { label: 'Publicação', valor: 'Publicação' },
  { label: 'Oportunidades', valor: 'Oportunidades' },
]

const categoriaMeta = {
  Marco:        { bg: 'rgba(221,160,31,0.10)',  border: 'rgba(221,160,31,0.30)',  text: '#9c6e12', accent: '#DDA01F' },
  Grupo:        { bg: 'rgba(75,175,146,0.10)',  border: 'rgba(75,175,146,0.28)',  text: '#2d8a72', accent: '#4BAF92' },
  Laboratório:  { bg: 'rgba(59,174,196,0.10)',  border: 'rgba(59,174,196,0.28)',  text: '#1e6e82', accent: '#3BAEC4' },
  Publicação:   { bg: 'rgba(75,175,146,0.12)',  border: 'rgba(75,175,146,0.30)',  text: '#2d8a72', accent: '#4BAF92' },
  Oportunidades:{ bg: 'rgba(105,43,186,0.10)',  border: 'rgba(105,43,186,0.28)',  text: '#692BBA', accent: '#8B52D4' },
}
const catDefault = { bg: 'rgba(75,175,146,0.10)', border: 'rgba(75,175,146,0.28)', text: '#2d8a72', accent: '#4BAF92' }


function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default async function NoticiasPage({ searchParams }) {
  const params = await searchParams
  const categoriaAtiva = params?.categoria || null

  const allPosts = getAllPosts()
  const filteredPosts = categoriaAtiva
    ? allPosts.filter(p => p.categoria === categoriaAtiva)
    : allPosts

return (
    <div className="min-h-screen" style={{ background: '#F1F2EF' }}>

      {/* ── Cabeçalho ──────────────────────────────────────────── */}
      <div
        className="pt-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', right: '-4%',
            width: '40vw', height: '40vw', maxWidth: '450px', maxHeight: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(75,175,146,0.13) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '-10%', left: '-3%',
            width: '30vw', height: '30vw', maxWidth: '350px', maxHeight: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)',
            filter: 'blur(45px)',
          }}
          aria-hidden="true"
        />

        <div className="container-narrow relative z-10 pb-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-sm transition-colors mb-8"
            style={{ color: 'rgba(75,175,146,0.70)' }}
          >
            ← Início
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="block w-6 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="font-inter text-xs font-semibold uppercase tracking-widest" style={{ color: '#4BAF92' }}>
              Notícias &amp; Marcos
            </span>
          </div>

          <h1
            className="font-sora font-bold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Acompanhe o INTERFIBRAS.
          </h1>
          <p className="font-inter text-sm mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.52)', lineHeight: '1.65' }}>
            Marcos científicos, publicações, eventos e registros de um grupo em formação.
          </p>

          {/* ── Filtros por categoria ─────────────────── */}
          <div className="flex flex-wrap gap-2 pb-10">
            {CATEGORIAS.map(cat => {
              const isActive = categoriaAtiva === cat.valor
              return (
                <Link
                  key={cat.label}
                  href={cat.valor ? `/noticias?categoria=${encodeURIComponent(cat.valor)}` : '/noticias'}
                  className="font-inter text-xs font-semibold rounded-full px-4 py-2 transition-all duration-200"
                  style={isActive ? {
                    background: '#4BAF92',
                    color: '#ffffff',
                    border: '1px solid #4BAF92',
                  } : {
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Linha gradiente de transição */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(75,175,146,0.25) 40%, rgba(105,43,186,0.18) 70%, transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* ── Conteúdo ───────────────────────────────────────────── */}
      <div className="container-narrow py-10">

        {/* ── Grade de posts ─────────────────────────── */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {filteredPosts.map((post) => {
              const cat = categoriaMeta[post.categoria] || catDefault
              return (
                <Link
                  key={post.slug}
                  href={`/noticias/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300
                             hover:shadow-xl hover:-translate-y-1"
                  style={{ border: '1px solid rgba(7,37,36,0.07)', boxShadow: '0 2px 12px rgba(7,37,36,0.05)' }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative overflow-hidden flex items-center justify-center"
                    style={{ height: '136px', background: cat.bg, borderBottom: `1px solid ${cat.border}` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(${cat.accent}22 1.5px, transparent 1.5px)`,
                        backgroundSize: '18px 18px',
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <CategoryIcon categoria={post.categoria} accent={cat.accent} />
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {post.categoria && (
                        <span
                          className="font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                          style={{ color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}
                        >
                          {post.categoria}
                        </span>
                      )}
                      {post.data && (
                        <span className="font-inter text-[10px]" style={{ color: 'rgba(7,37,36,0.38)' }}>
                          {formatDate(post.data)}
                        </span>
                      )}
                    </div>

                    <h2
                      className="font-sora font-bold text-verde-profundo text-base leading-snug mb-2
                                 group-hover:text-verde-jade transition-colors duration-200"
                    >
                      {post.titulo}
                    </h2>

                    {post.resumo && (
                      <p className="font-inter text-verde-profundo/52 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                        {post.resumo}
                      </p>
                    )}

                    <span
                      className="font-inter text-xs font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                      style={{ color: '#2d8a72' }}
                    >
                      Ler mais →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : categoriaAtiva ? (
          <div
            className="bg-white rounded-2xl p-12 text-center mb-12"
            style={{ border: '1px solid rgba(7,37,36,0.06)' }}
          >
            <p className="font-sora font-semibold mb-3" style={{ color: 'rgba(7,37,36,0.40)' }}>
              Nenhuma publicação nessa categoria ainda.
            </p>
            <Link
              href="/noticias"
              className="font-inter text-sm font-semibold transition-colors"
              style={{ color: '#2d8a72' }}
            >
              Ver todos os registros →
            </Link>
          </div>
        ) : (
          <div
            className="bg-white rounded-2xl p-12 text-center mb-12"
            style={{ border: '1px solid rgba(7,37,36,0.06)' }}
          >
            <p className="font-sora font-semibold" style={{ color: 'rgba(7,37,36,0.40)' }}>
              Novas publicações serão registradas aqui em breve.
            </p>
          </div>
        )}

        {/* ── CTA Oportunidades ──────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #072524 0%, #0c3330 60%, #0f2a4a 100%)',
            border: '1px solid rgba(75,175,146,0.20)',
          }}
        >
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="font-inter text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4BAF92' }}>
                Vagas abertas
              </p>
              <h3 className="font-sora font-bold text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
                Faça parte do INTERFIBRAS.
              </h3>
              <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.52)', lineHeight: '1.65' }}>
                Bolsas FAPESP para Iniciação Científica e Mestrado. Seja um dos primeiros pesquisadores do grupo.
              </p>
            </div>
            <Link
              href="/oportunidades"
              className="shrink-0 inline-flex items-center gap-2 font-sora font-bold text-white rounded-full px-6 py-3
                         transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #4BAF92, #2d8a72)',
                boxShadow: '0 6px 24px rgba(75,175,146,0.35)',
                fontSize: '0.9rem',
              }}
            >
              Ver vagas abertas →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

function CategoryIcon({ categoria, accent }) {
  const stroke = accent || '#4BAF92'
  if (categoria === 'Marco') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  if (categoria === 'Publicação') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  }
  if (categoria === 'Grupo') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (categoria === 'Oportunidades') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M10 2v7.31" />
      <path d="M14 9.3V1.99" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    </svg>
  )
}
