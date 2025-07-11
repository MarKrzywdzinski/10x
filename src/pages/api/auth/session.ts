import type { APIRoute } from "astro";
import { createSupabaseServerInstance } from "@/db/supabase.client";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerInstance({
    headers: request.headers,
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

<<<<<<< HEAD
  return new Response(JSON.stringify({ user: user ? { id: user.id, email: user.email } : null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
=======
  return new Response(
    JSON.stringify({ user: user ? { id: user.id, email: user.email } : null }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
};
