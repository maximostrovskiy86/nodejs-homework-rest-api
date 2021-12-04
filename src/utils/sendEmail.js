import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.GOIT_SECRET_KEY);

export const sendEmail = async (data) => {
    try {
        const email = {...data, from: 'slon.2786@gmail.com'};
        await sgMail.send(email);
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found',
        })
    }
};