import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'vendor'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // FR-008 is absolute: no persistence, no network, no timers that fake a feed.
      'no-restricted-globals': [
        'error',
        { name: 'localStorage', message: 'FR-008: no persistence of any kind.' },
        { name: 'sessionStorage', message: 'FR-008: no persistence of any kind.' },
        { name: 'indexedDB', message: 'FR-008: no persistence of any kind.' },
        { name: 'fetch', message: 'No network requests at runtime.' },
      ],
      'no-restricted-properties': [
        'error',
        { object: 'window', property: 'localStorage', message: 'FR-008: no persistence of any kind.' },
        { object: 'window', property: 'sessionStorage', message: 'FR-008: no persistence of any kind.' },
        { object: 'window', property: 'indexedDB', message: 'FR-008: no persistence of any kind.' },
        { object: 'document', property: 'cookie', message: 'FR-008: no persistence of any kind.' },
      ],
    },
  },
  {
    files: ['eslint.config.js', 'vite.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
);
