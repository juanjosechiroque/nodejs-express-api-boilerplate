import { BadRequestError } from "../errors.js";

export function validate(schema) {
    return (req, res, next) => {
        const body = req.body ?? {};
        const { error } = schema.validate(body, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.map((detail) => ({
                field: detail.context.key,
                error: detail.message,
            }));
            return next(BadRequestError(validationErrors));
        }
        next();
    };
}
