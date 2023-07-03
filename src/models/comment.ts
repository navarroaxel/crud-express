import { model, Schema } from 'mongoose';
import { IArticle } from './article';

interface IComment {
    id: string;
    body: string;
    author: string;
    article: IArticle;
}

const CommentSchema: Schema = new Schema<IComment>(
    {
        body: { type: String, required: true },
        author: { type: String, required: true },
        article: { type: Schema.Types.ObjectId,  ref: 'Article', required: true}
    },{ timestamps: true }
);

const Comment = model<IComment>('Comment', CommentSchema);

export { IComment, Comment };