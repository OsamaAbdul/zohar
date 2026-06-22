import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(4).max(40),
  gender: z.string().trim().max(40).optional().nullable(),
  age_range: z.string().trim().max(20).optional().nullable(),
  occupation: z.string().trim().max(120).optional().nullable(),
  organization: z.string().trim().max(160).optional().nullable(),
  state: z.string().trim().max(80).optional().nullable(),
  motivation: z.string().trim().max(1500).optional().nullable(),
  heard_from: z.string().trim().max(60).optional().nullable(),
});

export const Route = createFileRoute("/api/public/register")({
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
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const d = parsed.data;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.rpc("register_attendee", {
          _full_name: d.full_name,
          _email: d.email,
          _phone: d.phone,
          _gender: d.gender ?? "",
          _age_range: d.age_range ?? "",
          _occupation: d.occupation ?? "",
          _organization: d.organization ?? "",
          _state: d.state ?? "",
          _motivation: d.motivation ?? "",
          _heard_from: d.heard_from ?? "",
        });
        if (error) {
          console.error("register_attendee error", error);
          return Response.json({ error: "Could not save registration" }, { status: 500 });
        }
        const result = data as { status: string; capacity?: number; remaining?: number };
        if (result.status === "full") {
          return Response.json({ error: "spot_filled", capacity: result.capacity }, { status: 409 });
        }
        return Response.json({ ok: true, remaining: result.remaining });
      },
    },
  },
});
