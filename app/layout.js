import { Sora, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://interfibras.vercel.app'),
  title: 'INTERFIBRAS: Nanocelulose, Biopolímeros e Materiais Sustentáveis · USP',
  description:
    'Grupo de pesquisa em materiais sustentáveis: nanocelulose, fiação interfacial, filmes, membranas e biofabricação. Projeto Jovem Pesquisador FAPESP · SMM · EESC, Universidade de São Paulo.',
  keywords: [
    'nanocelulose',
    'nanoquitina',
    'biopolímeros',
    'materiais sustentáveis',
    'fiação por complexação interfacial',
    'biofabricação',
    'celulose bacteriana',
    'quitosana',
    'filmes de biopolímeros',
    'membranas sustentáveis',
    'USP',
    'FAPESP',
    'engenharia de materiais',
  ],
  openGraph: {
    title: 'INTERFIBRAS: Nanocelulose, Biopolímeros e Materiais Sustentáveis · USP',
    description:
      'Criamos filmes, fibras e membranas de base renovável a partir de celulose, quitina e biopolímeros naturais, sem solventes orgânicos, com processos inspirados pela própria natureza.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'INTERFIBRAS',
    images: [
      {
        url: '/imagens/posts/aprovacao-fapesp.svg',
        width: 1200,
        height: 630,
        alt: 'INTERFIBRAS — Grupo de Pesquisa em Materiais Sustentáveis · USP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTERFIBRAS: Materiais Sustentáveis',
    description:
      'Pesquisa em nanocelulose, fiação interfacial e biofabricação. Projeto Jovem Pesquisador FAPESP · USP.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ResearchOrganization',
      '@id': 'https://interfibras.vercel.app/#organization',
      name: 'INTERFIBRAS',
      description:
        'Grupo de pesquisa em materiais sustentáveis: nanocelulose, fiação por complexação interfacial, filmes, membranas e biofabricação. Projeto Jovem Pesquisador FAPESP · EESC-USP, São Carlos, SP.',
      url: 'https://interfibras.vercel.app',
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidade de São Paulo',
        alternateName: 'USP',
        url: 'https://www.usp.br',
        department: {
          '@type': 'Organization',
          name: 'Escola de Engenharia de São Carlos',
          alternateName: 'EESC-USP',
          department: { '@type': 'Organization', name: 'Departamento de Materiais (SMM)' },
        },
      },
      funder: {
        '@type': 'Organization',
        name: 'Fundação de Amparo à Pesquisa do Estado de São Paulo',
        alternateName: 'FAPESP',
        url: 'https://fapesp.br',
        identifier: '2023/03039-7',
      },
      member: {
        '@type': 'Person',
        '@id': 'https://interfibras.vercel.app/equipe#rafael-grande',
        name: 'Rafael Grande',
        honorificPrefix: 'Dr.',
      },
      knowsAbout: [
        'Nanocellulose',
        'Chitin nanocrystals',
        'Biopolymers',
        'Interfacial complexation spinning',
        'Biofabrication',
        'Bacterial cellulose',
        'Sustainable materials',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://interfibras.vercel.app/equipe#rafael-grande',
      name: 'Rafael Grande',
      honorificPrefix: 'Dr.',
      givenName: 'Rafael',
      familyName: 'Grande',
      jobTitle: 'Jovem Pesquisador FAPESP',
      affiliation: {
        '@type': 'Organization',
        name: 'Escola de Engenharia de São Carlos — Universidade de São Paulo',
        alternateName: 'EESC-USP',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'São Carlos',
          addressRegion: 'SP',
          addressCountry: 'BR',
        },
      },
      sameAs: [
        'https://orcid.org/0000-0001-7817-3698',
        'http://lattes.cnpq.br/2232805898804829',
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-neutro text-verde-profundo antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ConditionalShell>{children}</ConditionalShell>
        <Analytics />
      </body>
    </html>
  )
}
