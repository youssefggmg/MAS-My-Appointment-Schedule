"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentcontroller_1 = require("../controllers/appointmentcontroller");
const tockenVerification_1 = require("../middlewares/tockenVerification");
const isUser_1 = require("../middlewares/isUser");
const appointmetRouter = express_1.default.Router();
appointmetRouter.post("/appointment/book", tockenVerification_1.tockenVirification, isUser_1.isUser, appointmentcontroller_1.bookAppointment);
appointmetRouter.patch("/appointment/cancel/:id", tockenVerification_1.tockenVirification, isUser_1.isUser, appointmentcontroller_1.cancelAppointment);
appointmetRouter.get("/appointment/allApointments", tockenVerification_1.tockenVirification, isUser_1.isUser, appointmentcontroller_1.allAppointments);
exports.default = appointmetRouter;
//# sourceMappingURL=userAppontmentrout.js.map