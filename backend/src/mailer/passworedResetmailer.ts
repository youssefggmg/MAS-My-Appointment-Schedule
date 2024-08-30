import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();


const SMTPemail: string = process.env.SMTP_EMAIL!;
const SMTPpassword: string = process.env.SMTP_PASSWORD!;

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTPemail,
        pass: SMTPpassword
    }
})
const sendmail = async (email: string, subject: string, Text: string) => {
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
    }
    try {
        const info= await transporter.sendMail(mailOptions);
        console.log("Email was sent: " + info.response);
    } catch (err:any) {
        console.log("error message"+ err.message);
    }
}
export default sendmail;