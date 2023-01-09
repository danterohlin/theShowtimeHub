/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	nextConfig,
	env: {
		apiKey: process.env.API_KEY,
	},
	serverRuntimeConfig: {
		apiKey: process.env.API_KEY,
	},
	publicRuntimeConfig: {
		apiKey: process.env.API_KEY,
	},
};
