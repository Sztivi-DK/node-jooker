const jwt = require('jsonwebtoken');

function apiAuth(request, response, next) {
    const authHeader = request.headers.authorization;

    let token = request.cookies.token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return response.status(401).json({
            success: false,
            message: 'Nincs jogosultság.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;

        next();
    } catch (error) {
        return response.status(401).json({
            success: false,
            message: 'Érvénytelen token.'
        });
    }
}

module.exports = apiAuth;