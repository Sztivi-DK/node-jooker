//const fs = require('fs');
const connection = require('../config/database');

class ServiceModel {
    static async getServices() {
        const [results] = await connection.query('SELECT * FROM services WHERE active = 1');
        return results;
    }
    static async getServiceById(id) {
        const [results] = await connection.query('SELECT * FROM services WHERE id = ? AND active = 1', [id]);
        return results[0];
    }
}

module.exports = ServiceModel;