"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidator = void 0;
const express_validator_1 = require("express-validator");
exports.serviceValidator = [
    (0, express_validator_1.body)('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('workTime').isString().withMessage('Work Time must be a string').notEmpty().withMessage('Work Time is required'),
    (0, express_validator_1.body)('city').isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),
    (0, express_validator_1.body)('contactMethod').isString().withMessage('Contact Method must be a string').notEmpty().withMessage('Contact Method is required'),
];
//# sourceMappingURL=serviceValidator.js.map