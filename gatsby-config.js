const emoji = require("remark-emoji");

module.exports = {
  siteMetadata: {
    title: `Multi-Geth`,
    description: `Multi-geth is a geth client with multiple evm chain support`,
    logoUrl: `https://user-images.githubusercontent.com/10556209/73300896-69fa3200-41d7-11ea-8da1-0d5b62f18e82.png`,
    primaryColor: `#8B6A49`, //material-ui primary color
    secondaryColor: `#f50057`, //material-ui secondary colo
    author: ``,
    menuLinks: [
      {
        name: 'Home',
        link: '/',
        ignoreNextPrev: true
      },
      {
        name: 'Overview',
        link: '/overview'
      },
      {
        name: 'API Documentation',
        link: '/api-documentation'
      },
      {
        name: 'Assets',
        link: '/assets'
      }
    ],
    footerLinks: [
      {
        name: 'Github',
        link: 'https://github.com/etclabscore/multi-geth'
      }
    ]
  },
  plugins: [
    "@etclabscore/gatsby-theme-pristine",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `multi-geth-website`,
        short_name: `multi-geth-website`,
        start_url: `/`,
        background_color: `transparent`,
        theme_color: `#3f51b5`,
        display: `minimal-ui`,
        icon: `src/images/brand.png`, // This path is relative to the root of the site.
      },
    }
  ],
}