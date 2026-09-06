const connection = require('../config/database');

class ContactModel {
    static async createContact(name, email, message) {
        const [result] = await connection.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',[name, email, message]
        );

        return result;
    }
}

module.exports = ContactModel;