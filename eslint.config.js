import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import htmlPlugin from "eslint-plugin-html";
import cssModulesPlugin from "eslint-plugin-css-modules";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      html: htmlPlugin,
      "css-modules": cssModulesPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Enable Prettier as an ESLint rule
      "css-modules/no-unused-class": "warn",
      "css-modules/no-undef-class": "error",
    },
  },
  {
    files: ["*.html"],
    processor: "html/html",
  },
  {
    files: ["*.css"],
    rules: {},
  },
];
