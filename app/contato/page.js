import Link from 'next/link'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import { CONTACT_EMAIL, MAILTO_IC, MAILTO_MESTRADO, MAILTO_TCC, MAILTO_PARCERIA } from '@/lib/mailto'

const MAILTO_MAP = {
  IC: MAILTO_IC,
  MESTRADO: MAILTO_MESTRADO,
  TCC: MAILTO_TCC,
  PARCERIA: MAILTO_PARCERIA,
}

export const metadata = {
  title: 'Contato | INTERFIBRAS',
  description: 'Entre em contato com o grupo INTERFIBRAS: Iniciação Científica, Mestrado, parcerias e colaborações institucionais.',
}

const PERFIS_DATA = [
  {
    titulo: 'Estudantes de graduação',
    subtitulo: 'Iniciação Científica (IC) com bolsa FAPESP',
    descricao:
      'Estamos selecionando estudantes de cursos como Engenharia de Materiais, Química, Física, Biotecnologia e áreas afins para integrar o grupo como pesquisadores de IC.',
    cor: '#4BAF92',
    bg: 'rgba(75,175,146,0.08)',
    border: 'rgba(75,175,146,0.22)',
    ctaLabel: 'Tenho interesse em iniciação científica',
    ctaMailtoKey: 'IC',
    incluir: [
      'Currículo (preferencialmente Lattes)',
      'Histórico escolar atualizado',
      'Breve motivação (de 2 a 3 parágrafos) sobre por que deseja participar',
      'Período disponível para início',
    ],
  },
  {
    titulo: 'Candidatos a Mestrado',
    subtitulo: 'Programa de Pós-Graduação em Ciência e Engenharia de Materiais (PPGCEM-USP)',
    descricao:
      'Recebemos candidatos interessados em desenvolver dissertação no grupo. As vagas são vinculadas ao Projeto Jovem Pesquisador FAPESP e incluem processo seletivo pela EESC-USP.',
    cor: '#692BBA',
    bg: 'rgba(105,43,186,0.08)',
    border: 'rgba(105,43,186,0.22)',
    ctaLabel: 'Tenho interesse em mestrado',
    ctaMailtoKey: 'MESTRADO',
    incluir: [
      'Currículo Lattes',
      'Histórico escolar (graduação e pós, se aplicável)',
      'Carta de motivação com tema de interesse',
      'Publicações ou trabalhos científicos anteriores (se houver)',
    ],
  },
  {
    titulo: 'TCC e estágios acadêmicos',
    subtitulo: 'Trabalhos de conclusão de curso orientados pelo grupo',
    descricao:
      'Estudantes interessados em desenvolver TCC ou estágio de pesquisa no INTERFIBRAS podem entrar em contato para verificar disponibilidade e temas em andamento.',
    cor: '#8ABFB2',
    bg: 'rgba(138,191,178,0.10)',
    border: 'rgba(138,191,178,0.25)',
    ctaLabel: 'Tenho interesse em desenvolver meu TCC aqui',
    ctaMailtoKey: 'TCC',
    incluir: [
      'Histórico escolar',
      'Descrição do curso e semestre atual',
      'Área de interesse',
    ],
  },
  {
    titulo: 'Parcerias e colaborações',
    subtitulo: 'Grupos de pesquisa, empresas e institutos',
    descricao:
      'O INTERFIBRAS está aberto a colaborações acadêmicas e industriais nas áreas de materiais celulósicos, biopolímeros e sustentabilidade. Entre em contato descrevendo o interesse e o contexto da colaboração.',
    cor: '#DDA01F',
    bg: 'rgba(221,160,31,0.08)',
    border: 'rgba(221,160,31,0.22)',
    ctaLabel: 'Entrar em contato sobre parceria',
    ctaMailtoKey: 'PARCERIA',
    incluir: [
      'Nome e afiliação institucional',
      'Descrição do interesse de colaboração',
      'Referências ou trabalhos anteriores (se aplicável)',
    ],
  },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F1F2EF' }}>

      {/* ── Cabeçalho ───────────────────────────────────────────── */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #072524 0%, #0c3330 55%, #1a4540 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', right: '-4%',
            width: '40vw', height: '40vw', maxWidth: '450px', maxHeight: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(75,175,146,0.13) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
          aria-hidden="true"
        />

        <div className="container-narrow relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-sm transition-colors mb-8"
            style={{ color: 'rgba(75,175,146,0.70)' }}
          >
            ← Início
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="block w-6 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="font-inter text-xs font-semibold uppercase tracking-widest" style={{ color: '#4BAF92' }}>
              Contato
            </span>
          </div>

          <h1
            className="font-sora font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Entre em contato.
          </h1>
          <p className="font-inter text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.7' }}>
            Seja para participar do grupo, propor uma colaboração ou tirar dúvidas sobre a pesquisa.
            Leia as orientações abaixo antes de enviar a mensagem: isso acelera o retorno.
          </p>
        </div>
      </div>

      <div className="container-narrow py-12">

        {/* ── E-mail do grupo ──────────────────────────── */}
        <div
          className="rounded-2xl p-8 mb-12 bg-white"
          style={{ border: '1px solid rgba(7,37,36,0.08)', boxShadow: '0 2px 20px rgba(7,37,36,0.06)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(75,175,146,0.10)', border: '1.5px solid rgba(75,175,146,0.28)' }}
              aria-hidden="true"
            >
              <EmailIcon />
            </div>
            <div className="flex-1">
              <p className="font-inter text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#4BAF92' }}>
                E-mail do grupo
              </p>
              <p className="font-sora font-bold text-verde-profundo text-lg mb-1">
                Dr. Rafael Grande, Coordenador
              </p>
              <p className="font-inter text-sm mb-3" style={{ color: 'rgba(7,37,36,0.55)' }}>
                Jovem Pesquisador FAPESP · EESC-USP · São Carlos, SP
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-inter text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                  style={{ color: '#1a6b55' }}
                >
                  {CONTACT_EMAIL}
                </a>
                <CopyEmailButton
                  className="font-inter text-xs font-semibold rounded-full px-3 py-1 transition-all duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    background: 'rgba(75,175,146,0.09)',
                    border: '1px solid rgba(75,175,146,0.28)',
                    color: '#1a6b55',
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="http://lattes.cnpq.br/2232805898804829"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold rounded-full px-4 py-2 transition-opacity hover:opacity-75"
                style={{ background: 'rgba(7,37,36,0.06)', border: '1px solid rgba(7,37,36,0.14)', color: '#072524' }}
              >
                Lattes ↗
              </a>
              <a
                href="https://orcid.org/0000-0001-7817-3698"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold rounded-full px-4 py-2 transition-opacity hover:opacity-75"
                style={{ background: 'rgba(75,175,146,0.10)', border: '1px solid rgba(75,175,146,0.28)', color: '#2d8a72' }}
              >
                ORCID ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Perfis de contato ───────────────────────────── */}
        <div className="mb-6">
          <h2 className="font-sora font-bold text-verde-profundo text-xl mb-2">
            Quem pode entrar em contato?
          </h2>
          <p className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.55)', lineHeight: '1.65' }}>
            Leia o perfil que melhor descreve sua situação e inclua as informações solicitadas na mensagem.
            Isso facilita a análise e agiliza o retorno.
          </p>
        </div>

        <div className="space-y-5 mb-14">
          {PERFIS_DATA.map((perfil) => (
            <div
              key={perfil.titulo}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${perfil.border}`, boxShadow: '0 2px 12px rgba(7,37,36,0.04)' }}
            >
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${perfil.cor}, transparent)` }} aria-hidden="true" />
              <div className="p-7">
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: perfil.bg, border: `1px solid ${perfil.border}` }}
                    aria-hidden="true"
                  >
                    <span className="font-sora font-black text-sm" style={{ color: perfil.cor }}>
                      {perfil.titulo.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sora font-bold text-verde-profundo text-base mb-0.5">
                      {perfil.titulo}
                    </h3>
                    <p className="font-inter text-xs font-semibold mb-3" style={{ color: perfil.cor }}>
                      {perfil.subtitulo}
                    </p>
                    <p className="font-inter text-sm text-verde-profundo/65 leading-relaxed mb-4">
                      {perfil.descricao}
                    </p>

                    <div
                      className="rounded-xl p-4 mb-4"
                      style={{ background: perfil.bg, border: `1px solid ${perfil.border}` }}
                    >
                      <p className="font-inter text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: perfil.cor }}>
                        Inclua na mensagem
                      </p>
                      <ul className="space-y-1.5">
                        {perfil.incluir.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ background: perfil.cor }} aria-hidden="true" />
                            <span className="font-inter text-xs text-verde-profundo/65">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={MAILTO_MAP[perfil.ctaMailtoKey]}
                      className="inline-flex items-center gap-2 font-inter text-xs font-semibold rounded-lg px-4 py-2.5 transition-all duration-200 hover:opacity-80"
                      style={{
                        background: perfil.bg,
                        border: `1.5px solid ${perfil.border}`,
                        color: perfil.cor,
                      }}
                    >
                      <EmailSmallIcon color={perfil.cor} />
                      {perfil.ctaLabel} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Institucional ───────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #072524 0%, #0c3330 60%, #0f2a4a 100%)',
            border: '1px solid rgba(75,175,146,0.20)',
          }}
        >
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-inter text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4BAF92' }}>
                Localização
              </p>
              <address className="not-italic space-y-1.5 font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.65' }}>
                <p className="text-white font-semibold">Escola de Engenharia de São Carlos (EESC)</p>
                <p>Departamento de Materiais (SMM)</p>
                <p>Universidade de São Paulo</p>
                <p>São Carlos, SP · Brasil</p>
              </address>
            </div>
            <div>
              <p className="font-inter text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4BAF92' }}>
                Financiamento
              </p>
              <div className="space-y-1.5 font-inter text-sm" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.65' }}>
                <p className="text-white font-semibold">Projeto Jovem Pesquisador FAPESP</p>
                <p>Processo 2023/03039-7</p>
                <p>Programa Jovem Pesquisador em Centros Emergentes</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/oportunidades"
                  className="font-inter text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#4BAF92' }}
                >
                  Ver vagas abertas →
                </Link>
                <Link
                  href="/#sobre"
                  className="font-inter text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(138,191,178,0.75)' }}
                >
                  Conhecer o coordenador →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#4BAF92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function EmailSmallIcon({ color = '#4BAF92' }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
