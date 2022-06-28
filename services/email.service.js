const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SEND_GRID_API_KEY, PORT } = process.env;

const BASE_URL=`http://localhost:${PORT}/api`


const sendEmail = async (userEmail,code) => {
    sgMail.setApiKey(SEND_GRID_API_KEY);
    const link=`${BASE_URL}/users/verify/${code}`
    
const msg = {
  to: userEmail, // Change to your recipient
  from: 'isnapolov@gmail.com', // Change to your verified sender
  subject: 'Confirm your email',  
  html: `<h4>Ckick on this <a href="${link}">link</a> to confirm registration </h4>`,
    }
    
    try {
        const result = await sgMail.send(msg);
        console.log('result', result);        
    } catch (e) {
        console.log('ERROR', e);
        throw e;
    }

}

module.exports = {
    sendEmail
}