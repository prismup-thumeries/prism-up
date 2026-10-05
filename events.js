// ============================================================
// PRISM UP — Données des ÉVÉNEMENTS, STAGES et SORTIES
// ------------------------------------------------------------
// Pour ajouter un événement : copie un bloc { ... }, colle-le
// dans la liste et modifie les valeurs. Rien d'autre à toucher :
// le site le range tout seul dans "À venir" ou "Passés" et dans
// la bonne saison (septembre → août).
//
// Champs disponibles (seuls titre, date et type sont obligatoires) :
//   titre        : "Workshop avec Paul"
//   date         : "AAAA-MM-JJ"
//   type         : "evenement" | "stage" | "sortie"
//   heure        : "9h00 - 10h30"
//   lieu         : "Salle annexe P. Legrain, Thumeries"
//   description  : texte libre (les retours à la ligne sont gardés)
//   affiche      : "images/mon-affiche.jpg"  → affichée en entier, jamais coupée
//   cadrage      : "top" | "center" | "bottom" | "center 30%" → règle le
//                  recadrage de l'affiche dans les petites vignettes
//   photos       : ["images/photo1.jpg", ...] → galerie après l'événement
//   video        : lien YouTube (shorts ou normal)
//   tarifs       : [{ label: "Adhérents", prix: "10 €" }, ...]
//   lien         : lien de réservation (HelloAsso…)
//   texteLien    : texte du bouton (par défaut "Réserver ma place")
//   annule       : true pour marquer l'événement comme annulé
//
// Astuce photos : exporte en JPG, 1080 px de large max (≈ 200-400 Ko).
// Les PNG de 3 Mo ralentissent beaucoup le site sur téléphone.
// ============================================================

const EVENEMENTS = [
  {
    titre: "Workshop Hip-Hop Commercial avec Jow Tayler",
    type: "stage",
    date: "2026-10-31",
    heure: "9h00 - 10h30",
    lieu: "Salle annexe P. Legrain, Thumeries",
    description: "Workshop #3 avec le danseur professionnel Jow Tayler (Lille London Studio). Niveau débutant à intermédiaire. Viens apprendre une choré de folie !",
    affiche: "images/workshopjow.jpg",
    cadrage: "top",
    tarifs: [
      { label: "Adhérents Prism Up", prix: "10 €" },
      { label: "Extérieurs", prix: "15 €" }
    ],
    lien: "https://www.helloasso.com/associations/prism-up/evenements/stage-avec-jow-tayler"
  },
  {
    titre: "Workshop Breakdance avec Paul",
    type: "stage",
    date: "2026-10-31",
    heure: "11h00 - 12h30",
    lieu: "Salle annexe P. Legrain, Thumeries",
    description: "Stage de breakdance ouvert à tous avec le danseur professionnel Paul. Au programme : technique, passages au sol et musicalité.",
    affiche: "images/workshoppaul2.2.jpg",
    cadrage: "top",
    video: "https://youtube.com/shorts/UfH6IA-EYgw",
    tarifs: [
      { label: "Adhérents Prism Up", prix: "10 €" },
      { label: "Extérieurs", prix: "15 €" }
    ],
    lien: "https://www.helloasso.com/associations/prism-up/evenements/stage-avec-paul-3"
  },
  {
    titre: "Participation au Téléthon",
    type: "evenement",
    date: "2026-12-05",
    heure: "Après-midi",
    lieu: "Thumeries",
    description: "Prism Up se mobilise pour le Téléthon ! Venez nous voir pour une représentation pleine d'énergie et de solidarité, aux côtés de l'association Le Souffle de Thumeries.",
    lien: "https://www.facebook.com/p/Le-Souffle-de-Thumeries-100020494788317/",
    texteLien: "Page Facebook de l'organisateur"
  },
  {
    titre: "Forum des associations",
    type: "evenement",
    date: "2026-09-05",
    heure: "À partir de 10h",
    lieu: "Thumeries",
    description: "Rencontre avec l'équipe Prism Up et inscriptions en physique pour la saison 2026-2027."
  },
  {
    titre: "Portes ouvertes",
    type: "evenement",
    date: "2026-07-04",
    heure: "Horaires des cours",
    lieu: "Thumeries",
    description: "Venez assister à nos cours et découvrir l'association avant la saison prochaine."
  },
  {
    titre: "Fête de la Musique",
    type: "evenement",
    date: "2026-06-21",
    lieu: "Place du Général de Gaulle, Thumeries",
    description: "Prism Up était présent à la Fête de la Musique de Thumeries pour un moment festif."
  },
  {
    titre: "Gala #0 — Welcome to Prism Up",
    type: "evenement",
    date: "2026-06-13",
    heure: "18h30",
    lieu: "Salle des fêtes F. Malle, Thumeries",
    description: "Notre tout premier gala de danse, exceptionnellement gratuit pour notre première année. Une soirée placée sous le signe de l'énergie, du partage et de la passion.",
    affiche: "images/affiche-gala.png",
    cadrage: "top",
    tarifs: [{ label: "Entrée", prix: "Gratuit" }]
  },
  {
    titre: "Sortie AGT Basket",
    type: "sortie",
    date: "2026-05-24",
    lieu: "Salle des sports F. Begin",
    description: "Prism Up était là pour soutenir l'équipe lors de la demi-finale de championnat ! Une belle sortie collective dans une ambiance de feu.",
    affiche: "images/sortie1.1.jpg",
    photos: [
      "images/sortie1.1.jpg",
      "images/sortie1.5.jpg",
      "images/sortie1.3.jpg",
      "images/sortie1.4.png",
      "images/sortie1.6.png",
      "images/sortie1.7.png"
    ]
  },
  {
    titre: "Workshop #1 avec Paul",
    type: "stage",
    date: "2026-04-19",
    lieu: "Thumeries",
    description: "Premier workshop avec Paul, danseur et chorégraphe. Merci à tous les participants !",
    affiche: "images/stage1.2.png",
    cadrage: "top",
    video: "https://youtube.com/shorts/UfH6IA-EYgw",
    tarifs: [
      { label: "Adhérents Prism Up", prix: "10 €" },
      { label: "Extérieurs", prix: "15 €" }
    ],
    photos: [
      "images/stage1.3.jpg",
      "images/stage1.5.jpg",
      "images/stage1.1.png",
      "images/stage1.2.png",
      "images/stage1.4.png"
    ]
  }
];

// Nom affiché pour chaque saison dans les archives.
// Une saison va de septembre à août. Si une saison n'est pas listée ici,
// le site affiche automatiquement "Saison 2027-2028", etc.
const NOMS_SAISONS = {
  "2025-2026": "Demi-saison 2026"
};

const MEMBRES = [
  { nom: "Raphaëlle Verdière", role: "Présidente", photo: "" },
  { nom: "Romane Cartier", role: "Vice-présidente", photo: "" },
  { nom: "Julien Delauttre", role: "Secrétaire", photo: "" },
  { nom: "Tanguy Carette", role: "Trésorier", photo: "" },
  { nom: "Eloïse Verdière", role: "Professeure de danse", photo: "" },
  { nom: "Maxime Verdière", role: "Montage vidéo", photo: "" },
  { nom: "Clément Bouquerel", role: "Communication", photo: "" }
];
