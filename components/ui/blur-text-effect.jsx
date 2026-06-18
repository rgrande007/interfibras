'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * BlurTextEffect — anima cada caractere com blur + fade (bloco)
 * ou apenas fade staggerado (inline, para texto com gradient-clip).
 *
 * Props:
 *   children        string    — texto a animar
 *   className       string    — classes no container externo
 *   style           object    — estilos inline no container externo
 *   inline          bool      — usa display:inline nos chars (p/ gradient-clip)
 *   delay           number    — delay inicial em segundos
 *   stagger         number    — intervalo entre chars em segundos
 *   triggerOnScroll bool      — dispara ao entrar no viewport (p/ seções com .reveal)
 */
export function BlurTextEffect({
  children,
  className = '',
  style = {},
  inline = false,
  delay = 0,
  stagger = 0.018,
  triggerOnScroll = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    function animate(extraDelay = 0) {
      const chars = el.querySelectorAll('.bte-char')
      if (inline) {
        gsap.set(chars, { opacity: 0 })
        gsap.to(chars, {
          opacity: 1,
          duration: 0.28,
          ease: 'power2.out',
          stagger,
          delay: delay + extraDelay,
        })
      } else {
        gsap.set(chars, { opacity: 0, y: 8, filter: 'blur(7px)' })
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.35,
          ease: 'power2.out',
          stagger,
          delay: delay + extraDelay,
          clearProps: 'filter',
        })
      }
    }

    if (triggerOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animate(0.74)
            observer.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      animate()
    }
  }, [children, inline, delay, stagger, triggerOnScroll])

  return (
    <span
      ref={ref}
      className={`${inline ? '' : 'inline-block'} ${className}`}
      style={style}
    >
      {children.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="bte-char"
          style={{
            display: inline ? 'inline' : 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}
