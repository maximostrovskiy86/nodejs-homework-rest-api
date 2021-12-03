import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import {errorHandler} from "./helpers/apiHelpers.js";
import contactRouter from './routes/api/contacts.js';
import authRouter from "./routes/api/authRouter.js";
import path from "path";

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const FILE_DIR = path.resolve('./src/public');
app.use(logger(formatsLogger));
app.use(express.json());
app.use(express.static(FILE_DIR));
app.use(cors());
app.use('/api/contacts', contactRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

export default app;
