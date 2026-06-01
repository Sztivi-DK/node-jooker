const express = require('express');
const router = express.Router();

const pages = require('./controllers/page.controller');
const features = require('./controllers/feature.controller');

router.get('/', pages.homePage);

router.get('/szolgaltatasok', features.servicesPage);

router.get('/referenciak', features.referencesPage);

router.get('/kapcsolat', pages.contactsPage);

module.exports = router;