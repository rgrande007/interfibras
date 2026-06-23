'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CONTACT_EMAIL, MAILTO_GERAL } from '@/lib/mailto'
import { formatDate } from '@/lib/utils'
import { categoriaMeta, categoriaMetaDefault as defaultCategoria } from '@/lib/categorias'

const marcosPlanejados = [
  {
    previsao: '2.º semestre · 2026',
    titulo: 'Primeiro artigo em preparação',
    descricao: 'Resultados dos primeiros experimentos de fiação interfacial e caracterização de nanoestruturas em processo de escrita e revisão.',
    cor: '#4BAF92',
  },
  {
    previsao: '2026',
    titulo: 'Laboratório em implantação na EESC-USP',
    descricao: 'Equipamentos sendo adquiridos e espaço laboratorial em configuração no Departamento de Materiais (SMM). Primeiros experimentos em andamento.',
    cor: '#692BBA',
  },
]

export default function NoticiasPreview({ posts }) {
  return (
    <section
      id="noticias"
      className="section-padding relative overflow-hidden"
      style={{ background: '#F1F2EF' }}
    >

      {/* Dot pattern sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.04) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Orb violeta — esquerda-baixo */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          maxWidth: '520px',
          maxHeight: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Orb jade — direita-topo */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-8%',
          right: '-4%',
          width: '35vw',
          height: '35vw',
          maxWidth: '420px',
          maxHeight: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.08) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

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
              <span className="label-sm" style={{ color: '#1d7358' }}>Notícias</span>
            </div>
            <h2 className="display-lg text-verde-profundo">
              Notícias e próximos<br className="hidden sm:block" /> marcos.
            </h2>
          </div>
          <Link
            href="/noticias"
            className="shrink-0 font-sora font-semibold text-sm flex items-center gap-1.5 px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-80"
            style={{
              color: '#1d7358',
              background: 'rgba(29,115,88,0.10)',
              border: '1px solid rgba(29,115,88,0.28)',
            }}
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Marco fundador — fixo, sempre visível */}
          <MarcoFundadorCard />

          {/* Posts do markdown */}
          {posts.slice(0, 2).map((post, i) => (
            <NewsCard key={post.slug} post={post} index={i + 1} />
          ))}

          {/* Se não há posts suficientes, preencher com marcos planejados */}
          {posts.length === 0 && <MarcoPlanejatoCard index={1} marco={marcosPlanejados[0]} />}
          {posts.length === 1 && <MarcoPlanejatoCard index={2} marco={marcosPlanejados[1]} />}
        </div>

        {/* ── CTA final — Contato ────────────────────────────────── */}
        <div className="mt-16 pt-12 reveal" style={{ borderTop: '1px solid rgba(7,37,36,0.10)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="display-md text-verde-profundo mb-3">Pronto para conversar?</h3>
              <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed mb-5">
                Para IC, TCC, Mestrado ou parcerias científicas: escreva diretamente para o coordenador.
              </p>
              <div className="flex flex-wrap gap-2">
                {['IC', 'TCC', 'Mestrado', 'Colaboração científica'].map((m) => (
                  <span
                    key={m}
                    className="font-inter text-xs font-medium rounded-full px-3 py-1.5"
                    style={{
                      background: 'rgba(75,175,146,0.10)',
                      border: '1px solid rgba(75,175,146,0.28)',
                      color: '#1a6b55',
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end items-start sm:items-center">
              <a
                href={MAILTO_GERAL}
                className="inline-flex items-center gap-2 font-sora font-bold text-white text-sm rounded-xl px-6 py-3.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #4BAF92 0%, #2d8a72 100%)',
                  boxShadow: '0 6px 24px rgba(75,175,146,0.28)',
                }}
              >
                Entrar em contato →
              </a>
              <p className="font-inter text-xs text-verde-profundo/45 mt-1 sm:mt-0">
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function NewsCard({ post, index }) {
  const [hovered, setHovered] = useState(false)
  const cat = categoriaMeta[post.categoria] || defaultCategoria

  return (
    <Link
      href={`/noticias/${post.slug}`}
      className={`reveal reveal-delay-${index + 1} relative bg-white rounded-2xl
                  flex flex-col gap-0 overflow-hidden`}
      style={{
        border: hovered ? '1px solid rgba(75,175,146,0.25)' : '1px solid rgb(243,244,246)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 16px 48px rgba(75,175,146,0.14), 0 4px 14px rgba(0,0,0,0.06)'
          : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.30s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10"
        style={{
          background: `linear-gradient(90deg, ${cat.dot}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.28s ease',
        }}
        aria-hidden="true"
      />

      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {post.imagem ? (
          <img
            src={post.imagem}
            alt={post.titulo}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center 15%',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <PostThumbnailPlaceholder categoria={post.categoria} cat={cat} />
        )}
      </div>

      <div className="flex flex-col gap-4 p-7">
        {/* Meta: categoria + data */}
        <div className="flex items-center justify-between gap-3">
          {post.categoria && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: cat.dot }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: cat.color }}>{post.categoria}</span>
            </div>
          )}
          {post.data && (
            <span className="font-inter text-xs text-verde-profundo/62">{formatDate(post.data)}</span>
          )}
        </div>

        {/* Título */}
        <h3
          className="font-sora font-semibold text-lg leading-snug flex-1 transition-colors duration-200"
          style={{ color: hovered ? '#4BAF92' : '#072524' }}
        >
          {post.titulo}
        </h3>

        {/* Resumo */}
        {post.resumo && (
          <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed line-clamp-2">
            {post.resumo}
          </p>
        )}

        {/* Ler mais */}
        <span
          className="font-inter text-sm font-semibold flex items-center transition-all duration-200"
          style={{
            color: '#2d8a72',
            gap: hovered ? '10px' : '6px',
          }}
        >
          Ler mais <span>→</span>
        </span>
      </div>
    </Link>
  )
}

function MarcoFundadorCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal relative rounded-2xl flex flex-col overflow-hidden cursor-default"
      style={{
        border: hovered ? '1px solid rgba(75,175,146,0.35)' : '1px solid rgba(75,175,146,0.20)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 16px 48px rgba(75,175,146,0.15), 0 4px 14px rgba(0,0,0,0.06)'
          : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.30s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease',
        background: '#ffffff',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10"
        style={{
          background: 'linear-gradient(90deg, #4BAF92, #692BBA)',
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.28s ease',
        }}
        aria-hidden="true"
      />

      {/* Thumbnail visual — marco fundador (enriquecido) */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: '1/1', background: 'linear-gradient(145deg, #06201e 0%, #120a30 60%, #1a0e40 100%)' }}
      >
        {/* Network fiber SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 180"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ opacity: 0.18 }}
        >
          {[[160,90],[60,40],[260,40],[60,140],[260,140],[110,20],[210,20],[110,160],[210,160]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#4BAF92" />
          ))}
          {[[160,90,60,40],[160,90,260,40],[160,90,60,140],[160,90,260,140],[60,40,110,20],[260,40,210,20],[60,140,110,160],[260,140,210,160],[60,40,60,140],[260,40,260,140]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8ABFB2" strokeWidth="0.8" />
          ))}
        </svg>

        {/* Gold glow radial */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '160px', height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(221,160,31,0.22) 0%, transparent 65%)',
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />

        {/* Central emblem */}
        <div className="relative z-10 flex flex-col items-center gap-2.5">
          {/* Concentric rings */}
          <div className="relative flex items-center justify-center" aria-hidden="true">
            <div style={{ position: 'absolute', width: '68px', height: '68px', borderRadius: '50%', border: '1px solid rgba(221,160,31,0.20)' }} />
            <div style={{ position: 'absolute', width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(221,160,31,0.35)' }} />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(221,160,31,0.15)', border: '1.5px solid rgba(221,160,31,0.55)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#DDA01F" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-sora font-bold text-xs tracking-wider" style={{ color: '#DDA01F' }}>MARCO FUNDADOR</span>
            <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>FAPESP · 2025</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#4BAF92' }} aria-hidden="true" />
            <span className="label-sm" style={{ color: '#2d8a72' }}>Marco</span>
          </div>
          <span className="font-inter text-xs text-verde-profundo/62">Jun. 2025</span>
        </div>

        <h3
          className="font-sora font-semibold text-lg leading-snug transition-colors duration-200"
          style={{ color: hovered ? '#4BAF92' : '#072524' }}
        >
          Aprovação do Projeto Jovem Pesquisador FAPESP
        </h3>

        <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed line-clamp-2">
          O INTERFIBRAS nasce com a aprovação do Projeto Jovem Pesquisador em Centros Emergentes da FAPESP, sediado no Departamento de Materiais da EESC-USP.
        </p>

        <Link
          href="/noticias"
          className="font-inter text-sm font-semibold flex items-center transition-opacity duration-200 hover:opacity-75"
          style={{ color: '#2d8a72', gap: hovered ? '10px' : '6px', transition: 'gap 0.2s, opacity 0.2s' }}
        >
          Ver linha do tempo <span>→</span>
        </Link>
      </div>
    </div>
  )
}

function MarcoPlanejatoCard({ index, marco }) {
  return (
    <div
      className={`reveal reveal-delay-${index} relative rounded-2xl flex flex-col overflow-hidden`}
      style={{
        border: `1px solid ${marco.cor}28`,
        background: '#ffffff',
      }}
    >
      {/* Thumbnail visual */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center gap-3"
        style={{
          aspectRatio: '1/1',
          background: `linear-gradient(145deg, ${marco.cor}10 0%, ${marco.cor}04 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${marco.cor}22 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
            opacity: 0.5,
          }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 flex flex-col items-center gap-1.5"
        >
          <span
            className="font-inter text-xs font-bold rounded-full px-3 py-1"
            style={{ background: `${marco.cor}18`, border: `1px solid ${marco.cor}40`, color: marco.cor === '#692BBA' ? '#4a1a88' : '#1a6b55' }}
          >
            Previsão: {marco.previsao}
          </span>
          <span className="font-inter text-xs font-medium" style={{ color: `${marco.cor}99` }}>
            em desenvolvimento
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-7">
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: marco.cor }}
            aria-hidden="true"
          />
          <span className="label-sm" style={{ color: marco.cor === '#692BBA' ? '#4a1a88' : '#2d8a72' }}>
            Próximo marco
          </span>
        </div>
        <h3 className="font-sora font-semibold text-lg leading-snug" style={{ color: '#072524' }}>
          {marco.titulo}
        </h3>
        <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed">
          {marco.descricao}
        </p>
      </div>
    </div>
  )
}

function PostThumbnailPlaceholder({ categoria, cat }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `linear-gradient(145deg, ${cat.dot}22 0%, ${cat.dot}0a 60%, rgba(7,37,36,0.03) 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(${cat.dot}30 1px, transparent 1px),
            linear-gradient(90deg, ${cat.dot}30 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${cat.dot}28`, border: `1px solid ${cat.dot}50` }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cat.color}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        {categoria && (
          <span className="font-inter text-xs font-medium" style={{ color: cat.color }}>
            {categoria}
          </span>
        )}
      </div>
    </div>
  )
}
