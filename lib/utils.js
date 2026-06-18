/** Converte string ISO de data (YYYY-MM-DD) para Date local sem desvio de timezone. */
function parseLocalDate(str) {
  if (!str) return null
  // "2025-06-12" sem hora é interpretado como UTC midnight pelo spec.
  // Adicionar T00:00:00 força interpretação no fuso local do browser/servidor.
  return new Date(`${str}T00:00:00`)
}

export function formatDate(str, options = { day: '2-digit', month: 'short', year: 'numeric' }) {
  if (!str) return ''
  return parseLocalDate(str).toLocaleDateString('pt-BR', options)
}

export function formatDateLong(str) {
  return formatDate(str, { day: '2-digit', month: 'long', year: 'numeric' })
}
