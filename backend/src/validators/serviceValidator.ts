import { body } from "express-validator";

export const serviceValidator = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('workTime').isString().withMessage('Work Time must be a string').notEmpty().withMessage('Work Time is required'),
    body('city').isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    body('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
    body('price').isNumeric().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),
    body('contactMethod').isString().withMessage('Contact Method must be a string').notEmpty().withMessage('Contact Method is required'),
];
