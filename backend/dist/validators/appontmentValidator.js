"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateAppointment = [
    (0, express_validator_1.body)('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
    (0, express_validator_1.body)('notes').isString().withMessage('Notes must be a string'),
];
exports.default = validateAppointment;
//# sourceMappingURL=appontmentValidator.js.map