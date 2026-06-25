import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { formatDateLong as formatDate } from '@/lib/utils'
import { categoriaMeta, categoriaMetaDefault as catDefault } from '@/lib/categorias'

export const metadata = {
  title: 'Notícias | INTERFIBRAS',
  description: 'Marcos científicos, publicações, eventos e registros do grupo INTERFIBRAS. Da natureza, para o futuro.',
}

const CATEGORIAS = [
  { label: 'Todos', valor: null },
  { label: 'Marco', valor: 'Marco' },
  { label: 'Grupo', valor: 'Grupo' },
  { label: 'Laboratório', valor: 'Laboratório' },
  { label: 'Publicação', valor: 'Publicação' },
  { label: 'Oportunidades', valor: 'Oportunidades' },
]

function parseDateParts(str) {
  if (!str) return { day: '—', mes: '', ano: '' }
  const d = new Date(`${str}T00:00:00`)
  return {
    day: d.toLocaleDateString('pt-BR', { day: '2-digit' }),
    mes: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase(),
    ano: d.getFullYear().toString(),
  }
}

export default async function NoticiasPage({ searchParams }) {
  const params = await searchParams
  const categoriaAtiva = params?.categoria || null

  const allPosts = getAllPosts()
  const filteredPosts = categoriaAtiva
    ? allPosts.filter(p => p.categoria === categoriaAtiva)
    : allPosts

  const featured = !categoriaAtiva && filteredPosts.length > 0 ? filteredPosts[0] : null
  const gridPosts = featured ? filteredPosts.slice(1) : filteredPosts

  return (
    <div className="min-h-screen" style={{ background: '#F1F2EF' }}>

      {/* ── Cabeçalho ──────────────────────────────────────────── */}
      <div
        className="pt-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
      >
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ top: '-20%', right: '-4%', width: '40vw', height: '40vw', maxWidth: '450px', maxHeight: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.13) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ bottom: '-10%', left: '-3%', width: '30vw', height: '30vw', maxWidth: '350px', maxHeight: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)', filter: 'blur(45px)' }} />

        <div className="container-narrow relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 font-inter text-sm transition-colors mb-8" style={{ color: 'rgba(75,175,146,0.70)' }}>
            ← Início
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }} aria-hidden="true" />
            <span className="font-inter text-xs font-semibold uppercase tracking-widest" style={{ color: '#4BAF92' }}>
              Notícias &amp; Marcos
            </span>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-sora font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Acompanhe o INTERFIBRAS.
              </h1>
              <p className="font-inter text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.52)', lineHeight: '1.65' }}>
                Marcos científicos, publicações, eventos e registros do INTERFIBRAS.
              </p>
            </div>
            {allPosts.length > 0 && (
              <div className="shrink-0 text-right">
                <span className="font-sora font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'rgba(75,175,146,0.20)', lineHeight: 1 }}>
                  {String(allPosts.length).padStart(2, '0')}
                </span>
                <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.25)', marginTop: '-4px' }}>
                  {allPosts.length === 1 ? 'registro' : 'registros'}
                </p>
              </div>
            )}
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mt-8 pb-10">
            {CATEGORIAS.map(cat => {
              const isActive = categoriaAtiva === cat.valor
              return (
                <Link
                  key={cat.label}
                  href={cat.valor ? `/noticias?categoria=${encodeURIComponent(cat.valor)}` : '/noticias'}
                  className="font-inter text-xs font-semibold rounded-full px-4 py-2 transition-all duration-200"
                  style={isActive
                    ? { background: '#4BAF92', color: '#ffffff', border: '1px solid #4BAF92' }
                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(75,175,146,0.25) 40%, rgba(105,43,186,0.18) 70%, transparent)' }} aria-hidden="true" />
      </div>

      {/* ── Conteúdo ───────────────────────────────────────────── */}
      <div className="container-narrow py-10">

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center mb-12" style={{ border: '1px solid rgba(7,37,36,0.06)' }}>
            {categoriaAtiva ? (
              <>
                <p className="font-sora font-semibold mb-3" style={{ color: 'rgba(7,37,36,0.40)' }}>
                  Nenhuma publicação nessa categoria ainda.
                </p>
                <Link href="/noticias" className="font-inter text-sm font-semibold" style={{ color: '#2d8a72' }}>
                  Ver todos os registros →
                </Link>
              </>
            ) : (
              <p className="font-sora font-semibold" style={{ color: 'rgba(7,37,36,0.40)' }}>
                Novas publicações serão registradas aqui em breve.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Post em destaque */}
            {featured && <FeaturedPost post={featured} />}

            {/* Grade de posts restantes */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {gridPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── CTA ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 60%, #0f2a4a 100%)', border: '1px solid rgba(75,175,146,0.20)' }}
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
              className="shrink-0 inline-flex items-center gap-2 font-sora font-bold text-white rounded-full px-6 py-3 transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #4BAF92, #2d8a72)', boxShadow: '0 6px 24px rgba(75,175,146,0.35)', fontSize: '0.9rem' }}
            >
              Ver vagas abertas →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Featured post ────────────────────────────────────── */
function FeaturedPost({ post }) {
  const cat = categoriaMeta[post.categoria] || catDefault
  const hasPhoto = !!post.imagem

  return (
    <Link
      href={`/noticias/${post.slug}`}
      aria-label={`Ler artigo em destaque: ${post.titulo}`}
      className="group block mb-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'white',
        border: '1px solid rgba(7,37,36,0.07)',
        boxShadow: '0 2px 20px rgba(7,37,36,0.06)',
      }}
    >
      <div className={hasPhoto ? 'flex flex-col sm:flex-row' : ''}>

        {/* Imagem */}
        {hasPhoto && (
          <div
            className="relative shrink-0 overflow-hidden sm:w-[42%]"
            style={{ minHeight: '220px', background: cat.bg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imagem}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(7,37,36,0), rgba(7,37,36,0.08))' }} aria-hidden="true" />
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 p-7 lg:p-9 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="font-inter text-[10px] font-black uppercase tracking-widest rounded-full px-2.5 py-0.5"
              style={{ color: '#7a5300', background: 'rgba(221,160,31,0.14)', border: '1px solid rgba(221,160,31,0.30)' }}
            >
              Destaque
            </span>
            {post.categoria && (
              <span
                className="font-inter text-xs font-semibold rounded-full px-2.5 py-0.5"
                style={{ color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}
              >
                {post.categoria}
              </span>
            )}
            {post.data && (
              <span className="font-inter text-xs" style={{ color: 'rgba(7,37,36,0.42)' }}>
                {formatDate(post.data)}
              </span>
            )}
          </div>

          <h2
            className="font-sora font-bold text-verde-profundo leading-tight mb-3 group-hover:text-verde-jade transition-colors duration-200"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)' }}
          >
            {post.titulo}
          </h2>

          {post.resumo && (
            <p className="font-inter text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(7,37,36,0.57)' }}>
              {post.resumo}
            </p>
          )}

          <span
            className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold group-hover:gap-3 transition-all duration-200 mt-auto"
            style={{ color: cat.text || '#2d8a72' }}
          >
            Ler artigo completo →
          </span>
        </div>
      </div>

      {/* Barra inferior categorial */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent 70%)` }}
        aria-hidden="true"
      />
    </Link>
  )
}

/* ── Post card ────────────────────────────────────────── */
function PostCard({ post }) {
  const cat = categoriaMeta[post.categoria] || catDefault
  const { day, mes, ano } = parseDateParts(post.data)

  return (
    <Link
      href={`/noticias/${post.slug}`}
      aria-label={`Ler: ${post.titulo}`}
      className="group block rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid rgba(7,37,36,0.07)',
        borderLeft: `3px solid ${cat.accent}`,
        boxShadow: '0 1px 8px rgba(7,37,36,0.04)',
      }}
    >
      <div className="p-6">
        {/* Linha: data + categoria */}
        <div className="flex items-start gap-4 mb-4">
          {/* Data como elemento tipográfico */}
          <time dateTime={post.data || undefined} className="shrink-0 text-center" style={{ minWidth: '40px' }}>
            <div className="font-sora font-black leading-none" style={{ fontSize: '2rem', color: cat.accent }}>
              {day}
            </div>
            <div className="font-inter font-bold uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.10em', color: 'rgba(7,37,36,0.40)', marginTop: '2px' }}>
              {mes}
            </div>
            <div className="font-inter" style={{ fontSize: '0.58rem', color: 'rgba(7,37,36,0.28)', marginTop: '1px' }}>
              {ano}
            </div>
          </time>

          {/* Título + categoria */}
          <div className="flex-1 min-w-0">
            {post.categoria && (
              <span
                className="inline-block font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5 mb-2"
                style={{ color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}
              >
                {post.categoria}
              </span>
            )}
            <h2
              className="font-sora font-bold text-verde-profundo leading-snug group-hover:text-verde-jade transition-colors duration-200"
              style={{ fontSize: '0.93rem' }}
            >
              {post.titulo}
            </h2>
          </div>
        </div>

        {/* Separador */}
        <div
          className="h-px mb-4"
          style={{ background: `linear-gradient(90deg, ${cat.accent}35, transparent)` }}
          aria-hidden="true"
        />

        {/* Resumo */}
        {post.resumo && (
          <p className="font-inter text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: 'rgba(7,37,36,0.52)' }}>
            {post.resumo}
          </p>
        )}

        <span
          className="font-inter text-xs font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
          style={{ color: cat.text || '#2d8a72' }}
        >
          Ler mais →
        </span>
      </div>
    </Link>
  )
}
