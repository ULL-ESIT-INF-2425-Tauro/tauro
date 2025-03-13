export default {
  'apps/microservices/products/**/*.go': [
    'bash -c "cd apps/microservices/products && make linter" -- <file>',
    'bash -c "cd apps/microservices/products && make format" -- <file>',
  ],
};