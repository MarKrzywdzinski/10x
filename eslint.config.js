import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import parser from "@typescript-eslint/parser";
import * as tseslint from "typescript-eslint";

// Ignore files here instead of .eslintignore (ESLint 9+)
const ignores = ["src/db/database.types.ts", "dist/**"];
export default [
  { ignores },
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    ...(eslintPluginAstro.parsers && eslintPluginAstro.parsers["astro"]
      ? {
          languageOptions: {
            parser: eslintPluginAstro.parsers["astro"],
            parserOptions: { extraFileExtensions: [".astro"] },
          },
        }
      : {}),
    ...eslintPluginAstro.configs["flat/recommended"][0],
    rules: {
      ...(eslintPluginAstro.configs["flat/recommended"][0]?.rules || {}),
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mdx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2020,
        sourceType: "module",
      },
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
