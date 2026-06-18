import Hero from '@/components/home/Hero'
import Coordenador from '@/components/home/Coordenador'
import Pesquisa from '@/components/home/Pesquisa'
import ComoEPesquisar from '@/components/home/ComoEPesquisar'
import OportunidadesPreview from '@/components/home/OportunidadesPreview'
import EquipePreview from '@/components/home/EquipePreview'
import NoticiasPreview from '@/components/home/NoticiasPreview'
import RevealObserver from '@/components/ui/RevealObserver'

import {
  getAllEquipe,
  getDestaqueOportunidades,
  getDestaquePosts,
} from '@/lib/content'

function SectionDivider({ variant = 'jade' }) {
  const gradient = variant === 'violet'
    ? 'linear-gradient(to right, transparent, rgba(105,43,186,0.35) 30%, rgba(75,175,146,0.25) 70%, transparent)'
    : 'linear-gradient(to right, transparent, rgba(75,175,146,0.30) 30%, rgba(105,43,186,0.22) 70%, transparent)'

  return (
    <div
      aria-hidden="true"
      style={{ height: '1px', background: gradient }}
    />
  )
}

export default function HomePage() {
  const equipe = getAllEquipe()
  const oportunidades = getDestaqueOportunidades()
  const posts = getDestaquePosts(2)

  return (
    <>
      <RevealObserver />

      {/* 1 — Hero */}
      <Hero />
      <SectionDivider />

      {/* 2 — Por que o INTERFIBRAS existe */}
      <Coordenador />
      <SectionDivider />

      {/* 3 — O que investigamos */}
      <Pesquisa />
      <SectionDivider variant="violet" />

      {/* 4 — Como é pesquisar aqui */}
      <ComoEPesquisar />
      <SectionDivider />

      {/* 5 — Faça parte do grupo */}
      <OportunidadesPreview oportunidades={oportunidades} />
      <SectionDivider />

      {/* 6 — Quem somos */}
      <EquipePreview membros={equipe} />
      <SectionDivider />

      {/* 7 — Notícias e próximos marcos */}
      <NoticiasPreview posts={posts} />
    </>
  )
}
