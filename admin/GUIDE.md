# Espace admin Prism Up — mode d'emploi

Adresse : **https://prism-up.fr/admin** (fonctionne sur téléphone et ordinateur).

Ce que tu peux y modifier sans toucher au code :

| Section | Exemples |
|---|---|
| 📣 Bandeau d'alerte | « Cours de ce soir annulé », « Salle changée samedi » |
| 🎭 Événements | Ajouter un stage, une affiche, les photos après l'événement |
| 📅 Planning des cours | Passer un cours en « Complet », changer un horaire, la FAQ |
| 💜 Équipe et profs | Membres du bureau, posts Instagram des profs |

Après **Enregistrer**, le site se met à jour en **1 à 2 minutes**.

---

## Qui peut modifier ?

Seules les personnes qui ont un compte GitHub **avec les droits sur le dépôt**
`prismup-thumeries/prism-up`. Un visiteur qui tombe sur /admin ne peut rien faire.

Chaque modification est enregistrée dans l'historique GitHub (qui, quoi, quand) :
en cas d'erreur, on peut toujours revenir en arrière.

---

## 1re connexion — pour toi (compte prismup-thumeries)

À faire **une seule fois par appareil** :

1. Sur GitHub (connecté avec le compte de l'asso) : photo de profil → **Settings**
   → tout en bas **Developer settings** → **Personal access tokens**
   → **Fine-grained tokens** → **Generate new token**.
2. Remplis :
   - **Token name** : `Admin site Prism Up`
   - **Expiration** : 1 an (tu en recréeras un l'an prochain)
   - **Repository access** : *Only select repositories* → `prism-up`
   - **Permissions → Repository permissions → Contents** : **Read and write**
3. **Generate token**, puis **copie** le code (il ne s'affiche qu'une fois).
4. Va sur **prism-up.fr/admin** → **Se connecter avec un jeton d'accès** → colle le code.

C'est tout : l'appareil reste connecté.

## Donner l'accès à un membre de l'asso

1. Le membre crée un compte gratuit sur github.com.
2. Toi : dépôt `prism-up` sur GitHub → **Settings** → **Collaborators**
   → **Add people** → son pseudo GitHub. Il accepte l'invitation reçue par e-mail.
3. Le membre crée sa clé : **Settings** → **Developer settings** →
   **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)** :
   - **Note** : `Admin site Prism Up`
   - **Expiration** : 1 an
   - **Scope** : coche seulement **public_repo**
     (ou **repo** si le dépôt est privé)
4. Il colle la clé sur **prism-up.fr/admin** → **Se connecter avec un jeton d'accès**.

**Retirer un accès** : Settings → Collaborators → **Remove**. Effet immédiat.

> ⚠️ Une clé d'accès, c'est comme un mot de passe : ne jamais la partager
> ni l'envoyer par message. Si elle fuite : GitHub → Personal access tokens → **Delete**.

---

## Agenda des parents (abonnement)

Sur la page Cours, chaque fiche a un bouton **« Ajouter ce cours à mon agenda »**
(et la page Événements propose l'agenda des événements). Les parents s'abonnent
une fois ; ensuite leur agenda se met à jour **tout seul**.

Ce qui le met à jour, depuis l'admin → **📅 Planning des cours** :

- **Premier / dernier jour de cours** : début et fin de la saison.
- **Jours sans cours** : ajoute les vacances scolaires, jours fériés, jour du gala…
  Ils disparaissent automatiquement de l'agenda des parents.
- Les **événements** ajoutés dans 🎭 Événements apparaissent aussi.

Après un enregistrement, GitHub régénère les agendas (1 à 3 minutes), puis
chaque téléphone les relit à son rythme (souvent dans l'heure, parfois jusqu'à
une journée sur Google Agenda).

> Ne renomme pas l'**identifiant** d'un cours : il sert d'adresse à l'agenda
> des parents abonnés.

## Astuces

- **Bandeau d'alerte** : mets toujours une date dans « Afficher jusqu'au ».
  Le bandeau disparaît tout seul le lendemain, même si tu oublies de l'enlever.
- **Affiches** : envoie l'image telle quelle, elle est affichée en entier.
  Les photos sont réduites automatiquement à l'envoi.
- **Photos d'événement** : évite les photos posées au milieu d'un grand cadre
  vide (exports Canva) ; recadre-les avant.
- **Événement du même jour** : ils sont mis en avant côte à côte automatiquement.
- **Thème Halloween / saisons** : se règle dans `js/main.js` (`THEMES_SAISON`).
