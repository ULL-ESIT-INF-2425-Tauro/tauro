//@ts-check
const { composePlugins, withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
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
        },
        shared: {
          react: { singleton: true, requiredVersion: '18.2.0' },
          'react-dom': { singleton: true, requiredVersion: '18.2.0' },
        },
        extraOptions: {},
      }),
    );

    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
