/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    env: {
        SOCKET_ENDPOINT: process.env.SOCKET_ENDPOINT,
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
