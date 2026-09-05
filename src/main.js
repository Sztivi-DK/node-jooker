require('dotenv').config();
require('./config/database');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use( express.static('public') );

const router = require('./routes');
app.use(router);

const pages = require('./controllers/page.controller');
app.use(pages.notFoundPage);

app.listen(8887);
