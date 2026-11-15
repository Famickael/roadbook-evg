/* ==========================================================================
   STOCKAGE PARTAGÉ DES PHOTOS : exemple pour Supabase
   --------------------------------------------------------------------------
   Par défaut, les photos déposées restent dans le navigateur de chacun.
   Ce fichier montre comment les partager entre tous les participants.

   Mise en place
   1. Créez un projet sur supabase.com.
   2. Exécutez le script exemples/supabase.sql dans l'éditeur SQL du projet,
      après y avoir remplacé le code du groupe.
   3. Renseignez ci-dessous l'adresse du projet et sa clé publique
      (réglages du projet, rubrique des clés d'API).
   4. Dans index.html, retirez les marques de commentaire autour de la ligne
      <script src="exemples/stockage-supabase.js"></script>.
   5. Transmettez le code du groupe aux participants, hors de la page.

   La clé publique peut figurer dans la page : elle ne donne accès à rien
   sans le code du groupe. Ne mettez jamais ici la clé « service_role ».

   Cet exemple gère les photos. Les vidéos restent désactivées, car elles
   demandent un espace de fichiers et des règles d'accès supplémentaires.

   Pour un autre service, gardez la même forme : un objet
   window.ROADBOOK_STOCKAGE avec les fonctions lister, ajouter et supprimer.
   ========================================================================== */
(function () {
  var ADRESSE = "https://VOTRE-PROJET.supabase.co";
  var CLE_PUBLIQUE = "VOTRE_CLE_PUBLIQUE";

  var MEMO = "roadbook:code-groupe:" + location.pathname;

  var dejaDemande = false;

  // Le code du groupe est demandé une fois, puis mémorisé dans ce navigateur.
  // Après un refus, il n'est redemandé que lors d'un dépôt ou d'une suppression (insister = true).
  function code(insister) {
    var c = null;
    try { c = localStorage.getItem(MEMO); } catch (e) {}
    if (!c && (insister || !dejaDemande)) {
      dejaDemande = true;
      c = (window.prompt("Code du groupe pour voir et déposer les photos :") || "").trim();
      if (c) { try { localStorage.setItem(MEMO, c); } catch (e) {} }
    }
    return c;
  }
  function oublierCode() { try { localStorage.removeItem(MEMO); } catch (e) {} }

  // Appel d'une fonction de la base (voir exemples/supabase.sql)
  function appeler(fonction, parametres, insister) {
    var c = code(insister);
    if (!c) { return Promise.reject(new Error("Code du groupe manquant")); }
    parametres.p_code = c;
    return fetch(ADRESSE + "/rest/v1/rpc/" + fonction, {
      method: "POST",
      headers: { "apikey": CLE_PUBLIQUE, "Authorization": "Bearer " + CLE_PUBLIQUE, "Content-Type": "application/json" },
      body: JSON.stringify(parametres)
    }).then(function (r) {
      if (r.status === 401 || r.status === 403) { oublierCode(); throw new Error("Code du groupe refusé"); }
      if (!r.ok) { throw new Error("Erreur du service (" + r.status + ")"); }
      return r.status === 204 ? null : r.json();
    });
  }

  window.ROADBOOK_STOCKAGE = {
    videos: false,      // cet exemple ne gère que les photos
    rafraichir: 60,     // la galerie se met à jour toutes les 60 secondes

    // Renvoie tous les souvenirs, au format attendu par la page
    lister: function () {
      return appeler("souvenirs_lister", {}, false).then(function (lignes) {
        return (lignes || []).map(function (l) {
          return { id: l.id, etape: l.etape, data: l.data, t: l.pris_le, vid: false };
        });
      });
    },
    // Enregistre une photo : rec = { etape, data, t, vid }
    ajouter: function (rec) {
      return appeler("souvenirs_ajouter", { p_etape: rec.etape, p_data: rec.data, p_pris_le: rec.t }, true);
    },
    // Supprime une photo par son identifiant
    supprimer: function (id) {
      return appeler("souvenirs_supprimer", { p_id: id }, true);
    }
  };
})();
