const { AuthenticationError } = require("apollo-server-express");

const {
  User,
  Artist,
  Song,
  SongComment,
  Annotation,
  AnnotationComment,
} = require("./models");

const resolvers = {
  Query: {
    getUsers: async (_, __, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      await User.find({}).exec();
    },
    getArtist: async (_, { input }) => await Artist.findOne(input).exec(),
    getArtists: async () => await Artist.find(input).exec(),
    getSong: async (_, { _id }) => await Song.findOne({ _id: _id }).exec(),
    getSongsByDate: async (_, __) =>
      await Song.find({}).sort({ _id: -1 }).exec(),
    getSongsByPop: async (_, __) =>
      await Song.find({}).sort({ likes: -1 }).exec(),
    getSongComment: async (_, { input }) =>
      await SongComment.findOne(input).exec(),
    getAnnotation: async (_, { input }) =>
      await Annotation.findOne(input).exec(),
    getAnnotationComment: async (_, _id) =>
      await AnnotationComment.findOne(_id).exec(),
  },
  // Annotation: {
  //   song: async (parent) => await Song.findById(parent.songId),
  // },
  Mutation: {
    addUser: async (_, { input }, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await User.create(input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addArtist: async (_, args, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await Artist.create(args).lean();
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addSong: async (_, { input }, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await Song.create(input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    editSong: async (_, { input }, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        const filter = { _id: input.id };
        const update = input;
        let response = await Song.findByIdAndUpdate(filter, update);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addSongComment: async (_, { input }, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }

      try {
        let response = await SongComment.create(input);
        let response2 = await Song.findOne(
          { _id: input.songId },
          (err, doc) => {
            doc.comments.push(response._id);
            doc.save();
          }
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addAnnotation: async (_, args, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await Annotation.create(args);
        let response2 = await Song.findOne({ _id: args.songId }, (err, doc) => {
          doc.annotations.push(response._id);
          doc.save();
        });
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addAnnotationComment: async (_, args, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await AnnotationComment.create(args);
        let response2 = await Annotation.fondOne(
          { _id: args.annotationId },
          (err, doc) => {
            doc.annotations.push(response._id);
            doc.save();
          }
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
  Song: {
    comments: async (parent) => {
      return await SongComment.find({ songId: parent.id });
    },
    annotations: async (parent) => {
      return await Annotation.find({ songId: parent.id });
    },
  },
  Artist: {
    songs: async (parent) => {
      return await Song.find({ artist: parent.name });
    },
  },
};

module.exports = {
  resolvers,
};
