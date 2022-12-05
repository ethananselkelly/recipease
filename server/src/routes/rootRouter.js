import express from "express";
import recipesRouter from "./api/v1/recipesRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import healthCheckRouter from "./healthCheckRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 
rootRouter.use("/api/v1/recipes", recipesRouter)
rootRouter.use("/api/v1/healthz", healthCheckRouter)

export default rootRouter;
