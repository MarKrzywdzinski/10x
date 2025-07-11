import type { FormEvent } from "react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  /**
   * Callback wywołany po sukcesie logowania.
   * Backendowa implementacja pojawi się w kolejnych zadaniach.
   */
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Guard clauses for validation
    if (!email) {
      setError("Email jest wymagany");
      return;
    }
    if (!password) {
      setError("Hasło jest wymagane");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Defensive: handle non-JSON response
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        setError("Nieprawidłowa odpowiedź serwera");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Nie udało się zalogować");
        return;
      }

      onSuccess?.();
      window.location.href = "/generate";
    } catch (err) {
      // Log error for debugging, but don't expose details to user
      console.error("Login error:", err);
      setError("Wystąpił błąd przy łączeniu z serwerem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Hasło</Label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="********"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Logowanie…" : "Zaloguj się"}
      </Button>
    </form>
  );
}
