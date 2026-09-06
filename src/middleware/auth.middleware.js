const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    const authHeader = request.headers.authorization;

    let token = request.cookies.token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return response.status(401).json({
            success: false,
            data: 'Nincs Authorization token'
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return response.status(401).json({
            success: false,
            data: 'Érvénytelen token'
        });
    }
}

module.exports = auth;