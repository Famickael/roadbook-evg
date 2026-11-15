-- ==========================================================================
-- Stockage partagé des souvenirs du roadbook : exemple pour Supabase
-- --------------------------------------------------------------------------
-- À exécuter une fois dans l'éditeur SQL du projet Supabase.
-- Le script peut être relancé sans risque : il ne supprime aucune donnée.
--
-- Par défaut, l'accès est ouvert : toute personne qui a l'adresse de la page
-- peut voir, déposer et supprimer des souvenirs. C'est le réglage le plus
-- simple pour un groupe d'amis.
--
-- Deux protections facultatives sont décrites dans docs/options.md :
--   un code pour voir et déposer, un code pour supprimer.
-- Elles s'activent à la fin de ce fichier, partie 4.
-- ==========================================================================


-- 1. LES TABLES ------------------------------------------------------------

create table if not exists public.souvenirs (
  id       bigint generated always as identity primary key,
  etape    text        not null,               -- identifiant de l'étape, tel qu'écrit dans donnees.js
  data     text,                               -- photo réduite, au format « data:image/jpeg;base64,... »
  chemin   text,                               -- vidéo : nom du fichier dans l'espace de stockage
  message  boolean     not null default false, -- true pour un message vidéo (option « messagesVideo »)
  auteur   text,                               -- prénom affiché avec un message vidéo
  pris_le  timestamptz not null default now(), -- date de prise de vue
  cree_le  timestamptz not null default now(), -- date de dépôt
  constraint souvenirs_contenu check ((data is not null) <> (chemin is not null))
);

create table if not exists public.roadbook_reglages (
  cle    text primary key,
  valeur text not null default ''
);

insert into public.roadbook_reglages (cle, valeur)
values ('code_acces', ''), ('code_suppression', '')
on conflict (cle) do nothing;

-- Aucun accès direct aux tables : la page passe par les fonctions ci-dessous
alter table public.souvenirs         enable row level security;
alter table public.roadbook_reglages enable row level security;


-- 2. LES FONCTIONS APPELÉES PAR LA PAGE --------------------------------------

-- Vérifie un code. Un réglage vide signifie « pas de code demandé ».
create or replace function public.roadbook_code_ok(p_cle text, p_code text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select valeur = '' or valeur = coalesce(p_code, '')
       from public.roadbook_reglages where cle = p_cle),
    true);
$$;

-- Lire tous les souvenirs
create or replace function public.souvenirs_lister(p_code text default '')
returns setof public.souvenirs
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.roadbook_code_ok('code_acces', p_code) then
    raise exception 'Code refusé' using errcode = '28000';
  end if;
  return query select * from public.souvenirs order by pris_le, id;
end;
$$;

-- Déposer une photo (p_data) ou enregistrer une vidéo déjà envoyée (p_chemin)
create or replace function public.souvenirs_ajouter(
  p_etape   text,
  p_code    text        default '',
  p_data    text        default null,
  p_chemin  text        default null,
  p_pris_le timestamptz default now(),
  p_message boolean     default false,
  p_auteur  text        default null)
returns bigint
language plpgsql security definer set search_path = public
as $$
declare
  v_id bigint;
begin
  if not public.roadbook_code_ok('code_acces', p_code) then
    raise exception 'Code refusé' using errcode = '28000';
  end if;
  if p_etape is null or p_etape !~ '^[A-Za-z0-9_-]{1,80}$' then
    raise exception 'Étape invalide' using errcode = '22023';
  end if;
  if (p_data is null) = (p_chemin is null) then
    raise exception 'Il faut une photo ou une vidéo' using errcode = '22023';
  end if;
  if p_data is not null and (left(p_data, 23) <> 'data:image/jpeg;base64,' or length(p_data) > 700000) then
    raise exception 'Photo refusée : format ou poids' using errcode = '22023';
  end if;
  if p_chemin is not null and p_chemin !~ '^[A-Za-z0-9._-]{1,120}$' then
    raise exception 'Nom de fichier invalide' using errcode = '22023';
  end if;
  insert into public.souvenirs (etape, data, chemin, message, auteur, pris_le)
  values (p_etape, p_data, p_chemin, coalesce(p_message, false), left(p_auteur, 40), coalesce(p_pris_le, now()))
  returning id into v_id;
  return v_id;
end;
$$;

-- Supprimer un souvenir. Si un code de suppression est réglé, c'est lui qui est demandé.
create or replace function public.souvenirs_supprimer(p_id bigint, p_code text default '')
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_code_suppr text;
begin
  select valeur into v_code_suppr from public.roadbook_reglages where cle = 'code_suppression';
  if coalesce(v_code_suppr, '') <> '' then
    if v_code_suppr <> coalesce(p_code, '') then
      raise exception 'Code refusé' using errcode = '28000';
    end if;
  elsif not public.roadbook_code_ok('code_acces', p_code) then
    raise exception 'Code refusé' using errcode = '28000';
  end if;
  delete from public.souvenirs where id = p_id;
end;
$$;

-- La page (rôle anon) ne peut appeler que les 3 fonctions publiques
revoke all on function public.roadbook_code_ok(text, text) from public, anon, authenticated;
revoke all on function public.souvenirs_lister(text) from public;
revoke all on function public.souvenirs_ajouter(text, text, text, text, timestamptz, boolean, text) from public;
revoke all on function public.souvenirs_supprimer(bigint, text) from public;
grant execute on function public.souvenirs_lister(text) to anon;
grant execute on function public.souvenirs_ajouter(text, text, text, text, timestamptz, boolean, text) to anon;
grant execute on function public.souvenirs_supprimer(bigint, text) to anon;


-- 3. L'ESPACE DE FICHIERS POUR LES VIDÉOS ------------------------------------
-- Les photos sont enregistrées dans la table. Les vidéos, plus lourdes, vont
-- dans un espace de fichiers public, limité à 50 Mo par fichier.
-- Si vous n'utilisez pas les vidéos, cette partie peut être retirée.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('roadbook-videos', 'roadbook-videos', true, 52428800, array['video/*'])
on conflict (id) do nothing;

drop policy if exists "roadbook : depot de videos" on storage.objects;
create policy "roadbook : depot de videos" on storage.objects
  for insert to anon
  with check (bucket_id = 'roadbook-videos');


-- 4. OPTIONS : CODES D'ACCÈS ET DE SUPPRESSION -------------------------------
-- Pour activer un code, retirez les deux tirets en début de ligne, remplacez
-- la valeur, exécutez la ligne, puis passez l'option correspondante à true
-- dans donnees.js (codeAccesPhotos ou codeSuppression).
-- Pour retirer un code, remettez une valeur vide : ''.

-- update public.roadbook_reglages set valeur = 'mon-code'      where cle = 'code_acces';
-- update public.roadbook_reglages set valeur = 'code-des-orgas' where cle = 'code_suppression';
