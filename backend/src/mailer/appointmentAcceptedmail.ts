import nodemailer from "nodemailer";
import dotenv from "dotenv";
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

export const acceptedMail = async (email: string, subject: string, providerName: string, appointmentDate: string, clientName: string) => {
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
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email was sent: " + info.response);
    } catch (err: any) {
        console.log("Error message: " + err.message);
    }
}
