'use client'

import { useState } from 'react'

function BentoCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl flex flex-col p-7 lg:p-9 gap-6 cursor-default ${
        item.colSpan === 2 ? 'sm:col-span-2 md:col-span-2' : ''
      }`}
      style={{
        background: hovered ? `${item.cor}12` : 'rgba(255,255,255,0.08)',
        border: `1.5px solid ${hovered ? item.cor + '55' : 'rgba(255,255,255,0.13)'}`,
        boxShadow: hovered
          ? `0 20px 48px ${item.cor}22, 0 4px 16px rgba(0,0,0,0.28)`
          : '0 2px 16px rgba(0,0,0,0.22)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        backdropFilter: 'blur(8px)',
        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dot pattern on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
        aria-hidden="true"
      />

      {/* Top accent bar */}
      <div
        className="absolute left-0 top-0 right-0 h-px"
        style={{
          background: hovered
            ? `linear-gradient(90deg, ${item.cor}, transparent)`
            : `linear-gradient(90deg, ${item.cor}44, transparent)`,
          transition: 'background 350ms',
        }}
        aria-hidden="true"
      />

      {/* Watermark number — very subtle */}
      <span
        className="absolute right-2 bottom-[-8px] font-sora font-black select-none pointer-events-none"
        style={{
          fontSize: '5.5rem',
          lineHeight: 1,
          color: hovered ? `${item.cor}0a` : 'rgba(255,255,255,0.018)',
          transition: 'color 350ms',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {item.num}
      </span>

      {/* Icon + status badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: hovered ? `${item.cor}20` : 'rgba(255,255,255,0.09)',
            border: `1px solid ${hovered ? `${item.cor}48` : 'rgba(255,255,255,0.16)'}`,
            transition: 'all 350ms',
          }}
          aria-hidden="true"
        >
          {item.icon}
        </div>
        {item.status && (
          <span
            className="font-inter text-xs font-semibold rounded-full px-2.5 py-1"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.13)',
              color: hovered ? item.cor : 'rgba(255,255,255,0.42)',
              transition: 'color 350ms',
            }}
          >
            {item.status}
          </span>
        )}
      </div>

      {/* Text block */}
      <div className="relative z-10 flex-1 flex flex-col gap-2.5">
        <h3
          className="font-sora font-bold leading-snug"
          style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.97)' }}
        >
          {item.title}
        </h3>
        {item.meta && (
          <p
            className="font-inter text-xs font-semibold tracking-wide"
            style={{
              color: hovered ? item.cor : `${item.cor}cc`,
              transition: 'color 350ms',
            }}
          >
            {item.meta}
          </p>
        )}
        <p
          className="font-inter text-xs leading-relaxed"
          style={{
            color: hovered ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.62)',
            transition: 'color 350ms',
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Tags */}
      <div className="relative z-10 flex items-center justify-between gap-2 mt-auto pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="font-inter font-medium rounded-full px-2 py-0.5"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.03em',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${hovered ? `${item.cor}28` : 'rgba(255,255,255,0.10)'}`,
                color: hovered ? `${item.cor}ee` : 'rgba(255,255,255,0.52)',
                transition: 'all 350ms',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="font-inter text-xs shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: item.cor }}
        >
          Explorar →
        </span>
      </div>
    </div>
  )
}

export function BentoGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
      {items.map((item, i) => (
        <BentoCard key={i} item={item} />
      ))}
    </div>
  )
}
