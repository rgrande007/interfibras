import Link from 'next/link'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import { CONTACT_EMAIL, MAILTO_GERAL } from '@/lib/mailto'

const fatos = [
  {
    rotulo: 'Escala do problema',
    dado: '~8 bilhões t',
    desc: 'de plástico acumuladas no ambiente desde 1950',
    cor: '#DDA01F',
  },
  {
    rotulo: 'Dependência fóssil',
    dado: '+90%',
    desc: 'dos polímeros sintéticos em uso hoje têm origem em recursos fósseis',
    cor: '#692BBA',
  },
  {
    rotulo: 'Matéria-prima queimada',
    dado: '~1,9 Gt',
    desc: 'de resíduos agrícolas gerados por ano — queimados ou enterrados, mas ricos em celulose, quitina e outros biopolímeros aproveitáveis',
    cor: '#4BAF92',
  },
]

const biopolimeros = [
  {
    nome: 'Celulose',
    origem: 'Madeira · algodão · bagaço de cana',
    descricao: 'O biopolímero mais abundante da Terra. Em escala nano, forma estruturas leves e resistentes para filmes, fibras e revestimentos.',
    cor: '#4BAF92',
  },
  {
    nome: 'Quitina e quitosana',
    origem: 'Carapaças de crustáceos · fungos',
    descricao: 'Biopolímeros com cargas superficiais favoráveis à formação de redes, filmes e materiais com propriedades ajustáveis.',
    cor: '#8ABFB2',
  },
  {
    nome: 'Celulose bacteriana',
    origem: 'Produzida por bactérias como Komagataeibacter',
    descricao: 'Cultivada, não extraída. Redes puras de celulose sem lignina, com alto potencial para reforço, membranas e biomateriais.',
    cor: '#DDA01F',
  },
]

