import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["src/db/database.types.ts"],
  },
  // Astro files: only Astro and Prettier plugins
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    ...eslintPluginAstro.configs["flat/recommended"][0],
    rules: {
      ...(eslintPluginAstro.configs["flat/recommended"][0]?.rules || {}),
    },
  },
  // React/TS/JS files: React, TS, Prettier, a11y, etc.
  {
    files: ["**/*.{js,jsx,ts,tsx}", "**/*.mdx"],
    ...eslint.configs.recommended,
    ...tseslint.configs.strict[0],
    ...tseslint.configs.stylistic[0],
    ...jsxA11y.flatConfigs.recommended,
    ...pluginReact.configs.flat.recommended,
    plugins: {
      // @ts-expect-error: plugin type workaround for ESM/flat config
      "react-hooks": eslintPluginReactHooks,
      // @ts-expect-error: plugin type workaround for ESM/flat config
      "react-compiler": reactCompiler,
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        window: true,
        document: true,
      },
    },
    settings: { react: { version: "detect" } },
    rules: {
      // @ts-expect-error: rule type workaround for ESM/flat config
      ...eslintPluginReactHooks.configs.recommended.rules,
      "no-console": "warn",
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react-compiler/react-compiler": "error",
    },
  },
  // Prettier for all files
  eslintPluginPrettier,
];
