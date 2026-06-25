'use client'

import { useState } from 'react'

const fluxo = [
  {
    id: 'nanoblocos',
    titulo: 'Nanoblocos naturais',
    descricao: 'A natureza produz polímeros e estruturas em escala nanométrica com propriedades únicas. Esses componentes renováveis são a matéria-prima do grupo.',
    cor: '#4BAF92',
    icon: <LeafIcon />,
    step: '01',
  },
  {
    id: 'organizacao',
    titulo: 'Organização interfacial',
    descricao: 'Controlamos como esses nanoblocos interagem, se dispersam e se organizam em interfaces, filmes, fibras e camadas estruturadas.',
    cor: '#692BBA',
    icon: <AtomIcon />,
    step: '02',
  },
  {
    id: 'materiais',
    titulo: 'Materiais renováveis',
    descricao: 'O resultado são novos materiais: membranas, fibras contínuas e estruturas biofabricadas, funcionais e voltados para aplicações reais.',
    cor: '#DDA01F',
    icon: <LayersIcon />,
    step: '03',
  },
]

const nanoblocos = [
  {
    nome: 'Celulose',
    origem: 'Madeira, algodão, bagaço de cana',
    descricao: 'O polímero natural mais abundante do planeta. Pode ser isolado em nanoescala, como nanocristais ou nanofibrilas, com alta resistência mecânica.',
    cor: '#4BAF92',
    textColor: '#1a6b55',
  },
  {
    nome: 'Quitina',
    origem: 'Carapaças de crustáceos, fungos',
    descricao: 'Presente na carapaça de camarões e na parede de fungos. Tem propriedades antimicrobianas naturais e pode ser transformada em nanoblocos rígidos.',
    cor: '#8ABFB2',
    textColor: '#1a6b55',
  },
  {
    nome: 'Quitosana',
    origem: 'Derivada da desacetilação da quitina',
    descricao: 'Forma solúvel da quitina. Interage com outros polímeros naturais para formar filmes, membranas e complexos versáteis para aplicações de barreira.',
    cor: '#692BBA',
    textColor: '#4a1a88',
  },
  {
    nome: 'Celulose bacteriana',
    origem: 'Produzida por bactérias como Komagataeibacter',
    descricao: 'Celulose cultivada por bactérias: pura, em forma de rede tridimensional. Usada em membranas, suportes celulares e biomateriais renováveis.',
    cor: '#DDA01F',
    textColor: '#7a5300',
  },
]


export default function PesquisaEmVinte() {
  return (
    <section
      id="pesquisa-em-vinte"
      className="section-padding relative overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* Dot pattern muito sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.035) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">

        {/* Cabeçalho */}
        <div className="reveal max-w-xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="block w-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="label-sm" style={{ color: '#1d7358' }}>O processo</span>
          </div>
          <h2 className="display-lg text-verde-profundo mb-4">
            Da natureza ao material.
          </h2>
          <p className="body-base text-verde-profundo/75">
            Três movimentos que toda pesquisa no grupo percorre, do experimento ao resultado.
          </p>
        </div>

        {/* ── Fluxo em 3 passos ─────────────────────────────────── */}
        <div className="relative mb-16">

          {/* Linha de conexão horizontal — desktop */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: '2.5rem',
              left: 'calc(16.66% + 1.5rem)',
              right: 'calc(16.66% + 1.5rem)',
              height: '1px',
              background: 'linear-gradient(90deg, #4BAF92, #692BBA, #DDA01F)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {fluxo.map((item, i) => (
              <FluxoCard key={item.id} item={item} index={i} isLast={i === fluxo.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Separador ─────────────────────────────────────────── */}
        <div
          className="h-px mb-14 reveal"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(7,37,36,0.10), transparent)' }}
          aria-hidden="true"
        />

        {/* ── Os nanoblocos que estudamos ───────────────────────── */}
        <div className="reveal mb-14">
          <p className="label-sm text-verde-profundo/58 mb-7">Os nanoblocos que estudamos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nanoblocos.map((nb) => (
              <NanoblocoCard key={nb.nome} nb={nb} />
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

function FluxoCard({ item, index, isLast }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal flex flex-col items-start lg:items-center lg:text-center gap-5 relative"
      style={{ '--delay': `${index * 0.12}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Ícone circular */}
      <div
        className="relative shrink-0 w-20 h-20 rounded-full flex items-center justify-center z-10"
        style={{
          background: hovered ? `${item.cor}14` : '#ffffff',
          border: `2px solid ${item.cor}`,
          boxShadow: hovered
            ? `0 8px 28px ${item.cor}38, 0 0 0 6px ${item.cor}10`
            : `0 4px 20px ${item.cor}22`,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        {item.icon}
        <span
          className="absolute -top-2.5 -right-2 font-sora font-black rounded-full w-6 h-6 flex items-center justify-center"
          style={{
            background: item.cor,
            color: '#ffffff',
            fontSize: '0.68rem',
          }}
        >
          {item.step}
        </span>
      </div>

      <div className="flex-1">
        <h3
          className="font-sora font-bold text-lg mb-2 transition-colors duration-250"
          style={{ color: hovered ? item.cor : '#072524' }}
        >
          {item.titulo}
        </h3>
        <p className="font-inter text-sm leading-relaxed text-verde-profundo/75">
          {item.descricao}
        </p>
      </div>

      {/* Seta mobile entre steps */}
      {!isLast && (
        <div
          className="lg:hidden self-start ml-10 font-inter text-sm"
          style={{ color: `${item.cor}66` }}
          aria-hidden="true"
        >
          ↓
        </div>
      )}
    </div>
  )
}

function NanoblocoCard({ nb }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="rounded-2xl p-5 cursor-default transition-all duration-300"
      style={{
        background: hovered ? `${nb.cor}0c` : '#ffffff',
        border: `1px solid ${hovered ? nb.cor + '38' : 'rgba(7,37,36,0.08)'}`,
        boxShadow: hovered
          ? `0 8px 28px ${nb.cor}18`
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: nb.cor }}
          aria-hidden="true"
        />
        <h4
          className="font-sora font-bold text-sm transition-colors duration-250"
          style={{ color: hovered ? nb.cor : '#072524' }}
        >
          {nb.nome}
        </h4>
      </div>

      <p
        className="font-inter text-xs font-medium mb-2.5 rounded-full px-2.5 py-1 inline-block"
        style={{
          background: `${nb.cor}0f`,
          border: `1px solid ${nb.cor}28`,
          color: nb.textColor,
        }}
      >
        {nb.origem}
      </p>

      <p className="font-inter text-xs leading-relaxed text-verde-profundo/75">
        {nb.descricao}
      </p>
    </div>
  )
}

/* ── Ícones ─────────────────────────────────────────── */

function LeafIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="#4BAF92" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12" />
      <path d="M12 12S8 9 5 5a9 9 0 0 1 14 0c-3 4-7 7-7 7z" />
      <path d="M5 22h14" />
    </svg>
  )
}

function AtomIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="#692BBA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" fill="#692BBA" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="#DDA01F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}
