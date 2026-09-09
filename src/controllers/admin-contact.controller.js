const ContactModel = require('../models/contact.model');

class AdminContactController {
    static async contactsPage(request, response) {
        const contacts = await ContactModel.getContacts();

        response.render('pages/admin-contacts', {
            title: 'Kapcsolatfelvételek',
            contacts: contacts
        });
    }

    static async contactPage(request, response) {
        const id = request.params.id;
        const contact = await ContactModel.getContactById(id);

        if (!contact) {
            return response.status(404).render('pages/notfound', {
                title: 'Nem található'
            });
        }

        response.render('pages/admin-contact', {
            title: 'Kapcsolatfelvétel',
            contact: contact
        });
    }
}

module.exports = AdminContactController;