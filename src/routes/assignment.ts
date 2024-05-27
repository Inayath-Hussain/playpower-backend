import { Router } from "express";
import { authMiddleware } from "../middleware/auth/authMiddleware";
import { allowTeacherOnlyMiddleware } from "../middleware/auth/allowTeacherOnly";
import { createAssignmentController } from "../controller/assignments/createAssignment";
import { validateCreateAssignBody } from "../middleware/assignment/validateCreateAssignBody";
import { getAssignmentController } from "../controller/assignments/getAssignment";
import { getAllAssignmentController } from "../controller/assignments/getAllAssignment";
import { deleteAssignController } from "../controller/assignments/deleteAssignment";
import { updateAssignmentController } from "../controller/assignments/updateAssignment";
import { validateSubmitAssignMiddleware } from "../middleware/submition/validateSubmitAssign";
import { submitAssignmentController } from "../controller/submition/submitAssignment";


const router = Router();


router.post("/new", authMiddleware, allowTeacherOnlyMiddleware, validateCreateAssignBody, createAssignmentController);
router.get("/:id", getAssignmentController);
router.get("/", getAllAssignmentController);
router.delete("/:id", authMiddleware, allowTeacherOnlyMiddleware, deleteAssignController);
router.patch("/:id", authMiddleware, allowTeacherOnlyMiddleware, updateAssignmentController);


router.post("/:id/submit", authMiddleware, validateSubmitAssignMiddleware, submitAssignmentController);


export { router as assignmentRouter }