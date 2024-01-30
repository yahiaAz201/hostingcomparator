import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a Title for the Post"],
  },
  description: {
    type: String,
    required: [true, "Please provide a Description for the Post"],
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide a Thumbnail for the Post"],
  },
  html: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  datePublished: { type: Date, default: Date.now },
});

const Posts = mongoose.model("Posts", postsSchema);

export default Posts;
