import express from 'express';

import {asyncWrapper} from "../../helpers/apiHelpers.js";
import {
    registrationController,
    loginController,
    signOutController,
} from "../../controllers/authController.js";
import {getUsersController} from "../../controllers/contactController.js";
import {updateAvatarController} from "../../controllers/updateAvatarController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import uploadMiddleware from "../../middleware/uploadMiddleware.js";

const authRouter = new express.Router();

authRouter.post('/registration', asyncWrapper(registrationController));
authRouter.post('/login', asyncWrapper(loginController));
authRouter.get('/current', authMiddleware, asyncWrapper(getUsersController));
authRouter.get('/logout', authMiddleware, asyncWrapper(signOutController));
authRouter.patch('/avatars', authMiddleware, uploadMiddleware.single("avatars"), asyncWrapper(updateAvatarController));

export default authRouter;