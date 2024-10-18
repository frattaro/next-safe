import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginSecurity from "eslint-plugin-security";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/", "eslint.config.mjs", ".prettierrc.js", "coverage/"]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSecurity.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-debugger": "error",
      "security/detect-object-injection": "off"
    }
  }
);
