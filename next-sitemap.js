const siteUrl = 'https://www.cigsmok.ru';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      {
        userAgent: '*',
        disallow: '/checkout',
      },
      {
        userAgent: '*',
        disallow: '/checkout/*',
      },

      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: ['/admin', '/admin/*', '/checkout', '/checkout/*'],
};
