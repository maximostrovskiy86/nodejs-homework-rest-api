import express from 'express';

import {asyncWrapper} from "../../helpers/apiHelpers.js";
import {
    registrationController,
    loginController,
    signOutController,
    u
} from "../../controllers/authController.js";
import {getUsersController} from "../../controllers/contactController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import uploadMiddleware from "../../middleware/uploadMiddleware.js";

const authRouter = new express.Router();

authRouter.post('/registration', asyncWrapper(registrationController));
authRouter.post('/login', asyncWrapper(loginController));
authRouter.get('/current', authMiddleware, asyncWrapper(getUsersController));
authRouter.get('/logout', authMiddleware, asyncWrapper(signOutController))
authRouter.patch('/avatars', authMiddleware, uploadMiddleware.single("avatarURL"), ctrlUser.updateAvatar)

export default authRouter;