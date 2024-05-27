import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { assignmentIdValidator, contentValidator } from "./validator";


export interface ISubmitAssignBody {
    assignmentId: number
    content: string
}


export const validateSubmitAssignMiddleware: RequestHandler<{}, {}, ISubmitAssignBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { assignmentId, content } = req.body;

    const assignIdValidationResult = assignmentIdValidator(assignmentId);
    const contentValidationResult = contentValidator(content);



    const sendErrorResponse = (message: string) => {
        return res.status(422).json({ message })
    }

    switch (true) {
        case (assignIdValidationResult.valid === false):
            return sendErrorResponse(assignIdValidationResult.errorMessage)

        case (contentValidationResult.valid === false):
            return sendErrorResponse(contentValidationResult.errorMessage);
    }


    return next();
}