const ServiceModel = require('../models/service.model');

class AdminController {
    static adminPage(request, response) {
        response.render('pages/admin', {title: 'Admin'});
    }
    static async servicesPage(request, response) {
        const services = await ServiceModel.getAllServices();

        response.render('pages/services', {
            title: 'Szolgáltatásaink',
            services: services,
            isAdmin: true
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
    static async createService(request, response) {
        const name = request.body.name;
        const shortDescription = request.body.short_description;
        const detailedDescription = request.body.detailed_description;
        const image = request.body.image;

        await ServiceModel.createService(
            name, shortDescription, detailedDescription, image);

        response.redirect('/admin/szolgaltatasok');
    }
    static newServicePage(request, response) {
        response.render('pages/admin-service-create', {title: 'Új szolgáltatás'});
    }
    static async editServicePage(request, response) {
        const id = request.params.id;
        const service = await ServiceModel.getServiceByIdAdmin(id);

        response.render('pages/admin-service-edit', {title: 'Szolgáltatás módosítása', service: service});
    }
    static async updateService(request, response) {
        const id = request.params.id;
        const name = request.body.name;
        const shortDescription = request.body.short_description;
        const detailedDescription = request.body.detailed_description;
        const image = request.body.image;

        await ServiceModel.updateService( id, name, shortDescription, detailedDescription, image);

        response.redirect('/admin/szolgaltatasok');
    }
    
}

module.exports = AdminController;