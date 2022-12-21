const resolvers = {
  Query: {
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome()
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id)
    },
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id)
    }
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)
  
        return {
          code: 200,
          success: true,
          message: 'Update views for track ' + id,
          track
        }
      } catch (e) {
        return {
          track: null,
          success: false,
          code: e.extensions.response.status,
          message: e.extensions.response.body,
        }
      }
    }
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId)
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id)
    },
    createdAt: ({ createdAt }) => {
      return new Date(createdAt)
    }
  },
}

module.exports = resolvers
