
-- Extend services
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS banner_image TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS process JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS pricing_tiers JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  ADD COLUMN IF NOT EXISTS og_title TEXT,
  ADD COLUMN IF NOT EXISTS og_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Extend blog_posts
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  ADD COLUMN IF NOT EXISTS og_title TEXT,
  ADD COLUMN IF NOT EXISTS og_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Page SEO
CREATE TABLE IF NOT EXISTS public.page_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_seo TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_seo TO authenticated;
GRANT ALL ON public.page_seo TO service_role;

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads page seo"
  ON public.page_seo FOR SELECT TO public USING (true);

CREATE POLICY "Admins write page seo"
  ON public.page_seo FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_page_seo_updated
  BEFORE UPDATE ON public.page_seo
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.page_seo;

-- Seed default rows for common pages so admins have something to edit right away
INSERT INTO public.page_seo (path, label, meta_title, meta_description) VALUES
  ('/',          'Home',      'Adphira LLC — Premium software, AI & growth', 'Design, engineering, AI, cloud and growth from a single premium partner.'),
  ('/about',     'About',     'About — Adphira LLC',      'Meet the team behind Adphira LLC.'),
  ('/services',  'Services',  'Services — Adphira LLC',   'Web, mobile, AI, cloud, security, marketing and SEO services.'),
  ('/portfolio', 'Portfolio', 'Portfolio — Adphira LLC',  'Selected work from the Adphira studio.'),
  ('/team',      'Team',      'Team — Adphira LLC',       'The people behind Adphira LLC.'),
  ('/careers',   'Careers',   'Careers — Adphira LLC',    'Open roles and how we work.'),
  ('/pricing',   'Pricing',   'Pricing — Adphira LLC',    'Simple, transparent pricing.'),
  ('/faq',       'FAQ',       'FAQ — Adphira LLC',        'Answers to common questions.'),
  ('/blog',      'Blog',      'Blog — Adphira LLC',       'Insights on software, AI, product and design.'),
  ('/contact',   'Contact',   'Contact — Adphira LLC',    'Get in touch with Adphira LLC.'),
  ('/privacy',   'Privacy',   'Privacy — Adphira LLC',    'How we handle your data.'),
  ('/terms',     'Terms',     'Terms — Adphira LLC',      'Terms of service.')
ON CONFLICT (path) DO NOTHING;
