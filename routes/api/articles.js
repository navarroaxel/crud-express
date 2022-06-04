const {ArticleController} = require('../../controllers');

module.exports = router => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id', ArticleController.find);

    return router;
};
