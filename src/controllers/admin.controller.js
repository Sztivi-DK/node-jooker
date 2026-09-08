const ServiceModel = require('../models/service.model');
const validateService = require('../validators/service.validator');

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
        const { data, errors } = validateService(request.body);

        if (Object.keys(errors).length) {
            return response.status(400).render('pages/admin-service-create', {
                title: 'Új szolgáltatás',
                errors: errors
            });
        }

        const existingService = await ServiceModel.getServiceByName(data.name);

        if (existingService) {
            return response.status(400).render('pages/admin-service-create', {
                title: 'Új szolgáltatás',
                errors: {
                    name: 'Már létezik ilyen nevű szolgáltatás.'
                }
            });
        }

        await ServiceModel.createService(
            data.name,
            data.shortDescription,
            data.detailedDescription,
            data.image
        );

        response.redirect('/admin/szolgaltatasok');
    }
    static createServicePage(request, response) {
        response.render('pages/admin-service-create', {
            title: 'Új szolgáltatás'
        });
    }
    static async editServicePage(request, response) {
        const id = request.params.id;
        const service = await ServiceModel.getServiceByIdAdmin(id);

        response.render('pages/admin-service-edit', {title: 'Szolgáltatás módosítása', service: service});
    }
    static async updateService(request, response) {
        const id = request.params.id;
        const { data, errors } = validateService(request.body);

        if (Object.keys(errors).length) {
            const service = await ServiceModel.getServiceByIdAdmin(id);

            service.name = data.name;
            service.short_description = data.shortDescription;
            service.detailed_description = data.detailedDescription;
            service.image = data.image;

            return response.status(400).render('pages/admin-service-edit', {
                title: 'Szolgáltatás módosítása',
                service: service,
                errors: errors
            });
        }

        const existingService = await ServiceModel.getServiceByName(data.name);

        if (existingService && existingService.id != id) {
            const service = await ServiceModel.getServiceByIdAdmin(id);

            service.name = data.name;
            service.short_description = data.shortDescription;
            service.detailed_description = data.detailedDescription;
            service.image = data.image;

            return response.status(400).render('pages/admin-service-edit', {
                title: 'Szolgáltatás módosítása',
                service: service,
                errors: {
                    name: 'Már létezik ilyen nevű szolgáltatás.'
                }
            });
        }

        await ServiceModel.updateService(
            id,
            data.name,
            data.shortDescription,
            data.detailedDescription,
            data.image
        );

        response.redirect('/admin/szolgaltatasok');
    }
    
}

module.exports = AdminController;