const connection = require('../config/database');

class ReferenceModel {
    static async getReferences() {
        const [results] = await connection.query('SELECT * FROM `references` WHERE active = 1');
        return results;
    }
    static async getReferenceById(id) {
        const [results] = await connection.query('SELECT * FROM `references` WHERE id = ? AND active = 1', [id]);
        return results[0];
    }
}

module.exports = ReferenceModel;