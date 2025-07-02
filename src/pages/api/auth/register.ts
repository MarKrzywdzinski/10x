import type { APIRoute } from "astro";
import { z } from "zod";
import { createSupabaseServerInstance } from "@/db/supabase.client";

export const prerender = false;

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const POST: APIRoute = async ({ request, cookies, params, headers }) => {
  const supabase = createSupabaseServerInstance({ headers: request.headers, cookies });

  const body = await request.json();
  const parse = registerSchema.safeParse(body);
  if (!parse.success) {
    return new Response(JSON.stringify({ error: "Invalid payload", details: parse.error.flatten() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = parse.data;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:3000"}/login`,
    },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ user: { id: data.user?.id, email: data.user?.email } }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
