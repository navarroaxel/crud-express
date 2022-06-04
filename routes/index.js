const {Router} = require('express');

class Routes {
    static configure(app) {
        app.use('/api', require('./api')(Router()));
    }
}

module.exports = Routes;
