/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
};

let configOptions = {
  host: "smtp.example.com",
  port: 587,
  tls: {
    servername: "example.com",
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
