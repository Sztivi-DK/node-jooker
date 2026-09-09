const ContactModel = require('../models/contact.model');

class ApiContactController {
    static async getContacts(request, response) {
        const contacts = await ContactModel.getContacts();

        response.status(200).json({
            success: true,
            data: contacts
        });
    }

    static async getContactById(request, response) {
        const id = request.params.id;
        const contact = await ContactModel.getContactById(id);

        if (!contact) {
            return response.status(404).json({
                success: false,
                message: 'A kapcsolatfelvétel nem található.'
            });
        }

        response.status(200).json({
            success: true,
            data: contact
        });
    }
}

module.exports = ApiContactController;