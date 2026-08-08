
-- ========== CRM ==========
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text,
  source text NOT NULL DEFAULT 'website',
  value_usd numeric NOT NULL DEFAULT 0,
  stage text NOT NULL DEFAULT 'new',
  priority text NOT NULL DEFAULT 'medium',
  notes text,
  next_follow_up date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) BETWEEN 1 AND 120 AND length(email) BETWEEN 3 AND 160 AND email LIKE '%@%' AND stage = 'new' AND coalesce(length(notes),0) <= 4000);
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  body text NOT NULL,
  kind text NOT NULL DEFAULT 'note',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_notes TO authenticated;
GRANT ALL ON public.lead_notes TO service_role;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage lead notes" ON public.lead_notes FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- ========== Portal clients ==========
CREATE TABLE public.portal_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portal_clients TO authenticated;
GRANT ALL ON public.portal_clients TO service_role;
ALTER TABLE public.portal_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage portal clients" ON public.portal_clients FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own record" ON public.portal_clients FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE TRIGGER portal_clients_updated BEFORE UPDATE ON public.portal_clients FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION public.is_my_client(_client_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.portal_clients c WHERE c.id = _client_id AND c.user_id = auth.uid())
$$;
REVOKE ALL ON FUNCTION public.is_my_client(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_my_client(uuid) TO authenticated, service_role;

-- ========== Projects ==========
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.portal_clients(id) ON DELETE SET NULL,
  title text NOT NULL,
  service text,
  status text NOT NULL DEFAULT 'planning',
  progress integer NOT NULL DEFAULT 0,
  start_date date,
  due_date date,
  budget_usd numeric NOT NULL DEFAULT 0,
  summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own projects" ON public.projects FOR SELECT TO authenticated
  USING (is_my_client(client_id));
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE public.project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending',
  due_date date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_milestones TO authenticated;
GRANT ALL ON public.project_milestones TO service_role;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage milestones" ON public.project_milestones FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own milestones" ON public.project_milestones FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND is_my_client(p.client_id)));
CREATE TRIGGER milestones_updated BEFORE UPDATE ON public.project_milestones FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE public.project_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_files TO authenticated;
GRANT ALL ON public.project_files TO service_role;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage project files" ON public.project_files FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own project files" ON public.project_files FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND is_my_client(p.client_id)));

-- ========== Proposals & invoices ==========
CREATE TABLE public.proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  client_id uuid REFERENCES public.portal_clients(id) ON DELETE SET NULL,
  title text NOT NULL,
  client_name text NOT NULL,
  client_email text,
  currency text NOT NULL DEFAULT 'USD',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  notes text,
  status text NOT NULL DEFAULT 'draft',
  valid_until date,
  share_token text NOT NULL DEFAULT encode(gen_random_bytes(16),'hex'),
  viewed_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.proposals TO authenticated;
GRANT ALL ON public.proposals TO service_role;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage proposals" ON public.proposals FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own proposals" ON public.proposals FOR SELECT TO authenticated
  USING (is_my_client(client_id));
