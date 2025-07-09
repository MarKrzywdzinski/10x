import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ResetPasswordConfirmFormProps {
  /** Token resetu hasła pobrany z parametru URL */
  token?: string;
}

export function ResetPasswordConfirmForm({ token }: ResetPasswordConfirmFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError("Hasło musi mieć min. 8 znaków");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hasła nie są zgodne");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 800));
      console.log("Reset confirm payload", { token, password });
      setMessage("Hasło zostało zaktualizowane (mock)");
      setPassword("");
      setConfirmPassword("");
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
        <Label htmlFor="password">Nowe hasło</Label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="********"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Potwierdź hasło</Label>
        <input
          id="confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="********"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Zapisywanie…" : "Zmień hasło"}
      </Button>
    </form>
  );
}
