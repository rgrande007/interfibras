import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getDestaqueEquipe } from '@/lib/content'
import { notFound } from 'next/navigation'
import { formatDateLong as formatDate } from '@/lib/utils'
import { categoriaMetaDark as categoriaMeta, categoriaMetaDarkDefault as catDefault } from '@/lib/categorias'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Não encontrado | INTERFIBRAS' }
  return {
    title: `${post.titulo} | INTERFIBRAS`,
    description: post.resumo || post.titulo,
    openGraph: { images: post.imagem ? [{ url: post.imagem }] : [] },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const cat = categoriaMeta[post.categoria] || catDefault
  const equipe = getDestaqueEquipe()
  const coordenador = equipe.find(m => m.ordem === 1) || null

  return (
    <div className="min-h-screen" style={{ background: '#F1F2EF' }}>

      {/* ── Hero do artigo ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-28 pb-20"
        style={{ background: 'linear-gradient(150deg, #072524 0%, #0c3330 55%, #0f2a4a 100%)' }}
      >
        {/* Orbs */}
        <div className="absolute pointer-events-none animate-orb-drift-1"
          style={{ top: '-15%', right: '-5%', width: '45vw', height: '45vw', maxWidth: '500px', maxHeight: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.15) 0%, transparent 65%)', filter: 'blur(55px)' }}
          aria-hidden="true" />
        <div className="absolute pointer-events-none animate-orb-drift-2"
          style={{ bottom: '-10%', left: '-5%', width: '35vw', height: '35vw', maxWidth: '400px', maxHeight: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,43,186,0.12) 0%, transparent 65%)', filter: 'blur(50px)' }}
          aria-hidden="true" />

        <div className="container-page relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-inter mb-8" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-verde-jade" style={{ color: 'rgba(255,255,255,0.32)' }}>Início</Link>
            <span style={{ color: 'rgba(255,255,255,0.18)' }}>/</span>
            <Link href="/noticias" className="transition-colors hover:text-verde-jade" style={{ color: 'rgba(255,255,255,0.32)' }}>Notícias</Link>
            <span style={{ color: 'rgba(255,255,255,0.18)' }}>/</span>
            <span className="line-clamp-1" style={{ color: 'rgba(138,191,178,0.80)', maxWidth: '320px' }}>
              {post.titulo}
            </span>
          </nav>

          {/* Meta: categoria + data */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.categoria && (
              <span
                className="font-inter text-xs font-semibold rounded-full px-3.5 py-1"
                style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}
              >
                {post.categoria}
              </span>
            )}
            {post.data && (
              <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {formatDate(post.data)}
              </span>
            )}
          </div>

          {/* Headline */}
          <h1
            className="font-sora font-bold text-white leading-tight mb-6"
            style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 2.8rem)',
              maxWidth: '52rem',
              letterSpacing: '-0.018em',
              lineHeight: 1.1,
            }}
          >
            {post.titulo}
          </h1>

          {/* Resumo */}
          {post.resumo && (
            <p className="font-inter leading-relaxed" style={{ fontSize: '1.05rem', maxWidth: '44rem', color: 'rgba(255,255,255,0.58)' }}>
              {post.resumo}
            </p>
          )}
        </div>
      </div>

      {/* ── Feature image — apenas para fotos reais, não para SVG/OG cards ── */}
      {post.imagem && !post.imagem.endsWith('.svg') && (
        <div className="container-page">
          <div
            className="relative overflow-hidden shadow-2xl shadow-black/20"
            style={{
              aspectRatio: '21/9',
              maxHeight: '400px',
              borderRadius: '0 0 1.5rem 1.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: 'none',
            }}
          >
            <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover" />
            <div
              className="absolute inset-x-0 top-0 h-8"
              style={{ background: 'linear-gradient(to bottom, #0c3330, transparent)' }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* ── Layout principal ────────────────────────────────────── */}
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Artigo principal ─────────────────────── */}
          <main className="lg:col-span-8">
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(7,37,36,0.07)', boxShadow: '0 2px 20px rgba(7,37,36,0.06)' }}
            >
              {/* Linha de cor topo */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, #692BBA)` }} aria-hidden="true" />

              {/* Prose content */}
              <div className="p-8 lg:p-12">
                <div
                  className="prose prose-lg max-w-none
                             prose-headings:font-sora prose-headings:text-verde-profundo prose-headings:font-bold prose-headings:tracking-tight
                             prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3
                             prose-a:text-verde-jade prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                             prose-strong:text-verde-profundo
                             prose-p:text-verde-profundo/68 prose-p:leading-relaxed prose-p:mb-4
                             prose-ul:space-y-1.5 prose-li:text-verde-profundo/68
                             prose-blockquote:border-verde-jade prose-blockquote:bg-verde-jade/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                             prose-code:text-violeta prose-code:bg-violeta/8 prose-code:px-1.5 prose-code:rounded"
                  style={{ '--tw-prose-h2-border-color': cat.color }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Footer */}
              <div
                className="px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ borderTop: '1px solid rgba(7,37,36,0.07)', background: 'rgba(7,37,36,0.015)' }}
              >
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-colors"
                  style={{ color: '#2d8a72' }}
                >
                  ← Ver todas as notícias
                </Link>
                <Link
                  href="/oportunidades"
                  className="inline-flex items-center gap-2 font-inter text-sm font-bold rounded-full px-5 py-2.5 transition-all hover:opacity-85 hover:scale-[1.02]"
                  style={{
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #4BAF92, #2d8a72)',
                    boxShadow: '0 4px 16px rgba(75,175,146,0.32)',
                  }}
                >
                  Ver vagas abertas →
                </Link>
              </div>
            </div>
          </main>

          {/* ── Sidebar ───────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

            {/* Card: coordenador */}
            {coordenador && (
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(7,37,36,0.07)', boxShadow: '0 2px 16px rgba(7,37,36,0.05)' }}
              >
                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }} aria-hidden="true" />
                <div className="p-6">
                  <p className="label-sm mb-4" style={{ color: 'rgba(7,37,36,0.40)' }}>Coordenador do grupo</p>
                  <div className="flex items-center gap-4 mb-5">
                    {coordenador.foto && (
                      <img
                        src={coordenador.foto}
                        alt={coordenador.nome}
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                        style={{ objectPosition: 'center top', border: '2px solid rgba(75,175,146,0.28)' }}
                      />
                    )}
                    <div>
                      <p className="font-sora font-bold text-verde-profundo text-sm leading-snug">
                        {coordenador.nome}
                      </p>
                      <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(7,37,36,0.45)' }}>
                        {coordenador.cargo}
                      </p>
                    </div>
                  </div>
                  {coordenador.areas && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {coordenador.areas.slice(0, 3).map((a, i) => (
                        <span
                          key={a}
                          className="font-inter text-[10px] font-medium rounded-full px-2.5 py-0.5"
                          style={{
                            background: i === 0 ? 'rgba(75,175,146,0.10)' : i === 1 ? 'rgba(105,43,186,0.08)' : 'rgba(221,160,31,0.10)',
                            border: i === 0 ? '1px solid rgba(75,175,146,0.28)' : i === 1 ? '1px solid rgba(105,43,186,0.25)' : '1px solid rgba(221,160,31,0.28)',
                            color: i === 0 ? '#1f6b56' : i === 1 ? '#692BBA' : '#9c6e12',
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href="/#sobre"
                    className="font-inter text-xs font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ color: '#4BAF92' }}
                  >
                    Ver perfil completo →
                  </Link>
                </div>
              </div>
            )}

            {/* Card: sobre o grupo */}
            <div
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #072524 0%, #0c3330 70%, #0f2a4a 100%)',
                border: '1px solid rgba(75,175,146,0.15)',
              }}
            >
              <div
                className="absolute top-0 right-0 pointer-events-none animate-orb-drift-1"
                style={{ width: '60%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.18) 0%, transparent 65%)', filter: 'blur(25px)', transform: 'translate(30%, -30%)' }}
                aria-hidden="true"
              />
              <p className="label-sm mb-3 relative z-10" style={{ color: 'rgba(138,191,178,0.65)' }}>O grupo INTERFIBRAS</p>
              <p className="font-sora font-bold text-white text-sm leading-snug mb-3 relative z-10">
                Da biomassa à biofabricação: materiais renováveis de base biológica
              </p>
              <p className="font-inter text-xs leading-relaxed mb-5 relative z-10" style={{ color: 'rgba(255,255,255,0.70)' }}>
                Desenvolvemos filmes, fibras e membranas a partir de nanoblocos naturais
                usando interfaces, auto-organização e biofabricação.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                {['Nanocelulose', 'Nanoquitosana', 'Biofabricação'].map((t, i) => (
                  <span key={t} className="font-inter text-[10px] font-medium rounded-full px-2.5 py-0.5"
                    style={{
                      background: i === 0 ? 'rgba(75,175,146,0.14)' : i === 1 ? 'rgba(105,43,186,0.14)' : 'rgba(221,160,31,0.12)',
                      border: i === 0 ? '1px solid rgba(75,175,146,0.32)' : i === 1 ? '1px solid rgba(105,43,186,0.32)' : '1px solid rgba(221,160,31,0.28)',
                      color: i === 0 ? '#8ABFB2' : i === 1 ? '#b785f5' : '#DDA01F',
                    }}
                  >{t}</span>
                ))}
              </div>
              <Link href="/#pesquisa"
                className="font-inter text-xs font-semibold transition-opacity hover:opacity-70 relative z-10"
                style={{ color: '#4BAF92' }}
              >
                Conhecer a pesquisa →
              </Link>
            </div>

            {/* Card: vagas */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(75,175,146,0.06)', border: '1px solid rgba(75,175,146,0.20)' }}
            >
              <p className="label-sm mb-3" style={{ color: 'rgba(7,37,36,0.55)' }}>Vagas abertas</p>
              <p className="font-sora font-bold text-verde-profundo text-sm mb-1">IC e Mestrado 2026</p>
              <p className="font-inter text-xs text-verde-profundo/55 leading-relaxed mb-4">
                Bolsas FAPESP disponíveis. Envie CV (preferencialmente Lattes) e histórico escolar.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(75,175,146,0.12)', border: '1px solid rgba(75,175,146,0.28)', color: '#1f6b56' }}>
                  Bolsa FAPESP IC
                </span>
                <span className="font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(105,43,186,0.08)', border: '1px solid rgba(105,43,186,0.22)', color: '#692BBA' }}>
                  Bolsa FAPESP Mestrado
                </span>
              </div>
              <Link
                href="/oportunidades"
                className="inline-flex items-center gap-1.5 font-inter text-xs font-bold rounded-full px-4 py-2 transition-all hover:opacity-85"
                style={{ color: 'white', background: 'linear-gradient(135deg, #4BAF92, #2d8a72)', boxShadow: '0 3px 14px rgba(75,175,146,0.30)' }}
              >
                Ver vagas →
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
