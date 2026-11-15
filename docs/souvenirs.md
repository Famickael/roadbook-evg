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

## Passer à un vrai partage entre participants

Pour que tout le groupe voie les mêmes photos, il faut un service de stockage en ligne. Le code est organisé pour que ce changement reste localisé : dans la partie « Souvenirs » du script de `index.html`, trois fonctions font tout le travail de stockage.

| Fonction | Rôle | Ce qu'elle doit renvoyer |
|---|---|---|
| `dbAll()` | Lire tous les souvenirs | Une promesse contenant la liste des enregistrements |
| `dbAdd(rec)` | Enregistrer un souvenir | Une promesse résolue une fois l'enregistrement fait |
| `dbDel(id)` | Supprimer un souvenir | Une promesse résolue une fois la suppression faite |

Un enregistrement a la forme suivante :

```js
{
  id: 12,              // identifiant attribué par le stockage
  etape: "karting",    // identifiant de l'étape, tel qu'écrit dans donnees.js
  data: "data:image/jpeg;base64,...",   // la photo réduite, ou le fichier pour une vidéo
  t: "2026-06-12T10:20:00+02:00",       // date de prise de vue
  vid: false,          // true pour une vidéo
  ext: "mp4"           // extension, pour les vidéos seulement
}
```

Il suffit de remplacer le contenu de ces trois fonctions par des appels au service choisi. Le reste de la galerie fonctionne sans modification. Les précautions à prendre dans ce cas sont décrites dans [Précautions d'usage et limites](precautions.md).

---

[Retour au README](../README.md)
