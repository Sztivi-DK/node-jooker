const express = require('express');
const router = express.Router();

const pages = require('./controllers/page.controller');
const features = require('./controllers/feature.controller');
const auth = require('./controllers/auth.controller');

router.get('/', pages.homePage);
router.get('/szolgaltatasok', features.servicesPage);
router.get('/szolgaltatasok/:id', features.servicePage);
router.get('/referenciak', features.referencesPage);
router.get('/referenciak/:id', features.readingPage);
router.get('/kapcsolat', pages.contactsPage);
router.post('/kapcsolat', pages.createContact);
router.post('/login', auth.login);

module.exports = router;
