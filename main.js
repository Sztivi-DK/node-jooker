const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use( express.static('public') );

app.get('/', (request, response) => {
    const model = {title: 'Üdvözlünk'};
    response.render('home', model);
});

app.get('/valami', (request, response) => {
    const model = {title: 'Valami'};
    response.render('home', model);
});

app.listen(8887);
