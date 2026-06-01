class FeatureController {
    static servicesPage(request, response) {
        const model = {title: 'Szolgáltatásaink'};
        response.render('pages/services', model);
    }
    static referencesPage(request, response) {
        const model = {title: 'Korábbi munkáink'};
        response.render('pages/references', model);
    }
}

module.exports = FeatureController;