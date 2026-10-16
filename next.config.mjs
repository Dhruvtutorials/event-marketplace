/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'via.placeholder.com'],
  },
};

export default nextConfig;
