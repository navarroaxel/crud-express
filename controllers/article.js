const articles = [{
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1',
}]

class ArticleController {
    static fetch(req, res) {
        res.send(articles);
    }

    static create(req, res) {
        articles.push(req.body);
        res.send({id: articles.length - 1});
    }

    static find(req, res) {
        res.send(articles[req.params.id]);
    }
}

module.exports = ArticleController;
