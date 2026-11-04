import { readFile } from 'node:fs/promises'

const languages = ['en', 'vi', 'ko', 'ja', 'fr', 'de', 'it', 'zh']
const files = {
  app: await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
  i18n: await readFile(new URL('../src/i18n.ts', import.meta.url), 'utf8'),
  legal: await readFile(new URL('../src/legal.ts', import.meta.url), 'utf8'),
  config: await readFile(new URL('../app-config.json', import.meta.url), 'utf8'),
  built: await readFile(new URL('../dist/assets/index.module.js', import.meta.url), 'utf8'),
}

for (const language of languages) {
  if (!files.i18n.includes(`${language}: {`)) throw new Error(`Missing ${language} translations`)
}

for (const required of [
  'https://booking.vre-vietnam.com/tickets',
  'openWebview',
  'ha-do-centrosa',
  'cafe-des-stagiaires',
  'utm_source',
]) {
  if (!files.app.includes(required) && !files.built.includes(required)) throw new Error(`Missing required release marker: ${required}`)
}

for (const forbidden of ['getPhoneNumber', 'getAccessToken', 'getUserID', 'player-auth', 'vre-vietnam.com/privacy-policy', 'vre-vietnam.com/terms-and-conditions']) {
  if (files.app.includes(forbidden) || files.built.includes(forbidden)) throw new Error(`Forbidden Booking release dependency: ${forbidden}`)
}

for (const required of ['privacyTitle', 'privacySections', 'termsTitle', 'termsSections']) {
  if (!files.legal.includes(required)) throw new Error(`Missing in-app legal content: ${required}`)
}

if (!files.config.includes('VRena Booking')) throw new Error('App config title is incorrect')
console.log('VRena Booking release verification passed for all eight languages.')
