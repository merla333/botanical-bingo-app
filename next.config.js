import nextPwa from 'next-pwa.js';

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
