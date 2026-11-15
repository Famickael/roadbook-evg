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

## Partager les souvenirs entre participants

Pour que tout le groupe voie les mêmes photos, il faut un service de stockage en ligne. La page est prévue pour cela : si un « adaptateur de stockage » est chargé, il remplace le stockage du navigateur, sans autre modification.

### Le branchement fourni : Supabase

Le dossier `exemples/` contient un branchement prêt à l'emploi pour [Supabase](https://supabase.com/), un service de base de données en ligne qui propose une offre gratuite.

1. Créez un projet sur Supabase.
2. Copiez le contenu de `exemples/supabase.sql` dans l'éditeur SQL du projet et exécutez-le.
3. Dans `exemples/stockage-supabase.js`, renseignez l'adresse du projet et sa clé publique.
4. Dans `index.html`, retirez les marques de commentaire autour de la ligne `<script src="exemples/stockage-supabase.js"></script>`.

Les photos et les vidéos déposées sont alors visibles par tous les participants, sans compte et sans code.

Quand le partage est actif, la page s'adapte d'elle-même :

- la galerie se rafraîchit toutes les 60 secondes pour afficher les dépôts des autres,
- la fenêtre de dépôt indique que le souvenir est partagé avec tout le groupe,
- la suppression demande confirmation « pour tout le groupe ».

### Ce qu'il faut savoir

- **L'accès est ouvert par défaut.** Toute personne qui a l'adresse de la page peut voir, déposer et supprimer. Deux protections par code sont proposées en option, décrites dans [Les options](options.md).
- **Les photos sont enregistrées dans la base**, réduites à 500 Ko au plus. Les vidéos vont dans un espace de fichiers, limité à 50 Mo par vidéo.
- **Supprimer une vidéo la retire de la galerie**, mais son fichier reste dans l'espace de fichiers du projet. Il se supprime depuis le tableau de bord de Supabase.
- **Avec l'offre gratuite**, un projet resté environ une semaine sans activité est mis en pause. Il se relance depuis le tableau de bord. Pensez à télécharger les souvenirs à la fin du week-end.
- **La clé publique** du projet peut figurer dans la page. La clé « service_role », elle, ne doit jamais y être copiée.

Le script SQL a été vérifié sur une base Postgres (29 contrôles), et l'adaptateur avec un service simulé. L'ensemble n'a pas été déployé sur un projet Supabase réel : un essai avec une photo et une vidéo est à faire avant le week-end.

### Brancher un autre service

Un adaptateur est un fichier qui définit `window.ROADBOOK_STOCKAGE` avant le script de la page :

```js
window.ROADBOOK_STOCKAGE = {
  videos: true,      // false si le service ne gère pas les vidéos
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
  ext: "mp4",          // extension, pour les vidéos seulement
  msg: false,          // true pour un message vidéo
  auteur: ""           // prénom affiché avec un message vidéo
}
```

À l'ajout, `data` contient la photo réduite sous forme de texte, ou le fichier lui-même pour une vidéo. À la lecture, `data` peut être ce même texte ou l'adresse d'un fichier en ligne.

Le fichier `exemples/stockage-supabase.js` fait une centaine de lignes et peut servir de modèle.

Les précautions à prendre avec un stockage partagé sont décrites dans [Précautions d'usage et limites](precautions.md).

---

[Retour au README](../README.md)
