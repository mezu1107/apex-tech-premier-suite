
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug text;
UPDATE public.services SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS services_slug_key ON public.services(slug);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS long_description text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hero_image text;
