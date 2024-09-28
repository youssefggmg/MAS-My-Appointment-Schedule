"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteservice = exports.updateServiceDetailes = exports.createService = void 0;
const service_1 = require("../../models/service");
const user_1 = require("../../models/user");
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
// post
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const { name, workTime, description, city, price, contactMethod } = req.body;
        const providerId = req.user.user._id;
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Invalid data", errors: errors.array() });
        }
        const newService = yield service_1.service.create({
            providerId,
            name,
            description,
            workTime,
            city,
            price,
            contactMethod,
        });
        yield user_1.User.findByIdAndUpdate(providerId, {
            $push: { services: newService._id }
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "Service created successfully", newService });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.createService = createService;
// patch
const updateServiceDetailes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const { name, workTime, description, city, availability, price, contactMethod } = req.body;
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Invalid data", errors: errors });
        }
        const serviceId = req.params.id;
        const updatedService = yield service_1.service.findByIdAndUpdate(serviceId, {
            $set: {
                name,
                workTime,
                description,
                city,
                availability,
                price,
                contactMethod
            }
        }, { new: true });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Service updated successfully", updatedService });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.updateServiceDetailes = updateServiceDetailes;
// delete 
const deleteservice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const providerID = req.user.user._id;
        console.log(providerID);
        const Service = yield service_1.service.findById(serviceId);
        if (!Service) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Service not found" });
        }
        if (!Service.providerId.equals(providerID)) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: "You are not authorized to delete this service" });
        }
        const deletedService = yield service_1.service.findByIdAndDelete(serviceId);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Service deleted successfully", deletedService });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.deleteservice = deleteservice;
//# sourceMappingURL=serviceController.js.map