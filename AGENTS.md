# Guide pour les assistants IA

Ce fichier donne à un assistant IA le contexte utile pour modifier ce projet sans le lire en entier. La documentation destinée aux personnes est dans `README.md` et `docs/`.

## Le projet en 5 lignes

- Page web statique d'un roadbook de week-end, pensée pour le smartphone. Pas de dépendance, pas d'étape de compilation, pas de serveur.
- `donnees.js` contient tout le contenu. `index.html` contient la structure, les styles et le script.
- La page se construit dans le navigateur à partir de l'objet `window.ROADBOOK`.
- Les photos déposées restent dans le navigateur (IndexedDB), sauf si un adaptateur de stockage est chargé.
- Les textes de l'interface, les commentaires et la documentation sont en français. Les données fournies sont fictives.

## Quel fichier lire selon la demande

Ne lisez que ce qui sert à la demande. `index.html` fait plus de 1 100 lignes : lisez la section concernée, pas le fichier entier.

| Demande | À lire | À modifier |
|---|---|---|
| Changer le programme, les textes, le budget, la liste à faire | L'en-tête de `donnees.js` (50 premières lignes), puis la rubrique concernée | `donnees.js` uniquement |
| Comprendre un champ de données | `docs/donnees.md` | Rien |
| Régler le camion, la météo, la version souvenir | `docs/personnaliser.md` | `donnees.js` |
| Activer une option (surprise, messages vidéo, codes) | `docs/options.md` | `donnees.js` |
| Brancher le partage des photos | `docs/souvenirs.md`, `exemples/` | `exemples/stockage-supabase.js`, une ligne de `index.html` |
| Changer les couleurs | Bloc `:root` de `index.html` (lignes 10 à 25) | `index.html` |
| Changer le personnage ou le camion | Section 3 du script | `index.html` |
| Modifier le comportement de la page | La section du script concernée | `index.html` |

Les sections du script de `index.html` sont repérées par un commentaire numéroté :

1. `// 1. RENDU` : construction de la page, étapes surprises, vérification des données
2. `// 2. NAVIGATION ET FENÊTRES` : onglets des jours, ouverture et fermeture des fenêtres, bandeau
3. `// 3. ANIMATIONS` : dessins en pixel art, saynètes de l'en-tête, camion de progression
4. `// 4. LISTE À FAIRE ET MÉTÉO`
5. `// 5. SOUVENIRS` : stockage, dépôt, galerie, messages vidéo, téléchargement en zip

Cherchez ces commentaires plutôt que de vous fier à des numéros de ligne.

## Règles à respecter

- **Le contenu va dans `donnees.js`.** Aucun texte propre à un week-end ne doit être écrit dans `index.html`.
- **Chaque étape a un `id` unique**, sans espace ni accent. Les photos y sont rattachées : ne renommez pas un `id` existant sans le signaler.
- **Les identifiants cités dans `fiche` et `fenetres`** doivent exister dans la rubrique `fenetres`.
- **Un champ facultatif absent ne doit rien casser.** Toute nouvelle option est désactivée par défaut.
- **Pas de dépendance ni d'outil de compilation.** Le script est écrit en JavaScript simple (`var`, fonctions classiques), sans module.
- **Pas de donnée personnelle réelle** dans le dépôt : ni nom, ni adresse, ni téléphone, ni photo de personne.
- **Pas de clé secrète** dans les fichiers. Seule une clé publique peut figurer dans `exemples/stockage-supabase.js`.
- **Le stockage local est préfixé** par l'adresse de la page (variable `NS`). Utilisez ce préfixe pour toute nouvelle donnée mémorisée.
- **La page doit rester utilisable au clavier et sur un écran de 360 pixels de large.**

## Vérifier une modification

1. Ouvrez `index.html` dans un navigateur, avec `?verifier` à la fin de l'adresse. Un encadré signale les incohérences de `donnees.js` : identifiant en double, heure mal écrite, fiche introuvable, photo sans étape.
2. Vérifiez que la console du navigateur ne montre aucune erreur.
3. Pour tester le dépôt et le téléchargement de photos, servez le dossier : `python3 -m http.server 8000`.
4. Pour tester le camion en mode horaire, réglez temporairement les dates de `donnees.js` sur la date du jour.

Il n'y a pas de test automatique dans le dépôt.

## Mettre à jour la documentation

- Un nouveau champ de `donnees.js` se documente dans l'en-tête de `donnees.js` et dans `docs/donnees.md`.
- Une nouvelle option se documente dans `docs/options.md`.
- Toute évolution notable s'ajoute en tête de `CHANGELOG.md`, avec la date.
- Le `README.md` reste court : le détail va dans `docs/`.
