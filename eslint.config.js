import tseslint from "typescript-eslint";
import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxa11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.astro/**",
      "**/dist/**",
      "**/coverage/**",
      "**/build/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxa11y,
      prettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",
      "react/prop-types": "off",
      "jsx-a11y/no-autofocus": "warn",
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxa11y.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    plugins: { astro },
    rules: {
      ...astro.configs.recommended.rules,
    },
  },
];
