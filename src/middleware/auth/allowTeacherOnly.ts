import { RequestHandler } from "express";

export const allowTeacherOnlyMiddleware: RequestHandler = async (req, res, next) => {
    if (!req.role || req.role !== "teacher") return res.status(403).json({ message: "You are not authorized" })

    next();
}
