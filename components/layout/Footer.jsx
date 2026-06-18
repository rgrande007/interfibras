import Link from 'next/link'
import LogoMark from '@/components/ui/LogoMark'

const navLinks = [
  { href: '/#sobre',        label: 'SOBRE' },
  { href: '/#pesquisa',     label: 'PESQUISA' },
  { href: '/equipe',        label: 'EQUIPE' },
  { href: '/publicacoes',   label: 'PUBLICAÇÕES' },
  { href: '/noticias',      label: 'NOTÍCIAS' },
  { href: '/oportunidades', label: 'OPORTUNIDADES' },
  { href: '/contato',       label: 'CONTATO' },
]

export default function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 50%, #0f2d28 100%)' }}
    >
      {/* Orb jade — topo direito */}
      <div
        className="absolute pointer-events-none animate-orb-drift-1"
        style={{
          top: '-30%', right: '-4%',
          width: '38vw', height: '38vw',
          maxWidth: '420px', maxHeight: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,175,146,0.10) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />
      {/* Orb violeta — baixo esquerdo */}
      <div
        className="absolute pointer-events-none animate-orb-drift-2"
        style={{
          bottom: '-20%', left: '-3%',
          width: '32vw', height: '32vw',
          maxWidth: '350px', maxHeight: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(105,43,186,0.10) 0%, transparent 65%)',
          filter: 'blur(45px)',
        }}
        aria-hidden="true"
      />

      {/* Linha gradiente no topo — animada */}
      <div
        className="h-px w-full section-grad-border-top"
        style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA, #4BAF92)', backgroundSize: '200% 100%', animation: 'gradient-shift 4s ease infinite' }}
        aria-hidden="true"
      />

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoMark />
              <span className="font-sora font-bold text-base tracking-widest text-white">
                INTERFIBRAS
              </span>
            </div>
            <p className="text-white/72 text-sm leading-relaxed font-inter mb-1">
              Grupo de Pesquisa em Materiais Sustentáveis,<br />Interfaces e Biofabricação
            </p>
            <p className="text-white/55 text-xs font-inter">
              Da natureza, para o futuro.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-sora font-semibold text-xs uppercase tracking-widest mb-4"
              style={{
                background: 'linear-gradient(135deg, #4BAF92, #8ABFB2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/72 hover:text-verde-jade text-sm font-inter transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3
              className="font-sora font-semibold text-xs uppercase tracking-widest mb-4"
              style={{
                background: 'linear-gradient(135deg, #4BAF92, #8ABFB2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Institucional
            </h3>
            <address className="not-italic space-y-1.5 text-white/68 text-sm font-inter leading-relaxed">
              <p className="font-semibold text-white/85">Universidade de São Paulo</p>
              <p>Escola de Engenharia de São Carlos (EESC)</p>
              <p>Departamento de Materiais · SMM</p>
              <p>São Carlos, SP</p>
              <p className="pt-2">Laboratório de Biopolímeros e Biomateriais</p>
              <p>
                Coordenação:{' '}
                <span className="text-white/80 font-medium">Dr. Rafael Grande</span>
              </p>
            </address>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-2 text-xs border rounded-full px-3 py-1 font-inter"
                style={{
                  color: '#4BAF92',
                  borderColor: 'rgba(75,175,146,0.28)',
                  background: 'rgba(75,175,146,0.07)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: 'linear-gradient(135deg, #4BAF92, #692BBA)' }}
                  aria-hidden="true"
                />
                Jovem Pesquisador FAPESP · Proc. 2023/03039-7
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://orcid.org/0000-0001-7817-3698"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-inter text-xs text-white/65 hover:text-verde-jade transition-colors duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-2.086 5.083c.56 0 1.017.452 1.017 1.01 0 .559-.457 1.01-1.017 1.01-.56 0-1.017-.451-1.017-1.01 0-.558.457-1.01 1.017-1.01zM9 9.75h1.5v9.167H9V9.75zm4.5 0h1.5v1.083h.021c.208-.394.534-.74.978-.996.443-.257.964-.385 1.565-.385 1.67 0 2.5 1.105 2.5 3.313v5.952h-1.5v-5.594c0-1.564-.547-2.344-1.642-2.344-.63 0-1.122.226-1.476.677-.354.452-.531 1.039-.531 1.761v5.5H13.5V9.75z"/>
                </svg>
                ORCID
              </a>
              <a
                href="http://lattes.cnpq.br/2232805898804829"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-xs text-white/65 hover:text-verde-jade transition-colors duration-200"
              >
                Lattes ↗
              </a>
              <a
                href="mailto:rafaelgrande@usp.br"
                className="inline-flex items-center gap-1.5 font-inter text-xs text-white/65 hover:text-verde-jade transition-colors duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                rafaelgrande@usp.br
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row justify-between items-center gap-2
                        text-white/55 text-xs font-inter">
          <p>© {new Date().getFullYear()} INTERFIBRAS · Universidade de São Paulo</p>
          <p>Projeto Jovem Pesquisador FAPESP · Processo 2023/03039-7</p>
        </div>
      </div>
    </footer>
  )
}

