import { Router } from "express";
import { validateAuthRequestBody } from "../middleware/user/validateAuthRequestBody";
import { studentLoginController } from "../controller/user/studentLogin";
import { teacherLoginController } from "../controller/user/teacherLogin";


const router = Router();

router.use("/login/student", validateAuthRequestBody, studentLoginController);
router.use("/login/teacher", validateAuthRequestBody, teacherLoginController);



export { router as userRouter }