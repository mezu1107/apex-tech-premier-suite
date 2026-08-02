DROP POLICY IF EXISTS "Anyone can submit quote" ON public.quote_requests;
CREATE POLICY "Anyone can submit a valid quote" ON public.quote_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND length(coalesce(phone, '')) <= 50
  AND length(coalesce(company, '')) <= 200
  AND length(coalesce(service, '')) <= 200
  AND length(coalesce(budget, '')) <= 100
  AND length(coalesce(timeline, '')) <= 100
  AND is_read = false
  AND status = 'new'
);

DROP POLICY IF EXISTS "Anyone can book" ON public.bookings;
CREATE POLICY "Anyone can submit a valid booking" ON public.bookings
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(coalesce(phone, '')) <= 50
  AND length(coalesce(company, '')) <= 200
  AND length(coalesce(service, '')) <= 200
  AND length(coalesce(preferred_time, '')) <= 50
  AND length(coalesce(meeting_type, '')) <= 100
  AND length(coalesce(notes, '')) <= 5000
  AND (preferred_date IS NULL OR preferred_date >= current_date - 1)
  AND is_read = false
  AND status = 'new'
);

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe with a valid email" ON public.newsletter_subscribers
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(email)) BETWEEN 3 AND 320
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(coalesce(source, '')) <= 100
);