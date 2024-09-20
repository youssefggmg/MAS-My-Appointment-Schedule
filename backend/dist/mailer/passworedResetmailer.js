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
const sendmail = (email, subject, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: SMTPemail,
        to: email,
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="text-align: center; color: #007BFF;">Password Reset Request</h2>
                <p>Hi [User's Name],</p>
                <p>We received a request to reset your password for your account. If you did not make this request, please ignore this email.</p>
                <p>Otherwise, you can reset your password by clicking the link below:</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" style="text-decoration: none; background-color: #007BFF; color: white; padding: 12px 20px; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                
                <p style="color: #555;">For security reasons, this link will expire in 24 hours. If you encounter any issues, please contact our support team.</p>
                <p>Thank you,<br><strong>[Your Company Name] Support Team</strong></p>
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; text-align: center; color: #999;">This is an automated email, please do not reply.</p>
            </div>
        </div>
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
exports.default = sendmail;
//# sourceMappingURL=passworedResetmailer.js.map