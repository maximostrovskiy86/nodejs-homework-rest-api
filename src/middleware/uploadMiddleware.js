import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
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

// const multer = require("multer");
// const path = require("path");
//
// const tempDir = path.join(__dirname, "../", "tmp");
//
// const multerConfig =  multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, tempDir);
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     },
//     limits: {
//         fileSize: 1024
//     }
// });
//
// const uploadMiddleware = multer({
//     storage: multerConfig
// });
//
// module.exports = uploadMiddleware;