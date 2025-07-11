import * as tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier/recommended";

/**
 * ESLint v9+ modular config for 10xCards
 * - Uses includeIgnoreFile for .gitignore
 * - Modular, maintainable, and future-proof
 */

export default [
  {
    // Use .gitignore for ignores (ESLint 9+)
    ignores: [],
    files: ["**/*"],
  },
  // TypeScript (strict + stylistic)
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  // React (recommended)
  {
    files: ["**/*.tsx"],
    plugins: {
      react,
    },
    ...react.configs.flat.recommended,
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  },
  // Accessibility (jsx-a11y)
  {
    files: ["**/*.tsx"],
    ...jsxA11y.flatConfigs.recommended,
  },
  // Astro
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    plugins: { astro },
    ...astro.configs["flat/recommended"][0],
    rules: {
      ...(astro.configs["flat/recommended"][0]?.rules || {}),
      "astro/no-set-html-directive": "error",
    },
  },
  // Prettier
  prettier,
];
