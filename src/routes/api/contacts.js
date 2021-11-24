import express from 'express';
import {asyncWrapper} from "../../helpers/apiHelpers.js";
import {
    getUsersController,
    getUserByIdController,
    addUserController,
    updateUserByIdController,
    deleteUserByIdController,
    updateStatusContactController
} from "../../controllers/userController.js";
import {addUserValidation, updateUserValidation} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.get('/', asyncWrapper(getUsersController));
router.get('/:id', asyncWrapper(getUserByIdController));
router.post('/', addUserValidation, asyncWrapper(addUserController));
router.delete('/:id', asyncWrapper(deleteUserByIdController));
router.patch('/:id', updateUserValidation, asyncWrapper(updateUserByIdController));
router.patch('/:id/favorite', asyncWrapper(updateStatusContactController));

export default router;
