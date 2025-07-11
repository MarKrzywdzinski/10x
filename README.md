
# 10xCards projekt

10xCards to aplikacja webowa umożliwiająca automatyczne generowanie fiszek (flashcards) z tekstu użytkownika przy użyciu AI (LLM, OpenRouter). Pozwala na szybkie tworzenie, edycję i zarządzanie fiszkami, zarówno automatycznie, jak i manualnie. Projekt oparty jest o nowoczesny stack frontendowy (Astro, React, Tailwind, TypeScript) oraz backendowy (Supabase, API Astro).

---

## Spis treści
- [Opis](#opis)
- [Stack technologiczny](#stack-technologiczny)
- [Architektura i struktura katalogów](#architektura-i-struktura-katalogów)
- [API i funkcjonalności](#api-i-funkcjonalności)
- [Uruchomienie projektu](#uruchomienie-projektu)
- [Dostępne skrypty](#dostępne-skrypty)
- [Testy](#testy)
- [Licencja](#licencja)

---

## Opis

Aplikacja pozwala na:
- Automatyczne generowanie fiszek z tekstu (AI, LLM przez OpenRouter)
- Ręczne dodawanie, edycję i zarządzanie fiszkami
- Rejestrację, logowanie i zarządzanie kontem użytkownika (Supabase Auth)
- Przeglądanie własnych fiszek i historii generacji
- Bezpieczne API z walidacją (Zod)

---

## Stack technologiczny

**Frontend:**
- Astro 5 (SSG/SSR)
- React 19 (dynamiczne komponenty)
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui (React UI)

**Backend / API:**
- Astro Server Endpoints (API routes)
- Supabase (PostgreSQL, Auth)
- OpenRouter (LLM, generowanie fiszek)

**Narzędzia i konfiguracja:**
- ESLint, Prettier (jakość kodu)
- Vitest (testy jednostkowe)
- PostCSS
- Zod (walidacja)

**Deployment:**
- Cloudflare Pages (Astro)
- GitHub Actions (CI/CD)

---

## Architektura i struktura katalogów

```
src/
  layouts/         // Layouty Astro
  pages/           // Strony i API endpoints (np. /api/flashcards)
  middleware/      // Middleware Astro
  db/              // Klient Supabase, typy bazy
  components/      // Komponenty Astro i React
    ui/            // Komponenty shadcn/ui
  lib/             // Serwisy (AI, logika generowania, logger)
  styles/          // Style globalne
public/            // Publiczne zasoby statyczne
supabase/          // Konfiguracja i migracje bazy
```

---

## API i funkcjonalności

### Endpoints (Astro API)

- `POST /api/generations` – generowanie fiszek z tekstu (AI, OpenRouter)
- `POST /api/flashcards` – dodawanie fiszek (walidacja, powiązanie z generacją)
- `GET /api/my-flashcards` – pobieranie własnych fiszek
- `POST /api/auth/register` – rejestracja
- `POST /api/auth/login` – logowanie
- `POST /api/auth/logout` – wylogowanie
- `GET /api/auth/session` – status sesji

### Kluczowe modele i walidacja
- Fiszka: front, back, source (ai-full, ai-edited, manual), generation_id
- Generacja: source_text, hash, liczba wygenerowanych, czas trwania
- Walidacja wejścia: Zod (limity długości, typy, powiązania)

### Integracja AI
- OpenRouter (LLM, np. GPT-4o-mini)
- Konfigurowalny prompt systemowy
- Walidacja i obsługa błędów AI

---

## Uruchomienie projektu

1. **Klonowanie repozytorium:**
   ```sh
   git clone https://github.com/przeprogramowani/10x-cards.git
   cd 10x-cards
   ```
2. **Node.js:**
   Użyj wersji z `.nvmrc` (np. 22.14.0):
   ```sh
   nvm use
   ```
3. **Instalacja zależności:**
   ```sh
   npm install
   ```
4. **Konfiguracja środowiska:**
   Skopiuj `.env.example` do `.env` i uzupełnij klucze Supabase oraz OpenRouter.
5. **Uruchomienie dev servera:**
   ```sh
   npm run dev
   ```
   Aplikacja dostępna na [http://localhost:3000](http://localhost:3000)

---

## Dostępne skrypty

- `npm run dev` – uruchamia serwer developerski
- `npm run build` – buduje projekt produkcyjnie
- `npm run preview` – podgląd builda
- `npm run lint` – sprawdza błędy lintowania
- `npm run lint:fix` – automatycznie poprawia błędy lintowania
- `npm run format` – formatuje kod Prettierem

---

## Testy

**Jednostkowe i integracyjne:**
- Vitest
- @testing-library/react

**E2E:**
- Playwright

**Dodatkowo:**
- MSW (Mock Service Worker) – mockowanie API
- k6 – testy wydajności

---

## Licencja

MIT
