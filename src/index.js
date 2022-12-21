const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const TrackAPI = require('./datasources/track-api')

// const mocks = {
//   Query: () => ({
//     tracksForHome: () => [...Array(6)],
//   }),
//   Track: () => ({
//     id: () => 'track_01',
//     title: () => 'Astro Kitty, Space Explorer',
//     author: () => ({
//       name: 'Grumpy Cat',
//       photo: 'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg'
//     }),
//     thumbnail: () => 'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
//     length: 600,
//     modulesCount: 10,
//   })
// }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    }
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ port, url }) => {
  console.log(`
    🚀 Server is running!
    🔉 Listen on port ${port}
    📭 Query at ${url}
  `)
})
