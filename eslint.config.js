



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
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  jsxA11y.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintPluginPrettier,
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
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
      ...eslintPluginReactHooks.configs.recommended.rules,
      "no-console": "warn",
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react-compiler/react-compiler": "error",
    },
  },
];
