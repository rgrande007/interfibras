import Link from 'next/link'

const competencias = [
  {
    titulo: 'Biomassa e polímeros naturais',
    descricao: 'Aprender a extrair, purificar e preparar dispersões de materiais naturais.',
    cor: '#4BAF92',
    icon: <LeafIcon />,
  },
  {
    titulo: 'Filmes, fibras e revestimentos',
    descricao: 'Transformar polímeros naturais em materiais estruturados por rotas experimentais.',
    cor: '#692BBA',
    icon: <LayersIcon />,
  },
  {
    titulo: 'Caracterização e dados',
    descricao: 'Analisar estrutura, morfologia e desempenho, conectando resultados ao problema científico.',
    cor: '#8ABFB2',
    icon: <DataIcon />,
  },
  {
    titulo: 'Escrita e autonomia científica',
    descricao: 'Registrar experimentos, apresentar resultados e evoluir para propor decisões próprias.',
    cor: '#DDA01F',
    icon: <WriteIcon />,
  },
]

export default function ComoEPesquisar() {
  return (
    <section
      id="como-pesquisar"
      className="section-padding relative overflow-hidden"
      style={{ background: '#F1F2EF' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.04) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />

      {/* Orb jade suave */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-5%',
          width: '40vw', height: '40vw',
          maxWidth: '480px', maxHeight: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.08) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* ── Coluna de competências ────────────────────────────── */}
          <div className="lg:col-span-7 reveal">

            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-8 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: '#1d7358' }}>Formação científica</span>
            </div>

            <h2 className="display-lg text-verde-profundo mb-4">
              Como é pesquisar<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #4BAF92 0%, #692BBA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                no INTERFIBRAS.
              </span>
            </h2>

            <p className="body-base text-verde-profundo/75 mb-10 max-w-[46ch]">
              Ciência experimental passo a passo: da biomassa ao material final. Com acompanhamento próximo em preparo, fabricação, caracterização e comunicação científica.
            </p>

            <p className="label-sm text-verde-profundo/58 mb-6">O que você vai desenvolver</p>

            <div className="space-y-0">
              {competencias.map((c, i) => (
                <CompetenciaItem key={c.titulo} item={c} index={i} isLast={i === competencias.length - 1} />
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-verde-profundo/10">
              <Link
                href="/oportunidades"
                className="inline-flex items-center gap-2 font-sora font-semibold text-sm transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'rgba(75,175,146,0.12)',
                  border: '1.5px solid rgba(75,175,146,0.38)',
                  color: '#1d7358',
                  borderRadius: '50px',
                  padding: '12px 22px',
                }}
              >
                Ver vagas abertas para IC e Mestrado →
              </Link>
            </div>
          </div>

          {/* ── Coluna da citação ─────────────────────────────────── */}
          <div className="lg:col-span-5 lg:pt-16 reveal reveal-delay-2">

            {/* Card da citação */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #072524 0%, #0c3330 60%, #1a0e40 100%)',
                boxShadow: '0 20px 60px rgba(7,37,36,0.22), 0 4px 16px rgba(0,0,0,0.14)',
              }}
            >
              {/* Faixa topo */}
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />

              {/* Aspas decorativas */}
              <div
                className="font-sora font-black mb-4 leading-none select-none"
                style={{ fontSize: '4rem', color: 'rgba(75,175,146,0.20)', lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </div>

              <blockquote
                className="font-sora font-semibold leading-snug mb-6"
                style={{
                  fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                Você não precisa chegar pronto. Precisa chegar com vontade de aprender e disposição para a prática experimental.
              </blockquote>

              <div
                className="h-px mb-5"
                style={{ background: 'rgba(75,175,146,0.22)' }}
                aria-hidden="true"
              />

              <cite
                className="not-italic flex flex-col gap-0.5"
                style={{ fontStyle: 'normal' }}
              >
                <span className="font-sora font-bold text-sm" style={{ color: '#8ABFB2' }}>
                  Dr. Rafael Grande
                </span>
                <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  Coordenador científico · INTERFIBRAS
                </span>
              </cite>
            </div>

            {/* Card de contexto abaixo */}
            <div
              className="mt-5 rounded-xl p-5"
              style={{
                background: 'rgba(75,175,146,0.07)',
                border: '1px solid rgba(75,175,146,0.22)',
              }}
            >
              <p className="font-inter text-sm leading-relaxed text-verde-profundo/75">
                Você terá reuniões regulares, revisão de protocolos, discussão de resultados e orientação na escrita. A autonomia é construída aos poucos.
              </p>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}

function CompetenciaItem({ item, index, isLast }) {
  return (
    <div
      className={`reveal reveal-delay-${index + 1} flex gap-4 py-4`}
      style={{
        borderBottom: !isLast ? '1px solid rgba(7,37,36,0.07)' : 'none',
      }}
    >
      {/* Ícone */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: `${item.cor}12`,
          border: `1px solid ${item.cor}30`,
        }}
        aria-hidden="true"
      >
        {item.icon}
      </div>

      <div>
        <p className="font-sora font-bold text-sm text-verde-profundo mb-1">{item.titulo}</p>
        <p className="font-inter text-sm text-verde-profundo/75 leading-relaxed">{item.descricao}</p>
      </div>
    </div>
  )
}

/* ── Ícones ─────────────────────────────────────────── */

function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#4BAF92" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12" />
      <path d="M12 12S8 9 5 5a9 9 0 0 1 14 0c-3 4-7 7-7 7z" />
      <path d="M5 22h14" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#692BBA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function DataIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#8ABFB2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function WriteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#DDA01F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}
