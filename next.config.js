/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["cloudflare-ipfs.com", "cdn.sanity.io"],
	},
	swcMinify: true,
};

module.exports = nextConfig;
