const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Tracks for homepage grid"
    tracksForHome: [Track!]!
    "Retrieve a track based on it's id"
    track(id: ID!): Track
    "Retrieve a module based on it's id"
    module(id: ID!): Module
  }

  type Mutation {
    "Increment track views when clicking on a track Card"
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }

  "Response for incrementTrackViews Mutation"
  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Human-readable message for the UI"
    message: String!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Newly updated track after a successful mutation"
    track: Track
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The title of the track"
    title: String!
    "The track's Author"
    author: Author!
    "Image representing the Track"
    thumbnail: String
    "Approximate total time of the Track's modules in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The number of modules in the Track"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
    "Track created Unix time "
    createdAt: String
    "The track's full duration, in seconds"
    durationInSeconds: Int!
  }

  "Author of a complete track or module"
  type Author {
    id: ID!

    "Full name of the Author"
    name: String!
    "Author avatar image"
    photo: String
  }

  "A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The Module's title"
    title: String
    "The Module's length in seconds"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "Content of the module"
    content: String
    "Module video resource"
    videoUrl: String!
    "The module's video duration, in seconds"
    durationInSeconds: Int!
  }
`

module.exports = typeDefs
