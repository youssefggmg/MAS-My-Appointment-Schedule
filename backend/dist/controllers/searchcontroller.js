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
exports.searchByavailability = exports.searchByCity = exports.searchByserviceName = exports.searchByProviderName = void 0;
const user_1 = require("../models/user");
const service_1 = require("../models/service");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const searchByProviderName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const user = yield user_1.User.findOne({
            name,
            role: "provider"
        });
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new index_1.NotFoundError("provider not found"));
        }
        const services = yield service_1.service.find({ provider: user._id });
        res.status(http_status_codes_1.StatusCodes.OK).json({ user, services });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.searchByProviderName = searchByProviderName;
const searchByserviceName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceName } = req.query;
        const theService = yield service_1.service.findOne({
            name: serviceName
        });
        if (!theService) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new index_1.NotFoundError("service not found"));
        }
        const provider = user_1.User.find({ _id: theService.providerId });
        res.status(http_status_codes_1.StatusCodes.OK).json({ provider, theService });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.searchByserviceName = searchByserviceName;
const searchByCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.params;
        const services = yield service_1.service.find({
            city
        });
        if (!services) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new index_1.NotFoundError("sorry we have no service in this city try another one 😓😓"));
        }
        const providers = yield user_1.User.find({ _id: { $in: services.map((service) => { return service.providerId; }) } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ providers, services });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.searchByCity = searchByCity;
const searchByavailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { availability } = req.params;
        const services = yield service_1.service.find({ availability });
        if (!services) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new index_1.NotFoundError("sorry we have no availabil services"));
        }
        const providers = {
            _id: { $in: services.map((service) => { service.providerId; }) }
        };
        res.status(http_status_codes_1.StatusCodes.OK).json({ services, providers });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.searchByavailability = searchByavailability;
//# sourceMappingURL=searchcontroller.js.map