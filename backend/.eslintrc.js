const env = {
  commonjs: true,
  es6: true,
  node: true,
};

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  warnOnUnsupportedTypeScriptVersion: true,
  project: './tsconfig.json',
};

module.exports = {
  root: true,
  env,
  parserOptions: parserOptions,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'simple-import-sort',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts', '.json',],
      },
    },
    'import/extensions': ['.js', '.ts', '.d.ts', '.mjs'],
  },
  overrides: [
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'class-methods-use-this': ['off'],
    'max-classes-per-file': ['off'],
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-param-reassign': ['off'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-constructor': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        ts: 'never',
        'd.js': 'never',
      },
    ],

    'simple-import-sort/sort': 'error',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
