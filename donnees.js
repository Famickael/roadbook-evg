/* ==========================================================================
   DONNÉES DU ROADBOOK
   --------------------------------------------------------------------------
   Tout le contenu de la page se règle dans ce fichier. Il n'y a rien d'autre
   à modifier pour adapter le modèle à votre week-end.

   Règles d'écriture
   - Les textes sont insérés tels quels dans la page. Le HTML simple est
     accepté (<b>, <a href="...">, &amp;). N'y collez que votre propre contenu.
   - Chaque étape porte un identifiant unique ("id"), sans espace ni accent.
     Les photos sont rattachées à cet identifiant : ne le changez plus une
     fois que des photos ont été déposées.
   - Une ligne { trajet: "..." } entre deux étapes affiche un temps de route.
   - Les champs facultatifs peuvent être supprimés (texte, duree, type, alerte,
     reserve, prix, fenetres, fiche, itineraire, surprise).
   - Cet en-tête décrit les réglages généraux et les champs d'une étape.
     Toutes les autres rubriques sont décrites dans docs/donnees.md.
   - Pour vérifier le fichier après une modification, ouvrez la page en
     ajoutant ?verifier à la fin de son adresse.

   Champs d'une étape
     id          identifiant unique
     heure       "09:45"
     duree       "1h30 de piste"
     type        "cle" (pastille rouge) ou "detente" (pastille bleue)
     titre, texte
     alerte      consigne mise en avant en jaune
     reserve     heure de réservation, affichée sur une pastille verte
     fenetres    boutons ouvrant une fenêtre décrite dans "fenetres"
     fiche       identifiant de la fiche pratique du lieu, dans "fenetres"
     prix        montant affiché sur une étiquette noire
     itineraire  adresse ou nom du lieu, envoyé à Waze
     surprise    étape masquée : { code, titre, texte }. Le titre et le texte
                 donnés ici s'affichent à la place des vrais tant que le code
                 n'a pas été saisi (bouton « ··· » de l'étape)

   Réglages généraux
     camion      "lecture" : le camion suit le défilement de la page
                 "horaire" : il suit l'heure réelle du programme
                 "auto"    : horaire pendant le week-end, lecture avant et après
     animations  false pour retirer le personnage animé de l'en-tête
     souvenir    true après le week-end : masque le bandeau, la liste à faire,
                 le budget, les infos pratiques, les prix et les réservations
     options     fonctions facultatives, décrites dans docs/options.md :
                   messagesVideo    bouton pour laisser un message vidéo à chaque étape
                   codeAccesPhotos  stockage partagé : code demandé pour voir et déposer
                   codeSuppression  stockage partagé : code demandé pour supprimer
     fuseau      décalage horaire du lieu du week-end ("+02:00" en été en France)

   Toutes les données ci-dessous sont fictives.
   ========================================================================== */
