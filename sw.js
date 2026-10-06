// ============================================================
// PRISM UP — Service worker (appli installable + hors connexion)
// ------------------------------------------------------------
// • Pages et données : réseau d'abord (toujours à jour), mémoire si pas de réseau
// • CSS, JS, images, polices : mémoire d'abord (rapide), mises à jour par le "?v="
// • L'admin, les agendas et les sites externes ne passent pas par ici
// ============================================================

const VERSION = new URL(location.href).searchParams.get("v") || "1";
const CACHE = "prismup-" + VERSION;
const PAGES = ["/", "/index.html", "/cours.html", "/evenements.html", "/association.html", "/rejoindre.html"];
const DONNEES = ["/data/evenements.json", "/data/cours.json", "/data/association.json", "/data/alerte.json"];
const FICHIERS = [`/css/style.css?v=${VERSION}`, `/js/main.js?v=${VERSION}`, "/images/logo.png", "/images/icones/icone-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...PAGES, ...DONNEES, ...FICHIERS])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(cles => Promise.all(cles.filter(k => k.startsWith("prismup-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function reseauDabord(requete) {
  const cache = await caches.open(CACHE);
  try {
    const reponse = await fetch(requete);
    if (reponse.ok) cache.put(requete, reponse.clone());
    return reponse;
  } catch (err) {
    return (await cache.match(requete, { ignoreSearch: true })) ||
      (requete.mode === "navigate" ? cache.match("/index.html") : Response.error());
  }
}

async function memoireDabord(requete) {
  const cache = await caches.open(CACHE);
  const enMemoire = await cache.match(requete);
  if (enMemoire) return enMemoire;
  const reponse = await fetch(requete);
  if (reponse.ok || reponse.type === "opaque") cache.put(requete, reponse.clone());
  return reponse;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const memeSite = url.origin === location.origin;
  const polices = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);

  if (memeSite && (url.pathname.startsWith("/admin") || url.pathname.startsWith("/agenda") || url.pathname === "/sw.js")) return;
  if (!memeSite && !polices) return;

  if (req.mode === "navigate" || (memeSite && (url.pathname.endsWith(".html") || url.pathname.startsWith("/data/")))) {
    e.respondWith(reseauDabord(req));
  } else {
    e.respondWith(memoireDabord(req));
  }
});
