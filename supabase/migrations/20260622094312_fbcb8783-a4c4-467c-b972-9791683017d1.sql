
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Registrations
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT,
  age_range TEXT,
  occupation TEXT,
  organization TEXT,
  state TEXT,
  motivation TEXT,
  heard_from TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read registrations" ON public.registrations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Atomic registration with capacity enforcement (100 seats)
CREATE OR REPLACE FUNCTION public.register_attendee(
  _full_name TEXT, _email TEXT, _phone TEXT,
  _gender TEXT, _age_range TEXT, _occupation TEXT,
  _organization TEXT, _state TEXT, _motivation TEXT, _heard_from TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  current_count INT;
  capacity CONSTANT INT := 100;
  new_id UUID;
BEGIN
  -- Lock to serialize concurrent inserts
  PERFORM pg_advisory_xact_lock(8675309);

  SELECT COUNT(*) INTO current_count FROM public.registrations;
  IF current_count >= capacity THEN
    RETURN jsonb_build_object('status', 'full', 'capacity', capacity);
  END IF;

  INSERT INTO public.registrations (full_name, email, phone, gender, age_range,
    occupation, organization, state, motivation, heard_from)
  VALUES (_full_name, _email, _phone, _gender, _age_range,
    _occupation, _organization, _state, _motivation, _heard_from)
  RETURNING id INTO new_id;

  RETURN jsonb_build_object(
    'status', 'ok',
    'id', new_id,
    'remaining', capacity - (current_count + 1)
  );
END;
$$;

-- Public seat availability function (safe: only returns counts)
CREATE OR REPLACE FUNCTION public.get_seat_status()
RETURNS JSONB LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT jsonb_build_object(
    'capacity', 100,
    'taken', (SELECT COUNT(*) FROM public.registrations)
  )
$$;
