const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use( express.static('public') );

const router = require('./routes');
app.use(router);

app.listen(8887);
