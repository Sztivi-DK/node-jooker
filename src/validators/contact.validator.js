function validateContact(body) {
    const data = {
        name: body.name ? body.name.trim() : '',
        email: body.email ? body.email.trim() : '',
        message: body.message ? body.message.trim() : ''
    };

    const errors = {};

    if (!data.name) {
        errors.name = 'A név megadása kötelező.';
    } else if (data.name.length > 100) {
        errors.name = 'A név legfeljebb 100 karakter lehet.';
    }

    if (!data.email) {
        errors.email = 'Az email cím megadása kötelező.';
    } else if (data.email.length > 150) {
        errors.email = 'Az email cím legfeljebb 150 karakter lehet.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Az email cím formátuma nem megfelelő.';
    }

    if (!data.message) {
        errors.message = 'Az üzenet megadása kötelező.';
    }

    return {
        data,
        errors
    };
}

module.exports = validateContact;