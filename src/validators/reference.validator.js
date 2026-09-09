function validateReference(body) {
    const data = {
        title: body.title ? body.title.trim() : '',
        shortDescription: body.short_description
            ? body.short_description.trim()
            : '',
        detailedDescription: body.detailed_description
            ? body.detailed_description.trim()
            : '',
        image: body.image ? body.image.trim() : '',
        date: body.date ? body.date.trim() : '',
        location: body.location ? body.location.trim() : '',
        serviceId: body.service_id ? body.service_id : ''
    };

    const errors = {};

    if (!data.title) {
        errors.title = 'A cím megadása kötelező.';
    } else if (data.title.length > 150) {
        errors.title = 'A cím legfeljebb 150 karakter lehet.';
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

    if (!data.location) {
        errors.location = 'A helyszín megadása kötelező.';
    } else if (data.location.length > 150) {
        errors.location = 'A helyszín legfeljebb 150 karakter lehet.';
    }

    if (!data.serviceId) {
        errors.serviceId = 'Szolgáltatás kiválasztása kötelező.';
    }

    return {
        data,
        errors
    };
}

module.exports = validateReference;