'use client'

import { useState } from 'react'

const marcos = [
  {
    ano: 'Jun 2025',
    titulo: 'Fundação',
    descricao: 'Aprovação formal do Projeto Jovem Pesquisador FAPESP e início do INTERFIBRAS na EESC-USP.',
    cor: '#4BAF92',
  },
  {
    ano: 'Jun 2026',
    titulo: 'Laboratório em implantação',
    descricao: 'Estruturação da infraestrutura experimental, aquisição de equipamentos e início das primeiras rotinas de pesquisa.',
    cor: '#692BBA',
  },
  {
    ano: 'Próxima etapa',
    titulo: 'Primeiros integrantes',
    descricao: 'Seleção dos primeiros alunos de IC e Mestrado. O grupo está aberto a estudantes que queiram participar desde o início.',
    cor: '#DDA01F',
  },
]

const fluxo = [
  { label: 'Biomassa renovável', icon: <BiomassaIcon />, color: '#4BAF92' },
  { label: 'Nanoblocos naturais', icon: <CrystalIcon />, color: '#8ABFB2' },
  { label: 'Organização estrutural', icon: <AtomIcon />, color: '#692BBA' },
  { label: 'Materiais funcionais', icon: <LayersIcon />, color: '#DDA01F' },
]

export default function Sobre() {
  return (
    <section id="sobre" className="section-padding bg-white relative overflow-hidden">

      {/* Orb decorativo */}
      <div
        className="absolute pointer-events-none top-0 right-0 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px]"
        style={{
          background: 'radial-gradient(circle, rgba(75,175,146,0.06) 0%, transparent 70%)',
          filter: 'blur(48px)',
          borderRadius: '50%',
          transform: 'translate(20%, -20%)',
        }}
        aria-hidden="true"
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.04) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Coluna de texto ────────────────────── */}
          <div className="lg:col-span-7 relative">

            <div
              className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full hidden lg:block"
              style={{ background: 'linear-gradient(to bottom, #4BAF92, #692BBA, transparent)' }}
              aria-hidden="true"
            />

            <div className="lg:pl-10">
              <div className="reveal flex items-center gap-3 mb-5">
                <span
                  className="block w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                  aria-hidden="true"
                />
                <span className="label-sm" style={{ color: '#1d7358' }}>Sobre o grupo</span>
              </div>

              <h2 className="reveal display-lg text-verde-profundo mb-8">
                Ciência de materiais<br />inspirada pela{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4BAF92 0%, #692BBA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  natureza.
                </span>
              </h2>

              <div className="reveal reveal-delay-1 space-y-5 body-lg text-verde-profundo/68">
                <p>
                  A natureza sabe organizar matéria. Folhas, conchas e tecidos biológicos
                  são estruturas leves e funcionais construídas a partir de blocos muito
                  pequenos. O INTERFIBRAS parte dessa lógica para desenvolver novos
                  materiais de base renovável.
                </p>
                <p>
                  Nosso foco são os nanoblocos naturais: celulose, quitina, quitosana
                  e celulose bacteriana, e como organizá-los em filmes, membranas, fibras
                  e estruturas biofabricadas.
                </p>
                <p>
                  O grupo nasce de um Projeto Jovem Pesquisador FAPESP, sediado no
                  Departamento de Materiais da EESC-USP, com o objetivo de formar
                  conhecimento, pessoas e tecnologias em uma área estratégica para os
                  materiais de base renovável.
                </p>
              </div>

              {/* ── Infográfico horizontal ────────────── */}
              <div className="reveal reveal-delay-2 mt-12">
                <div className="flex items-center gap-2 mb-8">
                  <span
                    className="block w-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                    aria-hidden="true"
                  />
                  <p className="label-sm text-verde-profundo/60">Da matéria ao material</p>
                </div>

                {/* Linha de conexão horizontal atrás dos steps */}
                <div className="relative">
                  <div
                    className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 rounded-full hidden sm:block"
                    style={{ background: 'linear-gradient(90deg, #4BAF92, #8ABFB2, #692BBA, #DDA01F)' }}
                    aria-hidden="true"
                  />

                  {/* Linha de conexão mobile — vertical, apenas visível em < sm */}
                  <div
                    className="absolute left-[calc(25%-1px)] top-8 bottom-8 w-px sm:hidden"
                    style={{ background: 'linear-gradient(to bottom, #4BAF92, #8ABFB2, #692BBA, #DDA01F)' }}
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-3 relative z-10">
                    {fluxo.map((item, i) => (
                      <FluxoStep key={item.label} item={item} index={i} isLast={i === fluxo.length - 1} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Coluna direita ─────────────────────── */}
          <div className="lg:col-span-5 lg:pt-8 space-y-8">

            {/* Marcos — timeline */}
            <div className="space-y-0">
              <p className="label-sm text-verde-profundo/60 mb-5">Linha do tempo</p>
              {marcos.map((m, i) => (
                <MarcoItem key={m.titulo} marco={m} index={i} isLast={i === marcos.length - 1} />
              ))}
            </div>

            {/* Foto do laboratório */}
            <div className="reveal reveal-delay-4">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  boxShadow: '0 8px 40px rgba(7,37,36,0.14)',
                  border: '1px solid rgba(7,37,36,0.08)',
                }}
              >
                <img
                  src="/imagens/lab-departamento.webp"
                  alt="Laboratório do grupo INTERFIBRAS, Departamento de Materiais (SMM), EESC-USP São Carlos"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay gradiente inferior */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: '45%',
                    background: 'linear-gradient(to top, rgba(7,37,36,0.70) 0%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="font-sora font-bold text-white text-sm leading-snug">
                    Laboratório de Biopolímeros e Biomateriais
                  </p>
                  <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    Departamento de Materiais (SMM) · EESC-USP São Carlos
                  </p>
                </div>
                {/* Faixa gradiente no topo */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Logos institucionais */}
            <div className="reveal reveal-delay-5 pt-2">
              <div
                className="h-px mb-6 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA, transparent)' }}
                aria-hidden="true"
              />
              <p className="label-sm text-verde-profundo/60 mb-4">Vínculo institucional</p>
              <div className="flex flex-wrap gap-2.5">
                <GradientBadge color="jade">FAPESP</GradientBadge>
                <GradientBadge color="violeta">USP</GradientBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FluxoStep({ item, index, isLast }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex flex-col items-center text-center gap-3 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className="w-16 h-16 rounded-full flex flex-col items-center justify-center shrink-0 relative"
        style={{
          background: hovered ? `${item.color}0f` : '#ffffff',
          border: `2.5px solid ${item.color}`,
          boxShadow: hovered
            ? `0 8px 28px ${item.color}45, 0 0 0 4px ${item.color}18`
            : `0 4px 20px ${item.color}28`,
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        aria-hidden="true"
      >
        <span
          className="font-sora font-black text-xs leading-none mb-0.5"
          style={{
            color: item.color,
            opacity: hovered ? 0.85 : 0.55,
            transition: 'opacity 0.25s',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ transform: hovered ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'flex' }}>
          {item.icon}
        </span>
      </div>

      <div>
        <span
          className="font-sora font-bold text-xs leading-snug block transition-colors duration-250"
          style={{ color: hovered ? item.color : `${item.color}cc` }}
        >
          {item.label}
        </span>
        {index === 0 && (
          <span
            className="mt-1.5 inline-block font-inter text-xs font-medium rounded-full px-2 py-0.5"
            style={{
              background: hovered ? `${item.color}18` : `${item.color}10`,
              border: `1px solid ${item.color}28`,
              color: item.color,
              transition: 'background 0.25s',
            }}
          >
            início
          </span>
        )}
        {isLast && (
          <span
            className="mt-1.5 inline-block font-inter text-xs font-medium rounded-full px-2 py-0.5"
            style={{
              background: hovered ? `${item.color}18` : `${item.color}10`,
              border: `1px solid ${item.color}28`,
              color: item.color,
              transition: 'background 0.25s',
            }}
          >
            destino
          </span>
        )}
      </div>
    </div>
  )
}

function MarcoItem({ marco, index, isLast }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`reveal reveal-delay-${index + 1} flex gap-5 py-5 rounded-xl transition-all duration-300`}
      style={{
        borderBottom: !isLast ? '1px solid rgba(7,37,36,0.07)' : 'none',
        background: hovered ? `${marco.cor}07` : 'transparent',
        paddingLeft: hovered ? '10px' : '0',
        paddingRight: hovered ? '10px' : '0',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="flex flex-col items-center shrink-0 pt-1.5" aria-hidden="true">
        <div
          className="w-3 h-3 rounded-full shrink-0 transition-transform duration-300"
          style={{
            background: marco.cor,
            transform: hovered ? 'scale(1.4)' : 'scale(1)',
            boxShadow: hovered ? `0 0 8px ${marco.cor}70` : 'none',
          }}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-2 min-h-[28px]" style={{ background: `${marco.cor}30` }} />
        )}
      </div>
      <div className="pb-2">
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="font-sora font-black text-sm" style={{ color: marco.cor }}>{marco.ano}</span>
          <span
            className="font-sora font-bold text-verde-profundo text-sm transition-colors duration-250"
            style={{ color: hovered ? marco.cor : '#072524' }}
          >
            {marco.titulo}
          </span>
        </div>
        <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed">{marco.descricao}</p>
      </div>
    </div>
  )
}

function GradientBadge({ children, color }) {
  const styles = {
    jade:    { color: '#2d8a72', border: '1px solid rgba(75,175,146,0.35)', background: 'rgba(75,175,146,0.08)' },
    violeta: { color: '#692BBA', border: '1px solid rgba(105,43,186,0.30)', background: 'rgba(105,43,186,0.06)' },
    profundo:{ color: '#072524', border: '1px solid rgba(7,37,36,0.15)',    background: 'rgba(7,37,36,0.04)' },
  }
  return (
    <span className="inline-block font-sora font-bold text-xs rounded-full px-4 py-1.5 tracking-wide" style={styles[color]}>
      {children}
    </span>
  )
}

/* ── Ícones SVG ─────────────────────────────────────── */

function BiomassaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4BAF92" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12" />
      <path d="M12 12S8 9 5 5a9 9 0 0 1 14 0c-3 4-7 7-7 7z" />
      <path d="M5 22h14" />
    </svg>
  )
}

function CrystalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8ABFB2" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M2 8.5l10 7 10-7" />
    </svg>
  )
}

function AtomIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#692BBA" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" fill="#692BBA" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DDA01F" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

