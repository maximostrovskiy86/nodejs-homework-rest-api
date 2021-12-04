import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import customError from "../helpers/error.js";
import User from "../db/userModel.js";

export const login = async (email, password) => {
    const user = await User.findOne({email, confirmed: true});

    if (!user) {
        throw new customError.NotAuthorizedError(`No user with email '${email}' found`)
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new customError.NotAuthorizedError(`Wrong password`)
    }

    return jwt.sign({
        id: user._id,
        createdAt: user.createdAt,
    }, process.env.JWT_SECRET);
}