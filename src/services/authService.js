import User from "../db/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import customError from "../helpers/error.js";

export const registration = async ({email, password}) => {
    return await User.create({
        email,
        password
    });
    // return user;
};

export const login = async (email, password) => {
    const user = await User.findOne({email, confirmed: true});

    if (!user) {
        throw new customError.NotAuthorizedError(`No user with email '${email}' found`)
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new customError.NotAuthorizedError(`Wrong password`)
    }
    const token = jwt.sign({
        id: user._id,
        createdAt: user.createdAt,
    }, process.env.JWT_SECRET);
    // }, secret);

    return token;

};