CREATE TRIGGER proposals_updated BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid REFERENCES public.proposals(id) ON DELETE SET NULL,
  client_id uuid REFERENCES public.portal_clients(id) ON DELETE SET NULL,
  number text NOT NULL,
  client_name text NOT NULL,
  client_email text,
  currency text NOT NULL DEFAULT 'USD',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  amount_paid numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  payment_method text NOT NULL DEFAULT 'card',
  due_date date,
  paid_at timestamptz,
  notes text,
  share_token text NOT NULL DEFAULT encode(gen_random_bytes(16),'hex'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT ALL ON public.invoices TO service_role;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage invoices" ON public.invoices FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own invoices" ON public.invoices FOR SELECT TO authenticated
  USING (is_my_client(client_id));
CREATE TRIGGER invoices_updated BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Site audits ==========
CREATE TABLE public.site_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  name text,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  score_overall integer,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  findings jsonb NOT NULL DEFAULT '[]'::jsonb,
  summary text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_audits TO authenticated;
GRANT INSERT ON public.site_audits TO anon;
GRANT ALL ON public.site_audits TO service_role;
ALTER TABLE public.site_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request an audit" ON public.site_audits FOR INSERT TO anon, authenticated
  WITH CHECK (length(url) BETWEEN 4 AND 400 AND length(email) BETWEEN 3 AND 160 AND email LIKE '%@%' AND status = 'pending');
CREATE POLICY "Admins manage audits" ON public.site_audits FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER site_audits_updated BEFORE UPDATE ON public.site_audits FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Quote calculator ==========
CREATE TABLE public.calculator_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  label text NOT NULL,
  description text,
  price_usd numeric NOT NULL DEFAULT 0,
  price_pkr numeric NOT NULL DEFAULT 0,
  is_base boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.calculator_options TO authenticated;
GRANT SELECT ON public.calculator_options TO anon;
GRANT ALL ON public.calculator_options TO service_role;
ALTER TABLE public.calculator_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published options" ON public.calculator_options FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "Admins manage options" ON public.calculator_options FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER calc_options_updated BEFORE UPDATE ON public.calculator_options FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Email templates / log ==========
CREATE TABLE public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  subject text NOT NULL,
  body_html text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_templates TO authenticated;
GRANT ALL ON public.email_templates TO service_role;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage email templates" ON public.email_templates FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER email_templates_updated BEFORE UPDATE ON public.email_templates FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE public.email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email text NOT NULL,
  subject text NOT NULL,
  template_key text,
  status text NOT NULL DEFAULT 'sent',
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_log TO authenticated;
GRANT ALL ON public.email_log TO service_role;
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read email log" ON public.email_log FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- ========== Page builder ==========
CREATE TABLE public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL DEFAULT '/',
  section_key text NOT NULL,
  label text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT SELECT ON public.page_sections TO anon;
GRANT ALL ON public.page_sections TO service_role;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads sections" ON public.page_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage sections" ON public.page_sections FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER page_sections_updated BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ========== Analytics ==========
CREATE TABLE public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  event text NOT NULL DEFAULT 'pageview',
  session_id text,
  referrer text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX analytics_events_created_idx ON public.analytics_events (created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_events TO authenticated;
GRANT INSERT ON public.analytics_events TO anon;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record an event" ON public.analytics_events FOR INSERT TO anon, authenticated
  WITH CHECK (length(path) <= 300 AND length(event) <= 60 AND coalesce(length(session_id),0) <= 64 AND coalesce(length(referrer),0) <= 400);
CREATE POLICY "Admins read events" ON public.analytics_events FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- ========== Seed ==========
INSERT INTO public.calculator_options (service, label, description, price_usd, price_pkr, is_base, sort_order) VALUES
('Web Development','Starter website (up to 5 pages)','Design, build, mobile-ready, contact form',900,250000,true,1),
('Web Development','Business website (up to 15 pages)','Full site with blog and CMS',2200,610000,true,2),
('Web Development','Custom web application','Dashboards, logins, custom logic',6500,1800000,true,3),
('Web Development','Blog / CMS module','Post editor, categories, SEO fields',350,98000,false,4),
('Web Development','Multi-language support','Second language across the site',400,112000,false,5),
('Web Development','Admin panel','Manage all content yourself',800,224000,false,6),
('E-commerce','Starter store (up to 50 products)','Catalog, cart, checkout',1800,500000,true,1),
('E-commerce','Scaling store (unlimited products)','Filters, variants, inventory',4200,1170000,true,2),
('E-commerce','Payment gateway integration','Stripe, PayPal or local gateway',450,126000,false,3),
('E-commerce','Abandoned cart recovery','Automated recovery emails',380,106000,false,4),
('E-commerce','Product import / migration','Move an existing catalog over',500,140000,false,5),
('Mobile App','Single-platform app (iOS or Android)','Native-quality cross-platform build',5500,1540000,true,1),
('Mobile App','Both platforms (iOS + Android)','One codebase, two stores',7800,2180000,true,2),
('Mobile App','Push notifications','Segmented campaigns and alerts',450,126000,false,3),
('Mobile App','In-app payments','Subscriptions or one-time purchases',700,196000,false,4),
('Mobile App','App store submission','Listing, assets and review handling',350,98000,false,5),
('AI Automation','AI chatbot for your website','Trained on your content, 24/7 replies',1200,336000,true,1),
('AI Automation','Workflow automation','Connect your tools, remove manual work',2400,670000,true,2),
('AI Automation','CRM / lead auto-routing','Score and assign leads automatically',900,252000,false,3),
('AI Automation','Document / invoice processing','Extract data from files automatically',1400,392000,false,4),
('Digital Marketing','SEO growth retainer','On-page, technical and content SEO',800,224000,true,1),
('Digital Marketing','Paid ads management','Google and Meta campaign management',700,196000,true,2),
('Digital Marketing','Social media management','Content calendar, posting, engagement',600,168000,false,3),
('Digital Marketing','Content writing (8 articles/mo)','SEO-researched long-form articles',500,140000,false,4),
('Digital Marketing','Monthly reporting dashboard','Live results dashboard',250,70000,false,5);

INSERT INTO public.email_templates (key, label, subject, body_html) VALUES
('lead_received','Auto-reply: new enquiry','We received your enquiry — AYMOXI LLC','<p>Hi {{name}},</p><p>Thanks for reaching out to AYMOXI LLC. We have received your enquiry about <strong>{{service}}</strong> and will reply within one business day.</p><p>Need us sooner? Call or WhatsApp <strong>+1 720 794 1888</strong>.</p><p>— Team AYMOXI</p>'),
('quote_estimate','Auto-reply: instant quote','Your instant estimate from AYMOXI LLC','<p>Hi {{name}},</p><p>Here is the estimate you generated on our site:</p><p><strong>{{summary}}</strong></p><p>Estimated total: <strong>{{total}}</strong></p><p>This is an indicative range. Reply to this email and we will confirm exact scope and timeline.</p><p>— Team AYMOXI</p>'),
('audit_requested','Auto-reply: website audit request','Your free website audit is being prepared','<p>Hi {{name}},</p><p>We have queued a free audit for <strong>{{url}}</strong>. You will receive the full speed, SEO and mobile report shortly.</p><p>— Team AYMOXI</p>'),
('invoice_sent','Invoice','Invoice {{number}} from AYMOXI LLC','<p>Hi {{name}},</p><p>Invoice <strong>{{number}}</strong> for <strong>{{total}}</strong> is ready. It is due on {{due_date}}.</p><p>{{payment_instructions}}</p><p>— Team AYMOXI</p>'),
('proposal_sent','Proposal','Your proposal from AYMOXI LLC','<p>Hi {{name}},</p><p>Your proposal <strong>{{title}}</strong> is ready to review.</p><p>— Team AYMOXI</p>');

INSERT INTO public.page_sections (page, section_key, label, sort_order) VALUES
('/','hero','Hero slider',1),
('/','trust','Trust bar / client logos',2),
('/','stats','Stats counters',3),
('/','services','Services bento grid',4),
('/','why','Why choose us bento',5),
('/','calculator','Instant quote calculator',6),
('/','audit','Free website audit',7),
('/','process','Process steps',8),
('/','testimonials','Testimonials',9),
('/','cta','Final call to action',10);
