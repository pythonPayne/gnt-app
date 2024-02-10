module.exports = {
  siteMetadata: {
    title: `GNT`,
    description: `An easy to use interlinear Greek New Testament, with details on each Greek word used.`,
    keywords: `Greek, New Testament, interlinear, Bible, lexicon`,
    siteUrl: `https://greeknt.netlify.app/`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `files`,
        path: `${__dirname}/src/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "gnt",
        fieldName: "gnt",
        url: "http://127.0.0.1:5000/graphql/",
      },
    },
  ],
}
