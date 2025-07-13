# 10xCards

## Project Description

10xCards is a web application designed for automatically generating flashcards using LLMs. It streamlines the process of creating high-quality flashcards from user-provided text, making learning more efficient and engaging. Users can generate flashcards automatically with AI or create and manage them manually.

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [API and Features](#api-and-features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)

## Tech Stack

**Frontend:**

- Astro 5
- React 19
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui

**Backend:**

- Supabase (PostgreSQL) for data storage and authentication
- AI integration via OpenRouter.ai API

**CI/CD / Deployment:**

- GitHub Actions for continuous integration and deployment
- DigitalOcean for hosting using Docker images

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
- OpenRouter (LLM, generowanie wszystkich fiszek)

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

### Key Models and Validation

- Flashcard: front, back, source (ai-full, ai-edited, manual), generation_id
- Generation: source_text, hash, number of generated cards, duration
- Input validation: Zod (length limits, types, relationships)

### AI Integration

- OpenRouter (LLM, e.g., GPT-4o-mini)
- Configurable system prompt
- AI error handling and validation

## Getting Started

1. **Clone the repository:**

   ```sh
   *clone this repository*
   ```

2. **Ensure you are using the correct Node version:**
   This project uses the Node version specified in the `.nvmrc` file. Currently it's **22.14.0**.

   ```sh
   nvm use
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build locally.
- **`npm run astro`**: Runs Astro CLI commands.
- **`npm run lint`**: Runs ESLint to check for linting issues.
- **`npm run lint:fix`**: Automatically fixes linting issues.
- **`npm run format`**: Formats the code using Prettier.

## Project Scope

The project aims to simplify flashcard creation by:

- Automatically generating flashcards using AI based on user-provided text.
- Allowing manual creation, editing, and management of flashcards.
- Supporting user account registration, login, and secure authentication using Supabase.
- Integrating with a spaced-repetition algorithm to optimize learning.
- Collecting usage statistics to assess the efficiency and quality of generated flashcards.

This MVP is designed to onboard 100 active users within the first three months and will evolve based on user feedback.

## Project Status

The project is currently in the MVP stage and under active development.

## License

This project is licensed under the MIT License.

## Testing Stack

### Unit and Integration Tests

- **Vitest** — fast runner compatible with Jest/Testing Library API
- **@testing-library/react** — declarative component tests (accessibility, behavior)

### End-to-End Tests (E2E)

- **Playwright** — cross-browser (Chromium, WebKit, Firefox), trace viewer, mobile emulation

Additional tools:

- **MSW (Mock Service Worker)** for mocking HTTP requests in tests
- **k6** for API performance testing

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

**Testy jednostkowe:**
- Vitest jako runner testów
- Aktualnie zaimplementowane testy:
  - `flashcard.service.test.ts` - testy logiki generowania fiszek
  - `setup.ts` - konfiguracja środowiska testowego

---

## Licencja

MIT
