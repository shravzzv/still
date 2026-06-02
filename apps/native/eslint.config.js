const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const unicornPlugin = require('eslint-plugin-unicorn').default

module.exports = defineConfig([
  expoConfig,
  prettierRecommended,

  /**
   * GLOBAL RULES
   */
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      unicorn: unicornPlugin,
    },

    settings: {
      /**
       * lets eslint-plugin-import resolve @/ aliases
       * (plugin already provided by expo config)
       */
      'import/resolver': {
        typescript: true,
      },
    },

    ignores: ['dist/*', 'node_modules'],

    rules: {
      // kebab-case filenames
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],

      // prevent circular deps
      'import/no-cycle': 'error',
    },
  },

  /**
   * 🔒 lib + types rules
   */
  {
    files: ['lib/**/*.{ts,tsx}', 'types/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*', '@/components/*'],
        },
      ],
    },
  },

  /**
   * 🧩 components rules
   */
  {
    files: ['components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*'],
        },
      ],
      'import/no-default-export': 'error',
    },
  },

  /**
   * 📱 app rules
   */
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
])
