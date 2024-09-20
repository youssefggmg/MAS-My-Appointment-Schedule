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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptedMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SMTPemail = process.env.SMTP_EMAIL;
const SMTPpassword = process.env.SMTP_PASSWORD;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTPemail,
        pass: SMTPpassword
    }
});
const acceptedMail = (email, subject, providerName, appointmentDate, clientName) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: SMTPemail,
        to: email,
        subject: subject,
        text: `Dear ${clientName},
        We are pleased to inform you that your appointment with ${providerName} on ${appointmentDate}  has been confirmed. Thank you for choosing our services, and we look forward to seeing you.
        
        If you have any questions or need to make changes, feel free to reach out.

        Best regards, 
        [Your Company Name]
        [Your Contact Information]
        `
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email was sent: " + info.response);
    }
    catch (err) {
        console.log("Error message: " + err.message);
    }
});
exports.acceptedMail = acceptedMail;
//# sourceMappingURL=appointmentAcceptedmail.js.map