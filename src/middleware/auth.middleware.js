const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    const authHeader = request.headers.authorization;

    let token = request.cookies.token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return response.redirect('/login');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return response.redirect('/login');
    }
}

module.exports = auth;