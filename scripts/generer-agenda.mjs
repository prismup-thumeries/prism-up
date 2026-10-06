// ============================================================
// PRISM UP — Génère les agendas (.ics) à partir de data/*.json
// ------------------------------------------------------------
// Lancé automatiquement par GitHub (.github/workflows/agenda.yml)
// à chaque modification des données depuis l'admin.
// En local : node scripts/generer-agenda.mjs
//
// Fichiers produits dans agenda/ :
//   tout.ics         tous les cours + tous les événements
//   evenements.ics   les événements seulement
//   <id-du-cours>.ics  un cours (chaque semaine) + les événements
// Les parents s'y abonnent : leur agenda se met à jour tout seul.
// ============================================================

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";

const SITE = "https://prism-up.fr";
const cours = JSON.parse(readFileSync("data/cours.json", "utf8"));
const evenements = JSON.parse(readFileSync("data/evenements.json", "utf8")).evenements || [];

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const STAMP = "20260101T000000Z"; // fixe : le fichier ne change que si les données changent

const slug = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const slugEvenement = ev => slug(ev.date + "-" + ev.titre); // identique à js/main.js
const echap = t => String(t || "").replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\r?\n/g, "\\n");
const jourAAAAMMJJ = d => `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
const dateUTC = s => { const [a, m, j] = s.split("-").map(Number); return new Date(Date.UTC(a, m - 1, j)); };
const plusJours = (d, n) => new Date(d.getTime() + n * 86400000);

// "18h00" → "180000" ; "10h" → "100000"
function heure(txt) {
  const m = String(txt || "").match(/(\d{1,2})\s*h\s*(\d{2})?/i);
  return m ? m[1].padStart(2, "0") + (m[2] || "00") + "00" : null;
}

// Plie les lignes à 75 octets (norme iCalendar)
function plier(ligne) {
  const octets = Buffer.from(ligne, "utf8");
  if (octets.length <= 75) return ligne;
  const morceaux = [];
  let courant = "";
  for (const car of ligne) {
    if (Buffer.byteLength(courant + car, "utf8") > (morceaux.length ? 74 : 75)) { morceaux.push(courant); courant = ""; }
    courant += car;
  }
  morceaux.push(courant);
  return morceaux.join("\r\n ");
}

const FUSEAU = [
  "BEGIN:VTIMEZONE", "TZID:Europe/Paris",
  "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
  "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
  "END:VTIMEZONE"
];

function calendrier(nom, description, blocs) {
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Prism Up//Agenda//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    `X-WR-CALNAME:${echap(nom)}`, `X-WR-CALDESC:${echap(description)}`, "X-WR-TIMEZONE:Europe/Paris",
    "REFRESH-INTERVAL;VALUE=DURATION:PT6H", "X-PUBLISHED-TTL:PT6H",
    ...FUSEAU, ...blocs.flat(), "END:VCALENDAR"
  ].map(plier).join("\r\n") + "\r\n";
}

// ─── Un cours : chaque semaine pendant la saison, sauf jours sans cours ───
function blocCours(c) {
  const jour = JOURS.indexOf(c.jour);
  const debut = heure(c.debut), fin = heure(c.fin);
  if (jour < 0 || !debut || !cours.debut_saison || !cours.fin_saison) return [];
  let premier = dateUTC(cours.debut_saison.slice(0, 10));
  while (premier.getUTCDay() !== jour) premier = plusJours(premier, 1);
  const finSaison = dateUTC(cours.fin_saison.slice(0, 10));

  // Dates exclues (vacances, jours fériés…) qui tombent ce jour-là
  const exclues = [];
  for (const p of cours.sans_cours || []) {
    if (!p.du) continue;
    const du = dateUTC(p.du.slice(0, 10)), au = dateUTC((p.au || p.du).slice(0, 10));
    for (let d = premier; d <= finSaison; d = plusJours(d, 7)) if (d >= du && d <= au) exclues.push(`${jourAAAAMMJJ(d)}T${debut}`);
  }

  const salle = (cours.salles || []).find(s => s.id === c.salle) || {};
  const lignes = [
    "BEGIN:VEVENT",
    `UID:cours-${c.id || slug(c.jour + "-" + c.titre)}@prism-up.fr`, `DTSTAMP:${STAMP}`,
    `DTSTART;TZID=Europe/Paris:${jourAAAAMMJJ(premier)}T${debut}`,
    `DTEND;TZID=Europe/Paris:${jourAAAAMMJJ(premier)}T${fin || debut}`,
    `RRULE:FREQ=WEEKLY;UNTIL=${jourAAAAMMJJ(finSaison)}T225959Z`,
    ...(exclues.length ? [`EXDATE;TZID=Europe/Paris:${exclues.join(",")}`] : []),
    `SUMMARY:${echap("💃 Prism Up · " + c.titre)}`,
    `LOCATION:${echap([salle.nom, salle.precision, "Thumeries"].filter(Boolean).join(", "))}`,
    `DESCRIPTION:${echap([c.detail, `Planning : ${SITE}/cours.html`].filter(Boolean).join("\n"))}`,
    `URL:${SITE}/cours.html#${c.id || ""}`,
    "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${echap("Cours Prism Up : " + c.titre)}`, "TRIGGER:-PT1H", "END:VALARM",
    "END:VEVENT"
  ];
  return lignes;
}

