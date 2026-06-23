'use client'
import { useState, useEffect } from 'react'

export default function ReadingProgress({ color = '#4BAF92' }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        height: '3px',
        width: '100%',
        background: `linear-gradient(90deg, ${color}, #692BBA)`,
        transform: `scaleX(${pct / 100})`,
        transformOrigin: 'left',
        transition: 'transform 80ms linear',
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    />
  )
}
