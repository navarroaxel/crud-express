import { Article, IArticle } from '../models';

class ArticleService {
    static async fetch(): Promise<IArticle[]> {
        return await Article.find().lean().exec();
    }

    static async find(id: string): Promise<IArticle | null> {
        return await Article.findById({ _id: id }).lean().exec();
    }

    static async create(article: IArticle): Promise<IArticle> {
        return await Article.create(article);
    }

    static async update(id: string, article: IArticle): Promise<IArticle | null> {
        return await Article.findByIdAndUpdate(
            { _id: id },
            { $set: article },
            { returnDocument: 'after' }
        ).exec();
    }

    static async remove(id: string): Promise<IArticle | null> {
        return await Article.findOneAndDelete({ _id: id }).exec();
    }
}

export default ArticleService;