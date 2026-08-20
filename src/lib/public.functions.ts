import { createServerFn } from "@tanstack/react-start";

export const getPublicPortalStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data, error } = await (supabaseAdmin as any)
      .from("settings")
      .select("value")
      .eq("key", "registration_open")
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching portal status:", error);
      return { isOpen: true }; // Default to true if there's an error
    }
    
    return { isOpen: data ? data.value === "true" || data.value === true : true };
  });
