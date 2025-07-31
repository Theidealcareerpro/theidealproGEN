const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports.sendWelcomeEmail = async (email, portfolioUrl) => {
  try {
    await resend.emails.send({
      from: 'no-reply@your-domain.com',
      to: email,
      subject: 'Portfolio Created Successfully',
      html: `<p>Your portfolio is live at <a href="${portfolioUrl}">${portfolioUrl}</a>. It will expire in 21 days unless extended.</p>`,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
