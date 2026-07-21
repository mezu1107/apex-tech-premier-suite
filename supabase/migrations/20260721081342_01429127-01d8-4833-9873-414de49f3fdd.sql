
-- Replace overly-permissive INSERT policy with a validated one
DROP POLICY "Anyone can submit a message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a valid message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) between 1 and 200
    AND length(trim(email)) between 3 and 320
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(message)) between 1 and 5000
    AND length(coalesce(subject,'')) <= 300
  );

-- Restrict SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
