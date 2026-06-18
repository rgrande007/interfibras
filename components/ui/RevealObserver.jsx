'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Mark all reveals as visible immediately if reduced motion is preferred
    if (mq.matches) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => el.classList.add('visible'))
      return
    }

    // Add class that gates the hide-until-visible CSS rule
    document.body.classList.add('js-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
