/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ваши текущие настройки здесь...

    async headers() {
        return [
            {
                source: '/api/local/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'http://localhost:3000',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig