import { login} from "../services/authService.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import {v4} from "uuid";
import User from "../db/userModal.js";


export const registrationController = async (req, res) => {
    const {email, password} = req.body;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const defaultAvatar = gravatar.url(email, {protocol: 'https', s: '250'});
    const verifyToken = v4();

    const contact = await User.create({
        email,
        password: hashPassword,
        avatarURL: defaultAvatar,
        verifyToken,
    });

    res.json({
        status: '201 Created',
        message: 'Success registration',
        "Content-Type": "application/json",
        contact
    });
}

export const loginController = async (req, res) => {
    const {email, password} = req.body;
    const token = await login(email, password);

    res.json({status: 'success', token});
}

export const signOutController = async (req, res) => {
    const signOut = await User.findByIdAndUpdate(req.user._id, {token: null})

    res.status(204).json({
        status: 'success',
        code: 204,
        message: 'Success logout',
        signOut
    });
}