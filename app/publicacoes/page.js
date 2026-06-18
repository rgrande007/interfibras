import Link from 'next/link'
import { getAllPublicacoes } from '@/lib/content'

export const metadata = {
  title: 'Publicações | INTERFIBRAS',
  description: 'Artigos, trabalhos e resultados publicados pelo grupo INTERFIBRAS.',
}

const tipoLabel = { artigo: 'Artigo', livro: 'Livro', tese: 'Tese', congresso: 'Congresso' }

const tipoCor = {
  artigo:    { text: '#2d8a72', bg: 'rgba(75,175,146,0.10)',  border: 'rgba(75,175,146,0.30)' },
  congresso: { text: '#692BBA', bg: 'rgba(105,43,186,0.08)',  border: 'rgba(105,43,186,0.28)' },
  tese:      { text: '#9c6e12', bg: 'rgba(221,160,31,0.10)',  border: 'rgba(221,160,31,0.30)' },
  livro:     { text: '#072524', bg: 'rgba(7,37,36,0.05)',     border: 'rgba(7,37,36,0.15)' },
}
const tipoDefault = tipoCor.artigo

export default function PublicacoesPage() {
  const publicacoes = getAllPublicacoes()
  const anos = [...new Set(publicacoes.map((p) => p.ano).filter(Boolean))].sort((a, b) => b - a)

  return (
    <div className="min-h-screen">

      {/* ── Cabeçalho ─────────────────────────── */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          aria-hidden="true"
        />
        <div className="container-narrow relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 font-inter text-sm
                                   text-verde-jade/70 hover:text-verde-jade transition-colors mb-8">
            ← Início
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }} aria-hidden="true" />
            <span className="font-inter text-xs font-semibold text-verde-jade uppercase tracking-widest">
              Publicações
            </span>
          </div>
          <h1 className="font-sora font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Produção científica do grupo.
          </h1>
          <p className="font-inter text-white/50 max-w-xl leading-relaxed">
            Artigos e trabalhos publicados pelo grupo INTERFIBRAS, abrangendo as linhas
            de pesquisa em biopolímeros, nanocelulose, fiação interfacial e biofabricação.
          </p>
        </div>
      </div>

      {/* ── Conteúdo ──────────────────────────── */}
      <div className="bg-neutro py-14">
        <div className="container-narrow">
          {publicacoes.length > 0 ? (
            anos.map((ano) => {
              const doAno = publicacoes.filter((p) => p.ano === ano)
              return (
                <div key={ano} className="mb-12">
                  {/* Separador de ano */}
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-sora font-bold text-verde-profundo text-2xl shrink-0">{ano}</h2>
                    <div className="flex-1 h-px" style={{ background: 'rgba(7,37,36,0.10)' }} aria-hidden="true" />
                  </div>

                  <div className="space-y-4">
                    {doAno.map((pub) => {
                      const cor = tipoCor[pub.tipo] || tipoDefault
                      return (
                        <div
                          key={pub.slug}
                          className="bg-white rounded-2xl p-6 border border-gray-100
                                     hover:border-verde-jade/28 hover:shadow-lg hover:shadow-verde-jade/5
                                     transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:items-start"
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {pub.tipo && (
                                <span
                                  className="font-inter text-xs font-semibold rounded-full px-2.5 py-0.5"
                                  style={{ color: cor.text, background: cor.bg, border: `1px solid ${cor.border}` }}
                                >
                                  {tipoLabel[pub.tipo] || pub.tipo}
                                </span>
                              )}
                              {pub.ano && (
                                <span className="font-inter text-xs text-verde-profundo/35">{pub.ano}</span>
                              )}
                            </div>
                            {pub.doi ? (
                              <a
                                href={pub.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sora font-semibold text-verde-profundo leading-snug mb-2 text-[0.95rem]
                                           hover:text-verde-jade hover:underline underline-offset-2 transition-colors block"
                              >
                                {pub.titulo}
                              </a>
                            ) : (
                              <h3 className="font-sora font-semibold text-verde-profundo leading-snug mb-2 text-[0.95rem]">
                                {pub.titulo}
                              </h3>
                            )}
                            {pub.autores && (
                              <p className="font-inter text-verde-profundo/50 text-sm mb-1.5">
                                {pub.autores.join(', ')}
                              </p>
                            )}
                            {pub.journal && (
                              <p className="font-inter text-sm italic" style={{ color: 'rgba(45,138,114,0.70)' }}>
                                {pub.journal}
                              </p>
                            )}
                          </div>
                          {pub.doi && (
                            <a
                              href={pub.doi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 self-start font-inter text-xs font-semibold
                                         rounded-xl px-4 py-2 transition-all duration-200
                                         text-verde-jade border border-verde-jade/40 bg-verde-jade/6
                                         hover:bg-verde-jade hover:text-white hover:border-verde-jade"
                            >
                              DOI ↗
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-2xl p-14 text-center border border-gray-100">
              <p className="font-sora font-semibold text-verde-profundo/40 text-lg">
                As publicações serão listadas à medida que os resultados forem divulgados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
