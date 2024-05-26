import { RequestHandler } from "express";
import type { Role } from "@prisma/client";

import { passwordValidator, roleValidator, usernameValidator } from "./validator";
import { sanitizeAll } from "../sanitizeBase";



export interface IAuthRequestBody {
    username: string;
    password: string;
    role: Role
}

export const validateAuthRequestBody: RequestHandler<{}, {}, IAuthRequestBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { password, username, role } = req.body;

    const usernameValidationResult = usernameValidator(username);

    const passwordValidationResult = passwordValidator(password);

    const roleValidationResult = roleValidator(role);


    switch (true) {
        case (usernameValidationResult.valid === false):
            return res.status(422).json({ message: usernameValidationResult.errorMessage })

        case (passwordValidationResult.valid === false):
            return res.status(422).json({ message: passwordValidationResult.errorMessage })

        case (roleValidationResult.valid === false):
            return res.status(422).json({ message: roleValidationResult.errorMessage })
    }

    return next();
}