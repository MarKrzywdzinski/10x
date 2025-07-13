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

**Jednostkowe:**

- Vitest (patrz: `src/test/flashcard.service.test.ts`)
- Minimalny zakres, brak testów E2E

- Astro 5 (SSG/SSR)
- React 19 (dynamiczne komponenty)
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui (React UI)

```
**Backend / API:**

- Astro Server Endpoints (API routes)
- Supabase (PostgreSQL, Auth)
- OpenRouter (LLM, generowanie wszystkich fiszek)

**Narzędzia i konfiguracja:**

- ESLint, Prettier (jakość kodu)
- Vitest (testy jednostkowe)
- Zod (walidacja)

**Deployment:**

- Cloudflare Pages (Astro)
- GitHub Actions (CI/CD)

---

## Architektura i struktura katalogów

```

src/
layouts/ // Layouty Astro
pages/ // Strony i API endpoints (np. /api/flashcards)
middleware/ // Middleware Astro
db/ // Klient Supabase, typy bazy
components/ // Komponenty Astro i React
ui/ // Komponenty shadcn/ui
lib/ // Serwisy (AI, logika generowania, logger)
styles/ // Style globalne
public/ // Publiczne zasoby statyczne
supabase/ // Konfiguracja i migracje bazy

````

---

## API i funkcjonalności


### Endpoints (Astro API)
- `POST /api/generations` – generowanie fiszek z tekstu (AI przez OpenRouter, walidacja Zod)
- `POST /api/flashcards` – dodawanie fiszek (walidacja Zod, powiązanie z generacją)
- `GET /api/my-flashcards` – pobieranie własnych fiszek
- `POST /api/auth/register` – rejestracja użytkownika
- `POST /api/auth/login` – logowanie
- `POST /api/auth/logout` – wylogowanie
- `GET /api/auth/session` – status sesji


### Key Models and Validation
- **Flashcard:**
  - `front`: awers fiszki (string, max 200 znaków)
  - `back`: rewers fiszki (string, max 500 znaków)
  - `source`: `ai-full`, `ai-edited`, `manual`
  - `generation_id`: powiązanie z generacją
- **Generation:**
  - `source_text`: tekst wejściowy
  - `hash`: hash tekstu
  - `number of generated cards`: liczba wygenerowanych fiszek
  - `duration`: czas generowania
- **Walidacja:**
  - Zod (limity długości, typy, relacje)


### AI Integration
- OpenRouter (LLM, np. GPT-4o-mini)
- Konfigurowalny system prompt
- Obsługa i walidacja błędów AI


## Getting Started

1. **Klonowanie repozytorium:**
   ```sh
   git clone https://github.com/MarKrzywdzinski/10x.git
   cd 10x
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


## Available Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – check code with ESLint
- `npm run lint:fix` – auto-fix lint issues
- `npm run format` – format code with Prettier


## Project Scope

- Automatically generate flashcards from user-provided text (AI)
- Manual flashcard management (CRUD)
- User registration, login, authentication (Supabase)
- Secure API with validation (Zod)

This MVP is designed to onboard 100 active users within the first three months and will evolve based on user feedback.


## Testing

**Unit tests:**
- Vitest (see `src/test/flashcard.service.test.ts`)

---


## License

MIT
````
