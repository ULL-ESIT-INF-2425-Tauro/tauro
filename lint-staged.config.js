export default {
  'apps/microservices/auth/src/**/*.{js,ts,tsx}': [
    'bash -c "cd apps/microservices/auth && bun run lint" -- <file>',
    'bash -c "cd apps/microservices/auth && bun run format" -- <file>',
  ],
  'apps/microservices/products/**/*.go': [
    'bash -c "cd apps/microservices/products && make linter" -- <file>',
    'bash -c "cd apps/microservices/products && make format" -- <file>',
  ],
  'apps/host/src/**/*.{js,ts,tsx}': [
    'bash -c "cd apps/host && bun run lint" -- <file>',
    'bash -c "cd apps/host && bun run format" -- <file>',
  ],
  'apps/microfrontends/comperium/src/**/*.{js,ts,tsx}': [
    'bash -c "cd apps/microfrontends/comperium && pnpm run lint" -- <file>',
    'bash -c "cd apps/microfrontends/comperium && pnpm run format" -- <file>',
  ],
  'apps/microfrontends/propsync/src/**/*.{js,ts,tsx}': [
    'bash -c "cd apps/microfrontends/propsync && pnpm run format" -- <file>',
  ],
};