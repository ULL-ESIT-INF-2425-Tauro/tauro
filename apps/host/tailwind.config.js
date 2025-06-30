const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
