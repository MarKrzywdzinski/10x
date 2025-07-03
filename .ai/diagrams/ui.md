<architecture_analysis>

1. Komponenty zdefiniowane w specyfikacji oraz kodzie:
   • Strony Astro: `index.astro`, `generate.astro`, `login.astro`, `register.astro`, `reset-password.astro`, `reset-password/[token].astro`, `my-cards.astro`
   • Layout: `layouts/Layout.astro`
   • Middleware: `middleware/index.ts`
   • React (islands): `LoginForm.tsx`, `RegisterForm.tsx`, `ResetPasswordRequestForm.tsx`, `ResetPasswordConfirmForm.tsx`, `AuthProvider.tsx`, `ProtectedRoute.tsx`
   • Istniejące komponenty domenowe: `FlashcardGenerationView.tsx`, `FlashcardList.tsx`, `FlashcardListItem.tsx`, `GenerateButton.tsx`, `BulkSaveButton.tsx`, `ErrorNotification.tsx`
   • API (server): `api/auth/logout.ts`, `api/auth/user.ts`, `api/account/delete.ts`
   • Supabase warstwa: `db/supabase.client.ts` + tabele `auth.users`, `flashcards`, `generations` (z RLS)

2. Główne strony ↔ komponenty
   • `/login.astro` → `LoginForm` (React)
   • `/register.astro` → `RegisterForm`
   • `/reset-password.astro` → `ResetPasswordRequestForm`
   • `/reset-password/[token].astro` → `ResetPasswordConfirmForm`
   • `/generate.astro` → `FlashcardGenerationView`, `GenerateButton`, `ErrorNotification` (wymaga aktywnej sesji)
   • `/my-cards.astro` → `FlashcardList`, `BulkSaveButton`

3. Przepływ danych (happy-path):
   a. Użytkownik wchodzi na stronę publiczną → Layout ładuje się bez stanu auth.
   b. Formularz (React island) wywołuje Supabase Auth (`signIn`, `signUp`, `resetPasswordForEmail`, `updateUser`).
   c. Supabase ustawia HTTP-only cookie i zwraca `session`.
   d. `AuthProvider` (mount w Layout) pobiera `session` (fetch `/api/auth/user`) i udostępnia kontekst React.
   e. Middleware (`src/middleware/index.ts`) chroni trasy `/generate`, `/my-cards` – brak sesji ⇒ redirect `/login`.
   f. Zalogowany użytkownik korzysta z chronionych stron; przy wylogowaniu `Layout` wywołuje `/api/auth/logout` → Supabase `signOut()` → cookie cleared → redirect.
   g. Usunięcie konta (`POST /api/account/delete`) wywoływane z widoku "Profil" lub analogicznego (nieujęte w PRD, ale wymagane przez US-009).

4. Opisy komponentów (skrótowo)
   • LoginForm / RegisterForm – walidacja danych, obsługa błędów, integracja z Supabase Auth.
   • ResetPassword\* – przepływ "zapomniałem hasła".
   • AuthProvider – globalny kontekst użytkownika (React), exposes `signOut`.
   • ProtectedRoute – opcjonalny wrapper React (np. przyprowadzaniu dynamicznych widoków).
   • Layout.astro – wspólna nawigacja, reaguje na `auth` bool i dane użytk.
   • Middleware – SSR guard; centralny punkt egzekwowania ochrony zasobów.

</architecture_analysis>

<mermaid_diagram>

```mermaid
flowchart TD
  %% ==== Public Pages ====
  subgraph "Public Routes"
    LoginPage["/login.astro"]
    RegisterPage["/register.astro"]
    ResetReqPage["/reset-password.astro"]
    ResetConfirmPage["/reset-password/[token].astro"]
  end

  %% ==== Protected Pages ====
  subgraph "Protected Routes"
    GeneratePage["/generate.astro"]
    MyCardsPage["/my-cards.astro"]
  end

  %% ==== Layout & Middleware ====
  subgraph "Infra"
    Layout["Layout.astro"]
    Middleware["middleware/index.ts"]
  end

  %% ==== React Islands ====
  subgraph "React Islands - Formularze"
    LoginFormComp["LoginForm.tsx"]
    RegisterFormComp["RegisterForm.tsx"]
    ResetReqFormComp["ResetPasswordRequestForm.tsx"]
    ResetConfirmFormComp["ResetPasswordConfirmForm.tsx"]
  end

  %% ==== Provider ====
  subgraph "Stan & Sesja"
    AuthProviderComp["AuthProvider.tsx"]
  end

  %% ==== Server API ====
  subgraph "API (server)"
    LogoutAPI["POST /api/auth/logout"]
    UserAPI["GET /api/auth/user"]
    DeleteAccAPI["POST /api/account/delete"]
  end

  %% ==== Supabase ====
  subgraph "Supabase"
    SupabaseAuth(("Supabase Auth"))
    SupabaseDB[["Postgres + RLS"]]
  end

  %% === Page → Component relations ===
  LoginPage --> LoginFormComp
  RegisterPage --> RegisterFormComp
  ResetReqPage --> ResetReqFormComp
  ResetConfirmPage --> ResetConfirmFormComp

  %% === Form → Supabase ====
  LoginFormComp -->|"signIn"| SupabaseAuth
  RegisterFormComp -->|"signUp"| SupabaseAuth
  ResetReqFormComp -->|"resetPasswordForEmail"| SupabaseAuth
  ResetConfirmFormComp -->|"updatePassword"| SupabaseAuth

  %% === Supabase → Session ===
  SupabaseAuth -->|"cookie session"| AuthProviderComp
  AuthProviderComp -.->|"fetch"| UserAPI

  %% === Provider → Protected Pages ===
  AuthProviderComp --> GeneratePage
  AuthProviderComp --> MyCardsPage

  %% === Layout & Middleware interactions ===
  Layout --- LoginPage
  Layout --- RegisterPage
  Layout --- ResetReqPage
  Layout --- ResetConfirmPage
  Layout --- GeneratePage
  Layout --- MyCardsPage

  Middleware --> GeneratePage
  Middleware --> MyCardsPage
  Middleware -.->|"redirect unauth"| LoginPage

  %% === Logout & Delete ===
  Layout -->|"Wyloguj"| LogoutAPI --> SupabaseAuth
  MyCardsPage -.->|"Usuń konto"| DeleteAccAPI --> SupabaseAuth

  %% === DB flow ===
  SupabaseAuth --> SupabaseDB
  DeleteAccAPI --> SupabaseDB
```

</mermaid_diagram>
