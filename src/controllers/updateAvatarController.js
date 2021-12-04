import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';
import User from "../db/userModel.js";

const AVATAR_DIR = path.resolve('./src/public/avatars');

export const updateAvatarController = async (req, res, _) => {
    const userId = req.user._id.toString();
    const {path: tempPath, originalname} = req.file;
    const uploadPath = path.join(AVATAR_DIR, userId, originalname);

    try {
        const file = await Jimp.read(tempPath);
        await file.resize(250, 250).write(tempPath);
        await fs.rename(tempPath, uploadPath);
        const avatarURL = `/avatars/${userId}/${originalname}`;

        const updateUser = await User.findByIdAndUpdate(req.user._id, {avatarURL}, {new: true});
        res.status(200).json({
            status: 'success',
            code: 200,
            data: {
                result: updateUser,
            }
        })
    } catch (error) {
        await fs.unlink(tempPath);
        throw error;
    }
}