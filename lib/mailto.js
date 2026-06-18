export const CONTACT_EMAIL = 'rafaelgrande@usp.br'

function body(...lines) {
  return lines.join('\n')
}

const BODY_IC = body(
  'Olá, professor Rafael.',
  '',
  'Tenho interesse em participar do INTERFIBRAS como estudante de iniciação científica.',
  '',
  'Meu nome é: ',
  'Curso ou formação: ',
  'Instituição: ',
  'Semestre atual: ',
  'Interesse principal: ',
  'Disponibilidade para início: ',
  'Mensagem adicional: ',
  '',
  'Atenciosamente,',
)

const BODY_MESTRADO = body(
  'Olá, professor Rafael.',
  '',
  'Tenho interesse em participar do INTERFIBRAS como candidato ao mestrado.',
  '',
  'Meu nome é: ',
  'Curso ou formação (graduação): ',
  'Instituição: ',
  'Área de interesse de pesquisa: ',
  'Disponibilidade para início: ',
  'Mensagem adicional: ',
  '',
  'Atenciosamente,',
)

const BODY_TCC = body(
  'Olá, professor Rafael.',
  '',
  'Tenho interesse em desenvolver meu TCC no INTERFIBRAS.',
  '',
  'Meu nome é: ',
  'Curso ou formação: ',
  'Instituição: ',
  'Semestre atual: ',
  'Tema de interesse: ',
  'Disponibilidade: ',
  'Mensagem: ',
  '',
  'Atenciosamente,',
)

const BODY_PARCERIA = body(
  'Olá, professor Rafael.',
  '',
  'Tenho interesse em uma colaboração com o grupo INTERFIBRAS.',
  '',
  'Nome e afiliação: ',
  'Descrição do interesse: ',
  'Referências ou trabalhos anteriores (se aplicável): ',
  '',
  'Atenciosamente,',
)

const BODY_GERAL = body(
  'Olá, professor Rafael.',
  '',
  'Tenho interesse em participar do INTERFIBRAS.',
  '',
  'Meu nome é: ',
  'Curso ou formação: ',
  'Instituição: ',
  'Interesse principal: ',
  'Disponibilidade: ',
  'Mensagem: ',
  '',
  'Atenciosamente,',
)

function buildMailto(subject, bodyText) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
}

export const MAILTO_IC = buildMailto(
  'Interesse em iniciação científica no INTERFIBRAS',
  BODY_IC,
)

export const MAILTO_MESTRADO = buildMailto(
  'Interesse em mestrado no INTERFIBRAS',
  BODY_MESTRADO,
)

export const MAILTO_TCC = buildMailto(
  'Interesse em TCC no INTERFIBRAS',
  BODY_TCC,
)

export const MAILTO_PARCERIA = buildMailto(
  'Interesse em colaboração com o INTERFIBRAS',
  BODY_PARCERIA,
)

export const MAILTO_GERAL = buildMailto(
  'Interesse em participar do INTERFIBRAS',
  BODY_GERAL,
)
