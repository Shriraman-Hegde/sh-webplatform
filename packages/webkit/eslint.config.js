import litPlugin from "eslint-plugin-lit";
import wcPlugin from "eslint-plugin-wc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** Flat ESLint config using open-wc Lit / Web Components plugins. */
export default [
  {
    ignores: [
      "dist/**",
      "tsc-out/**",
      "storybook-static/**",
      "node_modules/**",
    ],
  },
  {
    files: ["src/**/*.{ts,js}", "test/**/*.{ts,js}", "stories/**/*.{ts,js}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      lit: litPlugin,
      wc: wcPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "wc/no-invalid-element-name": "error",
      "lit/no-invalid-html": "error",
      "lit/no-legacy-template-syntax": "error",
      "lit/binding-positions": "error",
      "lit/no-property-change-update": "error",
      "lit/no-useless-template-literals": "warn",
    },
    settings: {
      wc: {
        elementBaseClasses: ["LitElement"],
      },
    },
  },
];
