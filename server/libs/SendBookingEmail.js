import nodemailer from "nodemailer";

export const SendBookingEmail = async (email, name, showtime, seats) => {
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
      subject: `${showtime.movie.title}'s Booking`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <p style="font-size: 1.2rem; margin-bottom: 20px;">Hi ${name}, hope you are doing great.</p>
        <p style="font-size: 1.5rem; font-weight: bold; color: green; margin-bottom: 20px;">Your booking was successful!</p>
        <p style="font-size: 1.2rem; margin-bottom: 20px;">You can show this email at the counter and get your show tickets. Here are your booking details:</p>
        <p><strong>Movie:</strong> ${showtime.movie.title}</p>
        <p><strong>Date:</strong> ${showtime.date}</p>
        <p><strong>Time:</strong> ${showtime.time}</p>
        <p><strong>Screen:</strong> ${showtime.screen}</p>
        <p><strong>Language:</strong> ${showtime.language}</p>
        <p><strong>Seats:</strong> ${seats.join(", ")}</p>
      </div>
      `,
    });

    return emailSent;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
