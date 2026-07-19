-- Volunteers
CREATE TABLE public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT,
  age TEXT,
  occupation TEXT,
  state TEXT,
  city TEXT,
  available_throughout BOOLEAN NOT NULL DEFAULT false,
  commit_meetings BOOLEAN NOT NULL DEFAULT false,
  teams TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.volunteers TO authenticated;
GRANT ALL ON public.volunteers TO service_role;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read volunteers" ON public.volunteers
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Registration function for volunteers
CREATE OR REPLACE FUNCTION public.register_volunteer(
  _full_name TEXT, _email TEXT, _phone TEXT,
  _gender TEXT, _age TEXT, _occupation TEXT,
  _state TEXT, _city TEXT, _available_throughout BOOLEAN, 
  _commit_meetings BOOLEAN, _teams TEXT[]
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.volunteers (
    full_name, email, phone, gender, age, occupation, 
    state, city, available_throughout, commit_meetings, teams
  )
  VALUES (
    _full_name, _email, _phone, _gender, _age, _occupation, 
    _state, _city, _available_throughout, _commit_meetings, _teams
  )
  RETURNING id INTO new_id;

  RETURN jsonb_build_object(
    'status', 'ok',
    'id', new_id
  );
END;
$$;
