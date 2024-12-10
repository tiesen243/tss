import eslint from '@eslint/js'
import routerPlugin from '@tanstack/eslint-plugin-router'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import refreshPlugin from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

const baseConfig = tseslint.config(
  { ignores: ['**/*.config.*'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/require-await': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
)

/** @type {Awaited<import('typescript-eslint').Config>} */
const reactConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-refresh': refreshPlugin,
      '@tanstack/router': routerPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      '@tanstack/router/create-route-property-order': 'error',
    },
    languageOptions: { globals: { React: 'writable' } },
  },
]

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist'],
  },
  ...baseConfig,
  ...reactConfig,
]
