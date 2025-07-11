<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ResetPasswordRequestForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Email jest wymagany");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      console.log("Reset password request payload", { email });
      setMessage("Jeśli konto istnieje, wysłaliśmy instrukcje resetu hasła.");
      setEmail("");
    } catch {
      setError("Wystąpił błąd (mock)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

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

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Wysyłanie…" : "Wyślij link resetu"}
      </Button>
    </form>
  );
}
