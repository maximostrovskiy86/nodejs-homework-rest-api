import User from '../db/userModel.js';
import {sendEmail} from "../utils/sendEmail.js";

export const resendEmailController = async (req, res, _) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: 'User not found'
        })
    }

    if (!user.verify) {

        const msg = {
            to: email,
            from: 'slon.2786@gmail.com',
            subject: 'Thank you for registration!',
            text: `Please, confirm your email address http://localhost:3000/api/auth/verify/${user.verifyToken}`,
            html: `<a href="http://localhost:3000/api/auth/verify/${user.verifyToken}">Please, confirm your email address</a>`,
        };

        sendEmail(msg);

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Verification email sent'
        })
    }

    res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Verification has already been passed'
    })
};