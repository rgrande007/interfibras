'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion'

/**
 * InfiniteGridBg — grid de linhas infinitamente animado com reveal ao mouse.
 * Posicione como absolute inset-0 pointer-events-none dentro de uma section relative.
 *
 * Props:
 *   gridColor       string  — cor das linhas de base (rgba)
 *   highlightColor  string  — cor das linhas no reveal ao mouse (rgba)
 *   gridSize        number  — tamanho da célula em px (padrão 38)
 *   speed           number  — velocidade do movimento (padrão 0.35 px/frame)
 *   revealRadius    number  — raio do reveal circular ao mouse em px
 */
export function InfiniteGridBg({
  gridColor = 'rgba(7,37,36,0.055)',
  highlightColor = 'rgba(75,175,146,0.20)',
  gridSize = 38,
  speed = 0.35,
  revealRadius = 400,
}) {
  const ref = useRef(null)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)

  useAnimationFrame(() => {
    offsetX.set((offsetX.get() + speed) % gridSize)
    offsetY.set((offsetY.get() + speed) % gridSize)
  })

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const bgPos = useMotionTemplate`${offsetX}px ${offsetY}px`
  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  const gridBg = `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`
  const hlBg   = `linear-gradient(${highlightColor} 1px, transparent 1px), linear-gradient(90deg, ${highlightColor} 1px, transparent 1px)`
  const bgSize  = `${gridSize}px ${gridSize}px`

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid base em movimento contínuo */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: gridBg,
          backgroundSize: bgSize,
          backgroundPosition: bgPos,
        }}
      />

      {/* Camada de highlight revelada pelo cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: hlBg,
          backgroundSize: bgSize,
          backgroundPosition: bgPos,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
    </div>
  )
}
