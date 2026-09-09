const ServiceModel = require('../models/service.model');
const ReferenceModel = require('../models/reference.model');
const validateService = require('../validators/service.validator');

class ApiServiceController {
    static async getServices(request, response) {
        const services = await ServiceModel.getServices();

        response.status(200).json({
            success: true,
            data: services
        });
    }
    static async getServiceById(request, response) {
        const id = request.params.id;
        const service = await ServiceModel.getServiceById(id);

        if (!service) {
            return response.status(404).json({
                success: false,
                message: 'A szolgáltatás nem található.'
            });
        }

        response.status(200).json({
            success: true,
            data: service
        });
    }
    static async createService(request, response) {
        const { data, errors } = validateService(request.body);

        if (Object.keys(errors).length) {
            return response.status(400).json({
                success: false,
                errors: errors
            });
        }

        const existingService = await ServiceModel.getServiceByName(data.name);

        if (existingService) {
            return response.status(400).json({
                success: false,
                errors: {
                    name: 'Már létezik ilyen nevű szolgáltatás.'
                }
            });
        }

        const result = await ServiceModel.createService(
            data.name,
            data.shortDescription,
            data.detailedDescription,
            data.image
        );

        response.status(201).json({
            success: true,
            data: {
                id: result.insertId
            }
        });
    }
    static async updateService(request, response) {
        const id = request.params.id;
        const { data, errors } = validateService(request.body);

        if (Object.keys(errors).length) {
            return response.status(400).json({
                success: false,
                errors: errors
            });
        }

        const service = await ServiceModel.getServiceByIdAdmin(id);

        if (!service) {
            return response.status(404).json({
                success: false,
                message: 'A szolgáltatás nem található.'
            });
        }

        const existingService = await ServiceModel.getServiceByName(data.name);

        if (existingService && existingService.id != id) {
            return response.status(400).json({
                success: false,
                errors: {
                    name: 'Már létezik ilyen nevű szolgáltatás.'
                }
            });
        }

        await ServiceModel.updateService(
            id,
            data.name,
            data.shortDescription,
            data.detailedDescription,
            data.image
        );

        response.status(200).json({
            success: true,
            message: 'A szolgáltatás sikeresen módosítva.'
        });
    }
    static async deleteService(request, response) {
        const id = request.params.id;
        const service = await ServiceModel.getServiceById(id);

        if (!service) {
            return response.status(404).json({
                success: false,
                message: 'A szolgáltatás nem található.'
            });
        }

        await ReferenceModel.deactivateReferencesByService(id);
        await ServiceModel.deactivateService(id);

        response.status(200).json({
            success: true,
            message: 'A szolgáltatás sikeresen törölve.'
        });
    }
}

module.exports = ApiServiceController;