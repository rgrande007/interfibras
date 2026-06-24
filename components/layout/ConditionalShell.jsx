'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import BackToTop from '../ui/BackToTop'

export default function ConditionalShell({ children }) {
  const pathname = usePathname()
  const isPortal = pathname.startsWith('/portal')

  if (isPortal) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
