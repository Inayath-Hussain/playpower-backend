import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";

config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port({ default: 8080 }),
    // cookies related
    COOKIE_PARSER_SECRET: str(),
    JWT_ACCESS_TOKEN_SECRET: str(),
    JWT_REFRESH_TOKEN_SECRET: str(),

    // db related
    DATABASE_URL: str()
})