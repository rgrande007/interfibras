'use client'

import { useState, useEffect, useRef } from 'react'

const EMAIL = 'rafaelgrande@usp.br'

const motivos = [
  {
    titulo: 'Candidatura para IC ou Mestrado',
    descricao: 'Envie CV e histórico escolar com o assunto [IC INTERFIBRAS 2026] ou [Mestrado INTERFIBRAS 2026]. Para mestrado, inclua também uma linha de interesse de pesquisa.',
    cor: '#4BAF92',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    titulo: 'Colaboração ou parceria',
    descricao: 'Pesquisadores e parceiros institucionais podem entrar em contato diretamente pelo email abaixo.',
    cor: '#DDA01F',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
      </svg>
    ),
  },
]

export default function Contato() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section
      id="contato"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 45%, #0f2a4a 100%)' }}
    >
      {/* Orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%', right: '-8%',
          width: '50vw', height: '50vw', maxWidth: '560px', maxHeight: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '-5%',
          width: '40vw', height: '40vw', maxWidth: '440px', maxHeight: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Coluna esquerda */}
          <div className="reveal">

            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-8 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: 'rgba(138,191,178,0.85)' }}>Entre em contato</span>
            </div>

            <h2
              className="font-sora text-white mb-4"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.018em',
              }}
            >
              Fale com<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #4BAF92 0%, #8ABFB2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                o grupo.
              </span>
            </h2>

            <p
              className="font-inter mb-8"
              style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '38rem' }}
            >
              Para candidaturas de IC ou Mestrado, inclua CV e histórico escolar.
              Para colaborações e parcerias, uma mensagem direta já basta.
              Respondemos a todos em até 5 dias úteis.
            </p>

            {/* Tipos de contato */}
            <div className="space-y-4 mb-8">
              {motivos.map((m, i) => (
                <MotivoItem key={m.titulo} motivo={m} index={i} />
              ))}
            </div>

          </div>

          {/* Coluna direita — card de contato */}
          <div className="reveal reveal-delay-1 flex flex-col">
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/35 flex flex-col flex-1"
              style={{ border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {/* Faixa gradiente topo */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />

              <div className="p-8 sm:p-10 flex-1 flex flex-col gap-7">

                {/* Email com copy-to-clipboard */}
                <button
                  onClick={handleCopy}
                  className="group flex items-center gap-3.5 w-full text-left transition-all duration-200"
                  aria-label={`Copiar e-mail ${EMAIL}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                    style={{
                      background: copied ? 'rgba(75,175,146,0.18)' : 'rgba(75,175,146,0.10)',
                      border: `1px solid ${copied ? 'rgba(75,175,146,0.55)' : 'rgba(75,175,146,0.28)'}`,
                      transition: 'all 0.25s ease',
                    }}
                    aria-hidden="true"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-sora font-semibold text-base truncate transition-colors duration-200"
                      style={{ color: copied ? '#2d8a72' : '#4BAF92' }}
                    >
                      {EMAIL}
                    </p>
                    <p
                      className="font-inter text-xs transition-all duration-300"
                      style={{ color: copied ? '#2d8a72' : 'rgba(7,37,36,0.35)' }}
                    >
                      {copied ? '✓ Copiado!' : 'Clique para copiar'}
                    </p>
                  </div>
                </button>

                <div className="h-px" style={{ background: 'rgba(7,37,36,0.08)' }} aria-hidden="true" />

                {/* Instruções de candidatura */}
                <div className="space-y-4">
                  <p className="font-sora font-semibold text-verde-profundo text-sm">
                    O que enviar
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      { item: 'Currículo (CV)', detail: 'preferencialmente Lattes, qualquer formato aceito' },
                      { item: 'Histórico escolar', detail: 'emitido pela instituição' },
                      { item: 'Assunto do email', detail: '[IC INTERFIBRAS 2026] ou [Mestrado INTERFIBRAS 2026]' },
                      { item: 'Uma linha de motivação', detail: 'o que te atraiu no grupo' },
                    ].map(({ item, detail }) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: '#4BAF92' }}
                          aria-hidden="true"
                        />
                        <span className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.72)' }}>
                          <strong style={{ color: '#072524' }}>{item}</strong>
                          {detail ? <span style={{ color: 'rgba(7,37,36,0.50)' }}>, {detail}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px" style={{ background: 'rgba(7,37,36,0.08)' }} aria-hidden="true" />

                <address className="not-italic space-y-1.5">
                  <p className="font-sora font-bold text-verde-profundo text-[0.95rem]">
                    Laboratório de Biopolímeros e Biomateriais
                  </p>
                  <p className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.58)' }}>
                    Departamento de Materiais (SMM) · EESC-USP São Carlos
                  </p>
                </address>

                <p
                  className="font-inter text-xs flex items-center gap-2"
                  style={{ color: 'rgba(7,37,36,0.40)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: '#4BAF92' }}
                    aria-hidden="true"
                  />
                  Respondemos a todos os contatos em até 5 dias úteis.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300"
        style={{
          opacity: copied ? 1 : 0,
          transform: `translateX(-50%) translateY(${copied ? '0' : '12px'})`,
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="flex items-center gap-2.5 px-5 py-3 rounded-full shadow-xl shadow-black/25"
          style={{ background: 'linear-gradient(135deg, #4BAF92, #2d8a72)', color: 'white' }}
        >
          <CheckIcon color="white" />
          <span className="font-inter font-medium text-sm">E-mail copiado!</span>
        </div>
      </div>
    </section>
  )
}

function MotivoItem({ motivo, index }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex items-start gap-4 rounded-xl p-3 -mx-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(-20px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.10}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.10}s, background 0.25s ease`,
        background: hovered ? `${motivo.cor}10` : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: `${motivo.cor}20`,
          border: `1px solid ${motivo.cor}45`,
          color: motivo.cor,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'all 0.25s ease',
        }}
        aria-hidden="true"
      >
        {motivo.icon}
      </div>
      <div>
        <p
          className="font-sora font-bold text-sm mb-0.5 transition-colors duration-200"
          style={{ color: hovered ? motivo.cor : 'white' }}
        >
          {motivo.titulo}
        </p>
        <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {motivo.descricao}
        </p>
      </div>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#4BAF92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon({ color = '#2d8a72' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
