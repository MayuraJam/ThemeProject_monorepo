import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  output: 'standalone',
  images: {
    domains: ['i.pravatar.cc',
       'images.unsplash.com', 
       'lftz25oez4aqbxpq.public.blob.vercel-storage.com','www.thiings.co'],
  },
};

export default nextConfig;
