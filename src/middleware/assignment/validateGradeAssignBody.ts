import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { gradeValidator, idValidator } from "./validator";

export interface IGradeAssignBody {
    grade: string
    submitionId: number
}


export const validateGradeAssignMiddleware: RequestHandler<{}, {}, IGradeAssignBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { grade, submitionId } = req.body;

    const submitionIdValidationResult = idValidator(submitionId);
    const gradeValidationResult = gradeValidator(grade);


    const sendErrorResponse = (message: string) => {
        return res.status(422).json({ message })
    }

    switch (true) {

        case (submitionIdValidationResult.valid === false):
            return sendErrorResponse(submitionIdValidationResult.errorMessage)


        case (gradeValidationResult.valid === false):
            return sendErrorResponse(gradeValidationResult.errorMessage)
    }

    return next();
}