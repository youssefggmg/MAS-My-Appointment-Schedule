"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infovalidator = void 0;
const express_validator_1 = require("express-validator");
exports.infovalidator = [
    (0, express_validator_1.body)("phoneNumber").optional().notEmpty().isString().isLength({ min: 10, max: 10 }).withMessage({ error: "please enter a valide phone number" })
];
//# sourceMappingURL=updateinfoValidator.js.map