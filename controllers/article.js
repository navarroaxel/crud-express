const {ArticleService} = require('../services');

const articleService = new ArticleService();

class ArticleController {
    static async fetch(req, res, next) {
        try {
            res.send(await articleService.fetch());
        } catch (err) {
            next(err);
        }
    }

    static async find(req, res, next) {
        try {
            res.send(await articleService.find(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            res.send(await articleService.create(req.body.article));
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res) {
        try {
            res.send(await articleService.update(req.params.id, req.body.article));
        } catch (err) {
            next(err);
        }
    }

    static async remove(req, res, next) {
        try {
            res.send(await articleService.remove(req.params.id));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ArticleController;
