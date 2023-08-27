const nodemailer = require('nodemailer')

exports.sendEmail = async (mailOptions) => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

    var message = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html
    }

    await transport.sendMail(message)
    .then(()=>console.log("Email sent successfully"))
    .catch(()=>console.log("failed to send email"))
}
