import mongoose from 'mongoose';

interface IComment {
  author: String;
  body: String;
}

const CommentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    body: { type: String, required: true },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  },
  { timestamps: true, versionKey: false }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { IComment, Comment };
