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
                Estudamos como fontes naturais renováveis podem dar origem a{' '}
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
                  materiais avançados.
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
                Extraímos, organizamos e biofabricamos materiais obtidos de plantas,
                carapaças de crustáceos e insetos e bactérias para desenvolver fibras,
                filmes e revestimentos.
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
