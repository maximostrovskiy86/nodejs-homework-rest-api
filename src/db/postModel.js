import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 2,
            maxlength: 30,
            required: [true, 'name is required field'],
        },
        email: {
            type: String,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },
        phone: {
            type: String,
            minlength: 3,
            maxlength: 20,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {versionKey: false, timestamps: true}
);

const Contact = mongoose.model('contacts', userSchema);

export default Contact;