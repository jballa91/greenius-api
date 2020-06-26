const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Genre {
    POP
    HIPHOP
    ALT
    ROCK
    RB
    JAZZ
    COUNTRY
    NON
  }
  type User {
    id: ID
    userName: String
    email: String
  }
  input NewUserInput {
    id: ID
    userName: String!
    email: String!
  }
  type Artist {
    id: ID
    name: String
    genre: String
    songs: [Song]
  }
  type Song {
    id: ID
    name: String
    artist: String
    genre: Genre
    img: String
    lyrics: [String]
    likes: Int
    dislikes: Int
    comments: [SongComment]
    annotations: [Annotation]
  }
  input SongInput {
    id: ID
    name: String
    artist: String
    genre: Genre
    img: String
    lyrics: [String]
    likes: Int
    dislikes: Int
  }
  input NewSongInput {
    id: ID
    name: String!
    artist: String!
    genre: Genre!
    img: String!
    lyrics: [String]!
    likes: Int
    dislikes: Int
  }
  type SongComment {
    id: ID
    content: String!
    likes: Int
    dislikes: Int
    songId: String!
    postedBy: String!
  }
  input NewSongCommentInput {
    id: ID
    content: String!
    likes: Int
    dislikes: Int
    songId: String!
    postedBy: String!
  }
  type Annotation {
    id: ID
    lines: [String]!
    content: String!
    likes: Int
    dislikes: Int
    songId: String!
  }
  type AnnotationComment {
    id: ID
    content: String!
    likes: Int
    dislikes: Int
    annotationId: String!
  }

  type Query {
    getUsers: [User]
    getUserByEmail(email: String): [User]
    getArtist(_id: String): Artist
    getArtists: [Artist]
    getSong(_id: ID!): Song
    getSongsByDate: [Song]
    getSongsByPop: [Song]
    getSongComment(_id: String): SongComment
    getAnnotation(_id: String): Annotation
    getAnnotationComment(_id: String): AnnotationComment
  }
  type Mutation {
    addUser(input: NewUserInput!): User
    addArtist(name: String!, genre: String!): Artist
    addSong(input: NewSongInput!): Song
    editSong(input: SongInput!): Song
    addSongComment(input: NewSongCommentInput!): SongComment
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