window.ROADBOOK = {
  titre: "EVG de Basile",
  surtitre: "Roadbook · 12 → 14 juin · données fictives",
  accroche: "Aventure &amp; sport au programme",
  bandeau: "Ne pas partager à Basile avant dimanche soir !",
  finBandeau: "2026-06-15T00:00:00+02:00",
  fuseau: "+02:00",
  camion: "auto",
  animations: true,
  souvenir: false,
  options: { messagesVideo: false, codeAccesPhotos: false, codeSuppression: false },
  lienDepenses: "",
  retrospective: "Toutes les photos du week-end, étape par étape, à garder pour Basile.",
  jours: [
    {
      id: "j1",
      onglet: "Ven 12",
      date: "2026-06-12",
      etape: "Étape 1 · 3 personnes · ~640 km",
      titre: "Vendredi 12 — Route &amp; soirée à Lénac",
      trajet: "Villard-le-Parc → Montclair-la-Forêt → Brumeval → Les Tilleuls → Lénac",
      qui: "Corentin · Hugo · Basile",
      meteo: { lieu: "Lénac", lat: 45.05, lon: 3.88 },
      programme: [
        {
          id: "depart",
          heure: "04:45",
          titre: "Départ — Villard-le-Parc",
          texte: "Départ nocturne, direction Saint-Aubry-sur-Lène. Café thermos conseillé.",
          fenetres: [
            { id: "collation", label: "🍽 Collation" }
          ],
          itineraire: "Saint-Aubry-sur-Lène"
        },
        { trajet: "🚗 ~30 min" },
        {
          id: "recuperation",
          heure: "05:15",
          titre: "Récupération de Hugo — Saint-Aubry-sur-Lène",
          texte: "Embarquement rapide puis autoroute direction Montclair.",
          itineraire: "Montclair-la-Forêt"
        },
        { trajet: "🚗 ~2h10" },
        {
          id: "kidnapping",
          heure: "07:30",
          duree: "10 min",
          type: "cle",
          titre: "Kidnapping — Montclair-la-Forêt",
          texte: "Basile se réveille d'habitude à 8h : on arrive avant, réveil surprise. Sac préparé en douce par Lucie, t-shirt EVG, photo. Décollage 07:40 direction Brumeval.",
          fenetres: [
            { id: "sac", label: "🎒 Sac de Basile" }
          ],
          itineraire: "Brumeval centre"
        },
        { trajet: "🚗 ~1h05" },
        {
          id: "petit-dejeuner",
          heure: "08:45",
          duree: "45 min",
          titre: "Petit-déjeuner — Brumeval",
          texte: "Boulangerie-café du centre de Brumeval, à 15 min du circuit. Croissants, vrais cafés, point stratégique avant la piste.",
          itineraire: "Brumeval centre"
        },
        { trajet: "🚗 ~15 min" },
        {
          id: "karting",
          heure: "09:45",
          duree: "1h30 de piste",
          type: "cle",
          titre: "Karting du circuit de Brumeval",
          texte: "Arrivée 15 min avant l'ouverture. Sessions 10:00-11:30 sur la piste extérieure de 1 050 m, 3 sessions de 10 min + pauses. Départ 11:45.",
          reserve: "10h00",
          fiche: "karting",
          prix: "55 €"
        },
        { trajet: "🚗 ~45 min" },
        {
          id: "dejeuner-vendredi",
          heure: "12:30",
          duree: "1h15",
          titre: "Déjeuner — Rochebrune",
          texte: "Centre-ville ou aire d'autoroute selon l'horaire. Repartir à 13:45 max.",
          itineraire: "Rochebrune"
        },
        { trajet: "🚗 ~2h30 · pause café à mi-chemin" },
        {
          id: "gite",
          heure: "16:15",
          duree: "45 min",
          titre: "Check-in — gîte La Grange aux Noyers + courses",
          texte: "12 chemin des Noyers, Les Tilleuls-sur-Lène. Arrivée possible dès 16h. Grange individuelle : 2 chambres, jacuzzi privatif sur la terrasse, barbecue fourni. Courses à Pont-de-Lène (10 min) : tout est dans la liste.",
          fenetres: [
            { id: "courses", label: "🛒 Courses" }
          ],
          fiche: "gite",
          itineraire: "12 chemin des Noyers Les Tilleuls-sur-Lène"
        },
        {
          id: "detente-vendredi",
          heure: "17:00",
          duree: "1h15",
          type: "detente",
          titre: "Piscine · jacuzzi · apéro",
          texte: "Première session détente : jacuzzi privatif sur la terrasse (dispo jusqu'à 22h) et piscine partagée à 50 m (ferme à 19h), apéro en peignoir fourni par la maison. Sortie 18:15 pour se changer.",
          fenetres: [
            { id: "apero", label: "🍹 Apéro" }
          ]
        },
        { trajet: "🚗 ~30 min" },
        {
          id: "parking",
          heure: "19:15",
          titre: "Parking des Halles — Lénac",
          texte: "Départ du gîte à 18:45. Brasserie et cabaret sont sur place : plus besoin de la voiture jusqu'au retour.",
          itineraire: "Parking des Halles Lénac"
        },
        { trajet: "🚶 5 min à pied" },
        {
          id: "diner",
          heure: "19:45",
          duree: "2h",
          type: "cle",
          titre: "Dîner — Brasserie du Grand Parc",
          texte: "Face au parc, à deux pas du parking et du cabaret : tout se fait à pied.",
          reserve: "19h45",
          fiche: "brasserie"
        },
        { trajet: "🚶 2 min à pied" },
        {
          id: "cabaret",
          heure: "22:15",
          duree: "~3h",
          type: "cle",
          titre: "Le Phare Rouge — soirée cabaret",
          texte: "8 quai des Lumières. Entrée 20 €, première consommation dès 12 €. Pic de soirée 0h-3h.",
          alerte: "Tenue exigée : pantalon + chemise/polo. Pas de baskets de sport ni casquette",
          reserve: "22h15",
          fiche: "cabaret"
        },
        { trajet: "🚗 ~30 min" },
        {
          id: "retour",
          heure: "01:30",
          titre: "Retour au gîte — dodo",
          texte: "Départ vers 1h00, retour direct. Grosse journée le lendemain.",
          itineraire: "12 chemin des Noyers Les Tilleuls-sur-Lène"
        }
      ]
    },
    {
      id: "j2",
      onglet: "Sam 13",
      date: "2026-06-13",
      etape: "Étape 2 · 5 personnes",
      titre: "Samedi 13 — Paintball &amp; Canyoning",
      trajet: "Chanteval → canyon du Saut du Loup → piscine &amp; plancha",
      qui: "Corentin · Hugo · Basile · Yann · Samuel <span style=\"opacity:.75\">(en journée)</span>",
      meteo: { lieu: "Canyon", lat: 44.93, lon: 4.2 },
      programme: [
        {
          id: "petit-dej-samedi",
          heure: "09:00",
          duree: "30 min",
          titre: "Petit-déj + arrivée des renforts",
          texte: "Yann et Samuel rejoignent directement le gîte.",
          fenetres: [
            { id: "petitdej", label: "🍽 Repas" }
          ],
          itineraire: "12 chemin des Noyers Les Tilleuls-sur-Lène"
        },
        { trajet: "🚗 ~10 min" },
        {
          id: "paintball",
          heure: "09:30",
          duree: "2h de jeu",
          type: "cle",
          titre: "Paintball des Trois Chênes — Chanteval",
          texte: "Arrivée 30 min avant le créneau de 10:00. Forfait 500 billes chacun, et un autre groupe en face pour servir d'adversaires.",
          reserve: "10h00",
          fiche: "paintball",
          itineraire: "Paintball des Trois Chênes Chanteval",
          prix: "40 €"
        },
        {
          id: "babyfoot",
          heure: "12:00",
          duree: "30 min",
          titre: "Babyfoot humain — sur place",
          texte: "Sur le terrain voisin du paintball : deux équipes accrochées aux barres, Basile dans les buts.",
          prix: "12 €"
        },
        {
          id: "dejeuner-samedi",
          heure: "12:30",
          duree: "45 min",
          titre: "Déjeuner sur le pouce",
          texte: "Sandwichs préparés le matin, avalés sur la route du canyon.",
          fenetres: [
            { id: "sandwich", label: "🍽 Repas" }
          ]
        },
        { trajet: "🚗 ~55 min" },
        {
          id: "canyoning",
          heure: "13:30",
          duree: "~3h",
          type: "cle",
          titre: "Canyoning — canyon du Saut du Loup",
          texte: "Avec Arvelles Canyoning : sauts, toboggans naturels et rappels. Combinaisons fournies ; prévoir maillot, serviette et baskets qui peuvent aller dans l'eau.",
          reserve: "13h30",
          fiche: "canyon",
          itineraire: "Canyon du Saut du Loup",
          prix: "50 €"
        },
        { trajet: "🚗 ~55 min" },
        {
          id: "detente-samedi",
          heure: "19:00",
          duree: "1h15",
          type: "detente",
          titre: "Piscine &amp; jacuzzi — récup",
          texte: "Retour ~18:30. La piscine partagée ferme à 19h : direction le jacuzzi privatif de la terrasse (jusqu'à 22h) pour se réchauffer du canyon pendant que la plancha chauffe."
        },
        {
          id: "plancha",
          heure: "20:15",
          duree: "soirée",
          titre: "Plancha + soirée jeux",
          texte: "Ambiance terrasse, quiz sur Basile et jeux de société.",
          fenetres: [
            { id: "plancha", label: "🍽 Repas" }
          ]
        }
      ]
    },
    {
      id: "j3",
      onglet: "Dim 14",
      date: "2026-06-14",
      etape: "Étape 3 · 4 personnes",
      titre: "Dimanche 14 — Surprise &amp; clôture",
      trajet: "Check-out → surprise → pique-nique → retours",
      qui: "Corentin · Hugo · Basile · Yann",
      meteo: { lieu: "Bois-Joli", lat: 45.1, lon: 3.95 },
      programme: [
        {
          id: "menage",
          heure: "09:30",
          duree: "1h",
          titre: "Ménage &amp; sacs",
          texte: "Vaisselle, poubelles, glacière du pique-nique, photo de groupe devant la grange, remise du diplôme d'enterré à Basile."
        },
        { id: "check-out", heure: "10:45", titre: "Check-out — avant 11h", texte: "Règle du gîte : départ avant 11h00. Clés rendues, coffres chargés." },
        { trajet: "🚗 ~25 min" },
        {
          id: "surprise-dimanche",
          heure: "11:15",
          duree: "~1h45",
          type: "cle",
          titre: "Soufflerie AéroTube — chute libre indoor",
          texte: "Deux vols de chute libre indoor chacun dans la soufflerie de Bois-Joli. Convocation 1h avant le vol, briefing et combinaisons fournis.",
          alerte: "Pas de vol en cas d'épaule fragile",
          reserve: "12h",
          fiche: "soufflerie",
          itineraire: "AéroTube Bois-Joli",
          prix: "60 €",
          surprise: { code: "surprise", titre: "Visite du vieux bourg de Bois-Joli", texte: "Balade dans les ruelles et café en terrasse avant le pique-nique." }
        },
        { trajet: "🚗 ~5 min" },
        {
          id: "pique-nique",
          heure: "13:15",
          duree: "1h",
          titre: "Pique-nique — parc du Belvédère",
          texte: "Débrief de la matinée autour de la glacière avant de reprendre la route. Départ des retours 14:15.",
          fenetres: [
            { id: "piquenique", label: "🍽 Repas" }
          ],
          itineraire: "Parc du Belvédère Bois-Joli"
        },
        { trajet: "🚗 ~2h50" },
        {
          id: "depot-invite",
          heure: "17:05",
          titre: "Dépôt de Basile — Montclair-la-Forêt",
          texte: "Retour par l'autoroute, pause à mi-parcours.",
          itineraire: "Montclair-la-Forêt"
        },
        { trajet: "🚗 ~2h05" },
        {
          id: "depot-ami",
          heure: "19:20",
          titre: "Dépôt de Hugo — Saint-Aubry-sur-Lène",
          texte: "Dernier détour avant la maison.",
          itineraire: "Saint-Aubry-sur-Lène"
        },
        { trajet: "🚗 ~35 min" },
        {
          id: "arrivee",
          heure: "20:00",
          titre: "Arrivée — Villard-le-Parc",
          texte: "Fin du roadbook, mission accomplie. 🏁",
          itineraire: "Villard-le-Parc"
        }
      ]
    }
  ],
  fenetres: {
    courses: {
      titre: "🛒 Courses — vendredi 16:45, Pont-de-Lène",
      sections: [
        {
          titre: "Apéros (ven + sam)",
          lignes: [
            "Chips, olives, saucisson, houmous + carottes",
            "Bières (2 packs) + softs et eau pétillante",
            "Glaçons"
          ]
        },
        {
          titre: "Plancha samedi soir (5 pers.)",
          lignes: [
            "Merguez + chipolatas (10-12 pièces)",
            "Poulet mariné ou côtes (5 parts)",
            "Halloumi + épis de maïs",
            "Salade verte, tomates, pain, sauces",
            "Rien côté cuisson : Corentin apporte sa plancha électrique"
          ]
        },
        {
          titre: "Petits-déj + midis",
          lignes: [
            "Œufs (x12), jambon, fromage",
            "Pain, beurre, confiture, café, lait, jus d'orange",
            "Viennoiseries : boulangerie dimanche matin"
          ]
        },
        {
          titre: "Divers",
          lignes: [
            "Eau (pack), sacs poubelle, essuie-tout, produit vaisselle",
            "Glacière pour le pique-nique du dimanche"
          ]
        }
      ]
    },
    apero: {
      titre: "🍽 Apéro piscine — vendredi 17:15",
      note: "Pas de verre au bord de la piscine : gobelets ou canettes.",
      sections: [
        {
          lignes: [
            "Chips, olives, saucisson coupé, houmous-carottes",
            "Bières fraîches + softs",
            "Léger : le dîner est à 19:45, on garde de l'appétit"
          ]
        }
      ]
    },
    petitdej: {
      titre: "🍽 Petit-déj samedi — 09:00",
      sections: [
        {
          lignes: [
            "Café + jus d'orange",
            "Protéines pour tenir le paintball et le canyon : œufs brouillés ou durs, fromage blanc, jambon",
            "Pain beurre confiture pour le moral",
            "Pendant le café : préparer les sandwichs du midi"
          ]
        }
      ]
    },
    sandwich: {
      titre: "🍽 Midi samedi — sur le pouce",
      sections: [
        {
          lignes: [
            "Sandwichs jambon-fromage ou poulet-crudités, préparés au petit-déj",
            "Chips, fruits, barres de céréales",
            "Eau : 1,5 L par personne avant le canyon"
          ]
        }
      ]
    },
    plancha: {
      titre: "🍽 Plancha samedi soir — 20:15",
      sections: [
        {
          titre: "À la plancha",
          lignes: [
            "Merguez + chipolatas",
            "Poulet mariné (préparer la marinade le matin : huile, citron, ail, herbes)",
            "Halloumi + épis de maïs"
          ]
        },
        {
          titre: "Autour",
          lignes: [
            "Salade verte + tomates, pain, sauces",
            "Chips restantes de l'apéro"
          ]
        },
        {
          titre: "Rôles",
          lignes: [
            "1 chef grill, 1 commis, Basile ne touche à rien (il subit le quiz)"
          ]
        }
      ]
    },
    collation: {
      titre: "🥐 Collation de route — départ 04:45",
      sections: [
        {
          titre: "À préparer la veille",
          lignes: [
            "Thermos de café + gobelets",
            "Pack de petites bouteilles d'eau",
            "Bananes, barres de céréales"
          ]
        },
        {
          titre: "Pour tenir",
          lignes: [
            "Bonbons, format familial",
            "Chips en tube (ça ne s'écrase pas)",
            "Fruits secs et amandes pour la caution santé"
          ]
        },
        {
          titre: "Sur la route",
          lignes: [
            "Rien n'est ouvert à 4h45 : premier vrai café sur la première aire d'autoroute",
            "Viennoiseries possibles dès 7h dans une boulangerie de Montclair"
          ]
        }
      ]
    },
    sac: {
      titre: "🎒 Sac de Basile — brief pour Lucie",
      intro: "À préparer en douce et à cacher avant vendredi matin. Un seul sac, léger.",
      sections: [
        {
          titre: "Dedans",
          lignes: [
            "Vêtements 3 jours + un pull pour les soirées",
            "Tenue pour vendredi soir : pantalon + chemise ou polo + chaussures propres",
            "Maillot de bain x2 (jacuzzi/piscine + canyon) + 1 serviette pour le canyon",
            "Vieilles baskets qui peuvent aller dans l'eau (canyoning)",
            "Trousse de toilette, chargeur de téléphone, lunettes de soleil",
            "Pièce d'identité"
          ]
        }
      ]
    },
    piquenique: {
      titre: "🍽 Pique-nique du dimanche — 13:15",
      sections: [
        {
          lignes: [
            "Restes de la plancha en sandwichs, salade de pâtes préparée le samedi",
            "Chips, fruits, gâteau du boulanger",
            "Glacière + pains de glace sortis du congélateur au check-out"
          ]
        }
      ]
    },
    gite: {
      titre: "🏡 Gîte La Grange aux Noyers",
      sections: [
        {
          lignes: [
            "📍 12 chemin des Noyers, Les Tilleuls-sur-Lène · hôte : Nadège",
            "🕓 Arrivée après 16h · départ avant 11h",
            "🛏 2 chambres (lit double + queen) + canapé = 5 couchages pour 4 dormeurs (Samuel ne dort pas sur place)",
            "♨️ Jacuzzi privatif sur la terrasse, 10h-22h · peignoirs fournis",
            "🏊 Piscine partagée à 50 m, 10h-19h",
            "🍖 Barbecue + ustensiles fournis · cuisine équipée, lave-vaisselle, wifi",
            "🧺 Linge de lit et de toilette fourni",
            "🅿️ 1 seule place de parking : les voitures de samedi se garent dans le village",
            "🤫 Village paisible, fêtes non admises"
          ]
        }
      ]
    },
    soufflerie: {
      titre: "🌀 Soufflerie AéroTube — chute libre indoor",
      sections: [
        {
          lignes: [
            "📍 Zone du Belvédère, Bois-Joli · ~25 min du gîte",
            "🕚 Convocation 1h avant l'heure de vol · briefing 20 min · 2 vols chacun",
            "👕 Tenue de sport ou jean + baskets · combinaison, casque et lunettes fournis",
            "⚠️ Déconseillé en cas d'épaule fragile",
            "📞 <a href=\"tel:+33465710190\">04 65 71 01 90</a>"
          ]
        }
      ]
    },
    karting: {
      titre: "🏎 Karting du circuit de Brumeval",
      sections: [
        {
          lignes: [
            "📍 Route du Circuit, Brumeval",
            "🕙 Ouvert dès 10h · réservation confirmée 10h00",
            "📞 <a href=\"tel:+33353010175\">03 53 01 01 75</a>",
            "Piste extérieure de 1 050 m · casques et combinaisons fournis"
          ]
        }
      ]
    },
    brasserie: {
      titre: "🍽 Brasserie du Grand Parc",
      sections: [
        {
          lignes: [
            "📍 3 place du Grand Parc, Lénac — face au parc",
            "✅ Réservé — 19h45, 3 couverts",
            "📞 <a href=\"tel:+33465710118\">04 65 71 01 18</a>",
            "À deux pas du parking des Halles et du Phare Rouge"
          ]
        }
      ]
    },
    cabaret: {
      titre: "🪩 Le Phare Rouge",
      sections: [
        {
          lignes: [
            "📍 8 quai des Lumières, Lénac",
            "🕙 Ouvert jusqu'à l'aube · pic de soirée 0h-3h",
            "👔 Pantalon + chemise/polo exigés, pas de baskets de sport ni casquette",
            "📞 <a href=\"tel:+33465710142\">04 65 71 01 42</a>"
          ]
        }
      ]
    },
    paintball: {
      titre: "🎯 Paintball des Trois Chênes",
      sections: [
        {
          lignes: [
            "📍 Lieu-dit Les Trois Chênes, Chanteval",
            "🕘 Arriver 30 min avant le créneau (9:30 pour 10:00)",
            "👥 À moins de 8 joueurs, regroupement avec un autre groupe",
            "📞 <a href=\"tel:+33639980164\">06 39 98 01 64</a>"
          ]
        }
      ]
    },
    canyon: {
      titre: "🌊 Arvelles Canyoning — canyon du Saut du Loup",
      sections: [
        {
          lignes: [
            "📍 Parking du Saut du Loup, massif des Arvelles",
            "✅ Créneau groupe 13h30",
            "🎒 Maillot, serviette, baskets qui peuvent aller dans l'eau",
            "📞 Fred : <a href=\"tel:+33639980127\">06 39 98 01 27</a>"
          ]
        }
      ]
    }
  },
  aFaire: [
    { id: "r1", titre: "Le Phare Rouge — table EVG 3 pers.", detail: "vendredi 12 au soir · <a href=\"tel:+33465710142\">04 65 71 01 42</a>", echeance: "cette semaine" },
    {
      id: "r2",
      titre: "Brasserie du Grand Parc — 3 couverts 19:45",
      detail: "<a href=\"tel:+33465710118\">04 65 71 01 18</a>",
      echeance: "cette semaine",
      fait: true
    },
    { id: "r3", titre: "Canyoning — créneau groupe 5 pers. sam. 13:30", detail: "Fred : <a href=\"tel:+33639980127\">06 39 98 01 27</a>", echeance: "sous 15 jours" },
    {
      id: "r4",
      titre: "Paintball des Trois Chênes — sam. 10:00, acompte versé",
      detail: "<a href=\"tel:+33639980164\">06 39 98 01 64</a>",
      echeance: "sous 15 jours",
      fait: true
    },
    {
      id: "r5",
      titre: "Karting de Brumeval — ven. 10:00",
      detail: "<a href=\"tel:+33353010175\">03 53 01 01 75</a>",
      echeance: "3 semaines avant",
      fait: true
    },
    { id: "r6", titre: "Activité surprise du dimanche — 4 pers. 🤫", detail: "créneau de 12h à confirmer", echeance: "à caler cette semaine" },
    { id: "r7", titre: "Babyfoot humain — sam. 12:00", detail: "à confirmer avec le paintball en même temps que le regroupement des équipes" },
    { id: "r8", titre: "T-shirts EVG — 5 exemplaires", detail: "tailles à collecter auprès de chacun", echeance: "10 jours avant" }
  ],
  budget: {
    legende: "💶 payé · ✅ réservé (montant estimé) · ⏳ à confirmer / estimation",
    postes: [
      { libelle: "✅ Karting (réservé · 3 sessions)", montant: "55 €" },
      { libelle: "✅ Dîner Brasserie du Grand Parc (réservé)", montant: "35-45 €" },
      { libelle: "⏳ Le Phare Rouge (à réserver · entrée + consos)", montant: "40-70 €" },
      { libelle: "💶 Paintball (acompte payé · 500 billes)", montant: "40 €" },
      { libelle: "⏳ Babyfoot humain (à confirmer)", montant: "12 €" },
      { libelle: "⏳ Canyoning (à réserver)", montant: "50 €" },
      { libelle: "⏳ Activité surprise du dimanche (à réserver)", montant: "60 €" },
      { libelle: "⏳ Déjeuner Rochebrune (estimation)", montant: "15-20 €" },
      { libelle: "⏳ Parking des Halles (estimation)", montant: "~10 € / voiture" },
      { libelle: "⏳ Essence + péages (estimation, ~1 280 km)", montant: "~180 € ÷ 3" },
      { libelle: "💶 Gîte (payé · 2 nuits, 480 €) : partagé entre les 3 dormeurs payeurs", montant: "160 €" },
      { libelle: "⏳ Courses communes (estimation ~150 € : apéros, plancha, midis, petits-déj)", montant: "~30 €" }
    ],
    participations: [
      { qui: "<b>Basile</b> · on lui offre tout 🎁", montant: "0 €" },
      { qui: "<b>Corentin</b> · 3 jours + part de Basile du vendredi (÷2 avec Hugo), du samedi (÷4) et du dimanche (÷3)", montant: "≈ 620-680 €" },
      { qui: "<b>Hugo</b> · même périmètre que Corentin", montant: "≈ 620-680 €" },
      { qui: "<b>Yann</b> · samedi et dimanche + part de Basile du samedi (÷4) et du dimanche (÷3), hors trajet personnel", montant: "≈ 390-410 €" },
      { qui: "<b>Samuel</b> · journée du samedi (paintball, babyfoot, canyoning, courses) + part de Basile du samedi (÷4), sans gîte ni trajet personnel", montant: "≈ 140-150 €" }
    ],
    notes: [
      "La part de Basile est répartie au prorata des jours partagés avec lui : ses dépenses du vendredi entre Corentin et Hugo, celles du samedi entre les 4 présents, celles du dimanche entre les 3 présents. Le gîte se partage entre les 3 dormeurs payeurs (Corentin, Hugo, Yann) ; Basile et Samuel n'en paient pas.",
      "Montants fictifs, donnés à titre d'exemple : chacun saisit ensuite ses dépenses réelles dans l'outil de partage de frais du groupe."
    ]
  },
  infos: [
    { lieu: "Gîte La Grange aux Noyers", detail: "12 chemin des Noyers, Les Tilleuls-sur-Lène · arrivée après 16h, départ avant 11h" },
    { lieu: "Karting du circuit de Brumeval", detail: "Route du Circuit, Brumeval · <a href=\"tel:+33353010175\">03 53 01 01 75</a>" },
    { lieu: "Brasserie du Grand Parc", detail: "3 place du Grand Parc, Lénac · <a href=\"tel:+33465710118\">04 65 71 01 18</a>" },
    { lieu: "Le Phare Rouge", detail: "8 quai des Lumières, Lénac · <a href=\"tel:+33465710142\">04 65 71 01 42</a>" },
    { lieu: "Paintball des Trois Chênes", detail: "Lieu-dit Les Trois Chênes, Chanteval · <a href=\"tel:+33639980164\">06 39 98 01 64</a>" },
    { lieu: "Arvelles Canyoning", detail: "Canyon du Saut du Loup, massif des Arvelles · Fred : <a href=\"tel:+33639980127\">06 39 98 01 27</a>" }
  ],
  telephones: [
    { nom: "Karting Brumeval", numero: "03 53 01 01 75" },
    { nom: "Brasserie Grand Parc", numero: "04 65 71 01 18" },
    { nom: "Le Phare Rouge", numero: "04 65 71 01 42" },
    { nom: "Paintball", numero: "06 39 98 01 64" },
    { nom: "Canyoning (Fred)", numero: "06 39 98 01 27" }
  ],
  noteInfos: "Numéros fictifs, pris dans les tranches réservées aux œuvres de fiction.",
  photos: [
    { id: 1, etape: "depart", date: "2026-06-12T04:45:00+02:00", fichier: "photos/demo-01.jpg" },
    { id: 2, etape: "kidnapping", date: "2026-06-12T07:32:00+02:00", fichier: "photos/demo-02.jpg" },
    { id: 3, etape: "kidnapping", date: "2026-06-12T07:38:00+02:00", fichier: "photos/demo-03.jpg" },
    { id: 4, etape: "karting", date: "2026-06-12T10:20:00+02:00", fichier: "photos/demo-04.jpg" },
    { id: 5, etape: "karting", date: "2026-06-12T11:25:00+02:00", fichier: "photos/demo-05.jpg" },
    { id: 6, etape: "gite", date: "2026-06-12T16:20:00+02:00", fichier: "photos/demo-06.jpg" },
    { id: 7, etape: "detente-vendredi", date: "2026-06-12T17:30:00+02:00", fichier: "photos/demo-07.jpg" },
    { id: 8, etape: "diner", date: "2026-06-12T20:10:00+02:00", fichier: "photos/demo-08.jpg" },
    { id: 9, etape: "paintball", date: "2026-06-13T10:40:00+02:00", fichier: "photos/demo-09.jpg" },
    { id: 10, etape: "paintball", date: "2026-06-13T11:15:00+02:00", fichier: "photos/demo-10.jpg" },
    { id: 11, etape: "babyfoot", date: "2026-06-13T12:10:00+02:00", fichier: "photos/demo-11.jpg" },
    { id: 12, etape: "canyoning", date: "2026-06-13T14:30:00+02:00", fichier: "photos/demo-12.jpg" },
    { id: 13, etape: "canyoning", date: "2026-06-13T15:45:00+02:00", fichier: "photos/demo-13.jpg" },
    { id: 14, etape: "plancha", date: "2026-06-13T20:40:00+02:00", fichier: "photos/demo-14.jpg" },
    { id: 15, etape: "surprise-dimanche", date: "2026-06-14T12:05:00+02:00", fichier: "photos/demo-15.jpg" },
    { id: 16, etape: "pique-nique", date: "2026-06-14T13:30:00+02:00", fichier: "photos/demo-16.jpg" },
    { id: 17, etape: "arrivee", date: "2026-06-14T20:00:00+02:00", fichier: "photos/demo-17.jpg" }
  ]
};
