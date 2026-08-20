CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Insert default setting for registration_open
INSERT INTO public.settings (key, value) VALUES ('registration_open', 'true'::jsonb) ON CONFLICT DO NOTHING;

-- Grant permissions (if RLS is enabled, we'll allow anon to read settings)
-- Though the RPC runs as SECURITY DEFINER so it can read it anyway.
-- Admin functions will run as service_role, bypassing RLS.

-- Re-create the RPC to check the setting
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
    is_open BOOLEAN;
  BEGIN
    -- Check if registration is open
    SELECT (value::text = 'true') INTO is_open FROM public.settings WHERE key = 'registration_open';
    IF is_open IS FALSE THEN
      RETURN jsonb_build_object('status', 'closed');
    END IF;

    -- Lock to serialize concurrent inserts
    PERFORM pg_advisory_xact_lock(8675309);
  
    SELECT COUNT(*) INTO current_count FROM public.registrations;
    IF current_count >= capacity THEN
      RETURN jsonb_build_object('status', 'full', 'capacity', capacity);
    END IF;
  
    INSERT INTO public.registrations (full_name, email, phone, gender, age_range,
      occupation, organization, state, motivation, heard_from)
    VALUES (
      _full_name, _email, _phone,
      NULLIF(_gender, ''), NULLIF(_age_range, ''), NULLIF(_occupation, ''),
      NULLIF(_organization, ''), NULLIF(_state, ''), NULLIF(_motivation, ''),
      NULLIF(_heard_from, '')
    ) RETURNING id INTO new_id;
  
    RETURN jsonb_build_object('status', 'success', 'remaining', capacity - current_count - 1);
  END;
$$;
