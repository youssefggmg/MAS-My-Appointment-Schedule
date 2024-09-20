import { body } from "express-validator";


export const createProviderValidation = [
    body("jobTitle")
        .notEmpty()
        .withMessage("Job title is required")
        .isString()
        .withMessage("Job title must be a string"),

    body("aboutMe")
        .notEmpty()
        .withMessage("About me is required")
        .isString()
        .withMessage("About me must be a string"),

    body("availability")
        .notEmpty()
        .withMessage("Availability is required")
        .isBoolean()
        .withMessage("Availability must be a boolean value")
];

export const updateProviderValidation = [
    body("jobTitle")
        .optional()
        .isString()
        .withMessage("Job title must be a string"),

    body("aboutMe")
        .optional()
        .isString()
        .withMessage("About me must be a string"),

    body("availability")
        .optional()
        .isBoolean()
        .withMessage("Availability must be a boolean value")
];