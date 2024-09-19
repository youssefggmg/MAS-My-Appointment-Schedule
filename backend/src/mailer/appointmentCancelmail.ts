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

export const sendCancelationEmail = async (email: string, subject: string, providerName: string, appointmentTime: string, clientName: string) => {
    const mailOptions = {
        from: SMTPemail,
        to: email,
        subject: subject,
        text: `Dear ${clientName},

We regret to inform you that your appointment with ${providerName} at ${appointmentTime} has been canceled. We apologize for any inconvenience this may cause.

If you would like to reschedule or have any questions, please don't hesitate to contact us.

Best regards, 
[Your Company Name]
[Your Contact Information]
        `
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Cancellation email was sent: " + info.response);
    } catch (err: any) {
        console.log("Error message: " + err.message);
    }
}
