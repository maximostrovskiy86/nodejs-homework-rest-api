import {registration, login} from "../services/authService.js";
import User from "../db/userModal.js";

export const registrationController = async (req, res) => {
    const {email, password} = req.body;

    const contact = await registration({email, password});
    res.json({
        status: '201 Created',
        "Content-Type": "application/json",
        contact
    });

}

export const loginController = async (req, res) => {
    const {email, password} = req.body;
    const token = await login(email, password);

    res.json({status: 'success', token});
}

export const signOutController =  async (req, res) => {
        const signOut = await User.findByIdAndUpdate(req.user._id, { token: null })
        res.status(204).json({
            status: 'success',
            code: 204,
            message: 'Success logout',
            signOut
        });
}