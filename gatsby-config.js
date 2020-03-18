const emoji = require("remark-emoji");

module.exports = {
  siteMetadata: {
    title: `Core-Geth`,
    description: `Core-geth is a distribution of go-etheruem with many flavors.`,
    logoUrl: `https://user-images.githubusercontent.com/10556209/75510635-429eac80-59b1-11ea-8d58-ad79452bef0e.png`,
    primaryColor: `#651fff`, //material-ui primary color
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
        name: 'Install',
        link: '/install'
      },
      {
        name: 'API Documentation',
        link: '/api-documentation'
      }
    ],
    footerLinks: [
      {
        name: 'Github',
        link: 'https://github.com/etclabscore/core-geth'
      },
      {
        name: 'Chat on Gitter',
        link: 'https://gitter.im/core-geth/community'
      }
    ]
  },
  plugins: [
    "@etclabscore/gatsby-theme-pristine",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `core-geth-website`,
        short_name: `core-geth-website`,
        start_url: `/`,
        background_color: `transparent`,
        theme_color: `#651fff`,
        display: `minimal-ui`,
        icon: `src/images/brand.png`, // This path is relative to the root of the site.
      },
    }
  ],
}
