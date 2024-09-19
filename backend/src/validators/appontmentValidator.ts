import { body } from 'express-validator';

const validateAppointment = [
    body('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
    body('notes').isString().withMessage('Notes must be a string'),
];

export default validateAppointment;
