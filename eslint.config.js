import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import pluginJest from "eslint-plugin-jest";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: ["plugin:jest/recommended", "js/recommended"],
  },
  {
    files: ["**/*.test.js"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: globals.jest,
    },
    rules: pluginJest.configs.recommended.rules,
  },
]);
