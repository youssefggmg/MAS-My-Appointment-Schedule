/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone'
}

module.exports = nextConfig

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com','randomuser.me'], 
    },
};