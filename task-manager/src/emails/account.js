const sgMail = require('@sendgrid/mail');
//const SENDGRID_APIKEY = require('../config/dev.env')
const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_APIKEY)//set up an API key

const sendWelcomeEmail = (email, name) =>{
  sgMail.send({
    to: email,
    from: 'aishwarya.kalmangi@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: `Email is from ${name}`,
  })
  
}

const sendCancellationEmail = (email) =>{
  sgMail.send({
    to: email,
    from:'aishwarya.kalmangi@gmail.com',
    subject:'email cancellation',
    text:'Your email has been cancelled'
  })
}

module.exports={sendWelcomeEmail, sendCancellationEmail}



// const msg = {
//   to: 'aishwarya.kalmangi@gmail.com',
//   from: 'aishwarya.kalmangi@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };


// sgMail.send({
//     to: 'aishwarya.kalmangi@gmail.com',
//     from: 'aishwarya.kalmangi@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   })
