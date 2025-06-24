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
    const { isServer } = options;
    const remoteIp = process.env.REMOTE_IP || 'localhost';
    const remotePort = process.env.REMOTE_PORT || '3003';
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          remote: `remote@http://${remoteIp}:${remotePort}/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        shared: {
          react: { singleton: true, requiredVersion: '18.2.0' },
          'react-dom': { singleton: true, requiredVersion: '18.2.0' },
        },
        extraOptions: {},
      })
    );

    return config;
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
