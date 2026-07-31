CREATE TABLE public.tracking_pixels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  label text,
  pixel_id text,
  verification_code text,
  head_code text,
  body_code text,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tracking_pixels TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tracking_pixels TO authenticated;
GRANT ALL ON public.tracking_pixels TO service_role;

ALTER TABLE public.tracking_pixels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read enabled pixels"
  ON public.tracking_pixels FOR SELECT
  TO anon, authenticated
  USING (enabled = true);

CREATE POLICY "Admins manage pixels"
  ON public.tracking_pixels FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER tracking_pixels_updated_at
  BEFORE UPDATE ON public.tracking_pixels
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();