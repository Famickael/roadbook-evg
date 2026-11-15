# Personnaliser le roadbook

Cette page explique comment régler le camion de progression, la météo, le thème et le passage en version souvenir. Tous ces réglages se font dans `donnees.js`, sauf le dessin des personnages.

## Le camion de progression

Le petit camion rouge se déplace le long de la frise. Son comportement se règle avec le champ `camion` :

| Valeur | Comportement | Usage |
|---|---|---|
| `"auto"` | Suit l'heure pendant le week-end, et la lecture avant et après | Valeur par défaut, convient à tous les cas |
| `"horaire"` | Suit toujours l'heure réelle du programme | Pour un affichage permanent de la position du groupe |
| `"lecture"` | Suit toujours le défilement de la page | Pour une page souvenir |

En mode horaire, la position est calculée à partir de la date de chaque journée (`date`), de l'heure de chaque étape (`heure`) et du fuseau (`fuseau`) :

- À l'heure d'une étape, le camion est sur cette étape.
- Entre deux étapes, il avance de l'une vers l'autre au fil du temps. Avec un départ à 04:45 et une étape suivante à 05:15, il est à mi-chemin à 05:00.
- Dans une même journée, une heure plus petite que la précédente est comptée le lendemain. Un retour à 01:30 placé après une soirée à 22:15 est donc bien situé dans la nuit.
- Avant la première étape, le camion attend au départ. Après la dernière, il reste à l'arrivée.

Pendant le week-end, la page s'ouvre directement sur l'étape en cours. Les participants n'ont donc pas à faire défiler la frise pour savoir où en est le groupe.

Il n'y a rien d'autre à régler : si un horaire change dans `donnees.js`, le camion suit.

## La météo

Chaque journée qui déclare un lieu affiche une carte météo :

```js
{
  id: "j1",
  onglet: "Ven 12",
  date: "2026-06-12",
  meteo: { lieu: "Lénac", lat: 45.05, lon: 3.88 },
  ...
}
```

La météo se met à jour toute seule, à chaque ouverture de la page :

| Moment | Ce qui s'affiche |
|---|---|
| Plus de 10 jours environ avant la date, ou si le service météo ne répond pas | Un soleil animé et la mention « dispo ~10 j avant », pour signaler l'emplacement |
| Dans les jours qui précèdent | Les prévisions : pictogramme, températures minimale et maximale, risque de pluie, vent |
| Après la date | Le temps qu'il a réellement fait, avec la pluie en millimètres. Le pictogramme se fige |

Pour l'adapter :

- **Changer de lieu** : remplacez `lieu`, `lat` et `lon`. La latitude et la longitude d'un lieu se trouvent par un clic droit sur une carte en ligne.
- **Retirer une carte** : supprimez le champ `meteo` de la journée.
- **Retirer toute la météo** : supprimez le champ `meteo` de toutes les journées. La page ne contacte alors plus le service météo.

Les données viennent de l'API ouverte [Open-Meteo](https://open-meteo.com/), qui ne demande ni compte ni clé. La journée météo est calculée dans le fuseau horaire du lieu, déduit de ses coordonnées.

## Le thème

Le modèle fourni est sur le thème des pompiers : un pompier en pixel art se promène en bas de l'en-tête, et un camion de pompier sert de repère dans la frise. L'habillage général reprend la signalisation routière.

### Retirer ou garder les animations

Le champ `animations: false` retire le personnage de l'en-tête. Le camion de la frise est conservé, car il sert de repère de position.

Les animations se coupent aussi d'elles-mêmes chez les visiteurs qui ont demandé à leur système de réduire les animations.

### Changer le personnage et les véhicules

Les dessins se trouvent dans `index.html`, dans la partie « 3. Animations » du script. Chaque dessin est une grille de caractères, où un caractère représente un pixel et un point représente un pixel transparent :

```js
var TRUCK=[[
  "....LLLLLLLLLL......",
  ".RRRRRRRRRRRRRRR....",
  ".RWWRRRRRRRRRRRR....",
  ...
]];
```

Les couleurs sont définies juste au-dessus, dans la palette `PAL`. Chaque lettre y correspond à une couleur : `R` pour le rouge du camion, `W` pour les vitres, `T` pour les roues.

| Dessin | Rôle | Taille |
|---|---|---|
| `HERO` | Le personnage, en 3 poses : debout et 2 poses de marche | 10 × 15 pixels |
| `TRUCK` | Le camion de la frise et de la rétrospective | 20 × 10 pixels |
| `CAR`, `VAN` | La voiture et la camionnette des saynètes | 20 × 10 et 22 × 9 pixels |
| `CLUB`, `BAGUETTE`, `HEART`, `EXCLAM` | Les accessoires des saynètes | Variable |

Pour changer de thème, il suffit de redessiner `HERO` et `TRUCK` et d'ajuster la palette. Un cycliste et son vélo, un skieur et une dameuse ou un marin et son voilier se dessinent de la même façon.

### Les saynètes de l'en-tête

Le personnage marche, puis joue une saynète tirée de la liste suivante :

| Fonction | Saynète |
|---|---|
| `scEat` | Il mange un sandwich |
| `scFriends` | Un ami le rejoint et ils sautent de joie |
| `scCar` | Une voiture l'emmène |
| `scKidnap` | Une camionnette l'enlève |
| `scClub` | Il entre dans un établissement de nuit |

La liste se trouve dans la ligne `var scenes=[scEat,scFriends,scCar,scKidnap,scClub];`. Retirer un nom de cette ligne retire la saynète.

### Changer les couleurs

Les couleurs de la page sont regroupées en tête de `index.html`, dans le bloc `:root` :

| Variable | Usage |
|---|---|
| `--route` | Le bleu de l'en-tête et des liens |
| `--sign` | Le vert des panneaux de journée |
| `--borne` | Le rouge du bandeau et des étapes clés |
| `--amber` | Le jaune des alertes et de l'onglet actif |
| `--paper`, `--card`, `--ink` | Le fond, les cartes et le texte |

## La version souvenir

Une fois le week-end passé, la page peut devenir un album à offrir. Le champ `souvenir: true` masque tout ce qui ne sert qu'à l'organisation :

- le bandeau « ne pas partager »,
- la liste « À faire », le budget et les infos pratiques,
- le bouton de partage de frais,
- les prix et les mentions de réservation sur les étapes.

Le programme, les fiches des lieux, les photos et la rétrospective sont conservés. Les textes des étapes peuvent ensuite être réécrits au passé, avec les anecdotes du week-end.

Avec le camion en mode `"auto"`, rien d'autre n'est à changer : il suit la lecture dès que le week-end est terminé.

## Le bandeau

Le bandeau rouge rappelle de ne pas partager la page avec l'invité d'honneur. Il se règle avec 2 champs :

- `bandeau` : le texte affiché. Un texte vide retire le bandeau.
- `finBandeau` : la date à partir de laquelle il disparaît de lui-même.

Ce bandeau est un rappel et non une protection. La page reste accessible à toute personne qui en connaît l'adresse.

---

[Retour au README](../README.md)
