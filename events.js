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
    date: "2026-07-04",
    heure: "Horaires des cours",
    lieu: "Thumeries",
    description: `Venez découvrir Prism Up lors de nos portes ouvertes ! Assistez à nos cours et rejoignez l'aventure pour la saison prochaine 🎉`,
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
    titre: "Workshop #1 avec Paul",
    date: "2026-04-19",
    annule: false,
    heure: "À confirmer",
    lieu: "Thumeries",
    description: "Rejoignez-nous pour un workshop exceptionnel avec Paul, danseur et chorégraphe renommé. Une occasion unique d'apprendre et de partager votre passion pour la danse !",
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
    lien: "",
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
    video: "",
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
  },
  {
    titre: "Forum des associations — Inscriptions 2026-2027",
    date: "2026-09-05",
    heure: "à partir de 10h",
    lieu: "Thumeries",
    description: "Rendez-vous au Forum des associations de Thumeries le samedi 5 septembre 2026. C'est l'événement important de la rentrée : vous pourrez rencontrer l'équipe Prism Up, poser vos questions et faire votre inscription en physique pour la saison 2026-2027. 💜",
    prix: "",
    affiche: "",
    estAffiche: false,
    video: "",
    photos: [],
    lien: "rejoindre.html",
    lien_click_collect: "",
    type: "evenement"
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
