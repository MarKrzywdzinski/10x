# Tech Stack - 10xCards Project

## Frontend

- **Astro 5** — web application metaframework
- **React 19** — interactive UI components
- **TypeScript 5** — static typing
- **Tailwind CSS 4** — utility-first CSS framework
- **Shadcn/ui** — accessible React components library
- **@radix-ui/react-label, @radix-ui/react-slot** — base for Shadcn/ui
- **lucide-react** — icons
- **sonner** — toast notifications
- **next-themes** — theme handling (dark/light)
- **class-variance-authority, clsx, tailwind-merge** — CSS class management tools
- **tw-animate-css** — CSS animations

## Backend

- **Supabase (PostgreSQL, Auth)** — database and authentication
- **@supabase/ssr** — Astro SSR integration
- **@supabase/supabase-js** — Supabase SDK

## AI

- **OpenRouter.ai** — access to multiple AI models (OpenAI, Anthropic, Google, etc.)
- **Custom prompting** — system prompts for flashcard generation

## Testing

- **Vitest** — unit testing framework
- **Testing Library** — React component testing
- **MSW** — API mocking in tests
- **Playwright** — end-to-end testing

## Dev/CI/CD/Tools

- **ESLint** — static code analysis
- **Prettier** — code formatting
- **Husky, lint-staged** — pre-commit hooks
- **GitHub Actions** — CI/CD automation
- **DigitalOcean** — hosting and deployment
  - Docker container deployment
  - GitHub Actions integration
  - Automated deployments from main branch
  - Preview environments for pull requests
- **Dependabot** — automated dependency updates
