import Link from 'next/link'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import { CONTACT_EMAIL, MAILTO_GERAL } from '@/lib/mailto'

const identidade = [
  {
    rotulo: 'O que somos',
    valor: 'Grupo de Pesquisa',
    desc: 'Biopolímeros e Interfaces',
    cor: '#4BAF92',
  },
  {
    rotulo: 'Financiamento',
    valor: 'FAPESP',
    desc: 'Jovem Pesquisador · Processo 2023/03039-7',
    cor: '#692BBA',
  },
  {
    rotulo: 'Sede',
    valor: 'EESC-USP',
    desc: 'Dep. de Materiais (SMM) · São Carlos, SP',
    cor: '#8ABFB2',
  },
  {
    rotulo: 'Status',
    valor: 'Em formação',
    desc: 'Primeiros integrantes sendo selecionados agora',
    cor: '#DDA01F',
  },
]


export default function SobreOGrupo() {
  return (
    <section id="sobre" className="section-padding bg-neutro relative overflow-hidden section-grad-border-top">

      {/* Dot pattern sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,37,36,0.04) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">

        {/* ── Cabeçalho da seção ───────────────────────────────── */}
        <div className="reveal max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="block w-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="label-sm" style={{ color: '#1d7358' }}>O INTERFIBRAS</span>
          </div>
          <h2 className="display-lg text-verde-profundo mb-5">
            Um grupo de pesquisa em biopolímeros e interfaces.
          </h2>
          <p className="body-base text-verde-profundo/72 max-w-2xl">
            O INTERFIBRAS é um grupo de pesquisa experimental sediado no Departamento de
            Materiais da EESC-USP, financiado pelo Programa Jovem Pesquisador em Centros
            Emergentes da FAPESP. Investigamos como organizar biopolímeros naturais —
            celulose, quitina e celulose bacteriana — em fibras, filmes e revestimentos
            de base natural.
          </p>
        </div>

        {/* ── Cards de identidade ───────────────────────────────── */}
        <div className="mb-14 reveal reveal-delay-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {identidade.map((item) => (
              <div
                key={item.rotulo}
                className="rounded-2xl px-5 py-5 flex flex-col gap-1.5"
                style={{
                  background: `${item.cor}08`,
                  border: `1px solid ${item.cor}28`,
                }}
              >
                <span
                  className="font-inter text-xs font-bold uppercase tracking-widest"
                  style={{ color: `${item.cor}99` }}
                >
                  {item.rotulo}
                </span>
                <span
                  className="font-sora font-black leading-tight"
                  style={{
                    color: item.cor,
                    fontSize: item.valor.length > 10 ? '1.1rem' : '1.35rem',
                  }}
                >
                  {item.valor}
                </span>
                <p className="font-inter text-xs leading-relaxed text-verde-profundo/65">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Coordenação ───────────────────────────────────────── */}
        <div className="mb-14 reveal reveal-delay-1">
          <p className="label-sm text-verde-profundo/55 mb-6">Coordenação</p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">

            {/* Foto */}
            <div
              className="relative rounded-2xl overflow-hidden shrink-0 animate-float-gentle"
              style={{
                width: '200px',
                aspectRatio: '3/4',
                boxShadow: '0 8px 40px rgba(7,37,36,0.14)',
                border: '1px solid rgba(7,37,36,0.08)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px z-10"
                style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)', opacity: 0.7 }}
                aria-hidden="true"
              />
              <img
                src="/imagens/equipe/rafael-grande.gif"
                alt="Dr. Rafael Grande, Coordenador do grupo INTERFIBRAS"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-4"
                style={{ background: 'linear-gradient(to top, rgba(7,37,36,0.70) 0%, transparent 100%)' }}
              >
                <p className="font-sora font-bold text-white text-sm leading-snug">
                  Dr. Rafael Grande
                </p>
                <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  Coordenador científico · INTERFIBRAS
                </p>
              </div>
            </div>

            {/* Fichas de credibilidade */}
            <div className="flex flex-col gap-4 flex-1 min-w-0">

              {/* Nome + links */}
              <div
                className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
                style={{
                  background: 'rgba(75,175,146,0.05)',
                  border: '1px solid rgba(75,175,146,0.20)',
                }}
              >
                <div>
                  <p className="font-sora font-semibold text-sm text-verde-profundo">
                    Dr. Rafael Grande
                  </p>
                  <p className="font-inter text-xs text-verde-profundo/58">
                    Coordenador científico · Jovem Pesquisador FAPESP
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <a
                    href="http://lattes.cnpq.br/2232805898804829"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-xs font-semibold transition-opacity hover:opacity-75"
                    style={{ color: '#4BAF92' }}
                  >
                    Lattes ↗
                  </a>
                  <a
                    href="https://orcid.org/0000-0001-7817-3698"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-xs font-semibold transition-opacity hover:opacity-75"
                    style={{ color: '#4BAF92' }}
                  >
                    ORCID ↗
                  </a>
                </div>
              </div>

              {/* Financiamento + Sede */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(75,175,146,0.05)',
                  border: '1px solid rgba(75,175,146,0.20)',
                }}
              >
                <p className="label-sm text-verde-profundo/55 mb-2">Financiamento</p>
                <p className="font-sora font-semibold text-sm mb-0.5" style={{ color: '#072524' }}>
                  Programa Jovem Pesquisador em Centros Emergentes
                </p>
                <p className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.58)' }}>
                  FAPESP · Processo 2023/03039-7
                </p>

                <div
                  className="h-px my-4"
                  style={{ background: 'rgba(75,175,146,0.20)' }}
                  aria-hidden="true"
                />

                <p className="label-sm text-verde-profundo/55 mb-2">Sede do projeto</p>
                <p className="font-sora font-semibold text-sm mb-0.5" style={{ color: '#072524' }}>
                  EESC-USP · São Carlos, SP
                </p>
                <p className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.58)' }}>
                  Departamento de Materiais (SMM)
                </p>
              </div>

              {/* Track record do coordenador */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(75,175,146,0.05)',
                  border: '1px solid rgba(75,175,146,0.20)',
                }}
              >
                <p className="label-sm text-verde-profundo/55 mb-3">Histórico de pesquisa</p>
                <div className="space-y-2">
                  {[
                    { dado: '20+', desc: 'artigos publicados em periódicos internacionais' },
                    { dado: '600+', desc: 'citações acumuladas (Google Scholar)' },
                    { dado: 'Pós-doc', desc: 'Aalto University (Finlândia) — materiais celulósicos' },
                  ].map((item) => (
                    <div key={item.dado} className="flex items-baseline gap-2">
                      <span className="font-sora font-black text-sm shrink-0" style={{ color: '#4BAF92' }}>{item.dado}</span>
                      <span className="font-inter text-xs text-verde-profundo/65 leading-snug">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contato */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={MAILTO_GERAL}
                  className="font-inter text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                  style={{ color: '#1d7358' }}
                >
                  {CONTACT_EMAIL}
                </a>
                <CopyEmailButton
                  className="font-inter text-xs font-semibold rounded-full px-3 py-1 transition-all duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    background: 'rgba(75,175,146,0.09)',
                    border: '1px solid rgba(75,175,146,0.28)',
                    color: '#1d7358',
                  }}
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
