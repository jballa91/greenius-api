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
    getSong: async (_, { input }) => await Song.findOne(input).exec(),
    getSongs: async (_, { input }) => await Song.find(input).exec(),
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
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
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
      console.log(auth);
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
    addSongComment: async (_, args, { auth }) => {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Please log in");
      }
      try {
        let response = await SongComment.create(args);
        let response2 = await Song.findOne({ _id: args.songId }, (err, doc) => {
          doc.comments.push(response._id);
          doc.save();
        });
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
