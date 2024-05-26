import { RequestHandler } from "express";

import { IAuthRequestBody } from "../../middleware/user/validateAuthRequestBody";
import { userService } from "../../services/user";
import { createAccessToken } from "../../utilities/tokens/accessToken";
import { createRefreshToken } from "../../utilities/tokens/refreshToken";
import { signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";


const controller: RequestHandler<{}, {}, IAuthRequestBody> = async (req, res, next) => {
    const { username, password, role } = req.body;

    const existingUserDoc = await userService.getUser(username);

    // if a user exists with provided username then return 400 response
    if (existingUserDoc !== null) return res.status(400).json({ message: "username already taken. choose another name" });

    const user = await userService.createUser(username, password, role);

    const accessToken = await createAccessToken({ username });
    const refreshToken = await createRefreshToken({ username });

    signAccessTokenCookie(res, accessToken);
    signRefreshTokenCookie(res, refreshToken);

    res.status(201).json({ message: "success" });
}




export const registerController = tryCatchWrapper(controller);