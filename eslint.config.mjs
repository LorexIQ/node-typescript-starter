import antfu from '@antfu/eslint-config';

export default antfu(
  {
    typescript: true,

    stylistic: {
      indent: 2,
      semi: true
    },

    rules: {
      'perfectionist/sort-imports': 'off',
      'ts/no-use-before-define': 'off',
      'ts/no-unused-expressions': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/no-require-imports': 'off',
      'eqeqeq': 'off',
      'import/first': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'antfu/if-newline': 'off',
      'no-async-promise-executor': 'off',
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/throw-new-error': 'off',
      'style/no-extra-boolean-cast': 'off',
      'style/quotes': ['error', 'single'],
      'style/comma-dangle': ['error', 'never'],
      'style/semi': ['error', 'always'],
      'style/template-curly-spacing': ['error', 'never'],
      'style/brace-style': ['error', '1tbs'],
      'style/object-curly-spacing': ['error', 'always', {
        arraysInObjects: true,
        objectsInObjects: true
      }],
      'style/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            }
          }
        }
      }]
    },

    ignores: [
      '**/tsconfig.json'
    ]
  },
  {
    files: ['**/*.ts'],

    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-useless-constructor': 'off'
    }
  }
);
