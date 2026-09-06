const connection = require('../config/database');

class UserModel {
    static async getUserByEmail(email) {
        const [results] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        return results[0];
    }
}

module.exports = UserModel;