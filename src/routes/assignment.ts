import { Router } from "express";
import { authMiddleware } from "../middleware/auth/authMiddleware";
import { allowTeacherOnlyMiddleware } from "../middleware/auth/allowTeacherOnly";
import { createAssignmentController } from "../controller/assignments/createAssignment";
import { validateCreateAssignBody } from "../middleware/assignment/validateCreateAssignBody";
import { getAssignmentController } from "../controller/assignments/getAssignment";
import { getAllAssignmentController } from "../controller/assignments/getAllAssignment";
import { deleteAssignController } from "../controller/assignments/deleteAssignment";
import { updateAssignmentController } from "../controller/assignments/updateAssignment";
import { validateSubmitAssignMiddleware } from "../middleware/assignment/validateSubmitAssign";
import { submitAssignmentController } from "../controller/submition/submitAssignment";
import { validateGradeAssignMiddleware } from "../middleware/assignment/validateGradeAssignBody";
import { gradeAssignController } from "../controller/assignments/gradeAssignment";


const router = Router();


router.post("/new", authMiddleware, allowTeacherOnlyMiddleware, validateCreateAssignBody, createAssignmentController);
router.get("/:id", getAssignmentController);
router.get("/", getAllAssignmentController);
router.delete("/:id", authMiddleware, allowTeacherOnlyMiddleware, deleteAssignController);
router.patch("/:id", authMiddleware, allowTeacherOnlyMiddleware, updateAssignmentController);


router.post("/:id/submit", authMiddleware, validateSubmitAssignMiddleware, submitAssignmentController);

router.put("/:id/grade", authMiddleware, allowTeacherOnlyMiddleware, validateGradeAssignMiddleware, gradeAssignController)


export { router as assignmentRouter }