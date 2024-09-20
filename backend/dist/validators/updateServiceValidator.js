"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedService = void 0;
const express_validator_1 = require("express-validator");
exports.updatedService = [
    (0, express_validator_1.body)('providerId').optional().isMongoId().withMessage('Invalid provider ID'),
    (0, express_validator_1.body)('name').optional().isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('description').optional().isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('workTime').optional().isString().withMessage('Work Time must be a string').notEmpty().withMessage('Work Time is required'),
    (0, express_validator_1.body)('city').optional().isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
    (0, express_validator_1.body)('price').optional().isNumeric().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),
    (0, express_validator_1.body)('contactMethod').optional().isString().withMessage('Contact Method must be a string').notEmpty().withMessage('Contact Method is required'),
];
//# sourceMappingURL=updateServiceValidator.js.map