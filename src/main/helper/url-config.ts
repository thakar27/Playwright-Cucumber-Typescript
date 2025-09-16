import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let cachedUrls: Record<string, string> | undefined;

function loadUrls() {
  if (!cachedUrls) {
    const filePath = resolve(process.cwd(), 'config', 'urls.json');
    const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    cachedUrls = JSON.parse(raw) as Record<string, string>;
  }
  return cachedUrls;
}

export function getUrl(nameOrUrl: string) {
  const urls = loadUrls();
  const key = nameOrUrl.trim().toLowerCase();
  if (key in urls) {
    return urls[key];
  }
  return nameOrUrl;
}

export function listKnownUrls() {
  return Object.keys(loadUrls());
}
