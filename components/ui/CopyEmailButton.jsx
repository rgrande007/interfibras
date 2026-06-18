'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { CONTACT_EMAIL } from '@/lib/mailto'

export default function CopyEmailButton({ className, style }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      track('copy_email')
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // clipboard not available — silent fail
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className} style={style}>
      {copied ? 'Copiado!' : 'Copiar e-mail'}
    </button>
  )
}
