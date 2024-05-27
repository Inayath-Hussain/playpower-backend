import { RequestHandler } from "express";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";
import { ISubmitAssignBody } from "../../middleware/submition/validateSubmitAssign";
import { assignmentService } from "../../services/assignment";
import { submitionService } from "../../services/submition";

const controller: RequestHandler<{}, {}, ISubmitAssignBody> = async (req, res, next) => {
    const { assignmentId, content } = req.body;
    const studentId = req.user_id as number;

    const assignment = await assignmentService.getAssignment(assignmentId)

    if (assignment === null) return res.status(400).json({ message: "assignment does not exist" })

    const studentSubmition = await submitionService.getSubmition(assignmentId, studentId)

    if (studentSubmition !== null) return res.status(400).json({ message: "assignment already submitted" })

    await submitionService.submitAssignment(assignmentId, studentId, content);

    return res.status(201).json({ message: "success" })
}



export const submitAssignmentController = tryCatchWrapper(controller);