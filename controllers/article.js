const {v4: uuidv4} = require('uuid');

const articles = [{
    id: uuidv4(),
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1',
}]

class ArticleController {
    static fetch(req, res) {
        res.send(articles);
    }

    static find(req, res) {
        const article = articles.find(article => article.id === req.params.id);
        res.send(article);
    }

    static create(req, res) {
        const article = {...req.body.article, id: uuidv4()};
        articles.push(article);
        res.send(article);
    }

    static update(req, res) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        const updatedArticle = {...article, ...req.body.article};
        articles[articles.indexOf(article)] = updatedArticle;
        res.send(updatedArticle);
    }

    static remove(req, res) {
        const article = articles.find(article => article.id === req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        articles.splice(articles.indexOf(article), 1);
        res.end();
    }
}

module.exports = ArticleController;
