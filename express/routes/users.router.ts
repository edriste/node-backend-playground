import express, { Request, Response, NextFunction } from "express";
const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/", function (_req: Request, res: Response, _next: NextFunction) {
  res.send("respond with a resource");
});

export default usersRouter;
