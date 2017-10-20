module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    browser: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: [
    "prettier",
    "react"
  ],
  rules: {
    "prettier/prettier": ["error", {
      trailingComma: "es5",
      semi: false,
      singleQuote: true,
    }],
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": "error",
    semi: [1, 'never']
  },
};
