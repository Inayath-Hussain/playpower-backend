import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { mainRouter } from "./routes";
import { errorHandler } from "./controller/errorHandler";


export const app = express();


// middleware
app.use(morgan("dev"));
app.use(cookieParser(env.COOKIE_PARSER_SECRET));
app.use(express.json());




app.use("/api", mainRouter);


app.use(errorHandler);