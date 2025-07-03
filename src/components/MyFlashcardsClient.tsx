import { useEffect, useState } from "react";
import { FlashcardList } from "../components/FlashcardList";
import type { FlashcardProposalViewModel } from "./FlashcardGenerationView";

export default function MyFlashcardsClient() {
  const [flashcards, setFlashcards] = useState<FlashcardProposalViewModel[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFlashcards() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/my-flashcards");
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Błąd pobierania fiszek");
          setFlashcards([]);
        } else {
          const data = await res.json();
          setFlashcards(
            (data.flashcards || []).map((f: FlashcardProposalViewModel) => ({
              front: f.front,
              back: f.back,
              accepted: false,
              edited: false,
              source: f.source === "ai-edited" ? "ai-edited" : "ai-full",
            })),
          );
        }
      } catch {
        setError("Błąd sieci lub serwera");
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, []);

  // Handlery jak w /generate
  const handleAccept = (index: number) => {
    setFlashcards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, accepted: true } : card)),
    );
  };
  const handleReject = (index: number) => {
    setFlashcards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, accepted: false } : card,
      ),
    );
  };
  const handleEdit = (index: number, front: string, back: string) => {
    setFlashcards((prev) =>
      prev.map((card, i) =>
        i === index
          ? { ...card, front, back, edited: true, source: "ai-edited" as const }
          : card,
      ),
    );
  };

  if (loading) return <p>Ładowanie fiszek...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (flashcards.length === 0) return <p>Nie masz jeszcze żadnych fiszek.</p>;
  return (
    <div className="space-y-6">
      <FlashcardList
        flashcards={flashcards}
        onAccept={handleAccept}
        onReject={handleReject}
        onEdit={handleEdit}
      />
    </div>
  );
}
