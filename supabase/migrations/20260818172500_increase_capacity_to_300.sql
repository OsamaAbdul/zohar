-- Update capacity to 300
CREATE OR REPLACE FUNCTION public.register_attendee(
  _full_name TEXT, _email TEXT, _phone TEXT,
  _gender TEXT, _age_range TEXT, _occupation TEXT,
  _organization TEXT, _state TEXT, _motivation TEXT, _heard_from TEXT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  current_count INT;
  capacity CONSTANT INT := 300;
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
    'capacity', 300,
    'taken', (SELECT COUNT(*) FROM public.registrations)
  )
$$;

-- Ensure permissions are intact
REVOKE EXECUTE ON FUNCTION public.register_attendee(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_attendee(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) TO service_role;
