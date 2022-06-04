const express = require('express');
const logger = require('morgan');
const bodyParser = require("body-parser");
const Routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
