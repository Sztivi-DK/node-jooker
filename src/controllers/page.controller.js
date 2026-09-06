const { response } = require('express');
const PageModel = require('../models/page.model');

class PageController {
    static homePage(request, response) {
        const model = {title: 'Üdvözlünk', content: PageModel.getHomeContent()};
        response.render('pages/page', model);
    }

    static contactsPage(request, response) {
        const model = {title: 'Elérhetőségeink'};
        response.render('pages/contacts', model);
    }

    static async createContact(request, response) {
        const ContactModel = require('../models/contact.model');
        const name = request.body.name;
        const email = request.body.email;
        const message = request.body.message;
        await ContactModel.createContact(name, email, message);
        response.redirect('/kapcsolat');
    }
    
    static notFoundPage(request, response) {
        const model = {title: 'Nem található'};
        response.render('pages/notfound', model);
    }
}

module.exports = PageController;