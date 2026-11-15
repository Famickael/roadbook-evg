# Précautions d'usage et limites

Ce dépôt est un modèle de démonstration. Il est fourni en l'état, sans garantie, et le code n'a pas fait l'objet d'un audit de sécurité. Les points suivants sont à vérifier avant de l'utiliser pour un vrai week-end.

## Données personnelles

- Une page publiée avec GitHub Pages est accessible à toute personne qui en connaît l'adresse, même si le lien n'a été envoyé qu'au groupe.
- Un dépôt public conserve l'historique de toutes ses versions. Un prénom, une adresse ou une photo supprimés d'une version restent consultables dans les précédentes. Pour un usage réel, un dépôt privé ou un hébergement à accès restreint est préférable.
- Le bandeau « ne pas partager » est un simple rappel. Il ne protège pas la page.
- La publication de photos de personnes suppose leur accord.

## Souvenirs enregistrés dans le navigateur

- Le stockage du navigateur ne constitue pas une sauvegarde. Les souvenirs disparaissent si l'on efface les données du site, si l'on change d'appareil ou de navigateur, et certains navigateurs effacent d'eux-mêmes les données d'un site resté longtemps sans visite.
- Le bouton « Tout télécharger » de la rétrospective permet de récupérer l'ensemble dans un fichier zip. Il est conseillé de le faire dès la fin du week-end.

## Services externes

- À chaque ouverture, la page contacte Google Fonts et Open-Meteo, qui reçoivent l'adresse IP du visiteur. Le clic sur « Tout télécharger » contacte cdnjs, et un bouton d'itinéraire ouvre Waze.
- Pour une page sans aucun appel externe, il faut héberger la police et la bibliothèque JSZip dans le dépôt, et retirer la météo.

## Stockage partagé

- Une clé d'accès placée dans une page web est visible de tous. Les droits se règlent du côté du service, pour limiter ce que cette clé permet.
- Le branchement fourni est ouvert par défaut : toute personne qui a l'adresse de la page peut voir, déposer et supprimer des souvenirs. Un code d'accès et un code de suppression sont proposés en option.
- Ces codes sont une barrière simple, partagée par tout un groupe. Ils ne remplacent pas des comptes individuels.
- Les vidéos sont désactivées par défaut. Une fois activées, leur espace de fichiers accepte les dépôts de toute personne qui a l'adresse de la page, même si un code d'accès est réglé.
- Le branchement d'un service en ligne rend son auteur responsable des données déposées : droits d'accès, durée de conservation et suppression à la demande.
- L'export des photos et l'arrêt du service à la fin du week-end sont à prévoir dès le départ.

## Contenu du modèle

- Les lieux, les prestataires et les numéros de téléphone sont inventés. Les boutons d'itinéraire du modèle renvoient donc des résultats sans rapport, et ils sont à remplacer par de vraies adresses.
- Les montants du budget sont saisis à la main. La page ne fait aucun calcul et ne vérifie pas la cohérence entre les postes et les participations.
- La page est faite pour être consultée par les passagers, pas par la personne qui conduit.

## Limites connues du code

| Limite | Conséquence |
|---|---|
| La bibliothèque JSZip est chargée depuis un service externe sans contrôle d'intégrité | Le téléchargement en zip dépend de la disponibilité et de la fiabilité de ce service |
| Les photos sont enregistrées sous forme de texte, les vidéos sans plafond global | Le quota de stockage du navigateur peut être atteint, et le dépôt échoue alors avec un message |
| Les photos au format HEIC ne sont lues que par certains navigateurs | Le dépôt peut échouer selon le téléphone et le navigateur |
| Le focus entre dans une fenêtre à son ouverture et revient ensuite sur le bouton, mais il n'y est pas retenu | La touche Tab peut sortir de la fenêtre, et la navigation au clavier reste imparfaite |
| Les relevés météo ne sont disponibles que quelques jours après la date | Juste après le week-end, les cartes météo peuvent afficher « indisponible » |
| Le fuseau horaire est un décalage fixe, réglé dans `donnees.js` | Un week-end à cheval sur un changement d'heure aura des dates décalées d'une heure |
| Les textes de `donnees.js` sont insérés tels quels dans la page | Le fichier ne doit contenir que du contenu de confiance |
| Le branchement Supabase n'a pas été déployé sur un projet réel | Un essai est à faire avant de compter dessus pour un week-end |
| Le contenu et le code d'une étape surprise sont écrits dans `donnees.js` | Une personne qui ouvre ce fichier peut les lire |
| Il n'y a pas de test automatique | Chaque modification se vérifie à la main dans un navigateur |

---

[Retour au README](../README.md)
