import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerInstance } from "@/db/supabase.client";

export const onRequest = defineMiddleware((context, next) => {
  const supabase = createSupabaseServerInstance({
    headers: context.request.headers,
    cookies: context.cookies,
  });
  // Attach supabase instance to locals
  context.locals.supabase = supabase;
  return next();
});
