import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'ais-dev-hb3ep6yvcseg463cydmoff-127551403733.europe-west1.run.app',
    'ais-pre-hb3ep6yvcseg463cydmoff-127551403733.europe-west1.run.app',
    '*.run.app'
  ],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {},
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
