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
}

module.exports = PageController;