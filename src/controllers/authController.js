import {registration, login} from "../services/authService.js";

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