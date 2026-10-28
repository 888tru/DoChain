const CACHE='dochain-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
const FONT_HOSTS=['fonts.googleapis.com','fonts.gstatic.com'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET')return;
  // шрифты: из кэша сразу, обновляем в фоне (чтобы Archivo и JetBrains Mono работали офлайн)
  if(FONT_HOSTS.includes(url.hostname)){
    e.respondWith(caches.open(CACHE).then(c=>c.match(req).then(hit=>{
      const net=fetch(req).then(res=>{c.put(req,res.clone());return res}).catch(()=>hit);
      return hit||net;
    })));
    return;
  }
  if(url.origin!==location.origin)return;
  // сама страница: сеть в приоритете (обновления доходят), кэш для офлайна
  e.respondWith(
    fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res})
      .catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
  );
});
