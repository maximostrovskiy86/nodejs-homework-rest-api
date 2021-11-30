import express from 'express';
import {asyncWrapper} from "../../helpers/apiHelpers.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import {
    getUsersController,
    getUserByIdController,
    addUserController,
    updateUserByIdController,
    deleteUserByIdController,
    updateStatusContactController
} from "../../controllers/userController.js";
import {addUserValidation, updateUserValidation} from "../../middleware/validationMiddleware.js";

export const contactRouter = new express.Router();

contactRouter.use(authMiddleware)

contactRouter.get('/', asyncWrapper(getUsersController));
contactRouter.get('/:id', asyncWrapper(getUserByIdController));
contactRouter.post('/', addUserValidation, asyncWrapper(addUserController));
contactRouter.delete('/:id', asyncWrapper(deleteUserByIdController));
contactRouter.patch('/:id', updateUserValidation, asyncWrapper(updateUserByIdController));
contactRouter.patch('/:id/favorite', asyncWrapper(updateStatusContactController));

export default contactRouter;
