import { BadRequestError } from "../errors.js";

export function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.context.key,
                error: detail.message,
            }));
            throw BadRequestError(validationErrors);
        }
        next();
    };
}
