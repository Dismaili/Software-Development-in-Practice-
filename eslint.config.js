import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    rules: {
      "no-unused-vars": "off"
    },
    extends: ["js/recommended"], // Keep this if needed
  },
]);

