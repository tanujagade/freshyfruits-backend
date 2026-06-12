import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail to you
    await transporter.sendMail({
      from: email,
      to: "gadetanuja5@gmail.com",
      subject: `FreshyFruits Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // Auto reply to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting FreshyFruits 🍎",
      html: `
        <h2>Hello ${name},</h2>

        <p>
          Thank you for contacting FreshyFruits.
          We have successfully received your message.
        </p>

        <p>
          Our team will get back to you as soon as possible.
        </p>

        <br/>

        <p>
          Regards,<br/>
          FreshyFruits Team 🍎
        </p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;