const jwt = require('jsonwebtoken');

function adminState(request, response, next) {
    const token = request.cookies.token;

    response.locals.isAdmin = false;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            response.locals.isAdmin = true;
        } catch (error) {
            response.locals.isAdmin = false;
        }
    }

    next();
}

module.exports = adminState;