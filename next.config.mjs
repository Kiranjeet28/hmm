/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;
