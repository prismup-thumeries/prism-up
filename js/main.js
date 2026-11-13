// ============================================================
// PRISM UP — Fonctionnement commun à toutes les pages
// (en-tête, barre d'onglets mobile, pied de page, fenêtres)
// Le menu est écrit une seule fois ici : pour ajouter une page,
// ajoute-la dans PAGES.
//
// Le contenu (événements, cours, équipe, bandeau d'alerte) est dans
// le dossier data/ et se modifie depuis prism-up.fr/admin.
//
// ⚠️ Après une modification de css/style.css ou js/main.js, change le
// numéro "?v=..." dans les 5 pages HTML : sinon les téléphones peuvent
// garder l'ancienne version en mémoire pendant quelques minutes.
// ============================================================

// ─── Données ───
let EVENEMENTS = [], NOMS_SAISONS = {}, MEMBRES = [], PROFS = [];
let COURS = [], SALLES = {}, FAQ_COURS = [], TARIFS_COURS = { principal: 0, option: 0 };
let SAISON_COURS = "", LIEN_ADHESION = "rejoindre.html", ALERTE = null;
let promesseDonnees = null;

function chargerDonnees() {
  if (promesseDonnees) return promesseDonnees;
  // "no-cache" : le navigateur vérifie toujours s'il y a une version plus récente
  const lire = fichier => fetch("data/" + fichier, { cache: "no-cache" }).then(r => {
    if (!r.ok) throw new Error(fichier + " : " + r.status);
    return r.json();
  });
  promesseDonnees = Promise.all([
    lire("evenements.json"), lire("cours.json"), lire("association.json"), lire("alerte.json")
  ]).then(([ev, co, asso, alerte]) => {
    EVENEMENTS = (ev.evenements || []).filter(e => e.titre && e.date);
    NOMS_SAISONS = Object.fromEntries((ev.saisons || []).map(s => [s.cle, s.nom]));
    COURS = co.cours || [];
    SALLES = Object.fromEntries((co.salles || []).map(s => [s.id, s]));
    FAQ_COURS = (co.faq || []).map(f => ({ q: f.question, r: f.reponse }));
    TARIFS_COURS = co.tarifs || TARIFS_COURS;
    SAISON_COURS = co.saison || "";
    LIEN_ADHESION = co.lien_adhesion || LIEN_ADHESION;
    MEMBRES = asso.membres || [];
    PROFS = asso.profs || [];
    ALERTE = alerte;
    document.querySelectorAll("[data-lien-adhesion]").forEach(a => (a.href = LIEN_ADHESION));
    afficherAlerte();
  }).catch(err => {
    console.error(err);
    document.querySelector("main")?.insertAdjacentHTML("afterbegin",
      `<div class="empty" style="margin-top:20px">Impossible de charger le contenu. Rechargez la page.</div>`);
    throw err;
  });
  return promesseDonnees;
}

// Bandeau d'alerte (ex : "Cours annulé ce soir"), disparaît seul après la date de fin
function afficherAlerte() {
  const a = ALERTE;
  if (!a || !a.actif || !a.texte) return;
  if (a.jusqu_au && dateLocale(a.jusqu_au.slice(0, 10)) < aujourdhui()) return;
  const barre = document.createElement(a.lien ? "a" : "div");
  barre.className = "alert-bar" + (a.niveau === "urgent" ? " urgent" : "");
  if (a.lien) barre.href = a.lien;
  barre.innerHTML = `<span class="wrap"><span class="alert-ico">${ico(a.niveau === "urgent" ? "alerte" : "info")}</span><span>${a.texte}</span>${a.lien ? '<span class="chev">→</span>' : ""}</span>`;
  barre.querySelector("span:nth-child(2)").textContent = a.texte;
  document.querySelector(".site-header")?.after(barre);
}

