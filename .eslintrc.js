module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true, // Если ваш проект также запускается в среде Node.js, добавьте это
  },
  extends: [
    "eslint:recommended", // Базовый набор правил ESLint
    "plugin:@typescript-eslint/eslint-recommended", // Отключает правила из eslint:recommended, которые не применимы к TypeScript
    "plugin:@typescript-eslint/recommended", // Добавляет рекомендуемые правила для TypeScript
    "plugin:react/recommended", // Добавляет рекомендуемые правила для React
    "plugin:react-hooks/recommended", // Добавляет правила для хуков React
  ],
  parser: "@typescript-eslint/parser", // Указывает ESLint использовать парсер для TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Разрешает разбор JSX
    },
    ecmaVersion: 12, // Позволяет использовать последние возможности ECMAScript
    sourceType: "module", // Позволяет использование модулей ES6
  },
  plugins: [
    "react",
    "@typescript-eslint", // Добавляет плагины ESLint для TypeScript
    "react-hooks", // Добавляет плагин для правил хуков React
  ],
  rules: {
    // Здесь вы можете добавить или переопределить правила
    "react/react-in-jsx-scope": "off", // Не требуется с React 17+
    "@typescript-eslint/explicit-function-return-type": "off", // Отключает требование явного указания типа возвращаемого значения функцией
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Игнорирует неиспользованные переменные, начинающиеся с _
    "react/prop-types": "off", // Отключает правила prop-types, так как TypeScript обеспечивает проверку типов
  },
  settings: {
    react: {
      version: "detect", // Автоматически обнаруживает версию React для использования правильных правил
    },
  },
};
