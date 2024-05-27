import { RequestHandler } from "express";
import { ICreateAssignBody } from "../../middleware/assignment/validateCreateAssignBody";
import { assignmentService } from "../../services/assignment";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";



const controller: RequestHandler<any, {}, ICreateAssignBody> = async (req, res, next) => {
    const teacherId = req.user_id as number;
    const { id } = req.params;
    const { title, description, dueDate } = req.body;


    const coercedId = Number(id);
    if (isNaN(coercedId)) return res.status(400).json({ message: "Invalid Id" });

    const assignment = await assignmentService.getAssignment(coercedId);

    if (assignment === null) return res.status(400).json({ message: "Assignment doesn't exist" })

    if (assignment.teacherId !== teacherId) return res.status(403).json({ message: "Only teacher that created assignment can update it." })


    await assignmentService.updateAssignment(teacherId, title, description, dueDate)

    return res.status(200).json({ message: "success" })
}


export const updateAssignmentController = tryCatchWrapper(controller);