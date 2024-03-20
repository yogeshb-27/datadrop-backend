const nodemailer = require("nodemailer");
const { formatFileSize } = require("./FileSize");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendNodeMail = async (userEmail, mail, file) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: mail,
    subject: "File Shared",
    html: `<p>Hello from DataDrop!</p>
    <p>Dear user, </br>
    We wanted to inform you that ${userEmail} has shared a file with you on DataDrop.</p>
    <p>File details are as follows : </p>
    <p>File Name: ${file.name}</p>
    <p>File Size: ${formatFileSize(file.size)}</p>
    <p>Download Link: <a href="${process.env.FRONTEND_BASE_URL}/${
      file._id
    }" style="text-decoration: none;padding: .5rem 1.5rem;background: #222;color: #fff;border-radius: .5rem;margin-left:1rem ;">Download</a></p>
    <p>Thank you for choosing DataDrop!</p>
    <p>Best regards,<br>DataDrop</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetPasswordLink = `${process.env.FRONTEND_BASE_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset",
    html: `<p>Hello,</p>
    <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
    <p>To reset your password, please click the following link:</p>
    <p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
    <p>If you're having trouble clicking the password reset link, you can copy and paste it into your browser's address bar.</p>
    <p>Thank you,</p>
    <p>DataDrop</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

const sendPasswordChangedEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Changed Successfully",
    html: `<p>Hello,</p>
    <p>Your password has been successfully changed.</p>
    <p>If you did not make this change, please contact support immediately.</p>
    <p>Thank you,</p>
    <p>DataDrop</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password changed email:", error);
    throw error;
  }
};

module.exports = {
  sendNodeMail,
  sendResetPasswordEmail,
  sendPasswordChangedEmail,
};
