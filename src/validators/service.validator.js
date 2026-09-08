function validateService(body) {
    const data = {
        name: body.name ? body.name.trim() : '',
        shortDescription: body.short_description
            ? body.short_description.trim()
            : '',
        detailedDescription: body.detailed_description
            ? body.detailed_description.trim()
            : '',
        image: body.image ? body.image.trim() : ''
    };

    const errors = {};

    if (!data.name) {
        errors.name = 'A név megadása kötelező.';
    } else if (data.name.length > 150) {
        errors.name = 'A név legfeljebb 150 karakter lehet.';
    }

    if (!data.shortDescription) {
        errors.shortDescription = 'A rövid leírás megadása kötelező.';
    } else if (data.shortDescription.length > 150) {
        errors.shortDescription = 'A rövid leírás legfeljebb 150 karakter lehet.';
    }

    if (!data.detailedDescription) {
        errors.detailedDescription = 'A részletes leírás megadása kötelező.';
    }

    if (data.image.length > 255) {
        errors.image = 'A kép elérési útja legfeljebb 255 karakter lehet.';
    }

    return {
        data,
        errors
    };
}

module.exports = validateService;