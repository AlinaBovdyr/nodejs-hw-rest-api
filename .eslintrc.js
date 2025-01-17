module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/global': true,
  },
  extends: ['standard', 'plugin:json/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
  "no-invalid-regexp": ["error", { "allowConstructorFlags": ["s"] }],
}
