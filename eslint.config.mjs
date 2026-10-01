import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysShorthand from "eslint-plugin-sort-keys-shorthand";
import unusedImports from "eslint-plugin-unused-imports";

// .eslintrc.json から移した。ESLint 10 で動かない、または 2023 年以降更新の
// 止まったプラグイン（css-modules・filenames・typescript-sort-keys・
// eslint-config-google）は外し、型のキーの並びは perfectionist で見る
const config = [
  {
    ignores: [".next/**", "node_modules/**", "**/*.d.ts", "**/*.js"],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    plugins: {
      perfectionist,
      "sort-destructure-keys": sortDestructureKeys,
      "sort-keys-shorthand": sortKeysShorthand,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          // baseUrl からの components/ や libs/ も npm のパッケージと一緒に
          // アルファベット順に並べる（.eslintrc.json のときの並び）
          groups: [
            ["builtin", "external", "internal", "unknown"],
            "parent",
            "sibling",
            "index",
          ],
          warnOnUnassignedImports: true,
        },
      ],
      "import/prefer-default-export": "error",
      "newline-before-return": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "break",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        { blankLine: "never", next: "import", prev: "*" },
        { blankLine: "never", next: "case", prev: "case" },
        { blankLine: "never", next: "const", prev: "const" },
        { blankLine: "never", next: "let", prev: "let" },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        { ignoreCase: false, type: "natural" },
      ],
      "perfectionist/sort-object-types": [
        "error",
        { ignoreCase: false, type: "natural" },
      ],
      "react-hooks/exhaustive-deps": [
        "error",
        { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
      ],
      "react/jsx-sort-props": "error",
      semi: "error",
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-keys": "off",
      "sort-keys-shorthand/sort-keys-shorthand": [
        "error",
        "asc",
        { shorthand: "first" },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
