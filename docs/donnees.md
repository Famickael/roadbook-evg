# Le fichier `donnees.js`

Tout le contenu de la page se règle dans ce fichier. Cette page décrit ses rubriques et la façon d'écrire une étape.

## Les rubriques

Le fichier décrit un objet unique. Ses rubriques correspondent aux zones de la page.

| Rubrique | Ce qu'elle règle |
|---|---|
| `titre`, `surtitre`, `accroche` | L'en-tête bleu |
| `bandeau`, `finBandeau` | Le texte du bandeau rouge et la date à partir de laquelle il disparaît |
| `fuseau` | Le décalage horaire du lieu du week-end, par exemple `"+02:00"` en été en France |
| `camion` | Le comportement du camion de la frise : `"auto"`, `"horaire"` ou `"lecture"` |
| `animations` | `false` pour retirer le personnage animé de l'en-tête |
| `souvenir` | `true` après le week-end, pour masquer ce qui ne sert qu'à l'organisation |
| `lienDepenses` | L'adresse d'un outil de partage de frais. Vide, le bouton est masqué |
| `jours` | Les journées, avec leur onglet, leur date, le lieu de la météo et leur programme |
| `fenetres` | Les fenêtres ouvertes par les boutons : menus, listes de courses, fiches pratiques |
| `aFaire` | La liste des réservations et tâches à cocher |
| `budget` | Les postes de dépense, la participation par personne et les notes |
| `infos`, `telephones` | La fenêtre « Infos pratiques » et ses raccourcis d'appel |
| `photos` | Les images de démonstration et l'étape à laquelle chacune est rattachée |

## Écrire une étape

Une étape du programme s'écrit ainsi :

```js
{
  id: "karting",                      // identifiant unique, sans espace ni accent
  heure: "09:45",
  duree: "1h30 de piste",             // facultatif
  type: "cle",                        // facultatif : "cle" (pastille rouge) ou "detente" (pastille bleue)
  titre: "Karting du circuit de Brumeval",
  texte: "Arrivée 15 min avant l'ouverture.",
  alerte: "Chaussures fermées obligatoires",   // facultatif : consigne mise en avant
  reserve: "10h00",                   // facultatif : affiche la pastille « Réservé »
  prix: "55 €",                       // facultatif : montant affiché sur une étiquette
  fenetres: [{ id: "collation", label: "🍽 Collation" }],  // facultatif : boutons vers une fenêtre
  fiche: "karting",                   // facultatif : bouton vers la fiche pratique du lieu
  itineraire: "Circuit de Brumeval"   // facultatif : bouton d'itinéraire
},
{ trajet: "🚗 ~45 min" }              // un temps de route entre deux étapes
```

## Repères utiles

- Les identifiants cités dans `fenetres` et `fiche` renvoient aux entrées de la rubrique `fenetres` du fichier.
- Les photos sont rattachées à l'identifiant de leur étape. Une étape peut donc être ajoutée, retirée ou déplacée sans décaler les photos des autres. En revanche, l'identifiant d'une étape ne doit plus changer une fois que des photos y ont été déposées.
- Les textes acceptent du HTML simple, par exemple `<b>` ou un lien. Ils sont insérés tels quels dans la page : n'y collez que votre propre contenu.
- Le camion, la météo, le thème et la version souvenir sont détaillés dans [Personnaliser le roadbook](personnaliser.md).
- Pour démarrer avec une galerie vide, remplacez la rubrique `photos` par `[]` et supprimez les images du dossier `photos/`.
- Les couleurs se règlent dans les variables CSS du bloc `:root`, en tête de `index.html`.

---

[Retour au README](../README.md)
