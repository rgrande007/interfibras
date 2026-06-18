'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoMark from '@/components/ui/LogoMark'

const navLinks = [
  { href: '/#sobre',           label: 'SOBRE' },
  { href: '/#pesquisa',        label: 'PESQUISA' },
  { href: '/#como-pesquisar',  label: 'FORMAÇÃO' },
  { href: '/#oportunidades',   label: 'OPORTUNIDADES' },
  { href: '/#equipe',          label: 'EQUIPE' },
  { href: '/#noticias',        label: 'NOTÍCIAS' },
  { href: '/contato',          label: 'CONTATO' },
]

const SECTION_IDS = navLinks
  .filter((l) => l.href.startsWith('/#'))
  .map((l) => l.href.slice(2))

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (pathname !== '/') { setActiveSection(''); return }

    function update() {
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 90) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [pathname])

  const isHome = pathname === '/'
  const darkMode = isHome && !scrolled

  const textMuted = darkMode ? 'text-white/70' : 'text-verde-profundo/72'
  const textHover = darkMode ? 'hover:text-white' : 'hover:text-verde-profundo'

  function isActive(href) {
    if (href.startsWith('/#')) return activeSection === href.slice(2)
    return pathname === href
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm shadow-black/6 border-b border-gray-100'
          : darkMode
            ? 'bg-transparent'
            : 'bg-white/75 backdrop-blur-xl border-b border-black/6 shadow-sm shadow-black/4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* ── Logo: LogoMark + INTERFIBRAS ────── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="INTERFIBRAS, início">
            <LogoMark size="sm" />
            <span
              className={`font-sora text-[0.92rem] font-bold tracking-widest transition-colors duration-300 ${
                darkMode
                  ? 'text-white group-hover:text-verde-jade'
                  : 'text-verde-profundo group-hover:text-verde-jade'
              }`}
            >
              INTERFIBRAS
            </span>
          </Link>

          {/* ── Desktop nav ──────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-wrapper relative px-4 py-2 text-[0.76rem] tracking-widest rounded-lg
                              transition-all duration-200 font-inter font-medium
                              ${active
                                ? darkMode ? 'text-white' : 'text-verde-jade'
                                : `${textMuted} ${textHover}`
                              }
                              ${darkMode ? 'hover:bg-white/8' : 'hover:bg-black/5'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  <span
                    className="nav-link-indicator"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))'
                        : 'linear-gradient(90deg, #4BAF92, #692BBA)',
                    }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Hamburger mobile ─────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col gap-[5px] p-3 rounded-lg transition-colors"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  darkMode ? 'bg-white' : 'bg-verde-profundo'
                } ${
                  i === 0 && menuOpen ? 'rotate-45 translate-y-[7px]' :
                  i === 1 && menuOpen ? 'opacity-0 scale-x-0' :
                  i === 2 && menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 top-16 transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(160deg, #072524 0%, #0c3330 60%, #1a1440 100%)' }}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(75,175,146,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
        <nav className="relative flex flex-col px-6 pt-8 gap-0" aria-label="Navegação mobile">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-4 text-base font-inter font-medium tracking-widest text-white/65
                         hover:text-verde-jade border-b border-white/8 transition-colors duration-200"
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <p className="mt-10 font-inter text-xs text-white/25 text-center">
            Grupo de Pesquisa · USP · São Carlos
          </p>
        </nav>
      </div>
    </header>
  )
}

