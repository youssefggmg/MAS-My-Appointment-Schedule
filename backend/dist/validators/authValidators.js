"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logeInValidator = exports.regesterValidator = void 0;
const express_validator_1 = require("express-validator");
exports.regesterValidator = [
    (0, express_validator_1.body)("name").not().isEmpty().withMessage({ error: "you most have a name" }),
    (0, express_validator_1.body)("email").isEmail().not().isEmpty().withMessage({ error: "youmust enter a valide email" }),
    (0, express_validator_1.body)("password").notEmpty().isLength({ min: 6 }).withMessage({ error: "passwored must be 6 charecters at leat" }),
    (0, express_validator_1.body)("phoneNumber").notEmpty().isString().isLength({ min: 10, max: 10 }).withMessage({ error: "please enter a valide phone number" })
];
exports.logeInValidator = [
    (0, express_validator_1.body)("email").isEmail().not().isEmpty().withMessage({ error: "youmust enter email" }),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).not().isEmpty().withMessage({ error: "password must be 6 charecters at leat" })
];
//# sourceMappingURL=authValidators.js.map