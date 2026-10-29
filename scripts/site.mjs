#!/usr/bin/env node
// Site de l'app iPhone, publié par GitHub Pages (.github/workflows/pages.yml) : les deux adresses exigées par la
// fiche App Store (I9).
//   /confidentialite/  politique de confidentialité (source : overlay/app/public/confidentialite-iphone.html,
//                      la même que celle embarquée dans l'app, sans son lien de retour vers l'app)
//   /assistance/       assistance (source : site/assistance.html), aussi servie à la racine
// Usage : node scripts/site.mjs <dossier de sortie>
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = process.argv[2]
if (!out) throw new Error('Usage : node scripts/site.mjs <dossier de sortie>')

const BACK = /\s*<!-- L'iPhone n'a pas de bouton retour[^>]*-->\s*<a class="back" href="\/plus">[^<]*<\/a>/
const policy = readFileSync(join(root, 'overlay/app/public/confidentialite-iphone.html'), 'utf8')
if (!BACK.test(policy)) throw new Error('Lien de retour vers l’app introuvable dans confidentialite-iphone.html')
// Les commentaires HTML sont des notes de dépôt : ils ne sont pas publiés
const strip = (html) => html.replace(/[ \t]*<!--[\s\S]*?-->\n?/g, '')
const online = strip(policy.replace(BACK, ''))
const support = strip(readFileSync(join(root, 'site/assistance.html'), 'utf8'))

// Directive 2.3.10 d'Apple : aucune autre plateforme mobile nommée sur les pages données à la fiche
for (const [name, html] of [['confidentialite', online], ['assistance', support]]) {
  const hit = html.match(/Android|Google Play|Health Connect|href="\/plus"/)
  if (hit) throw new Error(`${name} : « ${hit[0]} » ne doit pas être publié`)
}

const atRoot = support.replace('href="../confidentialite/"', 'href="confidentialite/"')
if (atRoot === support) throw new Error('Lien vers la politique de confidentialité introuvable dans assistance.html')
const pages = { 'confidentialite/index.html': online, 'assistance/index.html': support, 'index.html': atRoot }
for (const [path, html] of Object.entries(pages)) {
  mkdirSync(dirname(join(out, path)), { recursive: true })
  writeFileSync(join(out, path), html)
}
console.log(`Site écrit dans ${out} : ${Object.keys(pages).join(', ')}`)
