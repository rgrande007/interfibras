'use client'

import { useState } from 'react'
import Link from 'next/link'

const conexoes = [
  {
    pais: 'Estados Unidos',
    sigla: 'EUA',
    area: 'Nanocelulose & compósitos celulósicos',
    cor: '#4BAF92',
    descricao: 'Intercâmbio em produção e caracterização de nanocristais de celulose e quitina.',
  },
  {
    pais: 'Finlândia',
    sigla: 'FIN',
    area: 'Materiais celulósicos de alto desempenho',
    cor: '#c084fc',
    descricao: 'Colaboração em processamento avançado de fibras e filmes funcionais (Aalto University).',
  },
  {
    pais: 'Holanda',
    sigla: 'NLD',
    area: 'Biopolímeros & bioeconomia circular',
    cor: '#DDA01F',
    descricao: 'Conexão em desenvolvimento com grupos de referência em biopolímeros e sustentabilidade.',
  },
]

export default function EquipePreview({ membros }) {
  return (
    <section id="equipe" className="section-padding bg-white relative overflow-hidden">

      <div
        className="absolute pointer-events-none top-0 right-0 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px]"
        style={{
          background: 'radial-gradient(circle, rgba(75,175,146,0.05) 0%, transparent 65%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          transform: 'translate(20%, -20%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.03) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-8 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: '#1d7358' }}>Grupo em formação</span>
            </div>
            <h2 className="display-lg text-verde-profundo">
              Um grupo científico<br className="hidden sm:block" /> em formação.
            </h2>
          </div>
          <Link
            href="/equipe"
            className="shrink-0 font-sora font-semibold text-sm hover:text-verde-profundo transition-colors flex items-center gap-1.5"
            style={{ color: '#1d7358' }}
          >
            Ver equipe completa →
          </Link>
        </div>

        {/* Banner — vantagem concreta de entrar num grupo novo */}
        <div
          className="reveal mb-10 rounded-2xl px-6 py-5"
          style={{
            background: 'rgba(75,175,146,0.06)',
            border: '1px solid rgba(75,175,146,0.25)',
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="relative flex h-2 w-2 shrink-0 mt-1.5" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-55"
                style={{ background: '#4BAF92', animation: 'ping 2.2s cubic-bezier(0,0,0.2,1) infinite' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#4BAF92' }} />
            </span>
            <p className="font-sora font-semibold text-sm text-verde-profundo leading-snug">
              Entrar num grupo novo não é uma limitação: é uma vantagem.
            </p>
          </div>
          <p className="font-inter text-xs leading-relaxed pl-5" style={{ color: 'rgba(7,37,36,0.62)' }}>
            Os primeiros integrantes trabalham diretamente com o orientador desde o primeiro
            experimento, participam das decisões de protocolo, influenciam as linhas do grupo
            e figuram entre os autores dos primeiros artigos publicados pelo INTERFIBRAS.{' '}
            <Link href="/oportunidades" className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: '#1a6b55' }}>
              Ver vagas abertas →
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membros.map((membro, i) => (
            <MemberCard key={membro.slug} membro={membro} delay={i + 1} />
          ))}

          {/* Card de convite */}
          <InviteCard />
        </div>

        {/* ── Conexões internacionais ─────────────────── */}
        <div className="mt-14 reveal">
          <div
            className="h-px mb-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(75,175,146,0.25), transparent)' }}
            aria-hidden="true"
          />
          <div className="flex items-center gap-3 mb-6">
            <span
              className="block w-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="label-sm" style={{ color: '#1d7358' }}>Conexões internacionais</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {conexoes.map((c) => (
              <div
                key={c.pais}
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{
                  background: 'rgba(75,175,146,0.04)',
                  border: `1px solid ${c.cor}28`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="shrink-0 overflow-hidden rounded"
                    style={{ width: '36px', height: '24px', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                    aria-hidden="true"
                  >
                    <CountryFlag pais={c.pais} />
                  </div>
                  <div>
                    <p className="font-sora font-semibold text-sm text-verde-profundo leading-tight">{c.pais}</p>
                    <span
                      className="font-inter text-[10px] font-bold rounded px-1.5 py-0.5 inline-block mt-0.5"
                      style={{ background: `${c.cor}18`, color: c.cor === '#DDA01F' ? '#7a5300' : c.cor === '#c084fc' ? '#6d28d9' : '#1a6b55', border: `1px solid ${c.cor}30` }}
                    >
                      {c.sigla}
                    </span>
                  </div>
                </div>
                <p className="font-inter text-xs font-medium" style={{ color: 'rgba(7,37,36,0.65)' }}>{c.area}</p>
                <p className="font-inter text-xs leading-relaxed text-verde-profundo/58">{c.descricao}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function InviteCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/oportunidades"
      className="animated-border-card reveal flex flex-col items-center justify-center text-center gap-5
                 rounded-2xl p-8 transition-all duration-300"
      style={{
        minHeight: '260px',
        background: hovered
          ? 'linear-gradient(160deg, rgba(75,175,146,0.10) 0%, rgba(105,43,186,0.07) 100%)'
          : 'linear-gradient(160deg, rgba(75,175,146,0.06) 0%, rgba(105,43,186,0.04) 100%)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(75,175,146,0.10)',
          border: '1.5px solid rgba(75,175,146,0.35)',
        }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="#4BAF92" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      </div>
      <div>
        <p className="font-sora font-bold text-verde-profundo text-sm mb-1.5">
          A sua vaga está aqui.
        </p>
        <p className="font-inter text-xs text-verde-profundo/75 mb-4 max-w-[200px] leading-relaxed">
          Vagas abertas para IC e Mestrado. Seja um dos primeiros pesquisadores do grupo.
        </p>
        <span
          className="font-inter text-xs font-semibold rounded-full px-4 py-1.5"
          style={{
            background: 'rgba(75,175,146,0.12)',
            border: '1px solid rgba(75,175,146,0.35)',
            color: '#1a6b55',
          }}
        >
          Ver vagas abertas →
        </span>
      </div>
    </Link>
  )
}

function MemberCard({ membro, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`reveal reveal-delay-${delay} bg-white border rounded-2xl
                  overflow-hidden flex flex-col items-center text-center relative`}
      style={{
        borderColor: hovered ? 'rgba(75,175,146,0.28)' : 'rgb(243,244,246)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered
          ? '0 24px 60px rgba(75,175,146,0.15), 0 6px 20px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stretched link — cobre o card inteiro sem criar <a> dentro de <a> */}
      <Link
        href="/equipe"
        className="absolute inset-0 z-0"
        aria-label={`Ver equipe completa: ${membro.nome}`}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      />

      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10"
        style={{
          background: 'linear-gradient(90deg, #4BAF92, #692BBA)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.28s ease',
        }}
        aria-hidden="true"
      />

      {/* Topo com gradiente sutil */}
      <div
        className="w-full pt-7 pb-5 px-5 flex flex-col items-center gap-3 relative z-10"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(75,175,146,0.09) 0%, rgba(255,255,255,0) 100%)'
            : 'linear-gradient(180deg, rgba(75,175,146,0.06) 0%, rgba(255,255,255,0) 100%)',
          transition: 'background 0.28s ease',
        }}
      >
        {/* Foto circular 1:1 */}
        <div
          className="relative shrink-0"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            padding: '2px',
            background: hovered
              ? 'linear-gradient(135deg, #4BAF92 0%, #692BBA 50%, #F7F2A3 100%)'
              : 'linear-gradient(135deg, #4BAF92 0%, #692BBA 100%)',
            boxShadow: hovered ? '0 0 18px rgba(75,175,146,0.28)' : 'none',
            transition: 'background 0.4s ease, box-shadow 0.3s ease',
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
            {membro.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={membro.foto}
                alt={membro.nome}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(75,175,146,0.10), rgba(105,43,186,0.06))' }}>
                <PersonIcon />
              </div>
            )}
          </div>
        </div>

        {/* Nome + cargo */}
        <div>
          <h3 className="font-sora font-bold text-verde-profundo text-lg leading-snug mb-1">
            {membro.nome}
          </h3>
          <p className="font-inter text-sm font-semibold" style={{ color: '#2d8a72' }}>
            {membro.cargo}
          </p>
        </div>

        {/* Bio curta */}
        {membro._body && (
          <p className="font-inter text-xs text-verde-profundo/75 leading-relaxed text-center px-2">
            {membro._body.trim().split('\n\n')[0].split('. ')[0] + '.'}
          </p>
        )}
      </div>

      {/* Corpo do card */}
      <div
        className="w-full flex flex-col gap-4 px-6 pb-6 relative z-10"
        style={{ borderTop: '1px solid rgba(7,37,36,0.06)' }}
      >
        {/* Áreas */}
        {membro.areas && (
          <div className="flex flex-wrap gap-1.5 justify-center pt-5">
            {membro.areas.slice(0, 4).map((a) => (
              <span
                key={a}
                className="font-inter text-xs font-medium rounded-full px-2.5 py-1"
                style={{
                  color: '#1f6b56',
                  background: 'rgba(75,175,146,0.10)',
                  border: '1px solid rgba(75,175,146,0.28)',
                }}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Links Lattes/ORCID — z-20 para ficarem clicáveis acima do stretched link */}
        <div className="flex gap-5 justify-center pt-1">
          {membro.lattes && (
            <a
              href={membro.lattes}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-inter text-xs font-semibold transition-opacity hover:opacity-75 relative z-20"
              style={{ color: '#4BAF92' }}
            >
              Lattes ↗
            </a>
          )}
          {membro.orcid && (
            <a
              href={membro.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-inter text-xs font-semibold transition-opacity hover:opacity-75 relative z-20"
              style={{ color: '#4BAF92' }}
            >
              ORCID ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function CountryFlag({ pais }) {
  if (pais === 'Estados Unidos') {
    return (
      <svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" width="36" height="24">
        <rect width="36" height="24" fill="#B22234"/>
        <rect y="1.85" width="36" height="1.85" fill="white"/>
        <rect y="5.54" width="36" height="1.85" fill="white"/>
        <rect y="9.23" width="36" height="1.85" fill="white"/>
        <rect y="12.92" width="36" height="1.85" fill="white"/>
        <rect y="16.62" width="36" height="1.85" fill="white"/>
        <rect y="20.31" width="36" height="1.85" fill="white"/>
        <rect width="14.4" height="12.92" fill="#3C3B6E"/>
      </svg>
    )
  }
  if (pais === 'Finlândia') {
    return (
      <svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" width="36" height="24">
        <rect width="36" height="24" fill="white"/>
        <rect y="9" width="36" height="6" fill="#003580"/>
        <rect x="8" width="6" height="24" fill="#003580"/>
      </svg>
    )
  }
  if (pais === 'Holanda') {
    return (
      <svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" width="36" height="24">
        <rect width="36" height="8" fill="#AE1C28"/>
        <rect y="8" width="36" height="8" fill="white"/>
        <rect y="16" width="36" height="8" fill="#21468B"/>
      </svg>
    )
  }
  return null
}

function PersonIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
      stroke="rgba(75,175,146,0.30)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
