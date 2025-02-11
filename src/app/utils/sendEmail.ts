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
    subject: 'Reset Your Password!!!', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });

  //   console.log('Message sent: %s', info.messageId);
};
