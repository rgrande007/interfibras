import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getAllEquipe } from '@/lib/content'
import { notFound } from 'next/navigation'
import { formatDateLong as formatDate } from '@/lib/utils'
import { categoriaMetaDark as categoriaMeta, categoriaMetaDarkDefault as catDefault } from '@/lib/categorias'
import ReadingProgress from '@/components/ui/ReadingProgress'

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
    openGraph: {
      title: post.titulo,
      description: post.resumo || post.titulo,
      type: 'article',
      publishedTime: post.data ? new Date(post.data).toISOString() : undefined,
      authors: ['Dr. Rafael Grande'],
      images: post.imagem ? [{ url: post.imagem, width: 1080, height: 1080, alt: post.titulo }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titulo,
      description: post.resumo || post.titulo,
    },
  }
}

function calcReadingTime(html) {
  if (!html) return 1
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return Math.max(1, Math.round(text.split(' ').length / 200))
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const cat = categoriaMeta[post.categoria] || catDefault
  const equipe = getAllEquipe()
  const coordenador = equipe.find(m => m.nivel === 'Coordenador') || null
  const readingTime = calcReadingTime(post.content)
  const photoSrc = post.foto || (post.imagem && !post.imagem.endsWith('.svg') ? post.imagem : null)
  const hasPhoto = !!photoSrc

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: post.titulo,
    ...(post.resumo && { description: post.resumo }),
    ...(post.data && { datePublished: new Date(post.data).toISOString() }),
    inLanguage: 'pt-BR',
    url: `https://interfibras.vercel.app/noticias/${slug}`,
    ...(post.imagem && { image: `https://interfibras.vercel.app${post.imagem}` }),
    author: {
      '@type': 'Person',
      '@id': 'https://interfibras.vercel.app/equipe#rafael-grande',
      name: 'Rafael Grande',
      sameAs: 'https://orcid.org/0000-0001-7817-3698',
    },
    publisher: {
      '@type': 'ResearchOrganization',
      '@id': 'https://interfibras.vercel.app/#organization',
      name: 'INTERFIBRAS',
      url: 'https://interfibras.vercel.app',
    },
    isPartOf: {
      '@type': 'Periodical',
      name: 'INTERFIBRAS — Notícias',
      url: 'https://interfibras.vercel.app/noticias',
    },
  }

  return (
    <div className="min-h-screen" style={{ background: '#F1F2EF' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReadingProgress color={cat.color} />

      {/* ── Hero — dark, sem foto de fundo ─────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #072524 0%, #0c3330 55%, #0f2a4a 100%)' }}
      >
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ top: '-15%', right: '-5%', width: '45vw', height: '45vw', maxWidth: '500px', maxHeight: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.15) 0%, transparent 65%)', filter: 'blur(55px)', willChange: 'transform' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ bottom: '-10%', left: '-5%', width: '35vw', height: '35vw', maxWidth: '400px', maxHeight: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,43,186,0.12) 0%, transparent 65%)', filter: 'blur(50px)', willChange: 'transform' }} />

        <div className="container-page relative z-10 pt-28 pb-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-inter mb-8" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-verde-jade" style={{ color: 'rgba(255,255,255,0.65)' }}>Início</Link>
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.30)' }}>/</span>
            <Link href="/noticias" className="transition-colors hover:text-verde-jade" style={{ color: 'rgba(255,255,255,0.65)' }}>Notícias</Link>
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.30)' }}>/</span>
            <span className="line-clamp-1" aria-current="page" style={{ color: 'rgba(138,191,178,0.90)', maxWidth: '280px' }}>
              {post.titulo}
            </span>
          </nav>

          <div style={{ maxWidth: '48rem' }}>
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              {post.categoria && (
                <span className="font-inter text-xs font-semibold rounded-full px-3.5 py-1"
                  style={{ color: cat.color, background: cat.bg, border: `1px solid ${cat.border}` }}>
                  {post.categoria}
                </span>
              )}
              {post.data && (
                <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>
                  {formatDate(post.data)}
                </span>
              )}
              <span className="font-inter text-xs rounded-full px-3 py-0.5"
                style={{ color: 'rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {readingTime} min de leitura
              </span>
            </div>

            {/* Título */}
            <h1 className="font-sora font-bold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.85rem, 3.8vw, 3rem)', letterSpacing: '-0.022em', lineHeight: 1.12, textRendering: 'optimizeLegibility' }}>
              {post.titulo}
            </h1>

            {/* Resumo */}
            {post.resumo && (
              <p className="font-inter leading-relaxed mb-7"
                style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.62)', maxWidth: '40rem' }}>
                {post.resumo}
              </p>
            )}

          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(75,175,146,0.22) 35%, rgba(105,43,186,0.16) 70%, transparent)' }}
          aria-hidden="true" />
      </div>

      {/* ── Corpo do artigo + Sidebar ───────────────────────────── */}
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Artigo ─────────────────────────────────────────── */}
          <main className="lg:col-span-8">
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(7,37,36,0.07)', boxShadow: '0 2px 20px rgba(7,37,36,0.06)' }}>
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, #692BBA)` }} aria-hidden="true" />

              {/* ── Intro editorial com foto emoldurada ──────────────── */}
              {hasPhoto && (
                <div className="flex flex-col sm:flex-row"
                  style={{ borderBottom: '1px solid rgba(7,37,36,0.07)' }}>

                  {/* ── Painel esquerdo: palco da foto ─────────────── */}
                  <div
                    className="sm:w-56 lg:w-64 shrink-0 relative flex items-center justify-center p-5 lg:p-6"
                    style={{
                      background: 'linear-gradient(160deg, rgba(7,37,36,0.038) 0%, rgba(75,175,146,0.04) 100%)',
                      borderRight: '1px solid rgba(7,37,36,0.06)',
                    }}
                  >
                    {/* Dot texture de fundo */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(7,37,36,0.055) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                        opacity: 0.7,
                      }} />

                    {/* Cartão da foto */}
                    <div
                      className="relative w-full overflow-hidden rounded-xl z-10"
                      style={{
                        border: `1.5px solid ${cat.color}38`,
                        boxShadow: `0 16px 48px rgba(7,37,36,0.18), 0 4px 12px rgba(7,37,36,0.10), 0 0 0 4px rgba(255,255,255,0.85)`,
                      }}
                    >
                      {/* Barra de cor no topo — identidade visual */}
                      <div className="h-[3px]"
                        style={{ background: `linear-gradient(90deg, ${cat.color}, #692BBA)` }}
                        aria-hidden="true" />

                      {/* Foto */}
                      <div style={{ aspectRatio: '3/4' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoSrc}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center 18%', display: 'block' }}
                        />
                      </div>

                      {/* Plaqueta de identidade — base do cartão */}
                      <div
                        className="px-3.5 py-2.5"
                        style={{
                          borderTop: `1px solid ${cat.color}22`,
                          background: 'rgba(7,37,36,0.028)',
                        }}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.categoria && (
                            <span
                              className="font-inter text-[9px] font-bold uppercase tracking-widest rounded px-1.5 py-0.5"
                              style={{ color: cat.color, background: `${cat.color}16` }}
                            >
                              {post.categoria}
                            </span>
                          )}
                        </div>
                        {post.data && (
                          <p className="font-inter text-[10px] mt-1" style={{ color: 'rgba(7,37,36,0.45)' }}>
                            {formatDate(post.data)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Painel direito: pull quote editorial ───────── */}
                  <div className="flex-1 flex flex-col justify-center gap-5 px-8 py-8 lg:px-10 relative overflow-hidden">

                    {/* Aspas decorativas gigantes de fundo */}
                    <div
                      className="absolute pointer-events-none select-none"
                      aria-hidden="true"
                      style={{
                        top: '-0.15em',
                        left: '1.5rem',
                        fontSize: '9rem',
                        lineHeight: 1,
                        fontFamily: 'Georgia, serif',
                        color: cat.color,
                        opacity: 0.07,
                        userSelect: 'none',
                      }}
                    >
                      &ldquo;
                    </div>

                    {/* Accent line */}
                    <div className="h-0.5 w-10 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, #692BBA)` }}
                      aria-hidden="true" />

                    {/* Pull quote */}
                    {post.resumo && (
                      <p
                        className="font-sora font-semibold leading-snug relative z-10"
                        style={{
                          fontSize: 'clamp(0.97rem, 1.4vw, 1.12rem)',
                          color: 'rgba(7,37,36,0.82)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.55,
                        }}
                      >
                        {post.resumo}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="h-px w-12"
                      style={{ background: 'rgba(7,37,36,0.10)' }}
                      aria-hidden="true" />

                    {/* Meta + label */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="font-inter text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: 'rgba(7,37,36,0.35)' }}
                      >
                        INTERFIBRAS
                      </span>
                      <span style={{ color: 'rgba(7,37,36,0.18)', fontSize: '10px' }}>·</span>
                      {post.data && (
                        <span className="font-inter text-xs" style={{ color: 'rgba(7,37,36,0.40)' }}>
                          {formatDate(post.data)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Prose */}
              <div className="p-8 lg:p-12">
                <div
                  className="prose prose-lg max-w-none
                             prose-headings:font-sora prose-headings:text-verde-profundo prose-headings:font-bold prose-headings:tracking-tight
                             prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                             prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                             prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2
                             prose-a:text-verde-jade prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                             prose-strong:text-verde-profundo
                             prose-p:text-verde-profundo/68 prose-p:leading-relaxed prose-p:mb-5
                             prose-ul:space-y-2 prose-li:text-verde-profundo/68
                             prose-blockquote:not-italic prose-blockquote:border-l-[3px] prose-blockquote:py-1 prose-blockquote:pl-5 prose-blockquote:text-verde-profundo/60
                             prose-code:text-violeta prose-code:bg-violeta/8 prose-code:px-1.5 prose-code:rounded
                             prose-img:rounded-xl prose-img:my-6 prose-img:shadow-sm"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              <div className="px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ borderTop: '1px solid rgba(7,37,36,0.07)', background: 'rgba(7,37,36,0.015)' }}>
                <Link href="/noticias"
                  className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-colors hover:text-verde-jade"
                  style={{ color: '#2d8a72' }}>
                  ← Todas as notícias
                </Link>
                <Link href="/oportunidades"
                  className="inline-flex items-center gap-2 font-inter text-sm font-bold rounded-full px-5 py-2.5 transition-all hover:opacity-85 hover:scale-[1.02]"
                  style={{ color: '#ffffff', background: 'linear-gradient(135deg, #4BAF92, #2d8a72)', boxShadow: '0 4px 16px rgba(75,175,146,0.32)' }}>
                  Ver vagas abertas →
                </Link>
              </div>
            </div>
          </main>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="lg:col-span-4 self-start flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Metadados */}
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(7,37,36,0.07)', boxShadow: '0 2px 14px rgba(7,37,36,0.05)' }}>
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, #692BBA)` }} aria-hidden="true" />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categoria && (
                    <span className="font-inter text-xs font-semibold rounded-full px-3 py-1"
                      style={{ color: cat.color, background: `${cat.color}14`, border: `1px solid ${cat.border}` }}>
                      {post.categoria}
                    </span>
                  )}
                  <span className="font-inter text-xs rounded-full px-3 py-1"
                    style={{ color: 'rgba(7,37,36,0.45)', background: 'rgba(7,37,36,0.04)', border: '1px solid rgba(7,37,36,0.08)' }}>
                    {readingTime} min
                  </span>
                </div>
                {post.data && (
                  <div className="mb-5">
                    <p className="font-inter text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(7,37,36,0.38)' }}>Publicado em</p>
                    <p className="font-sora font-semibold text-verde-profundo text-sm">{formatDate(post.data)}</p>
                  </div>
                )}
                {coordenador && (
                  <>
                    <div className="h-px mb-5" style={{ background: 'rgba(7,37,36,0.07)' }} aria-hidden="true" />
                    <p className="font-inter text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(7,37,36,0.38)' }}>Coordenador</p>
                    <div className="flex items-center gap-3 mb-4">
                      {coordenador.foto && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={coordenador.foto} alt={coordenador.nome}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                          style={{ objectPosition: 'center top', border: '2px solid rgba(221,160,31,0.35)' }} />
                      )}
                      <div>
                        <p className="font-sora font-bold text-verde-profundo text-sm leading-snug">{coordenador.nome}</p>
                        <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(7,37,36,0.45)' }}>{coordenador.cargo}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {coordenador.lattes && (
                        <a href={coordenador.lattes} target="_blank" rel="noopener noreferrer"
                          aria-label={`Currículo Lattes de ${coordenador.nome}`}
                          className="font-inter text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#4BAF92' }}>Lattes ↗</a>
                      )}
                      {coordenador.orcid && (
                        <a href={coordenador.orcid} target="_blank" rel="noopener noreferrer"
                          aria-label={`ORCID de ${coordenador.nome}`}
                          className="font-inter text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#4BAF92' }}>ORCID ↗</a>
                      )}
                      {coordenador.linkedin && (
                        <a href={coordenador.linkedin} target="_blank" rel="noopener noreferrer"
                          aria-label={`LinkedIn de ${coordenador.nome}`}
                          className="font-inter text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#4BAF92' }}>LinkedIn ↗</a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sobre o grupo */}
            <div className="relative rounded-2xl p-6 overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #072524 0%, #0c3330 70%, #0f2a4a 100%)', border: '1px solid rgba(75,175,146,0.15)' }}>
              <div className="absolute top-0 right-0 pointer-events-none" aria-hidden="true"
                style={{ width: '60%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.18) 0%, transparent 65%)', filter: 'blur(25px)', transform: 'translate(30%, -30%)' }} />
              <p className="font-inter text-[10px] font-semibold uppercase tracking-widest mb-3 relative z-10" style={{ color: 'rgba(138,191,178,0.65)' }}>O grupo INTERFIBRAS</p>
              <p className="font-sora font-bold text-white text-sm leading-snug mb-3 relative z-10">Materiais de base biológica para substituir recursos fósseis.</p>
              <p className="font-inter text-xs leading-relaxed mb-5 relative z-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Filmes, fibras e membranas a partir de nanoblocos naturais — nanocelulose, nanoquitosana e biopolímeros.
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
              <Link href="/#pesquisa" className="font-inter text-xs font-semibold transition-opacity hover:opacity-70 relative z-10" style={{ color: '#4BAF92' }}>
                Conhecer a pesquisa →
              </Link>
            </div>

            {/* Vagas */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(75,175,146,0.06)', border: '1px solid rgba(75,175,146,0.20)' }}>
              <p className="font-inter text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(7,37,36,0.45)' }}>Vagas abertas</p>
              <p className="font-sora font-bold text-verde-profundo text-sm mb-1">IC e Mestrado 2026</p>
              <p className="font-inter text-xs text-verde-profundo/55 leading-relaxed mb-4">
                Bolsas FAPESP disponíveis. Envie CV (preferencialmente Lattes) e histórico escolar.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(75,175,146,0.12)', border: '1px solid rgba(75,175,146,0.28)', color: '#1f6b56' }}>IC · FAPESP</span>
                <span className="font-inter text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(105,43,186,0.08)', border: '1px solid rgba(105,43,186,0.22)', color: '#692BBA' }}>Mestrado · FAPESP</span>
              </div>
              <Link href="/oportunidades"
                className="inline-flex items-center gap-1.5 font-inter text-xs font-bold rounded-full px-4 py-2 transition-all hover:opacity-85"
                style={{ color: 'white', background: 'linear-gradient(135deg, #4BAF92, #2d8a72)', boxShadow: '0 3px 14px rgba(75,175,146,0.30)' }}>
                Ver vagas →
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
