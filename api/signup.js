export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    // Option A: Use a service like SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'contact@lkcircle.com',
        from: 'noreply@lkcircle.com',
        subject: 'New LKCircle Early Access Signup',
        text: `New signup: ${email}`,
        html: `<p>New early access signup: <strong>${email}</strong></p>`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}
