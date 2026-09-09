const express = require('express');
const router = express.Router();

const pages = require('./controllers/page.controller');
const features = require('./controllers/feature.controller');
const auth = require('./controllers/auth.controller');
const authMiddleware = require('./middleware/auth.middleware');
const admin = require('./controllers/admin.controller');
const adminContact = require('./controllers/admin-contact.controller');
const adminService = require('./controllers/admin-service.controller');
const adminReference = require('./controllers/admin-reference.controller');

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
router.get('/admin/kapcsolatok', authMiddleware, adminContact.contactsPage);
router.get('/admin/kapcsolatok/:id', authMiddleware, adminContact.contactPage);

router.get('/admin/referenciak', authMiddleware, adminReference.referencesPage);
router.get('/admin/referenciak/create', authMiddleware, adminReference.createReferencePage);
router.post('/admin/referenciak/create', authMiddleware, adminReference.createReference);
router.get('/admin/referenciak/:id/edit', authMiddleware, adminReference.editReferencePage);
router.post('/admin/referenciak/:id/edit', authMiddleware, adminReference.updateReference);
router.post('/admin/referenciak/:id/deactivate', authMiddleware, adminReference.deactivateReference);
router.post('/admin/referenciak/:id/restore', authMiddleware, adminReference.restoreReference);

router.get('/admin/test', authMiddleware, (request, response) => {
    response.json({
        success: true,
        data: 'Sikeres admin hitelesítés'
    });
});

router.get('/admin/szolgaltatasok', authMiddleware, adminService.servicesPage);
router.get('/admin/szolgaltatasok/create', authMiddleware, adminService.createServicePage);
router.post('/admin/szolgaltatasok/create', authMiddleware, adminService.createService);
router.get('/admin/szolgaltatasok/:id/edit', authMiddleware, adminService.editServicePage);
router.post('/admin/szolgaltatasok/:id/edit', authMiddleware, adminService.updateService);
router.post('/admin/szolgaltatasok/:id/deactivate', authMiddleware, adminService.deactivateService);
router.post('/admin/szolgaltatasok/:id/restore', authMiddleware, adminService.restoreService);

module.exports = router;
