import mongoose from 'mongoose';

interface IArticle {
  title: String;
  author: String;
  body: String;
}

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Article = mongoose.model<IArticle>('Article', ArticleSchema);

export { IArticle, Article };
