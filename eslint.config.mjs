import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import love from 'eslint-config-love';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...love,
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      ...(love.rules || {}),
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-magic-numbers': 'no'
    },
  },
  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
