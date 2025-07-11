<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";

export default function AuthControls() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setEmail(data.user?.email ?? null);
      } catch {
        // ignore
      }
    };

    fetchSession();
    const interval = setInterval(fetchSession, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (email) {
    return (
      <div className="flex items-center text-sm gap-2">
        <span>Cześć, {email}</span>
        <Button variant="outline" asChild>
          <a href="/my-flashcards">Moje fiszki</a>
        </Button>
        <LogoutButton />
      </div>
    );
  }

  return (
    <Button variant="outline" asChild>
      <a href="/login">Zaloguj</a>
    </Button>
  );
}
