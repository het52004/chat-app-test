import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (userName, email, otp, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: '"LetsChat" letschat2004@gmail.com',
      to: email,
      subject: "Your OTP for Signup",
      text: `Hello ${userName} thank you for signing up, Your OTP is ${otp}, it will expire in 10 minutes, please make sure you dont share this OTP with anyone`,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.json({
      success: false,
      message: "An error occured while sending email, please try again!",
    });
  }
};
