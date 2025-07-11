<<<<<<< HEAD
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
=======
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

const tsConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: {
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
      fetch: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      localStorage: 'readonly',
      sessionStorage: 'readonly',
      FormData: 'readonly',
      URLSearchParams: 'readonly',
      URL: 'readonly',
      crypto: 'readonly',
      performance: 'readonly',
      Response: 'readonly',
      Request: 'readonly',
      Headers: 'readonly',
      AbortController: 'readonly',
      AbortSignal: 'readonly',
      TextEncoder: 'readonly',
      TextDecoder: 'readonly',
      Buffer: 'readonly',
      process: 'readonly',
      __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs['recommended'].rules,
  },
};

const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    'react': reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
  },
};

const astroConfig = {
  files: ['**/*.astro'],
  languageOptions: {
    parser: astroParser,
    parserOptions: {
      parser: tsParser,
      extraFileExtensions: ['.astro'],
      sourceType: 'module',
    },
  },
  plugins: {
    'astro': astroPlugin,
  },
  rules: {
    ...astroPlugin.configs.recommended.rules,
  },
};

const ignorePatterns = [
  'dist/**/*',
  'node_modules/**/*',
  '.astro/**/*',
  'coverage/**/*',
  'build/**/*',
];

export default [
  {
    ignores: ignorePatterns,
  },
  js.configs.recommended,
  tsConfig,
  reactConfig,
  astroConfig,
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
];
