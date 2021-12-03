import Joi from 'joi';
import customError from "../helpers/error.js"

export const addUserValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
        phone: Joi.string()
            .min(3)
            .max(20)
            .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details});
    }

    next();
}

export const updateUserValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .optional(),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .optional(),
        phone: Joi.string()
            .min(3)
            .max(20)
            .optional(),
        favorite: Joi.boolean().default(false),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        next(new customError.ValidationError(validationResult.error.details));
    }

    next();
}

