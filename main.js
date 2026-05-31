const express = require('express');
const app = express();

app.use( express.static('public') );

app.get('/', (request, response) => {
    const ejs = require('ejs');
    const template = '<link rel="stylesheet" href="style.css"> <h1><%= title %></h1> <p><%= text %></p> <a href="/valami">Add előre!</a>';
    const model = {title: 'Kezdőlap', text: 'Ez pedig a főoldal tartalmi része'};
    const html = ejs.render(template, model);
    response.send(html);
});

app.get('/valami', (request, response) => {
    response.send('<link rel="stylesheet" href="style.css"> <h1>Valami!</h1> <a href="/">Vissza a jövőbe!</a>');
});

app.listen(8887);
