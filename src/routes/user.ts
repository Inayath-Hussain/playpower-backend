import { Router } from "express";
import { validateAuthRequestBody } from "../middleware/user/validateAuthRequestBody";
import { loginController } from "../controller/user/login";
import { registerController } from "../controller/user/register";


const router = Router();

router.use("/login", validateAuthRequestBody, loginController);
router.use("/register", validateAuthRequestBody, registerController);



export { router as userRouter }