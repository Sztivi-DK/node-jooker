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
    static async getAllServices() {
        const [results] = await connection.query('SELECT * FROM services');
        return results;
    }
    static async deactivateService(id) {
        const [result] = await connection.query('UPDATE services SET active = 0 WHERE id = ?', [id]);
        return result;
    }
    static async restoreService(id) {
        const [result] = await connection.query('UPDATE services SET active = 1 WHERE id = ?', [id]);
        return result;
    }
    static async createService(name, shortDescription, detailedDescription, image) {
        const [result] = await connection.query(
            `INSERT INTO services
            (name, short_description, detailed_description, image)
            VALUES (?, ?, ?, ?)`,
            [name, shortDescription, detailedDescription, image || null]);
        return result;
    }
    static async getServiceByIdAdmin(id) {
        const [results] = await connection.query('SELECT * FROM services WHERE id = ?', [id]);
        return results[0];
    }
    static async updateService(id, name, shortDescription, detailedDescription, image) {
        const [result] = await connection.query(
            `UPDATE services
            SET name = ?, short_description = ?, detailed_description = ?, image = ?
            WHERE id = ?`,
            [name, shortDescription, detailedDescription, image || null, id]);
        return result;
    }
}

module.exports = ServiceModel;