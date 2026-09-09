const ReferenceModel = require('../models/reference.model');
const ServiceModel = require('../models/service.model');
const validateReference = require('../validators/reference.validator');

class ApiReferenceController {
    static async getReferences(request, response) {
        const references = await ReferenceModel.getReferences();

        response.status(200).json({
            success: true,
            data: references
        });
    }

    static async getReferenceById(request, response) {
        const id = request.params.id;
        const reference = await ReferenceModel.getReferenceById(id);

        if (!reference) {
            return response.status(404).json({
                success: false,
                message: 'A referencia nem található.'
            });
        }

        response.status(200).json({
            success: true,
            data: reference
        });
    }

    static async createReference(request, response) {
        const { data, errors } = validateReference(request.body);

        if (Object.keys(errors).length) {
            return response.status(400).json({
                success: false,
                errors: errors
            });
        }

        const service = await ServiceModel.getServiceByIdAdmin(data.serviceId);

        if (!service) {
            return response.status(400).json({
                success: false,
                errors: {
                    serviceId: 'A kiválasztott szolgáltatás nem létezik.'
                }
            });
        }

        const result = await ReferenceModel.createReference(
            data.title,
            data.shortDescription,
            data.detailedDescription,
            data.image,
            data.date,
            data.location,
            data.serviceId
        );

        response.status(201).json({
            success: true,
            data: {
                id: result.insertId
            }
        });
    }

    static async updateReference(request, response) {
        const id = request.params.id;
        const { data, errors } = validateReference(request.body);

        if (Object.keys(errors).length) {
            return response.status(400).json({
                success: false,
                errors: errors
            });
        }

        const reference = await ReferenceModel.getReferenceByIdAdmin(id);

        if (!reference) {
            return response.status(404).json({
                success: false,
                message: 'A referencia nem található.'
            });
        }

        const service = await ServiceModel.getServiceByIdAdmin(data.serviceId);

        if (!service) {
            return response.status(400).json({
                success: false,
                errors: {
                    serviceId: 'A kiválasztott szolgáltatás nem létezik.'
                }
            });
        }

        await ReferenceModel.updateReference(
            id,
            data.title,
            data.shortDescription,
            data.detailedDescription,
            data.image,
            data.date,
            data.location,
            data.serviceId
        );

        response.status(200).json({
            success: true,
            message: 'A referencia sikeresen módosítva.'
        });
    }

    static async deleteReference(request, response) {
        const id = request.params.id;
        const reference = await ReferenceModel.getReferenceById(id);

        if (!reference) {
            return response.status(404).json({
                success: false,
                message: 'A referencia nem található.'
            });
        }

        await ReferenceModel.deactivateReference(id);

        response.status(200).json({
            success: true,
            message: 'A referencia sikeresen törölve.'
        });
    }
}

module.exports = ApiReferenceController;