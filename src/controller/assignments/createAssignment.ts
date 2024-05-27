import { RequestHandler } from "express";
import { ICreateAssignBody } from "../../middleware/assignment/validateCreateAssignBody";
import { assignmentService } from "../../services/assignment";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";



const controller: RequestHandler<{}, {}, ICreateAssignBody> = async (req, res, next) => {
    const teacherId = req.user_id as number;
    const { title, description, dueDate } = req.body;

    await assignmentService.createAssignment(title, description, dueDate, teacherId)

    return res.status(201).json({ message: "success" })
}


export const createAssignmentController = tryCatchWrapper(controller);