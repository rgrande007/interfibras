'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import { BlurFade } from '@/components/ui/blur-fade'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import { CONTACT_EMAIL, MAILTO_IC, MAILTO_MESTRADO, MAILTO_GERAL } from '@/lib/mailto'
import { formatDate } from '@/lib/utils'

const nivelMeta = {
  IC: {
    label: 'Iniciação Científica',
    mailto: MAILTO_IC,
    event: 'cta_ic',
    cor: '#4BAF92',
    corBg: 'rgba(75,175,146,0.12)',
    corBorder: 'rgba(75,175,146,0.30)',
    corText: '#1a6b55',
    btnBg: 'linear-gradient(135deg, #4BAF92 0%, #2d8a72 100%)',
    btnShadow: '0 4px 20px rgba(75,175,146,0.38)',
    perfil:
      'Para estudantes a partir do 3.º semestre em Engenharia de Materiais, Química, Engenharia Química, Física, Biotecnologia ou áreas correlatas.',
    btnLabel: 'Tenho interesse em IC',
  },
  Mestrado: {
    label: 'Mestrado',
    mailto: MAILTO_MESTRADO,
    event: 'cta_mestrado',
    cor: '#9b6dff',
    corBg: 'rgba(105,43,186,0.12)',
    corBorder: 'rgba(105,43,186,0.30)',
    corText: '#692BBA',
    btnBg: 'linear-gradient(135deg, #692BBA 0%, #4a1a88 100%)',
    btnShadow: '0 4px 20px rgba(105,43,186,0.38)',
    perfil:
      'Para candidatos ao PPGCEM da EESC-USP interessados em materiais de base natural, biofabricação e ciência experimental.',
    btnLabel: 'Tenho interesse em mestrado',
  },
}

function VagaCard({ op }) {
  const meta = nivelMeta[op.nivel]
  if (!meta) return null

  const subtitulo = op.titulo?.includes(':')
    ? op.titulo.split(':').slice(1).join(':').trim()
    : op.resumo

  return (
    <div
      className="rounded-2xl flex flex-col h-full relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.98)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.24)',
        border: `1.5px solid ${meta.corBorder}`,
      }}
    >
      {/* accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${meta.cor}, transparent)` }}
        aria-hidden="true"
      />

      <div className="p-7 flex flex-col flex-1">
        {/* badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span
            className="font-inter text-xs font-bold rounded-full px-3 py-1"
            style={{ background: meta.corBg, border: `1px solid ${meta.corBorder}`, color: meta.corText }}
          >
            {op.nivel}
          </span>
          {op.bolsa && (
            <span
              className="font-inter text-xs font-medium rounded-full px-3 py-1"
              style={{
                background: 'rgba(221,160,31,0.10)',
                border: '1px solid rgba(221,160,31,0.32)',
                color: '#7a5300',
              }}
            >
              {op.nivel === 'Mestrado' ? 'Bolsa sujeita à aprovação FAPESP' : 'Bolsa disponível'}
            </span>
          )}
        </div>

        {/* title */}
        <h3
          className="font-sora font-black leading-tight mb-1.5"
          style={{ fontSize: '1.4rem', color: '#072524' }}
        >
          {meta.label}
        </h3>

        {/* subtitle */}
        {subtitulo && (
          <p className="font-inter text-sm font-semibold mb-4" style={{ color: meta.corText }}>
            {subtitulo}
          </p>
        )}

        {/* perfil */}
        <p
          className="font-inter text-sm leading-relaxed flex-1 mb-5"
          style={{ color: 'rgba(7,37,36,0.62)' }}
        >
          {meta.perfil}
        </p>

        {/* prazo */}
        {op.prazo && (
          <p className="font-inter text-xs mb-4" style={{ color: 'rgba(7,37,36,0.38)' }}>
            Prazo: {formatDate(op.prazo)}
          </p>
        )}

        {/* CTA inline */}
        <a
          href={meta.mailto}
          onClick={() => track(meta.event)}
          className="inline-flex items-center justify-center gap-2 font-sora font-bold text-sm text-white
                     rounded-xl px-5 py-3 transition-all duration-200
                     hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
          style={{ background: meta.btnBg, boxShadow: meta.btnShadow }}
        >
          <MailIcon size={14} />
          {meta.btnLabel}
        </a>
      </div>
    </div>
  )
}

