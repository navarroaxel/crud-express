const {Router} = require('express');

module.exports = router => {
    router.use(`/articles`, require('./articles')(Router()));

    return router;
};
