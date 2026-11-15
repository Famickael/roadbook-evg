-- ==========================================================================
-- Vidéos et messages vidéo : script facultatif pour Supabase
-- --------------------------------------------------------------------------
-- À exécuter après exemples/supabase.sql, seulement si vous voulez que les
-- participants déposent des vidéos. Passez ensuite VIDEOS à true dans
-- exemples/stockage-supabase.js.
--
-- À LIRE AVANT D'EXÉCUTER
-- Les photos sont enregistrées dans la base, derrière les fonctions et les
-- codes. Les vidéos, plus lourdes, vont dans un espace de fichiers public :
--   - toute personne qui a l'adresse de la page peut y déposer des fichiers,
--     même si un code d'accès est réglé ;
--   - un fichier déposé est lisible par quiconque connaît son adresse ;
--   - supprimer une vidéo dans la page ne supprime pas son fichier.
-- Ce réglage convient à un groupe d'amis et à une page peu diffusée.
-- Surveillez l'espace utilisé dans le tableau de bord, et supprimez l'espace
-- de fichiers à la fin du week-end.
-- ==========================================================================

-- Espace de fichiers public, limité à 50 Mo par fichier et aux vidéos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('roadbook-videos', 'roadbook-videos', true, 52428800, array['video/*'])
on conflict (id) do nothing;

-- Dépôt autorisé dans cet espace uniquement
drop policy if exists "roadbook : depot de videos" on storage.objects;
create policy "roadbook : depot de videos" on storage.objects
  for insert to anon
  with check (bucket_id = 'roadbook-videos');