const PAGES = [
  { id: "accueil", href: "index.html", label: "Accueil", court: "Accueil",
    icon: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>' },
  { id: "cours", href: "cours.html", label: "Cours", court: "Cours",
    icon: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>' },
  { id: "evenements", href: "evenements.html", label: "Événements", court: "Events",
    icon: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>' },
  { id: "association", href: "association.html", label: "L'association", court: "Asso",
    icon: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4-6"/>' },
  { id: "rejoindre", href: "rejoindre.html", label: "Nous rejoindre", court: "Rejoindre",
    icon: '<path d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.4 3.6 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.7 0 5.9 3.9 4.6 7.3C19.5 16.4 12 21 12 21z"/>' }
];

const RESEAUX = [
  { nom: "Instagram", url: "https://www.instagram.com/prismup_thumeries/",
    icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>' },
  { nom: "Facebook", url: "https://www.facebook.com/profile.php?id=61582350400438",
    icon: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z"/>' },
  { nom: "TikTok", url: "https://www.tiktok.com/@prismup",
    icon: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.6 2.3 4.4 5 4.6"/>' },
  { nom: "YouTube", url: "https://www.youtube.com/@Prismup-n4i",
    icon: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9v6l5-3z" fill="currentColor"/>' }
];

// ─── Clair / sombre ───
// Le thème est choisi dans le <head> de chaque page (choix mémorisé, sinon
// réglage du téléphone). Ici : le bouton soleil/lune pour en changer.
const ICONE_SOLEIL = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
const ICONE_LUNE = '<path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/>';

function changerTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
  majBoutonTheme();
}

function majBoutonTheme() {
  const clair = document.documentElement.dataset.theme === "light";
  const bouton = document.getElementById("theme-toggle");
  if (bouton) {
    bouton.innerHTML = svg(clair ? ICONE_LUNE : ICONE_SOLEIL, 18);
    bouton.setAttribute("aria-label", clair ? "Passer en thème sombre" : "Passer en thème clair");
    bouton.title = bouton.getAttribute("aria-label");
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", clair ? "#faf8ff" : "#19152a");
}

// Petites touches de saison, activées automatiquement entre deux dates (MM-JJ).
// Pour en ajouter une (ex. Noël), copie un bloc et change les dates / emojis.
const THEMES_SAISON = [
  {
    nom: "halloween", du: "10-01", au: "11-02",
    deco: [],
    bandeau: { titre: "Spécial Halloween", texte: "Viens danser avec nous pour Halloween !", lien: "evenements.html" }
  }
];

function themeDuMoment() {
  const d = new Date();
  const jour = String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  return THEMES_SAISON.find(t => t.du <= t.au ? (jour >= t.du && jour <= t.au) : (jour >= t.du || jour <= t.au));
}

function appliquerTheme() {
  const t = themeDuMoment();
  if (!t) return;
  document.documentElement.classList.add("theme-" + t.nom);
  const deco = document.createElement("div");
  deco.className = "season-deco";
  deco.setAttribute("aria-hidden", "true");
  const places = [[6, 14], [88, 10], [78, 46], [10, 62], [92, 80], [40, 90]];
  deco.innerHTML = places.map(([x, y], i) =>
    `<span style="left:${x}%;top:${y}%;animation-delay:${-i * 1.5}s">${t.deco[i % t.deco.length]}</span>`).join("");
  document.body.prepend(deco);
  const zone = document.getElementById("bandeau-saison");
  if (zone && t.bandeau) {
    const b = t.bandeau;
    zone.innerHTML = `<a class="season-banner" href="${b.lien}">${b.emoji ? `<span class="big">${b.emoji}</span>` : ""}<span><strong>${b.titre}</strong><span class="muted">${b.texte}</span></span><span class="chev">→</span></a>`;
  }
}

// Icônes au trait de l'interface (sobres, à la couleur du texte)
const ICONES = {
  calendrier: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lieu: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  prix: '<path d="M17.5 7.5a6.5 6.5 0 1 0 0 9"/><path d="M4.5 10.5h8M4.5 13.5h8"/>',
  cadeau: '<rect x="3.5" y="8.5" width="17" height="12" rx="2"/><path d="M3.5 12.5h17M12 8.5v12"/><path d="M12 8.5C10.5 5 7 4.5 7 6.8S10 8.5 12 8.5zm0 0c1.5-3.5 5-4 5-1.7S14 8.5 12 8.5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  maj: '<path d="M20 11a8 8 0 0 0-14.6-4.5M4.5 3.5v3h3M4 13a8 8 0 0 0 14.6 4.5M19.5 20.5v-3h-3"/>',
  cloche: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  danse: '<circle cx="12" cy="4.5" r="2"/><path d="M12 7.5v6.5m0 0l-4 7m4-7l4 7M6 9.5l6-2 6 2"/>',
  coeur: '<path d="M12 20s-7-4.4-8.6-8.7C2.2 8.1 4.3 4.5 7.8 4.5c1.9 0 3.2 1 4.2 2.5 1-1.5 2.3-2.5 4.2-2.5 3.5 0 5.6 3.6 4.4 6.8C19 15.6 12 20 12 20z"/>',
  entreprise: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4.5h6V7M3 12.5h18"/>',
  alerte: '<path d="M12 3.5l9 16.5H3z"/><path d="M12 10v4.5M12 17.2v.1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.1"/>',
  partager: '<path d="M12 3.5v11M8 7l4-3.5L16 7"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>'
};
const ico = (nom, taille = 18) => svg(ICONES[nom] || "", taille);

const svg = (paths, size = 22) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

function construireMiseEnPage() {
  const page = document.body.dataset.page;
  const actif = id => (id === page ? ' aria-current="page"' : "");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap">
      <a href="index.html" class="brand"><img src="images/logo.png" alt="">PRISM UP</a>
      <nav aria-label="Menu principal">
        <ul class="top-links">
          ${PAGES.map(p => `<li><a href="${p.href}"${actif(p.id)}>${p.label}</a></li>`).join("")}
        </ul>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" type="button"></button>
        <a class="btn btn-primary btn-sm header-cta" href="rejoindre.html" data-lien-adhesion target="_blank" rel="noopener">S'inscrire</a>
      </div>
    </div>`;
  document.body.prepend(header);
  header.querySelector("#theme-toggle").addEventListener("click", () => {
    changerTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  });
  majBoutonTheme();

  const tabbar = document.createElement("nav");
  tabbar.className = "tabbar";
  tabbar.setAttribute("aria-label", "Navigation");
  tabbar.innerHTML = PAGES.map(p => `<a href="${p.href}"${actif(p.id)}>${svg(p.icon)}<span>${p.court}</span></a>`).join("");
  document.body.append(tabbar);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div><strong style="color:var(--text)">Prism Up</strong> · Association de danse · Thumeries<br>
        <a href="mailto:prismupcom@gmail.com" style="color:var(--muted)">prismupcom@gmail.com</a></div>
      <div class="socials">
        ${RESEAUX.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nom}">${svg(r.icon, 18)}</a>`).join("")}
      </div>
      <div>© ${new Date().getFullYear()} Prism Up · <a href="mentions-legales.html" style="color:var(--muted)">Mentions légales</a> · <button class="lien-cookies" id="lien-cookies">Cookies</button></div>
    </div>`;
  document.querySelector("main")?.after(footer);
  footer.querySelector("#lien-cookies").addEventListener("click", afficherBandeauCookies);
}

// ─── Dates ───
function dateLocale(str) {
  const [a, m, j] = str.split("-").map(Number);
  return new Date(a, m - 1, j);
}
function aujourdhui() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function formaterDate(str, options = { weekday: "long", day: "numeric", month: "long", year: "numeric" }) {
  const txt = dateLocale(str).toLocaleDateString("fr-FR", options);
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}
function joursAvant(str) {
  return Math.round((dateLocale(str) - aujourdhui()) / 86400000);
}
function texteCompteRebours(str, fin) {
  const j = joursAvant(str);
  if (j < 0 && fin && joursAvant(fin) >= 0) return "En ce moment !";
  if (j === 0) return "C'est aujourd'hui !";
  if (j === 1) return "Demain";
  return `Dans ${j} jours`;
}

// ─── Événements ───
function slug(ev) {
  return (ev.date + "-" + ev.titre)
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
// Un événement peut durer plusieurs jours (champ date_fin)
const finDe = ev => ev.date_fin || ev.date;
function estAVenir(ev) {
  return dateLocale(finDe(ev)) >= aujourdhui();
}
// « Samedi 5 décembre 2026 » ou « Ven. 4 → sam. 5 décembre 2026 »
function periode(ev, avecAnnee = true) {
  if (!ev.date_fin || ev.date_fin === ev.date) {
    return formaterDate(ev.date, avecAnnee ? undefined : { weekday: "long", day: "numeric", month: "long" });
  }
  const debut = formaterDate(ev.date, { weekday: "short", day: "numeric" });
  const fin = formaterDate(ev.date_fin, { weekday: "short", day: "numeric", month: "long", ...(avecAnnee ? { year: "numeric" } : {}) });
  return `${debut} → ${fin.charAt(0).toLowerCase() + fin.slice(1)}`;
}
function evenementsAVenir() {
  return EVENEMENTS.filter(e => estAVenir(e) && !e.annule)
    .sort((a, b) => dateLocale(a.date) - dateLocale(b.date));
}
function evenementsPasses() {
  return EVENEMENTS.filter(e => !estAVenir(e))
    .sort((a, b) => dateLocale(b.date) - dateLocale(a.date));
}
function saisonDe(ev) {
  const d = dateLocale(ev.date);
  const debut = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1; // septembre = mois 8
  return `${debut}-${debut + 1}`;
}
function nomSaison(cle) {
  return (typeof NOMS_SAISONS !== "undefined" && NOMS_SAISONS[cle]) || `Saison ${cle}`;
}
const TYPES = {
  evenement: { label: "Événement" },
  stage: { label: "Stage" },
  sortie: { label: "Sortie" }
};
function typeDe(ev) {
  return TYPES[ev.type] || TYPES.evenement;
}

// Image d'un événement : affiche entière (fond flou) ou emoji si aucune image
function visuel(ev, { classe = "ratio-45", entier = false } = {}) {
  const src = ev.affiche || (ev.photos && ev.photos[0]);
  if (!src && ev.accroche) {
    // Pas d'affiche : visuel automatique avec un grand mot d'accroche (ex. « 24h »)
    return `<div class="frame ${classe} auto-poster"><div class="auto">
      <span class="auto-acc">${ev.accroche}</span>
      <span class="auto-titre">${ev.titre}</span></div></div>`;
  }
  if (!src) return `<div class="frame ${classe}"><div class="placeholder"><span>${typeDe(ev).label}</span></div></div>`;
  const pos = ev.cadrage ? ` style="object-position:${ev.cadrage}"` : "";
  if (entier) {
    return `<div class="frame poster ${classe}"><img class="blur" src="${src}" alt="" loading="lazy"><img class="main" src="${src}" alt="${ev.titre}" loading="lazy"></div>`;
  }
  return `<div class="frame ${classe}"><img src="${src}" alt="${ev.titre}" loading="lazy"${pos}></div>`;
}

function blocDate(ev) {
  const d = dateLocale(ev.date);
  const mois = d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
  const f = ev.date_fin && ev.date_fin !== ev.date ? dateLocale(ev.date_fin).getDate() : null;
  return `<div class="date-block"><b>${d.getDate()}${f ? `<small>–${f}</small>` : ""}</b><span>${mois}</span></div>`;
}

// Carte "affiche" (même format pour tous les événements mis en avant)
function carteAffiche(ev, attributs) {
  const tag = attributs.startsWith("href") ? "a" : "button";
  return `
    <${tag} class="poster-card" ${attributs}>
      ${visuel(ev, { classe: "ratio-45", entier: true })}
      <div class="body">
        ${ev.badge ? `<span class="pill pill-warm" style="align-self:flex-start">${ev.badge}</span>` : ""}
        <h4>${ev.titre}</h4>
        <p class="meta"><strong>${ev.heure || periode(ev, false)}</strong>${ev.lieu ? "<br>" + ev.lieu : ""}</p>
        <div class="foot">
          <span class="cta">${ev.lien && (!ev.texteLien || /helloasso\.com/.test(ev.lien)) && estAVenir(ev) ? "Réserver →" : "Voir →"}</span>
          ${ev.tarifs?.length ? `<span class="pill">${ev.tarifs.map(t => t.prix).join(" / ")}</span>` : ""}
        </div>
      </div>
    </${tag}>`;
}

// Le(s) prochain(s) événement(s) : tous ceux du même jour sont mis en avant pareil
// Les événements mis en avant ensemble : même « série » (ex. Week-end Téléthon) ou même jour
function groupeVedette(liste) {
  if (!liste.length) return [];
  const premier = liste[0];
  return premier.serie ? liste.filter(e => e.serie === premier.serie) : liste.filter(e => e.date === premier.date);
}

function blocVedette(liste, attributs) {
  const groupe = groupeVedette(liste);
  if (!groupe.length) return "";
  const debut = groupe[0].date;
  const fin = groupe.map(finDe).sort().at(-1);
  const etendue = { date: debut, date_fin: fin };
  const titre = groupe[0].serie || periode(etendue, false);
  return `
    <div class="spotlight-head">
      <div>
        <h3>${titre}</h3>
        ${groupe[0].serie ? `<p class="spotlight-dates">${periode(etendue, false)}</p>` : ""}
      </div>
      <span class="countdown">${texteCompteRebours(debut, fin)}${groupe.length > 1 ? ` · ${groupe.length} rendez-vous` : ""}</span>
    </div>
    <div class="spotlight${groupe.length === 1 ? " solo" : ""}">
      ${groupe.map(ev => carteAffiche(ev, attributs(ev))).join("")}
    </div>`;
}

// Carrousel de photos, toutes dans un cadre identique
function carrouselHTML(images) {
  return `
    <div class="carousel">
      <div class="carousel-track">
        ${images.map((src, i) => `<div class="frame poster" data-i="${i}"><img class="blur" src="${src}" alt="" loading="lazy"><img class="main" src="${src}" alt="Photo ${i + 1}" loading="lazy"></div>`).join("")}
      </div>
      ${images.length > 1 ? `<button class="carousel-btn prev" aria-label="Photo précédente">‹</button><button class="carousel-btn next" aria-label="Photo suivante">›</button><span class="carousel-count">1 / ${images.length}</span>` : ""}
    </div>
    ${images.length > 1 ? `<div class="thumbs">${images.map((src, i) => `<button data-i="${i}" aria-label="Photo ${i + 1}" aria-current="${i === 0}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}`;
}

function activerCarrousel(racine, images) {
  const piste = racine.querySelector(".carousel-track");
  if (!piste) return;
  const aller = i => piste.scrollTo({ left: Math.max(0, Math.min(i, images.length - 1)) * piste.clientWidth, behavior: "smooth" });
  const actuel = () => Math.round(piste.scrollLeft / piste.clientWidth);
  racine.querySelector(".carousel-btn.prev")?.addEventListener("click", () => aller(actuel() - 1));
  racine.querySelector(".carousel-btn.next")?.addEventListener("click", () => aller(actuel() + 1));
  racine.querySelectorAll(".thumbs button").forEach(b => b.addEventListener("click", () => aller(+b.dataset.i)));
  piste.querySelectorAll(".frame").forEach(f => f.addEventListener("click", () => ouvrirVisionneuse(images, +f.dataset.i)));
  piste.addEventListener("scroll", () => {
    const i = actuel();
    const compteur = racine.querySelector(".carousel-count");
    if (compteur) compteur.textContent = `${i + 1} / ${images.length}`;
    racine.querySelectorAll(".thumbs button").forEach(b => b.setAttribute("aria-current", +b.dataset.i === i));
  }, { passive: true });
}

// ─── Agenda à s'abonner (fichiers agenda/*.ics générés automatiquement) ───
function ouvrirAgenda(fichier, titre, texte) {
  const https = `${location.origin}/agenda/${fichier}.ics`;
  const webcal = https.replace(/^https?:/, "webcal:");
  const google = "https://calendar.google.com/calendar/render?cid=" + encodeURIComponent(webcal);
  const apple = /iPhone|iPad|Macintosh/.test(navigator.userAgent);
  const boutonApple = `<a class="btn ${apple ? "btn-primary" : "btn-ghost"} btn-block" href="${webcal}">iPhone, iPad, Mac</a>`;
  const boutonGoogle = `<a class="btn ${apple ? "btn-ghost" : "btn-primary"} btn-block" href="${google}" target="_blank" rel="noopener">Google Agenda (Android)</a>`;
  ouvrirFenetre(`
    <div class="sheet-body">
      <p class="eyebrow">Agenda Prism Up</p>
      <h2 style="margin-top:6px">${titre}</h2>
      <p class="muted">${texte}</p>
      <div class="facts">
        <div><span>${ico("maj")}</span><span>Abonnement : l'agenda se met à jour tout seul (horaires, vacances, nouveaux événements).</span></div>
        <div><span>${ico("cloche")}</span><span>Astuce : ajoutez une alerte (ex. 1 h avant) dans les réglages de l'agenda.</span></div>
      </div>
      <div class="actions">
        ${apple ? boutonApple + boutonGoogle : boutonGoogle + boutonApple}
        <button class="btn btn-ghost btn-block" id="copier-agenda">Copier le lien (Outlook, autres)</button>
      </div>
    </div>`);
  document.getElementById("copier-agenda").addEventListener("click", async e => {
    try { await navigator.clipboard.writeText(https); e.currentTarget.textContent = "Lien copié ✓"; }
    catch (err) { prompt("Copiez ce lien :", https); }
  });
}

// ─── Galerie « Souvenirs » : bandes de photos qui défilent doucement ───
function toutesLesPhotos() {
  return evenementsPasses().flatMap(ev =>
    (ev.photos || []).map(src => ({ src, titre: ev.titre, slug: slug(ev) })));
}

function galerieSouvenirs(zone) {
  const photos = toutesLesPhotos();
  if (photos.length < 3) { zone.closest("section")?.setAttribute("hidden", ""); return; }
  const rangees = [photos.filter((_, i) => i % 2 === 0), photos.filter((_, i) => i % 2 === 1)];
  // Chaque bande contient juste assez de photos pour couvrir l'écran, puis est doublée :
  // le défilement boucle sans trou, sans créer de bande trop large (Safari n'aime pas).
  const largeurEcran = Math.max(innerWidth, screen.width || 0, 400);
  const largeurPhoto = innerWidth > 760 ? 295 : 235;
  const minimum = Math.ceil(largeurEcran / largeurPhoto) + 1;
  zone.innerHTML = rangees.map((r, n) => {
    let moitie = [...r];
    while (moitie.length < minimum) moitie = moitie.concat(r);
    const imgs = [...moitie, ...moitie].map(p => {
      const i = photos.indexOf(p);
      return `<button class="souvenir" data-i="${i}" aria-label="${p.titre}"><img data-src="${p.src}" alt=""></button>`;
    }).join("");
    return `<div class="marquee${n % 2 ? " reverse" : ""}" style="--duree:${moitie.length * 5}s"><div class="marquee-track">${imgs}</div></div>`;
  }).join("");

  // Les images ne se chargent qu'à l'approche de la section
  new IntersectionObserver((entrees, obs) => {
    if (!entrees.some(e => e.isIntersecting)) return;
    obs.disconnect();
    zone.querySelectorAll("img[data-src]").forEach(img => { img.src = img.dataset.src; });
    zone.classList.add("is-ready");
  }, { rootMargin: "300px" }).observe(zone);

  zone.querySelectorAll(".souvenir").forEach(b => b.addEventListener("click", () =>
    ouvrirVisionneuse(photos.map(p => p.src), +b.dataset.i, photos.map(p => p.titre))));
}

// ─── Données structurées pour Google (événements avec date et lieu) ───
function donneesGoogleEvenements() {
  const abs = src => src ? new URL(src, location.origin).href : undefined;
  const prix = t => /gratuit/i.test(t) ? 0 : parseFloat(String(t).replace(",", ".").replace(/[^\d.]/g, "")) || undefined;
  const iso = (date, h) => {
    const m = h && h.match(/(\d{1,2})\s*h\s*(\d{2})?/i);
    return m ? `${date}T${m[1].padStart(2, "0")}:${m[2] || "00"}` : date;
  };
  const evenements = EVENEMENTS.map(ev => {
    const heures = String(ev.heure || "").match(/\d{1,2}\s*h\s*(\d{2})?/gi) || [];
    const url = `${location.origin}/evenements.html#${slug(ev)}`;
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: ev.titre,
      startDate: iso(ev.date, heures[0]),
      ...(heures[1] || ev.date_fin ? { endDate: iso(finDe(ev), heures[1] || heures[0]) } : {}),
      eventStatus: ev.annule ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: ev.lieu || "Thumeries",
        address: { "@type": "PostalAddress", streetAddress: ev.lieu || undefined, addressLocality: "Thumeries", postalCode: "59239", addressRegion: "Hauts-de-France", addressCountry: "FR" }
      },
      ...(ev.affiche || ev.photos?.length ? { image: [abs(ev.affiche || ev.photos[0])] } : {}),
      description: ev.description || ev.titre,
      url,
      organizer: { "@type": "Organization", name: "Prism Up", url: location.origin },
      ...(ev.tarifs?.length ? {
        offers: ev.tarifs.map(t => ({
          "@type": "Offer", name: t.label, price: prix(t.prix), priceCurrency: "EUR",
          url: ev.lien || url, availability: "https://schema.org/InStock"
        }))
      } : {})
    };
  });
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(evenements);
  document.head.append(script);
}

// ─── Cookies et mesure d'audience (règles CNIL) ───
// Google Analytics et les contenus Instagram ne se chargent qu'après « Accepter ».
// Le choix est gardé 13 mois, puis redemandé. Lien « Cookies » dans le pied de page.
const ID_ANALYTICS = "G-5QQ5K7E4S0";
const DUREE_CHOIX = 395 * 86400000; // 13 mois

function lireConsentement() {
  try {
    const c = JSON.parse(localStorage.getItem("consentement") || "null");
    return c && Date.now() - c.date < DUREE_CHOIX ? c.choix : null;
  } catch (e) { return null; }
}

function enregistrerConsentement(choix) {
  try { localStorage.setItem("consentement", JSON.stringify({ choix, date: Date.now() })); } catch (e) {}
  document.getElementById("bandeau-cookies")?.remove();
  if (choix === "accepte") chargerAnalytics();
  dispatchEvent(new CustomEvent("consentement", { detail: choix }));
}

let analyticsCharge = false;
function chargerAnalytics() {
  if (analyticsCharge) return;
  analyticsCharge = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", ID_ANALYTICS);
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID_ANALYTICS;
  document.head.append(s);
}

function afficherBandeauCookies() {
  if (document.getElementById("bandeau-cookies")) return;
  const b = document.createElement("div");
  b.id = "bandeau-cookies";
  b.className = "cookie-bar";
  b.setAttribute("role", "dialog");
  b.setAttribute("aria-label", "Cookies");
  b.innerHTML = `
    <p><strong>Cookies</strong> On aimerait mesurer la fréquentation du site (Google Analytics) et afficher nos posts Instagram. Tu es libre de refuser.
      <a href="mentions-legales.html#cookies">En savoir plus</a></p>
    <div class="cookie-actions">
      <button class="btn btn-ghost btn-sm" data-choix="refuse">Refuser</button>
      <button class="btn btn-ghost btn-sm" data-choix="accepte">Accepter</button>
    </div>`;
  b.querySelectorAll("[data-choix]").forEach(x => x.addEventListener("click", () => enregistrerConsentement(x.dataset.choix)));
  document.body.append(b);
}

function initialiserConsentement() {
  const choix = lireConsentement();
  if (choix === "accepte") chargerAnalytics();
  else if (choix === null) afficherBandeauCookies();
}

// ─── Appli installable (PWA) ───
const estInstallee = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
let invitationInstall = null;
addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  invitationInstall = e;
  document.querySelectorAll("[data-installer]").forEach(b => (b.hidden = false));
});

function encartInstallation(zone) {
  if (!zone || estInstallee()) return;
  try { if (localStorage.getItem("install-masque")) return; } catch (e) {}
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const mobile = matchMedia("(max-width: 760px)").matches;
  if (!ios && !mobile && !invitationInstall) return;
  zone.innerHTML = `
    <div class="install-card">
      <img src="images/icones/icone-192.png" alt="" width="48" height="48">
      <div class="txt">
        <strong>Installe l'appli Prism Up</strong>
        <span class="muted small">${ios
          ? `Touche <b>Partager</b> <span class="ico-inline">${ico("partager", 15)}</span> puis <b>« Sur l'écran d'accueil »</b>.`
          : "Planning, événements et alertes en un geste, même hors connexion."}</span>
      </div>
      ${ios ? "" : `<button class="btn btn-primary btn-sm" data-installer ${invitationInstall ? "" : "hidden"}>Installer</button>`}
      <button class="install-close" aria-label="Masquer">×</button>
    </div>`;
  zone.querySelector(".install-close").addEventListener("click", () => {
    zone.innerHTML = "";
    try { localStorage.setItem("install-masque", "1"); } catch (e) {}
  });
  zone.querySelector("[data-installer]")?.addEventListener("click", async () => {
    if (!invitationInstall) return;
    invitationInstall.prompt();
    await invitationInstall.userChoice;
    invitationInstall = null;
    zone.innerHTML = "";
  });
}

function activerAppli() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;
  // La version du site (le "?v=" de main.js) sert aussi à mettre à jour l'appli
  const version = new URL(document.currentScript?.src || location.href).searchParams.get("v") || "1";
  addEventListener("load", () => navigator.serviceWorker.register(`/sw.js?v=${version}`).catch(() => {}));
}

// ─── Fenêtre (bottom sheet sur mobile) ───
let sheetFermeture = null;

function ouvrirFenetre(html, { large = false, photos = false, onClose = null } = {}) {
  let fond = document.getElementById("sheet");
  if (!fond) {
    fond = document.createElement("div");
    fond.id = "sheet";
    fond.className = "sheet-backdrop";
    fond.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><button class="sheet-close" aria-label="Fermer">×</button><div class="sheet-content"></div></div>`;
    fond.addEventListener("click", e => { if (e.target === fond) fermerFenetre(); });
    fond.querySelector(".sheet-close").addEventListener("click", fermerFenetre);
    document.body.append(fond);
  }
  fond.querySelector(".sheet").classList.toggle("wide", large);
  fond.querySelector(".sheet").classList.toggle("photos", photos);
  fond.querySelector(".sheet-content").innerHTML = html;
  fond.querySelector(".sheet").scrollTop = 0;
  fond.classList.add("open");
  document.body.classList.add("no-scroll");
  sheetFermeture = onClose;
}

function fermerFenetre() {
  document.getElementById("sheet")?.classList.remove("open");
  if (!document.getElementById("detail")?.classList.contains("open")) document.body.classList.remove("no-scroll");
  if (sheetFermeture) { const f = sheetFermeture; sheetFermeture = null; f(); }
}

// ─── Fiche détaillée (événements, cours) ───
// L'essentiel d'abord (titre, 3-4 pastilles, une phrase, un seul bouton),
// le reste dans « En savoir plus ». À l'ouverture, la carte touchée s'agrandit
// jusqu'à devenir la fiche (View Transitions, sinon un glissement simple).
// Sur téléphone, on ferme en faisant glisser la fiche vers le bas.
let detailEtat = null;
const sansAnimation = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function avecTransition(maj) {
  if (!document.startViewTransition || sansAnimation()) { maj(); return Promise.resolve(); }
  return document.startViewTransition(maj).finished.catch(() => {});
}

function ouvrirDetail({ origine = null, media = "", deuxColonnes = false, surtitre = "", titre = "", pastilles = [],
                        resume = "", plus = "", icones = [], action = null, onClose = null, apresOuverture = null }) {
  let fond = document.getElementById("detail");
  if (!fond) {
    fond = document.createElement("div");
    fond.id = "detail";
    fond.className = "detail-backdrop";
    fond.addEventListener("click", e => { if (e.target === fond) fermerDetail(); });
    document.body.append(fond);
  }
  const pastille = p => p.href
    ? `<a class="chip-info" href="${p.href}" target="_blank" rel="noopener">${p.ico ? ico(p.ico, 15) : ""}<span>${p.texte}</span></a>`
    : `<span class="chip-info${p.classe ? " " + p.classe : ""}">${p.ico ? ico(p.ico, 15) : ""}<span>${p.texte}</span></span>`;
  const bouton = (b, i) => b.href
    ? `<a class="rond" href="${b.href}" target="_blank" rel="noopener" aria-label="${b.label}" title="${b.label}">${ico(b.ico)}</a>`
    : `<button class="rond" data-icone="${i}" aria-label="${b.label}" title="${b.label}">${ico(b.ico)}</button>`;

  const rendu = () => {
    fond.innerHTML = `
      <article class="detail-panel${deuxColonnes ? " deux-colonnes" : ""}${media ? "" : " sans-media"}" role="dialog" aria-modal="true" aria-label="${titre.replace(/"/g, "&quot;")}">
        <div class="detail-barre">
          <span class="detail-barre-titre">${titre}</span>
          <div class="detail-icones">
            ${icones.map(bouton).join("")}
            <button class="rond" data-fermer aria-label="Fermer" title="Fermer">${svg('<path d="M6 6l12 12M18 6L6 18"/>', 18)}</button>
          </div>
        </div>
        ${media ? `<div class="detail-media">${media}</div>` : ""}
        <div class="detail-contenu">
          ${surtitre ? `<p class="detail-surtitre">${surtitre}</p>` : ""}
          <h2>${titre}</h2>
          ${pastilles.length ? `<div class="detail-pastilles">${pastilles.map(pastille).join("")}</div>` : ""}
          ${resume ? `<p class="detail-resume">${resume}</p>` : ""}
          ${plus ? `<details class="detail-plus"><summary>En savoir plus</summary><div class="detail-plus-corps">${plus}</div></details>` : ""}
          <div class="detail-zone-action"></div>
          ${action ? `<div class="detail-action">${action.href
            ? `<a class="btn btn-primary btn-block" href="${action.href}" ${action.externe === false ? "" : 'target="_blank" rel="noopener"'}>${action.texte}</a>`
            : `<button class="btn btn-primary btn-block" data-action>${action.texte}</button>`}</div>` : ""}
        </div>
      </article>`;
    fond.classList.add("open");
    document.body.classList.add("no-scroll");
    brancher();
  };

  // Boutons, barre du haut et geste de fermeture : branchés juste après l'affichage
  const brancher = () => {
  const panneau = fond.querySelector(".detail-panel");
  panneau.querySelector("[data-fermer]").addEventListener("click", () => fermerDetail());
  panneau.querySelectorAll("[data-icone]").forEach(b => b.addEventListener("click", e => icones[+b.dataset.icone].action(e.currentTarget)));
  panneau.querySelector("[data-action]")?.addEventListener("click", () => action.action(panneau));

  // Barre du haut : le titre apparaît quand l'image a défilé
  const media_ = panneau.querySelector(".detail-media, .detail-contenu h2");
  new IntersectionObserver(([e]) => panneau.classList.toggle("defile", !e.isIntersecting), { root: panneau, threshold: 0.15 }).observe(media_);

  // Glisser vers le bas pour fermer (téléphone)
  let y0 = null, dy = 0;
  panneau.addEventListener("touchstart", e => { y0 = panneau.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
  panneau.addEventListener("touchmove", e => {
    if (y0 === null) return;
    dy = e.touches[0].clientY - y0;
    if (dy > 0) { panneau.style.transform = `translateY(${dy}px)`; panneau.style.transition = "none"; }
  }, { passive: true });
  panneau.addEventListener("touchend", () => {
    if (y0 === null) return;
    panneau.style.transition = "";
    if (dy > 110) fermerDetail({ glisse: true });
    else panneau.style.transform = "";
    y0 = null;
  });

    if (apresOuverture) apresOuverture(panneau);
  };

  // L'élément qui s'agrandit : la carte touchée devient l'image (ou le panneau) de la fiche
  const cible = () => fond.querySelector(media ? ".detail-media" : ".detail-panel");
  if (origine && document.startViewTransition && !sansAnimation()) {
    origine.style.viewTransitionName = "fiche";
    avecTransition(() => {
      origine.style.viewTransitionName = "";
      rendu();
      cible().style.viewTransitionName = "fiche";
    }).then(() => { const c = cible(); if (c) c.style.viewTransitionName = ""; });
  } else {
    rendu();
    fond.querySelector(".detail-panel").classList.add("entree");
  }
  detailEtat = { origine, onClose, media: !!media };
}


function fermerDetail({ glisse = false } = {}) {
  const fond = document.getElementById("detail");
  if (!fond || !fond.classList.contains("open")) return;
  const etat = detailEtat || {};
  const fermer = () => {
    fond.classList.remove("open");
    fond.innerHTML = "";
    document.body.classList.remove("no-scroll");
  };
  const origine = etat.origine && document.body.contains(etat.origine) && etat.origine.getBoundingClientRect().height ? etat.origine : null;
  const source = fond.querySelector(etat.media ? ".detail-media" : ".detail-panel");
  if (!glisse && origine && source && document.startViewTransition && !sansAnimation()) {
    source.style.viewTransitionName = "fiche";
    avecTransition(() => { fermer(); origine.style.viewTransitionName = "fiche"; })
      .then(() => { origine.style.viewTransitionName = ""; });
  } else if (glisse) {
    const panneau = fond.querySelector(".detail-panel");
    panneau.style.transform = "translateY(100%)";
    fond.classList.add("sortie");
    setTimeout(() => { fond.classList.remove("sortie"); fermer(); }, 220);
  } else {
    fermer();
  }
  detailEtat = null;
  if (etat.onClose) etat.onClose();
}

// Visionneuse plein écran : flèches, glisser au doigt, Échap pour fermer
let visionneuse = { images: [], i: 0, legendes: [] };

function ouvrirVisionneuse(images, index = 0, legendes = []) {
  visionneuse = { images: [].concat(images), i: index, legendes };
  let v = document.getElementById("viewer");
  if (!v) {
    v = document.createElement("div");
    v.id = "viewer";
    v.className = "viewer";
    v.innerHTML = `<img alt=""><span class="vcount"></span><button class="nav prev" aria-label="Précédente">‹</button><button class="nav next" aria-label="Suivante">›</button>`;
    v.addEventListener("click", e => { if (!e.target.closest(".nav")) v.classList.remove("open"); });
    v.querySelector(".prev").addEventListener("click", () => changerPhoto(-1));
    v.querySelector(".next").addEventListener("click", () => changerPhoto(1));
    let x0 = null;
    v.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    v.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) changerPhoto(dx < 0 ? 1 : -1);
      x0 = null;
    });
    document.body.append(v);
  }
  afficherPhoto();
  v.classList.add("open");
}

function changerPhoto(sens) {
  const n = visionneuse.images.length;
  visionneuse.i = (visionneuse.i + sens + n) % n;
  afficherPhoto();
}

function afficherPhoto() {
  const v = document.getElementById("viewer");
  const n = visionneuse.images.length;
  v.querySelector("img").src = visionneuse.images[visionneuse.i];
  const legende = visionneuse.legendes[visionneuse.i];
  v.querySelector(".vcount").textContent = [legende, n > 1 ? `${visionneuse.i + 1} / ${n}` : ""].filter(Boolean).join(" · ");
  v.querySelectorAll(".nav").forEach(b => (b.style.display = n > 1 ? "" : "none"));
}

document.addEventListener("keydown", e => {
  const v = document.getElementById("viewer");
  const ouverte = v?.classList.contains("open");
  if (ouverte && e.key === "ArrowRight") changerPhoto(1);
  if (ouverte && e.key === "ArrowLeft") changerPhoto(-1);
  if (e.key !== "Escape") return;
  if (ouverte) v.classList.remove("open");
  else if (document.getElementById("sheet")?.classList.contains("open")) fermerFenetre();
  else fermerDetail();
});

construireMiseEnPage();
// Icônes écrites dans le HTML : <span data-ico="calendrier"></span>
document.querySelectorAll("[data-ico]").forEach(el => { el.innerHTML = ico(el.dataset.ico, 20); });
appliquerTheme();
activerAppli();
initialiserConsentement();
