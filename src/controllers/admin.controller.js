const ServiceModel = require('../models/service.model');

class AdminController {
    static adminPage(request, response) {
        response.render('pages/admin', {
            title: 'Admin'
        });
    }
    static async servicesPage(request, response) {
        const services = await ServiceModel.getAllServices();

        response.render('pages/admin-services', {
            title: 'Szolgáltatások kezelése',
            services: services
        });
    }
    static async deactivateService(request, response) {
        const id = request.params.id;
        await ServiceModel.deactivateService(id);

        response.redirect('/admin/szolgaltatasok');
    }
    static async restoreService(request, response) {
        const id = request.params.id;
        await ServiceModel.restoreService(id);

        response.redirect('/admin/szolgaltatasok');
    }
}

module.exports = AdminController;