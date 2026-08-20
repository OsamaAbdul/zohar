import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error("Role check failed: " + roleErr.message);
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return { rows: data ?? [] };
  });

export const getPortalStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error("Role check failed: " + roleErr.message);
    if (!isAdmin) throw new Error("Forbidden");
    
    const { data, error } = await (supabaseAdmin as any)
      .from("settings")
      .select("value")
      .eq("key", "registration_open")
      .maybeSingle();
      
    if (error) throw new Error(error.message);
    
    // If not found, default to true
    return { isOpen: data ? data.value === "true" || data.value === true : true };
  });

export const togglePortalStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error("Role check failed: " + roleErr.message);
    if (!isAdmin) throw new Error("Forbidden");
    
    const { data, error } = await (supabaseAdmin as any)
      .from("settings")
      .select("value")
      .eq("key", "registration_open")
      .maybeSingle();
      
    if (error) throw new Error(error.message);
    
    const currentIsOpen = data ? data.value === "true" || data.value === true : true;
    const newIsOpen = !currentIsOpen;
    
    const { error: updateErr } = await (supabaseAdmin as any)
      .from("settings")
      .upsert({ key: "registration_open", value: newIsOpen ? "true" : "false" });
      
    if (updateErr) throw new Error(updateErr.message);
    
    return { isOpen: newIsOpen };
  });

export const deleteRegistration = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isAdmin, error: roleErr } = await supabaseAdmin.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw new Error("Role check failed: " + roleErr.message);
    if (!isAdmin) throw new Error("Forbidden");
    
    const { error } = await supabaseAdmin
      .from("registrations")
      .delete()
      .eq("id", data.id);
      
    if (error) throw new Error(error.message);
    
    return { success: true };
  });
