import { model, Schema } from 'mongoose';

interface IArticle {
    id: string;
    title: string;
    body: string;
    author: string;
}

const ArticleSchema: Schema = new Schema<IArticle>(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        author: { type: String, required: true }
    }, { timestamps: true }
);

const Article = model<IArticle>('Article', ArticleSchema);

export { IArticle, Article };