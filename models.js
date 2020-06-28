const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
});

const artistSchema = new Schema({
  name: String,
  genre: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
});

const songSchema = new Schema({
  name: String,
  lyrics: [String],
  artist: String,
  genre: String,
  img: String,
  likes: Number,
  dislikes: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "songComment" }],
  annotations: [{ type: Schema.Types.ObjectId, ref: "annotation" }],
  postedBy: String,
  likedBy: [String],
  dislikedBy: [String],
});

const songCommentSchema = new Schema({
  content: String,
  likes: Number,
  dislikes: Number,
  songId: String,
  postedBy: String,
  likedBy: [String],
  dislikedBy: [String],
});

const annotationSchema = new Schema({
  startIndex: Number,
  endIndex: Number,
  content: String,
  likes: Number,
  dislikes: Number,
  songId: String,
  postedBy: String,
  likedBy: [String],
  dislikedBy: [String],
});

const annotationCommentSchema = new Schema({
  content: String,
  likes: Number,
  dislikes: Number,
  annotationId: String,
});

const User = mongoose.model("user", userSchema);
const Artist = mongoose.model("artist", artistSchema);
const Song = mongoose.model("song", songSchema);
const SongComment = mongoose.model("songComment", songCommentSchema);
const Annotation = mongoose.model("annotation", annotationSchema);
const AnnotationComment = mongoose.model(
  "annotationComment",
  annotationCommentSchema
);

module.exports = {
  User,
  Artist,
  Song,
  SongComment,
  Annotation,
  AnnotationComment,
};
