module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-unused-vars": 0,
    "indent": ["error", 2],
    "linebreak-style": [1, "windows"],
    "quotes": [2, "double"],
    "semi": [2, "always"],
    "no-extra-parens": [2, "all"],
    "no-unreachable-loop": 2,
    "no-constant-condition": 0,
    "no-else-return": 2,
    "no-extra-bind": 2,
    "no-multi-spaces": 2,
    "no-useless-return": 2,
    "yoda": 2,
    "no-undef-init": 2,
    "prefer-const": 2,
    "prefer-template": 2,
    "prefer-arrow-callback": 2,
    "no-var": 2,
    "no-useless-constructor": 2,
    "spaced-comment": 2,
    "switch-colon-spacing": 2,
    "quote-props": [2, "consistent-as-needed"],
    "prefer-exponentiation-operator": 2,
    "no-unneeded-ternary": 2,
    "no-lonely-if": 2,
    "key-spacing": 2,
    "func-call-spacing": 2,
    "keyword-spacing": 2,
    "comma-dangle": 2,
    "brace-style": 2,
    "array-bracket-spacing": [2, "never", { objectsInArrays: false, arraysInArrays: false }],
    "camelcase": 2,
    "block-spacing": 2,
    "computed-property-spacing": 2,
    "dot-location": [2, "property"],
    "dot-notation": 2,
    "no-implicit-coercion": 2,
    "prefer-rest-params": 2,
    "space-before-function-paren": [2, "never"],
    "curly": [2, "multi-line"],
    "function-call-argument-newline": [2, "never"],
    "space-in-parens": 2,
    "space-before-blocks": 2,
    "no-trailing-spaces": 2,

    // typescript
    "no-shadow": 0,
    "@typescript-eslint/no-unused-vars": [2, { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-namespace": 0
  }
};
