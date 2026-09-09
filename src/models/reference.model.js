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
    static async getAllReferences() {
        const [results] = await connection.query('SELECT * FROM `references`');
        return results;
    }
    static async getReferenceByIdAdmin(id) {
        const [results] = await connection.query('SELECT * FROM `references` WHERE id = ?', [id]);
        return results[0];
    }
    static async createReference(title, shortDescription, detailedDescription,
        image, date, location, serviceId) {
        const [result] = await connection.query(
            `INSERT INTO \`references\`
            (title, short_description, detailed_description, image, date, location, service_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ title, shortDescription, detailedDescription, image, date, location, serviceId]);

        return result;
    }
    static async updateReference(
        id,
        title,
        shortDescription,
        detailedDescription,
        image,
        date,
        location,
        serviceId
    ) {
        const [result] = await connection.query(
            `UPDATE \`references\`
            SET title = ?,
                short_description = ?,
                detailed_description = ?,
                image = ?,
                date = ?,
                location = ?,
                service_id = ?
            WHERE id = ?`,
            [
                title,
                shortDescription,
                detailedDescription,
                image,
                date,
                location,
                serviceId,
                id
            ]
        );

        return result;
    }
    static async deactivateReferencesByService(serviceId) {
        const [result] = await connection.query(
            `UPDATE \`references\`
            SET active = 0, deactivated_by_service = 1
            WHERE service_id = ? AND active = 1`,
            [serviceId]
        );

        return result;
    }
    static async restoreReferencesByService(serviceId) {
        const [result] = await connection.query(
            `UPDATE \`references\`
            SET active = 1, deactivated_by_service = 0
            WHERE service_id = ? AND deactivated_by_service = 1`,
            [serviceId]
        );

        return result;
    }
    static async deactivateReference(id) {
        const [result] = await connection.query(
            `UPDATE \`references\`
            SET active = 0, deactivated_by_service = 0
            WHERE id = ?`, [id]);

        return result;
    }
    static async restoreReference(id) {
        const [result] = await connection.query(
            `UPDATE \`references\`
            SET active = 1, deactivated_by_service = 0
            WHERE id = ?`, [id]);

        return result;
    }
}

module.exports = ReferenceModel;