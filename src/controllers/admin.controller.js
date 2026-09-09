const ServiceModel = require('../models/service.model');
const ReferenceModel = require('../models/reference.model');
const validateService = require('../validators/service.validator');
const validateReference = require('../validators/reference.validator');

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

        await ReferenceModel.deactivateReferencesByService(id);
        await ServiceModel.deactivateService(id);

        response.redirect('/admin/szolgaltatasok');
    }
    static async restoreService(request, response) {
        const id = request.params.id;

        await ServiceModel.restoreService(id);
        await ReferenceModel.restoreReferencesByService(id);

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
    static async referencesPage(request, response) {
        const references = await ReferenceModel.getAllReferences();

        response.render('pages/references', {
            title: 'Referenciák',
            references: references,
            isAdmin: true
        });
    }
    static async createReferencePage(request, response) {
        const services = await ServiceModel.getAllServices();

        response.render('pages/admin-reference-create', {
            title: 'Új referencia',
            services: services
        });
    }
    static async createReference(request, response) {
        const { data, errors } = validateReference(request.body);

        if (Object.keys(errors).length) {
            const services = await ServiceModel.getAllServices();

            return response.status(400).render('pages/admin-reference-create', {
                title: 'Új referencia',
                services: services,
                errors: errors
            });
        }

        await ReferenceModel.createReference(
            data.title,
            data.shortDescription,
            data.detailedDescription,
            data.image,
            data.date,
            data.location,
            data.serviceId
        );

        response.redirect('/admin/referenciak');
    }
    static async editReferencePage(request, response) {
        const id = request.params.id;

        const reference = await ReferenceModel.getReferenceByIdAdmin(id);
        const services = await ServiceModel.getAllServices();

        if (!reference) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }

        response.render('pages/admin-reference-edit', {
            title: 'Referencia módosítása',
            reference: reference,
            services: services
        });
    }
    static async updateReference(request, response) {
        const id = request.params.id;
        const { data, errors } = validateReference(request.body);

        if (Object.keys(errors).length) {
            const reference = await ReferenceModel.getReferenceByIdAdmin(id);
            const services = await ServiceModel.getAllServices();

            reference.title = data.title;
            reference.short_description = data.shortDescription;
            reference.detailed_description = data.detailedDescription;
            reference.image = data.image;
            reference.date = data.date;
            reference.location = data.location;
            reference.service_id = data.serviceId;

            return response.status(400).render('pages/admin-reference-edit', {
                title: 'Referencia módosítása',
                reference: reference,
                services: services,
                errors: errors
            });
        }

        await ReferenceModel.updateReference(
            id,
            data.title,
            data.shortDescription,
            data.detailedDescription,
            data.image,
            data.date,
            data.location,
            data.serviceId
        );

        response.redirect('/admin/referenciak');
    }
    static async deactivateReference(request, response) {
        const id = request.params.id;
        await ReferenceModel.deactivateReference(id);

        response.redirect('/admin/referenciak');
    }
    static async restoreReference(request, response) {
        const id = request.params.id;
        const reference = await ReferenceModel.getReferenceByIdAdmin(id);

        if (!reference) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }

        const service = await ServiceModel.getServiceByIdAdmin(reference.service_id);

        if (!service || !service.active) {
            return response.status(400).send(
                'A referencia nem állítható vissza, mert a hozzá tartozó szolgáltatás inaktív.'
            );
        }

        await ReferenceModel.restoreReference(id);

        response.redirect('/admin/referenciak');
    }
}

module.exports = AdminController;