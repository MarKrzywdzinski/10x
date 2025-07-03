import { z } from "zod";
import type { APIRoute } from "astro";
import type { GenerateFlashcardsCommand } from "../../types";
import { GenerationService } from "../../lib/generation.service";

export const prerender = false;

// Validation schema for the request body
const generateFlashcardsSchema = z.object({
  source_text: z
    .string()
    .min(1000, "Text must be at least 1000 characters long")
    .max(10000, "Text must not exceed 10000 characters"),
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const {
      data: { user },
    } = await locals.supabase.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

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
        },
      );
    }

    // Initialize service and generate flashcards
    const generationService = new GenerationService(locals.supabase, {
      apiKey: import.meta.env.OPENROUTER_API_KEY,
      // Use the request's origin header when available. This is required by OpenRouter.
      // Fallback to the value provided via environment variable, or localhost during development.
      referer:
        request.headers.get("origin") ||
        (import.meta.env.OPENROUTER_HTTP_REFERER as string | undefined) ||
        "http://localhost",
      title: "10xCards Flashcard Generation",
    });
    const result = await generationService.generateFlashcards(body.source_text);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log full error details for debugging
    // eslint-disable-next-line no-console
    console.error("Error processing generation request:", error);
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: error.message,
          stack: error.stack,
          details: (error as { details?: string }).details || null,
          code: (error as { code?: string }).code || null,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
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
        },
      );
    }
  }
};
