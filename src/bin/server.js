import app from '../app.js';
import {connectMongo} from "../db/connection.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;


const start = async () => {
    try {
        await connectMongo();

        app.listen(PORT, (err) => {
            if (err) console.error('Error at server launch:', err);
            console.log(`Server works at port ${PORT}!`);
        });
    } catch (err) {
        console.error(`Failed to launch application with error: ${err.message}`);
    }
};

start();

// app.listen(PORT, async () => {

// try {
// await connectMongo();
// if (error) console.error('Error at server launch', error);
// console.log(`Server running. Use our API on port: ${PORT}`);
// } catch (error) {
//     console.error(`Errrrrooor, ${error.message}`)
// }
// });
