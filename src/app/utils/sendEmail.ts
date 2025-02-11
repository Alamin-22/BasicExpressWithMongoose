import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_sender_address, // sender address
    to, // list of receivers
    subject: 'Password Reset Request', // Subject line
    text: 'You have requested to reset your password. Please follow the instructions in the email to proceed.', // plain text body
    html, // html body
  });

  //   console.log('Message sent: %s', info.messageId);
};
