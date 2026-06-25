'use client'

import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps'

const GEO_URL = '/countries-110m.json'

const ORIGIN = { coords: [-46.6, -23.5], label: 'USP · São Paulo' }

const parceiros = [
  {
    id: 'usa',
    pais: 'Estados Unidos',
    sigla: 'EUA',
    area: 'Nanocelulose & compósitos celulósicos',
    tipo: 'Colaboração científica',
    cor: '#4BAF92',
    coords: [-71, 44],
    descricao:
      'Intercâmbio de metodologias em produção e caracterização de nanocristais de celulose e quitina.',
  },
  {
    id: 'fin',
    pais: 'Finlândia',
    sigla: 'FIN',
    area: 'Materiais celulósicos de alto desempenho',
    tipo: 'Intercâmbio de pesquisadores',
    cor: '#c084fc',
    coords: [25, 62],
    descricao:
      'Visitas de pesquisa e colaboração em processamento avançado de fibras e filmes funcionais.',
  },
  {
    id: 'nld',
    pais: 'Holanda',
    sigla: 'NLD',
    area: 'Polímeros naturais e bioeconomia',
    tipo: 'Colaboração científica',
    cor: '#DDA01F',
    coords: [4.9, 52.4],
    descricao:
      'Conexão em desenvolvimento com grupos de referência em materiais de origem natural e bioeconomia.',
  },
]