export default function Coordenador() {
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

        {/* ── Ficha institucional ──────────────────────────────── */}
        <div className="reveal flex flex-wrap gap-2.5 mb-12">
          <div
            className="inline-flex items-start gap-2.5 rounded-xl px-4 py-3"
            style={{ background: 'rgba(75,175,146,0.07)', border: '1px solid rgba(75,175,146,0.22)' }}
          >
            <span
              className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: '#4BAF92' }}
              aria-hidden="true"
            />
            <div>
              <p className="font-sora font-bold text-xs leading-tight" style={{ color: '#1d7358' }}>
                Jovem Pesquisador FAPESP
              </p>
              <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(7,37,36,0.48)' }}>
                Proc. 2023/03039-7
              </p>
            </div>
          </div>
          <div
            className="inline-flex items-start gap-2.5 rounded-xl px-4 py-3"
            style={{ background: 'rgba(7,37,36,0.04)', border: '1px solid rgba(7,37,36,0.10)' }}
          >
            <div>
              <p className="font-sora font-bold text-xs leading-tight text-verde-profundo">
                EESC-USP
              </p>
              <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(7,37,36,0.48)' }}>
                Escola de Engenharia de São Carlos
              </p>
            </div>
          </div>
          <div
            className="inline-flex items-start gap-2.5 rounded-xl px-4 py-3"
            style={{ background: 'rgba(7,37,36,0.04)', border: '1px solid rgba(7,37,36,0.10)' }}
          >
            <div>
              <p className="font-sora font-bold text-xs leading-tight text-verde-profundo">
                Dep. de Materiais · SMM
              </p>
              <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(7,37,36,0.48)' }}>
                São Carlos, SP
              </p>
            </div>
          </div>
        </div>

        {/* ── Cabeçalho da seção ───────────────────────────────── */}
        <div className="reveal max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="block w-8 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #4BAF92, #692BBA)' }}
              aria-hidden="true"
            />
            <span className="label-sm" style={{ color: '#1d7358' }}>Por que o INTERFIBRAS existe</span>
          </div>
          <h2 className="display-lg text-verde-profundo mb-5">
            Ciência de materiais para reduzir a dependência de recursos fósseis.
          </h2>
          <p className="body-base text-verde-profundo/72 max-w-2xl mb-3">
            Filmes, embalagens, revestimentos, tintas e adesivos são materiais essenciais,
            mas muitos ainda dependem de recursos fósseis.
          </p>
          <p className="body-base text-verde-profundo/72 max-w-2xl">
            O INTERFIBRAS investiga outro caminho: organizar polímeros naturais em novas
            estruturas para reduzir essa dependência.
          </p>
        </div>

        {/* ── Fatos contextuais ─────────────────────────────────── */}
        <div className="mb-14 reveal reveal-delay-1">
          <p className="label-sm text-verde-profundo/55 mb-5">O desafio que nos move</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
            {fatos.map((f) => (
              <div
                key={f.dado}
                className="rounded-2xl px-6 py-5 flex flex-col gap-2"
                style={{
                  background: `${f.cor}08`,
                  border: `1px solid ${f.cor}28`,
                }}
              >
                <span
                  className="font-inter text-xs font-bold uppercase tracking-widest"
                  style={{ color: `${f.cor}99` }}
                >
                  {f.rotulo}
                </span>
                <span
                  className="font-sora font-black leading-none"
                  style={{
                    color: f.cor,
                    fontSize: f.dado.length > 4 ? '1.75rem' : '2.25rem',
                  }}
                >
                  {f.dado}
                </span>
                <p className="font-inter text-sm leading-relaxed text-verde-profundo/72">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="font-inter text-xs text-verde-profundo/40">
            Fontes: Geyer et al. (2017) · IEA (2022) · Xu et al. (2025, J. Bioresources & Bioproducts) · Koul et al. (2021, Environmental Research)
          </p>
        </div>

        {/* ── Grade principal: conteúdo + sidebar coordenador ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Coluna de conteúdo */}
          <div className="lg:col-span-7 reveal reveal-delay-1">

            {/* Biopolímeros */}
            <p className="label-sm text-verde-profundo/55 mb-5">
              De onde partimos
            </p>
            <div className="space-y-3 mb-10">
              {biopolimeros.map((b) => (
                <div
                  key={b.nome}
                  className="rounded-xl p-5 flex flex-col gap-2"
                  style={{
                    background: '#ffffff',
                    border: `1px solid ${b.cor}28`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: b.cor }}
                      aria-hidden="true"
                    />
                    <span className="font-sora font-bold text-sm text-verde-profundo">{b.nome}</span>
                    <span
                      className="font-inter text-xs font-medium rounded-full px-2.5 py-0.5"
                      style={{ background: `${b.cor}12`, border: `1px solid ${b.cor}28`, color: '#1a6b55' }}
                    >
                      {b.origem}
                    </span>
                  </div>
                  <p className="font-inter text-sm leading-relaxed text-verde-profundo/72">
                    {b.descricao}
                  </p>
                </div>
              ))}
            </div>

            {/* O desafio científico */}
            <div
              className="rounded-2xl p-6 mb-8 reveal reveal-delay-2"
              style={{
                background: 'rgba(75,175,146,0.06)',
                border: '1px solid rgba(75,175,146,0.20)',
              }}
            >
              <p className="label-sm text-verde-profundo/55 mb-3">O desafio científico</p>
              <p className="font-inter text-sm leading-relaxed text-verde-profundo/75 mb-3">
                Extraímos, purificamos e organizamos biopolímeros em escala nano e
                microscópica — criando filmes, fibras, membranas e revestimentos com
                propriedades controladas.
              </p>
              <p className="font-inter text-sm leading-relaxed text-verde-profundo/75">
                É nesse trabalho experimental, meticuloso e interdisciplinar que os próximos
                integrantes do INTERFIBRAS vão se formar.
              </p>
            </div>

          </div>

          {/* Coluna direita — sidebar de credibilidade */}
          <div className="lg:col-span-5 reveal reveal-delay-2 flex flex-col gap-6">

            {/* Foto + identificação */}
            <div
              className="relative rounded-2xl overflow-hidden mx-auto lg:mx-0 animate-float-gentle"
              style={{
                width: '100%',
                maxWidth: '285px',
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
                className="absolute inset-x-0 bottom-0 p-5"
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

            {/* Coordenador — referência compacta */}
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

            {/* Ficha do financiamento */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(75,175,146,0.05)',
                border: '1px solid rgba(75,175,146,0.20)',
              }}
            >
              <p className="label-sm text-verde-profundo/55 mb-3">Financiamento</p>
              <p className="font-sora font-semibold text-sm mb-1" style={{ color: '#072524' }}>
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

              <p className="label-sm text-verde-profundo/55 mb-3">Sede do projeto</p>
              <p className="font-sora font-semibold text-sm mb-1" style={{ color: '#072524' }}>
                EESC-USP · São Carlos, SP
              </p>
              <p className="font-inter text-sm" style={{ color: 'rgba(7,37,36,0.58)' }}>
                Departamento de Materiais (SMM)
              </p>
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
    </section>
  )
}
