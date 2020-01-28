const emoji = require("remark-emoji");

module.exports = {
  // pathPrefix: "/multi-geth-website",
  siteMetadata: {
    title: `Multi-Geth`,
    description: `Multi-geth is a geth client with multiple evm chain support`,
    logoUrl: `https://user-images.githubusercontent.com/10556209/73300896-69fa3200-41d7-11ea-8da1-0d5b62f18e82.png`,
    primaryColor: `#8B6A49`, //material-ui primary color
    secondaryColor: `#f50057`, //material-ui secondary colo
    author: ``,
    menuLinks: [
      {
        name: 'home',
        link: '/',
        ignoreNextPrev: true
      },
      {
        name: 'overview',
        link: '/overview'
      }
    ],
    footerLinks: [
      {
        name: 'Github',
        link: 'https://github.com/etclabscore/multi-geth'
      },
      {
        name: 'Website_Src',
        link: 'https://github.com/etclabscore/multi-geth-website'
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    }
  ],
}
