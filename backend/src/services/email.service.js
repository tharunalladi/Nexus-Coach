const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const sendOTPEmail = async (toEmail, otpCode, userName) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('⚠️  Email credentials not set. Simulating email sending.');
        console.log(`[SIMULATED EMAIL] To: ${toEmail} | OTP: ${otpCode}`);
        return true;
    }

    try {
        const transporter = createTransporter();

        const htmlContent = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9fc; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #7c3aed; margin: 0; font-size: 24px; letter-spacing: 2px;">NEXUS COACH</h1>
                <p style="color: #6366f1; margin: 5px 0 0; font-size: 12px; font-weight: 600; letter-spacing: 1px;">AI EXAM COACH</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="color: #1a1a2e; margin-top: 0;">Verify your email address</h2>
                <p style="color: #5e5a80; font-size: 16px; line-height: 1.5;">Hi ${userName},</p>
                <p style="color: #5e5a80; font-size: 16px; line-height: 1.5;">Thanks for signing up for NEXUS COACH! Please use the following 6-digit code to complete your registration:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; padding: 15px 30px; background-color: #f3f0ff; color: #7c3aed; font-size: 32px; font-weight: 800; border-radius: 8px; letter-spacing: 5px;">${otpCode}</span>
                </div>
                
                <p style="color: #5e5a80; font-size: 14px; text-align: center;">This code will expire in 10 minutes.</p>
                <p style="color: #a89fc0; font-size: 12px; text-align: center; margin-top: 30px;">If you didn't request this code, you can safely ignore this email.</p>
            </div>
        </div>
        `;

        const mailOptions = {
            from: `"NEXUS COACH" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Your NEXUS COACH Verification Code',
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${toEmail}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = { sendOTPEmail };
