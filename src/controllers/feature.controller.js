class FeatureController {
    static servicesPage(request, response) {
        const serviceModel = require('../models/service.model');
        const services = serviceModel.getServices();
        const model = {title: 'Szolgáltatásaink', services:services};
        response.render('pages/services', model);
    }
    static referencesPage(request, response) {
        const referenceModel = require('../models/reference.model');
        const references = referenceModel.getReferences();
        const model = {title: 'Eredményeink', references:references};
        response.render('pages/references', model);
    }
}

module.exports = FeatureController;