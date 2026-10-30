import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const forbiddenRuntimeMarkers = [
  '/api/zalo/player-auth',
  'booking.vre-vietnam.com',
  'getAccessToken',
  'getUserID',
  'graph.zalo.me',
]

const requiredLanguageMarkers = [
  'No online registration',
  'Không đăng ký trực tuyến',
  '온라인 가입 없음',
  'オンライン登録なし',
  'Aucune inscription en ligne',
  'Keine Online-Registrierung',
  'Nessuna registrazione online',
]

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? collectFiles(path) : [path]
  }))
  return files.flat()
}

const appSource = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
if (appSource.includes("from './api'")) {
  throw new Error('Account-free Player must not import the registration client.')
}

const distFiles = await collectFiles(fileURLToPath(new URL('../dist', import.meta.url)))
const bundle = (await Promise.all(distFiles.map((file) => readFile(file, 'utf8')))).join('\n')

for (const marker of forbiddenRuntimeMarkers) {
  if (bundle.includes(marker)) throw new Error(`Registration runtime marker found in build: ${marker}`)
}

for (const marker of requiredLanguageMarkers) {
  if (!bundle.includes(marker)) throw new Error(`Missing account-free language marker: ${marker}`)
}

console.log('Account-free build verification passed for all seven languages.')
