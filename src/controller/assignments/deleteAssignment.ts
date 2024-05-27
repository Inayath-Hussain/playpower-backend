import { RequestHandler } from "express";
import { assignmentService } from "../../services/assignment";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    let { id } = req.params;

    const teacherId = req.user_id as number;

    const coercedId = Number(id);
    if (isNaN(coercedId)) return res.status(400).json({ message: "Invalid Id" });

    const assignment = await assignmentService.getAssignment(coercedId);

    if (assignment === null) return res.status(400).json({ message: "Assignment doesn't exist" })

    if (assignment.teacherId !== teacherId) return res.status(403).json({ message: "Only teacher that created assignment can delete it." })

    await assignmentService.deleteAssignment(Number(id));

    res.status(200).json({ message: "assignment deleted" });
}


export const deleteAssignController = tryCatchWrapper(controller);