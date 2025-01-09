import Joi from "joi";

export const registerUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const validateRegisterUser = (data) => {
    const { error } = registerUserSchema.validate(data, { abortEarly: false });
    if (error) {
        const messages = error.details.map((detail) => detail.message);
        return { valid: false, errors: messages };
    }
    return { valid: true };
};
