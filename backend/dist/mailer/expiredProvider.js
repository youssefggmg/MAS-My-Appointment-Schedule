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
const sendSubscriptionExpiryEmail = (providerEmail, providerName) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: SMTPemail,
        to: providerEmail,
        subject: "Subscription Expiration Notice",
        text: `
            Hi ${providerName},

            We want to inform you that your subscription has expired. Please take a moment to renew your subscription to continue enjoying our services without interruption.

            If you have any questions or need assistance, feel free to contact our support team.

            Thank you for being a valued provider!

            Best regards,
            [Your Company Name] Support Team
        `
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    }
    catch (err) {
        console.error("Error sending email:", err.message);
    }
});
exports.default = sendSubscriptionExpiryEmail;
//# sourceMappingURL=expiredProvider.js.map