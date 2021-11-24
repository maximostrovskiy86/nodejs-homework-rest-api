import mongoose from "mongoose";

// const uriDb = process.env.MONGO_URL

export const connectMongo = async () => {
    return mongoose.connect('mongodb+srv://derek:derek@cluster0.teh6p.mongodb.net/db-contacts?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};
