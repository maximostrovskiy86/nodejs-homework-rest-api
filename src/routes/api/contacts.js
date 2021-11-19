import express from 'express';
import {
    getUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById
} from "../../controllers/usercontroller.js";
import {addUserValidation, updateUserValidation} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUserValidation, addUser);
router.delete('/:id', deleteUserById);
router.patch('/:id', updateUserValidation, updateUserById);

export default router;
