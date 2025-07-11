
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="ml-4">
      Wyloguj
    </Button>
  );
}
