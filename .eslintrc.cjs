module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  ignorePatterns: ['build', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    eqeqeq: 'error',
    'no-console': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*']
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js','.ts'],
        moduleDirectory: ['node_modules']
      }
    }
  },
}
