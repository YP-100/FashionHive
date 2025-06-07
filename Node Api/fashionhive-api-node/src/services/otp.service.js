const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Store OTPs temporarily
const otpStorage = new Map();

const generateOTP = (email) => {
    if (!email) {
        throw new Error('Email is required to generate OTP');
    }

    // Ensure email is a string and normalize it
    const normalizedEmail = String(email).toLowerCase().trim();
    
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    
    // Store OTP with expiration (5 minutes)
    otpStorage.set(normalizedEmail, {
        otp,
        expiresAt: Date.now() + 300000 // 5 minutes
    });
    
    console.log(`Generated OTP for ${normalizedEmail}`);
    return otp;
};

const sendOTP = async (email) => {
    try {
        if (!email) {
            throw new Error('Email is required to send OTP');
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const otp = generateOTP(normalizedEmail);
        
        const mailOptions = {
            from: `"FashionHive App" <${process.env.EMAIL_USER}>`,
            to: normalizedEmail,
            subject: 'Your FashionHive Verification Code',
            text: `Hi there! Your security code is: ${otp} (expires in 5 minutes).`
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${normalizedEmail}`);
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP: ' + error.message);
    }
};

const verifyOTP = (email, otp) => {
    try {
        if (!email || !otp) {
            throw new Error('Email and OTP are required for verification');
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const storedOtpData = otpStorage.get(normalizedEmail);
        
        if (!storedOtpData) {
            return { valid: false, message: 'OTP not found or expired' };
        }
        
        if (Date.now() > storedOtpData.expiresAt) {
            otpStorage.delete(normalizedEmail);
            return { valid: false, message: 'OTP expired' };
        }
        
        if (storedOtpData.otp !== otp) {
            return { valid: false, message: 'Invalid OTP' };
        }
        
        // OTP is valid, remove it from storage
        otpStorage.delete(normalizedEmail);
        return { valid: true, message: 'OTP verified successfully' };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { valid: false, message: error.message };
    }
};

// Clean up expired OTPs every minute
setInterval(() => {
    const now = Date.now();
    otpStorage.forEach((value, key) => {
        if (now > value.expiresAt) {
            otpStorage.delete(key);
        }
    });
}, 60000);

module.exports = { sendOTP, verifyOTP };