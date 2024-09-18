import { body } from "express-validator";

export const updatedService = [
    body('providerId').optional().isMongoId().withMessage('Invalid provider ID'),
    body('name').optional().isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('description').optional().isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('workTime').optional().isString().withMessage('Work Time must be a string').notEmpty().withMessage('Work Time is required'),
    body('city').optional().isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    body('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
    body('price').optional().isNumeric().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),
    body('contactMethod').optional().isString().withMessage('Contact Method must be a string').notEmpty().withMessage('Contact Method is required'),
];
