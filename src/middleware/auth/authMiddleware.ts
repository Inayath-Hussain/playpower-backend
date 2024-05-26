import { RequestHandler } from "express";

import { Ierror } from "../../controller/errorHandler";
import { userService } from "../../services/user";
import { expireAccessTokenCookie, signAccessTokenCookie } from "../../utilities/cookies/signAccessToken";
import { expireRefreshTokenCookie, signRefreshTokenCookie } from "../../utilities/cookies/signRefreshToken";
import { createAccessToken, verifyAccessToken } from "../../utilities/tokens/accessToken";
import { renewRefreshToken } from "../../utilities/tokens/refreshToken";
import { validateAuthTokens } from "../../utilities/tokens/validateAuthTokens";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";


const middleware: RequestHandler = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies

    // if no auth tokens are present, send 401 response
    if (!accessToken && !refreshToken) return next({ statusCode: 401, message: "Authentication tokens required" } as Ierror)

    // set's empty cookie values for access and refresh tokens and send 401 response 
    const invalidResponse = () => {
        expireAccessTokenCookie(res)
        expireRefreshTokenCookie(res)

        return next({ statusCode: 401, message: "Invalid authentication tokens" } as Ierror)
    }


    // this is used to check if user still exists in db and return id and role.
    const _getUserIdAndRole = async (username: string) => {
        const user = await userService.getUser(username);
        if (user === null) return null;

        return { id: user.id, role: user.role }
    }


    // if only access token is present then verify and continue
    if (!refreshToken) {
        const result = await verifyAccessToken(accessToken);

        // if token is invalid then send 401 response
        if (!result.valid) return invalidResponse();


        const userDetails = await _getUserIdAndRole(result.payload.username);
        if (userDetails === null) return invalidResponse();

        // add username to request
        req.user_id = userDetails.id;
        req.role = userDetails.role;
        return next();
    }


    // if only refresh token is present then validate and renew if needed and create new access token
    if (!accessToken) {
        // validate and renew token if necessary
        const result = await renewRefreshToken(refreshToken)

        // if token is invalid return 401 response
        if (!result.valid) return invalidResponse();

        // create access token
        const newAccessToken = await createAccessToken({ username: result.username })


        const userDetails = await _getUserIdAndRole(result.username)
        if (userDetails === null) return invalidResponse();

        req.user_id = userDetails.id;
        req.role = userDetails.role;

        // create cookies
        signAccessTokenCookie(res, newAccessToken)

        // if new access token is created then add to response object
        if (result.newToken) signRefreshTokenCookie(res, result.refreshToken)

        return next();
    }


    // if both tokens are present then validate and renew refresh token if needed
    const result = await validateAuthTokens(accessToken, refreshToken)

    if (!result.valid) return invalidResponse();

    const userDetails = await _getUserIdAndRole(result.username);
    if (userDetails === null) return invalidResponse();


    req.user_id = userDetails.id;
    req.role = userDetails.role;


    // add new auth tokens to response objects
    result.newTokens.forEach(tokenName => {
        if (tokenName === "accessToken") signAccessTokenCookie(res, result.accessToken)
        if (tokenName === "refreshToken") signRefreshTokenCookie(res, result.refreshToken)
    })

    next();
}



export const authMiddleware = tryCatchWrapper(middleware);