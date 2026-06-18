'use client'

import { useEffect, useState, useRef } from 'react'

export default function BackToTop() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    const toggle = () => {
      const shouldShow = window.scrollY > 500

      if (shouldShow) {
        clearTimeout(timeoutRef.current)
        if (!mountedRef.current) {
          mountedRef.current = true
          setMounted(true)
          requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
        } else {
          setVisible(true)
        }
      } else {
        setVisible(false)
        timeoutRef.current = setTimeout(() => {
          mountedRef.current = false
          setMounted(false)
        }, 280)
      }
    }

    window.addEventListener('scroll', toggle, { passive: true })
    return () => {
      window.removeEventListener('scroll', toggle)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!mounted) return null

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollTop}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
                 hover:scale-110 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-verde-jade focus:ring-offset-2"
      style={{
        background: 'linear-gradient(135deg, #4BAF92 0%, #692BBA 100%)',
        boxShadow: '0 4px 20px rgba(75,175,146,0.40), 0 2px 8px rgba(0,0,0,0.20)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(10px) scale(0.82)',
        transition: 'opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <polyline
          points="2,10 8,4 14,10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
