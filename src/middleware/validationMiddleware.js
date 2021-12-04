import joi from 'joi';
import customError from "../helpers/error.js"

export const addUserValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
        phone: joi.string()
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
    const schema = joi.object({
        name: joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .optional(),
        email: joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .optional(),
        phone: joi.string()
            .min(3)
            .max(20)
            .optional(),
        favorite: joi.boolean().default(false),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        next(new customError.ValidationError(validationResult.error.details));
    }

    next();
}

export const userEmailValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        next(new customError.ValidationError(validationResult.error.details));
    }

    next();
}


