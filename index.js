const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./models');

const Routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

const start = async () => {
    await mongoose.connect('mongodb://localhost');

    app.listen(PORT, () => {
        console.log(`Express server listening on port ${PORT}`);
    });
};

start();
