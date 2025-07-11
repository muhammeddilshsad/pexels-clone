import { transporter } from "../utils/mailTransporter.js";

export const sendEmailFromUser = async (req, res) => {
    const { recipientEmail, message } = req.body;
    const sender = req.user; 
  console.log("recipientEmail",sender);
  
    const mailOptions = {
      from: process.env.EMAIL, 
      to: recipientEmail,
      subject: `Message from ${sender.name} (${sender.email})`,
      html: `
        <h3>${sender.name} sent you a message:</h3>
        <p>${message}</p>
        <br/>
        <small>Reply to: ${sender.email}</small>
      `,
    };

   
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send email", error });
    }
  };
  