import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { idValidator, contentValidator } from "./validator";


export interface ISubmitAssignBody {
    content: string
}


export const validateSubmitAssignMiddleware: RequestHandler<{}, {}, ISubmitAssignBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { content } = req.body;

    const contentValidationResult = contentValidator(content);



    const sendErrorResponse = (message: string) => {
        return res.status(422).json({ message })
    }

    switch (true) {
        case (contentValidationResult.valid === false):
            return sendErrorResponse(contentValidationResult.errorMessage);
    }


    return next();
}