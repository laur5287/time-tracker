/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.googleusercontent.com'
			}
		]
	}
}

module.exports = nextConfig
// https://lh3.googleusercontent.com/a/ACg8ocI8CdjLem12OzhuAOSRGgXYIYnjUKB16vUJC-XEmNTL5EM=s96-c
