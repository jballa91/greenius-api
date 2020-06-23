const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    userName: String
    email: String
  }
  type Artist {
    id: ID
    name: String
    genre: String
    songs: [Song]
  }
  type Song {
    id: ID!
    name: String
    lyrics: [String]
    likes: Int
    dislikes: Int
    annotations: [Annotation]
    comments: [SongComment]
    artistId: String
  }
  type SongComment {
    id: ID!
    content: String!
    likes: Int
    dislikes: Int
    songId: String!
  }
  type Annotation {
    id: ID!
    lines: [String]!
    content: String!
    likes: Int
    dislikes: Int
    songId: String!
  }
  type AnnotationComment {
    id: ID!
    content: String!
    likes: Int
    dislikes: Int
    annotationId: String!
  }

  type Query {
    getUsers: [User]
    getArtist(_id: String): Artist
    getArtists: [Artist]
    getSong(_id: String): Song
    getSongs: [Song]
    getSongComment(_id: String): SongComment
    getAnnotation(_id: String): Annotation
    getAnnotationComment(_id: String): AnnotationComment
  }
  type Mutation {
    addUser(userName: String!, email: String!): User
    addArtist(name: String!, genre: String!): Artist
    addSong(name: String, lyrics: String, artistId: String): Song
    addSongComment(
      content: String
      likes: Int
      dislikes: Int
      songId: String
    ): SongComment
    addAnnotation(
      content: String
      likes: Int
      dislikes: Int
      songId: String
    ): Annotation
    addAnnotationComment(
      content: String
      likes: Int
      dislikes: Int
      annotationId: String
    ): AnnotationComment
  }
`;

module.exports = {
  typeDefs,
};
