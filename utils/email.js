// Import Dependencies
import nodemailer from 'nodemailer';

/*
 *  Makeing a Transporter to sending mail
 */
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmail = (options) => {
  return transporter.sendMail({
    from: `"${process.env.NODEMAILER_SENDER_NAME}" < ${process.env.NODEMAILER_SENDER_EMAIL} >`,
    to: options.email,
    subject: options.subject,
    html: `<h1> Hello World </h1>`,
  });
};


// export
export default sendEmail ;