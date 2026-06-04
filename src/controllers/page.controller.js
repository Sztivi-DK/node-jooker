const { response } = require('express');
const PageModel = require('../models/page.model');

class PageController {
    static homePage(request, response) {
        const model = {title: 'Üdvözlünk', content: PageModel.getHomeContent()};
        response.render('pages/page', model);
    }
    static contactsPage(request, response) {
        const model = {title: 'Elérhetőségeink', content: PageModel.getContactContent()};
        response.render('pages/contacts', model);
    }
    static notFoundPage(request, response) {
        const model = {title: 'Nem található'};
        response.render('pages/notfound', model);
    }
}

module.exports = PageController;