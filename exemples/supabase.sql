-- ==========================================================================
-- Stockage partagé des photos du roadbook : exemple pour Supabase (Postgres)
-- --------------------------------------------------------------------------
-- À exécuter une fois dans l'éditeur SQL du projet Supabase.
--
-- Principe : la table des souvenirs n'est accessible à personne directement.
-- La page passe par 3 fonctions, qui vérifient un code de groupe avant d'agir.
-- Le code n'est pas écrit dans la page : chaque participant le saisit une fois.
--
-- Ce code est une barrière simple contre les curieux. Il ne remplace pas une
-- vraie authentification : toute personne qui le connaît peut lire, déposer
-- et supprimer des photos.
-- ==========================================================================

create table if not exists public.souvenirs (
  id       bigint generated always as identity primary key,
  etape    text        not null,               -- identifiant de l'étape, tel qu'écrit dans donnees.js
  data     text        not null,               -- photo réduite, au format « data:image/jpeg;base64,... »
  pris_le  timestamptz not null default now(), -- date de prise de vue
  cree_le  timestamptz not null default now()  -- date de dépôt
);

create table if not exists public.roadbook_reglages (
  cle    text primary key,
  valeur text not null
);

-- Sécurité au niveau des lignes activée sans aucune règle : aucun accès direct aux tables
alter table public.souvenirs         enable row level security;
alter table public.roadbook_reglages enable row level security;

-- LE CODE DU GROUPE : remplacez la valeur avant d'exécuter le script
insert into public.roadbook_reglages (cle, valeur)
values ('code_groupe', 'CHANGEZ-MOI')
on conflict (cle) do nothing;

-- Vérification du code (fonction interne, non appelable depuis la page)
create or replace function public.roadbook_code_ok(p_code text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.roadbook_reglages
    where cle = 'code_groupe' and valeur = p_code and valeur <> 'CHANGEZ-MOI'
  );
$$;

-- Lire tous les souvenirs
create or replace function public.souvenirs_lister(p_code text)
returns setof public.souvenirs
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.roadbook_code_ok(p_code) then
    raise exception 'Code du groupe invalide' using errcode = '28000';
  end if;
  return query select * from public.souvenirs order by pris_le, id;
end;
$$;

-- Déposer une photo
create or replace function public.souvenirs_ajouter(p_code text, p_etape text, p_data text, p_pris_le timestamptz default now())
returns bigint
language plpgsql security definer set search_path = public
as $$
declare
  v_id bigint;
begin
  if not public.roadbook_code_ok(p_code) then
    raise exception 'Code du groupe invalide' using errcode = '28000';
  end if;
  if p_data is null or left(p_data, 23) <> 'data:image/jpeg;base64,' then
    raise exception 'Format de photo refusé' using errcode = '22023';
  end if;
  if length(p_data) > 700000 then      -- environ 500 Ko d'image
    raise exception 'Photo trop lourde' using errcode = '22023';
  end if;
  if p_etape is null or length(p_etape) > 80 then
    raise exception 'Étape invalide' using errcode = '22023';
  end if;
  insert into public.souvenirs (etape, data, pris_le)
  values (p_etape, p_data, coalesce(p_pris_le, now()))
  returning id into v_id;
  return v_id;
end;
$$;

-- Supprimer une photo
create or replace function public.souvenirs_supprimer(p_code text, p_id bigint)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if not public.roadbook_code_ok(p_code) then
    raise exception 'Code du groupe invalide' using errcode = '28000';
  end if;
  delete from public.souvenirs where id = p_id;
end;
$$;

-- Droits : la page (rôle anon) ne peut appeler que les 3 fonctions publiques
revoke all on function public.roadbook_code_ok(text)                              from public, anon, authenticated;
revoke all on function public.souvenirs_lister(text)                              from public;
revoke all on function public.souvenirs_ajouter(text, text, text, timestamptz)    from public;
revoke all on function public.souvenirs_supprimer(text, bigint)                   from public;
grant execute on function public.souvenirs_lister(text)                           to anon;
grant execute on function public.souvenirs_ajouter(text, text, text, timestamptz) to anon;
grant execute on function public.souvenirs_supprimer(text, bigint)                to anon;
