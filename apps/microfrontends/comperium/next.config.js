//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Component1': './src/components/Component1.tsx',
          './Header': './src/components/production/header/Header.tsx',
          './HeroSection': './src/components/production/heroes/hero-section/HeroSection.tsx',
        },
        extraOptions: {},
      }),
    );
    config.resolve.alias['@tauro/shared/utils'] = path.resolve(
      __dirname,
      '../../../libs/shared-utils/src',
    );
    config.resolve.alias['@tauro/shared/types'] = path.resolve(
      __dirname,
      '../../../libs/shared-types/src',
    );
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