export default function OportunidadesPreview({ oportunidades }) {
  const abertas = oportunidades.filter((o) => o.status === 'aberto')
  const ic = abertas.find((o) => o.nivel === 'IC')
  const mestrado = abertas.find((o) => o.nivel === 'Mestrado')
  const cardsDestaque = [ic, mestrado].filter(Boolean)

  return (
    <section
      id="oportunidades"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 50%, #0f2a4a 100%)' }}
    >
      {/* Orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%', right: '-8%',
          width: '50vw', height: '50vw', maxWidth: '580px', maxHeight: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
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
          filter: 'blur(65px)',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative z-10">

        {/* ── Intro ─────────────────────────────────────────── */}
        <div className="max-w-2xl mb-12 reveal">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#4BAF92' }} aria-hidden="true" />
            <span className="label-sm" style={{ color: 'rgba(138,191,178,0.85)' }}>Oportunidades</span>
          </div>
          <BlurFade delay={0.1} inView yOffset={12} blur="10px" duration={0.55}>
            <h2
              className="font-sora font-black mb-5 text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.06, letterSpacing: '-0.022em' }}
            >
              Faça parte<br />do grupo.
            </h2>
          </BlurFade>
          <p className="font-inter" style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1rem', lineHeight: 1.78 }}>
            O INTERFIBRAS está selecionando seus primeiros integrantes. Entrar agora significa
            trabalhar diretamente com o orientador e participar dos primeiros experimentos do grupo.
          </p>
        </div>

        {/* ── Vagas abertas ─────────────────────────────────── */}
        <div className="mb-14 reveal reveal-delay-1">
          <div className="flex items-center gap-3 mb-7">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: '#4BAF92', animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: '#4BAF92' }}
              />
            </span>
            <span className="font-sora font-bold" style={{ color: '#8ABFB2', fontSize: '0.9rem' }}>
              Vagas abertas
            </span>
            <Link
              href="/oportunidades"
              className="ml-auto font-inter text-xs font-semibold rounded-full px-3 py-1 transition-opacity hover:opacity-80"
              style={{
                background: 'rgba(75,175,146,0.14)',
                border: '1px solid rgba(75,175,146,0.32)',
                color: '#8ABFB2',
              }}
            >
              Ver todas →
            </Link>
          </div>

          {cardsDestaque.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cardsDestaque.map((op) => (
                <VagaCard key={op.slug} op={op} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl p-8"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="font-sora font-semibold text-white text-lg mb-2">Novas vagas abrindo em breve</p>
              <p className="font-inter text-sm mb-6" style={{ color: 'rgba(255,255,255,0.58)' }}>
                O grupo está em formação e seleciona os primeiros integrantes agora.
                Candidatos que manifestam interesse antes da abertura formal têm prioridade.
              </p>
              <a
                href={MAILTO_GERAL}
                onClick={() => track('mailto_click_fallback')}
                className="inline-flex items-center gap-2 font-sora font-semibold text-sm text-white rounded-xl px-5 py-3 transition-all duration-200 hover:opacity-90"
                style={{ background: 'rgba(75,175,146,0.25)', border: '1px solid rgba(75,175,146,0.45)' }}
              >
                <MailIcon size={14} />
                Manifestar interesse agora
              </a>
              <p className="font-inter text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Resposta em até 5 dias úteis · Sem compromisso
              </p>
            </div>
          )}
        </div>

        {/* ── Próximo passo ─────────────────────────────────── */}
        <div
          className="pt-10 reveal"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="font-inter text-xs text-center mb-4" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Como funciona após o contato
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-center">
            {[
              { n: '01', text: 'Você envia email com breve apresentação' },
              { n: '02', text: 'Resposta em até 5 dias úteis' },
              { n: '03', text: 'Conversa por videochamada com o orientador' },
            ].map((step) => (
              <div
                key={step.n}
                className="flex-1 rounded-xl px-5 py-4 flex flex-col gap-1.5 items-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="font-sora font-black text-lg" style={{ color: 'rgba(75,175,146,0.60)' }}>{step.n}</span>
                <p className="font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function MailIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
