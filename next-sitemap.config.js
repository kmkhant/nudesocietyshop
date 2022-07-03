/** @type { import('next-sitemap').IConfig} */
const config = {
	siteUrl:
		process.env.SITE_URL ||
		"https://nudesocietyshop.vercel.app",
	generateRobotsTxt: true,
	changefreq: "daily",
	priority: 0.7,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: ["/", "/shop", "/products/*"],
			},
		],
	},
};
