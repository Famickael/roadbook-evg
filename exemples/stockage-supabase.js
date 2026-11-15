/* ==========================================================================
   STOCKAGE PARTAGÉ DES SOUVENIRS : exemple pour Supabase
   --------------------------------------------------------------------------
   Par défaut, les photos déposées restent dans le navigateur de chacun.
   Ce fichier les partage entre tous les participants.

   Branchement en 4 étapes
   1. Créez un projet sur supabase.com.
   2. Exécutez le script exemples/supabase.sql dans l'éditeur SQL du projet.
   3. Renseignez ci-dessous l'adresse du projet et sa clé publique
      (réglages du projet, rubrique des clés d'API).
   4. Dans index.html, retirez les marques de commentaire autour de la ligne
      <script src="exemples/stockage-supabase.js"></script>.

   C'est tout : les photos et les vidéos sont alors visibles par tous.

   Les protections par code sont facultatives. Elles se règlent dans
   donnees.js (options codeAccesPhotos et codeSuppression) et sont décrites
   dans docs/options.md.

   Ne mettez jamais ici la clé « service_role » : seule la clé publique
   peut figurer dans une page web.

   Pour un autre service, gardez la même forme : un objet
   window.ROADBOOK_STOCKAGE avec les fonctions lister, ajouter et supprimer.
   ========================================================================== */
(function () {
  var ADRESSE = "https://VOTRE-PROJET.supabase.co";
  var CLE_PUBLIQUE = "VOTRE_CLE_PUBLIQUE";
  var ESPACE_VIDEOS = "roadbook-videos";

  // Options lues dans donnees.js au moment de l'appel
  function options() { return (window.ROADBOOK && window.ROADBOOK.options) || {}; }
  var MEMO = "roadbook:code:" + location.pathname + ":";
  var dejaDemande = {};

  // Code facultatif, demandé une fois puis mémorisé dans ce navigateur.
  // Après un refus, il n'est redemandé que lors d'un dépôt ou d'une suppression (insister = true).
  function code(type, question, insister) {
    var c = null;
    try { c = localStorage.getItem(MEMO + type); } catch (e) {}
    if (!c && (insister || !dejaDemande[type])) {
      dejaDemande[type] = true;
      c = (window.prompt(question) || "").trim();
      if (c) { try { localStorage.setItem(MEMO + type, c); } catch (e) {} }
    }
    return c || "";
  }
  function oublier(type) { try { localStorage.removeItem(MEMO + type); } catch (e) {} }
  function codeAcces(insister) {
    return options().codeAccesPhotos ? code("acces", "Code du groupe pour voir et déposer les souvenirs :", insister) : "";
  }

  function entetes(type) {
    var h = { "apikey": CLE_PUBLIQUE, "Authorization": "Bearer " + CLE_PUBLIQUE };
    if (type) { h["Content-Type"] = type; }
    return h;
  }

  // Appel d'une fonction de la base (voir exemples/supabase.sql)
  function appeler(fonction, parametres, typeCode) {
    return fetch(ADRESSE + "/rest/v1/rpc/" + fonction, {
      method: "POST", headers: entetes("application/json"), body: JSON.stringify(parametres)
    }).then(function (r) {
      if (r.status === 401 || r.status === 403) { if (typeCode) { oublier(typeCode); } throw new Error("Code refusé"); }
      if (!r.ok) { throw new Error("Erreur du service (" + r.status + ")"); }
      return r.status === 204 ? null : r.json();
    });
  }

  window.ROADBOOK_STOCKAGE = {
    videos: true,       // les vidéos sont envoyées dans l'espace de fichiers
    rafraichir: 60,     // la galerie se met à jour toutes les 60 secondes

    // Renvoie tous les souvenirs, au format attendu par la page
    lister: function () {
      return appeler("souvenirs_lister", { p_code: codeAcces(false) }, "acces").then(function (lignes) {
        return (lignes || []).map(function (l) {
          var video = !!l.chemin;
          return {
            id: l.id, etape: l.etape, t: l.pris_le, vid: video,
            data: video ? ADRESSE + "/storage/v1/object/public/" + ESPACE_VIDEOS + "/" + l.chemin : l.data,
            ext: video ? l.chemin.split(".").pop() : "jpg",
            msg: !!l.message, auteur: l.auteur || ""
          };
        });
      });
    },

    // Enregistre un souvenir : rec = { etape, data, t, vid, ext, msg, auteur }
    // Pour une photo, data est un texte. Pour une vidéo, data est le fichier.
    ajouter: function (rec) {
      var p = { p_etape: rec.etape, p_code: codeAcces(true), p_pris_le: rec.t, p_message: !!rec.msg, p_auteur: rec.auteur || null };
      if (!rec.vid) {
        p.p_data = rec.data;
        return appeler("souvenirs_ajouter", p, "acces");
      }
      var chemin = String(rec.etape).replace(/[^A-Za-z0-9_-]/g, "") + "-" + Date.now() + "-" +
        Math.random().toString(36).slice(2, 8) + "." + String(rec.ext || "mp4").replace(/[^A-Za-z0-9]/g, "");
      return fetch(ADRESSE + "/storage/v1/object/" + ESPACE_VIDEOS + "/" + chemin, {
        method: "POST", headers: entetes(rec.data.type || "video/mp4"), body: rec.data
      }).then(function (r) {
        if (!r.ok) { throw new Error("Envoi de la vidéo refusé (" + r.status + ")"); }
        p.p_chemin = chemin;
        return appeler("souvenirs_ajouter", p, "acces");
      });
    },

    // Supprime un souvenir par son identifiant
    supprimer: function (id) {
      var type = options().codeSuppression ? "suppression" : "acces";
      var c = options().codeSuppression ? code("suppression", "Code pour supprimer un souvenir :", true) : codeAcces(true);
      return appeler("souvenirs_supprimer", { p_id: id, p_code: c }, type);
    }
  };
})();
