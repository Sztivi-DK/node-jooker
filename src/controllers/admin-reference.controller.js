const ServiceModel = require('../models/service.model');
const ReferenceModel = require('../models/reference.model');
const validateReference = require('../validators/reference.validator');

class AdminReferenceController {
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

module.exports = AdminReferenceController;