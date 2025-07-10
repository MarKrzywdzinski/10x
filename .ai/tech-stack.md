# Tech Stack projektu 10xCards

## Frontend

- **Astro 5** — metaframework do aplikacji webowych
- **React 19** — interaktywne komponenty UI
- **TypeScript 5** — statyczne typowanie
- **Tailwind CSS 4** — utility-first CSS framework
- **Shadcn/ui** — biblioteka dostępnych komponentów React
- **@radix-ui/react-label, @radix-ui/react-slot** — bazowe dla Shadcn/ui
- **lucide-react** — ikony
- **sonner** — powiadomienia/toasty
- **next-themes** — obsługa motywów (dark/light)
- **class-variance-authority, clsx, tailwind-merge** — narzędzia do zarządzania klasami CSS
- **tw-animate-css** — animacje CSS

## Backend

- **Supabase (PostgreSQL, Auth)** — baza danych i autentykacja
- **@supabase/ssr** — integracja z Astro SSR
- **@supabase/supabase-js** — SDK do komunikacji z Supabase

## AI

- **OpenRouter.ai** — dostęp do wielu modeli AI (OpenAI, Anthropic, Google i inne)
- **Własne promptowanie** — system promptów do generowania fiszek

## Testowanie

- **Vitest** — framework do testów jednostkowych
- **Testing Library** — testowanie komponentów React
- **MSW** — mockowanie API w testach

## Dev/CI/CD/Tools

- **ESLint** — statyczna analiza kodu
- **Prettier** — formatowanie kodu
- **Husky, lint-staged** — pre-commit hooks
- **GitHub Actions** — automatyzacja CI/CD
- **Cloudflare Pages** — hosting i deployment
  - Automatyczny deployment z brancha main
  - Podgląd zmian dla pull requestów
  - Globalna sieć CDN
  - Integracja z GitHub Actions
- **Dependabot** — automatyczne aktualizacje zależności