// ─── Un événement ───
function blocEvenement(ev) {
  const jour = ev.date.replace(/-/g, "");
  const heures = String(ev.heure || "").match(/\d{1,2}\s*h\s*(\d{2})?/gi) || [];
  let dates;
  if (heures.length) {
    const debut = heure(heures[0]);
    const fin = heures[1] ? heure(heures[1]) : String(Math.min(+debut.slice(0, 2) + 2, 23)).padStart(2, "0") + debut.slice(2);
    dates = [`DTSTART;TZID=Europe/Paris:${jour}T${debut}`, `DTEND;TZID=Europe/Paris:${jour}T${fin}`];
  } else {
    dates = [`DTSTART;VALUE=DATE:${jour}`, `DTEND;VALUE=DATE:${jourAAAAMMJJ(plusJours(dateUTC(ev.date), 1))}`];
  }
  const s = slugEvenement(ev);
  return [
    "BEGIN:VEVENT", `UID:evenement-${s}@prism-up.fr`, `DTSTAMP:${STAMP}`, ...dates,
    `SUMMARY:${echap((ev.annule ? "ANNULÉ · " : "⭐ Prism Up · ") + ev.titre)}`,
    ...(ev.lieu ? [`LOCATION:${echap(ev.lieu)}`] : []),
    `DESCRIPTION:${echap([ev.heure, ev.description, `${SITE}/evenements.html#${s}`].filter(Boolean).join("\n\n"))}`,
    `URL:${SITE}/evenements.html#${s}`,
    ...(ev.annule ? ["STATUS:CANCELLED"] : []),
    "END:VEVENT"
  ];
}

const listeCours = (cours.cours || []).filter(c => c.titre && c.jour);
const listeEvenements = evenements.filter(e => e.titre && /^\d{4}-\d{2}-\d{2}$/.test(e.date || ""));
const blocsEv = listeEvenements.map(blocEvenement);

mkdirSync("agenda", { recursive: true });
const ecrits = new Set();
const ecrire = (fichier, contenu) => { writeFileSync("agenda/" + fichier, contenu); ecrits.add(fichier); };

ecrire("tout.ics", calendrier("Prism Up", "Tous les cours et événements Prism Up", [...listeCours.map(blocCours), ...blocsEv]));
ecrire("evenements.ics", calendrier("Prism Up · Événements", "Stages, sorties et galas Prism Up", blocsEv));
for (const c of listeCours) {
  const id = c.id || slug(c.jour + "-" + c.titre);
  ecrire(id + ".ics", calendrier(`Prism Up · ${c.titre}`, `Cours ${c.titre} (${c.jour} ${c.debut}) et événements Prism Up`, [blocCours(c), ...blocsEv]));
}

// Supprime les agendas de cours qui n'existent plus
for (const f of readdirSync("agenda")) if (f.endsWith(".ics") && !ecrits.has(f)) unlinkSync("agenda/" + f);

console.log(`Agendas générés : ${[...ecrits].join(", ")}`);
