import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up compatibility for extending ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint configuration array with necessary extends
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Additional custom rule overrides
  {
    rules: {
      // Disable the 'no-explicit-any' rule for TypeScript
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
