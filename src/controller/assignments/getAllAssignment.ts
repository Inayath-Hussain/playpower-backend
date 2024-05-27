import { RequestHandler } from "express";
import { assignmentService } from "../../services/assignment";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const assignment = await assignmentService.getAllAssignments();

    if (assignment === null) return res.status(200).json({ message: "No Assignments posted yet" })

    res.status(200).json(assignment);
}


export const getAllAssignmentController = tryCatchWrapper(controller);