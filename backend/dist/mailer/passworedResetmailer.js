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
const sendmail = (email, subject, Text) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: SMTPemail,
        to: email,
        subject: subject,
        text: `Hi [User's Name],

        We received a request to reset your password for your account. If you did not make this request, please ignore this email. Otherwise, you can reset your password using the link below:
        
        <a> ${Text}</a>
        
        For security reasons, this link will expire in 24 hours. If you encounter any issues, please contact our support team.
        
        Thank you, [Your Company Name] Support Team
        
        Feel free to customize it to better fit your needs! Let me know if you need any more help.`
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email was sent: " + info.response + info.messageId);
    }
    catch (err) {
        console.log("error message" + err.message);
    }
});
exports.default = sendmail;
