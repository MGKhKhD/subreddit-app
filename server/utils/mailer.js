const nodemailer = require('nodemailer');
const Keys = require('../configs/configs');

function setupNodeMailer(){
    return nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
          user: process.env.MAILER_AUTH_USER,
          pass: process.env.MAILER_AUTH_PASS
        }
      });
}

function sendConfirmationEmail(user){
    const transport = setupNodeMailer();
    const email ={
        from: '"subreddit app" <info@subreddit-app.com',
        to: user.email,
        subject: 'confirm email',
        text: `
        Please confirm your email address:
        ${user.generateConfimationUrl()}
        `
    };

    transport.sendMail(email);
}

module.exports = sendConfirmationEmail;