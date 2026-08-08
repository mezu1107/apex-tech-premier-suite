CREATE OR REPLACE FUNCTION public.is_my_client(_client_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.portal_clients c WHERE c.id = _client_id AND c.user_id = auth.uid())
$$;