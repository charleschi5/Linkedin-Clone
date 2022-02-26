import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  editorText: String,
  shareImage: String,
  videoLink: String,
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
