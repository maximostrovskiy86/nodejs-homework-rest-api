import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

const FILE_DIR = path.resolve('./tmp');

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

export default uploadMiddleware;