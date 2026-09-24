// Offline cache: app files + ExcelJS. Bump VERSION when the app changes.
const VERSION='kea-v5';
const FILES=['./','index.html','data.js','manifest.webmanifest','icon-192.png','icon-512.png','https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))));self.clients.claim()});
// Network first (so updates arrive when there's signal), cache when offline.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
