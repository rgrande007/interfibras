import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

function getFiles(type) {
  const dir = path.join(contentDir, type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
}

function parseFile(type, filename) {
  const raw = fs.readFileSync(path.join(contentDir, type, filename), 'utf8')
  const { data, content } = matter(raw)
  return { slug: filename.replace(/\.md$/, ''), ...data, _body: content }
}

export async function toHtml(markdown) {
  const result = await remark().use(html, { sanitize: false }).process(markdown)
  return result.toString()
}

/* ── Posts ─────────────────────────────────────────── */

export function getAllPosts() {
  return getFiles('posts')
    .map((f) => parseFile('posts', f))
    .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
}

export function getDestaquePosts(n = 3) {
  return getAllPosts()
    .filter((p) => p.destaque)
    .slice(0, n)
}

export async function getPostBySlug(slug) {
  const fp = path.join(contentDir, 'posts', `${slug}.md`)
  if (!fs.existsSync(fp)) return null
  const raw = fs.readFileSync(fp, 'utf8')
  const { data, content } = matter(raw)
  return { slug, ...data, content: await toHtml(content) }
}

export function getAllPostSlugs() {
  return getFiles('posts').map((f) => f.replace(/\.md$/, ''))
}

/* ── Equipe ─────────────────────────────────────────── */

export function getAllEquipe() {
  return getFiles('equipe')
    .map((f) => parseFile('equipe', f))
    .sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99))
}

export function getDestaqueEquipe() {
  return getAllEquipe().filter((m) => m.destaque)
}

/* ── Publicações ────────────────────────────────────── */

export function getAllPublicacoes() {
  return getFiles('publicacoes')
    .map((f) => parseFile('publicacoes', f))
    .sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0))
}

export function getDestaquePublicacoes(n = 3) {
  return getAllPublicacoes()
    .filter((p) => p.destaque)
    .slice(0, n)
}

/* ── Oportunidades ──────────────────────────────────── */

export function getAllOportunidades() {
  return getFiles('oportunidades')
    .map((f) => parseFile('oportunidades', f))
    .sort((a, b) => {
      if (a.status === 'aberto' && b.status !== 'aberto') return -1
      if (a.status !== 'aberto' && b.status === 'aberto') return 1
      return 0
    })
}

export function getDestaqueOportunidades() {
  return getAllOportunidades().filter(
    (o) => o.destaque && o.status === 'aberto'
  )
}
