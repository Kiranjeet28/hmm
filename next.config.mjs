/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gpfwjammu.edu.in',
    },
    {
      hostname: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGG9H8zjyJ9osk_y-ZmIftkeK29w5X2NEZg&s',
    },
    ],
  },
};

export default nextConfig;
