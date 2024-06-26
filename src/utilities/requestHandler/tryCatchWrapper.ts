import { RequestHandler } from "express";
import { Ierror } from "../../controller/errorHandler";

export const tryCatchWrapper = (asyncRequestHandler: RequestHandler): RequestHandler => async (req, res, next) => {
    try {
        await asyncRequestHandler(req, res, next)
    }
    catch (ex: any) {
        console.log(ex)
        next({ statusCode: 500, message: ex.message || "Internal server error" } as Ierror)
    }
}