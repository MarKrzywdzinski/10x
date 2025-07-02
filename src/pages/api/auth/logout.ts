import type { APIRoute } from "astro";
import { createSupabaseServerInstance } from "@/db/supabase.client";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerInstance({ headers: request.headers, cookies });

  const { error } = await supabase.auth.signOut();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 204 = No Content
  return new Response(null, { status: 204 });
};

// Allow GET requests for easier logout via simple link
export const GET = POST;
