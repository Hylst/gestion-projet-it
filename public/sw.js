// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

const BASE = '/gestion-projet-it/';
const version = 'gestion-projet-it-v11';
const precache = [
  `${BASE}`, `${BASE}offline.html`, `${BASE}manifest.webmanifest`,
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(version).then((c) => c.addAll(precache)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('gestion-projet-it-') && k !== version).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith(BASE)) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then((rep) => {
      if (rep.ok) {
        const copie = rep.clone();
        e.waitUntil(caches.open(version).then((c) => c.put(e.request, copie)));
      }
      return rep;
    }).catch(async () => (await caches.match(e.request)) || (await caches.match(`${BASE}offline.html`))));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((rep) => {
    if (rep.ok) {
      const copie = rep.clone();
      e.waitUntil(caches.open(version).then((c) => c.put(e.request, copie)));
    }
    return rep;
  })));
});
