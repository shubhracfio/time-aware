/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		instrumentationHook: true,
		serverComponentsExternalPackages: ['sequelize'],
		serverActions:{
			allowedOrigins: ['http://localhost']
		}
	},
	// async headers() {
  //   return [
  //     {
  //       source: '/*',
  //       headers: [
  //         { key: 'X-Forwarded-Host', value: process.env.NEXT_PUBLIC_HOST },
  //         { key: 'Origin', value: process.env.NEXT_PUBLIC_ORIGIN },
  //       ],
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       // source: '/blog/:slug*',
  //       source: '/:path*',
  //       headers: [
  //         { key: 'X-Forwarded-Host', value: process.env.NEXT_PUBLIC_HOST },
  //         { key: 'Origin', value: process.env.NEXT_PUBLIC_ORIGIN },
  //       ],
  //     },
  //   ]
  // },
};

export default nextConfig;
