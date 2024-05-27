import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { dueDateValidor, titleOrDescriptionValidator } from "./validator";


export interface ICreateAssignBody {
    title: string
    description: string
    dueDate: string
}


export const validateCreateAssignBody: RequestHandler<{}, {}, ICreateAssignBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { title, description, dueDate } = req.body;

    const titleValidationResult = titleOrDescriptionValidator(title, "title");
    const descriptionValidationResult = titleOrDescriptionValidator(description, "description");
    const dueDateValidationResult = dueDateValidor(dueDate);



    const sendErrorResponse = (message: string) => {
        return res.status(422).json({ message })
    }

    switch (true) {
        case (titleValidationResult.valid === false):
            return sendErrorResponse(titleValidationResult.errorMessage)

        case (descriptionValidationResult.valid === false):
            return sendErrorResponse(descriptionValidationResult.errorMessage);

        case (dueDateValidationResult.valid === false):
            return sendErrorResponse(dueDateValidationResult.errorMessage)
    }


    return next();
}