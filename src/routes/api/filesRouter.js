import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {asyncWrapper} from '../../helpers/apiHelpers.js';
import {uploadController} from '../../controllers/filesController.js';

const FILE_DIR = path.resolve('./tmp');
console.log('FILE_DIR:', FILE_DIR)

const filesRouter = new express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [, extension] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${extension}`);
    }
});

const uploadMiddleware = multer({storage});

filesRouter.post('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
filesRouter.use('/download', express.static(FILE_DIR));

export default filesRouter;