import mongoose from "mongoose";

export const connectMongo = async () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};
