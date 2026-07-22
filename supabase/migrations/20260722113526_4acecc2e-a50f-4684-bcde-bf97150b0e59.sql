
-- 1) Remove race-condition "first signup = admin". Always create as 'user'.
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- 2) Revoke public EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- Keep authenticated EXECUTE on has_role — RLS policies rely on it at runtime
-- (policies run as the querying role; revoking authenticated would break admin checks).

-- 3) Drop duplicate public read policies (keep the "Public reads published X" ones)
DROP POLICY IF EXISTS "public read published portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "public read published services" ON public.services;
DROP POLICY IF EXISTS "public read published team" ON public.team_members;
DROP POLICY IF EXISTS "public read published testimonials" ON public.testimonials;

-- 4) Hide team_members.email from anonymous visitors via column-level privileges
REVOKE SELECT ON public.team_members FROM anon;
GRANT SELECT (id, name, role_title, bio, photo_url, linkedin_url, twitter_url, published, sort_order, created_at, updated_at)
  ON public.team_members TO anon;
