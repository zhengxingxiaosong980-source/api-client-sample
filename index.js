// 設定は .env(API_BASE_URL と API_KEY)から読む。.env.example を .env にコピーして書き換える。
import { readFileSync, existsSync } from 'node:fs';

function loadEnv(path = '.env') {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].trim();
  }
}

loadEnv();
const base = process.env.API_BASE_URL;
const key = process.env.API_KEY;
if (!base || !key) {
  console.error('API_BASE_URL と API_KEY を .env に書いてください(.env.example を参照)。');
  process.exit(1);
}

const res = await fetch(base + '/messages', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-api-key': key },
  body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
});
console.log('status:', res.status);
console.log(await res.text());
