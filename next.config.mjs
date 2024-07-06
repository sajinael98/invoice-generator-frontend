/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/backend-api/:path*',
                destination: 'http://localhost:8080/api/v1/:path*' // Proxy to Backend
            }
        ]
    }
};

export default nextConfig;
