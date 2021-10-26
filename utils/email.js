// Import Dependencies
import env from "dotenv";
// import ejs from "ejs";
import nodemailer from "nodemailer";
// import __dirname from "./../__dirname.js";

env.config();

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
  // const html = ejs.renderFile(`C:/Users/Dipu/Documents/nodeApps/pbfoxcrm/views/email/welcomeMail.ejs`,(err)=>{
  //   if(err){
  //     console.log(err);
  //   }
  // });

  
   transporter.sendMail({
    from: `"${process.env.NODEMAILER_SENDER_NAME}" < ${process.env.NODEMAILER_SENDER_EMAIL} >`,
    to: options.email,
    subject: options.subject,
    text:options.text
  });
};

// export
export default sendEmail;
