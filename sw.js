const CACHE='asm-medical-v2',FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
self.addEventListener('message',e=>{const d=e.data||{};if(d.type==='ASM_MEDICAL_NOTIFY')e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'icon-192.png',badge:'icon-192.png',image:d.image||undefined,tag:d.tag||'asm-medical',renotify:true,requireInteraction:true,data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list)if('focus'in c)return c.focus();return clients.openWindow('./')}))});
