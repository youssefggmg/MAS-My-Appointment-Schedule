"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloadinaryConfig_1 = require("../helpers/cloadinaryConfig");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: cloadinaryConfig_1.storage,
    fileFilter: (req, file, cb) => {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedFormats.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
        cb(null, true);
    }
});
exports.default = upload;
//# sourceMappingURL=uploudImage.js.map