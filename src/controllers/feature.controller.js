class FeatureController {

    static async servicesPage(request, response) {
        const serviceModel = require('../models/service.model');
        const services = await serviceModel.getServices();
        const model = {title: 'Szolgáltatásaink', services: services};
        response.render('pages/services', model);
    }
    
    static async servicePage(request, response) {
        const id = request.params.id;
        const serviceModel = require('../models/service.model');
        const service = await serviceModel.getServiceById(id);
        if (!service) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }
        const model = {title: service.name, service: service};
        response.render('pages/service', model);
    }

    static referencesPage(request, response) {
        const referenceModel = require('../models/reference.model');
        const references = referenceModel.getReferences();
        const model = {title: 'Eredményeink', references: references};
        response.render('pages/references', model);
    }

    static readingPage(request, response) {
        const id = request.params.id;
        const referenceModel = require('../models/reference.model');
        const reference = referenceModel.getReferenceById(id);
        const model = {title: 'Eredményeink', reference: reference};
        response.status(reference ? 200 : 404).render('pages/read', model);
    }
}

module.exports = FeatureController;