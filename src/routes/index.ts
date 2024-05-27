import { Router } from "express";
import { userRouter } from "./user";
import { assignmentRouter } from "./assignment";


const router = Router();

router.use("/user", userRouter)
router.use("/assignment", assignmentRouter)



export { router as mainRouter }