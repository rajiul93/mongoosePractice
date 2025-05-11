import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.Node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'rajiulrayhan@gmail.com',
      pass: 'ymmn bjxl bmsh zzmt',
    },
  });

  await transporter.sendMail({
    from: 'rajiulrayhan@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html, // html body
  });
};
