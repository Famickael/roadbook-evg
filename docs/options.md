# Les options

Le modèle fonctionne sans aucune de ces options. Chacune s'active séparément dans `donnees.js`, selon les besoins du week-end.

| Option | Ce qu'elle apporte | Demande un stockage partagé ? |
|---|---|---|
| Étape surprise | Masque une étape derrière un titre de couverture | Non |
| Messages vidéo | Les proches laissent un message filmé à chaque étape | Oui, pour être utile |
| Code d'accès aux souvenirs | Un code pour voir et déposer les souvenirs | Oui |
| Code de suppression | Un code pour supprimer un souvenir | Oui |

Le stockage partagé est décrit dans [Dépôt de photos](souvenirs.md).

## L'étape surprise

Une étape peut être masquée tant qu'un code n'a pas été saisi. La page affiche à sa place un titre et un texte de couverture. Un bouton discret « ··· » permet aux organisateurs de saisir le code pour voir la vraie étape, sa fiche pratique et son itinéraire.

```js
{
  id: "soufflerie",
  heure: "11:15",
  titre: "Soufflerie AéroTube — chute libre indoor",
  texte: "Deux vols de chute libre indoor chacun.",
  fiche: "soufflerie",
  surprise: {
    code: "surprise",
    titre: "Visite du vieux bourg de Bois-Joli",
    texte: "Balade dans les ruelles et café en terrasse avant le pique-nique."
  }
}
```

Dans la démonstration, l'étape du dimanche à 11:15 est une surprise. Son code est `surprise`.

À savoir :

- Le code est mémorisé dans le navigateur de la personne qui l'a saisi. Les autres visiteurs continuent de voir la couverture.
- En version souvenir (`souvenir: true`), les étapes surprises sont dévoilées pour tout le monde.
- Pensez au reste de la page : la liste à faire, le budget, les infos pratiques et le titre de la journée ne doivent pas nommer l'activité. La démonstration parle d'« activité surprise du dimanche ».
- C'est un cache, pas un coffre-fort. Le contenu réel et le code sont écrits dans `donnees.js`, et une personne curieuse qui ouvre ce fichier peut les lire.

## Les messages vidéo

Avec `messagesVideo: true`, chaque étape reçoit un bouton rouge. Il permet aux proches de se filmer ou de choisir une vidéo, qui sera visionnée à cette étape du programme. Le prénom de l'auteur est demandé une fois et affiché avec le message.

```js
options: { messagesVideo: true, codeAccesPhotos: false, codeSuppression: false },
```

Les messages sont rangés à part des photos : ils n'apparaissent pas dans la rétrospective, mais ils sont inclus dans le téléchargement en zip.

Cette option n'a d'intérêt qu'avec un stockage partagé. Sans lui, un message reste dans le navigateur de la personne qui l'a enregistré.

## Les codes du stockage partagé

Par défaut, le stockage partagé est ouvert : toute personne qui a l'adresse de la page peut voir, déposer et supprimer des souvenirs. C'est le réglage le plus simple pour un groupe d'amis, et aucun code n'est demandé aux participants.

Deux protections peuvent être ajoutées, ensemble ou séparément.

| Protection | Effet | Usage typique |
|---|---|---|
| Code d'accès | Demandé une fois à chaque participant pour voir et déposer | La page circule au-delà du groupe |
| Code de suppression | Demandé au moment de supprimer un souvenir | Tout le monde dépose, seuls les organisateurs suppriment |

Chaque protection s'active en 2 temps :

1. **Dans la base** : à la fin de `exemples/supabase.sql`, la partie 4 contient une ligne par code. Remplacez la valeur et exécutez la ligne dans l'éditeur SQL.
2. **Dans `donnees.js`** : passez l'option correspondante à `true`, pour que la page demande le code.

```js
options: { messagesVideo: false, codeAccesPhotos: true, codeSuppression: true },
```

Le code lui-même n'est jamais écrit dans la page. Il est vérifié par la base, et il se transmet aux participants par un autre canal.

À savoir :

- Si un code de suppression est réglé, le code d'accès ne suffit pas pour supprimer.
- Les codes protègent la liste des souvenirs et les photos. Une vidéo reste accessible à qui connaît l'adresse exacte de son fichier, qui est longue et non devinable.
- Ces codes sont une barrière simple, partagée par tout un groupe. Ils ne remplacent pas des comptes individuels.

---

[Retour au README](../README.md)
