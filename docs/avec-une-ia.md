# Adapter le modèle avec une IA

Le plus rapide pour adapter ce roadbook à un week-end est de confier le travail à un assistant IA. Le projet est préparé pour cela.

## Ce qui est prévu pour les assistants

| Élément | Rôle |
|---|---|
| `AGENTS.md` | Le guide lu par les assistants de programmation : quel fichier ouvrir selon la demande, les règles du projet, la façon de vérifier |
| `CLAUDE.md` | Renvoie vers `AGENTS.md`, pour les outils qui cherchent ce nom de fichier |
| L'en-tête de `donnees.js` | Les réglages généraux et les champs d'une étape, en 50 lignes. Les autres rubriques sont dans `docs/donnees.md` |
| `?verifier` | Ajouté à l'adresse de la page, il liste les incohérences du fichier de données. Un fichier illisible est signalé même sans cela |

Un assistant n'a donc pas à lire tout le projet pour le modifier, ce qui réduit le temps de travail et la consommation.

## Avec un assistant de discussion

Sans outil particulier, il suffit de joindre le fichier `donnees.js` à la conversation, avec une demande de ce type.

**Remplir le programme à partir de notes :**

```text
Voici le fichier donnees.js d'un modèle de roadbook, et mes notes en vrac
sur notre week-end. Remplace le contenu fictif par le nôtre, en gardant
exactement la même structure et les mêmes noms de champs.
- Donne à chaque étape un identifiant unique, sans espace ni accent.
- Ajoute une ligne { trajet: "..." } entre deux étapes quand il y a de la route.
- Laisse vide ce que je n'ai pas précisé, sans rien inventer.
- Renvoie le fichier complet.

Mes notes : [collez ici vos dates, lieux, horaires, participants, réservations]
```

**Calculer la participation de chacun :**

```text
Dans ce fichier donnees.js, recalcule la rubrique « participations » du budget
à partir des postes de dépense et de la présence de chacun :
[qui est là quel jour, ce qui est offert à qui].
Écris la règle de répartition dans les notes du budget, et montre le calcul.
```

**Passer en version souvenir après le week-end :**

```text
Voici le fichier donnees.js de notre roadbook, et le récit de ce qui s'est
vraiment passé. Passe « souvenir » à true, réécris les textes des étapes au
passé avec nos anecdotes, et corrige les horaires réels. Ne change aucun
identifiant d'étape, car les photos y sont rattachées.
```

## Avec un assistant de programmation

Les outils qui travaillent directement dans un dossier (Claude Code, Codex, Cursor et d'autres) lisent `AGENTS.md` au démarrage. Une demande courte suffit alors :

```text
Ajoute une quatrième journée, le lundi, avec 3 étapes : [...]
```

```text
Remplace le thème pompier par un thème vélo : redessine le personnage
et le camion en pixel art, et ajuste la palette.
```

```text
Branche le partage des photos sur mon projet Supabase, en suivant
docs/souvenirs.md. Voici l'adresse du projet et la clé publique : [...]
```

## Précautions

- **Relisez les horaires, les adresses et les montants.** Un assistant peut se tromper ou compléter ce qu'il ignore.
- **Vérifiez le résultat** en ouvrant la page avec `?verifier`.
- **Ne collez pas de données sensibles** dans une conversation : ni mot de passe, ni clé secrète, ni document d'identité.

---

[Retour au README](../README.md)
