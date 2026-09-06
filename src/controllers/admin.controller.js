class AdminController {
    static adminPage(request, response) {
        response.render('pages/admin', {
            title: 'Admin'
        });
    }
}

module.exports = AdminController;