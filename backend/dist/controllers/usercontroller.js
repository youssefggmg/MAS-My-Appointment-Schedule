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
exports.updateuserinfo = exports.userinfo = void 0;
const user_1 = require("../models/user");
const index_1 = require("../errors/index");
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const hachPassword_1 = require("../utils/hachPassword");
const userinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.user;
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new index_1.UnAuthenticatedError('Please login first'));
        }
        const userinfo = yield user_1.User.findOne({
            _id: user._id
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(userinfo);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.userinfo = userinfo;
const updateuserinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        // Ensure req.user exists
        if (!user || !user.user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(new index_1.UnAuthenticatedError("User not authenticated"));
        }
        const userID = user.user._id;
        console.log("got the userid");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new index_1.BadRequestError("Invalid input"));
        }
        if (user.user.role !== "user") {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(new index_1.UnAuthenticatedError("You are not authorized to update user info"));
        }
        const { name, password, phoneNumber } = req.body;
        console.log(req.body);
        const updateFields = {};
        // Optional: Only add fields to update if they are provided222
        if (name)
            updateFields.name = name;
        if (password) {
            const Newpassword = yield (0, hachPassword_1.hashPassword)(password);
            updateFields.password = Newpassword;
        }
        if (phoneNumber)
            updateFields.phoneNumber = phoneNumber;
        // Check if a file is provided and update Image field if it exists
        if (req.file) {
            const Image = req.file.path;
            updateFields.Image = Image;
        }
        const updatedUser = yield user_1.User.findByIdAndUpdate(userID, { $set: updateFields }, { new: true });
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User info updated successfully", updatedUser });
    }
    catch (err) {
        console.log(err, "hjkashdka");
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.updateuserinfo = updateuserinfo;
//# sourceMappingURL=usercontroller.js.map