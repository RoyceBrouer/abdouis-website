import nodemailer from "nodemailer";

export default async function handler(request, response) {
  if (request.method === "POST") {
    const { formData } = request.body;
    const transporter = nodemailer.createTransport({
      host: "mail.riseup.net",
      port: 465,
      secure: true,
      auth: {
        user: "royce@riseup.net",
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      //   from: formData.email,
      from: "royce@riseup.net",
      to: "royce@riseup.net",
      subject: "request from website",
      html: `
      <h1>Somebody has sent you an Email via your Website</h1>
      <p><strong>First Name:</strong> ${formData.firstName}</p>
      <p><strong>Last Name:</strong> ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
      response.status(200).json({ message: "email sent successfully" });
    } catch (error) {
      console.log("error sending mail", error);
      response.status(500).json({ message: "email could not be sent" });
    }
  } else {
    response.status(500).end();
  }
}
