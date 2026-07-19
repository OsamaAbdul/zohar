import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(4).max(40),
  gender: z.string().trim().max(40).optional().nullable(),
  age: z.string().trim().max(40).optional().nullable(),
  occupation: z.string().trim().max(120).optional().nullable(),
  state: z.string().trim().max(80).optional().nullable(),
  city: z.string().trim().max(80).optional().nullable(),
  available_throughout: z.boolean(),
  commit_meetings: z.boolean(),
  teams: z.array(z.string()).default([]),
});

export const Route = createFileRoute("/api/public/volunteer")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
        }
        
        const d = parsed.data;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        
        const { data, error } = await supabaseAdmin.rpc("register_volunteer", {
          _full_name: d.full_name,
          _email: d.email,
          _phone: d.phone,
          _gender: d.gender ?? "",
          _age: d.age ?? "",
          _occupation: d.occupation ?? "",
          _state: d.state ?? "",
          _city: d.city ?? "",
          _available_throughout: d.available_throughout,
          _commit_meetings: d.commit_meetings,
          _teams: d.teams,
        });
        
        if (error) {
          console.error("register_volunteer error", error);
          return Response.json({ error: "Could not save volunteer registration" }, { status: 500 });
        }
        
        return Response.json({ ok: true });
      },
    },
  },
});
