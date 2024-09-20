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
});

const sendSubscriptionExpiryEmail = async (providerEmail: string, providerName: string) => {
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
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (err: any) {
        console.error("Error sending email:", err.message);
    }
};

export default sendSubscriptionExpiryEmail;
