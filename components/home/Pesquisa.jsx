'use client'

import { useState } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'
import { Droplets, Diamond, Layers, Leaf } from 'lucide-react'

const COR_JADE = '#4BAF92'

const fraseGuia = [
  { word: 'Extraímos',     cor: '#8ABFB2' },
  { word: 'Organizamos',   cor: '#b785f5' },
  { word: 'Fiamos',        cor: '#4BAF92' },
  { word: 'Biofabricamos', cor: '#DDA01F' },
]

const secundarios = [
  {
    title:       'Extração e preparo',
    subtitle:    'Da biomassa aos biopolímeros',
    description: 'Extraímos, purificamos e caracterizamos celulose, quitina e seus derivados em escala micro e nanométrica para controlar composição, carga, dispersão e desempenho.',
    tags:        ['Nanocelulose', 'Nanoquitina', 'Dispersões'],
    cor:         '#8ABFB2',
    Icon:        Diamond,
  },
  {
    title:       'Filmes e membranas',
    subtitle:    'Organização em camadas e redes',
    description: 'Organizamos biopolímeros naturais em filmes e membranas para estudar estrutura, estabilidade, morfologia e propriedades de barreira.',
    tags:        ['Filmes', 'Membranas', 'LbL', 'Filtração'],
    cor:         '#b785f5',
    Icon:        Layers,
  },
  {
    title:       'Biofabricação',
    subtitle:    'Materiais cultivados por bactérias',
    description: 'Estudamos a produção de celulose bacteriana por microrganismos, explorando sua rede pura e tridimensional como reforço e plataforma para materiais de base biológica.',
    tags:        ['Celulose bacteriana', 'Bioprocessos', 'Redes estruturadas'],
    cor:         '#DDA01F',
    Icon:        Leaf,
  },
]

