module.exports = {  
    plugins: [    
      'gatsby-plugin-postcss',
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
          url: "http://0.0.0.0:5000/graphql/",                 
        },
      },    
    ],
  }
  