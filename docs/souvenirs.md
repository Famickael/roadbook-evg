# Le dépôt de photos

Dans ce modèle, **les photos et vidéos déposées restent dans le navigateur de la personne qui les dépose**. Rien n'est envoyé sur un serveur. La page ne nécessite donc aucun compte, aucune clé et aucun hébergement payant.

Concrètement :

- Le bouton appareil photo de chaque étape propose de prendre une photo, de filmer ou de choisir un fichier.
- Les photos sont réduites à 900 pixels de côté et compressées avant d'être enregistrées. La date de prise de vue est lue dans le fichier pour classer les souvenirs dans l'ordre chronologique.
- L'enregistrement se fait dans IndexedDB, la base de données intégrée au navigateur. Les vidéos sont limitées à environ 48 Mo.
- Les cases cochées de la liste « À faire » et les images de démonstration masquées sont mémorisées dans `localStorage`.
- Les noms de stockage sont préfixés par l'adresse de la page, pour que deux copies du modèle publiées sur le même domaine ne se mélangent pas.

Les conséquences à connaître :

- Chaque visiteur ne voit que ses propres dépôts. Deux téléphones ne partagent rien entre eux.
- Vider les données du site, ou naviguer en mode privé, efface les souvenirs déposés.

## Partager les photos entre participants

Pour que tout le groupe voie les mêmes photos, il faut un service de stockage en ligne. La page est prévue pour cela : si un « adaptateur de stockage » est chargé, il remplace le stockage du navigateur, sans autre modification.

Quand un adaptateur est actif, la page s'adapte d'elle-même :

- la galerie se rafraîchit toutes les 60 secondes pour afficher les dépôts des autres,
- la fenêtre de dépôt indique que le souvenir est partagé avec tout le groupe,
- la suppression demande confirmation « pour tout le groupe ».

### L'exemple fourni : Supabase

Le dossier `exemples/` contient un adaptateur prêt à l'emploi pour [Supabase](https://supabase.com/), un service de base de données en ligne qui propose une offre gratuite.

| Fichier | Rôle |
|---|---|
| `exemples/supabase.sql` | Crée la table des photos et les 3 fonctions d'accès, protégées par un code de groupe |
| `exemples/stockage-supabase.js` | L'adaptateur chargé par la page |

La mise en place se fait en 5 étapes :

1. Créez un projet sur Supabase.
2. Ouvrez `exemples/supabase.sql`, remplacez `CHANGEZ-MOI` par le code de votre groupe, puis exécutez le script dans l'éditeur SQL du projet.
3. Dans `exemples/stockage-supabase.js`, renseignez l'adresse du projet et sa clé publique.
4. Dans `index.html`, retirez les marques de commentaire autour de la ligne `<script src="exemples/stockage-supabase.js"></script>`.
5. Transmettez le code du groupe aux participants par un autre canal que la page.

À la première visite, chaque participant saisit le code du groupe. Il est ensuite mémorisé dans son navigateur.

### Comment l'accès est protégé

- La table des photos n'est accessible à personne directement. La page passe par 3 fonctions, qui vérifient le code du groupe avant de lire, d'ajouter ou de supprimer.
- Le code n'est pas écrit dans la page. La clé publique du projet, elle, peut y figurer : elle ne donne accès à rien sans le code.
- Les fonctions refusent tout ce qui n'est pas une photo au format attendu, et toute photo de plus de 500 Ko environ.

Ce code est une barrière simple contre les curieux. Il ne remplace pas une vraie authentification : toute personne qui le connaît peut lire, déposer et supprimer des photos.

### Ce que l'exemple ne fait pas

- **Les vidéos** : elles sont désactivées quand l'adaptateur est actif. Elles demandent un espace de fichiers et des règles d'accès supplémentaires.
- **La modération** : il n'y a pas de rôle d'administrateur. La suppression est ouverte à tous les détenteurs du code.
- **La disponibilité permanente** : avec l'offre gratuite de Supabase, un projet resté environ une semaine sans activité est mis en pause. Il faut alors le relancer depuis le tableau de bord, et penser à télécharger les photos à la fin du week-end.

Le script SQL a été vérifié sur une base Postgres, et l'adaptateur avec un service simulé. L'ensemble n'a pas été déployé sur un projet Supabase réel : un essai avec une photo de test est à faire avant le week-end.

### Écrire un adaptateur pour un autre service

Un adaptateur est un fichier qui définit `window.ROADBOOK_STOCKAGE` avant le script de la page :

```js
window.ROADBOOK_STOCKAGE = {
  videos: false,     // false si le service ne gère pas les vidéos
  rafraichir: 60,    // délai de mise à jour de la galerie, en secondes
  lister: function () { /* renvoie une promesse : la liste des souvenirs */ },
  ajouter: function (rec) { /* renvoie une promesse, résolue après l'enregistrement */ },
  supprimer: function (id) { /* renvoie une promesse, résolue après la suppression */ }
};
```

Un souvenir a la forme suivante :

```js
{
  id: 12,              // identifiant attribué par le stockage
  etape: "karting",    // identifiant de l'étape, tel qu'écrit dans donnees.js
  data: "data:image/jpeg;base64,...",   // la photo réduite, ou l'adresse du fichier
  t: "2026-06-12T10:20:00+02:00",       // date de prise de vue
  vid: false,          // true pour une vidéo
  ext: "mp4"           // extension, pour les vidéos seulement
}
```

À l'ajout, `data` contient la photo réduite sous forme de texte, ou le fichier lui-même pour une vidéo. À la lecture, `data` peut être ce même texte ou l'adresse d'un fichier en ligne.

Les précautions à prendre avec un stockage partagé sont décrites dans [Précautions d'usage et limites](precautions.md).

---

[Retour au README](../README.md)
