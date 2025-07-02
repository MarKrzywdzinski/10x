import type { APIRoute } from "astro";
import { z } from "zod";
import { createSupabaseServerInstance } from "@/db/supabase.client";

export const prerender = false;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerInstance({ cookies, headers: request.headers });

  const body = await request.json();
  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return new Response(JSON.stringify({ error: "Invalid payload", details: parse.error.flatten() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = parse.data;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Require email confirmed
  if (!data.user?.email_confirmed_at) {
    return new Response(JSON.stringify({ error: "Email not confirmed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ user: { id: data.user.id, email: data.user.email } }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
