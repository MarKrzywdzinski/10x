import { createClient } from "@supabase/supabase-js";
import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";
import type { AstroCookies } from "astro";

import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
export type SupabaseClient = typeof supabaseClient;

// Client-side instance (uses public anon key)
export const supabaseBrowserClient =
  typeof window !== "undefined"
    ? createClient<Database>(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY
      )
    : (supabaseClient as unknown as ReturnType<typeof createClient<Database>>);

export const DEFAULT_USER_ID = "caeb082e-c253-400c-a46e-4057b78fe2c2";

export const cookieOptions: CookieOptionsWithName = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

function parseCookieHeader(cookieHeader: string): { name: string; value: string }[] {
  return cookieHeader
    .split(";")
    .filter(Boolean)
    .map((cookie) => {
      const [name, ...rest] = cookie.trim().split("=");
      return { name, value: rest.join("=") };
    });
}

export const createSupabaseServerInstance = (context: {
  headers: Headers;
  cookies: AstroCookies;
}) => {
  const supabase = createServerClient<Database>(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_KEY,
    {
      cookieOptions,
      cookies: {
        getAll() {
          return parseCookieHeader(context.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  return supabase;
};
