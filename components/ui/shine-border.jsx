'use client'

/**
 * ShineBorder — animated gradient border via CSS mask technique.
 * Adapted from MagicUI for this project (JSX, Tailwind v4, no shadcn).
 *
 * The ::before pseudo-element (defined in globals.css as .shine-border-effect)
 * cycles a radial gradient as a rotating shine effect visible only in the border
 * area, using mask-composite: exclude to punch out the center.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = '#4BAF92',
  className = '',
  children,
}) {
  const colorStr = Array.isArray(color) ? color.join(',') : color

  return (
    <div
      style={{
        '--shine-radius':   `${borderRadius}px`,
        '--shine-width':    `${borderWidth}px`,
        '--shine-duration': `${duration}s`,
        '--shine-gradient': `radial-gradient(transparent, transparent, ${colorStr}, transparent, transparent)`,
        borderRadius: `${borderRadius}px`,
      }}
      className={`shine-border-effect relative ${className}`}
    >
      {children}
    </div>
  )
}