function CardPrincipal() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:     hovered ? 'rgba(75,175,146,0.10)' : 'rgba(255,255,255,0.07)',
        border:         `1.5px solid ${hovered ? 'rgba(75,175,146,0.52)' : 'rgba(255,255,255,0.13)'}`,
        boxShadow:      hovered
          ? '0 28px 64px rgba(75,175,146,0.18), 0 4px 20px rgba(0,0,0,0.30)'
          : '0 2px 16px rgba(0,0,0,0.22)',
        backdropFilter: 'blur(8px)',
        transition:     'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stronger top accent */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '2px', background: `linear-gradient(90deg, ${COR_JADE} 0%, ${COR_JADE}55 65%, transparent 100%)` }}
        aria-hidden="true"
      />

      {/* Dot texture on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity:         hovered ? 1 : 0,
          backgroundImage: 'radial-gradient(circle, rgba(75,175,146,0.025) 1px, transparent 1px)',
          backgroundSize:  '14px 14px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 sm:p-10 lg:p-12">
        {/* Top row: icon + badge + watermark number */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:  hovered ? 'rgba(75,175,146,0.22)' : 'rgba(75,175,146,0.13)',
                border:      `1px solid ${hovered ? 'rgba(75,175,146,0.55)' : 'rgba(75,175,146,0.30)'}`,
                transition:  'all 350ms',
              }}
              aria-hidden="true"
            >
              <Droplets size={20} color={COR_JADE} strokeWidth={1.7} />
            </div>
            <span
              className="font-inter text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1"
              style={{
                background: 'rgba(75,175,146,0.13)',
                border:     '1px solid rgba(75,175,146,0.36)',
                color:      COR_JADE,
              }}
            >
              Linha central
            </span>
          </div>

          <span
            className="font-sora font-black select-none shrink-0"
            style={{
              fontSize:   '4.5rem',
              lineHeight: 1,
              color:      hovered ? 'rgba(75,175,146,0.07)' : 'rgba(255,255,255,0.025)',
              transition: 'color 350ms',
            }}
            aria-hidden="true"
          >
            01
          </span>
        </div>

        {/* Content — 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <div>
            <h3
              className="font-sora font-black text-white leading-tight mb-2.5"
              style={{ fontSize: 'clamp(1.55rem, 3vw, 2.1rem)' }}
            >
              Fiação interfacial
            </h3>
            <p
              className="font-inter text-sm font-semibold mb-5"
              style={{ color: hovered ? COR_JADE : `${COR_JADE}cc`, transition: 'color 350ms' }}
            >
              Como formar fibras contínuas em meio aquoso?
            </p>
            <p
              className="font-inter leading-relaxed"
              style={{
                fontSize:   '0.925rem',
                color:      hovered ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.65)',
                maxWidth:   '54ch',
                transition: 'color 350ms',
              }}
            >
              Investigamos como biopolímeros de cargas opostas interagem em interfaces aquosas
              para formar filamentos contínuos. Essa é a linha central do grupo e conecta
              extração, organização molecular e processamento de materiais de base natural.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-[200px]">
            {['Fiação interfacial', 'Complexação', 'Fibras contínuas', 'Meio aquoso'].map((tag) => (
              <span
                key={tag}
                className="font-inter text-xs font-medium rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(75,175,146,0.10)',
                  border:     `1px solid ${hovered ? 'rgba(75,175,146,0.40)' : 'rgba(75,175,146,0.24)'}`,
                  color:      hovered ? 'rgba(138,191,178,0.95)' : 'rgba(138,191,178,0.72)',
                  transition: 'all 350ms',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CardSecundario({ item }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = item

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col p-6 lg:p-7 cursor-default"
      style={{
        background:     hovered ? `${item.cor}0e` : 'rgba(255,255,255,0.055)',
        border:         `1.5px solid ${hovered ? `${item.cor}4a` : 'rgba(255,255,255,0.10)'}`,
        boxShadow:      hovered
          ? `0 16px 40px ${item.cor}18, 0 4px 14px rgba(0,0,0,0.26)`
          : '0 2px 12px rgba(0,0,0,0.18)',
        transform:      hovered ? 'translateY(-3px)' : 'none',
        backdropFilter: 'blur(8px)',
        transition:     'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: hovered
            ? `linear-gradient(90deg, ${item.cor}, transparent)`
            : `linear-gradient(90deg, ${item.cor}44, transparent)`,
          transition: 'background 350ms',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 shrink-0"
        style={{
          background:  hovered ? `${item.cor}1e` : 'rgba(255,255,255,0.08)',
          border:      `1px solid ${hovered ? `${item.cor}45` : 'rgba(255,255,255,0.12)'}`,
          transition:  'all 350ms',
        }}
        aria-hidden="true"
      >
        <Icon size={16} color={item.cor} strokeWidth={1.7} />
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col gap-2 mb-5">
        <h3
          className="font-sora font-bold leading-snug"
          style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)' }}
        >
          {item.title}
        </h3>
        <p
          className="font-inter text-xs font-semibold"
          style={{ color: hovered ? item.cor : `${item.cor}bb`, transition: 'color 350ms' }}
        >
          {item.subtitle}
        </p>
        <p
          className="font-inter text-xs leading-relaxed mt-1"
          style={{
            color:      hovered ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.57)',
            transition: 'color 350ms',
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Tags */}
      <div
        className="flex flex-wrap gap-1.5 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="font-inter font-medium rounded-full px-2.5 py-0.5"
            style={{
              fontSize:   '0.65rem',
              background: 'rgba(255,255,255,0.04)',
              border:     `1px solid ${hovered ? `${item.cor}2a` : 'rgba(255,255,255,0.09)'}`,
              color:      hovered ? `${item.cor}ee` : 'rgba(255,255,255,0.48)',
              transition: 'all 350ms',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Pesquisa() {
  return (
    <section
      id="pesquisa"
      className="section-padding-sm relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 50%, #0f2a4a 100%)' }}
    >
      {/* Orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-5%',
          width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.11) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%',
          width: '45vw', height: '45vw', maxWidth: '540px', maxHeight: '540px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.12) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(75,175,146,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75,175,146,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative z-10">

        {/* Header */}
        <div className="mb-10 reveal">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="block w-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="label-sm text-verde-claro">Linhas de pesquisa</span>
          </div>

          <BlurFade delay={0.1} inView yOffset={10} blur="10px" duration={0.5}>
            <h2
              className="display-lg mb-5"
              style={{
                background:           'linear-gradient(135deg, #ffffff 0%, #8ABFB2 55%, #F7F2A3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              O que investigamos.
            </h2>
          </BlurFade>

          <p
            className="font-inter text-sm leading-relaxed max-w-2xl mb-6"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            A linha central do INTERFIBRAS é a fiação interfacial de biopolímeros naturais:
            transformamos materiais extraídos ou cultivados a partir da biomassa em fibras,
            filmes e revestimentos de base natural.
          </p>

          {/* Frase-guia visual */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {fraseGuia.flatMap(({ word, cor }, i, arr) => {
              const els = [
                <span
                  key={word}
                  className="font-sora font-bold text-sm"
                  style={{ color: cor }}
                >
                  {word}
                </span>,
              ]
              if (i < arr.length - 1) {
                els.push(
                  <span
                    key={`sep-${i}`}
                    className="font-sora text-sm select-none"
                    style={{ color: 'rgba(255,255,255,0.18)' }}
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )
              }
              return els
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4 lg:space-y-5">
          <div className="reveal">
            <CardPrincipal />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal reveal-delay-1">
            {secundarios.map((item) => (
              <CardSecundario key={item.title} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
