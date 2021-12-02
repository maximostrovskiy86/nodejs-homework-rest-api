import mongoose from "mongoose";

// const uriDb = process.env.MONGO_URL

export const connectMongo = async () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};
