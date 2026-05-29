import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

const tsRecommendedRules = tsPlugin.configs.recommended.rules;

export default [
  {
    ignores: ['**/coverage/**', '**/dist/**', '**/node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['apps/api/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.jest,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsRecommendedRules
    }
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin
    },
    rules: {
      ...tsRecommendedRules,
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
