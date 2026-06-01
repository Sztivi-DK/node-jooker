const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use( express.static('public') );

app.get('/', (request, response) => {
    const model = {title: 'Üdvözlünk'};
    response.render('pages/home', model);
});

app.get('/szolgaltatasok', (request, response) => {
    const model = {title: 'Szolgáltatásaink'};
    response.render('pages/services', model);
});

app.get('/referenciak', (request, response) => {
    const model = {title: 'Korábbi munkáink'};
    response.render('pages/references', model);
});
app.get('/kapcsolat', (request, response) => {
    const model = {title: 'Elérhetőségeink'};
    response.render('pages/contacts', model);
});

app.listen(8887);
