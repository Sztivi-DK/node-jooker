class FeatureController {
    static servicesPage(request, response) {
        const serviceModel = require('../models/service.model');
        const services = serviceModel.getServices();
        console.log(services);
        const model = {title: 'Szolgáltatásaink', services:services};
        response.render('pages/services', model);
    }
    static referencesPage(request, response) {
        const model = {title: 'Eredményeink'};
        response.render('pages/references', model);
    }
}

module.exports = FeatureController;