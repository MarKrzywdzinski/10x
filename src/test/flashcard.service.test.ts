import { describe, it, expect, vi } from "vitest";
import { FlashcardService, DatabaseError } from "../lib/flashcard.service";

describe("FlashcardService.validateGenerationIds", () => {
  it("should not throw if all generation IDs exist", async () => {
    const supabaseMock = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      in: vi.fn().mockResolvedValue({ count: 2 }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = new FlashcardService(supabaseMock as any);
<<<<<<< HEAD
    await expect(service.validateGenerationIds([1, 2])).resolves.toBeUndefined();
=======
    await expect(
      service.validateGenerationIds([1, 2]),
    ).resolves.toBeUndefined();
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
  });

  it("should return early if generationIds is empty", async () => {
    const supabaseMock = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      in: vi.fn().mockResolvedValue({ count: 2 }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = new FlashcardService(supabaseMock as any);
    await expect(service.validateGenerationIds([])).resolves.toBeUndefined();
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("should throw DatabaseError if not all generation IDs exist", async () => {
    const supabasePartialMock = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      in: vi.fn().mockResolvedValue({ count: 1 }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const service = new FlashcardService(supabasePartialMock as any);
<<<<<<< HEAD
    await expect(service.validateGenerationIds([1, 2])).rejects.toThrow(DatabaseError);
=======
    await expect(service.validateGenerationIds([1, 2])).rejects.toThrow(
      DatabaseError,
    );
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
  });
});
