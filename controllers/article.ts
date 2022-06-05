import {Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article} from '../models';

const {ObjectId} = Types;

const articles: Article[] = [{
    id: new ObjectId().toString(),
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1',
}]

class ArticleController {
    static fetch(req: Request, res: Response) {
        res.send(articles);
    }

    static find(req: Request, res: Response) {
        const article = articles.find(article => article.id === req.params.id);
        res.send(article);
    }

    static create(req: Request, res: Response) {
        const article = {...req.body.article as Article, id: new ObjectId().toString()};
        articles.push(article);
        res.send(article);
    }

    static update(req: Request, res: Response) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        const updatedArticle = {...article, ...req.body.article as Partial<Article>};
        articles[articles.indexOf(article)] = updatedArticle;
        res.send(updatedArticle);
    }

    static remove(req: Request, res: Response) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        articles.splice(articles.indexOf(article), 1);
        res.end();
    }
}

export default ArticleController;
