const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const auth = require('./app/Http/Routes/auth');
const company = require('./app/Http/Routes/company');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/company', company);

module.exports = app;
