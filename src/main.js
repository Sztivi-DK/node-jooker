require('dotenv').config();
require('./config/database');

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public') );
app.use(cookieParser());

const router = require('./routes');
app.use(router);

const pages = require('./controllers/page.controller');
app.use(pages.notFoundPage);

app.listen(8887);
