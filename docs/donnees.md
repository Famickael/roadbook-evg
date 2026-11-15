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
| `options` | Les fonctions facultatives : messages vidéo, codes du stockage partagé. Voir [Les options](options.md) |
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
  surprise: { code: "...", titre: "...", texte: "..." },   // facultatif : étape masquée par un code
  fenetres: [{ id: "collation", label: "🍽 Collation" }],  // facultatif : boutons vers une fenêtre
  fiche: "karting",                   // facultatif : bouton vers la fiche pratique du lieu
  itineraire: "Circuit de Brumeval"   // facultatif : bouton d'itinéraire
},
{ trajet: "🚗 ~45 min" }              // un temps de route entre deux étapes
```

## Les autres rubriques, champ par champ

**Une journée** (rubrique `jours`)

| Champ | Rôle |
|---|---|
| `id` | Identifiant unique de la journée, sans espace ni accent |
| `onglet` | Texte du bouton de la barre des jours, par exemple `"Ven 12"`. Son premier mot sert de titre à la carte météo |
| `date` | Date de la journée, écrite `AAAA-MM-JJ`. Elle sert à la météo et au camion |
| `titre` | Titre du panneau vert |
| `etape`, `trajet`, `qui` | Facultatifs : surtitre, itinéraire du jour et participants |
| `meteo` | Facultatif : `{ lieu, lat, lon }` |
| `programme` | La liste des étapes et des trajets |

**Une fenêtre** (rubrique `fenetres`). Son nom, par exemple `collation`, est l'identifiant cité par les étapes.

| Champ | Rôle |
|---|---|
| `titre` | Titre de la fenêtre |
| `intro` | Facultatif : phrase d'introduction |
| `sections` | Liste de blocs `{ titre, lignes }`. Le `titre` d'un bloc est facultatif, `lignes` est une liste de textes |
| `note` | Facultatif : remarque en petit, en bas de la fenêtre |

**Une tâche** (rubrique `aFaire`)

| Champ | Rôle |
|---|---|
| `id` | Identifiant unique, qui sert à mémoriser la case cochée |
| `titre` | Intitulé de la tâche. Le numéro est ajouté par la page |
| `detail` | Facultatif : précision, téléphone ou lien |
| `echeance` | Facultatif : délai, affiché en jaune |
| `fait` | Facultatif : `true` pour une case cochée d'office |

**Le budget** (rubrique `budget`)

| Champ | Rôle |
|---|---|
| `legende` | Facultatif : explication des pictogrammes utilisés |
| `postes` | Liste de `{ libelle, montant }` |
| `participations` | Facultatif : liste de `{ qui, montant }` |
| `notes` | Facultatif : liste de remarques, par exemple la règle de répartition |

**Les infos pratiques**

| Champ | Rôle |
|---|---|
| `infos` | Liste de `{ lieu, detail }` : un lieu et son adresse ou ses coordonnées |
| `telephones` | Liste de `{ nom, numero }` : les raccourcis d'appel. Un numéro français s'écrit `01 23 45 67 89`, un numéro étranger avec son indicatif `+32 ...` |
| `noteInfos` | Facultatif : remarque en bas de la fenêtre |

**Les photos de démonstration** (rubrique `photos`)

| Champ | Rôle |
|---|---|
| `id` | Numéro unique de l'image |
| `etape` | Identifiant de l'étape à laquelle l'image est rattachée |
| `date` | Date et heure de prise de vue, pour le classement |
| `fichier` | Chemin de l'image, par exemple `photos/demo-01.jpg` |

**Texte de la rétrospective** : `retrospective` est la phrase affichée sous « Terminus », en bas du programme.

## Repères utiles

- Les identifiants cités dans `fenetres` et `fiche` renvoient aux entrées de la rubrique `fenetres` du fichier.
- Les photos sont rattachées à l'identifiant de leur étape. Une étape peut donc être ajoutée, retirée ou déplacée sans décaler les photos des autres. En revanche, l'identifiant d'une étape ne doit plus changer une fois que des photos y ont été déposées.
- Les textes acceptent du HTML simple, par exemple `<b>` ou un lien. Ils sont insérés tels quels dans la page : n'y collez que votre propre contenu.
- Le camion, la météo, le thème et la version souvenir sont détaillés dans [Personnaliser le roadbook](personnaliser.md).
- Pour vérifier le fichier après une modification, ouvrez la page en ajoutant `?verifier` à la fin de son adresse. Un encadré liste les points à corriger : identifiant en double, heure ou date impossible, fiche introuvable, rubrique mal orthographiée. Si le fichier est illisible, par exemple à cause d'une virgule oubliée, la page le signale d'elle-même.
- Pour démarrer avec une galerie vide, remplacez la rubrique `photos` par `[]` et supprimez les images du dossier `photos/`.
- Les couleurs se règlent dans les variables CSS du bloc `:root`, en tête de `index.html`.

---

[Retour au README](../README.md)
