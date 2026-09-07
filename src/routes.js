const express = require('express');
const router = express.Router();

const pages = require('./controllers/page.controller');
const features = require('./controllers/feature.controller');
const auth = require('./controllers/auth.controller');
const authMiddleware = require('./middleware/auth.middleware');
const admin = require('./controllers/admin.controller');

router.get('/', pages.homePage);
router.get('/szolgaltatasok', features.servicesPage);
router.get('/szolgaltatasok/:id', features.servicePage);
router.get('/referenciak', features.referencesPage);
router.get('/referenciak/:id', features.readingPage);
router.get('/kapcsolat', pages.contactsPage);
router.post('/kapcsolat', pages.createContact);
router.get('/login', auth.loginPage);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/admin', authMiddleware, admin.adminPage);
router.get('/admin/szolgaltatasok', authMiddleware, admin.servicesPage);
router.get('/admin/test', authMiddleware, (request, response) => {
    response.json({
        success: true,
        data: 'Sikeres admin hitelesítés'
    });
});
router.get('/admin/szolgaltatasok/create', authMiddleware, admin.newServicePage);
router.post('/admin/szolgaltatasok/create', authMiddleware, admin.createService);
router.get('/admin/szolgaltatasok/:id/edit', authMiddleware, admin.editServicePage);
router.post('/admin/szolgaltatasok/:id/edit', authMiddleware, admin.updateService);
router.post('/admin/szolgaltatasok/:id/deactivate', authMiddleware, admin.deactivateService);
router.post('/admin/szolgaltatasok/:id/restore', authMiddleware, admin.restoreService);

module.exports = router;
