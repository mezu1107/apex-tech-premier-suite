
-- TASKS
CREATE TABLE public.client_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo',
  priority text NOT NULL DEFAULT 'medium',
  progress integer NOT NULL DEFAULT 0,
  assignee text,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_tasks TO authenticated;
GRANT ALL ON public.client_tasks TO service_role;
ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage client tasks" ON public.client_tasks FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own tasks" ON public.client_tasks FOR SELECT TO authenticated USING (is_my_client(client_id));
CREATE TRIGGER client_tasks_updated BEFORE UPDATE ON public.client_tasks FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- MESSAGES
CREATE TABLE public.client_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text NOT NULL,
  sender text NOT NULL DEFAULT 'AYMOXI Team',
  important boolean NOT NULL DEFAULT false,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_messages TO authenticated;
GRANT ALL ON public.client_messages TO service_role;
ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage client messages" ON public.client_messages FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own messages" ON public.client_messages FOR SELECT TO authenticated USING (is_my_client(client_id));
CREATE POLICY "Clients update own messages" ON public.client_messages FOR UPDATE TO authenticated USING (is_my_client(client_id)) WITH CHECK (is_my_client(client_id));
CREATE TRIGGER client_messages_updated BEFORE UPDATE ON public.client_messages FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- NOTIFICATIONS
CREATE TABLE public.client_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  kind text NOT NULL DEFAULT 'info',
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_notifications TO authenticated;
GRANT ALL ON public.client_notifications TO service_role;
ALTER TABLE public.client_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage client notifications" ON public.client_notifications FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own notifications" ON public.client_notifications FOR SELECT TO authenticated USING (is_my_client(client_id));
CREATE POLICY "Clients update own notifications" ON public.client_notifications FOR UPDATE TO authenticated USING (is_my_client(client_id)) WITH CHECK (is_my_client(client_id));
CREATE TRIGGER client_notifications_updated BEFORE UPDATE ON public.client_notifications FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- DOCUMENTS
CREATE TABLE public.client_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  file_type text,
  file_size integer,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_documents TO authenticated;
GRANT ALL ON public.client_documents TO service_role;
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage client documents" ON public.client_documents FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own documents" ON public.client_documents FOR SELECT TO authenticated USING (is_my_client(client_id));
CREATE TRIGGER client_documents_updated BEFORE UPDATE ON public.client_documents FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ACTIVITY
CREATE TABLE public.client_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  action text NOT NULL,
  description text,
  actor text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_activities TO authenticated;
GRANT ALL ON public.client_activities TO service_role;
ALTER TABLE public.client_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage client activities" ON public.client_activities FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own activities" ON public.client_activities FOR SELECT TO authenticated USING (is_my_client(client_id));

-- SUPPORT REQUESTS
CREATE TABLE public.support_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.portal_clients(id) ON DELETE CASCADE,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'normal',
  reply text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_requests TO authenticated;
GRANT ALL ON public.support_requests TO service_role;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage support requests" ON public.support_requests FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Clients read own support requests" ON public.support_requests FOR SELECT TO authenticated USING (is_my_client(client_id));
CREATE POLICY "Clients create own support requests" ON public.support_requests FOR INSERT TO authenticated WITH CHECK (is_my_client(client_id));
CREATE TRIGGER support_requests_updated BEFORE UPDATE ON public.support_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- CLIENT PROFILE SELF-UPDATE
CREATE POLICY "Clients update own record" ON public.portal_clients FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
