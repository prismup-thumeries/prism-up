// ============================================
// PRISM UP - Fichier de données
// Modifie ce fichier pour mettre à jour le site
// Format des dates : "AAAA-MM-JJ"
// ============================================

const EVENEMENTS = [
  {
    titre: "Gala #0 — Welcome to Prism Up",
    date: "2026-06-13",
    heure: "18h30",
    lieu: "Salle des fêtes F. Malle — Thumeries",
    description: "Surprise ! Pour notre première année, le gala est exceptionnellement gratuit ✨ Nous avons le plaisir de vous présenter notre tout premier gala de danse ! Rendez-vous le 13 juin 2026 pour une soirée placée sous le signe de l'énergie, du partage et de la passion.",
    prix: "Gratuit",
    affiche: "images/affiche-gala.png",
    estAffiche: true,
    video: "",
    photos: [],
    lien: "https://www.helloasso.com/associations/prism-up/evenements/spectacle-2026",
    lien_click_collect: "https://www.helloasso.com/associations/prism-up/boutiques/text-buvette",
    type: "evenement"
  },
  {
    titre: "Fête de la Musique",
    date: "2026-06-21",
    heure: "",
    lieu: "Place du Général de Gaulle — Thumeries",
    description: "Prism Up sera présent à la Fête de la Musique à Thumeries ! Venez nous retrouver pour partager un moment festif et découvrir nos danseurs. 🎵",
    prix: "",
    affiche: "",
    estAffiche: false,
    video: "",
    photos: [],
    lien: "",
    lien_click_collect: "",
    type: "evenement"
  },
  {
    titre: "Portes ouvertes",
    date: "2026-06-29",
    heure: "Horaires des cours",
    lieu: "Thumeries",
    description: `Venez découvrir Prism Up lors de nos portes ouvertes ! Assistez à nos cours et rejoignez l'aventure pour la saison prochaine 🎉<div style="display:flex;flex-direction:column;gap:15px;margin:20px 0;"><div style="background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;"><p style="color:#9894db;font-weight:700;margin-bottom:12px;">📅 Lundi 29 juin</p><div style="display:flex;flex-direction:column;gap:8px;"><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">18h – 19h</p><p style="color:#9894db;font-size:0.85rem;">Winning Dance · 7–9 ans</p></div><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">19h – 20h</p><p style="color:#9894db;font-size:0.85rem;">Chipizzz · Adulte 1</p></div><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">20h – 21h</p><p style="color:#9894db;font-size:0.85rem;">The Five's · 15–17 ans</p></div></div></div><div style="background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;"><p style="color:#9894db;font-weight:700;margin-bottom:12px;">📅 Samedi 4 juillet</p><div style="display:flex;flex-direction:column;gap:8px;"><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">9h – 10h</p><p style="color:#9894db;font-size:0.85rem;">Mini Street · 4–6 ans</p></div><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">10h – 11h</p><p style="color:#9894db;font-size:0.85rem;">Young Spirit · Adulte 2</p></div><div style="background:rgba(152,148,219,0.1);border-radius:8px;padding:10px;"><p style="font-weight:700;">11h – 12h</p><p style="color:#9894db;font-size:0.85rem;">Sweet Vibes · 10–14 ans</p></div></div></div></div>`,
    prix: "",
    affiche: "",
    estAffiche: false,
    video: "",
    photos: [],
    lien: "https://docs.google.com/forms/d/e/1FAIpQLSf3uDL0pPgTpzALXnGf6SNXveNGPy91PNsWZHT70MTCxFc83Q/viewform?usp=header",
    lien_click_collect: "",
    type: "evenement"
  },
  {
    titre: "Workshop #1 avec Paul",
    date: "2026-04-19",
    heure: "À confirmer",
    lieu: "Thumeries",
    description: `Un stage avec Paul, danseur professionnel ! Au programme deux styles pour tous les niveaux.<div style="display:flex;gap:10px;flex-wrap:wrap;margin:20px 0;"><div style="flex:1;min-width:200px;background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;text-align:center;"><p style="font-size:1.5rem;margin-bottom:8px;">🎤</p><p style="font-weight:700;margin-bottom:5px;">Hip-hop commercial</p><p style="color:#9894db;font-size:0.85rem;">Niveau intermédiaire</p></div><div style="flex:1;min-width:200px;background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;text-align:center;"><p style="font-size:1.5rem;margin-bottom:8px;">💫</p><p style="font-weight:700;margin-bottom:5px;">Breakdance</p><p style="color:#9894db;font-size:0.85rem;">Niveau débutant</p></div></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin:20px 0;"><div style="flex:1;min-width:200px;background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;text-align:center;"><p style="color:#9894db;font-weight:700;margin-bottom:5px;">💜 Adhérents Prism Up</p><p style="font-size:1.8rem;font-weight:900;">10€</p><p style="font-size:0.8rem;color:rgba(255,255,255,0.5);">par créneau</p></div><div style="flex:1;min-width:200px;background:rgba(152,148,219,0.1);border:1px solid rgba(152,148,219,0.3);border-radius:12px;padding:15px;text-align:center;"><p style="color:#9894db;font-weight:700;margin-bottom:5px;">🎟️ Extérieur</p><p style="font-size:1.8rem;font-weight:900;">15€</p><p style="font-size:0.8rem;color:rgba(255,255,255,0.5);">par créneau</p></div></div>`,
    prix: "10€ adhérents / 15€ extérieur",
    affiche: "images/stage1.2.png",
    estAffiche: false,
    video: "https://youtube.com/shorts/UfH6IA-EYgw",
    photos: [
      "images/stage1.1.png",
      "images/stage1.2.png",
      "images/stage1.3.jpg",
      "images/stage1.4.png",
      "images/stage1.5.jpg"
    ],
    lien: "https://www.helloasso.com/associations/prism-up/evenements/workshop-1",
    lien_click_collect: "",
    type: "stage"
  },
  {
    titre: "Sortie AGT Basket",
    date: "2026-05-24",
    heure: "",
    lieu: "Salle des sports F.Begin",
    description: "Prism Up était présent pour soutenir l'équipe lors de la demi-finale de championnat ! Une belle sortie collective dans une ambiance de feu 🏀🔥",
    prix: "",
    affiche: "images/sortie1.1.jpg",
    estAffiche: false,
    video: "https://youtube.com/shorts/UfH6IA-EYgw",
    photos: [
      "images/sortie1.1.jpg",
      "images/sortie1.4.png",
      "images/sortie1.5.jpg",
      "images/sortie1.3.jpg",
      "images/sortie1.6.png",
      "images/sortie1.7.png"
    ],
    lien: "",
    lien_click_collect: "",
    type: "sortie"
  }
];

const MEMBRES = [
  { nom: "Raphaëlle Verdière", role: "Présidente", photo: "" },
  { nom: "Romane Cartier", role: "Vice-Présidente", photo: "" },
  { nom: "Julien Delauttre", role: "Secrétaire", photo: "" },
  { nom: "Tanguy Carette", role: "Trésorier", photo: "" },
  { nom: "Eloïse Verdière", role: "Professeure de danse", photo: "" },
  { nom: "Maxime Verdière", role: "Monteur vidéo", photo: "" },
  { nom: "Clément Bouquerel", role: "Gestion de la communication", photo: "" }
];

const RMUE = {
  description: "Prism Up est une association de danse fondée par des passionnés de styles urbains.",
  historique: "Créée à Thumeries, Prism Up propose des cours de street jazz, hip hop commercial et autres styles urbains.",
  creations: [
    { titre: "Création 1", annee: "2024", description: "Description de votre première création chorégraphique." },
    { titre: "Création 2", annee: "2023", description: "Description de votre deuxième création chorégraphique." }
  ]
};