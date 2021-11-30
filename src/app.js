import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import {errorHandler} from "./helpers/apiHelpers.js";
import contactRouter from './routes/api/contacts.js';
import authRouter from "./routes/api/authRouter.js";

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json())
// app.use(morgan('tiny'));
app.use(cors())
app.use('/api/contacts', contactRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

// app.use((req, res) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Use api on routes: /api/tasks',
//     data: 'Not found',
//   })
// })
//
// app.use((error, req, res, next) => {
//   res.status(500).json({
//     status: 'fail',
//     code: 500,
//     message: error.message,
//     data: 'Internal Server Error',
//   })
// })

export default app;
