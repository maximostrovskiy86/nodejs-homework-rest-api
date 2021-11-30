import express from 'express';

import {asyncWrapper} from "../../helpers/apiHelpers.js";
import {
    registrationController,
    loginController,
} from "../../controllers/authController.js";

const authRouter = new express.Router();

authRouter.post('/registration', asyncWrapper(registrationController));
authRouter.post('/login', asyncWrapper(loginController));

export default authRouter;
