<<<<<<< HEAD
Frontend - Astro z React dla komponentów interaktywnych:

- Astro 5 pozwala na tworzenie szybkich, wydajnych stron i aplikacji z minimalną ilością JavaScript
- React 19 zapewni interaktywność tam, gdzie jest potrzebna
- TypeScript 5 dla statycznego typowania kodu i lepszego wsparcia IDE
- Tailwind 4 pozwala na wygodne stylowanie aplikacji
- Shadcn/ui zapewnia bibliotekę dostępnych komponentów React, na których oprzemy UI

Backend - Supabase jako kompleksowe rozwiązanie backendowe:

- Zapewnia bazę danych PostgreSQL
- Zapewnia SDK w wielu językach, które posłużą jako Backend-as-a-Service
- Jest rozwiązaniem open source, które można hostować lokalnie lub na własnym serwerze
- Posiada wbudowaną autentykację użytkowników

AI - Komunikacja z modelami przez usługę Openrouter.ai:

- Dostęp do szerokiej gamy modeli (OpenAI, Anthropic, Google i wiele innych), które pozwolą nam znaleźć rozwiązanie zapewniające wysoką efektywność i niskie koszta
- Pozwala na ustawianie limitów finansowych na klucze API

Testowanie:

1. **Vitest** — runner testów jednostkowych/integracyjnych (kompatybilny z Vite, szybkie uruchamianie)
2. **@testing-library/react** — testy UI skupione na zachowaniu użytkownika
3. **Playwright** — end-to-end cross-browser, trace viewer, API testing

CI/CD i Hosting:

- Github Actions do tworzenia pipeline'ów CI/CD
- DigitalOcean do hostowania aplikacji za pośrednictwem obrazu docker
=======
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
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