export default function ColaboracaoInternacional() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="colaboracao"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #160830 0%, #2a1260 50%, #0f0e38 100%)' }}
    >
      {/* Orbs decorativos */}
      <div className="absolute pointer-events-none animate-pulse-glow"
        style={{ top: '-8%', right: '-4%', width: '45vw', height: '45vw', maxWidth: '540px', maxHeight: '540px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,175,146,0.16) 0%, transparent 65%)', filter: 'blur(60px)' }}
        aria-hidden="true" />
      <div className="absolute pointer-events-none"
        style={{ bottom: '-10%', left: '-4%', width: '38vw', height: '38vw', maxWidth: '460px', maxHeight: '460px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(170,100,255,0.14) 0%, transparent 65%)', filter: 'blur(55px)' }}
        aria-hidden="true" />

      <div className="container-page relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-16 reveal">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }} aria-hidden="true" />
            <span className="label-sm text-verde-claro">Colaborações Científicas</span>
          </div>
          <h2 className="display-lg text-white mb-5">
            Conexões{' '}
            <span style={{ background: 'linear-gradient(135deg, #4BAF92 0%, #8ABFB2 50%, #F7F2A3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              internacionais.
            </span>
          </h2>
          <p className="body-lg text-white/70">
            O INTERFIBRAS mantém colaborações científicas com grupos de referência
            em materiais celulósicos, nanocelulose e polímeros naturais nos Estados Unidos,
            Finlândia e Holanda.
          </p>
        </div>

        {/* Layout: mapa + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Mapa real com react-simple-maps — oculto no mobile ── */}
          <div className="hidden lg:block lg:col-span-7 reveal">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: 'rgba(8,4,24,0.55)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <ComposableMap
                projection="geoEquirectangular"
                projectionConfig={{ scale: 130, center: [10, 10] }}
                style={{ width: '100%', height: 'auto' }}
              >
                {/* Continentes */}
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover:   { outline: 'none', fill: 'rgba(255,255,255,0.12)' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Linhas de conexão (São Paulo → parceiro) */}
                {parceiros.map((p) => {
                  const on = active === p.id
                  const dashMap = { usa: '8 4', fin: '4 3', nld: '14 5' }
                  const widthMap = { usa: 1.2, fin: 2.0, nld: 1.0 }
                  const widthMapOn = { usa: 2.5, fin: 3.0, nld: 2.0 }
                  // Finland arcs through mid-Atlantic to separate it visually from Netherlands
                  const lineProps = p.id === 'fin'
                    ? { coordinates: [ORIGIN.coords, [-28, 48], p.coords] }
                    : { from: ORIGIN.coords, to: p.coords }
                  return (
                    <Line
                      key={`line-${p.id}`}
                      {...lineProps}
                      stroke={p.cor}
                      strokeWidth={on ? widthMapOn[p.id] : widthMap[p.id]}
                      strokeDasharray={dashMap[p.id] || '6 4'}
                      strokeLinecap="round"
                      style={{
                        opacity: active === null ? 0.65 : on ? 1 : 0.12,
                        transition: 'opacity 280ms, stroke-width 280ms',
                        animation: 'march 2.4s linear infinite',
                      }}
                    />
                  )
                })}

                {/* Marcadores dos parceiros */}
                {parceiros.map((p) => {
                  const on = active === p.id
                  return (
                    <Marker
                      key={`mk-${p.id}`}
                      coordinates={p.coords}
                      onMouseEnter={() => setActive(p.id)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(active === p.id ? null : p.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Halo externo */}
                      <circle r={on ? 18 : 10} fill={p.cor} opacity={on ? 0.20 : 0.10}
                        style={{ transition: 'all 250ms' }} />
                      {/* Anel */}
                      <circle r={on ? 10 : 7} fill="none" stroke={p.cor}
                        strokeWidth="1.5" opacity={on ? 0.70 : 0.40}
                        style={{ transition: 'all 250ms' }} />
                      {/* Dot central */}
                      <circle r={on ? 6 : 4} fill={p.cor}
                        opacity={on ? 1 : 0.80}
                        style={{ transition: 'all 250ms' }} />
                      {/* Label */}
                      <text
                        y={-14} textAnchor="middle"
                        fill={p.cor}
                        fontSize={9}
                        fontFamily="Sora, sans-serif"
                        fontWeight="700"
                        opacity={on ? 1 : 0.65}
                        style={{ transition: 'opacity 250ms' }}
                      >
                        {p.sigla}
                      </text>
                    </Marker>
                  )
                })}

                {/* Origem: USP São Paulo */}
                <Marker coordinates={ORIGIN.coords}>
                  <circle r={20} fill="#4BAF92" opacity={0.08}>
                    <animate attributeName="r" values="14;22;14" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.12;0;0.12" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r={8} fill="none" stroke="#4BAF92" strokeWidth="1.2" opacity={0.45} />
                  <circle r={4.5} fill="#4BAF92" />
                  <text y={-14} textAnchor="middle" fill="#4BAF92"
                    fontSize={8.5} fontFamily="Inter, sans-serif" fontWeight="600" opacity={0.80}>
                    USP · SP
                  </text>
                </Marker>
              </ComposableMap>

              {/* Legenda */}
              <div className="flex flex-wrap items-center gap-5 px-5 py-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-verde-jade inline-block" aria-hidden="true" />
                  <span className="font-inter text-xs text-white/40">Origem: USP</span>
                </div>
                {parceiros.map((p) => (
                  <div key={p.id} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.cor }} aria-hidden="true" />
                    <span className="font-inter text-xs text-white/40">{p.pais}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-inter text-xs text-white/28 mt-3 pl-1">
              Passe o cursor ou toque nos pontos para destacar cada parceria.
            </p>
          </div>

          {/* ── Cards de parceiros — full width no mobile ── */}
          <div className="col-span-1 lg:col-span-5 reveal reveal-delay-2 space-y-4">

            {/* Lista de países */}
            {parceiros.map((p) => {
              const on = active === p.id
              return (
                <div
                  key={p.id}
                  className="rounded-2xl p-6 cursor-default"
                  style={{
                    background: on
                      ? `linear-gradient(135deg, ${p.cor}20 0%, ${p.cor}08 100%)`
                      : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${on ? p.cor + '50' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: on ? `0 0 32px ${p.cor}20` : 'none',
                    transition: 'all 280ms',
                  }}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${p.cor}1a`, border: `1px solid ${p.cor}40` }} aria-hidden="true">
                      <span className="font-sora font-black text-xs" style={{ color: p.cor }}>{p.sigla}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-sora font-bold text-white text-base leading-snug">{p.pais}</h3>
                        <span className="font-inter text-xs font-semibold rounded-full px-2.5 py-0.5"
                          style={{ background: `${p.cor}18`, border: `1px solid ${p.cor}38`, color: p.cor }}>
                          {p.tipo}
                        </span>
                      </div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-white/45 mb-2">{p.area}</p>
                      <p className="font-inter text-sm text-white/65 leading-relaxed">{p.descricao}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
