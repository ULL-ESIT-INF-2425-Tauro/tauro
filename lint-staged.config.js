export default {
  'apps/microservices/auth/src/**/*.{js,ts,tsx}': [
    'bash -c "cd apps/microservices/auth && bun run lint" -- <file>',
    'bash -c "cd apps/microservices/auth && bun run format" -- <file>',
  ],
};