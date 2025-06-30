import { z } from "zod";
import type { APIRoute } from "astro";
import type { GenerateFlashcardsCommand } from "../../types";
import { GenerationService } from "../../lib/generation.service";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

// Validation schema for the request body
const generateFlashcardsSchema = z.object({
  source_text: z
    .string()
    .min(1000, "Text must be at least 1000 characters long")
    .max(10000, "Text must not exceed 10000 characters"),
});

// Tymczasowy kod do utworzenia użytkownika, jeśli nie istnieje
const ensureDefaultUserExists = async () => {
  const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY);
  const userId = "caeb082e-c253-400c-a46e-4057b78fe2c2";
  const { data, error } = await supabase.from("users").select("id").eq("id", userId).single();
  if (!data) {
    await supabase.from("users").insert({
      id: userId,
      email: "test@example.com",
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  await ensureDefaultUserExists();
  try {
    // Parse and validate request body
    const body = (await request.json()) as GenerateFlashcardsCommand;
    const validationResult = generateFlashcardsSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request data",
          details: validationResult.error.errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize service and generate flashcards
    const generationService = new GenerationService(locals.supabase, {
      apiKey: import.meta.env.OPENROUTER_API_KEY,
    });
    const result = await generationService.generateFlashcards(body.source_text);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log full error details for debugging
    console.error("Error processing generation request:", error);
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: error.message,
          stack: error.stack,
          details: (error as any).details || null,
          code: (error as any).code || null,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Log and return non-Error objects
      return new Response(
        JSON.stringify({
          errorType: typeof error,
          errorValue: error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};
