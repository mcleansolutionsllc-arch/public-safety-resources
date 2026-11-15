const V = 'ps-v4';
const CORE = ['./', './index.html', './styles.css', './app.js', './content.js', './manifest.webmanifest', './data/penal.json', "./img/icon-180.png","./img/icon-192.png","./img/icon-512.png","./img/narratives-1.jpg","./img/narratives-2.jpg","./img/patch.png","./img/peel.jpg","./img/phonetic.jpg","./img/radio-codes.jpg","./img/report-template.jpg","./img/summons-sample.jpg","./img/ten-code-update.jpg","./img/tour1.jpg","./img/tour2.jpg","./img/tour3.jpg","./img/uniform.jpg","./img/vip-sheet.jpg","./img/vip01.jpg","./img/vip02.jpg","./img/vip03.jpg","./img/vip04.jpg","./img/vip05.jpg","./img/vip06.jpg","./img/vip07.jpg","./img/vip08.jpg","./img/vip09.jpg","./img/vip10.jpg","./img/vip11.jpg","./img/vip12.jpg","./img/vip13.jpg","./img/vip14.jpg","./img/vip15.jpg","./img/vip16.jpg","./img/vip17.jpg","./img/vip18.jpg","./img/vip19.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = /fonts\.(googleapis|gstatic)\.com/.test(url.host);
  if (url.origin !== location.origin && !isFont) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(V).then(c => c.put('./', cp)); return r; }).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(V).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
