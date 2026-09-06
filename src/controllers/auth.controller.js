const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

class AuthController {
    static async login(request, response) {
        const email = request.body.email;
        const password = request.body.password;
        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            return response.status(401).json({
                success: false,
                data: 'Hibás email vagy jelszó'
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return response.status(401).json({
                success: false,
                data: 'Hibás email vagy jelszó'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        );

        response.json({
            success: true,
            data: {
                token: token
            }
        });
    }
}

module.exports = AuthController;