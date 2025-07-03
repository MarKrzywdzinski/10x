import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["src/db/database.types.ts"] },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintPluginAstro.parsers["astro"],
      parserOptions: { extraFileExtensions: [".astro"] },
    },
    plugins: { astro: eslintPluginAstro },
    ...eslintPluginAstro.configs["flat/recommended"][0],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}", "**/*.mdx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: "./tsconfig.json", ecmaVersion: 2020, sourceType: "module" },
    },
    ...eslint.configs.recommended,
    ...tseslint.configs.strict[0],
    ...tseslint.configs.stylistic[0],
    ...pluginReact.configs.flat.recommended,
    ...jsxA11y.flatConfigs.recommended,
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "react-compiler": reactCompiler,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      "no-console": "warn",
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react-compiler/react-compiler": "error",
    },
  },
  eslintPluginPrettier,
];
