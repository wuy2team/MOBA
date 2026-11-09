import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Ranh giới giữa các lớp (xem docs/01-kien-truc-tong-the.md §1.2).
 * Import khác lớp PHẢI dùng alias "@/", nên chỉ cần chặn theo alias.
 * Lưu ý: trong flat config, các khối sau ghi đè hoàn toàn rule cùng tên,
 * vì vậy mỗi lớp khai báo đầy đủ danh sách bị cấm của mình.
 */
const layer = (...forbidden) =>
  forbidden.map((name) => ({
    group: [`@/${name}`, `@/${name}/**`],
    message: `Vi phạm ranh giới lớp: không được import "@/${name}" từ lớp này (docs/01 §1.2).`,
  }));

const banPackages = (...names) =>
  names.map((name) => ({
    name,
    message: `Lớp này không được phụ thuộc "${name}" (docs/01 §1.2).`,
  }));

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage', 'IMG', 'docs', 'public'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.strict],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      eqeqeq: ['error', 'always'],
    },
  },
  // ---------- shared: không phụ thuộc gì ----------
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser', 'react', 'react-dom', 'zustand'),
          patterns: layer('data', 'storage', 'game', 'bridge', 'state', 'ui', 'app'),
        },
      ],
    },
  },
  // ---------- data: chỉ shared ----------
  {
    files: ['src/data/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser', 'react', 'react-dom', 'zustand'),
          patterns: layer('storage', 'game', 'bridge', 'state', 'ui', 'app'),
        },
      ],
    },
  },
  // ---------- storage ----------
  {
    files: ['src/storage/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser', 'react', 'react-dom', 'zustand'),
          patterns: layer('game', 'bridge', 'state', 'ui', 'app'),
        },
      ],
    },
  },
  // ---------- game/sim: TypeScript thuần, tất định ----------
  {
    files: ['src/game/sim/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser', 'react', 'react-dom', 'zustand'),
          patterns: layer('game/phaser', 'bridge', 'state', 'ui', 'app', 'storage'),
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'setTimeout', message: 'Sim chỉ dùng SimClock.' },
        { name: 'setInterval', message: 'Sim chỉ dùng SimClock.' },
        { name: 'requestAnimationFrame', message: 'Sim không phụ thuộc vòng lặp trình duyệt.' },
        { name: 'Date', message: 'Sim chỉ dùng SimClock (tất định).' },
        { name: 'window', message: 'Sim phải chạy được trong Node.' },
        { name: 'document', message: 'Sim phải chạy được trong Node.' },
        { name: 'localStorage', message: 'Sim không lưu dữ liệu.' },
      ],
      'no-restricted-properties': [
        'error',
        { object: 'Math', property: 'random', message: 'Dùng Rng có seed để sim tất định.' },
        { object: 'performance', property: 'now', message: 'Dùng SimClock.' },
      ],
    },
  },
  // ---------- game/phaser: không biết React/Zustand ----------
  {
    files: ['src/game/phaser/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('react', 'react-dom', 'zustand'),
          patterns: layer('state', 'ui', 'app', 'storage'),
        },
      ],
    },
  },
  // ---------- state ----------
  {
    files: ['src/state/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser'),
          patterns: layer('game', 'ui', 'app'),
        },
      ],
    },
  },
  // ---------- ui & app: không chạm vào game ----------
  {
    files: ['src/ui/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: banPackages('phaser'),
          patterns: layer('game', 'storage'),
        },
      ],
    },
  },
  // ---------- test ----------
  {
    files: ['**/*.test.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-properties': 'off',
    },
  },
  // ---------- file cấu hình chạy trên Node ----------
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['scripts/**/*.mjs'],
    extends: [js.configs.recommended],
    rules: { 'no-console': 'off' },
  },
);
