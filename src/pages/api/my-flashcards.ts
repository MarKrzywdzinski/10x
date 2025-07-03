export const prerender = false;
import { createSupabaseServerInstance } from "../../db/supabase.client";

export async function GET({ request, cookies }) {
  const supabase = createSupabaseServerInstance({
    headers: request.headers,
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { data: flashcards, error } = await supabase
    .from("flashcards")
    .select(
      "id, front, back, source, generation_id, created_at, updated_at, user_id",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify({ flashcards }), { status: 200 });
}
