module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    'object-curly-spacing': 'off',
    semi: ['off'],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'comma-dangle': 'off',
  },
}
