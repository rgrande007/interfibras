'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { BlurFade } from '@/components/ui/blur-fade'

export default function Hero() {
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    if (!videoRef.current || reducedMotion) return
    videoRef.current.play().catch(() => {})
  }, [reducedMotion])

  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[680px] max-h-[1080px] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 40%, #1a0e40 100%)' }}
    >
      {/* Vídeo full-bleed */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0
              videoRef.current.play().catch(() => {})
            }
          }}
          aria-hidden="true"
        >
          <source src="/videos/interfibras-hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Orbs drifting — sem mouse tracking */}
      <div
        className="absolute pointer-events-none z-[1] animate-orb-drift-1"
        style={{
          top: '10%', left: '-5%',
          width: '55vw', height: '55vw', maxWidth: '640px', maxHeight: '640px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.18) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none z-[1] animate-orb-drift-2"
        style={{
          bottom: '-10%', right: '-8%',
          width: '50vw', height: '50vw', maxWidth: '580px', maxHeight: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.16) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to right, rgba(7,37,36,0.90) 0%, rgba(7,37,36,0.78) 30%, rgba(7,37,36,0.50) 60%, rgba(7,37,36,0.18) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Vinheta inferior */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-40"
        style={{ background: 'linear-gradient(to top, rgba(7,37,36,0.65), transparent)' }}
        aria-hidden="true"
      />

      {/* Rede decorativa — xl+ apenas */}
      <svg
        className="absolute hidden lg:block pointer-events-none z-[3]"
        style={{ top: '8%', right: '2%', width: '520px', height: '80%', opacity: 0.07 }}
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden="true"
      >
        {/* nodes */}
        {[
          [260,60],[380,120],[440,240],[380,360],[260,420],[140,360],[80,240],[140,120],
          [320,180],[200,180],[320,300],[200,300],[260,240],
        ].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#4BAF92" fillOpacity="0.9" />
        ))}
        {/* edges */}
        {[
          [260,60,380,120],[380,120,440,240],[440,240,380,360],[380,360,260,420],
          [260,420,140,360],[140,360,80,240],[80,240,140,120],[140,120,260,60],
          [260,60,260,240],[380,120,320,180],[440,240,320,300],[380,360,260,240],
          [80,240,200,180],[140,120,200,180],[200,180,260,240],[320,180,260,240],
          [320,180,320,300],[200,180,200,300],[320,300,260,240],[200,300,260,240],
          [320,300,260,420],[200,300,140,360],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8ABFB2" strokeWidth="1" strokeOpacity="0.6" />
        ))}
      </svg>

      {/* Floating science cards — xl+ apenas */}
      {/* Card 1: Fibras contínuas (jade) */}
      <div
        className="hidden lg:block absolute pointer-events-none z-[4] hero-card-1"
        style={{ top: '16%', right: '8%', width: '224px' }}
        aria-hidden="true"
      >
        <div style={{
          background: 'rgba(7,37,36,0.62)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(75,175,146,0.28)',
          borderRadius: '16px',
          padding: '18px 20px 0 20px',
          overflow: 'hidden',
        }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', color: '#5CC4A0', textTransform: 'uppercase', marginBottom: '6px' }}>Organização</p>
          <p style={{ fontSize: '1.0rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px', fontFamily: 'var(--font-sora)' }}>Fibras por interface</p>
          <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.55, marginBottom: '16px' }}>Biopolímeros em água se encontram, interagem e formam fibras contínuas.</p>
          <div style={{ height: '3px', background: 'linear-gradient(90deg,#4BAF92,#8ABFB2)', borderRadius: '0 0 0 0', margin: '0 -20px' }} />
        </div>
      </div>

      {/* Card 2: Nanoblocos (violet) */}
      <div
        className="hidden lg:block absolute pointer-events-none z-[4] hero-card-2"
        style={{ top: '42%', right: '4%', width: '208px' }}
        aria-hidden="true"
      >
        <div style={{
          background: 'rgba(12,10,32,0.58)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(105,43,186,0.32)',
          borderRadius: '16px',
          padding: '18px 20px 16px 20px',
        }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', color: '#a077e8', textTransform: 'uppercase', marginBottom: '6px' }}>Biomassa</p>
          <p style={{ fontSize: '1.0rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px', fontFamily: 'var(--font-sora)' }}>Nanoblocos naturais</p>
          <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Celulose e quitina extraídas da biomassa viram blocos para novos materiais.</p>
        </div>
      </div>

      {/* Card 3: Biofabricação (gold) */}
      <div
        className="hidden lg:block absolute pointer-events-none z-[4] hero-card-3"
        style={{ top: '66%', right: '13%', width: '196px' }}
        aria-hidden="true"
      >
        <div style={{
          background: 'rgba(20,14,5,0.60)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(221,160,31,0.30)',
          borderRadius: '16px',
          padding: '18px 20px 16px 20px',
        }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', color: '#e8b84b', textTransform: 'uppercase', marginBottom: '6px' }}>Biofabricação</p>
          <p style={{ fontSize: '1.0rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px', fontFamily: 'var(--font-sora)' }}>Materiais cultivados</p>
          <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Bactérias produzem celulose pura para filmes, fibras e revestimentos.</p>
        </div>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          mixBlendMode: 'overlay',
          opacity: 0.04,
        }}
        aria-hidden="true"
      />

      {/* Conteúdo principal */}
      <div className="relative z-[3] h-full flex items-center" style={{ paddingBottom: '6vh' }}>
        <div className="w-full max-w-[90rem] mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 5rem)', paddingRight: 'clamp(1.5rem, 5vw, 5rem)' }}>
          <div className="max-w-[640px]">

            {/* Bloco de identidade institucional */}
            <BlurFade delay={0.15} yOffset={8} blur="8px" duration={0.5}>
              <div
                className="inline-flex flex-col gap-1 rounded-2xl px-5 py-3 mb-8"
                style={{
                  background: 'rgba(75,175,146,0.14)',
                  border: '1px solid rgba(75,175,146,0.35)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: '#4BAF92' }}
                    aria-hidden="true"
                  />
                  <span className="font-sora font-bold text-sm tracking-wide" style={{ color: '#5CC4A0' }}>
                    Grupo de Pesquisa · Biopolímeros e Interfaces
                  </span>
                </div>
                <span className="font-inter text-xs tracking-wider" style={{ color: 'rgba(138,191,178,0.70)', paddingLeft: '1.125rem' }}>
                  EESC-USP · Dep. de Materiais · São Carlos · FAPESP
                </span>
              </div>
            </BlurFade>

            {/* Headline principal */}
            <BlurFade delay={0.28} yOffset={14} blur="12px" duration={0.6}>
              <h1
                className="font-sora mb-5"
                style={{
                  fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: '-0.020em',
                  color: '#ffffff',
                }}
              >
                Madeira, carapaças e bactérias.{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #4BAF92 0%, #8ABFB2 25%, #F7F2A3 45%, #4BAF92 60%, #8ABFB2 80%, #F7F2A3 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 5s linear infinite',
                  }}
                >
                  Somos o grupo que transforma esses recursos em materiais sem petróleo.
                </span>
              </h1>
            </BlurFade>

            {/* Subtítulo claro */}
            <BlurFade delay={0.38} yOffset={10} blur="10px" duration={0.55}>
              <p
                className="font-inter mb-8"
                style={{
                  fontSize: 'clamp(0.92rem, 1.65vw, 1.05rem)',
                  fontWeight: 400,
                  lineHeight: 1.72,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: '520px',
                  letterSpacing: '0.01em',
                }}
              >
                Você vai extrair, preparar e transformar biopolímeros naturais em materiais
                reais — com experimentos na bancada, orientação próxima e autoria nas
                publicações do grupo.
              </p>
            </BlurFade>

            {/* CTAs */}
            <BlurFade delay={0.52} yOffset={8} blur="8px" duration={0.5}>
              <div className="flex flex-wrap items-center gap-3.5">

                {/* Primário — participar */}
                <Link
                  href="/#oportunidades"
                  className="btn-primary-shine inline-flex items-center gap-2.5 font-sora font-bold text-white
                             transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #4BAF92 0%, #2d8a72 100%)',
                    borderRadius: '50px',
                    padding: '14px 28px',
                    fontSize: '0.9rem',
                    boxShadow: '0 6px 24px rgba(75,175,146,0.35)',
                  }}
                >
                  <GradCapIcon />
                  Quero participar do grupo
                </Link>

                {/* Secundário — pesquisa */}
                <Link
                  href="/#pesquisa-em-vinte"
                  className="inline-flex items-center gap-2 font-sora font-semibold
                             transition-all duration-200 hover:opacity-85"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.88)',
                    borderRadius: '50px',
                    padding: '14px 28px',
                    fontSize: '0.9rem',
                    border: '1.5px solid rgba(255,255,255,0.20)',
                  }}
                >
                  Entender a pesquisa
                  <span aria-hidden="true" style={{ opacity: 0.55 }}>↓</span>
                </Link>
              </div>
            </BlurFade>


            {/* Topic pills — mobile only (floating cards são lg+) */}
            <BlurFade delay={0.65} yOffset={6} blur="6px" duration={0.5}>
              <div className="flex flex-wrap gap-2 mt-8 lg:hidden">
                {[
                  { label: 'Fibras por interface', cor: '#4BAF92' },
                  { label: 'Nanoblocos naturais',  cor: '#b785f5' },
                  { label: 'Materiais cultivados', cor: '#DDA01F' },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="font-inter text-xs font-medium rounded-full px-3 py-1.5"
                    style={{
                      background: `${pill.cor}15`,
                      border: `1px solid ${pill.cor}40`,
                      color: pill.cor,
                    }}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            </BlurFade>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-inter text-xs tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.40)' }}>
          rolar
        </span>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.40), transparent)' }}
        />
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="animate-bounce-y"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          <polyline points="2,4 7,10 12,4" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

function GradCapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      <path d="M12 3L1 9l11 6 11-6-11-6z" />
    </svg>
  )
}
