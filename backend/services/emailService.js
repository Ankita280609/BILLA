const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using Resend.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} text - Plain text version of the email.
 * @param {string} html - HTML version of the email.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const data = await resend.emails.send({
      from: 'BILLA <onboarding@resend.dev>', // Use Resend's test domain or your verified domain
      to: to,
      subject: subject,
      html: html || text, // Resend prefers HTML, fallback to text
    });

    console.log('Email sent successfully:', data);
    return data;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

module.exports = sendEmail;