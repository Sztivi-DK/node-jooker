class PageController {
    static homePage(request, response) {
        const model = {title: 'Üdvözlünk'};
        response.render('pages/home', model);
    }
    static contactsPage(request, response) {
        const model = {title: 'Elérhetőségeink'};
        response.render('pages/contacts', model);
    }
}

module.exports = PageController;