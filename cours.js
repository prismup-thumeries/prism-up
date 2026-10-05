// ============================================================
// PRISM UP — Données du PLANNING DES COURS
// ------------------------------------------------------------
// Pour ajouter un cours : copie une ligne { ... } et modifie-la.
// Pour fermer les inscriptions d'un cours : complet: true
//
//   jour      : "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi"
//   public    : "enfants" | "ados" | "adultes" | "option"  (sert au filtre)
//   salle     : clé de la liste SALLES plus bas
//   essai     : date du cours d'essai gratuit (texte libre)
//   note      : petite précision affichée dans la fiche du cours
// ============================================================

const SAISON_COURS = "2026-2027";

const LIEN_ADHESION = "https://www.helloasso.com/associations/prism-up/adhesions/adhesion-prism-up-2026-2027";

const TARIFS_COURS = {
  principal: 65,   // € par cours principal
  option: 30       // € pour l'option approfondissement
};

const SALLES = {
  legrain: {
    nom: "Salle annexe P. Legrain",
    precision: "Salle des sports Pierre Legrain",
    maps: "https://www.google.com/maps/place/Salle+Pierre+Legrain/@50.4703874,3.0681525,18z"
  },
  assos: {
    nom: "Salle des associations",
    precision: "À droite de l'école",
    maps: "https://www.google.com/maps?q=50.476677,3.054848"
  }
};

const COURS = [
  // LUNDI
  { jour: "lundi", debut: "18h00", fin: "19h00", titre: "CE2 - CM1", detail: "Enfants", public: "enfants", salle: "legrain", complet: true, essai: "Lundi 7 septembre 2026" },
  { jour: "lundi", debut: "19h00", fin: "20h00", titre: "Approfondissement", detail: "8 ans et +", public: "option", salle: "legrain", essai: "Lundi 7 septembre 2026", note: "Pour pousser sa technique et son sens artistique. En complément obligatoire d'un cours principal." },
  { jour: "lundi", debut: "20h00", fin: "21h00", titre: "Lycéens", detail: "Ados", public: "ados", salle: "legrain", complet: true, essai: "Lundi 7 septembre 2026" },

  // MARDI
  { jour: "mardi", debut: "18h00", fin: "19h00", titre: "CP - CE1", detail: "Enfants", public: "enfants", salle: "assos", complet: true, essai: "Mardi 8 septembre 2026" },
  { jour: "mardi", debut: "19h00", fin: "20h00", titre: "Approfondissement", detail: "14 ans et +", public: "option", salle: "assos", essai: "Mardi 8 septembre 2026", note: "Pour pousser sa technique et son sens artistique. En complément obligatoire d'un cours principal." },
  { jour: "mardi", debut: "20h00", fin: "21h00", titre: "Adultes 3", detail: "Ouvert à tous, idéal débutants", public: "adultes", salle: "assos", essai: "Mardi 8 septembre 2026" },

  // JEUDI
  { jour: "jeudi", debut: "18h00", fin: "19h00", titre: "CM1 - CM2", detail: "Enfants", public: "enfants", salle: "assos", essai: "Jeudi 10 septembre 2026", note: "Pour les CM1 ayant déjà une expérience en club (sinon, le lundi)." },
  { jour: "jeudi", debut: "19h00", fin: "20h00", titre: "Adultes 1", detail: "Rythme plus soutenu", public: "adultes", salle: "assos", essai: "Jeudi 10 septembre 2026" },

  // SAMEDI
  { jour: "samedi", debut: "9h00", fin: "10h00", titre: "Maternelle", detail: "Moyenne et grande section", public: "enfants", salle: "legrain", complet: true, essai: "Samedi 12 septembre 2026" },
  { jour: "samedi", debut: "10h00", fin: "11h00", titre: "Adultes 2", detail: "Ouvert à tous, idéal débutants", public: "adultes", salle: "legrain", complet: true, essai: "Samedi 12 septembre 2026" },
  { jour: "samedi", debut: "11h00", fin: "12h00", titre: "Collégiens", detail: "Ados", public: "ados", salle: "legrain", essai: "Samedi 12 septembre 2026" }
];

// Questions fréquentes affichées en bas de la page Cours (repliées par défaut)
const FAQ_COURS = [
  {
    q: "Quel groupe adulte choisir ?",
    r: "Adultes 2 et Adultes 3 sont ouverts à tous, parfaits pour débuter ou reprendre en douceur. Adultes 1 propose un rythme plus dynamique."
  },
  {
    q: "C'est quoi l'option Approfondissement ?",
    r: "Un cours en plus pour travailler la technique et le sens artistique. Dès 8 ans, en complément obligatoire d'un cours principal (+30 €)."
  },
  {
    q: "Mon enfant est en CM1, lundi ou jeudi ?",
    r: "Le lundi pour un profil débutant / découverte, le jeudi si l'enfant a déjà dansé en club."
  },
  {
    q: "Le cours est complet, que faire ?",
    r: "Contactez-nous pour être inscrit sur liste d'attente : on vous prévient dès qu'une place se libère."
  }
];
