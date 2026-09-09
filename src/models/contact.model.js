const connection = require('../config/database');

class ContactModel {
    static async createContact(name, email, message) {
        const [result] = await connection.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',[name, email, message]);

        return result;
    }
    static async getContacts() {
        const [results] = await connection.query('SELECT * FROM contacts WHERE active = 1 ORDER BY created_at DESC');

        return results;
    }
    static async getContactById(id) {
        const [results] = await connection.query('SELECT * FROM contacts WHERE id = ? AND active = 1', [id]);

        return results[0];
    }
}

module.exports = ContactModel;