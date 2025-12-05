const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} text - Plain text version of the email.
 * @param {string} html - HTML version of the email.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@billa.com', // Use verified sender email
      subject: subject,
      text: text,
      html: html,
    };

    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', response[0].statusCode);
    return response;

  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    throw error; // Re-throw the error so the caller can handle it
  }
};

module.exports = sendEmail;