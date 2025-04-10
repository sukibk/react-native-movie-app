import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { files: ["app/**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["app/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.browser },
    },
  },
  {
    files: ["app/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
