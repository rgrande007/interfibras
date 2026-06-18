const pilares = [
  {
    num: '01',
    titulo: 'Entender',
    texto:
      'Investigamos como nanoblocos naturais interagem, se dispersam e formam redes. Antes de organizar a matéria, precisamos compreender seu comportamento nas interfaces.',
    accentColor: '#4BAF92',
    icon: <MicroscopeIcon color="#4BAF92" />,
  },
  {
    num: '02',
    titulo: 'Organizar',
    texto:
      'Usamos interfaces, filmes, membranas e fiação para controlar a estrutura dos materiais. A organização em diferentes escalas define propriedades e funções.',
    accentColor: '#692BBA',
    icon: <GridIcon color="#692BBA" />,
  },
  {
    num: '03',
    titulo: 'Biofabricar',
    texto:
      'Cultivamos materiais que crescem, não apenas materiais que são fabricados. A celulose bacteriana permite criar estruturas renováveis, funcionais e adaptáveis.',
    accentColor: '#c8860e',
    icon: <FlaskIcon color="#c8860e" />,
  },
]

export default function ComoPensamos() {
  return (
    <section
      id="como-pensamos"
      className="section-padding bg-neutro relative overflow-hidden"
    >
      {/* Orb jade suave */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          maxWidth: '520px',
          maxHeight: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.08) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          right: '-5%',
          width: '35vw',
          height: '35vw',
          maxWidth: '420px',
          maxHeight: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
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

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Coluna esquerda */}
          <div className="lg:col-span-4 reveal">
            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="w-8 h-0.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
                aria-hidden="true"
              />
              <span className="label-sm" style={{ color: '#1d7358' }}>Como pensamos a pesquisa</span>
            </div>

            <h2 className="display-lg text-verde-profundo mb-4">
              Três princípios que guiam a pesquisa.
            </h2>

            <p
              className="font-inter text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(7,37,36,0.55)', maxWidth: '30ch' }}
            >
              Do comportamento dos nanoblocos à formação de materiais, cada frente do INTERFIBRAS
              parte da mesma lógica: compreender, organizar e construir.
            </p>

            {/* Linha vertical de progresso */}
            <div className="flex flex-col">
              {pilares.map((p, i) => (
                <div key={p.num} className="flex gap-3.5">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0 mt-1"
                      style={{ background: p.accentColor }}
                    />
                    {i < pilares.length - 1 && (
                      <div
                        className="w-px flex-1 my-1"
                        style={{
                          minHeight: '28px',
                          background: `linear-gradient(to bottom, ${p.accentColor}50, ${pilares[i + 1].accentColor}20)`,
                        }}
                      />
                    )}
                  </div>
                  <div className={i < pilares.length - 1 ? 'pb-7' : ''}>
                    <span
                      className="font-inter text-xs font-semibold"
                      style={{ color: p.accentColor, opacity: 0.82 }}
                    >
                      {p.titulo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita — princípios */}
          <div className="lg:col-span-8">
            <ol className="space-y-0">
              {pilares.map((p, i) => (
                <li
                  key={p.num}
                  className={`reveal reveal-delay-${i + 1} flex gap-6 py-8 relative`}
                  style={{
                    borderBottom: i < pilares.length - 1
                      ? '1px solid rgba(7,37,36,0.08)'
                      : 'none',
                  }}
                >
                  {/* Ícone + número */}
                  <div className="flex flex-col items-center gap-2.5 shrink-0 pt-1">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${p.accentColor}14`,
                        border: `1px solid ${p.accentColor}35`,
                      }}
                      aria-hidden="true"
                    >
                      {p.icon}
                    </div>
                    <span
                      className="font-sora font-black text-xl leading-none select-none"
                      style={{
                        background: `linear-gradient(135deg, ${p.accentColor}88, ${p.accentColor}33)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                      aria-hidden="true"
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 pl-4 relative">
                    <div
                      className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${p.accentColor}, transparent)` }}
                      aria-hidden="true"
                    />
                    <h3 className="display-md text-verde-profundo mb-2.5">{p.titulo}</h3>
                    <p className="body-base text-verde-profundo/75">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* CTA para Equipe */}
        <div className="mt-12 pt-8 reveal" style={{ borderTop: '1px solid rgba(7,37,36,0.08)' }}>
          <a
            href="/#equipe"
            className="inline-flex items-center gap-2.5 font-sora font-semibold text-sm transition-opacity duration-200 hover:opacity-70"
            style={{ color: '#1d7358' }}
          >
            Conheça a equipe →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Ícones ─────────────────────────────────────────── */

function MicroscopeIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18h8" />
      <path d="M3 21h18" />
      <path d="M14 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
      <path d="M10 3L8 5l4 4-2 2 4 4 4-4-2-2 4-4-2-2z" />
    </svg>
  )
}

function GridIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function FlaskIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6" />
      <path d="M10 3v7L4 20h16L14 10V3" />
      <path d="M6 16h12" />
    </svg>
  )
}
