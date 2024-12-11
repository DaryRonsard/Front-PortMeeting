import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, //`true` si la redirection est permanente, sinon `false`
      },
    ]; 
  }, 
};

export default nextConfig;
