import nodemailer from "nodemailer";

export const SendCodeEmail = async (email, name, subject, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailSent = await transporter.sendMail({
      from: `"Cinelux" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <p style="font-size: 1.2rem; margin-bottom: 20px;">Hi ${name}, hope you are doing great. Here is your verification code.</p>
        <p style="letter-spacing: 0.5rem; font-size: 3rem; font-weight: bold; text-align: center; margin: 20px 0;">${code}</p>
      </div>
      `,
    });

    return emailSent;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
