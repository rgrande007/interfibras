'use client'

import { useState } from 'react'
import Link from 'next/link'
import { InfiniteGridBg } from '@/components/ui/infinite-grid-bg'

const tipoLabel = {
  artigo:    'Artigo',
  livro:     'Livro',
  tese:      'Tese',
  congresso: 'Congresso',
}

const tipoCor = {
  artigo:    { color: '#2d8a72',  bg: 'rgba(75,175,146,0.08)',  border: 'rgba(75,175,146,0.22)' },
  congresso: { color: '#692BBA',  bg: 'rgba(105,43,186,0.07)', border: 'rgba(105,43,186,0.22)' },
  tese:      { color: '#072524',  bg: 'rgba(7,37,36,0.05)',    border: 'rgba(7,37,36,0.14)' },
  livro:     { color: '#072524',  bg: 'rgba(7,37,36,0.05)',    border: 'rgba(7,37,36,0.14)' },
}

const tipoDefault = { color: '#2d8a72', bg: 'rgba(75,175,146,0.08)', border: 'rgba(75,175,146,0.22)' }

export default function PublicacoesPreview({ publicacoes }) {
  return (
    <section id="publicacoes" className="section-padding bg-gelo relative overflow-hidden">

      <InfiniteGridBg />

      <div className="container-page relative z-10">

        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-8 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: '#1d7358' }}>Publicações</span>
            </div>
            <h2 className="display-lg text-verde-profundo">
              Produção científica<br className="hidden sm:block" /> do grupo.
            </h2>
          </div>
          <Link
            href="/publicacoes"
            className="shrink-0 font-sora font-semibold text-sm hover:text-verde-profundo transition-colors flex items-center gap-1.5"
            style={{ color: '#1d7358' }}
          >
            Ver todas as publicações →
          </Link>
        </div>

        <p className="reveal body-base text-verde-profundo/75 max-w-2xl mb-12">
          Resultados publicados pelo grupo INTERFIBRAS: artigos em polímeros naturais,
          nanocelulose, fiação interfacial e biofabricação.
          A lista cresce à medida que novos trabalhos são submetidos e aceitos.
        </p>

        {/* Grid de cards */}
        {publicacoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {publicacoes.map((pub, i) => (
              <PubCard key={pub.slug} pub={pub} index={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <div
              className="w-12 h-12 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(75,175,146,0.12), rgba(105,43,186,0.08))' }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4BAF92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <p className="font-sora font-semibold text-verde-profundo/50 text-lg mb-2">
              Artigos em preparação
            </p>
            <p className="font-inter text-sm text-verde-profundo/35 mt-2 max-w-sm mx-auto leading-relaxed">
              Trabalhos em andamento nas frentes de fiação interfacial,
              nanocelulose, filmes & membranas e biofabricação.
              Os primeiros DOIs serão listados aqui assim que publicados.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function PubCard({ pub, index }) {
  const [hovered, setHovered] = useState(false)
  const cor = tipoCor[pub.tipo] || tipoDefault

  return (
    <article
      className={`reveal reveal-delay-${index + 1} relative bg-white border rounded-2xl p-6
                  flex flex-col gap-4 overflow-hidden cursor-default`}
      style={{
        borderColor: hovered ? 'rgba(75,175,146,0.24)' : 'rgb(243,244,246)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 16px 48px rgba(75,175,146,0.14), 0 4px 14px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'transform 0.30s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar — colored by publication type */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${cor.color}, transparent)`,
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.28s ease',
        }}
        aria-hidden="true"
      />

      {/* Tipo + Ano */}
      <div className="flex items-center justify-between gap-2">
        {pub.tipo && (
          <span
            className="font-inter text-xs font-semibold border rounded-full px-2.5 py-0.5"
            style={{ color: cor.color, background: cor.bg, borderColor: cor.border }}
          >
            {tipoLabel[pub.tipo] || pub.tipo}
          </span>
        )}
        {pub.ano && (
          <span className="font-inter text-xs text-verde-profundo/38 shrink-0">{pub.ano}</span>
        )}
      </div>

      {/* Título — clicável se tiver DOI */}
      {pub.doi ? (
        <a
          href={pub.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sora font-semibold leading-snug flex-1 text-[0.95rem] transition-colors duration-200 hover:underline underline-offset-2"
          style={{ color: hovered ? cor.color : '#072524', textDecorationColor: cor.color }}
        >
          {pub.titulo}
        </a>
      ) : (
        <h3
          className="font-sora font-semibold leading-snug flex-1 text-[0.95rem]"
          style={{ color: '#072524' }}
        >
          {pub.titulo}
        </h3>
      )}

      {/* Autores */}
      {pub.autores && (
        <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed">
          {pub.autores.join(', ')}
        </p>
      )}

      {/* Journal */}
      {pub.journal && (
        <p className="font-inter text-sm italic leading-snug" style={{ color: 'rgba(45,138,114,0.75)' }}>
          {pub.journal}
        </p>
      )}

      {/* Rodapé */}
      <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(7,37,36,0.07)' }}>
        {pub.doi ? (
          <a
            href={pub.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold transition-colors duration-200"
            style={{ color: hovered ? '#072524' : '#2d8a72' }}
          >
            Acessar publicação ↗
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 font-inter text-xs font-medium rounded-full px-2.5 py-1"
            style={{
              color: 'rgba(7,37,36,0.40)',
              background: 'rgba(7,37,36,0.04)',
              border: '1px solid rgba(7,37,36,0.10)',
            }}
          >
            Em revisão
          </span>
        )}
      </div>
    </article>
  )
}
