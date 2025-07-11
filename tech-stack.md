# Tech Stack for 10xCards

10xCards is a web application for automatic flashcard generation using AI. Below is the current technology stack used in the project.

## Frontend
- **Astro 5** – Static site generator and frontend framework
- **TypeScript 5** – Type-safe JavaScript
- **React 19** – UI library for dynamic components
- **Tailwind CSS 4** – Utility-first CSS framework
- **Shadcn/ui** – Component library for React

## Backend / API
- **Astro Server Endpoints** – API routes
- **Supabase** – Database and authentication (PostgreSQL)

## Tooling & Configuration
- **ESLint** – Linting and code quality
- **Vitest** – Testing framework
- **PostCSS** – CSS processing
- **Zod** – Input validation
- **Astro Image** – Image optimization

## Project Structure
- `src/` – Source code
- `src/layouts/` – Astro layouts
- `src/pages/` – Astro pages
- `src/pages/api/` – API endpoints
- `src/middleware/index.ts` – Astro middleware
- `src/db/` – Supabase clients and types
- `src/components/` – Client-side components (Astro & React)
- `src/components/ui/` – Shadcn/ui components
- `src/assets/` – Static internal assets
- `public/` – Public assets

## Notable Libraries
- **zod** – Schema validation
- **@supabase/supabase-js** – Supabase client
- **react** – React library
- **@shadcn/ui** – UI components
- **tailwindcss** – CSS framework

## Deployment
- Compatible with modern static hosting and serverless platforms.

---

_Last updated: July 11, 2025_
