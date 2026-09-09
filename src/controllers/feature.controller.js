const ServiceModel = require('../models/service.model');
const ReferenceModel = require('../models/reference.model');

class FeatureController {

    static async servicesPage(request, response) {
        const services = await ServiceModel.getServices();
        const model = {title: 'Szolgáltatásaink', services: services};
        response.render('pages/services', model);
    }
    
    static async servicePage(request, response) {
        const id = request.params.id;
        const service = await ServiceModel.getServiceById(id);
        if (!service) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }
        const model = {title: service.name, service: service};
        response.render('pages/service', model);
    }

    static async referencesPage(request, response) {
        const references = await ReferenceModel.getReferences();
        const model = {title: 'Eredményeink', references: references};
        response.render('pages/references', model);
    }

    static async readingPage(request, response) {
        const id = request.params.id;
        const reference = await ReferenceModel.getReferenceById(id);
        if (!reference) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }

        const model = {title: reference.title, reference: reference};
        response.render('pages/read', model);
    }
}

module.exports = FeatureController;