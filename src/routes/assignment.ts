import { Router } from "express";
import { authMiddleware } from "../middleware/auth/authMiddleware";
import { allowTeacherOnlyMiddleware } from "../middleware/auth/allowTeacherOnly";
import { createAssignmentController } from "../controller/assignments/createAssignment";
import { validateCreateAssignBody } from "../middleware/assignment/validateCreateAssignBody";
import { getAssignmentController } from "../controller/assignments/getAssignment";
import { getAllAssignmentController } from "../controller/assignments/getAllAssignment";
import { deleteAssignController } from "../controller/assignments/deleteAssignment";
import { updateAssignmentController } from "../controller/assignments/updateAssignment";


const router = Router();


router.post("/new", authMiddleware, allowTeacherOnlyMiddleware, validateCreateAssignBody, createAssignmentController);
router.get("/:id", getAssignmentController);
router.get("/", getAllAssignmentController);
router.delete("/:id", authMiddleware, allowTeacherOnlyMiddleware, deleteAssignController);
router.patch("/:id", authMiddleware, allowTeacherOnlyMiddleware, updateAssignmentController);



export { router as assignmentRouter }