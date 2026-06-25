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
    area: 'Polímeros naturais e bioeconomia',
    cor: '#DDA01F',
    descricao: 'Conexão em desenvolvimento com grupos de referência em materiais de origem natural e bioeconomia.',
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
              <span className="label-sm" style={{ color: '#1d7358' }}>Equipe</span>
            </div>
            <h2 className="display-lg text-verde-profundo">
              Quem faz o INTERFIBRAS.
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
  const isCoordenador = membro.nivel === 'Coordenador'

  const accentGradient = isCoordenador
    ? 'linear-gradient(90deg, #DDA01F, #F7B731)'
    : 'linear-gradient(90deg, #4BAF92, #692BBA)'

  const photoRingGradient = isCoordenador
    ? hovered
      ? 'linear-gradient(135deg, #DDA01F 0%, #F7B731 50%, #fff9e6 100%)'
      : 'linear-gradient(135deg, #DDA01F 0%, #F7B731 100%)'
    : hovered
      ? 'linear-gradient(135deg, #4BAF92 0%, #692BBA 50%, #F7F2A3 100%)'
      : 'linear-gradient(135deg, #4BAF92 0%, #692BBA 100%)'

  const topBg = isCoordenador
    ? hovered
      ? 'linear-gradient(180deg, rgba(221,160,31,0.12) 0%, rgba(255,255,255,0) 100%)'
      : 'linear-gradient(180deg, rgba(221,160,31,0.07) 0%, rgba(255,255,255,0) 100%)'
    : hovered
      ? 'linear-gradient(180deg, rgba(75,175,146,0.09) 0%, rgba(255,255,255,0) 100%)'
      : 'linear-gradient(180deg, rgba(75,175,146,0.06) 0%, rgba(255,255,255,0) 100%)'

  const borderColor = isCoordenador
    ? hovered ? 'rgba(221,160,31,0.50)' : 'rgba(221,160,31,0.28)'
    : hovered ? 'rgba(75,175,146,0.28)' : 'rgb(243,244,246)'

  const boxShadow = isCoordenador
    ? hovered
      ? '0 24px 60px rgba(221,160,31,0.18), 0 6px 20px rgba(0,0,0,0.06)'
      : '0 2px 12px rgba(221,160,31,0.10), 0 1px 3px rgba(0,0,0,0.04)'
    : hovered
      ? '0 24px 60px rgba(75,175,146,0.15), 0 6px 20px rgba(0,0,0,0.06)'
      : '0 1px 3px rgba(0,0,0,0.04)'

  return (
    <div
      className={`reveal reveal-delay-${delay} bg-white border rounded-2xl
                  overflow-hidden flex flex-col items-center text-center relative`}
      style={{
        borderColor,
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow,
        transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.28s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stretched link — vai para notícia de entrada se existir, senão para /equipe */}
      <Link
        href={membro.noticia ? `/noticias/${membro.noticia}` : '/equipe'}
        className="absolute inset-0 z-0"
        aria-label={membro.noticia ? `Ver notícia: ${membro.nome}` : `Ver equipe completa: ${membro.nome}`}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      />

      {/* Top accent bar — always visible for coordinator, hover-only for others */}
      <div
        className="absolute inset-x-0 top-0 z-10"
        style={{
          height: isCoordenador ? '3px' : '2px',
          background: accentGradient,
          opacity: isCoordenador ? 0.90 : (hovered ? 1 : 0),
          transition: 'opacity 0.28s ease',
        }}
        aria-hidden="true"
      />

      {/* Top section */}
      <div
        className="w-full pt-7 pb-5 px-5 flex flex-col items-center gap-3 relative z-10"
        style={{ background: topBg, transition: 'background 0.28s ease' }}
      >
        {/* Coordinator crown icon */}
        {isCoordenador && (
          <div
            className="absolute top-4 right-4 flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(221,160,31,0.10)',
              border: '1px solid rgba(221,160,31,0.28)',
            }}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 12 10" fill="#DDA01F">
              <path d="M6 0L7.8 3.6L12 4.2L9 7.1L9.7 11.2L6 9.2L2.3 11.2L3 7.1L0 4.2L4.2 3.6Z" transform="scale(1, 0.85)"/>
            </svg>
            <span className="font-inter text-[9px] font-bold" style={{ color: '#7a5300', letterSpacing: '0.04em' }}>PI</span>
          </div>
        )}

        {/* Foto circular */}
        <div
          className="relative shrink-0"
          style={{
            width: isCoordenador ? '128px' : '112px',
            height: isCoordenador ? '128px' : '112px',
            borderRadius: '50%',
            padding: '2.5px',
            background: photoRingGradient,
            boxShadow: hovered
              ? isCoordenador
                ? '0 0 22px rgba(221,160,31,0.35)'
                : '0 0 18px rgba(75,175,146,0.28)'
              : isCoordenador
                ? '0 0 10px rgba(221,160,31,0.18)'
                : 'none',
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
          <h3
            className="font-sora font-bold text-verde-profundo leading-snug mb-1"
            style={{ fontSize: isCoordenador ? '1.125rem' : '1rem' }}
          >
            {membro.nome}
          </h3>
          <div className="flex flex-col items-center gap-1.5">
            <p
              className="font-inter text-sm font-semibold"
              style={{ color: isCoordenador ? '#7a5300' : '#2d8a72' }}
            >
              {membro.cargo}
            </p>
            {membro.nivel && (
              <span
                className="font-inter text-xs font-semibold rounded-full px-2.5 py-1"
                style={getNivelStyle(membro.nivel)}
              >
                {membro.nivel}
              </span>
            )}
          </div>
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
        style={{ borderTop: `1px solid ${isCoordenador ? 'rgba(221,160,31,0.12)' : 'rgba(7,37,36,0.06)'}` }}
      >
        {/* Áreas */}
        {membro.areas && (
          <div className="flex flex-wrap gap-1.5 justify-center pt-5">
            {membro.areas.slice(0, 4).map((a) => (
              <span
                key={a}
                className="font-inter text-xs font-medium rounded-full px-2.5 py-1"
                style={
                  isCoordenador
                    ? { color: '#7a5300', background: 'rgba(221,160,31,0.09)', border: '1px solid rgba(221,160,31,0.25)' }
                    : { color: '#1f6b56', background: 'rgba(75,175,146,0.10)', border: '1px solid rgba(75,175,146,0.28)' }
                }
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Links Lattes / ORCID / LinkedIn */}
        {(membro.lattes || membro.orcid || membro.linkedin) && (
          <div className="flex gap-5 justify-center pt-1">
            {membro.lattes && (
              <a
                href={membro.lattes}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Currículo Lattes de ${membro.nome}`}
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold transition-opacity hover:opacity-75 relative z-20"
                style={{ color: isCoordenador ? '#DDA01F' : '#4BAF92' }}
              >
                Lattes ↗
              </a>
            )}
            {membro.orcid && (
              <a
                href={membro.orcid}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ORCID de ${membro.nome}`}
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold transition-opacity hover:opacity-75 relative z-20"
                style={{ color: isCoordenador ? '#DDA01F' : '#4BAF92' }}
              >
                ORCID ↗
              </a>
            )}
            {membro.linkedin && (
              <a
                href={membro.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${membro.nome}`}
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold transition-opacity hover:opacity-75 relative z-20"
                style={{ color: isCoordenador ? '#DDA01F' : '#4BAF92' }}
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        )}
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

function getNivelStyle(nivel) {
  const map = {
    'Coordenador': { color: '#7a5300', bg: 'rgba(221,160,31,0.12)', border: 'rgba(221,160,31,0.30)' },
    'Mestrado': { color: '#145c40', bg: 'rgba(75,175,146,0.12)', border: 'rgba(75,175,146,0.28)' },
    'IC': { color: '#4a1a88', bg: 'rgba(105,43,186,0.10)', border: 'rgba(105,43,186,0.24)' },
    'TCC': { color: '#1a6b55', bg: 'rgba(29,115,88,0.10)', border: 'rgba(29,115,88,0.22)' },
    'Pós-doc': { color: '#4a1a88', bg: 'rgba(105,43,186,0.10)', border: 'rgba(105,43,186,0.24)' },
    'Colaborador': { color: '#374151', bg: 'rgba(55,65,81,0.08)', border: 'rgba(55,65,81,0.12)' },
  }
  const v = map[nivel] || { color: '#374151', bg: 'rgba(55,65,81,0.06)', border: 'rgba(55,65,81,0.10)' }
  return {
    color: v.color,
    background: v.bg,
    border: `1px solid ${v.border}`,
  }
}
