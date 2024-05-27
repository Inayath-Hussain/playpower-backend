import { RequestHandler } from "express";
import { assignmentService } from "../../services/assignment";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const coercedId = Number(id);
    if (isNaN(coercedId)) return res.status(400).json({ message: "Invalid Id" })
    const assignment = await assignmentService.getAssignment(coercedId);

    if (assignment === null) return res.status(400).json({ message: "Assignment doesn't exist" })

    res.status(200).json(assignment);
}


export const getAssignmentController = tryCatchWrapper(controller);