import { RequestHandler } from "express";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper"
import { IGradeAssignBody } from "../../middleware/assignment/validateGradeAssignBody";
import { submitionService } from "../../services/submition";
import { assignmentService } from "../../services/assignment";

const controller: RequestHandler<any, {}, IGradeAssignBody> = async (req, res, next) => {
    const teacherId = req.user_id as number;
    const { grade, submitionId } = req.body;

    const { id } = req.params;

    const assignmentId = Number(id);
    if (isNaN(assignmentId)) return res.status(400).json({ message: "Invalid Id" })

    const assignment = await assignmentService.getAssignment(assignmentId);

    if (assignment === null) return res.status(400).json({ message: "assignment does not exist" })
    if (assignment?.teacherId !== teacherId) return res.status(403).json({ message: "Only teachers who created assign can grade it's submitions" })

    await submitionService.gradeAssignment(assignmentId, submitionId, grade)

    res.status(200).json({ message: "success" })
}


export const gradeAssignController = tryCatchWrapper(controller);