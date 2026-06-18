import { Sora, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'

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
  metadataBase: new URL('https://interfibras.vercel.app'),
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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-neutro text-verde-profundo antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
